import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  Code2, 
  Sparkles,
  BookOpen,
  Calendar,
  Grid,
  Calculator,
  ArrowRight,
  Lock,
  Unlock
} from 'lucide-react';

export const Section31PracticeApply: React.FC = () => {
  const { bilingualMode, navigateToQuiz, isAllSectionsComplete, completedSections, currentLesson } = useBook();
  const isVi = bilingualMode !== 'en';
  const totalSections = currentLesson.sections.length || 4;
  const completedCount = completedSections.length;
  const remainingCount = Math.max(0, totalSections - completedCount);

  // State for Luyện tập 1: Loop validation
  const [valInputA, setValInputA] = useState<string>('-2.5');
  const [valHistory, setValHistory] = useState<string[]>([]);
  const [valSuccess, setValSuccess] = useState<boolean>(false);

  // State for Vận dụng 1: Leap years
  const [year1, setYear1] = useState<number>(2001);
  const [year2, setYear2] = useState<number>(2100);
  const [leapYearsList, setLeapYearsList] = useState<number[] | null>(null);

  // State for Vận dụng 2: Modulo GCD vs Subtraction GCD
  const [gcdA, setGcdA] = useState<number>(1071);
  const [gcdB, setGcdB] = useState<number>(462);
  const [gcdTrace, setGcdTrace] = useState<{ moduloSteps: number; subSteps: number; result: number } | null>(null);

  // Handle Luyện tập 1 input trial
  const handleTestInputA = () => {
    const num = parseFloat(valInputA);
    if (isNaN(num)) {
      setValHistory(prev => [...prev, isVi ? `[Lỗi] "${valInputA}" không phải là số thực!` : `[Error] "${valInputA}" is not a valid float!`]);
      return;
    }

    if (num <= 0) {
      setValHistory(prev => [
        ...prev,
        isVi
          ? `Nhập a = ${num}: "Nhập sai, số a phải lớn hơn 0. Hãy nhập lại".`
          : `Entered a = ${num}: "Invalid, a must be > 0. Please re-enter".`
      ]);
      setValSuccess(false);
    } else {
      setValHistory(prev => [
        ...prev,
        isVi
          ? `Thành công! a = ${num} > 0. Vòng lặp dừng lại!`
          : `Success! a = ${num} > 0. Loop terminated!`
      ]);
      setValSuccess(true);
    }
  };

  // Handle Vận dụng 1: Leap years calculator
  const handleCalcLeapYears = () => {
    const y1 = Math.min(year1, year2);
    const y2 = Math.max(year1, year2);
    const leaps: number[] = [];

    for (let y = y1; y <= y2; y++) {
      if ((y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0)) {
        leaps.push(y);
      }
    }
    setLeapYearsList(leaps);
  };

  // Handle Vận dụng 2: Modulo GCD vs Subtraction GCD
  const handleCalcGcd = () => {
    let a1 = Math.max(1, Math.abs(gcdA));
    let b1 = Math.max(1, Math.abs(gcdB));

    // Modulo GCD
    let modSteps = 0;
    let aMod = a1;
    let bMod = b1;
    while (bMod > 0) {
      modSteps++;
      const temp = aMod % bMod;
      aMod = bMod;
      bMod = temp;
    }

    // Subtraction GCD (with safety break)
    let subSteps = 0;
    let aSub = a1;
    let bSub = b1;
    while (aSub !== bSub && subSteps < 500) {
      subSteps++;
      if (aSub < bSub) {
        bSub = bSub - aSub;
      } else {
        aSub = aSub - bSub;
      }
    }

    setGcdTrace({
      moduloSteps: modSteps,
      subSteps: subSteps >= 500 ? 500 : subSteps,
      result: aMod,
    });
  };

  return (
    <div className="space-y-12">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-teal-950/60 border border-emerald-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-mono uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            {isVi ? 'SGK Trang 152 – Luyện tập & Vận dụng' : 'Textbook Page 152 – Practice & Apply'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isVi ? 'Luyện tập, Vận dụng & Đánh giá năng lực' : 'Practice, Application & Mastery Quiz'}
          </h2>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Áp dụng các cấu trúc rẽ nhánh, vòng lặp while, thuật toán modulo và tư duy module hoá vào các bài toán SGK: bẫy dữ liệu số thực dương, in bảng cửu chương 2 hàng, tính 24 năm nhuận trong thế kỉ XXI và so sánh tốc độ thuật toán Euclid.'
              : 'Apply branching logic, while validation loops, modulo arithmetic, and modular architecture to textbook challenges: positive float validation, dual-row multiplication grid, 21st-century leap year calculation, and Euclidean algorithm optimization.'}
          </p>
        </div>
      </div>

      {/* SECTION 1: LUYỆN TẬP */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-lg border-b border-slate-800 pb-2">
          <BookOpen className="w-5 h-5" />
          <span>{isVi ? 'Phần Luyện tập (SGK Trang 152)' : 'Practice Section (Page 152)'}</span>
        </div>

        {/* LUYỆN TẬP 1: BẪY SỐ THỰC DƯƠNG */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                {isVi ? 'Luyện tập 1' : 'Practice 1'}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white mt-1">
                {isVi ? 'Kiểm tra và bắt buộc nhập số thực dương a > 0' : 'Validate & Enforce Positive Real Input a > 0'}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono">
              while Loop
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300">
              <span className="text-slate-500 block mb-2"># Mã nguồn Python chuẩn SGK:</span>
              <pre className="leading-relaxed">
{`# Nhập a, nếu a <= 0 thì yêu cầu nhập lại
a = float(input("Nhập số thực dương a: "))
while a <= 0:
    print("Nhập sai, số a phải lớn hơn 0. Hãy nhập lại")
    a = float(input("Nhập lại số a: "))
print("Đã nhập số dương hợp lệ a =", a)`}
              </pre>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-teal-400 font-bold block mb-2">
                  {isVi ? 'Thử nghiệm nhập số a:' : 'Interactive Input Sandbox:'}
                </span>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={valInputA}
                    onChange={(e) => setValInputA(e.target.value)}
                    placeholder={isVi ? 'Nhập số thực a...' : 'Enter float a...'}
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-teal-500 focus:outline-none"
                  />
                  <button
                    onClick={handleTestInputA}
                    className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-all"
                  >
                    {isVi ? 'Gửi input' : 'Submit'}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 max-h-32 overflow-y-auto space-y-1 font-mono text-xs">
                {valHistory.length === 0 ? (
                  <span className="text-slate-500">
                    {isVi ? 'Chưa có lượt nhập nào. Thử nhập số âm (-2.5) hoặc số 0 rồi nhập số dương (4.2).' : 'No attempts yet. Try negative values (-2.5) or zero, then positive (4.2).'}
                  </span>
                ) : (
                  valHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={
                        msg.includes('Thành công') || msg.includes('Success')
                          ? 'text-emerald-400 font-bold'
                          : 'text-rose-400'
                      }
                    >
                      {msg}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* LUYỆN TẬP 2: BẢNG CỬU CHƯƠNG 2 HÀNG */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                {isVi ? 'Luyện tập 2' : 'Practice 2'}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white mt-1">
                {isVi ? 'In bảng cửu chương ra màn hình thành 2 hàng ngang' : 'Print Multiplication Table in 2 Horizontal Rows'}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono">
              Nested Loop & Formatting
            </span>
          </div>

          <p className="text-xs text-slate-400 mt-2">
            {isVi
              ? 'Yêu cầu: Hàng thứ nhất in bảng nhân 1, 2, 3, 4, 5. Hàng thứ hai in bảng nhân 6, 7, 8, 9, 10. Sử dụng tham số end="\\t" để căn lề thẳng cột.'
              : 'Requirement: Row 1 prints tables 1, 2, 3, 4, 5. Row 2 prints tables 6, 7, 8, 9, 10 using tab separators.'}
          </p>

          <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs overflow-x-auto">
            <span className="text-slate-500 block mb-2"># Mã nguồn Python hoàn chỉnh:</span>
            <pre className="text-teal-300 leading-relaxed">
{`# Hàng thứ nhất: Bảng nhân 1 đến 5
print("=== BẢNG NHÂN 1 ĐẾN 5 ===")
for j in range(1, 11):
    for i in range(1, 6):
        print(f"{i} x {j:2} = {i*j:2}", end="\\t")
    print()

print("\\n=== BẢNG NHÂN 6 ĐẾN 10 ===")
# Hàng thứ hai: Bảng nhân 6 đến 10
for j in range(1, 11):
    for i in range(6, 11):
        print(f"{i} x {j:2} = {i*j:2}", end="\\t")
    print()`}
            </pre>
          </div>
        </div>
      </div>

      {/* SECTION 2: VẬN DỤNG */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-lg border-b border-slate-800 pb-2">
          <Sparkles className="w-5 h-5" />
          <span>{isVi ? 'Phần Vận dụng (SGK Trang 152)' : 'Application Section (Page 152)'}</span>
        </div>

        {/* VẬN DỤNG 1: ĐẾM NĂM NHUẬN THẾ KỈ XXI */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                {isVi ? 'Vận dụng 1' : 'Application 1'}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white mt-1">
                {isVi ? 'Tính số năm nhuận giữa 2 năm & Thế kỉ XXI (2001 – 2100)' : 'Count Leap Years between Years & In the 21st Century'}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono">
              Calendar Algorithm
            </span>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="font-mono text-slate-400">Từ năm Y1:</label>
                <input
                  type="number"
                  value={year1}
                  onChange={(e) => setYear1(Number(e.target.value))}
                  className="w-20 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-white font-mono text-center focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="font-mono text-slate-400">Đến năm Y2:</label>
                <input
                  type="number"
                  value={year2}
                  onChange={(e) => setYear2(Number(e.target.value))}
                  className="w-20 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-white font-mono text-center focus:border-teal-500 focus:outline-none"
                />
              </div>
              <button
                onClick={handleCalcLeapYears}
                className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg transition-all"
              >
                {isVi ? 'Đếm số năm nhuận' : 'Calculate'}
              </button>
            </div>

            {leapYearsList !== null && (
              <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-teal-300 font-bold font-mono">
                  <span>
                    {isVi
                      ? `Từ ${year1} đến ${year2} có tổng cộng: ${leapYearsList.length} năm nhuận`
                      : `From ${year1} to ${year2}: Total ${leapYearsList.length} leap years`}
                  </span>
                  {year1 === 2001 && year2 === 2100 && (
                    <span className="text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40 text-[11px]">
                      {isVi ? 'Đáp số câu hỏi SGK: 24 năm' : 'Textbook answer: 24 years'}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  {isVi
                    ? 'Giải thích: Trong thế kỉ XXI (2001 - 2100) có 25 số chia hết cho 4 (2004, 2008, ..., 2100). Tuy nhiên, năm 2100 chia hết cho 100 nhưng không chia hết cho 400 nên KHÔNG phải năm nhuận! Vì vậy chỉ có chính xác 24 năm nhuận.'
                    : 'Explanation: Between 2001 and 2100 there are 25 multiples of 4. But year 2100 is divisible by 100 and not by 400, so it is NOT a leap year! Hence exactly 24 leap years.'}
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-1 font-mono text-[11px]">
                  {leapYearsList.map((y) => (
                    <span key={y} className="px-2 py-0.5 rounded bg-slate-950 text-teal-300 border border-teal-500/20">
                      {y}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* VẬN DỤNG 2: THUẬT TOÁN EUCLID MODULO */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                {isVi ? 'Vận dụng 2' : 'Application 2'}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white mt-1">
                {isVi ? 'Thuật toán Euclid modulo: UCLN(a, b) = UCLN(b, a % b)' : 'Euclidean Modulo Algorithm: GCD(a, b) = GCD(b, a % b)'}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono">
              O(log(min(a,b)))
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 leading-relaxed">
              <span className="text-slate-500 block mb-2"># So sánh 2 thuật toán tìm ƯCLN:</span>
              <div className="text-amber-300 font-bold mb-1">1. Thuật toán trừ (Bài 30):</div>
              <pre className="text-slate-400 mb-3">
{`while a != b:
    if a < b: b = b - a
    else: a = a - b`}
              </pre>

              <div className="text-teal-300 font-bold mb-1">2. Thuật toán Modulo (Bài 31 Vận dụng 2):</div>
              <pre className="text-teal-200 font-bold">
{`while b > 0:
    a, b = b, a % b
return a`}
              </pre>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-teal-400 font-bold block mb-3">
                  {isVi ? 'So sánh tốc độ thực thi giữa 2 thuật toán:' : 'Performance Comparison Bench:'}
                </span>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Số a:</label>
                    <input
                      type="number"
                      value={gcdA}
                      onChange={(e) => setGcdA(Number(e.target.value))}
                      className="w-full px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Số b:</label>
                    <input
                      type="number"
                      value={gcdB}
                      onChange={(e) => setGcdB(Number(e.target.value))}
                      className="w-full px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleCalcGcd}
                  className="w-full py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md shadow-teal-500/20"
                >
                  {isVi ? 'So sánh số vòng lặp' : 'Benchmark Iterations'}
                </button>
              </div>

              {gcdTrace && (
                <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
                  <div className="text-teal-300 font-bold">
                    ƯCLN({gcdA}, {gcdB}) = {gcdTrace.result}
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Thuật toán Modulo (Bài 31):</span>
                    <span className="text-emerald-400 font-bold">{gcdTrace.moduloSteps} vòng lặp</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Thuật toán Trừ (Bài 30):</span>
                    <span className="text-rose-400 font-bold">{gcdTrace.subSteps} vòng lặp</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* TRẮC NGHIỆM TỔNG KẾT / LESSON QUIZ CARD */}
      <div className={`p-6 sm:p-7 rounded-3xl border-2 transition-all shadow-2xl ${
        isAllSectionsComplete
          ? 'bg-linear-to-r from-emerald-950/70 via-teal-950/50 to-slate-900 border-emerald-500/50 shadow-emerald-950/30'
          : 'bg-slate-900/90 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left info */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className={`p-2 rounded-xl border flex items-center justify-center ${
                isAllSectionsComplete
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              }`}>
                {isAllSectionsComplete ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {isVi ? 'Trắc nghiệm tổng kết' : 'Lesson Quiz'}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border flex items-center gap-1 ${
                    isAllSectionsComplete
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {isAllSectionsComplete
                      ? (isVi ? 'Đã mở khóa (4/4)' : 'Unlocked (4/4)')
                      : (isVi ? `Đang khóa (${completedCount}/${totalSections})` : `Locked (${completedCount}/${totalSections})`)}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-teal-400">
                    {isVi ? '10 câu hỏi chuẩn SGK' : '10 Textbook Questions'}
                  </span>
                  <span>•</span>
                  <span>
                    {isVi ? 'Đạt ≥ 8/10 cấp chứng nhận danh dự' : 'Score ≥ 8/10 for Certificate'}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Message */}
            <div className="space-y-2 max-w-xl">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAllSectionsComplete
                  ? (isVi
                      ? 'Chúc mừng! Em đã hoàn thành đủ 4/4 phần của bài học. Hãy bấm "Làm trắc nghiệm" để bắt đầu bài thi và nhận chứng nhận số!'
                      : 'Congratulations! You have completed all 4/4 sections. Click "Start Quiz" to take the test and earn your certificate!')
                  : (isVi
                      ? `Tiến độ: ${completedCount}/${totalSections} phần. Còn ${remainingCount} phần cần hoàn thành để mở khóa trắc nghiệm và nhận chứng chỉ.`
                      : `Progress: ${completedCount}/${totalSections} sections. ${remainingCount} section${remainingCount > 1 ? 's' : ''} left to complete before unlocking the quiz and certificate.`)}
              </p>

              {/* Visual Progress Bar */}
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isAllSectionsComplete ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.round((completedCount / totalSections) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="shrink-0 flex items-center">
            <button
              type="button"
              onClick={navigateToQuiz}
              className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-xl cursor-pointer ${
                isAllSectionsComplete
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 hover:scale-105 active:scale-95 shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {isAllSectionsComplete ? (
                <>
                  <Award className="w-5 h-5 text-slate-950" />
                  <span>{isVi ? 'Làm trắc nghiệm' : 'Start Quiz'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>{isVi ? `Làm trắc nghiệm (Khóa ${completedCount}/${totalSections})` : `Start Quiz (Locked ${completedCount}/${totalSections})`}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
