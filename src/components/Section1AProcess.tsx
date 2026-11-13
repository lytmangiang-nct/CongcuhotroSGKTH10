import React from 'react';
import { BookOpen, Volume2 } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SECTION_1 } from '../data/lessonData';
import { BilingualText } from './BilingualText';
import { InteractiveProcessSim } from './InteractiveProcessSim';
import { TeacherPromptsWidget } from './TeacherPromptsWidget';
import { ComputingCycle3DViewer } from './three/ComputingCycle3DViewer';

export const Section1AProcess: React.FC = () => {
  const { bilingualMode, speak, setShowOriginalModal, setOriginalPageTarget } = useBook();

  return (
    <section className="space-y-6">
      {/* Section 1 Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-xs">
              {bilingualMode === 'en' ? 'SECTION 1.a' : 'MỤC 1.a'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {bilingualMode === 'en' ? 'Pages 6 – 7 Textbook' : 'Trang 6 – 7 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            {bilingualMode === 'en' ? SECTION_1.partA.titleEn : SECTION_1.partA.titleVi}
          </h2>
          <h3 className="text-base sm:text-lg font-bold text-indigo-700 dark:text-indigo-400 mt-0.5">
            {bilingualMode === 'en' ? SECTION_1.partA.subTitleEn : SECTION_1.partA.subTitleVi}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(6);
              setShowOriginalModal(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{bilingualMode === 'en' ? 'Compare Page 6 SGK' : 'Đối chiếu Trang 6 SGK'}</span>
          </button>

          {bilingualMode !== 'vi' && (
            <button
              type="button"
              onClick={() => speak('Section 1a: Information Processing Cycle. The computer computing cycle consists of four key phases: Step 1, Input data collection via keyboard or sensors; Step 2, Storage in RAM memory and disks; Step 3, Processing executed by the Central Processing Unit CPU; Step 4, Output displayed on monitors or automated devices.', 'en')}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Nghe phát âm tiếng Anh chuẩn (Speech EN)"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>EN</span>
            </button>
          )}
        </div>
      </div>

      {/* Intro text */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <BilingualText
          vi={SECTION_1.partA.introVi}
          en={SECTION_1.partA.introEn}
          viClassName="text-slate-800 text-sm leading-relaxed"
        />
      </div>

      {/* Interactive Simulation: Hình 1.1 */}
      <InteractiveProcessSim />

      {/* Interactive 3D Computing Architecture Pipeline Simulation (Three.js WebGL) */}
      <ComputingCycle3DViewer />

      {/* 3 Steps breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SECTION_1.partA.steps.map((st) => (
          <div
            key={st.step}
            className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs mb-2">
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

      <div className="bg-indigo-50/60 dark:bg-indigo-950/25 p-4 rounded-xl border border-indigo-200/70 dark:border-indigo-900/40">
        <BilingualText
          vi={SECTION_1.partA.summaryVi}
          en={SECTION_1.partA.summaryEn}
          viClassName="text-xs font-semibold text-indigo-950 dark:text-indigo-200"
        />
      </div>
    </section>
  );
};
