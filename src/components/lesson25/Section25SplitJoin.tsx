import React, { useState } from 'react';
import { Scissors, Link2, Info, HelpCircle, CheckCircle2, Sparkles, ArrowRightLeft, Terminal, FileCode2 } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section25SplitJoin: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive Sandbox state
  const [inputText, setInputText] = useState<string>('Tiên học lễ hậu học văn');
  const [splitChar, setSplitChar] = useState<string>(' ');
  const [joinChar, setJoinChar] = useState<string>(' - ');

  // Review Question reveal
  const [qRevealed, setQRevealed] = useState<boolean>(false);

  // Compute tokens and joined string
  const tokens = splitChar === ' '
    ? inputText.trim().split(/\s+/).filter(Boolean)
    : inputText.split(splitChar);

  const joinedResult = tokens.join(joinChar);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full w-fit border border-indigo-500/20">
          <span>{isEn ? 'Section 2' : 'Mục 2'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 124 – 125' : 'Trang 124 – 125 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '2. Common String Methods: split() and join()' : '2. Một Số Lệnh Thường Dùng Với Xâu Kí Tự: split() & join()'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Deconstruct strings into lists of words using split(), and assemble lists of strings into a unified text with join().'
            : 'Tách xâu thành danh sách các từ độc lập bằng phương thức split(), và ghép các phần tử danh sách thành một xâu duy nhất bằng join().'}
        </p>
      </div>

      {/* Hoạt động 2: Một số lệnh thường dùng với xâu kí tự */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 shadow-lg space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">
              {isEn ? 'Activity 2: The Duality of split() and join()' : 'Hoạt động 2: Cặp lệnh đối ngẫu split() và join()'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Observe how split() and join() act as inverse operations' : 'Quan sát hai phương thức chuyển hoá qua lại giữa xâu và danh sách'}
            </p>
          </div>
        </div>

        {/* Comparison Grid: split() vs join() */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Lệnh split() */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Scissors className="w-4 h-4" />
                  <span>{isEn ? 'split() Method' : 'Phương thức split()'}</span>
                </span>
                <span className="text-[11px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  String → List
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-sky-950/30 border border-sky-800/40 text-xs font-mono text-amber-300">
                &lt;xâu mẹ&gt;.split(&lt;kí tự tách&gt;)
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn ? (
                  <>
                    Splits a string into words and puts them into a <strong>list</strong>.
                    Default delimiter is <strong>whitespace</strong>, but can be customized (e.g. comma <code>","</code>).
                  </>
                ) : (
                  <>
                    Tách một xâu thành các từ và đưa vào một <strong>danh sách</strong>.
                    Kí tự tách mặc định là <strong>dấu cách</strong> (khoảng trắng), tuy nhiên có thể chỉ định kí tự khác (như dấu phẩy <code>","</code>).
                  </>
                )}
              </p>

              <div className="bg-black/60 p-3 rounded-xl font-mono text-xs space-y-1.5 border border-slate-800">
                <div className="text-slate-400"># Ví dụ 1 (SGK Tr. 124) - Tách mặc định:</div>
                <div className="text-slate-200">&gt;&gt;&gt; s = "Tiên học lễ hậu học văn"</div>
                <div className="text-sky-300">&gt;&gt;&gt; s.split()</div>
                <div className="text-emerald-400">['Tiên', 'học', 'lễ', 'hậu', 'học', 'văn']</div>

                <div className="text-slate-400 pt-1"># Tách theo dấu phẩy:</div>
                <div className="text-slate-200">&gt;&gt;&gt; st = "0,1,2,3,4,5,6,10"</div>
                <div className="text-sky-300">&gt;&gt;&gt; st.split(",")</div>
                <div className="text-emerald-400">['0', '1', '2', '3', '4', '5', '6', '10']</div>
              </div>
            </div>
          </div>

          {/* Lệnh join() */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Link2 className="w-4 h-4" />
                  <span>{isEn ? 'join() Method' : 'Phương thức join()'}</span>
                </span>
                <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  List → String
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-800/40 text-xs font-mono text-amber-300">
                "&lt;kí tự nối&gt;".join(&lt;danh sách&gt;)
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {isEn ? (
                  <>
                    Has the inverse effect of <code>split()</code>. Connects elements (strings) of a list into a single string separated by the connector.
                  </>
                ) : (
                  <>
                    Có tác dụng <strong>ngược với lệnh split()</strong>. Nối các phần tử (là xâu) của một danh sách thành một xâu duy nhất, ngăn cách bởi xâu nối.
                  </>
                )}
              </p>

              <div className="bg-black/60 p-3 rounded-xl font-mono text-xs space-y-1.5 border border-slate-800">
                <div className="text-slate-400"># Ví dụ 2 (SGK Tr. 125) - Nối dấu cách:</div>
                <div className="text-slate-200">&gt;&gt;&gt; A = ['Tiên', 'học', 'lễ', 'hậu', 'học', 'văn']</div>
                <div className="text-indigo-300">&gt;&gt;&gt; " ".join(A)</div>
                <div className="text-emerald-400">'Tiên học lễ hậu học văn'</div>

                <div className="text-slate-400 pt-1"># Nối theo dấu phẩy:</div>
                <div className="text-slate-200">&gt;&gt;&gt; B = ['0', '1', '2', '3', '4', '5', '6', '10']</div>
                <div className="text-indigo-300">&gt;&gt;&gt; ",".join(B)</div>
                <div className="text-emerald-400">'0,1,2,3,4,5,6,10'</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hộp Ghi nhớ 2 (Trang 125 SGK) */}
        <div className="p-5 rounded-2xl bg-linear-to-r from-indigo-950/40 via-indigo-900/20 to-slate-900 border-2 border-dashed border-indigo-500/60 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Info className="w-5 h-5 shrink-0" />
            <span>{isEn ? 'Summary Box 2 (Textbook p. 125)' : 'Hộp Ghi nhớ 2 (Trang 125 SGK)'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-7 font-medium">
            {isEn
              ? 'Python provides special commands to process strings: split() to decompose a string into a list, and join() to concatenate a list of strings into a single string.'
              : 'Python có các lệnh đặc biệt để xử lí xâu là split() dùng để tách xâu thành danh sách và lệnh join() dùng để nối danh sách các xâu thành một xâu.'}
          </p>
        </div>
      </div>

      {/* Interactive split() & join() Sandbox */}
      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-base sm:text-lg text-white">
              {isEn ? 'Interactive split() & join() Transformer' : 'Phòng Thí Nghiệm Tách & Nối Xâu Tương Tác Trực Tiếp'}
            </h3>
          </div>
          <span className="text-xs font-mono text-indigo-300">Live Python Playground</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-400">
              {isEn ? 'Input String to Transform:' : 'Nhập xâu ban đầu:'}
            </label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-white focus:border-indigo-500 outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400">
              {isEn ? 'Preset textbook strings:' : 'Chọn mẫu câu SGK:'}
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setInputText('Tiên học lễ hậu học văn');
                  setSplitChar(' ');
                  setJoinChar(' ');
                }}
                className="px-2 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                Tiên học lễ...
              </button>
              <button
                type="button"
                onClick={() => {
                  setInputText('gà,vịt,chó,lợn,ngựa,cá');
                  setSplitChar(',');
                  setJoinChar(' ');
                }}
                className="px-2 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                gà,vịt,chó...
              </button>
            </div>
          </div>
        </div>

        {/* Step 1: split() Visualizer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {isEn ? 'Step 1' : 'Bước 1'}
              </span>
              <span className="text-xs font-mono text-sky-400 font-bold">
                tokens = s.split("{splitChar === ' ' ? '' : splitChar}")
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              len = {tokens.length} {isEn ? 'elements' : 'phần tử'}
            </span>
          </div>

          {/* Visual token capsules */}
          <div className="flex items-center gap-2 flex-wrap p-3 rounded-lg bg-black/40 border border-slate-800/80 min-h-12">
            {tokens.length === 0 ? (
              <span className="text-xs text-slate-500 italic">
                {isEn ? '(empty list)' : '(danh sách rỗng)'}
              </span>
            ) : (
              tokens.map((token, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-400/40 text-indigo-300 font-mono text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span className="text-[10px] text-slate-500">[{idx}]</span>
                  <span className="font-bold">'{token}'</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Step 2: join() Visualizer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {isEn ? 'Step 2' : 'Bước 2'}
              </span>
              <span className="text-xs font-mono text-indigo-400 font-bold">
                result = "{joinChar}".join(tokens)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">{isEn ? 'Connector:' : 'Kí tự nối:'}</span>
              {[' ', ', ', ' - ', ' * '].map((char) => (
                <button
                  key={char}
                  type="button"
                  onClick={() => setJoinChar(char)}
                  className={`px-2 py-0.5 rounded text-xs font-mono cursor-pointer ${
                    joinChar === char ? 'bg-indigo-500 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  "{char}"
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-emerald-400 font-bold">
            '{joinedResult}'
          </div>
        </div>
      </div>

      {/* Review Question (Câu hỏi củng cố Mục 2 - Trang 125 SGK) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-base text-white">
            {isEn ? 'Review Question (SGK Page 125)' : 'Câu hỏi Củng cố Mục 2 (Trang 125 SGK)'}
          </h3>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <p className="text-sm font-semibold text-slate-100 leading-relaxed">
            {isEn ? (
              <>
                Given string: <code className="text-amber-300">"gà,vịt,chó,lợn,ngựa,cá"</code>.
                Explain how to remove all commas <code className="text-sky-300">","</code> and replace them with spaces <code className="text-sky-300">" "</code> in this string.
              </>
            ) : (
              <>
                Cho xâu kí tự: <code className="text-amber-300">"gà,vịt,chó,lợn,ngựa,cá"</code>.
                Em hãy trình bày cách làm để xoá các dấu <code className="text-sky-300">","</code> và thay thế bằng dấu <code className="text-sky-300">" "</code> trong xâu này.
              </>
            )}
          </p>

          <button
            type="button"
            onClick={() => setQRevealed(!qRevealed)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-indigo-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{qRevealed ? (isEn ? 'Hide Solution' : 'Ẩn lời giải') : (isEn ? 'Show Step-by-Step Solution' : 'Xem các bước giải SGK')}</span>
          </button>

          {qRevealed && (
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs space-y-3 animate-in fade-in duration-200">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEn ? 'Official Textbook Solution:' : 'Lời giải chi tiết chuẩn SGK:'}</span>
              </div>

              <div className="space-y-2 text-slate-200 leading-relaxed">
                <div>
                  <strong>{isEn ? 'Step 1:' : 'Bước 1:'}</strong>{' '}
                  {isEn
                    ? 'Split the initial string into a list of words using comma delimiter:'
                    : 'Tách xâu ban đầu thành danh sách các từ bằng dấu phẩy:'}
                  <div className="mt-1 p-2 bg-black/60 font-mono text-sky-300 rounded border border-slate-800">
                    &gt;&gt;&gt; s = "gà,vịt,chó,lợn,ngựa,cá"
                    <br />
                    &gt;&gt;&gt; ds = s.split(",")
                    <br />
                    # {isEn ? "Result: ['gà', 'vịt', 'chó', 'lợn', 'ngựa', 'cá']" : "Kết quả: ['gà', 'vịt', 'chó', 'lợn', 'ngựa', 'cá']"}
                  </div>
                </div>

                <div>
                  <strong>{isEn ? 'Step 2:' : 'Bước 2:'}</strong>{' '}
                  {isEn
                    ? 'Rejoin the list of words using space as connector:'
                    : 'Nối lại danh sách các từ bằng dấu cách:'}
                  <div className="mt-1 p-2 bg-black/60 font-mono text-indigo-300 rounded border border-slate-800">
                    &gt;&gt;&gt; s_moi = " ".join(ds)
                    <br />
                    # {isEn ? "Result: 'gà vịt chó lợn ngựa cá'" : "Kết quả: 'gà vịt chó lợn ngựa cá'"}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
                  💡 <strong>{isEn ? 'One-line combined syntax:' : 'Cách viết gộp trong 1 dòng:'}</strong>{' '}
                  <code className="font-mono font-bold">s_moi = " ".join(s.split(","))</code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
