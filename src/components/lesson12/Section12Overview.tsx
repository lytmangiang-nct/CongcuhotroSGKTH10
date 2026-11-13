import React, { useState } from 'react';
import {
  Palette,
  Sparkles,
  Volume2,
  BookOpen,
  ArrowRight,
  Eye,
  CheckCircle2,
  Grid,
  Layers,
  Maximize2,
  HelpCircle,
  FileCode
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';
import { VectorGraphics3DViewer } from './VectorGraphics3DViewer';

export const Section12Overview: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, setOriginalPageTarget } = useBook();

  // Interactive state
  const [showWarmupAnswer, setShowWarmupAnswer] = useState(false);
  const [showActivity1Detail, setShowActivity1Detail] = useState(false);
  const [activeFlowerComparison, setActiveFlowerComparison] = useState<'both' | 'photo' | 'vector'>('both');

  const sectionSpeechVi =
    'Chủ đề 4: Ứng dụng tin học. Bài 12: Phần mềm thiết kế đồ hoạ. Sau bài này em sẽ: Biết được khái niệm về thiết kế đồ hoạ, phân biệt được đồ hoạ vectơ và đồ hoạ điểm ảnh; sử dụng được các chức năng cơ bản của phần mềm thiết kế đồ hoạ Inkscape để vẽ hình đơn giản. Khởi động quan sát hai hình bông hoa Cosmos: ảnh chụp 12.1a chân thực nhưng vỡ hạt khi phóng to, hình vẽ 12.1b tổng hợp từ hình khối đơn giản và giữ nguyên độ nét ở mọi kích thước.';
  const sectionSpeechEn =
    'Topic 4: Applied Informatics. Lesson 12: Graphic Design Software. Learning objectives: Comprehend fundamental concepts of graphic design, distinguish vector graphics from raster bitmap images, and utilize essential tools in Inkscape to create basic geometrical drawings. Warm-up evaluates Cosmos flowers: 12.1a photograph with rich organic detail pixelating on zoom, and 12.1b vector illustration preserving absolute clarity at any scale.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sky-100 text-xs font-bold backdrop-blur-sm mb-3">
              <Palette className="w-3.5 h-3.5" />
              <span>
                <BilingualText
                  vi="Chủ đề 4 • Ứng dụng tin học"
                  en="Topic 4 • Applied Informatics"
                />
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              <BilingualText
                vi="Bài 12: Phần mềm thiết kế đồ hoạ"
                en="Lesson 12: Graphic Design Software"
              />
            </h1>
            <p className="text-sky-100 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Khám phá bản chất toán học của đồ hoạ vectơ, phân biệt với đồ hoạ điểm ảnh (bitmap), làm quen môi trường Inkscape và nguyên lý xếp lớp (layering) trong không gian 2D."
                en="Explore the mathematical essence of vector graphics versus raster bitmaps, master the Inkscape workspace, and grasp layer stacking fundamentals in 2D design."
              />
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOriginalPageTarget(63)}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/25 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 backdrop-blur-sm cursor-pointer"
              title="Xem trang scan SGK gốc"
            >
              <BookOpen className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'Original SGK p. 63' : 'Xem SGK Trang 63'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Learning Objectives Box (Sau bài này em sẽ) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-600" />
          <BilingualText
            vi="Mục tiêu bài học (Sau bài này em sẽ:)"
            en="Learning Objectives (Upon completing this lesson, you will:)"
          />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 shrink-0 font-bold text-sm">
              01
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-sky-900 dark:text-sky-200">
                <BilingualText
                  vi="Khái niệm thiết kế đồ hoạ & Phân biệt 2 loại đồ hoạ"
                  en="Graphic Design Concepts & Dual Graphics Classification"
                />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                <BilingualText
                  vi="Hiểu bản chất thiết kế đồ hoạ; phân biệt tường minh đồ hoạ vectơ (vector) và đồ hoạ điểm ảnh (bitmap) về cấu trúc dữ liệu, độ nét khi phóng to và mục đích ứng dụng."
                  en="Understand graphic design fundamentals; clearly contrast vector and raster bitmap graphics regarding data structure, zoom scalability, and practical use cases."
                />
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 shrink-0 font-bold text-sm">
              02
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
                <BilingualText
                  vi="Khai thác phần mềm thiết kế đồ hoạ Inkscape"
                  en="Mastering Core Inkscape Tools & Layering"
                />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                <BilingualText
                  vi="Sử dụng thành thạo các chức năng cơ bản của Inkscape (Hộp công cụ, Thanh điều khiển thuộc tính, Bảng màu, chế độ xoay/phóng to và thay đổi thứ tự lớp) để vẽ hình hoàn chỉnh."
                  en="Proficiently operate Inkscape's core functions (Tool box, Controls bar, Palette, transform/rotate modes, and layer stacking) to compose clean illustrations."
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Observation: Hình 12.1a & 12.1b (Hoa Cosmos) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950 border border-sky-300 dark:border-sky-800 flex items-center justify-center text-sky-700 dark:text-sky-300 font-black">
              KĐ
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                <BilingualText
                  vi="Khởi động: Quan sát bông hoa Cosmos (Hình 12.1a vs 12.1b • Trang 63)"
                  en="Warm-up: Observing the Cosmos Flower (Figures 12.1a vs 12.1b • Page 63)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Em hãy quan sát hai hình sau và đưa ra nhận xét về màu sắc, độ nét và sự đa dạng các chi tiết của mỗi hình:"
                  en="Observe these two images and evaluate color transitions, edge sharpness, and detail complexity:"
                />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveFlowerComparison('both')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                activeFlowerComparison === 'both' ? 'bg-white dark:bg-slate-900 text-sky-600 font-bold shadow-xs' : 'text-slate-500'
              }`}
            >
              {bilingualMode === 'en' ? 'Both' : 'Cả hai'}
            </button>
            <button
              type="button"
              onClick={() => setActiveFlowerComparison('photo')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                activeFlowerComparison === 'photo' ? 'bg-white dark:bg-slate-900 text-rose-600 font-bold shadow-xs' : 'text-slate-500'
              }`}
            >
              {bilingualMode === 'en' ? 'Photo 12.1a' : 'Ảnh chụp 12.1a'}
            </button>
            <button
              type="button"
              onClick={() => setActiveFlowerComparison('vector')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                activeFlowerComparison === 'vector' ? 'bg-white dark:bg-slate-900 text-indigo-600 font-bold shadow-xs' : 'text-slate-500'
              }`}
            >
              {bilingualMode === 'en' ? 'Vector 12.1b' : 'Hình vẽ 12.1b'}
            </button>
          </div>
        </div>

        {/* Visual Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Photo card (12.1a) */}
          {(activeFlowerComparison === 'both' || activeFlowerComparison === 'photo') && (
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/60">
                  <BilingualText
                    vi="Hình 12.1a: Ảnh chụp thực tế (Bitmap)"
                    en="Figure 12.1a: Real Photo (Bitmap)"
                  />
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  <BilingualText
                    vi="Tập hợp điểm ảnh pixel"
                    en="Matrix of discrete pixels"
                  />
                </span>
              </div>
              <div className="aspect-video w-full rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden relative border border-slate-700 shadow-inner">
                {/* SVG simulation of photo with noisy gradient simulating real photo */}
                <div className="text-center p-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-rose-700 via-pink-600 to-amber-300 flex items-center justify-center shadow-lg relative">
                    <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-amber-600 animate-pulse" />
                  </div>
                  <span className="text-[11px] text-slate-300 mt-2 block font-mono">
                    <BilingualText
                      vi="Ảnh chụp: Màu sắc phong phú, vi sai đổ bóng, chuyển tông mềm mại"
                      en="Photo: Rich colors, subtle shading, smooth gradients"
                    />
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>
                  <BilingualText vi="Đặc điểm: " en="Characteristics: " />
                </strong>
                <BilingualText
                  vi="Màu sắc rất đa dạng, chi tiết chân thực, chuyển tông liên tục. Tuy nhiên, được cấu tạo từ ma trận các điểm ảnh rời rạc (pixels) nên khi phóng to sẽ bị nhòe và vỡ hạt."
                  en="Very diverse colors, realistic details, continuous tonal gradations. However, it is composed of a discrete matrix of pixels, causing pixelation and blur when enlarged."
                />
              </p>
            </div>
          )}

          {/* Vector card (12.1b) */}
          {(activeFlowerComparison === 'both' || activeFlowerComparison === 'vector') && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60">
                  <BilingualText
                    vi="Hình 12.1b: Hình vẽ bằng phần mềm (Vectơ)"
                    en="Figure 12.1b: Software-Drawn Graphic (Vector)"
                  />
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  <BilingualText
                    vi="Đường nét toán học"
                    en="Mathematical outlines"
                  />
                </span>
              </div>
              <div className="aspect-video w-full rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden relative border border-slate-700 shadow-inner">
                {/* SVG simulation of clean vector flower */}
                <div className="text-center p-4">
                  <svg className="w-24 h-24 mx-auto" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="14" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                      <ellipse
                        key={angle}
                        cx="50"
                        cy="22"
                        rx="7"
                        ry="18"
                        fill="#e11d48"
                        stroke="#9f1239"
                        strokeWidth="1.5"
                        transform={`rotate(${angle} 50 50)`}
                      />
                    ))}
                  </svg>
                  <span className="text-[11px] text-slate-300 mt-2 block font-mono">
                    <BilingualText
                      vi="Hình vẽ vectơ: Tổ hợp từ các hình elip toán học sắc nét tuyệt đối"
                      en="Vector graphic: Formed from perfectly crisp mathematical ellipses"
                    />
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>
                  <BilingualText vi="Đặc điểm: " en="Characteristics: " />
                </strong>
                <BilingualText
                  vi="Tổ hợp từ các hình khối hình học đơn giản (hình tròn đài hoa, các elip cánh hoa). Số lượng màu ít hơn nhưng đường biên cực kỳ sắc nét và giữ nguyên chất lượng ở mọi độ phóng to."
                  en="Formed from geometric shapes (circle center, petal ellipses). Fewer colors, but borders remain razor-sharp and maintain pristine quality at any zoom level."
                />
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <BilingualText
              vi="Khám phá chi tiết sự khác biệt giữa hai loại đồ họa bằng cách nhấp xem đáp án chuẩn SGK:"
              en="Explore detailed differences between both graphics by viewing textbook analysis:"
            />
          </p>
          <button
            type="button"
            onClick={() => setShowWarmupAnswer(!showWarmupAnswer)}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition cursor-pointer shadow-sm"
          >
            {showWarmupAnswer ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Thu gọn phân tích') : (bilingualMode === 'en' ? 'View Textbook Key' : 'Xem giải nghĩa SGK')}
          </button>
        </div>

        {showWarmupAnswer && (
          <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 animate-fadeIn">
            <h4 className="font-bold text-sky-950 dark:text-sky-200">
              <BilingualText
                vi="Kết luận của SGK Tin học 10 (Trang 63):"
                en="Official Conclusion from Textbook Page 63:"
              />
            </h4>
            <p className="leading-relaxed">
              <BilingualText
                vi="«Hình 12.1a là ảnh chụp có độ chi tiết cao, đa dạng về màu sắc nhưng có thể bị nhoè, vỡ hình khi phóng to – hình bitmap. Còn Hình 12.1b là hình vẽ bằng phần mềm thường là tổ hợp từ các hình khối đơn giản, số màu ít và giữ nguyên độ nét khi phóng to hay thu nhỏ – hình vectơ.»"
                en="“Figure 12.1a is a photograph with high detail and diverse colors, but may become blurred or pixelated when enlarged — bitmap image. In contrast, Figure 12.1b is software-drawn artwork composed of geometric shapes with fewer colors, maintaining razor sharpness when enlarged or reduced — vector image.”"
              />
            </p>
          </div>
        )}
      </div>

      {/* 3D Simulation Interactive Studio */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-600" />
            <BilingualText
              vi="Mô phỏng 3D tương tác: Lưới Voxel Pixel vs Bề mặt Vectơ Toán học & Xếp lớp"
              en="3D Interactive Simulation: Voxel Pixel Grid vs Mathematical Vectors & Z-Order"
            />
          </h3>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Three.js WebGL Engine
          </span>
        </div>

        <VectorGraphics3DViewer initialMode="compare" />
      </div>

      {/* Activity 1: So sánh ảnh chụp và hình vẽ bằng phần mềm */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-black">
            {bilingualMode === 'en' ? 'ACT 1' : 'HĐ1'}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Hoạt động 1: So sánh giữa ảnh chụp và hình vẽ bằng phần mềm (Trang 63)"
                en="Activity 1: Comparing Photographs and Software-Drawn Graphics (Page 63)"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <BilingualText
                vi="Thảo luận về sự khác nhau giữa ảnh chụp và hình vẽ bằng phần mềm:"
                en="Discuss key differences between captured photography and software-drawn artwork:"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">
              <BilingualText vi="1. Cấu trúc tạo hình:" en="1. Graphic Structure:" />
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Ảnh chụp tạo từ hàng triệu điểm ảnh pixel rời rạc; hình vẽ tạo từ các đường bao toán học (vectơ)."
                en="Photographs are built from millions of discrete pixels; vector drawings are defined by mathematical curves."
              />
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">
              <BilingualText vi="2. Phóng to ảnh (Zoom):" en="2. Image Scaling (Zoom):" />
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Ảnh chụp phóng to lộ từng hạt pixel vỡ răng cưa; hình vẽ vectơ giữ trọn vẹn độ mịn màng sắc nét."
                en="Enlarged photos show jagged pixel blocks; vector drawings remain perfectly smooth and razor-sharp."
              />
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">
              <BilingualText vi="3. Ứng dụng thực tế:" en="3. Practical Applications:" />
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Ảnh chụp phù hợp chụp phong cảnh, chân dung; hình vẽ vectơ lý tưởng để thiết kế logo, biểu tượng, biển hiệu."
                en="Photos are ideal for portraits and landscapes; vector graphics excel in logos, icons, and signage design."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={12} />

      {/* Bottom Navigation */}
      <div className="flex items-center justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-sky-500/25"
        >
          <span>{bilingualMode === 'en' ? 'Section 1: Vector vs Bitmap Concepts' : 'Mục 1: Thiết kế đồ hoạ (Vector vs Bitmap)'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
