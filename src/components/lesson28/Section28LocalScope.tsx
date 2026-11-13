import React, { useState } from 'react';
import { Terminal, ShieldAlert, CheckCircle2, HelpCircle, BookOpen, Sparkles, Play, Layers, ArrowRight } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section28LocalScope: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive Sandbox State
  const [outerA, setOuterA] = useState<number>(1);
  const [outerB, setOuterB] = useState<number>(2);
  const [localN, setLocalN] = useState<number>(10);
  const [simulationLog, setSimulationLog] = useState<{
    callReturn: number;
    localAEnd: number;
    localBEnd: number;
    outerAEnd: number;
    outerBEnd: number;
    executed: boolean;
  }>({
    callReturn: 16,
    localAEnd: 2,
    localBEnd: 4,
    outerAEnd: 1,
    outerBEnd: 2,
    executed: false
  });

  const [attemptPrintN, setAttemptPrintN] = useState<boolean>(false);

  // Review Question Reveals
  const [q1Revealed, setQ1Revealed] = useState<boolean>(false);
  const [q2Revealed, setQ2Revealed] = useState<boolean>(false);

  const handleRunFunc = () => {
    // Inside func: a = outerA, b = outerB
    let aLoc = outerA;
    let bLoc = outerB;
    const nLoc = localN;

    aLoc = aLoc * 2;
    bLoc = aLoc + bLoc;
    const ret = aLoc + bLoc + nLoc;

    setSimulationLog({
      callReturn: ret,
      localAEnd: aLoc,
      localBEnd: bLoc,
      outerAEnd: outerA,
      outerBEnd: outerB,
      executed: true
    });
    setAttemptPrintN(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full w-fit border border-indigo-500/20">
          <span>{isEn ? 'Section 1: Local Scope' : 'Mục 1: Biến cục bộ trong hàm'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 136 – 137' : 'Trang 136 – 137 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '1. Scope of Variables Declared Inside a Function' : '1. Phạm Vi Của Biến Khai Báo Trong Hàm'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Variables declared within a function possess local scope: they are born when the function is invoked, operate exclusively inside the function body, and are discarded upon return.'
            : 'Các biến được khai báo bên trong một hàm chỉ có tính địa phương (cục bộ): chúng chỉ được sử dụng bên trong hàm đó, không thể truy cập từ chương trình chính và tự hủy khi hàm kết thúc.'}
        </p>
      </div>

      {/* Hoạt động 1 & Phân tích ví dụ SGK Trang 136 */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
          <BookOpen className="w-5 h-5" />
          <span>{isEn ? 'Activity 1 & Example (SGK Page 136): Local Lifecycle of func(a, b)' : 'Hoạt động 1 & Ví dụ (Trang 136 SGK): Vòng đời biến cục bộ trong hàm func(a, b)'}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {isEn
            ? 'Observe the code snippet from page 136. Notice that variables n, a, b inside func are completely segregated from variables a, b outside in the main program:'
            : 'Quan sát các câu lệnh trong SGK trang 136. Chú ý rằng các biến n, a, b bên trong hàm func hoàn toàn biệt lập với các biến a, b bên ngoài chương trình chính:'}
        </p>

        {/* Code Block with Visual Breakdown */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
          <div className="text-slate-500"># Định nghĩa hàm func với tham số a, b và biến cục bộ n</div>
          <div className="text-indigo-300">
            &gt;&gt;&gt; <span className="text-pink-400 font-bold">def</span> <span className="text-amber-300 font-bold">func</span>(a, b):
          </div>
          <div className="pl-6 text-purple-300">n = 10  <span className="text-slate-500 text-[11px]"># Biến cục bộ chỉ sống trong hàm</span></div>
          <div className="pl-6 text-purple-300">a = a * 2  <span className="text-slate-500 text-[11px]"># Thay đổi a cục bộ</span></div>
          <div className="pl-6 text-purple-300">b = a + b  <span className="text-slate-500 text-[11px]"># Thay đổi b cục bộ</span></div>
          <div className="pl-6 text-pink-400 font-bold">return a + b + n</div>

          <div className="pt-2 border-t border-slate-800 text-slate-500"># Chương trình chính khai báo biến a, b toàn cục</div>
          <div className="text-cyan-300">&gt;&gt;&gt; a = 1</div>
          <div className="text-cyan-300">&gt;&gt;&gt; b = 2</div>
          <div className="text-slate-300">&gt;&gt;&gt; func(a, b)</div>
          <div className="text-emerald-400 font-bold">16</div>

          <div className="pt-2 border-t border-slate-800 text-slate-500"># Kiểm tra giá trị của a, b ở ngoài sau khi gọi hàm:</div>
          <div className="text-slate-300">&gt;&gt;&gt; a, b</div>
          <div className="text-emerald-400 font-bold">(1, 2)  <span className="text-emerald-300 font-normal text-[11px]">← a, b ngoài hàm hoàn toàn KHÔNG THAY ĐỔI!</span></div>

          <div className="pt-2 border-t border-slate-800 text-slate-500"># Cố gắng truy cập biến n của hàm từ ngoài:</div>
          <div className="text-slate-300">&gt;&gt;&gt; n</div>
          <div className="text-rose-400 text-[11px] pl-3 border-l-2 border-rose-500 space-y-0.5">
            <div>Traceback (most recent call last):</div>
            <div>  File "&lt;pyshell#11&gt;", line 1, in &lt;module&gt;</div>
            <div className="font-bold">NameError: name 'n' is not defined</div>
          </div>
        </div>

        {/* Comparative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <Layers className="w-4 h-4" />
              <span>Bên trong hàm func (Cục bộ)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px] leading-relaxed">
              <li>Có các biến <code>n, a, b</code> hoạt động.</li>
              <li><code>n = 10</code> được gán và chỉ tồn tại trong lúc hàm chạy.</li>
              <li>Khi truyền <code>a=1, b=2</code>: <code>a</code> thành <code>1*2 = 2</code>, <code>b</code> thành <code>2+2 = 4</code>.</li>
              <li>Kết quả trả về: <code>2 + 4 + 10 = 16</code>.</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Bên ngoài hàm (Toàn cục)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px] leading-relaxed">
              <li>Biến <code>a = 1</code> và <code>b = 2</code> được gán ở chương trình chính.</li>
              <li>Sau khi chạy hàm, <code>a, b</code> vẫn là <code>(1, 2)</code>, không hề bị ảnh hưởng bởi các phép gán trong hàm.</li>
              <li>Biến <code>n</code> hoàn toàn không tồn tại bên ngoài, gọi <code>n</code> bị báo lỗi <code>NameError</code>.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ 1 (Trang 137 SGK) */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-indigo-950/60 via-slate-900 to-slate-900 border-2 border-indigo-500/40 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-indigo-300 uppercase tracking-wide">
            <BilingualText
              vi="Hộp Ghi Nhớ 1 (Trang 137 SGK): Tính Địa Phương Của Biến Trong Hàm"
              en="Summary Box 1 (SGK Page 137): Local Nature of Function Variables"
            />
          </h3>
        </div>
        <div className="text-sm sm:text-base text-slate-200 leading-relaxed pl-3 border-l-2 border-indigo-500 font-medium">
          <BilingualText
            vi="Trong Python tất cả các biến khai báo bên trong hàm đều có tính địa phương (cục bộ), không có hiệu lực ở bên ngoài hàm."
            en="In Python, all variables declared inside a function have local scope and are inaccessible and invisible outside the function."
          />
        </div>
      </div>

      {/* Interactive Local Scope Inspector Sandbox */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-indigo-400">
            <Terminal className="w-5 h-5" />
            <span>{isEn ? 'Interactive Scope Inspector Sandbox' : 'Thử Nghiệm Tương Tác: So Soi Ranh Giới Biến Trong và Ngoài Hàm'}</span>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
            func(a, b) Sandbox
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="text-slate-400 font-mono block mb-1">Biến ngoài a:</label>
            <input
              type="number"
              value={outerA}
              onChange={(e) => setOuterA(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-center"
            />
          </div>
          <div>
            <label className="text-slate-400 font-mono block mb-1">Biến ngoài b:</label>
            <input
              type="number"
              value={outerB}
              onChange={(e) => setOuterB(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-center"
            />
          </div>
          <div>
            <label className="text-slate-400 font-mono block mb-1">Biến n trong hàm:</label>
            <input
              type="number"
              value={localN}
              onChange={(e) => setLocalN(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-center"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          <button
            onClick={handleRunFunc}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Gọi func({outerA}, {outerB})</span>
          </button>

          <button
            onClick={() => setAttemptPrintN(true)}
            className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Thử print(n) ở ngoài
          </button>
        </div>

        {/* Live Status Board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-purple-500/30 space-y-1.5">
            <div className="text-purple-400 font-bold border-b border-slate-800 pb-1">
              [TRONG HÀM KHI CHẠY]
            </div>
            <div className="text-slate-300">a = a * 2 = {simulationLog.localAEnd}</div>
            <div className="text-slate-300">b = a + b = {simulationLog.localBEnd}</div>
            <div className="text-slate-300">n = {localN}</div>
            <div className="text-emerald-400 font-bold pt-1">
              return a + b + n = {simulationLog.callReturn}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-1.5">
            <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
              [NGOÀI CHƯƠNG TRÌNH CHÍNH SAU KHI CHẠY]
            </div>
            <div className="text-emerald-300 font-bold">a = {outerA} (Không đổi!)</div>
            <div className="text-emerald-300 font-bold">b = {outerB} (Không đổi!)</div>
            <div className="text-rose-400 text-[11px] pt-1">
              n = Không tồn tại (NameError)
            </div>
          </div>
        </div>

        {attemptPrintN && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs font-mono text-rose-300 animate-in fade-in space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
              <span>Lỗi NameError xuất hiện:</span>
            </div>
            <div>NameError: name 'n' is not defined</div>
            <p className="text-[11px] text-slate-400 font-sans">
              ➜ Đúng như SGK khẳng định: Biến <code>n</code> chỉ được khai báo trong hàm, kết thúc hàm là vùng nhớ giải phóng, bên ngoài không thể gọi <code>n</code>!
            </p>
          </div>
        )}
      </div>

      {/* Câu hỏi củng cố (Trang 137 SGK) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-400">
          <HelpCircle className="w-5 h-5" />
          <span>{isEn ? 'Review Questions (SGK Page 137)' : 'Câu Hỏi Củng Cố (Trang 137 SGK)'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Câu hỏi 1
              </span>
              <p className="text-xs text-white font-medium leading-relaxed font-mono">
                a, b = 1, 2<br />
                def f(a, b):<br />
                &nbsp;&nbsp;&nbsp;&nbsp;a = a + b; b = b * a<br />
                &nbsp;&nbsp;&nbsp;&nbsp;return a + b<br />
                Giá trị của a, b ngoài hàm bằng bao nhiêu sau khi gọi f(1, 2) và f(10, 20)?
              </p>
            </div>

            <div>
              <button
                onClick={() => setQ1Revealed(!q1Revealed)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all w-fit cursor-pointer"
              >
                <span>{q1Revealed ? (isEn ? 'Hide Answer' : 'Ẩn câu trả lời') : (isEn ? 'Reveal Answer' : 'Xem đáp án chuẩn SGK')}</span>
              </button>

              {q1Revealed && (
                <div className="mt-2.5 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 space-y-1.5 animate-in fade-in leading-relaxed">
                  <div className="font-bold text-emerald-400">Giá trị a, b ngoài hàm VẪN LÀ (1, 2) trong cả hai trường hợp!</div>
                  <p>
                    • Với câu a) <code>f(1, 2)</code>: các biến a, b trong hàm nhận giá trị 1, 2 và thay đổi cục bộ thành a=3, b=6. Nhưng a, b ngoài hàm vẫn là <strong>a = 1, b = 2</strong>.
                  </p>
                  <p>
                    • Với câu b) <code>f(10, 20)</code>: a, b trong hàm nhận 10, 20 và tính toán cục bộ. Sau lệnh gọi, a, b ngoài hàm vẫn giữ nguyên <strong>a = 1, b = 2</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Câu hỏi 2
              </span>
              <p className="text-xs text-white font-medium leading-relaxed">
                Ta có thể khai báo một biến bên trong hàm trùng tên với biến đã khai báo trước đó bên ngoài hàm không?
              </p>
            </div>

            <div>
              <button
                onClick={() => setQ2Revealed(!q2Revealed)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all w-fit cursor-pointer"
              >
                <span>{q2Revealed ? (isEn ? 'Hide Answer' : 'Ẩn câu trả lời') : (isEn ? 'Reveal Answer' : 'Xem đáp án chuẩn SGK')}</span>
              </button>

              {q2Revealed && (
                <div className="mt-2.5 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 space-y-1 animate-in fade-in leading-relaxed">
                  <div className="font-bold text-amber-300">Hoàn toàn được!</div>
                  <p>
                    Trong Python, biến khai báo bên trong hàm là <strong>biến cục bộ</strong>, còn biến khai báo ngoài hàm là <strong>biến toàn cục</strong>. Chúng nằm ở hai không gian tên (namespace) hoàn toàn tách biệt.
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Bên trong hàm, Python sẽ ưu tiên biến cục bộ (hiện tượng che khuất - variable shadowing). Biến ngoài hàm hoàn toàn không bị ảnh hưởng.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
