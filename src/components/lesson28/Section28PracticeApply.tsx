import React, { useState, useEffect } from 'react';
import {
  Code,
  Play,
  CheckCircle,
  Award,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section28PracticeApply: React.FC = () => {
  const { bilingualMode, navigateToQuiz, completeSectionTasks, isAllSectionsComplete } = useBook();
  const isEn = bilingualMode === 'en';

  // Mark task completion for section 5 (index 4) on load
  useEffect(() => {
    completeSectionTasks(28, 4);
  }, [completeSectionTasks]);

  // Luyện tập 1: lay_ki_tu_dau(sList) -> cList
  const [sListInput, setSListInput] = useState<string>('Hà, Nội, Mùa, Thu, Đẹp');
  const [cListResult, setCListResult] = useState<{ cList: string[]; steps: string[] } | null>(null);

  const runLuyenTap1 = () => {
    const rawItems = sListInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const steps: string[] = [];
    const cList: string[] = [];

    steps.push(isEn ? `Input string list sList = [${rawItems.map(s => `'${s}'`).join(', ')}]` : `Danh sách đầu vào sList = [${rawItems.map(s => `'${s}'`).join(', ')}]`);
    rawItems.forEach((word, idx) => {
      const firstChar = word.charAt(0);
      cList.push(firstChar);
      steps.push(isEn ? `sList[${idx}] = '${word}' ➔ first char '${firstChar}' ➔ cList.append('${firstChar}')` : `sList[${idx}] = '${word}' ➔ kí tự đầu '${firstChar}' ➔ cList.append('${firstChar}')`);
    });
    steps.push(isEn ? `Returned result: cList = [${cList.map(c => `'${c}'`).join(', ')}]` : `Kết quả trả về: cList = [${cList.map(c => `'${c}'`).join(', ')}]`);
    setCListResult({ cList, steps });
  };

  // Luyện tập 2: Tach_day(A) -> B (chỉ số chẵn), C (chỉ số lẻ)
  const [tachInput, setTachInput] = useState<string>('9, 2, 7, 4, 6');
  const [tachResult, setTachResult] = useState<{ B: number[]; C: number[]; steps: string[] } | null>(null);

  const runLuyenTap2 = (customVal?: string) => {
    const raw = customVal !== undefined ? customVal : tachInput;
    const nums = raw.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    const B: number[] = [];
    const C: number[] = [];
    const steps: string[] = [];

    steps.push(isEn ? `Initialized original list A = [${nums.join(', ')}]` : `Khởi tạo danh sách gốc A = [${nums.join(', ')}]`);
    steps.push(isEn ? `Create empty lists: B = [] (even indices), C = [] (odd indices)` : `Khởi tạo: B = [] (chỉ số chẵn), C = [] (chỉ số lẻ)`);

    nums.forEach((val, i) => {
      if (i % 2 === 0) {
        B.push(val);
        steps.push(isEn ? `Index i = ${i} (even) ➔ A[${i}] = ${val} added to B ➔ B = [${B.join(', ')}]` : `Chỉ số i = ${i} (chẵn) ➔ A[${i}] = ${val} thêm vào B ➔ B = [${B.join(', ')}]`);
      } else {
        C.push(val);
        steps.push(isEn ? `Index i = ${i} (odd)  ➔ A[${i}] = ${val} added to C ➔ C = [${C.join(', ')}]` : `Chỉ số i = ${i} (lẻ)   ➔ A[${i}] = ${val} thêm vào C ➔ C = [${C.join(', ')}]`);
      }
    });

    setTachResult({ B, C, steps });
  };

  // Vận dụng 1: UCLN_BCNN(m, n)
  const [numM, setNumM] = useState<number>(24);
  const [numN, setNumN] = useState<number>(36);
  const [gcdLcmResult, setGcdLcmResult] = useState<{ ucln: number; bcnn: number; steps: string[] } | null>(null);

  const runVanDung1 = () => {
    let a = Math.abs(numM);
    let b = Math.abs(numN);
    const steps: string[] = [];
    steps.push(isEn ? `Calling UCLN_BCNN(m=${numM}, n=${numN})` : `Gọi hàm UCLN_BCNN(m=${numM}, n=${numN})`);

    while (b !== 0) {
      const r = a % b;
      steps.push(isEn ? `Euclid step: ${a} = ${Math.floor(a / b)} × ${b} + ${r}` : `Euclid: ${a} = ${Math.floor(a / b)} × ${b} + ${r}`);
      a = b;
      b = r;
    }
    const ucln = a;
    const bcnn = Math.floor((Math.abs(numM) * Math.abs(numN)) / ucln);

    steps.push(isEn ? `➔ Greatest Common Divisor GCD(m, n) = ${ucln}` : `➔ Ước chung lớn nhất ƯCLN(m, n) = ${ucln}`);
    steps.push(isEn ? `Formula: GCD × LCM = m × n ➔ LCM = (m × n) // GCD = (${numM} × ${numN}) // ${ucln} = ${bcnn}` : `Theo công thức SGK: ƯCLN × BCNN = m × n ➔ BCNN = (m × n) // ƯCLN = (${numM} × ${numN}) // ${ucln} = ${bcnn}`);
    steps.push(isEn ? `Return tuple: return ${ucln}, ${bcnn}` : `Hàm trả về tuple: return ${ucln}, ${bcnn}`);

    setGcdLcmResult({ ucln, bcnn, steps });
  };

  // Vận dụng 2: kiem_tra_hop_le(day, month, year)
  const [testDay, setTestDay] = useState<number>(29);
  const [testMonth, setTestMonth] = useState<number>(2);
  const [testYear, setTestYear] = useState<number>(2024);
  const [dateResult, setDateResult] = useState<{ isValid: boolean; reason: string; leapYear: boolean } | null>(null);

  const runVanDung2 = () => {
    const y = testYear;
    const m = testMonth;
    const d = testDay;

    const isLeap = (y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0);

    if (y < 1) {
      setDateResult({
        isValid: false,
        reason: isEn ? `Year ${y} is invalid (must be > 0).` : `Năm ${y} không hợp lệ (năm phải > 0).`,
        leapYear: isLeap
      });
      return;
    }

    if (m < 1 || m > 12) {
      setDateResult({
        isValid: false,
        reason: isEn ? `Month ${m} is invalid (must be between 1 and 12).` : `Tháng ${m} không hợp lệ (phải từ 1 đến 12).`,
        leapYear: isLeap
      });
      return;
    }

    let maxDay = 31;
    if (m === 4 || m === 6 || m === 9 || m === 11) {
      maxDay = 30;
    } else if (m === 2) {
      maxDay = isLeap ? 29 : 28;
    }

    if (d < 1 || d > maxDay) {
      setDateResult({
        isValid: false,
        reason: isEn ? `Day ${d} is invalid for month ${m}/${y} (max days: ${maxDay}).` : `Ngày ${d} không hợp lệ trong tháng ${m}/${y} (tháng này chỉ có tối đa ${maxDay} ngày).`,
        leapYear: isLeap
      });
      return;
    }

    setDateResult({
      isValid: true,
      reason: isEn ? `Date ${d}/${m}/${y} is valid. Month ${m} has ${maxDay} days.` : `Ngày ${d}/${m}/${y} hoàn toàn hợp lệ. Tháng ${m} có ${maxDay} ngày.`,
      leapYear: isLeap
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-indigo-950 via-slate-900 to-slate-950 p-6 md:p-8 text-white border border-indigo-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          {isEn ? 'Section 4: Practice & Application' : 'Phần 4: Luyện tập & Vận dụng'}
        </div>
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">
          {isEn ? 'Practical Exercises & Real-World Algorithms' : 'Luyện Tập, Vận Dụng & Đánh Giá Năng Lực'}
        </h2>
        <p className="mt-2 text-slate-300 max-w-3xl text-xs md:text-sm leading-relaxed">
          {isEn
            ? 'Complete hands-on programming tasks from SGK Informatics 10 (Page 140): list comprehension, even/odd index separation, multi-return GCD/LCM tuples, and calendar date validation.'
            : 'Vận dụng toàn diện kĩ năng hàm và phạm vi biến: Luyện tập 1-2, Vận dụng 1-2 theo chuẩn SGK Trang 140, và truy cập bài trắc nghiệm 10 câu trên thanh điều hướng để nhận chứng chỉ danh dự số.'}
        </p>
      </div>

      {/* Luyện tập 1: lay_ki_tu_dau */}
      <section className="bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
            LT1
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {isEn ? 'Exercise 1: Extract First Characters lay_ki_tu_dau(sList)' : 'Luyện tập 1: Hàm trích xuất kí tự đầu lay_ki_tu_dau(sList)'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Textbook Informatics 10, Page 140' : 'SGK Tin học 10, Trang 140'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-500/30 text-xs md:text-sm text-slate-300">
          <p className="font-semibold text-indigo-300 mb-1">
            {isEn ? 'Textbook Task:' : 'Đề bài SGK:'}
          </p>
          <p>
            {isEn
              ? 'Write function lay_ki_tu_dau(sList) accepting a list of non-empty strings sList and returning a list cList consisting of the first character of each corresponding string.'
              : 'Viết hàm lay_ki_tu_dau(sList) với tham số là danh sách sList chứa các xâu kí tự không rỗng. Hàm trả lại danh sách cList bao gồm các kí tự đầu tiên của các xâu trong sList.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-2xl p-4 text-emerald-300 font-mono text-xs border border-slate-800">
              <div className="text-slate-500 mb-2"># {isEn ? 'Function implementation in Python' : 'Định nghĩa hàm lay_ki_tu_dau'}</div>
              <pre>{`def lay_ki_tu_dau(sList):
    cList = []
    for word in sList:
        cList.append(word[0])
    return cList`}</pre>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isEn ? 'Input string list (comma-separated):' : 'Nhập danh sách xâu sList (ngăn cách bởi dấu phẩy):'}
              </label>
              <input
                type="text"
                value={sListInput}
                onChange={e => setSListInput(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
              />
            </div>

            <button
              onClick={runLuyenTap1}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              {isEn ? 'Run lay_ki_tu_dau()' : 'Chạy hàm lay_ki_tu_dau()'}
            </button>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 min-h-[220px]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              {isEn ? 'Returned Result & Execution Steps:' : 'Kết quả trả về và các bước xử lí:'}
            </h4>
            {cListResult ? (
              <div className="space-y-3">
                <div className="p-3 bg-indigo-950/60 rounded-xl text-indigo-200 border border-indigo-500/40 font-mono font-bold text-sm">
                  cList = [{cListResult.cList.map(c => `'${c}'`).join(', ')}]
                </div>
                <div className="space-y-1 text-xs font-mono text-slate-300">
                  {cListResult.steps.map((st, i) => (
                    <div key={i} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      {st}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                {isEn ? 'Click Run to test lay_ki_tu_dau() with input...' : 'Bấm nút chạy để xem kết quả và các bước duyệt danh sách...'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Luyện tập 2: Tach_day(A) */}
      <section className="bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">
            LT2
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {isEn ? 'Exercise 2: Split by Even/Odd Indices Tach_day(A)' : 'Luyện tập 2: Tách danh sách theo chỉ số chẵn/lẻ Tach_day(A)'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Textbook Informatics 10, Page 140' : 'SGK Tin học 10, Trang 140'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-teal-950/40 rounded-2xl border border-teal-500/30 text-xs md:text-sm text-slate-300">
          <p className="font-semibold text-teal-300 mb-1">
            {isEn ? 'Textbook Task:' : 'Đề bài SGK:'}
          </p>
          <p>
            {isEn
              ? 'Write function Tach_day(A) taking list of numbers A and separating into list B containing elements at EVEN indices (0, 2, 4...) and list C containing elements at ODD indices (1, 3, 5...). Return tuple (B, C).'
              : 'Viết hàm Tach_day(A) nhận đầu vào là danh sách số A và tách thành hai danh sách: B gồm các phần tử tại CHỈ SỐ CHẴN (0, 2, 4, ...) và C gồm các phần tử tại CHỈ SỐ LẺ (1, 3, 5, ...). Trả về bộ hai danh sách (B, C).'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-2xl p-4 text-teal-300 font-mono text-xs border border-slate-800">
              <div className="text-slate-500 mb-2"># {isEn ? 'Even/Odd Index Separation Logic' : 'Hàm Tach_day(A) theo chỉ số chẵn / lẻ'}</div>
              <pre>{`def Tach_day(A):
    B = []  # Chỉ số chẵn (Even indices: 0, 2, 4...)
    C = []  # Chỉ số lẻ   (Odd indices:  1, 3, 5...)
    for i in range(len(A)):
        if i % 2 == 0:
            B.append(A[i])
        else:
            C.append(A[i])
    return B, C`}</pre>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  {isEn ? 'Input list A (comma-separated numbers):' : 'Nhập danh sách A (dãy số phân tách bằng dấu phẩy):'}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTachInput('9, 2, 7, 4, 6');
                    runLuyenTap2('9, 2, 7, 4, 6');
                  }}
                  className="text-[11px] text-teal-400 hover:text-teal-300 underline font-mono cursor-pointer"
                >
                  {isEn ? 'Preset: [9, 2, 7, 4, 6]' : 'Mẫu SGK: [9, 2, 7, 4, 6]'}
                </button>
              </div>
              <input
                type="text"
                value={tachInput}
                onChange={e => setTachInput(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
              />
            </div>

            <button
              onClick={() => runLuyenTap2()}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              {isEn ? 'Run Tach_day(A)' : 'Chạy hàm Tach_day(A)'}
            </button>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 min-h-[220px]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              {isEn ? 'Split Output (Indices 0, 2, 4 vs 1, 3, 5):' : 'Kết quả tách theo chỉ số chẵn/lẻ:'}
            </h4>
            {tachResult ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs md:text-sm font-mono font-bold">
                  <div className="p-3 bg-teal-950/80 rounded-xl text-teal-200 border border-teal-500/40">
                    <span className="block text-[11px] text-teal-400 font-sans font-semibold mb-1">
                      {isEn ? 'B (Even Indices):' : 'B (Chỉ số chẵn: 0, 2, 4...):'}
                    </span>
                    B = [{tachResult.B.join(', ')}]
                  </div>
                  <div className="p-3 bg-amber-950/80 rounded-xl text-amber-200 border border-amber-500/40">
                    <span className="block text-[11px] text-amber-400 font-sans font-semibold mb-1">
                      {isEn ? 'C (Odd Indices):' : 'C (Chỉ số lẻ: 1, 3, 5...):'}
                    </span>
                    C = [{tachResult.C.join(', ')}]
                  </div>
                </div>

                <div className="space-y-1 text-xs font-mono text-slate-300 max-h-48 overflow-y-auto pr-1">
                  {tachResult.steps.map((st, i) => (
                    <div key={i} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      {st}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                {isEn ? 'Click Run to test separation into even and odd indices...' : 'Bấm nút chạy để xem kết quả phân tách B và C theo chỉ số...'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Vận dụng 1: UCLN_BCNN */}
      <section className="bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
            VD1
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {isEn ? 'Application 1: Multi-Return UCLN_BCNN(m, n)' : 'Vận dụng 1: Hàm trả về cặp giá trị UCLN_BCNN(m, n)'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Textbook Informatics 10, Page 140' : 'SGK Tin học 10, Trang 140'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-cyan-950/40 rounded-2xl border border-cyan-500/30 text-xs md:text-sm text-slate-300">
          <p className="font-semibold text-cyan-300 mb-1">
            {isEn ? 'Textbook Task:' : 'Đề bài SGK:'}
          </p>
          <p>
            {isEn
              ? 'Write function UCLN_BCNN(m, n) taking natural numbers m, n and returning a tuple of two values: Greatest Common Divisor (GCD) and Least Common Multiple (LCM).'
              : 'Viết hàm UCLN_BCNN(m, n) với m, n là hai số tự nhiên. Hàm trả về cặp giá trị là ước chung lớn nhất (ƯCLN) và bội chung nhỏ nhất (BCNN) của m và n.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-2xl p-4 text-cyan-300 font-mono text-xs border border-slate-800">
              <div className="text-slate-500 mb-2"># {isEn ? 'Euclidean Algorithm & LCM derivation' : 'Hàm trả lại tuple (ucln, bcnn)'}</div>
              <pre>{`def UCLN_BCNN(m, n):
    a, b = m, n
    while b != 0:
        a, b = b, a % b
    ucln = a
    bcnn = (m * n) // ucln
    return ucln, bcnn`}</pre>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'Natural number m:' : 'Số tự nhiên m:'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={numM}
                  onChange={e => setNumM(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'Natural number n:' : 'Số tự nhiên n:'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={numN}
                  onChange={e => setNumN(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
                />
              </div>
            </div>

            <button
              onClick={runVanDung1}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              {isEn ? 'Compute GCD & LCM' : 'Tính ƯCLN & BCNN'}
            </button>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 min-h-[220px]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {isEn ? 'Computation Steps & Output:' : 'Kết quả và bước tính toán:'}
            </h4>
            {gcdLcmResult ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm font-mono font-bold">
                  <div className="p-3 bg-cyan-950/80 rounded-xl text-cyan-200 border border-cyan-500/40">
                    {isEn ? 'GCD' : 'ƯCLN'} = {gcdLcmResult.ucln}
                  </div>
                  <div className="p-3 bg-indigo-950/80 rounded-xl text-indigo-200 border border-indigo-500/40">
                    {isEn ? 'LCM' : 'BCNN'} = {gcdLcmResult.bcnn}
                  </div>
                </div>

                <div className="space-y-1 text-xs font-mono text-slate-300">
                  {gcdLcmResult.steps.map((st, i) => (
                    <div key={i} className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      {st}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                {isEn ? 'Input m, n and execute to view algorithm trace...' : 'Nhập m, n và bấm nút tính để xem các bước giải...'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Vận dụng 2: Calendar Date Validity */}
      <section className="bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
            VD2
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {isEn ? 'Application 2: Calendar Date Validity Checker' : 'Vận dụng 2: Hàm kiểm tra tính hợp lệ của ngày tháng năm'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Textbook Informatics 10, Page 140' : 'SGK Tin học 10, Trang 140'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-500/30 text-xs md:text-sm text-slate-300">
          <p className="font-semibold text-purple-300 mb-1">
            {isEn ? 'Textbook Task:' : 'Đề bài SGK:'}
          </p>
          <p>
            {isEn
              ? 'Write function kiem_tra_hop_le(day, month, year) verifying if three natural numbers create a valid calendar date. Account for leap years (year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)).'
              : 'Viết chương trình yêu cầu nhập ba số tự nhiên day, month, year từ bàn phím và kiểm tra xem ba số đó có tạo thành một ngày tháng năm hợp lệ hay không. Chú ý năm nhuận chia hết cho 400 hoặc chia hết cho 4 nhưng không chia hết cho 100.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-2xl p-4 text-purple-300 font-mono text-xs border border-slate-800">
              <div className="text-slate-500 mb-2"># {isEn ? 'Date validator function in Python' : 'Hàm kiem_tra_hop_le'}</div>
              <pre>{`def la_nam_nhuan(year):
    return (year % 400 == 0) or (year % 4 == 0 and year % 100 != 0)

def kiem_tra_hop_le(day, month, year):
    if year < 1 or month < 1 or month > 12 or day < 1:
        return False
    if month in [4, 6, 9, 11]:
        max_d = 30
    elif month == 2:
        max_d = 29 if la_nam_nhuan(year) else 28
    else:
        max_d = 31
    return day <= max_d`}</pre>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'Day:' : 'Ngày (day):'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={testDay}
                  onChange={e => setTestDay(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'Month:' : 'Tháng (month):'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={testMonth}
                  onChange={e => setTestMonth(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isEn ? 'Year:' : 'Năm (year):'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={testYear}
                  onChange={e => setTestYear(parseInt(e.target.value, 10) || 2024)}
                  className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
                />
              </div>
            </div>

            <button
              onClick={runVanDung2}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4" />
              {isEn ? 'Verify Calendar Date' : 'Kiểm tra ngày tháng năm'}
            </button>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 min-h-[220px]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              {isEn ? 'Validation Verdict:' : 'Kết quả xác thực ngày tháng:'}
            </h4>
            {dateResult ? (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-2xl border flex items-center gap-3 ${
                    dateResult.isValid
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg ${
                      dateResult.isValid ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {dateResult.isValid ? '✓' : '✗'}
                  </div>
                  <div>
                    <div className="font-bold text-sm md:text-base">
                      {dateResult.isValid ? (isEn ? 'VALID (True)' : 'HỢP LỆ (True)') : (isEn ? 'INVALID (False)' : 'KHÔNG HỢP LỆ (False)')}
                    </div>
                    <div className="text-xs mt-0.5 opacity-90">{dateResult.reason}</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1">
                  <div className="text-slate-400">
                    {isEn ? 'Leap year calculation logic:' : 'Quy tắc năm nhuận trong hàm cục bộ:'}
                  </div>
                  <div className="font-mono text-purple-400">
                    year % 400 == 0 or (year % 4 == 0 and year % 100 != 0) ➔{' '}
                    <strong>{dateResult.leapYear ? (isEn ? 'Leap Year (29 days in Feb)' : 'Nhuận (Tháng 2 có 29 ngày)') : (isEn ? 'Common Year (28 days in Feb)' : 'Không nhuận (Tháng 2 có 28 ngày)')}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                {isEn ? 'Enter day, month, year and verify...' : 'Nhập ngày tháng năm và bấm kiểm tra...'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* QUIZ GUIDANCE CARD: Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-950/80 via-purple-950/60 to-slate-900 border-2 border-indigo-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {isEn
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Toàn Bài 28 (10 Câu) & Nhận Chứng Chỉ'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz on variable scope and earn your verified Certificate for Lesson 28, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK về phạm vi biến và nhận Giấy chứng nhận hoàn thành Bài 28, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={navigateToQuiz}
          className="px-5 py-2.5 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>{isEn ? 'Open Quiz on Nav Bar →' : 'Mở Trắc Nghiệm Trên Thanh Điều Hướng →'}</span>
        </button>
      </div>
    </div>
  );
};
