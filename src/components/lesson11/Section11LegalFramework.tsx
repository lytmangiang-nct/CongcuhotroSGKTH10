import React, { useState } from 'react';
import {
  Gavel,
  Scale,
  FileText,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  HelpCircle,
  Eye,
  Building2,
  FileCheck2,
  DollarSign
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

interface LawDocument {
  id: string;
  nameVi: string;
  nameEn: string;
  code: string;
  year: number;
  scopeVi: string;
  scopeEn: string;
  keyArticlesVi: string[];
  keyArticlesEn: string[];
  penaltySummaryVi: string;
  penaltySummaryEn: string;
}

const STATUTORY_DOCS: LawDocument[] = [
  {
    id: 'luat_an_ninh_mang',
    nameVi: 'Luật An ninh mạng',
    nameEn: 'Cybersecurity Law',
    code: 'Luật số 24/2018/QH14',
    year: 2018,
    scopeVi: 'Bảo vệ an ninh quốc gia, trật tự an toàn xã hội trên không gian mạng và bảo vệ quyền, lợi ích hợp pháp của tổ chức, cá nhân.',
    scopeEn: 'Safeguarding national security, public order, and lawful rights and interests of organizations and individuals in cyberspace.',
    keyArticlesVi: [
      'Điều 8 Khoản 1: Nghiêm cấm thông tin sai sự thật gây hoang mang trong Nhân dân, gây thiệt hại kinh tế - xã hội.',
      'Nghiêm cấm xúc phạm tôn giáo, phân biệt đối xử về giới, phân biệt chủng tộc.',
      'Nghiêm cấm xúi giục, lôi kéo, kích động người khác phạm tội qua mạng.'
    ],
    keyArticlesEn: [
      'Article 8(1): Prohibits disseminating falsehoods provoking public panic or socioeconomic damage.',
      'Prohibits religious defamation, gender discrimination, or racial prejudice.',
      'Prohibits inciting, soliciting, or mobilizing criminal actions via networks.'
    ],
    penaltySummaryVi: 'Tùy theo tính chất có thể bị xử phạt hành chính tiền triệu hoặc truy cứu trách nhiệm hình sự.',
    penaltySummaryEn: 'Subject to multi-million VND administrative fines or criminal prosecution depending on severity.'
  },
  {
    id: 'luat_cntt',
    nameVi: 'Luật Công nghệ thông tin',
    nameEn: 'Law on Information Technology',
    code: 'Luật số 67/2006/QH11',
    year: 2006,
    scopeVi: 'Quy định về hoạt động ứng dụng và phát triển công nghệ thông tin, các biện pháp bảo đảm và quyền, nghĩa vụ của cơ quan, tổ chức, cá nhân.',
    scopeEn: 'Governing IT application, development, safeguards, and legal rights and obligations of entities.',
    keyArticlesVi: [
      'Điều 12 Khoản 2a: Cấm cung cấp thông tin số chống Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam.',
      'Điều 12 Khoản 2b: Cấm kích động bạo lực, dâm ô, đồi trụy, tệ nạn xã hội, mê tín dị đoan.',
      'Điều 12 Khoản 2d: Cấm xuyên tạc, vu khống, xúc phạm uy tín của tổ chức, danh dự, nhân phẩm của công dân.'
    ],
    keyArticlesEn: [
      'Article 12(2a): Prohibits anti-state subversion.',
      'Article 12(2b): Prohibits incitement of violence, obscenity, or superstition.',
      'Article 12(2d): Prohibits slander, defamation, and infringement on personal dignity.'
    ],
    penaltySummaryVi: 'Buộc gỡ bỏ thông tin vi phạm, đền bù thiệt hại và chịu chế tài hành chính.',
    penaltySummaryEn: 'Mandatory takedown of infringing content, civil damages, and administrative sanctions.'
  },
  {
    id: 'nghi_dinh_15',
    nameVi: 'Nghị định số 15/2020/NĐ-CP',
    nameEn: 'Government Decree 15/2020/ND-CP',
    code: 'Nghị định 15/2020/NĐ-CP',
    year: 2020,
    scopeVi: 'Quy định xử phạt vi phạm hành chính trong lĩnh vực bưu chính, viễn thông, tần số vô tuyến điện, công nghệ thông tin và giao dịch điện tử.',
    scopeEn: 'Administrative sanctioning regulations covering telecommunications, IT networks, and electronic transactions.',
    keyArticlesVi: [
      'Điều 101 Khoản 1a: Phạt 10 - 20 triệu đồng hành vi chia sẻ thông tin giả mạo, sai sự thật, vu khống uy tín.',
      'Điều 101 Khoản 1d: Phạt 10 - 20 triệu đồng hành vi thông tin bịa đặt gây hoang mang trong nhân dân.',
      'Điều 101 Khoản 1g: Phạt 10 - 20 triệu đồng chia sẻ hình ảnh bản đồ Việt Nam nhưng không thể hiện đúng chủ quyền quốc gia.'
    ],
    keyArticlesEn: [
      'Article 101(1a): 10–20M VND fine for circulating fabricated hoaxes or defamation.',
      'Article 101(1d): 10–20M VND fine for sensational claims provoking public panic.',
      'Article 101(1g): 10–20M VND fine for publishing maps violating national sovereignty.'
    ],
    penaltySummaryVi: 'Phạt tiền trực tiếp từ 10.000.000đ đến 20.000.000đ + tịch thu tang vật, buộc gỡ bỏ tin.',
    penaltySummaryEn: 'Direct fine of 10,000,000 to 20,000,000 VND + confiscation of exhibits and mandatory content removal.'
  },
  {
    id: 'quyet_dinh_874',
    nameVi: 'Bộ Quy tắc ứng xử trên mạng xã hội',
    nameEn: 'Social Media Code of Conduct (Decision 874)',
    code: 'Quyết định số 874/QĐ-BTTTT',
    year: 2021,
    scopeVi: 'Bộ Thông tin và Truyền thông ban hành nhằm xây dựng chuẩn mực đạo đức, văn hóa ứng xử văn minh và an toàn trên môi trường mạng.',
    scopeEn: 'Ministry of Information and Communications standard fostering civic etiquette and online safety.',
    keyArticlesVi: [
      'Quy tắc Tôn trọng, Tuân thủ pháp luật: Tuân thủ luật pháp Việt Nam và tôn trọng quyền của người khác.',
      'Quy tắc Lành mạnh: Hành vi, ứng xử trên mạng phải phù hợp với giá trị đạo đức, truyền thống văn hóa.',
      'Quy tắc An toàn, Bảo mật thông tin: Tuân thủ quy định bảo mật, không chia sẻ thông tin mật, tin giả.'
    ],
    keyArticlesEn: [
      'Respect & Compliance: Adhering to laws and respecting others’ rights.',
      'Wholesome Decency: Upholding traditional cultural values and civil discourse.',
      'Information Safety: Rejecting hoaxes and keeping private secrets confidential.'
    ],
    penaltySummaryVi: 'Khuyến khích sử dụng họ tên thật và lan tỏa gương người tốt, việc tốt.',
    penaltySummaryEn: 'Encourages real-name identification and sharing inspiring civic role models.'
  }
];

export const Section11LegalFramework: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage, setOriginalPageTarget } = useBook();

  const [activeDocId, setActiveDocId] = useState<string>('nghi_dinh_15');
  const [showCovidAnswer, setShowCovidAnswer] = useState<boolean>(false);
  const [showAdAnswer, setShowAdAnswer] = useState<boolean>(false);

  const sectionSpeechVi =
    'Mục 2: Một số quy định pháp lí đối với người dùng trên mạng. Nhà nước Việt Nam đã ban hành các văn bản pháp luật quan trọng như Luật Công nghệ thông tin 2006, Luật An ninh mạng 2018, Nghị định 15 năm 2020 và Quyết định 874 về Bộ Quy tắc ứng xử trên mạng xã hội. Điều 101 Nghị định 15 quy định mức phạt tiền từ 10 triệu đến 20 triệu đồng đối với hành vi cung cấp, chia sẻ thông tin giả mạo, sai sự thật, vu khống hoặc đăng bản đồ vi phạm chủ quyền. Bốn nguyên tắc an toàn khi chia sẻ thông tin: kiểm tra tính hợp pháp, không chia sẻ tin giả, cân nhắc hậu quả đạo đức và lan tỏa thông tin tích cực.';
  const sectionSpeechEn =
    'Section 2: Legal Regulations for Cyberspace Users. Vietnam has enacted comprehensive legal instruments: IT Law 2006, Cybersecurity Law 2018, Decree 15/2020, and Decision 874 Code of Conduct. Decree 15 Article 101 levies fines between 10 to 20 million VND for circulating false hoaxes, defamation, or unauthorized sovereignty maps. Four core sharing rules: verify legality, reject fake news, weigh moral impacts, and propagate positive civic values.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  const activeDoc = STATUTORY_DOCS.find((d) => d.id === activeDocId) || STATUTORY_DOCS[0];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-indigo-800 via-blue-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-100 text-xs font-bold backdrop-blur-sm mb-3">
              <Gavel className="w-3.5 h-3.5" />
              <span>
                <BilingualText vi="Mục 2 SGK Tin học 10" en="Section 2 • Informatics 10" />
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="2. Một số quy định pháp lí đối với người dùng trên mạng"
                en="2. Legal Regulations & Sanctions for Cyberspace Users"
              />
            </h2>
            <p className="text-indigo-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Nắm vững các bộ luật trụ cột, mức phạt hành chính từ 10 – 20 triệu đồng (Nghị định 15/2020) và 4 nguyên tắc chia sẻ thông tin an toàn."
                en="Master foundational statutes, 10–20M VND administrative fines (Decree 15/2020), and the four golden rules for safe online sharing."
              />
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOriginalPageTarget(57)}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 border border-white/30 rounded-2xl text-xs font-semibold text-white transition-all flex items-center gap-1.5 backdrop-blur-md shadow-sm cursor-pointer"
              title="Xem trang SGK gốc 57"
            >
              <BookOpen className="w-4 h-4 text-indigo-200" />
              <span>{bilingualMode === 'en' ? 'Textbook pp. 57–58' : 'SGK Tr. 57-58'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Statutory Document Navigator */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              <BilingualText
                vi="Hệ thống Văn bản quy phạm pháp luật số tại Việt Nam (Trang 57 SGK)"
                en="Vietnam's Statutory Digital Legal Framework (Page 57)"
              />
            </h3>
            <p className="text-xs text-slate-500">
              <BilingualText
                vi="Chọn từng văn bản pháp lý để tra cứu phạm vi điều chỉnh, điều khoản cấm và mức phạt tương ứng"
                en="Select legislation to examine regulatory scopes, prohibited provisions, and prescribed penalties"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Doc selection buttons */}
          <div className="lg:col-span-4 space-y-2.5">
            {STATUTORY_DOCS.map((doc) => {
              const isSelected = doc.id === activeDocId;
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setActiveDocId(doc.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 shadow-sm ring-1 ring-indigo-400'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                      {bilingualMode === 'en' ? `YEAR ${doc.year}` : `NĂM ${doc.year}`}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{doc.code}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    <BilingualText vi={doc.nameVi} en={doc.nameEn} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Doc detail card */}
          <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {activeDoc.code}
                </span>
                <h4 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  <BilingualText vi={activeDoc.nameVi} en={activeDoc.nameEn} />
                </h4>
              </div>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-xl text-xs font-bold">
                <BilingualText vi="Có hiệu lực thi hành" en="Currently in Force" />
              </span>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                <BilingualText vi="Phạm vi điều chỉnh:" en="Scope of Regulation:" />
              </h5>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <BilingualText vi={activeDoc.scopeVi} en={activeDoc.scopeEn} />
              </p>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                <BilingualText
                  vi="Các điều khoản cấm tiêu biểu (SGK trang 57 – 58):"
                  en="Key Prohibited Provisions (Textbook Pages 57–58):"
                />
              </h5>
              <div className="space-y-2">
                {activeDoc.keyArticlesVi.map((articleVi, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-2.5"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <BilingualText vi={articleVi} en={activeDoc.keyArticlesEn[idx]} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold">
                <DollarSign className="w-4 h-4 text-rose-600" />
                <span>
                  <BilingualText vi="Chế tài & Xử phạt:" en="Sanctions & Penalties:" />
                </span>
              </div>
              <span className="font-semibold text-rose-700 dark:text-rose-400">
                <BilingualText vi={activeDoc.penaltySummaryVi} en={activeDoc.penaltySummaryEn} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box 2: 4 Golden Rules for Online Sharing (Hộp Ghi nhớ Trang 58 SGK) */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-3xl border-2 border-dashed border-emerald-500/60 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-md shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="space-y-3 flex-1 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-emerald-950 dark:text-emerald-200 uppercase tracking-wider text-sm sm:text-base">
                <BilingualText
                  vi="CÁC NGUYÊN TẮC AN TOÀN KHI CHIA SẺ THÔNG TIN TRÊN MÔI TRƯỜNG SỐ (TRANG 58 SGK)"
                  en="SAFETY PRINCIPLES FOR SHARING INFORMATION IN DIGITAL ENVIRONMENTS (PAGE 58)"
                />
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100 text-[10px] font-bold">
                {bilingualMode === 'en' ? 'Page 58' : 'Trang 58'}
              </span>
            </div>

            <div className="space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200/80 dark:border-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <BilingualText
                    vi={<><strong>1. Kiểm tra tính pháp lý:</strong> Trước khi đăng tin, hãy kiểm tra tin bài có vi phạm pháp luật hay không.</>}
                    en={<><strong>1. Verify Legal Compliance:</strong> Before posting, verify whether the article or media infringes applicable laws.</>}
                  />
                </span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200/80 dark:border-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <BilingualText
                    vi={<><strong>2. Tuyệt đối không chia sẻ tin giả:</strong> Không chia sẻ tin bài vi phạm pháp luật. Việc chia sẻ một tin giả chính là tiếp tay cho hành vi tung tin giả.</>}
                    en={<><strong>2. Strictly Reject Fake News:</strong> Do not circulate illegal content. Sharing a fabricated rumor actively abets disinformation dissemination.</>}
                  />
                </span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200/80 dark:border-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <BilingualText
                    vi={<><strong>3. Cân nhắc khía cạnh đạo đức:</strong> Ngay cả trong trường hợp việc đưa tin không vi phạm pháp luật thì cũng phải cân nhắc hậu quả. Một tin vô hại với người này có thể mang lại tai hoạ cho người khác.</>}
                    en={<><strong>3. Weigh Ethical Consequences:</strong> Even if publication doesn't violate statutory law, weigh its repercussions. What seems harmless to one may cause severe harm to others.</>}
                  />
                </span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200/80 dark:border-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <BilingualText
                    vi={<><strong>4. Lan tỏa năng lượng tích cực:</strong> Khuyến khích dùng tên thật, chia sẻ thông tin quảng bá văn hóa đất nước, con người Việt Nam và những tấm gương người tốt việc tốt (Quyết định 874/QĐ-BTTTT).</>}
                    en={<><strong>4. Propagate Positive Energy:</strong> Encourage authentic identities, promote cultural heritage, positive national values, and inspiring civic role models (Decision 874/QD-BTTTT).</>}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Questions for Section 2 (Trang 59 SGK) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base sm:text-lg flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <BilingualText
            vi="Câu hỏi củng cố cuối Mục 2 (Trang 59 SGK)"
            en="Concept Mastery Questions for Section 2 (Page 59)"
          />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1: Covid-19 fake itinerary */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 flex items-center justify-center text-xs">
                1
              </span>
              <span>
                <BilingualText
                  vi="Đăng tin sai lịch trình bệnh nhân Covid-19"
                  en="Publishing False Covid-19 Patient Itinerary"
                />
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Trong đợt bùng phát dịch Covid-19 năm 2021, một cá nhân đăng tin sai về hành trình đi lại của bệnh nhân gây hoang mang cả khu dân cư. Cá nhân này vi phạm điều nào trong các luật CNTT?"
                en="During the 2021 Covid-19 outbreak, an individual published fabricated travel itineraries of a patient, causing mass panic across a residential area. Which statutory articles did this violate?"
              />
            </p>
            <button
              type="button"
              onClick={() => setShowCovidAnswer(!showCovidAnswer)}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>
                {showCovidAnswer
                  ? (bilingualMode === 'en' ? 'Hide Legal Key' : 'Ẩn đáp án pháp lý')
                  : (bilingualMode === 'en' ? 'View Provisions & Fines' : 'Xem điều khoản & mức phạt')}
              </span>
            </button>
            {showCovidAnswer && (
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-fadeIn">
                <BilingualText
                  vi={
                    <>
                      <div>• <strong>Vi phạm:</strong> Điều 8 khoản 1 Luật An ninh mạng (đưa tin sai sự thật gây hoang mang nhân dân) và Điều 12 khoản 2 Luật CNTT.</div>
                      <div>• <strong>Chế tài:</strong> Bị xử phạt theo Điều 101 khoản 1d Nghị định 15/2020/NĐ-CP với mức phạt tiền từ <strong>10.000.000đ đến 20.000.000đ</strong> và buộc gỡ bỏ thông tin sai sự thật.</div>
                    </>
                  }
                  en={
                    <>
                      <div>• <strong>Violation:</strong> Article 8(1) Cybersecurity Law (fabricating falsehoods provoking public panic) and Article 12(2) IT Law.</div>
                      <div>• <strong>Sanctions:</strong> Fined under Decree 15/2020/ND-CP Article 101(1d) from <strong>10,000,000 to 20,000,000 VND</strong> plus mandatory removal of false information.</div>
                    </>
                  }
                />
              </div>
            )}
          </div>

          {/* Question 2: False medicine advertisement */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 flex items-center justify-center text-xs">
                2
              </span>
              <span>
                <BilingualText
                  vi="Quảng cáo sai sự thật về tác dụng của thuốc"
                  en="False Advertising Regarding Pharmaceutical Efficacy"
                />
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Quảng cáo sai về tác dụng của một loại thuốc trị bệnh trên mạng sẽ bị phạt theo mục nào của Điều 101 khoản 1 Nghị định 15/2020/NĐ-CP?"
                en="Deceptive advertising regarding a pharmaceutical remedy's medical efficacy on networks is penalized under which clause of Decree 15/2020/ND-CP Article 101(1)?"
              />
            </p>
            <button
              type="button"
              onClick={() => setShowAdAnswer(!showAdAnswer)}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>
                {showAdAnswer
                  ? (bilingualMode === 'en' ? 'Hide Legal Key' : 'Ẩn đáp án pháp lý')
                  : (bilingualMode === 'en' ? 'View Provisions & Fines' : 'Xem điều khoản & mức phạt')}
              </span>
            </button>
            {showAdAnswer && (
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 animate-fadeIn">
                <BilingualText
                  vi={
                    <>
                      <div>• <strong>Điều khoản:</strong> Bị xử phạt theo <strong>Điểm a hoặc Điểm f</strong> của Điều 101 Khoản 1 Nghị định 15/2020/NĐ-CP (Cung cấp, chia sẻ thông tin sai sự thật hoặc quảng cáo hàng hoá, dịch vụ bị cấm/sai lệch).</div>
                      <div>• <strong>Mức phạt:</strong> Phạt tiền từ <strong>10 đến 20 triệu đồng</strong> đối với cá nhân vi phạm và bồi thường thiệt hại nếu gây ảnh hưởng sức khỏe người tiêu dùng.</div>
                    </>
                  }
                  en={
                    <>
                      <div>• <strong>Statute:</strong> Penalized under <strong>Point a or Point f</strong> of Article 101(1) Decree 15/2020/ND-CP (disseminating falsehoods or deceptive ads for restricted products).</div>
                      <div>• <strong>Sanctions:</strong> Fine of <strong>10 to 20 million VND</strong> on individuals plus civil compensation for any consumer health injuries.</div>
                    </>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={11} />

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
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-indigo-500/25"
        >
          <span>
            {bilingualMode === 'en' ? 'Section 3: Copyright & Moral Rights' : 'Mục 3: Quyền tác giả và bản quyền'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
