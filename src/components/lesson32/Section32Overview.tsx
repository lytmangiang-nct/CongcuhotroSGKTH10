import React from 'react';
import { useBook } from '../../context/BookContext';
import { SolarSystem3DLab } from './SolarSystem3DLab';
import { 
  Code2, 
  Orbit, 
  Calendar, 
  User, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Workflow, 
  BookOpen,
  Cpu
} from 'lucide-react';

export const Section32Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage } = useBook();
  const isVi = bilingualMode !== 'en';

  const roadmapItems = [
    {
      step: '01',
      page: 1,
      titleVi: 'Nhiệm vụ 1 & 2: Tách Họ Tên & Trọng Lực Hành Tinh',
      titleEn: 'Task 1 & 2: Name Slicing & Planetary Gravity',
      badgeVi: 'Trang 153 – 154',
      badgeEn: 'Pages 153 – 154',
      descVi: 'Tách đệm bằng " ".join(slist[1:n-1]) và tính trọng lượng liên môn Vật lý P = P0 * g / 9.8 trên 6 thiên thể với weight.py.',
      descEn: 'Middle name slicing via " ".join(slist[1:n-1]) and interdisciplinary physics weight P = P0 * g / 9.8 across 6 celestial bodies.',
    },
    {
      step: '02',
      page: 2,
      titleVi: 'Nhiệm vụ 3: Kiểm Tra Tính Hợp Lệ Ngày Tháng',
      titleEn: 'Task 3: Calendar Date Validation Script',
      badgeVi: 'Trang 154 – 155',
      badgeEn: 'Pages 154 – 155',
      descVi: 'Chương trình date.py, hàm nhuan(year), danh sách ngày tháng thang[month-1], cập nhật tháng 2 có 29 ngày khi nhuận.',
      descEn: 'date.py script, nhuan(year) helper, days array thang[month-1], and February leap adjustment.',
    },
    {
      step: '03',
      page: 3,
      titleVi: 'Luyện tập, Vận dụng & Đánh giá năng lực',
      titleEn: 'Practice, Application & Proficiency Quiz',
      badgeVi: 'Trang 155',
      badgeEn: 'Page 155',
      descVi: 'Sắp xếp Tên -> Họ -> Đệm bảng chữ cái tiếng Việt, số ngày bảng tính điện tử từ 1-1-1900, tối ưu hoá nguyên tố O(√n) và chứng chỉ KNTT10-B32.',
      descEn: 'Vietnamese Given->Surname->Middle collation, spreadsheet serial dates from 1-1-1900, O(√n) prime bound, and KNTT10-B32 certificate.',
    },
  ];

  return (
    <div className="space-y-10">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900/90 to-teal-950/70 border border-indigo-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              {isVi ? 'Bài 32 • Chủ đề 5: Lập trình Python' : 'Lesson 32 • Topic 5: Python Programming'}
            </span>
            <span className="px-3 py-1 bg-slate-800/80 text-slate-300 border border-slate-700 rounded-full text-xs font-mono">
              {isVi ? 'SGK Trang 153 – 155' : 'Pages 153 – 155'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {isVi ? 'Ôn tập lập trình Python' : 'Review: Python Programming'}
          </h1>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Tổng kết và củng cố toàn diện kỹ năng lập trình Python cơ bản thông qua 3 dự án liên môn hấp dẫn: Xử lý xâu họ tên tiếng Việt, Mô phỏng trường hấp dẫn của các hành tinh trong Hệ Mặt Trời, và Thẩm định tính hợp lệ của lịch thiên văn.'
              : 'Synthesize core Python competencies through three interdisciplinary capstone projects: Vietnamese name dissection, solar system planetary gravitational physics, and perpetual astronomical calendar date validation.'}
          </p>

          {/* LEARNING OBJECTIVES */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 pt-6 border-t border-slate-800/80">
            <div className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-indigo-500/20">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs md:text-sm text-slate-200">
                <span className="font-bold text-white block mb-0.5">
                  {isVi ? 'Mục tiêu 1: Tổng ôn tập kỹ năng Python' : 'Objective 1: Comprehensive Python Review'}
                </span>
                {isVi
                  ? 'Thực hành kết hợp nhuần nhuyễn danh sách, cắt lát xâu, vòng lặp for/while, câu lệnh rẽ nhánh và hàm tự định nghĩa.'
                  : 'Master combining lists, string slicing, for/while loops, nested conditionals, and user-defined functions.'}
              </div>
            </div>
            <div className="flex items-start gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-teal-500/20">
              <Orbit className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="text-xs md:text-sm text-slate-200">
                <span className="font-bold text-white block mb-0.5">
                  {isVi ? 'Mục tiêu 2: Giải toán liên môn thực tế' : 'Objective 2: Interdisciplinary Problem Solving'}
                </span>
                {isVi
                  ? 'Thực hành lập trình giải bài toán liên môn với Vật lý (lực hấp dẫn P = m*g) và Lịch pháp thiên văn.'
                  : 'Solve cross-curricular problems connecting Physics (gravitation P = m*g) and Astronomy calendar systems.'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D INTERACTIVE LAB VIEWPORT */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-500/20 text-indigo-300 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base md:text-lg font-bold text-white">
              {isVi ? 'Phòng thí nghiệm 3D liên môn tương tác' : '3D Interdisciplinary Interactive Laboratory'}
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Three.js WebGL Engine</span>
        </div>
        <SolarSystem3DLab />
      </div>

      {/* ROADMAP ITEMS */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Workflow className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">
            {isVi ? 'Nội dung thực hành Bài 32' : 'Lesson 32 Practical Modules'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roadmapItems.map((item) => (
            <div
              key={item.step}
              onClick={() => setCurrentPage(item.page)}
              className="group bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-xl transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black font-mono text-slate-600 group-hover:text-indigo-400 transition-colors">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-900 text-indigo-300 border border-slate-700">
                    {isVi ? item.badgeVi : item.badgeEn}
                  </span>
                </div>
                <h3 className="font-bold text-white group-hover:text-indigo-300 text-sm transition-colors mb-2">
                  {isVi ? item.titleVi : item.titleEn}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isVi ? item.descVi : item.descEn}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                <span>{isVi ? 'Bắt đầu học' : 'Enter Section'}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
