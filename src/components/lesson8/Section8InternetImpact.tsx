import React, { useState } from 'react';
import {
  Globe,
  BookOpen,
  HeartPulse,
  Film,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Volume2,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Share2,
  GraduationCap,
  Tv,
  Stethoscope
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section8InternetImpact: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget
  } = useBook();

  // Active domain tab for interactive showcase
  const [activeDomain, setActiveDomain] = useState<'communication' | 'education' | 'entertainment' | 'healthcare'>('communication');

  // Checkpoint answers
  const [showEntertainmentIdeas, setShowEntertainmentIdeas] = useState(false);
  const [showHealthIdeas, setShowHealthIdeas] = useState(false);

  const sectionSpeechVi =
    'Mục 2: Vai trò của Internet trong đời sống hiện đại. Internet là kho tri thức khổng lồ được cập nhật liên tục mọi lúc mọi nơi; giúp con người kết nối và giao tiếp dễ dàng tiện lợi; đồng thời làm thay đổi căn bản cách thức làm việc, học tập, giải trí và chăm sóc sức khỏe cộng đồng. Hộp ghi nhớ trang 40 SGK.';
  const sectionSpeechEn =
    'Section 2: The Transformative Role of the Internet. The Internet is a boundless global knowledge reservoir accessible anytime, anywhere; it empowers seamless human communication and fundamentally reshapes working paradigms, educational delivery, leisure activities, and public healthcare systems. Official Summary Box on Page 40.';

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

  const domainTabs = [
    {
      id: 'communication',
      icon: MessageCircle,
      titleVi: 'Giao tiếp cộng đồng',
      titleEn: 'Social Communication',
      color: 'indigo'
    },
    {
      id: 'education',
      icon: GraduationCap,
      titleVi: 'Giáo dục & Học tập',
      titleEn: 'Education & Lifelong Learning',
      color: 'emerald'
    },
    {
      id: 'entertainment',
      icon: Film,
      titleVi: 'Văn hóa & Giải trí',
      titleEn: 'Entertainment & Culture',
      color: 'rose'
    },
    {
      id: 'healthcare',
      icon: Stethoscope,
      titleVi: 'Y tế & Sức khỏe',
      titleEn: 'Healthcare & Well-being',
      color: 'cyan'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 font-mono font-bold text-xs uppercase">
              {bilingualMode === 'en' ? 'Section 2 • Pages 39–40' : 'Mục 2 • Trang 39 – 40 SGK'}
            </span>
            <button
              type="button"
              onClick={() => setOriginalPageTarget(40)}
              className="text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold cursor-pointer underline"
            >
              {bilingualMode === 'en' ? 'View Textbook p. 40' : 'Xem trang 40 SGK gốc'}
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            <BilingualText
              vi="2. VAI TRÒ CỦA INTERNET TRONG CUỘC SỐNG HIỆN ĐẠI"
              en="2. THE TRANSFORMATIVE ROLE OF THE INTERNET"
            />
          </h2>
        </div>
      </div>

      {/* 4 Transformational Pillars Explorer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {bilingualMode === 'en' ? 'Societal Transformation' : 'Tác động sâu sắc tới đời sống xã hội'}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="4 Trụ cột thay đổi căn bản phương thức sống, học tập và làm việc"
              en="4 Core Pillars Reshaping How Humans Live, Learn, and Work"
            />
          </h3>
        </div>

        {/* Domain Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {domainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDomain === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDomain(tab.id as any)}
                className={`p-3.5 rounded-2xl border text-left font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-black scale-[1.02]'
                    : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-indigo-500'}`} />
                <span className="truncate">
                  {bilingualMode === 'en' ? tab.titleEn : tab.titleVi}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Domain Content Stage */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
          {activeDomain === 'communication' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                <MessageCircle className="w-5 h-5" />
                <span>GIAO TIẾP CỘNG ĐỒNG & XÃ HỘI SỐ</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Internet xóa nhòa mọi rào cản về khoảng cách địa lí và múi giờ. Người dân có thể gửi thư điện tử (email), gọi video call trực tiếp chất lượng cao với người thân ở cách nửa vòng Trái Đất mà chi phí gần như bằng 0. Mạng xã hội tạo nên không gian chia sẻ thông tin, hội nhóm thiện nguyện và kết nối văn hóa toàn cầu."
                  en="The Internet dismantles geographic distance and time zone boundaries. Instant email, crystal-clear video conferencing, and social networking enable global human interaction at zero incremental cost, fostering international cultural exchange and civic collaboration."
                />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Thư điện tử (Email)</strong>
                  <span className="text-slate-500">Giao dịch văn bản chính thức, đính kèm tệp tin tức thời</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Nhắn tin OTT & Gọi video</strong>
                  <span className="text-slate-500">Zalo, Messenger, WhatsApp kết nối thời gian thực</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Diễn đàn & Mạng xã hội</strong>
                  <span className="text-slate-500">Trao đổi kinh nghiệm học tập, định hướng nghề nghiệp</span>
                </div>
              </div>
            </div>
          )}

          {activeDomain === 'education' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <GraduationCap className="w-5 h-5" />
                <span>GIÁO DỤC, HỌC TẬP SUỐT ĐỜI & LỚP HỌC TRỰC TUYẾN</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Internet trở thành một kho tri thức nhân loại khổng lồ mở ra bình đẳng cho mọi học sinh. Từ các bài giảng tương tác đa phương tiện, bách khoa toàn thư mở Wikipedia đến các lớp học trực tuyến qua Zoom, MS Teams giúp duy trì học tập ngay cả trong thiên tai, dịch bệnh. Học sinh có thể học mọi lúc, mọi nơi theo năng lực cá nhân."
                  en="The Internet serves as an unprecedented open knowledge repository democratizing educational access worldwide. From interactive multimedia lessons to virtual classrooms on Zoom and Teams, students pursue personalized lifelong learning resilient to physical disruptions."
                />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Kho tư liệu mở</strong>
                  <span className="text-slate-500">Sách điện tử, video thí nghiệm mô phỏng trực quan</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Lớp học ảo trực tuyến</strong>
                  <span className="text-slate-500">Dạy và học từ xa kết nối giáo viên và toàn thể lớp học</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Kiểm tra & Thi số</strong>
                  <span className="text-slate-500">Chấm trắc nghiệm tự động, phân tích năng lực chuẩn xác</span>
                </div>
              </div>
            </div>
          )}

          {activeDomain === 'entertainment' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <Tv className="w-5 h-5" />
                <span>VĂN HÓA, THỂ THAO & HOẠT ĐỘNG GIẢI TRÍ</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Internet mang lại thế giới giải trí phong phú: Xem phim trực tuyến độ phân giải cao theo yêu cầu, nghe nhạc bản quyền toàn cầu, tham quan bảo tàng ảo qua công nghệ 3D, đọc báo điện tử cập nhật từng giây và tham gia các trò chơi tương tác kết nối bạn bè khắp năm châu."
                  en="The Internet delivers diverse leisure experiences: on-demand high-definition video streaming, worldwide music libraries, 3D virtual museum walk-throughs, up-to-the-second electronic news, and immersive multiplayer sports."
                />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Phát sóng trực tuyến (Streaming)</strong>
                  <span className="text-slate-500">YouTube, Netflix, truyền hình số theo yêu cầu</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Âm nhạc số bản quyền</strong>
                  <span className="text-slate-500">Spotify, Apple Music, Zing MP3 nghe mọi lúc</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Bảo tàng & Du lịch ảo</strong>
                  <span className="text-slate-500">Khám phá di sản thế giới qua ảnh 360 độ và VR</span>
                </div>
              </div>
            </div>
          )}

          {activeDomain === 'healthcare' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                <HeartPulse className="w-5 h-5" />
                <span>Y TẾ, CHĂM SÓC SỨC KHỎE & HỒ SƠ ĐIỆN TỬ</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Hệ thống y tế số: Bệnh nhân ở vùng sâu vùng xa có thể được các bác sĩ đầu ngành hội chẩn từ xa (Telemedicine); đặt lịch khám qua ứng dụng điện thoại không cần xếp hàng; theo dõi lịch sử tiêm chủng và bệnh án điện tử trên VNeID; thiết bị đeo thông minh cảnh báo nhịp tim bất thường tức thời."
                  en="Digital healthcare innovations: Telemedicine connects remote clinics with leading medical specialists, mobile apps automate appointment bookings without queues, electronic health records centralize patient history, and smart wearables flag cardiac arrhythmias in real time."
                />
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Khám chữa bệnh từ xa</strong>
                  <span className="text-slate-500">Hội chẩn qua cầu truyền hình chuyên dụng</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Sổ sức khỏe điện tử</strong>
                  <span className="text-slate-500">Tra cứu đơn thuốc, kết quả xét nghiệm qua app</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                  <strong className="text-slate-900 dark:text-slate-100 block">Cảnh báo dịch bệnh sớm</strong>
                  <span className="text-slate-500">Thống kê ca bệnh theo vùng dịch tễ để phòng ngừa</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Official Textbook Summary Box (Trang 40 SGK) */}
      <div className="p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 border-2 border-amber-500/40 space-y-3">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm uppercase tracking-wider">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <span>{bilingualMode === 'en' ? 'Official Textbook Summary Box (Page 40)' : 'Hộp Ghi nhớ cốt lõi (Trang 40 SGK)'}</span>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
          <li className="flex items-start gap-2.5">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <BilingualText
                vi="Internet là một kho tri thức khổng lồ thường xuyên được cập nhật, có thể truy cập bất cứ ở đâu, bất cứ lúc nào."
                en="The Internet is a vast, continuously updated reservoir of human knowledge, accessible anywhere and at any time."
              />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <BilingualText
                vi="Internet đã giúp con người có thể kết nối và giao tiếp với nhau một cách dễ dàng và tiện lợi."
                en="The Internet empowers people to connect, collaborate, and communicate effortlessly and conveniently."
              />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-amber-600 font-bold">•</span>
            <span>
              <BilingualText
                vi="Internet đã có ảnh hưởng sâu sắc tới mọi lĩnh vực của đời sống xã hội, làm thay đổi cách thức làm việc, học tập và giao tiếp với nhau."
                en="The Internet has exerted profound effects across all sectors of society, fundamentally reshaping paradigms of work, study, and social interaction."
              />
            </span>
          </li>
        </ul>
      </div>

      {/* Checkpoint Questions 1 & 2 (Page 40 SGK) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Question 1: Entertainment */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Tv className="w-4 h-4 text-rose-500" />
            <span>{bilingualMode === 'en' ? 'Question 1: Internet in Entertainment' : 'Câu hỏi 1: Internet với hoạt động giải trí (Tr. 40)'}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <BilingualText
              vi="Em hãy nêu một số ứng dụng tiêu biểu của Internet đối với hoạt động văn hoá và giải trí của giới trẻ hiện nay?"
              en="Name prominent applications of the Internet in contemporary youth culture and entertainment?"
            />
          </p>
          <button
            type="button"
            onClick={() => setShowEntertainmentIdeas(!showEntertainmentIdeas)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            {showEntertainmentIdeas
              ? (bilingualMode === 'en' ? 'Hide Suggested Answer ▲' : 'Ẩn câu trả lời mẫu ▲')
              : (bilingualMode === 'en' ? 'Show Suggested Answer ▼' : 'Xem gợi ý trả lời chuẩn ▼')}
          </button>
          {showEntertainmentIdeas && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
              <BilingualText
                vi="Nghe nhạc bản quyền trực tuyến (Spotify, Zing MP3); xem phim và video giáo dục (Netflix, YouTube); tham quan bảo tàng ảo 3D; theo dõi tin tức thể thao và đọc báo điện tử tức thời."
                en="Streaming licensed music online (Spotify, Apple Music); watching educational and documentary videos (Netflix, YouTube); exploring 3D virtual museums; and following real-time sports updates and online newspapers."
              />
            </div>
          )}
        </div>

        {/* Question 2: Health */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-cyan-500" />
            <span>{bilingualMode === 'en' ? 'Question 2: Internet in Healthcare' : 'Câu hỏi 2: Internet với hoạt động bảo vệ sức khoẻ (Tr. 40)'}</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <BilingualText
              vi="Em hãy nêu một số ứng dụng cụ thể của Internet đối với công tác chăm sóc và bảo vệ sức khoẻ y tế?"
              en="State concrete applications of the Internet regarding healthcare provision and public wellness?"
            />
          </p>
          <button
            type="button"
            onClick={() => setShowHealthIdeas(!showHealthIdeas)}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            {showHealthIdeas
              ? (bilingualMode === 'en' ? 'Hide Suggested Answer ▲' : 'Ẩn câu trả lời mẫu ▲')
              : (bilingualMode === 'en' ? 'Show Suggested Answer ▼' : 'Xem gợi ý trả lời chuẩn ▼')}
          </button>
          {showHealthIdeas && (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-700">
              <BilingualText
                vi="Tư vấn và hội chẩn khám bệnh từ xa (Telemedicine); ứng dụng đặt lịch khám và tra cứu đơn thuốc điện tử (Sổ sức khoẻ điện tử, VNeID); đồng bộ chỉ số nhịp tim, huyết áp từ smartwatch đến bác sĩ gia đình."
                en="Telemedicine consultations and remote diagnoses; digital appointment scheduling and electronic prescription retrieval (electronic health records); and synchronizing real-time vitals (heart rate, blood pressure) from smartwatches directly to healthcare providers."
              />
            </div>
          )}
        </div>
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={8} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Back: LAN vs Internet' : 'Quay lại: Mạng LAN vs Internet'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Section 3: Cloud Computing' : 'Tiếp tục Mục 3: Điện toán đám mây'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
