import React, { useState } from 'react';
import { Terminal, Code2, AlertTriangle, CheckCircle2, HelpCircle, BookOpen, Sparkles, Play, ArrowRight, ShieldAlert } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section27ParametersArguments: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive Live Sandbox State
  const [arg1, setArg1] = useState<string>('10');
  const [arg2, setArg2] = useState<string>('20');
  const [arg3, setArg3] = useState<string>('5');
  const [simulatedOutput, setSimulatedOutput] = useState<{
    success: boolean;
    result?: string;
    errorType?: string;
    errorMsg?: string;
    trace?: string;
  }>({
    success: true,
    result: '35',
    trace: 'a = 10, b = 20, c = 5 => a + b + c = 10 + 20 + 5 = 35'
  });

  // Review questions reveals
  const [q1Revealed, setQ1Revealed] = useState<boolean>(false);
  const [q2Revealed, setQ2Revealed] = useState<boolean>(false);

  // Evaluate interactive call
  const handleExecute = (custom1?: string, custom2?: string, custom3?: string) => {
    const aVal = custom1 !== undefined ? custom1 : arg1.trim();
    const bVal = custom2 !== undefined ? custom2 : arg2.trim();
    const cVal = custom3 !== undefined ? custom3 : arg3.trim();

    // Check undefined variable names
    if (aVal === 'a' || bVal === 'b' || cVal === 'c') {
      const errName = aVal === 'a' ? "'a'" : bVal === 'b' ? "'b'" : "'c'";
      setSimulatedOutput({
        success: false,
        errorType: 'NameError',
        errorMsg: `NameError: name ${errName} is not defined`,
        trace: isEn
          ? `File "<pyshell#10>", line 1, in <module>\n  f(${aVal}, ${bVal}, ${cVal})\nNameError: name ${errName} is not defined (Variable has never been assigned outside the function!)`
          : `File "<pyshell#10>", line 1, in <module>\n  f(${aVal}, ${bVal}, ${cVal})\nNameError: name ${errName} is not defined (Biến chưa từng được gán giá trị ngoài hàm!)`
      });
      return;
    }

    // Check missing values (e.g. empty)
    if (!aVal || !bVal || !cVal) {
      const count = [aVal, bVal, cVal].filter(Boolean).length;
      setSimulatedOutput({
        success: false,
        errorType: 'TypeError',
        errorMsg: `TypeError: f() missing ${3 - count} required positional argument(s)`,
        trace: `File "<pyshell#15>", line 1, in <module>\nTypeError: f() takes 3 positional arguments but ${count} were given`
      });
      return;
    }

    const n1 = parseFloat(aVal);
    const n2 = parseFloat(bVal);
    const n3 = parseFloat(cVal);

    if (isNaN(n1) || isNaN(n2) || isNaN(n3)) {
      // String concatenation if string
      setSimulatedOutput({
        success: true,
        result: `"${aVal}${bVal}${cVal}"`,
        trace: isEn
          ? `a="${aVal}", b="${bVal}", c="${cVal}" => Successfully concatenated 3 strings!`
          : `a="${aVal}", b="${bVal}", c="${cVal}" => Nối 3 xâu kí tự thành công!`
      });
    } else {
      const sum = n1 + n2 + n3;
      setSimulatedOutput({
        success: true,
        result: String(sum),
        trace: `a = ${n1}, b = ${n2}, c = ${n3} => a + b + c = ${n1} + ${n2} + ${n3} = ${sum}`
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full w-fit border border-purple-500/20">
          <span>{isEn ? 'Section 1: Parameters & Arguments' : 'Mục 1: Tham số và đối số'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 131 – 132' : 'Trang 131 – 132 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '1. Function Parameters and Arguments' : '1. Tham Số Và Đối Số Của Hàm'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Distinguish between formal parameters in function definitions and actual arguments in function calls, understand value-passing mechanics, and master Python error handling for count mismatches (TypeError) and undefined names (NameError).'
            : 'Khám phá sự khác biệt bản chất giữa tham số (parameter) khi định nghĩa hàm và đối số (argument) khi gọi hàm; nắm vững cơ chế truyền giá trị và các lỗi thường gặp: TypeError và NameError.'}
        </p>
      </div>

      {/* Hoạt động 1 & Phân tích ví dụ SGK Trang 131 */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
          <BookOpen className="w-5 h-5" />
          <span>{isEn ? 'Activity 1 & Example (SGK Page 131): Data Passing via Parameters' : 'Hoạt động 1 & Ví dụ (Trang 131 SGK): Cách truyền dữ liệu qua tham số'}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {isEn
            ? 'Observe the code snippet below and trace how Python passes data into function parameters across four distinct calling scenarios:'
            : 'Quan sát ví dụ sau trong SGK trang 131 để tìm hiểu cách dữ liệu được truyền qua tham số vào hàm và phân tích 4 trường hợp gọi hàm:'}
        </p>

        {/* Code Block with Annotations */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
          <div className="text-slate-500">
            {isEn ? '# Define function with 3 formal parameters a, b, c' : '# Định nghĩa hàm với 3 tham số a, b, c'}
          </div>
          <div className="flex items-center justify-between text-purple-300">
            <span>1  <span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">f</span>(a, b, c):</span>
            <span className="text-slate-500 text-[11px] hidden sm:inline">
              {isEn ? '← Function f() declares 3 parameters a, b, c' : '← Hàm f() có 3 tham số a, b, c'}
            </span>
          </div>
          <div className="text-purple-300">2      <span className="text-pink-400 font-bold">return</span> a + b + c</div>

          <div className="pt-2 border-t border-slate-800/80 text-slate-500">
            {isEn ? '# Case 1: Call with 3 concrete value arguments' : '# Trường hợp 1: Gọi hàm với 3 giá trị cụ thể'}
          </div>
          <div className="flex items-center justify-between text-cyan-300">
            <span>3  &gt;&gt;&gt; <span className="text-amber-300">f</span>(1, 2, 3)</span>
            <span className="text-slate-500 text-[11px] hidden sm:inline">
              {isEn ? '← Called with 3 concrete arguments 1, 2, 3' : '← Gọi với 3 đối số cụ thể 1, 2, 3'}
            </span>
          </div>
          <div className="text-emerald-400 font-bold">4  6</div>

          <div className="pt-2 border-t border-slate-800/80 text-slate-500">
            {isEn ? '# Case 2: Call with 3 pre-assigned variable arguments' : '# Trường hợp 2: Gọi hàm với 3 biến đã có giá trị'}
          </div>
          <div className="text-slate-300">5  &gt;&gt;&gt; x, y, z = 10, 20, 5</div>
          <div className="flex items-center justify-between text-cyan-300">
            <span>6  &gt;&gt;&gt; <span className="text-amber-300">f</span>(x, y, z)</span>
            <span className="text-slate-500 text-[11px] hidden sm:inline">
              {isEn ? '← Called with 3 variables holding values' : '← Gọi với 3 biến đã gán giá trị'}
            </span>
          </div>
          <div className="text-emerald-400 font-bold">7  35</div>

          <div className="pt-2 border-t border-slate-800/80 text-slate-500">
            {isEn ? '# Case 3: Error raised if passed arguments are undefined identifiers' : '# Trường hợp 3: Báo lỗi nếu biến truyền vào chưa có giá trị'}
          </div>
          <div className="flex items-center justify-between text-rose-400">
            <span>8  &gt;&gt;&gt; <span className="text-amber-300">f</span>(a, b, c)</span>
            <span className="text-rose-400 text-[11px] font-bold">
              {isEn ? '← Error: a, b, c are not defined outside the function!' : '← Báo lỗi vì a, b, c chưa định nghĩa ngoài hàm!'}
            </span>
          </div>
          <div className="text-rose-400 text-[11px] pl-3 border-l-2 border-rose-500">
            <div>Traceback (most recent call last):</div>
            <div>  File "&lt;pyshell#6&gt;", line 1, in &lt;module&gt;</div>
            <div className="font-bold">NameError: name 'a' is not defined</div>
          </div>
        </div>

        {/* 4 Cards explaining the lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1">
            <span className="font-mono font-bold text-purple-400">{isEn ? 'Line 1' : 'Dòng 1'}</span>
            <div className="text-white font-bold">{isEn ? 'Parameter Declaration' : 'Khai báo tham số'}</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isEn
                ? 'Function f() is defined with 3 formal parameters a, b, c. Within the body, parameters act as local variables.'
                : 'Hàm f() được định nghĩa với 3 tham số a, b, c. Trong định nghĩa hàm, các tham số được dùng như biến.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
            <span className="font-mono font-bold text-emerald-400">{isEn ? 'Line 3' : 'Dòng 3'}</span>
            <div className="text-white font-bold">{isEn ? 'Concrete Value Arguments' : 'Đối số giá trị cụ thể'}</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isEn
                ? 'f(1, 2, 3) is invoked with 3 values. 1, 2, 3 are actual arguments passed and bound to a=1, b=2, c=3.'
                : 'f(1, 2, 3) được gọi với 3 giá trị cụ thể. 1, 2, 3 là các đối số truyền vào gán cho a=1, b=2, c=3.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1">
            <span className="font-mono font-bold text-cyan-400">{isEn ? 'Line 6' : 'Dòng 6'}</span>
            <div className="text-white font-bold">{isEn ? 'Pre-assigned Arguments' : 'Đối số là biến đã gán'}</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isEn
                ? 'f(x, y, z) is called with 3 variables (x=10, y=20, z=5), returning evaluated 10 + 20 + 5 = 35.'
                : 'f(x, y, z) được gọi với 3 biến đã có giá trị (x=10, y=20, z=5), kết quả trả lại là 10+20+5 = 35.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-rose-500/30 space-y-1">
            <span className="font-mono font-bold text-rose-400">{isEn ? 'Line 10' : 'Dòng 10'}</span>
            <div className="text-white font-bold">{isEn ? 'NameError Raised' : 'Lỗi NameError'}</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {isEn
                ? 'f(a, b, c) fails because a, b, c have not been assigned in global scope. Parameters in def do not create outer variables!'
                : 'f(a, b, c) bị lỗi vì biến a, b, c ngoài hàm chưa có giá trị. Tham số trong hàm không tự tạo biến ngoài hàm!'}
            </p>
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ 1 (Trang 132 SGK) */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-amber-950/60 via-slate-900 to-slate-900 border-2 border-amber-500/40 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-amber-300 uppercase tracking-wide">
            <BilingualText
              vi="Hộp Ghi Nhớ 1 (Trang 132 SGK): Tham Số & Đối Số"
              en="Summary Box 1 (SGK Page 132): Parameters vs Arguments"
            />
          </h3>
        </div>
        <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed pl-2 border-l-2 border-amber-500">
          <div>
            <BilingualText
              vi="• Tham số của hàm được định nghĩa khi khai báo hàm và được dùng như biến trong định nghĩa hàm."
              en="• Function parameters are declared in the function definition and serve as variables within the function body."
            />
          </div>
          <div>
            <BilingualText
              vi="• Đối số là giá trị được truyền vào khi gọi hàm."
              en="• Arguments are the actual values passed into the function upon invocation."
            />
          </div>
          <div>
            <BilingualText
              vi="• Khi gọi hàm, các tham số (parameter) sẽ được truyền bằng giá trị thông qua đối số (argument) của hàm."
              en="• Upon calling a function, parameters are assigned the evaluated values passed by their corresponding arguments."
            />
          </div>
          <div className="text-amber-300 font-bold">
            <BilingualText
              vi="• Số lượng giá trị được truyền vào hàm BẰNG VỚI số tham số trong khai báo của hàm! Sai lệch số lượng sẽ gây lỗi TypeError."
              en="• The number of arguments passed MUST EQUAL the number of declared parameters! A count mismatch raises a TypeError."
            />
          </div>
        </div>
      </div>

      {/* Interactive Live Parameter Sandbox */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-purple-400">
            <Terminal className="w-5 h-5" />
            <span>{isEn ? 'Interactive Parameter & Argument Tester' : 'Phòng Thí Nghiệm Ánh Xạ Tham Số & Bắt Lỗi Thực Tế'}</span>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
            def f(a, b, c): return a + b + c
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-mono">
              {isEn ? 'Argument 1 (maps to a):' : 'Đối số 1 (gán cho a):'}
            </label>
            <input
              type="text"
              value={arg1}
              onChange={(e) => setArg1(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-hidden focus:border-purple-500"
              placeholder={isEn ? "e.g. 10, 'Hello', a" : "VD: 10, 'Hello', a"}
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-mono">
              {isEn ? 'Argument 2 (maps to b):' : 'Đối số 2 (gán cho b):'}
            </label>
            <input
              type="text"
              value={arg2}
              onChange={(e) => setArg2(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-hidden focus:border-purple-500"
              placeholder={isEn ? 'e.g. 20, 3.5, b' : 'VD: 20, 3.5, b'}
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1 font-mono">
              {isEn ? 'Argument 3 (maps to c):' : 'Đối số 3 (gán cho c):'}
            </label>
            <input
              type="text"
              value={arg3}
              onChange={(e) => setArg3(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm font-mono text-white focus:outline-hidden focus:border-purple-500"
              placeholder={isEn ? 'e.g. 5, 100, c' : 'VD: 5, 100, c'}
            />
          </div>
        </div>

        {/* Quick Test Presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-slate-400">{isEn ? 'Quick presets:' : 'Tình huống mẫu SGK:'}</span>
          <button
            onClick={() => {
              setArg1('1');
              setArg2('2');
              setArg3('3');
              handleExecute('1', '2', '3');
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono cursor-pointer"
          >
            f(1, 2, 3)
          </button>
          <button
            onClick={() => {
              setArg1('10');
              setArg2('20');
              setArg3('5');
              handleExecute('10', '20', '5');
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono cursor-pointer"
          >
            f(10, 20, 5)
          </button>
          <button
            onClick={() => {
              setArg1('a');
              setArg2('b');
              setArg3('c');
              handleExecute('a', 'b', 'c');
            }}
            className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 font-mono cursor-pointer"
          >
            {isEn ? 'f(a, b, c) [NameError]' : 'f(a, b, c) [Lỗi NameError]'}
          </button>
          <button
            onClick={() => {
              setArg1('10');
              setArg2('20');
              setArg3('');
              handleExecute('10', '20', '');
            }}
            className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/30 font-mono cursor-pointer"
          >
            {isEn ? 'f(10, 20) [TypeError: Missing argument]' : 'f(10, 20) [Lỗi TypeError: Thiếu đối số]'}
          </button>

          <button
            onClick={() => handleExecute()}
            className="ml-auto px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isEn ? 'Call f()' : 'Thực hiện gọi hàm'}</span>
          </button>
        </div>

        {/* Output Console Box */}
        <div className={`p-4 rounded-2xl border font-mono text-xs space-y-1.5 ${
          simulatedOutput.success ? 'bg-slate-950 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
        }`}>
          <div className="flex items-center justify-between text-slate-400 text-[11px] border-b border-slate-800 pb-1">
            <span>Python Terminal Simulation</span>
            <span>{simulatedOutput.success ? 'Execution: SUCCESS' : 'Execution: ERROR'}</span>
          </div>
          {simulatedOutput.success ? (
            <div className="space-y-1 pt-1">
              <div>&gt;&gt;&gt; f({arg1}, {arg2}, {arg3})</div>
              <div className="text-base font-bold text-white">{simulatedOutput.result}</div>
              <div className="text-slate-400 text-[11px]">{simulatedOutput.trace}</div>
            </div>
          ) : (
            <div className="space-y-1 pt-1">
              <div>&gt;&gt;&gt; f({arg1 || '?'}, {arg2 || '?'}, {arg3 || '?'})</div>
              <div className="text-rose-400 font-bold whitespace-pre-wrap">{simulatedOutput.trace}</div>
            </div>
          )}
        </div>
      </div>

      {/* Câu hỏi củng cố (Trang 132 SGK) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-400">
          <HelpCircle className="w-5 h-5" />
          <span>{isEn ? 'Review Questions (SGK Page 132)' : 'Câu Hỏi Củng Cố (Trang 132 SGK)'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {isEn ? 'Question 1' : 'Câu hỏi 1'}
              </span>
              <p className="text-xs text-white font-medium leading-relaxed">
                {isEn
                  ? 'If a function is declared with 1 parameter, can it be called with 2 arguments?'
                  : 'Một hàm khi khai báo có một tham số, nhưng khi gọi hàm có thể có hai đối số được không?'}
              </p>
            </div>

            <div>
              <button
                onClick={() => setQ1Revealed(!q1Revealed)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all w-fit cursor-pointer"
              >
                <span>{q1Revealed ? (isEn ? 'Hide Answer' : 'Ẩn câu trả lời') : (isEn ? 'Reveal SGK Answer' : 'Xem câu trả lời chuẩn SGK')}</span>
              </button>

              {q1Revealed && (
                <div className="mt-2.5 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 space-y-1 animate-in fade-in leading-relaxed">
                  <div className="font-bold text-amber-300">
                    {isEn ? 'No, it cannot!' : 'Không thể được!'}
                  </div>
                  <p>
                    {isEn
                      ? 'According to Summary Box 1: "The number of values passed into the function must equal the number of parameters declared in the function definition."'
                      : 'Theo Hộp Ghi nhớ 1: "Số lượng giá trị được truyền vào hàm bằng với số tham số trong khai báo của hàm."'}
                  </p>
                  <p className="text-rose-300 font-mono text-[11px]">
                    {isEn ? 'Example:' : 'Ví dụ:'} def inc(n): return n+1<br />
                    inc(3, 5) -&gt; TypeError: inc() takes 1 positional argument but 2 were given.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {isEn ? 'Question 2' : 'Câu hỏi 2'}
              </span>
              <p className="text-xs text-white font-medium leading-relaxed">
                {isEn
                  ? 'Given function f(x, y) returns x + 2y. Does calling f(10, a) cause an error?'
                  : 'Giả sử hàm f có hai tham số x, y khi khai báo, hàm sẽ trả lại giá trị x + 2y. Lời gọi hàm f(10, a) có lỗi hay không?'}
              </p>
            </div>

            <div>
              <button
                onClick={() => setQ2Revealed(!q2Revealed)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all w-fit cursor-pointer"
              >
                <span>{q2Revealed ? (isEn ? 'Hide Answer' : 'Ẩn câu trả lời') : (isEn ? 'Reveal SGK Answer' : 'Xem câu trả lời chuẩn SGK')}</span>
              </button>

              {q2Revealed && (
                <div className="mt-2.5 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 space-y-1 animate-in fade-in leading-relaxed">
                  <div className="font-bold text-amber-300">
                    {isEn ? 'It depends on variable a:' : 'Phụ thuộc vào biến a:'}
                  </div>
                  <p>
                    {isEn
                      ? '• The call f(10, a) supplies exactly 2 arguments corresponding to 2 parameters x, y, so argument count is correct.'
                      : '• Lời gọi f(10, a) có đúng 2 đối số tương ứng với 2 tham số x, y nên đúng về số lượng.'}
                  </p>
                  <p>
                    {isEn
                      ? '• If variable a was assigned earlier (e.g. a = 5), the function evaluates 10 + 2*5 = 20 with no error.'
                      : '• Nếu biến a đã được gán giá trị trước đó trong chương trình (ví dụ a = 5), thì hàm tính 10 + 2*5 = 20 hoàn toàn hợp lệ và không có lỗi.'}
                  </p>
                  <p className="text-rose-300 font-mono text-[11px]">
                    {isEn
                      ? '• If variable a has never been assigned a value, Python raises NameError: name \'a\' is not defined.'
                      : '• Nếu biến a chưa từng được gán giá trị, Python sẽ báo lỗi: NameError: name \'a\' is not defined.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
