import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertOctagon,
  EyeOff,
  UserX,
  Wifi,
  Lock,
  Unlock,
  MessageSquareWarning,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  ArrowRight,
  ArrowLeft,
  Info,
  Sparkles,
  PhoneCall,
  FileText,
  Bookmark
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section9CyberRisks: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget
  } = useBook();

  // Public Wi-Fi encryption toggle simulation
  const [wifiSecured, setWifiSecured] = useState<boolean>(false);

  // Cyberbullying reaction test state
  const [bullyingStep, setBullyingStep] = useState<number>(0);
  const [bullyingAnswers, setBullyingAnswers] = useState<{ [key: number]: string }>({});

  // Checkpoint question toggles (SGK page 45)
  const [showQuestion1Answer, setShowQuestion1Answer] = useState(false);
  const [showQuestion2Answer, setShowQuestion2Answer] = useState(false);

  const sectionSpeechVi =
    'Mục 1: Một số nguy cơ trên mạng. Mạng Internet là môi trường mở ẩn chứa nhiều nguy cơ như: tin giả và tin phản văn hóa; lừa đảo mạo danh chiếm đoạt tài sản; lộ lọt thông tin cá nhân đặc biệt qua sóng wifi công cộng không mã hóa; bắt nạt trên không gian mạng gây khủng hoảng tâm lý nghiêm trọng; và hội chứng nghiện mạng. Hãy thực hiện 5 biện pháp phòng chống bắt nạt và bảo vệ tuyệt đối dữ liệu cá nhân của em theo Hộp ghi nhớ trang 45 SGK.';
  const sectionSpeechEn =
    'Section 1: Critical Cyber Risks in Cyberspace. Cyberspace entails significant perils including: fake news and toxic disinformation; online impersonation and financial fraud; data breaches especially over unencrypted public Wi-Fi hotspots; destructive cyberbullying causing psychological distress; and Internet addiction. Apply the 5-step defense against cyberbullying and safeguard your personal credentials as highlighted in the Page 45 Summary Box.';

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

  const bullyingChecklist = [
    {
      step: 1,
      ruleVi: 'Không kết bạn dễ dãi qua mạng',
      ruleEn: 'Do not accept indiscriminate friend requests',
      descVi: 'Chỉ kết nối với người quen biết ngoài đời thực.',
      descEn: 'Only connect with trusted individuals verified in real life.'
    },
    {
      step: 2,
      ruleVi: 'Không trả lời, không tranh luận với kẻ bắt nạt',
      ruleEn: 'Do not reply or argue with bullies on forums',
      descVi: 'Cắt đứt chuỗi phản hồi tiêu cực, không để kẻ xấu khiêu khích.',
      descEn: 'De-escalate toxicity by withholding defensive reactions.'
    },
    {
      step: 3,
      ruleVi: 'Lưu giữ tất cả các bằng chứng số',
      ruleEn: 'Capture and archive all digital evidence',
      descVi: 'Chụp ảnh màn hình tin nhắn, bình luận xúc phạm, thời gian.',
      descEn: 'Screenshot offensive posts, timestamps, sender IDs.'
    },
    {
      step: 4,
      ruleVi: 'Chia sẻ ngay với bố mẹ hoặc thầy cô giáo',
      ruleEn: 'Promptly confide in parents or educators',
      descVi: 'Không tự chịu đựng một mình; tìm sự che chở từ người lớn tin cậy.',
      descEn: 'Never suffer in isolation; seek adult guidance.'
    },
    {
      step: 5,
      ruleVi: 'Báo cơ quan công an khi sự việc nghiêm trọng',
      ruleEn: 'Report to law enforcement when critical',
      descVi: 'Khi bị tống tiền, đe dọa thể xác hoặc bôi nhọ danh dự nghiêm trọng.',
      descEn: 'Provide archived evidence when facing extortion or physical threats.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
            {bilingualMode === 'en' ? 'Section 1 • Textbook Pages 44–45' : 'Mục 1 • SGK Trang 44 - 45'}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            <BilingualText
              vi="1. MỘT SỐ NGUY CƠ TRÊN MẠNG"
              en="1. CRITICAL RISKS IN CYBERSPACE"
            />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <BilingualText
              vi="Tin giả, Lừa đảo mạo danh, Lộ dữ liệu, Bắt nạt mạng & Nghiện Internet"
              en="Fake News, Online Impersonation, Data Leaks, Cyberbullying & Internet Addiction"
            />
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOriginalPageTarget(45)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-600" />
            <span>{bilingualMode === 'en' ? 'Textbook Page 45' : 'SGK Trang 45'}</span>
          </button>
        </div>
      </div>

      {/* 5 Primary Cyber Threats Grid (SGK trang 44 - 45) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Threat 1: Tin giả */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '1. Fake News & Toxic Media'
              : '1. Tin giả và Tin phản văn hoá'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Anyone can publish content online. Deceptive actors craft unverified rumours or sensational, violent narratives that distort public awareness and social ethics.'
              : 'Ai cũng có thể đưa bài lên mạng kể cả các tin bài xấu. Nhiều tin giả, thông tin bạo lực, giật gân làm lệch lạc nhận thức và định hướng dư luận sai lầm.'}
          </p>
        </div>

        {/* Threat 2: Lừa đảo mạo danh */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <UserX className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '2. Online Fraud & Impersonation'
              : '2. Lừa đảo trên mạng'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Scammers clone Facebook photos and profile info to build identical lookalike accounts, message family members, and pretend to urgently borrow money.'
              : 'Kẻ xấu lấy ảnh, thông tin trang Facebook của nạn nhân để lập trang giống hệt, kết bạn với người thân trong danh bạ rồi mạo danh vay mượn tiền để chiếm đoạt.'}
          </p>
        </div>

        {/* Threat 3: Lộ thông tin cá nhân */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '3. Personal Data Breach'
              : '3. Lộ thông tin cá nhân'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Includes full name, birthday, phone number, email, and bank credentials. Leaking app accounts leads to impersonation; leaking bank data leads to stolen funds.'
              : 'Gồm tên tuổi, SĐT, email, thẻ ngân hàng. Lộ tài khoản phần mềm dẫn đến bị mạo danh; lộ tài khoản ngân hàng dẫn đến mất tiền và tài sản.'}
          </p>
        </div>

        {/* Threat 4: Bắt nạt mạng */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <MessageSquareWarning className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '4. Cyberbullying & Defamation'
              : '4. Bắt nạt trên không gian mạng'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Ranges from insults and shaming to blackmail and extortion. Aggressors hide behind anonymous aliases, persistent 24/7 attacks leading to victim isolation.'
              : 'Xỉ vả, lăng nhục, đe dọa tung thông tin, vu khống, tống tiền. Kẻ bắt nạt ẩn danh, hành vi dai dẳng gây tổn hại tâm lý nặng nề và trầm cảm cho nạn nhân.'}
          </p>
        </div>

        {/* Threat 5: Nghiện mạng */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5 sm:col-span-2 lg:col-span-2">
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? '5. Internet & Gaming Addiction'
              : '5. Nghiện mạng & Trò chơi điện tử'}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Spending excessive time on social feeds and continuous gaming without rest damages vision, mental stamina, and physical health—even causing documented strokes and fatalities at computer desks.'
              : 'Dành quá nhiều thời gian cho mạng, đặc biệt chơi game liên tục nhiều ngày đêm ảnh hưởng nghiêm trọng tới sức khoẻ, từng có những thanh niên đột quỵ ngay trên bàn máy tính.'}
          </p>
        </div>
      </div>

      {/* Interactive Sandbox 1: Public Wi-Fi Sniffing vs Encrypted VPN Protection */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                {bilingualMode === 'en'
                  ? 'Interactive Simulation (Textbook Page 44)'
                  : 'Mô phỏng tương tác SGK Trang 44'}
              </div>
              <div className="text-sm font-bold">
                {bilingualMode === 'en'
                  ? 'Why is Public Wi-Fi Vulnerable to Eavesdropping?'
                  : 'Tại sao Wi-Fi công cộng dễ bị nghe lén dữ liệu?'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setWifiSecured(!wifiSecured)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              wifiSecured
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/25 animate-pulse'
            }`}
          >
            {wifiSecured ? (
              <>
                <Lock className="w-4 h-4" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Security: HTTPS & VPN ON'
                    : 'Bảo vệ: ĐÃ MÃ HOÁ (HTTPS / VPN)'}
                </span>
              </>
            ) : (
              <>
                <Unlock className="w-4 h-4" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Security: UNENCRYPTED (Click to Secure)'
                    : 'Bảo vệ: KHÔNG MÃ HOÁ (Nguy hiểm)'}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Visual packet transmission channel */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{bilingualMode === 'en' ? 'Your Device (Smartphone)' : 'Thiết bị của em (Smartphone)'}</span>
            <span className="font-mono text-cyan-400">
              {wifiSecured
                ? (bilingualMode === 'en' ? '256-BIT SSL/TLS ENCRYPTED' : 'MÃ HÓA SSL/TLS 256-bit')
                : (bilingualMode === 'en' ? 'CLEARTEXT TRANSMISSION (UNENCRYPTED)' : 'TRUYỀN TIN BẢN RÕ (CLEARTEXT)')}
            </span>
            <span>{bilingualMode === 'en' ? 'Coffee Shop Wi-Fi AP' : 'Trạm Wi-Fi Quán Cafe'}</span>
          </div>

          <div className="relative h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center px-4 overflow-hidden">
            <div
              className={`absolute inset-0 transition-colors duration-500 ${
                wifiSecured
                  ? 'bg-emerald-950/20'
                  : 'bg-rose-950/30 border-rose-500/30'
              }`}
            />
            <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">
                {bilingualMode === 'en' ? 'Login Packet Data:' : 'Gói tin đăng nhập:'}
              </span>
              <span
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  wifiSecured
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {wifiSecured
                  ? (bilingualMode === 'en'
                      ? '0x8F9A1B... [ENCRYPTED - Eavesdroppers cannot read]'
                      : '0x8F9A1B... [ĐÃ MÃ HÓA - Kẻ xấu không đọc được]')
                  : (bilingualMode === 'en'
                      ? 'user: "hoang_an" | pass: "password123" [CREDENTIALS EXPOSED!]'
                      : 'user: "hoang_an" | pass: "matkhau123" [LỘ TÀI KHOẢN!]')}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {wifiSecured
              ? bilingualMode === 'en'
                ? 'Excellent! With HTTPS / VPN encryption active, data packets are mathematically scrambled, completely neutralizing eavesdropping on public Wi-Fi.'
                : 'Rất tốt! Khi bật mã hoá HTTPS hoặc VPN, gói tin truyền đi dưới dạng mật mã vô nghĩa đối với bất kỳ kẻ xấu nào đang rình rập trên cùng mạng Wi-Fi.'
              : bilingualMode === 'en'
                ? 'Warning (SGK Page 44): Most public Wi-Fi hotspots transmit data unencrypted. Anyone nearby using packet sniffers can intercept passwords and account tokens.'
                : 'Cảnh báo SGK Trang 44: Hầu hết những trạm wifi công cộng không mã hoá thông tin khi truyền. Kẻ xấu có thể bắt trọn mật khẩu và tin nhắn của em.'}
          </p>
        </div>
      </div>

      {/* 5 Proactive Bullying Defense Steps (Hộp SGK trang 45) */}
      <div className="p-6 rounded-3xl bg-linear-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/30 dark:via-slate-900 dark:to-pink-950/20 border-2 border-purple-300/80 dark:border-purple-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 font-black text-sm sm:text-base text-purple-900 dark:text-purple-300">
          <ShieldAlert className="w-5 h-5 text-purple-600" />
          <span>
            {bilingualMode === 'en'
              ? '5 Golden Principles to Defend Against Cyberbullying (Page 45)'
              : 'Quy tắc Vàng: 5 Biện pháp Phòng chống Bắt nạt Mạng (SGK Trang 45)'}
          </span>
        </div>

        <div className="grid sm:grid-cols-5 gap-3">
          {bullyingChecklist.map((item) => (
            <div
              key={item.step}
              className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800/60 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                  {item.step}
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                  {bilingualMode === 'en' ? item.ruleEn : item.ruleVi}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                {bilingualMode === 'en' ? item.descEn : item.descVi}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Box 1 (Hộp ghi nhớ trang 45) */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-dashed border-amber-500/60 text-slate-900 dark:text-slate-100 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <BilingualText
              inline
              vi="Hộp ghi nhớ trọng tâm (SGK Trang 45)"
              en="Core Summary Box (Textbook Page 45)"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              speak(
                bilingualMode === 'en'
                  ? 'Key takeaways from page 45: The network offers fast and convenient communication but harbors significant risks of information insecurity. Only visit reputable websites, and remain vigilant against fake news and online scams. Always keep personal information private and confidential. Only connect with people you know on social networks. If facing cyberbullying, immediately confide in family or teachers. Avoid excessive Internet usage to prevent digital addiction.'
                  : 'Ghi nhớ trọng tâm trang 45: Mạng là môi trường giao tiếp nhanh chóng, thuận tiện nhưng ẩn chứa nhiều nguy cơ gây mất an toàn thông tin. Chỉ truy cập các trang web tin cậy, cảnh giác với thông tin giả, lừa đảo. Giữ bí mật thông tin cá nhân. Chỉ kết bạn với người quen biết trên mạng xã hội. Khi bị bắt nạt hãy chia sẻ với người thân hoặc thầy cô. Không nên sử dụng Internet quá nhiều.',
                bilingualMode === 'en' ? 'en' : 'vi'
              )
            }
            className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
            title={bilingualMode === 'en' ? 'Listen to Summary' : 'Nghe toàn bộ ghi nhớ'}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Listen' : 'Nghe ghi nhớ'}</span>
          </button>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 list-disc list-inside">
          <li>
            <BilingualText
              inline
              vi="Mạng là môi trường giao tiếp nhanh chóng, thuận tiện nhưng ẩn chứa nhiều nguy cơ gây mất an toàn thông tin."
              en="The network offers fast and convenient communication but harbors significant risks of information insecurity."
            />
          </li>
          <li>
            <BilingualText
              inline
              vi="Chỉ truy cập các trang web tin cậy, hãy cảnh giác với các thông tin giả, lừa đảo."
              en="Only visit reputable websites, and remain vigilant against fake news and online scams."
            />
          </li>
          <li>
            <BilingualText
              inline
              vi="Hãy giữ bí mật thông tin cá nhân."
              en="Always keep personal information private and confidential."
            />
          </li>
          <li>
            <BilingualText
              inline
              vi="Chỉ nên kết bạn với những người quen biết trong mạng xã hội. Khi bị bắt nạt, hãy chia sẻ với người thân hoặc thầy cô."
              en="Only connect with people you know on social networks. If facing cyberbullying, immediately confide in family or teachers."
            />
          </li>
          <li>
            <BilingualText
              inline
              vi="Không nên sử dụng Internet quá nhiều."
              en="Avoid excessive Internet usage to prevent digital addiction."
            />
          </li>
        </ul>
      </div>

      {/* SGK Checkpoint Questions (Câu hỏi củng cố trang 45) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <span>
            {bilingualMode === 'en'
              ? 'Textbook Checkpoint Questions (Page 45)'
              : 'Câu hỏi củng cố kiến thức (SGK Trang 45)'}
          </span>
        </div>

        {/* Question 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="1. Em hãy đưa ra một số tình huống có thể làm lộ mật khẩu tài khoản."
                en="1. Provide several scenarios that could lead to account password exposure."
              />
            </div>
            <button
              type="button"
              onClick={() => setShowQuestion1Answer(!showQuestion1Answer)}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 shrink-0 cursor-pointer"
            >
              {showQuestion1Answer
                ? (bilingualMode === 'en' ? 'Hide Suggested Answer' : 'Ẩn gợi ý')
                : (bilingualMode === 'en' ? 'Show Suggested Answer' : 'Xem gợi ý trả lời')}
            </button>
          </div>
          {showQuestion1Answer && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-300 space-y-1 animate-in fade-in">
              <p>
                <strong>{bilingualMode === 'en' ? 'Textbook Suggestions:' : 'Gợi ý SGK:'}</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <BilingualText
                    inline
                    vi="Ghi chép mật khẩu ra giấy dán ở nơi đông người qua lại (màn hình quán net, bàn học công cộng)."
                    en="Writing passwords on sticky notes in public view (internet cafe monitors, shared desks)."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Đăng nhập tài khoản trên máy tính lạ nhưng quên không đăng xuất."
                    en="Logging into accounts on unfamiliar computers and forgetting to log out."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Máy tính bị nhiễm phần mềm gián điệp Keylogger ghi lại thao tác gõ phím."
                    en="Computer infected with keylogger spyware recording keystrokes."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Truy cập qua mạng Wi-Fi công cộng không có mật khẩu bảo vệ hoặc không có mã hoá SSL/TLS."
                    en="Connecting over unsecured public Wi-Fi networks without encryption or SSL/TLS."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Bị lừa bấm vào liên kết giả mạo (phishing) yêu cầu nhập lại mật khẩu."
                    en="Being tricked into clicking phishing links demanding credential re-entry."
                  />
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="2. Em có biết một hành vi lừa đảo nào trên mạng không? Nếu có, em hãy kể cách thức lừa đảo."
                en="2. Do you know of any online scam methods? If so, describe how the scam operates."
              />
            </div>
            <button
              type="button"
              onClick={() => setShowQuestion2Answer(!showQuestion2Answer)}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 shrink-0 cursor-pointer"
            >
              {showQuestion2Answer
                ? (bilingualMode === 'en' ? 'Hide Suggested Answer' : 'Ẩn gợi ý')
                : (bilingualMode === 'en' ? 'Show Suggested Answer' : 'Xem gợi ý trả lời')}
            </button>
          </div>
          {showQuestion2Answer && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-300 space-y-1 animate-in fade-in">
              <p>
                <strong>{bilingualMode === 'en' ? 'Textbook Suggestion (Page 44):' : 'Gợi ý SGK (Trang 44):'}</strong>
              </p>
              <p>
                <BilingualText
                  vi="Kẻ xấu tải hình ảnh và thông tin từ trang mạng xã hội của một người rồi lập tài khoản giả mạo giống hệt. Sau đó kết bạn với bạn bè, người thân của nạn nhân và nhắn tin viện cớ đang đi viện, gặp tai nạn khẩn cấp để vay mượn tiền chuyển khoản."
                  en="Scammers download photos and personal details from someone's social media profile to create an identical counterfeit account. They then friend the victim's contacts, fabricate an emergency (such as hospitalization or an urgent accident), and solicit urgent wire transfers."
                />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pedagogical Prompts */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={9} />

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
          className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-amber-500/25"
        >
          <span>
            {bilingualMode === 'en' ? 'Section 2: Malware Concepts' : 'Mục 2: Phần mềm độc hại'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
