import React, { useState } from 'react';
import { Globe, Sparkles, BookOpen, HelpCircle, Play, Code2, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section28GlobalScope: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Global Keyword Interactive Studio State
  const [useGlobal, setUseGlobal] = useState<boolean>(true);
  const [initOuterT, setInitOuterT] = useState<number>(10);
  const [callArgN, setCallArgN] = useState<number>(1);
  const [currentOuterT, setCurrentOuterT] = useState<number>(10);
  const [funcOutput, setFuncOutput] = useState<number | null>(null);
  const [executionMessage, setExecutionMessage] = useState<string>('');

  // Review Question (Trang 138) State
  const [revX, setRevX] = useState<number>(1);
  const [revY, setRevY] = useState<number>(2);
  const [revN, setRevN] = useState<number>(10);
  const [revResult, setRevResult] = useState<number>(16);
  const [qRevealed, setQRevealed] = useState<boolean>(false);

  // Run Global Studio
  const handleRunStudio = () => {
    const computedLocalT = 2 * callArgN + 1;
    setFuncOutput(computedLocalT);

    if (useGlobal) {
      setCurrentOuterT(computedLocalT);
      setExecutionMessage(
        isEn
          ? `With "global t": Outer variable t mutated permanently from ${initOuterT} to ${computedLocalT}!`
          : `Có "global t": Biến toàn cục t ngoài hàm bị thay đổi vĩnh viễn từ ${initOuterT} thành ${computedLocalT}!`
      );
    } else {
      setCurrentOuterT(initOuterT);
      setExecutionMessage(
        isEn
          ? `Without "global t": Variable t inside function was purely local (= ${computedLocalT}). Outer t remains ${initOuterT}!`
          : `Không có "global t": Biến t trong hàm chỉ là biến cục bộ (= ${computedLocalT}). Biến t ngoài hàm vẫn giữ nguyên là ${initOuterT}!`
      );
    }
  };

  const handleResetStudio = () => {
    setCurrentOuterT(initOuterT);
    setFuncOutput(null);
    setExecutionMessage('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full w-fit border border-indigo-500/20">
          <span>{isEn ? 'Section 2: Global Scope & Keyword' : 'Mục 2: Biến khai báo ngoài hàm & Từ khoá global'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 137 – 138' : 'Trang 137 – 138 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '2. Scope of Variables Declared Outside a Function' : '2. Phạm Vi Của Biến Khai Báo Ngoài Hàm'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Explore how functions interact with global variables: read-only accessibility by default, and using the global keyword when mutations are intended.'
            : 'Khám phá cách hàm tương tác với biến toàn cục ở chương trình chính: khả năng đọc giá trị tự do trong các biểu thức, và cách khai báo từ khoá global khi cần thay đổi giá trị của biến ngoài.'}
        </p>
      </div>

      {/* Hoạt động 2 & Hai ví dụ đối chiếu SGK Trang 137 */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
          <BookOpen className="w-5 h-5" />
          <span>{isEn ? 'Activity 2: Two Scenarios of Global Variables (SGK Page 137)' : 'Hoạt động 2: Hai Tình Huống Biến Khai Báo Ngoài Hàm (Trang 137 SGK)'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
          {/* Ví dụ 1: Gán lại biến ngoài nhưng không có global */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold border-b border-slate-800 pb-1 font-sans">
              Ví dụ 1: Biến ngoài không bị thay đổi bởi hàm
            </div>
            <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">f</span>(n):</div>
            <div className="pl-4 text-purple-300">t = n + 1  <span className="text-slate-500 text-[11px]"># t ở đây là biến cục bộ!</span></div>
            <div className="pl-4 text-pink-400 font-bold">return t</div>
            <div className="pt-1 text-cyan-300">&gt;&gt;&gt; t = 10  <span className="text-slate-500 text-[11px]"># Biến t ngoài hàm</span></div>
            <div className="text-slate-300">&gt;&gt;&gt; f(5)</div>
            <div className="text-purple-400 font-bold">6</div>
            <div className="text-slate-300">&gt;&gt;&gt; t</div>
            <div className="text-emerald-400 font-bold">10  <span className="text-emerald-300 font-normal text-[11px]">← t ngoài vẫn là 10!</span></div>
            <p className="font-sans text-[11px] text-slate-400 pt-1 border-t border-slate-800 leading-relaxed">
              Trong hàm gán <code>t = n + 1</code> tạo ra một biến <em>cục bộ</em> tên là <code>t</code>. Khi thoát khỏi <code>f()</code>, biến ngoài <code>t</code> vẫn giữ nguyên giá trị 10.
            </p>
          </div>

          {/* Ví dụ 2: Đọc giá trị biến toàn cục N */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1 font-sans">
              Ví dụ 2: Trong hàm có thể đọc giá trị biến ngoài
            </div>
            <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">f</span>(a, b):</div>
            <div className="pl-4 text-cyan-300"><span className="text-pink-400 font-bold">return</span> a + b + N  <span className="text-slate-500 text-[11px]"># Đọc N từ ngoài!</span></div>
            <div className="pt-1 text-cyan-300">&gt;&gt;&gt; N = 10  <span className="text-slate-500 text-[11px]"># Biến N ngoài hàm</span></div>
            <div className="text-slate-300">&gt;&gt;&gt; f(1, 2)</div>
            <div className="text-emerald-400 font-bold">13  <span className="text-emerald-300 font-normal text-[11px]">← 1 + 2 + 10 = 13</span></div>
            <p className="font-sans text-[11px] text-slate-400 pt-4 border-t border-slate-800 leading-relaxed">
              Biến <code>N = 10</code> được định nghĩa ngoài hàm. Hàm <code>f(a, b)</code> được phép truy cập để <strong>sử dụng giá trị</strong> của <code>N</code> trong các biểu thức tính toán.
            </p>
          </div>
        </div>
      </div>

      {/* Lưu ý từ khoá global (Trang 138 SGK) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-fuchsia-400">
          <Sparkles className="w-5 h-5" />
          <span>{isEn ? 'The global Keyword: Mutating Outer Variables (SGK Page 138)' : 'Lưu Ý Từ Khoá global: Thay Đổi Giá Trị Biến Ngoài (Trang 138 SGK)'}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {isEn
            ? 'If you want a variable declared inside a function to directly rebind or mutate an outer global variable, you MUST declare it inside the function using the global keyword:'
            : 'Nếu muốn biến bên ngoài vẫn có tác dụng bên trong hàm (được phép thay đổi giá trị của biến ngoài từ bên trong hàm), ta cần khai báo lại biến này bên trong hàm với từ khoá global:'}
        </p>

        <div className="p-4 rounded-2xl bg-slate-950 border border-fuchsia-500/30 font-mono text-xs space-y-1.5">
          <div>&gt;&gt;&gt; <span className="text-pink-400 font-bold">def</span> <span className="text-amber-300 font-bold">f</span>(n):</div>
          <div className="pl-6 text-fuchsia-400 font-bold">global t  <span className="text-slate-500 font-normal text-[11px]">← Khai báo biến t là biến toàn cục ngoài hàm!</span></div>
          <div className="pl-6 text-purple-300">t = 2 * n + 1</div>
          <div className="pl-6 text-pink-400 font-bold">return t</div>
          <div className="pt-1 text-slate-400">&gt;&gt;&gt; t = 10  <span className="text-slate-500 text-[11px]"># Ban đầu t = 10</span></div>
          <div className="text-slate-300">&gt;&gt;&gt; f(1)</div>
          <div className="text-fuchsia-400 font-bold">3</div>
          <div className="text-slate-300">&gt;&gt;&gt; t  <span className="text-slate-500 text-[11px]"># Kiểm tra lại biến ngoài</span></div>
          <div className="text-emerald-400 font-bold">3  <span className="text-emerald-300 font-normal text-[11px]">← Giá trị t ngoài hàm ĐÃ BỊ THAY ĐỔI từ 10 thành 3!</span></div>
        </div>
      </div>

      {/* Hộp Ghi nhớ 2 (Trang 138 SGK) */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-fuchsia-950/60 via-slate-900 to-slate-900 border-2 border-fuchsia-500/40 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-fuchsia-400" />
          <h3 className="text-base font-bold text-fuchsia-300 uppercase tracking-wide">
            <BilingualText
              vi="Hộp Ghi Nhớ 2 (Trang 138 SGK): Quy Tắc Từ Khoá global"
              en="Summary Box 2 (SGK Page 138): The global Keyword Rule"
            />
          </h3>
        </div>
        <div className="text-sm sm:text-base text-slate-200 leading-relaxed pl-3 border-l-2 border-fuchsia-500 font-medium">
          <BilingualText
            vi="Biến đã khai báo bên ngoài sẽ không có tác dụng bên trong hàm như một biến (không thể tự do gán lại). Nếu muốn gán lại hay thay đổi giá trị của biến ngoài này từ trong hàm, bắt buộc phải khai báo lại với từ khoá global."
            en="A variable declared externally cannot be reassigned inside a function as a local variable. If you intend to rebind or modify its value from within the function, it must be explicitly declared using the 'global' keyword."
          />
        </div>
        <div className="p-3 bg-fuchsia-950/40 rounded-xl border border-fuchsia-500/30 text-xs text-fuchsia-200 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
          <BilingualText
            vi="Quy tắc cốt lõi: Chỉ ĐỌC biến toàn cục (ví dụ: a + b + N) thì KHÔNG CẦN từ khoá global. Từ khoá global CHỈ BẮT BUỘC khi bạn GÁN LẠI giá trị (ví dụ: t = 2*n + 1 hoặc đếm số lần gọi count = count + 1)."
            en="Core Distinction: READING global variables (e.g. a + b + N) does NOT require the global keyword. The 'global' keyword is STRICTLY REQUIRED only when RE-BINDING or ASSIGNING a new value (e.g. t = 2*n + 1 or count = count + 1)."
          />
        </div>
      </div>

      {/* Interactive Global Keyword Simulator */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-fuchsia-400">
            <Globe className="w-5 h-5" />
            <span>{isEn ? 'Interactive global Keyword Simulator' : 'Trình Thử Nghiệm Tương Tác: Bật/Tắt Từ Khoá global'}</span>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
            f(n): {useGlobal ? 'global t;' : ''} t = 2*n + 1
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-slate-400 font-mono block mb-1">Giá trị ban đầu của t (ngoài hàm):</label>
            <input
              type="number"
              value={initOuterT}
              onChange={(e) => {
                const val = Number(e.target.value);
                setInitOuterT(val);
                setCurrentOuterT(val);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-center"
            />
          </div>

          <div>
            <label className="text-slate-400 font-mono block mb-1">Tham số truyền vào n:</label>
            <input
              type="number"
              value={callArgN}
              onChange={(e) => setCallArgN(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-center"
            />
          </div>

          <div>
            <label className="text-slate-400 font-mono block mb-1">Chế độ từ khoá global:</label>
            <button
              onClick={() => {
                setUseGlobal(!useGlobal);
                handleResetStudio();
              }}
              className={`w-full py-2 rounded-xl font-bold transition-all cursor-pointer ${
                useGlobal
                  ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {useGlobal ? '✓ CÓ global t' : '✗ KHÔNG CÓ global'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunStudio}
            className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Gọi f({callArgN})</span>
          </button>
          <button
            onClick={handleResetStudio}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Đặt lại ban đầu
          </button>
        </div>

        {/* Live Output */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Kết quả hàm trả lại:</span>
            <span className="text-base font-bold text-fuchsia-400">
              {funcOutput !== null ? `f(${callArgN}) = ${funcOutput}` : 'Chưa gọi hàm'}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-300">Giá trị biến t ngoài hàm hiện tại:</span>
            <span className={`text-base font-bold px-3 py-0.5 rounded-lg border ${
              currentOuterT !== initOuterT
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              t = {currentOuterT}
            </span>
          </div>
          {executionMessage && (
            <div className="text-[11px] text-amber-300 pt-1 font-sans">
              ➜ {executionMessage}
            </div>
          )}
        </div>
      </div>

      {/* Câu hỏi củng cố (Trang 138 SGK) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-400">
          <HelpCircle className="w-5 h-5" />
          <span>{isEn ? 'Review Question (SGK Page 138)' : 'Câu Hỏi Củng Cố (Trang 138 SGK)'}</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Bài toán củng cố trang 138
            </span>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-1">
              <div>&gt;&gt;&gt; <span className="text-pink-400 font-bold">def</span> <span className="text-amber-300 font-bold">f</span>(x, y):</div>
              <div className="pl-6">a = 2 * (x + y)</div>
              <div className="pl-6 text-emerald-400 font-bold">print(a + n)  <span className="text-slate-500 font-normal"># Đọc biến n từ ngoài</span></div>
              <div className="pt-1 text-cyan-300">n = 10</div>
              <div className="text-cyan-300">f(1, 2)</div>
            </div>
            <p className="text-xs text-white font-medium">
              Kết quả nào được in ra khi thực hiện các lệnh trên?
            </p>
          </div>

          <div>
            <button
              onClick={() => setQRevealed(!qRevealed)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all w-fit cursor-pointer"
            >
              <span>{qRevealed ? (isEn ? 'Hide Explanation' : 'Ẩn giải thích') : (isEn ? 'Reveal Detailed Solution' : 'Xem lời giải & Tính toán từng bước')}</span>
            </button>

            {qRevealed && (
              <div className="mt-2.5 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 space-y-2 animate-in fade-in leading-relaxed">
                <div className="text-base font-bold text-emerald-400 font-mono">Kết quả in ra: 16</div>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  <li>Khi gọi <code>f(1, 2)</code>: <code>x = 1, y = 2</code>.</li>
                  <li>Biến cục bộ <code>a = 2 * (1 + 2) = 2 * 3 = 6</code>.</li>
                  <li>Trong câu lệnh <code>print(a + n)</code>: biến <code>n</code> không có trong hàm nên Python tìm ở phạm vi ngoài hàm và tìm thấy <code>n = 10</code>.</li>
                  <li>Biểu thức <code>a + n = 6 + 10 = 16</code> được in ra màn hình.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
