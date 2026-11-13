import React, { useState } from 'react';
import {
  PenTool,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shapes,
  Maximize2,
  Compass,
  Sliders,
  HelpCircle,
  Eye,
  Sparkles
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section14PathBasics: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Interactive 2D Bézier Curve Sandbox state
  const [p1x, setP1x] = useState<number>(100);
  const [p1y, setP1y] = useState<number>(60);
  const [p2x, setP2x] = useState<number>(260);
  const [p2y, setP2y] = useState<number>(200);

  // Checkpoint question toggle
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const sectionSpeechVi =
    'Mục 1: Làm quen với đối tượng dạng đường - Trang 75 và 76 SGK Tin học 10. Hình khối là đối tượng được định nghĩa sẵn trong Inkscape và xác định bởi các tính chất toán học chặt chẽ. Đối tượng tự do dạng đường do người dùng tạo ra, là tổ hợp của một hay nhiều đoạn cong hoặc thẳng nối lại với nhau. Khi điều chỉnh hình khối ta thu được hình khối mới với đặc trưng không đổi, trong khi đó với đối tượng tự do dạng đường có thể điều chỉnh các đoạn độc lập với nhau. Mỗi đoạn cong được biểu diễn bởi 4 điểm: 2 điểm đầu mút và 2 điểm điều khiển. Các bước vẽ đối tượng đường bằng công cụ Pen: Bước 1: Chọn công cụ Pen trên hộp công cụ; Bước 2: Chọn kiểu đường cong; Bước 3: Nháy chuột để đặt các điểm neo; Bước 4: Nhấn Enter hoặc nháy đúp chuột tại vị trí neo cuối cùng.';
  const sectionSpeechEn =
    'Section 1: Getting Familiar with Path Objects - Pages 75 and 76 of Informatics 10 Textbook. Predefined shapes are governed by strict mathematical invariants. In contrast, freeform path objects are user-generated combinations of straight or curved segments joined together at anchor nodes. Modifying a primitive preserves its core geometric identity, whereas modifying a path allows independent customization of each segment. A single cubic curve segment is defined by 4 points: two endpoints and two tangent handles. Steps to draw with Pen tool: Step 1: Select Pen tool; Step 2: Choose curve mode; Step 3: Click to place anchor nodes; Step 4: Press Enter or double-click at final node.';

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
      <div className="bg-gradient-to-r from-cyan-700 via-teal-800 to-blue-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <PenTool className="w-8 h-8 text-cyan-300" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-cyan-500/30 border border-cyan-300/40 rounded-full text-xs font-semibold text-cyan-200 uppercase tracking-wider mb-1">
                <BilingualText
                  vi="Phần 1 • Trang 75 – 76 SGK"
                  en="Section 1 • Pages 75 – 76 Textbook"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <BilingualText
                  vi="1. Làm quen với đối tượng dạng đường"
                  en="1. Introduction to Path Objects"
                />
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Activity 1: Comparing Two Rectangles (Figures 14.1 & 14.2) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-black flex items-center justify-center text-lg">
              HĐ1
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                <BilingualText
                  vi="Hoạt động 1: So sánh hai hình chữ nhật (Hình 14.1 & 14.2)"
                  en="Activity 1: Comparing Two Rectangles (Figures 14.1 & 14.2)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Quan sát hai hình chữ nhật ở Hình 14.1 và tìm ra điểm khác nhau giữa hai hình"
                  en="Examine the two rectangles in Figure 14.1 and identify the structural differences"
                />
              </p>
            </div>
          </div>
        </div>

        {/* Visual Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card A: Shape Primitive */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-dashed border-cyan-300 dark:border-cyan-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-900 dark:text-cyan-300 text-sm">
                  Hình 14.1a: Đối tượng hình khối (Shape Primitive)
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-mono">
                  Rectangles (F4)
                </span>
              </div>

              {/* SVG Graphic */}
              <div className="h-40 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center relative p-4">
                <svg viewBox="0 0 160 100" className="w-44 h-28 select-none">
                  {/* Dashed selection bbox */}
                  <rect
                    x="20"
                    y="15"
                    width="120"
                    height="70"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  {/* Square sizing handles */}
                  <rect x="16" y="11" width="8" height="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                  <rect x="136" y="11" width="8" height="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                  <rect x="16" y="81" width="8" height="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                  {/* Circular corner rounding handle */}
                  <circle cx="140" cy="20" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Center X mark */}
                  <path d="M 76,46 L 84,54 M 84,46 L 76,54" stroke="#0284c7" strokeWidth="1.5" />
                </svg>
              </div>

              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                <li>Được định nghĩa sẵn bởi các tham số toán học cố định ($W, H, Rx, Ry$).</li>
                <li>Chỉ có thể thay đổi chiều rộng, chiều cao hoặc bán kính bo tròn đồng thời ở các góc.</li>
                <li>Không thể kéo lệch một góc riêng lẻ ra khỏi hình dạng hình học chữ nhật.</li>
              </ul>
            </div>
          </div>

          {/* Card B: Freeform Path Object */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-dashed border-indigo-300 dark:border-indigo-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">
                  Hình 14.1b: Đối tượng dạng đường (Path Object)
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono">
                  Path / Nodes (F2)
                </span>
              </div>

              {/* SVG Graphic */}
              <div className="h-40 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center relative p-4">
                <svg viewBox="0 0 160 100" className="w-44 h-28 select-none">
                  {/* Waved/Curved path */}
                  <path
                    d="M 25,20 Q 80,5 135,20 L 135,80 Q 80,95 25,80 Z"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="2"
                  />
                  {/* Node points */}
                  <rect x="21" y="16" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="131" y="16" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="131" y="76" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="21" y="76" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Center X mark */}
                  <path d="M 76,46 L 84,54 M 84,46 L 76,54" stroke="#6366f1" strokeWidth="1.5" />
                </svg>
              </div>

              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                <li>Được tạo thành từ tổ hợp các đoạn thẳng hoặc đoạn cong nối nhau qua điểm neo.</li>
                <li>Có thể tự do dịch chuyển từng điểm neo hoặc kéo cần điều khiển để uốn cong từng cạnh.</li>
                <li>Dễ dàng biến hình chữ nhật ban đầu thành hình chiếc lá, sóng lượn hoặc bất kỳ hình dạng nào (Hình 14.2c, d).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Anatomy of a Bézier Curve Segment (Figure 14.3) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-700/80 pb-4">
          <span className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center text-lg">
            §
          </span>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              <BilingualText
                vi="Cấu trúc một đoạn cong Bézier: Điểm mút & Điểm điều khiển (Hình 14.3)"
                en="Anatomy of a Bézier Segment: Endpoints & Tangent Handles (Figure 14.3)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SGK Trang 75: Mỗi đoạn cong được biểu diễn bởi 4 điểm: 2 điểm đầu mút và 2 điểm điều khiển
            </p>
          </div>
        </div>

        {/* Interactive 2D Bézier Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[320px] relative shadow-inner">
            <div className="absolute top-3 left-4 text-xs font-mono text-cyan-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Interactive 2D Bézier Math Viewport</span>
            </div>

            <svg viewBox="0 0 360 240" className="w-full max-w-md h-56 select-none drop-shadow-xl">
              {/* Tangent Rods */}
              <line x1="40" y1="180" x2={p1x} y2={p1y} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
              <line x1="320" y1="180" x2={p2x} y2={p2y} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />

              {/* The Cubic Bézier Path */}
              <path
                d={`M 40,180 C ${p1x},${p1y} ${p2x},${p2y} 320,180`}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Endpoint P0 */}
              <circle cx="40" cy="180" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="30" y="205" fill="#10b981" fontSize="11" fontWeight="bold">
                {bilingualMode === 'en' ? 'P0 (End)' : 'P0 (Mút)'}
              </text>

              {/* Endpoint P3 */}
              <circle cx="320" cy="180" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text x="310" y="205" fill="#10b981" fontSize="11" fontWeight="bold">
                {bilingualMode === 'en' ? 'P3 (End)' : 'P3 (Mút)'}
              </text>

              {/* Direction Handle P1 */}
              <circle cx={p1x} cy={p1y} r="8" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" className="cursor-pointer" />
              <text x={p1x - 20} y={p1y - 12} fill="#f59e0b" fontSize="11" fontWeight="bold">
                {bilingualMode === 'en' ? 'P1 (Handle 1)' : 'P1 (Cần 1)'}
              </text>

              {/* Direction Handle P2 */}
              <circle cx={p2x} cy={p2y} r="8" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" className="cursor-pointer" />
              <text x={p2x - 20} y={p2y - 12} fill="#f43f5e" fontSize="11" fontWeight="bold">
                {bilingualMode === 'en' ? 'P2 (Handle 2)' : 'P2 (Cần 2)'}
              </text>
            </svg>

            {/* Slider Controls */}
            <div className="w-full mt-3 grid grid-cols-2 gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>
                    <BilingualText vi="Cần 1 (P1 Y - Độ nhô):" en="Handle 1 (P1 Y - Ridge):" />
                  </span>
                  <span className="font-mono text-amber-400">{p1y}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="180"
                  value={p1y}
                  onChange={(e) => setP1y(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>
                    <BilingualText vi="Cần 2 (P2 Y - Độ trũng):" en="Handle 2 (P2 Y - Sag):" />
                  </span>
                  <span className="font-mono text-rose-400">{p2y}px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="220"
                  value={p2y}
                  onChange={(e) => setP2y(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Theoretical Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 space-y-3">
              <h4 className="font-bold text-cyan-950 dark:text-cyan-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <BilingualText
                  vi="Quy luật đường cong tiếp tuyến:"
                  en="Tangent Vector Mechanics:"
                />
              </h4>

              <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-decimal pl-4">
                <li>
                  <strong>
                    <BilingualText vi="Điểm đầu mút (Endpoints): " en="Endpoints: " />
                  </strong>
                  <BilingualText
                    vi="Là 2 điểm cố định nằm trên chính đường cong, xác định nơi bắt đầu và kết thúc của đoạn."
                    en="Two fixed anchor points lying on the curve itself, defining segment start and end."
                  />
                </li>
                <li>
                  <strong>
                    <BilingualText vi="Điểm điều khiển / Điểm chỉ hướng (Handles): " en="Direction Handles: " />
                  </strong>
                  <BilingualText
                    vi="Không nằm trên đường cong, mà đóng vai trò như một lực kéo uốn cong đường nét theo hướng tiếp tuyến."
                    en="Not on the curve itself, acting like directional vectors bending the curve tangentially."
                  />
                </li>
                <li>
                  <strong>
                    <BilingualText vi="Độ dài đường chỉ hướng: " en="Handle Length: " />
                  </strong>
                  <BilingualText
                    vi="Càng kéo điểm chỉ hướng ra xa điểm đầu mút, đường cong càng phình rộng và căng tròn hơn tại vị trí đó!"
                    en="The farther the handle is pulled from the anchor, the wider and fuller the curve bulges at that point!"
                  />
                </li>
              </ol>
            </div>

            {/* 4 Steps to Draw Path with Pen tool (Page 76) */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">
                <BilingualText
                  vi="4 Bước vẽ đường bằng công cụ Pen (Shift+F6):"
                  en="4 Steps to Draw with Pen Tool (Shift+F6):"
                />
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1 list-disc pl-4">
                <li>
                  <strong><BilingualText vi="Bước 1: " en="Step 1: " /></strong>
                  <BilingualText vi="Chọn công cụ Pen trên hộp công cụ." en="Select the Pen tool in the toolbox." />
                </li>
                <li>
                  <strong><BilingualText vi="Bước 2: " en="Step 2: " /></strong>
                  <BilingualText vi="Chọn kiểu đường cong trên thanh điều khiển thuộc tính." en="Choose curve mode on the Tool Controls bar." />
                </li>
                <li>
                  <strong><BilingualText vi="Bước 3: " en="Step 3: " /></strong>
                  <BilingualText vi="Nháy chuột để đặt các điểm neo trên hình vẽ (kéo thả để tạo cần điều khiển)." en="Click to place anchor nodes on canvas (drag to create handles)." />
                </li>
                <li>
                  <strong><BilingualText vi="Bước 4: " en="Step 4: " /></strong>
                  <BilingualText vi="Kết thúc đường bằng cách nhấn phím Enter hoặc nháy đúp chuột tại vị trí neo cuối cùng." en="Finish path by pressing Enter or double-clicking the final anchor node." />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Box 1 (Page 76) */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-dashed border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 shadow-sm flex items-start gap-3">
        <span className="p-2 bg-amber-200 dark:bg-amber-900 rounded-xl text-amber-900 dark:text-amber-200 shrink-0 font-bold text-xs uppercase">
          {bilingualMode === 'en' ? 'Summary 1' : 'Ghi nhớ 1'}
        </span>
        <p className="text-sm font-semibold leading-relaxed">
          <BilingualText
            vi="Đường cong thường được biểu diễn bởi một chuỗi các đoạn cong ghép với nhau."
            en="Curves are generally represented by a contiguous sequence of joined curved segments."
          />
        </p>
      </div>

      {/* Checkpoint Question (Page 76) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 rounded-2xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
              <BilingualText
                vi="Câu hỏi củng cố (Trang 76 SGK):"
                en="Concept Check Question (Page 76):"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Để vẽ một hình chữ nhật tròn góc em nên dùng công cụ nào? Giải thích tại sao?"
                en="Which tool should you use to draw a rounded rectangle? Explain why."
              />
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white transition-all shadow-sm"
        >
          {showAnswer
            ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải đáp')
            : (bilingualMode === 'en' ? 'View Official Answer' : 'Xem câu trả lời chuẩn SGK')}
        </button>

        {showAnswer && (
          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800 text-sm text-slate-700 dark:text-slate-300 animate-fadeIn space-y-2">
            <p>
              <strong>
                <BilingualText vi="Trả lời:" en="Official Answer:" />
              </strong>{' '}
              <BilingualText
                vi="Nên dùng công cụ Rectangles (F4) trên hộp công cụ."
                en="You should use the Rectangles tool (F4) in the toolbox."
              />
            </p>
            <p className="text-xs leading-relaxed">
              <strong>
                <BilingualText vi="Giải thích:" en="Explanation:" />
              </strong>{' '}
              <BilingualText
                vi="Vì hình chữ nhật là hình khối định nghĩa sẵn trong Inkscape. Bằng cách nhập thông số bán kính bo góc Rx, Ry trên thanh điều khiển thuộc tính (hoặc kéo tay cầm hình tròn tại góc), ta sẽ thu được cả 4 góc bo tròn hoàn hảo, đối xứng tuyệt đối và chính xác nhanh chóng mà không phải tốn công vẽ uốn nắn thủ công bằng công cụ Pen."
                en="Because rectangle is a predefined primitive shape in Inkscape. By simply inputting corner radii Rx and Ry (or dragging the circular handle), all four corners are rounded uniformly, symmetrically, and instantaneously without error-prone manual Bézier pen drafting."
              />
            </p>
          </div>
        )}
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={14} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={prevPage}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            <BilingualText vi="Mục 0: Tổng quan & Mô hình 3D" en="Section 0: Overview" />
          </span>
        </button>

        <button
          onClick={nextPage}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white font-semibold transition-all shadow-md"
        >
          <span>
            <BilingualText
              vi="Mục 2: Công cụ tinh chỉnh đường"
              en="Section 2: Node Editing Tool"
            />
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
