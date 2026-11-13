import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Shapes,
  Square,
  Circle,
  Star,
  Sliders,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Check
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section13PrimitiveShapes: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Selected tool tab in sandbox
  const [activeShape, setActiveShape] = useState<'rect' | 'circle' | 'star'>('star');

  // Rect parameters
  const [rectW, setRectW] = useState<number>(140);
  const [rectH, setRectH] = useState<number>(100);
  const [rectRx, setRectRx] = useState<number>(15);

  // Circle/Arc parameters
  const [circleRx, setCircleRx] = useState<number>(65);
  const [circleRy, setCircleRy] = useState<number>(65);
  const [arcStart, setArcStart] = useState<number>(0);
  const [arcEnd, setArcEnd] = useState<number>(270);
  const [arcType, setArcType] = useState<'slice' | 'chord' | 'arc'>('slice');

  // Star parameters
  const [starCorners, setStarCorners] = useState<number>(5);
  const [starSpokeRatio, setStarSpokeRatio] = useState<number>(0.4);
  const [starRounded, setStarRounded] = useState<number>(0.15);
  const [starRandomized, setStarRandomized] = useState<number>(0);

  // Concept check state (p. 70)
  const [conceptCheckAnswer, setConceptCheckAnswer] = useState<string | null>(null);
  const [conceptCheckSubmitted, setConceptCheckSubmitted] = useState<boolean>(false);

  const sectionSpeechVi =
    'Mục 1: Các đối tượng hình khối, SGK Trang 69 và 70. Inkscape cung cấp sẵn các đối tượng định nghĩa sẵn trong Hộp công cụ như hình chữ nhật, hình vuông, hình tròn, elip, vòng cung, ngôi sao, đa giác. Ta có thể tùy chỉnh các thuộc tính cơ bản trên thanh điều khiển thuộc tính: Chiều dài rộng W, H và bán kính bo góc Rx, Ry cho hình chữ nhật; Bán kính Rx, Ry và góc Start, End cho cung tròn; và số cánh Corners, tỉ lệ nan hoa Spoke ratio, độ cong đỉnh Rounded, độ méo Randomized cho hình sao và đa giác. Hộp Ghi nhớ 1: Ta có thể thay đổi thuộc tính của mỗi đối tượng được tạo từ công cụ có sẵn trên hình vẽ.';
  const sectionSpeechEn =
    'Section 1: Geometric Primitive Shapes, Textbook pages 69 and 70. Inkscape hosts parameterized primitives: rectangles, squares, circles, ellipses, arcs, stars, and polygons. Users can customize properties on the Tool Control Bar: dimensions W, H and corner radii Rx, Ry for rectangles; radii Rx, Ry and sector angles Start, End for arcs; and Corners, Spoke ratio, Rounded curvature, and Randomized deformation for stars and polygons. Summary Box 1: Users can modify the properties of each object generated from built-in drawing tools.';

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

  // Generate SVG Star Path with Rounded Curvature
  const renderStarPath = () => {
    const cx = 110;
    const cy = 110;
    const outerR = 80;
    const innerR = 80 * starSpokeRatio;
    const n = Math.max(3, starCorners);
    const totalPts = n * 2;
    const points: { x: number; y: number }[] = [];

    for (let i = 0; i < totalPts; i++) {
      const angle = (i * Math.PI) / n - Math.PI / 2;
      const r = i % 2 === 0 ? outerR : innerR;
      // Add slight randomized wobble if requested
      const wobble = starRandomized * (Math.sin(i * 3.7) * 12);
      points.push({
        x: cx + Math.cos(angle) * (r + wobble),
        y: cy + Math.sin(angle) * (r + wobble)
      });
    }

    if (starRounded > 0.02) {
      let d = `M ${points[0].x} ${points[0].y} `;
      for (let i = 0; i < totalPts; i++) {
        const curr = points[i];
        const next = points[(i + 1) % totalPts];
        const midX = (curr.x + next.x) * 0.5;
        const midY = (curr.y + next.y) * 0.5;
        const cpX = midX * (1 - starRounded * 0.5) + cx * (starRounded * 0.5);
        const cpY = midY * (1 - starRounded * 0.5) + cy * (starRounded * 0.5);
        d += `Q ${cpX} ${cpY} ${next.x} ${next.y} `;
      }
      return d;
    } else {
      return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    }
  };

  // Generate Arc Path
  const renderArcPath = () => {
    const cx = 110;
    const cy = 110;
    const startRad = ((arcStart - 90) * Math.PI) / 180;
    const endRad = ((arcEnd - 90) * Math.PI) / 180;
    const x1 = cx + circleRx * Math.cos(startRad);
    const y1 = cy + circleRy * Math.sin(startRad);
    const x2 = cx + circleRx * Math.cos(endRad);
    const y2 = cy + circleRy * Math.sin(endRad);
    const diff = (arcEnd - arcStart + 360) % 360;
    const largeArc = diff > 180 ? 1 : 0;

    if (diff === 0 || diff >= 360) {
      return `M ${cx - circleRx} ${cy} A ${circleRx} ${circleRy} 0 1 0 ${cx + circleRx} ${cy} A ${circleRx} ${circleRy} 0 1 0 ${cx - circleRx} ${cy}`;
    }

    if (arcType === 'slice') {
      return `M ${cx} ${cy} L ${x1} ${y1} A ${circleRx} ${circleRy} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    } else if (arcType === 'chord') {
      return `M ${x1} ${y1} A ${circleRx} ${circleRy} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    } else {
      return `M ${x1} ${y1} A ${circleRx} ${circleRy} 0 ${largeArc} 1 ${x2} ${y2}`;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-semibold backdrop-blur-sm mb-3">
              <Shapes className="w-3.5 h-3.5" />
              <span>
                <BilingualText vi="Mục 1 • Trang 69 – 70 SGK" en="Section 1 • Textbook pp. 69 – 70" />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="1. CÁC ĐỐI TƯỢNG HÌNH KHỐI VÀ THAM SỐ ĐIỀU KHIỂN"
                en="1. GEOMETRIC PRIMITIVE OBJECTS & PARAMETER CONTROLS"
              />
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Khám phá bảng thuộc tính W, H, Rx, Ry, Start, End, Corners, Rounded, Spoke ratio của hình chữ nhật, hình tròn và hình sao."
                en="Explore property tables for W, H, Rx, Ry, Start, End, Corners, Rounded, and Spoke ratio across rectangles, circles, and stars."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Activity 1 Presentation: 4 Stars from 1 tool (Hình 13.2 SGK Trang 69) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
              HĐ1
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              <BilingualText
                vi="Hoạt động 1: Khám phá các biến thể hình học từ một công cụ (Hình 13.2)"
                en="Activity 1: Exploring Shape Variations from a Single Tool (Figure 13.2)"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Công cụ Stars & Polygons (*)</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
          <BilingualText
            vi="« Các hình sau được vẽ từ một công cụ có sẵn của Inkscape. Theo em đó là công cụ nào? Thảo luận để tìm cách vẽ được các hình đó. »"
            en="« The following figures are generated using a single built-in Inkscape tool. Which tool is it? Discuss how each variation is achieved. »"
          />
        </p>

        {/* 4 Shapes Gallery mirroring Hình 13.2 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {/* Shape 1: Standard 5-point Star */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2">
            <svg width="70" height="70" viewBox="0 0 100 100">
              <polygon
                points="50,5 64,36 98,36 70,57 81,90 50,70 19,90 30,57 2,36 36,36"
                fill="#ef4444"
              />
            </svg>
            <div className="text-center">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                <BilingualText vi="1. Ngôi sao nhọn" en="1. Sharp Star" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Corners: 5 • Rounded: 0</div>
            </div>
          </div>

          {/* Shape 2: Regular Pentagon */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2">
            <svg width="70" height="70" viewBox="0 0 100 100">
              <polygon points="50,8 95,41 78,92 22,92 5,41" fill="#ef4444" />
            </svg>
            <div className="text-center">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                <BilingualText vi="2. Ngũ giác đều" en="2. Regular Pentagon" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                <BilingualText vi="Chế độ Polygon • Corners: 5" en="Polygon Mode • Corners: 5" />
              </div>
            </div>
          </div>

          {/* Shape 3: Soft Curved Star */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2">
            <svg width="70" height="70" viewBox="0 0 100 100">
              <path
                d="M 50 10 Q 56 34 85 38 Q 63 56 72 88 Q 50 72 28 88 Q 37 56 15 38 Q 44 34 50 10 Z"
                fill="#ef4444"
              />
            </svg>
            <div className="text-center">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                <BilingualText vi="3. Sao cánh cong" en="3. Curved Petal Star" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Rounded: 0.15 • Spoke: 0.4</div>
            </div>
          </div>

          {/* Shape 4: Blobby Flower Star */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2">
            <svg width="70" height="70" viewBox="0 0 100 100">
              <path
                d="M 50 18 C 65 18 68 45 88 45 C 72 65 78 88 50 78 C 22 88 28 65 12 45 C 32 45 35 18 50 18 Z"
                fill="#ef4444"
              />
            </svg>
            <div className="text-center">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                <BilingualText vi="4. Sao cánh giọt nước" en="4. Teardrop Petal Star" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Rounded: 0.45 • Spoke: 0.48</div>
            </div>
          </div>
        </div>
      </div>

      {/* Official Property Comparison Table (SGK Trang 69 – 70) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
            <BilingualText
              vi="BẢNG CÁC THUỘC TÍNH CƠ BẢN CỦA MỘT SỐ HÌNH CÓ SẴN (SGK TRANG 69 – 70)"
              en="BASIC PARAMETERS TABLE OF PREDEFINED SHAPES (TEXTBOOK PP. 69 – 70)"
            />
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-amber-100/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 border-b border-amber-200 dark:border-amber-900">
                <th className="p-3 font-bold">
                  <BilingualText vi="Đối tượng" en="Shape" />
                </th>
                <th className="p-3 font-bold font-mono">
                  <BilingualText vi="Thuộc tính" en="Property" />
                </th>
                <th className="p-3 font-bold">
                  <BilingualText vi="Ý nghĩa & Tác dụng điều khiển" en="Meaning & Visual Effect" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-750">
                <td className="p-3 font-semibold text-slate-900 dark:text-white" rowSpan={2}>
                  <BilingualText vi="Hình vuông, hình chữ nhật (F4)" en="Rectangle & Square (F4)" />
                </td>
                <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">W, H</td>
                <td className="p-3">
                  <BilingualText
                    vi="Chiều rộng (Width) và chiều dài/cao (Height) của hình."
                    en="Width and Height of the rectangular object."
                  />
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-750">
                <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">Rx, Ry</td>
                <td className="p-3">
                  <BilingualText
                    vi="Bán kính của góc bo (nếu bằng 0 là góc vuông sắc cạnh; tăng dần sẽ bo tròn góc)."
                    en="Corner radius (0 yields sharp 90° corners; higher values round the corners)."
                  />
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-750">
                <td className="p-3 font-semibold text-slate-900 dark:text-white" rowSpan={2}>
                  <BilingualText vi="Hình tròn, hình elip (F5)" en="Circle & Ellipse (F5)" />
                </td>
                <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">Rx, Ry</td>
                <td className="p-3">
                  <BilingualText
                    vi="Bán kính theo phương ngang (Rx) và phương thẳng đứng (Ry)."
                    en="Horizontal radius (Rx) and vertical radius (Ry)."
                  />
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-750">
                <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">Start, End</td>
                <td className="p-3">
                  <BilingualText
                    vi="Góc của điểm đầu và điểm cuối khi sử dụng chế độ vẽ hình quạt hoặc cung mở (đơn vị: độ)."
                    en="Angles of starting and ending points when creating pie slices or open arcs (in degrees)."
                  />
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-750">
                <td className="p-3 font-semibold text-slate-900 dark:text-white" rowSpan={4}>
                  <BilingualText vi="Hình đa giác, hình sao (*)" en="Stars & Polygons (*)" />
                </td>
                <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">Corners</td>
                <td className="p-3">
                  <BilingualText
                    vi="Số đỉnh của đa giác hoặc số cánh của hình sao."
                    en="Number of polygon vertices or star points."
                  />
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-750">
                <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">Rounded</td>
                <td className="p-3">
                  <BilingualText
                    vi="Độ cong tại các đỉnh của hình (giúp biến đổi ngôi sao nhọn thành cánh hoa tròn)."
                    en="Curvature at vertices (transforms sharp star points into rounded flower petals)."
                  />
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-750">
                <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">Spoke ratio</td>
                <td className="p-3">
                  <BilingualText
                    vi="Tỉ lệ bán kính từ tâm đến góc trong và từ tâm tới đỉnh đầu hình sao (mặc định ~0.4)."
                    en="Ratio between inner base radius and outer vertex radius (default ~0.4)."
                  />
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-750">
                <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">Randomized</td>
                <td className="p-3">
                  <BilingualText
                    vi="Tham số làm méo mó hình ngẫu nhiên để tạo các hình dạng sinh động."
                    en="Randomization parameter for organic, asymmetrical variations."
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive 2D Parameter Sandbox Studio */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Sliders className="w-6 h-6 text-emerald-400" />
            <div>
              <h3 className="font-extrabold text-lg text-white">
                <BilingualText
                  vi="HỘP THỬ NGHIỆM THAM SỐ HÌNH HỌC TƯƠNG TÁC (INKSCAPE SANDBOX)"
                  en="INTERACTIVE INKSCAPE PARAMETRIC SHAPE SANDBOX"
                />
              </h3>
              <p className="text-xs text-slate-400">
                Kéo thanh trượt để quan sát phản hồi hình dạng theo đúng nguyên lý toán học Inkscape
              </p>
            </div>
          </div>

          {/* Shape Selector Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveShape('star')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeShape === 'star' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              <span>Sao / Đa giác (*)</span>
            </button>
            <button
              onClick={() => setActiveShape('rect')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeShape === 'rect' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Chữ nhật (F4)</span>
            </button>
            <button
              onClick={() => setActiveShape('circle')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeShape === 'circle' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Circle className="w-3.5 h-3.5" />
              <span>Tròn / Cung (F5)</span>
            </button>
          </div>
        </div>

        {/* Sandbox Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Live SVG Screen */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-lg">
              {/* Canvas Guide Box */}
              <rect
                x="5"
                y="5"
                width="210"
                height="210"
                fill="#0f172a"
                stroke="#334155"
                strokeDasharray="4 4"
                rx="12"
              />

              {activeShape === 'star' && (
                <path
                  d={renderStarPath()}
                  fill="#ef4444"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  className="transition-all duration-150"
                />
              )}

              {activeShape === 'rect' && (
                <rect
                  x={110 - rectW / 2}
                  y={110 - rectH / 2}
                  width={rectW}
                  height={rectH}
                  rx={rectRx}
                  ry={rectRx}
                  fill="#3b82f6"
                  stroke="#60a5fa"
                  strokeWidth="3"
                  className="transition-all duration-150"
                />
              )}

              {activeShape === 'circle' && (
                <path
                  d={renderArcPath()}
                  fill="#10b981"
                  stroke="#34d399"
                  strokeWidth="3"
                  className="transition-all duration-150"
                />
              )}
            </svg>
            <div className="mt-3 text-[11px] font-mono text-slate-400">
              {activeShape === 'star' && `Corners: ${starCorners} | Spoke: ${starSpokeRatio.toFixed(2)} | Rounded: ${starRounded.toFixed(2)}`}
              {activeShape === 'rect' && `W: ${rectW}px | H: ${rectH}px | Rx, Ry: ${rectRx}px`}
              {activeShape === 'circle' && `Start: ${arcStart}° | End: ${arcEnd}° | Mode: ${arcType}`}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="space-y-4">
            {activeShape === 'star' && (
              <>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">Corners (Số cánh / Số đỉnh):</span>
                    <span className="font-mono text-rose-400 font-bold">{starCorners}</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="14"
                    step="1"
                    value={starCorners}
                    onChange={(e) => setStarCorners(parseInt(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">Spoke ratio (Tỉ lệ bán kính trong / ngoài):</span>
                    <span className="font-mono text-rose-400 font-bold">{starSpokeRatio.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.15"
                    max="0.85"
                    step="0.05"
                    value={starSpokeRatio}
                    onChange={(e) => setStarSpokeRatio(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 text-xs bg-rose-950/40 p-3 rounded-xl border border-rose-800/40">
                  <div className="flex justify-between text-rose-200">
                    <span className="font-bold">Rounded (Độ cong bo tròn cánh hoa):</span>
                    <span className="font-mono text-rose-300 font-black">{starRounded.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="0.6"
                    step="0.02"
                    value={starRounded}
                    onChange={(e) => setStarRounded(parseFloat(e.target.value))}
                    className="w-full accent-rose-400 cursor-pointer"
                  />
                  <p className="text-[10px] text-rose-300/80 italic">
                    <BilingualText
                      vi="Tăng giá trị để biến ngôi sao nhọn thành hoa cúc nhiều cánh mềm mại (Luyện tập 1)."
                      en="Increase to transform sharp star into soft daisy petals (Practice 1)."
                    />
                  </p>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">
                      <BilingualText vi="Randomized (Độ méo ngẫu nhiên):" en="Randomized (Random distortion):" />
                    </span>
                    <span className="font-mono text-rose-400 font-bold">{starRandomized.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={starRandomized}
                    onChange={(e) => setStarRandomized(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              </>
            )}

            {activeShape === 'rect' && (
              <>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">
                      <BilingualText vi="W (Chiều rộng - Width):" en="W (Width):" />
                    </span>
                    <span className="font-mono text-blue-400 font-bold">{rectW} px</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="180"
                    step="5"
                    value={rectW}
                    onChange={(e) => setRectW(parseInt(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">
                      <BilingualText vi="H (Chiều cao - Height):" en="H (Height):" />
                    </span>
                    <span className="font-mono text-blue-400 font-bold">{rectH} px</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    step="5"
                    value={rectH}
                    onChange={(e) => setRectH(parseInt(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 text-xs bg-blue-950/40 p-3 rounded-xl border border-blue-800/40">
                  <div className="flex justify-between text-blue-200">
                    <span className="font-bold">
                      <BilingualText vi="Rx, Ry (Bán kính bo góc):" en="Rx, Ry (Corner radius):" />
                    </span>
                    <span className="font-mono text-blue-300 font-black">{rectRx} px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="2"
                    value={rectRx}
                    onChange={(e) => setRectRx(parseInt(e.target.value))}
                    className="w-full accent-blue-400 cursor-pointer"
                  />
                  <p className="text-[10px] text-blue-300/80 italic">
                    <BilingualText
                      vi="Rx, Ry = 0 là góc vuông. Tăng lên giúp bo tròn thẻ card, nút bấm giao diện."
                      en="Rx, Ry = 0 yields square corners. Increase to round card containers and UI buttons."
                    />
                  </p>
                </div>
              </>
            )}

            {activeShape === 'circle' && (
              <>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">
                      <BilingualText vi="Start (Góc bắt đầu):" en="Start Angle:" />
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{arcStart}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={arcStart}
                    onChange={(e) => setArcStart(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">
                      <BilingualText vi="End (Góc kết thúc):" en="End Angle:" />
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{arcEnd}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={arcEnd}
                    onChange={(e) => setArcEnd(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  {[
                    { id: 'slice', vi: 'Hình quạt khép kín (Slice)', en: 'Closed Pie Slice' },
                    { id: 'chord', vi: 'Dây cung (Chord)', en: 'Chord' },
                    { id: 'arc', vi: 'Cung mở (Open Arc)', en: 'Open Arc' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setArcType(mode.id as any)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        arcType === mode.id
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {bilingualMode === 'en' ? mode.en : mode.vi}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Summary Box 1 (Hộp Ghi nhớ 1 Trang 70) */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-5 rounded-r-2xl space-y-2">
        <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
          <BookOpen className="w-4 h-4" />
          <BilingualText vi="HỘP GHI NHỚ 1 (SGK TRANG 70)" en="SUMMARY BOX 1 (PAGE 70)" />
        </div>
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          <BilingualText
            vi="« Ta có thể thay đổi thuộc tính của mỗi đối tượng được tạo từ công cụ có sẵn trên hình vẽ. »"
            en="« Users can adjust the intrinsic properties of any object generated from built-in shape tools. »"
          />
        </p>
      </div>

      {/* In-Lesson Concept Check (SGK Trang 70) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <HelpCircle className="w-5 h-5" />
          <h3 className="font-bold text-base sm:text-lg">
            <BilingualText
              vi="CÂU HỎI CỦNG CỐ MỤC 1 (SGK TRANG 70)"
              en="SECTION 1 CONCEPT CHECK (TEXTBOOK PAGE 70)"
            />
          </h3>
        </div>

        <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
          <BilingualText
            vi="Nếu trên hình vẽ có sẵn một hình sao 5 cánh nhọn, em cần thay đổi tham số nào để các đỉnh ngôi sao trở nên cong?"
            en="If a drawing already has a sharp 5-pointed star, which parameter must you alter to curve its vertices?"
          />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'Corners', labelVi: 'A. Corners (Số đỉnh)', labelEn: 'A. Corners (Number of points)' },
            { id: 'Spoke ratio', labelVi: 'B. Spoke ratio (Tỉ lệ nan hoa)', labelEn: 'B. Spoke ratio' },
            { id: 'Rounded', labelVi: 'C. Rounded (Độ cong đỉnh)', labelEn: 'C. Rounded (Vertex curvature)' },
            { id: 'Randomized', labelVi: 'D. Randomized (Độ méo ngẫu nhiên)', labelEn: 'D. Randomized' }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setConceptCheckAnswer(opt.id);
                setConceptCheckSubmitted(true);
              }}
              className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                conceptCheckAnswer === opt.id
                  ? opt.id === 'Rounded'
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold'
                    : 'bg-rose-500 text-white border-rose-600 shadow-md font-bold'
                  : 'bg-slate-50 dark:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>
                <BilingualText vi={opt.labelVi} en={opt.labelEn} />
              </span>
              {conceptCheckSubmitted && opt.id === 'Rounded' && (
                <Check className="w-4 h-4 text-white" />
              )}
            </button>
          ))}
        </div>

        {conceptCheckSubmitted && conceptCheckAnswer === 'Rounded' && (
          <div className="p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <BilingualText
                vi="Giải thích chuẩn SGK: Đáp án đúng là Rounded."
                en="Textbook Explanation: The correct answer is Rounded."
              />
            </div>
            <p>
              <BilingualText
                vi="Thuộc tính Rounded điều khiển bán kính uốn cong tại các đỉnh của đa giác và hình sao. Khi tăng giá trị Rounded lên trên 0, các đỉnh nhọn sẽ được bo tròn mềm mại thành hình cánh hoa."
                en="The Rounded property controls the curvature radius at vertices. Increasing Rounded above 0 curves sharp tips into soft flower petals."
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
            <BilingualText vi="Quay lại: Giới thiệu & Khởi động" en="Back: Overview & Warm-up" />
          </span>
        </button>

        <button
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <span>
            <BilingualText vi="Tiếp tục: 2. Thiết lập màu tô và màu vẽ" en="Next: 2. Fill and Stroke Styling" />
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pedagogical Prompts for Teachers */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={13} />
    </div>
  );
};
