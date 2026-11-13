import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { Play, RotateCcw, Bug, CheckCircle2, ArrowRight, Table, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { PredictSimulateExplain } from '../PredictSimulateExplain';

interface TraceStep {
  step: number;
  lineNumber: number;
  lineCode: string;
  m: number;
  n: number;
  k: number;
  explanationVi: string;
  explanationEn: string;
  actionType: 'check' | 'assign' | 'print' | 'init';
}

const TRACE_STEPS: TraceStep[] = [
  {
    step: 0,
    lineNumber: 1,
    lineCode: 'm, n = 20, 16',
    m: 20,
    n: 16,
    k: 0,
    explanationVi: 'Khởi tạo m = 20, n = 16. Biến đếm vòng lặp k = 0.',
    explanationEn: 'Initialize m = 20, n = 16. Loop counter k = 0.',
    actionType: 'init',
  },
  {
    step: 1,
    lineNumber: 4,
    lineCode: 'while m != n:  # [BREAKPOINT TẠI ĐÂY]',
    m: 20,
    n: 16,
    k: 0,
    explanationVi: 'Kiểm tra điều kiện: 20 != 16 là Đúng (True). Bắt đầu vòng lặp 1.',
    explanationEn: 'Check condition: 20 != 16 is True. Starting iteration 1.',
    actionType: 'check',
  },
  {
    step: 2,
    lineNumber: 5,
    lineCode: '    k = k + 1',
    m: 20,
    n: 16,
    k: 1,
    explanationVi: 'Tăng biến đếm vòng lặp: k = 1.',
    explanationEn: 'Increment loop counter: k = 1.',
    actionType: 'assign',
  },
  {
    step: 3,
    lineNumber: 6,
    lineCode: '    if m < n:',
    m: 20,
    n: 16,
    k: 1,
    explanationVi: 'Kiểm tra điều kiện rẽ nhánh: 20 < 16 là Sai (False). Chuyển sang nhánh else.',
    explanationEn: 'Check branch condition: 20 < 16 is False. Jump to else branch.',
    actionType: 'check',
  },
  {
    step: 4,
    lineNumber: 9,
    lineCode: '        m = m - n',
    m: 4,
    n: 16,
    k: 1,
    explanationVi: 'Thực hiện phép trừ Euclid: m = 20 - 16 = 4. Giá trị mới: m = 4, n = 16.',
    explanationEn: 'Perform Euclidean subtraction: m = 20 - 16 = 4. New values: m = 4, n = 16.',
    actionType: 'assign',
  },
  {
    step: 5,
    lineNumber: 10,
    lineCode: '    print("Vòng lặp", k, ":", m, n)',
    m: 4,
    n: 16,
    k: 1,
    explanationVi: 'In thông số trung gian Vòng 1: m = 4, n = 16 ra màn hình console.',
    explanationEn: 'Print intermediate values for Iteration 1: m = 4, n = 16 to console.',
    actionType: 'print',
  },
  {
    step: 6,
    lineNumber: 4,
    lineCode: 'while m != n:  # [BREAKPOINT TẠI ĐÂY]',
    m: 4,
    n: 16,
    k: 1,
    explanationVi: 'Kiểm tra điều kiện: 4 != 16 là Đúng (True). Tiếp tục vòng lặp 2.',
    explanationEn: 'Check condition: 4 != 16 is True. Proceeding to iteration 2.',
    actionType: 'check',
  },
  {
    step: 7,
    lineNumber: 5,
    lineCode: '    k = k + 1',
    m: 4,
    n: 16,
    k: 2,
    explanationVi: 'Tăng biến đếm vòng lặp: k = 2.',
    explanationEn: 'Increment loop counter: k = 2.',
    actionType: 'assign',
  },
  {
    step: 8,
    lineNumber: 6,
    lineCode: '    if m < n:',
    m: 4,
    n: 16,
    k: 2,
    explanationVi: 'Kiểm tra: 4 < 16 là Đúng (True)! Vào khối lệnh if.',
    explanationEn: 'Check: 4 < 16 is True! Entering if block.',
    actionType: 'check',
  },
  {
    step: 9,
    lineNumber: 7,
    lineCode: '        n = n - m',
    m: 4,
    n: 12,
    k: 2,
    explanationVi: 'Cập nhật n = 16 - 4 = 12. Giá trị mới: m = 4, n = 12.',
    explanationEn: 'Update n = 16 - 4 = 12. New values: m = 4, n = 12.',
    actionType: 'assign',
  },
  {
    step: 10,
    lineNumber: 10,
    lineCode: '    print("Vòng lặp", k, ":", m, n)',
    m: 4,
    n: 12,
    k: 2,
    explanationVi: 'In thông số trung gian Vòng 2: m = 4, n = 12.',
    explanationEn: 'Print intermediate values for Iteration 2: m = 4, n = 12.',
    actionType: 'print',
  },
  {
    step: 11,
    lineNumber: 4,
    lineCode: 'while m != n:  # [BREAKPOINT TẠI ĐÂY]',
    m: 4,
    n: 12,
    k: 2,
    explanationVi: 'Kiểm tra: 4 != 12 là Đúng (True). Tiếp tục vòng lặp 3.',
    explanationEn: 'Check: 4 != 12 is True. Proceeding to iteration 3.',
    actionType: 'check',
  },
  {
    step: 12,
    lineNumber: 5,
    lineCode: '    k = k + 1',
    m: 4,
    n: 12,
    k: 3,
    explanationVi: 'Tăng biến đếm vòng lặp: k = 3.',
    explanationEn: 'Increment loop counter: k = 3.',
    actionType: 'assign',
  },
  {
    step: 13,
    lineNumber: 6,
    lineCode: '    if m < n:',
    m: 4,
    n: 12,
    k: 3,
    explanationVi: 'Kiểm tra: 4 < 12 là Đúng (True)! Vào khối if.',
    explanationEn: 'Check: 4 < 12 is True! Entering if block.',
    actionType: 'check',
  },
  {
    step: 14,
    lineNumber: 7,
    lineCode: '        n = n - m',
    m: 4,
    n: 8,
    k: 3,
    explanationVi: 'Cập nhật n = 12 - 4 = 8. Giá trị mới: m = 4, n = 8.',
    explanationEn: 'Update n = 12 - 4 = 8. New values: m = 4, n = 8.',
    actionType: 'assign',
  },
  {
    step: 15,
    lineNumber: 10,
    lineCode: '    print("Vòng lặp", k, ":", m, n)',
    m: 4,
    n: 8,
    k: 3,
    explanationVi: 'In thông số trung gian Vòng 3: m = 4, n = 8.',
    explanationEn: 'Print intermediate values for Iteration 3: m = 4, n = 8.',
    actionType: 'print',
  },
  {
    step: 16,
    lineNumber: 4,
    lineCode: 'while m != n:  # [BREAKPOINT TẠI ĐÂY]',
    m: 4,
    n: 8,
    k: 3,
    explanationVi: 'Kiểm tra: 4 != 8 là Đúng (True). Tiếp tục vòng lặp 4.',
    explanationEn: 'Check: 4 != 8 is True. Proceeding to iteration 4.',
    actionType: 'check',
  },
  {
    step: 17,
    lineNumber: 5,
    lineCode: '    k = k + 1',
    m: 4,
    n: 8,
    k: 4,
    explanationVi: 'Tăng biến đếm vòng lặp: k = 4.',
    explanationEn: 'Increment loop counter: k = 4.',
    actionType: 'assign',
  },
  {
    step: 18,
    lineNumber: 6,
    lineCode: '    if m < n:',
    m: 4,
    n: 8,
    k: 4,
    explanationVi: 'Kiểm tra: 4 < 8 là Đúng (True)! Vào khối if.',
    explanationEn: 'Check: 4 < 8 is True! Entering if block.',
    actionType: 'check',
  },
  {
    step: 19,
    lineNumber: 7,
    lineCode: '        n = n - m',
    m: 4,
    n: 4,
    k: 4,
    explanationVi: 'Cập nhật n = 8 - 4 = 4. Giá trị mới: m = 4, n = 4.',
    explanationEn: 'Update n = 8 - 4 = 4. New values: m = 4, n = 4.',
    actionType: 'assign',
  },
  {
    step: 20,
    lineNumber: 10,
    lineCode: '    print("Vòng lặp", k, ":", m, n)',
    m: 4,
    n: 4,
    k: 4,
    explanationVi: 'In thông số trung gian Vòng 4: m = 4, n = 4.',
    explanationEn: 'Print intermediate values for Iteration 4: m = 4, n = 4.',
    actionType: 'print',
  },
  {
    step: 21,
    lineNumber: 4,
    lineCode: 'while m != n:  # [BREAKPOINT TẠI ĐÂY]',
    m: 4,
    n: 4,
    k: 4,
    explanationVi: 'Kiểm tra điều kiện dừng: 4 != 4 là Sai (False)! Vòng lặp dừng lại.',
    explanationEn: 'Check termination condition: 4 != 4 is False! Loop terminates.',
    actionType: 'check',
  },
  {
    step: 22,
    lineNumber: 11,
    lineCode: 'print("ƯCLN là:", m)',
    m: 4,
    n: 4,
    k: 4,
    explanationVi: 'In kết quả cuối cùng: ƯCLN(20, 16) = 4. Thuật toán kết thúc thành công!',
    explanationEn: 'Print final output: GCD(20, 16) = 4. Algorithm completes successfully!',
    actionType: 'print',
  },
];

export const Section30DebugExamples: React.FC = () => {
  const { bilingualMode, teachSimCommand, setTeachSimSnapshot } = useBook();
  const isVi = bilingualMode !== 'en';

  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isAutoStepping, setIsAutoStepping] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'both' | 'method1' | 'method2'>('both');
  const [customM, setCustomM] = useState<number>(20);
  const [customN, setCustomN] = useState<number>(16);
  const [simResults, setSimResults] = useState<{ step: number; m: number; n: number; note: string }[] | null>(null);

  const currentStep = TRACE_STEPS[currentStepIdx];

  React.useEffect(() => {
    if (!isAutoStepping) return;
    const timer = window.setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= TRACE_STEPS.length - 1) {
          setIsAutoStepping(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1050);
    return () => window.clearInterval(timer);
  }, [isAutoStepping]);

  React.useEffect(() => {
    if (!teachSimCommand) return;
    const { type } = teachSimCommand;
    if (type === 'pause') {
      setIsAutoStepping(false);
    } else if (type === 'play') {
      setIsAutoStepping(true);
    } else if (type === 'step') {
      setIsAutoStepping(false);
      setCurrentStepIdx((prev) => Math.min(TRACE_STEPS.length - 1, prev + 1));
    } else if (type === 'step_back') {
      setIsAutoStepping(false);
      setCurrentStepIdx((prev) => Math.max(0, prev - 1));
    } else if (type === 'reset') {
      setIsAutoStepping(false);
      setCurrentStepIdx(0);
    } else if (type === 'jump:line9') {
      setIsAutoStepping(false);
      setCurrentStepIdx(3); // Just before Line 9 m = m - n executes (step 3 is line 6, step 4 is line 9!)
    }
  }, [teachSimCommand]);

  React.useEffect(() => {
    setTeachSimSnapshot({
      status: isAutoStepping ? 'running' : 'paused',
      labelEn: `Line ${currentStep.lineNumber} • m=${currentStep.m}, n=${currentStep.n}, k=${currentStep.k}`,
      labelVi: `Dòng ${currentStep.lineNumber} • m=${currentStep.m}, n=${currentStep.n}, k=${currentStep.k}`
    });
  }, [currentStep.k, currentStep.lineNumber, currentStep.m, currentStep.n, isAutoStepping, setTeachSimSnapshot]);

  const handleNextStep = () => {
    setIsAutoStepping(false);
    if (currentStepIdx < TRACE_STEPS.length - 1) {
      setCurrentStepIdx(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
  };

  const handleRunCustomGCD = () => {
    let m = Math.max(1, Math.floor(customM));
    let n = Math.max(1, Math.floor(customN));
    let k = 0;
    const history: { step: number; m: number; n: number; note: string }[] = [];

    history.push({
      step: 0,
      m,
      n,
      note: isVi ? `Khởi tạo: m = ${m}, n = ${n}` : `Init: m = ${m}, n = ${n}`,
    });

    while (m !== n && k < 50) {
      k++;
      if (m < n) {
        n = n - m;
      } else {
        m = m - n;
      }
      history.push({
        step: k,
        m,
        n,
        note: isVi
          ? `Vòng ${k}: m = ${m}, n = ${n} (Trừ Euclid)`
          : `Iter ${k}: m = ${m}, n = ${n} (Euclidean Subtraction)`,
      });
    }

    setSimResults(history);
  };

  return (
    <div className="space-y-10">
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-teal-900/60 via-slate-900/80 to-blue-900/60 border border-teal-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-full text-xs font-mono uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            {isVi ? 'Mục 2 SGK – Trang 146-148' : 'Section 2 Textbook – Pages 146-148'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isVi
              ? '2. Ví dụ minh hoạ: Tìm ƯCLN bằng phép trừ Euclid'
              : '2. Case Study: Euclidean Subtraction GCD Algorithm'}
          </h2>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Khám phá hai phương pháp gỡ lỗi thực tế trên chương trình tìm ước chung lớn nhất (ƯCLN): Cách 1 chèn lệnh in trung gian print() và Cách 2 thiết lập điểm dừng (break point) để theo dõi các biến trong bộ nhớ máy tính.'
              : 'Explore two practical debugging workflows on the greatest common divisor (GCD) program: Method 1 inserts intermediate print() calls, and Method 2 sets break points to monitor in-memory variables step-by-step.'}
          </p>
        </div>
      </div>

      {/* MATHEMATICAL FOUNDATION: EUCLID SUBTRACTION */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-7 shadow-xl">
        <h3 className="text-lg font-bold text-teal-400 flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
          {isVi ? 'Nguyên lý toán học của Thuật toán Euclid (SGK Trang 146)' : 'Mathematical Principle of Euclidean Algorithm (p. 146)'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
            <span className="text-xs font-mono text-teal-300 block mb-1">Trường hợp 1</span>
            <div className="text-lg font-mono font-bold text-white">gcd(m, m) = m</div>
            <p className="text-xs text-slate-400 mt-2">
              {isVi ? 'Nếu hai số bằng nhau, ƯCLN chính là số đó.' : 'If both numbers are equal, GCD is that number.'}
            </p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
            <span className="text-xs font-mono text-cyan-300 block mb-1">Trường hợp 2</span>
            <div className="text-lg font-mono font-bold text-white">gcd(m, n) = gcd(m, n - m)</div>
            <p className="text-xs text-slate-400 mt-2">
              {isVi ? 'Nếu n > m (hay m < n), thay n bằng hiệu n - m.' : 'If n > m (m < n), replace n with n - m.'}
            </p>
          </div>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/80">
            <span className="text-xs font-mono text-blue-300 block mb-1">Trường hợp 3</span>
            <div className="text-lg font-mono font-bold text-white">gcd(m, n) = gcd(m - n, n)</div>
            <p className="text-xs text-slate-400 mt-2">
              {isVi ? 'Nếu m > n, thay m bằng hiệu m - n.' : 'If m > n, replace m with m - n.'}
            </p>
          </div>
        </div>
      </div>

      {/* COMPARISON TABS */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('both')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'both'
              ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-white bg-slate-800/50'
          }`}
        >
          {isVi ? 'Toàn cảnh hai phương pháp' : 'Overview of Both Methods'}
        </button>
        <button
          onClick={() => setActiveTab('method1')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'method1'
              ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-white bg-slate-800/50'
          }`}
        >
          {isVi ? 'Cách 1: In biến trung gian' : 'Method 1: Intermediate Prints'}
        </button>
        <button
          onClick={() => setActiveTab('method2')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            activeTab === 'method2'
              ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-white bg-slate-800/50'
          }`}
        >
          {isVi ? 'Cách 2: Đặt Breakpoint' : 'Method 2: Set Breakpoint'}
        </button>
      </div>

      {/* CONTENT FOR TABS */}
      {(activeTab === 'both' || activeTab === 'method1') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-xl">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {isVi ? 'Cách 1: In giá trị các biến trung gian (SGK Trang 147)' : 'Method 1: Print Intermediate Variable Values (p. 147)'}
              </h3>
              <p className="text-xs text-slate-400">
                {isVi
                  ? 'Bổ sung biến k đếm vòng lặp và lệnh print("Vòng lặp", k, ":", m, n) ở cuối thân vòng lặp'
                  : 'Add iteration counter k and print("Iteration", k, ":", m, n) at the end of loop body'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm leading-relaxed overflow-x-auto">
              <div className="text-xs text-slate-500 pb-2 border-b border-slate-800 flex justify-between">
                <span>python_debug_print.py</span>
                <span className="text-blue-400">Cách 1 (In trung gian)</span>
              </div>
              <pre className="mt-3 text-slate-300">
{`m = 20
n = 16
k = 0  # Biến đếm vòng lặp
while m != n:
    k = k + 1
    if m < n:
        n = n - m
    else:
        m = m - n
    # [Lệnh debug]: In thông số trung gian
    print("Vòng lặp", k, ":", m, n)

print("ƯCLN là:", m)`}
              </pre>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-sm">
              <div className="text-xs text-slate-500 pb-2 border-b border-slate-800 flex justify-between">
                <span>Console Output</span>
                <span className="text-emerald-400">Output theo dõi</span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs">
                <div className="text-slate-400">&gt;&gt;&gt; [Bắt đầu chạy chương trình với m = 20, n = 16]</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-teal-300">
                  Vòng lặp 1 : 4 16 <span className="text-slate-500">(m=20-16=4, n giữ nguyên 16)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-teal-300">
                  Vòng lặp 2 : 4 12 <span className="text-slate-500">(n=16-4=12, m giữ nguyên 4)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-teal-300">
                  Vòng lặp 3 : 4 8 <span className="text-slate-500">(n=12-4=8, m giữ nguyên 4)</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-teal-300">
                  Vòng lặp 4 : 4 4 <span className="text-slate-500">(n=8-4=4, lúc này m == n)</span>
                </div>
                <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold">
                  ƯCLN là: 4
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {(activeTab === 'both' || activeTab === 'method2') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-xl">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {isVi ? 'Cách 2: Sử dụng công cụ điểm dừng Breakpoint (SGK Trang 147-148)' : 'Method 2: Using Breakpoint Debugging Tools (p. 147-148)'}
              </h3>
              <p className="text-xs text-slate-400">
                {isVi
                  ? 'Đặt Breakpoint tại dòng 4 ("while m != n:"), chạy chế độ Debug và quan sát bảng biến qua từng vòng lặp'
                  : 'Place Breakpoint at Line 4 ("while m != n:"), run in Debug mode and inspect variable watch table'}
              </p>
            </div>
          </div>

          {/* TABLE FROM SGK TRANG 148 */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 mb-6">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-900/80 text-slate-300 uppercase font-mono tracking-wider text-xs border-b border-slate-800">
                <tr>
                  <th className="p-3.5">{isVi ? 'Số lần dừng tại Breakpoint' : 'Stop Count at Breakpoint'}</th>
                  <th className="p-3.5">{isVi ? 'Giá trị m' : 'Value of m'}</th>
                  <th className="p-3.5">{isVi ? 'Giá trị n' : 'Value of n'}</th>
                  <th className="p-3.5">{isVi ? 'Nhận xét diễn biến' : 'Execution Notes'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-rose-400">{isVi ? 'Dừng lần 1 (Ban đầu)' : 'Stop 1 (Initial)'}</td>
                  <td className="p-3.5 text-teal-300 font-bold">20</td>
                  <td className="p-3.5 text-amber-300 font-bold">16</td>
                  <td className="p-3.5 font-sans text-slate-400 text-xs">
                    {isVi ? 'Trước vòng lặp 1. m > n nên vòng sau m sẽ bị trừ.' : 'Before loop 1. m > n, so m will be decremented next.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-rose-400">{isVi ? 'Dừng lần 2' : 'Stop 2'}</td>
                  <td className="p-3.5 text-teal-300 font-bold">4</td>
                  <td className="p-3.5 text-amber-300 font-bold">16</td>
                  <td className="p-3.5 font-sans text-slate-400 text-xs">
                    {isVi ? 'Sau vòng 1: m = 20 - 16 = 4. m < n nên vòng tới n bị trừ.' : 'After loop 1: m = 4. m < n, so n will be decremented next.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-rose-400">{isVi ? 'Dừng lần 3' : 'Stop 3'}</td>
                  <td className="p-3.5 text-teal-300 font-bold">4</td>
                  <td className="p-3.5 text-amber-300 font-bold">12</td>
                  <td className="p-3.5 font-sans text-slate-400 text-xs">
                    {isVi ? 'Sau vòng 2: n = 16 - 4 = 12. m < n tiếp tục.' : 'After loop 2: n = 12. m < n continues.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3.5 font-bold text-rose-400">{isVi ? 'Dừng lần 4' : 'Stop 4'}</td>
                  <td className="p-3.5 text-teal-300 font-bold">4</td>
                  <td className="p-3.5 text-amber-300 font-bold">8</td>
                  <td className="p-3.5 font-sans text-slate-400 text-xs">
                    {isVi ? 'Sau vòng 3: n = 12 - 4 = 8. m < n tiếp tục.' : 'After loop 3: n = 8. m < n continues.'}
                  </td>
                </tr>
                <tr className="bg-emerald-950/20 hover:bg-emerald-950/40">
                  <td className="p-3.5 font-bold text-emerald-400">{isVi ? 'Dừng lần 5 (Thoát lặp)' : 'Stop 5 (Exit loop)'}</td>
                  <td className="p-3.5 text-emerald-300 font-bold">4</td>
                  <td className="p-3.5 text-emerald-300 font-bold">4</td>
                  <td className="p-3.5 font-sans text-emerald-300 text-xs font-semibold">
                    {isVi ? 'm == n == 4, điều kiện m != n sai, thoát vòng lặp! Kết quả ƯCLN = 4.' : 'm == n == 4, m != n is False, loop exits! GCD result = 4.'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INTERACTIVE STEP-BY-STEP DEBUGGER SIMULATOR */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-teal-500/40 rounded-2xl p-6 md:p-8 shadow-2xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
              <Play className="w-3 h-3" />
              {isVi ? 'Trình mô phỏng Debugger tương tác' : 'Interactive Debugger Simulator'}
            </div>
            <h3 className="text-xl font-bold text-white">
              {isVi ? 'Thực thi từng bước (Step Over) & Quan sát ô nhớ (Watch)' : 'Step Over Execution & Live Variable Watch Table'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isVi
                ? 'Nhấn "Bước tiếp theo" để di chuyển con trỏ lệnh màu vàng qua từng dòng và kiểm tra biến m, n, k cập nhật theo thời gian thực.'
                : 'Click "Step Next" to step the yellow execution pointer through each line and watch m, n, k update in real time.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAutoStepping((p) => !p)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isAutoStepping
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isAutoStepping ? (isVi ? 'Dừng' : 'Pause') : (isVi ? 'Chạy' : 'Run')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAutoStepping(false);
                handlePrevStep();
              }}
              disabled={currentStepIdx === 0}
              className="px-3.5 py-2 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none rounded-xl text-xs font-medium transition-all cursor-pointer"
            >
              {isVi ? 'Quay lại' : 'Step Back'}
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              disabled={currentStepIdx === TRACE_STEPS.length - 1}
              className="px-5 py-2 bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 disabled:opacity-40 disabled:pointer-events-none rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-teal-500/30 transition-all cursor-pointer"
            >
              <span>{isVi ? 'Bước tiếp (Step Over)' : 'Step Over'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAutoStepping(false);
                handleReset();
              }}
              className="p-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
              title={isVi ? 'Chạy lại từ đầu' : 'Reset'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PREDICT - SIMULATE - EXPLAIN CARD */}
        <div className="mt-5">
          <PredictSimulateExplain
            theme="dark"
            titleVi="Dự đoán trước khi gỡ lỗi từng bước (m = 20, n = 16)"
            titleEn="Predict Before Stepping Debugger (m = 20, n = 16)"
            promptVi="Ở vòng lặp đầu tiên (sau khi thực hiện phép trừ Euclid ở dòng 9: m = m - n), giá trị của m và n tại điểm dừng tiếp theo là bao nhiêu?"
            promptEn="After the first iteration (executing line 9: m = m - n), what are (m, n) at the next Breakpoint stop?"
            options={[
              { id: 'a', labelVi: 'A. m = 4, n = 16 (n giữ nguyên)', labelEn: 'A. m = 4, n = 16 (n unchanged)' },
              { id: 'b', labelVi: 'B. m = 16, n = 4 (hoán đổi m và n)', labelEn: 'B. m = 16, n = 4 (swapped)' },
              { id: 'c', labelVi: 'C. m = 20, n = 4 (trừ vào n)', labelEn: 'C. m = 20, n = 4 (subtracted n)' },
              { id: 'd', labelVi: 'D. m = 4, n = 4 (dừng ngay vòng 1)', labelEn: 'D. m = 4, n = 4 (halts loop 1)' }
            ]}
            correctOptionId="a"
            hasSimulationCompleted={currentStepIdx >= 4}
            actualOutcomeVi={`Bước ${currentStep.step + 1}: m = ${currentStep.m}, n = ${currentStep.n}, k = ${currentStep.k}`}
            actualOutcomeEn={`Step ${currentStep.step + 1}: m = ${currentStep.m}, n = ${currentStep.n}, k = ${currentStep.k}`}
            explanationVi="Vì ban đầu m = 20 >= n = 16 nên điều kiện if m < n: sai; chương trình nhảy xuống nhánh else thực hiện m = 20 - 16 = 4, còn n vẫn là 16."
            explanationEn="Since m = 20 >= n = 16 initially, if m < n: is False; the else branch updates m = 20 - 16 = 4 while n stays 16."
            onRunDirectly={() => setCurrentStepIdx(4)}
          />
        </div>

        {/* CODE LISTING + WATCH WINDOW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* CODE EDITOR WITH BREAKPOINT AND LINE POINTER */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs md:text-sm overflow-hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span>euclid_debug.py</span>
              </span>
              <span className="text-teal-400">
                {isVi ? `Bước ${currentStep.step + 1} / ${TRACE_STEPS.length}` : `Step ${currentStep.step + 1} / ${TRACE_STEPS.length}`}
              </span>
            </div>

            <div className="space-y-1">
              {[
                { line: 1, code: 'm = 20' },
                { line: 2, code: 'n = 16' },
                { line: 3, code: 'k = 0' },
                { line: 4, code: 'while m != n:       ● BREAKPOINT' },
                { line: 5, code: '    k = k + 1' },
                { line: 6, code: '    if m < n:' },
                { line: 7, code: '        n = n - m' },
                { line: 8, code: '    else:' },
                { line: 9, code: '        m = m - n' },
                { line: 10, code: '    print("Vòng lặp", k, ":", m, n)' },
                { line: 11, code: 'print("ƯCLN là:", m)' },
              ].map(({ line, code }) => {
                const isCurrent = currentStep.lineNumber === line;
                const isBreakpoint = line === 4;

                return (
                  <div
                    key={line}
                    className={`flex items-center px-2 py-1 rounded transition-colors ${
                      isCurrent
                        ? 'bg-amber-500/20 border-l-4 border-amber-400 text-white font-bold'
                        : isBreakpoint
                        ? 'bg-rose-950/20 text-rose-200'
                        : 'text-slate-400 hover:bg-slate-900/60'
                    }`}
                  >
                    <span className="w-7 text-right pr-3 select-none text-slate-600 font-mono text-xs">
                      {line}
                    </span>
                    <span className="w-5 flex items-center justify-center">
                      {isBreakpoint && (
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
                      )}
                      {isCurrent && !isBreakpoint && (
                        <span className="text-amber-400 text-xs">▶</span>
                      )}
                    </span>
                    <span className={`pl-2 flex-1 ${isCurrent ? 'text-amber-300' : ''}`}>
                      {code}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WATCH WINDOW & STEP EXPLANATION */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* LIVE WATCH VARIABLES */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 mb-3 border-b border-slate-800">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-teal-400" />
                  {isVi ? 'BẢNG THEO DÕI BIẾN (WATCH)' : 'WATCH VARIABLES'}
                </span>
                <span className="text-teal-400 font-mono text-[11px]">Scope: Local</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-900 border border-teal-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs font-mono text-slate-400 block">Biến m</span>
                  <span className="text-2xl font-bold font-mono text-teal-300 transition-all">
                    {currentStep.m}
                  </span>
                </div>
                <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs font-mono text-slate-400 block">Biến n</span>
                  <span className="text-2xl font-bold font-mono text-amber-300 transition-all">
                    {currentStep.n}
                  </span>
                </div>
                <div className="bg-slate-900 border border-blue-500/30 rounded-lg p-3 text-center">
                  <span className="text-xs font-mono text-slate-400 block">Biến k (vòng)</span>
                  <span className="text-2xl font-bold font-mono text-blue-300 transition-all">
                    {currentStep.k}
                  </span>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex justify-between">
                  <span>Điều kiện (m != n):</span>
                  <span
                    className={`font-bold ${
                      currentStep.m !== currentStep.n ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {currentStep.m !== currentStep.n ? 'True (Tiếp tục)' : 'False (Dừng lặp)'}
                  </span>
                </div>
              </div>
            </div>

            {/* STEP EXPLANATION CARD */}
            <div className="bg-slate-900/90 border border-teal-500/30 rounded-xl p-4 flex-1">
              <span className="text-[11px] font-mono uppercase text-teal-400 font-semibold block mb-1">
                {isVi ? 'Giải thích hành động tại bước này:' : 'Step Action Analysis:'}
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {isVi ? currentStep.explanationVi : currentStep.explanationEn}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOM NUMBERS EXPERIMENTATION BENCH */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
          <Terminal className="w-4 h-4 text-teal-400" />
          {isVi
            ? 'Thử nghiệm tìm ƯCLN của 2 số tự chọn với thuật toán SGK'
            : 'Experiment Euclid Subtraction with Custom Numbers'}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {isVi
            ? 'Nhập 2 số tự nhiên m, n bất kỳ để sinh vết thực thi tự động qua phép trừ Euclid và quan sát số vòng lặp cần thiết.'
            : 'Input any two positive integers m, n to generate the automated trace table and observe the number of subtraction iterations.'}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-slate-300">m =</label>
            <input
              type="number"
              min={1}
              max={999}
              value={customM}
              onChange={e => setCustomM(Number(e.target.value))}
              className="w-20 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-mono text-slate-300">n =</label>
            <input
              type="number"
              min={1}
              max={999}
              value={customN}
              onChange={e => setCustomN(Number(e.target.value))}
              className="w-20 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>
          <button
            onClick={handleRunCustomGCD}
            className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md shadow-teal-500/20"
          >
            {isVi ? 'Chạy thuật toán' : 'Run Algorithm'}
          </button>
        </div>

        {simResults && (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="text-xs font-mono text-teal-400 mb-2 font-bold">
              {isVi
                ? `Kết quả: ƯCLN(${customM}, ${customN}) = ${simResults[simResults.length - 1].m} (Sau ${simResults.length - 1} vòng lặp)`
                : `Result: GCD(${customM}, ${customN}) = ${simResults[simResults.length - 1].m} (After ${simResults.length - 1} iterations)`}
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2 font-mono text-xs">
              {simResults.map(res => (
                <div
                  key={res.step}
                  className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 text-slate-300"
                >
                  <span className="text-slate-400 font-bold">{res.note}</span>
                  <span className="text-teal-300">
                    m={res.m}, n={res.n}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
