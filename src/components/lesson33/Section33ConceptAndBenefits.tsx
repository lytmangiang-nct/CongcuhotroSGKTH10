import React, { useState } from 'react';
import { Palette, Layers, Sparkles, CheckCircle2, Bookmark, HelpCircle, Image as ImageIcon, Type, Layout, Eye, TrendingUp, Building2, Download, Copy, Share2 } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section33ConceptAndBenefits: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // Interactive Poster Composer State
  const [publicationType, setPublicationType] = useState<'poster' | 'brand' | 'book'>('poster');
  const [headlineText, setHeadlineText] = useState<string>('VIETNAM - Vẻ đẹp bất tận');
  const [subText, setSubText] = useState<string>('Khám phá danh lam thắng cảnh & di sản ngàn năm');
  const [colorPalette, setColorPalette] = useState<'warm' | 'cool' | 'retro' | 'minimal'>('warm');
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [selectedElement, setSelectedElement] = useState<'all' | 'text' | 'vector' | 'photo' | 'color'>('all');

  // Question reinforce state
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const palettes = {
    warm: {
      nameVi: 'Gam Nóng (Rực rỡ nhiệt đới)',
      nameEn: 'Tropical Warm (Sunrise Gold)',
      bg: 'from-amber-500 via-rose-500 to-indigo-900',
      text: 'text-amber-200',
      accent: '#f59e0b',
      border: 'border-amber-400/40'
    },
    cool: {
      nameVi: 'Gam Lạnh (Biển đảo thanh bình)',
      nameEn: 'Ocean Cool (Serene Cyan)',
      bg: 'from-cyan-500 via-blue-600 to-slate-900',
      text: 'text-cyan-200',
      accent: '#06b6d4',
      border: 'border-cyan-400/40'
    },
    retro: {
      nameVi: 'Hoài Cổ (Di sản & Truyền thống)',
      nameEn: 'Vintage Heritage (Sepia Earth)',
      bg: 'from-amber-700 via-amber-900 to-stone-950',
      text: 'text-amber-100',
      accent: '#d97706',
      border: 'border-amber-600/40'
    },
    minimal: {
      nameVi: 'Tối Giản (Hiện đại công nghệ)',
      nameEn: 'Minimalist Clean (Slate Mono)',
      bg: 'from-slate-700 via-slate-800 to-slate-950',
      text: 'text-white',
      accent: '#e2e8f0',
      border: 'border-slate-500/40'
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {isVi ? 'MỤC 1 • TRANG 156 – 157 SGK' : 'SECTION 1 • TEXTBOOK PP. 156 – 157'}
          </span>
          <span className="text-xs text-slate-400">
            <BilingualText
              vi="Bản chất nghệ thuật ứng dụng & Lợi ích truyền thông"
              en="Applied Art Essence & Communication Value"
            />
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          <BilingualText
            vi="1. KHÁI NIỆM VỀ THIẾT KẾ ĐỒ HOẠ"
            en="1. THE CONCEPT OF GRAPHIC DESIGN"
          />
        </h2>
      </div>

      {/* Hoạt động 1: Thiết kế đồ hoạ là gì? */}
      <div className="bg-slate-900 bg-linear-to-br from-slate-900 via-slate-900 to-amber-950 border border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <Sparkles className="w-4 h-4 shrink-0" />
          <BilingualText
            vi="Hoạt động 1: Thiết kế đồ hoạ là gì? (SGK Trang 156)"
            en="Activity 1: What is Graphic Design? (Page 156)"
          />
        </div>
        <p className="text-sm text-slate-100 leading-relaxed italic">
          <BilingualText
            vi="“Em hiểu thế nào là thiết kế đồ hoạ? Em đã bao giờ vẽ tranh hay làm phim chưa? Em tạo ra các sản phẩm đó bằng cách nào?”"
            en='"How do you understand graphic design? Have you ever drawn pictures or made videos? How did you produce those creative assets?"'
          />
        </p>
      </div>

      {/* Core Definition & Analysis Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="border-l-4 border-rose-500 pl-4 py-1">
          <h3 className="font-extrabold text-base sm:text-lg text-white mb-2">
            <BilingualText
              vi="Định nghĩa chuẩn mực (SGK Trang 156):"
              en="Official Textbook Definition (Page 156):"
            />
          </h3>
          <p className="text-sm sm:text-base text-rose-200 font-medium leading-relaxed bg-rose-950/30 p-4 rounded-xl border border-rose-500/20">
            <BilingualText
              vi="“Thiết kế đồ hoạ là việc dàn dựng bố cục, sắp xếp, chỉnh sửa hình ảnh, lựa chọn màu sắc để sáng tạo các thông điệp truyền thông hấp dẫn và thu hút, đáp ứng yêu cầu truyền đạt thông tin một cách hiệu quả nhằm phục vụ mục đích tuyên truyền hoặc kinh doanh.”"
              en='"Graphic design is the craft of layout composition, arranging, editing images, and selecting color palettes to create attractive, engaging visual media communications that effectively convey information for promotional or commercial goals."'
            />
          </p>
        </div>

        {/* 5 Thành phần cấu tạo hình ảnh đồ họa */}
        <div>
          <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>{isVi ? '5 Thành phần cấu tạo của một hình ảnh đồ hoạ:' : '5 Core Components of Graphic Visuals:'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                <Type className="w-4 h-4" />
              </div>
              <h5 className="font-bold text-sm text-white">{isVi ? '1. Văn bản' : '1. Typography'}</h5>
              <p className="text-xs text-slate-400">
                {isVi ? 'Tiêu đề, slogan, nội dung chi tiết với kiểu chữ, kích thước, độ dày phân cấp rõ ràng.' : 'Headlines, taglines, body copy with clear hierarchical font scales.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Layout className="w-4 h-4" />
              </div>
              <h5 className="font-bold text-sm text-white">{isVi ? '2. Đường nét' : '2. Lines & Strokes'}</h5>
              <p className="text-xs text-slate-400">
                {isVi ? 'Đường thẳng, nét cong, nét đứt giúp phân chia không gian, dẫn mắt và tạo khung viền.' : 'Straight, curved, or dashed strokes to partition space and direct gaze.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Bookmark className="w-4 h-4" />
              </div>
              <h5 className="font-bold text-sm text-white">{isVi ? '3. Hình khối' : '3. Shapes & Vectors'}</h5>
              <p className="text-xs text-slate-400">
                {isVi ? 'Hình cơ bản (vuông, tròn, tam giác) và hình vẽ vector biểu trưng cho thương hiệu.' : 'Geometric primitives (circles, polygons) and vector iconography.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h5 className="font-bold text-sm text-white">{isVi ? '4. Ảnh chụp' : '4. Photography'}</h5>
              <p className="text-xs text-slate-400">
                {isVi ? 'Hình ảnh thực tế từ máy ảnh được cắt ghép, cân chỉnh ánh sáng, xoá phông chuyên nghiệp.' : 'Real-world photos edited, masked, color-graded, and retouch-enhanced.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <Palette className="w-4 h-4" />
              </div>
              <h5 className="font-bold text-sm text-white">{isVi ? '5. Màu sắc' : '5. Color Palette'}</h5>
              <p className="text-xs text-slate-400">
                {isVi ? 'Bảng màu chủ đạo kích hoạt cảm xúc, thể hiện cá tính thương hiệu và tạo độ tương phản.' : 'Harmonious color schemes triggering emotion and brand recall.'}
              </p>
            </div>
          </div>
        </div>

        {/* Các ấn phẩm đồ họa phong phú */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-bold text-amber-400 mr-1.5">{isVi ? 'Các dạng ấn phẩm phổ biến (SGK Trang 156):' : 'Diverse Deliverable Formats:'}</span>
          <span>
            {isVi
              ? 'Tấm thiệp, tờ rơi (flyer), biểu trưng (logo), biển hiệu, áp phích (poster), tài liệu quảng cáo/giới thiệu sản phẩm (brochure/catalogue), bìa sách/tạp chí, bao bì nhãn mác, giao diện trang web, ứng dụng di động...'
              : 'Greeting cards, flyers, logos, signage, posters, product brochures/catalogues, book/magazine covers, packaging labels, website interfaces, and mobile apps.'}
          </span>
        </div>
      </div>

      {/* 3 Lợi ích to lớn của Thiết kế đồ hoạ (SGK Trang 157) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
              {isVi ? 'Giá trị thực tiễn • SGK Trang 157' : 'Practical Value • Page 157'}
            </span>
            <h3 className="font-bold text-white text-base">
              {isVi ? '3 Lợi ích to lớn của Thiết kế đồ hoạ đối với mọi ngành nghề' : '3 Major Benefits of Graphic Design Across All Industries'}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              <Building2 className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-emerald-300">
              {isVi ? '1. Tạo dựng hình ảnh chuyên nghiệp' : '1. Professional Brand Building'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isVi
                ? 'Giúp tổ chức, doanh nghiệp hoặc cá nhân khẳng định uy tín thông qua hệ thống nhận diện đồng bộ: logo, danh thiếp, áp phích, thẻ nhân viên và hình ảnh trên mạng xã hội.'
                : 'Empowers companies and individuals to assert prestige via coherent brand identity: logos, business cards, posters, staff ID badges, and social media visuals.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/40 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
              <Eye className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-blue-300">
              {isVi ? '2. Mang lại trải nghiệm đặc biệt' : '2. Memorable Viewer Experience'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isVi
                ? 'Thu hút độc giả và người xem bằng các hình ảnh truyền thông trực quan, sinh động, biến những thông điệp khô khan thành câu chuyện thị giác giàu cảm xúc.'
                : 'Captivates readers and audiences through vivid visual storytelling, turning dry text into engaging emotional imagery.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-rose-500/40 transition-all space-y-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-sm text-rose-300">
              {isVi ? '3. Tăng tiếp thị & Tăng doanh thu' : '3. Elevates Marketing & Revenue'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isVi
                ? 'Gia tăng hiệu quả quảng cáo và thúc đẩy doanh số bán hàng vượt bậc nhờ các tờ rơi, banner, bao bì sản phẩm bắt mắt, thôi thúc hành vi mua của khách hàng.'
                : 'Boosts commercial campaign conversions and sales through eye-catching leaflets, banners, and attractive packaging that stimulate purchase decisions.'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Feature: Media Poster Composer Sandbox */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-rose-400 font-bold">
                {isVi ? 'Công cụ Thực hành Trực quan' : 'Interactive Graphic Composer'}
              </span>
              <h3 className="font-bold text-white text-base">
                {isVi ? 'Studio Dàn Dựng Ấn Phẩm Truyền Thông (Hình 33.2 SGK)' : 'Visual Media Poster Composer (Textbook Fig 33.2)'}
              </h3>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setPublicationType('poster');
                setHeadlineText('VIETNAM');
                setSubText(isVi ? 'Vẻ đẹp bất tận • Timeless Charm' : 'Timeless Charm • Endless Beauty');
                setColorPalette('warm');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                publicationType === 'poster' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isVi ? 'Áp phích Du lịch' : 'Tourism Poster'}
            </button>
            <button
              type="button"
              onClick={() => {
                setPublicationType('brand');
                setHeadlineText('INNOTECH LAB');
                setSubText(isVi ? 'Định hình tương lai số 4.0' : 'Shaping the Digital Future');
                setColorPalette('cool');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                publicationType === 'brand' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isVi ? 'Bộ Thương hiệu' : 'Brand Identity'}
            </button>
            <button
              type="button"
              onClick={() => {
                setPublicationType('book');
                setHeadlineText('TIN HỌC 10');
                setSubText(isVi ? 'Kết nối tri thức với cuộc sống' : 'Connecting Knowledge to Life');
                setColorPalette('minimal');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                publicationType === 'book' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {isVi ? 'Bìa sách Giáo khoa' : 'Textbook Cover'}
            </button>
          </div>
        </div>

        {/* Composer Layout: Controls + Live Canvas Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
            {/* Headline Editor */}
            <div>
              <label className="text-slate-400 font-bold block mb-1">
                {isVi ? '1. Tiêu đề chính (Headline Typography):' : '1. Headline Typography:'}
              </label>
              <input
                type="text"
                value={headlineText}
                onChange={(e) => setHeadlineText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-bold focus:border-rose-500 focus:outline-none"
              />
            </div>

            {/* Subtext Editor */}
            <div>
              <label className="text-slate-400 font-bold block mb-1">
                {isVi ? '2. Thông điệp phụ / Slogan:' : '2. Sub-headline / Slogan:'}
              </label>
              <input
                type="text"
                value={subText}
                onChange={(e) => setSubText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:border-rose-500 focus:outline-none"
              />
            </div>

            {/* Palette Selection */}
            <div>
              <label className="text-slate-400 font-bold block mb-1.5">
                {isVi ? '3. Bảng màu chủ đạo (Color Palette):' : '3. Color Palette:'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(palettes) as (keyof typeof palettes)[]).map((key) => {
                  const p = palettes[key];
                  const isCur = colorPalette === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setColorPalette(key)}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        isCur
                          ? 'bg-slate-800 border-rose-500 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className={`h-2.5 w-full rounded mb-1 bg-linear-to-r ${p.bg}`} />
                      <span className="text-[11px] block truncate">{isVi ? p.nameVi.split('(')[0] : p.nameEn.split('(')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Component Filter / Inspection */}
            <div>
              <label className="text-slate-400 font-bold block mb-1.5">
                {isVi ? '4. Tách biệt từng thành phần để quan sát:' : '4. Element Isolation Mode:'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'text', 'vector', 'photo', 'color'] as const).map((elem) => (
                  <button
                    key={elem}
                    type="button"
                    onClick={() => setSelectedElement(elem)}
                    className={`px-2 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
                      selectedElement === elem
                        ? 'bg-rose-600 text-white font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {elem === 'all' && (isVi ? 'Tất cả' : 'All')}
                    {elem === 'text' && (isVi ? 'Văn bản' : 'Typography')}
                    {elem === 'vector' && (isVi ? 'Vector' : 'Vectors')}
                    {elem === 'photo' && (isVi ? 'Chủ thể' : 'Subjects')}
                    {elem === 'color' && (isVi ? 'Màu nền' : 'Color Field')}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle Grid */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-medium">{isVi ? 'Lưới gióng bố cục (Layout Grid):' : 'Alignment Grid:'}</span>
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer ${
                  showGrid ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {showGrid ? (isVi ? 'BẬT' : 'ON') : (isVi ? 'TẮT' : 'OFF')}
              </button>
            </div>
          </div>

          {/* Live Canvas Mockup Column */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-1/1.414 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 p-6 flex flex-col justify-between transition-all duration-300">
              {/* Dynamic Gradient Background */}
              <div
                className={`absolute inset-0 bg-linear-to-b ${palettes[colorPalette].bg} transition-all duration-500 ${
                  selectedElement === 'color' || selectedElement === 'all' ? 'opacity-100' : 'opacity-20'
                }`}
              />

              {/* Layout Alignment Grid Overlay */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-4 border border-white/20">
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-white/10" />
                  <div className="border-r border-white/10" />
                  <div className="" />
                </div>
              )}

              {/* Top Bar / Brand Badge */}
              <div className={`relative z-10 flex items-center justify-between ${
                selectedElement === 'text' || selectedElement === 'vector' || selectedElement === 'all' ? 'opacity-100' : 'opacity-15'
              }`}>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/20 backdrop-blur-md text-white border border-white/30">
                  {publicationType === 'poster'
                    ? 'VIETNAM TOURISM'
                    : publicationType === 'brand'
                    ? 'TECH IDENTITY'
                    : isVi
                    ? 'SGK TIN HỌC'
                    : 'INFORMATICS 10'}
                </span>
                <span className="w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center text-[9px] font-bold text-slate-950 shadow-xs">
                  ★
                </span>
              </div>

              {/* Main Visual Vector / Illustration Area */}
              <div className={`relative z-10 flex-1 my-4 flex flex-col items-center justify-center transition-all ${
                selectedElement === 'vector' || selectedElement === 'photo' || selectedElement === 'all' ? 'opacity-100' : 'opacity-10'
              }`}>
                {publicationType === 'poster' && (
                  <div className="w-full text-center space-y-2">
                    {/* Floating Sun Disc */}
                    <div className="w-20 h-20 mx-auto rounded-full bg-linear-to-tr from-amber-400 to-yellow-200 shadow-xl" />
                    {/* Pagoda Silhouette */}
                    <div className="w-32 h-16 mx-auto bg-slate-900/80 rounded-t-lg backdrop-blur-sm border-t-2 border-amber-300 flex items-center justify-center">
                      <span className="text-white text-[11px] font-serif font-bold">
                        {isVi ? 'Tháp Rùa • Pagoda' : 'Turtle Tower • Pagoda'}
                      </span>
                    </div>
                    {/* River & Boat */}
                    <div className="w-48 h-5 mx-auto bg-slate-900/90 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-amber-200">
                        {isVi ? '🚣 Chèo thuyền trên sông' : '🚣 Rowing on the river'}
                      </span>
                    </div>
                  </div>
                )}

                {publicationType === 'brand' && (
                  <div className="w-28 h-28 rounded-2xl bg-white/15 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-2xl">
                    <span className="text-3xl font-black text-white tracking-widest">IT</span>
                  </div>
                )}

                {publicationType === 'book' && (
                  <div className="w-32 h-40 bg-slate-900/85 backdrop-blur-md border border-white/30 rounded-lg p-3 text-center flex flex-col justify-between shadow-xl">
                    <span className="text-[10px] text-amber-400 font-mono">
                      {isVi ? 'BỘ GIÁO DỤC VÀ ĐÀO TẠO' : 'MINISTRY OF EDUCATION'}
                    </span>
                    <span className="text-xl font-black text-white">
                      {isVi ? 'TIN HỌC 10' : 'INFORMATICS 10'}
                    </span>
                    <span className="text-[9px] text-slate-300">
                      {isVi ? 'NXB GIÁO DỤC VIỆT NAM' : 'VIETNAM EDU PUBLISHING'}
                    </span>
                  </div>
                )}
              </div>

              {/* Typography Headlines Section */}
              <div className={`relative z-10 text-center space-y-1 transition-all ${
                selectedElement === 'text' || selectedElement === 'all' ? 'opacity-100' : 'opacity-15'
              }`}>
                <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
                  {headlineText || (isVi ? 'TIÊU ĐỀ CHÍNH' : 'MAIN HEADLINE')}
                </h3>
                <p className={`text-xs font-medium drop-shadow-xs ${palettes[colorPalette].text}`}>
                  {subText || (isVi ? 'Thông điệp truyền thông' : 'Communication slogan')}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-2 text-center">
              {isVi
                ? 'Hình 33.2: Áp phích mẫu minh họa cấu trúc xếp lớp đa tầng theo chuẩn SGK Trang 157'
                : 'Fig 33.2: Interactive multi-layer poster layout mockup complying with textbook page 157'}
            </p>
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ Trang 157 SGK */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 bg-linear-to-r from-amber-950 via-slate-900 to-rose-950 border border-amber-500/50 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <Bookmark className="w-4 h-4 shrink-0" />
          <BilingualText
            vi="Hộp Ghi nhớ (SGK Trang 157)"
            en="Key Takeaways (Textbook page 157)"
          />
        </div>
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-100">
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">•</span>
            <span>
              <BilingualText
                vi="Thiết kế đồ hoạ là sáng tạo các thông điệp truyền thông kết hợp giữa hình ảnh, kiểu chữ, màu sắc để truyền tải thông tin đến người xem."
                en="Graphic Design is the creation of visual media communications integrating imagery, typography, and color schemes to convey information to audiences."
              />
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-400 font-bold">•</span>
            <span>
              <BilingualText
                vi="Thiết kế đồ hoạ đem lại nhiều lợi ích to lớn cho mọi ngành nghề, lĩnh vực trong đời sống kinh tế - xã hội."
                en="Graphic design yields extensive commercial, aesthetic, and communicative advantages across all societal disciplines."
              />
            </span>
          </li>
        </ul>
      </div>

      {/* Câu hỏi củng cố cuối Mục 1 (Hình 33.1) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <BilingualText
            vi="Câu hỏi củng cố Mục 1 (SGK Trang 157)"
            en="Reinforcement Question 1 (Page 157)"
          />
        </div>

        <p className="text-xs sm:text-sm text-slate-200">
          <BilingualText
            vi="Hãy chọn một công việc được nêu trong Hình 33.1 liên quan trực tiếp tới thiết kế đồ hoạ và cho biết thiết kế đồ hoạ có thể hỗ trợ những gì cho công việc đó?"
            en="Select one occupation in Figure 33.1 directly related to graphic design and explain how graphic design aids that specific career."
          />
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600/30 text-blue-300 border border-blue-500/40 hover:bg-blue-600/50 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>
              <BilingualText
                vi={showAnswer ? 'Ẩn câu trả lời chuẩn SGK' : 'Xem câu trả lời chuẩn SGK'}
                en={showAnswer ? 'Hide Textbook Answer' : 'Reveal Textbook Answer'}
              />
            </span>
          </button>

          {showAnswer && (
            <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-blue-500/30 text-xs sm:text-sm text-slate-200 space-y-2 animate-in fade-in">
              <p className="font-bold text-emerald-400">
                <BilingualText
                  vi="Công việc chọn: KIẾN TRÚC SƯ (Hình 33.1)"
                  en="Selected Occupation: ARCHITECT (Fig 33.1)"
                />
              </p>
              <div className="text-slate-300 leading-relaxed">
                <BilingualText
                  vi="Thiết kế đồ hoạ hỗ trợ Kiến trúc sư: (1) Sử dụng các phần mềm đồ hoạ kĩ thuật và 3D (AutoCAD, SketchUp, 3ds Max) để vẽ mặt bằng, mặt đứng, mặt cắt của công trình với độ chuẩn xác từng milimet; (2) Phối cảnh 3D mô phỏng ánh sáng mặt trời, vật liệu đá kính, cây xanh sinh động; (3) Dàn dựng hồ sơ thiết kế, phối màu và trình bày bản vẽ chuyên nghiệp trước khách hàng và chủ đầu tư."
                  en="Graphic design empowers architects to: (1) Draft 2D/3D millimeter-accurate floor plans and cross-sections via CAD suites; (2) Render photorealistic 3D perspectives simulating sunlight, materials, and greenery; (3) Professionally compose presentation dossiers and design portfolios for clients."
                />
              </div>
              <div className="text-slate-400 italic text-xs">
                <BilingualText
                  vi="(Ngoài ra, Thợ may cũng được thiết kế đồ hoạ hỗ trợ đắc lực trong việc thiết kế hoa văn vải, in ấn họa tiết thời trang và tạo mẫu rập trang phục số)."
                  en="(Additionally, Tailors/Fashion Designers heavily utilize graphics for digital pattern drafting, fabric motif printing, and virtual apparel styling)."
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
