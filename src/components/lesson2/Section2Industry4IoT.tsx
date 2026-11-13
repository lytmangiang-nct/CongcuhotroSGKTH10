import React, { useState } from 'react';
import { Layers, Globe, Cpu, CheckCircle2, Bookmark, Eye, Volume2, Sparkles, HelpCircle, ArrowRight, Smartphone, Scale, Watch, Calculator } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';
import { IndustrialRevolutions3DViewer, RevolutionEra } from '../three/IndustrialRevolutions3DViewer';

export const Section2Industry4IoT: React.FC = () => {
  const { bilingualMode, speak, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const [selectedRevolution, setSelectedRevolution] = useState<number>(3); // Default to Industry 4.0
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const revolutions = [
    {
      index: 0,
      titleVi: 'CMCN lần thứ nhất (1.0)',
      titleEn: '1st Industrial Revolution (1.0)',
      timeVi: 'Cuối thế kỉ XVIII – đầu thế kỉ XIX',
      timeEn: 'Late 18th – Early 19th Century',
      keyFactorVi: 'Động cơ hơi nước & Cơ giới hóa',
      keyFactorEn: 'Steam Engine & Mechanization',
      descVi: 'Chuyển đổi lịch sử từ lao động thủ công sang cơ giới với dấu ấn động cơ hơi nước, dệt may và đường sắt.',
      descEn: 'Historical transition from manual crafting to mechanization powered by steam engines and iron railways.'
    },
    {
      index: 1,
      titleVi: 'CMCN lần thứ hai (2.0)',
      titleEn: '2nd Industrial Revolution (2.0)',
      timeVi: 'Cuối thế kỉ XIX – đầu thế kỉ XX',
      timeEn: 'Late 19th – Early 20th Century',
      keyFactorVi: 'Điện năng & Dây chuyền sản xuất',
      keyFactorEn: 'Electrical Power & Assembly Lines',
      descVi: 'Công nghiệp bùng nổ; điện năng được dùng phổ biến; sản xuất hàng loạt theo dây chuyền tập trung.',
      descEn: 'Industrial boom; electricity widely utilized; mass assembly-line manufacturing pioneered by Ford.'
    },
    {
      index: 2,
      titleVi: 'CMCN lần thứ ba (3.0)',
      titleEn: '3rd Industrial Revolution (3.0)',
      timeVi: 'Cuối thế kỉ XX – đầu thế kỉ XXI',
      timeEn: 'Late 20th – Early 21st Century',
      keyFactorVi: 'Máy tính & Kỷ nguyên Tin học',
      keyFactorEn: 'Computers & Automation',
      descVi: 'Máy tính hỗ trợ con người trong hoạt động trí tuệ; tin học tự động hóa sản xuất và làm thay đổi cuộc sống.',
      descEn: 'Computers supporting human intellect; electronics and automation radically transforming societies.'
    },
    {
      index: 3,
      titleVi: 'CMCN lần thứ tư (4.0)',
      titleEn: '4th Industrial Revolution (4.0)',
      timeVi: 'Đầu thế kỉ XXI – Hiện nay',
      timeEn: 'Early 21st Century – Present',
      keyFactorVi: 'IoT & Hệ thống thực - ảo (CPS)',
      keyFactorEn: 'IoT & Cyber-Physical Systems (CPS)',
      descVi: 'Hệ thống IoT và hệ thống kết hợp thực - ảo trở nên phổ biến trên nền tảng công nghệ số tích hợp AI, Cloud, Big Data.',
      descEn: 'Ubiquitous IoT and Cyber-Physical Systems fusing digital, biological, and physical worlds with AI and Big Data.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700">
            {bilingualMode === 'en' ? 'Section 1b • Pages 12 – 13 Textbook' : 'Mục 1b • Trang 12 – 13 SGK'}
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {bilingualMode === 'en'
              ? 'ROLE OF SMART DEVICES IN INDUSTRY 4.0 & IoT'
              : 'VAI TRÒ CỦA THIẾT BỊ THÔNG MINH TRONG CMCN 4.0 & IoT'}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            {bilingualMode === 'en'
              ? 'Industrial Revolutions, Internet of Things (IoT), and the Knowledge Economy'
              : 'Các thời kì Cách mạng công nghiệp, Hệ thống kết nối vạn vật (IoT) và Nền kinh tế tri thức'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(12);
              setShowOriginalModal(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-amber-600" />
            <span>{bilingualMode === 'en' ? 'View Figure 2.2 (p. 12)' : 'Xem Hình 2.2 (Tr. 12)'}</span>
          </button>
          <button
            type="button"
            onClick={() => speak('Figure 2.2 Four eras of the industrial revolution: 1st mechanization and steam engine; 2nd electricity and assembly line; 3rd computers and automation; 4th IoT and cyber-physical systems.', 'en')}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            title="Listen in English"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
        </div>
      </div>

      {/* Interactive 4 Industrial Revolutions Timeline (Hình 2.2 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs">
              {bilingualMode === 'en' ? 'Figure 2.2 Textbook' : 'Hình 2.2 SGK'}
            </span>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
              {bilingualMode === 'en'
                ? 'Exploring the 4 Industrial Revolution Eras (Industry 1.0 – 4.0)'
                : 'Khám phá 4 thời kì của Cách mạng công nghiệp (CMCN)'}
            </h3>
          </div>
          <span className="text-xs text-indigo-700 font-semibold">
            {bilingualMode === 'en' ? 'Click each era to see the technological leap:' : 'Bấm chọn từng thời kì để xem bước nhảy vọt:'}
          </span>
        </div>

        {/* 4 Revolution Step Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {revolutions.map((rev) => (
            <button
              key={rev.index}
              type="button"
              onClick={() => setSelectedRevolution(rev.index)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedRevolution === rev.index
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="text-[10px] font-mono opacity-80 uppercase tracking-wider">
                {bilingualMode === 'en' ? `Era ${rev.index + 1}` : `Thời kì ${rev.index + 1}`}
              </div>
              <div className="font-extrabold text-xs sm:text-sm mt-0.5 leading-tight">
                {bilingualMode === 'en' ? rev.titleEn : rev.titleVi}
              </div>
              <div className="text-[10px] mt-1 opacity-90 truncate">
                {bilingualMode === 'en' ? rev.keyFactorEn : rev.keyFactorVi}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Revolution Details Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-slate-50 border border-indigo-200/80 space-y-2 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-200/60 pb-2">
            <div>
              <span className="text-xs font-bold uppercase text-indigo-700">
                {bilingualMode === 'en'
                  ? revolutions[selectedRevolution].timeEn
                  : revolutions[selectedRevolution].timeVi}
              </span>
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                {bilingualMode === 'en'
                  ? revolutions[selectedRevolution].titleEn
                  : revolutions[selectedRevolution].titleVi}
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs">
              {bilingualMode === 'en'
                ? `Key Driver: ${revolutions[selectedRevolution].keyFactorEn}`
                : `Dấu ấn: ${revolutions[selectedRevolution].keyFactorVi}`}
            </span>
          </div>

          <BilingualText
            vi={revolutions[selectedRevolution].descVi}
            en={revolutions[selectedRevolution].descEn}
            viClassName="text-xs sm:text-sm text-slate-800 leading-relaxed pt-1"
            enClassName="text-[11px] sm:text-xs text-slate-600"
          />
        </div>
      </div>

      {/* 3D Interactive Simulation of the 4 Industrial Revolutions (Three.js WebGL) */}
      <IndustrialRevolutions3DViewer
        initialEra={((selectedRevolution + 1) as RevolutionEra)}
        onEraSelect={(era) => setSelectedRevolution(era - 1)}
      />

      {/* Knowledge Economy & Smartphone Value Decomposition */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/60 to-orange-50/60 border border-amber-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
            <Smartphone className="w-4 h-4" />
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
            {bilingualMode === 'en'
              ? 'Knowledge Economy: Smartphone Value Structure Breakdown (Page 12)'
              : 'Nền kinh tế tri thức: Phân tích cơ cấu giá trị một chiếc điện thoại thông minh (SGK Trang 12)'}
          </h3>
        </div>

        <BilingualText
          vi="Ngày nay, tri thức — yếu tố trí tuệ của con người — chiếm tỉ trọng áp đảo trong cơ cấu giá trị của sản phẩm:"
          en="Today, knowledge — the intellectual capital of humanity — accounts for an overwhelming proportion of product value:"
          viClassName="text-xs sm:text-sm text-slate-800 leading-relaxed"
          enClassName="text-[11px] text-slate-600"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
            <div className="text-xs font-bold text-slate-500 uppercase">
              {bilingualMode === 'en' ? 'Physical Materials & Assembly (< 50%)' : 'Vật liệu & Gia công lắp ráp (< 50%)'}
            </div>
            <div className="text-lg font-black text-slate-800">
              {bilingualMode === 'en' ? 'Accounts for less than half the retail price' : 'Chiếm chưa đến một nửa giá thành'}
            </div>
            <BilingualText
              vi="Bao gồm chip thô, kim loại, nhựa vỏ máy, pin và công nhân đứng dây chuyền."
              en="Includes raw silicon, chassis metals, plastics, battery cells, and assembly-line manual labor."
              viClassName="text-xs text-slate-600"
              enClassName="text-[10px] text-slate-500"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-amber-100/70 border-2 border-amber-400 space-y-1">
            <div className="text-xs font-bold text-amber-900 uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Value of Intellectual Knowledge (> 50%)' : 'Giá trị của Tri Thức (> 50%)'}</span>
            </div>
            <div className="text-lg font-black text-amber-950">
              {bilingualMode === 'en' ? 'Accounts for the vast majority of product value' : 'Chiếm phần lớn giá trị sản phẩm'}
            </div>
            <BilingualText
              vi="Chi phí nghiên cứu thiết kế, thuật toán phần mềm, hệ điều hành và mua các bản quyền sáng chế công nghệ."
              en="R&D, product design, software algorithms, mobile OS, and proprietary intellectual patent licenses."
              viClassName="text-xs text-amber-950"
              enClassName="text-[10px] text-amber-800"
            />
          </div>
        </div>
      </div>

      {/* Official Textbook Golden Box 1 (Trang 13 SGK) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-100/90 via-amber-50 to-orange-100/80 border-2 border-dashed border-amber-500 shadow-md space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
            <Bookmark className="w-4 h-4" />
          </div>
          <span className="font-black text-sm uppercase tracking-wider text-amber-950">
            {bilingualMode === 'en' ? 'KEY TAKEAWAYS • PAGE 13 TEXTBOOK' : 'HỘP GHI NHỚ TRỌNG TÂM • TRANG 13 SGK'}
          </span>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed pl-2">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 text-base font-bold shrink-0">•</span>
            <BilingualText
              vi="Thiết bị thông minh là thiết bị điện tử có thể hoạt động tự chủ không cần sự can thiệp của con người, tự thích ứng với hoàn cảnh và có khả năng kết nối với các thiết bị khác để trao đổi dữ liệu."
              en="A smart device is an electronic device that can operate autonomously without human intervention, adapt to its environment, and connect to other devices to exchange data."
            />
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 text-base font-bold shrink-0">•</span>
            <BilingualText
              vi="Thiết bị thông minh đóng vai trò chủ chốt trong các hệ thống IoT — một nội dung cơ bản của cuộc cách mạng công nghiệp 4.0."
              en="Smart devices play a pivotal role in IoT systems — a fundamental pillar of the Fourth Industrial Revolution."
            />
          </li>
        </ul>
      </div>

      {/* Reinforcement Questions (Hình 2.3 SGK) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-black text-xs">
            {bilingualMode === 'en' ? 'Reinforcement Q1' : 'Câu hỏi củng cố 1'}
          </span>
          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? 'Which device in Figure 2.3 is a smart device? Why? (Page 13 Textbook)'
              : 'Thiết bị nào trong Hình 2.3 là thiết bị thông minh? Tại sao? (Trang 13 SGK)'}
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'scale',
              titleVi: 'a) Cân điện tử',
              titleEn: 'a) Digital scale',
              icon: Scale,
              isSmart: false,
              reasonVi: 'Chỉ có chức năng đo và hiển thị số cân; không có kết nối trao đổi dữ liệu với mạng bên ngoài.',
              reasonEn: 'Only measures and displays weight; lacks network connectivity to exchange data externally.'
            },
            {
              id: 'watch',
              titleVi: 'b) Đồng hồ kết nối điện thoại qua bluetooth',
              titleEn: 'b) Bluetooth connected smartwatch',
              icon: Watch,
              isSmart: true,
              reasonVi: 'LÀ THIẾT BỊ THÔNG MINH: Có khả năng kết nối Bluetooth, tự chủ nhận thông báo, đo nhịp tim và đồng bộ dữ liệu tự động với smartphone.',
              reasonEn: 'SMART DEVICE: Connects via Bluetooth, autonomously handles notifications, monitors heart rate, and syncs data with smartphones.'
            },
            {
              id: 'calc',
              titleVi: 'c) Máy tính cầm tay Casio',
              titleEn: 'c) Handheld electronic calculator',
              icon: Calculator,
              isSmart: false,
              reasonVi: 'Tính toán theo lệnh bấm tay trực tiếp của con người; không tự chủ hoạt động và không có kết nối mạng trao đổi dữ liệu.',
              reasonEn: 'Operates solely under direct manual human keystrokes; does not operate autonomously or connect to networks.'
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDevice(item.id)}
              className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedDevice === item.id
                  ? item.isSmart
                    ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30'
                    : 'border-amber-400 bg-amber-50/40 dark:bg-amber-950/30'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  {bilingualMode === 'en' ? item.titleEn : item.titleVi}
                </span>
              </div>
              <div className="mt-2">
                <BilingualText
                  vi={item.reasonVi}
                  en={item.reasonEn}
                  viClassName="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed"
                  enClassName="text-[10px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Pedagogical Question Prompts & Guidance */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={2} className="mt-4" />
    </div>
  );
};
