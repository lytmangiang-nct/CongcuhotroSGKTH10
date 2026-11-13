import React, { useState } from 'react';
import {
  Scale,
  ShieldAlert,
  HelpCircle,
  Volume2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Users,
  Eye,
  CheckCircle2,
  AlertTriangle,
  HeartHandshake,
  Gavel
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';
import { DigitalEthicsLegal3DViewer } from './DigitalEthicsLegal3DViewer';

export const Section11Overview: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, setOriginalPageTarget } = useBook();

  // Interactive state
  const [showWarmupAnswer, setShowWarmupAnswer] = useState(false);
  const [showActivity1Analysis, setShowActivity1Analysis] = useState(false);
  const [selectedActChoice, setSelectedActChoice] = useState<number | null>(null);

  const sectionSpeechVi =
    'Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số. Bài 11: Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền. Mục tiêu bài học: Nêu được những vấn đề nảy sinh về đạo đức, pháp luật và văn hoá khi giao tiếp qua mạng; giải thích được các nội dung pháp lí liên quan tới việc đưa tin lên mạng và tôn trọng bản quyền thông tin, sản phẩm số. Khởi động phân tích sự khác nhau giữa vi phạm đạo đức và vi phạm pháp luật. Hoạt động 1 mổ xẻ tình huống bạo lực học đường và quay clip phát tán lên mạng xã hội.';
  const sectionSpeechEn =
    'Topic 3: Ethics, Law, and Culture in the Digital Environment. Lesson 11: Behavior in the Digital Environment and Copyright Compliance. Learning objectives: Identify ethical, legal, and cultural dilemmas arising from widespread online communication; interpret key legal provisions concerning online posting and copyright compliance for digital works. Warm-up contrasts moral breaches with statutory legal violations. Activity 1 analyzes school altercation videos uploaded to social networks.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-amber-100 text-xs font-bold backdrop-blur-sm mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>
                <BilingualText
                  vi="Chủ đề 3 • Đạo đức, pháp luật & văn hoá trong môi trường số"
                  en="Topic 3 • Ethics, Law & Culture in Digital Environments"
                />
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              <BilingualText
                vi="BÀI 11: ỨNG XỬ TRÊN MÔI TRƯỜNG SỐ. NGHĨA VỤ TÔN TRỌNG BẢN QUYỀN"
                en="LESSON 11: BEHAVIOR IN CYBERSPACE & COPYRIGHT COMPLIANCE"
              />
            </h1>
            <p className="text-amber-100 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Xây dựng văn hóa ứng xử văn minh, tuân thủ pháp luật an ninh mạng và thực thi trách nhiệm bảo vệ quyền tác giả đối với tài sản trí tuệ trong kỷ nguyên số."
                en="Cultivate civilized digital etiquette, adhere to cybersecurity regulations, and champion intellectual property rights in the modern digital age."
              />
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOriginalPageTarget(55)}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-2xl text-xs font-semibold text-white transition-all flex items-center gap-1.5 backdrop-blur-md shadow-sm cursor-pointer"
              title={bilingualMode === 'en' ? 'View textbook scan page 55' : 'Xem trang SGK gốc 55'}
            >
              <BookOpen className="w-4 h-4 text-amber-200" />
              <span>{bilingualMode === 'en' ? 'SGK P. 55' : 'SGK Tr. 55'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Learning Objectives Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <BilingualText vi="Sau bài học này, em sẽ:" en="Learning Objectives (After this lesson):" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-amber-50/70 dark:bg-amber-950/30 p-3.5 rounded-xl border border-amber-200/80 dark:border-amber-900/50">
            <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-amber-900 dark:text-amber-200">
                {bilingualMode === 'en' ? '1. Digital Ethics, Law & Culture:' : '1. Đạo đức, pháp luật & văn hoá số:'}
              </strong>{' '}
              <BilingualText
                vi="Nêu được những vấn đề nảy sinh về đạo đức, pháp luật và văn hoá khi giao tiếp qua mạng trở nên phổ biến."
                en="Identify the ethical, legal, and cultural issues that arise when digital communication becomes ubiquitous."
              />
            </div>
          </div>

          <div className="flex items-start gap-3 bg-indigo-50/70 dark:bg-indigo-950/30 p-3.5 rounded-xl border border-indigo-200/80 dark:border-indigo-900/50">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="text-indigo-900 dark:text-indigo-200">
                {bilingualMode === 'en' ? '2. Legal Mandates & Copyright Compliance:' : '2. Pháp lí & Tôn trọng bản quyền:'}
              </strong>{' '}
              <BilingualText
                vi="Giải thích được một số nội dung pháp lí liên quan tới việc đưa tin lên mạng và tôn trọng bản quyền thông tin, sản phẩm số."
                en="Explain legal provisions regarding posting online content and respecting copyright for digital products."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Three.js 3D Model: Balance of Justice & IP Shield */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-600" />
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
              <BilingualText
                vi="Phòng thí nghiệm 3D: Cán cân Đạo đức, Luật pháp & Bản quyền"
                en="3D Lab: Scale of Digital Ethics, Statutory Law & IP Rights"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">WebGL • Three.js 360°</span>
        </div>
        <DigitalEthicsLegal3DViewer />
      </div>

      {/* Warm-Up Section: Moral Standards vs Legal Mandates */}
      <div className="bg-gradient-to-br from-slate-50 to-amber-50/40 dark:from-slate-900 dark:to-amber-950/20 rounded-2xl border border-amber-200/80 dark:border-amber-900/40 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
              <BilingualText vi="Khởi động (Trang 55 SGK): Đạo đức khác Pháp luật như thế nào?" en="Warm-up (Page 55): Ethics vs Statutory Law" />
            </h3>
            <p className="text-xs text-slate-500">
              <BilingualText
                vi="Phân biệt hai cơ chế điều chỉnh hành vi của con người trong xã hội thực và trên không gian số"
                en="Distinguishing the two fundamental behavioral regulation mechanisms in society and cyberspace"
              />
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          <BilingualText
            vi="Trong cuộc sống, ai cũng có thể có những xung đột lợi ích với cộng đồng. Pháp luật quy định rõ những hành vi nào là vi phạm mà Nhà nước sẽ cưỡng chế. Những hành vi khác không phù hợp với lợi ích chung sẽ thuộc về vi phạm đạo đức (được điều chỉnh bởi dư luận xã hội và giáo dục). Theo em, những vấn đề về đạo đức và pháp luật nảy sinh khi giao tiếp trên mạng đã và đang trở thành phổ biến là gì?"
            en="In life, conflicting interests with the community inevitably emerge. Law explicitly dictates violations subject to state coercion. Other non-compliant behaviors breach social ethics (regulated by public opinion and education). What common ethical and legal issues arise from online communication?"
          />
        </p>

        <button
          type="button"
          onClick={() => setShowWarmupAnswer(!showWarmupAnswer)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>
            {showWarmupAnswer
              ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Ẩn phân tích')
              : (bilingualMode === 'en' ? 'Reveal Detailed Analysis' : 'Xem giải thích chi tiết')}
          </span>
        </button>

        {showWarmupAnswer && (
          <div className="mt-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800/60 space-y-3 animate-fadeIn text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/50">
                <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                  <HeartHandshake className="w-4 h-4 text-amber-600" />
                  <span>{bilingualMode === 'en' ? 'Breach of Social Ethics (Ethics)' : 'Vi phạm đạo đức (Ethics)'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <BilingualText
                    vi="Bắt nạt qua mạng, dùng lời lẽ thô tục, vô cảm trước nỗi đau người khác, phát tán tin đồn thiếu thiện ý. Biện pháp điều chỉnh: Dư luận xã hội, giáo dục gia đình, nhà trường và sự tự giác của bản thân."
                    en="Cyberbullying, vulgar verbal abuse, callousness towards others' suffering, malicious rumors. Regulated by: Public opinion, family & school guidance, and personal self-discipline."
                  />
                </p>
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-900/50">
                <div className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 mb-1">
                  <Gavel className="w-4 h-4 text-indigo-600" />
                  <span>{bilingualMode === 'en' ? 'Breach of Statutory Law (Law)' : 'Vi phạm pháp luật (Law)'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  <BilingualText
                    vi="Tung tin giả gây hoang mang, xúc phạm danh dự nhân phẩm, vi phạm bản quyền phần mềm, lừa đảo chiếm đoạt tài sản. Biện pháp điều chỉnh: Cưỡng chế Nhà nước, xử phạt hành chính tiền triệu hoặc xử lý hình sự."
                    en="Fabricating viral panic hoaxes, defaming character, pirating software, financial cyber-fraud. Regulated by: State coercion, multi-million VND administrative fines, or penal prosecution."
                  />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Activity 1 (Trang 55 SGK): Case Study Analysis */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
              <BilingualText
                vi="Hoạt động 1 (Trang 55 SGK): Hành vi vi phạm pháp luật hay đạo đức?"
                en="Activity 1 (Page 55): Breach of Law or Breach of Ethics?"
              />
            </h3>
            <p className="text-xs text-slate-500">
              <BilingualText
                vi="Nghiên cứu tình huống mâu thuẫn học đường bị phát tán video lên mạng xã hội"
                en="Analyzing school dispute footage uploaded and disseminated across social networks"
              />
            </p>
          </div>
        </div>

        {/* Case Narrative */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border-l-4 border-rose-500 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
          <BilingualText
            vi="“Do mâu thuẫn ở một diễn đàn trên mạng, một nhóm nữ sinh đánh một bạn nữ khác. Các bạn ở xung quanh đã không can ngăn mà còn quay phim rồi đưa lên mạng xã hội. Do có nhiều bình luận thiếu thiện ý trên mạng xã hội dẫn đến xấu hổ với bạn bè, nạn nhân đã bỏ nhà ra đi không để lại lời nhắn.”"
            en="“After a dispute on an online forum, a group of schoolgirls assaulted another girl. The students nearby did not intervene. Instead, they filmed the incident and uploaded the video to social media. Humiliated in front of her peers by the hostile comments online, the victim left home without leaving a note.”"
          />
        </div>

        {/* Interactive Self-Reflection Buttons */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
            <BilingualText
              vi="Theo em, trong các hành vi trên, hành vi nào vi phạm PHÁP LUẬT?"
              en="In the above incident, which acts violate statutory LAW?"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {[
              { id: 0, labelVi: 'A. Đánh bạn gây thương tích & làm nhục người khác', labelEn: 'A. Assault causing injury & public humiliation' },
              { id: 1, labelVi: 'B. Quay clip và đưa lên mạng xã hội không xin phép', labelEn: 'B. Filming & uploading non-consensual footage' },
              { id: 2, labelVi: 'C. Cả hành vi A và B đều vi phạm pháp luật', labelEn: 'C. Both A and B violate statutory law' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedActChoice(item.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedActChoice === item.id
                    ? item.id === 2
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold'
                      : 'bg-amber-500/20 border-amber-500 text-amber-800 dark:text-amber-200 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <BilingualText vi={item.labelVi} en={item.labelEn} />
              </button>
            ))}
          </div>
        </div>

        {selectedActChoice !== null && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {bilingualMode === 'en'
                  ? 'Authoritative Legal Analysis (Page 56 Textbook):'
                  : 'Phân tích pháp lý chuẩn xác (SGK trang 56):'}
              </span>
            </div>
            <p className="leading-relaxed">
              • <strong>{bilingualMode === 'en' ? 'Statutory Law Violations: ' : 'Hành vi vi phạm pháp luật: '}</strong>
              <BilingualText
                inline
                vi="Đánh bạn đủ tuổi chịu trách nhiệm hình sự (16 tuổi) gây thương tích sẽ bị xử lí hình sự về tội cố ý gây thương tích, làm nhục người khác. Việc quay phim, phát tán video đời tư xúc phạm danh dự người khác vi phạm pháp luật về an ninh mạng và quyền nhân thân."
                en="Assaulting peers when of penal age (16+) causing injury incurs criminal prosecution for intentional injury and public humiliation. Filming and publishing private footage defaming dignity violates cybersecurity laws and personal rights."
              />
            </p>
            <p className="leading-relaxed">
              • <strong>{bilingualMode === 'en' ? 'Ethical Breaches: ' : 'Hành vi vi phạm đạo đức: '}</strong>
              <BilingualText
                inline
                vi="Các bạn đứng xung quanh không can ngăn; việc đưa video lên mạng cổ vũ bạo lực; các tài khoản bình luận miệt thị ác ý (Cyberbullying) khiến nạn nhân bị tổn thương tâm lý trầm trọng."
                en="Bystanders failing to intervene; circulating clips glorifying violence; toxic abusive comments (Cyberbullying) driving the victim into acute psychological distress."
              />
            </p>
            <p className="leading-relaxed">
              • <strong>{bilingualMode === 'en' ? 'Internet Aggravating Factors: ' : 'Yếu tố Internet làm trầm trọng sự việc: '}</strong>
              <BilingualText
                inline
                vi="Tính ẩn danh khiến kẻ xấu phát ngôn tàn nhẫn hơn; tính lưu trữ lâu dài và tốc độ phát tán nhanh không biên giới biến sự việc cục bộ thành cơn bão sỉ nhục công khai, đẩy nạn nhân vào bước đường cùng."
                en="Anonymity emboldens ruthless speech; permanent digital footprint and borderless hyper-fast viral distribution turn a local dispute into a public humiliation storm, driving the victim to despair."
              />
            </p>
          </div>
        )}
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={11} />

      {/* Bottom Navigation */}
      <div className="flex items-center justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-amber-500/25"
        >
          <span>
            {bilingualMode === 'en' ? 'Section 1: Cyber Ethics & Malpractice' : 'Mục 1: Những vấn đề đạo đức, pháp luật và văn hoá'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
