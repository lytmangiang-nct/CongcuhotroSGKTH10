import React, { useState, useEffect } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  BookOpen,
  Award,
  CheckCircle,
  XCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  Calculator,
  Terminal,
  Code
} from 'lucide-react';

export const Section20PracticeApply: React.FC = () => {
  const {
    setOriginalPageTarget,
    setShowOriginalModal,
    bilingualMode,
    navigateToQuiz,
    completeSectionTasks
  } = useBook();

  const isEn = bilingualMode === 'en';

  // Automatically record hands-on completion for Section 4 (Practice & Apply) so quiz unlocks smoothly
  useEffect(() => {
    completeSectionTasks(20, 4);
  }, [completeSectionTasks]);

  // Luyện tập 1 State: S * S Prediction
  const [lt1N, setLt1N] = useState<number>(3);
  const [lt1Answer, setLt1Answer] = useState<string>('');
  const [lt1Checked, setLt1Checked] = useState<boolean | null>(null);

  // Luyện tập 2 State: Factorial n!
  const [factN, setFactN] = useState<number>(5);
  const [factResult, setFactResult] = useState<number | null>(null);

  // Vận dụng 1 State: Harmonic series S = 1 + 1/2 + ... + 1/n
  const [harmN, setHarmN] = useState<number>(5);
  const [harmResult, setHarmResult] = useState<number | null>(null);

  // Vận dụng 2 State: Sum of cubes 1^3 + 2^3 + ... + n^3
  const [cubeN, setCubeN] = useState<number>(4);
  const [cubeResult, setCubeResult] = useState<number | null>(null);

  // Handlers
  const handleCheckLt1 = () => {
    completeSectionTasks(20, 4);
    const s = (lt1N * (lt1N + 1)) / 2;
    const expected = s * s;
    setLt1Checked(Number(lt1Answer.trim()) === expected);
  };

  const handleRunFactorial = () => {
    completeSectionTasks(20, 4);
    let p = 1;
    for (let k = 1; k <= factN; k++) {
      p *= k;
    }
    setFactResult(p);
  };

  const handleRunHarmonic = () => {
    completeSectionTasks(20, 4);
    let s = 0;
    for (let k = 1; k <= harmN; k++) {
      s += 1 / k;
    }
    setHarmResult(s);
  };

  const handleRunCubes = () => {
    completeSectionTasks(20, 4);
    let s = 0;
    for (let k = 1; k <= cubeN; k++) {
      s += k * k * k;
    }
    setCubeResult(s);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
              {isEn ? 'PRACTICE & APPLY • PAGE 107' : 'LUYỆN TẬP & VẬN DỤNG • TRANG 107'}
            </span>
            <span className="text-xs text-slate-400">
              <BilingualText
                vi="Thuật toán tích luỹ, Chuỗi số & Đánh giá năng lực"
                en="Accumulation Algorithms, Series Summations & Mastery Evaluation"
                inline
              />
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            <BilingualText
              vi="4. LUYỆN TẬP, VẬN DỤNG & CẤP CHỨNG CHỈ BÀI 20"
              en="4. PRACTICE, APPLICATIONS & LESSON 20 CERTIFICATION"
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

      {/* PHẦN LUYỆN TẬP (Trang 107) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Luyện tập 1: Dự đoán S * S */}
        <div className="p-5 rounded-2xl bg-slate-900 border-2 border-amber-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              {isEn ? 'Practice 1 (Page 107)' : 'Luyện tập 1 (Trang 107)'}
            </span>
            <span className="text-xs text-slate-400">
              {isEn ? 'Predict S * S result' : 'Dự đoán kết quả S * S'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300 space-y-1">
            <div className="text-slate-500 pb-1 border-b border-slate-800">
              {isEn ? '# PredictSS.py' : '# DuDoanSS.py'}
            </div>
            <div>
              <span className="text-sky-300">n</span> = <span className="text-violet-400">int</span>(
              <span className="text-violet-400">input</span>(
              <span className="text-amber-300">
                {isEn ? '"Enter natural number n: "' : '"Nhập số tự nhiên n: "'}
              </span>))
            </div>
            <div>
              <span className="text-sky-300">S</span> = 0
            </div>
            <div>
              <span className="text-violet-400 font-bold">for</span> <span className="text-sky-300">k</span>{' '}
              <span className="text-violet-400 font-bold">in</span>{' '}
              <span className="text-sky-400">range</span>(<span className="text-sky-300">n</span> + 1):
            </div>
            <div className="pl-6">
              <span className="text-sky-300">S</span> = <span className="text-sky-300">S</span> + <span className="text-sky-300">k</span>
            </div>
            <div>
              <span className="text-emerald-400">print</span>(<span className="text-sky-300">S</span> * <span className="text-sky-300">S</span>)
            </div>
          </div>

          {/* Interactive Challenge */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <div className="text-slate-200 font-bold">
              {isEn ? `Test with n = ${lt1N}:` : `Thử nghiệm với n = ${lt1N}:`}
            </div>
            <p className="text-slate-300">
              {isEn
                ? `Sum S = 0 + 1 + ... + ${lt1N}. Predict the output value S * S:`
                : `Tổng S = 0 + 1 + ... + ${lt1N}. Bạn hãy tính xem kết quả in ra S * S là bao nhiêu?`}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="number"
                placeholder={isEn ? 'Enter S * S value...' : 'Nhập giá trị S * S...'}
                value={lt1Answer}
                onChange={(e) => setLt1Answer(e.target.value)}
                className="w-36 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-emerald-400 font-bold focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleCheckLt1}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold cursor-pointer transition-all shadow-md"
              >
                {isEn ? 'Check Answer' : 'Kiểm Tra'}
              </button>
            </div>

            {lt1Checked !== null && (
              <div
                className={`p-2.5 rounded-lg text-xs font-sans ${
                  lt1Checked
                    ? 'bg-emerald-950 text-emerald-200 border border-emerald-800'
                    : 'bg-rose-950 text-rose-200 border border-rose-800'
                }`}
              >
                {lt1Checked ? (
                  <div>
                    ✅ <strong>{isEn ? 'Correct!' : 'Đúng!'}</strong>{' '}
                    {isEn
                      ? `With n = ${lt1N}, S = ${(lt1N * (lt1N + 1)) / 2}. Screen output:`
                      : `Với n = ${lt1N}, S = ${(lt1N * (lt1N + 1)) / 2}. Khi in ra màn hình:`}{' '}
                    <code className="font-mono text-emerald-300 font-bold">
                      S * S = {((lt1N * (lt1N + 1)) / 2) ** 2}
                    </code>.
                  </div>
                ) : (
                  <div>
                    ❌ <strong>{isEn ? 'Incorrect!' : 'Chưa đúng!'}</strong>{' '}
                    {isEn
                      ? `With n = ${lt1N}, S = 0 + 1 + 2 + 3 = 6. Therefore S * S = 6 * 6 = 36.`
                      : `Với n = ${lt1N}, S = 0 + 1 + 2 + 3 = 6. Do đó S * S = 6 * 6 = 36.`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Luyện tập 2: Tính giai thừa n! */}
        <div className="p-5 rounded-2xl bg-slate-900 border-2 border-sky-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-300 bg-sky-500/20 px-2.5 py-0.5 rounded-full border border-sky-500/30">
              {isEn ? 'Practice 2 (Page 107)' : 'Luyện tập 2 (Trang 107)'}
            </span>
            <span className="text-xs text-slate-400">
              {isEn ? 'Factorial product 1 × 2 × ... × n' : 'Tích giai thừa 1 × 2 × ... × n'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300 space-y-1">
            <div className="text-slate-500 pb-1 border-b border-slate-800">
              {isEn ? '# Factorial.py' : '# GiaiThua.py'}
            </div>
            <div>
              <span className="text-sky-300">n</span> = <span className="text-violet-400">int</span>(
              <span className="text-violet-400">input</span>(
              <span className="text-amber-300">
                {isEn ? '"Enter n: "' : '"Nhập n: "'}
              </span>))
            </div>
            <div>
              <span className="text-sky-300">P</span> = 1{' '}
              <span className="text-slate-500">
                {isEn ? '# Initialize product = 1' : '# Khởi tạo tích bằng 1'}
              </span>
            </div>
            <div>
              <span className="text-violet-400 font-bold">for</span> <span className="text-sky-300">k</span>{' '}
              <span className="text-violet-400 font-bold">in</span>{' '}
              <span className="text-sky-400">range</span>(1, <span className="text-sky-300">n</span> + 1):
            </div>
            <div className="pl-6">
              <span className="text-sky-300">P</span> = <span className="text-sky-300">P</span> * <span className="text-sky-300">k</span>
            </div>
            <div>
              <span className="text-emerald-400">print</span>(
              <span className="text-amber-300">
                {isEn ? '"Factorial is:"' : '"Giai thừa là:"'}
              </span>, <span className="text-sky-300">P</span>)
            </div>
          </div>

          {/* Interactive Calculator */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-bold">
                {isEn ? 'Enter n to calculate n!:' : 'Nhập n để tính giai thừa n!:'}
              </span>
              <span className="font-mono text-sky-400 font-bold">{factN}!</span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="15"
                value={factN}
                onChange={(e) => setFactN(Math.max(1, Math.min(15, Number(e.target.value))))}
                className="w-20 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-sky-400 font-bold focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleRunFactorial}
                className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isEn ? `Compute ${factN}!` : `Tính ${factN}!`}</span>
              </button>
            </div>

            {factResult !== null && (
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-mono font-bold text-sm">
                👉 {isEn ? `Result: ${factN}! = ${factResult.toLocaleString()}` : `Kết quả: ${factN}! = ${factResult.toLocaleString()}`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PHẦN VẬN DỤNG (Trang 107) */}
      <div className="p-6 rounded-2xl bg-linear-to-br from-slate-900 to-indigo-950/20 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-violet-400" />
          <h3 className="text-base font-bold text-white">
            {isEn
              ? 'Textbook Application Page 107: Accumulation Series Algorithms'
              : 'Vận Dụng SGK Trang 107: Thuật Toán Tính Chuỗi Số Lũy Kế'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Vận dụng 1: Chuỗi điều hoà */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300">
                {isEn ? 'Application 1: Harmonic Series' : 'Vận dụng 1: Chuỗi điều hoà'}
              </span>
              <span className="font-mono text-slate-400">S = 1 + 1/2 + ... + 1/n</span>
            </div>

            <pre className="p-3 rounded-lg bg-slate-900 text-slate-300 font-mono border border-slate-800">
              n = <span className="text-violet-400">int</span>(<span className="text-violet-400">input</span>(<span className="text-amber-300">{isEn ? '"Enter n: "' : '"Nhập n: "'}</span>)){'\n'}
              S = 0{'\n'}
              <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>(1, n + 1):{'\n'}
              {'    '}S = S + 1 / k{'\n'}
              <span className="text-emerald-400">print</span>(<span className="text-amber-300">"S ="</span>, S)
            </pre>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-slate-400">n =</span>
              <input
                type="number"
                min="1"
                max="50"
                value={harmN}
                onChange={(e) => setHarmN(Number(e.target.value))}
                className="w-16 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-amber-400 font-bold"
              />
              <button
                type="button"
                onClick={handleRunHarmonic}
                className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold cursor-pointer"
              >
                {isEn ? 'Compute Sum S' : 'Tính Tổng S'}
              </button>
            </div>

            {harmResult !== null && (
              <div className="p-2 rounded bg-slate-900 text-amber-300 font-mono font-bold">
                S = {harmResult.toFixed(4)}
              </div>
            )}
          </div>

          {/* Vận dụng 2: Tổng lập phương */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-300">
                {isEn ? 'Application 2: Sum of Cubes' : 'Vận dụng 2: Tổng lập phương'}
              </span>
              <span className="font-mono text-slate-400">S = 1³ + 2³ + ... + n³</span>
            </div>

            <pre className="p-3 rounded-lg bg-slate-900 text-slate-300 font-mono border border-slate-800">
              n = <span className="text-violet-400">int</span>(<span className="text-violet-400">input</span>(<span className="text-amber-300">{isEn ? '"Enter n: "' : '"Nhập n: "'}</span>)){'\n'}
              S = 0{'\n'}
              <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>(1, n + 1):{'\n'}
              {'    '}S = S + k**3{'\n'}
              <span className="text-emerald-400">print</span>(<span className="text-amber-300">"S ="</span>, S)
            </pre>

            <div className="flex items-center gap-3 pt-1">
              <span className="text-slate-400">n =</span>
              <input
                type="number"
                min="1"
                max="20"
                value={cubeN}
                onChange={(e) => setCubeN(Number(e.target.value))}
                className="w-16 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-emerald-400 font-bold"
              />
              <button
                type="button"
                onClick={handleRunCubes}
                className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
              >
                {isEn ? 'Compute Sum S' : 'Tính Tổng S'}
              </button>
            </div>

            {cubeResult !== null && (
              <div className="p-2 rounded bg-slate-900 text-emerald-300 font-mono font-bold">
                S = {cubeResult} {isEn ? `(Equals (1+2+...+${cubeN})² = ${((cubeN * (cubeN + 1)) / 2) ** 2}!)` : `(Bằng (1+2+...+${cubeN})² = ${((cubeN * (cubeN + 1)) / 2) ** 2}!)`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QUIZ GUIDANCE CARD: Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border-2 border-indigo-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {isEn
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài 20 (10 Câu)'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz and earn your verified Certificate for Lesson 20, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành Bài 20, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
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
