import React, { useState } from 'react';
import {
  Award,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  CreditCard,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Type,
  FileText,
  Check,
  X
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';
import { LICENSE_MATCH_ITEMS } from '../../data/lesson3Data';

export const Section3PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
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

  // Practice 1: License matching state
  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const [matchSubmitted, setMatchSubmitted] = useState<boolean>(false);
  const [showPractice1Guide, setShowPractice1Guide] = useState<boolean>(false);

  // Practice 2: Unicode MCQ State
  const [selectedPractice2Opt, setSelectedPractice2Opt] = useState<string | null>(null);
  const [showPractice2Explanation, setShowPractice2Explanation] = useState<boolean>(false);

  // Application 1: VSCII collapse state
  const [showApp1Answer, setShowApp1Answer] = useState<boolean>(false);

  // Application 2: Font Lab State
  const [fontLabText, setFontLabText] = useState<string>(
    'Sách giáo khoa Tin học 10: Kết nối tri thức với cuộc sống'
  );
  const [selectedFont, setSelectedFont] = useState<string>('Times New Roman');

  const speechText =
    "Practice and Application for Lesson 3. Practice 1: Matching driver license fields with appropriate data types. Practice 2: Explaining why the Unicode standard was essential. Application 1: Researching Vietnam's historical VSCII encoding standard TCVN 5712:1993. Application 2: Testing Unicode-compatible fonts for Vietnamese rendering including Times New Roman, Arial, Roboto, and Tahoma.";

  const availableTypes = [
    { vi: 'Số', en: 'Number' },
    { vi: 'Văn bản', en: 'Text' },
    { vi: 'Hình ảnh', en: 'Image' },
    { vi: 'Âm thanh', en: 'Sound' }
  ] as const;

  const fontOptions = [
    {
      name: 'Times New Roman',
      fontClass: 'font-serif',
      descVi: 'Phông có chân truyền thống, hỗ trợ chuẩn Unicode',
      descEn: 'Traditional serif typeface fully conforming to Unicode'
    },
    {
      name: 'Arial',
      fontClass: 'font-sans',
      descVi: 'Phông không chân thông dụng toàn cầu',
      descEn: 'Ubiquitous sans-serif font across worldwide systems'
    },
    {
      name: 'Roboto',
      fontClass: 'font-sans',
      descVi: 'Phông hiện đại của Google, hiển thị tiếng Việt xuất sắc',
      descEn: "Google's modern geometric neo-grotesque with excellent Vietnamese accents"
    },
    {
      name: 'Courier New',
      fontClass: 'font-mono',
      descVi: 'Phông đơn cách (monospace) dùng trong lập trình',
      descEn: 'Monospace font tailored for code blocks and programming terminals'
    }
  ];

  const handleSelectMatch = (fieldId: string, type: string) => {
    setUserMatches(prev => ({ ...prev, [fieldId]: type }));
  };

  const handleCheckMatches = () => {
    setMatchSubmitted(true);
  };

  const handleResetMatches = () => {
    setUserMatches({});
    setMatchSubmitted(false);
  };

  const countCorrectMatches = LICENSE_MATCH_ITEMS.filter(
    item => userMatches[item.id] === item.correctType
  ).length;

  return (
    <div className="space-y-6">
      {/* Teacher Prompts Widget for Lesson 3 Section 5 */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={3} />

      {/* Header section with SGK Page Badge and English TTS */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 px-2.5 py-0.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
              {bilingualMode === 'en' ? 'Practice & Application • Page 19 SGK' : 'Luyện tập & Vận dụng • Trang 19 SGK'}
            </span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(19);
                setShowOriginalModal(true);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{bilingualMode === 'en' ? 'View scan page 19' : 'Xem scan trang 19'}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? 'Practice & Application (Informatics 10 Textbook)'
              : 'Luyện tập & Vận dụng (Trang 19 SGK Tin học 10)'}
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
            title={bilingualMode === 'en' ? 'Listen to English pronunciation' : 'Nghe phát âm chuẩn tiếng Anh bài tập luyện tập và vận dụng'}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpeaking ? 'STOP' : 'EN'}</span>
          </button>
        )}
      </div>

      {/* PRACTICE 1: Driver License Matching Exercise (Luyện tập 1 Trang 19) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-indigo-600 text-white">
              <CreditCard className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Practice 1: Classifying Data Types on Driver’s License'
                : 'Luyện tập 1: Phân loại kiểu dữ liệu trên Giấy phép lái xe'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            {bilingualMode === 'en' ? 'Textbook Page 19' : 'Trang 19 SGK'}
          </span>
        </div>

        <BilingualText
          vi="Giấy phép lái xe có các thông tin nêu ở cột bên trái của bảng sau. Hãy ghép mỗi thông tin ở cột bên trái với kiểu dữ liệu thích hợp ở cột bên phải (Số, Văn bản, Hình ảnh, Âm thanh)."
          en="A driver's license displays the information in the left column. Match each field on the left with its suitable data type on the right (Number, Text, Image, Sound)."
        />

        {/* Matching Table UI */}
        <div className="space-y-3 pt-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3 font-bold rounded-l-xl">
                    {bilingualMode === 'en' ? "Driver's License Field" : 'Thông tin trên GPLX'}
                  </th>
                  <th className="p-3 font-bold">
                    {bilingualMode === 'en' ? 'Sample Value' : 'Giá trị ví dụ'}
                  </th>
                  <th className="p-3 font-bold text-center">
                    {bilingualMode === 'en' ? 'Select Data Type' : 'Chọn kiểu dữ liệu'}
                  </th>
                  <th className="p-3 font-bold rounded-r-xl text-center">
                    {bilingualMode === 'en' ? 'Result' : 'Kết quả'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {LICENSE_MATCH_ITEMS.map((item) => {
                  const currentSelection = userMatches[item.id];
                  const isCorrect = currentSelection === item.correctType;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-extrabold text-slate-900 dark:text-white">
                        {bilingualMode === 'en' ? item.fieldEn : item.fieldVi}
                        <div className="text-[11px] text-slate-400 font-normal italic">
                          {bilingualMode === 'en' ? item.fieldVi : item.fieldEn}
                        </div>
                      </td>

                      <td className="p-3 font-mono text-xs text-indigo-700 dark:text-indigo-400 font-semibold">
                        {item.exampleValue}
                      </td>

                      <td className="p-3 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-1.5">
                          {availableTypes.map((t) => (
                            <button
                              key={t.vi}
                              type="button"
                              onClick={() => handleSelectMatch(item.id, t.vi)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                currentSelection === t.vi
                                  ? 'bg-indigo-600 text-white shadow-2xs'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                              }`}
                            >
                              {bilingualMode === 'en' ? t.en : t.vi}
                            </button>
                          ))}
                        </div>
                      </td>

                      <td className="p-3 text-center font-bold">
                        {matchSubmitted ? (
                          isCorrect ? (
                            <span className="text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1 text-xs">
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>{bilingualMode === 'en' ? 'Correct' : 'Đúng'}</span>
                            </span>
                          ) : (
                            <span className="text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1 text-xs">
                              <X className="w-4 h-4 stroke-[3]" />
                              <span>{bilingualMode === 'en' ? 'Incorrect' : 'Sai'}</span>
                            </span>
                          )
                        ) : (
                          <span className="text-slate-400 text-xs italic">
                            {bilingualMode === 'en' ? 'Not checked' : 'Chưa chấm'}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCheckMatches}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{bilingualMode === 'en' ? 'Check Answers' : 'Kiểm tra đáp án'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetMatches}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Reset' : 'Làm lại'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowPractice1Guide(!showPractice1Guide)}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1 hover:bg-indigo-100 cursor-pointer"
            >
              <span>
                {showPractice1Guide
                  ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Ẩn phân tích SGK')
                  : (bilingualMode === 'en' ? 'Show SGK Analysis' : 'Xem giải thích chuẩn SGK')}
              </span>
              {showPractice1Guide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {matchSubmitted && (
            <div className={`p-4 rounded-2xl text-xs space-y-1.5 ${
              countCorrectMatches === LICENSE_MATCH_ITEMS.length
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-950 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-amber-950 dark:text-amber-200'
            }`}>
              <div className="font-black text-sm">
                {bilingualMode === 'en'
                  ? `Matching Result: ${countCorrectMatches} / ${LICENSE_MATCH_ITEMS.length} correct (${Math.round((countCorrectMatches / LICENSE_MATCH_ITEMS.length) * 100)}%)`
                  : `Kết quả ghép nối: ${countCorrectMatches} / ${LICENSE_MATCH_ITEMS.length} câu đúng (${Math.round((countCorrectMatches / LICENSE_MATCH_ITEMS.length) * 100)}%)`}
              </div>
              <p>
                {countCorrectMatches === LICENSE_MATCH_ITEMS.length
                  ? (bilingualMode === 'en'
                      ? "🎉 Excellent! You have accurately classified all information fields on the driver's license."
                      : '🎉 Tuyệt vời! Bạn đã phân loại chính xác toàn bộ các trường thông tin trên Giấy phép lái xe.')
                  : (bilingualMode === 'en'
                      ? "💡 Note: Even though the driver's license number consists of digits, it is not used in arithmetic calculations and therefore belongs to the Text data type!"
                      : '💡 Lưu ý: Số GPLX dù gồm các chữ số nhưng không dùng để tính toán cộng trừ nên được phân loại vào kiểu Văn bản!')}
              </p>
            </div>
          )}

          {showPractice1Guide && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              {bilingualMode === 'en' ? (
                <>
                  <div className="font-bold text-slate-900 dark:text-white">Textbook standard classification:</div>
                  <div>• <strong>Photo:</strong> <strong>Image</strong> data type (Multimedia portrait identification).</div>
                  <div>• <strong>License No.:</strong> <strong>Text</strong> data type (Numeric identifier with no arithmetic operations, preserving leading zeros).</div>
                  <div>• <strong>Full Name:</strong> <strong>Text</strong> data type (Alphabetical character string).</div>
                  <div>• <strong>Date of Birth:</strong> <strong>Text</strong> data type (Or dedicated date representation stored as formatted string).</div>
                  <div>• <strong>Nationality, Residence:</strong> <strong>Text</strong> data type.</div>
                </>
              ) : (
                <>
                  <div className="font-bold text-slate-900 dark:text-white">Bảng phân loại chuẩn theo SGK:</div>
                  <div>• <strong>Ảnh:</strong> Kiểu <strong>Hình ảnh</strong> (Dữ liệu đa phương tiện nhận dạng chân dung).</div>
                  <div>• <strong>Số GPLX:</strong> Kiểu <strong>Văn bản</strong> (Mã định danh gồm các chữ số, không thực hiện phép tính số học, cần giữ số 0 ở đầu).</div>
                  <div>• <strong>Họ tên:</strong> Kiểu <strong>Văn bản</strong> (Dãy ký tự chữ cái).</div>
                  <div>• <strong>Ngày sinh:</strong> Kiểu <strong>Văn bản</strong> (Hoặc kiểu ngày tháng chuyên biệt lưu dưới dạng chuỗi).</div>
                  <div>• <strong>Quốc tịch, Nơi cư trú:</strong> Kiểu <strong>Văn bản</strong>.</div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* PRACTICE 2: Why Unicode was developed (Luyện tập 2 Trang 19) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <span className="p-1.5 rounded-xl bg-indigo-600 text-white">
            <HelpCircle className="w-4 h-4" />
          </span>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en' ? 'Practice 2: Why Was the Unicode Standard Established?' : 'Luyện tập 2: Vì sao cần xây dựng bảng mã Unicode?'}
          </h3>
        </div>

        <div className="space-y-3">
          <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white leading-relaxed">
            {bilingualMode === 'en'
              ? 'Which answer is correct for the question "Why was the Unicode standard established?"'
              : 'Câu trả lời nào đúng cho câu hỏi "Tại sao cần xây dựng bảng mã Unicode?"'}
          </div>

          <div className="space-y-2">
            {[
              {
                key: 'A',
                text: bilingualMode === 'en'
                  ? 'A. To ensure equality for all nations in computer applications.'
                  : 'A. Để đảm bảo bình đẳng cho mọi quốc gia trong ứng dụng tin học.',
                isCorrect: false
              },
              {
                key: 'B',
                text: bilingualMode === 'en'
                  ? 'B. ASCII encodes each character by 1 byte. As storage devices become increasingly cheap, 1-byte encoding sets are no longer needed.'
                  : 'B. Bảng mã ASCII mã hoá mỗi kí tự bởi 1 byte. Giá thành thiết bị lưu trữ ngày càng rẻ nên không cần phải sử dụng các bộ kí tự mã hoá bởi 1 byte.',
                isCorrect: false
              },
              {
                key: 'C',
                text: bilingualMode === 'en'
                  ? 'C. Use a unified character set for all nations, solving character space shortages for various countries and fulfilling the requirement to display multiple languages concurrently within the same application.'
                  : 'C. Dùng một bảng mã chung cho mọi quốc gia, giải quyết vấn đề thiếu vị trí cho bộ kí tự của một số quốc gia, đáp ứng nhu cầu dùng nhiều ngôn ngữ đồng thời trong cùng một ứng dụng.',
                isCorrect: true
              },
              {
                key: 'D',
                text: bilingualMode === 'en'
                  ? 'D. Exclusively used for nations employing ideographic scripts.'
                  : 'D. Dùng cho các quốc gia sử dụng chữ tượng hình.',
                isCorrect: false
              }
            ].map((opt) => {
              const isSelected = selectedPractice2Opt === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    setSelectedPractice2Opt(opt.key);
                    setShowPractice2Explanation(true);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                        : 'bg-rose-500 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {showPractice2Explanation && selectedPractice2Opt === 'C' && (
            <div className="p-4 rounded-2xl text-xs space-y-1.5 leading-relaxed bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 text-emerald-950 dark:text-emerald-200 animate-in fade-in">
              <div className="font-black text-sm">
                <BilingualText vi="✓ Lời giải chuẩn SGK (Đáp án C):" en="✓ Official Textbook Explanation (Option C):" />
              </div>
              <p>
                <BilingualText
                  vi="Bảng mã ASCII (kể cả mở rộng) chỉ có 256 vị trí, không đủ chỗ cho các ngôn ngữ có hàng nghìn ký tự (như Trung, Nhật) và gây thiếu nhất quán giữa các bảng mã địa phương. Unicode ra đời để hợp nhất một bảng mã chung toàn cầu, cho phép nhiều ngôn ngữ cùng hiển thị song song trong một phần mềm."
                  en="The ASCII code table (even extended) only has 256 code points, inadequate for languages with thousands of glyphs and causing fragmentation across national character sets. Unicode was established as a unified global standard enabling multilingual rendering simultaneously within software."
                />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* APPLICATION 1: VSCII / TCVN 5712:1993 Standard */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-purple-600 text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Application 1: Researching the VSCII Encoding (TCVN 5712:1993)'
                : 'Vận dụng 1: Tìm hiểu bảng mã VSCII (TCVN 5712:1993)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowApp1Answer(!showApp1Answer)}
            className="px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center gap-1 hover:bg-purple-100 cursor-pointer"
          >
            <span>
              {showApp1Answer
                ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Ẩn phân tích')
                : (bilingualMode === 'en' ? 'View Internet Findings' : 'Xem kết quả tìm hiểu Internet')}
            </span>
            {showApp1Answer ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        <BilingualText
          vi="Dựa trên bảng mã ASCII, Việt Nam xây dựng bảng mã VSCII (Vietnamese Standard Code for Information Interchange), còn gọi là TCVN 5712:1993. Hãy tìm hiểu bảng mã này trên Internet theo những gợi ý sau: Bảng mã có đủ cho tất cả các kí tự tiếng Việt không? Bảng mã có bảo toàn bảng mã ASCII 7 bit không?"
          en="Based on ASCII, Vietnam constructed the VSCII encoding (TCVN 5712:1993). Research this table: Does it accommodate all Vietnamese characters? Does it preserve the standard 7-bit ASCII code points?"
        />

        {showApp1Answer && (
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs space-y-2 text-purple-950 dark:text-purple-200 leading-relaxed">
            {bilingualMode === 'en' ? (
              <>
                <div className="font-black text-sm">Expert Research Findings:</div>
                <div>
                  1. <strong>Does the table accommodate all Vietnamese characters?</strong>
                  <br />→ The 1-byte VSCII (TCVN 5712:1993) standard <strong>does not accommodate all accented uppercase letters completely</strong>. Restricted by 256 8-bit positions, designers had to compromise certain uppercase accented vowels or rely on composite dual-code mechanics.
                </div>
                <div>
                  2. <strong>Does it preserve the standard 7-bit ASCII code points?</strong>
                  <br />→ <strong>Not completely preserved!</strong> To pack Vietnamese characters, VSCII-1 was forced to overwrite control character slots (codes 0 to 31) of standard 7-bit ASCII. This caused severe printer conflicts and network transmission drops when Vietnamese letters were misinterpreted as hardware commands.
                </div>
                <div>
                  💡 <strong>Historical significance:</strong> These severe limitations in VSCII and local fonts (TCVN3, VNI) drove Vietnam to adopt TCVN 6909:2001 and transition universally to <strong>Unicode UTF-8</strong>.
                </div>
              </>
            ) : (
              <>
                <div className="font-black text-sm">Kết quả nghiên cứu chuẩn chuyên gia:</div>
                <div>
                  1. <strong>Bảng mã có đủ cho tất cả kí tự tiếng Việt không?</strong>
                  <br />→ Bảng mã VSCII (TCVN 5712:1993) phiên bản 1 byte <strong>không chứa đủ trọn vẹn</strong> tất cả các ký tự chữ hoa tiếng Việt có dấu. Do bị giới hạn trong 256 vị trí 8-bit, người thiết kế phải hy sinh một số ký tự chữ in hoa có dấu hoặc phải sử dụng cơ chế tổ hợp (mã kép).
                </div>
                <div>
                  2. <strong>Bảng mã có bảo toàn bảng mã ASCII 7 bit không?</strong>
                  <br />→ <strong>Không bảo toàn hoàn toàn!</strong> Để nhét thêm các ký tự tiếng Việt, VSCII-1 đã buộc phải chiếm dụng một số mã điều khiển (mã từ 0 đến 31) của ASCII 7-bit chuẩn. Điều này dẫn tới hiện tượng xung đột: khi in ấn hoặc truyền tin qua mạng, các ký tự tiếng Việt bị hiểu nhầm là lệnh điều khiển máy in hoặc ngắt kết nối.
                </div>
                <div>
                  💡 <strong>Ý nghĩa lịch sử:</strong> Chính những bất cập của VSCII và các bảng mã cục bộ (TCVN3, VNI) đã thúc đẩy Việt Nam ban hành TCVN 6909:2001 và chính thức chuyển đổi sang <strong>Unicode UTF-8</strong>.
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* APPLICATION 2: Vietnamese Unicode Font Testing Lab */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-indigo-600 text-white">
              <Type className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Application 2: Vietnamese Font Testing Lab (Font Lab)'
                : 'Vận dụng 2: Phòng thử nghiệm phông chữ tiếng Việt (Font Lab)'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            {bilingualMode === 'en' ? 'Textbook Page 19' : 'Trang 19 SGK'}
          </span>
        </div>

        <BilingualText
          vi="Phông chữ là hình ảnh của kí tự ứng với mã của kí tự. Không phải phông chữ nào cũng được thiết kế đầy đủ cho tiếng Việt. Hãy gõ một câu tiếng Việt và định dạng với các phông chữ khác nhau để tìm hiểu ngoài phông Times New Roman còn những phông nào đã thiết kế cho tiếng Việt Unicode."
          en="A font provides visual glyphs corresponding to character code points. Not every font includes a full set of Vietnamese glyphs. Type a Vietnamese sentence and format it with various typefaces to discover other Unicode-compatible fonts beyond Times New Roman."
        />

        {/* Font Lab Interactive Testing Area */}
        <div className="space-y-3 pt-1">
          {/* Input text */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500">
              {bilingualMode === 'en'
                ? 'Vietnamese test sentence for font rendering:'
                : 'Câu văn tiếng Việt thử nghiệm phông chữ:'}
            </label>
            <input
              type="text"
              value={fontLabText}
              onChange={(e) => setFontLabText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold focus:bg-white outline-none shadow-inner"
            />
          </div>

          {/* Font Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {fontOptions.map((f) => (
              <button
                key={f.name}
                type="button"
                onClick={() => setSelectedFont(f.name)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  selectedFont === f.name
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-black text-xs">{f.name}</div>
                <div className={`text-[10px] mt-0.5 opacity-80 ${f.fontClass}`}>
                  {bilingualMode === 'en' ? 'Accented Vietnamese' : 'Tiếng Việt có dấu'}
                </div>
              </button>
            ))}
          </div>

          {/* Preview Canvas */}
          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {bilingualMode === 'en' ? 'Rendered with typeface: ' : 'Hiển thị với phông: '}
              <strong>{selectedFont}</strong>
            </span>
            <div
              className={`text-lg sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed ${
                fontOptions.find(f => f.name === selectedFont)?.fontClass || 'font-sans'
              }`}
              style={{ fontFamily: selectedFont }}
            >
              "{fontLabText}"
            </div>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
              {bilingualMode === 'en'
                ? fontOptions.find(f => f.name === selectedFont)?.descEn
                : fontOptions.find(f => f.name === selectedFont)?.descVi}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};
