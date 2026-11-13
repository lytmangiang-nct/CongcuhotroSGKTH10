import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  ShieldAlert,
  Search,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Layers,
  Activity,
  Terminal,
  Crosshair,
  AlertTriangle,
  FileCode,
  Zap,
  Play
} from 'lucide-react';

export const Section30TestingMethods: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // Interactive Boundary Tester State: 0 <= x, y <= 1
  const [testPair, setTestPair] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [boundaryReport, setBoundaryReport] = useState<{
    isBoundary: boolean;
    label: string;
    description: string;
  } | null>(null);

  const checkBoundary = (x: number, y: number) => {
    setTestPair({ x, y });
    const isEdgeX = x === 0 || x === 1;
    const isEdgeY = y === 0 || y === 1;

    if (isEdgeX && isEdgeY) {
      setBoundaryReport({
        isBoundary: true,
        label: isVi ? `Điểm Góc Biên Cực Hạn (${x}, ${y})` : `Corner Edge Point (${x}, ${y})`,
        description: isVi
          ? `Điểm (${x}, ${y}) nằm ở góc giao của cả 2 biên x và y. Đây là vị trí có xác suất sinh lỗi cao nhất (chia cho 0, vòng lặp không chạy, giá trị 0 gây sai lôgic).`
          : `Point (${x}, ${y}) is a critical corner intersection of both boundary limits.`
      });
    } else if (isEdgeX || isEdgeY) {
      setBoundaryReport({
        isBoundary: true,
        label: isVi ? `Điểm Nằm Trên Cạnh Biên (${x}, ${y})` : `Edge Boundary Point (${x}, ${y})`,
        description: isVi
          ? `Điểm (${x}, ${y}) tiếp giáp ranh giới miền xác định. Cần kiểm tra kĩ điều kiện < hay <=.`
          : `Point (${x}, ${y}) sits directly on a domain edge boundary.`
      });
    } else {
      setBoundaryReport({
        isBoundary: false,
        label: isVi ? `Điểm Miền Trong Nội Bộ (${x}, ${y})` : `Interior Point (${x}, ${y})`,
        description: isVi
          ? `Điểm (${x}, ${y}) nằm an toàn bên trong miền xác định, thường hoạt động ổn định nhưng không thể đảm bảo an toàn cho vùng biên.`
          : `Point (${x}, ${y}) is safely inside the domain.`
      });
    }
  };

  // Random Test Generator
  const [randomSuite, setRandomSuite] = useState<Array<{ x: number; y: number; isEdge: boolean }>>([]);

  const generateRandomSuite = () => {
    const list: Array<{ x: number; y: number; isEdge: boolean }> = [];
    // Inject guaranteed edges
    list.push({ x: 0, y: 0, isEdge: true });
    list.push({ x: 1, y: 1, isEdge: true });
    list.push({ x: 0, y: 1, isEdge: true });
    list.push({ x: 1, y: 0, isEdge: true });

    // Generate 4 random interior values
    for (let i = 0; i < 4; i++) {
      const rx = Number(Math.random().toFixed(2));
      const ry = Number(Math.random().toFixed(2));
      list.push({ x: rx, y: ry, isEdge: false });
    }
    setRandomSuite(list);
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-700 p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Search className="w-4 h-4" />
          {isVi ? 'Mục 1 • SGK Trang 145 – 146' : 'Part 1 • Textbook Pages 145 – 146'}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          {isVi ? '1. Một vài phương pháp kiểm thử chương trình' : '1. Core Software Testing Methods'}
        </h2>
        <p className="mt-2 text-cyan-100 max-w-3xl text-sm md:text-base leading-relaxed">
          {isVi
            ? 'Khám phá 4 phương pháp kiểm thử và gỡ lỗi tiêu chuẩn: Bắt mã lỗi ngoại lệ runtime, thiết kế bộ test đa dạng và vùng biên, chèn lệnh print() in biến trung gian, và sử dụng công cụ điểm dừng (breakpoint).'
            : 'Explore the 4 canonical verification methods: runtime exception tracking, boundary test suites, intermediate variable print logging, and IDE breakpoint stepping.'}
        </p>
      </div>

      {/* 4 Phương pháp chi tiết */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
          <Crosshair className="w-5 h-5 text-teal-500" />
          {isVi ? '4 Phương pháp kiểm thử chương trình theo SGK' : '4 Standard Program Testing Approaches'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Method A */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-rose-500 text-white font-bold text-xs flex items-center justify-center">
                a
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {isVi ? 'Quan sát mã lỗi Runtime và bắt lỗi ngoại lệ' : 'Trace Runtime Codes & Catch Exceptions'}
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isVi
                ? 'Nếu chương trình gặp lỗi Runtime (đang chạy bị dừng lại), cần quan sát kỹ mã lỗi ngoại lệ (ZeroDivisionError, IndexError, ValueError...) và dòng lệnh được chỉ ra trong Traceback để phân tích nguyên nhân và sửa lỗi.'
                : 'When encountering runtime crashes, examine the exception code and line numbers reported in the Traceback to locate and fix root causes.'}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 text-rose-300 font-mono text-[11px]">
              Traceback: ZeroDivisionError at line 4 (m / n)
            </div>
          </div>

          {/* Method B */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center">
                b
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {isVi ? 'Kiểm thử với các bộ dữ liệu test đặc thù' : 'Verify with Test Datasets & Boundary Values'}
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isVi
                ? 'Thử nghiệm với đầu vào tiêu biểu có kết quả đã biết trước. SGK nhấn mạnh 3 tiêu chí: (1) Cần nhiều bộ test đa dạng; (2) Cần bộ test ngẫu nhiên; (3) Cần bộ test ở vùng biên (như 0, cực đại) vì lỗi tập trung nhiều nhất ở biên.'
                : 'Run suites with known expected outputs. Focus on 3 tenets: multiple diverse tests, random inputs, and critical boundary edge-cases.'}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 text-amber-300 font-mono text-[11px]">
              Bộ test biên: (0, 0), (0, 1), (1, 0), (1, 1) khi 0 &le; x, y &le; 1
            </div>
          </div>

          {/* Method C */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-cyan-500 text-white font-bold text-xs flex items-center justify-center">
                c
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {isVi ? 'In các thông số trung gian (Print Debugging)' : 'Print Intermediate Variable States'}
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isVi
                ? 'Bổ sung các lệnh print() vào giữa các vòng lặp hay bước tính để in ra các biến trung gian (y1, y2, ...). Khi kết quả cuối cùng bị sai, nhìn vào chuỗi giá trị trung gian sẽ lập tức phát hiện bước tính nào bị sai lệch.'
                : 'Insert print() statements between code lines to output intermediate variables, pinpointing exactly where logic drifts away from expectations.'}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 text-cyan-300 font-mono text-[11px]">
              print("Vòng lặp", k, ": m =", m, "n =", n)
            </div>
          </div>

          {/* Method D */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-purple-500 text-white font-bold text-xs flex items-center justify-center">
                d
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {isVi ? 'Sử dụng công cụ điểm dừng (Breakpoint)' : 'Set IDE Breakpoints & Step Over'}
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {isVi
                ? 'Tạo các điểm dừng bên trong chương trình bằng IDE. Khi chạy ở chế độ Debug, chương trình sẽ tạm dừng tại điểm dừng cho phép người lập trình soi trực tiếp mọi biến trong bộ nhớ. Thường kết hợp cùng in biến trung gian.'
                : 'Pause code execution at pre-selected lines in IDE debuggers to inspect variables without polluting production code with print statements.'}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-900 text-purple-300 font-mono text-[11px]">
              Breakpoint at line 4: while m != n:
            </div>
          </div>
        </div>
      </section>

      {/* Phòng Thí Nghiệm Khảo Sát Dữ Liệu Vùng Biên */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold mb-1">
              <Activity className="w-3.5 h-3.5" />
              {isVi ? 'Khảo sát thực nghiệm SGK Trang 145' : 'Textbook Empirical Lab'}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {isVi ? 'Kiểm thử dữ liệu vùng biên: Miền 0 ≤ x, y ≤ 1' : 'Boundary Test Explorer: Domain 0 ≤ x, y ≤ 1'}
            </h3>
          </div>

          <button
            onClick={generateRandomSuite}
            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            {isVi ? 'Sinh bộ test ngẫu nhiên kèm biên' : 'Generate Fuzz Suite with Edges'}
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          {isVi
            ? 'Nhấn vào các toạ độ mẫu để phân tích rủi ro bug tại các điểm biên và nội bộ:'
            : 'Click sample coordinates to analyze bug probability on edges vs interior:'}
        </p>

        {/* Preset coordinates buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => checkBoundary(0, 0)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800 hover:scale-105 transition-transform cursor-pointer"
          >
            (0, 0) [Góc Biên Cực Tiểu]
          </button>
          <button
            onClick={() => checkBoundary(0, 1)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800 hover:scale-105 transition-transform cursor-pointer"
          >
            (0, 1) [Góc Biên]
          </button>
          <button
            onClick={() => checkBoundary(1, 0)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-800 hover:scale-105 transition-transform cursor-pointer"
          >
            (1, 0) [Góc Biên]
          </button>
          <button
            onClick={() => checkBoundary(1, 1)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800 hover:scale-105 transition-transform cursor-pointer"
          >
            (1, 1) [Góc Biên Cực Đại]
          </button>
          <button
            onClick={() => checkBoundary(0.5, 0.5)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-800 hover:scale-105 transition-transform cursor-pointer"
          >
            (0.5, 0.5) [Tâm Miền Trong]
          </button>
          <button
            onClick={() => checkBoundary(0, 0.5)}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-800 hover:scale-105 transition-transform cursor-pointer"
          >
            (0, 0.5) [Cạnh Biên Trái]
          </button>
        </div>

        {/* Boundary Verdict Card */}
        {boundaryReport && (
          <div
            className={`p-4 rounded-xl border mb-6 ${
              boundaryReport.isBoundary
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200'
                : 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-700 text-sky-900 dark:text-sky-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              <Crosshair className="w-4 h-4" />
              <span>{boundaryReport.label}</span>
            </div>
            <p className="text-xs leading-relaxed opacity-95">{boundaryReport.description}</p>
          </div>
        )}

        {/* Random Fuzz Suite Table if generated */}
        {randomSuite.length > 0 && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {isVi ? 'Bộ dữ liệu kiểm thử hỗn hợp đã sinh tự động:' : 'Generated Mixed Test Suite:'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              {randomSuite.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border flex items-center justify-between ${
                    item.isEdge
                      ? 'bg-amber-100/70 dark:bg-amber-950/70 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 font-bold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>({item.x}, {item.y})</span>
                  <span className="text-[10px] uppercase">{item.isEdge ? 'Vùng Biên' : 'Nội bộ'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Hộp Ghi Nhớ SGK Trang 146 */}
      <section className="bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 rounded-2xl p-6 md:p-8 border-2 border-teal-400/60 dark:border-teal-600/60 shadow-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500 text-slate-950 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <BilingualText
            vi="HỘP GHI NHỚ • TRANG 146 SGK"
            en="KEY SUMMARY BOX • PAGE 146"
          />
        </div>

        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4">
          <BilingualText
            vi="4 Trụ cột phương pháp kiểm thử và gỡ lỗi"
            en="4 Pillars of Software Testing & Debugging"
          />
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-teal-300 dark:border-teal-800 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center shrink-0">1</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              <BilingualText
                vi="Sử dụng công cụ in các biến trung gian."
                en="Print intermediate variable state logs."
              />
            </div>
          </div>

          <div className="p-3.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-teal-300 dark:border-teal-800 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center shrink-0">2</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              <BilingualText
                vi="Sử dụng công cụ sinh các bộ dữ liệu test."
                en="Generate test suites with boundary/edge values."
              />
            </div>
          </div>

          <div className="p-3.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-teal-300 dark:border-teal-800 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center shrink-0">3</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              <BilingualText
                vi="Sử dụng công cụ điểm dừng trong phần mềm soạn thảo lập trình."
                en="Use breakpoints in the IDE editor to pause execution."
              />
            </div>
          </div>

          <div className="p-3.5 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-teal-300 dark:border-teal-800 flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center shrink-0">4</div>
            <div className="font-semibold text-slate-800 dark:text-slate-200">
              <BilingualText
                vi="Quan sát các mã lỗi của chương trình nếu phát sinh."
                en="Observe program error codes and traceback messages."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
