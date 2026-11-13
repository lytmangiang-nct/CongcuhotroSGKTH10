import React, { useState } from 'react';
import {
  Globe,
  Volume2,
  Sparkles,
  HelpCircle,
  Eye,
  CheckCircle2,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Languages,
  Layers,
  Cpu,
  FileCode
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section3UnicodeUtf8: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setOriginalPageTarget,
    setShowOriginalModal,
    nextPage
  } = useBook();

  // Interactive Live UTF-8 Inspector input
  const [vietnameseText, setVietnameseText] = useState<string>('Việt Nam');

  // Student answer for Question 2 page 18
  const [selectedQ2Option, setSelectedQ2Option] = useState<string | null>(null);
  const [showQ2Explanation, setShowQ2Explanation] = useState<boolean>(false);

  const speechText =
    "Section 2b: The Unicode Standard and Vietnamese in Unicode. To solve character shortages and accommodate thousands of Asian ideograms, international researchers created Unicode. Unicode provides a unified global character standard, enabling multilingual computing. In 2001, Vietnam established standard TCVN 6909:2001. In 2017, Vietnam mandated the use of UTF-8. Under UTF-8, unaccented Latin characters consume 1 byte, accented Vietnamese vowels and đ use 2 bytes, and special symbols use 3 bytes. Therefore, Vietnamese characters require from 1 to 3 bytes.";

  // Helper function to decompose text into UTF-8 bytes
  const getUtf8Breakdown = (text: string) => {
    const encoder = new TextEncoder();
    return Array.from(text).map((char) => {
      const bytes = encoder.encode(char);
      const hexList = Array.from(bytes).map(b => b.toString(16).toUpperCase().padStart(2, '0')).join(' ');
      const binList = Array.from(bytes).map(b => b.toString(2).padStart(8, '0')).join(' ');
      const codePoint = 'U+' + (char.codePointAt(0) || 0).toString(16).toUpperCase().padStart(4, '0');
      return {
        char,
        byteCount: bytes.length,
        hexList,
        binList,
        codePoint
      };
    });
  };

  const charBreakdown = getUtf8Breakdown(vietnameseText);
  const totalBytes = charBreakdown.reduce((acc, curr) => acc + curr.byteCount, 0);

  return (
    <div className="space-y-6">
      {/* Header section with SGK Page Badge and English TTS */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 px-2.5 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
              {bilingualMode === 'en' ? 'Section 2b • Pages 17 – 18 SGK' : 'Mục 2b • Trang 17 – 18 SGK'}
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
              ? '2b. The Unicode Standard & Vietnamese in UTF-8'
              : '2b. Bảng mã Unicode & Tiếng Việt trong Unicode'}
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

      {/* Core Concept: Why Unicode was born */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {bilingualMode === 'en' ? 'Development History & Global Needs' : 'Lịch sử phát triển & Nhu cầu toàn cầu'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {bilingualMode === 'en' ? 'Unicode Standard and Vietnamese in Unicode' : 'Bảng mã Unicode và Tiếng Việt trong Unicode'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            {bilingualMode === 'en' ? 'Global Unification' : 'Hợp nhất quốc tế'}
          </span>
        </div>

        <BilingualText
          vi="Ngoài các kí tự có trong bảng chữ cái tiếng Anh, tiếng Việt còn có 134 nguyên âm có dấu thanh và phụ âm 'đ', kể cả chữ in hoa, đều không có sẵn trong bảng mã ASCII gốc, tuy nhiên phần mở rộng của bảng mã này lại chỉ có 128 vị trí."
          en="Beyond standard English letters, Vietnamese encompasses 134 accented vowels and the consonant 'đ' (both upper and lower case) not present in original ASCII, yet Extended ASCII provides only 128 additional slots."
        />

        <BilingualText
          vi="Tình trạng thiếu vị trí còn trầm trọng hơn đối với các quốc gia dùng chữ tượng hình như Trung Quốc, Nhật Bản với vài chục nghìn kí tự. Chính vì thế, đầu những năm 1980, người ta đã đề xuất một chương trình quốc tế nhằm xây dựng một bảng mã hợp nhất, dùng chung cho mọi quốc gia, gọi là Unicode."
          en="Character shortages were far more acute for ideographic languages such as Chinese and Japanese, which count tens of thousands of characters. Consequently, in the early 1980s, an international initiative established a unified standard for all nations, known as Unicode."
        />

        <BilingualText
          vi="Unicode thực tế là một bộ tiêu chuẩn biểu diễn kí tự văn bản trong máy tính, cho phép sử dụng nhiều hơn 8 bit để biểu diễn các kí tự thuộc nhiều ngôn ngữ khác nhau trên thế giới. Nhờ vậy, nếu bảng mã ASCII chỉ cho phép mã hoá 256 kí tự, thì Unicode hiện nay đã cho phép mã hoá hàng trăm nghìn kí tự khác nhau."
          en="Unicode is an international standard representing text in computers, utilizing more than 8 bits to represent characters from diverse global languages. While ASCII is restricted to 256 characters, Unicode currently encodes hundreds of thousands of distinct characters."
        />

        {/* 3 Key Benefits of Unicode Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
              <Globe className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'Simultaneous Multilingualism' : 'Đa ngôn ngữ đồng thời'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en'
                ? 'Allows a single website or application to display Vietnamese, English, Japanese, and Arabic concurrently without font rendering glitches.'
                : 'Cho phép một trang web hay phần mềm hiển thị cùng lúc cả tiếng Việt, tiếng Anh, tiếng Nhật, tiếng Ả Rập mà không bị lỗi hiển thị.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'Global Consistency' : 'Nhất quán toàn cầu'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en'
                ? 'Eliminates cases where different countries use identical glyphs with conflicting binary encodings, erasing cross-platform data corruption.'
                : 'Tránh tình trạng các quốc gia dùng cùng mặt chữ nhưng lại quy ước mã nhị phân khác nhau, xoá bỏ hoàn toàn xung đột dữ liệu.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-extrabold text-xs">
              <Languages className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'National Standard' : 'Tiêu chuẩn Nhà nước'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {bilingualMode === 'en'
                ? 'TCVN 6909:2001 (16-bit standard) and the mandatory 2017 decree enforcing UTF-8 across all Vietnamese government agencies.'
                : 'TCVN 6909:2001 (chuẩn 16 bit) và quy định bắt buộc sử dụng định dạng UTF-8 năm 2017 trong toàn bộ cơ quan quản lí nhà nước Việt Nam.'}
            </p>
          </div>
        </div>
      </div>

      {/* Vietnam Standards: TCVN 6909:2001 & UTF-8 */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {bilingualMode === 'en' ? 'Vietnam Regulatory Standards (Page 18 SGK)' : 'Quy chuẩn pháp lí tại Việt Nam (Trang 18 SGK)'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {bilingualMode === 'en' ? 'Standard TCVN 6909:2001 & UTF-8 Format' : 'Tiêu chuẩn TCVN 6909:2001 & Định dạng UTF-8'}
            </h3>
          </div>
        </div>

        <BilingualText
          vi="Năm 2001 Việt Nam đã ban hành Tiêu chuẩn TCVN 6909:2001 về Bộ mã kí tự tiếng Việt 16-bit để sử dụng chung. Tiêu chuẩn này hoàn toàn phù hợp với tiêu chuẩn quốc tế về Unicode. Nó quy định mỗi kí tự đều được biểu diễn bằng 2 byte (các kí tự đã có trong bảng mã ASCII được bổ sung vào phía trước 8 bit giá trị 0)."
          en="In 2001, Vietnam enacted standard TCVN 6909:2001 specifying a 16-bit Vietnamese character set for universal use, fully conforming to Unicode. It prescribed 2 bytes per character, prepending eight 0 bits to legacy ASCII characters."
        />

        <BilingualText
          vi="Năm 2017, Việt Nam cũng đã ban hành quy định bắt buộc sử dụng UTF-8 để biểu diễn bộ kí tự Unicode trong máy tính, trong đó sử dụng 1 byte để mã hoá các kí tự La-tinh không dấu, sử dụng 2 byte để mã hoá các nguyên âm có dấu cùng các kí tự đ, Đ và chỉ dùng 3 byte để mã hoá một số rất ít các kí tự đặc biệt. UTF-8 (8-bit Unicode Transformation Format) là một trong các hệ thống định dạng chuyển đổi cho phép mã hoá kí tự với độ dài khác nhau (từ 1 tới 4 byte) dành cho Unicode."
          en="In 2017, Vietnam issued a mandate requiring UTF-8 for Unicode representations: 1 byte encodes unaccented Latin characters, 2 bytes encode accented vowels and characters đ/Đ, and 3 bytes encode rare special symbols. UTF-8 is a variable-length encoding format (1 to 4 bytes) for Unicode."
        />

        {/* UTF-8 Byte Length Rule Cards */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
            {bilingualMode === 'en' ? 'Vietnamese byte length rules in UTF-8:' : 'Quy tắc độ dài byte của tiếng Việt trong UTF-8:'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[11px]">
                {bilingualMode === 'en' ? '1 Byte (8 bits)' : '1 Byte (8 bit)'}
              </span>
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {bilingualMode === 'en' ? 'Unaccented Latin characters' : 'Kí tự La-tinh không dấu'}
              </div>
              <p className="text-[11px] text-slate-500">
                {bilingualMode === 'en'
                  ? 'Standard English letters (A-Z, a-z), numbers (0-9), spaces, and standard punctuation.'
                  : 'Các chữ cái tiếng Anh cơ bản (A-Z, a-z), chữ số (0-9), dấu cách và dấu câu chuẩn.'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-black text-[11px]">
                {bilingualMode === 'en' ? '2 Bytes (16 bits)' : '2 Byte (16 bit)'}
              </span>
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {bilingualMode === 'en' ? 'Accented vowels & đ/Đ' : 'Nguyên âm có dấu & đ/Đ'}
              </div>
              <p className="text-[11px] text-slate-500">
                {bilingualMode === 'en'
                  ? 'All Vietnamese accented vowels (á, à, ả, ã, ạ, ă, â, ê, ô, ơ, ư) and characters đ, Đ.'
                  : 'Tất cả các nguyên âm có dấu tiếng Việt (á, à, ả, ã, ạ, ă, â, ê, ô, ơ, ư) và chữ đ, Đ.'}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-black text-[11px]">
                {bilingualMode === 'en' ? '3 Bytes (24 bits)' : '3 Byte (24 bit)'}
              </span>
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {bilingualMode === 'en' ? 'Rare special symbols' : 'Kí tự đặc biệt hiếm gặp'}
              </div>
              <p className="text-[11px] text-slate-500">
                {bilingualMode === 'en'
                  ? 'A tiny subset of esoteric math symbols, archaic combining tone marks, or ideographs.'
                  : 'Một số rất ít ký hiệu toán học đặc thù, dấu kết hợp cổ hoặc ký tự tượng hình.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive UTF-8 Live Byte Inspector */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? 'Real-Time Vietnamese UTF-8 Byte Inspector'
                  : 'Bộ phân tích Byte UTF-8 Tiếng Việt thời gian thực'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Type accented Vietnamese text to observe actual computer byte allocation live'
                  : 'Gõ văn bản tiếng Việt có dấu để quan sát trực tiếp số byte thực tế máy tính tiêu tốn'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold">
            <span className="text-slate-500">
              {bilingualMode === 'en' ? 'Total capacity:' : 'Tổng dung lượng:'}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white shadow-2xs">
              {totalBytes} Bytes ({totalBytes * 8} bits)
            </span>
          </div>
        </div>

        {/* Input Text Box with presets */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={vietnameseText}
              onChange={(e) => setVietnameseText(e.target.value)}
              placeholder={bilingualMode === 'en' ? 'Type Vietnamese text (e.g., Việt Nam, Tin học 10)...' : 'Gõ từ tiếng Việt (ví dụ: Việt Nam, Tin học 10, Đào Kiến Quốc)...'}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner"
            />
            <div className="flex items-center gap-1">
              {['Việt Nam', 'Tin học 10', 'Học sinh', 'Sách giáo khoa'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setVietnameseText(preset)}
                  className="hidden sm:inline px-2.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 dark:text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Character-by-character decomposition cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 pt-1">
          {charBreakdown.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-center flex flex-col justify-between space-y-1.5 transition-all ${
                item.byteCount === 1
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                  : item.byteCount === 2
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800 ring-1 ring-indigo-400/40'
                  : 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>#{idx + 1}</span>
                <span className={`px-1 rounded font-bold ${
                  item.byteCount === 1 ? 'bg-emerald-200 text-emerald-900' : 'bg-indigo-200 text-indigo-900'
                }`}>
                  {item.byteCount}B
                </span>
              </div>

              <div className="text-2xl font-black text-slate-900 dark:text-white font-sans py-0.5">
                {item.char === ' ' ? '␣' : item.char}
              </div>

              <div className="space-y-0.5 text-[10px] font-mono">
                <div className="text-indigo-600 dark:text-indigo-400 font-bold">{item.codePoint}</div>
                <div className="text-slate-400 text-[9px] truncate" title={item.hexList}>
                  0x{item.hexList}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
          <span>
            {bilingualMode === 'en' ? (
              <>
                💡 <strong>Practical Observation:</strong> Unaccented letters (such as 'V', 'i', 't', 'N', 'a', 'm') consume only <strong>1 byte</strong>; while accented vowels (such as 'ệ') consume <strong>2 bytes</strong>.
              </>
            ) : (
              <>
                💡 <strong>Nhận xét thực tế:</strong> Chữ không dấu (như 'V', 'i', 't', 'N', 'a', 'm') chỉ tốn <strong>1 byte</strong>; trong khi các nguyên âm có dấu (như 'ệ') tốn <strong>2 byte</strong>.
              </>
            )}
          </span>
        </div>
      </div>

      {/* Official Question 2 - Page 18 SGK */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">
            {bilingualMode === 'en' ? 'Question 2 - Textbook Page 18' : 'Câu hỏi 2 - Trang 18 SGK'}
          </h3>
        </div>

        <div className="space-y-3">
          <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed">
            {bilingualMode === 'en'
              ? '2. In the UNICODE character set, how many bytes represent each Vietnamese character in UTF-8?'
              : '2. Trong bảng mã UNICODE, mỗi kí tự Tiếng Việt theo UTF-8 được biểu diễn bởi bao nhiêu byte?'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              {
                key: 'A',
                label: bilingualMode === 'en' ? 'A. 1 byte.' : 'A. 1 byte.',
                isCorrect: false
              },
              {
                key: 'B',
                label: bilingualMode === 'en' ? 'B. 2 bytes.' : 'B. 2 byte.',
                isCorrect: false
              },
              {
                key: 'C',
                label: bilingualMode === 'en' ? 'C. 4 bytes.' : 'C. 4 byte.',
                isCorrect: false
              },
              {
                key: 'D',
                label: bilingualMode === 'en' ? 'D. From 1 to 3 bytes.' : 'D. Từ 1 đến 3 byte.',
                isCorrect: true
              }
            ].map((opt) => {
              const isSelected = selectedQ2Option === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    setSelectedQ2Option(opt.key);
                    setShowQ2Explanation(true);
                  }}
                  className={`p-3 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                        : 'bg-rose-500 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          {showQ2Explanation && selectedQ2Option === 'D' && (
            <div className="p-4 rounded-2xl text-xs space-y-1.5 leading-relaxed bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
              <div className="font-black text-sm">
                {bilingualMode === 'en' ? 'Standard Textbook Explanation:' : 'Giải thích chuẩn SGK:'}
              </div>
              <div>
                <strong>
                  {bilingualMode === 'en'
                    ? 'Correct answer is D: From 1 to 3 bytes.'
                    : 'Đáp án đúng là D: Từ 1 đến 3 byte.'}
                </strong>
              </div>
              <div>
                <strong>{bilingualMode === 'en' ? 'Textbook Page 18 explanation:' : 'Giải thích theo SGK Trang 18:'}</strong>{' '}
                {bilingualMode === 'en'
                  ? 'In UTF-8, unaccented Latin characters need 1 byte; Vietnamese accented vowels and đ/Đ need 2 bytes; and rare special characters need 3 bytes. Therefore, the Vietnamese character repertoire spans from 1 to 3 bytes.'
                  : 'Trong định dạng UTF-8, các ký tự La-tinh không dấu chỉ cần 1 byte; các nguyên âm có dấu tiếng Việt và đ/Đ cần 2 byte; và một số rất ít ký tự đặc biệt cần 3 byte. Do đó, bộ ký tự tiếng Việt trải dài từ 1 đến 3 byte.'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next Step Nav Card */}
      <div className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
        <div>
          <div className="text-xs text-indigo-700 dark:text-indigo-400 font-bold uppercase">
            {bilingualMode === 'en' ? 'Next: Section 2c' : 'Tiếp theo: Mục 2c'}
          </div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? 'Text Digitization & Input Technologies (Textbook Page 18)'
              : 'Số hoá văn bản & Công nghệ nhập liệu (Trang 18 SGK)'}
          </h4>
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          <span>{bilingualMode === 'en' ? 'Proceed to 2c' : 'Sang Mục 2c'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
