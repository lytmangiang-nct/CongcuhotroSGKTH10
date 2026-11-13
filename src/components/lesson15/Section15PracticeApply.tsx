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
  Sun,
  Waves,
  Gift,
  Zap,
  Droplets,
  ArrowLeft,
  Check,
  RotateCcw
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { LESSON_15_GLOSSARY } from '../../data/lesson15Data';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section15PracticeApply: React.FC = () => {
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
  const [showApply, setShowApply] = useState(true);

  // Practice 1: Birthday Card sandbox state (Page 85 Fig 15.9)
  const [bdayName, setBdayName] = useState('HOÀNG YẾN');
  const [balloonColor1, setBalloonColor1] = useState('#f43f5e'); // rose-500
  const [balloonColor2, setBalloonColor2] = useState('#3b82f6'); // blue-500
  const [balloonColor3, setBalloonColor3] = useState('#10b981'); // emerald-500
  const [cardTheme, setCardTheme] = useState<'pastel' | 'vibrant' | 'navy'>('pastel');

  // Practice 2: Eco Conservation Logo sandbox state (Page 85)
  const [ecoType, setEcoType] = useState<'water' | 'energy' | 'hybrid'>('hybrid');
  const [leafAngle, setLeafAngle] = useState(25);

  // Application: Summer Beach sandbox state (Page 85 Fig 15.10)
  const [waveHeight, setWaveHeight] = useState(20);
  const [parasolColor, setParasolColor] = useState('#ef4444');
  const [ballRotation, setBallRotation] = useState(30);

  const sectionSpeechVi =
    'Mục 5: Luyện tập và Vận dụng - Trang 85 SGK Tin học 10. Phần luyện tập gồm 2 bài tập: Luyện tập 1: Thiết kế thiệp chúc mừng sinh nhật đơn giản dạng vector với bóng bay, ruy băng lượn sóng và chữ nghệ thuật. Luyện tập 2: Thiết kế logo tuyên truyền tiết kiệm điện và nước sử dụng các phép ghép hình học cơ bản. Phần Vận dụng: Thiết kế bức tranh minh họa bãi biển mùa hè với các tầng sóng biển Bézier, ô che nắng và quả bóng tròn sọc màu sắc. Sau khi hoàn thành, mời các em làm bài kiểm tra trắc nghiệm 10 câu để nhận chứng chỉ điện tử KNTT10-B15!';
  const sectionSpeechEn =
    'Section 5: Practice & Application - Page 85 of Informatics 10 Textbook. Practice features 2 hands-on projects: Practice 1: Design a vector birthday greeting card with colorful balloons, wavy ribbons, and festive typography. Practice 2: Design an eco-conservation logo for saving water and energy using geometric boolean ops. Application: Illustrate a vibrant summer beach scene with Bézier ocean waves, a sun parasol, and a striped beach ball. Complete the 10-question mastery quiz to earn your official KNTT10-B15 electronic certificate!';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-800 via-indigo-900 to-purple-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-teal-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Section 5 • Page 85' : 'Mục 5 • Trang 85'}
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-100 text-xs font-mono font-semibold">
              KNTT10-B15
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '5. PRACTICE, APPLICATION & CERTIFICATION'
              : '5. LUYỆN TẬP, VẬN DỤNG & CHỨNG CHỈ ĐIỆN TỬ'}
          </h2>

          <p className="text-sm sm:text-base text-teal-100/90 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Put all your vector assembly skills to work: craft celebratory greeting cards, design minimalist ecological logos, and compose layered summer beach dioramas before validating your knowledge with the mastery quiz.'
              : 'Vận dụng toàn diện kỹ năng đồ họa vecto Inkscape: thiết kế thiệp sinh nhật rực rỡ, sáng tạo logo tiết kiệm điện nước tối giản và vẽ tranh bãi biển mùa hè với sóng Bézier, ô dù và bóng xoay trước khi làm bài kiểm tra nhận chứng chỉ.'}
          </p>
        </div>
      </div>

      {/* Practice 1: Birthday Invitation Card (Page 85 Fig 15.9) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowPractice1(!showPractice1)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Practice 1: Birthday Invitation Card Design (Fig 15.9)'
                  : 'Luyện tập 1: Thiết kế thiệp chúc mừng sinh nhật (Hình 15.9)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Combine ellipses, knot triangles, Bézier ribbons, and layered greeting typography'
                  : 'Kết hợp elip bóng bay, tam giác thắt nút, dải ruy băng lượn sóng và chữ nghệ thuật'}
              </p>
            </div>
          </div>
          {showPractice1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showPractice1 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="space-y-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider">
                  {bilingualMode === 'en' ? 'Step-by-Step Method (SGK Page 85):' : 'Các bước thực hiện theo SGK:'}
                </span>
                <ul className="space-y-2 text-xs list-disc pl-5">
                  <li>
                    <strong>{bilingualMode === 'en' ? 'Balloons:' : 'Vẽ bóng bay:'}</strong>{' '}
                    {bilingualMode === 'en'
                      ? 'Use Circle/Ellipse (F5) to draw egg-shaped balloons, add small knot triangles, and fuse with Path / Union.'
                      : 'Dùng công cụ Circle/Ellipse (F5) vẽ quả bóng hình trứng, vẽ hình tam giác nhỏ làm nút thắt rồi dùng Path / Union để hàn liền.'}
                  </li>
                  <li>
                    <strong>{bilingualMode === 'en' ? '3D Specular Highlight:' : 'Tạo vệt sáng 3D:'}</strong>{' '}
                    {bilingualMode === 'en'
                      ? 'Draw a translucent white ellipse (Opacity 40%) in upper-left corner of the balloon to convey rounded 3D depth.'
                      : 'Vẽ thêm một hình elip trắng bán trong suốt (Opacity 40%) đặt ở góc trên bên trái bóng để tạo điểm phản quang nổi khối.'}
                  </li>
                  <li>
                    <strong>{bilingualMode === 'en' ? 'Strings & Ribbons:' : 'Dây bóng và ruy băng:'}</strong>{' '}
                    {bilingualMode === 'en'
                      ? 'Deploy Pen (Bézier) tool to draw flowing graceful wave curves tying balloon clusters together.'
                      : 'Dùng bút Pen (Bézier) vẽ các đường cong uốn lượn mềm mại kết nối chùm bóng bay.'}
                  </li>
                  <li>
                    <strong>{bilingualMode === 'en' ? 'Festive Typography & Gift:' : 'Chữ thiệp & Hộp quà:'}</strong>{' '}
                    {bilingualMode === 'en'
                      ? 'Input artistic "HAPPY BIRTHDAY" lettering, add gift boxes, and export 300 dpi PNG.'
                      : 'Nhập chữ nghệ thuật "HAPPY BIRTHDAY", vẽ hộp quà trang trí và xuất ra tệp PNG 300 dpi.'}
                  </li>
                </ul>
              </div>

              {/* Controls */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {bilingualMode === 'en' ? 'Celebrant Name:' : 'Tên chủ nhân bữa tiệc:'}
                  </label>
                  <input
                    type="text"
                    value={bdayName}
                    onChange={(e) => setBdayName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {bilingualMode === 'en' ? 'Balloon 1:' : 'Bóng bay 1:'}
                  </span>
                  <input
                    type="color"
                    value={balloonColor1}
                    onChange={(e) => setBalloonColor1(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
                    {bilingualMode === 'en' ? 'Balloon 2:' : 'Bóng 2:'}
                  </span>
                  <input
                    type="color"
                    value={balloonColor2}
                    onChange={(e) => setBalloonColor2(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
                    {bilingualMode === 'en' ? 'Balloon 3:' : 'Bóng 3:'}
                  </span>
                  <input
                    type="color"
                    value={balloonColor3}
                    onChange={(e) => setBalloonColor3(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  {(['pastel', 'vibrant', 'navy'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setCardTheme(t)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                        cardTheme === t
                          ? 'bg-rose-500 text-white shadow-sm'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      Theme: {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual SVG Card Preview */}
            <div className="lg:col-span-6 flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-950 rounded-2xl">
              <div
                className={`w-72 h-96 rounded-2xl shadow-xl p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  cardTheme === 'pastel'
                    ? 'bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 text-slate-800 border-2 border-rose-200'
                    : cardTheme === 'vibrant'
                    ? 'bg-gradient-to-br from-amber-400 via-rose-500 to-purple-600 text-white'
                    : 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border-2 border-amber-400/40'
                }`}
              >
                {/* Confetti decorations */}
                <div className="absolute top-2 left-3 text-xs opacity-70">✨</div>
                <div className="absolute top-4 right-4 text-xs opacity-70">🎉</div>
                <div className="absolute bottom-6 left-4 text-xs opacity-70">🎈</div>

                {/* Card Header */}
                <div className="text-center pt-2 space-y-1 z-10">
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 block">
                    INVITATION CARD
                  </span>
                  <h4 className="text-xl font-black tracking-wider leading-tight drop-shadow-sm">
                    HAPPY BIRTHDAY
                  </h4>
                  <div className="text-sm font-extrabold tracking-wide text-rose-500 dark:text-rose-400">
                    {bdayName || (bilingualMode === 'en' ? 'DEAR FRIEND' : 'BẠN THÂN')}
                  </div>
                </div>

                {/* Balloons SVG Assembly */}
                <div className="relative h-40 flex items-center justify-center">
                  <svg viewBox="0 0 200 160" className="w-full h-full drop-shadow-md">
                    {/* Balloon Strings */}
                    <path d="M 60 70 Q 70 120 100 150" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    <path d="M 100 65 Q 95 110 100 150" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    <path d="M 140 75 Q 125 120 100 150" fill="none" stroke="#94a3b8" strokeWidth="1.5" />

                    {/* Ribbon bow at bottom knot */}
                    <circle cx="100" cy="150" r="3" fill="#e11d48" />

                    {/* Balloon 1 (Left) */}
                    <g transform="translate(60, 45)">
                      <ellipse cx="0" cy="0" rx="22" ry="28" fill={balloonColor1} />
                      <ellipse cx="-6" cy="-10" rx="6" ry="10" fill="white" opacity="0.45" />
                      <polygon points="-4,28 4,28 0,33" fill={balloonColor1} />
                    </g>

                    {/* Balloon 3 (Right) */}
                    <g transform="translate(140, 50)">
                      <ellipse cx="0" cy="0" rx="22" ry="28" fill={balloonColor3} />
                      <ellipse cx="-6" cy="-10" rx="6" ry="10" fill="white" opacity="0.45" />
                      <polygon points="-4,28 4,28 0,33" fill={balloonColor3} />
                    </g>

                    {/* Balloon 2 (Center - in front) */}
                    <g transform="translate(100, 38)">
                      <ellipse cx="0" cy="0" rx="26" ry="32" fill={balloonColor2} />
                      <ellipse cx="-8" cy="-12" rx="7" ry="12" fill="white" opacity="0.5" />
                      <polygon points="-5,32 5,32 0,38" fill={balloonColor2} />
                    </g>
                  </svg>
                </div>

                {/* Card Footer */}
                <div className="text-center pb-2 z-10 text-[10px] opacity-80">
                  <p>{bilingualMode === 'en' ? 'Cordially invites you to celebrate!' : 'Trân trọng kính mời bạn tới tham dự!'}</p>
                  <p className="font-mono text-[9px] mt-0.5">Vector Graphic Project • Fig 15.9</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Practice 2: Eco Conservation Logo (Page 85) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowPractice2(!showPractice2)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Practice 2: Eco-Energy & Clean Water Logo'
                  : 'Luyện tập 2: Thiết kế biểu trưng tiết kiệm điện và nước'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Geometric boolean operations: Water drop (Union/Difference), eco-leaf & lightning bolt'
                  : 'Các phép ghép hình học: Giọt nước, chiếc lá xanh và tia sét tiết kiệm năng lượng'}
              </p>
            </div>
          </div>
          {showPractice2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showPractice2 && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <p className="leading-relaxed">
                {bilingualMode === 'en'
                  ? 'In this assignment, students create a campaign emblem reminding people to conserve water and clean electricity. The droplet is constructed by joining an upper triangle with a bottom circle (Union). The leaf uses the Intersection of two overlapping circles.'
                  : 'Đề bài SGK yêu cầu thiết kế logo hoặc biểu tượng tuyên truyền bảo vệ môi trường, tiết kiệm điện hoặc nước. Giọt nước được tạo từ hình tròn ghép với tam giác nhọn (Union). Chiếc lá xanh được tạo từ phần giao (Intersection) của 2 hình tròn đè nhau.'}
              </p>

              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <span className="font-bold text-emerald-800 dark:text-emerald-200 block">
                  {bilingualMode === 'en' ? 'Select Logo Theme:' : 'Chọn chủ đề biểu trưng:'}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEcoType('water')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      ecoType === 'water' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {bilingualMode === 'en' ? '💧 Save Water' : '💧 Tiết kiệm nước'}
                  </button>
                  <button
                    onClick={() => setEcoType('energy')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      ecoType === 'energy' ? 'bg-amber-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {bilingualMode === 'en' ? '⚡ Save Electricity' : '⚡ Tiết kiệm điện'}
                  </button>
                  <button
                    onClick={() => setEcoType('hybrid')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      ecoType === 'hybrid' ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {bilingualMode === 'en' ? '🌱 Clean Earth' : '🌱 Môi trường Xanh'}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl">
              <div className="w-56 h-56 rounded-full bg-white dark:bg-slate-800 shadow-xl border-4 border-emerald-500/40 flex flex-col items-center justify-center p-4 relative">
                <svg viewBox="0 0 100 100" className="w-32 h-32">
                  {ecoType === 'water' && (
                    <g>
                      <path
                        d="M 50 15 C 50 15 25 50 25 65 A 25 25 0 0 0 75 65 C 75 50 50 15 50 15 Z"
                        fill="#0284c7"
                      />
                      <ellipse cx="42" cy="58" rx="4" ry="9" fill="white" opacity="0.4" transform="rotate(-20 42 58)" />
                    </g>
                  )}
                  {ecoType === 'energy' && (
                    <g>
                      <circle cx="50" cy="50" r="38" fill="#fef3c7" />
                      <polygon
                        points="52,18 32,50 48,50 44,78 68,46 52,46"
                        fill="#f59e0b"
                        stroke="#d97706"
                        strokeWidth="2"
                      />
                    </g>
                  )}
                  {ecoType === 'hybrid' && (
                    <g>
                      <path
                        d="M 50 18 C 50 18 28 50 28 65 A 22 22 0 0 0 72 65 C 72 50 50 18 50 18 Z"
                        fill="#0d9488"
                      />
                      {/* Leaf overlay via intersection */}
                      <path
                        d="M 50 35 C 65 45 65 65 50 72 C 35 65 35 45 50 35 Z"
                        fill="#10b981"
                      />
                      {/* Lightning streak */}
                      <polygon points="51,38 43,52 50,52 48,64 57,50 51,50" fill="#fef08a" />
                    </g>
                  )}
                </svg>
                <div className="text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 mt-1">
                  {ecoType === 'water'
                    ? (bilingualMode === 'en' ? 'SAVE CLEAN WATER' : 'TIẾT KIỆM NƯỚC SẠCH')
                    : ecoType === 'energy'
                    ? (bilingualMode === 'en' ? 'SAVE ELECTRICITY' : 'TIẾT KIỆM ĐIỆN NĂNG')
                    : (bilingualMode === 'en' ? 'CLEAN EARTH • 2026' : 'TRÁI ĐẤT XANH • 2026')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application: Summer Beach Scene (Page 85 Fig 15.10) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setShowApply(!showApply)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Application: Summer Beach Scene Vector Illustration (Fig 15.10)'
                  : 'Vận dụng: Vẽ minh họa bức tranh bãi biển mùa hè (Hình 15.10)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Multi-layered Bézier ocean waves, radial parasol, and striped 3D beach ball'
                  : 'Đường cong Bézier vẽ sóng biển lượn tầng, ô che nắng bãi biển và bóng tròn sọc màu'}
              </p>
            </div>
          </div>
          {showApply ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {showApply && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <p className="leading-relaxed">
                {bilingualMode === 'en'
                  ? 'Apply all geometric skills: The ocean waves are drawn with smooth Bézier curves layered to create deep perspective. The beach parasol combines rotated triangle wedges, and the beach ball uses curved slices on a circle to convey depth.'
                  : 'Vận dụng tổng hợp toàn bộ các kỹ năng: Dùng bút Pen vẽ các lớp sóng biển nhấp nhô mềm mại bằng đường Bézier. Dùng hình tròn và các lát nan tam giác để vẽ ô che nắng. Dùng hình tròn và các dải sọc elip để tạo khối cầu cho quả bóng bãi biển.'}
              </p>

              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center font-bold">
                  <span>{bilingualMode === 'en' ? 'Wave Amplitude:' : 'Độ dập dềnh của sóng:'}</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400">{waveHeight} px</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="40"
                  value={waveHeight}
                  onChange={(e) => setWaveHeight(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />

                <div className="flex items-center justify-between pt-2">
                  <span className="font-bold">{bilingualMode === 'en' ? 'Parasol Color:' : 'Màu ô che nắng:'}</span>
                  <input
                    type="color"
                    value={parasolColor}
                    onChange={(e) => setParasolColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Visual SVG Beach Canvas */}
            <div className="lg:col-span-7 flex items-center justify-center p-3 bg-slate-900 rounded-2xl overflow-hidden">
              <svg viewBox="0 0 400 250" className="w-full max-w-md h-auto rounded-xl shadow-2xl">
                {/* Sky */}
                <rect x="0" y="0" width="400" height="150" fill="url(#skyGrad)" />
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#bae6fd" />
                  </linearGradient>
                </defs>

                {/* Sun */}
                <circle cx="340" cy="45" r="28" fill="#fbbf24" opacity="0.9" />
                <circle cx="340" cy="45" r="36" fill="#fde68a" opacity="0.3" />

                {/* Sand Shore */}
                <path d="M 0 160 Q 150 140 400 170 L 400 250 L 0 250 Z" fill="#fde047" />
                <path d="M 0 190 Q 200 170 400 200 L 400 250 L 0 250 Z" fill="#facc15" />

                {/* Layered Bézier Ocean Waves */}
                <path
                  d={`M 0 130 C 70 ${130 - waveHeight} 130 ${130 + waveHeight} 200 130 C 270 ${130 - waveHeight} 330 ${130 + waveHeight} 400 130 L 400 180 L 0 180 Z`}
                  fill="#0284c7"
                  opacity="0.8"
                />
                <path
                  d={`M 0 145 C 80 ${145 + waveHeight} 140 ${145 - waveHeight} 220 145 C 300 ${145 + waveHeight} 360 ${145 - waveHeight} 400 145 L 400 195 L 0 195 Z`}
                  fill="#0ea5e9"
                  opacity="0.9"
                />
                <path
                  d={`M 0 162 C 60 ${162 - waveHeight * 0.7} 150 ${162 + waveHeight * 0.7} 240 162 C 320 ${162 - waveHeight * 0.7} 380 ${162 + waveHeight * 0.7} 400 162 L 400 200 L 0 200 Z`}
                  fill="#38bdf8"
                />

                {/* Beach Parasol (Umbrella) */}
                <g transform="translate(100, 140)">
                  {/* Pole */}
                  <line x1="0" y1="0" x2="10" y2="60" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
                  {/* Canopy */}
                  <path d="M -45 0 Q 0 -35 45 0 Z" fill={parasolColor} />
                  <path d="M -22 0 Q 0 -35 22 0 Z" fill="#ffffff" />
                  <path d="M -8 0 Q 0 -35 8 0 Z" fill="#facc15" />
                </g>

                {/* 3D Striped Beach Ball */}
                <g transform="translate(240, 205)">
                  <circle cx="0" cy="0" rx="20" ry="20" fill="#3b82f6" />
                  <path d="M 0 -20 A 20 20 0 0 0 0 20 A 10 20 0 0 1 0 -20 Z" fill="#ef4444" />
                  <path d="M 0 -20 A 20 20 0 0 1 0 20 A 10 20 0 0 0 0 -20 Z" fill="#eab308" />
                  {/* Highlight */}
                  <ellipse cx="-6" cy="-8" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(-30 -6 -8)" />
                </g>

                <text x="15" y="240" fill="#78350f" fontSize="10" fontWeight="bold">
                  SGK Tin học 10 • Bãi biển mùa hè (Hình 15.10)
                </text>
              </svg>
            </div>
          </div>
        )}
      </div>



      {/* Bilingual Glossary Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
              {bilingualMode === 'en'
                ? 'Lesson 15 Technical Glossary & IPA Reference'
                : 'Thuật ngữ cốt lõi & Phiên âm quốc tế IPA (Bài 15)'}
            </h3>
            <p className="text-xs text-slate-500">
              {bilingualMode === 'en'
                ? 'Standard graphics and publishing terminology used in national textbook and software'
                : 'Hệ thống thuật ngữ đồ họa và xuất bản chuẩn theo chương trình SGK Tin học 10'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                <th className="p-3">{bilingualMode === 'en' ? 'Terminology (Vi / En)' : 'Thuật ngữ (Vi / En)'}</th>
                <th className="p-3">{bilingualMode === 'en' ? 'IPA Transcription' : 'Phiên âm IPA'}</th>
                <th className="p-3">{bilingualMode === 'en' ? 'Definition & Textbook Context' : 'Định nghĩa & Ngữ cảnh SGK'}</th>
                <th className="p-3">{bilingualMode === 'en' ? 'Applied Example' : 'Ví dụ thực tế'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
              {LESSON_15_GLOSSARY.map((term) => (
                <tr key={term.id} className="hover:bg-slate-50 dark:hover:bg-slate-750/50 transition-colors">
                  <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                    <div>{bilingualMode === 'en' ? term.termEn : term.termVi}</div>
                    <div className="text-[11px] text-teal-600 dark:text-teal-400 font-mono">
                      {bilingualMode === 'en' ? term.termVi : term.termEn}
                    </div>
                  </td>
                  <td className="p-3 font-mono text-[11px] text-purple-600 dark:text-purple-400 whitespace-nowrap">
                    {term.ipa}
                  </td>
                  <td className="p-3">
                    <p className="text-slate-700 dark:text-slate-300">
                      {bilingualMode === 'en' ? term.definitionEn : term.definitionVi}
                    </p>
                    <p className="text-[11px] text-slate-400 italic mt-0.5">
                      {bilingualMode === 'en' ? `Textbook: ${term.sgkContext}` : term.sgkContext}
                    </p>
                  </td>
                  <td className="p-3 text-[11px] text-slate-500 dark:text-slate-400">
                    {bilingualMode === 'en' ? term.exampleEn : term.exampleVi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={15} />

      {/* Back to section 4 navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={prevPage}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: Export PNG Lab' : 'Quay lại: Xuất tệp ảnh PNG'}</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          {bilingualMode === 'en'
            ? 'Completed Lesson 15 • Pages 82 – 85 Informatics 10'
            : 'Hoàn thành Bài 15 • Trang 82 – 85 SGK Tin học 10'}
        </span>
      </div>
    </div>
  );
};
