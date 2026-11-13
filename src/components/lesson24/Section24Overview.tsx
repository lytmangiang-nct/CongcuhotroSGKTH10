import React from 'react';
import { useBook } from '../../context/BookContext';
import { String3DViewer } from './String3DViewer';
import {
  BookOpen,
  Target,
  Sparkles,
  HelpCircle,
  Compass,
  Type,
  Lock,
  Search,
  ListOrdered,
  Layers,
  ArrowRight
} from 'lucide-react';

export const Section24Overview: React.FC = () => {
  const { bilingualMode, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const isEn = bilingualMode === 'en';

  const handleOpenPageScan = (pageNum: number) => {
    setOriginalPageTarget(pageNum);
    setShowOriginalModal(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-cyan-950 via-slate-900 to-indigo-950 p-6 sm:p-8 border border-cyan-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {isEn ? 'Topic 5 • Python Programming' : 'Chủ đề 5 • Lập trình Python'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {isEn ? 'Pages 119 – 122 Textbook' : 'Trang 119 – 122 SGK'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'LESSON 24: STRING DATA TYPE' : 'BÀI 24: XÂU KÍ TỰ (STRING)'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isEn
                ? 'Mastering Python string sequences: zero-based indexing, len() function, string immutability, index-based vs direct character for traversal, and substring checking with "in".'
                : 'Tìm hiểu kiểu dữ liệu xâu kí tự cơ bản trong Python: chỉ số đánh số từ 0, hàm len(), đặc tính bất biến không thể sửa đổi từng kí tự, duyệt xâu bằng lệnh for và kiểm tra xâu con với toán tử in.'}
            </p>

            <button
              type="button"
              onClick={() => handleOpenPageScan(119)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer shadow-lg"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'View Original Textbook (Pages 119 – 122)' : 'Xem trang SGK gốc (Trang 119 – 122)'}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 shadow-xl text-center">
              <div className="text-xs text-slate-400 font-medium">
                {isEn ? 'Core String Properties' : 'Đặc tính cốt lõi của xâu'}
              </div>
              <div className="text-base font-black text-cyan-400 font-mono mt-0.5">
                {isEn ? 'Unicode Sequence' : 'Dãy kí tự Unicode'}
              </div>
              <div className="text-[11px] text-rose-400 font-semibold mt-1">
                {isEn ? 'Immutable (Cannot modify in-place)' : 'Bất biến (Immutable)'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mục tiêu bài học (Sau bài này em sẽ - SGK Trang 119) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn ? '1. String as Fundamental Sequence Type' : '1. Hiểu xâu là kiểu dữ liệu cơ bản'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isEn ? (
                <>Understand that strings are sequences of Unicode characters, access individual characters via index <code className="font-mono font-bold text-cyan-600 dark:text-cyan-400">s[i]</code>, compute length <code className="font-mono font-bold">len(s)</code>, and grasp string immutability.</>
              ) : (
                <>Biết xâu kí tự là dãy các kí tự Unicode, cách truy cập từng kí tự qua chỉ số <code className="font-mono font-bold text-cyan-600 dark:text-cyan-400">s[i]</code>, tính độ dài <code className="font-mono font-bold">len(s)</code> và hiểu tính bất biến của xâu.</>
              )}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <ListOrdered className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn ? '2. Using for Loops to Process Strings' : '2. Sử dụng lệnh for để xử lí xâu'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isEn ? (
                <>Know and execute two iteration methods: index traversal with <code className="font-mono font-bold">for i in range(len(s))</code> and direct character iteration <code className="font-mono font-bold">for ch in s</code>, plus the substring testing operator <code className="font-mono font-bold">s1 in s2</code>.</>
              ) : (
                <>Biết và thực hiện được 2 cách duyệt xâu: duyệt theo chỉ số <code className="font-mono font-bold">for i in range(len(s))</code> và duyệt trực tiếp <code className="font-mono font-bold">for ch in s</code>, cùng toán tử kiểm tra xâu con <code className="font-mono font-bold">s1 in s2</code>.</>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Khởi động (SGK Trang 119) */}
      <div className="bg-linear-to-br from-cyan-500/10 via-slate-900/40 to-slate-900 p-6 rounded-3xl border border-cyan-500/20 shadow-lg space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm sm:text-base">
              {isEn
                ? 'Warm-up: 3 Ways to Declare Strings & 2 Core Questions (Page 119)'
                : 'Khởi động: 3 Cách Khởi Tạo Xâu & 2 Câu Hỏi Cốt Lõi (SGK Trang 119)'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn
                ? 'We can declare string variables using multiple syntax styles in Python:'
                : 'Chúng ta có thể tạo các biến kiểu xâu kí tự theo nhiều cách:'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-slate-400 text-[10px] uppercase font-sans font-bold">
              {isEn ? '1. Double quotes ("...")' : '1. Cặp dấu nháy kép'}
            </div>
            <div className="text-cyan-400 font-bold">s = "Thời khoá biểu"</div>
            <div className="text-slate-500 text-[11px] font-sans">
              {isEn ? 'Commonly used for standard phrases and sentences.' : 'Dùng phổ biến cho cụm từ, câu chữ.'}
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-slate-400 text-[10px] uppercase font-sans font-bold">
              {isEn ? "2. Single quotes ('...')" : '2. Cặp dấu nháy đơn'}
            </div>
            <div className="text-indigo-300 font-bold">xau = 'Hoa học trò'</div>
            <div className="text-slate-500 text-[11px] font-sans">
              {isEn ? 'Completely interchangeable with double quotes.' : 'Hoàn toàn tương đương nháy kép.'}
            </div>
          </div>

          <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-slate-400 text-[10px] uppercase font-sans font-bold">
              {isEn ? '3. Triple quotes ("""...""")' : '3. Ba dấu nháy kép'}
            </div>
            <div className="text-amber-300 font-bold">Cau_tho = """Mình về..."""</div>
            <div className="text-slate-500 text-[11px] font-sans">
              {isEn ? 'Enables text or poetry spanning multiple lines.' : 'Viết văn bản, bài thơ trên nhiều dòng.'}
            </div>
          </div>
        </div>

        {/* 2 Câu hỏi mở đầu SGK */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-white">
              {isEn ? '2 Opening textbook inquiry questions:' : '2 Câu hỏi mở đầu đặt ra trong SGK:'}
            </div>
            <div className="text-slate-300">
              {isEn ? '• Is there a command to extract each character from a string?' : '• Liệu có lệnh nào trích ra từng kí tự của một xâu?'}
            </div>
            <div className="text-slate-300">
              {isEn ? '• Which command accurately counts the total characters of a string?' : '• Lệnh nào giúp đếm chính xác số kí tự của một xâu?'}
            </div>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 p-2.5 rounded-xl text-cyan-300 shrink-0 font-mono">
            👉 <span className="font-bold">s[i]</span> {isEn ? 'extracts char &' : 'trích kí tự &'} <span className="font-bold">len(s)</span> {isEn ? 'counts length!' : 'đếm số kí tự!'}
          </div>
        </div>
      </div>

      {/* Embedded 3D Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-slate-100 text-sm uppercase tracking-wider">
              {isEn
                ? '3D WebGL Space Lab (Three.js): Interactive String State'
                : 'Phòng Thí Nghiệm Không Gian 3D WebGL (Three.js)'}
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {isEn ? 'Interactive manipulation across 3 operational modes' : 'Tương tác trực tiếp trên 3 chế độ xâu kí tự'}
          </span>
        </div>

        <String3DViewer />
      </div>

      {/* Roadmap of Sections in Lesson 24 */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <Compass className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
            {isEn ? 'Lesson 24 Learning Roadmap (4 Core Sections)' : 'Lộ trình học tập chi tiết Bài 24 (4 Phần trọng tâm)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-cyan-500/20 text-cyan-400">
              {isEn ? 'SECTION 1 • PAGES 119–120' : 'MỤC 1 • TRANG 119–120'}
            </span>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {isEn ? 'String as Sequence of Characters' : 'Xâu là dãy các kí tự'}
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {isEn
                ? 'len(s) function, s[0] indexing, string vs list comparison, immutability, and empty string "".'
                : 'Hàm len(s), chỉ số s[0], so sánh xâu với danh sách, tính bất biến immutable và xâu rỗng "".'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-indigo-500/20 text-indigo-400">
              {isEn ? 'SECTION 2 • PAGES 120–121' : 'MỤC 2 • TRANG 120–121'}
            </span>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {isEn ? 'Character Traversal & Substrings' : 'Lệnh duyệt kí tự của xâu'}
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {isEn
                ? 'Indexed traversal with range() vs direct for ch in s, and substring checking with s1 in s2.'
                : 'Duyệt qua chỉ số với range() vs duyệt trực tiếp for ch in s, toán tử kiểm tra xâu con s1 in s2.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-teal-500/20 text-teal-400">
              {isEn ? 'PRACTICE LAB • PAGES 121–122' : 'THỰC HÀNH • TRANG 121–122'}
            </span>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {isEn ? '2 Practical Lab Tasks' : '2 Nhiệm vụ Thực hành'}
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {isEn
                ? 'Task 1: Manage student names with strings; Task 2: Detect substring "10" via loop & in operator.'
                : 'NV1: Quản lí danh sách học sinh bằng xâu; NV2: Kiểm tra xâu con "10" bằng cả 2 cách (vòng for chỉ số & toán tử in).'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-pink-500/20 text-pink-400">
              {isEn ? 'ASSESSMENT • PAGE 122' : 'ĐÁNH GIÁ • TRANG 122'}
            </span>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {isEn ? 'Practice & Application' : 'Luyện tập & Vận dụng'}
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              {isEn
                ? 'First 3 chars extraction, digit presence check, midpoint insertion, student name count, and Quiz.'
                : 'Trích 3 kí tự đầu, kiểm tra có chữ số, chèn xâu vào chính giữa, đếm tên "Hương", 10 câu trắc nghiệm và cấp Chứng chỉ KNTT10-B24.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
