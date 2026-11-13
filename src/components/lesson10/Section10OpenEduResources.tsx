import React, { useState } from 'react';
import {
  BookOpen,
  FolderTree,
  Search,
  Video,
  Play,
  Eye,
  Star,
  ExternalLink,
  ChevronRight,
  Folder,
  Tv,
  CheckCircle2,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Bookmark,
  School,
  GraduationCap
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section10OpenEduResources: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget
  } = useBook();

  // Selected categories in the 3-tier hierarchy
  const [tier1Category, setTier1Category] = useState<'hoc_lieu' | 'sgk' | 'du_dia_chi'>('hoc_lieu');
  const [selectedGrade, setSelectedGrade] = useState<number>(10);
  const [selectedSubject, setSelectedSubject] = useState<string>('daiso');
  const [activeLectureModal, setActiveLectureModal] = useState<boolean>(false);

  const sectionSpeechVi =
    'Nhiệm vụ 2: Khai thác kho học liệu mở trên Internet igiaoduc.vn. Khái niệm học liệu mở bắt đầu từ sáng kiến của Viện Công nghệ Massachusetts MIT năm 2002 khi công bố toàn bộ bài giảng miễn phí. Tại Việt Nam, Bộ Giáo dục và Đào tạo quản lý kho học liệu số quốc gia tại địa chỉ igiaoduc.vn với cấu trúc cây thư mục 3 cấp: Cấp 1 gồm Học liệu số, Sách giáo khoa và Dư địa chí; Cấp 2 gồm các khối lớp từ Mầm non đến Lớp 12; Cấp 3 chia theo từng môn học như Đại số 10 hay Tin học 10. Nháy nút Học trực tuyến để theo dõi video bài giảng truyền hình.';
  const sectionSpeechEn =
    'Task 2: Exploiting National Open Educational Resources on igiaoduc.vn. Open Educational Resources (OER) originated from the landmark 2002 MIT OpenCourseWare initiative publishing curricula freely online. In Vietnam, the Ministry of Education and Training maintains the national digital learning portal at igiaoduc.vn organized across a 3-tier taxonomy: Tier 1 (Digital Lessons, Textbooks, Topography), Tier 2 (Grades K through 12), and Tier 3 (Subjects such as Algebra 10 and Computer Science). Click "Online Study" to stream televised video lectures.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(
        bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi,
        bilingualMode === 'en' ? 'en' : 'vi'
      );
    }
  };

  const grade10Subjects = [
    { id: 'daiso', nameVi: 'Đại số (15)', nameEn: 'Algebra (15)', icon: '📐' },
    { id: 'hinhhoc', nameVi: 'Hình học (12)', nameEn: 'Geometry (12)', icon: '📏' },
    { id: 'tinhoc', nameVi: 'Tin học (24)', nameEn: 'Informatics (24)', icon: '💻' },
    { id: 'nguvan', nameVi: 'Ngữ văn (33)', nameEn: 'Literature (33)', icon: '📖' },
    { id: 'tienganh', nameVi: 'Ngoại ngữ (62)', nameEn: 'English (62)', icon: '🌐' },
    { id: 'vatli', nameVi: 'Vật lí (18)', nameEn: 'Physics (18)', icon: '⚡' }
  ];

  const sampleLectures = [
    {
      id: 1,
      titleVi: 'Luyện tập: Dấu của tam thức bậc 2 (tiết 4)',
      titleEn: 'Practice: Signs of Quadratic Trinomials (Part 4)',
      subject: 'Đại số 10',
      source: 'Đài truyền hình HanoiTV2 - Hà Nội',
      date: '06/04/2020',
      views: 315,
      rating: 5,
      imageBg: 'from-blue-600 to-indigo-800'
    },
    {
      id: 2,
      titleVi: 'Phương trình bậc hai một ẩn và ứng dụng',
      titleEn: 'Quadratic Equations and Real-World Applications',
      subject: 'Đại số 10',
      source: 'Trường THPT Chuyên Hà Nội - Amsterdam',
      date: '12/10/2021',
      views: 197,
      rating: 4,
      imageBg: 'from-sky-600 to-blue-900'
    },
    {
      id: 3,
      titleVi: 'Biểu thức đại số và tập xác định của hàm số',
      titleEn: 'Algebraic Expressions and Function Domain',
      subject: 'Đại số 10',
      source: 'Sở Giáo dục và Đào tạo Hà Nội',
      date: '18/11/2021',
      views: 1116,
      rating: 5,
      imageBg: 'from-indigo-600 to-purple-800'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
            {bilingualMode === 'en' ? 'Task 2 • Textbook Pages 52–54' : 'Nhiệm vụ 2 • SGK Trang 52 – 54'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            <BilingualText
              vi="KHAI THÁC KHO HỌC LIỆU MỞ QUỐC GIA (IGIAODUC.VN)"
              en="NATIONAL OPEN EDUCATIONAL REPOSITORY (IGIAODUC.VN)"
            />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <BilingualText
              vi="Sáng kiến MIT 2002, Cây thư mục 3 cấp (Hình 10.7 & 10.8) & Xem bài giảng (Hình 10.9)"
              en="MIT 2002 Initiative, 3-Tier Taxonomy Tree (Figures 10.7 & 10.8) & Streaming Lectures (Figure 10.9)"
            />
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOriginalPageTarget(53)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
            <span>{bilingualMode === 'en' ? 'Textbook Page 53' : 'SGK Trang 53'}</span>
          </button>
        </div>
      </div>

      {/* Historical Milestone Box: MIT 2002 (SGK trang 53) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-r from-rose-50 via-pink-50 to-amber-50 dark:from-rose-950/30 dark:via-slate-900 dark:to-amber-950/20 border border-rose-300/80 dark:border-rose-800 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2 font-black text-sm text-rose-800 dark:text-rose-300">
          <School className="w-5 h-5 text-rose-600" />
          <span>
            {bilingualMode === 'en'
              ? 'Historical Milestone: MIT OpenCourseWare Initiative (2002)'
              : 'Dấu mốc Lịch sử: Khởi nguồn Học liệu mở MIT 2002 (SGK Trang 53)'}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en'
            ? 'The concept of Open Educational Resources (OER) became widely adopted in 2002 when the Massachusetts Institute of Technology (MIT) made all its instructional materials publicly available on the Internet for free. Many educational institutions worldwide followed suit, unlocking opportunities for learners globally to access advanced knowledge at near-zero marginal cost.'
            : 'Khái niệm học liệu mở được dùng rộng rãi khi Học viện Công nghệ Massachusetts (MIT của Mỹ) năm 2002 đưa toàn bộ nội dung giảng dạy của mình lên Internet để sử dụng miễn phí. Nhiều cơ sở giáo dục sau đó theo gương, mở ra cơ hội cho mọi người có thể tiếp cận tri thức mới với chi phí thấp.'}
        </p>
      </div>

      {/* INTERACTIVE SIMULATOR: igiaoduc.vn Portal Sandbox (Hình 10.7, 10.8, 10.9 SGK) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
        {/* Browser Top URL Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                {bilingualMode === 'en'
                  ? 'National Digital Repository Simulator (Figures 10.7–10.9)'
                  : 'Mô phỏng Kho học liệu số Quốc gia (Hình 10.7 – 10.9)'}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'National Digital Educational Repository • Ministry of Education & Training'
                  : 'Kho học liệu số Giáo dục • Bộ Giáo dục và Đào tạo'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>https://igiaoduc.vn/</span>
            </span>
          </div>
        </div>

        {/* Search Bar on igiaoduc.vn */}
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <Search className="w-4 h-4 text-slate-400 ml-2" />
          <input
            type="text"
            readOnly
            value={
              bilingualMode === 'en'
                ? 'Algebra 10 - Signs of Quadratic Trinomials'
                : 'Đại số 10 - Dấu của tam thức bậc 2'
            }
            className="bg-transparent border-none outline-hidden text-xs text-slate-800 dark:text-slate-100 w-full font-medium"
          />
          <button
            type="button"
            className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shrink-0 cursor-pointer"
          >
            {bilingualMode === 'en' ? 'Search' : 'Tìm kiếm'}
          </button>
        </div>

        {/* 3-Tier Hierarchy Explorer Layout (Hình 10.7 & 10.8) */}
        <div className="grid lg:grid-cols-4 gap-4">
          {/* Left Column: 3-Tier Taxonomy Tree (Cây thư mục đa cấp) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-emerald-600" />
              <span>
                {bilingualMode === 'en'
                  ? '3-Tier Taxonomy Tree (Figure 10.7)'
                  : 'Cây thư mục đa cấp (Hình 10.7)'}
              </span>
            </div>

            {/* Tier 1 Categories */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase">
                {bilingualMode === 'en' ? 'Tier 1: Category' : 'Cấp 1: Chuyên mục'}
              </div>
              {[
                {
                  id: 'hoc_lieu' as const,
                  nameVi: 'Học liệu số',
                  nameEn: 'Digital Lessons',
                  count: '12.4K'
                },
                {
                  id: 'sgk' as const,
                  nameVi: 'Sách giáo khoa',
                  nameEn: 'Textbooks',
                  count: '450'
                },
                {
                  id: 'du_dia_chi' as const,
                  nameVi: 'Dư địa chí',
                  nameEn: 'Topography',
                  count: '63'
                }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setTier1Category(cat.id)}
                  className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    tier1Category === cat.id
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Folder className="w-3.5 h-3.5" />
                    <span>{bilingualMode === 'en' ? cat.nameEn : cat.nameVi}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              ))}
            </div>

            {/* Tier 2: Grade Selection */}
            <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 uppercase">
                {bilingualMode === 'en' ? 'Tier 2: Grade Level' : 'Cấp 2: Khối lớp'}
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[10, 11, 12].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={`py-1 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                      selectedGrade === g
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {bilingualMode === 'en' ? `Grade ${g}` : `Lớp ${g}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier 3: Subject Selection (Hình 10.8) */}
            <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-700">
              <div className="text-[11px] font-bold text-slate-400 uppercase">
                {bilingualMode === 'en' ? 'Tier 3: Grade 10 Subjects' : 'Cấp 3: Môn học (Lớp 10)'}
              </div>
              {grade10Subjects.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                    selectedSubject === sub.id
                      ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-bold border border-emerald-300 dark:border-emerald-700'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">
                    {sub.icon} {bilingualMode === 'en' ? sub.nameEn : sub.nameVi}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {bilingualMode === 'en' ? 'View' : 'Xem'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right 3 Columns: Lecture Cards Gallery (Hình 10.8 & 10.9) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {bilingualMode === 'en' ? (
                  <>Digital video lectures for <strong>Grade 10 Algebra</strong> (Figure 10.8):</>
                ) : (
                  <>Các bài giảng số môn <strong>Đại số lớp 10</strong> (Hình 10.8 SGK):</>
                )}
              </div>
              <span className="text-[11px] text-emerald-600 font-bold">
                {bilingualMode === 'en'
                  ? 'Showing 3 of 15 featured lectures'
                  : 'Hiển thị 3 / 15 bài giảng tiêu biểu'}
              </span>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {sampleLectures.map((lec) => (
                <div
                  key={lec.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden flex flex-col justify-between hover:border-emerald-500/60 transition-all group"
                >
                  {/* Lecture Card Header Thumbnail */}
                  <div className={`p-4 bg-gradient-to-br ${lec.imageBg} text-white space-y-1.5 relative`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-full inline-block">
                      {bilingualMode === 'en' ? 'Algebra 10' : lec.subject}
                    </span>
                    <div className="font-black text-sm leading-snug line-clamp-2">
                      {bilingualMode === 'en' ? lec.titleEn : lec.titleVi}
                    </div>
                    <div className="text-[11px] text-blue-200 truncate">
                      {bilingualMode === 'en'
                        ? lec.id === 1
                          ? 'HanoiTV2 Broadcaster - Hanoi'
                          : lec.id === 2
                          ? 'Hanoi - Amsterdam High School'
                          : 'Hanoi Dept. of Education & Training'
                        : lec.source}
                    </div>
                  </div>

                  {/* Metadata and Action Button */}
                  <div className="p-3 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {lec.views} {bilingualMode === 'en' ? 'views' : 'lượt xem'}
                        </span>
                      </span>
                      <span className="flex items-center gap-0.5 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>5.0</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveLectureModal(true)}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>
                        {bilingualMode === 'en'
                          ? 'Study Online (Figure 10.9)'
                          : 'Học trực tuyến (Hình 10.9)'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Figure 10.9 Lecture Player Simulation Modal */}
            {activeLectureModal && (
              <div className="p-5 rounded-3xl bg-slate-950 text-white border-2 border-emerald-500/80 shadow-2xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Tv className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-emerald-400">
                        {bilingualMode === 'en'
                          ? 'Online Lecture Streaming Simulation (Figure 10.9 Page 54)'
                          : 'Mô phỏng xem bài giảng trực tuyến (Hình 10.9 SGK trang 54)'}
                      </div>
                      <div className="text-sm font-black">
                        {bilingualMode === 'en'
                          ? 'Practice: Signs of Quadratic Trinomials (Part 4)'
                          : 'Luyện tập: Dấu của tam thức bậc 2 (tiết 4)'}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveLectureModal(false)}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold cursor-pointer"
                  >
                    {bilingualMode === 'en' ? 'Close' : 'Đóng'}
                  </button>
                </div>

                {/* Video Player Display Screen */}
                <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-600/30 border border-emerald-500 flex items-center justify-center text-emerald-400 animate-pulse">
                    <Play className="w-7 h-7 ml-1" />
                  </div>
                  <div className="text-sm font-bold text-slate-200">
                    {bilingualMode === 'en'
                      ? 'Streaming digital video lecture from HanoiTV2 Broadcast Channel'
                      : 'Đang truyền phát bài giảng số từ Đài truyền hình HanoiTV2'}
                  </div>
                  <div className="text-xs text-slate-400 max-w-md">
                    {bilingualMode === 'en'
                      ? 'Educational media formats include live classroom broadcast recordings and interactive multimedia slides adapted from teacher presentations.'
                      : 'Có nhiều dạng bài giảng như video quay trực tiếp bài giảng trên lớp hoặc bài giảng điện tử tương tác được chuyển thể từ bài trình chiếu của giáo viên.'}
                  </div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between pt-1 font-mono">
                  <span>
                    {bilingualMode === 'en'
                      ? 'Digital Repository: HanoiTV2 Broadcaster • Air date: 06/04/2020'
                      : 'Học liệu số: Đài truyền hình HanoiTV2 • Ngày phát: 06/04/2020'}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    {bilingualMode === 'en' ? 'Live Stream 1080p' : 'Trực tuyến 1080p'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={10} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous' : 'Quay lại'}</span>
        </button>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-emerald-500/25"
        >
          <span>
            {bilingualMode === 'en' ? 'Section 4: Global OER Hubs' : 'Mục 4: Các kho học liệu mở quốc tế'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
