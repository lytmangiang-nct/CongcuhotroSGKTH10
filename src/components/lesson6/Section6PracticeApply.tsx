import React, { useState } from 'react';
import {
  Award,
  Volume2,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Monitor,
  Disc,
  Headphones,
  FileImage,
  Calculator,
  Sliders,
  Check,
  X,
  Lightbulb,
  Info
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section6PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    prevPage,
    setOriginalPageTarget,
    setShowOriginalModal,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isCertificateEarned,
    isAllSectionsComplete,
    currentLesson,
    completedSections
  } = useBook();

  // Practice 1: LED Board Matrix (Hình 6.9 SGK)
  // 5x5 LED array simulation
  const [ledStates, setLedStates] = useState<boolean[]>([
    false, true, true, true, false,
    true, false, false, false, true,
    true, true, true, true, true,
    true, false, false, false, true,
    true, false, false, false, true
  ]); // Letter 'A' default
  const [p1QuestionAnswer, setP1QuestionAnswer] = useState<number | null>(null);
  const [showP1Solution, setShowP1Solution] = useState<boolean>(false);

  // Practice 2: CD Playback Time Calculator
  const [cdCapacityMB, setCdCapacityMB] = useState<number>(650);
  const [cdBitrateKbps, setCdBitrateKbps] = useState<number>(1411);
  const [showP2Solution, setShowP2Solution] = useState<boolean>(false);

  // Application 1: Streaming Audio Quality State
  const [selectedQuality, setSelectedQuality] = useState<'128' | '320' | 'lossless'>('128');

  // Application 2: Logo Format Choice State
  const [selectedFormat, setSelectedFormat] = useState<'bmp' | 'jpeg' | 'png' | null>(null);
  const [showApp2Solution, setShowApp2Solution] = useState<boolean>(false);

  const speechVi =
    'Phần Luyện tập và Vận dụng Bài 6. Luyện tập 1: Bảng đèn LED ma trận với mỗi bóng đèn cần 1 bit để biểu diễn trạng thái bật hoặc tắt. Luyện tập 2: Đĩa CD dung lượng 650 MB với tốc độ bit 1411 Kbps phát được xấp xỉ 63 phút âm thanh liên tục. Vận dụng 1: Chọn chất lượng 128 Kbps, 320 Kbps hay Lossless khi nghe nhạc trực tuyến. Vận dụng 2: Lưu logo bằng định dạng PNG sắc nét và trong suốt.';

  const speechEn =
    'Lesson 6 Practice and Application. Practice 1: LED billboard where each diode lamp requires 1 bit for on or off state. Practice 2: A 650 MB CD playing at 1411 Kbps lasts roughly 63 minutes continuously. Application 1: Choosing 128 Kbps, 320 Kbps, or Lossless audio streaming. Application 2: Saving school logos as PNG for lossless sharpness and transparent backgrounds.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  const toggleLed = (idx: number) => {
    const next = [...ledStates];
    next[idx] = !next[idx];
    setLedStates(next);
  };

  // Practice 2 Math
  const cdTotalKbits = cdCapacityMB * 1024 * 8;
  const cdDurationSeconds = cdTotalKbits / cdBitrateKbps;
  const cdDurationMinutes = (cdDurationSeconds / 60).toFixed(1);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
              {bilingualMode === 'en' ? 'Section 5: Practice & Apply' : 'Mục 5: Luyện tập & Vận dụng'}
            </span>
            <span className="text-xs text-slate-500 font-mono">SGK Trang 32</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(32);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{bilingualMode === 'en' ? 'Page 32 Scan' : 'Bản quét Tr. 32'}</span>
            </button>
          </div>
          <h2
            data-en="Practice, Application & Lesson 6 Evaluation"
            data-vi="Luyện tập, Vận dụng & Đánh giá năng lực Bài 6"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100"
          >
            <BilingualText
              vi="Luyện tập, Vận dụng & Đánh giá năng lực Bài 6"
              en="Practice, Application & Lesson 6 Evaluation"
            />
          </h2>
        </div>
      </div>

      {/* Practice 1: LED Board (Hình 6.9 SGK Trang 32) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded">
                  {bilingualMode === 'en' ? 'Practice 1' : 'Luyện tập 1'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {bilingualMode === 'en' ? 'Figure 6.9 Textbook Page 32' : 'Hình 6.9 SGK Trang 32'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                <BilingualText
                  vi="Bảng quảng cáo đèn LED ma trận (Bit Depth 1-bit)"
                  en="LED Billboard Matrix (1-bit Depth Analysis)"
                />
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowP1Solution(!showP1Solution)}
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            {showP1Solution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showP1Solution ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải') : (bilingualMode === 'en' ? 'Show Solution' : 'Xem lời giải SGK')}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <BilingualText
            vi="Hình 6.9 là một bảng quảng cáo bằng đèn LED. Hãy cho biết: Mỗi bóng đèn LED biểu diễn một điểm ảnh hay nhiều điểm ảnh? Cần bao nhiêu bit để biểu diễn trạng thái của một bóng đèn LED?"
            en="Figure 6.9 shows an LED advertising billboard. Does each LED bulb represent a single pixel or multiple pixels? How many bits are required to encode the operational state of one LED bulb?"
          />
        </p>

        {/* Interactive LED Matrix */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[11px] font-mono text-slate-400">
              {bilingualMode === 'en' ? 'Interactive 5x5 LED Marquee (Click to toggle lamps):' : 'Bảng LED 5x5 tương tác (Nhấp để bật/tắt bóng):'}
            </span>
            <div className="grid grid-cols-5 gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-inner">
              {ledStates.map((isOn, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleLed(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all cursor-pointer border ${
                    isOn
                      ? 'bg-rose-500 border-rose-300 shadow-md shadow-rose-500/80 scale-105'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-600'
                  }`}
                  title={`LED ${idx}: ${isOn ? (bilingualMode === 'en' ? 'On (1)' : 'Bật (1)') : (bilingualMode === 'en' ? 'Off (0)' : 'Tắt (0)')}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Question Choice */}
          <div className="space-y-2 text-xs flex-1 max-w-md">
            <span className="font-bold text-slate-300">
              {bilingualMode === 'en' ? 'Select the correct conclusion:' : 'Chọn kết luận chính xác:'}
            </span>
            <div className="space-y-1.5">
              {[
                {
                  id: 1,
                  textVi: '1 bóng LED = 1 pixel; Cần 1 bit (0: Tắt, 1: Bật)',
                  textEn: '1 LED bulb = 1 pixel; Requires 1 bit (0: Off, 1: On)',
                  correct: true
                },
                {
                  id: 2,
                  textVi: '1 bóng LED = 1 pixel; Cần 8 bit (256 sắc độ)',
                  textEn: '1 LED bulb = 1 pixel; Requires 8 bits (256 levels)',
                  correct: false
                },
                {
                  id: 3,
                  textVi: '1 bóng LED = Nhiều pixel; Cần 24 bit (RGB)',
                  textEn: '1 LED bulb = Multiple pixels; Requires 24 bits (RGB)',
                  correct: false
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setP1QuestionAnswer(opt.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    p1QuestionAnswer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{bilingualMode === 'en' ? opt.textEn : opt.textVi}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Practice 1 Solution */}
        {showP1Solution && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5 animate-in fade-in">
            <div className="font-bold text-amber-900 dark:text-amber-300">
              {bilingualMode === 'en' ? 'Detailed Textbook Solution:' : 'Lời giải chi tiết chuẩn SGK:'}
            </div>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <BilingualText
                  vi="Mỗi bóng đèn LED biểu diễn 1 điểm ảnh (pixel): Bảng quảng cáo là một ma trận điểm ảnh, trong đó mỗi phần tử phát sáng độc lập nhỏ nhất là 1 bóng đèn LED."
                  en="Each LED bulb represents 1 pixel: The advertising board functions as a pixel matrix, where each individually addressable luminous element is a single LED."
                />
              </li>
              <li>
                <BilingualText
                  vi="Cần 1 bit để biểu diễn trạng thái của một bóng đèn: Vì mỗi bóng đèn chỉ có 2 trạng thái vật lý phân biệt là Sáng (Bật - tương ứng bit 1) hoặc Tối (Tắt - tương ứng bit 0). Do 2¹ = 2 nên đúng 1 bit là đủ để lưu trữ thông tin của bóng đèn đó."
                  en="1 bit is required to represent the state of an LED bulb: Because each bulb only holds 2 discrete physical states: On (encoded as bit 1) or Off (encoded as bit 0). Since 2¹ = 2, exactly 1 bit is sufficient."
                />
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Practice 2: CD Playback Time Calculator (SGK Trang 32) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Disc className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded">
                  {bilingualMode === 'en' ? 'Practice 2' : 'Luyện tập 2'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {bilingualMode === 'en' ? 'Textbook Page 32' : 'SGK Trang 32'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                <BilingualText
                  vi="Tính thời gian phát âm thanh của đĩa CD 650 MB (1411 Kb/s)"
                  en="Calculate Playback Duration of a 650 MB CD (1411 Kb/s)"
                />
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowP2Solution(!showP2Solution)}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            {showP2Solution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showP2Solution ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải') : (bilingualMode === 'en' ? 'Show Solution' : 'Xem lời giải SGK')}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <BilingualText
            vi="Một đĩa CD có dung lượng 650 MB. Âm thanh nổi (stereo) được ghi với tốc độ bit là 1411 Kb/s. Hãy tính thời gian phát âm thanh liên tục của đĩa CD này."
            en="A compact disc (CD) has a storage capacity of 650 MB. Stereo audio is recorded at a bit-rate of 1411 Kb/s. Calculate the continuous audio playback duration of this CD."
          />
        </p>

        {/* Live Calculation Widget */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-white space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">
                {bilingualMode === 'en' ? 'CD Capacity' : 'Dung lượng CD'}
              </span>
              <div className="font-mono text-base font-black text-amber-400">650 MB</div>
              <span className="text-[10px] text-slate-500 font-mono">
                {bilingualMode === 'en' ? '5,324,800 Kbits' : '5.324.800 Kbit'}
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">
                {bilingualMode === 'en' ? 'Bit-rate' : 'Tốc độ bit (Bitrate)'}
              </span>
              <div className="font-mono text-base font-black text-indigo-400">1411 Kb/s</div>
              <span className="text-[10px] text-slate-500">
                {bilingualMode === 'en' ? 'Standard 16-bit PCM Stereo' : 'Chuẩn PCM Stereo 16-bit'}
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold">
                {bilingualMode === 'en' ? 'Continuous Playback Time' : 'Thời gian phát liên tục'}
              </span>
              <div className="font-mono text-lg font-black text-emerald-400">
                {bilingualMode === 'en' ? '~62.9 mins' : '~62,9 phút'}
              </div>
              <span className="text-[10px] text-slate-400">
                {bilingualMode === 'en' ? '3,774 seconds (~63 mins)' : '3.774 giây (~63 phút)'}
              </span>
            </div>
          </div>
        </div>

        {/* Practice 2 Solution */}
        {showP2Solution && (
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2 animate-in fade-in">
            <div className="font-bold text-blue-900 dark:text-blue-300">
              {bilingualMode === 'en' ? 'Step-by-step Solution:' : 'Các bước giải chi tiết:'}
            </div>
            <div className="space-y-1 font-mono text-xs bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
              <div>
                <strong>
                  {bilingualMode === 'en'
                    ? 'Step 1: Convert 650 MB capacity into Kilobits (Kbit):'
                    : 'Bước 1: Đổi dung lượng 650 MB sang Kilobit (Kbit):'}
                </strong>
              </div>
              <div className="text-indigo-600 dark:text-indigo-400">
                650 MB = 650 × 1024 KB = 665,600 KB
              </div>
              <div className="text-indigo-600 dark:text-indigo-400">
                665,600 KB = 665,600 × 8 Kbit = <strong>5,324,800 Kbit</strong>
              </div>
              <div className="pt-2">
                <strong>
                  {bilingualMode === 'en'
                    ? 'Step 2: Calculate continuous audio duration (t):'
                    : 'Bước 2: Tính thời gian phát âm thanh liên tục (t):'}
                </strong>
              </div>
              <div className="text-emerald-600 dark:text-emerald-400">
                {bilingualMode === 'en'
                  ? 't = Capacity / Bit-rate = 5,324,800 / 1411 ≈ '
                  : 't = Dung lượng / Tốc độ bit = 5.324.800 / 1411 ≈ '}
                <strong>{bilingualMode === 'en' ? '3,773.78 seconds' : '3773,78 giây'}</strong>
              </div>
              <div className="pt-2">
                <strong>
                  {bilingualMode === 'en' ? 'Step 3: Convert to minutes:' : 'Bước 3: Đổi ra phút:'}
                </strong>
              </div>
              <div className="text-emerald-600 dark:text-emerald-400">
                {bilingualMode === 'en'
                  ? '3,773.78 / 60 ≈ '
                  : '3773,78 / 60 ≈ '}
                <strong>{bilingualMode === 'en' ? '62.9 mins ≈ 63 mins (over 1 hour)' : '62,9 phút ≈ 63 phút (hơn 1 tiếng phát nhạc)'}</strong>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              💡 <em>
                <BilingualText
                  vi="Thực tế lịch sử: Chuẩn đĩa CD âm thanh nguyên bản của Sony & Philips được thiết kế ban đầu để phát trọn vẹn bản Giao hưởng số 9 của Beethoven (~74 phút với đĩa 700 MB)."
                  en="Historical Note: The original audio CD standard co-developed by Sony & Philips was deliberately engineered to hold Beethoven's Symphony No. 9 in its entirety (~74 minutes on a 700 MB disc)."
                />
              </em>
            </p>
          </div>
        )}
      </div>

      {/* Application 1: Music Streaming Bitrates (SGK Trang 32) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 px-2 py-0.5 rounded">
                {bilingualMode === 'en' ? 'Application 1' : 'Vận dụng 1'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {bilingualMode === 'en' ? 'Textbook Page 32' : 'SGK Trang 32'}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Lựa chọn mức chất lượng phát nhạc: 128 Kbps, 320 Kbps hay Lossless?"
                en="Streaming Music Quality Choice: 128 Kbps, 320 Kbps, or Lossless?"
              />
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <BilingualText
            vi="Các dịch vụ nghe nhạc trực tuyến (Zing MP3, Spotify, Apple Music) thường cho phép người dùng chọn các mức chất lượng: Tiêu chuẩn (128 Kbps), Chất lượng cao (320 Kbps), Không mất mát (Lossless). Em hãy giải thích sự khác biệt giữa các mức này và cho biết khi nào nên chọn mức nào."
            en="Online music streaming platforms allow users to select bitrates: Standard (128 Kbps), High Quality (320 Kbps), and Lossless. Explain their practical differences and when each mode is ideal."
          />
        </p>

        {/* Quality Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setSelectedQuality('128')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedQuality === '128'
                ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {bilingualMode === 'en' ? 'Standard (128 Kbps)' : 'Tiêu chuẩn (128 Kbps)'}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 font-mono mt-0.5">
              ~0.96 MB / {bilingualMode === 'en' ? 'min' : 'phút'}
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
              <strong>{bilingualMode === 'en' ? 'When to choose: ' : 'Khi nào nên chọn: '}</strong>
              <BilingualText
                vi="Khi dùng gói cước 4G dung lượng thấp hoặc đang di chuyển trên xe bus, tàu xe. Chất lượng đủ tốt cho tai nghe phổ thông."
                en="Ideal for low-data mobile plans or commuting. Sound quality is adequate for entry-level earphones."
              />
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedQuality('320')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedQuality === '320'
                ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {bilingualMode === 'en' ? 'High Quality (320 Kbps)' : 'Chất lượng cao (320 Kbps)'}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 font-mono mt-0.5">
              ~2.4 MB / {bilingualMode === 'en' ? 'min' : 'phút'}
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
              <strong>{bilingualMode === 'en' ? 'When to choose: ' : 'Khi nào nên chọn: '}</strong>
              <BilingualText
                vi="Mức cân bằng tối ưu nhất! Dùng khi có Wifi gia đình và nghe bằng tai nghe có dây/không dây chất lượng tốt."
                en="The most balanced sweet spot! Perfect with home Wi-Fi and quality wired or wireless headphones."
              />
            </p>
          </button>

          <button
            type="button"
            onClick={() => setSelectedQuality('lossless')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedQuality === 'lossless'
                ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 shadow-xs'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
            }`}
          >
            <div className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {bilingualMode === 'en' ? 'Lossless (~1411 Kbps)' : 'Không mất mát (Lossless ~1411 Kbps)'}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400 font-mono mt-0.5">
              ~10.5 MB / {bilingualMode === 'en' ? 'min' : 'phút'}
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
              <strong>{bilingualMode === 'en' ? 'When to choose: ' : 'Khi nào nên chọn: '}</strong>
              <BilingualText
                vi="Giữ 100% âm thanh gốc phòng thu. Chỉ nên chọn khi có bộ giải mã DAC ngoài và dàn loa thính phòng chuyên nghiệp."
                en="Preserves 100% studio master audio. Recommended only with external DAC decoders and audiophile speakers."
              />
            </p>
          </button>
        </div>
      </div>

      {/* Application 2: Saving School Logo (SGK Trang 32) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <FileImage className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-2 py-0.5 rounded">
                  {bilingualMode === 'en' ? 'Application 2' : 'Vận dụng 2'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {bilingualMode === 'en' ? 'Textbook Page 32' : 'SGK Trang 32'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                <BilingualText
                  vi="Chọn định dạng lưu biểu trưng (logo) trường học: BMP, JPEG hay PNG?"
                  en="Choosing File Format for School Logo: BMP, JPEG, or PNG?"
                />
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowApp2Solution(!showApp2Solution)}
            className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            {showApp2Solution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showApp2Solution ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải') : (bilingualMode === 'en' ? 'Show Solution' : 'Xem lời giải SGK')}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <BilingualText
            vi="Khi sử dụng phần mềm đồ hoạ (như Paint, Photoshop) để lưu một bức vẽ biểu trưng (logo) trường em, em nên chọn định dạng nào giữa .bmp, .jpeg và .png? Giải thích lý do."
            en="When designing and saving a school logo in graphic software (such as Paint or Photoshop), which format should you choose among .bmp, .jpeg, and .png? Explain your reasoning."
          />
        </p>

        {/* Format Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'bmp',
              label: '.BMP (Bitmap)',
              correct: false,
              reasonVi: 'Kích thước tệp quá lớn, không hỗ trợ nền trong suốt',
              reasonEn: 'Excessively large file size, no alpha channel transparency support'
            },
            {
              id: 'jpeg',
              label: '.JPEG (Joint Photographic)',
              correct: false,
              reasonVi: 'Nén lossy làm mờ viền chữ/nét vẽ, không hỗ trợ nền trong suốt',
              reasonEn: 'Lossy compression causes artifacts on sharp edges, no transparency'
            },
            {
              id: 'png',
              label: '.PNG (Portable Network Graphics)',
              correct: true,
              reasonVi: 'Nén không mất mát, viền sắc nét và hỗ trợ nền trong suốt (Alpha channel)',
              reasonEn: 'Lossless compression, pixel-sharp vector/line edges, full alpha transparency'
            }
          ].map((fmt) => (
            <button
              key={fmt.id}
              type="button"
              onClick={() => setSelectedFormat(fmt.id as 'bmp' | 'jpeg' | 'png')}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedFormat === fmt.id
                  ? fmt.correct
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-xs'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{fmt.label}</span>
                {selectedFormat === fmt.id && (
                  <span className={`text-xs font-bold ${fmt.correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {fmt.correct
                      ? (bilingualMode === 'en' ? '✓ Optimal Choice' : '✓ Tối ưu nhất')
                      : (bilingualMode === 'en' ? '✗ Not Optimal' : '✗ Không tối ưu')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                {bilingualMode === 'en' ? fmt.reasonEn : fmt.reasonVi}
              </p>
            </button>
          ))}
        </div>

        {/* Application 2 Solution */}
        {showApp2Solution && (
          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2 animate-in fade-in">
            <div className="font-bold text-teal-900 dark:text-teal-300">
              {bilingualMode === 'en' ? 'Detailed Textbook Solution:' : 'Lời giải chi tiết chuẩn SGK:'}
            </div>
            <p>
              <BilingualText
                vi="Em nên chọn định dạng .png vì hai lý do quyết định:"
                en="You should choose the .png format for two definitive reasons:"
              />
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                <BilingualText
                  vi="Nén không mất mát (Lossless compression): Logo trường học thường chứa các nét vẽ hình học, biểu tượng sắc cạnh và dòng chữ tên trường. Định dạng JPEG khi nén sẽ gây hiện tượng nhòe vỡ hạt (artifact) xung quanh nét chữ; trong khi PNG bảo toàn 100% độ sắc nét tuyệt đối."
                  en="Lossless compression: School logos feature sharp geometric outlines and typography. JPEG lossy compression produces ringing artifacts around text edges, whereas PNG retains 100% crisp edge clarity."
                />
              </li>
              <li>
                <BilingualText
                  vi="Hỗ trợ kênh trong suốt (Alpha Channel Transparency): Logo định dạng PNG có thể tách nền trong suốt, giúp chèn logo lên áo đồng phục, slide thuyết trình, website trường hay các văn bản mà không bị một khung viền trắng thô kệch che mất nền bên dưới."
                  en="Alpha channel transparency: PNG images support true background transparency, letting the emblem sit seamlessly on uniforms, presentation decks, or school portals without an unsightly white bounding box."
                />
              </li>
            </ol>
          </div>
        )}
      </div>



      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={6} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: Bitmap & Formats' : 'Quay lại: Ảnh Bitmap & Định dạng'}</span>
        </button>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {bilingualMode === 'en' ? 'End of Lesson 6 • Ready for Quiz' : 'Kết thúc Bài 6 • Sẵn sàng làm bài kiểm tra'}
        </div>
      </div>
    </div>
  );
};
