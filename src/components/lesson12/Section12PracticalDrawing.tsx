import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  Volume2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCw,
  Copy,
  Layers,
  Star,
  Square,
  Play,
  RotateCcw,
  Check,
  Flag,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section12PracticalDrawing: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Task 1: Flower Assembly interactive state
  const [flowerStep, setFlowerStep] = useState<number>(0);
  const [petalCount, setPetalCount] = useState<number>(8);
  const [flowerColor, setFlowerColor] = useState<string>('#e11d48'); // rose-600
  const [centerColor, setCenterColor] = useState<string>('#facc15'); // yellow-400

  // Task 2: Vietnam Flag interactive state
  const [flagStep, setFlagStep] = useState<number>(0);
  const [rectLayerState, setRectLayerState] = useState<'top' | 'bottom'>('top');
  const [spokeRatio, setSpokeRatio] = useState<number>(0.4);

  const sectionSpeechVi =
    'Mục 4: Thực hành vẽ hình trong Inkscape. Nhiệm vụ 1: Hướng dẫn vẽ một bông hoa từ hình tròn đài hoa và hình elip cánh hoa bằng thao tác nhân bản Duplicate, nháy đúp công cụ Select để chuyển sang chế độ xoay và ghép các cánh hoa đối xứng. Nhiệm vụ 2: Vẽ Quốc kì Việt Nam theo 3 bước: vẽ ngôi sao 5 cánh màu vàng với Spoke ratio bằng 0.4, vẽ hình chữ nhật đỏ tỉ lệ 2 trên 3, và đưa hình chữ nhật xuống lớp dưới bằng nút lệnh Lower selection to bottom để ngôi sao vàng nổi lên trên bề mặt cờ đỏ.';
  const sectionSpeechEn =
    'Section 4: Practical Drawing Workflows in Inkscape. Task 1: Step-by-step assembly of a Cosmos flower combining a circular central disc with elliptical petals using Duplicate clones, rotational pivot alignment, and radial distribution. Task 2: Drawing the National Flag of Vietnam in 3 precise steps: generating a 5-pointed golden star with a 0.4 spoke ratio, drawing a 2:3 red rectangular field, and lowering the red field to the bottom layer so the golden star displays prominently.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-indigo-500/10 border border-rose-300 dark:border-rose-700/50 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Section 4 • SGK Pages 67–68' : 'Mục 4 • SGK Trang 67–68'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              <BilingualText
                vi="4. THỰC HÀNH: VẼ BÔNG HOA & QUỐC KÌ VIỆT NAM (INKSCAPE)"
                en="4. PRACTICAL LAB: DRAWING A FLOWER & THE VIETNAMESE FLAG"
              />
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Hướng dẫn từng bước thực hành Nhiệm vụ 1 (Hình 12.5) và Nhiệm vụ 2 (Hình 12.6) với phòng thí nghiệm tương tác mô phỏng."
                en="Step-by-step interactive guidance for Task 1 (Figure 12.5) and Task 2 (Figure 12.6) with live parametric SVG rendering."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Task 1: Vẽ bông hoa (Hình 12.5 Trang 67) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-800 flex items-center justify-center text-rose-700 dark:text-rose-300 font-black">
              NV1
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                <BilingualText
                  vi="Nhiệm vụ 1: Vẽ một bông hoa từ hình tròn và hình elip (Hình 12.5)"
                  en="Task 1: Drawing a Flower from Circles and Ellipses (Figure 12.5)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Thao tác: Chọn công cụ hình tròn/elip → Duplicate bản sao → Chọn Select xoay hướng cánh hoa"
                  en="Operations: Circle/ellipse tool → Duplicate clone → Select tool to rotate petal orientation"
                />
              </p>
            </div>
          </div>

          {/* Stepper buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            {[
              { vi: '1. Đài hoa & Cánh', en: '1. Receptacle & Petal' },
              { vi: '2. Duplicate', en: '2. Duplicate' },
              { vi: '3. Xoay cánh', en: '3. Rotate Petals' },
              { vi: '4. Hoàn thiện', en: '4. Complete Flower' }
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setFlowerStep(idx)}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  flowerStep === idx
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {bilingualMode === 'en' ? item.en : item.vi}
              </button>
            ))}
          </div>
        </div>

        {/* Task 1 Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Flower Visual Canvas */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950 flex flex-col items-center justify-center min-h-[300px] relative border border-slate-800 shadow-inner">
            <svg className="w-56 h-56" viewBox="0 0 200 200">
              {/* Center disc (Đài hoa) */}
              <circle cx="100" cy="100" r="22" fill={centerColor} stroke="#ca8a04" strokeWidth="2.5" />

              {/* Step 0: Single petal */}
              {flowerStep === 0 && (
                <ellipse cx="100" cy="45" rx="14" ry="36" fill={flowerColor} stroke="#9f1239" strokeWidth="2" />
              )}

              {/* Step 1: Duplicate overlapping petal with offset */}
              {flowerStep === 1 && (
                <>
                  <ellipse cx="100" cy="45" rx="14" ry="36" fill={flowerColor} stroke="#9f1239" strokeWidth="2" opacity="0.6" />
                  <ellipse cx="106" cy="42" rx="14" ry="36" fill={flowerColor} stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3,3" />
                </>
              )}

              {/* Step 2: Rotated petals (4 petals) */}
              {flowerStep === 2 && (
                [0, 90, 180, 270].map((angle) => (
                  <ellipse
                    key={angle}
                    cx="100"
                    cy="45"
                    rx="14"
                    ry="36"
                    fill={flowerColor}
                    stroke="#9f1239"
                    strokeWidth="2"
                    transform={`rotate(${angle} 100 100)`}
                  />
                ))
              )}

              {/* Step 3: Complete Flower (8 petals) */}
              {flowerStep === 3 && (
                Array.from({ length: petalCount }).map((_, idx) => {
                  const angle = (idx * 360) / petalCount;
                  return (
                    <ellipse
                      key={angle}
                      cx="100"
                      cy="45"
                      rx="14"
                      ry="36"
                      fill={flowerColor}
                      stroke="#9f1239"
                      strokeWidth="2"
                      transform={`rotate(${angle} 100 100)`}
                    />
                  );
                })
              )}

              {/* Center disc on top layer */}
              <circle cx="100" cy="100" r="20" fill={centerColor} stroke="#ca8a04" strokeWidth="2.5" />
            </svg>

            <span className="text-[11px] text-slate-400 mt-2 font-mono">
              {flowerStep === 0 && (bilingualMode === 'en' ? 'Figure 12.5a: Draw center disc circle and 1 petal ellipse' : 'Hình 12.5a: Vẽ hình tròn đài hoa và 1 hình elip cánh hoa')}
              {flowerStep === 1 && (bilingualMode === 'en' ? 'Figure 12.5b: Right-click Duplicate (Ctrl+D) to duplicate petal' : 'Hình 12.5b: Nhấp chuột phải chọn Duplicate (Ctrl+D) để nhân bản cánh hoa')}
              {flowerStep === 2 && (bilingualMode === 'en' ? 'Figure 12.5c-e: Click Select twice to reveal rotation center and rotate petals' : 'Hình 12.5c-e: Chọn Select nháy lần 2 để hiện tâm xoay và xoay các cánh')}
              {flowerStep === 3 && (bilingualMode === 'en' ? 'Figure 12.5g: Completed radiant symmetrical flower' : 'Hình 12.5g: Bông hoa hoàn thiện đối xứng rực rỡ')}
            </span>
          </div>

          {/* Step Instructions & Live Controls */}
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
              <h4 className="font-bold text-rose-900 dark:text-rose-200">
                {flowerStep === 0 && (bilingualMode === 'en' ? 'Step 1: Create Circle & Ellipse (Figure 12.5a)' : 'Bước 1: Khởi tạo hình tròn & elip (Hình 12.5a)')}
                {flowerStep === 1 && (bilingualMode === 'en' ? 'Step 2: Clone Petal with Duplicate (Figure 12.5b)' : 'Bước 2: Nhân bản cánh hoa bằng Duplicate (Hình 12.5b)')}
                {flowerStep === 2 && (bilingualMode === 'en' ? 'Step 3: Switch to Rotation Mode (Figure 12.5c–12.5e)' : 'Bước 3: Chuyển sang chế độ xoay (Hình 12.5c–12.5e)')}
                {flowerStep === 3 && (bilingualMode === 'en' ? 'Step 4: Finalize Symmetrical Flower (Figure 12.5g)' : 'Bước 4: Hoàn thiện bông hoa đối xứng (Hình 12.5g)')}
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {flowerStep === 0 && (bilingualMode === 'en' ? 'Select circle tool in Tool Box, hold Ctrl to draw a true circle receptacle, drag freely to draw an ellipse petal, and pick colors from palette.' : 'Chọn công cụ hình tròn trên hộp công cụ, giữ Ctrl để vẽ đài hoa tròn đều và kéo thả tự do để vẽ hình elip làm cánh hoa, chọn màu trên bảng màu.')}
                {flowerStep === 1 && (bilingualMode === 'en' ? 'Select newly drawn ellipse, right-click and choose Duplicate (or press Ctrl + D) to create a petal clone placed directly on top.' : 'Chọn hình elip vừa vẽ, nháy chuột phải chọn lệnh Duplicate (hoặc nhấn tổ hợp phím tắt Ctrl + D) để tạo bản sao cánh hoa nằm đè ngay phía trên.')}
                {flowerStep === 2 && (bilingualMode === 'en' ? 'Select tool (F1), click once to display scaling arrows, click twice to reveal curved rotation handles and pivot point.' : 'Chọn công cụ Select (phím F1), nháy lần 1 hiển thị mũi tên phóng to, nháy lần 2 hiển thị các mũi tên cong để xoay quanh tâm xoay.')}
                {flowerStep === 3 && (bilingualMode === 'en' ? 'Arrange petals around center disc at equal rotational intervals. Export and save the finalized vector graphic as an SVG file!' : 'Kéo các cánh hoa vào vị trí đài hoa và xoay đều góc. Bông hoa hoàn chỉnh được lưu lại bằng tệp định dạng chuẩn SVG!')}
              </p>
            </div>

            {/* Interactive sliders for Step 3 */}
            {flowerStep === 3 && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    <BilingualText vi="Số lượng cánh hoa:" en="Petal count:" />
                  </span>
                  <div className="flex items-center gap-2">
                    {[6, 8, 10, 12].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPetalCount(num)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          petalCount === num
                            ? 'bg-rose-600 text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {num} {bilingualMode === 'en' ? 'petals' : 'cánh'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    <BilingualText vi="Đổi màu hoa:" en="Change flower color:" />
                  </span>
                  <div className="flex items-center gap-2">
                    {['#e11d48', '#f97316', '#9333ea', '#2563eb'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFlowerColor(c)}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-xs cursor-pointer hover:scale-110 transition"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Task 2: Vẽ Quốc kì Việt Nam (Hình 12.6 Trang 67 – 68) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 flex items-center justify-center text-amber-700 dark:text-amber-300 font-black">
              {bilingualMode === 'en' ? 'TASK 2' : 'NV2'}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                <BilingualText
                  vi="Nhiệm vụ 2: Vẽ Quốc kì Việt Nam & Kỹ thuật đổi thứ tự lớp (Hình 12.6)"
                  en="Task 2: Drawing Vietnam's National Flag & Layer Order Inversion (Figure 12.6)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Thao tác: Vẽ ngôi sao 5 cánh (Corners: 5, Spoke: 0.4) → Vẽ hình chữ nhật đỏ 2:3 → Hạ xuống lớp dưới"
                  en="Operations: Draw 5-pointed star (Corners: 5, Spoke: 0.4) → Draw 2:3 red rectangle → Lower to bottom layer"
                />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold">
            {[
              { vi: '1. Ngôi sao vàng', en: '1. Yellow Star' },
              { vi: '2. Nền chữ nhật đỏ', en: '2. Red Background' },
              { vi: '3. Hạ lớp đỏ xuống', en: '3. Lower Red Layer' }
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setFlagStep(idx);
                  if (idx === 1) setRectLayerState('top');
                  if (idx === 2) setRectLayerState('bottom');
                }}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  flagStep === idx
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {bilingualMode === 'en' ? item.en : item.vi}
              </button>
            ))}
          </div>
        </div>

        {/* Flag Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Live SVG Stage */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950 flex flex-col items-center justify-center min-h-[300px] relative border border-slate-800 shadow-inner">
            <svg className="w-72 h-48 border border-slate-700 rounded-xl overflow-hidden shadow-2xl" viewBox="0 0 300 200">
              {/* Layer Stacking Order Simulation */}
              {flagStep === 0 && (
                /* Only yellow star on white ground */
                <>
                  <rect width="300" height="200" fill="#0f172a" />
                  <polygon
                    points="150,45 163,88 208,88 172,114 186,157 150,130 114,157 128,114 92,88 137,88"
                    fill="#facc15"
                  />
                </>
              )}

              {flagStep === 1 && (
                /* Red rectangle drawn on top obscuring star */
                <>
                  {/* Star is behind */}
                  <polygon
                    points="150,45 163,88 208,88 172,114 186,157 150,130 114,157 128,114 92,88 137,88"
                    fill="#facc15"
                  />
                  {/* Red rectangle overlays on top! */}
                  <rect width="300" height="200" fill="#dc2626" opacity={rectLayerState === 'top' ? 1 : 0.85} />
                  {rectLayerState === 'top' && (
                    <text x="150" y="105" fill="#ffffff" textAnchor="middle" fontSize="13" fontWeight="bold">
                      {bilingualMode === 'en'
                        ? 'The golden star is hidden beneath the upper layer!'
                        : 'Ngôi sao vàng đã bị che khuất ở lớp dưới!'}
                    </text>
                  )}
                </>
              )}

              {flagStep === 2 && (
                /* Completed Flag: Red rectangle lowered, star on top */
                <>
                  <rect width="300" height="200" fill="#dc2626" />
                  <polygon
                    points="150,45 163,88 208,88 172,114 186,157 150,130 114,157 128,114 92,88 137,88"
                    fill="#facc15"
                  />
                </>
              )}
            </svg>

            <span className="text-[11px] text-slate-400 mt-2 font-mono">
              {flagStep === 0 && (bilingualMode === 'en' ? 'Figure 12.6a: Standard 5-point yellow star (Corners: 5, Spoke ratio: 0.4)' : 'Hình 12.6a: Ngôi sao vàng 5 cánh chuẩn (Corners: 5, Spoke ratio: 0.4)')}
              {flagStep === 1 && (bilingualMode === 'en' ? 'Figure 12.6b: Red rectangle drawn later sits on upper layer obscuring star' : 'Hình 12.6b: Hình chữ nhật đỏ vẽ sau nên ở lớp trên che khuất ngôi sao')}
              {flagStep === 2 && (bilingualMode === 'en' ? 'Figure 12.6c: Lower red rectangle to bottom → Complete National Flag' : 'Hình 12.6c: Đưa chữ nhật đỏ xuống lớp dưới (Lower to bottom) → Quốc kì hoàn chỉnh')}
            </span>
          </div>

          {/* Flag Step Instructions & Controls */}
          <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
              <h4 className="font-bold text-amber-900 dark:text-amber-200">
                {flagStep === 0 && (bilingualMode === 'en' ? 'Step 1: Draw 5-Point Yellow Star (Figure 12.6a)' : 'Bước 1: Vẽ ngôi sao vàng 5 cánh (Hình 12.6a)')}
                {flagStep === 1 && (bilingualMode === 'en' ? 'Step 2: Draw 2:3 Red Background (Figure 12.6b)' : 'Bước 2: Vẽ nền chữ nhật đỏ tỉ lệ 2 : 3 (Hình 12.6b)')}
                {flagStep === 2 && (bilingualMode === 'en' ? 'Step 3: Lower Red Rectangle to Bottom Layer (Figure 12.6c)' : 'Bước 3: Đưa hình chữ nhật đỏ xuống lớp dưới (Hình 12.6c)')}
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {flagStep === 0 && (bilingualMode === 'en' ? 'Select polygon/star tool in Tool Box. On Tool Controls bar, click Star icon, set Corners: 5 and Spoke ratio: 0.4. Fill with yellow.' : 'Chọn công cụ đa giác/ngôi sao trên Hộp công cụ. Trên thanh điều khiển thuộc tính chọn biểu tượng Ngôi sao, đặt Corners là 5 và Spoke ratio là 0.4. Tô màu vàng.')}
                {flagStep === 1 && (bilingualMode === 'en' ? 'Draw rectangle with 2:3 aspect ratio, fill with red. Drawn later, it sits on upper layer and completely conceals the star!' : 'Vẽ hình chữ nhật tỉ lệ rộng và dài là 2 : 3, tô nền màu đỏ. Vì hình chữ nhật vẽ sau nên theo quy tắc lớp nó sẽ nằm ở lớp trên và che khuất ngôi sao vàng!')}
                {flagStep === 2 && (bilingualMode === 'en' ? 'Select tool (F1), select red rectangle, click "Lower selection to bottom" (or PageDown/End) to move red rectangle beneath the star.' : 'Chọn công cụ Select (F1), nháy chọn hình chữ nhật đỏ, nháy nút lệnh "Lower selection to bottom" (hoặc phím tắt PageDown/End) để hạ chữ nhật đỏ xuống dưới. Ngôi sao vàng sẽ nổi lên trên!')}
              </p>
            </div>

            {/* Interactive Layer Shift Buttons */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                <BilingualText
                  vi="Thử nghiệm đổi thứ tự lớp của hình chữ nhật đỏ:"
                  en="Interactive Experiment: Invert Layer Order of Red Rectangle:"
                />
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRectLayerState('bottom');
                    setFlagStep(2);
                  }}
                  className={`px-4 py-2 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 ${
                    rectLayerState === 'bottom'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <ArrowDown className="w-4 h-4" />
                  <span>{bilingualMode === 'en' ? 'Lower red rectangle to bottom' : 'Hạ lớp chữ nhật đỏ xuống (Lower to bottom)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRectLayerState('top');
                    setFlagStep(1);
                  }}
                  className={`px-4 py-2 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 ${
                    rectLayerState === 'top'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>{bilingualMode === 'en' ? 'Raise red rectangle to top' : 'Đưa lớp chữ nhật đỏ lên (Raise to top)'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={12} />

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Section 3: Graphic Objects & Layers' : 'Mục 3: Đối tượng & Thứ tự lớp'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-rose-500/25"
        >
          <span>{bilingualMode === 'en' ? 'Section 5: Practice & Applications' : 'Mục 5: Luyện tập & Vận dụng'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
