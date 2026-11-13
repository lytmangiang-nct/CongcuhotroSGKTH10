import React, { useState, useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  Play,
  BookOpen,
  Sparkles,
  Zap
} from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section26PracticeApply: React.FC = () => {
  const {
    bilingualMode,
    navigateToQuiz,
    completeSectionTasks
  } = useBook();
  const isEn = bilingualMode === 'en';

  // Mark task completion for section 5 (index 4) on load to prevent deadlock
  useEffect(() => {
    completeSectionTasks(26, 4);
  }, [completeSectionTasks]);

  // Helper: Prime function from practice (divisors count C == 1)
  const isPrimeSGK = (n: number): boolean => {
    if (n <= 1) return false;
    let c = 0;
    let k = 1;
    while (k < n) {
      if (n % k === 0) c++;
      k++;
    }
    return c === 1;
  };

  // Luyện tập 1 State: In các ước nguyên tố của n
  const [lt1N, setLt1N] = useState<number>(60);
  const [lt1Result, setLt1Result] = useState<{
    divisors: number[];
    primeDivisors: number[];
    log: string[];
  } | null>(null);

  // Luyện tập 2 State: numbers(s) đếm số chữ số
  const [lt2Str, setLt2Str] = useState<string>('0101abc2026!');
  const [lt2Result, setLt2Result] = useState<{
    count: number;
    digits: string[];
    nonDigits: string[];
  } | null>(null);

  // Vận dụng 1 State: Early return vs Classic prime comparison
  const [vd1N, setVd1N] = useState<number>(100);
  const [vd1Comparison, setVd1Comparison] = useState<{
    classicSteps: number;
    classicResult: boolean;
    earlySteps: number;
    earlyResult: boolean;
    reasonEn: string;
    reasonVi: string;
    savedPercent: number;
  } | null>(null);

  // Vận dụng 2 State: 2 hàm đếm chữ số và đếm chữ cái tiếng Anh
  const [vd2Input, setVd2Input] = useState<string>('Python 3.12 release date: October 2023');
  const [vd2Result, setVd2Result] = useState<{
    digitCount: number;
    letterCount: number;
    otherCount: number;
    digits: string[];
    letters: string[];
  } | null>(null);

  // Run Luyện tập 1
  const runLt1 = () => {
    const n = Math.floor(lt1N);
    if (n < 2) {
      setLt1Result({
        divisors: [],
        primeDivisors: [],
        log: [isEn ? `n = ${n} has no prime factors.` : `n = ${n} không có ước nguyên tố.`]
      });
      return;
    }

    const allDivs: number[] = [];
    const primeDivs: number[] = [];
    const logArr: string[] = [];

    for (let k = 1; k <= n; k++) {
      if (n % k === 0) {
        allDivs.push(k);
        if (isPrimeSGK(k)) {
          primeDivs.push(k);
          logArr.push(isEn ? `-> ${k} is divisor & prime(${k}) == True` : `-> ${k} là ước số và prime(${k}) == True -> Thêm vào kết quả`);
        }
      }
    }
    setLt1Result({ divisors: allDivs, primeDivisors: primeDivs, log: logArr });
  };

  // Run Luyện tập 2
  const runLt2 = () => {
    const digits: string[] = [];
    const nonDigits: string[] = [];
    for (let i = 0; i < lt2Str.length; i++) {
      const ch = lt2Str[i];
      if (ch >= '0' && ch <= '9') {
        digits.push(ch);
      } else {
        nonDigits.push(ch);
      }
    }
    setLt2Result({
      count: digits.length,
      digits,
      nonDigits
    });
  };

  // Run Vận dụng 1: Compare iterations
  const runVd1 = () => {
    const n = Math.floor(vd1N);

    // Classic loop (k from 1 to n-1)
    let classicSteps = 0;
    let c = 0;
    let k = 1;
    while (k < n) {
      classicSteps++;
      if (n % k === 0) c++;
      k++;
    }
    const classicResult = n > 1 && c === 1;

    // Early return algorithm
    let earlySteps = 0;
    let earlyResult = true;
    let reasonEn = '';
    let reasonVi = '';

    if (n < 2) {
      earlySteps = 1;
      earlyResult = false;
      reasonEn = 'Exit immediately at Gate 1: n < 2 -> return False (1 check)';
      reasonVi = 'Thoát ngay ở Cửa 1: n < 2 -> return False (1 phép thử)';
    } else {
      let ek = 2;
      earlySteps = 1; // condition check
      while (ek < n) {
        earlySteps++;
        if (n % ek === 0) {
          earlyResult = false;
          reasonEn = `Exit early at Gate 2: Found factor k = ${ek} (${n} % ${ek} == 0) -> return False`;
          reasonVi = `Thoát sớm ở Cửa 2: Phát hiện ước số k = ${ek} (${n} % ${ek} == 0) -> return False`;
          break;
        }
        ek++;
      }
      if (earlyResult) {
        reasonEn = `Passed all tests from 2 to ${n - 1} without factors -> return True (Prime!)`;
        reasonVi = `Đã thử tất cả từ 2 đến ${n - 1} không có ước số -> return True (Là số nguyên tố!)`;
      }
    }

    const saved = classicSteps > 0 ? Math.max(0, Math.round(((classicSteps - earlySteps) / classicSteps) * 100)) : 0;

    setVd1Comparison({
      classicSteps,
      classicResult,
      earlySteps,
      earlyResult,
      reasonEn,
      reasonVi,
      savedPercent: saved
    });
  };

  // Run Vận dụng 2
  const runVd2 = () => {
    const digits: string[] = [];
    const letters: string[] = [];
    let otherCount = 0;

    for (let i = 0; i < vd2Input.length; i++) {
      const ch = vd2Input[i];
      if (ch >= '0' && ch <= '9') {
        digits.push(ch);
      } else if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
        letters.push(ch);
      } else {
        otherCount++;
      }
    }

    setVd2Result({
      digitCount: digits.length,
      letterCount: letters.length,
      otherCount,
      digits,
      letters
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full w-fit border border-amber-500/20">
          <span>{isEn ? 'Section 4: Practice & Application' : 'Mục 4: Luyện tập & Vận dụng'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Page 130' : 'Trang 130 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '4. Practice Exercises & Real-World Applications' : '4. Luyện Tập & Vận Dụng'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Complete the textbook exercises on prime factors, string digit counting, and multi-return early exit optimization.'
            : 'Thực hành các bài tập SGK trang 130: in ước nguyên tố, đếm chữ số trong xâu, và tối ưu hóa thoát sớm với nhiều câu lệnh return.'}
        </p>
      </div>

      {/* Part 1: LUYỆN TẬP */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400">
          <BookOpen className="w-5 h-5" />
          <span>{isEn ? 'Part A: Textbook Practice (Page 130)' : 'Phần A: Luyện Tập (Trang 130 SGK)'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Luyện tập 1: Ước nguyên tố */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {isEn ? 'Practice 1' : 'Luyện tập 1'}
                </span>
                <span className="text-xs text-slate-400">{isEn ? 'Page 130' : 'Trang 130'}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Prime Factors of Natural Number n' : 'Tìm & In Các Ước Nguyên Tố của Số Tự Nhiên n'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Write a function with parameter n that prints all prime factors of n. Hint: Reuse the prime() function from Task 2.'
                  : 'Viết hàm với tham số là số tự nhiên n in ra các số là ước nguyên tố của n. Gợi ý: Sử dụng hàm prime() trong phần thực hành.'}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 space-y-1">
                <div className="text-slate-500"># {isEn ? 'Required textbook function:' : 'Hàm SGK yêu cầu:'}</div>
                <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">uoc_nguyen_to</span>(n):</div>
                <div className="pl-4 text-slate-300">for k in range(2, n + 1):</div>
                <div className="pl-8 text-slate-300">if n % k == 0 and prime(k):</div>
                <div className="pl-12 text-emerald-400">print(k, end=" ")</div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  {isEn ? 'Enter natural number n:' : 'Nhập số tự nhiên n:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={lt1N}
                    onChange={(e) => setLt1N(Number(e.target.value))}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-hidden focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={runLt1}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Run' : 'Chạy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {lt1Result && (
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>{isEn ? 'All Divisors:' : 'Tất cả ước số:'}</span>
                  <span className="font-mono text-slate-300">[{lt1Result.divisors.join(', ')}]</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                  <span className="text-emerald-400 font-bold">{isEn ? 'Prime Divisors:' : 'Ước nguyên tố:'}</span>
                  <span className="font-mono text-amber-300 font-bold text-sm">
                    {lt1Result.primeDivisors.length > 0 ? lt1Result.primeDivisors.join(', ') : (isEn ? 'None' : 'Không có')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Luyện tập 2: numbers(s) */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {isEn ? 'Practice 2' : 'Luyện tập 2'}
                </span>
                <span className="text-xs text-slate-400">{isEn ? 'Page 130' : 'Trang 130'}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Function numbers(s) to Count Digits' : 'Hàm numbers(s) Đếm Số Lượng Chữ Số'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Write function numbers(s) that counts the number of digit characters in string s. Example: numbers("0101abc") = 4.'
                  : 'Viết hàm numbers(s) đếm số các chữ số có trong xâu s. Ví dụ: numbers("0101abc") = 4.'}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 space-y-1">
                <div className="text-slate-500"># {isEn ? 'Function numbers(s):' : 'Hàm numbers(s):'}</div>
                <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">numbers</span>(s):</div>
                <div className="pl-4 text-slate-300">c = 0</div>
                <div className="pl-4 text-slate-300">for ch in s:</div>
                <div className="pl-8 text-slate-300">if <span className="text-cyan-300">'0' &lt;= ch &lt;= '9'</span>: c += 1</div>
                <div className="pl-4 text-pink-400">return c</div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  {isEn ? 'Enter string s:' : 'Nhập xâu s:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={lt2Str}
                    onChange={(e) => setLt2Str(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-hidden focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={runLt2}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Run' : 'Chạy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {lt2Result && (
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono">numbers("{lt2Str}"):</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">
                    {lt2Result.count} {isEn ? 'digits' : 'chữ số'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-800">
                  <span className="text-slate-500 text-[11px]">{isEn ? 'Found digits:' : 'Các chữ số:'}</span>
                  {lt2Result.digits.length > 0 ? (
                    lt2Result.digits.map((d, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-[10px]">
                        '{d}'
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic text-[11px]">{isEn ? 'None' : 'Không có'}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Part 2: VẬN DỤNG */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-400">
          <Zap className="w-5 h-5" />
          <span>{isEn ? 'Part B: Real-World Applications (Page 130)' : 'Phần B: Vận Dụng Thực Tế (Trang 130 SGK)'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vận dụng 1: Đa lệnh return & Thoát sớm */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {isEn ? 'Application 1' : 'Vận dụng 1'}
                </span>
                <span className="text-xs text-slate-400">{isEn ? 'Page 130' : 'Trang 130'}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Multi-Return Early Exit Optimization' : 'Tối Ưu Thoát Sớm Với Nhiều Lệnh return'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Examine the optimized prime(n) with multiple return statements. Compare execution steps against the classic divisor counting method.'
                  : 'Trong khi viết hàm có thể có nhiều lệnh return. So sánh số bước duyệt giữa hàm đếm ước kinh điển và hàm thoát sớm ngay khi gặp n % k == 0.'}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-purple-300 border border-slate-800 space-y-1">
                <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">prime</span>(n):</div>
                <div className="pl-4"><span className="text-pink-400">if</span> n &lt; 2: <span className="text-pink-400 font-bold">return False</span> <span className="text-slate-500"># {isEn ? 'Gate 1' : 'Cửa 1'}</span></div>
                <div className="pl-4 text-slate-300">k = 2</div>
                <div className="pl-4 text-slate-300"><span className="text-pink-400">while</span> k &lt; n:</div>
                <div className="pl-8 text-slate-300"><span className="text-pink-400">if</span> n % k == 0: <span className="text-pink-400 font-bold">return False</span> <span className="text-slate-500"># {isEn ? 'Gate 2: Early Exit!' : 'Cửa 2: Thoát sớm!'}</span></div>
                <div className="pl-8 text-slate-300">k = k + 1</div>
                <div className="pl-4 text-pink-400 font-bold">return True <span className="text-slate-500 font-normal"># {isEn ? 'Gate 3: All tests passed' : 'Cửa 3: Vượt qua tất cả'}</span></div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  {isEn ? 'Test number n (e.g. 100, 997, 1000):' : 'Thử nghiệm số n (vd: 100, 997, 1000):'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100000"
                    value={vd1N}
                    onChange={(e) => setVd1N(Number(e.target.value))}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-hidden focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={runVd1}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Compare' : 'So sánh'}</span>
                  </button>
                </div>
              </div>
            </div>

            {vd1Comparison && (
              <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 text-center pb-2 border-b border-slate-800">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">{isEn ? 'Classic (Task 2)' : 'Kinh điển (Nhiệm vụ 2)'}</div>
                    <div className="text-base font-mono font-bold text-amber-400">
                      {vd1Comparison.classicSteps} {isEn ? 'steps' : 'bước'}
                    </div>
                    <div className="text-[10px] text-slate-500">{isEn ? 'Iterates 1 → n-1' : 'Lặp hết 1 → n-1'}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30">
                    <div className="text-[10px] text-purple-300 uppercase">{isEn ? 'Early Return' : 'Thoát Sớm (Vận dụng 1)'}</div>
                    <div className="text-base font-mono font-bold text-emerald-400">
                      {vd1Comparison.earlySteps} {isEn ? 'steps' : 'bước'}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-bold">
                      {isEn ? `Saved ~${vd1Comparison.savedPercent}%` : `Tiết kiệm ~${vd1Comparison.savedPercent}%`}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 flex items-start gap-1.5">
                  <span className="text-purple-400 font-bold shrink-0">➜</span>
                  <span>{isEn ? vd1Comparison.reasonEn : vd1Comparison.reasonVi}</span>
                </div>
              </div>
            )}
          </div>

          {/* Vận dụng 2: Hai hàm đếm chữ số và chữ cái tiếng Anh */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {isEn ? 'Application 2' : 'Vận dụng 2'}
                </span>
                <span className="text-xs text-slate-400">{isEn ? 'Page 130' : 'Trang 130'}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Separate Functions for Digits & English Letters' : 'Hai Hàm Riêng Biệt Đếm Chữ Số & Chữ Cái Tiếng Anh'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Input a string from the keyboard and notify: (1) Total digit characters; (2) Total English letters. Write a separate function for each requirement.'
                  : 'Nhập một xâu từ bàn phím, thông báo tổng số chữ số và tổng số chữ cái tiếng Anh. Thiết lập hàm riêng cho mỗi yêu cầu.'}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-purple-300 border border-slate-800 space-y-1">
                <div className="text-slate-500"># {isEn ? '2 independent functions per SGK:' : '2 hàm độc lập theo yêu cầu SGK:'}</div>
                <div><span className="text-pink-400 font-bold">def</span> <span className="text-cyan-300">count_digits</span>(s): return sum(1 for c in s if '0'&lt;=c&lt;='9')</div>
                <div><span className="text-pink-400 font-bold">def</span> <span className="text-emerald-300">count_letters</span>(s): return sum(1 for c in s if c.isascii() and c.isalpha())</div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  {isEn ? 'Input custom string:' : 'Nhập xâu kí tự tuỳ ý:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={vd2Input}
                    onChange={(e) => setVd2Input(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-hidden focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={runVd2}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Count' : 'Đếm'}</span>
                  </button>
                </div>
              </div>
            </div>

            {vd2Result && (
              <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30">
                    <div className="text-[10px] text-cyan-300 uppercase font-mono">count_digits(s)</div>
                    <div className="text-base font-mono font-bold text-cyan-400">
                      {vd2Result.digitCount} {isEn ? 'digits' : 'chữ số'}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
                    <div className="text-[10px] text-emerald-300 uppercase font-mono">count_letters(s)</div>
                    <div className="text-base font-mono font-bold text-emerald-400">
                      {vd2Result.letterCount} {isEn ? 'letters' : 'chữ cái'}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 text-center pt-1 border-t border-slate-800">
                  {isEn
                    ? `Other characters (spaces, punctuation): ${vd2Result.otherCount}`
                    : `Kí tự khác (khoảng trắng, dấu câu): ${vd2Result.otherCount}`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QUIZ GUIDANCE CARD: Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900 border-2 border-purple-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {isEn
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài 26 (10 Câu)'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz and earn your verified Certificate for Lesson 26, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành Bài 26, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={navigateToQuiz}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>{isEn ? 'Open Quiz on Nav Bar →' : 'Mở Trắc Nghiệm Trên Thanh Điều Hướng →'}</span>
        </button>
      </div>
    </div>
  );
};
