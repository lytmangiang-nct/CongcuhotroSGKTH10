import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import {
  Code,
  Play,
  RotateCcw,
  BookOpen,
  Terminal,
  CheckCircle2,
  Sparkles,
  Search,
  Trash2,
  ArrowDownUp,
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';

export const Section23PracticeLab: React.FC = () => {
  const { bilingualMode, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const isEn = bilingualMode === 'en';

  // Task 1: Reverse Students Input
  const [task1Names, setTask1Names] = useState<string>('Nguyen Van An, Le Thi Binh, Tran Quoc Cuong, Pham Hoang Dung');
  const [task1Output, setTask1Output] = useState<string[]>([
    'Pham Hoang Dung',
    'Tran Quoc Cuong',
    'Le Thi Binh',
    'Nguyen Van An'
  ]);
  const [task1StepLog, setTask1StepLog] = useState<string[]>([
    isEn ? 'Step 1: Init dsLop = []' : 'Bước 1: Khởi tạo dsLop = []',
    'insert(0, "Nguyen Van An") -> ["Nguyen Van An"]',
    'insert(0, "Le Thi Binh") -> ["Le Thi Binh", "Nguyen Van An"]',
    'insert(0, "Tran Quoc Cuong") -> ["Tran Quoc Cuong", "Le Thi Binh", "Nguyen Van An"]',
    'insert(0, "Pham Hoang Dung") -> ["Pham Hoang Dung", "Tran Quoc Cuong", "Le Thi Binh", "Nguyen Van An"]'
  ]);

  const handleRunTask1 = () => {
    const names = task1Names.split(',').map(s => s.trim()).filter(Boolean);
    const result: string[] = [];
    const logs: string[] = [isEn ? 'Init: dsLop = []' : 'Khởi tạo: dsLop = []'];

    names.forEach((name, idx) => {
      result.unshift(name); // same as insert(0, name)
      logs.push(
        isEn
          ? `Iteration ${idx + 1}: dsLop.insert(0, "${name}") -> Current list: [${result.map(n => `"${n}"`).join(', ')}]`
          : `Lần lặp ${idx + 1}: dsLop.insert(0, "${name}") -> Danh sách hiện tại: [${result.map(n => `"${n}"`).join(', ')}]`
      );
    });

    setTask1Output(result);
    setTask1StepLog(logs);
  };

  // Task 2: Remove Negative Numbers with While
  const [task2ArrayStr, setTask2ArrayStr] = useState<string>('0, 1, -3, -10, 5, 9, -20, 55');
  const [task2CurrentArr, setTask2CurrentArr] = useState<number[]>([0, 1, 5, 9, 55]);
  const [task2StepHistory, setTask2StepHistory] = useState<string[]>([
    'i = 0: A[0] = 0 (>= 0) -> i = 1',
    'i = 1: A[1] = 1 (>= 0) -> i = 2',
    'i = 2: A[2] = -3 (< 0) -> A.remove(-3), i remains 2!',
    'i = 2: A[2] = -10 (< 0) -> A.remove(-10), i remains 2!',
    'i = 2: A[2] = 5 (>= 0) -> i = 3',
    'i = 3: A[3] = 9 (>= 0) -> i = 4',
    'i = 4: A[4] = -20 (< 0) -> A.remove(-20), i remains 4!',
    'i = 4: A[4] = 55 (>= 0) -> i = 5 (while loop ends)'
  ]);

  const handleRunTask2 = () => {
    const raw = task2ArrayStr.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    const A = [...raw];
    const steps: string[] = [];
    let i = 0;

    while (i < A.length) {
      if (A[i] < 0) {
        const val = A[i];
        steps.push(
          isEn
            ? `At i = ${i}: A[${i}] = ${val} (< 0) -> A.remove(${val}), DO NOT increment i (shift left)`
            : `Tại i = ${i}: A[${i}] = ${val} (< 0) -> A.remove(${val}), KHÔNG tăng i (dồn mảng)`
        );
        A.splice(i, 1);
      } else {
        steps.push(
          isEn
            ? `At i = ${i}: A[${i}] = ${A[i]} (>= 0) -> i = i + 1 (${i + 1})`
            : `Tại i = ${i}: A[${i}] = ${A[i]} (>= 0) -> i = i + 1 (${i + 1})`
        );
        i = i + 1;
      }
    }

    setTask2CurrentArr(A);
    setTask2StepHistory(steps);
  };

  // Task 3: Pattern matching [1, 2, 3]
  const [task3ArrayStr, setTask3ArrayStr] = useState<string>(
    '0, 4, 0, 1, 2, 3, 8, 9, 0, 1, 2, 3, 17, -16, 0, 1, 2'
  );
  const [task3Result, setTask3Result] = useState<{
    found: boolean;
    pkq: number;
    pattern: number[];
  }>({
    found: true,
    pkq: 3,
    pattern: [1, 2, 3]
  });

  const handleRunTask3 = () => {
    const A = task3ArrayStr.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    const p = [1, 2, 3];
    let pkq = -1;
    let i = 0;

    while (i <= A.length - 3 && pkq === -1) {
      if (A[i] === p[0] && A[i + 1] === p[1] && A[i + 2] === p[2]) {
        pkq = i;
      } else {
        i = i + 1;
      }
    }

    setTask3Result({
      found: pkq >= 0,
      pkq,
      pattern: p
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-linear-to-r from-amber-900/30 via-slate-900 to-slate-900 border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
              {isEn ? 'PRACTICE LAB • PAGES 117 – 118' : 'THỰC HÀNH • TRANG 117 – 118 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isEn ? 'Built-in Commands & Methods For Python Lists' : 'Các Lệnh Làm Việc Với Dữ Liệu Kiểu Danh Sách'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isEn
              ? 'Execute 3 textbook hands-on lab tasks with step-by-step tracing and standard algorithmic logic'
              : 'Thực thi 3 nhiệm vụ thực hành SGK với bộ mô phỏng từng bước lặp và giải thuật chuẩn'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(117);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shrink-0 cursor-pointer self-start sm:self-center"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isEn ? 'View Textbook Page 117' : 'Đối chiếu SGK Trang 117'}</span>
        </button>
      </div>

      {/* =========================================================================
          TASK 1: Reverse Students Input
      ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
              {isEn ? 'T1' : 'NV1'}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                {isEn
                  ? 'Task 1: Input a list of n students and display them in reverse order'
                  : 'Nhiệm vụ 1: Nhập danh sách n học sinh và in ra theo thứ tự ngược lại'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn ? 'Head-insertion technique: ' : 'Kỹ thuật chèn đầu danh sách: '}
                <code className="font-mono font-bold text-teal-600 dark:text-teal-400">dsLop.insert(0, name)</code>
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-teal-500/10 text-teal-500 font-bold">
            {isEn ? 'Page 117' : 'SGK Trang 117'}
          </span>
        </div>

        {/* Code & Logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
            <div className="text-slate-400 font-sans font-bold text-[11px] mb-2">
              {isEn ? 'Standard Textbook Python Code:' : 'Chương trình chuẩn SGK:'}
            </div>
            <div className="text-teal-400">dsLop = []</div>
            <div className="text-slate-200">
              {isEn ? 'n = int(input("Enter number of students: "))' : 'n = int(input("Nhập số học sinh trong lớp: "))'}
            </div>
            <div className="text-slate-200">for i in range(n):</div>
            <div className="text-slate-300 pl-4">
              {isEn
                ? 'name = input("Enter student name #" + str(i+1) + ": ")'
                : 'name = input("Nhập họ tên học sinh thứ " + str(i+1) + ": ")'}
            </div>
            <div className="text-amber-400 font-bold pl-4">
              dsLop.insert(0, name)  <span className="text-slate-500 font-normal">{isEn ? '# Insert at index 0 (front)' : '# Chèn vào vị trí 0 (đầu dãy)'}</span>
            </div>
            <div className="text-slate-200 pt-1">
              {isEn ? 'print("Entered students list:")' : 'print("Danh sách học sinh đã nhập:")'}
            </div>
            <div className="text-slate-200">for name in dsLop:</div>
            <div className="text-cyan-400 pl-4">print(name)</div>
          </div>

          {/* Interactive Input & Execution */}
          <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <label className="text-xs text-slate-700 dark:text-slate-300 font-bold block">
                {isEn ? 'Comma-separated student names entered sequentially:' : 'Danh sách học sinh nhập lần lượt (cách nhau dấu phẩy):'}
              </label>
              <input
                type="text"
                value={task1Names}
                onChange={e => setTask1Names(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
              />
              <button
                type="button"
                onClick={handleRunTask1}
                className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer shadow"
              >
                <Play className="w-4 h-4" />
                <span>{isEn ? 'Run Program (Reverse)' : 'Chạy chương trình (Đảo ngược)'}</span>
              </button>
            </div>

            {/* Output Display */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="text-slate-400 font-mono text-[11px] mb-1">
                {isEn ? 'Console Output (one name per line):' : 'Kết quả in ra màn hình (mỗi tên 1 dòng):'}
              </div>
              <div className="space-y-1">
                {task1Output.map((name, i) => (
                  <div key={i} className="text-emerald-400 font-mono">
                    {i + 1}. {name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-step trace */}
        <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 text-xs space-y-1.5">
          <div className="font-bold text-teal-900 dark:text-teal-300 flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            <span>
              {isEn
                ? 'Why does insert(0, name) produce a reverse order list?'
                : 'Vì sao dùng insert(0, name) lại thu được thứ tự ngược lại?'}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'Every time a new student is entered, the statement dsLop.insert(0, name) prepends the new element at the very beginning (index 0), shifting all previously existing elements one spot to the right. Consequently, the last entered element ends up at the front, creating a natural reverse-order effect!'
              : 'Mỗi khi bạn học sinh mới được nhập, lệnh dsLop.insert(0, name) sẽ luôn xếp bạn đó vào vị trí đầu tiên (chỉ số 0), và đẩy toàn bộ các bạn đã nhập trước đó lùi lại một vị trí về phía sau. Như vậy bạn học sinh nhập cuối cùng sẽ nằm ở đầu danh sách, tạo nên hiệu ứng đảo ngược tự nhiên!'}
          </p>
        </div>
      </div>

      {/* =========================================================================
          TASK 2: Remove Negative Numbers with While
      ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-sm">
              {isEn ? 'T2' : 'NV2'}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                {isEn
                  ? 'Task 2: Remove all negative values from list A'
                  : 'Nhiệm vụ 2: Xoá các phần tử có giá trị nhỏ hơn 0 từ dãy A'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'While traversal combined with A.remove(A[i]) and zero-index-increment technique'
                  : 'Thuật toán duyệt while kết hợp A.remove(A[i]) và kỹ thuật không tăng biến chỉ số i'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-500 font-bold">
            {isEn ? 'Pages 117 – 118' : 'SGK Trang 117 – 118'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
            <div className="text-slate-400 font-sans font-bold text-[11px] mb-2">
              {isEn ? 'Standard Textbook Code:' : 'Chương trình chuẩn SGK:'}
            </div>
            <div className="text-teal-400">A = [0, 1, -3, -10, 5, 9, -20, 55]</div>
            <div className="text-slate-200">i = 0</div>
            <div className="text-slate-200">while i &lt; len(A):</div>
            <div className="text-amber-300 pl-4">if A[i] &lt; 0:</div>
            <div className="text-rose-400 font-bold pl-8">
              A.remove(A[i])  <span className="text-slate-500 font-normal">{isEn ? '# Delete negative element, DO NOT increment i' : '# Xoá phần tử âm, KHÔNG tăng i'}</span>
            </div>
            <div className="text-amber-300 pl-4">else:</div>
            <div className="text-cyan-400 font-bold pl-8">
              i = i + 1  <span className="text-slate-500 font-normal">{isEn ? '# Increment i only when element >= 0' : '# Chỉ tăng i khi phần tử >= 0'}</span>
            </div>
            <div className="text-slate-200 pt-1">print(A)</div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <label className="text-xs text-slate-700 dark:text-slate-300 font-bold block">
                {isEn ? 'Initial list A (positive and negative integers):' : 'Dãy số A ban đầu (chứa cả số âm và dương):'}
              </label>
              <input
                type="text"
                value={task2ArrayStr}
                onChange={e => setTask2ArrayStr(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-rose-500"
              />
              <button
                type="button"
                onClick={handleRunTask2}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer shadow"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isEn ? 'Remove Negatives (Filter)' : 'Chạy xoá số âm (Lọc sạch)'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-400 text-[11px]">
                {isEn ? 'List A after removing all negative values:' : 'Dãy A sau khi đã xoá hết các số âm:'}
              </div>
              <div className="text-emerald-400 font-bold text-sm">
                A = [{task2CurrentArr.join(', ')}]
              </div>
              <div className="text-[11px] text-slate-500">
                {isEn ? 'New length: ' : 'Độ dài mới: '}len(A) = {task2CurrentArr.length}
              </div>
            </div>
          </div>
        </div>

        {/* Algorithm focus */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800/40 text-xs space-y-2">
          <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              {isEn
                ? 'Core Algorithm Rule: Why avoid incrementing i (no i = i + 1) when A[i] < 0?'
                : 'Câu hỏi cốt lõi: Vì sao khi A[i] < 0 ta không tăng i (không i = i + 1)?'}
            </span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'When executing A.remove(A[i]), the element at index i is deleted, and all subsequent elements immediately shift one position to the left. The element that was at i+1 now sits right at index i. If we incremented i = i + 1, the next loop iteration would check index i+1, completely skipping the newly shifted item at index i! In the textbook example, adjacent negative numbers -3 and -10 would cause -10 to be missed if i were incremented.'
              : 'Khi thực hiện lệnh A.remove(A[i]), phần tử tại chỉ số i bị loại bỏ, và ngay lập tức phần tử đứng ngay sau nó sẽ dồn sang trái để chiếm đúng vị trí chỉ số i đó. Nếu ta tăng i = i + 1, vòng lặp tiếp theo sẽ kiểm tra phần tử ở chỉ số mới, khiến cho phần tử vừa dồn tới tại vị trí i bị bỏ sót hoàn toàn! (Ví dụ trong SGK, hai số âm -3 và -10 đứng liền nhau, nếu tăng i thì số -10 sẽ không bị xoá!).'}
          </p>
        </div>
      </div>

      {/* =========================================================================
          TASK 3: Pattern matching [1, 2, 3]
      ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              {isEn ? 'T3' : 'NV3'}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                {isEn
                  ? 'Task 3: Find the first occurrence index of pattern [1, 2, 3]'
                  : 'Nhiệm vụ 3: Tìm vị trí đầu tiên của mẫu 3 số hạng liên tiếp [1, 2, 3]'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn ? 'Subsequence pattern matching condition: ' : 'Thuật toán đối sánh mẫu con liên tiếp: '}
                <code className="font-mono text-indigo-400">A[i] == p[0] and A[i+1] == p[1] and A[i+2] == p[2]</code>
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-500 font-bold">
            {isEn ? 'Page 118' : 'SGK Trang 118'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
            <div className="text-slate-400 font-sans font-bold text-[11px] mb-2">
              {isEn ? 'Standard Textbook Code (Page 118):' : 'Chương trình chuẩn SGK Trang 118:'}
            </div>
            <div className="text-teal-400">A = [0, 4, 0, 1, 2, 3, 8, 9, 0, 1, 2, 3, 17, -16, 0, 1, 2]</div>
            <div className="text-amber-400">p = [1, 2, 3]</div>
            <div className="text-slate-200">pkq = -1</div>
            <div className="text-slate-200">i = 0</div>
            <div className="text-slate-200">while i &lt; len(A) - 3 and pkq == -1:</div>
            <div className="text-indigo-400 pl-4">
              if A[i] == p[0] and A[i+1] == p[1] and A[i+2] == p[2]:
            </div>
            <div className="text-emerald-400 font-bold pl-8">pkq = i</div>
            <div className="text-slate-300 pl-4">else:</div>
            <div className="text-cyan-400 pl-8">i = i + 1</div>
            <div className="text-slate-200 pt-1">if pkq &gt;= 0:</div>
            <div className="text-emerald-400 pl-4">
              {isEn ? 'print("Found pattern", p, "at index", pkq)' : 'print("Tìm thấy mẫu ", p, " tại vị trí", pkq)'}
            </div>
            <div className="text-slate-200">else:</div>
            <div className="text-rose-400 pl-4">
              {isEn ? 'print("Pattern not found", p)' : 'print("Không tìm thấy mẫu", p)'}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <label className="text-xs text-slate-700 dark:text-slate-300 font-bold block">
                {isEn ? 'Target list A to search in:' : 'Dãy số A tìm kiếm:'}
              </label>
              <textarea
                rows={3}
                value={task3ArrayStr}
                onChange={e => setTask3ArrayStr(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleRunTask3}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer shadow"
              >
                <Search className="w-4 h-4" />
                <span>{isEn ? 'Search First Occurrence of [1, 2, 3]' : 'Tìm vị trí xuất hiện đầu tiên của [1, 2, 3]'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-400 text-[11px]">{isEn ? 'Search Result:' : 'Thông báo kết quả:'}</div>
              {task3Result.found ? (
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isEn
                      ? `Found pattern [1, 2, 3] at index ${task3Result.pkq}`
                      : `Tìm thấy mẫu [1, 2, 3] tại vị trí ${task3Result.pkq}`}
                  </span>
                </div>
              ) : (
                <div className="text-rose-400 font-bold">
                  {isEn ? 'Pattern [1, 2, 3] not found' : 'Không tìm thấy mẫu [1, 2, 3]'}
                </div>
              )}
              <div className="text-[11px] text-slate-500">
                (A[{task3Result.pkq}] = 1, A[{task3Result.pkq + 1}] = 2, A[{task3Result.pkq + 2}] = 3)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
