import React, { useState } from 'react';
import {
  Code,
  GitBranch,
  Split,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section19IfStatements: React.FC = () => {
  const { bilingualMode } = useBook();

  // Hoạt động 2 interactive state
  const [valN, setValN] = useState<number>(5);
  const [act2Output, setAct2Output] = useState<string | null>('n là số lớn hơn 0');

  // Absolute difference |a - b| interactive demo
  const [valA, setValA] = useState<number>(7);
  const [valB, setValB] = useState<number>(12);
  const [absOutput, setAbsOutput] = useState<number>(5);

  const handleRunAct2 = (num: number) => {
    setValN(num);
    if (num > 0) {
      setAct2Output(bilingualMode === 'en' ? 'n is greater than 0' : 'n là số lớn hơn 0');
    } else {
      setAct2Output(bilingualMode === 'en' ? '(Nothing printed - Block skipped)' : '(Không in gì cả - Bỏ qua khối lệnh)');
    }
  };

  const handleRunAbs = (a: number, b: number) => {
    setValA(a);
    setValB(b);
    if (a > b) {
      setAbsOutput(a - b);
    } else {
      setAbsOutput(b - a);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 border border-sky-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            <BilingualText
              vi="Mục 2 • Trang 102 – 103 SGK Tin học 10"
              en="Section 2 • Pages 102 – 103 Informatics 10"
            />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          <BilingualText
            vi="2. Câu lệnh rẽ nhánh if trong Python"
            en="2. The if Branching Statement in Python"
          />
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          <BilingualText
            vi="Python hỗ trợ hai cấu trúc rẽ nhánh cơ bản: dạng thiếu (chỉ có nhánh if) và dạng đủ (có cả if và else). Cú pháp Python yêu cầu dấu hai chấm : sau mỗi điều kiện và các khối lệnh phải thụt lề (Indentation) thẳng hàng."
            en="Python provides two core conditional structures: single-branch (if only) and dual-branch (if-else). Python syntax strictly enforces a colon : following conditions, and statement blocks must be uniformly indented."
          />
        </p>
      </div>

      {/* 2. Hoạt động 2: Cấu trúc lệnh if (Trang 102) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Hoạt động 2: Khám phá cấu trúc lệnh if trong Python (Trang 102)"
                en="Activity 2: Discovering if Syntax in Python (Page 102)"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="Kiểm tra số tự nhiên n > 0 thì thông báo 'n là số lớn hơn 0'"
                en="Test if n > 0, then print 'n is greater than 0'"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Code Viewer */}
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs space-y-2">
            <div className="text-slate-500 pb-1 border-b border-slate-800 flex justify-between">
              <span>Python Code Snippet (Hoạt động 2)</span>
              <span className="text-amber-400">
                {bilingualMode === 'en' ? 'Notice ":" and Indentation' : 'Chú ý dấu ":" và thụt lề'}
              </span>
            </div>
            <div className="text-slate-300">
              <span className="text-purple-400 font-bold">if</span> <span className="text-sky-300">n &gt; 0</span>
              <span className="text-yellow-400 font-bold text-sm">:</span>
            </div>
            <div className="pl-6 text-slate-200 bg-slate-900/60 py-1 rounded border-l-2 border-emerald-500">
              <span className="text-purple-400">print</span>(
              <span className="text-emerald-300">
                "{bilingualMode === 'en' ? 'n is greater than 0' : 'n là số lớn hơn 0'}"
              </span>
              )
            </div>
          </div>

          {/* Interactive Tester */}
          <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
            <div className="text-xs font-bold text-slate-300">
              <BilingualText
                vi="Thử nghiệm giá trị của biến n:"
                en="Test with variable n:"
              />
            </div>
            <div className="flex gap-2">
              {[5, 0, -4].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => handleRunAct2(num)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition border cursor-pointer ${
                    valN === num
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  n = {num}
                </button>
              ))}
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono">
              <div className="text-slate-400 text-[10px] pb-1">
                {bilingualMode === 'en' ? 'Output Console:' : 'Kết quả thực thi màn hình:'}
              </div>
              <div
                className={`font-bold ${
                  valN > 0 ? 'text-emerald-300' : 'text-slate-500 italic'
                }`}
              >
                {act2Output}
              </div>
            </div>
          </div>
        </div>

        {/* 2 Observations from Textbook */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <BilingualText
              vi="Nhận xét quy chuẩn cấu trúc lệnh if:"
              en="Key Syntactical Rules for if Statements:"
            />
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>
              <BilingualText
                vi="Sau <điều kiện> lệnh if bắt buộc phải có dấu hai chấm ':'."
                en="Following <condition>, a colon ':' is mandatory."
              />
            </li>
            <li>
              <BilingualText
                vi="Lệnh print() (và toàn bộ các câu lệnh trong khối) phải được viết lùi vào (thụt lề) và thẳng hàng với nhau, mặc định là 1 phím Tab hoặc 4 dấu cách."
                en="All statements inside the conditional block must be indented uniformly (standard 4 spaces or 1 Tab)."
              />
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Phân biệt Rẽ nhánh dạng thiếu vs Dạng đủ (Hình 19.2 & Hình 19.3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Dạng thiếu */}
        <div className="rounded-2xl bg-slate-900 border border-sky-500/30 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Split className="w-4 h-4 text-sky-400" />
              <h3 className="font-bold text-white text-sm">
                <BilingualText
                  vi="Câu lệnh rẽ nhánh dạng thiếu"
                  en="Single-branch if Statement"
                />
              </h3>
            </div>
            <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded">
              {bilingualMode === 'en' ? 'Figure 19.2' : 'Hình 19.2 SGK'}
            </span>
          </div>

          {/* Syntax Box */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-sky-500/20 font-mono text-xs text-slate-200 space-y-1">
            <div>
              <span className="text-purple-400 font-bold">if</span> &lt;condition&gt;
              <span className="text-yellow-400 font-bold">:</span>
            </div>
            <div className="pl-6 text-sky-300 border-l-2 border-sky-500">&lt;statement block&gt;</div>
          </div>

          <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <p>
              <strong>{bilingualMode === 'en' ? 'Execution:' : 'Hoạt động:'}</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li>
                <BilingualText
                  vi="Nếu Đúng (True): Thực hiện <khối lệnh>."
                  en="If True: Executes <statement block>."
                />
              </li>
              <li>
                <BilingualText
                  vi="Nếu Sai (False): Bỏ qua và chuyển sang câu lệnh tiếp theo sau lệnh if."
                  en="If False: Skips the block and proceeds to subsequent code."
                />
              </li>
            </ul>
          </div>
        </div>

        {/* Card Dạng đủ */}
        <div className="rounded-2xl bg-slate-900 border border-emerald-500/30 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-white text-sm">
                <BilingualText
                  vi="Câu lệnh rẽ nhánh dạng đủ"
                  en="Dual-branch if-else Statement"
                />
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded">
              {bilingualMode === 'en' ? 'Figure 19.3' : 'Hình 19.3 SGK'}
            </span>
          </div>

          {/* Syntax Box */}
          <div className="p-3.5 bg-slate-950 rounded-xl border border-emerald-500/20 font-mono text-xs text-slate-200 space-y-1">
            <div>
              <span className="text-purple-400 font-bold">if</span> &lt;condition&gt;
              <span className="text-yellow-400 font-bold">:</span>
            </div>
            <div className="pl-6 text-emerald-300 border-l-2 border-emerald-500">&lt;block 1&gt;</div>
            <div>
              <span className="text-purple-400 font-bold">else</span>
              <span className="text-yellow-400 font-bold">:</span>
            </div>
            <div className="pl-6 text-sky-300 border-l-2 border-sky-500">&lt;block 2&gt;</div>
          </div>

          <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <p>
              <strong>{bilingualMode === 'en' ? 'Execution:' : 'Hoạt động:'}</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li>
                <BilingualText
                  vi="Nếu Đúng (True): Thực hiện <khối lệnh 1>."
                  en="If True: Executes <block 1>."
                />
              </li>
              <li>
                <BilingualText
                  vi="Nếu Sai (False): Thực hiện <khối lệnh 2>."
                  en="If False: Executes <block 2>."
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Ví dụ SGK Trang 103: Giá trị tuyệt đối của hiệu hai số |a - b| */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">
              <BilingualText
                vi="Ví dụ SGK Trang 103: In ra giá trị tuyệt đối của hiệu hai số a và b"
                en="Example Page 103: Print Absolute Difference |a - b|"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {bilingualMode === 'en' ? 'Page 103 Textbook' : 'Trang 103 SGK'}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Code display */}
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs space-y-1 text-slate-300">
            <div>
              <span className="text-purple-400 font-bold">if</span> a &gt; b:
            </div>
            <div className="pl-6 text-emerald-300">
              <span className="text-purple-400">print</span>(a - b)
            </div>
            <div>
              <span className="text-purple-400 font-bold">else</span>:
            </div>
            <div className="pl-6 text-sky-300">
              <span className="text-purple-400">print</span>(b - a)
            </div>
          </div>

          {/* Interactive Absolute Diff Calculator */}
          <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
            <div className="text-xs font-bold text-slate-300">
              <BilingualText
                vi="Thử nghiệm giá trị a và b:"
                en="Test with values a and b:"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 font-sans">
                  {bilingualMode === 'en' ? 'Value a:' : 'Giá trị a:'}
                </label>
                <input
                  type="number"
                  value={valA}
                  onChange={(e) => handleRunAbs(parseInt(e.target.value) || 0, valB)}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 font-sans">
                  {bilingualMode === 'en' ? 'Value b:' : 'Giá trị b:'}
                </label>
                <input
                  type="number"
                  value={valB}
                  onChange={(e) => handleRunAbs(valA, parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono flex items-center justify-between">
              <span className="text-slate-400">
                {bilingualMode === 'en' ? 'Branch: ' : 'Nhánh thực thi: '}
                <strong className={valA > valB ? 'text-emerald-300' : 'text-sky-300'}>
                  {valA > valB ? 'if (a > b)' : 'else (b >= a)'}
                </strong>
              </span>
              <span className="font-bold text-white text-sm bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                |{valA} - {valB}| = {absOutput}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Hộp Ghi nhớ 2 (Trang 103) */}
      <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-500/40 p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-400/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-amber-950 dark:text-amber-300 uppercase tracking-wide">
              <BilingualText
                vi="Ghi nhớ 2 (SGK Trang 103)"
                en="Key Summary 2 (Page 103)"
              />
            </h4>
            <p className="text-slate-900 dark:text-slate-100 text-xs md:text-sm font-semibold mt-1 leading-relaxed">
              <BilingualText
                vi="Câu lệnh rẽ nhánh if thể hiện cấu trúc rẽ nhánh trong Python. Khối lệnh rẽ nhánh của if được viết sau dấu ':', cần viết lùi vào và thẳng hàng."
                en="The if statement expresses branching control flow in Python. Conditional blocks follow a colon ':', and must be uniformly indented."
              />
            </p>
          </div>
        </div>
      </div>

      {/* 6. Câu hỏi kiểm tra Trang 103 SGK */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
          <HelpCircle className="w-4 h-4" />
          <span>
            <BilingualText
              vi="Câu hỏi kiểm tra Trang 103: Đoạn chương trình sau thực hiện công việc gì?"
              en="Checkpoint Question Page 103: What does the following program snippet do?"
            />
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
          <div>
            <span className="text-sky-300">k</span> = <span className="text-yellow-400">int</span>(
            <span className="text-purple-400">input</span>(
            <span className="text-emerald-300">
              "{bilingualMode === 'en' ? 'Enter a positive integer: ' : 'Nhập một số nguyên dương: '}"
            </span>))
          </div>
          <div>
            <span className="text-purple-400 font-bold">if</span> <span className="text-sky-300">k &lt;= 0</span>:
          </div>
          <div className="pl-6 text-rose-300">
            <span className="text-purple-400">print</span>(
            <span className="text-emerald-300">
              "{bilingualMode === 'en' ? 'You entered an invalid number!' : 'Bạn nhập sai rồi!'}"
            </span>)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs text-slate-200 space-y-2">
          <div className="font-bold text-sky-300">
            {bilingualMode === 'en' ? 'Detailed Solution:' : 'Lời giải chi tiết:'}
          </div>
          <p className="leading-relaxed">
            <BilingualText
              vi="Chương trình yêu cầu người dùng nhập một số nguyên dương (tức là k > 0)."
              en="The program prompts user for a positive integer (k > 0)."
            />
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
            <li>
              <BilingualText
                vi="Nếu người dùng nhập sai quy định (k <= 0, gồm số 0 hoặc các số nguyên âm), điều kiện k <= 0 là Đúng (True). Chương trình sẽ thực hiện câu lệnh in thông báo cảnh báo: 'Bạn nhập sai rồi!'."
                en="If input violates the rule (k <= 0, including 0 or negatives), condition k <= 0 is True, printing the warning: 'You entered an invalid number!'."
              />
            </li>
            <li>
              <BilingualText
                vi="Nếu người dùng nhập đúng số nguyên dương (k > 0), điều kiện k <= 0 là Sai (False), lệnh in cảnh báo sẽ bị bỏ qua."
                en="If a positive integer (k > 0) is provided, k <= 0 evaluates to False, bypassing the warning."
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
