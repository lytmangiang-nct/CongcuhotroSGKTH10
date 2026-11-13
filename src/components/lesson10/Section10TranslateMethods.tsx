import React, { useState } from 'react';
import {
  Keyboard,
  Mic,
  MicOff,
  FileSpreadsheet,
  FileText,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Languages,
  BookOpen,
  HelpCircle,
  Bookmark,
  Table,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section10TranslateMethods: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget
  } = useBook();

  // Active translation method tab
  const [activeTab, setActiveTab] = useState<'text' | 'voice' | 'file'>('text');

  // Text simulator state
  const [inputText, setInputText] = useState<string>(
    'Máy tính gồm có bộ xử lí, bộ nhớ, các thiết bị nhập, xuất dữ liệu như màn hình, bàn phím, máy in, con chuột.'
  );
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [speechSpeedState, setSpeechSpeedState] = useState<'normal' | 'slow'>('normal');

  // Voice simulator state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [voiceQuote, setVoiceQuote] = useState<string>(
    'Cái quý giá nhất của con người là cuộc sống'
  );

  // Document translator simulator state (Figure 10.6)
  const [fileTranslated, setFileTranslated] = useState<boolean>(true);

  const sectionSpeechVi =
    'Mục 2: Ba phương thức nhập liệu và dịch với Google Translate. Phương thức 1: Nhập văn bản trực tiếp từ bàn phím. Phương thức 2: Nhập bằng giọng nói qua micro thu âm, ví dụ câu văn kinh điển trong tác phẩm Thép đã tôi thế đấy của nhà văn Ostrovski. Google Translate không chỉ nghe được mà còn nói được qua biểu tượng loa với hai tốc độ đọc bình thường và chậm. Phương thức 3: Dịch trọn vẹn tệp tài liệu Word, Excel, PowerPoint, PDF mà vẫn giữ nguyên cấu trúc bảng biểu theo Hình 10.6 SGK.';
  const sectionSpeechEn =
    'Section 2: Three Translation Input Methods with Google Translate. Method 1: Direct keyboard text entry. Method 2: Voice dictation via microphone, exemplified by the famous Ostrovski quote from How the Steel Was Tempered. Google Translate both listens and speaks using dual-speed audio synthesis. Method 3: Full-document translation for Word, Excel, PowerPoint, and PDF files, faithfully retaining spreadsheet layout per Figure 10.6.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(
        bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi,
        bilingualMode === 'en' ? 'en' : 'vi'
      );
    }
  };

  // Play pronunciation via Web Speech API with speed control
  const handlePlayPronunciation = (text: string, lang: 'en' | 'vi' = 'en') => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    // Toggle speed between normal (1.0) and slow (0.65) per SGK p. 52
    const rate = speechSpeedState === 'normal' ? 1.0 : 0.65;
    setSpeechSpeedState(speechSpeedState === 'normal' ? 'slow' : 'normal');

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'vi-VN';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    } else {
      speak(text, lang);
    }
  };

  const handleCopyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleToggleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
            {bilingualMode === 'en' ? 'Task 1 • Textbook Pages 51–52' : 'Nhiệm vụ 1 • SGK Trang 51 – 52'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            <BilingualText
              vi="3 CÁCH NHẬP LIỆU: BÀN PHÍM, GIỌNG NÓI & TỆP TÀI LIỆU"
              en="3 INPUT METHODS: KEYBOARD, VOICE & DOCUMENTS"
            />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <BilingualText
              vi="Hình 10.3 (Văn bản), Hình 10.4 (Giọng nói), Hình 10.5 & 10.6 (Dịch tệp Excel)"
              en="Figure 10.3 (Text), Figure 10.4 (Voice), Figures 10.5 & 10.6 (Excel Document Translation)"
            />
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOriginalPageTarget(51)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-blue-600" />
            <span>{bilingualMode === 'en' ? 'Textbook Page 51' : 'SGK Trang 51'}</span>
          </button>
        </div>
      </div>

      {/* 3 Translation Input Methods Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => setActiveTab('text')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'text'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span>
            {bilingualMode === 'en'
              ? '1. Direct Keyboard Text Entry (Figure 10.3)'
              : '1. Nhập văn bản trực tiếp (Hình 10.3)'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('voice')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'voice'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>
            {bilingualMode === 'en'
              ? '2. Voice Dictation via Mic (Figure 10.4)'
              : '2. Nhập bằng giọng nói (Hình 10.4)'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('file')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'file'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>
            {bilingualMode === 'en'
              ? '3. File Document Translation (Figures 10.5 & 10.6)'
              : '3. Nhập từ một tệp (Hình 10.5 & 10.6)'}
          </span>
        </button>
      </div>

      {/* METHOD 1: Direct Text Entry (Hình 10.3 SGK trang 51) */}
      {activeTab === 'text' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
              <Keyboard className="w-4 h-4 text-blue-600" />
              <span>
                {bilingualMode === 'en'
                  ? 'Method 1: Direct Keyboard Entry into Source Language Pane (Figure 10.3)'
                  : 'Phương thức 1: Nhập trực tiếp văn bản vào khung ngôn ngữ nguồn (Hình 10.3)'}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {bilingualMode === 'en' ? 'Vietnamese ➔ English' : 'Tiếng Việt ➔ Tiếng Anh'}
            </span>
          </div>

          {/* Quick preset buttons */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-slate-500 self-center">
              {bilingualMode === 'en' ? 'SGK Sample:' : 'Mẫu SGK:'}
            </span>
            <button
              type="button"
              onClick={() =>
                setInputText(
                  'Máy tính gồm có bộ xử lí, bộ nhớ, các thiết bị nhập, xuất dữ liệu như màn hình, bàn phím, máy in, con chuột.'
                )
              }
              className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Figure 10.3: Computer Definition' : 'Hình 10.3: Định nghĩa máy tính'}
            </button>
            <button
              type="button"
              onClick={() =>
                setInputText(
                  'Học liệu mở là cơ hội để mọi người tiếp cận tri thức mới với chi phí thấp.'
                )
              }
              className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 cursor-pointer"
            >
              {bilingualMode === 'en' ? 'OER Open Courseware' : 'Học liệu mở OER'}
            </button>
          </div>

          {/* Two-panel Translation Arena */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Left Source Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1 flex items-center justify-between">
                  <span>
                    {bilingualMode === 'en' ? 'VIETNAMESE (SOURCE LANGUAGE)' : 'TIẾNG VIỆT (NGÔN NGỮ NGUỒN)'}
                  </span>
                  <span className="font-mono text-[11px]">{inputText.length} / 5000</span>
                </div>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent border-none outline-hidden text-sm text-slate-900 dark:text-slate-100 resize-none font-medium leading-relaxed"
                  placeholder={bilingualMode === 'en' ? 'Enter text to translate...' : 'Nhập văn bản cần dịch...'}
                />
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                <button
                  type="button"
                  onClick={() => handlePlayPronunciation(inputText, 'vi')}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1 cursor-pointer"
                  title={bilingualMode === 'en' ? 'Listen to Vietnamese source' : 'Nghe phát âm tiếng Việt'}
                >
                  <Volume2 className="w-4 h-4 text-blue-600" />
                  <span>{bilingualMode === 'en' ? 'Listen' : 'Nghe'}</span>
                </button>
              </div>
            </div>

            {/* Right Target Box */}
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1 flex items-center justify-between">
                  <span>
                    {bilingualMode === 'en'
                      ? 'ENGLISH (TARGET LANGUAGE TRANSLATION)'
                      : 'TIẾNG ANH (BẢN DỊCH NGÔN NGỮ ĐÍCH)'}
                  </span>
                  <span className="text-[11px] bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">
                    {bilingualMode === 'en' ? 'Textbook Figure 10.3' : 'Hình 10.3 SGK'}
                  </span>
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed min-h-[96px]">
                  A computer consists of a processor, memory, input and output devices such as a
                  monitor, keyboard, printer, and mouse.
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-blue-200 dark:border-blue-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handlePlayPronunciation(
                        'A computer consists of a processor, memory, input and output devices such as a monitor, keyboard, printer, and mouse.',
                        'en'
                      )
                    }
                    className="p-1.5 rounded-lg text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 flex items-center gap-1 cursor-pointer font-bold"
                    title={
                      bilingualMode === 'en'
                        ? 'Click to hear English pronunciation (Click 1: normal, Click 2: slower)'
                        : 'Nghe máy đọc tiếng Anh (Nháy 1: bình thường, nháy 2: chậm hơn)'
                    }
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>
                      {bilingualMode === 'en'
                        ? `Listen Speaker (${speechSpeedState === 'normal' ? 'Normal 1.0x' : 'Slow 0.65x'})`
                        : `Nghe loa (${speechSpeedState === 'normal' ? 'Chuẩn 1.0x' : 'Chậm 0.65x'})`}
                    </span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleCopyResult(
                      'A computer consists of a processor, memory, input and output devices such as a monitor, keyboard, printer, and mouse.'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  {copiedToast ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{bilingualMode === 'en' ? 'Copied (Ctrl+C)' : 'Đã chép (Ctrl+C)'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{bilingualMode === 'en' ? 'Copy Translation' : 'Sao chép kết quả'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* METHOD 2: Voice Dictation & Audio Playback (Hình 10.4 SGK trang 51-52) */}
      {activeTab === 'voice' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
              <Mic className="w-4 h-4 text-rose-600" />
              <span>
                {bilingualMode === 'en'
                  ? 'Method 2: Voice Dictation & Multi-Speed Audio Synthesis (Figure 10.4)'
                  : 'Phương thức 2: Nhập bằng giọng nói & Phát âm đa tốc độ (Hình 10.4)'}
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              {bilingualMode === 'en' ? 'Vietnamese ➔ Russian' : 'Tiếng Việt ➔ Tiếng Nga'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-300">
            {bilingualMode === 'en' ? (
              <>
                <strong>Textbook Literary Citation (Figure 10.4):</strong> Translating the celebrated passage by Nikolai Ostrovsky from classic novel <em>"How the Steel Was Tempered"</em>: <em>"Man's dearest possession is life"</em> into Russian.
              </>
            ) : (
              <>
                <strong>Trích dẫn văn học trong SGK (Hình 10.4):</strong> Dịch câu văn nổi tiếng của nhà văn Nikolai Ostrovsky trong tiểu thuyết kinh điển <em>"Thép đã tôi thế đấy"</em>: <em>"Cái quý giá nhất của con người là cuộc sống"</em> sang tiếng Nga.
              </>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Voice Input Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-bold text-slate-500 mb-1 flex items-center justify-between">
                  <span>
                    {bilingualMode === 'en' ? 'MICROPHONE SPEECH-TO-TEXT' : 'MICRO THU ÂM (SPEECH-TO-TEXT)'}
                  </span>
                  {isRecording && (
                    <span className="text-rose-500 font-bold flex items-center gap-1 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />{' '}
                      {bilingualMode === 'en' ? 'Recording live speech...' : 'Đang thu âm giọng nói...'}
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 min-h-[72px]">
                  {voiceQuote}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={handleToggleVoiceRecord}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse shadow-md'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>
                    {isRecording
                      ? (bilingualMode === 'en' ? 'Stop Recording' : 'Dừng thu âm')
                      : (bilingualMode === 'en' ? 'Record Voice Quote' : 'Bật Micro đọc câu dịch')}
                  </span>
                </button>
                <span className="text-[11px] text-slate-400">
                  {bilingualMode === 'en' ? 'Mic glows when listening' : 'Micro chuyển xanh khi thu âm'}
                </span>
              </div>
            </div>

            {/* Russian Translated Result */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center justify-between">
                  <span>{bilingualMode === 'en' ? 'RUSSIAN (РУССКИЙ)' : 'TIẾNG NGA (РУССКИЙ)'}</span>
                  <span className="text-[11px] font-mono text-emerald-600">
                    {bilingualMode === 'en' ? 'Textbook Figure 10.4' : 'Hình 10.4 SGK'}
                  </span>
                </div>
                <div className="text-base font-black text-slate-900 dark:text-slate-100 p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/60 min-h-[72px]">
                  Самое дорогое в жизни человека - это жизнь
                </div>
                <div className="text-xs font-mono text-slate-500 italic mt-1 px-1">
                  {bilingualMode === 'en'
                    ? "Transliteration: Samoye dorogoye v zhizni cheloveka - eto zhizn'"
                    : "Phiên âm: Samoye dorogoye v zhizni cheloveka - eto zhizn'"}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-200 dark:border-emerald-800/60">
                <button
                  type="button"
                  onClick={() =>
                    handlePlayPronunciation(
                      'Самое дорогое в жизни человека - это жизнь',
                      'en'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{bilingualMode === 'en' ? 'Listen Pronunciation' : 'Nghe phát âm chuẩn'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleCopyResult('Самое дорогое в жизни человека - это жизнь')
                  }
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white cursor-pointer"
                  title={bilingualMode === 'en' ? 'Copy Translation' : 'Sao chép'}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* METHOD 3: Document File Translation (Hình 10.5 & 10.6 SGK trang 52) */}
      {activeTab === 'file' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>
                {bilingualMode === 'en'
                  ? 'Method 3: File Upload & Spreadsheet Translation (Figures 10.5 & 10.6)'
                  : 'Phương thức 3: Nhập từ một tệp & Dịch nguyên bảng tính Excel (Hình 10.5 & 10.6)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setFileTranslated(!fileTranslated)}
              className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800 cursor-pointer"
            >
              {fileTranslated
                ? (bilingualMode === 'en' ? 'View Original English File' : 'Xem tệp gốc tiếng Anh')
                : (bilingualMode === 'en' ? 'Translate to Vietnamese' : 'Bấm nút "Dịch" sang tiếng Việt')}
            </button>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400">
            {bilingualMode === 'en' ? (
              <>
                Google Translate supports direct file uploads: <strong>Word (.docx), Excel (.xlsx), PowerPoint (.pptx), PDF</strong>. Below is simulated spreadsheet <em>SPARE PARTS RESERVE.xlsx</em> per Textbook Figure 10.6 Page 52:
              </>
            ) : (
              <>
                Google Translate hỗ trợ tải lên các tệp tài liệu: <strong>Word (.docx), Excel (.xlsx), PowerPoint (.pptx), PDF</strong>. Dưới đây là bảng tính phụ tùng dự trữ <em>SPARE PARTS RESERVE.xlsx</em> minh họa theo Hình 10.6 SGK trang 52:
              </>
            )}
          </div>

          {/* Excel Spreadsheet Simulation (Hình 10.6 SGK) */}
          <div className="rounded-2xl border border-slate-300 dark:border-slate-700 overflow-hidden shadow-xs">
            <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 border-b border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <span>{bilingualMode === 'en' ? 'File: SPARE PARTS RESERVE.xlsx' : 'Tệp: SPARE PARTS RESERVE.xlsx'}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {fileTranslated
                  ? (bilingualMode === 'en' ? 'VIETNAMESE TRANSLATION' : 'BẢN DỊCH TIẾNG VIỆT')
                  : (bilingualMode === 'en' ? 'ORIGINAL ENGLISH SOURCE' : 'NGÔN NGỮ GỐC TIẾNG ANH')}
              </span>
            </div>

            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-emerald-700 text-white font-bold">
                  <th className="p-2.5 border-r border-emerald-800 w-12 text-center">No</th>
                  <th className="p-2.5 border-r border-emerald-800">
                    {fileTranslated
                      ? (bilingualMode === 'en' ? 'RESERVE SUPPLIES (VIETNAMESE)' : 'DỰ TRỮ CUNG ỨNG PHỤ TÙNG')
                      : 'RESERVE SUPPLIES'}
                  </th>
                  <th className="p-2.5 w-28 text-center">
                    {fileTranslated
                      ? (bilingualMode === 'en' ? 'QUANTITY' : 'SỐ LƯỢNG')
                      : 'QUANTITY'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {[
                  { id: 1, en: 'Color Monitor', vi: 'Màn hình màu', qty: 2 },
                  { id: 2, en: 'Printer', vi: 'Máy in', qty: 3 },
                  { id: 3, en: 'Mouse', vi: 'Chuột', qty: 4 },
                  { id: 4, en: 'Keyboard', vi: 'Bàn phím', qty: 5 },
                  { id: 5, en: 'Hard disk', vi: 'Ổ đĩa cứng', qty: 6 }
                ].map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-2.5 border-r border-slate-200 dark:border-slate-800 text-center font-mono text-slate-500">
                      {row.id}
                    </td>
                    <td className="p-2.5 border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                      {fileTranslated ? row.vi : row.en}
                    </td>
                    <td className="p-2.5 text-center font-mono font-bold text-emerald-600">
                      {row.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              {bilingualMode === 'en' ? (
                <>
                  <strong>Key Caution from Textbook (Page 52):</strong> Machine translation may produce unpolished or overly literal output (e.g. translating <em>Reserve Supplies</em> word-for-word as <em>Dự trữ cung ứng</em>). Learners should cross-examine and refine phrasing autonomously.
                </>
              ) : (
                <>
                  <strong>Lưu ý quan trọng từ SGK (Trang 52):</strong> Bản dịch máy có thể chưa thực sự trau chuốt và vẫn có thể có nhầm lẫn (như cụm từ <em>Reserve Supplies</em> dịch sát nghĩa thành <em>Dự trữ cung ứng</em>). Người học cần đối chiếu và chủ động hoàn thiện lại để câu văn được tự nhiên nhất.
                </>
              )}
            </span>
          </div>
        </div>
      )}

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={10} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous' : 'Quay lại'}</span>
        </button>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-blue-500/25"
        >
          <span>
            {bilingualMode === 'en' ? 'Section 3: Open Edu Resources' : 'Mục 3: Kho học liệu số igiaoduc.vn'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
