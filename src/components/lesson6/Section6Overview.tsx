import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  Target,
  ArrowRight,
  HelpCircle,
  Music,
  Image as ImageIcon,
  CheckCircle2,
  Sliders,
  ZoomIn,
  Binary,
  Layers,
  Lightbulb,
  Radio,
  Eye,
  Info
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section6Overview: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive Activity 1: Multimedia Nature vs Digital Sandbox
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeMediaTab, setActiveMediaTab] = useState<'sound' | 'image'>('sound');
  const [soundWaveType, setSoundWaveType] = useState<'analog' | 'sampled'>('analog');
  const [selectedActivityAnswer, setSelectedActivityAnswer] = useState<number | null>(null);
  const [showActivityExplanation, setShowActivityExplanation] = useState<boolean>(false);

  const speechOverviewVi =
    'Bài 6: Dữ liệu âm thanh và hình ảnh. Mục tiêu: Biết phương pháp cơ bản số hoá âm thanh và hình ảnh. Giải thích được các đại lượng chu kì lấy mẫu, tốc độ bit, điểm ảnh, độ sâu màu. Phân biệt được các định dạng tệp WAV, MP3, BMP, JPEG, PNG.';

  const speechOverviewEn =
    'Lesson 6: Audio and Image Data. Objectives: Understand fundamental methods of digitizing audio and images. Explain key parameters: sampling period, bit-rate, pixel, and bit depth. Distinguish standard file formats WAV, MP3, BMP, JPEG, and PNG.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechOverviewEn : speechOverviewVi);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Breadcrumb & Audio button */}
      <div className="bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold tracking-wider uppercase">
                {bilingualMode === 'en' ? 'Topic 1: Computers & Knowledge Society' : 'Chủ đề 1: Máy tính & Xã hội tri thức'}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 text-xs font-semibold border border-emerald-300/30">
                {bilingualMode === 'en' ? 'Textbook Pages 28 – 32' : 'Trang 28 – 32 SGK'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setOriginalPageTarget(28);
                  setShowOriginalModal(true);
                }}
                className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 hover:bg-amber-400/30 text-xs font-semibold border border-amber-300/30 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'View Page 28 Scan' : 'Xem bản quét Tr. 28'}</span>
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              {bilingualMode === 'en'
                ? 'Lesson 6: Audio and Image Data'
                : 'Bài 6: Dữ liệu âm thanh và hình ảnh'}
            </h1>
            <p className="text-violet-100 text-sm sm:text-base max-w-2xl">
              {bilingualMode === 'en'
                ? 'Bridging continuous physical nature into discrete binary data: Pulse Code Modulation (PCM) and Bitmap Pixels.'
                : 'Cầu nối giữa thế giới tương tự liên tục và dữ liệu nhị phân rời rạc: Điều chế mã xung (PCM) và Ma trận điểm ảnh (Bitmap).'}
            </p>
          </div>
        </div>
      </div>

      {/* 3 Core Learning Objectives (Mục tiêu bài học SGK Trang 28) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Mục tiêu bài học (SGK Trang 28)"
                en="Learning Objectives (Textbook Page 28)"
              />
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="3 yêu cầu cần đạt chính thức theo Chương trình GDPT 2018 Tin học 10"
                en="3 official competency standards according to the 2018 Curriculum for Grade 10"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900/50 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-violet-200 dark:bg-violet-900/60 flex items-center justify-center text-xs">
                  1
                </span>
                <BilingualText vi="Nguyên lý số hoá" en="Digitization Principles" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <BilingualText
                  vi="Biết được phương pháp cơ bản số hoá âm thanh (điều chế mã xung PCM) và hình ảnh (ma trận điểm ảnh bitmap)."
                  en="Understand the fundamental methods for digitizing audio (Pulse Code Modulation - PCM) and images (bitmap pixel matrix)."
                />
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-violet-100 dark:border-violet-900/30 text-[11px] text-violet-600 dark:text-violet-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PCM & Raster Bitmap</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-indigo-200 dark:bg-indigo-900/60 flex items-center justify-center text-xs">
                  2
                </span>
                <BilingualText vi="Đại lượng kỹ thuật" en="Technical Parameters" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <BilingualText
                  vi="Giải thích được các đại lượng cơ bản: chu kì lấy mẫu, tốc độ bit (bit-rate), điểm ảnh (pixel), độ sâu màu (bit depth)."
                  en="Explain fundamental parameters: sampling period, bit-rate, pixel (picture element), and color bit depth."
                />
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-900/30 text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Sampling, Bitrate, RGB</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-900/60 flex items-center justify-center text-xs">
                  3
                </span>
                <BilingualText vi="Định dạng tệp tin" en="File Formats" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <BilingualText
                  vi="Biết và phân biệt được một số định dạng tệp âm thanh (WAV, MP3) và hình ảnh (BMP, JPEG, PNG)."
                  en="Recognize and differentiate common audio formats (WAV, MP3) and image formats (BMP, JPEG, PNG)."
                />
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-100 dark:border-blue-900/30 text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Lossless vs Lossy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Section (Khởi động SGK Trang 28) */}
      <div className="bg-linear-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-800/40 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              {bilingualMode === 'en' ? 'Warm-up Inquiry (Textbook Page 28)' : 'Phần Khởi động (SGK Trang 28)'}
            </span>
            <h2 className="text-xl font-bold text-slate-100">
              <BilingualText
                vi="Làm thế nào máy tính số 'nhìn' thấy ảnh và 'nghe' được âm thanh?"
                en="How do digital computers 'see' images and 'hear' sound?"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Pedagogical text */}
          <div className="lg:col-span-6 space-y-3 text-sm text-slate-300 leading-relaxed">
            <p>
              <BilingualText
                vi="Trong thế giới tự nhiên, âm thanh là sóng dao động cơ học lan truyền trong không khí, còn hình ảnh là các luồng quang phổ ánh sáng liên tục (tín hiệu tương tự - analog). Chúng có vô số mức độ biên độ và sắc thái liên tục."
                en="In the physical world, sound travels as continuous acoustic waves in air, and vision consists of continuous light spectra (analog signals). They possess infinite continuous variations of amplitudes and hues."
              />
            </p>
            <p className="bg-indigo-900/40 p-3.5 rounded-xl border border-indigo-700/40 text-indigo-200 text-xs sm:text-sm">
              <span className="font-bold text-amber-300">
                {bilingualMode === 'en' ? 'Core Paradox: ' : 'Mâu thuẫn cơ bản: '}
              </span>
              <BilingualText
                vi="Máy tính là thiết bị điện tử số, bên trong bộ nhớ và CPU chỉ lưu trữ và xử lý duy nhất các dãy số nhị phân 0 và 1 (rời rạc). Vậy làm sao để máy tính lưu trữ và tái tạo lại bài hát hay bức ảnh chân thực?"
                en="Computers are discrete digital electronic machines whose registers and memory operate strictly on binary bits 0 and 1. How can computers store and faithfully reproduce rich music tracks and vivid photos?"
              />
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-indigo-400 shrink-0" />
              <BilingualText
                vi="Hãy trải nghiệm phòng thí nghiệm tương tác bên cạnh để khám phá giải pháp số hoá!"
                en="Interact with the sandbox panel on the right to discover the digitization solution!"
              />
            </div>
          </div>

          {/* Interactive Multimedia Nature vs Digital Sandbox */}
          <div className="lg:col-span-6 bg-slate-950/80 p-5 rounded-xl border border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('sound')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeMediaTab === 'sound'
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-800'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Audio Waveform' : 'Sóng âm thanh'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('image')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeMediaTab === 'image'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-800'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Image Pixels' : 'Điểm ảnh'}</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-emerald-400">
                {activeMediaTab === 'sound' ? 'PCM Sampling' : 'Raster Bitmap'}
              </span>
            </div>

            {/* Sound Wave Interactive Canvas */}
            {activeMediaTab === 'sound' && (
              <div className="space-y-3">
                <div className="relative h-44 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 400 160">
                    <line x1="0" y1="80" x2="400" y2="80" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                    
                    {/* Analog Continuous Curve */}
                    <path
                      d="M 0 80 C 50 10, 100 150, 150 80 C 200 10, 250 150, 300 80 C 350 20, 380 130, 400 80"
                      fill="none"
                      stroke={soundWaveType === 'analog' ? '#38bdf8' : '#475569'}
                      strokeWidth={soundWaveType === 'analog' ? '3' : '1.5'}
                      opacity={soundWaveType === 'analog' ? '1' : '0.4'}
                    />

                    {/* Sampled Discretized Waveform */}
                    {soundWaveType === 'sampled' && (
                      <g>
                        {/* Vertical sample pins and staircases */}
                        {[20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350, 380].map((x, idx) => {
                          const yValues = [45, 20, 55, 120, 80, 25, 45, 120, 135, 80, 35, 110, 80];
                          const y = yValues[idx];
                          return (
                            <g key={x}>
                              <line x1={x} y1="80" x2={x} y2={y} stroke="#a855f7" strokeWidth="2" strokeDasharray="2 2" />
                              <circle cx={x} cy={y} r="4" fill="#ec4899" />
                              <text x={x - 10} y={y < 80 ? y - 6 : y + 14} fill="#a7f3d0" fontSize="9" fontFamily="monospace">
                                {idx.toString(2).padStart(4, '0')}
                              </text>
                            </g>
                          );
                        })}
                      </g>
                    )}
                  </svg>
                  
                  <div className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-cyan-300 border border-cyan-800">
                    {soundWaveType === 'analog'
                      ? bilingualMode === 'en' ? 'Continuous Analog Curve' : 'Đường cong tương tự liên tục'
                      : bilingualMode === 'en' ? 'Discrete PCM Binary Samples' : 'Các mẫu số hoá nhị phân (PCM)'}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSoundWaveType('analog')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                        soundWaveType === 'analog'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {bilingualMode === 'en' ? '1. Analog Wave' : '1. Sóng tương tự'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSoundWaveType('sampled')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                        soundWaveType === 'sampled'
                          ? 'bg-fuchsia-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {bilingualMode === 'en' ? '2. PCM Samples' : '2. Lấy mẫu PCM'}
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {soundWaveType === 'analog'
                      ? (bilingualMode === 'en' ? 'Infinite levels' : 'Vô số mức liên tục')
                      : (bilingualMode === 'en' ? 'Discrete 4-bit codes' : 'Dãy mã 4-bit rời rạc')}
                  </span>
                </div>
              </div>
            )}

            {/* Image Pixels Interactive Canvas */}
            {activeMediaTab === 'image' && (
              <div className="space-y-3">
                <div className="relative h-44 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
                  {/* Grid of simulated pixels */}
                  <div
                    className="grid gap-1 transition-all duration-300"
                    style={{
                      gridTemplateColumns: `repeat(${zoomLevel === 1 ? 8 : 4}, minmax(0, 1fr))`,
                      width: zoomLevel === 1 ? '160px' : '220px',
                      height: zoomLevel === 1 ? '160px' : '220px'
                    }}
                  >
                    {[
                      '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
                      '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#0891b2', '#2563eb', '#7c3aed', '#db2777',
                      '#b91c1c', '#c2410c', '#a16207', '#15803d', '#0e7490', '#1d4ed8', '#6d28d9', '#be185d',
                      '#991b1b', '#9a3412', '#854d0e', '#166534', '#155e75', '#1e40af', '#5b21b6', '#9d174d'
                    ].slice(0, zoomLevel === 1 ? 32 : 16).map((color, i) => (
                      <div
                        key={i}
                        className="rounded-xs flex flex-col items-center justify-center transition-all border border-black/20 text-[8px] font-mono font-bold text-white shadow-inner"
                        style={{ backgroundColor: color }}
                      >
                        {zoomLevel > 1 && (
                          <span className="bg-black/60 px-1 rounded text-[8px]">
                            {color.toUpperCase()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 text-emerald-300 border border-emerald-800">
                    {zoomLevel === 1
                      ? bilingualMode === 'en' ? 'Normal View: Continuous Image' : 'Nhìn từ xa: Bức ảnh liên tục'
                      : bilingualMode === 'en' ? 'Microscope: Discrete Pixels' : 'Kính hiển vi: Từng ô điểm ảnh rời rạc'}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                        zoomLevel === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {bilingualMode === 'en' ? '1x Normal' : '1x Bình thường'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(4)}
                      className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer flex items-center gap-1 ${
                        zoomLevel === 4 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <ZoomIn className="w-3 h-3" />
                      <span>{bilingualMode === 'en' ? '4x Zoom Pixel' : '4x Soi Pixel'}</span>
                    </button>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {zoomLevel === 1
                      ? (bilingualMode === 'en' ? 'Human eyes blur pixels together' : 'Mắt người nhìn thấy bức tranh mượt')
                      : (bilingualMode === 'en' ? 'Each box has 1 RGB color code' : 'Mỗi ô vuông là 1 mã màu RGB')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Activity 1: Sound Recording in Nature (Hoạt động 1 SGK Trang 28) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                {bilingualMode === 'en' ? 'Activity 1' : 'Hoạt động 1'}
              </span>
              <span className="text-xs text-slate-400 font-mono">SGK Trang 28</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Biểu diễn âm thanh trong cuộc sống và máy tính"
                en="Representing sound in daily life and in computers"
              />
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <BilingualText
            vi="Khi một ca sĩ hát vào micro, sóng âm thanh làm rung màng micro tạo ra dòng điện biến đổi liên tục. Máy tính sẽ làm gì để lưu được bài hát này vào ổ cứng?"
            en="When a vocalist sings into a microphone, acoustic sound waves vibrate the diaphragm, producing a continuously undulating electrical current. What does the computer do to save this song onto its hard drive?"
          />
        </p>

        {/* 4 Interactive Choices */}
        <div className="space-y-2.5 pt-2">
          {[
            {
              id: 0,
              textVi: 'A. Chụp ảnh lại ca sĩ và lưu trữ sóng âm dạng video',
              textEn: 'A. Take a photo of the singer and store audio as video',
              isCorrect: false
            },
            {
              id: 1,
              textVi: 'B. Đo biên độ tín hiệu ở những thời điểm rời rạc cách đều nhau (lấy mẫu) rồi đổi thành các dãy bit nhị phân (PCM)',
              textEn: 'B. Measure signal amplitudes at discrete equidistant time intervals (sampling) and convert them into binary bitstreams (PCM)',
              isCorrect: true
            },
            {
              id: 2,
              textVi: 'C. Đếm tổng số từ tiếng Việt mà ca sĩ vừa hát rồi gõ lại vào Microsoft Word',
              textEn: 'C. Count the words sung by the vocalist and transcribe them into Microsoft Word',
              isCorrect: false
            },
            {
              id: 3,
              textVi: 'D. Lưu trữ trực tiếp sóng âm thanh cơ học vào các thanh RAM mà không cần chuyển đổi',
              textEn: 'D. Store mechanical acoustic waves directly into RAM chips without conversion',
              isCorrect: false
            }
          ].map((choice) => {
            const isSelected = selectedActivityAnswer === choice.id;
            return (
              <button
                key={choice.id}
                type="button"
                onClick={() => {
                  setSelectedActivityAnswer(choice.id);
                  setShowActivityExplanation(true);
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? choice.isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-xs'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isSelected
                      ? choice.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {String.fromCharCode(65 + choice.id)}
                </div>
                <div className="text-xs sm:text-sm font-medium">
                  {bilingualMode === 'en' ? choice.textEn : choice.textVi}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation Alert */}
        {showActivityExplanation && selectedActivityAnswer === 1 && (
          <div className="mt-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200 text-xs sm:text-sm space-y-1.5 animate-in fade-in">
            <div className="font-bold flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>
                <BilingualText
                  vi="Phương pháp điều chế mã xung (PCM):"
                  en="Pulse Code Modulation (PCM):"
                />
              </span>
            </div>
            <p className="leading-relaxed">
              <BilingualText
                vi="Theo mục 1a Trang 28 SGK Tin học 10: Tín hiệu âm thanh liên tục được lấy mẫu theo chu kì đều đặn, lượng tử hoá biên độ và mã hoá thành chuỗi bit nhị phân. Đây chính là phương pháp PCM chuẩn quốc tế."
                en="According to Section 1a, Page 28 of Informatics 10: The continuous audio signal is sampled at regular periods, quantized in amplitude, and binary-encoded. This is the international PCM standard."
              />
            </p>
          </div>
        )}
      </div>

      {/* Teacher Prompts Widget for Lesson 6 */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={6} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {bilingualMode === 'en' ? 'Section 1 of 6' : 'Phần 1 / 6'}
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: Audio Digitization & PCM' : 'Tiếp theo: Số hoá âm thanh & PCM'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
