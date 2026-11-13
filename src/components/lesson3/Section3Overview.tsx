import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Target,
  ArrowRight,
  HelpCircle,
  Binary,
  Layers,
  CheckCircle2,
  Cpu,
  FileText,
  Hash,
  ToggleLeft,
  Image as ImageIcon,
  Music,
  Eye,
  RotateCcw
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section3Overview: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive Simulator: Raw bits to Data Types
  const [selectedBitPattern, setSelectedBitPattern] = useState<string>('01000001');
  const [activeInterpretation, setActiveInterpretation] = useState<'text' | 'number' | 'logic' | 'color'>('text');

  const speechText =
    "Lesson 3: Data Types and Text Data. Learning Objectives: 1. Identify types of information and common data types in high school informatics; 2. Understand popular character encoding tables including ASCII and Unicode; 3. Briefly explain the concept of text digitization. Warm-up question: Information entered into computer memory is in the form of bit sequences. What data types exist in a computer to represent diverse real-world information?";

  const samplePatterns = [
    { label: "Mẫu 'A' (65)", bits: "01000001", char: "A", dec: 65, hex: "#41" },
    { label: "Mẫu 'B' (66)", bits: "01000010", char: "B", dec: 66, hex: "#42" },
    { label: "Mẫu '1' (49)", bits: "00110001", char: "1", dec: 49, hex: "#31" },
    { label: "Mẫu '0' (48)", bits: "00110000", char: "0", dec: 48, hex: "#30" }
  ];

  return (
    <div className="space-y-6">
      {/* Teacher Prompts Widget for Lesson 3 Section 0 */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={3} />

      {/* Top Banner: Lesson Header with SGK Scan Link & English Voice */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-xs">
                Chủ đề 1 • Bài 3
              </span>
              <span className="text-white/60">•</span>
              <button
                type="button"
                onClick={() => {
                  setOriginalPageTarget(16);
                  setShowOriginalModal(true);
                }}
                className="text-xs text-amber-200 hover:text-white underline font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                title={bilingualMode === 'en' ? 'Click to open original Page 16 scan' : 'Bấm để mở bản scan Trang 16 SGK gốc'}
              >
                <span>{bilingualMode === 'en' ? 'Page 16 SGK (View Scan)' : 'Trang 16 SGK (Xem scan)'}</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
              {bilingualMode === 'en'
                ? 'Lesson 3: Data Types and Text Data'
                : 'Bài 3: Một số kiểu dữ liệu và dữ liệu văn bản'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 italic">
              Data Types and Text Data • American Standard Code for Information Interchange (ASCII) &amp; Unicode Standard
            </p>
          </div>

          {bilingualMode !== 'vi' && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (isSpeaking) {
                    stopSpeaking();
                  } else {
                    speak(speechText, 'en');
                  }
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                  isSpeaking
                    ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                    : 'bg-white hover:bg-emerald-50 text-emerald-800'
                }`}
                title={bilingualMode === 'en' ? 'Listen to native voice overview' : 'Nghe giọng đọc bản ngữ tóm tắt mục tiêu bài học'}
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isSpeaking ? 'STOP' : 'EN'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid: 3 Learning Objectives & Warm-up Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Objectives Box (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-850 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">
                {bilingualMode === 'en' ? 'LEARNING OBJECTIVES:' : 'Sau bài này em sẽ (Learning Objectives):'}
              </h2>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en' ? '3 Standard Objectives from Grade 10 Informatics' : '3 Mục tiêu chuẩn kiến thức SGK Tin học 10'}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            {/* Objective 1 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-2xs">
                1
              </span>
              <div className="flex-1 space-y-1">
                <BilingualText
                  vi="Nêu được các loại thông tin và các kiểu dữ liệu sẽ gặp trong chương trình tin học phổ thông (văn bản, số, lôgic, đa phương tiện)."
                  en="Identify the types of information and data types encountered in the high school informatics curriculum (text, number, logic, multimedia)."
                />
              </div>
            </div>

            {/* Objective 2 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-2xs">
                2
              </span>
              <div className="flex-1 space-y-1">
                <BilingualText
                  vi="Biết được các bảng mã thông dụng ASCII và Unicode; giải thích được cơ chế mã hoá 7-bit, 8-bit và UTF-8."
                  en="Understand common character encoding tables including ASCII and Unicode; explain the mechanics of 7-bit, 8-bit, and UTF-8 encoding."
                />
              </div>
            </div>

            {/* Objective 3 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-2xs">
                3
              </span>
              <div className="flex-1 space-y-1">
                <BilingualText
                  vi="Giải thích được sơ lược về việc số hoá văn bản qua phần mềm soạn thảo, nhận dạng ký tự quang học (OCR) và nhận dạng tiếng nói."
                  en="Briefly explain the process of text digitization through word processors, optical character recognition (OCR), and voice recognition."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Warm-up Question Box (Col 5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 dark:from-slate-850 dark:via-slate-850 dark:to-indigo-950/30 p-5 sm:p-6 rounded-3xl border border-indigo-200/80 dark:border-indigo-900/60 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-indigo-600 text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                {bilingualMode === 'en' ? 'Warm-up Activity (Page 16 SGK)' : 'Hoạt động Khởi động (Trang 16 SGK)'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-950 shadow-2xs">
              <BilingualText
                vi="Thông tin đưa vào bộ nhớ máy tính dưới dạng các dãy bit. Như vậy khi đưa vào máy tính, phải mã hoá thông tin thành dữ liệu nhị phân. Tuỳ theo bản chất của thông tin được mã hoá mà dữ liệu tương ứng có cách biểu diễn riêng, từ đó hình thành nên các kiểu dữ liệu khác nhau. Vậy trong máy tính có các kiểu dữ liệu nào?"
                en="Information entered into computer memory is stored in the form of bit sequences. Therefore, information must be encoded into binary data. Depending on the nature of the information, its representation differs, giving rise to distinct data types. What data types exist inside a computer?"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-100/60 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-indigo-200">
            <span>{bilingualMode === 'en' ? 'Explore 4 data type groups' : 'Khám phá 4 nhóm kiểu dữ liệu'}</span>
            <button
              type="button"
              onClick={nextPage}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <span>{bilingualMode === 'en' ? 'Go to Section 1' : 'Vào Mục 1'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox: Bit Stream Interpretation Lab */}
      <div className="bg-white dark:bg-slate-850 p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? 'Interactive Lab: One Bit Pattern – Multiple Data Types'
                  : 'Phòng thí nghiệm tương tác: Cùng một dãy Bit – Đa dạng Kiểu dữ liệu'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Discover why computers categorize data types to correctly interpret binary bit sequences'
                  : 'Khám phá vì sao máy tính cần phân loại kiểu dữ liệu để hiểu đúng ý nghĩa của dãy bit nhị phân'}
              </p>
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs text-slate-400 font-semibold mr-1">
              {bilingualMode === 'en' ? 'Bit sample:' : 'Mẫu bit:'}
            </span>
            {samplePatterns.map((p) => (
              <button
                key={p.bits}
                type="button"
                onClick={() => setSelectedBitPattern(p.bits)}
                className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedBitPattern === p.bits
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bit Stream Visual Display */}
        <div className="p-4 rounded-2xl bg-slate-950 text-white font-mono flex flex-col sm:flex-row items-center justify-between gap-4 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">
              Dãy 8 Bit trong RAM:
            </span>
            <div className="flex items-center gap-1">
              {selectedBitPattern.split('').map((b, i) => (
                <span
                  key={i}
                  className={`w-7 h-9 rounded-lg flex items-center justify-center text-sm font-black transition-all ${
                    b === '1'
                      ? 'bg-emerald-500 text-slate-950 shadow-xs'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Số bit: <strong>8 bit (1 Byte)</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Hex: <strong>{samplePatterns.find(p => p.bits === selectedBitPattern)?.hex || '0x??'}</strong></span>
          </div>
        </div>

        {/* 4 Interpretations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          {/* 1. Kiểu Văn bản (Text / Char) */}
          <div
            onClick={() => setActiveInterpretation('text')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeInterpretation === 'text'
                ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-xs'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Text / Character' : 'Kiểu Văn bản (Kí tự)'}</span>
              </span>
              <span className="text-[10px] font-mono bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-1.5 py-0.5 rounded">
                ASCII
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              '{samplePatterns.find(p => p.bits === selectedBitPattern)?.char || '?'}'
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {bilingualMode === 'en'
                ? `As text data, this byte represents the character '${samplePatterns.find(p => p.bits === selectedBitPattern)?.char}'.`
                : `Nếu coi là văn bản, dãy bit này biểu diễn chữ cái '${samplePatterns.find(p => p.bits === selectedBitPattern)?.char}'.`}
            </p>
          </div>

          {/* 2. Kiểu Số nguyên (Integer Number) */}
          <div
            onClick={() => setActiveInterpretation('number')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeInterpretation === 'number'
                ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <Hash className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Number (Integer)' : 'Kiểu Số (Số nguyên)'}</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded">
                Decimal
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {samplePatterns.find(p => p.bits === selectedBitPattern)?.dec || 0}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {bilingualMode === 'en'
                ? `As numeric data, this byte has decimal value ${samplePatterns.find(p => p.bits === selectedBitPattern)?.dec}.`
                : `Nếu coi là số học, dãy bit có giá trị thập phân bằng ${samplePatterns.find(p => p.bits === selectedBitPattern)?.dec}.`}
            </p>
          </div>

          {/* 3. Kiểu Lôgic (Boolean) */}
          <div
            onClick={() => setActiveInterpretation('logic')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeInterpretation === 'logic'
                ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 shadow-xs'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center gap-1">
                <ToggleLeft className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Logic / Boolean' : 'Kiểu Lôgic (Boolean)'}</span>
              </span>
              <span className="text-[10px] font-mono bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-1.5 py-0.5 rounded">
                True / False
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {selectedBitPattern === '00000000'
                ? (bilingualMode === 'en' ? 'FALSE' : 'FALSE (Sai)')
                : (bilingualMode === 'en' ? 'TRUE' : 'TRUE (Đúng)')}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {bilingualMode === 'en'
                ? 'In binary logic, 0 represents False, non-zero represents True.'
                : 'Trong lôgic nhị phân, bit 0 biểu diễn False, khác 0 biểu diễn True.'}
            </p>
          </div>

          {/* 4. Kiểu Đa phương tiện (Color Pixel) */}
          <div
            onClick={() => setActiveInterpretation('color')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeInterpretation === 'color'
                ? 'border-amber-600 bg-amber-50/70 dark:bg-amber-950/40 shadow-xs'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Multimedia (Pixel)' : 'Đa phương tiện (Điểm ảnh)'}</span>
              </span>
              <span className="text-[10px] font-mono bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-1.5 py-0.5 rounded">
                Grayscale
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div
                className="w-8 h-8 rounded-lg border border-slate-300 shadow-2xs shrink-0"
                style={{
                  backgroundColor: `rgb(${samplePatterns.find(p => p.bits === selectedBitPattern)?.dec || 0}, ${samplePatterns.find(p => p.bits === selectedBitPattern)?.dec || 0}, ${samplePatterns.find(p => p.bits === selectedBitPattern)?.dec || 0})`
                }}
              />
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {bilingualMode === 'en' ? 'Luminance: ' : 'Độ sáng: '}
                {samplePatterns.find(p => p.bits === selectedBitPattern)?.dec}/255
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {bilingualMode === 'en'
                ? 'In 8-bit grayscale imagery, this value defines the brightness of 1 image pixel.'
                : 'Trong ảnh xám, 8 bit biểu diễn cường độ ánh sáng của 1 điểm ảnh (pixel).'}
            </p>
          </div>
        </div>

        {/* Summary takeaway */}
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
          <span className="font-semibold">
            {bilingualMode === 'en'
              ? '💡 Core Takeaway: Computers store only zeros and ones. Specifying Data Types tells the computer how to interpret and execute the appropriate operations (such as math addition or string concatenation)!'
              : '💡 Kết luận sư phạm: Máy tính chỉ lưu trữ các số 0 và 1. Việc định nghĩa Kiểu dữ liệu giúp máy tính biết cách diễn giải và áp dụng các phép toán tương ứng (cộng trừ hay nối xâu)!'}
          </span>
        </div>
      </div>
    </div>
  );
};
