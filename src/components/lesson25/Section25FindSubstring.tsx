import React, { useState } from 'react';
import { Search, Info, HelpCircle, CheckCircle2, ChevronRight, Terminal, Sparkles, AlertCircle } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section25FindSubstring: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive playground state
  const [parentStr, setParentStr] = useState<string>('Hà Nội - Đà Nẵng - Hồ Chí Minh');
  const [subStr, setSubStr] = useState<string>('Đà Nẵng');
  const [startIdx, setStartIdx] = useState<number>(0);

  // Review questions reveals
  const [q1Revealed, setQ1Revealed] = useState<boolean>(false);
  const [q2Revealed, setQ2Revealed] = useState<boolean>(false);

  // Compute live find and in results
  const inResult = parentStr.includes(subStr);
  const findResult = parentStr.indexOf(subStr, startIdx);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-sky-950/80 via-slate-900 to-slate-900 border border-sky-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full w-fit border border-sky-500/20">
          <span>{isEn ? 'Section 1' : 'Mục 1'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 123 – 124' : 'Trang 123 – 124 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '1. Substrings & The find() Method' : '1. Xâu con và Lệnh Tìm Vị Trí Xâu Con'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Techniques to detect substring presence using the in operator and locate exact starting index positions using the find() method.'
            : 'Các kỹ thuật xác định sự xuất hiện của xâu con bằng toán tử in và định vị chính xác vị trí chỉ số bắt đầu bằng phương thức find().'}
        </p>
      </div>

      {/* Hoạt động 1: Một số lệnh tìm kiếm xâu con trong xâu kí tự */}
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">
              {isEn ? 'Activity 1: Substring Search Commands in Python' : 'Hoạt động 1: Một số lệnh tìm kiếm xâu con trong xâu kí tự'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Observe syntax and return values of "in" and "find()"' : 'Quan sát các ví dụ SGK để tìm hiểu cách kiểm tra xâu con và tìm vị trí xâu con'}
            </p>
          </div>
        </div>

        {/* Khái niệm Phương thức (Method) */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="text-sky-300 font-bold text-sm">
            💡 {isEn ? 'What is a Method in Python?' : 'Khái niệm Phương thức (Method) trong Python:'}
          </div>
          <p className="leading-relaxed">
            {isEn ? (
              <>
                Similar to lists, Python has specialized commands attached directly to strings called <strong>methods</strong>.
                Syntax: <code className="text-amber-300 font-bold">&lt;string&gt;.&lt;method&gt;</code>.
              </>
            ) : (
              <>
                Tương tự danh sách, Python cũng có một số lệnh đặc biệt dành riêng cho xâu kí tự (gọi là <strong>phương thức</strong>).
                Cách thực hiện phương thức là: <code className="text-amber-300 font-bold">&lt;xâu&gt;.&lt;phương thức&gt;</code>.
              </>
            )}
          </p>
        </div>

        {/* Ví dụ 1 & Ví dụ 2 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Ví dụ 1: Toán tử in */}
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-sky-400 uppercase tracking-wider">
                {isEn ? 'Example 1 (p. 123): "in" Operator' : 'Ví dụ 1 (Tr. 123): Toán tử in'}
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Boolean (True / False)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isEn ? 'Checks if a string is a substring of another string:' : 'Dùng toán tử in để kiểm tra một xâu có là xâu con của xâu khác không:'}
            </p>
            <div className="bg-black/70 p-3 rounded-lg font-mono text-xs space-y-1.5 border border-slate-800">
              <div className="text-slate-300">&gt;&gt;&gt; "abc" in "123abc"</div>
              <div className="text-emerald-400 font-bold">True</div>
              <div className="text-slate-300">&gt;&gt;&gt; "010" in "1101"</div>
              <div className="text-rose-400 font-bold">False</div>
            </div>
            <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-800/40 text-[11px] text-sky-200">
              <strong>{isEn ? 'Syntax:' : 'Cú pháp:'}</strong> <code>&lt;xâu 1&gt; in &lt;xâu 2&gt;</code>
              <br />
              {isEn ? 'Returns True if string 1 is inside string 2, otherwise False.' : 'Nếu đúng thì trả lại giá trị True, nếu sai trả lại giá trị False.'}
            </div>
          </div>

          {/* Ví dụ 2: Lệnh find() */}
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-amber-400 uppercase tracking-wider">
                {isEn ? 'Example 2 (p. 123): find() Method' : 'Ví dụ 2 (Tr. 123): Lệnh find()'}
              </span>
              <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Index / -1
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {isEn ? 'Finds first appearance index of substring in target:' : 'Lệnh find() tìm vị trí xuất hiện của một xâu trong xâu khác:'}
            </p>
            <div className="bg-black/70 p-3 rounded-lg font-mono text-xs space-y-1.5 border border-slate-800">
              <div className="text-slate-300">&gt;&gt;&gt; s = "ab bc cd 123 456 00"</div>
              <div>
                <span className="text-slate-300">&gt;&gt;&gt; s.find("b")</span>
                <span className="text-emerald-400 ml-2 font-bold">1</span>
                <span className="text-slate-500 text-[11px] ml-2"># Xuất hiện đầu tiên tại chỉ số 1</span>
              </div>
              <div>
                <span className="text-slate-300">&gt;&gt;&gt; s.find("12")</span>
                <span className="text-emerald-400 ml-2 font-bold">9</span>
                <span className="text-slate-500 text-[11px] ml-2"># Xuất hiện đầu tiên tại chỉ số 9</span>
              </div>
              <div>
                <span className="text-slate-300">&gt;&gt;&gt; s.find("AB")</span>
                <span className="text-rose-400 ml-2 font-bold">-1</span>
                <span className="text-slate-500 text-[11px] ml-2"># Không tìm thấy nên trả về -1</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-200">
              <strong>{isEn ? 'Rule:' : 'Quy tắc:'}</strong>{' '}
              {isEn ? 'Returns first index, or -1 if substring does not exist.' : 'Trả về vị trí đầu tiên của xâu con, nếu không tìm thấy thì trả về -1.'}
            </div>
          </div>
        </div>

        {/* Cú pháp đơn & Cú pháp đầy đủ của find() (Trang 124) */}
        <div className="p-5 rounded-2xl bg-linear-to-r from-slate-900 to-indigo-950/40 border border-indigo-500/30 space-y-4">
          <h4 className="font-bold text-sm text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>{isEn ? 'Complete Syntax of find() & The start Parameter (p. 124)' : 'Cú pháp Đơn & Cú pháp Đầy đủ của Lệnh find() (Trang 124)'}</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
              <div className="font-bold text-sky-400">
                {isEn ? '1. Single Argument Syntax:' : '1. Cú pháp đơn (Single argument):'}
              </div>
              <div className="p-2 rounded bg-black/60 font-mono text-amber-300">
                {isEn ? '<target_str>.find(<substring>)' : '<xâu mẹ>.find(<xâu con>)'}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {isEn
                  ? 'Finds the first index of substring in the target string. If not found, returns -1.'
                  : 'Lệnh sẽ tìm vị trí đầu tiên của xâu con trong xâu mẹ và trả về vị trí đó. Nếu không tìm thấy thì trả về -1.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-400">
                {isEn ? '2. Full Syntax (With start parameter):' : '2. Cú pháp đầy đủ (With start parameter):'}
              </div>
              <div className="p-2 rounded bg-black/60 font-mono text-amber-300">
                {isEn ? '<target_str>.find(<substring>, start)' : '<xâu mẹ>.find(<xâu con>, start)'}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {isEn
                  ? 'Finds the substring position beginning search from index start. Essential to skip previously discovered occurrences.'
                  : 'Lệnh sẽ tìm vị trí xâu con bắt đầu từ vị trí start. Hữu ích khi muốn bỏ qua các kết quả đã tìm thấy phía trước.'}
              </p>
            </div>
          </div>

          {/* Ví dụ 3 SGK Trang 124 */}
          <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-amber-300">
              {isEn ? 'Textbook Example 3 (p. 124):' : 'Ví dụ 3 SGK Trang 124:'}
            </div>
            <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto p-2 bg-slate-950 rounded-lg">
{`>>> sub = "Đà Nẵng"
>>> s = "Hà Nội - Đà Nẵng - Hồ Chí Minh"
>>> s.find(sub)
9
>>> s.find(sub, 10)
-1`}
            </pre>
            <p className="text-xs text-slate-400 italic">
              {isEn
                ? 'Explanation: "Đà Nẵng" starts at index 9. When starting search from index 10 (start = 10), it is not present in the remaining tail, returning -1.'
                : 'Giải thích: "Đà Nẵng" xuất hiện tại vị trí 9. Khi chỉ định start = 10 (tìm từ vị trí 10 trở đi), xâu con không còn tồn tại nên trả về -1.'}
            </p>
          </div>
        </div>

        {/* Hộp Ghi nhớ 1 (Trang 124 SGK) */}
        <div className="p-5 rounded-2xl bg-linear-to-r from-amber-950/40 via-amber-900/20 to-slate-900 border-2 border-dashed border-amber-500/60 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Info className="w-5 h-5 shrink-0" />
            <span>{isEn ? 'Summary Box 1 (Textbook p. 124)' : 'Hộp Ghi nhớ 1 (Trang 124 SGK)'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-7 font-medium">
            {isEn
              ? 'To find a string within another string, you can use the "in" operator or the find() method. The find() method returns the starting position of the substring in the target string.'
              : 'Để tìm một xâu trong một xâu khác có thể dùng toán tử in hoặc lệnh find(). Lệnh find() trả về vị trí của xâu con trong xâu mẹ.'}
          </p>
        </div>
      </div>

      {/* Interactive find() & in Sandbox */}
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-base sm:text-lg text-white">
              {isEn ? 'Interactive Substring Search Playground' : 'Phòng Thí Nghiệm Kiểm Tra Xâu Con & find() Trực Quan'}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Live Python Evaluator</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">
              {isEn ? 'Parent string (s):' : 'Xâu mẹ (s):'}
            </label>
            <input
              type="text"
              value={parentStr}
              onChange={(e) => setParentStr(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:border-sky-500 outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">
              {isEn ? 'Substring to find (sub):' : 'Xâu con cần tìm (sub):'}
            </label>
            <input
              type="text"
              value={subStr}
              onChange={(e) => setSubStr(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:border-sky-500 outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>{isEn ? 'Start index (start):' : 'Vị trí bắt đầu tìm (start):'}</span>
              <span className="font-mono text-sky-400 font-bold">{startIdx}</span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(0, parentStr.length - 1)}
              value={startIdx}
              onChange={(e) => setStartIdx(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer mt-2"
            />
          </div>
        </div>

        {/* Visual String Character Strip */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between">
            <span>{isEn ? 'Character Indices Breakdown:' : 'Sơ đồ phân giải chỉ số từng kí tự:'}</span>
            <span className="font-mono text-slate-500">len(s) = {parentStr.length}</span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {parentStr.split('').map((ch, idx) => {
              const isMatch = findResult !== -1 && idx >= findResult && idx < findResult + subStr.length;
              const isPastStart = idx >= startIdx;

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center shrink-0 min-w-8 rounded-lg p-1.5 border transition-all ${
                    isMatch
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-md shadow-emerald-500/20 scale-105'
                      : isPastStart
                      ? 'bg-slate-900 border-slate-700 text-slate-200'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-500 opacity-50'
                  }`}
                >
                  <span className="text-xs font-mono font-bold">
                    {ch === ' ' ? '␣' : ch}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">
                    {idx}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Results Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-300">
              "{subStr}" in s
            </span>
            <span className={`px-2.5 py-1 rounded-md font-bold text-sm ${
              inResult ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}>
              {inResult ? 'True' : 'False'}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-300">
              s.find("{subStr}", {startIdx})
            </span>
            <span className={`px-2.5 py-1 rounded-md font-bold text-sm ${
              findResult !== -1 ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}>
              {findResult}
            </span>
          </div>
        </div>
      </div>

      {/* Review Questions (Câu hỏi củng cố Mục 1 - Trang 124 SGK) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-base text-white">
            {isEn ? 'Review Questions (SGK Page 124)' : 'Câu hỏi Củng cố Mục 1 (Trang 124 SGK)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Câu 1 • Trang 124
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-100">
              {isEn
                ? 'Is the following logical expression True or False?'
                : 'Biểu thức lôgic sau là đúng hay sai?'}
            </p>
            <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-amber-300 border border-slate-800">
              &gt;&gt;&gt; "010" in "001100"
            </div>

            <button
              type="button"
              onClick={() => setQ1Revealed(!q1Revealed)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{q1Revealed ? (isEn ? 'Hide Answer' : 'Ẩn giải thích') : (isEn ? 'Show Answer & Explanation' : 'Xem đáp án & giải thích')}</span>
            </button>

            {q1Revealed && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 text-xs space-y-2 animate-in fade-in duration-200">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>{isEn ? 'Answer: False' : 'Đáp án: False (Sai)'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isEn
                    ? 'In "001100", the 3-char consecutive substrings are: "001", "011", "110", "100". Since "010" does not exist continuously, Python returns False.'
                    : 'Trong xâu "001100", các xâu con 3 kí tự liên tiếp gồm: "001", "011", "110", "100". Không có cụm nào là "010", do đó kết quả là False.'}
                </p>
              </div>
            )}
          </div>

          {/* Question 2 */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Câu 2 • Trang 124
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-100">
              {isEn
                ? 'What value does the following command return?'
                : 'Lệnh sau trả lại giá trị gì?'}
            </p>
            <div className="p-2.5 rounded-lg bg-black/60 font-mono text-xs text-amber-300 border border-slate-800">
              &gt;&gt;&gt; "ababababab".find("ab", 4)
            </div>

            <button
              type="button"
              onClick={() => setQ2Revealed(!q2Revealed)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{q2Revealed ? (isEn ? 'Hide Answer' : 'Ẩn giải thích') : (isEn ? 'Show Answer & Explanation' : 'Xem đáp án & giải thích')}</span>
            </button>

            {q2Revealed && (
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs space-y-2 animate-in fade-in duration-200">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isEn ? 'Answer: 4' : 'Đáp án: 4'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {isEn
                    ? '"ab" appears at indices 0, 2, 4, 6, 8. With start=4, search commences at index 4, which immediately matches "ab", returning 4.'
                    : 'Xâu chứa các cụm "ab" tại chỉ số 0, 2, 4, 6, 8. Với start = 4, việc tìm kiếm bắt đầu tại vị trí 4, tại đây bắt đầu ngay cụm "ab" nên trả về chỉ số 4.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
