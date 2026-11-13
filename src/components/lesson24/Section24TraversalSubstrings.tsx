import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  ListOrdered,
  BookOpen,
  Terminal,
  Search,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';

export const Section24TraversalSubstrings: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();

  // Traversal Mode Toggle: 'index' | 'char'
  const [traversalMode, setTraversalMode] = useState<'index' | 'char'>('char');
  const [traversalText, setTraversalText] = useState<string>('Thời khoá biểu');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [printedChars, setPrintedChars] = useState<string[]>(['T']);

  const handleStepTraversal = () => {
    setActiveStep(prev => {
      const next = (prev + 1) % traversalText.length;
      if (next === 0) {
        setPrintedChars([traversalText[0]]);
      } else {
        setPrintedChars(Array.from(traversalText).slice(0, next + 1));
      }
      return next;
    });
  };

  // Substring In-Operator Lab
  const [labS1, setLabS1] = useState<string>('abc');
  const [labS2, setLabS2] = useState<string>('ababcabca');
  const [inResult, setInResult] = useState<boolean>(true);

  const handleCheckSubstring = (sub: string, parent: string) => {
    setLabS1(sub);
    setLabS2(parent);
    setInResult(parent.includes(sub));
  };

  // Củng cố 1 Step-by-step state: s = "81723"
  const [c1Step, setC1Step] = useState<number>(4); // finished by default
  const c1Digits = ['8', '1', '7', '2', '3'];

  // Củng cố 2 answer toggles
  const [c2Answers, setC2Answers] = useState<Record<string, boolean | null>>({
    a: null,
    b: null,
    c: null,
    d: null
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-linear-to-r from-indigo-900/30 via-slate-900 to-slate-900 border border-indigo-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
              {bilingualMode === 'en' ? 'SECTION 2 • PAGES 120 – 121 SGK' : 'MỤC 2 • TRANG 120 – 121 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            <BilingualText
              vi="2. Lệnh Duyệt Kí Tự Của Xâu"
              en="2. Character Traversal & Substring Verification"
            />
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {bilingualMode === 'en'
              ? 'Compare index-based and character-based for loop traversal, and test substring containment with "in" operator'
              : 'So sánh 2 cơ chế duyệt for loop và kiểm tra quan hệ xâu con với toán tử s1 in s2'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(120);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shrink-0 cursor-pointer self-start sm:self-center"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{bilingualMode === 'en' ? 'Compare SGK Page 120' : 'Đối chiếu SGK Trang 120'}</span>
        </button>
      </div>

      {/* Hoạt động 2: Tìm hiểu lệnh duyệt từng kí tự của xâu */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
            HĐ2
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              <BilingualText
                vi="Hoạt động 2: Tìm hiểu lệnh duyệt từng kí tự của xâu"
                en="Activity 2: Iterating Over Characters in a String"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {bilingualMode === 'en'
                ? 'Two patterns to traverse strings with for loops: index-based with range(len(s)) or direct element iteration for ch in s.'
                : 'Có hai cách duyệt xâu bằng lệnh for: duyệt theo chỉ số với range() hoặc duyệt trực tiếp từng phần tử của xâu.'}
            </p>
          </div>
        </div>

        {/* 2 Cách duyệt chuẩn SGK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cách 1: Theo chỉ số */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <div className="text-slate-400 font-sans font-bold text-[11px]">
              {bilingualMode === 'en'
                ? 'Pattern 1: Index-based iteration with range()'
                : 'Cách 1: Duyệt theo chỉ số với lệnh range()'}
            </div>
            <div className="text-cyan-400">&gt;&gt;&gt; s = "Thời khoá biểu"</div>
            <div className="text-slate-200">
              &gt;&gt;&gt; for i in range(len(s)):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(s[i], end = " ")
            </div>
            <div className="text-amber-400 font-bold pt-1">
              T h ờ i &nbsp; k h o á &nbsp; b i ể u
            </div>
            <div className="text-slate-400 text-[11px] font-sans italic pt-1 border-t border-slate-800">
              {bilingualMode === 'en'
                ? '• Variable i successively takes values from 0 to len(s) - 1. Character at index i is s[i].'
                : '• Biến i lần lượt nhận giá trị từ 0 đến len(s) - 1. Kí tự tại chỉ số i là s[i].'}
            </div>
          </div>

          {/* Cách 2: Trực tiếp từng kí tự */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <div className="text-slate-400 font-sans font-bold text-[11px]">
              {bilingualMode === 'en'
                ? 'Pattern 2: Direct character iteration'
                : 'Cách 2: Duyệt theo kí tự của xâu (Trực tiếp)'}
            </div>
            <div className="text-cyan-400">&gt;&gt;&gt; s = "Thời khoá biểu"</div>
            <div className="text-slate-200">
              &gt;&gt;&gt; for ch in s:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(ch, end = " ")
            </div>
            <div className="text-emerald-400 font-bold pt-1">
              T h ờ i &nbsp; k h o á &nbsp; b i ể u
            </div>
            <div className="text-slate-400 text-[11px] font-sans italic pt-1 border-t border-slate-800">
              {bilingualMode === 'en'
                ? '• Variable ch is sequentially assigned directly to each character of string s without range().'
                : '• Biến ch lần lượt được gán trực tiếp từng kí tự của xâu s từ đầu đến cuối mà không cần range().'}
            </div>
          </div>
        </div>

        {/* Chú ý: Từ khoá in kiểm tra xâu con */}
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 text-xs space-y-2">
          <div className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>
              {bilingualMode === 'en'
                ? 'Key Note on the "in" Keyword (Textbook Pages 120 & 121)'
                : 'Chú ý quan trọng về từ khoá in (SGK Trang 120 & 121)'}
            </span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'The keyword "in", depending on context:'
              : 'Từ khoá in, tuỳ trường hợp cụ thể:'}
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 pl-2">
            <li>
              {bilingualMode === 'en' ? (
                <>
                  Either a <strong>logical operator</strong> checking whether a substring appears within a target string:{' '}
                  <span className="font-mono font-bold text-emerald-500 dark:text-emerald-400 ml-1">
                    "a" in "abcd" -&gt; True, "abc" in "abcd" -&gt; True
                  </span>
                </>
              ) : (
                <>
                  Hoặc là <strong>toán tử lôgic</strong> dùng để kiểm tra một xâu con có xuất hiện trong xâu mẹ hay không:{' '}
                  <span className="font-mono font-bold text-emerald-500 dark:text-emerald-400 ml-1">
                    "a" in "abcd" -&gt; True, "abc" in "abcd" -&gt; True
                  </span>
                </>
              )}
            </li>
            <li>
              {bilingualMode === 'en' ? (
                <>
                  Or part of <strong>for loop syntax</strong> to iterate through items in a range / list / string.
                </>
              ) : (
                <>
                  Hoặc là <strong>cú pháp vòng lặp for</strong> để lần lượt lấy từng phần tử từ vùng giá trị / danh sách / xâu.
                </>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Phòng Thí Nghiệm Kiểm Tra Xâu Con: s1 in s2 */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">
              {bilingualMode === 'en'
                ? 'Laboratory: Substring Operator (s1 in s2)'
                : 'Phòng Thí Nghiệm: Toán Tử Xâu Con (s1 in s2)'}
            </h3>
          </div>
          <span className="text-xs text-slate-300">
            {bilingualMode === 'en' ? 'Instant True/False evaluation' : 'Kiểm tra tức thì kết quả True/False'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  {bilingualMode === 'en' ? 'Substring s1:' : 'Xâu con s1:'}
                </label>
                <input
                  type="text"
                  value={labS1}
                  onChange={e => {
                    setLabS1(e.target.value);
                    setInResult(labS2.includes(e.target.value));
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  {bilingualMode === 'en' ? 'Target string s2:' : 'Xâu mẹ s2:'}
                </label>
                <input
                  type="text"
                  value={labS2}
                  onChange={e => {
                    setLabS2(e.target.value);
                    setInResult(e.target.value.includes(labS1));
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Presets from SGK */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs pt-1">
              <span className="text-slate-400">
                {bilingualMode === 'en' ? 'Checkpoint 2 presets (p. 121):' : 'Mẫu Củng cố 2 (Trang 121):'}
              </span>
              <button
                type="button"
                onClick={() => handleCheckSubstring('abc', 'ababcabca')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
              >
                "abc" in "ababcabca"
              </button>
              <button
                type="button"
                onClick={() => handleCheckSubstring('abcabc', 'ababcabca')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
              >
                s1+s1 ("abcabc") in s2
              </button>
              <button
                type="button"
                onClick={() => handleCheckSubstring('abcabca', 'ababcabca')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
              >
                "abcabca" in s2
              </button>
              <button
                type="button"
                onClick={() => handleCheckSubstring('abc123', 'ababcabca')}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
              >
                "abc123" in s2
              </button>
            </div>
          </div>

          {/* Result Box */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                {bilingualMode === 'en' ? 'Python Evaluation' : 'Kết Quả Python'}
              </div>
              <div className="font-mono text-xs text-slate-300">
                &gt;&gt;&gt; "{labS1}" in "{labS2}"
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800">
              {inResult ? (
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{bilingualMode === 'en' ? 'True (Is a substring)' : 'True (Là xâu con)'}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-rose-400 font-bold text-sm">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>{bilingualMode === 'en' ? 'False (Not a substring)' : 'False (Không phải xâu con)'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ 2 (SGK Trang 121) */}
      <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-dashed border-amber-500/40 space-y-2">
        <div className="flex items-center gap-2 font-black text-amber-500 text-sm tracking-wide uppercase">
          <BookOpen className="w-4 h-4" />
          <BilingualText
            vi="Ghi nhớ 2 (SGK Tin học 10 - Trang 121)"
            en="Summary Box 2 (Textbook Page 121)"
          />
        </div>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed list-disc list-inside">
          <li>
            <BilingualText
              vi="Có thể duyệt các kí tự của xâu bằng lệnh for tương tự như với danh sách."
              en="String characters can be iterated through using a for loop, analogous to iterating over a list."
            />
          </li>
          <li>
            <BilingualText
              vi="s1 in s2 trả lại giá trị True nếu s1 là xâu con của s2, ngược lại trả về False."
              en="'s1 in s2' evaluates to True if s1 is a substring of s2; otherwise, it returns False."
            />
          </li>
        </ul>
      </div>

      {/* Câu hỏi củng cố Mục 2 (SGK Trang 121) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-sm">
              ?
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              <BilingualText
                vi="Câu hỏi củng cố Mục 2 (SGK Trang 121)"
                en="Checkpoint Questions for Section 2 (Page 121)"
              />
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(121);
              setShowOriginalModal(true);
            }}
            className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Compare Page 121' : 'Đối chiếu Trang 121'}</span>
          </button>
        </div>

        {/* Câu 1: Đoạn lệnh s = "81723" */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {bilingualMode === 'en'
              ? '1. After executing the following code snippet, what is the value of variable '
              : '1. Sau khi thực hiện các lệnh sau, biến '}
            <code className="font-mono text-indigo-600 dark:text-indigo-400">skq</code>
            {bilingualMode === 'en' ? '?' : ' sẽ có giá trị bao nhiêu?'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div className="text-cyan-400">&gt;&gt;&gt; s = "81723"</div>
              <div className="text-slate-300">&gt;&gt;&gt; skq = ""</div>
              <div className="text-slate-200">&gt;&gt;&gt; for ch in s:</div>
              <div className="text-amber-300 pl-4">if int(ch) % 2 != 0:</div>
              <div className="text-emerald-400 pl-8">skq = skq + ch</div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-slate-400 text-[11px] font-sans">
                  {bilingualMode === 'en' ? 'Evaluated result:' : 'Đáp án kết quả:'}
                </div>
                <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                  skq = "173"
                </div>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {bilingualMode === 'en'
                    ? 'The loop iterates through each character: \'8\' (even, skip), \'1\' (odd, take), \'7\' (odd, take), \'2\' (even, skip), \'3\' (odd, take). Concatenation skq = skq + ch yields the string "173".'
                    : 'Vòng lặp duyệt qua từng kí tự: \'8\' (chẵn, bỏ qua), \'1\' (lẻ, lấy), \'7\' (lẻ, lấy), \'2\' (chẵn, bỏ qua), \'3\' (lẻ, lấy). Lệnh skq = skq + ch ghép lại thành xâu "173".'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Câu 2: s1 = "abc", s2 = "ababcabca" */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {bilingualMode === 'en' ? '2. Given ' : '2. Cho '}
            <code className="font-mono text-indigo-600 dark:text-indigo-400">s1 = "abc"</code>
            {bilingualMode === 'en' ? ', ' : ', '}
            <code className="font-mono text-indigo-600 dark:text-indigo-400">s2 = "ababcabca"</code>.
            {bilingualMode === 'en'
              ? ' Are the following logical expressions True or False?'
              : ' Các biểu thức lôgic sau cho kết quả là đúng hay sai?'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              {
                key: 'a',
                expr: 's1 in s2',
                isTrue: true,
                noteVi: '"abc" xuất hiện tại vị trí chỉ số 2 của s2.',
                noteEn: '"abc" appears starting at index 2 of s2.'
              },
              {
                key: 'b',
                expr: 's1 + s1 in s2',
                isTrue: true,
                noteVi: 's1 + s1 = "abcabc", xuất hiện tại s2[2:8].',
                noteEn: 's1 + s1 = "abcabc", which appears at s2[2:8].'
              },
              {
                key: 'c',
                expr: '"abcabca" in s2',
                isTrue: true,
                noteVi: '"abcabca" xuất hiện ở phần đuôi của s2.',
                noteEn: '"abcabca" appears in the tail segment of s2.'
              },
              {
                key: 'd',
                expr: '"abc123" in s2',
                isTrue: false,
                noteVi: 's2 không chứa chữ số nào nên "abc123" không nằm trong s2.',
                noteEn: 's2 contains no digits, so "abc123" is not found in s2.'
              }
            ].map(item => (
              <div
                key={item.key}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="font-mono font-bold text-slate-700 dark:text-slate-200">
                  {item.key}) {item.expr}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setC2Answers(prev => ({ ...prev, [item.key]: true }))}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      c2Answers[item.key] === true
                        ? item.isTrue
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-rose-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    True
                  </button>
                  <button
                    type="button"
                    onClick={() => setC2Answers(prev => ({ ...prev, [item.key]: false }))}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      c2Answers[item.key] === false
                        ? !item.isTrue
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-rose-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    False
                  </button>
                </div>
                {c2Answers[item.key] === item.isTrue && (
                  <div className="text-[11px] font-medium text-emerald-500">
                    <strong>{bilingualMode === 'en' ? 'Textbook Explanation: ' : 'Giải thích chuẩn SGK: '}</strong>
                    {item.isTrue
                      ? (bilingualMode === 'en' ? 'True. ' : 'Đúng (True). ')
                      : (bilingualMode === 'en' ? 'False. ' : 'Sai (False). ')}
                    {bilingualMode === 'en' ? item.noteEn : item.noteVi}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
