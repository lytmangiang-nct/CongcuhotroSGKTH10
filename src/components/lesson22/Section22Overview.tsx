import React from 'react';
import { useBook } from '../../context/BookContext';
import { List3DViewer } from './List3DViewer';
import {
  BookOpen,
  Target,
  Sparkles,
  HelpCircle,
  Compass,
  CheckCircle,
  RotateCcw,
  Layers,
  ArrowRight,
  Database,
  ListOrdered,
  Cpu,
  Boxes
} from 'lucide-react';

export const Section22Overview: React.FC = () => {
  const { bilingualMode, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const isEn = bilingualMode === 'en';

  const handleOpenPageScan = (pageNum: number) => {
    setOriginalPageTarget(pageNum);
    setShowOriginalModal(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-cyan-950 via-slate-900 to-blue-950 p-6 sm:p-8 border border-cyan-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {isEn ? 'Topic 5 • Python Programming' : 'Chủ đề 5 • Lập trình Python'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {isEn ? 'Pages 111 – 114 Textbook' : 'Trang 111 – 114 SGK'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'LESSON 22: LIST DATA TYPE' : 'BÀI 22: KIỂU DỮ LIỆU DANH SÁCH (LIST)'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isEn
                ? 'Mastering Python list data structures: zero-based indexing, len() function, del operations, list concatenation, for loop traversal with range(), and the append() method.'
                : 'Làm quen với kiểu dữ liệu có cấu trúc đầu tiên trong Python: khởi tạo danh sách, truy cập chỉ số bắt đầu từ 0, hàm len(), lệnh xoá del, phép ghép nối +, duyệt for loop và phương thức append().'}
            </p>

            <button
              type="button"
              onClick={() => handleOpenPageScan(111)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer shadow-lg"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'View Original Textbook (Pages 111 – 114)' : 'Xem trang SGK gốc (Trang 111 – 114)'}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 shadow-xl text-center">
              <div className="text-xs text-slate-400 font-medium">
                {isEn ? 'Flexible Array Structure' : 'Cấu trúc mảng linh hoạt'}
              </div>
              <div className="text-lg font-black text-cyan-400 font-mono mt-0.5">A = [v₁, v₂, ...]</div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isEn ? 'Index: 0 .. len(A) - 1' : 'Chỉ số: 0 .. len(A) - 1'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mục tiêu bài học (Sau bài này em sẽ) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn ? '1. Initialization & Access' : '1. Khởi tạo & Truy cập'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isEn
                ? 'Understand the list data type, bracket syntax [], and how to access elements through zero-based indices.'
                : 'Biết được kiểu dữ liệu danh sách (list), cú pháp cặp ngoặc [] và cách truy cập từng phần tử thông qua chỉ số từ 0.'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <ListOrdered className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn ? '2. For Loop Traversal' : '2. Duyệt phần tử bằng for'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isEn
                ? 'Understand and execute list iteration using for i in range(len(A)) or by slicing subranges.'
                : 'Biết và thực hiện cách duyệt các phần tử của danh sách bằng vòng lặp for i in range(len(A)) hoặc cắt lát vùng chỉ số.'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn ? '3. Method Manipulation' : '3. Thao tác phương thức'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {isEn
                ? 'Practice standard methods: append() to push elements, del to remove by index, and list concatenation (+).'
                : 'Thực hành các phương thức đơn giản: thêm phần tử bằng append(), xoá bằng del và ghép danh sách +.'}
            </p>
          </div>
        </div>
      </div>

      {/* Khởi động SGK Trang 111 */}
      <div className="bg-cyan-50/70 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/60 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-cyan-600 text-white font-bold text-xs rounded-full uppercase">
            {isEn ? 'Warm-up' : 'Khởi động'}
          </span>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {isEn
              ? 'The Need for Sequence Data Storage in Programming'
              : 'Nhu cầu lưu trữ dữ liệu dạng danh sách trong lập trình'}
          </h3>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          {isEn
            ? 'You have learned basic primitive Python types such as integer (int), float (float), string (str), and boolean (bool). However, each variable can store only one single value. When you need to manage a whole class test scores, 40 student names, or coordinates of a polygon, declaring 40 individual variables becomes exceedingly cumbersome.'
            : 'Em đã được học những kiểu dữ liệu cơ bản của Python như số nguyên (int), số thực (float), xâu kí tự (str), kiểu lôgic (bool). Tuy nhiên, mỗi biến này chỉ lưu được một giá trị duy nhất. Khi em cần lưu trữ điểm số của cả lớp, danh sách 40 học sinh hay toạ độ một đa giác, nếu tạo 40 biến riêng lẻ sẽ rất cồng kềnh.'}
        </p>

        {/* Real life examples grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 dark:border-cyan-900 shadow-sm">
            <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              <span>{isEn ? '1. Student roster' : '1. Danh sách học sinh'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-mono">
              ['An', 'Bình', 'Chi', 'Dũng', 'Hoa']
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 dark:border-cyan-900 shadow-sm">
            <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>{isEn ? '2. Grade score report' : '2. Bảng điểm môn Tin'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-mono">
              [8.5, 9.0, 7.0, 10.0, 8.0]
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 dark:border-cyan-900 shadow-sm">
            <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>{isEn ? '3. Heterogeneous items' : '3. Dữ liệu hỗn hợp'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-mono">
              [1.5, 2, "Python", "List", 0]
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 dark:border-cyan-900 shadow-sm">
            <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1.5">
              <Boxes className="w-4 h-4" />
              <span>{isEn ? '4. Empty list' : '4. Danh sách rỗng'}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-mono">
              [] ({isEn ? 'length len = 0' : 'độ dài len = 0'})
            </p>
          </div>
        </div>
      </div>

      {/* Embedded 3D Three.js Laboratory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
              {isEn
                ? 'Interactive 3D Laboratory: Array Memory Structure & Index Mechanics'
                : 'Phòng Thí Nghiệm 3D Trực Quan: Cơ Chế Bộ Nhớ Mảng & Chỉ Số'}
            </h3>
          </div>
          <span className="text-xs text-slate-500">{isEn ? 'WebGL Three.js Simulation' : 'Tương tác WebGL Three.js'}</span>
        </div>
        <List3DViewer />
      </div>

      {/* 5-Step Learning Roadmap */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-4 flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-600" />
          <span>{isEn ? '5-Step Learning Roadmap for Lesson 22' : 'Lộ trình 5 bước chinh phục Bài 22'}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            {
              step: '01',
              title: isEn ? 'Warm-up' : 'Khởi động',
              desc: isEn ? 'Objectives & need for list structures' : 'Mục tiêu & Nhu cầu cấu trúc danh sách'
            },
            {
              step: '02',
              title: isEn ? 'Section 1' : 'Mục 1',
              desc: isEn ? 'List type, index 0, len(), del, concat +' : 'Kiểu list, chỉ số 0, len(), del, ghép +'
            },
            {
              step: '03',
              title: isEn ? 'Sections 2 & 3' : 'Mục 2 & 3',
              desc: isEn ? 'for loop traversal & append() method' : 'Duyệt for loop & phương thức append()'
            },
            {
              step: '04',
              title: isEn ? 'Practice Lab' : 'Thực hành',
              desc: isEn ? 'Student names & sum/average calculations' : 'Quản lý tên học sinh & tính tổng/TBC'
            },
            {
              step: '05',
              title: isEn ? 'Assessment' : 'Đánh giá',
              desc: isEn ? 'Practice, Application Max/Min & Mastery Quiz' : 'Luyện tập, Vận dụng tìm Max & Quiz'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850"
            >
              <div className="font-mono text-cyan-600 dark:text-cyan-400 font-bold text-xs mb-1">
                {isEn ? `Step ${item.step}` : `Bước ${item.step}`}
              </div>
              <div className="font-bold text-slate-800 dark:text-slate-200 text-xs">{item.title}</div>
              <div className="text-[11px] text-slate-500 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
