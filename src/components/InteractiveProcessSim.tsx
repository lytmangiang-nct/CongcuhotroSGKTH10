import React, { useState } from 'react';
import { Play, RotateCcw, Cpu, HardDrive, ArrowRight, Monitor, Keyboard, Scan as ScannerIcon, FileText, CheckCircle2, Binary } from 'lucide-react';
import { useBook } from '../context/BookContext';

export const InteractiveProcessSim: React.FC = () => {
  const { bilingualMode } = useBook();
  const [selectedScenario, setSelectedScenario] = useState<'climate' | 'text' | 'scanner'>('climate');
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: idle, 1: input, 2: processing, 3: output
  const [customInput, setCustomInput] = useState<string>('Hà Nội 38°C');
  const [binaryStream, setBinaryStream] = useState<string>('01001000 01100001 00100000 01001110 01101111 01101001');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Convert custom input to binary representation
  const stringToBinary = (str: string) => {
    return str
      .split('')
      .slice(0, 8)
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const handleStartSim = () => {
    setIsSimulating(true);
    setCurrentStep(1);

    setTimeout(() => {
      setCurrentStep(2);
      if (selectedScenario === 'text') {
        setBinaryStream(stringToBinary(customInput));
      } else if (selectedScenario === 'climate') {
        setBinaryStream('00100111 00101110 00110101 01000011 00101011 00110001 00101110 00110010');
      } else {
        setBinaryStream('11111111 11011000 11111110 00000000 00010000 01001010 01000110 01001001');
      }
    }, 1200);

    setTimeout(() => {
      setCurrentStep(3);
      setIsSimulating(false);
    }, 2800);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsSimulating(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            <Cpu className="w-3.5 h-3.5" />
            {bilingualMode === 'en' ? (
              <span>Figure 1.1 Interactive Lab</span>
            ) : (
              <>
                <span>Mô phỏng Trực quan Hình 1.1 SGK</span>
                <span className="text-slate-400">|</span>
                <span className="italic font-normal">Figure 1.1 Interactive Lab</span>
              </>
            )}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
            {bilingualMode === 'en'
              ? 'Computer Information & Data Processing Cycle'
              : 'Quá trình xử lí thông tin / dữ liệu bằng máy tính'}
          </h3>
        </div>

        {/* Scenario selector */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => {
              setSelectedScenario('climate');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedScenario === 'climate'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {bilingualMode === 'en' ? 'Climate Trend' : 'Nhiệt độ khí hậu'}
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedScenario('text');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedScenario === 'text'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {bilingualMode === 'en' ? 'Keyboard Text' : 'Văn bản gõ phím'}
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedScenario('scanner');
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              selectedScenario === 'scanner'
                ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {bilingualMode === 'en' ? 'Scanner Image' : 'Tệp ảnh máy quét'}
          </button>
        </div>
      </div>

      {/* Control bar & custom input if text */}
      {selectedScenario === 'text' && (
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={bilingualMode === 'en' ? 'Enter any text for binary encoding...' : 'Nhập chữ bất kì để máy tính mã hoá nhị phân...'}
            className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm"
          />
          <span className="text-xs text-slate-500">
            {bilingualMode === 'en' ? 'Custom text input' : 'Nhập văn bản tùy ý'}
          </span>
        </div>
      )}

      {/* 3 Steps Pipeline UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {/* Step 1: Input */}
        <div
          className={`p-4 rounded-xl border-2 transition-all relative ${
            currentStep === 1
              ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-4 ring-indigo-200 dark:ring-indigo-900 scale-[1.02]'
              : currentStep > 1
              ? 'border-emerald-400 bg-white dark:bg-slate-800'
              : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                1
              </span>
              <span>{bilingualMode === 'en' ? 'Step 1: Data Input' : 'Bước 1: Tiếp nhận dữ liệu'}</span>
            </span>
            {currentStep > 1 && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg min-h-[110px] text-center">
            {selectedScenario === 'climate' && (
              <>
                <div className="text-2xl font-bold text-amber-600">36.5°C, 37.2°C, 38.0°C</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  {bilingualMode === 'en'
                    ? '10-year recorded weather sensor datasets'
                    : 'Bộ dữ liệu nhiệt độ đo đạc qua nhiều năm'}
                </div>
              </>
            )}
            {selectedScenario === 'text' && (
              <>
                <Keyboard className="w-8 h-8 text-indigo-500 mb-1" />
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  "{customInput || 'Học tin học'}"
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {bilingualMode === 'en' ? 'Keyboard strokes entered by human' : 'Bàn phím do con người nhập'}
                </div>
              </>
            )}
            {selectedScenario === 'scanner' && (
              <>
                <ScannerIcon className="w-8 h-8 text-sky-500 mb-1" />
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Photo_Scan_01.raw</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {bilingualMode === 'en' ? 'Raw image file from scanner' : 'Tệp hình ảnh thô từ máy quét'}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Step 2: Processing */}
        <div
          className={`p-4 rounded-xl border-2 transition-all relative ${
            currentStep === 2
              ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 ring-4 ring-indigo-200 dark:ring-indigo-900 scale-[1.02]'
              : currentStep > 2
              ? 'border-emerald-400 bg-white dark:bg-slate-800'
              : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[11px]">
                2
              </span>
              <span>{bilingualMode === 'en' ? 'Step 2: Processing' : 'Bước 2: Xử lí dữ liệu'}</span>
            </span>
            {currentStep > 2 && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-slate-900 text-emerald-400 font-mono rounded-lg min-h-[110px] text-center overflow-hidden">
            <Cpu
              className={`w-7 h-7 text-emerald-400 mb-1 ${
                currentStep === 2 ? 'animate-spin text-purple-400' : ''
              }`}
            />
            <div className="text-[10px] break-all leading-tight text-emerald-300/90 font-mono">
              {currentStep >= 2 ? binaryStream : '01000010 01101001 01110100'}
            </div>
            <div className="text-[11px] text-slate-300 mt-1 font-sans">
              {bilingualMode === 'en'
                ? 'CPU transforms bit sequences in memory'
                : 'CPU biến đổi dãy bit trong bộ nhớ'}
            </div>
          </div>
        </div>

        {/* Step 3: Output */}
        <div
          className={`p-4 rounded-xl border-2 transition-all relative ${
            currentStep === 3
              ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 ring-4 ring-emerald-200 dark:ring-emerald-900 scale-[1.02]'
              : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">
                3
              </span>
              <span>{bilingualMode === 'en' ? 'Step 3: Result Output' : 'Bước 3: Đưa ra kết quả'}</span>
            </span>
            {currentStep === 3 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg min-h-[110px] text-center">
            {currentStep < 3 ? (
              <div className="text-xs text-slate-400 italic">
                {bilingualMode === 'en'
                  ? 'Waiting for CPU processing...'
                  : 'Đang đợi CPU hoàn tất xử lí...'}
              </div>
            ) : selectedScenario === 'climate' ? (
              <>
                <div className="text-xs font-bold text-rose-600 bg-rose-100 dark:bg-rose-950 px-2.5 py-1 rounded-md">
                  {bilingualMode === 'en'
                    ? 'Result: Trend shows Earth is warming (+1.2°C)'
                    : 'Kết quả: Trái Đất đang có khuynh hướng nóng dần (+1.2°C)'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {bilingualMode === 'en'
                    ? 'Data converted into meaningful information for humans'
                    : 'Dữ liệu đã chuyển thành thông tin mang ý nghĩa'}
                </div>
              </>
            ) : selectedScenario === 'text' ? (
              <>
                <FileText className="w-7 h-7 text-blue-600 mb-1" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  {bilingualMode === 'en' ? 'Document rendered & saved' : 'Văn bản đã xuất ra & lưu thẻ nhớ'}
                </div>
                <div className="text-[11px] text-emerald-600 mt-0.5 font-mono">
                  {customInput.length * 8} bits | {customInput.length} Bytes
                </div>
              </>
            ) : (
              <>
                <Monitor className="w-7 h-7 text-indigo-600 mb-1" />
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  {bilingualMode === 'en' ? 'Rendered Image (RGB 24-bit)' : 'Ảnh số hoàn chỉnh (RGB 24-bit)'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {bilingualMode === 'en' ? 'Saved to memory card' : 'Đã lưu vào thẻ nhớ máy tính'}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons & explanation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            {bilingualMode === 'en' ? 'Core Principle: ' : 'Nguyên lí cốt lõi: '}
          </span>
          {bilingualMode === 'en'
            ? 'In computing, data is encoded into bit sequences. Inside a computer, information processing IS data processing.'
            : 'Trong tin học, dữ liệu là thông tin được nạp vào máy tính dưới dạng bit. Xử lí thông tin trong máy tính chính là xử lí dữ liệu.'}
        </div>

        <div className="flex items-center gap-2">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Reset' : 'Đặt lại'}</span>
            </button>
          )}

          <button
            type="button"
            disabled={isSimulating}
            onClick={handleStartSim}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>
              {isSimulating
                ? bilingualMode === 'en'
                  ? 'Processing...'
                  : 'Đang xử lí...'
                : bilingualMode === 'en'
                ? 'Run Processing Cycle'
                : 'Chạy Quá trình Xử lí'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
