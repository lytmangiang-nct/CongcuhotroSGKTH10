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

export const Section27PracticeApply: React.FC = () => {
  const {
    bilingualMode,
    navigateToQuiz,
    completeSectionTasks
  } = useBook();
  const isEn = bilingualMode === 'en';

  // Mark task completion for section 5 (index 4) on load to prevent deadlock
  useEffect(() => {
    completeSectionTasks(27, 4);
  }, [completeSectionTasks]);

  // Luyện tập 1: power(a, b, c) -> (a + b)**c
  const [lt1A, setLt1A] = useState<number>(3);
  const [lt1B, setLt1B] = useState<number>(2);
  const [lt1C, setLt1C] = useState<number>(4);
  const [lt1Result, setLt1Result] = useState<{ val: number; expr: string } | null>(null);

  // Luyện tập 2: Nhập 2 số cách nhau dấu cách, tính tổng bằng hàm
  const [lt2Input, setLt2Input] = useState<string>('45 55');
  const [lt2Result, setLt2Result] = useState<{ n1: number; n2: number; sum: number } | null>(null);

  // Vận dụng 1: Nhập 2 số cách nhau dấu phẩy, tìm ƯCLN dùng hàm
  const [vd1Input, setVd1Input] = useState<string>('48, 180');
  const [vd1Result, setVd1Result] = useState<{ a: number; b: number; gcd: number; steps: string[] } | null>(null);

  // Vận dụng 2: Hàm change(ho_ten, c) hoa/thường
  const [vd2Name, setVd2Name] = useState<string>('Nguyen Van An');
  const [vd2C, setVd2C] = useState<number>(0);
  const [vd2Result, setVd2Result] = useState<{ output: string; methodUsed: string } | null>(null);

  // Run Luyện tập 1
  const runLt1 = () => {
    const base = lt1A + lt1B;
    const res = Math.pow(base, lt1C);
    setLt1Result({
      val: res,
      expr: `(${lt1A} + ${lt1B})^${lt1C} = ${base}^${lt1C} = ${res}`
    });
  };

  // Run Luyện tập 2
  const runLt2 = () => {
    const parts = lt2Input.trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2) return;
    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (isNaN(x) || isNaN(y)) return;

    const calcSum = (a: number, b: number) => a + b;
    setLt2Result({
      n1: x,
      n2: y,
      sum: calcSum(x, y)
    });
  };

  // Run Vận dụng 1: Euclid GCD function
  const runVd1 = () => {
    const parts = vd1Input.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    if (parts.length < 2) return;
    const origA = parts[0];
    const origB = parts[1];

    let x = Math.abs(origA);
    let y = Math.abs(origB);
    const stepLogs: string[] = [];

    while (y !== 0) {
      const r = x % y;
      stepLogs.push(`${x} % ${y} = ${r}`);
      x = y;
      y = r;
    }

    setVd1Result({
      a: origA,
      b: origB,
      gcd: x,
      steps: stepLogs
    });
  };

  // Run Vận dụng 2: change(ho_ten, c)
  const runVd2 = () => {
    const change = (ho_ten: string, c: number): { text: string; method: string } => {
      if (c === 0) {
        return { text: ho_ten.toUpperCase(), method: 'ho_ten.upper()' };
      } else {
        return { text: ho_ten.toLowerCase(), method: 'ho_ten.lower()' };
      }
    };
    const res = change(vd2Name, vd2C);
    setVd2Result({
      output: res.text,
      methodUsed: res.method
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full w-fit border border-purple-500/20">
          <span>{isEn ? 'Section 4: Practice & Application' : 'Mục 4: Luyện tập & Vận dụng'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Page 135' : 'Trang 135 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '4. Practice Exercises & Real-World Applications' : '4. Luyện Tập & Vận Dụng'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Complete the textbook exercises on passing arguments, arithmetic functions, Euclidean GCD, and casing transformations.'
            : 'Thực hành các bài tập SGK trang 135: truyền đối số tính luỹ thừa, đọc hai số tính tổng, thuật toán tìm ƯCLN và chuyển đổi hoa/thường.'}
        </p>
      </div>

      {/* Part 1: LUYỆN TẬP */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-emerald-400">
          <BookOpen className="w-5 h-5" />
          <span>{isEn ? 'Part A: Textbook Practice (Page 135)' : 'Phần A: Luyện Tập (Trang 135 SGK)'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Luyện tập 1: power(a, b, c) */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {isEn ? 'Practice 1' : 'Luyện tập 1'}
                </span>
                <span className="text-xs text-slate-400">{isEn ? 'Page 135' : 'Trang 135'}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Function power(a, b, c) returning (a + b)**c' : 'Hàm power(a, b, c) Tính (a + b)^c'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Define function power(a, b, c) with parameters a, b, c that returns the value (a + b)**c.'
                  : 'Viết hàm power(a, b, c) với các tham số a, b, c và trả lại kết quả (a + b)^c.'}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 space-y-1">
                <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">power</span>(a, b, c):</div>
                <div className="pl-4 text-slate-300"><span className="text-pink-400 font-bold">return</span> (a + b) ** c</div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                    {isEn ? 'Param a:' : 'Tham số a:'}
                  </label>
                  <input
                    type="number"
                    value={lt1A}
                    onChange={(e) => setLt1A(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                    {isEn ? 'Param b:' : 'Tham số b:'}
                  </label>
                  <input
                    type="number"
                    value={lt1B}
                    onChange={(e) => setLt1B(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1 font-mono">
                    {isEn ? 'Param c:' : 'Tham số c:'}
                  </label>
                  <input
                    type="number"
                    value={lt1C}
                    onChange={(e) => setLt1C(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={runLt1}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isEn ? 'Call power(a, b, c)' : 'Gọi hàm power(a, b, c)'}</span>
              </button>
            </div>

            {lt1Result && (
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-mono space-y-1">
                <div className="text-slate-400">{isEn ? 'Expression:' : 'Biểu thức:'} {lt1Result.expr}</div>
                <div className="text-base font-bold text-emerald-400">
                  {isEn ? 'Result: ' : 'Kết quả: '} {lt1Result.val}
                </div>
              </div>
            )}
          </div>

          {/* Luyện tập 2: Nhập 2 số cách nhau dấu cách */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {isEn ? 'Practice 2' : 'Luyện tập 2'}
                </span>
                <span className="text-xs text-slate-400">{isEn ? 'Page 135' : 'Trang 135'}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Sum of 2 Numbers Entered on One Line' : 'Nhập 2 Số Cách Nhau Dấu Cách & Tính Tổng'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Input two numbers on a single line separated by a space, parse them, pass them as arguments to a sum function, and output the result.'
                  : 'Viết chương trình nhập từ bàn phím hai số bất kì cách nhau bởi dấu cách, chuyển đổi thành số thực và gọi hàm tính tổng.'}
              </p>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  {isEn ? 'Input 2 numbers separated by spaces:' : 'Nhập 2 số cách nhau bởi dấu cách:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={lt2Input}
                    onChange={(e) => setLt2Input(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-hidden focus:border-emerald-500"
                    placeholder={isEn ? "e.g. 45 55" : "vd: 45 55"}
                  />
                  <button
                    type="button"
                    onClick={runLt2}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Calculate' : 'Tính'}</span>
                  </button>
                </div>
              </div>
            </div>

            {lt2Result && (
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-mono space-y-1">
                <div className="text-slate-400">
                  {isEn ? `Arguments passed: a = ${lt2Result.n1}, b = ${lt2Result.n2}` : `Đối số truyền vào: a = ${lt2Result.n1}, b = ${lt2Result.n2}`}
                </div>
                <div className="text-base font-bold text-emerald-400">
                  {lt2Result.n1} + {lt2Result.n2} = {lt2Result.sum}
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
          <span>{isEn ? 'Part B: Real-World Applications (Page 135)' : 'Phần B: Vận Dụng Thực Tế (Trang 135 SGK)'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vận dụng 1: GCD Euclid */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {isEn ? 'Application 1' : 'Vận dụng 1'}
                </span>
                <span className="text-xs text-slate-400">{isEn ? 'Page 135' : 'Trang 135'}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Euclidean GCD Function with 2 Arguments' : 'Hàm Tìm Ước Chung Lớn Nhất (Thuật Toán Euclid)'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Input two positive integers separated by a comma, call the Euclidean GCD function, and display the greatest common divisor.'
                  : 'Viết chương trình yêu cầu nhập 2 số nguyên dương a, b cách nhau bởi dấu phẩy, thiết lập hàm ucln(a, b) tìm ước chung lớn nhất.'}
              </p>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  {isEn ? 'Enter 2 integers (e.g. 48, 180):' : 'Nhập 2 số nguyên (vd: 48, 180):'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={vd1Input}
                    onChange={(e) => setVd1Input(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-hidden focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={runVd1}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Find GCD' : 'Tìm ƯCLN'}</span>
                  </button>
                </div>
              </div>
            </div>

            {vd1Result && (
              <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 text-xs font-mono space-y-1.5">
                <div className="text-base font-bold text-emerald-400">
                  GCD({vd1Result.a}, {vd1Result.b}) = {vd1Result.gcd}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isEn ? 'Euclid remainder steps: ' : 'Các bước chia lấy dư Euclid: '}
                  {vd1Result.steps.join(' ➔ ')}
                </div>
              </div>
            )}
          </div>

          {/* Vận dụng 2: change(ho_ten, c) */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 hover:border-purple-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {isEn ? 'Application 2' : 'Vận dụng 2'}
                </span>
                <span className="text-xs text-slate-400">{isEn ? 'Page 135' : 'Trang 135'}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Letter Casing Function change(ho_ten, c)' : 'Hàm Chuyển Đổi Hoa/Thường change(ho_ten, c)'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn
                  ? 'Define function change(ho_ten, c): Returns ho_ten in UPPERCASE if c = 0, or lowercase if c != 0. Uses s.upper() and s.lower().'
                  : 'Thiết lập hàm change(ho_ten, c): Trả lại xâu ho_ten là chữ in hoa nếu c = 0; Trả lại chữ in thường nếu c khác 0. Gợi ý: Dùng s.upper() và s.lower().'}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-amber-300 border border-slate-800 space-y-1">
                <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">change</span>(ho_ten, c):</div>
                <div className="pl-4 text-slate-300"><span className="text-pink-400">if</span> c == 0: <span className="text-pink-400 font-bold">return</span> ho_ten.<span className="text-cyan-300">upper</span>()</div>
                <div className="pl-4 text-slate-300"><span className="text-pink-400">else</span>: <span className="text-pink-400 font-bold">return</span> ho_ten.<span className="text-cyan-300">lower</span>()</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] text-slate-400 block font-mono">
                    {isEn ? 'String ho_ten:' : 'Xâu ho_ten:'}
                  </label>
                  <input
                    type="text"
                    value={vd2Name}
                    onChange={(e) => setVd2Name(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 block font-mono">
                    {isEn ? 'Parameter c:' : 'Tham số c:'}
                  </label>
                  <button
                    type="button"
                    onClick={() => setVd2C(vd2C === 0 ? 1 : 0)}
                    className={`w-full py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      vd2C === 0 ? 'bg-amber-500 text-slate-950' : 'bg-cyan-600 text-white'
                    }`}
                  >
                    c = {vd2C} ({vd2C === 0 ? (isEn ? 'UPPERCASE' : 'IN HOA') : (isEn ? 'lowercase' : 'in thường')})
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={runVd2}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isEn ? 'Call change()' : 'Gọi hàm change()'}</span>
              </button>
            </div>

            {vd2Result && (
              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs font-mono space-y-1">
                <div className="text-slate-400">
                  {isEn ? 'Method applied:' : 'Phương thức áp dụng:'} {vd2Result.methodUsed}
                </div>
                <div className="text-base font-bold text-amber-300">"{vd2Result.output}"</div>
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
                  : 'Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài 27 (10 Câu)'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz and earn your verified Certificate for Lesson 27, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành Bài 27, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
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
