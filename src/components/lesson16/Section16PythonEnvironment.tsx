import React, { useState } from 'react';
import {
  Terminal,
  FileCode,
  CheckCircle2,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  RotateCcw,
  HelpCircle,
  Check,
  X,
  Layers,
  Lightbulb
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

interface HistoryItem {
  command: string;
  output: string;
  isError?: boolean;
}

export const Section16PythonEnvironment: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();

  // Mode view tabs
  const [activeTab, setActiveTab] = useState<'interactive' | 'script'>('interactive');

  // Interactive REPL prompt state
  const [currentInput, setCurrentInput] = useState<string>('3 + 7');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: '5',
      output: '5'
    },
    {
      command: '2.6',
      output: '2.6'
    },
    {
      command: '"học sinh lớp 10"',
      output: "'học sinh lớp 10'"
    }
  ]);

  // Checkpoint question 1 state (Trang 88)
  const [q1Answer, setQ1Answer] = useState<'dung' | 'sai' | null>(null);

  // Script Mode simulator state
  const [hasCustomizedScript, setHasCustomizedScript] = useState<boolean>(false);
  const [scriptLines, setScriptLines] = useState<string>(
    '# Chương trình đầu tiên trong tệp Bai1.py\nprint("Xin chào!")\nprint(5 + 2*7)'
  );
  const [scriptOutput, setScriptOutput] = useState<string | null>(null);
  const [isRunningScript, setIsRunningScript] = useState<boolean>(false);

  // Sync default template when user hasn't customized code
  const isEn = bilingualMode === 'en';
  const currentScriptCode = hasCustomizedScript
    ? scriptLines
    : isEn
    ? '# First program in Bai1.py file\nprint("Hello!")\nprint(5 + 2*7)'
    : '# Chương trình đầu tiên trong tệp Bai1.py\nprint("Xin chào!")\nprint(5 + 2*7)';

  // Evaluate interactive input safely in sandbox
  const handleExecuteInteractive = () => {
    const trimmed = currentInput.trim();
    if (!trimmed) return;

    let out = '';
    let isErr = false;

    try {
      // Handle simple math & print simulation
      if (trimmed === 'quit()' || trimmed === 'exit()') {
        out = 'Python session ended. Re-initializing shell...';
      } else if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
        const inside = trimmed.slice(6, -1);
        // evaluate print arguments
        if (inside.includes(',')) {
          const parts = inside.split(',').map((p) => p.trim());
          out = parts
            .map((p) => {
              if ((p.startsWith('"') && p.endsWith('"')) || (p.startsWith("'") && p.endsWith("'"))) {
                return p.slice(1, -1);
              }
              try {
                // eslint-disable-next-line no-eval
                return String(eval(p));
              } catch {
                return p;
              }
            })
            .join(' ');
        } else {
          if ((inside.startsWith('"') && inside.endsWith('"')) || (inside.startsWith("'") && inside.endsWith("'"))) {
            out = inside.slice(1, -1);
          } else {
            // eslint-disable-next-line no-eval
            out = String(eval(inside));
          }
        }
      } else if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        out = `'${trimmed.replace(/['"]/g, '')}'`;
      } else {
        // eslint-disable-next-line no-eval
        const res = eval(trimmed);
        out = String(res);
      }
    } catch {
      out = 'SyntaxError: invalid syntax';
      isErr = true;
    }

    setHistory((prev) => [...prev, { command: trimmed, output: out, isError: isErr }]);
    setCurrentInput('');
  };

  const handleRunScript = () => {
    setIsRunningScript(true);
    setScriptOutput(null);
    setTimeout(() => {
      const greeting = isEn ? 'Hello!' : 'Xin chào!';
      setScriptOutput(`==================== RESTART: Bai1.py ====================\n${greeting}\n19`);
      setIsRunningScript(false);
    }, 700);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-900 via-teal-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-cyan-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Section 2 • Pages 87–88' : 'Mục 2 • Trang 87 – 88'}
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-100 text-xs font-mono font-semibold">
              Interactive &gt;&gt;&gt; vs Script File .py
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '2. PYTHON PROGRAMMING ENVIRONMENT & MODES'
              : '2. MÔI TRƯỜNG LẬP TRÌNH PYTHON'}
          </h2>

          <p className="text-sm sm:text-base text-cyan-100/90 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Get acquainted with Python IDLE. Master the instant feedback of the interactive prompt (>>>) for rapid arithmetic checks, and harness the multi-line power of the script editor for production programs.'
              : 'Làm quen với môi trường IDLE chuẩn của Python. Thành thạo phản hồi tức thì của dấu nhắc trực tiếp (>>>) khi tính toán nhanh, và khai thác sức mạnh của cửa sổ soạn thảo để lưu trữ và chạy các chương trình nhiều dòng.'}
          </p>

          {bilingualMode !== 'vi' && (
            <div className="pt-2">
              <button
                onClick={() =>
                  speak(
                    bilingualMode === 'en'
                      ? 'Section 2: Python Programming Environment. Python provides two operating modes: Interactive mode and Script mode. In interactive mode, commands are entered after the >>> prompt and evaluated immediately upon pressing Enter. In script mode, full programs are written in an editor window, saved as .py files, and executed sequentially using F5.'
                      : 'Mục 2: Môi trường lập trình Python. Phần mềm Python cho phép soạn thảo và thực hiện các chương trình Python hoàn chỉnh hoặc từng câu lệnh. Môi trường lập trình Python có hai chế độ: Chế độ gõ lệnh trực tiếp thường dùng để tính toán và kiểm tra nhanh các lệnh sau dấu nhắc ba dấu lớn hơn. Chế độ soạn thảo dùng để viết các chương trình có nhiều dòng lệnh, lưu tệp và nhấn F5 để chạy.'
                  )
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                <span>{bilingualMode === 'en' ? 'EN' : 'VI'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mode Comparison Overview Cards (SGK Trang 87–88) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mode A: Interactive */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border-2 border-cyan-500/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">
                  {bilingualMode === 'en' ? 'a) Interactive Mode' : 'a) Chế độ gõ lệnh trực tiếp'}
                </h3>
                <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                  {bilingualMode === 'en' ? 'Prompt >>>' : 'Dấu nhắc >>>'}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-200 text-xs font-bold">
              {bilingualMode === 'en' ? 'Figure 16.2' : 'Hình 16.2'}
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'In an interactive session, you enter commands directly after the >>> prompt and press Enter. The result appears on the very next line. Perfect for calculating values and rapid prototyping.'
              : 'Trong một phiên làm việc với Python, em có thể gõ lệnh trực tiếp sau dấu nhắc >>> và nhấn phím Enter để thực hiện lệnh. Kết quả hiển thị ngay ở dòng tiếp theo, rất thuận tiện để tính toán và kiểm tra nhanh.'}
          </p>

          <div className="p-3 rounded-2xl bg-slate-900 text-cyan-300 font-mono text-xs space-y-1">
            <div><span className="text-slate-500">&gt;&gt;&gt;</span> 3 + 7</div>
            <div className="text-white font-bold">10</div>
            <div><span className="text-slate-500">&gt;&gt;&gt;</span> 12*5</div>
            <div className="text-white font-bold">60</div>
          </div>
        </div>

        {/* Mode B: Script Mode */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border-2 border-indigo-500/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <FileCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100">
                  {bilingualMode === 'en' ? 'b) Script Mode' : 'b) Chế độ soạn thảo'}
                </h3>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-bold">File / New File (F5)</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 text-xs font-bold">
              {bilingualMode === 'en' ? 'Figure 16.3' : 'Hình 16.3'}
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Open via File / New File. Write multiple lines of code, save with Ctrl + S (.py extension), and run the entire module with F5. Results stream into the IDLE Shell output window.'
              : 'Chọn File / New File để mở cửa sổ soạn thảo độc lập. Viết mỗi lệnh trên một dòng, lưu tệp bằng phím tắt Ctrl + S (tên có đuôi .py) và nhấn F5 để chạy chương trình từ đầu đến cuối.'}
          </p>

          <div className="p-3 rounded-2xl bg-slate-900 text-indigo-200 font-mono text-xs space-y-1">
            <div className="text-slate-400"># Bai1.py</div>
            <div>print(<span className="text-emerald-300">"Xin chào"</span>)</div>
            <div>print(5 + 2*7)</div>
          </div>
        </div>
      </div>

      {/* Interactive Hands-On Workspace Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100">
                {bilingualMode === 'en'
                  ? 'Live IDLE Shell & Script Execution Sandbox'
                  : 'Trình mô phỏng trực tiếp Môi trường Python IDLE'}
              </h3>
              <p className="text-xs text-slate-400">
                {bilingualMode === 'en'
                  ? 'Switch between direct >>> prompt evaluation and multi-line script execution'
                  : 'Chuyển đổi giữa chế độ gõ lệnh trực tiếp >>> và chế độ soạn thảo tệp script .py'}
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex gap-1.5 p-1 bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'interactive'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {bilingualMode === 'en' ? 'Interactive Mode (>>>)' : 'Chế độ Gõ trực tiếp (>>>)'}
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'script'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {bilingualMode === 'en' ? 'Script Editor Mode (Bai1.py)' : 'Chế độ Soạn thảo (Bai1.py)'}
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive REPL Shell */}
        {activeTab === 'interactive' && (
          <div className="space-y-4">
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl bg-slate-800 border-b border-slate-700 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-2 font-bold text-slate-200">Python 3.9.1 IDLE Shell</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {bilingualMode === 'en' ? 'Interactive Direct Execution Mode' : 'Chế độ gõ lệnh trực tiếp'}
              </span>
            </div>

            {/* Shell Body */}
            <div className="p-4 rounded-b-2xl bg-black font-mono text-xs space-y-2 min-h-[220px] max-h-[320px] overflow-y-auto border border-slate-800">
              <div className="text-slate-400">
                Python 3.9.1 (tags/v3.9.1:1e5d33e, Dec 7 2020) [MSC v.1927 64 bit (AMD64)] on win32<br />
                Type "help", "copyright", "credits" or "license()" for more information.
              </div>

              {history.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-cyan-400">
                    <span className="text-slate-500 font-bold">&gt;&gt;&gt; </span>
                    {item.command}
                  </div>
                  <div className={item.isError ? 'text-rose-400 font-bold' : 'text-slate-100 font-semibold'}>
                    {item.output}
                  </div>
                </div>
              ))}

              {/* Current Input Line */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-slate-400 font-bold">&gt;&gt;&gt;</span>
                <input
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleExecuteInteractive();
                  }}
                  placeholder={
                    bilingualMode === 'en'
                      ? "Type command (e.g., 12*5, 10 + 7/2, print('Hello!'))..."
                      : "Gõ lệnh (ví dụ: 12*5, 10 + 7/2, print('Xin chào'))..."
                  }
                  className="flex-1 bg-transparent border-0 text-cyan-300 focus:outline-none text-xs font-mono"
                  autoFocus
                />
                <button
                  onClick={handleExecuteInteractive}
                  className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold"
                >
                  Enter
                </button>
              </div>
            </div>

            {/* Quick Sample Command Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-semibold text-[11px]">
                {bilingualMode === 'en' ? 'Textbook sample commands:' : 'Lệnh mẫu SGK:'}
              </span>
              {[
                '3 + 7',
                '12*5',
                '5/2',
                '12 + 1.5',
                isEn ? 'print("Hello!")' : 'print("Xin chào!")',
                'print("3 + 7 =", 3+7)',
                'quit()'
              ].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => setCurrentInput(cmd)}
                  className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] border border-slate-700 transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Script Editor */}
        {activeTab === 'script' && (
          <div className="space-y-4">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-4 py-2 rounded-t-2xl bg-slate-800 border-b border-slate-700 text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="font-bold text-indigo-300">Bai1.py - C:/Users/Admin/AppData/...</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400">File Edit Format Run Options</span>
                <button
                  onClick={handleRunScript}
                  disabled={isRunningScript}
                  className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>{isRunningScript ? (isEn ? 'Running...' : 'Đang chạy...') : 'Run Module (F5)'}</span>
                </button>
              </div>
            </div>

            {/* Editor Code Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  {bilingualMode === 'en' ? 'Source Code Editor Window:' : 'Cửa sổ soạn thảo mã nguồn:'}
                </span>
                <textarea
                  value={currentScriptCode}
                  onChange={(e) => {
                    setScriptLines(e.target.value);
                    setHasCustomizedScript(true);
                  }}
                  rows={8}
                  className="w-full p-3 rounded-xl bg-black text-slate-100 font-mono text-xs border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 block mb-1">
                  {bilingualMode === 'en' ? 'Execution Output in IDLE Shell:' : 'Kết quả xuất ra tại IDLE Shell:'}
                </span>
                <div className="w-full h-[162px] p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs border border-slate-800 overflow-y-auto whitespace-pre-wrap">
                  {scriptOutput ||
                    (bilingualMode === 'en'
                      ? 'Press "Run Module (F5)" above to execute the script...'
                      : 'Nhấn nút "Run Module (F5)" ở trên để thực thi chương trình...')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official SGK Summary Box (Trang 88) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border-2 border-dashed border-amber-400/80 dark:border-amber-700/80 space-y-2 text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText
            vi="HỘP GHI NHỚ TRỌNG TÂM (SGK TRANG 88)"
            en="CORE SUMMARY BOX (TEXTBOOK PAGE 88)"
          />
        </div>
        <div className="text-xs sm:text-sm leading-relaxed">
          <BilingualText
            vi="Môi trường lập trình của Python có hai chế độ: chế độ gõ lệnh trực tiếp và chế độ soạn thảo."
            en="Python's programming environment offers two operating modes: interactive direct-command mode and script editor mode."
          />
        </div>
      </div>

      {/* Checkpoint Questions (SGK Trang 88) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Question 1: Dấu nhắc vs con trỏ */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {bilingualMode === 'en'
                ? 'Question 1: The prompt (>>>) is the cursor of the Python editor. True or False?'
                : 'Câu hỏi 1 (Trang 88): Dấu nhắc chính là con trỏ soạn thảo chương trình Python. Đúng hay sai?'}
            </h4>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={() => setQ1Answer('dung')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                q1Answer === 'dung'
                  ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {bilingualMode === 'en' ? 'True' : 'Đúng'}
            </button>
            <button
              onClick={() => setQ1Answer('sai')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                q1Answer === 'sai'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {bilingualMode === 'en' ? 'False' : 'Sai'}
            </button>
          </div>

          {q1Answer === 'sai' && (
            <div className="p-3 rounded-2xl text-xs leading-relaxed animate-in fade-in bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
              <p>
                <strong>
                  {bilingualMode === 'en'
                    ? 'Textbook Explanation: This statement is FALSE. '
                    : 'Giải thích chuẩn SGK: Phát biểu này SAI. '}
                </strong>
                {bilingualMode === 'en'
                  ? 'The >>> prompt is a signal that Python is ready to evaluate a command in interactive mode. The cursor is the blinking vertical bar showing where the next typed character will appear.'
                  : 'Dấu nhắc >>> là ký hiệu báo hiệu môi trường Python đã sẵn sàng nhận lệnh trong chế độ trực tiếp. Con trỏ soạn thảo (cursor) là vạch thẳng nhấp nháy cho biết vị trí ký tự tiếp theo được gõ vào.'}
              </p>
            </div>
          )}
        </div>

        {/* Question 2: Giống và khác nhau */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {bilingualMode === 'en'
                ? 'Question 2: Compare Interactive Mode vs. Script Mode similarities and differences?'
                : 'Câu hỏi 2 (Trang 88): Điểm giống nhau và khác nhau giữa 2 chế độ làm việc?'}
            </h4>
          </div>

          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-0.5">
                {bilingualMode === 'en' ? 'Similarities:' : 'Giống nhau:'}
              </strong>
              {bilingualMode === 'en'
                ? 'Both share identical Python syntax, call the same built-in functions, and produce identical computational results.'
                : 'Cả hai đều cùng sử dụng chung cú pháp ngôn ngữ Python, cùng gọi các hàm chuẩn và cho ra kết quả tính toán như nhau.'}
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <strong className="text-blue-600 dark:text-blue-400 block mb-0.5">
                {bilingualMode === 'en' ? 'Differences:' : 'Khác nhau:'}
              </strong>
              {bilingualMode === 'en'
                ? 'Interactive mode executes each command line immediately upon pressing Enter without saving to a file. Script mode allows writing multi-line programs and saving them as .py files for reuse and sharing.'
                : 'Chế độ gõ trực tiếp chạy từng lệnh sau Enter, không lưu lại thành file. Chế độ soạn thảo viết nhiều dòng lệnh, lưu lại thành tệp .py để tái sử dụng và chia sẻ.'}
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={16} />

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setCurrentPage(1)}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
        >
          {bilingualMode === 'en' ? '← Previous: High-Level Language' : '← Quay lại: Ngôn ngữ bậc cao'}
        </button>

        <button
          onClick={() => setCurrentPage(3)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          <span>{bilingualMode === 'en' ? 'Next: 3. First Python Commands →' : 'Tiếp theo: 3. Các lệnh đầu tiên →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
