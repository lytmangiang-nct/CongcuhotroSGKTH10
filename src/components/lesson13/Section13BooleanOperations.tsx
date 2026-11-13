import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Scissors,
  Layers,
  Heart,
  Cloud,
  CheckCircle2,
  HelpCircle,
  Check,
  Sparkles,
  Command,
  RotateCcw
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

type BooleanType = 'union' | 'difference' | 'intersection' | 'exclusion' | 'division' | 'cut_path';

export const Section13BooleanOperations: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Active Boolean selection
  const [activeOp, setActiveOp] = useState<BooleanType>('difference');

  // Activity 3 Heart Puzzle Step
  const [heartStep, setHeartStep] = useState<number>(3); // 1 = Square, 2 = Added Circles, 3 = Unioned Heart

  // Cloud question state
  const [cloudAnswer, setCloudAnswer] = useState<string | null>(null);
  const [cloudChecked, setCloudChecked] = useState<boolean>(false);

  const sectionSpeechVi =
    'Mục 3: Các phép ghép đối tượng đồ hoạ, SGK Trang 71 và 72. Trong Inkscape, các hình phức tạp có thể thu được bằng cách ghép từ các hình đơn giản. Các phép ghép này nằm trong bảng chọn Path gồm 6 phép ghép cốt lõi: 1) Phép hợp Union phím tắt Ctrl cộng gộp tất cả các phần lại thành một hình duy nhất; 2) Phép hiệu Difference phím tắt Ctrl trừ lấy phần thuộc hình lớp dưới nhưng không thuộc hình lớp trên; 3) Phép giao Intersection phím tắt Ctrl nhân chỉ giữ lại phần chung thuộc cả hai hình; 4) Phép hiệu đối xứng Exclusion phím tắt Ctrl mũ lấy các phần trừ phần giao nhau; 5) Phép chia Division phím tắt Ctrl xuyệt chia hình dưới thành các mảng rời; 6) Phép cắt Cut Path phím tắt Ctrl Alt xuyệt cắt đường viền hình dưới tại các điểm giao. Hộp Ghi nhớ 3: Trong Inkscape, ta có thể làm các phép ghép với các hình để thu được hình mới.';
  const sectionSpeechEn =
    'Section 3: Boolean Path Operations, Textbook pages 71 and 72. In Inkscape, intricate graphics are constructed by combining simple primitives via the Path menu using 6 fundamental Boolean operations: 1) Union (Ctrl++) merges all selected shapes into one unified geometry; 2) Difference (Ctrl+-) subtracts the top overlapping shape from the bottom shape; 3) Intersection (Ctrl+*) keeps solely the intersecting shared area; 4) Exclusion (Ctrl+^) hollows out the overlapping intersection; 5) Division (Ctrl+/) slices the bottom shape along the top boundary; 6) Cut Path (Ctrl+Alt+/) cuts bottom stroke outlines at intersection points. Summary Box 3: In Inkscape, users can execute path operations to construct new shapes.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(
        bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi,
        bilingualMode === 'en' ? 'en' : 'vi'
      );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-rose-700 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-100 text-xs font-semibold backdrop-blur-sm mb-3">
              <Scissors className="w-3.5 h-3.5" />
              <span>
                <BilingualText vi="Mục 3 • Trang 71 – 72 SGK" en="Section 3 • Textbook pp. 71 – 72" />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="3. CÁC PHÉP GHÉP ĐỐI TƯỢNG ĐỒ HOẠ (BOOLEAN PATH OPERATIONS)"
                en="3. BOOLEAN PATH OPERATIONS & SHAPE COMBINATIONS"
              />
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Bảng chọn Path: Phép hợp (Union), Phép hiệu (Difference), Phép giao (Intersection), Phép hiệu đối xứng (Exclusion), Phép chia (Division), Phép cắt (Cut Path)."
                en="Path Menu: Union (Ctrl++), Difference (Ctrl+-), Intersection (Ctrl+*), Exclusion (Ctrl+^), Division (Ctrl+/), Cut Path (Ctrl+Alt+/)."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Activity 3 Heart Puzzle Showcase (Hình 13.5 SGK Trang 71) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold text-xs">
              HĐ3
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>
                <BilingualText
                  vi="Hoạt động 3: Ghép hình trái tim từ 2 hình tròn và 1 hình vuông (Hình 13.5)"
                  en="Activity 3: Assembling a Heart from 2 Circles & 1 Square (Figure 13.5)"
                />
              </span>
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Trang 71 SGK</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
          <BilingualText
            vi="« Tìm cách xếp ba mẩu giấy như Hình 13.5 thành một hình trái tim. Gợi ý: Em có thể xoay hình và xếp các hình lên nhau rồi thực hiện phép hợp (Path / Union). »"
            en="« Arrange the three paper cutouts from Figure 13.5 to create a heart shape. Hint: Rotate the square 45 degrees, overlay the two circles, and execute a Union operation. »"
          />
        </p>

        {/* Step-by-Step Heart Assembler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
          {/* SVG Preview Canvas */}
          <div className="flex flex-col items-center justify-center p-6 bg-rose-50/50 dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-slate-700 shadow-inner">
            <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-lg">
              {/* Step 1: Rotated Square 45 deg */}
              {heartStep === 1 && (
                <g className="animate-fadeIn">
                  <rect
                    x="65"
                    y="65"
                    width="90"
                    height="90"
                    transform="rotate(45 110 110)"
                    fill="#ef4444"
                    stroke="#b91c1c"
                    strokeWidth="3"
                  />
                  <text x="110" y="115" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                    {bilingualMode === 'en' ? '45° Square' : 'Hình vuông 45°'}
                  </text>
                </g>
              )}

              {/* Step 2: Overlay 2 circles on upper edges */}
              {heartStep === 2 && (
                <g className="animate-fadeIn">
                  <rect
                    x="65"
                    y="65"
                    width="90"
                    height="90"
                    transform="rotate(45 110 110)"
                    fill="#ef4444"
                    stroke="#b91c1c"
                    strokeWidth="2.5"
                    opacity="0.8"
                  />
                  {/* Top-left Circle */}
                  <circle cx="78" cy="78" r="45" fill="#f87171" stroke="#b91c1c" strokeWidth="2" opacity="0.85" />
                  {/* Top-right Circle */}
                  <circle cx="142" cy="78" r="45" fill="#f87171" stroke="#b91c1c" strokeWidth="2" opacity="0.85" />
                </g>
              )}

              {/* Step 3: Fused Heart (Union Ctrl++) */}
              {heartStep === 3 && (
                <g className="animate-fadeIn">
                  <path
                    d="M 110 174 L 46 110 A 45 45 0 0 1 110 46 A 45 45 0 0 1 174 110 Z"
                    fill="#e11d48"
                    stroke="#9f1239"
                    strokeWidth="4"
                    className="drop-shadow-md"
                  />
                  <path
                    d="M 68 70 A 18 18 0 0 1 90 60"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </g>
              )}
            </svg>

            <span className="text-xs font-semibold text-rose-700 dark:text-rose-300 mt-2">
              {heartStep === 1 && (bilingualMode === 'en' ? 'Step 1: Draw a square rotated 45° for the pointed bottom tip' : 'Bước 1: Vẽ hình vuông xoay góc 45 độ làm phần chóp nhọn đáy')}
              {heartStep === 2 && (bilingualMode === 'en' ? 'Step 2: Place 2 overlapping circles along the upper top edges' : 'Bước 2: Xếp 2 hình tròn đè lên 2 cạnh vát phía trên')}
              {heartStep === 3 && (bilingualMode === 'en' ? 'Step 3: Select all 3 shapes ➔ Press Ctrl + + (Path / Union) to fuse into a heart!' : 'Bước 3: Chọn cả 3 hình ➔ Nhấn Ctrl + + (Path / Union) gộp thành trái tim!')}
            </span>
          </div>

          {/* Stepper Buttons */}
          <div className="space-y-3">
            {[
              {
                step: 1,
                titleVi: 'Bước 1: Hình vuông xoay 45°',
                titleEn: 'Step 1: 45° Rotated Square',
                descVi: 'Vẽ hình vuông bằng F4, nháy 2 lần để xoay góc 45 độ',
                descEn: 'Draw square with F4, click twice to rotate 45 degrees'
              },
              {
                step: 2,
                titleVi: 'Bước 2: Xếp 2 hình tròn đỉnh',
                titleEn: 'Step 2: Place 2 Top Circles',
                descVi: 'Vẽ 2 hình tròn có đường kính bằng đúng cạnh hình vuông',
                descEn: 'Draw 2 circles with diameter equal to square side length'
              },
              {
                step: 3,
                titleVi: 'Bước 3: Lệnh Hợp (Path / Union)',
                titleEn: 'Step 3: Union (Path / Union)',
                descVi: 'Nhấn Ctrl + + để hàn gắn 3 hình thành một đường bao duy nhất',
                descEn: 'Press Ctrl + + to fuse 3 shapes into one unified path'
              }
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setHeartStep(s.step)}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  heartStep === s.step
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-rose-50/50'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                  heartStep === s.step ? 'bg-white text-rose-600' : 'bg-slate-200 dark:bg-slate-700 text-slate-600'
                }`}>
                  {s.step}
                </span>
                <div>
                  <div className="font-bold text-xs sm:text-sm">
                    {bilingualMode === 'en' ? s.titleEn : s.titleVi}
                  </div>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    {bilingualMode === 'en' ? s.descEn : s.descVi}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 6 Boolean Operations Interactive Visualizer (Hình 13.6 SGK Trang 72) */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Command className="w-6 h-6 text-indigo-400" />
            <div>
              <h3 className="font-extrabold text-lg text-white">
                <BilingualText
                  vi="HÌNH 13.6: KẾT QUẢ CÁC PHÉP GHÉP TRÊN 2 ĐỐI TƯỢNG (HÌNH VUÔNG & TRÒN)"
                  en="FIGURE 13.6: RESULTS OF BOOLEAN OPERATIONS ON SQUARE & CIRCLE"
                />
              </h3>
              <p className="text-xs text-slate-400">
                <BilingualText
                  vi="Hình vuông đỏ ở lớp dưới • Hình tròn hồng ở lớp trên đè lên"
                  en="Red square on bottom layer • Pink circle on top layer overlapping"
                />
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
            <BilingualText vi="Menu Path • 6 Phép toán" en="Path Menu • 6 Operations" />
          </span>
        </div>

        {/* 6 Boolean Tabs Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'union', labelVi: 'Phép hợp (Union)', labelEn: 'Union', shortcut: 'Ctrl ++', descVi: 'Lấy tất cả', descEn: 'Combine all' },
            { id: 'difference', labelVi: 'Phép hiệu (Difference)', labelEn: 'Difference', shortcut: 'Ctrl +-', descVi: 'Dưới trừ trên', descEn: 'Bottom minus top' },
            { id: 'intersection', labelVi: 'Phép giao (Intersection)', labelEn: 'Intersection', shortcut: 'Ctrl +*', descVi: 'Lấy phần chung', descEn: 'Intersection' },
            { id: 'exclusion', labelVi: 'Hiệu ĐX (Exclusion)', labelEn: 'Exclusion', shortcut: 'Ctrl +^', descVi: 'Trừ phần giao', descEn: 'Exclude common' },
            { id: 'division', labelVi: 'Phép chia (Division)', labelEn: 'Division', shortcut: 'Ctrl +/', descVi: 'Cắt rời 2 mảng', descEn: 'Cut 2 pieces' },
            { id: 'cut_path', labelVi: 'Phép cắt (Cut Path)', labelEn: 'Cut Path', shortcut: 'Ctrl +Alt+/', descVi: 'Cắt đường viền', descEn: 'Cut outline' }
          ].map((op) => (
            <button
              key={op.id}
              onClick={() => setActiveOp(op.id as BooleanType)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                activeOp === op.id
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg scale-[1.02] font-bold'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-700'
              }`}
            >
              <div className="text-xs truncate">
                <BilingualText vi={op.labelVi} en={op.labelEn} />
              </div>
              <div className="text-[10px] font-mono text-indigo-300 mt-0.5">{op.shortcut}</div>
              <div className="text-[10px] opacity-70 mt-1">
                {bilingualMode === 'en' ? op.descEn : op.descVi}
              </div>
            </button>
          ))}
        </div>

        {/* Live Vector SVG Display Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-950 p-6 rounded-2xl border border-slate-800">
          {/* Original Base Comparison (Before) */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 mb-3">
              <BilingualText
                vi="1. Hai hình ban đầu (Hình vuông dưới + Tròn trên)"
                en="1. Two Original Shapes (Square below + Circle above)"
              />
            </span>
            <svg width="180" height="180" viewBox="0 0 180 180">
              {/* Bottom Red Square */}
              <rect x="25" y="45" width="100" height="100" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
              {/* Top Pink Circle */}
              <circle cx="115" cy="85" r="45" fill="#f472b6" fillOpacity="0.75" stroke="#db2777" strokeWidth="2.5" />
              <text x="65" y="100" fill="#ffffff" fontSize="10" fontWeight="bold">
                {bilingualMode === 'en' ? 'Bottom layer' : 'Lớp dưới'}
              </text>
              <text x="120" y="85" fill="#ffffff" fontSize="10" fontWeight="bold">
                {bilingualMode === 'en' ? 'Top layer' : 'Lớp trên'}
              </text>
            </svg>
            <span className="text-[10px] text-slate-500 mt-2 font-mono">
              <BilingualText vi="Hình vuông (dưới) & Hình tròn (trên)" en="Square (bottom) & Circle (top)" />
            </span>
          </div>

          {/* After Operation Result */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-indigo-300 mb-3">
              <BilingualText
                vi={`2. Kết quả sau khi thực hiện: ${activeOp.toUpperCase()}`}
                en={`2. Result After Operation: ${activeOp.toUpperCase()}`}
              />
            </span>
            <svg width="180" height="180" viewBox="0 0 180 180" className="drop-shadow-lg">
              {activeOp === 'union' && (
                <path
                  d="M 25 45 L 115 45 A 45 45 0 0 1 160 85 A 45 45 0 0 1 115 130 L 115 145 L 25 145 Z"
                  fill="#ef4444"
                  stroke="#b91c1c"
                  strokeWidth="3"
                />
              )}

              {activeOp === 'difference' && (
                <path
                  d="M 25 45 L 115 45 A 45 45 0 0 0 70 85 A 45 45 0 0 0 115 130 L 115 145 L 25 145 Z"
                  fill="#ef4444"
                  stroke="#b91c1c"
                  strokeWidth="3"
                />
              )}

              {activeOp === 'intersection' && (
                <path
                  d="M 70 85 A 45 45 0 0 1 115 45 L 115 130 A 45 45 0 0 1 70 85 Z"
                  fill="#ef4444"
                  stroke="#b91c1c"
                  strokeWidth="3"
                />
              )}

              {activeOp === 'exclusion' && (
                <g>
                  {/* Left part of square */}
                  <path
                    d="M 25 45 L 115 45 A 45 45 0 0 0 70 85 A 45 45 0 0 0 115 130 L 115 145 L 25 145 Z"
                    fill="#ef4444"
                    stroke="#b91c1c"
                    strokeWidth="2.5"
                  />
                  {/* Right part of circle */}
                  <path
                    d="M 115 45 A 45 45 0 0 1 160 85 A 45 45 0 0 1 115 130 Z"
                    fill="#ef4444"
                    stroke="#b91c1c"
                    strokeWidth="2.5"
                  />
                </g>
              )}

              {activeOp === 'division' && (
                <g>
                  {/* Segment 1: Carved base square */}
                  <path
                    d="M 25 45 L 115 45 A 45 45 0 0 0 70 85 A 45 45 0 0 0 115 130 L 115 145 L 25 145 Z"
                    fill="#ef4444"
                    stroke="#b91c1c"
                    strokeWidth="2.5"
                    transform="translate(-6, 0)"
                  />
                  {/* Segment 2: Intersecting piece cut out */}
                  <path
                    d="M 70 85 A 45 45 0 0 1 115 45 L 115 130 A 45 45 0 0 1 70 85 Z"
                    fill="#f472b6"
                    stroke="#db2777"
                    strokeWidth="2.5"
                    transform="translate(8, 0)"
                  />
                </g>
              )}

              {activeOp === 'cut_path' && (
                <g>
                  {/* Cut strokes with gaps and no fill */}
                  <path
                    d="M 25 45 L 115 45"
                    stroke="#ef4444"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 25 45 L 25 145 L 115 145"
                    stroke="#ef4444"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 115 45 A 45 45 0 0 0 70 85 A 45 45 0 0 0 115 130"
                    stroke="#38bdf8"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                </g>
              )}
            </svg>

            {/* Explanation badge */}
            <div className="mt-3 text-xs text-center text-slate-300">
              {activeOp === 'union' && (
                <BilingualText
                  vi="Gộp 2 hình thành 1 đối tượng duy nhất"
                  en="Fused into a single unified object"
                />
              )}
              {activeOp === 'difference' && (
                <BilingualText
                  vi="Hình tròn đục thủng một góc khuyết của hình vuông"
                  en="Circle punches a cutout hole into the square"
                />
              )}
              {activeOp === 'intersection' && (
                <BilingualText
                  vi="Chỉ giữ lại mẩu bánh hình quạt giao nhau"
                  en="Retains only the overlapping intersection slice"
                />
              )}
              {activeOp === 'exclusion' && (
                <BilingualText
                  vi="Phần giao nhau biến thành lỗ thủng trong suốt"
                  en="The overlapping area becomes a transparent cutout"
                />
              )}
              {activeOp === 'division' && (
                <BilingualText
                  vi="Hình vuông bị chia đôi thành 2 mảng đối tượng độc lập"
                  en="Square is divided into 2 distinct separate pieces"
                />
              )}
              {activeOp === 'cut_path' && (
                <BilingualText
                  vi="Đường viền hình vuông bị cắt đứt thành các đoạn hở"
                  en="Square stroke is sliced into disconnected open segments"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box 3 (Hộp Ghi nhớ 3 Trang 72) */}
      <div className="bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border-l-4 border-purple-500 p-5 rounded-r-2xl space-y-2">
        <div className="flex items-center gap-2 text-purple-900 dark:text-purple-300 font-bold text-sm">
          <BookOpen className="w-4 h-4" />
          <BilingualText vi="HỘP GHI NHỚ 3 (SGK TRANG 72)" en="SUMMARY BOX 3 (PAGE 72)" />
        </div>
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          <BilingualText
            vi="« Trong Inkscape, ta có thể làm các phép ghép với các hình để thu được hình mới. »"
            en="« In Inkscape, users can perform Boolean path operations on shapes to generate entirely new geometries. »"
          />
        </p>
      </div>

      {/* In-Lesson Question: Cloud Drawing (Hình 13.7 SGK Trang 72) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Cloud className="w-5 h-5" />
          <h3 className="font-bold text-base sm:text-lg">
            <BilingualText
              vi="CÂU HỎI CỦNG CỐ: VẼ ĐÁM MÂY (HÌNH 13.7 SGK TRANG 72)"
              en="CONCEPT CHECK: DRAWING A CLOUD (FIGURE 13.7, PAGE 72)"
            />
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Cloud SVG diagram mirroring Hình 13.7 */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
            <svg width="100" height="70" viewBox="0 0 100 70">
              {/* Overlapping circles */}
              <circle cx="35" cy="40" r="20" fill="none" stroke="#64748b" strokeWidth="2" />
              <circle cx="65" cy="40" r="20" fill="none" stroke="#64748b" strokeWidth="2" />
              <circle cx="50" cy="30" r="22" fill="none" stroke="#64748b" strokeWidth="2" />
              <circle cx="50" cy="48" r="18" fill="none" stroke="#64748b" strokeWidth="2" />
            </svg>

            <span className="text-lg font-bold text-slate-400">➔</span>

            <svg width="100" height="70" viewBox="0 0 100 70">
              {/* Cloud result */}
              <path
                d="M 25 50 A 18 18 0 0 1 20 32 A 20 20 0 0 1 45 18 A 22 22 0 0 1 75 22 A 20 20 0 0 1 85 45 A 18 18 0 0 1 68 56 L 32 56 Z"
                fill="#e0f2fe"
                stroke="#0284c7"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <p className="font-semibold text-slate-900 dark:text-white">
              <BilingualText
                vi="Em hãy nêu phép ghép hình và các bước thực hiện để vẽ đám mây như Hình 13.7:"
                en="Which Boolean operation and steps are needed to draw the cloud in Figure 13.7?"
              />
            </p>
            <p className="italic text-slate-500">
              <BilingualText
                vi="Từ các vòng tròn lồng ghép nhau bên trái làm thế nào để thu được viền đám mây bên phải?"
                en="From overlapping circles on the left, how do you produce the cloud contour on the right?"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {[
            { id: 'union', labelVi: 'A. Dùng phép HỢP (Path / Union - Ctrl ++)', labelEn: 'A. Use UNION (Path / Union - Ctrl ++)', correct: true },
            { id: 'diff', labelVi: 'B. Dùng phép HIỆU (Path / Difference - Ctrl +-)', labelEn: 'B. Use DIFFERENCE (Path / Difference - Ctrl +-)', correct: false },
            { id: 'inter', labelVi: 'C. Dùng phép GIAO (Path / Intersection - Ctrl +*)', labelEn: 'C. Use INTERSECTION (Path / Intersection - Ctrl +*)', correct: false },
            { id: 'div', labelVi: 'D. Dùng phép CHIA (Path / Division - Ctrl +/)', labelEn: 'D. Use DIVISION (Path / Division - Ctrl +/)', correct: false }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setCloudAnswer(opt.id);
                setCloudChecked(true);
              }}
              className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                cloudAnswer === opt.id
                  ? opt.correct
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold'
                    : 'bg-rose-500 text-white border-rose-600 shadow-md font-bold'
                  : 'bg-slate-50 dark:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{bilingualMode === 'en' ? opt.labelEn : opt.labelVi}</span>
              {cloudChecked && opt.correct && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>

        {cloudChecked && cloudAnswer === 'union' && (
          <div className="p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                <BilingualText
                  vi="Giải thích chuẩn SGK: Đáp án đúng là Phép hợp (Union)."
                  en="Textbook Explanation: Correct answer is UNION."
                />
              </span>
            </div>
            <p>
              <BilingualText
                vi="2 bước thực hiện: 1. Dùng công cụ F5 vẽ nhiều hình tròn có kích thước khác nhau đặt lồng ghép lên nhau theo hình dáng đám mây mong muốn. 2. Nhấn giữ phím Shift (hoặc dùng chuột quét vùng chọn) để chọn tất cả các hình tròn, sau đó nhấn tổ hợp phím Ctrl + + (hoặc vào menu Path ➔ Union) để gộp tất cả các hình tròn thành một đường bao đám mây liền mạch duy nhất."
                en="2 Action Steps: 1. Use F5 tool to draw circles of various sizes overlapping into the desired cloud shape. 2. Hold Shift (or marquee drag) to select all circles, then press Ctrl + + (or Path ➔ Union) to merge them into a single seamless cloud outline."
              />
            </p>
          </div>
        )}
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={prevPage}
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            <BilingualText vi="Quay lại: 2. Thiết lập màu tô và màu vẽ" en="Back: 2. Fill and Stroke Styling" />
          </span>
        </button>

        <button
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <span>
            <BilingualText vi="Tiếp tục: Thực hành 3 nhiệm vụ" en="Next: Lab 3 Practical Tasks" />
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pedagogical Prompts for Teachers */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={13} />
    </div>
  );
};
