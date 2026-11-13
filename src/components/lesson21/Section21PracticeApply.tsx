import React, { useState, useEffect } from 'react';
import { useBook } from '../../context/BookContext';
import {
  BookOpen,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  Calculator,
  Grid,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const Section21PracticeApply: React.FC = () => {
  const {
    setOriginalPageTarget,
    setShowOriginalModal,
    bilingualMode,
    navigateToQuiz,
    completeSectionTasks,
    isAllSectionsComplete
  } = useBook();

  const isEn = bilingualMode === 'en';

  // Mark task completion for section 5 (index 4) on load
  useEffect(() => {
    completeSectionTasks(21, 4);
  }, [completeSectionTasks]);

  // Luyện tập 1: Dãy số 1, 4, 7, 10... tìm phần tử lớn nhất < 100
  const [lt1Start] = useState<number>(1);
  const [lt1Step] = useState<number>(3);
  const [lt1Limit] = useState<number>(100);
  const [lt1Result, setLt1Result] = useState<{ maxVal: number; sequence: number[] } | null>(null);

  // Luyện tập 2: Đếm trong 100 số tự nhiên đầu tiên chia hết cho 5 hoặc chia 3 dư 1
  const [lt2RangeType, setLt2RangeType] = useState<'0_to_99' | '1_to_100'>('1_to_100');
  const [lt2Result, setLt2Result] = useState<{ count: number; matches: number[] } | null>(null);

  // Vận dụng: Ma trận số 10x10 từ 1 đến 100
  const [matrixCols] = useState<number>(10);
  const [matrixMax] = useState<number>(100);
  const [matrixOutput, setMatrixOutput] = useState<string[]>([]);

  // Handler Luyện tập 1
  const handleRunLt1 = () => {
    let k = lt1Start;
    const seq: number[] = [k];
    while (k + lt1Step < lt1Limit) {
      k = k + lt1Step;
      seq.push(k);
    }
    setLt1Result({ maxVal: k, sequence: seq });
    completeSectionTasks(21, 4);
  };

  // Handler Luyện tập 2
  const handleRunLt2 = () => {
    let k = lt2RangeType === '0_to_99' ? 0 : 1;
    const end = lt2RangeType === '0_to_99' ? 99 : 100;
    const matches: number[] = [];

    while (k <= end) {
      if (k % 5 === 0 || k % 3 === 1) {
        matches.push(k);
      }
      k = k + 1;
    }

    setLt2Result({ count: matches.length, matches });
    completeSectionTasks(21, 4);
  };

  // Handler Vận dụng
  const handleRunMatrix = () => {
    let k = 1;
    const rows: string[] = [];
    let currentRow: string[] = [];

    while (k <= matrixMax) {
      currentRow.push(k.toString().padStart(3, ' '));
      if (k % matrixCols === 0 || k === matrixMax) {
        rows.push(currentRow.join(' '));
        currentRow = [];
      }
      k = k + 1;
    }

    setMatrixOutput(rows);
    completeSectionTasks(21, 4);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SGK Header Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-violet-200 text-sm font-semibold tracking-wide uppercase mb-1">
            <Calculator className="w-4 h-4" />
            <span>
              {isEn
                ? 'Practice & Application • Informatics 10 KNTT — Page 110'
                : 'Luyện tập & Vận dụng • SGK Tin học 10 Kết nối tri thức — Trang 110'}
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {isEn
              ? 'PRACTICE & REAL-WORLD APPLICATION: WHILE LOOP'
              : 'LUYỆN TẬP & VẬN DỤNG CÂU LỆNH WHILE'}
          </h2>
          <p className="text-violet-100 text-sm mt-1">
            {isEn
              ? 'Consolidate algorithmic thinking, sequence searching, compound conditional filtering, and 10x10 matrix output.'
              : 'Củng cố tư duy thuật toán, tìm kiếm số hạng, đếm theo điều kiện kết hợp và in ma trận số 10x10.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(110);
            setShowOriginalModal(true);
          }}
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/20 transition-all backdrop-blur-sm shadow cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4 text-violet-300" />
          <span>{isEn ? 'View Textbook Page 110' : 'Xem trang 110 gốc'}</span>
        </button>
      </div>

      {/* Luyện tập 1 & Luyện tập 2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Luyện tập 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-xs">
                1
              </span>
              <span>{isEn ? 'Practice 1 (Textbook Page 110)' : 'Luyện tập 1 (SGK Trang 110)'}</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              {isEn
                ? 'Find the largest term strictly less than 100 in the sequence: 1, 4, 7, 10, ...'
                : 'Tìm phần tử lớn nhất nhỏ hơn 100 của dãy số: 1, 4, 7, 10, ...'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {isEn
                ? 'The sequence starts at 1, increasing by 3 each step (k = k + 3). Write a while loop to find the maximum element that is still strictly less than 100.'
                : 'Dãy số bắt đầu từ 1, mỗi bước tăng 3 đơn vị (k = k + 3). Viết chương trình while để tìm phần tử lớn nhất nhưng vẫn < 100.'}
            </p>

            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 mb-4">
              <div className="text-slate-500 mb-1"># {isEn ? 'Python Algorithm:' : 'Thuật toán Python:'}</div>
              <div>k = {lt1Start}</div>
              <div className="text-purple-400 font-bold">while k + {lt1Step} &lt; {lt1Limit}:</div>
              <div className="pl-4 text-emerald-400">k = k + {lt1Step}</div>
              <div className="text-sky-300 mt-1">print("{isEn ? 'Max element:' : 'Phần tử lớn nhất:'}", k)</div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleRunLt1}
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow transition-all cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>{isEn ? 'Run Algorithm: Find Term' : 'Chạy thuật toán tìm phần tử'}</span>
            </button>

            {lt1Result && (
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800/60 text-xs">
                <div className="flex items-center justify-between text-purple-900 dark:text-purple-200 font-bold mb-1">
                  <span>{isEn ? 'Largest term result:' : 'Kết quả phần tử lớn nhất:'}</span>
                  <span className="text-lg text-purple-600 dark:text-purple-400 font-mono">
                    {lt1Result.maxVal}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px] truncate">
                  {isEn
                    ? `Sequence: ${lt1Result.sequence.slice(-8).join(', ')} (next step 97 + 3 = 100 is not < 100)`
                    : `Dãy số: ${lt1Result.sequence.slice(-8).join(', ')} (bước tiếp theo 97+3 = 100 không còn < 100)`}
                </div>
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
              <span>{isEn ? 'Practice 2 (Textbook Page 110)' : 'Luyện tập 2 (SGK Trang 110)'}</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              {isEn
                ? 'Count natural numbers divisible by 5 or leaving remainder 1 when divided by 3 (within first 100 numbers)'
                : 'Đếm số chia hết cho 5 hoặc chia cho 3 dư 1 trong 100 số tự nhiên đầu tiên'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {isEn
                ? 'Combine boolean conditions using Python\'s logical "or" operator: k % 5 == 0 or k % 3 == 1.'
                : 'Sử dụng biểu thức logic kết hợp toán tử or: k % 5 == 0 or k % 3 == 1.'}
            </p>

            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 mb-4">
              <div className="text-slate-500 mb-1"># {isEn ? 'Python Algorithm:' : 'Thuật toán Python:'}</div>
              <div>dem = 0</div>
              <div>k = {lt2RangeType === '0_to_99' ? '0' : '1'}</div>
              <div className="text-indigo-400 font-bold">while k &lt;= {lt2RangeType === '0_to_99' ? '99' : '100'}:</div>
              <div className="pl-4 text-amber-300">if k % 5 == 0 or k % 3 == 1:</div>
              <div className="pl-8 text-emerald-400">dem = dem + 1</div>
              <div className="pl-4 text-sky-300">k = k + 1</div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-slate-500">{isEn ? 'First 100 range:' : 'Phạm vi 100 số đầu:'}</span>
              <button
                type="button"
                onClick={() => setLt2RangeType('1_to_100')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  lt2RangeType === '1_to_100'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                1 {isEn ? 'to' : 'đến'} 100
              </button>
              <button
                type="button"
                onClick={() => setLt2RangeType('0_to_99')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  lt2RangeType === '0_to_99'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                0 {isEn ? 'to' : 'đến'} 99
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleRunLt2}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow transition-all cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>{isEn ? 'Run Counting Algorithm' : 'Chạy đếm số thoả mãn'}</span>
            </button>

            {lt2Result && (
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800/60 text-xs">
                <div className="flex items-center justify-between text-indigo-900 dark:text-indigo-200 font-bold mb-1">
                  <span>{isEn ? 'Count of matching numbers:' : 'Số lượng phần tử thoả mãn:'}</span>
                  <span className="text-lg text-indigo-600 dark:text-indigo-400 font-mono">
                    {lt2Result.count} {isEn ? 'numbers' : 'số'}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px] truncate">
                  {isEn ? 'Sample matches:' : 'Các số tiêu biểu:'} {lt2Result.matches.slice(0, 10).join(', ')}...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vận dụng: In ma trận 10x10 các số từ 1 đến 100 */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center text-sm">
              VD
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                {isEn
                  ? 'Application: Print numbers from 1 to 100 as a 10x10 matrix (10 rows of 10 numbers)'
                  : 'Vận dụng: In các số tự nhiên từ 1 đến 100 thành ma trận 10 hàng, mỗi hàng 10 số'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn
                  ? 'Textbook Page 110: Row wrapping controlled by modulo 10 (k % 10 == 0)'
                  : 'SGK Trang 110: Điều khiển ngắt dòng bằng điều kiện chia hết cho 10 (k % 10 == 0)'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRunMatrix}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>{isEn ? 'Print 10x10 Matrix' : 'In ma trận 10x10'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div className="text-slate-500 mb-1"># {isEn ? 'Python Source Code (Application):' : 'Mã nguồn Python SGK Vận dụng:'}</div>
              <div>k = 1</div>
              <div className="text-amber-400 font-bold">while k &lt;= 100:</div>
              <div className="pl-4 text-emerald-400">if k % 10 == 0:</div>
              <div className="pl-8 text-yellow-300">print(k)  <span className="text-slate-500"># {isEn ? 'End of row: newline' : 'In số thứ 10 và xuống dòng'}</span></div>
              <div className="pl-4 text-emerald-400">else:</div>
              <div className="pl-8 text-yellow-300">print(k, end = " ")  <span className="text-slate-500"># {isEn ? 'Same row' : 'In cùng hàng'}</span></div>
              <div className="pl-4 text-sky-300">k = k + 1</div>
            </div>

            <div className="bg-amber-50/70 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{isEn ? 'Architectural Algorithm Note:' : 'Nhận xét cấu trúc thuật toán:'}</span>
              </div>
              <p>
                {isEn
                  ? 'This problem harmoniously synthesizes all 3 fundamental control structures: Sequential initialization (k = 1), Iteration (while k <= 100), and Selection (if k % 10 == 0) to structure the tabular matrix!'
                  : 'Đây là bài toán kinh điển phối hợp cả 3 cấu trúc cơ bản: khởi tạo tuần tự k = 1, lặp lại qua vòng while k <= 100, và rẽ nhánh bằng if k % 10 == 0 để định dạng cấu trúc lưới bảng ma trận!'}
              </p>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 font-medium mb-2 flex items-center justify-between">
              <span>{isEn ? 'Matrix Display (Console Output):' : 'Màn hình hiển thị ma trận (Console Output):'}</span>
              <span className="text-amber-600 font-mono font-bold">10 {isEn ? 'rows' : 'hàng'} x 10 {isEn ? 'cols' : 'cột'}</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-amber-300 border border-slate-800 shadow-inner min-h-[180px] max-h-[260px] overflow-y-auto leading-relaxed whitespace-pre">
              {matrixOutput.length > 0 ? (
                matrixOutput.map((row, idx) => (
                  <div key={idx} className="hover:bg-slate-900/80 px-2 py-0.5 rounded transition-colors">
                    {row}
                  </div>
                ))
              ) : (
                <div className="text-slate-600 italic text-center py-10">
                  {isEn ? 'Click "Print 10x10 Matrix" to run loop formatting...' : 'Nhấn "In ma trận 10x10" để chạy vòng lặp định dạng lưới...'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ GUIDANCE CARD:Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border-2 border-indigo-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {isEn
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài 21 (10 Câu)'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz and earn your verified Certificate for Lesson 21, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành Bài 21, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
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
