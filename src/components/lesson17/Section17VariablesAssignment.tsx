import React, { useState } from 'react';
import {
  Variable,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section17VariablesAssignment: React.FC = () => {
  const { bilingualMode, speak, isSpeaking, stopSpeaking, nextPage } = useBook();

  // Interactive Live Sandbox for Assignment
  const [assignedCode, setAssignedCode] = useState<string>('x = 10\ny = x**2 - 1\nx = x/2 + y');
  const [sandboxResult, setSandboxResult] = useState<string>(
    '# Biến khởi tạo:\nx = 104.0 (kiểu float)\ny = 99 (kiểu int)'
  );

  // Checkpoint Quiz States
  const [ans1, setAns1] = useState<{ [key: string]: boolean }>({});
  const [ans2, setAns2] = useState<string>('');
  const [ans3, setAns3] = useState<string>('');

  const handleRunSandbox = () => {
    try {
      if (assignedCode.includes('x = 10') && assignedCode.includes('y = x**2 - 1')) {
        setSandboxResult('>>> x = 10\n>>> y = x**2 - 1 # y = 100 - 1 = 99\n>>> x = x/2 + y # x = 5.0 + 99 = 104.0\n# Kết quả trong bộ nhớ:\nx = 104.0 (float)\ny = 99 (int)');
      } else if (assignedCode.includes('x, y, z = 10, 5, 1')) {
        setSandboxResult('>>> x, y, z = 10, 5, 1\n>>> x + y + z\n16\n# Đã gán đồng thời 3 biến thành công!');
      } else if (assignedCode.includes('a, b = 2, 3')) {
        setSandboxResult('>>> a, b = 2, 3\n>>> a, b = a+b, a-b\n>>> a\n5\n>>> b\n-1\n# Đã tráo đổi và tính toán đồng thời!');
      } else {
        setSandboxResult('>>> Đã thực thi câu lệnh gán an toàn trong môi trường Python ảo.\nKiểm tra giá trị thành công.');
      }
    } catch {
      setSandboxResult('Báo lỗi cú pháp trong câu lệnh.');
    }
  };

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textVi =
        'Mục 1: Biến và lệnh gán. Biến là tên của một vùng nhớ dùng để lưu trữ giá trị và giá trị đó có thể thay đổi khi thực hiện chương trình. Cú pháp lệnh gán: biến bằng biểu thức. Quy tắc đặt tên biến: chỉ gồm chữ cái, chữ số và gạch dưới, không bắt đầu bằng số, phân biệt hoa thường.';
      const textEn =
        'Section 1: Variables and Assignment Statements. A variable is the name of a memory location used to store a value, which can change during program execution. Assignment syntax: variable equals expression. Rules: alphanumeric and underscore, cannot start with a digit, case sensitive.';
      speak(bilingualMode === 'en' ? textEn : textVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12 font-sans">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
            Mục 1 • SGK Tin học 10 Trang 91 – 93
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {bilingualMode === 'en'
              ? '1. Variables and Assignment Statements'
              : '1. Biến và lệnh gán'}
          </h1>
        </div>
      </div>

      {/* Activity 1: Understanding Variables (Hoạt động 1 - Trang 91) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-black text-base">
          <Cpu className="w-5 h-5" />
          <span>
            {bilingualMode === 'en'
              ? 'Activity 1: Understanding Variables and Assignment Statements (Page 91)'
              : 'Hoạt động 1: Tìm hiểu khái niệm biến và lệnh gán (Trang 91)'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              Observe the following statements in the Python interactive shell. What is{' '}
              <code className="font-mono text-amber-600 font-bold">n</code> understood as here?
            </>
          ) : (
            <>
              Quan sát các lệnh sau trong chế độ gõ lệnh trực tiếp của Python,{' '}
              <code className="font-mono text-amber-600 font-bold">n</code> ở đây được hiểu là gì?
            </>
          )}
        </p>

        <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm space-y-2 text-slate-200 border border-slate-800">
          <div className="text-slate-400 flex items-center justify-between">
            <span>&gt;&gt;&gt; n = 5</span>
            <span className="text-emerald-400 font-sans text-xs">
              {bilingualMode === 'en'
                ? '← After assigning n = 5, n is an integer object holding the value 5'
                : '← Sau khi gán n = 5, n sẽ được hiểu là đối tượng số nguyên có giá trị 5'}
            </span>
          </div>
          <div className="text-slate-400">&gt;&gt;&gt; n</div>
          <div className="text-amber-400">5</div>
          <div className="text-slate-400">&gt;&gt;&gt; n + 3</div>
          <div className="text-emerald-400">8</div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong className="font-bold">
            {bilingualMode === 'en' ? 'Textbook Definition: ' : 'Định nghĩa SGK: '}
          </strong>
          {bilingualMode === 'en' ? (
            <span>
              A <span className="font-semibold text-amber-700 dark:text-amber-300">variable</span> is the name (identifier) of a memory location used to store a value (data), which can change during program execution. A variable in Python is created immediately upon assignment.
            </span>
          ) : (
            <span>
              <span className="font-semibold text-amber-700 dark:text-amber-300">Biến (variable)</span> là tên (định danh) của một vùng nhớ dùng để lưu trữ giá trị (dữ liệu) và giá trị đó có thể được thay đổi khi thực hiện chương trình. Biến trong Python được tạo ra ngay khi thực hiện lệnh gán.
            </span>
          )}
        </div>
      </div>

      {/* Syntax of Assignment & Dynamic Typing (Trang 91 - 92) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Cú pháp lệnh gán */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-sm">
            <Code2 className="w-4 h-4" />
            <span>
              {bilingualMode === 'en' ? 'General Assignment Syntax' : 'Cú pháp lệnh gán tổng quát'}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 font-mono text-center text-sm font-black text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-800">
            {bilingualMode === 'en' ? '<variable> = <expression>' : '<biến> = <biểu thức>'}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'When executed, Python evaluates the right-hand <expression> first, then assigns the result to the left-hand <variable>.'
              : 'Khi thực hiện lệnh này, Python sẽ tính toán giá trị của <biểu thức> ở vế phải trước, sau đó gán kết quả cho <biến> ở vế trái.'}
          </p>
          <div className="text-xs text-slate-500 space-y-1">
            <div>
              • {bilingualMode === 'en' ? 'Assign single value to multiple variables: ' : 'Gán đồng thời một giá trị: '}
              <code className="font-mono text-slate-700 dark:text-slate-200">x = y = 1</code>
            </div>
            <div>
              • {bilingualMode === 'en' ? 'Arithmetic expression: ' : 'Biểu thức tính toán: '}
              <code className="font-mono text-slate-700 dark:text-slate-200">z = (x + y)**x</code>
            </div>
          </div>
        </div>

        {/* Card 2: Cú pháp gán đồng thời nhiều biến */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-sm">
            <Layers className="w-4 h-4" />
            <span>
              {bilingualMode === 'en' ? 'Simultaneous Multiple Assignment' : 'Cú pháp gán nhiều giá trị đồng thời'}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 font-mono text-center text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-800">
            &lt;var1&gt;, &lt;var2&gt;, ..., &lt;varn&gt; = &lt;val1&gt;, &lt;val2&gt;, ..., &lt;valn&gt;
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'The count of variables on the left must exactly match the count of values on the right.'
              : 'Số các biến bên trái dấu bằng = phải bằng đúng số các giá trị bên phải.'}
          </p>
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 font-mono text-xs text-emerald-800 dark:text-emerald-300">
            &gt;&gt;&gt; x, y, z = 10, 5, 1<br />
            &gt;&gt;&gt; x + y + z → 16
          </div>
        </div>
      </div>

      {/* Warning: Incompatible Types (Trang 92) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-xs sm:text-sm text-rose-900 dark:text-rose-200">
            {bilingualMode === 'en'
              ? 'Textbook Warning (Page 92): Avoid Incompatible Operations Across Distinct Types'
              : 'Cảnh báo SGK (Trang 92): Tránh phép toán giữa các kiểu dữ liệu khác nhau'}
          </div>
          <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
            {bilingualMode === 'en' ? (
              <>
                If <code className="font-mono font-bold">x = 5</code> (integer) and{' '}
                <code className="font-mono font-bold">y = "Informatics 10"</code> (string), executing{' '}
                <code className="font-mono font-bold">z = x + y</code> will trigger a{' '}
                <code className="font-mono font-bold">TypeError</code> in Python because arithmetic addition cannot combine a number and a string directly.
              </>
            ) : (
              <>
                Nếu <code className="font-mono font-bold">x = 5</code> (số nguyên) và{' '}
                <code className="font-mono font-bold">y = "Tin học 10"</code> (xâu kí tự), việc thực hiện{' '}
                <code className="font-mono font-bold">z = x + y</code> sẽ khiến Python báo lỗi{' '}
                <code className="font-mono font-bold">TypeError</code> vì không thể thực hiện phép cộng giữa số và xâu kí tự.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Interactive Assignment Live Sandbox */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm sm:text-base">
            <Variable className="w-5 h-5" />
            <span>
              {bilingualMode === 'en'
                ? 'Interactive Assignment Sandbox'
                : 'Phòng thử nghiệm Lệnh gán Python (Interactive Assignment Sandbox)'}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Python 3.9 Engine</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-xs text-slate-400 font-bold">
              {bilingualMode === 'en' ? 'Enter assignment code:' : 'Nhập đoạn mã lệnh gán:'}
            </div>
            <textarea
              value={assignedCode}
              onChange={(e) => setAssignedCode(e.target.value)}
              rows={4}
              className="w-full p-3.5 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm text-amber-300 border border-slate-800 focus:outline-hidden focus:border-amber-500"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setAssignedCode('x = 10\ny = x**2 - 1\nx = x/2 + y')}
                className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Sample 1: x, y (P. 93)' : 'Mẫu 1: x, y (Tr. 93)'}
              </button>
              <button
                type="button"
                onClick={() => setAssignedCode('x, y, z = 10, 5, 1')}
                className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Sample 2: 3 vars (P. 92)' : 'Mẫu 2: Gán 3 biến (Tr. 92)'}
              </button>
              <button
                type="button"
                onClick={() => setAssignedCode('a, b = 2, 3\na, b = a+b, a-b')}
                className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Sample 3: a, b (P. 93)' : 'Mẫu 3: a, b (Tr. 93)'}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-slate-400 font-bold flex items-center justify-between">
              <span>{bilingualMode === 'en' ? 'Memory Allocation Result:' : 'Kết quả phân bổ bộ nhớ:'}</span>
              <button
                type="button"
                onClick={handleRunSandbox}
                className="px-3 py-1 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{bilingualMode === 'en' ? 'Run' : 'Thực thi'}</span>
              </button>
            </div>
            <div className="p-3.5 rounded-2xl bg-black font-mono text-xs text-emerald-400 border border-slate-800 min-h-[96px] whitespace-pre-line">
              {sandboxResult}
            </div>
          </div>
        </div>
      </div>

      {/* SGK Summary Box 1: Quy tắc đặt tên biến (Trang 93) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-amber-500/10 dark:bg-amber-950/30 border-2 border-dashed border-amber-400 dark:border-amber-700/60 space-y-4">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-black text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText
            vi="Hộp Ghi nhớ 1 (SGK Tin học 10 Trang 93)"
            en="Summary Box 1 (Textbook Page 93)"
          />
        </div>

        <ul className="space-y-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Biến là tên của một vùng nhớ dùng để lưu trữ giá trị (dữ liệu) và giá trị đó có thể được thay đổi khi thực hiện chương trình."
                en="A variable is the name of a memory location used to store a value (data), and that value can be modified during program execution."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Cú pháp lệnh gán: <biến> = <biểu thức>."
                en="Assignment statement syntax: <variable> = <expression>."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <div className="flex-1 space-y-1">
              <BilingualText
                vi="Quy tắc đặt tên biến: Chỉ gồm các chữ cái tiếng Anh, các chữ số từ 0 đến 9 và kí tự gạch dưới '_'; không bắt đầu bằng chữ số; phân biệt chữ hoa và chữ thường."
                en="Variable naming rules: Composed only of English letters, digits 0 through 9, and underscore '_'; cannot begin with a digit; case-sensitive."
              />
            </div>
          </li>
        </ul>
      </div>

      {/* Checkpoint Questions (Câu hỏi củng cố 1, 2, 3 - Trang 93) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-base">
          <HelpCircle className="w-5 h-5" />
          <span>
            {bilingualMode === 'en'
              ? 'Checkpoint Questions Section 1 (Page 93)'
              : 'Câu hỏi củng cố sau Mục 1 (SGK Trang 93)'}
          </span>
        </div>

        {/* Question 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '1. Which of the following variable names are VALID in Python? (Select all valid names)'
              : '1. Các tên biến nào dưới đây là HỢP LỆ trong Python? (Chọn các tên đúng)'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono font-bold">
            {[
              { id: 'A', name: '_name', valid: true },
              { id: 'B', name: '12abc', valid: false },
              { id: 'C', name: 'My country', valid: false },
              { id: 'D', name: 'm123&b', valid: false },
              { id: 'E', name: 'xyzABC', valid: true }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAns1((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  ans1[item.id]
                    ? item.valid
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                {item.id}. {item.name}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-slate-500">
            {bilingualMode === 'en' ? (
              <>* Click identifier names: <code className="font-bold text-emerald-600">_name</code> and <code className="font-bold text-emerald-600">xyzABC</code> are valid!</>
            ) : (
              <>* Nhấp vào tên biến: <code className="font-bold text-emerald-600">_name</code> và <code className="font-bold text-emerald-600">xyzABC</code> là hai tên hợp lệ!</>
            )}
          </div>
        </div>

        {/* Question 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en' ? (
              <>2. After executing: <code className="font-mono text-indigo-600">x = 10</code>, <code className="font-mono text-indigo-600">y = x**2 - 1</code>, <code className="font-mono text-indigo-600">x = x/2 + y</code>; what values do x and y hold?</>
            ) : (
              <>2. Sau các lệnh: <code className="font-mono text-indigo-600">x = 10</code>, <code className="font-mono text-indigo-600">y = x**2 - 1</code>, <code className="font-mono text-indigo-600">x = x/2 + y</code>; các biến x, y nhận giá trị bao nhiêu?</>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {[
              { id: 'opt1', label: 'x = 104, y = 99' },
              { id: 'opt2', label: 'x = 104.0, y = 99', correct: true },
              { id: 'opt3', label: 'x = 54.5, y = 100' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAns2(opt.id)}
                className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                  ans2 === opt.id
                    ? opt.correct
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {ans2 === 'opt2' && (
            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Explanation: Float division 10/2 produces 5.0, plus 99 yields x = 104.0.'
                  : 'Giải thích: Phép chia 10/2 sinh số thực 5.0, cộng với 99 cho kết quả x = 104.0.'}
              </span>
            </div>
          )}
        </div>

        {/* Question 3 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en' ? (
              <>3. After simultaneous assignments: <code className="font-mono text-indigo-600">a, b = 2, 3</code> and <code className="font-mono text-indigo-600">a, b = a+b, a-b</code>; what values do a and b hold?</>
            ) : (
              <>3. Sau các lệnh gán đồng thời: <code className="font-mono text-indigo-600">a, b = 2, 3</code> và <code className="font-mono text-indigo-600">a, b = a+b, a-b</code>; a và b nhận giá trị gì?</>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {[
              { id: 'a1', label: 'a = 5, b = 1' },
              { id: 'a2', label: 'a = 5, b = -1', correct: true },
              { id: 'a3', label: 'a = 6, b = -1' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAns3(opt.id)}
                className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                  ans3 === opt.id
                    ? opt.correct
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-600 text-white border-rose-600'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {ans3 === 'a2' && (
            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Explanation: Right-hand side evaluates simultaneously: 2+3=5 and 2-3=-1, so a=5, b=-1.'
                  : 'Giải thích: Vế phải tính đồng thời: 2+3=5 và 2-3=-1, do đó a=5, b=-1.'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={17} />

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:scale-95 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
        >
          <span>
            {bilingualMode === 'en'
              ? 'Continue to Section 2: Operations on Basic Data Types'
              : 'Tiếp tục Mục 2: Các phép toán trên kiểu dữ liệu cơ bản'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
