import React, { useState } from 'react';
import {
  Factory,
  Zap,
  Cpu,
  Globe,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  Bookmark,
  TrendingUp,
  Brain,
  Cloud,
  Database,
  ArrowRight
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

interface RevolutionEra {
  id: number;
  nameVi: string;
  period: string;
  hallmarkVi: string;
  hallmarkEn: string;
  descVi: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const REVOLUTIONS: RevolutionEra[] = [
  {
    id: 1,
    nameVi: 'CMCN lần thứ nhất',
    period: 'Cuối TK XVIII – Đầu TK XIX',
    hallmarkVi: 'Động cơ hơi nước & Cơ giới hoá',
    hallmarkEn: 'Steam Engine & Mechanization',
    descVi: 'Chuyển đổi căn bản từ lao động thủ công phân tán sang nền sản xuất cơ khí hoá với dấu ấn vĩ đại là máy hơi nước James Watt.',
    icon: Factory,
    color: 'from-amber-600 to-amber-700'
  },
  {
    id: 2,
    nameVi: 'CMCN lần thứ hai',
    period: 'Cuối TK XIX – Đầu TK XX',
    hallmarkVi: 'Điện năng & Dây chuyền sản xuất hàng loạt',
    hallmarkEn: 'Electricity & Assembly Line Mass Production',
    descVi: 'Sử dụng điện năng phổ biến, ra đời dây chuyền sản xuất lắp ráp tập trung, tạo ra bước nhảy vọt về sản lượng công nghiệp.',
    icon: Zap,
    color: 'from-blue-600 to-indigo-700'
  },
  {
    id: 3,
    nameVi: 'CMCN lần thứ ba',
    period: 'Cuối TK XX – Đầu TK XXI',
    hallmarkVi: 'Máy tính, Tự động hoá & Internet sơ khai',
    hallmarkEn: 'Computers, Automation & Digital Era',
    descVi: 'Máy tính điện tử hỗ trợ đắc lực con người trong các hoạt động trí tuệ. Tin học trở thành động lực làm thay đổi sâu sắc mọi mặt đời sống.',
    icon: Cpu,
    color: 'from-emerald-600 to-teal-700'
  },
  {
    id: 4,
    nameVi: 'CMCN lần thứ tư (4.0)',
    period: 'Đầu thế kỉ XXI – Hiện nay',
    hallmarkVi: 'IoT, AI & Hệ thống kết hợp Thực - Ảo',
    hallmarkEn: 'IoT, AI, Big Data & Cyber-Physical Systems',
    descVi: 'Hệ thống kết hợp thực - ảo (Cyber-Physical Systems) và mạng IoT kết nối toàn cầu. Mờ ranh giới giữa thế giới vật lý và không gian số.',
    icon: Globe,
    color: 'from-violet-600 to-purple-800'
  }
];

export const Lesson2Section1RoleIndustry4: React.FC = () => {
  const { setCurrentPage, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const [activeEra, setActiveEra] = useState<number>(4);
  const [selectedQuestion1, setSelectedQuestion1] = useState<string | null>(null);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
          <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 font-black text-xs uppercase tracking-wider">
            Mục 1.b • Trang 12 – 13 SGK
          </span>
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(12);
              setShowOriginalModal(true);
            }}
            className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
          >
            Đối chiếu SGK Trang 12 gốc →
          </button>
        </div>

        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          b) Vai Trò Của Thiết Bị Thông Minh Trong Cách Mạng Công Nghiệp 4.0
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Hệ thống IoT, trí tuệ nhân tạo, nền kinh tế tri thức và xóa mờ ranh giới thực - ảo
        </p>
      </div>

      {/* Interactive Timeline of 4 Industrial Revolutions (Hình 2.2 SGK) */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold">
              <Factory className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Hình 2.2: Bốn Thời Kì Của Cách Mạng Công Nghiệp (CMCN)
              </h3>
              <p className="text-xs text-slate-500">Bấm chọn từng thời kì để khám phá bước chuyển dịch công nghệ</p>
            </div>
          </div>
        </div>

        {/* 4 Stage Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {REVOLUTIONS.map((rev) => {
            const Icon = rev.icon;
            const isSelected = activeEra === rev.id;

            return (
              <div
                key={rev.id}
                onClick={() => setActiveEra(rev.id)}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-violet-600 bg-violet-50/80 dark:bg-violet-950/40 shadow-sm ring-2 ring-violet-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white bg-gradient-to-br ${rev.color}`}>
                      {rev.id}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Thời kì {rev.id}
                    </span>
                  </div>
                  <div className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight">
                    {rev.nameVi}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {rev.period}
                  </div>
                </div>

                <div className="text-[11px] font-bold text-violet-700 dark:text-violet-300 mt-2 truncate">
                  {rev.hallmarkVi}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Era Spotlight */}
        {(() => {
          const current = REVOLUTIONS.find((r) => r.id === activeEra) || REVOLUTIONS[3];
          const Icon = current.icon;
          return (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-violet-50 via-slate-50 to-indigo-50 dark:from-slate-850 dark:to-slate-800 border border-violet-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${current.color} text-white flex items-center justify-center shrink-0 shadow-md`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                    {current.nameVi}: {current.hallmarkVi}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold">
                    {current.period}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                  {current.descVi}
                </p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Key Concepts Grid: AI, IoT, Cloud, Big Data & Knowledge Economy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* IoT Definition */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-indigo-700 dark:text-indigo-400">
            <Globe className="w-5 h-5" />
            <h4 className="font-extrabold text-sm uppercase tracking-wide">
              Khái niệm IoT (Internet of Things)
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>IoT</strong> là việc kết nối các thiết bị thông minh với nhau nhằm thu thập và xử lí thông tin một cách tự động, tức thời trên diện rộng (giám sát giao thông, cảnh báo thiên tai, nhà máy thông minh).
          </p>
        </div>

        {/* Knowledge Economy */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center gap-2.5 text-amber-700 dark:text-amber-400">
            <TrendingUp className="w-5 h-5" />
            <h4 className="font-extrabold text-sm uppercase tracking-wide">
              Nền Kinh Tế Tri Thức (Knowledge Economy)
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Tri thức chiếm tỉ trọng lớn trong giá trị sản phẩm. Ví dụ: Trong giá bán chiếc điện thoại thông minh, vật liệu và nhân công chiếm chưa đến một nửa; phần lớn là chi phí <strong>thiết kế, phần mềm và bản quyền công nghệ</strong>.
          </p>
        </div>
      </div>

      {/* Ghi Nhớ SGK Trang 13 (Hộp vàng đóng khung) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/80 dark:bg-amber-950/40 border-2 border-dashed border-amber-500/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-black text-xs uppercase tracking-widest">
          <Bookmark className="w-4 h-4 text-amber-600" />
          <BilingualText
            vi="HỘP GHI NHỚ TRỌNG TÂM (TRANG 13 SGK)"
            en="CORE SUMMARY BOX (TEXTBOOK PAGE 13)"
          />
        </div>

        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed pl-1">
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Thiết bị thông minh là thiết bị điện tử có thể hoạt động tự chủ không cần sự can thiệp của con người, tự thích ứng với hoàn cảnh và có khả năng kết nối với các thiết bị khác để trao đổi dữ liệu."
                en="A smart device is an electronic device that can operate autonomously without human intervention, adapt to its environment, and connect with other devices to exchange data."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Thiết bị thông minh đóng vai trò chủ chốt trong các hệ thống IoT — một nội dung cơ bản của cuộc Cách mạng công nghiệp lần thứ tư (CMCN 4.0)."
                en="Smart devices play a pivotal role in IoT systems — a fundamental pillar of the Fourth Industrial Revolution (Industry 4.0)."
              />
            </div>
          </li>
        </ul>
      </div>

      {/* Câu hỏi củng cố cuối mục 1 (Hình 2.3 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
            <BilingualText
              vi="Câu Hỏi Củng Cố Mục 1 (Hình 2.3 SGK Trang 13)"
              en="Checkpoint Questions for Section 1 (Figure 2.3 Page 13)"
            />
          </h4>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <strong>Câu 1:</strong> Thiết bị nào trong Hình 2.3 là thiết bị thông minh? Tại sao?
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
            {[
              {
                id: 'can',
                labelVi: 'a) Cân điện tử thông thường',
                labelEn: 'a) Standard digital scale',
                isSmart: false,
                noteVi: 'Chỉ hiển thị trọng lượng, không kết nối trao đổi dữ liệu tự động.',
                noteEn: 'Only displays weight, lacks autonomous networking.'
              },
              {
                id: 'watch',
                labelVi: 'b) Đồng hồ kết nối điện thoại qua bluetooth',
                labelEn: 'b) Bluetooth smartwatch connected to phone',
                isSmart: true,
                noteVi: 'Hoạt động tự chủ, đồng bộ thông báo, sức khỏe qua Bluetooth.',
                noteEn: 'Operates autonomously, syncing notifications and health telemetry via Bluetooth.'
              },
              {
                id: 'calc',
                labelVi: 'c) Máy tính cầm tay bỏ túi',
                labelEn: 'c) Pocket handheld calculator',
                isSmart: false,
                noteVi: 'Chỉ tính toán theo nút bấm vật lí, không tự chủ và không kết nối mạng.',
                noteEn: 'Only performs push-button arithmetic, lacks autonomous operations and networking.'
              }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSelectedQuestion1(opt.id)}
                className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  selectedQuestion1 === opt.id
                    ? opt.isSmart
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950 dark:text-emerald-100'
                      : 'bg-rose-50 border-rose-400 text-rose-950 font-bold dark:bg-rose-950 dark:text-rose-100'
                    : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-indigo-300'
                }`}
              >
                <div>
                  <BilingualText vi={opt.labelVi} en={opt.labelEn} />
                </div>
                {selectedQuestion1 === opt.id && opt.isSmart && (
                  <div className="mt-1 text-[11px] font-normal opacity-90">
                    <BilingualText vi={opt.noteVi} en={opt.noteEn} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs text-slate-400">Trang 12 – 13 SGK Tin học 10</span>
          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>Sang Phần 2: Đóng góp của Tin học</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
