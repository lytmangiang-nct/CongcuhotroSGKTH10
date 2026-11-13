import React, { useState } from 'react';
import {
  Grid,
  Sparkles,
  Volume2,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ZoomIn,
  Layers,
  Scale,
  Maximize2,
  FileSpreadsheet,
  Check,
  X
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

interface CompareCriterion {
  id: string;
  criterionVi: string;
  criterionEn: string;
  bitmapVi: string;
  bitmapEn: string;
  vectorVi: string;
  vectorEn: string;
  winner: 'bitmap' | 'vector' | 'neutral';
}

const COMPARISON_DATA: CompareCriterion[] = [
  {
    id: 'definition',
    criterionVi: '1. Định nghĩa & Cấu trúc',
    criterionEn: '1. Definition & Structure',
    bitmapVi: 'Định nghĩa bằng tập hợp các điểm ảnh (pixel) trên một lưới cố định.',
    bitmapEn: 'Defined by an indexed matrix grid of discrete colored pixels.',
    vectorVi: 'Định nghĩa bằng các phương trình toán học xác định đường nét, hình khối.',
    vectorEn: 'Defined by algebraic formulas (coordinates, curves, radii, strokes).',
    winner: 'neutral'
  },
  {
    id: 'suitability',
    criterionVi: '2. Đặc điểm ứng dụng phù hợp',
    criterionEn: '2. Recommended Use Cases',
    bitmapVi: 'Phù hợp chỉnh sửa ảnh chụp, tranh vẽ nghệ thuật nhiều chi tiết, màu sắc liền mạch và chân thực.',
    bitmapEn: 'Ideal for continuous-tone photography, fine art with rich organic gradients and realistic lighting.',
    vectorVi: 'Phù hợp tạo logo, biểu tượng thương hiệu, minh hoạ, hoạt hình và bản vẽ kĩ thuật.',
    vectorEn: 'Ideal for brand logos, icons, infographics, geometric illustrations, and engineering blueprints.',
    winner: 'neutral'
  },
  {
    id: 'scaling',
    criterionVi: '3. Khả năng phóng to (Scaling)',
    criterionEn: '3. Magnification Scaling Behavior',
    bitmapVi: 'Phóng to có ảnh hưởng chất lượng hình: bị nhoè, vỡ hạt pixel và răng cưa.',
    bitmapEn: 'Zooming degrades visual quality: visible pixelation, jagged edges, and blurriness.',
    vectorVi: 'Có thể co giãn, phóng to hay thu nhỏ tuỳ ý mà không bị vỡ hình, luôn sắc nét.',
    vectorEn: 'Infinitely scalable at any magnification ratio with razor-sharp borders and zero degradation.',
    winner: 'vector'
  },
  {
    id: 'filesize',
    criterionVi: '4. Kích thước tệp lưu trữ',
    criterionEn: '4. File Storage Size vs Scale',
    bitmapVi: 'Ảnh kích thước lớn, độ chi tiết cao thì tương ứng tệp có kích thước (dung lượng) rất lớn.',
    bitmapEn: 'Large high-resolution images require proportionally hefty disk memory footprint.',
    vectorVi: 'Tạo bản in với kích thước tuỳ ý (từ danh thiếp đến biển quảng cáo) mà độ lớn tệp không đổi.',
    vectorEn: 'Printable at any physical size (business cards to billboards) while file weight stays constant.',
    winner: 'vector'
  },
  {
    id: 'conversion',
    criterionVi: '5. Khả năng chuyển đổi qua lại',
    criterionEn: '5. Format Inter-Conversion',
    bitmapVi: 'Không thể chuyển sang đồ hoạ vectơ mà giữ nguyên được chất lượng ban đầu.',
    bitmapEn: 'Cannot be automatically converted to clean vectors without loss or complex tracing artifacts.',
    vectorVi: 'Dễ dàng chuyển đổi (xuất tệp rasterize) sang đồ hoạ điểm ảnh với chất lượng tuyệt hảo.',
    vectorEn: 'Effortlessly exported (rasterized) into any bitmap resolution (PNG, JPEG) with pristine quality.',
    winner: 'vector'
  }
];

export const Section12VectorVsBitmap: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Interactive Loupe (Kính lúp mô phỏng Hình 12.2 SGK)
  const [loupeZoom, setLoupeZoom] = useState<number>(4);
  const [activeCriterion, setActiveCriterion] = useState<string>('scaling');

  // Quick check questions state
  const [q1Choice, setQ1Choice] = useState<'A' | 'B' | null>(null);
  const [q2Choice, setQ2Choice] = useState<'A' | 'B' | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const sectionSpeechVi =
    'Mục 1: Thiết kế đồ hoạ. Thiết kế đồ hoạ là quá trình thiết kế các thông điệp truyền thông bằng hình ảnh; giải quyết vấn đề thông qua sự kết hợp giữa hình ảnh, kiểu chữ với ý tưởng. Có hai loại đồ hoạ cơ bản là đồ hoạ điểm ảnh bitmap và đồ hoạ vectơ. Đồ hoạ điểm ảnh được định nghĩa bằng tập điểm pixel, khi phóng to bị vỡ hình. Đồ hoạ vectơ được định nghĩa bằng phương trình toán học, có thể co giãn tuỳ ý mà không hề suy giảm chất lượng, lý tưởng để thiết kế logo và bản vẽ kỹ thuật.';
  const sectionSpeechEn =
    'Section 1: Graphic Design Fundamentals. Graphic design is the process of visually communicating messages combining imagery, typography, and concepts. The two fundamental paradigms are raster bitmap graphics and vector graphics. Bitmaps rely on pixel grids that pixelate upon zooming. Vector graphics are defined by mathematical formulas, scaling infinitely without loss, making them essential for brand logos, icons, and technical drawings.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header Banner Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-300 dark:border-sky-700/50 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 border border-sky-300 dark:border-sky-700">
              <Grid className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Section 1 • SGK Pages 63–64' : 'Mục 1 • SGK Trang 63–64'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              <BilingualText
                vi="1. THIẾT KẾ ĐỒ HOẠ (ĐỒ HOẠ ĐIỂM ẢNH VS ĐỒ HOẠ VECTƠ)"
                en="1. GRAPHIC DESIGN (RASTER BITMAP VS VECTOR GRAPHICS)"
              />
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <BilingualText
                vi="Khái niệm chuẩn mực về thiết kế đồ hoạ và bảng đối sánh 5 tiêu chí cốt lõi giữa tập hợp điểm pixel và phương trình toán học."
                en="Authoritative graphic design principles and comprehensive 5-criterion comparison between pixel grids and parametric mathematical paths."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Graphic Design Definition Callout */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText vi="Định nghĩa thiết kế đồ hoạ (Graphic Design)" en="Graphic Design Definition" />
        </div>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          <BilingualText
            vi="«Thiết kế đồ hoạ (graphic design) là quá trình thiết kế các thông điệp truyền thông bằng hình ảnh; giải quyết vấn đề thông qua sự kết hợp giữa hình ảnh, kiểu chữ với ý tưởng để truyền tải thông tin đến người xem.»"
            en="«Graphic design is the process of creating visual communication messages; solving problems through the synthesis of imagery, typography, and creative concepts to effectively convey information to audiences.»"
          />
        </p>
      </div>

      {/* Interactive Loupe Magnifier (Hình 12.2 Phóng to một phần ảnh gốc) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <ZoomIn className="w-4 h-4" />
              <BilingualText
                vi="Thí nghiệm mô phỏng Kính lúp (Hình 12.2 SGK Trang 64)"
                en="Loupe Magnifier Experiment (Textbook Figure 12.2 Page 64)"
              />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white mt-1">
              <BilingualText
                vi="Soi cận cảnh: Ảnh chụp Bitmap vs Hình vẽ Vectơ khi phóng to"
                en="Close-Up Inspection: Bitmap Photo vs Vector Graphic on Magnification"
              />
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {bilingualMode === 'en' ? 'Magnification:' : 'Độ phóng kính lúp:'}
            </span>
            {[2, 4, 8, 16].map((mag) => (
              <button
                key={mag}
                type="button"
                onClick={() => setLoupeZoom(mag)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                  loupeZoom === mag
                    ? 'bg-sky-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {mag}x
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bitmap Loupe */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-rose-400 uppercase">
                <BilingualText
                  vi={`Ảnh chụp khi phóng to (${loupeZoom}x)`}
                  en={`Enlarged Bitmap Photo (${loupeZoom}x)`}
                />
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                <BilingualText
                  vi="Bị nhoè, răng cưa từng ô pixel"
                  en="Blurred, pixelated jagged edges"
                />
              </span>
            </div>

            <div className="aspect-video w-full rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden relative border border-slate-800">
              {/* Simulated pixelated blocks */}
              <div
                className="grid gap-[2px] p-2 bg-slate-950 rounded-lg shadow-inner"
                style={{
                  gridTemplateColumns: `repeat(${Math.max(4, 18 - loupeZoom)}, minmax(0, 1fr))`,
                  width: `${Math.min(100, 40 + loupeZoom * 4)}%`
                }}
              >
                {Array.from({ length: Math.pow(Math.max(4, 18 - loupeZoom), 2) }).map((_, idx) => {
                  const isPink = idx % 2 === 0 || idx % 3 === 0;
                  return (
                    <div
                      key={idx}
                      className={`aspect-square rounded-[1px] transition-all duration-200 ${
                        isPink ? 'bg-rose-600/80' : 'bg-pink-500/90'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              <BilingualText
                vi="Mỗi ô vuông là một điểm ảnh (pixel). Khi phóng to quá giới hạn phân giải, các pixel bị lộ rõ khiến đường biên bị răng cưa và mất chi tiết."
                en="Each square represents a pixel. When magnified beyond resolution limits, pixels become visible, causing jagged borders and loss of fine detail."
              />
            </p>
          </div>

          {/* Vector Loupe */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-sky-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-sky-400 uppercase">
                <BilingualText
                  vi={`Hình vẽ vectơ khi phóng to (${loupeZoom}x)`}
                  en={`Enlarged Vector Graphic (${loupeZoom}x)`}
                />
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">
                <BilingualText
                  vi="Đường cong toán học siêu nét"
                  en="Ultra-sharp mathematical curve"
                />
              </span>
            </div>

            <div className="aspect-video w-full rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden relative border border-slate-800">
              <svg className="w-3/4 h-3/4 transition-transform duration-200" viewBox="0 0 100 100">
                <path
                  d="M 20 80 C 20 30, 80 30, 80 80 Z"
                  fill="#e11d48"
                  stroke="#38bdf8"
                  strokeWidth={2 / (loupeZoom * 0.25)}
                />
                <circle cx="50" cy="45" r="4" fill="#38bdf8" />
                <line x1="20" y1="80" x2="50" y2="45" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="80" y1="80" x2="50" y2="45" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
              </svg>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              <BilingualText
                vi="Máy tính dùng công thức toán học tính toán lại tọa độ đường cong Bézier ngay tức thì. Đường nét luôn sắc cạnh hoàn hảo bất kể phóng to đến mức nào."
                en="The computer recalculates Bézier curve equations dynamically in real-time. Lines remain flawlessly sharp regardless of zoom factor."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Official Comparison Table (Bảng so sánh SGK Trang 64) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
            <BilingualText
              vi="Bảng so sánh chi tiết giữa Đồ hoạ điểm ảnh và Đồ hoạ vectơ (SGK Trang 64)"
              en="Official Comparison: Raster Bitmap vs Vector Graphics (Textbook Page 64)"
            />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            <BilingualText
              vi="Bảng chuẩn hóa 5 tiêu chí sư phạm cốt lõi trong sách giáo khoa Tin học 10 Kết nối tri thức:"
              en="Core comparison table of 5 pedagogical criteria in Informatics 10 textbook:"
            />
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                <th className="py-3 px-4">
                  <BilingualText vi="Tiêu chí so sánh" en="Comparison Criterion" />
                </th>
                <th className="py-3 px-4 text-rose-700 dark:text-rose-400">
                  <BilingualText vi="Đồ hoạ điểm ảnh (Bitmap)" en="Raster Graphics (Bitmap)" />
                </th>
                <th className="py-3 px-4 text-sky-700 dark:text-sky-400">
                  <BilingualText vi="Đồ hoạ vectơ (Vector)" en="Vector Graphics" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
              {COMPARISON_DATA.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setActiveCriterion(row.id)}
                  className={`transition-colors cursor-pointer ${
                    activeCriterion === row.id
                      ? 'bg-sky-50/70 dark:bg-sky-950/40 font-medium'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    <BilingualText vi={row.criterionVi} en={row.criterionEn} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                    <BilingualText vi={row.bitmapVi} en={row.bitmapEn} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-semibold text-sky-900 dark:text-sky-200">
                    <BilingualText vi={row.vectorVi} en={row.vectorEn} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Box 1 (Hộp Ghi nhớ 1 - SGK Trang 64) */}
      <div className="p-6 rounded-3xl bg-amber-50/90 dark:bg-amber-950/30 border-2 border-dashed border-amber-400 dark:border-amber-700/80 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="font-black text-amber-950 dark:text-amber-200 text-base sm:text-lg">
            <BilingualText
              vi="Hộp Ghi nhớ 1: Khái niệm & Hai loại đồ hoạ (SGK Trang 64)"
              en="Summary Box 1: Core Definitions & Dual Graphics Types (Page 64)"
            />
          </h3>
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <li className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>
              <strong>
                <BilingualText vi="Thiết kế đồ hoạ: " en="Graphic Design: " />
              </strong>
              <BilingualText
                vi="Là tạo ra sản phẩm bằng hình ảnh, chữ để truyền tải thông tin đến người xem."
                en="Creating products with images and text to convey visual information to viewers."
              />
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>
              <strong>
                <BilingualText vi="Hai loại đồ hoạ cơ bản: " en="Two Fundamental Types: " />
              </strong>
              <BilingualText
                vi="Là đồ hoạ điểm ảnh (bitmap) và đồ hoạ vectơ (vector)."
                en="Raster bitmap graphics and mathematical vector graphics."
              />
            </span>
          </li>
        </ul>
      </div>

      {/* End-of-Section Concept Mastery Check (Câu hỏi Trang 64) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              <BilingualText
                vi="Câu hỏi kiểm tra nhanh (SGK Trang 64)"
                en="Quick Concept Check (Textbook Page 64)"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {bilingualMode === 'en' ? '2 mandatory questions' : '2 câu hỏi bắt buộc'}
          </span>
        </div>

        {/* Question 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            <BilingualText
              vi="1. Ảnh chụp là loại đồ hoạ nào?"
              en="1. What type of graphics is a photograph?"
            />
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'A', viText: 'A. Đồ hoạ điểm ảnh (bitmap)', enText: 'A. Raster graphics (bitmap)', correct: true },
              { key: 'B', viText: 'B. Đồ hoạ vectơ (vector)', enText: 'B. Vector graphics', correct: false }
            ].map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => !quizSubmitted && setQ1Choice(opt.key as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  q1Choice === opt.key
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {bilingualMode === 'en' ? opt.enText : opt.viText}
              </button>
            ))}
          </div>
        </div>

        {/* Question 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            <BilingualText
              vi="2. Tại sao dùng đồ hoạ vectơ phù hợp hơn dùng đồ hoạ điểm ảnh khi thiết kế logo?"
              en="2. Why are vector graphics more suitable than raster bitmap graphics for logo design?"
            />
          </p>
          <div className="flex flex-col gap-2">
            {[
              {
                key: 'A',
                viText: 'A. Vì logo cần in trên nhiều vật phẩm kích thước khác nhau (từ bút, card visit đến biển quảng cáo lớn), đồ hoạ vectơ co giãn không bị vỡ hình.',
                enText: 'A. Because logos are printed on items of varying sizes (from pens and business cards to giant billboards), vector graphics scale without quality loss.',
                correct: true
              },
              {
                key: 'B',
                viText: 'B. Vì đồ hoạ vectơ chụp được nhiều chi tiết chuyển màu chân thực hơn đồ hoạ điểm ảnh.',
                enText: 'B. Because vector graphics capture more realistic continuous color gradations than bitmap photos.',
                correct: false
              }
            ].map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => !quizSubmitted && setQ2Choice(opt.key as any)}
                className={`p-3 text-left rounded-xl text-xs font-semibold transition cursor-pointer ${
                  q2Choice === opt.key
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {bilingualMode === 'en' ? opt.enText : opt.viText}
              </button>
            ))}
          </div>
        </div>

        {quizSubmitted && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 space-y-1 animate-fadeIn">
            <p className="font-bold">
              <BilingualText
                vi="✓ Kết quả: Cả 2 câu trả lời của em đều hoàn toàn chính xác!"
                en="✓ Result: Both of your answers are completely correct!"
              />
            </p>
            <p>
              <BilingualText
                vi="Ảnh chụp luôn là đồ hoạ điểm ảnh; và đồ hoạ vectơ là lựa chọn tối ưu cho logo thương hiệu nhờ tính năng co giãn bất chấp kích thước mà dung lượng tệp không tăng."
                en="Photographs are always raster bitmap graphics; vector graphics are optimal for brand logos because they scale infinitely without file size bloat."
              />
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          {!quizSubmitted ? (
            <button
              type="button"
              onClick={() => {
                if (q1Choice && q2Choice) setQuizSubmitted(true);
              }}
              disabled={!q1Choice || !q2Choice}
              className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer shadow-sm"
            >
              {bilingualMode === 'en' ? 'Check Answers' : 'Kiểm tra đáp án'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setQ1Choice(null);
                setQ2Choice(null);
                setQuizSubmitted(false);
              }}
              className="px-4 py-2 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs transition cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Retry' : 'Làm lại'}
            </button>
          )}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={12} />

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={prevPage}
          className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{bilingualMode === 'en' ? 'Overview' : 'Tổng quan bài 12'}</span>
        </button>

        <button
          type="button"
          onClick={nextPage}
          className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-sky-500/25"
        >
          <span>{bilingualMode === 'en' ? 'Section 2: Inkscape Interface' : 'Mục 2: Phần mềm đồ hoạ & Giao diện Inkscape'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
