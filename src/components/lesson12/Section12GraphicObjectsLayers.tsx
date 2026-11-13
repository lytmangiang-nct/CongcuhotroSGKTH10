import React, { useState } from 'react';
import {
  Layers,
  MousePointer,
  Square,
  Circle,
  Star,
  PenTool,
  Type,
  Palette,
  RotateCw,
  Move,
  Save,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Volume2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section12GraphicObjectsLayers: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Activity 3: Quả dưa hấu và quả cam (Trang 66)
  const [fruitArrangement, setFruitArrangement] = useState<'both' | 'only_watermelon' | 'orange_in_front' | 'watermelon_in_front'>('orange_in_front');

  // Interactive Color Palette Sandbox
  const [selectedShape, setSelectedShape] = useState<'rect' | 'circle' | 'star'>('circle');
  const [fillColor, setFillColor] = useState<string>('#f59e0b'); // amber-500
  const [strokeColor, setStrokeColor] = useState<string>('#b91c1c'); // red-700
  const [isShiftPressed, setIsShiftPressed] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(1); // 1 = resize mode, 2 = rotate mode

  // End of section question
  const [qAns, setQAns] = useState<string | null>(null);
  const [isQSubmitted, setIsQSubmitted] = useState<boolean>(false);

  const sectionSpeechVi =
    'Mục 3: Các đối tượng đồ hoạ của hình vẽ. Hoạt động 3 làm quen với khái niệm lớp thông qua vị trí quả dưa hấu và quả cam trên bàn. Để thêm đối tượng ta thực hiện 3 bước: chọn công cụ, chỉnh thuộc tính, kéo thả chuột vẽ hình. Công cụ Select cho phép di chuyển, nháy lần một để phóng to thu nhỏ, nháy lần hai để xoay hình. Để chọn màu tô Fill, nháy chuột vào bảng màu; để chọn màu viền Stroke, giữ phím Shift và nháy chuột vào bảng màu. Tệp được lưu dưới định dạng chuẩn SVG. Hộp Ghi nhớ 3 nhấn mạnh các đối tượng xuất hiện theo thứ tự lớp và ta có thể thay đổi thứ tự này.';
  const sectionSpeechEn =
    'Section 3: Graphic Objects and Layering. Activity 3 introduces layering via the watermelon and orange tabletop placement. Adding primitives follows 3 steps: select tool, configure properties, drag to draw. The Select tool enables repositioning, with click 1 toggling scaling handles and click 2 displaying rotational pivot arrows. Click swatches to assign Fill color; hold Shift + click to assign perimeter Stroke. Projects save under the open SVG standard. Summary Box 3 highlights layer stacking and order manipulation.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  const paletteColors = [
    { name: 'Đỏ', hex: '#dc2626' },
    { name: 'Vàng', hex: '#facc15' },
    { name: 'Cam', hex: '#f97316' },
    { name: 'Lục', hex: '#16a34a' },
    { name: 'Lam', hex: '#2563eb' },
    { name: 'Tím', hex: '#9333ea' },
    { name: 'Trắng', hex: '#ffffff' },
    { name: 'Đen', hex: '#0f172a' }
  ];

  const handlePaletteClick = (hex: string) => {
    if (isShiftPressed) {
      setStrokeColor(hex);
    } else {
      setFillColor(hex);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-sky-500/10 border border-purple-300 dark:border-purple-700/50 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 border border-purple-300 dark:border-purple-700">
              <Layers className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Section 3 • SGK Pages 66–67' : 'Mục 3 • SGK Trang 66–67'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              <BilingualText
                vi="3. CÁC ĐỐI TƯỢNG ĐỒ HOẠ CỦA HÌNH VẼ & CƠ CHẾ XẾP LỚP (LAYERING)"
                en="3. GRAPHIC OBJECTS, SHAPE TOOLS & LAYER STACKING RULES"
              />
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Khái niệm lớp (layer), 3 bước vẽ đối tượng cơ bản, công cụ Select 2 chế độ và quy tắc thiết lập màu tô (Fill) & màu viền (Stroke)."
                en="Layering fundamentals, 3-step drawing process, dual-mode Select tool, and interactive Fill & Stroke color assignment."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Activity 3: Quả dưa hấu & Quả cam (SGK Trang 66) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-800 flex items-center justify-center text-purple-700 dark:text-purple-300 font-black">
            HĐ3
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Hoạt động 3: Sắp xếp các đối tượng & Khái niệm Lớp (SGK Trang 66)"
                en="Activity 3: Arranging Objects & The Layer Concept (Page 66)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Nếu chúng ta có một quả dưa hấu và một quả cam ở trên bàn, xác định cách xếp 2 quả theo các trường hợp sau:"
                en="Given a watermelon and an orange on a table, evaluate their spatial arrangement:"
              />
            </p>
          </div>
        </div>

        {/* 4 Arrangement Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'both', labelVi: 'a) Nhìn thấy đủ cả 2 quả', labelEn: 'a) Both fully visible' },
            { id: 'only_watermelon', labelVi: 'b) Chỉ thấy quả dưa hấu', labelEn: 'b) Only watermelon visible' },
            { id: 'orange_in_front', labelVi: 'c) Thấy cam, dưa hấu bị che một phần', labelEn: 'c) Orange in front, melon partially hidden' },
            { id: 'watermelon_in_front', labelVi: 'd) Thấy dưa hấu, cam bị che một phần', labelEn: 'd) Melon in front, orange partially hidden' }
          ].map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setFruitArrangement(tab.id as any)}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer text-xs font-semibold ${
                fruitArrangement === tab.id
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300'
              }`}
            >
              {bilingualMode === 'en' ? tab.labelEn : tab.labelVi}
            </button>
          ))}
        </div>

        {/* Visual Layer Simulator */}
        <div className="p-6 rounded-2xl bg-slate-950 text-white flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden border border-slate-800">
          <svg className="w-64 h-44" viewBox="0 0 200 140">
            {/* Table Surface */}
            <ellipse cx="100" cy="115" rx="90" ry="20" fill="#334155" />

            {/* Case: both side-by-side */}
            {fruitArrangement === 'both' && (
              <>
                {/* Watermelon on Left */}
                <ellipse cx="65" cy="85" rx="35" ry="26" fill="#15803d" stroke="#14532d" strokeWidth="2" />
                <path d="M 40 85 Q 65 70 90 85" stroke="#166534" strokeWidth="3" fill="none" />
                {/* Orange on Right */}
                <circle cx="135" cy="92" r="20" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              </>
            )}

            {/* Case: only watermelon (orange hidden completely behind) */}
            {fruitArrangement === 'only_watermelon' && (
              <>
                <circle cx="100" cy="85" r="16" fill="#ea580c" opacity="0.3" />
                <ellipse cx="100" cy="85" rx="42" ry="32" fill="#15803d" stroke="#14532d" strokeWidth="2" />
                <path d="M 70 85 Q 100 68 130 85" stroke="#166534" strokeWidth="3" fill="none" />
              </>
            )}

            {/* Case: orange in front (Layer 2 over Layer 1) */}
            {fruitArrangement === 'orange_in_front' && (
              <>
                {/* Watermelon behind (Layer 1) */}
                <ellipse cx="90" cy="78" rx="42" ry="30" fill="#15803d" stroke="#14532d" strokeWidth="2" />
                <path d="M 60 78 Q 90 62 120 78" stroke="#166534" strokeWidth="3" fill="none" />
                {/* Orange in front (Layer 2) */}
                <circle cx="120" cy="96" r="22" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              </>
            )}

            {/* Case: watermelon in front (Layer 2 over Layer 1) */}
            {fruitArrangement === 'watermelon_in_front' && (
              <>
                {/* Orange behind (Layer 1) */}
                <circle cx="75" cy="75" r="22" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
                {/* Watermelon in front (Layer 2) */}
                <ellipse cx="110" cy="90" rx="42" ry="30" fill="#15803d" stroke="#14532d" strokeWidth="2" />
                <path d="M 80 90 Q 110 74 140 90" stroke="#166534" strokeWidth="3" fill="none" />
              </>
            )}
          </svg>

          <span className="text-xs text-slate-400 mt-2 font-mono">
            <BilingualText
              vi="Khái niệm then chốt: Đối tượng ở lớp trên (vẽ sau) sẽ che khuất đối tượng ở lớp dưới (vẽ trước)."
              en="Key Takeaway: Objects on upper layers (drawn later) cover objects on lower layers (drawn earlier)."
            />
          </span>
        </div>
      </div>

      {/* 3 Steps to Add Objects & Inkscape Toolbox Primitives (Hình 12.4) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Square className="w-5 h-5 text-indigo-600" />
          <BilingualText
            vi="Ba bước thêm đối tượng hình khối từ Hộp công cụ (Hình 12.4 • Trang 66)"
            en="Three Steps to Add Shapes from the Tool Box (Figure 12.4 • Page 66)"
          />
        </h3>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900">
              {bilingualMode === 'en' ? 'Step 1' : 'Bước 1'}
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              <BilingualText vi="Chọn công cụ tương ứng" en="Select Shape Tool" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Nhấp chuột chọn công cụ hình vuông (F4), hình tròn (F5), ngôi sao/đa giác (*), bút vẽ hoặc văn bản (F8) trên Hộp công cụ."
                en="Click the rectangle tool (F4), circle tool (F5), star/polygon (*), Bézier pen, or text tool (F8) in the Tool Box."
              />
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-2">
            <span className="text-xs font-black uppercase text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900">
              {bilingualMode === 'en' ? 'Step 2' : 'Bước 2'}
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              <BilingualText vi="Chỉnh tùy chọn thuộc tính" en="Adjust Tool Controls" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Trên thanh điều khiển thuộc tính: đặt số đỉnh (Corners), tỉ lệ góc (Spoke ratio), bo tròn góc hoặc làm sắc nhọn nếu cần."
                en="On Tool Controls bar: set corners count, spoke ratio, rounded corners, or randomized parameters as needed."
              />
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <span className="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900">
              {bilingualMode === 'en' ? 'Step 3' : 'Bước 3'}
            </span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              <BilingualText vi="Kéo thả chuột để vẽ" en="Drag & Release to Draw" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <BilingualText
                vi="Xác định vị trí trên vùng làm việc, nhấn giữ chuột trái và kéo rê đến kích thước mong muốn rồi thả chuột."
                en="Position on canvas, click and hold left mouse button, drag to desired dimensions, and release."
              />
            </p>
          </div>
        </div>

        {/* Tool Icons Preview (Hình 12.4 SGK) */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <BilingualText
              vi="Các công cụ tạo hình có sẵn trên Hộp công cụ (Hình 12.4):"
              en="Built-in shape creation tools in Tool Box (Figure 12.4):"
            />
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Square className="w-5 h-5 mx-auto text-sky-600" />
              <span className="text-xs font-bold block">
                <BilingualText vi="Hình vuông, chữ nhật" en="Rectangle & Square" />
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Circle className="w-5 h-5 mx-auto text-rose-600" />
              <span className="text-xs font-bold block">
                <BilingualText vi="Hình tròn, elip, cung" en="Circle, Ellipse & Arc" />
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Star className="w-5 h-5 mx-auto text-amber-500" />
              <span className="text-xs font-bold block">
                <BilingualText vi="Hình đa giác, ngôi sao" en="Stars & Polygons" />
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <PenTool className="w-5 h-5 mx-auto text-indigo-600" />
              <span className="text-xs font-bold block">
                <BilingualText vi="Bút vẽ tự do (Bézier)" en="Draw Bézier Curves" />
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <Type className="w-5 h-5 mx-auto text-emerald-600" />
              <span className="text-xs font-bold block">
                <BilingualText vi="Văn bản nghệ thuật" en="Text Objects" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Select Tool & Fill/Stroke Color Interactive Sandbox (SGK Trang 67) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-amber-600" />
            <BilingualText
              vi="Thực hành tương tác: Công cụ Select & Quy tắc tô Màu tô (Fill) vs Màu vẽ (Stroke)"
              en="Interactive Studio: Select Tool (F1) & Fill vs Stroke Color Setting"
            />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            <BilingualText
              vi="Quy tắc vàng SGK Trang 67: Nhấp ô màu = Đổi màu tô (Fill); Giữ phím Shift + Nhấp ô màu = Đổi màu vẽ viền (Stroke)."
              en="Textbook Golden Rule Page 67: Click color swatch = Set Fill color; Hold Shift + Click color swatch = Set Stroke color."
            />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Canvas Preview Area */}
          <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-950 flex flex-col items-center justify-center min-h-[280px] relative border border-slate-800 shadow-inner">
            {/* Click Count Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-slate-300 border border-slate-700">
                {clickCount === 1
                  ? (bilingualMode === 'en' ? 'Mode 1: Scale / Resize' : 'Chế độ 1: Phóng to / Thu nhỏ')
                  : (bilingualMode === 'en' ? 'Mode 2: Rotate & Center' : 'Chế độ 2: Xoay & Tâm xoay')}
              </span>
              <button
                type="button"
                onClick={() => setClickCount(clickCount === 1 ? 2 : 1)}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Click to Toggle Mode' : 'Nhấp chuột lại (Toggle)'}
              </button>
            </div>

            {/* Render Selected Shape */}
            <svg
              className="w-48 h-48 cursor-pointer transition-transform"
              style={{ transform: clickCount === 2 ? 'rotate(15deg)' : 'none' }}
              onClick={() => setClickCount(clickCount === 1 ? 2 : 1)}
            >
              {selectedShape === 'circle' && (
                <circle cx="96" cy="96" r="65" fill={fillColor} stroke={strokeColor} strokeWidth="8" />
              )}
              {selectedShape === 'rect' && (
                <rect x="36" y="36" width="120" height="120" rx="6" fill={fillColor} stroke={strokeColor} strokeWidth="8" />
              )}
              {selectedShape === 'star' && (
                <polygon
                  points="96,16 116,66 172,66 126,98 144,152 96,118 48,152 66,98 20,66 76,66"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth="6"
                />
              )}

              {/* Handles indicator */}
              {clickCount === 1 ? (
                <>
                  <rect x="26" y="26" width="8" height="8" fill="#38bdf8" />
                  <rect x="158" y="26" width="8" height="8" fill="#38bdf8" />
                  <rect x="26" y="158" width="8" height="8" fill="#38bdf8" />
                  <rect x="158" y="158" width="8" height="8" fill="#38bdf8" />
                </>
              ) : (
                <>
                  {/* Rotation center crosshair */}
                  <line x1="96" y1="88" x2="96" y2="104" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="88" y1="96" x2="104" y2="96" stroke="#38bdf8" strokeWidth="2" />
                </>
              )}
            </svg>

            <span className="text-[11px] text-slate-400 mt-2">
              <BilingualText
                vi="(Nhấp vào hình để chuyển đổi giữa chế độ co giãn mũi tên và chế độ xoay có tâm)"
                en="(Click shape to toggle between resizing arrows and rotation handles with center pivot)"
              />
            </span>
          </div>

          {/* Controls & Color Palette Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {bilingualMode === 'en' ? 'Select shape:' : 'Chọn hình:'}
              </span>
              {(['circle', 'rect', 'star'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedShape(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer capitalize ${
                    selectedShape === s
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {s === 'circle'
                    ? (bilingualMode === 'en' ? 'Circle' : 'Hình tròn')
                    : s === 'rect'
                    ? (bilingualMode === 'en' ? 'Rectangle' : 'Hình chữ nhật')
                    : (bilingualMode === 'en' ? 'Star' : 'Ngôi sao')}
                </button>
              ))}
            </div>

            {/* Current Fill & Stroke Indicators */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg border border-slate-300 shadow-xs" style={{ backgroundColor: fillColor }} />
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    <BilingualText vi="Màu tô (Fill)" en="Fill Color" />
                  </span>
                  <span className="text-xs font-mono font-bold">{fillColor}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg border-2 border-slate-300 shadow-xs" style={{ backgroundColor: strokeColor }} />
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">
                    <BilingualText vi="Màu viền (Stroke)" en="Stroke Color" />
                  </span>
                  <span className="text-xs font-mono font-bold">{strokeColor}</span>
                </div>
              </div>
            </div>

            {/* Shift Key Toggle Button */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs">
              <span className="font-semibold text-purple-900 dark:text-purple-200">
                <BilingualText vi="Chế độ phím Shift hiện tại:" en="Shift Key State:" />
              </span>
              <button
                type="button"
                onClick={() => setIsShiftPressed(!isShiftPressed)}
                className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                  isShiftPressed
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {isShiftPressed
                  ? (bilingualMode === 'en' ? '✓ Shift HELD (Stroke border)' : '✓ Đang GIỮ Shift (Tô viền Stroke)')
                  : (bilingualMode === 'en' ? 'Shift RELEASED (Fill background)' : 'Không giữ Shift (Tô nền Fill)')}
              </button>
            </div>

            {/* Color Palette Swatches */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                <BilingualText vi="Bảng màu (Nhấp để áp dụng):" en="Color Palette (Click to apply):" />
              </span>
              <div className="grid grid-cols-4 gap-2">
                {paletteColors.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => handlePaletteClick(c.hex)}
                    className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 flex items-center gap-2 hover:scale-105 transition cursor-pointer"
                  >
                    <div className="w-4 h-4 rounded-full border border-slate-400" style={{ backgroundColor: c.hex }} />
                    <span className="text-xs font-semibold">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box 3 (Hộp Ghi nhớ 3 - SGK Trang 67) */}
      <div className="p-6 rounded-3xl bg-amber-50/90 dark:bg-amber-950/30 border-2 border-dashed border-amber-400 dark:border-amber-700/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-black text-amber-950 dark:text-amber-200 text-base sm:text-lg">
            <BilingualText
              vi="Hộp Ghi nhớ 3: Đối tượng & Thứ tự lớp (SGK Trang 67)"
              en="Summary Box 3: Graphic Objects & Layering Rules (Page 67)"
            />
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
          <BilingualText
            vi="«Mỗi hình vẽ bao gồm các đối tượng đồ hoạ. Các đối tượng này sẽ xuất hiện theo thứ tự lớp, các đối tượng vẽ trước sẽ ở lớp dưới, đối tượng vẽ sau sẽ ở lớp trên. Ta có thể thay đổi thứ tự lớp của đối tượng.»"
            en="“Each drawing is composed of graphic objects. These objects appear in layer order: earlier-drawn objects occupy lower layers, while later-drawn objects reside on upper layers. You can adjust the layer order of any object.”"
          />
        </p>
      </div>

      {/* Concept Question Trang 67 */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Câu hỏi kiểm tra nhanh (SGK Trang 67)"
                en="Quick Concept Check (Textbook Page 67)"
              />
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
          <BilingualText
            vi="Theo em, thanh công cụ nào được sử dụng nhiều nhất trong Inkscape?"
            en="Which toolbar is most frequently used in Inkscape?"
          />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { key: 'A', viText: 'A. Bảng màu.', enText: 'A. Color palette.' },
            { key: 'B', viText: 'B. Thanh thiết lập chế độ kết dính.', enText: 'B. Snap controls bar.' },
            { key: 'C', viText: 'C. Thanh điều khiển thuộc tính.', enText: 'C. Tool controls bar.' },
            { key: 'D', viText: 'D. Hộp công cụ (Tool box).', enText: 'D. Tool box.' }
          ].map((opt) => (
            <button
              type="button"
              key={opt.key}
              onClick={() => !isQSubmitted && setQAns(opt.key)}
              className={`p-3 text-left rounded-2xl border transition cursor-pointer text-xs sm:text-sm font-semibold ${
                qAns === opt.key
                  ? isQSubmitted
                    ? opt.key === 'D'
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold'
                      : 'bg-rose-500 text-white border-rose-600 shadow-md font-bold'
                    : 'bg-purple-600 text-white border-purple-600'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
              }`}
            >
              {bilingualMode === 'en' ? opt.enText : opt.viText}
            </button>
          ))}
        </div>

        {isQSubmitted && qAns === 'D' && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 space-y-1 animate-fadeIn">
            <p className="font-bold">
              <BilingualText vi="Giải thích chuẩn SGK:" en="Textbook Explanation:" />
            </p>
            <p>
              <BilingualText
                vi="Hộp công cụ (Tool box) là thanh công cụ làm việc chính và được sử dụng nhiều nhất trong suốt quá trình vẽ, khởi tạo và biến đổi các đối tượng."
                en="The Tool Box is the primary working toolbar, used most frequently throughout creating, shaping, and transforming objects."
              />
            </p>
          </div>
        )}

        <div className="flex justify-end pt-2">
          {!isQSubmitted ? (
            <button
              type="button"
              onClick={() => qAns && setIsQSubmitted(true)}
              disabled={!qAns}
              className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer shadow-sm"
            >
              {bilingualMode === 'en' ? 'Check Answer' : 'Kiểm tra câu trả lời'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setQAns(null);
                setIsQSubmitted(false);
              }}
              className="px-4 py-2 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Retry' : 'Làm lại'}
            </button>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={12} />

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Section 2: Inkscape GUI' : 'Mục 2: Giao diện Inkscape'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-purple-500/25"
        >
          <span>{bilingualMode === 'en' ? 'Section 4: Practical Drawing' : 'Mục 4: Thực hành vẽ hoa & Quốc kì'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
