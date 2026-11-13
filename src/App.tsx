import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookProvider, useBook } from './context/BookContext';
import { QuickTranslationProvider } from './context/QuickTranslationContext';
import { QuickTranslationBubble } from './components/QuickTranslationBubble';
import { Header } from './components/Header';
import { TableOfContents } from './components/TableOfContents';
import { SectionOverview } from './components/SectionOverview';
import { Section1AProcess } from './components/Section1AProcess';
import { Section1BDistinction } from './components/Section1BDistinction';
import { Section2StorageUnits } from './components/Section2StorageUnits';
import { Section3DigitalDevices } from './components/Section3DigitalDevices';
import { SectionPracticeApply } from './components/SectionPracticeApply';
import { OriginalPageModal } from './components/OriginalPageModal';
import { GlossaryModal } from './components/GlossaryModal';
import { QuickTestModal } from './components/QuickTestModal';
import { BookCopyrightModal } from './components/BookCopyrightModal';
import { CertificateModal } from './components/CertificateModal';
import { AsciiTableModal } from './components/AsciiTableModal';
import { BookCoverPage } from './components/BookCoverPage';
import { FullTableOfContentsPage } from './components/FullTableOfContentsPage';
import { TeacherPromptsWidget } from './components/TeacherPromptsWidget';
import { OnboardingProfileModal } from './components/OnboardingProfileModal';
import { ProfileModal } from './components/ProfileModal';
import { GuidingPromptsModal } from './components/GuidingPromptsModal';
import { TeacherAnalyticsModal } from './components/TeacherAnalyticsModal';
import { LessonVocabularyModal } from './components/LessonVocabularyModal';
import { PythonSandboxModal } from './components/PythonSandboxModal';
import { TeachInEnglishStudio } from './components/TeachInEnglishStudio';
import { TeachProjectorWindow } from './components/TeachProjectorWindow';
import { StudentLivePollView } from './components/StudentLivePollView';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Circle,
  Award,
  Sparkles,
  Lock,
  Unlock,
  Check,
  Volume2,
  VolumeX,
  Headphones,
  RotateCcw,
  Presentation,
  Eye,
  EyeOff,
  Lightbulb,
  X
} from 'lucide-react';

