import React, { useState } from 'react';
import {
  Layers,
  Network,
  Code2,
  Database,
  Brain,
  Bookmark,
  HelpCircle,
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Eye
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

interface MilestoneItem {
  id: string;
  year: string;
  titleVi: string;
  category: string;
  descVi: string;
  impactVi: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: 'fortran',
    year: '1957',
    titleVi: 'Ngôn ngữ FORTRAN ra đời',
    category: 'Ngôn ngữ lập trình',
    descVi: 'FORTRAN là ngôn ngữ lập trình bậc cao đầu tiên được công bố chính thức, cho phép lập trình viên thể hiện thuật toán toán học mà không cần biết lệnh mã máy.',
    impactVi: 'Mở đường cho các ngôn ngữ hiện đại như C, Pascal, Python.'
  },
  {
    id: 'os360',
    year: '1964',
    titleVi: 'Hệ điều hành OS/360 (IBM/360)',
    category: 'Hệ điều hành',
    descVi: 'Đưa ra hầu hết các nguyên lý quản lí thông tin, phần cứng và tiến trình của hệ điều hành hiện đại, đặt nền móng cho Windows, macOS, Linux, Android sau này.',
    impactVi: 'Chuẩn hóa cấu trúc điều hành máy tính toàn thế giới.'
  },
  {
    id: 'dbms',
    year: '1970',
    titleVi: 'Hệ quản trị CSDL quan hệ (RDBMS)',
    category: 'Cơ sở dữ liệu',
    descVi: 'Mô hình dữ liệu dạng bảng quan hệ ra đời, cho phép lưu trữ và truy vấn khối lượng dữ liệu khổng lồ với các hệ quản trị như DB2, Oracle, SQL Server, MySQL.',
    impactVi: 'Nền tảng của ngân hàng, thương mại điện tử và chính phủ số.'
  },
  {
    id: 'tcpip',
    year: '1983',
    titleVi: 'Giao thức TCP/IP chuẩn hóa',
    category: 'Mạng & Internet',
    descVi: 'Thiết lập bộ quy tắc chuẩn trao đổi dữ liệu toàn cầu, kết nối các mạng máy tính phân tán thành mạng Internet duy nhất trên toàn thế giới.',
    impactVi: 'Khai sinh mạng Internet toàn cầu ngày nay.'
  },
  {
    id: 'www',
    year: '1992',
    titleVi: 'Phát minh World Wide Web (WWW)',
    category: 'World Wide Web',
    descVi: 'Tạo ra phương tiện truy cập tài nguyên siêu văn bản dễ dàng, nhất quán thông qua trình duyệt web, đưa Internet đến với mọi người dân.',
    impactVi: 'Bùng nổ kỷ nguyên thông tin và kinh tế số.'
  }
];

