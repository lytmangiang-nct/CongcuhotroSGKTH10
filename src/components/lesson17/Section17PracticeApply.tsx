import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Repeat,
  Clock,
  Music,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { LESSON_17_GLOSSARY, LESSON_17_QUIZ_QUESTIONS } from '../../data/lesson17Data';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';
import { BilingualText } from '../BilingualText';

export const Section17PracticeApply: React.FC = () => {
  const {
    bilingualMode,
    speak,
    isSpeaking,
    stopSpeaking,
    setShowQuizModal,
    setShowCertificateModal
  } = useBook();

  // Accordion Toggles
  const [showPractice1, setShowPractice1] = useState(true);
  const [showPractice2, setShowPractice2] = useState(true);
  const [showApply1, setShowApply1] = useState(true);
  const [showApply2, setShowApply2] = useState(true);
  const [showGlossary, setShowGlossary] = useState(false);

  // Practice 1 Interactive State
  const [p1Answer, setP1Answer] = useState<string>('');

  // Practice 2 Interactive Audio/Print State
  const [p2Run, setP2Run] = useState(false);

  // Application 1: Seconds to Days/Hours/Minutes/Seconds Converter
  const [inputSeconds, setInputSeconds] = useState<number>(684500);

  // Compute breakdown using SGK algorithms (// and %)
  const computeTimeBreakdown = (totalSec: number) => {
    let rem = Math.max(0, Math.floor(totalSec));
    const days = Math.floor(rem / 86400);
    rem = rem % 86400;
    const hours = Math.floor(rem / 3600);
    rem = rem % 3600;
    const minutes = Math.floor(rem / 60);
    const seconds = rem % 60;
    return { days, hours, minutes, seconds };
  };

  const timeBreakdown = computeTimeBreakdown(inputSeconds);

  // Application 2: Dynamic Variable Swap Demo
  const [swapX, setSwapX] = useState<number>(10);
  const [swapY, setSwapY] = useState<number>(7);
  const [swapCount, setSwapCount] = useState<number>(0);

  const handleSimultaneousSwap = () => {
    setSwapX(swapY);
    setSwapY(swapX);
    setSwapCount((c) => c + 1);
  };

  const handleStartQuiz = () => {
    setShowQuizModal(true);
  };

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textVi =
        'Phần Luyện tập và Vận dụng bài 17: Phân tích lỗi tên biến bắt đầu bằng số, tính kết quả nối và lặp xâu nốt nhạc. Vận dụng: Đổi số giây sang ngày, giờ, phút, giây bằng phép chia nguyên và chia dư, cùng cơ chế hoán vị hai biến x, y bằng lệnh gán đồng thời.';
      const textEn =
        'Practice and Application for Lesson 17: Diagnosing variable naming errors starting with numbers, evaluating musical string operations, converting total seconds to days, hours, minutes, and seconds using floor division and modulus, and mastering two-variable swap via simultaneous assignment.';
      speak(bilingualMode === 'en' ? textEn : textVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12 font-sans">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
            {bilingualMode === 'en'
              ? 'Practice & Application • Page 96 Informatics 10'
              : 'Luyện tập & Vận dụng • SGK Tin học 10 Trang 96'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {bilingualMode === 'en'
              ? 'Review, Application & Mastery Quiz'
              : 'Luyện tập, Vận dụng & Đánh giá năng lực'}
          </h1>
        </div>
      </div>

      {/* Practice 1: Identifier Syntax Error Diagnosis (Luyện tập 1 - Trang 96) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowPractice1(!showPractice1)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Practice 1: Syntax Error Diagnosis (Page 96)'
                  : 'Luyện tập 1: Chẩn đoán lỗi câu lệnh gán (Trang 96)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Observe syntax error when variable name violates fundamental naming rules'
                  : 'Quan sát lỗi cú pháp khi đặt tên biến vi phạm quy tắc cơ bản'}
              </p>
            </div>
          </div>
          {showPractice1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showPractice1 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 border border-slate-800 space-y-1">
              <div className="text-slate-400">&gt;&gt;&gt; x = 1</div>
              <div className="text-cyan-300">&gt;&gt;&gt; 123a = x + 1</div>
              <div className="text-rose-400 font-bold">SyntaxError: invalid syntax</div>
            </div>

            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {bilingualMode === 'en'
                ? 'Why does the statement above raise a SyntaxError?'
                : 'Vì sao câu lệnh trên bị báo lỗi SyntaxError?'}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                {
                  id: 'opt1',
                  textVi: 'Vì biến x chưa được khai báo giá trị',
                  textEn: 'Because variable x has not been declared'
                },
                {
                  id: 'opt2',
                  textVi: 'Vì tên biến 123a bắt đầu bằng chữ số (0-9)',
                  textEn: 'Because identifier 123a begins with a digit (0-9)',
                  correct: true
                },
                {
                  id: 'opt3',
                  textVi: 'Vì thiếu dấu chấm phẩy ở cuối dòng',
                  textEn: 'Because a semicolon is missing at end of line'
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setP1Answer(opt.id)}
                  className={`p-3 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                    p1Answer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-rose-600 text-white border-rose-600'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {bilingualMode === 'en' ? opt.textEn : opt.textVi}
                </button>
              ))}
            </div>

            {p1Answer === 'opt2' && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <BilingualText
                  vi="Theo quy tắc SGK trang 93: Tên biến không được phép bắt đầu bằng chữ số. Sửa đúng: a123 = x + 1 hoặc _123a = x + 1."
                  en="According to textbook page 93: Variable names cannot start with a digit. Fix: a123 = x + 1 or _123a = x + 1."
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Practice 2: String Replication & Concatenation (Luyện tập 2 - Trang 96) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowPractice2(!showPractice2)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Practice 2: Musical String Replication (Page 96)'
                  : 'Luyện tập 2: Tính toán kết quả in xâu nốt nhạc (Trang 96)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Combine string replication (*) and string concatenation (+)'
                  : 'Kết hợp phép nhân lặp xâu (*) và phép cộng nối xâu (+)'}
              </p>
            </div>
          </div>
          {showPractice2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showPractice2 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 border border-slate-800 flex items-center justify-between">
              <span className="text-purple-300">
                &gt;&gt;&gt; print("đô rê mi "*3 + "pha son la si đô "*2)
              </span>
              <button
                type="button"
                onClick={() => setP2Run(true)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
              >
                {bilingualMode === 'en' ? 'Print Output' : 'In kết quả'}
              </button>
            </div>

            {p2Run && (
              <div className="p-4 rounded-2xl bg-black border border-slate-800 font-mono text-xs text-emerald-400 space-y-1">
                <div className="text-slate-500 text-[11px]">
                  {bilingualMode === 'en' ? 'Console Display:' : 'Màn hình hiển thị:'}
                </div>
                <div className="text-sm font-bold">
                  đô rê mi đô rê mi đô rê mi pha son la si đô pha son la si đô{' '}
                </div>
                <div className="text-slate-400 text-xs font-sans pt-2 border-t border-slate-900">
                  {bilingualMode === 'en' ? (
                    <>
                      ✓ <code>"đô rê mi "*3</code> repeats the first musical substring 3 times.
                      <br />✓ <code>"pha son la si đô "*2</code> repeats the second musical substring 2 times.
                      <br />✓ Operator <code>+</code> concatenates both musical parts into a single string.
                    </>
                  ) : (
                    <>
                      ✓ Phép <code>"đô rê mi "*3</code> lặp 3 lần chuỗi nốt nhạc đầu.
                      <br />✓ Phép <code>"pha son la si đô "*2</code> lặp 2 lần chuỗi nốt nhạc sau.
                      <br />✓ Toán tử <code>+</code> ghép nối liên tiếp hai chuỗi đó lại thành một xâu hoàn chỉnh.
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Application 1: Total Seconds Converter (Vận dụng 1 - Trang 96) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowApply1(!showApply1)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Application 1: Seconds Time Converter (Page 96)'
                  : 'Vận dụng 1: Đổi số giây sang Ngày, Giờ, Phút, Giây (Trang 96)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Apply floor division (//) and modulus remainder (%)'
                  : 'Ứng dụng phép chia thương nguyên (//) và lấy số dư (%)'}
              </p>
            </div>
          </div>
          {showApply1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showApply1 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Algorithm Explanation */}
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="font-extrabold text-amber-900 dark:text-amber-200">
                  {bilingualMode === 'en' ? 'Textbook Algorithm Hint:' : 'Gợi ý thuật toán SGK:'}
                </div>
                <div>{bilingualMode === 'en' ? '• 1 day = 86,400 seconds' : '• 1 ngày = 86 400 giây'}</div>
                <div>{bilingualMode === 'en' ? '• 1 hour = 3,600 seconds' : '• 1 giờ = 3 600 giây'}</div>
                <div>{bilingualMode === 'en' ? '• 1 minute = 60 seconds' : '• 1 phút = 60 giây'}</div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs border border-amber-200 dark:border-amber-900/60 space-y-1 mt-2">
                  <div className="text-slate-400">
                    {bilingualMode === 'en' ? '# Python Algorithm:' : '# Thuật toán Python:'}
                  </div>
                  <div>ngay = ss // 86400; ss = ss % 86400</div>
                  <div>gio = ss // 3600; ss = ss % 3600</div>
                  <div>phut = ss // 60; giay = ss % 60</div>
                </div>
              </div>

              {/* Interactive Converter Box */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
                  <span>{bilingualMode === 'en' ? 'Enter seconds ss:' : 'Nhập số giây ss:'}</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setInputSeconds(684500)}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-amber-300 cursor-pointer"
                    >
                      {bilingualMode === 'en' ? 'Textbook Sample: 684,500s' : 'Mẫu SGK: 684 500s'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputSeconds(100000)}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 cursor-pointer"
                    >
                      100 000s
                    </button>
                  </div>
                </div>

                <input
                  type="number"
                  min={0}
                  value={inputSeconds}
                  onChange={(e) => setInputSeconds(Math.max(0, Number(e.target.value)))}
                  className="w-full p-2.5 rounded-xl bg-slate-950 font-mono text-amber-400 font-bold border border-slate-700 text-sm"
                />

                <div className="p-3.5 rounded-xl bg-black border border-slate-800 font-mono text-xs text-emerald-400 space-y-1">
                  <div className="text-slate-500 text-[10px]">
                    {bilingualMode === 'en' ? 'Converted Duration:' : 'Kết quả quy đổi:'}
                  </div>
                  <div className="font-bold text-sm">
                    {inputSeconds.toLocaleString()} {bilingualMode === 'en' ? 'seconds' : 'giây'} = {timeBreakdown.days} {bilingualMode === 'en' ? 'days' : 'ngày'} {timeBreakdown.hours} {bilingualMode === 'en' ? 'hours' : 'giờ'} {timeBreakdown.minutes} {bilingualMode === 'en' ? 'minutes' : 'phút'} {timeBreakdown.seconds} {bilingualMode === 'en' ? 'seconds' : 'giây'}.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application 2: Simultaneous Variable Swap (Vận dụng 2 - Trang 96) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowApply2(!showApply2)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Repeat className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Application 2: Python Magic Swap `x, y = y, x` (Page 96)'
                  : 'Vận dụng 2: Hoán vị hai biến bằng lệnh gán đồng thời (Trang 96)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Instant swap technique without requiring a temporary third variable'
                  : 'Kỹ thuật tráo đổi giá trị siêu tốc không cần dùng biến phụ tạm thời'}
              </p>
            </div>
          </div>
          {showApply2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showApply2 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm text-slate-200 border border-slate-800 space-y-2">
                <div className="text-slate-400">&gt;&gt;&gt; x, y = 10, 7</div>
                <div className="text-purple-300 font-bold">&gt;&gt;&gt; x, y = y, x</div>
                <div className="text-slate-400">&gt;&gt;&gt; x</div>
                <div className="text-emerald-400 font-bold">{swapX}</div>
                <div className="text-slate-400">&gt;&gt;&gt; y</div>
                <div className="text-amber-400 font-bold">{swapY}</div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 space-y-3">
                <div className="font-bold text-xs sm:text-sm text-purple-900 dark:text-purple-200">
                  {bilingualMode === 'en'
                    ? `Visualizing variable swap (Swap count: ${swapCount}):`
                    : `Trực quan hoá hoán vị hai biến (Số lần tráo: ${swapCount}):`}
                </div>
                <div className="flex items-center justify-around font-mono text-sm py-2">
                  <div className="p-3 rounded-2xl bg-blue-600 text-white font-black text-center min-w-[70px]">
                    x = {swapX}
                  </div>
                  <Repeat className="w-6 h-6 text-purple-600 dark:text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
                  <div className="p-3 rounded-2xl bg-emerald-600 text-white font-black text-center min-w-[70px]">
                    y = {swapY}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimultaneousSwap}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-extrabold text-xs transition-all cursor-pointer shadow-md"
                >
                  {bilingualMode === 'en' ? 'Swap values: x, y = y, x' : 'Tráo đổi giá trị: x, y = y, x'}
                </button>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  {bilingualMode === 'en' ? (
                    <>
                      <strong>Textbook Insight:</strong> In conventional languages (C++, Pascal), one must introduce a temporary helper <code>temp = x; x = y; y = temp</code>. In Python, simultaneous assignment packs the right-hand side into a tuple <code>(y, x)</code> and unpacks concurrently into <code>x, y</code>, ensuring safe and elegant code.
                    </>
                  ) : (
                    <>
                      <strong>Nhận xét SGK:</strong> Trong các ngôn ngữ khác (C++, Pascal), ta phải khai báo biến tạm <code>temp = x; x = y; y = temp</code>. Với Python, cơ chế gán đồng thời tính toán vế phải thành tuple <code>(y, x)</code> trước rồi giải nén đồng thời vào <code>x, y</code>, giúp mã nguồn cô đọng và tuyệt đối an toàn.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Glossary Accordion */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowGlossary(!showGlossary)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Lesson 17 Standard Glossary (10 Terms with IPA)'
                  : 'Bảng thuật ngữ chuẩn Bài 17 (10 Khái niệm kèm phiên âm IPA)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Quick reference for core concepts in academic Vietnamese and English'
                  : 'Tra cứu nhanh các khái niệm cốt lõi bằng tiếng Việt và tiếng Anh học thuật'}
              </p>
            </div>
          </div>
          {showGlossary ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showGlossary && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 divide-y divide-slate-100 dark:divide-slate-700/60">
            {LESSON_17_GLOSSARY.map((term) => (
              <div key={term.id} className="py-3.5 space-y-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {bilingualMode === 'en' ? term.termEn : term.termVi}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 font-mono">
                    {term.termEn}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{term.ipa}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {bilingualMode === 'en' ? term.definitionEn : term.definitionVi}
                </p>
                <div className="text-[11px] text-slate-500 italic">{term.sgkContext}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={17} />
    </div>
  );
};
