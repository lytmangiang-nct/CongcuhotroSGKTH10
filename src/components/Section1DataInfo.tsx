import React, { useState } from 'react';
import { BookOpen, CheckCircle2, HelpCircle, ChevronDown, ChevronUp, Sparkles, AlertCircle } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SECTION_1 } from '../data/lessonData';
import { BilingualText } from './BilingualText';
import { InteractiveProcessSim } from './InteractiveProcessSim';
import { Activity1Interactive } from './Activity1Interactive';

export const Section1DataInfo: React.FC = () => {
  const { bilingualMode, setShowOriginalModal, setOriginalPageTarget } = useBook();
  const [showQ1Sol, setShowQ1Sol] = useState(false);
  const [showQ2Sol, setShowQ2Sol] = useState(false);

  return (
    <section id="muc-1" className="space-y-6 pt-4 scroll-mt-20">
      {/* Section 1 Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-orange-500 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-orange-600 text-white font-extrabold text-xs">
              {bilingualMode === 'en' ? 'SECTION 1' : 'MỤC 1'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {bilingualMode === 'en' ? 'Pages 6 – 7 Textbook' : 'Trang 6 – 7 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            {bilingualMode === 'en' ? SECTION_1.partA.titleEn : SECTION_1.partA.titleVi}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(6);
            setShowOriginalModal(true);
          }}
          className="px-3 py-1.5 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-950/60 dark:text-orange-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-orange-200 dark:border-orange-900 cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{bilingualMode === 'en' ? 'View Scan Pages 6-7' : 'Xem Scan Trang 6-7'}</span>
        </button>
      </div>

      {/* a) Quá trình xử lí thông tin */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-orange-700 dark:text-orange-400">
          {bilingualMode === 'en' ? SECTION_1.partA.subTitleEn : SECTION_1.partA.subTitleVi}
        </h3>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <BilingualText
            vi={SECTION_1.partA.introVi}
            en={SECTION_1.partA.introEn}
            viClassName="text-slate-800 text-sm leading-relaxed"
          />
        </div>

        {/* Interactive Simulation: Hình 1.1 */}
        <InteractiveProcessSim />

        {/* 3 Steps breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SECTION_1.partA.steps.map((st) => (
            <div
              key={st.step}
              className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs mb-2">
                  {st.step}
                </span>
                <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-2">
                  {bilingualMode === 'en' ? st.nameEn : st.nameVi}
                </h4>
                <BilingualText
                  vi={st.contentVi}
                  en={st.contentEn}
                  viClassName="text-xs text-slate-700 leading-relaxed whitespace-pre-line"
                  enClassName="text-xs"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-orange-50/70 dark:bg-orange-950/20 p-4 rounded-xl border border-orange-200 dark:border-orange-900/50">
          <BilingualText
            vi={SECTION_1.partA.summaryVi}
            en={SECTION_1.partA.summaryEn}
            viClassName="text-xs font-semibold text-orange-900 dark:text-orange-200"
          />
        </div>
      </div>

      {/* b) Phân biệt dữ liệu và thông tin */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-base sm:text-lg font-bold text-orange-700 dark:text-orange-400">
          {bilingualMode === 'en' ? SECTION_1.partB.titleEn : SECTION_1.partB.titleVi}
        </h3>

        {/* Hoạt động 1 Interactive */}
        <Activity1Interactive />

        {/* Key Insights on Relative Independence */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span>
              {bilingualMode === 'en'
                ? SECTION_1.partB.keyInsights[0].titleEn
                : SECTION_1.partB.keyInsights[0].titleVi}
            </span>
          </h4>

          <div className="space-y-3 pl-3 border-l-2 border-orange-200 dark:border-orange-900">
            {SECTION_1.partB.keyInsights[0].points.map((pt, idx) => (
              <div key={idx} className="text-xs leading-relaxed">
                <BilingualText vi={pt.vi} en={pt.en} />
              </div>
            ))}
          </div>
        </div>

        {/* HỘP GHI NHỚ TRANG 7 (Orange/Yellow Dashed Border Box) */}
        <div className="bg-amber-50/80 dark:bg-amber-950/30 rounded-2xl border-2 border-dashed border-amber-400 dark:border-amber-600 p-5 md:p-6 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'KEY TAKEAWAY (PAGE 7)' : 'HỘP GHI NHỚ (TRANG 7)'}</span>
            </span>
            <span className="text-xs text-amber-800 dark:text-amber-300 font-semibold hidden sm:inline">
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
      </div>
    </section>
  );
};
