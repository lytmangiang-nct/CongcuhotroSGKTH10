import React from 'react';
import { useBook } from '../../context/BookContext';
import {
  Bug,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight,
  Terminal,
  Activity,
  Sliders,
  BookOpen,
  Search,
  Crosshair
} from 'lucide-react';
import { Debugger3DLab } from './Debugger3DLab';

export const Section30Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage, isPresentationMode, revealPresentationAnswers } = useBook();
  const [localRevealAnswer, setLocalRevealAnswer] = React.useState<boolean>(false);
  const isVi = bilingualMode !== 'en';
  const showTakeaway = !isPresentationMode || revealPresentationAnswers || localRevealAnswer;

  React.useEffect(() => {
    if (!isPresentationMode) setLocalRevealAnswer(false);
  }, [isPresentationMode]);

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
          <Crosshair className="w-96 h-96 -mr-20" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            {isVi ? 'Bài 30 • Tin học 10 Kết Nối Tri Thức' : 'Lesson 30 • Informatics 10'}
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            {isVi ? 'BÀI 30: KIỂM THỬ VÀ GỠ LỖI CHƯƠNG TRÌNH' : 'LESSON 30: PROGRAM TESTING AND DEBUGGING'}
          </h1>

          <p className="mt-3 text-cyan-100 text-sm md:text-base leading-relaxed">
            {isVi
              ? 'Làm chủ các kĩ thuật kiểm thử hiện đại: Xây dựng bộ test đa dạng, rà soát dữ liệu vùng biên, kỹ thuật chèn lệnh print() in biến trung gian, và sử dụng công cụ điểm dừng (breakpoint) trong môi trường lập trình.'
              : 'Master modern software verification: diverse test case suites, boundary/edge data analysis, intermediate print traces, and IDE breakpoint stepping.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium">
            <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>{isVi ? 'Trang 145 – 148 SGK' : 'Pages 145 – 148'}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
              <Terminal className="w-4 h-4 text-cyan-300" />
              <span>{isVi ? 'Chủ đề 5: Lập trình Python' : 'Topic 5: Python Programming'}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/25 px-3 py-1.5 rounded-lg border border-white/10">
              <Crosshair className="w-4 h-4 text-emerald-300" />
              <span>{isVi ? '4 Phương pháp kiểm thử & gỡ lỗi' : '4 Testing & Debugging Methods'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-cyan-500" />
          {isVi ? 'Sau bài học này, em sẽ:' : 'Learning Objectives:'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500 text-white flex items-center justify-center shrink-0 font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="font-bold text-teal-900 dark:text-teal-200 text-sm">
                {isVi ? 'Biết được các phương pháp đơn giản kiểm thử chương trình' : 'Master Simple Program Testing Methods'}
              </h3>
              <p className="text-xs text-teal-700 dark:text-teal-300 mt-1">
                {isVi
                  ? 'Biết thiết kế bộ test đa dạng, bộ test ngẫu nhiên, và đặc biệt là bộ test dữ liệu ở vùng biên để phát hiện lỗi tiềm ẩn.'
                  : 'Design diverse test suites, random inputs, and critical boundary edge-cases.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500 text-white flex items-center justify-center shrink-0 font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="font-bold text-cyan-900 dark:text-cyan-200 text-sm">
                {isVi ? 'Biết được một vài cách gỡ lỗi đơn giản một chương trình' : 'Apply Simple Program Debugging Techniques'}
              </h3>
              <p className="text-xs text-cyan-700 dark:text-cyan-300 mt-1">
                {isVi
                  ? 'Sử dụng thuần thục kỹ thuật in biến trung gian bằng print() và công cụ đặt điểm dừng (breakpoint) trong IDE.'
                  : 'Utilize intermediate variable print logging and IDE breakpoint inspection.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Khởi động SGK Trang 145 */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {isVi ? 'Khởi động: Thách thức của những lỗi không tường minh (Bug)' : 'Warm-up: The Challenge of Silent Bugs'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'SGK Tin học 10, Trang 145' : 'Textbook Page 145'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
          <p>
            {isVi
              ? 'Bài học trước em đã biết khái niệm lỗi ngoại lệ khi chạy chương trình Python. Tuy nhiên, một chương trình chạy không có lỗi ngoại lệ (chương trình không bị dừng) thì KHÔNG CÓ NGHĨA là chương trình không có lỗi. Thậm chí các "lỗi" không tường minh này (các lỗi này được gọi bug) càng khó phát hiện và khó sửa.'
              : 'In the previous lesson, you learned about runtime exceptions. However, a program that runs without throwing exceptions DOES NOT mean it is error-free. Silent logic bugs are often far harder to diagnose.'}
          </p>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
            <strong className="block mb-1">
              {isVi ? 'Câu hỏi dẫn nhập SGK:' : 'Textbook Inquiry:'}
            </strong>
            {isVi
              ? 'Theo em, làm thế nào để kiểm tra (test) và gỡ lỗi (debug) một chương trình? Môi trường lập trình có công cụ nào hỗ trợ việc đó không?'
              : 'How do we test and debug a program effectively? What tools do modern programming environments provide?'}

            {showTakeaway ? (
              <div
                data-presentation-answer="true"
                className="mt-2 text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80 p-3 rounded-lg border border-amber-200/60"
              >
                {isVi ? (
                  <>
                    <strong>Giải thích chuẩn kiến thức:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      <li><strong>Kiểm thử (Test):</strong> Chuẩn bị nhiều bộ test (test cases), bộ test ngẫu nhiên và đặc biệt là bộ test ở vùng biên để phát hiện các tình huống chương trình tính sai.</li>
                      <li><strong>Gỡ lỗi (Debug):</strong> Khi phát hiện sai kết quả, lập trình viên có 2 cách chính: (1) Chèn các lệnh <code className="text-cyan-600 dark:text-cyan-400 font-bold">print()</code> in giá trị các biến trung gian; (2) Sử dụng công cụ <code className="text-rose-600 dark:text-rose-400 font-bold">điểm dừng (break point)</code> được tích hợp sẵn trong các IDE hiện đại để tạm dừng chương trình và soi từng biến trong bộ nhớ.</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <strong>Key Takeaway:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      <li><strong>Testing:</strong> Design diverse suites, fuzz testing, and edge/boundary conditions.</li>
                      <li><strong>Debugging:</strong> Insert intermediate print statements or leverage IDE visual breakpoints to pause and step over instructions.</li>
                    </ul>
                  </>
                )}
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-amber-300/60">
                <span className="text-xs italic opacity-80">
                  {isVi ? 'Chế độ trình chiếu: Đáp án chuẩn kiến thức đang thu gọn.' : 'Presentation Mode: Key takeaway is collapsed.'}
                </span>
                <button
                  type="button"
                  onClick={() => setLocalRevealAnswer(true)}
                  className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer shrink-0"
                >
                  {isVi ? 'Hiện đáp án' : 'Show Answer'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Embedded 3D Lab */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-500" />
              {isVi ? 'Phòng Thí Nghiệm 3D Trực Quan Hoá Điểm Dừng & Vùng Biên' : '3D Interactive Debugger & Edge Radar Lab'}
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'Tương tác với 3 mô hình WebGL thời gian thực' : 'Interact with 3 real-time WebGL models'}
            </span>
          </div>

          <Debugger3DLab initialMode="breakpoint" />
        </div>
      </div>

      {/* Syllabus Roadmap */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-500" />
          {isVi ? 'Lộ trình khám phá Bài 30' : 'Lesson 30 Syllabus Roadmap'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentPage(1)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-cyan-400 dark:hover:border-cyan-500 bg-slate-50 dark:bg-slate-800/40 text-left transition-all group cursor-pointer"
          >
            <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
              {isVi ? 'Mục 1 • Trang 145 – 146' : 'Part 1 • Pages 145 – 146'}
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 transition-colors">
              {isVi ? 'Phương pháp kiểm thử' : 'Testing Methods'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isVi ? '4 phương pháp: bắt ngoại lệ, bộ test biên, in biến trung gian & điểm dừng' : '4 techniques: exceptions, edge test, prints & breakpoints'}
            </p>
          </button>

          <button
            onClick={() => setCurrentPage(2)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-teal-400 dark:hover:border-teal-500 bg-slate-50 dark:bg-slate-800/40 text-left transition-all group cursor-pointer"
          >
            <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
              {isVi ? 'Mục 2 • Trang 146 – 148' : 'Part 2 • Pages 146 – 148'}
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 transition-colors">
              {isVi ? 'Ví dụ minh hoạ: Tìm ƯCLN' : 'Case Study: Euclidean GCD'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isVi ? 'Gỡ lỗi bước trừ Euclid: In biến trung gian k, m, n và dùng breakpoint' : 'Debugging subtraction: prints & breakpoint watch table'}
            </p>
          </button>

          <button
            onClick={() => setCurrentPage(3)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/40 text-left transition-all group cursor-pointer"
          >
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              {isVi ? 'Mục 3 • Trình gỡ lỗi' : 'Part 3 • Debugger Simulator'}
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
              {isVi ? 'Mô phỏng Step Over IDE' : 'Interactive IDE Stepper'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isVi ? 'Bấm Step từng dòng lệnh, theo dõi biến thay đổi trong bảng watch' : 'Step through line-by-line with live watch table'}
            </p>
          </button>

          <button
            onClick={() => setCurrentPage(4)}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:border-emerald-400 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/40 text-left transition-all group cursor-pointer"
          >
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
              {isVi ? 'Phần 4 • Trang 148' : 'Part 4 • Page 148'}
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
              {isVi ? 'Luyện tập & Chứng chỉ' : 'Practice & Certification'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isVi ? 'Sửa lỗi ZeroDivision, sửa lỗi nối chuỗi, sửa Insertion Sort & trắc nghiệm' : 'Fix ZeroDivision, string bug, Insertion sort & 10-Q quiz'}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
