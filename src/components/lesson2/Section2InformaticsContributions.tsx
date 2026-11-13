import React, { useState } from 'react';
import { Award, Briefcase, Bot, Microscope, Laptop, Users, Eye, Volume2, Sparkles, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section2InformaticsContributions: React.FC = () => {
  const { bilingualMode, speak, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const [activeArea, setActiveArea] = useState<number>(0);

  const contributionAreas = [
    {
      id: 0,
      titleVi: '1. Quản lí điều hành',
      titleEn: '1. Administrative Management',
      icon: Briefcase,
      color: 'indigo',
      shortVi: 'Trường học, Ngân hàng, Doanh nghiệp sản xuất và thương mại',
      shortEn: 'Schools, Banking, Manufacturing & Commerce',
      descVi: 'Trường học quản lí học tập học sinh (sổ điểm điện tử, thời khóa biểu). Ngân hàng quản lí hàng triệu tài khoản và giao dịch thẻ tức thời. Doanh nghiệp quản lí kho hàng, chuỗi cung ứng, kế toán. Dùng máy tính giúp xử lí công việc nhanh chóng, chính xác, hiệu quả và tiết kiệm chi phí vượt bậc.',
      descEn: 'Schools manage students via electronic gradebooks and scheduling systems. Banks securely process millions of real-time accounts and digital transactions. Businesses manage supply chains, warehousing, and accounting. Computers make operations rapid, accurate, highly efficient, and cost-effective.',
      examplesVi: ['Sổ liên lạc điện tử VnEdu / eSMART', 'Ứng dụng ngân hàng điện tử (Mobile Banking)', 'Hệ thống ERP quản trị doanh nghiệp toàn cầu'],
      examplesEn: ['Electronic school management VnEdu / eSMART', 'Mobile Banking & cashless instant transfers', 'Global Enterprise Resource Planning (ERP) systems']
    },
    {
      id: 1,
      titleVi: '2. Tự động hoá sản xuất',
      titleEn: '2. Industrial Automation & Robotics',
      icon: Bot,
      color: 'emerald',
      shortVi: 'Robot công nghiệp & Làm việc trong môi trường nguy hiểm',
      shortEn: 'Industrial Robots & Hazardous Operations',
      descVi: 'Nhờ máy tính, tự động hoá đã thay đổi căn bản nền sản xuất. Các thiết bị thông minh hoạt động theo chương trình có thể thực hiện tốt nhiều công việc thay cho con người. Robot không những làm việc chính xác, tốc độ cao mà còn hoạt động an toàn ở những môi trường cực kỳ nguy hiểm như nhà máy điện hạt nhân, cứu hộ hỏa hoạn hay thăm dò đáy biển sâu.',
      descEn: 'Through computing, automation has fundamentally revolutionized modern manufacturing. Program-controlled smart devices execute complex tasks replacing manual labor. Robots perform with pinpoint precision and high speed while operating safely in perilous environments like nuclear reactors, fire rescue, or deep-sea exploration.',
      examplesVi: ['Dây chuyền lắp ráp ô tô tự động', 'Robot kiểm tra lò phản ứng hạt nhân', 'Cánh tay robot phẫu thuật nội soi y tế'],
      examplesEn: ['Automated robotic automotive assembly lines', 'Nuclear reactor inspection mobile robots', 'High-precision endoscopic surgical robotic arms']
    },
    {
      id: 2,
      titleVi: '3. Giải quyết bài toán Khoa học Kĩ thuật',
      titleEn: '3. Scientific & Engineering Problem Solving',
      icon: Microscope,
      color: 'sky',
      shortVi: 'Mô phỏng, Dự báo thời tiết, Giải mã gen, Bản đồ số',
      shortEn: 'Simulation, Weather Forecasting, Genomics, Digital Maps',
      descVi: 'Với khả năng tính toán siêu nhanh và chính xác tuyệt đối, máy tính hỗ trợ đắc lực cho công việc tính toán phức tạp, mô phỏng các thí nghiệm vật lí hạt nhân, kiểm nghiệm thiết kế cầu đường, mô hình hóa và dự báo thời tiết bão lũ, giải mã bộ gen sinh học và ứng dụng bản đồ số định vị GPS toàn cầu.',
      descEn: 'With lightning-fast calculations and absolute precision, computers provide indispensable support for complex calculations, simulating nuclear physics experiments, structural bridge testing, hurricane forecasting, human genome sequencing, and global GPS navigation.',
      examplesVi: ['Siêu máy tính dự báo đường đi của bão', 'Mô phỏng khí động học thiết kế máy bay', 'Hệ thống định vị dẫn đường vệ tinh GPS / Google Maps'],
      examplesEn: ['Supercomputers predicting storm and typhoon paths', 'Aerodynamic simulation in aircraft engineering', 'Global satellite navigation systems GPS / Google Maps']
    },
    {
      id: 3,
      titleVi: '4. Thay đổi cách thức làm việc nhiều ngành nghề',
      titleEn: '4. Transforming Work Methods Across Industries',
      icon: Laptop,
      color: 'amber',
      shortVi: 'Dạy học trực tuyến, Chế bản điện tử, Máy ảnh số, Mua sắm online',
      shortEn: 'Online Teaching, Digital Publishing, Digital Cameras, E-Commerce',
      descVi: 'Nhiều công việc chuyển đổi hoàn toàn sang môi trường số như dạy học và hội họp từ xa, mua bán hàng hóa trực tuyến (E-commerce). Các ứng dụng tin học văn phòng nâng cao hiệu suất hành chính. Nhiều nghề nghiệp biến đổi hoàn toàn: công nghệ in sắp chữ chì được thay bằng chế bản điện tử đồ họa; chụp ảnh dùng phim hóa chất được thay thế hoàn toàn bằng máy ảnh số.',
      descEn: 'Numerous professions have fully shifted to digital environments: remote learning, video conferencing, and e-commerce. Office computing tools exponentially boost administrative productivity. Traditional trades transformed: hot-metal lead typesetting replaced by digital desktop publishing; chemical film cameras superseded by digital sensors.',
      examplesVi: ['Lớp học ảo Google Meet / MS Teams', 'Chế bản điện tử đồ họa Adobe / InDesign', 'Thương mại điện tử Shopee, Tiki, Lazada'],
      examplesEn: ['Virtual classrooms Google Meet / MS Teams', 'Digital desktop publishing Adobe / InDesign', 'E-commerce platforms Shopee, Amazon, Lazada']
    },
    {
      id: 4,
      titleVi: '5. Giao tiếp cộng đồng & Xã hội số',
      titleEn: '5. Community Communication & Social Networks',
      icon: Users,
      color: 'rose',
      shortVi: 'Email, Diễn đàn, Mạng xã hội YouTube, Facebook, Zalo',
      shortEn: 'Email, Online Forums, Social Media (YouTube, Facebook, Zalo)',
      descVi: 'Tin học giúp trao đổi thông tin nhanh chóng và tức thời trên phạm vi toàn cầu qua thư điện tử (email), các diễn đàn trực tuyến và mạng xã hội (YouTube, Facebook, Twitter/X, Zalo,...). Mạng xã hội đã trở thành môi trường giao tiếp tương tác trực quan, mở ra không gian kết nối không biên giới.',
      descEn: 'Informatics enables instantaneous worldwide communication via email, online forums, and social networks (YouTube, Facebook, Twitter/X, Zalo). Social media has become an interactive visual medium, opening boundless borders for human connection.',
      examplesVi: ['Thư điện tử Gmail / Outlook tức thời', 'Mạng xã hội Zalo kết nối học đường và gia đình', 'Kênh video bài giảng trực tuyến YouTube Edu'],
      examplesEn: ['Instant email services Gmail / Outlook', 'Social networks connecting communities & families', 'Online educational video channels YouTube Edu']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
            {bilingualMode === 'en' ? 'Section 2a • Pages 13 – 14 Textbook' : 'Mục 2a • Trang 13 – 14 SGK'}
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {bilingualMode === 'en' ? '2. ACHIEVEMENTS OF INFORMATICS' : '2. CÁC THÀNH TỰU CỦA TIN HỌC'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {bilingualMode === 'en'
              ? 'a) Immense contributions of informatics to societal life'
              : 'a) Đóng góp to lớn của tin học đối với đời sống xã hội'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(13);
              setShowOriginalModal(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>{bilingualMode === 'en' ? 'Compare Pages 13 – 14 SGK' : 'Đối chiếu Trang 13 – 14 SGK'}</span>
          </button>
          <button
            type="button"
            onClick={() => speak('Informatics is applied in every domain: management, automation, scientific and engineering problem solving, transforming work methods across industries, and community communication.', 'en')}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Listen in English"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
        </div>
      </div>

      {/* Activity 2 Thinking Prompt */}
      <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/80 border border-indigo-200/90 space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white font-bold text-xs">
            {bilingualMode === 'en' ? 'Activity 2' : 'Hoạt động 2'}
          </span>
          <h3 className="font-bold text-xs sm:text-sm text-indigo-950">
            {bilingualMode === 'en'
              ? 'The Role of Informatics in Society (Page 13 Textbook)'
              : 'Vai trò của tin học đối với xã hội (Trang 13 SGK)'}
          </h3>
        </div>
        <BilingualText
          vi="💭 Câu hỏi gợi mở: 'Cuộc sống của chúng ta sẽ thay đổi như thế nào nếu một ngày không có máy tính và các thiết bị thông minh?'"
          en="💭 Reflective Question: 'How would our daily life change if one day there were no computers and smart devices?'"
          viClassName="text-xs sm:text-sm text-slate-800 italic"
        />
      </div>

      {/* 5 Impact Areas Interactive Explorer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Navigation Buttons */}
        <div className="space-y-2 md:col-span-1">
          {contributionAreas.map((area) => {
            const Icon = area.icon;
            const isSelected = activeArea === area.id;

            return (
              <button
                key={area.id}
                type="button"
                onClick={() => setActiveArea(area.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md font-bold'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs truncate font-medium">
                    {bilingualMode === 'en' ? area.titleEn : area.titleVi}
                  </span>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-40'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Detail Card */}
        <div className="md:col-span-2 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-700">
                {bilingualMode === 'en' ? 'Core Application Domain' : 'Lĩnh vực ứng dụng cốt lõi'}
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                {bilingualMode === 'en'
                  ? contributionAreas[activeArea].titleEn
                  : contributionAreas[activeArea].titleVi}
              </h4>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              {React.createElement(contributionAreas[activeArea].icon, { className: 'w-6 h-6' })}
            </div>
          </div>

          <BilingualText
            vi={contributionAreas[activeArea].descVi}
            en={contributionAreas[activeArea].descEn}
            viClassName="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed"
            enClassName="text-[11px]"
          />

          {/* Real-world Concrete Examples */}
          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {bilingualMode === 'en' ? 'Concrete Real-World Examples:' : 'Ví dụ thực tế trong đời sống:'}
            </span>
            <div className="grid grid-cols-1 gap-2">
              {contributionAreas[activeArea].examplesVi.map((exVi, idx) => {
                const exEn = contributionAreas[activeArea].examplesEn[idx];
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-950 dark:text-emerald-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <BilingualText
                        inline
                        vi={exVi}
                        en={exEn}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Pedagogical Question Prompts & Guidance */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={2} className="mt-4" />
    </div>
  );
};
