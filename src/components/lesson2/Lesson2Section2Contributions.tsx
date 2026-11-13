import React, { useState } from 'react';
import {
  Briefcase,
  Bot,
  Activity,
  Users,
  Building2,
  Sparkles,
  HelpCircle,
  Eye,
  CheckCircle2,
  Globe2,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

const CONTRIBUTIONS = [
  {
    id: 'manage',
    titleVi: '1. Quản lí điều hành',
    titleEn: '1. Administrative Management',
    icon: Building2,
    color: 'from-blue-600 to-indigo-600',
    highlight: 'Trường học, Ngân hàng & Doanh nghiệp',
    descVi: 'Trường học quản lí kết quả học tập của học sinh; Ngân hàng quản lí tài khoản và giao dịch an toàn; Doanh nghiệp quản lí sản xuất, bán hàng, kho bãi và kế toán. Giúp công việc nhanh chóng, chính xác, hiệu quả và tiết kiệm chi phí.',
    descEn: 'Managing student academic records in schools, secure financial transactions in banks, and enterprise enterprise resource planning (ERP).'
  },
  {
    id: 'auto',
    titleVi: '2. Tự động hoá sản xuất',
    titleEn: '2. Industrial Automation & Robotics',
    icon: Bot,
    color: 'from-amber-600 to-orange-600',
    highlight: 'Robot trong môi trường độc hại, hạt nhân, dưới nước',
    descVi: 'Nhờ máy tính, tự động hoá đã thay đổi căn bản quy trình sản xuất. Các thiết bị thông minh, robot hoạt động chính xác theo chương trình, thay thế con người làm việc ở những môi trường cực kỳ nguy hiểm như nhà máy điện hạt nhân hay dưới đáy biển sâu.',
    descEn: 'Robotics and computerized automation execute precise operations in dangerous environments like nuclear power plants or deep sea.'
  },
  {
    id: 'science',
    titleVi: '3. Giải quyết bài toán khoa học kĩ thuật',
    titleEn: '3. Scientific & Engineering Computation',
    icon: Activity,
    color: 'from-emerald-600 to-teal-600',
    highlight: 'Dự báo thời tiết, Giải mã gen & Bản đồ số',
    descVi: 'Khả năng tính toán siêu nhanh và chính xác của máy tính hỗ trợ mô phỏng khí quyển dự báo bão, kiểm nghiệm thiết kế công trình xây dựng, giải mã bản đồ gen sinh học và tối ưu hóa hệ thống bản đồ số dẫn đường GPS.',
    descEn: 'Ultra-fast computing for weather simulation, genomic sequencing, civil engineering analysis, and digital mapping navigation.'
  },
  {
    id: 'work',
    titleVi: '4. Thay đổi cách thức làm việc các ngành nghề',
    titleEn: '4. Transforming Workplaces & Industries',
    icon: Briefcase,
    color: 'from-purple-600 to-pink-600',
    highlight: 'Dạy học online, Mua hàng từ xa & Chế bản điện tử',
    descVi: 'Nhiều công việc được thực hiện trực tuyến như học trực tuyến, thương mại điện tử. Công nghệ in sắp chữ chì cổ điển được thay bằng chế bản máy tính; máy ảnh phim được thay thế bằng máy ảnh số và cảm biến hiện đại với chi phí rẻ hơn nhiều.',
    descEn: 'Online education, e-commerce, digital publishing replacing hot metal typesetting, and digital photography replacing analog film.'
  },
  {
    id: 'comm',
    titleVi: '5. Giao tiếp cộng đồng & Mạng xã hội',
    titleEn: '5. Community Communication & Social Networks',
    icon: Users,
    color: 'from-rose-600 to-red-600',
    highlight: 'Email, Zalo, Facebook, YouTube',
    descVi: 'Tin học giúp trao đổi thông tin nhanh chóng và tức thời trên phạm vi toàn cầu qua thư điện tử, diễn đàn và mạng xã hội. Mọi hoạt động kết nối, chia sẻ tri thức và tương tác cộng đồng đều trở nên trực quan và dễ dàng.',
    descEn: 'Instant global communication via email, forums, and social media platforms (Zalo, Facebook, YouTube).'
  }
];

export const Lesson2Section2Contributions: React.FC = () => {
  const { setCurrentPage, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const [selectedContribution, setSelectedContribution] = useState<string>('manage');
  const [reflectionAnswer, setReflectionAnswer] = useState<string>('');

  const activeItem = CONTRIBUTIONS.find((c) => c.id === selectedContribution) || CONTRIBUTIONS[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-black text-xs uppercase tracking-wider">
            Mục 2.a • Trang 13 – 14 SGK
          </span>
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(13);
              setShowOriginalModal(true);
            }}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Đối chiếu SGK Trang 13 gốc</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          2. Các Thành Tựu Của Tin Học: a) Đóng Góp Của Tin Học Với Xã Hội
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Năm lĩnh vực cốt lõi Tin học làm thay đổi thế giới: Quản lí, Tự động hóa, Khoa học, Nghề nghiệp và Giao tiếp
        </p>
      </div>

      {/* Hoạt động 2: Tưởng tượng thế giới không có máy tính */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
            HĐ2
          </div>
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
            Hoạt Động 2: Vai Trò Của Tin Học Đối Với Xã Hội
          </h3>
        </div>
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-2">
          <BilingualText
            id="l2-act2-q"
            vi="Câu hỏi thảo luận SGK: 'Cuộc sống sẽ thay đổi như thế nào nếu không có máy tính và các thiết bị thông minh?'"
            en="Textbook discussion prompt: 'How would life change without computers and smart devices?'"
          />
          <p className="text-[11px] text-slate-500 italic">
            Gợi ý: Mọi giao dịch ngân hàng phải ghi chép tay trên sổ sách, không có internet, thông tin liên lạc mất nhiều ngày bằng thư giấy, không có dự báo bão từ vệ tinh, sản xuất hàng hóa chậm chạp và tốn sức người.
          </p>
        </div>
      </div>

      {/* 5 Pillars of Informatics Contributions */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>5 Lĩnh Vực Đóng Góp Lớn Của Tin Học Trong Đời Sống</span>
        </h3>

        {/* Pillar Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {CONTRIBUTIONS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedContribution === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedContribution(item.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/90 dark:bg-indigo-950/50 shadow-sm ring-1 ring-indigo-500'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight">
                  {item.titleVi}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Card for Selected Pillar */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/40 dark:from-slate-850 dark:to-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
              Lĩnh vực trọng điểm
            </span>
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
              {activeItem.highlight}
            </span>
          </div>

          <h4 className="font-black text-base text-slate-900 dark:text-white">
            {activeItem.titleVi}
          </h4>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeItem.descVi}
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400">Trang 13 – 14 SGK Tin học 10</span>
          <button
            type="button"
            onClick={() => setCurrentPage(4)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>Sang 2b. Thành tựu phát triển của Tin học</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
