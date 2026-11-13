import React, { useState } from 'react';
import { Cpu, Palette, BookOpen, Layers, Sparkles, CheckCircle2, Bookmark, HelpCircle, Laptop, Wrench, Globe, Brain, Award, Printer, Monitor, Compass } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section33SkillsAndTools: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // Aptitude Test State (5 sliders 1-10)
  const [aptitudeScores, setAptitudeScores] = useState<{
    creativity: number;
    techSkills: number;
    selfLearning: number;
    criticalThinking: number;
    interdisciplinary: number;
  }>({
    creativity: 8,
    techSkills: 7,
    selfLearning: 9,
    criticalThinking: 8,
    interdisciplinary: 7
  });

  // Selected Software Category for deep inspection
  const [selectedSoftwareCat, setSelectedSoftwareCat] = useState<'raster' | 'vector' | 'editorial' | 'cad3d'>('raster');

  // Reinforce Question State
  const [selectedReinforceOption, setSelectedReinforceOption] = useState<string | null>(null);
  const [showReinforceResult, setShowReinforceResult] = useState<boolean>(false);

  const softwareMatrix = {
    raster: {
      titleVi: 'Xử lý điểm ảnh & Chỉnh sửa ảnh Raster',
      titleEn: 'Raster Editing & Photo Retouching',
      tools: [
        {
          name: 'Adobe Photoshop',
          typeVi: 'Thương mại tiêu chuẩn ngành',
          typeEn: 'Industry-Standard Commercial',
          descVi: 'Xử lý ảnh chuyên nghiệp, cắt ghép, phục chế, tạo chất liệu và kỹ xảo ánh sáng.',
          descEn: 'Professional photo editing, compositing, restoration, texturing, and lighting effects.'
        },
        {
          name: 'GIMP',
          typeVi: 'Mã nguồn mở miễn phí',
          typeEn: 'Free Open-Source',
          descVi: 'Phần mềm nguồn mở mạnh mẽ thay thế Photoshop, hỗ trợ layer, mask và bộ lọc đa dạng.',
          descEn: 'Powerful open-source Photoshop alternative supporting layers, masks, and rich filters.'
        }
      ],
      color: 'border-blue-500/40 text-blue-400 bg-blue-950/50'
    },
    vector: {
      titleVi: 'Đồ hoạ Vector & Thiết kế Biểu trưng (Logo)',
      titleEn: 'Vector Graphics & Logo Crafting',
      tools: [
        {
          name: 'Adobe Illustrator',
          typeVi: 'Thương mại tiêu chuẩn ngành',
          typeEn: 'Industry-Standard Commercial',
          descVi: 'Vẽ vector bằng đường cong Bézier, thiết kế logo, infographic và áp phích sắc nét mọi kích thước.',
          descEn: 'Draws Bézier curves, crisp logos, infographics, and posters scalable to any dimension.'
        },
        {
          name: 'CorelDraw',
          typeVi: 'Thương mại chuyên in ấn',
          typeEn: 'Print-Focused Commercial',
          descVi: 'Phần mềm đồ họa vector phổ biến trong ngành in ấn biển bảng quảng cáo và cắt decal kỹ thuật.',
          descEn: 'Popular vector graphics suite for commercial signage printing and precision vinyl cutting.'
        },
        {
          name: 'Inkscape',
          typeVi: 'Mã nguồn mở miễn phí',
          typeEn: 'Free Open-Source',
          descVi: 'Phần mềm vector mã nguồn mở chuẩn SVG, tính năng phong phú đã học ở Chủ đề 4.',
          descEn: 'Standard SVG open-source vector editor with versatile features covered in Topic 4.'
        }
      ],
      color: 'border-amber-500/40 text-amber-400 bg-amber-950/50'
    },
    editorial: {
      titleVi: 'Dàn trang Xuất bản Sách báo & Tạp chí',
      titleEn: 'Editorial Layout & Book Publishing',
      tools: [
        {
          name: 'Adobe InDesign',
          typeVi: 'Thương mại cao cấp',
          typeEn: 'Pro Commercial Suite',
          descVi: 'Chuẩn mực ngành xuất bản sách, báo giấy, tạp chí, catalogue với hệ thống trang chủ (Master Page).',
          descEn: 'Publishing benchmark for books, newspapers, magazines, and catalogues using Master Pages.'
        },
        {
          name: 'Scribus',
          typeVi: 'Mã nguồn mở miễn phí',
          typeEn: 'Free Open-Source',
          descVi: 'Phần mềm chế bản điện tử mã nguồn mở chuyên nghiệp, hỗ trợ quản lý màu CMYK và xuất PDF in ấn.',
          descEn: 'Professional open-source desktop publishing supporting CMYK color profiles and print-ready PDFs.'
        }
      ],
      color: 'border-purple-500/40 text-purple-400 bg-purple-950/50'
    },
    cad3d: {
      titleVi: 'Đồ hoạ Kĩ thuật CAD & Mô hình Cơ khí 3D',
      titleEn: 'Technical CAD & 3D Prototyping',
      tools: [
        {
          name: 'AutoCAD',
          typeVi: 'Thiết kế kĩ thuật 2D/3D',
          typeEn: '2D/3D Technical Drafting',
          descVi: 'Chuẩn mực thế giới cho kiến trúc sư và kĩ sư xây dựng vẽ mặt bằng công trình chính xác tuyệt đối.',
          descEn: 'Global standard for architects and civil engineers to draft precision building plans.'
        },
        {
          name: 'SolidWorks',
          typeVi: 'Mô hình cơ khí chính xác',
          typeEn: 'Precision Mechanical 3D',
          descVi: 'Dựng mô hình tham số 3D, mô phỏng động học và thiết kế chi tiết máy móc công nghiệp.',
          descEn: '3D parametric modeling, kinematic simulation, and industrial mechanical component design.'
        },
        {
          name: 'Corel Designer',
          typeVi: 'Minh hoạ kĩ thuật',
          typeEn: 'Technical Illustration',
          descVi: 'Tạo tài liệu hướng dẫn kỹ thuật, sơ đồ tháo lắp và minh hoạ trực quan cho sản phẩm công nghệ.',
          descEn: 'Create technical manuals, exploded assembly diagrams, and crisp product illustrations.'
        }
      ],
      color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/50'
    }
  };

  const averageAptitude = Math.round(
    (aptitudeScores.creativity +
      aptitudeScores.techSkills +
      aptitudeScores.selfLearning +
      aptitudeScores.criticalThinking +
      aptitudeScores.interdisciplinary) /
      5
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {isVi ? 'MỤC 2 • TRANG 157 – 158 SGK' : 'SECTION 2 • TEXTBOOK PP. 157 – 158'}
          </span>
          <span className="text-xs text-slate-400">
            <BilingualText
              vi="Hệ thống công cụ chuyên dụng & Năng lực toàn diện"
              en="Software Ecosystem & Comprehensive Competencies"
            />
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          <BilingualText
            vi="2. KIẾN THỨC, KĨ NĂNG CẦN CÓ CỦA NGƯỜI THIẾT KẾ ĐỒ HOẠ"
            en="2. KNOWLEDGE AND SKILLS REQUIRED FOR GRAPHIC DESIGNERS"
          />
        </h2>
      </div>

      {/* Hoạt động 2: Các kĩ năng của người làm thiết kế đồ hoạ */}
      <div className="bg-slate-900 bg-linear-to-br from-slate-900 via-slate-900 to-blue-950 border border-blue-500/40 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
          <Sparkles className="w-4 h-4 shrink-0" />
          <BilingualText
            vi="Hoạt động 2: Các kĩ năng của người làm thiết kế đồ hoạ (SGK Trang 157)"
            en="Activity 2: Skills of Graphic Designers (Textbook p. 157)"
          />
        </div>
        <p className="text-sm text-slate-100 leading-relaxed italic">
          <BilingualText
            vi="“Theo em để làm nghề thiết kế đồ hoạ cần có những kĩ năng nào? Em có thấy bản thân mình phù hợp với nghề này không?”"
            en='"In your opinion, what skills are required to pursue graphic design? Do you find yourself suited for this profession?"'
          />
        </p>
      </div>

      {/* Ma trận phần mềm chuyên dụng (SGK Trang 157) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-indigo-400 font-bold">
                {isVi ? 'Công nghệ phần mềm • SGK Trang 157' : 'Software Ecosystem • Page 157'}
              </span>
              <h3 className="font-bold text-white text-base">
                {isVi ? 'Ma Trận Phần Mềm Thiết Kế Đồ Hoạ Máy Tính' : 'Computer Graphic Design Software Matrix'}
              </h3>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['raster', 'vector', 'editorial', 'cad3d'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedSoftwareCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedSoftwareCat === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'raster' && (isVi ? '1. Xử lý ảnh (Raster)' : 'Raster Editing')}
                {cat === 'vector' && (isVi ? '2. Đồ họa Vector' : 'Vector Design')}
                {cat === 'editorial' && (isVi ? '3. Dàn trang in ấn' : 'Publishing Layout')}
                {cat === 'cad3d' && (isVi ? '4. Kĩ thuật & CAD 3D' : 'CAD & 3D Prototyping')}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Details */}
        <div className={`p-5 rounded-2xl border ${softwareMatrix[selectedSoftwareCat].color} space-y-4 transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-base text-white">
              {isVi ? softwareMatrix[selectedSoftwareCat].titleVi : softwareMatrix[selectedSoftwareCat].titleEn}
            </h4>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
              {isVi ? 'SGK Trang 157' : 'Textbook p. 157'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {softwareMatrix[selectedSoftwareCat].tools.map((t, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-bold text-sm text-white">{t.name}</h5>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                    {isVi ? t.typeVi : t.typeEn}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{isVi ? t.descVi : t.descEn}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Công nghệ in ấn & Hệ màu CMYK vs RGB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Printer className="w-4 h-4" />
              <span>{isVi ? 'Kiến thức Công nghệ In ấn (SGK Trang 157)' : 'Printing Technology Competence'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isVi
                ? 'Người thiết kế đồ hoạ cần nắm vững công nghệ in ấn để sản phẩm in ra không bị lệch màu hay vỡ hình: Hệ màu trừ CMYK (Cyan, Magenta, Yellow, Black), độ phân giải in tiêu chuẩn 300 DPI, các khổ giấy tiêu chuẩn (A4, A3, A0) và kỹ thuật chừa lề xén (Bleed 2-3mm).'
                : 'Understanding prepress printing technology prevents color deviation and pixelation: subtractive CMYK ink model, 300 DPI standard resolution, ISO paper sizes, and 2-3mm trim bleeds.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Brain className="w-4 h-4" />
              <span>{isVi ? 'Kiến thức Liên ngành Rộng lớn (SGK Trang 158)' : 'Interdisciplinary Breadth'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isVi
                ? 'Nhà thiết kế cần am hiểu đa lĩnh vực: Toán học (tỉ lệ vàng 1:1.618, hình học không gian, toạ độ vector); Vật lí (quang học, ánh sáng, góc chiếu, khúc xạ); Nghệ thuật (nhịp điệu thị giác, tâm lý màu sắc); và Xã hội (nắm bắt xu hướng thị hiếu công chúng).'
                : 'Designers require interdisciplinary depth: Mathematics (golden ratio 1:1.618, geometry), Physics (optics, lighting reflections), Arts (visual rhythm, color psychology), and Sociology (cultural trends).'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Tool: Graphic Designer Aptitude Radar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-rose-400 font-bold">
                {isVi ? 'Tự Đánh Giá Năng Lực • SGK Trang 158' : 'Self-Assessment Aptitude Radar'}
              </span>
              <h3 className="font-bold text-white text-base">
                {isVi ? 'Thử Thách Đánh Giá Tố Chất & Độ Phù Hợp Nghề Đồ Hoạ' : 'Graphic Designer Aptitude Assessment Radar'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">{isVi ? 'Điểm tiềm năng:' : 'Aptitude Score:'}</span>
            <span className="text-sm font-black font-mono text-rose-400">{averageAptitude} / 10</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Sliders for 5 Competency Pillars */}
          <div className="space-y-3.5 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            {/* 1. Sáng tạo & Thẩm mỹ */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-semibold">{isVi ? '1. Khả năng sáng tạo & Cảm nhận cái đẹp:' : '1. Creativity & Aesthetic Sensibility:'}</span>
                <span className="font-mono font-bold text-rose-400">{aptitudeScores.creativity}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={aptitudeScores.creativity}
                onChange={(e) => setAptitudeScores({ ...aptitudeScores, creativity: parseInt(e.target.value) })}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 2. Kĩ năng công nghệ & Phần mềm */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-semibold">{isVi ? '2. Thành thạo máy tính & Phần mềm đồ hoạ:' : '2. Computer & Graphic Software Mastery:'}</span>
                <span className="font-mono font-bold text-blue-400">{aptitudeScores.techSkills}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={aptitudeScores.techSkills}
                onChange={(e) => setAptitudeScores({ ...aptitudeScores, techSkills: parseInt(e.target.value) })}
                className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 3. Tự học & Cập nhật xu hướng */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-semibold">{isVi ? '3. Tinh thần tự học & Nắm bắt xu hướng mới:' : '3. Lifelong Learning & Trend Agility:'}</span>
                <span className="font-mono font-bold text-emerald-400">{aptitudeScores.selfLearning}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={aptitudeScores.selfLearning}
                onChange={(e) => setAptitudeScores({ ...aptitudeScores, selfLearning: parseInt(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 4. Tư duy phản biện & Phân tích */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-semibold">{isVi ? '4. Kĩ năng đánh giá, phản biện & Phân tích:' : '4. Critical Evaluation & Visual Analysis:'}</span>
                <span className="font-mono font-bold text-amber-400">{aptitudeScores.criticalThinking}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={aptitudeScores.criticalThinking}
                onChange={(e) => setAptitudeScores({ ...aptitudeScores, criticalThinking: parseInt(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* 5. Kiến thức liên ngành & Ngoại ngữ */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-semibold">{isVi ? '5. Kiến thức liên ngành, Toán học & Ngoại ngữ:' : '5. Interdisciplinary Science & Foreign Languages:'}</span>
                <span className="font-mono font-bold text-purple-400">{aptitudeScores.interdisciplinary}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={aptitudeScores.interdisciplinary}
                onChange={(e) => setAptitudeScores({ ...aptitudeScores, interdisciplinary: parseInt(e.target.value) })}
                className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>
          </div>

          {/* Visual Pentagon Radar Chart & Advice */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border border-slate-800" />
              <div className="absolute inset-6 rounded-full border border-slate-800" />
              <div className="absolute inset-12 rounded-full border border-slate-800" />

              {/* Dynamic polygon SVG */}
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {(() => {
                  const cx = 100;
                  const cy = 100;
                  const maxR = 80;
                  const vals = [
                    aptitudeScores.creativity,
                    aptitudeScores.techSkills,
                    aptitudeScores.selfLearning,
                    aptitudeScores.criticalThinking,
                    aptitudeScores.interdisciplinary
                  ];
                  const points = vals.map((v, i) => {
                    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                    const r = (v / 10) * maxR;
                    const x = cx + r * Math.cos(angle);
                    const y = cy + r * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ');

                  return (
                    <polygon
                      points={points}
                      fill="rgba(244, 63, 94, 0.35)"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                    />
                  );
                })()}
              </svg>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white">{averageAptitude * 10}%</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-sm text-white mb-1">
                {averageAptitude >= 8
                  ? (isVi ? '🌟 Tố chất Nghệ thuật & Công nghệ Xuất sắc!' : '🌟 Outstanding Creative & Tech Aptitude!')
                  : averageAptitude >= 6
                  ? (isVi ? '👍 Tiềm năng Nghề nghiệp rất hứa hẹn!' : '👍 Very Promising Career Potential!')
                  : (isVi ? '🌱 Cần rèn luyện thêm kĩ năng phần mềm & mỹ thuật' : '🌱 Build software and artistic foundation')}
              </h5>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                {isVi
                  ? 'Theo SGK Trang 158: Sự phối hợp giữa con mắt thẩm mĩ tinh tế và tư duy công nghệ chính là chìa khoá vàng giúp nhà thiết kế đồ hoạ tạo ra những sản phẩm truyền thông đột phá.'
                  : 'According to textbook page 158: The fusion of aesthetic refinement and technological proficiency is the hallmark of groundbreaking visual communicators.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ Trang 158 SGK */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 bg-linear-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/50 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
          <Bookmark className="w-4 h-4 shrink-0" />
          <BilingualText
            vi="Hộp Ghi nhớ (SGK Trang 158)"
            en="Key Takeaways (Textbook page 158)"
          />
        </div>
        <div className="text-xs sm:text-sm text-slate-100 space-y-1">
          <p className="font-semibold text-rose-300">
            <BilingualText
              vi="Người làm nghề thiết kế đồ hoạ cần có:"
              en="A professional graphic designer requires:"
            />
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-xs">
            <li className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span>
                <BilingualText
                  vi="Khả năng sáng tạo, yêu thích và cảm nhận được cái đẹp."
                  en="Creativity, passion, and deep aesthetic sensibility."
                />
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span>
                <BilingualText
                  vi="Kiến thức về công nghệ nói chung, công nghệ in ấn, CNTT và truyền thông."
                  en="Knowledge of technology, prepress printing, IT and media."
                />
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span>
                <BilingualText
                  vi="Kiến thức rộng về toán học, vật lí, nghệ thuật, xã hội..."
                  en="Broad interdisciplinary scope (math, physics, arts, sociology)."
                />
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span>
                <BilingualText
                  vi="Kĩ năng vẽ, sắp xếp các đối tượng đồ hoạ hài hoà."
                  en="Drafting skills and harmonious object spatial arrangement."
                />
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span>
                <BilingualText
                  vi="Thành thạo máy tính, thiết bị thông minh & phần mềm thiết kế đồ hoạ."
                  en="Proficiency in computers, smart devices, and specialized design suites."
                />
              </span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-blue-400 font-bold">•</span>
              <span>
                <BilingualText
                  vi="Kĩ năng học hỏi những điều mới, công nghệ mới, tìm kiếm thông tin."
                  en="Agility to adopt new workflows, emerging tools, and search mastery."
                />
              </span>
            </li>
            <li className="flex items-start gap-1.5 md:col-span-2">
              <span className="text-blue-400 font-bold">•</span>
              <span>
                <BilingualText
                  vi="Kĩ năng đánh giá, phản biện, phân tích cũng như tư duy với những con số và khả năng ngoại ngữ."
                  en="Critical evaluation, analytical critique, numerical logic, and foreign languages."
                />
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Câu hỏi củng cố cuối Mục 2 (SGK Trang 158) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <BilingualText
            vi="Câu hỏi củng cố Mục 2 (SGK Trang 158)"
            en="Reinforcement Question 2 (Page 158)"
          />
        </div>

        <p className="text-xs sm:text-sm text-slate-200">
          <BilingualText
            vi="Theo em, những kĩ năng, tố chất nào là cần thiết nhất cho người thiết kế đồ hoạ?"
            en="In your opinion, which skills and qualities are most essential for a graphic designer?"
          />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { id: 'A', textVi: 'A. Có hiểu biết sâu về toán học.', textEn: 'A. Deep specialized expertise in pure mathematics.' },
            { id: 'B', textVi: 'B. Có khả năng sử dụng thành thạo phần mềm đồ hoạ máy tính và có kiến thức về công nghệ.', textEn: 'B. Proficiency in computer graphic design software and tech foundation.' },
            { id: 'C', textVi: 'C. Biết chơi nhiều nhạc cụ khác nhau.', textEn: 'C. Knowing how to play various musical instruments.' },
            { id: 'D', textVi: 'D. Có khả năng cảm nhận cái đẹp và khả năng sáng tạo.', textEn: 'D. Aesthetic sensibility and boundless creative capacity.' }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setSelectedReinforceOption(opt.id);
                setShowReinforceResult(true);
              }}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                selectedReinforceOption === opt.id
                  ? opt.id === 'B' || opt.id === 'D'
                    ? 'bg-emerald-500 text-white font-bold border-emerald-500 shadow-md'
                    : 'bg-rose-500 text-white font-bold border-rose-500 shadow-md'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <BilingualText vi={opt.textVi} en={opt.textEn} />
            </button>
          ))}
        </div>

        {showReinforceResult && (selectedReinforceOption === 'B' || selectedReinforceOption === 'D') && (
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs sm:text-sm text-slate-200 space-y-2 animate-in fade-in">
            <p className="font-bold text-emerald-400">
              <BilingualText
                vi="Phân tích đáp án chuẩn mực SGK Trang 158:"
                en="Textbook Analysis:"
              />
            </p>
            <div className="text-slate-300 leading-relaxed">
              <BilingualText
                vi="Đáp án cốt lõi gồm cả B và D! Trong đó, khả năng cảm nhận cái đẹp và sáng tạo (D) là “linh hồn” của tác phẩm, còn khả năng sử dụng thành thạo phần mềm đồ hoạ máy tính (B) là “công cụ hiện thực hoá” ý tưởng sáng tạo đó. (Hiểu biết toán học A và âm nhạc C là yếu tố bổ trợ, không phải là điều kiện tiên quyết bắt buộc)."
                en='Both B and D are core imperatives! Aesthetic sensibility and creativity (D) provide the conceptual soul, while software mastery (B) serves as the indispensable execution instrument.'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
