import React from 'react';
import { useBook } from '../../context/BookContext';
import {
  Bug,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Terminal,
  Activity,
  Layers,
  Sparkles,
  CheckCircle,
  HelpCircle,
  PlayCircle
} from 'lucide-react';
import { Error3DLab } from './Error3DLab';

export const Section29Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage } = useBook();
  const isVi = bilingualMode !== 'en';

  return (
    <div className="space-y-10">
      {/* Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-600 via-amber-600 to-red-600 p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
          <Bug className="w-96 h-96 -mr-20" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-4 h-4" />
            {isVi ? 'Bài 29 • Tin học 10 Kết Nối Tri Thức' : 'Lesson 29 • Informatics 10'}
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {isVi ? 'BÀI 29: NHẬN BIẾT LỖI CHƯƠNG TRÌNH' : 'LESSON 29: IDENTIFYING PROGRAM ERRORS'}
          </h1>

          <p className="mt-3 text-rose-100 text-sm md:text-base leading-relaxed">
            {isVi
              ? 'Khám phá và làm chủ 3 loại lỗi lập trình kinh điển trong Python: Lỗi cú pháp (SyntaxError), Lỗi ngoại lệ thời gian chạy (Runtime Exception) và Lỗi ngữ nghĩa lôgic; Đồng thời làm quen với 7 mã lỗi ngoại lệ phổ biến nhất.'
              : 'Master the three fundamental pillars of software errors in Python: Syntax Errors, Runtime Exceptions, and Semantic Logic Errors, along with 7 common exceptions.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium">
            <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>{isVi ? 'Trang 141 – 144 SGK' : 'Pages 141 – 144'}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
              <Terminal className="w-4 h-4 text-rose-300" />
              <span>{isVi ? 'Chủ đề 5: Lập trình Python' : 'Topic 5: Python Programming'}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
              <Activity className="w-4 h-4 text-emerald-300" />
              <span>{isVi ? '7 Mã lỗi ngoại lệ cốt lõi' : '7 Core Exception Codes'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Objectives Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-500" />
          {isVi ? 'Sau bài học này, em sẽ:' : 'Learning Objectives:'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="font-bold text-rose-900 dark:text-rose-200 text-sm">
                {isVi ? 'Biết và phân loại được các loại lỗi chương trình' : 'Identify & Categorize Program Errors'}
              </h3>
              <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">
                {isVi
                  ? 'Phân biệt rành mạch lỗi cú pháp (SyntaxError), lỗi ngoại lệ runtime và lỗi lôgic (kết quả sai).'
                  : 'Distinguish clearly between syntax errors, runtime exceptions, and subtle algorithmic logic errors.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                {isVi ? 'Nhận biết các lỗi ngoại lệ thường gặp' : 'Recognize Common Runtime Exceptions'}
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                {isVi
                  ? 'Hiểu nguyên nhân và cách khắc phục: ZeroDivisionError, IndexError, NameError, TypeError, ValueError, IndentationError.'
                  : 'Diagnose root causes for ZeroDivisionError, IndexError, NameError, TypeError, ValueError, and IndentationError.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Khởi động: Hình 29.1 Sơ đồ xử lý & Vị trí lỗi */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold shadow-md">
            <PlayCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {isVi ? 'Khởi động: Sơ đồ dòng dữ liệu và Vị trí phát sinh lỗi' : 'Warm-up: Data Pipeline & Failure Points'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'SGK Tin học 10, Trang 141 (Hình 29.1)' : 'Textbook Page 141 (Figure 29.1)'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-6">
          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-4">
            {isVi
              ? 'Một chương trình hoàn chỉnh được mô tả như Hình 29.1: Tiếp nhận các dữ liệu đầu vào (Input), xử lí theo yêu cầu bài toán và đưa ra kết quả đúng theo yêu cầu (Output).'
              : 'A complete program operates as shown in Figure 29.1: Ingesting Input data, processing according to logic rules, and generating correct Output.'}
          </p>

          {/* Interactive Pipeline Diagram (Figure 29.1 recreated) */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-300 dark:border-slate-700 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-950 border border-blue-300 dark:border-blue-700 rounded-xl text-blue-900 dark:text-blue-200 font-bold text-sm min-w-[130px]">
              {isVi ? 'Dữ liệu Đầu vào' : 'Input Data'}
              <span className="block text-[11px] font-normal text-blue-600 dark:text-blue-400 mt-0.5">
                (input, files, args)
              </span>
            </div>

            <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block" />
            <div className="text-slate-400 md:hidden">↓</div>

            <div className="p-4 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-xl font-bold text-base shadow-md min-w-[180px]">
              {isVi ? 'CHƯƠNG TRÌNH' : 'PROGRAM'}
              <span className="block text-xs font-normal text-rose-100 mt-1">
                {isVi ? 'Xử lí theo yêu cầu bài toán' : 'Algorithms & Execution'}
              </span>
            </div>

            <ArrowRight className="w-6 h-6 text-slate-400 hidden md:block" />
            <div className="text-slate-400 md:hidden">↓</div>

            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 rounded-xl text-emerald-900 dark:text-emerald-200 font-bold text-sm min-w-[130px]">
              {isVi ? 'Kết quả Đầu ra' : 'Output Result'}
              <span className="block text-[11px] font-normal text-emerald-600 dark:text-emerald-400 mt-0.5">
                (print, return, UI)
              </span>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-bold block mb-1">
              {isVi ? 'Câu hỏi dẫn nhập SGK:' : 'Textbook Reflection Question:'}
            </span>
            {isVi
              ? 'Theo em nếu chương trình có lỗi, thì các lỗi này sẽ như thế nào và có thể xảy ra ở đâu?'
              : 'In your opinion, if a program contains bugs, what forms do they take and where in the lifecycle can they occur?'}
            <div className="mt-2 text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-lg border border-amber-200/50">
              {isVi ? (
                <>
                  <strong>Giải thích chuẩn SGK:</strong> Lỗi có thể xuất hiện ở:
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li><strong>Ngay khi nạp mã nguồn:</strong> Do gõ sai từ khoá, cú pháp, quên dấu hai chấm <code className="text-rose-600">:</code> (Lỗi cú pháp).</li>
                    <li><strong>Khi người dùng nhập dữ liệu:</strong> Nhập số thực vào hàm <code className="text-amber-600">int()</code>, chia cho số 0, hoặc truy cập chỉ số ngoài mảng (Lỗi ngoại lệ thời gian chạy).</li>
                    <li><strong>Khi xuất kết quả:</strong> Code chạy xong nhưng kết quả sai do sai công thức thuật toán (Lỗi lôgic).</li>
                  </ul>
                </>
              ) : (
                <>
                  <strong>Key Takeaway:</strong> Errors manifest at:
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    <li><strong>Compilation/Parse Stage:</strong> Typos, missing colons, invalid syntax (SyntaxError).</li>
                    <li><strong>Runtime Input/Compute Stage:</strong> Bad type casting, zero divisor, index overflow (Exceptions).</li>
                    <li><strong>Output Validation Stage:</strong> Clean execution with mathematically wrong outputs (Logic error).</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Embedded 3D Lab */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-500" />
              {isVi ? 'Phòng Thí Nghiệm 3D Trực Quan Hoá Lỗi' : 'Interactive 3D Error Visualizer'}
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'Xoay và tương tác với 3 mô hình WebGL' : 'Orbit & interact with 3 WebGL models'}
            </span>
          </div>

          <Error3DLab initialMode="pillars" />
        </div>
      </div>

      {/* Syllabus Roadmap */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-rose-500" />
          {isVi ? 'Lộ trình khám phá Bài 29' : 'Lesson 29 Exploration Roadmap'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentPage(1)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-rose-400 dark:hover:border-rose-500 bg-slate-50 dark:bg-slate-800/40 text-left transition-all group"
          >
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
              {isVi ? 'Mục 1 • Trang 141 – 142' : 'Part 1 • Pages 141 – 142'}
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-600 transition-colors">
              {isVi ? 'Nhận biết lỗi chương trình' : 'Identifying Program Errors'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isVi ? '4 trường hợp thực tế, phân biệt Cú pháp vs Ngoại lệ vs Lôgic' : '4 cases: Syntax vs Exception vs Logic'}
            </p>
          </button>

          <button
            onClick={() => setCurrentPage(2)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-amber-400 dark:hover:border-amber-500 bg-slate-50 dark:bg-slate-800/40 text-left transition-all group"
          >
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              {isVi ? 'Mục 2 • Trang 143' : 'Part 2 • Page 143'}
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
              {isVi ? 'Một số lỗi ngoại lệ thường gặp' : 'Common Runtime Exceptions'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isVi ? 'Bảng 7 mã ngoại lệ và bài tập xác định mã lỗi' : '7 exception codes & diagnostic quiz'}
            </p>
          </button>

          <button
            onClick={() => setCurrentPage(3)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/40 text-left transition-all group"
          >
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              {isVi ? 'Thực hành • Trang 143 – 144' : 'Lab • Pages 143 – 144'}
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
              {isVi ? 'Thực hành: Khả năng sinh lỗi' : 'Hands-on Error Diagnostics'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isVi ? 'Nhiệm vụ 1 (Tổng, hiệu, thương) & Nhiệm vụ 2 (Nhập danh sách A)' : 'Task 1 arithmetic & Task 2 list ingest'}
            </p>
          </button>

          <button
            onClick={() => setCurrentPage(4)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-400 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/40 text-left transition-all group"
          >
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              {isVi ? 'Phần 4 • Trang 144' : 'Part 4 • Page 144'}
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
              {isVi ? 'Luyện tập & Chứng chỉ' : 'Practice & Certification'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isVi ? 'Luyện tập 1-2, Vận dụng 1-2 & 10 câu trắc nghiệm SGK' : 'Exercises, real-world tasks & quiz'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
