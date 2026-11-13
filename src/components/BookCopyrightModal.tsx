import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  BookOpen,
  Users,
  Building2,
  FileCheck2,
  HeartHandshake,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookmarkCheck,
  CheckCircle2,
  Scale,
  GraduationCap,
  Layers,
  HelpCircle,
  Laptop
} from 'lucide-react';
import { useBook } from '../context/BookContext';

interface BookOriginPage {
  id: string;
  name: string;
  pageLabel: string;
  subLabel: string;
  image: string;
  description: string;
  highlightText: string;
}

export const BOOK_ORIGIN_PAGES: BookOriginPage[] = [
  {
    id: 'cover',
    name: 'Bìa chính (Bìa 1)',
    pageLabel: 'Bìa trước',
    subLabel: 'Mặt ngoài',
    image: '/assets/aistudio/image_012abbac.png',
    description: 'Bìa chính thức Sách giáo khoa Tin học 10, Bộ sách "Kết nối tri thức với cuộc sống", Nhà xuất bản Giáo dục Việt Nam.',
    highlightText: 'Bộ GD&ĐT • Tổng Chủ biên: Phạm Thế Long • Chủ biên: Đào Kiến Quốc • NXB Giáo dục Việt Nam'
  },
  {
    id: 'inner_title',
    name: 'Trang bìa lót (Trang 1)',
    pageLabel: 'Trang 1',
    subLabel: 'Bìa lót',
    image: '/assets/aistudio/image_cf29d42a.png',
    description: 'Trang bìa lót bên trong ghi nhận chi tiết cơ quan chỉ đạo, danh mục tác giả biên soạn và nhà xuất bản phát hành.',
    highlightText: 'GS.TSKH Phạm Thế Long (Tổng Chủ biên) • PGS.TS Đào Kiến Quốc (Chủ biên) • Bùi Việt Hà, Lê Chí Ngọc, Lê Kim Thư'
  },
  {
    id: 'guide',
    name: 'Hướng dẫn sử dụng sách (Trang 2)',
    pageLabel: 'Trang 2',
    subLabel: 'Cấu trúc bài',
    image: '/assets/aistudio/image_beb6062c.png',
    description: 'Quy chuẩn cấu trúc bài học (Mục tiêu, Khởi động, Hoạt động, Ghi nhớ, Luyện tập, Vận dụng) và phân luồng định hướng ICT & CS.',
    highlightText: 'Kí hiệu nhận diện nhánh Tin học ứng dụng (ICT) và Khoa học máy tính (CS) • Lời kêu gọi giữ gìn sách'
  },
  {
    id: 'foreword',
    name: 'Lời nói đầu (Trang 3)',
    pageLabel: 'Trang 3',
    subLabel: 'Thư ngỏ',
    image: '/assets/aistudio/image_0339bbbe.png',
    description: 'Thư gửi các em học sinh lớp 10, định hướng môn học theo Chương trình GDPT 2018, ngôn ngữ lập trình Python và 6 chủ đề kiến thức.',
    highlightText: 'Chương trình GDPT 2018 Bộ GD&ĐT • Ngôn ngữ lập trình hiện đại Python • 6 Chủ đề cốt lõi'
  },
  {
    id: 'back_cover',
    name: 'Thông tin xuất bản & Bản quyền (Trang 168)',
    pageLabel: 'Trang 168',
    subLabel: 'Trang cuối sách',
    image: '/assets/aistudio/image_8828d44e.png',
    description: 'Trang cuối sách giáo khoa ghi nhận lời cảm ơn tác giả tư liệu, ban lãnh đạo chịu trách nhiệm xuất bản, chịu trách nhiệm nội dung, ban biên tập, thông số xuất bản và mã số ISBN.',
    highlightText: 'Chủ tịch HĐTV: Nguyễn Đức Thái • Tổng Giám đốc: Hoàng Lê Bách • Tổng biên tập: Phạm Vĩnh Thái • ISBN: 978-604-0-31089-7'
  }
];

