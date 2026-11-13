import React, { useState } from 'react';
import { Sparkles, Briefcase, Compass, Palette, BookOpen, Layers, CheckCircle2, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { GraphicDesign3DStudio } from './GraphicDesign3DStudio';

export const Section33Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage } = useBook();
  const isVi = bilingualMode !== 'en';

  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const jobsFig331 = [
    {
      id: 0,
      titleVi: 'Thợ may (Tailor / Fashion Artisan)',
      titleEn: 'Tailor / Fashion Artisan',
      descVi: 'Sử dụng đồ hoạ trong thiết kế mẫu rập trang phục, hoa văn in trên vải, và phác thảo thời trang kỹ thuật số.',
      descEn: 'Applies graphic design for pattern drafting, digital fabric prints, and fashion sketching.',
      directVi: 'Gián tiếp / Bổ trợ mạnh mẽ trong thời trang hiện đại.',
      directEn: 'Indirect / Strongly supportive in modern digital fashion.',
      isDirect: false,
      tagVi: 'Thời trang & Mẫu vải',
      tagEn: 'Fashion & Textile'
    },
    {
      id: 1,
      titleVi: 'Phát thanh viên (News Broadcaster)',
      titleEn: 'News Broadcaster',
      descVi: 'Chủ yếu sử dụng giọng nói, ngôn ngữ cơ thể và kỹ năng dẫn dắt truyền hình; đồ hoạ trường quay do đội ngũ đồ hoạ đảm nhiệm.',
      descEn: 'Relies on voice delivery, body language, and anchoring; studio graphics are produced by dedicated graphic artists.',
      directVi: 'Không liên quan trực tiếp đến thao tác thiết kế đồ hoạ.',
      directEn: 'Not directly involved in creating graphic assets.',
      isDirect: false,
      tagVi: 'Phát thanh & Dẫn chương trình',
      tagEn: 'Broadcasting & Anchoring'
    },
    {
      id: 2,
      titleVi: 'Kiến trúc sư (Architect - Hình 33.1)',
      titleEn: 'Architect (Fig 33.1)',
      descVi: 'Sử dụng phần mềm đồ hoạ 2D/3D (AutoCAD, SketchUp, 3ds Max) để vẽ mặt bằng, phối cảnh không gian, phối màu và trình bày hồ sơ thiết kế công trình.',
      descEn: 'Directly utilizes 2D/3D graphic suites (AutoCAD, SketchUp) for spatial layout, architectural rendering, color schemes, and blueprints.',
      directVi: 'LIÊN QUAN TRỰC TIẾP & MẬT THIẾT NHẤT! (SGK Trang 156-157)',
      directEn: 'MOST DIRECT & ESSENTIAL CONNECTION! (Textbook p. 156-157)',
      isDirect: true,
      tagVi: 'Liên quan trực tiếp',
      tagEn: 'Direct Connection'
    },
    {
      id: 3,
      titleVi: 'Thư kí (Administrative Secretary)',
      titleEn: 'Administrative Secretary',
      descVi: 'Chủ yếu xử lý văn bản, lịch trình, công văn hành chính; có thể dùng đồ hoạ cơ bản để trang trí slide thuyết trình.',
      descEn: 'Primarily handles documents, scheduling, and correspondence; may occasionally format presentation slides.',
      directVi: 'Ứng dụng đồ hoạ ở mức độ cơ bản trong văn phòng.',
      directEn: 'Basic office-level document presentation formatting.',
      isDirect: false,
      tagVi: 'Hành chính văn phòng',
      tagEn: 'Office Administration'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-rose-950 via-slate-900 to-indigo-950 border border-rose-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              {isVi ? 'Chủ đề 6: Hướng nghiệp với Tin học' : 'Topic 6: Career Orientation with Informatics'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              {isVi ? 'Bài 33 • Trang 156 – 159 SGK' : 'Lesson 33 • pp. 156–159'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {isVi ? 'BÀI 33: NGHỀ THIẾT KẾ ĐỒ HOẠ MÁY TÍNH' : 'LESSON 33: CAREERS IN COMPUTER GRAPHIC DESIGN'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {isVi
              ? 'Khám phá thế giới sáng tạo thị giác của nghề thiết kế đồ hoạ trong kỷ nguyên số: từ khái niệm, thành phần cấu tạo hình ảnh, lợi ích thương hiệu, bộ kĩ năng và công cụ chuyên dụng đến lộ trình học tập đại học và các cơ hội nghề nghiệp rộng mở.'
              : 'Explore the creative visual universe of computer graphic design in the digital age: core concepts, image composition, branding benefits, professional software suites, educational pathways, and versatile modern employment horizons.'}
          </p>
        </div>
      </div>

      {/* Learning Objectives Box */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-rose-400" />
          <span>{isVi ? 'Sau bài học này, em sẽ (SGK Trang 156):' : 'Learning Objectives (Textbook page 156):'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-rose-500/20 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-bold text-sm text-rose-300 mb-1">
                {isVi ? 'Khái niệm & Kĩ năng nghề' : 'Concepts & Skills'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isVi
                  ? 'Biết được khái niệm thiết kế đồ hoạ, các thành phần hình ảnh, kiến thức và kĩ năng cần có của người thiết kế.'
                  : 'Grasp the definition of graphic design, composition components, and essential technical/artistic skill sets.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-blue-500/20 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-bold text-sm text-blue-300 mb-1">
                {isVi ? 'Ngành học & Nhân lực' : 'Academia & Workforce'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isVi
                  ? 'Biết các ngành học, các trường đào tạo và nhu cầu nhân lực rất cao liên quan đến nghề thiết kế đồ hoạ.'
                  : 'Identify educational disciplines, training institutions, and soaring labor demand in graphic design.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/20 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-bold text-sm text-emerald-300 mb-1">
                {isVi ? 'Tìm kiếm thông tin số' : 'Digital Career Exploration'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isVi
                  ? 'Tự tìm kiếm và khai thác được thông tin hướng nghiệp, giao lưu và chia sẻ với bạn bè qua các kênh truyền thông số.'
                  : 'Independently discover career opportunities, connect, and collaborate via digital networking channels.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Activity: Figure 33.1 SGK Trang 156 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                {isVi ? 'Hoạt động Khởi động • SGK Trang 156' : 'Warm-up Activity • Page 156'}
              </span>
              <h3 className="font-bold text-white text-base">
                {isVi ? 'Khám phá Hình 33.1: Công việc nào liên quan trực tiếp đến thiết kế đồ hoạ?' : 'Explore Figure 33.1: Which Job Directly Involves Graphic Design?'}
              </h3>
            </div>
          </div>
          <span className="text-xs text-slate-400">
            {isVi ? 'Nhấp vào từng nghề để đối chiếu SGK' : 'Click each job to inspect textbook analysis'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          {isVi
            ? 'Quan sát 4 nghề nghiệp được minh họa trong Hình 33.1 SGK (Thợ may, Phát thanh viên, Kiến trúc sư, Thư kí) và bấm chọn để khám phá mức độ gắn kết với công cụ đồ hoạ máy tính:'
            : 'Inspect the 4 careers illustrated in Figure 33.1 (Tailor, Broadcaster, Architect, Secretary) to assess their relationship with computer graphics:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {jobsFig331.map((job) => {
            const isSelected = selectedJob === job.id;
            return (
              <button
                key={job.id}
                type="button"
                onClick={() => setSelectedJob(job.id)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? job.isDirect
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-lg text-white ring-2 ring-emerald-500/30'
                      : 'bg-slate-800 border-amber-500 shadow-md text-white'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      job.isDirect
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isVi ? job.tagVi : job.tagEn}
                    </span>
                    {job.isDirect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                  <h4 className="font-bold text-sm mb-1">{isVi ? job.titleVi : job.titleEn}</h4>
                  <p className="text-xs text-slate-300 line-clamp-3 mb-2">{isVi ? job.descVi : job.descEn}</p>
                </div>

                <div className={`text-[11px] font-medium pt-2 border-t ${
                  job.isDirect ? 'border-emerald-500/30 text-emerald-300 font-bold' : 'border-slate-800 text-slate-400'
                }`}>
                  {isVi ? job.directVi : job.directEn}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded 3D Laboratory Studio */}
      <GraphicDesign3DStudio />

      {/* 3-Section Lesson Roadmap Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>{isVi ? 'Lộ trình khám phá Bài 33:' : 'Lesson 33 Modular Roadmap:'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-rose-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-rose-400">
                {isVi ? 'MỤC 1 • TRANG 156–157' : 'SECTION 1 • PP. 156–157'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1 group-hover:text-rose-300">
              {isVi ? '1. Khái niệm & Lợi ích Thiết kế Đồ hoạ' : '1. Concepts & Benefits of Graphic Design'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Định nghĩa SGK, các thành phần hình ảnh (văn bản, đường nét, màu sắc), 3 lợi ích cốt lõi và áp phích du lịch Hình 33.2.'
                : 'Core definition, visual components (text, lines, colors), 3 fundamental benefits, and Tourism Poster Fig 33.2.'}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-400">
                {isVi ? 'MỤC 2 • TRANG 157–158' : 'SECTION 2 • PP. 157–158'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1 group-hover:text-blue-300">
              {isVi ? '2. Kiến thức & Kĩ năng cần có' : '2. Required Knowledge & Skill Sets'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Phần mềm chuyên dụng (Photoshop, CorelDraw, AutoCAD, InDesign), kiến thức in ấn, liên môn và bài test radar tố chất đồ hoạ.'
                : 'Specialized suites (Photoshop, AutoCAD, InDesign), printing prepress, interdisciplinary breadth, and aptitude radar test.'}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                {isVi ? 'MỤC 3 • TRANG 158–159' : 'SECTION 3 • PP. 158–159'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1 group-hover:text-emerald-300">
              {isVi ? '3. Học tập, Việc làm, Luyện tập & Vận dụng' : '3. Academia, Employment, Practice & Apply'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Cơ sở đào tạo ĐH/CĐ, tìm việc làm số (LinkedIn, Vietnamworks), giải bài tập Luyện tập/Vận dụng, trắc nghiệm và cấp chứng chỉ.'
                : 'University training, digital job hunting (LinkedIn, Vietnamworks), Practice/Application answers, quiz, and certificate.'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
