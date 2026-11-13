import React, { useState, useRef } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Activity,
  Layers,
  Sliders,
  CheckCircle2,
  Info,
  HelpCircle,
  Binary,
  Play,
  Square,
  Wand2,
  Cpu
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section6AudioDigitization: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive Simulator States
  const [sampleRateLevel, setSampleRateLevel] = useState<number>(8); // 4, 8, 16 points
  const [bitDepth, setBitDepth] = useState<number>(4); // 3-bit (8 levels) or 4-bit (16 levels) or 8-bit (256 levels)
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const speechVi =
    'Mục 1a: Số hoá âm thanh bằng phương pháp điều chế mã xung PCM. Gồm 3 bước: Bước 1 lấy mẫu biên độ ở các thời điểm rời rạc cách đều nhau theo chu kì lấy mẫu; Bước 2 lượng tử hoá chia biên độ thành các thang bậc; Bước 3 mã hoá các giá trị mẫu thành dãy bit nhị phân liên tục.';

  const speechEn =
    'Section 1a: Audio Digitization using Pulse Code Modulation (PCM). Consists of 3 steps: Step 1 Sampling signal amplitudes at discrete equidistant time intervals called the sampling period; Step 2 Quantization rounding amplitudes to discrete quantized levels; Step 3 Binary Encoding concatenating sample values into a bitstream.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  // Safe Web Audio Tone generator
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 440 Hz standard A tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);

        gain.gain.setValueAtTime(0.12, ctx.currentTime); // gentle volume

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscRef.current = osc;
        setIsPlayingAudio(true);

        // Auto-stop after 3 seconds
        setTimeout(() => {
          if (oscRef.current) {
            try {
              oscRef.current.stop();
              oscRef.current.disconnect();
              oscRef.current = null;
            } catch {
              // ignore
            }
            setIsPlayingAudio(false);
          }
        }, 3000);
      } catch (e) {
        console.warn('AudioContext not supported or blocked:', e);
      }
    }
  };

  // Calculate quantized levels
  const levelsCount = Math.pow(2, bitDepth);

  // Generate sampled points based on current sampleRateLevel
  const samplePoints = Array.from({ length: sampleRateLevel }).map((_, i) => {
    const t = (i / (sampleRateLevel - 1)) * 2 * Math.PI;
    // Continuous analog function: y between -1 and 1
    const rawVal = Math.sin(t); 
    // Normalized to 0 .. levelsCount - 1
    const norm = (rawVal + 1) / 2;
    const quantizedLevel = Math.min(levelsCount - 1, Math.floor(norm * levelsCount));
    const binaryCode = quantizedLevel.toString(2).padStart(bitDepth, '0');
    // SVG x from 30 to 370, SVG y from 130 to 20
    const svgX = 30 + (i / (sampleRateLevel - 1)) * 340;
    const svgY = 130 - (quantizedLevel / (levelsCount - 1)) * 105;
    const analogSvgY = 130 - norm * 105;

    return {
      index: i,
      rawVal,
      quantizedLevel,
      binaryCode,
      svgX,
      svgY,
      analogSvgY
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-violet-100 text-violet-800 dark:bg-violet-950/70 dark:text-violet-300">
              {bilingualMode === 'en' ? 'Section 1a' : 'Mục 1a'}
            </span>
            <span className="text-xs text-slate-500 font-mono">SGK Trang 28</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(28);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{bilingualMode === 'en' ? 'Page 28 Scan' : 'Bản quét Tr. 28'}</span>
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="1. Biểu diễn âm thanh: a) Số hoá âm thanh & Điều chế mã xung (PCM)"
              en="1. Audio Representation: a) Audio Digitization & Pulse Code Modulation (PCM)"
            />
          </h2>
        </div>
      </div>

      {/* 3 Detailed Steps of PCM (SGK Trang 28) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 flex items-center justify-center font-black text-sm">
                1
              </span>
              <span className="text-[11px] font-mono text-slate-400">Step 1 • Sampling</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              <BilingualText vi="Lấy mẫu (Sampling)" en="Sampling (Discrete Time)" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Lấy giá trị biên độ tín hiệu ở những thời điểm rời rạc cách đều nhau. Khoảng thời gian giữa hai lần lấy mẫu liên tiếp gọi là chu kì lấy mẫu (T)."
                en="Measure signal amplitudes at discrete equidistant time moments. The time interval between two consecutive samples is called the sampling period (T)."
              />
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-violet-600 dark:text-violet-400 font-semibold flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Tần số lấy mẫu f = 1/T (Hz)</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black text-sm">
                2
              </span>
              <span className="text-[11px] font-mono text-slate-400">Step 2 • Quantization</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              <BilingualText vi="Biểu diễn giá trị mẫu (Lượng tử hoá)" en="Quantization (Value Levels)" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Thang đo biên độ được chia thành các mức rời rạc. Mỗi giá trị mẫu được làm tròn và gán về mức gần nhất tương ứng với số bit quy định."
                en="The amplitude scale is divided into discrete quantized levels. Each measured sample is rounded to the closest level defined by the bit depth."
              />
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
            <Sliders className="w-3.5 h-3.5" />
            <span>n bit tạo ra 2ⁿ mức biên độ</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-sm">
                3
              </span>
              <span className="text-[11px] font-mono text-slate-400">Step 3 • Binary Stream</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              <BilingualText vi="Biểu diễn âm thanh (Mã nhị phân)" en="Binary Encoding (Bitstream)" />
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Ghép các giá trị số nhị phân của các mẫu liên tiếp theo thứ tự thời gian thành một dãy bit dài để lưu vào tệp tin trên máy tính."
                en="Concatenate the binary representations of successive samples chronologically into a continuous bitstream stored in a file."
              />
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <Binary className="w-3.5 h-3.5" />
            <span>Chuỗi bit nhị phân hoàn chỉnh</span>
          </div>
        </div>
      </div>

      {/* Interactive PCM Simulator Sandbox */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/30 text-violet-400 border border-violet-500/40 flex items-center justify-center font-bold">
              <Wand2 className="w-5 h-5 text-violet-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-100">
                <BilingualText
                  vi="Phòng thí nghiệm tương tác: Điều chế mã xung PCM"
                  en="Interactive Laboratory: Pulse Code Modulation (PCM)"
                />
              </h3>
              <p className="text-xs text-slate-400">
                <BilingualText
                  vi="Điều chỉnh chu kì lấy mẫu và độ sâu bit để thấy độ trung thực của âm thanh số hoá"
                  en="Adjust the sampling rate and bit depth to observe audio digitization fidelity"
                />
              </p>
            </div>
          </div>

          {/* Audio Synthesizer Tone Button */}
          <button
            type="button"
            onClick={handleToggleAudio}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isPlayingAudio
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isPlayingAudio ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>
              {isPlayingAudio
                ? (bilingualMode === 'en' ? 'Stop Tone (440Hz)' : 'Dừng âm thanh')
                : (bilingualMode === 'en' ? 'Hear Tone (440Hz)' : 'Nghe thử âm chuẩn')}
            </span>
          </button>
        </div>

        {/* Control Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          {/* Slider 1: Sample Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-violet-400" />
                <BilingualText vi="Số lượng mẫu / Chu kì lấy mẫu (T)" en="Samples Count / Sampling Period (T)" />
              </span>
              <span className="font-mono font-bold text-violet-400 bg-violet-950/80 px-2 py-0.5 rounded border border-violet-800">
                {sampleRateLevel} mẫu ({sampleRateLevel <= 4 ? 'Thấp/Thoại' : sampleRateLevel <= 8 ? 'FM Radio' : 'Chuẩn CD'})
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={16}
              step={2}
              value={sampleRateLevel}
              onChange={(e) => setSampleRateLevel(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>{bilingualMode === 'en' ? 'Few samples (low fidelity)' : 'Ít mẫu (thô, méo tiếng)'}</span>
              <span>{bilingualMode === 'en' ? 'Dense samples (smooth audio)' : 'Dày đặc (mượt, giống gốc)'}</span>
            </div>
          </div>

          {/* Slider 2: Bit Depth */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <BilingualText vi="Độ sâu bit (Bit Depth - Lượng tử hoá)" en="Bit Depth (Quantization Levels)" />
              </span>
              <span className="font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                {bitDepth} bit ({levelsCount} mức biên độ)
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={5}
              step={1}
              value={bitDepth}
              onChange={(e) => setBitDepth(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>3 bit (8 mức)</span>
              <span>4 bit (16 mức)</span>
              <span>5 bit (32 mức)</span>
            </div>
          </div>
        </div>

        {/* Live SVG Graph Visualization */}
        <div className="space-y-3">
          <div className="relative h-64 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 400 160">
              {/* Quantization Horizontal Grid Lines */}
              {Array.from({ length: Math.min(levelsCount, 16) }).map((_, lIdx) => {
                const y = 130 - (lIdx / (Math.min(levelsCount, 16) - 1)) * 105;
                return (
                  <line
                    key={lIdx}
                    x1="25"
                    y1={y}
                    x2="375"
                    y2={y}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                );
              })}

              {/* Zero baseline */}
              <line x1="25" y1="77.5" x2="375" y2="77.5" stroke="#334155" strokeWidth="1.5" />

              {/* Analog Sine Wave (Original continuous sound) */}
              <path
                d="M 30 77.5 C 115 -10, 200 165, 285 77.5 C 325 35, 350 120, 370 77.5"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                opacity="0.8"
              />

              {/* Quantized PCM Staircase Waveform */}
              {samplePoints.map((pt, idx) => {
                if (idx === samplePoints.length - 1) return null;
                const nextPt = samplePoints[idx + 1];
                return (
                  <g key={`stair-${pt.index}`}>
                    {/* Horizontal flat hold */}
                    <line
                      x1={pt.svgX}
                      y1={pt.svgY}
                      x2={nextPt.svgX}
                      y2={pt.svgY}
                      stroke="#c084fc"
                      strokeWidth="2.5"
                    />
                    {/* Vertical step transition */}
                    <line
                      x1={nextPt.svgX}
                      y1={pt.svgY}
                      x2={nextPt.svgX}
                      y2={nextPt.svgY}
                      stroke="#c084fc"
                      strokeWidth="2.5"
                    />
                  </g>
                );
              })}

              {/* Sample Pins & Circles */}
              {samplePoints.map((pt) => (
                <g key={`pin-${pt.index}`}>
                  <line
                    x1={pt.svgX}
                    y1="77.5"
                    x2={pt.svgX}
                    y2={pt.svgY}
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <circle cx={pt.svgX} cy={pt.svgY} r="4.5" fill="#f43f5e" stroke="#fff" strokeWidth="1" />
                  <text
                    x={pt.svgX}
                    y={pt.svgY < 77 ? pt.svgY - 7 : pt.svgY + 14}
                    textAnchor="middle"
                    fill="#34d399"
                    fontSize="8"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {pt.binaryCode}
                  </text>
                </g>
              ))}
            </svg>

            {/* Legend Overlay */}
            <div className="absolute top-2 left-3 flex items-center gap-3 bg-slate-950/80 px-3 py-1 rounded-md text-[10px] border border-slate-800">
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-2.5 h-0.5 bg-sky-400 rounded-sm" />
                <span>{bilingualMode === 'en' ? 'Analog Waveform' : 'Sóng âm Analog gốc'}</span>
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <span className="w-2.5 h-0.5 bg-purple-400 rounded-sm" />
                <span>{bilingualMode === 'en' ? 'PCM Staircase' : 'Bậc thang lượng tử PCM'}</span>
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>{bilingualMode === 'en' ? 'Samples' : 'Điểm lấy mẫu'}</span>
              </span>
            </div>
          </div>

          {/* Generated Binary Bitstream */}
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Binary className="w-4 h-4 text-emerald-400" />
                <BilingualText vi="Chuỗi bit nhị phân kết quả trong máy tính (PCM Stream):" en="Output Binary Bitstream in Computer Memory (PCM Stream):" />
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                {samplePoints.length * bitDepth} bits total
              </span>
            </div>
            <div className="p-2.5 bg-black rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto whitespace-nowrap tracking-widest border border-emerald-950">
              {samplePoints.map((p, idx) => (
                <span key={idx} className="mr-2 hover:text-white transition-colors cursor-default" title={`Sample ${idx + 1}: Level ${p.quantizedLevel}`}>
                  {p.binaryCode}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={6} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: Overview' : 'Quay lại: Tổng quan'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: Bitrate & Audio Formats' : 'Tiếp theo: Tốc độ bit & Định dạng âm thanh'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
