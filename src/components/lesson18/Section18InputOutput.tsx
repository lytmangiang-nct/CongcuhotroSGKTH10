import React, { useState } from 'react';
import {
  Terminal,
  CheckCircle2,
  XCircle,
  Play,
  BookOpen,
  Keyboard,
  Monitor,
  Lightbulb,
  HelpCircle
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section18InputOutput: React.FC = () => {
  const { bilingualMode } = useBook();

  // Interactive Activity 1 State
  const [act1Input, setAct1Input] = useState('12');
  const [act1Run, setAct1Run] = useState(false);
  const [selectedAnswersAct1, setSelectedAnswersAct1] = useState<{
    q1: string | null;
    q2: string | null;
  }>({ q1: null, q2: null });

  // Interactive Live REPL for input() and print()
  const [userName, setUserName] = useState('Minh Trang');
  const [greetingOutput, setGreetingOutput] = useState<string | null>(null);

  // Checkpoint
  const [cp1Answer, setCp1Answer] = useState<number | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Section Header */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 border border-sky-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            <BilingualText
              vi="Mục 1 • Trang 97 – 98 SGK Tin học 10"
              en="Section 1 • Pages 97 – 98 Informatics 10"
            />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          <BilingualText
            vi="1. Các lệnh vào ra đơn giản: input() và print()"
            en="1. Basic Input and Output Statements: input() and print()"
          />
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          <BilingualText
            vi="Quá trình xử lí thông tin trong máy tính thực chất là xử lí dữ liệu. Để giao tiếp hai chiều giữa người dùng và chương trình, Python cung cấp lệnh input() để thu nhận dữ liệu từ bàn phím và lệnh print() để hiển thị kết quả ra màn hình."
            en="Information processing is essentially data processing. For two-way communication between users and programs, Python provides input() to receive data from the keyboard and print() to display results on the screen."
          />
        </p>
      </div>

      {/* 2. Hoạt động 1: Tìm hiểu chức năng của lệnh input() (Trang 97) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Hoạt động 1: Tìm hiểu chức năng của lệnh input()"
                en="Activity 1: Understanding the input() Function"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="Quan sát thực tế trong chế độ dòng lệnh trực tiếp Python IDLE Shell (Trang 97)"
                en="Direct observations in Python IDLE Interactive Shell (Textbook Page 97)"
              />
            </p>
          </div>
        </div>

        {/* Live Simulator for Activity 1 */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-sm">
          <div className="text-slate-400 text-xs border-b border-slate-800 pb-2 flex items-center justify-between">
            <span className="text-slate-300 font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              Python 3.11.0 Interactive Shell
            </span>
            <span className="text-slate-500 text-[11px]">SGK Trang 97</span>
          </div>

          <div className="space-y-1">
            <div className="text-slate-300">
              <span className="text-amber-400 font-bold">&gt;&gt;&gt; </span>
              <span className="text-purple-400">input</span>(
              <span className="text-emerald-300">
                "{bilingualMode === 'en' ? 'Enter a number: ' : 'Nhập một số: '}"
              </span>
              )
            </div>

            <div className="flex items-center gap-2 text-slate-200 pl-4 py-1">
              <span className="text-emerald-300">
                {bilingualMode === 'en' ? 'Enter a number: ' : 'Nhập một số: '}
              </span>
              <input
                type="text"
                value={act1Input}
                onChange={(e) => {
                  setAct1Input(e.target.value);
                  setAct1Run(false);
                }}
                className="w-24 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={() => setAct1Run(true)}
                className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-sans font-semibold transition flex items-center gap-1 shadow-md shadow-sky-600/20 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Press Enter' : 'Nhấn Enter'}</span>
              </button>
            </div>

            {act1Run && (
              <div className="pl-4 pt-1 animate-fadeIn">
                <span className="text-pink-400 font-bold">'{act1Input}'</span>
                <span className="ml-3 text-xs font-sans text-slate-400">
                  {bilingualMode === 'en'
                    ? '← Note the single quotes: the return value is a string (str), NOT a numeric value!'
                    : '← Chú ý cặp dấu nháy đơn bao bọc: kết quả trả về là xâu kí tự (str), không phải số học!'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 2 Questions of Activity 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-sky-300">
              <BilingualText
                vi="Câu hỏi 1: Lệnh input() cho phép nhập dữ liệu từ đâu?"
                en="Question 1: Where does input() read data from?"
              />
            </span>
            <div className="space-y-1.5">
              {[
                {
                  id: 'a',
                  vi: 'Từ bàn phím (thiết bị vào chuẩn)',
                  en: 'From the keyboard (standard input device)',
                  correct: true
                },
                {
                  id: 'b',
                  vi: 'Từ con chuột máy tính',
                  en: 'From the computer mouse',
                  correct: false
                },
                {
                  id: 'c',
                  vi: 'Từ tệp tin trên ổ đĩa cứng',
                  en: 'From a file on the hard drive',
                  correct: false
                }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() =>
                    setSelectedAnswersAct1((prev) => ({ ...prev, q1: opt.id }))
                  }
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition border flex items-center justify-between cursor-pointer ${
                    selectedAnswersAct1.q1 === opt.id
                      ? opt.correct
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{bilingualMode === 'en' ? opt.en : opt.vi}</span>
                  {selectedAnswersAct1.q1 === opt.id &&
                    (opt.correct ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    ))}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
            <span className="text-xs font-bold text-sky-300">
              <BilingualText
                vi="Câu hỏi 2: Giá trị được nhập sẽ là số hay xâu?"
                en="Question 2: Will the entered value be numeric or string?"
              />
            </span>
            <div className="space-y-1.5">
              {[
                {
                  id: 'a',
                  vi: 'Luôn luôn là xâu kí tự (str)',
                  en: 'Always a character string (str)',
                  correct: true
                },
                {
                  id: 'b',
                  vi: 'Là số nguyên nếu người dùng chỉ gõ số',
                  en: 'An integer if the user only types digits',
                  correct: false
                },
                {
                  id: 'c',
                  vi: 'Tự động biến đổi tùy theo độ dài',
                  en: 'Automatically changes according to length',
                  correct: false
                }
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() =>
                    setSelectedAnswersAct1((prev) => ({ ...prev, q2: opt.id }))
                  }
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition border flex items-center justify-between cursor-pointer ${
                    selectedAnswersAct1.q2 === opt.id
                      ? opt.correct
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{bilingualMode === 'en' ? opt.en : opt.vi}</span>
                  {selectedAnswersAct1.q2 === opt.id &&
                    (opt.correct ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    ))}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Chi tiết Cú pháp input() và print() */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Box input() */}
        <div className="rounded-2xl bg-slate-900 border border-sky-500/30 p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                <BilingualText
                  vi="Cú pháp lệnh input()"
                  en="Syntax of input() Function"
                />
              </h3>
              <span className="text-xs text-sky-400">
                <BilingualText
                  vi="Thiết bị vào chuẩn (Bàn phím)"
                  en="Standard Input Device (Keyboard)"
                />
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-sky-500/20 font-mono text-sm text-sky-300">
            {bilingualMode === 'en'
              ? '<variable> = input(<prompt_string>)'
              : '<biến> = input(<Dòng thông báo>)'}
          </div>

          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
            <li>
              <strong>{bilingualMode === 'en' ? '<prompt_string>' : '<Dòng thông báo>'}</strong>:{' '}
              {bilingualMode === 'en'
                ? 'Optional string displayed to prompt user for input.'
                : 'Chuỗi kí tự hiển thị làm lời nhắc mời người dùng nhập (không bắt buộc, nhưng rất nên có).'}
            </li>
            <li>
              {bilingualMode === 'en' ? (
                <>
                  Execution <strong>pauses</strong> until user types characters and presses{' '}
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700">
                    Enter
                  </kbd>
                  .
                </>
              ) : (
                <>
                  Chương trình sẽ <strong>tạm dừng chờ</strong> cho đến khi người dùng gõ xong nội dung và nhấn phím{' '}
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700">
                    Enter
                  </kbd>
                  .
                </>
              )}
            </li>
            <li className="text-amber-300 font-semibold">
              {bilingualMode === 'en'
                ? 'The return value is ALWAYS A CHARACTER STRING (str).'
                : 'Nội dung nhập có thể là số, biểu thức hay văn bản, và kết quả trả về LUÔN LÀ MỘT XÂU KÍ TỰ.'}
            </li>
          </ul>
        </div>

        {/* Box print() */}
        <div className="rounded-2xl bg-slate-900 border border-purple-500/30 p-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                <BilingualText
                  vi="Cú pháp lệnh print()"
                  en="Syntax of print() Function"
                />
              </h3>
              <span className="text-xs text-purple-400">
                <BilingualText
                  vi="Thiết bị ra chuẩn (Màn hình)"
                  en="Standard Output Device (Screen)"
                />
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/20 font-mono text-sm text-purple-300">
            <span className="text-purple-400 font-bold">print</span>(val1, val2, ...)
          </div>

          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
            <li>
              {bilingualMode === 'en'
                ? 'Outputs data to screen. Can print one or multiple arguments of different data types simultaneously.'
                : 'Đưa dữ liệu ra màn hình. Có thể in một hoặc nhiều giá trị thuộc các kiểu dữ liệu khác nhau cùng lúc.'}
            </li>
            <li>
              {bilingualMode === 'en'
                ? 'Arguments separated by commas are automatically separated by a single whitespace upon printing.'
                : 'Các đối số phân cách bằng dấu phẩy sẽ tự động được ngăn cách bởi một khoảng trắng khi in ra.'}
            </li>
            <li>
              {bilingualMode === 'en'
                ? 'Allows direct arithmetic expression evaluation inside arguments.'
                : 'Cho phép truyền trực tiếp các biểu thức toán học tính toán ngay khi in.'}
            </li>
          </ul>
        </div>
      </div>

      {/* 4. Interactive Live Example: Nhập tên & Chào hỏi (SGK Trang 97) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">
              <BilingualText
                vi="Ví dụ SGK Trang 97: Nhập tên và in lời chào"
                en="Textbook Example Page 97: Read Name and Print Greeting"
              />
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            {bilingualMode === 'en' ? 'name = input("Enter your name: ")' : 'name = input("Nhập họ tên em: ")'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Code Editor */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
            <div className="text-slate-500">
              {bilingualMode === 'en' ? '# Input name and greeting program' : '# Chương trình nhập tên và chào hỏi'}
            </div>
            <div>
              <span className="text-sky-300">name</span> = <span className="text-purple-400">input</span>(
              <span className="text-emerald-300">
                "{bilingualMode === 'en' ? 'Enter your name: ' : 'Nhập họ tên em: '}"
              </span>
              )
            </div>
            <div>
              <span className="text-purple-400">print</span>(
              <span className="text-emerald-300">"{bilingualMode === 'en' ? 'Hello ' : 'Xin chào '}"</span>,{' '}
              <span className="text-sky-300">name</span>)
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <span className="text-slate-400 font-sans text-xs">
                {bilingualMode === 'en' ? 'Try entering name:' : 'Thử nhập tên:'}
              </span>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="flex-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={() =>
                  setGreetingOutput(
                    bilingualMode === 'en' ? `Hello  ${userName}` : `Xin chào  ${userName}`
                  )
                }
                className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-semibold transition cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Run' : 'Chạy thử'}
              </button>
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-slate-500 pb-1 border-b border-slate-800 flex items-center justify-between">
              <span>Output Console</span>
              <span className="text-[10px] text-emerald-400">● Live Terminal</span>
            </div>
            <div className="text-slate-400">
              {bilingualMode === 'en' ? 'Enter your name: ' : 'Nhập họ tên em: '}
              <span className="text-white font-bold">{userName}</span>
            </div>
            {greetingOutput ? (
              <div className="text-emerald-300 font-bold animate-fadeIn pt-1">
                {greetingOutput}
              </div>
            ) : (
              <div className="text-slate-600 italic">
                {bilingualMode === 'en'
                  ? 'Click "Run" to see print() execute...'
                  : 'Nhấn "Chạy thử" để xem lệnh print() thực thi...'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5. Hộp Ghi nhớ Mục 1 (Trang 98) */}
      <div className="rounded-2xl bg-amber-950/40 border-2 border-amber-400 p-5 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start gap-3 relative z-10">
          <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">
              <BilingualText
                vi="Ghi nhớ (SGK Trang 98)"
                en="Key Summary (Page 98)"
              />
            </h4>
            <p className="text-amber-50 dark:text-amber-100 text-sm md:text-base font-bold mt-1.5 leading-relaxed">
              <BilingualText
                vi="Các lệnh vào ra đơn giản của Python bao gồm lệnh input() và lệnh print()."
                en="Python basic input/output statements include the input() and print() functions."
              />
            </p>
          </div>
        </div>
      </div>

      {/* 6. Quick Checkpoint Question */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
          <HelpCircle className="w-4 h-4" />
          <span>
            <BilingualText
              vi="Câu hỏi củng cố Mục 1:"
              en="Checkpoint Question Section 1:"
            />
          </span>
        </div>
        <p className="text-sm font-medium text-white">
          <BilingualText
            vi="Khi ta thực thi câu lệnh age = input('Nhập số tuổi: ') và người dùng gõ 15 rồi Enter, biến age sẽ có kiểu dữ liệu là gì?"
            en="When executing age = input('Enter age: ') and user types 15 followed by Enter, what data type will variable age hold?"
          />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {[
            {
              id: 0,
              vi: 'Kiểu int (số nguyên 15)',
              en: 'Type int (integer 15)',
              correct: false
            },
            {
              id: 1,
              vi: 'Kiểu str (xâu kí tự "15")',
              en: 'Type str (character string "15")',
              correct: true
            },
            {
              id: 2,
              vi: 'Kiểu float (số thực 15.0)',
              en: 'Type float (float 15.0)',
              correct: false
            }
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setCp1Answer(item.id)}
              className={`p-3 rounded-xl border text-xs text-left font-medium transition cursor-pointer ${
                cp1Answer === item.id
                  ? item.correct
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                    : 'bg-rose-950/70 border-rose-500 text-rose-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{bilingualMode === 'en' ? item.en : item.vi}</span>
                {cp1Answer === item.id &&
                  (item.correct ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  ))}
              </div>
            </button>
          ))}
        </div>

        {cp1Answer === 1 && (
          <div className="p-3 rounded-xl text-xs font-sans mt-2 animate-fadeIn bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <span>
              <strong>{bilingualMode === 'en' ? 'Textbook Explanation:' : 'Giải thích chuẩn SGK:'}</strong>{' '}
              {bilingualMode === 'en'
                ? "The input() function always returns a string (str). The stored value is '15' (not numeric) until explicitly converted."
                : "Lệnh input() luôn luôn trả về xâu kí tự (str). Giá trị lưu trữ là '15' chứ chưa phải là số nguyên để tính toán số học."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
