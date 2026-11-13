import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { 
  Terminal, 
  Bug, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Code2, 
  Table, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

interface BreakpointState {
  stopIndex: number;
  k: number;
  m: number;
  n: number;
  NT: number[];
  actionNoteVi: string;
  actionNoteEn: string;
}

export const Section31PrimeTask: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // State for interactive factorization sandbox
  const [inputN, setInputN] = useState<number>(100);
  const [simSteps, setSimSteps] = useState<BreakpointState[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [hasRun, setHasRun] = useState<boolean>(false);

  // Compute breakpoint simulation for any natural number
  const handleStartSimulation = (nVal: number) => {
    const n = Math.max(1, Math.floor(nVal));
    let m = n;
    let k = 2;
    const NT: number[] = [];
    const steps: BreakpointState[] = [];

    if (n === 1) {
      steps.push({
        stopIndex: 0,
        k: 2,
        m: 1,
        n: 1,
        NT: [],
        actionNoteVi: 'n = 1: Vòng lặp while m > 1 không thực hiện. NT rỗng []. 1 không là số nguyên tố và không là hợp số.',
        actionNoteEn: 'n = 1: Loop while m > 1 is skipped. NT is empty []. 1 is neither prime nor composite.',
      });
    } else {
      let stopCount = 0;
      while (m > 1) {
        while (m % k !== 0) {
          k++;
        }
        NT.push(k);
        stopCount++;
        steps.push({
          stopIndex: stopCount,
          k,
          m,
          n,
          NT: [...NT],
          actionNoteVi: `Dừng lần ${stopCount} tại dòng 20: Tìm thấy ước số nguyên tố k = ${k}, đã thêm vào NT = [${NT.join(', ')}]. Chuẩn bị chia m = ${m} // ${k}.`,
          actionNoteEn: `Stop #${stopCount} at line 20: Found prime factor k = ${k}, appended to NT = [${NT.join(', ')}]. Preparing m = ${m} // ${k}.`,
        });
        m = Math.floor(m / k);
      }
    }

    setSimSteps(steps);
    setCurrentStepIdx(0);
    setHasRun(true);
  };

  const currentStep = simSteps[currentStepIdx] || null;

  return (
    <div className="space-y-10">
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-teal-900/60 via-slate-900/80 to-blue-900/60 border border-teal-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-full text-xs font-mono uppercase tracking-wider mb-3">
            <Code2 className="w-3.5 h-3.5" />
            {isVi ? 'Nhiệm vụ 1 – SGK Trang 149-150' : 'Task 1 – Textbook Pages 149-150'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isVi
              ? 'Phân tích số tự nhiên thành tích các thừa số nguyên tố'
              : 'Prime Factorization & Breakpoint Debugging'}
          </h2>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Viết chương trình phantichnt.py kiểm tra số nguyên tố và phân tích hợp số ra thừa số nguyên tố. Đặt điểm dừng (breakpoint) tại dòng 20 để theo dõi các biến n, m, k, NT biến đổi trong bộ nhớ.'
              : 'Implement phantichnt.py to classify prime numbers and decompose composites into prime factors. Place a breakpoint at Line 20 to inspect runtime memory variables n, m, k, and list NT.'}
          </p>
        </div>
      </div>

      {/* CORE LOGIC & SPECIAL CASES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
            <Info className="w-4 h-4" />
            <span>{isVi ? 'Trường hợp đặc biệt n = 1' : 'Special Case n = 1'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isVi
              ? 'Số 1 không là số nguyên tố và cũng không là hợp số. Khi n = 1, danh sách NT rỗng (len(NT) == 0) và chương trình in ra: "1 không là số nguyên tố".'
              : 'Number 1 is neither prime nor composite. When n = 1, list NT is empty (len(NT) == 0), outputting "1 is not a prime number".'}
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isVi ? 'Trường hợp n là số nguyên tố' : 'Case: n is Prime'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isVi
              ? 'Khi n > 1 và n là số nguyên tố, danh sách NT chỉ chứa duy nhất một phần tử chính là n (len(NT) == 1). Chương trình in ra: "n là số nguyên tố".'
              : 'When n > 1 and n is prime, list NT contains exactly one element which is n itself (len(NT) == 1), outputting "n is a prime number".'}
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{isVi ? 'Trường hợp n là hợp số' : 'Case: n is Composite'}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isVi
              ? 'Khi n > 1 và có nhiều hơn 1 thừa số (len(NT) > 1), n là hợp số. Chương trình in thông báo "là hợp số" và khai triển dạng n = p1 × p2 × ... × pk.'
              : 'When len(NT) > 1, n is composite. The script outputs "is a composite number" and prints the prime product decomposition.'}
          </p>
        </div>
      </div>

      {/* CODE LISTING PHANTICHNT.PY */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs font-mono">
          <span className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <span>phantichnt.py (SGK Trang 149)</span>
          </span>
          <span className="text-rose-400 flex items-center gap-1.5 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            {isVi ? 'Breakpoint tại Dòng 20' : 'Breakpoint at Line 20'}
          </span>
        </div>

        <div className="font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-slate-300">
          {[
            { line: 1, text: '# Nhập số tự nhiên từ bàn phím và kiểm tra n có phải là số nguyên tố hay không.' },
            { line: 2, text: '# Nếu n = 1 thì thông báo n không phải là số nguyên tố.' },
            { line: 3, text: '# Nếu n là hợp số thì in ra phân tích n thành tích các thừa số nguyên tố.' },
            { line: 4, text: 'n = int(input("Nhập số tự nhiên n: "))' },
            { line: 5, text: 'm = n' },
            { line: 6, text: 'k = 2' },
            { line: 7, text: 'NT = []' },
            { line: 8, text: 'while m > 1:' },
            { line: 9, text: '    while m % k != 0:' },
            { line: 10, text: '        k = k + 1' },
            { line: 11, text: '    NT.append(k)' },
            { line: 12, text: '    m = m // k  # ● [BREAKPOINT TẠI ĐÂY - DÒNG 20 TRONG IDE]' },
            { line: 13, text: 'count = len(NT)' },
            { line: 14, text: 'if count == 0:' },
            { line: 15, text: '    print(n, "không là số nguyên tố")' },
            { line: 16, text: 'elif count == 1:' },
            { line: 17, text: '    print(n, "là số nguyên tố")' },
            { line: 18, text: 'else:' },
            { line: 19, text: '    print(n, "là hợp số")' },
            { line: 20, text: '    print(n, "=", end=" ")' },
            { line: 21, text: '    for i in range(count):' },
            { line: 22, text: '        if i < count - 1:' },
            { line: 23, text: '            print(NT[i], "x", end=" ")' },
            { line: 24, text: '        else:' },
            { line: 25, text: '            print(NT[i])' },
          ].map(({ line, text }) => {
            const isBp = line === 12;
            return (
              <div
                key={line}
                className={`flex items-center px-2 py-0.5 rounded ${
                  isBp ? 'bg-rose-950/40 text-rose-200 border-l-4 border-rose-500 font-bold' : ''
                }`}
              >
                <span className="w-8 select-none text-slate-600 text-right pr-3">{line}</span>
                <span className="w-4 flex items-center justify-center">
                  {isBp && <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/80" />}
                </span>
                <span className="pl-2">{text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TEXTBOOK TRACE TABLE SGK TRANG 150 */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Table className="w-5 h-5 text-teal-400" />
          <h3 className="text-lg font-bold text-white">
            {isVi ? 'Bảng theo dõi biến tại điểm dừng với n = 100 (SGK Trang 150)' : 'Variable Watch Table at Breakpoint for n = 100 (Page 150)'}
          </h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs md:text-sm font-mono">
            <thead className="bg-slate-900/90 text-slate-300 uppercase text-xs border-b border-slate-800">
              <tr>
                <th className="p-3.5">k</th>
                <th className="p-3.5">m</th>
                <th className="p-3.5">n</th>
                <th className="p-3.5">NT</th>
                <th className="p-3.5 font-sans font-semibold">{isVi ? 'Trạng thái / Thông báo' : 'Status / Message'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 text-teal-300 font-bold">2</td>
                <td className="p-3.5 text-amber-300 font-bold">100</td>
                <td className="p-3.5">100</td>
                <td className="p-3.5 text-blue-300">[2]</td>
                <td className="p-3.5 font-sans text-slate-400 text-xs">
                  {isVi ? 'Dừng lần 1: Tìm ra ước nguyên tố đầu tiên là 2.' : 'Stop 1: Found first prime factor 2.'}
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 text-teal-300 font-bold">2</td>
                <td className="p-3.5 text-amber-300 font-bold">50</td>
                <td className="p-3.5">100</td>
                <td className="p-3.5 text-blue-300">[2, 2]</td>
                <td className="p-3.5 font-sans text-slate-400 text-xs">
                  {isVi ? 'Dừng lần 2: m = 100 // 2 = 50; tiếp tục chia hết cho 2.' : 'Stop 2: m = 100 // 2 = 50; still divisible by 2.'}
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 text-teal-300 font-bold">5</td>
                <td className="p-3.5 text-amber-300 font-bold">25</td>
                <td className="p-3.5">100</td>
                <td className="p-3.5 text-blue-300">[2, 2, 5]</td>
                <td className="p-3.5 font-sans text-slate-400 text-xs">
                  {isVi ? 'Dừng lần 3: m = 50 // 2 = 25; k tăng lên 3, 4, 5 (25 % 5 == 0).' : 'Stop 3: m = 25; k advances to 5 (25 % 5 == 0).'}
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="p-3.5 text-teal-300 font-bold">5</td>
                <td className="p-3.5 text-amber-300 font-bold">5</td>
                <td className="p-3.5">100</td>
                <td className="p-3.5 text-blue-300">[2, 2, 5, 5]</td>
                <td className="p-3.5 font-sans text-slate-400 text-xs">
                  {isVi ? 'Dừng lần 4: m = 25 // 5 = 5; chia hết cho 5.' : 'Stop 4: m = 5; divisible by 5.'}
                </td>
              </tr>
              <tr className="bg-emerald-950/30 hover:bg-emerald-950/50">
                <td colSpan={4} className="p-3.5 font-sans font-bold text-emerald-300 text-xs">
                  {isVi ? 'Kết thúc vòng lặp (m = 5 // 5 = 1 <= 1)' : 'Loop terminates (m = 1 <= 1)'}
                </td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">
                  100 = 2 × 2 × 5 × 5
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* INTERACTIVE BREAKPOINT SIMULATOR FOR ANY NATURAL NUMBER */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-teal-500/40 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
              <Play className="w-3 h-3" />
              {isVi ? 'Trình gỡ lỗi Breakpoint tương tác' : 'Interactive Breakpoint Debugger'}
            </div>
            <h3 className="text-xl font-bold text-white">
              {isVi ? 'Thực thi từng bước tại Breakpoint cho số tự nhiên n' : 'Step-by-Step Breakpoint Inspection for any n'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isVi
                ? 'Nhập bất kỳ số tự nhiên n nào để sinh các lần dừng tại dòng 20 và theo dõi bộ nhớ biến.'
                : 'Enter any natural number n to simulate breakpoint stops at line 20 and monitor variables.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-slate-300">n =</label>
              <input
                type="number"
                min={1}
                max={9999}
                value={inputN}
                onChange={(e) => setInputN(Number(e.target.value))}
                className="w-24 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => handleStartSimulation(inputN)}
              className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md shadow-teal-500/20"
            >
              {isVi ? 'Nạp & Bắt đầu' : 'Load & Debug'}
            </button>
          </div>
        </div>

        {hasRun && simSteps.length > 0 && (
          <div className="mt-6 space-y-6">
            {/* STEP CONTROLS */}
            <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-mono text-teal-400">
                {isVi
                  ? `Điểm dừng: ${currentStepIdx + 1} / ${simSteps.length}`
                  : `Breakpoint Stop: ${currentStepIdx + 1} / ${simSteps.length}`}
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentStepIdx === 0}
                  onClick={() => setCurrentStepIdx((prev) => prev - 1)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs font-semibold text-slate-300 transition-all"
                >
                  {isVi ? 'Dừng trước' : 'Previous Stop'}
                </button>
                <button
                  disabled={currentStepIdx === simSteps.length - 1}
                  onClick={() => setCurrentStepIdx((prev) => prev + 1)}
                  className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/20"
                >
                  <span>{isVi ? 'Tiếp tục (Resume)' : 'Resume Execution'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* LIVE WATCH TILES */}
            {currentStep && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-teal-500/30 rounded-xl p-4 text-center">
                  <span className="text-xs font-mono text-slate-400 block mb-1">k (Ước nguyên tố)</span>
                  <span className="text-3xl font-mono font-bold text-teal-300">{currentStep.k}</span>
                </div>
                <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 text-center">
                  <span className="text-xs font-mono text-slate-400 block mb-1">m (Giá trị trước chia)</span>
                  <span className="text-3xl font-mono font-bold text-amber-300">{currentStep.m}</span>
                </div>
                <div className="bg-slate-950 border border-blue-500/30 rounded-xl p-4 text-center">
                  <span className="text-xs font-mono text-slate-400 block mb-1">n (Số ban đầu)</span>
                  <span className="text-3xl font-mono font-bold text-blue-300">{currentStep.n}</span>
                </div>
                <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-4 text-center">
                  <span className="text-xs font-mono text-slate-400 block mb-1">len(NT)</span>
                  <span className="text-3xl font-mono font-bold text-purple-300">{currentStep.NT.length}</span>
                </div>
              </div>
            )}

            {/* CURRENT LIST NT AND NOTE */}
            {currentStep && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Danh sách thừa số NT hiện tại:</span>
                  <span className="text-teal-300 font-bold text-sm">
                    NT = [{currentStep.NT.join(', ')}]
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200">
                  <span className="text-teal-400 font-bold block mb-1 font-mono">
                    {isVi ? 'Trạng thái tại điểm dừng:' : 'Breakpoint State:'}
                  </span>
                  {isVi ? currentStep.actionNoteVi : currentStep.actionNoteEn}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
