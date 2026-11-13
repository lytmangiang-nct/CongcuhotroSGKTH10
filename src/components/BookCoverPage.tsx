import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Volume2,
  Languages,
  Play,
  FileText,
  Compass,
  Cpu,
  Globe,
  Scale,
  Palette,
  Code,
  Briefcase,
  Search,
  ExternalLink,
  Info,
  ChevronRight,
  Binary,
  BookA,
  User,
  BarChart3
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SGK_TOPICS, SGK_EXTRAS } from '../data/curriculumData';
import { LESSONS_REGISTRY } from '../data/lessonsRegistry';

// Front matter items corresponding to pages 0 to 5 of the textbook
const FRONT_MATTER_PAGES = [
  {
    pageNum: 0,
    labelVi: 'Bìa chính (Bìa 1)',
    labelEn: 'Front Cover (Cover 1)',
    descVi: 'Bìa chính thức Sách giáo khoa Tin học 10 • Kết nối tri thức với cuộc sống',
    descEn: 'Official Informatics 10 Textbook Front Cover • Connecting Knowledge to Life',
    pageHint: 'Trang 0'
  },
  {
    pageNum: 1,
    labelVi: 'Trang bìa lót & Tác giả',
    labelEn: 'Title Page & Authors',
    descVi: 'GS.TSKH Phạm Thế Long (Tổng Chủ biên), PGS.TS Đào Kiến Quốc (Chủ biên) và Hội đồng biên soạn',
    descEn: 'Prof. Dr. Pham The Long (Editor-in-Chief), Assoc. Prof. Dao Kien Quoc and Authors',
    pageHint: 'Trang 1'
  },
  {
    pageNum: 2,
    labelVi: 'Hướng dẫn sử dụng sách',
    labelEn: 'How to Use This Book',
    descVi: 'Quy chuẩn 9 thành phần bài học & Kí hiệu phân luồng Tin học ứng dụng (ICT) và Khoa học máy tính (CS)',
    descEn: '9 pedagogical lesson components & ICT / CS track indicators',
    pageHint: 'Trang 2'
  },
  {
    pageNum: 3,
    labelVi: 'Lời nói đầu',
    labelEn: 'Preface',
    descVi: 'Định hướng tiếp cận Chương trình GDPT 2018, ngôn ngữ lập trình Python và cấu trúc 6 chủ đề',
    descEn: '2018 Curriculum orientation, Python programming approach, and 6 core themes',
    pageHint: 'Trang 3'
  },
  {
    pageNum: 4,
    labelVi: 'Mục lục SGK gốc (Phần 1)',
    labelEn: 'Original TOC (Part 1)',
    descVi: 'Chủ đề 1 đến Chủ đề 4 (Bài 1 đến Bài 15 • Trang 6 – 85 SGK)',
    descEn: 'Topics 1 to 4 (Lessons 1 to 15 • Pages 6 – 85)',
    pageHint: 'Trang 4'
  },
  {
    pageNum: 5,
    labelVi: 'Mục lục SGK gốc (Phần 2)',
    labelEn: 'Original TOC (Part 2)',
    descVi: 'Chủ đề 5 & 6, Phụ lục ASCII & Bảng giải thích thuật ngữ (Trang 86 – 168 SGK)',
    descEn: 'Topics 5 & 6, ASCII Appendix & Glossary (Pages 86 – 168)',
    pageHint: 'Trang 5'
  }
];

