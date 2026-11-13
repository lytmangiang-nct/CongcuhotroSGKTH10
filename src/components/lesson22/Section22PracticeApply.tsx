import React, { useState, useEffect } from 'react';
import { useBook } from '../../context/BookContext';
import {
  BookOpen,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  Calculator,
  TrendingUp,
  TrendingDown,
  Trash2,
  Plus
} from 'lucide-react';

export const Section22PracticeApply: React.FC = () => {
  const {
    setOriginalPageTarget,
    setShowOriginalModal,
    bilingualMode,
    navigateToQuiz,
    completeSectionTasks
  } = useBook();

  const isEn = bilingualMode === 'en';

  // Mark task completion for section 5 (index 4) on load
  useEffect(() => {
    completeSectionTasks(22, 4);
  }, [completeSectionTasks]);

  // Luyện tập 1: Xoá phần tử cuối cùng bằng del
  const [lt1List, setLt1List] = useState<number[]>([12, 34, 56, 78, 90]);
  const [lt1LastRemoved, setLt1LastRemoved] = useState<number | null>(null);

  // Luyện tập 2: Thêm vào đầu bằng phép ghép +
  const [lt2List, setLt2List] = useState<number[]>([10, 20, 30]);
  const [prependInput, setPrependInput] = useState<number>(999);

  // Vận dụng: Tìm max và min cùng chỉ số
  const [vdNumbers, setVdNumbers] = useState<number[]>([45, 12, 89, 34, 95, 23, 78, 95, 6]);
  const [vdCustomStr, setVdCustomStr] = useState<string>('45, 12, 89, 34, 95, 23, 78, 95, 6');
  const [vdResult, setVdResult] = useState<{
    maxVal: number;
    maxIdx: number;
    minVal: number;
    minIdx: number;
  } | null>(null);

  // Handler LT1: del A[len(A) - 1]
  const handleDelLast = () => {
    if (lt1List.length === 0) return;
    const last = lt1List[lt1List.length - 1];
    setLt1LastRemoved(last);
    setLt1List(prev => prev.slice(0, prev.length - 1));
    completeSectionTasks(22, 4);
  };

  // Handler LT2: A = [x] + A
  const handlePrepend = () => {
    setLt2List(prev => [prependInput, ...prev]);
    completeSectionTasks(22, 4);
  };

  // Handler Vận dụng: Find Max and Min
  const handleRunVd = () => {
    const arr = vdCustomStr
      .split(',')
      .map(s => Number(s.trim()))
      .filter(n => !isNaN(n));

    if (arr.length === 0) return;
    setVdNumbers(arr);

    let maxVal = arr[0];
    let maxIdx = 0;
    let minVal = arr[0];
    let minIdx = 0;

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > maxVal) {
        maxVal = arr[i];
        maxIdx = i;
      }
      if (arr[i] < minVal) {
        minVal = arr[i];
        minIdx = i;
      }
    }

    setVdResult({ maxVal, maxIdx, minVal, minIdx });
    completeSectionTasks(22, 4);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SGK Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-200 text-sm font-semibold tracking-wide uppercase mb-1">
            <Calculator className="w-4 h-4" />
            <span>
              {isEn
                ? 'Practice & Application • Informatics 10 KNTT — Page 114'
                : 'Luyện tập & Vận dụng • SGK Tin học 10 Kết nối tri thức — Trang 114'}
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {isEn
              ? 'PRACTICE & APPLICATION: PYTHON LISTS'
              : 'LUYỆN TẬP & VẬN DỤNG KIỂU DANH SÁCH'}
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            {isEn
              ? 'Consolidate list manipulation: del at last index, prepending with [+], algorithm for finding max/min elements & indices, and certification quiz.'
              : 'Thành thạo xoá phần tử cuối cùng, thêm vào đầu danh sách bằng phép ghép, thuật toán kinh điển tìm max/min kèm chỉ số và bài trắc nghiệm.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(114);
            setShowOriginalModal(true);
          }}
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/20 transition-all backdrop-blur-sm shadow cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4 text-blue-300" />
          <span>{isEn ? 'View Textbook Page 114' : 'Xem trang 114 gốc'}</span>
        </button>
      </div>

      {/* Luyện tập 1 & Luyện tập 2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Luyện tập 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-xs">
                1
              </span>
              <span>{isEn ? 'Practice 1 (Textbook Page 114)' : 'Luyện tập 1 (SGK Trang 114)'}</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              {isEn
                ? 'Delete the last element of a list using del statement'
                : 'Xoá phần tử cuối cùng của danh sách bằng lệnh del'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {isEn ? (
                <>Since the list length is <code className="font-mono">len(A)</code>, the index of the final element is <code className="font-mono font-bold text-cyan-600">len(A) - 1</code>.</>
              ) : (
                <>Vì danh sách có độ dài là <code className="font-mono">len(A)</code> nên chỉ số của phần tử cuối cùng chính là <code className="font-mono font-bold text-cyan-600">len(A) - 1</code>.</>
              )}
            </p>

            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 mb-4">
              <div className="text-slate-500 mb-1"># {isEn ? 'Standard textbook statement:' : 'Câu lệnh chuẩn SGK:'}</div>
              <div className="text-cyan-300 font-bold">del A[len(A) - 1]</div>
              <div className="text-slate-500 text-[11px] mt-1"># {isEn ? 'In standard Python, del A[-1] is also valid' : 'Trong Python mở rộng cũng có thể dùng: del A[-1]'}</div>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs space-y-1 mb-3">
              <div className="font-medium text-slate-700 dark:text-slate-300">
                {isEn ? 'List state A:' : 'Trạng thái danh sách A:'} <span className="font-mono font-bold text-cyan-600">[{lt1List.join(', ')}]</span>
              </div>
              <div className="text-slate-500 text-[11px]">
                {isEn ? 'Current length:' : 'Độ dài hiện tại:'} <span className="font-mono font-bold">{lt1List.length}</span> | {isEn ? 'Last index:' : 'Chỉ số cuối:'} <span className="font-mono font-bold">{lt1List.length > 0 ? lt1List.length - 1 : (isEn ? 'None' : 'Không có')}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDelLast}
                disabled={lt1List.length === 0}
                className="flex-1 flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-semibold text-xs py-2 rounded-xl shadow transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isEn ? 'Execute: del A[len(A) - 1]' : 'Thực hiện: del A[len(A) - 1]'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLt1List([12, 34, 56, 78, 90]);
                  setLt1LastRemoved(null);
                }}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer"
              >
                {isEn ? 'Reset' : 'Đặt lại'}
              </button>
            </div>

            {lt1LastRemoved !== null && (
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300">
                {isEn ? (
                  <>Deleted last element: <strong>{lt1LastRemoved}</strong>. List size automatically decreased.</>
                ) : (
                  <>Đã xoá phần tử cuối cùng: <strong>{lt1LastRemoved}</strong>. Danh sách tự động thu gọn độ dài.</>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Luyện tập 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs">
                2
              </span>
              <span>{isEn ? 'Practice 2 (Textbook Page 114)' : 'Luyện tập 2 (SGK Trang 114)'}</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              {isEn ? 'Prepend an element to the front of a list' : 'Thêm một phần tử vào đầu danh sách'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              <strong>{isEn ? 'Solution:' : 'Trả lời:'}</strong>{' '}
              {isEn
                ? 'Can be accomplished easily by concatenating lists with the addition operator (+):'
                : 'Hoàn toàn có thể thực hiện được bằng phép toán ghép hai danh sách (dấu cộng +):'}
            </p>

            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 mb-4">
              <div className="text-slate-500 mb-1"># {isEn ? 'Textbook standard syntax:' : 'Cách thực hiện chuẩn SGK:'}</div>
              <div className="text-indigo-300 font-bold">A = [&lt;{isEn ? 'element' : 'phần tử'}&gt;] + A</div>
              <div className="text-slate-500 text-[11px] mt-1"># {isEn ? 'Example: A = [100] + A' : 'Ví dụ: A = [100] + A'}</div>
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs space-y-1 mb-3">
              <div className="font-medium text-slate-700 dark:text-slate-300">
                {isEn ? 'Current list:' : 'Danh sách hiện tại:'} <span className="font-mono font-bold text-indigo-600">[{lt2List.join(', ')}]</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={prependInput}
                onChange={e => setPrependInput(Number(e.target.value))}
                className="w-24 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-mono"
              />
              <button
                type="button"
                onClick={handlePrepend}
                className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2 rounded-xl shadow transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isEn ? `Prepend: A = [${prependInput}] + A` : `Thực hiện: A = [${prependInput}] + A`}</span>
              </button>
              <button
                type="button"
                onClick={() => setLt2List([10, 20, 30])}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer"
              >
                {isEn ? 'Reset' : 'Đặt lại'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vận dụng: Thuật toán tìm Max, Min và vị trí chỉ số */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center text-sm">
              VD
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                {isEn
                  ? 'Application (Page 114): Find value and indices of maximum / minimum elements'
                  : 'Vận dụng (SGK Trang 114): Tìm giá trị và chỉ số của phần tử lớn nhất / nhỏ nhất'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn
                  ? 'Initialize max_val = A[0], max_idx = 0 and traverse from index 1 to len(A) - 1'
                  : 'Khởi tạo biến max_val = A[0], max_idx = 0 và duyệt từ chỉ số 1 đến len(A) - 1'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRunVd}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>{isEn ? 'Run Max/Min Algorithm' : 'Chạy thuật toán Max/Min'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div className="text-slate-500 mb-1"># {isEn ? 'Algorithm to find max element and its index:' : 'Thuật toán tìm phần tử lớn nhất và chỉ số:'}</div>
              <div>max_val = A[0]</div>
              <div>max_idx = 0</div>
              <div className="text-cyan-400 font-bold">for i in range(1, len(A)):</div>
              <div className="pl-4 text-amber-300">if A[i] &gt; max_val:</div>
              <div className="pl-8 text-emerald-400">max_val = A[i]</div>
              <div className="pl-8 text-emerald-400">max_idx = i</div>
              <div className="text-yellow-300 mt-1">
                print("{isEn ? 'Max value:' : 'Giá trị lớn nhất:'}", max_val, "{isEn ? 'at index:' : 'ở chỉ số:'}", max_idx)
              </div>
            </div>

            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs space-y-2">
              <div className="font-semibold text-amber-900 dark:text-amber-200">
                {isEn ? 'Customize test sequence A:' : 'Tuỳ chỉnh dãy số A kiểm thử:'}
              </div>
              <input
                type="text"
                value={vdCustomStr}
                onChange={e => setVdCustomStr(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 rounded-lg px-3 py-1.5 font-mono text-xs"
              />
              <div className="text-slate-500 text-[11px]">
                {isEn ? 'Enter comma-separated integers.' : 'Nhập các số nguyên cách nhau bởi dấu phẩy.'}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-medium">
              {isEn ? 'Sequence analysis results:' : 'Kết quả phân tích dãy số:'}
            </div>

            {vdResult ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Max card */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                  <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{isEn ? 'Maximum (Max)' : 'Phần tử lớn nhất (Max)'}</span>
                    </span>
                    <span className="font-mono text-lg">{vdResult.maxVal}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {isEn ? 'Index position:' : 'Vị trí chỉ số:'} <strong className="font-mono text-emerald-600">A[{vdResult.maxIdx}]</strong>
                  </div>
                </div>

                {/* Min card */}
                <div className="p-4 bg-cyan-50 dark:bg-cyan-950/30 rounded-2xl border border-cyan-200 dark:border-cyan-800/60 space-y-2">
                  <div className="flex items-center justify-between text-cyan-800 dark:text-cyan-300 font-bold text-xs">
                    <span className="flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      <span>{isEn ? 'Minimum (Min)' : 'Phần tử nhỏ nhất (Min)'}</span>
                    </span>
                    <span className="font-mono text-lg">{vdResult.minVal}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    {isEn ? 'Index position:' : 'Vị trí chỉ số:'} <strong className="font-mono text-cyan-600">A[{vdResult.minIdx}]</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center text-slate-600 text-xs italic">
                {isEn
                  ? 'Click "Run Max/Min Algorithm" to traverse array and determine extreme values...'
                  : 'Nhấn "Chạy thuật toán Max/Min" để duyệt mảng và xác định giá trị cực trị...'}
              </div>
            )}

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>{isEn ? 'Algorithmic Principle:' : 'Nguyên lý thuật toán:'}</strong>{' '}
              {isEn
                ? 'Begin by assuming the first element A[0] is the extreme value. Then compare sequentially from index 1 to the end; whenever a larger (or smaller) element is encountered, update both the value and index position.'
                : 'Bắt đầu giả định phần tử đầu tiên A[0] là cực trị. Sau đó so sánh lần lượt từ vị trí 1 đến cuối; nếu gặp phần tử lớn hơn (hoặc nhỏ hơn) thì cập nhật đồng thời cả giá trị và vị trí chỉ số.'}
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ GUIDANCE CARD: Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border-2 border-indigo-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {isEn
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài 22 (10 Câu)'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz and earn your verified Certificate for Lesson 22, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành Bài 22, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={navigateToQuiz}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>{isEn ? 'Open Quiz on Nav Bar →' : 'Mở Trắc Nghiệm Trên Thanh Điều Hướng →'}</span>
        </button>
      </div>
    </div>
  );
};
