import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  BookOpen,
  ListOrdered,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  CheckCircle,
  Boxes,
  Code,
  ArrowRight,
  TrendingUp,
  Hash
} from 'lucide-react';

export const Section22TraversalMethods: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // State for Example 2: Slice range traversal
  const [sliceStart, setSliceStart] = useState<number>(2);
  const [sliceEnd, setSliceEnd] = useState<number>(5);
  const [ex2List] = useState<number[]>([3, 2, 1, 5, 6, 10, 7, 12, 18]);

  // State for Method Append Demonstration
  const [methodList, setMethodList] = useState<number[]>([2, 4, 10, 1, 0]);
  const [appendInput, setAppendInput] = useState<number>(100);
  const [methodHistory, setMethodHistory] = useState<{ vi: string; en: string }[]>([
    { vi: 'A = [2, 4, 10, 1, 0]', en: 'A = [2, 4, 10, 1, 0]' }
  ]);

  // State for Củng cố 2 (in số chẵn)
  const [testNumbers, setTestNumbers] = useState<string>('12, 7, 8, 15, 20, 3, 44');
  const [evenResult, setEvenResult] = useState<number[]>([]);

  // Compute slice output
  const computedSlice = ex2List.slice(sliceStart, sliceEnd);

  // Append method handler
  const handleRunAppend = () => {
    const updated = [...methodList, appendInput];
    setMethodList(updated);
    setMethodHistory(prev => [
      ...prev,
      {
        vi: `A.append(${appendInput}) -> [${updated.join(', ')}] (độ dài len = ${updated.length})`,
        en: `A.append(${appendInput}) -> [${updated.join(', ')}] (length len = ${updated.length})`
      }
    ]);
  };

  // Del index 1 handler (as in SGK Trang 113)
  const handleDelIndex1 = () => {
    if (methodList.length <= 1) return;
    const removedVal = methodList[1];
    const updated = methodList.filter((_, idx) => idx !== 1);
    setMethodList(updated);
    setMethodHistory(prev => [
      ...prev,
      {
        vi: `del A[1] (xoá ${removedVal}) -> [${updated.join(', ')}] (độ dài len = ${updated.length})`,
        en: `del A[1] (removed ${removedVal}) -> [${updated.join(', ')}] (length len = ${updated.length})`
      }
    ]);
  };

  // Reset method demo
  const handleResetMethod = () => {
    setMethodList([2, 4, 10, 1, 0]);
    setMethodHistory([
      { vi: 'Khôi phục: A = [2, 4, 10, 1, 0]', en: 'Restored: A = [2, 4, 10, 1, 0]' }
    ]);
  };

  // Run filter even numbers
  const handleFilterEven = () => {
    const nums = testNumbers
      .split(',')
      .map(s => Number(s.trim()))
      .filter(n => !isNaN(n));
    const evens = nums.filter(n => n % 2 === 0);
    setEvenResult(evens);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SGK Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-200 text-sm font-semibold tracking-wide uppercase mb-1">
            <ListOrdered className="w-4 h-4" />
            <span>
              {isEn
                ? 'Sections 2 & 3 • Informatics 10 KNTT — Pages 112 & 113'
                : 'Mục 2 & Mục 3 • SGK Tin học 10 Kết nối tri thức — Trang 112 & 113'}
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {isEn
              ? '2. LIST TRAVERSAL & 3. APPEND() METHOD'
              : '2. DUYỆT DANH SÁCH & 3. PHƯƠNG THỨC APPEND()'}
          </h2>
          <p className="text-indigo-100 text-sm mt-1">
            {isEn
              ? 'Iterating list elements with for i in range(len(A)), iterate over an index range, and appending elements via <list>.append().'
              : 'Kỹ thuật duyệt danh sách bằng for và range(len(A)), duyệt từng phần của danh sách, khái niệm phương thức và lệnh append().'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(113);
            setShowOriginalModal(true);
          }}
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/20 transition-all backdrop-blur-sm shadow cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4 text-indigo-300" />
          <span>{isEn ? 'View Textbook Pages 112 – 113' : 'Xem trang 112 - 113 gốc'}</span>
        </button>
      </div>

      {/* Mục 2: Duyệt các phần tử của danh sách */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">
            2
          </span>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">
              {isEn ? '2. ITERATING OVER LIST ELEMENTS' : '2. DUYỆT CÁC PHẦN TỬ CỦA DANH SÁCH'}
            </h3>
            <p className="text-xs text-slate-500">
              {isEn
                ? 'Textbook Pages 112 – 113: Activity 2, Example 1 & Example 2 iterating with range()'
                : 'SGK Trang 112 – 113: Hoạt động 2, Ví dụ 1 & Ví dụ 2 duyệt kết hợp hàm range()'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ví dụ 1 */}
          <div className="space-y-3">
            <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">
              {isEn ? 'Example 1: Iterate and print the entire list' : 'Ví dụ 1: Duyệt và in toàn bộ danh sách'}
            </div>
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div>&gt;&gt;&gt; A = [1, 2, 3, 4, 5]</div>
              <div className="text-indigo-400 font-bold">&gt;&gt;&gt; for i in range(len(A)):</div>
              <div className="pl-8 text-yellow-300">print(A[i], end = " ")</div>
              <div className="text-emerald-400 mt-1">1 2 3 4 5</div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn ? (
                <>The index variable <code className="font-mono font-bold">i</code> runs through indices from <code className="font-mono">0</code> to <code className="font-mono">len(A) - 1</code>. In each iteration, element <code className="font-mono">A[i]</code> is accessed and printed.</>
              ) : (
                <>Biến chỉ số <code className="font-mono font-bold">i</code> chạy trên vùng chỉ số từ <code className="font-mono">0</code> đến <code className="font-mono">len(A) - 1</code>. Ở mỗi vòng lặp, phần tử <code className="font-mono">A[i]</code> được truy cập và in ra màn hình.</>
              )}
            </p>
          </div>

          {/* Ví dụ 2: Duyệt một phần */}
          <div className="space-y-3">
            <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">
              {isEn
                ? 'Example 2: Iterate over an index range with range(start, stop)'
                : 'Ví dụ 2: Duyệt và in một phần danh sách với range(start, stop)'}
            </div>
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div>&gt;&gt;&gt; A = [3, 2, 1, 5, 6, 10, 7, 12, 18]</div>
              <div className="text-indigo-400 font-bold">
                &gt;&gt;&gt; for i in range({sliceStart}, {sliceEnd}):
              </div>
              <div className="pl-8 text-yellow-300">print(A[i], end = " ")</div>
              <div className="text-emerald-400 mt-1">{computedSlice.join(' ')}</div>
            </div>

            {/* Slider controls for start, stop */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span>{isEn ? 'Customize index bounds (iterate over an index range):' : 'Tuỳ chỉnh khoảng chỉ số:'}</span>
                <span className="font-mono font-bold text-indigo-600">
                  range({sliceStart}, {sliceEnd})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-slate-500">start: {sliceStart}</span>
                <input
                  type="range"
                  min="0"
                  max={sliceEnd - 1}
                  value={sliceStart}
                  onChange={e => setSliceStart(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 text-slate-500">stop: {sliceEnd}</span>
                <input
                  type="range"
                  min={sliceStart + 1}
                  max={ex2List.length}
                  value={sliceEnd}
                  onChange={e => setSliceEnd(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hộp Ghi nhớ 2 (Trang 113) */}
        <div className="border-2 border-dashed border-indigo-400 dark:border-indigo-600/60 bg-indigo-50/70 dark:bg-indigo-950/20 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm mb-1">
            <BookOpen className="w-4 h-4" />
            <BilingualText
              vi="Ghi nhớ 2 (SGK Trang 113)"
              en="Key Takeaway 2 (Textbook Page 113)"
            />
          </div>
          <div className="text-indigo-950 dark:text-indigo-100 text-sm md:text-base font-medium">
            <BilingualText
              vi="Có thể duyệt lần lượt các phần tử của danh sách bằng lệnh for kết hợp với vùng giá trị của lệnh range()."
              en="List elements can be iterated through in sequence using a for loop combined with the sequence generated by range(), or iterate over an index range to inspect specific slices."
            />
          </div>
        </div>

        {/* Câu hỏi củng cố Mục 2 */}
        <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="font-bold text-xs text-indigo-600 uppercase tracking-wide">
            <BilingualText
              vi="Câu hỏi củng cố Mục 2 (SGK Trang 113)"
              en="Checkpoint Questions for Section 2 (Page 113)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {isEn ? '1a) Algorithm to sum positive numbers in A:' : '1a) Thuật toán Tính tổng các số dương trong A:'}
              </div>
              <pre className="p-2.5 bg-slate-950 text-emerald-400 rounded-lg font-mono text-[11px]">
{`S = 0
for i in range(len(A)):
    if A[i] > 0:
        S = S + A[i]
print(S)`}
              </pre>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                {isEn ? '1b) Algorithm to count positive numbers in A:' : '1b) Thuật toán Đếm số lượng các số dương trong A:'}
              </div>
              <pre className="p-2.5 bg-slate-950 text-emerald-400 rounded-lg font-mono text-[11px]">
{`C = 0
for i in range(len(A)):
    if A[i] > 0:
        C = C + 1
print(C)`}
              </pre>
            </div>
          </div>

          {/* Interactive tester for Củng cố 2 */}
          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              {isEn ? '2. Program to output even numbers in list A:' : '2. Viết chương trình in ra các số chẵn của dãy A:'}
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={testNumbers}
                onChange={e => setTestNumbers(e.target.value)}
                placeholder={isEn ? 'Enter comma-separated integers' : 'Nhập dãy số cách nhau bởi dấu phẩy'}
                className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 font-mono text-xs"
              />
              <button
                type="button"
                onClick={handleFilterEven}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                {isEn ? 'Print Even Numbers' : 'In các số chẵn'}
              </button>
            </div>
            {evenResult.length > 0 && (
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-mono">
                {isEn ? 'Even numbers (A[i] % 2 == 0):' : 'Các số chẵn (A[i] % 2 == 0):'} <strong>{evenResult.join(' ')}</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mục 3: Thêm phần tử vào danh sách (Phương thức append) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 font-bold flex items-center justify-center text-sm">
            3
          </span>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">
              {isEn ? '3. APPENDING ELEMENTS (APPEND METHOD)' : '3. THÊM PHẦN TỬ VÀO DANH SÁCH (PHƯƠNG THỨC APPEND)'}
            </h3>
            <p className="text-xs text-slate-500">
              {isEn
                ? 'Textbook Page 113: The concept of methods and syntax <list>.append()'
                : 'SGK Trang 113: Khái niệm phương thức (method) và cú pháp <danh sách>.append()'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-pink-50/70 dark:bg-pink-950/30 rounded-xl border border-pink-200 dark:border-pink-900/50 text-xs space-y-2 text-pink-950 dark:text-pink-200">
              <div className="font-bold flex items-center gap-1.5 text-pink-700 dark:text-pink-300">
                <Sparkles className="w-4 h-4" />
                <span>{isEn ? 'The Concept of Method in Python:' : 'Khái niệm Phương thức (Method) trong Python:'}</span>
              </div>
              <p>
                {isEn
                  ? 'Python provides special commands designed specifically for the list data structure. These commands are called list methods.'
                  : 'Python có những lệnh đặc biệt được thiết kế dành riêng cho kiểu dữ liệu danh sách. Các lệnh này được gọi là phương thức (method) của danh sách.'}
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg font-mono font-bold text-pink-600 dark:text-pink-400 text-center text-xs border border-pink-200 dark:border-pink-800">
                &lt;{isEn ? 'list_name' : 'tên danh sách'}&gt;.&lt;{isEn ? 'method' : 'phương thức'}&gt;()
              </div>
              <p>
                {isEn ? (
                  <>The method to append an element to the tail of a list is <code className="font-mono font-bold">append()</code>.</>
                ) : (
                  <>Phương thức thêm một phần tử vào vị trí cuối cùng của danh sách là <code className="font-mono font-bold">append()</code>.</>
                )}
              </p>
            </div>

            {/* Ghi nhớ 3 Box */}
            <div className="border-2 border-dashed border-pink-400 dark:border-pink-600/60 bg-pink-50/70 dark:bg-pink-950/20 rounded-2xl p-4">
              <div className="font-bold text-xs text-pink-700 dark:text-pink-300 uppercase mb-2">
                <BilingualText
                  vi="Ghi nhớ 3 (SGK Trang 113)"
                  en="Key Takeaway 3 (Textbook Page 113)"
                />
              </div>
              <ul className="text-xs text-pink-950 dark:text-pink-100 space-y-1.5">
                <li>
                  <BilingualText
                    vi="• Cú pháp các phương thức: <danh sách>.<phương thức>()"
                    en="• Method invocation syntax: <list>.<method>()"
                  />
                </li>
                <li>
                  <BilingualText
                    vi="• Lệnh thêm phần tử vào cuối danh sách là: <danh sách>.append()"
                    en="• Statement appending an element to the end of a list: <list>.append()"
                  />
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Method Simulator */}
          <div className="space-y-3">
            <div className="font-semibold text-xs text-slate-700 dark:text-slate-300 flex items-center justify-between">
              <span>{isEn ? 'Textbook Page 113 Simulator: append(100) & del A[1]' : 'Mô phỏng bài toán SGK Trang 113: append(100) & del A[1]'}</span>
              <span className="font-mono text-pink-600 font-bold">len(A) = {methodList.length}</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-cyan-400">
                A = [{methodList.map((n, i) => `${n}${i === 1 ? (isEn ? ' (index 1)' : ' (chỉ số 1)') : ''}`).join(', ')}]
              </div>
              <div className="pt-2 flex items-center gap-2 flex-wrap">
                <input
                  type="number"
                  value={appendInput}
                  onChange={e => setAppendInput(Number(e.target.value))}
                  className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-emerald-400 font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={handleRunAppend}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-3 py-1 rounded-lg text-xs flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>A.append({appendInput})</span>
                </button>
                <button
                  type="button"
                  onClick={handleDelIndex1}
                  disabled={methodList.length <= 1}
                  className="bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 font-semibold px-3 py-1 rounded-lg text-xs transition-all disabled:opacity-40 cursor-pointer"
                >
                  del A[1]
                </button>
                <button
                  type="button"
                  onClick={handleResetMethod}
                  className="text-slate-400 hover:text-white px-2 py-1 text-xs cursor-pointer"
                >
                  {isEn ? 'Reset' : 'Đặt lại'}
                </button>
              </div>
            </div>

            {/* History log */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] space-y-1 font-mono max-h-28 overflow-y-auto">
              <div className="text-slate-500 font-bold">{isEn ? 'Execution log:' : 'Lịch sử thực thi lệnh:'}</div>
              {methodHistory.map((item, idx) => (
                <div key={idx} className="text-slate-700 dark:text-slate-300">
                  {isEn ? item.en : item.vi}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
