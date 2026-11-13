import React, { useState } from 'react';
import {
  Cpu,
  Volume2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  CheckCircle2,
  BookOpen,
  Info,
  Check,
  X,
  Eye,
  EyeOff,
  RotateCcw,
  Bookmark,
  Code2,
  Binary,
  Database
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section5LogicRepresentation: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive 8-bit Byte Logic Flags Sandbox
  const [byteFlags, setByteFlags] = useState<number[]>([1, 0, 1, 1, 0, 0, 1, 0]);

  // Reinforcement Question (SGK Page 27) - Strict no pre-answer!
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Toggle single bit in the 8-bit byte
  const toggleBit = (idx: number) => {
    setByteFlags((prev) => {
      const next = [...prev];
      next[idx] = next[idx] === 1 ? 0 : 1;
      return next;
    });
  };

  const flagDescriptions = bilingualMode === 'en' ? [
    'Flag 0: Internet connected',
    'Flag 1: Dark mode enabled',
    'Flag 2: Administrator rights (Admin)',
    'Flag 3: Audio enabled (Sound ON)',
    'Flag 4: New notification alert',
    'Flag 5: Video recording active',
    'Flag 6: Identity verified',
    'Flag 7: Battery saver mode'
  ] : [
    'Flag 0: Mạng Internet kết nối',
    'Flag 1: Chế độ ban đêm (Dark mode)',
    'Flag 2: Quyền quản trị viên (Admin)',
    'Flag 3: Âm thanh bật (Sound ON)',
    'Flag 4: Thông báo mới (New alert)',
    'Flag 5: Đang quay video (Recording)',
    'Flag 6: Đã xác thực CCCD (Verified)',
    'Flag 7: Chế độ tiết kiệm pin (Battery saver)'
  ];

  const speechText =
    "Representation of Logic Data on Pages 26 and 27. Inside a computer, only a single bit is needed to represent a logic value: bit 1 represents True, and bit 0 represents False. An 8-bit byte can pack up to 8 independent boolean flags, optimizing memory. Programming languages provide conventions for boolean types: Python uses True and False under the bool type, while C and C++ utilize non-zero for true and zero for false. Memory Box 2: Only 1 bit is required to represent a logic value.";

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl text-white shadow-lg border border-purple-700/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-purple-400/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Section 2 • Textbook Pages 26 – 27' : 'Mục 2 • SGK Trang 26 – 27'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {bilingualMode === 'en'
              ? '2. LOGIC DATA REPRESENTATION IN COMPUTERS'
              : '2. BIỂU DIỄN DỮ LIỆU LÔGIC TRONG MÁY TÍNH'}
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 mt-1">
            {bilingualMode === 'en'
              ? '1-Bit Convention (1: True, 0: False) • Packing 8 Flags into 1 Byte • Python Conventions & Memory Box 2'
              : 'Quy ước 1 bit (1: Đúng, 0: Sai) • Đóng gói 8 cờ trong 1 Byte • Quy ước Python & Hộp Ghi nhớ 2'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {bilingualMode !== 'vi' && (
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speak(speechText, 'en');
                }
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer border border-white/10"
              title={bilingualMode === 'en' ? 'Listen to standard English pronunciation' : 'Nghe phát âm chuẩn tiếng Anh'}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-cyan-300' : ''}`} />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(26);
              setShowOriginalModal(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'View Pages 26 – 27 Scan' : 'Xem trang 26 – 27 SGK'}</span>
          </button>
        </div>
      </div>

      {/* Teacher Prompts Widget for Section 3 */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={5} />

      {/* Theory: 1 bit Representation & Activity 2 */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Core Concept (SGK Pages 26 – 27)' : 'Khái niệm cốt lõi (SGK Trang 26 – 27)'}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Only 1 bit is needed to represent a Logic value'
                : 'Chỉ cần 1 bit để biểu diễn một giá trị Lôgic'}
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-xl">
            1 Bit = True (1) / False (0)
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              Because a logic value only has two states, <strong className="text-emerald-600">True</strong> or <strong className="text-rose-600">False</strong>, computers use exactly <strong>1 binary bit</strong> to store it:
            </>
          ) : (
            <>
              Vì giá trị lôgic chỉ có hai trạng thái là <strong className="text-emerald-600">Đúng</strong> hoặc <strong className="text-rose-600">Sai</strong>, trong máy tính người ta quy ước dùng đúng <strong>1 bit</strong> nhị phân để lưu trữ:
            </>
          )}
        </p>

        {/* 2 Big Bit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-mono font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              1
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-base">
                {bilingualMode === 'en' ? 'Bit 1: Represents TRUE' : 'Bit 1: Đại diện cho ĐÚNG (True)'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {bilingualMode === 'en'
                  ? 'Corresponds to a closed circuit, active electrical current, condition satisfied.'
                  : 'Tương ứng với mạch điện đóng, có tín hiệu dòng điện, điều kiện thoả mãn.'}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50/50 dark:from-rose-950/30 dark:to-pink-950/20 border border-rose-200 dark:border-rose-800 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white font-mono font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              0
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-base">
                {bilingualMode === 'en' ? 'Bit 0: Represents FALSE' : 'Bit 0: Đại diện cho SAI (False)'}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {bilingualMode === 'en'
                  ? 'Corresponds to an open circuit, no current flow, condition not met.'
                  : 'Tương ứng với mạch điện ngắt, không có dòng điện, điều kiện không thoả mãn.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 8-bit Byte Logic Flags Sandbox (Hoạt động 2 SGK Trang 26) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Activity 2 • SGK Page 26' : 'Hoạt động 2 • SGK Trang 26'}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Packing 8 Independent Logic Values in 1 Memory Byte'
                : 'Đóng gói 8 giá trị Lôgic độc lập trong 1 Byte bộ nhớ'}
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {bilingualMode === 'en'
              ? '1 Byte = 8 bits = 8 status flags'
              : '1 Byte = 8 bits = 8 cờ trạng thái (Flags)'}
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              In computer software engineering, one byte (8 bits) can simultaneously store <strong>8 independent logic values</strong>. Click on each bit below to toggle the flag status:
            </>
          ) : (
            <>
              Trong kỹ thuật phần mềm máy tính, một byte (8 bit) có thể lưu đồng thời <strong>8 giá trị lôgic độc lập</strong>. Em hãy bấm vào từng ô bit bên dưới để bật/tắt cờ trạng thái:
            </>
          )}
        </p>

        {/* 8-bit Interactive Blocks */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {byteFlags.map((val, idx) => (
              <div
                key={idx}
                onClick={() => toggleBit(idx)}
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-1 select-none ${
                  val === 1
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 shadow-sm hover:scale-105'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <span className="text-[10px] text-slate-400 font-mono">Bit {idx}</span>
                <span
                  className={`text-xl font-black font-mono ${
                    val === 1 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {val}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    val === 1
                      ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {val === 1 ? 'True' : 'False'}
                </span>
              </div>
            ))}
          </div>

          {/* Details of each flag */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {flagDescriptions.map((desc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750"
              >
                <span className="text-slate-700 dark:text-slate-300">{desc}</span>
                <span
                  className={`font-mono font-bold text-xs ${
                    byteFlags[idx] === 1 ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {byteFlags[idx] === 1 ? 'ON (1)' : 'OFF (0)'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programming Languages Convention (Python vs C/C++) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Python Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {bilingualMode === 'en' ? 'Python Language (Grade 10 Textbook)' : 'Ngôn ngữ Python (SGK Lớp 10)'}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {bilingualMode === 'en' ? 'bool Type: True and False' : 'Kiểu bool: True và False'}
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en' ? (
              <>
                In Python, logic data belongs to type <code className="px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-mono font-bold">bool</code> with exactly two capitalized values: <code className="font-mono font-bold text-emerald-600">True</code> and <code className="font-mono font-bold text-rose-600">False</code>.
              </>
            ) : (
              <>
                Trong Python, dữ liệu lôgic thuộc kiểu <code className="px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-mono font-bold">bool</code> với đúng hai giá trị viết hoa chữ cái đầu: <code className="font-mono font-bold text-emerald-600">True</code> và <code className="font-mono font-bold text-rose-600">False</code>.
              </>
            )}
          </p>

          <div className="p-3 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs space-y-1">
            <div>&gt;&gt;&gt; x = (5 &gt; 3)</div>
            <div className="text-amber-300">&gt;&gt;&gt; print(x)</div>
            <div className="text-white font-bold">True</div>
            <div>&gt;&gt;&gt; type(x)</div>
            <div className="text-white font-bold">&lt;class 'bool'&gt;</div>
          </div>
        </div>

        {/* C/C++ Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                {bilingualMode === 'en' ? 'C / C++ Language' : 'Ngôn ngữ C / C++'}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {bilingualMode === 'en' ? 'Convention: 0 for False, non-zero for True' : 'Quy ước số nguyên 0 và khác 0'}
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en' ? (
              <>
                In classic C, there was no separate boolean type; integers were used: <strong className="text-slate-900 dark:text-white">0 is False</strong>, and <strong className="text-slate-900 dark:text-white">any non-zero value (typically 1) is True</strong>. C++ added <code className="font-mono font-bold text-indigo-600">bool</code>, <code className="font-mono font-bold text-indigo-600">true</code>, and <code className="font-mono font-bold text-indigo-600">false</code>.
              </>
            ) : (
              <>
                Trong ngôn ngữ C cổ điển, không có kiểu lôgic riêng mà dùng số nguyên: <strong className="text-slate-900 dark:text-white">số 0 là Sai</strong>, và <strong className="text-slate-900 dark:text-white">mọi số khác 0 (thường là 1) là Đúng</strong>. C++ bổ sung thêm từ khóa <code className="font-mono font-bold text-indigo-600">bool</code>, <code className="font-mono font-bold text-indigo-600">true</code>, <code className="font-mono font-bold text-indigo-600">false</code>.
              </>
            )}
          </p>

          <div className="p-3 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs space-y-1">
            <div className="text-slate-400">// C / C++ logic</div>
            <div>int flag = 1; <span className="text-slate-400">// True</span></div>
            <div>if (flag) &#123;</div>
            <div className="pl-4 text-emerald-400">printf("Dung!\n");</div>
            <div>&#125;</div>
          </div>
        </div>
      </div>

      {/* Memory Box 2 (SGK Trang 27) */}
      <div className="rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-purple-700 via-indigo-700 to-indigo-800 text-white shadow-md space-y-3">
        <div className="flex items-center gap-2.5">
          <Bookmark className="w-5 h-5 text-amber-300" />
          <h3 className="font-black uppercase tracking-wider text-xs sm:text-sm text-purple-200">
            {bilingualMode === 'en' ? 'Memory Box 2 (Textbook Page 27)' : 'Hộp Ghi nhớ 2 (SGK Trang 27)'}
          </h3>
        </div>
        <p className="text-sm sm:text-base font-semibold leading-relaxed text-white">
          {bilingualMode === 'en' ? (
            <>
              “Only <span className="text-cyan-300 font-bold">1 bit</span> is needed to represent a logic value (<span className="text-cyan-300 font-bold">bit 1 is True, bit 0 is False</span>). Programming languages provide conventions for representing logic data.”
            </>
          ) : (
            <>
              “Chỉ cần <span className="text-cyan-300 font-bold">1 bit</span> để biểu diễn một giá trị lôgic (<span className="text-cyan-300 font-bold">bit 1 là Đúng, bit 0 là Sai</span>). Các ngôn ngữ lập trình đều có quy ước biểu diễn dữ liệu lôgic.”
            </>
          )}
        </p>
      </div>

      {/* Reinforcement Question (SGK Trang 27) - Strict no pre-answer! */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm shadow-xs">
              ?
            </div>
            <div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? 'Reinforcement Question (Page 27)' : 'Câu hỏi củng cố (SGK Trang 27)'}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? 'How many independent logic values can an 8-bit byte hold at most?'
                  : 'Một byte gồm 8 bit có thể chứa tối đa bao nhiêu giá trị lôgic độc lập?'}
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-400 italic">
            {bilingualMode === 'en' ? 'Students solve first' : 'Học sinh tự trả lời trước'}
          </span>
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'A', text: bilingualMode === 'en' ? 'A. 1 logic value' : 'A. 1 giá trị lôgic', isCorrect: false },
            { key: 'B', text: bilingualMode === 'en' ? 'B. 2 logic values' : 'B. 2 giá trị lôgic', isCorrect: false },
            { key: 'C', text: bilingualMode === 'en' ? 'C. 8 logic values' : 'C. 8 giá trị lôgic', isCorrect: true },
            { key: 'D', text: bilingualMode === 'en' ? 'D. 256 logic values' : 'D. 256 giá trị lôgic', isCorrect: false }
          ].map((item) => {
            const isSelected = selectedAnswer === item.key;
            return (
              <div
                key={item.key}
                onClick={() => setSelectedAnswer(item.key)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-white font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className="text-xs sm:text-sm">{item.text}</span>
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 text-transparent'
                  }`}
                >
                  ✓
                </span>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsChecked(true)}
              disabled={!selectedAnswer}
              className={`px-5 py-2.5 rounded-2xl font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedAnswer
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Check Answer' : 'Kiểm tra đáp án'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedAnswer(null);
                setIsChecked(false);
              }}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              title={bilingualMode === 'en' ? 'Reset' : 'Làm lại'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowSolution(!showSolution)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>
              {showSolution
                ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải')
                : (bilingualMode === 'en' ? 'View Official Solution' : 'Xem gợi ý & Đáp án chuẩn SGK')}
            </span>
          </button>
        </div>

        {/* Feedback message */}
        {isChecked && selectedAnswer === 'C' && (
          <div className="p-4 rounded-2xl border text-xs leading-relaxed bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {bilingualMode === 'en'
                  ? 'Textbook Explanation: Option C is correct. Because each logic value requires only 1 bit to store (1: True, 0: False), an 8-bit byte can store up to 8 independent logic values.'
                  : 'Giải thích chuẩn SGK: Đáp án đúng là C. Vì mỗi giá trị lôgic chỉ cần đúng 1 bit để lưu trữ (1: Đúng, 0: Sai), nên một byte gồm 8 bit có thể chứa tối đa 8 giá trị lôgic độc lập.'}
              </span>
            </div>
          </div>
        )}

        {/* Solution text (Hidden by default) */}
        {showSolution && (
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-200 space-y-1.5 animate-fadeIn">
            <div className="font-bold text-amber-900 dark:text-amber-300 text-sm">
              {bilingualMode === 'en' ? 'Official Solution & Hints (Page 27):' : 'Gợi ý & Lời giải chuẩn SGK Trang 27:'}
            </div>
            <p>
              {bilingualMode === 'en'
                ? '- A logic value only takes one of two values, True or False; therefore, exactly 1 binary bit is sufficient to represent it.'
                : '- Một giá trị lôgic chỉ nhận một trong hai giá trị Đúng hoặc Sai, do đó chỉ cần đúng 1 bit nhị phân là đủ biểu diễn.'}
            </p>
            <p>
              {bilingualMode === 'en'
                ? '- A byte is composed of 8 independent bits. Each bit can be assigned to a different logic variable.'
                : '- Một byte có cấu tạo gồm 8 bit độc lập. Mỗi bit có thể gán cho một biến lôgic khác nhau.'}
            </p>
            <p className="font-semibold text-slate-900 dark:text-white pt-1">
              {bilingualMode === 'en' ? (
                <>
                  Therefore, one byte can hold up to <strong>8 independent logic values</strong> (Option C).
                </>
              ) : (
                <>
                  Do đó, một byte có thể chứa tối đa <strong>8 giá trị lôgic độc lập</strong> (Đáp án C).
                </>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Navigation Card */}
      <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {bilingualMode === 'en' ? 'Next Section:' : 'Phần tiếp theo:'}
          </div>
          <div className="font-bold text-slate-900 dark:text-white text-sm">
            {bilingualMode === 'en'
              ? 'Logic Circuit Simulation: AND Gate (Figure 5.5) & OR Gate (Figure 5.6)'
              : 'Mô phỏng Mạch điện Lôgic: Cổng AND (Hình 5.5) & Cổng OR (Hình 5.6)'}
          </div>
        </div>

        <button
          type="button"
          onClick={nextPage}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm transition-all shadow-md cursor-pointer shrink-0"
        >
          <span>{bilingualMode === 'en' ? 'Experience Switch Circuits' : 'Trải nghiệm mạch điện công tắc'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
