import React, { useState } from 'react';
import { Code2, Play, RotateCcw, CheckCircle2, Terminal, ArrowRight, UserCheck, Sparkles, Layers } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section25PracticeLab: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  const [activeTask, setActiveTask] = useState<1 | 2 | 3>(1);

  // Task 1 State: Input integers separated by spaces
  const [task1Input, setTask1Input] = useState<string>('12 45 8 99 104 3 67');
  const [task1Output, setTask1Output] = useState<{ n: number; nums: number[] } | null>(null);

  // Task 2 State: Text normalization (multiple spaces)
  const [task2Input, setTask2Input] = useState<string>('   Trường    học     thân     thiện,     học   sinh    tích   cực   ');
  const [task2Output, setTask2Output] = useState<string | null>(null);

  // Task 3 State: Student Names splitting into 2 columns (ten & hodem)
  const [task3Students, setTask3Students] = useState<string[]>([
    'Nguyễn Văn An',
    'Trần Thị Mai Hương',
    'Lê Hoàng Nam',
    'Phạm Quốc Đạt',
    'Vũ Thuỳ Linh'
  ]);
  const [task3CustomName, setTask3CustomName] = useState<string>('');
  const [task3Output, setTask3Output] = useState<{ ten: string; hodem: string }[] | null>(null);

  // Task 1 Runner
  const runTask1 = () => {
    const sline = task1Input.trim().split(/\s+/).filter(Boolean);
    const n = sline.length;
    const nums: number[] = [];
    for (const x of sline) {
      const val = parseInt(x, 10);
      if (!isNaN(val)) nums.push(val);
    }
    setTask1Output({ n, nums });
  };

  // Task 2 Runner
  const runTask2 = () => {
    // Exact Python behavior: s.split() collapses any sequence of whitespace
    const sline = task2Input.trim().split(/\s+/).filter(Boolean);
    const skq = sline.join(' ');
    setTask2Output(skq);
  };

  // Task 3 Runner
  const runTask3 = () => {
    const list = task3Students.map((s) => {
      const sline = s.trim().split(/\s+/).filter(Boolean);
      if (sline.length === 0) return { ten: '', hodem: '' };
      const m = sline.length - 1;
      const ten = sline[m];
      const remaining = sline.slice(0, m);
      const hodem = remaining.join(' ');
      return { ten, hodem };
    });
    setTask3Output(list);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full w-fit border border-emerald-500/20">
          <span>{isEn ? 'Section 3: Practical Lab' : 'Mục 3: Thực hành'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 125 – 126' : 'Trang 125 – 126 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '3. Practical Lab: 3 String Processing Tasks' : '3. Thực Hành: Một Số Bài Toán Liên Quan Đến Xâu Kí Tự'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Execute three official textbook practical programming assignments using split(), join(), and string conversions.'
            : 'Thực hành giải 3 bài toán kinh điển trong SGK: nhập mảng số trên một dòng, chuẩn hoá khoảng trắng văn bản, và tách danh sách học sinh thành 2 cột Họ đệm và Tên.'}
        </p>
      </div>

      {/* Task Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTask(1)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTask === 1
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>{isEn ? 'Task 1: Space-Separated Numbers' : 'Nhiệm vụ 1: Nhập dãy số cách nhau bởi dấu cách'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTask(2)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTask === 2
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isEn ? 'Task 2: Text Normalization' : 'Nhiệm vụ 2: Chuẩn hoá khoảng trắng văn bản'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTask(3)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeTask === 3
              ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>{isEn ? 'Task 3: 2-Column Name Split' : 'Nhiệm vụ 3: Tách họ tên học sinh 2 cột'}</span>
        </button>
      </div>

      {/* TASK 1: Nhập nhiều số nguyên từ bàn phím */}
      {activeTask === 1 && (
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6 shadow-xl space-y-5 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <Terminal className="w-4 h-4" />
              <span>{isEn ? 'Task 1 • Page 125 SGK' : 'Nhiệm vụ 1 • Trang 125 SGK'}</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              {isEn
                ? 'Task 1: Input integers separated by spaces, report count and print horizontally'
                : 'Nhiệm vụ 1: Nhập nhiều số nguyên từ bàn phím, thông báo số lượng và in hàng ngang'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Data input is a string. Use split() to divide into a list, convert elements to integers via int(), then print count and items.'
                : 'Dữ liệu nhập vào là một xâu. Dùng lệnh split() để tách thành danh sách. Chuyển các phần tử của danh sách này thành số và in ra màn hình.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Textbook Code Display */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>chuong_trinh_nv1.py</span>
                <span className="text-emerald-400 font-bold">{isEn ? 'Textbook Page 125' : 'SGK Trang 125'}</span>
              </div>
              <pre className="p-3 bg-black/70 rounded-lg font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-slate-800/80">
{`s = input("Nhập các số nguyên cách nhau bởi dấu cách: ")
sline = s.split()
n = len(sline)
nline = []
for x in sline:
    nline.append(int(x))
print("Bạn đã nhập", n, "số.")
for k in nline:
    print(k, end = " ")`}
              </pre>
            </div>

            {/* Interactive Runner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300">
                  {isEn ? 'Input integers string (separated by spaces):' : 'Nhập xâu số nguyên (cách nhau bởi dấu cách):'}
                </label>
                <input
                  type="text"
                  value={task1Input}
                  onChange={(e) => setTask1Input(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-emerald-500 outline-hidden"
                  placeholder={isEn ? "Example: 12 45 8 99 104 3 67" : "Ví dụ: 12 45 8 99 104 3 67"}
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={runTask1}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Run Python Program' : 'Chạy chương trình'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTask1Input('5 10 15 20 25 30');
                      setTask1Output(null);
                    }}
                    className="px-3 py-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    {isEn ? 'Sample 2' : 'Mẫu 2'}
                  </button>
                </div>
              </div>

              {/* Output Display */}
              {task1Output && (
                <div className="p-3.5 rounded-xl bg-black/80 border border-emerald-500/40 font-mono text-xs space-y-1.5 animate-in fade-in duration-200">
                  <div className="text-slate-400 text-[11px] flex items-center gap-1 border-b border-slate-800 pb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isEn ? 'Standard Output (Console):' : 'Màn hình xuất (Standard Output):'}</span>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    {isEn ? `You entered ${task1Output.n} numbers.` : `Bạn đã nhập ${task1Output.n} số.`}
                  </div>
                  <div className="text-sky-300 font-bold">
                    {task1Output.nums.join(' ')}{' '}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TASK 2: Chuẩn hoá khoảng trắng văn bản */}
      {activeTask === 2 && (
        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 shadow-xl space-y-5 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span>{isEn ? 'Task 2 • Page 126 SGK' : 'Nhiệm vụ 2 • Trang 126 SGK'}</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              {isEn
                ? 'Task 2: Text Normalization - Compress Multiple Spaces to a Single Space'
                : 'Nhiệm vụ 2: Chuẩn hoá xâu kí tự - Rút gọn nhiều dấu cách thừa về đúng 1 dấu cách'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Convert input text to list of words using split(), then rejoin with a single space using " ".join(sline).'
                : 'Chuyển xâu kí tự ban đầu thành danh sách các từ đơn bằng lệnh split(), sau đó nối các từ đơn này bằng lệnh " ".join(sline).'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Textbook Code Display */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>chuan_hoa_xau.py</span>
                <span className="text-indigo-400 font-bold">{isEn ? 'Textbook Page 126' : 'SGK Trang 126'}</span>
              </div>
              <pre className="p-3 bg-black/70 rounded-lg font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-slate-800/80">
{`s = input("Nhập đoạn văn bản: \\n")
sline = s.split()
skq = " ".join(sline)
print(skq)`}
              </pre>
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-300">
                💡 <strong>{isEn ? 'Core Insight:' : 'Bí quyết cốt lõi:'}</strong>{' '}
                {isEn
                  ? 'Calling s.split() with no arguments automatically collapses and skips arbitrary leading, trailing, and internal whitespace! Rejoining with " ".join() produces perfectly normalized text.'
                  : 'Lệnh s.split() không truyền tham số sẽ tự động bỏ qua mọi khoảng trắng thừa (nhiều dấu cách ở đầu, cuối và giữa các từ), nên khi nối lại bằng " ".join() sẽ thu được văn bản chuẩn mực!'}
              </div>
            </div>

            {/* Interactive Runner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300">
                  {isEn ? 'Raw text with irregular spaces:' : 'Nhập đoạn văn bản có nhiều dấu cách bất quy tắc:'}
                </label>
                <textarea
                  rows={3}
                  value={task2Input}
                  onChange={(e) => setTask2Input(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-indigo-500 outline-hidden"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={runTask2}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isEn ? 'Normalize with Python' : 'Thực hiện chuẩn hoá'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTask2Input('    Học    đi   đôi    với    hành    ');
                      setTask2Output(null);
                    }}
                    className="px-3 py-2 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    {isEn ? 'Sample 2' : 'Mẫu 2'}
                  </button>
                </div>
              </div>

              {/* Output Display */}
              {task2Output !== null && (
                <div className="p-3.5 rounded-xl bg-black/80 border border-indigo-500/40 font-mono text-xs space-y-1.5 animate-in fade-in duration-200">
                  <div className="text-slate-400 text-[11px] flex items-center gap-1 border-b border-slate-800 pb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{isEn ? 'Normalized output (skq):' : 'Kết quả sau chuẩn hoá (skq):'}</span>
                  </div>
                  <div className="text-emerald-400 font-bold p-2 bg-slate-900 rounded border border-slate-800">
                    "{task2Output}"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TASK 3: Tách họ tên học sinh thành 2 cột */}
      {activeTask === 3 && (
        <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 p-6 shadow-xl space-y-5 animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
              <UserCheck className="w-4 h-4" />
              <span>{isEn ? 'Task 3 • Page 126 SGK' : 'Nhiệm vụ 3 • Trang 126 SGK'}</span>
            </div>
            <h3 className="font-bold text-lg text-white">
              {isEn
                ? 'Task 3: Decompose Student Names into Two Columns: Given Name & Surname/Middle'
                : 'Nhiệm vụ 3: Nhập n học sinh, in danh sách tên theo hai cột: Cột 1 là Tên, Cột 2 là Họ đệm'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isEn
                ? 'Split full name into words. The last element is the given name (ten). Delete it and join remaining words to get surname/middle name (hodem).'
                : 'Họ tên ban đầu tách ra thành tên và họ đệm bằng split(). Tên nằm ở cuối cùng (chỉ số m = len(sline)-1), xoá tên và dùng join() ghép lại thành họ đệm.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Textbook Code Display */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>tach_ho_ten.py</span>
                <span className="text-sky-400 font-bold">{isEn ? 'Textbook Page 126' : 'SGK Trang 126'}</span>
              </div>
              <pre className="p-3 bg-black/70 rounded-lg font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed border border-slate-800/80">
{`n = int(input("Nhập số học sinh trong lớp: "))
ten = []
hodem = []
for i in range(n):
    s = input("Nhập họ tên học sinh thứ " + str(i+1) + ": ")
    sline = s.split()
    m = len(sline) - 1
    ten.append(sline[m])
    del sline[m]
    hodem.append(" ".join(sline))
print("Danh sách học sinh:")
for i in range(n):
    print(ten[i], hodem[i])`}
              </pre>
            </div>

            {/* Interactive Runner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    {isEn ? `Current student roster (n = ${task3Students.length}):` : `Danh sách học sinh (n = ${task3Students.length}):`}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setTask3Students([
                        'Nguyễn Văn An',
                        'Trần Thị Mai Hương',
                        'Lê Hoàng Nam',
                        'Phạm Quốc Đạt',
                        'Vũ Thuỳ Linh'
                      ]);
                      setTask3Output(null);
                    }}
                    className="text-[11px] text-sky-400 hover:underline cursor-pointer"
                  >
                    {isEn ? 'Reset to default' : 'Đặt lại mặc định'}
                  </button>
                </div>

                {/* Name pills */}
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-900 border border-slate-800 max-h-28 overflow-y-auto">
                  {task3Students.map((st, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-xs bg-slate-800 text-slate-200 font-mono border border-slate-700 flex items-center gap-1"
                    >
                      <span className="text-slate-500">{i + 1}.</span> {st}
                    </span>
                  ))}
                </div>

                {/* Add Custom Name Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={task3CustomName}
                    onChange={(e) => setTask3CustomName(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-sky-500 outline-hidden"
                    placeholder={isEn ? "Add new name (e.g. Dang Thu Trang)..." : "Thêm tên mới (ví dụ: Đặng Thu Trang)..."}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (task3CustomName.trim()) {
                        setTask3Students([...task3Students, task3CustomName.trim()]);
                        setTask3CustomName('');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-sky-300 cursor-pointer font-semibold"
                  >
                    {isEn ? 'Add' : 'Thêm'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={runTask3}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isEn ? 'Decompose & Print 2 Columns' : 'Chạy chương trình tách 2 cột'}</span>
                </button>
              </div>

              {/* Output Display - Table of 2 columns */}
              {task3Output && (
                <div className="p-3.5 rounded-xl bg-black/80 border border-sky-500/40 font-mono text-xs space-y-2 animate-in fade-in duration-200">
                  <div className="text-slate-400 text-[11px] flex items-center justify-between border-b border-slate-800 pb-1">
                    <span className="font-bold text-sky-400">{isEn ? 'Student roster (Console output):' : 'Danh sách học sinh (Màn hình console):'}</span>
                    <span>{task3Output.length} {isEn ? 'students' : 'học sinh'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-bold pb-1 border-b border-slate-800 text-slate-400">
                    <span className="text-emerald-400">{isEn ? 'Col 1: GIVEN NAME' : 'Cột 1: TÊN'}</span>
                    <span className="text-sky-400">{isEn ? 'Col 2: SURNAME / MIDDLE' : 'Cột 2: HỌ ĐỆM'}</span>
                  </div>

                  <div className="space-y-1 max-h-36 overflow-y-auto">
                    {task3Output.map((row, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-2 text-xs py-0.5 border-b border-slate-900/60">
                        <span className="text-emerald-300 font-bold">{row.ten}</span>
                        <span className="text-slate-300">{row.hodem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
