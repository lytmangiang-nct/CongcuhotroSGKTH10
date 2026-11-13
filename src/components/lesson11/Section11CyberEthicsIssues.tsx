import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertOctagon,
  Users,
  Mail,
  Lock,
  MessageSquare,
  Flame,
  Volume2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  FileText,
  AlertTriangle,
  Globe2,
  EyeOff,
  History,
  Share2
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

interface MisconductItem {
  id: string;
  nameVi: string;
  nameEn: string;
  severity: 'high' | 'medium' | 'critical';
  legalTypeVi: string;
  legalTypeEn: string;
  descriptionVi: string;
  descriptionEn: string;
  realWorldExampleVi: string;
  realWorldExampleEn: string;
  icon: any;
}

const MISCONDUCT_ITEMS: MisconductItem[] = [
  {
    id: 'unsuitable_news',
    nameVi: 'Đưa tin không phù hợp lên mạng',
    nameEn: 'Posting Inappropriate / False Information',
    severity: 'critical',
    legalTypeVi: 'Vi phạm Pháp luật & Đạo đức',
    legalTypeEn: 'Statutory & Ethical Violation',
    descriptionVi: 'Đăng tải, chia sẻ các bài viết, hình ảnh sai sự thật, tin bịa đặt hoặc các vụ án bạo lực, nội dung kích động gây hoang mang dư luận xã hội.',
    descriptionEn: 'Publishing and circulating unverified falsehoods, fabricated hoaxes, or graphic violence provoking public panic.',
    realWorldExampleVi: 'Đăng tin bịa đặt về việc thành phố sắp bị phong tỏa toàn bộ do dịch bệnh hoặc chia sẻ hình ảnh tai nạn giao thông rùng rợn.',
    realWorldExampleEn: 'Spreading false claims about mandatory citywide quarantines or sharing graphic crash footage without consent.',
    icon: Flame
  },
  {
    id: 'privacy_breach',
    nameVi: 'Công bố thông tin cá nhân/tổ chức trái phép',
    nameEn: 'Unauthorized Doxxing & Privacy Invasions',
    severity: 'critical',
    legalTypeVi: 'Vi phạm Pháp luật nghiêm trọng',
    legalTypeEn: 'Severe Statutory Violation',
    descriptionVi: 'Tự ý đăng tải số điện thoại, địa chỉ nhà, ảnh chụp tin nhắn riêng tư, kết quả học tập hoặc hồ sơ y tế của người khác lên mạng xã hội.',
    descriptionEn: 'Publishing personal phone numbers, home addresses, private chat transcripts, grades, or medical records without authorization.',
    realWorldExampleVi: 'Đăng ảnh thẻ căn cước công dân hoặc số tài khoản ngân hàng của người khác lên diễn đàn để kích động đám đông tấn công.',
    realWorldExampleEn: 'Leaking citizen ID cards or bank accounts onto public forums to solicit vigilante harassment.',
    icon: EyeOff
  },
  {
    id: 'spam_nuisance',
    nameVi: 'Phát tán thư điện tử hoặc tin nhắn rác (Spam)',
    nameEn: 'Spamming Unsolicited Emails & Messages',
    severity: 'medium',
    legalTypeVi: 'Vi phạm Pháp luật (NĐ 90/2008 & 15/2020)',
    legalTypeEn: 'Legal Breach (Decrees 90/2008 & 15/2020)',
    descriptionVi: 'Gửi hàng loạt email, tin nhắn quảng cáo bất động sản, bán hàng đa cấp vào hòm thư cá nhân mà người nhận không hề đăng ký hoặc yêu cầu.',
    descriptionEn: 'Broadcasting mass unsolicited commercial advertisements, telemarketing blasts, or spam campaigns to personal inboxes.',
    realWorldExampleVi: 'Cài đặt bot tự động gửi hàng nghìn tin nhắn quảng cáo cờ bạc vào các nhóm chat Zalo học sinh.',
    realWorldExampleEn: 'Configuring automated scripts to spam gambling promo links into student chat channels.',
    icon: Mail
  },
  {
    id: 'copyright_infringement',
    nameVi: 'Vi phạm bản quyền dữ liệu và phần mềm',
    nameEn: 'Software & Digital Asset Piracy',
    severity: 'high',
    legalTypeVi: 'Vi phạm Luật Sở hữu trí tuệ',
    legalTypeEn: 'Breach of IP Law (Decree 131/2013)',
    descriptionVi: 'Tải và phân phối các bộ phim, bài hát, giáo trình, bài giảng số hoặc bẻ khóa (crack) phần mềm có bản quyền mà không xin phép tác giả.',
    descriptionEn: 'Distributing unauthorized copies of films, music, digitized textbooks, or running cracked software builds.',
    realWorldExampleVi: 'Tải phần mềm Office bẻ khóa từ các trang web lậu hoặc sao chép toàn bộ tệp giáo án của người khác rồi đề tên mình.',
    realWorldExampleEn: 'Installing pirated office suites or rebranding another educator’s syllabus as one’s own.',
    icon: Lock
  },
  {
    id: 'cyberbullying_act',
    nameVi: 'Bắt nạt qua mạng (Cyberbullying)',
    nameEn: 'Online Harassment & Cyberbullying',
    severity: 'critical',
    legalTypeVi: 'Vi phạm Đạo đức & Pháp luật',
    legalTypeEn: 'Severe Moral & Legal Violation',
    descriptionVi: 'Lập nhóm cô lập, kêu gọi tẩy chay, gửi tin nhắn đe dọa, chê bai ngoại hình hoặc ghép ảnh nhạy cảm bêu riếu một cá nhân.',
    descriptionEn: 'Organizing smear campaigns, mob boycotts, hate threads, body-shaming, or deepfake photo mutilations.',
    realWorldExampleVi: 'Lập fanpage ẩn danh để chế giễu bạn cùng lớp khiến bạn đó bị trầm cảm và không dám đến trường.',
    realWorldExampleEn: 'Creating burner parody pages to mock a peer, driving the victim into acute depressive isolation.',
    icon: AlertTriangle
  },
  {
    id: 'online_fraud',
    nameVi: 'Lừa đảo qua mạng (Online Fraud / Scams)',
    nameEn: 'Cyber Scams & Financial Fraud',
    severity: 'critical',
    legalTypeVi: 'Tội phạm hình sự (Luật Hình sự)',
    legalTypeEn: 'Penal Crime (Vietnam Criminal Code)',
    descriptionVi: 'Mạo danh người thân mượn tiền, tạo trang web giả mạo ngân hàng (phishing) để đánh cắp mật khẩu OTP hoặc dụ dỗ tham gia nhiệm vụ ảo.',
    descriptionEn: 'Impersonating relatives to solicit emergency transfers, deploying phishing portals to steal OTP tokens, or fraudulent tasks.',
    realWorldExampleVi: 'Hack tài khoản Facebook của một người rồi nhắn tin cho danh sách bạn bè mượn 5 triệu đồng chữa bệnh gấp.',
    realWorldExampleEn: 'Compromising a social media account and mass-messaging contacts with urgent fabricated financial emergencies.',
    icon: AlertOctagon
  },
  {
    id: 'uncivilized_behavior',
    nameVi: 'Ứng xử thiếu văn hoá trên diễn đàn',
    nameEn: 'Toxic Discourse & Uncivilized Behavior',
    severity: 'medium',
    legalTypeVi: 'Vi phạm Đạo đức & Văn hoá số',
    legalTypeEn: 'Breach of Digital Civility & Ethics',
    descriptionVi: 'Sử dụng ngôn từ thô tục, chửi bới, xúc phạm danh dự của người tranh luận đối thoại, kích động thù hằn trên các trang bình luận công cộng.',
    descriptionEn: 'Employing profane insults, vitriolic slander, ad-hominem attacks, or toxic trolling in open discussion threads.',
    realWorldExampleVi: 'Chửi tục, mạt sát đối thủ khi thua trong một trận game online hoặc vào trang cá nhân nghệ sĩ thóa mạ tập thể.',
    realWorldExampleEn: 'Hurling profanities at gaming opponents or orchestrating brigading abuse campaigns on public celebrity walls.',
    icon: MessageSquare
  }
];

