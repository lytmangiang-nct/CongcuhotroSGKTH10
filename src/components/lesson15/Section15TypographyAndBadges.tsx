import React, { useState } from 'react';
import {
  MessageSquare,
  Type,
  Split,
  Sliders,
  CheckCircle2,
  Volume2,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section15TypographyAndBadges: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();

  // Speech bubble interactive simulator state
  const [bubbleColor, setBubbleColor] = useState<string>('#0d9488'); // teal-600
  const [bubbleText, setBubbleText] = useState<string>('Giảm giá tới 70%');
  const [isUnionFused, setIsUnionFused] = useState<boolean>(true);
  const [pointerOffset, setPointerOffset] = useState<number>(0);

  // Dashed stroke interactive state
  const [dashPattern, setDashPattern] = useState<string>('4 4'); // dashed
  const [strokeWidth, setStrokeWidth] = useState<number>(2);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-800 via-indigo-800 to-purple-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-teal-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Tasks 4, 5, 6 • Page 84' : 'Nhiệm vụ 4, 5, 6 • Trang 84'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '3. TYPOGRAPHY, SPEECH BUBBLES & DASHED STROKES'
              : '3. ĐỊNH DẠNG VĂN BẢN, BÓNG HỘI THOẠI & VÁCH NĂNG NÉT ĐỨT'}
          </h2>

          <p className="text-sm sm:text-base text-teal-100 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Synthesize typography hierarchy with custom callouts: forge speech bubbles from ellipse and triangle unions, and configure precise dashed stroke dividers in Fill and Stroke.'
              : 'Kết hợp cấu trúc văn bản phân cấp với các điểm nhấn trực quan: hàn mép hình elip và tam giác thành bóng hội thoại nổi bật, thiết lập đường nét đứt thanh lịch làm vách ngăn thông tin.'}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() =>
                speak(
                  bilingualMode === 'en'
                    ? 'Section 3: Typography, Speech Bubbles, and Dashed Strokes. In Task 4, enter independent text objects. In Task 5, fuse an ellipse and a triangle via Union for speech bubbles. In Task 6, use Pen and configure Stroke style Dashes for dividers.'
                    : 'Mục 3: Định dạng văn bản, bóng hội thoại và nét đứt. Nhiệm vụ 4 nhập các đoạn văn bản độc lập. Nhiệm vụ 5 hợp elip và tam giác thành bóng hội thoại. Nhiệm vụ 6 vẽ vách ngăn nét đứt bằng Stroke style Dashes.',
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

      {/* TASK 4: NHẬP VĂN BẢN ĐỘC LẬP (HÌNH 15.5) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 text-slate-100 font-bold text-base sm:text-lg">
          <Type className="w-5 h-5 text-indigo-400" />
          <span>
            {bilingualMode === 'en'
              ? 'Task 4: Entering Independent Typographic Blocks (Fig 15.5)'
              : 'Nhiệm vụ 4: Nhập các khối văn bản độc lập (Hình 15.5 SGK)'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {bilingualMode === 'en'
            ? 'Professional design rule: Enter each content section as an independent text object so they can be repositioned, styled, scaled, and formatted freely without interfering with other lines:'
            : 'Nguyên tắc thiết kế chuyên nghiệp: Lần lượt nhập từng đoạn văn bản - mỗi nội dung là một đối tượng độc lập để có thể căn lề, định dạng phông chữ, cỡ chữ và dịch chuyển vị trí dễ dàng mà không làm xô lệch các dòng khác:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              tag: bilingualMode === 'en' ? 'Main Headline' : 'Tiêu đề chính',
              vi: 'HỘI SÁCH HÀ NỘI',
              en: 'HANOI BOOK FAIR',
              role: bilingualMode === 'en' ? 'Bold display font, dark teal, over gold backdrop' : 'Phông đậm lớn, màu xanh thẫm, đặt trên nền vàng'
            },
            {
              tag: bilingualMode === 'en' ? 'Column 1 Header' : 'Tiêu đề cột 1',
              vi: 'THỜI GIAN',
              en: 'SCHEDULE TIME',
              role: bilingualMode === 'en' ? 'Vibrant amber, uppercase bold' : 'Màu vàng sáng, in hoa đậm'
            },
            {
              tag: bilingualMode === 'en' ? 'Column 2 Header' : 'Tiêu đề cột 2',
              vi: 'ĐỊA ĐIỂM',
              en: 'EVENT VENUE',
              role: bilingualMode === 'en' ? 'Vibrant amber, uppercase bold' : 'Màu vàng sáng, in hoa đậm'
            },
            {
              tag: bilingualMode === 'en' ? 'Time Details' : 'Chi tiết thời gian',
              vi: '8H – 21H\n12-17/10/2030',
              en: '8:00 AM – 9:00 PM\nOct 12–17, 2030',
              role: bilingualMode === 'en' ? 'Crisp white typography, centered in column 1' : 'Chữ trắng, căn giữa cột 1'
            },
            {
              tag: bilingualMode === 'en' ? 'Venue Details' : 'Chi tiết địa điểm',
              vi: 'Hoàng thành Thăng Long\n19C Hoàng Diệu, Ba Đình, Hà Nội',
              en: 'Thang Long Imperial Citadel\n19C Hoang Dieu, Hanoi',
              role: bilingualMode === 'en' ? 'Crisp white typography, centered in column 2' : 'Chữ trắng, căn giữa cột 2'
            },
            {
              tag: bilingualMode === 'en' ? 'Offers & Promotions' : 'Ưu đãi & Khuyến mãi',
              vi: 'Vào cửa tự do • Giảm giá tới 70%',
              en: 'Free Entry • Up to 70% Off',
              role: bilingualMode === 'en' ? 'Placed in 2 prominent speech bubble callouts' : 'Đặt trong 2 bóng hội thoại nổi bật'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300">
                {item.tag}
              </span>
              <div className="font-mono font-bold text-white text-xs whitespace-pre-line">
                {bilingualMode === 'en' ? item.en : item.vi}
              </div>
              <p className="text-[11px] text-slate-400">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TASK 5: VẼ BÓNG HỘI THOẠI (HÌNH 15.6) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-slate-100 font-bold text-base sm:text-lg">
            <MessageSquare className="w-5 h-5 text-teal-400" />
            <span>
              {bilingualMode === 'en'
                ? 'Task 5: Forging Speech Bubble Callouts via Union (Steps 1 – 3, Fig 15.6)'
                : 'Nhiệm vụ 5: Tạo bóng hội thoại từ phép Hợp Union (3 bước, Hình 15.6)'}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">Path / Union (Ctrl + +)</span>
        </div>

        {/* 3 Steps of Speech Bubble */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-teal-400">
              <span>{bilingualMode === 'en' ? 'Step 1: Draw Ellipse & Triangle' : 'Bước 1: Vẽ Elip & Tam giác'}</span>
              <span className="font-mono">15.6a</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Use Ellipses (F5) to draw the oval body and Stars/Polygons to draw an indicator triangle.'
                : 'Dùng Ellipses (F5) vẽ thân bóng bầu dục và Stars/Polygons vẽ tam giác nhọn làm mũi chỉ hướng.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-teal-400">
              <span>{bilingualMode === 'en' ? 'Step 2: Overlap & Union' : 'Bước 2: Xếp chồng & Union'}</span>
              <span className="font-mono">15.6b</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Slightly overlap the triangle corner with the ellipse, select both, and apply Path / Union (Ctrl + +).'
                : 'Xếp góc tam giác chồng lấn nhẹ vào thân elip, chọn cả hai và thực hiện lệnh Path / Union (Ctrl + +).'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-teal-400">
              <span>{bilingualMode === 'en' ? 'Step 3: Fine-tune Nodes & Layers' : 'Bước 3: Tinh chỉnh Node & Lớp'}</span>
              <span className="font-mono">15.6c</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'Use F2 to smooth junction nodes, assign fill colors, and raise text objects above the speech bubble.'
                : 'Dùng F2 chỉnh điểm neo giao điểm cho mềm mại, gán màu tô và nâng lớp đối tượng chữ lên trên bóng thoại.'}
            </p>
          </div>
        </div>

        {/* Interactive Speech Bubble Forge Sandbox */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 space-y-3">
            <div className="text-xs font-bold text-slate-200">
              {bilingualMode === 'en' ? 'Interactive Speech Bubble Controls:' : 'Bảng điều khiển tương tác bóng hội thoại:'}
            </div>

            {/* Toggle Union vs Separate Primitives */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-300">
                {bilingualMode === 'en' ? 'Execute Path / Union (Ctrl + +):' : 'Thực hiện phép ghép Path / Union:'}
              </span>
              <button
                type="button"
                onClick={() => setIsUnionFused(!isUnionFused)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isUnionFused ? 'bg-teal-500 text-slate-950 font-black' : 'bg-slate-700 text-slate-300'
                }`}
              >
                {isUnionFused
                  ? bilingualMode === 'en' ? 'Merged' : 'ĐÃ HỢP NHẤT'
                  : bilingualMode === 'en' ? 'Separate (Step 1)' : 'TÁCH RỜI (BƯỚC 1)'}
              </button>
            </div>

            {/* Pointer Offset Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">
                  {bilingualMode === 'en' ? 'Tail Pointer Angle / Position:' : 'Vị trí mũi nhọn bóng thoại:'}
                </span>
                <span className="font-mono text-teal-400">{pointerOffset}px</span>
              </div>
              <input
                type="range"
                min="-40"
                max="40"
                value={pointerOffset}
                onChange={(e) => setPointerOffset(parseInt(e.target.value))}
                className="w-full accent-teal-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Color switcher */}
            <div className="flex items-center gap-2 pt-1">
              {[
                { name: bilingualMode === 'en' ? 'Teal (70%)' : 'Xanh ngọc (70%)', hex: '#0f766e' },
                { name: bilingualMode === 'en' ? 'Cyan (Free)' : 'Xanh lơ (Tự do)', hex: '#06b6d4' },
                { name: bilingualMode === 'en' ? 'Vibrant Orange' : 'Cam rực', hex: '#ea580c' },
                { name: bilingualMode === 'en' ? 'Rose Pink' : 'Hồng sen', hex: '#e11d48' }
              ].map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setBubbleColor(c.hex)}
                  style={{ backgroundColor: c.hex }}
                  className={`w-7 h-7 rounded-lg transition-all cursor-pointer ${
                    bubbleColor === c.hex ? 'ring-2 ring-white scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* SVG Preview of Bubble */}
          <div className="md:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800 min-h-[220px]">
            <svg viewBox="0 0 280 200" className="w-full max-w-xs h-48">
              {!isUnionFused ? (
                // Step 1: Separate Primitives
                <g>
                  {/* Ellipse */}
                  <ellipse cx="140" cy="90" rx="95" ry="60" fill={bubbleColor} opacity="0.85" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 2" />
                  {/* Triangle pointer */}
                  <polygon
                    points={`${140 + pointerOffset},130 ${170 + pointerOffset},180 ${110 + pointerOffset},140`}
                    fill="#f59e0b"
                    opacity="0.85"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <text x="140" y="50" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
                    {bilingualMode === 'en' ? 'Fig 15.6a: 2 Overlapping Shapes' : 'Hình 15.6a: 2 hình chồng nhau'}
                  </text>
                </g>
              ) : (
                // Step 2 & 3: Fused Speech Bubble via Union
                <g>
                  <path
                    d={`M 140 30
                        A 95 60 0 0 1 235 90
                        A 95 60 0 0 1 170 145
                        L ${175 + pointerOffset} 185
                        L ${130 + pointerOffset} 149
                        A 95 60 0 0 1 45 90
                        A 95 60 0 0 1 140 30 Z`}
                    fill={bubbleColor}
                    filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                  />
                  <text x="140" y="85" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
                    {bilingualMode === 'en' ? 'UP TO' : 'Giảm giá'}
                  </text>
                  <text x="140" y="105" textAnchor="middle" fill="#fef08a" fontSize="14" fontWeight="900">
                    {bilingualMode === 'en' ? '70% OFF' : 'tới 70%'}
                  </text>
                  <text x="140" y="20" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                    {bilingualMode === 'en' ? 'Fig 15.6c: Completed Union' : 'Hình 15.6c: Đã Union hoàn chỉnh'}
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* TASK 6: VẼ ĐOẠN NÉT ĐỨT VÁCH NGĂN (HÌNH 15.7) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5 text-slate-100 font-bold text-base sm:text-lg">
          <Split className="w-5 h-5 text-indigo-400" />
          <span>
            {bilingualMode === 'en'
              ? 'Task 6: Configuring the Dashed Stroke Divider (Fig 15.7)'
              : 'Nhiệm vụ 6: Thiết lập vách ngăn nét đứt Stroke style (Hình 15.7 SGK)'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {bilingualMode === 'en'
            ? 'Open Fill and Stroke (Shift+Ctrl+F), switch to the Stroke style tab, and set Width = 1.000 mm alongside a Dashes pattern to create an elegant content partition:'
            : 'Chọn Pen vẽ đoạn thẳng đứng, mở hộp thoại Fill and Stroke (Shift+Ctrl+F), chuyển sang trang Stroke style để chỉnh độ dày Width = 1.000 mm và chọn mẫu đường vạch trong ô Dashes:'}
        </p>

        {/* Dashes Pattern Selector Sandbox */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: bilingualMode === 'en' ? 'Standard Dashes (4 4)' : 'Nét đứt chuẩn (Dashes 4 4)', value: '6 4' },
              { label: bilingualMode === 'en' ? 'Dotted (2 4)' : 'Chấm bi (Dotted 2 4)', value: '2 4' },
              { label: bilingualMode === 'en' ? 'Long Dashes (8 4)' : 'Gạch dài ngắt đoạn (8 4)', value: '10 4' }
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setDashPattern(p.value)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  dashPattern === p.value
                    ? 'bg-indigo-950 border-indigo-500 ring-1 ring-indigo-400'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div className="text-xs font-bold text-indigo-300">{p.label}</div>
                <svg className="w-full h-4 mt-2">
                  <line x1="0" y1="8" x2="200" y2="8" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray={p.value} />
                </svg>
              </button>
            ))}
          </div>

          {/* Live Preview with schedule columns */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-around text-xs">
            {/* Column 1 */}
            <div className="text-center space-y-1">
              <div className="font-bold text-amber-300 uppercase">
                {bilingualMode === 'en' ? 'TIME' : 'THỜI GIAN'}
              </div>
              <div className="text-white font-mono">{bilingualMode === 'en' ? '8:00 – 21:00' : '8H – 21H'}</div>
              <div className="text-slate-300 text-[11px]">{bilingualMode === 'en' ? 'Oct 12 – 17, 2030' : '12 – 17/10/2030'}</div>
            </div>

            {/* Vertical Dashed Divider */}
            <svg className="w-6 h-20">
              <line x1="12" y1="5" x2="12" y2="75" stroke="#ffffff" strokeWidth={strokeWidth} strokeDasharray={dashPattern} />
            </svg>

            {/* Column 2 */}
            <div className="text-center space-y-1">
              <div className="font-bold text-amber-300 uppercase">
                {bilingualMode === 'en' ? 'LOCATION' : 'ĐỊA ĐIỂM'}
              </div>
              <div className="text-white font-mono">{bilingualMode === 'en' ? 'Thang Long Citadel' : 'Hoàng thành Thăng Long'}</div>
              <div className="text-slate-300 text-[11px]">{bilingualMode === 'en' ? '19C Hoang Dieu, Ba Dinh, HN' : '19C Hoàng Diệu, Ba Đình, HN'}</div>
            </div>
          </div>
        </div>

        {/* Pedagogical Prompts Widget */}
        <TeacherPromptsWidget lessonId={15} sectionIndex={3} />

        {/* Navigation jump */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            ← {bilingualMode === 'en' ? 'Books & Shelf' : 'Sách & Giá sách'}
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(4)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>{bilingualMode === 'en' ? 'Section 4: Exporting Raster PNG' : 'Sang Mục 4: Xuất ảnh điểm ảnh PNG'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
