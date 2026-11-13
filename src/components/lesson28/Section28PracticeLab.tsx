import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, CheckCircle2, ShieldCheck, Zap, Layers, ArrowRight, BookOpen, Filter } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section28PracticeLab: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  const [activeTask, setActiveTask] = useState<1 | 2 | 3>(1);

  // Task 1 State: Select(A, x)
  const [task1ArrayStr, setTask1ArrayStr] = useState<string>('12, 5, 8.5, 20, 3, 15, 7.2');
  const [task1ThresholdX, setTask1ThresholdX] = useState<number>(8.5);
  const [task1Output, setTask1Output] = useState<number[] | null>(null);

  // Task 2 State: Tach_tu(Str, c)
  const [task2Str, setTask2Str] = useState<string>('chúc mừng năm mới xuân giáp thìn');
  const [task2C, setTask2C] = useState<number>(2); // 0 upper, 1 lower, 2 title
  const [task2Output, setTask2Output] = useState<string[] | null>(null);

  // Task 3 State: 3 modular functions Nhap_Dulieu(), getB(A), getC(A)
  const [task3InputStr, setTask3InputStr] = useState<string>('5 -8 12 0 -3 25 -14 7');
  const [task3A, setTask3A] = useState<number[] | null>(null);
  const [task3B, setTask3B] = useState<number[] | null>(null);
  const [task3C, setTask3C] = useState<number[] | null>(null);

  // Run Task 1
  const runTask1 = () => {
    const arr = task1ArrayStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const b: number[] = [];
    for (let k = 0; k < arr.length; k++) {
      if (arr[k] >= task1ThresholdX) {
        b.push(arr[k]);
      }
    }
    setTask1Output(b);
  };

  // Run Task 2
  const runTask2 = () => {
    const words = task2Str.trim().split(/\s+/).filter(Boolean);
    const converted = words.map(w => {
      if (task2C === 0) return w.toUpperCase();
      if (task2C === 1) return w.toLowerCase();
      // title case: uppercase first char, lower rest
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    });
    setTask2Output(converted);
  };

  // Run Task 3
  const runTask3 = () => {
    const nums = task3InputStr.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
    const b = nums.filter(x => x > 0);
    const c = nums.filter(x => x < 0);
    setTask3A(nums);
    setTask3B(b);
    setTask3C(c);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full w-fit border border-indigo-500/20">
          <span>{isEn ? 'Section 3: Practical Lab' : 'Mục 3: Thực hành'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 138 – 140' : 'Trang 138 – 140 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '3. Practical Lab: Local and Global Variable Mastery' : '3. Thực Hành: Rèn Luyện Kỹ Năng Phạm Vi Biến'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Execute three textbook programming tasks from pages 138–140: conditioned list filtering Select(A, x), multi-mode text styler Tach_tu(Str, c), and 3-function modular pipeline.'
            : 'Thực hiện 3 nhiệm vụ lập trình chuẩn mực SGK trang 138–140: lọc phần tử Select(A, x), tách từ chuyển kiểu chữ Tach_tu(Str, c) và kiến trúc 3 hàm phân loại số dương/âm.'}
        </p>
      </div>

      {/* Task Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex-wrap">
        <button
          onClick={() => setActiveTask(1)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTask === 1
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-300 flex items-center justify-center text-[10px]">1</span>
          <span>{isEn ? 'Task 1: Select(A, x)' : 'Nhiệm vụ 1: Select(A, x)'}</span>
        </button>

        <button
          onClick={() => setActiveTask(2)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTask === 2
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-purple-950 text-purple-300 flex items-center justify-center text-[10px]">2</span>
          <span>{isEn ? 'Task 2: Tach_tu(Str, c)' : 'Nhiệm vụ 2: Tach_tu(Str, c)'}</span>
        </button>

        <button
          onClick={() => setActiveTask(3)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTask === 3
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 flex items-center justify-center text-[10px]">3</span>
          <span>{isEn ? 'Task 3: 3 Modular Functions' : 'Nhiệm vụ 3: Kiến trúc 3 hàm'}</span>
        </button>
      </div>

      {/* TASK 1: Select(A, x) */}
      {activeTask === 1 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {isEn ? 'Practice Task 1 (SGK Page 138)' : 'Thực Hành: Nhiệm vụ 1 (Trang 138 SGK)'}
              </span>
              <span className="text-xs text-slate-500 font-mono">def Select(A, x):</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Filter Elements >= x into a New List' : 'Lọc Danh Sách Giữ Lại Các Phần Tử Lớn Hơn Hoặc Bằng x'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Define function Select(A, x): Filter list A into local list B containing only elements >= x. Returns B.'
                  : 'Viết hàm với đầu vào là danh sách A chứa các số và số thực x. Hàm trả lại danh sách kết quả B từ A bằng cách chỉ giữ lại các phần tử lớn hơn hoặc bằng x.'}
              </p>
            </div>

            {/* Python Code SGK */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 font-mono text-xs space-y-1">
              <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">Select</span>(A, x):</div>
              <div className="pl-4 text-purple-300">B = []  <span className="text-slate-500 text-[11px]"># Biến B kiểu danh sách định nghĩa cục bộ trong hàm</span></div>
              <div className="pl-4 text-slate-300"><span className="text-pink-400">for</span> k <span className="text-pink-400">in</span> <span className="text-cyan-300">range</span>(<span className="text-cyan-300">len</span>(A)):</div>
              <div className="pl-8 text-slate-300"><span className="text-pink-400">if</span> A[k] &gt;= x:</div>
              <div className="pl-12 text-slate-300">B.append(A[k])</div>
              <div className="pl-4 text-pink-400 font-bold">return B</div>
            </div>

            {/* Interactive Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-400 font-mono">Danh sách A (phân tách bởi dấu phẩy):</label>
                <input
                  type="text"
                  value={task1ArrayStr}
                  onChange={(e) => setTask1ArrayStr(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-mono">Ngưỡng x:</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    value={task1ThresholdX}
                    onChange={(e) => setTask1ThresholdX(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-center"
                  />
                  <button
                    onClick={runTask1}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>Lọc</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Box */}
            {task1Output && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 text-xs font-mono space-y-1.5">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span>Điều kiện: A[k] &gt;= {task1ThresholdX}</span>
                  <span className="text-slate-500">Số lượng tìm thấy: {task1Output.length}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-300">Danh sách kết quả B trả về:</span>
                  <span className="text-base font-bold text-emerald-400">[{task1Output.join(', ')}]</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TASK 2: Tach_tu(Str, c) */}
      {activeTask === 2 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {isEn ? 'Practice Task 2 (SGK Pages 138–139)' : 'Thực Hành: Nhiệm vụ 2 (Trang 138 – 139 SGK)'}
              </span>
              <span className="text-xs text-slate-500 font-mono">def Tach_tu(Str, c):</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Multi-Mode Word Splitter and Casing Styler' : 'Tách Từ Và Định Dạng Chữ Hoa / Thường / Tiêu Đề Theo Tham Số c'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Input string Str and mode c: c=0 -> Str.upper(); c=1 -> Str.lower(); c=2 -> Str.title() (capitalizing first letter of each word).'
                  : 'Tách xâu Str thành danh sách từ: Nếu c = 0 chuyển thành chữ in hoa (.upper()); Nếu c = 1 chuyển thành chữ in thường (.lower()); Nếu c = 2 chuyển chữ hoa kí tự đầu mỗi từ (.title()).'}
              </p>
            </div>

            {/* Python Code SGK */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 font-mono text-xs space-y-1">
              <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">Tach_tu</span>(Str, c):</div>
              <div className="pl-4 text-slate-300">A = Str.<span className="text-cyan-300">split</span>()  <span className="text-slate-500"># Tách từ thành danh sách</span></div>
              <div className="pl-4 text-slate-300"><span className="text-pink-400">for</span> k <span className="text-pink-400">in</span> <span className="text-cyan-300">range</span>(<span className="text-cyan-300">len</span>(A)):</div>
              <div className="pl-8 text-slate-300"><span className="text-pink-400">if</span> c == 0: A[k] = A[k].<span className="text-amber-300">upper</span>()</div>
              <div className="pl-8 text-slate-300"><span className="text-pink-400">if</span> c == 1: A[k] = A[k].<span className="text-amber-300">lower</span>()</div>
              <div className="pl-8 text-slate-300"><span className="text-pink-400">if</span> c == 2: A[k] = A[k].<span className="text-amber-300">title</span>()</div>
              <div className="pl-4 text-pink-400 font-bold">return A</div>
            </div>

            {/* Interactive Inputs */}
            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="text-slate-400 font-mono block mb-1">Xâu đầu vào Str:</label>
                <input
                  type="text"
                  value={task2Str}
                  onChange={(e) => setTask2Str(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Tham số điều khiển c:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setTask2C(0)}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      task2C === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    c = 0: IN HOA (upper)
                  </button>
                  <button
                    onClick={() => setTask2C(1)}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      task2C === 1 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    c = 1: in thường (lower)
                  </button>
                  <button
                    onClick={() => setTask2C(2)}
                    className={`py-2 rounded-xl font-bold transition-all cursor-pointer ${
                      task2C === 2 ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    c = 2: Viết Hoa Đầu Từ (title)
                  </button>
                </div>
              </div>

              <button
                onClick={runTask2}
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Chạy hàm Tach_tu(Str, {task2C})</span>
              </button>
            </div>

            {/* Results Box */}
            {task2Output && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 text-xs font-mono space-y-2">
                <div className="text-slate-400 border-b border-slate-800 pb-1">
                  Danh sách kết quả trả về:
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {task2Output.map((word, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                      "{word}"
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TASK 3: Kiến trúc 3 hàm phân loại */}
      {activeTask === 3 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {isEn ? 'Practice Task 3 (SGK Pages 139–140)' : 'Thực Hành: Nhiệm vụ 3 (Trang 139 – 140 SGK)'}
              </span>
              <span className="text-xs text-slate-500 font-mono">Modular Architecture</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                {isEn ? '3-Function Modular Architecture for Positive/Negative Number Separation' : 'Tổ Chức Chương Trình Thành 3 Hàm Riêng Biệt Tách Số Dương & Số Âm'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Modular design: Nhap_Dulieu() reads space-separated integers; getB(A) extracts numbers > 0; getC(A) extracts numbers < 0.'
                  : 'Chương trình được module hoá thành 3 hàm: Nhap_Dulieu() nhập danh sách A; getB(A) trích danh sách B các số > 0; getC(A) trích danh sách C các số < 0.'}
              </p>
            </div>

            {/* Python Code Structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-indigo-400 font-bold">1. def Nhap_Dulieu():</div>
                <div className="text-slate-400 text-[11px]">s = input()</div>
                <div className="text-slate-400 text-[11px]">A = [int(x) for x in s.split()]</div>
                <div className="text-pink-400 font-bold text-[11px]">return A</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold">2. def getB(A):</div>
                <div className="text-slate-400 text-[11px]">B = []</div>
                <div className="text-slate-400 text-[11px]">for x in A: if x &gt; 0: B.append(x)</div>
                <div className="text-pink-400 font-bold text-[11px]">return B</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-cyan-400 font-bold">3. def getC(A):</div>
                <div className="text-slate-400 text-[11px]">C = []</div>
                <div className="text-slate-400 text-[11px]">for x in A: if x &lt; 0: C.append(x)</div>
                <div className="text-pink-400 font-bold text-[11px]">return C</div>
              </div>
            </div>

            {/* Interactive Runner */}
            <div className="space-y-2 pt-2 text-xs">
              <label className="text-slate-400 font-mono block">Nhập dãy số nguyên cách nhau bởi dấu cách (như bàn phím):</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={task3InputStr}
                  onChange={(e) => setTask3InputStr(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  placeholder="VD: 5 -8 12 0 -3 25 -14 7"
                />
                <button
                  onClick={runTask3}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Chạy toàn bộ</span>
                </button>
              </div>
            </div>

            {/* Results Display */}
            {task3A && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-slate-400">Danh sách A = Nhap_Dulieu():</span>
                  <span className="text-white font-bold">[{task3A.join(', ')}]</span>
                </div>
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-emerald-400">Danh sách B = getB(A) (Số dương &gt; 0):</span>
                  <span className="text-emerald-300 font-bold">[{task3B?.join(', ')}]</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-cyan-400">Danh sách C = getC(A) (Số âm &lt; 0):</span>
                  <span className="text-cyan-300 font-bold">[{task3C?.join(', ')}]</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
