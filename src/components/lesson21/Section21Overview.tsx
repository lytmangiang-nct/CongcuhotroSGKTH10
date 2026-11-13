import React from 'react';
import { useBook } from '../../context/BookContext';
import { WhileLoop3DViewer } from './WhileLoop3DViewer';
import {
  BookOpen,
  Target,
  Sparkles,
  Compass,
  CheckCircle
} from 'lucide-react';

export const Section21Overview: React.FC = () => {
  const { bilingualMode, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const isEn = bilingualMode === 'en';

  const handleOpenPageScan = (pageNum: number) => {
    setOriginalPageTarget(pageNum);
    setShowOriginalModal(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-950 via-slate-900 to-purple-950 p-6 sm:p-8 border border-indigo-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {isEn ? 'Topic 5 • Python Programming' : 'Chủ đề 5 • Lập trình Python'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {isEn ? 'Pages 108 – 110 Textbook' : 'Trang 108 – 110 SGK'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'LESSON 21: THE WHILE LOOP STATEMENT' : 'BÀI 21: CÂU LỆNH LẶP WHILE'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isEn
                ? 'Mastering indefinite iterations with while loops, stopping condition inspection, infinite loop prevention, break statement interruption, and the 3 fundamental control structures of high-level programming.'
                : 'Làm chủ vòng lặp với số lần không biết trước while, kiểm soát điều kiện dừng, kỹ thuật ngắt lệnh break và nắm vững ba cấu trúc lập trình cơ bản của ngôn ngữ bậc cao.'}
            </p>

            <button
              type="button"
              onClick={() => handleOpenPageScan(108)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer shadow-lg"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'View Original Textbook Pages (Pages 108 – 110)' : 'Xem trang SGK gốc (Trang 108 – 110)'}</span>
            </button>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-black text-indigo-400">3</div>
              <div className="text-[11px] text-slate-400 font-medium">
                {isEn ? 'Core Structures' : 'Cấu trúc cơ bản'}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-black text-emerald-400">3D</div>
              <div className="text-[11px] text-slate-400 font-medium">
                {isEn ? 'WebGL Simulation' : 'Mô phỏng WebGL'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 Learning Objectives Cards */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">
            {isEn ? 'Learning Objectives (After this lesson, you will:)' : 'Mục Tiêu Bài Học (Sau bài này em sẽ:)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-slate-200">
                {isEn ? '1. Indefinite while loop iterations' : '1. Lệnh lặp while với số lần không biết trước'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isEn
                  ? 'Understand and solve problems using while loops, comprehend pre-condition checking mechanics, prevent infinite loop bugs, and use break statements.'
                  : 'Biết và thực hành giải các bài toán sử dụng lệnh lặp while, hiểu rõ cơ chế kiểm tra điều kiện trước, phòng chống lỗi lặp vô hạn và cách dùng lệnh ngắt break.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-slate-200">
                {isEn ? '2. Three foundational programming structures' : '2. Ba cấu trúc lập trình cơ bản'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isEn
                  ? 'Master the 3 core structures that compose any algorithm in high-level languages: Sequential structure, Selection (if-else), and Iteration (for, while).'
                  : 'Nắm vững ba cấu trúc cốt lõi tạo nên mọi thuật toán trong ngôn ngữ bậc cao: Cấu trúc tuần tự, Cấu trúc rẽ nhánh (if) và Cấu trúc lặp (for, while).'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Khởi động: Bảng so sánh Cột A vs Cột B (Trang 108) */}
      <div className="bg-linear-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">
              {isEn
                ? 'Warm-up: Comparing Definite Loops (Col A) vs Indefinite Loops (Col B)'
                : 'Khởi Động: So Sánh Lặp Biết Trước (Cột A) vs Lặp Chưa Biết Trước (Cột B)'}
            </h2>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            {isEn ? 'Textbook Page 108' : 'Trang 108 SGK'}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {isEn
            ? 'Observe the daily tasks in the table below and analyze the difference in iteration counts between the two columns:'
            : 'Quan sát các công việc được ghi trong bảng sau và phân tích điểm khác nhau về số lần thực hiện giữa hai cột:'}
        </p>

        {/* Comparison Table matching SGK */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-1/2 text-sky-400 font-bold">
                  {isEn ? 'COLUMN A (Definite Count - for Loop)' : 'CỘT A (Số lần lặp biết trước - Lệnh for)'}
                </th>
                <th className="py-3 px-4 w-1/2 text-amber-400 font-bold">
                  {isEn ? 'COLUMN B (Indefinite Count - while Loop)' : 'CỘT B (Số lần lặp không biết trước - Lệnh while)'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-4 text-slate-300">
                  {isEn ? (
                    <>
                      🏃 An athlete runs <strong>exactly 20 laps</strong> around the stadium.
                      <div className="text-[11px] text-sky-400/80 font-mono mt-1">👉 Known beforehand: Exactly 20 laps</div>
                    </>
                  ) : (
                    <>
                      🏃 Vận động viên chạy <strong>đúng 20 vòng</strong> xung quanh sân vận động.
                      <div className="text-[11px] text-sky-400/80 font-mono mt-1">👉 Biết trước: 20 lần</div>
                    </>
                  )}
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {isEn ? (
                    <>
                      ⏱️ An athlete runs laps around the stadium <strong>for a duration of 2 hours</strong>.
                      <div className="text-[11px] text-amber-400/80 font-mono mt-1">👉 Halting condition: When 2 hours elapse (lap count depends on fitness)</div>
                    </>
                  ) : (
                    <>
                      ⏱️ Vận động viên chạy nhiều vòng xung quanh sân vận động <strong>trong thời gian 2 tiếng</strong>.
                      <div className="text-[11px] text-amber-400/80 font-mono mt-1">👉 Điều kiện dừng: Khi hết 2 giờ (số vòng tuỳ thể lực)</div>
                    </>
                  )}
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-4 text-slate-300">
                  {isEn ? (
                    <>
                      📚 You complete <strong>5 homework exercises</strong> assigned by teacher.
                      <div className="text-[11px] text-sky-400/80 font-mono mt-1">👉 Known beforehand: Exactly 5 exercises</div>
                    </>
                  ) : (
                    <>
                      📚 Em làm <strong>5 bài tập</strong> thầy cô giao về nhà.
                      <div className="text-[11px] text-sky-400/80 font-mono mt-1">👉 Biết trước: Đúng 5 bài</div>
                    </>
                  )}
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {isEn ? (
                    <>
                      🍚 You do homework exercises <strong>until dinner time arrives</strong>.
                      <div className="text-[11px] text-amber-400/80 font-mono mt-1">👉 Halting condition: When dinner time arrives</div>
                    </>
                  ) : (
                    <>
                      🍚 Em làm các bài tập về nhà <strong>đến giờ ăn cơm thì dừng lại</strong>.
                      <div className="text-[11px] text-amber-400/80 font-mono mt-1">👉 Điều kiện dừng: Khi tới giờ ăn cơm</div>
                    </>
                  )}
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-4 text-slate-300">
                  {isEn ? (
                    <>
                      🪣 You fetch <strong>15 buckets of water</strong> to help mom.
                      <div className="text-[11px] text-sky-400/80 font-mono mt-1">👉 Known beforehand: 15 buckets</div>
                    </>
                  ) : (
                    <>
                      🪣 Em đi lấy <strong>15 xô nước</strong> giúp mẹ.
                      <div className="text-[11px] text-sky-400/80 font-mono mt-1">👉 Biết trước: 15 xô</div>
                    </>
                  )}
                </td>
                <td className="py-3 px-4 text-slate-300">
                  {isEn ? (
                    <>
                      💧 You carry water buckets <strong>until the reservoir is completely full</strong>.
                      <div className="text-[11px] text-amber-400/80 font-mono mt-1">👉 Halting condition: When the reservoir is full</div>
                    </>
                  ) : (
                    <>
                      💧 Em xách các xô nước giúp mẹ <strong>cho đến khi đầy thùng nước</strong>.
                      <div className="text-[11px] text-amber-400/80 font-mono mt-1">👉 Điều kiện dừng: Khi thùng nước đầy tràn</div>
                    </>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-700/60 text-xs text-indigo-100 leading-relaxed">
          💡 <strong>{isEn ? 'Core Takeaway:' : 'Kết luận rút ra:'}</strong>{' '}
          {isEn
            ? 'In real life, many repetitive tasks do not have a predetermined repetition count; instead, we only know the condition upon which to stop. Python provides the while statement specifically to solve this indefinite iteration paradigm.'
            : 'Trong thực tế, có rất nhiều công việc lặp đi lặp lại nhưng chúng ta không thể biết trước chính xác số lần lặp mà chỉ biết điều kiện để dừng công việc. Ngôn ngữ Python cung cấp câu lệnh while để giải quyết triệt để dạng bài toán này.'}
        </div>
      </div>

      {/* Embedded 3D Three.js Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
            <h2 className="text-lg font-bold text-white">
              {isEn
                ? '3D Simulation Lab: While Loop Vortex & 3 Control Structures'
                : 'Phòng Thí Nghiệm Mô Phỏng 3D: Vòng Xoáy While & 3 Cấu Trúc Lập Trình'}
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {isEn
              ? 'Rotate 3D, test infinite loop trap, and explore bucket water model'
              : 'Tương tác xoay 3D, thử nghiệm bẫy lặp vô hạn và mô phỏng xô nước'}
          </span>
        </div>

        <WhileLoop3DViewer initialMode="vortex" />
      </div>

      {/* 5-Step Lesson Roadmap */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">
            {isEn ? 'Lesson 21 Learning Roadmap' : 'Lộ Trình Học Tập Bài 21'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              step: '01',
              titleVi: 'Khởi động & 3D Lab',
              titleEn: 'Warm-up & 3D Lab',
              descVi: 'So sánh lặp biết trước vs chưa biết trước và khám phá phòng thí nghiệm 3D While.',
              descEn: 'Compare definite vs indefinite iterations and explore interactive 3D While lab.',
              active: true
            },
            {
              step: '02',
              titleVi: 'Lệnh lặp while',
              titleEn: 'while Loop Statement',
              descVi: 'Cú pháp while, sơ đồ khối Hình 21.1, Ví dụ 1-2, Ghi nhớ 1, bẫy lặp vô hạn và lệnh break.',
              descEn: 'while syntax, Figure 21.1 flowchart, Examples 1-2, Note 1, infinite loop trap, break.',
              active: false
            },
            {
              step: '03',
              titleVi: '3 Cấu trúc lập trình',
              titleEn: '3 Control Structures',
              descVi: 'Cấu trúc tuần tự, cấu trúc rẽ nhánh, cấu trúc lặp và Hộp Ghi nhớ 2.',
              descEn: 'Sequential, selection, and iterative control structures with Summary Box 2.',
              active: false
            },
            {
              step: '04',
              titleVi: 'Thực hành Lab',
              titleEn: 'Hands-on Lab',
              descVi: 'Nhiệm vụ 1: In 1..100 hàng ngang; Nhiệm vụ 2: In bảng chữ cái ASCII "A".."Z" 3 hàng.',
              descEn: 'Task 1: Print 1..100 horizontally; Task 2: Print ASCII "A".."Z" in 3 rows.',
              active: false
            },
            {
              step: '05',
              titleVi: 'Luyện tập & Vận dụng',
              titleEn: 'Practice & Application',
              descVi: 'Tìm số lớn nhất nhỏ hơn 100, đếm số chia hết, in ma trận 10x10 và trắc nghiệm thanh điều hướng.',
              descEn: 'Find max term < 100, divisible counting, 10x10 matrix, and nav bar mastery quiz.',
              active: false
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all ${
                item.active
                  ? 'bg-indigo-950/40 border-indigo-600/50 text-indigo-200'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400'
              }`}
            >
              <div className="text-xs font-mono font-bold text-indigo-400 mb-1">
                {isEn ? `STEP ${item.step}` : `CHẶNG ${item.step}`}
              </div>
              <div className="text-sm font-bold text-slate-200 mb-1">
                {isEn ? item.titleEn : item.titleVi}
              </div>
              <div className="text-[11px] leading-normal">
                {isEn ? item.descEn : item.descVi}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
