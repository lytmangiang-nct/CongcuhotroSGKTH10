import React, { useState } from 'react';
import {
  Code,
  CheckCircle2,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calculator,
  Type,
  Hash,
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section16FirstCommands: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive Print sandbox state
  const [hasCustomizedSandbox, setHasCustomizedSandbox] = useState<boolean>(false);
  const [printArg1, setPrintArg1] = useState<string>(isEn ? '"Total is:"' : '"Tổng là:"');
  const [printArg2, setPrintArg2] = useState<string>('3 + 7');
  const [printArg3, setPrintArg3] = useState<string>(isEn ? '"10th grade student"' : '"học sinh lớp 10"');
  const [customExpression, setCustomExpression] = useState<string>('13 + 10*3/2 - 3*2');

  // Synchronize default sandbox inputs with bilingualMode only if not customized by user
  React.useEffect(() => {
    if (!hasCustomizedSandbox) {
      if (bilingualMode === 'en') {
        setPrintArg1('"Total is:"');
        setPrintArg2('3 + 7');
        setPrintArg3('"10th grade student"');
      } else {
        setPrintArg1('"Tổng là:"');
        setPrintArg2('3 + 7');
        setPrintArg3('"học sinh lớp 10"');
      }
    }
  }, [bilingualMode, hasCustomizedSandbox]);

  // Checkpoint question 1 interactive reveal
  const [showQ1Answers, setShowQ1Answers] = useState<boolean>(false);
  // Checkpoint question 2 interactive reveal
  const [showQ2Answer, setShowQ2Answer] = useState<boolean>(false);

  // Dynamic calculated print outputs
  const evalSafe = (expr: string): string => {
    try {
      const trimmed = expr.trim();
      if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        return trimmed.slice(1, -1);
      }
      // eslint-disable-next-line no-eval
      const res = eval(trimmed);
      return String(res);
    } catch {
      return expr;
    }
  };

  const dynamicPrintOutput = `${evalSafe(printArg1)} ${evalSafe(printArg2)} ${evalSafe(printArg3)}`.trim();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-indigo-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-emerald-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Section 3 • Pages 88–89' : 'Mục 3 • Trang 88 – 89'}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-100 text-xs font-mono font-semibold">
              int • float • str • print()
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '3. FIRST PYTHON COMMANDS & PRINT() FUNCTION'
              : '3. MỘT SỐ LỆNH PYTHON ĐẦU TIÊN & HÀM PRINT()'}
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Discover Python\'s dynamic type inference for integers (int), floating-point numbers (float), and text strings (str). Master basic arithmetic operations and the versatile print() function.'
              : 'Khám phá khả năng tự nhận biết kiểu dữ liệu số nguyên (int), số thực (float) và xâu ký tự (str) của Python. Làm chủ các phép toán số học cơ bản và hàm xuất dữ liệu print() đa năng.'}
          </p>

          {bilingualMode !== 'vi' && (
            <div className="pt-2">
              <button
                onClick={() =>
                  speak(
                    bilingualMode === 'en'
                      ? 'Section 3: First Python Commands. When entering numbers or text strings from the command line, Python automatically recognizes the data type. It distinguishes between integers and floating-point numbers and performs arithmetic operations like addition, subtraction, multiplication, and division. The print() function outputs data to the screen and can display multiple values separated by spaces.'
                      : 'Mục 3: Một số lệnh Python đầu tiên. Khi nhập giá trị số hoặc xâu kí tự từ dòng lệnh, Python tự nhận biết kiểu dữ liệu. Python có thể thực hiện các phép toán thông thường với số, phân biệt số thực và số nguyên. Lệnh print() có chức năng in dữ liệu ra màn hình, có thể in ra một hoặc nhiều giá trị đồng thời.'
                  )
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>{bilingualMode === 'en' ? 'EN' : 'VI'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3 Core Examples from Textbook (Page 88-89) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Example 1: Data Types */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">
                {isEn ? 'Example 1: Data Types' : 'Ví dụ 1: Nhận biết kiểu dữ liệu'}
              </h4>
              <p className="text-xs text-slate-500">int • float • str</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 text-xs font-mono space-y-2">
            <div>
              <span className="text-slate-500">&gt;&gt;&gt;</span> <span className="text-cyan-300">5</span>
              <div className="text-white font-bold">5 <span className="text-[10px] text-amber-400 font-sans font-normal">{isEn ? '(Integer int)' : '(Số nguyên int)'}</span></div>
            </div>
            <div>
              <span className="text-slate-500">&gt;&gt;&gt;</span> <span className="text-cyan-300">2.6</span>
              <div className="text-white font-bold">2.6 <span className="text-[10px] text-cyan-400 font-sans font-normal">{isEn ? '(Float float)' : '(Số thực float)'}</span></div>
            </div>
            <div>
              <span className="text-slate-500">&gt;&gt;&gt;</span> <span className="text-emerald-300">{isEn ? '"10th grade student"' : '"học sinh lớp 10"'}</span>
              <div className="text-white font-bold">{isEn ? "'10th grade student'" : "'học sinh lớp 10'"} <span className="text-[10px] text-emerald-400 font-sans font-normal">{isEn ? '(String str)' : '(Xâu kí tự str)'}</span></div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'Python automatically infers data types upon input. Character strings must be enclosed in double quotes "" or single quotes \'\'.'
              : 'Python tự động suy diễn kiểu dữ liệu ngay khi nhập. Xâu ký tự phải đặt trong cặp dấu nháy kép "" hoặc nháy đơn \'\'.'}
          </p>
        </div>

        {/* Example 2: Arithmetic Operators */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">
                {isEn ? 'Example 2: Arithmetic Operations' : 'Ví dụ 2: Phép toán số học'}
              </h4>
              <p className="text-xs text-slate-500">+ , - , * , /</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 text-xs font-mono space-y-2">
            <div>
              <span className="text-slate-500">&gt;&gt;&gt;</span> <span className="text-cyan-300">3 + 7</span>
              <div className="text-white font-bold">10 <span className="text-[10px] text-slate-400 font-sans font-normal">{isEn ? '(Addition)' : '(Phép cộng)'}</span></div>
            </div>
            <div>
              <span className="text-slate-500">&gt;&gt;&gt;</span> <span className="text-cyan-300">12*5</span>
              <div className="text-white font-bold">60 <span className="text-[10px] text-slate-400 font-sans font-normal">{isEn ? '(Multiplication using *)' : '(Phép nhân dấu *)'}</span></div>
            </div>
            <div>
              <span className="text-slate-500">&gt;&gt;&gt;</span> <span className="text-cyan-300">5/2</span>
              <div className="text-cyan-300 font-bold">2.5 <span className="text-[10px] text-cyan-400 font-sans font-normal">{isEn ? '(Division always yields float!)' : '(Phép chia luôn ra float!)'}</span></div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'Standard arithmetic operations include: addition (+), subtraction (-), multiplication (*), and division (/). Division (/) always returns a floating-point number.'
              : 'Các phép toán thông thường gồm: cộng (+), trừ (-), nhân (*) và chia (/). Phép chia / luôn trả về số thực.'}
          </p>
        </div>

        {/* Example 3: print() Function */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">
                {isEn ? 'Example 3: The print() Function' : 'Ví dụ 3: Cú pháp hàm print()'}
              </h4>
              <p className="text-xs text-slate-500">print(v1, v2, ..., vn)</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900 text-xs font-mono space-y-2">
            <div>
              <span className="text-slate-500">&gt;&gt;&gt;</span> <span className="text-purple-300">print</span>(12)
              <div className="text-white font-bold">12</div>
            </div>
            <div>
              <span className="text-slate-500">&gt;&gt;&gt;</span> <span className="text-purple-300">print</span>(10, 3.4 + 4.1, <span className="text-emerald-300">{isEn ? '"peace"' : '"hoà bình"'}</span>)
              <div className="text-white font-bold">10 7.5 {isEn ? 'peace' : 'hoà bình'}</div>
            </div>
            <div>
              <span className="text-slate-500">&gt;&gt;&gt;</span> <span className="text-purple-300">print</span>(<span className="text-emerald-300">"3 + 7 ="</span>, 3+7)
              <div className="text-white font-bold">3 + 7 = 10</div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'The print() statement outputs data to the screen. When printing multiple values, items are output on the same line, separated by spaces.'
              : 'Lệnh print() đưa dữ liệu ra màn hình. Nếu in nhiều giá trị, các dữ liệu được đưa ra trên cùng một dòng, phân tách bằng dấu cách.'}
          </p>
        </div>
      </div>

      {/* Interactive print() & Expression Lab */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Interactive print() Function Sandbox'
                  : 'Phòng thí nghiệm thực hành Hàm print() & Biểu thức'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Modify arguments v1, v2, v3 in real-time to observe automatic space separation and calculation'
                  : 'Chỉnh sửa các đối số v1, v2, v3 để quan sát cơ chế tự chèn dấu cách và tính toán biểu thức'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              {isEn ? 'Arguments passed to print(v1, v2, v3):' : 'Các đối số truyền vào print(v1, v2, v3):'}
            </span>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {isEn ? 'Argument 1 (v1):' : 'Đối số 1 (v1):'}
              </label>
              <input
                type="text"
                value={printArg1}
                onChange={(e) => {
                  setPrintArg1(e.target.value);
                  setHasCustomizedSandbox(true);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {isEn ? 'Argument 2 (v2):' : 'Đối số 2 (v2):'}
              </label>
              <input
                type="text"
                value={printArg2}
                onChange={(e) => {
                  setPrintArg2(e.target.value);
                  setHasCustomizedSandbox(true);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {isEn ? 'Argument 3 (v3):' : 'Đối số 3 (v3):'}
              </label>
              <input
                type="text"
                value={printArg3}
                onChange={(e) => {
                  setPrintArg3(e.target.value);
                  setHasCustomizedSandbox(true);
                }}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setPrintArg1(isEn ? '"Even sequence:"' : '"Dãy ba số chẵn:"');
                  setPrintArg2('2');
                  setPrintArg3('4, 6');
                  setHasCustomizedSandbox(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
              >
                {isEn ? 'Textbook sample: 2, 4, 6' : 'Mẫu SGK: 2, 4, 6'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPrintArg1('"3 + 7 ="');
                  setPrintArg2('3+7');
                  setPrintArg3('""');
                  setHasCustomizedSandbox(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
              >
                {isEn ? 'Textbook sample: 3 + 7 = 10' : 'Mẫu SGK: 3 + 7 = 10'}
              </button>
            </div>
          </div>

          {/* Real-time Code & Output Monitor */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-3">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>{isEn ? 'Executing Python statement:' : 'Câu lệnh Python thực thi:'}</span>
                <span className="text-emerald-400 text-[10px]">Syntax Highlighted</span>
              </div>
              <div className="text-cyan-300 text-sm">
                <span className="text-purple-400 font-bold">print</span>(
                <span className="text-emerald-300">{printArg1}</span>,{' '}
                <span className="text-amber-300">{printArg2}</span>
                {printArg3 && printArg3 !== '""' ? <>, <span className="text-emerald-300">{printArg3}</span></> : null}
                )
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2 text-[11px]">
                <span>{isEn ? 'Output on IDLE console:' : 'Kết quả hiển thị trên màn hình IDLE:'}</span>
                <span className="text-slate-500">Standard Output</span>
              </div>
              <div className="text-emerald-400 text-base font-bold py-1 whitespace-pre-wrap">
                {dynamicPrintOutput || (isEn ? '(No output data)' : '(Không có dữ liệu xuất ra)')}
              </div>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-900">
                {isEn
                  ? '💡 Textbook rule: Values are automatically separated by a single space.'
                  : '💡 Quy tắc SGK: Các giá trị được tự động ngăn cách bởi 1 dấu cách trống (space).'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official SGK Summary Box (Trang 89) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border-2 border-dashed border-amber-400/80 dark:border-amber-700/80 space-y-2 text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText
            vi="HỘP GHI NHỚ TRỌNG TÂM (SGK TRANG 89)"
            en="CORE SUMMARY BOX (TEXTBOOK PAGE 89)"
          />
        </div>
        <ul className="space-y-2 text-xs sm:text-sm leading-relaxed list-disc pl-5">
          <li>
            <BilingualText
              vi="Khi nhập giá trị số hoặc xâu kí tự từ dòng lệnh, Python tự nhận biết kiểu dữ liệu."
              en="When numeric or string values are input from the command line, Python automatically infers their data types."
            />
          </li>
          <li>
            <BilingualText
              vi="Python có thể thực hiện các phép toán thông thường với số, phân biệt số thực và số nguyên."
              en="Python can perform standard arithmetic operations with numbers, distinguishing between floats and integers."
            />
          </li>
          <li>
            <BilingualText
              vi="Lệnh print() có chức năng in dữ liệu ra màn hình, có thể in ra một hoặc nhiều giá trị đồng thời."
              en="The print() statement outputs data to the display, supporting printing one or multiple values simultaneously."
            />
          </li>
        </ul>
      </div>

      {/* Checkpoint Questions (SGK Trang 89) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Checkpoint 1 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <span>{isEn ? 'Question 1 (Page 89): Results & Data Types?' : 'Câu hỏi 1 (Trang 89): Kết quả & kiểu dữ liệu?'}</span>
            </h4>
            <button
              onClick={() => setShowQ1Answers(!showQ1Answers)}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {isEn ? (showQ1Answers ? 'Hide Answer' : 'Show Answer') : (showQ1Answers ? 'Ẩn đáp án' : 'Xem đáp án')}
            </button>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
              <span>&gt;&gt;&gt; 5/2</span>
              {showQ1Answers && <span className="text-emerald-600 dark:text-emerald-400 font-bold">2.5 (float)</span>}
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
              <span>&gt;&gt;&gt; 12 + 1.5</span>
              {showQ1Answers && <span className="text-emerald-600 dark:text-emerald-400 font-bold">13.5 (float)</span>}
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
              <span>&gt;&gt;&gt; {isEn ? '"You are a 10th grade student"' : '"Bạn là học sinh lớp 10"'}</span>
              {showQ1Answers && <span className="text-emerald-600 dark:text-emerald-400 font-bold">{isEn ? "'You are a 10th grade student' (str)" : "'Bạn là học sinh lớp 10' (str)"}</span>}
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
              <span>&gt;&gt;&gt; 10 + 7/2</span>
              {showQ1Answers && <span className="text-emerald-600 dark:text-emerald-400 font-bold">13.5 (float)</span>}
            </div>
          </div>
        </div>

        {/* Checkpoint 2 */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <span>{isEn ? 'Question 2 (Page 89): Printing Arithmetic Expressions' : 'Câu hỏi 2 (Trang 89): Lệnh in biểu thức tính toán'}</span>
            </h4>
            <button
              onClick={() => setShowQ2Answer(!showQ2Answer)}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              {isEn ? (showQ2Answer ? 'Hide Answer' : 'Show Answer') : (showQ2Answer ? 'Ẩn đáp án' : 'Xem đáp án')}
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900 text-xs font-mono text-cyan-300">
            &gt;&gt;&gt; print("13 + 10*3/2 - 3*2 = ", 13 + 10*3/2 - 3*2)
          </div>

          {showQ2Answer && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 space-y-1 animate-in fade-in">
              <span className="font-bold block text-sm font-mono">13 + 10*3/2 - 3*2 =  22.0</span>
              <p className="text-[11px] opacity-90">
                {isEn ? (
                  <><strong>Explanation:</strong> Operator precedence: 10*3/2 = 15.0; 3*2 = 6; 13 + 15.0 - 6 = 22.0 (float due to division /). There are 2 spaces before 22.0 due to the trailing space in the string and print() auto-separator.</>
                ) : (
                  <><strong>Giải thích:</strong> Phép toán ưu tiên: 10*3/2 = 15.0; 3*2 = 6; 13 + 15.0 - 6 = 22.0 (số thực do có phép chia /). Có 2 dấu cách trước số 22.0 do dấu cách cuối chuỗi và dấu cách phân tách tự động của print().</>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={16} />

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setCurrentPage(2)}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
        >
          {bilingualMode === 'en' ? '← Previous: Python Environment' : '← Quay lại: Môi trường Python'}
        </button>

        <button
          onClick={() => setCurrentPage(4)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          <span>{bilingualMode === 'en' ? 'Next: 4. Practical Lab (Bai1.py) →' : 'Tiếp theo: 4. Thực hành (Bai1.py) →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
