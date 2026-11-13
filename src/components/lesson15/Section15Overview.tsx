import React, { useState } from 'react';
import {
  Sparkles,
  Target,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  Volume2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { GraphicAssembly3DViewer } from './GraphicAssembly3DViewer';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section15Overview: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);

  const flyerComponentsVi = [
    { name: '1. Khối nền 2 màu', desc: 'Khối vàng phía trên và khối xanh răng cưa phía dưới được ghép khít khao bằng phép Difference.' },
    { name: '2. Dây cờ tam giác', desc: 'Dãy lá cờ đa sắc viền đỉnh áp phích, nhân bản liên tiếp và gom nhóm co dãn.' },
    { name: '3. Sách và giá sách', desc: 'Dãy sách nhiều màu có gáy uốn cong 3D tinh tế và giá sách gỗ nằm ngang.' },
    { name: '4. Các khối văn bản', desc: 'Tiêu đề HỘI SÁCH HÀ NỘI cùng thông tin thời gian, địa điểm, sự kiện tổ chức.' },
    { name: '5. Hai bóng hội thoại', desc: 'Bóng thông báo "VÀO CỬA TỰ DO" và "GIẢM GIÁ TỚI 70%" ghép từ elip và tam giác.' },
    { name: '6. Vách ngăn nét đứt', desc: 'Đoạn nét đứt dọc tinh tế phân tách giữa hai cột Thời gian và Địa điểm.' }
  ];

  const flyerComponentsEn = [
    { name: '1. Bicolor Canvas', desc: 'Top gold field and bottom blue field with a sawtooth cutout interlocking edge via Difference.' },
    { name: '2. Pennant Bunting', desc: 'Festive multicolored triangular flags lining the poster canopy, duplicated and scaled.' },
    { name: '3. Books & Bookshelf', desc: 'Colorful book collection with realistic 3D cylindrical spine shading on a wooden shelf.' },
    { name: '4. Typographic Content', desc: 'Header HANOI BOOK FAIR alongside event schedule, dates, and venue coordinates.' },
    { name: '5. Dual Speech Bubbles', desc: 'Promotional callouts for "FREE ADMISSION" and "UP TO 70% DISCOUNT" via Union.' },
    { name: '6. Dashed Stroke Divider', desc: 'Subtle vertical dashed dividing line separating schedule time and venue address.' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-amber-200 text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-xs">
              {bilingualMode === 'en' ? 'Topic 4 • Lesson 15 • Pages 82 – 85' : 'Chủ đề 4 • Bài 15 • Trang 82 – 85'}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold border border-emerald-400/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Digital Publishing & Assembly' : 'Hoàn thiện dự án đồ hoạ số'}</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {bilingualMode === 'en' ? 'FINALIZING GRAPHIC IMAGES' : 'HOÀN THIỆN HÌNH ẢNH ĐỒ HOẠ'}
          </h1>

          <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed pt-1">
            {bilingualMode === 'en'
              ? 'Synthesize all foundational vector techniques learned across Lessons 12–14: shape subtraction, grouping, 3D spine gradients, speech bubble callouts, dashed strokes, and high-resolution raster export.'
              : 'Tổng hợp và vận dụng toàn diện các kiến thức đồ hoạ từ Bài 12 đến 14: phép ghép Difference răng cưa, nhân bản nhóm cờ tam giác, kỹ thuật tạo độ cong gáy sách, bóng hội thoại, vách ngăn nét đứt và xuất ảnh in PNG chất lượng cao.'}
          </p>
        </div>
      </div>

      {/* Learning Objectives Box (Page 82) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-3">
        <div className="flex items-center gap-2.5 text-amber-400 font-bold text-base">
          <Target className="w-5 h-5" />
          <span>{bilingualMode === 'en' ? 'Key Learning Objectives (SGK Page 82)' : 'Mục tiêu trọng tâm bài học (SGK Trang 82)'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 text-slate-200 text-sm leading-relaxed flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300">
              {bilingualMode === 'en' ? 'Produce real-world digital publications:' : 'Tạo được sản phẩm số đơn giản, hữu ích và thực tế:'}
            </span>{' '}
            {bilingualMode === 'en'
              ? 'Design corporate logos, promotional web banners, festival pennants, event flyers, advertising posters, and custom greeting cards ready for commercial print or digital delivery.'
              : 'Thiết kế biểu trưng logo, tạo banner quảng cáo, băng-rôn lễ hội, áp phích, poster sự kiện và thiệp chúc mừng đáp ứng tiêu chuẩn in ấn và truyền thông số.'}
          </div>
        </div>
      </div>

      {/* 3D WebGL Simulation Showcase */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base sm:text-lg">
            <Layers className="w-5 h-5 text-amber-400" />
            <span>
              {bilingualMode === 'en'
                ? 'Interactive 3D Graphic Assembly & Exploded Layer Viewer'
                : 'Mô phỏng 3D Three.js: Phân rã & Lắp ráp Áp phích Hội sách'}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">WebGL • Three.js</span>
        </div>

        <GraphicAssembly3DViewer />
      </div>

      {/* Warm-up Collaborative Challenge: Dissecting Hanoi Book Fair Flyer (Page 82) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 text-slate-100 font-bold text-base">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <span>
            {bilingualMode === 'en'
              ? 'Warm-up Challenge: Dissecting the Hanoi Book Fair Promotional Flyer (Fig 15.1)'
              : 'Hoạt động Khởi động: Phân rã cấu trúc Tờ rơi Hội sách Hà Nội (Hình 15.1)'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {bilingualMode === 'en'
            ? 'You are assigned to design an eye-catching promotional flyer for the Hanoi Book Fair. To ensure clarity and high visual appeal, the design is structured into 6 modular object groups:'
            : 'Em được giao nhiệm vụ thiết kế tờ rơi quảng bá cho Hội chợ sách. Tờ rơi cần được thiết kế sáng sủa, dễ nắm bắt thông tin. Trong bài thực hành này, hình vẽ được chia nhỏ thành 6 nhóm đối tượng để thiết kế từng bước:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {(bilingualMode === 'en' ? flyerComponentsEn : flyerComponentsVi).map((comp, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTaskIndex(selectedTaskIndex === idx ? null : idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                selectedTaskIndex === idx
                  ? 'bg-indigo-950/60 border-indigo-500 shadow-md ring-1 ring-indigo-400/40'
                  : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                <span>{comp.name}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${selectedTaskIndex === idx ? 'rotate-90 text-indigo-400' : 'text-slate-500'}`} />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {comp.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Pedagogical Prompts Widget */}
        <div className="pt-2">
          <TeacherPromptsWidget lessonId={15} sectionIndex={0} />
        </div>

        {/* Quick jump to Section 1 */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <span>{bilingualMode === 'en' ? 'Proceed to Section 1: Background & Bunting' : 'Chuyển sang Mục 1: Vẽ nền & Dây cờ tam giác'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
