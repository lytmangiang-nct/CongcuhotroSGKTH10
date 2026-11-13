import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import {
  Layers,
  GitBranch,
  Repeat,
  ArrowDown,
  BookOpen,
  CheckCircle,
  Sparkles,
  Cpu
} from 'lucide-react';

interface CodeSnippetExample {
  titleVi: string;
  titleEn: string;
  category: 'sequential' | 'selection' | 'loop' | 'composite';
  code: string;
  explanationVi: string;
  explanationEn: string;
  structuresUsedVi: string[];
  structuresUsedEn: string[];
}

export const Section21Structures: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Active structure tab
  const [activeTab, setActiveTab] = useState<'sequential' | 'selection' | 'loop'>('sequential');

  // Interactive Code Classification Challenge
  const [selectedClassification, setSelectedClassification] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  // Snippets for classification game
  const practiceSnippets: CodeSnippetExample[] = [
    {
      titleVi: 'Đoạn mã 1: Tính diện tích hình chữ nhật',
      titleEn: 'Snippet 1: Calculate Rectangle Area',
      category: 'sequential',
      code: `a = float(input("Nhập chiều dài: "))\nb = float(input("Nhập chiều rộng: "))\ns = a * b\nprint("Diện tích là:", s)`,
      explanationVi: 'Các lệnh thực hiện tuần tự lần lượt từ trên xuống dưới, không có rẽ nhánh hay lặp lại.',
      explanationEn: 'Statements execute strictly in order from top to bottom, with no branching or looping.',
      structuresUsedVi: ['Cấu trúc tuần tự'],
      structuresUsedEn: ['Sequential Structure']
    },
    {
      titleVi: 'Đoạn mã 2: Kiểm tra số chẵn lẻ',
      titleEn: 'Snippet 2: Check Even or Odd Number',
      category: 'selection',
      code: `n = int(input("Nhập n: "))\nif n % 2 == 0:\n    print(n, "là số chẵn")\nelse:\n    print(n, "là số lẻ")`,
      explanationVi: 'Sử dụng lệnh rẽ nhánh if-else để chọn hướng thực thi theo điều kiện chia hết cho 2.',
      explanationEn: 'Uses if-else selection construct to choose execution path based on divisibility by 2.',
      structuresUsedVi: ['Cấu trúc tuần tự', 'Cấu trúc rẽ nhánh'],
      structuresUsedEn: ['Sequential Structure', 'Selection Structure']
    },
    {
      titleVi: 'Đoạn mã 3: In bảng cửu chương 7',
      titleEn: 'Snippet 3: Print Multiplication Table for 7',
      category: 'loop',
      code: `k = 1\nwhile k <= 10:\n    print("7 x", k, "=", 7 * k)\n    k = k + 1`,
      explanationVi: 'Sử dụng vòng lặp while để lặp lại 10 lần hành động in phép nhân.',
      explanationEn: 'Uses a while loop to iterate 10 times to print consecutive multiplication rows.',
      structuresUsedVi: ['Cấu trúc tuần tự', 'Cấu trúc lặp'],
      structuresUsedEn: ['Sequential Structure', 'Loop Structure']
    },
    {
      titleVi: 'Đoạn mã 4: Đếm các số chẵn trong dãy 1..50',
      titleEn: 'Snippet 4: Count Even Numbers in 1..50',
      category: 'composite',
      code: `count = 0\nk = 1\nwhile k <= 50:\n    if k % 2 == 0:\n        count = count + 1\n    k = k + 1\nprint("Số lượng số chẵn:", count)`,
      explanationVi: 'Kết hợp cả 3 cấu trúc: tuần tự (gán biến), lặp (while), và rẽ nhánh (if kiểm tra chẵn).',
      explanationEn: 'Harmoniously combines all 3: sequence (assignment), loop (while), and selection (if condition).',
      structuresUsedVi: ['Cấu trúc tuần tự', 'Cấu trúc rẽ nhánh', 'Cấu trúc lặp'],
      structuresUsedEn: ['Sequential Structure', 'Selection Structure', 'Loop Structure']
    }
  ];

  const handleSelectOption = (index: number, value: string) => {
    setSelectedClassification((prev) => ({
      ...prev,
      [index]: value
    }));
  };

  const checkClassificationAnswers = () => {
    setShowResults(true);
  };

  const resetClassification = () => {
    setSelectedClassification({});
    setShowResults(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SGK Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-200 text-sm font-semibold tracking-wide uppercase mb-1">
            <Layers className="w-4 h-4" />
            <span>
              {isEn
                ? 'Section 2 • Informatics 10 KNTT Textbook — Pages 109 & 110'
                : 'Mục 2 • SGK Tin học 10 Kết nối tri thức — Trang 109 & 110'}
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {isEn ? '2. FOUNDATIONAL PROGRAMMING STRUCTURES' : '2. CẤU TRÚC LẬP TRÌNH CƠ BẢN'}
          </h2>
          <p className="text-amber-100 text-sm mt-1">
            {isEn
              ? 'Three fundamental control structures in high-level programming: Sequential, Selection, and Iteration.'
              : 'Ba cấu trúc điều khiển cơ bản trong mọi ngôn ngữ lập trình bậc cao: Tuần tự, Rẽ nhánh và Lặp.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(109);
            setShowOriginalModal(true);
          }}
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/20 transition-all backdrop-blur-sm shadow cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>{isEn ? 'View Textbook Pages 109–110' : 'Xem trang 109 - 110 gốc'}</span>
        </button>
      </div>

      {/* Hoạt động 2: Thảo luận */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-amber-500 text-white font-bold text-xs rounded-full uppercase">
            {isEn ? 'Activity 2' : 'Hoạt động 2'}
          </span>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {isEn
              ? 'Exploring Foundational Programming Structures in Python'
              : 'Tìm hiểu các cấu trúc lập trình cơ bản trong Python'}
          </h3>
        </div>
        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
          {isEn
            ? 'By utilizing the selection statement if and the repetition statements for and while, any Python program can be organized into 3 foundational control structures.'
            : 'Với việc sử dụng câu lệnh rẽ nhánh if và các câu lệnh lặp for, while, chương trình Python nói chung có thể chia thành ba khối lệnh tương ứng với 3 cấu trúc lập trình nền tảng.'}
        </p>

        {/* Tab selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('sequential')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'sequential'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300 dark:ring-blue-800'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-700 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold flex items-center gap-2">
                <ArrowDown className="w-5 h-5 text-blue-300" />
                {isEn ? '1. Sequential' : '1. Cấu trúc Tuần tự'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">Sequential</span>
            </div>
            <p className="text-xs opacity-90">
              {isEn
                ? 'Executes in sequence from top to bottom (assignment, input/output, arithmetic).'
                : 'Thực hiện lần lượt từ trên xuống dưới (gán giá trị, nhập/xuất dữ liệu, tính toán).'}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('selection')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'selection'
                ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-300 dark:ring-amber-800'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400 text-slate-700 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-amber-300" />
                {isEn ? '2. Selection' : '2. Cấu trúc Rẽ nhánh'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">Selection</span>
            </div>
            <p className="text-xs opacity-90">
              {isEn
                ? 'Executes conditionally based on True or False evaluation (if, if-else statements).'
                : 'Thực hiện tuỳ thuộc vào điều kiện đúng hay sai (lệnh rẽ nhánh if, if-else).'}
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('loop')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'loop'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300 dark:ring-emerald-800'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-400 text-slate-700 dark:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold flex items-center gap-2">
                <Repeat className="w-5 h-5 text-emerald-300" />
                {isEn ? '3. Iteration' : '3. Cấu trúc Lặp'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">Iteration</span>
            </div>
            <p className="text-xs opacity-90">
              {isEn
                ? 'Repeatedly executes a statement block while a condition holds true (for, while).'
                : 'Lặp đi lặp lại khối lệnh khi điều kiện còn đúng (lệnh for, while).'}
            </p>
          </button>
        </div>
      </div>

      {/* Structure Deep Dive Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        {activeTab === 'sequential' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <ArrowDown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {isEn ? 'Sequential Structure (Sequence)' : 'Cấu trúc Tuần tự (Sequential Structure)'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {isEn ? 'Default execution pattern of Von Neumann architecture' : 'Mặc định của mọi máy tính Von Neumann / Turing'}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                {isEn ? 'Top to Bottom' : 'Từ trên xuống dưới'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>{isEn ? 'Textbook Definition (Page 109):' : 'Khái niệm SGK (Trang 109):'}</strong>{' '}
                  {isEn
                    ? 'A block consisting of instructions executed in sequence from top to bottom. Represented by variable assignments, input/output calls, and arithmetic operations.'
                    : 'Khối gồm các câu lệnh được thực hiện theo trình tự từ trên xuống dưới. Khối này tương ứng với cấu trúc tuần tự trong chương trình và được thể hiện bằng các câu lệnh như gán giá trị, nhập/xuất dữ liệu, các phép tính đại số...'}
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {isEn ? 'Key Characteristics:' : 'Đặc trưng cấu trúc:'}
                  </div>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                    <li>{isEn ? 'Each instruction executes exactly once.' : 'Mỗi lệnh chỉ được thực thi đúng 1 lần duy nhất.'}</li>
                    <li>{isEn ? 'Order of instructions directly determines the program result.' : 'Thứ tự câu lệnh quyết định kết quả chương trình.'}</li>
                    <li>{isEn ? 'No branching or looping backwards.' : 'Không có đường rẽ ngang hay quay ngược lại.'}</li>
                  </ul>
                </div>
              </div>

              {/* Code & Sơ đồ */}
              <div className="space-y-3">
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                  <div className="text-slate-500 mb-2"># {isEn ? 'Python Sequential Example:' : 'Ví dụ Cấu trúc tuần tự trong Python:'}</div>
                  <div className="text-sky-300"># 1. {isEn ? 'Input' : 'Nhập dữ liệu'}</div>
                  <div>name = input("{isEn ? 'Name: ' : 'Họ tên: '}")</div>
                  <div className="text-sky-300 mt-2"># 2. {isEn ? 'Calculate' : 'Gán và tính toán'}</div>
                  <div>score = float(input("{isEn ? 'Score: ' : 'Điểm: '}"))</div>
                  <div>passed = score &gt;= 5.0</div>
                  <div className="text-sky-300 mt-2"># 3. {isEn ? 'Print output' : 'Xuất kết quả'}</div>
                  <div>print("{isEn ? 'Hello' : 'Chào'}", name, "{isEn ? 'Result:' : 'Kết quả:'}", passed)</div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900 flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-blue-600 shrink-0" />
                  <span className="text-xs text-blue-800 dark:text-blue-300">
                    {isEn ? 'Flowchart: Step 1 ➔ Step 2 ➔ Step 3 ➔ End.' : 'Sơ đồ luồng: Lệnh 1 ➔ Lệnh 2 ➔ Lệnh 3 ➔ Kết thúc.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'selection' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {isEn ? 'Selection / Branching Structure' : 'Cấu trúc Rẽ nhánh (Selection / Branching)'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {isEn ? 'Decides execution path based on a boolean condition (True / False)' : 'Quyết định hướng đi dựa trên biểu thức điều kiện (True/False)'}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-full">
                {isEn ? 'if / if-else Statements' : 'Lệnh if / if-else'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>{isEn ? 'Textbook Definition (Page 110):' : 'Khái niệm SGK (Trang 110):'}</strong>{' '}
                  {isEn
                    ? 'A block of statements executed conditionally depending on whether a boolean expression is True or False. Represented by the if statement.'
                    : 'Khối các câu lệnh chỉ được thực hiện tuỳ thuộc vào điều kiện nào đó là đúng hay sai. Khối lệnh này tương ứng với cấu trúc rẽ nhánh và được thể hiện bằng câu lệnh rẽ nhánh if.'}
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {isEn ? 'Key Characteristics:' : 'Đặc trưng cấu trúc:'}
                  </div>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                    <li>{isEn ? 'Single branch: if <condition>: <block>' : 'Rẽ nhánh khuyết: if <điều kiện>: <khối lệnh>'}</li>
                    <li>{isEn ? 'Two-way branch: if <condition>: ... else: ...' : 'Rẽ nhánh đầy đủ: if <điều kiện>: ... else: ...'}</li>
                    <li>{isEn ? 'Exactly one branch is executed based on truth value.' : 'Chỉ một nhánh được chọn tuỳ thuộc vào giá trị logic (True hay False).'}</li>
                  </ul>
                </div>
              </div>

              {/* Code & Sơ đồ */}
              <div className="space-y-3">
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                  <div className="text-slate-500 mb-2"># {isEn ? 'Python Selection Example:' : 'Ví dụ Cấu trúc rẽ nhánh trong Python:'}</div>
                  <div>temperature = 38.5</div>
                  <div className="text-amber-300 font-bold mt-2">if temperature &gt;= 38.0:</div>
                  <div className="pl-4 text-emerald-400">print("{isEn ? 'Fever detected, please rest!' : 'Bạn bị sốt, cần nghỉ ngơi!'}")</div>
                  <div className="text-amber-300 font-bold">else:</div>
                  <div className="pl-4 text-emerald-400">print("{isEn ? 'Normal body temperature.' : 'Thân nhiệt bình thường.'}")</div>
                </div>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 flex items-center gap-3">
                  <GitBranch className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="text-xs text-amber-800 dark:text-amber-300">
                    {isEn
                      ? 'Diamond test: Condition ➔ True: Block 1 ➔ False: Block 2.'
                      : 'Sơ đồ hình thoi: Kiểm tra <Điều kiện> ➔ Nếu Đúng: Khối 1 ➔ Nếu Sai: Khối 2.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'loop' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Repeat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {isEn ? 'Iterative / Repetition Structure (Loop)' : 'Cấu trúc Lặp (Iteration / Loop Structure)'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {isEn ? 'Repeats actions continuously while a condition remains satisfied' : 'Lặp lại chu trình hành động khi điều kiện còn nghiệm đúng'}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full">
                {isEn ? 'for & while Statements' : 'Lệnh for & while'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>{isEn ? 'Textbook Definition (Page 110):' : 'Khái niệm SGK (Trang 110):'}</strong>{' '}
                  {isEn
                    ? 'A block of statements executed repeatedly while a certain condition holds true. Represented by for and while loop statements.'
                    : 'Khối các câu lệnh được thực hiện lặp đi lặp lại tuỳ theo điều kiện nào đó vẫn còn đúng hay sai. Khối lệnh này tương ứng với cấu trúc lặp và được thể hiện bằng các câu lệnh lặp for, while.'}
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    {isEn ? 'Key Characteristics:' : 'Đặc trưng cấu trúc:'}
                  </div>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                    <li>{isEn ? 'Definite loop (for): Iteration count fixed by sequence or range().' : 'Lặp biết trước (for): Số vòng lặp cố định bởi vùng chỉ mục (range()).'}</li>
                    <li>{isEn ? 'Indefinite loop (while): Iterates until condition turns False.' : 'Lặp chưa biết trước (while): Lặp đến khi điều kiện trở thành False.'}</li>
                    <li>{isEn ? 'Loopback feedback arrow re-evaluates condition at top of cycle.' : 'Mũi tên điều khiển quay ngược lại đỉnh vòng lặp để tái thẩm định điều kiện.'}</li>
                  </ul>
                </div>
              </div>

              {/* Code & Sơ đồ */}
              <div className="space-y-3">
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                  <div className="text-slate-500 mb-2"># {isEn ? 'Python Loop Example:' : 'Ví dụ Cấu trúc lặp while trong Python:'}</div>
                  <div>k = 1</div>
                  <div className="text-emerald-300 font-bold">while k &lt;= 5:</div>
                  <div className="pl-4 text-sky-300">print("{isEn ? 'Iteration #' : 'Lần lặp thứ:'}", k)</div>
                  <div className="pl-4 text-amber-300">k = k + 1  <span className="text-slate-500">{isEn ? '# Update condition' : '# Cập nhật điều kiện'}</span></div>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900 flex items-center gap-3">
                  <Repeat className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs text-emerald-800 dark:text-emerald-300">
                    {isEn
                      ? 'Loop cycle: Test condition ➔ True: Body ➔ Loop back ➔ False: Exit.'
                      : 'Sơ đồ chu trình kín: Kiểm tra điều kiện ➔ Đúng: Khối lệnh ➔ Quay lại kiểm tra ➔ Sai: Thoát.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ghi nhớ 2 Box (SGK Trang 110) - High Contrast WCAG */}
      <div className="border-2 border-dashed border-amber-500 bg-amber-50/90 dark:bg-amber-950/40 rounded-2xl p-6 relative shadow-lg">
        <div className="absolute -top-3 left-6 px-3 py-0.5 bg-amber-600 text-white font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isEn ? 'Key Takeaway 2 (Textbook Page 110)' : 'Ghi nhớ 2 (SGK Trang 110)'}</span>
        </div>
        <div className="text-amber-950 dark:text-amber-100 text-base md:text-lg font-bold leading-relaxed mt-1">
          {isEn
            ? 'The three foundational programming structures of high-level programming languages are: sequential structure, selection (branching) structure, and repetition (loop) structure.'
            : 'Ba cấu trúc lập trình cơ bản của các ngôn ngữ lập trình bậc cao gồm: cấu trúc tuần tự, cấu trúc rẽ nhánh, cấu trúc lặp.'}
        </div>
        <div className="mt-4 pt-3 border-t border-amber-300 dark:border-amber-800/60 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0"></span>
            <div className="flex-1">
              <strong>{isEn ? '1. Sequential:' : '1. Tuần tự:'}</strong>{' '}
              {isEn ? 'Statements execute in strict sequence from top to bottom.' : 'Khối lệnh thực hiện lần lượt từ trên xuống dưới.'}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0"></span>
            <div className="flex-1">
              <strong>{isEn ? '2. Selection:' : '2. Rẽ nhánh:'}</strong>{' '}
              {isEn ? 'Statements execute conditionally based on boolean truth.' : 'Khối lệnh thực hiện phụ thuộc điều kiện logic.'}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0"></span>
            <div className="flex-1">
              <strong>{isEn ? '3. Loop:' : '3. Lặp:'}</strong>{' '}
              {isEn ? 'Statements repeat continuously while condition remains true.' : 'Khối lệnh lặp đi lặp lại khi điều kiện còn đúng.'}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Activity: Phân loại cấu trúc lập trình */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>{isEn ? 'Interactive Challenge' : 'Thử thách tương tác'}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {isEn
                ? 'Classify Control Structures in Real-World Python Snippets'
                : 'Phân tích cấu trúc trong các đoạn mã Python thực tế'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEn
                ? 'Identify the dominant control structure or combination of structures in each snippet:'
                : 'Hãy xác định cấu trúc lập trình chủ đạo hoặc các cấu trúc được phối hợp trong mỗi đoạn mã sau:'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetClassification}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {isEn ? 'Reset' : 'Làm lại'}
            </button>
            <button
              type="button"
              onClick={checkClassificationAnswers}
              className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg shadow transition-all cursor-pointer"
            >
              {isEn ? 'Check Answers' : 'Kiểm tra đáp án'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {practiceSnippets.map((snippet, idx) => {
            const currentSelected = selectedClassification[idx];
            const isAnswered = currentSelected !== undefined;
            const isCorrect = currentSelected === snippet.category;

            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-between"
              >
                <div>
                  <div className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-2">
                    {isEn ? snippet.titleEn : snippet.titleVi}
                  </div>
                  <pre className="p-3 bg-slate-950 text-emerald-400 rounded-lg font-mono text-xs overflow-x-auto border border-slate-800 mb-3">
                    {snippet.code}
                  </pre>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    {isEn ? 'Select dominant structure:' : 'Chọn loại cấu trúc chủ đạo:'}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'sequential', label: isEn ? '1. Sequential' : '1. Tuần tự' },
                      { id: 'selection', label: isEn ? '2. Selection' : '2. Rẽ nhánh' },
                      { id: 'loop', label: isEn ? '3. Iteration' : '3. Lặp' },
                      { id: 'composite', label: isEn ? '4. Composite (All 3)' : '4. Kết hợp cả 3' }
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => handleSelectOption(idx, opt.id)}
                        className={`px-2.5 py-1.5 text-xs rounded-lg border font-medium text-left transition-all cursor-pointer ${
                          currentSelected === opt.id
                            ? showResults
                              ? opt.id === snippet.category
                                ? 'bg-emerald-500 text-white font-bold border-emerald-600 shadow-sm'
                                : 'bg-rose-500 text-white font-bold border-rose-600 shadow-sm'
                              : 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {showResults && (
                    <div
                      className={`mt-2 p-2.5 rounded-lg text-xs flex items-start gap-2 border ${
                        isCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                      }`}
                    >
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isCorrect ? 'text-emerald-500' : 'text-amber-500'}`} />
                      <div>
                        <div className="font-bold">
                          {isEn ? 'Standard Explanation:' : 'Giải thích chuẩn SGK:'}
                        </div>
                        <div className="text-xs opacity-90 mt-0.5">
                          {isEn ? snippet.explanationEn : snippet.explanationVi}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
