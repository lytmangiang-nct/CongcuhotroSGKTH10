import React, { useState } from 'react';
import {
  Briefcase,
  Award,
  CheckCircle2,
  Code2,
  Smartphone,
  Gamepad2,
  BrainCircuit,
  Globe,
  Layout,
  Compass,
  TrendingUp,
  BookOpen,
  Lock,
  Unlock,
  ArrowRight
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section34CareersPracticeApply: React.FC = () => {
  const {
    bilingualMode,
    navigateToQuiz,
    isAllSectionsComplete,
    completedSections,
    currentLesson
  } = useBook();
  const isEn = bilingualMode === 'en';

  const totalSections = currentLesson.sections.length || 4;
  const completedCount = completedSections.length;
  const remainingCount = Math.max(0, totalSections - completedCount);

  // 6 Career Domains Tabs
  const [activeCareerTab, setActiveCareerTab] = useState<number>(0);

  // University / Career Region filter
  const [regionFilter, setRegionFilter] = useState<'all' | 'north' | 'central' | 'south'>('all');

  // Answers accordion toggle
  const [showPracticeSolutions, setShowPracticeSolutions] = useState<boolean>(false);
  const [showApplySolutions, setShowApplySolutions] = useState<boolean>(false);

  const careerDomains = [
    {
      id: 'app',
      icon: <Code2 className="w-5 h-5 text-indigo-500" />,
      titleVi: 'Lập trình ứng dụng (App Developer)',
      titleEn: 'Application Developer',
      descVi: 'Viết phần mềm máy tính, phần mềm quản trị doanh nghiệp (ERP, CRM), phần mềm nghiệp vụ kế toán, ngân hàng.',
      descEn: 'Build desktop and enterprise applications (ERP, CRM, accounting, and banking systems).',
      tech: ['C# / .NET', 'Java', 'C++', 'Python', 'Qt / Electron'],
      rolesVi: 'Kỹ sư phần mềm ứng dụng, lập trình viên hệ thống quản lý.',
      rolesEn: 'Application Software Engineer, Enterprise Management System Developer.',
      demandVi: 'Rất cao tại doanh nghiệp & ngân hàng',
      demandEn: 'Very high in enterprises & banking'
    },
    {
      id: 'ui',
      icon: <Layout className="w-5 h-5 text-pink-500" />,
      titleVi: 'Phát triển giao diện người dùng (UI/UX Frontend)',
      titleEn: 'UI/UX Frontend Developer',
      descVi: 'Xây dựng trải nghiệm trực quan, thẩm mỹ, thân thiện với người dùng, kết nối tương tác người - máy mượt mà.',
      descEn: 'Build intuitive, visually engaging, and responsive user interfaces with seamless human-computer interaction.',
      tech: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Figma'],
      rolesVi: 'Frontend Engineer, UI/UX Developer, Design Technologist.',
      rolesEn: 'Frontend Engineer, UI/UX Developer, Design Technologist.',
      demandVi: 'Nhu cầu bùng nổ trong thương mại điện tử',
      demandEn: 'Booming demand in digital commerce'
    },
    {
      id: 'webcloud',
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      titleVi: 'Web & Điện toán đám mây (Web & Cloud / Backend)',
      titleEn: 'Web & Cloud Systems Developer',
      descVi: 'Phát triển các nền tảng web quy mô lớn, dịch vụ điện toán đám mây, kiến trúc Microservices và cơ sở dữ liệu khổng lồ.',
      descEn: 'Build scalable web platforms, cloud services, microservices architectures, and large-scale databases.',
      tech: ['Node.js', 'Go', 'Python / Django', 'Docker', 'AWS / GCP', 'PostgreSQL'],
      rolesVi: 'Backend Engineer, Fullstack Developer, Cloud Architect, DevOps Engineer.',
      rolesEn: 'Backend Engineer, Fullstack Developer, Cloud Architect, DevOps Engineer.',
      demandVi: 'Trụ cột hạ tầng số toàn cầu',
      demandEn: 'Backbone of global internet services'
    },
    {
      id: 'ai',
      icon: <BrainCircuit className="w-5 h-5 text-violet-500" />,
      titleVi: 'Trí tuệ nhân tạo & Máy học (AI / Machine Learning)',
      titleEn: 'AI & Machine Learning Engineer',
      descVi: 'Nghiên cứu và phát triển các mô hình học máy, thị giác máy tính, xử lý ngôn ngữ tự nhiên, hệ gợi ý thông minh.',
      descEn: 'Design and deploy machine learning models, computer vision, NLP, and intelligent recommendation systems.',
      tech: ['Python', 'PyTorch', 'TensorFlow', 'LLMs / Gemini', 'LangChain', 'Scikit-learn'],
      rolesVi: 'AI Engineer, Machine Learning Specialist, Data Scientist, Prompt Engineer.',
      rolesEn: 'AI Engineer, Machine Learning Specialist, Data Scientist, Prompt Engineer.',
      demandVi: 'Xu thế công nghệ 4.0 hàng đầu',
      demandEn: 'Top-tier Industry 4.0 growth field'
    },
    {
      id: 'game',
      icon: <Gamepad2 className="w-5 h-5 text-amber-500" />,
      titleVi: 'Phát triển Game (Game Developer)',
      titleEn: 'Game Development Engineer',
      descVi: 'Thiết kế logic gameplay, vật lý đồ họa 2D/3D, cơ chế chiến đấu và trải nghiệm tương tác giải trí số đỉnh cao.',
      descEn: 'Program gameplay logic, 2D/3D graphics physics, multiplayer networking, and interactive digital entertainment.',
      tech: ['Unity (C#)', 'Unreal Engine (C++)', 'Godot', 'WebGL / Three.js', 'Blender'],
      rolesVi: 'Game Gameplay Programmer, 3D Engine Developer, Technical Artist.',
      rolesEn: 'Gameplay Programmer, 3D Engine Developer, Technical Artist.',
      demandVi: 'Ngành công nghiệp tỉ đô tăng trưởng mạnh',
      demandEn: 'Multi-billion-dollar global export industry'
    },
    {
      id: 'mobile',
      icon: <Smartphone className="w-5 h-5 text-emerald-500" />,
      titleVi: 'Phát triển ứng dụng di động (Mobile App Developer)',
      titleEn: 'Mobile App Developer',
      descVi: 'Lập trình ứng dụng trên smartphone, tablet chạy iOS và Android, tối ưu hóa pin, hiệu năng và tương tác cảm ứng.',
      descEn: 'Build mobile apps for iOS and Android smartphones/tablets, optimizing battery life, performance, and touch UX.',
      tech: ['Flutter (Dart)', 'React Native', 'Swift (iOS)', 'Kotlin (Android)'],
      rolesVi: 'Mobile Engineer, iOS/Android Developer, Cross-platform App Builder.',
      rolesEn: 'Mobile Engineer, iOS/Android Developer, Cross-platform App Builder.',
      demandVi: 'Cốt lõi dịch vụ số (Fintech, Siêu ứng dụng)',
      demandEn: 'Core of everyday digital & fintech apps'
    }
  ];

  const universities = [
    {
      nameVi: 'Đại học Bách Khoa Hà Nội (HUST)',
      nameEn: 'Hanoi University of Science and Technology (HUST)',
      region: 'north',
      codesVi: ['A00 (Toán-Lý-Hóa)', 'A01 (Toán-Lý-Anh)'],
      codesEn: ['A00', 'A01'],
      majorsVi: 'Khoa học máy tính (IT1), Kỹ thuật phần mềm (IT2), Trí tuệ nhân tạo (IT-E10)',
      majorsEn: 'Computer Science (IT1), Software Engineering (IT2), Artificial Intelligence (IT-E10)',
      highlightVi: 'Top 1 đào tạo kỹ thuật tinh hoa miền Bắc, chuẩn kiểm định quốc tế.',
      highlightEn: 'Leading engineering university in Northern Vietnam with internationally accredited programs.'
    },
    {
      nameVi: 'Đại học Công nghệ - ĐHQG Hà Nội (UET)',
      nameEn: 'VNU University of Engineering and Technology (UET)',
      region: 'north',
      codesVi: ['A00', 'A01', 'D01 (Toán-Văn-Anh)'],
      codesEn: ['A00', 'A01', 'D01'],
      majorsVi: 'Công nghệ thông tin, Kỹ thuật phần mềm, Hệ thống thông tin',
      majorsEn: 'Information Technology, Software Engineering, Information Systems',
      highlightVi: 'Đơn vị nòng cốt đạt nhiều giải vô địch Olympic Tin học sinh viên và ACM/ICPC.',
      highlightEn: 'Core powerhouse with numerous Student Informatics Olympiad and ICPC programming champions.'
    },
    {
      nameVi: 'Học viện Công nghệ Bưu chính Viễn thông (PTIT)',
      nameEn: 'Posts and Telecommunications Institute of Technology (PTIT)',
      region: 'north',
      codesVi: ['A00', 'A01'],
      codesEn: ['A00', 'A01'],
      majorsVi: 'Kỹ thuật phần mềm, An toàn thông tin, Khoa học dữ liệu',
      majorsEn: 'Software Engineering, Information Security, Data Science',
      highlightVi: 'Mạng lưới đối tác doanh nghiệp viễn thông công nghệ cực kỳ gắn kết.',
      highlightEn: 'Close industry partnerships with major telecommunications and tech enterprises.'
    },
    {
      nameVi: 'Đại học Bách Khoa - ĐHQG TP.HCM (HCMUT)',
      nameEn: 'Ho Chi Minh City University of Technology (HCMUT)',
      region: 'south',
      codesVi: ['A00', 'A01'],
      codesEn: ['A00', 'A01'],
      majorsVi: 'Kỹ thuật máy tính, Khoa học máy tính, Kỹ thuật phần mềm',
      majorsEn: 'Computer Engineering, Computer Science, Software Engineering',
      highlightVi: 'Trung tâm đào tạo kỹ sư công nghệ hàng đầu khu vực phía Nam.',
      highlightEn: 'Premier engineering education hub in Southern Vietnam.'
    },
    {
      nameVi: 'Đại học Công nghệ Thông tin - ĐHQG TP.HCM (UIT)',
      nameEn: 'University of Information Technology - VNU-HCM (UIT)',
      region: 'south',
      codesVi: ['A00', 'A01', 'D01'],
      codesEn: ['A00', 'A01', 'D01'],
      majorsVi: 'Kỹ thuật phần mềm, Thương mại điện tử, Trí tuệ nhân tạo, Thiết kế vi mạch',
      majorsEn: 'Software Engineering, E-Commerce, AI, Microchip Design',
      highlightVi: 'Trường đại học chuyên ngành CNTT tiên phong với tỷ lệ sinh viên có việc làm 99%.',
      highlightEn: 'Specialized IT university with a 99% graduate employment rate.'
    },
    {
      nameVi: 'Đại học Bách Khoa - Đại học Đà Nẵng (DUT)',
      nameEn: 'Danang University of Science and Technology (DUT)',
      region: 'central',
      codesVi: ['A00', 'A01'],
      codesEn: ['A00', 'A01'],
      majorsVi: 'Công nghệ thông tin (Đặc thù Kỹ thuật phần mềm), Khoa học máy tính',
      majorsEn: 'Information Technology (Software Engineering Track), Computer Science',
      highlightVi: 'Cái nôi nhân lực CNTT chất lượng cao cho trung tâm công nghệ miền Trung.',
      highlightEn: 'Key talent cradle for Central Vietnam’s growing software and tech hub.'
    },
    {
      nameVi: 'Đại học FPT (Hà Nội, Đà Nẵng, TP.HCM, Cần Thơ, Quy Nhơn)',
      nameEn: 'FPT University (Hanoi, Da Nang, HCMC, Can Tho, Quy Nhon)',
      region: 'all',
      codesVi: ['A00', 'A01', 'D01', 'Học bạ / ĐGNL'],
      codesEn: ['A00', 'A01', 'D01', 'Transcript / Competency'],
      majorsVi: 'Kỹ thuật phần mềm, Trí tuệ nhân tạo, An toàn thông tin, Thiết kế đồ họa',
      majorsEn: 'Software Engineering, Artificial Intelligence, Information Security, Graphic Design',
      highlightVi: '100% học bằng tiếng Anh, kỳ thực tập OJT tại doanh nghiệp từ năm 3.',
      highlightEn: 'English-medium instruction with mandatory On-the-Job Training (OJT) from Year 3.'
    }
  ];

  const filteredUnis =
    regionFilter === 'all'
      ? universities
      : universities.filter((u) => u.region === regionFilter || u.region === 'all');

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* HEADER SECTION 3 */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 bg-linear-to-br from-indigo-900 via-blue-900 to-slate-900 text-white p-8 md:p-10 shadow-2xl border border-indigo-700/50">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950 border border-indigo-400/40 text-indigo-200 text-xs font-semibold tracking-wide uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{isEn ? 'Section 3 • Textbook pp. 163–164' : 'Mục 3 • SGK Trang 163 – 164'}</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            {isEn ? 'Software Development Careers & Opportunities' : 'Công Việc Phát Triển Phần Mềm & Cơ Hội Nghề Nghiệp'}
          </h2>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed">
            {isEn
              ? 'Explore the 6 major domains of software engineering, STEM recruitment demand in Vietnam 4.0, university pathways, digital recruitment platforms, and textbook exercise solutions.'
              : 'Khám phá 6 lĩnh vực nghề nghiệp chính trong phát triển phần mềm, nhu cầu nhân lực STEM bùng nổ trong cách mạng công nghiệp 4.0, các khối thi đại học và bài tập Luyện tập - Vận dụng SGK.'}
          </p>
        </div>
      </div>

      {/* 1. HOẠT ĐỘNG 3: KHÁM PHÁ CÁCH TRỞ THÀNH DEVELOPER */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xs">
            {isEn ? 'ACT 3' : 'HĐ3'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {isEn ? 'Activity 3: Work of a Software Developer' : 'Hoạt động 3: Công việc của người phát triển phần mềm'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isEn ? 'Opening inquiry for Section 3 (Textbook Page 163)' : 'Câu hỏi gợi mở đầu mục 3 (SGK Trang 163)'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-slate-800 dark:text-slate-200 space-y-3">
          <p className="font-medium text-slate-900 dark:text-slate-100 italic">
            {isEn
              ? '“Do you know how one becomes a software developer? What career opportunities exist for people working in software development?”'
              : '“Em có biết làm thế nào để trở thành người tham gia phát triển phần mềm? Theo em có những cơ hội nghề nghiệp nào cho người phát triển phần mềm?”'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-sm">
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1 shadow-2xs">
              <span className="font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                {isEn ? 'Pathways to Enter the Field' : 'Con đường gia nhập'}
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {isEn
                  ? 'Start with foundational programming courses at vocational schools, training centers, software companies, or pursue formal College/University degrees in IT or Software Engineering.'
                  : 'Bắt đầu từ các khóa đào tạo lập trình cơ bản tại các trường nghề, trung tâm đào tạo, công ty hoặc học chính quy bậc Cao đẳng, Đại học ngành Công nghệ thông tin / Kỹ thuật phần mềm.'}
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1 shadow-2xs">
              <span className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                {isEn ? 'Wide-Open Career Opportunities' : 'Cơ hội việc làm rộng mở'}
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {isEn
                  ? 'Every sector in society (healthcare, education, commerce, entertainment, banking, logistics...) relies on software. Software talent consistently accounts for the highest share of IT recruitment.'
                  : 'Tất cả lĩnh vực trong xã hội (y tế, giáo dục, thương mại, giải trí, ngân hàng, giao thông...) đều cần phần mềm. Nhu cầu nhân lực phần mềm luôn chiếm tỉ lệ cao nhất trong ngành CNTT.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SÁU LĨNH VỰC NGHỀ NGHIỆP PHÁT TRIỂN PHẦN MỀM (SGK TRANG 163) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {isEn ? 'Technical Specialization' : 'Chuyên Môn Hóa Kỹ Thuật'}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {isEn ? '6 Major Software Development Domains' : '6 Lĩnh Vực Nghề Nghiệp Phát Triển Phần Mềm'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {isEn
              ? 'Per Textbook page 163, after completing training programs, software developers can specialize across these 6 core domains:'
              : 'Theo SGK Trang 163, sau khi tốt nghiệp các khóa học, người phát triển phần mềm có thể lựa chọn chuyên môn hóa trong các lĩnh vực sau:'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {careerDomains.map((domain, index) => {
            const isActive = activeCareerTab === index;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setActiveCareerTab(index)}
                className={`flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-[1.02]'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-white dark:bg-slate-900'}`}>
                  {domain.icon}
                </div>
                <span className="text-xs font-semibold line-clamp-2">
                  {isEn ? domain.titleEn : domain.titleVi.split(' (')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Detail Card */}
        {(() => {
          const cur = careerDomains[activeCareerTab];
          return (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-indigo-200 dark:border-indigo-900/60 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
                    {cur.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {isEn ? cur.titleEn : cur.titleVi}
                    </h4>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                      {isEn ? cur.rolesEn : cur.rolesVi}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {isEn ? cur.demandEn : cur.demandVi}
                </span>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {isEn ? cur.descEn : cur.descVi}
              </p>

              <div>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide block mb-2">
                  {isEn ? 'Representative Technologies & Languages:' : 'Công nghệ & Ngôn ngữ tiêu biểu:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {cur.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 shadow-2xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 3. BỐI CẢNH CMCN 4.0 & KÊNH TUYỂN DỤNG SỐ (SGK TRANG 163 - 164) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              {isEn ? 'STEM & Industry 4.0 Demand in Vietnam' : 'Nhu cầu STEM & CMCN 4.0 tại Việt Nam'}
            </h4>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {isEn ? (
              <>
                In Vietnam, software development is consistently ranked among the most valued careers across engineering, technology, and <strong>STEM</strong> disciplines.
              </>
            ) : (
              <>
                Ở Việt Nam, phát triển phần mềm luôn là công việc được đánh giá rất cao trong lĩnh vực kỹ thuật, công nghệ và các khối ngành liên quan đến <strong>STEM</strong>.
              </>
            )}
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>
                {isEn ? (
                  <>
                    <strong>Major domestic employers recruiting continuously:</strong> FPT, Viettel, VNPT, CMC, VNG, MoMo, VNPay...
                  </>
                ) : (
                  <>
                    <strong>Các tập đoàn lớn tuyển dụng liên tục:</strong> FPT, Viettel, VNPT, CMC, VNG, MoMo, VNPay...
                  </>
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span>
                {isEn ? (
                  <>
                    <strong>Emerging tech waves:</strong> AI, Internet of Things (IoT), Cloud Computing, and Blockchain generate hundreds of thousands of new engineering roles.
                  </>
                ) : (
                  <>
                    <strong>Làn sóng công nghệ mới:</strong> Trí tuệ nhân tạo (AI), IoT, Điện toán đám mây (Cloud), Chuỗi khối (Blockchain) tạo ra hàng trăm nghìn vị trí việc làm mới.
                  </>
                )}
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100">
              {isEn ? 'Digital Recruitment Channels (Textbook p. 164)' : 'Kênh Thông Tin Tuyển Dụng Số (SGK Trang 164)'}
            </h4>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {isEn
              ? 'Aspiring developers can discover job opportunities at career fairs or through specialized online recruitment platforms:'
              : 'Người muốn tìm kiếm cơ hội nghề nghiệp có thể tham gia các ngày hội việc làm (Job Fair) hoặc truy cập các chuyên trang tuyển dụng trực tuyến uy tín:'}
          </p>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block">TopDev</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                {isEn ? 'Top IT job portal in Vietnam' : 'Chuyên trang IT hàng đầu VN'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block">Vietnamworks</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                {isEn ? 'Large-scale career network' : 'Mạng lưới việc làm quy mô lớn'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
              <span className="text-xs font-bold text-sky-700 dark:text-sky-300 block">LinkedIn</span>
              <span className="text-[11px] text-slate-600 dark:text-slate-300">
                {isEn ? 'Global professional network' : 'Mạng xã hội nghề nghiệp quốc tế'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HỘP GHI NHỚ TRANG 164 */}
      <div className="relative rounded-2xl bg-amber-50 dark:bg-amber-950 border-2 border-dashed border-amber-400 dark:border-amber-700 p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
            <Award className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-amber-950 dark:text-amber-200 uppercase tracking-wide text-xs">
              <BilingualText vi="Ghi Nhớ (SGK Trang 164)" en="Key Takeaway (Textbook page 164)" />
            </h4>
            <ul className="space-y-2 text-sm text-amber-950 dark:text-amber-100 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-amber-700 dark:text-amber-400">✔</span>
                <span>
                  <BilingualText
                    vi="Có thể theo học phát triển phần mềm tại nhiều nơi khác nhau: các trung tâm, trường nghề, các công ty, các nhà trường..."
                    en="Software development can be pursued across diverse institutions: vocational academies, software enterprises, colleges, and polytechnics."
                  />
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-700 dark:text-amber-400">✔</span>
                <span>
                  <BilingualText
                    vi="Các cơ hội nghề nghiệp cho người phát triển phần mềm rất đa dạng. Nhu cầu nhân lực phát triển phần mềm không ngừng tăng cao cùng với sự phát triển ứng dụng khoa học và công nghệ."
                    en="Career prospects for software developers are exceptionally diverse. The demand for software talent continues to surge alongside rapid scientific and technological innovations."
                  />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. CỔNG HƯỚNG NGHIỆP: TRƯỜNG ĐẠI HỌC VÀ KHỐI THI (VẬN DỤNG 1) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {isEn ? 'University Admissions Lookup' : 'Tra Cứu Tuyển Sinh Đại Học'}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              {isEn ? 'IT Universities & Admission Exam Groups' : 'Các Trường Đại Học Đào Tạo CNTT & Khối Thi'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {isEn
                ? 'Supports Application Question 1 (Textbook p. 164): Admission groups A00, A01, D01'
                : 'Phục vụ giải câu hỏi Vận dụng 1 (SGK Trang 164): Khối thi A00, A01, D01'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            {(['all', 'north', 'central', 'south'] as const).map((reg) => (
              <button
                key={reg}
                type="button"
                onClick={() => setRegionFilter(reg)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  regionFilter === reg
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {reg === 'all'
                  ? isEn
                    ? 'All'
                    : 'Tất cả'
                  : reg === 'north'
                  ? isEn
                    ? 'Northern'
                    : 'Miền Bắc'
                  : reg === 'central'
                  ? isEn
                    ? 'Central'
                    : 'Miền Trung'
                  : isEn
                  ? 'Southern'
                  : 'Miền Nam'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUnis.map((uni, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 space-y-3 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    {isEn ? uni.nameEn : uni.nameVi}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                    {isEn ? uni.nameVi : uni.nameEn}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 shrink-0">
                  {(isEn ? uni.codesEn : uni.codesVi).map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800"
                    >
                      {c.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-200 space-y-1">
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">
                    {isEn ? 'Key Majors:' : 'Ngành trọng điểm:'}
                  </strong>{' '}
                  {isEn ? uni.majorsEn : uni.majorsVi}
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-slate-100">
                    {isEn ? 'Highlight:' : 'Đặc trưng:'}
                  </strong>{' '}
                  {isEn ? uni.highlightEn : uni.highlightVi}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ĐÁP ÁN BÀI TẬP LUYỆN TẬP & VẬN DỤNG SGK (TRANG 164) */}
      <div className="space-y-4">
        {/* LUYỆN TẬP */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">
                  {isEn
                    ? 'Detailed Solutions: Practice Section (Textbook p. 164)'
                    : 'Lời Giải Chi Tiết Phần Luyện Tập (SGK Trang 164)'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isEn
                    ? '3 reinforcement questions summarizing Lesson 34'
                    : '3 câu hỏi củng cố toàn diện kiến thức bài 34'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowPracticeSolutions(!showPracticeSolutions)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors cursor-pointer"
            >
              {showPracticeSolutions
                ? isEn
                  ? 'Collapse'
                  : 'Thu gọn'
                : isEn
                ? 'View detailed solutions'
                : 'Xem lời giải chi tiết'}
            </button>
          </div>

          {showPracticeSolutions && (
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-indigo-700 dark:text-indigo-300">
                  {isEn
                    ? 'Question 1: Describe the software development lifecycle process.'
                    : 'Câu 1: Mô tả quy trình phát triển phần mềm.'}
                </h4>
                <div className="text-slate-700 dark:text-slate-200 text-xs leading-relaxed space-y-1.5">
                  <p>
                    {isEn ? (
                      <>
                        The software production lifecycle consists of 7 sequential stages encompassed by <strong>Project Management</strong>:
                      </>
                    ) : (
                      <>
                        Quy trình sản xuất phần mềm gồm 7 công đoạn liên tiếp khép kín, được bao trùm bởi hoạt động <strong>Quản trị dự án</strong>:
                      </>
                    )}
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                    <li>
                      <strong>{isEn ? 'Requirement Surveying:' : 'Điều tra khảo sát:'}</strong>{' '}
                      {isEn
                        ? 'Engage clients, study domain workflows, and compile system requirements.'
                        : 'Tiếp xúc khách hàng, tìm hiểu nghiệp vụ, xây dựng hồ sơ yêu cầu hệ thống.'}
                    </li>
                    <li>
                      <strong>{isEn ? 'Systems Analysis:' : 'Phân tích hệ thống:'}</strong>{' '}
                      {isEn
                        ? 'Produce complete specifications covering functional and non-functional requirements.'
                        : 'Xây dựng tài liệu mô tả đầy đủ chức năng và phi chức năng của phần mềm.'}
                    </li>
                    <li>
                      <strong>{isEn ? 'Systems Design:' : 'Thiết kế hệ thống:'}</strong>{' '}
                      {isEn
                        ? 'Architect the overall system, database schemas, functional modules, and UI/UX.'
                        : 'Thiết kế kiến trúc tổng thể, cơ sở dữ liệu, module chức năng và giao diện UI/UX.'}
                    </li>
                    <li>
                      <strong>{isEn ? 'Programming / Coding:' : 'Lập trình:'}</strong>{' '}
                      {isEn
                        ? 'Developers write source code adhering to the design blueprints.'
                        : 'Lập trình viên viết mã nguồn theo tài liệu thiết kế.'}
                    </li>
                    <li>
                      <strong>{isEn ? 'Testing:' : 'Kiểm thử:'}</strong>{' '}
                      {isEn
                        ? 'Detect defects and specification mismatches for timely remediation.'
                        : 'Phát hiện lỗi, khiếm khuyết phần mềm so với tài liệu đặc tả để khắc phục kịp thời.'}
                    </li>
                    <li>
                      <strong>{isEn ? 'Deployment & Handover:' : 'Chuyển giao:'}</strong>{' '}
                      {isEn
                        ? 'Install and launch in production, then train end users.'
                        : 'Cài đặt, triển khai trên môi trường thực tế, đào tạo người dùng cuối.'}
                    </li>
                    <li>
                      <strong>{isEn ? 'Maintenance:' : 'Bảo trì:'}</strong>{' '}
                      {isEn
                        ? 'Resolve post-release issues and implement feature upgrades.'
                        : 'Khắc phục lỗi phát sinh sau triển khai, nâng cấp tính năng mới.'}
                    </li>
                  </ol>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-indigo-700 dark:text-indigo-300">
                  {isEn
                    ? 'Question 2: Which school subjects should you prepare well to pursue software development?'
                    : 'Câu 2: Theo em, để theo học ngành phát triển phần mềm, em cần chuẩn bị tốt những môn học nào?'}
                </h4>
                <div className="text-slate-700 dark:text-slate-200 text-xs leading-relaxed space-y-1">
                  <p>{isEn ? 'Students should build strong foundations in 3 core subjects:' : 'Học sinh cần chuẩn bị vững chắc 3 môn học trụ cột:'}</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                    <li>
                      <strong>{isEn ? 'Mathematics:' : 'Môn Toán:'}</strong>{' '}
                      {isEn
                        ? 'Cultivates logical thinking, algebra, algorithms, and probability/statistics (vital for AI/ML).'
                        : 'Rèn luyện tư duy logic, cấu trúc đại số, thuật toán, xác suất thống kê (đặc biệt quan trọng với AI/ML).'}
                    </li>
                    <li>
                      <strong>{isEn ? 'Informatics:' : 'Môn Tin học:'}</strong>{' '}
                      {isEn
                        ? 'Builds early fluency in algorithmic thinking, data structures, programming languages (Python, C++), and computational problem-solving.'
                        : 'Làm quen sớm với tư duy thuật toán, cấu trúc dữ liệu, ngôn ngữ lập trình (Python, C++) và tư duy giải quyết vấn đề bằng máy tính.'}
                    </li>
                    <li>
                      <strong>{isEn ? 'English:' : 'Môn Tiếng Anh:'}</strong>{' '}
                      {isEn
                        ? 'Essential for reading technical documentation, adopting international libraries, and collaborating globally.'
                        : 'Ngôn ngữ quốc tế bắt buộc để đọc tài liệu chuyên ngành, sử dụng thư viện phần mềm và làm việc trong môi trường toàn cầu.'}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-indigo-700 dark:text-indigo-300">
                  {isEn
                    ? 'Question 3: List several application software programs you know.'
                    : 'Câu 3: Hãy liệt kê một vài phần mềm ứng dụng mà em biết.'}
                </h4>
                <div className="text-slate-700 dark:text-slate-200 text-xs leading-relaxed space-y-1">
                  <p>{isEn ? 'Popular software applications for study and daily life:' : 'Các phần mềm ứng dụng phổ biến phục vụ học tập và đời sống:'}</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                    <li>
                      <strong>{isEn ? 'Office & Productivity:' : 'Văn phòng & Soạn thảo:'}</strong> Microsoft Office (Word, Excel, PowerPoint), Google Docs.
                    </li>
                    <li>
                      <strong>{isEn ? 'Communication & Social:' : 'Liên lạc & Mạng xã hội:'}</strong> Zalo, Facebook Messenger, Telegram, Discord.
                    </li>
                    <li>
                      <strong>{isEn ? 'Graphics & Multimedia:' : 'Đồ họa & Đa phương tiện:'}</strong> Adobe Photoshop, Illustrator, CapCut, VLC Media Player.
                    </li>
                    <li>
                      <strong>{isEn ? 'Everyday Mobile Apps:' : 'Ứng dụng đời sống di động:'}</strong> Shopee, Grab, MoMo, VNeID, VnEdu.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* VẬN DỤNG */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100">
                  {isEn
                    ? 'Detailed Solutions: Application Section (Textbook p. 164)'
                    : 'Lời Giải Chi Tiết Phần Vận Dụng (SGK Trang 164)'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isEn
                    ? 'Guide to researching universities, training centers, and local software companies'
                    : 'Hướng dẫn khảo sát thực tế trường học, trung tâm và doanh nghiệp'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowApplySolutions(!showApplySolutions)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors cursor-pointer"
            >
              {showApplySolutions
                ? isEn
                  ? 'Collapse'
                  : 'Thu gọn'
                : isEn
                ? 'View detailed solutions'
                : 'Xem lời giải chi tiết'}
            </button>
          </div>

          {showApplySolutions && (
            <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  {isEn
                    ? 'Question 1: Universities offering software development and admission exam groups?'
                    : 'Câu 1: Trường đại học đào tạo nghề phát triển phần mềm và khối thi?'}
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {isEn ? (
                    <>
                      All three regions of Vietnam feature reputable universities. Main admission groups include <strong>A00</strong> (Math, Physics, Chemistry), <strong>A01</strong> (Math, Physics, English), and <strong>D01</strong> (Math, Literature, English), alongside competency assessment exams (HSA, VNU-HCM) and high school transcript review.
                    </>
                  ) : (
                    <>
                      Ở cả 3 miền đều có các trường đào tạo đại học uy tín. Các khối thi chủ lực: <strong>A00</strong> (Toán, Lý, Hóa), <strong>A01</strong> (Toán, Lý, Tiếng Anh), <strong>D01</strong> (Toán, Ngữ Văn, Tiếng Anh). Ngoài ra hiện nay các trường còn xét điểm Đánh giá năng lực (HSA, VNU-HCM) hoặc học bạ THPT.
                    </>
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  {isEn
                    ? 'Question 2: Software vocational training centers and representative programs?'
                    : 'Câu 2: Trung tâm dạy nghề phát triển phần mềm và khóa học tiêu biểu?'}
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {isEn ? (
                    <>
                      Reputable short-term and long-term IT academies include <strong>FPT Aptech, VTC Academy, MindX Technology School, Green Academy, and Rikkei Academy</strong>, offering hands-on 6–24 month tracks: Fullstack Web (Node.js/React), Flutter Mobile Development, Data & AI Engineering, and QA/QC Software Testing.
                    </>
                  ) : (
                    <>
                      Các trung tâm đào tạo công nghệ thông tin ngắn hạn và dài hạn uy tín: <strong>FPT Aptech, VTC Academy, MindX Technology School, Green Academy, Rikkei Academy</strong>. Cung cấp các khóa học thực chiến từ 6 tháng đến 2 năm: Lập trình viên Fullstack Web (Node.js/React), Lập trình ứng dụng di động Flutter, Kỹ sư dữ liệu & Trí tuệ nhân tạo, Chuyên viên kiểm thử phần mềm (QA/QC Tester).
                    </>
                  )}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                  {isEn
                    ? 'Question 3: Local software enterprises and Fresher training programs?'
                    : 'Câu 3: Doanh nghiệp phần mềm địa phương & Chương trình đào tạo Fresher?'}
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {isEn ? (
                    <>
                      Major cities host branches or headquarters of leading software enterprises such as <strong>FPT Software, Viettel Telecom, VNPT IT, TMA Solutions, KMS Technology, and NashTech</strong>, providing paid 2–3 month <strong>Fresher Academy</strong> bootcamps and Mentorship Internships prior to full-time contracts.
                    </>
                  ) : (
                    <>
                      Hầu hết các tỉnh, thành phố lớn đều có chi nhánh hoặc trụ sở của các doanh nghiệp phần mềm như <strong>FPT Software, Viettel Telecom, VNPT IT, TMA Solutions, KMS Technology, NashTech</strong>. Các doanh nghiệp này đều có chương trình <strong>Fresher Academy</strong> (đào tạo có lương cho sinh viên mới tốt nghiệp từ 2 - 3 tháng trước khi ký hợp đồng chính thức) hoặc chương trình thực tập có hướng dẫn (Mentorship Internship).
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 6. TRẮC NGHIỆM TỔNG KẾT / LESSON QUIZ CARD */}
      <div
        id="end-of-lesson-quiz"
        className={`p-6 sm:p-7 rounded-3xl border-2 transition-all shadow-2xl ${
          isAllSectionsComplete
            ? 'bg-slate-900 bg-linear-to-r from-emerald-950 via-teal-950 to-slate-900 border-emerald-500/60 shadow-emerald-950/30'
            : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left info */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <div
                className={`p-2 rounded-xl border flex items-center justify-center ${
                  isAllSectionsComplete
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}
              >
                {isAllSectionsComplete ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {isEn ? 'Lesson Quiz' : 'Trắc nghiệm tổng kết'}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border flex items-center gap-1 ${
                      isAllSectionsComplete
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {isAllSectionsComplete
                      ? isEn
                        ? `Unlocked (${completedCount}/${totalSections})`
                        : `Đã mở khóa (${completedCount}/${totalSections})`
                      : isEn
                      ? `Locked (${completedCount}/${totalSections})`
                      : `Đang khóa (${completedCount}/${totalSections})`}
                  </span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-teal-400">
                    {isEn ? '10 Textbook Questions' : '10 câu hỏi chuẩn SGK'}
                  </span>
                  <span>•</span>
                  <span>
                    {isEn
                      ? 'Score ≥ 8/10 for Certificate (KNTT10-B34)'
                      : 'Đạt ≥ 8/10 cấp chứng nhận (KNTT10-B34)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Message */}
            <div className="space-y-2 max-w-xl">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {isAllSectionsComplete
                  ? isEn
                    ? 'Congratulations! You have completed all 4/4 sections. Click "Start Quiz" or the top Quiz button to take the test and earn your certificate!'
                    : 'Chúc mừng! Em đã hoàn thành đủ 4/4 phần của bài học. Hãy bấm "Làm trắc nghiệm" hoặc nút Quiz trên thanh điều hướng để làm bài và nhận chứng nhận!'
                  : isEn
                  ? `Progress: ${completedCount}/${totalSections} sections. ${remainingCount} section${remainingCount > 1 ? 's' : ''} left to complete before unlocking the quiz and certificate.`
                  : `Tiến độ: ${completedCount}/${totalSections} phần. Còn ${remainingCount} phần cần hoàn thành để mở khóa trắc nghiệm và nhận chứng chỉ.`}
              </p>

              {/* Visual Progress Bar */}
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isAllSectionsComplete ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.round((completedCount / totalSections) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="shrink-0 flex items-center">
            <button
              type="button"
              onClick={navigateToQuiz}
              className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-xl cursor-pointer ${
                isAllSectionsComplete
                  ? 'bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 hover:scale-105 active:scale-95 shadow-emerald-500/20'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {isAllSectionsComplete ? (
                <>
                  <Award className="w-5 h-5 text-slate-950" />
                  <span>{isEn ? 'Start Quiz' : 'Làm trắc nghiệm'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>
                    {isEn
                      ? `Start Quiz (Locked ${completedCount}/${totalSections})`
                      : `Làm trắc nghiệm (Khóa ${completedCount}/${totalSections})`}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
