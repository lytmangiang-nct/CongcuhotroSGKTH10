import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Target,
  ArrowRight,
  HelpCircle,
  Binary,
  Layers,
  CheckCircle2,
  Cpu,
  Calculator,
  ToggleLeft,
  ToggleRight,
  Eye,
  RotateCcw,
  Lightbulb
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section4Overview: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive Bit Switcher for 8 bits (powers 0..7)
  const [bits, setBits] = useState<number[]>([0, 0, 0, 0, 1, 1, 0, 1]); // default = 13 (00001101)

  const speechText =
    "Lesson 4: Binary Numeral System and Integer Data. Learning Objectives: Understand the binary system and integer representation inside computers; Explain the applications of the binary system in computer science. Warm-up question: In the decimal system, every positive integer can be decomposed into powers of 10, for example 513 = 5 times 10 squared plus 1 times 10 to the first plus 3 times 10 to the zero. Similarly, positive integers can be decomposed into powers of 2, such as 13 = 1 times 2 cubed plus 1 times 2 squared plus 0 times 2 to the first plus 1 times 2 to the zero, which equals binary 1101. Can we use numeral systems other than decimal to represent numbers?";

  const powers = [128, 64, 32, 16, 8, 4, 2, 1];
  const exponents = [7, 6, 5, 4, 3, 2, 1, 0];

  const toggleBit = (index: number) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 1 ? 0 : 1;
    setBits(newBits);
  };

  const currentDecimal = bits.reduce((sum, bit, idx) => sum + bit * powers[idx], 0);
  const binaryString = bits.join('');

  const loadPreset = (presetValue: number) => {
    const newBits = [];
    for (let i = 7; i >= 0; i--) {
      newBits.push((presetValue >> i) & 1);
    }
    setBits(newBits);
  };

  return (
    <div className="space-y-6">
      {/* Teacher Prompts Widget for Lesson 4 Section 0 */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={4} />

      {/* Top Banner: Lesson Header with SGK Scan Link & English Voice */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs">
                {bilingualMode === 'en' ? 'Topic 1 • Lesson 4' : 'Chủ đề 1 • Bài 4'}
              </span>
              <span className="text-white/60">•</span>
              <button
                type="button"
                onClick={() => {
                  setOriginalPageTarget(20);
                  setShowOriginalModal(true);
                }}
                className="text-xs text-amber-200 hover:text-white underline font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                title={bilingualMode === 'en' ? 'Click to open original Page 20 scan' : 'Bấm để mở bản scan Trang 20 SGK gốc'}
              >
                <span>{bilingualMode === 'en' ? 'Page 20 SGK (View Scan)' : 'Trang 20 SGK (Xem scan)'}</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
              {bilingualMode === 'en'
                ? 'Lesson 4: Binary System and Integer Data'
                : 'Bài 4: Hệ nhị phân và dữ liệu số nguyên'}
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 italic">
              Binary Numeral System (Base-2) &amp; Fixed-Point Signed / Unsigned Integer Representation
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speak(speechText, 'en');
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                isSpeaking
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-white text-indigo-700 hover:bg-blue-50'
              }`}
              title={bilingualMode === 'en' ? 'Listen to English overview' : 'Nghe phát âm tiếng Anh chuẩn'}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? 'STOP' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Learning Objectives Box (Mục tiêu bài học - Trang 20 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
          <Target className="w-5 h-5 stroke-[2.5]" />
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wide">
            {bilingualMode === 'en' ? 'Learning Objectives (Page 20 SGK)' : 'Mục tiêu bài học (Trang 20 SGK)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
              1
            </div>
            <div>
              <BilingualText
                vi="Biết được hệ nhị phân và biểu diễn số nguyên trong máy tính."
                en="Understand the binary numeral system and integer representation inside computers."
                badge={bilingualMode === 'en' ? 'Objective 1' : 'Mục tiêu 1'}
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex items-start gap-3">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
              2
            </div>
            <div>
              <BilingualText
                vi="Giải thích được ứng dụng của hệ nhị phân trong tin học."
                en="Explain practical applications of the binary numeral system in computer science."
                badge={bilingualMode === 'en' ? 'Objective 2' : 'Mục tiêu 2'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Section (Khởi động - Trang 20 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400">
            <HelpCircle className="w-5 h-5 stroke-[2.5]" />
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wide">
              {bilingualMode === 'en' ? 'Warm-up Challenge (Page 20 SGK)' : 'Khởi động: So sánh luỹ thừa 10 và luỹ thừa 2 (Trang 20 SGK)'}
            </h2>
          </div>
          <span className="text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800">
            {bilingualMode === 'en' ? 'SGK Warm-up' : 'Khởi động SGK'}
          </span>
        </div>

        <BilingualText
          vi="Trong hệ thập phân, mỗi số nguyên dương đều có thể phân tích thành tổng các luỹ thừa của 10. Ví dụ: 513 = 5 × 10² + 1 × 10¹ + 3 × 10⁰. Tương tự, mỗi số nguyên dương cũng có thể phân tích thành tổng các luỹ thừa của 2. Ví dụ: 13 = 1 × 2³ + 1 × 2² + 0 × 2¹ + 1 × 2⁰ = 1101₂. Có thể dùng các hệ đếm khác hệ thập phân để biểu diễn số hay không?"
          en="In the decimal system, every positive integer can be decomposed into powers of 10. For example: 513 = 5 × 10² + 1 × 10¹ + 3 × 10⁰. Similarly, every positive integer can be decomposed into powers of 2. For instance: 13 = 1 × 2³ + 1 × 2² + 0 × 2¹ + 1 × 2⁰ = 1101₂. Can we use numeral systems other than decimal to represent numbers?"
          highlightWords={['hệ thập phân', 'hệ nhị phân', 'luỹ thừa của 2', '1101', 'decimal system', 'binary system']}
        />

        {/* Visual Comparison Card: Decimal 513 vs Binary 13 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Decimal Box */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
              <span className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4" />
                <span>{bilingualMode === 'en' ? 'Decimal System (Base-10)' : 'Hệ thập phân (Cơ số 10)'}</span>
              </span>
              <span className="font-mono bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded">
                {bilingualMode === 'en' ? 'Number 513' : 'Số 513'}
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/60 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              <div className="font-bold text-amber-700 dark:text-amber-400 mb-1">513₁₀</div>
              <div>= 5 × 10² + 1 × 10¹ + 3 × 10⁰</div>
              <div className="text-slate-500 text-[11px] mt-1">= 500 + 10 + 3</div>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {bilingualMode === 'en'
                ? 'Uses 10 digits from 0 to 9. Each position is 10 times the position to its right.'
                : 'Sử dụng 10 chữ số từ 0 đến 9. Vị trí mỗi chữ số gấp 10 lần vị trí bên phải.'}
            </p>
          </div>

          {/* Binary Box */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-blue-800 dark:text-blue-300">
              <span className="flex items-center gap-1.5">
                <Binary className="w-4 h-4" />
                <span>{bilingualMode === 'en' ? 'Binary System (Base-2)' : 'Hệ nhị phân (Cơ số 2)'}</span>
              </span>
              <span className="font-mono bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded">
                {bilingualMode === 'en' ? 'Number 13₁₀ = 1101₂' : 'Số 13₁₀ = 1101₂'}
              </span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200/60 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              <div className="font-bold text-blue-700 dark:text-blue-400 mb-1">1101₂</div>
              <div>= 1 × 2³ + 1 × 2² + 0 × 2¹ + 1 × 2⁰</div>
              <div className="text-slate-500 text-[11px] mt-1">= 8 + 4 + 0 + 1 = 13₁₀</div>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              {bilingualMode === 'en'
                ? 'Uses only 2 digits 0 and 1. Each position is 2 times the position immediately to its right.'
                : 'Chỉ dùng 2 chữ số 0 và 1. Vị trí mỗi chữ số gấp 2 lần vị trí ngay bên phải nó.'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool: 8-Bit Interactive Powers-of-2 Switcher */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center">
              <Binary className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {bilingualMode === 'en'
                  ? 'Interactive Simulator: Explore Powers-of-2 Bit Weights (8-Bit)'
                  : 'Mô phỏng tương tác: Khám phá trọng số luỹ thừa của 2 (8 bit)'}
              </h3>
              <p className="text-xs text-slate-400">
                {bilingualMode === 'en'
                  ? 'Toggle individual bit switches (0 or 1) to see the decimal sum update in real time!'
                  : 'Bật/tắt từng công tắc bit (0 hoặc 1) để xem tổng giá trị thập phân thay đổi ngay lập tức!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold mr-1">
              {bilingualMode === 'en' ? 'Textbook Examples:' : 'Ví dụ SGK:'}
            </span>
            <button
              type="button"
              onClick={() => loadPreset(13)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              13 (1101₂)
            </button>
            <button
              type="button"
              onClick={() => loadPreset(19)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              19 (10011₂)
            </button>
            <button
              type="button"
              onClick={() => loadPreset(27)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              27 (11011₂)
            </button>
            <button
              type="button"
              onClick={() => loadPreset(255)}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors cursor-pointer border border-slate-700"
            >
              {bilingualMode === 'en' ? '255 (8 ones)' : '255 (8 bit 1)'}
            </button>
            <button
              type="button"
              onClick={() => setBits([0, 0, 0, 0, 0, 0, 0, 0])}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title={bilingualMode === 'en' ? 'Reset to 0' : 'Đặt về 0'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 8-bit Interactive Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {bits.map((bit, idx) => {
            const exp = exponents[idx];
            const weight = powers[idx];
            const isOn = bit === 1;

            return (
              <div
                key={idx}
                onClick={() => toggleBit(idx)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer text-center select-none flex flex-col justify-between ${
                  isOn
                    ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-500/30 scale-[1.02]'
                    : 'bg-slate-800/80 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400 font-bold mb-1">
                  2<sup>{exp}</sup>
                </div>
                <div className={`text-2xl sm:text-3xl font-black font-mono my-1 ${isOn ? 'text-white' : 'text-slate-500'}`}>
                  {bit}
                </div>
                <div className={`text-xs font-mono font-bold mt-1 ${isOn ? 'text-blue-100' : 'text-slate-400'}`}>
                  +{isOn ? weight : 0}
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-center">
                  {isOn ? (
                    <span className="text-emerald-300 font-bold">{bilingualMode === 'en' ? 'ON (1)' : 'BẬT (1)'}</span>
                  ) : (
                    <span className="text-slate-500">{bilingualMode === 'en' ? 'OFF (0)' : 'TẮT (0)'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Calculation Output Display */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
          <div className="text-xs space-y-1 text-center md:text-left">
            <div className="text-slate-400">
              {bilingualMode === 'en' ? 'Binary Representation:' : 'Biểu diễn nhị phân (Binary):'}
            </div>
            <div className="text-lg sm:text-xl font-black text-blue-400 tracking-widest">
              {binaryString}₂
            </div>
            <div className="text-[11px] text-slate-400">
              = {bits.map((b, i) => (b === 1 ? powers[i] : null)).filter(Boolean).join(' + ') || '0'}
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="text-xs text-slate-400">
              {bilingualMode === 'en' ? 'Decimal Equivalent Value:' : 'Giá trị thập phân tương ứng (Decimal):'}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              {currentDecimal}₁₀
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Next Step */}
      <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-indigo-900 dark:text-indigo-300 font-medium">
          {bilingualMode === 'en' ? (
            <>Next Step: <strong>Section 1a &amp; 1b. Binary System &amp; Base Conversion Algorithm (Textbook Pages 20 – 21)</strong></>
          ) : (
            <>Bước tiếp theo: <strong>Mục 1a &amp; 1b. Hệ nhị phân và Thuật toán đổi cơ số (Trang 20 – 21 SGK)</strong></>
          )}
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Explore Conversion Algorithm' : 'Khám phá thuật toán đổi cơ số'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
