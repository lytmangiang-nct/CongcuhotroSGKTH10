import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  Globe,
  Users,
  FileWarning,
  Download,
  AlertTriangle,
  Volume2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';
import { CyberDefense3DViewer } from './CyberDefense3DViewer';

export const Section9Overview: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget
  } = useBook();

  // Activity 1 interactive state
  const [selectedActivityScenario, setSelectedActivityScenario] = useState<
    'friend' | 'news' | 'download' | null
  >('friend');

  const sectionSpeechVi =
    'Chủ đề 2: Mạng máy tính và Internet. Bài 9: An toàn trên không gian mạng. Không gian mạng là môi trường mở, nơi mọi người có thể liên lạc và chia sẻ thông tin dễ dàng nhưng cũng tiềm ẩn vô số cạm bẫy. Sau bài học này, em sẽ nắm vững các nguy cơ và tác hại khi tham gia Internet thiếu hiểu biết; biết cách phòng vệ trước hành vi bắt nạt trên mạng; bảo vệ dữ liệu cá nhân; hiểu rõ bản chất của các loại phần mềm độc hại như virus, sâu máy tính, trojan; và thực hành thành thạo công cụ bảo mật Windows Defender.';
  const sectionSpeechEn =
    'Topic 2: Computer Networks and the Internet. Lesson 9: Cybersecurity in Cyberspace. Cyberspace is an open digital ecosystem enabling seamless communication, yet teeming with digital traps and adversaries. After this lesson, you will recognize critical online threats, defend against cyberbullying, secure personal credentials, comprehend malware mechanisms including viruses, worms, and trojans, and master the Windows Defender security suite.';

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

  const activityScenarios = [
    {
      id: 'friend' as const,
      icon: Users,
      titleVi: 'a) Kết bạn qua mạng (Making Friends Online)',
      titleEn: 'a) Connecting with New Friends Online',
      descVi: 'Kết bạn với người lạ chưa từng gặp mặt ngoài đời thực.',
      descEn: 'Accepting friend requests from unknown individuals online.',
      risksVi: [
        'Bị lừa đảo kết bạn bởi tài khoản giả mạo (impersonation/catfishing)',
        'Bị dụ dỗ chia sẻ thông tin bí mật cá nhân hoặc hình ảnh nhạy cảm',
        'Nguy cơ trở thành nạn nhân của hành vi bắt nạt hoặc tống tiền qua mạng'
      ],
      risksEn: [
        'Deceived by cloned identity or fraudulent impostors (catfishing)',
        'Coerced into disclosing sensitive private data or personal imagery',
        'High vulnerability to cyber extortion and digital bullying attacks'
      ],
      color: 'border-blue-500/40 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
    },
    {
      id: 'news' as const,
      icon: Globe,
      titleVi: 'b) Xem tin tức trên mạng (Consuming Online News)',
      titleEn: 'b) Browsing Online News & Social Feeds',
      descVi: 'Đọc các bài viết, video giật gân lan truyền trên mạng xã hội.',
      descEn: 'Consuming viral sensational articles, forum posts, and video clips.',
      risksVi: [
        'Tiếp cận tin giả (fake news), thông tin sai lệch gây hoang mang',
        'Nội dung phản văn hóa, bạo lực, kích động làm lệch lạc nhận thức',
        'Bấm vào tiêu đề nhử mồi (clickbait) dẫn sang trang web lừa đảo độc hại'
      ],
      risksEn: [
        'Exposure to unverified fake news spreading unwarranted panic',
        'Toxic, violent, or culturally harmful propaganda distorting mindset',
        'Deceptive clickbait links redirecting to malicious phishing portals'
      ],
      color: 'border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300'
    },
    {
      id: 'download' as const,
      icon: Download,
      titleVi: 'c) Tải các phần mềm (Downloading Software)',
      titleEn: 'c) Downloading Files & Applications',
      descVi: 'Tải phần mềm miễn phí, game crack từ các liên kết trôi nổi.',
      descEn: 'Downloading free warez, cracked software, and unofficial utilities.',
      risksVi: [
        'Phần mềm bị kẻ xấu cố ý gắn kèm mã độc (Trojan, Keylogger, Spyware)',
        'Máy tính bị nhiễm sâu mạng hoặc ransomware mã hóa dữ liệu tống tiền',
        'Hệ thống bị cài đặt cửa sau (backdoor) biến thành máy tính ma (botnet zombie)'
      ],
      risksEn: [
        'Software maliciously packaged with embedded trojans, keyloggers, or spyware',
        'Infection by ransomware encrypting critical drives for extortion',
        'Covert backdoors turning your computer into a weaponized DDoS botnet node'
      ],
      color: 'border-rose-500/40 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300">
            {bilingualMode === 'en' ? 'Topic 2 • Lesson 9' : 'Chủ đề 2 • Bài 9'}
          </span>
          <h1
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1"
            data-lesson-title="true"
            data-lesson-num={9}
          >
            <BilingualText
              vi="AN TOÀN TRÊN KHÔNG GIAN MẠNG"
              en="CYBERSECURITY IN CYBERSPACE"
            />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <BilingualText
              vi="SGK Tin học 10 Kết nối tri thức với cuộc sống • Trang 44 – 49"
              en="Informatics 10 Global Success • Textbook Pages 44–49"
            />
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOriginalPageTarget(44)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-600" />
            <span>{bilingualMode === 'en' ? 'Textbook Page 44' : 'SGK Trang 44'}</span>
          </button>
        </div>
      </div>

      {/* Learning Objectives Box (Sau bài này em sẽ) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-br from-cyan-500/10 via-slate-50 to-emerald-500/10 dark:from-cyan-950/30 dark:via-slate-900 dark:to-emerald-950/20 border border-cyan-500/30 shadow-xs">
        <div className="flex items-center gap-2.5 font-black text-sm sm:text-base text-cyan-700 dark:text-cyan-400 mb-3">
          <Sparkles className="w-5 h-5 text-cyan-500" />
          <span>
            {bilingualMode === 'en'
              ? 'Learning Objectives (Page 44 SGK)'
              : 'Mục tiêu học tập (Sau bài này em sẽ:)'}
          </span>
        </div>
        <ul className="grid sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-cyan-200 dark:border-cyan-800/50 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-900 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Recognize Online Risks: '
                  : 'Nêu nguy cơ & tác hại: '}
              </strong>
              {bilingualMode === 'en'
                ? 'Identify hazards of careless Internet habits and apply preventive measures.'
                : 'Hiểu rõ các cạm bẫy khi dùng Internet thiếu hiểu biết và các biện pháp phòng ngừa.'}
            </span>
          </li>
          <li className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-cyan-200 dark:border-cyan-800/50 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-900 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Defend & Protect Data: '
                  : 'Phòng vệ & bảo vệ dữ liệu: '}
              </strong>
              {bilingualMode === 'en'
                ? 'Prevent cyberbullying and safeguard personal confidential credentials.'
                : 'Biết cách tự bảo vệ khi bị bắt nạt trên mạng và bảo mật dữ liệu cá nhân.'}
            </span>
          </li>
          <li className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-cyan-200 dark:border-cyan-800/50 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-900 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Master Antivirus Tools: '
                  : 'Chống phần mềm xấu: '}
              </strong>
              {bilingualMode === 'en'
                ? 'Differentiate viruses, worms, and trojans; operate Windows Defender proficiently.'
                : 'Phân biệt virus, sâu máy tính, trojan và làm chủ công cụ Windows Defender.'}
            </span>
          </li>
        </ul>
      </div>

      {/* Lead-in / Khởi động SGK trang 44 */}
      <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/50 text-slate-800 dark:text-slate-200 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>
            {bilingualMode === 'en'
              ? 'Opening Reflection (Page 44)'
              : 'Khởi động (SGK Trang 44)'}
          </span>
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {bilingualMode === 'en'
            ? 'Cyberspace (often referred to simply as the "Network") is the global Internet—a profoundly open public domain. Anyone can connect, communicate, and share data freely; however, bad actors exploit this exact openness to plant deception and traps. How can you proactively protect yourself and your family?'
            : 'Không gian mạng (trong một số hoàn cảnh cụ thể được gọi vắn tắt là "mạng") chính là Internet, là một môi trường rất mở. Trên mạng mọi người có thể liên lạc, chia sẻ thông tin với nhau một cách dễ dàng nhưng chính điều đó lại bị những kẻ xấu lợi dụng khiến mạng cũng là nơi đầy rẫy những cạm bẫy. Cần tự bảo vệ mình như thế nào?'}
        </p>
      </div>

      {/* FEATURED: Interactive Three.js 3D Cyber Defense Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
            <Shield className="w-5 h-5 text-cyan-600" />
            <span>
              {bilingualMode === 'en'
                ? 'Interactive 3D Cybersecurity Fortress & Threat Lab'
                : 'Phòng thí nghiệm 3D Tương tác: Ma trận Pháo đài & Các Mối đe dọa'}
            </span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 font-bold">
            WebGL • Three.js 3D
          </span>
        </div>

        {/* 3D Component */}
        <CyberDefense3DViewer initialMode="overview" />
      </div>

      {/* Activity 1 (Hoạt động 1 SGK trang 44): Nguy cơ trên mạng */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
            <HelpCircle className="w-5 h-5 text-cyan-600" />
            <span>
              {bilingualMode === 'en'
                ? 'Activity 1: Brainstorming Online Hazards (Page 44)'
                : 'Hoạt động 1: Tìm hiểu nguy cơ trên mạng (SGK Trang 44)'}
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {bilingualMode === 'en'
              ? 'Click each scenario to uncover risks'
              : 'Chọn tình huống để phân tích nguy cơ'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {bilingualMode === 'en'
            ? 'Discuss and provide illustrative examples of potential dangers when going online to: a) Make friends, b) Read news, c) Download software.'
            : 'Hãy thảo luận và cho ví dụ minh hoạ về những nguy cơ có thể gặp phải khi lên Internet để: a) Kết bạn; b) Xem tin tức; c) Tải các phần mềm.'}
        </p>

        {/* Tab pills */}
        <div className="grid sm:grid-cols-3 gap-3">
          {activityScenarios.map((sc) => {
            const Icon = sc.icon;
            const isSelected = selectedActivityScenario === sc.id;
            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSelectedActivityScenario(sc.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? `${sc.color} ring-2 ring-cyan-500/50 shadow-md`
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>
                    {bilingualMode === 'en' ? sc.titleEn : sc.titleVi}
                  </span>
                </div>
                <p className="text-[11px] opacity-80">
                  {bilingualMode === 'en' ? sc.descEn : sc.descVi}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detail display of selected activity */}
        {selectedActivityScenario && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>
                {bilingualMode === 'en'
                  ? 'Identified Cyber Hazards & Consequences:'
                  : 'Các nguy cơ & hậu quả tiềm ẩn đã được xác định:'}
              </span>
            </div>
            <ul className="space-y-1.5">
              {activityScenarios
                .find((s) => s.id === selectedActivityScenario)
                ?.risksVi.map((riskVi, idx) => {
                  const riskEn =
                    activityScenarios.find(
                      (s) => s.id === selectedActivityScenario
                    )?.risksEn[idx] || '';
                  return (
                    <li
                      key={idx}
                      className="text-xs flex items-start gap-2 text-slate-700 dark:text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <span>{bilingualMode === 'en' ? riskEn : riskVi}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={9} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="text-xs text-slate-500">
          {bilingualMode === 'en'
            ? 'Section 0 of 5 • Lesson Overview'
            : 'Phần 0 / 5 • Giới thiệu Bài 9'}
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-cyan-500/25"
        >
          <span>
            {bilingualMode === 'en' ? 'Section 1: Cyber Risks' : 'Mục 1: Một số nguy cơ trên mạng'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
