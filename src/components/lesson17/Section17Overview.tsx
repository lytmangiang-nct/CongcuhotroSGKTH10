import React from 'react';
import {
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Variable,
  Layers,
  KeyRound,
  Calculator,
  Compass
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { VariableMemory3DViewer } from './VariableMemory3DViewer';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section17Overview: React.FC = () => {
  const { bilingualMode, speak, isSpeaking, stopSpeaking, nextPage } = useBook();

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textVi =
        'Bài 17: Biến và lệnh gán. Sau bài học này, em sẽ biết cách thiết lập biến, phân biệt được biến và từ khoá, biết sử dụng lệnh gán và thực hiện một số phép toán trên kiểu số nguyên, số thực và xâu kí tự.';
      const textEn =
        'Lesson 17: Variables and Assignment Statements. After this lesson, you will know how to establish variables, distinguish variables from keywords, use assignment statements, and perform operations on integers, floats, and strings.';
      speak(bilingualMode === 'en' ? textEn : textVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-black tracking-wider uppercase">
              {bilingualMode === 'en'
                ? 'Topic 5: Problem Solving with Computers'
                : 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính'}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-md text-amber-200 text-xs font-bold">
              {bilingualMode === 'en'
                ? 'Informatics 10 • Pages 91 – 96'
                : 'SGK Tin học 10 • Trang 91 – 96'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {bilingualMode === 'en'
              ? 'Lesson 17: Variables and Assignment Statements'
              : 'Bài 17: Biến và lệnh gán'}
          </h1>

          <p className="text-amber-100 text-sm sm:text-base leading-relaxed font-medium">
            {bilingualMode === 'en'
              ? 'Discover Python memory architecture, dynamic identifier binding, operator precedence, string manipulations, and reserved keywords through interactive 3D simulations.'
              : 'Khám phá kiến trúc định danh vùng nhớ, cơ chế gán đồng thời linh hoạt, quy tắc ưu tiên toán tử số học, thao tác nối lặp xâu và tường lửa từ khoá trong Python.'}
          </p>
        </div>
      </div>

      {/* Core Objectives (Mục tiêu bài học - Trang 91) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-3 text-orange-600 dark:text-orange-400">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en' ? 'Lesson Objectives (Page 91)' : 'Sau bài này em sẽ (Mục tiêu bài học)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                {bilingualMode === 'en'
                  ? 'Establish Variables & Recognize Keywords'
                  : 'Thiết lập biến & Phân biệt từ khoá'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {bilingualMode === 'en'
                  ? 'Understand how identifiers point to memory cells and comply with naming rules without colliding with reserved Python keywords.'
                  : 'Biết cách thiết lập biến trong vùng nhớ RAM, tuân thủ các quy tắc đặt tên hợp lệ và phân biệt rạch ròi giữa biến với 35 từ khoá của Python.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                {bilingualMode === 'en'
                  ? 'Master Assignments & Arithmetic/String Operations'
                  : 'Sử dụng lệnh gán & Thực hiện phép toán đa kiểu'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {bilingualMode === 'en'
                  ? 'Utilize simultaneous assignment, compute integer arithmetic (+, -, *, /, //, %, **), and execute string concatenation (+) and repetition (*).'
                  : 'Biết sử dụng lệnh gán đơn và gán đồng thời, thực hiện thành thạo các phép toán trên số nguyên, số thực và phép nối, lặp xâu kí tự.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Activity (Khởi động - Trang 91) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center gap-3 text-amber-400">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-lg sm:text-xl font-black">
            {bilingualMode === 'en'
              ? 'Warm-Up Challenge: From Algebra to Programming Variables (Page 91)'
              : 'Khởi động: Từ Đại số toán học đến Biến trong Lập trình (Trang 91)'}
          </h2>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'In Algebra, letters substitute for specific quantities; for example, the identity (a + b)² = a² + 2ab + b² holds true for all numbers a and b. Similarly, programming languages utilize named symbols called variables to represent data dynamically.'
              : 'Trong Đại số, người ta dùng chữ cái để thay thế cho số cụ thể, ví dụ hằng đẳng thức (a + b)² = a² + 2ab + b² đúng cho mọi giá trị a, b. Trong các ngôn ngữ lập trình, người ta cũng dùng các ký tự hoặc nhóm ký tự được gọi là biến (variable) để thay cho việc phải chỉ ra các giá trị dữ liệu cụ thể.'}
          </p>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold flex items-center gap-2">
            <Compass className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              {bilingualMode === 'en'
                ? 'In your opinion, what significant benefits does using variables bring to programming?'
                : 'Theo em, việc sử dụng biến trong lập trình mang lại những lợi ích to lớn gì?'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="font-extrabold text-amber-400 text-xs sm:text-sm">
              {bilingualMode === 'en' ? '1. Algorithm Generalization' : '1. Khái quát hoá thuật toán'}
            </div>
            <p className="text-slate-400 text-xs">
              {bilingualMode === 'en'
                ? 'Programs can process countless different input datasets without rewriting the underlying source code.'
                : 'Chương trình có thể xử lý cho vô số bộ dữ liệu đầu vào khác nhau mà không phải viết lại mã nguồn.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="font-extrabold text-cyan-400 text-xs sm:text-sm">
              {bilingualMode === 'en' ? '2. Reusability & Memory Efficiency' : '2. Tái sử dụng & Tiết kiệm bộ nhớ'}
            </div>
            <p className="text-slate-400 text-xs">
              {bilingualMode === 'en'
                ? 'Stores intermediate results of complex computations for multiple reuses without re-evaluating.'
                : 'Lưu trữ kết quả trung gian của phép tính phức tạp để tái sử dụng nhiều lần mà không cần tính lại.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="font-extrabold text-emerald-400 text-xs sm:text-sm">
              {bilingualMode === 'en' ? '3. Readability & Maintainability' : '3. Dễ đọc, hiểu & Bảo trì'}
            </div>
            <p className="text-slate-400 text-xs">
              {bilingualMode === 'en'
                ? 'Meaningful variable names like radius, average_score make the source code clean, readable, and professional.'
                : 'Tên biến có ý nghĩa như ban_kinh, diem_trung_binh giúp mã nguồn sáng rõ và chuyên nghiệp.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3D WebGL Simulation Showcase */}
      <div>
        <div className="mb-2">
          <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Variable className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span>
              {bilingualMode === 'en'
                ? '3D Interactive Memory & Variable Simulation Lab'
                : 'Phòng Thí nghiệm 3D Tương tác Không gian Bộ nhớ & Biến'}
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {bilingualMode === 'en'
              ? 'Explore 4 interactive modes: RAM cells, exponentiation precedence tower, 35 reserved keywords firewall, and variable swap.'
              : 'Trải nghiệm trực quan 4 chế độ: Ô nhớ RAM, Tháp độ ưu tiên toán tử lũy thừa, Tường lửa 35 từ khóa, và Tráo đổi biến tức thời.'}
          </p>
        </div>
        <VariableMemory3DViewer initialMode="memory" />
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={17} />

      {/* Next Section Button */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:scale-95 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
        >
          <span>
            {bilingualMode === 'en'
              ? 'Explore Section 1: Variables and Assignments'
              : 'Khám phá Mục 1: Biến và lệnh gán'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
