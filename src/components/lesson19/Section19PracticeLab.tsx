import React, { useState } from 'react';
import {
  Code,
  Play,
  Check,
  Copy,
  Terminal,
  BookOpen,
  Zap,
  Lightbulb
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section19PracticeLab: React.FC = () => {
  const { bilingualMode } = useBook();

  // Task 1: Check Even / Odd
  const [inputN, setInputN] = useState<string>('24');
  const [task1Output, setTask1Output] = useState<string | null>(null);
  const [copiedTask1, setCopiedTask1] = useState(false);

  // Task 2: Electricity Bill
  const [inputKwh, setInputKwh] = useState<string>('85');
  const [task2Output, setTask2Output] = useState<string | null>(null);
  const [copiedTask2, setCopiedTask2] = useState(false);

  const handleRunTask1 = () => {
    const n = parseInt(inputN);
    if (isNaN(n)) {
      setTask1Output(
        bilingualMode === 'en'
          ? 'ValueError: invalid literal for int() with base 10: Please enter a valid integer!'
          : 'ValueError: invalid literal for int() with base 10: Vui lòng nhập số tự nhiên hợp lệ!'
      );
    } else {
      const isEven = n % 2 === 0;
      if (bilingualMode === 'en') {
        setTask1Output(`Enter integer n: ${n}\nThe entered number is ${isEven ? 'even' : 'odd'}.`);
      } else {
        setTask1Output(`Nhập số tự nhiên n: ${n}\nSố đã nhập là ${isEven ? 'số chẵn' : 'số lẻ'}.`);
      }
    }
  };

  const handleRunTask2 = () => {
    const k = parseFloat(inputKwh);
    if (isNaN(k) || k < 0) {
      setTask2Output(
        bilingualMode === 'en'
          ? 'Error: Electricity usage in kWh must be a non-negative number!'
          : 'Lỗi: Số điện tiêu thụ kWh phải là số thực không âm!'
      );
      return;
    }

    let t = 0;
    let breakdown = '';
    if (k <= 50) {
      t = k * 1.678;
      breakdown = `Tier 1: ${k} kWh × 1.678 = ${t.toFixed(3)}`;
    } else if (k <= 100) {
      t = 50 * 1.678 + (k - 50) * 1.734;
      breakdown = `Tier 1 (50×1.678=83.9) + Tier 2 (${k - 50}×1.734=${((k - 50) * 1.734).toFixed(3)}) = ${t.toFixed(3)}`;
    } else {
      t = 50 * 1.678 + 50 * 1.734 + (k - 100) * 2.014;
      breakdown = `Tier 1 (83.9) + Tier 2 (86.7) + Tier 3 (${k - 100}×2.014=${((k - 100) * 2.014).toFixed(3)}) = ${t.toFixed(3)}`;
    }

    const roundedT = Math.round(t);
    if (bilingualMode === 'en') {
      setTask2Output(
        `Enter electricity usage in kWh: ${k}\nBreakdown: ${breakdown}\nAmount due: ${roundedT} thousand VND`
      );
    } else {
      setTask2Output(
        `Nhập số kwh tiêu thụ điện nhà em: ${k}\nChi tiết: ${breakdown}\nSố tiền điện phải trả là: ${roundedT} nghìn đồng`
      );
    }
  };

  const copyToClipboard = (text: string, setFn: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const isEn = bilingualMode === 'en';

  const task1Code = isEn
    ? `n = int(input("Enter natural number n: "))\nif n%2 == 0:\n    print("The entered number is even.")\nelse:\n    print("The entered number is odd.")`
    : `n = int(input("Nhập số tự nhiên n: "))\nif n%2 == 0:\n    print("Số đã nhập là số chẵn.")\nelse:\n    print("Số đã nhập là số lẻ.")`;

  const task2Code = isEn
    ? `k = float(input("Enter electricity usage in kWh: "))\nif k <= 50:\n    t = k * 1.678\nelse:\n    if k <= 100:\n        t = 50 * 1.678 + (k - 50) * 1.734\n    else:\n        t = 50 * 1.678 + 50 * 1.734 + (k - 100) * 2.014\nprint("Amount due:", round(t), "thousand VND")`
    : `k = float(input("Nhập số kwh tiêu thụ điện nhà em: "))\nif k <= 50:\n    t = k * 1.678\nelse:\n    if k <= 100:\n        t = 50 * 1.678 + (k - 50) * 1.734\n    else:\n        t = 50 * 1.678 + 50 * 1.734 + (k - 100) * 2.014\nprint("Số tiền điện phải trả là:", round(t), "nghìn đồng")`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 border border-emerald-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            <BilingualText
              vi="Thực hành • Trang 103 – 104 SGK Tin học 10"
              en="Practice Lab • Pages 103 – 104 Informatics 10"
            />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          <BilingualText
            vi="THỰC HÀNH: Các bài tập liên quan đến kiểu dữ liệu bool và lệnh if"
            en="PRACTICE LAB: Exercises with bool Data Types and if Statements"
          />
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          <BilingualText
            vi="Ứng dụng lệnh rẽ nhánh if để giải quyết hai bài toán kinh điển: phân loại tính chất số chẵn/lẻ qua phép chia lấy dư và tính tiền điện sinh hoạt luỹ kế nhiều bậc thang theo biểu giá thực tế."
            en="Apply the if statement to two classic algorithmic challenges: parity checking via modulo and tiered progressive household electricity bill calculation."
          />
        </p>
      </div>

      {/* 2. Nhiệm vụ 1: Kiểm tra chẵn hay lẻ (Trang 103) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-1">
              {bilingualMode === 'en' ? 'Task 1 (Textbook Page 103)' : 'Nhiệm vụ 1 (Trang 103 SGK)'}
            </div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Viết chương trình nhập số tự nhiên n từ bàn phím. Sau đó thông báo số em đã nhập là số chẵn hay số lẻ"
                en="Write a program to input natural number n from keyboard and print whether it is even or odd"
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

        {/* Instructions */}
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
              vi="Để kiểm tra một số tự nhiên n là chẵn hay lẻ, ta dùng phép toán lấy số dư n % 2. Nếu số dư bằng 0 thì n là số chẵn, ngược lại n là số lẻ."
              en="To check parity of natural number n, use modulo operator n % 2. If remainder is 0, n is even; otherwise n is odd."
            />
          </p>
        </div>

        {/* Code & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span className="text-slate-200 font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                ChanLe.py
              </span>
              <span className="text-[11px] text-slate-500">Python 3 Script</span>
            </div>

            <div className="p-4 space-y-1 text-slate-300 leading-relaxed">
              <div>
                <span className="text-sky-300">n</span> = <span className="text-yellow-400">int</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">
                  {isEn ? '"Enter natural number n: "' : '"Nhập số tự nhiên n: "'}
                </span>))
              </div>
              <div>
                <span className="text-purple-400 font-bold">if</span> <span className="text-sky-300">n % 2 == 0</span>:
              </div>
              <div className="pl-6 text-emerald-300">
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">
                  {isEn ? '"The entered number is even."' : '"Số đã nhập là số chẵn."'}
                </span>)
              </div>
              <div>
                <span className="text-purple-400 font-bold">else</span>:
              </div>
              <div className="pl-6 text-sky-300">
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">
                  {isEn ? '"The entered number is odd."' : '"Số đã nhập là số lẻ."'}
                </span>)
              </div>
            </div>

            {/* Input simulator */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center gap-3">
              <label className="text-xs text-slate-300 font-sans">
                {bilingualMode === 'en' ? 'Value n:' : 'Giá trị n:'}
              </label>
              <input
                type="text"
                value={inputN}
                onChange={(e) => setInputN(e.target.value)}
                className="w-28 px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={handleRunTask1}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-600/30 ml-auto cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Run Program' : 'Chạy chương trình'}</span>
              </button>
            </div>
          </div>

          {/* Output Terminal */}
          <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                IDLE Shell Output
              </span>
              <span className="text-[10px] text-emerald-400">● READY</span>
            </div>

            <div className="p-4 flex-1 text-slate-300 space-y-1 whitespace-pre-line">
              {task1Output ? (
                <div className="text-emerald-300 font-bold animate-fadeIn">{task1Output}</div>
              ) : (
                <div className="text-slate-600 italic">
                  {bilingualMode === 'en'
                    ? 'Click "Run Program" to test whether n is even or odd...'
                    : 'Nhấn "Chạy chương trình" để kiểm tra số chẵn hay số lẻ...'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Nhiệm vụ 2: Tính tiền điện sinh hoạt luỹ kế (Trang 104) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-1">
              {bilingualMode === 'en' ? 'Task 2 (Textbook Page 104)' : 'Nhiệm vụ 2 (Trang 104 SGK)'}
            </div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Tính giá điện sinh hoạt luỹ kế theo từng tháng (3 bậc thang đơn giá)"
                en="Monthly Progressive Household Electricity Bill (3-Tier Pricing)"
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

        {/* Instructions Table */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
          <span className="font-semibold text-amber-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4" />
            <BilingualText
              vi="Biểu giá điện luỹ kế 3 bậc (SGK Trang 104):"
              en="3-Tier Electricity Tariff (Page 104):"
            />
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-sky-300 font-bold">
                {bilingualMode === 'en' ? 'Tier 1 (0 – 50 kWh):' : 'Mức 1 (0 – 50 kWh):'}
              </div>
              <div className="text-slate-300">
                1.678 {bilingualMode === 'en' ? 'k-VND/kWh' : 'nghìn đồng/kWh'}
              </div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-amber-300 font-bold">
                {bilingualMode === 'en' ? 'Tier 2 (51 – 100 kWh):' : 'Mức 2 (51 – 100 kWh):'}
              </div>
              <div className="text-slate-300">
                1.734 {bilingualMode === 'en' ? 'k-VND/kWh' : 'nghìn đồng/kWh'}
              </div>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <div className="text-rose-300 font-bold">
                {bilingualMode === 'en' ? 'Tier 3 (> 100 kWh):' : 'Mức 3 (> 100 kWh):'}
              </div>
              <div className="text-slate-300">
                2.014 {bilingualMode === 'en' ? 'k-VND/kWh' : 'nghìn đồng/kWh'}
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            <BilingualText
              vi="* Sử dụng lệnh round(t) để làm tròn số thực. Trong máy tính dùng dấu chấm '.' để viết số thập phân (1.678 thay vì 1,678)."
              en="* Use round(t) to round float results. Use dot '.' for decimal notation (1.678)."
            />
          </p>
        </div>

        {/* Code & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span className="text-slate-200 font-semibold flex items-center gap-2">
                <Code className="w-4 h-4 text-amber-400" />
                TienDien.py
              </span>
              <span className="text-[11px] text-slate-500">
                {bilingualMode === 'en' ? 'Nested if-else' : 'Lồng lệnh if-else'}
              </span>
            </div>

            <div className="p-4 space-y-1 text-slate-300 leading-relaxed">
              <div>
                <span className="text-sky-300">k</span> = <span className="text-emerald-400">float</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">
                  {isEn ? '"Enter electricity usage in kWh: "' : '"Nhập số kwh tiêu thụ điện nhà em: "'}
                </span>))
              </div>
              <div>
                <span className="text-purple-400 font-bold">if</span> <span className="text-sky-300">k &lt;= 50</span>:
              </div>
              <div className="pl-6 text-slate-200">
                <span className="text-sky-300">t</span> = <span className="text-sky-300">k</span> *{' '}
                <span className="text-amber-300">1.678</span>
              </div>
              <div>
                <span className="text-purple-400 font-bold">else</span>:
              </div>
              <div className="pl-6 space-y-1">
                <div>
                  <span className="text-purple-400 font-bold">if</span> <span className="text-sky-300">k &lt;= 100</span>:
                </div>
                <div className="pl-6 text-slate-200">
                  <span className="text-sky-300">t</span> = <span className="text-amber-300">50 * 1.678</span> + (
                  <span className="text-sky-300">k</span> - 50) * <span className="text-amber-300">1.734</span>
                </div>
                <div>
                  <span className="text-purple-400 font-bold">else</span>:
                </div>
                <div className="pl-6 text-slate-200">
                  <span className="text-sky-300">t</span> = <span className="text-amber-300">50 * 1.678</span> +{' '}
                  <span className="text-amber-300">50 * 1.734</span> + (<span className="text-sky-300">k</span> - 100) *{' '}
                  <span className="text-amber-300">2.014</span>
                </div>
              </div>
              <div className="pt-1">
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">{isEn ? '"Amount due:"' : '"Số tiền điện phải trả là:"'}</span>,{' '}
                <span className="text-yellow-400">round</span>(<span className="text-sky-300">t</span>),{' '}
                <span className="text-emerald-300">{isEn ? '"thousand VND"' : '"nghìn đồng"'}</span>)
              </div>
            </div>

            {/* Input simulator */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center gap-3">
              <label className="text-xs text-slate-300 font-sans">
                {bilingualMode === 'en' ? 'kWh usage (k):' : 'Số kWh (k):'}
              </label>
              <input
                type="text"
                value={inputKwh}
                onChange={(e) => setInputKwh(e.target.value)}
                className="w-28 px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:border-amber-400"
              />
              <button
                type="button"
                onClick={handleRunTask2}
                className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-sans text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-amber-600/30 ml-auto cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Calculate Bill' : 'Tính tiền điện'}</span>
              </button>
            </div>
          </div>

          {/* Output Terminal */}
          <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col font-mono text-xs">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                IDLE Shell Output
              </span>
              <span className="text-[10px] text-amber-400">● READY</span>
            </div>

            <div className="p-4 flex-1 text-slate-300 space-y-1.5 whitespace-pre-line">
              {task2Output ? (
                <div className="text-amber-300 font-bold animate-fadeIn">{task2Output}</div>
              ) : (
                <div className="text-slate-600 italic">
                  {bilingualMode === 'en'
                    ? 'Enter kWh and click "Calculate Bill" to view tiered pricing output.'
                    : 'Nhập số kWh và nhấn "Tính tiền điện" để quan sát công thức phân tầng bậc thang.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
