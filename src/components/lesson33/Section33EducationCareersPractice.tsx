import React, { useState } from 'react';
import {
  GraduationCap,
  Globe,
  Search,
  Award,
  Bookmark,
  Sparkles,
  ArrowRight,
  Lock,
  Unlock,
  CheckCircle2
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section33EducationCareersPractice: React.FC = () => {
  const {
    bilingualMode,
    navigateToQuiz,
    isAllSectionsComplete,
    completedSections,
    currentLesson
  } = useBook();
  const isVi = bilingualMode !== 'en';

  const totalSections = currentLesson.sections.length || 4;
  const completedCount = completedSections.length;
  const remainingCount = Math.max(0, totalSections - completedCount);

  // Academic Universities Filter
  const [regionFilter, setRegionFilter] = useState<'all' | 'north' | 'south' | 'central'>('all');

  // Job Board Simulator Search
  const [searchKeywordId, setSearchKeywordId] = useState<string>('graphic-design');
  const [selectedJobPost, setSelectedJobPost] = useState<number | null>(0);

  // Practice & Apply State
  const [practiceAnswer, setPracticeAnswer] = useState<string | null>(null);
  const [practiceSubmitted, setPracticeSubmitted] = useState<boolean>(false);

  const universities = [
    {
      nameVi: 'Đại học Mỹ thuật Việt Nam (Hà Nội)',
      nameEn: 'Vietnam University of Fine Arts (Hanoi)',
      region: 'north',
      cityVi: 'Hà Nội',
      cityEn: 'Hanoi',
      majorVi: 'Đồ hoạ tạo hình & Thiết kế đồ hoạ',
      majorEn: 'Fine Arts Graphics & Graphic Design',
      descVi: 'Cái nôi nghệ thuật tạo hình hàn lâm với nền tảng hội họa và mỹ thuật kinh điển sâu sắc.',
      descEn: 'An academic cradle of visual arts with deep foundations in classical painting and fine arts.'
    },
    {
      nameVi: 'Đại học Kiến trúc Hà Nội (HAU)',
      nameEn: 'Hanoi Architectural University (HAU)',
      region: 'north',
      cityVi: 'Hà Nội',
      cityEn: 'Hanoi',
      majorVi: 'Thiết kế đồ hoạ & Thiết kế nội thất',
      majorEn: 'Graphic Design & Interior Design',
      descVi: 'Thế mạnh về tư duy không gian, thẩm mỹ kiến trúc và đồ họa truyền thông ứng dụng.',
      descEn: 'Renowned for spatial thinking, architectural aesthetics, and applied communication graphics.'
    },
    {
      nameVi: 'Đại học Mỹ thuật TP. Hồ Chí Minh',
      nameEn: 'Ho Chi Minh City University of Fine Arts',
      region: 'south',
      cityVi: 'TP. Hồ Chí Minh',
      cityEn: 'Ho Chi Minh City',
      majorVi: 'Thiết kế đồ hoạ & Nghệ thuật số',
      majorEn: 'Graphic Design & Digital Arts',
      descVi: 'Đào tạo năng động, tiếp cận xu thế đồ họa quảng cáo thương mại hiện đại hàng đầu phía Nam.',
      descEn: 'Dynamic training aligned with modern commercial advertising design trends in Southern Vietnam.'
    },
    {
      nameVi: 'Đại học Kiến trúc TP. Hồ Chí Minh (UAH)',
      nameEn: 'University of Architecture Ho Chi Minh City (UAH)',
      region: 'south',
      cityVi: 'TP. Hồ Chí Minh',
      cityEn: 'Ho Chi Minh City',
      majorVi: 'Thiết kế đồ hoạ truyền thông thị giác',
      majorEn: 'Visual Communication Graphic Design',
      descVi: 'Điểm đến hàng đầu cho các nhà thiết kế bộ nhận diện thương hiệu, UI/UX và đồ họa xuất bản.',
      descEn: 'A premier hub for future brand identity, UI/UX, and editorial publishing designers.'
    },
    {
      nameVi: 'Đại học Bách Khoa Hà Nội & TP.HCM',
      nameEn: 'Hanoi & HCMC Universities of Science and Technology',
      region: 'north',
      cityVi: 'Hà Nội & TP.HCM',
      cityEn: 'Hanoi & HCMC',
      majorVi: 'Công nghệ thông tin (Chuyên sâu Đồ hoạ & Game)',
      majorEn: 'Information Technology (Computer Graphics & Game Focus)',
      descVi: 'Tập trung vào đồ hoạ máy tính 3D, lập trình game, đồ hoạ tương tác và mô phỏng VR/AR.',
      descEn: 'Focuses on 3D computer graphics, game programming, interactive graphics, and VR/AR simulation.'
    },
    {
      nameVi: 'Đại học FPT & RMIT Việt Nam',
      nameEn: 'FPT University & RMIT Vietnam',
      region: 'central',
      cityVi: 'Đà Nẵng, Hà Nội, TP.HCM',
      cityEn: 'Da Nang, Hanoi, HCMC',
      majorVi: 'Digital Graphic Design & Multimedia Arts',
      majorEn: 'Digital Graphic Design & Multimedia Arts',
      descVi: 'Chương trình chuẩn quốc tế, trang thiết bị studio hiện đại, kết nối thực tế doanh nghiệp số.',
      descEn: 'International curriculum with modern studio equipment and close digital enterprise connections.'
    }
  ];

  const searchKeywords = [
    { id: 'graphic-design', vi: 'thiết kế đồ hoạ', en: 'graphic design' },
    { id: 'fine-art-design', vi: 'thiết kế mĩ thuật', en: 'visual art design' },
    { id: '3d-design', vi: 'thiết kế 3D', en: '3D design' },
    { id: 'ui-design', vi: 'thiết kế giao diện', en: 'UI/UX design' },
    { id: 'brand-identity', vi: 'nhận diện thương hiệu', en: 'brand identity' },
    { id: 'ad-design', vi: 'thiết kế quảng cáo', en: 'advertising design' }
  ];

  const jobPostings = [
    {
      id: 0,
      matchKeywords: ['graphic-design', 'brand-identity'],
      titleVi: 'Chuyên viên Thiết kế Đồ hoạ Truyền thông (Graphic Designer)',
      titleEn: 'Visual Brand Graphic Designer',
      companyVi: 'VinAgency Media Group',
      companyEn: 'VinAgency Media Group',
      locationVi: 'Hà Nội & TP. Hồ Chí Minh (Hybrid)',
      locationEn: 'Hanoi & Ho Chi Minh City (Hybrid)',
      salaryVi: '15.000.000 – 25.000.000 VNĐ',
      salaryEn: '15M – 25M VND / month',
      requirementsVi: 'Thành thạo Photoshop, Illustrator, tư duy sáng tạo logo, bộ nhận diện và poster.',
      requirementsEn: 'Proficient in Photoshop and Illustrator; strong creative skills in logo, branding, and poster layout.',
      skills: ['Photoshop', 'Illustrator', 'Branding', 'Typography']
    },
    {
      id: 1,
      matchKeywords: ['ui-design', 'graphic-design'],
      titleVi: 'Chuyên viên Thiết kế Giao diện UI/UX (Product Designer)',
      titleEn: 'Digital UI/UX Product Designer',
      companyVi: 'NextGen Fintech Vietnam',
      companyEn: 'NextGen Fintech Vietnam',
      locationVi: 'Đà Nẵng & Remote',
      locationEn: 'Da Nang & Remote',
      salaryVi: '20.000.000 – 35.000.000 VNĐ',
      salaryEn: '20M – 35M VND / month',
      requirementsVi: 'Thiết kế giao diện ứng dụng di động ngân hàng số, thiết kế web tương thích, wireframing.',
      requirementsEn: 'Design mobile digital banking interfaces, responsive web layouts, and interactive wireframes.',
      skills: ['Figma', 'UI/UX', 'Responsive Design', 'Mobile App']
    },
    {
      id: 2,
      matchKeywords: ['3d-design', 'fine-art-design'],
      titleVi: 'Họa sĩ Dựng hình 3D & Kỹ xảo Hoạt hình (3D Artist)',
      titleEn: '3D Modeler & Motion Artist',
      companyVi: 'Sunrise Animation Studios',
      companyEn: 'Sunrise Animation Studios',
      locationVi: 'TP. Hồ Chí Minh',
      locationEn: 'Ho Chi Minh City',
      salaryVi: '18.000.000 – 30.000.000 VNĐ',
      salaryEn: '18M – 30M VND / month',
      requirementsVi: 'Dựng nhân vật hoạt hình 3D, phối cảnh môi trường, sử dụng Blender, Maya hoặc 3ds Max.',
      requirementsEn: 'Create 3D animated characters and environments using Blender, Maya, or 3ds Max.',
      skills: ['Blender', '3ds Max', 'Character Modeling', 'Animation']
    },
    {
      id: 3,
      matchKeywords: ['ad-design', 'brand-identity', 'fine-art-design'],
      titleVi: 'Nhà Thiết Kế Tự Do (Freelance Brand & Web Designer)',
      titleEn: 'Remote Freelance Brand & Web Designer',
      companyVi: 'Dự án Quốc tế qua Upwork / Behance',
      companyEn: 'International Projects via Upwork / Behance',
      locationVi: 'Làm việc linh hoạt tại nhà (Work from Home)',
      locationEn: 'Flexible Work from Home',
      salaryVi: '500 – 1.800 USD / Dự án',
      salaryEn: '$500 – $1,800 / Project',
      requirementsVi: 'Nhận thiết kế logo, bao bì sản phẩm, banner thương mại điện tử độc lập cho khách hàng toàn cầu.',
      requirementsEn: 'Deliver independent logo, packaging, and e-commerce banner projects for global clients.',
      skills: ['English', 'Independent Management', 'Packaging', 'Web Graphics']
    }
  ];

  const filteredUnis = universities.filter(
    (u) => regionFilter === 'all' || u.region === regionFilter || (regionFilter === 'central' && u.cityVi.includes('Đà Nẵng'))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {isVi ? 'MỤC 3 • TRANG 158 – 159 SGK' : 'SECTION 3 • TEXTBOOK PP. 158 – 159'}
          </span>
          <span className="text-xs text-slate-400">
            <BilingualText
              vi="Cơ sở đào tạo, cơ hội việc làm & hướng nghiệp kỷ nguyên số"
              en="Training Centers, Jobs & Digital Career Paths"
            />
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          <BilingualText
            vi="3. HỌC TẬP VÀ VIỆC LÀM TRONG NGÀNH THIẾT KẾ ĐỒ HOẠ"
            en="3. EDUCATION AND EMPLOYMENT IN GRAPHIC DESIGN"
          />
        </h2>
      </div>

      {/* Hoạt động 3: Học tập và việc làm trong ngành thiết kế đồ hoạ */}
      <div className="bg-slate-900 bg-linear-to-br from-slate-900 via-slate-900 to-emerald-950 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
          <Sparkles className="w-4 h-4 shrink-0" />
          <BilingualText
            vi="Hoạt động 3: Học tập và việc làm (SGK Trang 158)"
            en="Activity 3: Academic & Employment Exploration (Textbook p. 158)"
          />
        </div>
        <div className="space-y-1.5 text-xs sm:text-sm text-slate-100 italic">
          <p>
            1. <BilingualText
              vi="Theo em, để theo học thiết kế đồ hoạ ở bậc đại học, cao đẳng, cần chuẩn bị tốt những môn học gì?"
              en="What high school subjects best prepare you for university-level graphic design studies?"
            />
          </p>
          <p>
            2. <BilingualText
              vi="Em biết trường đại học nào có đào tạo chuyên ngành thiết kế đồ hoạ?"
              en="Which universities are renowned for offering graphic design majors?"
            />
          </p>
          <p>
            3. <BilingualText
              vi="Sau khi tốt nghiệp chuyên ngành thiết kế đồ hoạ, người học có thể làm những công việc gì?"
              en="Upon graduation, what job roles can design students pursue?"
            />
          </p>
        </div>
      </div>

      {/* Tra cứu các trường Đại học & Cơ sở đào tạo (SGK Trang 158) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-blue-400 font-bold">
                {isVi ? 'Định hướng học tập • SGK Trang 158' : 'Academic Pathways • Textbook p. 158'}
              </span>
              <h3 className="font-bold text-white text-base">
                {isVi ? 'Hệ Thống Cơ Sở Đào Tạo Thiết Kế Đồ Hoạ Tại Việt Nam' : 'Graphic Design Higher Education Institutions'}
              </h3>
            </div>
          </div>

          {/* Region Filter */}
          <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['all', 'north', 'south', 'central'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegionFilter(r)}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  regionFilter === r ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r === 'all' && (isVi ? 'Toàn quốc' : 'All Regions')}
                {r === 'north' && (isVi ? 'Miền Bắc' : 'Northern')}
                {r === 'south' && (isVi ? 'Miền Nam' : 'Southern')}
                {r === 'central' && (isVi ? 'Miền Trung' : 'Central')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredUnis.map((uni, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-mono">{isVi ? uni.cityVi : uni.cityEn}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-blue-300 font-bold">
                    {isVi ? 'Đại học' : 'University'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{isVi ? uni.nameVi : uni.nameEn}</h4>
                <p className="text-xs text-blue-400 font-medium mt-1">{isVi ? uni.majorVi : uni.majorEn}</p>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">{isVi ? uni.descVi : uni.descEn}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 leading-relaxed">
          <span className="font-bold text-blue-400 mr-1.5">{isVi ? 'Lộ trình chuẩn bị cho học sinh THPT:' : 'High School Preparation Blueprint:'}</span>
          <span>
            {isVi
              ? 'Để theo học ngành Thiết kế đồ hoạ ở bậc ĐH/CĐ, các em cần chuẩn bị tốt môn Tin học (nắm vững thao tác máy tính, đồ hoạ vector và tư duy số), Mĩ thuật (năng khiếu vẽ tay, phối màu), Toán học (tư duy bố cục không gian) và Tiếng Anh để tra cứu phần mềm quốc tế.'
              : 'Preparation entails Informatics (digital graphics & computer fluency), Fine Arts (hand drawing & color harmony), Mathematics (spatial proportion), and English (global design documentation).'}
          </span>
        </div>
      </div>

      {/* Tra cứu việc làm số & Các từ khoá hướng nghiệp (SGK Trang 159) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                {isVi ? 'Hướng nghiệp số • SGK Trang 159' : 'Digital Job Hunting • Textbook p. 159'}
              </span>
              <h3 className="font-bold text-white text-base">
                {isVi ? 'Cổng Hướng Nghiệp & Mô Phỏng Tin Tuyển Dụng Đồ Hoạ' : 'Career Explorer & Job Market Simulator'}
              </h3>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            {isVi ? 'Kênh tìm kiếm: Google, LinkedIn, Vietnamworks, Behance' : 'Channels: Google, LinkedIn, Vietnamworks, Behance'}
          </div>
        </div>

        {/* Keyword Pills from SGK Trang 159 */}
        <div>
          <span className="text-xs text-slate-300 font-bold block mb-2">
            {isVi ? 'Các từ khoá tìm kiếm hướng nghiệp chuẩn SGK Trang 159:' : 'Official Textbook Search Keywords (Page 159):'}
          </span>
          <div className="flex flex-wrap gap-2">
            {searchKeywords.map((kw) => (
              <button
                key={kw.id}
                type="button"
                onClick={() => {
                  setSearchKeywordId(kw.id);
                  const firstMatch = jobPostings.find((p) => p.matchKeywords.includes(kw.id));
                  if (firstMatch) setSelectedJobPost(firstMatch.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  searchKeywordId === kw.id
                    ? 'bg-emerald-600 text-white font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Search className="w-3 h-3" />
                <span>{isVi ? kw.vi : kw.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {jobPostings.map((post) => {
            const isMatch = post.matchKeywords.includes(searchKeywordId);
            return (
              <div
                key={post.id}
                onClick={() => setSelectedJobPost(post.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedJobPost === post.id
                    ? 'bg-slate-800 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : isMatch
                    ? 'bg-slate-950 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-slate-950/90 border-slate-800 hover:border-slate-700 opacity-85'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 font-mono">
                    {isVi ? post.salaryVi : post.salaryEn}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isMatch && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isVi ? 'Khớp từ khoá' : 'Match'}</span>
                      </span>
                    )}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-200">
                      {isVi ? post.locationVi : post.locationEn}
                    </span>
                  </div>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">{isVi ? post.titleVi : post.titleEn}</h4>
                <p className="text-xs text-slate-400 mb-2">{isVi ? post.companyVi : post.companyEn}</p>
                <p className="text-xs text-slate-200 mb-3">{isVi ? post.requirementsVi : post.requirementsEn}</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.skills.map((s, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hộp Ghi nhớ Trang 159 SGK */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 bg-linear-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/50 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
          <Bookmark className="w-4 h-4 shrink-0" />
          <BilingualText
            vi="Hộp Ghi nhớ (SGK Trang 159)"
            en="Key Takeaways (Textbook page 159)"
          />
        </div>
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-100">
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span>
              <BilingualText
                vi="Theo học lĩnh vực thiết kế đồ hoạ tại các trung tâm, trường dạy nghề, các trường đại học, cao đẳng có chuyên ngành thiết kế đồ hoạ, thiết kế đồ hoạ trên máy tính."
                en="Pursue graphic design at vocational training centers, institutes, and universities with majors in Graphic Design or Computer Graphic Arts."
              />
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span>
              <BilingualText
                vi="Có thể tìm kiếm thông tin về hướng nghiệp trên Internet hay qua các diễn đàn nghề nghiệp."
                en="Proactively search career orientation information across digital search engines, job boards, and professional creative communities."
              />
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">•</span>
            <span>
              <BilingualText
                vi="Nhu cầu nhân sự cao với nhiều công việc và cách thức làm việc đa dạng (làm tại công ty, studio, tự mở doanh nghiệp hoặc làm việc tự do - freelance)."
                en="High workforce demand offering versatile employment modes (corporate studios, founding agencies, or remote freelance work)."
              />
            </span>
          </li>
        </ul>
      </div>

      {/* LUYỆN TẬP SGK Trang 159 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <Award className="w-4 h-4" />
          <BilingualText
            vi="PHẦN LUYỆN TẬP • SGK TRANG 159"
            en="TEXTBOOK PRACTICE • PAGE 159"
          />
        </div>

        {/* Luyện tập 1 */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <p className="font-bold text-sm text-white">
            <BilingualText
              vi="1. Thiết kế đồ hoạ là thao tác:"
              en="1. Graphic design consists of which operations?"
            />
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { id: 'A', vi: 'A. Tạo ra các thành phần đồ hoạ.', en: 'A. Creating graphic components.' },
              { id: 'B', vi: 'B. Lựa chọn các thành phần đồ hoạ.', en: 'B. Selecting graphic components.' },
              { id: 'C', vi: 'C. Sắp xếp các thành phần đồ hoạ.', en: 'C. Arranging graphic components.' },
              { id: 'D', vi: 'D. Tất cả các thao tác trên.', en: 'D. All of the above operations.' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setPracticeAnswer(opt.id);
                  setPracticeSubmitted(true);
                }}
                className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  practiceAnswer === opt.id
                    ? opt.id === 'D'
                      ? 'bg-emerald-950 border-emerald-500 text-white font-bold'
                      : 'bg-rose-950 border-rose-500 text-white font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-200 hover:text-white hover:border-slate-700'
                }`}
              >
                <BilingualText vi={opt.vi} en={opt.en} />
              </button>
            ))}
          </div>

          {practiceSubmitted && (
            <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/40 text-xs text-slate-100 animate-in fade-in">
              <span className="font-bold text-emerald-400 mr-1.5">
                <BilingualText vi="Đáp án đúng là D:" en="Correct Answer: D." />
              </span>
              <span>
                <BilingualText
                  vi="Thiết kế đồ hoạ là quá trình toàn diện bao gồm: Tạo ra các thành phần (vẽ vector, chụp ảnh, viết chữ), Lựa chọn các thành phần phù hợp và Sắp xếp chúng theo trật tự bố cục truyền thông hoàn chỉnh."
                  en="Graphic design integrates asset creation, asset curation/selection, and strategic layout arrangement."
                />
              </span>
            </div>
          )}
        </div>

        {/* Luyện tập 2 */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
          <p className="font-bold text-sm text-white">
            <BilingualText
              vi="2. Sau khi tốt nghiệp các trường đào tạo về thiết kế đồ hoạ, em có thể làm việc ở những đơn vị nào?"
              en="2. After graduating from graphic design programs, in what organizations can you work?"
            />
          </p>
          <div className="text-xs text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800">
            <p className="font-semibold text-emerald-400 mb-1">
              {isVi ? 'Tổng hợp đơn vị làm việc chuẩn mực SGK Trang 159:' : 'Employment Venues (Textbook p. 159):'}
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-200">
              <li>{isVi ? 'Công ty quảng cáo, công ty thiết kế thương hiệu, công ty truyền thông và tổ chức sự kiện.' : 'Advertising agencies, branding studios, media firms, event organizers.'}</li>
              <li>{isVi ? 'Studio nghệ thuật, xưởng phim hoạt hình, công ty sản xuất truyện tranh và trò chơi điện tử (game).' : 'Art studios, animation houses, comic publishers, video game studios.'}</li>
              <li>{isVi ? 'Toà soạn báo giấy/báo điện tử, nhà xuất bản sách, cơ quan truyền hình, đài phát thanh.' : 'Newspaper newsrooms, book publishing houses, television broadcasting networks.'}</li>
              <li>{isVi ? 'Tự thành lập doanh nghiệp, công ty thiết kế độc lập hoặc mở studio dịch vụ tư vấn.' : 'Founding private creative studios, design consultancy agencies.'}</li>
              <li>{isVi ? 'Giảng dạy tại các trường đại học, cao đẳng, trung tâm dạy nghề, câu lạc bộ thiết kế.' : 'Teaching at design colleges, vocational training academies, or design clubs.'}</li>
              <li>{isVi ? 'Làm việc tự do (Freelance) tại nhà: Nhận hợp đồng thiết kế website, logo, bộ nhận diện từ xa cho các khách hàng toàn cầu.' : 'Remote freelance designers executing branding, web graphics for global clients.'}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* VẬN DỤNG SGK Trang 159 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
          <Globe className="w-4 h-4" />
          <span>{isVi ? 'PHẦN VẬN DỤNG • SGK TRANG 159' : 'TEXTBOOK APPLICATION • PAGE 159'}</span>
        </div>

        {/* Vận dụng 1 */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
          <p className="font-bold text-sm text-white">
            {isVi
              ? '1. Hãy tìm các kênh thông tin giới thiệu việc làm liên quan đến thiết kế đồ hoạ và chia sẻ với bạn bè về kênh thông tin đó.'
              : '1. Discover job portals for graphic design and share them with your peers.'}
          </p>
          <div className="text-xs text-slate-200 leading-relaxed bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-2">
            <p className="font-semibold text-indigo-300">
              {isVi ? 'Danh mục 4 kênh tuyển dụng thiết kế đồ hoạ uy tín hàng đầu:' : 'Top 4 Reputable Creative Career Networks:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block">1. Behance (behance.net)</span>
                <span className="text-slate-300">
                  {isVi
                    ? 'Mạng xã hội triển lãm portfolio của Adobe, nơi các agency quốc tế săn đón nhà thiết kế.'
                    : "Adobe's portfolio showcase social platform where international agencies scout designers."}
                </span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block">2. LinkedIn (linkedin.com)</span>
                <span className="text-slate-300">
                  {isVi
                    ? 'Mạng lưới nghề nghiệp chuyên nghiệp kết nối trực tiếp với chuyên gia nhân sự và giám đốc sáng tạo.'
                    : 'Global professional network connecting directly with HR specialists and creative directors.'}
                </span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block">3. Vietnamworks (vietnamworks.com)</span>
                <span className="text-slate-300">
                  {isVi
                    ? 'Cổng thông tin tuyển dụng hàng đầu Việt Nam với hàng ngàn tin tuyển Graphic/UI Designer mỗi ngày.'
                    : "Vietnam's leading recruitment portal with thousands of Graphic/UI Designer listings."}
                </span>
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block">4. Dribbble (dribbble.com)</span>
                <span className="text-slate-300">
                  {isVi
                    ? 'Cộng đồng sáng tạo giao diện số (UI/UX) và hoạt hình motion graphics quốc tế.'
                    : 'International community for digital UI/UX designers and motion graphics artists.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vận dụng 2 */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
          <p className="font-bold text-sm text-white">
            {isVi
              ? '2. Sử dụng công cụ tìm kiếm trên Internet để biết các phần mềm công cụ đồ hoạ như Illustrator, Photoshop, InDesign, AutoCAD,... được dùng để làm gì?'
              : '2. Search online to find out what software tools like Illustrator, Photoshop, InDesign, AutoCAD are used for.'}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-200 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3 border-b border-slate-800">{isVi ? 'Phần mềm' : 'Software'}</th>
                  <th className="p-3 border-b border-slate-800">{isVi ? 'Loại đồ hoạ' : 'Graphics Type'}</th>
                  <th className="p-3 border-b border-slate-800">{isVi ? 'Công dụng cốt lõi theo chuẩn nghề nghiệp' : 'Core Professional Purpose'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                <tr className="hover:bg-slate-950/60">
                  <td className="p-3 font-bold text-amber-400">Adobe Photoshop</td>
                  <td className="p-3 font-mono text-slate-300">{isVi ? 'Raster (Điểm ảnh)' : 'Raster (Pixel-based)'}</td>
                  <td className="p-3">
                    {isVi
                      ? 'Chỉnh sửa ảnh chuyên nghiệp, cắt ghép, phục chế ảnh cũ, tạo kỹ xảo ánh sáng và vẽ kỹ thuật số.'
                      : 'Professional photo retouching, compositing, restoration, lighting effects, and digital painting.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-950/60">
                  <td className="p-3 font-bold text-rose-400">Adobe Illustrator</td>
                  <td className="p-3 font-mono text-slate-300">{isVi ? 'Vector (Toạ độ)' : 'Vector (Coordinate)'}</td>
                  <td className="p-3">
                    {isVi
                      ? 'Thiết kế logo, biểu tượng, infographic, phông chữ, áp phích với khả năng phóng to vô hạn không vỡ hạt.'
                      : 'Craft logos, icons, infographics, typography, and posters with infinite resolution scaling.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-950/60">
                  <td className="p-3 font-bold text-purple-400">Adobe InDesign</td>
                  <td className="p-3 font-mono text-slate-300">{isVi ? 'Dàn trang xuất bản' : 'Editorial Publishing'}</td>
                  <td className="p-3">
                    {isVi
                      ? 'Chuyên chế bản, dàn trang sách giáo khoa, tạp chí nhiều trang, báo giấy, catalogue và tài liệu PDF tương tác.'
                      : 'Multi-page layout and prepress for textbooks, magazines, newspapers, catalogues, and interactive PDFs.'}
                  </td>
                </tr>
                <tr className="hover:bg-slate-950/60">
                  <td className="p-3 font-bold text-emerald-400">AutoCAD</td>
                  <td className="p-3 font-mono text-slate-300">{isVi ? 'CAD 2D/3D Kĩ thuật' : 'Technical 2D/3D CAD'}</td>
                  <td className="p-3">
                    {isVi
                      ? 'Vẽ bản vẽ kỹ thuật kiến trúc, sơ đồ mặt bằng xây dựng, thiết kế cơ khí chính xác theo kích thước thực.'
                      : 'Precision architectural blueprints, construction floor plans, and mechanical engineering drafting.'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* TRẮC NGHIỆM TỔNG KẾT / LESSON QUIZ CARD */}
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
                    {isVi ? 'Trắc nghiệm tổng kết' : 'Lesson Quiz'}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border flex items-center gap-1 ${
                      isAllSectionsComplete
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {isAllSectionsComplete
                      ? isVi
                        ? `Đã mở khóa (${completedCount}/${totalSections})`
                        : `Unlocked (${completedCount}/${totalSections})`
                      : isVi
                      ? `Đang khóa (${completedCount}/${totalSections})`
                      : `Locked (${completedCount}/${totalSections})`}
                  </span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-teal-400">
                    {isVi ? '10 câu hỏi chuẩn SGK' : '10 Textbook Questions'}
                  </span>
                  <span>•</span>
                  <span>
                    {isVi ? 'Đạt ≥ 8/10 cấp chứng nhận (KNTT10-B33)' : 'Score ≥ 8/10 for Certificate (KNTT10-B33)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Message */}
            <div className="space-y-2 max-w-xl">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {isAllSectionsComplete
                  ? isVi
                    ? 'Chúc mừng! Em đã hoàn thành đủ 4/4 phần của bài học. Hãy bấm "Làm trắc nghiệm" hoặc nút Quiz trên thanh điều hướng để làm bài và nhận chứng nhận!'
                    : 'Congratulations! You have completed all 4/4 sections. Click "Start Quiz" or the top Quiz button to take the test and earn your certificate!'
                  : isVi
                  ? `Tiến độ: ${completedCount}/${totalSections} phần. Còn ${remainingCount} phần cần hoàn thành để mở khóa trắc nghiệm và nhận chứng chỉ.`
                  : `Progress: ${completedCount}/${totalSections} sections. ${remainingCount} section${remainingCount > 1 ? 's' : ''} left to complete before unlocking the quiz and certificate.`}
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
                  <span>{isVi ? 'Làm trắc nghiệm' : 'Start Quiz'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>
                    {isVi
                      ? `Làm trắc nghiệm (Khóa ${completedCount}/${totalSections})`
                      : `Start Quiz (Locked ${completedCount}/${totalSections})`}
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
