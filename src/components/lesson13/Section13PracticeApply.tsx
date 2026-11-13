import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Sparkles,
  Layers,
  Palette,
  Flower2,
  Club,
  CircleDot,
  Check,
  RotateCcw,
  Sliders,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { LESSON_13_GLOSSARY } from '../../data/lesson13Data';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section13PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isAllSectionsComplete,
    prevPage
  } = useBook();

  // Accordion toggle states
  const [showPractice1, setShowPractice1] = useState(true);
  const [showPractice2, setShowPractice2] = useState(true);
  const [showPractice3, setShowPractice3] = useState(false);
  const [showApply1, setShowApply1] = useState(true);
  const [showApply2, setShowApply2] = useState(false);

  // Practice 1: Flower from Star sandbox (Figure 13.14)
  const [flowerCorners, setFlowerCorners] = useState(8);
  const [flowerRounded, setFlowerRounded] = useState(0.42);
  const [flowerSpoke, setFlowerSpoke] = useState(0.55);
  const [flowerPetalColor, setFlowerPetalColor] = useState('#f43f5e'); // rose
  const [flowerCenterColor, setFlowerCenterColor] = useState('#fbbf24'); // yellow

  // Practice 2: Ace of Spades assembler (Figure 13.15)
  const [spadeMerged, setSpadeMerged] = useState(false);
  const [spadeOffset, setSpadeOffset] = useState(15);

  // Practice 3: Balloon bouquet sandbox (Figure 13.16)
  const [showHighlights, setShowHighlights] = useState(true);
  const [balloonCount, setBalloonCount] = useState(5);

  // Apply 1: Watermelon slice construction (Figure 13.1)
  const [watermelonAngle, setWatermelonAngle] = useState(180); // semicircular slice
  const [seedCount, setSeedCount] = useState(7);

  const sectionSpeechVi =
    'Mục 5: Luyện tập và Vận dụng - Trang 74 SGK Tin học 10. Phần luyện tập gồm 3 bài tập sáng tạo: Luyện tập 1: Vẽ bông hoa Hình 13.14 từ hình sao bằng cách tăng tham số Rounded làm cong mềm các cánh hoa. Luyện tập 2: Vẽ quân bích Hình 13.15 bằng cách ghép hình trái tim ngược và chân đế bằng phép Union. Luyện tập 3: Vẽ chùm bóng bay Hình 13.16 gồm nhiều quả bóng hình elip với dải phản quang ánh sáng và dây bóng. Phần Vận dụng yêu cầu vẽ miếng dưa hấu nhiều lớp và vẽ hình khối không gian 3D. Mời các em làm bài kiểm tra trắc nghiệm 10 câu để nhận chứng chỉ điện tử!';
  const sectionSpeechEn =
    'Section 5: Practice & Application - Page 74 of Informatics 10 Textbook. Practice features 3 creative exercises: Practice 1: Construct the decorative flower in Figure 13.14 from a star shape by elevating the Rounded curvature parameter. Practice 2: Construct the Ace of Spades symbol in Figure 13.15 by fusing an inverted heart with a pedestal using Path Union. Practice 3: Illustrate the vibrant balloon bouquet in Figure 13.16 using colorful ellipses, specular crescent highlights, and curved strings. Application challenges include layered watermelon slice rendering and 3D space compositions. Complete the 10-question mastery quiz to claim your verified certificate!';

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

  // Helper to generate flower SVG path from star math
  const getFlowerPoints = () => {
    const points: string[] = [];
    const step = (Math.PI * 2) / (flowerCorners * 2);
    const rOuter = 70;
    const rInner = 70 * flowerSpoke;

    for (let i = 0; i < flowerCorners * 2; i++) {
      const radius = i % 2 === 0 ? rOuter : rInner;
      const angle = i * step - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return points.join(' ');
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-teal-700 via-indigo-800 to-purple-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Award className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-yellow-400/20 border border-yellow-300/40 rounded-full text-xs font-semibold text-yellow-200 uppercase tracking-wider mb-1">
                <BilingualText
                  vi="Phần 5 • Luyện tập & Vận dụng (Trang 74)"
                  en="Section 5 • Practice & Apply (Page 74)"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <BilingualText
                  vi="5. Luyện tập, Vận dụng & Đánh giá năng lực"
                  en="5. Practice, Application & Mastery Assessment"
                />
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PRACTICE 1: FLOWER FROM ROUNDED STAR (Figure 13.14)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <button
          onClick={() => setShowPractice1(!showPractice1)}
          className="w-full p-5 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-sm">
              LT1
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Flower2 className="w-4 h-4 text-rose-500" />
                <BilingualText
                  vi="Luyện tập 1: Vẽ bông hoa từ hình sao bo góc (Hình 13.14)"
                  en="Practice 1: Draw Flower from Rounded Star (Figure 13.14)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Sử dụng công cụ Star, chỉnh tham số Corners và Rounded để làm cong đầu cánh hoa"
                  en="Use Star tool, adjust Corners and Rounded parameters to curve flower petals"
                />
              </p>
            </div>
          </div>
          {showPractice1 ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showPractice1 && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visualizer */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 border border-slate-700 flex flex-col items-center justify-center min-h-[300px] relative shadow-inner">
              <svg viewBox="-100 -100 200 200" className="w-56 h-56 select-none drop-shadow-xl">
                {/* Flower Petals using SVG polygon or round-jointed path */}
                <polygon
                  points={getFlowerPoints()}
                  fill={flowerPetalColor}
                  stroke="#ffffff"
                  strokeWidth={flowerRounded > 0.1 ? flowerRounded * 14 : 2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {/* Flower center disc */}
                <circle cx="0" cy="0" r="22" fill={flowerCenterColor} stroke="#ffffff" strokeWidth="2" />
                <circle cx="-5" cy="-5" r="5" fill="#ffffff" opacity="0.4" />
              </svg>

              <div className="text-xs font-mono text-teal-300 mt-2 bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700">
                Corners: {flowerCorners} | Rounded: {flowerRounded.toFixed(2)} | Spoke: {flowerSpoke.toFixed(2)}
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>
                      <BilingualText vi="Số cánh hoa (Corners):" en="Petal count (Corners):" />
                    </span>
                    <span className="font-mono text-teal-600 dark:text-teal-400">{flowerCorners}</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="16"
                    value={flowerCorners}
                    onChange={(e) => setFlowerCorners(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>
                      <BilingualText vi="Độ cong cánh hoa (Rounded):" en="Petal Curvature (Rounded):" />
                    </span>
                    <span className="font-mono text-teal-600 dark:text-teal-400">
                      {flowerRounded.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.02"
                    value={flowerRounded}
                    onChange={(e) => setFlowerRounded(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    <BilingualText
                      vi="Kéo Rounded từ 0 (sao nhọn) lên ~0.4 để các đỉnh bo cong thành cánh hoa mềm mại!"
                      en="Increase Rounded from 0 (sharp star) to ~0.4 to round off the tips into soft petals!"
                    />
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>
                      <BilingualText vi="Tỉ lệ bán kính (Spoke ratio):" en="Spoke ratio:" />
                    </span>
                    <span className="font-mono text-teal-600 dark:text-teal-400">{flowerSpoke.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="0.85"
                    step="0.02"
                    value={flowerSpoke}
                    onChange={(e) => setFlowerSpoke(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <BilingualText vi="Màu cánh hoa:" en="Petal color:" />
                  </span>
                  <div className="flex gap-2">
                    {['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#f59e0b'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setFlowerPetalColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-6 h-6 rounded-full border-2 ${
                          flowerPetalColor === c ? 'border-white scale-125 shadow-md' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          PRACTICE 2: ACE OF SPADES ASSEMBLER (Figure 13.15)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <button
          onClick={() => setShowPractice2(!showPractice2)}
          className="w-full p-5 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center text-sm">
              LT2
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Club className="w-4 h-4 text-purple-500" />
                <BilingualText
                  vi="Luyện tập 2: Vẽ quân bích từ trái tim ngược và chân đế (Hình 13.15)"
                  en="Practice 2: Draw Ace of Spades from Inverted Heart & Pedestal (Figure 13.15)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Gợi ý: Lật ngược hình trái tim (xoay 180°), vẽ chân đế và hợp nhất bằng Path -> Union"
                  en="Hint: Invert heart shape (180°), draw pedestal base and fuse with Path -> Union"
                />
              </p>
            </div>
          </div>
          {showPractice2 ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showPractice2 && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Spade Visualizer */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 border border-slate-700 flex flex-col items-center justify-center min-h-[300px] relative shadow-inner">
              <svg viewBox="-80 -90 160 180" className="w-52 h-52 select-none drop-shadow-2xl">
                {!spadeMerged ? (
                  // Separated parts
                  <g>
                    {/* Inverted heart (top) */}
                    <g transform="translate(0, -20) scale(1, -1)">
                      <path
                        d="M 0,-40 C -35,-80 -65,-30 -65,-5 C -65,25 -20,50 0,65 C 20,50 65,25 65,-5 C 65,-30 35,-80 0,-40 Z"
                        fill="#38bdf8"
                        stroke="#0284c7"
                        strokeWidth="2"
                        opacity="0.85"
                      />
                    </g>
                    {/* Pedestal base (bottom) */}
                    <path
                      d={`M -25,${50 + spadeOffset} Q 0,${30 + spadeOffset} 0,${15 + spadeOffset} Q 0,${30 + spadeOffset} 25,${50 + spadeOffset} Z`}
                      fill="#f43f5e"
                      stroke="#e11d48"
                      strokeWidth="2"
                      opacity="0.85"
                    />
                  </g>
                ) : (
                  // United Spade shape
                  <g>
                    <path
                      d="M 0,-65 C 20,-50 65,-25 65,5 C 65,30 35,80 0,40 C -35,80 -65,30 -65,5 C -65,-25 -20,-50 0,-65 Z"
                      fill="#0f172a"
                      stroke="#ffffff"
                      strokeWidth="2"
                      transform="scale(1, -1)"
                    />
                    <path
                      d="M -25,65 Q 0,45 0,25 Q 0,45 25,65 Z"
                      fill="#0f172a"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}
              </svg>

              <div className="mt-3">
                <button
                  onClick={() => setSpadeMerged(!spadeMerged)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
                    spadeMerged
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  {spadeMerged ? (
                    <BilingualText vi="Tách rời các phần / Separate" en="Separate parts" />
                  ) : (
                    <BilingualText
                      vi="Thực hiện Path -> Union (Ctrl + +)"
                      en="Apply Path -> Union (Ctrl + +)"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="lg:col-span-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                <h4 className="font-bold text-purple-950 dark:text-purple-200 mb-2">
                  <BilingualText
                    vi="Quy trình 3 bước vẽ quân bích (Spade):"
                    en="3-Step Workflow to Draw Ace of Spades:"
                  />
                </h4>
                <ol className="space-y-2 text-xs list-decimal pl-4">
                  <li>
                    <BilingualText
                      vi="Lấy hình trái tim đã vẽ ở Hoạt động 3, dùng nút Flip vertically (phím V) để lộn ngược mũi nhọn lên trên."
                      en="Take the heart drawn in Activity 3, press Flip vertically (key V) to turn the tip upward."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Vẽ chân đế bằng tam giác hoặc hình thang, hoặc dùng Difference khoét 2 bên để chân đế xoè cong sang 2 bên."
                      en="Draw the pedestal base using a triangle or flared shape, curving the sides outwards."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Căn chỉnh chân đế chạm vào đáy hình trái tim ngược, chọn cả hai và nhấn Ctrl + + (Path -> Union). Tô màu đen tuyền!"
                      en="Align the pedestal to touch the inverted heart's bottom, select both and press Ctrl + + (Union). Fill solid black!"
                    />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          PRACTICE 3: BALLOON BOUQUET (Figure 13.16)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <button
          onClick={() => setShowPractice3(!showPractice3)}
          className="w-full p-5 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-600 dark:text-pink-400 font-bold flex items-center justify-center text-sm">
              LT3
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <CircleDot className="w-4 h-4 text-pink-500" />
                <BilingualText
                  vi="Luyện tập 3: Vẽ chùm bóng bay với vệt sáng phản quang (Hình 13.16)"
                  en="Practice 3: Draw Balloon Bouquet with Specular Highlights (Figure 13.16)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Vẽ các hình elip nhiều màu, nút buộc bóng tam giác, vệt sáng phản quang và dây bóng cong"
                  en="Draw colorful ellipses, triangle knots, crescent specular highlights, and curved strings"
                />
              </p>
            </div>
          </div>
          {showPractice3 ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showPractice3 && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visualizer */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 border border-slate-700 flex flex-col items-center justify-center min-h-[320px] relative shadow-inner">
              <svg viewBox="-120 -130 240 260" className="w-60 h-64 select-none drop-shadow-xl">
                {/* Balloon strings meeting at bottom center (0, 110) */}
                <path d="M -45,-30 Q -25,40 0,110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
                <path d="M 45,-30 Q 25,40 0,110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
                <path d="M -15,-60 Q -10,30 0,110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
                <path d="M 20,-50 Q 10,30 0,110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
                <path d="M 0,-15 Q 0,50 0,110" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />

                {/* Ribbon tie */}
                <circle cx="0" cy="110" r="4" fill="#f43f5e" />

                {/* Balloons */}
                {/* 1. Left Blue */}
                <g transform="translate(-45, -50)">
                  <ellipse cx="0" cy="0" rx="30" ry="38" fill="#3b82f6" />
                  <polygon points="-4,38 4,38 0,44" fill="#1d4ed8" />
                  {showHighlights && (
                    <path
                      d="M -16,-24 C -22,-14 -22,-2 -16,10"
                      stroke="#ffffff"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.65"
                    />
                  )}
                </g>

                {/* 2. Right Green */}
                <g transform="translate(45, -50)">
                  <ellipse cx="0" cy="0" rx="30" ry="38" fill="#10b981" />
                  <polygon points="-4,38 4,38 0,44" fill="#047857" />
                  {showHighlights && (
                    <path
                      d="M -16,-24 C -22,-14 -22,-2 -16,10"
                      stroke="#ffffff"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.65"
                    />
                  )}
                </g>

                {/* 3. Top Yellow */}
                <g transform="translate(-15, -80)">
                  <ellipse cx="0" cy="0" rx="28" ry="36" fill="#f59e0b" />
                  <polygon points="-4,36 4,36 0,42" fill="#b45309" />
                  {showHighlights && (
                    <path
                      d="M -15,-22 C -20,-12 -20,0 -15,10"
                      stroke="#ffffff"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.65"
                    />
                  )}
                </g>

                {/* 4. Top-Right Purple */}
                <g transform="translate(20, -70)">
                  <ellipse cx="0" cy="0" rx="28" ry="36" fill="#8b5cf6" />
                  <polygon points="-4,36 4,36 0,42" fill="#6d28d9" />
                  {showHighlights && (
                    <path
                      d="M -15,-22 C -20,-12 -20,0 -15,10"
                      stroke="#ffffff"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.65"
                    />
                  )}
                </g>

                {/* 5. Center Red Foreground */}
                <g transform="translate(0, -25)">
                  <ellipse cx="0" cy="0" rx="32" ry="40" fill="#ef4444" />
                  <polygon points="-4,40 4,40 0,46" fill="#b91c1c" />
                  {showHighlights && (
                    <path
                      d="M -17,-25 C -24,-15 -24,0 -17,12"
                      stroke="#ffffff"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.75"
                    />
                  )}
                </g>
              </svg>

              <div className="mt-2">
                <button
                  onClick={() => setShowHighlights(!showHighlights)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-teal-400" />
                  <span>
                    <BilingualText
                      vi={showHighlights ? 'Ẩn vệt sáng phản quang' : 'Bật vệt sáng phản quang'}
                      en={showHighlights ? 'Hide Highlights' : 'Show Highlights'}
                    />
                  </span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800">
                <h4 className="font-bold text-pink-950 dark:text-pink-200 mb-2">
                  <BilingualText
                    vi="Kỹ thuật đồ hoạ chùm bóng bay:"
                    en="Balloon Bouquet Design Techniques:"
                  />
                </h4>
                <ul className="space-y-1.5 text-xs list-disc pl-4 text-slate-600 dark:text-slate-300">
                  <li>
                    <BilingualText
                      vi="Thân quả bóng: Dùng công cụ Circles and Ellipses vẽ hình elip đứng."
                      en="Balloon body: Use Circles and Ellipses tool to draw a vertical ellipse."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Cuống buộc: Vẽ hình tam giác nhỏ bằng Polygon (Corners = 3) đặt ở đáy quả bóng."
                      en="Knot: Draw a small triangle using Polygon (Corners = 3) attached to the bottom."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Vệt sáng phản quang (Highlight): Vẽ một cung hoặc hình trăng khuyết màu trắng mờ (Opacity ~60%) ở mép trên bên trái để tạo hiệu ứng bóng cao su căng tròn bắt sáng."
                      en="Specular highlight: Draw a curved white stroke or crescent with ~60% opacity at the upper left perimeter."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Sắp xếp lớp: Dùng Page Up / Page Down để bóng trước che bóng sau tạo chiều sâu không gian."
                      en="Layering: Use Page Up / Page Down to establish depth between foreground and background balloons."
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          APPLY 1: WATERMELON SLICE (Figure 13.1)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <button
          onClick={() => setShowApply1(!showApply1)}
          className="w-full p-5 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-sm">
              VD1
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BilingualText
                  vi="Vận dụng 1: Vẽ hoàn chỉnh miếng dưa hấu nhiều lớp (Hình 13.1)"
                  en="Application 1: Complete Layered Watermelon Slice (Figure 13.1)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Ghép các lớp cung tròn đồng tâm: Vỏ xanh lá, cùi trắng, ruột đỏ tươi và hạt dưa đen"
                  en="Combine concentric semi-discs: Green rind, white pulp rind, red flesh, and black seeds"
                />
              </p>
            </div>
          </div>
          {showApply1 ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showApply1 && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visualizer */}
            <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-6 border border-slate-700 flex flex-col items-center justify-center min-h-[300px] relative shadow-inner">
              <svg viewBox="-110 -20 220 120" className="w-64 h-36 select-none drop-shadow-2xl">
                {/* Green outer rind */}
                <path d="M -90,0 A 90 90 0 0 0 90,0 Z" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
                {/* White/pale middle rind */}
                <path d="M -83,0 A 83 83 0 0 0 83,0 Z" fill="#dcfce7" />
                {/* Red juicy pulp */}
                <path d="M -77,0 A 77 77 0 0 0 77,0 Z" fill="#ef4444" />

                {/* Black seeds arranged parametrically */}
                {Array.from({ length: seedCount }).map((_, i) => {
                  const angle = (Math.PI / (seedCount + 1)) * (i + 1);
                  const radius = 48;
                  const x = -Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <ellipse
                      key={i}
                      cx={x}
                      cy={y}
                      rx="3.5"
                      ry="6.5"
                      fill="#0f172a"
                      transform={`rotate(${(angle * 180) / Math.PI - 90}, ${x}, ${y})`}
                    />
                  );
                })}
              </svg>

              <div className="flex items-center gap-3 mt-4 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <span className="text-xs text-slate-300 font-semibold">
                  <BilingualText vi="Số hạt dưa hấu:" en="Watermelon seed count:" />
                </span>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={seedCount}
                  onChange={(e) => setSeedCount(Number(e.target.value))}
                  className="w-28 accent-rose-500 cursor-pointer"
                />
                <span className="text-xs font-mono text-rose-400 font-bold">
                  {seedCount} {bilingualMode === 'en' ? 'seeds' : 'hạt'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-bold text-emerald-950 dark:text-emerald-200 mb-1 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <BilingualText
                    vi="Cách giải quyết bài toán Khởi động (Trang 69):"
                    en="Resolution of Warm-Up Problem (Page 69):"
                  />
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                  <BilingualText
                    vi="Miếng dưa hấu gồm 4 nhóm đối tượng chính được xếp chồng theo thứ tự từ dưới lên trên:"
                    en="The watermelon slice comprises 4 distinct object groups stacked from bottom to top:"
                  />
                </p>
                <ol className="space-y-1.5 text-xs list-decimal pl-4">
                  <li>
                    <strong>
                      <BilingualText vi="Lớp 1 (dưới cùng): " en="Layer 1 (Bottom): " />
                    </strong>
                    <BilingualText
                      vi="Vỏ dưa màu xanh lá (hình quạt/bán nguyệt lớn)."
                      en="Green rind (large semicircle arc)."
                    />
                  </li>
                  <li>
                    <strong>
                      <BilingualText vi="Lớp 2: " en="Layer 2: " />
                    </strong>
                    <BilingualText
                      vi="Cùi dưa màu trắng ngà (hình bán nguyệt nhỏ hơn)."
                      en="White inner rind (slightly smaller semicircle)."
                    />
                  </li>
                  <li>
                    <strong>
                      <BilingualText vi="Lớp 3: " en="Layer 3: " />
                    </strong>
                    <BilingualText
                      vi="Ruột dưa màu đỏ tươi (hình bán nguyệt trong cùng)."
                      en="Red flesh (innermost semicircle)."
                    />
                  </li>
                  <li>
                    <strong>
                      <BilingualText vi="Lớp 4 (trên cùng): " en="Layer 4 (Top): " />
                    </strong>
                    <BilingualText
                      vi="Các hạt dưa màu đen (hình elip nhỏ xoay hướng tâm)."
                      en="Black seeds (small rotated ellipses pointing inwards)."
                    />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>



      {/* =========================================================================
          GLOSSARY TERMS ACCORDION (10 Standardized Terms)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-indigo-500" />
            <h3 className="font-bold text-slate-800 dark:text-white">
              <BilingualText
                vi="Bảng tra cứu thuật ngữ chuyên ngành (Glossary - Bài 13)"
                en="Specialized Terminology Reference (Lesson 13 Glossary)"
              />
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">10 Terms</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LESSON_13_GLOSSARY.map((term) => (
            <div
              key={term.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 space-y-1 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  {bilingualMode === 'en' ? term.termEn : term.termVi}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{term.ipa}</span>
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {bilingualMode === 'en' ? term.definitionEn : term.definitionVi}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                SGK: {term.sgkContext}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={13} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={prevPage}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            <BilingualText
              vi="Mục 4: Thực hành chuyên sâu"
              en="Section 4: Practical Lab"
            />
          </span>
        </button>

        <button
          onClick={() => setShowQuizModal(true)}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold transition-all shadow-md"
        >
          <span>
            <BilingualText
              vi="Làm bài kiểm tra đánh giá"
              en="Start Evaluation Quiz"
            />
          </span>
          <Award className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
