import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Palette,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Check,
  Eye,
  PenTool,
  Droplet,
  Layers,
  Sparkles
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section13FillAndStroke: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Dialog Active Tab: Fill, Stroke paint, Stroke style
  const [activeTab, setActiveTab] = useState<'fill' | 'stroke_paint' | 'stroke_style'>('fill');

  // Fill settings
  const [fillType, setFillType] = useState<'flat' | 'linear' | 'radial' | 'none'>('linear');
  const [fillColor1, setFillColor1] = useState<string>('#3b82f6');
  const [fillColor2, setFillColor2] = useState<string>('#9333ea');
  const [opacity, setOpacity] = useState<number>(100);

  // Stroke paint settings
  const [strokeType, setStrokeType] = useState<'flat' | 'none'>('flat');
  const [strokeColor, setStrokeColor] = useState<string>('#f59e0b');

  // Stroke style settings
  const [strokeWidth, setStrokeWidth] = useState<number>(6);
  const [dashPattern, setDashPattern] = useState<string>('none'); // 'none', '8 6', '4 4', '12 4 4 4'
  const [lineCap, setLineCap] = useState<'butt' | 'round' | 'square'>('round');

  // Quiz state 1 & 2 (p. 71)
  const [q1Answer, setQ1Answer] = useState<string | null>(null);
  const [q1Checked, setQ1Checked] = useState<boolean>(false);
  const [q2Answer, setQ2Answer] = useState<string | null>(null);
  const [q2Checked, setQ2Checked] = useState<boolean>(false);

  const sectionSpeechVi =
    'Mục 2: Thiết lập màu tô, màu vẽ và tô màu cho đối tượng, SGK Trang 70 và 71. Trong Inkscape, ta có thể thiết lập màu tô (Fill) và màu vẽ (Stroke) hoàn toàn độc lập với nhau thông qua hộp thoại Fill and Stroke (phím tắt Ctrl+Shift+F). Hộp thoại có 3 trang chính: Trang Fill chọn kiểu tô màu ruột; Trang Stroke paint chọn kiểu màu viền; Trang Stroke style thiết lập độ dày mỏng của nét vẽ và kiểu nét đứt. Các kiểu tô gồm: Không màu, Màu đồng nhất, Màu chuyển tuyến tính Linear gradient, và Màu chuyển xuyên tâm Radial gradient. Giá trị Opacity thể hiện độ trong suốt của đối tượng. Hộp Ghi nhớ 2: Có thể thiết lập màu tô, màu vẽ và các thuộc tính về màu tô và màu vẽ cho đối tượng.';
  const sectionSpeechEn =
    'Section 2: Configuring Fill, Stroke Paint, and Object Coloring, Textbook pages 70 and 71. Inkscape enables independent configuration of interior Fill and border Stroke via the Fill and Stroke dialog (shortcut Ctrl+Shift+F). The dialog features 3 tabs: Fill tab for interior shading; Stroke paint tab for outline color; Stroke style tab for stroke thickness and dash styles. Fill modes include No paint, Flat color, Linear gradient, and Radial gradient. Opacity dictates transparency. Summary Box 2: Users can customize fill color, stroke color, and styling attributes independently.';

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
      <div className="bg-gradient-to-r from-teal-600 via-indigo-700 to-purple-800 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 text-teal-100 text-xs font-semibold backdrop-blur-sm mb-3">
              <Palette className="w-3.5 h-3.5" />
              <span>
                <BilingualText vi="Mục 2 • Trang 70 – 71 SGK" en="Section 2 • Textbook pp. 70 – 71" />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="2. THIẾT LẬP MÀU TÔ, MÀU VẼ VÀ TÔ MÀU CHO ĐỐI TƯỢNG"
                en="2. CONFIGURING FILL, STROKE PAINT, AND STYLING"
              />
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Khám phá Hộp thoại Fill and Stroke (Ctrl+Shift+F): 3 trang chức năng, Linear/Radial Gradient, Stroke Style (Width, Dashes) và độ trong suốt Opacity."
                en="Explore the Fill and Stroke Dialog (Ctrl+Shift+F): 3 functional tabs, Linear/Radial Gradients, Stroke Styles (Width, Dashes), and Opacity."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Activity 2 Showcase: 5 Coloring Styles (Hình 13.3 SGK Trang 70) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-teal-500 text-white flex items-center justify-center font-bold text-xs">
              HĐ2
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              <BilingualText
                vi="Hoạt động 2: So sánh điểm khác nhau giữa 5 kiểu tô màu (Hình 13.3)"
                en="Activity 2: Comparing 5 Distinct Coloring Modes (Figure 13.3)"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">Hình 13.3 SGK</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
          <BilingualText
            vi="« Quan sát các hình sau và nhận xét các hình có điểm gì khác nhau: Màu đồng nhất, màu chuyển tuyến tính, màu chuyển tâm, hoa văn và độ mờ đục. »"
            en="« Observe the following figures and compare their styling characteristics: Flat color, linear gradient, radial gradient, pattern fill, and opacity. »"
          />
        </p>

        {/* 5 Swatches Gallery mirroring Hình 13.3 */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {/* Swatch 1: Flat Color */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-xl bg-emerald-600 border-2 border-emerald-800 shadow" />
            <div className="text-center">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                <BilingualText vi="1. Màu đồng nhất" en="1. Flat Color" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Flat color</div>
            </div>
          </div>

          {/* Swatch 2: Linear Gradient */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-400 border-2 border-emerald-800 shadow" />
            <div className="text-center">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                <BilingualText vi="2. Chuyển tuyến tính" en="2. Linear Gradient" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Linear gradient</div>
            </div>
          </div>

          {/* Swatch 3: Radial Gradient */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-xl bg-radial from-amber-200 via-emerald-600 to-emerald-950 border-2 border-emerald-800 shadow" />
            <div className="text-center">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                <BilingualText vi="3. Chuyển từ tâm" en="3. Radial Gradient" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Radial gradient</div>
            </div>
          </div>

          {/* Swatch 4: Pattern Fill */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2">
            <div
              className="w-16 h-16 rounded-xl border-2 border-emerald-800 shadow"
              style={{
                backgroundImage: 'radial-gradient(#10b981 2px, transparent 2px)',
                backgroundSize: '10px 10px',
                backgroundColor: '#ecfdf5'
              }}
            />
            <div className="text-center">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                <BilingualText vi="4. Mẫu hoa văn" en="4. Pattern Fill" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Pattern fill</div>
            </div>
          </div>

          {/* Swatch 5: Opacity */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col items-center space-y-2">
            <div className="w-16 h-16 rounded-xl bg-emerald-600/40 border-2 border-emerald-600 border-dashed shadow flex items-center justify-center text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
              Opacity 40%
            </div>
            <div className="text-center">
              <div className="font-bold text-xs text-slate-900 dark:text-white">
                <BilingualText vi="5. Trong suốt" en="5. Transparency" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Opacity / Alpha</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Inkscape Fill and Stroke Simulator (Hình 13.4 SGK Trang 70) */}
      <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Dialog Header Window Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sliders className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm sm:text-base text-white">
              <BilingualText
                vi="Hộp thoại Fill and Stroke (Mô phỏng Inkscape 1.0.1)"
                en="Fill and Stroke Dialog (Inkscape 1.0.1 Simulator)"
              />
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Ctrl + Shift + F</span>
        </div>

        {/* 3 Dialog Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/90 text-xs font-bold">
          <button
            onClick={() => setActiveTab('fill')}
            className={`flex-1 py-3 px-4 border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'fill'
                ? 'border-teal-500 text-teal-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <div className="w-3.5 h-3.5 rounded bg-teal-500" />
            <span>
              <BilingualText vi="Trang Fill (Màu tô)" en="Fill Tab" />
            </span>
          </button>

          <button
            onClick={() => setActiveTab('stroke_paint')}
            className={`flex-1 py-3 px-4 border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'stroke_paint'
                ? 'border-indigo-500 text-indigo-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <div className="w-3.5 h-3.5 rounded border-2 border-indigo-500" />
            <span>
              <BilingualText vi="Trang Stroke paint (Màu vẽ)" en="Stroke Paint Tab" />
            </span>
          </button>

          <button
            onClick={() => setActiveTab('stroke_style')}
            className={`flex-1 py-3 px-4 border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'stroke_style'
                ? 'border-purple-500 text-purple-300 bg-slate-800/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <div className="w-3.5 h-1 border-b-2 border-dashed border-purple-500" />
            <span>
              <BilingualText vi="Trang Stroke style (Kiểu nét vẽ)" en="Stroke Style Tab" />
            </span>
          </button>
        </div>

        {/* Dialog Body with Preview */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Live SVG Render Canvas */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
            <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-xl">
              <defs>
                <linearGradient id="dialogLinearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={fillColor1} />
                  <stop offset="100%" stopColor={fillColor2} />
                </linearGradient>
                <radialGradient id="dialogRadialGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor={fillColor1} />
                  <stop offset="100%" stopColor={fillColor2} />
                </radialGradient>
              </defs>

              {/* Background checkerboard for transparency */}
              <rect x="5" y="5" width="210" height="210" fill="#0f172a" rx="12" />

              {/* Main Styled Geometry */}
              <rect
                x="35"
                y="35"
                width="150"
                height="150"
                rx="20"
                fill={
                  fillType === 'flat'
                    ? fillColor1
                    : fillType === 'linear'
                    ? 'url(#dialogLinearGrad)'
                    : fillType === 'radial'
                    ? 'url(#dialogRadialGrad)'
                    : 'none'
                }
                fillOpacity={opacity / 100}
                stroke={strokeType === 'flat' ? strokeColor : 'none'}
                strokeWidth={strokeWidth}
                strokeDasharray={dashPattern === 'none' ? undefined : dashPattern}
                strokeLinecap={lineCap}
                className="transition-all duration-200"
              />
            </svg>

            <div className="mt-3 text-center text-xs font-mono text-slate-400">
              Fill: {fillType} • Stroke: {strokeWidth}px ({dashPattern === 'none' ? 'Solid' : 'Dashed'}) • Opacity: {opacity}%
            </div>
          </div>

          {/* Tab Options Controls */}
          <div className="space-y-5">
            {activeTab === 'fill' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-2">
                    <BilingualText vi="Kiểu tô màu (Fill Paint Mode):" en="Fill Paint Mode:" />
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'flat', vi: 'Màu đồng nhất (Flat)', en: 'Flat color' },
                      { id: 'linear', vi: 'Chuyển tuyến tính (Linear)', en: 'Linear gradient' },
                      { id: 'radial', vi: 'Chuyển xuyên tâm (Radial)', en: 'Radial gradient' },
                      { id: 'none', vi: 'Không màu (No paint - ✕)', en: 'No paint (✕)' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setFillType(mode.id as any)}
                        className={`p-2.5 rounded-xl border text-left font-semibold transition-all cursor-pointer ${
                          fillType === mode.id
                            ? 'bg-teal-600 text-white border-teal-500 shadow'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {bilingualMode === 'en' ? mode.en : mode.vi}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color swatches */}
                {fillType !== 'none' && (
                  <div className="space-y-3 p-3 rounded-2xl bg-slate-800/60 border border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300">Màu chính 1:</span>
                      <input
                        type="color"
                        value={fillColor1}
                        onChange={(e) => setFillColor1(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                    </div>

                    {(fillType === 'linear' || fillType === 'radial') && (
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-300">Màu chuyển 2:</span>
                        <input
                          type="color"
                          value={fillColor2}
                          onChange={(e) => setFillColor2(e.target.value)}
                          className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Opacity slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">Độ trong suốt tổng thể (Opacity %):</span>
                    <span className="font-mono text-teal-400 font-bold">{opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={opacity}
                    onChange={(e) => setOpacity(parseInt(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === 'stroke_paint' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-2">
                    Kiểu màu vẽ viền (Stroke Paint):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setStrokeType('flat')}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all cursor-pointer ${
                        strokeType === 'flat'
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      Màu đồng nhất (Flat color)
                    </button>
                    <button
                      onClick={() => setStrokeType('none')}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all cursor-pointer ${
                        strokeType === 'none'
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      Không viền (No paint - ✕)
                    </button>
                  </div>
                </div>

                {strokeType === 'flat' && (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/60 border border-slate-700">
                    <span className="font-semibold text-slate-300">Chọn màu viền:</span>
                    <input
                      type="color"
                      value={strokeColor}
                      onChange={(e) => setStrokeColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'stroke_style' && (
              <div className="space-y-4 text-xs">
                {/* Width Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-semibold">Độ dày nét vẽ (Width):</span>
                    <span className="font-mono text-purple-400 font-bold">{strokeWidth} px</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={strokeWidth}
                    onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                {/* Dashes Selection */}
                <div>
                  <label className="font-bold text-slate-300 block mb-2">
                    Kiểu nét vẽ (Dashes - Nét đứt):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'none', label: 'Nét liền (Solid)' },
                      { id: '8 6', label: 'Nét đứt thưa (Dash)' },
                      { id: '3 3', label: 'Nét chấm ngắn (Dot)' },
                      { id: '12 4 3 4', label: 'Chấm gạch (Dash-Dot)' }
                    ].map((pattern) => (
                      <button
                        key={pattern.id}
                        onClick={() => setDashPattern(pattern.id)}
                        className={`p-2.5 rounded-xl border text-left font-semibold transition-all cursor-pointer ${
                          dashPattern === pattern.id
                            ? 'bg-purple-600 text-white border-purple-500 shadow'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                        }`}
                      >
                        {pattern.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Caps */}
                <div>
                  <label className="font-bold text-slate-300 block mb-2">
                    Đầu mút nét vẽ (Cap):
                  </label>
                  <div className="flex gap-2">
                    {(['butt', 'round', 'square'] as const).map((cap) => (
                      <button
                        key={cap}
                        onClick={() => setLineCap(cap)}
                        className={`flex-1 py-2 rounded-xl text-center font-bold capitalize transition-all cursor-pointer ${
                          lineCap === cap
                            ? 'bg-purple-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary Box 2 (Hộp Ghi nhớ 2 Trang 71) */}
      <div className="bg-gradient-to-r from-teal-500/10 via-teal-500/5 to-transparent border-l-4 border-teal-500 p-5 rounded-r-2xl space-y-2">
        <div className="flex items-center gap-2 text-teal-900 dark:text-teal-300 font-bold text-sm">
          <BookOpen className="w-4 h-4" />
          <BilingualText vi="HỘP GHI NHỚ 2 (SGK TRANG 71)" en="SUMMARY BOX 2 (PAGE 71)" />
        </div>
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          <BilingualText
            vi="« Có thể thiết lập màu tô, màu vẽ và các thuộc tính về màu tô và màu vẽ cho đối tượng. »"
            en="« Users can configure fill colors, stroke colors, and their styling parameters independently for any graphic object. »"
          />
        </p>
      </div>

      {/* In-Lesson Concept Checks (SGK Trang 71) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Question 1 */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <HelpCircle className="w-4 h-4" />
            <span>
              <BilingualText vi="Câu hỏi 1 (SGK Trang 71)" en="Question 1 (Textbook Page 71)" />
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
            <BilingualText
              vi="Để xác định đường viền của đối tượng dạng nét đứt, em cần chọn trang nào trong hộp thoại Fill and Stroke?"
              en="To configure dashed borders for an object, which tab in the Fill and Stroke dialog should you choose?"
            />
          </p>

          <div className="space-y-2">
            {[
              { id: 'A', vi: 'A. Fill', en: 'A. Fill' },
              { id: 'B', vi: 'B. Stroke paint', en: 'B. Stroke paint' },
              { id: 'C', vi: 'C. Stroke style', en: 'C. Stroke style' },
              { id: 'D', vi: 'D. Cả A và B', en: 'D. Both A and B' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setQ1Answer(opt.id);
                  setQ1Checked(true);
                }}
                className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                  q1Answer === opt.id
                    ? opt.id === 'C'
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow'
                      : 'bg-rose-500 text-white border-rose-600 shadow'
                    : 'bg-slate-50 dark:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{bilingualMode === 'en' ? opt.en : opt.vi}</span>
                {q1Checked && opt.id === 'C' && <Check className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>

          {q1Checked && (
            <div className={`p-3 rounded-xl text-xs ${
              q1Answer === 'C' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
            }`}>
              <BilingualText
                vi="Đáp án đúng: C. Stroke style. Trang này chứa thiết lập Dashes (kiểu nét đứt) và Width (độ dày nét)."
                en="Correct answer: C. Stroke style. This tab contains Dashes pattern and Width thickness settings."
              />
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <HelpCircle className="w-4 h-4" />
            <span>
              <BilingualText vi="Câu hỏi 2 (SGK Trang 71)" en="Question 2 (Textbook Page 71)" />
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
            <BilingualText
              vi="Để chỉnh thông số của gradient (hướng chuyển màu, điểm dừng), em cần chọn biểu tượng nào trong hộp thoại?"
              en="To adjust gradient parameters (color direction, stops), which tool icon should you select?"
            />
          </p>

          <div className="space-y-2">
            {[
              { id: 'A', vi: 'A. Biểu tượng dấu cộng (+)', en: 'A. Plus icon (+)' },
              { id: 'B', vi: 'B. Biểu tượng cây bút chỉnh gradient (Create and edit gradients)', en: 'B. Create and edit gradients pen tool' },
              { id: 'C', vi: 'C. Biểu tượng ống hút màu Dropper', en: 'C. Color dropper tool' },
              { id: 'D', vi: 'D. Biểu tượng dấu trừ (-)', en: 'D. Minus icon (-)' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setQ2Answer(opt.id);
                  setQ2Checked(true);
                }}
                className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                  q2Answer === opt.id
                    ? opt.id === 'B'
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow'
                      : 'bg-rose-500 text-white border-rose-600 shadow'
                    : 'bg-slate-50 dark:bg-slate-750 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{bilingualMode === 'en' ? opt.en : opt.vi}</span>
                {q2Checked && opt.id === 'B' && <Check className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>

          {q2Checked && (
            <div className={`p-3 rounded-xl text-xs ${
              q2Answer === 'B' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200' : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
            }`}>
              <BilingualText
                vi="Đáp án đúng: B. Biểu tượng cây bút chỉnh gradient. Nháy vào cây bút để kéo thả các điểm dừng màu (gradient stops) trực tiếp trên vùng vẽ."
                en="Correct answer: B. Gradient edit tool. Click the pen icon to drag gradient stops directly on the canvas."
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={prevPage}
          className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>
            <BilingualText vi="Quay lại: 1. Các đối tượng hình khối" en="Back: 1. Primitive Shapes" />
          </span>
        </button>

        <button
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <span>
            <BilingualText vi="Tiếp tục: 3. Các phép ghép đối tượng đồ hoạ" en="Next: 3. Boolean Path Operations" />
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pedagogical Prompts for Teachers */}
      <TeacherPromptsWidget sectionIndex={2} lessonId={13} />
    </div>
  );
};
