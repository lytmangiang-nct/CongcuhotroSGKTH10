import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Binary,
  ArrowRight,
  ArrowUp,
  RotateCcw,
  Sparkles,
  Calculator,
  Eye,
  Check,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section4BinaryConversion: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Dynamic Division Tool State
  const [inputNumber, setInputNumber] = useState<number>(19);
  const [calcInput, setCalcInput] = useState<string>('19');

  // Exercise 1 (Đổi 13, 155, 76 sang nhị phân)
  const [ansEx1, setAnsEx1] = useState<{ [key: string]: string }>({ '13': '', '155': '', '76': '' });
  const [showEx1Answers, setShowEx1Answers] = useState<boolean>(false);

  // Exercise 2 (Đổi 110011, 10011011, 1001110 sang thập phân)
  const [ansEx2, setAnsEx2] = useState<{ [key: string]: string }>({ '110011': '', '10011011': '', '1001110': '' });
  const [showEx2Answers, setShowEx2Answers] = useState<boolean>(false);

  const speechText =
    "Section 1a and 1b: Binary Numeral System and Base Conversion. Activity 1: Representing 19 as powers of 2: 19 = 16 + 2 + 1 = 1 times 2 to the fourth plus 0 times 2 cubed plus 0 times 2 squared plus 1 times 2 to the first plus 1 times 2 to the zero. The binary numeral system is base-2, using only two digits 0 and 1. Each digit is called a bit, short for binary digit. Successive division by 2 algorithm: To convert a positive integer to binary, repeatedly divide the number by 2, record the remainders, and read the sequence of remainders in reverse order from bottom to top. For example, 19 divided by 2 repeatedly gives remainders 1, 1, 0, 0, 1. Reading upwards yields binary 10011.";

  // Compute successive division steps for any positive integer
  const computeDivisionSteps = (n: number) => {
    if (n <= 0) return [];
    const steps: { current: number; quotient: number; remainder: number }[] = [];
    let cur = n;
    while (cur > 0) {
      const quotient = Math.floor(cur / 2);
      const remainder = cur % 2;
      steps.push({ current: cur, quotient, remainder });
      cur = quotient;
    }
    return steps;
  };

  const steps = computeDivisionSteps(inputNumber);
  const binaryResult = steps.length > 0 ? steps.map((s) => s.remainder).reverse().join('') : '0';

  const handleApplyNumber = (val: number) => {
    if (val >= 1 && val <= 65535) {
      setInputNumber(val);
      setCalcInput(val.toString());
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Section 1a & 1b • Pages 20 – 21 SGK' : 'Mục 1a & 1b • Trang 20 – 21 SGK'}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(20);
                setShowOriginalModal(true);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{bilingualMode === 'en' ? 'View scan pp. 20–21' : 'Xem scan Tr.20–21'}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? '1. Binary System & Base Conversion Algorithm (Figure 4.1)'
              : '1. Hệ nhị phân và Thuật toán đổi cơ số (Hình 4.1)'}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            if (isSpeaking) {
              stopSpeaking();
            } else {
              speak(speechText, 'en');
            }
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs shrink-0 ${
            isSpeaking
              ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          title={bilingualMode === 'en' ? 'Listen to English explanation' : 'Nghe phát âm tiếng Anh cho mục 1a & 1b'}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isSpeaking ? 'STOP' : 'EN'}</span>
        </button>
      </div>

      {/* Hoạt động 1 (Trang 20 SGK): Biểu diễn số thành tổng các luỹ thừa của 2 */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-blue-700 dark:text-blue-400 font-black">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base sm:text-lg">
              {bilingualMode === 'en'
                ? 'Activity 1: Representing 19 as sum of powers of 2 (Page 20 SGK)'
                : 'Hoạt động 1: Biểu diễn số 19 thành tổng các luỹ thừa của 2 (Trang 20 SGK)'}
            </h3>
          </div>
          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
            {bilingualMode === 'en' ? 'Activity 1 p. 20' : 'HĐ1 Trang 20'}
          </span>
        </div>

        <BilingualText
          vi="Tìm các số thích hợp vào chỗ chấm để biểu diễn số 19 thành tổng các luỹ thừa của 2: 19 = 16 + 2 + 1 = 1 × 2⁴ + 0 × 2³ + 0 × 2² + 1 × 2¹ + 1 × 2⁰ = 10011₂. Dãy các hệ số 1, 0, 0, 1, 1 chính là biểu diễn của số 19 trong hệ nhị phân."
          en="Find suitable numbers to express 19 as a sum of powers of 2: 19 = 16 + 2 + 1 = 1 × 2⁴ + 0 × 2³ + 0 × 2² + 1 × 2¹ + 1 × 2⁰ = 10011₂. The coefficient sequence 1, 0, 0, 1, 1 constitutes the binary representation of 19."
          highlightWords={['luỹ thừa của 2', 'hệ nhị phân', '10011', 'powers of 2', 'binary representation']}
        />

        {/* Visual decomposition of 19 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm space-y-2">
          <div className="font-bold text-slate-700 dark:text-slate-300">
            {bilingualMode === 'en'
              ? 'Decomposing number 19 into decreasing powers of 2:'
              : 'Phân tích số 19 theo luỹ thừa giảm dần:'}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black text-sm sm:text-base">
            <span>19₁₀</span>
            <span>=</span>
            <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">1 × 2⁴ (16)</span>
            <span>+</span>
            <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 opacity-60">0 × 2³ (0)</span>
            <span>+</span>
            <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 opacity-60">0 × 2² (0)</span>
            <span>+</span>
            <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">1 × 2¹ (2)</span>
            <span>+</span>
            <span className="bg-white dark:bg-slate-900 px-2 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">1 × 2⁰ (1)</span>
          </div>
          <div className="text-emerald-700 dark:text-emerald-400 font-bold text-xs pt-1">
            {bilingualMode === 'en' ? (
              <>➔ Assemble coefficients from left to right: <strong>10011₂</strong></>
            ) : (
              <>➔ Ghép các hệ số từ trái sang phải: <strong>10011₂</strong></>
            )}
          </div>
        </div>
      </div>

      {/* a) Hệ nhị phân (Trang 20 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Binary className="w-5 h-5 text-indigo-600" />
          <span>
            {bilingualMode === 'en'
              ? 'a) Characteristics of the Binary System (Page 20 SGK)'
              : 'a) Đặc điểm của hệ nhị phân (Trang 20 SGK)'}
          </span>
        </h3>

        <BilingualText
          vi="Hệ nhị phân là hệ đếm cơ số 2, chỉ dùng hai chữ số là 0 và 1. Mỗi chữ số nhị phân được gọi là một bit (viết tắt của từ binary digit). Trong hệ nhị phân, giá trị của mỗi chữ số phụ thuộc vào vị trí của nó: mỗi vị trí có giá trị gấp 2 lần vị trí ngay bên phải nó. Để phân biệt, số nhị phân thường được viết kèm chỉ số 2 ở dưới, ví dụ 1101₂ hoặc 1101(2)."
          en="The binary numeral system is a base-2 system using only two digits: 0 and 1. Each binary digit is called a bit. In binary, the positional value of each digit depends on its location: each position is worth twice the value of the position to its immediate right. To distinguish it from decimal, binary numbers are written with a subscript 2, such as 1101₂ or 1101(2)."
          highlightWords={['cơ số 2', 'bit', 'binary digit', 'chỉ số 2', '1101', 'base-2']}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
            <div className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase">
              {bilingualMode === 'en' ? '1. Base & Digits' : '1. Cơ số & Kí tự'}
            </div>
            <div className="text-sm font-black text-blue-700 dark:text-blue-400 mt-1">
              {bilingualMode === 'en' ? 'Base-2 (Only 0 and 1)' : 'Cơ số 2 (Chỉ dùng 0 và 1)'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {bilingualMode === 'en'
                ? 'Perfect fit for electronic circuit switches (on / off, closed / open).'
                : 'Phù hợp tuyệt đối với cấu tạo mạch điện tử (đóng / mở, bật / tắt).'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60">
            <div className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase">
              {bilingualMode === 'en' ? '2. Fundamental Unit (Bit)' : '2. Đơn vị cơ bản (Bit)'}
            </div>
            <div className="text-sm font-black text-indigo-700 dark:text-indigo-400 mt-1">
              Bit = Binary Digit
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {bilingualMode === 'en'
                ? 'Each position stores 1 bit. 8 bits combine to form 1 byte of storage.'
                : 'Mỗi vị trí chứa 1 bit. 8 bit ghép thành 1 byte lưu trữ.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
            <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase">
              {bilingualMode === 'en' ? '3. Weighting Rule' : '3. Quy tắc trọng số'}
            </div>
            <div className="text-sm font-black text-emerald-700 dark:text-emerald-400 mt-1">
              {bilingualMode === 'en' ? 'Powers 2^k (Doubling)' : 'Luỹ thừa 2^k (Gấp đôi)'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {bilingualMode === 'en'
                ? 'From right to left: 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32...'
                : 'Từ phải sang trái: 2⁰=1, 2¹=2, 2²=4, 2³=8, 2⁴=16, 2⁵=32...'}
            </p>
          </div>
        </div>
      </div>

      {/* b) Thuật toán chia 2 liên tiếp (Hình 4.1 SGK Trang 21) & Interactive Step-by-Step Tool */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center">
              4.1
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {bilingualMode === 'en'
                  ? 'Successive Division by 2 Algorithm (Figure 4.1 Textbook Page 21)'
                  : 'Thuật toán chia 2 liên tiếp (Hình 4.1 SGK Trang 21)'}
              </h3>
              <p className="text-xs text-slate-400">
                {bilingualMode === 'en'
                  ? 'Repeatedly divide by 2 and record remainders until quotient is 0, then read remainders upwards!'
                  : 'Chia liên tiếp cho 2 lấy số dư cho tới khi thương bằng 0, sau đó đọc ngược từ dưới lên trên!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold mr-1">
              {bilingualMode === 'en' ? 'Textbook Quick Tries:' : 'Thử nhanh SGK:'}
            </span>
            {[13, 19, 76, 155, 620].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => handleApplyNumber(sample)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer border ${
                  inputNumber === sample
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input for Any Number */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="decInput" className="text-xs text-slate-300 font-bold whitespace-nowrap">
              {bilingualMode === 'en' ? 'Enter any decimal integer (1 – 65535):' : 'Nhập số thập phân bất kỳ (1 – 65535):'}
            </label>
            <input
              id="decInput"
              type="number"
              min={1}
              max={65535}
              value={calcInput}
              onChange={(e) => setCalcInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = parseInt(calcInput, 10);
                  if (!isNaN(val)) handleApplyNumber(val);
                }
              }}
              className="w-28 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-mono font-bold text-sm outline-none focus:border-amber-500"
            />
            <button
              type="button"
              onClick={() => {
                const val = parseInt(calcInput, 10);
                if (!isNaN(val)) handleApplyNumber(val);
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
            >
              {bilingualMode === 'en' ? 'Execute Division' : 'Thực hiện chia'}
            </button>
          </div>

          <div className="text-xs text-slate-400">
            {bilingualMode === 'en' ? 'Current number: ' : 'Số đang phân tích: '}
            <strong className="text-amber-400 text-sm font-mono">{inputNumber}₁₀</strong>
          </div>
        </div>

        {/* Division Steps Table (Replicating Hình 4.1 SGK) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-8 overflow-x-auto">
            <table className="w-full text-xs sm:text-sm font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 text-left">
                  <th className="py-2 px-3">{bilingualMode === 'en' ? 'Step' : 'Lần chia'}</th>
                  <th className="py-2 px-3">{bilingualMode === 'en' ? 'Division' : 'Phép chia'}</th>
                  <th className="py-2 px-3">{bilingualMode === 'en' ? 'Quotient' : 'Thương số'}</th>
                  <th className="py-2 px-3 text-amber-400 font-bold">{bilingualMode === 'en' ? 'Remainder' : 'Số dư'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {steps.map((step, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-2.5 px-3 text-slate-400 font-medium">
                      {bilingualMode === 'en' ? `Step ${idx + 1}` : `Lần ${idx + 1}`}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-200">
                      {step.current} : 2
                    </td>
                    <td className="py-2.5 px-3 text-blue-300 font-bold">
                      = {step.quotient}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-black border border-amber-500/40">
                        {bilingualMode === 'en' ? `rem ${step.remainder}` : `dư ${step.remainder}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Upward Arrow & Final Result */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <ArrowUp className="w-4 h-4 stroke-[3] animate-bounce" />
              <span>
                {bilingualMode === 'en'
                  ? 'Read remainders upwards from bottom to top'
                  : 'Đọc số dư ngược từ dưới lên'}
              </span>
            </div>

            <div className="space-y-1.5 font-mono">
              <div className="text-xs text-slate-400">
                {bilingualMode === 'en' ? 'Sequence of remainders upwards:' : 'Dãy số dư từ dưới lên:'}
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 tracking-wider break-all">
                {binaryResult}₂
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-slate-200">
                {bilingualMode === 'en' ? 'Official Textbook Conclusion:' : 'Kết luận chuẩn SGK:'}
              </div>
              <div>{inputNumber}₁₀ = <strong className="text-emerald-400 font-mono">{binaryResult}₂</strong></div>
              {inputNumber === 620 && (
                <div className="text-[11px] text-blue-300 pt-1">
                  {bilingualMode === 'en'
                    ? '16-bit format: 0000001001101100₂ (Figure 4.1 Textbook Page 21).'
                    : 'Định dạng 16 bit: 0000001001101100₂ (Hình 4.1 SGK Trang 21).'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Củng cố cuối mục 1 (Trang 21 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base sm:text-lg">
              {bilingualMode === 'en'
                ? 'Review Questions for Section 1 (Textbook Page 21)'
                : 'Câu hỏi củng cố cuối mục 1 (Trang 21 SGK)'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-full">
            {bilingualMode === 'en' ? 'Page 21 SGK' : 'Trang 21 SGK'}
          </span>
        </div>

        {/* Câu 1: Đổi sang nhị phân */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            {bilingualMode === 'en' ? (
              <><strong>Question 1 (P. 21):</strong> Convert the following numbers to binary: <strong>13, 155, 76</strong></>
            ) : (
              <><strong>Câu 1 (Tr. 21):</strong> Đổi các số sau sang hệ nhị phân: <strong>13, 155, 76</strong></>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { num: '13', correct: '1101' },
              { num: '155', correct: '10011011' },
              { num: '76', correct: '1001100' }
            ].map(({ num, correct }) => (
              <div key={num} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {bilingualMode === 'en' ? `Number ${num}₁₀:` : `Số ${num}₁₀:`}
                </div>
                <input
                  type="text"
                  placeholder={bilingualMode === 'en' ? 'Enter binary...' : 'Nhập nhị phân...'}
                  value={ansEx1[num]}
                  onChange={(e) => setAnsEx1({ ...ansEx1, [num]: e.target.value.trim() })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                {showEx1Answers && (
                  <div className="text-[11px] font-mono font-bold pt-1">
                    {ansEx1[num] === correct ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> <BilingualText vi={`Đúng: ${correct}₂`} en={`Correct: ${correct}₂`} />
                      </span>
                    ) : (
                      <span className="text-rose-600">
                        <BilingualText vi={`Đáp án đúng: ${correct}₂`} en={`Correct answer: ${correct}₂`} />
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowEx1Answers((v) => !v)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
            >
              {showEx1Answers
                ? (bilingualMode === 'en' ? 'Hide Question 1 Answers' : 'Ẩn đáp án Câu 1')
                : (bilingualMode === 'en' ? 'Check Question 1 Answers' : 'Kiểm tra đáp án Câu 1')}
            </button>
          </div>
        </div>

        {/* Câu 2: Đổi sang thập phân */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            {bilingualMode === 'en' ? (
              <><strong>Question 2 (P. 21):</strong> Convert the following binary numbers to decimal: <strong>110011₂, 10011011₂, 1001110₂</strong></>
            ) : (
              <><strong>Câu 2 (Tr. 21):</strong> Đổi các số nhị phân sau sang hệ thập phân: <strong>110011₂, 10011011₂, 1001110₂</strong></>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { bin: '110011', correct: '51', calc: '32 + 16 + 2 + 1 = 51' },
              { bin: '10011011', correct: '155', calc: '128 + 16 + 8 + 2 + 1 = 155' },
              { bin: '1001110', correct: '78', calc: '64 + 8 + 4 + 2 = 78' }
            ].map(({ bin, correct, calc }) => (
              <div key={bin} className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                  {bin}₂:
                </div>
                <input
                  type="text"
                  placeholder={bilingualMode === 'en' ? 'Enter decimal...' : 'Nhập thập phân...'}
                  value={ansEx2[bin]}
                  onChange={(e) => setAnsEx2({ ...ansEx2, [bin]: e.target.value.trim() })}
                  className="w-full px-2.5 py-1.5 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                {showEx2Answers && (
                  <div className="text-[11px] font-mono font-bold pt-1">
                    {ansEx2[bin] === correct ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> {bilingualMode === 'en' ? `Correct (${calc})` : `Đúng (${calc})`}
                      </span>
                    ) : (
                      <span className="text-rose-600">
                        {bilingualMode === 'en' ? (
                          <>Answer: <strong>{correct}₁₀</strong> ({calc})</>
                        ) : (
                          <>Đáp án: <strong>{correct}₁₀</strong> ({calc})</>
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowEx2Answers((v) => !v)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
            >
              {showEx2Answers
                ? (bilingualMode === 'en' ? 'Hide Question 2 Answers' : 'Ẩn đáp án Câu 2')
                : (bilingualMode === 'en' ? 'Check Question 2 Answers' : 'Kiểm tra đáp án Câu 2')}
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation Next Step */}
      <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-blue-950 dark:text-blue-300 font-medium">
          {bilingualMode === 'en' ? (
            <>Next Step: <strong>Section 1c. Integer Representation: Sign-Magnitude, One's &amp; Two's Complement (Page 21 SGK)</strong></>
          ) : (
            <>Bước tiếp theo: <strong>Mục 1c. Biểu diễn số nguyên trong máy tính: Mã thuận, Mã bù 1, Mã bù 2 (Trang 21 SGK)</strong></>
          )}
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Explore Signed Integer Representation' : 'Khám phá biểu diễn số nguyên có dấu'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
