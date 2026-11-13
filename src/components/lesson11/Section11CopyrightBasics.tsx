import React, { useState } from 'react';
import {
  FileCode2,
  Scale,
  ShieldCheck,
  Coins,
  UserCheck,
  BookOpen,
  Volume2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Layers,
  FileSpreadsheet,
  AlertCircle,
  Copy,
  Share2,
  Smartphone
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

interface RightItem {
  id: string;
  nameVi: string;
  nameEn: string;
  category: 'moral' | 'economic';
  descriptionVi: string;
  descriptionEn: string;
  exampleVi: string;
  exampleEn: string;
  transferable: boolean;
  articleRef: string;
}

const RIGHTS_DATA: RightItem[] = [
  {
    id: 'name_work',
    nameVi: 'Đặt tên cho tác phẩm',
    nameEn: 'Right to Title the Work',
    category: 'moral',
    descriptionVi: 'Tác giả có quyền duy nhất tự đặt tên cho sáng tạo của mình (ngoại trừ tác phẩm dịch từ tiếng nước ngoài).',
    descriptionEn: 'The author has the exclusive moral prerogative to name their own creation (except direct translations).',
    exampleVi: 'Nhà phát triển đặt tên ứng dụng là "EduTrack 10", không ai được tự ý đổi tên ứng dụng khi chưa có sự đồng ý.',
    exampleEn: 'The developer titles their app "EduTrack 10"; no distributor can alter this name without consent.',
    transferable: false,
    articleRef: 'Điều 19 Khoản 1 Luật SHTT 2019'
  },
  {
    id: 'attribution',
    nameVi: 'Đứng tên thật hoặc bút danh',
    nameEn: 'Right of Attribution & Pseudonym',
    category: 'moral',
    descriptionVi: 'Được ghi nhận tên thật hoặc bút danh trên tác phẩm; được nêu tên khi tác phẩm được công bố, phổ biến.',
    descriptionEn: 'To have true name or pseudonym credited whenever the work is published or utilized.',
    exampleVi: 'Mã nguồn mở hoặc phần mềm thương mại luôn phải ghi rõ tên nhóm tác giả viết code trong phần Credit/About.',
    exampleEn: 'Open source or proprietary code must credit the original developers in the About/Credits modal.',
    transferable: false,
    articleRef: 'Điều 19 Khoản 2 Luật SHTT 2019'
  },
  {
    id: 'publish_work',
    nameVi: 'Công bố tác phẩm',
    nameEn: 'Right to Publish / Disclose',
    category: 'moral',
    descriptionVi: 'Quyết định đưa tác phẩm ra mắt công chúng lần đầu tiên hoặc cho phép người khác công bố tác phẩm.',
    descriptionEn: 'Authorizing the public debut of the work or delegating someone else to release it.',
    exampleVi: 'Một tác giả viết xong bộ dữ liệu huấn luyện AI có quyền quyết định khi nào mới công khai tải lên GitHub.',
    exampleEn: 'A researcher who finished an AI dataset decides precisely when to open-source it on GitHub.',
    transferable: false,
    articleRef: 'Điều 19 Khoản 3 Luật SHTT 2019'
  },
  {
    id: 'integrity',
    nameVi: 'Bảo vệ sự toàn vẹn của tác phẩm',
    nameEn: 'Right of Integrity (Anti-Derogation)',
    category: 'moral',
    descriptionVi: 'Cấm người khác sửa chữa, cắt xén, xuyên tạc tác phẩm dưới bất kì hình thức nào gây phương hại đến danh dự và uy tín của tác giả.',
    descriptionEn: 'Prohibits any mutilation, distortion, or alteration damaging the author honor and professional standing.',
    exampleVi: 'Một bên phân phối không được tự ý xóa logo, sửa mã để chèn mã quảng cáo lừa đảo làm tổn hại danh tiếng tác giả.',
    exampleEn: 'A distributor cannot strip author credits or inject malware into the source code to deceive users.',
    transferable: false,
    articleRef: 'Điều 19 Khoản 4 Luật SHTT 2019'
  },
  {
    id: 'derivative',
    nameVi: 'Làm tác phẩm phái sinh',
    nameEn: 'Right to Create Derivative Works',
    category: 'economic',
    descriptionVi: 'Sáng tạo tác phẩm mới dựa trên tác phẩm gốc như dịch ngôn ngữ, phóng tác, cải biên, biên soạn, chú giải.',
    descriptionEn: 'Adapting the original into new expressions such as translation, porting to mobile, or film adaptations.',
    exampleVi: 'Cải biên phần mềm quản lý thư viện từ phiên bản máy tính desktop sang ứng dụng di động chạy Android/iOS.',
    exampleEn: 'Porting a desktop library management app into a native smartphone Android/iOS application.',
    transferable: true,
    articleRef: 'Điều 20 Khoản 1 Điểm a Luật SHTT 2019'
  },
  {
    id: 'reproduction',
    nameVi: 'Sao chép tác phẩm',
    nameEn: 'Right of Reproduction',
    category: 'economic',
    descriptionVi: 'Tạo ra các bản sao tác phẩm bằng bất kì phương tiện hay hình thức nào (in ấn, sao chép file số, ghi đĩa).',
    descriptionEn: 'Creating digital or physical duplicates of the work through any medium or technological format.',
    exampleVi: 'Nhân bản 1.000 đĩa cài đặt phần mềm hoặc nhân bản mã nhị phân đóng gói ứng dụng lên máy chủ tải xuống.',
    exampleEn: 'Duplicating 1,000 installer packages or hosting executable binaries on cloud download mirrors.',
    transferable: true,
    articleRef: 'Điều 20 Khoản 1 Điểm c Luật SHTT 2019'
  },
  {
    id: 'communication',
    nameVi: 'Truyền đạt tác phẩm đến công chúng',
    nameEn: 'Right of Public Communication',
    category: 'economic',
    descriptionVi: 'Phát sóng, truyền phát qua mạng Internet, mạng viễn thông để công chúng có thể tiếp cận ở mọi nơi, mọi lúc.',
    descriptionEn: 'Broadcasting and transmitting online so the general public can access and stream on demand.',
    exampleVi: 'Đưa khóa học lập trình trực tuyến lên nền tảng website hoặc ứng dụng học tập để học viên đăng ký theo dõi.',
    exampleEn: 'Hosting an interactive coding course on an online e-learning LMS portal for registered students.',
    transferable: true,
    articleRef: 'Điều 20 Khoản 1 Điểm đ Luật SHTT 2019'
  },
  {
    id: 'rental',
    nameVi: 'Cho thuê bản gốc hoặc bản sao',
    nameEn: 'Right of Commercial Rental',
    category: 'economic',
    descriptionVi: 'Cho thuê thương mại bản gốc hoặc bản sao chương trình máy tính hoặc tác phẩm điện ảnh.',
    descriptionEn: 'Commercial rental of computer programs, software licenses, or cinematographic original/reproductions.',
    exampleVi: 'Công ty phần mềm cung cấp dịch vụ cho thuê phần mềm kế toán theo dạng thuê bao hàng tháng (SaaS).',
    exampleEn: 'A software company offering enterprise accounting suites via monthly cloud subscription rentals (SaaS).',
    transferable: true,
    articleRef: 'Điều 20 Khoản 1 Điểm e Luật SHTT 2019'
  }
];

export const Section11CopyrightBasics: React.FC = () => {
  const { isSpeaking, speak, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Interactive state
  const [activeCategory, setActiveCategory] = useState<'all' | 'moral' | 'economic'>('all');
  const [selectedRight, setSelectedRight] = useState<RightItem>(RIGHTS_DATA[0]);
  const [showActivity3Detail, setShowActivity3Detail] = useState(false);
  const [derivativeStep, setDerivativeStep] = useState<number>(0);

  // Mini quiz state for moral vs economic rights
  const [quizAnswer, setQuizAnswer] = useState<Record<string, 'moral' | 'economic' | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const sectionSpeechVi =
    'Mục 3: Quyền tác giả và bản quyền. Phần a: Quyền tác giả. Theo Luật Sở hữu trí tuệ Việt Nam 2019, quyền tác giả đối với tác phẩm số bao gồm hai nhóm: Quyền nhân thân và Quyền tài sản. Quyền nhân thân gắn liền với tác giả, không thể chuyển giao, bao gồm đặt tên, đứng tên, công bố và bảo vệ sự toàn vẹn tác phẩm. Quyền tài sản cho phép khai thác kinh tế, có thể mua bán chuyển nhượng, bao gồm làm tác phẩm phái sinh, sao chép, truyền đạt đến công chúng và cho thuê phần mềm.';
  const sectionSpeechEn =
    'Section 3: Authorship Rights and Copyright. Subsection a: Copyright Foundations. Under the 2019 Vietnam Intellectual Property Law, copyright encompasses two primary branches: Moral Rights and Economic Rights. Moral rights belong intimately to creators and cannot be alienated, including naming, attribution, publication, and integrity. Economic rights govern commercial exploitation and can be licensed or sold, including derivative adaptations, reproduction, public distribution, and software rental.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  const filteredRights = activeCategory === 'all'
    ? RIGHTS_DATA
    : RIGHTS_DATA.filter((r) => r.category === activeCategory);

  const testCases = [
    { id: 't1', titleVi: 'Quyền đặt tên cho chương trình phần mềm vừa viết', titleEn: 'Right to title newly developed software', expected: 'moral' },
    { id: 't2', titleVi: 'Bán bản quyền chuyển ngữ cuốn sách Tin học sang tiếng Anh', titleEn: 'Licensing the English translation of a textbook', expected: 'economic' },
    { id: 't3', titleVi: 'Yêu cầu xóa bản lậu đã tự ý cắt xén mã nguồn của mình', titleEn: 'Demanding removal of a modified cracked binary', expected: 'moral' },
    { id: 't4', titleVi: 'Cho thuê máy chủ chạy hệ quản trị cơ sở dữ liệu theo tháng', titleEn: 'Renting a database server instance on monthly terms', expected: 'economic' }
  ];

  const handleSelectQuiz = (id: string, value: 'moral' | 'economic') => {
    if (quizSubmitted) return;
    setQuizAnswer((prev) => ({ ...prev, [id]: value }));
  };

  const getQuizScore = () => {
    let count = 0;
    testCases.forEach((t) => {
      if (quizAnswer[t.id] === t.expected) count++;
    });
    return count;
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-300 dark:border-amber-700/50 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
              <Scale className="w-3.5 h-3.5" />
              <span>
                {bilingualMode === 'en' ? 'Section 3 • Textbook Page 59' : 'Mục 3 • SGK Trang 59'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              <BilingualText
                vi="3. QUYỀN TÁC GIẢ VÀ BẢN QUYỀN — a) Quyền tác giả"
                en="3. AUTHORSHIP & COPYRIGHT — a) Copyright Foundations"
              />
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Phân định bản chất giữa Quyền tác giả và Bản quyền. Khám phá 2 trụ cột cốt lõi: Quyền nhân thân (Moral Rights) và Quyền tài sản (Economic Rights) theo Luật SHTT 2019."
                en="Distinguishing Author's Rights from Economic Copyright. Mastering the two core pillars: Moral Rights and Economic Rights under the 2019 IP Law."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Activity 3: Interactive Warm-up */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-400 font-black">
            HĐ3
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Hoạt động 3: Tìm hiểu về quyền tác giả (SGK Trang 59)"
                en="Activity 3: Exploring Authorship Rights (Textbook Page 59)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Em hiểu thế nào là quyền tác giả? Tác giả của một tác phẩm (bức tranh, chương trình máy tính) có những quyền gì đối với tác phẩm của mình?"
                en="What is copyright/author's right? What rights does an author possess regarding their digital or artistic creation?"
              />
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <BilingualText vi="Tình huống gợi mở tư duy" en="Exploratory Thought Scenario" />
            </span>
            <button
              type="button"
              onClick={() => setShowActivity3Detail(!showActivity3Detail)}
              className="text-xs font-semibold px-3 py-1 rounded-xl bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 hover:bg-amber-300/60 transition cursor-pointer"
            >
              {showActivity3Detail
                ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Thu gọn phân tích')
                : (bilingualMode === 'en' ? 'Reveal Textbook Concept' : 'Xem giải nghĩa SGK')}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <BilingualText
              vi="Giả sử em cùng đội bạn lập trình một trò chơi học tập môn Tin học được trao giải quốc gia. Một công ty phần mềm muốn đưa trò chơi này vào gói ứng dụng thương mại có thu phí, đồng thời xóa tên nhóm em để ghi tên công ty họ. Điều này có vi phạm quyền tác giả không?"
              en="Suppose your student team programmed a national award-winning educational game. A software firm wants to bundle it into a paid suite while removing your credits. Does this violate authorship rights?"
            />
          </p>

          {showActivity3Detail && (
            <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-800/60 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-fadeIn">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-amber-300/60 dark:border-amber-700/50 space-y-1.5">
                <p className="font-bold text-amber-900 dark:text-amber-300">
                  <BilingualText
                    vi="Định nghĩa chuẩn mực theo Luật Sở hữu trí tuệ 2019:"
                    en="Standard Definition under 2019 IP Law:"
                  />
                </p>
                <p className="italic leading-relaxed">
                  <BilingualText
                    vi="«Quyền tác giả là quyền của tổ chức, cá nhân đối với tác phẩm do mình sáng tạo ra hoặc sở hữu. Vấn đề này liên quan tới cả các biến thể của tác phẩm (tác phẩm phái sinh), khi từ tác phẩm gốc người ta tạo ra các biến thể như dịch sang ngôn ngữ khác hay cải biên để dùng trên điện thoại di động,...»"
                    en="«Authorship right is the right of an organization or individual over the work created or owned by them. This extends to derivative works when variations are derived from the original, such as translations or smartphone software adaptations...»"
                  />
                </p>
                <p className="text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
                  <BilingualText
                    vi={<>✓ Hành vi xóa tên nhóm em vi phạm nghiêm trọng <strong>Quyền nhân thân</strong> (không thể mua bán hay tước đoạt), và đưa vào gói thương mại không xin phép vi phạm <strong>Quyền tài sản</strong>.</>}
                    en={<>✓ Removing your team's credit severely violates <strong>Moral Rights</strong> (inalienable and non-transferable), and commercial distribution without authorization violates <strong>Economic Rights</strong>.</>}
                  />
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Authorship Rights vs Copyright Concept Comparison */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            <BilingualText
              vi="Bản chất: Quyền tác giả (Author's Rights) vs Bản quyền (Copyright)"
              en="Core Distinction: Author's Rights vs Economic Copyright"
            />
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300 font-black text-sm uppercase tracking-wider">
              <UserCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>
                <BilingualText vi="Quyền tác giả (Droit d'auteur)" en="Author's Rights (Droit d'auteur)" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <BilingualText
                vi="Coi người sáng tạo ra tác phẩm (tác giả) là trung tâm và bảo hộ trọn vẹn cả Quyền nhân thân và Quyền tài sản. Tinh thần của tác giả được gắn chặt vĩnh viễn với tác phẩm, không ai được xuyên tạc hay chiếm đoạt danh phận."
                en="Positions the creator at the focal center, safeguarding both Moral and Economic interests. The creator's spiritual connection with the work cannot be alienated, bought, or usurped."
              />
            </p>
            <div className="inline-block px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-[11px] font-bold text-indigo-900 dark:text-indigo-200">
              <BilingualText vi="Thuật ngữ chính thức của Pháp luật Việt Nam" en="Official statutory term in Vietnam law" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-black text-sm uppercase tracking-wider">
              <Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>
                <BilingualText vi="Bản quyền thương mại (Copyright)" en="Commercial Copyright (Copyright)" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <BilingualText
                vi="Bản quyền ưu tiên bảo vệ quyền lợi đầu tư về kinh tế của người sở hữu quyền tác giả hơn là chính tác giả (ví dụ: công ty đầu tư vốn, nhà xuất bản, hãng phim hoặc hãng phát triển phần mềm nắm quyền khai thác tài sản)."
                en="Prioritizes protecting capital investment and commercial return for copyright holders (e.g., publishing houses, software conglomerates, or film studios holding commercial titles)."
              />
            </p>
            <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-[11px] font-bold text-amber-900 dark:text-amber-200">
              <BilingualText
                vi="Thực tế thường gọi chung nhưng khác biệt về trọng tâm"
                en="Commonly used colloquially with differing emphasis"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Two Pillars Interactive Explorer */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600" />
              <BilingualText
                vi="Hai trụ cột quyền tác giả theo Luật Sở hữu trí tuệ 2019"
                en="Two Pillars of Copyright under 2019 Vietnam Intellectual Property Law"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              <BilingualText
                vi="Chọn danh mục để tra cứu quyền nhân thân (Điều 19) và quyền tài sản (Điều 20)"
                en="Filter to inspect Moral Rights (Art. 19) and Economic Rights (Art. 20)"
              />
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 self-start sm:self-auto border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {bilingualMode === 'en' ? 'All (8 Rights)' : 'Tất cả (8 Quyền)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('moral')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeCategory === 'moral'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-indigo-600'
              }`}
            >
              {bilingualMode === 'en' ? 'Moral Rights (4)' : 'Quyền nhân thân (4)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('economic')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeCategory === 'economic'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
              }`}
            >
              {bilingualMode === 'en' ? 'Economic Rights (4)' : 'Quyền tài sản (4)'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Rights List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {filteredRights.map((right) => {
              const isSelected = selectedRight.id === right.id;
              const isMoral = right.category === 'moral';
              return (
                <button
                  type="button"
                  key={right.id}
                  onClick={() => setSelectedRight(right)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? isMoral
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-500 shadow-sm ring-1 ring-indigo-500/30'
                        : 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                      : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`mt-0.5 p-2 rounded-xl shrink-0 ${
                      isMoral
                        ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'
                        : 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {isMoral ? <ShieldCheck className="w-4 h-4" /> : <Coins className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                        {bilingualMode === 'en' ? right.nameEn : right.nameVi}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isMoral
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/70 dark:text-indigo-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-900/70 dark:text-amber-300'
                        }`}
                      >
                        {isMoral ? (bilingualMode === 'en' ? 'Moral' : 'Nhân thân') : (bilingualMode === 'en' ? 'Economic' : 'Tài sản')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {right.articleRef}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detail Card */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                        selectedRight.category === 'moral'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}
                    >
                      {selectedRight.category === 'moral'
                        ? (bilingualMode === 'en' ? 'Moral Right' : 'Quyền Nhân Thân (Moral Right)')
                        : (bilingualMode === 'en' ? 'Economic Right' : 'Quyền Tài Sản (Economic Right)')}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {selectedRight.articleRef}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-1.5">
                    <BilingualText vi={selectedRight.nameVi} en={selectedRight.nameEn} />
                  </h4>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    selectedRight.transferable
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                  }`}
                >
                  {selectedRight.transferable
                    ? (bilingualMode === 'en' ? '✓ Transferable / Licensable' : '✓ Có thể chuyển nhượng / mua bán')
                    : (bilingualMode === 'en' ? '✗ Inalienable / Non-transferable' : '✗ Không thể chuyển nhượng')}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <BilingualText vi="Nội dung pháp lí quy định:" en="Statutory Legal Provisions:" />
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <BilingualText vi={selectedRight.descriptionVi} en={selectedRight.descriptionEn} />
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <BilingualText vi="Ví dụ thực tiễn trong ngành Tin học:" en="Practical Case in Computing & Software:" />
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-amber-50/60 dark:bg-amber-950/20 p-3.5 rounded-2xl border border-amber-200/80 dark:border-amber-900/50">
                  <BilingualText vi={selectedRight.exampleVi} en={selectedRight.exampleEn} />
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>
                {bilingualMode === 'en'
                  ? 'Grounded directly in Textbook Page 59 and Vietnam IP Law 2019.'
                  : 'Căn cứ chính xác theo SGK Tin học 10 Kết nối tri thức Trang 59 & Luật SHTT 2019.'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Derivative Works Sandbox */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50/60 to-purple-50/60 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-800/60 space-y-4">
        <div className="flex items-center gap-3">
          <Smartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Mô phỏng: Tác phẩm phái sinh trong Công nghệ thông tin"
                en="Simulation: Derivative Works in Information Technology"
              />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Khi một phần mềm máy tính được cải biên sang nền tảng điện thoại di động, quy trình bản quyền diễn ra như thế nào?"
                en="When a computer program is ported to mobile platforms, how do copyright requirements apply?"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              step: 0,
              titleVi: '1. Tác phẩm gốc (Original Work)',
              titleEn: '1. Original Source Code',
              descVi: 'Phần mềm desktop do Nhóm A sáng tạo và nắm giữ quyền tác giả bản quyền đầy đủ.',
              descEn: 'Desktop software created and copyrighted by Team A.'
            },
            {
              step: 1,
              titleVi: '2. Thỏa thuận cấp phép (Licensing)',
              titleEn: '2. License Agreement',
              descVi: 'Nhóm B muốn làm app di động phải được tác giả Nhóm A cho phép bằng hợp đồng.',
              descEn: 'Team B must obtain written permission from Team A before porting.'
            },
            {
              step: 2,
              titleVi: '3. Bản phái sinh hoàn thiện',
              titleEn: '3. Completed Derivative App',
              descVi: 'App di động ra mắt nhưng vẫn phải bảo lưu tên tác giả gốc và chia sẻ lợi ích tài sản hợp pháp.',
              descEn: 'Mobile app launches while preserving original credits and royalty terms.'
            }
          ].map((item) => (
            <button
              type="button"
              key={item.step}
              onClick={() => setDerivativeStep(item.step)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                derivativeStep === item.step
                  ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-white'
              }`}
            >
              <h4 className="font-bold text-xs sm:text-sm text-indigo-700 dark:text-indigo-300">
                {bilingualMode === 'en' ? item.titleEn : item.titleVi}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {bilingualMode === 'en' ? item.descEn : item.descVi}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Mini Self-Assessment Quiz */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Thực hành phân loại nhanh: Quyền nhân thân hay Quyền tài sản?"
                en="Quick Classification: Moral Right or Economic Right?"
              />
            </h3>
          </div>

          {quizSubmitted && (
            <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
              {bilingualMode === 'en' ? `Score: ${getQuizScore()}/${testCases.length}` : `Điểm: ${getQuizScore()}/${testCases.length}`}
            </span>
          )}
        </div>

        <div className="space-y-3">
          {testCases.map((item, idx) => {
            const currentSelection = quizAnswer[item.id];
            const isCorrect = currentSelection === item.expected;
            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-500">
                    {bilingualMode === 'en' ? `Scenario #${idx + 1}:` : `Tình huống #${idx + 1}:`}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    <BilingualText vi={item.titleVi} en={item.titleEn} />
                  </p>
                  {quizSubmitted && (
                    <p className={`text-xs font-bold mt-1 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isCorrect ? (
                        <BilingualText vi="✓ Đúng!" en="✓ Correct!" />
                      ) : (
                        <BilingualText
                          vi={`✗ Sai rồi! Đây là ${item.expected === 'moral' ? 'Quyền nhân thân' : 'Quyền tài sản'}.`}
                          en={`✗ Incorrect! This is ${item.expected === 'moral' ? 'Moral Rights' : 'Economic Rights'}.`}
                        />
                      )}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelectQuiz(item.id, 'moral')}
                    disabled={quizSubmitted}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      currentSelection === 'moral'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                    }`}
                  >
                    {bilingualMode === 'en' ? 'Moral Right' : 'Quyền nhân thân'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectQuiz(item.id, 'economic')}
                    disabled={quizSubmitted}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      currentSelection === 'economic'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    {bilingualMode === 'en' ? 'Economic Right' : 'Quyền tài sản'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {!quizSubmitted ? (
            <button
              type="button"
              onClick={() => setQuizSubmitted(true)}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition shadow-sm cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Check Answers' : 'Kiểm tra kết quả'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setQuizAnswer({});
                setQuizSubmitted(false);
              }}
              className="px-5 py-2.5 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Reset Practice' : 'Làm lại thực hành'}
            </button>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={11} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Section 2: Legal Regulations' : 'Mục 2: Một số quy định pháp lí'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-amber-500/25"
        >
          <span>{bilingualMode === 'en' ? 'Section 4: Software Copyright Compliance' : 'Mục 4: Vi phạm bản quyền & Tôn trọng bản quyền'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
