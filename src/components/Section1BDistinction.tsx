import React, { useState } from 'react';
import { BookOpen, Sparkles, HelpCircle, Volume2 } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SECTION_1 } from '../data/lessonData';
import { BilingualText } from './BilingualText';
import { Activity1Interactive } from './Activity1Interactive';
import { TeacherPromptsWidget } from './TeacherPromptsWidget';

export const Section1BDistinction: React.FC = () => {
  const { bilingualMode, speak, setShowOriginalModal, setOriginalPageTarget } = useBook();
  const [showQ1Sol, setShowQ1Sol] = useState(false);
  const [showQ2Sol, setShowQ2Sol] = useState(false);

  return (
    <section className="space-y-6">
      {/* Section 1.b Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-xs">
              {bilingualMode === 'en' ? 'SECTION 1.b' : 'MỤC 1.b'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {bilingualMode === 'en' ? 'Pages 7 – 8 Textbook' : 'Trang 7 – 8 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            {bilingualMode === 'en' ? SECTION_1.partB.titleEn : SECTION_1.partB.titleVi}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(7);
              setShowOriginalModal(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{bilingualMode === 'en' ? 'Compare Page 7 SGK' : 'Đối chiếu Trang 7 SGK'}</span>
          </button>

          {bilingualMode !== 'vi' && (
            <button
              type="button"
              onClick={() => speak('Section 1b: Distinguishing Data and Information. Data represents raw facts, numbers, text, images, or audio entered into a computer for processing. Information is the knowledge and meaning extracted by humans from data within a specific context. Data and information possess relative independence.', 'en')}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Nghe phát âm tiếng Anh chuẩn (Speech EN)"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>EN</span>
            </button>
          )}
        </div>
      </div>

      {/* Hoạt động 1 Interactive */}
      <Activity1Interactive />

      {/* Key Insights on Relative Independence */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <span>
            {bilingualMode === 'en'
              ? SECTION_1.partB.keyInsights[0].titleEn
              : SECTION_1.partB.keyInsights[0].titleVi}
          </span>
        </h4>

        <div className="space-y-3 pl-3 border-l-2 border-indigo-200 dark:border-indigo-900">
          {SECTION_1.partB.keyInsights[0].points.map((pt, idx) => (
            <div key={idx} className="text-xs leading-relaxed">
              <BilingualText vi={pt.vi} en={pt.en} />
            </div>
          ))}
        </div>
      </div>

      {/* HỘP GHI NHỚ TRANG 7 (Refined Warm Parchment Box) */}
      <div className="bg-amber-50/70 dark:bg-amber-950/25 rounded-2xl border border-amber-200 dark:border-amber-900/50 p-5 md:p-6 shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'KEY TAKEAWAY (PAGE 7)' : 'HỘP GHI NHỚ (TRANG 7)'}</span>
          </span>
          <span className="text-xs text-amber-900 dark:text-amber-300 font-semibold hidden sm:inline">
            {bilingualMode === 'en' ? 'Core lesson takeaway' : 'Kiến thức trọng tâm bài học'}
          </span>
        </div>

        <div className="space-y-3 mt-3">
          {SECTION_1.partB.memorizeBox.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
              <div className="flex-1">
                <BilingualText
                  vi={bullet.vi}
                  en={bullet.en}
                  showTts={true}
                  viClassName="font-semibold text-slate-800"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CÂU HỎI CỦNG CỐ CUỐI PHẦN 1 (TRANG 8) */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en'
              ? 'Review Questions 1 & 2 (Page 8)'
              : 'Câu hỏi Củng cố Kiến thức 1 & 2 (Đầu Trang 8 SGK)'}
          </h4>
        </div>

        {/* Question 1 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <BilingualText
              vi={SECTION_1.partB.quickReview[0].questionVi}
              en={SECTION_1.partB.quickReview[0].questionEn}
              viClassName="font-bold text-xs sm:text-sm text-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowQ1Sol(!showQ1Sol)}
              className="shrink-0 text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold hover:bg-emerald-100 cursor-pointer"
            >
              {showQ1Sol
                ? (bilingualMode === 'en' ? 'Hide solution' : 'Ẩn lời giải')
                : (bilingualMode === 'en' ? 'View sample solution' : 'Xem lời giải mẫu')}
            </button>
          </div>

          {showQ1Sol && (
            <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900 text-xs animate-in fade-in space-y-1">
              <p className="whitespace-pre-line text-slate-800 dark:text-slate-200 font-medium">
                {bilingualMode === 'en'
                  ? SECTION_1.partB.quickReview[0].solutionEn
                  : SECTION_1.partB.quickReview[0].solutionVi}
              </p>
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <BilingualText
              vi={SECTION_1.partB.quickReview[1].questionVi}
              en={SECTION_1.partB.quickReview[1].questionEn}
              viClassName="font-bold text-xs sm:text-sm text-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowQ2Sol(!showQ2Sol)}
              className="shrink-0 text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold hover:bg-emerald-100 cursor-pointer"
            >
              {showQ2Sol
                ? (bilingualMode === 'en' ? 'Hide solution' : 'Ẩn lời giải')
                : (bilingualMode === 'en' ? 'View sample solution' : 'Xem lời giải mẫu')}
            </button>
          </div>

          {showQ2Sol && (
            <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-900 text-xs animate-in fade-in space-y-1">
              <p className="whitespace-pre-line text-slate-800 dark:text-slate-200 font-medium">
                {bilingualMode === 'en'
                  ? SECTION_1.partB.quickReview[1].solutionEn
                  : SECTION_1.partB.quickReview[1].solutionVi}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
