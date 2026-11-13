import React, { useState } from 'react';
import { BookOpen, Database, CheckCircle2, XCircle, Sparkles, HelpCircle, Volume2 } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SECTION_2 } from '../data/lessonData';
import { BilingualText } from './BilingualText';
import { SmartUnitConverter } from './SmartUnitConverter';
import { TeacherPromptsWidget } from './TeacherPromptsWidget';
import confetti from 'canvas-confetti';

interface MultipleChoiceEx {
  id: string;
  type: string;
  questionVi: string;
  questionEn: string;
  optionsVi: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationVi: string;
  explanationEn: string;
}

const ex1 = SECTION_2.exercises[0] as MultipleChoiceEx;

export const Section2StorageUnits: React.FC = () => {
  const { bilingualMode, speak, setShowOriginalModal, setOriginalPageTarget, completeSectionTasks, currentLessonId } = useBook();
  const [q1Choice, setQ1Choice] = useState<number | null>(null);
  const [q1Evaluated, setQ1Evaluated] = useState<boolean>(false);

  const handleCheckQ1 = (index: number) => {
    setQ1Choice(index);
    setQ1Evaluated(true);
    completeSectionTasks(currentLessonId, 2);
    if (index === 1) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <section id="muc-2" className="space-y-6 pt-4 scroll-mt-20">
      {/* Section 2 Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2" data-no-hover="true">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-xs">
              {bilingualMode === 'en' ? 'SECTION 2' : 'MỤC 2'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {bilingualMode === 'en' ? 'Page 8 Textbook' : 'Trang 8 SGK'}
            </span>
          </div>
          <h2
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1"
            data-en={SECTION_2.titleEn}
            data-vi={SECTION_2.titleVi}
          >
            {bilingualMode === 'en' ? SECTION_2.titleEn : SECTION_2.titleVi}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(8);
              setShowOriginalModal(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{bilingualMode === 'en' ? 'Compare Page 8 SGK' : 'Đối chiếu Trang 8 SGK'}</span>
          </button>

          {bilingualMode !== 'vi' && (
            <button
              type="button"
              onClick={() => speak('Section 2: Data Storage Units. A bit is the smallest binary unit taking values 0 or 1. One Byte equals 8 bits. Binary storage prefixes based on powers of two include Kilobyte (1024 Bytes), Megabyte, Gigabyte, Terabyte, Petabyte, Exabyte, Zettabyte, and Yottabyte.', 'en')}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Nghe phát âm tiếng Anh chuẩn (Speech EN)"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>EN</span>
            </button>
          )}
        </div>
      </div>

      {/* Theory Content */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <BilingualText
          vi={SECTION_2.contentVi}
          en={SECTION_2.contentEn}
          viClassName="text-slate-800 text-sm leading-relaxed whitespace-pre-line"
          enClassName="text-xs sm:text-sm whitespace-pre-line"
        />

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs text-slate-500 font-medium block">
              {bilingualMode === 'en' ? 'Smallest addressable unit:' : 'Đơn vị nhỏ nhất truy cập được:'}
            </span>
            <strong className="text-base text-indigo-700 dark:text-indigo-300 font-black">
              1 Byte = 8 bit
            </strong>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs text-slate-500 font-medium block">
              {bilingualMode === 'en' ? 'Memory unit words:' : 'Tổ chức đơn vị nhớ (Words):'}
            </span>
            <strong className="text-base text-indigo-700 dark:text-indigo-300 font-black">
              {bilingualMode === 'en' ? 'Multiples: 2, 4, 8 Bytes' : 'Bội số: 2, 4, 8 Byte'}
            </strong>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="text-xs text-slate-500 font-medium block">
              {bilingualMode === 'en' ? 'Adjacent multiplier factor:' : 'Hệ số nhân liền kề:'}
            </span>
            <strong className="text-base text-indigo-700 dark:text-indigo-300 font-black">
              {bilingualMode === 'en' ? '2¹⁰ = 1,024 times' : '2¹⁰ = 1 024 lần'}
            </strong>
          </div>
        </div>
      </div>

      {/* Smart Interactive Converter & Table 1.1 */}
      <SmartUnitConverter />

      {/* Câu hỏi củng cố 1 (Trắc nghiệm định nghĩa Byte) */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <HelpCircle className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? 'Exercise 1: Byte Definition Multiple-Choice (Page 8)'
              : 'Câu hỏi 1: Trắc nghiệm kiểm tra định nghĩa về Byte (Trang 8 SGK)'}
          </h4>
        </div>

        <BilingualText
          vi={ex1.questionVi}
          en={ex1.questionEn}
          viClassName="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {ex1.optionsVi.map((optVi, optIdx) => {
            const optEn = ex1.optionsEn[optIdx];
            const isSelected = q1Choice === optIdx;
            const isCorrect = optIdx === 1;
            const letters = ['A', 'B', 'C', 'D'];
            const letter = letters[optIdx];
            const cleanVi = optVi.replace(/^[A-D]\.\s*/, '');
            const cleanEn = optEn ? optEn.replace(/^[A-D]\.\s*/, '') : '';

            let cardStyle =
              'bg-slate-100 hover:bg-indigo-50/70 dark:bg-slate-800 dark:hover:bg-slate-750 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs';
            let badgeStyle =
              'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600';
            let textStyle = 'text-slate-900 dark:text-slate-100 font-semibold';
            let subTextStyle = 'text-slate-600 dark:text-slate-400';

            if (q1Evaluated) {
              if (isCorrect) {
                cardStyle =
                  'bg-emerald-100/90 dark:bg-emerald-950/80 border-2 border-emerald-600 dark:border-emerald-500 shadow-xs ring-2 ring-emerald-500/20';
                badgeStyle = 'bg-emerald-600 text-white font-bold shadow-xs';
                textStyle = 'text-emerald-950 dark:text-emerald-100 font-bold';
                subTextStyle = 'text-emerald-800 dark:text-emerald-300';
              } else if (isSelected) {
                cardStyle =
                  'bg-rose-100/90 dark:bg-rose-950/80 border-2 border-rose-600 dark:border-rose-500 shadow-xs ring-2 ring-rose-500/20';
                badgeStyle = 'bg-rose-600 text-white font-bold shadow-xs';
                textStyle = 'text-rose-950 dark:text-rose-100 font-bold';
                subTextStyle = 'text-rose-800 dark:text-rose-300';
              } else {
                cardStyle =
                  'bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 opacity-60';
                badgeStyle = 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400';
                textStyle = 'text-slate-700 dark:text-slate-300';
                subTextStyle = 'text-slate-500 dark:text-slate-400';
              }
            } else if (isSelected) {
              cardStyle =
                'bg-indigo-100/90 dark:bg-indigo-950/80 border-2 border-indigo-600 dark:border-indigo-400 shadow-xs ring-2 ring-indigo-500/30';
              badgeStyle = 'bg-indigo-600 text-white font-bold shadow-xs';
              textStyle = 'text-indigo-950 dark:text-indigo-100 font-bold';
              subTextStyle = 'text-indigo-800 dark:text-indigo-300';
            }

            return (
              <div
                key={optIdx}
                onClick={() => handleCheckQ1(optIdx)}
                className={`p-3 rounded-xl cursor-pointer text-xs transition-all flex items-start gap-2.5 select-none ${cardStyle}`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${badgeStyle}`}>
                  {letter}
                </span>

                <div className="flex-1">
                  <div className={`text-xs sm:text-sm leading-snug ${textStyle}`}>
                    {bilingualMode === 'en' ? (cleanEn || cleanVi) : cleanVi}
                  </div>
                </div>

                {q1Evaluated && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                {q1Evaluated && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
              </div>
            );
          })}
        </div>

        {q1Evaluated && q1Choice === 1 && (
          <div className="p-3.5 rounded-xl text-xs sm:text-sm font-medium border-2 animate-in fade-in bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100">
            <div className="font-bold mb-1">
              {bilingualMode === 'en' ? '✓ Correct!' : '✓ Đúng!'}
            </div>
            <div>{bilingualMode === 'en' ? ex1.explanationEn : ex1.explanationVi}</div>
          </div>
        )}
      </div>

    </section>
  );
};
