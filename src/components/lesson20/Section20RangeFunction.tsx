import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  Sliders,
  BookOpen,
  HelpCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Layers,
  Terminal,
  RefreshCw
} from 'lucide-react';

export const Section20RangeFunction: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive Range Playground State
  const [playStart, setPlayStart] = useState<number>(3);
  const [playStop, setPlayStop] = useState<number>(10);
  const [playStep] = useState<number>(1);
  const [useEndParam, setUseEndParam] = useState<boolean>(true);

  // Checkpoint Exercise State (Trang 107 Câu a, b, c, d)
  const [answers, setAnswers] = useState<{
    a: string;
    b: string;
    c: string;
    d: string;
  }>({
    a: '',
    b: '',
    c: '',
    d: ''
  });

  const [checkedResults, setCheckedResults] = useState<{
    a?: boolean;
    b?: boolean;
    c?: boolean;
    d?: boolean;
  }>({});

  // Compute generated numbers
  const generateRangeItems = (start: number, stop: number, step: number) => {
    const list: number[] = [];
    if (step <= 0) return list;
    for (let i = start; i < stop; i += step) {
      list.push(i);
      if (list.length >= 100) break;
    }
    return list;
  };

  const playItems = generateRangeItems(playStart, playStop, playStep);
  const isPlayEmpty = playStart >= playStop;

  // Validate SGK Checkpoint
  const handleCheckSGKQuestions = () => {
    const clean = (s: string) => s.replace(/\s+/g, '').toLowerCase();

    const isACorrect = clean(answers.a) === 'range(1,51)';
    const isBCorrect = clean(answers.b) === 'range(5,11)';
    const isCCorrect = clean(answers.c) === 'range(2)' || clean(answers.c) === 'range(0,2)';
    const isDCorrect = clean(answers.d) === 'range(10,11)';

    setCheckedResults({
      a: isACorrect,
      b: isBCorrect,
      c: isCCorrect,
      d: isDCorrect
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              <BilingualText
                vi="MỤC 2 • TRANG 106 – 107"
                en="SECTION 2 • PAGES 106 – 107"
              />
            </span>
            <span className="text-xs text-slate-400">
              <BilingualText
                vi="Vùng giá trị range() & Tham số in ấn"
                en="The range() sequence & print parameters"
              />
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            <BilingualText
              vi="2. LỆNH TẠO VÙNG GIÁ TRỊ RANGE()"
              en="2. THE RANGE() SEQUENCE GENERATOR"
            />
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(106);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer transition-all"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>{isEn ? 'Original Pages 106 – 107' : 'Đối chiếu Trang 106 – 107'}</span>
        </button>
      </div>

      {/* Hoạt động 2 (Trang 106) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            {isEn ? 'Act 2' : 'HĐ 2'}
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Hoạt động 2: Tìm hiểu vùng giá trị xác định bởi lệnh range()"
                en="Activity 2: Understanding Sequences Defined by range()"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="Quan sát kết quả in ra và tham số end = ' ' trong lệnh print()"
                en="Observe print output and the end = ' ' parameter"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 space-y-2">
            <div className="text-slate-500 text-[11px] font-sans font-bold">
              {isEn ? 'Experiment 1: range(3, 10)' : 'Thử nghiệm 1: range(3, 10)'}
            </div>
            <div className="text-slate-300">
              <span className="text-violet-400">&gt;&gt;&gt; </span><span className="text-amber-400">for</span> k <span className="text-amber-400">in</span> <span className="text-sky-400">range</span>(3, 10):{'\n'}
              {'        '}<span className="text-emerald-400">print</span>(k, end = <span className="text-amber-300">" "</span>){'\n'}
              <span className="text-emerald-400 font-bold">3 4 5 6 7 8 9</span>
            </div>
            <div className="text-[11px] text-slate-300 font-sans pt-1">
              {isEn
                ? <>👉 Starts from <strong>3</strong>, terminates at <strong>9</strong> (10 - 1). Yields 7 numbers.</>
                : <>👉 Bắt đầu từ <strong>3</strong>, kết thúc tại <strong>9</strong> (10 - 1). Gồm 7 số.</>}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs border border-slate-800 space-y-2">
            <div className="text-slate-500 text-[11px] font-sans font-bold">
              {isEn ? 'Experiment 2: range(0, 15)' : 'Thử nghiệm 2: range(0, 15)'}
            </div>
            <div className="text-slate-300">
              <span className="text-violet-400">&gt;&gt;&gt; </span><span className="text-amber-400">for</span> k <span className="text-amber-400">in</span> <span className="text-sky-400">range</span>(0, 15):{'\n'}
              {'        '}<span className="text-emerald-400">print</span>(k, end = <span className="text-amber-300">" "</span>){'\n'}
              <span className="text-emerald-400 font-bold">0 1 2 3 4 5 6 7 8 9 10 11 12 13 14</span>
            </div>
            <div className="text-[11px] text-slate-300 font-sans pt-1">
              {isEn
                ? <>👉 Starts from <strong>0</strong>, terminates at <strong>14</strong> (15 - 1). Yields 15 numbers.</>
                : <>👉 Bắt đầu từ <strong>0</strong>, kết thúc tại <strong>14</strong> (15 - 1). Gồm 15 số.</>}
            </div>
          </div>
        </div>

        {/* Note on print end parameter */}
        <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/60 text-xs text-sky-100 flex items-start gap-2.5">
          <Terminal className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <strong>
              {isEn ? 'Note on ' : 'Lưu ý tham số '}
              <code className="font-mono bg-sky-900/60 px-1 py-0.5 rounded">end = " "</code>:
            </strong>{' '}
            {isEn
              ? 'By default, print() appends a newline after output. Specifying end = " " instructs Python to output a single space instead, displaying the sequence cleanly on a single line.'
              : 'Mặc định lệnh print() trong Python luôn tự động xuống dòng sau khi in. Khi thêm tham số end = " ", Python sẽ in ký tự dấu cách ở cuối thay vì ký tự xuống dòng, giúp toàn bộ dữ liệu hiển thị gọn gàng trên cùng một hàng ngang.'}
          </div>
        </div>
      </div>

      {/* Syntax & Key Variations (Trang 106) */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-400" />
          <BilingualText
            vi="Các Cú Pháp Tạo Vùng Giá Trị Của Lệnh range()"
            en="Syntactical Forms of the range() Generator"
          />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-1 rounded inline-block">
              {isEn ? 'Form 1: range(stop)' : 'Dạng 1: range(stop)'}
            </div>
            <p className="text-xs text-slate-300">
              {isEn ? (
                <>Returns sequence from <strong className="text-amber-400">0</strong> up to <strong className="text-amber-400">stop - 1</strong>.</>
              ) : (
                <>Trả lại vùng giá trị từ <strong className="text-amber-400">0</strong> đến <strong className="text-amber-400">stop - 1</strong>.</>
              )}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400">
              range(10) → 0, 1, 2, ..., 9 ({isEn ? '10 numbers' : '10 số'})
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded inline-block">
              {isEn ? 'Form 2: range(start, stop)' : 'Dạng 2: range(start, stop)'}
            </div>
            <p className="text-xs text-slate-300">
              {isEn ? (
                <>Returns sequence from <strong className="text-amber-400">start</strong> up to <strong className="text-amber-400">stop - 1</strong>.</>
              ) : (
                <>Trả lại vùng giá trị từ <strong className="text-amber-400">start</strong> đến <strong className="text-amber-400">stop - 1</strong>.</>
              )}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400">
              range(3, 10) → 3, 4, 5, 6, 7, 8, 9 ({isEn ? '7 numbers' : '7 số'})
            </div>
          </div>
        </div>

        {/* 4 Crucial Textbook Examples Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">{isEn ? 'Textbook Syntax' : 'Cú pháp trong SGK'}</th>
                <th className="py-2.5 px-3">{isEn ? 'Generated Values' : 'Vùng giá trị sinh ra'}</th>
                <th className="py-2.5 px-3">{isEn ? 'Practical Purpose' : 'Ý nghĩa ứng dụng'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr>
                <td className="py-2.5 px-3 text-sky-400 font-bold">range(n)</td>
                <td className="py-2.5 px-3 text-slate-200">0, 1, ..., n - 1</td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">
                  {isEn ? 'Repeat n times starting from 0 (index traversing)' : 'Lặp n lần duyệt từ 0 (chỉ số mảng)'}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">range(1, n + 1)</td>
                <td className="py-2.5 px-3 text-slate-200">1, 2, ..., n</td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">
                  {isEn ? 'Traverse n natural counting numbers from 1 to n' : 'Duyệt n số đếm tự nhiên từ 1 đến n'}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-amber-400 font-bold">range(0, 99)</td>
                <td className="py-2.5 px-3 text-slate-200">0, 1, 2, ..., 98</td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">
                  {isEn ? 'Sequence of 99 integers starting from 0' : 'Dãy 99 số nguyên bắt đầu từ 0'}
                </td>
              </tr>
              <tr className="bg-rose-950/20">
                <td className="py-2.5 px-3 text-rose-400 font-bold">range(100, 1)</td>
                <td className="py-2.5 px-3 text-rose-300 font-sans">
                  {isEn ? 'Empty sequence [ ]' : 'Vùng rỗng [ ]'}
                </td>
                <td className="py-2.5 px-3 text-rose-300 font-sans">
                  {isEn ? 'start >= stop, loop never executes' : 'Vì start >= stop, vòng lặp không chạy'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hộp Ghi nhớ 2 (Trang 107) - High Contrast */}
      <div className="p-5 rounded-2xl bg-emerald-950/40 border-2 border-emerald-400/80 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <BilingualText
            vi="Ghi Nhớ 2 (Trang 107 SGK)"
            en="Key Takeaway 2 (Textbook Page 107)"
          />
        </div>
        <div className="text-sm text-emerald-50 leading-relaxed font-semibold">
          <BilingualText
            vi="Lệnh tạo vùng giá trị có cú pháp range(start, stop) trả lại vùng giá trị gồm các số nguyên liên tiếp từ start đến stop - 1."
            en="The value-range generation statement range(start, stop) generates a sequence of consecutive integers from start up to stop - 1."
          />
        </div>
      </div>

      {/* BÀI TẬP TƯƠNG TÁC 1: Interactive Range Playground */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                <BilingualText
                  vi="Bài Tập Tương Tác 1: Phòng Thử Nghiệm range(start, stop)"
                  en="Interactive Lab 1: range(start, stop) Playground"
                />
              </h3>
              <p className="text-xs text-slate-400">
                <BilingualText
                  vi="Tự do thay đổi start, stop và tham số end để xem trực tiếp danh sách kết quả"
                  en="Adjust start, stop, and end formatting to observe real-time output"
                />
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => { setPlayStart(1); setPlayStop(10); }}
            className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isEn ? 'Default' : 'Mặc định'}</span>
          </button>
        </div>

        {/* Inputs row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400 font-semibold">start:</span>
              <span className="font-mono font-bold text-emerald-400">{playStart}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="15"
              value={playStart}
              onChange={(e) => setPlayStart(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400 font-semibold">stop:</span>
              <span className="font-mono font-bold text-rose-400">{playStop}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="25"
              value={playStop}
              onChange={(e) => setPlayStop(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold">
              {isEn ? 'Print style:' : 'Định dạng in:'}
            </span>
            <button
              type="button"
              onClick={() => setUseEndParam((v) => !v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                useEndParam
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {useEndParam
                ? (isEn ? 'end = " " (Inline)' : 'end = " " (Hàng ngang)')
                : (isEn ? 'Default (Newline)' : 'Mặc định (Xuống dòng)')}
            </button>
          </div>
        </div>

        {/* Output Console Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-violet-400">
              for k in range({playStart}, {playStop}): print(k{useEndParam ? ', end = " "' : ''})
            </span>
            <span className="text-slate-500">
              {isPlayEmpty
                ? (isEn ? '0 items' : '0 phần tử')
                : (isEn ? `${playItems.length} items` : `${playItems.length} phần tử`)}
            </span>
          </div>

          {isPlayEmpty ? (
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>{isEn ? 'Empty Sequence Warning:' : 'Cảnh báo Dãy Rỗng:'}</strong>{' '}
                {isEn
                  ? `Since start (${playStart}) >= stop (${playStop}), range produces no numbers. The loop finishes immediately with no output!`
                  : `Vì start (${playStart}) >= stop (${playStop}) nên range không sinh ra số nào. Vòng lặp sẽ kết thúc ngay lập tức mà không in gì ra màn hình!`}
              </span>
            </div>
          ) : (
            <div className={`p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 ${
              useEndParam ? 'whitespace-normal' : 'whitespace-pre-line max-h-36 overflow-y-auto'
            }`}>
              {useEndParam ? playItems.join(' ') : playItems.join('\n')}
            </div>
          )}
        </div>
      </div>

      {/* BÀI TẬP TƯƠNG TÁC 2: Câu hỏi củng cố a, b, c, d Trang 107 */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-violet-800/40 shadow-xl space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                <BilingualText
                  vi="Bài Tập Tương Tác 2: Biểu Diễn Dãy Số Bằng Lệnh range() (Trang 107 SGK)"
                  en="Interactive Lab 2: Expressing Sequences using range() (Page 107)"
                />
              </h3>
              <p className="text-xs text-slate-400">
                <BilingualText
                  vi="Hãy viết câu lệnh range(...) chính xác tương ứng với mỗi dãy số sau"
                  en="Write the exact range(...) statement corresponding to each sequence below"
                />
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckSGKQuestions}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-all shadow-lg"
          >
            {isEn ? 'Check Answers' : 'Kiểm Tra Kết Quả'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Câu a */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">
                {isEn ? 'a) Sequence: 1, 2, 3, ..., 50' : 'a) Dãy: 1, 2, 3, ..., 50'}
              </span>
              {checkedResults.a !== undefined && (
                checkedResults.a
                  ? <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> {isEn ? 'Correct' : 'Đúng'}</span>
                  : <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {isEn ? 'Incorrect' : 'Sai'}</span>
              )}
            </div>
            <input
              type="text"
              placeholder={isEn ? 'E.g.: range(1, 51)' : 'Ví dụ: range(1, 51)'}
              value={answers.a}
              onChange={(e) => setAnswers({ ...answers, a: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-violet-500"
            />
            {checkedResults.a === false && (
              <p className="text-[11px] text-rose-300">{isEn ? 'Correct answer: ' : 'Đáp án đúng: '}<code className="font-mono">range(1, 51)</code></p>
            )}
          </div>

          {/* Câu b */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">
                {isEn ? 'b) Sequence: 5, 6, 7, 8, 9, 10' : 'b) Dãy: 5, 6, 7, 8, 9, 10'}
              </span>
              {checkedResults.b !== undefined && (
                checkedResults.b
                  ? <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> {isEn ? 'Correct' : 'Đúng'}</span>
                  : <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {isEn ? 'Incorrect' : 'Sai'}</span>
              )}
            </div>
            <input
              type="text"
              placeholder={isEn ? 'E.g.: range(5, 11)' : 'Ví dụ: range(5, 11)'}
              value={answers.b}
              onChange={(e) => setAnswers({ ...answers, b: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-violet-500"
            />
            {checkedResults.b === false && (
              <p className="text-[11px] text-rose-300">{isEn ? 'Correct answer: ' : 'Đáp án đúng: '}<code className="font-mono">range(5, 11)</code></p>
            )}
          </div>

          {/* Câu c */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">
                {isEn ? 'c) Sequence: 0, 1' : 'c) Dãy: 0, 1'}
              </span>
              {checkedResults.c !== undefined && (
                checkedResults.c
                  ? <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> {isEn ? 'Correct' : 'Đúng'}</span>
                  : <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {isEn ? 'Incorrect' : 'Sai'}</span>
              )}
            </div>
            <input
              type="text"
              placeholder={isEn ? 'E.g.: range(2) or range(0, 2)' : 'Ví dụ: range(2) hoặc range(0, 2)'}
              value={answers.c}
              onChange={(e) => setAnswers({ ...answers, c: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-violet-500"
            />
            {checkedResults.c === false && (
              <p className="text-[11px] text-rose-300">{isEn ? 'Correct answer: ' : 'Đáp án đúng: '}<code className="font-mono">range(2)</code> {isEn ? 'or' : 'hoặc'} <code className="font-mono">range(0, 2)</code></p>
            )}
          </div>

          {/* Câu d */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">
                {isEn ? 'd) Sequence with single number: 10' : 'd) Dãy chỉ có một số: 10'}
              </span>
              {checkedResults.d !== undefined && (
                checkedResults.d
                  ? <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> {isEn ? 'Correct' : 'Đúng'}</span>
                  : <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> {isEn ? 'Incorrect' : 'Sai'}</span>
              )}
            </div>
            <input
              type="text"
              placeholder={isEn ? 'E.g.: range(10, 11)' : 'Ví dụ: range(10, 11)'}
              value={answers.d}
              onChange={(e) => setAnswers({ ...answers, d: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-violet-500"
            />
            {checkedResults.d === false && (
              <p className="text-[11px] text-rose-300">{isEn ? 'Correct answer: ' : 'Đáp án đúng: '}<code className="font-mono">range(10, 11)</code></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
