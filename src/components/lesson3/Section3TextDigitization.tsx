import React, { useState } from 'react';
import {
  FileText,
  Volume2,
  Mic,
  Camera,
  Keyboard,
  Sparkles,
  BookOpen,
  Eye,
  CheckCircle2,
  HardDrive,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section3TextDigitization: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setOriginalPageTarget,
    setShowOriginalModal,
    nextPage
  } = useBook();

  // Active Digitization Method Tab
  const [activeMethod, setActiveMethod] = useState<'keyboard' | 'speech' | 'ocr'>('speech');

  // Simulated Speech-to-text recording state
  const [isSimulatingSpeech, setIsSimulatingSpeech] = useState<boolean>(false);
  const [speechRecognizedText, setSpeechRecognizedText] = useState<string>(
    'Tin học lớp 10 kết nối tri thức với cuộc sống'
  );

  const speechText =
    "Section 2c: Text Digitization. Text files represent storage formats on secondary external memory. Text digitization is performed using word processing software such as Microsoft Word or OpenOffice Writer. Recently, text can be input using automatic speech recognition. Simply by speaking aloud, the computer analyzes audio signals and synthesizes editable digital text. Section 2 Remember Box: Extended ASCII uses 8 bits per character. Unicode is an international unified character set enabling multilingual applications, where each character can be encoded across multiple bytes.";

  const handleSimulateSpeech = () => {
    setIsSimulatingSpeech(true);
    setSpeechRecognizedText('');
    const fullPhrase = 'Trí tuệ nhân tạo và bảng mã Unicode tiếng Việt 2026';
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setSpeechRecognizedText(fullPhrase.slice(0, idx));
      if (idx >= fullPhrase.length) {
        clearInterval(interval);
        setIsSimulatingSpeech(false);
      }
    }, 60);
  };

  return (
    <div className="space-y-6">
      {/* Header section with SGK Page Badge and English TTS */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 px-2.5 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
              {bilingualMode === 'en' ? 'Section 2c • Page 18 SGK' : 'Mục 2c • Trang 18 SGK'}
            </span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(18);
                setShowOriginalModal(true);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{bilingualMode === 'en' ? 'View scan page 18' : 'Xem scan trang 18'}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? '2c. Text Digitization & Modern Input Technologies'
              : '2c. Số hoá văn bản & Công nghệ nhập liệu hiện đại'}
          </h2>
        </div>

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
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
              isSpeaking
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
            title={bilingualMode === 'en' ? 'Listen to English pronunciation' : 'Nghe phát âm chuẩn tiếng Anh đoạn kiến thức trọng tâm'}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpeaking ? 'STOP' : 'EN'}</span>
          </button>
        )}
      </div>

      {/* Core Knowledge: c) Số hoá văn bản */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {bilingualMode === 'en' ? 'Core Knowledge' : 'Kiến thức trọng tâm'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'c) Concept of Text Digitization and Secondary Storage'
                : 'c) Khái niệm số hoá văn bản và lưu trữ ở bộ nhớ ngoài'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            {bilingualMode === 'en' ? 'Text File' : 'Tệp văn bản'}
          </span>
        </div>

        <BilingualText
          vi="Tệp văn bản là định dạng lưu trữ ở bộ nhớ ngoài. Việc số hoá văn bản được thực hiện bằng các phần mềm soạn thảo văn bản như Word (của Microsoft) hay Writer (của Open Office)."
          en="A text file is a storage format residing in external secondary memory. Text digitization is commonly accomplished using word processors such as Microsoft Word or OpenOffice Writer."
        />

        <BilingualText
          vi="Gần đây người ta đã có thể nhập văn bản bằng nhận dạng tiếng nói. Chỉ cần đọc lời, máy tính có thể nhận dạng âm thanh và tạo ra văn bản."
          en="Recently, users can input text via automated speech recognition. Simply by speaking aloud, the computer recognizes vocal audio waveforms and generates editable text."
        />

        {/* 3 Methods of Text Digitization Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Method 1: Word Processors */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
                <Keyboard className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">
                {bilingualMode === 'en' ? 'Traditional' : 'Truyền thống'}
              </span>
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
              {bilingualMode === 'en' ? '1. Keyboard & Word Processors' : '1. Bàn phím & Phần mềm soạn thảo'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en'
                ? 'Using Microsoft Word or OpenOffice Writer combined with input method editors (Telex or VNI) to type and format text.'
                : 'Sử dụng Microsoft Word, OpenOffice Writer kết hợp với bộ gõ Unikey (kiểu gõ Telex hoặc VNI) để nhập và định dạng văn bản.'}
            </p>
          </div>

          {/* Method 2: Speech-to-Text */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
                <Mic className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full">
                {bilingualMode === 'en' ? 'Modern (AI)' : 'Hiện đại (AI)'}
              </span>
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
              {bilingualMode === 'en' ? '2. Speech Recognition (Voice-to-Text)' : '2. Nhận dạng tiếng nói (Voice-to-Text)'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en'
                ? 'AI audio signal processing converts microphone waveforms immediately into Vietnamese Unicode text streams without manual typing.'
                : 'Công nghệ AI xử lí tín hiệu âm thanh thu từ micrô và chuyển tức thời thành chuỗi văn bản Unicode tiếng Việt, không cần gõ phím.'}
            </p>
          </div>

          {/* Method 3: OCR */}
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full">
                {bilingualMode === 'en' ? 'Photo Scan (OCR)' : 'Quét ảnh (OCR)'}
              </span>
            </div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
              {bilingualMode === 'en' ? '3. Optical Character Recognition (OCR)' : '3. Nhận dạng ký tự quang học (OCR)'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en'
                ? 'Photographs printed textbook pages; OCR software identifies letter glyphs and exports editable, copyable digital text documents.'
                : 'Chụp ảnh trang sách báo in, phần mềm quét và nhận dạng từng nét chữ để xuất ra tệp văn bản có thể chỉnh sửa và sao chép.'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Digitization Studio */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Experience Lab: Simulating Text Digitization Workflows'
                : 'Phòng trải nghiệm: Mô phỏng quá trình số hoá văn bản'}
            </h3>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveMethod('speech')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeMethod === 'speech'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {bilingualMode === 'en' ? 'Voice Recognition (SGK)' : 'Nhận dạng giọng nói (SGK)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveMethod('ocr')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeMethod === 'ocr'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {bilingualMode === 'en' ? 'OCR Scan' : 'Quét ảnh OCR'}
            </button>
          </div>
        </div>

        {/* Tab 1: Voice Recognition Simulator */}
        {activeMethod === 'speech' && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-emerald-400" />
                <span>{bilingualMode === 'en' ? 'Voice-to-Text Input Simulation:' : 'Mô phỏng nhập liệu bằng giọng nói (Voice-to-Text):'}</span>
              </span>
              <button
                type="button"
                onClick={handleSimulateSpeech}
                disabled={isSimulatingSpeech}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-500/20"
              >
                <Mic className={`w-3.5 h-3.5 ${isSimulatingSpeech ? 'animate-bounce text-red-700' : ''}`} />
                <span>
                  {isSimulatingSpeech
                    ? (bilingualMode === 'en' ? 'Recognizing audio waveforms...' : 'Đang nhận dạng âm thanh...')
                    : (bilingualMode === 'en' ? 'Click to simulate speech dictation' : 'Bấm để thử nghiệm đọc lời')}
                </span>
              </button>
            </div>

            {/* Simulated Live Text Area */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 font-sans text-base sm:text-lg min-h-[70px] flex items-center shadow-inner">
              {speechRecognizedText ? (
                <span className="text-emerald-300 font-bold">
                  "{speechRecognizedText}"
                  {isSimulatingSpeech && <span className="animate-pulse">|</span>}
                </span>
              ) : (
                <span className="text-slate-500 italic text-sm">
                  {bilingualMode === 'en' ? 'Listening to microphone audio...' : 'Đang lắng nghe âm thanh từ microphone...'}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1 border-t border-slate-800">
              <span>{bilingualMode === 'en' ? 'Output format: ' : 'Định dạng đầu ra: '}<strong>UTF-8 Unicode</strong></span>
              <span>{bilingualMode === 'en' ? 'Processing latency: ' : 'Độ trễ xử lí: '}<strong>&lt; 50ms</strong></span>
            </div>
          </div>
        )}

        {/* Tab 2: OCR Simulator */}
        {activeMethod === 'ocr' && (
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Paper side */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-slate-800 space-y-2 shadow-xs">
                <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-200 px-2 py-0.5 rounded">
                  {bilingualMode === 'en' ? 'Printed Paper / Photograph' : 'Tài liệu giấy / Ảnh chụp'}
                </span>
                <div className="font-serif italic text-sm leading-relaxed text-slate-700 p-2 border-l-2 border-amber-400 bg-white/70">
                  {bilingualMode === 'en'
                    ? '"Lesson 3. Data Types and Text Data. Grade 10 Informatics - Connecting Knowledge to Life."'
                    : '"Bài 3. Một số kiểu dữ liệu và dữ liệu văn bản. Tin học 10 Kết nối tri thức với cuộc sống."'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {bilingualMode === 'en'
                    ? 'Raster pixel bitmap; users cannot edit, highlight, or copy individual characters directly.'
                    : 'Ảnh raster độ phân giải pixel, người dùng không thể chỉnh sửa hay sao chép từng chữ.'}
                </div>
              </div>

              {/* Digital Text side */}
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 text-slate-800 dark:text-slate-200 space-y-2 shadow-xs">
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {bilingualMode === 'en' ? 'Digitized Text File (.docx / .txt)' : 'Tệp văn bản số hoá (.docx / .txt)'}
                </span>
                <div className="font-mono text-xs leading-relaxed text-emerald-950 dark:text-emerald-200 p-2 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
                  {bilingualMode === 'en'
                    ? 'Lesson 3. Data Types and Text Data. Grade 10 Informatics - Connecting Knowledge to Life.'
                    : 'Bài 3. Một số kiểu dữ liệu và dữ liệu văn bản. Tin học 10 Kết nối tri thức với cuộc sống.'}
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'Successfully recognized UTF-8 character string, editable and searchable!'
                      : 'Đã nhận dạng thành công chuỗi ký tự UTF-8, có thể bôi đen và chỉnh sửa!'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official Remember Box (Hộp Ghi nhớ mục 2 - Trang 18 SGK) */}
      <div className="p-5 rounded-3xl bg-amber-50/80 dark:bg-amber-950/40 border-2 border-dashed border-amber-400 dark:border-amber-700/80 space-y-2.5 shadow-xs">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-black text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText vi="Em ghi nhớ mục 2 (Trang 18 SGK Tin học 10):" en="Key Takeaways for Section 2 (Textbook Page 18):" />
        </div>
        <div className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <BilingualText
            vi="• Bảng mã ASCII mở rộng sử dụng 8 bit để biểu diễn một kí tự."
            en="• Extended ASCII uses 8 bits to represent a single character."
          />
          <BilingualText
            vi="• Unicode là bảng mã hợp nhất quốc tế, cho phép tạo ra các ứng dụng đa ngôn ngữ. Mỗi kí tự Unicode có thể được mã hoá bởi nhiều byte."
            en="• Unicode is an international unified character standard enabling multilingual applications. Each Unicode character can be encoded across multiple bytes."
          />
        </div>
      </div>

      {/* Next Step Nav Card */}
      <div className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
        <div>
          <div className="text-xs text-indigo-700 dark:text-indigo-400 font-bold uppercase">
            {bilingualMode === 'en' ? 'Next: Final Section' : 'Tiếp theo: Phần cuối'}
          </div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? 'Practice & Application (Textbook Page 19)'
              : 'Luyện tập & Vận dụng (Trang 19 SGK)'}
          </h4>
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          <span>{bilingualMode === 'en' ? 'Proceed to Practice & Apply' : 'Sang Luyện tập & Vận dụng'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
