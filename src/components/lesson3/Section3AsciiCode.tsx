import React, { useState } from 'react';
import {
  Binary,
  Volume2,
  BookOpen,
  Sparkles,
  HelpCircle,
  Eye,
  Hash,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Code2,
  Table,
  CheckCircle2
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section3AsciiCode: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setOriginalPageTarget,
    setShowOriginalModal,
    nextPage
  } = useBook();

  // Interactive live character input
  const [inputChar, setInputChar] = useState<string>('A');

  // Collapse toggle for Activity 2
  const [showAct2Answer, setShowAct2Answer] = useState<boolean>(false);

  // Quick lookup cards for SGK characters (S, G, K)
  const sgkCharTargets = [
    { char: 'A', dec: 65, hex: '41', row4: '0100', col4: '0001', bin: '01000001', note: 'Ví dụ mẫu SGK Trang 17' },
    { char: 'S', dec: 83, hex: '53', row4: '0101', col4: '0011', bin: '01010011', note: 'Câu hỏi 1 Trang 18 SGK' },
    { char: 'G', dec: 71, hex: '47', row4: '0100', col4: '0111', bin: '01000111', note: 'Câu hỏi 1 Trang 18 SGK' },
    { char: 'K', dec: 75, hex: '4B', row4: '0100', col4: '1011', bin: '01001011', note: 'Câu hỏi 1 Trang 18 SGK' },
    { char: '0', dec: 48, hex: '30', row4: '0011', col4: '0000', bin: '00110000', note: 'Chữ số 0' },
    { char: 'a', dec: 97, hex: '61', row4: '0110', col4: '0001', bin: '01100001', note: 'Chữ thường a' }
  ];

  // Calculate binary info for current inputChar
  const charCode = inputChar.charCodeAt(0) || 65;
  const safeCode = Math.min(255, charCode);
  const binary8 = safeCode.toString(2).padStart(8, '0');
  const row4Bits = binary8.slice(0, 4);
  const col4Bits = binary8.slice(4, 8);
  const hexValue = safeCode.toString(16).toUpperCase().padStart(2, '0');

  const speechText =
    "Section 2a: Representing Text Data and the ASCII Code. The most widespread standard in computer science is ASCII, American Standard Code for Information Interchange. Standard ASCII uses 7 bits representing 128 characters (codes 0 to 127). Extended ASCII uses 8 bits for 256 characters. To form the 8-bit binary code, the 4-bit row index is combined with the 4-bit column index. For example, uppercase letter A has code 65, which is 01000001 in binary.";

  return (
    <div className="space-y-6">
      {/* Header section with SGK Page Badge and English TTS */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 px-2.5 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
              {bilingualMode === 'en' ? 'Section 2a • Page 17 SGK' : 'Mục 2a • Trang 17 SGK'}
            </span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(17);
                setShowOriginalModal(true);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{bilingualMode === 'en' ? 'View scan page 17' : 'Xem scan trang 17'}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? '2. Text Data Representation & The ASCII Table'
              : '2. Biểu diễn dữ liệu văn bản & Bảng mã ASCII'}
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

      {/* Activity 2: English Alphabet vs Vietnamese Alphabet (Trang 17 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {bilingualMode === 'en' ? 'Activity 2 (Textbook Page 17)' : 'Hoạt động 2 (Trang 17 SGK)'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'English Alphabet and Vietnamese Alphabet'
                : 'Bảng chữ cái tiếng Anh và bảng chữ cái tiếng Việt'}
            </h3>
          </div>
        </div>

        <BilingualText
          vi="Việc đưa văn bản vào máy tính như thế nào không chỉ phụ thuộc vào kiểu dữ liệu là kí tự, xâu kí tự hay tệp văn bản mà còn phụ thuộc vào các kí tự ấy được mã hoá như thế nào? Cách mã hoá được quy định trong bảng kí tự."
          en="How text is ingested into a computer depends not merely on whether the data type is character, string, or text file, but critically on how individual characters are encoded. The encoding rules are defined within character set tables."
        />

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en'
                ? '1. What characters does the English alphabet contain?'
                : '1. Bảng chữ cái tiếng Anh có những kí tự nào?'}
            </div>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en'
                ? '2. In computer science, each Vietnamese accented vowel is treated as a separate character. Name the Vietnamese characters not present in the English alphabet. How many such characters exist?'
                : '2. Trong tin học, mỗi nguyên âm có dấu thanh của tiếng Việt là một kí tự. Hãy kể tên các kí tự tiếng Việt không có trong bảng chữ cái tiếng Anh. Có bao nhiêu kí tự như vậy?'}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500">
              {bilingualMode === 'en'
                ? 'Discover the character count difference between both languages'
                : 'Khám phá sự khác biệt về số lượng ký tự giữa hai ngôn ngữ'}
            </span>
            <button
              type="button"
              onClick={() => setShowAct2Answer(!showAct2Answer)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-1.5 hover:bg-purple-100 cursor-pointer"
            >
              <span>
                {showAct2Answer
                  ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Ẩn lời giải')
                  : (bilingualMode === 'en' ? 'View Detailed SGK Analysis' : 'Xem phân tích chi tiết SGK')}
              </span>
              {showAct2Answer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showAct2Answer && (
            <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-xs text-purple-950 dark:text-purple-200 space-y-2 leading-relaxed">
              {bilingualMode === 'en' ? (
                <>
                  <div>
                    • <strong>Question 1:</strong> The English alphabet contains <strong>26 basic letters</strong> (A–Z) in uppercase and lowercase (total 52 letter characters), 10 numerical digits (0–9), punctuation marks, and standard mathematical symbols.
                  </div>
                  <div>
                    • <strong>Question 2:</strong> The Vietnamese alphabet has specific unique characters:
                    <br />- Consonants: <strong>đ, Đ</strong> (2 characters).
                    <br />- Vowels with hats / horns: <strong>ă, â, ê, ô, ơ, ư</strong> and uppercase: <strong>Ă, Â, Ê, Ô, Ơ, Ư</strong> (12 characters).
                    <br />- Vowels with 5 tone marks applied to 12 vowels (a, ă, â, e, ê, i, o, ô, ơ, u, ư, y): 5 tone forms x 12 = 60 lowercase + 60 uppercase = 120 characters.
                    <br />- <strong>Total:</strong> Vietnamese has up to <strong>134 accented vowel and đ/Đ characters</strong> not present in the standard English alphabet! This is why 8-bit ASCII (only 128 extended positions) could never fit all Vietnamese characters alongside international sets.
                  </div>
                </>
              ) : (
                <>
                  <div>
                    • <strong>Câu 1:</strong> Bảng chữ cái tiếng Anh gồm <strong>26 chữ cái</strong> cơ bản (A, B, C, ..., Z) ở hai dạng in hoa và in thường (tổng cộng 52 ký tự chữ cái), 10 chữ số (0-9) và các dấu câu, ký hiệu toán học thông dụng.
                  </div>
                  <div>
                    • <strong>Câu 2:</strong> Bảng chữ cái tiếng Việt có thêm các ký tự đặc thù:
                    <br />- Chữ cái phụ âm: <strong>đ, Đ</strong> (2 ký tự).
                    <br />- Chữ cái nguyên âm có mũ / móc: <strong>ă, â, ê, ô, ơ, ư</strong> và dạng in hoa: <strong>Ă, Â, Ê, Ô, Ơ, Ư</strong> (12 ký tự).
                    <br />- Các nguyên âm có 5 dấu thanh (sắc, huyền, hỏi, ngã, nặng) áp dụng cho 12 nguyên âm (a, ă, â, e, ê, i, o, ô, ơ, u, ư, y): mỗi nguyên âm có 5 dạng có dấu x 12 = 60 ký tự thường + 60 ký tự hoa = 120 ký tự.
                    <br />- <strong>Tổng cộng:</strong> Tiếng Việt có đến <strong>134 ký tự nguyên âm có dấu và đ/Đ</strong> không có sẵn trong bảng chữ cái tiếng Anh! Đây chính là lí do bảng mã ASCII 8 bit (chỉ có 128 vị trí mở rộng) không thể chứa đủ toàn bộ chữ tiếng Việt.
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Core Knowledge: a) Bảng mã ASCII & ASCII mở rộng */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Kiến thức trọng tâm
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              a) Bảng mã ASCII (American Standard Code for Information Interchange)
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            Chuẩn mã hóa Mỹ
          </span>
        </div>

        <BilingualText
          vi="Bảng mã được dùng phổ biến nhất trong tin học là 'bảng mã chuẩn của Mỹ để trao đổi thông tin' (American Standard Code for Information Interchange viết tắt là ASCII). Ban đầu bảng mã này dùng các mã 7 bit, với 128 (2^7) mã khác nhau nên chỉ thể hiện được đúng 128 kí tự (từ 0 đến 127). Bảng mã 7 bit chỉ đủ dùng cho tiếng Anh."
          en="The most widespread character encoding in informatics is the American Standard Code for Information Interchange (ASCII). Originally, it utilized 7-bit codes with 128 (2^7) distinct code points (0 to 127), accommodating solely the English language."
        />

        <BilingualText
          vi="Để hỗ trợ các quốc gia khác, người ta đã mở rộng bảng mã 7 bit thành bảng mã 8 bit gọi là bảng mã ASCII mở rộng, cho phép mã hoá 256 (2^8) kí tự. Trong đó, giữ nguyên 128 kí tự cũ (0-127). 128 vị trí được thêm vào (128-255) được gọi là phần mở rộng của bảng mã ASCII."
          en="To accommodate other nations, the 7-bit table was expanded into an 8-bit table known as Extended ASCII, capable of encoding 256 (2^8) characters. It preserves the original 128 characters (0-127) while adding 128 slots (128-255) as the extended region."
        />

        {/* 7-bit vs 8-bit Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Card 1: 7-bit ASCII */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-100 text-indigo-900 font-black text-xs">
                {bilingualMode === 'en' ? '7-bit ASCII (Original Standard)' : 'ASCII 7 bit (Chuẩn ban đầu)'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                {bilingualMode === 'en' ? '128 Characters (2⁷)' : '128 Kí tự (2⁷)'}
              </span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              {bilingualMode === 'en' ? (
                <>
                  <div>• <strong>Code range:</strong> 0 to 127 (0000000 to 1111111).</div>
                  <div>• <strong>Scope:</strong> 26 English uppercase letters (A–Z, 65–90), 26 lowercase (a–z, 97–122), 10 digits (0–9, 48–57), punctuation, and 32 non-printable control characters (0–31).</div>
                  <div>• <strong>Limitation:</strong> Exclusively covers English; completely lacks accented characters of other languages.</div>
                </>
              ) : (
                <>
                  <div>• <strong>Mã số:</strong> Từ 0 đến 127 (0000000 đến 1111111).</div>
                  <div>• <strong>Phạm vi:</strong> 26 chữ cái tiếng Anh in hoa (A-Z, mã 65-90), 26 chữ thường (a-z, mã 97-122), 10 chữ số (0-9, mã 48-57), các dấu câu và 32 mã điều khiển không in được (mã 0-31).</div>
                  <div>• <strong>Hạn chế:</strong> Chỉ phục vụ duy nhất tiếng Anh, hoàn toàn thiếu các ký tự có dấu của ngôn ngữ khác.</div>
                </>
              )}
            </div>
          </div>

          {/* Card 2: 8-bit Extended ASCII */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-black text-xs">
                {bilingualMode === 'en' ? '8-bit Extended ASCII' : 'ASCII Mở rộng 8 bit'}
              </span>
              <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-400">
                {bilingualMode === 'en' ? '256 Characters (2⁸)' : '256 Kí tự (2⁸)'}
              </span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
              {bilingualMode === 'en' ? (
                <>
                  <div>• <strong>Code range:</strong> 0 to 255 (00000000 to 11111111).</div>
                  <div>• <strong>Structure:</strong> Preserves the initial 128 codes (MSB = 0). Adds 128 codes from 128 to 255 (MSB = 1) for Greek letters (α, β, γ), Cyrillic, and math symbols.</div>
                  <div>• <strong>Binary Lookup:</strong> Concatenate 4-bit row index with 4-bit column index.</div>
                </>
              ) : (
                <>
                  <div>• <strong>Mã số:</strong> Từ 0 đến 255 (00000000 đến 11111111).</div>
                  <div>• <strong>Cấu trúc:</strong> Giữ nguyên 128 mã đầu (bit cao nhất = 0). Thêm 128 mã từ 128 đến 255 (bit cao nhất = 1) làm phần mở rộng cho các ký tự Hy Lạp (α, β, γ), tiếng Nga (б, г, д), ký hiệu toán học.</div>
                  <div>• <strong>Cách tra mã nhị phân:</strong> Ghép 4 bit chỉ số hàng với 4 bit chỉ số cột.</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive ASCII Live Converter & SGK Character Matrix Inspector */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-xs">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? 'Real-Time ASCII Binary Lookup & Generator'
                  : 'Bộ tra cứu & Tạo mã nhị phân ASCII thời gian thực'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Type any character to see the 4-bit row + 4-bit column = 8-bit binary decomposition'
                  : 'Gõ một ký tự bất kỳ để xem cấu trúc 4-bit hàng + 4-bit cột = 8-bit mã nhị phân'}
              </p>
            </div>
          </div>

          {/* Quick SGK presets: 'A' (Ví dụ SGK), 'S', 'G', 'K' (Câu hỏi 1 Tr. 18) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs text-slate-400 font-semibold mr-1">
              {bilingualMode === 'en' ? 'Presets:' : 'SGK:'}
            </span>
            {sgkCharTargets.map((t) => (
              <button
                key={t.char}
                type="button"
                onClick={() => setInputChar(t.char)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-black transition-all cursor-pointer ${
                  inputChar === t.char
                    ? 'bg-indigo-600 text-white shadow-xs scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-indigo-50'
                }`}
                title={bilingualMode === 'en' ? `Lookup character '${t.char}' (${t.note})` : `Tra cứu kí tự '${t.char}' (${t.note})`}
              >
                '{t.char}'
              </button>
            ))}
          </div>
        </div>

        {/* Live Input & Matrix Decomposition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Input Box (Col 4) */}
          <div className="md:col-span-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-2 text-center">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {bilingualMode === 'en' ? 'Character to lookup:' : 'Kí tự cần tra cứu:'}
            </span>
            <input
              type="text"
              maxLength={1}
              value={inputChar}
              onChange={(e) => {
                if (e.target.value) {
                  setInputChar(e.target.value[0]);
                }
              }}
              className="w-20 h-20 text-center font-mono font-black text-4xl bg-white dark:bg-slate-900 text-indigo-600 rounded-2xl border-2 border-indigo-400 outline-none shadow-inner focus:ring-4 focus:ring-indigo-300"
            />
            <span className="text-[11px] text-slate-400">
              {bilingualMode === 'en' ? 'Type 1 letter or digit in the box' : 'Gõ 1 chữ cái hoặc số vào ô trên'}
            </span>
          </div>

          {/* Detailed Encoding Output (Col 8) */}
          <div className="md:col-span-8 p-4 sm:p-5 rounded-2xl bg-slate-900 text-white font-mono space-y-3.5 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                {bilingualMode === 'en' ? '8-bit ASCII Decoded Result:' : 'Kết quả giải mã ASCII 8-bit:'}
              </span>
              <span className="text-xs text-amber-300 font-bold">
                {bilingualMode === 'en'
                  ? `Decimal: #${safeCode} • Hex: 0x${hexValue}`
                  : `Mã thập phân: #${safeCode} • Hex: 0x${hexValue}`}
              </span>
            </div>

            {/* Binary Composition Visualization: Row 4-bit + Col 4-bit */}
            <div className="space-y-1.5">
              <div className="text-[11px] text-slate-400 font-sans">
                {bilingualMode === 'en'
                  ? 'Binary composition rule (Textbook Page 17):'
                  : 'Quy tắc ghép mã nhị phân (Theo SGK Trang 17):'}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-black">
                {/* 4 bit hang */}
                <div className="p-2 rounded-xl bg-indigo-950 border border-indigo-500 text-indigo-300 flex flex-col items-center">
                  <span className="text-[9px] uppercase font-sans text-indigo-400">
                    {bilingualMode === 'en' ? '4-bit row' : '4 bit hàng'}
                  </span>
                  <span className="text-lg tracking-widest">{row4Bits}</span>
                </div>

                <span className="text-slate-500 text-lg font-sans">+</span>

                {/* 4 bit cot */}
                <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 flex flex-col items-center">
                  <span className="text-[9px] uppercase font-sans text-emerald-400">
                    {bilingualMode === 'en' ? '4-bit col' : '4 bit cột'}
                  </span>
                  <span className="text-lg tracking-widest">{col4Bits}</span>
                </div>

                <span className="text-slate-500 text-lg font-sans">=</span>

                {/* Full 8 bit */}
                <div className="p-2 rounded-xl bg-purple-950 border border-purple-500 text-purple-200 flex flex-col items-center">
                  <span className="text-[9px] uppercase font-sans text-purple-400">
                    {bilingualMode === 'en' ? '8-bit binary sequence' : 'Dãy nhị phân 8 bit'}
                  </span>
                  <span className="text-lg tracking-widest text-amber-300">{binary8}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
              {bilingualMode === 'en' ? (
                <>
                  Character <strong>'{inputChar}'</strong> has ASCII decimal ordinal <strong>{safeCode}</strong>.
                  Corresponding binary code is <strong>{binary8}</strong> (where first 4 bits {row4Bits} represent row index, and last 4 bits {col4Bits} represent column index).
                </>
              ) : (
                <>
                  Kí tự <strong>'{inputChar}'</strong> có số thứ tự trong bảng mã ASCII là <strong>{safeCode}</strong>.
                  Mã nhị phân tương ứng là <strong>{binary8}</strong> (trong đó 4 bit đầu {row4Bits} là chỉ số hàng, 4 bit sau {col4Bits} là chỉ số cột).
                </>
              )}
            </div>
          </div>
        </div>

        {/* SGK Question 1 Page 18: Characters S, G, K */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2.5">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              {bilingualMode === 'en'
                ? 'Quick SGK Question 1 Breakdown (Page 18): Determine codes for characters S, G, K'
                : 'Giải đáp nhanh Câu hỏi 1 - Trang 18 SGK: Xác định mã của các kí tự S, G, K'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            {/* Char S */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 space-y-1">
              <div className="font-black text-sm text-indigo-600">
                {bilingualMode === 'en' ? "Character 'S'" : "Kí tự 'S'"}
              </div>
              <div>• {bilingualMode === 'en' ? 'Decimal Ordinal:' : 'Số thứ tự (Thập phân):'} <strong>83</strong></div>
              <div>• {bilingualMode === 'en' ? 'Row index:' : 'Chỉ số hàng:'} <strong>0101</strong> (5)</div>
              <div>• {bilingualMode === 'en' ? 'Col index:' : 'Chỉ số cột:'} <strong>0011</strong> (3)</div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                • {bilingualMode === 'en' ? 'Binary code:' : 'Mã nhị phân:'} <strong>01010011</strong>
              </div>
            </div>

            {/* Char G */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 space-y-1">
              <div className="font-black text-sm text-indigo-600">
                {bilingualMode === 'en' ? "Character 'G'" : "Kí tự 'G'"}
              </div>
              <div>• {bilingualMode === 'en' ? 'Decimal Ordinal:' : 'Số thứ tự (Thập phân):'} <strong>71</strong></div>
              <div>• {bilingualMode === 'en' ? 'Row index:' : 'Chỉ số hàng:'} <strong>0100</strong> (4)</div>
              <div>• {bilingualMode === 'en' ? 'Col index:' : 'Chỉ số cột:'} <strong>0111</strong> (7)</div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                • {bilingualMode === 'en' ? 'Binary code:' : 'Mã nhị phân:'} <strong>01000111</strong>
              </div>
            </div>

            {/* Char K */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900 space-y-1">
              <div className="font-black text-sm text-indigo-600">
                {bilingualMode === 'en' ? "Character 'K'" : "Kí tự 'K'"}
              </div>
              <div>• {bilingualMode === 'en' ? 'Decimal Ordinal:' : 'Số thứ tự (Thập phân):'} <strong>75</strong></div>
              <div>• {bilingualMode === 'en' ? 'Row index:' : 'Chỉ số hàng:'} <strong>0100</strong> (4)</div>
              <div>• {bilingualMode === 'en' ? 'Col index:' : 'Chỉ số cột:'} <strong>1011</strong> (11)</div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                • {bilingualMode === 'en' ? 'Binary code:' : 'Mã nhị phân:'} <strong>01001011</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Step Nav Card */}
      <div className="p-4 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
        <div>
          <div className="text-xs text-indigo-700 dark:text-indigo-400 font-bold uppercase">
            {bilingualMode === 'en' ? 'Next: Section 2b' : 'Tiếp theo: Mục 2b'}
          </div>
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? 'Unicode Standard & Vietnamese in UTF-8 (Textbook Pages 17–18)'
              : 'Bảng mã Unicode & Tiếng Việt trong UTF-8 (Trang 17 – 18 SGK)'}
          </h4>
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
        >
          <span>{bilingualMode === 'en' ? 'Proceed to 2b' : 'Sang Mục 2b'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
