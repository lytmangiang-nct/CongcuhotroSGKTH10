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
  Bug,
  ShieldCheck,
  Zap,
  ArrowRight,
  Lock,
  Unlock
} from 'lucide-react';

export const Section30PracticeApply: React.FC = () => {
  const { bilingualMode, navigateToQuiz, isAllSectionsComplete, completedSections, currentLesson } = useBook();
  const isVi = bilingualMode !== 'en';
  const totalSections = currentLesson.sections.length || 4;
  const completedCount = completedSections.length;
  const remainingCount = Math.max(0, totalSections - completedCount);

  // State for Luyện tập 1
  const [lt1Divisor, setLt1Divisor] = useState<number>(0);
  const [lt1Result, setLt1Result] = useState<string | null>(null);
  const [lt1HasGuard, setLt1HasGuard] = useState<boolean>(true);

  // State for Luyện tập 2
  const [lt2ValM, setLt2ValM] = useState<string>('12');
  const [lt2ValN, setLt2ValN] = useState<string>('34');
  const [lt2Mode, setLt2Mode] = useState<'buggy' | 'fixed'>('fixed');

  // State for Vận dụng 1: Insertion sort
  const [vd1Fixed, setVd1Fixed] = useState<boolean>(true);
  const [vd1Output, setVd1Output] = useState<number[] | null>(null);

  // Handle Luyện tập 1 run
  const handleRunLt1 = () => {
    if (!lt1HasGuard) {
      if (lt1Divisor === 0) {
        setLt1Result('Traceback (most recent call last):\n  ZeroDivisionError: division by zero');
      } else {
        setLt1Result(`Kết quả: 100 / ${lt1Divisor} = ${(100 / lt1Divisor).toFixed(2)}`);
      }
    } else {
      if (lt1Divisor === 0) {
        setLt1Result(isVi ? '[Xử lý ngoại lệ an toàn] Lỗi: Số chia phải khác 0! Vui lòng nhập số khác.' : '[Safe Guard Handled] Error: Divisor must be non-zero! Please enter another number.');
      } else {
        setLt1Result(isVi ? `Thành công: 100 / ${lt1Divisor} = ${(100 / lt1Divisor).toFixed(2)}` : `Success: 100 / ${lt1Divisor} = ${(100 / lt1Divisor).toFixed(2)}`);
      }
    }
  };

  // Handle Vận dụng 1
  const handleRunVd1 = () => {
    const rawA = [3, 1, 0, 10, 2];
    if (vd1Fixed) {
      // Sắp xếp chèn đã sửa 2 lỗi: range(len(A)) và while j > 0
      const A = [...rawA];
      for (let i = 1; i < A.length; i++) {
        const val = A[i];
        let j = i;
        while (j > 0 && A[j - 1] > val) {
          A[j] = A[j - 1];
          j--;
        }
        A[j] = val;
      }
      setVd1Output(A);
    } else {
      // Code có lỗi: range(len(A) - 1) và while j > 1
      const A = [...rawA];
      for (let i = 0; i < A.length - 1; i++) {
        const val = A[i];
        let j = i;
        while (j > 1 && A[j - 1] > val) {
          A[j] = A[j - 1];
          j--;
        }
        A[j] = val;
      }
      setVd1Output(A);
    }
  };

  return (
    <div className="space-y-12">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-teal-950/60 border border-emerald-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-mono uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isVi ? 'SGK Trang 148 – Luyện tập & Vận dụng' : 'Textbook Page 148 – Practice & Apply'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isVi ? 'Luyện tập, Vận dụng & Đánh giá năng lực' : 'Practice, Application & Proficiency Quiz'}
          </h2>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Giải quyết các bài toán gỡ lỗi thực tế từ sách giáo khoa: xử lý ngoại lệ ZeroDivisionError, khắc phục lỗi nối chuỗi kiểu dữ liệu, bắt lỗi thuật toán sắp xếp chèn và trả lời câu hỏi kinh điển của khoa học máy tính về giới hạn của bộ test.'
              : 'Solve practical debugging challenges from the textbook: handling ZeroDivisionError exceptions, correcting string concatenation bugs, fixing insertion sort logic bugs, and exploring Dijkstra’s classic limit theorem of software testing.'}
          </p>
        </div>
      </div>

      {/* SECTION 1: LUYỆN TẬP */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-lg border-b border-slate-800 pb-2">
          <BookOpen className="w-5 h-5" />
          <span>{isVi ? 'Phần Luyện tập (SGK Trang 148)' : 'Practice Section (Page 148)'}</span>
        </div>

        {/* BÀI LUYỆN TẬP 1: ZeroDivisionError */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                {isVi ? 'Luyện tập 1' : 'Practice 1'}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white mt-1">
                {isVi ? 'Giải thích mã lỗi ZeroDivisionError và cách xử lý' : 'Explain ZeroDivisionError & How to Prevent It'}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono">
              Runtime Error
            </span>
          </div>

          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            {isVi
              ? 'Mã lỗi ZeroDivisionError xuất hiện khi chương trình thực hiện phép chia (hoặc chia lấy dư %, chia lấy phần nguyên //) cho số 0. Vì phép chia cho 0 không xác định trong toán học, Python lập tức ném ra ngoại lệ dừng chương trình.'
              : 'The ZeroDivisionError occurs when a program attempts to divide (or compute modulo %, integer division //) by zero. Since division by zero is undefined in mathematics, Python halts and throws this runtime exception.'}
          </p>

          <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex flex-wrap items-center gap-4 mb-3">
              <label className="text-xs font-mono text-slate-400">
                {isVi ? 'Thử nghiệm phép tính 100 / b:' : 'Test calculation 100 / b:'}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-300">b =</span>
                <input
                  type="number"
                  value={lt1Divisor}
                  onChange={e => setLt1Divisor(Number(e.target.value))}
                  className="w-20 px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-white font-mono text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  id="guardToggle"
                  checked={lt1HasGuard}
                  onChange={e => setLt1HasGuard(e.target.checked)}
                  className="rounded bg-slate-900 border-slate-700 text-teal-500 focus:ring-0"
                />
                <label htmlFor="guardToggle" className="text-slate-300 cursor-pointer">
                  {isVi ? 'Kích hoạt rào chắn if b != 0 (Cách khắc phục)' : 'Enable if b != 0 guard (Prevention)'}
                </label>
              </div>
              <button
                onClick={handleRunLt1}
                className="px-3.5 py-1 bg-teal-500 text-slate-950 font-bold rounded text-xs hover:bg-teal-400 transition-all"
              >
                {isVi ? 'Chạy thử' : 'Test Run'}
              </button>
            </div>

            {lt1Result && (
              <div
                className={`p-3 rounded-lg text-xs font-mono whitespace-pre-line border ${
                  lt1Result.includes('ZeroDivisionError')
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                }`}
              >
                {lt1Result}
              </div>
            )}
          </div>
        </div>

        {/* BÀI LUYỆN TẬP 2: input() Ghép xâu */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                {isVi ? 'Luyện tập 2' : 'Practice 2'}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white mt-1">
                {isVi ? 'Chẩn đoán và sửa lỗi chương trình cộng hai số' : 'Diagnose & Fix the Two-Number Addition Program'}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-mono">
              Semantic Bug
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <p className="text-xs text-slate-400 mb-2 font-mono">{isVi ? 'Đoạn code trong đề bài:' : 'Code in the textbook:'}</p>
              <pre className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs font-mono text-slate-300 leading-relaxed">
{`# Đoạn mã có lỗi logic
m = input("Nhập số thứ nhất: ")
n = input("Nhập số thứ hai: ")
print(m + n)`}
              </pre>
              <div className="mt-3 p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300">
                <span className="font-bold">{isVi ? 'Nguyên nhân lỗi:' : 'Bug Cause:'}</span>{' '}
                {isVi
                  ? 'Hàm input() luôn trả về dữ liệu kiểu xâu kí tự (str). Do đó toán tử + giữa hai xâu sẽ thực hiện phép NỐI CHUỖI ("12" + "34" -> "1234") chứ không phải cộng hai số học (12 + 34 = 46).'
                  : 'input() always returns string type (str). Hence + concatenates two strings ("12" + "34" -> "1234") instead of numerical addition (12 + 34 = 46).'}
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-teal-400 font-bold block mb-3">
                  {isVi ? 'Thử nghiệm trực tiếp:' : 'Live Sandbox:'}
                </span>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Nhập m:</label>
                    <input
                      type="text"
                      value={lt2ValM}
                      onChange={e => setLt2ValM(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Nhập n:</label>
                    <input
                      type="text"
                      value={lt2ValN}
                      onChange={e => setLt2ValN(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono focus:border-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setLt2Mode('buggy')}
                    className={`flex-1 py-1 rounded text-xs font-mono transition-all ${
                      lt2Mode === 'buggy'
                        ? 'bg-rose-500 text-white font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {isVi ? 'Code gốc (Lỗi)' : 'Original (Buggy)'}
                  </button>
                  <button
                    onClick={() => setLt2Mode('fixed')}
                    className={`flex-1 py-1 rounded text-xs font-mono transition-all ${
                      lt2Mode === 'fixed'
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {isVi ? 'Đã sửa int()' : 'Fixed with int()'}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 block mb-1">Output màn hình:</span>
                {lt2Mode === 'buggy' ? (
                  <span className="text-rose-400 font-bold">
                    &gt;&gt;&gt; print(m + n) ➔ &quot;{lt2ValM}{lt2ValN}&quot; (Nối chuỗi)
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold">
                    &gt;&gt;&gt; print(int(m) + int(n)) ➔ {(Number(lt2ValM) || 0) + (Number(lt2ValN) || 0)} (Cộng số)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: VẬN DỤNG */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-lg border-b border-slate-800 pb-2">
          <Zap className="w-5 h-5" />
          <span>{isVi ? 'Phần Vận dụng (SGK Trang 148)' : 'Application Section (Page 148)'}</span>
        </div>

        {/* VẬN DỤNG 1: SẮP XẾP CHÈN INSERTION SORT */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                {isVi ? 'Vận dụng 1' : 'Application 1'}
              </span>
              <h3 className="text-base md:text-lg font-bold text-white mt-1">
                {isVi
                  ? 'Phát hiện và sửa 2 lỗi trong chương trình sắp xếp chèn'
                  : 'Detect and Fix 2 Bugs in Insertion Sort'}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-mono">
              Algorithm Debugging
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs">
              <div className="text-slate-400 font-bold pb-2 mb-2 border-b border-slate-800 flex justify-between">
                <span>insertion_sort.py (Mã nguồn đề bài)</span>
                <span className="text-rose-400">2 Lỗi tiềm ẩn</span>
              </div>
              <pre className="text-slate-300 leading-relaxed">
{`A = [3, 1, 0, 10, 2]
# [LỖI 1]: range(len(A)-1) chỉ chạy đến len(A)-2, bỏ sót phần tử cuối!
for i in range(len(A) - 1):
    value = A[i]
    j = i
    # [LỖI 2]: j > 1 bỏ qua vị trí đầu tiên tại chỉ số 0!
    while j > 1 and A[j - 1] > value:
        A[j] = A[j - 1]
        j = j - 1
    A[j] = value
print(A)`}
              </pre>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-bold text-teal-300 mb-2">
                  {isVi ? 'Chi tiết 2 lỗi và cách sửa chuẩn SGK:' : 'Bug Breakdown and Verified Fix:'}
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-rose-400 font-bold font-mono">Lỗi 1:</span>{' '}
                    <code className="text-teal-300">range(len(A)-1)</code> khiến vòng lặp dừng trước khi duyệt đến phần tử cuối cùng của mảng. Cần sửa thành{' '}
                    <code className="text-emerald-300 font-bold">range(len(A))</code> hoặc bắt đầu từ chỉ số 1 <code className="text-emerald-300 font-bold">range(1, len(A))</code>.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-rose-400 font-bold font-mono">Lỗi 2:</span>{' '}
                    <code className="text-teal-300">while j &gt; 1</code> làm vòng lặp dừng khi j = 1, khiến phần tử nhỏ nhất không thể chèn về vị trí đầu tiên (chỉ số 0). Cần sửa thành{' '}
                    <code className="text-emerald-300 font-bold">while j &gt; 0</code>.
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setVd1Fixed(!vd1Fixed);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                      vd1Fixed ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-rose-500 text-white font-bold'
                    }`}
                  >
                    {vd1Fixed ? (isVi ? 'Đang dùng code ĐÃ SỬA' : 'Using FIXED Code') : (isVi ? 'Đang dùng code CÓ LỖI' : 'Using BUGGY Code')}
                  </button>
                  <button
                    onClick={handleRunVd1}
                    className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded text-xs transition-all"
                  >
                    {isVi ? 'Chạy thử nghiệm' : 'Execute Run'}
                  </button>
                </div>

                {vd1Output && (
                  <div className="mt-3 p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs">
                    <span className="text-slate-400">{isVi ? 'Mảng xuất ra:' : 'Output array:'} </span>
                    <span className={vd1Fixed ? 'text-emerald-300 font-bold' : 'text-rose-300 font-bold'}>
                      [{vd1Output.join(', ')}]
                    </span>
                    <span className="text-slate-500 ml-2">
                      {vd1Fixed ? (isVi ? '(Sắp xếp tăng dần chính xác)' : '(Correctly sorted)') : (isVi ? '(Lỗi: Chưa sắp xếp đúng)' : '(Incorrectly sorted)')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* VẬN DỤNG 2: NGUYÊN LÝ DIJKSTRA */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-indigo-400 font-bold">
                {isVi ? 'Vận dụng 2 – Câu hỏi lý luận máy tính' : 'Application 2 – Computer Science Axiom'}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {isVi
                  ? 'Việc kiểm thử bằng các bộ test có bảo đảm tìm ra hết lỗi không? Vì sao?'
                  : 'Does testing with test cases guarantee finding ALL bugs? Why?'}
              </h3>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {isVi ? (
                  <>
                    <strong className="text-rose-400">Trả lời: KHÔNG.</strong> Việc kiểm thử bằng các bộ test{' '}
                    <strong className="text-white">không thể bảo đảm 100% tìm ra hết mọi lỗi</strong> trong chương trình.
                  </>
                ) : (
                  <>
                    <strong className="text-rose-400">Answer: NO.</strong> Testing with test cases{' '}
                    <strong className="text-white">can never guarantee finding all bugs</strong> in a program.
                  </>
                )}
              </p>

              <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed font-sans space-y-2">
                <div className="italic text-indigo-300 font-mono">
                  &ldquo;Program testing can be used to show the presence of bugs, but never to show their absence!&rdquo;
                  <span className="block text-right text-slate-400 mt-1">— Edsger W. Dijkstra (Turing Award, 1972)</span>
                </div>
                <p>
                  {isVi
                    ? '1. Không gian dữ liệu đầu vào thường là vô hạn hoặc tổ hợp quá lớn: Không thể chạy thử toàn bộ mọi giá trị có thể có.'
                    : '1. Input space is often infinite or combinatorially huge: Impossible to exhaustively test all potential inputs.'}
                </p>
                <p>
                  {isVi
                    ? '2. Bộ test chỉ kiểm tra trên một số hữu hạn các điểm dữ liệu: Nếu lỗi chỉ xảy ra ở một điều kiện ngoại lệ hiếm gặp ngoài các bộ test, lỗi vẫn nằm ẩn mình trong code.'
                    : '2. Test suites only check a finite subset of points: If a defect manifests only under rare fringe conditions outside tests, the bug remains dormant.'}
                </p>
                <p className="text-emerald-400 font-medium">
                  {isVi
                    ? '➔ Do đó, cần kết hợp kiểm thử thông minh (test biên, test ngẫu nhiên) cùng với phân tích logic mã nguồn và công cụ gỡ lỗi (debugger).'
                    : '➔ Therefore, smart testing (boundary, randomized) must be combined with source code static analysis and debugger instrumentation.'}
                </p>
              </div>
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
