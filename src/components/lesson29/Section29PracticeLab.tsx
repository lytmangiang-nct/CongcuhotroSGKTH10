import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import {
  Code,
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Terminal,
  Bug,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export const Section29PracticeLab: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // Task 1 State
  const [task1Input, setTask1Input] = useState<string>('15 5');
  const [task1Traceback, setTask1Traceback] = useState<{
    status: 'success' | 'error';
    errorCode?: string;
    outputLines: string[];
    explanation: string;
  } | null>(null);

  // Task 2 State
  const [task2N, setTask2N] = useState<string>('3');
  const [task2Items, setTask2Items] = useState<string>('10, 20, 30');
  const [task2Traceback, setTask2Traceback] = useState<{
    status: 'success' | 'error';
    errorCode?: string;
    outputLines: string[];
    explanation: string;
  } | null>(null);

  // Execute Task 1 with comprehensive Python error emulation
  const runTask1 = () => {
    const raw = task1Input;
    const parts = raw.trim().split(/\s+/).filter(s => s.length > 0);

    // Scenario 2: Lack of space or less than 2 items -> IndexError
    if (parts.length < 2) {
      setTask1Traceback({
        status: 'error',
        errorCode: 'IndexError',
        outputLines: [
          `Nhập hai số m, n cách nhau bởi dấu cách: ${raw}`,
          `sline = s.split() -> ['${parts.join("', '")}'] (độ dài: ${parts.length})`,
          `Traceback (most recent call last):`,
          `  File "NhiemVu1.py", line 3, in <module>`,
          `    m, n = int(sline[0]), int(sline[1])`,
          `IndexError: list index out of range`
        ],
        explanation: isVi
          ? 'Lỗi IndexError: Giữa hai số m, n không có dấu cách hoặc người dùng chỉ nhập 1 giá trị. Khi đó sline chỉ có 1 phần tử (sline[0]), truy cập sline[1] bị vượt quá giới hạn danh sách!'
          : 'IndexError: Missing space or only 1 item provided. sline[1] is out of bounds.'
      });
      return;
    }

    const mStr = parts[0];
    const nStr = parts[1];

    // Scenario 1: Not integer -> ValueError
    const mNum = Number(mStr);
    const nNum = Number(nStr);

    if (isNaN(mNum) || !Number.isInteger(mNum) || mStr.includes('.')) {
      setTask1Traceback({
        status: 'error',
        errorCode: 'ValueError',
        outputLines: [
          `Nhập hai số m, n cách nhau bởi dấu cách: ${raw}`,
          `Traceback (most recent call last):`,
          `  File "NhiemVu1.py", line 3, in <module>`,
          `    m, n = int(sline[0]), int(sline[1])`,
          `ValueError: invalid literal for int() with base 10: '${mStr}'`
        ],
        explanation: isVi
          ? `Lỗi ValueError: Giá trị m = '${mStr}' không phải là số nguyên (chứa chữ cái hoặc dấu chấm số thực). Hàm int() từ chối chuyển đổi.`
          : `ValueError: '${mStr}' cannot be parsed as an integer by int().`
      });
      return;
    }

    if (isNaN(nNum) || !Number.isInteger(nNum) || nStr.includes('.')) {
      setTask1Traceback({
        status: 'error',
        errorCode: 'ValueError',
        outputLines: [
          `Nhập hai số m, n cách nhau bởi dấu cách: ${raw}`,
          `Traceback (most recent call last):`,
          `  File "NhiemVu1.py", line 3, in <module>`,
          `    m, n = int(sline[0]), int(sline[1])`,
          `ValueError: invalid literal for int() with base 10: '${nStr}'`
        ],
        explanation: isVi
          ? `Lỗi ValueError: Giá trị n = '${nStr}' không phải là số nguyên. Hàm int() từ chối chuyển đổi.`
          : `ValueError: '${nStr}' is not a valid integer literal.`
      });
      return;
    }

    // Scenario 3: n == 0 -> ZeroDivisionError
    if (nNum === 0) {
      setTask1Traceback({
        status: 'error',
        errorCode: 'ZeroDivisionError',
        outputLines: [
          `Nhập hai số m, n cách nhau bởi dấu cách: ${raw}`,
          `m = ${mNum}, n = 0`,
          `m + n = ${mNum + nNum}`,
          `m - n = ${mNum - nNum}`,
          `Traceback (most recent call last):`,
          `  File "NhiemVu1.py", line 4, in <module>`,
          `    print("Tổng, hiệu, thương 2 số đã nhập là: ", m+n, m-n, m/n)`,
          `ZeroDivisionError: division by zero`
        ],
        explanation: isVi
          ? 'Lỗi ZeroDivisionError: Số chia n = 0. Python tính được tổng m+n và hiệu m-n, nhưng đến phép chia m/n thì gặp phép chia cho 0 nên chương trình dừng đột ngột.'
          : 'ZeroDivisionError: Divisor n is 0. Division by zero halts program.'
      });
      return;
    }

    // Success Case
    setTask1Traceback({
      status: 'success',
      outputLines: [
        `Nhập hai số m, n cách nhau bởi dấu cách: ${raw}`,
        `m = ${mNum}, n = ${nNum}`,
        `Tổng, hiệu, thương 2 số đã nhập là: ${mNum + nNum} ${mNum - nNum} ${(mNum / nNum).toFixed(2)}`
      ],
      explanation: isVi
        ? `Thực thi THÀNH CÔNG! m = ${mNum}, n = ${nNum}. Tổng = ${mNum + nNum}, Hiệu = ${mNum - nNum}, Thương = ${(mNum / nNum).toFixed(2)}.`
        : `SUCCESS! Output: sum = ${mNum + nNum}, diff = ${mNum - nNum}, div = ${(mNum / nNum).toFixed(2)}.`
    });
  };

  // Execute Task 2
  const runTask2 = () => {
    const rawN = task2N.trim();
    const n = Number(rawN);

    if (isNaN(n) || !Number.isInteger(n) || rawN.includes('.')) {
      setTask2Traceback({
        status: 'error',
        errorCode: 'ValueError',
        outputLines: [
          `Nhập số tự nhiên n: ${rawN}`,
          `Traceback (most recent call last):`,
          `  File "NhiemVu2.py", line 1, in <module>`,
          `    n = int(input("Nhập số tự nhiên n: "))`,
          `ValueError: invalid literal for int() with base 10: '${rawN}'`
        ],
        explanation: isVi
          ? `Lỗi ValueError: n = '${rawN}' không phải là số nguyên.`
          : `ValueError: invalid integer literal for n.`
      });
      return;
    }

    if (n < 0) {
      setTask2Traceback({
        status: 'error',
        errorCode: 'LogicError',
        outputLines: [
          `Nhập số tự nhiên n: ${n}`,
          `for k in range(${n}): -> vòng lặp không thực hiện do range(${n}) rỗng`,
          `Dãy đã nhập: []`
        ],
        explanation: isVi
          ? `Cảnh báo lỗi LÔGIC: n = ${n} là số âm, không phải số tự nhiên. Vòng lặp for không chạy và in ra danh sách rỗng A = [].`
          : `Logic warning: n = ${n} is negative; range(${n}) is empty, resulting in A = [].`
      });
      return;
    }

    const rawItems = task2Items.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const A: number[] = [];

    for (let k = 0; k < Math.min(n, rawItems.length); k++) {
      const valStr = rawItems[k];
      const val = Number(valStr);
      if (isNaN(val) || !Number.isInteger(val) || valStr.includes('.')) {
        setTask2Traceback({
          status: 'error',
          errorCode: 'ValueError',
          outputLines: [
            `Nhập số tự nhiên n: ${n}`,
            ...A.map((item, i) => `Nhập số thứ ${i + 1}: ${item}`),
            `Nhập số thứ ${k + 1}: ${valStr}`,
            `Traceback (most recent call last):`,
            `  File "NhiemVu2.py", line 4, in <module>`,
            `    num = int(input("Nhập số thứ " + str(k+1) + ": "))`,
            `ValueError: invalid literal for int() with base 10: '${valStr}'`
          ],
          explanation: isVi
            ? `Lỗi ValueError: Phần tử thứ ${k + 1} có giá trị '${valStr}' không phải số nguyên.`
            : `ValueError: item ${k + 1} with value '${valStr}' is not an integer.`
        });
        return;
      }
      A.push(val);
    }

    // Success
    setTask2Traceback({
      status: 'success',
      outputLines: [
        `Nhập số tự nhiên n: ${n}`,
        ...A.map((item, i) => `Nhập số thứ ${i + 1}: ${item}`),
        `Dãy đã nhập: [${A.join(', ')}]`
      ],
      explanation: isVi
        ? `Thực thi THÀNH CÔNG! Danh sách A gồm ${A.length} phần tử số nguyên: [${A.join(', ')}].`
        : `SUCCESS! Array A populated with [${A.join(', ')}].`
    });
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Terminal className="w-4 h-4" />
          {isVi ? 'Thực hành • SGK Trang 143 – 144' : 'Practical Lab • Pages 143 – 144'}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          {isVi ? 'Thực hành: Lập trình và kiểm tra khả năng sinh lỗi' : 'Practical Lab: Coding & Error Vulnerability Testing'}
        </h2>
        <p className="mt-2 text-blue-100 max-w-3xl text-sm md:text-base leading-relaxed">
          {isVi
            ? 'Trải nghiệm trực tiếp 2 nhiệm vụ lập trình SGK: Nhập 2 số m, n tính tổng hiệu thương (phân tích 3 kịch bản lỗi) và Nhập danh sách A gồm n số nguyên (phân tích lỗi ép kiểu và biên dữ liệu).'
            : 'Hands-on practice with the two official textbook tasks: Task 1 (Arithmetic on m, n) and Task 2 (Dynamic array input).'}
        </p>
      </div>

      {/* Nhiệm vụ 1: Nhập m, n và 3 kịch bản lỗi */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
            NV1
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {isVi ? 'Nhiệm vụ 1: Nhập hai số nguyên m, n và tính tổng, hiệu, thương' : 'Task 1: Input integers m, n and calculate sum, diff, quotient'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'SGK Tin học 10, Trang 143 – 144' : 'Textbook Pages 143 – 144'}
            </p>
          </div>
        </div>

        {/* Code Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto shadow-inner">
              <div className="text-slate-500 mb-2"># Mã nguồn theo hướng dẫn SGK Trang 144</div>
              <pre>{`s = input("Nhập hai số m, n cách nhau bởi dấu cách: ")
sline = s.split()
m, n = int(sline[0]), int(sline[1])
print("Tổng, hiệu, thương 2 số đã nhập là: ", m+n, m-n, m/n)`}</pre>
            </div>

            {/* Quick Presets for the 3 Error Scenarios */}
            <div>
              <span className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
                {isVi ? 'Chọn nhanh kịch bản kiểm thử lỗi:' : 'Select Test Scenarios:'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setTask1Input('12 4')}
                  className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-left hover:bg-emerald-100"
                >
                  <span className="font-bold block">✓ Chuẩn: "12 4"</span>
                  <span className="text-[10px] opacity-80">Chạy thành công</span>
                </button>
                <button
                  onClick={() => setTask1Input('15')}
                  className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-left hover:bg-rose-100"
                >
                  <span className="font-bold block">✗ Kịch bản 1: "15"</span>
                  <span className="text-[10px] opacity-80">Thiếu dấu cách ➔ IndexError</span>
                </button>
                <button
                  onClick={() => setTask1Input('10 2.5')}
                  className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-left hover:bg-amber-100"
                >
                  <span className="font-bold block">✗ Kịch bản 2: "10 2.5"</span>
                  <span className="text-[10px] opacity-80">Số thực vào int ➔ ValueError</span>
                </button>
                <button
                  onClick={() => setTask1Input('20 0')}
                  className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-200 text-left hover:bg-blue-100"
                >
                  <span className="font-bold block">✗ Kịch bản 3: "20 0"</span>
                  <span className="text-[10px] opacity-80">Chia cho 0 ➔ ZeroDivision</span>
                </button>
              </div>
            </div>

            {/* Custom Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                {isVi ? 'Giá trị nhập vào chuỗi input():' : 'Input string for input():'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={task1Input}
                  onChange={(e) => setTask1Input(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-mono"
                />
                <button
                  onClick={runTask1}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  {isVi ? 'Chạy thử' : 'Run'}
                </button>
              </div>
            </div>
          </div>

          {/* Traceback Terminal */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[260px] font-mono text-xs flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  Python Execution Traceback
                </span>
                {task1Traceback && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    task1Traceback.status === 'success'
                      ? 'bg-emerald-900 text-emerald-300'
                      : 'bg-rose-900 text-rose-300'
                  }`}>
                    {task1Traceback.errorCode || '200 OK'}
                  </span>
                )}
              </div>

              {task1Traceback ? (
                <div className="space-y-1.5">
                  {task1Traceback.outputLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.includes('Error:')
                          ? 'text-rose-400 font-bold bg-rose-950/40 p-1 rounded'
                          : line.includes('Traceback')
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      }
                    >
                      {line}
                    </div>
                  ))}
                  <div className="mt-4 p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-sans text-xs text-slate-300">
                    <strong className="text-amber-400 block mb-1">
                      {isVi ? 'Phân tích từ SGK:' : 'Textbook Diagnostic:'}
                    </strong>
                    {task1Traceback.explanation}
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic py-8 text-center">
                  {isVi ? 'Nhấn "Chạy thử" để kiểm tra kết quả hoặc sinh lỗi...' : 'Click "Run" to test execution...'}
                </p>
              )}
            </div>

            {task1Traceback && (
              <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setTask1Traceback(null)}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Đặt lại
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nhiệm vụ 2: Nhập n và danh sách A */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
            NV2
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {isVi ? 'Nhiệm vụ 2: Nhập số tự nhiên n và n số nguyên đưa vào danh sách A' : 'Task 2: Input natural number n and n integers into list A'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'SGK Tin học 10, Trang 144' : 'Textbook Page 144'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-purple-300 border border-slate-800 overflow-x-auto shadow-inner">
              <div className="text-slate-500 mb-2"># Mã nguồn theo hướng dẫn SGK Trang 144</div>
              <pre>{`n = int(input("Nhập số tự nhiên n: "))
A = []
for k in range(n):
    num = int(input("Nhập số thứ " + str(k+1) + ": "))
    A.append(num)
print("Dãy đã nhập: ", A)`}</pre>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  {isVi ? 'Số tự nhiên n:' : 'Natural number n:'}
                </label>
                <input
                  type="text"
                  value={task2N}
                  onChange={(e) => setTask2N(e.target.value)}
                  placeholder="3"
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  {isVi ? 'Các phần tử nhập vào (cách dấu phẩy):' : 'Elements (comma separated):'}
                </label>
                <input
                  type="text"
                  value={task2Items}
                  onChange={(e) => setTask2Items(e.target.value)}
                  placeholder="10, 20, 30"
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 font-mono"
                />
              </div>
            </div>

            {/* Test presets */}
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => {
                  setTask2N('3');
                  setTask2Items('5, 12, 9');
                }}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-mono"
              >
                Hợp lệ (n=3, [5, 12, 9])
              </button>
              <button
                onClick={() => {
                  setTask2N('năm');
                  setTask2Items('1, 2, 3');
                }}
                className="px-2.5 py-1 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-mono"
              >
                Lỗi n: int("năm") ➔ ValueError
              </button>
              <button
                onClick={() => {
                  setTask2N('3');
                  setTask2Items('10, abc, 30');
                }}
                className="px-2.5 py-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-mono"
              >
                Lỗi phần tử: int("abc") ➔ ValueError
              </button>
              <button
                onClick={() => {
                  setTask2N('-5');
                  setTask2Items('1, 2, 3');
                }}
                className="px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono"
              >
                Lỗi lôgic: n=-5 ➔ A = []
              </button>
            </div>

            <button
              onClick={runTask2}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4" />
              {isVi ? 'Thực thi chương trình nhập mảng' : 'Execute Array Input Program'}
            </button>
          </div>

          {/* Output */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 min-h-[260px] font-mono text-xs flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" />
                  Array Pipeline Output
                </span>
                {task2Traceback && (
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    task2Traceback.status === 'success'
                      ? 'bg-emerald-900 text-emerald-300'
                      : 'bg-rose-900 text-rose-300'
                  }`}>
                    {task2Traceback.errorCode || '200 OK'}
                  </span>
                )}
              </div>

              {task2Traceback ? (
                <div className="space-y-1.5">
                  {task2Traceback.outputLines.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.includes('ValueError:')
                          ? 'text-rose-400 font-bold bg-rose-950/40 p-1 rounded'
                          : line.includes('Traceback')
                          ? 'text-amber-400'
                          : line.includes('Dãy đã nhập:')
                          ? 'text-emerald-400 font-bold'
                          : 'text-slate-300'
                      }
                    >
                      {line}
                    </div>
                  ))}
                  <div className="mt-4 p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-sans text-xs text-slate-300">
                    <strong className="text-purple-400 block mb-1">
                      {isVi ? 'Phân tích từ SGK:' : 'Textbook Diagnostic:'}
                    </strong>
                    {task2Traceback.explanation}
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic py-8 text-center">
                  {isVi ? 'Nhấn "Thực thi" để kiểm tra nhập n và danh sách A...' : 'Click "Execute" to test list input...'}
                </p>
              )}
            </div>

            {task2Traceback && (
              <div className="mt-3 pt-2 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setTask2Traceback(null)}
                  className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Đặt lại
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
