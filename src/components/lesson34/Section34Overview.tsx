import React, { useState } from 'react';
import { Sparkles, Briefcase, Compass, Code2, BookOpen, Layers, CheckCircle2, ChevronRight, HelpCircle, ArrowRight, GitBranch, Users, Cpu } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { SoftwareDev3DLab } from './SoftwareDev3DLab';

export const Section34Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage } = useBook();
  const isVi = bilingualMode !== 'en';

  const [warmupAnswer, setWarmupAnswer] = useState<boolean | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              {isVi ? 'Chủ đề 6: Hướng nghiệp với Tin học' : 'Topic 6: Career Orientation with Informatics'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              {isVi ? 'Bài 34 • Trang 160 – 164 SGK' : 'Lesson 34 • pp. 160–164'}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              {isVi ? 'Bài Tổng Kết Sách Giáo Khoa' : 'Final Textbook Capstone'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {isVi ? 'BÀI 34: NGHỀ PHÁT TRIỂN PHẦN MỀM' : 'LESSON 34: CAREERS IN SOFTWARE DEVELOPMENT'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {isVi
              ? 'Khám phá thế giới của những người kiến tạo công nghệ số: từ vòng đời sản xuất phần mềm 7 công đoạn (SDLC) với hàng triệu dòng lệnh, mô hình ba trụ cột nhân lực (Kiến trúc sư phần mềm, Lập trình viên, Quản trị dự án) đến các cơ hội việc làm bùng nổ trong cuộc Cách mạng Công nghiệp 4.0.'
              : 'Explore the universe of digital technology creators: from the 7-stage software development lifecycle (SDLC) powering million-line codebases, the triad of software talent (Architect, Developer, Project Manager) to soaring career horizons in Industry 4.0.'}
          </p>
        </div>
      </div>

      {/* Learning Objectives Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-blue-400" />
          <span>{isVi ? 'Sau bài học này, em sẽ (SGK Trang 160):' : 'Learning Objectives (Textbook page 160):'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-blue-500/20 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-bold text-sm text-blue-300 mb-1">
                {isVi ? 'Khái niệm & Kĩ năng nghề nghiệp' : 'Concepts & Core Skill Sets'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isVi
                  ? 'Hiểu được khái niệm nghề phát triển phần mềm, 7 công đoạn sản xuất, và các kiến thức, kĩ năng cần có của người làm nghề.'
                  : 'Grasp the definition of software development, the 7-stage SDLC, and the essential competencies required for engineers.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/20 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-bold text-sm text-emerald-300 mb-1">
                {isVi ? 'Ngành học ĐH/CĐ & Cơ hội việc làm 4.0' : 'Academic Pathways & Career Opportunities'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isVi
                  ? 'Biết các ngành học ở bậc đại học, cao đẳng liên quan đến phát triển phần mềm và các cơ hội nghề nghiệp đa dạng trong kỉ nguyên số.'
                  : 'Identify university disciplines in software engineering/computer science and burgeoning tech career pathways in Industry 4.0.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Activity: SGK Trang 160 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 font-bold">
              {isVi ? 'Hoạt động Khởi động • SGK Trang 160' : 'Warm-up Thinking • Page 160'}
            </span>
            <h3 className="font-bold text-white text-base">
              {isVi ? 'Phát triển phần mềm có phải chỉ là việc viết code?' : 'Is Software Development Merely Writing Code?'}
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-950/50 p-4 rounded-xl border border-slate-800">
          {isVi
            ? '"Theo em, phát triển phần mềm có phải chỉ là việc viết các đoạn mã lệnh bằng một ngôn ngữ lập trình nào đó để máy tính có thể hiểu và giải quyết một bài toán trong thực tế?"'
            : '"In your opinion, is software development strictly writing code in a programming language so that a computer can understand and solve real-world problems?"'}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setWarmupAnswer(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              warmupAnswer === true
                ? 'bg-rose-950 border border-rose-500 text-rose-200'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isVi ? 'A. Đúng, chỉ cần lập trình gõ code' : 'A. Yes, purely coding'}
          </button>
          <button
            type="button"
            onClick={() => setWarmupAnswer(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              warmupAnswer === false
                ? 'bg-emerald-950 border border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isVi ? 'B. Không đúng! Lập trình chỉ là một phần trong quy trình' : 'B. Incorrect! Coding is only one phase'}
          </button>
        </div>

        {warmupAnswer !== null && (
          <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/30 text-xs sm:text-sm text-slate-200 space-y-2 animate-in fade-in">
            <p className="font-bold text-emerald-400">
              {warmupAnswer === false ? (isVi ? '🎉 Nhận định hoàn toàn chính xác!' : '🎉 Exactly correct!') : (isVi ? '💡 Chưa chính xác rồi!' : '💡 Not quite!')}
            </p>
            <p className="text-slate-300 leading-relaxed">
              {isVi
                ? 'Lập trình (viết mã lệnh) chỉ là 1 trong 7 công đoạn của quy trình sản xuất phần mềm! Để một phần mềm thực sự vận hành phục vụ hàng vạn người dùng, ta cần điều tra yêu cầu nghiệp vụ của khách hàng, phân tích hệ thống, thiết kế kiến trúc và CSDL, kiểm thử loại bỏ lỗi, cài đặt chuyển giao và duy trì bảo trì cập nhật liên tục.'
                : 'Programming is merely 1 of 7 essential phases! Real-world software serving thousands requires client requirements gathering, architectural modeling, database design, QA testing, deployment, and lifelong maintenance.'}
            </p>
          </div>
        )}
      </div>

      {/* Embedded 3D Laboratory Studio */}
      <SoftwareDev3DLab />

      {/* 3-Section Lesson Roadmap Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <h3 className="font-bold text-white text-base mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>{isVi ? 'Lộ trình khám phá Bài 34:' : 'Lesson 34 Modular Roadmap:'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-400">
                {isVi ? 'MỤC 1 • TRANG 160–161' : 'SECTION 1 • PP. 160–161'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1 group-hover:text-blue-300">
              {isVi ? '1. Phát triển phần mềm là gì?' : '1. What is Software Development?'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Quy trình sản xuất phần mềm hàng triệu dòng lệnh, 7 công đoạn (SDLC) và hoạt động Quản trị dự án bao trùm.'
                : 'Million-line software production, 7-stage SDLC cycle, and overarching project management governance.'}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-purple-400">
                {isVi ? 'MỤC 2 • TRANG 161–163' : 'SECTION 2 • PP. 161–163'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1 group-hover:text-purple-300">
              {isVi ? '2. Kiến thức, kĩ năng cần có' : '2. Required Knowledge & Skill Sets'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? 'Phân biệt Kĩ sư phần mềm (Kiến trúc sư) vs Lập trình viên (Thợ xây) vs Quản trị dự án, bài tập ghép nối tố chất.'
                : 'Architect vs Builder paradigm, core qualifications (math, algorithms, domain rules), and aptitude matching.'}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/50 text-left transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-emerald-400">
                {isVi ? 'MỤC 3 • TRANG 163–164' : 'SECTION 3 • PP. 163–164'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="font-bold text-sm text-white mb-1 group-hover:text-emerald-300">
              {isVi ? '3. Công việc, Luyện tập & Vận dụng' : '3. Careers, Practice, Apply & Certificate'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isVi
                ? '6 lĩnh vực nghề nghiệp 4.0, đại học CNTT, cổng tìm việc (TopDev, Vietnamworks, LinkedIn), 10 câu trắc nghiệm & chứng nhận KNTT10-B34.'
                : '6 career branches in 4.0, university portals, TopDev/LinkedIn job search, 10 quiz questions & certificate.'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
