import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { useBook } from './BookContext';
import {
  getCachedTranslation,
  saveTranslationToCache,
  translateEnglishToVietnamese
} from '../services/quickTranslationService';
import { LESSONS_REGISTRY } from '../data/lessonsRegistry';

export interface HoverBubbleState {
  visible: boolean;
  textEn: string;
  textVi: string | null;
  loading: boolean;
  rect: DOMRect | null;
  cursorX: number;
  cursorY: number;
  badgeLabel?: string;
  isVerified?: boolean;
}

interface ShowTranslationParams {
  textEn: string;
  textVi?: string;
  rect: DOMRect;
  clientX: number;
  clientY: number;
  badgeLabel?: string;
  isVerified?: boolean;
}

interface QuickTranslationContextType {
  isHoverTranslationEnabled: boolean;
  toggleHoverTranslation: () => void;
  setHoverTranslationEnabled: (enabled: boolean) => void;
  bubbleState: HoverBubbleState;
  showTranslation: (params: ShowTranslationParams) => void;
  hideTranslation: () => void;
  updateCursorPos: (clientX: number, clientY: number) => void;
}

const QuickTranslationContext = createContext<QuickTranslationContextType | undefined>(undefined);

const STORAGE_KEY_HOVER_ENABLED = 'sgk_hover_translation_enabled';