export const Section11CyberEthicsIssues: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage, setOriginalPageTarget } = useBook();

  const [activeItem, setActiveItem] = useState<string>('unsuitable_news');
  const [showQuestionFbAnswer, setShowQuestionFbAnswer] = useState<boolean>(false);
  const [showQuestionEmailAnswer, setShowQuestionEmailAnswer] = useState<boolean>(false);

  const sectionSpeechVi =
    'Mục 1: Những vấn đề đạo đức, pháp luật và văn hoá. Khi tham gia môi trường số, 7 hành vi xấu phổ biến gồm: đưa tin không phù hợp, công bố thông tin cá nhân trái phép, phát tán thư rác, vi phạm bản quyền dữ liệu và phần mềm, bắt nạt qua mạng, lừa đảo qua mạng và ứng xử thiếu văn hoá. Không gian mạng có tính chất gián tiếp, ẩn danh, lưu trữ lâu dài và phát tán nhanh chóng khiến hậu quả của các hành vi xấu trở nên đặc biệt trầm trọng. Ghi nhớ các nguyên tắc ứng xử văn minh và đọc câu hỏi củng cố trang 56 SGK.';
  const sectionSpeechEn =
    'Section 1: Critical Issues in Digital Ethics, Law, and Culture. Seven prominent digital malpractices include: posting inappropriate content, unauthorized privacy disclosures, spamming, copyright piracy, cyberbullying, financial fraud, and toxic discourse. Cyberspace features indirect communication, anonymity, permanence, and viral global spread, which exacerbate damages. Memorize Summary Box 1 and solve page 56 discussion items.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  const currentObj = MISCONDUCT_ITEMS.find((item) => item.id === activeItem) || MISCONDUCT_ITEMS[0];
  const CurrentIcon = currentObj.icon;

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-700 to-rose-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 text-amber-100 text-xs font-bold backdrop-blur-sm mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>
                <BilingualText vi="Mục 1 SGK Tin học 10" en="Section 1 • Informatics 10" />
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="1. Những vấn đề đạo đức, pháp luật và văn hoá"
                en="1. Ethical, Legal, and Cultural Dilemmas in Cyberspace"
              />
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Nhận diện 7 nhóm hành vi xấu phổ biến trên Internet và 4 đặc tính của môi trường số làm trầm trọng hóa hậu quả vi phạm."
                en="Examine seven prevalent online malpractices and explore the four cyberspace traits that compound damages."
              />
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOriginalPageTarget(56)}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-2xl text-xs font-semibold text-white transition-all flex items-center gap-1.5 backdrop-blur-md shadow-sm cursor-pointer"
              title="Xem trang SGK gốc 56"
            >
              <BookOpen className="w-4 h-4 text-amber-200" />
              <span>SGK Tr. 56</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Inherent Properties of Cyberspace (Trang 56 SGK) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg mb-2 flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-orange-600" />
          <BilingualText
            vi="Tại sao tác hại của hành vi xấu trên mạng lại trầm trọng hơn xã hội thực?"
            en="Why are damages from online misconduct far more severe than in physical society?"
          />
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          <BilingualText
            vi="Trích nội dung cốt lõi từ SGK Tin học 10 trang 56 giải thích 4 đòn bẩy khuyếch đại tác hại số"
            en="Core analysis from Page 56 outlining the four catalysts compounding online damages"
          />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              <BilingualText vi="Giao tiếp gián tiếp" en="Indirect Communication" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Không đối mặt trực diện làm giảm cảm giác thấu cảm, khiến con người dễ buông lời tàn nhẫn hơn bình thường."
                en="Lack of face-to-face interaction diminishes empathy, prompting people to deploy far more cruel remarks than offline."
              />
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              <BilingualText vi="Tính ẩn danh (Anonymous)" en="Potential Anonymity" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Kẻ xấu ẩn nấp sau các tài khoản ảo, nick phụ khiến việc kiểm soát khó khăn và thúc đẩy hành vi liều lĩnh, vô trách nhiệm."
                en="Perpetrators hide behind burner accounts and pseudonyms, hindering moderation and emboldening reckless, irresponsible aggression."
              />
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              <BilingualText vi="Lưu trữ lâu dài" en="Permanent Digital Footprint" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Mọi tin bài, ảnh, video một khi đã đưa lên mạng sẽ được sao lưu, chụp màn hình và tồn tại vĩnh viễn trên Internet."
                en="Any post, photo, or clip uploaded online can be scraped, screenshotted, and preserved as a permanent digital record."
              />
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
              4
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              <BilingualText vi="Phát tán thần tốc" en="Hyper-Fast Viral Spread" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Thông tin lan truyền đến hàng triệu người trong tích tắc, vượt qua biên giới địa lý mà nạn nhân không thể ngăn chặn."
                en="Information spreads across millions of screens in seconds, transcending geographical borders beyond any victim's containment."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Matrix of 7 Misconduct Behaviors */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
              <BilingualText
                vi="Bảng phân tích 7 loại hành vi xấu khi giao tiếp trên mạng (Trang 56 SGK)"
                en="Detailed Taxonomy of 7 Common Online Misconducts (Page 56)"
              />
            </h3>
            <p className="text-xs text-slate-500">
              <BilingualText
                vi="Nhấp vào từng hành vi để xem chi tiết mức độ nguy hại, tính chất pháp lý và ví dụ thực tế"
                en="Click each malpractice to examine legal classification, damage severity, and case scenarios"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Column: Selector list */}
          <div className="lg:col-span-5 space-y-2">
            {MISCONDUCT_ITEMS.map((item) => {
              const isSelected = item.id === activeItem;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm ring-1 ring-amber-400'
                      : 'bg-slate-50/70 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-amber-600 text-white'
                          : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                        <BilingualText vi={item.nameVi} en={item.nameEn} />
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {bilingualMode === 'en' ? item.legalTypeEn : item.legalTypeVi}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.severity === 'critical'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : item.severity === 'high'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.severity.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Deep-dive Detail Box */}
          <div className="lg:col-span-7 bg-slate-50/90 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <CurrentIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                      {bilingualMode === 'en' ? currentObj.legalTypeEn : currentObj.legalTypeVi}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 dark:text-slate-100">
                      <BilingualText vi={currentObj.nameVi} en={currentObj.nameEn} />
                    </h4>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-900/90 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div className="font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{bilingualMode === 'en' ? 'Nature of Misconduct:' : 'Bản chất hành vi:'}</span>
                </div>
                <BilingualText vi={currentObj.descriptionVi} en={currentObj.descriptionEn} />
              </div>

              <div className="p-3.5 bg-rose-50/80 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div className="font-bold text-rose-800 dark:text-rose-300 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{bilingualMode === 'en' ? 'Real-world Practical Case:' : 'Ví dụ thực tế đời sống:'}</span>
                </div>
                <BilingualText vi={currentObj.realWorldExampleVi} en={currentObj.realWorldExampleEn} />
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-center justify-between">
              <span>{bilingualMode === 'en' ? 'Source: Informatics 10 Textbook Page 56' : 'Nguồn: SGK Tin học 10 Kết nối tri thức Trang 56'}</span>
              <span className="font-bold text-amber-700 dark:text-amber-400">
                {bilingualMode === 'en' ? 'Digital Ethics & Legal Compliance' : 'Tuân thủ đạo đức & pháp luật số'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box 1 (Hộp Ghi nhớ Trang 56 SGK) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 dark:from-amber-950/30 dark:to-orange-950/30 rounded-3xl border-2 border-dashed border-amber-500/60 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-md shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-3 flex-1 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-amber-950 dark:text-amber-200 uppercase tracking-wider text-sm sm:text-base">
                <BilingualText vi="HỘP GHI NHỚ 1 (TRANG 56 SGK)" en="SUMMARY BOX 1 (TEXTBOOK PAGE 56)" />
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-[10px] font-bold">
                {bilingualMode === 'en' ? 'Page 56' : 'Trang 56'}
              </span>
            </div>

            <p className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
              <BilingualText
                vi="Những hành vi vi phạm về đạo đức, pháp luật và văn hoá khi sử dụng mạng gồm:"
                en="Critical violations of ethics, law, and culture when utilizing computer networks include:"
              />
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <div className="flex-1">
                  <BilingualText
                    vi="Đưa tin không phù hợp lên mạng."
                    en="Posting inappropriate or harmful information online."
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <div className="flex-1">
                  <BilingualText
                    vi="Công bố thông tin cá nhân không được phép."
                    en="Disclosing personal data without authorized consent."
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <div className="flex-1">
                  <BilingualText
                    vi="Phát tán thư điện tử, tin nhắn rác."
                    en="Distributing spam emails and unsolicited junk messages."
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <div className="flex-1">
                  <BilingualText
                    vi="Vi phạm bản quyền dữ liệu và phần mềm."
                    en="Violating intellectual property, software, and data copyrights."
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <div className="flex-1">
                  <BilingualText
                    vi="Bắt nạt qua mạng."
                    en="Engaging in cyberbullying and online harassment."
                  />
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">•</span>
                <div className="flex-1">
                  <BilingualText
                    vi="Ứng xử thiếu văn hoá."
                    en="Uncivilized conduct and abusive digital interaction."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Section (Câu hỏi củng cố cuối Mục 1 Trang 56 SGK) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <BilingualText
            vi="Câu hỏi củng cố cuối Mục 1 (Trang 56 SGK)"
            en="Concept Mastery Questions for Section 1 (Page 56)"
          />
        </h3>
        <p className="text-xs text-slate-500">
          <BilingualText
            vi="Em hãy lấy ví dụ về các vấn đề tiêu cực có thể nảy sinh khi tham gia các hoạt động sau trên mạng:"
            en="Provide examples of negative issues that may arise when engaging in the following online activities:"
          />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question a */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3">
            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 flex items-center justify-center text-xs">
                a
              </span>
              <span>{bilingualMode === 'en' ? 'Debating on Facebook' : 'Tranh luận trên Facebook'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Tranh luận trực tuyến về các chủ đề nóng dễ phát sinh mâu thuẫn cá nhân."
                en="Online debates on trending topics often escalate into personal hostility."
              />
            </p>
            <button
              type="button"
              onClick={() => setShowQuestionFbAnswer(!showQuestionFbAnswer)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>
                {showQuestionFbAnswer
                  ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Ẩn ví dụ')
                  : (bilingualMode === 'en' ? 'View Case & Analysis' : 'Xem ví dụ & phân tích')}
              </span>
            </button>
            {showQuestionFbAnswer && (
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-200 dark:border-indigo-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-fadeIn">
                <div>
                  • <strong>{bilingualMode === 'en' ? 'Adverse issues: ' : 'Vấn đề tiêu cực: '}</strong>
                  <BilingualText
                    inline
                    vi="Khi bất đồng quan điểm, các bên dễ chuyển từ tranh luận lý lẽ sang công kích cá nhân (Ad-hominem), dùng từ ngữ tục tĩu xúc phạm, thậm chí bêu riếu ảnh đời tư của nhau."
                    en="When disagreeing, disputants easily slide from factual reasoning into toxic ad-hominem attacks, profanity, and public doxxing of private personal photos."
                  />
                </div>
                <div>
                  • <strong>{bilingualMode === 'en' ? 'Legal & moral consequences: ' : 'Hậu quả: '}</strong>
                  <BilingualText
                    inline
                    vi="Vi phạm chuẩn mực văn hoá và có thể bị xử lý pháp luật nếu vu khống, xúc phạm danh dự nhân phẩm."
                    en="Breaches social civility norms and triggers legal penalties if defamation, slander, or character assassination occurs."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Question b */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3">
            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-700 flex items-center justify-center text-xs">
                b
              </span>
              <span>{bilingualMode === 'en' ? 'Sending Emails' : 'Gửi thư điện tử (Email)'}</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Sử dụng email không đúng chuẩn mực hoặc bị kẻ xấu lợi dụng."
                en="Using email improperly or being exploited by bad actors."
              />
            </p>
            <button
              type="button"
              onClick={() => setShowQuestionEmailAnswer(!showQuestionEmailAnswer)}
              className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>
                {showQuestionEmailAnswer
                  ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Ẩn ví dụ')
                  : (bilingualMode === 'en' ? 'View Case & Analysis' : 'Xem ví dụ & phân tích')}
              </span>
            </button>
            {showQuestionEmailAnswer && (
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-orange-200 dark:border-orange-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-fadeIn">
                <div>
                  • <strong>{bilingualMode === 'en' ? 'Adverse issues: ' : 'Vấn đề tiêu cực: '}</strong>
                  <BilingualText
                    inline
                    vi="Phát tán thư rác (Spam) quảng cáo gây phiền toái; gửi email lừa đảo (Phishing) giả danh ngân hàng; đính kèm mã độc gián điệp đánh cắp dữ liệu."
                    en="Broadcasting nuisance advertising spam; circulating phishing emails impersonating banks; attaching espionage malware to steal credentials."
                  />
                </div>
                <div>
                  • <strong>{bilingualMode === 'en' ? 'Legal & moral consequences: ' : 'Hậu quả: '}</strong>
                  <BilingualText
                    inline
                    vi="Gây nghẽn hệ thống, lừa đảo tài chính và vi phạm Nghị định 90/2008/NĐ-CP về chống thư rác."
                    en="Causes network congestion, financial fraud, and violates Decree 90/2008/ND-CP on anti-spam regulations."
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={11} />

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
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-amber-500/25"
        >
          <span>
            {bilingualMode === 'en' ? 'Section 2: Legal Regulations' : 'Mục 2: Một số quy định pháp lí'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
