import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Info
} from 'lucide-react';
import { useBook, LearnerRole } from '../context/BookContext';
import { validateFullName, NameValidationError } from '../services/learnerStorage';

export const OnboardingProfileModal: React.FC = () => {
  const {
    activeProfile,
    hasLegacyProgress,
    confirmInitialProfile,
    bilingualMode,
    setBilingualMode
  } = useBook();

  const [role, setRole] = useState<LearnerRole>('student');
  const [rawName, setRawName] = useState<string>('');
  const [step, setStep] = useState<'edit' | 'confirm'>('edit');
  const [errorCode, setErrorCode] = useState<NameValidationError | null>(null);

  // Reset form cleanly whenever session returns to onboarding (e.g. after "Học lại từ đầu")
  useEffect(() => {
    if (!activeProfile) {
      setRole('student');
      setRawName('');
      setStep('edit');
      setErrorCode(null);
    }
  }, [activeProfile]);

  if (activeProfile) return null;

  const validation = validateFullName(rawName);

  const getErrorMessage = (code: NameValidationError | null) => {
    if (!code) return null;
    if (bilingualMode === 'en') {
      switch (code) {
        case 'empty':
          return 'Please enter your full name before continuing.';
        case 'too_short':
          return 'Full name must contain at least 2 characters.';
        case 'invalid_chars':
          return 'Please enter a valid name using letters (Vietnamese diacritics accepted), spaces, dots, hyphens, or apostrophes.';
      }
    }
    switch (code) {
      case 'empty':
        return 'Vui lòng nhập họ và tên đầy đủ trước khi tiếp tục.';
      case 'too_short':
        return 'Họ và tên cần có ít nhất 2 ký tự.';
      case 'invalid_chars':
        return 'Họ và tên chỉ được chứa chữ cái (hỗ trợ đầy đủ dấu tiếng Việt), khoảng trắng, dấu chấm, dấu gạch nối hoặc dấu nháy.';
    }
  };

  const handleReviewStep = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateFullName(rawName);
    if (!res.valid) {
      setErrorCode(res.error || 'empty');
      return;
    }
    setErrorCode(null);
    setRawName(res.normalized);
    setStep('confirm');
  };

  const handleConfirmStart = () => {
    const res = validateFullName(rawName);
    if (!res.valid) {
      setErrorCode(res.error || 'empty');
      setStep('edit');
      return;
    }
    confirmInitialProfile(role, res.normalized);
  };

  const roleLabelVi = role === 'teacher' ? 'Giáo viên' : 'Học sinh';
  const roleLabelEn = role === 'teacher' ? 'Teacher' : 'Student';

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-profile-title"
    >
      <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-600 to-blue-700 text-white flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-100">
                {bilingualMode === 'en'
                  ? 'Informatics 10 • Connecting Knowledge'
                  : 'Tin học 10 • Kết nối tri thức'}
              </div>
              <h2 id="onboarding-profile-title" className="text-lg sm:text-xl font-black leading-tight mt-0.5">
                {bilingualMode === 'en'
                  ? 'Create Learner Profile'
                  : 'Tạo Hồ Sơ Người Học'}
              </h2>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center bg-white/15 rounded-xl p-0.5 text-[11px] font-bold shrink-0">
            <button
              type="button"
              onClick={() => setBilingualMode('vi')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                bilingualMode === 'vi' ? 'bg-white text-indigo-700 shadow-xs' : 'text-white/90 hover:text-white'
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => setBilingualMode('en')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                bilingualMode === 'en' ? 'bg-white text-indigo-700 shadow-xs' : 'text-white/90 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {step === 'edit' ? (
            <form onSubmit={handleReviewStep} className="space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {bilingualMode === 'en'
                  ? 'Please select your role and enter your full name. Your profile tracks your lesson progress, quiz scores, and practice certificates under a unique learner ID.'
                  : 'Vui lòng chọn vai trò và nhập họ tên đầy đủ trước khi mở sách. Hệ thống sẽ ghi nhớ tiến độ học tập, điểm trắc nghiệm và cấp chứng nhận theo mã người học riêng của bạn.'}
              </p>

              {/* Legacy data notice if detected */}
              {hasLegacyProgress && (
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Previous un-scoped browser data was detected. Newly created profiles always start at 0% progress and will not inherit old data or certificates.'
                      : 'Hệ thống phát hiện dữ liệu cũ trên trình duyệt. Hồ sơ mới tạo sẽ luôn bắt đầu từ 0% và không kế thừa tiến độ hay chứng chỉ cũ.'}
                  </span>
                </div>
              )}

              {/* Role selection */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  {bilingualMode === 'en' ? '1. Select Role' : '1. Chọn vai trò'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                      role === 'student'
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-100 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        role === 'student'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm">
                        {bilingualMode === 'en' ? 'Student' : 'Học sinh'}
                      </div>
                      <div className="text-[11px] opacity-75">
                        {bilingualMode === 'en' ? 'Study & Quiz' : 'Học bài & Kiểm tra'}
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('teacher')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                      role === 'teacher'
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-100 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        role === 'teacher'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm">
                        {bilingualMode === 'en' ? 'Teacher' : 'Giáo viên'}
                      </div>
                      <div className="text-[11px] opacity-75">
                        {bilingualMode === 'en' ? 'Demo & Review' : 'Giảng dạy & Trình chiếu'}
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Full Name Input */}
              <div className="space-y-2">
                <label
                  htmlFor="onboarding-fullname-input"
                  className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                >
                  {bilingualMode === 'en' ? '2. Full Name (Vietnamese diacritics accepted)' : '2. Họ và tên đầy đủ (Chấp nhận dấu tiếng Việt)'}
                </label>
                <input
                  id="onboarding-fullname-input"
                  type="text"
                  value={rawName}
                  onChange={(e) => {
                    setRawName(e.target.value);
                    if (errorCode) setErrorCode(null);
                  }}
                  autoFocus
                  maxLength={80}
                  placeholder={bilingualMode === 'en' ? 'e.g. Nguyễn Minh Anh' : 'Ví dụ: Nguyễn Minh Anh'}
                  className={`w-full px-4 py-3 rounded-2xl border-2 bg-white dark:bg-slate-800 text-sm sm:text-base font-bold text-slate-900 dark:text-white outline-none transition-colors ${
                    errorCode
                      ? 'border-rose-500 focus:border-rose-600'
                      : 'border-slate-200 dark:border-slate-700 focus:border-indigo-600'
                  }`}
                />
                {errorCode && (
                  <div className="flex items-start gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 pt-0.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{getErrorMessage(errorCode)}</span>
                  </div>
                )}
                {validation.normalized && !errorCode && (
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {bilingualMode === 'en' ? 'Normalized display: ' : 'Tên chuẩn hóa sẽ hiển thị: '}
                    <strong className="text-slate-800 dark:text-slate-200">{validation.normalized}</strong>
                  </div>
                )}
              </div>

              {/* Browser storage note */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Progress and practice certificates are saved in this browser under your learner ID. You can reset via "Start Over" in Profile later.'
                    : 'Tiến độ và chứng chỉ luyện tập được lưu cục bộ trên trình duyệt theo mã người học. Có thể đổi người dùng qua mục "Hồ sơ" → "Học lại từ đầu".'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <span>{bilingualMode === 'en' ? 'Review Profile' : 'Kiểm tra thông tin'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Step 2: Verification & Confirmation before locking */
            <div className="space-y-5">
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {bilingualMode === 'en' ? 'Confirm Your Profile Details' : 'Kiểm tra họ tên và vai trò trước khi khóa'}
                  </span>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-indigo-100 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{bilingualMode === 'en' ? 'Role:' : 'Vai trò:'}</span>
                    <span className="font-extrabold text-indigo-700 dark:text-indigo-300">
                      {bilingualMode === 'en' ? roleLabelEn : roleLabelVi}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-slate-500 shrink-0">{bilingualMode === 'en' ? 'Full Name:' : 'Họ và tên:'}</span>
                    <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white text-right break-words">
                      {validation.normalized}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Once you click "Start Learning", your name and role will be locked to read-only and used on all issued certificates. To change name later, you must use "Start Over" (which resets progress to 0%).'
                      : 'Sau khi bấm "Bắt đầu học", họ tên và vai trò sẽ chuyển sang chế độ chỉ đọc và được dùng cố định cho mọi chứng chỉ của hồ sơ này. Muốn đổi tên về sau cần chọn "Học lại từ đầu" (tiến độ về 0%).'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep('edit')}
                  className="w-full sm:w-auto px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{bilingualMode === 'en' ? 'Back to Edit' : 'Quay lại sửa'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmStart}
                  className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 transition-all cursor-pointer"
                >
                  <span>{bilingualMode === 'en' ? 'Bắt đầu học (Start Learning)' : 'Bắt đầu học'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
