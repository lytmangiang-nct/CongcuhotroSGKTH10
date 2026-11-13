import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Play,
  Search,
  BookA,
  ChevronDown,
  ChevronRight,
  Binary,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Layers,
  Filter,
  Eye,
  Cpu,
  Globe,
  Scale,
  Palette,
  Code,
  Briefcase,
  User,
  BarChart3
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SGK_TOPICS, SGK_EXTRAS, SgkTopic } from '../data/curriculumData';
import { LESSONS_REGISTRY, LessonRegistryItem } from '../data/lessonsRegistry';

export const FullTableOfContentsPage: React.FC = () => {
  const {
    openCover,
    openReader,
    resumeLastSession,
    currentLessonId,
    currentLesson,
    currentPage,
    bilingualMode,
    setBilingualMode,
    isSectionComplete,
    completedSections,
    getLessonCompletedSections,
    learnerProgress,
    activeProfile,
    setShowProfileModal,
    setShowCopyrightModal,
    setShowGlossaryModal,
    setShowAsciiModal,
    setShowOriginalModal,
    setOriginalPageTarget,
    setShowTeacherAnalyticsModal
  } = useBook();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<number | 'all' | 'backmatter'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress'>('all');

  // Accordion state: Set of expanded lesson numbers
  const allLessons = useMemo(() => Object.values(LESSONS_REGISTRY), []);
  const [expandedLessonIds, setExpandedLessonIds] = useState<number[]>([currentLessonId]);

  const toggleLesson = (lessonNum: number) => {
    setExpandedLessonIds((prev) =>
      prev.includes(lessonNum) ? prev.filter((id) => id !== lessonNum) : [...prev, lessonNum]
    );
  };

  const expandAll = () => {
    setExpandedLessonIds(allLessons.map((l) => l.lessonNumber));
  };

  const collapseAll = () => {
    setExpandedLessonIds([]);
  };

  // Helper to calculate completion for any lesson scoped strictly to active learner profile
  const getLessonCompletion = (lesson: LessonRegistryItem) => {
    const done = getLessonCompletedSections(lesson.lessonNumber);
    const completed = done.length;
    const total = lesson.sections.length;
    return { completed, total, isComplete: total > 0 && completed >= total };
  };

  // Filter lessons
  const filteredTopics = useMemo(() => {
    if (selectedTopicId === 'backmatter') return [];

    const query = searchQuery.trim().toLowerCase();

    return SGK_TOPICS.map((topic) => {
      // Check if topic matches topic filter
      if (selectedTopicId !== 'all' && topic.id !== selectedTopicId) {
        return { ...topic, lessons: [] };
      }

      // Filter lessons inside this topic
      const matchingLessons = topic.lessons.filter((l) => {
        const fullLesson = LESSONS_REGISTRY[l.lessonNumber];
        if (!fullLesson) return false;

        // Status filter
        if (statusFilter !== 'all') {
          const comp = getLessonCompletion(fullLesson);
          if (statusFilter === 'completed' && !comp.isComplete) return false;
          if (statusFilter === 'in_progress' && (comp.isComplete || comp.completed === 0)) return false;
        }

        // Search query filter
        if (!query) return true;

        const numMatch = l.lessonNumber.toString() === query || `bài ${l.lessonNumber}`.includes(query);
        const titleViMatch = l.titleVi.toLowerCase().includes(query);
        const titleEnMatch = (l.titleEn || '').toLowerCase().includes(query);
        const descMatch = (l.descriptionVi || '').toLowerCase().includes(query);
        const pageMatch = l.page.toString() === query || `trang ${l.page}`.includes(query);
        const sectionMatch = fullLesson.sections.some(
          (s) => s.titleVi.toLowerCase().includes(query) || (s.titleEn && s.titleEn.toLowerCase().includes(query))
        );

        return numMatch || titleViMatch || titleEnMatch || descMatch || pageMatch || sectionMatch;
      });

      return {
        ...topic,
        lessons: matchingLessons
      };
    }).filter((t) => t.lessons.length > 0);
  }, [selectedTopicId, searchQuery, statusFilter, currentLessonId, completedSections, learnerProgress]);

  const totalMatchingLessons = useMemo(() => {
    return filteredTopics.reduce((acc, t) => acc + t.lessons.length, 0);
  }, [filteredTopics]);

  const currentSection = currentLesson.sections[currentPage] || currentLesson.sections[0];

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

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      {/* 1. Top Header */}
      <header className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-200/90 bg-white sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openCover}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            title={bilingualMode === 'en' ? 'Back to Cover Page' : 'Quay lại Trang bìa chính'}
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" />
            <span>{bilingualMode === 'en' ? 'Cover' : 'Trang bìa'}</span>
          </button>

          <div className="hidden sm:block h-5 w-px bg-slate-200" />

          <div>
            <h1 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>{bilingualMode === 'en' ? 'Curriculum Table of Contents' : 'Mục Lục Chương Trình Tin Học 10'}</span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              {bilingualMode === 'en'
                ? '34 official lessons organized across 6 core curriculum themes'
                : '34 bài học chính thức phân theo 6 chủ đề • Bộ Kết nối tri thức với cuộc sống'}
            </p>
          </div>
        </div>

        {/* Right CTA: Profile & Resume current session */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowProfileModal(true)}
            className="px-3 py-2 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title={
              activeProfile
                ? `${bilingualMode === 'en' ? 'Profile' : 'Hồ sơ'}: ${activeProfile.fullName}`
                : bilingualMode === 'en'
                ? 'Learner Profile'
                : 'Hồ sơ'
            }
          >
            <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="max-w-[120px] truncate">
              {activeProfile?.fullName || (bilingualMode === 'en' ? 'Profile' : 'Hồ sơ')}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowTeacherAnalyticsModal(true)}
            className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="hidden md:inline">{bilingualMode === 'en' ? 'Learning Tracker' : 'Theo dõi học tập'}</span>
          </button>

          <button
            type="button"
            onClick={resumeLastSession}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm shadow-indigo-600/30"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>
              {bilingualMode === 'en'
                ? `Continue Lesson ${currentLessonId}`
                : `Tiếp tục học Bài ${currentLessonId}`}
            </span>
          </button>
        </div>
      </header>

      {/* 2. Main Container */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-6 sm:py-8 flex-1 space-y-6">
        
        {/* Recent Session Banner */}
        <section className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-emerald-700 uppercase tracking-wide">
                {bilingualMode === 'en' ? 'Current Study Session' : 'Bài học gần nhất'}
              </span>
              <span className="text-slate-300">·</span>
              <span className="font-semibold text-slate-700">
                {bilingualMode === 'en'
                  ? `Lesson ${currentLessonId}: ${currentLesson.titleEn}`
                  : `Bài ${currentLessonId}: ${currentLesson.titleVi}`}
              </span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
                {bilingualMode === 'en'
                  ? currentSection.sgkPage.replace('Trang', 'Pages').replace('SGK', 'Textbook')
                  : currentSection.sgkPage}
              </span>
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900">
              {bilingualMode === 'en'
                ? `Current section: ${currentSection.titleEn || currentSection.titleVi}`
                : `Đang ở phần: ${currentSection.titleVi}`}
            </div>
          </div>

          <button
            type="button"
            onClick={resumeLastSession}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all cursor-pointer shadow-2xs"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{bilingualMode === 'en' ? 'Continue Learning' : 'Tiếp tục học'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Smart Filtering & Search Toolbar */}
        <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3.5">
          {/* Row 1: Search and Accordion Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  bilingualMode === 'en'
                    ? 'Search by lesson name, section, keyword, or page number...'
                    : 'Tìm kiếm theo tên bài, phần học, từ khóa hoặc số trang...'
                }
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-hidden transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Collapse All' : 'Thu gọn'}
              </button>
              <button
                type="button"
                onClick={expandAll}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Expand All' : 'Mở tất cả'}
              </button>
            </div>
          </div>

          {/* Row 2: Topic Filter Tabs (Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100 text-xs">
            <button
              type="button"
              onClick={() => setSelectedTopicId('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
                selectedTopicId === 'all'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {bilingualMode === 'en' ? 'All 6 Topics (34)' : 'Tất cả 6 Chủ đề (34)'}
            </button>

            {SGK_TOPICS.map((topic) => (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopicId(topic.id)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  selectedTopicId === topic.id
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                title={topic.titleVi}
              >
                <span>{bilingualMode === 'en' ? `Topic ${topic.topicNumber}` : `Chủ đề ${topic.topicNumber}`}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  selectedTopicId === topic.id ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {topic.lessons.length}
                </span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => setSelectedTopicId('backmatter')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1 ${
                selectedTopicId === 'backmatter'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-amber-700 hover:bg-amber-50'
              }`}
            >
              <span>{bilingualMode === 'en' ? 'Back Matter (p. 165–168)' : 'Phần cuối sách (Tr. 165–168)'}</span>
            </button>
          </div>
        </section>

        {/* Matching count indicator when filtering */}
        {(searchQuery || selectedTopicId !== 'all') && (
          <div className="text-xs text-slate-500 flex items-center justify-between px-1">
            <span>
              {bilingualMode === 'en'
                ? `Showing ${totalMatchingLessons} matching lessons`
                : `Hiển thị ${totalMatchingLessons} bài học phù hợp`}
            </span>
            {(searchQuery || selectedTopicId !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTopicId('all');
                }}
                className="text-indigo-600 hover:underline font-semibold cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Reset filters' : 'Đặt lại bộ lọc'}
              </button>
            )}
          </div>
        )}

        {/* 3. The Topics & Lessons Section */}
        {selectedTopicId !== 'backmatter' && (
          <div className="space-y-8">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="space-y-3">
                {/* Topic Header Strip */}
                <div className="flex items-center justify-between pb-2 border-b-2 border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                      {getTopicIcon(topic.iconName)}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 leading-none">
                        {bilingualMode === 'en' ? `Topic ${topic.topicNumber}` : `Chủ đề ${topic.topicNumber}`}
                      </div>
                      <h2 className="text-sm sm:text-base font-black text-slate-900 mt-0.5">
                        {bilingualMode === 'en' ? (topic.titleEn || topic.titleVi) : topic.titleVi}
                      </h2>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {bilingualMode === 'en' ? `Page ${topic.page}` : `Trang ${topic.page} SGK`}
                  </span>
                </div>

                {/* Lessons List in this Topic */}
                <div className="space-y-3">
                  {topic.lessons.map((sgkLesson) => {
                    const fullLesson = LESSONS_REGISTRY[sgkLesson.lessonNumber];
                    if (!fullLesson) return null;

                    const isExpanded = expandedLessonIds.includes(sgkLesson.lessonNumber);
                    const isLessonActive = currentLessonId === sgkLesson.lessonNumber;
                    const comp = getLessonCompletion(fullLesson);

                    return (
                      <div
                        key={sgkLesson.lessonNumber}
                        className={`rounded-2xl border transition-all overflow-hidden bg-white ${
                          isLessonActive
                            ? 'border-indigo-400 ring-2 ring-indigo-300/30 shadow-xs'
                            : 'border-slate-200/90 hover:border-slate-300'
                        }`}
                      >
                        {/* Lesson Header Row */}
                        <div
                          onClick={() => toggleLesson(sgkLesson.lessonNumber)}
                          className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer select-none group"
                        >
                          <div className="space-y-1 min-w-0 flex-1">
                            {/* Kicker info */}
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span className="font-extrabold text-indigo-700">
                                {bilingualMode === 'en' ? `LESSON ${sgkLesson.lessonNumber}` : `BÀI ${sgkLesson.lessonNumber}`}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono text-slate-500">
                                {bilingualMode === 'en'
                                  ? fullLesson.pageRange.replace('Trang', 'Pages').replace('SGK', 'Textbook')
                                  : fullLesson.pageRange}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>
                                {fullLesson.sections.length} {bilingualMode === 'en' ? 'sections' : 'phần'}
                              </span>

                              {isLessonActive && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-bold text-emerald-700">
                                    {bilingualMode === 'en' ? '● Active' : '● Đang học'}
                                  </span>
                                </>
                              )}

                              {comp.isComplete && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>{bilingualMode === 'en' ? 'Completed' : 'Đã xong'}</span>
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Lesson Title */}
                            <h3
                              data-lesson-title="true"
                              data-lesson-num={sgkLesson.lessonNumber}
                              data-vi={`Bài ${sgkLesson.lessonNumber}: ${fullLesson.titleVi}`}
                              data-en={`Lesson ${sgkLesson.lessonNumber}: ${fullLesson.titleEn}`}
                              className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug cursor-help"
                            >
                              {bilingualMode === 'en' ? fullLesson.titleEn : fullLesson.titleVi}
                            </h3>
                          </div>

                          {/* Quick Actions on Lesson */}
                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            {/* View scan */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOriginalPageTarget(sgkLesson.page);
                                setShowOriginalModal(true);
                              }}
                              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              title={bilingualMode === 'en' ? `View scan of page ${sgkLesson.page}` : `Xem bản scan SGK gốc Trang ${sgkLesson.page}`}
                            >
                              <Eye className="w-3.5 h-3.5 text-indigo-600" />
                              <span className="hidden md:inline">Scan</span>
                            </button>

                            {/* Start or Resume */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openReader(sgkLesson.lessonNumber, 0);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <span>
                                {isLessonActive
                                  ? (bilingualMode === 'en' ? 'Resume' : 'Học tiếp')
                                  : (bilingualMode === 'en' ? 'Start' : 'Vào học')}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>

                            {/* Accordion Arrow */}
                            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-200 transition-colors">
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Collapsible Sections List */}
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-2 bg-slate-50/50 border-t border-slate-100">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                              {bilingualMode === 'en' ? 'Lesson Sections (Click to Jump Directly):' : 'Các phần trong bài học (Bấm để nhảy trực tiếp vào nội dung):'}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                              {fullLesson.sections.map((sec, sIdx) => {
                                const isCurrentSec = isLessonActive && currentPage === sIdx;
                                const isDone = isLessonActive
                                  ? isSectionComplete(sIdx)
                                  : getLessonCompletedSections(sgkLesson.lessonNumber).includes(sIdx);

                                return (
                                  <div
                                    key={sIdx}
                                    onClick={() => openReader(sgkLesson.lessonNumber, sIdx)}
                                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between space-y-2 bg-white ${
                                      isCurrentSec
                                        ? 'border-indigo-400 ring-2 ring-indigo-300/30'
                                        : 'border-slate-200 hover:border-indigo-300'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                                        <span className="font-semibold text-indigo-700">
                                          {bilingualMode === 'en' ? `Part ${sIdx + 1}` : `Phần ${sIdx + 1}`}
                                        </span>
                                        <span className="font-mono text-[10px] text-slate-400">
                                          {bilingualMode === 'en'
                                            ? sec.sgkPage.replace('Trang', 'Pages').replace('SGK', 'Textbook')
                                            : sec.sgkPage}
                                        </span>
                                      </div>

                                      <h4 className="font-bold text-slate-900 leading-snug line-clamp-2">
                                        {bilingualMode === 'en' ? (sec.titleEn || sec.titleVi) : sec.titleVi}
                                      </h4>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-600">
                                      <span className="text-slate-400 font-normal">
                                        {isDone ? (
                                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                                            <CheckCircle2 className="w-3 h-3" />
                                            <span>{bilingualMode === 'en' ? 'Completed' : 'Đã học'}</span>
                                          </span>
                                        ) : isCurrentSec ? (
                                          <span className="text-indigo-600 font-bold">
                                            {bilingualMode === 'en' ? 'In progress' : 'Đang học'}
                                          </span>
                                        ) : (
                                          bilingualMode === 'en' ? 'Not started' : 'Chưa học'
                                        )}
                                      </span>
                                      <span className="flex items-center gap-0.5">
                                        <span>{bilingualMode === 'en' ? 'Start' : 'Vào học'}</span>
                                        <ChevronRight className="w-3 h-3" />
                                      </span>
                                    </div>
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
              </div>
            ))}
          </div>
        )}

        {/* 4. BACK MATTER DEDICATED SUITE (PHẦN CUỐI SÁCH GIÁO KHOA: Trang 165 – Trang 168) */}
        {(selectedTopicId === 'all' || selectedTopicId === 'backmatter') && (
          <section className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  {bilingualMode === 'en' ? 'Textbook Back Matter • Pages 165 – 168' : 'Phần Cuối Sách Giáo Khoa • Trang 165 – 168'}
                </div>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                  {bilingualMode === 'en'
                    ? 'Appendices, Official Glossary & Publishing Records'
                    : 'Phụ Lục ASCII, Bảng Tra Cứu Thuật Ngữ & Hồ Sơ Xuất Bản'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {bilingualMode === 'en'
                    ? 'Explore the full 256-code extended ASCII matrix, 29 official textbook terms, and legal copyright notices.'
                    : 'Tra cứu bảng mã ASCII mở rộng 256 ký tự (16×16), 29 thuật ngữ chính thức SGK kèm số trang, và hồ sơ bản quyền chính thức NXB Giáo dục Việt Nam.'}
                </p>
              </div>

              <span className="text-xs font-mono text-slate-400">
                ISBN 978-604-0-31089-7
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* ASCII Table */}
              <div className="p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <Binary className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      {bilingualMode === 'en' ? 'Page 165 Textbook' : 'Trang 165 SGK'}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-700 transition-colors">
                    {bilingualMode === 'en' ? 'Appendix: Extended ASCII Table' : 'Phụ lục: Bảng mã ASCII mở rộng'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {bilingualMode === 'en'
                      ? '16×16 matrix with 256 character codes (0–255), 8-bit binary strings, Hex codes, text-to-ASCII converter and Python ord()/chr() functions.'
                      : 'Ma trận 16×16 với 256 mã ký tự (0–255), chuỗi nhị phân 8-bit, mã Hexa, bộ chuyển văn bản sang ASCII và lệnh Python ord()/chr().'}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAsciiModal(true)}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{bilingualMode === 'en' ? 'Open Interactive Table' : 'Mở bảng tương tác'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOriginalPageTarget(165);
                      setShowOriginalModal(true);
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                    title={bilingualMode === 'en' ? 'View scan of Page 165' : 'Xem bản scan Trang 165'}
                  >
                    Scan
                  </button>
                </div>
              </div>

              {/* Official Glossary */}
              <div className="p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <BookA className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      {bilingualMode === 'en' ? 'Pages 166–167 Textbook' : 'Trang 166 – 167 SGK'}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {bilingualMode === 'en' ? 'Glossary of Informatics Terms' : 'Bảng giải thích thuật ngữ Tin học'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {bilingualMode === 'en'
                      ? '29 official textbook terms defined from Variable to Virus, with full page references and bilingual definitions.'
                      : '29 thuật ngữ chính thức SGK định nghĩa từ Biến (Variable) đến Virus, đầy đủ số trang tham chiếu và định nghĩa song ngữ đối chiếu.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowGlossaryModal(true)}
                    className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{bilingualMode === 'en' ? 'Lookup Terms' : 'Tra cứu thuật ngữ'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOriginalPageTarget(166);
                      setShowOriginalModal(true);
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                    title={bilingualMode === 'en' ? 'View scan of Page 166' : 'Xem bản scan Trang 166'}
                  >
                    Scan
                  </button>
                </div>
              </div>

              {/* Publication Dossier */}
              <div className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-xs transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      {bilingualMode === 'en' ? 'Page 168 Textbook' : 'Trang 168 SGK'}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {bilingualMode === 'en' ? 'Publication & Legal Dossier' : 'Thông tin xuất bản & Bản quyền'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {bilingualMode === 'en'
                      ? 'Author acknowledgments, editorial board, Copyright © 2022 Vietnam Education Publishing House, code G1HHXI001H22 and publication registration.'
                      : 'Lời cảm ơn tác giả, Ban chỉ đạo xuất bản, Ban biên tập, Bản quyền © 2022 NXB Giáo dục Việt Nam, Mã số G1HHXI001H22 và số ĐKXB.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-5 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowCopyrightModal(true)}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{bilingualMode === 'en' ? 'Copyright Dossier' : 'Hồ sơ bản quyền'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOriginalPageTarget(168);
                      setShowOriginalModal(true);
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                    title={bilingualMode === 'en' ? 'View scan of Page 168' : 'Xem bản scan Trang 168'}
                  >
                    Scan
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* 5. Footer */}
      <footer className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-5 border-t border-slate-200/80 bg-white text-slate-500 text-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="text-slate-600">
              {bilingualMode === 'en'
                ? 'Informatics 10 Textbook Companion • Connecting Knowledge to Life'
                : 'Công cụ hỗ trợ học tập SGK Tin học 10 Kết nối tri thức với cuộc sống • NXB Giáo dục Việt Nam'}
            </p>
          </div>

          <div className="flex items-center gap-4 font-semibold">
            <button
              type="button"
              onClick={openCover}
              className="text-xs text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
            >
              {bilingualMode === 'en' ? '← Back to Cover' : '← Quay lại Trang bìa'}
            </button>
            <button
              type="button"
              onClick={() => setShowCopyrightModal(true)}
              className="text-xs text-slate-600 hover:text-slate-900 underline cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Publication Records' : 'Thông tin xuất bản'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
