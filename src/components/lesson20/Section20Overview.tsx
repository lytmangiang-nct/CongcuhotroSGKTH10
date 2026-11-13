import React from 'react';
import { useBook } from '../../context/BookContext';
import { LoopFor3DViewer } from './LoopFor3DViewer';
import {
  BookOpen,
  Target,
  Sparkles,
  Users,
  Compass,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const Section20Overview: React.FC = () => {
  const { bilingualMode, setOriginalPageTarget, setShowOriginalModal } = useBook();

  const handleOpenPageScan = (pageNum: number) => {
    setOriginalPageTarget(pageNum);
    setShowOriginalModal(true);
  };

  const isEn = bilingualMode === 'en';

  const roadmapSteps = [
    {
      step: '01',
      titleVi: 'Khởi động & 3D Lab',
      titleEn: 'Warm-up & 3D Lab',
      descVi: 'Ý nghĩa cấu trúc lặp và trải nghiệm 3D bánh chuyền biến lặp k.',
      descEn: 'Understanding loop structures and exploring the 3D loop iteration mechanism for variable k.',
      active: true
    },
    {
      step: '02',
      titleVi: 'Lệnh lặp for',
      titleEn: 'The for Loop Statement',
      descVi: 'Cú pháp for i in range(n), sơ đồ khối 20.1, Ví dụ 1 & 2 tính tổng chẵn và đếm bội.',
      descEn: 'Syntax for i in range(n), Flowchart 20.1, Examples 1 & 2 for summing evens and counting multiples.',
      active: false
    },
    {
      step: '03',
      titleVi: 'Lệnh range()',
      titleEn: 'The range() Function',
      descVi: 'range(stop), range(start, stop), tham số end = " " và bẫy dãy rỗng.',
      descEn: 'range(stop), range(start, stop), the end = " " parameter, and empty sequence pitfalls.',
      active: false
    },
    {
      step: '04',
      titleVi: 'Thực hành Lab',
      titleEn: 'Textbook Practice Lab',
      descVi: 'Nhiệm vụ 1: UocSo.py và Nhiệm vụ 2: DemUocThucSu.py kèm Python Runner.',
      descEn: 'Task 1: UocSo.py and Task 2: DemUocThucSu.py with live interactive Python Runner.',
      active: false
    },
    {
      step: '05',
      titleVi: 'Luyện tập & Test',
      titleEn: 'Practice & Assessment',
      descVi: 'Giai thừa n!, tổng lập phương, chuỗi điều hoà và trắc nghiệm 10 câu.',
      descEn: 'Factorial n!, sum of cubes, harmonic series, and 10-question mastery quiz.',
      active: false
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-violet-950 via-slate-900 to-indigo-950 p-6 sm:p-8 border border-violet-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30">
                {isEn ? 'Topic 5 • Python Programming' : 'Chủ đề 5 • Lập trình Python'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {isEn ? 'Textbook Pages 105–107' : 'Trang 105 – 107 SGK'}
              </span>
            </div>

            <h1
              data-lesson-title="true"
              data-lesson-num={20}
              data-vi="Bài 20: Câu lệnh lặp for"
              data-en="Lesson 20: The for Loop Statement"
              className="text-2xl sm:text-4xl font-black text-white tracking-tight cursor-help"
            >
              {isEn ? 'LESSON 20: THE FOR LOOP STATEMENT' : 'BÀI 20: CÂU LỆNH LẶP FOR'}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isEn
                ? 'Mastering definite iterations with for loops, exploring integer sequences with range(), and implementing divisor algorithms in Python.'
                : 'Làm chủ cấu trúc lặp với số lần biết trước for, khám phá vùng giá trị range() và xây dựng các thuật toán tìm ước số, tính tổng lũy kế trong Python.'}
            </p>

            <button
              type="button"
              onClick={() => handleOpenPageScan(105)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all cursor-pointer shadow-lg"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'View Textbook Scan (Pages 105–107)' : 'Xem trang SGK gốc (Trang 105 – 107)'}</span>
            </button>
          </div>

          {/* Quick Metrics Badge */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-black text-violet-400">2</div>
              <div className="text-[11px] text-slate-400 font-medium">
                {isEn ? 'Core Objectives' : 'Mục tiêu cốt lõi'}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-2xl font-black text-emerald-400">3D</div>
              <div className="text-[11px] text-slate-400 font-medium">
                {isEn ? 'WebGL 3D Sim' : 'Mô phỏng WebGL'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 Learning Objectives Cards */}
      <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">
            {isEn ? 'Lesson Objectives (After this lesson, you will):' : 'Mục Tiêu Bài Học (Sau bài này em sẽ:)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-slate-200">
                {isEn ? '1. Understanding the range() Function' : '1. Ý nghĩa vùng giá trị hàm range()'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isEn
                  ? 'Understand integer sequences generated by range(stop) and range(start, stop), master the stop - 1 upper boundary rule, and recognize empty sequence conditions.'
                  : 'Biết được ý nghĩa của vùng giá trị tạo bởi lệnh range(stop) và range(start, stop), nắm vững quy tắc lấy cận trên stop - 1 và cơ chế dãy rỗng.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-slate-200">
                {isEn ? '2. The for Loop Statement Mechanics' : '2. Chức năng và cách dùng lệnh lặp for'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isEn
                  ? 'Master definite iteration mechanics, sequential assignment to loop variable k, and nested if conditions to filter even numbers, multiples, and divisors.'
                  : 'Hiểu rõ cơ chế lặp với số lần biết trước, thứ tự gán biến lặp k, kết hợp lệnh if trong thân vòng lặp để sàng lọc số chẵn, bội số và ước số.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Scenario (Hoạt động Khởi động Trang 105) */}
      <div className="bg-linear-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">
              {isEn
                ? 'Warm-up: Real-World Iterative Scenarios (Page 105)'
                : 'Khởi Động: Tình Huống Lặp Đi Lặp Lại Trong Thực Tế (Trang 105)'}
            </h2>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            {isEn ? 'Loop Structure Concept' : 'Khái niệm Cấu trúc lặp'}
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          {isEn
            ? 'In daily life and computing, we constantly encounter tasks that must be performed repeatedly multiple times:'
            : 'Trong cuộc sống và học tập, chúng ta thường xuyên gặp các công việc cần thực hiện lặp đi lặp lại nhiều lần:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              <span>{isEn ? 'Example A: Roll call for a class of 30 students' : 'Ví dụ A: Điểm danh lớp 30 học sinh'}</span>
            </div>
            <p className="text-xs text-slate-400">
              {isEn
                ? 'To take attendance for 30 students, the teacher sequentially calls each name from student #1 to student #30.'
                : 'Để điểm danh một lớp có 30 học sinh, giáo viên lần lượt đọc tên từng bạn từ bạn số 1 đến bạn số 30.'}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-950 text-xs font-mono text-emerald-400 border border-slate-800">
              {isEn
                ? '👉 Repeated task: Read 1 student name • Repetitions: Exactly 30 times.'
                : '👉 Công việc lặp: Đọc tên 1 bạn • Số lần lặp: Đúng 30 lần.'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-sm">
              <HelpCircle className="w-4 h-4" />
              <span>{isEn ? 'Example B: Count numbers divisible by 3 in range 1..50' : 'Ví dụ B: Đếm số chia hết cho 3 trong khoảng 1..50'}</span>
            </div>
            <p className="text-xs text-slate-400">
              {isEn
                ? 'Check numbers from 1 to 50 sequentially, record those divisible by 3 (3, 6, 9, ..., 48), and tally the count.'
                : 'Kiểm tra lần lượt các số từ 1 đến 50 và ghi ra các số chia hết cho 3 (3, 6, 9, ..., 48) rồi đếm số lượng các số đó.'}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-950 text-xs font-mono text-violet-300 border border-slate-800">
              {isEn
                ? '👉 Repeated task: Test if number % 3 == 0 • Repetitions: 50 inspections.'
                : '👉 Công việc lặp: Kiểm tra số % 3 == 0 • Số lần lặp: 50 lần kiểm tra.'}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
          💡 <strong>{isEn ? 'Key Takeaway:' : 'Khái niệm then chốt:'}</strong>{' '}
          {isEn
            ? 'High-level programming languages provide statements that concisely express repetitive steps to construct a '
            : 'Các ngôn ngữ lập trình bậc cao cung cấp các câu lệnh cho phép viết một cách ngắn gọn các bước cần thực hiện lặp đi lặp lại để tạo thành một '}
          <strong>{isEn ? 'loop structure' : 'cấu trúc lặp'}</strong> (Loop structure).
        </div>
      </div>

      {/* Embedded 3D Three.js Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping" />
            <h2 className="text-lg font-bold text-white">
              {isEn
                ? '3D Simulation Lab: Loop Execution Mechanics & Range Function'
                : 'Phòng Thí Nghiệm Mô Phỏng 3D: Cơ Chế Vòng Lặp & Vùng Giá Trị'}
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {isEn
              ? 'Rotate camera, step through iterations, and drag sliders'
              : 'Tương tác xoay góc nhìn, bước từng chu kỳ và kéo thanh trượt'}
          </span>
        </div>

        <LoopFor3DViewer initialMode="carousel" />
      </div>

      {/* 5-Step Lesson Roadmap */}
      <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">
            {isEn ? 'Lesson 20 Learning Roadmap' : 'Lộ Trình Học Tập Bài 20'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {roadmapSteps.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all ${
                item.active
                  ? 'bg-violet-950/40 border-violet-600/50 text-violet-200'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400'
              }`}
            >
              <div className="text-xs font-mono font-bold text-violet-400 mb-1">
                {isEn ? `STAGE ${item.step}` : `CHẶNG ${item.step}`}
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
