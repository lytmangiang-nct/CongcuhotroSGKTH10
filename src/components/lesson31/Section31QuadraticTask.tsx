import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { 
  Compass, 
  Code2, 
  Play, 
  RotateCcw, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Calculator,
  Workflow
} from 'lucide-react';

interface PresetCase {
  labelVi: string;
  labelEn: string;
  a: number;
  b: number;
  c: number;
  caseType: string;
}

export const Section31QuadraticTask: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-3);
  const [coeffC, setCoeffC] = useState<number>(2);

  // Preset test cases covering every single branch
  const PRESET_CASES: PresetCase[] = [
    {
      labelVi: '1. Hai nghiệm phân biệt (Δ > 0)',
      labelEn: '1. Two distinct roots (Δ > 0)',
      a: 1,
      b: -3,
      c: 2,
      caseType: 'two_roots',
    },
    {
      labelVi: '2. Nghiệm kép (Δ = 0)',
      labelEn: '2. Double root (Δ = 0)',
      a: 1,
      b: -4,
      c: 4,
      caseType: 'double_root',
    },
    {
      labelVi: '3. Vô nghiệm (Δ < 0)',
      labelEn: '3. No real roots (Δ < 0)',
      a: 1,
      b: 1,
      c: 5,
      caseType: 'no_roots',
    },
    {
      labelVi: '4. Suy biến bậc nhất (a = 0, b ≠ 0)',
      labelEn: '4. Degenerate linear (a = 0, b ≠ 0)',
      a: 0,
      b: 2,
      c: -4,
      caseType: 'linear',
    },
    {
      labelVi: '5. Vô số nghiệm (a = b = c = 0)',
      labelEn: '5. Infinitely many solutions',
      a: 0,
      b: 0,
      c: 0,
      caseType: 'infinite',
    },
    {
      labelVi: '6. Vô nghiệm suy biến (a = b = 0, c ≠ 0)',
      labelEn: '6. Contradiction (a = b = 0, c ≠ 0)',
      a: 0,
      b: 0,
      c: 7,
      caseType: 'contradiction',
    },
  ];

  // Mathematical evaluation logic matching textbook's giaipt.py
  const solveEquation = () => {
    const a = coeffA;
    const b = coeffB;
    const c = coeffC;

    if (a === 0) {
      // Degraded to GiaiPT1(b, c)
      if (b !== 0) {
        const root = -c / b;
        return {
          type: 'linear',
          titleVi: 'Phương trình bậc nhất bx + c = 0 (do a = 0)',
          titleEn: 'Linear equation bx + c = 0 (since a = 0)',
          descVi: `Do a = 0 và b = ${b} ≠ 0, phương trình có nghiệm duy nhất x = -c/b = ${root.toFixed(1)}`,
          descEn: `Since a = 0 and b = ${b} ≠ 0, unique root x = -c/b = ${root.toFixed(1)}`,
          roots: [root],
        };
      } else if (c === 0) {
        return {
          type: 'infinite',
          titleVi: 'Phương trình có vô số nghiệm',
          titleEn: 'Infinitely many solutions',
          descVi: 'a = b = c = 0: Biểu thức 0x² + 0x + 0 = 0 luôn đúng với mọi x thuộc R.',
          descEn: 'a = b = c = 0: Statement 0 = 0 is satisfied for any real x.',
          roots: [],
        };
      } else {
        return {
          type: 'contradiction',
          titleVi: 'Phương trình vô nghiệm',
          titleEn: 'No solution (Contradiction)',
          descVi: `a = b = 0, c = ${c} ≠ 0: Mệnh đề 0 = ${c} là mâu thuẫn vô lý.`,
          descEn: `a = b = 0, c = ${c} ≠ 0: Statement 0 = ${c} is contradictory.`,
          roots: [],
        };
      }
    } else {
      // True quadratic equation
      const delta = b * b - 4 * a * c;
      if (delta > 0) {
        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);
        return {
          type: 'two_roots',
          titleVi: 'Phương trình có hai nghiệm phân biệt',
          titleEn: 'Equation has two distinct roots',
          descVi: `Δ = ${b}² - 4×${a}×${c} = ${delta} > 0. Căn bậc hai √Δ ≈ ${Math.sqrt(delta).toFixed(2)}.`,
          descEn: `Δ = ${b}² - 4×${a}×${c} = ${delta} > 0. Square root √Δ ≈ ${Math.sqrt(delta).toFixed(2)}.`,
          roots: [x1, x2],
        };
      } else if (delta === 0) {
        const x = -b / (2 * a);
        return {
          type: 'double_root',
          titleVi: 'Phương trình có nghiệm kép',
          titleEn: 'Equation has a double root',
          descVi: `Δ = ${delta} = 0. Nghiệm kép x = -b / (2a) = ${x.toFixed(1)}.`,
          descEn: `Δ = ${delta} = 0. Double root x = -b / (2a) = ${x.toFixed(1)}.`,
          roots: [x],
        };
      } else {
        return {
          type: 'no_roots',
          titleVi: 'Phương trình vô nghiệm thực',
          titleEn: 'No real roots',
          descVi: `Δ = ${delta} < 0. Vì Δ âm nên không tồn tại căn bậc hai số thực.`,
          descEn: `Δ = ${delta} < 0. No real square root exists for negative delta.`,
          roots: [],
        };
      }
    }
  };

  const solution = solveEquation();

  return (
    <div className="space-y-10">
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-indigo-950/60 border border-blue-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-mono uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            {isVi ? 'Nhiệm vụ 2 – SGK Trang 150-152' : 'Task 2 – Textbook Pages 150-152'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isVi
              ? 'Giải phương trình bậc hai ax² + bx + c = 0'
              : 'Solving Quadratic Equations ax² + bx + c = 0'}
          </h2>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Thiết kế chương trình giaipt.py theo tư duy module hoá với các hàm NhapDL(), GiaiPT1(b, c), GiaiPT2(a, b, c) và áp dụng cấu trúc rẽ nhánh if...elif...else lồng nhau rút gọn chuẩn mực.'
              : 'Architect giaipt.py following modular programming practices with NhapDL(), GiaiPT1(b, c), GiaiPT2(a, b, c), replacing deep indentation staircases with streamlined if...elif...else constructs.'}
          </p>
        </div>
      </div>

      {/* CODE REFACTORING COMPARISON: IF..ELSE VS IF..ELIF..ELSE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Workflow className="w-5 h-5 text-teal-400" />
          <h3 className="text-lg font-bold text-white">
            {isVi
              ? 'Cấu trúc rẽ nhánh mở rộng: Rút gọn lồng nhau (SGK Trang 151)'
              : 'Extended Conditionals: Flattening Nested if...else (Page 151)'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs">
            <div className="text-xs text-rose-400 font-bold pb-2 mb-2 border-b border-slate-800 flex justify-between">
              <span>Mô hình lồng nhau sâu (Thụt lề bậc thang)</span>
              <span>Cũ / Dễ rối</span>
            </div>
            <pre className="text-slate-400 leading-relaxed">
{`if <điều kiện 1>:
    <nhóm lệnh 1>
else:
    if <điều kiện 2>:
        <nhóm lệnh 2>
    else:
        <nhóm lệnh 3>`}
            </pre>
            <p className="text-[11px] text-slate-500 mt-3 font-sans">
              {isVi
                ? 'Nhược điểm: Khi có nhiều điều kiện, code bị đẩy lệch dần sang bên phải (indentation staircase), khó bảo trì và dễ nhầm thụt lề.'
                : 'Drawback: Many nested branches push code deeply rightward, creating indentation ladders prone to IndentationError.'}
            </p>
          </div>

          <div className="bg-slate-950 border border-teal-500/30 rounded-xl p-4 font-mono text-xs">
            <div className="text-xs text-teal-300 font-bold pb-2 mb-2 border-b border-slate-800 flex justify-between">
              <span>Mô hình if...elif...else rút gọn (SGK khuyên dùng)</span>
              <span className="text-emerald-400">Chuẩn Pythonic</span>
            </div>
            <pre className="text-emerald-300 leading-relaxed font-bold">
{`if <điều kiện 1>:
    <nhóm lệnh 1>
elif <điều kiện 2>:
    <nhóm lệnh 2>
else:
    <nhóm lệnh 3>`}
            </pre>
            <p className="text-[11px] text-teal-400/80 mt-3 font-sans">
              {isVi
                ? 'Ưu điểm: Tất cả các điều kiện rẽ nhánh đều nằm thẳng một cột, dễ đọc, mạch lạc và có thể lồng nhiều điều kiện elif.'
                : 'Advantage: All conditions align cleanly in a single column, highly legible and supporting arbitrary elif chains.'}
            </p>
          </div>
        </div>
      </div>

      {/* FULL CODE LISTING GIAIPT.PY */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs font-mono">
          <span className="text-teal-400 font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <span>giaipt.py (SGK Trang 151 – 152)</span>
          </span>
          <span className="text-slate-400">4 Hàm module hoá chuyên biệt</span>
        </div>

        <pre className="font-mono text-xs md:text-sm text-slate-300 leading-relaxed overflow-x-auto">
{`# Nhập từ bàn phím ba số thực a, b, c và tìm nghiệm của phương trình ax2 + bx + c = 0.
def sqrt(x):
    return x**0.5

def NhapDL():
    s = input("Nhập ba số a, b, c cách nhau bởi dấu cách: ")
    snum = s.split()
    return float(snum[0]), float(snum[1]), float(snum[2])

def GiaiPT1(b, c):
    if b != 0:
        print("Phương trình có một nghiệm duy nhất:", round(-c/b, 1))
    elif c == 0:
        print("Phương trình có vô số nghiệm")
    else:
        print("Phương trình vô nghiệm")

def GiaiPT2(a, b, c):
    if a == 0:
        GiaiPT1(b, c)
    else:
        delta = b*b - 4*a*c
        if delta > 0:
            x1 = (-b + sqrt(delta)) / (2*a)
            x2 = (-b - sqrt(delta)) / (2*a)
            print("Phương trình có hai nghiệm khác biệt")
            print("x1 =", round(x1, 1), "x2 =", round(x2, 1))
        elif delta == 0:
            x = -b / (2*a)
            print("Phương trình có nghiệm kép")
            print("x1,2 =", round(x, 1))
        else:
            print("Phương trình vô nghiệm")

# Chương trình chính
a, b, c = NhapDL()
GiaiPT2(a, b, c)`}
        </pre>
      </div>

      {/* INTERACTIVE QUADRATIC SOLVER SANDBOX */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/40 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              {isVi ? 'Máy tính giải phương trình trực quan' : 'Interactive Solver Sandbox'}
            </div>
            <h3 className="text-xl font-bold text-white">
              {isVi ? 'Thử nghiệm các bộ hệ số & Biện luận nghiệm' : 'Test Coefficients & Inspect Complete Case Analysis'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isVi
                ? 'Chọn các kịch bản mẫu từ SGK hoặc tự do tuỳ chỉnh hệ số a, b, c để quan sát phản ứng của hàm GiaiPT2.'
                : 'Select textbook preset cases or customize a, b, c to observe real-time GiaiPT2 execution.'}
            </p>
          </div>
        </div>

        {/* PRESET CHIPS */}
        <div className="mt-4 flex flex-wrap gap-2">
          {PRESET_CASES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCoeffA(preset.a);
                setCoeffB(preset.b);
                setCoeffC(preset.c);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 text-xs text-slate-300 hover:text-white transition-all font-mono"
            >
              {isVi ? preset.labelVi : preset.labelEn}
            </button>
          ))}
        </div>

        {/* INPUT COEFFICIENTS ROW */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <label className="text-xs font-mono text-slate-400 block mb-2">
              {isVi ? 'Hệ số a (Hệ số x²):' : 'Coefficient a (x² term):'}
            </label>
            <input
              type="number"
              step="any"
              value={coeffA}
              onChange={(e) => setCoeffA(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-base focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <label className="text-xs font-mono text-slate-400 block mb-2">
              {isVi ? 'Hệ số b (Hệ số x):' : 'Coefficient b (x term):'}
            </label>
            <input
              type="number"
              step="any"
              value={coeffB}
              onChange={(e) => setCoeffB(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-base focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
            <label className="text-xs font-mono text-slate-400 block mb-2">
              {isVi ? 'Hệ số c (Hạng tử tự do):' : 'Coefficient c (Constant):'}
            </label>
            <input
              type="number"
              step="any"
              value={coeffC}
              onChange={(e) => setCoeffC(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-base focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* SOLUTION DISPLAY CARD */}
        <div className="mt-6 bg-slate-950 border border-blue-500/40 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="font-mono text-xs text-blue-300 font-bold uppercase tracking-wider">
              {isVi ? 'Kết luận biện luận toán học:' : 'Mathematical Conclusion:'}
            </span>
            <span className="font-mono text-xs text-slate-400">
              f(x) = {coeffA}x² {coeffB >= 0 ? `+ ${coeffB}x` : `- ${Math.abs(coeffB)}x`} {coeffC >= 0 ? `+ ${coeffC}` : `- ${Math.abs(coeffC)}`} = 0
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              <span>{isVi ? solution.titleVi : solution.titleEn}</span>
            </h4>
            <p className="text-xs md:text-sm text-slate-300 font-sans leading-relaxed">
              {isVi ? solution.descVi : solution.descEn}
            </p>
          </div>

          {solution.roots.length > 0 && (
            <div className="flex flex-wrap gap-4 pt-2">
              {solution.roots.map((r, i) => (
                <div key={i} className="bg-slate-900 border border-teal-500/40 px-4 py-2 rounded-lg">
                  <span className="text-xs text-slate-400 font-mono block">
                    {solution.roots.length === 1 ? 'Nghiệm duy nhất / kép:' : `Nghiệm x${i + 1}:`}
                  </span>
                  <span className="text-xl font-bold font-mono text-teal-300">
                    x{solution.roots.length > 1 ? i + 1 : ''} = {r.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
