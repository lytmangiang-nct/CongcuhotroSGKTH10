import React, { useState } from 'react';
import {
  Calculator,
  Volume2,
  ArrowRight,
  Layers,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Repeat,
  AlertCircle,
  Hash
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section17DataOperations: React.FC = () => {
  const { bilingualMode, speak, isSpeaking, stopSpeaking, nextPage } = useBook();

  // Interactive Operations Explorer
  const [numA, setNumA] = useState<number>(10);
  const [numB, setNumB] = useState<number>(3);
  const [strInput, setStrInput] = useState<string>('Tin học 10 ');
  const [repeatCount, setRepeatCount] = useState<number>(3);

  // Checkpoint Quiz States
  const [ansOp1, setAnsOp1] = useState<string>('');
  const [ansOp2, setAnsOp2] = useState<string>('');

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textVi =
        'Mục 2: Các phép toán trên một số kiểu dữ liệu cơ bản. Các phép toán trên dữ liệu kiểu số gồm cộng, trừ, nhân, chia, chia lấy phần nguyên, chia lấy phần dư và lũy thừa. Phép lũy thừa có ưu tiên cao nhất và thực hiện từ phải sang trái. Phép toán trên xâu gồm cộng nối xâu và nhân lặp xâu.';
      const textEn =
        'Section 2: Operations on Basic Data Types. Numeric operations include addition, subtraction, multiplication, division, floor division, modulus, and exponentiation. Exponentiation has the highest precedence and evaluates right-to-left. String operations include concatenation (+) and replication (*).';
      speak(bilingualMode === 'en' ? textEn : textVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12 font-sans">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-black uppercase tracking-wider">
            {bilingualMode === 'en'
              ? 'Section 2 • Pages 93 – 94'
              : 'Mục 2 • SGK Tin học 10 Trang 93 – 94'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {bilingualMode === 'en'
              ? '2. Operations on Basic Data Types'
              : '2. Các phép toán trên một số kiểu dữ liệu cơ bản'}
          </h1>
        </div>
      </div>

      {/* Part 1: Numeric Operations & Right-to-Left Exponentiation (Trang 93) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-orange-600 dark:text-orange-400 font-black text-base">
          <Calculator className="w-5 h-5" />
          <span>
            {bilingualMode === 'en'
              ? 'Example 1: Numeric Data Operations (Page 93)'
              : 'Ví dụ 1: Các phép toán trên dữ liệu kiểu số (Trang 93)'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm space-y-2 text-slate-200 border border-slate-800">
            <div className="text-slate-400">&gt;&gt;&gt; a, b = 10, 3</div>
            <div className="text-slate-400">&gt;&gt;&gt; (a+b)**2 + (a-b)*10</div>
            <div className="text-amber-400">239</div>
            <div className="text-slate-400">&gt;&gt;&gt; (a//b)*b + a%b</div>
            <div className="text-emerald-400">
              10{' '}
              <span className="text-slate-500 font-sans text-xs">
                {bilingualMode === 'en' ? '# // is floor quotient (3), % is modulus (1)' : '# // lấy thương nguyên (3), % lấy số dư (1)'}
              </span>
            </div>
            <div className="text-slate-400">&gt;&gt;&gt; c = b/2</div>
            <div className="text-cyan-400">
              1.5{' '}
              <span className="text-slate-500 font-sans text-xs">
                {bilingualMode === 'en' ? '# / always returns a float' : '# / luôn trả về số thực (float)'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/40 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <div className="font-extrabold text-orange-900 dark:text-orange-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>
                {bilingualMode === 'en'
                  ? 'Special: Right-to-Left Associativity of Exponentiation (**)'
                  : 'Đặc biệt: Tính kết hợp PHẢI SANG TRÁI của lũy thừa (**)'}
              </span>
            </div>
            <p className="leading-relaxed">
              {bilingualMode === 'en' ? (
                <>
                  Conventional arithmetic operations evaluate from left to right, but exponentiation{' '}
                  <code className="font-mono font-bold text-orange-600">**</code> uniquely evaluates from{' '}
                  <strong>RIGHT TO LEFT</strong>:
                </>
              ) : (
                <>
                  Tất cả các phép toán thông thường được tính từ trái sang phải, riêng phép lũy thừa{' '}
                  <code className="font-mono font-bold text-orange-600">**</code> thì thực hiện từ{' '}
                  <strong>PHẢI SANG TRÁI</strong>:
                </>
              )}
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs border border-orange-200 dark:border-orange-900/50 space-y-1">
              <div>&gt;&gt;&gt; 4**2**3 → 4**(2**3) = 4**8 = <span className="text-emerald-500 font-bold">65536</span></div>
              <div className="text-slate-400">
                &gt;&gt;&gt; (4**2)**3 → 16**3 = 4096 {bilingualMode === 'en' ? '(with explicit parentheses)' : '(khi có dấu ngoặc)'}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Calculator Sandbox */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Hash className="w-4 h-4 text-orange-600" />
            <span>
              {bilingualMode === 'en'
                ? 'Quick interactive test of arithmetic operators with numbers a and b:'
                : 'Thử nghiệm nhanh các toán tử số học với hai số a và b:'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 text-xs">
              <span className="font-bold">a = </span>
              <input
                type="number"
                value={numA}
                onChange={(e) => setNumA(Number(e.target.value))}
                className="w-16 p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
              />
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="font-bold">b = </span>
              <input
                type="number"
                value={numB}
                onChange={(e) => setNumB(Number(e.target.value))}
                className="w-16 p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">a // b = </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                {numB !== 0 ? Math.floor(numA / numB) : bilingualMode === 'en' ? 'Error' : 'Lỗi'}
              </span>
              <div className="text-[10px] text-slate-500 font-sans">
                {bilingualMode === 'en' ? 'Floor quotient' : 'Thương nguyên'}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">a % b = </span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                {numB !== 0 ? numA % numB : bilingualMode === 'en' ? 'Error' : 'Lỗi'}
              </span>
              <div className="text-[10px] text-slate-500 font-sans">
                {bilingualMode === 'en' ? 'Modulus remainder' : 'Số dư'}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">a / b = </span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                {numB !== 0 ? (numA / numB).toFixed(2) : bilingualMode === 'en' ? 'Error' : 'Lỗi'}
              </span>
              <div className="text-[10px] text-slate-500 font-sans">
                {bilingualMode === 'en' ? 'Float division' : 'Số thực (float)'}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400">a ** b = </span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">{Math.pow(numA, numB)}</span>
              <div className="text-[10px] text-slate-500 font-sans">
                {bilingualMode === 'en' ? 'Power a^b' : 'Lũy thừa a^b'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: String Operations (Trang 94) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-black text-base">
          <Repeat className="w-5 h-5" />
          <span>
            {bilingualMode === 'en'
              ? 'Example 2: String Data Operations (Page 94)'
              : 'Ví dụ 2: Các phép toán trên dữ liệu kiểu xâu kí tự (Trang 94)'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm space-y-2 text-slate-200 border border-slate-800">
            <div className="text-slate-400">&gt;&gt;&gt; s1 = "Hà Nội"</div>
            <div className="text-slate-400">&gt;&gt;&gt; s2 = "Việt Nam"</div>
            <div className="text-slate-400">&gt;&gt;&gt; s1 + s2</div>
            <div className="text-emerald-400">
              'Hà NộiViệt Nam'{' '}
              <span className="text-slate-500 font-sans text-xs">
                {bilingualMode === 'en' ? '# String concatenation' : '# Phép nối hai xâu'}
              </span>
            </div>
            <div className="text-slate-400">&gt;&gt;&gt; "123" * 5</div>
            <div className="text-amber-400">
              '123123123123123'{' '}
              <span className="text-slate-500 font-sans text-xs">
                {bilingualMode === 'en' ? '# Repeat string 5 times' : '# Phép nhân lặp 5 lần'}
              </span>
            </div>
            <div className="text-slate-400">&gt;&gt;&gt; s1 * 0</div>
            <div className="text-cyan-400">
              ''{' '}
              <span className="text-slate-500 font-sans text-xs">
                {bilingualMode === 'en' ? '# Multiplying by n <= 0 yields empty string' : '# Nhân với n ≤ 0 cho xâu rỗng'}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-3">
            <div className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
              {bilingualMode === 'en' ? 'Interactive string repetition demo:' : 'Trải nghiệm lặp xâu tương tác:'}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={strInput}
                onChange={(e) => setStrInput(e.target.value)}
                placeholder={bilingualMode === 'en' ? 'Enter string...' : 'Nhập xâu...'}
                className="w-full p-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs font-mono"
              />
              <div className="flex items-center gap-2 text-xs">
                <span>{bilingualMode === 'en' ? 'Repeat count n = ' : 'Số lần lặp n = '}</span>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={repeatCount}
                  onChange={(e) => setRepeatCount(Math.max(0, Math.min(10, Number(e.target.value))))}
                  className="w-16 p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"
                />
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800 break-all">
              &gt;&gt;&gt; "{strInput}" * {repeatCount} → '{strInput.repeat(repeatCount)}'
            </div>
          </div>
        </div>
      </div>

      {/* Operator Precedence Table (Thứ tự ưu tiên - Trang 94) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>
            {bilingualMode === 'en'
              ? 'Python Operator Precedence Hierarchy (Page 94)'
              : 'Bảng Thứ tự Thực hiện Phép toán trong Python (Trang 94)'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-orange-500/40 space-y-1">
            <span className="text-[10px] uppercase font-black text-orange-400">
              {bilingualMode === 'en' ? 'Precedence 1 (Highest)' : 'Ưu tiên 1 (Cao nhất)'}
            </span>
            <div className="font-mono text-sm font-bold text-amber-300">
              {bilingualMode === 'en' ? 'Parentheses ( )' : 'Dấu ngoặc ( )'}
            </div>
            <div className="text-slate-400 text-[11px]">
              {bilingualMode === 'en' ? 'Expressions in parentheses evaluate first' : 'Biểu thức trong ngoặc luôn được tính trước'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-orange-500/40 space-y-1">
            <span className="text-[10px] uppercase font-black text-orange-400">
              {bilingualMode === 'en' ? 'Precedence 2' : 'Ưu tiên 2'}
            </span>
            <div className="font-mono text-sm font-bold text-amber-300">
              {bilingualMode === 'en' ? 'Exponentiation **' : 'Lũy thừa **'}
            </div>
            <div className="text-slate-400 text-[11px]">
              {bilingualMode === 'en' ? (
                <>Evaluated <strong>RIGHT to LEFT</strong></>
              ) : (
                <>Thực hiện từ <strong>PHẢI sang TRÁI</strong></>
              )}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-blue-500/40 space-y-1">
            <span className="text-[10px] uppercase font-black text-blue-400">
              {bilingualMode === 'en' ? 'Precedence 3' : 'Ưu tiên 3'}
            </span>
            <div className="font-mono text-sm font-bold text-cyan-300">* , / , // , %</div>
            <div className="text-slate-400 text-[11px]">
              {bilingualMode === 'en'
                ? 'Mult, div, floor, mod (left to right)'
                : 'Nhân, chia, thương nguyên, số dư (trái sang phải)'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-1">
            <span className="text-[10px] uppercase font-black text-indigo-400">
              {bilingualMode === 'en' ? 'Precedence 4 (Lowest)' : 'Ưu tiên 4 (Thấp nhất)'}
            </span>
            <div className="font-mono text-sm font-bold text-indigo-300">+ , -</div>
            <div className="text-slate-400 text-[11px]">
              {bilingualMode === 'en'
                ? 'Addition, subtraction (left to right)'
                : 'Cộng, trừ thông thường (trái sang phải)'}
            </div>
          </div>
        </div>
      </div>

      {/* SGK Summary Box 2: Hộp ghi nhớ (Trang 94) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-orange-500/10 dark:bg-orange-950/30 border-2 border-dashed border-orange-400 dark:border-orange-700/60 space-y-3">
        <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 font-black text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText
            vi="Hộp Ghi nhớ 2 (SGK Tin học 10 Trang 94)"
            en="Summary Box 2 (Textbook Page 94)"
          />
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
          <li className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Các phép toán trên dữ liệu kiểu số: +, -, *, /, //, %, **."
                en="Arithmetic operations on numeric data types: +, -, *, /, //, %, **."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Các phép toán trên dữ liệu kiểu xâu: + (nối xâu) và * (lặp xâu)."
                en="Operations on string data types: + (concatenation) and * (repetition)."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-orange-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Trong biểu thức có cả số thực và số nguyên thì kết quả sẽ tự động có kiểu số thực (float)."
                en="In expressions combining float and integer operands, the result automatically evaluates to float."
              />
            </div>
          </li>
        </ul>
      </div>

      {/* Checkpoint Questions (Câu hỏi củng cố 1 & 2 - Trang 94) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-black text-base">
          <HelpCircle className="w-5 h-5" />
          <span>
            {bilingualMode === 'en'
              ? 'Checkpoint Questions Section 2 (Page 94)'
              : 'Câu hỏi củng cố sau Mục 2 (SGK Trang 94)'}
          </span>
        </div>

        {/* Question 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '1. Is the following statement valid or invalid? If valid, what is its result?'
              : '1. Mỗi lệnh sau là đúng hay sai? Nếu đúng cho kết quả là bao nhiêu?'}
            <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 mt-1">
              &gt;&gt;&gt; (12 - 10//2)**2 - 1
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {[
              {
                id: 'q1a',
                labelVi: 'Sai cú pháp',
                labelEn: 'Syntax Error'
              },
              {
                id: 'q1b',
                labelVi: 'Đúng, kết quả là 48',
                labelEn: 'Valid, result is 48',
                correct: true
              },
              {
                id: 'q1c',
                labelVi: 'Đúng, kết quả là 50',
                labelEn: 'Valid, result is 50'
              }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAnsOp1(opt.id)}
                className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                  ansOp1 === opt.id
                    ? opt.correct
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                {bilingualMode === 'en' ? opt.labelEn : opt.labelVi}
              </button>
            ))}
          </div>
          {ansOp1 === 'q1b' && (
            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Explanation: 10//2 = 5; 12 - 5 = 7; 7**2 - 1 = 49 - 1 = 48. The second expression (13 + 45**2)(...) causes SyntaxError due to missing * operator.'
                  : 'Giải thích: 10//2 = 5; 12 - 5 = 7; 7**2 - 1 = 49 - 1 = 48. Lệnh thứ hai (13 + 45**2)(...) bị lỗi SyntaxError vì thiếu dấu *.'}
              </span>
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '2. What string outputs do the following statements produce?'
              : '2. Mỗi lệnh sau cho kết quả là xâu kí tự như thế nào?'}
            <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 mt-1">
              &gt;&gt;&gt; ""*20 + "010" &nbsp;&nbsp;|&nbsp;&nbsp; &gt;&gt;&gt; "10" + "0"*5
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {[
              {
                id: 'q2a',
                labelVi: '"010" và "100000"',
                labelEn: '"010" and "100000"',
                correct: true
              },
              {
                id: 'q2b',
                labelVi: '"" và "50"',
                labelEn: '"" and "50"'
              },
              {
                id: 'q2c',
                labelVi: '"20010" và "100000"',
                labelEn: '"20010" and "100000"'
              }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAnsOp2(opt.id)}
                className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                  ansOp2 === opt.id
                    ? opt.correct
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                {bilingualMode === 'en' ? opt.labelEn : opt.labelVi}
              </button>
            ))}
          </div>
          {ansOp2 === 'q2a' && (
            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Explanation: Empty string multiplied by 20 remains empty, concatenated with "010" produces "010". "10" concatenated with "0"*5 ("00000") yields "100000".'
                  : 'Giải thích: Xâu rỗng nhân 20 vẫn là xâu rỗng, nối "010" ra "010". "10" nối với "0"*5 ("00000") ra "100000".'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={17} />

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:scale-95 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
        >
          <span>
            {bilingualMode === 'en'
              ? 'Continue to Section 3: Keywords in Python'
              : 'Tiếp tục Mục 3: Từ khoá trong Python'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
