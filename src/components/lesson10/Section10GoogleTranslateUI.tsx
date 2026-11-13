import React, { useState } from 'react';
import {
  Languages,
  ArrowRightLeft,
  Search,
  Check,
  ChevronDown,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Info,
  Sparkles,
  Bookmark,
  Mic,
  FileText,
  Copy,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section10GoogleTranslateUI: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget
  } = useBook();

  // Selected language state
  const [sourceLang, setSourceLang] = useState<string>('vi');
  const [targetLang, setTargetLang] = useState<string>('en');

  // Dropdown open states
  const [showSourceDropdown, setShowSourceDropdown] = useState<boolean>(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState<boolean>(false);
  const [langSearch, setLangSearch] = useState<string>('');

  // Callouts hover / click inspection on Figure 10.1
  const [activeCallout, setActiveCallout] = useState<string | null>('source');

  const sectionSpeechVi =
    'Nhiệm vụ 1: Sử dụng phần mềm dịch đa ngữ Google Translate để học ngoại ngữ. Bước 1: Truy cập trang web translate.google.com. Màn hình làm việc chia làm hai khung chính: bên trái là khung nhập văn bản ngôn ngữ nguồn, bên phải là khung hiển thị kết quả dịch ngôn ngữ đích. Bước 2: Xác định ngôn ngữ nguồn là ngôn ngữ đầu vào và ngôn ngữ đích là ngôn ngữ đầu ra. Nháy chuột vào mũi tên mở danh sách thả xuống để lựa chọn trong hàng trăm ngôn ngữ được hỗ trợ trên thế giới.';
  const sectionSpeechEn =
    'Task 1: Using Google Translate for Foreign Language Learning. Step 1: Navigate to translate.google.com. The workspace divides into two primary panels: the left pane takes the source language input, and the right pane delivers target language results. Step 2: Establish the source language as input and the target language as output. Click the downward chevron to open the dropdown directory containing hundreds of supported global languages.';

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

  const supportedLanguages = [
    { code: 'vi', nameVi: 'Tiếng Việt', nameEn: 'Vietnamese' },
    { code: 'en', nameVi: 'Tiếng Anh', nameEn: 'English' },
    { code: 'ru', nameVi: 'Tiếng Nga', nameEn: 'Russian' },
    { code: 'fr', nameVi: 'Tiếng Pháp', nameEn: 'French' },
    { code: 'zh', nameVi: 'Tiếng Trung (Giản thể)', nameEn: 'Chinese (Simplified)' },
    { code: 'ja', nameVi: 'Tiếng Nhật', nameEn: 'Japanese' },
    { code: 'ko', nameVi: 'Tiếng Hàn', nameEn: 'Korean' },
    { code: 'de', nameVi: 'Tiếng Đức', nameEn: 'German' },
    { code: 'es', nameVi: 'Tiếng Tây Ban Nha', nameEn: 'Spanish' },
    { code: 'it', nameVi: 'Tiếng Ý', nameEn: 'Italian' }
  ];

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  const filteredLanguages = supportedLanguages.filter(
    (l) =>
      l.nameVi.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.nameEn.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
            {bilingualMode === 'en' ? 'Task 1 • Textbook Pages 50–51' : 'Nhiệm vụ 1 • SGK Trang 50 – 51'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            <BilingualText
              vi="GIAO DIỆN GOOGLE TRANSLATE & CHỌN NGÔN NGỮ"
              en="GOOGLE TRANSLATE UI & LANGUAGE SELECTION"
            />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <BilingualText
              vi="Bước 1 & Bước 2: Khám phá giao diện Hình 10.1 & Thiết lập cặp ngôn ngữ Hình 10.2"
              en="Step 1 & Step 2: Explore Figure 10.1 Interface & Configure Figure 10.2 Language Pairs"
            />
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOriginalPageTarget(50)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-blue-600" />
            <span>{bilingualMode === 'en' ? 'Textbook Page 50' : 'SGK Trang 50'}</span>
          </button>
        </div>
      </div>

      {/* Concept Callout: Source vs Target Language (SGK trang 50) */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold text-sm">
            <Languages className="w-4 h-4 text-blue-600" />
            <span>{bilingualMode === 'en' ? '1. Source Language (Ngôn ngữ nguồn)' : '1. Ngôn ngữ nguồn (Source Language)'}</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en' ? (
              <>
                The <strong>input language</strong> of the text, speech, or file to be translated. Located in the left workspace pane.
              </>
            ) : (
              <>
                Là <strong>ngôn ngữ đầu vào</strong> của văn bản, âm thanh hoặc tệp tin cần dịch. Nằm ở khung bên trái màn hình.
              </>
            )}
          </p>
          <div className="text-[11px] font-mono text-blue-700 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-900/40 p-2 rounded-xl">
            {bilingualMode === 'en'
              ? 'Example: Vietnamese ("Máy tính gồm có bộ xử lí...")'
              : 'Ví dụ: Tiếng Việt ("Máy tính gồm có bộ xử lí...")'}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <Languages className="w-4 h-4 text-emerald-600" />
            <span>{bilingualMode === 'en' ? '2. Target Language (Ngôn ngữ đích)' : '2. Ngôn ngữ đích (Target Language)'}</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en' ? (
              <>
                The <strong>output language</strong> delivering the software translation output. Located in the right workspace pane.
              </>
            ) : (
              <>
                Là <strong>ngôn ngữ đầu ra</strong> thể hiện kết quả bản dịch của phần mềm. Nằm ở khung bên phải màn hình.
              </>
            )}
          </p>
          <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-900/40 p-2 rounded-xl">
            {bilingualMode === 'en'
              ? 'Example: English ("A computer consists of a processor...")'
              : 'Ví dụ: Tiếng Anh ("A computer consists of a processor...")'}
          </div>
        </div>
      </div>

      {/* INTERACTIVE SIMULATOR: Google Translate Header & Selector (Hình 10.1 & 10.2) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                {bilingualMode === 'en'
                  ? 'Interactive Simulation (Figures 10.1 & 10.2)'
                  : 'Mô phỏng tương tác Hình 10.1 & 10.2'}
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Google Translate Language Selector (translate.google.com)'
                  : 'Giao diện chọn ngôn ngữ Google Translate (translate.google.com)'}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
              URL: https://translate.google.com/
            </span>
          </div>
        </div>

        {/* Input Type Switcher Tabs (Văn bản vs Tài liệu) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Text' : 'Văn bản (Text)'}</span>
          </button>
          <button
            type="button"
            onClick={nextPage}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Documents ➔' : 'Tài liệu (Documents) ➔'}</span>
          </button>
        </div>

        {/* Interactive Language Bar with Swap Button (Hình 10.1) */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Source Language Bar */}
            <div className="flex items-center gap-2 relative">
              <span className="text-xs font-bold text-slate-500">
                {bilingualMode === 'en' ? 'Source:' : 'Nguồn:'}
              </span>
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                {['vi', 'en'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setSourceLang(code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      sourceLang === code
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {code === 'vi'
                      ? (bilingualMode === 'en' ? 'Vietnamese' : 'Tiếng Việt')
                      : (bilingualMode === 'en' ? 'English' : 'Tiếng Anh')}
                  </button>
                ))}
                {/* Dropdown chevron for source */}
                <button
                  type="button"
                  onClick={() => setShowSourceDropdown(!showSourceDropdown)}
                  className="px-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-xs cursor-pointer"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Source Language Dropdown List (Hình 10.2) */}
              {showSourceDropdown && (
                <div className="absolute top-12 left-0 z-30 w-64 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={bilingualMode === 'en' ? 'Search languages...' : 'Tìm kiếm ngôn ngữ...'}
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      className="bg-transparent border-none outline-hidden text-xs w-full text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {filteredLanguages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setSourceLang(l.code);
                          setShowSourceDropdown(false);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg text-left text-xs flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        <span>{bilingualMode === 'en' ? l.nameEn : l.nameVi}</span>
                        {sourceLang === l.code && (
                          <Check className="w-3.5 h-3.5 text-blue-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bidirectional Swap Button (⇄) */}
            <button
              type="button"
              onClick={handleSwapLanguages}
              title={bilingualMode === 'en' ? 'Swap source and target languages (⇄)' : 'Đổi lại vai trò ngôn ngữ nguồn và đích (⇄)'}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800 text-blue-600 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>

            {/* Target Language Bar */}
            <div className="flex items-center gap-2 relative">
              <span className="text-xs font-bold text-slate-500">
                {bilingualMode === 'en' ? 'Target:' : 'Đích:'}
              </span>
              <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                {['en', 'ru', 'zh'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setTargetLang(code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      targetLang === code
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {code === 'en'
                      ? (bilingualMode === 'en' ? 'English' : 'Tiếng Anh')
                      : code === 'ru'
                      ? (bilingualMode === 'en' ? 'Russian' : 'Tiếng Nga')
                      : (bilingualMode === 'en' ? 'Chinese' : 'Tiếng Trung')}
                  </button>
                ))}
                {/* Dropdown chevron for target */}
                <button
                  type="button"
                  onClick={() => setShowTargetDropdown(!showTargetDropdown)}
                  className="px-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 text-xs cursor-pointer"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Target Language Dropdown List (Hình 10.2) */}
              {showTargetDropdown && (
                <div className="absolute top-12 right-0 z-30 w-64 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                    <Search className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={bilingualMode === 'en' ? 'Search languages...' : 'Tìm kiếm ngôn ngữ...'}
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      className="bg-transparent border-none outline-hidden text-xs w-full text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-1">
                    {filteredLanguages.map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setTargetLang(l.code);
                          setShowTargetDropdown(false);
                        }}
                        className="w-full px-3 py-1.5 rounded-lg text-left text-xs flex items-center justify-between hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        <span>{bilingualMode === 'en' ? l.nameEn : l.nameVi}</span>
                        {targetLang === l.code && (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Callout Analysis of Figure 10.1 UI Elements */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-slate-100">
            <Info className="w-4 h-4 text-blue-600" />
            <span>
              {bilingualMode === 'en'
                ? 'Anatomy of Figure 10.1 Interface Elements:'
                : 'Giải phẫu các thành phần trên giao diện Hình 10.1 SGK:'}
            </span>
          </div>
          <div className="grid sm:grid-cols-3 gap-2.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <strong className="text-blue-600 dark:text-blue-400 block mb-0.5">
                {bilingualMode === 'en' ? '• Source Language Pane (Left):' : '• Khung ngôn ngữ nguồn (bên trái):'}
              </strong>
              {bilingualMode === 'en'
                ? 'Direct text entry area or click the microphone icon for spoken voice input.'
                : 'Nơi nhập văn bản trực tiếp hoặc nhấp biểu tượng micro để đọc tiếng nói đầu vào.'}
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <strong className="text-emerald-600 dark:text-emerald-400 block mb-0.5">
                {bilingualMode === 'en' ? '• Target Language Pane (Right):' : '• Khung ngôn ngữ đích (bên phải):'}
              </strong>
              {bilingualMode === 'en'
                ? 'Displays translated results, featuring a clipboard copy button (Ctrl+C) and TTS speaker button.'
                : 'Nơi hiển thị kết quả dịch, có biểu tượng sao chép (Ctrl+C) và biểu tượng loa phát âm.'}
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <strong className="text-purple-600 dark:text-purple-400 block mb-0.5">
                {bilingualMode === 'en' ? '• Swap Languages Button (⇄):' : '• Nút đảo ngôn ngữ (⇄):'}
              </strong>
              {bilingualMode === 'en'
                ? 'Positioned between both panes to instantly invert source and target roles with a single click.'
                : 'Nằm ở chính giữa hai danh sách, giúp đảo ngược vai trò nguồn và đích tức thì chỉ với một cú nhấp.'}
            </div>
          </div>
        </div>
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={10} />

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
            {bilingualMode === 'en' ? 'Section 2: 3 Translation Methods' : 'Mục 2: Ba phương thức nhập để dịch'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
