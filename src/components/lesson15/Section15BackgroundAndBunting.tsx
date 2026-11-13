import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Scissors,
  CheckCircle2,
  Volume2,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section15BackgroundAndBunting: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();

  // Interactive step stepper for Task 1: Background
  const [bgStep, setBgStep] = useState<number>(5);

  // Interactive step stepper for Task 2: Pennant Bunting
  const [buntingStep, setBuntingStep] = useState<number>(3);
  const [buntingScale, setBuntingScale] = useState<number>(1.0);

  const bgStepsDataVi = [
    {
      step: 1,
      title: 'Bước 1: Vẽ hình chữ nhật màu xanh (Hình 15.2a)',
      desc: 'Dùng công cụ Rectangles (F4) vẽ một hình chữ nhật màu xanh ngọc (teal) ở nửa dưới trang giấy.'
    },
    {
      step: 2,
      title: 'Bước 2: Vẽ tam giác và nhân bản tạo dây (Hình 15.2b)',
      desc: 'Dùng Stars and Polygons vẽ tam giác nhọn hướng xuống, nhấn Ctrl+D nhân bản liên tiếp thành dây tam giác. Nhân bản tiếp cả dây này lưu riêng cho Nhiệm vụ 2.'
    },
    {
      step: 3,
      title: 'Bước 3: Hợp nhất dây tam giác (Union)',
      desc: 'Chọn tất cả tam giác của dây thứ nhất rồi thực hiện lệnh Path / Union (Ctrl + +) để hợp thành một khối duy nhất.'
    },
    {
      step: 4,
      title: 'Bước 4: Đục rãnh răng cưa bằng Difference (Hình 15.2c)',
      desc: 'Đặt dây tam giác đã Union lên đỉnh mép trên hình chữ nhật xanh, chọn cả hai rồi dùng lệnh Path / Difference (Ctrl + -) để khoét mép răng cưa.'
    },
    {
      step: 5,
      title: 'Bước 5: Lồng ghép hình chữ nhật màu vàng (Hình 15.2d-e)',
      desc: 'Vẽ hình chữ nhật màu vàng cùng chiều rộng đặt ở phía trên, xếp kết quả bước 4 khít vào phía dưới để tạo nền 2 màu ăn khớp hoàn hảo.'
    }
  ];

  const bgStepsDataEn = [
    {
      step: 1,
      title: 'Step 1: Draw the blue rectangle (Figure 15.2a)',
      desc: 'Use the Rectangles tool (F4) to create a teal-blue rectangle covering the lower portion of the flyer page.'
    },
    {
      step: 2,
      title: 'Step 2: Draw triangle & duplicate horizontally (Figure 15.2b)',
      desc: 'Use Stars/Polygons to draw an inverted triangle, duplicate repeatedly (Ctrl+D) to build a row. Duplicate the entire row to preserve a spare chain for Task 2.'
    },
    {
      step: 3,
      title: 'Step 3: Fuse triangle row via Union',
      desc: 'Select all triangles in the first row and execute Path / Union (Ctrl + +) to merge them into a single uninterrupted path.'
    },
    {
      step: 4,
      title: 'Step 4: Carve sawtooth cutout with Difference (Figure 15.2c)',
      desc: 'Align the fused triangle row along the top edge of the blue rectangle, select both, and apply Path / Difference (Ctrl + -).'
    },
    {
      step: 5,
      title: 'Step 5: Interlock with golden upper rectangle (Figures 15.2d-e)',
      desc: 'Draw an upper golden rectangle of identical width, stacking the carved blue block beneath it to form an interlocking bipartite canvas.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-700 via-cyan-700 to-indigo-800 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-teal-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Task 1 & Task 2 • Pages 82 – 83' : 'Nhiệm vụ 1 & Nhiệm vụ 2 • Trang 82 – 83'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '1. CRAFTING THE SAWTOOTH CANVAS & BUNTING BANNER'
              : '1. VẼ NỀN RĂNG CƯA & DÂY CỜ TAM GIÁC ĐA SẮC'}
          </h2>

          <p className="text-sm sm:text-base text-teal-100 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Learn the professional Boolean carving workflow: using Union and Difference to punch jagged sawtooth borders, followed by Group, scaling, and Ungroup for vibrant festive bunting.'
              : 'Nắm vững kỹ thuật đục rãnh đồ hoạ chuyên nghiệp: kết hợp Union và Difference để tạo viền răng cưa ăn khớp, cùng các thao tác Group, co dãn và Ungroup tạo dây cờ tiệc tùng sống động.'}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() =>
                speak(
                  bilingualMode === 'en'
                    ? 'Section 1: Crafting the Sawtooth Canvas and Pennant Bunting. In Task 1, draw a blue rectangle, duplicate a chain of triangles, fuse with Union, and subtract from the rectangle using Difference. In Task 2, group and scale triangles for festive bunting.'
                    : 'Mục 1: Vẽ nền và dây cờ tam giác. Nhiệm vụ 1 vẽ hình chữ nhật xanh, nhân bản dây tam giác, gộp bằng Union và đục mép bằng Difference. Nhiệm vụ 2 nhóm và co dãn dây cờ tam giác.',
                  bilingualMode === 'en' ? 'en' : 'vi'
                )
              }
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-xs transition-all cursor-pointer shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5 text-teal-300" />
              <span>{bilingualMode === 'en' ? 'EN' : 'VI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* TASK 1: VẼ NỀN (HÌNH 15.2 SGK) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-slate-100 font-bold text-base sm:text-lg">
            <Scissors className="w-5 h-5 text-amber-400" />
            <span>
              {bilingualMode === 'en'
                ? 'Task 1: Creating the Bicolor Sawtooth Canvas (Steps 1 – 5, Fig 15.2)'
                : 'Nhiệm vụ 1: Vẽ nền 2 màu răng cưa lồng nhau (5 bước, Hình 15.2)'}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Path / Union & Difference</span>
        </div>

        {/* Step Stepper Selector */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setBgStep(s)}
              className={`p-2.5 sm:p-3 rounded-2xl text-center transition-all cursor-pointer border ${
                bgStep === s
                  ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-75">
                {bilingualMode === 'en' ? 'Step' : 'Bước'}
              </div>
              <div className="text-base sm:text-lg font-bold font-mono">{s}</div>
            </button>
          ))}
        </div>

        {/* Step Description Card */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-200 space-y-1">
          <div className="text-xs sm:text-sm font-bold text-amber-300">
            {(bilingualMode === 'en' ? bgStepsDataEn : bgStepsDataVi)[bgStep - 1].title}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {(bilingualMode === 'en' ? bgStepsDataEn : bgStepsDataVi)[bgStep - 1].desc}
          </p>
        </div>

        {/* Interactive SVG Simulator for Task 1 */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-3">
          <div className="text-xs font-mono text-slate-400 text-center">
            {bilingualMode === 'en'
              ? 'Vector SVG Viewport: Step-by-Step Canvas Transformation'
              : 'Trình hiển thị Vector SVG trực quan: Quá trình biến đổi hình khối qua từng bước'}
          </div>

          <svg viewBox="0 0 400 320" className="w-full max-w-md h-64 rounded-xl bg-slate-900 border border-slate-700/60 shadow-inner">
            {/* Step 5: Yellow Rectangle on top */}
            {bgStep >= 5 && (
              <rect x="50" y="30" width="300" height="120" fill="#f59e0b" rx="2" />
            )}

            {/* Step 1 & 2 & 3: Blue Rectangle Base */}
            {bgStep < 4 && (
              <rect x="50" y="140" width="300" height="150" fill="#0d9488" rx="2" />
            )}

            {/* Step 2: Individual Triangles Row */}
            {bgStep === 2 && (
              <g fill="#ef4444" opacity="0.9">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <polygon
                    key={i}
                    points={`${50 + i * 30},120 ${50 + i * 30 + 30},120 ${50 + i * 30 + 15},145`}
                    stroke="#ffffff"
                    strokeWidth="1"
                  />
                ))}
              </g>
            )}

            {/* Step 3: Fused Triangles (Union) hovering over top edge */}
            {bgStep === 3 && (
              <g fill="#f43f5e">
                <polygon
                  points="50,130 50,140 65,160 80,140 95,160 110,140 125,160 140,140 155,160 170,140 185,160 200,140 215,160 230,140 245,160 260,140 275,160 290,140 305,160 320,140 335,160 350,140 350,130"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text x="200" y="115" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">
                  {bilingualMode === 'en' ? 'Triangle Chain after Union (Ctrl + +)' : 'Dây tam giác sau khi Union (Ctrl + +)'}
                </text>
              </g>
            )}

            {/* Step 4 & 5: Blue Rectangle with carved Sawtooth top */}
            {bgStep >= 4 && (
              <polygon
                points="50,150 65,135 80,150 95,135 110,150 125,135 140,150 155,135 170,150 185,135 200,150 215,135 230,150 245,135 260,150 275,135 290,150 305,135 320,150 335,135 350,150 350,290 50,290"
                fill="#0d9488"
              />
            )}

            {/* Explanatory Annotations */}
            {bgStep === 4 && (
              <text x="200" y="110" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                {bilingualMode === 'en' ? 'Sawtooth Edge after Difference (Ctrl + -)' : 'Mép răng cưa sau Difference (Ctrl + -)'}
              </text>
            )}
            {bgStep === 5 && (
              <text x="200" y="90" textAnchor="middle" fill="#1e3a8a" fontSize="14" fontWeight="900">
                {bilingualMode === 'en' ? 'HANOI BOOK FAIR' : 'HỘI SÁCH HÀ NỘI'}
              </text>
            )}
          </svg>
        </div>
      </div>

      {/* TASK 2: VẼ DÂY CỜ TAM GIÁC (HÌNH 15.3 SGK) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-slate-100 font-bold text-base sm:text-lg">
            <Layers className="w-5 h-5 text-teal-400" />
            <span>
              {bilingualMode === 'en'
                ? 'Task 2: Assembling the Multicolored Pennant Bunting (Fig 15.3)'
                : 'Nhiệm vụ 2: Vẽ dây cờ tam giác đa sắc (3 bước, Hình 15.3)'}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Group & Ungroup</span>
        </div>

        {/* 3 Steps of Pennant Bunting */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            onClick={() => setBuntingStep(1)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
              buntingStep === 1
                ? 'bg-teal-950/60 border-teal-500 shadow-md ring-1 ring-teal-400/40'
                : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-teal-400">
              <span>{bilingualMode === 'en' ? 'Step 1: Trim Spare Row' : 'Bước 1: Cắt bớt tam giác'}</span>
              <span className="font-mono">15.3a</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Cut out a subset of triangles from the spare row saved during Task 1.'
                : 'Cắt ra một số tam giác từ dây tam giác đã để riêng trong Nhiệm vụ 1.'}
            </p>
          </div>

          <div
            onClick={() => setBuntingStep(2)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
              buntingStep === 2
                ? 'bg-teal-950/60 border-teal-500 shadow-md ring-1 ring-teal-400/40'
                : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-teal-400">
              <span>{bilingualMode === 'en' ? 'Step 2: Group & Scale' : 'Bước 2: Gom nhóm & Co dãn'}</span>
              <span className="font-mono">15.3b</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Group triangles together (Ctrl+G) and stretch them horizontally to span the flyer width.'
                : 'Nhóm các tam giác bằng Group (Ctrl+G) rồi kéo dãn cho vừa khít với bề ngang khung.'}
            </p>
          </div>

          <div
            onClick={() => setBuntingStep(3)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
              buntingStep === 3
                ? 'bg-teal-950/60 border-teal-500 shadow-md ring-1 ring-teal-400/40'
                : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-teal-400">
              <span>{bilingualMode === 'en' ? 'Step 3: Ungroup & Palette' : 'Bước 3: Rã nhóm & Đổi màu'}</span>
              <span className="font-mono">15.3c</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Ungroup (Shift+Ctrl+G) to assign alternating festive colors to each individual flag.'
                : 'Bỏ nhóm bằng Ungroup (Shift+Ctrl+G) và tô các màu sắc tươi vui khác nhau cho từng lá cờ.'}
            </p>
          </div>
        </div>

        {/* Live Scaling Sandbox */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300">
              {bilingualMode === 'en' ? 'Simulate Group Scaling Width:' : 'Thử nghiệm kéo dãn kích thước nhóm cờ (Scale):'}
            </span>
            <span className="font-mono font-bold text-teal-400">{Math.round(buntingScale * 100)}%</span>
          </div>

          <input
            type="range"
            min="0.6"
            max="1.4"
            step="0.05"
            value={buntingScale}
            onChange={(e) => setBuntingScale(parseFloat(e.target.value))}
            className="w-full accent-teal-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />

          <svg viewBox="0 0 400 90" className="w-full h-24 bg-slate-900 rounded-xl border border-slate-700/60">
            <g transform={`translate(${200 - 150 * buntingScale}, 15) scale(${buntingScale}, 1)`}>
              {['#1e3a8a', '#f97316', '#06b6d4', '#dc2626', '#0d9488', '#1e293b', '#f59e0b', '#0284c7'].map(
                (c, i) => (
                  <polygon
                    key={i}
                    points={`${i * 37.5},0 ${i * 37.5 + 37.5},0 ${i * 37.5 + 18.75},50`}
                    fill={buntingStep === 3 ? c : '#e2e8f0'}
                    stroke={buntingStep === 3 ? '#0f172a' : '#475569'}
                    strokeWidth="1.5"
                  />
                )
              )}
            </g>
          </svg>
        </div>

        {/* Pedagogical Prompts Widget */}
        <TeacherPromptsWidget lessonId={15} sectionIndex={1} />

        {/* Navigation jump */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setCurrentPage(0)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            ← {bilingualMode === 'en' ? 'Overview' : 'Tổng quan'}
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>{bilingualMode === 'en' ? 'Section 2: Books & Bookshelf' : 'Sang Mục 2: Sách & Giá sách'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
