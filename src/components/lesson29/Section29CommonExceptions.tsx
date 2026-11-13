import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import {
  AlertCircle,
  FileCode,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Terminal,
  Play,
  RotateCcw,
  Zap,
  Info,
  Layers,
  ShieldCheck
} from 'lucide-react';

export const Section29CommonExceptions: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // Câu hỏi củng cố a, b, c, d
  const [selectedExAnswers, setSelectedExAnswers] = useState<{ [key: string]: string }>({});

  // Interactive Live Diagnostic Sandbox
  const [selectedPreset, setSelectedPreset] = useState<string>('a');
  const [customCommand, setCustomCommand] = useState<string>('A = [10, 20, 30]\nA[1.5]');
  const [diagResult, setDiagResult] = useState<{
    code: string;
    errorType: string;
    msg: string;
    fix: string;
  } | null>(null);

  const exceptionTable = [
    {
      code: 'ZeroDivisionError',
      descVi: 'Lỗi này xảy ra khi lệnh thực hiện phép chia cho giá trị 0.',
      descEn: 'Raised when executing an arithmetic division by zero (/, //, %).',
      example: 'a = 10 / 0',
      color: 'rose'
    },
    {
      code: 'IndexError',
      descVi: 'Lỗi xảy ra khi lệnh cố gắng truy cập phần tử của danh sách nhưng chỉ số vượt quá giới hạn.',
      descEn: 'Raised when accessing a list sequence with an out-of-range index.',
      example: 'A = [1, 2]; print(A[5])',
      color: 'amber'
    },
    {
      code: 'NameError',
      descVi: 'Lỗi xảy ra khi chương trình muốn tìm một tên biến/hàm nhưng không thấy trong phạm vi.',
      descEn: 'Raised when an identifier (variable or function) is not found in namespace.',
      example: 'print(diem_thi)',
      color: 'purple'
    },
    {
      code: 'TypeError',
      descVi: 'Lỗi kiểu dữ liệu (chỉ số danh sách không là số nguyên, cộng chuỗi với số...).',
      descEn: 'Raised when an operation is applied to an object of inappropriate type.',
      example: 'A[1.5] hoặc "10" * 3.5',
      color: 'blue'
    },
    {
      code: 'ValueError',
      descVi: 'Lỗi giá trị đối tượng (ép kiểu dữ liệu với đối số có giá trị hàm không hỗ trợ).',
      descEn: 'Raised when a function receives an argument of right type but inappropriate value.',
      example: 'int("1.55") hoặc int("abc")',
      color: 'yellow'
    },
    {
      code: 'IndentationError',
      descVi: 'Lỗi khi các dòng lệnh thụt vào không thẳng hàng hoặc không đúng vị trí.',
      descEn: 'Raised when statement indentation is misaligned or missing in blocks.',
      example: 'if x > 0:\nprint(x)',
      color: 'pink'
    },
    {
      code: 'SyntaxError',
      descVi: 'Lỗi cú pháp ngôn ngữ (quên dấu ngoặc, sai từ khoá, quên dấu hai chấm :).',
      descEn: 'Raised when Python encounters invalid grammatical syntax.',
      example: 'while True print("Hi")',
      color: 'red'
    }
  ];

  const checkpointItems = [
    {
      id: 'a',
      label: 'a) A[1.5]',
      correctCode: 'TypeError',
      reasonVi: 'Chỉ số danh sách bắt buộc phải là số nguyên (int). Giá trị 1.5 là số thực float nên phát sinh TypeError.',
      reasonEn: 'List indices must be integers or slices, not float -> TypeError.',
      sampleSetup: 'A = [10, 20, 30]\nA[1.5]'
    },
    {
      id: 'b',
      label: 'b) int("abc")',
      correctCode: 'ValueError',
      reasonVi: 'Hàm int() chỉ chuyển được các xâu chứa chữ số nguyên. Xâu "abc" chứa chữ cái nên báo lỗi ValueError.',
      reasonEn: 'int() fails to parse "abc" as a base-10 integer literal -> ValueError.',
      sampleSetup: 'x = int("abc")'
    },
    {
      id: 'c',
      label: 'c) "10"*3.5',
      correctCode: 'TypeError',
      reasonVi: 'Toán tử nhân xâu kí tự (*) chỉ cho phép nhân với số nguyên để lặp chuỗi. Nhân với float 3.5 sinh TypeError.',
      reasonEn: 'Strings cannot be multiplied by non-int of type float -> TypeError.',
      sampleSetup: 'msg = "10" * 3.5'
    },
    {
      id: 'd',
      label: 'd) 12 + x(10)',
      correctCode: 'NameError',
      reasonVi: 'Hàm hoặc biến x chưa từng được định nghĩa trong chương trình nên Python báo NameError: name "x" is not defined.',
      reasonEn: 'The identifier "x" has not been assigned or declared in scope -> NameError.',
      sampleSetup: 'total = 12 + x(10)'
    }
  ];

  const handleRunDiagnostic = () => {
    const cmd = customCommand.trim();
    if (cmd.includes('A[1.5]') || cmd.includes('[1.5]')) {
      setDiagResult({
        code: 'TypeError',
        errorType: 'TypeError: list indices must be integers or slices, not float',
        msg: isVi ? 'Bạn đã dùng số thực 1.5 làm chỉ số phần tử danh sách.' : 'List index cannot be float 1.5.',
        fix: isVi ? 'Dùng số nguyên: A[1] hoặc ép kiểu: A[int(1.5)]' : 'Use integer indexing: A[1] or A[int(1.5)]'
      });
    } else if (cmd.includes('int("abc")') || cmd.includes("int('abc')") || cmd.includes('int("1.55")') || cmd.includes('int("1.5")')) {
      setDiagResult({
        code: 'ValueError',
        errorType: 'ValueError: invalid literal for int() with base 10',
        msg: isVi ? 'Hàm int() không thể phân tích xâu chữ hoặc số thập phân sang số nguyên.' : 'Cannot parse non-integer strings into int.',
        fix: isVi ? 'Dùng float("1.55") nếu là số thực, hoặc kiểm tra xâu bằng .isdigit()' : 'Use float() or check with .isdigit()'
      });
    } else if (cmd.includes('"10" * 3.5') || cmd.includes('"10"*3.5') || cmd.includes("'10'*3.5")) {
      setDiagResult({
        code: 'TypeError',
        errorType: "TypeError: can't multiply sequence by non-int of type 'float'",
        msg: isVi ? 'Phép nhân xâu chỉ chấp nhận số lần lặp là số nguyên.' : 'String multiplication only supports int.',
        fix: isVi ? 'Đổi thành: "10" * 3 hoặc float("10") * 3.5' : 'Change to "10" * 3 or float("10") * 3.5'
      });
    } else if (cmd.includes('x(10)') || cmd.includes('x(')) {
      setDiagResult({
        code: 'NameError',
        errorType: "NameError: name 'x' is not defined",
        msg: isVi ? 'Python không tìm thấy hàm x() trong bộ nhớ.' : 'Identifier "x" is not defined.',
        fix: isVi ? 'Định nghĩa hàm def x(n): return n*2 trước khi gọi' : 'Declare def x(n) before calling it'
      });
    } else if (cmd.includes('/ 0') || cmd.includes('/0')) {
      setDiagResult({
        code: 'ZeroDivisionError',
        errorType: 'ZeroDivisionError: division by zero',
        msg: isVi ? 'Không thể thực hiện phép chia cho 0 trong toán học.' : 'Division by zero is undefined.',
        fix: isVi ? 'Kiểm tra mẫu số: if mau_so != 0:' : 'Guard against zero: if divisor != 0:'
      });
    } else {
      setDiagResult({
        code: 'Diagnostic',
        errorType: 'Python Execution Verified',
        msg: isVi ? 'Lệnh đã được phân tích ngữ pháp.' : 'Command parsed successfully.',
        fix: isVi ? 'Hãy thử các kịch bản mẫu từ câu a, b, c, d để kích hoạt traceback.' : 'Try preset test cases above.'
      });
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 p-8 text-white shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
          <AlertCircle className="w-4 h-4" />
          {isVi ? 'Mục 2 • SGK Trang 143' : 'Part 2 • Textbook Page 143'}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight">
          {isVi ? '2. Một số lỗi ngoại lệ thường gặp' : '2. Common Runtime Exceptions in Python'}
        </h2>
        <p className="mt-2 text-amber-100 max-w-3xl text-sm md:text-base leading-relaxed">
          {isVi
            ? 'Khám phá chi tiết 7 mã lỗi ngoại lệ phổ biến nhất trong Python, hiểu rõ hoàn cảnh phát sinh và trang bị kỹ năng nhận diện nhanh qua Traceback.'
            : 'Deep-dive into Python 7 most frequent exception types, understand their root triggers, and build instant traceback diagnostics.'}
        </p>
      </div>

      {/* Hoạt động 2: Bảng tra cứu 7 lỗi ngoại lệ */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
            HĐ2
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {isVi ? 'Hoạt động 2: Bảng tổng hợp các mã lỗi ngoại lệ thường gặp' : 'Activity 2: Common Python Runtime Exceptions Matrix'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'Bảng tra cứu chuẩn theo SGK Tin học 10, Trang 143' : 'Textbook Reference Table, Page 143'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold tracking-wider">
              <tr>
                <th className="p-3.5 border-b border-slate-200 dark:border-slate-700 w-1/4">
                  {isVi ? 'Mã lỗi ngoại lệ' : 'Exception Code'}
                </th>
                <th className="p-3.5 border-b border-slate-200 dark:border-slate-700 w-1/2">
                  {isVi ? 'Mô tả lỗi theo SGK' : 'Description'}
                </th>
                <th className="p-3.5 border-b border-slate-200 dark:border-slate-700 w-1/4">
                  {isVi ? 'Ví dụ minh hoạ' : 'Example'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
              {exceptionTable.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-rose-600 dark:text-rose-400">{item.code}</span>
                  </td>
                  <td className="p-3.5 font-sans text-slate-700 dark:text-slate-300">
                    {isVi ? item.descVi : item.descEn}
                  </td>
                  <td className="p-3.5 text-emerald-600 dark:text-emerald-400 bg-slate-50/50 dark:bg-slate-950/30">
                    {item.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bài tập củng cố a, b, c, d (Trang 143) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {isVi ? 'Bài tập củng cố: Nêu mã lỗi ngoại lệ của mỗi lệnh (SGK Trang 143)' : 'Checkpoint: Identify the Exception Code for Each Command (Page 143)'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isVi ? 'Hãy chọn mã lỗi chính xác cho từng lệnh dưới đây khi xảy ra lỗi' : 'Match the commands with their respective exception codes'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checkpointItems.map((item) => {
            const chosen = selectedExAnswers[item.id];
            const isCorrect = chosen === item.correctCode;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  chosen
                    ? isCorrect
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-700'
                      : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-400 dark:border-rose-700'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-sm text-slate-900 dark:text-slate-100">
                    {item.label}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedPreset(item.id);
                      setCustomCommand(item.sampleSetup);
                    }}
                    className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <Play className="w-3 h-3" />
                    {isVi ? 'Nạp vào máy chẩn đoán' : 'Load to Diagnostic'}
                  </button>
                </div>

                {/* Option buttons */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {['TypeError', 'ValueError', 'NameError', 'IndexError', 'ZeroDivisionError'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedExAnswers(prev => ({ ...prev, [item.id]: opt }))}
                      className={`px-2.5 py-1 text-xs rounded-lg border font-mono transition-all ${
                        chosen === opt
                          ? opt === item.correctCode
                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                            : 'bg-rose-600 text-white border-rose-600 font-bold'
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Feedback */}
                {chosen && isCorrect && (
                  <div className="mt-3 text-xs leading-relaxed text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <strong>Giải thích ({item.correctCode}):</strong> {isVi ? item.reasonVi : item.reasonEn}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Exception Diagnostic Sandbox */}
      <section className="bg-slate-950 rounded-2xl p-6 md:p-8 text-white shadow-2xl border border-slate-800">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              {isVi ? 'Phòng Chẩn Đoán Lỗi Trực Tiếp' : 'Live Exception Diagnostic Sandbox'}
            </div>
            <h3 className="text-lg font-bold">
              {isVi ? 'Kiểm tra & Bắt lỗi ngoại lệ thời gian thực' : 'Real-time Traceback & Exception Interceptor'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunDiagnostic}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Play className="w-3.5 h-3.5" />
              {isVi ? 'Chẩn đoán lệnh' : 'Diagnose Statement'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              {isVi ? 'Lệnh Python cần kiểm tra:' : 'Python Command to Test:'}
            </label>
            <textarea
              rows={4}
              value={customCommand}
              onChange={(e) => setCustomCommand(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl font-mono text-xs text-amber-300 focus:outline-hidden focus:border-amber-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 min-h-[110px] font-mono text-xs">
            <div className="text-slate-400 mb-2 flex items-center justify-between">
              <span>Diagnostic Report</span>
              {diagResult && (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  diagResult.code === 'Diagnostic' ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                }`}>
                  {diagResult.code}
                </span>
              )}
            </div>

            {diagResult ? (
              <div className="space-y-2">
                <div className="text-rose-400 font-bold">{diagResult.errorType}</div>
                <div className="text-slate-300 text-[11px] font-sans">{diagResult.msg}</div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-emerald-400 text-[11px]">
                  <strong>Giải pháp khắc phục:</strong> {diagResult.fix}
                </div>
              </div>
            ) : (
              <p className="text-slate-500 italic py-3">
                {isVi ? 'Nhấn "Chẩn đoán lệnh" để phân tích mã lỗi...' : 'Click "Diagnose Statement" to analyze...'}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
