import React, { useLayoutEffect, useRef, useState } from 'react';
import { useQuickTranslation } from '../context/QuickTranslationContext';
import { useBook } from '../context/BookContext';
import { Languages, Loader2, X } from 'lucide-react';

export const QuickTranslationBubble: React.FC = () => {
  const { bubbleState, isHoverTranslationEnabled, hideTranslation } = useQuickTranslation();
  const { bilingualMode } = useBook();
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [bubbleDimensions, setBubbleDimensions] = useState<{ width: number; height: number }>({
    width: 320,
    height: 80
  });

  // Measure bubble dimensions upon rendering or content change
  useLayoutEffect(() => {
    if (bubbleRef.current && bubbleState.visible) {
      const bRect = bubbleRef.current.getBoundingClientRect();
      if (bRect.width > 0 && bRect.height > 0) {
        setBubbleDimensions({
          width: Math.ceil(bRect.width),
          height: Math.ceil(bRect.height)
        });
      }
    }
  }, [bubbleState.visible, bubbleState.textEn, bubbleState.textVi, bubbleState.loading]);

  // Completely turn off and unmount bubble in Vietnamese mode or when disabled
  if (!isHoverTranslationEnabled || bilingualMode !== 'en' || !bubbleState.visible || !bubbleState.rect) {
    return null;
  }

  const { rect, cursorX, cursorY, textVi, textEn, loading } = bubbleState;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

  const SCREEN_MARGIN = 12;
  const OFFSET_Y = 12;
  const OFFSET_X = 14;
  const CURSOR_SAFE_GAP = 18;

  const bWidth = Math.min(bubbleDimensions.width, vw - SCREEN_MARGIN * 2);
  const bHeight = bubbleDimensions.height;

  const spaceTop = rect.top;
  const spaceBottom = vh - rect.bottom;
  const spaceLeft = rect.left;
  const spaceRight = vw - rect.right;

  let placement: 'top' | 'bottom' | 'left' | 'right' = 'top';
  let posX = 0;
  let posY = 0;

  // 1. Choose optimal placement that NEVER overlaps the active element OR cursor
  if (spaceTop >= bHeight + OFFSET_Y + SCREEN_MARGIN) {
    placement = 'top';
    posY = rect.top - bHeight - OFFSET_Y;
  } else if (spaceBottom >= bHeight + OFFSET_Y + SCREEN_MARGIN) {
    placement = 'bottom';
    posY = rect.bottom + OFFSET_Y;
  } else if (spaceRight >= bWidth + OFFSET_X + SCREEN_MARGIN) {
    placement = 'right';
    posX = rect.right + OFFSET_X;
    posY = Math.max(SCREEN_MARGIN, Math.min(vh - bHeight - SCREEN_MARGIN, cursorY - bHeight / 2));
  } else if (spaceLeft >= bWidth + OFFSET_X + SCREEN_MARGIN) {
    placement = 'left';
    posX = rect.left - bWidth - OFFSET_X;
    posY = Math.max(SCREEN_MARGIN, Math.min(vh - bHeight - SCREEN_MARGIN, cursorY - bHeight / 2));
  } else if (cursorY >= bHeight + CURSOR_SAFE_GAP + SCREEN_MARGIN) {
    // Tall paragraph/container: place directly ABOVE the cursor with safe gap
    placement = 'top';
    posY = cursorY - bHeight - CURSOR_SAFE_GAP;
  } else {
    // Place directly BELOW the cursor with safe gap, clamped to viewport
    placement = 'bottom';
    posY = Math.min(vh - bHeight - SCREEN_MARGIN, cursorY + CURSOR_SAFE_GAP);
  }

  // Clamp posY strictly inside viewport
  posY = Math.max(SCREEN_MARGIN, Math.min(vh - bHeight - SCREEN_MARGIN, posY));

  // Horizontal alignment for top/bottom placements: anchor near cursor, clamped to viewport
  if (placement === 'top' || placement === 'bottom') {
    const idealX = cursorX - bWidth / 2;
    posX = Math.max(SCREEN_MARGIN, Math.min(vw - bWidth - SCREEN_MARGIN, idealX));
  } else {
    posX = Math.max(SCREEN_MARGIN, Math.min(vw - bWidth - SCREEN_MARGIN, posX));
  }

  // Calculate arrow/notch anchor point
  const arrowX = Math.max(16, Math.min(bWidth - 16, cursorX - posX));

  const hasValidTranslation = Boolean(
    textVi &&
    textVi.trim() !== '' &&
    textVi.trim().toLowerCase() !== (textEn || '').trim().toLowerCase()
  );

  return (
    <div
      ref={bubbleRef}
      style={{
        position: 'fixed',
        top: `${posY}px`,
        left: `${posX}px`,
        maxWidth: '420px',
        width: 'max-content',
        pointerEvents: 'none',
        zIndex: 99999
      }}
      className="quick-translation-bubble-container animate-in fade-in zoom-in-95 duration-150 select-none drop-shadow-2xl"
      aria-live="polite"
    >
      {/* Keep pointer-events-none on bubble body so it NEVER steals hover & flickers underneath; only Close button is clickable */}
      <div className="relative pointer-events-none rounded-2xl bg-slate-900/96 dark:bg-slate-950/96 text-slate-100 border border-teal-500/35 dark:border-teal-400/35 shadow-2xl shadow-slate-950/40 backdrop-blur-md px-3.5 py-2.5 space-y-1.5 transition-all">
        {/* Header bar of bubble */}
        <div className="flex items-center justify-between gap-2 text-[11px] font-bold pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1.5 text-teal-300">
            <Languages className="w-3.5 h-3.5 text-teal-400" />
            <span>{bubbleState.badgeLabel || '🇻🇳 Dịch nhanh Anh–Việt'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold border ${
                loading
                  ? 'bg-slate-800 text-slate-300 border-slate-700'
                  : bubbleState.isVerified
                  ? 'bg-teal-500/15 text-teal-300 border-teal-500/25'
                  : 'bg-amber-500/15 text-amber-300 border-amber-500/25'
              }`}
            >
              {loading ? 'Đang nạp...' : bubbleState.isVerified ? 'Bản dịch chuẩn' : 'Bản dịch tham khảo'}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                hideTranslation();
              }}
              className="pointer-events-auto p-1 -mr-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Đóng bong bóng dịch"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Translation Content */}
        <div className="text-xs sm:text-[13px] leading-relaxed text-slate-100 font-medium font-sans">
          {loading ? (
            <div className="flex items-center gap-2 py-1 text-slate-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-400 shrink-0" />
              <span className="italic text-xs text-slate-300">Đang nạp bản dịch tiếng Việt...</span>
            </div>
          ) : hasValidTranslation ? (
            <p className="whitespace-pre-line text-emerald-100 dark:text-emerald-100 font-medium tracking-wide selection:bg-none">
              {textVi}
            </p>
          ) : (
            <p className="italic text-slate-400 text-xs selection:bg-none">
              Chưa có bản dịch tiếng Việt
            </p>
          )}
        </div>

        {/* Source English text snippet reference */}
        {textEn && (
          <div className="pt-1 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
            <span className="text-slate-400 font-sans not-italic mr-1.5 font-bold">Văn bản gốc:</span>
            <span className="italic line-clamp-2">{textEn}</span>
          </div>
        )}

        {/* Directional Arrow Notch (Top or Bottom) */}
        {placement === 'top' && (
          <div
            style={{ left: `${arrowX}px` }}
            className="absolute -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-slate-900/96 border-b border-r border-teal-500/35 rotate-45"
          />
        )}
        {placement === 'bottom' && (
          <div
            style={{ left: `${arrowX}px` }}
            className="absolute -top-1.5 -translate-x-1/2 w-3 h-3 bg-slate-900/96 border-t border-l border-teal-500/35 rotate-45"
          />
        )}
      </div>
    </div>
  );
};
