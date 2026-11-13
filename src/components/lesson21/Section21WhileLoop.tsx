import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import {
  Code,
  RotateCcw,
  Sparkles,
  BookOpen,
  Sliders,
  SkipForward,
  Zap,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';

export const Section21WhileLoop: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive CPU Trace Table state
  const [selectedTrace, setSelectedTrace] = useState<'hd1' | 'squares' | 'evens'>('hd1');
  const [traceStep, setTraceStep] = useState<number>(0);
  const [traceRows, setTraceRows] = useState<Array<{ step: number; k: number; cond: string; s: number }>>([]);
  const [isTraceFinished, setIsTraceFinished] = useState<boolean>(false);

  // Checkpoint 1 (Trước hay sau)
  const [cp1Answer, setCp1Answer] = useState<string | null>(null);

  // Checkpoint 2 (Tính tổng chẵn 2 + 4 + ... + 100)
  const [cp2CodeRun, setCp2CodeRun] = useState<boolean>(false);
  const [cp2SumResult, setCp2SumResult] = useState<number>(0);

  // Handle Trace Step
  const handleNextTrace = () => {
    if (isTraceFinished) return;

    if (selectedTrace === 'hd1') {
      // while k < 100: S = S + k; k = k + 7 (starts k = 1, S = 0)
      const currentK = traceRows.length === 0 ? 1 : traceRows[traceRows.length - 1].k + 7;
      const prevS = traceRows.length === 0 ? 0 : traceRows[traceRows.length - 1].s;

      if (currentK < 100) {
        const newS = prevS + currentK;
        setTraceRows([...traceRows, {
          step: traceStep + 1,
          k: currentK,
          cond: `${currentK} < 100 (True)`,
          s: newS
        }]);
        setTraceStep((prev) => prev + 1);
      } else {
        setIsTraceFinished(true);
      }
    } else if (selectedTrace === 'squares') {
      // while k*k < 100: S = S + k*k; k = k + 1 (starts k = 1)
      const currentK = traceRows.length === 0 ? 1 : traceRows[traceRows.length - 1].k + 1;
      const prevS = traceRows.length === 0 ? 0 : traceRows[traceRows.length - 1].s;

      if (currentK * currentK < 100) {
        const newS = prevS + currentK * currentK;
        setTraceRows([...traceRows, {
          step: traceStep + 1,
          k: currentK,
          cond: `${currentK * currentK} < 100 (True)`,
          s: newS
        }]);
        setTraceStep((prev) => prev + 1);
      } else {
        setIsTraceFinished(true);
      }
    } else if (selectedTrace === 'evens') {
      // while k <= 100: S = S + k; k = k + 2 (starts k = 2, S = 0)
      const currentK = traceRows.length === 0 ? 2 : traceRows[traceRows.length - 1].k + 2;
      const prevS = traceRows.length === 0 ? 0 : traceRows[traceRows.length - 1].s;

      if (currentK <= 20) { // Limit to 20 for preview table
        const newS = prevS + currentK;
        setTraceRows([...traceRows, {
          step: traceStep + 1,
          k: currentK,
          cond: `${currentK} <= 100 (True)`,
          s: newS
        }]);
        setTraceStep((prev) => prev + 1);
      } else {
        setIsTraceFinished(true);
      }
    }
  };

  const handleResetTrace = () => {
    setTraceStep(0);
    setTraceRows([]);
    setIsTraceFinished(false);
  };

  // Run Checkpoint 2 Code
  const handleRunCp2 = () => {
    let s = 0;
    let k = 2;
    while (k <= 100) {
      s += k;
      k += 2;
    }
    setCp2SumResult(s);
    setCp2CodeRun(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
              {isEn ? 'SECTION 1 • PAGES 108 – 109' : 'MỤC 1 • TRANG 108 – 109'}
            </span>
            <span className="text-xs text-slate-400">
              {isEn ? 'Syntax, Flowchart, Examples & Infinite Loop Traps' : 'Cú pháp, Sơ đồ khối, Ví dụ & Bẫy lặp vô hạn'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isEn ? '1. THE WHILE LOOP STATEMENT & OPERATIONAL MECHANICS' : '1. CÂU LỆNH LẶP WHILE VÀ CƠ CHẾ HOẠT ĐỘNG'}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(108);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>{isEn ? 'Compare Pages 108–109 Textbook' : 'Đối chiếu Trang 108 – 109 SGK'}</span>
        </button>
      </div>

      {/* Hoạt động 1 (Trang 108) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
              {isEn ? 'ACT 1' : 'HĐ 1'}
            </div>
            <h3 className="text-base font-bold text-white">
              {isEn ? 'Activity 1: Introducing the while Loop (Textbook Page 108)' : 'Hoạt động 1: Làm quen với lệnh lặp while (Trang 108)'}
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
            {isEn ? 'Result: S = 750' : 'Kết quả: S = 750'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 space-y-2">
            <div className="text-slate-500 text-[11px] font-sans font-bold">
              {isEn ? 'IDLE Interactive Shell >>>' : 'Chế độ gõ lệnh trực tiếp IDLE >>>'}
            </div>
            <div className="text-slate-300">
              <span className="text-indigo-400">&gt;&gt;&gt; </span>S = 0{'\n'}
              <span className="text-indigo-400">&gt;&gt;&gt; </span>k = 1{'\n'}
              <span className="text-indigo-400">&gt;&gt;&gt; </span><span className="text-amber-400">while</span> <span className="text-emerald-400">k &lt; 100</span>:  <span className="text-slate-500">{isEn ? '# Loop continuation condition' : '# Điều kiện lặp'}</span>{'\n'}
              {'        '}S = S + k{'\n'}
              {'        '}k = k + 7  <span className="text-slate-500">{isEn ? '# Increment k by 7 each step' : '# Tăng k thêm 7 sau mỗi vòng lặp'}</span>{'\n'}
              <span className="text-indigo-400">&gt;&gt;&gt; </span><span className="text-emerald-400">print</span>(S){'\n'}
              <span className="text-amber-400 font-bold text-sm">750</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>{isEn ? 'Execution Trace Analysis:' : 'Phân tích quá trình thực thi:'}</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-400">
              <li>
                {isEn ? (
                  <>Variable <code className="text-amber-300 font-mono">k</code> starts at 1, incremented by 7 each step: <code className="text-sky-300 font-mono">1, 8, 15, 22, ..., 99</code>.</>
                ) : (
                  <>Biến <code className="text-amber-300 font-mono">k</code> khởi đầu bằng 1, sau mỗi vòng lặp được tăng thêm 7: <code className="text-sky-300 font-mono">1, 8, 15, 22, ..., 99</code>.</>
                )}
              </li>
              <li>
                {isEn ? (
                  <>There are exactly <strong>15 arithmetic progression terms</strong>.</>
                ) : (
                  <>Tổng cộng có <strong>15 số hạng</strong> thuộc cấp số cộng này.</>
                )}
              </li>
              <li>
                {isEn ? (
                  <>Accumulated sum: <span className="font-mono text-emerald-400 font-bold">S = 1 + 8 + 15 + ... + 99 = 750</span>.</>
                ) : (
                  <>Tổng cộng dồn: <span className="font-mono text-emerald-400 font-bold">S = 1 + 8 + 15 + ... + 99 = 750</span>.</>
                )}
              </li>
              <li>
                {isEn ? (
                  <>When <code className="text-amber-300 font-mono">k = 99 + 7 = 106</code>, condition <code className="text-rose-400 font-mono">106 &lt; 100</code> evaluates to <strong>False</strong>, terminating the loop immediately!</>
                ) : (
                  <>Khi <code className="text-amber-300 font-mono">k = 99 + 7 = 106</code>, điều kiện <code className="text-rose-400 font-mono">106 &lt; 100</code> nhận giá trị <strong>False</strong>, vòng lặp dừng ngay lập tức!</>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Syntax Box & Flowchart Hình 21.1 */}
      <div className="p-6 rounded-2xl bg-linear-to-br from-slate-900 to-indigo-950/20 border border-indigo-800/40 shadow-xl space-y-5">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">
            {isEn
              ? 'while Loop Syntax & Flowchart Mechanics (Textbook Figure 21.1)'
              : 'Cú Pháp Lệnh while & Sơ Đồ Khối Hoạt Động (Hình 21.1 SGK)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Syntax Card */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950 border-2 border-indigo-500/40 shadow-inner font-mono text-sm">
              <div className="text-amber-400 font-bold mb-1">
                while <span className="text-emerald-400">{isEn ? '<condition>' : '<điều kiện>'}</span>:
              </div>
              <div className="pl-6 text-slate-300 border-l-2 border-slate-700 ml-2">
                {isEn ? '<statement_block>' : '<khối lệnh>'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="font-bold text-slate-100">
                {isEn ? 'Core Rules in Python:' : 'Đặc điểm cơ bản:'}
              </div>
              <p>• <code className="text-emerald-300">{isEn ? '<condition>' : '<điều kiện>'}</code> {isEn ? 'is a boolean expression returning True or False.' : 'là biểu thức lôgic nhận giá trị True hoặc False.'}</p>
              <p>• {isEn ? 'Colon ":" is mandatory at the end of the while line.' : 'Dấu hai chấm : bắt buộc ở cuối dòng chứa lệnh while.'}</p>
              <p>• <code className="text-indigo-300">{isEn ? '<statement_block>' : '<khối lệnh>'}</code> {isEn ? 'must be consistently indented (4 spaces or 1 tab).' : 'phải viết lùi vào và thẳng hàng (mặc định 1 tab hoặc 4 dấu cách).'}</p>
              <p>• <strong>{isEn ? 'Execution principle:' : 'Nguyên lý:'}</strong> {isEn ? 'Python tests condition first; if True it runs body; if False it exits while.' : 'Python kiểm tra điều kiện trước. Nếu Đúng thì thực hiện khối lệnh; nếu Sai thì kết thúc lệnh while.'}</p>
            </div>
          </div>

          {/* SVG Flowchart matching Hinh 21.1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
            <div className="text-[11px] font-mono font-bold text-slate-400 mb-2">
              {isEn ? 'WHILE LOOP FLOWCHART (TEXTBOOK FIGURE 21.1)' : 'SƠ ĐỒ KHỐI VÒNG LẶP WHILE (HÌNH 21.1 SGK)'}
            </div>
            <svg viewBox="0 0 320 240" className="w-full max-w-[280px] h-auto">
              {/* Entry arrow */}
              <circle cx="160" cy="20" r="10" fill="#38bdf8" />
              <line x1="160" y1="30" x2="160" y2="55" stroke="#94a3b8" strokeWidth="2" />

              {/* Diamond Decision: <Condition> */}
              <polygon points="160,55 240,85 160,115 80,85" fill="#047857" stroke="#10b981" strokeWidth="1.5" />
              <text x="160" y="89" fill="#ecfdf5" fontSize="12" textAnchor="middle" fontWeight="bold">
                {isEn ? '<Condition>' : '<Điều kiện>'}
              </text>

              {/* True Branch (Right) -> Statement block */}
              <line x1="240" y1="85" x2="270" y2="85" stroke="#10b981" strokeWidth="2" />
              <text x="252" y="78" fill="#34d399" fontSize="10" fontWeight="bold">
                {isEn ? 'True' : 'Đúng'}
              </text>
              <rect x="235" y="140" width="75" height="34" rx="4" fill="#854d0e" stroke="#eab308" strokeWidth="1.5" />
              <text x="272" y="161" fill="#fef08a" fontSize="11" textAnchor="middle" fontWeight="bold">
                {isEn ? 'Loop body' : 'Khối lệnh'}
              </text>
              <line x1="270" y1="85" x2="270" y2="140" stroke="#10b981" strokeWidth="2" />

              {/* Feedback Loop back to top */}
              <line x1="235" y1="157" x2="160" y2="157" stroke="#eab308" strokeWidth="2" />
              <line x1="160" y1="157" x2="160" y2="125" stroke="#eab308" strokeWidth="2" />
              <polygon points="160,120 156,128 164,128" fill="#eab308" />

              {/* False Branch (Down) -> False -> End */}
              <line x1="160" y1="115" x2="160" y2="190" stroke="#ef4444" strokeWidth="2" />
              <text x="175" y="135" fill="#f87171" fontSize="10" fontWeight="bold">
                {isEn ? 'False' : 'Sai'}
              </text>
              <circle cx="160" cy="205" r="10" fill="#ef4444" />
              <text x="160" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                {isEn ? 'End' : 'Kết thúc'}
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Textbook Examples: Ví dụ 1 & Ví dụ 2 (Trang 109) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ví dụ 1 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              {isEn ? 'Example 1 (Page 109)' : 'Ví dụ 1 (Trang 109)'}
            </span>
            <span className="text-xs text-slate-400">
              {isEn ? 'Sum of squares' : 'Tổng bình phương'}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-100">
            {isEn ? 'Sum of squares with stopping condition k² < 100' : 'Tính tổng các bình phương với điều kiện k² < 100'}
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300">
            S = 0{'\n'}
            k = 1{'\n'}
            <span className="text-amber-400">while</span> <span className="text-emerald-400">k*k &lt; 100</span>:{'\n'}
            {'    '}S = S + k*k{'\n'}
            {'    '}k = k + 1
          </div>

          <div className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
            👉 <strong>{isEn ? 'Explanation:' : 'Giải thích:'}</strong>{' '}
            {isEn
              ? 'Because k² < 100, k ranges from 1 to 9. S stores 1² + 2² + ... + 9² = 285.'
              : 'Vì k² < 100 nên k nhận các giá trị từ 1 đến 9. Biến S lưu tổng 1² + 2² + ... + 9² = 285.'}
          </div>
        </div>

        {/* Ví dụ 2 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
              {isEn ? 'Example 2 (Page 109)' : 'Ví dụ 2 (Trang 109)'}
            </span>
            <span className="text-xs text-slate-400">
              {isEn ? 'Step 3 arithmetic sequence' : 'Dãy tăng bước 3'}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-100">
            {isEn ? 'Print sequence starting from k = 2 up to below 50' : 'Thực hiện lệnh in dãy số bắt đầu từ k = 2 đến dưới 50'}
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300">
            k = 2{'\n'}
            <span className="text-amber-400">while</span> <span className="text-emerald-400">k &lt; 50</span>:{'\n'}
            {'    '}<span className="text-emerald-400">print</span>(k, end = <span className="text-amber-300">" "</span>){'\n'}
            {'    '}k = k + 3
          </div>

          <div className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 font-mono">
            👉 <strong>{isEn ? 'Printed Output:' : 'Kết quả in ra:'}</strong><br />
            <span className="text-sky-300 font-bold">2 5 8 11 14 17 20 23 26 29 32 35 38 41 44 47</span>
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ 1 (Trang 109) - High Contrast WCAG compliant */}
      <div className="p-5 rounded-2xl bg-indigo-950/60 dark:bg-indigo-950/80 border-2 border-indigo-400 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-indigo-300" />
          <span>{isEn ? 'Key Takeaway 1 (Textbook Page 109)' : 'Ghi Nhớ 1 (Trang 109 SGK)'}</span>
        </div>
        <div className="text-sm text-indigo-100 leading-relaxed font-semibold">
          {isEn
            ? "'while' is an indefinite loop statement. The number of iterations of the while statement depends dynamically on its condition."
            : 'while là lệnh lặp với số lần không biết trước. Số lần lặp của lệnh while phụ thuộc vào điều kiện của lệnh.'}
        </div>
      </div>

      {/* 2 Hộp Lưu Ý Quan Trọng: Lặp vô hạn & Lệnh break (Trang 109) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lưu ý 1: Lặp vô hạn */}
        <div className="p-5 rounded-2xl bg-rose-950/50 border-2 border-rose-500/70 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>{isEn ? 'Note 1: Avoid Infinite Loops' : 'Lưu Ý 1: Tránh Lặp Vô Hạn (Infinite Loop)'}</span>
          </div>
          <p className="text-xs text-rose-100 leading-relaxed">
            {isEn
              ? 'Because while loops depend on conditional expressions, always inspect the condition to prevent infinite loops. The loop body must include statements that update control variables toward making the condition False.'
              : 'Vì lệnh while phụ thuộc vào điều kiện, cần chú ý điều kiện của lệnh while để tránh bị lặp vô hạn. Trong khối lệnh lặp bắt buộc phải có câu lệnh làm thay đổi giá trị biến điều khiển về phía làm sai điều kiện.'}
          </p>
          <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-800">
            ⚠️ k = 1; while k &gt; 0: print(k)  <span className="text-slate-400">{isEn ? '# Forgot k update! System hangs!' : '# Quên lệnh thay đổi k! Treo máy!'}</span>
          </div>
        </div>

        {/* Lưu ý 2: Lệnh break */}
        <div className="p-5 rounded-2xl bg-amber-950/50 border-2 border-amber-500/70 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>{isEn ? 'Note 2: break Statement for Immediate Exit' : 'Lưu Ý 2: Lệnh break Thoát Vòng Lặp Ngay Lập Tức'}</span>
          </div>
          <p className="text-xs text-amber-100 leading-relaxed">
            {isEn
              ? 'To stop and immediately exit from a while or for loop, use the break keyword.'
              : 'Trong trường hợp nếu muốn dừng và thoát ngay khỏi vòng lặp while hoặc for, có thể dùng lệnh break.'}
          </p>
          <div className="p-2.5 rounded-lg bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800">
            for k in range(10):{'\n'}
            {'    '}print(k, end = " "){'\n'}
            {'    '}if k == 5: <span className="text-amber-400 font-bold">break</span>{'\n'}
            <span className="text-emerald-400">{isEn ? '# Prints 0 1 2 3 4 5 and halts' : '# In: 0 1 2 3 4 5 rồi dừng ngay'}</span>
          </div>
        </div>
      </div>

      {/* CÂU HỎI CỦNG CỐ MỤC 1 (Trang 109 SGK) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">
            {isEn ? 'Section 1 Checkpoint Exercises (Textbook Page 109)' : 'Câu Hỏi Củng Cố Mục 1 (Trang 109 SGK)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Câu 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-slate-200">
              {isEn
                ? '1. Does the while statement test its condition BEFORE or AFTER executing the loop body?'
                : '1. Lệnh while kiểm tra điều kiện trước hay sau khi thực hiện khối lệnh lặp?'}
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setCp1Answer('truoc')}
                className={`px-3 py-2 rounded-lg font-bold border cursor-pointer transition-all ${
                  cp1Answer === 'truoc'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {isEn ? 'Check BEFORE (Pre-test)' : 'Kiểm tra TRƯỚC'}
              </button>
              <button
                type="button"
                onClick={() => setCp1Answer('sau')}
                className={`px-3 py-2 rounded-lg font-bold border cursor-pointer transition-all ${
                  cp1Answer === 'sau'
                    ? 'bg-rose-950 text-rose-300 border-rose-500'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {isEn ? 'Check AFTER (Post-test)' : 'Kiểm tra SAU'}
              </button>
            </div>
            {cp1Answer === 'truoc' && (
              <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-300">
                <strong>{isEn ? 'Standard Explanation:' : 'Giải thích chuẩn SGK:'}</strong>{' '}
                {isEn
                  ? 'According to Figure 21.1, Python evaluates the condition before entering the loop body. If False initially, the body executes zero times.'
                  : 'Theo Hình 21.1, Python kiểm tra điều kiện trước, nếu Đúng mới thực hiện khối lệnh. Nếu Sai ngay từ đầu, thân lệnh không chạy lần nào.'}
              </div>
            )}
          </div>

          {/* Câu 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-slate-200">
              {isEn
                ? '2. Write a program to calculate sum 2 + 4 + ... + 100 using a while loop.'
                : '2. Viết đoạn chương trình tính tổng 2 + 4 + ... + 100 sử dụng lệnh while.'}
            </div>
            <pre className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-slate-300">
              S = 0; k = 2{'\n'}
              while k &lt;= 100:{'\n'}
              {'    '}S = S + k{'\n'}
              {'    '}k = k + 2{'\n'}
              print("{isEn ? 'Total sum is:' : 'Tổng là:'}", S)
            </pre>
            <button
              type="button"
              onClick={handleRunCp2}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer transition-all"
            >
              {isEn ? 'Run Test Program' : 'Chạy Thử Nghiệm'}
            </button>
            {cp2CodeRun && (
              <div className="p-2 rounded bg-emerald-950 text-emerald-300 font-mono font-bold">
                👉 {isEn ? `Sum result: S = ${cp2SumResult} (50 even numbers, (2+100)*50/2 = 2550).` : `Kết quả tổng: S = ${cp2SumResult} (gồm 50 số chẵn, (2+100)*50/2 = 2550).`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BÀI TẬP TƯƠNG TÁC TẠI CHỖ: CPU Step Trace Table */}
      <div className="p-6 rounded-2xl bg-linear-to-br from-slate-900 to-indigo-950/30 border border-indigo-800/40 shadow-2xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-300 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isEn ? 'Interactive CPU Trace Table (Variable Tracking)' : 'Thực Hành Tương Tác: Bảng Theo Dõi Vòng Lặp While (Trace Table)'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Observe variable k changes, condition verification, and accumulated sum S after each iteration'
                  : 'Quan sát sự thay đổi của biến k, kiểm tra điều kiện và giá trị tổng S sau mỗi chu kỳ'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNextTrace}
              disabled={isTraceFinished}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
            >
              <SkipForward className="w-4 h-4" />
              <span>{isEn ? `Next Step (${traceStep})` : `Bước tiếp (${traceStep})`}</span>
            </button>
            <button
              type="button"
              onClick={handleResetTrace}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title={isEn ? 'Reset Table' : 'Đặt lại bảng'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Algorithm buttons */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold">{isEn ? 'Select algorithm:' : 'Chọn thuật toán:'}</span>
          <button
            type="button"
            onClick={() => { setSelectedTrace('hd1'); handleResetTrace(); }}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
              selectedTrace === 'hd1' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isEn ? 'Act 1: k < 100, k = k + 7 (S = 750)' : 'HĐ 1: k < 100, k = k + 7 (S = 750)'}
          </button>
          <button
            type="button"
            onClick={() => { setSelectedTrace('squares'); handleResetTrace(); }}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
              selectedTrace === 'squares' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isEn ? 'Example 1: k² < 100 (S = 285)' : 'Ví dụ 1: k² < 100 (S = 285)'}
          </button>
          <button
            type="button"
            onClick={() => { setSelectedTrace('evens'); handleResetTrace(); }}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
              selectedTrace === 'evens' ? 'bg-indigo-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isEn ? 'Checkpoint 2: Even sum 2..100' : 'Củng cố 2: Tổng chẵn 2..100'}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">{isEn ? 'Iteration' : 'Lần lặp'}</th>
                <th className="py-2.5 px-3">{isEn ? 'Variable k' : 'Biến k'}</th>
                <th className="py-2.5 px-3">{isEn ? 'Condition Test' : 'Kiểm tra điều kiện'}</th>
                <th className="py-2.5 px-3">{isEn ? 'Sum S After Body' : 'Tổng S sau vòng lặp'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="bg-slate-900/30 text-slate-400">
                <td className="py-2 px-3">{isEn ? 'Initialization' : 'Khởi tạo'}</td>
                <td className="py-2 px-3">{selectedTrace === 'evens' ? '2' : '1'}</td>
                <td className="py-2 px-3">-</td>
                <td className="py-2 px-3 text-amber-400 font-bold">0</td>
              </tr>
              {traceRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors animate-in fade-in duration-200">
                  <td className="py-2 px-3 text-slate-300">{isEn ? `Cycle ${row.step}` : `Chu kỳ ${row.step}`}</td>
                  <td className="py-2 px-3 text-sky-400 font-bold">{row.k}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {row.cond}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-emerald-400 font-black text-sm">{row.s}</td>
                </tr>
              ))}
              {traceRows.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-slate-400 text-xs font-sans">
                    {isEn ? 'Click "Next Step" to trace CPU condition test and accumulation...' : 'Nhấn "Bước tiếp" để xem CPU kiểm tra điều kiện và cộng dồn...'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
