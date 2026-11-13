import React, { useState } from 'react';
import {
  Code2,
  CheckCircle2,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Cpu,
  Globe,
  Bot,
  Binary,
  Layers,
  HelpCircle,
  Lightbulb,
  Check,
  X
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section16HighLevelLanguage: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();

  // Checkpoint question state (Trang 87)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Compiler simulation state
  const [sourceCodeInput, setSourceCodeInput] = useState<string>('print("Xin chào!", 3 + 7)');
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileStep, setCompileStep] = useState<number>(0);

  const handleSimulateCompile = () => {
    setIsCompiling(true);
    setCompileStep(1);
    setTimeout(() => setCompileStep(2), 600);
    setTimeout(() => setCompileStep(3), 1200);
    setTimeout(() => {
      setCompileStep(4);
      setIsCompiling(false);
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-800 via-indigo-800 to-cyan-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-blue-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Section 1 • Pages 86–87' : 'Mục 1 • Trang 86 – 87'}
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-100 text-xs font-mono font-semibold">
              Guido van Rossum • 1991
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '1. HIGH-LEVEL PROGRAMMING LANGUAGES & PYTHON'
              : '1. NGÔN NGỮ LẬP TRÌNH BẬC CAO VÀ PYTHON'}
          </h2>

          <p className="text-sm sm:text-base text-blue-100/90 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Discover how high-level languages liberated human creativity from the constraints of binary hardware. Learn why Python, conceived by Guido van Rossum in 1991, has become the global standard in AI, data science, and modern education.'
              : 'Tìm hiểu cách ngôn ngữ lập trình bậc cao giải phóng sức sáng tạo của con người khỏi các ràng buộc nhị phân phần cứng. Khám phá lý do tại sao Python, do Guido van Rossum tạo ra năm 1991, đã trở thành chuẩn mực toàn cầu trong AI, khoa học dữ liệu và giáo dục.'}
          </p>

          {bilingualMode !== 'vi' && (
            <div className="pt-2">
              <button
                onClick={() =>
                  speak(
                    bilingualMode === 'en'
                      ? 'Section 1: High-Level Programming Languages. High-level programming languages have statements written close to natural language, making reading and understanding code much easier. Python was created by Dutch programmer Guido van Rossum and released in 1991. Because computers only understand binary machine code, high-level programs require a translator program, known as a compiler or interpreter, to execute.'
                      : 'Mục 1: Ngôn ngữ lập trình bậc cao. Các lệnh viết bằng ngôn ngữ máy hay hợp ngữ không thuận tiện cho việc viết và hiểu chương trình. Khó khăn đó được giải quyết bằng ngôn ngữ bậc cao có câu lệnh gần với ngôn ngữ tự nhiên. Tuy nhiên, để máy tính có thể hiểu và thực hiện, chương trình cần được dịch sang ngôn ngữ máy nhờ chương trình dịch. Python do Guido van Rossum, người Hà Lan tạo ra năm 1991, là ngôn ngữ phổ biến nhất trong nghiên cứu và giáo dục.'
                  )
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur transition-colors"
              >
                <Volume2 className="w-4 h-4 text-blue-300" />
                <span>{bilingualMode === 'en' ? 'Listen to Section' : 'Nghe nội dung bài học'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Activity 1 (Trang 86): Exploring High-Level Languages */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
              {bilingualMode === 'en'
                ? 'Activity 1: Understanding High-Level Languages (Page 86)'
                : 'Hoạt động 1: Tìm hiểu ngôn ngữ lập trình bậc cao (Trang 86)'}
            </h3>
            <p className="text-xs text-slate-500">
              {bilingualMode === 'en'
                ? 'Answering foundational questions on programming taxonomy'
                : 'Thảo luận 2 câu hỏi cốt lõi mở đầu Chủ đề 5'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-xs text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              {bilingualMode === 'en'
                ? 'Question 1: What is a programming language? What types are there?'
                : 'Câu hỏi 1: Ngôn ngữ lập trình là gì? Có những loại nào?'}
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>{bilingualMode === 'en' ? 'A programming language' : 'Ngôn ngữ lập trình'}</strong>{' '}
              {bilingualMode === 'en'
                ? 'is a system of symbols and grammatical rules used to write instructions for computers. It is categorized into three primary levels:'
                : 'là hệ thống các ký hiệu và quy tắc cú pháp dùng để viết các chỉ thị cho máy tính thực hiện. Chia thành 3 cấp độ chính:'}
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4 font-mono">
              <li>
                <strong>{bilingualMode === 'en' ? 'Machine language (Machine code):' : 'Ngôn ngữ máy (Machine code):'}</strong>{' '}
                {bilingualMode === 'en' ? 'Binary strings of 0s and 1s' : 'Chuỗi 0 và 1'}
              </li>
              <li>
                <strong>{bilingualMode === 'en' ? 'Assembly language (Assembly):' : 'Hợp ngữ (Assembly):'}</strong>{' '}
                {bilingualMode === 'en' ? 'Mnemonics (LDA, STA, JMP)' : 'Từ viết tắt (LDA, STA, JMP)'}
              </li>
              <li>
                <strong>{bilingualMode === 'en' ? 'High-level language (High-level):' : 'Ngôn ngữ bậc cao (High-level):'}</strong>{' '}
                Python, C++, Java
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              {bilingualMode === 'en'
                ? 'Question 2: Name some common high-level languages?'
                : 'Câu hỏi 2: Kể tên một số ngôn ngữ bậc cao thông dụng?'}
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-blue-600 dark:text-blue-400 block font-mono">Python</strong>
                <span className="text-[11px] text-slate-500">
                  {bilingualMode === 'en' ? 'AI, data science, web, education' : 'AI, dữ liệu, web, giáo dục'}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-indigo-600 dark:text-indigo-400 block font-mono">C / C++</strong>
                <span className="text-[11px] text-slate-500">
                  {bilingualMode === 'en' ? 'Operating systems, 3D games, embedded' : 'Hệ điều hành, game 3D, nhúng'}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-amber-600 dark:text-amber-400 block font-mono">Java</strong>
                <span className="text-[11px] text-slate-500">
                  {bilingualMode === 'en' ? 'Enterprise apps, Android systems' : 'Ứng dụng doanh nghiệp, Android'}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-purple-600 dark:text-purple-400 block font-mono">JavaScript</strong>
                <span className="text-[11px] text-slate-500">
                  {bilingualMode === 'en' ? 'Interactive web applications' : 'Lập trình web tương tác'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Role of the Translator (Chương trình dịch) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100">
                {bilingualMode === 'en'
                  ? 'Interactive Compiler / Translator Pipeline Simulator'
                  : 'Mô phỏng quy trình hoạt động của Chương trình dịch'}
              </h3>
              <p className="text-xs text-slate-400">
                {bilingualMode === 'en'
                  ? 'Watch high-level code transform step-by-step into CPU machine instructions'
                  : 'Quan sát từng bước câu lệnh Python bậc cao được chuyển đổi thành mã máy nhị phân'}
              </p>
            </div>
          </div>

          <button
            onClick={handleSimulateCompile}
            disabled={isCompiling}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Cpu className="w-4 h-4" />
            <span>
              {isCompiling
                ? bilingualMode === 'en'
                  ? 'Compiling...'
                  : 'Đang biên dịch...'
                : bilingualMode === 'en'
                ? 'Simulate Translator Pipeline'
                : 'Chạy chương trình dịch (Simulate)'}
            </span>
          </button>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className={`p-4 rounded-2xl border transition-all ${
              compileStep >= 1
                ? 'bg-blue-950/60 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                : 'bg-slate-800/40 border-slate-700/60 opacity-60'
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-blue-400 mb-1">
              {bilingualMode === 'en' ? 'STEP 1: HIGH-LEVEL SOURCE' : 'BƯỚC 1: MÃ NGUỒN BẬC CAO'}
            </div>
            <div className="font-mono text-xs bg-slate-950 p-2.5 rounded-xl text-emerald-300">
              {bilingualMode === 'en' ? 'print("Hello!", 3 + 7)' : sourceCodeInput}
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              {bilingualMode === 'en'
                ? 'Human-readable, independent of machine architecture.'
                : 'Dễ hiểu cho con người, độc lập với phần cứng.'}
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl border transition-all ${
              compileStep >= 2
                ? 'bg-purple-950/60 border-purple-500 shadow-md ring-1 ring-purple-500/40'
                : 'bg-slate-800/40 border-slate-700/60 opacity-60'
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-purple-400 mb-1">
              {bilingualMode === 'en' ? 'STEP 2: TRANSLATOR (PARSER)' : 'BƯỚC 2: CHƯƠNG TRÌNH DỊCH'}
            </div>
            <div className="font-mono text-xs bg-slate-950 p-2.5 rounded-xl text-purple-300">
              Lexer &rarr; Parser &rarr; Bytecode
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              {bilingualMode === 'en'
                ? 'Syntax validation and intermediate bytecode (.pyc) generation.'
                : 'Kiểm tra cú pháp và sinh mã bytecode trung gian (.pyc).'}
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl border transition-all ${
              compileStep >= 3
                ? 'bg-cyan-950/60 border-cyan-500 shadow-md ring-1 ring-cyan-500/40'
                : 'bg-slate-800/40 border-slate-700/60 opacity-60'
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-cyan-400 mb-1">
              {bilingualMode === 'en' ? 'STEP 3: PYTHON VIRTUAL MACHINE' : 'BƯỚC 3: MÁY ẢO PYTHON (PVM)'}
            </div>
            <div className="font-mono text-xs bg-slate-950 p-2.5 rounded-xl text-cyan-300">
              LOAD_CONST, BINARY_ADD
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              {bilingualMode === 'en'
                ? 'Executes bytecode across any target operating system.'
                : 'Thực thi bytecode trên mọi hệ điều hành.'}
            </p>
          </div>

          <div
            className={`p-4 rounded-2xl border transition-all ${
              compileStep >= 4
                ? 'bg-emerald-950/60 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                : 'bg-slate-800/40 border-slate-700/60 opacity-60'
            }`}
          >
            <div className="text-[10px] font-mono font-bold text-emerald-400 mb-1">
              {bilingualMode === 'en' ? 'STEP 4: MACHINE CODE & OUTPUT' : 'BƯỚC 4: MÃ MÁY & KẾT QUẢ'}
            </div>
            <div className="font-mono text-xs bg-slate-950 p-2.5 rounded-xl text-emerald-400 font-bold">
              &gt;&gt;&gt; {bilingualMode === 'en' ? 'Hello! 10' : 'Xin chào! 10'}
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              {bilingualMode === 'en'
                ? 'CPU executes binary instructions and displays terminal output.'
                : 'CPU tính toán nhị phân và xuất ra màn hình.'}
            </p>
          </div>
        </div>
      </div>

      {/* History & Key Strengths of Python (Page 87) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white border border-indigo-900/60 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-lg">
              1991
            </div>
            <div>
              <h4 className="font-bold text-slate-100">
                {bilingualMode === 'en' ? 'Guido van Rossum (Netherlands)' : 'Guido van Rossum (Hà Lan)'}
              </h4>
              <p className="text-xs text-indigo-300">
                {bilingualMode === 'en' ? 'Computer Scientist & Creator of Python' : 'Nhà khoa học máy tính sáng lập Python'}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Python was first released in 1991 with a design philosophy prioritizing elegance, minimalism, and readability. Being fully open-source, Python rapidly attracted millions of developers globally.'
              : 'Python được ra mắt lần đầu năm 1991 với triết lý thiết kế coi trọng tính trong sáng, tối giản và dễ đọc của mã nguồn. Nhờ mã nguồn mở hoàn toàn, Python nhanh chóng thu hút hàng triệu lập trình viên trên toàn thế giới cùng đóng góp phát triển.'}
          </p>
          <div className="p-3 rounded-2xl bg-black/40 border border-indigo-800/40 text-[11px] text-indigo-200">
            {bilingualMode === 'en'
              ? "💡 The name 'Python' originates from the BBC comedy show Monty Python's Flying Circus, which Guido was a fan of."
              : '💡 Tên gọi "Python" bắt nguồn từ chương trình hài kịch truyền hình Monty Python\'s Flying Circus của đài BBC mà Guido rất yêu thích.'}
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'Cross-Platform' : 'Đa nền tảng (Cross-Platform)'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Runs seamlessly across Windows, macOS, Linux, smartphones, and microcontrollers (Raspberry Pi, Micro:bit).'
                : 'Chạy mượt mà trên mọi hệ điều hành: Windows, macOS, Linux, điện thoại thông minh và các bo mạch vi điều khiển (Raspberry Pi, Micro:bit).'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Bot className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'AI & Data Science' : 'Trí tuệ nhân tạo & Dữ liệu'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'World-leading ecosystem for AI, Machine Learning, Deep Learning (TensorFlow, PyTorch), and data analytics.'
                : 'Kho thư viện phong phú hàng đầu thế giới về AI, Machine Learning, Deep Learning (TensorFlow, PyTorch) và phân tích dữ liệu khoa học.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'Clean, Intuitive Syntax' : 'Cú pháp đơn giản, tự nhiên'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Eliminates redundant semicolons and curly braces. Uses indentation to delineate code blocks with exceptional clarity.'
                : 'Loại bỏ dấu chấm phẩy và dấu ngoặc nhọn rườm rà. Dùng thụt đầu dòng (indentation) để phân cấp khối lệnh rõ ràng, mạch lạc.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'Gold Standard in Education' : 'Tiêu chuẩn trong giáo dục'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Adopted across national high school curricula and leading global universities as the ideal gateway to computer science.'
                : 'Được đưa vào chương trình SGK phổ thông và hầu hết các trường đại học hàng đầu thế giới như ngôn ngữ nhập môn lập trình lý tưởng.'}
            </p>
          </div>
        </div>
      </div>

      {/* Official SGK Summary Box (Trang 87) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border-2 border-dashed border-amber-400/80 dark:border-amber-700/80 space-y-2 text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText
            vi="HỘP GHI NHỚ TRỌNG TÂM (SGK TRANG 87)"
            en="CORE SUMMARY BOX (TEXTBOOK PAGE 87)"
          />
        </div>
        <ul className="space-y-2 text-xs sm:text-sm leading-relaxed list-disc pl-5">
          <li>
            <BilingualText
              vi="Ngôn ngữ lập trình bậc cao có các câu lệnh được viết gần với ngôn ngữ tự nhiên giúp cho việc đọc, hiểu chương trình dễ dàng hơn."
              en="High-level programming languages have statements written close to human natural languages, making programs easier to read and understand."
            />
          </li>
          <li>
            <BilingualText
              vi="Python là một ngôn ngữ lập trình bậc cao phổ biến trong nghiên cứu và giáo dục."
              en="Python is a high-level programming language widely used in research and education."
            />
          </li>
        </ul>
      </div>

      {/* Checkpoint Question (SGK Trang 87) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
            ?
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en'
              ? 'Checkpoint Question (Page 87): In your opinion, which type of language is easiest to program in?'
              : 'Câu hỏi củng cố (Trang 87): Theo em, viết chương trình bằng loại ngôn ngữ lập trình nào dễ nhất?'}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'A', labelVi: 'A. Ngôn ngữ máy', labelEn: 'A. Machine language' },
            { id: 'B', labelVi: 'B. Hợp ngữ', labelEn: 'B. Assembly language' },
            { id: 'C', labelVi: 'C. Ngôn ngữ lập trình bậc cao', labelEn: 'C. High-level language' }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedAnswer(opt.id)}
              className={`p-3.5 rounded-2xl text-xs font-bold text-left transition-all border-2 flex items-center justify-between ${
                selectedAnswer === opt.id
                  ? opt.id === 'C'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 shadow-sm'
                    : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
              }`}
            >
              <span>{bilingualMode === 'en' ? opt.labelEn : opt.labelVi}</span>
              {selectedAnswer === opt.id && (
                opt.id === 'C' ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-rose-600" />
              )}
            </button>
          ))}
        </div>

        {selectedAnswer === 'C' && (
          <div className="p-4 rounded-2xl text-xs leading-relaxed animate-in fade-in bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
            <p>
              <strong>{bilingualMode === 'en' ? 'Textbook Explanation: ' : 'Giải thích chuẩn SGK: '}</strong>
              {bilingualMode === 'en'
                ? 'High-level programming languages use familiar English words and standard mathematical notation, making code easy for humans to read, write, and maintain without needing to memorize binary bit patterns.'
                : 'Ngôn ngữ lập trình bậc cao sử dụng các từ ngữ tiếng Anh quen thuộc và ký hiệu toán học tự nhiên, giúp con người dễ đọc, dễ viết, dễ bảo trì và không cần phải nhớ các chuỗi bit nhị phân phức tạp.'}
            </p>
          </div>
        )}
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={16} />

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setCurrentPage(0)}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
        >
          {bilingualMode === 'en' ? '← Previous: Overview' : '← Quay lại: Tổng quan'}
        </button>

        <button
          onClick={() => setCurrentPage(2)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          <span>{bilingualMode === 'en' ? 'Next: 2. Python Environment →' : 'Tiếp theo: 2. Môi trường Python →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
