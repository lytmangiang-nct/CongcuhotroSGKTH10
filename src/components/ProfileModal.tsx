import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  Lock,
  Award,
  CheckCircle2,
  RotateCcw,
  AlertTriangle,
  ShieldAlert,
  Play,
  BookOpen,
  FileCheck2
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import { LESSONS_REGISTRY } from '../data/lessonsRegistry';

export const ProfileModal: React.FC = () => {
  const {
    activeProfile,
    learnerProgress,
    showProfileModal,
    setShowProfileModal,
    startOverProfile,
    bilingualMode,
    currentLessonId,
    currentPage,
    openReader,
    setShowCertificateModal
  } = useBook();

  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  if (!showProfileModal || !activeProfile) return null;

  const allLessons = Object.values(LESSONS_REGISTRY);
  const completedLessonsCount = allLessons.filter((lesson) => {
    const done = learnerProgress?.completedSectionsByLesson?.[lesson.lessonNumber] || [];
    return lesson.sections.length > 0 && done.length >= lesson.sections.length;
  }).length;

  const totalCompletedSections = allLessons.reduce((sum, lesson) => {
    const done = learnerProgress?.completedSectionsByLesson?.[lesson.lessonNumber] || [];
    return sum + done.length;
  }, 0);

  const totalSectionsAllLessons = allLessons.reduce((sum, lesson) => sum + lesson.sections.length, 0);

  const quizAttempts = Object.values(learnerProgress?.quizResultsByLesson || {}).sort(
    (a, b) => a.lessonId - b.lessonId
  );

  const certificates = Object.values(learnerProgress?.certificatesByLesson || {}).sort(
    (a, b) => a.lessonId - b.lessonId
  );

  const currentLessonObj = LESSONS_REGISTRY[currentLessonId] || allLessons[0];
  const currentSecObj = currentLessonObj?.sections[currentPage] || currentLessonObj?.sections[0];

  const handleClose = () => {
    setConfirmReset(false);
    setShowProfileModal(false);
  };

  const handleOpenCertForLesson = (lessonId: number) => {
    setConfirmReset(false);
    setShowProfileModal(false);
    openReader(lessonId, 0);
    setTimeout(() => {
      setShowCertificateModal(true);
    }, 60);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="learner-profile-modal-title"
    >
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
              {activeProfile.role === 'teacher' ? (
                <User className="w-5 h-5" />
              ) : (
                <GraduationCap className="w-5 h-5" />
              )}
            </div>
            <div>
              <h3 id="learner-profile-modal-title" className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                {bilingualMode === 'en' ? 'Learner Profile' : 'Hồ sơ người học'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                ID: {activeProfile.learnerId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label={bilingualMode === 'en' ? 'Close' : 'Đóng'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* 1. Locked Identity Card (Read-only) */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Confirmed Identity (Read-only)'
                    : 'Thông tin hồ sơ đã khóa (Chỉ đọc)'}
                </span>
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 text-indigo-700 dark:text-indigo-300">
                {activeProfile.role === 'teacher'
                  ? bilingualMode === 'en'
                    ? 'Teacher'
                    : 'Giáo viên'
                  : bilingualMode === 'en'
                  ? 'Student'
                  : 'Học sinh'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-slate-800">
                <div className="text-[11px] text-slate-500">
                  {bilingualMode === 'en' ? 'Full Name' : 'Họ và tên'}
                </div>
                <div className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5 break-words">
                  {activeProfile.fullName}
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-slate-800">
                <div className="text-[11px] text-slate-500">
                  {bilingualMode === 'en' ? 'Role & Learner Code' : 'Vai trò & Mã người học'}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                  {activeProfile.role === 'teacher'
                    ? bilingualMode === 'en'
                      ? 'Teacher'
                      : 'Giáo viên'
                    : bilingualMode === 'en'
                    ? 'Student'
                    : 'Học sinh'}
                </div>
                <div className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                  {activeProfile.learnerId}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Current Position & Overall Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Most Recent Location' : 'Vị trí đang học gần nhất'}</span>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                  {bilingualMode === 'en'
                    ? `Lesson ${currentLessonId}: ${currentLessonObj?.titleEn || ''}`
                    : `Bài ${currentLessonId}: ${currentLessonObj?.titleVi || ''}`}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {bilingualMode === 'en'
                    ? `Section ${currentPage + 1}/${currentLessonObj?.sections.length || 1}: ${currentSecObj?.titleEn || currentSecObj?.titleVi || ''}`
                    : `Mục ${currentPage + 1}/${currentLessonObj?.sections.length || 1}: ${currentSecObj?.titleVi || ''}`}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  openReader(currentLessonId, currentPage);
                }}
                className="self-start px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{bilingualMode === 'en' ? 'Resume Exact Section' : 'Mở đúng mục đang học'}</span>
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-center gap-1.5 text-center">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {completedLessonsCount}/34
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {bilingualMode === 'en' ? 'Lessons Completed' : 'Bài hoàn thành'}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                {totalCompletedSections}/{totalSectionsAllLessons}{' '}
                {bilingualMode === 'en' ? 'sections' : 'mục'}
              </div>
            </div>
          </div>

          {/* 3. Quiz Attempts History */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
              <span>
                {bilingualMode === 'en'
                  ? `Recorded Quiz Scores (${quizAttempts.length})`
                  : `Kết quả trắc nghiệm đã lưu (${quizAttempts.length})`}
              </span>
            </h4>
            {quizAttempts.length === 0 ? (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'No quiz attempts recorded for this profile yet.'
                  : 'Hồ sơ này chưa có bài kiểm tra trắc nghiệm nào được nộp.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quizAttempts.map((att) => {
                  const lsn = LESSONS_REGISTRY[att.lessonId];
                  return (
                    <div
                      key={att.lessonId}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {bilingualMode === 'en'
                            ? `Lesson ${att.lessonId}: ${lsn?.titleEn || ''}`
                            : `Bài ${att.lessonId}: ${lsn?.titleVi || ''}`}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {att.passed
                            ? bilingualMode === 'en'
                              ? 'Passed (≥ 8/10)'
                              : 'Đạt ngưỡng cấp chứng chỉ'
                            : bilingualMode === 'en'
                            ? 'Below 8/10 — No certificate'
                            : 'Dưới 8/10 — Chưa cấp chứng chỉ'}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-lg font-mono font-bold shrink-0 ${
                          att.passed
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {att.score}/{att.totalQuestions}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Certificates Earned by This Profile */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>
                {bilingualMode === 'en'
                  ? `Certificates Issued to This Profile (${certificates.length})`
                  : `Chứng chỉ đã cấp cho hồ sơ (${certificates.length})`}
              </span>
            </h4>
            {certificates.length === 0 ? (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Complete 100% of a lesson’s sections and score ≥ 8/10 on its quiz to earn a practice certificate.'
                  : 'Hoàn thành đủ tất cả các mục của một bài học và đạt từ 8/10 điểm trắc nghiệm để được cấp chứng chỉ.'}
              </div>
            ) : (
              <div className="space-y-2">
                {certificates.map((cert) => (
                  <div
                    key={cert.certId}
                    className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          {bilingualMode === 'en' ? `Lesson ${cert.lessonId}` : `Bài ${cert.lessonId}`} •{' '}
                          <span className="font-mono">{cert.lessonCode}</span>
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300">
                        {bilingualMode === 'en' ? 'Recipient:' : 'Người nhận:'}{' '}
                        <strong>{cert.studentName}</strong> • {cert.score}/{cert.totalQuestions} •{' '}
                        {cert.date} • <span className="font-mono">{cert.certId}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleOpenCertForLesson(cert.lessonId)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shrink-0 cursor-pointer transition-colors"
                    >
                      {bilingualMode === 'en' ? 'View Certificate' : 'Xem chứng chỉ'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Practice Certificate Notice (Browser Storage Transparency) */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">
                {bilingualMode === 'en'
                  ? 'Practice Certificate Notice: '
                  : 'Lưu ý về chứng chỉ luyện tập: '}
              </span>
              {bilingualMode === 'en'
                ? 'In this browser-only textbook edition, certificates reflect local practice results because browser storage can be cleared or modified. Official verification requires authenticated accounts and server-side grading.'
                : 'Trên phiên bản chạy trực tiếp trên trình duyệt, chứng chỉ thể hiện kết quả luyện tập cục bộ vì dữ liệu trình duyệt có thể bị xóa hoặc chỉnh sửa. Để cấp chứng chỉ chính thức không thể giả mạo, cần triển khai tài khoản đăng nhập và lưu/chấm điểm trên máy chủ.'}
            </div>
          </div>

          {/* 6. Start Over (Học lại từ đầu) */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            {!confirmReset ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {bilingualMode === 'en'
                      ? 'Switch User / Change Name?'
                      : 'Đổi người học hoặc đổi họ tên?'}
                  </div>
                  <div>
                    {bilingualMode === 'en'
                      ? 'Confirmed profiles are read-only. Create a fresh profile starting at 0%.'
                      : 'Hồ sơ hiện tại đang ở chế độ chỉ đọc. Muốn đổi tên cần tạo hồ sơ mới từ đầu.'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="px-4 py-2 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-950/70 text-rose-700 dark:text-rose-300 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Start Over' : 'Học lại từ đầu'}</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-rose-900 dark:text-rose-200">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-extrabold text-sm">
                      {bilingualMode === 'en'
                        ? 'Confirm "Start Over"?'
                        : 'Xác nhận "Học lại từ đầu"?'}
                    </div>
                    <p className="leading-relaxed">
                      {bilingualMode === 'en'
                        ? `Creating a new profile will generate a brand-new learner ID starting at 0% progress. The new profile will NOT inherit any completed sections, quiz scores, or certificates. Previously issued certificates for "${activeProfile.fullName}" keep their original recipient name.`
                        : `Khi xác nhận, bạn sẽ quay lại màn hình nhập vai trò và họ tên để tạo mã người học mới từ 0%. Hồ sơ mới sẽ KHÔNG kế thừa bài đã học, điểm trắc nghiệm hay chứng chỉ cũ. Các chứng chỉ đã cấp cho "${activeProfile.fullName}" vẫn giữ nguyên tên chủ sở hữu ban đầu.`}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs cursor-pointer"
                  >
                    {bilingualMode === 'en' ? 'Cancel' : 'Hủy bỏ'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmReset(false);
                      startOverProfile();
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>
                      {bilingualMode === 'en' ? 'Confirm Start Over' : 'Xác nhận học lại từ đầu'}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
