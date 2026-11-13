import React, { useMemo, useState } from 'react';
import {
  X,
  BarChart3,
  ShieldAlert,
  ArrowRight,
  Award,
  CheckCircle2,
  User,
  AlertTriangle
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import { LESSONS_REGISTRY } from '../data/lessonsRegistry';
import {
  buildDemoClassAnalytics,
  extractPersonalMissedQuestions
} from '../data/sampleAnalyticsData';

export const TeacherAnalyticsModal: React.FC = () => {
  const {
    showTeacherAnalyticsModal,
    setShowTeacherAnalyticsModal,
    bilingualMode,
    openReader,
    activeProfile,
    learnerProgress
  } = useBook();

  const [activeTab, setActiveTab] = useState<'sample_class' | 'personal'>('sample_class');

  const demoAnalytics = useMemo(() => buildDemoClassAnalytics(), []);
  const personalMissed = useMemo(
    () => extractPersonalMissedQuestions(learnerProgress?.quizResultsByLesson || {}),
    [learnerProgress]
  );

  if (!showTeacherAnalyticsModal) {
    return null;
  }

  const isEn = bilingualMode === 'en';
  const allLessons = Object.values(LESSONS_REGISTRY);

  const personalCompletedLessonsCount = allLessons.filter((l) => {
    const done = learnerProgress?.completedSectionsByLesson?.[l.id] || [];
    return done.length >= l.sections.length;
  }).length;

  const personalQuizCount = Object.keys(learnerProgress?.quizResultsByLesson || {}).length;
  const personalCertCount = Object.keys(learnerProgress?.certificatesByLesson || {}).length;

  const handleJumpToSection = (lessonId: number, sectionIndex: number) => {
    setShowTeacherAnalyticsModal(false);
    openReader(lessonId, sectionIndex);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                {isEn ? 'Learning Progress Tracker' : 'Bảng Theo Dõi Học Tập'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Lesson completions, quiz scores, and direct jump from missed questions to textbook sections'
                  : 'Theo dõi tiến độ theo bài, điểm trắc nghiệm và bấm vào câu hay sai để mở đúng mục kiến thức'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowTeacherAnalyticsModal(false)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-4 sm:px-5 pt-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 bg-white dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setActiveTab('sample_class')}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'sample_class'
                ? 'border-indigo-600 text-indigo-700 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            {isEn ? 'Class Overview (Sample / Demo Data)' : 'Tổng quan lớp học (Dữ liệu minh họa - Mẫu)'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'personal'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            {isEn
              ? `Active Profile Progress (${activeProfile?.fullName || ''})`
              : `Tiến độ hồ sơ đang mở (${activeProfile?.fullName || ''})`}
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 bg-slate-50/70 dark:bg-slate-950/60">
          {activeTab === 'sample_class' ? (
            <>
              {/* Strict Privacy & Demo Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 flex items-start gap-3 text-xs text-amber-950 dark:text-amber-100">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-extrabold uppercase tracking-wide text-[11px] text-amber-800 dark:text-amber-300">
                    {isEn ? demoAnalytics.cohortNameEn : demoAnalytics.cohortNameVi}
                  </div>
                  <p className="leading-relaxed">
                    {isEn ? demoAnalytics.disclaimerEn : demoAnalytics.disclaimerVi}
                  </p>
                </div>
              </div>

              {/* Frequently Missed Questions (Clickable to exact textbook section) */}
              <div className="space-y-2.5">
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>
                    {isEn
                      ? 'Frequently Missed Questions (Sample Data — Click to Open Section)'
                      : 'Các câu hỏi hay sai nhất (Dữ liệu mẫu — Bấm để mở đúng mục kiến thức)'}
                  </span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {demoAnalytics.topMissedQuestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleJumpToSection(item.lessonId, item.targetSectionIndex)}
                      className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-left transition-all cursor-pointer group flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-bold text-indigo-700 dark:text-indigo-400">
                          {isEn ? `Lesson ${item.lessonId}` : `Bài ${item.lessonId}`} ·{' '}
                          {isEn ? item.sectionTitleEn : item.sectionTitleVi}
                        </span>
                        <span className="font-mono font-bold text-rose-600 dark:text-rose-400 shrink-0 tabular-nums">
                          {item.missRatePercent}% {isEn ? 'missed' : 'sai'} ({item.missedStudentsCount}/
                          {demoAnalytics.sampleCohortSize})
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                        {isEn ? item.questionEn : item.questionVi}
                      </p>
                      <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>{isEn ? 'Open Knowledge Section' : 'Mở mục kiến thức tương ứng'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Per-lesson Sample Completion & Quiz Table */}
              <div className="space-y-2.5">
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {isEn
                    ? 'Per-Lesson Progress & Quiz Averages (Sample Data)'
                    : 'Bảng tiến độ hoàn thành & điểm trung bình theo bài (Dữ liệu mẫu)'}
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="p-3">{isEn ? 'Lesson' : 'Bài học'}</th>
                        <th className="p-3 text-right">{isEn ? 'Completed (Sample)' : 'Hoàn thành (Mẫu)'}</th>
                        <th className="p-3 text-right">{isEn ? 'Avg Quiz Score' : 'Điểm TB Quiz'}</th>
                        <th className="p-3 text-right">{isEn ? 'Action' : 'Mở bài'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {demoAnalytics.lessonStats.map((row) => (
                        <tr key={row.lessonId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                            <span className="font-mono text-indigo-600 dark:text-indigo-400 mr-1.5">
                              {isEn ? `L${row.lessonId}` : `B${row.lessonId}`}
                            </span>
                            {isEn ? row.lessonTitleEn : row.lessonTitleVi}
                          </td>
                          <td className="p-3 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300">
                            {row.sampleStudentsCompleted}/{row.sampleTotalStudents} (
                            {Math.round((row.sampleStudentsCompleted / row.sampleTotalStudents) * 100)}%)
                          </td>
                          <td className="p-3 text-right font-mono font-bold tabular-nums text-emerald-700 dark:text-emerald-400">
                            {row.avgQuizScore.toFixed(1)}/10
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleJumpToSection(row.lessonId, 0)}
                              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
                            >
                              {isEn ? 'Open →' : 'Mở bài →'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            /* REAL LOCAL PROFILE DATA TAB */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {activeProfile?.fullName || (isEn ? 'Guest Profile' : 'Hồ sơ hiện tại')}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {activeProfile?.learnerId || ''} ·{' '}
                      {activeProfile?.role === 'teacher'
                        ? isEn
                          ? 'Teacher (Personal Progress View)'
                          : 'Giáo viên (Tiến độ cá nhân thật trên máy)'
                        : isEn
                        ? 'Student (Personal Progress)'
                        : 'Học sinh (Dữ liệu thật theo hồ sơ)'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <div className="text-slate-400">{isEn ? 'Lessons Done' : 'Bài hoàn thành'}</div>
                    <div className="font-mono font-black text-base text-emerald-600 dark:text-emerald-400 tabular-nums">
                      {personalCompletedLessonsCount}/34
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400">{isEn ? 'Quizzes Taken' : 'Bài đã làm Quiz'}</div>
                    <div className="font-mono font-black text-base text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {personalQuizCount}/34
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-slate-400">{isEn ? 'Certificates' : 'Chứng chỉ'}</div>
                    <div className="font-mono font-black text-base text-amber-600 dark:text-amber-400 tabular-nums">
                      {personalCertCount}/34
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Missed Questions */}
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {isEn
                    ? `Your Missed Quiz Questions (${personalMissed.length})`
                    : `Câu hỏi cần ôn từ các lần làm Quiz (${personalMissed.length})`}
                </h4>
                {personalMissed.length === 0 ? (
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>
                      {isEn
                        ? 'No missed quiz questions recorded yet on this profile.'
                        : 'Chưa ghi nhận câu trả lời sai nào trong hồ sơ hiện tại.'}
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {personalMissed.map((m) => (
                      <button
                        key={`pm-${m.lessonId}-${m.questionId}`}
                        type="button"
                        onClick={() => handleJumpToSection(m.lessonId, m.targetSectionIndex)}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 hover:border-indigo-500 text-left cursor-pointer space-y-1.5 transition-all"
                      >
                        <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                          {isEn ? `Lesson ${m.lessonId}` : `Bài ${m.lessonId}`} ·{' '}
                          {isEn ? m.sectionTitleEn : m.sectionTitleVi}
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                          {isEn ? m.questionEn : m.questionVi}
                        </p>
                        <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                          {isEn ? 'Open Section to Review →' : 'Mở mục kiến thức để ôn →'}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Personal Per-Lesson Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-3">{isEn ? 'Lesson' : 'Bài học'}</th>
                      <th className="p-3 text-right">{isEn ? 'Sections' : 'Số mục'}</th>
                      <th className="p-3 text-right">{isEn ? 'Latest Quiz' : 'Điểm Quiz'}</th>
                      <th className="p-3 text-right">{isEn ? 'Cert' : 'Chứng nhận'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {allLessons.map((lesson) => {
                      const doneSecs = learnerProgress?.completedSectionsByLesson?.[lesson.id] || [];
                      const quizRec = learnerProgress?.quizResultsByLesson?.[lesson.id];
                      const certRec = learnerProgress?.certificatesByLesson?.[lesson.id];
                      return (
                        <tr key={lesson.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                            <button
                              type="button"
                              onClick={() => handleJumpToSection(lesson.id, 0)}
                              className="text-left hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
                            >
                              <span className="font-mono text-indigo-600 dark:text-indigo-400 mr-1.5">
                                {isEn ? `L${lesson.id}` : `B${lesson.lessonNumber}`}
                              </span>
                              {isEn ? lesson.titleEn : lesson.titleVi}
                            </button>
                          </td>
                          <td className="p-3 text-right font-mono tabular-nums text-slate-600 dark:text-slate-300">
                            {doneSecs.length}/{lesson.sections.length}
                          </td>
                          <td className="p-3 text-right font-mono tabular-nums font-bold">
                            {quizRec ? (
                              <span className={quizRec.score >= 8 ? 'text-emerald-600' : 'text-amber-600'}>
                                {quizRec.score}/{quizRec.totalQuestions}
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            {certRec ? (
                              <span className="inline-flex items-center gap-1 text-amber-600 font-bold">
                                <Award className="w-3.5 h-3.5" />
                                <span>{certRec.certId}</span>
                              </span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
