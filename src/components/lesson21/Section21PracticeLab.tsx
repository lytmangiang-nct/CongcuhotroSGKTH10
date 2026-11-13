import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import {
  Terminal,
  Play,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Code,
  Type
} from 'lucide-react';

export const Section21PracticeLab: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Task 1 State (In 1..100 hàng ngang bằng while)
  const [task1Limit, setTask1Limit] = useState<number>(100);
  const [task1Output, setTask1Output] = useState<string>('');
  const [isTask1Running, setIsTask1Running] = useState<boolean>(false);
  const [task1Count, setTask1Count] = useState<number>(0);

  // Task 2 State (In chữ cái A..Z thành 3 hàng bằng ASCII và chr(k))
  const [charsPerRow] = useState<number>(10);
  const [task2Rows, setTask2Rows] = useState<string[]>([]);
  const [isTask2Running, setIsTask2Running] = useState<boolean>(false);
  const [asciiInspectChar, setAsciiInspectChar] = useState<number | null>(65);

  // Fill in the blank challenge state
  const [fillAnswers, setFillAnswers] = useState({
    b1: '',
    b2: '',
    b3: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean | null>(null);

  // Run Task 1
  const handleRunTask1 = () => {
    setIsTask1Running(true);
    let k = 0;
    const nums: number[] = [];
    while (k < task1Limit) {
      k = k + 1;
      nums.push(k);
    }
    setTask1Output(nums.join(' '));
    setTask1Count(nums.length);
    setTimeout(() => setIsTask1Running(false), 200);
  };

  // Run Task 2 (A..Z with row formatting)
  const handleRunTask2 = () => {
    setIsTask2Running(true);
    let i = 0;
    let k = 65;
    const rows: string[] = [];
    let currentRow: string[] = [];

    while (k <= 90) {
      i = i + 1;
      const charStr = String.fromCharCode(k);
      currentRow.push(charStr);

      if (i % charsPerRow === 0 || k === 90) {
        rows.push(currentRow.join(' '));
        currentRow = [];
      }
      k = k + 1;
    }

    setTask2Rows(rows);
    setTimeout(() => setIsTask2Running(false), 250);
  };

  // Check Fill Challenge
  const handleCheckFill = () => {
    const a1 = fillAnswers.b1.trim();
    const a2 = fillAnswers.b2.trim().replace(/\s+/g, '');
    const a3 = fillAnswers.b3.trim().replace(/\s+/g, '');

    const condOk = a1 === '< 20' || a1 === '<= 19' || a1 === '<20' || a1 === '<=19';
    const endOk = a2.includes('end=" "') || a2.includes("end=' '") || a2.includes('end=""') || a2.includes("end=''") || a2.includes('end');
    const stepOk = a3 === 'k=k+2' || a3 === 'k+=2' || a3 === 'k=2+k';

    setFillChecked(condOk && endOk && stepOk);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SGK Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-200 text-sm font-semibold tracking-wide uppercase mb-1">
            <Terminal className="w-4 h-4" />
            <span>
              {isEn
                ? 'Practice • Informatics 10 KNTT Textbook — Page 110'
                : 'Thực hành • SGK Tin học 10 Kết nối tri thức — Trang 110'}
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {isEn ? 'HANDS-ON WHILE LOOP LABORATORY' : 'THỰC HÀNH LỆNH LẶP WHILE'}
          </h2>
          <p className="text-emerald-100 text-sm mt-1">
            {isEn
              ? 'Computer laboratory: printing natural sequences, ASCII letter transformation with chr(), and row wrapping.'
              : 'Phòng thực hành máy tính: in dãy số tự nhiên, biến đổi ký tự ASCII bằng hàm chr() và điều khiển ngắt dòng.'}
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
          <BookOpen className="w-4 h-4 text-emerald-300" />
          <span>{isEn ? 'View Textbook Page 110' : 'Xem trang 110 gốc'}</span>
        </button>
      </div>

      {/* Nhiệm vụ 1: In 1 đến 100 trên một hàng ngang */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-sm">
              {isEn ? 'T1' : 'NV1'}
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                {isEn
                  ? 'Task 1: Print natural numbers from 1 to 100 on a single horizontal line'
                  : 'Nhiệm vụ 1: In toàn bộ dãy các số tự nhiên từ 1 đến 100 trên một hàng ngang'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn ? 'Launch Python shell and run while loop program' : 'Mở phần mềm Python và nhập chương trình vòng lặp while'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRunTask1}
            disabled={isTask1Running}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4" />
            <span>{isTask1Running ? (isEn ? 'Running...' : 'Đang chạy...') : (isEn ? 'Run Task 1 Code' : 'Chạy chương trình NV1')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source code & explanation */}
          <div className="space-y-4">
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div className="text-slate-500 mb-2"># {isEn ? 'Textbook Instructions (Page 110):' : 'Hướng dẫn SGK Trang 110:'}</div>
              <div>k = 0</div>
              <div className="text-emerald-400 font-bold">while k &lt; {task1Limit}:</div>
              <div className="pl-4 text-cyan-300">k = k + 1</div>
              <div className="pl-4 text-yellow-300">print(k, end = " ")</div>
            </div>

            <div className="bg-teal-50/70 dark:bg-teal-950/20 p-4 rounded-xl border border-teal-200 dark:border-teal-900/50 text-xs space-y-2 text-teal-900 dark:text-teal-200">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>{isEn ? 'Execution Mechanism Explanation:' : 'Giải thích cơ chế thực thi:'}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-teal-800 dark:text-teal-300">
                <li>{isEn ? 'Variable k is initialized to 0.' : 'Biến k khởi tạo bằng 0.'}</li>
                <li>{isEn ? 'Before printing, k = k + 1 increments the counter, so the first printed number is 1.' : 'Trước khi in, lệnh k = k + 1 tăng biến đếm lên trước, do đó số in ra đầu tiên là 1.'}</li>
                <li>{isEn ? 'Final iteration: k = 99 < 100 (True), k increments to 100 and prints 100. Then k = 100 < 100 evaluates to False, terminating loop!' : 'Lần lặp cuối cùng khi k = 99 < 100 (True), k tăng lên 100 và in ra 100. Sau đó kiểm tra k = 100 < 100 (False) thì dừng vòng lặp!'}</li>
                <li>{isEn ? 'Parameter end = " " in print() keeps all numbers separated by spaces on the same row.' : 'Tham số end = " " trong hàm print giúp in các số cách nhau một khoảng trắng trên cùng một dòng.'}</li>
              </ul>
            </div>

            {/* Custom Limit Slider */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-slate-500 whitespace-nowrap">{isEn ? 'Upper limit N:' : 'Giới hạn N:'}</span>
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={task1Limit}
                onChange={(e) => setTask1Limit(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 w-12 text-right">
                {task1Limit}
              </span>
            </div>
          </div>

          {/* Virtual Terminal Output */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="font-medium flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                <span>{isEn ? 'Python Interactive Shell Window' : 'Cửa sổ màn hình tương tác Python (Shell)'}</span>
              </span>
              {task1Count > 0 && (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {isEn ? `Printed ${task1Count} numbers` : `Đã in ${task1Count} số tự nhiên`}
                </span>
              )}
            </div>

            <div className="bg-slate-950 text-slate-100 p-4 rounded-xl font-mono text-xs min-h-[160px] max-h-[220px] overflow-y-auto border border-slate-800 leading-relaxed break-words shadow-inner">
              <span className="text-emerald-400">&gt;&gt;&gt; </span>
              {task1Output ? (
                <span className="text-amber-200">{task1Output}</span>
              ) : (
                <span className="text-slate-600 italic">
                  {isEn ? 'Click "Run Task 1 Code" to view terminal output...' : 'Nhấn "Chạy chương trình NV1" để xem kết quả xuất ra màn hình...'}
                </span>
              )}
            </div>

            {/* Compare with for loop */}
            <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <span>{isEn ? 'Equivalent syntax using for:' : 'Cách viết tương đương bằng for:'}</span>
              <code className="font-mono bg-white dark:bg-slate-900 px-2 py-1 rounded text-teal-600 dark:text-teal-400 font-bold">
                for k in range(1, {task1Limit + 1}): print(k, end = " ")
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Nhiệm vụ 2: In chữ cái A..Z theo 3 hàng ngang bằng chr(k) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-sm">
              {isEn ? 'T2' : 'NV2'}
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                {isEn
                  ? 'Task 2: Print English alphabet "A" through "Z" across 3 horizontal rows'
                  : 'Nhiệm vụ 2: In bảng chữ cái tiếng Anh từ "A" đến "Z" thành 3 hàng ngang'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn
                  ? 'Using chr(k) with ASCII codes 65 ("A") to 90 ("Z"), rows 1 & 2 have 10 letters, row 3 has 6 letters'
                  : 'Sử dụng hàm chr(k) với mã ASCII từ 65 ("A") đến 90 ("Z"), hàng 1 & 2 gồm 10 chữ, hàng 3 gồm 6 chữ'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRunTask2}
            disabled={isTask2Running}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all cursor-pointer shrink-0"
          >
            <Play className="w-4 h-4" />
            <span>{isTask2Running ? (isEn ? 'Running...' : 'Đang chạy...') : (isEn ? 'Run Task 2 Code' : 'Chạy chương trình NV2')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Code */}
          <div className="space-y-4">
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div className="text-slate-500 mb-1"># {isEn ? 'Textbook Instructions (Page 110):' : 'Hướng dẫn SGK Trang 110:'}</div>
              <div>i = 0</div>
              <div>k = 65  <span className="text-slate-500"># {isEn ? "Starts at ASCII codepoint for 'A'" : "Bắt đầu từ số thứ tự của chữ cái 'A'"}</span></div>
              <div className="text-indigo-400 font-bold">while k &lt;= 90:</div>
              <div className="pl-4 text-sky-300">i = i + 1</div>
              <div className="pl-4 text-amber-300">if i % {charsPerRow} == 0:</div>
              <div className="pl-8 text-yellow-300">print(chr(k))  <span className="text-slate-500"># {isEn ? 'End of row: newline' : 'Ký tự cuối hàng: xuống dòng'}</span></div>
              <div className="pl-4 text-amber-300">else:</div>
              <div className="pl-8 text-yellow-300">print(chr(k), end = " ")  <span className="text-slate-500"># {isEn ? 'Same row' : 'In trên cùng một hàng'}</span></div>
              <div className="pl-4 text-sky-300">k = k + 1</div>
            </div>

            {/* ASCII Interactive Quick Inspector */}
            <div className="bg-indigo-50/70 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 text-xs">
              <div className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-indigo-600" />
                  <span>{isEn ? 'ASCII Codepoints Table (65 to 90):' : 'Bảng tra cứu mã ASCII (65 đến 90):'}</span>
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                  chr({asciiInspectChar}) = '{String.fromCharCode(asciiInspectChar || 65)}'
                </span>
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                {Array.from({ length: 26 }, (_, idx) => 65 + idx).map((code) => (
                  <button
                    type="button"
                    key={code}
                    onClick={() => setAsciiInspectChar(code)}
                    className={`px-2 py-1 rounded font-mono text-xs transition-all cursor-pointer ${
                      asciiInspectChar === code
                        ? 'bg-indigo-600 text-white font-bold shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {code}: <strong>{String.fromCharCode(code)}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Execution Result */}
          <div className="space-y-4">
            <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
              <span>{isEn ? 'Terminal Console Output:' : 'Màn hình hiển thị kết quả (Console Output):'}</span>
              <span className="text-indigo-600 font-semibold">{isEn ? '26 English letters (A-Z)' : '26 chữ cái tiếng Anh (A-Z)'}</span>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl font-mono text-sm border border-slate-800 shadow-inner min-h-[160px] flex flex-col justify-center">
              {task2Rows.length > 0 ? (
                <div className="space-y-2">
                  {task2Rows.map((row, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-xs text-slate-600 select-none w-14">
                        {isEn ? `Row ${idx + 1}:` : `Hàng ${idx + 1}:`}
                      </span>
                      <span className="text-emerald-400 font-bold tracking-widest text-base">
                        {row}
                      </span>
                      <span className="text-xs text-slate-500">
                        ({row.split(' ').length} {isEn ? 'letters' : 'chữ'})
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-600 text-xs italic text-center py-4">
                  {isEn ? 'Click "Run Task 2 Code" to output 3 rows of A-Z...' : 'Nhấn "Chạy chương trình NV2" để xuất 3 hàng chữ cái A-Z...'}
                </div>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <div className="font-bold flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                <CheckCircle className="w-4 h-4" />
                <span>{isEn ? 'Algorithmic Secret:' : 'Bí quyết thuật toán:'}</span>
              </div>
              <p>
                {isEn
                  ? 'The modulo operation i % 10 == 0 functions as a row-wrapping trigger. Every 10th printed character omits end = " ", automatically dropping the terminal cursor to the next line!'
                  : 'Phép toán chia lấy dư i % 10 == 0 đóng vai trò là "công tắc ngắt dòng". Cứ sau mỗi 10 chữ cái in ra thì không kèm end = " ", khiến con trỏ tự động nhảy xuống dòng tiếp theo!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fill-in-the-blank Code Puzzle */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-1">
          <Code className="w-4 h-4" />
          <span>{isEn ? 'Algorithmic Thinking Puzzle' : 'Bài tập điền khuyết tư duy thuật toán'}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
          {isEn
            ? 'Complete the while loop program to print odd numbers less than 20 on one line'
            : 'Điền câu lệnh hoàn chỉnh chương trình in các số lẻ nhỏ hơn 20 trên một hàng'}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {isEn
            ? 'Fill in the missing expressions or statements in the blanks below:'
            : 'Điền đúng các biểu thức hoặc câu lệnh còn thiếu vào các chỗ trống bên dưới:'}
        </p>

        <div className="bg-slate-950 text-slate-200 p-5 rounded-xl font-mono text-sm border border-slate-800 space-y-3 shadow-inner">
          <div>k = 1</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-purple-400 font-bold">while</span>
            <span>k</span>
            <input
              type="text"
              value={fillAnswers.b1}
              onChange={(e) => setFillAnswers({ ...fillAnswers, b1: e.target.value })}
              placeholder="< 20"
              className="bg-slate-800 border border-slate-700 text-emerald-400 px-2 py-0.5 rounded font-mono text-xs w-28 focus:outline-none focus:border-amber-400"
            />
            <span>:</span>
          </div>
          <div className="flex items-center gap-2 pl-4 flex-wrap">
            <span className="text-sky-400">print</span>
            <span>(k,</span>
            <input
              type="text"
              value={fillAnswers.b2}
              onChange={(e) => setFillAnswers({ ...fillAnswers, b2: e.target.value })}
              placeholder='end = " "'
              className="bg-slate-800 border border-slate-700 text-emerald-400 px-2 py-0.5 rounded font-mono text-xs w-32 focus:outline-none focus:border-amber-400"
            />
            <span>)</span>
          </div>
          <div className="pl-4 flex items-center gap-2">
            <input
              type="text"
              value={fillAnswers.b3}
              onChange={(e) => setFillAnswers({ ...fillAnswers, b3: e.target.value })}
              placeholder="k = k + 2"
              className="bg-slate-800 border border-slate-700 text-emerald-400 px-2 py-0.5 rounded font-mono text-xs w-32 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCheckFill}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow transition-all cursor-pointer"
          >
            {isEn ? 'Verify Blanks' : 'Kiểm tra đáp án điền'}
          </button>

          {fillChecked !== null && (
            <div
              className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl ${
                fillChecked
                  ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                  : 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-300'
              }`}
            >
              {fillChecked ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>
                    {isEn
                      ? 'Excellent! The code is completely accurate (k = 1, 3, 5, ..., 19).'
                      : 'Tuyệt vời! Đoạn mã chính xác hoàn toàn (k = 1, 3, 5, ..., 19).'}
                  </span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-rose-600" />
                  <span>
                    {isEn
                      ? 'Hint: Blank 1: < 20, Blank 2: end = " ", Blank 3: k = k + 2'
                      : 'Gợi ý: Chỗ 1 điền < 20, Chỗ 2 điền end = " ", Chỗ 3 điền k = k + 2'}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
