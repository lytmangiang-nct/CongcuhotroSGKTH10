import React from 'react';
import { useBook } from '../../context/BookContext';
import { Lab3DVisualizer } from './Lab3DVisualizer';
import { 
  Code2, 
  Bug, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Workflow, 
  Cpu, 
  BookOpen 
} from 'lucide-react';

export const Section31Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage } = useBook();
  const isVi = bilingualMode !== 'en';

  const roadmapItems = [
    {
      step: '01',
      page: 1,
      titleVi: 'Nhiệm vụ 1: Phân tích thừa số nguyên tố',
      titleEn: 'Task 1: Prime Factorization & Debugger',
      badgeVi: 'Trang 149 – 150',
      badgeEn: 'Pages 149 – 150',
      descVi: 'Chương trình phantichnt.py, kiểm tra n = 1, thiết lập breakpoint tại dòng 20 (m = m // k) và bảng theo dõi 4 biến n = 100.',
      descEn: 'phantichnt.py script, n = 1 edge case, breakpoint at line 20 (m = m // k), and 4-variable watch table for n = 100.',
    },
    {
      step: '02',
      page: 2,
      titleVi: 'Nhiệm vụ 2: Giải phương trình bậc hai',
      titleEn: 'Task 2: Quadratic Equation Modular Pipeline',
      badgeVi: 'Trang 150 – 152',
      badgeEn: 'Pages 150 – 152',
      descVi: 'Chương trình giaipt.py xét đầy đủ trường hợp suy biến a = 0 và biệt thức delta, kỹ thuật rút gọn rẽ nhánh if...elif...else lồng nhau.',
      descEn: 'giaipt.py handling degenerate a = 0 and discriminant delta, flattening nested if...else using clean if...elif...else.',
    },
    {
      step: '03',
      page: 3,
      titleVi: 'Luyện tập, Vận dụng & Đánh giá năng lực',
      titleEn: 'Practice, Application & Proficiency Quiz',
      badgeVi: 'Trang 152',
      badgeEn: 'Page 152',
      descVi: 'Luyện tập 1 kiểm soát số dương a > 0, Luyện tập 2 in bảng cửu chương 2 hàng, Vận dụng 1 đếm năm nhuận thế kỉ XXI, Vận dụng 2 thuật toán Euclid modulo và cấp chứng chỉ KNTT10-B31.',
      descEn: 'Practice 1 positive float loop, Practice 2 multiplication grid, Application 1 century leap years (24), Application 2 modulo GCD, and verified certificate KNTT10-B31.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-teal-950/70 via-slate-900/90 to-blue-950/70 border border-teal-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              {isVi ? 'Bài 31 • Chủ đề 5: Lập trình Python' : 'Lesson 31 • Topic 5: Python Programming'}
            </span>
            <span className="px-3 py-1 bg-slate-800/80 text-slate-300 border border-slate-700 rounded-full text-xs font-mono">
              {isVi ? 'SGK Trang 149 – 152' : 'Pages 149 – 152'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {isVi ? 'Thực hành viết chương trình đơn giản' : 'Practice: Writing Simple Python Programs'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Áp dụng toàn bộ kiến thức về cấu trúc rẽ nhánh, vòng lặp, danh sách và chương trình con để hoàn thành 2 bài toán kinh điển của toán học và tin học: Phân tích số ra thừa số nguyên tố và Giải phương trình bậc hai với đầy đủ các trường hợp suy biến.'
              : 'Synthesize conditionals, loops, lists, and subprograms to conquer two canonical computing projects: Prime Factorization and Quadratic Equation solver with complete degenerate case coverage.'}
          </p>

          {/* LEARNING OBJECTIVES SGK */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 pt-6 border-t border-slate-800/80">
            <div className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-teal-500/20">
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="text-xs md:text-sm text-slate-200">
                <span className="font-bold text-white block mb-0.5">
                  {isVi ? 'Mục tiêu 1: Lập trình ứng dụng hoàn chỉnh' : 'Objective 1: Complete Script Authoring'}
                </span>
                {isVi
                  ? 'Thực hành viết chương trình giải quyết bài toán thực tế bằng ngôn ngữ Python chuẩn.'
                  : 'Practice writing complete Python programs to solve practical algorithmic problems.'}
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-blue-500/20">
              <Bug className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs md:text-sm text-slate-200">
                <span className="font-bold text-white block mb-0.5">
                  {isVi ? 'Mục tiêu 2: Kỹ năng Debug chuyên nghiệp' : 'Objective 2: Professional Debugging'}
                </span>
                {isVi
                  ? 'Thực hành các bước gỡ rối chương trình: thiết lập điểm dừng (breakpoint) và chạy từng lệnh.'
                  : 'Master debugging workflows: setting breakpoints and stepping through statements.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D INTERACTIVE LAB VIEWPORT */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-teal-500/20 text-teal-300 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base md:text-lg font-bold text-white">
              {isVi ? 'Phòng thí nghiệm 3D mô phỏng thuật toán' : '3D Interactive Algorithm Laboratory'}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Three.js WebGL Engine</span>
        </div>
        <Lab3DVisualizer />
      </div>

      {/* LESSON ROADMAP */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Workflow className="w-5 h-5 text-teal-400" />
          <h2 className="text-lg font-bold text-white">
            {isVi ? 'Lộ trình bài thực hành 31' : 'Lesson 31 Practical Roadmap'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roadmapItems.map((item) => (
            <div
              key={item.step}
              onClick={() => setCurrentPage(item.page)}
              className="group bg-slate-950/70 border border-slate-800 hover:border-teal-500/50 p-5 rounded-xl transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg hover:shadow-teal-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black font-mono text-slate-600 group-hover:text-teal-400 transition-colors">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-900 text-teal-300 border border-slate-700">
                    {isVi ? item.badgeVi : item.badgeEn}
                  </span>
                </div>
                <h3 className="font-bold text-white group-hover:text-teal-300 text-sm transition-colors mb-2">
                  {isVi ? item.titleVi : item.titleEn}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isVi ? item.descVi : item.descEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-teal-400 group-hover:text-teal-300">
                <span>{isVi ? 'Bắt đầu học' : 'Enter Section'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
