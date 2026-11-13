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
  Flag,
  Globe,
  Compass,
  Check,
  RotateCcw,
  Sliders,
  Eye,
  ArrowLeft,
  Type,
  PenTool,
  Apple
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { LESSON_14_GLOSSARY } from '../../data/lesson14Data';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section14PracticeApply: React.FC = () => {
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
  const [showApply1, setShowApply1] = useState(true);
  const [showApply2, setShowApply2] = useState(false);

  // Practice 1: S-Curve Wave Text sandbox (Page 81)
  const [hasEditedWaveText, setHasEditedWaveText] = useState(false);
  const [waveText, setWaveText] = useState('TIN HỌC 10 - KNTT');
  const [waveFrequency, setWaveFrequency] = useState(1);
  const [waveHeight, setWaveHeight] = useState(30);

  // Practice 2: Apple from Primitive (Page 81)
  const [appleColor, setAppleColor] = useState('#ef4444');
  const [appleIndentation, setAppleIndentation] = useState(15);

  // Apply 1: Circular School Emblem Badge (Page 81)
  const [hasEditedEmblem, setHasEditedEmblem] = useState(false);
  const [schoolName, setSchoolName] = useState('TRƯỜNG THPT CHUYÊN HÀ NỘI - AMSTERDAM');
  const [badgeMotto, setBadgeMotto] = useState('TRI THỨC VÀ SÁNG TẠO • 2026');

  // Sync bilingual default texts if student hasn't touched the inputs
  React.useEffect(() => {
    if (!hasEditedWaveText) {
      setWaveText(bilingualMode === 'en' ? 'INFORMATICS 10 - CONNECTING' : 'TIN HỌC 10 - KNTT');
    }
  }, [bilingualMode, hasEditedWaveText]);

  React.useEffect(() => {
    if (!hasEditedEmblem) {
      setSchoolName(
        bilingualMode === 'en'
          ? 'HANOI - AMSTERDAM HIGH SCHOOL FOR THE GIFTED'
          : 'TRƯỜNG THPT CHUYÊN HÀ NỘI - AMSTERDAM'
      );
      setBadgeMotto(
        bilingualMode === 'en' ? 'KNOWLEDGE AND CREATIVITY • 2026' : 'TRI THỨC VÀ SÁNG TẠO • 2026'
      );
    }
  }, [bilingualMode, hasEditedEmblem]);

  const sectionSpeechVi =
    'Mục 5: Luyện tập và Vận dụng - Trang 81 SGK Tin học 10. Phần luyện tập gồm 2 bài tập: Luyện tập 1: Uốn dòng chữ TIN HỌC 10 theo dải sóng lượn chữ S bằng lệnh Text / Put on Path. Luyện tập 2: Tạo hình quả táo từ hình tròn bằng cách dùng Object to Path rồi nắn chỉnh điểm neo góc ở cuống và đáy lõm. Phần Vận dụng yêu cầu thiết kế huy hiệu trường học hình tròn có dòng chữ uốn cong theo vành tròn và vẽ thiệp chúc mừng năm mới. Mời các em làm bài kiểm tra trắc nghiệm 10 câu để nhận chứng chỉ điện tử KNTT10-B14!';
  const sectionSpeechEn =
    'Section 5: Practice & Application - Page 81 of Informatics 10 Textbook. Practice features 2 hands-on projects: Practice 1: Flow the text TIN HOC 10 along an S-shaped wave using Text / Put on Path. Practice 2: Model an organic apple from a circle primitive by converting to Path and sculpting corner nodes at top stem and bottom cleft. Application challenges include designing a circular school crest emblem with circular text and drafting festive greeting banners. Complete the 10-question mastery quiz to claim your verified certificate!';

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
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-cyan-700 via-indigo-800 to-purple-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Award className="w-8 h-8 text-yellow-300" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-yellow-400/20 border border-yellow-300/40 rounded-full text-xs font-semibold text-yellow-200 uppercase tracking-wider mb-1">
                <BilingualText
                  vi="Phần 5 • Luyện tập & Vận dụng (Trang 81)"
                  en="Section 5 • Practice & Apply (Page 81)"
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
          PRACTICE 1: S-CURVE WAVE TEXT (Page 81)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <button
          onClick={() => setShowPractice1(!showPractice1)}
          className="w-full p-5 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold flex items-center justify-center text-sm">
              LT1
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Type className="w-4 h-4 text-cyan-500" />
                <BilingualText
                  vi="Luyện tập 1: Uốn dòng chữ theo dải sóng lượn chữ S (Trang 81)"
                  en="Practice 1: Flow Text Along an S-Shaped Wave Path (Page 81)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Dùng Pen vẽ đường lượn sóng, gõ dòng chữ và áp dụng lệnh Text / Put on Path"
                  en="Draw an S-wave curve with Pen, draft greeting text, and apply Text / Put on Path"
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
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[280px] relative shadow-inner">
              <svg viewBox="-140 -60 280 120" className="w-full max-w-md h-44 select-none drop-shadow-xl">
                <defs>
                  {/* Dynamic S-curve wave */}
                  <path
                    id="sCurve"
                    d={`M -120,${waveHeight} Q -60,${-waveHeight} 0,0 T 120,${waveHeight}`}
                    fill="none"
                  />
                </defs>

                {/* Ribbon background ribbon fill */}
                <path
                  d={`M -120,${waveHeight} Q -60,${-waveHeight} 0,0 T 120,${waveHeight}`}
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="28"
                  strokeLinecap="round"
                  opacity="0.25"
                />

                {/* Guide path stroke */}
                <path
                  d={`M -120,${waveHeight} Q -60,${-waveHeight} 0,0 T 120,${waveHeight}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />

                {/* Curved Text running on S-curve */}
                <text fill="#38bdf8" fontSize="13" fontWeight="bold">
                  <textPath href="#sCurve" startOffset="50%" textAnchor="middle">
                    {waveText}
                  </textPath>
                </text>
              </svg>

              <div className="text-xs font-mono text-cyan-300 mt-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                <BilingualText vi="Lệnh: Text / Put on Path" en="Command: Text / Put on Path" />
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    <BilingualText vi="Dòng chữ uốn sóng:" en="Curved Wave Text Content:" />
                  </label>
                  <input
                    type="text"
                    value={waveText}
                    onChange={(e) => {
                      setHasEditedWaveText(true);
                      setWaveText(e.target.value);
                    }}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white font-semibold"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>
                      <BilingualText vi="Độ cao biên độ sóng (Wave height):" en="Wave amplitude height:" />
                    </span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">{waveHeight}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={waveHeight}
                    onChange={(e) => setWaveHeight(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          PRACTICE 2: APPLE FROM CIRCLE (Page 81)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <button
          onClick={() => setShowPractice2(!showPractice2)}
          className="w-full p-5 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center text-sm">
              LT2
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Apple className="w-4 h-4 text-rose-500" />
                <BilingualText
                  vi="Luyện tập 2: Vẽ quả táo bằng biến đổi hình tròn sang Path (Trang 81)"
                  en="Practice 2: Model an Organic Apple from Circle via Object to Path (Page 81)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Dùng Object to Path, chuyển đỉnh và đáy thành neo góc rồi kéo lõm vào trong"
                  en="Apply Object to Path, convert apex and bottom nodes to cusp nodes, indent inwards"
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
            {/* Visualizer */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[280px] relative shadow-inner">
              <svg viewBox="-80 -80 160 160" className="w-48 h-48 select-none drop-shadow-2xl">
                {/* Apple stalk */}
                <path d="M 0,-35 C 8,-55 20,-50 25,-60" fill="none" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
                {/* Little leaf on stalk */}
                <path d="M 12,-48 C 28,-56 32,-42 12,-48 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />

                {/* Apple Body with top/bottom indentations */}
                <path
                  d={`M 0,${-35 + appleIndentation} C 35,-65 65,-20 65,10 C 65,45 25,65 0,${55 - appleIndentation} C -25,65 -65,45 -65,10 C -65,-20 -35,-65 0,${-35 + appleIndentation} Z`}
                  fill={appleColor}
                  stroke="#991b1b"
                  strokeWidth="2.5"
                />

                {/* Specular highlight */}
                <path
                  d="M -35,-20 C -45,-5 -45,15 -35,28"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="0.45"
                />
              </svg>

              <div className="flex items-center gap-2 mt-2">
                {['#ef4444', '#dc2626', '#22c55e', '#eab308'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setAppleColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full border-2 ${
                      appleColor === c ? 'scale-125 border-white shadow-md' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="lg:col-span-5 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                <h4 className="font-bold text-rose-950 dark:text-rose-200 mb-2">
                  <BilingualText
                    vi="Quy trình nắn chỉnh quả táo từ hình tròn:"
                    en="Apple Sculpting Workflow:"
                  />
                </h4>
                <ol className="space-y-1.5 text-xs list-decimal pl-4">
                  <li>
                    <BilingualText
                      vi="Vẽ hình tròn bằng Circles (F5)."
                      en="Draw a circle using Circles tool (F5)."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Chọn menu Path / Object to Path (Shift+Ctrl+C)."
                      en="Execute menu Path / Object to Path (Shift+Ctrl+C)."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Dùng Node (F2), chọn điểm neo đỉnh trên kéo trũng xuống làm hõm cuống táo."
                      en="Select Node tool (F2), select top node and drag downward to form the stem cleft."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Chọn điểm neo đáy dưới kéo nhẹ lên trong làm rốn quả táo."
                      en="Select the bottom cusp node and pull slightly inward to model the base indentation."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Dùng Pen vẽ thêm cuống lá cong và tô màu đỏ/xanh căng mọng!"
                      en="Use Pen tool to draw curved stem and leaf, applying crisp apple hues!"
                    />
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          APPLY 1: CIRCULAR SCHOOL CREST EMBLEM (Page 81)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <button
          onClick={() => setShowApply1(!showApply1)}
          className="w-full p-5 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors border-b border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center space-x-3 text-left">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold flex items-center justify-center text-sm">
              VD1
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-500" />
                <BilingualText
                  vi="Vận dụng 1: Thiết kế logo huy hiệu trường học hình tròn (Trang 81)"
                  en="Application 1: Circular School Crest Emblem Design (Page 81)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Uốn dòng chữ tên trường và khẩu hiệu chạy bám sát theo vành tròn huy hiệu"
                  en="Curve school name and graduation motto along concentric circular badge rings"
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
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[320px] relative shadow-inner">
              <svg viewBox="-110 -110 220 220" className="w-60 h-60 select-none drop-shadow-2xl">
                <defs>
                  {/* Top arc guide for school name */}
                  <path id="crestTopArc" d="M -85,0 A 85,85 0 1,1 85,0" fill="none" />
                  {/* Bottom arc guide for motto */}
                  <path id="crestBottomArc" d="M -75,0 A 75,75 0 0,0 75,0" fill="none" />
                </defs>

                {/* Outer decorative ring */}
                <circle cx="0" cy="0" r="102" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" />
                <circle cx="0" cy="0" r="95" fill="#1e1b4b" stroke="#3b82f6" strokeWidth="3" />

                {/* Inner emblem ring */}
                <circle cx="0" cy="0" r="62" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                {/* Central Open Book & Quill Icon */}
                <text x="0" y="8" fontSize="30" textAnchor="middle" fill="#ffffff">📖</text>
                <circle cx="-75" cy="0" r="3.5" fill="#f59e0b" />
                <circle cx="75" cy="0" r="3.5" fill="#f59e0b" />

                {/* School Name on Top Arc */}
                <text fill="#fbbf24" fontSize="8.5" fontWeight="bold" letterSpacing="0.8">
                  <textPath href="#crestTopArc" startOffset="50%" textAnchor="middle">
                    {schoolName}
                  </textPath>
                </text>

                {/* Motto on Bottom Arc */}
                <text fill="#ffffff" fontSize="7.5" fontWeight="semibold" letterSpacing="0.5">
                  <textPath href="#crestBottomArc" startOffset="50%" textAnchor="middle">
                    {badgeMotto}
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Customizer */}
            <div className="lg:col-span-5 space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  <BilingualText vi="Tên trường (Vành trên):" en="School Name (Top Arc):" />
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => {
                    setHasEditedEmblem(true);
                    setSchoolName(e.target.value);
                  }}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  <BilingualText vi="Khẩu hiệu / Năm thành lập (Vành dưới):" en="Motto / Founded Year (Bottom Arc):" />
                </label>
                <input
                  type="text"
                  value={badgeMotto}
                  onChange={(e) => {
                    setHasEditedEmblem(true);
                    setBadgeMotto(e.target.value);
                  }}
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                />
              </div>

              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800/50 text-indigo-950 dark:text-indigo-300">
                <BilingualText
                  vi="Thủ thuật Inkscape: Dùng công cụ Circles vẽ đường tròn phụ làm đường dẫn, chọn cả chữ và đường tròn rồi nhấn Text / Put on Path. Sau đó nháy vào đường tròn chọn viền Không màu để chữ hiển thị hoàn hảo!"
                  en="Inkscape Tip: Use Circles tool to draw a guide ring, select both text and the circle, then click Text / Put on Path. Finally set the circle's Stroke paint to None to keep only the circular text visible!"
                />
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
                vi="Bảng tra cứu thuật ngữ chuyên ngành (Glossary - Bài 14)"
                en="Specialized Terminology Reference (Lesson 14 Glossary)"
              />
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">10 Terms</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {LESSON_14_GLOSSARY.map((term) => (
            <div
              key={term.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/70 space-y-1 hover:border-cyan-400 dark:hover:border-cyan-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-cyan-600 dark:text-cyan-400 text-sm">
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
      <TeacherPromptsWidget sectionIndex={5} lessonId={14} />

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
          className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold transition-all shadow-md cursor-pointer"
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
