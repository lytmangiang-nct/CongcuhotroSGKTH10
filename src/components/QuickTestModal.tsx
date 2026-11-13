import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Lock,
  Unlock,
  Check,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  AlertTriangle
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import { getQuestionTargetSection } from '../data/sampleAnalyticsData';
import confetti from 'canvas-confetti';

export const QuickTestModal: React.FC = () => {
  const {
    currentLesson,
    showQuizModal,
    setShowQuizModal,
    bilingualMode,
    completedSections,
    isAllSectionsComplete,
    setCurrentPage,
    setShowCertificateModal,
    submitLessonQuiz,
    getLessonQuizResult,
    activeProfile
  } = useBook();

  const savedAttempt = getLessonQuizResult(currentLesson.id);

  const quizQuestions = currentLesson.quizQuestions;
  const sections = currentLesson.sections;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [reviewWrongOnly, setReviewWrongOnly] = useState<boolean>(false);

  // Reset modal quiz state when switching to a different lesson (preserve across VI/EN toggle)
  useEffect(() => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setReviewWrongOnly(false);
  }, [currentLesson.id]);

  // Return null if modal is closed
  if (!showQuizModal) {
    return null;
  }

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const { attempt } = submitLessonQuiz(selectedAnswers);
    setIsSubmitted(true);
    const finalScore = attempt?.score ?? calculateScore();
    if (attempt?.passed && finalScore >= 8) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
    } else if (finalScore >= 5) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setReviewWrongOnly(false);
  };

  const handleJumpToSection = (sectionIndex: number) => {
    setCurrentPage(sectionIndex);
    setShowQuizModal(false);
  };

  const score = calculateScore();
  const wrongQuestions = quizQuestions.filter((q) => selectedAnswers[q.id] !== q.correctIndex);
  const displayedQuestions =
    isSubmitted && reviewWrongOnly ? wrongQuestions : quizQuestions;
  const completedCount = completedSections.length;
  const progressPercent = Math.round((completedCount / sections.length) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-300 dark:border-slate-800 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-xs text-white ${
              isAllSectionsComplete ? 'bg-indigo-600' : 'bg-amber-600'
            }`}>
              {isAllSectionsComplete ? <Award className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-slate-100">
                  {bilingualMode === 'en'
                    ? `Quick Mastery Assessment: Lesson ${currentLesson.lessonNumber}`
                    : `Kiểm tra Củng cố Kiến thức: Bài ${currentLesson.lessonNumber} Tin học 10`}
                </h3>
                {isAllSectionsComplete ? (
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300 dark:border-emerald-800">
                    <Unlock className="w-3 h-3" />
                    <span>{bilingualMode === 'en' ? 'Unlocked' : 'Đã mở khóa'}</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1 border border-amber-300 dark:border-amber-800">
                    <Lock className="w-3 h-3" />
                    <span>
                      {bilingualMode === 'en'
                        ? `Locked (${completedCount}/${sections.length})`
                        : `Khóa (${completedCount}/${sections.length} phần)`}
                    </span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {bilingualMode === 'en'
                  ? `10 Standard MCQs • Score ≥ 8/10 to unlock official Certificate for Lesson ${currentLesson.lessonNumber}`
                  : `10 câu trắc nghiệm chuẩn SGK • Đạt ≥ 8/10 điểm để nhận Chứng nhận hoàn thành Bài ${currentLesson.lessonNumber}`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowQuizModal(false)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOCKED STATE VIEW: If all sections are NOT yet completed */}
        {!isAllSectionsComplete ? (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center text-center justify-center">
            
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-2 border-amber-300 dark:border-amber-700 flex items-center justify-center shadow-md shadow-amber-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="max-w-md space-y-2">
              <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {bilingualMode === 'en' ? '10-Question Quiz Currently Locked' : 'Chưa Mở Khóa Bài Trắc Nghiệm 10 Câu'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {bilingualMode === 'en'
                  ? `To take this quiz and unlock the official Certificate for Lesson ${currentLesson.lessonNumber}, you must complete and mark all ${sections.length}/${sections.length} lesson sections.`
                  : `Để tham gia làm bài kiểm tra và đủ điều kiện nhận Chứng nhận hoàn thành Bài ${currentLesson.lessonNumber}, em cần học và bấm "Đánh dấu đã học" đủ tất cả ${sections.length}/${sections.length} phần nội dung bài học.`}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 gap-1">
                <span>
                  {bilingualMode === 'en'
                    ? `Completed ${completedCount}/${sections.length} sections — ${Math.max(0, sections.length - completedCount)} sections left to unlock assessment`
                    : `Đã hoàn thành ${completedCount}/${sections.length} phần — còn ${Math.max(0, sections.length - completedCount)} phần để mở kiểm tra`}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist of sections */}
            <div className="w-full max-w-md space-y-2 text-left">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
                {bilingualMode === 'en' ? 'Sections to complete:' : 'Danh sách các phần cần hoàn thành:'}
              </div>
              <div className="space-y-1.5">
                {sections.map((sec) => {
                  const isDone = completedSections.includes(sec.index);
                  return (
                    <div
                      key={sec.index}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors ${
                        isDone
                          ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                          isDone
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                        }`}>
                          {isDone ? <Check className="w-3.5 h-3.5" /> : sec.index + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="font-bold truncate">
                            {bilingualMode === 'en' ? (sec.titleEn || sec.titleVi) : sec.titleVi}
                          </div>
                          <div className="text-[10px] opacity-75">
                            {bilingualMode === 'en'
                              ? sec.sgkPage.replace('Trang', 'Page').replace('SGK', 'Textbook')
                              : sec.sgkPage}
                          </div>
                        </div>
                      </div>

                      {isDone ? (
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                          {bilingualMode === 'en' ? '✓ Completed' : '✓ Đã học'}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleJumpToSection(sec.index)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                        >
                          <span>{bilingualMode === 'en' ? 'Study Now' : 'Học ngay'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          /* UNLOCKED: 10 QUESTIONS QUIZ BODY */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-100/60 dark:bg-slate-950/60">
            {/* Saved Quiz Attempt Notice for Active Profile */}
            {!isSubmitted && savedAttempt && (
              <div
                className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                  savedAttempt.passed
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                }`}
              >
                <div>
                  <span className="font-bold">
                    {bilingualMode === 'en'
                      ? `Last attempt (${activeProfile?.fullName || ''}): ${savedAttempt.score}/${savedAttempt.totalQuestions}`
                      : `Lần làm gần nhất (${activeProfile?.fullName || ''}): ${savedAttempt.score}/${savedAttempt.totalQuestions} điểm`}
                  </span>
                  <span className="ml-2 opacity-85">
                    {savedAttempt.passed
                      ? bilingualMode === 'en'
                        ? '• Certificate already issued for this lesson.'
                        : '• Đã cấp chứng chỉ cho hồ sơ này.'
                      : bilingualMode === 'en'
                      ? '• Below 8/10 — no certificate issued yet.'
                      : '• Chưa đạt 8/10 — chưa được cấp chứng chỉ.'}
                  </span>
                </div>
                {savedAttempt.passed && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuizModal(false);
                      setShowCertificateModal(true);
                    }}
                    className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold shrink-0 cursor-pointer"
                  >
                    {bilingualMode === 'en' ? 'View Certificate' : 'Xem chứng chỉ'}
                  </button>
                )}
              </div>
            )}

            {/* Result banner if submitted */}
            {isSubmitted && (
              <div
                className={`p-4 sm:p-6 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm ${
                  score >= 8
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-500 dark:from-emerald-950/80 dark:to-teal-950/80 dark:border-emerald-500 text-emerald-950 dark:text-emerald-100'
                    : score >= 5
                    ? 'bg-amber-50 border-amber-500 dark:bg-amber-950/70 dark:border-amber-600 text-amber-950 dark:text-amber-100'
                    : 'bg-rose-50 border-rose-500 dark:bg-rose-950/70 dark:border-rose-600 text-rose-950 dark:text-rose-100'
                }`}
              >
                <div className="space-y-1.5 text-center sm:text-left">
                  <h4 className="font-black text-lg sm:text-xl flex items-center justify-center sm:justify-start gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>
                      {bilingualMode === 'en'
                        ? `Your Result: ${score} / ${quizQuestions.length} points (${Math.round((score / quizQuestions.length) * 100)}%)`
                        : `Kết quả của em: ${score} / ${quizQuestions.length} điểm (${Math.round((score / quizQuestions.length) * 100)}%)`}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm font-medium">
                    {score >= 8
                      ? (bilingualMode === 'en'
                          ? `🎉 Excellent! You have mastered the knowledge and earned the Certificate for Lesson ${currentLesson.lessonNumber}!`
                          : `🎉 Xuất sắc! Em đã nắm rất vững kiến thức và đủ điều kiện nhận Giấy chứng nhận hoàn thành Bài ${currentLesson.lessonNumber}!`)
                      : score >= 5
                      ? (bilingualMode === 'en'
                          ? `Good effort! You need ≥ 8/${quizQuestions.length} points to earn the Certificate for Lesson ${currentLesson.lessonNumber}. Please try again!`
                          : `Khá tốt! Em cần đạt từ 8/${quizQuestions.length} điểm trở lên để được cấp Chứng nhận hoàn thành Bài ${currentLesson.lessonNumber}. Hãy thử làm lại nhé!`)
                      : (bilingualMode === 'en'
                          ? 'Keep going! Review the concepts and click "Retry" to reach 8+ points for the certificate.'
                          : 'Cần cố gắng thêm! Hãy xem lại phần lý thuyết và bấm "Làm lại" để đạt trên 8 điểm nhận chứng nhận.')}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {score >= 8 && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowQuizModal(false);
                        setShowCertificateModal(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-amber-500/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Award className="w-4 h-4 text-slate-950" />
                      <span>
                        {bilingualMode === 'en'
                          ? `View Certificate Lesson ${currentLesson.lessonNumber} →`
                          : `Nhận Chứng Nhận Bài ${currentLesson.lessonNumber} →`}
                      </span>
                    </button>
                  )}

                  {wrongQuestions.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setReviewWrongOnly((prev) => !prev)}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer transition-colors ${
                        reviewWrongOnly
                          ? 'bg-rose-600 border-rose-700 text-white hover:bg-rose-700'
                          : 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200 hover:bg-rose-100'
                      }`}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>
                        {reviewWrongOnly
                          ? bilingualMode === 'en'
                            ? `Showing Wrong Only (${wrongQuestions.length})`
                            : `Đang lọc câu sai (${wrongQuestions.length})`
                          : bilingualMode === 'en'
                          ? `Review Mistakes (${wrongQuestions.length})`
                          : `Ôn câu sai (${wrongQuestions.length})`}
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? 'Retry' : 'Làm lại'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Review Filter Pills after submission */}
            {isSubmitted && wrongQuestions.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setReviewWrongOnly(false)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                      !reviewWrongOnly
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {bilingualMode === 'en'
                      ? `All Questions (${quizQuestions.length})`
                      : `Tất cả câu (${quizQuestions.length})`}
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewWrongOnly(true)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                      reviewWrongOnly
                        ? 'bg-rose-600 text-white'
                        : 'bg-white dark:bg-slate-900 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {bilingualMode === 'en'
                      ? `Mistakes to Review (${wrongQuestions.length})`
                      : `Ôn câu sai (${wrongQuestions.length})`}
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {bilingualMode === 'en'
                    ? 'Click "Open Related Section" on any question to jump straight back to study.'
                    : 'Bấm "Mở mục kiến thức" dưới câu sai để quay lại đúng phần lý thuyết.'}
                </span>
              </div>
            )}

            {/* List of questions */}
            {displayedQuestions.map((q) => {
              const originalIdx = quizQuestions.findIndex((item) => item.id === q.id);
              const idx = originalIdx >= 0 ? originalIdx : 0;
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctIndex;
              const letters = ['A', 'B', 'C', 'D'];
              const targetSecIdx = getQuestionTargetSection(
                currentLesson.id,
                q.id,
                q.explanationVi || q.explanationEn
              );
              const targetSection = sections[targetSecIdx] || sections[0];
              const userSelectedText =
                typeof userChoice === 'number'
                  ? bilingualMode === 'en'
                    ? q.optionsEn?.[userChoice] || q.optionsVi[userChoice]
                    : q.optionsVi[userChoice]
                  : bilingualMode === 'en'
                  ? 'Not answered'
                  : 'Chưa chọn';
              const correctText =
                bilingualMode === 'en'
                  ? q.optionsEn?.[q.correctIndex] || q.optionsVi[q.correctIndex]
                  : q.optionsVi[q.correctIndex];

              return (
                <div
                  key={q.id}
                  className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
                >
                  {/* Question title and code snippet */}
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                      {idx + 1}
                    </span>
                    <div className="flex-1 space-y-2">
                      <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {bilingualMode === 'en' ? (q.questionEn || q.questionVi) : q.questionVi}
                      </div>

                      {/* Display Python code block if present */}
                      {q.codeSnippet && (
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre overflow-x-auto shadow-inner leading-relaxed">
                          <code>{q.codeSnippet}</code>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Options list */}
                  <div className="space-y-2 sm:pl-10">
                    {q.optionsVi.map((optVi, optIdx) => {
                      const optEn = q.optionsEn && q.optionsEn[optIdx] ? q.optionsEn[optIdx] : '';
                      const isSelected = userChoice === optIdx;
                      const isAnswerCorrect = optIdx === q.correctIndex;
                      const letter = letters[optIdx];
                      const cleanVi = optVi.replace(/^[A-D]\.\s*/, '');
                      const cleanEn = optEn ? optEn.replace(/^[A-D]\.\s*/, '') : '';

                      let cardClasses = 'bg-slate-100 hover:bg-indigo-50/70 dark:bg-slate-800 dark:hover:bg-slate-750 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs';
                      let badgeClasses = 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600';
                      let textClasses = 'text-slate-900 dark:text-slate-100 font-semibold';

                      if (isSubmitted) {
                        if (isAnswerCorrect) {
                          cardClasses = 'bg-emerald-100/90 dark:bg-emerald-950/80 border-2 border-emerald-600 dark:border-emerald-500 shadow-xs ring-2 ring-emerald-500/20';
                          badgeClasses = 'bg-emerald-600 text-white font-bold shadow-xs';
                          textClasses = 'text-emerald-950 dark:text-emerald-100 font-bold';
                        } else if (isSelected && !isCorrect) {
                          cardClasses = 'bg-rose-100/90 dark:bg-rose-950/80 border-2 border-rose-600 dark:border-rose-500 shadow-xs ring-2 ring-rose-500/20';
                          badgeClasses = 'bg-rose-600 text-white font-bold shadow-xs';
                          textClasses = 'text-rose-950 dark:text-rose-100 font-bold';
                        } else {
                          cardClasses = 'bg-slate-100/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 opacity-60';
                          badgeClasses = 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400';
                          textClasses = 'text-slate-700 dark:text-slate-300';
                        }
                      } else if (isSelected) {
                        cardClasses = 'bg-indigo-100/90 dark:bg-indigo-950/80 border-2 border-indigo-600 dark:border-indigo-400 shadow-xs ring-2 ring-indigo-500/30';
                        badgeClasses = 'bg-indigo-600 text-white font-bold shadow-xs';
                        textClasses = 'text-indigo-950 dark:text-indigo-100 font-bold';
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={`p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all flex items-start gap-3 select-none ${cardClasses}`}
                        >
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${badgeClasses}`}>
                            {letter}
                          </span>

                          <div className="flex-1">
                            <div className={`text-xs sm:text-sm leading-snug ${textClasses}`}>
                              {bilingualMode === 'en' ? (cleanEn || cleanVi) : cleanVi}
                            </div>
                          </div>

                          {isSubmitted && isAnswerCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          )}
                          {isSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation on submit with mistake breakdown & jump-to-section link */}
                  {isSubmitted && (
                    <div
                      className={`sm:ml-10 p-3 sm:p-3.5 rounded-xl border-2 text-xs sm:text-sm font-medium space-y-2 ${
                        isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                          : 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-100'
                      }`}
                    >
                      <div className="font-bold flex flex-wrap items-center justify-between gap-2">
                        <span>
                          {isCorrect
                            ? (bilingualMode === 'en' ? '✓ Correct Answer Explanation:' : '✓ Giải thích đáp án đúng:')
                            : (bilingualMode === 'en' ? '✗ Mistake Analysis & Explanation:' : '✗ Ôn lại câu sai & Giải thích:')}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleJumpToSection(targetSecIdx)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>
                            {bilingualMode === 'en'
                              ? `Review: ${targetSection?.titleEn || targetSection?.titleVi}`
                              : `Mở mục kiến thức: ${targetSection?.titleVi}`}
                          </span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      {!isCorrect && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2 rounded-lg bg-white/75 dark:bg-slate-900/70 border border-rose-300 dark:border-rose-800">
                            <span className="font-bold text-rose-700 dark:text-rose-300 block">
                              {bilingualMode === 'en' ? 'Your choice:' : 'Em đã chọn:'}
                            </span>
                            <span className="text-slate-800 dark:text-slate-200">{userSelectedText}</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white/75 dark:bg-slate-900/70 border border-emerald-300 dark:border-emerald-800">
                            <span className="font-bold text-emerald-700 dark:text-emerald-300 block">
                              {bilingualMode === 'en' ? 'Correct answer:' : 'Đáp án đúng:'}
                            </span>
                            <span className="text-slate-800 dark:text-slate-200">{correctText}</span>
                          </div>
                        </div>
                      )}

                      <div className="leading-relaxed">
                        {bilingualMode === 'en' ? (q.explanationEn || q.explanationVi) : q.explanationVi}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer controls */}
        {isAllSectionsComplete && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
              {bilingualMode === 'en' ? 'Selected: ' : 'Đã chọn: '}
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{Object.keys(selectedAnswers).length}</span> / {quizQuestions.length} {bilingualMode === 'en' ? 'questions' : 'câu'}
            </div>

            <div className="flex gap-2">
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {bilingualMode === 'en' ? 'Submit & Grade' : 'Nộp bài & Chấm điểm'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQuizModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer"
                >
                  {bilingualMode === 'en' ? 'Close Quiz' : 'Đóng bài kiểm tra'}
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
