import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Grid,
  FileImage,
  Layers,
  HelpCircle,
  CheckCircle2,
  Check,
  X,
  Info,
  Maximize2,
  RotateCcw,
  Binary
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section6BitmapAndFormats: React.FC = () => {
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

  // 8x8 Pixel Grid Art state
  const INITIAL_GRID = [
    ['#ffffff', '#ffffff', '#ef4444', '#ffffff', '#ffffff', '#ef4444', '#ffffff', '#ffffff'],
    ['#ffffff', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ffffff'],
    ['#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444'],
    ['#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444'],
    ['#ffffff', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ffffff'],
    ['#ffffff', '#ffffff', '#ef4444', '#ef4444', '#ef4444', '#ef4444', '#ffffff', '#ffffff'],
    ['#ffffff', '#ffffff', '#ffffff', '#ef4444', '#ef4444', '#ffffff', '#ffffff', '#ffffff'],
    ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']
  ];

  const [pixelGrid, setPixelGrid] = useState<string[][]>(INITIAL_GRID);
  const [activeColor, setActiveColor] = useState<string>('#ef4444');

  // SGK Questions state
  const [q1Answered, setQ1Answered] = useState<boolean>(false);
  const [q2Answered, setQ2Answered] = useState<boolean>(false);

  const speechVi =
    'Mục 2b: Ảnh Bitmap và Định dạng tệp hình ảnh. Ảnh bitmap lưu thông tin màu sắc của từng điểm ảnh pixel. Định dạng BMP không nén, kích thước rất lớn. JPEG nén có mất mát, dung lượng nhẹ, phổ biến nhất trên Internet. PNG nén không mất mát và hỗ trợ nền trong suốt.';

  const speechEn =
    'Section 2b: Bitmap Graphics and Image File Formats. Bitmap images store the precise color value of each pixel coordinate. BMP is uncompressed with large file sizes. JPEG is lossy compressed, lightweight, and standard across the web. PNG is lossless and supports alpha-channel transparency.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? speechEn : speechVi);
    }
  };

  const handlePixelClick = (r: number, c: number) => {
    const nextGrid = pixelGrid.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === r && cIdx === c ? activeColor : cell))
    );
    setPixelGrid(nextGrid);
  };

  const handleResetGrid = () => {
    setPixelGrid(INITIAL_GRID);
  };

  const paletteColors = [
    '#ef4444', // Red
    '#22c55e', // Green
    '#3b82f6', // Blue
    '#eab308', // Yellow
    '#06b6d4', // Cyan
    '#a855f7', // Purple
    '#000000', // Black
    '#ffffff'  // White
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300">
              {bilingualMode === 'en' ? 'Section 2b' : 'Mục 2b'}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {bilingualMode === 'en' ? 'Textbook Pages 30 – 32' : 'SGK Trang 30 – 32'}
            </span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(31);
                setShowOriginalModal(true);
              }}
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>{bilingualMode === 'en' ? 'Page 31 Scan' : 'Bản quét Tr. 31'}</span>
            </button>
          </div>
          <h2
            data-en="Bitmap Graphics & File Formats (.bmp, .jpeg, .png)"
            data-vi="Ảnh Bitmap & Các định dạng tệp (.bmp, .jpeg, .png)"
            className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100"
          >
            <BilingualText
              vi="Ảnh Bitmap & Các định dạng tệp (.bmp, .jpeg, .png)"
              en="Bitmap Graphics & File Formats (.bmp, .jpeg, .png)"
            />
          </h2>
        </div>
      </div>

      {/* Interactive 8x8 Bitmap Pixel Matrix Canvas */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600/30 text-teal-400 border border-teal-500/40 flex items-center justify-center font-bold">
              <Grid className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-slate-100">
                <BilingualText
                  vi="Phòng vẽ ma trận điểm ảnh Bitmap (8 × 8 Pixels)"
                  en="Bitmap Pixel Matrix Interactive Canvas (8 × 8 Pixels)"
                />
              </h3>
              <p className="text-xs text-slate-400">
                <BilingualText
                  vi="Nhấp vào từng ô để vẽ và quan sát luồng nhị phân được máy tính ghi nhớ"
                  en="Click any pixel box to draw and inspect the raw binary byte stream"
                />
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetGrid}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Reset Heart' : 'Mẫu trái tim'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Pixel Grid Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-4">
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl">
              <div className="grid grid-cols-8 gap-1 w-64 h-64 sm:w-72 sm:h-72">
                {pixelGrid.map((row, rIdx) =>
                  row.map((color, cIdx) => (
                    <button
                      key={`${rIdx}-${cIdx}`}
                      type="button"
                      onClick={() => handlePixelClick(rIdx, cIdx)}
                      className="w-full h-full rounded-xs transition-transform hover:scale-105 border border-black/30 shadow-inner cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={`Pixel (${rIdx}, ${cIdx}): ${color}`}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Color Palette Selector */}
            <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 font-semibold mr-1">
                {bilingualMode === 'en' ? 'Color:' : 'Màu bút:'}
              </span>
              {paletteColors.map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setActiveColor(col)}
                  className={`w-6 h-6 rounded-md border transition-transform cursor-pointer ${
                    activeColor === col ? 'scale-125 border-white ring-2 ring-teal-500' : 'border-black/40 hover:scale-110'
                  }`}
                  style={{ backgroundColor: col }}
                />
              ))}
            </div>
          </div>

          {/* Binary & Raw Bitmap Data Breakdown */}
          <div className="lg:col-span-7 space-y-4 bg-slate-900/90 p-5 rounded-xl border border-slate-800">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-300">
                  {bilingualMode === 'en' ? 'Dimensions & Pixel Count:' : 'Kích thước & Tổng số điểm ảnh:'}
                </span>
                <span className="font-mono text-teal-400 font-bold">
                  8 × 8 = 64 pixels
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">
                  {bilingualMode === 'en' ? 'Uncompressed Bitmap Size (24-bit True Color):' : 'Dung lượng ảnh Bitmap 24-bit (3 bytes/pixel):'}
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  64 × 3 = 192 Bytes
                </span>
              </div>
            </div>

            {/* Simulated Byte Stream preview */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 font-mono">
                  <Binary className="w-3.5 h-3.5 text-teal-400" />
                  <span>{bilingualMode === 'en' ? 'Raw RGB Pixel Bytes:' : 'Dòng byte dữ liệu điểm ảnh (Raw RGB Bytes):'}</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Row 0 & 1 preview</span>
              </div>
              <div className="p-3 bg-black rounded-lg font-mono text-[11px] text-teal-300 space-y-1 overflow-x-auto border border-teal-950">
                <div className="text-slate-500 text-[10px]"># Row 0 (8 pixels × 3 bytes RGB):</div>
                <div className="tracking-wide">
                  {pixelGrid[0].slice(0, 4).map((c, i) => (
                    <span key={i} className="mr-2">
                      [{c.replace('#', '')}]
                    </span>
                  ))}
                  ...
                </div>
              </div>
            </div>

            <div className="p-3 bg-teal-950/30 rounded-lg border border-teal-800/40 text-xs text-teal-200">
              <BilingualText
                vi="Mỗi bức ảnh kỹ thuật số dù là chụp phong cảnh hay chân dung, bản chất sâu xa nhất bên trong máy tính cũng đều là một mảng hai chiều các ô vuông mang giá trị màu như trên."
                en="Every digital photo, whether a landscape or portrait, fundamentally resides inside computer RAM as a two-dimensional matrix of color-valued pixel coordinates."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Matrix of 4 Formats (SGK Trang 31) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <FileImage className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Bảng đối sánh các định dạng tệp hình ảnh thông dụng (SGK Trang 31)"
                en="Comparative Matrix of Standard Image File Formats (Page 31)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Hiểu rõ bản chất để lựa chọn định dạng tối ưu cho từng công việc"
                en="Understand trade-offs to choose the optimal format for each use case"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* BMP */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-lg text-slate-900 dark:text-slate-100">.BMP</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                  {bilingualMode === 'en' ? 'Uncompressed' : 'Không nén'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <BilingualText
                  vi="Định dạng bitmap của Windows. Giữ nguyên từng pixel mà không nén, kích thước tệp rất lớn, tải chậm trên mạng."
                  en="Windows native bitmap format. Stores uncompressed raw pixels, huge file size, slow to transmit across networks."
                />
              </p>
            </div>
            <div className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 border-t border-slate-200 dark:border-slate-700 pt-2">
              {bilingualMode === 'en' ? 'File Size: Very Large (Tens of MB)' : 'Dung lượng: Rất lớn (Hàng chục MB)'}
            </div>
          </div>

          {/* JPEG */}
          <div className="p-4 rounded-xl border-2 border-indigo-400/60 dark:border-indigo-600/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-lg text-indigo-700 dark:text-indigo-300">.JPEG / .JPG</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-600 text-white">
                  {bilingualMode === 'en' ? 'Lossy Compression' : 'Nén có mất mát'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <BilingualText
                  vi="Tỉ lệ nén rất cao, loại bỏ chi tiết mắt khó phân biệt. Rất phổ biến cho ảnh chụp trên Internet và điện thoại."
                  en="Very high compression ratio, discarding imperceptible details. Standard for photography on mobile and the web."
                />
              </p>
            </div>
            <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border-t border-indigo-100 dark:border-indigo-900/40 pt-2">
              {bilingualMode === 'en' ? 'File Size: Lightweight (A few hundred KB)' : 'Dung lượng: Nhẹ (Vài trăm KB)'}
            </div>
          </div>

          {/* PNG */}
          <div className="p-4 rounded-xl border-2 border-teal-400/60 dark:border-teal-600/60 bg-teal-50/40 dark:bg-teal-950/20 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-lg text-teal-700 dark:text-teal-300">.PNG</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-600 text-white">
                  {bilingualMode === 'en' ? 'Lossless Compression' : 'Nén không mất mát'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <BilingualText
                  vi="Hình ảnh sắc nét, nén không mất mát và đặc biệt có kênh trong suốt (Alpha) để thiết kế logo, biểu tượng đồ hoạ."
                  en="Lossless compression preserving crisp edges, with alpha transparency support for logos and graphic overlays."
                />
              </p>
            </div>
            <div className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 border-t border-teal-100 dark:border-teal-900/40 pt-2">
              {bilingualMode === 'en' ? 'Features: Crisp Alpha Transparency' : 'Hỗ trợ: Nền trong suốt sắc nét'}
            </div>
          </div>

          {/* GIF */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-black text-lg text-slate-900 dark:text-slate-100">.GIF</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                  {bilingualMode === 'en' ? 'Up to 256 Colors' : 'Tối đa 256 màu'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <BilingualText
                  vi="Giới hạn tối đa 256 màu (bảng màu 8-bit), hỗ trợ ảnh động ngắn và đơn giản cho biểu tượng cảm xúc."
                  en="Indexed color limited to 256 colors (8-bit palette), supports short simple animation clips and reaction stickers."
                />
              </p>
            </div>
            <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 border-t border-slate-200 dark:border-slate-700 pt-2">
              {bilingualMode === 'en' ? 'Feature: Short Animated Clips' : 'Đặc trưng: Ảnh động ngắn'}
            </div>
          </div>
        </div>
      </div>

      {/* Official Summary Box 2 (Hộp Ghi nhớ 2 SGK Trang 31) */}
      <div className="p-5 rounded-2xl bg-linear-to-r from-teal-500/10 via-teal-500/5 to-transparent border-2 border-teal-500/40 dark:border-teal-500/30 space-y-3">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText vi="Hộp Ghi nhớ 2 (SGK Trang 31)" en="Official Summary Box 2 (Page 31)" />
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <BilingualText
                vi="Ảnh số được lưu dưới dạng ảnh bitmap hoặc ảnh vector. Với ảnh bitmap, thông tin màu sắc của từng điểm ảnh (pixel) được lưu trữ."
                en="Digital images are stored as bitmaps or vector graphics. In bitmap images, the color data of every individual pixel is recorded."
              />
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <BilingualText
                vi="Định dạng ảnh thông dụng gồm BMP, JPEG, PNG."
                en="Common digital image formats include BMP, JPEG, and PNG."
              />
            </span>
          </li>
        </ul>
      </div>

      {/* SGK Page 31 & 32 Reinforcement Questions */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
              <BilingualText
                vi="Câu hỏi củng cố cuối mục 2 (SGK Trang 31 – 32)"
                en="Section 2 Check Questions (Pages 31 – 32)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Bấm nút xem gợi ý & lời giải chi tiết theo chuẩn SGK"
                en="Click to reveal pedagogical explanations and solutions"
              />
            </p>
          </div>
        </div>

        {/* Question 1 (Trang 31) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Question 1 (Page 31 SGK)' : 'Câu hỏi 1 (Trang 31 SGK)'}
            </span>
            <button
              type="button"
              onClick={() => setQ1Answered(!q1Answered)}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 underline cursor-pointer"
            >
              {q1Answered ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải') : (bilingualMode === 'en' ? 'Show Solution' : 'Xem lời giải')}
            </button>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="Trong hệ màu RGB, mỗi màu cơ bản được mã hoá bằng bao nhiêu bit? Có thể tạo ra bao nhiêu màu khác nhau?"
              en="In the RGB color model, how many bits encode each primary color? How many distinct colors can be formed?"
            />
          </p>
          {q1Answered && (
            <div className="p-3.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm text-teal-950 dark:text-teal-200 space-y-1 animate-in fade-in">
              <div className="font-bold">
                {bilingualMode === 'en' ? 'Official Solution:' : 'Lời giải chính thức:'}
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <BilingualText
                    vi="Mỗi màu cơ bản (Red, Green, Blue) được mã hoá bằng 8 bit (từ 0 đến 255)."
                    en="Each primary color (Red, Green, Blue) is encoded using 8 bits (integer values from 0 to 255)."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Tổng cộng 3 màu cơ bản cần 24 bit cho mỗi điểm ảnh."
                    en="In total, 3 primary channels require 24 bits for each pixel."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Số lượng màu khác nhau có thể tạo ra là 256 × 256 × 256 = 16.777.216 màu (xấp xỉ 16,7 triệu màu)."
                    en="The total number of distinct color combinations is 256 × 256 × 256 = 16,777,216 colors (approx. 16.7 million colors)."
                  />
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Question 2 (Trang 32) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Question 2 (Page 32 SGK)' : 'Câu hỏi 2 (Trang 32 SGK)'}
            </span>
            <button
              type="button"
              onClick={() => setQ2Answered(!q2Answered)}
              className="text-xs font-bold text-teal-600 hover:text-teal-700 underline cursor-pointer"
            >
              {q2Answered ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải') : (bilingualMode === 'en' ? 'Show Solution' : 'Xem lời giải')}
            </button>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            <BilingualText
              vi="Tại sao định dạng tệp ảnh .jpeg lại được sử dụng rất phổ biến trên Internet?"
              en="Why is the .jpeg image format exceptionally popular across the Internet?"
            />
          </p>
          {q2Answered && (
            <div className="p-3.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm text-teal-950 dark:text-teal-200 space-y-1 animate-in fade-in">
              <div className="font-bold">
                {bilingualMode === 'en' ? 'Official Solution:' : 'Lời giải chính thức:'}
              </div>
              <p>
                <BilingualText
                  vi="Theo mục Biểu diễn ảnh bitmap Trang 31 SGK: Định dạng .jpeg sử dụng phương pháp nén có mất mát nhưng loại bỏ những chi tiết mà mắt người khó phân biệt được, do đó giảm dung lượng tệp rất nhiều lần so với định dạng bitmap gốc (.bmp). Dung lượng nhẹ giúp các trang web tải nhanh hơn nhiều và tiết kiệm băng thông mạng."
                  en="According to Bitmap Representation on Page 31: JPEG applies lossy compression tailored to human visual perception, discarding imperceptible details. This achieves immense file size reduction compared to uncompressed BMP, yielding rapid web page loads and bandwidth savings."
                />
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={6} />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Previous: RGB Color Model' : 'Quay lại: Hệ màu RGB'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Next: Practice & Application' : 'Tiếp theo: Luyện tập & Vận dụng'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
