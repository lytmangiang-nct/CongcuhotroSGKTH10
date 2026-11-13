import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Sparkles,
  BookOpen,
  Share2,
  ShieldAlert,
  Terminal,
  Layers,
  Bug,
  RotateCcw
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section9PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    prevPage,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isAllSectionsComplete,
    completedSections,
    currentLesson,
    setOriginalPageTarget
  } = useBook();

  // Practice & Application Accordion Toggles
  const [showPractice1, setShowPractice1] = useState(false);
  const [showPractice2, setShowPractice2] = useState(false);
  const [showApply1, setShowApply1] = useState(false);
  const [showApply2, setShowApply2] = useState(false);

  const sectionSpeechVi =
    'Phần Luyện tập và Vận dụng Bài 9. Phân tích các nguy cơ mất an toàn khi tham gia mạng xã hội; nhận diện các trường hợp bị nhiễm mã độc và biện pháp phòng chống tương ứng; nghiên cứu sâu các hình thức tấn công từ chối dịch vụ DoS và các thảm họa sâu máy tính trong lịch sử như Stuxnet hay ILOVEYOU. Hãy làm bài kiểm tra 10 câu để nhận Giấy chứng nhận năng lực điện tử KNTT10-B9.';
  const sectionSpeechEn =
    'Section 5: Practice and Real-World Applications for Lesson 9. Analyze vulnerabilities on social networking platforms, map infection vectors to proactive countermeasures, investigate DoS attack types, and research landmark computer worms such as Stuxnet and ILOVEYOU. Complete the 10-question evaluation to unlock electronic certificate KNTT10-B9.';

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

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300">
            {bilingualMode === 'en'
              ? 'Practice & Application • Textbook Page 49'
              : 'Luyện tập & Vận dụng • SGK Trang 49'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            <BilingualText
              vi="LUYỆN TẬP, VẬN DỤNG & CẤP CHỨNG NHẬN BÀI 9"
              en="PRACTICE, APPLICATION & CERTIFICATE"
            />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <BilingualText
              vi="Củng cố năng lực an ninh mạng & Đánh giá trắc nghiệm 10 câu SGK"
              en="Consolidate cybersecurity competencies & 10-question SGK evaluation"
            />
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOriginalPageTarget(49)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
            <span>{bilingualMode === 'en' ? 'Textbook Page 49' : 'SGK Trang 49'}</span>
          </button>
        </div>
      </div>

      {/* Part 1: LUYỆN TẬP (SGK Trang 49) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-slate-100">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <span>{bilingualMode === 'en' ? 'PRACTICE EXERCISES (Textbook Page 49)' : 'LUYỆN TẬP (SGK Trang 49)'}</span>
        </div>

        {/* Practice 1 */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Câu 1: Em hãy kể ra các nguy cơ mất an toàn khi tham gia các mạng xã hội."
                en="Question 1: List the major cybersecurity risks when participating in social networks."
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPractice1(!showPractice1)}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 flex items-center gap-1 cursor-pointer"
            >
              <span>{showPractice1 ? (bilingualMode === 'en' ? 'Hide Answer' : 'Ẩn đáp án') : (bilingualMode === 'en' ? 'Show Official Answer' : 'Xem đáp án chuẩn')}</span>
              {showPractice1 ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {showPractice1 && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 animate-in fade-in">
              <div className="font-bold text-amber-900 dark:text-amber-300">
                {bilingualMode === 'en' ? 'Common cybersecurity risks on social networks:' : 'Các nguy cơ mất an toàn phổ biến trên mạng xã hội:'}
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <BilingualText
                    inline
                    vi="Lộ thông tin bí mật cá nhân: Đăng ảnh vé máy bay, căn cước công dân, địa chỉ nhà, trường học khiến kẻ xấu lợi dụng để mạo danh hoặc theo dõi."
                    en="Exposure of confidential personal data: Posting photos of airline tickets, ID cards, residential addresses, or school schedules enabling tracking or identity theft."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Bị lừa đảo mạo danh kết bạn: Kẻ xấu lập tài khoản clone mạo danh người thân để vay tiền hoặc gửi liên kết chứa mã độc."
                    en="Impersonation and phishing scams: Fraudsters create clone accounts pretending to be friends/family to solicit emergency funds or send infected links."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Tiếp xúc với tin giả, tin phản văn hóa: Các bài viết giật gân sai sự thật, video bạo lực gây lệch lạc nhận thức và hoang mang."
                    en="Exposure to fake news and toxic media: Sensationalist misinformation and violent content distorting perception and causing social anxiety."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Bắt nạt trên mạng (Cyberbullying): Bị bình luận lăng nhục, cô lập, vu khống làm ảnh hưởng nghiêm trọng tới tâm lý."
                    en="Cyberbullying and harassment: Humiliating comments, public shaming, ostracization, and slander inflicting severe emotional distress."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Nghiện mạng xã hội: Tốn thời gian lướt feed vô bổ, suy giảm thị lực, sa sút việc học tập và sức khỏe."
                    en="Social media addiction: Excessive doomscrolling leading to cognitive fatigue, vision strain, academic decline, and impaired wellness."
                  />
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Practice 2 */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Câu 2: Em hãy kể ra những trường hợp có thể bị nhiễm phần mềm độc hại và biện pháp phòng, chống tương ứng."
                en="Question 2: Describe scenarios where computers may be infected by malware and their corresponding preventive measures."
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPractice2(!showPractice2)}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 flex items-center gap-1 cursor-pointer"
            >
              <span>{showPractice2 ? (bilingualMode === 'en' ? 'Hide Answer' : 'Ẩn đáp án') : (bilingualMode === 'en' ? 'Show Official Answer' : 'Xem đáp án chuẩn')}</span>
              {showPractice2 ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {showPractice2 && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 animate-in fade-in">
              <div className="font-bold text-amber-900 dark:text-amber-300">
                {bilingualMode === 'en' ? 'Infection vectors and preventive countermeasures:' : 'Bảng đối chiếu trường hợp nhiễm & biện pháp phòng ngừa:'}
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    <BilingualText
                      vi="Trường hợp 1: Sao chép tệp từ USB hoặc thẻ nhớ lạ"
                      en="Scenario 1: Transferring files from unfamiliar USB flash drives or memory cards"
                    />
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    ➔ <strong>{bilingualMode === 'en' ? 'Countermeasure:' : 'Biện pháp:'}</strong>{' '}
                    <BilingualText
                      vi="Quét virus bằng phần mềm chống mã độc trước khi mở tệp; tắt tính năng tự chạy Autorun trên máy."
                      en="Scan removable media with antivirus software prior to opening; disable OS Autorun features."
                    />
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    <BilingualText
                      vi="Trường hợp 2: Tải phần mềm bẻ khóa (crack) hoặc game lậu trên mạng"
                      en="Scenario 2: Downloading cracked software, keygens, or pirated games from unofficial forums"
                    />
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    ➔ <strong>{bilingualMode === 'en' ? 'Countermeasure:' : 'Biện pháp:'}</strong>{' '}
                    <BilingualText
                      vi="Chỉ tải phần mềm từ trang web chính thức của nhà phát hành; không bao giờ tắt phần mềm diệt virus để cài phần mềm bẻ khóa."
                      en="Only download software from authorized publisher websites; never disable antivirus shields to bypass security checks."
                    />
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    <BilingualText
                      vi="Trường hợp 3: Bấm vào liên kết trong email hoặc tin nhắn lạ"
                      en="Scenario 3: Clicking on links or opening attachments from suspicious emails or unsolicited messages"
                    />
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    ➔ <strong>{bilingualMode === 'en' ? 'Countermeasure:' : 'Biện pháp:'}</strong>{' '}
                    <BilingualText
                      vi="Tuyệt đối không mở liên kết lạ; nếu là tin nhắn từ bạn bè yêu cầu chuyển tiền hoặc gửi file, hãy gọi điện thoại xác thực trực tiếp trước khi mở."
                      en="Never open untrusted links; if friends request wire transfers or send files, verify directly via a separate voice phone call first."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Part 2: VẬN DỤNG (SGK Trang 49) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-bold text-base text-slate-900 dark:text-slate-100">
          <Terminal className="w-5 h-5 text-cyan-600" />
          <span>{bilingualMode === 'en' ? 'APPLICATION TASKS (Textbook Page 49)' : 'VẬN DỤNG (SGK Trang 49)'}</span>
        </div>

        {/* Application 1 */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Câu 1: Em hãy tìm hiểu qua Internet các cách thức tấn công từ chối dịch vụ (DoS / DDoS)."
                en="Question 1: Research common methods of Denial of Service (DoS / DDoS) attacks over the Internet."
              />
            </div>
            <button
              type="button"
              onClick={() => setShowApply1(!showApply1)}
              className="text-xs font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 flex items-center gap-1 cursor-pointer"
            >
              <span>{showApply1 ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Ẩn phân tích') : (bilingualMode === 'en' ? 'Show Detailed Analysis' : 'Xem phân tích chi tiết')}</span>
              {showApply1 ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {showApply1 && (
            <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 animate-in fade-in">
              <div className="font-bold text-cyan-900 dark:text-cyan-300">
                {bilingualMode === 'en' ? 'Common DoS/DDoS attack vectors today:' : 'Các phương thức tấn công DoS/DDoS phổ biến hiện nay:'}
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <BilingualText
                    inline
                    vi="Tấn công tràn băng thông (Bandwidth Flooding): Kẻ tấn công gửi hàng triệu gói tin UDP hoặc ICMP làm tắc nghẽn hoàn toàn đường truyền mạng của máy chủ mục tiêu."
                    en="Bandwidth Flooding: Attackers generate massive floods of UDP or ICMP packets, completely saturating the target server's network pipeline."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Tấn công cạn kiệt tài nguyên máy chủ (SYN Flood / HTTP Flood): Gửi liên tiếp các yêu cầu kết nối ảo nhưng không hoàn thành bắt tay 3 bước TCP, khiến máy chủ cạn kiệt bộ nhớ RAM và CPU."
                    en="Server Resource Exhaustion (SYN / HTTP Floods): Transmitting continuous embryonic connection requests without finishing the TCP 3-way handshake, draining server RAM and CPU pools."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Mạng ma botnet phân tán (DDoS): Huy động hàng trăm nghìn thiết bị thông minh (camera IoT, router, máy tính cá nhân bị nhiễm mã độc) cùng lúc tấn công, khiến việc phân biệt lưu lượng thật và giả vô cùng khó khăn."
                    en="Distributed Botnets (DDoS): Marshaling hundreds of thousands of hijacked smart nodes (IoT webcams, compromised routers, zombie PCs) into synchronized barrages, making legitimate vs illegitimate traffic filtering difficult."
                  />
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Application 2 */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Câu 2: Em hãy tìm trên mạng thông tin về worm, kể một worm với tác hại của nó."
                en="Question 2: Research computer worms online and recount a specific worm and its destructive impact."
              />
            </div>
            <button
              type="button"
              onClick={() => setShowApply2(!showApply2)}
              className="text-xs font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 flex items-center gap-1 cursor-pointer"
            >
              <span>{showApply2 ? (bilingualMode === 'en' ? 'Hide Dossier' : 'Ẩn hồ sơ') : (bilingualMode === 'en' ? 'Show Stuxnet Dossier' : 'Xem hồ sơ sâu Stuxnet')}</span>
              {showApply2 ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {showApply2 && (
            <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 animate-in fade-in">
              <div className="font-bold text-cyan-900 dark:text-cyan-300">
                {bilingualMode === 'en' ? 'Case Study: The Stuxnet Super-Worm (2010):' : 'Hồ sơ siêu sâu máy tính Stuxnet (Năm 2010):'}
              </div>
              <p>
                <BilingualText
                  vi="Stuxnet được coi là vũ khí mạng đầu tiên trong lịch sử nhân loại. Khác với sâu thông thường chỉ phá hoại dữ liệu, Stuxnet nhắm vào các hệ thống điều khiển công nghiệp SCADA của hãng Siemens điều khiển các máy ly tâm làm giàu uranium tại nhà máy hạt nhân Natanz (Iran)."
                  en="Stuxnet is widely recognized as the world's first true cyberweapon. Unlike conventional worms targeting file systems, Stuxnet specifically weaponized industrial SCADA controllers by Siemens governing uranium enrichment centrifuges at the Natanz nuclear facility."
                />
              </p>
              <p>
                <BilingualText
                  vi="Sâu Stuxnet bí mật tăng tốc độ quay của máy ly tâm vượt ngưỡng an toàn trong khi vẫn gửi tín hiệu báo cáo về trung tâm điều khiển rằng mọi thứ bình thường, khiến khoảng 1.000 máy ly tâm bị phá hủy hoàn toàn từ bên trong mà không cần bắn một phát đạn nào."
                  en="The worm covertly accelerated centrifuge spinning speeds beyond mechanical safety thresholds while simultaneously spoofing normal telemetry back to the control room, causing approximately 1,000 centrifuges to tear themselves apart without firing a single bullet."
                />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={9} />

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
          onClick={() => setShowQuizModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-cyan-500/25"
        >
          <FileQuestion className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Take Lesson 9 Evaluation Quiz' : 'Làm bài tập trắc nghiệm'}</span>
        </button>
      </div>
    </div>
  );
};
