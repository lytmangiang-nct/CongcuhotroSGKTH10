import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { useQuickTranslation } from '../context/QuickTranslationContext';
import { getCachedTranslation } from '../services/quickTranslationService';
import { GLOSSARY } from '../data/lessonData';
import { SGK_OFFICIAL_GLOSSARY } from '../data/sgkGlossaryData';

interface BilingualTextProps {
  id?: string;
  vi?: React.ReactNode;
  en?: React.ReactNode;
  className?: string;
  viClassName?: string;
  enClassName?: string;
  showTts?: boolean;
  inline?: boolean;
  badge?: string;
  highlightWords?: string[];
}

const GLOSSARY_KEYWORDS: { termId: string; vi: string[]; en: string[] }[] = [
  // Lesson 1 terms
  { termId: 'data-integrity', vi: ['tính toàn vẹn của thông tin', 'tính toàn vẹn', 'toàn vẹn'], en: ['information integrity', 'data integrity', 'integrity'] },
  { termId: 'data-processing', vi: ['quá trình xử lí thông tin', 'xử lí thông tin', 'xử lí dữ liệu'], en: ['information processing', 'data processing', 'processing'] },
  { termId: 'storage-capacity', vi: ['dung lượng lưu trữ', 'lưu trữ dữ liệu', 'lưu trữ thông tin'], en: ['storage capacity', 'storage units', 'storage'] },
  { termId: 'digital-device', vi: ['thiết bị số'], en: ['digital devices', 'digital device'] },
  { termId: 'telecommunication', vi: ['truyền thông', 'truyền tin'], en: ['telecommunication', 'telecommunications'] },
  { termId: 'information', vi: ['thông tin'], en: ['information'] },
  { termId: 'data', vi: ['dữ liệu'], en: ['data'] },
  { termId: 'byte', vi: ['byte', 'bytes'], en: ['byte', 'bytes'] },
  { termId: 'bit', vi: ['bit', 'bits'], en: ['bit', 'bits'] },
  // Lesson 2 terms
  { termId: 'smart-device', vi: ['thiết bị thông minh'], en: ['smart devices', 'smart device'] },
  { termId: 'iot', vi: ['internet vạn vật', 'iot'], en: ['internet of things', 'iot'] },
  { termId: 'industry-4', vi: ['cách mạng công nghiệp lần thứ tư', 'cách mạng công nghiệp 4.0', 'cmcn 4.0', 'cách mạng 4.0'], en: ['fourth industrial revolution', 'industry 4.0'] },
  { termId: 'knowledge-economy', vi: ['nền kinh tế tri thức', 'kinh tế tri thức'], en: ['knowledge economy'] },
  { termId: 'ai', vi: ['trí tuệ nhân tạo', 'ai'], en: ['artificial intelligence', 'ai'] },
  { termId: 'high-level-lang', vi: ['ngôn ngữ lập trình bậc cao', 'ngôn ngữ bậc cao'], en: ['high-level programming language', 'high-level language'] },
  { termId: 'dbms', vi: ['hệ quản trị cơ sở dữ liệu', 'hệ quản trị csdl', 'dbms'], en: ['database management system', 'dbms'] },
  { termId: 'operating-system', vi: ['hệ điều hành'], en: ['operating system', 'operating systems', 'os'] },
  // Lesson 3 terms
  { termId: 'data-type', vi: ['kiểu dữ liệu', 'các kiểu dữ liệu'], en: ['data type', 'data types'] },
  { termId: 'text-data', vi: ['dữ liệu văn bản'], en: ['text data'] },
  { termId: 'ascii', vi: ['bảng mã ascii', 'mã ascii', 'ascii'], en: ['ascii table', 'ascii code', 'ascii'] },
  { termId: 'unicode', vi: ['bảng mã unicode', 'unicode'], en: ['unicode standard', 'unicode table', 'unicode'] },
  { termId: 'utf-8', vi: ['utf-8', 'định dạng utf-8'], en: ['utf-8', 'utf-8 format'] },
  { termId: 'digitization', vi: ['số hoá văn bản', 'số hoá'], en: ['text digitization', 'digitization'] },
  { termId: 'character-encoding', vi: ['biểu diễn thông tin', 'mã hoá thông tin'], en: ['information representation', 'character encoding'] },
  // Lesson 4 terms
  { termId: 'binary-system', vi: ['hệ nhị phân', 'hệ đếm cơ số 2', 'nhị phân'], en: ['binary numeral system', 'binary system', 'base-2'] },
  { termId: 'fixed-point', vi: ['dấu phẩy tĩnh'], en: ['fixed-point', 'fixed-point representation'] },
  { termId: 'floating-point', vi: ['dấu phẩy động'], en: ['floating-point', 'floating-point representation'] },
  { termId: 'unsigned-integer', vi: ['số nguyên không dấu'], en: ['unsigned integer', 'unsigned integers'] },
  { termId: 'signed-integer', vi: ['số nguyên có dấu'], en: ['signed integer', 'signed integers'] },
  { termId: 'sign-magnitude', vi: ['mã thuận'], en: ['sign-magnitude', 'sign magnitude'] },
  { termId: 'ones-complement', vi: ['mã bù 1', 'mã đảo'], en: ["one's complement", 'ones complement'] },
  { termId: 'twos-complement', vi: ['mã bù 2'], en: ["two's complement", 'twos complement'] },
  { termId: 'binary-addition', vi: ['phép cộng nhị phân', 'cộng nhị phân'], en: ['binary addition'] },
  { termId: 'binary-multiplication', vi: ['phép nhân nhị phân', 'nhân nhị phân'], en: ['binary multiplication'] },
  // Lesson 5 terms
  { termId: 'logic-data', vi: ['dữ liệu lôgic', 'dữ liệu logic', 'kiểu lôgic'], en: ['logic data', 'logical data', 'boolean data'] },
  { termId: 'logic-value', vi: ['giá trị lôgic', 'giá trị logic'], en: ['logic value', 'boolean value', 'truth value'] },
  { termId: 'and-operator', vi: ['phép toán and', 'phép and', 'phép hội'], en: ['and operator', 'conjunction'] },
  { termId: 'or-operator', vi: ['phép toán or', 'phép or', 'phép tuyển'], en: ['or operator', 'disjunction'] },
  { termId: 'not-operator', vi: ['phép toán not', 'phép not', 'phép phủ định'], en: ['not operator', 'negation'] },
  { termId: 'truth-table', vi: ['bảng chân lí', 'bảng chân trị'], en: ['truth table', 'truth tables'] },
  { termId: 'bitwise-operator', vi: ['phép toán lôgic theo từng bit', 'phép toán bitwise', 'bitwise'], en: ['bitwise operator', 'bitwise logic', 'bitwise'] },
  { termId: 'logic-circuit', vi: ['mạch lôgic', 'mạch logic', 'mạch số'], en: ['logic circuit', 'digital circuit'] },
  { termId: 'logic-gate', vi: ['cổng lôgic', 'cổng logic', 'các cổng lôgic'], en: ['logic gate', 'logic gates'] },
  { termId: 'half-adder', vi: ['mạch cộng bán phần', 'mạch cộng 1 bit'], en: ['half adder', 'half-adder'] },
  // Lesson 19 terms
  {
    termId: 't19-1',
    vi: ['biểu thức boolean', 'biểu thức lôgic', 'biểu thức logic'],
    en: ['boolean expressions', 'boolean expression', 'logical expressions', 'logical expression']
  },
  {
    termId: 't19-2',
    vi: ['toán tử quan hệ', 'phép so sánh quan hệ', 'các phép toán quan hệ', 'toán tử so sánh'],
    en: ['relational operators', 'relational operator', 'comparison operators', 'comparison operator']
  },
  {
    termId: 't19-3',
    vi: ['phép toán and', 'phép and', 'phép hội'],
    en: ['logical and operator', 'logical and', 'and operator']
  },
  {
    termId: 't19-4',
    vi: ['phép toán or', 'phép or', 'phép tuyển'],
    en: ['logical or operator', 'logical or', 'or operator']
  },
  {
    termId: 't19-5',
    vi: ['phép toán not', 'phép not', 'phép phủ định'],
    en: ['logical not operator', 'logical not', 'not operator']
  },
  {
    termId: 't19-6',
    vi: ['cấu trúc rẽ nhánh', 'lệnh rẽ nhánh'],
    en: ['conditional branching structure', 'branching structure', 'selection structure']
  },
  {
    termId: 't19-7',
    vi: ['lệnh if dạng thiếu', 'lệnh if'],
    en: ['single-alternative if statement', 'one-way if statement', 'if statement']
  },
  {
    termId: 't19-8',
    vi: ['lệnh if dạng đủ', 'lệnh if-else'],
    en: ['two-alternative if-else statement', 'two-way if-else statement', 'if-else statement']
  },
  {
    termId: 't19-9',
    vi: ['quy tắc thụt lề', 'thụt lề'],
    en: ['python indentation', 'indentation']
  },
  {
    termId: 't19-10',
    vi: ['thuật toán năm nhuận', 'năm nhuận'],
    en: ['leap year algorithm', 'leap year']
  }
];

