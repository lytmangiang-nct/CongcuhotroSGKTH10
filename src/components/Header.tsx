import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Languages, Sparkles, VolumeX, Volume2, Pause, Play, Eye, EyeOff, BookA, Maximize2, Minimize2, ChevronLeft, ChevronRight, ShieldCheck, Lock, Award, Check, Home, List, ChevronDown, Binary, User, Presentation, HelpCircle, BarChart3, Terminal, LogOut, MonitorPlay } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { useQuickTranslation } from '../context/QuickTranslationContext';
import { hasPythonPlaygroundForLesson } from '../data/pythonSandboxSamples';

export const Header: React.FC = () => {
  const {
    openCover,
    openToc,
    speak,
    bilingualMode,
    setBilingualMode,
    viewLayout,
    setViewLayout,
    setShowOriginalModal,
    setShowGlossaryModal,
    setShowAsciiModal,
    setShowQuizModal,
    navigateToQuiz,
    setShowCopyrightModal,
    completedSections,
    isAllSectionsComplete,
    isCertificateEarned,
    certificate,
    setShowCertificateModal,
    toggleSectionComplete,
    isSectionComplete,
    setTaskWarning,
    isSpeaking,
    isPaused,
    pauseSpeaking,
    resumeSpeaking,
    stopSpeaking,
    speechRate,
    setSpeechRate,
    toggleTocDrawer,
    currentPage,
    setCurrentPage,
    totalPages,
    nextPage,
    prevPage,
    isFullscreen,
    toggleFullscreen,
    currentLessonId,
    setCurrentLessonId,
    currentLesson,
    activeProfile,
    setShowProfileModal,
    isPresentationMode,
    togglePresentationMode,
    setIsPresentationMode,
    revealPresentationHints,
    setRevealPresentationHints,
    revealPresentationAnswers,
    setRevealPresentationAnswers,
    setShowGuidingPromptsModal,
    setShowTeacherAnalyticsModal,
    setShowVocabModal,
    setShowPythonLabModal,
    openTeachEnglish
  } = useBook();

  const hasPythonLab = hasPythonPlaygroundForLesson(currentLessonId);

  const { isHoverTranslationEnabled, toggleHoverTranslation, hideTranslation } = useQuickTranslation();

  const [showTocDropdown, setShowTocDropdown] = useState<boolean>(false);
  const tocDropdownRef = useRef<HTMLDivElement>(null);

  const [showToolsDropdown, setShowToolsDropdown] = useState<boolean>(false);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside or pressing Escape
  useEffect(() => {
    if (!showTocDropdown && !showToolsDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target instanceof Node ? e.target : null;
      if (tocDropdownRef.current && (!target || !tocDropdownRef.current.contains(target))) {
        setShowTocDropdown(false);
      }
      if (toolsDropdownRef.current && (!target || !toolsDropdownRef.current.contains(target))) {
        setShowToolsDropdown(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowTocDropdown(false);
        setShowToolsDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showTocDropdown, showToolsDropdown]);

  const currentSec = currentLesson.sections[currentPage];
  const pageLabel = bilingualMode === 'en' ? currentSec?.titleEn : currentSec?.titleVi;

  if (isPresentationMode) {
    return (
      <header className="shrink-0 z-40 bg-slate-950 text-white border-b border-indigo-500/40 shadow-lg px-4 sm:px-6 py-2.5">
        <div className="w-full flex flex-wrap items-center justify-between gap-2.5">
          {/* Left: Lesson & Section */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded-xl bg-indigo-600 text-white font-black text-xs shrink-0 whitespace-nowrap flex items-center gap-1.5">
              <Presentation className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'PRESENTATION' : 'TRÌNH CHIẾU'}</span>
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-indigo-300 truncate">
                {bilingualMode === 'en'
                  ? `Lesson ${currentLesson.lessonNumber}: ${currentLesson.titleEn}`
                  : `Bài ${currentLesson.lessonNumber}: ${currentLesson.titleVi}`}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white truncate">
                {pageLabel}
              </div>
            </div>
          </div>

          {/* Center: Section Switcher */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={prevPage}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'Prev' : 'Trước'}</span>
            </button>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-cyan-300 whitespace-nowrap">
              {currentPage + 1}/{totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage === totalPages - 1}
              onClick={nextPage}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <span>{bilingualMode === 'en' ? 'Next' : 'Sau'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Hint/Answer Controls, Guiding Prompts, Language, Exit */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowGuidingPromptsModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Guiding Questions' : 'Câu hỏi dẫn dắt'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPresentationMode(false);
                openTeachEnglish();
              }}
              className="px-2.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white border border-sky-400/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <MonitorPlay className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Teach in English' : 'Dạy học bằng tiếng Anh'}</span>
            </button>

            <button
              type="button"
              onClick={() => setRevealPresentationHints(!revealPresentationHints)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap border transition-colors ${
                revealPresentationHints
                  ? 'bg-cyan-600 border-cyan-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {revealPresentationHints ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>
                {revealPresentationHints
                  ? (bilingualMode === 'en' ? 'Hide Hints' : 'Ẩn gợi ý')
                  : (bilingualMode === 'en' ? 'Show Hints' : 'Hiện gợi ý')}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setRevealPresentationAnswers(!revealPresentationAnswers)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap border transition-colors ${
                revealPresentationAnswers
                  ? 'bg-emerald-600 border-emerald-400 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {revealPresentationAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>
                {revealPresentationAnswers
                  ? (bilingualMode === 'en' ? 'Hide Answers' : 'Ẩn đáp án')
                  : (bilingualMode === 'en' ? 'Show Answers' : 'Hiện đáp án')}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBilingualMode(bilingualMode === 'en' ? 'vi' : 'en')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold cursor-pointer whitespace-nowrap"
            >
              {bilingualMode === 'en' ? '🇬🇧 EN' : '🇻🇳 VI'}
            </button>

            <button
              type="button"
              onClick={() => setIsPresentationMode(false)}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Exit Presentation' : 'Thoát trình chiếu'}</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="shrink-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs px-3 sm:px-6 py-2.5">
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Logo & Textbook title & Quick Lesson Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setShowCopyrightModal(true)}
              className="w-9 h-9 rounded-xl bg-indigo-700 hover:bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-indigo-700/20 font-black text-base transition-colors shrink-0 cursor-pointer"
              title={bilingualMode === 'en' ? 'View textbook copyright & authors' : 'Xem thông tin xuất bản, Ban tác giả & Bản quyền Sách giáo khoa'}
            >
              10
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  data-topic-title="true"
                  data-en={`Topic ${currentLesson.topicNumber}: ${currentLesson.topicTitleEn}`}
                  data-vi={`Chủ đề ${currentLesson.topicNumber}: ${currentLesson.topicTitleVi}`}
                  onClick={() => setShowCopyrightModal(true)}
                  className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left cursor-pointer"
                  title={bilingualMode === 'en' ? 'View textbook copyright & authors' : 'Xem thông tin xuất bản, Ban tác giả & Bản quyền Sách giáo khoa'}
                >
                  {bilingualMode === 'en'
                    ? `Topic ${currentLesson.topicNumber} • Informatics 10`
                    : `Chủ đề ${currentLesson.topicNumber} • Tin học 10 KNTT`}
                </button>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800 px-1.5 py-0.2 rounded font-semibold hidden md:inline">
                  {bilingualMode === 'en'
                    ? (currentLesson.pageRangeEn || currentLesson.pageRange.replace('Trang', 'Pages').replace('SGK', 'Textbook'))
                    : currentLesson.pageRange}
                </span>
              </div>
              <h1
                data-lesson-title="true"
                data-lesson-num={currentLesson.lessonNumber}
                data-vi={`Bài ${currentLesson.lessonNumber}: ${currentLesson.titleVi}`}
                data-en={`Lesson ${currentLesson.lessonNumber}: ${currentLesson.titleEn}`}
                className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100 leading-tight hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors truncate max-w-[220px] sm:max-w-xs md:max-w-md cursor-help"
                title={bilingualMode === 'en' ? `Bản dịch tiếng Việt: Bài ${currentLesson.lessonNumber}: ${currentLesson.titleVi}` : undefined}
              >
                {bilingualMode === 'en'
                  ? `Lesson ${currentLesson.lessonNumber}: ${currentLesson.titleEn}`
                  : `Bài ${currentLesson.lessonNumber}: ${currentLesson.titleVi}`}
              </h1>
            </div>
          </div>

          {/* Collapsed Hidden Lesson Switcher Button (Thu gọn thanh điều hướng bài học vào mục lục ẩn) */}
          <button
            type="button"
            onClick={toggleTocDrawer}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 hover:text-indigo-600 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs group"
            title={bilingualMode === 'en' ? 'Click to open hidden drawer with all 34 lessons' : 'Bấm để mở danh sách toàn bộ 34 bài học (ẩn trong Mục lục thông minh)'}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-600 group-hover:scale-125 transition-transform" />
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
              {bilingualMode === 'en' ? `Lesson ${currentLesson.lessonNumber}` : `Bài ${currentLesson.lessonNumber}`}
            </span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 font-medium text-[11px] flex items-center gap-1">
              <span>{bilingualMode === 'en' ? 'Change Lesson' : 'Đổi bài học'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-y-0.5" />
            </span>
          </button>

          {/* Quick View Navigation: Trang bìa & Mục lục */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={openCover}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
              title={bilingualMode === 'en' ? 'Back to Cover Page' : 'Quay lại Trang bìa chính'}
            >
              <Home className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden md:inline">{bilingualMode === 'en' ? 'Cover' : 'Trang bìa'}</span>
            </button>

            {/* Quick TOC Dropdown Container */}
            <div className="relative" ref={tocDropdownRef}>
              <button
                type="button"
                onClick={() => setShowTocDropdown(!showTocDropdown)}
                className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-indigo-200 dark:border-indigo-800 shadow-2xs"
                title={bilingualMode === 'en' ? 'Table of Contents Dropdown' : 'Mục lục dạng dropdown (chọn nhanh bài và phần)'}
              >
                <List className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{bilingualMode === 'en' ? 'TOC' : 'Mục lục'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showTocDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* FLOATING QUICK TOC DROPDOWN */}
              {showTocDropdown && (
                <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
                  {/* Current Lesson Header */}
                  <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                        {bilingualMode === 'en' ? `Lesson ${currentLesson.lessonNumber}` : `Bài ${currentLesson.lessonNumber}`}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                        {completedSections.length}/{currentLesson.sections.length} {bilingualMode === 'en' ? 'completed' : 'đã học'} ({Math.round((completedSections.length / currentLesson.sections.length) * 100)}%)
                      </span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-snug truncate">
                      {bilingualMode === 'en' ? currentLesson.titleEn : currentLesson.titleVi}
                    </div>
                    {/* Mini Progress Bar */}
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.round((completedSections.length / currentLesson.sections.length) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Current Lesson Sections (Dropdown list) */}
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                      {bilingualMode === 'en' ? 'Lesson Sections (Click to Jump):' : 'Các phần trong bài (Bấm để nhảy tới):'}
                    </div>
                    <div className="max-h-56 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                      {currentLesson.sections.map((sec, idx) => {
                        const isCurrent = currentPage === idx;
                        const isDone = isSectionComplete(idx);

                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setCurrentPage(idx);
                              setShowTocDropdown(false);
                            }}
                            className={`p-2 rounded-xl text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
                              isCurrent
                                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                isCurrent
                                  ? 'bg-white/20 text-white'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                              }`}>
                                {idx + 1}
                              </span>
                              <span className="truncate">
                                {bilingualMode === 'en' ? sec.titleEn : sec.titleVi}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <span className={`text-[10px] font-mono ${isCurrent ? 'text-indigo-200' : 'text-slate-400'}`}>
                                {sec.sgkPage.replace('Trang ', 'p.')}
                              </span>
                              {isDone && (
                                <Check className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-600'}`} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>


                  {/* Open Full 34 Lessons TOC Modal Button */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setShowTocDropdown(false);
                        toggleTocDrawer();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-700 dark:hover:text-indigo-300 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>{bilingualMode === 'en' ? 'Open Full 34 Lessons TOC Modal ↗' : 'Mở Bảng Mục Lục Đầy Đủ 34 Bài SGK ↗'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center: Current Section Indicator (Clean, non-redundant breadcrumb) */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100/90 dark:bg-slate-800/90 px-3 py-1.5 rounded-xl text-xs border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">
            {bilingualMode === 'en' ? `Section ${currentPage + 1}/${totalPages}` : `Phần ${currentPage + 1}/${totalPages}`}
          </span>
          <span className="text-slate-300 dark:text-slate-600">•</span>
          <span
            data-section-title="true"
            data-en={currentSec?.titleEn}
            data-vi={currentSec?.titleVi}
            className="text-slate-700 dark:text-slate-200 font-medium truncate max-w-[220px] cursor-help"
            title={pageLabel}
          >
            {pageLabel}
          </span>
          {isSectionComplete(currentPage) && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
              <span>{bilingualMode === 'en' ? 'Done' : 'Đã học'}</span>
            </span>
          )}
        </div>

        {/* Right: Bilingual Mode Toggle & Smart Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* TTS Audio Controls: ONLY shown when in Bilingual or English mode */}
          {bilingualMode !== 'vi' && (
            <div className="flex items-center gap-1 bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shrink-0">
              {isSpeaking ? (
                <div className="flex items-center gap-1">
                  {/* Pause / Resume Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isPaused) {
                        resumeSpeaking();
                      } else {
                        pauseSpeaking();
                      }
                    }}
                    className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                      isPaused
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                    title={isPaused ? 'Tiếp tục đọc (Resume)' : 'Tạm dừng đọc (Pause)'}
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                    <span className="hidden sm:inline">{isPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
                  </button>

                  {/* Stop Button */}
                  <button
                    type="button"
                    onClick={stopSpeaking}
                    className="p-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-all cursor-pointer shadow-2xs"
                    title="Dừng phát âm (Stop)"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    speak(currentSec?.speechEn || currentSec?.titleEn || '', 'en');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs shrink-0"
                  title="Nghe phát âm tiếng Anh bài học (Speech EN)"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>EN</span>
                </button>
              )}

              {/* Speed Selector (0.5x, 0.8x, 1x) - Accessible on Mobile & Desktop */}
              <div className="flex items-center gap-0.5 pl-1 border-l border-slate-200 dark:border-slate-700" title="Tốc độ đọc tiếng Anh">
                {[0.5, 0.8, 1.0].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => {
                      setSpeechRate(rate);
                      if (isSpeaking && !isPaused) {
                        stopSpeaking();
                        setTimeout(() => {
                          speak(currentSec?.speechEn || currentSec?.titleEn || '', 'en');
                        }, 50);
                      }
                    }}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                      Math.abs(speechRate - rate) < 0.05
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    title={`Tốc độ đọc ${rate}x`}
                  >
                    {rate === 1.0 ? '1x' : `${rate}x`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Language Switcher (Tiếng Việt | English) */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setBilingualMode('vi');
                hideTranslation();
              }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                bilingualMode === 'vi'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
              title="Chế độ Tiếng Việt chuẩn SGK Tin học 10"
            >
              <span>🇻🇳</span>
              <span>Tiếng Việt</span>
            </button>

            <button
              type="button"
              onClick={() => setBilingualMode('en')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                bilingualMode === 'en'
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
              title="English Immersion Mode (Curriculum standard)"
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          {/* Quick Hover Translation Toggle Button (in English mode): Icon only for maximum neatness */}
          {bilingualMode === 'en' && (
            <button
              type="button"
              onClick={toggleHoverTranslation}
              className={`p-1.5 rounded-xl transition-all cursor-pointer shadow-2xs relative flex items-center justify-center shrink-0 ${
                isHoverTranslationEnabled
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700'
              }`}
              title={
                isHoverTranslationEnabled
                  ? 'Bong bóng dịch nhanh khi di chuột (Hover Translation): Đang BẬT (Bấm để tắt)'
                  : 'Bong bóng dịch nhanh khi di chuột (Hover Translation): Đang TẮT (Bấm để bật)'
              }
              aria-label="Toggle Quick Hover Translation"
            >
              <Languages className="w-4 h-4" />
              {isHoverTranslationEnabled && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>
          )}

          {/* Presentation Mode, Teach in English, Guiding Questions, Vocab, Learning Tracker & Python Lab */}
          <button
            type="button"
            onClick={openTeachEnglish}
            className="px-2.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white border border-sky-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap shadow-xs"
            title={bilingualMode === 'en' ? 'Teach in English — Dual-screen Teacher Console & Projector + Live Poll' : 'Dạy học bằng tiếng Anh — Bảng điều khiển 4 bước & Màn hình trình chiếu'}
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Teach in English' : 'Dạy học bằng tiếng Anh'}</span>
          </button>

          <button
            type="button"
            onClick={togglePresentationMode}
            className="px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap"
            title={bilingualMode === 'en' ? 'Classroom Presentation Mode (Large text & collapsed answers)' : 'Chế độ Trình chiếu trên lớp (Cỡ chữ lớn & thu gọn đáp án)'}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{bilingualMode === 'en' ? 'Present' : 'Trình chiếu'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowGuidingPromptsModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap"
            title={bilingualMode === 'en' ? 'Bilingual Guiding Questions (Warm-up, Predict, Apply)' : 'Câu hỏi dẫn dắt song ngữ theo bài'}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{bilingualMode === 'en' ? 'Guiding' : 'Câu hỏi dẫn dắt'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowVocabModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/50 dark:hover:bg-teal-900/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap"
            title={bilingualMode === 'en' ? 'Lesson Vocabulary Flashcards' : 'Thẻ từ vựng song ngữ theo bài'}
          >
            <BookA className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">{bilingualMode === 'en' ? 'Vocab' : 'Từ vựng'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowTeacherAnalyticsModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap"
            title={bilingualMode === 'en' ? 'Learning Tracker Dashboard' : 'Bảng theo dõi học tập'}
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden xl:inline">{bilingualMode === 'en' ? 'Tracker' : 'Theo dõi học tập'}</span>
          </button>

          {hasPythonLab && (
            <button
              type="button"
              onClick={() => setShowPythonLabModal(true)}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap shadow-2xs"
              title={bilingualMode === 'en' ? 'Guided Python Sandbox' : 'Thực hành Python có gợi ý'}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{bilingualMode === 'en' ? 'Python Lab' : 'Thực hành Python'}</span>
            </button>
          )}

          {/* Smart Table of Contents Feature Toggle Button */}
          <button
            type="button"
            onClick={toggleTocDrawer}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 active:scale-95 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all shrink-0 whitespace-nowrap"
            title={bilingualMode === 'en' ? 'Open Table of Contents' : 'Mở Mục lục thông minh & Tiến độ 34 bài'}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>{bilingualMode === 'en' ? 'TOC' : 'Mục lục'}</span>
          </button>

          {/* Compact Tools Dropdown Menu (Tiện ích ▾) - Replaces multiple scattered modal buttons */}
          <div className="relative" ref={toolsDropdownRef}>
            <button
              type="button"
              onClick={() => setShowToolsDropdown(!showToolsDropdown)}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs"
              title={bilingualMode === 'en' ? 'Textbook Tools & Reference' : 'Tiện ích tra cứu & Hồ sơ SGK'}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Tools' : 'Tiện ích'}</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showToolsDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showToolsDropdown && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                  {bilingualMode === 'en' ? 'Textbook Utilities & Reference' : 'Tiện ích tra cứu SGK'}
                </div>

                {/* 1. Bản quyền & Tác giả */}
                <button
                  type="button"
                  onClick={() => {
                    setShowToolsDropdown(false);
                    setShowCopyrightModal(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-bold">{bilingualMode === 'en' ? 'Copyright & Authors' : 'Bản quyền SGK & Ban tác giả'}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{bilingualMode === 'en' ? 'GS.TSKH Pham The Long • NXBGDVN (p. 168)' : 'GS.TSKH Phạm Thế Long • NXBGDVN (Tr. 168)'}</div>
                  </div>
                </button>

                {/* 2. SGK Gốc (Scans) */}
                <button
                  type="button"
                  onClick={() => {
                    setShowToolsDropdown(false);
                    setShowOriginalModal(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="font-bold">{bilingualMode === 'en' ? 'Textbook Scans' : 'Đối chiếu SGK Gốc'}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{bilingualMode === 'en' ? 'Browse original printed pages' : 'Xem ảnh chụp scan đối chiếu'}</div>
                  </div>
                </button>

                {/* 3. Từ điển thuật ngữ */}
                <button
                  type="button"
                  onClick={() => {
                    setShowToolsDropdown(false);
                    setShowGlossaryModal(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <BookA className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="font-bold">{bilingualMode === 'en' ? 'Curriculum Glossary' : 'Từ điển thuật ngữ Tin học 10'}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{bilingualMode === 'en' ? '29 core terms with definitions (p. 166-167)' : '29 thuật ngữ SGK chính thức (Tr. 166-167)'}</div>
                  </div>
                </button>

                {/* 4. Bảng mã ASCII */}
                <button
                  type="button"
                  onClick={() => {
                    setShowToolsDropdown(false);
                    setShowAsciiModal(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-amber-50 dark:hover:bg-amber-950/40 text-slate-700 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Binary className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-bold">{bilingualMode === 'en' ? 'Extended ASCII Table' : 'Bảng mã ASCII mở rộng (256 ký tự)'}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{bilingualMode === 'en' ? '16x16 matrix + Text-to-Binary tool (p. 165)' : 'Ma trận 16x16 + Bộ chuyển đổi (Tr. 165)'}</div>
                  </div>
                </button>

                {/* 5. Hồ sơ người học */}
                <button
                  type="button"
                  onClick={() => {
                    setShowToolsDropdown(false);
                    setShowProfileModal(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2.5 transition-colors cursor-pointer border-t border-slate-100 dark:border-slate-800"
                >
                  <User className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-bold">{bilingualMode === 'en' ? 'Learner Profile' : 'Hồ sơ người học'}</div>
                    <div className="text-[10px] text-slate-400 font-normal truncate">
                      {activeProfile
                        ? `${activeProfile.fullName} (${activeProfile.role === 'teacher' ? (bilingualMode === 'en' ? 'Teacher' : 'Giáo viên') : (bilingualMode === 'en' ? 'Student' : 'Học sinh')})`
                        : (bilingualMode === 'en' ? 'View progress & certificates' : 'Xem tiến độ & chứng chỉ')}
                    </div>
                  </div>
                </button>

                {/* Teacher & Student Learning Support quick links inside menu */}
                <button
                  type="button"
                  onClick={() => {
                    setShowToolsDropdown(false);
                    setShowVocabModal(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-teal-50 dark:hover:bg-teal-950/40 text-slate-700 dark:text-slate-200 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <BookA className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <div className="font-bold">{bilingualMode === 'en' ? 'Lesson Vocabulary' : 'Thẻ từ vựng theo bài'}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{bilingualMode === 'en' ? 'Flashcards, audio & bookmarks' : 'Flashcard, phát âm & lưu từ khó'}</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowToolsDropdown(false);
                    setShowTeacherAnalyticsModal(true);
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <BarChart3 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="font-bold">{bilingualMode === 'en' ? 'Learning Tracker' : 'Bảng theo dõi học tập'}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{bilingualMode === 'en' ? 'Sample class analytics & profile progress' : 'Dữ liệu mẫu lớp học & tiến độ cá nhân'}</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowToolsDropdown(false);
                    openTeachEnglish();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-sky-50 dark:hover:bg-sky-950/40 text-slate-700 dark:text-slate-200 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <MonitorPlay className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <div className="font-bold">{bilingualMode === 'en' ? 'Teach in English' : 'Dạy học bằng tiếng Anh'}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{bilingualMode === 'en' ? 'Dual-screen lesson script, speech & live poll' : 'Kịch bản 4 bước, trình chiếu song song & bình chọn'}</div>
                  </div>
                </button>

                {hasPythonLab && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowToolsDropdown(false);
                      setShowPythonLabModal(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-200 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Terminal className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-bold">{bilingualMode === 'en' ? 'Guided Python Lab' : 'Thực hành Python có gợi ý'}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{bilingualMode === 'en' ? 'Interactive runner & 3-tier hints' : 'Chạy mã cô lập & gợi ý 3 mức'}</div>
                    </div>
                  </button>
                )}

                {/* 6. Bong bóng dịch nhanh Hover (chỉ hiển thị ở chế độ Tiếng Anh) */}
                {bilingualMode === 'en' && (
                  <button
                    type="button"
                    onClick={() => {
                      toggleHoverTranslation();
                    }}
                    className="w-full px-3 py-2 rounded-xl text-left text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-between transition-colors cursor-pointer border-t border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <Languages className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-bold">Hover Quick Translation</div>
                        <div className="text-[10px] text-slate-400 font-normal">Show Vietnamese translation bubble near cursor</div>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      isHoverTranslationEnabled
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                    }`}>
                      {isHoverTranslationEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>
                )}

              </div>
            )}
          </div>

          {/* Direct Profile Button */}
          <button
            type="button"
            onClick={() => setShowProfileModal(true)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/50 text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs"
            title={
              activeProfile
                ? `${bilingualMode === 'en' ? 'Profile' : 'Hồ sơ'}: ${activeProfile.fullName}`
                : bilingualMode === 'en'
                ? 'Learner Profile'
                : 'Hồ sơ'
            }
          >
            <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="hidden lg:inline max-w-[110px] truncate">
              {activeProfile?.fullName || (bilingualMode === 'en' ? 'Profile' : 'Hồ sơ')}
            </span>
            <span className="lg:hidden">{bilingualMode === 'en' ? 'Profile' : 'Hồ sơ'}</span>
          </button>

          {/* Certificate button ONLY if student actually earned it (100% sections complete AND quiz >= 8/10) */}
          {isCertificateEarned && certificate && (
            <button
              type="button"
              onClick={() => setShowCertificateModal(true)}
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs flex items-center gap-1 shadow-sm transition-all cursor-pointer animate-in fade-in"
              title={bilingualMode === 'en' ? `View Certificate for Lesson ${currentLesson.lessonNumber} (${certificate.score}/10)` : `Xem Giấy chứng nhận hoàn thành Bài ${currentLesson.lessonNumber} (${certificate.score}/10 điểm)`}
            >
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Certificate' : 'Chứng nhận'}</span>
              <span className="text-[10px] bg-slate-950/20 px-1 py-0.2 rounded font-mono font-bold">
                {certificate.score}/10
              </span>
            </button>
          )}

          {/* 10-Question Quiz Launcher with Dynamic Unlock State */}
          <button
            type="button"
            onClick={navigateToQuiz}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              isAllSectionsComplete
                ? 'bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white shadow-md shadow-emerald-600/30 ring-2 ring-amber-300/80 animate-pulse scale-105'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 opacity-90'
            }`}
            title={
              isAllSectionsComplete
                ? (bilingualMode === 'en' ? '🎉 Unlocked! Click to take 10-question quiz & earn certificate' : '🎉 Đã mở khóa! Bấm để làm 10 câu trắc nghiệm & nhận Chứng nhận')
                : (bilingualMode === 'en'
                    ? `Completed ${completedSections.length}/${totalPages} sections — ${totalPages - completedSections.length} sections remaining to unlock quiz.`
                    : `Đã hoàn thành ${completedSections.length}/${totalPages} phần — còn ${totalPages - completedSections.length} phần để mở kiểm tra`)
            }
          >
            {isAllSectionsComplete ? (
              <Sparkles className="w-4 h-4 text-amber-200 fill-amber-300" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            )}
            <span>
              {isAllSectionsComplete
                ? (bilingualMode === 'en' ? 'Take Quiz (10Q) ✨' : 'Làm trắc nghiệm (10 câu) ✨')
                : (bilingualMode === 'en' ? 'Quiz (Locked)' : 'Trắc nghiệm (Khóa)')}
            </span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
              isAllSectionsComplete
                ? 'bg-white/25 text-white'
                : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
            }`}>
              {completedSections.length}/{totalPages}
            </span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isFullscreen ? (bilingualMode === 'en' ? 'Exit Full Screen' : 'Thu nhỏ cửa sổ') : (bilingualMode === 'en' ? 'Full Screen' : 'Toàn màn hình')}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
