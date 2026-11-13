import React, { useState } from 'react';
import { Code2, Play, Info, HelpCircle, CheckCircle2, Sparkles, Terminal, CornerDownRight, Check } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section26CustomFunctions: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive Function Builder State
  const [sampleOption, setSampleOption] = useState<'inc' | 'double' | 'greet' | 'line'>('inc');
  const [testArg, setTestArg] = useState<string>('5');
  const [execResult, setExecResult] = useState<string>('6');

  // Review questions reveals
  const [qARevealed, setQARevealed] = useState<boolean>(false);
  const [qBRevealed, setQBRevealed] = useState<boolean>(false);

  const handleRunSample = () => {
    if (sampleOption === 'inc') {
      const n = Number(testArg) || 0;
      setExecResult(String(n + 1));
    } else if (sampleOption === 'double') {
      const n = Number(testArg) || 0;
      setExecResult(String(n * 2));
    } else if (sampleOption === 'greet') {
      setExecResult(isEn ? `Screen prints: "Xin chào bạn ${testArg}" (Return value: None)` : `Màn hình in: "Xin chào bạn ${testArg}" (Giá trị trả lại: None)`);
    } else if (sampleOption === 'line') {
      const n = Math.min(20, Math.max(1, Number(testArg) || 5));
      setExecResult(isEn ? `Screen prints: "${'-'.repeat(n)}" (Return value: None)` : `Màn hình in: "${'-'.repeat(n)}" (Giá trị trả lại: None)`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full w-fit border border-purple-500/20">
          <span>{isEn ? 'Section 2' : 'Mục 2'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 128 – 129' : 'Trang 128 – 129 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '2. Creating User-Defined Functions' : '2. Thiết Lập Các Hàm Tự Định Nghĩa'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Define your own reusable subroutines using the def keyword, parameter signatures, uniform indentation, and return statements.'
            : 'Xây dựng các chương trình con của riêng mình bằng từ khoá def, quy tắc đặt tên định danh, thụt lề bắt buộc, và lệnh return trả lại kết quả.'}
        </p>
      </div>

      {/* Hoạt động 2: Cách thiết lập hàm trong Python */}
      <div className="rounded-2xl border border-purple-500/30 bg-slate-900/90 p-6 shadow-lg space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">
              {isEn ? 'Activity 2: How to Define Functions in Python' : 'Hoạt động 2: Cách thiết lập hàm trong Python'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Compare functions that return values vs void functions with side effects' : 'So sánh hai loại hàm: hàm có trả lại giá trị và hàm không trả lại giá trị'}
            </p>
          </div>
        </div>

        {/* 2 Ví dụ đối chiếu: Ví dụ 1 vs Ví dụ 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Ví dụ 1: Hàm có trả lại giá trị */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-emerald-400 uppercase tracking-wider">
                  {isEn ? 'Example 1: Function Returning Value' : 'Ví dụ 1 (Tr. 128): Hàm có trả lại giá trị'}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {isEn ? 'return <value>' : 'return <giá trị>'}
                </span>
              </div>

              <div className="p-3 bg-black/70 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 space-y-1">
                <div>
                  <span className="text-purple-400 font-bold">def</span> <span className="text-sky-300 font-bold">inc</span>(n):
                </div>
                <div className="pl-6 text-slate-300">
                  <span className="text-amber-400 font-bold">return</span> n + 1
                </div>
                <div className="text-slate-500 pt-1.5 border-t border-slate-800">
                  &gt;&gt;&gt; inc(3)
                </div>
                <div className="text-emerald-400 font-bold">4</div>
              </div>

              <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                <li><strong>{isEn ? 'Function name:' : 'Tên hàm:'}</strong> <code>inc</code></li>
                <li><strong>{isEn ? 'Parameter:' : 'Tham số hàm:'}</strong> {isEn ? 'number' : 'số'} <code>n</code></li>
                <li><strong>{isEn ? 'Return value:' : 'Giá trị trả lại:'}</strong> {isEn ? 'number' : 'số'} <code>n + 1</code></li>
              </ul>
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-300">
              💡 {isEn ? 'Result can be assigned to a variable or nested in expressions: x = inc(3) * 2.' : 'Kết quả có thể gán vào biến hoặc lồng vào biểu thức: x = inc(3) * 2.'}
            </div>
          </div>

          {/* Ví dụ 2: Hàm không trả lại giá trị */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-purple-400 uppercase tracking-wider">
                  {isEn ? 'Example 2: Void Function' : 'Ví dụ 2 (Tr. 128): Hàm không trả lại giá trị'}
                </span>
                <span className="text-[11px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                  {isEn ? 'return or omit (None)' : 'return hoặc bỏ qua (None)'}
                </span>
              </div>

              <div className="p-3 bg-black/70 rounded-xl font-mono text-xs text-slate-200 border border-slate-800 space-y-1">
                <div>
                  <span className="text-purple-400 font-bold">def</span> <span className="text-sky-300 font-bold">thong_bao</span>(msg):
                </div>
                <div className="pl-6 text-slate-300">
                  <span className="text-sky-300">print</span>("Xin chào bạn", msg)
                </div>
                <div className="pl-6 text-amber-400 font-bold">
                  return
                </div>
                <div className="text-slate-500 pt-1.5 border-t border-slate-800">
                  &gt;&gt;&gt; thong_bao("Trần Quang Minh")
                </div>
                <div className="text-emerald-400">Xin chào bạn Trần Quang Minh</div>
              </div>

              <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                <li><strong>{isEn ? 'Function name:' : 'Tên hàm:'}</strong> <code>thong_bao</code></li>
                <li><strong>{isEn ? 'Parameter:' : 'Tham số hàm:'}</strong> {isEn ? 'string' : 'xâu kí tự'} <code>msg</code></li>
                <li><strong>{isEn ? 'Return value:' : 'Giá trị trả lại:'}</strong> {isEn ? 'None (no return expression)' : 'không có (hoặc None)'}</li>
              </ul>
            </div>

            <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-800/40 text-[11px] text-purple-300">
              💡 {isEn ? 'Functions can perform display side-effects without producing a calculation value (implicitly returns None).' : 'Hàm thực hiện các tác vụ hiển thị màn hình (side-effect) mà không cần tạo giá trị số/xâu trả về (ngầm định trả về None).'}
            </div>
          </div>
        </div>

        {/* Hộp Ghi nhớ 2 (Trang 128 SGK) */}
        <div className="p-5 rounded-2xl bg-linear-to-r from-purple-950/40 via-purple-900/20 to-slate-900 border-2 border-dashed border-purple-500/60 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <Info className="w-5 h-5 shrink-0" />
            <span>{isEn ? 'Summary Box 2 (Textbook p. 128)' : 'Hộp Ghi nhớ 2 (Trang 128 SGK)'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-7 font-medium">
            {isEn
              ? 'Functions in Python are defined with the def keyword, followed by the function name (following identifier naming rules). Functions can have or omit parameters. The function body block is written after a colon (:) with uniform indentation. A function can return a value after return or omit it.'
              : 'Hàm trong Python được định nghĩa bằng từ khoá def, theo sau là tên hàm (tên hàm sẽ theo quy tắc đặt tên định danh). Hàm có thể có hoặc không có tham số. Khối lệnh mô tả hàm được viết sau dấu ":" và viết lùi vào, thẳng hàng. Hàm có thể có hoặc không có giá trị trả lại sau từ khoá return.'}
          </p>
        </div>

        {/* Cú pháp chi tiết: Có return vs Không return (Trang 129 SGK) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-400">
              {isEn ? '1. Syntax for function with return value:' : '1. Cú pháp hàm có trả lại giá trị:'}
            </div>
            <pre className="p-2.5 rounded bg-black/60 font-mono text-slate-200 border border-slate-800">
{isEn
? `def <function_name>(<parameters>):
    <code_block>
    return <value>`
: `def <tên hàm>(<tham số>):
    <khối lệnh>
    return <giá trị>`}
            </pre>
            <p className="text-slate-400 leading-relaxed">
              {isEn
                ? 'Requires return <value>. Execution terminates immediately upon encountering return and yields <value>.'
                : 'Cần có lệnh return <giá trị>. Hàm sẽ kết thúc ngay khi gặp lệnh return và trả lại <giá trị>.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-purple-400">
              {isEn ? '2. Syntax for void function (no return value):' : '2. Cú pháp hàm không trả lại giá trị:'}
            </div>
            <pre className="p-2.5 rounded bg-black/60 font-mono text-slate-200 border border-slate-800">
{isEn
? `def <function_name>(<parameters>):
    <code_block>
    return`
: `def <tên hàm>(<tham số>):
    <khối lệnh>
    return`}
            </pre>
            <p className="text-slate-400 leading-relaxed">
              {isEn
                ? 'The return statement has no expression. In Python, if a function reaches the end of its body without returning a value, it implicitly returns None.'
                : 'Lệnh return không có biểu thức đi kèm. Trong Python, nếu hàm dùng return không kèm biểu thức hoặc chạy hết thân hàm thì cũng ngầm định trả về None.'}
            </p>
          </div>
        </div>

        {/* Hộp Ghi nhớ 3 (Trang 129 SGK) */}
        <div className="p-5 rounded-2xl bg-linear-to-r from-amber-950/40 via-amber-900/20 to-slate-900 border-2 border-dashed border-amber-500/60 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Info className="w-5 h-5 shrink-0" />
            <span>{isEn ? 'Summary Box 3 (Textbook p. 129)' : 'Hộp Ghi nhớ 3 (Trang 129 SGK)'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-7 font-medium">
            {isEn
              ? 'To return a value, the return statement in the function definition must be accompanied by <value>. To define a void function, use return without <value> or omit return entirely.'
              : 'Để thiết lập hàm trả lại giá trị, câu lệnh return trong khai báo hàm cần có <giá trị> đi kèm. Để thiết lập hàm không trả lại giá trị có thể dùng lệnh return không có <giá trị> hoặc không cần có return.'}
          </p>
        </div>
      </div>

      {/* Interactive Custom Function Studio */}
      <div className="rounded-2xl border border-purple-500/30 bg-slate-900/90 p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-base sm:text-lg text-white">
              {isEn ? 'Interactive Custom Function Studio' : 'Phòng Thử Nghiệm Thiết Lập Hàm Trực Tuyến'}
            </h3>
          </div>
          <span className="text-xs font-mono text-purple-300">Live Virtual Runner</span>
        </div>

        {/* Select Function Template */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'inc', label: isEn ? 'inc(n): return n + 1 (With return)' : 'inc(n): return n + 1 (Có return)' },
            { id: 'double', label: isEn ? 'gap_doi(n): return n * 2 (With return)' : 'gap_doi(n): return n * 2 (Có return)' },
            { id: 'greet', label: isEn ? 'thong_bao(msg) (Void / No return)' : 'thong_bao(msg) (Không return)' },
            { id: 'line', label: isEn ? 'in_ke_ngang(n) (Void / No return)' : 'in_ke_ngang(n) (Không return)' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSampleOption(item.id as any);
                setTestArg(item.id === 'greet' ? 'Trần Quang Minh' : '5');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                sampleOption === item.id
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Code Anatomy Visualizer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
            <span>{isEn ? 'Code Anatomy of Definition:' : 'Giải phẫu cú pháp khai báo hàm:'}</span>
            <span className="font-mono text-purple-400">def signature</span>
          </div>

          <div className="p-3 bg-black/80 rounded-lg font-mono text-xs space-y-1.5 border border-slate-800">
            <div>
              <span className="text-purple-400 font-bold">def</span>{' '}
              <span className="text-sky-300 font-bold">
                {sampleOption === 'inc' ? 'inc' : sampleOption === 'double' ? 'gap_doi' : sampleOption === 'greet' ? 'thong_bao' : 'in_ke_ngang'}
              </span>
              (
              <span className="text-amber-300 font-bold">
                {sampleOption === 'greet' ? 'msg' : 'n'}
              </span>
              ):
              <span className="text-slate-500 ml-3 text-[11px]">{isEn ? '# Colon ":" required' : '# Dấu ":" bắt buộc'}</span>
            </div>
            <div className="pl-6 text-slate-300">
              {sampleOption === 'inc' && (
                <>
                  <span className="text-amber-400 font-bold">return</span> n + 1
                </>
              )}
              {sampleOption === 'double' && (
                <>
                  <span className="text-amber-400 font-bold">return</span> n * 2
                </>
              )}
              {sampleOption === 'greet' && (
                <>
                  <span className="text-sky-300">print</span>("Xin chào bạn", msg)
                  <br />
                  <span className="text-amber-400 font-bold">return</span>
                </>
              )}
              {sampleOption === 'line' && (
                <>
                  <span className="text-sky-300">print</span>("-" * n)
                </>
              )}
            </div>
          </div>
        </div>

        {/* Input & Execution Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">
              {isEn ? 'Argument value:' : 'Giá trị đối số truyền vào:'}
            </span>
            <input
              type="text"
              value={testArg}
              onChange={(e) => setTestArg(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:border-purple-500 outline-hidden w-40"
            />
          </div>

          <button
            type="button"
            onClick={handleRunSample}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isEn ? 'Invoke Function' : 'Gọi hàm thực thi'}</span>
          </button>
        </div>

        {/* Live Output */}
        <div className="p-3.5 rounded-xl bg-black/70 border border-purple-500/30 font-mono text-xs flex items-center justify-between">
          <span className="text-slate-400">{isEn ? 'Execution result:' : 'Kết quả thực thi:'}</span>
          <span className="text-emerald-400 font-bold text-sm">{execResult}</span>
        </div>
      </div>

      {/* Review Questions (Câu hỏi củng cố Mục 2 - Trang 129 SGK) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-base text-white">
            {isEn ? 'Review Questions (SGK Page 129)' : 'Câu hỏi Củng cố Mục 2 (Trang 129 SGK)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question a */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {isEn ? 'Question a • Page 129' : 'Câu a • Trang 129'}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-semibold">
              {isEn ? 'Explain the definition syntax and purpose of this function:' : 'Giải thích cách thiết lập và chức năng của hàm:'}
            </p>
            <pre className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-amber-300 border border-slate-800">
{`def Nhap_xau():
    msg = input("Nhập một xâu: ")
    return msg`}
            </pre>

            <button
              type="button"
              onClick={() => setQARevealed(!qARevealed)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-purple-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{qARevealed ? (isEn ? 'Hide Explanation' : 'Ẩn giải thích') : (isEn ? 'Show Explanation' : 'Xem giải thích SGK')}</span>
            </button>

            {qARevealed && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-1.5 animate-in fade-in duration-200 text-slate-200">
                <div className="font-bold text-emerald-400">{isEn ? 'Analysis:' : 'Phân tích:'}</div>
                <p>
                  - <strong>{isEn ? 'Definition:' : 'Cách thiết lập:'}</strong> {isEn ? 'Function name is Nhap_xau; empty parentheses mean zero parameters.' : 'Tên hàm là Nhap_xau, cặp ngoặc đơn rỗng nên không có tham số.'}
                </p>
                <p>
                  - <strong>{isEn ? 'Function purpose:' : 'Chức năng:'}</strong> {isEn ? 'Prompts user for a string via input() and returns it via return msg.' : 'Yêu cầu người dùng nhập một xâu kí tự từ bàn phím và trả lại giá trị xâu đó thông qua lệnh return msg.'}
                </p>
              </div>
            )}
          </div>

          {/* Question b */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {isEn ? 'Question b • Page 129' : 'Câu b • Trang 129'}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-semibold">
              {isEn ? 'Explain the definition syntax and purpose of this function:' : 'Giải thích cách thiết lập và chức năng của hàm:'}
            </p>
            <pre className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-amber-300 border border-slate-800">
{`def Inday(n):
    for k in range(n):
        print(k, end = " ")`}
            </pre>

            <button
              type="button"
              onClick={() => setQBRevealed(!qBRevealed)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-purple-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{qBRevealed ? (isEn ? 'Hide Explanation' : 'Ẩn giải thích') : (isEn ? 'Show Explanation' : 'Xem giải thích SGK')}</span>
            </button>

            {qBRevealed && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-1.5 animate-in fade-in duration-200 text-slate-200">
                <div className="font-bold text-emerald-400">{isEn ? 'Analysis:' : 'Phân tích:'}</div>
                <p>
                  - <strong>{isEn ? 'Definition:' : 'Cách thiết lập:'}</strong> {isEn ? 'Function name is Inday with 1 parameter n; no return statement (returns None).' : 'Tên hàm là Inday, có 1 tham số là số tự nhiên n, không có lệnh return (hàm không trả lại giá trị, trả về None).'}
                </p>
                <p>
                  - <strong>{isEn ? 'Function purpose:' : 'Chức năng:'}</strong> {isEn ? 'Prints natural numbers from 0 to n - 1 on a single horizontal line separated by spaces.' : 'In ra màn hình dãy số tự nhiên từ 0 đến n - 1 trên cùng một hàng ngang, cách nhau bởi dấu cách.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

