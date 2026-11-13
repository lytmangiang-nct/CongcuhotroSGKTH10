import React, { useState } from 'react';
import {
  Wrench,
  Layers,
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Sun,
  Palette,
  CircleDot,
  MousePointer,
  Maximize2
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section13PracticalLab: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Task 1: 3-Arc Logo stepper (Figures 13.8 & 13.9)
  const [task1Step, setTask1Step] = useState<number>(5);
  const [task1StrokeWidth, setTask1StrokeWidth] = useState<number>(14);

  // Task 2: Tree with Difference & Union (Figures 13.10 & 13.11)
  const [task2Step, setTask2Step] = useState<number>(5);
  const [task2ShowCutters, setTask2ShowCutters] = useState<boolean>(true);

  // Task 3: 3D Sphere with Radial Gradient (Figures 13.12 & 13.13)
  const [sphereLightX, setSphereLightX] = useState<number>(35);
  const [sphereLightY, setSphereLightY] = useState<number>(35);
  const [sphereColor, setSphereColor] = useState<string>('#3b82f6'); // default blue

  const sectionSpeechVi =
    'Mục 4: Thực hành - Trang 72 và 73 SGK Tin học 10. Bài thực hành gồm 3 nhiệm vụ trọng tâm: Nhiệm vụ 1: Vẽ logo từ 3 cung tròn lồng vào nhau bằng công cụ Circle/Arc, chỉnh Stroke Width và phím tắt Ctrl+D nhân bản xoay 120 độ. Nhiệm vụ 2: Vẽ hình cây hoàn chỉnh bằng cách kết hợp phép Difference để khoét cong thân cây và phép Union để hợp nhất thân với 3 tán lá tròn. Nhiệm vụ 3: Vẽ hình cầu ba chiều có độ sâu thị giác bằng dải màu chuyển sắc toả tròn Radial Gradient và điều chỉnh tâm sáng.';
  const sectionSpeechEn =
    'Section 4: Practical Lab - Pages 72 and 73 of Informatics 10 Textbook. This hands-on lab features 3 core tasks: Task 1: Construct a 3-arc interlocking logo using the Circle/Arc tool, Stroke Width adjustments, and Ctrl+D duplication rotated at 120 degrees. Task 2: Construct a stylized tree by applying Path Difference to carve the curved trunk and Path Union to merge trunk and foliage circles. Task 3: Render a realistic 3D sphere illusion using Radial Gradient with directional highlight focal point.';

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
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-800 to-indigo-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Wrench className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-500/30 border border-emerald-300/40 rounded-full text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                <BilingualText
                  vi="Phần 4 • Thực hành chuyên sâu (Trang 72–73)"
                  en="Section 4 • Practical Hands-On Lab (Pages 72–73)"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <BilingualText
                  vi="4. Thực hành: Tạo và ghép các đối tượng đồ hoạ"
                  en="4. Practice: Creating & Combining Graphic Objects"
                />
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TASK 1: 3-ARC LOGO (Figures 13.8 & 13.9)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4 flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 font-black flex items-center justify-center text-lg">
              1
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BilingualText
                  vi="Nhiệm vụ 1: Vẽ logo từ các hình kỷ hà (Hình 13.8 & 13.9)"
                  en="Task 1: Draw Logo from Geometric Shapes (Figs 13.8 & 13.9)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Vận dụng: Công cụ Circle, thuộc tính Arc, Stroke width, phím tắt Ctrl+D và xoay 120°"
                  en="Apply: Circle tool, Arc property, Stroke width, Ctrl+D duplication and 120° rotation"
                />
              </p>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/60 p-1.5 rounded-2xl">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => setTask1Step(step)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                  task1Step === step
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {bilingualMode === 'en' ? `Step ${step}` : `Bước ${step}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Logo Canvas */}
          <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 border border-slate-700 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden shadow-inner">
            <div className="absolute top-3 left-4 text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-ping" />
              <span>Inkscape Viewport (100% Vector)</span>
            </div>

            {/* SVG Logo Render */}
            <svg viewBox="-120 -120 240 240" className="w-64 h-64 select-none drop-shadow-xl">
              <defs>
                {/* Arc path definition */}
                <path
                  id="logoArc"
                  d="M -40 25 A 48 48 0 1 1 40 25"
                  fill="none"
                  strokeWidth={task1StrokeWidth}
                  strokeLinecap="round"
                />
              </defs>

              {/* Step 1: Base full circle */}
              {task1Step === 1 && (
                <circle
                  cx="0"
                  cy="0"
                  r="50"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                />
              )}

              {/* Step 2: Open arc with node handles */}
              {task1Step === 2 && (
                <g>
                  <use href="#logoArc" stroke="#0ea5e9" strokeWidth="4" />
                  <circle cx="-40" cy="25" r="4" fill="#f43f5e" />
                  <circle cx="40" cy="25" r="4" fill="#f43f5e" />
                </g>
              )}

              {/* Step 3: Stroke width thicker */}
              {task1Step === 3 && (
                <use href="#logoArc" stroke="#0ea5e9" strokeWidth={task1StrokeWidth} />
              )}

              {/* Step 4: Duplicated and rotated 120 deg (2 arcs) */}
              {task1Step === 4 && (
                <g transform="translate(0, 10)">
                  <g transform="rotate(0) translate(0, -28)">
                    <use href="#logoArc" stroke="#ef4444" strokeWidth={task1StrokeWidth} />
                  </g>
                  <g transform="rotate(120) translate(0, -28)">
                    <use href="#logoArc" stroke="#10b981" strokeWidth={task1StrokeWidth} />
                  </g>
                </g>
              )}

              {/* Step 5: Full 3 arcs interlocking rotated 120° & colored */}
              {task1Step === 5 && (
                <g transform="translate(0, 8)">
                  <g transform="rotate(0) translate(0, -30)">
                    <use href="#logoArc" stroke="#ef4444" strokeWidth={task1StrokeWidth} />
                  </g>
                  <g transform="rotate(120) translate(0, -30)">
                    <use href="#logoArc" stroke="#10b981" strokeWidth={task1StrokeWidth} />
                  </g>
                  <g transform="rotate(240) translate(0, -30)">
                    <use href="#logoArc" stroke="#3b82f6" strokeWidth={task1StrokeWidth} />
                  </g>
                </g>
              )}
            </svg>

            {/* Slider control for stroke width */}
            <div className="w-full mt-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-300 font-semibold">
                <BilingualText vi="Độ dày viền (Stroke width):" en="Stroke Width thickness:" />
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="6"
                  max="22"
                  value={task1StrokeWidth}
                  onChange={(e) => setTask1StrokeWidth(Number(e.target.value))}
                  className="w-32 accent-teal-400 cursor-pointer"
                />
                <span className="text-xs font-mono text-teal-400 font-bold w-10 text-right">
                  {task1StrokeWidth}px
                </span>
              </div>
            </div>
          </div>

          {/* Step Instructions */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-600 dark:text-teal-400">
                  {bilingualMode === 'en' ? `Step ${task1Step}/5` : `Bước ${task1Step}/5`}
                </span>
                <h4 className="font-bold text-slate-800 dark:text-white">
                  {task1Step === 1 && (
                    <BilingualText
                      vi="a) Vẽ hình tròn hoàn hảo ban đầu"
                      en="a) Draw initial perfect circle"
                    />
                  )}
                  {task1Step === 2 && (
                    <BilingualText
                      vi="b) Mở cung tròn bằng nút công cụ Nodes"
                      en="b) Open the arc using Nodes tool"
                    />
                  )}
                  {task1Step === 3 && (
                    <BilingualText
                      vi="c) Tăng độ dày nét vẽ (Stroke style -> Width)"
                      en="c) Increase outline thickness (Stroke style -> Width)"
                    />
                  )}
                  {task1Step === 4 && (
                    <BilingualText
                      vi="d) Nhân bản và xoay góc 120° (Ctrl+D)"
                      en="d) Duplicate & rotate 120° (Ctrl+D)"
                    />
                  )}
                  {task1Step === 5 && (
                    <BilingualText
                      vi="e) Hoàn thiện 3 cung và phân bổ màu sắc"
                      en="e) Complete 3 interlocking arcs & assign colors"
                    />
                  )}
                </h4>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {task1Step === 1 && (
                  <BilingualText
                    vi="Chọn công cụ Circles and Ellipses (F5). Giữ phím Ctrl trong khi kéo chuột để vẽ một hình tròn cân đối hoàn hảo."
                    en="Select Circles and Ellipses tool (F5). Hold Ctrl while dragging the mouse to create a perfectly proportional circle."
                  />
                )}
                {task1Step === 2 && (
                  <BilingualText
                    vi="Chuyển sang công cụ Edit path by nodes (F2). Nhấp vào nút chế độ Switch to arc (open) trên thanh điều khiển thuộc tính để biến đường cong khép kín thành cung mở."
                    en="Switch to Edit path by nodes (F2). Click the 'Switch to arc (open)' button on the control bar to make the closed circle into an open arc."
                  />
                )}
                {task1Step === 3 && (
                  <BilingualText
                    vi="Mở hộp thoại Objects -> Fill and Stroke (Shift+Ctrl+F). Vào tab Stroke style, điều chỉnh thông số Width dày lên (khoảng 14–16 px), chọn đầu mút tròn (Round cap)."
                    en="Open Object -> Fill and Stroke (Shift+Ctrl+F). In the Stroke style tab, increase Width (approx 14–16 px) and set round cap terminals."
                  />
                )}
                {task1Step === 4 && (
                  <BilingualText
                    vi="Nhấn tổ hợp Ctrl+D để nhân bản cung tròn. Mở hộp thoại Object -> Transform (Shift+Ctrl+M), chọn thẻ Rotate và nhập 120 độ, bấm Apply."
                    en="Press Ctrl+D to duplicate the arc. Open Object -> Transform (Shift+Ctrl+M), select Rotate tab, enter 120 degrees, and click Apply."
                  />
                )}
                {task1Step === 5 && (
                  <BilingualText
                    vi="Nhân bản thêm một lần nữa và xoay tiếp 120 độ. Chọn từng cung tròn và nhấp màu ở dải bảng màu dưới đáy màn hình để đặt 3 màu Đỏ, Xanh lá, Xanh dương như Hình 13.9e!"
                    en="Duplicate once more and rotate another 120 degrees. Click each arc and pick distinct colors from the bottom palette: Red, Green, and Blue as in Figure 13.9e!"
                  />
                )}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                disabled={task1Step === 1}
                onClick={() => setTask1Step((prev) => Math.max(1, prev - 1))}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-40 transition-all text-slate-700 dark:text-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <BilingualText vi="Bước trước" en="Prev Step" />
              </button>

              <button
                disabled={task1Step === 5}
                onClick={() => setTask1Step((prev) => Math.min(5, prev + 1))}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-40 transition-all"
              >
                <BilingualText vi="Bước kế tiếp" en="Next Step" />
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TASK 2: TREE WITH DIFFERENCE & UNION (Figures 13.10 & 13.11)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4 flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center text-lg">
              2
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BilingualText
                  vi="Nhiệm vụ 2: Vẽ hình cây bằng phép Difference và Union (Hình 13.10 & 13.11)"
                  en="Task 2: Draw a Tree Using Difference & Union (Figs 13.10 & 13.11)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="SGK Trang 73: Dùng Difference khoét cong 2 bên thân cây, sau đó dùng Union hợp nhất thân với tán tròn"
                  en="Textbook Page 73: Use Difference to carve curved trunk flanks, then Union to fuse trunk with foliage"
                />
              </p>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700/60 p-1.5 rounded-2xl">
            {[1, 2, 3, 4, 5].map((step) => (
              <button
                key={step}
                onClick={() => setTask2Step(step)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                  task2Step === step
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {bilingualMode === 'en' ? `Step ${step}` : `Bước ${step}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Tree SVG Visualizer */}
          <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 border border-slate-700 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden shadow-inner">
            <div className="absolute top-3 left-4 text-xs font-mono text-slate-400">
              {task2Step === 1 && 'Step 1: 3 Foliage Circles'}
              {task2Step === 2 && 'Step 2: Trunk Rect + 2 Subtraction Circles'}
              {task2Step === 3 && 'Step 3: Path -> Difference (Ctrl + -)'}
              {task2Step === 4 && 'Step 4: Align Foliage & Trunk'}
              {task2Step === 5 && 'Step 5: Path -> Union (Ctrl + +)'}
            </div>

            <svg viewBox="-100 -120 200 240" className="w-64 h-64 select-none drop-shadow-xl">
              {/* Step 1: 3 circles for foliage */}
              {task2Step === 1 && (
                <g fill="#22c55e" opacity="0.85" stroke="#15803d" strokeWidth="2">
                  <circle cx="-30" cy="-20" r="38" />
                  <circle cx="30" cy="-20" r="38" />
                  <circle cx="0" cy="-55" r="42" />
                </g>
              )}

              {/* Step 2: Rectangle and 2 circles overlapping to be subtracted */}
              {task2Step === 2 && (
                <g>
                  {/* Rectangle trunk */}
                  <rect
                    x="-32"
                    y="10"
                    width="64"
                    height="85"
                    fill="#b45309"
                    stroke="#78350f"
                    strokeWidth="2"
                    rx="2"
                  />
                  {/* Two subtraction circles */}
                  <circle
                    cx="-45"
                    cy="45"
                    r="28"
                    fill="#f43f5e"
                    opacity="0.6"
                    stroke="#e11d48"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="45"
                    cy="45"
                    r="28"
                    fill="#f43f5e"
                    opacity="0.6"
                    stroke="#e11d48"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </g>
              )}

              {/* Step 3: Trunk after difference (carved shape) */}
              {task2Step === 3 && (
                <path
                  d="M -32,10 L 32,10 Q 14,45 28,95 L -28,95 Q -14,45 -32,10 Z"
                  fill="#b45309"
                  stroke="#78350f"
                  strokeWidth="2"
                />
              )}

              {/* Step 4: Foliage circles placed on top of trunk */}
              {task2Step === 4 && (
                <g>
                  {/* Trunk */}
                  <path
                    d="M -26,10 L 26,10 Q 14,45 28,95 L -28,95 Q -14,45 -26,10 Z"
                    fill="#b45309"
                    stroke="#78350f"
                    strokeWidth="2"
                  />
                  {/* 3 foliage circles */}
                  <g fill="#22c55e" opacity="0.85" stroke="#15803d" strokeWidth="2">
                    <circle cx="-32" cy="-20" r="38" />
                    <circle cx="32" cy="-20" r="38" />
                    <circle cx="0" cy="-55" r="42" />
                  </g>
                </g>
              )}

              {/* Step 5: Full tree merged with Union */}
              {task2Step === 5 && (
                <g>
                  <path
                    d="M 0,-98 C 24,-98 42,-80 42,-55 C 58,-55 70,-42 70,-22 C 70,-2 56,15 36,18 L 28,95 L -28,95 L -36,18 C -56,15 -70,-2 -70,-22 C -70,-42 -58,-55 -42,-55 C -42,-80 -24,-98 0,-98 Z"
                    fill="#15803d"
                    stroke="#166534"
                    strokeWidth="3"
                  />
                </g>
              )}
            </svg>

            <div className="text-center mt-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-800">
                {task2Step <= 3 ? 'Path -> Difference (Ctrl + -)' : 'Path -> Union (Ctrl + +)'}
              </span>
            </div>
          </div>

          {/* Step Instructions */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  {bilingualMode === 'en' ? `Step ${task2Step}/5` : `Bước ${task2Step}/5`}
                </span>
                <h4 className="font-bold text-slate-800 dark:text-white">
                  {task2Step === 1 && (
                    <BilingualText
                      vi="a) Vẽ 3 hình tròn làm tán cây"
                      en="a) Draw 3 circles for tree canopy"
                    />
                  )}
                  {task2Step === 2 && (
                    <BilingualText
                      vi="b) Xếp hình chữ nhật thân và 2 hình tròn cắt"
                      en="b) Position trunk rectangle and 2 cutter circles"
                    />
                  )}
                  {task2Step === 3 && (
                    <BilingualText
                      vi="c) Dùng Difference khoét lõm thân cây"
                      en="c) Apply Difference to carve trunk waist"
                    />
                  )}
                  {task2Step === 4 && (
                    <BilingualText
                      vi="d) Đặt thân cây khớp với cụm tán tròn"
                      en="d) Position trunk properly below canopy"
                    />
                  )}
                  {task2Step === 5 && (
                    <BilingualText
                      vi="e) Dùng Union hợp nhất thành cây hoàn chỉnh"
                      en="e) Apply Union to fuse into single tree shape"
                    />
                  )}
                </h4>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {task2Step === 1 && (
                  <BilingualText
                    vi="Vẽ 3 hình tròn giao nhau để tạo khung vòm tán lá trên cùng (Hình 13.11a). Bạn có thể gộp tạm chúng bằng Path -> Union."
                    en="Draw 3 overlapping circles to form the upper leafy canopy (Fig 13.11a). You may optionally fuse them with Path -> Union."
                  />
                )}
                {task2Step === 2 && (
                  <BilingualText
                    vi="Vẽ 1 hình chữ nhật làm thân cây. Vẽ thêm 2 hình tròn đè lên 2 cạnh bên của hình chữ nhật tại vị trí muốn tạo eo cong thắt lại (Hình 13.11b)."
                    en="Draw a vertical rectangle for the trunk. Place 2 circles overlapping its left and right edges where you want curved concave notches (Fig 13.11b)."
                  />
                )}
                {task2Step === 3 && (
                  <BilingualText
                    vi="Chọn hình chữ nhật (lớp dưới) và hình tròn bên trái (lớp trên), chọn Path -> Difference (Ctrl + -). Lặp lại với hình tròn bên phải để tạo thân cây thắt eo tự nhiên (Hình 13.11c)."
                    en="Select the rectangle (bottom) and one circle (top), choose Path -> Difference (Ctrl + -). Repeat for the other side to produce a stylish curved trunk (Fig 13.11c)."
                  />
                )}
                {task2Step === 4 && (
                  <BilingualText
                    vi="Di chuyển thân cây đặt chồng một phần lên phần dưới của cụm 3 tán lá tròn sao cho hài hòa và cân đối (Hình 13.11d)."
                    en="Move the carved trunk to slightly overlap the bottom of the 3 canopy circles in a balanced composition (Fig 13.11d)."
                  />
                )}
                {task2Step === 5 && (
                  <BilingualText
                    vi="Dùng công cụ Select (F1) quét chọn toàn bộ cả thân cây và 3 hình tròn tán lá -> Chọn menu Path -> Union (Ctrl + +). Giờ đây cây đã trở thành 1 đối tượng duy nhất, tô màu xanh lá đồng nhất (Hình 13.11e, f)!"
                    en="Use Select tool (F1) to select both trunk and all foliage circles -> Choose Path -> Union (Ctrl + +). The entire tree fuses into a single polygon with solid green fill (Fig 13.11e, f)!"
                  />
                )}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                disabled={task2Step === 1}
                onClick={() => setTask2Step((prev) => Math.max(1, prev - 1))}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-40 transition-all text-slate-700 dark:text-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <BilingualText vi="Bước trước" en="Prev Step" />
              </button>

              <button
                disabled={task2Step === 5}
                onClick={() => setTask2Step((prev) => Math.min(5, prev + 1))}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition-all"
              >
                <BilingualText vi="Bước kế tiếp" en="Next Step" />
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TASK 3: 3D SPHERE WITH RADIAL GRADIENT (Figures 13.12 & 13.13)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4 flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black flex items-center justify-center text-lg">
              3
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BilingualText
                  vi="Nhiệm vụ 3: Vẽ hình cầu 3D với Radial Gradient (Hình 13.12 & 13.13)"
                  en="Task 3: Draw 3D Sphere with Radial Gradient (Figs 13.12 & 13.13)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="SGK Trang 73: Dùng dải màu chuyển sắc toả tròn và kéo lệch tâm sáng tạo hiệu ứng bóng đổ thể tích"
                  en="Textbook Page 73: Use Radial Gradient and offset focal light center to simulate 3D volume"
                />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'].map((col) => (
              <button
                key={col}
                onClick={() => setSphereColor(col)}
                style={{ backgroundColor: col }}
                className={`w-6 h-6 rounded-full transition-all border-2 ${
                  sphereColor === col ? 'scale-125 border-white shadow-md' : 'border-transparent'
                }`}
                title={col}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Sphere Visualizer */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden shadow-2xl">
            <svg viewBox="0 0 200 200" className="w-64 h-64 select-none drop-shadow-2xl">
              <defs>
                {/* Radial Gradient matching Inkscape Figure 13.13 */}
                <radialGradient
                  id="sphereGrad"
                  cx={`${sphereLightX}%`}
                  cy={`${sphereLightY}%`}
                  r="75%"
                  fx={`${sphereLightX}%`}
                  fy={`${sphereLightY}%`}
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="25%" stopColor={sphereColor} stopOpacity="1" />
                  <stop offset="70%" stopColor="#0f172a" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="1" />
                </radialGradient>

                {/* Drop shadow on ground */}
                <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ground contact shadow */}
              <ellipse cx="100" cy="182" rx="65" ry="14" fill="url(#groundShadow)" />

              {/* The 3D Sphere */}
              <circle cx="100" cy="95" r="75" fill="url(#sphereGrad)" />

              {/* Interactive light spot indicator */}
              <circle
                cx={25 + (sphereLightX * 150) / 100}
                cy={20 + (sphereLightY * 150) / 100}
                r="6"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="2 2"
                className="animate-pulse"
              />
            </svg>

            {/* Slider controls for focal point */}
            <div className="w-full mt-4 space-y-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <BilingualText vi="Tâm nguồn sáng X (Focal X):" en="Light Focal Point X:" />
                </span>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={sphereLightX}
                  onChange={(e) => setSphereLightX(Number(e.target.value))}
                  className="w-36 accent-indigo-400 cursor-pointer"
                />
                <span className="font-mono text-indigo-400 w-10 text-right">{sphereLightX}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <BilingualText vi="Tâm nguồn sáng Y (Focal Y):" en="Light Focal Point Y:" />
                </span>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={sphereLightY}
                  onChange={(e) => setSphereLightY(Number(e.target.value))}
                  className="w-36 accent-indigo-400 cursor-pointer"
                />
                <span className="font-mono text-indigo-400 w-10 text-right">{sphereLightY}%</span>
              </div>
            </div>
          </div>

          {/* Practical steps breakdown */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
              <h4 className="font-bold text-indigo-950 dark:text-indigo-200 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <BilingualText
                  vi="Các bước thực hiện trong Inkscape (Hình 13.13):"
                  en="Step-by-step Execution in Inkscape (Fig 13.13):"
                />
              </h4>

              <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </span>
                  <div>
                    <strong>
                      <BilingualText vi="Vẽ hình tròn: " en="Draw circle: " />
                    </strong>
                    <BilingualText
                      vi="Dùng công cụ Circles and Ellipses (F5), giữ Ctrl để vẽ hình tròn hoàn hảo."
                      en="Use Circles and Ellipses tool (F5), hold Ctrl to draw a perfect circle."
                    />
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </span>
                  <div>
                    <strong>
                      <BilingualText vi="Chọn Radial Gradient: " en="Select Radial Gradient: " />
                    </strong>
                    <BilingualText
                      vi="Mở Fill and Stroke (Shift+Ctrl+F) -> Thẻ Fill -> Nhấp biểu tượng Radial Gradient (ô thứ 3)."
                      en="Open Fill and Stroke (Shift+Ctrl+F) -> Fill tab -> Click Radial Gradient icon (3rd button)."
                    />
                  </div>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </span>
                  <div>
                    <strong>
                      <BilingualText vi="Chỉnh tâm sáng: " en="Offset highlight center: " />
                    </strong>
                    <BilingualText
                      vi="Nhấn phím G (công cụ Gradient), kéo điểm tròn tâm sáng lệch lên góc trên bên trái (~góc 10 giờ). Điểm trắng thể hiện điểm phản chiếu ánh sáng (Specular highlight), dải tối tạo độ sâu khối cầu 3D."
                      en="Press G (Gradient tool), drag the circular focal point towards the top-left (~10 o'clock). The bright spot represents specular highlight, while darker perimeter stops create convincing 3D volume."
                    />
                  </div>
                </li>
              </ol>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span>
                <BilingualText
                  vi="Mẹo đồ họa: Đặt thêm một hình elip dẹt mờ màu đen dưới đáy hình cầu để làm bóng đổ tiếp xúc mặt đất (Ground contact shadow)."
                  en="Pro Tip: Place a flat semi-transparent black ellipse under the sphere to serve as a realistic ground contact shadow."
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={13} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={prevPage}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            <BilingualText
              vi="Mục 3: Các phép ghép đối tượng"
              en="Section 3: Boolean Operations"
            />
          </span>
        </button>

        <button
          onClick={nextPage}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-semibold transition-all shadow-md"
        >
          <span>
            <BilingualText
              vi="Mục 5: Luyện tập & Vận dụng"
              en="Section 5: Practice & Apply"
            />
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
