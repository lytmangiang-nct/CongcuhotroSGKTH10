import React, { useState } from 'react';
import {
  FileCode,
  CheckCircle2,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  Save,
  FilePlus,
  Power,
  RotateCcw,
  Check
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section16PracticeLab: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();
  const isEn = bilingualMode === 'en';

  // Active step in the 6-step practical procedure
  const [activeStep, setActiveStep] = useState<number>(1);

  // Virtual IDE Editor State with edit tracking to preserve student code
  const [hasCustomizedCode, setHasCustomizedCode] = useState<boolean>(false);
  const [sourceCode, setSourceCode] = useState<string>(
    isEn ? '# First program\nprint("Hello!")' : '# Chương trình đầu tiên\nprint("Xin chào!")'
  );
  const [fileName, setFileName] = useState<string>('Bai1.py');
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Python 3.9.1 Shell ready. Type code or run script (F5).'
  ]);

  // Synchronize default code when toggling language ONLY if student has not edited it
  React.useEffect(() => {
    if (!hasCustomizedCode) {
      setSourceCode(
        bilingualMode === 'en'
          ? '# First program\nprint("Hello!")'
          : '# Chương trình đầu tiên\nprint("Xin chào!")'
      );
    }
  }, [bilingualMode, hasCustomizedCode]);

  const handleRunF5 = () => {
    setIsRunning(true);
    setTimeout(() => {
      // Simulate running Python script
      const lines = sourceCode.split('\n');
      const outputs: string[] = [
        `==================== RESTART: C:/Users/Admin/${fileName} ====================`
      ];

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('#') || !trimmed) return; // ignore comments & blank
        if (trimmed.startsWith('print(') && trimmed.endsWith(')')) {
          const content = trimmed.slice(6, -1);
          if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
            outputs.push(content.slice(1, -1));
          } else {
            try {
              // eslint-disable-next-line no-eval
              outputs.push(String(eval(content)));
            } catch {
              outputs.push(content);
            }
          }
        }
      });

      setTerminalOutput(outputs);
      setIsRunning(false);
    }, 600);
  };

  const handleQuitSession = () => {
    setTerminalOutput((prev) => [
      ...prev,
      '>>> quit()',
      'Session closed. Goodbye!'
    ]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-indigo-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Practical Lab • Pages 89–90' : 'Thực hành • Trang 89 – 90'}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-mono font-semibold">
              Bai1.py • F5 Run Module
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '4. PRACTICAL LAB: CREATE & EXECUTE BAI1.PY'
              : '4. THỰC HÀNH: TẠO VÀ CHẠY CHƯƠNG TRÌNH ĐẦU TIÊN (BAI1.PY)'}
          </h2>

          <p className="text-sm sm:text-base text-indigo-100/90 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Follow the official 6-step procedure: launch IDLE, create a new script file, author your first program with comments (#), save to disk with Ctrl+S, run with F5, and terminate cleanly.'
              : 'Thực hiện chuẩn xác 6 bước theo SGK: Khởi động IDLE, tạo tệp soạn thảo mới, viết câu lệnh kèm dòng chú thích (#), lưu tệp bằng Ctrl+S, bấm F5 để chạy và kết thúc phiên làm việc an toàn.'}
          </p>

          {bilingualMode !== 'vi' && (
            <div className="pt-2">
              <button
                onClick={() =>
                  speak(
                    bilingualMode === 'en'
                      ? 'Practical Lab: Creating and executing your first Python program. Task: Use Python script mode to create, type, and run your first program named Bai1.py. Follow 6 steps: launch Python IDLE, choose File New, type your code with comments using hash, save with Ctrl S, run with F5, and quit cleanly.'
                      : 'Thực hành: Tạo và chạy chương trình đầu tiên. Nhiệm vụ: Sử dụng chế độ soạn thảo chương trình của Python để tạo, nhập và chạy chương trình đầu tiên có tên Bai1.py. Gồm 6 bước: Khởi động Python; Chọn File New; Nhập nội dung chương trình; Lưu tệp bằng Ctrl S; Nhấn F5 để thực hiện; Kết thúc phiên làm việc bằng lệnh quit().'
                  )
                }
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur transition-colors"
              >
                <Volume2 className="w-4 h-4 text-indigo-300" />
                <span>{bilingualMode === 'en' ? 'Listen to Lab Instructions' : 'Nghe hướng dẫn thực hành'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 6-Step Stepper Component according to SGK Page 89-90 */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
          <span className="font-black text-sm text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {isEn
                ? 'Six-Step Textbook Lab Procedure (Pages 89–90)'
                : 'Quy trình 6 bước thực hành chuẩn SGK (Trang 89 – 90)'}
            </span>
          </span>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-bold">
            {isEn ? `Step ${activeStep} of 6` : `Bước ${activeStep} / 6`}
          </span>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { step: 1, title: isEn ? 'S1: Launch' : 'B1: Khởi động', desc: isEn ? 'Open Python IDLE' : 'Mở Python IDLE' },
            { step: 2, title: isEn ? 'S2: File/New' : 'B2: File/New', desc: isEn ? 'Open editor window' : 'Mở cửa sổ soạn thảo' },
            { step: 3, title: isEn ? 'S3: Enter Code' : 'B3: Nhập mã', desc: isEn ? 'Type comment & print' : 'Gõ chú thích & print' },
            { step: 4, title: isEn ? 'S4: Ctrl+S' : 'B4: Ctrl+S', desc: isEn ? 'Save file Bai1.py' : 'Lưu tệp Bai1.py' },
            { step: 5, title: isEn ? 'S5: F5 Key' : 'B5: Phím F5', desc: 'Run Module' },
            { step: 6, title: isEn ? 'S6: Quit' : 'B6: Thoát', desc: isEn ? 'Command quit() / exit()' : 'Lệnh quit() / exit()' }
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3 rounded-2xl text-left transition-all border-2 ${
                activeStep === s.step
                  ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm ring-1 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-xs text-indigo-700 dark:text-indigo-300">{s.title}</span>
                {activeStep > s.step && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{s.desc}</p>
            </button>
          ))}
        </div>

        {/* Step Detailed Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
          {activeStep === 1 && (
            <div>
              <strong className="text-indigo-600 dark:text-indigo-400 block text-sm mb-1">
                {isEn ? 'Step 1: Launch Python Software (IDLE)' : 'Bước 1: Khởi động phần mềm Python'}
              </strong>
              {isEn
                ? 'Double-click the Python (IDLE) shortcut icon on your Desktop or search for "IDLE" in the Start Menu to launch the interactive command shell.'
                : 'Nháy đúp chuột vào biểu tượng của Python (IDLE) trên màn hình nền Desktop hoặc tìm kiếm "IDLE" trong Start Menu để mở cửa sổ dòng lệnh.'}
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <strong className="text-indigo-600 dark:text-indigo-400 block text-sm mb-1">
                {isEn ? 'Step 2: Open Program Editor Mode' : 'Bước 2: Mở chế độ soạn thảo chương trình'}
              </strong>
              {isEn
                ? 'From the IDLE Shell window, click the File menu and select New File (or press the Ctrl + N shortcut) to open an independent script editing window.'
                : 'Trong cửa sổ IDLE Shell, nháy chuột vào menu File và chọn New File (hoặc nhấn tổ hợp phím Ctrl + N) để mở một cửa sổ soạn thảo mới hoàn toàn độc lập.'}
            </div>
          )}
          {activeStep === 3 && (
            <div>
              <strong className="text-indigo-600 dark:text-indigo-400 block text-sm mb-1">
                {isEn ? 'Step 3: Enter Program Code (Figure 16.4)' : 'Bước 3: Nhập nội dung chương trình (Hình 16.4)'}
              </strong>
              {isEn ? (
                <>
                  Type the comment line <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono"># First program</code> and the output statement <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">print("Hello!")</code>. The <strong>#</strong> symbol designates a comment line which the interpreter skips without executing.
                </>
              ) : (
                <>
                  Gõ dòng chú thích <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono"># Chương trình đầu tiên</code> và câu lệnh in <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">print("Xin chào!")</code>. Kí hiệu <strong>#</strong> cho biết đây là chú thích, chương trình dịch sẽ bỏ qua không thực hiện dòng này.
                </>
              )}
            </div>
          )}
          {activeStep === 4 && (
            <div>
              <strong className="text-indigo-600 dark:text-indigo-400 block text-sm mb-1">
                {isEn ? 'Step 4: Save Program File to Computer' : 'Bước 4: Lưu tệp chương trình vào máy tính'}
              </strong>
              {isEn
                ? 'Select File / Save or press shortcut Ctrl + S. Choose your storage folder and save as Bai1.py (the .py extension is standard for Python source code).'
                : 'Chọn File / Save hoặc nhấn tổ hợp phím Ctrl + S. Chọn thư mục lưu trữ và đặt tên tệp là Bai1.py (đuôi .py là định dạng tệp chuẩn của mã nguồn Python).'}
            </div>
          )}
          {activeStep === 5 && (
            <div>
              <strong className="text-indigo-600 dark:text-indigo-400 block text-sm mb-1">
                {isEn ? 'Step 5: Run the Program' : 'Bước 5: Thực hiện chạy chương trình'}
              </strong>
              {isEn
                ? 'From the editor menu bar, select Run / Run Module or press the F5 function key. The IDLE Shell will immediately display the greeting output string.'
                : 'Trên thanh thực đơn của cửa sổ soạn thảo, chọn Run / Run Module hoặc nhấn phím tắt F5 trên bàn phím. Màn hình IDLE Shell sẽ lập tức hiển thị dòng chữ "Xin chào!".'}
            </div>
          )}
          {activeStep === 6 && (
            <div>
              <strong className="text-indigo-600 dark:text-indigo-400 block text-sm mb-1">
                {isEn ? 'Step 6: Safely Terminate Working Session' : 'Bước 6: Kết thúc phiên làm việc an toàn'}
              </strong>
              {isEn
                ? 'To close the Python environment, click the [x] close button at the top-right corner, or type command quit() or exit() after the >>> prompt and press ENTER.'
                : 'Để đóng môi trường Python, nháy nút [x] ở góc trên bên phải màn hình hoặc gõ lệnh quit() hoặc lệnh exit() sau dấu nhắc >>> rồi nhấn phím ENTER.'}
            </div>
          )}
        </div>
      </div>

      {/* Realistic Virtual Python IDE Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-100">
                {isEn
                  ? 'Interactive Python IDE: Editor & Shell Pair'
                  : 'Phòng thực hành Lập trình Ảo: Trình soạn thảo & IDLE Shell'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Edit Bai1.py, click Run Module (F5), or type quit() to complete the full SGK workflow'
                  : 'Tự tay chỉnh sửa mã nguồn Bai1.py, bấm Run (F5) và quan sát dòng lệnh thực thi'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSourceCode(isEn ? '# First program\nprint("Hello!")' : '# Chương trình đầu tiên\nprint("Xin chào!")');
                setHasCustomizedCode(false);
                setIsSaved(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-bold transition-colors cursor-pointer"
            >
              {isEn ? 'Textbook Default' : 'Mặc định SGK'}
            </button>
            <button
              onClick={handleRunF5}
              disabled={isRunning}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{isRunning ? (isEn ? 'Running...' : 'Đang chạy...') : 'Run Module (F5)'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Script Editor Window */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between px-3 py-2 rounded-t-2xl bg-slate-800 border-b border-slate-700 text-xs font-mono">
              <span className="text-indigo-300 font-bold flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span>{fileName}</span>
              </span>
              <span className="text-[10px] text-slate-400">{isEn ? 'Script Editor Mode' : 'Chế độ soạn thảo (Script)'}</span>
            </div>

            <textarea
              value={sourceCode}
              onChange={(e) => {
                setSourceCode(e.target.value);
                setHasCustomizedCode(true);
                setIsSaved(false);
              }}
              rows={9}
              className="w-full p-4 rounded-b-2xl bg-black font-mono text-xs text-slate-100 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none"
              placeholder={isEn ? "Enter Python source code..." : "Nhập mã nguồn Python..."}
            />

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>{isEn ? 'Encoding: ' : 'Định dạng: '}<strong>UTF-8</strong></span>
              <span>{isEn ? 'Shortcut: ' : 'Phím tắt: '}<strong>F5</strong> {isEn ? 'to run' : 'để chạy'}</span>
            </div>
          </div>

          {/* Right: IDLE Shell Console Output */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between px-3 py-2 rounded-t-2xl bg-slate-800 border-b border-slate-700 text-xs font-mono">
              <span className="text-emerald-300 font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Python 3.9.1 IDLE Shell</span>
              </span>
              <button
                onClick={handleQuitSession}
                className="text-[10px] text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
                title={isEn ? "Type quit() to exit session" : "Gõ quit() để đóng phiên"}
              >
                <Power className="w-3 h-3" />
                <span>quit()</span>
              </button>
            </div>

            <div className="w-full h-[184px] p-4 rounded-b-2xl bg-black font-mono text-xs text-emerald-400 border border-slate-800 overflow-y-auto space-y-1.5">
              {terminalOutput.map((line, idx) => (
                <div
                  key={idx}
                  className={
                    line.startsWith('===')
                      ? 'text-blue-400 text-[11px]'
                      : line.startsWith('>>>')
                      ? 'text-slate-400'
                      : 'text-slate-100 font-bold'
                  }
                >
                  {line}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>{isEn ? 'Ready prompt: ' : 'Dấu nhắc sẵn sàng: '}<code className="text-cyan-400 font-bold">&gt;&gt;&gt;</code></span>
              <span>{isEn ? 'Status: ' : 'Trạng thái: '}<strong>Active</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={16} />

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setCurrentPage(3)}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
        >
          {bilingualMode === 'en' ? '← Previous: First Commands' : '← Quay lại: Các lệnh đầu tiên'}
        </button>

        <button
          onClick={() => setCurrentPage(5)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          <span>{bilingualMode === 'en' ? 'Next: 5. Practice & Application →' : 'Tiếp theo: 5. Luyện tập & Vận dụng →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
