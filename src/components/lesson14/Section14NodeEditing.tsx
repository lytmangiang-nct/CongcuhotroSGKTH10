import React, { useState } from 'react';
import {
  Wand2,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Plus,
  Minus,
  RotateCw,
  HelpCircle,
  Sparkles,
  Heart,
  Sliders,
  Scissors,
  Layers
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section14NodeEditing: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Interactive Node Sandbox state
  const [selectedNodeType, setSelectedNodeType] = useState<'smooth' | 'corner'>('smooth');
  const [nodeHandlesCollinear, setNodeHandlesCollinear] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'heart' | 'toolbar' | 'interactive'>('heart');

  // Checkpoint Question 14.7 state
  const [showCheckAnswer, setShowCheckAnswer] = useState<boolean>(false);

  const sectionSpeechVi =
    'Mục 2: Sử dụng công cụ tinh chỉnh đường - Trang 76 và 77 SGK Tin học 10. Khi nối các đoạn thẳng hoặc đoạn cong với nhau ta thu được đường cong phức tạp hơn. Các điểm nối giữa các đoạn có thể là điểm neo trơn (smooth nodes, thể hiện bởi hình vuông hay hình tròn) hoặc điểm neo góc (corner nodes, thể hiện bởi hình thoi). Điểm neo trơn có hai đường chỉ hướng luôn cùng phương với nhau. Các bước chỉnh sửa điểm neo: Bước 1: Chọn công cụ Node F2; Bước 2: Nháy chuột vào hình muốn chỉnh sửa; Bước 3: Nháy vào điểm neo cần sửa, chọn điểm neo hoặc điểm chỉ hướng rồi kéo thả chuột sang vị trí mới. Thanh điều khiển thuộc tính cung cấp các nút: Thêm điểm, Bỏ điểm, Gộp điểm, Tách điểm, Thêm liên kết, Bỏ liên kết, Chuyển đổi loại điểm neo và Chuyển hình khối thành đường.';
  const sectionSpeechEn =
    'Section 2: Utilizing Node Editing Tools - Pages 76 and 77 of Informatics 10 Textbook. Combining line and curve segments generates complex composite paths. Junction points can be Smooth Nodes (represented by squares or circles) or Corner Nodes (represented by diamonds). Smooth nodes maintain collinear direction lines. Node editing workflow: Step 1: Select Node tool (F2); Step 2: Click on path object; Step 3: Click targeted node or handle and drag to new position. The tool controls bar offers buttons to insert nodes, delete nodes, join nodes, break nodes, join/delete segments, convert node types (corner vs smooth), and execute Object to Path.';

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
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Wand2 className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-blue-500/30 border border-blue-300/40 rounded-full text-xs font-semibold text-blue-200 uppercase tracking-wider mb-1">
                <BilingualText
                  vi="Phần 2 • Trang 76 – 77 SGK"
                  en="Section 2 • Pages 76 – 77 Textbook"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <BilingualText
                  vi="2. Sử dụng công cụ tinh chỉnh đường (Edit Paths by Nodes)"
                  en="2. Utilizing Node Editing Tools"
                />
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Activity 2: Node Identification on Heart Shape (Figures 14.4 & 14.5) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 font-black flex items-center justify-center text-lg">
              HĐ2
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                <BilingualText
                  vi="Hoạt động 2: Nhận dạng điểm neo trơn & neo góc (Hình 14.4 & 14.5)"
                  en="Activity 2: Recognizing Smooth vs Corner Nodes (Figures 14.4 & 14.5)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Quan sát hình trái tim, xác định xem các điểm được đánh dấu có những đặc điểm gì"
                  en="Examine the heart contour and analyze the properties of labeled anchor nodes"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Heart SVG Visualizer */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[320px] relative shadow-inner">
            <svg viewBox="-100 -90 200 180" className="w-60 h-56 select-none drop-shadow-2xl">
              {/* Heart Path */}
              <path
                d="M 0,-25 C -30,-65 -70,-20 -70,10 C -70,42 -25,65 0,80 C 25,65 70,42 70,10 C 70,-20 30,-65 0,-25 Z"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
              />

              {/* Tangent Rods on Upper Smooth Node */}
              <line x1="-70" y1="10" x2="-70" y2="-20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="-70" y1="10" x2="-70" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="-70" cy="-20" r="4.5" fill="#f59e0b" />
              <circle cx="-70" cy="40" r="4.5" fill="#f59e0b" />

              <line x1="70" y1="10" x2="70" y2="-20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="70" y1="10" x2="70" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="70" cy="-20" r="4.5" fill="#f59e0b" />
              <circle cx="70" cy="40" r="4.5" fill="#f59e0b" />

              {/* Smooth Nodes (Squares) */}
              <rect x="-74" y="6" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
              <rect x="66" y="6" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />

              {/* Corner Nodes (Diamonds) */}
              {/* 1. Top Cleft Notch */}
              <polygon points="0,-30 5,-25 0,-20 -5,-25" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
              {/* 2. Bottom Sharp Tip */}
              <polygon points="0,75 5,80 0,85 -5,80" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            </svg>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-2 text-xs font-semibold bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-3 bg-emerald-500 rounded-xs inline-block" />
                <span>
                  <BilingualText vi="Điểm neo trơn (Smooth)" en="Smooth Nodes" />
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-3 h-3 bg-rose-500 rotate-45 inline-block" />
                <span>
                  <BilingualText vi="Điểm neo góc (Corner)" en="Corner Nodes" />
                </span>
              </span>
            </div>
          </div>

          {/* Theoretical Comparison */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
              <h4 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <BilingualText vi="1. Điểm neo trơn (Smooth Node)" en="1. Smooth Node Characteristics" />
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Thể hiện bằng hình vuông hoặc hình tròn. Hai đường chỉ hướng luôn CÙNG PHƯƠNG (thẳng hàng đối xứng qua điểm neo). Khi ta quay một cần điều khiển, cần điều khiển đối diện sẽ tự động quay theo để đảm bảo đường cong trôi mượt mà không có nếp gấp."
                  en="Represented by a square or circle. The two direction lines are always COLLINEAR (aligned through the anchor). Moving one handle rotates the opposing handle automatically, guaranteeing seamless curvature."
                />
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-1.5">
              <h4 className="font-bold text-rose-950 dark:text-rose-200 text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rotate-45 bg-rose-500" />
                <BilingualText vi="2. Điểm neo góc (Corner / Cusp Node)" en="2. Corner Node Characteristics" />
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Thể hiện bằng hình thoi. Hai đường chỉ hướng hoàn toàn ĐỘC LẬP với nhau về cả phương hướng và độ dài. Cho phép bẻ gập đường nét tạo thành các góc nhọn, góc vuông hoặc điểm gấp khúc sắc nét (như chóp đáy và khe lõm trái tim)."
                  en="Represented by a diamond icon. The two direction lines operate INDEPENDENTLY in both angle and length. This allows sharp bends, right angles, and cusps (such as the bottom tip and upper cleft of the heart)."
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar Breakdown (Figure 14.6) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 dark:border-slate-700/80 pb-4">
          <span className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black flex items-center justify-center text-lg">
            UI
          </span>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              <BilingualText
                vi="Các biểu tượng trên thanh điều khiển thuộc tính của công cụ Node (Hình 14.6)"
                en="Node Tool Control Bar Anatomy (Figure 14.6)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Thực hiện các thao tác thêm, bớt, gộp, tách điểm và chuyển đổi loại điểm neo"
                en="Insert, delete, join, break nodes, and convert node types"
              />
            </p>
          </div>
        </div>

        {/* 8 Features Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-500" />
              <span><BilingualText vi="Thêm điểm (Insert Node)" en="Insert Node" /></span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              <BilingualText
                vi="Nháy chuột vào đoạn cong rồi bấm nút này để chèn thêm 1 điểm neo mới vào giữa."
                en="Click along the path segment and click this icon to insert a new anchor node midway."
              />
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Minus className="w-4 h-4 text-rose-500" />
              <span><BilingualText vi="Bỏ điểm (Delete Node)" en="Delete Selected Nodes" /></span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              <BilingualText
                vi="Chọn một hoặc nhiều điểm neo và bấm nút này (hoặc phím Delete) để loại bỏ điểm."
                en="Select one or more nodes and click this button (or press Delete) to remove them."
              />
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-500" />
              <span><BilingualText vi="Gộp điểm (Join Nodes)" en="Join Selected Nodes" /></span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              <BilingualText
                vi="Chọn 2 điểm neo gần nhau và gộp lại thành 1 điểm neo duy nhất (như đỉnh nhọn chiếc lá)."
                en="Select two endpoint nodes and fuse them into a single continuous node."
              />
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-amber-500" />
              <span><BilingualText vi="Tách điểm (Break Node)" en="Break Path at Selected Nodes" /></span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              <BilingualText
                vi="Tách điểm được chọn thành 2 điểm rời nhau và mở đứt liên kết giữa hai đoạn."
                en="Split selected node into two separate endpoints, breaking the path open."
              />
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              <BilingualText vi="Thêm liên kết (Join Segments)" en="Join Segments" />
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              <BilingualText
                vi="Nối hai điểm neo mở bằng một đoạn thẳng hoặc đoạn cong mới."
                en="Connect two selected open endpoints with a new line or curve segment."
              />
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              <BilingualText vi="Bỏ liên kết (Delete Segment)" en="Delete Segment" />
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              <BilingualText
                vi="Xoá đoạn nối nằm giữa hai điểm neo được chọn mà không xoá điểm neo."
                en="Remove the segment between two selected nodes while keeping both nodes intact."
              />
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-rose-600 dark:text-rose-400">
              <BilingualText vi="Chuyển đổi loại điểm neo" en="Convert Node Types" />
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              <BilingualText
                vi="Gồm 4 nút: Biến thành neo góc (Cusp), neo trơn (Smooth), neo đối xứng, hoặc neo tự động."
                en="4 buttons: Make selected nodes corner (cusp), smooth, symmetric, or auto-smooth."
              />
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-cyan-600 dark:text-cyan-400">
              Object to Path (Shift+Ctrl+C)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              <BilingualText
                vi="Chuyển hình khối định nghĩa sẵn (chữ nhật, elip) thành đối tượng đường tự do."
                en="Convert predefined primitive shapes (rectangles, ellipses) into editable paths."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Summary Box 2 (Page 77) */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border-2 border-dashed border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200 shadow-sm flex items-start gap-3">
        <span className="p-2 bg-amber-200 dark:bg-amber-900 rounded-xl text-amber-900 dark:text-amber-200 shrink-0 font-bold text-xs uppercase">
          {bilingualMode === 'en' ? 'Summary 2' : 'Ghi nhớ 2'}
        </span>
        <p className="text-sm font-semibold leading-relaxed">
          <BilingualText
            vi="Ta có thể tinh chỉnh đối tượng đường dựa vào điểm neo và các điểm, đường chỉ hướng."
            en="Path objects can be sculpted by manipulating anchor nodes, direction lines, and handles."
          />
        </p>
      </div>

      {/* Checkpoint Question (Figure 14.7, Page 77) */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white">
              <BilingualText
                vi="Câu hỏi củng cố (Hình 14.7 Trang 77 SGK):"
                en="Concept Check Question (Figure 14.7, Page 77):"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Hình 14.7 có mấy đoạn cong? Xác định điểm neo trơn và neo góc của hình."
                en="How many curved segments are in Figure 14.7? Identify the smooth and corner nodes."
              />
            </p>
          </div>
        </div>

        {/* SVG Diagram representing Figure 14.7 */}
        <div className="h-44 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-4">
          <svg viewBox="0 0 280 120" className="w-72 h-36 select-none">
            {/* Guide line & Curve */}
            <path
              d="M 20,90 C 40,20 80,30 110,60 C 130,80 150,110 180,110 C 210,110 230,50 260,20"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
            />
            {/* Tangent rods on smooth node (110, 60) */}
            <line x1="110" y1="60" x2="85" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="110" y1="60" x2="135" y2="80" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="85" cy="40" r="4" fill="#f59e0b" />
            <circle cx="135" cy="80" r="4" fill="#f59e0b" />

            {/* Nodes */}
            <polygon points="20,85 25,90 20,95 15,90" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="106" y="56" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="180,105 185,110 180,115 175,110" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="260,15 265,20 260,25 255,20" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />

            <text x="10" y="112" fill="#94a3b8" fontSize="10">N1</text>
            <text x="105" y="48" fill="#10b981" fontSize="10" fontWeight="bold">
              {bilingualMode === 'en' ? 'N2 (Smooth)' : 'N2 (Trơn)'}
            </text>
            <text x="175" y="128" fill="#f43f5e" fontSize="10" fontWeight="bold">
              {bilingualMode === 'en' ? 'N3 (Corner)' : 'N3 (Góc)'}
            </text>
            <text x="250" y="42" fill="#94a3b8" fontSize="10">N4</text>
          </svg>
        </div>

        <button
          onClick={() => setShowCheckAnswer(!showCheckAnswer)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm"
        >
          {showCheckAnswer
            ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải đáp')
            : (bilingualMode === 'en' ? 'View Detailed Solution' : 'Xem đáp án phân tích chi tiết')}
        </button>

        {showCheckAnswer && (
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-sm text-slate-700 dark:text-slate-300 animate-fadeIn space-y-2">
            <p>
              <strong>
                <BilingualText vi="1. Số đoạn cong:" en="1. Number of curve segments:" />
              </strong>{' '}
              <BilingualText
                vi="Hình 14.7 có 3 đoạn cong nối liên tiếp nhau qua 4 điểm neo."
                en="Figure 14.7 has 3 curved segments connected consecutively across 4 anchor nodes."
              />
            </p>
            <p>
              <strong>
                <BilingualText vi="2. Điểm neo trơn (Smooth Node):" en="2. Smooth Node:" />
              </strong>{' '}
              <BilingualText
                vi="Điểm N2 (hình vuông xanh) là điểm neo trơn vì tại đây hai đường chỉ hướng nằm trên cùng một đường thẳng (cùng phương), tạo đường lượn mềm mại."
                en="Node N2 (green square) is a smooth node because its two direction lines are collinear, producing a seamless smooth curve."
              />
            </p>
            <p>
              <strong>
                <BilingualText vi="3. Điểm neo góc (Corner Node):" en="3. Corner Node:" />
              </strong>{' '}
              <BilingualText
                vi="Điểm N1, N3 và N4 (hình thoi đỏ). Đặc biệt tại điểm N3 ở đáy trũng, hai đường chỉ hướng lệch hướng nhau tạo góc gập gấp khúc; N1 và N4 là hai đầu mút của đường dẫn."
                en="Nodes N1, N3, and N4 (red diamonds). Specifically at node N3 in the valley, direction handles are independent forming a sharp cusp; N1 and N4 are path endpoints."
              />
            </p>
          </div>
        )}
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={14} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={prevPage}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            <BilingualText
              vi="Mục 1: Làm quen đối tượng đường"
              en="Section 1: Freeform Paths"
            />
          </span>
        </button>

        <button
          onClick={nextPage}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all shadow-md"
        >
          <span>
            <BilingualText
              vi="Mục 3: Đối tượng văn bản & Uốn chữ"
              en="Section 3: Typography & Text on Path"
            />
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