const extractPlainText = (node: React.ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractPlainText).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractPlainText(node.props?.children);
  }
  return '';
};

export const BilingualText: React.FC<BilingualTextProps> = ({
  vi = '',
  en = '',
  className = '',
  viClassName = '',
  enClassName = '',
  showTts = true,
  inline = false
}) => {
  const {
    bilingualMode,
    speak,
    isSpeaking,
    speakingText,
    speakingSentence,
    openTermById,
    highlightTerms,
    currentLesson
  } = useBook();
  const { showTranslation, hideTranslation, updateCursorPos, isHoverTranslationEnabled } = useQuickTranslation();

  const enStr = extractPlainText(en).trim();
  const viStr = extractPlainText(vi).trim();

  // Show English speech audio button unless explicitly disabled via showTts={false} or in Vietnamese-only mode
  const canShowAudio = Boolean(showTts !== false && enStr && bilingualMode !== 'vi');

  // Check if this text is currently being read aloud
  const isBeingSpoken = Boolean(
    isSpeaking &&
      enStr &&
      (speakingText === enStr ||
        (speakingSentence && (enStr.includes(speakingSentence) || speakingSentence.includes(enStr.trim().slice(0, 25)))) ||
        (speakingText && speakingText.includes(enStr.trim().slice(0, 30))))
  );

  // Helper to parse key glossary terms and highlight them safely
  const renderTextWithGlossary = (text: React.ReactNode, isEnglish: boolean): React.ReactNode => {
    if (!text || typeof text !== 'string') return text || null;
    if (!highlightTerms) return text;

    // Collect all search keywords for the chosen language, sorted by length descending
    const keywords: { word: string; termId: string; termVi: string; definitionVi: string }[] = [];

    // 1. Static curated keywords
    GLOSSARY_KEYWORDS.forEach((item) => {
      const list = isEnglish ? item.en : item.vi;
      list.forEach((w) => {
        if (w) {
          keywords.push({
            word: w,
            termId: item.termId,
            termVi: item.vi[0] || w,
            definitionVi: ''
          });
        }
      });
    });

    // 2. Current lesson glossary terms (covers all 34 lessons dynamically)
    currentLesson?.glossary?.forEach((g, idx) => {
      const word = isEnglish ? g.termEn : g.termVi;
      if (word && word.trim()) {
        keywords.push({
          word: word.trim(),
          termId: g.id || `term-${currentLesson.id}-${idx}`,
          termVi: g.termVi,
          definitionVi: g.definitionVi
        });
      }
    });

    // 3. Official SGK glossary terms (Trang 166-167)
    SGK_OFFICIAL_GLOSSARY.forEach((g) => {
      const word = isEnglish ? (g.termEn || g.termVi) : g.termVi;
      if (word && word.trim()) {
        keywords.push({
          word: word.trim(),
          termId: g.id,
          termVi: g.termVi,
          definitionVi: g.definitionVi
        });
      }
    });

    // Sort by word length descending so compound phrases match before single words
    keywords.sort((a, b) => b.word.length - a.word.length);

    if (keywords.length === 0) return text;

    // Escape regex characters
    const escapedWords = keywords.map((k) => k.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(\\b(?:${escapedWords.join('|')})\\b)`, 'gi');

    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (!part || typeof part !== 'string') return part;

      const lowerPart = part.toLowerCase();
      const match = keywords.find((k) => k.word.toLowerCase() === lowerPart);

      if (match) {
        const allTerms = [...(currentLesson?.glossary || []), ...GLOSSARY];
        const glossaryItem = allTerms.find((g) => g.id === match.termId);
        const termDefVi = match.definitionVi
          ? `${match.termVi}: ${match.definitionVi}`
          : glossaryItem
          ? `${glossaryItem.termVi}: ${glossaryItem.definitionVi}`
          : match.termVi;

        // Clean concise Vietnamese translation for the hover bubble
        const directCachedVi = getCachedTranslation(part, 'en', 'vi');
        const cleanGlossaryVi = match.termVi
          ? match.termVi.replace(/\s*\([^)]*\)/g, '').replace(/\s*\/\s*so sánh/i, '').trim()
          : '';
        const normPart = part.trim().toLowerCase();
        let bubbleVi = directCachedVi;
        if (!bubbleVi) {
          if (normPart.includes('relational operator')) {
            bubbleVi = 'toán tử quan hệ';
          } else if (normPart.includes('boolean expression')) {
            bubbleVi = 'biểu thức Boolean';
          } else {
            bubbleVi = cleanGlossaryVi || match.termVi;
          }
        }

        return (
          <span
            key={index}
            data-term-id={match.termId}
            data-term-en={part}
            data-term-vi={bubbleVi}
            onClick={(e) => {
              e.stopPropagation();
              if (isHoverTranslationEnabled && bilingualMode === 'en') {
                showTranslation({
                  textEn: part,
                  textVi: bubbleVi,
                  badgeLabel: '🇻🇳 Thuật ngữ Tin học SGK',
                  rect: e.currentTarget.getBoundingClientRect(),
                  clientX: e.clientX,
                  clientY: e.clientY
                });
              } else {
                openTermById(match.termId);
              }
            }}
            onMouseEnter={(e) => {
              if (isHoverTranslationEnabled && bilingualMode === 'en') {
                e.stopPropagation();
                showTranslation({
                  textEn: part,
                  textVi: bubbleVi,
                  badgeLabel: '🇻🇳 Thuật ngữ Tin học SGK',
                  rect: e.currentTarget.getBoundingClientRect(),
                  clientX: e.clientX,
                  clientY: e.clientY
                });
              }
            }}
            onMouseMove={(e) => {
              if (isHoverTranslationEnabled && bilingualMode === 'en') {
                e.stopPropagation();
                updateCursorPos(e.clientX, e.clientY);
              }
            }}
            onMouseLeave={(e) => {
              if (isHoverTranslationEnabled && bilingualMode === 'en') {
                e.stopPropagation();
                if (enStr || viStr) {
                  const parentEl = (e.currentTarget.closest('[data-bilingual-handled="true"]') || e.currentTarget.parentElement) as HTMLElement | null;
                  if (parentEl) {
                    showTranslation({
                      textEn: enStr || viStr,
                      textVi: viStr,
                      rect: parentEl.getBoundingClientRect(),
                      clientX: e.clientX,
                      clientY: e.clientY
                    });
                    return;
                  }
                }
                hideTranslation();
              }
            }}
            className="cursor-pointer font-semibold underline decoration-dotted decoration-teal-600 dark:decoration-teal-400 hover:decoration-teal-500 dark:hover:decoration-teal-300 underline-offset-4 decoration-2 text-inherit hover:text-teal-700 dark:hover:text-teal-200 hover:bg-teal-500/10 rounded px-1 transition-all inline-flex items-center gap-0.5"
            title={`Thuật ngữ: ${bubbleVi}`}
          >
            {part}
            <Sparkles className="w-2.5 h-2.5 text-teal-600 dark:text-teal-400 inline opacity-90" />
          </span>
        );
      }
      return part;
    });
  };

  if (inline) {
    if (bilingualMode === 'en') {
      return (
        <span
          data-bilingual-handled="true"
          data-en={enStr || viStr || undefined}
          data-vi={viStr || enStr || undefined}
          onClick={(e) => {
            if (isHoverTranslationEnabled && (enStr || viStr)) {
              showTranslation({
                textEn: enStr || viStr,
                textVi: viStr,
                badgeLabel: '🇻🇳 Bản dịch chuẩn',
                isVerified: true,
                rect: e.currentTarget.getBoundingClientRect(),
                clientX: e.clientX,
                clientY: e.clientY
              });
            }
          }}
          className={`text-inherit transition-all cursor-pointer ${
            isBeingSpoken
              ? 'bg-amber-200/90 dark:bg-amber-900/60 ring-2 ring-amber-400 dark:ring-amber-500 rounded-sm font-semibold text-amber-950 dark:text-amber-100 shadow-xs'
              : isHoverTranslationEnabled
              ? 'hover:brightness-110 hover:bg-white/5 dark:hover:bg-white/5 rounded-xs'
              : ''
          } ${className}`}
          onMouseEnter={(e) => {
            if (isHoverTranslationEnabled && (enStr || viStr)) {
              showTranslation({
                textEn: enStr || viStr,
                textVi: viStr,
                badgeLabel: '🇻🇳 Bản dịch chuẩn',
                isVerified: true,
                rect: e.currentTarget.getBoundingClientRect(),
                clientX: e.clientX,
                clientY: e.clientY
              });
            }
          }}
          onMouseMove={(e) => {
            if (isHoverTranslationEnabled) {
              updateCursorPos(e.clientX, e.clientY);
            }
          }}
          onMouseLeave={(e) => {
            const related = e.relatedTarget;
            if (related instanceof Element && related.closest('.quick-translation-bubble-container')) {
              return;
            }
            if (!related || !(related instanceof Node) || !e.currentTarget.contains(related)) {
              hideTranslation();
            }
          }}
        >
          {renderTextWithGlossary(en || vi, true)}
        </span>
      );
    }
    return <span className={`text-inherit ${className}`} data-en={enStr || undefined} data-vi={viStr || undefined}>{renderTextWithGlossary(vi, false)}</span>;
  }

  if (bilingualMode === 'en') {
    return (
      <span
        className={`relative group block text-inherit ${className}`}
        data-bilingual-handled="true"
        data-en={enStr || viStr || undefined}
        data-vi={viStr || enStr || undefined}
      >
        <span className="flex items-start justify-between gap-2 text-inherit">
          <span
            data-bilingual-handled="true"
            data-en={enStr || viStr || undefined}
            data-vi={viStr || enStr || undefined}
            onClick={(e) => {
              if (isHoverTranslationEnabled && (enStr || viStr)) {
                showTranslation({
                  textEn: enStr || viStr,
                  textVi: viStr,
                  badgeLabel: '🇻🇳 Bản dịch chuẩn',
                  isVerified: true,
                  rect: e.currentTarget.getBoundingClientRect(),
                  clientX: e.clientX,
                  clientY: e.clientY
                });
              }
            }}
            className={`flex-1 text-inherit leading-relaxed font-sans block transition-all cursor-pointer ${
              isBeingSpoken
                ? 'bg-amber-100/95 dark:bg-amber-950/80 text-amber-950 dark:text-amber-100 ring-2 ring-amber-400 dark:ring-amber-500 rounded-xl p-1.5 -m-1.5 shadow-md shadow-amber-500/15'
                : isHoverTranslationEnabled
                ? 'hover:brightness-110 hover:bg-white/5 dark:hover:bg-white/5 rounded-lg px-1 -mx-1'
                : ''
            } ${enClassName}`}
            onMouseEnter={(e) => {
              if (isHoverTranslationEnabled && (enStr || viStr)) {
                showTranslation({
                  textEn: enStr || viStr,
                  textVi: viStr,
                  badgeLabel: '🇻🇳 Bản dịch chuẩn',
                  isVerified: true,
                  rect: e.currentTarget.getBoundingClientRect(),
                  clientX: e.clientX,
                  clientY: e.clientY
                });
              }
            }}
            onMouseMove={(e) => {
              if (isHoverTranslationEnabled) {
                updateCursorPos(e.clientX, e.clientY);
              }
            }}
            onMouseLeave={(e) => {
              const related = e.relatedTarget;
              if (related instanceof Element && related.closest('.quick-translation-bubble-container')) {
                return;
              }
              if (!related || !(related instanceof Node) || !e.currentTarget.contains(related)) {
                hideTranslation();
              }
            }}
          >
            {renderTextWithGlossary(en || vi, true)}
            {isBeingSpoken && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 ml-2 animate-pulse align-middle">
                <Volume2 className="w-3 h-3 text-amber-600 animate-bounce" />
                <span>Đang đọc</span>
              </span>
            )}
          </span>
          {canShowAudio && enStr && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                speak(enStr, 'en');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                  e.preventDefault();
                  speak(enStr, 'en');
                }
              }}
              className="shrink-0 px-2 py-0.5 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 text-xs font-bold flex items-center gap-1 transition-colors border border-indigo-200/80 dark:border-indigo-800 cursor-pointer shadow-2xs select-none"
              title="Phát âm tiếng Anh chuẩn (Speech EN)"
            >
              <Volume2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>EN</span>
            </span>
          )}
        </span>
      </span>
    );
  }

  return (
    <span className={`relative group block text-inherit ${className}`}>
      <span className={`text-inherit leading-relaxed block ${viClassName}`}>
        {renderTextWithGlossary(vi, false)}
      </span>
    </span>
  );
};
