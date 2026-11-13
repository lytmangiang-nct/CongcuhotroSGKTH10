import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  Bug,
  AlertTriangle,
  Terminal,
  CheckCircle,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
  Flame,
  FileCode,
  Layers
} from 'lucide-react';

export const Section29ErrorClassification: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // State for Interactive Case Study
  const [activeCase, setActiveCase] = useState<number>(1);
  const [caseOutput, setCaseOutput] = useState<string | null>(null);

  // Câu hỏi củng cố 1 & 2
  const [ans1, setAns1] = useState<string | null>(null);
  const [ans2, setAns2] = useState<string | null>(null);

  const cases = [
    {
      id: 1,
      titleVi: 'Trường hợp 1: Viết sai cú pháp câu lệnh (SyntaxError)',
      titleEn: 'Case 1: Grammatical Syntax Error (SyntaxError)',
      badgeVi: 'Lỗi Cú Pháp',
      badgeEn: 'Syntax Error',
      color: 'rose',
      code: `>>> while True print("Hello")
SyntaxError: invalid syntax`,
      explanationVi: 'Lập trình viên quên dấu hai chấm ":" sau điều kiện while True và không xuống dòng lùi lề khối lệnh. Trình thông dịch phát hiện ngay trong giai đoạn dịch ngữ pháp và từ chối chạy chương trình.',
      explanationEn: 'The programmer omitted the colon ":" after `while True` and missed statement block indentation. Python halts parsing immediately.',
      simulatedOutput: `  File "<stdin>", line 1
    while True print("Hello")
               ^^^^^
SyntaxError: invalid syntax`
    },
    {
      id: 2,
      titleVi: 'Trường hợp 2: Dữ liệu nhập sai khuôn dạng (ValueError)',
      titleEn: 'Case 2: Invalid Input Format (ValueError)',
      badgeVi: 'Lỗi Ngoại Lệ (Runtime)',
      badgeEn: 'Runtime Exception',
      color: 'amber',
      code: `>>> n = int(input("Nhập số nguyên n: "))
Nhập số nguyên n: 1.5
Traceback (most recent call last):
  File "<pyshell#0>", line 1, in <module>
    n = int(input("Nhập số nguyên n: "))
ValueError: invalid literal for int() with base 10: '1.5'`,
      explanationVi: 'Hàm int() mong đợi một xâu chỉ gồm các chữ số nguyên. Khi người dùng nhập "1.5" (có dấu chấm thập phân), hàm int() không thể chuyển đổi được nên ném ra ngoại lệ ValueError.',
      explanationEn: 'The int() function expects pure integer digits. When the user enters "1.5", casting fails, throwing a ValueError.',
      simulatedOutput: `Nhập số nguyên n: 1.5
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid literal for int() with base 10: '1.5'`
    },
    {
      id: 3,
      titleVi: 'Trường hợp 3: Chỉ số mảng vượt giới hạn (IndexError)',
      titleEn: 'Case 3: List Index Out of Bounds (IndexError)',
      badgeVi: 'Lỗi Ngoại Lệ (Runtime)',
      badgeEn: 'Runtime Exception',
      color: 'amber',
      code: `Array_b1.py
A = [1, 3, 10, 0]
for i in range(5):
    print(A[i], end = " ")`,
      explanationVi: 'Danh sách A chỉ có 4 phần tử (chỉ số 0, 1, 2, 3). Khi vòng lặp chạy đến i = 4, lệnh A[4] cố gắng truy cập phần tử thứ 5 không tồn tại, khiến chương trình dừng đột ngột và báo IndexError.',
      explanationEn: 'List A only contains 4 items (indices 0..3). When i = 4, accessing A[4] overflows the list bounds, triggering IndexError.',
      simulatedOutput: `1 3 10 0 Traceback (most recent call last):
  File "C:\\Python\\Array_b1.py", line 3, in <module>
    print(A[i],end = " ")
IndexError: list index out of range`
    },
    {
      id: 4,
      titleVi: 'Trường hợp 4: Lỗi lôgic thuật toán (Tính sai tổng)',
      titleEn: 'Case 4: Algorithm Logic Flaw (Semantic Error)',
      badgeVi: 'Lỗi Lôgic (Ngữ Nghĩa)',
      badgeEn: 'Logic / Semantic Error',
      color: 'purple',
      code: `# Tính tổng ba số nguyên dương đầu tiên
>>> s = 0
>>> for i in range(3):
        s = s + i
>>> print(s)
3`,
      explanationVi: 'Yêu cầu tính tổng 3 số nguyên dương đầu tiên là 1 + 2 + 3 = 6. Nhưng do viết `range(3)` nên biến i nhận các giá trị 0, 1, 2 -> s = 0 + 1 + 2 = 3. Chương trình chạy rất mượt, không hề có lỗi ngoại lệ, nhưng kết quả hoàn toàn sai!',
      explanationEn: 'The problem asked for the sum of the first 3 positive integers: 1 + 2 + 3 = 6. However, range(3) yields [0, 1, 2], giving s = 3. No exceptions are raised, yet the computation is semantically wrong.',
      simulatedOutput: `Chương trình chạy hoàn tất:
s = 3
(Kết quả mong muốn: 1 + 2 + 3 = 6. Sai lệch: -3 do range(3) sinh 0, 1, 2 thay vì 1, 2, 3)`
    }
  ];

  const currentCaseData = cases.find(c => c.id === activeCase) || cases[0];

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <Bug className="w-4 h-4" />
          {isVi ? 'Mục 1 • SGK Trang 141 – 142' : 'Part 1 • Textbook Pages 141 – 142'}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          {isVi ? '1. Nhận biết và Phân loại lỗi chương trình' : '1. Identifying and Classifying Program Errors'}
        </h2>
        <p className="mt-2 text-rose-100 max-w-3xl text-sm md:text-base leading-relaxed">
          {isVi
            ? 'Khảo sát 4 trường hợp kinh điển trong thực tế lập trình để phân biệt rành mạch: Lỗi cú pháp (SyntaxError), Lỗi ngoại lệ thời gian chạy (Runtime Exception), và Lỗi lôgic ngữ nghĩa.'
            : 'Explore 4 canonical programming scenarios to sharply differentiate Syntax Errors, Runtime Exceptions, and Algorithm Logic Flaws.'}
        </p>
      </div>

      {/* Hoạt động 1: 4 Trường hợp SGK */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold">
            HĐ1
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {isVi ? 'Hoạt động 1: Nhận biết và phân biệt một số loại lỗi chương trình' : 'Activity 1: Recognizing and Differentiating Program Errors'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'Quan sát 4 trường hợp gặp lỗi dưới đây để phân loại' : 'Examine the 4 textbook case studies'}
            </p>
          </div>
        </div>

        {/* Case Study Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          {cases.map((cs) => {
            const isSel = activeCase === cs.id;
            return (
              <button
                key={cs.id}
                onClick={() => {
                  setActiveCase(cs.id);
                  setCaseOutput(null);
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSel
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200 font-bold shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>Trường hợp {cs.id}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                    cs.id === 1 ? 'bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200' :
                    cs.id === 4 ? 'bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                    'bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200'
                  }`}>
                    {isVi ? cs.badgeVi : cs.badgeEn}
                  </span>
                </div>
                <div className="text-xs truncate font-mono">
                  {cs.id === 1 && 'while True print()'}
                  {cs.id === 2 && 'int("1.5")'}
                  {cs.id === 3 && 'A[range(5)] (len=4)'}
                  {cs.id === 4 && 'range(3) tính tổng'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Case Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 rounded-xl text-xs font-mono text-slate-100 border border-slate-800 overflow-x-auto shadow-inner">
              <div className="text-slate-500 mb-2 flex items-center justify-between">
                <span># Mã nguồn theo SGK Trang 141 – 142</span>
                <span className="text-rose-400 font-semibold">{isVi ? currentCaseData.badgeVi : currentCaseData.badgeEn}</span>
              </div>
              <pre className="text-emerald-400">{currentCaseData.code}</pre>
            </div>

            <div className="p-4 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-rose-900 dark:text-rose-300 block mb-1">
                {isVi ? 'Phân tích bản chất lỗi:' : 'Root Cause Analysis:'}
              </span>
              {isVi ? currentCaseData.explanationVi : currentCaseData.explanationEn}
            </div>

            <button
              onClick={() => setCaseOutput(currentCaseData.simulatedOutput)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Play className="w-4 h-4" />
              {isVi ? 'Chạy mô phỏng thông báo lỗi' : 'Simulate Terminal Traceback'}
            </button>
          </div>

          {/* Terminal Output */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs min-h-[220px] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-rose-400" />
                  Python 3.11 Interactive Shell
                </span>
                <span className="text-[10px] text-slate-500">pyshell#29</span>
              </div>

              {caseOutput ? (
                <pre className="text-rose-400 whitespace-pre-wrap leading-relaxed animate-in fade-in duration-150">
                  {caseOutput}
                </pre>
              ) : (
                <div className="text-slate-500 italic py-8 text-center">
                  {isVi ? 'Nhấn "Chạy mô phỏng" để xem thông báo lỗi thực tế...' : 'Click "Simulate" to observe actual runtime traceback...'}
                </div>
              )}
            </div>

            {caseOutput && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Trạng thái: Đã dừng tiến trình</span>
                <button
                  onClick={() => setCaseOutput(null)}
                  className="hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Xoá màn hình
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hộp Ghi Nhớ SGK Trang 142 */}
      <section className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-2xl p-6 md:p-8 border-2 border-amber-400/60 dark:border-amber-600/60 shadow-lg relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500 text-slate-950 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <BilingualText
            vi="HỘP GHI NHỚ • TRANG 142 SGK"
            en="KEY SUMMARY BOX • PAGE 142"
          />
        </div>

        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4">
          <BilingualText
            vi="Ba loại lỗi chương trình chính trong Python"
            en="Three Primary Categories of Program Errors in Python"
          />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className="p-4 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-rose-300 dark:border-rose-800 shadow-sm">
            <div className="flex items-center gap-2 font-black text-rose-600 dark:text-rose-400 text-sm mb-2">
              <span className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center">1</span>
              <BilingualText vi="Lỗi cú pháp (Syntax Error)" en="Syntax Error" />
            </div>
            <div className="text-slate-700 dark:text-slate-300">
              <BilingualText
                vi="Lỗi khi có lệnh viết sai cú pháp hoặc sai cấu trúc ngôn ngữ Python quy định. Chương trình sẽ LẬP TỨC DỪNG LẠI và thông báo lỗi Syntax Error ngay khi nạp mã."
                en="Syntax rule violations. Python immediately stops parsing and issues a Syntax Error without executing any statements."
              />
            </div>
          </div>

          <div className="p-4 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-amber-300 dark:border-amber-800 shadow-sm">
            <div className="flex items-center gap-2 font-black text-amber-600 dark:text-amber-400 text-sm mb-2">
              <span className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">2</span>
              <BilingualText vi="Lỗi ngoại lệ (Exceptions / Runtime)" en="Exceptions / Runtime Error" />
            </div>
            <div className="text-slate-700 dark:text-slate-300">
              <BilingualText
                vi="Lỗi khi không thể thực hiện một lệnh trong chương trình (chia cho 0, ép kiểu sai, mảng vượt chỉ số...). Chương trình DỪNG LẠI và trả về mã lỗi ngoại lệ (Exceptions Error)."
                en="Failure during statement execution (divide by zero, type mismatch, index overflow). The program halts and outputs an Exception error code."
              />
            </div>
          </div>

          <div className="p-4 bg-white/90 dark:bg-slate-900/90 rounded-xl border border-purple-300 dark:border-purple-800 shadow-sm">
            <div className="flex items-center gap-2 font-black text-purple-600 dark:text-purple-400 text-sm mb-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center">3</span>
              <BilingualText vi="Lỗi lôgic (Semantic / Logic Error)" en="Semantic / Logic Error" />
            </div>
            <div className="text-slate-700 dark:text-slate-300">
              <BilingualText
                vi="Chương trình chạy KHÔNG CÓ LỖI ngoại lệ, nhưng kết quả đưa ra SAI, không chính xác so với bài toán. Đây là lỗi nguy hiểm nhất vì Python không thể tự phát hiện."
                en="The program executes seamlessly without crashing, but outputs mathematically or semantically wrong results. Hardest bug to track."
              />
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs text-amber-800 dark:text-amber-300 italic font-medium">
          <BilingualText
            vi="★ Chú ý quan trọng: Với mỗi loại lỗi trên, cách xử lý và kiểm soát lỗi của lập trình viên sẽ hoàn toàn khác nhau."
            en="★ Note: Each error category requires fundamentally different debugging strategies and safeguards."
          />
        </div>
      </section>

      {/* Câu hỏi củng cố 1 & 2 (Trang 142) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {isVi ? 'Câu hỏi củng cố mục 1 (SGK Trang 142)' : 'Section 1 Checkpoint Questions (Page 142)'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'Trả lời nhanh 2 câu hỏi ôn tập theo chuẩn SGK' : 'Test your comprehension of error categories'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Câu 1 */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              {isVi
                ? '1. Khi gõ sai cú pháp một lệnh, chương trình sẽ dừng lại và báo lỗi, đó là lỗi loại gì?'
                : '1. When typing a command with wrong grammar and Python stops with an error, what kind of error is it?'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {[
                { label: isVi ? 'Lỗi Cú Pháp (Syntax Error)' : 'Syntax Error', val: 'syntax', correct: true },
                { label: isVi ? 'Lỗi Ngoại Lệ (Runtime Error)' : 'Runtime Error', val: 'runtime', correct: false },
                { label: isVi ? 'Lỗi Lôgic (Logic Error)' : 'Logic Error', val: 'logic', correct: false }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setAns1(opt.val)}
                  className={`px-3 py-2 text-xs rounded-lg border text-left font-medium transition-all ${
                    ans1 === opt.val
                      ? opt.correct
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {ans1 === 'syntax' && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200">
                <strong>{isVi ? 'Giải thích chuẩn SGK: ' : 'Textbook Explanation: '}</strong>
                {isVi
                  ? 'Đó là Lỗi cú pháp (Syntax Error). Python phát hiện ngay trước khi chạy lệnh.'
                  : 'Syntax Error. Detected immediately during the parsing phase.'}
              </div>
            )}
          </div>

          {/* Câu 2 */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              {isVi
                ? '2. Bài toán yêu cầu sắp xếp dãy số ban đầu thành dãy tăng dần. Giả sử dãy ban đầu là [3, 1, 8, 10, 0]. Kết quả thu được là [1, 3, 8, 10, 0]. Chương trình có lỗi không? Nếu có thì lỗi đó thuộc loại gì?'
                : '2. Given initial list [3, 1, 8, 10, 0], a sorting program produces [1, 3, 8, 10, 0]. Does it have an error, and what type?'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {[
                { label: isVi ? 'Không có lỗi (vì đã sắp xếp được 4 số)' : 'No error', val: 'none', correct: false },
                { label: isVi ? 'Có lỗi, đó là Lỗi Cú pháp' : 'Syntax Error', val: 'syntax', correct: false },
                { label: isVi ? 'Có lỗi, đó là Lỗi Lôgic (Ngữ nghĩa)' : 'Logic Error (Semantic)', val: 'logic', correct: true }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setAns2(opt.val)}
                  className={`px-3 py-2 text-xs rounded-lg border text-left font-medium transition-all ${
                    ans2 === opt.val
                      ? opt.correct
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {ans2 === 'logic' && (
              <div className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200">
                <strong>{isVi ? 'Giải thích chuẩn SGK: ' : 'Textbook Explanation: '}</strong>
                {isVi
                  ? 'Chương trình CÓ LỖI, và đó là LỖI LÔGIC. Vì phần tử số 0 nhỏ nhất nhưng vẫn nằm ở cuối dãy thay vị trí đầu tiên [0, 1, 3, 8, 10]. Chương trình chạy không crash nhưng thuật toán sắp xếp bị sai sót.'
                  : 'The program CONTAINS A LOGIC ERROR. Element 0 is the smallest but remains at the end instead of the front [0, 1, 3, 8, 10].'}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