export const BookCopyrightModal: React.FC = () => {
  const {
    showCopyrightModal,
    setShowCopyrightModal,
    setShowOriginalModal,
    setOriginalPageTarget,
    bilingualMode
  } = useBook();
  const [activeTab, setActiveTab] = useState<'credits' | 'legal' | 'guide' | 'scans'>('credits');
  const [selectedScanIdx, setSelectedScanIdx] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!showCopyrightModal) return null;

  const currentScan = BOOK_ORIGIN_PAGES[selectedScanIdx];

  const handleOpenLessonScans = (pageNum: number) => {
    setShowCopyrightModal(false);
    setOriginalPageTarget(pageNum);
    setShowOriginalModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/90 dark:bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-emerald-600/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                  {bilingualMode === 'en'
                    ? 'Original Textbook Origin & Academic Copyright'
                    : 'Xuất Xứ & Bản Quyền Sách Giáo Khoa Gốc'}
                </h3>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                  {bilingualMode === 'en' ? 'MOET • 2018 Curriculum' : 'Bộ GD&ĐT • GDPT 2018'}
                </span>
                <span className="text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-800 px-2 py-0.5 rounded-full">
                  {bilingualMode === 'en' ? 'Copyright & Fair-use Compliant' : 'Tuân thủ Bản quyền & Fair-use'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-2xl mt-0.5">
                {bilingualMode === 'en'
                  ? 'Informatics 10 Textbook • "Connecting Knowledge to Life" series • Vietnam Education Publishing House'
                  : 'Sách giáo khoa Tin học 10 • Bộ sách "Kết nối tri thức với cuộc sống" • Nhà xuất bản Giáo dục Việt Nam'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCopyrightModal(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            title={bilingualMode === 'en' ? 'Close (Esc)' : 'Đóng (Esc)'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-4 sm:px-6 pt-2 bg-slate-100/70 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto shrink-0 text-xs sm:text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('credits')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'credits'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'Authors & Publisher' : 'Ban Tác giả & Xuất bản'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('legal')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'legal'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'Copyright & Legal Statement' : 'Tuyên ngôn Bản quyền & Pháp lý'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'guide'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'Textbook Structure & ICT/CS' : 'Hướng dẫn SGK & Định hướng ICT/CS'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('scans')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'scans'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-extrabold'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? '5 Official Publishing Scans' : '5 Bản chụp Scan Bìa & Xuất bản (Tr. 168)'}</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: BAN TÁC GIẢ & NHÀ XUẤT BẢN */}
          {activeTab === 'credits' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Highlight Certificate Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-indigo-950/30 border border-emerald-200/80 dark:border-emerald-800/60 shadow-xs flex flex-col md:flex-row items-center gap-5">
                <img
                  src="/assets/aistudio/image_012abbac.png"
                  alt="Bìa sách giáo khoa Tin học 10"
                  className="w-28 sm:w-32 h-auto rounded-xl shadow-md border border-slate-300 dark:border-slate-700 shrink-0 object-cover cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    setActiveTab('scans');
                    setSelectedScanIdx(0);
                  }}
                  title="Nhấn để xem bản chụp scan phóng to"
                />
                <div className="flex-1 text-center md:text-left space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {bilingualMode === 'en' ? 'Official Copyrighted Textbook' : 'Tác phẩm gốc được bảo hộ tác quyền chính thức'}
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-wide">
                    {bilingualMode === 'en' ? 'INFORMATICS 10 TEXTBOOK' : 'SÁCH GIÁO KHOA TIN HỌC 10'}
                  </h4>
                  <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">
                    {bilingualMode === 'en'
                      ? 'Series: "Connecting Knowledge to Life"'
                      : 'Bộ sách: "Kết nối tri thức với cuộc sống"'}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {bilingualMode === 'en'
                      ? 'Compiled in accordance with the 2018 General Education Curriculum issued under Circular No. 32/2018/TT-BGDDT by the Ministry of Education and Training.'
                      : 'Biên soạn theo Chương trình Giáo dục phổ thông 2018 ban hành theo Thông tư số 32/2018/TT-BGDĐT của Bộ Giáo dục và Đào tạo.'}
                  </p>
                </div>
              </div>

              {/* Grid 2 Columns: Ban Biên Soạn & Nhà Xuất Bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Column 1: Ban Biên Soạn & Tác giả */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-extrabold text-sm uppercase tracking-wide border-b border-slate-200 dark:border-slate-700 pb-2">
                    <Users className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? 'Authors & Editorial Board' : 'Ban Biên Soạn & Tác Giả Gốc'}</span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900/40 shadow-2xs">
                      <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {bilingualMode === 'en' ? 'Editor-in-Chief:' : 'Tổng Chủ biên:'}
                      </div>
                      <div className="text-base font-black text-slate-900 dark:text-white">
                        {bilingualMode === 'en' ? 'PROF. DR. PHAM THE LONG' : 'GS. TSKH. PHẠM THẾ LONG'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {bilingualMode === 'en' ? 'Leading authority in Computer Science & Information Technology' : 'Chuyên gia đầu ngành về Khoa học máy tính & Công nghệ thông tin'}
                      </div>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-900/40 shadow-2xs">
                      <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {bilingualMode === 'en' ? 'Editor:' : 'Chủ biên:'}
                      </div>
                      <div className="text-base font-black text-slate-900 dark:text-white">
                        {bilingualMode === 'en' ? 'ASSOC. PROF. DR. DAO KIEN QUOC' : 'PGS. TS. ĐÀO KIẾN QUỐC'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {bilingualMode === 'en' ? 'Senior lecturer and department chair in Informatics' : 'Chủ nhiệm bộ môn và giảng viên cao cấp trong lĩnh vực Tin học'}
                      </div>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {bilingualMode === 'en' ? 'Co-authors:' : 'Các tác giả tham gia biên soạn:'}
                      </div>
                      <ul className="mt-1.5 space-y-1 font-semibold text-slate-800 dark:text-slate-200">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span><strong>BÙI VIỆT HÀ</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span><strong>LÊ CHÍ NGỌC</strong></span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span><strong>LÊ KIM THƯ</strong></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Column 2: Nhà Xuất Bản & Quy Chuẩn Phát Hành */}
                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-extrabold text-sm uppercase tracking-wide border-b border-slate-200 dark:border-slate-700 pb-2">
                    <Building2 className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? 'Publisher & Issuing Authority' : 'Nhà Xuất Bản & Cơ Quan Ban Hành'}</span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-900/40 shadow-2xs">
                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        {bilingualMode === 'en' ? 'Governing Authority:' : 'Cơ quan chỉ đạo ban hành:'}
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {bilingualMode === 'en' ? 'MINISTRY OF EDUCATION AND TRAINING (VIETNAM)' : 'BỘ GIÁO DỤC VÀ ĐÀO TẠO'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {bilingualMode === 'en' ? 'National general education curriculum for high school informatics' : 'Chuẩn chương trình giáo dục phổ thông môn Tin học cấp THPT'}
                      </div>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-900/40 shadow-2xs">
                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        {bilingualMode === 'en' ? 'Publishing house & distribution rights:' : 'Đơn vị xuất bản & giữ quyền phát hành:'}
                      </div>
                      <div className="text-sm font-black text-slate-900 dark:text-white">
                        {bilingualMode === 'en' ? 'VIETNAM EDUCATION PUBLISHING HOUSE' : 'NHÀ XUẤT BẢN GIÁO DỤC VIỆT NAM'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        (Vietnam Education Publishing House)
                      </div>
                    </div>

                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        {bilingualMode === 'en' ? 'Textbook Care Motto (Page 2 SGK):' : 'Thông điệp giữ gìn sách (Trang 2 SGK):'}
                      </div>
                      <blockquote className="italic text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border-l-4 border-emerald-600">
                        {bilingualMode === 'en'
                          ? '"Please keep and preserve this textbook to pass on to future students!"'
                          : '“Hãy bảo quản, giữ gìn sách giáo khoa để dành tặng các em học sinh lớp sau!”'}
                      </blockquote>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Jump to Original Pages */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  {bilingualMode === 'en'
                    ? 'Cross-reference original scanned pages (Cover, Front Matter, Pages 2-3, and Lesson 1):'
                    : 'Xem đối chiếu các trang chụp scan nguyên gốc (Bìa 1, Bìa lót, Trang 2, Trang 3 và Trang 6–10 Bài 1):'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('scans');
                      setSelectedScanIdx(0);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer transition-colors"
                  >
                    {bilingualMode === 'en' ? 'View 4 Publishing Scans' : 'Xem 4 trang xuất bản gốc'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenLessonScans(6)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <span>{bilingualMode === 'en' ? 'View Lesson 1 (Pages 6-10)' : 'Xem 5 trang Bài 1 (Trang 6-10)'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TUYÊN BỐ PHÁP LÝ & BẢO ĐẢM AN TOÀN BẢN QUYỀN */}
          {activeTab === 'legal' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-start gap-3">
                <Scale className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                  <h4 className="font-extrabold text-amber-900 dark:text-amber-200">
                    {bilingualMode === 'en'
                      ? 'Commitment to Copyright Compliance and Safe Educational Standards (Legal & Fair-Use)'
                      : 'Cam kết Tuân thủ Bản quyền và Tiêu chuẩn Giáo dục An toàn (Legal & Fair-Use Compliance)'}
                  </h4>
                  <p>
                    {bilingualMode === 'en'
                      ? 'This digital application is operated under strict Non-commercial Educational, Fair-use Citation guidelines and the Intellectual Property Law of Vietnam.'
                      : 'Ứng dụng được thiết kế và vận hành nghiêm túc theo các nguyên tắc về Giáo dục Phi thương mại, Quyền trích dẫn hợp lý (Fair-use) và quy định của Luật Sở hữu trí tuệ Việt Nam.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Policy Card 1 */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                    <BookmarkCheck className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? '1. Role & Positioning' : '1. Vai trò & Định vị Ứng dụng'}</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                    {bilingualMode === 'en' ? 'Digital Study Companion' : 'Sách Hỗ Trợ Kĩ Thuật Số Song Hành (Study Companion)'}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {bilingualMode === 'en'
                      ? 'This interactive digital companion provides hands-on 3D labs, unit converters, curriculum glossaries, and formative self-assessments.'
                      : 'Đây là công cụ tương tác số hóa được xây dựng nhằm mục đích trợ giúp học sinh và giáo viên trong quá trình tiếp cận Bài 1: Thông tin và xử lí thông tin. Ứng dụng tích hợp mô phỏng quy trình 3 bước, bộ đổi đơn vị dung lượng, từ điển thuật ngữ Anh - Việt và câu hỏi trắc nghiệm tự đánh giá.'}
                  </p>
                  <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                    {bilingualMode === 'en'
                      ? 'This application does not replace the official printed textbook published by Vietnam Education Publishing House.'
                      : 'Ứng dụng không thay thế bản in Sách giáo khoa chính thức do Nhà xuất bản Giáo dục Việt Nam phát hành.'}
                  </p>
                </div>

                {/* Policy Card 2 */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? '2. Original Intellectual Property' : '2. Quyền Sở Hữu Trí Tuệ Gốc'}</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                    {bilingualMode === 'en' ? 'Vietnam Education Publishing House & Author Board' : 'Thuộc Nhà Xuất Bản Giáo Dục VN & Ban Tác Giả'}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {bilingualMode === 'en'
                      ? 'All author rights, trademarks of "Connecting Knowledge to Life", original texts, figures, and curriculum structures remain the exclusive property of Vietnam Education Publishing House and the author team.'
                      : 'Mọi quyền tác giả, nhãn hiệu bộ sách “Kết nối tri thức với cuộc sống”, nội dung nguyên bản bài học, hình vẽ minh họa và các đề mục sư phạm thuộc quyền sở hữu độc quyền của Nhà xuất bản Giáo dục Việt Nam và Ban tác giả.'}
                  </p>
                </div>

                {/* Policy Card 3 */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
                    <FileCheck2 className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? '3. Purpose of Scans' : '3. Mục Đích Hiển Thị Scan Đối Chiếu'}</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                    {bilingualMode === 'en' ? 'Ensuring Authenticity & Precision' : 'Bảo Đảm Tính Trung Thực & Khoa Học'}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {bilingualMode === 'en'
                      ? 'Displaying textbook scan pages serves solely to provide learners and teachers with direct visual reference to verify concepts against the official MOET curriculum.'
                      : 'Việc số hóa và hiển thị ảnh chụp các trang sách giáo khoa gốc trong ứng dụng chỉ nhằm một mục đích duy nhất: cung cấp tài liệu đối chứng trực quan để người học kiểm chứng sự chuẩn xác giữa công cụ tương tác và văn bản gốc.'}
                  </p>
                </div>

                {/* Policy Card 4 */}
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                    <HeartHandshake className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? '4. Non-commercial & Public Benefit' : '4. Phi Thương Mại & Trách Nhiệm Xã Hội'}</span>
                  </div>
                  <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                    {bilingualMode === 'en' ? 'Serving Teachers & Students' : 'Phục Vụ Cộng Đồng Giáo Viên & Học Sinh'}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {bilingualMode === 'en'
                      ? 'This project is strictly non-commercial, completely free of charge, with zero commercial advertisements, dedicated to digital education advancement.'
                      : 'Dự án hoàn toàn phi thương mại, không thu bất kì chi phí nào, không chứa quảng cáo thương mại. Mục tiêu duy nhất là hỗ trợ thực hiện chuyển đổi số trong giáo dục.'}
                  </p>
                </div>
              </div>

              {/* Call to action notice */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 text-center font-medium">
                {bilingualMode === 'en'
                  ? 'All constructive feedback regarding pedagogical content and copyright compliance is warmly welcomed.'
                  : 'Mọi ý kiến đóng góp về nội dung sư phạm và quyền tác giả xin vui lòng gửi về ban phát triển để được cập nhật và hoàn thiện theo đúng tinh thần tôn trọng pháp luật và giáo dục vì cộng đồng.'}
              </div>
            </div>
          )}

          {/* TAB 3: HƯỚNG DẪN SỬ DỤNG SÁCH & PHÂN LUỒNG ICT/CS */}
          {activeTab === 'guide' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Highlight notice from Page 2 */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/70 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-extrabold text-sm">
                  <GraduationCap className="w-5 h-5" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Textbook Pedagogical Structure (Original Textbook Page 2)'
                      : 'Cấu Trúc Khung Bài Học Theo Chuẩn SGK (Trang 2 SGK Gốc)'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {bilingualMode === 'en'
                    ? 'Every lesson in Informatics 10 follows a modern 9-component unified pedagogical flow:'
                    : 'Mỗi bài học trong SGK Tin học 10 Kết nối tri thức được thiết kế theo tiến trình sư phạm hiện đại gồm 9 cấu phần thống nhất:'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  {[
                    { title: bilingualMode === 'en' ? '1. OBJECTIVES' : '1. MỤC TIÊU', desc: bilingualMode === 'en' ? 'Target learning outcomes' : 'Yêu cầu cần đạt sau bài học' },
                    { title: bilingualMode === 'en' ? '2. WARM-UP' : '2. KHỞI ĐỘNG', desc: bilingualMode === 'en' ? 'Leading question & introduction' : 'Gợi mở, dẫn dắt vào bài' },
                    { title: bilingualMode === 'en' ? '3. ACTIVITIES' : '3. HOẠT ĐỘNG', desc: bilingualMode === 'en' ? 'Inquiry-based exploration' : 'Nhiệm vụ khám phá kiến thức' },
                    { title: bilingualMode === 'en' ? '4. CONTENT' : '4. NỘI DUNG', desc: bilingualMode === 'en' ? 'Core scientific knowledge' : 'Kiến thức cốt lõi khoa học' },
                    { title: bilingualMode === 'en' ? '5. KEY POINTS' : '5. HỘP GHI NHỚ', desc: bilingualMode === 'en' ? 'Essential concepts summary' : 'Tóm tắt trọng tâm cần nhớ' },
                    { title: bilingualMode === 'en' ? '6. QUESTIONS' : '6. CÂU HỎI', desc: bilingualMode === 'en' ? 'Checkpoints after each section' : 'Củng cố ngay sau từng mục' },
                    { title: bilingualMode === 'en' ? '7. PRACTICE' : '7. THỰC HÀNH', desc: bilingualMode === 'en' ? 'Direct hands-on computer tasks' : 'Thao tác trực tiếp trên máy tính' },
                    { title: bilingualMode === 'en' ? '8. EXERCISES' : '8. LUYỆN TẬP', desc: bilingualMode === 'en' ? 'Comprehensive skill practice' : 'Rèn kĩ năng toàn bài' },
                    { title: bilingualMode === 'en' ? '9. APPLICATION' : '9. VẬN DỤNG', desc: bilingualMode === 'en' ? 'Real-world problem solving' : 'Giải quyết bài toán thực tế' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40 text-xs">
                      <div className="font-bold text-blue-700 dark:text-blue-300">{item.title}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2 Special Branches: ICT vs CS */}
              <div className="space-y-3">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Two Career Orientations from Grade 10 (Excerpt from Pages 2 & 3)'
                      : 'Hai Định Hướng Nghề Nghiệp Tin Học Từ Lớp 10 (Trích Trang 2 & Trang 3)'}
                  </span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ICT Branch */}
                  <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/20 border-2 border-cyan-300 dark:border-cyan-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-cyan-600 text-white font-black text-xs">
                        ICT
                      </span>
                      <span className="text-[11px] font-bold text-cyan-800 dark:text-cyan-300">
                        {bilingualMode === 'en' ? 'Cyan Accent Theme' : 'Nền màu xanh lơ'}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {bilingualMode === 'en' ? 'APPLIED INFORMATICS (ICT)' : 'TIN HỌC ỨNG DỤNG (Applied ICT)'}
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {bilingualMode === 'en'
                        ? 'For students pursuing careers utilizing information and communications technology in commerce, multimedia, publishing, and digital arts.'
                        : 'Dành cho học sinh định hướng các nghề nghiệp sử dụng công nghệ thông tin trong đời sống xã hội, sản xuất, kinh doanh, truyền thông đa phương tiện và đồ họa.'}
                    </p>
                  </div>

                  {/* CS Branch */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border-2 border-emerald-300 dark:border-emerald-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white font-black text-xs">
                        CS
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                        {bilingualMode === 'en' ? 'Emerald Green Theme' : 'Nền màu xanh ngọc'}
                      </span>
                    </div>
                    <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {bilingualMode === 'en' ? 'COMPUTER SCIENCE (CS)' : 'KHOA HỌC MÁY TÍNH (Computer Science)'}
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {bilingualMode === 'en'
                        ? 'For students specializing in core computer science, software engineering, algorithm design, data structures, and AI with Python.'
                        : 'Dành cho học sinh định hướng chuyên sâu về công nghệ máy tính, lập trình phát triển phần mềm, nghiên cứu trí tuệ nhân tạo, giải thuật và dữ liệu với ngôn ngữ Python.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 6 Curricular Topics */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {bilingualMode === 'en'
                    ? 'Structure of the 6 Core Curriculum Topics (Preface Page 3):'
                    : 'Cấu trúc 6 Chủ Đề Toàn Cuốn SGK Tin Học 10 (Trích Lời nói đầu - Trang 3):'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-indigo-200 dark:border-indigo-900 font-bold text-indigo-700 dark:text-indigo-300">
                    {bilingualMode === 'en' ? 'Topic 1: Computers & Knowledge Society (Lesson 1)' : 'Chủ đề 1: Máy tính & xã hội tri thức (Bài 1)'}
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {bilingualMode === 'en' ? 'Topic 2: Computer Networks and the Internet' : 'Chủ đề 2: Mạng máy tính và Internet'}
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {bilingualMode === 'en' ? 'Topic 3: Ethics, Law & Digital Culture' : 'Chủ đề 3: Đạo đức, pháp luật & văn hóa số'}
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {bilingualMode === 'en' ? 'Topic 4: Applied Informatics (ICT & CS)' : 'Chủ đề 4: Ứng dụng tin học (ICT & CS)'}
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {bilingualMode === 'en' ? 'Topic 5: Python Programming & Algorithms' : 'Chủ đề 5: Lập trình Python & Giải thuật'}
                  </div>
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {bilingualMode === 'en' ? 'Topic 6: Careers with Informatics' : 'Chủ đề 6: Hướng nghiệp với Tin học'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: THƯ VIỆN BẢN CHỤP SCAN GỐC BÌA & ĐẦU SÁCH */}
          {activeTab === 'scans' && (
            <div className="flex flex-col h-full space-y-3 animate-in fade-in duration-150">
              
              {/* Scan Selector Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
                {BOOK_ORIGIN_PAGES.map((scan, idx) => {
                  const isSelected = selectedScanIdx === idx;
                  return (
                    <button
                      key={scan.id}
                      type="button"
                      onClick={() => {
                        setSelectedScanIdx(idx);
                        setZoomLevel(1);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      <span>{scan.pageLabel}</span>
                      <span className="opacity-75 font-normal">({scan.subLabel})</span>
                    </button>
                  );
                })}
              </div>

              {/* Viewer Control & Description Bar */}
              <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-slate-900 dark:text-white truncate">
                    {currentScan.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {currentScan.highlightText}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(0.6, Number((z - 0.2).toFixed(1))))}
                    className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                    title="Thu nhỏ"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-xs w-10 text-center font-bold">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(2.5, Number((z + 0.2).toFixed(1))))}
                    className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                    title="Phóng to"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="p-1 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
                    title="100%"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scanned Image Viewer Canvas */}
              <div className="flex-1 min-h-[400px] overflow-auto bg-slate-950 rounded-2xl p-4 flex items-center justify-center relative">
                <div
                  className="transition-transform duration-200 flex items-center justify-center"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <img
                    src={currentScan.image}
                    alt={currentScan.name}
                    className="max-h-[58vh] w-auto max-w-full object-contain rounded-lg shadow-2xl bg-white"
                  />
                </div>
              </div>

              {/* Bottom Quick Jump to Lesson 1 Scans */}
              <div className="pt-1 flex items-center justify-between text-xs text-slate-500 shrink-0">
                <span>{currentScan.description}</span>
                <button
                  type="button"
                  onClick={() => handleOpenLessonScans(6)}
                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Chuyển sang xem 5 trang scan Bài 1 (Trang 6 – 10)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Footer Attribution Banner */}
        <div className="p-3.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              {bilingualMode === 'en' ? (
                <>Honoring and preserving copyright: <strong>Prof. Dr. Pham The Long</strong>, <strong>Assoc. Prof. Dr. Dao Kien Quoc</strong> &amp; <strong>Vietnam Education Publishing House</strong>.</>
              ) : (
                <>Tôn vinh và bảo hộ quyền tác giả: <strong>GS.TSKH Phạm Thế Long</strong>, <strong>PGS.TS Đào Kiến Quốc</strong> &amp; <strong>NXB Giáo dục Việt Nam</strong>.</>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 font-medium">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
              {bilingualMode === 'en' ? 'Non-commercial • Dedicated to Education 2018' : 'Phi thương mại • Phục vụ Giáo dục 2018'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
