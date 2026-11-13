import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  Code,
  RotateCcw,
  Sparkles,
  HelpCircle,
  SkipForward,
  BookOpen,
  Sliders
} from 'lucide-react';

export const Section20ForLoop: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive Trace Table State
  const [selectedAlgo, setSelectedAlgo] = useState<'sum' | 'even' | 'mult3'>('sum');
  const [testN] = useState<number>(6);
  const [traceStep, setTraceStep] = useState<number>(0);
  const [traceRows, setTraceRows] = useState<Array<{ iter: number; k: number; cond?: string; val: number }>>([]);

  // Question checkpoint state (Trang 106)
  const [checkpointAnswer, setCheckpointAnswer] = useState<string | null>(null);

  // Reset trace
  const handleResetTrace = () => {
    setTraceStep(0);
    setTraceRows([]);
  };

  // Step trace
  const handleNextTraceStep = () => {
    if (traceStep < testN) {
      const k = traceStep;
      const newRows = [...traceRows];

      if (selectedAlgo === 'sum') {
        const prevSum = traceRows.length > 0 ? traceRows[traceRows.length - 1].val : 0;
        const newSum = prevSum + k;
        newRows.push({ iter: traceStep + 1, k, val: newSum });
      } else if (selectedAlgo === 'even') {
        const prevSum = traceRows.length > 0 ? traceRows[traceRows.length - 1].val : 0;
        const isEven = k % 2 === 0;
        const newSum = isEven ? prevSum + k : prevSum;
        const condLabel = isEven
          ? (isEn ? 'True (even)' : 'Đúng (chẵn)')
          : (isEn ? 'False (odd)' : 'Sai (lẻ)');
        newRows.push({ iter: traceStep + 1, k, cond: condLabel, val: newSum });
      } else if (selectedAlgo === 'mult3') {
        const prevCount = traceRows.length > 0 ? traceRows[traceRows.length - 1].val : 0;
        const isMult = k % 3 === 0;
        const newCount = isMult ? prevCount + 1 : prevCount;
        const condLabel = isMult
          ? (isEn ? 'True (k % 3 == 0)' : 'Đúng (k % 3 == 0)')
          : (isEn ? 'False' : 'Sai');
        newRows.push({ iter: traceStep + 1, k, cond: condLabel, val: newCount });
      }

      setTraceRows(newRows);
      setTraceStep((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 font-mono">
              <BilingualText
                vi="MỤC 1 • TRANG 105 – 106"
                en="SECTION 1 • PAGES 105 – 106"
              />
            </span>
            <span className="text-xs text-slate-400">
              <BilingualText
                vi="Lý thuyết, Cú pháp & Ví dụ mẫu"
                en="Theory, Syntax & Examples"
              />
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            <BilingualText
              vi="1. LỆNH LẶP FOR VỚI SỐ LẦN BIẾT TRƯỚC"
              en="1. THE FOR LOOP WITH PREDETERMINED ITERATIONS"
            />
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(105);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>{isEn ? 'Original Pages 105 – 106' : 'Đối chiếu Trang 105 – 106'}</span>
        </button>
      </div>

      {/* Hoạt động 1 (Trang 105) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-sm">
              {isEn ? 'Act 1' : 'HĐ 1'}
            </div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Hoạt động 1: Làm quen với lệnh lặp for (Tính tổng 0 + 1 + ... + 9)"
                en="Activity 1: Introducing the for Loop (Sum 0 + 1 + ... + 9)"
              />
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
            {isEn ? 'Result: S = 45' : 'Kết quả: S = 45'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 space-y-2">
            <div className="text-slate-500 text-[11px] font-sans font-bold">
              {isEn ? 'Interactive Python Shell >>>' : 'Chế độ gõ lệnh trực tiếp IDLE >>>'}
            </div>
            <div className="text-slate-300">
              <span className="text-violet-400">&gt;&gt;&gt; </span>S = 0{'\n'}
              <span className="text-violet-400">&gt;&gt;&gt; </span><span className="text-amber-400">for</span> k <span className="text-amber-400">in</span> <span className="text-sky-400">range</span>(10):{'\n'}
              {'        '}S = S + k{'\n'}
              <span className="text-violet-400">&gt;&gt;&gt; </span><span className="text-emerald-400">print</span>(S){'\n'}
              <span className="text-amber-400 font-bold">45</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="font-bold text-slate-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isEn ? 'Execution Mechanism Explanation:' : 'Giải thích cơ chế thực thi:'}</span>
            </div>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-400">
              <li>
                {isEn ? (
                  <>The statement <code className="text-sky-300 font-mono">range(10)</code> yields a <strong>sequence of 10 integers</strong>: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.</>
                ) : (
                  <>Lệnh <code className="text-sky-300 font-mono">range(10)</code> trả lại một <strong>vùng giá trị gồm 10 số</strong>: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.</>
                )}
              </li>
              <li>
                {isEn ? (
                  <>The <code className="text-violet-300 font-mono">for</code> loop performs <strong>10 iterations</strong>, each binding variable <code className="text-amber-300 font-mono">k</code> to the next item in the sequence.</>
                ) : (
                  <>Lệnh <code className="text-violet-300 font-mono">for</code> sẽ thực hiện <strong>10 lần lặp</strong>, mỗi lần lặp ứng với một giá trị <code className="text-amber-300 font-mono">k</code> trong vùng giá trị trên.</>
                )}
              </li>
              <li>
                {isEn ? (
                  <>Accumulator <code className="text-emerald-300 font-mono">S</code> starts at 0, and after 10 cumulative additions equals:<br /><span className="font-mono text-emerald-400 font-semibold">0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45</span>.</>
                ) : (
                  <>Biến tích luỹ <code className="text-emerald-300 font-mono">S</code> ban đầu bằng 0, sau 10 lần cộng dồn sẽ có giá trị:<br /><span className="font-mono text-emerald-400 font-semibold">0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45</span>.</>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Syntax Box & Flowchart Hình 20.1 */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-violet-950/20 border border-violet-800/40 shadow-xl space-y-5">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-violet-400" />
          <h3 className="text-base font-bold text-white">
            <BilingualText
              vi="Cú Pháp Lệnh Lặp for Với Số Lần Biết Trước & Sơ Đồ Khối (Hình 20.1)"
              en="Syntax of Predetermined for Loop & Flowchart (Figure 20.1)"
            />
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Syntax Card */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950 border-2 border-violet-500/40 shadow-inner font-mono text-sm">
              <div className="text-violet-400 font-bold mb-1">
                for <span className="text-amber-400">&lt;i&gt;</span> in <span className="text-sky-400">range</span>(<span className="text-emerald-400">n</span>):
              </div>
              <div className="pl-6 text-slate-300 border-l-2 border-slate-700 ml-2">
                {isEn ? '<statement block>' : '<khối lệnh>'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="font-bold text-slate-200">
                {isEn ? 'Mandatory Python Rules:' : 'Quy tắc bắt buộc trong Python:'}
              </div>
              <p>
                {isEn
                  ? '• A colon ":" is mandatory at the end of the for statement line.'
                  : '• Dấu hai chấm ":" bắt buộc ở cuối dòng chứa lệnh for.'}
              </p>
              <p>
                {isEn
                  ? '• The inner statement block must be indented (typically 4 spaces / 1 tab) and aligned.'
                  : '• <khối lệnh> bên trong thân vòng lặp phải được thụt lùi đầu dòng (mặc định 4 khoảng trắng / 1 tab) và thẳng hàng.'}
              </p>
              <p>
                {isEn
                  ? '• The loop variable <i> takes values from 0 up to n - 1 in order.'
                  : '• Biến <i> lần lượt nhận các giá trị từ 0 đến n - 1.'}
              </p>
            </div>
          </div>

          {/* SVG Flowchart matching Hinh 20.1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
            <div className="text-[11px] font-mono font-bold text-slate-400 mb-2">
              {isEn ? 'FOR LOOP FLOWCHART (TEXTBOOK FIG. 20.1)' : 'SƠ ĐỒ KHỐI VÒNG LẶP FOR (HÌNH 20.1 SGK)'}
            </div>
            <svg viewBox="0 0 320 280" className="w-full max-w-[280px] h-auto">
              {/* Start node */}
              <circle cx="160" cy="20" r="12" fill="#38bdf8" />
              <line x1="160" y1="32" x2="160" y2="55" stroke="#94a3b8" strokeWidth="2" />

              {/* Init box: i = 0 */}
              <rect x="110" y="55" width="100" height="30" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="160" y="74" fill="#f8fafc" fontSize="12" textAnchor="middle" fontFamily="monospace">i = 0</text>
              <line x1="160" y1="85" x2="160" y2="110" stroke="#94a3b8" strokeWidth="2" />

              {/* Loop body box */}
              <rect x="95" y="110" width="130" height="34" rx="4" fill="#854d0e" stroke="#eab308" strokeWidth="1.5" />
              <text x="160" y="131" fill="#fef08a" fontSize="12" textAnchor="middle" fontWeight="bold">
                {isEn ? 'Statement block' : 'Khối lệnh'}
              </text>
              <line x1="160" y1="144" x2="160" y2="170" stroke="#94a3b8" strokeWidth="2" />

              {/* Diamond Decision: i < n - 1 */}
              <polygon points="160,170 230,195 160,220 90,195" fill="#047857" stroke="#10b981" strokeWidth="1.5" />
              <text x="160" y="199" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontFamily="monospace">i &lt; n - 1</text>

              {/* True Branch -> Increment i = i + 1 */}
              <line x1="230" y1="195" x2="270" y2="195" stroke="#10b981" strokeWidth="2" />
              <text x="245" y="188" fill="#34d399" fontSize="10" fontWeight="bold">
                {isEn ? 'True' : 'Đúng'}
              </text>
              <rect x="235" y="110" width="70" height="30" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="270" y="129" fill="#a7f3d0" fontSize="11" textAnchor="middle" fontFamily="monospace">i = i + 1</text>
              <line x1="270" y1="195" x2="270" y2="140" stroke="#10b981" strokeWidth="2" />
              <line x1="235" y1="125" x2="225" y2="125" stroke="#10b981" strokeWidth="2" />

              {/* False Branch -> Exit */}
              <line x1="160" y1="220" x2="160" y2="255" stroke="#ef4444" strokeWidth="2" />
              <text x="175" y="240" fill="#f87171" fontSize="10" fontWeight="bold">
                {isEn ? 'False' : 'Sai'}
              </text>
              <circle cx="160" cy="265" r="10" fill="#ef4444" />
            </svg>
          </div>
        </div>
      </div>

      {/* Textbook Examples: Ví dụ 1 & Ví dụ 2 (Trang 106) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ví dụ 1 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              {isEn ? 'Example 1 (Page 106)' : 'Ví dụ 1 (Trang 106)'}
            </span>
            <span className="text-xs text-slate-400">
              {isEn ? 'Sum of even numbers < n' : 'Tổng số chẵn nhỏ hơn n'}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-100">
            {isEn
              ? 'Calculate sum of even natural numbers less than n (given n = 10)'
              : 'Tính tổng các số tự nhiên chẵn nhỏ hơn n (với n = 10 cho trước)'}
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300">
            n = 10{'\n'}
            S = 0{'\n'}
            <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>(n):{'\n'}
            {'    '}<span className="text-amber-400">if</span> k%2 == 0:  <span className="text-slate-500">{isEn ? '# Condition: k is even' : '# Điều kiện k là số chẵn'}</span>{'\n'}
            {'        '}S = S + k{'\n'}
            <span className="text-emerald-400">print</span>(S)
          </div>

          <div className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            {isEn ? (
              <>👉 Even numbers less than 10: <code className="text-amber-300 font-bold">0, 2, 4, 6, 8</code>.<br />Obtained sum: <span className="text-emerald-400 font-bold font-mono">S = 0 + 2 + 4 + 6 + 8 = 20</span>.</>
            ) : (
              <>👉 Các số chẵn nhỏ hơn 10 là: <code className="text-amber-300 font-bold">0, 2, 4, 6, 8</code>.<br />Tổng thu được: <span className="text-emerald-400 font-bold font-mono">S = 0 + 2 + 4 + 6 + 8 = 20</span>.</>
            )}
          </div>
        </div>

        {/* Ví dụ 2 */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20">
              {isEn ? 'Example 2 (Page 106)' : 'Ví dụ 2 (Trang 106)'}
            </span>
            <span className="text-xs text-slate-400">
              {isEn ? 'Count multiples of 3' : 'Đếm bội số của 3'}
            </span>
          </div>

          <h4 className="text-sm font-bold text-slate-100">
            {isEn
              ? 'Count non-negative integers less than n (n = 20) that are multiples of 3'
              : 'Đếm số các số nguyên nhỏ hơn n (n = 20) và là bội của 3'}
          </h4>

          <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 text-slate-300">
            n = 20{'\n'}
            C = 0{'\n'}
            <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>(n):{'\n'}
            {'    '}<span className="text-amber-400">if</span> k%3 == 0:  <span className="text-slate-500">{isEn ? '# Condition: k is divisible by 3' : '# Điều kiện k chia hết cho 3'}</span>{'\n'}
            {'        '}C = C + 1{'\n'}
            <span className="text-emerald-400">print</span>(C)
          </div>

          <div className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            {isEn ? (
              <>👉 Multiples of 3 less than 20: <code className="text-sky-300 font-bold">0, 3, 6, 9, 12, 15, 18</code>.<br />Obtained count: <span className="text-emerald-400 font-bold font-mono">C = 7 numbers</span> (including 0 since 0 % 3 == 0).</>
            ) : (
              <>👉 Các bội số của 3 nhỏ hơn 20 là: <code className="text-sky-300 font-bold">0, 3, 6, 9, 12, 15, 18</code>.<br />Bộ đếm thu được: <span className="text-emerald-400 font-bold font-mono">C = 7 số</span> (kể cả số 0 vì 0 % 3 == 0).</>
            )}
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ 1 (Trang 106) - High Contrast */}
      <div className="p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-400/80 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <BilingualText
            vi="Ghi Nhớ 1 (Trang 106 SGK)"
            en="Key Takeaway 1 (Textbook Page 106)"
          />
        </div>
        <div className="text-sm text-amber-50 leading-relaxed font-semibold">
          <BilingualText
            vi="for là lệnh lặp với số lần biết trước. Số lần lặp thường được xác định bởi vùng giá trị của lệnh range()."
            en="'for' is a loop statement with a predetermined number of iterations. The iteration count is typically defined by the sequence of values generated by range()."
          />
        </div>
      </div>

      {/* Câu hỏi củng cố mục 1 (Trang 106) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-400" />
          <h3 className="text-base font-bold text-white">
            <BilingualText
              vi="Câu Hỏi Củng Cố Mục 1 (Trang 106 SGK)"
              en="Checkpoint Questions for Section 1 (Page 106)"
            />
          </h3>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <p className="text-slate-300">
            <BilingualText
              vi="Với giá trị n cho trước, so sánh giá trị S trong đoạn chương trình sau với tổng 1 + 2 + ... + n:"
              en="For a given integer n, compare the value of S in the following program with the sum 1 + 2 + ... + n:"
            />
          </p>

          <pre className="p-3 rounded-lg bg-slate-900 text-slate-200 font-mono border border-slate-800">
            S = 0{'\n'}
            <span className="text-violet-400">for</span> k <span className="text-violet-400">in</span> <span className="text-sky-400">range</span>(1, n + 1):{'\n'}
            {'    '}S = S + k
          </pre>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            {[
              { id: 'less', vi: 'S < (1 + 2 + ... + n) (Nhỏ hơn)', en: 'S < (1 + 2 + ... + n) (Less)' },
              { id: 'equal', vi: 'S == (1 + 2 + ... + n) (Bằng nhau)', en: 'S == (1 + 2 + ... + n) (Equal)' },
              { id: 'greater', vi: 'S > (1 + 2 + ... + n) (Lớn hơn)', en: 'S > (1 + 2 + ... + n) (Greater)' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCheckpointAnswer(opt.id)}
                className={`p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all text-left ${
                  checkpointAnswer === opt.id
                    ? opt.id === 'equal'
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500'
                      : 'bg-rose-950/70 text-rose-300 border-rose-500'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <BilingualText vi={opt.vi} en={opt.en} />
              </button>
            ))}
          </div>

          {checkpointAnswer === 'equal' && (
            <div className="p-3 rounded-xl text-xs bg-emerald-950/80 text-emerald-200 border border-emerald-800">
              <BilingualText
                vi="Giải thích chuẩn SGK: Lệnh range(1, n + 1) sinh ra các giá trị từ 1 đến (n + 1 - 1) = n. Do đó vòng lặp cộng dồn đúng các số từ 1 đến n, kết quả S = 1 + 2 + ... + n."
                en="Official Textbook Explanation: The range(1, n + 1) function generates integers from 1 up to (n + 1 - 1) = n. Thus, the loop accumulates exactly 1 through n, resulting in S = 1 + 2 + ... + n."
              />
            </div>
          )}
        </div>
      </div>

      {/* BÀI TẬP TƯƠNG TÁC TẠI CHỖ: Variable Trace Table */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border border-violet-800/40 shadow-2xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600/30 text-violet-300 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                <BilingualText
                  vi="Thực Hành Tương Tác: Bảng Theo Dõi Biến Từng Bước (Trace Table)"
                  en="Interactive Practice: Step-by-Step Variable Trace Table"
                />
              </h3>
              <p className="text-xs text-slate-400">
                <BilingualText
                  vi="Mô phỏng máy tính CPU thực thi từng vòng lặp và cập nhật các biến lưu trữ"
                  en="Simulate CPU loop iteration and variable updates at each execution step"
                />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNextTraceStep}
              disabled={traceStep >= testN}
              className="px-3.5 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-md"
            >
              <SkipForward className="w-4 h-4" />
              <span>{isEn ? `Next step (${traceStep}/${testN})` : `Bước tiếp (${traceStep}/${testN})`}</span>
            </button>
            <button
              type="button"
              onClick={handleResetTrace}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title={isEn ? 'Reset table' : 'Đặt lại bảng'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Algorithm Selection Buttons */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-semibold">
            {isEn ? 'Select algorithm:' : 'Chọn thuật toán:'}
          </span>
          <button
            type="button"
            onClick={() => { setSelectedAlgo('sum'); handleResetTrace(); }}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
              selectedAlgo === 'sum' ? 'bg-violet-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isEn ? 'Sum 0..n-1 (S = S + k)' : 'Tổng 0..n-1 (S = S + k)'}
          </button>
          <button
            type="button"
            onClick={() => { setSelectedAlgo('even'); handleResetTrace(); }}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
              selectedAlgo === 'even' ? 'bg-violet-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isEn ? 'Even numbers only (k%2 == 0)' : 'Chỉ cộng số chẵn (k%2 == 0)'}
          </button>
          <button
            type="button"
            onClick={() => { setSelectedAlgo('mult3'); handleResetTrace(); }}
            className={`px-3 py-1 rounded-lg font-medium cursor-pointer ${
              selectedAlgo === 'mult3' ? 'bg-violet-600 text-white font-bold' : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isEn ? 'Multiples of 3 (C = C + 1)' : 'Đếm bội của 3 (C = C + 1)'}
          </button>
        </div>

        {/* Trace Table View */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">{isEn ? 'Iteration' : 'Lần lặp'}</th>
                <th className="py-2.5 px-3">{isEn ? 'Variable (k)' : 'Biến lặp (k)'}</th>
                {selectedAlgo !== 'sum' && <th className="py-2.5 px-3">{isEn ? 'Condition Test' : 'Kiểm tra điều kiện'}</th>}
                <th className="py-2.5 px-3">
                  {selectedAlgo === 'mult3'
                    ? (isEn ? 'Counter (C)' : 'Bộ đếm (C)')
                    : (isEn ? 'Accumulated Sum (S)' : 'Tổng tích luỹ (S)')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="bg-slate-900/30 text-slate-500">
                <td className="py-2 px-3">{isEn ? 'Initial' : 'Khởi tạo'}</td>
                <td className="py-2 px-3">-</td>
                {selectedAlgo !== 'sum' && <td className="py-2 px-3">-</td>}
                <td className="py-2 px-3 text-amber-400 font-bold">0</td>
              </tr>
              {traceRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors animate-in fade-in duration-200">
                  <td className="py-2 px-3 text-slate-400">
                    {isEn ? `Iter ${row.iter}` : `Lần ${row.iter}`}
                  </td>
                  <td className="py-2 px-3 text-sky-400 font-bold">{row.k}</td>
                  {selectedAlgo !== 'sum' && (
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        row.cond?.includes('True') || row.cond?.includes('Đúng')
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-900 text-slate-500'
                      }`}>
                        {row.cond}
                      </span>
                    </td>
                  )}
                  <td className="py-2 px-3 text-emerald-400 font-black text-sm">{row.val}</td>
                </tr>
              ))}
              {traceRows.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-slate-500 text-xs font-sans">
                    {isEn
                      ? 'Click "Next step" to trace each iteration cycle...'
                      : 'Nhấn "Bước tiếp" để xem từng chu kỳ vòng lặp hoạt động...'}
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
