import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  Play,
  BookOpen,
  CheckCircle,
  Sparkles,
  Award,
  Code
} from 'lucide-react';

export const Section20PracticeLab: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Task 1 State (Ước số)
  const [task1N, setTask1N] = useState<number>(10);
  const [task1Output, setTask1Output] = useState<string>('');
  const [task1Divisors, setTask1Divisors] = useState<number[]>([]);
  const [isTask1Running, setIsTask1Running] = useState<boolean>(false);

  // Task 2 State (Ước số thực sự)
  const [task2N, setTask2N] = useState<number>(10);
  const [task2ProperDivisors, setTask2ProperDivisors] = useState<number[]>([]);
  const [task2Count, setTask2Count] = useState<number | null>(null);
  const [isTask2Running, setIsTask2Running] = useState<boolean>(false);

  // Fill in the blank challenge state
  const [fillAnswers, setFillAnswers] = useState({
    b1: '',
    b2: '',
    b3: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean | null>(null);

  // Run Task 1
  const handleRunTask1 = () => {
    setIsTask1Running(true);
    const divs: number[] = [];
    for (let k = 1; k <= task1N; k++) {
      if (task1N % k === 0) {
        divs.push(k);
      }
    }
    setTask1Divisors(divs);
    setTask1Output(divs.join(' '));
    setTimeout(() => setIsTask1Running(false), 300);
  };

  // Run Task 2
  const handleRunTask2 = () => {
    setIsTask2Running(true);
    const proper: number[] = [];
    for (let k = 1; k < task2N; k++) {
      if (task2N % k === 0) {
        proper.push(k);
      }
    }
    setTask2ProperDivisors(proper);
    setTask2Count(proper.length);
    setTimeout(() => setIsTask2Running(false), 300);
  };

  // Check Fill in the blank
  const handleCheckFill = () => {
    const isB1 = fillAnswers.b1.trim() === 'range(1, n + 1)' || fillAnswers.b1.trim() === 'range(1,n+1)';
    const isB2 = fillAnswers.b2.trim() === 'n % k == 0' || fillAnswers.b2.trim() === 'n%k==0';
    const isB3 = fillAnswers.b3.trim() === 'range(1, n)' || fillAnswers.b3.trim() === 'range(1,n)';

    setFillChecked(isB1 && isB2 && isB3);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono">
              <BilingualText
                vi="THỰC HÀNH • TRANG 107"
                en="PRACTICE LAB • PAGE 107"
              />
            </span>
            <span className="text-xs text-slate-400">
              <BilingualText
                vi="Ước số & Ước số thực sự của số tự nhiên n"
                en="Divisors & Proper Divisors of Natural Number n"
              />
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            <BilingualText
              vi="3. THỰC HÀNH: LỆNH LẶP FOR VÀ LỆNH RANGE()"
              en="3. PRACTICE LAB: THE FOR LOOP AND RANGE() FUNCTION"
            />
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(107);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>{isEn ? 'Original Page 107' : 'Đối chiếu Trang 107 SGK'}</span>
        </button>
      </div>

      {/* Nhiệm vụ 1: In dãy các ước số theo hàng ngang */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-sm">
              {isEn ? 'Task 1' : 'NV 1'}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                <BilingualText
                  vi="Nhiệm vụ 1: Nhập số tự nhiên n và in ra các ước số theo chiều ngang (Trang 107)"
                  en="Task 1: Input natural number n and print all divisors horizontally (Page 107)"
                />
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Use range(1, n + 1), divisibility test n % k == 0 and end = " "'
                  : 'Sử dụng range(1, n + 1), điều kiện chia hết n % k == 0 và end = " "'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Source Code */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-[11px] text-slate-500 font-sans font-bold flex items-center justify-between">
              <span>{isEn ? 'Program: Divisors.py' : 'Chương trình: UocSo.py'}</span>
              <span className="text-emerald-400">Python 3.x</span>
            </div>
            <pre className="text-slate-300">
              n = <span className="text-violet-400">int</span>(<span className="text-violet-400">input</span>(<span className="text-amber-300">{isEn ? '"Enter natural number n: "' : '"Nhập số tự nhiên n: "'}</span>)){'\n'}
              <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>(1, n + 1):{'\n'}
              {'    '}<span className="text-violet-400">if</span> n % k == 0:{'\n'}
              {'        '}<span className="text-emerald-400">print</span>(k, end = <span className="text-amber-300">" "</span>)
            </pre>
          </div>

          {/* Interactive Runner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                {isEn ? 'Enter n to test run:' : 'Nhập n để chạy thử:'}
              </span>
              <div className="flex items-center gap-1.5">
                {[10, 12, 28, 60].map((presetVal) => (
                  <button
                    key={presetVal}
                    type="button"
                    onClick={() => { setTask1N(presetVal); }}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                      task1N === presetVal
                        ? 'bg-violet-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    n={presetVal}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="500"
                value={task1N}
                onChange={(e) => setTask1N(Math.max(1, Number(e.target.value)))}
                className="w-24 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400 font-bold focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleRunTask1}
                disabled={isTask1Running}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isEn ? 'Run Code' : 'Chạy Mã (Run)'}</span>
              </button>
            </div>

            {/* Output terminal */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-500 text-[10px]">OUTPUT TERMINAL:</div>
              <div className="text-slate-300">
                {isEn ? 'Enter natural number n: ' : 'Nhập số tự nhiên n: '}
                <span className="text-amber-400 font-bold">{task1N}</span>
              </div>
              <div className="text-emerald-400 font-bold text-sm">
                {task1Output || '1 2 5 10'}
              </div>
              <div className="text-[11px] text-slate-400 pt-1">
                {isEn ? `👉 Total divisors: ${task1Divisors.length || 4}` : `👉 Số lượng ước số: ${task1Divisors.length || 4} ước`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nhiệm vụ 2: Đếm số các ước số thực sự */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              {isEn ? 'Task 2' : 'NV 2'}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                <BilingualText
                  vi="Nhiệm vụ 2: Đếm số các ước số thực sự của n (Trang 107)"
                  en="Task 2: Count Proper Divisors of Natural Number n (Page 107)"
                />
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'A proper divisor is any natural number k < n that divides n without remainder'
                  : 'Ước số thực sự là số tự nhiên k < n và là ước của n (loại bỏ n)'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Source Code */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-[11px] text-slate-500 font-sans font-bold flex items-center justify-between">
              <span>{isEn ? 'Program: CountProperDivisors.py' : 'Chương trình: DemUocThucSu.py'}</span>
              <span className="text-emerald-400">Python 3.x</span>
            </div>
            <pre className="text-slate-300">
              n = <span className="text-violet-400">int</span>(<span className="text-violet-400">input</span>(<span className="text-amber-300">{isEn ? '"Enter natural number n: "' : '"Nhập số tự nhiên n: "'}</span>)){'\n'}
              count = 0{'\n'}
              <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>(1, n):  <span className="text-slate-500">{isEn ? '# Note: stops strictly before n' : '# Chú ý: dừng trước n'}</span>{'\n'}
              {'    '}<span className="text-violet-400">if</span> n % k == 0:{'\n'}
              {'        '}count = count + 1{'\n'}
              <span className="text-emerald-400">print</span>(count)
            </pre>
          </div>

          {/* Interactive Runner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                {isEn ? 'Enter n to count proper divisors:' : 'Nhập n để đếm ước thực sự:'}
              </span>
              <div className="flex items-center gap-1.5">
                {[10, 12, 28, 100].map((presetVal) => (
                  <button
                    key={presetVal}
                    type="button"
                    onClick={() => { setTask2N(presetVal); }}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                      task2N === presetVal
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    n={presetVal}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="2"
                max="500"
                value={task2N}
                onChange={(e) => setTask2N(Math.max(2, Number(e.target.value)))}
                className="w-24 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400 font-bold focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleRunTask2}
                disabled={isTask2Running}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isEn ? 'Run Code' : 'Chạy Mã (Run)'}</span>
              </button>
            </div>

            {/* Output terminal */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-500 text-[10px]">OUTPUT TERMINAL:</div>
              <div className="text-slate-300">
                {isEn ? 'Enter natural number n: ' : 'Nhập số tự nhiên n: '}
                <span className="text-amber-400 font-bold">{task2N}</span>
              </div>
              <div className="text-slate-300 text-xs">
                {isEn ? `Proper divisors (${task2ProperDivisors.length || 3}): ` : `Các ước thực sự (${task2ProperDivisors.length || 3} số): `}
                <span className="text-sky-300 font-bold">
                  {task2ProperDivisors.length > 0 ? task2ProperDivisors.join(', ') : '1, 2, 5'}
                </span>
              </div>
              <div className="text-emerald-400 font-black text-base pt-1">
                {isEn ? 'Printed result: ' : 'Kết quả in ra: '}{task2Count !== null ? task2Count : 3}
              </div>
            </div>
          </div>
        </div>

        {/* Insight on Perfect Numbers (Số hoàn hảo) */}
        {task2N === 28 && (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 space-y-1 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>
                {isEn
                  ? 'Fascinating Mathematical Insight: 28 is a Perfect Number!'
                  : 'Khám phá toán học thú vị: Số 28 là Số Hoàn Hảo (Perfect Number)!'}
              </span>
            </div>
            <p className="text-slate-200">
              {isEn
                ? <>The sum of proper divisors of 28 is: <code className="text-amber-300 font-mono font-bold">1 + 2 + 4 + 7 + 14 = 28</code>, which exactly equals the number itself!</>
                : <>Tổng các ước số thực sự của 28 là: <code className="text-amber-300 font-mono font-bold">1 + 2 + 4 + 7 + 14 = 28</code>, đúng bằng chính số đó!</>}
            </p>
          </div>
        )}
      </div>

      {/* BÀI TẬP TƯƠNG TÁC TẠI CHỖ: Điền Khuyết Mã Lệnh Python */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-violet-800/40 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                <BilingualText
                  vi="Thử Thách Tương Tác: Điền Khuyết Cú Pháp Vòng Lặp"
                  en="Interactive Challenge: Fill-in-the-Blank Loop Syntax"
                />
              </h3>
              <p className="text-xs text-slate-400">
                <BilingualText
                  vi="Hoàn thiện các vị trí còn thiếu trong 2 bài toán tìm ước số"
                  en="Complete missing code blocks in the two divisor algorithms"
                />
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckFill}
            className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold cursor-pointer transition-all shadow-md"
          >
            {isEn ? 'Grade Challenge' : 'Chấm Điểm Thử Thách'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* Card 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-slate-300 font-sans font-bold text-xs">
              {isEn ? 'Code Snippet 1: Find all divisors of n (including n)' : 'Đoạn mã 1: Tìm tất cả ước số của n (kể cả n)'}
            </div>
            <div className="space-y-2 text-slate-300">
              <div>for k in <input
                type="text"
                placeholder={isEn ? 'range(...)' : 'range(...)'}
                value={fillAnswers.b1}
                onChange={(e) => setFillAnswers({ ...fillAnswers, b1: e.target.value })}
                className="w-36 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-bold focus:outline-hidden"
              />:</div>
              <div>{'    '}if <input
                type="text"
                placeholder={isEn ? 'Divisibility test...' : 'Điều kiện chia hết...'}
                value={fillAnswers.b2}
                onChange={(e) => setFillAnswers({ ...fillAnswers, b2: e.target.value })}
                className="w-32 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-amber-400 font-bold focus:outline-hidden"
              />:</div>
              <div className="pl-8 text-slate-400">print(k, end = " ")</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-slate-300 font-sans font-bold text-xs">
              {isEn ? 'Code Snippet 2: Count proper divisors (k < n)' : 'Đoạn mã 2: Đếm ước số thực sự (k < n)'}
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="text-slate-500">count = 0</div>
              <div>for k in <input
                type="text"
                placeholder={isEn ? 'range(...)' : 'range(...)'}
                value={fillAnswers.b3}
                onChange={(e) => setFillAnswers({ ...fillAnswers, b3: e.target.value })}
                className="w-32 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-sky-400 font-bold focus:outline-hidden"
              />:</div>
              <div className="pl-4 text-slate-400">if n % k == 0: count = count + 1</div>
              <div className="text-slate-500">print(count)</div>
            </div>
          </div>
        </div>

        {fillChecked !== null && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            fillChecked
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              : 'bg-rose-950 text-rose-300 border border-rose-800'
          }`}>
            {fillChecked ? <CheckCircle className="w-4 h-4 shrink-0" /> : <Award className="w-4 h-4 shrink-0" />}
            <div>
              {fillChecked
                ? (isEn
                    ? '🎉 Excellent! You correctly completed all loop syntax blanks for the divisor algorithms!'
                    : '🎉 Xuất sắc! Bạn đã điền chính xác toàn bộ cú pháp của vòng lặp for cho bài toán ước số!')
                : (isEn
                    ? '💡 Hint: Blank 1 is "range(1, n + 1)", Blank 2 is "n % k == 0", Blank 3 is "range(1, n)" to exclude n itself.'
                    : '💡 Gợi ý: Ô 1 là "range(1, n + 1)", Ô 2 là "n % k == 0", Ô 3 là "range(1, n)" để không tính chính n.')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