export const Lesson2Section2Achievements: React.FC = () => {
  const { setCurrentPage, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const [selectedMilestone, setSelectedMilestone] = useState<string>('os360');

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-black text-xs uppercase tracking-wider">
            Mục 2.b • Trang 14 – 15 SGK
          </span>
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(14);
              setShowOriginalModal(true);
            }}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem trang 14 gốc</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          b) Một Số Thành Tựu Phát Triển Của Chính Ngành Tin Học
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Hệ điều hành, Mạng &amp; Internet, Ngôn ngữ lập trình bậc cao và Hệ quản trị cơ sở dữ liệu
        </p>
      </div>

      {/* 4 Pillars of Computing Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hệ điều hành */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
            <h4 className="font-extrabold text-sm uppercase">1. Hệ Điều Hành (Operating Systems)</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>OS/360 (1964)</strong> trên IBM/360 đặt nền tảng nguyên lý hiện đại: quản lí thông tin, phần cứng và tiến trình. Ngày nay: DOS &amp; Windows cho PC; macOS cho Mac; Android &amp; iOS cho di động; UNIX cho máy tính lớn.
          </p>
        </div>

        {/* Mạng & Internet */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Network className="w-5 h-5" />
            <h4 className="font-extrabold text-sm uppercase">2. Mạng &amp; Internet (TCP/IP &amp; WWW)</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Giao thức <strong>TCP/IP (1983)</strong> cho phép liên kết toàn cầu. Phát minh <strong>World Wide Web (WWW 1992)</strong> giúp truy cập tài nguyên siêu liên kết dễ dàng và thúc đẩy phổ cập Internet tới mọi người dân.
          </p>
        </div>

        {/* Ngôn ngữ bậc cao */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <Code2 className="w-5 h-5" />
            <h4 className="font-extrabold text-sm uppercase">3. Ngôn Ngữ Lập Trình Bậc Cao</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Thay thế mã máy nhị phân phức tạp. <strong>FORTRAN (1957)</strong> là ngôn ngữ bậc cao đầu tiên, mở đường cho Cobol, C, Pascal, Python,... Giúp thể hiện thuật toán một cách trực quan, nâng cao hiệu suất sáng tạo phần mềm.
          </p>
        </div>

        {/* Hệ quản trị CSDL */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Database className="w-5 h-5" />
            <h4 className="font-extrabold text-sm uppercase">4. Hệ Quản Trị Cơ Sở Dữ Liệu (DBMS)</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Ra đời cuối những năm 60, từ 1970 hoàn thiện dạng bảng liên kết: DB2, MS SQL Server, Oracle, MySQL,... Giúp lưu trữ, cập nhật, truy xuất dữ liệu khổng lồ nhanh chóng và bảo mật.
          </p>
        </div>
      </div>

      {/* Interactive Milestone Timeline */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
            Trục Thời Gian Các Mốc Son Lịch Sử Ngành Tin Học
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {MILESTONES.map((m) => {
            const isSelected = selectedMilestone === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMilestone(m.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/90 dark:bg-indigo-950/60 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-white'
                }`}
              >
                <div className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {m.year}
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                  {m.titleVi}
                </div>
              </button>
            );
          })}
        </div>

        {/* Milestone Detail Card */}
        {(() => {
          const active = MILESTONES.find((m) => m.id === selectedMilestone) || MILESTONES[1];
          return (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-indigo-600 text-white px-2 py-0.5 rounded">
                  {active.year}
                </span>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  {active.category}
                </span>
              </div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                {active.titleVi}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {active.descVi}
              </p>
              <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
                ✓ Tác động: {active.impactVi}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Hộp Ghi Nhớ SGK Trang 15 (Đóng khung chuẩn) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/80 dark:bg-amber-950/40 border-2 border-dashed border-amber-500/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-xs uppercase tracking-widest">
          <Bookmark className="w-4 h-4 text-amber-600" />
          <BilingualText
            vi="HỘP GHI NHỚ TRỌNG TÂM (TRANG 15 SGK)"
            en="CORE SUMMARY BOX (TEXTBOOK PAGE 15)"
          />
        </div>

        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed pl-1">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Ngày nay, Tin học đã đem lại nhiều thay đổi trong mọi lĩnh vực của xã hội, từ quản lí điều hành, tự động hoá quy trình sản xuất, giải quyết các bài toán cụ thể trong khoa học và kĩ thuật cho tới việc thay đổi cách thức làm việc và thói quen giao tiếp cộng đồng."
                en="Today, Informatics has brought transformative changes across all sectors of society, from management and administration, industrial automation, and solving complex problems in science and engineering, to reshaping modern work styles and social communication habits."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Sự phát triển mạnh mẽ của hệ thống phần cứng, thiết bị số cùng phần mềm hệ thống, phần mềm công cụ, phần mềm ứng dụng, hệ quản trị cơ sở dữ liệu và mạng máy tính, Internet là những yếu tố quyết định để máy tính trở thành một phần không thể thiếu trong xã hội hiện đại."
                en="The vigorous evolution of hardware systems, digital devices, system software, application software, database management systems, and computer networks/Internet are decisive factors making computers indispensable in modern society."
              />
            </div>
          </li>
        </ul>
      </div>

      {/* Câu hỏi củng cố cuối mục 2 */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
            <BilingualText
              vi="Câu Hỏi Củng Cố Mục 2 (Trang 15 SGK)"
              en="Checkpoint Questions for Section 2 (Page 15)"
            />
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong>1. Tin học đã giúp gì cho em trong học tập?</strong>
            <p className="text-[11px] text-slate-500 mt-1">
              Gợi ý: Tìm kiếm tài liệu nhanh chóng, học trực tuyến qua Zoom/Teams, làm bài thuyết trình PowerPoint, tương tác sách giáo khoa thông minh.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <strong>2. Em hãy cho ví dụ về một số ứng dụng trực tuyến?</strong>
            <p className="text-[11px] text-slate-500 mt-1">
              Gợi ý: Google Classroom (học tập), MoMo/VNPay (thanh toán điện tử), VNeID (định danh công dân), Shopee (mua sắm), Grab (đặt xe).
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400">Trang 14 – 15 SGK Tin học 10</span>
          <button
            type="button"
            onClick={() => setCurrentPage(5)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>Sang Luyện Tập &amp; Vận Dụng</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
