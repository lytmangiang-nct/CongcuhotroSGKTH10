import React, { useState, useEffect } from 'react';
import {
  Target,
  Layers,
  Database,
  Cpu,
  GraduationCap,
  Award,
  BookOpen,
  X,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Sparkles,
  Circle,
  Check,
  Globe,
  Scale,
  Palette,
  Code,
  Briefcase,
  Search,
  BookA,
  ArrowRight,
  Bookmark,
  Maximize2,
  Minimize2,
  Columns,
  Monitor,
  LayoutGrid,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ListFilter,
  ChevronsUpDown
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SGK_TOPICS, SGK_EXTRAS, SgkLesson } from '../data/curriculumData';
import { LESSONS_REGISTRY } from '../data/lessonsRegistry';

export const TableOfContents: React.FC = () => {
  const {
    openToc,
    currentLessonId,
    setCurrentLessonId,
    currentLesson,
    bilingualMode,
    setOriginalPageTarget,
    setShowOriginalModal,
    setShowCopyrightModal,
    setShowAsciiModal,
    setShowGlossaryModal,
    showTocDrawer,
    setShowTocDrawer,
    currentPage,
    setCurrentPage,
    totalPages,
    speechRate,
    setSpeechRate,
    completedSections,
    toggleSectionComplete,
    isSectionComplete,
    isAllSectionsComplete,
    isCertificateEarned,
    setShowQuizModal,
    navigateToQuiz,
    setShowCertificateModal,
    certificate,
    getLessonQuizResult
  } = useBook();

  // Layout mode: 'full' (Full screen, completely unbounded) | 'wide' (Expansive wide modal) | 'sidebar' (Side drawer)
  // Default to 'wide' for an elegant, focused window
  const [layoutMode, setLayoutMode] = useState<'full' | 'wide' | 'sidebar'>('wide');
  const [activeTab, setActiveTab] = useState<'full_curriculum' | 'current_lesson'>('full_curriculum');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<number | 'all'>('all');

  const [expandedTopicIds, setExpandedTopicIds] = useState<number[]>([currentLesson.topicNumber]);
  const [expandedLessonIds, setExpandedLessonIds] = useState<number[]>([currentLessonId]);
  const [isExtrasExpanded, setIsExtrasExpanded] = useState<boolean>(false);

  // Scan section visibility state: collapsed / hidden by default for maximum screen cleanliness
  const [showScanShortcuts, setShowScanShortcuts] = useState<boolean>(false);
  const [isScanBarDismissed, setIsScanBarDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sgk_toc_scan_bar_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const handleDismissScanBar = () => {
    setIsScanBarDismissed(true);
    try {
      localStorage.setItem('sgk_toc_scan_bar_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const handleRestoreScanBar = () => {
    setIsScanBarDismissed(false);
    try {
      localStorage.removeItem('sgk_toc_scan_bar_dismissed');
    } catch {
      // ignore
    }
  };

  const toggleTopic = (topicId: number) => {
    setExpandedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const expandAllTopics = () => {
    setExpandedTopicIds(SGK_TOPICS.map((t) => t.id));
  };

  const collapseAllTopics = () => {
    setExpandedTopicIds([]);
  };

  const toggleLessonSections = (lessonNum: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedLessonIds((prev) =>
      prev.includes(lessonNum) ? prev.filter((id) => id !== lessonNum) : [...prev, lessonNum]
    );
  };

  // Close with Escape key
  useEffect(() => {
    if (!showTocDrawer) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowTocDrawer(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTocDrawer, setShowTocDrawer]);

  const sectionIcons = [Target, Layers, Database, Cpu, Sparkles, GraduationCap];

  const navItems = currentLesson.sections.map((sec, idx) => {
    const rawPage = sec.sgkPage.match(/\d+/)?.[0] || '6';
    return {
      pageIndex: sec.index,
      labelVi: sec.titleVi,
      labelEn: sec.titleEn,
      sgkPage: parseInt(rawPage, 10),
      icon: sectionIcons[idx % sectionIcons.length],
      badge: sec.badge || sec.sgkPage,
      descVi: sec.titleVi
    };
  });

  const handleSelectPage = (index: number) => {
    setCurrentPage(index);
    setShowTocDrawer(false);
  };

  const handleSelectLessonFromCurriculum = (lesson: SgkLesson) => {
    if (LESSONS_REGISTRY[lesson.lessonNumber]) {
      setCurrentLessonId(lesson.lessonNumber);
      setCurrentPage(0);
      setShowTocDrawer(false);
    } else {
      // For upcoming lessons, open original scan
      const registered = LESSONS_REGISTRY[lesson.lessonNumber];
      const pageTarget = registered ? registered.firstPageScan : (lesson.page >= 6 && lesson.page <= 15 ? lesson.page : 4);
      setOriginalPageTarget(pageTarget);
      setShowOriginalModal(true);
      setShowTocDrawer(false);
    }
  };

  if (!showTocDrawer) return null;

  const filteredTopics = SGK_TOPICS.filter((topic) => {
    if (selectedTopicId !== 'all' && topic.id !== selectedTopicId) return false;
    return true;
  }).map((topic) => {
    if (!searchQuery.trim()) return topic;
    const q = searchQuery.toLowerCase().trim();
    const matchingLessons = topic.lessons.filter(
      (l) =>
        l.titleVi.toLowerCase().includes(q) ||
        `bài ${l.lessonNumber}`.includes(q) ||
        (l.descriptionVi && l.descriptionVi.toLowerCase().includes(q))
    );
    return {
      ...topic,
      lessons: matchingLessons
    };
  }).filter((topic) => topic.lessons.length > 0 || !searchQuery.trim());

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      case 'Scale':
        return <Scale className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Code':
        return <Code className="w-4 h-4" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  // Determine dynamic container style based on layoutMode
  const containerClasses =
    layoutMode === 'full'
      ? 'relative w-full h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-20 overflow-hidden'
      : layoutMode === 'wide'
      ? 'relative w-full max-w-6xl xl:max-w-7xl mx-auto my-auto h-[95vh] rounded-3xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-20 border border-slate-200 dark:border-slate-800 overflow-hidden'
      : 'relative w-full max-w-xl bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-20 border-r border-slate-200 dark:border-slate-800 overflow-hidden';

  const gridColsCurriculum =
    layoutMode === 'sidebar'
      ? 'grid-cols-1'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  const gridColsSections =
    layoutMode === 'sidebar'
      ? 'grid-cols-1'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="fixed inset-0 z-50 flex pointer-events-auto">
      {/* Backdrop (Allows closing when clicking outside in wide or sidebar modes) */}
      <div
        onClick={() => setShowTocDrawer(false)}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity cursor-pointer z-10"
        title="Bấm để đóng mục lục (Esc)"
      />

      {/* Main Unboxed Table of Contents Panel */}
      <div className={containerClasses}>
        
        {/* Header with Title and Mode Controls */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-850 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg leading-tight">
                  {bilingualMode === 'en' ? 'Informatics 10 Textbook Table of Contents' : 'Mục Lục Sách Giáo Khoa Tin Học 10'}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                  {bilingualMode === 'en' ? 'Knowledge Connection' : 'Kết nối tri thức'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                {bilingualMode === 'en'
                  ? '6 Topics • 34 Lessons • 2018 General Education Curriculum'
                  : '6 Chủ đề • 34 Bài học chuẩn chương trình GDPT 2018 • Bộ Giáo dục & Đào tạo'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Unboxed Layout Mode Selector: Full Screen (Unbounded) / Wide Window / Sidebar */}
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-750 p-1 rounded-xl text-xs font-semibold gap-1 border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setLayoutMode('full')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  layoutMode === 'full'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Bỏ giới hạn khung: mở rộng toàn màn hình không bị bó hẹp"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Full Screen' : 'Toàn màn hình'}</span>
                <span className="sm:hidden">{bilingualMode === 'en' ? 'Full' : 'Toàn cảnh'}</span>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode('wide')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  layoutMode === 'wide'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={bilingualMode === 'en' ? 'Spacious window with rounded corners' : 'Cửa sổ rộng rãi có viền bo góc'}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Wide Window' : 'Cửa sổ rộng'}</span>
                <span className="sm:hidden">{bilingualMode === 'en' ? 'Wide' : 'Rộng'}</span>
              </button>

              <button
                type="button"
                onClick={() => setLayoutMode('sidebar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  layoutMode === 'sidebar'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={bilingualMode === 'en' ? 'Left sidebar drawer layout' : 'Dạng thanh bên bên trái'}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{bilingualMode === 'en' ? 'Sidebar' : 'Thanh bên'}</span>
                <span className="sm:hidden">{bilingualMode === 'en' ? 'Side' : 'Bên'}</span>
              </button>
            </div>

            {/* Quick Full-Screen Toggle Button */}
            <button
              type="button"
              onClick={() => setLayoutMode(layoutMode === 'full' ? 'sidebar' : 'full')}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title={layoutMode === 'full' ? 'Thu gọn thành thanh bên' : 'Phóng to không giới hạn khung'}
            >
              {layoutMode === 'full' ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowTocDrawer(false)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              title="Đóng mục lục (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Tabs Switcher */}
        <div className="px-4 py-2.5 bg-slate-100/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('full_curriculum')}
              className={`py-2 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'full_curriculum'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{bilingualMode === 'en' ? 'All 6 Topics & 34 Lessons' : 'Toàn bộ 6 Chủ đề & 34 Bài học'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('current_lesson')}
              className={`py-2 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'current_lesson'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Target className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                {bilingualMode === 'en'
                  ? `Lesson ${currentLesson.lessonNumber} Details (${currentLesson.sections.length} Sections)`
                  : `Chi tiết Bài ${currentLesson.lessonNumber} (${currentLesson.sections.length} phần học)`}
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>
                {bilingualMode === 'en' ? 'Current:' : 'Bài đang học:'}{' '}
                <strong className="text-slate-900 dark:text-slate-100">
                  {bilingualMode === 'en' ? `Lesson ${currentLessonId}` : `Bài ${currentLessonId}`}
                </strong>
              </span>
            </span>
            <span>•</span>
            <span>
              {bilingualMode === 'en' ? 'Progress:' : 'Tiến độ:'}{' '}
              <strong className="text-emerald-600 dark:text-emerald-400">
                {completedSections.length}/{currentLesson.sections.length} ({Math.round((completedSections.length / currentLesson.sections.length) * 100)}%)
              </strong>
            </span>
            {isScanBarDismissed && (
              <>
                <span>•</span>
                <button
                  type="button"
                  onClick={handleRestoreScanBar}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                  title={bilingualMode === 'en' ? 'Restore scan shortcuts bar' : 'Hiện lại thanh phím tắt trang scan đối chiếu ở chân mục lục'}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{bilingualMode === 'en' ? 'Show Scan Bar' : 'Hiện thanh scan SGK'}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab 1: Full Curriculum (All 6 Topics & 34 Lessons) */}
        {activeTab === 'full_curriculum' && (
          <div className="flex-1 overflow-y-auto flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-900">
            {/* Search and Topic Filters Bar */}
            <div className="p-4 bg-white dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 space-y-3 shrink-0">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder={
                      bilingualMode === 'en'
                        ? 'Search 34 lessons (e.g. Python, Digital Devices, Logic Data, Copyright)...'
                        : 'Tìm kiếm 34 bài học (ví dụ: Python, Thiết bị số, Bản quyền, Inkscape, Trí tuệ nhân tạo)...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Dropdown Topic Selector (Cropdow) */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:w-64">
                    <select
                      value={selectedTopicId}
                      onChange={(e) => {
                        const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                        setSelectedTopicId(val);
                        if (val !== 'all' && !expandedTopicIds.includes(val)) {
                          setExpandedTopicIds((prev) => [...prev, val]);
                        }
                      }}
                      className="w-full appearance-none pl-3 pr-8 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="all">
                        {bilingualMode === 'en' ? '▼ Select Topic: All 6 Topics (34 Lessons)' : '▼ Chọn Chủ đề: Tất cả 6 Chủ đề (34 Bài)'}
                      </option>
                      {SGK_TOPICS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {bilingualMode === 'en'
                            ? `Topic ${t.topicNumber}: ${t.titleEn || t.titleVi} (${t.lessons.length} lessons)`
                            : `Chủ đề ${t.topicNumber}: ${t.titleVi} (${t.lessons.length} bài)`}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Accordion Expand/Collapse All buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={collapseAllTopics}
                      className="px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                      title={bilingualMode === 'en' ? 'Collapse all topics' : 'Thu gọn tất cả chủ đề'}
                    >
                      {bilingualMode === 'en' ? 'Collapse All' : 'Thu gọn'}
                    </button>
                    <button
                      type="button"
                      onClick={expandAllTopics}
                      className="px-2.5 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 transition-colors cursor-pointer border border-indigo-200 dark:border-indigo-800"
                      title={bilingualMode === 'en' ? 'Expand all topics' : 'Mở rộng tất cả chủ đề'}
                    >
                      {bilingualMode === 'en' ? 'Expand All' : 'Mở tất cả'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Topic Quick Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTopicId('all');
                  }}
                  className={`px-3 py-1 rounded-xl font-bold shrink-0 transition-colors cursor-pointer ${
                    selectedTopicId === 'all'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {bilingualMode === 'en' ? 'All (34)' : 'Tất cả (34)'}
                </button>
                {SGK_TOPICS.map((t) => {
                  const isCurrent = t.id === currentLesson.topicNumber;
                  const isSelected = selectedTopicId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedTopicId(t.id);
                        if (!expandedTopicIds.includes(t.id)) {
                          setExpandedTopicIds((prev) => [...prev, t.id]);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-xl font-semibold shrink-0 transition-colors flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white font-bold shadow-xs'
                          : isCurrent
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{bilingualMode === 'en' ? `Topic ${t.topicNumber}` : `Chủ đề ${t.topicNumber}`}</span>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accordion Dropdown List of Topics & Lessons */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {filteredTopics.map((topic) => {
                const isTopicExpanded = searchQuery.trim() ? true : expandedTopicIds.includes(topic.id);
                const isCurrentTopic = topic.id === currentLesson.topicNumber;

                return (
                  <div
                    key={topic.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isCurrentTopic
                        ? 'border-indigo-300 dark:border-indigo-800 bg-white dark:bg-slate-850 shadow-xs ring-1 ring-indigo-400/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850'
                    }`}
                  >
                    {/* Collapsible Topic Header (Dropdown Toggle Bar) */}
                    <div
                      onClick={() => toggleTopic(topic.id)}
                      className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                        isTopicExpanded
                          ? 'bg-slate-50/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shadow-xs shrink-0 ${
                            isCurrentTopic
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {getTopicIcon(topic.iconName)}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] uppercase font-black tracking-wider text-indigo-700 dark:text-indigo-400">
                              {bilingualMode === 'en' ? `Topic ${topic.topicNumber}` : `Chủ đề ${topic.topicNumber}`}
                            </span>
                            {isCurrentTopic && (
                              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.2 rounded-full border border-emerald-300 dark:border-emerald-800">
                                {bilingualMode === 'en' ? 'Current Topic' : 'Đang học'}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
                            {bilingualMode === 'en' ? (topic.titleEn || topic.titleVi) : topic.titleVi}
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                          {topic.lessons.length} {bilingualMode === 'en' ? 'lessons' : 'bài'}
                        </span>
                        <span className="text-xs font-mono font-bold bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-600 hidden md:inline">
                          {bilingualMode === 'en' ? `p. ${topic.page}` : `Tr. ${topic.page}`}
                        </span>
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isTopicExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dropped-down Lessons List (Clean, Uncluttered Rows) */}
                    {isTopicExpanded && (
                      <div className="p-3 sm:p-4 space-y-2.5 bg-slate-50/40 dark:bg-slate-900/40">
                        {topic.lessons.map((lesson) => {
                          const isActiveLesson = lesson.lessonNumber === currentLessonId;
                          const isAvailable = Boolean(LESSONS_REGISTRY[lesson.lessonNumber]);
                          const isLessonExpanded = expandedLessonIds.includes(lesson.lessonNumber);
                          const lessonDetails = LESSONS_REGISTRY[lesson.lessonNumber];

                          return (
                            <div
                              key={lesson.id}
                              className={`rounded-xl border transition-all ${
                                isActiveLesson
                                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 shadow-2xs'
                                  : isAvailable
                                  ? 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-750 hover:border-indigo-300'
                                  : 'bg-white/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                              }`}
                            >
                              {/* Main Lesson Row */}
                              <div className="p-3 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div
                                  onClick={() => handleSelectLessonFromCurriculum(lesson)}
                                  className="flex items-start sm:items-center gap-3 min-w-0 flex-1 cursor-pointer group"
                                >
                                  <span
                                    className={`px-2 py-0.5 rounded-md text-xs font-black shrink-0 mt-0.5 sm:mt-0 ${
                                      isActiveLesson
                                        ? 'bg-indigo-600 text-white'
                                        : isAvailable
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                    }`}
                                  >
                                    {bilingualMode === 'en' ? 'LESSON' : 'BÀI'} {lesson.lessonNumber}
                                  </span>

                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h5
                                        data-lesson-title="true"
                                        data-lesson-num={lesson.lessonNumber}
                                        data-vi={`Bài ${lesson.lessonNumber}: ${lesson.titleVi}`}
                                        data-en={`Lesson ${lesson.lessonNumber}: ${lesson.titleEn || lessonDetails?.titleEn || lesson.titleVi}`}
                                        className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug cursor-help"
                                      >
                                        {bilingualMode === 'en' ? (lesson.titleEn || lesson.titleVi) : lesson.titleVi}
                                      </h5>
                                      {isActiveLesson && (
                                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                                          {bilingualMode === 'en' ? '● Studying' : '● Đang xem'}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Right Actions: Sub-sections Toggle & Enter Button */}
                                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                  {lessonDetails && (
                                    <button
                                      type="button"
                                      onClick={(e) => toggleLessonSections(lesson.lessonNumber, e)}
                                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                                        isLessonExpanded
                                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300'
                                      }`}
                                      title={bilingualMode === 'en' ? 'Toggle sections dropdown' : 'Xem danh sách các phần bài học'}
                                    >
                                      <span>
                                        {isLessonExpanded
                                          ? (bilingualMode === 'en' ? 'Hide' : 'Đóng phần')
                                          : (bilingualMode === 'en' ? `${lessonDetails.sections.length} parts` : `${lessonDetails.sections.length} phần`)}
                                      </span>
                                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLessonExpanded ? 'rotate-180' : ''}`} />
                                    </button>
                                  )}

                                  <span className="text-[11px] font-mono font-bold text-slate-400 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-750">
                                    {bilingualMode === 'en' ? 'p.' : 'Tr.'}{lesson.page}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => handleSelectLessonFromCurriculum(lesson)}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs ${
                                      isActiveLesson
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        : isAvailable
                                        ? 'bg-white hover:bg-indigo-50 text-indigo-700 dark:bg-slate-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                                    }`}
                                  >
                                    <span>
                                      {isActiveLesson
                                        ? (bilingualMode === 'en' ? 'Current' : 'Tiếp tục')
                                        : isAvailable
                                        ? (bilingualMode === 'en' ? 'Open' : 'Vào học')
                                        : (bilingualMode === 'en' ? 'Scan' : 'Xem scan')}
                                    </span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              {/* Nested Sub-Sections Dropdown */}
                              {isLessonExpanded && lessonDetails && (
                                <div className="p-3 border-t border-slate-100 dark:border-slate-750/70 bg-white/70 dark:bg-slate-850/70 space-y-1.5">
                                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                                    {bilingualMode === 'en' ? 'Lesson sections (Click to jump):' : 'Các phần nội dung bài học (Bấm để nhảy đến trang):'}
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                    {lessonDetails.sections.map((sec, secIdx) => {
                                      const isSecCurrent = isActiveLesson && currentPage === sec.index;
                                      const isSecComplete = isActiveLesson && isSectionComplete(sec.index);

                                      return (
                                        <div
                                          key={sec.index}
                                          onClick={() => {
                                            if (currentLessonId !== lesson.lessonNumber) {
                                              setCurrentLessonId(lesson.lessonNumber);
                                            }
                                            setCurrentPage(sec.index);
                                            setShowTocDrawer(false);
                                          }}
                                          className={`p-2 rounded-lg border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                                            isSecCurrent
                                              ? 'bg-indigo-100/80 dark:bg-indigo-950/60 border-indigo-400 text-indigo-950 dark:text-indigo-200 font-bold'
                                              : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 hover:bg-indigo-50/50 hover:border-indigo-300 text-slate-700 dark:text-slate-300'
                                          }`}
                                        >
                                          <div className="flex items-center gap-2 truncate">
                                            <span className="w-4 h-4 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                                              {secIdx + 1}
                                            </span>
                                            <span className="truncate">
                                              {bilingualMode === 'en' ? sec.titleEn : sec.titleVi}
                                            </span>
                                          </div>
                                          {isSecComplete && (
                                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Extras: Appendix & Glossary Dropdown */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 overflow-hidden">
                <div
                  onClick={() => setIsExtrasExpanded(!isExtrasExpanded)}
                  className="p-3.5 sm:p-4 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <BookA className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                      {bilingualMode === 'en'
                        ? 'Appendix & Reference section (Glossary, Subject Index)'
                        : 'Phần tra cứu & Phụ lục cuối sách giáo khoa (Bảng thuật ngữ, Tra cứu)'}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExtrasExpanded ? 'rotate-180' : ''}`} />
                </div>

                {isExtrasExpanded && (
                  <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {SGK_EXTRAS.map((extra) => {
                      const handleOpenExtra = () => {
                        setShowTocDrawer(false);
                        if (extra.id === 'appendix') {
                          setShowAsciiModal(true);
                        } else if (extra.id === 'glossary') {
                          setShowGlossaryModal(true);
                        } else if (extra.id === 'publication') {
                          setShowCopyrightModal(true);
                        } else {
                          setOriginalPageTarget(extra.page);
                          setShowOriginalModal(true);
                        }
                      };

                      return (
                        <div
                          key={extra.id}
                          className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between text-xs hover:border-indigo-400 transition-colors shadow-2xs group"
                        >
                          <div className="cursor-pointer" onClick={handleOpenExtra}>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                                {extra.tag}
                              </span>
                              <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                                {bilingualMode === 'en' ? `p. ${extra.page}` : `Tr. ${extra.page}`}
                              </span>
                            </div>
                            <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                              {bilingualMode === 'en' ? (extra.titleEn || extra.titleVi) : extra.titleVi}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {bilingualMode === 'en' ? (extra.descriptionEn || extra.descriptionVi) : extra.descriptionVi}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                            <button
                              type="button"
                              onClick={handleOpenExtra}
                              className="flex-1 py-1 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
                            >
                              <span>{bilingualMode === 'en' ? 'Interactive' : 'Mở nội dung'}</span>
                              <Sparkles className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTocDrawer(false);
                                setOriginalPageTarget(extra.page);
                                setShowOriginalModal(true);
                              }}
                              className="py-1 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                              title={bilingualMode === 'en' ? `View textbook scan p. ${extra.page}` : `Xem bản chụp SGK gốc Tr. ${extra.page}`}
                            >
                              <span>{bilingualMode === 'en' ? 'Scan' : 'Scan'}</span>
                              <BookOpen className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Current Lesson (Sections, Checklists, Progress) */}
        {activeTab === 'current_lesson' && (
          <div className="flex-1 overflow-y-auto flex flex-col min-h-0 bg-slate-50/50 dark:bg-slate-900">
            {/* Quick Lesson Switcher Bar */}
            <div className="px-4 py-3 bg-white dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {bilingualMode === 'en' ? 'Select Lesson:' : 'Chọn bài học:'}
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {Object.values(LESSONS_REGISTRY).map((l) => (
                    <button
                      key={l.lessonNumber}
                      type="button"
                      data-lesson-title="true"
                      data-lesson-num={l.lessonNumber}
                      data-vi={`Bài ${l.lessonNumber}: ${l.titleVi}`}
                      data-en={`Lesson ${l.lessonNumber}: ${l.titleEn}`}
                      onClick={() => {
                        setCurrentLessonId(l.lessonNumber);
                        setCurrentPage(0);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                        currentLessonId === l.lessonNumber
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {bilingualMode === 'en'
                        ? `Lesson ${l.lessonNumber}: ${l.titleEn.length > 25 ? `${l.titleEn.slice(0, 25)}...` : l.titleEn}`
                        : `Bài ${l.lessonNumber}: ${l.titleVi.length > 28 ? `${l.titleVi.slice(0, 28)}...` : l.titleVi}`}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800">
                {bilingualMode === 'en'
                  ? currentLesson.pageRange.replace('Trang', 'Pages').replace('SGK', 'Textbook')
                  : currentLesson.pageRange}
              </span>
            </div>

            {/* Progress Bar & Status Cards (Responsive 3-Column Grid) */}
            <div className="p-4 sm:p-6 bg-white dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 space-y-4 shrink-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-base sm:text-lg">
                    {bilingualMode === 'en'
                      ? `Lesson ${currentLesson.lessonNumber} Completion Progress: ${currentLesson.titleEn}`
                      : `Tiến độ hoàn thành Bài ${currentLesson.lessonNumber}: ${currentLesson.titleVi}`}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {bilingualMode === 'en'
                      ? 'Mark each section complete to unlock the 10-question quiz and earn your certificate (score ≥ 8/10 required).'
                      : 'Đánh dấu đã học từng phần để kích hoạt bài kiểm tra trắc nghiệm 10 câu và nhận Chứng nhận hoàn thành (cần đạt ≥ 8/10).'}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-emerald-700 dark:text-emerald-400 font-black font-mono text-base">
                    {completedSections.length} / {currentLesson.sections.length} {bilingualMode === 'en' ? 'Sections' : 'Phần'} ({Math.round((completedSections.length / currentLesson.sections.length) * 100)}%)
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((completedSections.length / currentLesson.sections.length) * 100)}%` }}
                />
              </div>

              {/* Status Row: Quiz, Certificate & Publisher Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                {isCertificateEarned && certificate ? (
                  <div
                    onClick={() => {
                      setShowTocDrawer(false);
                      setShowCertificateModal(true);
                    }}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 cursor-pointer shadow-md shadow-amber-500/20 hover:scale-[1.01] transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        <span className="font-black text-xs uppercase tracking-wide">
                          {bilingualMode === 'en' ? 'Certificate Issued' : 'Chứng nhận đã cấp'}
                        </span>
                      </div>
                      <span className="text-[11px] bg-slate-950/20 px-2 py-0.5 rounded-full font-black">
                        {certificate.score}/10 {bilingualMode === 'en' ? 'Points' : 'Điểm'}
                      </span>
                    </div>
                    <div className="text-xs font-bold mt-2 text-slate-950/90">
                      {bilingualMode === 'en'
                        ? `${certificate.role === 'teacher' ? 'Teacher' : 'Student'}: ${certificate.studentName} • Click to view or print PDF →`
                        : `${certificate.role === 'teacher' ? 'Giáo viên' : 'Học sinh'}: ${certificate.studentName} • Bấm để xem hoặc in PDF →`}
                    </div>
                  </div>
                ) : isAllSectionsComplete ? (
                  <div
                    onClick={() => {
                      setShowTocDrawer(false);
                      navigateToQuiz();
                    }}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white cursor-pointer shadow-md shadow-emerald-600/20 animate-pulse hover:scale-[1.01] transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-300" />
                        <span className="font-black text-xs uppercase tracking-wide">
                          {bilingualMode === 'en' ? 'Quiz Unlocked (10 Questions)!' : 'Đã mở khóa trắc nghiệm 10 câu!'}
                        </span>
                      </div>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                        {bilingualMode === 'en' ? 'Ready' : 'Sẵn sàng'}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mt-2 opacity-90">
                      {(() => {
                        const prevAttempt = getLessonQuizResult(currentLesson.lessonNumber);
                        if (prevAttempt && prevAttempt.score < 8) {
                          return bilingualMode === 'en'
                            ? `Retake Quiz: Previous score ${prevAttempt.score}/10. Need ≥ 8/10 for certificate →`
                            : `Làm lại bài: Điểm trước ${prevAttempt.score}/10. Đạt ≥ 8/10 để nhận chứng nhận →`;
                        }
                        return bilingualMode === 'en'
                          ? `Score ≥ 8/10 to earn Certificate of Completion for Lesson ${currentLesson.lessonNumber} →`
                          : `Đạt ≥ 8/10 điểm để nhận ngay Chứng nhận hoàn thành Bài ${currentLesson.lessonNumber} →`;
                      })()}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setShowTocDrawer(false);
                      navigateToQuiz();
                    }}
                    className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer hover:border-amber-400 transition-colors flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                        <Lock className="w-4 h-4 text-amber-600" />
                        <span>{bilingualMode === 'en' ? '10-Question Quiz (Locked)' : 'Bài trắc nghiệm 10 câu (Khóa)'}</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">
                        {completedSections.length}/{currentLesson.sections.length} {bilingualMode === 'en' ? 'sections' : 'phần'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-2">
                      {bilingualMode === 'en'
                        ? `Mark all ${currentLesson.sections.length}/${currentLesson.sections.length} sections complete to unlock the quiz and earn certificate.`
                        : `Đánh dấu đã học đủ ${currentLesson.sections.length}/${currentLesson.sections.length} phần để mở khóa trắc nghiệm và nhận chứng nhận.`}
                    </p>
                  </div>
                )}

                {/* Accreditation Banner */}
                <div 
                  onClick={() => {
                    setShowTocDrawer(false);
                    setShowCopyrightModal(true);
                  }}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/80 cursor-pointer hover:border-emerald-400 transition-all flex flex-col justify-between group"
                  title="Nhấn để xem đầy đủ hồ sơ tác giả, nhà xuất bản và tuyên bố pháp lý"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded-lg bg-emerald-600 text-white">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                        {bilingualMode === 'en' ? 'Vietnam Education Publishing House' : 'NXB Giáo Dục Việt Nam'}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                      {bilingualMode === 'en' ? 'Copyright & Credits →' : 'Bản quyền →'}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {bilingualMode === 'en'
                      ? 'Informatics 10 Textbook (Connecting Knowledge to Life)'
                      : 'Sách giáo khoa Tin học 10 (Bộ Kết nối tri thức)'}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                    {bilingualMode === 'en'
                      ? 'Editor-in-Chief: Prof. Dr. Pham The Long • Editor: Assoc. Prof. Dr. Dao Kien Quoc'
                      : 'Tổng Chủ biên: GS.TSKH Phạm Thế Long • Chủ biên: PGS.TS Đào Kiến Quốc'}
                  </div>
                </div>

                {/* Audio Reader Speed Settings: Only visible in Bilingual or English mode */}
                {bilingualMode !== 'vi' && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold">
                        <Volume2 className="w-4 h-4 text-emerald-600" />
                        <span>{bilingualMode === 'en' ? 'Voice Speed:' : 'Giọng đọc trợ giảng:'}</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200">
                        {speechRate}x
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-1 mt-2">
                      {[0.8, 0.9, 1.0, 1.1, 1.25].map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => setSpeechRate(rate)}
                          className={`flex-1 py-1 rounded-lg font-mono text-[11px] font-bold transition-colors cursor-pointer ${
                            speechRate === rate
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sections List in Responsive Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                {bilingualMode === 'en'
                  ? `Sections in Lesson ${currentLesson.lessonNumber} (${currentLesson.sections.length} Sections):`
                  : `Danh sách các phần học Bài ${currentLesson.lessonNumber} (${currentLesson.sections.length} Phần):`}
              </div>

              <div className={`grid ${gridColsSections} gap-3.5`}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isCurrent = currentPage === item.pageIndex;
                  const isDone = isSectionComplete(item.pageIndex);

                  return (
                    <div
                      key={item.pageIndex}
                      onClick={() => handleSelectPage(item.pageIndex)}
                      className={`p-4 rounded-3xl border transition-all cursor-pointer group flex flex-col justify-between gap-3 ${
                        isCurrent
                          ? 'bg-indigo-50/90 dark:bg-indigo-950/50 border-indigo-400 dark:border-indigo-700 ring-2 ring-indigo-400/40 shadow-sm'
                          : isDone
                          ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 hover:bg-emerald-50/70 hover:border-emerald-300'
                          : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 hover:bg-slate-50/80 hover:shadow-2xs'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isDone
                                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                                  : isCurrent
                                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:text-indigo-600'
                              }`}
                            >
                              {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4" />}
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-500">
                              {bilingualMode === 'en' ? `Section ${item.pageIndex + 1}` : `Phần ${item.pageIndex + 1}`}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Mark Complete Checkbox */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSectionComplete(item.pageIndex);
                              }}
                              className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                                isDone
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 hover:bg-emerald-200'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                              }`}
                              title={
                                isDone
                                  ? (bilingualMode === 'en' ? 'Click to unmark' : 'Bấm để hủy đánh dấu')
                                  : (bilingualMode === 'en' ? 'Mark complete' : 'Đánh dấu đã hoàn thành phần này')
                              }
                            >
                              {isDone ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>{bilingualMode === 'en' ? 'Done' : 'Đã học'}</span>
                                </>
                              ) : (
                                <>
                                  <Circle className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{bilingualMode === 'en' ? 'Todo' : 'Chưa học'}</span>
                                </>
                              )}
                            </button>

                            {/* SGK Page Link */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOriginalPageTarget(item.sgkPage);
                                setShowOriginalModal(true);
                                setShowTocDrawer(false);
                              }}
                              className="px-2 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-700 transition-colors border border-slate-200 dark:border-slate-600 cursor-pointer"
                              title="Xem bản scan trang SGK tương ứng"
                            >
                              {item.badge}
                            </button>
                          </div>
                        </div>

                        <h4
                          className={`text-sm sm:text-base font-extrabold leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${
                            isCurrent
                              ? 'text-indigo-950 dark:text-indigo-200'
                              : isDone
                              ? 'text-emerald-950 dark:text-emerald-200'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {bilingualMode === 'en' ? item.labelEn : item.labelVi}
                        </h4>

                      </div>

                      <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        <span className="text-[11px] text-slate-400 font-normal">
                          {isCurrent
                            ? (bilingualMode === 'en' ? 'Currently viewing' : 'Đang mở trang này')
                            : (bilingualMode === 'en' ? 'Click to open' : 'Bấm để vào học ngay')}
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <span>
                            {isCurrent
                              ? (bilingualMode === 'en' ? 'Resume' : 'Tiếp tục')
                              : (bilingualMode === 'en' ? 'Start' : 'Vào học')}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Optional Collapsible & Dismissable Scan Shortcuts Bar */}
        {!isScanBarDismissed && (
          <div className="px-3 sm:px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-850/90 shrink-0 space-y-2 transition-all">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowScanShortcuts(!showScanShortcuts)}
                  className="inline-flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
                  title={showScanShortcuts ? 'Thu gọn các trang scan' : 'Mở rộng 30 phím tắt trang scan đối chiếu'}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="uppercase tracking-wider text-[11px]">
                    {bilingualMode === 'en' ? 'SGK Scans (Lessons 1 - 5)' : 'Trang Scan Đối Chiếu SGK Gốc (Bài 1 - 5)'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${showScanShortcuts ? 'rotate-180' : ''}`} />
                </button>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  {showScanShortcuts ? (bilingualMode === 'en' ? '(Showing 30 pages)' : '(Đang hiện 30 trang)') : (bilingualMode === 'en' ? '(Collapsed)' : '(Đã thu gọn)')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowTocDrawer(false);
                    setShowOriginalModal(true);
                  }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{bilingualMode === 'en' ? 'Full Scan Reader' : 'Mở bộ đọc scan toàn bộ'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleDismissScanBar}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title={bilingualMode === 'en' ? 'Remove this bar from TOC' : 'Ẩn hoặc bỏ hoàn toàn thanh này cho tinh gọn'}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Expandable page shortcuts: Hidden by default */}
            {showScanShortcuts && (
              <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800/70 flex flex-wrap items-center gap-1.5 text-xs animate-in fade-in duration-150">
                {/* Front matter */}
                <div className="flex items-center gap-1">
                  {[
                    { page: 0, label: bilingualMode === 'en' ? 'Cover' : 'Bìa 1' },
                    { page: 1, label: bilingualMode === 'en' ? 'p. 1' : 'Tr. 1' },
                    { page: 2, label: bilingualMode === 'en' ? 'p. 2' : 'Tr. 2' },
                    { page: 3, label: bilingualMode === 'en' ? 'p. 3' : 'Tr. 3' },
                    { page: 4, label: bilingualMode === 'en' ? 'Contents 1' : 'Mục lục 1', highlight: true },
                    { page: 5, label: bilingualMode === 'en' ? 'Contents 2' : 'Mục lục 2', highlight: true }
                  ].map((item) => (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => {
                        setOriginalPageTarget(item.page);
                        setShowOriginalModal(true);
                        setShowTocDrawer(false);
                      }}
                      className={`py-1 px-2.5 rounded-lg border text-center transition-colors cursor-pointer font-medium ${
                        item.highlight
                          ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800 font-bold'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                      }`}
                      title={bilingualMode === 'en' ? `Open scan Page ${item.page} (${item.label})` : `Mở bản scan Trang ${item.page} (${item.label})`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">|</span>

                {/* Lesson 1 scans */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-slate-500 mr-1 hidden sm:inline">
                    {bilingualMode === 'en' ? 'L1:' : 'Bài 1:'}
                  </span>
                  {[
                    { page: 6, label: bilingualMode === 'en' ? 'p.6' : 'Tr. 6' },
                    { page: 7, label: bilingualMode === 'en' ? 'p.7' : 'Tr. 7' },
                    { page: 8, label: bilingualMode === 'en' ? 'p.8' : 'Tr. 8' },
                    { page: 9, label: bilingualMode === 'en' ? 'p.9' : 'Tr. 9' },
                    { page: 10, label: bilingualMode === 'en' ? 'p.10' : 'Tr. 10' }
                  ].map((item) => (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => {
                        setOriginalPageTarget(item.page);
                        setShowOriginalModal(true);
                        setShowTocDrawer(false);
                      }}
                      className="py-1 px-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 hover:text-indigo-700 text-center transition-colors cursor-pointer font-mono text-xs"
                      title={bilingualMode === 'en' ? `Open scan Lesson 1 Page ${item.page}` : `Mở bản scan Bài 1 Trang ${item.page}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">|</span>

                {/* Lesson 2 scans */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-indigo-600 mr-1 hidden sm:inline">
                    {bilingualMode === 'en' ? 'L2:' : 'Bài 2:'}
                  </span>
                  {[
                    { page: 11, label: bilingualMode === 'en' ? 'p.11' : 'Tr. 11' },
                    { page: 12, label: bilingualMode === 'en' ? 'p.12' : 'Tr. 12' },
                    { page: 13, label: bilingualMode === 'en' ? 'p.13' : 'Tr. 13' },
                    { page: 14, label: bilingualMode === 'en' ? 'p.14' : 'Tr. 14' },
                    { page: 15, label: bilingualMode === 'en' ? 'p.15' : 'Tr. 15' }
                  ].map((item) => (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => {
                        setOriginalPageTarget(item.page);
                        setShowOriginalModal(true);
                        setShowTocDrawer(false);
                      }}
                      className="py-1 px-2 rounded-lg border border-indigo-200 dark:border-indigo-900 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 hover:bg-indigo-100 text-center transition-colors cursor-pointer font-mono text-xs font-bold"
                      title={bilingualMode === 'en' ? `Open scan Lesson 2 Page ${item.page}` : `Mở bản scan Bài 2 Trang ${item.page}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">|</span>

                {/* Lesson 3 scans */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-emerald-600 mr-1 hidden sm:inline">
                    {bilingualMode === 'en' ? 'L3:' : 'Bài 3:'}
                  </span>
                  {[
                    { page: 16, label: bilingualMode === 'en' ? 'p.16' : 'Tr. 16' },
                    { page: 17, label: bilingualMode === 'en' ? 'p.17' : 'Tr. 17' },
                    { page: 18, label: bilingualMode === 'en' ? 'p.18' : 'Tr. 18' },
                    { page: 19, label: bilingualMode === 'en' ? 'p.19' : 'Tr. 19' }
                  ].map((item) => (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => {
                        setOriginalPageTarget(item.page);
                        setShowOriginalModal(true);
                        setShowTocDrawer(false);
                      }}
                      className="py-1 px-2 rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-100 text-center transition-colors cursor-pointer font-mono text-xs font-bold"
                      title={bilingualMode === 'en' ? `Open scan Lesson 3 Page ${item.page}` : `Mở bản scan Bài 3 Trang ${item.page}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">|</span>

                {/* Lesson 4 scans */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-purple-600 mr-1 hidden sm:inline">
                    {bilingualMode === 'en' ? 'L4:' : 'Bài 4:'}
                  </span>
                  {[
                    { page: 20, label: bilingualMode === 'en' ? 'p.20' : 'Tr. 20' },
                    { page: 21, label: bilingualMode === 'en' ? 'p.21' : 'Tr. 21' },
                    { page: 22, label: bilingualMode === 'en' ? 'p.22' : 'Tr. 22' },
                    { page: 23, label: bilingualMode === 'en' ? 'p.23' : 'Tr. 23' },
                    { page: 24, label: bilingualMode === 'en' ? 'p.24' : 'Tr. 24' },
                    { page: 25, label: bilingualMode === 'en' ? 'p.25' : 'Tr. 25' }
                  ].map((item) => (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => {
                        setOriginalPageTarget(item.page);
                        setShowOriginalModal(true);
                        setShowTocDrawer(false);
                      }}
                      className="py-1 px-2 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50/70 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 hover:bg-purple-100 text-center transition-colors cursor-pointer font-mono text-xs font-bold"
                      title={bilingualMode === 'en' ? `Open scan Lesson 4 Page ${item.page}` : `Mở bản scan Bài 4 Trang ${item.page}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">|</span>

                {/* Lesson 5 scans */}
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-blue-600 mr-1 hidden sm:inline">
                    {bilingualMode === 'en' ? 'L5:' : 'Bài 5:'}
                  </span>
                  {[
                    { page: 26, label: bilingualMode === 'en' ? 'p.26' : 'Tr. 26' },
                    { page: 27, label: bilingualMode === 'en' ? 'p.27' : 'Tr. 27' },
                    { page: 28, label: bilingualMode === 'en' ? 'p.28' : 'Tr. 28' },
                    { page: 29, label: bilingualMode === 'en' ? 'p.29' : 'Tr. 29' },
                    { page: 30, label: bilingualMode === 'en' ? 'p.30' : 'Tr. 30' }
                  ].map((item) => (
                    <button
                      key={item.page}
                      type="button"
                      onClick={() => {
                        setOriginalPageTarget(item.page);
                        setShowOriginalModal(true);
                        setShowTocDrawer(false);
                      }}
                      className="py-1 px-2 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 hover:bg-blue-100 text-center transition-colors cursor-pointer font-mono text-xs font-bold"
                      title={bilingualMode === 'en' ? `Open scan Lesson 5 Page ${item.page}` : `Mở bản scan Bài 5 Trang ${item.page}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
