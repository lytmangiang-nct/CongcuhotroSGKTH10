import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, CheckCircle2, ShieldCheck, Zap, Layers, ArrowRight, BookOpen } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section27PracticeLab: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  const [activeTask, setActiveTask] = useState<1 | 2 | 3>(1);

  // Task 1 State: f_sum(A, b)
  const [task1ListStr, setTask1ListStr] = useState<string>('5, -2, 10, -8, 15, 0');
  const [task1B, setTask1B] = useState<number>(0);
  const [task1Output, setTask1Output] = useState<{
    sum: number;
    rule: string;
    itemsIncluded: number[];
  } | null>(null);

  // Task 2 State: f_dem(msg, sep)
  const [task2Msg, setTask2Msg] = useState<string>('Mùa thu lịch sử');
  const [task2Sep, setTask2Sep] = useState<string>(' ');
  const [task2Output, setTask2Output] = useState<{
    count: number;
    words: string[];
  } | null>(null);

  // Task 3 State: merge_str(s1, s2)
  const [task3S1, setTask3S1] = useState<string>('1111');
  const [task3S2, setTask3S2] = useState<string>('0000');
  const [task3Output, setTask3Output] = useState<{
    merged: string;
    minLen: number;
    remaining: string;
    longerWhich: 's1' | 's2' | 'equal';
    stepTrace: { i: number; c1: string; c2: string; cumulative: string }[];
  } | null>(null);

  // Run Task 1
  const runTask1 = () => {
    const arr = task1ListStr.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    let s = 0;
    const included: number[] = [];

    for (const x of arr) {
      if (task1B === 0) {
        s += x;
        included.push(x);
      } else {
        if (x > 0) {
          s += x;
          included.push(x);
        }
      }
    }

    setTask1Output({
      sum: s,
      rule: task1B === 0
        ? (isEn ? 'b = 0: Sum of ALL numbers in list A' : 'b = 0: Tính tổng TẤT CẢ các số của danh sách A')
        : (isEn ? 'b != 0: Sum of POSITIVE numbers only (x > 0)' : 'b khác 0: Chỉ tính tổng các số DƯƠNG (x > 0)'),
      itemsIncluded: included
    });
  };

  // Run Task 2
  const runTask2 = () => {
    const delimiter = task2Sep === '' ? ' ' : task2Sep;
    const xlist = task2Msg.split(delimiter);
    setTask2Output({
      count: xlist.length,
      words: xlist
    });
  };

  // Run Task 3
  const runTask3 = () => {
    const s1 = task3S1;
    const s2 = task3S2;
    const l1 = s1.length;
    const l2 = s2.length;
    const l = Math.min(l1, l2);

    let res = '';
    const trace: { i: number; c1: string; c2: string; cumulative: string }[] = [];

    for (let i = 0; i < l; i++) {
      res += s1[i] + s2[i];
      trace.push({
        i,
        c1: s1[i],
        c2: s2[i],
        cumulative: res
      });
    }

    let rem = '';
    let longer: 's1' | 's2' | 'equal' = 'equal';

    if (l1 < l2) {
      rem = s2.slice(l);
      res += rem;
      longer = 's2';
    } else if (l2 < l1) {
      rem = s1.slice(l);
      res += rem;
      longer = 's1';
    }

    setTask3Output({
      merged: res,
      minLen: l,
      remaining: rem,
      longerWhich: longer,
      stepTrace: trace
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full w-fit border border-purple-500/20">
          <span>{isEn ? 'Section 3: Practical Lab' : 'Mục 3: Thực hành'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 134 – 135' : 'Trang 134 – 135 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '3. Practical Lab: Passing Values to Function Arguments' : '3. Thực Hành: Truyền Giá Trị Cho Đối Số Của Hàm'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Complete three official programming tasks from pages 134–135: conditioned list summation, delimiter-aware word counting, and alternating string interleaving.'
            : 'Thực hiện 3 nhiệm vụ lập trình chuẩn SGK: hàm f_sum(A, b) tính tổng theo cờ điều kiện, hàm f_dem(msg, sep) đếm từ với kí tự phân tách, và hàm merge_str(s1, s2) đan xen xâu kí tự.'}
        </p>
      </div>

      {/* Task Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex-wrap">
        <button
          onClick={() => setActiveTask(1)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTask === 1
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-purple-950 text-purple-300 flex items-center justify-center text-[10px]">1</span>
          <span>{isEn ? 'Task 1: f_sum(A, b)' : 'Nhiệm vụ 1: f_sum(A, b)'}</span>
        </button>

        <button
          onClick={() => setActiveTask(2)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTask === 2
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-blue-950 text-blue-300 flex items-center justify-center text-[10px]">2</span>
          <span>{isEn ? 'Task 2: f_dem(msg, sep)' : 'Nhiệm vụ 2: f_dem(msg, sep)'}</span>
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
          <span>{isEn ? 'Task 3: merge_str(s1, s2)' : 'Nhiệm vụ 3: merge_str(s1, s2)'}</span>
        </button>
      </div>

      {/* TASK 1: f_sum(A, b) */}
      {activeTask === 1 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {isEn ? 'Practice Task 1 (SGK Page 134)' : 'Thực Hành: Nhiệm vụ 1 (Trang 134 SGK)'}
              </span>
              <span className="text-xs text-slate-500 font-mono">def f_sum(A, b):</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Conditioned List Summation Function' : 'Thiết Lập Hàm Tính Tổng Danh Sách Theo Quy Định'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Define function f_sum(A, b): If b == 0, calculate the total sum of list A. If b != 0, calculate the sum of positive numbers only.'
                  : 'Thiết lập hàm f_sum(A, b) có chức năng tính tổng các số của danh sách A theo quy định: Nếu b = 0 thì tính tổng các số của danh sách A; Nếu b khác 0 thì chỉ tính tổng các số dương của A.'}
              </p>
            </div>

            {/* Python Code SGK */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 font-mono text-xs space-y-1">
              <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">f_sum</span>(A, b):</div>
              <div className="pl-4 text-slate-300">S = 0</div>
              <div className="pl-4 text-slate-300"><span className="text-pink-400">for</span> x <span className="text-pink-400">in</span> A:</div>
              <div className="pl-8 text-slate-300"><span className="text-pink-400">if</span> b == 0:</div>
              <div className="pl-12 text-slate-300">S = S + x  <span className="text-slate-500">{isEn ? '# b=0: add all elements' : '# b=0: cộng tất cả'}</span></div>
              <div className="pl-8 text-slate-300"><span className="text-pink-400">else</span>:</div>
              <div className="pl-12 text-slate-300"><span className="text-pink-400">if</span> x &gt; 0:</div>
              <div className="pl-16 text-slate-300">S = S + x  <span className="text-slate-500">{isEn ? '# b!=0: add positive elements only' : '# b!=0: chỉ cộng số dương'}</span></div>
              <div className="pl-4 text-pink-400 font-bold">return S</div>
            </div>

            {/* Interactive Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-400 font-mono">
                  {isEn ? 'List A (comma-separated):' : 'Danh sách A (phân tách bởi dấu phẩy):'}
                </label>
                <input
                  type="text"
                  value={task1ListStr}
                  onChange={(e) => setTask1ListStr(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-mono">
                  {isEn ? 'Argument b (0 or non-zero):' : 'Đối số b (0 hoặc số khác 0):'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={task1B}
                    onChange={(e) => setTask1B(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-center"
                  />
                  <button
                    onClick={runTask1}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isEn ? 'Run' : 'Chạy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Results Box */}
            {task1Output && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 text-xs space-y-2 font-mono">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span>{isEn ? 'Applied rule:' : 'Quy tắc áp dụng:'} <strong className="text-purple-300">{task1Output.rule}</strong></span>
                  <span className="text-slate-500">f_sum(A, {task1B})</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-300">{isEn ? 'Included elements:' : 'Các phần tử được cộng:'} [{task1Output.itemsIncluded.join(', ')}]</span>
                  <span className="text-lg font-bold text-emerald-400">{isEn ? 'Sum S = ' : 'Tổng S = '}{task1Output.sum}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TASK 2: f_dem(msg, sep) */}
      {activeTask === 2 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {isEn ? 'Practice Task 2 (SGK Page 134)' : 'Thực Hành: Nhiệm vụ 2 (Trang 134 SGK)'}
              </span>
              <span className="text-xs text-slate-500 font-mono">def f_dem(msg, sep):</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Custom Delimiter Word Counter Function' : 'Thiết Lập Hàm Đếm Số Từ Của Xâu Kí Tự Theo Kí Tự Tách Từ'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Define function f_dem(msg, sep) to count words in string msg using separator sep. Hint: msg.split(sep) splits into words, return len(xlist).'
                  : 'Thiết lập hàm f_dem(msg, sep) có chức năng đếm số các từ của một xâu msg với kí tự tách từ là sep. Hướng dẫn: Dùng msg.split(sep) và trả về len(xlist).'}
              </p>
            </div>

            {/* Python Code SGK */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 font-mono text-xs space-y-1">
              <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">f_dem</span>(msg, sep):</div>
              <div className="pl-4 text-slate-300">xlist = msg.<span className="text-cyan-300">split</span>(sep)</div>
              <div className="pl-4 text-pink-400 font-bold">return <span className="text-cyan-300">len</span>(xlist)</div>
            </div>

            {/* Interactive Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-slate-400 font-mono">
                  {isEn ? 'String msg:' : 'Xâu msg:'}
                </label>
                <input
                  type="text"
                  value={task2Msg}
                  onChange={(e) => setTask2Msg(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-mono">
                  {isEn ? 'Separator sep:' : 'Kí tự tách từ sep:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={task2Sep}
                    onChange={(e) => setTask2Sep(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-center"
                    placeholder="VD: ' ' hoặc '-'"
                  />
                  <button
                    onClick={runTask2}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isEn ? 'Count' : 'Đếm'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SGK Presets */}
            <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
              <span className="text-slate-400">{isEn ? 'SGK Samples:' : 'Ví dụ SGK:'}</span>
              <button
                onClick={() => {
                  setTask2Msg('Mùa thu lịch sử');
                  setTask2Sep(' ');
                  const xl = 'Mùa thu lịch sử'.split(' ');
                  setTask2Output({ count: xl.length, words: xl });
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono cursor-pointer"
              >
                f_dem("Mùa thu lịch sử", " ") -&gt; 4
              </button>
              <button
                onClick={() => {
                  setTask2Msg('Mùa thu lịch sử');
                  setTask2Sep('-');
                  const xl = 'Mùa thu lịch sử'.split('-');
                  setTask2Output({ count: xl.length, words: xl });
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono cursor-pointer"
              >
                f_dem("Mùa thu lịch sử", "-") -&gt; 1
              </button>
            </div>

            {/* Results Box */}
            {task2Output && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/40 text-xs space-y-2 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">{isEn ? 'Word list xlist:' : 'Danh sách từ xlist:'} [{task2Output.words.map(w => `"${w}"`).join(', ')}]</span>
                  <span className="text-lg font-bold text-cyan-400">{task2Output.count} {isEn ? 'words' : 'từ'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TASK 3: merge_str(s1, s2) */}
      {activeTask === 3 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {isEn ? 'Practice Task 3 (SGK Pages 134–135)' : 'Thực Hành: Nhiệm vụ 3 (Trang 134 – 135 SGK)'}
              </span>
              <span className="text-xs text-slate-500 font-mono">def merge_str(s1, s2):</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Interleaving String Merger Function' : 'Thiết Lập Hàm Gộp Hai Xâu Đan Xen Kí Tự'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Define merge_str(s1, s2): Alternately take characters from s1 and s2 into output string S. When one string is exhausted, append the remainder of the longer string.'
                  : 'Gộp hai xâu s1, s2 bằng cách lấy lần lượt từng kí tự của s1, s2 đưa vào xâu kết quả. Nếu một xâu hết kí tự thì đưa phần còn lại của xâu dài hơn vào xâu kết quả. Ví dụ: s1 = "1111", s2 = "0000" -> "10101010".'}
              </p>
            </div>

            {/* Python Code SGK */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 font-mono text-xs space-y-1">
              <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">merge_str</span>(s1, s2):</div>
              <div className="pl-4 text-slate-300">S = <span className="text-amber-200">""</span></div>
              <div className="pl-4 text-slate-300">l1 = <span className="text-cyan-300">len</span>(s1); l2 = <span className="text-cyan-300">len</span>(s2)</div>
              <div className="pl-4 text-slate-300">l = <span className="text-cyan-300">min</span>(l1, l2)</div>
              <div className="pl-4 text-slate-300"><span className="text-pink-400">for</span> i <span className="text-pink-400">in</span> <span className="text-cyan-300">range</span>(l): S = S + s1[i] + s2[i]</div>
              <div className="pl-4 text-slate-300"><span className="text-pink-400">if</span> l1 &lt; l2:</div>
              <div className="pl-8 text-slate-300"><span className="text-pink-400">for</span> i <span className="text-pink-400">in</span> <span className="text-cyan-300">range</span>(l, l2): S = S + s2[i]</div>
              <div className="pl-4 text-slate-300"><span className="text-pink-400">if</span> l2 &lt; l1:</div>
              <div className="pl-8 text-slate-300"><span className="text-pink-400">for</span> i <span className="text-pink-400">in</span> <span className="text-cyan-300">range</span>(l, l1): S = S + s1[i]</div>
              <div className="pl-4 text-pink-400 font-bold">return S</div>
            </div>

            {/* Interactive Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="space-y-1">
                <label className="text-slate-400 font-mono">
                  {isEn ? 'String s1:' : 'Xâu s1:'}
                </label>
                <input
                  type="text"
                  value={task3S1}
                  onChange={(e) => setTask3S1(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-mono">
                  {isEn ? 'String s2:' : 'Xâu s2:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={task3S2}
                    onChange={(e) => setTask3S2(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                  <button
                    onClick={runTask3}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1 shrink-0 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isEn ? 'Merge' : 'Gộp'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
              <span className="text-slate-400">{isEn ? 'Presets:' : 'Tình huống thử:'}</span>
              <button
                onClick={() => {
                  setTask3S1('1111');
                  setTask3S2('0000');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono cursor-pointer"
              >
                {isEn ? 'Equal lengths: "1111" + "0000"' : 'Độ dài bằng nhau: "1111" + "0000"'}
              </button>
              <button
                onClick={() => {
                  setTask3S1('ABC');
                  setTask3S2('123456');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono cursor-pointer"
              >
                {isEn ? 's2 longer: "ABC" + "123456"' : 's2 dài hơn: "ABC" + "123456"'}
              </button>
              <button
                onClick={() => {
                  setTask3S1('Python3');
                  setTask3S2('abc');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono cursor-pointer"
              >
                {isEn ? 's1 longer: "Python3" + "abc"' : 's1 dài hơn: "Python3" + "abc"'}
              </button>
            </div>

            {/* Results Box */}
            {task3Output && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 text-xs space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">
                    min(l1={task3S1.length}, l2={task3S2.length}) = {task3Output.minLen} {isEn ? 'interleaving rounds' : 'vòng đan xen'}
                  </span>
                  <span className="text-base font-bold text-emerald-400">
                    merge_str = "{task3Output.merged}"
                  </span>
                </div>

                {task3Output.remaining && (
                  <div className="text-[11px] text-amber-300">
                    {isEn
                      ? `➜ Remainder of ${task3Output.longerWhich} appended directly: "${task3Output.remaining}"`
                      : `➜ Phần dư của ${task3Output.longerWhich} được chắp nối trực tiếp vào đuôi: "${task3Output.remaining}"`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
