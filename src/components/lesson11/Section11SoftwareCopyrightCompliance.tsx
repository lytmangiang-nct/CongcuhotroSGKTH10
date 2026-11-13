import React, { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  Lock,
  Unlock,
  KeyRound,
  FileCode,
  DollarSign,
  Copy,
  Share2,
  Volume2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

interface InfringementItem {
  id: string;
  nameVi: string;
  nameEn: string;
  categoryVi: string;
  categoryEn: string;
  penaltyVi: string;
  penaltyEn: string;
  descriptionVi: string;
  descriptionEn: string;
  practicalExampleVi: string;
  practicalExampleEn: string;
  icon: any;
}

const INFRINGEMENTS: InfringementItem[] = [
  {
    id: 'impersonation',
    nameVi: 'Mạo danh tác giả',
    nameEn: 'Author Impersonation / Usurpation',
    categoryVi: 'Xâm phạm Quyền nhân thân',
    categoryEn: 'Moral Rights Violation',
    penaltyVi: 'Xử phạt theo Nghị định 131/2013/NĐ-CP & buộc công khai xin lỗi',
    penaltyEn: 'Sanctioned under Decree 131/2013/ND-CP plus public retraction',
    descriptionVi: 'Tự nhận mình là tác giả của một chương trình máy tính, thư viện mã nguồn hoặc thuật toán do người khác sáng tạo.',
    descriptionEn: 'Falsely claiming authorship over computer programs, source code libraries, or algorithms authored by others.',
    practicalExampleVi: 'Tải dự án mã nguồn mở trên GitHub về rồi xóa tên lập trình viên gốc, điền tên mình vào để nộp đồ án tốt nghiệp.',
    practicalExampleEn: 'Cloning an open-source GitHub repo, stripping original author names, and claiming it as a graduation project.',
    icon: ShieldAlert
  },
  {
    id: 'unauthorized_publish',
    nameVi: 'Công bố tác phẩm không được phép',
    nameEn: 'Unauthorized Work Disclosure',
    categoryVi: 'Xâm phạm Quyền nhân thân & Kinh doanh',
    categoryEn: 'Moral & Business Release Violation',
    penaltyVi: 'Phạt tiền và bồi thường thiệt hại doanh thu thương mại',
    penaltyEn: 'Fines and compensation for compromised commercial launch value',
    descriptionVi: 'Tiết lộ hoặc phát hành bản thử nghiệm (Alpha/Beta), mã nguồn chưa hoàn thiện ra công chúng khi tác giả hoặc công ty chưa cho phép.',
    descriptionEn: 'Leaking alpha/beta releases or unreleased internal builds into public forums ahead of official company timelines.',
    practicalExampleVi: 'Nhân viên kiểm thử rò rỉ file cài đặt game bom tấn sắp ra mắt lên diễn đàn trước ngày phát hành chính thức.',
    practicalExampleEn: 'A QA tester leaking an unreleased blockbuster game installer onto torrent trackers prior to launch date.',
    icon: Share2
  },
  {
    id: 'integrity_tampering',
    nameVi: 'Sửa chữa, cắt xén, xuyên tạc mã nguồn',
    nameEn: 'Unauthorized Code Modification & Mutilation',
    categoryVi: 'Phá hoại tính toàn vẹn',
    categoryEn: 'Integrity Violation',
    penaltyVi: 'Phạt tiền vi phạm quyền nhân thân theo NĐ 131/2013',
    penaltyEn: 'Fines for mutilating integrity under Decree 131/2013',
    descriptionVi: 'Tự ý can thiệp vào mã máy nhị phân hoặc mã nguồn để xóa bản quyền, chèn mã độc, làm ảnh hưởng đến danh dự của tác giả.',
    descriptionEn: 'Tampering with binaries or source code to strip copyright notices, inject backdoor adware, or distort original functionality.',
    practicalExampleVi: 'Chỉnh sửa file thực thi của một phần mềm kế toán để gỡ bỏ chứng chỉ số và chèn quảng cáo cờ bạc.',
    practicalExampleEn: 'Altering an accounting software executable to strip digital signatures and inject predatory popups.',
    icon: FileCode
  },
  {
    id: 'pirated_software',
    nameVi: 'Sử dụng phần mềm lậu (Piracy)',
    nameEn: 'Commercial Pirated Software Usage',
    categoryVi: 'Xâm phạm Quyền tài sản',
    categoryEn: 'Economic Rights Violation',
    penaltyVi: 'Xử phạt hành chính và thu hồi thiết bị vi phạm',
    penaltyEn: 'Administrative financial penalties and confiscation of devices',
    descriptionVi: 'Sử dụng phần mềm thương mại có tính phí nhưng không mua giấy phép bản quyền (Licence) hợp lệ.',
    descriptionEn: 'Deploying commercial paid software packages without purchasing valid commercial end-user license agreements.',
    practicalExampleVi: 'Doanh nghiệp cài đặt hàng trăm bộ Office và Photoshop lậu cho nhân viên nhằm trốn tiền bản quyền bản quyền.',
    practicalExampleEn: 'An enterprise installing cracked Microsoft Office suites across 200 workstations to dodge licensing costs.',
    icon: AlertTriangle
  },
  {
    id: 'cracking_tools',
    nameVi: 'Bẻ khoá phần mềm (Crack / Patch / Keygen)',
    nameEn: 'Circumventing Protection Measures (Cracking)',
    categoryVi: 'Vô hiệu hóa biện pháp kĩ thuật',
    categoryEn: 'Technical Protection Breach',
    penaltyVi: 'Nghị định 131/2013/NĐ-CP cấm cố ý vô hiệu biện pháp bảo vệ',
    penaltyEn: 'Decree 131 explicitly penalizes bypassing technological DRM protections',
    descriptionVi: 'Cố ý sử dụng công cụ kĩ thuật để phá bỏ cơ chế bảo vệ bản quyền, mã kích hoạt do tác giả thiết lập.',
    descriptionEn: 'Intentionally engineering or utilizing bypass tools to break digital rights management (DRM) or activation locks.',
    practicalExampleVi: 'Viết hoặc chia sẻ các phần mềm "Patch/Keygen" để kích hoạt Windows lậu chia sẻ lên mạng cho mọi người tải.',
    practicalExampleEn: 'Writing and distributing patch generators or KMS emulators online to bypass commercial Windows activation.',
    icon: Unlock
  },
  {
    id: 'illegal_distribution',
    nameVi: 'Phân phối dữ liệu, phần mềm trái phép',
    nameEn: 'Illegal Redistribution & File Sharing',
    categoryVi: 'Xâm phạm Quyền phân phối',
    categoryEn: 'Distribution Rights Violation',
    penaltyVi: 'Xử phạt hành chính và truy cứu trách nhiệm hình sự nếu quy mô lớn',
    penaltyEn: 'Fines and potential criminal prosecution for large-scale operations',
    descriptionVi: 'Tải dữ liệu, giáo trình, ứng dụng có bản quyền rồi re-up lên Google Drive, Mediafire hoặc bán lại kiếm lời.',
    descriptionEn: 'Hosting copyrighted e-books, datasets, or installers on cloud storages or torrent sites for public download.',
    practicalExampleVi: 'Lập trang web chia sẻ link tải hàng nghìn game và phim bản quyền có thu tiền quảng cáo.',
    practicalExampleEn: 'Running a warez website monetizing unauthorized downloads of premium design software via banner ads.',
    icon: Copy
  },
  {
    id: 'source_appropriation',
    nameVi: 'Chiếm đoạt mã nguồn của tổ chức',
    nameEn: 'Source Code Misappropriation / Theft',
    categoryVi: 'Xâm phạm tài sản trí tuệ doanh nghiệp',
    categoryEn: 'Corporate IP Theft',
    penaltyVi: 'Bồi thường thiệt hại hợp đồng lao động & xử lí hình sự',
    penaltyEn: 'Contractual liability compensation and criminal trade secret breach',
    descriptionVi: 'Lập trình viên mang mã nguồn thuộc sở hữu công ty ra ngoài để bán hoặc lập sản phẩm cạnh tranh trái phép.',
    descriptionEn: 'Employees extracting proprietary code repositories owned by employers to establish competing commercial apps.',
    practicalExampleVi: 'Kĩ sư nghỉ việc sao chép mã nguồn lõi hệ thống thanh toán điện tử sang bán cho đối thủ.',
    practicalExampleEn: 'An ex-lead engineer copying proprietary payment gateway engines to sell to a market competitor.',
    icon: Lock
  },
  {
    id: 'unauthorized_reupload',
    nameVi: 'Đăng tải bản phái sinh không được phép',
    nameEn: 'Publishing Unauthorized Derivatives',
    categoryVi: 'Vi phạm quyền phái sinh',
    categoryEn: 'Derivative Rights Violation',
    penaltyVi: 'Buộc gỡ bỏ tác phẩm và bồi hoàn doanh thu',
    penaltyEn: 'Mandatory takedown and restitution of commercial yields',
    descriptionVi: 'Dịch thuật sách số, cải biên giao diện game mà chưa được tác giả hoặc chủ sở hữu cấp phép bằng văn bản.',
    descriptionEn: 'Translating digital publications or rebuilding game assets into new mobile editions without legal licensing.',
    practicalExampleVi: 'Dịch cuốn ebook chuyên ngành tiếng Anh sang tiếng Việt rồi tự ý bán trên Facebook.',
    practicalExampleEn: 'Translating an English technical monograph into Vietnamese and selling the PDF privately on Facebook.',
    icon: Layers
  }
];

export const Section11SoftwareCopyrightCompliance: React.FC = () => {
  const { isSpeaking, speak, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Activity 4 state
  const [act4Answers, setAct4Answers] = useState<{ case1: boolean | null; case2: boolean | null }>({
    case1: null,
    case2: null
  });
  const [showAct4Explanation, setShowAct4Explanation] = useState(false);

  // Selected infringement
  const [selectedInfringement, setSelectedInfringement] = useState<InfringementItem>(INFRINGEMENTS[3]);

  // Quick check quiz at end of section
  const [quiz1Selections, setQuiz1Selections] = useState<string[]>([]);
  const [quiz1Submitted, setQuiz1Submitted] = useState(false);

  const sectionSpeechVi =
    'Mục 4: Vi phạm bản quyền và tôn trọng bản quyền trong tin học. Hoạt động 4 phân tích tình huống Hoàng mua USB chứa nhạc tải lậu và Lan chia sẻ đĩa cài đặt phần mềm một máy sang máy thứ hai. Cả hai trường hợp đều vi phạm bản quyền. Có 8 hành vi vi phạm bản quyền phần mềm phổ biến bao gồm mạo danh, bẻ khóa crack, sử dụng phần mềm lậu, và chiếm đoạt mã nguồn. Người dùng cần phân biệt giữa mua toàn bộ bản quyền và mua quyền sử dụng licence. Nghị định 131 năm 2013 quy định xử phạt nghiêm minh đối với các hành vi truyền đạt, sao chép trái phép và bẻ khóa phần mềm.';
  const sectionSpeechEn =
    'Section 4: Software Copyright Infringements and Compliance. Activity 4 evaluates Hoang buying a USB with pirated songs and Lan installing a single-user CD onto a second PC. Both constitute copyright infringements. Eight prevalent software copyright violations encompass author impersonation, cracking DRM, deploying pirated software, and source code misappropriation. Users must distinguish purchasing full copyright ownership from purchasing an end-user license. Decree 131/2013 strictly penalizes unauthorized reproduction, transmission, and technical lock bypassing.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  const toggleQuiz1Option = (option: string) => {
    if (quiz1Submitted) return;
    setQuiz1Selections((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const isQuiz1Correct =
    quiz1Selections.includes('A') &&
    quiz1Selections.includes('B') &&
    quiz1Selections.includes('C') &&
    !quiz1Selections.includes('D');

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Section Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 border border-rose-300 dark:border-rose-700/50 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>
                {bilingualMode === 'en' ? 'Section 4 • SGK Pages 60–61' : 'Mục 4 • SGK Trang 60–61'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              <BilingualText
                vi="4. VI PHẠM BẢN QUYỀN VÀ TÔN TRỌNG BẢN QUYỀN TRONG TIN HỌC"
                en="4. SOFTWARE COPYRIGHT INFRINGEMENTS & LEGAL COMPLIANCE"
              />
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Nhận diện 8 hành vi vi phạm bản quyền sản phẩm số, phân biệt 'Mua bản quyền' vs 'Mua quyền sử dụng (Licence)' và chế tài Nghị định 131/2013/NĐ-CP."
                en="Identify 8 digital copyright violations, distinguish full ownership from end-user software licensing, and master sanctions under Decree 131/2013/ND-CP."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Activity 4: Interactive Dilemma Case */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800 flex items-center justify-center text-rose-700 dark:text-rose-400 font-black">
            HĐ4
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Hoạt động 4: Tìm hiểu về vi phạm bản quyền (SGK Trang 60)"
                en="Activity 4: Investigating Copyright Infringement (Textbook Page 60)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Ai vi phạm bản quyền trong 2 tình huống sau đây? Hãy chọn đánh giá của em:"
                en="Who committed copyright infringement in these two scenarios? Submit your judgment:"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Situation 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                <BilingualText vi="Tình huống 1: Hoàng và USB nhạc" en="Situation 1: Hoang and the Music USB" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <BilingualText
                vi="Hoàng mua với giá rất rẻ một thẻ nhớ USB chứa các video âm nhạc mà người bán đã sưu tầm từ trên Internet không có thoả thuận gì với tác giả hay ca sĩ biểu diễn."
                en="Hoang buys a cheap USB drive packed with music videos scraped from the internet without any license agreement with authors or performers."
              />
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-semibold text-slate-500">
                {bilingualMode === 'en' ? 'Did Hoang infringe?' : 'Hoàng có vi phạm không?'}
              </span>
              <button
                type="button"
                onClick={() => setAct4Answers((p) => ({ ...p, case1: true }))}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  act4Answers.case1 === true
                    ? 'bg-rose-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {bilingualMode === 'en' ? 'Infringing' : 'Có vi phạm'}
              </button>
              <button
                type="button"
                onClick={() => setAct4Answers((p) => ({ ...p, case1: false }))}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  act4Answers.case1 === false
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {bilingualMode === 'en' ? 'Not Infringing' : 'Không vi phạm'}
              </button>
            </div>
          </div>

          {/* Situation 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <BilingualText vi="Tình huống 2: Lan và đĩa cài đặt CD" en="Situation 2: Lan and the Software CD" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <BilingualText
                vi="Lan mua một phần mềm có bản quyền trên đĩa CD. Sau khi cài đặt lên máy tính của mình, Lan cài thêm trên máy của một bạn thân."
                en="Lan buys copyrighted software on CD. After installing it on her personal PC, she installs it on her close friend's PC as well."
              />
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
              <span className="text-xs font-semibold text-slate-500">
                {bilingualMode === 'en' ? 'Did Lan infringe?' : 'Lan có vi phạm không?'}
              </span>
              <button
                type="button"
                onClick={() => setAct4Answers((p) => ({ ...p, case2: true }))}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  act4Answers.case2 === true
                    ? 'bg-rose-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {bilingualMode === 'en' ? 'Infringing' : 'Có vi phạm'}
              </button>
              <button
                type="button"
                onClick={() => setAct4Answers((p) => ({ ...p, case2: false }))}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  act4Answers.case2 === false
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {bilingualMode === 'en' ? 'Not Infringing' : 'Không vi phạm'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {act4Answers.case1 !== null && act4Answers.case2 !== null
              ? (bilingualMode === 'en' ? '✓ You evaluated both scenarios.' : '✓ Em đã hoàn thành nhận định cho cả 2 tình huống.')
              : (bilingualMode === 'en' ? 'Click your verdict for both scenarios above to view textbook analysis.' : 'Hãy nhấp chọn phán đoán cho cả 2 tình huống trên để mở phân tích SGK.')}
          </p>
          <button
            type="button"
            onClick={() => setShowAct4Explanation(!showAct4Explanation)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition cursor-pointer shadow-sm"
          >
            {showAct4Explanation
              ? (bilingualMode === 'en' ? 'Hide Teacher Key' : 'Ẩn đáp án giáo viên')
              : (bilingualMode === 'en' ? 'Show Official Analysis' : 'Xem giải thích chi tiết SGK')}
          </button>
        </div>

        {showAct4Explanation && (
          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-fadeIn">
            <h4 className="font-bold text-rose-900 dark:text-rose-300">
              <BilingualText
                vi="Kết luận chuẩn xác theo SGK Tin học 10 (Trang 60–61):"
                en="Official Authoritative Conclusion (Pages 60–61):"
              />
            </h4>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <BilingualText
                  vi={<><strong>Tình huống 1: Người bán vi phạm nghiêm trọng bản quyền</strong> vì sao chép và phân phối tác phẩm âm nhạc thương mại không xin phép tác giả/ca sĩ. Hoàng tiếp tay cho hàng lậu bằng việc mua sản phẩm sao chép trái phép.</>}
                  en={<><strong>Situation 1: The vendor committed a severe copyright infringement</strong> by replicating and distributing commercial music recordings without permission. Hoang abets piracy by acquiring illegally replicated goods.</>}
                />
              </li>
              <li>
                <BilingualText
                  vi={<><strong>Tình huống 2: Lan ĐÃ VI PHẠM BẢN QUYỀN!</strong> Khi Lan mua đĩa CD, Lan chỉ mua <em>quyền sử dụng (licence) cho 01 máy tính cá nhân</em>, không mua bản quyền toàn bộ phần mềm. Việc tự ý cài đặt thêm cho máy thứ hai của bạn là hành vi sao chép và chia sẻ vượt quá phạm vi giấy phép cho phép.</>}
                  en={<><strong>Situation 2: Lan INFRINGED COPYRIGHT!</strong> When purchasing the CD, Lan acquired only an <em>end-user license for 01 single workstation</em>, not full copyright. Installing it onto her friend's PC exceeds the authorized license scope.</>}
                />
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 8 Types of Software Copyright Infringement Explorer */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-rose-600" />
            <BilingualText
              vi="8 Hành vi vi phạm bản quyền đối với sản phẩm tin học (SGK Trang 60)"
              en="8 Key Digital Copyright Violations in Computing (Page 60)"
            />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            <BilingualText
              vi="Vi phạm quyền nhân thân hay quyền tài sản đều là vi phạm bản quyền. Nhấp từng hành vi để xem chi tiết mức xử lý pháp lí:"
              en="Breaches of moral or economic rights both constitute copyright violations. Click each item to inspect:"
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Infringement Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
            {INFRINGEMENTS.map((item, idx) => {
              const isSelected = selectedInfringement.id === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedInfringement(item)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 shadow-sm ring-1 ring-rose-500/30'
                      : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center shrink-0 text-xs font-black">
                    {idx + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {bilingualMode === 'en' ? item.nameEn : item.nameVi}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                      {bilingualMode === 'en' ? item.categoryEn : item.categoryVi}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Infringement Detail Panel */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-rose-600 text-white uppercase tracking-wider">
                  {bilingualMode === 'en' ? selectedInfringement.categoryEn : selectedInfringement.categoryVi}
                </span>
                <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-2">
                  <BilingualText vi={selectedInfringement.nameVi} en={selectedInfringement.nameEn} />
                </h4>
                <p className="text-xs text-rose-700 dark:text-rose-400 font-semibold mt-1">
                  ⚖ {bilingualMode === 'en' ? selectedInfringement.penaltyEn : selectedInfringement.penaltyVi}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <BilingualText vi="Bản chất hành vi:" en="Nature of Misconduct:" />
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <BilingualText vi={selectedInfringement.descriptionVi} en={selectedInfringement.descriptionEn} />
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <BilingualText vi="Ví dụ thực tế vi phạm:" en="Practical Infringement Case:" />
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-indigo-50/60 dark:bg-indigo-950/20 p-3.5 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/50">
                  <BilingualText vi={selectedInfringement.practicalExampleVi} en={selectedInfringement.practicalExampleEn} />
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>
                {bilingualMode === 'en'
                  ? 'Cracking DRM even just to test one’s technical ability is strictly prohibited by law.'
                  : 'Lưu ý: Kể cả hành vi bẻ khóa phần mềm (crack) chỉ để thử khả năng mà không dùng vẫn vi phạm pháp luật!'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Buying Copyright vs Buying License (SGK p. 61) */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            <BilingualText
              vi="c) Tôn trọng bản quyền trong tin học: Mua bản quyền vs Mua quyền sử dụng (Licence)"
              en="c) Software Copyright Respect: Full Copyright vs End-User License"
            />
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950">
                <BilingualText vi="Mua bản quyền toàn diện" en="Full Copyright Acquisition" />
              </span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              <BilingualText vi="Chuyển nhượng toàn bộ quyền khai thác" en="Full Copyright Acquisition" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Người mua có quyền thực hiện mọi hoạt động kinh doanh, cải biên, phân phối đối với sản phẩm đó (ví dụ như việc Google mua lại YouTube năm 2006 để toàn quyền phát triển kinh doanh nền tảng)."
                en="The buyer acquires full commercial and distribution rights over the product (e.g., Google acquiring YouTube in 2006 to commercially run the global video platform)."
              />
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-800 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950">
                <BilingualText vi="Mua quyền sử dụng (Licence)" en="End-User License (EULA)" />
              </span>
              <KeyRound className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              <BilingualText vi="Cấp phép sử dụng có giới hạn thiết bị" en="Restricted End-User License" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Chúng ta mua Windows, Microsoft 365, Photoshop đều chỉ là Mua quyền sử dụng cho số máy tính nhất định. Bản quyền gốc vẫn hoàn toàn thuộc về Microsoft/Adobe. Cài vượt quá số máy quy định là hành vi vi phạm pháp luật."
                en="Purchasing Windows, MS 365, or Photoshop only grants usage rights on stipulated device quotas. Copyright remains fully with Microsoft/Adobe. Installing on excess PCs violates license terms."
              />
            </p>
          </div>
        </div>

        {/* Decree 131/2013/ND-CP Enforcement box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-100 to-amber-50 dark:from-slate-800 dark:to-amber-950/30 border border-amber-300 dark:border-amber-700/60 space-y-2">
          <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <BilingualText
              vi="Chế tài Nghị định số 131/2013/NĐ-CP của Chính phủ xử phạt vi phạm bản quyền:"
              en="Sanctions under Government Decree 131/2013/ND-CP on Copyright Violations:"
            />
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-xs text-slate-700 dark:text-slate-300">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <BilingualText
                vi={<><strong>1. Truyền đạt trái phép:</strong> Đưa dữ liệu hoặc phần mềm của người khác lên mạng không được phép sẽ bị xử phạt nặng.</>}
                en={<><strong>1. Unauthorized Transmission:</strong> Uploading others' data or software to the internet without authorization is heavily penalized.</>}
              />
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <BilingualText
                vi={<><strong>2. Sao chép trái phép:</strong> Hành vi sao chép lậu dữ liệu hay phần mềm bị xử phạt hành chính và tịch thu phương tiện.</>}
                en={<><strong>2. Unauthorized Reproduction:</strong> Pirating software or data entails administrative fines and confiscation of equipment.</>}
              />
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <BilingualText
                vi={<><strong>3. Vô hiệu hóa biện pháp kĩ thuật:</strong> Cố ý bẻ khóa (crack) phần mềm để dùng đều bị xử phạt theo luật định.</>}
                en={<><strong>3. Circumventing DRM:</strong> Intentionally cracking software security locks is strictly penalized by statutory law.</>}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box 3 (Hộp Ghi nhớ 3 - SGK Trang 61) */}
      <div className="p-6 rounded-3xl bg-amber-50/90 dark:bg-amber-950/30 border-2 border-dashed border-amber-400 dark:border-amber-700/80 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-black text-amber-950 dark:text-amber-200 text-base sm:text-lg">
            <BilingualText
              vi="Hộp Ghi nhớ 3: Tôn trọng bản quyền trong môi trường số (SGK Trang 61)"
              en="Summary Box 3: Respecting Copyright in the Digital Realm (Page 61)"
            />
          </h3>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <li className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>
              <BilingualText
                vi={<><strong>Quyền tác giả:</strong> Là quyền của tổ chức, cá nhân đối với tác phẩm do mình sáng tạo ra hoặc sở hữu. Khái niệm quyền tác giả và bản quyền không hoàn toàn tương đồng; trong các văn bản pháp luật Việt Nam sử dụng thuật ngữ chính thức là <strong>quyền tác giả</strong>.</>}
                en={<><strong>Authorship Right:</strong> The statutory right of individuals or organizations over works created or owned by them. While authorship rights and copyright share overlapping domains, Vietnamese law officially codifies <strong>Authorship Rights (Quyền tác giả)</strong>.</>}
              />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>
              <BilingualText
                vi={<><strong>Đặc tính sản phẩm số:</strong> Phần mềm và dữ liệu số đặc biệt dễ bị xâm phạm bản quyền do dễ sao chép với chi phí rất thấp và dễ phát tán trên quy mô lớn.</>}
                en={<><strong>Digital Product Characteristics:</strong> Software and digital assets are exceptionally prone to infringement because reproduction requires negligible cost and distribution occurs instantaneously at scale.</>}
              />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>
              <BilingualText
                vi={<><strong>Tác hại xã hội:</strong> Việc vi phạm bản quyền là hành vi vi phạm pháp luật, làm tổn hại đến việc kinh doanh của các chủ sở hữu, ảnh hưởng xấu đến sự phát triển của những ngành tạo ra sản phẩm trí tuệ, trong đó có tin học.</>}
                en={<><strong>Societal Harms:</strong> Copyright infringement violates the law, sabotages intellectual creators' business revenues, and stifles the growth of knowledge economies including information technology.</>}
              />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>
              <BilingualText
                vi={<><strong>Nghĩa vụ công dân số:</strong> Nhà nước đã ban hành nhiều quy định xử lí các hành vi vi phạm bản quyền. Hãy tôn trọng bản quyền để phát triển các ngành tạo ra sản phẩm trí tuệ.</>}
                en={<><strong>Digital Civic Duty:</strong> The state has promulgated strict statutory penalties against copyright violations. Respect copyright compliance to cultivate sustainable innovation.</>}
              />
            </span>
          </li>
        </ul>
      </div>

      {/* End-of-Section Concept Mastery Quiz (SGK Trang 62 Câu 1) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Câu hỏi kiểm tra nhanh (SGK Trang 62 • Câu 1)"
                en="Quick Concept Check (Textbook Page 62 • Question 1)"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {bilingualMode === 'en' ? 'Select all infringing behaviors' : 'Chọn tất cả các hành vi vi phạm'}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
          <BilingualText
            vi={<>Trong các hành vi sau, những hành vi nào là <strong>vi phạm bản quyền</strong>?</>}
            en={<>Among the following behaviors, which ones constitute <strong>copyright infringement</strong>?</>}
          />
        </p>

        <div className="space-y-2.5">
          {[
            { key: 'A', textVi: 'A. Sao chép các đĩa cài đặt phần mềm.', textEn: 'A. Duplicating software installation disks.', isViolation: true },
            { key: 'B', textVi: 'B. Một người bạn của em mua tài khoản học một khoá tiếng Anh trực tuyến. Em mượn tài khoản để cùng học.', textEn: 'B. Borrowing a friend’s paid single-seat online course account to study together.', isViolation: true },
            { key: 'C', textVi: 'C. Phá khoá phần mềm chỉ để thử khả năng phá khoá chứ không dùng.', textEn: 'C. Cracking software security purely to test cracking skills without utilizing.', isViolation: true },
            { key: 'D', textVi: 'D. Em dùng nhờ một phần mềm trên máy tính của bạn.', textEn: 'D. Using a software program on your friend’s computer at their desk.', isViolation: false }
          ].map((opt) => {
            const isChecked = quiz1Selections.includes(opt.key);
            return (
              <button
                type="button"
                key={opt.key}
                onClick={() => toggleQuiz1Option(opt.key)}
                disabled={quiz1Submitted}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isChecked
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 ring-1 ring-indigo-500/30'
                    : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 ${
                    isChecked
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div className="flex-1 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                  <BilingualText vi={opt.textVi} en={opt.textEn} />
                </div>
              </button>
            );
          })}
        </div>

        {quiz1Submitted && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm animate-fadeIn ${
              isQuiz1Correct
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
            }`}
          >
            {isQuiz1Correct ? (
              <p className="font-bold">
                <BilingualText
                  vi="✓ Hoàn toàn chính xác! Các hành vi A, B, C đều vi phạm bản quyền. Hành vi D dùng nhờ trực tiếp trên máy của bạn (máy đã được cấp phép hợp pháp) thì không vi phạm."
                  en="✓ Completely correct! A, B, and C all violate copyright. D (using directly on a friend's licensed computer) is lawful."
                />
              </p>
            ) : (
              <p className="font-bold">
                <BilingualText
                  vi={<>✗ Chưa chính xác. Đáp án đúng là <strong>A, B và C</strong>. Hành vi C dù chỉ phá khoá để thử trình độ cũng vi phạm Nghị định 131/2013; hành vi B chia sẻ tài khoản đơn người dùng vi phạm giấy phép sử dụng.</>}
                  en={<>✗ Incorrect. The correct answers are <strong>A, B, and C</strong>. Cracking (C) violates Decree 131/2013 even if untested; sharing single-seat accounts (B) breaches license agreements.</>}
                />
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          {!quiz1Submitted ? (
            <button
              type="button"
              onClick={() => setQuiz1Submitted(true)}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition shadow-sm cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Submit Selection' : 'Nộp câu trả lời'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setQuiz1Selections([]);
                setQuiz1Submitted(false);
              }}
              className="px-5 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Reset' : 'Làm lại'}
            </button>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={11} />

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Section 3: Copyright Foundations' : 'Mục 3: Quyền tác giả và bản quyền'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-amber-500/25"
        >
          <span>{bilingualMode === 'en' ? 'Section 5: Practice & Applications' : 'Mục 5: Luyện tập & Vận dụng'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
