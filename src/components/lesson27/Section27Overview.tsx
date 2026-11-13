import React, { useState } from 'react';
import { Target, Cpu, Sparkles, BookOpen, Compass, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { Parameter3DLab } from './Parameter3DLab';

export const Section27Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage } = useBook();
  const isEn = bilingualMode === 'en';

  const [khoidongRevealed, setKhoidongRevealed] = useState<boolean>(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Lesson Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-purple-950 via-slate-900 to-slate-950 border border-purple-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isEn ? 'Topic 5: Problem Solving with Python' : 'Chủ đề 5: Lập trình Python cơ bản'}</span>
              <span>•</span>
              <span>{isEn ? 'Lesson 27 (SGK pp. 131 – 135)' : 'Bài 27 (Trang 131 – 135 SGK)'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'Lesson 27: Function Parameters & Arguments' : 'Bài 27: Tham Số Của Hàm'}
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed">
              {isEn
                ? 'Master the distinction between formal parameters and runtime arguments, learn argument transmission mechanics, explore modular program architecture with subroutines, and solve textbook algorithmic tasks.'
                : 'Thấu hiểu bản chất phân biệt giữa tham số (parameters) và đối số (arguments), nắm vững cơ chế truyền giá trị vào hàm, tư duy chia để trị với chương trình con và thực hành giải các bài toán thực tế chuẩn SGK.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 backdrop-blur-md space-y-2.5 max-w-sm shrink-0">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>{isEn ? 'Core Competencies' : 'Năng lực cốt lõi'}</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isEn ? 'Define formal parameters & pass actual arguments' : 'Thiết lập tham số và truyền giá trị thông qua đối số'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isEn ? 'Enforce argument count matching (TypeError vs NameError)' : 'Quy tắc số lượng đối số và kiểm soát lỗi'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isEn ? 'Write modular programs using reusable subroutines' : 'Xây dựng chương trình module hoá với chương trình con'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Khởi động SGK Trang 131 */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full w-fit border border-amber-500/20">
          <Target className="w-3.5 h-3.5" />
          <span>{isEn ? 'Warm-up Activity (SGK Page 131)' : 'Khởi Động: Tham Số Hay Đối Số? (Trang 131 SGK)'}</span>
        </div>

        <div className="space-y-3">
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {isEn
              ? 'Observe the following two code snippets and explain the difference between parameters (tham số) and arguments (đối số):'
              : 'Quan sát các câu lệnh sau và cho biết sự khác nhau giữa tham số (parameter) và đối số (argument):'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-purple-400 font-bold">{isEn ? '1. Function Definition' : '1. Định nghĩa hàm'}</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {isEn ? 'PARAMETERS' : 'THAM SỐ'}
                </span>
              </div>
              <pre className="text-xs font-mono text-purple-300 leading-relaxed">
{`>>> def f_sum(a, b, c):
        return a + b + c`}
              </pre>
              <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <span className="text-emerald-300 font-bold">a, b, c</span> {isEn ? 'are formal parameters (variables declared in def)' : 'là các tham số được khai báo trong ngoặc của def.'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-blue-400 font-bold">{isEn ? '2. Function Invocation' : '2. Lời gọi hàm'}</span>
                <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {isEn ? 'ARGUMENTS' : 'ĐỐI SỐ'}
                </span>
              </div>
              <pre className="text-xs font-mono text-cyan-300 leading-relaxed">
{`>>> x, y = 5, 3
>>> f_sum(10, x, y)
18`}
              </pre>
              <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
                <span className="text-cyan-300 font-bold">10, x, y</span> {isEn ? 'are runtime arguments (actual values passed into the call)' : 'là các đối số (giá trị thực sự truyền vào khi gọi hàm).'}
              </div>
            </div>
          </div>

          <button
            onClick={() => setKhoidongRevealed(!khoidongRevealed)}
            className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>{khoidongRevealed ? (isEn ? 'Hide Comparison Analysis' : 'Ẩn phân tích đối chiếu SGK') : (isEn ? 'View SGK Comparative Analysis' : 'Xem phân tích đối chiếu chuẩn SGK')}</span>
          </button>

          {khoidongRevealed && (
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2 text-xs text-slate-300 animate-in fade-in">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{isEn ? 'Official Distinction (SGK Page 131 – 132):' : 'Bản chất phân biệt chuẩn SGK (Trang 131 – 132):'}</span>
              </div>
              <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                <li>
                  <strong className="text-white">{isEn ? 'Parameter:' : 'Tham số (Parameter):'}</strong>{' '}
                  {isEn
                    ? 'Declared in the function definition (def), functioning as variable placeholders within the body. They possess no concrete values until the function is invoked.'
                    : 'Được khai báo khi định nghĩa hàm (def), đóng vai trò như các biến đại diện bên trong thân hàm. Chúng chưa có giá trị cụ thể cho đến khi hàm được gọi.'}
                </li>
                <li>
                  <strong className="text-white">{isEn ? 'Argument:' : 'Đối số (Argument):'}</strong>{' '}
                  {isEn
                    ? 'Actual concrete values (like 10), pre-assigned variables (like x, y), or expressions passed when executing the function call.'
                    : 'Là các giá trị cụ thể (như 10), biến đã có giá trị (như x, y), hoặc biểu thức được truyền vào khi gọi hàm.'}
                </li>
                <li>
                  <strong className="text-emerald-300">{isEn ? 'Mapping mechanism:' : 'Cơ chế ánh xạ:'}</strong>{' '}
                  {isEn
                    ? 'When calling f_sum(10, x, y), Python sequentially binds positional values: a = 10, b = x = 5, c = y = 3, yielding 10 + 5 + 3 = 18.'
                    : 'Khi gọi f_sum(10, x, y), Python lần lượt gán theo vị trí: a = 10, b = x = 5, c = y = 3, sau đó tính 10 + 5 + 3 = 18.'}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Embedded 3D Simulation Lab */}
      <Parameter3DLab />

      {/* 4-Section Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-400">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>{isEn ? 'Lesson 27 Syllabus Roadmap (SGK pp. 131 – 135)' : 'Lộ Trình Nội Dung Bài 27 (Trang 131 – 135 SGK)'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setCurrentPage(1)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-purple-400">
              <span>{isEn ? 'Section 1' : 'Mục 1'}</span>
              <span className="text-slate-500 group-hover:text-purple-300 transition-colors">{isEn ? 'Pages 131–132' : 'Trang 131–132'}</span>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
              {isEn ? '1. Parameters and Arguments' : '1. Tham số và đối số của hàm'}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2">
              {isEn
                ? 'Activity 1, value-passing mechanics, argument count rules, and TypeError vs NameError distinctions.'
                : 'Hoạt động 1, phân tích cách truyền dữ liệu, quy tắc số lượng đối số và lỗi NameError / TypeError.'}
            </p>
          </div>

          <div
            onClick={() => setCurrentPage(2)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-purple-400">
              <span>{isEn ? 'Section 2' : 'Mục 2'}</span>
              <span className="text-slate-500 group-hover:text-purple-300 transition-colors">{isEn ? 'Pages 132–133' : 'Trang 132–133'}</span>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
              {isEn ? '2. Using Subroutines' : '2. Cách sử dụng chương trình con'}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2">
              {isEn
                ? 'Activity 2, prime filtering, function tongduong(A), and 3 core advantages of modular design.'
                : 'Hoạt động 2, bài toán kiểm tra số nguyên tố, hàm tongduong(A) và 3 ưu điểm cấu trúc chương trình con.'}
            </p>
          </div>

          <div
            onClick={() => setCurrentPage(3)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-purple-400">
              <span>{isEn ? 'Section 3' : 'Mục 3'}</span>
              <span className="text-slate-500 group-hover:text-purple-300 transition-colors">{isEn ? 'Pages 134–135' : 'Trang 134–135'}</span>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
              {isEn ? '3. Practical Lab: 3 Tasks' : '3. Thực hành: 3 Nhiệm vụ hàm'}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2">
              {isEn
                ? 'Task 1 f_sum(A, b), Task 2 f_dem(msg, sep), and Task 3 merge_str(s1, s2).'
                : 'NV1 hàm f_sum(A, b), NV2 hàm f_dem(msg, sep) đếm từ, NV3 hàm merge_str(s1, s2) đan xen xâu.'}
            </p>
          </div>

          <div
            onClick={() => setCurrentPage(4)}
            className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/80 transition-all cursor-pointer group space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-purple-400">
              <span>{isEn ? 'Section 4' : 'Mục 4'}</span>
              <span className="text-slate-500 group-hover:text-purple-300 transition-colors">{isEn ? 'Page 135' : 'Trang 135'}</span>
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
              {isEn ? '4. Practice & Mastery' : '4. Luyện tập & Đánh giá'}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2">
              {isEn
                ? 'Function power(a, b, c), GCD with Euclid, change(ho_ten, c) case transform, and official navbar Quiz.'
                : 'Hàm power(a, b, c), tìm ƯCLN với hàm, hàm change(ho_ten, c) hoa/thường, trắc nghiệm 10 câu trên thanh điều hướng.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
