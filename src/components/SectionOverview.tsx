import React, { useState } from 'react';
import { Target, Lightbulb, ChevronDown, ChevronUp, BookOpen, Volume2, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { LESSON_HEADER, LEARNING_OBJECTIVES, WARM_UP } from '../data/lessonData';
import { BilingualText } from './BilingualText';
import { TeacherPromptsWidget } from './TeacherPromptsWidget';

export const SectionOverview: React.FC = () => {
  const { bilingualMode, speak, setShowOriginalModal, setOriginalPageTarget, setShowCopyrightModal, completeSectionTasks, currentLessonId, isPresentationMode, revealPresentationHints } = useBook();
  const [completedObjectives, setCompletedObjectives] = useState<number[]>([]);
  const [showWarmupHint, setShowWarmupHint] = useState<boolean>(false);

  React.useEffect(() => {
    if (isPresentationMode && !revealPresentationHints) {
      setShowWarmupHint(false);
    } else if (isPresentationMode && revealPresentationHints) {
      setShowWarmupHint(true);
    }
  }, [isPresentationMode, revealPresentationHints]);

  const toggleObjective = (id: number) => {
    setCompletedObjectives((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    completeSectionTasks(currentLessonId, 0);
  };

  return (
    <section id="muc-tieu" className="space-y-6 pt-2">
      {/* Book Cover Header banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg shadow-indigo-950/25 border border-slate-800">
        <div className="relative z-10 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold tracking-wider uppercase border border-white/15 text-indigo-200">
              {bilingualMode === 'en' ? 'Theme 1: ' : 'Chủ đề 1: '}
              {bilingualMode === 'en' ? LESSON_HEADER.themeTitleEn : LESSON_HEADER.themeTitleVi}
            </span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(6);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-1 rounded-full bg-indigo-500/20 hover:bg-indigo-500/30 text-xs font-medium text-indigo-200 transition-colors flex items-center gap-1 border border-indigo-400/30 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Page 6 SGK' : 'Trang 6 SGK'}</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCopyrightModal(true)}
              className="px-2.5 py-1 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-medium text-emerald-300 transition-colors flex items-center gap-1 border border-emerald-400/30 cursor-pointer"
              title={bilingualMode === 'en' ? 'View Publication & Academic Credits' : 'Xem thông tin xuất bản, Ban tác giả và Bản quyền SGK'}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Credits & Authors' : 'Xuất bản & Tác giả'}</span>
            </button>
          </div>

          <div
            data-lesson-title="true"
            data-lesson-num={1}
            data-vi={`Bài 1: ${LESSON_HEADER.lessonTitleVi}`}
            data-en={`Lesson 1: ${LESSON_HEADER.lessonTitleEn}`}
            className="flex items-baseline gap-3 mb-2 cursor-help"
          >
            <span className="text-3xl sm:text-4xl font-black text-indigo-400 tracking-tight">
              {bilingualMode === 'en' ? 'LESSON 1' : 'BÀI 1'}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {bilingualMode === 'en'
                ? LESSON_HEADER.lessonTitleEn
                : LESSON_HEADER.lessonTitleVi}
            </span>
          </div>

          <div 
            onClick={() => setShowCopyrightModal(true)}
            className="text-slate-400 text-xs mt-3 flex items-center gap-2 font-medium cursor-pointer hover:text-emerald-300 transition-colors flex-wrap"
            title={bilingualMode === 'en' ? 'Click to open Publication & Authors' : 'Nhấn để mở Hồ sơ xuất bản & Ban tác giả'}
          >
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                {bilingualMode === 'en'
                  ? 'Informatics 10 (Connecting Knowledge to Life)'
                  : 'Sách giáo khoa Tin học 10 (Bộ Kết nối tri thức với cuộc sống)'}
              </span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>
                {bilingualMode === 'en'
                  ? 'Vietnam Education Publishing House'
                  : 'NXB Giáo dục Việt Nam'}
              </span>
            </span>
          </div>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
        <div className="absolute right-16 top-6 text-white/5 font-black text-9xl select-none pointer-events-none hidden md:block">
          01
        </div>
      </div>

      {/* SAU BÀI NÀY EM SẼ (MỤC TIÊU) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <BilingualText
                vi="SAU BÀI NÀY EM SẼ:"
                en="LEARNING OBJECTIVES"
                viClassName="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 uppercase tracking-wide"
                enClassName="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 uppercase tracking-wide"
                showTts={false}
              />
              <BilingualText
                vi="Mục tiêu chuẩn kiến thức kĩ năng bài học"
                en="Knowledge & skill standard objectives"
                viClassName="text-[11px] text-slate-500"
                enClassName="text-[11px] text-slate-500"
                showTts={false}
              />
            </div>
          </div>
          <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/40">
            {completedObjectives.length} / {LEARNING_OBJECTIVES.length} {bilingualMode === 'en' ? 'completed' : 'hoàn thành'}
          </span>
        </div>

        <div className="space-y-2 mt-4">
          {LEARNING_OBJECTIVES.map((obj) => {
            const isDone = completedObjectives.includes(obj.id);
            return (
              <div
                key={obj.id}
                onClick={() => toggleObjective(obj.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? 'bg-slate-50/70 border-emerald-300 dark:bg-slate-800 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : 'border-2 border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>

                <div className="flex-1 text-xs md:text-sm">
                  <BilingualText
                    vi={obj.vi}
                    en={obj.en}
                    viClassName={`font-semibold ${
                      isDone
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-100'
                    }`}
                    enClassName={`font-semibold ${
                      isDone
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-100'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KHỞI ĐỘNG (WARM UP) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                {bilingualMode === 'en' ? 'WARM-UP CHALLENGE' : 'KHỞI ĐỘNG'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {bilingualMode === 'en' ? 'Page 6 Informatics 10 Textbook' : 'Trang 6 SGK Tin học 10'}
              </p>
            </div>
          </div>
        </div>

        <BilingualText
          vi={WARM_UP.questionVi}
          en={WARM_UP.questionEn}
          viClassName="text-slate-800 font-medium"
        />

        {/* Collapsible Answer Hint */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setShowWarmupHint(!showWarmupHint);
              completeSectionTasks(currentLessonId, 0);
            }}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>
              {showWarmupHint
                ? (bilingualMode === 'en' ? 'Hide thinking hint' : 'Ẩn gợi ý câu trả lời')
                : (bilingualMode === 'en' ? 'View warm-up thinking hint' : 'Xem gợi ý tư duy câu hỏi khởi động')}
            </span>
            {showWarmupHint ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showWarmupHint && (
            <div className="mt-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 animate-in fade-in space-y-1.5">
              {bilingualMode === 'en' ? (
                <p className="font-medium text-slate-800 dark:text-slate-200">
                  {WARM_UP.hintEn}
                </p>
              ) : (
                <>
                  <p className="font-medium text-slate-800 dark:text-slate-200">
                    {WARM_UP.hintVi}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>

    </section>
  );
};
