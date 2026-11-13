import React, { useState } from 'react';
import {
  Code,
  Play,
  Check,
  Copy,
  Terminal,
  BookOpen,
  Lightbulb
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section18PracticeLab: React.FC = () => {
  const { bilingualMode } = useBook();

  // Task 1 State: Nhập m, n, p tính tổng
  const [valM, setValM] = useState<string>('12');
  const [valN, setValN] = useState<string>('34');
  const [valP, setValP] = useState<string>('54');
  const [task1Output, setTask1Output] = useState<string | null>(null);
  const [copiedTask1, setCopiedTask1] = useState(false);

  // Task 2 State: Nhập họ tên & tuổi
  const [studentName, setStudentName] = useState<string>('Nguyễn Hoà Bình');
  const [studentAge, setStudentAge] = useState<string>('15');
  const [task2Output, setTask2Output] = useState<string | null>(null);
  const [copiedTask2, setCopiedTask2] = useState(false);

  // Run Task 1
  const handleRunTask1 = () => {
    const m = parseInt(valM);
    const n = parseInt(valN);
    const p = parseInt(valP);
    if (isNaN(m) || isNaN(n) || isNaN(p)) {
      setTask1Output(
        bilingualMode === 'en'
          ? 'ValueError: invalid literal for int() with base 10: Please enter valid integers!'
          : 'ValueError: invalid literal for int() with base 10: Vui lòng nhập số nguyên hợp lệ!'
      );
    } else {
      const sum = m + n + p;
      if (bilingualMode === 'en') {
        setTask1Output(`Enter integer m: ${m}\nEnter integer n: ${n}\nEnter integer p: ${p}\nSum of three numbers is ${sum}`);
      } else {
        setTask1Output(`Nhập số nguyên m: ${m}\nNhập số nguyên n: ${n}\nNhập số nguyên p: ${p}\nTổng ba số đã nhập là ${sum}`);
      }
    }
  };

  // Run Task 2
  const handleRunTask2 = () => {
    const age = parseInt(studentAge);
    if (!studentName.trim()) {
      setTask2Output(
        bilingualMode === 'en'
          ? 'Error: Student name cannot be empty!'
          : 'Lỗi: Tên học sinh không được để trống!'
      );
    } else if (isNaN(age)) {
      setTask2Output(`ValueError: invalid literal for int() with base 10: '${studentAge}'`);
    } else {
      if (bilingualMode === 'en') {
        setTask2Output(`Enter student name: ${studentName}\nEnter age: ${age}\nYou ${studentName} are ${age} years old`);
      } else {
        setTask2Output(`Nhập họ tên học sinh: ${studentName}\nNhập tuổi: ${age}\nBạn ${studentName} ${age} tuổi`);
      }
    }
  };

  const copyToClipboard = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const task1Code = `m = int(input("Nhập số nguyên m: "))\nn = int(input("Nhập số nguyên n: "))\np = int(input("Nhập số nguyên p: "))\nprint("Tổng ba số đã nhập là", m + n + p)`;
  const task2Code = `ten = input("Nhập họ tên học sinh: ")\ntuoi = int(input("Nhập tuổi: "))\nprint("Bạn", ten, tuoi, "tuổi")`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 border border-emerald-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            <BilingualText
              vi="Thực hành • Trang 100 SGK Tin học 10"
              en="Practice Lab • Page 100 Informatics 10"
            />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          <BilingualText
            vi="THỰC HÀNH: Nhập dữ liệu từ bàn phím bằng lệnh input()"
            en="PRACTICE LAB: Reading Keyboard Data with input()"
          />
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          <BilingualText
            vi="Áp dụng trực tiếp cú pháp lồng int(input()) để nhập dữ liệu số nguyên và xuất kết quả chuẩn xác với print()."
            en="Apply nested int(input()) to read integer numbers safely and output formatted results with print()."
          />
        </p>
      </div>

      {/* 2. Nhiệm vụ 1: Nhập 3 số m, n, p tính tổng (Trang 100) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-1">
              {bilingualMode === 'en' ? 'Task 1 (Textbook Page 100)' : 'Nhiệm vụ 1 (Trang 100 SGK)'}
            </div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Viết chương trình nhập lần lượt ba số tự nhiên m, n, p, sau đó in ra tổng của ba số này"
                en="Write a program to input three integers m, n, p sequentially and print their sum"
              />
            </h3>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(task1Code, setCopiedTask1)}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition cursor-pointer"
          >
            {copiedTask1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>
              {copiedTask1
                ? bilingualMode === 'en'
                  ? 'Copied'
                  : 'Đã sao chép'
                : bilingualMode === 'en'
                  ? 'Copy Code'
                  : 'Sao chép mã'}
            </span>
          </button>
        </div>

        {/* Instructions Guide */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4" />
            <BilingualText
              vi="Hướng dẫn SGK:"
              en="Textbook Guidance:"
            />
          </span>
          <p>
            <BilingualText
              vi="Cần thực hiện lần lượt ba lệnh nhập các số m, n, p. Chú ý cách nhập số nguyên cần dùng lệnh int() để chuyển đổi dữ liệu nhập từ bàn phím."
              en="Perform three sequential input statements for m, n, p. Use int() to convert keyboard strings to integers."
            />
          </p>
        </div>

        {/* Interactive Lab Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Code Viewer */}
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span className="text-slate-200 font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-sky-400" />
                TongBaSo.py
              </span>
              <span className="text-[11px] text-slate-500">Python 3 Script</span>
            </div>

            <div className="p-4 space-y-1 text-slate-300 leading-relaxed">
              <div className="text-slate-500">
                {bilingualMode === 'en' ? '# 1. Read 3 integers m, n, p' : '# 1. Nhập ba số nguyên m, n, p'}
              </div>
              <div>
                <span className="text-sky-300">m</span> = <span className="text-yellow-400">int</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">"Nhập số nguyên m: "</span>))
              </div>
              <div>
                <span className="text-sky-300">n</span> = <span className="text-yellow-400">int</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">"Nhập số nguyên n: "</span>))
              </div>
              <div>
                <span className="text-sky-300">p</span> = <span className="text-yellow-400">int</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">"Nhập số nguyên p: "</span>))
              </div>
              <div className="text-slate-500 pt-1">
                {bilingualMode === 'en' ? '# 2. Print sum to screen' : '# 2. In tổng ra màn hình'}
              </div>
              <div>
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">"Tổng ba số đã nhập là"</span>, <span className="text-sky-300">m</span>{' '}
                + <span className="text-sky-300">n</span> + <span className="text-sky-300">p</span>)
              </div>
            </div>

            {/* Input fields simulator */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800 space-y-3">
              <div className="text-[11px] font-sans font-bold text-slate-300">
                <BilingualText
                  vi="Mô phỏng gõ phím từ người dùng:"
                  en="Simulate User Keystrokes:"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 font-sans">
                    {bilingualMode === 'en' ? 'Value m:' : 'Giá trị m:'}
                  </label>
                  <input
                    type="text"
                    value={valM}
                    onChange={(e) => setValM(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-sans">
                    {bilingualMode === 'en' ? 'Value n:' : 'Giá trị n:'}
                  </label>
                  <input
                    type="text"
                    value={valN}
                    onChange={(e) => setValN(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-sans">
                    {bilingualMode === 'en' ? 'Value p:' : 'Giá trị p:'}
                  </label>
                  <input
                    type="text"
                    value={valP}
                    onChange={(e) => setValP(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-sky-400"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleRunTask1}
                className="w-full py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-sans text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-sky-600/30 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Execute Program (Run / F5)' : 'Thực thi chương trình (F5 / Run)'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Python IDLE Shell Output
              </span>
              <span className="text-[10px] text-emerald-400">● READY</span>
            </div>

            <div className="p-4 flex-1 text-slate-300 space-y-1.5 whitespace-pre-line">
              {task1Output ? (
                <div className="text-emerald-300 animate-fadeIn">{task1Output}</div>
              ) : (
                <div className="text-slate-600 italic">
                  {bilingualMode === 'en'
                    ? 'Click "Execute Program" to observe input prompts and output sum.'
                    : 'Nhấn "Thực thi chương trình" để quan sát tiến trình nhập m, n, p và kết quả in ra màn hình.'}
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-900/40 border-t border-slate-800 text-[11px] font-sans text-slate-400">
              💡{' '}
              <em>
                {bilingualMode === 'en'
                  ? "Note: Without int(), m + n + p would concatenate strings: '12' + '34' + '54' = '123454'."
                  : "Lưu ý: Nếu không dùng hàm int(), m + n + p sẽ thành phép ghép xâu: '12' + '34' + '54' = '123454'."}
              </em>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Nhiệm vụ 2: Nhập họ tên & Tuổi học sinh (Trang 100) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-1">
              {bilingualMode === 'en' ? 'Task 2 (Textbook Page 100)' : 'Nhiệm vụ 2 (Trang 100 SGK)'}
            </div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Viết chương trình nhập họ tên, sau đó nhập tuổi của học sinh. Đưa ra thông báo: 'Bạn Nguyễn Hoà Bình 15 tuổi.'"
                en="Write a program to input full name and age of a student. Display: 'You Nguyen Hoa Binh are 15 years old.'"
              />
            </h3>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(task2Code, setCopiedTask2)}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition cursor-pointer"
          >
            {copiedTask2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>
              {copiedTask2
                ? bilingualMode === 'en'
                  ? 'Copied'
                  : 'Đã sao chép'
                : bilingualMode === 'en'
                  ? 'Copy Code'
                  : 'Sao chép mã'}
            </span>
          </button>
        </div>

        {/* Instructions Guide */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <span className="font-semibold text-purple-400 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4" />
            <BilingualText
              vi="Hướng dẫn SGK:"
              en="Textbook Guidance:"
            />
          </span>
          <p>
            <BilingualText
              vi="Cần thực hiện hai lệnh nhập dữ liệu, một lệnh nhập tên học sinh (giữ nguyên xâu kí tự str), lệnh thứ hai nhập tuổi (cần chuyển đổi sang kiểu số nguyên int), sau đó thông báo ra màn hình."
              en="Perform two input statements: one reads the name (as str), the second reads age (converted to int), then print formatted message."
            />
          </p>
        </div>

        {/* Interactive Lab Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Code Viewer */}
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span className="text-slate-200 font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-purple-400" />
                ThongTinHocSinh.py
              </span>
              <span className="text-[11px] text-slate-500">Python 3 Script</span>
            </div>

            <div className="p-4 space-y-1 text-slate-300 leading-relaxed">
              <div className="text-slate-500">
                {bilingualMode === 'en' ? '# 1. Read full name (type str)' : '# 1. Nhập họ tên (kiểu str)'}
              </div>
              <div>
                <span className="text-sky-300">ten</span> = <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">"Nhập họ tên học sinh: "</span>)
              </div>
              <div className="text-slate-500 pt-1">
                {bilingualMode === 'en' ? '# 2. Read age and cast to int' : '# 2. Nhập tuổi và ép sang số nguyên int'}
              </div>
              <div>
                <span className="text-sky-300">tuoi</span> = <span className="text-yellow-400">int</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">"Nhập tuổi: "</span>))
              </div>
              <div className="text-slate-500 pt-1">
                {bilingualMode === 'en' ? '# 3. Display output to screen' : '# 3. Xuất thông báo ra màn hình'}
              </div>
              <div>
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">"Bạn"</span>, <span className="text-sky-300">ten</span>,{' '}
                <span className="text-sky-300">tuoi</span>, <span className="text-emerald-300">"tuổi"</span>)
              </div>
            </div>

            {/* Input fields simulator */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800 space-y-3">
              <div className="text-[11px] font-sans font-bold text-slate-300">
                <BilingualText
                  vi="Thử nghiệm nhập thông tin học sinh:"
                  en="Test Student Information Input:"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 font-sans">
                    {bilingualMode === 'en' ? 'Student Name (str):' : 'Họ tên học sinh (xâu str):'}
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-sans">
                    {bilingualMode === 'en' ? 'Age (int):' : 'Tuổi (số nguyên int):'}
                  </label>
                  <input
                    type="text"
                    value={studentAge}
                    onChange={(e) => setStudentAge(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-purple-400"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleRunTask2}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-sans text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-purple-600/30 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Run Task 2 Program' : 'Chạy chương trình Nhiệm vụ 2'}</span>
              </button>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                Python IDLE Shell Output
              </span>
              <span className="text-[10px] text-purple-400">● READY</span>
            </div>

            <div className="p-4 flex-1 text-slate-300 space-y-1.5 whitespace-pre-line">
              {task2Output ? (
                <div className="text-purple-300 font-bold animate-fadeIn">{task2Output}</div>
              ) : (
                <div className="text-slate-600 italic">
                  {bilingualMode === 'en'
                    ? 'Click "Run Task 2" to see print() formatting in action.'
                    : 'Nhấn "Chạy chương trình" để xem định dạng in ghép chuỗi của lệnh print().'}
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-900/40 border-t border-slate-800 text-[11px] font-sans text-slate-400">
              💡{' '}
              <em>
                {bilingualMode === 'en'
                  ? 'Note: Arguments in print() separated by commas automatically insert a space when printed on screen.'
                  : 'Lưu ý: Các đối số trong lệnh print() ngăn cách nhau bằng dấu phẩy sẽ tự động có một khoảng trắng cách nhau khi hiển thị trên màn hình.'}
              </em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
