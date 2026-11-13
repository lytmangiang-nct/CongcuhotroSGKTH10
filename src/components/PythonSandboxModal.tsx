import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Play,
  Square,
  RotateCcw,
  Terminal,
  Lightbulb,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import { getLessonPythonSamples, PythonSandboxSample } from '../data/pythonSandboxSamples';
import {
  runPythonInWorker,
  PythonExecutionResult,
  PythonWorkerHandle
} from '../services/pythonWorkerRunner';

export const PythonSandboxModal: React.FC = () => {
  const {
    showPythonLabModal,
    setShowPythonLabModal,
    currentLesson,
    bilingualMode,
    isPresentationMode,
    revealPresentationAnswers
  } = useBook();

  const samples = getLessonPythonSamples(currentLesson.id);
  const [selectedSampleId, setSelectedSampleId] = useState<string>(samples[0]?.id || '');
  const activeSample: PythonSandboxSample =
    samples.find((s) => s.id === selectedSampleId) || samples[0];

  const [code, setCode] = useState<string>(activeSample.starterCode);
  const [stdinText, setStdinText] = useState<string>(activeSample.defaultStdin);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<PythonExecutionResult | null>(null);

  // 3-tier progressive hints (level 3 sample solution is strictly gated behind explicit user action)
  const [showHint1, setShowHint1] = useState<boolean>(false);
  const [showHint2, setShowHint2] = useState<boolean>(false);
  const [showHint3Solution, setShowHint3Solution] = useState<boolean>(false);

  const workerHandleRef = useRef<PythonWorkerHandle | null>(null);

  // Sync starter code when active lesson changes
  useEffect(() => {
    const nextSamples = getLessonPythonSamples(currentLesson.id);
    const first = nextSamples[0];
    setSelectedSampleId(first.id);
    setCode(first.starterCode);
    setStdinText(first.defaultStdin);
    setResult(null);
    setShowHint1(false);
    setShowHint2(false);
    setShowHint3Solution(false);
  }, [currentLesson.id]);

  // Terminate any active worker cleanly if modal closes
  useEffect(() => {
    if (!showPythonLabModal && workerHandleRef.current) {
      workerHandleRef.current.stop();
      workerHandleRef.current = null;
      setIsRunning(false);
    }
  }, [showPythonLabModal]);

  if (!showPythonLabModal) {
    return null;
  }

  const isEn = bilingualMode === 'en';
  const solutionBlockedInPresentation = isPresentationMode && !revealPresentationAnswers;

  const handleSelectSample = (sample: PythonSandboxSample) => {
    if (workerHandleRef.current) {
      workerHandleRef.current.stop();
      workerHandleRef.current = null;
    }
    setSelectedSampleId(sample.id);
    setCode(sample.starterCode);
    setStdinText(sample.defaultStdin);
    setIsRunning(false);
    setResult(null);
    setShowHint1(false);
    setShowHint2(false);
    setShowHint3Solution(false);
  };

  const handleRun = async () => {
    if (workerHandleRef.current) {
      workerHandleRef.current.stop();
      workerHandleRef.current = null;
    }
    setIsRunning(true);
    setResult(null);
    const handle = runPythonInWorker(code, stdinText, { timeoutMs: 2000, maxSteps: 120000 });
    workerHandleRef.current = handle;
    const res = await handle.promise;
    workerHandleRef.current = null;
    setIsRunning(false);
    setResult(res);
  };

  const handleStop = () => {
    if (workerHandleRef.current) {
      workerHandleRef.current.stop();
      workerHandleRef.current = null;
    }
    setIsRunning(false);
  };

  const handleReset = () => {
    handleStop();
    setCode(activeSample.starterCode);
    setStdinText(activeSample.defaultStdin);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-slate-900 text-slate-100 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                {isEn
                  ? `Guided Python Playground • Lesson ${currentLesson.lessonNumber}`
                  : `Thực hành Python có gợi ý • Bài ${currentLesson.lessonNumber}`}
              </h3>
              <p className="text-xs text-slate-400">
                {isEn
                  ? 'Isolated Web Worker runner with execution timeout & Stop button (infinite-loop safe)'
                  : 'Chạy cô lập trong Web Worker có giới hạn thời gian & nút Dừng (an toàn trước vòng lặp vô hạn)'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowPythonLabModal(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Task Description */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-emerald-400">
                {isEn ? activeSample.titleEn : activeSample.titleVi}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isEn ? activeSample.descriptionEn : activeSample.descriptionVi}
              </p>
            </div>
            {samples.length > 1 && (
              <div className="flex gap-1.5 shrink-0">
                {samples.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectSample(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      s.id === activeSample.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    #{idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Code Editor + Stdin + Console Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Editor & Stdin */}
            <div className="lg:col-span-7 space-y-3">
              <div className="rounded-xl border border-slate-700 bg-slate-950 overflow-hidden">
                <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>main.py</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-sans text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{isEn ? 'Reset' : 'Khôi phục mẫu'}</span>
                    </button>

                    {isRunning ? (
                      <button
                        type="button"
                        onClick={handleStop}
                        className="px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-sans text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Square className="w-3 h-3 fill-current" />
                        <span>{isEn ? 'Stop' : 'Dừng'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRun}
                        className="px-3.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{isEn ? 'Run Python' : 'Chạy'}</span>
                      </button>
                    )}
                  </div>
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                      e.preventDefault();
                      const el = e.currentTarget;
                      const start = el.selectionStart;
                      const end = el.selectionEnd;
                      const next = code.slice(0, start) + '    ' + code.slice(end);
                      setCode(next);
                      setTimeout(() => {
                        el.selectionStart = el.selectionEnd = start + 4;
                      }, 0);
                    }
                  }}
                  spellCheck={false}
                  rows={11}
                  className="w-full p-3 bg-slate-950 text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y"
                  aria-label="Python Code Editor"
                />
              </div>

              {/* Stdin Input Box */}
              <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {isEn
                    ? 'Test Input Data for input() (one value per line)'
                    : 'Dữ liệu đầu vào thử nghiệm cho lệnh input() (mỗi dòng một giá trị)'}
                </label>
                <textarea
                  value={stdinText}
                  onChange={(e) => setStdinText(e.target.value)}
                  rows={2}
                  spellCheck={false}
                  placeholder={isEn ? 'e.g. 20\n16' : 'Ví dụ: 20\n16'}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 font-mono text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right: Output & 3-Tier Hints */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {/* Console Output Box */}
              <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 flex-1 min-h-[170px] flex flex-col">
                <div className="flex items-center justify-between text-xs font-mono pb-2 mb-2 border-b border-slate-800">
                  <span className="text-slate-400 font-bold">
                    {isEn ? 'Console Output' : 'Kết quả đầu ra (Output)'}
                  </span>
                  {isRunning && (
                    <span className="text-amber-400 animate-pulse">
                      {isEn ? 'Running in Worker...' : 'Đang chạy...'}
                    </span>
                  )}
                  {!isRunning && result && (
                    <span
                      className={`font-bold ${
                        result.status === 'success'
                          ? 'text-emerald-400'
                          : result.status === 'timeout' || result.status === 'stopped'
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {result.status === 'success' && `${result.durationMs}ms`}
                      {result.status === 'timeout' && (isEn ? 'Timeout Guard' : 'Ngắt do quá giờ')}
                      {result.status === 'stopped' && (isEn ? 'Stopped' : 'Đã dừng')}
                      {result.status === 'error' && (result.errorType || 'Error')}
                    </span>
                  )}
                </div>

                <div className="flex-1 font-mono text-xs space-y-2 overflow-y-auto">
                  {!result && !isRunning && (
                    <div className="text-slate-500 italic">
                      {isEn
                        ? 'Click "Run Python" to see stdout or error diagnostics.'
                        : 'Nhấn "Chạy" để xem kết quả in ra hoặc thông báo lỗi.'}
                    </div>
                  )}

                  {result?.stdout && (
                    <pre className="whitespace-pre-wrap text-teal-300 leading-relaxed">
                      {result.stdout}
                    </pre>
                  )}

                  {result && result.status === 'success' && !result.stdout && (
                    <div className="text-slate-400 italic">
                      {isEn ? '(Program finished with no printed output)' : '(Chương trình chạy xong, không có dòng in nào)'}
                    </div>
                  )}

                  {result && result.status !== 'success' && (
                    <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-rose-300">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {result.errorType}
                          {result.errorLine ? ` (Line ${result.errorLine})` : ''}
                        </span>
                      </div>
                      <div>{result.errorMessage}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3-Tier Progressive Hints */}
              <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-3 space-y-2 text-xs">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" />
                  <span>{isEn ? '3-Level Progressive Hints' : 'Gợi ý từng bước (3 mức)'}</span>
                </div>

                {/* Level 1 */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setShowHint1(!showHint1)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 font-semibold text-slate-200 flex items-center justify-between cursor-pointer"
                  >
                    <span>{isEn ? 'Level 1: Where to Look' : 'Mức 1: Vị trí cần xem lại'}</span>
                    <span>{showHint1 ? '▾' : '▸'}</span>
                  </button>
                  {showHint1 && (
                    <div className="p-2.5 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-700/70">
                      {isEn ? activeSample.hint1En : activeSample.hint1Vi}
                    </div>
                  )}
                </div>

                {/* Level 2 */}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setShowHint2(!showHint2)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 font-semibold text-slate-200 flex items-center justify-between cursor-pointer"
                  >
                    <span>{isEn ? 'Level 2: How to Fix It' : 'Mức 2: Hướng sửa'}</span>
                    <span>{showHint2 ? '▾' : '▸'}</span>
                  </button>
                  {showHint2 && (
                    <div className="p-2.5 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-700/70">
                      {isEn ? activeSample.hint2En : activeSample.hint2Vi}
                    </div>
                  )}
                </div>

                {/* Level 3: Sample Solution (Strictly hidden until actively clicked) */}
                <div className="space-y-1">
                  {solutionBlockedInPresentation ? (
                    <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[11px]">
                      {isEn
                        ? 'Presentation Mode: Sample solution is hidden until Answers are revealed.'
                        : 'Chế độ trình chiếu: Lời giải mẫu đang ẩn theo chế độ lớp học.'}
                    </div>
                  ) : !showHint3Solution ? (
                    <button
                      type="button"
                      onClick={() => setShowHint3Solution(true)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Reveal Sample Solution (Level 3)' : 'Hiện lời giải mẫu (Mức 3)'}</span>
                    </button>
                  ) : (
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isEn ? 'Sample Solution' : 'Lời giải mẫu'}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setCode(activeSample.hint3SolutionCode)}
                          className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold cursor-pointer"
                        >
                          {isEn ? 'Apply to Editor' : 'Nạp vào trình soạn thảo'}
                        </button>
                      </div>
                      <pre className="p-2 rounded bg-slate-950 text-emerald-300 font-mono text-[11px] overflow-x-auto">
                        {activeSample.hint3SolutionCode}
                      </pre>
                      <p className="text-[11px] text-slate-300">
                        {isEn ? activeSample.hint3ExplanationEn : activeSample.hint3ExplanationVi}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
