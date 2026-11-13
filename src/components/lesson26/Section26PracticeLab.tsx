import React, { useState } from 'react';
import { Terminal, Play, RotateCcw, CheckCircle2, ShieldCheck, Zap, UserCheck } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section26PracticeLab: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  const [activeTask, setActiveTask] = useState<1 | 2>(1);

  // Task 1 State: meeting()
  const [task1Name, setTask1Name] = useState<string>('Nguyễn Thị Mai');
  const [task1Output, setTask1Output] = useState<string | null>(null);

  // Task 2 State: prime(n)
  const [task2N, setTask2N] = useState<number>(13);
  const [task2Trace, setTask2Trace] = useState<{
    k: number;
    divisible: boolean;
    cAfter: number;
  }[] | null>(null);
  const [task2Result, setTask2Result] = useState<boolean | null>(null);

  // Run Task 1
  const runTask1 = () => {
    setTask1Output(isEn ? `Hello  ${task1Name}` : `Xin chào  ${task1Name}`);
  };

  // Run Task 2 (Exact algorithm from SGK pp. 129-130)
  const runTask2 = () => {
    const n = task2N;
    let C = 0;
    let k = 1;
    const steps: { k: number; divisible: boolean; cAfter: number }[] = [];

    while (k < n) {
      const divisible = n % k === 0;
      if (divisible) {
        C = C + 1;
      }
      steps.push({ k, divisible, cAfter: C });
      k = k + 1;
    }

    setTask2Trace(steps);
    setTask2Result(C === 1);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full w-fit border border-emerald-500/20">
          <span>{isEn ? 'Section 3: Practical Lab' : 'Mục 3: Thực hành'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 129 – 130' : 'Trang 129 – 130 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '3. Practical Lab: Defining Functions in Python' : '3. Thực Hành: Thiết Lập Hàm Trong Python'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Build practical functions: meeting() for user interaction and prime(n) for prime number detection using proper divisor counting.'
            : 'Thực hành tạo hàm tương tác người dùng meeting() và thiết lập hàm prime(n) kiểm tra số nguyên tố dựa trên giải thuật đếm ước thực sự C = 1.'}
        </p>
      </div>

      {/* Task Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTask(1)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTask === 1
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{isEn ? 'Task 1: Function meeting()' : 'Nhiệm vụ 1: Hàm meeting() chào hỏi'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTask(2)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTask === 2
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{isEn ? 'Task 2: Function prime(n)' : 'Nhiệm vụ 2: Hàm prime(n) kiểm tra số nguyên tố'}</span>
        </button>
      </div>

      {/* TASK 1: meeting() */}
      {activeTask === 1 && (
        <div className="rounded-2xl border border-purple-500/30 bg-slate-900/90 p-6 shadow-xl space-y-5 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400">
              <UserCheck className="w-4 h-4" />
              <span>{isEn ? 'Task 1 • Page 129 SGK' : 'Nhiệm vụ 1 • Trang 129 SGK'}</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              {isEn
                ? 'Task 1: Write a function prompting user for full name and displaying a greeting'
                : 'Nhiệm vụ 1: Viết hàm yêu cầu người dùng nhập họ tên rồi đưa lời chào ra màn hình'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Define function meeting() without parameters. Read name via input() and print greeting.'
                : 'Hàm meeting() không có tham số, sử dụng lệnh input() để nhập họ tên và print() để xuất lời chào.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Textbook Code Display */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>meeting.py</span>
                <span className="text-purple-400 font-bold">{isEn ? 'SGK Page 129' : 'SGK Trang 129'}</span>
              </div>
              <pre className="p-3 bg-black/70 rounded-lg font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-slate-800/80">
{`def meeting():
    ten = input("Nhập họ tên của em: ")
    print("Xin chào ", ten)

meeting()`}
              </pre>
            </div>

            {/* Interactive Runner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300">
                  {isEn ? 'Your Full Name input (for input()):' : 'Nhập họ tên của em (giả lập input()):'}
                </label>
                <input
                  type="text"
                  value={task1Name}
                  onChange={(e) => setTask1Name(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-purple-500 outline-hidden"
                  placeholder={isEn ? 'e.g. Jane Doe' : 'Ví dụ: Nguyễn Thị Mai'}
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={runTask1}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Call meeting()' : 'Gọi hàm meeting()'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTask1Name(isEn ? 'John Smith' : 'Trần Quang Minh');
                      setTask1Output(null);
                    }}
                    className="px-3 py-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    {isEn ? 'SGK Sample' : 'Mẫu SGK'}
                  </button>
                </div>
              </div>

              {/* Output Display */}
              {task1Output && (
                <div className="p-3.5 rounded-xl bg-black/80 border border-purple-500/40 font-mono text-xs space-y-1.5 animate-in fade-in duration-200">
                  <div className="text-slate-400 text-[11px] flex items-center gap-1 border-b border-slate-800 pb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>{isEn ? 'Console Output:' : 'Màn hình xuất (Console Output):'}</span>
                  </div>
                  <div className="text-emerald-400 font-bold p-2 bg-slate-900 rounded border border-slate-800">
                    {task1Output}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TASK 2: prime(n) */}
      {activeTask === 2 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6 shadow-xl space-y-5 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <Zap className="w-4 h-4" />
              <span>{isEn ? 'Task 2 • Pages 129 – 130 SGK' : 'Nhiệm vụ 2 • Trang 129 – 130 SGK'}</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              {isEn
                ? 'Task 2: Write function prime(n) returning True if n is prime, False otherwise'
                : 'Nhiệm vụ 2: Viết hàm prime(n) với tham số là số tự nhiên n, trả lại True nếu n là số nguyên tố, trả lại False nếu không phải'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'A prime number is greater than 1 with no divisors other than 1 and itself. We count proper divisors from 1 to n - 1 with variable C. n is prime if and only if C = 1.'
                : 'Số nguyên tố là số tự nhiên lớn hơn 1, không có ước nào ngoài 1 và chính nó. Để thiết lập prime(n) cần tính số ước thực sự của n (từ 1 đến n - 1). Biến C dùng để đếm số các ước thực sự của n. Khi đó n là số nguyên tố khi và chỉ khi C = 1.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Textbook Code Display */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>prime_check.py</span>
                <span className="text-emerald-400 font-bold">{isEn ? 'SGK Pages 129 – 130' : 'SGK Trang 129 – 130'}</span>
              </div>
              <pre className="p-3 bg-black/70 rounded-lg font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-slate-800/80">
{`def prime(n):
    C = 0
    k = 1
    while k < n:
        if n % k == 0:
            C = C + 1
        k = k + 1
    if C == 1:
        return True
    else:
        return False`}
              </pre>
            </div>

            {/* Interactive Runner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    {isEn ? 'Number n to test:' : 'Số tự nhiên n cần kiểm tra:'}
                  </label>
                  <span className="font-mono text-emerald-400 font-bold text-sm">
                    n = {task2N}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="35"
                  value={task2N}
                  onChange={(e) => {
                    setTask2N(Number(e.target.value));
                    setTask2Result(null);
                    setTask2Trace(null);
                  }}
                  className="w-full accent-emerald-500 cursor-pointer"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={runTask2}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Execute prime(n)' : 'Chạy hàm prime(n)'}</span>
                  </button>
                  {[7, 9, 13, 15, 29].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setTask2N(val);
                        setTask2Result(null);
                        setTask2Trace(null);
                      }}
                      className={`px-2 py-1 rounded-lg text-xs font-mono cursor-pointer ${
                        task2N === val ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Summary */}
              {task2Result !== null && (
                <div className="p-3.5 rounded-xl bg-black/80 border border-emerald-500/40 font-mono text-xs space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">{isEn ? `Result of prime(${task2N}):` : `Kết quả hàm prime(${task2N}):`}</span>
                    <span className={`px-2.5 py-0.5 rounded font-black text-sm ${
                      task2Result ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}>
                      return {task2Result ? 'True' : 'False'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {task2Result
                      ? (isEn
                          ? `Number ${task2N} has exactly 1 proper divisor (1), so C = 1 -> Prime number!`
                          : `Số ${task2N} chỉ có đúng 1 ước thực sự là 1 (C = 1) -> Là số nguyên tố!`)
                      : (isEn
                          ? `Number ${task2N} has other proper divisors besides 1 -> Not a prime number!`
                          : `Số ${task2N} có các ước thực sự khác ngoài 1 -> Không phải số nguyên tố!`)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Trace Table of Loop */}
          {task2Trace && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
              <div className="text-slate-400 font-bold text-[11px] flex items-center justify-between border-b border-slate-800 pb-1">
                <span>{isEn ? `While loop trace table (k from 1 to ${task2N - 1}):` : `Bảng theo dõi biến lặp while (k từ 1 đến ${task2N - 1}):`}</span>
                <span className="text-emerald-400 font-bold">
                  {isEn ? `Total proper divisors C = ${task2Trace[task2Trace.length - 1]?.cAfter}` : `Tổng ước thực sự C = ${task2Trace[task2Trace.length - 1]?.cAfter}`}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-1.5 max-h-36 overflow-y-auto pt-1">
                {task2Trace.map((st) => (
                  <div
                    key={st.k}
                    className={`p-1.5 rounded-lg border flex flex-col items-center ${
                      st.divisible
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>k = {st.k}</span>
                    <span className="text-[10px] mt-0.5">{st.divisible ? (isEn ? 'Divisor! (C++)' : 'Ước! (C++)') : (isEn ? 'No' : 'Không')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