function FullscreenBookReader() {
  const {
    currentLesson,
    currentLessonId,
    currentPage,
    setCurrentPage,
    totalPages,
    nextPage,
    prevPage,
    pageDirection,
    toggleTocDrawer,
    completedSections,
    toggleSectionComplete,
    isSectionComplete,
    isAllSectionsComplete,
    isSectionTasksDone,
    completeSectionTasks,
    taskWarning,
    setTaskWarning,
    quizUnlockNotice,
    setQuizUnlockNotice,
    setShowQuizModal,
    navigateToQuiz,
    setShowCertificateModal,
    certificate,
    isCertificateEarned,
    bilingualMode,
    speak,
    stopSpeaking,
    isSpeaking,
    speechRate,
    setSpeechRate,
    isPresentationMode,
    revealPresentationHints,
    setRevealPresentationHints,
    revealPresentationAnswers,
    setRevealPresentationAnswers,
    projectedPrompt,
    setProjectedPrompt
  } = useBook();

  // Animation variants for full-screen edge-to-edge sliding pages
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.22 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.18 }
      }
    })
  };

  const currentSection = currentLesson.sections[currentPage] || currentLesson.sections[0];
  const isCurrentComplete = isSectionComplete(currentPage);
  const isCurrentTasksDone = isSectionTasksDone(currentLessonId, currentPage);

  const presentationClasses = [
    isPresentationMode ? 'presentation-mode' : '',
    revealPresentationHints ? 'presentation-hints-shown' : '',
    revealPresentationAnswers ? 'presentation-answers-shown' : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`h-screen w-screen overflow-hidden flex flex-col bg-white text-slate-800 font-sans selection:bg-indigo-600 selection:text-white select-none ${presentationClasses}`}>
      {/* Top Header */}
      <Header />

      {/* Main Full-Screen Swipeable Page Canvas - Completely Unboxed & Full Width */}
      <div className="flex-1 relative overflow-hidden bg-white flex flex-col w-full h-full">
        {/* Left Floating Arrow Turn Button */}
        {currentPage > 0 && (
          <button
            type="button"
            onClick={prevPage}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/85 hover:bg-indigo-600 text-white backdrop-blur-md shadow-xl border border-white/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            title={bilingualMode === 'en' ? 'Previous page (Left arrow ←)' : 'Trang trước (Phím mũi tên Trái ←)'}
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Right Floating Arrow Turn Button */}
        {currentPage < totalPages - 1 && (
          <button
            type="button"
            onClick={nextPage}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900/85 hover:bg-indigo-600 text-white backdrop-blur-md shadow-xl border border-white/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            title={bilingualMode === 'en' ? 'Next page (Right arrow → or Space)' : 'Trang sau (Phím mũi tên Phải → hoặc Phím cách)'}
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Full-width Unboxed Page Container */}
        <AnimatePresence initial={false} custom={pageDirection} mode="wait">
          <motion.div
            key={currentPage}
            custom={pageDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, { offset, velocity }) => {
              const swipePower = Math.abs(offset.x) * velocity.x;
              if (swipePower < -7000 || offset.x < -90) {
                nextPage();
              } else if (swipePower > 7000 || offset.x > 90) {
                prevPage();
              }
            }}
            className="w-full h-full flex-1 overflow-y-auto overflow-x-hidden select-text"
          >
            <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 xl:px-12 py-6 sm:py-8 space-y-6 presentation-content">
              {isPresentationMode && projectedPrompt && (
                <div className="p-5 sm:p-6 rounded-3xl bg-slate-950 text-white border-2 border-indigo-400 shadow-2xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-300">
                      <Presentation className="w-4 h-4" />
                      <span>
                        {bilingualMode === 'en' ? 'Projected Guiding Question' : 'Câu hỏi dẫn dắt đang trình chiếu'}
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setRevealPresentationHints(!revealPresentationHints)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>
                          {revealPresentationHints
                            ? (bilingualMode === 'en' ? 'Hide Hint' : 'Ẩn gợi ý')
                            : (bilingualMode === 'en' ? 'Show Hint' : 'Hiện gợi ý')}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRevealPresentationAnswers(!revealPresentationAnswers)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {revealPresentationAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        <span>
                          {revealPresentationAnswers
                            ? (bilingualMode === 'en' ? 'Hide Answer' : 'Ẩn đáp án')
                            : (bilingualMode === 'en' ? 'Show Answer' : 'Hiện đáp án')}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setProjectedPrompt(null)}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                        title={bilingualMode === 'en' ? 'Dismiss projected prompt' : 'Đóng câu hỏi trình chiếu'}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-lg sm:text-2xl font-extrabold leading-snug text-white">
                    {bilingualMode === 'en' ? projectedPrompt.questionEn : projectedPrompt.questionVi}
                  </p>
                  {revealPresentationHints && (
                    <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/40 text-sm text-amber-100">
                      <strong className="block mb-0.5 text-amber-300">
                        {bilingualMode === 'en' ? 'Teacher Hint:' : 'Gợi ý:'}
                      </strong>
                      {bilingualMode === 'en' ? projectedPrompt.hintEn : projectedPrompt.hintVi}
                    </div>
                  )}
                  {revealPresentationAnswers && (
                    <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-sm text-emerald-100">
                      <strong className="block mb-0.5 text-emerald-300">
                        {bilingualMode === 'en' ? 'Suggested Answer:' : 'Đáp án gợi ý:'}
                      </strong>
                      {bilingualMode === 'en' ? projectedPrompt.answerEn : projectedPrompt.answerVi}
                    </div>
                  )}
                </div>
              )}

              {currentSection.component}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Authoritative Control Bar (Thanh điều khiển chính duy nhất) */}
      <div className="shrink-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 sm:px-6 py-2.5 shadow-lg">
        <div className="w-full max-w-[1760px] mx-auto space-y-2">
          {/* Top Progress & Clear Unlock Condition Explanation (hidden during clean classroom projection) */}
          {!isPresentationMode && (
          <div className="flex items-center justify-between text-xs gap-3 px-1">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] sm:text-xs font-bold ${
                isAllSectionsComplete ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
              }`}>
                {isAllSectionsComplete
                  ? (bilingualMode === 'en'
                      ? `🎉 Completed all ${totalPages}/${totalPages} sections — Quiz is unlocked!`
                      : `🎉 Đã hoàn thành ${totalPages}/${totalPages} phần — Bài trắc nghiệm đã mở khóa!`)
                  : (bilingualMode === 'en'
                      ? `Completed ${completedSections.length}/${totalPages} sections — ${Math.max(0, totalPages - completedSections.length)} sections remaining to unlock quiz`
                      : `Đã hoàn thành ${completedSections.length}/${totalPages} phần — còn ${Math.max(0, totalPages - completedSections.length)} phần để mở kiểm tra`)}
              </span>
              <span className="text-[10px] text-slate-400 hidden md:inline">
                ({bilingualMode === 'en' ? 'Complete interactive activities to mark sections' : 'Tương tác với bài tập & mô phỏng để tự động hoàn thành'})
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-20 sm:w-36 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-teal-500 to-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${(completedSections.length / Math.max(1, totalPages)) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {Math.round((completedSections.length / Math.max(1, totalPages)) * 100)}%
              </span>
            </div>
          </div>
          )}

          {/* Main Controls Row */}
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            {/* Previous Page Button */}
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={prevPage}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer text-slate-700 dark:text-slate-200 shrink-0"
              title={bilingualMode === 'en' ? 'Previous Section' : 'Trang trước'}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Previous' : 'Trang trước'}</span>
            </button>

            {/* Interactive Page Tab Badges */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
              {currentLesson.sections.map((sec, idx) => {
                const isCurrent = currentPage === idx;
                const isDone = isSectionComplete(idx);

                return (
                  <button
                    key={sec.index}
                    type="button"
                    onClick={() => setCurrentPage(idx)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isCurrent
                        ? 'bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-600/25 scale-105'
                        : isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    title={`${bilingualMode === 'en' ? (sec.titleEn || sec.titleVi) : sec.titleVi} (${isDone ? (bilingualMode === 'en' ? 'Completed' : 'Đã học') : (bilingualMode === 'en' ? 'Incomplete' : 'Chưa học')})`}
                  >
                    <span className="font-mono font-bold flex items-center gap-0.5">
                      {idx + 1}
                      {isDone && <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />}
                    </span>
                    <span className="hidden lg:inline text-[11px] font-normal opacity-90 truncate max-w-[110px]">
                      {bilingualMode === 'en'
                        ? (sec.titleEn || sec.titleVi).split('(')[0].trim()
                        : sec.titleVi.split('(')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Completion Badge, Quiz, Next */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Current Section Completion Status Indicator */}
              <button
                type="button"
                onClick={() => toggleSectionComplete(currentPage)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  isCurrentComplete
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                }`}
                title={isCurrentComplete ? (bilingualMode === 'en' ? 'Completed (Click to unmark)' : 'Đã học xong (Bấm để hủy)') : (bilingualMode === 'en' ? 'Mark complete' : 'Đánh dấu đã học')}
              >
                {isCurrentComplete ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Completed' : 'Đã học xong'}</span>
                    <span className="sm:hidden">{bilingualMode === 'en' ? 'Done' : 'Đã học'}</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Mark complete' : 'Đánh dấu đã học'}</span>
                    <span className="sm:hidden">{bilingualMode === 'en' ? 'Mark' : 'Đã học?'}</span>
                  </>
                )}
              </button>

              {/* Certificate or Quiz Action Button */}
              {isCertificateEarned && certificate ? (
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-1 shadow-sm cursor-pointer shrink-0 animate-in fade-in"
                  title={bilingualMode === 'en' ? `View Certificate for Lesson ${currentLesson.lessonNumber}` : `Xem Giấy chứng nhận`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{bilingualMode === 'en' ? 'Certificate' : 'Chứng nhận'}</span>
                </button>
              ) : isAllSectionsComplete ? (
                <button
                  type="button"
                  onClick={navigateToQuiz}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs flex items-center gap-1 shadow-sm animate-pulse cursor-pointer shrink-0"
                  title={bilingualMode === 'en' ? 'All sections complete! Take the quiz' : 'Đã học đủ bài! Làm bài trắc nghiệm ngay'}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden md:inline">{bilingualMode === 'en' ? 'Take Quiz' : 'Làm trắc nghiệm'}</span>
                </button>
              ) : null}

              {/* Next Page Button */}
              <button
                type="button"
                disabled={currentPage === totalPages - 1}
                onClick={nextPage}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-30 disabled:pointer-events-none text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs shrink-0"
                title={bilingualMode === 'en' ? 'Next Section' : 'Trang sau'}
              >
                <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Next' : 'Trang sau'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hands-On Task Incomplete Warning Modal */}
      {taskWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-300 dark:border-amber-700 space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                  {bilingualMode === 'en' ? 'Unlock Requirement & Activity' : 'Điều kiện mở khóa bài kiểm tra'}
                </h3>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  {bilingualMode === 'en'
                    ? `Completed ${completedSections.length}/${totalPages} sections — ${Math.max(0, totalPages - completedSections.length)} remaining`
                    : `Đã hoàn thành ${completedSections.length}/${totalPages} phần — còn ${Math.max(0, totalPages - completedSections.length)} phần để mở kiểm tra`}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {taskWarning.message}
            </p>

            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                {bilingualMode === 'en'
                  ? 'Sections are automatically marked complete when you participate in interactive simulations, answer warmup questions, or engage in pedagogical reflection.'
                  : 'Hệ thống tự động đánh dấu hoàn thành khi em tương tác với mô phỏng, trả lời câu hỏi khởi động, phân loại thiết bị hoặc tham gia thảo luận sư phạm trong bài.'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setTaskWarning(null)}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Continue Interactive Learning' : 'Tiếp tục tham gia học tập'}
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleSectionComplete(taskWarning.sectionIdx, true);
                  setTaskWarning(null);
                }}
                className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                title="Xác nhận đã học xong nếu đã thực hành ngoài đời thực"
              >
                {bilingualMode === 'en' ? 'Confirm Done' : 'Xác nhận đã hiểu'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10-Question Quiz Unlocked Alert Modal */}
      {quizUnlockNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-emerald-400 dark:border-emerald-600 space-y-4 animate-in zoom-in-95 duration-200 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-amber-500 fill-amber-400 animate-spin" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100">
                {bilingualMode === 'en' ? '🎉 Quiz Unlocked on Navigation Bar!' : '🎉 Trắc nghiệm 10 câu đã mở khóa!'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {bilingualMode === 'en'
                  ? `Congratulations! You have completed all ${totalPages} sections and hands-on exercises in Lesson ${currentLesson.lessonNumber}. The 10-question quiz button on the top navigation bar is now unlocked!`
                  : `Chúc mừng em đã hoàn thành 100% tất cả ${totalPages} phần học và bài tập thao tác trong Bài ${currentLesson.lessonNumber}! Nút "Làm trắc nghiệm" trên thanh điều hướng trên cùng đã được mở khóa.`}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setQuizUnlockNotice(false);
                  setShowQuizModal(true);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Take 10-Question Quiz Now ↗' : 'Làm trắc nghiệm ngay ↗'}
              </button>
              <button
                type="button"
                onClick={() => setQuizUnlockNotice(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Later' : 'Để sau'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MainAppRouter() {
  const { currentView, showAsciiModal, setShowAsciiModal } = useBook();

  return (
    <>
      {currentView === 'cover' && <BookCoverPage />}
      {currentView === 'toc' && <FullTableOfContentsPage />}
      {currentView === 'reader' && <FullscreenBookReader />}

      {/* Shared Drawers & Modals accessible globally across Cover, TOC, and Reader */}
      <TableOfContents />
      <OriginalPageModal />
      <GlossaryModal />
      <QuickTestModal />
      <BookCopyrightModal />
      <CertificateModal />
      <AsciiTableModal isOpen={showAsciiModal} onClose={() => setShowAsciiModal(false)} />
      <ProfileModal />
      <OnboardingProfileModal />
      <GuidingPromptsModal />
      <TeacherAnalyticsModal />
      <LessonVocabularyModal />
      <PythonSandboxModal />
      <TeachInEnglishStudio />

      {/* Quick Hover Translation Floating Bubble */}
      <QuickTranslationBubble />
    </>
  );
}

export default function App() {
  const searchParams =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const liveSessionId = searchParams?.get('liveSession')?.trim() || '';
  const isTeachProjectorWindow = searchParams?.get('teachProjector') === '1';

  if (liveSessionId) {
    return <StudentLivePollView sessionId={liveSessionId} />;
  }

  if (isTeachProjectorWindow) {
    return <TeachProjectorWindow />;
  }

  return (
    <BookProvider>
      <QuickTranslationProvider>
        <MainAppRouter />
      </QuickTranslationProvider>
    </BookProvider>
  );
}

