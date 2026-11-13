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
  ListOrdered,
  ChevronRight,
  Info,
  Layers
} from 'lucide-react';

export const Section24PracticeLab: React.FC = () => {
  const { bilingualMode, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const isEn = bilingualMode === 'en';

  // Task 1: Student List Input
  const [task1Names, setTask1Names] = useState<string>('Nguyen Van An, Le Thi Binh, Tran Quoc Cuong');
  const [task1Output, setTask1Output] = useState<string[]>([
    'Nguyen Van An',
    'Le Thi Binh',
    'Tran Quoc Cuong'
  ]);

  const handleRunTask1 = () => {
    const names = task1Names.split(',').map(s => s.trim()).filter(Boolean);
    setTask1Output(names);
  };

  // Task 2: Substring "10" Detection (Both Methods)
  const [task2InputStr, setTask2InputStr] = useState<string>('1010110&0101001');
  const [task2Method, setTask2Method] = useState<'method1' | 'method2'>('method2');
  const [task2Result, setTask2Result] = useState<{
    hasTen: boolean;
    firstIndex: number;
    logVi: string;
    logEn: string;
  }>({
    hasTen: true,
    firstIndex: 0,
    logEn: 'Found substring "10" starting at index 0 (S[0]="1" and S[1]="0")',
    logVi: 'Tìm thấy xâu con "10" tại chỉ số bắt đầu 0 (S[0]="1" và S[1]="0")'
  });

  const handleRunTask2 = () => {
    const s = task2InputStr;
    if (task2Method === 'method1') {
      let found = false;
      let foundIdx = -1;
      for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === '1' && s[i + 1] === '0') {
          found = true;
          foundIdx = i;
          break;
        }
      }
      setTask2Result({
        hasTen: found,
        firstIndex: foundIdx,
        logEn: found
          ? `[Method 1 - Index Traversal]: Match at i = ${foundIdx} (S[${foundIdx}]='1' and S[${foundIdx + 1}]='0'), early exit via break.`
          : '[Method 1 - Index Traversal]: Exhausted range(len(S)-1) with no consecutive "1" and "0".',
        logVi: found
          ? `[Cách 1 - Duyệt chỉ số]: Khớp tại i = ${foundIdx} (S[${foundIdx}]='1' và S[${foundIdx + 1}]='0'), dừng sớm bằng break.`
          : '[Cách 1 - Duyệt chỉ số]: Đã duyệt hết range(len(S)-1) mà không thấy cặp "1" và "0" liên tiếp.'
      });
    } else {
      const found = s.includes('10');
      const idx = s.indexOf('10');
      setTask2Result({
        hasTen: found,
        firstIndex: idx,
        logEn: found
          ? '[Method 2 - In Operator]: Expression ("10" in S) evaluated to True!'
          : '[Method 2 - In Operator]: Expression ("10" in S) evaluated to False.',
        logVi: found
          ? '[Cách 2 - Toán tử in]: Biểu thức ("10" in S) trả về True!'
          : '[Cách 2 - Toán tử in]: Biểu thức ("10" in S) trả về False.'
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-linear-to-r from-teal-900/30 via-slate-900 to-slate-900 border border-teal-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40 font-mono">
              {isEn ? 'PRACTICE LAB • PAGES 121 – 122' : 'THỰC HÀNH • TRANG 121 – 122 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isEn ? 'Fundamental Operations with Character Strings' : 'Các Lệnh Cơ Bản Làm Việc Với Xâu Kí Tự'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isEn
              ? 'Execute 2 hands-on tasks: Managing student lists and detecting substring "10" occurrences'
              : 'Thực hành 2 nhiệm vụ: Quản lí danh sách học sinh và kiểm tra sự xuất hiện của xâu con "10"'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(121);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shrink-0 cursor-pointer self-start sm:self-center"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isEn ? 'View Textbook Page 121' : 'Đối chiếu SGK Trang 121'}</span>
        </button>
      </div>

      {/* =========================================================================
          TASK 1: Student List Input
      ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
              {isEn ? 'T1' : 'NV1'}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                {isEn
                  ? 'Task 1: Input and store names for n students in a class (Page 121)'
                  : 'Nhiệm vụ 1: Nhập và lưu trữ danh sách họ tên n học sinh (Trang 121)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Combine lists with string elements: '
                  : 'Kết hợp kiểu danh sách với các phần tử là xâu họ tên học sinh: '}
                <code className="font-mono text-cyan-600 dark:text-cyan-400">ds_lop.append(hoten)</code>
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-500 font-bold">
            {isEn ? 'Page 121' : 'SGK Trang 121'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Code */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
            <div className="text-slate-400 font-sans font-bold text-[11px] mb-2">
              {isEn ? 'Standard Textbook Python Code:' : 'Chương trình chuẩn SGK:'}
            </div>
            <div className="text-slate-200">
              {isEn ? 'n = int(input("Enter number of students: "))' : 'n = int(input("Nhập số học sinh trong lớp: "))'}
            </div>
            <div className="text-cyan-400">ds_lop = []</div>
            <div className="text-slate-200">for i in range(n):</div>
            <div className="text-slate-300 pl-4">
              {isEn
                ? 'hoten = input("Enter student name #" + str(i+1) + ": ")'
                : 'hoten = input("Nhập họ tên học sinh thứ " + str(i+1) + ": ")'}
            </div>
            <div className="text-amber-400 font-bold pl-4">
              ds_lop.append(hoten)
            </div>
            <div className="text-slate-200 pt-1">
              {isEn ? 'print("Class student roster:")' : 'print("Danh sách lớp học:")'}
            </div>
            <div className="text-slate-200">for i in range(n):</div>
            <div className="text-emerald-400 pl-4">print(ds_lop[i])</div>
          </div>

          {/* Interactive Input & Output */}
          <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              <label className="text-xs text-slate-700 dark:text-slate-300 font-bold block">
                {isEn ? 'Student full names (comma-separated):' : 'Họ và tên các học sinh (cách nhau dấu phẩy):'}
              </label>
              <input
                type="text"
                value={task1Names}
                onChange={e => setTask1Names(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={handleRunTask1}
                className="flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer shadow"
              >
                <Play className="w-4 h-4" />
                <span>{isEn ? 'Process Roster Input' : 'Chạy nhập danh sách'}</span>
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
              <div className="text-slate-400 font-mono text-[11px] mb-1.5">
                {isEn ? 'Printed class roster (one name per line):' : 'Danh sách lớp học in ra (mỗi họ tên 1 dòng):'}
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
      </div>

      {/* =========================================================================
          TASK 2: Check Substring "10"
      ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              {isEn ? 'T2' : 'NV2'}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                {isEn
                  ? 'Task 2: Check whether string S contains substring "10"'
                  : 'Nhiệm vụ 2: Kiểm tra xâu S có chứa xâu con "10" không'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Comparing two techniques: Method 1 index pair check vs Method 2 Python "10" in S operator'
                  : 'So sánh 2 cách giải: Cách 1 duyệt cặp kí tự liền kề S[i] == "1" and S[i+1] == "0" vs Cách 2 dùng toán tử "10" in S'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/10 text-indigo-500 font-bold">
            {isEn ? 'Pages 121 – 122' : 'SGK Trang 121 – 122'}
          </span>
        </div>

        {/* 2 Code boxes side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5">
            <div className="text-slate-400 font-sans font-bold text-[11px] mb-1">
              {isEn ? 'Method 1 (Pages 121–122): Index Traversal' : 'Cách 1 (Trang 121–122): Duyệt theo chỉ số'}
            </div>
            <div className="text-slate-200">
              {isEn ? 'S = input("Enter any string: ")' : 'S = input("Nhập xâu bất kì: ")'}
            </div>
            <div className="text-slate-200">kq = False</div>
            <div className="text-indigo-400">for i in range(len(S)-1):</div>
            <div className="text-slate-300 pl-4">
              if S[i] == "1" and S[i+1] == "0":
            </div>
            <div className="text-emerald-400 font-bold pl-8">
              kq = True<br />break
            </div>
            <div className="text-slate-200 pt-1">
              {isEn ? 'if kq: print("String contains \'10\'")' : 'if kq: print("Xâu gốc có chứa \'10\'")'}
            </div>
            <div className="text-slate-200">
              {isEn ? 'else: print("String does not contain \'10\'")' : 'else: print("Xâu gốc không chứa \'10\'")'}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="text-slate-400 font-sans font-bold text-[11px] mb-1">
                {isEn ? 'Method 2 (Page 122): Using in Operator' : 'Cách 2 (Trang 122): Sử dụng toán tử in'}
              </div>
              <div className="text-slate-200">
                {isEn ? 'S = input("Enter any string: ")' : 'S = input("Nhập xâu bất kì: ")'}
              </div>
              <div className="text-slate-300">s10 = "10"</div>
              <div className="text-indigo-400 font-bold">if s10 in S:</div>
              <div className="text-emerald-400 pl-4">
                {isEn ? 'print("String contains \'10\'")' : 'print("Xâu gốc có chứa \'10\'")'}
              </div>
              <div className="text-indigo-400">else:</div>
              <div className="text-rose-400 pl-4">
                {isEn ? 'print("String does not contain \'10\'")' : 'print("Xâu gốc không chứa \'10\'")'}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-sans italic pt-2 border-t border-slate-800">
              {isEn
                ? '* Method 2 is exceptionally concise; expression s10 in S evaluates directly to True/False.'
                : '* Cách 2 cực kỳ ngắn gọn, biểu thức s10 in S trực tiếp trả về True/False.'}
            </div>
          </div>
        </div>

        {/* Interactive Runner for Task 2 */}
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">
                {isEn ? 'Select algorithm:' : 'Chọn phương pháp:'}
              </span>
              <button
                type="button"
                onClick={() => setTask2Method('method2')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  task2Method === 'method2'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-white dark:bg-slate-800 text-slate-400'
                }`}
              >
                {isEn ? 'Method 2: "in" Operator (Recommended)' : 'Cách 2: Toán tử in (Khuyên dùng)'}
              </button>
              <button
                type="button"
                onClick={() => setTask2Method('method1')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  task2Method === 'method1'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-white dark:bg-slate-800 text-slate-400'
                }`}
              >
                {isEn ? 'Method 1: Index Traversal' : 'Cách 1: Duyệt cặp chỉ số'}
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400">{isEn ? 'Sample:' : 'Ví dụ:'}</span>
              <button
                type="button"
                onClick={() => setTask2InputStr('1010110&0101001')}
                className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
              >
                "1010110&0101001"
              </button>
              <button
                type="button"
                onClick={() => setTask2InputStr('81723')}
                className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[11px]"
              >
                "81723"
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={task2InputStr}
              onChange={e => setTask2InputStr(e.target.value)}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={handleRunTask2}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer shadow shrink-0"
            >
              <Play className="w-4 h-4" />
              <span>{isEn ? 'Check "10"' : 'Kiểm tra "10"'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            {task2Result.hasTen ? (
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {isEn ? 'Original string contains substring "10"' : 'Xâu gốc có chứa xâu "10"'}
                </span>
              </div>
            ) : (
              <div className="text-rose-400 font-bold flex items-center gap-2">
                <Search className="w-4 h-4 shrink-0" />
                <span>
                  {isEn ? 'Original string does NOT contain substring "10"' : 'Xâu gốc không chứa xâu "10"'}
                </span>
              </div>
            )}
            <div className="text-slate-400 text-[11px] mt-1 font-sans">
              {isEn ? task2Result.logEn : task2Result.logVi}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
