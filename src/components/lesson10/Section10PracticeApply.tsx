import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Sparkles,
  BookOpen,
  Share2,
  Terminal,
  Layers,
  RotateCcw,
  Check,
  Languages,
  Mic,
  Video,
  FileSpreadsheet,
  Globe2,
  ArrowLeft
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section10PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isAllSectionsComplete,
    completedSections,
    setOriginalPageTarget,
    prevPage
  } = useBook();

  // Accordion state for Practice & Application items
  const [showPractice1, setShowPractice1] = useState(false);
  const [showPractice2, setShowPractice2] = useState(false);
  const [showPractice3, setShowPractice3] = useState(false);
  const [showApply1, setShowApply1] = useState(false);
  const [showApply2, setShowApply2] = useState(false);

  // Interactive self-check mini quiz
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const sectionSpeechVi =
    'Phần 5: Luyện tập và Vận dụng Bài 10. Thực hành sử dụng Google Translate dịch văn bản hai chiều Việt - Anh, kiểm tra độ chính xác cú pháp ngữ pháp; luyện phát âm bằng công cụ nhận dạng giọng nói; truy cập kho học liệu số Quốc gia iGiaoDuc.vn để xem video bài giảng số hóa; dịch tệp văn bản và bảng tính Excel; khám phá các kho tri thức mở quốc tế. Hoàn thành bài kiểm tra 10 câu để nhận Giấy chứng nhận năng lực điện tử KNTT10-B10.';
  const sectionSpeechEn =
    'Section 5: Practice and Real-World Applications for Lesson 10. Practice two-way translation on Google Translate, analyze bilingual grammatical fidelity, evaluate voice pronunciation recognition, explore televised e-lectures on the iGiaoDuc national repository, translate spreadsheet documents, and leverage global OER repositories. Complete the 10-question evaluation to unlock certificate KNTT10-B10.';

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

  const isEligibleForCert =
    isAllSectionsComplete && certificate && certificate.score >= 8;

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-teal-700 via-cyan-800 to-indigo-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 text-teal-100 text-xs font-semibold backdrop-blur-sm mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>
                <BilingualText
                  vi="Tổng kết, Thực hành & Cấp chứng chỉ"
                  en="Summary, Practice & Certification"
                />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="5. Luyện tập & Vận dụng thực tế"
                en="5. Practice Exercises & Real-World Application"
              />
            </h2>
            <p className="text-teal-100 text-sm md:text-base mt-1 max-w-2xl">
              <BilingualText
                vi="Củng cố năng lực khai thác công cụ dịch thuật số và kho học liệu mở trên Internet theo hướng dẫn SGK Tin học 10 trang 54."
                en="Consolidate competencies in utilizing digital machine translation tools and open courseware repositories per textbook page 54."
              />
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOriginalPageTarget(54)}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl text-xs font-medium text-white transition flex items-center gap-1.5 backdrop-blur-sm shadow-sm"
              title="Xem trang SGK gốc 54"
            >
              <BookOpen className="w-4 h-4 text-teal-200" />
              <span>SGK Tr. 54</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Practice Exercises Section (SGK Trang 54) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <Terminal className="w-5 h-5 text-teal-600" />
          <h3>
            <BilingualText
              vi="Bài tập Luyện tập (Trang 54 SGK)"
              en="Practice Exercises (Textbook Page 54)"
            />
          </h3>
        </div>

        {/* Practice 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition">
          <button
            onClick={() => setShowPractice1(!showPractice1)}
            className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600 shrink-0 font-bold text-sm">
                1
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm md:text-base">
                  <BilingualText
                    vi="Luyện tập 1: Dịch đoạn văn bản ngắn hai chiều (Việt - Anh) và nhận xét độ chính xác"
                    en="Practice 1: Two-way translation of a short paragraph (Vi-En) & accuracy assessment"
                  />
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  <BilingualText
                    vi="Đoạn văn mẫu về công nghệ mạng và máy tính để kiểm tra khả năng chuyển ngữ"
                    en="Sample text on network technology to test semantic precision and context"
                  />
                </p>
              </div>
            </div>
            {showPractice1 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showPractice1 && (
            <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs md:text-sm">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="font-semibold text-teal-800">
                  <BilingualText vi="Đoạn văn bản mẫu thực hành:" en="Sample Practice Text:" />
                </div>
                <div className="p-3 bg-teal-50/50 rounded-lg text-slate-800 border-l-4 border-teal-500 italic">
                  &ldquo;Mạng máy tính giúp kết nối các thiết bị để chia sẻ tài nguyên và dữ liệu. Internet là mạng toàn cầu mang lại nguồn tri thức khổng lồ cho việc học tập.&rdquo;
                </div>
                <div className="font-semibold text-slate-700">
                  <BilingualText vi="Bản dịch tiếng Anh tương ứng từ Google Translate:" en="Corresponding English Output from Google Translate:" />
                </div>
                <div className="p-3 bg-indigo-50/50 rounded-lg text-indigo-900 border-l-4 border-indigo-500 font-mono text-xs">
                  &ldquo;Computer networks help connect devices to share resources and data. The Internet is a global network that provides a huge source of knowledge for learning.&rdquo;
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-xs uppercase tracking-wider text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <BilingualText vi="Nhận xét chuyên môn về độ chính xác:" en="Expert Accuracy Review:" />
                </div>
                <p className="leading-relaxed">
                  <BilingualText
                    vi="• Ngữ pháp & Cấu trúc: Bản dịch chuẩn xác về thì hiện tại đơn, đúng trật tự từ bổ nghĩa trong tiếng Anh (computer networks, global network)."
                    en="• Grammar & Syntax: Accurate simple present tense usage and appropriate modifier placement (computer networks, global network)."
                  />
                </p>
                <p className="leading-relaxed">
                  <BilingualText
                    vi="• Thuật ngữ chuyên ngành: Các thuật ngữ tin học 'chia sẻ tài nguyên' (share resources), 'dữ liệu' (data) và 'mạng toàn cầu' (global network) được dịch hoàn hảo."
                    en="• Technical Terminology: Informatics terms such as 'share resources', 'data', and 'global network' are translated flawlessly."
                  />
                </p>
                <p className="leading-relaxed">
                  <BilingualText
                    vi="• Lưu ý khi dịch ngược lại: Câu giữ được 98% ý nghĩa gốc, chứng minh mạng nơ-ron Google Translate hiện nay rất thông minh đối với câu ngắn và trung bình."
                    en="• Round-trip Note: Retains 98% semantic fidelity upon reverse translation, verifying modern neural translation strength on standard declarative syntax."
                  />
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Practice 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition">
          <button
            onClick={() => setShowPractice2(!showPractice2)}
            className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600 shrink-0 font-bold text-sm">
                2
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm md:text-base">
                  <BilingualText
                    vi="Luyện tập 2: Luyện phát âm bằng giọng nói và kiểm tra phản hồi từ micro"
                    en="Practice 2: Spoken voice pronunciation training & microphone recognition check"
                  />
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  <BilingualText
                    vi="Cách đọc từ vựng tiếng Anh mới học vào microphone để máy tính phân tích nhận diện"
                    en="Speaking novel vocabulary into the microphone to verify speech-to-text accuracy"
                  />
                </p>
              </div>
            </div>
            {showPractice2 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showPractice2 && (
            <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs md:text-sm">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="font-semibold text-slate-800">
                  <BilingualText vi="Quy trình thực hiện chuẩn 4 bước:" en="Standard 4-Step Operational Flow:" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-teal-700">Bước 1:</strong> Chọn ngôn ngữ nguồn là{' '}
                    <span className="font-bold text-indigo-600">English</span> và ngôn ngữ đích là{' '}
                    <span className="font-bold text-emerald-600">Tiếng Việt</span>.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-teal-700">Bước 2:</strong> Nhấp vào biểu tượng Micro (hình chiếc mic đổi sang màu xanh dương ghi âm).
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-teal-700">Bước 3:</strong> Phát âm to, rõ ràng từ cần kiểm tra (ví dụ: <span className="font-mono font-bold text-purple-700">&quot;Artificial Intelligence&quot;</span>).
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <strong className="text-teal-700">Bước 4:</strong> Nếu màn hình hiện đúng từ đó và dịch sang &quot;Trí tuệ nhân tạo&quot;, phát âm của em đạt chuẩn!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Practice 3 */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition">
          <button
            onClick={() => setShowPractice3(!showPractice3)}
            className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-600 shrink-0 font-bold text-sm">
                3
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm md:text-base">
                  <BilingualText
                    vi="Luyện tập 3: Khai thác kho học liệu iGiaoDuc.vn để xem bài giảng Tin học 10"
                    en="Practice 3: Exploring iGiaoDuc.vn repository to stream Grade 10 Informatics lectures"
                  />
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  <BilingualText
                    vi="Tìm kiếm, chọn lọc bài giảng truyền hình và e-learning trên kho dữ liệu của Bộ GD&ĐT"
                    en="Searching and filtering televised lessons and e-learning resources from MOET"
                  />
                </p>
              </div>
            </div>
            {showPractice3 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showPractice3 && (
            <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-4 text-xs md:text-sm">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div className="font-semibold text-slate-800">
                  <BilingualText vi="Đường dẫn truy cập và chỉ mục thực tế:" en="Direct Navigation & Curricular Path:" />
                </div>
                <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-teal-900 text-xs font-mono space-y-1">
                  <div>🌐 Trang chủ: https://igiaoduc.vn</div>
                  <div>📁 Phân hệ: Bài giảng điện tử ➔ Khối 10 ➔ Môn Tin học</div>
                  <div>🎬 Nội dung tiêu biểu: Bài giảng Chủ đề 2 &quot;Mạng máy tính và Internet&quot; (VTV7 phối hợp sản xuất)</div>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  <BilingualText
                    vi="Học sinh có thể xem lại video bài giảng bất cứ lúc nào, làm bài tập trắc nghiệm tự kiểm tra sau mỗi bài và tải về tệp slide tham khảo phục vụ thuyết trình."
                    en="Students can re-watch lectures at any time, take interactive post-lesson quizzes, and download presentation decks for collaborative study."
                  />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real-World Applications Section (SGK Trang 54) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h3>
            <BilingualText
              vi="Vận dụng thực tế (Trang 54 SGK)"
              en="Real-World Application (Textbook Page 54)"
            />
          </h3>
        </div>

        {/* Apply 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition">
          <button
            onClick={() => setShowApply1(!showApply1)}
            className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0 font-bold text-sm">
                VD 1
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm md:text-base">
                  <BilingualText
                    vi="Vận dụng 1: Dịch toàn bộ tệp tài liệu Word (.docx) hoặc bảng tính (.xlsx)"
                    en="Application 1: Translating whole Word (.docx) or Excel (.xlsx) documents"
                  />
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  <BilingualText
                    vi="Sử dụng nút 'Tài liệu' để chuyển ngữ bảng biểu kỹ thuật mà không làm mất cấu trúc hàng cột"
                    en="Utilizing the 'Documents' tab to translate tabular sheets without breaking cell layouts"
                  />
                </p>
              </div>
            </div>
            {showApply1 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showApply1 && (
            <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs md:text-sm">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="font-semibold text-slate-800">
                  <BilingualText vi="Lợi ích vượt trội của việc dịch nguyên tệp:" en="Key Benefits of Full-Document Translation:" />
                </div>
                <ul className="space-y-1.5 text-slate-600 text-xs">
                  <li>• Không mất công sao chép từng ô bảng tính thủ công.</li>
                  <li>• Giữ nguyên định dạng màu sắc, đường viền bảng và công thức số học.</li>
                  <li>• Hỗ trợ dung lượng tệp lớn lên đến 10 MB và 300 trang tài liệu.</li>
                  <li>• Kết quả xuất ra có thể tải về ngay dưới dạng tệp đã dịch hoàn chỉnh.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Apply 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden transition">
          <button
            onClick={() => setShowApply2(!showApply2)}
            className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 shrink-0 font-bold text-sm">
                VD 2
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm md:text-base">
                  <BilingualText
                    vi="Vận dụng 2: Khám phá thêm kho học liệu mở ViOLET, Khan Academy, MIT OCW"
                    en="Application 2: Discovering additional open courseware: ViOLET, Khan Academy, MIT OCW"
                  />
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  <BilingualText
                    vi="Xây dựng thói quen tự học suốt đời (Lifelong Learning) từ tài nguyên mở của nhân loại"
                    en="Fostering lifelong learning habits through humankind’s open educational commons"
                  />
                </p>
              </div>
            </div>
            {showApply2 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showApply2 && (
            <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs md:text-sm">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                <div className="font-semibold text-slate-800">
                  <BilingualText vi="Lợi ích đối với học sinh Trung học phổ thông:" en="Key Values for High School Students:" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-teal-50/50 rounded-xl border border-teal-100">
                    <div className="font-bold text-teal-800 mb-1">Tự chủ tốc độ học</div>
                    <p className="text-slate-600">Có thể tạm dừng, xem lại nhiều lần những phần kiến thức khó hiểu mà trên lớp chưa nắm kịp.</p>
                  </div>
                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                    <div className="font-bold text-indigo-800 mb-1">Chuẩn quốc tế</div>
                    <p className="text-slate-600">Tiếp cận giáo trình và bài tập thực tế từ các giáo sư đại học hàng đầu như MIT, Harvard.</p>
                  </div>
                  <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                    <div className="font-bold text-amber-800 mb-1">Tiết kiệm 100%</div>
                    <p className="text-slate-600">Không phải tốn tiền mua thêm tài liệu photo hay các gói học trực tuyến thương mại đắt đỏ.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Quick Concept Check */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-white">
              <BilingualText
                vi="Câu hỏi củng cố nhanh trước khi thi"
                en="Pre-Certification Quick Mastery Check"
              />
            </h4>
            <p className="text-xs text-slate-300">
              <BilingualText
                vi="Khi sử dụng Google Translate, điều gì sau đây CẦN LƯU Ý NHẤT về bản dịch kết quả?"
                en="When using Google Translate, what is the MOST CRITICAL caveat regarding generated output?"
              />
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {[
            { id: 0, textVi: 'A. Bản dịch máy luôn chính xác 100% và có thể dùng nộp bài thi ngay.', textEn: 'A. Machine translation is 100% accurate and can be submitted without proofreading.' },
            { id: 1, textVi: 'B. Bản dịch máy có thể chưa trau chuốt, còn nhầm lẫn ngữ cảnh nên cần người đọc rà soát, hoàn thiện.', textEn: 'B. Machine translations may lack nuance and contain context errors, requiring human review.' },
            { id: 2, textVi: 'C. Google Translate chỉ dịch được văn bản gõ phím, không thể dịch tệp Word hay giọng nói.', textEn: 'C. Google Translate only translates typed text and cannot process voice or files.' },
            { id: 3, textVi: 'D. Mọi tài liệu dịch trên Google Translate đều tự động bị xóa sau 5 phút.', textEn: 'D. All translated documents on Google Translate automatically vanish after 5 minutes.' }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setUserSelectedOption(opt.id);
                setIsAnswerSubmitted(true);
              }}
              className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm transition flex items-center justify-between ${
                userSelectedOption === opt.id
                  ? opt.id === 1
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                    : 'bg-rose-500/20 border-rose-400 text-rose-200'
                  : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <span>
                <BilingualText vi={opt.textVi} en={opt.textEn} />
              </span>
              {isAnswerSubmitted && opt.id === 1 && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
            </button>
          ))}
        </div>

        {isAnswerSubmitted && userSelectedOption === 1 && (
          <div className="p-3 rounded-xl text-xs flex items-center gap-2 bg-emerald-950/60 text-emerald-300 border border-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <BilingualText
                vi="SGK trang 52 lưu ý: 'Bản dịch có thể chưa thực sự trau chuốt và vẫn còn có thể nhầm nhưng có thể dùng để hỗ trợ hoàn thiện bản dịch'."
                en="Textbook page 52 notes: 'Translations may not yet be truly polished and may still have inaccuracies, but can serve as valuable assistance to refine the final output.'"
              />
            </span>
          </div>
        )}
      </div>



      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={10} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous Section' : 'Quay lại mục trước'}</span>
        </button>
      </div>
    </div>
  );
};
