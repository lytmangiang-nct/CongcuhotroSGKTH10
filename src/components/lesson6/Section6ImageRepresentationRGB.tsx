import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Palette,
  Eye,
  Sliders,
  Layers,
  Info,
  CheckCircle2,
  Cpu,
  Monitor,
  Binary
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section6ImageRepresentationRGB: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    prevPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive Color Mixer States
  const [red, setRed] = useState<number>(244);
  const [green, setGreen] = useState<number>(63);
  const [blue, setBlue] = useState<number>(94);
  const [activeBitMode, setActiveBitMode] = useState<'rgb24' | 'gray8' | 'mono1'>('rgb24');

  const speechVi =
    'Mục 2a: Biểu diễn hình ảnh và Hệ màu RGB. Màn hình máy tính sử dụng hệ màu cộng gồm 3 màu cơ bản: Đỏ (Red), Xanh lá cây (Green) và Xanh dương (Blue). Điểm ảnh là pixel, phần tử ảnh nhỏ nhất. Ảnh màu 24 bit thông dụng mã hoá mỗi màu cơ bản bằng 8 bit từ 0 đến 255, tạo ra khoảng 16,7 triệu màu sắc.';

  const speechEn =
    'Section 2a: Image Representation and the RGB Color Model. Display screens utilize the additive color model of three primaries: Red, Green, and Blue. The smallest picture element is a pixel. Standard 24-bit color images allocate 8 bits per channel (0 to 255), producing approximately 16.7 million distinct hues.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  // Convert numbers to hex and binary strings
  const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
  const hexCode = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  const binR = red.toString(2).padStart(8, '0');
  const binG = green.toString(2).padStart(8, '0');
  const binB = blue.toString(2).padStart(8, '0');

  // Grayscale value (standard luminance formula)
  const grayVal = Math.round(0.299 * red + 0.587 * green + 0.114 * blue);
  const monoVal = grayVal >= 128 ? 1 : 0;

  // Presets from textbook
  const presets = [
    { nameVi: 'Đỏ (Red)', nameEn: 'Red', r: 255, g: 0, b: 0 },
    { nameVi: 'Lục (Green)', nameEn: 'Green', r: 0, g: 255, b: 0 },
    { nameVi: 'Lam (Blue)', nameEn: 'Blue', r: 0, g: 0, b: 255 },
    { nameVi: 'Vàng (Yellow)', nameEn: 'Yellow', r: 255, g: 255, b: 0 },
    { nameVi: 'Xanh lơ (Cyan)', nameEn: 'Cyan', r: 0, g: 255, b: 255 },
    { nameVi: 'Hồng tím (Magenta)', nameEn: 'Magenta', r: 255, g: 0, b: 255 },
    { nameVi: 'Trắng (White)', nameEn: 'White', r: 255, g: 255, b: 255 },
    { nameVi: 'Đen (Black)', nameEn: 'Black', r: 0, g: 0, b: 0 }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300">
              {bilingualMode === 'en' ? 'Section 2a' : 'Mục 2a'}
            </span>
            <span className="text-xs text-slate-500 font-mono">SGK Trang 30</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(30);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{bilingualMode === 'en' ? 'Page 30 Scan' : 'Bản quét Tr. 30'}</span>
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="2. Biểu diễn hình ảnh: a) Hệ màu RGB & Điểm ảnh (Pixel)"
              en="2. Image Representation: a) RGB Color Model & Pixels"
            />
          </h2>
        </div>
      </div>

      {/* Activity 2 & Additive Color Model Theory (SGK Trang 30) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 px-2 py-0.5 rounded">
                {bilingualMode === 'en' ? 'Activity 2' : 'Hoạt động 2'}
              </span>
              <span className="text-xs text-slate-400 font-mono">SGK Trang 30</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Mô hình phối màu cộng RGB (Additive Color Model)"
                en="RGB Additive Color Mixing Model"
              />
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              <BilingualText
                vi="Màn hình máy tính, điện thoại, tivi phát sáng dựa trên 3 màu cơ bản: Đỏ (Red), Lục (Green) và Lam (Blue). Đây là mô hình màu cộng vì các chùm sáng được cộng dồn trực tiếp vào mắt người."
                en="Computer monitors, phone screens, and TVs emit light based on three primary colors: Red, Green, and Blue. This is an additive model because light rays combine directly into our photoreceptors."
              />
            </p>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                {bilingualMode === 'en' ? 'Key SGK Combinations:' : 'Quy tắc pha màu cộng SGK:'}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                  <span>Đỏ + Lục = <strong>Vàng (Yellow)</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
                  <span>Lục + Lam = <strong>Xanh lơ (Cyan)</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-pink-500 inline-block" />
                  <span>Đỏ + Lam = <strong>Hồng tím (Magenta)</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-white border border-slate-300 inline-block" />
                  <span>Đỏ + Lục + Lam = <strong>Trắng (White)</strong></span>
                </span>
              </div>
            </div>
          </div>

          {/* Additive Circles SVG Illustration */}
          <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
            <svg className="w-48 h-48" viewBox="0 0 200 200">
              <defs>
                <filter id="blendMix">
                  <feBlend mode="screen" />
                </filter>
              </defs>
              {/* Red Circle */}
              <circle cx="100" cy="70" r="45" fill="#ff0000" style={{ mixBlendMode: 'screen' }} opacity="0.85" />
              {/* Green Circle */}
              <circle cx="70" cy="120" r="45" fill="#00ff00" style={{ mixBlendMode: 'screen' }} opacity="0.85" />
              {/* Blue Circle */}
              <circle cx="130" cy="120" r="45" fill="#0000ff" style={{ mixBlendMode: 'screen' }} opacity="0.85" />

              <text x="100" y="45" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">RED</text>
              <text x="45" y="145" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">GREEN</text>
              <text x="155" y="145" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle">BLUE</text>
              <text x="100" y="105" fill="#000" fontSize="10" fontWeight="black" textAnchor="middle">WHITE</text>
            </svg>
            <span className="text-[10px] text-slate-400 font-mono mt-1">
              {bilingualMode === 'en' ? 'Additive Light Spectrum' : 'Hệ màu cộng quang phổ RGB'}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive RGB Color Mixer & Subpixel Microscope Simulator */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              {bilingualMode === 'en' ? 'Interactive Microscope' : 'Kính hiển vi tương tác'}
            </span>
            <h3 className="font-bold text-base sm:text-lg text-slate-100">
              <BilingualText
                vi="Bộ phối màu RGB & Mô phỏng Subpixel màn hình LED"
                en="RGB Color Mixer & Screen Subpixel Diode Simulator"
              />
            </h3>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveBitMode('rgb24')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeBitMode === 'rgb24'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              24-bit True Color (16.7M)
            </button>
            <button
              type="button"
              onClick={() => setActiveBitMode('gray8')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeBitMode === 'gray8'
                  ? 'bg-slate-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              8-bit Xám (256)
            </button>
            <button
              type="button"
              onClick={() => setActiveBitMode('mono1')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeBitMode === 'mono1'
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1-bit Đen/Trắng (2)
            </button>
          </div>
        </div>

        {/* Color Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 shrink-0 mr-1 font-semibold">
            {bilingualMode === 'en' ? 'Presets:' : 'Màu mẫu:'}
          </span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setRed(p.r);
                setGreen(p.g);
                setBlue(p.b);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-medium shrink-0 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/30 shrink-0"
                style={{ backgroundColor: `rgb(${p.r}, ${p.g}, ${p.b})` }}
              />
              <span>{bilingualMode === 'en' ? p.nameEn : p.nameVi}</span>
            </button>
          ))}
        </div>

        {/* Sliders & Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sliders Column */}
          <div className="lg:col-span-6 space-y-4 bg-slate-900/80 p-5 rounded-xl border border-slate-800">
            {/* Red Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Red (Đỏ)</span>
                </span>
                <span className="font-mono text-rose-300 font-bold bg-rose-950/60 px-2 py-0.5 rounded border border-rose-900">
                  {red} (8-bit: {binR})
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={255}
                value={red}
                onChange={(e) => setRed(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {/* Green Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Green (Lục)</span>
                </span>
                <span className="font-mono text-emerald-300 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900">
                  {green} (8-bit: {binG})
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={255}
                value={green}
                onChange={(e) => setGreen(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Blue Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-sky-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  <span>Blue (Lam)</span>
                </span>
                <span className="font-mono text-sky-300 font-bold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-900">
                  {blue} (8-bit: {binB})
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={255}
                value={blue}
                onChange={(e) => setBlue(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Binary 24-bit Output */}
            <div className="pt-2 border-t border-slate-800 space-y-1 text-xs">
              <div className="text-slate-400 flex items-center gap-1">
                <Binary className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mã nhị phân 24-bit lưu trong RAM máy tính (3 bytes):</span>
              </div>
              <div className="p-2 rounded bg-black font-mono text-xs text-center border border-slate-800 tracking-wider">
                <span className="text-rose-400">{binR}</span>{' '}
                <span className="text-emerald-400">{binG}</span>{' '}
                <span className="text-sky-400">{binB}</span>
              </div>
            </div>
          </div>

          {/* Color Preview & Subpixel Microscope */}
          <div className="lg:col-span-6 space-y-4">
            {/* Color Preview Box */}
            <div
              className="h-32 rounded-xl shadow-lg border-2 border-white/20 flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden"
              style={{
                backgroundColor:
                  activeBitMode === 'rgb24'
                    ? `rgb(${red}, ${green}, ${blue})`
                    : activeBitMode === 'gray8'
                    ? `rgb(${grayVal}, ${grayVal}, ${grayVal})`
                    : monoVal === 1 ? '#ffffff' : '#000000'
              }}
            >
              <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-center space-y-0.5 shadow-xl">
                <div className="font-black font-mono text-lg tracking-wider text-white">
                  {activeBitMode === 'rgb24'
                    ? hexCode
                    : activeBitMode === 'gray8'
                    ? `Gray: ${grayVal}/255`
                    : `Mono: ${monoVal} (${monoVal === 1 ? 'White' : 'Black'})`}
                </div>
                <div className="text-[11px] font-mono text-slate-300">
                  {activeBitMode === 'rgb24'
                    ? `rgb(${red}, ${green}, ${blue})`
                    : activeBitMode === 'gray8'
                    ? `8-bit: ${grayVal.toString(2).padStart(8, '0')}`
                    : `1-bit: ${monoVal}`}
                </div>
              </div>
            </div>

            {/* Subpixel Diode Microscope */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-amber-400" />
                  <BilingualText
                    vi="Kính hiển vi: Cấu trúc 3 đi-ốt Subpixel (R, G, B)"
                    en="Microscope: 3 Subpixel Diodes (R, G, B)"
                  />
                </span>
                <span className="text-[10px] text-slate-400 font-mono">1 Single Pixel</span>
              </div>

              {/* Simulated Subpixel LCD bars */}
              <div className="h-20 bg-black rounded-lg border-2 border-slate-700 p-2 grid grid-cols-3 gap-2">
                {/* Red Subpixel */}
                <div
                  className="rounded flex flex-col justify-end p-1 transition-all border border-red-900/50"
                  style={{
                    backgroundColor: `rgb(${red}, 0, 0)`,
                    boxShadow: red > 30 ? `0 0 ${red / 15}px rgba(239,68,68,0.8)` : 'none'
                  }}
                >
                  <span className="text-[9px] font-mono font-bold text-white text-center">
                    R:{red}
                  </span>
                </div>

                {/* Green Subpixel */}
                <div
                  className="rounded flex flex-col justify-end p-1 transition-all border border-green-900/50"
                  style={{
                    backgroundColor: `rgb(0, ${green}, 0)`,
                    boxShadow: green > 30 ? `0 0 ${green / 15}px rgba(34,197,94,0.8)` : 'none'
                  }}
                >
                  <span className="text-[9px] font-mono font-bold text-white text-center">
                    G:{green}
                  </span>
                </div>

                {/* Blue Subpixel */}
                <div
                  className="rounded flex flex-col justify-end p-1 transition-all border border-blue-900/50"
                  style={{
                    backgroundColor: `rgb(0, 0, ${blue})`,
                    boxShadow: blue > 30 ? `0 0 ${blue / 15}px rgba(59,130,246,0.8)` : 'none'
                  }}
                >
                  <span className="text-[9px] font-mono font-bold text-white text-center">
                    B:{blue}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                <BilingualText
                  vi="Khi nhìn từ khoảng cách thông thường, mắt người không phân biệt được 3 dải màu riêng biệt mà cảm nhận thành một điểm màu đồng nhất duy nhất!"
                  en="At standard viewing distances, human vision cannot resolve the 3 separate diodes and perceives a single blended luminous color!"
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Bit-Depth Levels Comparison Cards (SGK Trang 30) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 24-bit True Color */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              24 bit • True Color
            </span>
            <span className="text-xs font-mono font-bold text-rose-600">3 Bytes/pixel</span>
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            <BilingualText vi="Ảnh màu thông dụng (RGB)" en="Standard 24-bit Color" />
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Mỗi màu cơ bản dùng 8 bit (256 sắc độ). Tổng cộng tạo ra 256³ ≈ 16,7 triệu màu sắc tinh tế, mắt người không thể phân biệt ranh giới."
              en="Each channel uses 8 bits (256 levels). Yields 256³ ≈ 16.7 million rich colors, exceeding human eye color discrimination limits."
            />
          </p>
        </div>

        {/* 8-bit Grayscale */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
              8 bit • Grayscale
            </span>
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">1 Byte/pixel</span>
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            <BilingualText vi="Ảnh đen trắng ghi xám" en="8-bit Grayscale Image" />
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Mỗi điểm ảnh chỉ cần 8 bit để lưu mức độ sáng, tạo ra 256 sắc độ xám từ đen hoàn toàn (0) đến trắng tinh (255)."
              en="Each pixel requires 8 bits to store brightness, producing 256 shades of gray from pure black (0) to pure white (255)."
            />
          </p>
        </div>

        {/* 1-bit Monochrome */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              1 bit • Monochrome
            </span>
            <span className="text-xs font-mono font-bold text-amber-600">1/8 Byte/pixel</span>
          </div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
            <BilingualText vi="Ảnh đen trắng thuần túy" en="1-bit Monochrome Image" />
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <BilingualText
              vi="Mỗi điểm ảnh chỉ có 1 bit duy nhất (0 là đen, 1 là trắng). Điển hình trong máy fax, máy in nhiệt hoá đơn, bảng LED quảng cáo."
              en="Each pixel is encoded by 1 bit (0 for black, 1 for white). Common in fax machines, receipt thermal printers, and LED marquees."
            />
          </p>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={6} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: Bitrate & Formats' : 'Quay lại: Tốc độ bit'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: Bitmap & Image Formats' : 'Tiếp theo: Ảnh Bitmap & Định dạng tệp'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
