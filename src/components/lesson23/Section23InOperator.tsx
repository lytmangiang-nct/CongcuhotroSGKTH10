import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Terminal,
  Play
} from 'lucide-react';

export const Section23InOperator: React.FC = () => {
  const { bilingualMode, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive Live Sandbox for `in` operator
  const [sampleListStr, setSampleListStr] = useState<string>('1, 2, 3, 4, 5');
  const [testValueStr, setTestValueStr] = useState<string>('2');
  const [sandboxResult, setSandboxResult] = useState<{
    tested: boolean;
    val: any;
    exists: boolean;
    list: any[];
    code: string;
  }>({
    tested: true,
    val: 2,
    exists: true,
    list: [1, 2, 3, 4, 5],
    code: '>>> A = [1, 2, 3, 4, 5]\n>>> 2 in A\nTrue'
  });

  const handleRunInTest = () => {
    // Parse list items
    const rawItems = sampleListStr.split(',').map(s => s.trim());
    const parsedList = rawItems.map(item => {
      if ((item.startsWith('"') && item.endsWith('"')) || (item.startsWith("'") && item.endsWith("'"))) {
        return item.slice(1, -1);
      }
      if (!isNaN(Number(item)) && item !== '') {
        return Number(item);
      }
      return item;
    });

    let parsedVal: any = testValueStr.trim();
    if ((parsedVal.startsWith('"') && parsedVal.endsWith('"')) || (parsedVal.startsWith("'") && parsedVal.endsWith("'"))) {
      parsedVal = parsedVal.slice(1, -1);
    } else if (!isNaN(Number(parsedVal)) && parsedVal !== '') {
      parsedVal = Number(parsedVal);
    }

    const exists = parsedList.includes(parsedVal);
    const code = `>>> A = [${parsedList.map(v => typeof v === 'string' ? `"${v}"` : String(v)).join(', ')}]\n>>> ${typeof parsedVal === 'string' ? `"${parsedVal}"` : String(parsedVal)} in A\n${exists ? 'True' : 'False'}`;

    setSandboxResult({
      tested: true,
      val: parsedVal,
      exists,
      list: parsedList,
      code
    });
  };

  // Traversal Simulator: `for k in A`
  const [activeKIndex, setActiveKIndex] = useState<number>(0);
  const [traversalOutput, setTraversalOutput] = useState<number[]>([10]);
  const traversalArray = [10, 11, 12, 13, 14, 15];

  const handleStepTraversal = () => {
    setActiveKIndex(prev => {
      const next = (prev + 1) % traversalArray.length;
      if (next === 0) {
        setTraversalOutput([traversalArray[0]]);
      } else {
        setTraversalOutput(traversalArray.slice(0, next + 1));
      }
      return next;
    });
  };

  // Củng cố Interactive states
  const [q1aAnswer, setQ1aAnswer] = useState<'True' | 'False' | null>(null);
  const [q1bAnswer, setQ1bAnswer] = useState<'True' | 'False' | null>(null);
  const [showQ2Explanation, setShowQ2Explanation] = useState<boolean>(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-linear-to-r from-teal-900/30 via-slate-900 to-slate-900 border border-teal-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 font-mono">
              {isEn ? 'SECTION 1 • PAGES 115 – 116 SGK' : 'MỤC 1 • TRANG 115 – 116 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            <BilingualText
              vi="1. Duyệt Danh Sách Với Toán Tử in"
              en="1. List Traversal and Membership Testing with the 'in' Operator"
            />
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            <BilingualText
              vi="Toán tử kiểm tra thành viên in và cơ chế duyệt trực tiếp giá trị for k in A:"
              en="Membership test operator 'in' and direct value iteration with 'for k in A:'"
            />
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(115);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shrink-0 cursor-pointer self-start sm:self-center"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isEn ? 'Compare Textbook Page 115' : 'Đối chiếu SGK Trang 115'}</span>
        </button>
      </div>

      {/* Hoạt động 1: Sử dụng toán tử in với danh sách (Trang 115) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
            HĐ1
          </div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
            <BilingualText
              vi="Hoạt động 1: Sử dụng toán tử in với danh sách"
              en="Activity 1: Using the 'in' Operator with Lists"
            />
          </h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <BilingualText
            vi="Quan sát ví dụ sau để biết cách dùng toán tử in để duyệt và kiểm tra một danh sách."
            en="Observe the following examples to understand how to use the 'in' operator to test and traverse lists."
          />
        </p>

        {/* Ví dụ 1: Kiểm tra phần tử */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono space-y-2">
            <div className="text-slate-400 text-[11px] font-sans font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-teal-400" />
              <span>{isEn ? 'Example 1 (Textbook Page 115): Python Interactive Shell' : 'Ví dụ 1 (SGK Trang 115): Chế độ gõ lệnh IDLE'}</span>
            </div>
            <div className="text-emerald-400">&gt;&gt;&gt; A = [1, 2, 3, 4, 5]</div>
            <div className="text-slate-200">&gt;&gt;&gt; 2 in A</div>
            <div className="text-cyan-400 font-bold">True</div>
            <div className="text-slate-500 text-[11px] italic">
              {isEn ? '# Integer 2 is inside list A, evaluates to True' : '# Số nguyên 2 nằm trong dãy A, kết quả trả lại True'}
            </div>
            <div className="text-slate-200">&gt;&gt;&gt; 10 in A</div>
            <div className="text-rose-400 font-bold">False</div>
            <div className="text-slate-500 text-[11px] italic">
              {isEn ? '# Number 10 is not in list A, evaluates to False' : '# Số 10 không nằm trong dãy A, kết quả trả lại False'}
            </div>
          </div>

          <div className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-2xl border border-teal-200 dark:border-teal-800/40 text-xs space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="font-bold text-teal-900 dark:text-teal-300 text-sm">
                <BilingualText
                  vi="Cú pháp lệnh kiểm tra phần tử:"
                  en="Membership Test Syntax:"
                />
              </div>
              <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-teal-300 dark:border-teal-800 font-mono text-center font-bold text-teal-600 dark:text-teal-300 mt-2">
                {isEn ? '<value> in <list>' : '<giá trị> in <danh sách>'}
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                <BilingualText
                  vi="Toán tử in trả về giá trị lôgic True nếu giá trị cần tìm xuất hiện ít nhất một lần trong danh sách, ngược lại trả về False."
                  en="The 'in' operator evaluates to True if the tested value appears at least once in the list; otherwise it returns False."
                />
              </p>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="* Lưu ý kiểu dữ liệu: Số nguyên 1 khác hoàn toàn xâu kí tự '1'."
                en="* Data type note: Integer 1 is completely distinct from string '1'."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox: Trình Thử Toán Tử in */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-white text-base">
              <BilingualText
                vi="Phòng Thí Nghiệm Tương Tác: Thử Nghiệm Toán Tử in"
                en="Interactive Lab: Testing the 'in' Operator"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {isEn ? 'Instant verification on custom list data' : 'Kiểm tra tức thì trên dữ liệu thực tế'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3">
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1">
                {isEn ? 'List A (comma-separated):' : 'Danh sách A (ngăn cách bằng dấu phẩy):'}
              </label>
              <input
                type="text"
                value={sampleListStr}
                onChange={e => setSampleListStr(e.target.value)}
                placeholder={isEn ? 'Example: 1, 2, 3, 4, 5 or "0", "1", "01"' : 'Ví dụ: 1, 2, 3, 4, 5 hoặc "0", "1", "01"'}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  {isEn ? 'Tested value (x in A):' : 'Giá trị cần kiểm tra (x in A):'}
                </label>
                <input
                  type="text"
                  value={testValueStr}
                  onChange={e => setTestValueStr(e.target.value)}
                  placeholder={isEn ? 'Example: 2 or "01"' : 'Ví dụ: 2 hoặc "01"'}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="button"
                onClick={handleRunInTest}
                className="mt-5 flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer shadow-lg"
              >
                <Play className="w-4 h-4" />
                <span>{isEn ? 'Run Test' : 'Chạy kiểm tra'}</span>
              </button>
            </div>

            {/* Quick SGK Presets */}
            <div className="flex items-center gap-1.5 pt-1 flex-wrap">
              <span className="text-[11px] text-slate-400">{isEn ? 'SGK Presets:' : 'Mẫu SGK:'}</span>
              <button
                type="button"
                onClick={() => {
                  setSampleListStr('1, 2, 3, 4, 5');
                  setTestValueStr('2');
                }}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
              >
                2 in [1, 2, 3, 4, 5]
              </button>
              <button
                type="button"
                onClick={() => {
                  setSampleListStr('1, 2, 3, 4, 5');
                  setTestValueStr('10');
                }}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
              >
                10 in [1, 2, 3, 4, 5]
              </button>
              <button
                type="button"
                onClick={() => {
                  setSampleListStr('"0", "1", "01", "10"');
                  setTestValueStr('1');
                }}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
              >
                1 in ["0", "1", "01", "10"] ({isEn ? 'Checkpoint 1a' : 'Củng cố 1a'})
              </button>
              <button
                type="button"
                onClick={() => {
                  setSampleListStr('"0", "1", "01", "10"');
                  setTestValueStr('"01"');
                }}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono cursor-pointer"
              >
                "01" in ["0", "1", "01", "10"] ({isEn ? 'Checkpoint 1b' : 'Củng cố 1b'})
              </button>
            </div>
          </div>

          {/* Result terminal box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider mb-2">
                {isEn ? 'Python Execution Output' : 'Kết Quả Thực Thi Python'}
              </div>
              <pre className="font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                {sandboxResult.code}
              </pre>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              {sandboxResult.exists ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{isEn ? 'Result: True (Element exists in list)' : 'Kết quả: True (Phần tử tồn tại trong dãy)'}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>{isEn ? 'Result: False (Element not found in list)' : 'Kết quả: False (Không tìm thấy phần tử)'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ví dụ 2: Duyệt từng phần tử với toán tử in (Trang 115) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
            VD2
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              <BilingualText
                vi="Ví dụ 2: Sử dụng toán tử in để duyệt từng phần tử của danh sách (Trang 115)"
                en="Example 2: Using the 'in' Operator to Iterate Through Elements (Page 115)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Cách duyệt trực tiếp giá trị bằng vòng lặp for k in A:"
                en="Direct value traversal using the loop for k in A:"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs font-mono space-y-2">
            <div className="text-emerald-400">&gt;&gt;&gt; A = [10, 11, 12, 13, 14, 15]</div>
            <div className="text-slate-200">
              &gt;&gt;&gt; for k in A:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(k, end = " ")
            </div>
            <div className="text-amber-400 font-bold pt-1">
              {traversalOutput.join(' ')} {activeKIndex < traversalArray.length - 1 && '…'}
            </div>
            <div className="text-slate-500 text-[11px] italic pt-1 border-t border-slate-800">
              {isEn
                ? `# Variable k directly takes each value: k = ${traversalArray[activeKIndex]} at iteration #${activeKIndex + 1}`
                : `# Biến k nhận trực tiếp từng giá trị: k = ${traversalArray[activeKIndex]} tại vòng lặp thứ ${activeKIndex + 1}`}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {isEn ? 'Step-by-step Traversal Simulation:' : 'Mô phỏng từng bước lặp (Step-by-step):'}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {traversalArray.map((val, idx) => (
                  <div
                    key={val}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                      idx === activeKIndex
                        ? 'bg-indigo-600 text-white scale-110 shadow-md ring-2 ring-indigo-400'
                        : idx < activeKIndex
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {val}
                  </div>
                ))}
              </div>
              <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {isEn ? (
                  <>
                    Currently traversing: <span className="font-mono font-bold text-indigo-500">k = {traversalArray[activeKIndex]}</span>.
                    No need for <code className="font-mono">range(len(A))</code> or index access <code className="font-mono">A[i]</code>.
                  </>
                ) : (
                  <>
                    Đang duyệt phần tử: <span className="font-mono font-bold text-indigo-500">k = {traversalArray[activeKIndex]}</span>.
                    Không cần tính <code className="font-mono">range(len(A))</code> hay truy cập qua chỉ số <code className="font-mono">A[i]</code>.
                  </>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleStepTraversal}
              className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-xl text-xs transition-all cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isEn ? `Next step: k = ${traversalArray[(activeKIndex + 1) % traversalArray.length]}` : `Bước tiếp theo: k = ${traversalArray[(activeKIndex + 1) % traversalArray.length]}`}</span>
            </button>
          </div>
        </div>

        {/* So sánh hai cách duyệt */}
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 text-xs">
          <div className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">
            <BilingualText
              vi="Bảng so sánh 2 cách duyệt danh sách trong Python:"
              en="Comparison: 2 List Iteration Techniques in Python:"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-700 dark:text-slate-300 font-mono">
                {isEn ? 'Method 1: Index-based Iteration (Lesson 22)' : 'Cách 1: Duyệt qua chỉ số (Bài 22)'}
              </div>
              <pre className="font-mono text-teal-600 dark:text-teal-400 mt-1">
                for i in range(len(A)):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;print(A[i])
              </pre>
              <div className="text-[11px] text-slate-500 mt-1">
                {isEn
                  ? '• Used when both the value and index position i are required (e.g., updating A[i], finding min/max with index).'
                  : '• Dùng khi cần cả giá trị và vị trí chỉ số i (như sửa A[i], tìm min/max kèm chỉ số).'}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                {isEn ? 'Method 2: Direct Iteration with in (Lesson 23)' : 'Cách 2: Duyệt trực tiếp bằng in (Bài 23)'}
              </div>
              <pre className="font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                for k in A:<br />
                &nbsp;&nbsp;&nbsp;&nbsp;print(k)
              </pre>
              <div className="text-[11px] text-slate-500 mt-1">
                {isEn
                  ? '• Extremely concise and intuitive: variable k directly holds element values without range().'
                  : '• Cực kỳ ngắn gọn, trực quan, biến k trực tiếp mang giá trị của phần tử, không cần range().'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ 1 (SGK Trang 115) */}
      <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-500/40 space-y-2">
        <div className="flex items-center gap-2 font-black text-amber-950 dark:text-amber-300 text-sm tracking-wide uppercase">
          <BookOpen className="w-4 h-4 text-amber-800 dark:text-amber-400" />
          <BilingualText
            vi="Ghi nhớ 1 (SGK Tin học 10 - Trang 115)"
            en="Key Summary 1 (Textbook Page 115)"
          />
        </div>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed list-disc list-inside">
          <li>
            <BilingualText
              vi="Toán tử in dùng để kiểm tra một phần tử có nằm trong danh sách đã cho không. Kết quả trả lại True (Đúng) hoặc False (Sai): <giá trị> in <danh sách>."
              en="The 'in' operator checks whether an element exists within a given list. It returns True or False: <value> in <list>."
            />
          </li>
          <li>
            <BilingualText
              vi="Có thể duyệt nhanh từng phần tử của danh sách bằng toán tử in và lệnh for mà không cần sử dụng lệnh range()."
              en="You can conveniently iterate over each element of a list using 'for <item> in <list>:' without needing range()."
            />
          </li>
        </ul>
      </div>

      {/* Câu hỏi củng cố (SGK Trang 116) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-500 flex items-center justify-center font-bold text-sm">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              <BilingualText
                vi="Câu hỏi củng cố Mục 1 (SGK Trang 116)"
                en="Checkpoint Questions Section 1 (Textbook Page 116)"
              />
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(116);
              setShowOriginalModal(true);
            }}
            className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isEn ? 'Compare Textbook Page 116' : 'Đối chiếu Trang 116'}</span>
          </button>
        </div>

        {/* Câu 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            <BilingualText
              vi='1. Giả sử A = ["0", "1", "01", "10"]. Các biểu thức sau trả về giá trị đúng hay sai?'
              en='1. Given list A = ["0", "1", "01", "10"]. Do the following expressions evaluate to True or False?'
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* 1a */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                a) 1 in A
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQ1aAnswer('True')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    q1aAnswer === 'True'
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  True
                </button>
                <button
                  type="button"
                  onClick={() => setQ1aAnswer('False')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    q1aAnswer === 'False'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  False
                </button>
              </div>
              {q1aAnswer === 'False' && (
                <div className="text-[11px] text-emerald-500 font-medium">
                  <strong>{isEn ? 'Textbook Explanation:' : 'Giải thích chuẩn SGK:'}</strong>{' '}
                  {isEn
                    ? 'Integer 1 (int) is distinct from string "1" (str). Since list A contains only strings, 1 in A evaluates to False.'
                    : 'Số nguyên 1 (int) khác xâu kí tự "1" (str). Trong A chỉ có các phần tử kiểu xâu nên 1 in A trả về False.'}
                </div>
              )}
            </div>

            {/* 1b */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                b) "01" in A
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQ1bAnswer('True')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    q1bAnswer === 'True'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  True
                </button>
                <button
                  type="button"
                  onClick={() => setQ1bAnswer('False')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    q1bAnswer === 'False'
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  False
                </button>
              </div>
              {q1bAnswer === 'True' && (
                <div className="text-[11px] text-emerald-500 font-medium">
                  <strong>{isEn ? 'Textbook Explanation:' : 'Giải thích chuẩn SGK:'}</strong>{' '}
                  {isEn
                    ? 'String "01" is the third item (index 2) in list A, so the expression evaluates to True.'
                    : 'Xâu kí tự "01" là phần tử thứ ba (chỉ số 2) trong danh sách A nên biểu thức trả về True.'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Câu 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            <BilingualText
              vi="2. Hãy giải thích ý nghĩa từ khoá in trong câu lệnh sau:"
              en="2. Explain the purpose of keyword 'in' in the following statement:"
            />
            <pre className="font-mono text-xs text-indigo-500 dark:text-indigo-400 mt-1">
              for i in range(10):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;các lệnh&gt;
            </pre>
          </div>

          <button
            type="button"
            onClick={() => setShowQ2Explanation(v => !v)}
            className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
          >
            {showQ2Explanation
              ? (isEn ? 'Hide Textbook Explanation' : 'Ẩn lời giải thích SGK')
              : (isEn ? 'Show Detailed Textbook Explanation' : 'Xem lời giải thích chi tiết SGK')}
          </button>

          {showQ2Explanation && (
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>{isEn ? 'Textbook Analysis:' : 'Ý nghĩa chuẩn SGK:'}</strong>{' '}
              {isEn
                ? 'In the loop structure "for i in range(10):", the keyword "in" specifies that iteration variable i successively assumes each value from the integer sequence produced by range(10) (0 through 9), executing the block body for each value.'
                : 'Trong cú pháp vòng lặp for i in range(10):, từ khoá in chỉ định rằng biến điều khiển i sẽ lần lượt nhận từng giá trị nằm trong tập hợp các số sinh ra bởi hàm range(10) (bao gồm các số từ 0 đến 9), và với mỗi giá trị đó, khối lệnh lặp bên trong sẽ được thực thi.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
