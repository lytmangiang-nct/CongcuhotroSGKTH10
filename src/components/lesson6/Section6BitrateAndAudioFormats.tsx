import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  HardDrive,
  Cpu,
  Layers,
  HelpCircle,
  CheckCircle2,
  FileAudio,
  Radio,
  Zap,
  Clock,
  Download,
  Info
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section6BitrateAndAudioFormats: React.FC = () => {
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

  // Interactive Calculator States
  const [songMinutes, setSongMinutes] = useState<number>(3.5); // 3.5 minutes (210s)
  const [activeFormatTab, setActiveFormatTab] = useState<'compare' | 'flow'>('compare');

  // SGK Questions Interactive State
  const [q1Selected, setQ1Selected] = useState<number | null>(null);
  const [q1ShowExp, setQ1ShowExp] = useState<boolean>(false);
  const [q2Selected, setQ2Selected] = useState<number | null>(null);
  const [q2ShowExp, setQ2ShowExp] = useState<boolean>(false);

  const speechVi =
    'Mục 1b: Tốc độ bit và Định dạng lưu trữ âm thanh. Tốc độ bit là số bit cần thiết để biểu diễn một giây âm thanh, thường đo bằng Kilobit trên giây. Các định dạng tệp: WAV là định dạng PCM nguyên bản chất lượng cao nhất nhưng tệp rất lớn; MP3 nén loại bỏ thông tin âm thanh tai người không nhận biết, giảm kích thước tệp khoảng 10 lần.';

  const speechEn =
    'Section 1b: Bit-rate and Audio Storage Formats. Bit-rate is the number of bits required to represent one second of audio, measured in Kbps. Formats: WAV is uncompressed raw PCM with highest fidelity but huge size; MP3 is lossy compressed, reducing file size by roughly 10 times while maintaining acceptable quality.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  const songSeconds = Math.round(songMinutes * 60);

  // Audio format profiles
  const formats = [
    {
      id: 'wav',
      name: '.WAV (CD Audio PCM)',
      bitrateKbps: 1411.2,
      type: 'Uncompressed Lossless (PCM)',
      typeVi: 'Không nén (PCM gốc)',
      typeEn: 'Uncompressed (Raw PCM)',
      ratioVi: '1x (Gốc)',
      ratioEn: '1x (Original)',
      descVi: 'Chuẩn âm thanh đĩa CD & Microsoft Windows. Giữ nguyên 100% chi tiết gốc, kích thước tệp rất lớn.',
      descEn: 'CD audio standard and Microsoft Windows default. 100% pristine fidelity, extremely large file size.',
      color: 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200'
    },
    {
      id: 'flac',
      name: '.FLAC / .ALAC',
      bitrateKbps: 800,
      type: 'Lossless Compression',
      typeVi: 'Nén không mất mát',
      typeEn: 'Lossless Compressed',
      ratioVi: '~0.6x',
      ratioEn: '~0.6x',
      descVi: 'Nén thông minh bằng thuật toán nén dữ liệu giống tệp zip, không làm mất bất kì dao động âm thanh nào.',
      descEn: 'Smart mathematical compression preserving 100% waveform precision without discarding any audio frequencies.',
      color: 'border-purple-500 bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200'
    },
    {
      id: 'mp3_320',
      name: '.MP3 (320 Kbps HQ)',
      bitrateKbps: 320,
      type: 'Lossy High Quality',
      typeVi: 'Nén có mất mát (Chất lượng cao)',
      typeEn: 'Lossy (High Quality 320k)',
      ratioVi: '~0.23x',
      ratioEn: '~0.23x',
      descVi: 'Mức nén tối đa cho định dạng MP3, âm trầm và âm cao rõ nét, phù hợp thưởng thức trên tai nghe chất lượng.',
      descEn: 'Highest MP3 bitrate with crisp bass and treble; ideal for listening on good headphones.',
      color: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
    },
    {
      id: 'mp3_128',
      name: '.MP3 (128 Kbps Standard)',
      bitrateKbps: 128,
      type: 'Lossy Standard',
      typeVi: 'Nén có mất mát (Tiêu chuẩn SGK)',
      typeEn: 'Lossy (Standard SGK 128k)',
      ratioVi: '~0.09x (~1/10)',
      ratioEn: '~0.09x (~1/10)',
      descVi: 'Được nhắc đến trong SGK: Dung lượng nhỏ hơn ~10 lần so với WAV, chất lượng chấp nhận được, phổ biến nhất.',
      descEn: 'Mentioned in textbook: ~10 times smaller than WAV, acceptable quality, most widespread standard worldwide.',
      color: 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300">
              {bilingualMode === 'en' ? 'Section 1b' : 'Mục 1b'}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {bilingualMode === 'en' ? 'Textbook Page 29' : 'SGK Trang 29'}
            </span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(29);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{bilingualMode === 'en' ? 'Page 29 Scan' : 'Bản quét Tr. 29'}</span>
            </button>
          </div>
          <h2
            data-en="Bit-rate & Audio Storage Formats (.wav, .mp3)"
            data-vi="Tốc độ bit & Định dạng lưu trữ âm thanh (.wav, .mp3)"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100"
          >
            <BilingualText
              vi="Tốc độ bit & Định dạng lưu trữ âm thanh (.wav, .mp3)"
              en="Bit-rate & Audio Storage Formats (.wav, .mp3)"
            />
          </h2>
        </div>
      </div>

      {/* Hardware Flow: ADC & DAC Circuits (Mục 1a Trang 29 SGK) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Sơ đồ chuyển đổi phần cứng: Mạch ADC và DAC"
                en="Hardware Conversion Pipeline: ADC & DAC Circuits"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Chu trình khép kín: Ghi âm (Analog → Digital) và Phát âm (Digital → Analog)"
                en="Closed-loop lifecycle: Recording (Analog → Digital) and Playback (Digital → Analog)"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center py-2">
          {/* Micro */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {bilingualMode === 'en' ? '1. Microphone' : '1. Micro ghi âm'}
            </div>
            <div className="text-[11px] text-slate-500">
              {bilingualMode === 'en' ? 'Analog wave in air' : 'Sóng âm tương tự'}
            </div>
          </div>

          <div className="text-center font-black text-slate-400">→</div>

          {/* ADC Circuit */}
          <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-center space-y-1">
            <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
              {bilingualMode === 'en' ? '2. ADC Circuit' : '2. Mạch ADC'}
            </div>
            <div className="text-[11px] text-indigo-600/80 dark:text-indigo-400">
              {bilingualMode === 'en' ? 'Analog-to-Digital (Sampling & Quantization)' : 'Analog-to-Digital (Lấy mẫu & Mã hoá)'}
            </div>
          </div>

          <div className="text-center font-black text-slate-400">→</div>

          {/* Computer Bitstream */}
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {bilingualMode === 'en' ? '3. Computer & Storage' : '3. Máy tính & Ổ đĩa'}
            </div>
            <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400 font-mono">
              {bilingualMode === 'en' ? '01001010... (.wav, .mp3 file)' : '01001010... (Tệp .wav, .mp3)'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center pt-1 border-t border-slate-100 dark:border-slate-800">
          {/* Reverse DAC Playback */}
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {bilingualMode === 'en' ? '3. Digital Audio File' : '3. Tệp nhạc số'}
            </div>
            <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400">
              {bilingualMode === 'en' ? 'Binary bitstream' : 'Dãy bit nhị phân'}
            </div>
          </div>

          <div className="text-center font-black text-slate-400">→</div>

          {/* DAC Circuit */}
          <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-center space-y-1">
            <div className="text-xs font-bold text-purple-700 dark:text-purple-300">
              {bilingualMode === 'en' ? '4. DAC Circuit' : '4. Mạch DAC'}
            </div>
            <div className="text-[11px] text-purple-600/80 dark:text-purple-400">
              {bilingualMode === 'en' ? 'Digital-to-Analog (Pulse Reconstruction)' : 'Digital-to-Analog (Giải mã xung)'}
            </div>
          </div>

          <div className="text-center font-black text-slate-400">→</div>

          {/* Speaker */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-1">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {bilingualMode === 'en' ? '5. Speaker / Headphones' : '5. Loa & Tai nghe'}
            </div>
            <div className="text-[11px] text-slate-500">
              {bilingualMode === 'en' ? 'Acoustic wave to ear' : 'Sóng âm tai người nghe'}
            </div>
          </div>
        </div>
      </div>

      {/* Bitrate & File Size Interactive Calculator */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              {bilingualMode === 'en' ? 'Interactive Tool' : 'Công cụ thực hành'}
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-100">
              <BilingualText
                vi="Máy tính Tốc độ bit & Kích thước tệp âm thanh"
                en="Bit-rate & Audio File Size Calculator"
              />
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">
              {bilingualMode === 'en' ? 'Song Length:' : 'Thời lượng bài hát:'}
            </span>
            <span className="font-mono font-bold text-amber-300">
              {songMinutes} {bilingualMode === 'en' ? 'mins' : 'phút'} ({songSeconds}s)
            </span>
          </div>
        </div>

        {/* Duration Slider */}
        <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300">
              {bilingualMode === 'en' ? 'Slide to adjust audio duration:' : 'Kéo để chọn thời lượng bản ghi âm / bài hát:'}
            </span>
            <span className="font-mono font-bold text-indigo-400">
              {songMinutes} {bilingualMode === 'en' ? 'mins' : 'phút'}
            </span>
          </div>
          <input
            type="range"
            min={0.5}
            max={10}
            step={0.5}
            value={songMinutes}
            onChange={(e) => setSongMinutes(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>{bilingualMode === 'en' ? '30 seconds (Voice clip)' : '30 giây (Đoạn ghi âm)'}</span>
            <span>{bilingualMode === 'en' ? '3.5 mins (Standard track)' : '3.5 phút (Bài hát tiêu chuẩn)'}</span>
            <span>{bilingualMode === 'en' ? '10 mins (Podcast)' : '10 phút (Podcast)'}</span>
          </div>
        </div>

        {/* Calculated Table for All 4 Formats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formats.map((fmt) => {
            // Formula: Size in MB = (bitrateKbps * seconds) / (8 * 1024)
            const sizeMB = ((fmt.bitrateKbps * songSeconds) / 8192).toFixed(2);
            return (
              <div
                key={fmt.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-all"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-100">{fmt.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {bilingualMode === 'en' ? fmt.ratioEn : fmt.ratioVi}
                    </span>
                  </div>
                  <div className="text-xs text-indigo-400 font-semibold">
                    {bilingualMode === 'en' ? fmt.typeEn : fmt.typeVi}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    {bilingualMode === 'en' ? fmt.descEn : fmt.descVi}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">
                      {bilingualMode === 'en' ? 'Bit-rate:' : 'Tốc độ bit:'}
                    </span>
                    <span className="font-mono font-bold text-slate-200">{fmt.bitrateKbps} Kbps</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400">
                      {bilingualMode === 'en' ? 'File Size:' : 'Dung lượng:'}
                    </span>
                    <span className="text-base sm:text-lg font-black font-mono text-emerald-400">
                      {sizeMB} MB
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3.5 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-200 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <BilingualText
              vi="Nhận xét cốt lõi (SGK Trang 29): Tệp .mp3 ở mức 128 Kbps chỉ tốn khoảng ~3.28 MB cho bài hát 3.5 phút, nhỏ hơn xấp xỉ 10 lần so với tệp .wav gốc (~36.19 MB). Điều này cho phép lưu hàng nghìn bài hát vào điện thoại di động và nghe trực tuyến không bị giật lag."
              en="Core Textbook Observation (Page 29): A standard 128 Kbps MP3 file takes only ~3.28 MB for a 3.5-minute song, roughly 10 times smaller than the uncompressed WAV file (~36.19 MB). This enables storing thousands of tracks on mobile phones and buffer-free streaming."
            />
          </p>
        </div>
      </div>

      {/* Official Summary Box 1 (Hộp Ghi nhớ 1 SGK Trang 29) */}
      <div className="p-5 rounded-2xl bg-linear-to-r from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-500/40 dark:border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText vi="Hộp Ghi nhớ 1 (SGK Trang 29)" en="Official Summary Box 1 (Page 29)" />
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <BilingualText
                vi="Phương pháp cơ bản số hoá âm thanh là điều chế mã xung (Pulse Code Modulation, viết tắt là PCM)."
                en="The fundamental method for digitizing audio is Pulse Code Modulation (PCM)."
              />
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <BilingualText
                vi="Tốc độ bit (bit-rate) là số bit cần thiết để biểu diễn một giây âm thanh."
                en="Bit-rate is the number of bits required to represent one second of audio."
              />
            </span>
          </li>
        </ul>
      </div>

      {/* SGK Page 29 Reinforcement Questions (Câu hỏi củng cố 1 & 2 Trang 29) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Câu hỏi củng cố cuối mục 1 (SGK Trang 29)"
                en="Section 1 Check Questions (Textbook Page 29)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Chọn câu trả lời để kiểm tra mức độ thấu hiểu bài học"
                en="Select answers to test your conceptual understanding"
              />
            </p>
          </div>
        </div>

        {/* Question 1 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {bilingualMode === 'en' ? 'Question 1 (Page 29)' : 'Câu hỏi 1 (Trang 29)'}
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="Khi số hoá âm thanh, nếu chu kì lấy mẫu tăng lên thì lượng thông tin lưu trữ sẽ thay đổi như thế nào?"
              en="When digitizing audio, if the sampling period increases, how does the amount of stored data change?"
            />
          </p>

          <div className="space-y-2">
            {[
              { id: 0, vi: 'A. Tăng lên do biên độ lớn hơn', en: 'A. Increases due to higher amplitude', correct: false },
              { id: 1, vi: 'B. Giảm đi vì số lượng mẫu lấy được trong 1 giây ít hơn', en: 'B. Decreases because fewer samples are recorded per second', correct: true },
              { id: 2, vi: 'C. Không thay đổi vì định dạng giữ nguyên', en: 'C. Remains unchanged', correct: false }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setQ1Selected(opt.id);
                  setQ1ShowExp(true);
                }}
                className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  q1Selected === opt.id
                    ? opt.correct
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span>{bilingualMode === 'en' ? opt.en : opt.vi}</span>
                {q1Selected === opt.id && (
                  <span className="text-xs font-bold">
                    {opt.correct ? (bilingualMode === 'en' ? '✓ Correct' : '✓ Đúng') : (bilingualMode === 'en' ? '✗ Incorrect' : '✗ Sai')}
                  </span>
                )}
              </button>
            ))}
          </div>

          {q1ShowExp && (
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-xs text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
              <span className="font-bold">{bilingualMode === 'en' ? 'Textbook Explanation: ' : 'Giải thích SGK: '}</span>
              <BilingualText
                vi="Chu kì lấy mẫu là khoảng thời gian giữa 2 lần lấy mẫu. Nếu chu kì tăng lên thì tần số lấy mẫu giảm, dẫn đến trong 1 giây lấy được ít điểm mẫu hơn, do đó tổng lượng bit cần lưu trữ sẽ giảm xuống (tuy nhiên âm thanh sẽ kém trung thực hơn)."
                en="The sampling period is the duration between two sample points. If the period increases, sampling frequency decreases, resulting in fewer samples per second. Consequently, total storage bits decrease (with lower audio fidelity)."
              />
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {bilingualMode === 'en' ? 'Question 2 (Page 29)' : 'Câu hỏi 2 (Trang 29)'}
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="Tại sao các tệp âm thanh nén (ví dụ .mp3) lại được sử dụng rộng rãi hơn tệp không nén (ví dụ .wav)?"
              en="Why are compressed audio files (e.g. .mp3) much more widely used than uncompressed ones (e.g. .wav)?"
            />
          </p>

          <div className="space-y-2">
            {[
              { id: 0, vi: 'A. Vì tệp .mp3 có kích thước nhỏ hơn ~10 lần, truyền tải qua Internet nhanh chóng và tiết kiệm bộ nhớ', en: 'A. Because .mp3 files are ~10x smaller, allowing rapid Internet streaming and saving device storage', correct: true },
              { id: 1, vi: 'B. Vì tệp .wav không thể mở được trên máy tính Windows', en: 'B. Because .wav files cannot be played on Windows PCs', correct: false },
              { id: 2, vi: 'C. Vì tệp .mp3 loại bỏ hoàn toàn giọng hát của ca sĩ', en: 'C. Because .mp3 completely removes the singer voice', correct: false }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setQ2Selected(opt.id);
                  setQ2ShowExp(true);
                }}
                className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                  q2Selected === opt.id
                    ? opt.correct
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span>{bilingualMode === 'en' ? opt.en : opt.vi}</span>
                {q2Selected === opt.id && (
                  <span className="text-xs font-bold">
                    {opt.correct ? (bilingualMode === 'en' ? '✓ Correct' : '✓ Đúng') : (bilingualMode === 'en' ? '✗ Incorrect' : '✗ Sai')}
                  </span>
                )}
              </button>
            ))}
          </div>

          {q2ShowExp && (
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-xs text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
              <span className="font-bold">{bilingualMode === 'en' ? 'Textbook Explanation: ' : 'Giải thích SGK: '}</span>
              <BilingualText
                vi="Theo mục 1b Trang 29 SGK, tệp wav có kích thước rất lớn. Định dạng mp3 nén bỏ bớt thông tin tai người khó nhận thấy, giảm dung lượng khoảng 10 lần trong khi vẫn duy trì chất lượng chấp nhận được, rất thuận tiện lưu trên điện thoại và gửi nhận qua mạng."
                en="According to Section 1b on Page 29, raw WAV files are enormous. MP3 uses psychoacoustic compression to eliminate imperceptible frequencies, shrinking files by roughly 10 times while maintaining acceptable quality for mobile storage and web transmission."
              />
            </div>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={6} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: Audio Digitization' : 'Quay lại: Số hoá âm thanh'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: Image Representation & RGB' : 'Tiếp theo: Biểu diễn hình ảnh & Hệ màu RGB'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
