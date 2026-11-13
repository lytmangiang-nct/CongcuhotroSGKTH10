import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import {
  Terminal,
  Play,
  RotateCcw,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Award,
  Users,
  Calculator,
  Plus,
  ArrowRight,
  Code
} from 'lucide-react';

export const Section22PracticeLab: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Task 1 State: Danh sách học sinh
  const [task1Names, setTask1Names] = useState<string[]>([
    'Nguyễn Văn An',
    'Trần Thị Bình',
    'Lê Hoàng Chi',
    'Phạm Quốc Dũng'
  ]);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [task1Output, setTask1Output] = useState<string[]>([]);
  const [isTask1Running, setIsTask1Running] = useState<boolean>(false);

  // Task 2 State: Dãy số, Tổng và Trung bình cộng
  const [task2Nums, setTask2Nums] = useState<number[]>([15, 8, 22, 19, 36]);
  const [newNumInput, setNewNumInput] = useState<number>(10);
  const [task2Total, setTask2Total] = useState<number | null>(null);
  const [task2Avg, setTask2Avg] = useState<number | null>(null);
  const [task2OutputStr, setTask2OutputStr] = useState<string>('');
  const [isTask2Running, setIsTask2Running] = useState<boolean>(false);

  // Code challenge puzzle
  const [fillAnswers, setFillAnswers] = useState({
    b1: '',
    b2: '',
    b3: ''
  });
  const [fillChecked, setFillChecked] = useState<boolean | null>(null);

  // Run Task 1
  const handleRunTask1 = () => {
    setIsTask1Running(true);
    setTimeout(() => {
      setTask1Output([...task1Names]);
      setIsTask1Running(false);
    }, 200);
  };

  // Add student to task 1
  const handleAddStudent = () => {
    if (!newStudentName.trim()) return;
    setTask1Names(prev => [...prev, newStudentName.trim()]);
    setNewStudentName('');
  };

  // Run Task 2
  const handleRunTask2 = () => {
    setIsTask2Running(true);
    let total = 0;
    const n = task2Nums.length;
    for (let i = 0; i < n; i++) {
      total += task2Nums[i];
    }
    const avg = n > 0 ? total / n : 0;

    setTimeout(() => {
      setTask2Total(total);
      setTask2Avg(avg);
      setTask2OutputStr(task2Nums.join(' '));
      setIsTask2Running(false);
    }, 250);
  };

  // Add number to task 2
  const handleAddNum = () => {
    setTask2Nums(prev => [...prev, newNumInput]);
  };

  // Check code puzzle
  const handleCheckFill = () => {
    const a1 = fillAnswers.b1.trim();
    const a2 = fillAnswers.b2.trim().replace(/\s+/g, '');
    const a3 = fillAnswers.b3.trim().replace(/\s+/g, '');

    const p1 = a1 === '[]';
    const p2 = a2 === 'A.append(num)' || a2 === 'A.append(int(num))' || a2.includes('.append');
    const p3 = a3 === 'T=T+num' || a3 === 'T+=num';

    setFillChecked(p1 && p2 && p3);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SGK Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-200 text-sm font-semibold tracking-wide uppercase mb-1">
            <Terminal className="w-4 h-4" />
            <span>
              {isEn
                ? 'Practice Lab • Informatics 10 KNTT — Page 114'
                : 'Thực hành • SGK Tin học 10 Kết nối tri thức — Trang 114'}
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {isEn
              ? 'PRACTICE LAB: INITIALIZATION, INPUT & APPEND()'
              : 'THỰC HÀNH: KHỞI TẠO, NHẬP DỮ LIỆU & APPEND'}
          </h2>
          <p className="text-teal-100 text-sm mt-1">
            {isEn
              ? 'Computer lab practical: Task 1 inputting student names and printing line-by-line; Task 2 computing sum and average of numeric lists.'
              : 'Phòng thực hành tin học: Nhiệm vụ 1 nhập n học sinh bằng append() in từng dòng; Nhiệm vụ 2 nhập dãy số, tính tổng và trung bình cộng.'}
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
          <BookOpen className="w-4 h-4 text-teal-300" />
          <span>{isEn ? 'View Textbook Page 114' : 'Xem trang 114 gốc'}</span>
        </button>
      </div>

      {/* Nhiệm vụ 1: Danh sách học sinh */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-sm">
              NV1
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                {isEn
                  ? 'Task 1: Input a list of n student names and print each name on a line'
                  : 'Nhiệm vụ 1: Nhập danh sách họ tên n học sinh và in mỗi tên trên một dòng'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn
                  ? 'Textbook Page 114: Utilizing dsLop = [], for loop with append() and str(i+1)'
                  : 'SGK Trang 114: Sử dụng dsLop = [], vòng lặp for với append() và str(i+1)'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRunTask1}
            disabled={isTask1Running}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>{isTask1Running ? (isEn ? 'Running...' : 'Đang chạy...') : (isEn ? 'Run Task 1' : 'Chạy chương trình NV1')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Code & Inputs */}
          <div className="space-y-4">
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div className="text-slate-500 mb-1"># {isEn ? 'Python Source Code (Page 114):' : 'Mã nguồn Python SGK Trang 114:'}</div>
              <div>dsLop = []</div>
              <div>n = int(input("{isEn ? 'Enter number of students in class: ' : 'Nhập số học sinh trong lớp: '}"))</div>
              <div className="text-cyan-400 font-bold">for i in range(n):</div>
              <div className="pl-4 text-emerald-300">
                name = input("{isEn ? 'Enter student name #' : 'Nhập họ tên học sinh thứ '}" + str(i+1) + ": ")
              </div>
              <div className="pl-4 text-pink-400 font-bold">dsLop.append(name)</div>
              <div className="text-yellow-300 mt-2">print("{isEn ? 'List of students entered:' : 'Danh sách học sinh đã nhập:'}")</div>
              <div className="text-cyan-400 font-bold">for i in range(len(dsLop)):</div>
              <div className="pl-4 text-emerald-300">print(dsLop[i])</div>
            </div>

            {/* Interactive student entry */}
            <div className="p-3.5 bg-teal-50/70 dark:bg-teal-950/20 rounded-xl border border-teal-200 dark:border-teal-900/50 text-xs space-y-2">
              <div className="font-bold text-teal-900 dark:text-teal-200 flex items-center justify-between">
                <span>{isEn ? 'Test add a student name:' : 'Nhập thử tên học sinh mới:'}</span>
                <span className="font-mono text-teal-600">
                  {isEn ? `Total: ${task1Names.length} students` : `Tổng số: ${task1Names.length} bạn`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  placeholder={isEn ? "e.g., Alex Johnson" : "Ví dụ: Hoàng Minh Trí"}
                  className="flex-1 bg-white dark:bg-slate-800 border border-teal-300 dark:border-teal-700 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={handleAddStudent}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>append()</span>
                </button>
              </div>
            </div>
          </div>

          {/* Virtual Terminal Output */}
          <div className="space-y-3">
            <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
              <span>{isEn ? 'Console Terminal Window:' : 'Cửa sổ màn hình hiển thị (Console):'}</span>
              <span className="text-teal-600 font-semibold">
                {task1Names.length} {isEn ? 'students' : 'học sinh'}
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs border border-slate-800 shadow-inner min-h-[180px] max-h-[220px] overflow-y-auto space-y-1">
              <div className="text-emerald-400">
                &gt;&gt;&gt; {isEn ? 'List of students entered:' : 'Danh sách học sinh đã nhập:'}
              </div>
              {task1Output.length > 0 ? (
                task1Output.map((name, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-200">
                    <span className="text-slate-500 select-none w-6">{idx + 1}.</span>
                    <span className="text-cyan-300 font-semibold">{name}</span>
                    <span className="text-[10px] text-slate-600 font-mono">(dsLop[{idx}])</span>
                  </div>
                ))
              ) : (
                <div className="text-slate-600 italic py-6 text-center">
                  {isEn
                    ? 'Click "Run Task 1" to view line-by-line output...'
                    : 'Nhấn "Chạy chương trình NV1" để xem kết quả xuất từng dòng...'}
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300">
              <strong>{isEn ? 'Textbook Note:' : 'Ghi chú SGK:'}</strong>{' '}
              {isEn ? (
                <>In prompt message, use <code className="font-mono text-teal-600 font-bold">str(i+1)</code> because index <code className="font-mono">i</code> in <code className="font-mono">range(n)</code> starts from 0, so adding 1 reflects natural numbering (#1, #2, ...).</>
              ) : (
                <>Trong thông báo nhập, sử dụng <code className="font-mono text-teal-600 font-bold">str(i+1)</code> vì biến <code className="font-mono">i</code> trong <code className="font-mono">range(n)</code> bắt đầu từ số 0, nên cần cộng thêm 1 để hiển thị số thứ tự tự nhiên (thứ 1, thứ 2, ...).</>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nhiệm vụ 2: Dãy số, Tổng và Trung bình cộng */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm">
              NV2
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">
                {isEn
                  ? 'Task 2: Input numeric sequence, compute Sum and Average'
                  : 'Nhiệm vụ 2: Nhập dãy số, tính Tổng và Trung bình cộng'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEn
                  ? 'Textbook Page 114: int() conversion, accumulator T = T + num, inline printing with end = " "'
                  : 'SGK Trang 114: Chuyển kiểu int(), biến tích luỹ T = T + num, in cùng hàng bằng end = " "'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRunTask2}
            disabled={isTask2Running}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-all cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>{isTask2Running ? (isEn ? 'Calculating...' : 'Đang tính...') : (isEn ? 'Run Task 2' : 'Chạy chương trình NV2')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Code & Inputs */}
          <div className="space-y-4">
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div className="text-slate-500 mb-1"># {isEn ? 'Python Source Code (Task 2 Page 114):' : 'Mã nguồn Python SGK NV2 Trang 114:'}</div>
              <div>A = []</div>
              <div>T = 0</div>
              <div>n = int(input("{isEn ? 'Enter natural number n: ' : 'Nhập số tự nhiên n: '}"))</div>
              <div className="text-cyan-400 font-bold">for i in range(n):</div>
              <div className="pl-4 text-emerald-300">
                num = int(input("{isEn ? 'Enter number #' : 'Nhập số thứ '}" + str(i+1) + ": "))
              </div>
              <div className="pl-4 text-pink-400 font-bold">A.append(num)</div>
              <div className="pl-4 text-yellow-300 font-bold">T = T + num</div>
              <div className="text-yellow-300 mt-2">print("{isEn ? 'Entered numbers:' : 'Dãy số đã nhập:'}")</div>
              <div className="text-cyan-400 font-bold">for i in range(n):</div>
              <div className="pl-4 text-emerald-300">print(A[i], end = " ")</div>
              <div className="text-yellow-300 mt-2">print()</div>
              <div className="text-yellow-300">print("{isEn ? 'Sum:' : 'Tổng:'}", T)</div>
              <div className="text-yellow-300">print("{isEn ? 'Average:' : 'Trung bình:'}", T/n)</div>
            </div>

            {/* Input custom numbers */}
            <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/50 text-xs space-y-2">
              <div className="font-bold text-blue-900 dark:text-blue-200 flex items-center justify-between">
                <span>
                  {isEn
                    ? `Current numbers (${task2Nums.length} elements):`
                    : `Dãy số hiện có (${task2Nums.length} phần tử):`}
                </span>
                <span className="font-mono text-blue-600">[{task2Nums.join(', ')}]</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={newNumInput}
                  onChange={e => setNewNumInput(Number(e.target.value))}
                  className="w-24 bg-white dark:bg-slate-800 border border-blue-300 dark:border-blue-700 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddNum}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>A.append({newNumInput})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTask2Nums([15, 8, 22, 19, 36])}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-auto cursor-pointer"
                >
                  {isEn ? 'Reset' : 'Đặt lại'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="space-y-3">
            <div className="text-xs text-slate-500 font-medium">
              {isEn ? 'Console Calculation Results:' : 'Kết quả tính toán màn hình Console:'}
            </div>

            <div className="bg-slate-950 p-5 rounded-xl font-mono text-xs border border-slate-800 shadow-inner min-h-[180px] space-y-3">
              {task2Total !== null ? (
                <>
                  <div>
                    <span className="text-slate-400">{isEn ? 'Entered numbers: ' : 'Dãy số đã nhập: '}</span>
                    <span className="text-cyan-300 font-bold">{task2OutputStr}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400">{isEn ? 'Sum (T): ' : 'Tổng (T): '}</span>
                    <span className="text-emerald-400 font-bold text-base">{task2Total}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">{isEn ? 'Average (T/n): ' : 'Trung bình (T/n): '}</span>
                    <span className="text-amber-300 font-bold text-base">
                      {task2Avg !== null ? task2Avg.toFixed(2) : ''}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-slate-600 italic py-10 text-center">
                  {isEn
                    ? 'Click "Run Task 2" to compute sum and average...'
                    : 'Nhấn "Chạy chương trình NV2" để tính tổng và trung bình cộng...'}
                </div>
              )}
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300">
              <strong>{isEn ? 'Textbook Formula:' : 'Công thức SGK:'}</strong>{' '}
              {isEn
                ? 'Sum T = A[0] + A[1] + ... + A[n-1] and Average = T / n.'
                : 'Tổng T = A[0] + A[1] + ... + A[n-1] và Trung bình cộng = T / n.'}
            </div>
          </div>
        </div>
      </div>

      {/* Code puzzle challenge */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-1">
          <Code className="w-4 h-4" />
          <span>{isEn ? 'List Algorithm Fill-in Challenge' : 'Thử thách điền khuyết thuật toán danh sách'}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
          {isEn
            ? 'Complete the missing statements for list accumulation'
            : 'Điền câu lệnh hoàn chỉnh chương trình tích luỹ danh sách'}
        </h3>

        <div className="bg-slate-950 text-slate-200 p-5 rounded-xl font-mono text-sm border border-slate-800 space-y-3 shadow-inner">
          <div className="flex items-center gap-2 flex-wrap">
            <span>A =</span>
            <input
              type="text"
              value={fillAnswers.b1}
              onChange={e => setFillAnswers({ ...fillAnswers, b1: e.target.value })}
              placeholder="[]"
              className="bg-slate-800 border border-slate-700 text-emerald-400 px-2 py-0.5 rounded font-mono text-xs w-24 focus:outline-none focus:border-cyan-400"
            />
            <span className="text-slate-500"># {isEn ? 'Initialize empty list' : 'Tạo danh sách rỗng'}</span>
          </div>
          <div>T = 0</div>
          <div>for i in range(n):</div>
          <div className="pl-4">num = int(input())</div>
          <div className="pl-4 flex items-center gap-2 flex-wrap">
            <input
              type="text"
              value={fillAnswers.b2}
              onChange={e => setFillAnswers({ ...fillAnswers, b2: e.target.value })}
              placeholder="A.append(num)"
              className="bg-slate-800 border border-slate-700 text-pink-400 px-2 py-0.5 rounded font-mono text-xs w-36 focus:outline-none focus:border-cyan-400"
            />
            <span className="text-slate-500"># {isEn ? 'Append num to end of list A' : 'Thêm num vào cuối A'}</span>
          </div>
          <div className="pl-4 flex items-center gap-2 flex-wrap">
            <input
              type="text"
              value={fillAnswers.b3}
              onChange={e => setFillAnswers({ ...fillAnswers, b3: e.target.value })}
              placeholder="T = T + num"
              className="bg-slate-800 border border-slate-700 text-yellow-300 px-2 py-0.5 rounded font-mono text-xs w-36 focus:outline-none focus:border-cyan-400"
            />
            <span className="text-slate-500"># {isEn ? 'Accumulate sum' : 'Tích luỹ tổng'}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCheckFill}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow transition-all cursor-pointer"
          >
            {isEn ? 'Verify Answers' : 'Kiểm tra đáp án điền'}
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
                      ? 'Excellent! List initialization and accumulation logic are 100% correct.'
                      : 'Xuất sắc! Đoạn mã khởi tạo danh sách và tích luỹ chính xác hoàn toàn.'}
                  </span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-rose-600" />
                  <span>
                    {isEn
                      ? 'Hint: Blank 1 is [], Blank 2 is A.append(num), Blank 3 is T = T + num'
                      : 'Gợi ý: Chỗ 1 là [], Chỗ 2 là A.append(num), Chỗ 3 là T = T + num'}
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
