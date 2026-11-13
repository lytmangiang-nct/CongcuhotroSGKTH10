import React, { useState } from 'react';
import {
  Download,
  FileImage,
  Sliders,
  CheckCircle2,
  Volume2,
  ArrowRight,
  Info,
  Maximize2,
  Crop,
  Layers,
  Sparkles,
  Printer
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section15ExportRasterLab: React.FC = () => {
  const { bilingualMode, speak, setCurrentPage } = useBook();

  // Export simulator state
  const [exportArea, setExportArea] = useState<'page' | 'drawing' | 'selection' | 'custom'>('drawing');
  const [dpi, setDpi] = useState<number>(300);
  const [filename, setFilename] = useState<string>('Hoi_Sach_Ha_Noi_Poster.png');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportComplete, setExportComplete] = useState<boolean>(false);
  const [showInspector, setShowInspector] = useState<boolean>(false);

  // Dynamic calculated pixel dimensions
  // Base dimensions at 96 dpi: 600 x 850
  const baseW = exportArea === 'selection' ? 320 : exportArea === 'page' ? 794 : 600;
  const baseH = exportArea === 'selection' ? 420 : exportArea === 'page' ? 1123 : 850;
  const scale = dpi / 96;
  const widthPx = Math.round(baseW * scale);
  const heightPx = Math.round(baseH * scale);
  const estimatedFileSizeMb = ((widthPx * heightPx * 4) / (1024 * 1024) * 0.18).toFixed(2); // PNG compression approx

  const handleSimulateExport = () => {
    setIsExporting(true);
    setExportComplete(false);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-cyan-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/25 text-emerald-200 text-xs font-mono font-bold uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Task 7 • Page 85' : 'Nhiệm vụ 7 • Trang 85'}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-100 text-xs font-mono font-semibold">
              Shift + Ctrl + E
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {bilingualMode === 'en'
              ? '4. EXPORTING RASTER PNG IMAGES & RESOLUTION LAB'
              : '4. XUẤT TỆP ẢNH ĐIỂM ẢNH (PNG) & THIẾT LẬP ĐỘ PHÂN GIẢI'}
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
            {bilingualMode === 'en'
              ? 'Learn how to convert scalable vector artwork into high-definition raster PNG files using Inkscape\'s Export PNG Image dialog. Master export areas, target DPIs (200-300 dpi for crisp printing), and image sizing.'
              : 'Chuyển đổi bản vẽ đồ họa vecto Inkscape thành tệp hình ảnh điểm ảnh PNG chất lượng cao thông qua hộp thoại Export PNG Image. Nắm vững 4 vùng xuất, thiết lập chuẩn 200–300 dpi cho in ấn sắc nét và xuất file thành phẩm.'}
          </p>

          <div className="pt-2">
            <button
              onClick={() =>
                speak(
                  bilingualMode === 'en'
                    ? 'Task 7: Exporting PNG images. In Inkscape, press Shift Ctrl E to open the Export PNG Image dialog. Select the export area such as Page, Drawing, or Selection, set the DPI between 200 and 300 for crisp printing, choose a filename, and click Export.'
                    : 'Nhiệm vụ 7: Xuất tệp ảnh PNG. Trong Inkscape, chọn menu File, chọn Export PNG Image hoặc nhấn tổ hợp phím Shift Ctrl E để mở hộp thoại. Thiết lập vùng xuất như Page, Drawing hoặc Selection, đặt độ phân giải từ 200 đến 300 dpi cho bản in sắc nét, chọn tên file và nhấn Export.'
                )
              }
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold backdrop-blur transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>{bilingualMode === 'en' ? 'EN' : 'VI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Task 7 Core Steps Guide according to SGK Page 85 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en' ? 'Open Export Dialog' : 'Mở hộp thoại xuất PNG'}
              </h4>
              <p className="text-xs text-slate-500">File &gt; Export PNG Image</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Select File / Export PNG Image from the main menu, or press the shortcut Shift + Ctrl + E. The docked panel will appear on the right side of the screen.'
              : 'Chọn lệnh File / Export PNG Image (hoặc nhấn tổ hợp phím Shift + Ctrl + E) để mở hộp thoại Export PNG Image (Hình 15.8 trong SGK).'}
          </p>
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-mono">
            ⌨️ Hotkey: Shift + Ctrl + E
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en' ? 'Configure Export Area & DPI' : 'Thiết lập vùng & độ phân giải'}
              </h4>
              <p className="text-xs text-slate-500">Export area &amp; Image size</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Choose Export Area (Page, Drawing, Selection, or Custom). In Image size, adjust DPI between 200 and 300 dpi for razor-sharp physical printouts (or 96 dpi for digital screens).'
              : 'Thiết lập Export area (Page, Drawing, Selection, Custom). Trong phần Image size, chỉnh dpi từ 200 đến 300 dpi cho in ấn sắc nét, kích thước chiều rộng/cao pixel tự động tính toán.'}
          </p>
          <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-xs text-cyan-800 dark:text-cyan-200 font-mono">
            🎯 In ấn chuẩn: 200 – 300 dpi
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en' ? 'Destination & Export' : 'Đặt tên & xuất tệp'}
              </h4>
              <p className="text-xs text-slate-500">Filename &gt; Export Button</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {bilingualMode === 'en'
              ? 'Click Browse... / Export As... to name the file and select destination directory. Finally, click the Export button to write the raster PNG to disk.'
              : 'Nhấn Export As... hoặc đặt tên tệp trong mục Filename và thư mục đích. Sau đó nhấn nút Export (biểu tượng mũi tên xanh) để tiến hành xuất tệp.'}
          </p>
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-200 font-mono">
            💾 Output: RGB + Alpha (.png)
          </div>
        </div>
      </div>

      {/* Interactive Inkscape Export Dialog Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">
                {bilingualMode === 'en'
                  ? 'Interactive Inkscape Export PNG Image Simulator'
                  : 'Mô phỏng trực quan Hộp thoại Export PNG Image (Hình 15.8)'}
              </h3>
              <p className="text-xs text-slate-500">
                {bilingualMode === 'en'
                  ? 'Experiment with export tabs, resolution scaling, and real-time dimension calculations'
                  : 'Thử nghiệm trực tiếp các tab vùng xuất, thang đo DPI và kích thước điểm ảnh thực tế'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowInspector(!showInspector)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Info className="w-4 h-4 text-emerald-500" />
            <span>{showInspector ? (bilingualMode === 'en' ? 'Hide Details' : 'Ẩn giải thích') : (bilingualMode === 'en' ? 'Show Details' : 'Giải thích thông số')}</span>
          </button>
        </div>

        {showInspector && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300 animate-in fade-in">
            <div className="space-y-1">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {bilingualMode === 'en' ? 'Page (Full Page Canvas):' : 'Page (Trang in):'}
              </span>
              <p>
                {bilingualMode === 'en'
                  ? 'Exports the entirety of the bounded document page canvas (e.g., standard A4 210 x 297 mm), regardless of artwork placement.'
                  : 'Xuất toàn bộ kích thước của trang vẽ (ví dụ khổ A4 210 x 297 mm), bất kể nội dung vẽ nằm ở đâu.'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-cyan-600 dark:text-cyan-400">
                {bilingualMode === 'en' ? 'Drawing (Artwork Bounds):' : 'Drawing (Vùng vẽ):'}
              </span>
              <p>
                {bilingualMode === 'en'
                  ? 'Exports the tight bounding box encompassing all vector objects present on canvas, trimming empty borders.'
                  : 'Chỉ xuất khung bao quanh vừa khít tất cả các đối tượng có trong bản vẽ, loại bỏ khoảng trống thừa.'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {bilingualMode === 'en' ? 'Selection (Active Selection):' : 'Selection (Chọn):'}
              </span>
              <p>
                {bilingualMode === 'en'
                  ? 'Exports strictly the currently highlighted object(s) selected by the pointer (e.g. standalone bookshelf or badge callout).'
                  : 'Chỉ xuất duy nhất một hoặc các đối tượng đang được chọn bằng chuột (ví dụ riêng chiếc giá sách hay bóng hội thoại).'}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {bilingualMode === 'en' ? 'DPI (Dots Per Inch):' : 'DPI (Dots Per Inch):'}
              </span>
              <p>
                {bilingualMode === 'en'
                  ? 'Dot pixel density per inch. 96 dpi for digital screen displays; 300 dpi for sharp physical printing without pixel blur.'
                  : 'Mật độ điểm ảnh trên 1 inch. 96 dpi cho web/màn hình; 300 dpi cho in ấn offset/laser sắc nét không bị vỡ.'}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            {/* Export Area Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>{bilingualMode === 'en' ? '1. Export Area' : '1. Vùng xuất (Export area)'}</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono capitalize">{exportArea}</span>
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/80 dark:bg-slate-800 rounded-xl">
                {(['page', 'drawing', 'selection', 'custom'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setExportArea(mode);
                      setExportComplete(false);
                    }}
                    className={`py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                      exportArea === mode
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {mode === 'page' ? 'Page' : mode === 'drawing' ? 'Drawing' : mode === 'selection' ? 'Select' : 'Custom'}
                  </button>
                ))}
              </div>
            </div>

            {/* DPI Resolution Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>{bilingualMode === 'en' ? '2. Resolution (DPI)' : '2. Độ phân giải (DPI)'}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                  {dpi} dpi {dpi >= 300 ? (bilingualMode === 'en' ? '⭐ Crisp Printing' : '⭐ In ấn sắc nét') : dpi === 96 ? (bilingualMode === 'en' ? '📱 Digital Screen' : '📱 Màn hình số') : ''}
                </span>
              </div>
              <input
                type="range"
                min="72"
                max="600"
                step="24"
                value={dpi}
                onChange={(e) => {
                  setDpi(Number(e.target.value));
                  setExportComplete(false);
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <button type="button" onClick={() => setDpi(96)} className="hover:text-emerald-500">
                  {bilingualMode === 'en' ? '96 dpi (Screen)' : '96 dpi (Màn hình)'}
                </button>
                <button type="button" onClick={() => setDpi(200)} className="hover:text-emerald-500">
                  {bilingualMode === 'en' ? '200 dpi (Textbook min)' : '200 dpi (SGK min)'}
                </button>
                <button type="button" onClick={() => setDpi(300)} className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500">
                  {bilingualMode === 'en' ? '300 dpi (Standard print)' : '300 dpi (SGK chuẩn)'}
                </button>
                <button type="button" onClick={() => setDpi(600)} className="hover:text-emerald-500">
                  {bilingualMode === 'en' ? '600 dpi (Ultra)' : '600 dpi (Ultra)'}
                </button>
              </div>
            </div>

            {/* Calculated Image Size (px) */}
            <div className="space-y-2 p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {bilingualMode === 'en' ? 'Image Size (Calculated in pixels)' : 'Kích thước điểm ảnh (Image size)'}
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">
                    {bilingualMode === 'en' ? 'Width (pixels):' : 'Width (Rộng):'}
                  </span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{widthPx.toLocaleString()} px</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">
                    {bilingualMode === 'en' ? 'Height (pixels):' : 'Height (Cao):'}
                  </span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-100">{heightPx.toLocaleString()} px</span>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>{bilingualMode === 'en' ? 'Estimated file size:' : 'Dung lượng ước tính:'}</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">~{estimatedFileSizeMb} MB</span>
              </div>
            </div>

            {/* Filename Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {bilingualMode === 'en' ? '3. Filename & Path' : '3. Tên tệp & Đường dẫn (Filename)'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Export Action Button */}
            <button
              onClick={handleSimulateExport}
              disabled={isExporting}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{bilingualMode === 'en' ? 'Rendering Raster PNG...' : 'Đang rasterize xuất PNG...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{bilingualMode === 'en' ? 'Export PNG (Simulate)' : 'Xuất tệp PNG (Mô phỏng)'}</span>
                </>
              )}
            </button>

            {exportComplete && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold">
                    {bilingualMode === 'en' ? 'Export Successful!' : 'Đã xuất ảnh thành công!'}
                  </div>
                  <div className="text-[11px] opacity-80 font-mono">
                    {filename} ({widthPx}x{heightPx} px @ {dpi} dpi)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Real-time Visual Raster Preview Column */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden min-h-[460px]">
            {/* Background checkered pattern representing transparency */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#475569 1px, transparent 1px), radial-gradient(#475569 1px, #0f172a 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px'
              }}
            />

            <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
              {/* Badge info */}
              <div className="mb-3 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-[11px] font-mono text-emerald-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  Preview: {exportArea.toUpperCase()} • {widthPx} × {heightPx} px ({dpi} dpi)
                </span>
              </div>

              {/* Rendered Poster Preview Frame */}
              <div
                className={`relative transition-all duration-300 rounded-2xl overflow-hidden shadow-2xl border-4 ${
                  exportArea === 'selection'
                    ? 'w-52 h-64 border-purple-500/80 bg-teal-900/40 p-4 flex flex-col justify-center items-center text-center'
                    : 'w-64 h-88 border-emerald-500/80 bg-gradient-to-b from-amber-400 via-amber-300 to-teal-800'
                }`}
              >
                {exportArea === 'selection' ? (
                  /* Only Selection exported */
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-mono text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded-full">
                      [Selection Only]
                    </span>
                    <div className="w-36 h-28 mx-auto rounded-3xl bg-teal-600 border-2 border-teal-400 shadow-lg flex items-center justify-center text-white text-xs font-black p-2 relative">
                      {bilingualMode === 'en' ? 'UP TO 70% OFF' : 'GIẢM GIÁ TỚI 70%'}
                      <div className="absolute -bottom-2 right-4 w-4 h-4 bg-teal-600 rotate-45 border-r-2 border-b-2 border-teal-400" />
                    </div>
                    <p className="text-[10px] text-slate-300">
                      {bilingualMode === 'en'
                        ? 'Exports only the selected callout object with a transparent alpha channel.'
                        : 'Chỉ xuất đối tượng bong bóng đã chọn với nền trong suốt (alpha channel).'}
                    </p>
                  </div>
                ) : (
                  /* Full Poster Rendered */
                  <div className="w-full h-full flex flex-col justify-between p-3 select-none">
                    {/* Bunting Banner */}
                    <div className="flex justify-between items-start -mx-2 -mt-1">
                      {['#ea580c', '#0284c7', '#16a34a', '#e11d48', '#d97706', '#9333ea', '#0d9488'].map((c, i) => (
                        <div
                          key={i}
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: '11px solid transparent',
                            borderRight: '11px solid transparent',
                            borderTop: `18px solid ${c}`
                          }}
                        />
                      ))}
                    </div>

                    {/* Headline */}
                    <div className="text-center my-2">
                      <h4 className="text-xl font-black text-blue-950 tracking-wider">
                        {bilingualMode === 'en' ? 'HANOI BOOK FAIR' : 'HỘI SÁCH HÀ NỘI'}
                      </h4>
                      <div className="inline-block mt-1 px-2 py-0.5 rounded-full bg-cyan-600 text-[9px] font-bold text-white">
                        {bilingualMode === 'en' ? 'FREE ADMISSION' : 'VÀO CỬA TỰ DO'}
                      </div>
                    </div>

                    {/* Bookshelf */}
                    <div className="my-1 flex items-end justify-center gap-1.5 px-2 relative">
                      <div className="w-5 h-20 bg-blue-600 rounded-t-sm shadow-sm flex flex-col justify-between py-1 items-center">
                        <div className="w-full h-1 bg-amber-400" />
                        <span className="text-[7px] text-white font-bold rotate-90 whitespace-nowrap">
                          {bilingualMode === 'en' ? 'MATH' : 'TOÁN HỌC'}
                        </span>
                        <div className="w-full h-1 bg-amber-400" />
                      </div>
                      <div className="w-6 h-24 bg-red-600 rounded-t-sm shadow-sm flex flex-col justify-between py-1 items-center">
                        <div className="w-full h-1.5 bg-yellow-300" />
                        <span className="text-[8px] text-white font-black rotate-90 whitespace-nowrap">
                          {bilingualMode === 'en' ? 'INFORMATICS 10' : 'TIN HỌC 10'}
                        </span>
                        <div className="w-full h-1.5 bg-yellow-300" />
                      </div>
                      <div className="w-5 h-16 bg-emerald-600 rounded-t-sm shadow-sm flex flex-col justify-between py-1 items-center rotate-6 origin-bottom">
                        <span className="text-[7px] text-white font-bold rotate-90 whitespace-nowrap">
                          {bilingualMode === 'en' ? 'HISTORY' : 'LỊCH SỬ'}
                        </span>
                      </div>
                      <div className="w-4 h-18 bg-purple-600 rounded-t-sm shadow-sm flex flex-col justify-between py-1 items-center -rotate-6 origin-bottom">
                        <span className="text-[7px] text-white font-bold rotate-90 whitespace-nowrap">
                          {bilingualMode === 'en' ? 'LITERATURE' : 'VĂN HỌC'}
                        </span>
                      </div>
                    </div>

                    {/* Sawtooth divider edge & Bottom green bar */}
                    <div className="bg-teal-700 text-white rounded-b-xl p-2.5 -mx-3 -mb-3 space-y-1">
                      <div className="flex justify-between items-center text-[8px] font-bold border-b border-teal-500/60 pb-1">
                        <div>
                          <span className="block text-amber-300 text-[7px]">
                            {bilingualMode === 'en' ? 'TIME' : 'THỜI GIAN'}
                          </span>
                          <span>{bilingualMode === 'en' ? '8:00 - 21:00 | Oct 12-17' : '8H - 21H | 12-17/10'}</span>
                        </div>
                        <div className="h-6 w-px border-r border-dashed border-white/60 mx-1" />
                        <div className="text-right">
                          <span className="block text-amber-300 text-[7px]">
                            {bilingualMode === 'en' ? 'LOCATION' : 'ĐỊA ĐIỂM'}
                          </span>
                          <span>{bilingualMode === 'en' ? 'Thang Long Citadel' : 'Hoàng thành Thăng Long'}</span>
                        </div>
                      </div>
                      <div className="text-center pt-0.5">
                        <span className="inline-block px-2 py-0.5 bg-amber-400 text-teal-950 font-black text-[9px] rounded-full">
                          {bilingualMode === 'en' ? 'UP TO 70% OFF' : 'GIẢM GIÁ TỚI 70%'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status footer info */}
              <p className="mt-4 text-xs text-slate-400 text-center">
                {exportArea === 'page'
                  ? (bilingualMode === 'en'
                      ? 'Page: Standard page bounding box including margins'
                      : 'Trang in chuẩn (Page): Đầy đủ lề trang theo thiết lập tệp')
                  : exportArea === 'drawing'
                  ? (bilingualMode === 'en'
                      ? 'Drawing: Fits tight bounding box around all artwork objects'
                      : 'Vùng vẽ (Drawing): Vừa khít đường bao các đối tượng')
                  : (bilingualMode === 'en'
                      ? 'Selection: Exports only selected object with transparent Alpha channel'
                      : 'Vùng chọn (Selection): Xuất riêng đối tượng với kênh trong suốt Alpha')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison: SVG vs PNG (Raster vs Vector) */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>
            {bilingualMode === 'en'
              ? 'Important Concept: Vector (.svg) vs. Raster (.png) After Export'
              : 'Ghi nhớ trọng tâm: So sánh tệp gốc Vecto (.svg) và tệp xuất Điểm ảnh (.png)'}
          </span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                <th className="p-3">Đặc tính so sánh</th>
                <th className="p-3 text-cyan-600 dark:text-cyan-400">Tệp gốc Inkscape (.svg)</th>
                <th className="p-3 text-emerald-600 dark:text-emerald-400">Tệp ảnh xuất ra (.png)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-400">
              <tr>
                <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Bản chất đồ họa</td>
                <td className="p-3">Đồ họa vectơ (các công thức toán học, đường Bézier, màu tô)</td>
                <td className="p-3">Đồ họa điểm ảnh (lưới ma trận pixel, màu cố định từng điểm)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Khả năng phóng to</td>
                <td className="p-3 font-medium text-cyan-700 dark:text-cyan-300">Co dãn vô hạn không bao giờ vỡ hạt hay giảm nét</td>
                <td className="p-3">Phóng to quá kích thước xuất sẽ bị nhoè vỡ hoặc lộ ô răng cưa</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Khả năng chỉnh sửa lại</td>
                <td className="p-3">Dễ dàng tách rời, đổi màu, chỉnh nút Bézier, căn chỉnh lớp</td>
                <td className="p-3">Đã gộp phẳng (flattened), không thể tách lớp gốc hay sửa nút</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">Mục đích sử dụng</td>
                <td className="p-3">Lưu trữ tệp thiết kế nguồn, mở lại bằng Inkscape để chỉnh sửa</td>
                <td className="p-3 font-medium text-emerald-700 dark:text-emerald-300">Đăng tải website, mạng xã hội, chèn vào Word/PowerPoint, in ấn</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={15} />

      {/* Navigation Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setCurrentPage(3)}
          className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
        >
          {bilingualMode === 'en' ? '← Previous: Typography & Badges' : '← Quay lại: Văn bản & Phụ kiện'}
        </button>

        <button
          onClick={() => setCurrentPage(5)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          <span>{bilingualMode === 'en' ? 'Next: Practice & Application →' : 'Tiếp theo: Luyện tập & Vận dụng →'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