export const BookCoverPage: React.FC = () => {
  const {
    openToc,
    openReader,
    resumeLastSession,
    currentLessonId,
    currentLesson,
    currentPage,
    bilingualMode,
    setBilingualMode,
    setShowCopyrightModal,
    setShowGlossaryModal,
    setShowAsciiModal,
    setShowOriginalModal,
    setOriginalPageTarget,
    activeProfile,
    setShowProfileModal,
    setShowTeacherAnalyticsModal
  } = useBook();

  const currentSection = currentLesson.sections[currentPage] || currentLesson.sections[0];
  const totalLessonsCount = Object.keys(LESSONS_REGISTRY).length || 34;

  const handleOpenFrontMatterScan = (pageNum: number) => {
    setOriginalPageTarget(pageNum);
    setShowOriginalModal(true);
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Code':
        return <Code className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      {/* 1. Top Global Navigation Bar */}
      <nav className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-sm shadow-indigo-600/30 shrink-0">
            10
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 leading-none">
              {bilingualMode === 'en'
                ? 'MOET Vietnam • 2018 General Curriculum'
                : 'Bộ Giáo dục & Đào tạo • Chương trình GDPT 2018'}
            </div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
              {bilingualMode === 'en'
                ? 'Informatics 10 Digital Companion'
                : 'Sách Giáo Khoa Tin Học 10 • KNTT'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setBilingualMode('vi')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                bilingualMode === 'vi' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🇻🇳</span>
              <span>Tiếng Việt</span>
            </button>
            <button
              type="button"
              onClick={() => setBilingualMode('en')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                bilingualMode === 'en' ? 'bg-white text-indigo-700 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🇬🇧</span>
              <span>English</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowProfileModal(true)}
            className="px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title={
              activeProfile
                ? `${bilingualMode === 'en' ? 'Profile' : 'Hồ sơ'}: ${activeProfile.fullName}`
                : bilingualMode === 'en'
                ? 'Learner Profile'
                : 'Hồ sơ'
            }
          >
            <User className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="max-w-[140px] truncate">
              {activeProfile
                ? `${bilingualMode === 'en' ? 'Profile' : 'Hồ sơ'}: ${activeProfile.fullName}`
                : bilingualMode === 'en'
                ? 'Profile'
                : 'Hồ sơ'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowCopyrightModal(true)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title={bilingualMode === 'en' ? 'Publication & Copyright Dossier' : 'Hồ sơ Xuất bản & Bản quyền'}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="hidden md:inline">
              {bilingualMode === 'en' ? 'Copyright' : 'Bản quyền'}
            </span>
          </button>
        </div>
      </nav>

      {/* 2. Main Body Container */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-8 sm:py-10 flex-1 space-y-10">
        
        {/* HERO SECTION: Authentic Textbook Identity & Immediate Action */}
        <section className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Textbook Identity & Information */}
            <div className="lg:col-span-8 space-y-5">
              {/* Quiet unboxed metadata kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="text-indigo-700 font-bold uppercase tracking-wider">
                  {bilingualMode === 'en' ? 'High School Grade 10' : 'Lớp 10 THPT'}
                </span>
                <span aria-hidden="true">·</span>
                <span>Bộ sách Kết nối tri thức với cuộc sống</span>
                <span aria-hidden="true">·</span>
                <span>NXB Giáo dục Việt Nam</span>
              </div>

              {/* Main Title & Subtitle */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {bilingualMode === 'en' ? 'Informatics 10' : 'Tin Học 10'}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
                  {bilingualMode === 'en'
                    ? 'Official Grade 10 Informatics digital curriculum platform. Explore all 6 core themes with 34 interactive lessons, 3D WebGL laboratories, Python coding environments, and verified textbook scans.'
                    : 'Nền tảng học tập số hoá toàn diện theo Sách giáo khoa Tin học 10 (Bộ sách Kết nối tri thức với cuộc sống). Bao quát 6 chủ đề với 34 bài học chuẩn, mô phỏng 3D WebGL trực quan, thực hành lập trình Python và bản chụp scan gốc đối chứng.'}
                </p>
              </div>

              {/* Authors & Publisher metadata line */}
              <div className="text-xs text-slate-500 pt-1 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1">
                <div>
                  <span className="text-slate-400">{bilingualMode === 'en' ? 'Editor-in-Chief: ' : 'Tổng Chủ biên: '}</span>
                  <span className="font-semibold text-slate-700">GS.TSKH. Phạm Thế Long</span>
                </div>
                <div>
                  <span className="text-slate-400">{bilingualMode === 'en' ? 'Editor: ' : 'Chủ biên: '}</span>
                  <span className="font-semibold text-slate-700">PGS.TS. Đào Kiến Quốc</span>
                </div>
                <div>
                  <span className="text-slate-400">{bilingualMode === 'en' ? 'Authors: ' : 'Tác giả: '}</span>
                  <span className="font-semibold text-slate-700">Bùi Việt Hà, Lê Chí Ngọc, Lê Kim Thư</span>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                {/* 1. Mở Mục Lục Toàn Cuốn Sách */}
                <button
                  type="button"
                  onClick={openToc}
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-sm sm:text-base flex items-center gap-2.5 transition-all cursor-pointer shadow-md shadow-indigo-600/25"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{bilingualMode === 'en' ? `Table of Contents (${totalLessonsCount} Lessons)` : `Mục Lục Thông Minh (${totalLessonsCount} Bài học)`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* 2. Tiếp tục học đúng bài và mục đang học */}
                <button
                  type="button"
                  onClick={resumeLastSession}
                  className="px-5 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-950 font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all cursor-pointer border border-emerald-300 shadow-2xs"
                  title={bilingualMode === 'en' ? `Continue Learning Lesson ${currentLessonId}: ${currentLesson.titleEn}` : `Tiếp tục học Bài ${currentLessonId}: ${currentLesson.titleVi}`}
                >
                  <Play className="w-4 h-4 text-emerald-600 fill-emerald-600 shrink-0" />
                  <div className="text-left">
                    <div className="leading-tight">
                      {bilingualMode === 'en' ? 'Continue Learning' : 'Tiếp tục học'}
                    </div>
                    <div className="text-[11px] text-emerald-800 font-semibold truncate max-w-[190px] sm:max-w-[230px]">
                      {bilingualMode === 'en'
                        ? `Lesson ${currentLessonId} • Section ${currentPage + 1}: ${currentSection.titleEn || currentSection.titleVi}`
                        : `Bài ${currentLessonId} • Mục ${currentPage + 1}: ${currentSection.titleVi}`}
                    </div>
                  </div>
                </button>

                {/* 3. Bảng theo dõi học tập */}
                <button
                  type="button"
                  onClick={() => setShowTeacherAnalyticsModal(true)}
                  className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer border border-slate-200"
                >
                  <BarChart3 className="w-4 h-4 text-indigo-600" />
                  <span>{bilingualMode === 'en' ? 'Learning Tracker' : 'Bảng theo dõi học tập'}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Authentic Book Mockup & Quick Visual Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div
                onClick={() => resumeLastSession()}
                className="group relative cursor-pointer select-none max-w-[260px] sm:max-w-[280px] w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                title={bilingualMode === 'en' ? 'Click to enter interactive lesson reader immediately' : 'Bấm vào để vào ngay bài học tương tác (Không cần mở file scan)'}
              >
                <div className="aspect-[3/4] relative bg-slate-100 overflow-hidden">
                  <img
                    src="/assets/aistudio/image_012abbac.png"
                    alt="Sách giáo khoa Tin học 10"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 block mb-0.5">
                      {bilingualMode === 'en' ? 'Interactive Textbook' : 'Sách Giáo Khoa Số Hóa'}
                    </span>
                    <div className="text-xs font-bold leading-tight flex items-center justify-between">
                      <span>{bilingualMode === 'en' ? 'Click to Enter Lesson' : 'Bấm để vào học ngay'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. FRONT MATTER EXPLORER (HỆ THỐNG TRANG ĐẦU CỦA SÁCH: Trang 0 – Trang 5) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Front Matter & Book Entryway (Pages 0 – 5)'
                    : 'Hệ Thống Trang Đầu & Hồ Sơ Sách (Trang 0 – 5)'}
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Click any section to dive directly into interactive learning or browse curriculum information.'
                  : 'Bấm chọn vào các phần để chuyển thẳng vào bài học tương tác hoặc mở mục lục 34 bài.'}
              </p>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              6 trang mở đầu SGK
            </span>
          </div>

          {/* Front Matter Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {FRONT_MATTER_PAGES.map((fm) => (
              <div
                key={fm.pageNum}
                onClick={() => {
                  if (fm.pageNum === 4 || fm.pageNum === 5) {
                    openToc();
                  } else if (fm.pageNum === 1) {
                    setShowCopyrightModal(true);
                  } else {
                    openReader(1, 0);
                  }
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="font-mono font-bold text-indigo-600">{fm.pageHint}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenFrontMatterScan(fm.pageNum);
                      }}
                      className="text-[11px] font-medium text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                      title="Xem bản scan gốc đối chứng"
                    >
                      <span>Bản scan</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {bilingualMode === 'en' ? fm.labelEn : fm.labelVi}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {bilingualMode === 'en' ? fm.descEn : fm.descVi}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-indigo-600">
                  <span className="text-slate-400 font-normal">
                    {fm.pageNum === 4 || fm.pageNum === 5
                      ? (bilingualMode === 'en' ? 'Full Curriculum TOC' : 'Mục lục 34 bài')
                      : (bilingualMode === 'en' ? 'Interactive Lesson' : 'Bài học số hoá')}
                  </span>
                  <span className="group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold">
                    <span>
                      {fm.pageNum === 4 || fm.pageNum === 5
                        ? (bilingualMode === 'en' ? 'Open TOC' : 'Xem mục lục')
                        : fm.pageNum === 1
                        ? (bilingualMode === 'en' ? 'View Details' : 'Xem tác giả')
                        : (bilingualMode === 'en' ? 'Start Lesson 1' : 'Vào bài học ngay')}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. THE 6 CORE THEMES (TỔNG QUAN 6 CHỦ ĐỀ MÔN TIN HỌC 10) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                <span>
                  {bilingualMode === 'en'
                    ? 'The 6 Curriculum Themes (34 Lessons)'
                    : 'Tổng Quan 6 Chủ Đề Môn Học (Toàn bộ 34 Bài)'}
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Click any theme to explore its lessons in the smart table of contents.'
                  : 'Bấm vào chủ đề bất kỳ để chuyển thẳng đến danh sách bài học tương ứng trong Mục lục thông minh.'}
              </p>
            </div>
            
            <button
              type="button"
              onClick={openToc}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>{bilingualMode === 'en' ? 'Open Full Table of Contents' : 'Mở Mục lục đầy đủ'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 6 Theme Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SGK_TOPICS.map((topic) => {
              const startLesson = topic.lessons[0]?.lessonNumber || 1;
              const endLesson = topic.lessons[topic.lessons.length - 1]?.lessonNumber || startLesson;
              const lessonCount = topic.lessons.length;

              return (
                <div
                  key={topic.id}
                  onClick={openToc}
                  className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {/* Header info */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                          {getTopicIcon(topic.iconName)}
                        </div>
                        <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                          {bilingualMode === 'en' ? `Topic ${topic.topicNumber}` : `Chủ đề ${topic.topicNumber}`}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {bilingualMode === 'en' ? `p. ${topic.page}` : `Tr. ${topic.page}`}
                      </span>
                    </div>

                    {/* Topic Title */}
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {bilingualMode === 'en' ? (topic.titleEn || topic.titleVi) : topic.titleVi}
                      </h3>
                    </div>

                    {/* Lesson count & range */}
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span className="font-semibold text-slate-700">
                        {lessonCount} {bilingualMode === 'en' ? 'lessons' : 'bài học'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {startLesson === endLesson
                          ? (bilingualMode === 'en' ? `Lesson ${startLesson}` : `Bài ${startLesson}`)
                          : (bilingualMode === 'en' ? `Lessons ${startLesson}–${endLesson}` : `Bài ${startLesson} – ${endLesson}`)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                    <span className="text-[11px] text-slate-400 font-normal">
                      {bilingualMode === 'en' ? 'Click to browse' : 'Bấm để xem các bài'}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[11px]">
                      <span>{bilingualMode === 'en' ? 'Browse' : 'Mở xem'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. END-OF-BOOK SUITE (PHẦN CUỐI SÁCH: Trang 165 – Trang 168) */}
        <section className="rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                {bilingualMode === 'en' ? 'Back Matter & Reference' : 'Phần Cuối Sách & Tra Cứu'}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {bilingualMode === 'en'
                  ? 'Appendix, Glossary & Publication Dossier (Pages 165 – 168)'
                  : 'Phụ Lục ASCII, Bảng Thuật Ngữ & Bản Quyền (Trang 165 – 168)'}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">ISBN 978-604-0-31089-7</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* ASCII Table */}
            <div
              onClick={() => setShowAsciiModal(true)}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all cursor-pointer group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Binary className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {bilingualMode === 'en' ? 'Extended ASCII Table' : 'Phụ lục: Bảng mã ASCII'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Tr. 165</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  Ma trận 16×16, 256 mã ký tự, bộ chuyển đổi Text-to-ASCII
                </p>
              </div>
            </div>

            {/* Glossary */}
            <div
              onClick={() => setShowGlossaryModal(true)}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <BookA className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {bilingualMode === 'en' ? 'Curriculum Glossary' : 'Bảng giải thích thuật ngữ'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Tr. 166–167</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  29 thuật ngữ chính thức SGK kèm số trang tham chiếu
                </p>
              </div>
            </div>

            {/* Publication */}
            <div
              onClick={() => setShowCopyrightModal(true)}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer group flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {bilingualMode === 'en' ? 'Copyright & Dossier' : 'Hồ sơ bản quyền & NXB'}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Tr. 168</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  Hội đồng xuất bản, Ban biên tập, Bản quyền © 2022
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 6. Clean Academic Footer */}
      <footer className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-5 border-t border-slate-200/80 bg-white text-slate-500 text-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <p className="text-slate-600">
              <span className="font-bold text-slate-800">
                {bilingualMode === 'en' ? 'Academic Companion:' : 'Công cụ học tập bổ trợ:'}
              </span>{' '}
              {bilingualMode === 'en'
                ? 'Connecting Knowledge to Life • Vietnam Education Publishing House (Non-commercial educational companion)'
                : 'Sách giáo khoa Tin học 10 (Bộ sách Kết nối tri thức với cuộc sống • NXB Giáo dục Việt Nam)'}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={openToc}
              className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Table of Contents' : 'Mục lục 34 bài'}
            </button>
            <button
              type="button"
              onClick={() => setShowCopyrightModal(true)}
              className="text-slate-600 hover:text-slate-900 underline cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Publication & Copyright' : 'Hồ sơ xuất bản & Bản quyền'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
