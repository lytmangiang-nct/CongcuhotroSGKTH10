import React, { useState } from 'react';
import { Layers, Globe, Code, Database, Sparkles, Bookmark, Eye, Volume2, Calendar, CheckCircle2, Terminal } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section2InformaticsMilestones: React.FC = () => {
  const { bilingualMode, speak, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const [selectedMilestone, setSelectedMilestone] = useState<number>(0);

  const milestones = [
    {
      id: 0,
      titleVi: 'Hệ điều hành (Operating Systems)',
      titleEn: 'Operating Systems (OS)',
      year: '1964 • IBM OS/360',
      icon: Terminal,
      color: 'indigo',
      summaryVi: 'Hệ điều hành OS/360 (1964) trên dòng máy IBM/360 là hệ điều hành đầu tiên đưa ra hầu hết nguyên lí của hệ điều hành hiện đại.',
      summaryEn: 'The IBM OS/360 operating system (1964) was the first to establish virtually all modern operating system principles.',
      detailsVi: 'Hệ điều hành giúp quản lí thông tin, quản lí phần cứng, quản lí các tiến trình xử lí và cung cấp giao diện người dùng trực quan. Ngày nay, DOS và Windows là hệ điều hành cho máy PC; macOS cho dòng máy Mac; Android và iOS thống trị trên thiết bị di động; UNIX trên các máy tính lớn server.',
      detailsEn: 'Operating systems manage hardware, process scheduling, memory, file systems, and provide intuitive user interfaces. Today, Windows and macOS power PCs; Android and iOS dominate mobile devices; Linux/UNIX drives global servers.',
      tags: ['OS/360 (1964)', 'Windows & macOS', 'Android & iOS', 'UNIX / Linux']
    },
    {
      id: 1,
      titleVi: 'Mạng máy tính & Mạng Internet',
      titleEn: 'Computer Networks & The Internet',
      year: '1983 (TCP/IP) • 1992 (WWW)',
      icon: Globe,
      color: 'emerald',
      summaryVi: 'Kết nối mạng toàn cầu nhờ giao thức TCP/IP (1983) và cuộc cách mạng World Wide Web (1992).',
      summaryEn: 'Worldwide connectivity standardized through TCP/IP (1983) and popularized by the World Wide Web (1992).',
      detailsVi: 'Internet cho phép kết nối toàn cầu nhờ chuẩn hóa quy tắc truyền dữ liệu qua giao thức TCP/IP vào năm 1983. Phát minh ra World Wide Web (WWW) vào năm 1992 đã tạo ra phương tiện duyệt web dễ dàng, nhất quán, kết hợp với các công cụ tìm kiếm giúp chia sẻ tri thức và phần mềm không biên giới.',
      detailsEn: 'Standardizing network communication with the TCP/IP protocol in 1983 unified global computing. The invention of the World Wide Web (WWW) in 1992 by Tim Berners-Lee provided a universal browsing format, which alongside search engines fostered boundless global knowledge sharing.',
      tags: ['TCP/IP (1983)', 'World Wide Web WWW (1992)', 'Search Engines', 'Cloud Computing']
    },
    {
      id: 2,
      titleVi: 'Các ngôn ngữ lập trình bậc cao',
      titleEn: 'High-Level Programming Languages',
      year: '1957 • FORTRAN',
      icon: Code,
      color: 'purple',
      summaryVi: 'FORTRAN (1957) là ngôn ngữ lập trình bậc cao đầu tiên được công bố chính thức trên thế giới.',
      summaryEn: 'FORTRAN (1957) was the world\'s first widely distributed high-level programming language.',
      detailsVi: 'Thời kì đầu, phần mềm phải viết bằng ngôn ngữ máy hoặc hợp ngữ rất khó nhọc. Sự ra đời của ngôn ngữ bậc cao giúp lập trình viên chỉ cần mô tả giải thuật (thuật toán) gần gũi với ngôn ngữ tự nhiên. Trình biên dịch (compiler) sẽ tự động dịch sang mã máy. Tiếp sau FORTRAN là COBOL, C, Pascal, Python,...',
      detailsEn: 'Early software had to be painstakingly crafted in binary machine code or assembly. High-level languages freed programmers to formulate algorithms in human-readable mathematical syntax, leaving machine code translation to automated compilers. FORTRAN was followed by COBOL, C, Pascal, Python,...',
      tags: ['FORTRAN (1957)', 'C & Pascal', 'Python', 'Compiler']
    },
    {
      id: 3,
      titleVi: 'Hệ quản trị cơ sở dữ liệu (DBMS)',
      titleEn: 'Database Management Systems (DBMS)',
      year: 'Cuối 1960 • RDBMS dạng bảng',
      icon: Database,
      color: 'amber',
      summaryVi: 'Công cụ tổ chức, cập nhật và truy xuất dữ liệu độc lập với các chương trình ứng dụng.',
      summaryEn: 'Software systems organizing, storing, and retrieving structured data independently of application code.',
      detailsVi: 'Hệ quản trị CSDL đầu tiên ra đời cuối những năm 60 của thế kỉ XX, nhưng sau năm 1970 mới bùng nổ dạng bảng quan hệ (RDBMS). Người phát triển phần mềm chỉ cần tập trung vào nghiệp vụ mà không phải tự viết mã khởi tạo, lưu trữ và tìm kiếm tệp thô. Các hệ quản trị CSDL kinh điển: DB2, Microsoft SQL Server, Oracle, MySQL.',
      detailsEn: 'Early DBMS software emerged in the late 1960s, followed by the relational database (RDBMS) revolution post-1970. Developers no longer had to write low-level disk I/O routines for data management. Industry standard DBMS include DB2, Oracle, Microsoft SQL Server, MySQL, and PostgreSQL.',
      tags: ['RDBMS', 'Oracle & SQL Server', 'MySQL & PostgreSQL', 'Data Independence']
    },
    {
      id: 4,
      titleVi: 'Thành quả khoa học mũi nhọn (AI & Big Data)',
      titleEn: 'Frontier Technologies (AI & Big Data)',
      year: 'Thế kỷ XXI • Đột phá công nghệ',
      icon: Sparkles,
      color: 'rose',
      summaryVi: 'Trí tuệ nhân tạo (AI), Dữ liệu lớn (Big Data) và Học máy (Machine Learning).',
      summaryEn: 'Artificial Intelligence (AI), Big Data Analytics, and Machine Learning algorithms.',
      detailsVi: 'Các thành tựu mũi nhọn như AI, Big Data cung cấp khả năng xử lí khối lượng thông tin khổng lồ trong thời gian thực, tự động nhận dạng khuôn mặt, dịch thuật đa ngôn ngữ và điều khiển phương tiện giao thông tự hành.',
      detailsEn: 'Modern breakthrough fields like AI and Big Data process petabytes of real-time sensory data, enabling computer vision, natural language translation, speech recognition, and autonomous robotic navigation.',
      tags: ['Artificial Intelligence (AI)', 'Big Data Analytics', 'Machine Learning', 'Computer Vision']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
            {bilingualMode === 'en' ? 'Section 2b • Pages 14 – 15 Textbook' : 'Mục 2b • Trang 14 – 15 SGK'}
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {bilingualMode === 'en'
              ? 'HISTORICAL MILESTONES OF INFORMATICS'
              : 'MỘT SỐ THÀNH TỰU PHÁT TRIỂN CỦA TIN HỌC'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {bilingualMode === 'en'
              ? '5 Landmark Milestones: Operating Systems, Internet, High-Level Languages, DBMS, and AI'
              : '5 Dấu ấn công nghệ lịch sử: Hệ điều hành, Internet, Ngôn ngữ bậc cao, CSDL và AI'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(14);
              setShowOriginalModal(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>{bilingualMode === 'en' ? 'View Page 14 SGK' : 'Xem trang 14 SGK'}</span>
          </button>
          <button
            type="button"
            onClick={() => speak('Historical milestones of informatics include: OS 360 in 1964; TCP/IP in 1983; World Wide Web in 1992; FORTRAN in 1957; and relational database management systems.', 'en')}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Listen in English"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
        </div>
      </div>

      {/* Interactive Milestones Timeline */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {milestones.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMilestone === m.id;

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMilestone(m.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 opacity-90" />
                  <span className="text-[10px] font-mono font-bold opacity-75">#{m.id + 1}</span>
                </div>
                <div>
                  <div className="text-[10px] font-bold opacity-80 truncate">{m.year}</div>
                  <div className="font-extrabold text-xs leading-snug line-clamp-2 mt-0.5">
                    {bilingualMode === 'en' ? m.titleEn : m.titleVi}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Milestone Detail Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-white dark:from-slate-800 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-900 shadow-sm space-y-3 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 dark:border-slate-700 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {milestones[selectedMilestone].year}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {bilingualMode === 'en'
                  ? milestones[selectedMilestone].titleEn
                  : milestones[selectedMilestone].titleVi}
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              {bilingualMode === 'en' ? 'Pivotal Milestone' : 'Thành tựu nền tảng'}
            </span>
          </div>

          <BilingualText
            vi={milestones[selectedMilestone].summaryVi}
            en={milestones[selectedMilestone].summaryEn}
            viClassName="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed"
            enClassName="text-[11px]"
          />

          <BilingualText
            vi={milestones[selectedMilestone].detailsVi}
            en={milestones[selectedMilestone].detailsEn}
            viClassName="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
            enClassName="text-[11px]"
          />

          <div className="pt-2 flex flex-wrap gap-1.5">
            {milestones[selectedMilestone].tags.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Golden Box 2 (Trang 15 SGK) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-100/90 via-amber-50 to-orange-100/80 dark:from-amber-950/60 dark:via-slate-900 dark:to-orange-950/40 border-2 border-dashed border-amber-500 shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
            <Bookmark className="w-4 h-4" />
          </div>
          <span className="font-black text-sm uppercase tracking-wider text-amber-900 dark:text-amber-300">
            {bilingualMode === 'en' ? 'KEY TAKEAWAYS • PAGE 15 TEXTBOOK' : 'HỘP GHI NHỚ TRỌNG TÂM • TRANG 15 SGK'}
          </span>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed pl-2">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 text-base font-bold shrink-0">•</span>
            <BilingualText
              vi="Ngày nay, Tin học đã đem lại nhiều thay đổi trong mọi lĩnh vực của xã hội, từ quản lí điều hành, tự động hoá các quy trình sản xuất, giải quyết các bài toán cụ thể trong khoa học và kĩ thuật cho tới việc thay đổi cách thức làm việc của nhiều ngành nghề cũng như thói quen giao tiếp cộng đồng,..."
              en="Today, Informatics has brought about profound transformations across all societal sectors, from administrative governance and industrial automation to tackling scientific/engineering challenges, transforming occupational methods, and reshaping human communication habits,..."
            />
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 text-base font-bold shrink-0">•</span>
            <BilingualText
              vi="Sự phát triển mạnh mẽ của các hệ thống phần cứng, các thiết bị số cùng các phần mềm hệ thống, phần mềm công cụ, phần mềm ứng dụng, các hệ quản trị cơ sở dữ liệu,... và sự phát triển mang tính bùng nổ của mạng máy tính và Internet là những yếu tố quyết định để máy tính trở thành một phần không thể thiếu trong xã hội hiện đại."
              en="The rapid evolution of computer hardware and digital devices, system software, toolchains, application software, database management systems,... alongside the explosive expansion of computer networking and the Internet are the decisive factors making computing an indispensable cornerstone of modern society."
            />
          </li>
        </ul>
      </div>

      {/* Teacher Pedagogical Question Prompts & Guidance */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={2} className="mt-4" />
    </div>
  );
};
