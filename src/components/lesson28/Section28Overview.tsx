import React, { useState } from 'react';
import { Target, Cpu, Sparkles, BookOpen, Compass, CheckCircle2, ArrowRight, HelpCircle, Globe, Layers } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { Scope3DLab } from './Scope3DLab';

export const Section28Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage } = useBook();
  const isEn = bilingualMode === 'en';

  const [khoidongRevealed, setKhoidongRevealed] = useState<boolean>(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Lesson Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isEn ? 'Topic 5: Problem Solving with Python' : 'Chủ đề 5: Lập trình Python cơ bản'}</span>
              <span>•</span>
              <span>{isEn ? 'Lesson 28 (SGK pp. 136 – 140)' : 'Bài 28 (Trang 136 – 140 SGK)'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'Lesson 28: Variable Scope in Python' : 'Bài 28: Phạm Vi Của Biến'}
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              {isEn
                ? 'Understand the lifecycle, boundaries, and accessibility of variables in Python programs: distinguish local variables inside functions from global variables outside functions, and master the global keyword.'
                : 'Thấu hiểu vòng đời, ranh giới và tầm nhìn của biến trong lập trình Python: phân biệt tính địa phương của biến cục bộ trong hàm với biến toàn cục ở chương trình chính, và nắm vững cách điều khiển biến bằng từ khoá global.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 backdrop-blur-md space-y-2.5 max-w-sm shrink-0">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>{isEn ? 'Core Objectives' : 'Mục tiêu bài học'}</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isEn ? 'Identify local variables and why they vanish outside functions' : 'Nhận biết biến cục bộ và lý do biến biến mất ngoài hàm'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isEn ? 'Read global variables and mutate them using global keyword' : 'Đọc biến toàn cục và thay đổi giá trị với từ khoá global'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isEn ? 'Solve practical list filtering and date validation algorithms' : 'Giải quyết các thuật toán lọc danh sách và xác thực ngày tháng'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Khởi động SGK Trang 136 */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full w-fit border border-amber-500/20">
          <Target className="w-3.5 h-3.5" />
          <span>{isEn ? 'Warm-up Questions (SGK Page 136)' : 'Khởi Động: Hai Câu Hỏi Dẫn Nhập (Trang 136 SGK)'}</span>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {isEn
              ? 'Ponder the following two fundamental scoping questions raised in the textbook:'
              : 'Hãy suy ngẫm và trả lời hai câu hỏi gợi mở bản chất phạm vi biến trong SGK trang 136:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400">
                <Globe className="w-4 h-4" />
                <span>{isEn ? 'Question 1 (Outside-in)' : 'Câu hỏi 1 (Từ ngoài vào trong)'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'How can a variable defined in the main program (outside functions) be accessed and used inside functions?'
                  : 'Một biến được định nghĩa trong chương trình chính (bên ngoài các hàm) thì sẽ được sử dụng như thế nào bên trong các hàm?'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400">
                <Layers className="w-4 h-4" />
                <span>{isEn ? 'Question 2 (Inside-out)' : 'Câu hỏi 2 (Từ trong ra ngoài)'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Can a variable declared inside a function be accessed or used outside that function?'
                  : 'Một biến được khai báo bên trong một hàm thì có sử dụng được ở bên ngoài hàm đó hay không?'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setKhoidongRevealed(!khoidongRevealed)}
            className="px-4 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{khoidongRevealed ? (isEn ? 'Hide Scope Insights' : 'Ẩn giải đáp SGK') : (isEn ? 'Reveal Core Scope Principles' : 'Xem nguyên lý phạm vi cốt lõi SGK')}</span>
          </button>

          {khoidongRevealed && (
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 text-xs text-slate-300 animate-in fade-in">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isEn ? 'Two Cardinal Principles of Variable Scope:' : 'Hai nguyên lý bất biến về phạm vi của biến:'}</span>
              </div>
              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                <li>
                  <strong className="text-white">
                    {isEn ? 'Principle 1 (Local stays inside): ' : 'Nguyên lý 1 (Cục bộ không thoát ra ngoài): '}
                  </strong>
                  {isEn
                    ? 'All variables declared inside a function are local. They are born upon invocation and destroyed when the function terminates. The outer program CANNOT access them (doing so raises NameError).'
                    : 'Mọi biến khai báo bên trong hàm đều có tính địa phương (cục bộ). Chúng sinh ra khi hàm bắt đầu chạy và bị huỷ hoàn toàn khi hàm kết thúc. Chương trình chính bên ngoài hoàn toàn không thể gọi hay sử dụng các biến này (nếu gọi sẽ báo lỗi NameError).'}
                </li>
                <li>
                  <strong className="text-white">
                    {isEn ? 'Principle 2 (Global readable inside; mutation needs global keyword): ' : 'Nguyên lý 2 (Toàn cục có thể đọc từ trong): '}
                  </strong>
                  {isEn
                    ? 'Variables declared in the main program can be read freely inside functions. However, if a function must rebind or modify an outer variable, it MUST explicitly declare that variable with the global keyword.'
                    : 'Các biến khai báo bên ngoài hàm (chương trình chính) có thể được các hàm bên trong đọc và sử dụng giá trị. Tuy nhiên, nếu muốn hàm thay đổi giá trị của biến ngoài đó, bắt buộc phải dùng từ khoá global.'}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Embedded 3D Simulation Lab */}
      <Scope3DLab />

      {/* 4-Section Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>{isEn ? 'Lesson 28 Syllabus Roadmap' : 'Lộ Trình Nội Dung Bài 28 (Trang 136 – 140 SGK)'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setCurrentPage(1)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
              <span>{isEn ? 'Part 1' : 'Mục 1'}</span>
              <span className="text-slate-500 group-hover:text-indigo-300 transition-colors">
                {isEn ? 'Pages 136–137' : 'Trang 136–137'}
              </span>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
              {isEn ? '1. Variables Inside Functions' : '1. Biến khai báo trong hàm'}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2">
              {isEn
                ? 'Local scope, lifecycle, shadowing between local/global names, and NameError when accessed outside.'
                : 'Tính địa phương (cục bộ), vòng đời biến trong hàm, hiện tượng trùng tên và lỗi NameError khi gọi ngoài hàm.'}
            </p>
          </div>

          <div
            onClick={() => setCurrentPage(2)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
              <span>{isEn ? 'Part 2' : 'Mục 2'}</span>
              <span className="text-slate-500 group-hover:text-indigo-300 transition-colors">
                {isEn ? 'Pages 137–138' : 'Trang 137–138'}
              </span>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
              {isEn ? '2. Variables Outside Functions' : '2. Biến khai báo ngoài hàm'}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2">
              {isEn
                ? 'Reading global variables, immutability principle without keyword, and rebinding via the global keyword.'
                : 'Truy cập đọc biến toàn cục, nguyên tắc không làm thay đổi biến ngoài và cách dùng từ khoá global để gán giá trị.'}
            </p>
          </div>

          <div
            onClick={() => setCurrentPage(3)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
              <span>{isEn ? 'Part 3' : 'Mục 3'}</span>
              <span className="text-slate-500 group-hover:text-indigo-300 transition-colors">
                {isEn ? 'Pages 138–140' : 'Trang 138–140'}
              </span>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
              {isEn ? '3. Hands-on Tasks' : '3. Thực hành: 3 Nhiệm vụ'}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2">
              {isEn
                ? 'Task 1: Select(A, x), Task 2: Case switcher Tach_tu(Str, c), Task 3: 3-function modular architecture.'
                : 'NV1 lọc danh sách Select(A, x), NV2 đổi hoa/thường Tach_tu(Str, c), NV3 cấu trúc module hoá 3 hàm.'}
            </p>
          </div>

          <div
            onClick={() => setCurrentPage(4)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
              <span>{isEn ? 'Part 4' : 'Mục 4'}</span>
              <span className="text-slate-500 group-hover:text-indigo-300 transition-colors">
                {isEn ? 'Page 140' : 'Trang 140'}
              </span>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
              {isEn ? '4. Practice & Mastery' : '4. Luyện tập & Đánh giá'}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2">
              {isEn
                ? 'Extract initial characters cList, even/odd index split Tach_day(), GCD/LCM tuple, and calendar validator.'
                : 'Trích kí tự đầu cList, phân tách chẵn lẻ Tach_day(), hàm trả lại bộ đôi (ƯCLN, BCNN), kiểm tra ngày hợp lệ và cấp chứng chỉ.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
