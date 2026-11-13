import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Sparkles,
  Play,
  RotateCcw,
  Calculator,
  Code2,
  AlertTriangle,
  ArrowLeft,
  Check,
  X,
  Layers
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { LESSON_16_GLOSSARY } from '../../data/lesson16Data';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section16PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setShowQuizModal,
    setShowCertificateModal,
    prevPage
  } = useBook();

  // Accordion toggle states
  const [showPractice1, setShowPractice1] = useState<boolean>(true);
  const [showPractice2, setShowPractice2] = useState<boolean>(true);
  const [showPractice3, setShowPractice3] = useState<boolean>(true);
  const [showApply1, setShowApply1] = useState<boolean>(true);
  const [showApply2, setShowApply2] = useState<boolean>(true);

  // Practice 1: 4 interactive arithmetic calculator cards
  const [p1Answers, setP1Answers] = useState<{ [key: string]: boolean }>({});

  // Practice 2: Error inspection answers reveal
  const [showP2Explanations, setShowP2Explanations] = useState<boolean>(false);

  // Apply 2: Multiplication table factor selector
  const [multFactor, setMultFactor] = useState<number>(9);

  const sectionSpeechVi =
    'Mục 5: Luyện tập và Vận dụng - Trang 90 SGK Tin học 10. Phần Luyện tập gồm 3 bài tập: Bài 1 tính giá trị 4 biểu thức trực tiếp; Bài 2 phân tích lỗi cú pháp của hai câu lệnh; Bài 3 viết lệnh print in thông tin phép nhân và tuổi của bạn Hoa. Phần Vận dụng gồm 2 bài: Vận dụng 1 khám phá xâu ba dấu nháy kép cho phép xuống dòng; Vận dụng 2 viết chương trình in bảng cửu chương trong phạm vi 10. Mời các em làm bài kiểm tra trắc nghiệm 10 câu để nhận chứng chỉ điện tử KNTT10-B16!';
  const sectionSpeechEn =
    'Section 5: Practice & Application - Page 90 of Informatics 10 Textbook. Practice features 3 problem sets: Problem 1 evaluates 4 direct arithmetic expressions; Problem 2 analyzes syntax errors in invalid statements; Problem 3 constructs print calls for mathematical products and age statements. Application explores triple-quoted multiline strings and generates multiplication tables up to 10. Complete the 10-question mastery quiz to claim your verified certificate!';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-purple-950 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-blue-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Section 5 • Page 90' : 'Mục 5 • Trang 90'}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-100 text-xs font-mono font-semibold">
              KNTT10-B16
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '5. PRACTICE, APPLICATION & CERTIFICATION'
              : '5. LUYỆN TẬP, VẬN DỤNG & CHỨNG CHỈ ĐIỆN TỬ'}
          </h2>

          <p className="text-sm sm:text-base text-blue-100/90 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Hone your newfound Python competencies: evaluate arithmetic expressions, diagnose and fix syntax errors, craft multiline verse with triple quotes, and generate multiplication tables before earning your credentials.'
              : 'Rèn luyện kỹ năng lập trình Python cơ bản: tính toán biểu thức trực tiếp, chẩn đoán và khắc phục lỗi cú pháp, in bài thơ nhiều dòng bằng ba dấu nháy kép và lập trình bảng cửu chương trước khi nhận chứng chỉ chính thức.'}
          </p>
        </div>
      </div>

      {/* Practice 1: 4 Direct Expressions (SGK Trang 90) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowPractice1(!showPractice1)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Practice 1: Direct Expression Evaluation (Page 90)'
                  : 'Luyện tập 1: Tính giá trị các biểu thức trong chế độ trực tiếp (Trang 90)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Type direct math commands after >>> in interactive mode'
                  : 'Gõ trực tiếp các phép tính sau dấu nhắc >>> và quan sát kết quả'}
              </p>
            </div>
          </div>
          {showPractice1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showPractice1 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: 'a',
                expr: '10 + 13',
                expected: '23',
                typeVi: 'int (Số nguyên)',
                typeEn: 'int (Integer)'
              },
              {
                id: 'b',
                expr: '20 - 7',
                expected: '13',
                typeVi: 'int (Số nguyên)',
                typeEn: 'int (Integer)'
              },
              {
                id: 'c',
                expr: '3 * 10 - 16',
                expected: '14',
                typeVi: 'int (Số nguyên)',
                typeEn: 'int (Integer)'
              },
              {
                id: 'd',
                expr: '12/5 + 13/6',
                expected: '4.566666666666666',
                typeVi: 'float (Số thực)',
                typeEn: 'float (Float)'
              }
            ].map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase font-mono">
                    {bilingualMode === 'en' ? `Part ${item.id.toUpperCase()})` : `Câu ${item.id})`}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {bilingualMode === 'en' ? item.typeEn : item.typeVi}
                  </span>
                </div>
                <div className="font-mono text-xs text-cyan-300 bg-black p-2 rounded-xl">
                  &gt;&gt;&gt; {item.expr}
                </div>
                <button
                  onClick={() => setP1Answers((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                  className="w-full py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold hover:bg-blue-200 transition-colors"
                >
                  {p1Answers[item.id]
                    ? bilingualMode === 'en'
                      ? 'Hide Result'
                      : 'Ẩn kết quả'
                    : bilingualMode === 'en'
                    ? 'Click to View Result'
                    : 'Bấm xem kết quả'}
                </button>
                {p1Answers[item.id] && (
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm animate-in fade-in">
                    = {item.expected}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Practice 2: Syntax Error Diagnosis (SGK Trang 90) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowPractice2(!showPractice2)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Practice 2: Syntax Error Diagnosis & Debugging (Page 90)'
                  : 'Luyện tập 2: Phân tích lỗi câu lệnh & Gỡ rối cú pháp (Trang 90)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Detect why 3 + * 5 and nested quotes fail in Python'
                  : 'Tìm nguyên nhân gây lỗi cú pháp và cách sửa chuẩn theo quy tắc của Python'}
              </p>
            </div>
          </div>
          {showPractice2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showPractice2 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Error Case A */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-rose-500 font-mono">
                    {bilingualMode === 'en' ? 'Case 1' : 'Trường hợp 1'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 font-bold">
                    {bilingualMode === 'en' ? 'SyntaxError Detected' : 'Có lỗi (SyntaxError)'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black font-mono text-xs text-rose-400">
                  &gt;&gt;&gt; 3 + * 5
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <strong>{bilingualMode === 'en' ? 'Cause: ' : 'Nguyên nhân: '}</strong>
                  {bilingualMode === 'en'
                    ? 'Two binary arithmetic operators + and * are placed consecutively without an operand between them.'
                    : 'Hai toán tử số học nhị phân + và * đứng liền kề nhau mà không có toán hạng ở giữa.'}
                  <div className="pt-1 text-emerald-600 dark:text-emerald-400 font-mono">
                    {bilingualMode === 'en' ? '✅ Fix: ' : '✅ Cách sửa: '}
                    <code>3 + 5</code> {bilingualMode === 'en' ? 'or' : 'hoặc'} <code>3 * 5</code>
                  </div>
                </div>
              </div>

              {/* Error Case B */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-rose-500 font-mono">
                    {bilingualMode === 'en' ? 'Case 2' : 'Trường hợp 2'}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 font-bold">
                    {bilingualMode === 'en' ? 'SyntaxError Detected' : 'Có lỗi (SyntaxError)'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-black font-mono text-xs text-rose-400">
                  &gt;&gt;&gt; "Bạn là học sinh, bạn tên là "Nguyễn Việt Anh""
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                  <strong>{bilingualMode === 'en' ? 'Cause: ' : 'Nguyên nhân: '}</strong>
                  {bilingualMode === 'en'
                    ? 'Using double quotes inside another double-quoted string causes Python to terminate the string early at "là ".'
                    : 'Dùng dấu ngoặc kép lồng bên trong chuỗi ngoặc kép khiến Python hiểu xâu kết thúc sớm ở chữ "là ".'}
                  <div className="pt-1 text-emerald-600 dark:text-emerald-400 font-mono">
                    {bilingualMode === 'en'
                      ? '✅ Fix: \'Bạn là học sinh, bạn tên là "Nguyễn Việt Anh"\' (use single quotes for the outer string)'
                      : '✅ Cách sửa: \'Bạn là học sinh, bạn tên là "Nguyễn Việt Anh"\' (dùng nháy đơn bao ngoài)'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Practice 3: print() Statements (SGK Trang 90) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowPractice3(!showPractice3)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Practice 3: Writing print() Output Statements (Page 90)'
                  : 'Luyện tập 3: Viết các lệnh in thông tin ra màn hình (Trang 90)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Construct print() statements for product calculation and age sentence'
                  : 'Viết câu lệnh in phép nhân 1x3x5x7 = 105 và thông tin tuổi bạn Hoa'}
              </p>
            </div>
          </div>
          {showPractice3 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showPractice3 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-slate-800 dark:text-slate-100 block">
                a) {bilingualMode === 'en' ? 'Print to console: ' : 'In ra màn hình: '}
                <code>1 x 3 x 5 x 7 = 105</code>
              </span>
              <div className="p-2.5 rounded-xl bg-black font-mono text-xs text-cyan-300">
                print("1 x 3 x 5 x 7 =", 1*3*5*7)
              </div>
              <p className="text-[11px] text-slate-500">
                {bilingualMode === 'en'
                  ? 'Python automatically computes expression 1*3*5*7 as 105 and concatenates it after the text string.'
                  : 'Python tự động tính biểu thức 1*3*5*7 thành 105 và nối vào sau chuỗi văn bản.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-xs text-slate-800 dark:text-slate-100 block">
                b) {bilingualMode === 'en' ? 'Print to console: Hoa is 16 years old.' : 'In ra màn hình: Bạn Hoa năm nay 16 tuổi.'}
              </span>
              <div className="p-2.5 rounded-xl bg-black font-mono text-xs text-cyan-300">
                {bilingualMode === 'en'
                  ? 'print("Hoa is", 16, "years old.")'
                  : 'print("Bạn Hoa năm nay", 16, "tuổi.")'}
              </div>
              <p className="text-[11px] text-slate-500">
                {bilingualMode === 'en'
                  ? 'Prints 3 arguments: first string, number 16, and second string, automatically separated by spaces.'
                  : 'In 3 đối số: chuỗi thứ nhất, số 16 và chuỗi thứ hai, tự động ngăn cách bởi dấu cách.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Application 1: Triple Quotes Multiline Strings (SGK Trang 90) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowApply1(!showApply1)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Application 1: Triple-Quoted Multiline Strings (Page 90)'
                  : 'Vận dụng 1: Xâu ký tự ba dấu nháy kép """...""" nhiều dòng (Trang 90)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Writing multiline poems and preserving Enter linebreaks natively in Python'
                  : 'In bài thơ nhiều dòng giữ nguyên cấu trúc xuống dòng bằng cặp 3 dấu nháy kép'}
              </p>
            </div>
          </div>
          {showApply1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showApply1 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1 text-cyan-300">
              <div className="text-slate-400 mb-1">
                {bilingualMode === 'en'
                  ? '# Python source code with triple quotes:'
                  : '# Mã nguồn Python với ba cặp nháy kép:'}
              </div>
              {bilingualMode === 'en' ? (
                <>
                  <div className="text-purple-400">
                    print(<span className="text-emerald-300">{`"""Nothing is too difficult`}</span>
                  </div>
                  <div className="text-emerald-300 pl-4">Only lack of perseverance to fear</div>
                  <div className="text-emerald-300 pl-4">Moving mountains and bridging seas</div>
                  <div>
                    <span className="text-emerald-300 pl-4">{`Firm resolve will surely prevail"""`}</span>
                    <span className="text-purple-400">)</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-purple-400">
                    print(<span className="text-emerald-300">{`"""Không có việc gì khó`}</span>
                  </div>
                  <div className="text-emerald-300 pl-4">Chỉ sợ lòng không bền</div>
                  <div className="text-emerald-300 pl-4">Đào núi và lấp biển</div>
                  <div>
                    <span className="text-emerald-300 pl-4">{`Quyết chí ắt làm nên"""`}</span>
                    <span className="text-purple-400">)</span>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-black border border-slate-800 font-mono text-xs space-y-1 text-emerald-400">
              <div className="text-slate-500 text-[11px] mb-1">
                {bilingualMode === 'en' ? 'Console output:' : 'Kết quả hiển thị trên màn hình:'}
              </div>
              {bilingualMode === 'en' ? (
                <>
                  <div>Nothing is too difficult</div>
                  <div>Only lack of perseverance to fear</div>
                  <div>Moving mountains and bridging seas</div>
                  <div>Firm resolve will surely prevail</div>
                </>
              ) : (
                <>
                  <div>Không có việc gì khó</div>
                  <div>Chỉ sợ lòng không bền</div>
                  <div>Đào núi và lấp biển</div>
                  <div>Quyết chí ắt làm nên</div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Application 2: Multiplication Table Generator (SGK Trang 90) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowApply2(!showApply2)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Application 2: Multiplication Table Generator (Page 90)'
                  : 'Vận dụng 2: Viết chương trình in Bảng cửu chương nhân trong phạm vi 10 (Trang 90)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Generate any times table dynamically from 1 to 10'
                  : 'Tự động in bảng nhân tương ứng từ 1 đến 10 với vòng lặp và hàm print'}
              </p>
            </div>
          </div>
          {showApply2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showApply2 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {bilingualMode === 'en' ? 'Select times table:' : 'Chọn bảng cửu chương nhân:'}
              </span>
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setMultFactor(num)}
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all ${
                    multFactor === num
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs space-y-1">
                <span className="text-slate-400 block mb-1">
                  {bilingualMode === 'en' ? '# Python source code:' : '# Mã nguồn Python:'}
                </span>
                <div className="text-cyan-300">
                  <span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-cyan-400">range</span>(1, 11):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">print</span>({multFactor}, <span className="text-emerald-300">"x"</span>, i, <span className="text-emerald-300">"="</span>, {multFactor} * i)
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-slate-800 font-mono text-xs text-emerald-400 grid grid-cols-2 gap-1">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                  <div key={i} className="py-0.5">
                    {multFactor} x {i} = <span className="text-white font-bold">{multFactor * i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bilingual Technical Glossary Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
              {bilingualMode === 'en'
                ? 'Lesson 16 Technical Glossary & IPA Reference'
                : 'Thuật ngữ cốt lõi & Phiên âm quốc tế IPA (Bài 16)'}
            </h3>
            <p className="text-xs text-slate-500">
              {bilingualMode === 'en'
                ? 'Standard high-level programming and Python terminology per national curriculum'
                : 'Hệ thống thuật ngữ lập trình bậc cao và Python chuẩn theo SGK Tin học 10'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                <th className="p-3">{bilingualMode === 'en' ? 'Term (En / Vi)' : 'Thuật ngữ (Vi / En)'}</th>
                <th className="p-3">{bilingualMode === 'en' ? 'IPA Pronunciation' : 'Phiên âm IPA'}</th>
                <th className="p-3">{bilingualMode === 'en' ? 'Definition & Context' : 'Định nghĩa & Ngữ cảnh SGK'}</th>
                <th className="p-3">{bilingualMode === 'en' ? 'Example' : 'Ví dụ minh họa'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
              {LESSON_16_GLOSSARY.map((term) => (
                <tr key={term.id} className="hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                    {bilingualMode === 'en' ? (
                      <>
                        <div className="text-blue-600 dark:text-blue-400 font-mono">{term.termEn}</div>
                        <div className="text-[11px] text-slate-500">{term.termVi}</div>
                      </>
                    ) : (
                      <>
                        <div>{term.termVi}</div>
                        <div className="text-[11px] text-blue-600 dark:text-blue-400 font-mono">{term.termEn}</div>
                      </>
                    )}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-purple-600 dark:text-purple-400 whitespace-nowrap">
                    {term.ipa}
                  </td>
                  <td className="p-3">
                    <p className="text-slate-700 dark:text-slate-300">
                      {bilingualMode === 'en' ? (term.definitionEn || term.definitionVi) : term.definitionVi}
                    </p>
                    <p className="text-[11px] text-slate-400 italic mt-0.5">{term.sgkContext}</p>
                  </td>
                  <td className="p-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {bilingualMode === 'en' ? (term.exampleEn || term.exampleVi) : term.exampleVi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={16} />

      {/* Back to section 4 navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={prevPage}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: Practical Lab' : 'Quay lại: Thực hành Bai1.py'}</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          {bilingualMode === 'en'
            ? 'Complete Lesson 16 • Pages 86–90 Textbook'
            : 'Hoàn thành Bài 16 • Trang 86 – 90 SGK Tin học 10'}
        </span>
      </div>
    </div>
  );
};
