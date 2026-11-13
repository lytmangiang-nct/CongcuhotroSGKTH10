import React, { useState } from 'react';
import {
  Code,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ArrowRight,
  Sparkles,
  Cpu,
  Layers,
  Terminal,
  FileCode,
  BookOpen
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { PythonEnvironment3DViewer } from './PythonEnvironment3DViewer';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section16Overview: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();

  // Warm-up interactive state comparing the 3 snippets in Figure 16.1
  const [selectedLanguage, setSelectedLanguage] = useState<'machine' | 'assembly' | 'python'>('python');
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Topic 5 • Lesson 16 • Pages 86–90' : 'Chủ đề 5 • Bài 16 • Trang 86 – 90'}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 text-xs font-mono font-bold">
              Guido van Rossum • 1991
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? 'LESSON 16: HIGH-LEVEL PROGRAMMING LANGUAGES & PYTHON'
              : 'BÀI 16: NGÔN NGỮ LẬP TRÌNH BẬC CAO VÀ PYTHON'}
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Step into Topic 5: Problem Solving with Computers! Discover the evolution from cryptic binary machine code to Python\'s human-readable elegance. Master the IDLE development environment in both Interactive and Script modes.'
              : 'Bước vào Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính! Khám phá sự tiến hóa từ mã máy nhị phân phức tạp tới cú pháp tiếng Anh tự nhiên của Python. Làm chủ môi trường IDLE với 2 chế độ làm việc cốt lõi.'}
          </p>

          {bilingualMode !== 'vi' && (
            <div className="pt-2">
              <button
                onClick={() =>
                  speak(
                    bilingualMode === 'en'
                      ? 'Lesson 16: High-Level Programming Languages and Python. After this lesson, you will understand the concept of high-level programming languages and Python, distinguish between interactive mode and script mode in Python IDLE, and know how to create and execute your first Python program.'
                      : 'Bài 16: Ngôn ngữ lập trình bậc cao và Python. Sau bài học này, em sẽ: Biết khái niệm ngôn ngữ lập trình bậc cao và ngôn ngữ Python; Phân biệt được chế độ gõ lệnh trực tiếp và chế độ soạn thảo chương trình trong môi trường Python; Biết cách tạo và thực hiện một chương trình Python.'
                  )
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur transition-colors"
              >
                <Volume2 className="w-4 h-4 text-blue-300" />
                <span>{bilingualMode === 'en' ? 'Listen to Overview' : 'Nghe mục tiêu bài học'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3 Core Learning Objectives (SGK Trang 86) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {bilingualMode === 'en' ? '1. High-Level Language & Python' : '1. Khái niệm Ngôn ngữ bậc cao & Python'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Understand what makes a language high-level and why Python (1991) is so prominent.'
                : 'Hiểu bản chất câu lệnh gần với ngôn ngữ tự nhiên và lịch sử ra đời của Python (1991).'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {bilingualMode === 'en' ? '2. Interactive vs. Script Mode' : '2. Phân biệt 2 chế độ làm việc'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Master the >>> interactive prompt for quick tests and the script editor for files.'
                : 'Thành thạo dấu nhắc >>> để kiểm tra nhanh và cửa sổ soạn thảo lưu tệp .py.'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {bilingualMode === 'en' ? '3. First Python Program (Bai1.py)' : '3. Tạo & Chạy chương trình đầu tiên'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Compose, save (Ctrl+S), and execute (F5) Bai1.py using print() and comments (#).'
                : 'Soạn thảo, lưu tệp (Ctrl+S) và chạy (F5) chương trình Bai1.py in ra lời chào.'}
            </p>
          </div>
        </div>
      </div>

      {/* Professional Three.js 3D Interactive Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Professional 3D Interactive Python Simulation'
                  : 'Mô phỏng 3D Three.js: Cấu trúc & Môi trường thực thi Python'}
              </h2>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Explore the 3 language tiers, the dual-screen IDLE workstation, and dynamic memory'
                  : 'Tương tác trực quan 3 cấp độ ngôn ngữ, bàn làm việc IDLE hai màn hình và bộ nhớ động'}
              </p>
            </div>
          </div>
        </div>

        <PythonEnvironment3DViewer />
      </div>

      {/* Warm-up Activity: Figure 16.1 Code Snippets Comparison */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              ?
            </div>
            <div>
              <h3 className="font-black text-base text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Warm-up Challenge: Comparing 3 Programming Language Snippets (Figure 16.1)'
                  : 'Khởi động: So sánh các đoạn chương trình ở 3 ngôn ngữ khác nhau (Hình 16.1)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Observe the code snippets in Figure 16.1 and determine which language is easiest to comprehend.'
                  : 'Quan sát các đoạn chương trình trong Hình 16.1 và cho biết câu lệnh trong ngôn ngữ nào dễ hiểu nhất.'}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Snippets Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Option A: Machine Language */}
          <div
            onClick={() => setSelectedLanguage('machine')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2.5 ${
              selectedLanguage === 'machine'
                ? 'border-slate-500 bg-slate-100 dark:bg-slate-900 shadow-md'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {bilingualMode === 'en' ? '1. Machine Language (Binary)' : '1. Ngôn ngữ máy (Binary)'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 font-mono">
                {bilingualMode === 'en' ? 'Lowest Level' : 'Mức thấp nhất'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto">
              01101101 01101001 01101110 00100000<br />
              01101110 00100000 01110100 01110010<br />
              11100001 10111010 10100001 01101110<br />
              10100101 01110100 00100000 11000100
            </div>
            <p className="text-[11px] text-slate-500">
              {bilingualMode === 'en'
                ? 'Consists purely of 0s and 1s, extremely difficult for humans to remember and write.'
                : 'Chỉ gồm số 0 và 1, cực kỳ khó nhớ và khó viết đối với con người.'}
            </p>
          </div>

          {/* Option B: Assembly Language */}
          <div
            onClick={() => setSelectedLanguage('assembly')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2.5 ${
              selectedLanguage === 'assembly'
                ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-md'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {bilingualMode === 'en' ? '2. Assembly Language' : '2. Hợp ngữ (Assembly)'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-mono">
                {bilingualMode === 'en' ? 'Mnemonics' : 'Từ viết tắt'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-[11px] leading-relaxed overflow-x-auto">
              0013 &nbsp;RESETA EQU %00010011<br />
              0011 &nbsp;CTLREG EQU %00010001<br />
              C003 &nbsp;INITA &nbsp;LDA A #RESETA<br />
              C005 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STA A ACIA
            </div>
            <p className="text-[11px] text-slate-500">
              {bilingualMode === 'en'
                ? 'Uses English mnemonic abbreviations (LDA, STA) but remains tightly tied to processor hardware.'
                : 'Dùng mã gợi nhớ tiếng Anh (LDA, STA) nhưng vẫn phụ thuộc phần cứng vi xử lý.'}
            </p>
          </div>

          {/* Option C: Python Language */}
          <div
            onClick={() => setSelectedLanguage('python')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer space-y-2.5 ${
              selectedLanguage === 'python'
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-md ring-2 ring-emerald-500/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span>{bilingualMode === 'en' ? '3. Python Language' : '3. Ngôn ngữ Python'}</span>
                <span className="text-[10px] text-emerald-600 font-normal">
                  {bilingualMode === 'en' ? '⭐ Easiest to understand' : '⭐ Dễ hiểu nhất'}
                </span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-mono">
                {bilingualMode === 'en' ? 'High-Level' : 'Bậc cao'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto">
              <span className="text-slate-400">
                {bilingualMode === 'en'
                  ? '# Read sequence of n numbers and compute sum'
                  : '# Nhập từ bàn phím dãy n số và tính tổng'}
              </span><br />
              <span className="text-pink-400">n</span> = <span className="text-cyan-400">int</span>(<span className="text-cyan-400">input</span>(<span className="text-emerald-300">{bilingualMode === 'en' ? '"Enter n: "' : '"Nhập n: "'}</span>))<br />
              <span className="text-pink-400">s</span> = <span className="text-amber-300">0</span><br />
              <span className="text-purple-400">for</span> i <span className="text-purple-400">in</span> <span className="text-cyan-400">range</span>(n):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;a = <span className="text-cyan-400">int</span>(<span className="text-cyan-400">input</span>(<span className="text-emerald-300">{bilingualMode === 'en' ? '"Enter number: "' : '"Nhập số: "'}</span>))<br />
              &nbsp;&nbsp;&nbsp;&nbsp;s = s + a<br />
              <span className="text-cyan-400">print</span>(<span className="text-emerald-300">{bilingualMode === 'en' ? '"Total is:"' : '"Tổng là:"'}</span>, s)
            </div>
            <p className="text-[11px] text-slate-500">
              {bilingualMode === 'en'
                ? 'Clean syntax akin to natural English and mathematics, readable by anyone!'
                : 'Cú pháp trong sáng, giống như tiếng Anh tự nhiên và toán học, ai cũng đọc hiểu được!'}
            </p>
          </div>
        </div>

        {/* Evaluation Summary */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-100 block">
              {bilingualMode === 'en'
                ? 'Key Takeaway from Warm-up Activity (Textbook Page 86):'
                : 'Kết luận rút ra từ Hoạt động Khởi động (SGK Trang 86):'}
            </span>
            <p>
              {bilingualMode === 'en'
                ? 'Python is the easiest to comprehend because statements use intuitive English words (print, input, for) and natural mathematical expressions, freeing programmers from binary hardware hurdles.'
                : 'Ngôn ngữ Python là dễ hiểu nhất vì các câu lệnh được viết bằng từ ngữ tiếng Anh thông dụng (print, input, for) và biểu thức toán học tự nhiên, giải phóng người lập trình khỏi các rào cản phần cứng nhị phân.'}
            </p>
          </div>

          <button
            onClick={() => setCurrentPage(1)}
            className="shrink-0 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
          >
            <span>{bilingualMode === 'en' ? 'Explore High-Level Languages →' : 'Khám phá Ngôn ngữ bậc cao →'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={16} />

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <span className="text-xs text-slate-400 font-mono">
          {bilingualMode === 'en' ? 'Section 0 / 5 • Lesson 16 Overview' : 'Phần 0 / 5 • Tổng quan Bài 16'}
        </span>

        <button
          onClick={() => setCurrentPage(1)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          <span>{bilingualMode === 'en' ? 'Next: 1. High-Level Language →' : 'Tiếp theo: 1. Ngôn ngữ bậc cao →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
