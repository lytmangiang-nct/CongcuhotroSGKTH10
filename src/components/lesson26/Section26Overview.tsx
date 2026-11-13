import React, { useState } from 'react';
import { Target, Cpu, Sparkles, BookOpen, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { Function3DLab } from './Function3DLab';

export const Section26Overview: React.FC = () => {
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
              <span>{isEn ? 'Lesson 26 (SGK pp. 127 – 130)' : 'Bài 26 (Trang 127 – 130 SGK)'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'Lesson 26: Functions in Python' : 'Bài 26: Hàm Trong Python'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isEn
                ? 'Understand subroutines as modular functions, master built-in library functions, and create custom functions using the def and return keywords.'
                : 'Hiểu bản chất chương trình con là hàm, khám phá hệ thống hàm thiết kế sẵn phong phú của Python và tự xây dựng các hàm riêng với từ khóa def và return.'}
            </p>
          </div>

          {/* Quick Objective Card */}
          <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-4 sm:p-5 shadow-xl shrink-0 md:max-w-xs space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Target className="w-4 h-4" />
              <span>{isEn ? 'Learning Objectives' : 'Mục tiêu bài học (Tr. 127)'}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? 'Understand that subroutines in Python are functions.'
                    : 'Biết được chương trình con là hàm.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? 'Master how to create and invoke custom functions.'
                    : 'Biết cách tạo và gọi thực thi hàm tự định nghĩa.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? 'Distinguish functions with return values from void functions.'
                    : 'Phân biệt hàm có giá trị trả lại và hàm không trả lại giá trị.'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Khởi động (Warm-up Activity) - Official SGK Trang 127 */}
      <div className="rounded-2xl border border-amber-500/40 bg-linear-to-br from-amber-950/20 via-slate-900 to-slate-900 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{isEn ? 'Warm-up: Why do we need subroutines & functions?' : 'Khởi động: Vì sao cần chương trình con trong lập trình?'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                {isEn ? 'SGK Page 127' : 'Trang 127 SGK'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isEn
                ? 'Complex programs have recurring code blocks. Packaging them into subroutines prevents rewriting code.'
                : 'Các chương trình giải bài toán thực tế thường có những khối lệnh lặp đi lặp lại nhiều lần. Gom chúng thành chương trình con giúp tiết kiệm công sức và cấu trúc code sáng sủa.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3 text-sm">
          <div className="text-slate-300 leading-relaxed">
            {isEn ? (
              <>
                "Can you name some functions among the commands you have learned so far in Python? What do those functions have in common in syntax and execution?"
              </>
            ) : (
              <>
                "Em có thể kể tên một số hàm trong số các lệnh đã học hay không? Các hàm đó có những đặc điểm chung gì?"
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setKhoidongRevealed(!khoidongRevealed)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Cpu className="w-4 h-4" />
              <span>{khoidongRevealed ? (isEn ? 'Hide Answer' : 'Ẩn câu trả lời') : (isEn ? 'Reveal Explanation' : 'Khám phá câu trả lời SGK')}</span>
            </button>
          </div>

          {khoidongRevealed && (
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2.5 animate-in fade-in duration-200">
              <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEn ? 'Textbook Response:' : 'Phân tích chuẩn SGK:'}</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
                <li>
                  <strong>{isEn ? 'Learned functions: ' : 'Các hàm đã học: '}</strong><code>print()</code>, <code>input()</code>, <code>len()</code>, <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>range()</code>, <code>type()</code>...
                </li>
                <li>
                  <strong>{isEn ? 'Common syntax pattern: ' : 'Đặc điểm chung về hình thức: '}</strong>{isEn ? 'All functions are immediately followed by a pair of parentheses () directly attached to the function name.' : 'Đều có cặp dấu mở đóng ngoặc đơn () đi liền ngay sau tên hàm.'}
                </li>
                <li>
                  <strong>{isEn ? 'Parameter traits: ' : 'Đặc điểm về tham số: '}</strong>{isEn ? 'Inside parentheses can be arguments (parameters) representing values, variables, or expressions; some functions allow empty parentheses like input().' : 'Bên trong ngoặc có thể chứa các đối số (tham số) là đại lượng, biến hoặc biểu thức; một số hàm có thể để ngoặc trống như input().'}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 3D Interactive WebGL Function Machine */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="text-base sm:text-xl font-bold text-white">
              {isEn ? '3D WebGL Python Function Laboratory' : 'Phòng Thí Nghiệm 3D WebGL Cỗ Máy Hàm & Đường Ống'}
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {isEn ? 'Explore input arguments, internal processing, and return values' : 'Mô phỏng trực quan luồng dữ liệu tham số vào và kết quả trả về'}
          </span>
        </div>

        <Function3DLab />
      </div>

      {/* 4-Section Roadmap */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          {isEn ? 'Lesson 26 Syllabus Roadmap' : 'Lộ trình bài học Bài 26 (Trang 127 – 130)'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              sec: 1,
              titleVi: '1. Hàm thiết kế sẵn',
              titleEn: '1. Built-in Functions',
              descVi: 'Bảng 26.1 gồm 15 hàm Python, quy tắc gọi hàm, tham số và giá trị trả lại.',
              descEn: 'Table 26.1 with 15 built-in functions, invocation rules, parameters and returns.',
              page: 'Trang 127 – 128',
              color: 'sky'
            },
            {
              sec: 2,
              titleVi: '2. Thiết lập hàm tự định nghĩa',
              titleEn: '2. User-Defined Functions',
              descVi: 'Cú pháp từ khoá def, tên hàm, thụt lề, hàm có return và hàm không return.',
              descEn: 'def keyword syntax, naming, indentation, return vs void functions.',
              page: 'Trang 128 – 129',
              color: 'purple'
            },
            {
              sec: 3,
              titleVi: '3. Thực hành: 2 Nhiệm vụ',
              titleEn: '3. Practical Lab: 2 Tasks',
              descVi: 'NV1 hàm meeting() chào hỏi, NV2 hàm prime(n) kiểm tra số nguyên tố.',
              descEn: 'Task 1 meeting() greeting, Task 2 prime(n) primality test function.',
              page: 'Trang 129 – 130',
              color: 'emerald'
            },
            {
              sec: 4,
              titleVi: '4. Luyện tập, Vận dụng & Đánh giá',
              titleEn: '4. Practice & Evaluation',
              descVi: 'Ước nguyên tố, đếm chữ số numbers(s), tối ưu đa lệnh return thoát sớm.',
              descEn: 'Prime divisors, digit count numbers(s), early-return optimization.',
              page: 'Trang 130',
              color: 'amber'
            }
          ].map((item) => (
            <div
              key={item.sec}
              onClick={() => setCurrentPage(item.sec)}
              className="group p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all cursor-pointer hover:-translate-y-0.5 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                    {item.page}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm group-hover:text-purple-300 transition-colors">
                  {isEn ? item.titleEn : item.titleVi}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isEn ? item.descEn : item.descVi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
