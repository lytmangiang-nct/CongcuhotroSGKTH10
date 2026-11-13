import React, { useState, useEffect } from 'react';
import { useBook } from '../../context/BookContext';
import {
  Award,
  Play,
  CheckCircle,
  AlertTriangle,
  Code,
  Sparkles,
  Terminal,
  Bug,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Flame,
  BookOpen
} from 'lucide-react';

export const Section29PracticeApply: React.FC = () => {
  const { bilingualMode, navigateToQuiz, completeSectionTasks, isAllSectionsComplete } = useBook();
  const isEn = bilingualMode === 'en';

  // Mark task completion for section 5 (index 4) on load
  useEffect(() => {
    completeSectionTasks(29, 4);
  }, [completeSectionTasks]);

  // Luyện tập 1: Đoạn 1 (IndexError) & Đoạn 2 (TypeError)
  const [lt1Output, setLt1Output] = useState<{ part1?: string; part2?: string }>({});

  const runLt1Part1 = () => {
    setLt1Output(prev => ({
      ...prev,
      part1: isEn
        ? `A = [1, 3, 5, 10, 0] (len(A) = 5, valid indices: 0, 1, 2, 3, 4)
for k in range(1, 6):
  k = 1 -> A[1] = 3
  k = 2 -> A[2] = 5
  k = 3 -> A[3] = 10
  k = 4 -> A[4] = 0
  k = 5 -> A[5] -> EXCEEDS BOUNDS!
Traceback (most recent call last):
IndexError: list index out of range`
        : `A = [1, 3, 5, 10, 0] (len(A) = 5, chỉ số hợp lệ: 0, 1, 2, 3, 4)
for k in range(1, 6):
  k = 1 -> A[1] = 3
  k = 2 -> A[2] = 5
  k = 3 -> A[3] = 10
  k = 4 -> A[4] = 0
  k = 5 -> A[5] -> VƯỢT QUÁ CHỈ SỐ!
Traceback (most recent call last):
IndexError: list index out of range`
    }));
  };

  const runLt1Part2 = () => {
    setLt1Output(prev => ({
      ...prev,
      part2: isEn
        ? `s1 = "101010" (type str)
s2 = 1010101  (type int)
s = s1 + s2
Traceback (most recent call last):
TypeError: can only concatenate str (not "int") to str
(Python does not implicitly cast between str and int with the + operator)`
        : `s1 = "101010" (kiểu str)
s2 = 1010101  (kiểu int)
s = s1 + s2
Traceback (most recent call last):
TypeError: can only concatenate str (not "int") to str
(Python không tự động ép kiểu giữa chuỗi và số nguyên khi dùng toán tử +)`
    }));
  };

  // Luyện tập 2: sum(A) / len(A)
  const [lt2ListInput, setLt2ListInput] = useState<string>('[]');
  const [lt2Result, setLt2Result] = useState<string | null>(null);

  const testLt2 = (customVal?: string) => {
    const val = customVal !== undefined ? customVal : lt2ListInput.trim();
    if (val === '[]' || val === '') {
      setLt2Result(isEn
        ? `len(A) = 0
average = sum([]) / len([]) = 0 / 0
Traceback (most recent call last):
ZeroDivisionError: division by zero
(Root cause: List A is empty, so len(A) == 0)`
        : `len(A) = 0
gttb = sum([]) / len([]) = 0 / 0
Traceback (most recent call last):
ZeroDivisionError: division by zero
(Nguyên nhân: Danh sách A rỗng khiến len(A) = 0)`);
    } else if (val.includes("'") || val.includes('"') || val.includes('a') || val.includes('text')) {
      setLt2Result(isEn
        ? `A = ${val}
sum(A) attempts to add string elements with initial 0
Traceback (most recent call last):
TypeError: unsupported operand type(s) for +: 'int' and 'str'
(Root cause: List A contains non-numeric elements)`
        : `A = ${val}
sum(A) cố gắng cộng các phần tử xâu với số 0 khởi tạo
Traceback (most recent call last):
TypeError: unsupported operand type(s) for +: 'int' and 'str'
(Nguyên nhân: Danh sách A chứa phần tử không phải số)`);
    } else if (val.toLowerCase().includes('chuadefin') || val.toLowerCase().includes('none')) {
      setLt2Result(isEn
        ? `Variable A is uninitialized
Traceback (most recent call last):
NameError: name 'A' is not defined`
        : `Chưa khai báo biến A
Traceback (most recent call last):
NameError: name 'A' is not defined`);
    } else {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sum = parsed.reduce((a: number, b: number) => a + b, 0);
          const avg = sum / parsed.length;
          setLt2Result(isEn
            ? `A = [${parsed.join(', ')}]
sum(A) = ${sum}, len(A) = ${parsed.length}
average = ${avg.toFixed(2)} (Executed safely without exceptions!)`
            : `A = [${parsed.join(', ')}]
sum(A) = ${sum}, len(A) = ${parsed.length}
gttb = ${avg.toFixed(2)} (Thực thi an toàn!)`);
        } else {
          setLt2Result(isEn ? `Empty list: ZeroDivisionError: division by zero` : `Danh sách rỗng: ZeroDivisionError: division by zero`);
        }
      } catch {
        setLt2Result(isEn ? `Input is not valid JSON list notation.` : `Dữ liệu nhập không chuẩn JSON danh sách.`);
      }
    }
  };

  // Vận dụng 1: Ước số thực sự của n
  const [vd1N, setVd1N] = useState<string>('12');
  const [vd1Result, setVd1Result] = useState<{
    status: 'success' | 'error';
    uocList?: number[];
    traceback?: string;
    explanation: string;
  } | null>(null);

  const runVd1 = () => {
    const raw = vd1N.trim();
    const num = Number(raw);

    if (isNaN(num) || !Number.isInteger(num) || raw.includes('.')) {
      setVd1Result({
        status: 'error',
        traceback: `Traceback (most recent call last):
  File "uoc_so.py", line 1, in <module>
    n = int(input("Nhập số tự nhiên n: "))
ValueError: invalid literal for int() with base 10: '${raw}'`,
        explanation: isEn
          ? `ValueError: Input n = '${raw}' cannot be converted to integer.`
          : `Lỗi ValueError: Giá trị n = '${raw}' không phải là số nguyên.`
      });
      return;
    }

    if (num <= 0) {
      setVd1Result({
        status: 'error',
        traceback: isEn
          ? `Warning: n = ${num} is not a positive natural number (n > 0). Cannot compute proper divisors.`
          : `Cảnh báo: n = ${num} không phải số tự nhiên dương (n > 0).\nKhông thể tìm các ước thực sự nhỏ hơn n.`,
        explanation: isEn
          ? 'Logic / Semantic Warning: Natural numbers must satisfy n >= 1.'
          : 'Lỗi Ngữ nghĩa / Lôgic: Số tự nhiên tìm ước cần thoả mãn n >= 1.'
      });
      return;
    }

    const uocList: number[] = [];
    for (let i = 1; i < num; i++) {
      if (num % i === 0) {
        uocList.push(i);
      }
    }

    setVd1Result({
      status: 'success',
      uocList,
      explanation: isEn
        ? `Success! Proper divisors of ${num} (including 1 and strictly less than ${num}): [${uocList.join(', ')}]. Total count: ${uocList.length}.`
        : `Thành công! Các ước số thực sự của ${num} (tính cả 1 và không tính ${num}) là: [${uocList.join(', ')}]. Tổng số ước: ${uocList.length}.`
    });
  };

  // Vận dụng 2: Sinh mã lỗi NameError
  const [vd2Code, setVd2Code] = useState<string>('print(diem_tong_ket)');
  const [vd2Output, setVd2Output] = useState<string | null>(null);

  const runVd2 = () => {
    setVd2Output(isEn
      ? `Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'diem_tong_ket' is not defined
(Textbook Insight: Python interpreter searched local/global symbol tables but variable 'diem_tong_ket' was never bound prior to this call)`
      : `Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'diem_tong_ket' is not defined
(Giải thích SGK: Trình thông dịch tìm biến 'diem_tong_ket' trong bảng ký hiệu nhưng biến chưa từng được gán giá trị trước đó)`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-red-950 via-rose-900 to-slate-950 p-6 md:p-8 text-white border border-rose-500/30 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          {isEn ? 'Section 4: Practice & Application' : 'Phần 4: Luyện tập – Vận dụng – Đánh giá'}
        </div>
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">
          {isEn ? 'Exercises, Real-world Debugging & Verification' : 'Luyện Tập, Vận Dụng & Đánh Giá Năng Lực'}
        </h2>
        <p className="mt-2 text-rose-200 max-w-3xl text-xs md:text-sm leading-relaxed">
          {isEn
            ? 'Apply complete error diagnostic knowledge: Exercise 1-2 and Application 1-2 according to SGK Page 144, and open the 10-question mastery quiz on the navigation bar to earn your digital certificate.'
            : 'Vận dụng toàn diện kĩ năng phân tích lỗi: Luyện tập 1-2, Vận dụng 1-2 theo chuẩn SGK Trang 144, và truy cập bài trắc nghiệm 10 câu trên thanh điều hướng để nhận chứng chỉ danh dự số.'}
        </p>
      </div>

      {/* Luyện tập 1: Phân tích 2 đoạn mã sinh lỗi */}
      <section className="bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold">
            LT1
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {isEn ? 'Exercise 1: Predict Exception Codes for 2 Code Blocks' : 'Luyện tập 1: Dự đoán khả năng sinh lỗi của hai đoạn mã'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Textbook Informatics 10, Page 144' : 'SGK Tin học 10, Trang 144'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Đoạn 1 */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-rose-400">
                {isEn ? 'Snippet 1: range(1, len(A)+1)' : 'Đoạn mã 1: range(1, len(A)+1)'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-300 border border-rose-500/40 font-bold">
                IndexError
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-xs font-mono text-emerald-300 border border-slate-800">
              <pre>{`A = [1, 3, 5, 10, 0]
for k in range(1, len(A)+1):
    print(A[k])`}</pre>
            </div>

            <button
              onClick={runLt1Part1}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isEn ? 'Simulate Snippet 1' : 'Chạy thử Đoạn 1'}
            </button>

            {lt1Output.part1 && (
              <pre className="p-3 rounded-xl bg-slate-900 border border-rose-500/40 text-xs font-mono text-rose-300 whitespace-pre-wrap">
                {lt1Output.part1}
              </pre>
            )}
          </div>

          {/* Đoạn 2 */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-400">
                {isEn ? 'Snippet 2: s = s1 + s2' : 'Đoạn mã 2: s = s1 + s2'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">
                TypeError
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-xs font-mono text-emerald-300 border border-slate-800">
              <pre>{`s1 = "101010"
s2 = 1010101
s = s1 + s2`}</pre>
            </div>

            <button
              onClick={runLt1Part2}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isEn ? 'Simulate Snippet 2' : 'Chạy thử Đoạn 2'}
            </button>

            {lt1Output.part2 && (
              <pre className="p-3 rounded-xl bg-slate-900 border border-amber-500/40 text-xs font-mono text-amber-300 whitespace-pre-wrap">
                {lt1Output.part2}
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* Luyện tập 2: sum(A) / len(A) */}
      <section className="bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
            LT2
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {isEn ? 'Exercise 2: Stress-Testing List Average sum(A) / len(A)' : 'Luyện tập 2: Phân tích các trường hợp ngoại lệ với sum(A) / len(A)'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Textbook Informatics 10, Page 144' : 'SGK Tin học 10, Trang 144'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-500/30 text-xs md:text-sm text-slate-300">
          <p className="font-semibold text-amber-300 mb-1">
            {isEn ? 'Textbook Task:' : 'Đề bài SGK:'}
          </p>
          <p>
            {isEn
              ? 'Given command gttb = sum(A) / len(A) to compute average value of list A. When will this statement trigger runtime errors, and what are those exception codes?'
              : 'Để tính giá trị trung bình của danh sách A các số thực, ta dùng lệnh gttb = sum(A) / len(A). Lệnh này có thể sinh những lỗi gì?'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => { setLt2ListInput('[]'); testLt2('[]'); }}
              className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/40 font-mono cursor-pointer"
            >
              {isEn ? 'Case 1: A = [] ➔ ZeroDivisionError' : 'Tình huống 1: A = [] ➔ ZeroDivisionError'}
            </button>
            <button
              onClick={() => { setLt2ListInput('["1", "2"]'); testLt2('["1", "2"]'); }}
              className="px-3 py-1.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 text-amber-200 border border-amber-500/40 font-mono cursor-pointer"
            >
              {isEn ? 'Case 2: A = ["1", "2"] ➔ TypeError' : 'Tình huống 2: A = ["1", "2"] ➔ TypeError'}
            </button>
            <button
              onClick={() => { setLt2ListInput('None'); testLt2('None'); }}
              className="px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/40 font-mono cursor-pointer"
            >
              {isEn ? 'Case 3: A not defined ➔ NameError' : 'Tình huống 3: Chưa có A ➔ NameError'}
            </button>
            <button
              onClick={() => { setLt2ListInput('[10, 8.5, 9]'); testLt2('[10, 8.5, 9]'); }}
              className="px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/40 font-mono cursor-pointer"
            >
              {isEn ? 'Case 4: A = [10, 8.5, 9] ➔ Normal' : 'Tình huống 4: A = [10, 8.5, 9] ➔ Hợp lệ'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isEn ? 'Custom input for list A:' : 'Tự nhập danh sách A:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={lt2ListInput}
                  onChange={e => setLt2ListInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
                  placeholder="[1, 2, 3] or []"
                />
                <button
                  onClick={() => testLt2()}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  {isEn ? 'Evaluate' : 'Kiểm tra'}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs min-h-[90px] flex items-center">
              {lt2Result ? (
                <pre className="whitespace-pre-wrap text-slate-200">{lt2Result}</pre>
              ) : (
                <span className="text-slate-500 italic">
                  {isEn ? 'Choose a preset above or enter a list to inspect exception behavior...' : 'Chọn 1 trong các tình huống mẫu hoặc nhập danh sách...'}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Vận dụng 1: Ước số thực sự */}
      <section className="bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
            VD1
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {isEn ? 'Application 1: Proper Divisors & Exception Traps' : 'Vận dụng 1: Tìm ước thực sự và bẫy lỗi nhập số tự nhiên'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Textbook Informatics 10, Page 144' : 'SGK Tin học 10, Trang 144'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-cyan-950/40 rounded-2xl border border-cyan-500/30 text-xs md:text-sm text-slate-300">
          <p className="font-semibold text-cyan-300 mb-1">
            {isEn ? 'Textbook Task:' : 'Đề bài SGK:'}
          </p>
          <p>
            {isEn
              ? 'Write a program finding all proper divisors of natural number n (divisors including 1 and strictly less than n). Anticipate input errors when user supplies decimals, negative numbers, or strings.'
              : 'Viết chương trình nhập số tự nhiên n và in ra tất cả các ước số thực sự của n (các ước số kể cả 1 và nhỏ hơn n). Dự đoán các lỗi người dùng có thể nhập như số thập phân, chuỗi chữ hay số âm.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="bg-slate-950 rounded-2xl p-4 text-cyan-300 font-mono text-xs border border-slate-800">
              <pre>{`n = int(input("Nhập số tự nhiên n: "))
uoc_thuc_su = []
for i in range(1, n):
    if n % i == 0:
        uoc_thuc_su.append(i)
print("Ước thực sự của", n, "là:", uoc_thuc_su)`}</pre>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  {isEn ? 'Input n to test:' : 'Nhập giá trị n để kiểm thử:'}
                </label>
                <div className="flex gap-2 text-[11px] font-mono">
                  <button
                    onClick={() => { setVd1N('abc'); }}
                    className="text-rose-400 hover:text-rose-300 underline cursor-pointer"
                  >
                    n='abc'
                  </button>
                  <button
                    onClick={() => { setVd1N('3.14'); }}
                    className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
                  >
                    n=3.14
                  </button>
                  <button
                    onClick={() => { setVd1N('12'); }}
                    className="text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                  >
                    n=12
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={vd1N}
                onChange={e => setVd1N(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
              />
            </div>

            <button
              onClick={runVd1}
              className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              {isEn ? 'Execute & Validate' : 'Chạy thử & Bẫy lỗi'}
            </button>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 min-h-[190px]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {isEn ? 'Execution Result / Traceback:' : 'Kết quả thực thi / Dấu vết lỗi:'}
            </h4>
            {vd1Result ? (
              <div className="space-y-3">
                {vd1Result.status === 'success' ? (
                  <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-500/40 text-emerald-200 text-xs font-mono">
                    <div className="font-bold mb-1 text-sm">{vd1Result.explanation}</div>
                    <div>Các ước: [{vd1Result.uocList?.join(', ')}]</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <pre className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono whitespace-pre-wrap">
                      {vd1Result.traceback}
                    </pre>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300">
                      💡 {vd1Result.explanation}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                {isEn ? 'Enter n and click execute...' : 'Nhập n và bấm chạy thử...'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Vận dụng 2: Sinh mã lỗi NameError */}
      <section className="bg-slate-900/90 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
            VD2
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">
              {isEn ? 'Application 2: Unbound Variable & NameError Reproduction' : 'Vận dụng 2: Tái hiện cơ chế phát sinh ngoại lệ NameError'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Textbook Informatics 10, Page 144' : 'SGK Tin học 10, Trang 144'}
            </p>
          </div>
        </div>

        <div className="p-4 bg-purple-950/40 rounded-2xl border border-purple-500/30 text-xs md:text-sm text-slate-300">
          <p className="font-semibold text-purple-300 mb-1">
            {isEn ? 'Textbook Task:' : 'Đề bài SGK:'}
          </p>
          <p>
            {isEn
              ? 'Write a short Python command triggering NameError. Explain why the interpreter reports this exception.'
              : 'Hãy viết một đoạn lệnh ngắn sinh lỗi NameError. Giải thích nguyên nhân vì sao trình thông dịch phát sinh lỗi này.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isEn ? 'Python code referencing undefined variable:' : 'Dòng lệnh Python tham chiếu biến chưa định nghĩa:'}
              </label>
              <input
                type="text"
                value={vd2Code}
                onChange={e => setVd2Code(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono"
              />
            </div>

            <button
              onClick={runVd2}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors shadow-md"
            >
              <Terminal className="w-4 h-4" />
              {isEn ? 'Execute in Python Console' : 'Chạy trên Console'}
            </button>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 min-h-[140px]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Bug className="w-4 h-4 text-purple-400" />
              {isEn ? 'Python Console Traceback:' : 'Dấu vết lỗi Traceback:'}
            </h4>
            {vd2Output ? (
              <pre className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs font-mono text-purple-300 whitespace-pre-wrap">
                {vd2Output}
              </pre>
            ) : (
              <p className="text-xs text-slate-500 italic">
                {isEn ? 'Click Execute to trigger NameError traceback...' : 'Bấm chạy để xem console mô phỏng...'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* QUIZ GUIDANCE CARD: Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-rose-950/80 via-red-950/60 to-slate-900 border-2 border-rose-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {isEn
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Toàn Bài 29 (10 Câu) & Nhận Chứng Chỉ'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz on identifying program errors and earn your verified Certificate for Lesson 29, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK về nhận biết lỗi chương trình và nhận Giấy chứng nhận hoàn thành Bài 29, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={navigateToQuiz}
          className="px-5 py-2.5 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>{isEn ? 'Open Quiz on Nav Bar →' : 'Mở Trắc Nghiệm Trên Thanh Điều Hướng →'}</span>
        </button>
      </div>
    </div>
  );
};
