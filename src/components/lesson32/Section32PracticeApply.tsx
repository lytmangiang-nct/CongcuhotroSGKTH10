import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { 
  Award, 
  BookOpen, 
  ArrowRight, 
  ListOrdered, 
  Lock, 
  Unlock 
} from 'lucide-react';

export const Section32PracticeApply: React.FC = () => {
  const { bilingualMode, navigateToQuiz, isAllSectionsComplete, completedSections, currentLesson } = useBook();
  const isVi = bilingualMode !== 'en';

  const totalSections = currentLesson.sections.length || 4;
  const completedCount = completedSections.length;
  const remainingCount = Math.max(0, totalSections - completedCount);

  // State for Luyện tập & Vận dụng 2: Vietnamese Sorting
  const [studentInput, setStudentInput] = useState<string>(
    'Nguyễn Thị Mai Hương\nTrần Văn Nam\nLê Thị Mai Hương\nBùi Minh Ánh\nĐặng Quốc Anh\nNguyễn Văn An'
  );
  const [sortResult, setSortResult] = useState<{ ho: string; dem: string; ten: string; raw: string }[] | null>(null);

  // State for Vận dụng 1: Excel Serial Date
  const [serialN, setSerialN] = useState<number>(44477); // 08-10-2021 is around 44477 in Excel
  const [calcDateStr, setCalcDateStr] = useState<string>('');
  const [inputDateExcel, setInputDateExcel] = useState<string>('08-10-2021');
  const [calcSerialN, setCalcSerialN] = useState<number | null>(null);

  // State for Vận dụng 3: O(sqrt(n)) vs O(n) Prime Trial
  const [testNum, setTestNum] = useState<number>(1000003);
  const [benchStats, setBenchStats] = useState<{ sqrtSteps: number; naiveSteps: number; isPrime: boolean } | null>(null);

  // Vietnamese collation order mapping
  const VI_ALPHABET = 'AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬBCDĐEÈÉẺẼẸÊỀẾỂỄỆGHIÌÍỈĨỊJKLMNOÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢPQRSTUÙÚỦŨỤƯỪỨỬỮỰVXYỲÝỶỸỴ';
  const getViCharWeight = (ch: string) => {
    const idx = VI_ALPHABET.indexOf(ch.toUpperCase());
    return idx !== -1 ? idx : 999;
  };

  const compareViStrings = (str1: string, str2: string) => {
    const minLen = Math.min(str1.length, str2.length);
    for (let i = 0; i < minLen; i++) {
      const w1 = getViCharWeight(str1[i]);
      const w2 = getViCharWeight(str2[i]);
      if (w1 !== w2) return w1 - w2;
    }
    return str1.length - str2.length;
  };

  const handleSortStudents = () => {
    const lines = studentInput.split('\n').map(l => l.trim()).filter(Boolean);
    const parsed = lines.map(line => {
      const words = line.split(/\s+/);
      const ho = words[0] || '';
      const ten = words[words.length - 1] || '';
      const dem = words.length > 2 ? words.slice(1, -1).join(' ') : '';
      return { ho, dem, ten, raw: line };
    });

    // Priority: Tên -> Họ -> Đệm using Vietnamese collation
    parsed.sort((a, b) => {
      const cmpTen = compareViStrings(a.ten, b.ten);
      if (cmpTen !== 0) return cmpTen;
      const cmpHo = compareViStrings(a.ho, b.ho);
      if (cmpHo !== 0) return cmpHo;
      return compareViStrings(a.dem, b.dem);
    });

    setSortResult(parsed);
  };

  // Excel serial date from 1-1-1900
  const handleConvertSerialToDate = () => {
    // 1-1-1900 is day 1. Excel epoch milliseconds:
    const epoch = new Date(1899, 11, 30); // Note: Excel leap year bug adjustment (1900 leap bug)
    const target = new Date(epoch.getTime() + serialN * 86400000);
    const d = String(target.getDate()).padStart(2, '0');
    const m = String(target.getMonth() + 1).padStart(2, '0');
    const y = target.getFullYear();
    setCalcDateStr(`${d}-${m}-${y}`);
  };

  const handleConvertDateToSerial = () => {
    const parts = inputDateExcel.trim().split('-');
    if (parts.length === 3) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const y = parseInt(parts[2], 10);
      const dateObj = new Date(y, m, d);
      const epoch = new Date(1899, 11, 30);
      const diffDays = Math.round((dateObj.getTime() - epoch.getTime()) / 86400000);
      setCalcSerialN(diffDays);
    }
  };

  // Vận dụng 3: Trial division O(sqrt(n)) vs O(n)
  const handleBenchPrime = () => {
    const n = Math.max(2, Math.floor(testNum));

    // Sqrt optimized
    let sqrtSteps = 0;
    let isPrimeSqrt = true;
    const limit = Math.floor(Math.sqrt(n));
    for (let k = 2; k <= limit; k++) {
      sqrtSteps++;
      if (n % k === 0) {
        isPrimeSqrt = false;
        break;
      }
    }

    // Naive loop up to n
    let naiveSteps = 0;
    for (let k = 2; k <= n; k++) {
      naiveSteps++;
      if (n % k === 0) {
        break;
      }
      if (naiveSteps > 2000000) break; // guard against browser freeze
    }

    setBenchStats({
      sqrtSteps,
      naiveSteps,
      isPrime: isPrimeSqrt,
    });
  };

  return (
    <div className="space-y-12">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-indigo-950/60 border border-emerald-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-mono uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            {isVi ? 'SGK Trang 155 – Luyện tập & Vận dụng' : 'Textbook Page 155 – Practice & Apply'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isVi ? 'Luyện tập, Vận dụng & Đánh giá năng lực' : 'Practice, Application & Mastery Quiz'}
          </h2>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Giải quyết các bài toán lập trình nâng cao từ SGK: thuật toán sắp xếp Tên - Họ - Đệm theo bảng chữ cái tiếng Việt, ngày tuần tự bảng tính điện tử từ mốc 1-1-1900, và tối ưu hoá căn bậc hai nguyên tố O(√n).'
              : 'Conquer advanced textbook challenges: Vietnamese Given->Surname->Middle collation, spreadsheet serial dates from 1-1-1900, and square-root prime factorization bound O(√n).'}
          </p>
        </div>
      </div>

      {/* SECTION 1: LUYỆN TẬP & VẬN DỤNG 2 (SẮP XẾP TIẾNG VIỆT TÊN - HỌ - ĐỆM) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-teal-400 font-bold">
              {isVi ? 'Luyện tập & Vận dụng 2 (SGK Trang 155)' : 'Practice & Application 2 (Page 155)'}
            </span>
            <h3 className="text-base md:text-lg font-bold text-white mt-1">
              {isVi
                ? 'Sắp xếp danh sách học sinh: Ưu tiên TÊN -> HỌ -> ĐỆM (Tiếng Việt)'
                : 'Student Collation Engine: Priority Given Name -> Surname -> Middle'}
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono">
            Vietnamese Collation
          </span>
        </div>

        <p className="text-xs text-slate-400">
          {isVi
            ? 'Quy chuẩn SGK Trang 155: Sắp xếp ưu tiên theo TÊN trước; nếu trùng tên thì so sánh đến HỌ; nếu trùng cả tên và họ thì so sánh đến ĐỆM. Bảng chữ cái tiếng Việt gồm 89 kí tự có dấu thanh chuẩn.'
            : 'Textbook standard: Sort prioritizing GIVEN NAME; if equal, compare SURNAME; if still equal, compare MIDDLE NAME using full 89 Vietnamese diacritical characters.'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2">
                {isVi ? 'Danh sách học sinh (mỗi dòng một học sinh):' : 'Student list (one per line):'}
              </label>
              <textarea
                rows={7}
                value={studentInput}
                onChange={(e) => setStudentInput(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-teal-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSortStudents}
              className="mt-3 w-full py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md shadow-teal-500/20 flex items-center justify-center gap-2"
            >
              <ListOrdered className="w-4 h-4" />
              <span>{isVi ? 'Chạy thuật toán sắp xếp chuẩn' : 'Run Vietnamese Collation'}</span>
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <span className="text-xs font-mono text-teal-400 font-bold block mb-3">
              {isVi ? 'Kết quả danh sách sau sắp xếp:' : 'Sorted Student Roster:'}
            </span>

            {sortResult ? (
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {sortResult.map((st, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono"
                  >
                    <span className="text-slate-500 w-6">{i + 1}.</span>
                    <span className="text-white font-bold flex-1">{st.raw}</span>
                    <span className="text-amber-300 font-bold text-[11px] ml-2">
                      [{st.ten}, {st.ho} {st.dem}]
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500 text-xs italic py-10 text-center">
                {isVi ? 'Nhấn "Chạy thuật toán sắp xếp chuẩn" để xem kết quả phân loại.' : 'Click button to preview sorted collation.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 2: VẬN DỤNG 1 (EXCEL SERIAL DATE CONVERTER) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-blue-400 font-bold">
              {isVi ? 'Vận dụng 1 (SGK Trang 155)' : 'Application 1 (Page 155)'}
            </span>
            <h3 className="text-base md:text-lg font-bold text-white mt-1">
              {isVi
                ? 'Hệ thống ngày tuần tự bảng tính điện tử (Epoch 1-1-1900)'
                : 'Spreadsheet Serial Date Converter (1-1-1900 Epoch)'}
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono">
            Excel Serial Date
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DIRECTION 1: NUMBER TO DATE */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
            <span className="text-xs font-mono text-teal-300 font-bold block">
              1. Nhập số nguyên n ➔ Ngày tháng năm
            </span>
            <div className="flex gap-2">
              <input
                type="number"
                value={serialN}
                onChange={(e) => setSerialN(Number(e.target.value))}
                className="w-32 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:border-teal-500 focus:outline-none"
              />
              <button
                onClick={handleConvertSerialToDate}
                className="px-3 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded text-xs transition-all"
              >
                {isVi ? 'Tính ngày' : 'Convert'}
              </button>
            </div>
            {calcDateStr && (
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Ngày tương ứng: </span>
                <span className="text-teal-300 font-bold">{calcDateStr}</span>
              </div>
            )}
          </div>

          {/* DIRECTION 2: DATE TO NUMBER */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
            <span className="text-xs font-mono text-blue-300 font-bold block">
              2. Nhập ngày-tháng-năm ➔ Số nguyên n
            </span>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputDateExcel}
                onChange={(e) => setInputDateExcel(e.target.value)}
                className="w-36 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:border-blue-500 focus:outline-none"
                placeholder="08-10-2021"
              />
              <button
                onClick={handleConvertDateToSerial}
                className="px-3 py-1.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded text-xs transition-all"
              >
                {isVi ? 'Tính số n' : 'Convert'}
              </button>
            </div>
            {calcSerialN !== null && (
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Số ngày tuần tự trong Excel: </span>
                <span className="text-blue-300 font-bold">n = {calcSerialN}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: VẬN DỤNG 3 (TỐI ƯU HOÁ NGUYÊN TỐ O(√n)) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-purple-400 font-bold">
              {isVi ? 'Vận dụng 3 (SGK Trang 155)' : 'Application 3 (Page 155)'}
            </span>
            <h3 className="text-base md:text-lg font-bold text-white mt-1">
              {isVi
                ? 'Tối ưu hoá kiểm tra nguyên tố & phân tích thừa số với giới hạn k ≤ √n'
                : 'Prime Factoring Optimization with Trial Division Bound k ≤ √n'}
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono">
            O(√n) vs O(n)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl font-mono text-xs text-slate-300 leading-relaxed">
            <span className="text-slate-500 block mb-2"># Mã nguồn Python tối ưu O(√n):</span>
            <pre className="text-purple-300">
{`# Nếu n là hợp số thì phải có ước k <= sqrt(n)
def phantich_toiuu(n):
    m = n
    k = 2
    NT = []
    while k * k <= m:
        while m % k == 0:
            NT.append(k)
            m = m // k
        k = k + 1
    if m > 1:
        NT.append(m)
    return NT`}
            </pre>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-teal-400 font-bold block mb-2">
                {isVi ? 'Thử nghiệm số nguyên lớn n:' : 'Benchmark with large number n:'}
              </span>
              <div className="flex gap-2 mb-3">
                <input
                  type="number"
                  value={testNum}
                  onChange={(e) => setTestNum(Number(e.target.value))}
                  className="w-36 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:border-teal-500 focus:outline-none"
                />
                <button
                  onClick={handleBenchPrime}
                  className="px-4 py-1.5 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded text-xs transition-all shadow-md shadow-purple-500/20"
                >
                  {isVi ? 'Đo số phép thử' : 'Benchmark'}
                </button>
              </div>
            </div>

            {benchStats && (
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Kết luận:</span>
                  <span className="text-teal-300 font-bold">
                    {benchStats.isPrime ? (isVi ? 'Số nguyên tố!' : 'Prime number!') : (isVi ? 'Hợp số!' : 'Composite number!')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300 font-bold">Thuật toán tối ưu O(√n):</span>
                  <span className="text-emerald-400 font-bold">{benchStats.sqrtSteps} lần lặp</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Thuật toán lặp tuần tự (Bài 31):</span>
                  <span className="text-rose-400 font-bold">{benchStats.naiveSteps} lần lặp</span>
                </div>
              </div>
            )}
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
