import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Sliders,
  CheckCircle2,
  Volume2,
  ArrowRight,
  Layers,
  Palette
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section15BooksAndShelf: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();

  // Interactive Book Spine Configurator
  const [spineColor, setSpineColor] = useState<string>('#0284c7'); // Blue
  const [hasCurvedMargin, setHasCurvedMargin] = useState<boolean>(true);
  const [hasStripes, setHasStripes] = useState<boolean>(true);
  const [bookTitle, setBookTitle] = useState<string>('TIN HỌC 10');
  const [tiltAngle, setTiltAngle] = useState<number>(0);

  const stepsDataVi = [
    {
      step: 1,
      title: 'Bước 1: Vẽ thân gáy sách chữ nhật (Hình 15.4a)',
      desc: 'Dùng công cụ Rectangles vẽ hình chữ nhật thẳng đứng với chiều dài là chiều cao sách và chiều rộng là độ dày gáy.'
    },
    {
      step: 2,
      title: 'Bước 2: Tạo độ cong 3D cho mép gáy bằng Gradient (Hình 15.4b)',
      desc: 'Thêm một hình chữ nhật hẹp ở mép ngoài, tô màu chuyển sắc Linear Gradient với rìa ngoài đậm hơn và rìa trong tiệp màu gáy để tạo ảo giác khối trụ cong.'
    },
    {
      step: 3,
      title: 'Bước 3: Trang trí vạch gáy, biểu trưng & tên sách (Hình 15.4c)',
      desc: 'Thêm các vạch màu tương phản ở đầu và đuôi sách, thêm hoa thị/ngôi sao và xoay dọc tên sách 90 độ.'
    },
    {
      step: 4,
      title: 'Bước 4: Hoàn thiện & Nhân bản các quyển sách (Hình 15.4d)',
      desc: 'Gom nhóm (Ctrl+G), nhân bản (Ctrl+D) thành nhiều quyển sách với chiều cao, độ dày và màu sắc khác nhau.'
    },
    {
      step: 5,
      title: 'Bước 5: Vẽ giá sách gỗ và sắp đặt nghiêng tự nhiên',
      desc: 'Vẽ hình chữ nhật màu nâu gỗ nằm ngang làm kệ, xoay nghiêng một vài quyển sách để tạo bố cục sống động, tự nhiên.'
    }
  ];

  const stepsDataEn = [
    {
      step: 1,
      title: 'Step 1: Draw the rectangular book spine body (Figure 15.4a)',
      desc: 'Use Rectangles to create a vertical box representing the book height and spine thickness.'
    },
    {
      step: 2,
      title: 'Step 2: Add 3D cylindrical spine curvature via Gradient (Figure 15.4b)',
      desc: 'Add a narrow margin strip with a linear gradient shading from dark outer border to match body color, mimicking realistic spine depth.'
    },
    {
      step: 3,
      title: 'Step 3: Decorate with gold stripes, emblems & vertical titles (Figure 15.4c)',
      desc: 'Overlay top and bottom accent bands, add star symbols for series volumes, and orient book titles vertically.'
    },
    {
      step: 4,
      title: 'Step 4: Finalize & Duplicate varied books (Figure 15.4d)',
      desc: 'Group the book spine (Ctrl+G) and duplicate (Ctrl+D) across varying widths, heights, and palette tones.'
    },
    {
      step: 5,
      title: 'Step 5: Assemble wooden shelf & natural slanting arrangement',
      desc: 'Create a horizontal wooden shelf bar and slightly tilt a few volumes to give an organic, lived-in feel.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-700 via-orange-700 to-rose-800 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-amber-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Task 3 • Pages 83 – 84' : 'Nhiệm vụ 3 • Trang 83 – 84'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '2. CRAFTING 3D BOOK SPINES & THE BOOKSHELF'
              : '2. VẼ SÁCH GÁY CONG 3D & GIÁ SÁCH BẰNG INKSCAPE'}
          </h2>

          <p className="text-sm sm:text-base text-amber-100 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Master the art of vector realism: simulate 3D cylindrical depth on flat 2D rectangles using marginal gradient transitions, spine stripes, and organic bookshelf tilting.'
              : 'Khám phá bí quyết tạo độ sâu 3D chân thực cho đồ hoạ vector phẳng: dùng dải màu chuyển tiếp ở mép rìa để biến hình chữ nhật đơn điệu thành gáy sách tròn căng, kết hợp hoa văn và góc nghiêng tự nhiên.'}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() =>
                speak(
                  bilingualMode === 'en'
                    ? 'Section 2: Crafting 3D Book Spines and Bookshelf. In Task 3, create a spine rectangle, apply gradient edge shading to simulate cylindrical curvature, decorate with stripes, and assemble books on a shelf.'
                    : 'Mục 2: Vẽ sách và giá sách. Trong Nhiệm vụ 3, vẽ gáy sách hình chữ nhật, tô màu chuyển sắc ở rìa ngoài để tạo độ cong tròn 3D, trang trí vạch và xếp sách lên giá gỗ.',
                  bilingualMode === 'en' ? 'en' : 'vi'
                )
              }
              className="px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-xs transition-all cursor-pointer shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{bilingualMode === 'en' ? 'EN' : 'VI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 STEPS BREAKDOWN (FIG 15.4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {(bilingualMode === 'en' ? stepsDataEn : stepsDataVi).map((st) => (
          <div
            key={st.step}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-amber-500/50 transition-colors"
          >
            <div className="flex items-center justify-between text-xs font-bold text-amber-400">
              <span>{st.title}</span>
              <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-[10px]">
                {st.step === 5 ? 'Step 5' : `15.4${String.fromCharCode(96 + st.step)}`}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {st.desc}
            </p>
          </div>
        ))}
      </div>

      {/* INTERACTIVE 3D SPINE LAB & CUSTOMIZER */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-slate-100 font-bold text-base sm:text-lg">
            <Sliders className="w-5 h-5 text-amber-400" />
            <span>
              {bilingualMode === 'en'
                ? 'Interactive 3D Book Spine Decorator Simulator'
                : 'Bàn thực nghiệm thiết kế Gáy sách 3D tương tác trực quan'}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Linear Gradient Spine FX</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-4">
            {/* Color Palette Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <span>{bilingualMode === 'en' ? 'Spine Base Color:' : 'Chọn màu nền gáy sách:'}</span>
              </label>
              <div className="flex items-center gap-2">
                {[
                  { name: 'Xanh dương', hex: '#0284c7' },
                  { name: 'Đỏ tươi', hex: '#dc2626' },
                  { name: 'Xanh lá', hex: '#16a34a' },
                  { name: 'Tím hoa cà', hex: '#9333ea' },
                  { name: 'Cam đất', hex: '#ea580c' }
                ].map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setSpineColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-8 h-8 rounded-xl transition-all cursor-pointer ${
                      spineColor === c.hex ? 'ring-2 ring-white scale-110 shadow-md' : 'opacity-80 hover:opacity-100'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Gradient Edge Toggle (Figure 15.4b) */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-200">
                  {bilingualMode === 'en' ? 'Curved Spine Gradient Edge' : 'Mép gáy cong chuyển màu Gradient (Hình 15.4b)'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {bilingualMode === 'en'
                    ? 'Adds darker outer margin to create cylindrical 3D depth'
                    : 'Thêm dải đậm ở rìa ngoài tạo ảo giác gáy sách cong tròn 3 chiều'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasCurvedMargin(!hasCurvedMargin)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  hasCurvedMargin
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {hasCurvedMargin ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Decorative Stripes & Stars Toggle (Figure 15.4c) */}
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-200">
                  {bilingualMode === 'en' ? 'Gold Accent Ribbons & Star' : 'Vạch trang trí vàng & Biểu trưng sao (Hình 15.4c)'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {bilingualMode === 'en'
                    ? 'Accent stripes at head and foot with series volume emblem'
                    : 'Các vạch ngang tương phản ở đầu/cuối sách và ngôi sao cùng bộ'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHasStripes(!hasStripes)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  hasStripes
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {hasStripes ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Title Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">
                {bilingualMode === 'en' ? 'Vertical Title on Spine:' : 'Tên sách quay dọc theo gáy sách:'}
              </label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                maxLength={20}
                className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:outline-hidden focus:border-amber-500"
              />
            </div>

            {/* Slant Angle Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">
                  {bilingualMode === 'en' ? 'Bookshelf Tilt Angle:' : 'Góc nghiêng gáy sách trên kệ (Bước 5):'}
                </span>
                <span className="font-mono text-amber-400 font-bold">{tiltAngle}°</span>
              </div>
              <input
                type="range"
                min="-15"
                max="15"
                step="1"
                value={tiltAngle}
                onChange={(e) => setTiltAngle(parseInt(e.target.value))}
                className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* SVG Canvas Preview Column */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner min-h-[340px]">
            <svg viewBox="0 0 320 300" className="w-full max-w-sm h-72">
              <defs>
                {/* Linear gradient for cylindrical book spine edge */}
                <linearGradient id="spineEdgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>

                {/* Wooden shelf gradient */}
                <linearGradient id="shelfGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>

              {/* Wooden Shelf (Step 5) */}
              <rect x="20" y="240" width="280" height="18" rx="3" fill="url(#shelfGrad)" />
              <rect x="20" y="258" width="280" height="4" fill="#451a03" />

              {/* Supporting background books */}
              <rect x="50" y="100" width="30" height="140" fill="#dc2626" rx="2" />
              <rect x="85" y="115" width="28" height="125" fill="#16a34a" rx="2" />

              {/* Configurable Foreground Book */}
              <g transform={`translate(160, 240) rotate(${tiltAngle}) translate(-25, -170)`}>
                {/* Main Book Spine */}
                <rect x="0" y="0" width="50" height="170" rx="3" fill={spineColor} />

                {/* Shading edge (Step 2) */}
                {hasCurvedMargin && (
                  <rect x="0" y="0" width="12" height="170" fill="url(#spineEdgeGrad)" rx="2" />
                )}

                {/* Decorative Ribbons (Step 3) */}
                {hasStripes && (
                  <>
                    <rect x="0" y="20" width="50" height="8" fill="#fef08a" />
                    <rect x="0" y="32" width="50" height="3" fill="#fef08a" />
                    <rect x="0" y="140" width="50" height="8" fill="#fef08a" />
                    <rect x="0" y="152" width="50" height="3" fill="#fef08a" />
                    <circle cx="25" cy="48" r="4" fill="#fef08a" />
                  </>
                )}

                {/* Vertical Text */}
                <text
                  x="25"
                  y="95"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                  transform="rotate(90, 25, 95)"
                  letterSpacing="2"
                >
                  {bookTitle}
                </text>
              </g>

              {/* Slanted book to the right */}
              <g transform="translate(230, 240) rotate(12) translate(0, -150)">
                <rect x="0" y="0" width="28" height="150" rx="2" fill="#d97706" />
                <rect x="0" y="20" width="28" height="6" fill="#fef08a" />
                <rect x="0" y="125" width="28" height="6" fill="#fef08a" />
              </g>
            </svg>
            <div className="text-[11px] font-mono text-slate-400 pt-2 text-center">
              {bilingualMode === 'en'
                ? 'Curved spine margin + gold ribbons + shelf assembly'
                : 'Mép cong gáy sách + vạch trang trí + xếp đặt giá sách sống động'}
            </div>
          </div>
        </div>

        {/* Pedagogical Prompts Widget */}
        <TeacherPromptsWidget lessonId={15} sectionIndex={2} />

        {/* Navigation jump */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            ← {bilingualMode === 'en' ? 'Background & Bunting' : 'Nền & Dây cờ'}
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>{bilingualMode === 'en' ? 'Section 3: Typography & Callouts' : 'Sang Mục 3: Chữ & Bóng hội thoại'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