export const QuickTranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { bilingualMode } = useBook();

  const [isHoverTranslationEnabled, setIsHoverTranslationEnabledState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_HOVER_ENABLED);
      return stored !== 'false'; // Enabled by default
    } catch {
      return true;
    }
  });

  const [bubbleState, setBubbleState] = useState<HoverBubbleState>({
    visible: false,
    textEn: '',
    textVi: null,
    loading: false,
    rect: null,
    cursorX: 0,
    cursorY: 0
  });

  // Active abort controller & mouseMove RAF handle
  const abortControllerRef = useRef<AbortController | null>(null);
  const activeRequestIdRef = useRef<number>(0);
  const mouseMoveRafRef = useRef<number | null>(null);

  const setHoverTranslationEnabled = useCallback((enabled: boolean) => {
    setIsHoverTranslationEnabledState(enabled);
    try {
      localStorage.setItem(STORAGE_KEY_HOVER_ENABLED, String(enabled));
    } catch {
      // ignore
    }
    if (!enabled) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      if (mouseMoveRafRef.current !== null) {
        cancelAnimationFrame(mouseMoveRafRef.current);
        mouseMoveRafRef.current = null;
      }
      setBubbleState((prev) => ({ ...prev, visible: false }));
    }
  }, []);

  const toggleHoverTranslation = useCallback(() => {
    setHoverTranslationEnabled(!isHoverTranslationEnabled);
  }, [isHoverTranslationEnabled, setHoverTranslationEnabled]);

  const hideTranslation = useCallback(() => {
    // 1. Cancel any pending translation requests and cursor RAF immediately
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (mouseMoveRafRef.current !== null) {
      cancelAnimationFrame(mouseMoveRafRef.current);
      mouseMoveRafRef.current = null;
    }
    activeRequestIdRef.current += 1;

    // 2. Immediately hide bubble
    setBubbleState((prev) => (prev.visible ? { ...prev, visible: false, textEn: '', textVi: null, loading: false } : prev));
  }, []);

  // When switching to Vietnamese mode ('vi'), unconditionally shut off and hide hover translation immediately
  useEffect(() => {
    if (bilingualMode === 'vi') {
      hideTranslation();
    }
  }, [bilingualMode, hideTranslation]);

  const updateCursorPos = useCallback((clientX: number, clientY: number) => {
    setBubbleState((prev) => {
      if (!prev.visible) return prev;
      return { ...prev, cursorX: clientX, cursorY: clientY };
    });
  }, []);

  const showTranslation = useCallback(
    ({ textEn, textVi, rect, clientX, clientY, badgeLabel, isVerified }: ShowTranslationParams) => {
      // In Vietnamese mode or when hover translation is disabled, do nothing
      if (!isHoverTranslationEnabled || bilingualMode !== 'en' || !textEn || textEn.trim() === '') {
        return;
      }

      const cleanEn = textEn.trim();

      // Cancel any ongoing fetch
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }

      const requestId = ++activeRequestIdRef.current;

      // Case A: Accurate textbook translation is already provided directly (e.g. from BilingualText, Lesson titles, data-vi)
      if (textVi && textVi.trim() !== '' && textVi.trim().toLowerCase() !== cleanEn.toLowerCase()) {
        const cleanVi = textVi.trim();
        saveTranslationToCache(cleanEn, cleanVi, 'en', 'vi');
        setBubbleState({
          visible: true,
          textEn: cleanEn,
          textVi: cleanVi,
          loading: false,
          rect,
          cursorX: clientX,
          cursorY: clientY,
          badgeLabel: badgeLabel || '🇻🇳 Bản dịch chuẩn',
          isVerified: true
        });
        return;
      }

      // Case B: Translation is present in local cache / glossary dictionary (0ms latency, verified)
      const cachedVi = getCachedTranslation(cleanEn, 'en', 'vi');
      if (cachedVi && cachedVi.trim() !== '' && cachedVi.trim().toLowerCase() !== cleanEn.toLowerCase()) {
        setBubbleState({
          visible: true,
          textEn: cleanEn,
          textVi: cachedVi.trim(),
          loading: false,
          rect,
          cursorX: clientX,
          cursorY: clientY,
          badgeLabel: badgeLabel || '🇻🇳 Bản dịch chuẩn',
          isVerified: true
        });
        return;
      }

      // Case C: Asynchronous translation needed with abortable signal (strictly EN -> VI)
      setBubbleState({
        visible: true,
        textEn: cleanEn,
        textVi: null,
        loading: true,
        rect,
        cursorX: clientX,
        cursorY: clientY,
        badgeLabel: badgeLabel || '🇻🇳 Bản dịch tham khảo',
        isVerified: false
      });

      const controller = new AbortController();
      abortControllerRef.current = controller;

      translateEnglishToVietnamese(cleanEn, controller.signal)
        .then((result) => {
          if (activeRequestIdRef.current === requestId) {
            const hasValid = !!(result && result.trim() !== '' && result.trim().toLowerCase() !== cleanEn.toLowerCase());
            setBubbleState((prev) => {
              if (!prev.visible || prev.textEn !== cleanEn) return prev;
              return {
                ...prev,
                textVi: hasValid ? result!.trim() : null,
                loading: false,
                isVerified: false,
                badgeLabel: hasValid ? '🇻🇳 Bản dịch trực tuyến' : '🇻🇳 Thông báo dịch'
              };
            });
          }
        })
        .catch((err) => {
          if (controller.signal.aborted) {
            // Intentionally aborted on mouseleave; do nothing
            return;
          }
          if (activeRequestIdRef.current === requestId) {
            setBubbleState((prev) => {
              if (!prev.visible || prev.textEn !== cleanEn) return prev;
              return {
                ...prev,
                textVi: null,
                loading: false,
                isVerified: false,
                badgeLabel: '🇻🇳 Thông báo dịch'
              };
            });
          }
        });
    },
    [isHoverTranslationEnabled, bilingualMode]
  );

  // Global window blur / escape / tap-outside cleanup
  useEffect(() => {
    const handleGlobalHide = () => hideTranslation();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hideTranslation();
    };
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('.quick-translation-bubble-container')) return;
      if (target.closest('[data-bilingual-handled="true"]') || target.closest('[data-term-id]')) {
        return;
      }
      hideTranslation();
    };

    window.addEventListener('blur', handleGlobalHide);
    window.addEventListener('scroll', handleGlobalHide, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('blur', handleGlobalHide);
      window.removeEventListener('scroll', handleGlobalHide);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [hideTranslation]);

  // Global smart hover detector: captures all titles, headings, questions, choices, content, and keywords across all lessons
  useEffect(() => {
    // When in Vietnamese mode or when hover translation is disabled, do not attach any hover listeners
    if (!isHoverTranslationEnabled || bilingualMode !== 'en') {
      hideTranslation();
      return;
    }

    let activeEl: HTMLElement | null = null;

    const processElementTranslation = (target: HTMLElement, clientX: number, clientY: number): boolean => {
      // 0. Ignore form controls, audio players, or elements marked to skip (except explicit topic or lesson titles)
      if (
        (target.closest('input, textarea, select, audio, [data-no-hover="true"]') ||
        target.closest('button[data-audio="true"]')) &&
        !target.closest('[data-topic-title], [data-lesson-title], [data-section-title]')
      ) {
        return false;
      }

      // 1. First-class detection for LESSON & TOPIC TITLES (Tên bài học & Chủ đề SGK)
      const lessonNumEl = target.closest('[data-lesson-num]') as HTMLElement | null;
      if (lessonNumEl) {
        const numAttr = lessonNumEl.getAttribute('data-lesson-num');
        const num = numAttr ? parseInt(numAttr, 10) : NaN;
        if (!isNaN(num) && LESSONS_REGISTRY[num]) {
          const item = LESSONS_REGISTRY[num];
          const explicitVi = lessonNumEl.getAttribute('data-vi') || `Bài ${item.lessonNumber}: ${item.titleVi}`;
          const explicitEn = lessonNumEl.getAttribute('data-en') || `Lesson ${item.lessonNumber}: ${item.titleEn}`;
          activeEl = lessonNumEl;
          showTranslation({
            textEn: explicitEn,
            textVi: explicitVi,
            badgeLabel: '🇻🇳 Tên bài tiếng Việt',
            rect: lessonNumEl.getBoundingClientRect(),
            clientX,
            clientY,
            isVerified: true
          });
          return true;
        }
      }

      const isInsideBilingualComponent = Boolean(target.closest('[data-bilingual-handled="true"]'));

      const lessonTitleEl = target.closest(
        '[data-lesson-title], [data-topic-title], [data-section-title], h1, h2, h3, h4, h5, h6, .lesson-header-title, .lesson-title, .section-title'
      ) as HTMLElement | null;

      const hasSemanticTitleHook = Boolean(
        lessonTitleEl &&
          (lessonTitleEl.hasAttribute('data-lesson-title') ||
            lessonTitleEl.hasAttribute('data-topic-title') ||
            lessonTitleEl.hasAttribute('data-section-title'))
      );

      if (lessonTitleEl && (!isInsideBilingualComponent || hasSemanticTitleHook)) {
        // A. Check explicit data-vi & data-en directly on the element or any child (e.g. BilingualText)
        const explicitVi = lessonTitleEl.getAttribute('data-vi') || lessonTitleEl.querySelector('[data-vi]')?.getAttribute('data-vi');
        const explicitEn = lessonTitleEl.getAttribute('data-en') || lessonTitleEl.querySelector('[data-en]')?.getAttribute('data-en');
        const rawText = lessonTitleEl.innerText?.trim() || '';

        if (explicitVi && explicitEn) {
          activeEl = lessonTitleEl;
          showTranslation({
            textEn: explicitEn,
            textVi: explicitVi,
            badgeLabel: lessonTitleEl.hasAttribute('data-lesson-title')
              ? '🇻🇳 Tên bài tiếng Việt'
              : lessonTitleEl.hasAttribute('data-topic-title')
              ? '🇻🇳 Tên chủ đề SGK'
              : '🇻🇳 Tiêu đề SGK chuẩn',
            rect: lessonTitleEl.getBoundingClientRect(),
            clientX,
            clientY,
            isVerified: true
          });
          return true;
        }

        // B. Check if rawText mentions Lesson <number> (e.g., "Lesson 23: ...", "Lesson 23", or truncated)
        const matchLesson = rawText.match(/\bLesson\s+(\d+)\b/i);
        if (matchLesson && matchLesson[1]) {
          const num = parseInt(matchLesson[1], 10);
          if (LESSONS_REGISTRY[num]) {
            const item = LESSONS_REGISTRY[num];
            activeEl = lessonTitleEl;
            showTranslation({
              textEn: explicitEn || `Lesson ${item.lessonNumber}: ${item.titleEn}`,
              textVi: explicitVi || `Bài ${item.lessonNumber}: ${item.titleVi}`,
              badgeLabel: '🇻🇳 Tên bài tiếng Việt',
              rect: lessonTitleEl.getBoundingClientRect(),
              clientX,
              clientY,
              isVerified: true
            });
            return true;
          }
        }

        // C. Check against cached translation or LESSONS_REGISTRY index
        if (rawText && rawText.length >= 3 && rawText.length <= 300) {
          const cached = getCachedTranslation(rawText, 'en', 'vi');
          if (cached) {
            activeEl = lessonTitleEl;
            showTranslation({
              textEn: rawText,
              textVi: cached,
              badgeLabel: '🇻🇳 Tiêu đề SGK chuẩn',
              rect: lessonTitleEl.getBoundingClientRect(),
              clientX,
              clientY,
              isVerified: true
            });
            return true;
          }

          // Search across all lessons and sections in LESSONS_REGISTRY
          const normRaw = rawText.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
          for (const item of Object.values(LESSONS_REGISTRY)) {
            const normLessonEn = item.titleEn.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
            if (normRaw === normLessonEn || (normLessonEn.length > 5 && (normRaw.includes(normLessonEn) || normLessonEn.includes(normRaw)))) {
              activeEl = lessonTitleEl;
              showTranslation({
                textEn: `Lesson ${item.lessonNumber}: ${item.titleEn}`,
                textVi: `Bài ${item.lessonNumber}: ${item.titleVi}`,
                badgeLabel: '🇻🇳 Tên bài tiếng Việt',
                rect: lessonTitleEl.getBoundingClientRect(),
                clientX,
                clientY,
                isVerified: true
              });
              return true;
            }
            for (const sec of item.sections || []) {
              const normSecEn = sec.titleEn.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
              if (normRaw === normSecEn || (normSecEn.length > 5 && (normRaw.includes(normSecEn) || normSecEn.includes(normRaw)))) {
                activeEl = lessonTitleEl;
                showTranslation({
                  textEn: sec.titleEn,
                  textVi: sec.titleVi,
                  badgeLabel: '🇻🇳 Tiêu đề mục SGK',
                  rect: lessonTitleEl.getBoundingClientRect(),
                  clientX,
                  clientY,
                  isVerified: true
                });
                return true;
              }
            }
          }
        }
      }

      // 2. Check for keyword / term spans (including keywords inside BilingualText or tables)
      const termEl = target.closest('[data-term-id], [data-term-en], [data-term-vi]') as HTMLElement | null;
      if (termEl) {
        const textVi = termEl.getAttribute('data-term-vi') || termEl.getAttribute('data-vi');
        const textEn = termEl.getAttribute('data-term-en') || termEl.getAttribute('data-en') || termEl.innerText?.trim();
        if (textEn) {
          activeEl = termEl;
          showTranslation({
            textEn,
            textVi: textVi || undefined,
            badgeLabel: '🇻🇳 Thuật ngữ Tin học SGK',
            rect: termEl.getBoundingClientRect(),
            clientX,
            clientY
          });
          return true;
        }
      }

      // If handled directly by BilingualText and not an inner keyword, let BilingualText handle it
      if (target.closest('[data-bilingual-handled="true"]')) {
        return false;
      }

      // 3. Explicit data-vi or data-en attribute
      const explicitEl = target.closest('[data-vi]') as HTMLElement | null;
      if (explicitEl) {
        const textVi = explicitEl.getAttribute('data-vi');
        const textEn = explicitEl.getAttribute('data-en') || explicitEl.innerText?.trim();
        if (textVi && textEn) {
          activeEl = explicitEl;
          showTranslation({
            textEn,
            textVi,
            rect: explicitEl.getBoundingClientRect(),
            clientX,
            clientY
          });
          return true;
        }
      }

      // 4. Candidate Search: Strictly target text-bearing elements, never wrapper sections, navbars, or cards
      // Skip structural containers or containers with nested interactive/block children
      const isStructuralTag = /^(SECTION|ARTICLE|NAV|HEADER|FOOTER|MAIN|ASIDE|FORM|TABLE|TBODY|THEAD|TR)$/i.test(target.tagName);
      if (isStructuralTag) {
        return false;
      }

      // Find the closest text leaf element
      const candidate = target.closest(
        'h1, h2, h3, h4, h5, h6, [role="radio"], p, li, dt, dd, th, td, blockquote, label, .hover-translatable, span'
      ) as HTMLElement | null;

      if (candidate) {
        // Allow interactive quiz options/labels if they carry English text or explicit data-vi, while skipping generic toolbar buttons
        const isGenericButton =
          (candidate.tagName === 'BUTTON' || Boolean(candidate.closest('button, [data-no-hover="true"]'))) &&
          !candidate.closest('[data-quiz-option], [role="radio"], [role="option"]');
        if (isGenericButton) {
          return false;
        }

        // Avoid capturing outer wrapper containers that contain large nested lists/tables/sections
        const hasLargeContainerChildren = candidate.querySelector('ul, ol, table, form, section, article');
        if (hasLargeContainerChildren && candidate !== target) {
          return false;
        }

        const rawText = candidate.innerText?.trim();
        if (!rawText || rawText.length < 2 || rawText.length > 500) {
          return false;
        }

        if (!/[a-zA-ZÀ-ỹ]{2,}/.test(rawText)) {
          return false;
        }

        const viDiacritics = rawText.match(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/gi);
        if (viDiacritics && viDiacritics.length >= 3) {
          const cached = getCachedTranslation(rawText, 'en', 'vi');
          if (cached) {
            activeEl = candidate;
            showTranslation({
              textEn: rawText,
              textVi: cached,
              badgeLabel: '🇻🇳 Bản dịch chuẩn',
              rect: candidate.getBoundingClientRect(),
              clientX,
              clientY
            });
            return true;
          }

          const asciiWords = rawText.match(/\b[a-zA-Z]{2,}\b/g) || [];
          const hasEnglishPattern = /^(Lesson|Topic|Unit|Question|Exercise|Task|Section|[A-D]\.)/i.test(rawText);
          if (!hasEnglishPattern && asciiWords.length < 3) {
            return false;
          }
        }

        activeEl = candidate;
        const cleanText = rawText.replace(/\s+/g, ' ');

        showTranslation({
          textEn: cleanText,
          rect: candidate.getBoundingClientRect(),
          clientX,
          clientY
        });
        return true;
      }

      return false;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !(target instanceof Node)) return;
      if (activeEl === target || (activeEl && activeEl.contains(target))) return;
      processElementTranslation(target, e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (activeEl) {
        if (mouseMoveRafRef.current !== null) cancelAnimationFrame(mouseMoveRafRef.current);
        mouseMoveRafRef.current = requestAnimationFrame(() => {
          updateCursorPos(e.clientX, e.clientY);
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget;
      if (related instanceof Element && related.closest('.quick-translation-bubble-container')) {
        return;
      }
      if (activeEl && (!related || !(related instanceof Node) || !activeEl.contains(related))) {
        activeEl = null;
        if (mouseMoveRafRef.current !== null) cancelAnimationFrame(mouseMoveRafRef.current);
        // Do not hide if mouse moved directly onto a BilingualText element (which sets its own translation)
        if (related instanceof Element && related.closest('[data-bilingual-handled="true"]')) {
          return;
        }
        hideTranslation();
      }
    };

    // Mobile touch / tap support: opens translation on single tap
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 1) {
        const touch = e.changedTouches[0];
        const dx = Math.abs(touch.clientX - touchStartX);
        const dy = Math.abs(touch.clientY - touchStartY);
        const dt = Date.now() - touchStartTime;

        // Valid tap on mobile (little movement, quick duration)
        if (dx < 12 && dy < 12 && dt < 500) {
          const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
          if (target) {
            if (target.closest('.quick-translation-bubble-container')) {
              return;
            }

            const handled = processElementTranslation(target, touch.clientX, touch.clientY);
            if (!handled) {
              activeEl = null;
              hideTranslation();
            }
          }
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isHoverTranslationEnabled, bilingualMode, showTranslation, hideTranslation, updateCursorPos]);

  return (
    <QuickTranslationContext.Provider
      value={{
        isHoverTranslationEnabled,
        toggleHoverTranslation,
        setHoverTranslationEnabled,
        bubbleState,
        showTranslation,
        hideTranslation,
        updateCursorPos
      }}
    >
      {children}
    </QuickTranslationContext.Provider>
  );
};

export const useQuickTranslation = (): QuickTranslationContextType => {
  const context = useContext(QuickTranslationContext);
  if (!context) {
    throw new Error('useQuickTranslation must be used within a QuickTranslationProvider');
  }
  return context;
};
