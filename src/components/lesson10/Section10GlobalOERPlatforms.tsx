import React, { useState } from 'react';
import {
  Globe2,
  BookOpen,
  ExternalLink,
  Search,
  CheckCircle2,
  Volume2,
  ShieldCheck,
  Award,
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

interface OERPlatform {
  id: string;
  name: string;
  originVi: string;
  originEn: string;
  badgeVi: string;
  badgeEn: string;
  descriptionVi: string;
  descriptionEn: string;
  url: string;
  category: 'national' | 'global' | 'mooc';
  featuresVi: string[];
  featuresEn: string[];
  licenseTypeVi: string;
  licenseTypeEn: string;
}

const OER_PLATFORMS: OERPlatform[] = [
  {
    id: 'igiaoduc',
    name: 'iGiaoDuc.vn (MOET)',
    originVi: 'Việt Nam',
    originEn: 'Vietnam',
    badgeVi: 'Chính thức SGK',
    badgeEn: 'Official Textbook',
    descriptionVi: 'Hệ thống kho học liệu số trực tuyến quốc gia do Bộ GD&ĐT chủ trì, tích hợp hàng nghìn bài giảng điện tử, video truyền hình, đề thi và sách giáo khoa số hóa chuẩn chương trình GDPT 2018.',
    descriptionEn: 'The national digital educational repository supervised by the Ministry of Education and Training (MOET Vietnam), integrating thousands of verified e-lectures, televised lessons, and curriculum resources.',
    url: 'https://igiaoduc.vn',
    category: 'national',
    featuresVi: ['Bài giảng số hóa theo khối 10', 'Phát thanh truyền hình VTV7', 'Ngân hàng đề thi tham khảo'],
    featuresEn: ['Grade 10 standardized lectures', 'National educational broadcasts', 'Reference assessment items'],
    licenseTypeVi: 'Học liệu công lập mở',
    licenseTypeEn: 'Public Open Access'
  },
  {
    id: 'mit-ocw',
    name: 'MIT OpenCourseWare',
    originVi: 'Hoa Kỳ (USA)',
    originEn: 'United States (USA)',
    badgeVi: 'Khởi xướng 2002',
    badgeEn: 'Pioneer 2002',
    descriptionVi: 'Cái nôi khởi xướng phong trào học liệu mở toàn cầu từ năm 2002 bởi Viện Công nghệ Massachusetts, chia sẻ công khai toàn bộ tài liệu giảng dạy của hơn 2.500 khóa học đại học và sau đại học.',
    descriptionEn: 'The trailblazer of the global OER movement initiated in 2002 by the Massachusetts Institute of Technology, publishing materials from virtually all undergraduate and graduate courses.',
    url: 'https://ocw.mit.edu',
    category: 'global',
    featuresVi: ['Toàn bộ giáo trình khoa học máy tính', 'Đề thi & đáp án đại học thực tế', 'Giấy phép Creative Commons mở'],
    featuresEn: ['Complete computer science syllabus', 'Real midterm/final exam solutions', 'Creative Commons open licensing'],
    licenseTypeVi: 'CC BY-NC-SA',
    licenseTypeEn: 'CC BY-NC-SA'
  },
  {
    id: 'khan-academy',
    name: 'Khan Academy',
    originVi: 'Toàn cầu / Việt ngữ',
    originEn: 'Global / Vietnamese',
    badgeVi: 'K-12 Chuẩn hóa',
    badgeEn: 'Standardized K-12',
    descriptionVi: 'Nền tảng giáo dục phi lợi nhuận cung cấp các bài giảng ngắn, bài tập tương tác thích ứng và lộ trình học tập cá nhân hóa hoàn toàn miễn phí từ toán học đến khoa học máy tính.',
    descriptionEn: 'Nonprofit educational platform delivering high-fidelity micro-lectures, adaptive mastery exercises, and personalized learning pathways across mathematics and computer science.',
    url: 'https://vi.khanacademy.org',
    category: 'global',
    featuresVi: ['Giao diện và thuyết minh tiếng Việt', 'Thuật toán theo dõi tiến độ thích ứng', 'Huy hiệu thành tích cá nhân'],
    featuresEn: ['Full Vietnamese localization', 'Adaptive mastery progress tracking', 'Gamified achievement badging'],
    licenseTypeVi: 'Truy cập mở phi lợi nhuận',
    licenseTypeEn: 'Non-profit Open Access'
  },
  {
    id: 'violet',
    name: 'Thư viện trực tuyến ViOLET',
    originVi: 'Việt Nam',
    originEn: 'Vietnam',
    badgeVi: 'Cộng đồng GV',
    badgeEn: 'Teacher Community',
    descriptionVi: 'Cộng đồng giáo viên lớn nhất Việt Nam chia sẻ hàng triệu giáo án Word, bài giảng PowerPoint và đề kiểm tra bám sát chương trình phổ thông.',
    descriptionEn: 'Vietnam’s largest educator community sharing millions of lesson plans, PowerPoint presentations, and exam question banks aligned with domestic curricula.',
    url: 'https://violet.vn',
    category: 'national',
    featuresVi: ['Tệp slide PowerPoint tải trực tiếp', 'Đóng góp bởi giáo viên các tỉnh', 'Đầy đủ môn Tin học lớp 10'],
    featuresEn: ['Direct PowerPoint slide downloads', 'Crowdsourced from nationwide teachers', 'Comprehensive Grade 10 Informatics'],
    licenseTypeVi: 'Chia sẻ cộng đồng',
    licenseTypeEn: 'Community Shared'
  },
  {
    id: 'coursera',
    name: 'Coursera & edX (MOOC)',
    originVi: 'Quốc tế',
    originEn: 'International',
    badgeVi: 'Chứng chỉ Đại học',
    badgeEn: 'University Certificate',
    descriptionVi: 'Các nền tảng khóa học trực tuyến đại chúng mở (MOOC) liên kết với Stanford, Harvard, Google, IBM mang đến các chứng chỉ nghề nghiệp và kiến thức công nghệ hiện đại.',
    descriptionEn: 'Premier Massive Open Online Course (MOOC) providers partnered with Stanford, Harvard, Google, and IBM for cutting-edge technology certificates and academic audits.',
    url: 'https://www.coursera.org',
    category: 'mooc',
    featuresVi: ['Tùy chọn học dự thính miễn phí (Audit)', 'Dự án thực hành lập trình', 'Diễn đàn thảo luận sinh viên toàn cầu'],
    featuresEn: ['Free audit course participation', 'Hands-on coding lab projects', 'Global peer review community'],
    licenseTypeVi: 'Dự thính mở / Miễn phí cơ bản',
    licenseTypeEn: 'Open Audit / Freemium'
  }
];

export const Section10GlobalOERPlatforms: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, setOriginalPageTarget, nextPage, prevPage } = useBook();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'national' | 'global' | 'mooc'>('all');
  const [activePlatform, setActivePlatform] = useState<string>('igiaoduc');
  const [selectedLicense, setSelectedLicense] = useState<string>('by');
  const [copiedQuery, setCopiedQuery] = useState(false);

  // Search Query Simulator state
  const [searchTarget, setSearchTarget] = useState('Tin học 10 Kết nối tri thức');
  const [fileType, setFileType] = useState('pdf');
  const [siteFilter, setSiteFilter] = useState('edu.vn');

  const generatedSearchString = `"${searchTarget}" filetype:${fileType} site:${siteFilter}`;

  const copySearchToClipboard = () => {
    navigator.clipboard.writeText(generatedSearchString);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  const sectionSpeechVi =
    'Phần 4: Khám phá các nguồn học liệu mở toàn cầu và bản quyền số Creative Commons. Tìm hiểu về sự hình thành phong trào học liệu mở từ sáng kiến của Viện Công nghệ Massachusetts năm 2002; các hệ thống học liệu quốc gia như iGiaoDuc, ViOLET và nền tảng quốc tế như Khan Academy, Coursera; đồng thời nắm vững quy tắc sử dụng các loại giấy phép mở Creative Commons và kỹ thuật tìm kiếm học liệu nâng cao.';
  const sectionSpeechEn =
    'Section 4: Global Open Educational Resources and Creative Commons Licensing. Explore the origins of the open courseware movement launched by MIT in 2002; navigate national hubs like iGiaoDuc and ViOLET alongside international pioneers like Khan Academy and Coursera; master the legal frameworks of Creative Commons open licenses and advanced academic search parameters.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  const filteredPlatforms = selectedCategory === 'all'
    ? OER_PLATFORMS
    : OER_PLATFORMS.filter((p) => p.category === selectedCategory);

  const currentPlatformObj = OER_PLATFORMS.find((p) => p.id === activePlatform) || OER_PLATFORMS[0];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-100">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-10 -translate-y-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-semibold backdrop-blur-sm mb-3">
              <Globe2 className="w-3.5 h-3.5" />
              <span>
                <BilingualText
                  vi="Mở rộng học phần & Pháp lý số"
                  en="Curriculum Extension & Digital Licensing"
                />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="4. Kho học liệu mở toàn cầu & Bản quyền số Creative Commons"
                en="4. Global OER Repositories & Creative Commons Licensing"
              />
            </h2>
            <p className="text-emerald-100 text-sm md:text-base mt-1 max-w-2xl">
              <BilingualText
                vi="Khai phá tiềm nguyên tri thức vô tận của nhân loại qua các kho học liệu mở (OER) hợp chuẩn, từ MIT 2002 đến Cổng dữ liệu giáo dục Việt Nam."
                en="Harness humankind’s open intellectual commons through standardized OER hubs, spanning from MIT 2002 to Vietnam’s National Education Portal."
              />
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={handleSpeak}
              className={`px-3 py-2 border rounded-xl text-xs font-bold transition flex items-center gap-1.5 backdrop-blur-sm shadow-sm cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-500/30 border-amber-300 text-amber-200 animate-pulse'
                  : 'bg-white/15 hover:bg-white/25 border-white/30 text-white'
              }`}
              title={bilingualMode === 'en' ? 'Read aloud overview' : 'Nghe đọc tóm tắt'}
            >
              <Volume2 className="w-4 h-4 text-emerald-200" />
              <span>
                {isSpeaking
                  ? bilingualMode === 'en' ? 'Stop' : 'Dừng'
                  : bilingualMode === 'en' ? 'Listen' : 'Nghe'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setOriginalPageTarget(53)}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/30 rounded-xl text-xs font-medium text-white transition flex items-center gap-1.5 backdrop-blur-sm shadow-sm cursor-pointer"
              title={bilingualMode === 'en' ? 'View textbook page 53' : 'Xem trang SGK gốc 53'}
            >
              <BookOpen className="w-4 h-4 text-emerald-200" />
              <span>{bilingualMode === 'en' ? 'Textbook P. 53-54' : 'SGK Tr. 53-54'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Concept Comparison Card: Traditional Copyright vs. OER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-200 text-base">
                <BilingualText vi="Tài liệu bản quyền truyền thống" en="Traditional All Rights Reserved" />
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-mono">All Rights Reserved (©)</p>
            </div>
          </div>
          <ul className="text-xs text-amber-800 dark:text-amber-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">•</span>
              <span>
                <BilingualText
                  inline
                  vi="Bảo hộ toàn diện: Nghiêm cấm sao chép, trích dẫn quy mô lớn hoặc phân phối lại khi chưa có văn bản chấp thuận của tác giả/nhà xuất bản."
                  en="Full restriction: Prohibits unapproved reproduction, redistribution, or modification without written permission."
                />
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold shrink-0">•</span>
              <span>
                <BilingualText
                  inline
                  vi="Rào cản chi phí: Người học thường phải trả phí bản quyền mua sách, quyền truy cập tạp chí khoa học hoặc trả tiền tải file."
                  en="Paywalls & fees: Learners often encounter paywalls, pay-per-view fees, or costly subscription restrictions."
                />
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-base">
                <BilingualText vi="Học liệu mở (OER - Khởi phát từ MIT 2002)" en="Open Educational Resources (OER - MIT 2002)" />
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">Some Rights Reserved / Open License</p>
            </div>
          </div>
          <ul className="text-xs text-emerald-800 dark:text-emerald-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <BilingualText
                  inline
                  vi="5 quyền tự do (5R): Retain (Lưu trữ), Reuse (Tái sử dụng), Revise (Chỉnh sửa), Remix (Phối trộn) và Redistribute (Phân phối lại)."
                  en="The 5Rs Framework: Retain, Reuse, Revise, Remix, and Redistribute academic assets freely."
                />
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <BilingualText
                  inline
                  vi="Bình đẳng tri thức: Bất kỳ học sinh nào có kết nối mạng đều được tiếp cận kho tri thức chất lượng cao từ các viện trường hàng đầu."
                  en="Educational equity: Every connected student enjoys instant access to world-class academic materials without barrier."
                />
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Platform Directory */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <BilingualText
                vi="Danh bạ các kho học liệu mở uy tín trong nước và thế giới"
                en="Curated Directory of National & Global OER Platforms"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <BilingualText
                vi="Chọn danh mục và nền tảng để khám phá thông tin chi tiết, đường dẫn trực tiếp và tính năng nổi bật"
                en="Filter categories to explore direct links, structural assets, and highlighted features"
              />
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-medium">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BilingualText vi="Tất cả" en="All" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('national')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedCategory === 'national'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BilingualText vi="Việt Nam" en="Vietnam" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('global')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedCategory === 'global'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BilingualText vi="Toàn cầu" en="Global" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('mooc')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                selectedCategory === 'mooc'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <BilingualText vi="Đại học MOOC" en="MOOCs" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Platform Selector Buttons */}
          <div className="lg:col-span-5 space-y-2.5">
            {filteredPlatforms.map((platform) => {
              const isCurrent = platform.id === activePlatform;
              return (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => setActivePlatform(platform.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 shadow-xs ring-1 ring-teal-400'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isCurrent
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {platform.originVi === 'Việt Nam' ? 'VN' : 'GL'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <span>{platform.name}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{bilingualMode === 'en' ? platform.originEn : platform.originVi}</span>
                        <span>•</span>
                        <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
                          {bilingualMode === 'en' ? platform.licenseTypeEn : platform.licenseTypeVi}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                      isCurrent
                        ? 'bg-teal-200 dark:bg-teal-800/60 text-teal-900 dark:text-teal-200'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {bilingualMode === 'en' ? platform.badgeEn : platform.badgeVi}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Platform Detail Showcase */}
          <div className="lg:col-span-7 bg-slate-50/80 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="inline-block px-2.5 py-0.5 bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-200 text-xs font-bold rounded-md mb-1.5">
                    {bilingualMode === 'en' ? currentPlatformObj.originEn : currentPlatformObj.originVi} •{' '}
                    {bilingualMode === 'en' ? currentPlatformObj.licenseTypeEn : currentPlatformObj.licenseTypeVi}
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {currentPlatformObj.name}
                  </h4>
                </div>
                <a
                  href={currentPlatformObj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition"
                >
                  <span>
                    <BilingualText vi="Truy cập kho" en="Open Portal" />
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-5">
                <BilingualText
                  vi={currentPlatformObj.descriptionVi}
                  en={currentPlatformObj.descriptionEn}
                />
              </p>

              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                  <BilingualText vi="Tính năng & Nguồn tài nguyên tiêu biểu:" en="Highlighted Features & Assets:" />
                </h5>
                <div className="space-y-2">
                  {currentPlatformObj.featuresVi.map((featureVi, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span>
                        <BilingualText
                          vi={featureVi}
                          en={currentPlatformObj.featuresEn[idx]}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono text-[11px] truncate max-w-[280px]">
                {currentPlatformObj.url}
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                {bilingualMode === 'en' ? '100% Free for Students' : 'Miễn phí 100% cho học sinh'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Creative Commons (CC) License Decrypter */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
              <BilingualText
                vi="Mô phỏng giấy phép bản quyền mở Creative Commons (CC)"
                en="Creative Commons (CC) Open Licensing Matrix Simulator"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Nhấp vào từng ký hiệu bản quyền mở để hiểu quyền hạn và nghĩa vụ khi sử dụng học liệu trên mạng"
                en="Click open copyright symbols to decode permissions and requirements when utilizing web resources"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            {
              id: 'by',
              code: 'BY (Attribution)',
              nameVi: 'Ghi nhận tác giả',
              nameEn: 'Attribution Required',
              descVi: 'Cho phép sao chép, phân phối, phối trộn nhưng BẮT BUỘC phải ghi rõ nguồn và tên tác giả gốc.',
              descEn: 'Permits distribution and remixing provided credit is given to the original creator.'
            },
            {
              id: 'nc',
              code: 'NC (Non-Commercial)',
              nameVi: 'Phi thương mại',
              nameEn: 'Non-Commercial Only',
              descVi: 'Chỉ được dùng cho học tập, giảng dạy cá nhân; TUYỆT ĐỐI không được bán lấy tiền hoặc kinh doanh.',
              descEn: 'Allows non-commercial adaptation and reuse only; strictly forbids commercial monetization.'
            },
            {
              id: 'sa',
              code: 'SA (Share-Alike)',
              nameVi: 'Chia sẻ tương tự',
              nameEn: 'Share-Alike License',
              descVi: 'Nếu chỉnh sửa, tạo tác phẩm phái sinh từ tài liệu này thì BẮT BUỘC phải phát hành theo đúng giấy phép mở tương tự.',
              descEn: 'Derived adaptations must be distributed under the exact same open licensing conditions.'
            },
            {
              id: 'nd',
              code: 'ND (No-Derivatives)',
              nameVi: 'Không phái sinh',
              nameEn: 'No Derivatives',
              descVi: 'Cho phép chia sẻ toàn văn nhưng KHÔNG ĐƯỢC PHÉP cắt xén, chỉnh sửa, dịch lại hay biến đổi nội dung gốc.',
              descEn: 'Redistribution allowed in original state only; no alterations or derivative translations allowed.'
            }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedLicense(item.id)}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                selectedLicense === item.id
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 shadow-xs ring-1 ring-indigo-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="font-mono text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                {item.code}
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                <BilingualText vi={item.nameVi} en={item.nameEn} />
              </div>
            </button>
          ))}
        </div>

        {/* Selected License Explanation Box */}
        <div className="bg-indigo-900/5 dark:bg-indigo-950/30 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/50 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {selectedLicense === 'by' && (
              <div>
                <strong className="text-indigo-900 dark:text-indigo-300">
                  {bilingualMode === 'en' ? 'CC BY License (Most Permissive): ' : 'Giấy phép CC BY (Tự do nhất): '}
                </strong>
                <BilingualText
                  inline
                  vi="Đây là tiêu chuẩn vàng của học liệu mở OER. Học sinh và giáo viên toàn quyền tải về, biên tập lại, dịch sang tiếng Việt và đưa vào bài thuyết trình, chỉ cần kèm theo một dòng chú thích nguồn tác giả ban đầu."
                  en="The gold standard of open educational resources. Learners and educators are free to download, adapt, translate, and showcase materials provided attribution to the original author is preserved."
                />
              </div>
            )}
            {selectedLicense === 'nc' && (
              <div>
                <strong className="text-indigo-900 dark:text-indigo-300">
                  {bilingualMode === 'en' ? 'CC NC License (Non-Commercial): ' : 'Giấy phép CC NC (Phi thương mại): '}
                </strong>
                <BilingualText
                  inline
                  vi="Rất phổ biến trong các bài giảng số của Bộ GD&ĐT và Viện MIT. Bất kỳ ai cũng có thể dùng miễn phí cho việc tự học tại nhà hoặc dạy học ở trường công, nhưng các trung tâm luyện thi tư nhân không được in ra bán lấy tiền."
                  en="Commonly enforced by MOET and MIT OpenCourseWare. Ideal for self-study and school classrooms, but prohibited from commercial sale or behind paywalled tuition services."
                />
              </div>
            )}
            {selectedLicense === 'sa' && (
              <div>
                <strong className="text-indigo-900 dark:text-indigo-300">
                  {bilingualMode === 'en' ? 'CC SA License (Viral Openness): ' : 'Giấy phép CC SA (Hiệu ứng mở tiếp biến): '}
                </strong>
                <BilingualText
                  inline
                  vi="Tương tự như giấy phép mã nguồn mở GPL của Linux hay Wikipedia. Đảm bảo rằng tài sản tri thức sau khi được cộng đồng nâng cấp sẽ luôn duy trì tính mở mãi mãi, không bị bất kỳ ai đóng gói thành phần mềm đóng."
                  en="Viral openness akin to Wikipedia and GPL. Ensures that downstream improvements contribute back to the public commons rather than being enclosed into proprietary assets."
                />
              </div>
            )}
            {selectedLicense === 'nd' && (
              <div>
                <strong className="text-indigo-900 dark:text-indigo-300">
                  {bilingualMode === 'en' ? 'CC ND License (Verbatim Integrity): ' : 'Giấy phép CC ND (Bảo toàn nguyên bản): '}
                </strong>
                <BilingualText
                  inline
                  vi="Áp dụng cho các văn bản quy phạm pháp luật, đề thi chuẩn hóa quốc gia hoặc các bài nghiên cứu khoa học mà tác giả yêu cầu nội dung phải được đọc chính xác tuyệt đối từng câu chữ."
                  en="Enforced for standardized exams, legal statutes, and peer-reviewed treatises where verbatim integrity must be preserved without distortion."
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Google Search Query Builder for OER */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/30 text-indigo-300">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">
              <BilingualText
                vi="Công cụ xây dựng cú pháp tìm kiếm học liệu nâng cao trên Google"
                en="Google Advanced Search Syntax Constructor for Educational Assets"
              />
            </h3>
            <p className="text-xs text-slate-300">
              <BilingualText
                vi="Sử dụng toán tử filetype: và site: để lọc trực tiếp các tệp giáo trình PDF, slide PPTX từ tên miền giáo dục .edu.vn"
                en="Leverage filetype: and site: operators to isolate curriculum PDFs and slide decks from educational domains"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              <BilingualText vi="Từ khóa nội dung học tập:" en="Curricular Topic Keyword:" />
            </label>
            <input
              type="text"
              value={searchTarget}
              onChange={(e) => setSearchTarget(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-400"
              placeholder={bilingualMode === 'en' ? 'e.g. Informatics 10 Lesson 10' : 'Ví dụ: Tin học 10 Bài 10'}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              <BilingualText vi="Định dạng tệp (filetype:):" en="File Extension (filetype:):" />
            </label>
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
              <option value="pdf">
                {bilingualMode === 'en' ? 'pdf (Document / Digital Textbook)' : 'pdf (Tài liệu / Sách giáo khoa điện tử)'}
              </option>
              <option value="pptx">
                {bilingualMode === 'en' ? 'pptx (PowerPoint Presentation Slides)' : 'pptx (Bài giảng trình chiếu PowerPoint)'}
              </option>
              <option value="docx">
                {bilingualMode === 'en' ? 'docx (Lesson Plan / Word Worksheet)' : 'docx (Giáo án / Phiếu học tập Word)'}
              </option>
              <option value="xlsx">
                {bilingualMode === 'en' ? 'xlsx (Excel Data Sheet)' : 'xlsx (Bảng dữ liệu mẫu Excel)'}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              <BilingualText vi="Tên miền uy tín (site:):" en="Target Domain Scope (site:):" />
            </label>
            <select
              value={siteFilter}
              onChange={(e) => setSiteFilter(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-400 cursor-pointer"
            >
              <option value="edu.vn">
                {bilingualMode === 'en' ? 'edu.vn (Vietnam Educational Domain)' : 'edu.vn (Toàn bộ ngành giáo dục Việt Nam)'}
              </option>
              <option value="moet.gov.vn">
                {bilingualMode === 'en' ? 'moet.gov.vn (MOET Vietnam Portal)' : 'moet.gov.vn (Cổng Bộ Giáo dục & Đào tạo)'}
              </option>
              <option value="igiaoduc.vn">
                {bilingualMode === 'en' ? 'igiaoduc.vn (iGiaoDuc Repository)' : 'igiaoduc.vn (Hệ thống iGiaoDuc)'}
              </option>
              <option value="edu">
                {bilingualMode === 'en' ? 'edu (Global Universities & Academies)' : 'edu (Học viện & Đại học quốc tế)'}
              </option>
            </select>
          </div>
        </div>

        {/* Resulting Generated Query Display */}
        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-slate-400 font-mono shrink-0">
              {bilingualMode === 'en' ? 'Complete Query:' : 'Cú pháp hoàn chỉnh:'}
            </span>
            <code className="text-sm font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800">
              {generatedSearchString}
            </code>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={copySearchToClipboard}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg text-xs font-medium transition flex items-center gap-1.5 cursor-pointer"
            >
              {copiedQuery ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>
                {copiedQuery
                  ? bilingualMode === 'en' ? 'Copied' : 'Đã chép'
                  : bilingualMode === 'en' ? 'Copy' : 'Sao chép'}
              </span>
            </button>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(generatedSearchString)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-xs"
            >
              <span>{bilingualMode === 'en' ? 'Search on Google' : 'Tìm trên Google'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={10} />

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
          className="px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-teal-500/25"
        >
          <span>
            {bilingualMode === 'en' ? 'Section 5: Practice & Exercises' : 'Mục 5: Luyện tập & Vận dụng'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
