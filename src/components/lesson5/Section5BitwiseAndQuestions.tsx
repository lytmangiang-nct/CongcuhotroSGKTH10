import React, { useState } from 'react';
import {
  Binary,
  Volume2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  CheckCircle2,
  Cpu,
  BookOpen,
  Info,
  Check,
  X,
  Eye,
  EyeOff,
  RotateCcw,
  Bookmark
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section5BitwiseAndQuestions: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive Bitwise Calculator
  const [bitA, setBitA] = useState<string>('1100');
  const [bitB, setBitB] = useState<string>('1010');
  const [activeBitwiseOp, setActiveBitwiseOp] = useState<'AND' | 'OR' | 'XOR' | 'NOT_A'>('AND');

  // Question 1 State (SGK Page 26) - No answer shown in advance!
  const [q1Inputs, setQ1Inputs] = useState<Record<string, string>>({
    notA: '',
    and: '',
    or: '',
    xor: ''
  });
  const [q1Checked, setQ1Checked] = useState(false);
  const [showQ1Solution, setShowQ1Solution] = useState(false);

  // Question 2 State (Bảng 5.3 SGK Page 26: Tìm phương án SAI)
  const [q2SelectedOpt, setQ2SelectedOpt] = useState<string | null>(null);
  const [q2Checked, setQ2Checked] = useState(false);
  const [showQ2Solution, setShowQ2Solution] = useState(false);

  // Helper bitwise computation
  const computeBitwise = () => {
    const len = Math.max(bitA.length, bitB.length);
    const padA = bitA.padStart(len, '0');
    const padB = bitB.padStart(len, '0');
    const res: string[] = [];

    for (let i = 0; i < len; i++) {
      const a = parseInt(padA[i] || '0', 10);
      const b = parseInt(padB[i] || '0', 10);
      if (activeBitwiseOp === 'AND') res.push(String(a & b));
      else if (activeBitwiseOp === 'OR') res.push(String(a | b));
      else if (activeBitwiseOp === 'XOR') res.push(String(a ^ b));
      else if (activeBitwiseOp === 'NOT_A') res.push(String(a === 1 ? 0 : 1));
    }
    return { padA, padB, result: res.join('') };
  };

  const { padA, padB, result: computedResult } = computeBitwise();

  // Question 1 Checking:
  // bitA = 1100, bitB = 1010
  // NOT A = 0011
  // AND = 1000
  // OR = 1110
  // XOR = 0110
  const isQ1Correct = {
    notA: q1Inputs.notA.trim() === '0011',
    and: q1Inputs.and.trim() === '1000',
    or: q1Inputs.or.trim() === '1110',
    xor: q1Inputs.xor.trim() === '0110'
  };
  const isAllQ1Correct = isQ1Correct.notA && isQ1Correct.and && isQ1Correct.or && isQ1Correct.xor;

  const speechText =
    "Logic Operations on Bit Sequences on Page 26. Bitwise operations apply fundamental logic gates to corresponding bits at each position simultaneously. Memory Box 1: Fundamental logic operations include AND, OR, XOR, and NOT. Logic operations can be executed on each bit of bit sequences. Reinforcement Question 1 tests bitwise operations on sequences 1100 and 1010. Question 2 identifies the incorrect row in Table 5.3.";

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-teal-900 via-indigo-900 to-slate-900 rounded-3xl text-white shadow-lg border border-teal-700/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-teal-400/20">
            <Binary className="w-3.5 h-3.5" />
            <span>
              {bilingualMode === 'en' ? 'Section 1 (cont.) • Textbook Page 26' : 'Mục 1 (tiếp) • SGK Trang 26'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {bilingualMode === 'en'
              ? 'LOGIC OPERATIONS ON BIT SEQUENCES & REINFORCEMENT'
              : 'PHÉP TOÁN LÔGIC TRÊN DÃY BIT & CÂU HỎI CỦNG CỐ'}
          </h1>
          <p className="text-xs sm:text-sm text-teal-200 mt-1">
            {bilingualMode === 'en'
              ? 'Figure 5.3: Bitwise operations on corresponding bits • Memory Box 1'
              : 'Hình 5.3: Thực hiện phép toán bitwise trên từng bit tương ứng • Hộp Ghi nhớ 1'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {bilingualMode !== 'vi' && (
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speak(speechText, 'en');
                }
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer border border-white/10"
              title={bilingualMode === 'en' ? 'Listen to standard English pronunciation' : 'Nghe phát âm chuẩn tiếng Anh'}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-cyan-300' : ''}`} />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(26);
              setShowOriginalModal(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'View Page 26 Scan' : 'Xem trang 26 SGK'}</span>
          </button>
        </div>
      </div>

      {/* Teacher Prompts Widget for Section 2 */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={5} />

      {/* Bitwise Theory & Figure 5.3 SGK */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Pedagogical Concept • Figure 5.3 SGK Page 26' : 'Khái niệm sư phạm • Hình 5.3 SGK Trang 26'}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Principles of Bitwise Logic Operations on Bit Sequences'
                : 'Nguyên lý phép toán lôgic bitwise trên dãy bit'}
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {bilingualMode === 'en' ? 'Corresponding bits at identical positions' : 'Từng bit tương ứng ở cùng vị trí'}
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              In computers, numeric and character data are stored as sequences of bits (such as 8-bit, 16-bit, 32-bit, 64-bit). Logic operations are performed simultaneously on <strong>each pair of corresponding bits</strong> at the same position across two bit sequences:
            </>
          ) : (
            <>
              Trong máy tính, dữ liệu số và ký tự đều được lưu trữ dưới dạng các dãy bit (như 8 bit, 16 bit, 32 bit, 64 bit). Các phép toán lôgic được thực hiện đồng thời trên <strong>từng cặp bit tương ứng</strong> ở cùng vị trí của hai dãy bit:
            </>
          )}
        </p>

        {/* Figure 5.3 Demonstration Graphic */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-between">
            <span>
              {bilingualMode === 'en'
                ? 'Figure 5.3 Standard Example: Given two bit sequences A = 1100 and B = 1010'
                : 'Ví dụ chuẩn SGK Hình 5.3: Cho hai dãy bit A = 1100 và B = 1010'}
            </span>
            <span className="text-[11px] text-teal-600 dark:text-teal-400 font-normal">
              {bilingualMode === 'en' ? 'Evaluated column by column' : 'Thực hiện theo từng cột bit'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* NOT A */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-600 dark:text-rose-400">
                {bilingualMode === 'en' ? '1. NOT sequence A' : '1. Phép NOT dãy A'}
              </div>
              <div className="font-mono text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>{bilingualMode === 'en' ? 'Sequence A:' : 'Dãy A:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">1 1 0 0</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1 text-rose-600 font-bold">
                  <span>NOT A:</span>
                  <span>0 0 1 1</span>
                </div>
              </div>
            </div>

            {/* A AND B */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {bilingualMode === 'en' ? '2. Sequence A AND B' : '2. Phép A AND B'}
              </div>
              <div className="font-mono text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>{bilingualMode === 'en' ? 'Sequence A:' : 'Dãy A:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">1 1 0 0</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>{bilingualMode === 'en' ? 'Sequence B:' : 'Dãy B:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">1 0 1 0</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1 text-indigo-600 font-bold">
                  <span>A AND B:</span>
                  <span>1 0 0 0</span>
                </div>
              </div>
            </div>

            {/* A OR B */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-teal-600 dark:text-teal-400">
                {bilingualMode === 'en' ? '3. Sequence A OR B' : '3. Phép A OR B'}
              </div>
              <div className="font-mono text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>{bilingualMode === 'en' ? 'Sequence A:' : 'Dãy A:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">1 1 0 0</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>{bilingualMode === 'en' ? 'Sequence B:' : 'Dãy B:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">1 0 1 0</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1 text-teal-600 font-bold">
                  <span>A OR B:</span>
                  <span>1 1 1 0</span>
                </div>
              </div>
            </div>

            {/* A XOR B */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {bilingualMode === 'en' ? '4. Sequence A XOR B' : '4. Phép A XOR B'}
              </div>
              <div className="font-mono text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>{bilingualMode === 'en' ? 'Sequence A:' : 'Dãy A:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">1 1 0 0</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>{bilingualMode === 'en' ? 'Sequence B:' : 'Dãy B:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">1 0 1 0</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1 text-amber-600 font-bold">
                  <span>A XOR B:</span>
                  <span>0 1 1 0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Bitwise Sandbox */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-teal-50/50 dark:from-indigo-950/30 dark:to-teal-950/20 border border-indigo-200 dark:border-indigo-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
              {bilingualMode === 'en'
                ? 'Interactive Bitwise Calculator (Try different bit sequences):'
                : 'Bộ tính toán Bitwise tương tác (Thử với các dãy bit khác):'}
            </div>
            <div className="flex items-center gap-1.5">
              {(['AND', 'OR', 'XOR', 'NOT_A'] as const).map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => setActiveBitwiseOp(op)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    activeBitwiseOp === op
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {op === 'NOT_A' ? 'NOT (A)' : op}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {bilingualMode === 'en' ? 'Bit sequence A (enter 0s and 1s):' : 'Dãy bit A (nhập các số 0 và 1):'}
              </label>
              <input
                type="text"
                value={bitA}
                onChange={(e) => setBitA(e.target.value.replace(/[^01]/g, '').slice(0, 8))}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm tracking-widest text-indigo-600"
                placeholder="1100"
              />
            </div>
            {activeBitwiseOp !== 'NOT_A' && (
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {bilingualMode === 'en' ? 'Bit sequence B (enter 0s and 1s):' : 'Dãy bit B (nhập các số 0 và 1):'}
                </label>
                <input
                  type="text"
                  value={bitB}
                  onChange={(e) => setBitB(e.target.value.replace(/[^01]/g, '').slice(0, 8))}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm tracking-widest text-teal-600"
                  placeholder="1010"
                />
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between font-mono text-xs sm:text-sm">
            <span className="text-slate-500 font-sans font-semibold">
              {bilingualMode === 'en' ? 'Calculated Result:' : 'Kết quả tính toán:'}
            </span>
            <div className="font-bold text-indigo-700 dark:text-cyan-300 tracking-widest text-base">
              {computedResult}
            </div>
          </div>
        </div>
      </div>

      {/* Memory Box 1 (SGK Trang 26) */}
      <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2.5">
          <Bookmark className="w-5 h-5 text-amber-300" />
          <h3 className="font-black uppercase tracking-wider text-xs sm:text-sm text-indigo-200">
            {bilingualMode === 'en' ? 'Memory Box 1 (Textbook Page 26)' : 'Hộp Ghi nhớ 1 (SGK Trang 26)'}
          </h3>
        </div>
        <p className="text-sm sm:text-base font-semibold leading-relaxed text-white">
          {bilingualMode === 'en' ? (
            <>
              “Fundamental logic operations include: Conjunction (<span className="text-cyan-300 font-bold">AND</span>), Disjunction (<span className="text-cyan-300 font-bold">OR</span>), Exclusive OR (<span className="text-cyan-300 font-bold">XOR</span>), and Negation (<span className="text-cyan-300 font-bold">NOT</span>). Logic operations can be executed on each bit of bit sequences.”
            </>
          ) : (
            <>
              “Các phép toán lôgic cơ bản gồm: phép hội (<span className="text-cyan-300 font-bold">AND</span>), phép tuyển (<span className="text-cyan-300 font-bold">OR</span>), phép tuyển loại trừ (<span className="text-cyan-300 font-bold">XOR</span>) và phép phủ định (<span className="text-cyan-300 font-bold">NOT</span>). Phép toán lôgic có thể thực hiện trên từng bit của dãy bit.”
            </>
          )}
        </p>
      </div>

      {/* Reinforcement Question 1 (SGK Trang 26) - STRICT NO PRE-ANSWER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm shadow-xs">
              ?1
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? 'Reinforcement Question 1 (Page 26)' : 'Câu hỏi củng cố 1 (SGK Trang 26)'}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? 'Perform logic operations on two bit sequences 1100 and 1010'
                  : 'Thực hiện các phép toán lôgic trên hai dãy bit 1100 và 1010'}
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-400 italic">
            {bilingualMode === 'en' ? 'Students solve first' : 'Học sinh tự làm trước'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              Given two bit sequences: <strong>Sequence 1: 1100</strong> and <strong>Sequence 2: 1010</strong>. Calculate and enter the 4-bit results below:
            </>
          ) : (
            <>
              Cho hai dãy bit: <strong>Dãy 1: 1100</strong> và <strong>Dãy 2: 1010</strong>. Em hãy tính và nhập kết quả (gồm 4 ký tự bit) vào các ô dưới đây:
            </>
          )}
        </p>

        {/* 4 Interactive Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en'
                ? 'a) NOT on the first sequence (NOT 1100):'
                : 'a) Phép NOT dãy thứ nhất (NOT 1100):'}
            </label>
            <input
              type="text"
              maxLength={4}
              value={q1Inputs.notA}
              onChange={(e) => setQ1Inputs({ ...q1Inputs, notA: e.target.value.replace(/[^01]/g, '') })}
              placeholder={bilingualMode === 'en' ? 'Enter 4 bits...' : 'Nhập 4 bit...'}
              className={`w-full px-3 py-2 rounded-xl border font-mono font-bold text-sm tracking-widest ${
                q1Checked
                  ? isQ1Correct.notA
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                    : 'border-rose-500 bg-rose-50/50 text-rose-800'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en'
                ? 'b) AND between two bit sequences (1100 AND 1010):'
                : 'b) Phép AND giữa hai dãy bit (1100 AND 1010):'}
            </label>
            <input
              type="text"
              maxLength={4}
              value={q1Inputs.and}
              onChange={(e) => setQ1Inputs({ ...q1Inputs, and: e.target.value.replace(/[^01]/g, '') })}
              placeholder={bilingualMode === 'en' ? 'Enter 4 bits...' : 'Nhập 4 bit...'}
              className={`w-full px-3 py-2 rounded-xl border font-mono font-bold text-sm tracking-widest ${
                q1Checked
                  ? isQ1Correct.and
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                    : 'border-rose-500 bg-rose-50/50 text-rose-800'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en'
                ? 'c) OR between two bit sequences (1100 OR 1010):'
                : 'c) Phép OR giữa hai dãy bit (1100 OR 1010):'}
            </label>
            <input
              type="text"
              maxLength={4}
              value={q1Inputs.or}
              onChange={(e) => setQ1Inputs({ ...q1Inputs, or: e.target.value.replace(/[^01]/g, '') })}
              placeholder={bilingualMode === 'en' ? 'Enter 4 bits...' : 'Nhập 4 bit...'}
              className={`w-full px-3 py-2 rounded-xl border font-mono font-bold text-sm tracking-widest ${
                q1Checked
                  ? isQ1Correct.or
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                    : 'border-rose-500 bg-rose-50/50 text-rose-800'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en'
                ? 'd) XOR between two bit sequences (1100 XOR 1010):'
                : 'd) Phép XOR giữa hai dãy bit (1100 XOR 1010):'}
            </label>
            <input
              type="text"
              maxLength={4}
              value={q1Inputs.xor}
              onChange={(e) => setQ1Inputs({ ...q1Inputs, xor: e.target.value.replace(/[^01]/g, '') })}
              placeholder={bilingualMode === 'en' ? 'Enter 4 bits...' : 'Nhập 4 bit...'}
              className={`w-full px-3 py-2 rounded-xl border font-mono font-bold text-sm tracking-widest ${
                q1Checked
                  ? isQ1Correct.xor
                    ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                    : 'border-rose-500 bg-rose-50/50 text-rose-800'
                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQ1Checked(true)}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Check Answers' : 'Kiểm tra bài làm'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setQ1Inputs({ notA: '', and: '', or: '', xor: '' });
                setQ1Checked(false);
              }}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              title={bilingualMode === 'en' ? 'Reset' : 'Làm lại'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowQ1Solution(!showQ1Solution)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {showQ1Solution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>
              {showQ1Solution
                ? (bilingualMode === 'en' ? 'Hide Official Solution' : 'Ẩn lời giải chuẩn SGK')
                : (bilingualMode === 'en' ? 'View Official Solution' : 'Xem gợi ý & Đáp án chuẩn SGK')}
            </span>
          </button>
        </div>

        {/* Solution Box (Hidden initially) */}
        {showQ1Solution && (
          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-slate-700 dark:text-slate-200 space-y-2 animate-fadeIn">
            <div className="font-bold text-emerald-900 dark:text-emerald-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {bilingualMode === 'en'
                  ? 'Official Textbook Answers and Step-by-Step Explanation:'
                  : 'Đáp án và giải thích chi tiết chuẩn SGK:'}
              </span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <strong>a) NOT 1100 = 0011:</strong>{' '}
                {bilingualMode === 'en'
                  ? 'Invert each bit: 1 becomes 0, 0 becomes 1.'
                  : 'Đảo từng bit: 1 thành 0, 0 thành 1.'}
              </li>
              <li>
                <strong>b) 1100 AND 1010 = 1000:</strong>{' '}
                {bilingualMode === 'en'
                  ? 'Only the first column has 1 AND 1 = 1; all other columns contain at least one 0, yielding 0.'
                  : 'Chỉ có cột đầu tiên là 1 AND 1 = 1, các cột còn lại đều có ít nhất một số 0 nên bằng 0.'}
              </li>
              <li>
                <strong>c) 1100 OR 1010 = 1110:</strong>{' '}
                {bilingualMode === 'en'
                  ? 'The first three columns have at least one 1 yielding 1; the final column 0 OR 0 = 0.'
                  : 'Ba cột đầu đều có ít nhất một số 1 nên bằng 1, cột cuối cùng 0 OR 0 = 0.'}
              </li>
              <li>
                <strong>d) 1100 XOR 1010 = 0110:</strong>{' '}
                {bilingualMode === 'en'
                  ? 'Columns 1 and 4 have identical bits (1=1 and 0=0) so XOR = 0; Columns 2 and 3 have different bits so XOR = 1.'
                  : 'Cột 1 và cột 4 có hai bit giống nhau (1=1 và 0=0) nên XOR = 0; Cột 2 và cột 3 có bit khác nhau nên XOR = 1.'}
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Reinforcement Question 2: Table 5.3 SGK Page 26 (Find the FALSE row) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm shadow-xs">
              ?2
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? 'Reinforcement Question 2 (Table 5.3 Page 26)' : 'Câu hỏi củng cố 2 (Bảng 5.3 SGK Trang 26)'}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? 'Table 5.3 contains one FALSE calculation. Which option is it?'
                  : 'Bảng 5.3 có một phương án tính toán SAI, em hãy chỉ ra đó là phương án nào?'}
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-400 italic">
            {bilingualMode === 'en' ? 'Select 1 incorrect option' : 'Chọn 1 phương án sai'}
          </span>
        </div>

        {/* Table 5.3 Reproduction */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3">{bilingualMode === 'en' ? 'Option' : 'Phương án'}</th>
                <th className="py-2.5 px-3">{bilingualMode === 'en' ? 'Operation' : 'Phép toán'}</th>
                <th className="py-2.5 px-3 font-mono">{bilingualMode === 'en' ? 'Bit sequence x' : 'Dãy bit x'}</th>
                <th className="py-2.5 px-3 font-mono">{bilingualMode === 'en' ? 'Bit sequence y' : 'Dãy bit y'}</th>
                <th className="py-2.5 px-3 font-mono">{bilingualMode === 'en' ? 'Result in Table 5.3' : 'Kết quả trong Bảng 5.3'}</th>
                <th className="py-2.5 px-3">{bilingualMode === 'en' ? 'Your Selection' : 'Lựa chọn của em'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {[
                { opt: 'A', op: 'x AND y', x: '1100', y: '1010', resTable: '1000', isErr: false },
                { opt: 'B', op: 'x OR y', x: '1100', y: '1010', resTable: '1110', isErr: false },
                { opt: 'C', op: 'x XOR y', x: '1100', y: '1010', resTable: '0111', isErr: true }, // Should be 0110, table says 0111
                { opt: 'D', op: 'NOT x', x: '1100', y: '-', resTable: '0011', isErr: false }
              ].map((row) => {
                const isSelected = q2SelectedOpt === row.opt;
                return (
                  <tr
                    key={row.opt}
                    onClick={() => setQ2SelectedOpt(row.opt)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-indigo-100/90 dark:bg-indigo-950/60 font-bold ring-2 ring-indigo-500'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                      {bilingualMode === 'en' ? `Option ${row.opt}` : `Phương án ${row.opt}`}
                    </td>
                    <td className="py-3 px-3 font-sans font-semibold text-slate-700 dark:text-slate-300">
                      {row.op}
                    </td>
                    <td className="py-3 px-3">{row.x}</td>
                    <td className="py-3 px-3">{row.y}</td>
                    <td className="py-3 px-3 font-bold text-indigo-600 dark:text-cyan-300">
                      {row.resTable}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-xl text-xs font-bold font-sans ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {isSelected
                          ? (bilingualMode === 'en' ? 'Selected' : 'Đã chọn')
                          : (bilingualMode === 'en' ? 'Click to select' : 'Bấm chọn')}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setQ2Checked(true)}
            disabled={!q2SelectedOpt}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              q2SelectedOpt
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Check Answer' : 'Kiểm tra đáp án'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowQ2Solution(!showQ2Solution)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {showQ2Solution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>
              {showQ2Solution
                ? (bilingualMode === 'en' ? 'Hide Explanation' : 'Ẩn lời giải')
                : (bilingualMode === 'en' ? 'View Official Explanation' : 'Xem gợi ý & Đáp án chuẩn SGK')}
            </span>
          </button>
        </div>

        {/* Question 2 Feedback */}
        {q2Checked && q2SelectedOpt === 'C' && (
          <div className="p-4 rounded-2xl border text-xs leading-relaxed bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {bilingualMode === 'en'
                  ? 'Textbook Explanation: Option C is the FALSE calculation. The correct result of 1100 XOR 1010 is 0110, not 0111.'
                  : 'Giải thích chuẩn SGK: Phương án C là phương án tính SAI. Kết quả đúng của 1100 XOR 1010 phải là 0110 chứ không phải 0111.'}
              </span>
            </div>
          </div>
        )}

        {/* Detailed Solution (Hidden by default) */}
        {showQ2Solution && (
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-200 space-y-1.5 animate-fadeIn">
            <div className="font-bold text-amber-900 dark:text-amber-300 text-sm">
              {bilingualMode === 'en'
                ? 'Official Explanation for Table 5.3:'
                : 'Giải thích chi tiết chuẩn SGK Bảng 5.3:'}
            </div>
            <p>
              {bilingualMode === 'en'
                ? <>Given the operation in Option C: <code className="font-mono font-bold text-indigo-700">1100 XOR 1010</code>.</>
                : <>Ta có phép toán ở phương án C: <code className="font-mono font-bold text-indigo-700">1100 XOR 1010</code>.</>}
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 font-mono">
              <li>{bilingualMode === 'en' ? 'Column 1: 1 XOR 1 = 0' : 'Cột 1: 1 XOR 1 = 0'}</li>
              <li>{bilingualMode === 'en' ? 'Column 2: 1 XOR 0 = 1' : 'Cột 2: 1 XOR 0 = 1'}</li>
              <li>{bilingualMode === 'en' ? 'Column 3: 0 XOR 1 = 1' : 'Cột 3: 0 XOR 1 = 1'}</li>
              <li>
                {bilingualMode === 'en'
                  ? 'Column 4: 0 XOR 0 = 0 (Table wrote 1, which is FALSE!)'
                  : 'Cột 4: 0 XOR 0 = 0 (Trong bảng ghi số 1 là SAI!)'}
              </li>
            </ul>
            <p className="font-semibold text-slate-900 dark:text-white pt-1">
              {bilingualMode === 'en' ? (
                <>
                  Therefore the correct result must be <strong className="text-emerald-600">0110</strong>. Table 5.3 shows 0111, which is the FALSE option.
                </>
              ) : (
                <>
                  Do đó kết quả đúng phải là <strong className="text-emerald-600">0110</strong>. Bảng 5.3 ghi 0111 là phương án SAI.
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Card */}
      <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {bilingualMode === 'en' ? 'Next Section:' : 'Phần tiếp theo:'}
          </div>
          <div className="font-bold text-slate-900 dark:text-white text-sm">
            {bilingualMode === 'en'
              ? '2. Logic Data Representation in Computers & Python Conventions (Pages 26 – 27)'
              : '2. Biểu diễn dữ liệu lôgic trong máy tính & Quy ước Python (Trang 26 – 27)'}
          </div>
        </div>

        <button
          type="button"
          onClick={nextPage}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm transition-all shadow-md cursor-pointer shrink-0"
        >
          <span>{bilingualMode === 'en' ? 'Explore Logic Representation' : 'Khám phá biểu diễn dữ liệu lôgic'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
