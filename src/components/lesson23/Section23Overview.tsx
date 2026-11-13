import React from 'react';
import { useBook } from '../../context/BookContext';
import { ListMethods3DViewer } from './ListMethods3DViewer';
import {
  BookOpen,
  Target,
  Sparkles,
  HelpCircle,
  Compass,
  Boxes,
  Trash2,
  PlusCircle,
  Search
} from 'lucide-react';

export const Section23Overview: React.FC = () => {
  const { bilingualMode, setOriginalPageTarget, setShowOriginalModal } = useBook();

  const handleOpenPageScan = (pageNum: number) => {
    setOriginalPageTarget(pageNum);
    setShowOriginalModal(true);
  };

  const isEn = bilingualMode === 'en';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-teal-950 via-slate-900 to-indigo-950 p-6 sm:p-8 border border-teal-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {isEn ? 'Topic 5 • Python Programming' : 'Chủ đề 5 • Lập trình Python'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {isEn ? 'Textbook Pages 115–118' : 'Trang 115 – 118 SGK'}
              </span>
            </div>

            <h1
              data-lesson-title="true"
              data-lesson-num={23}
              data-vi="Bài 23: Một số lệnh làm việc với dữ liệu danh sách"
              data-en="Lesson 23: List Operations and Methods"
              className="text-2xl sm:text-4xl font-black text-white tracking-tight cursor-help"
            >
              {isEn ? 'LESSON 23: LIST OPERATIONS AND METHODS' : 'BÀI 23: MỘT SỐ LỆNH LÀM VIỆC VỚI DỮ LIỆU DANH SÁCH'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isEn
                ? 'Mastering advanced Python list operations: membership testing with "in", direct "for k in A" element iteration, and the core method quartet: append(), insert(), clear(), and remove().'
                : 'Khám phá các thao tác nâng cao trên danh sách: kiểm tra phần tử với toán tử in, duyệt trực tiếp giá trị bằng for k in A, và bộ tứ phương thức chuẩn: append(), insert(), clear(), remove().'}
            </p>

            <button
              type="button"
              onClick={() => handleOpenPageScan(115)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer shadow-lg"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'View Textbook Scan (Pages 115–118)' : 'Xem trang SGK gốc (Trang 115 – 118)'}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-4 shadow-xl text-center">
              <div className="text-xs text-slate-400 font-medium">
                {isEn ? 'Core List Methods Quartet' : 'Bộ tứ thao tác danh sách'}
              </div>
              <div className="text-base font-black text-teal-400 font-mono mt-0.5">
                insert • remove • clear • append
              </div>
              <div className="text-[11px] text-amber-300 font-mono mt-1">
                {isEn ? '<value> in <list>' : '<giá trị> in <danh sách>'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mục tiêu bài học (Sau bài này em sẽ - SGK Trang 115) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn ? '1. Membership Testing & Iteration with "in"' : '1. Duyệt danh sách với toán tử in'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isEn ? (
                <>
                  Test element membership with <code className="font-mono font-bold text-teal-600 dark:text-teal-400">x in A</code> and iterate directly through items using <code className="font-mono font-bold text-teal-600 dark:text-teal-400">for k in A:</code> without needing <code className="font-mono">range()</code>.
                </>
              ) : (
                <>
                  Biết cách kiểm tra sự tồn tại của phần tử <code className="font-mono font-bold text-teal-600 dark:text-teal-400">x in A</code> và duyệt nhanh trực tiếp từng phần tử <code className="font-mono font-bold text-teal-600 dark:text-teal-400">for k in A:</code> mà không cần qua <code className="font-mono">range()</code>.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn ? '2. Core List Methods Execution' : '2. Thực hiện các phương thức thường dùng'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isEn ? (
                <>
                  Master 4 foundational list methods: <code className="font-mono font-bold">append(x)</code> (add to end), <code className="font-mono font-bold">insert(k, x)</code> (insert at index k), <code className="font-mono font-bold">clear()</code> (clear all items), and <code className="font-mono font-bold">remove(x)</code> (delete by value).
                </>
              ) : (
                <>
                  Thành thạo 4 phương thức nền tảng: <code className="font-mono font-bold">append(x)</code> (thêm cuối), <code className="font-mono font-bold">insert(k, x)</code> (chèn vị trí k), <code className="font-mono font-bold">clear()</code> (xoá rỗng), và <code className="font-mono font-bold">remove(x)</code> (xoá theo giá trị).
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Hoạt động Khởi động (SGK Trang 115) */}
      <div className="bg-linear-to-br from-amber-500/10 via-slate-900/40 to-slate-900 p-6 rounded-3xl border border-amber-500/20 shadow-lg space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm sm:text-base">
              {isEn
                ? 'Warm-up: 3 Inquiries Raised from Lesson 22 (Page 115)'
                : 'Khởi động: 3 Câu hỏi đặt ra từ Bài 22 (SGK Trang 115)'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn
                ? 'In the previous lesson, we learned how to use append to add elements to the end of a list. Does Python provide commands to:'
                : 'Trong bài trước chúng ta đã biết cách dùng lệnh append để thêm phần tử vào cuối một danh sách. Vậy Python có lệnh nào dùng để:'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Question 1 */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Trash2 className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-white">
                {isEn ? 'Quickly clear a list?' : 'Xoá nhanh một danh sách?'}
              </div>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Clean all stored elements, immediately transforming the list into an empty list [].'
                  : 'Làm sạch toàn bộ dữ liệu, biến danh sách gốc ngay lập tức trở thành rỗng [].'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-rose-300 font-bold">
              👉 {isEn ? 'Statement A.clear()' : 'Lệnh A.clear()'}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-white">
                {isEn ? 'Insert at front or middle?' : 'Chèn vào đầu hay giữa?'}
              </div>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Insert a new item at any given index, automatically shifting subsequent elements right without overwriting.'
                  : 'Đưa giá trị mới vào vị trí bất kỳ và tự động đẩy các phần tử phía sau sang phải mà không ghi đè.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-amber-300 font-bold">
              👉 {isEn ? 'Statement A.insert(k, x)' : 'Lệnh A.insert(k, x)'}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-white">
                {isEn ? 'Test if an element is in a list?' : 'Kiểm tra phần tử có trong list?'}
              </div>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Determine whether a value exists in the list, evaluating strictly to True or False.'
                  : 'Xác định xem một giá trị đã xuất hiện trong danh sách chưa với kết quả trả về là True hoặc False.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] font-mono text-teal-300 font-bold">
              👉 {isEn ? 'Operator x in A' : 'Toán tử x in A'}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded 3D Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">
              {isEn
                ? '3D WebGL Space Lab (Three.js): Interactive List State'
                : 'Phòng Thí Nghiệm Không Gian 3D WebGL (Three.js)'}
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {isEn ? 'Interactive manipulation across 3 operational modes' : 'Tương tác trực tiếp trên 3 chế độ'}
          </span>
        </div>

        <ListMethods3DViewer />
      </div>

      {/* Roadmap of Sections in Lesson 23 */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <Compass className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
            {isEn
              ? 'Lesson 23 Learning Roadmap (4 Core Sections)'
              : 'Lộ trình học tập chi tiết Bài 23 (4 Phần trọng tâm)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-teal-500/20 text-teal-400">
              {isEn ? 'SECTION 1 • PAGE 115' : 'MỤC 1 • TRANG 115'}
            </span>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {isEn ? 'Iteration with "in" Operator' : 'Duyệt với toán tử in'}
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {isEn
                ? 'Syntax <value> in <list>, comparing direct for k in A iteration, and Checkpoint Questions 1 & 2.'
                : 'Cú pháp <giá trị> in <danh sách>, so sánh duyệt trực tiếp for k in A và các câu hỏi củng cố 1, 2.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-indigo-500/20 text-indigo-400">
              {isEn ? 'SECTION 2 • PAGES 116–117' : 'MỤC 2 • TRANG 116–117'}
            </span>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {isEn ? 'Core List Methods' : 'Một số lệnh làm việc'}
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {isEn
                ? 'Methods clear(), remove() and ValueError exception, insert(k, x) and out-of-bounds rules k < 0 / k > len().'
                : 'Lệnh clear(), remove() và lỗi ValueError, insert(k, x) và quy tắc ngoài biên k < 0 / k > len().'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-amber-500/20 text-amber-400">
              {isEn ? 'PRACTICE • PAGES 117–118' : 'THỰC HÀNH • TRANG 117–118'}
            </span>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {isEn ? '3 Hands-on Lab Tasks' : '3 Nhiệm vụ Thực hành'}
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {isEn
                ? 'Task 1: Reverse print students; Task 2: Delete negatives without advancing i; Task 3: Find 3 consecutive terms [1, 2, 3].'
                : 'NV1: In ngược học sinh; NV2: Xoá số âm không tăng biến i; NV3: Tìm mẫu 3 số hạng liên tiếp [1, 2, 3].'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-pink-500/20 text-pink-400">
              {isEn ? 'ASSESSMENT • PAGE 118' : 'ĐÁNH GIÁ • TRANG 118'}
            </span>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {isEn ? 'Practice & Application' : 'Luyện tập & Vận dụng'}
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {isEn
                ? 'Insert positions, delete median in odd/even lists, generate even sequences, Fibonacci series, 10 quiz questions, and KNTT10-B23 certificate.'
                : 'Chèn vị trí, xoá phần tử chính giữa chẵn/lẻ, tạo dãy số chẵn, dãy Fibonacci, 10 câu trắc nghiệm và cấp Chứng chỉ KNTT10-B23.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
