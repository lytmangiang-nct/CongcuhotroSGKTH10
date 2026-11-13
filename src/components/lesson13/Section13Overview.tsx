import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  BookOpen,
  ArrowRight,
  Layers,
  Shapes,
  CheckCircle2,
  HelpCircle,
  Eye,
  RotateCw
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { BooleanGeometry3DViewer } from './BooleanGeometry3DViewer';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section13Overview: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage } = useBook();

  // Warm-up Watermelon interactive layer stack
  const [activeWatermelonLayer, setActiveWatermelonLayer] = useState<number | null>(null);

  const sectionSpeechVi =
    'Bài 13: Bổ sung các đối tượng đồ hoạ, thuộc Chủ đề 4: Ứng dụng tin học, SGK Tin học 10 Kết nối tri thức với cuộc sống, Trang 69. Sau bài học này em sẽ: Biết và sử dụng được một số chức năng của các lệnh tạo, điều chỉnh các đối tượng đồ hoạ đơn giản; Biết và thực hiện được các phép ghép đối tượng đồ hoạ. Hoạt động Khởi động: Quan sát hình vẽ miếng dưa hấu ở Hình 13.1 và kể các đối tượng có trong hình vẽ. Xác định thứ tự các lớp của các đối tượng trong hình vẽ. Mời các em tương tác với mô hình 3D Three.js để khám phá 6 phép ghép hình học và kỹ thuật tô màu chuyển sắc khối cầu.';
  const sectionSpeechEn =
    'Lesson 13: Adding Graphic Objects, under Topic 4: Applied Informatics, Grade 10 Textbook Connecting Knowledge to Life, Page 69. Learning Objectives: Master core commands for creating and modifying primitive shapes; understand and execute Boolean path combination operations. Warm-up: Examine the watermelon slice illustration in Figure 13.1, enumerate its geometric sub-elements, and deduce their stacking layer sequence. Interact with the professional Three.js 3D model below to explore 6 Boolean operations and radial volumetric shading.';

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
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-semibold backdrop-blur-sm mb-3">
              <Shapes className="w-3.5 h-3.5" />
              <span>
                <BilingualText
                  vi="Chủ đề 4: Ứng dụng tin học • Trang 69 – 74 SGK"
                  en="Topic 4: Applied Informatics • Textbook pp. 69 – 74"
                />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="BÀI 13: BỔ SUNG CÁC ĐỐI TƯỢNG ĐỒ HOẠ"
                en="LESSON 13: ADDING GRAPHIC OBJECTS"
              />
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Nắm vững tham số hình khối cơ bản (W, H, Rx, Ry, Corners, Rounded), hộp thoại Fill and Stroke và 6 phép ghép hình học Boolean (Union, Difference, Intersection, Exclusion, Division, Cut Path)."
                en="Master primitive parameters (W, H, Rx, Ry, Corners, Rounded), the Fill & Stroke styling panel, and 6 Boolean path operations."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Learning Objectives Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
          <BookOpen className="w-6 h-6" />
          <h3 className="text-lg font-bold">
            <BilingualText
              vi="MỤC TIÊU BÀI HỌC (SAU BÀI NÀY EM SẼ)"
              en="LEARNING OBJECTIVES (UPON COMPLETION)"
            />
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                <BilingualText
                  vi="Điều khiển tham số đối tượng hình khối"
                  en="Control Primitive Shape Parameters"
                />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                <BilingualText
                  vi="Biết và sử dụng được một số chức năng của các lệnh tạo, điều chỉnh các đối tượng đồ hoạ đơn giản (hình chữ nhật bo góc, hình tròn/cung mở, hình sao bo cong)."
                  en="Understand and operate key properties to customize basic geometric objects (rounded rectangles, arc sectors, curved stars)."
                />
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                <BilingualText
                  vi="Thực hiện các phép ghép đối tượng đồ hoạ"
                  en="Execute Boolean Path Operations"
                />
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                <BilingualText
                  vi="Biết và thực hiện thành thạo 6 phép ghép đối tượng đồ hoạ trong menu Path: Hợp, Hiệu, Giao, Hiệu đối xứng, Chia và Cắt đường viền."
                  en="Master 6 Boolean path combination commands under the Path menu: Union, Difference, Intersection, Exclusion, Division, and Cut Path."
                />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up Challenge: Watermelon Slice Stacking Analysis (Hình 13.1 SGK Trang 69) */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-850 p-6 rounded-3xl border border-amber-200 dark:border-slate-700 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-black text-xs">
              ?
            </span>
            <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
              <BilingualText
                vi="HOẠT ĐỘNG KHỞI ĐỘNG: BÓC TÁCH LỚP HÌNH VẼ MIẾNG DƯA HẤU (HÌNH 13.1)"
                en="WARM-UP CHALLENGE: WATERMELON SLICE LAYER DECOMPOSITION (FIGURE 13.1)"
              />
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-200/80 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-300">
            Trang 69 SGK
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
          <BilingualText
            vi="« Quan sát hình vẽ miếng dưa hấu ở Hình 13.1 và kể các đối tượng có trong hình vẽ. Xác định thứ tự các lớp của các đối tượng trong hình vẽ. »"
            en="« Observe the watermelon slice illustration in Figure 13.1 and list all objects present. Determine their relative layer stacking order. »"
          />
        </p>

        {/* Interactive Watermelon Layer Exploder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-2">
          {/* SVG Visualizer */}
          <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
              <BilingualText
                vi="HÌNH 13.1: MIẾNG DƯA HẤU (TƯƠNG TÁC BẤM LỚP)"
                en="FIGURE 13.1: WATERMELON SLICE (INTERACTIVE LAYERS)"
              />
            </div>

            <svg viewBox="0 0 320 180" className="w-full max-w-[280px] drop-shadow-md overflow-visible">
              {/* Layer 1: Green Outer Rind Arc */}
              <path
                d="M 20 30 A 140 140 0 0 0 300 30 Z"
                fill={activeWatermelonLayer === 1 || activeWatermelonLayer === null ? '#16a34a' : '#cbd5e1'}
                stroke="#14532d"
                strokeWidth="2"
                className="transition-all duration-300 cursor-pointer"
                onClick={() => setActiveWatermelonLayer(1)}
              />

              {/* Layer 2: Light Green / White Pith Arc */}
              <path
                d="M 28 30 A 132 132 0 0 0 292 30 Z"
                fill={activeWatermelonLayer === 2 || activeWatermelonLayer === null ? '#bbf7d0' : '#e2e8f0'}
                className="transition-all duration-300 cursor-pointer"
                onClick={() => setActiveWatermelonLayer(2)}
              />

              {/* Layer 3: Red Flesh Arc */}
              <path
                d="M 38 30 A 122 122 0 0 0 282 30 Z"
                fill={activeWatermelonLayer === 3 || activeWatermelonLayer === null ? '#ef4444' : '#f1f5f9'}
                className="transition-all duration-300 cursor-pointer"
                onClick={() => setActiveWatermelonLayer(3)}
              />

              {/* Layer 4: Black Seeds on top */}
              {[
                { cx: 70, cy: 55, r: 8 },
                { cx: 105, cy: 90, r: 25 },
                { cx: 160, cy: 110, r: 0 },
                { cx: 215, cy: 90, r: -25 },
                { cx: 250, cy: 55, r: -8 },
                { cx: 125, cy: 60, r: 15 },
                { cx: 195, cy: 60, r: -15 },
                { cx: 160, cy: 75, r: 0 }
              ].map((seed, i) => (
                <ellipse
                  key={i}
                  cx={seed.cx}
                  cy={seed.cy}
                  rx="4.5"
                  ry="7"
                  transform={`rotate(${seed.r} ${seed.cx} ${seed.cy})`}
                  fill={activeWatermelonLayer === 4 || activeWatermelonLayer === null ? '#0f172a' : '#94a3b8'}
                  className="transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveWatermelonLayer(4)}
                />
              ))}
            </svg>

            <span className="text-[11px] text-slate-500 mt-3 italic">
              {activeWatermelonLayer === null
                ? 'Nhấp vào các nút bên phải để bóc tách từng lớp'
                : `Đang làm nổi bật: Lớp ${activeWatermelonLayer}`}
            </span>
          </div>

          {/* Layer Breakdown Buttons */}
          <div className="space-y-2.5">
            {[
              {
                id: 1,
                nameVi: 'Lớp 1 (Đáy cùng): Cung tròn vỏ dưa màu xanh sẫm',
                nameEn: 'Layer 1 (Bottom): Dark green outer rind arc',
                tag: 'Nửa hình tròn R = 140'
              },
              {
                id: 2,
                nameVi: 'Lớp 2: Cung tròn cùi dưa màu xanh nhạt',
                nameEn: 'Layer 2: Pale green inner pith arc',
                tag: 'Nửa hình tròn R = 132'
              },
              {
                id: 3,
                nameVi: 'Lớp 3: Cung tròn ruột dưa màu đỏ tươi',
                nameEn: 'Layer 3: Red juicy flesh arc',
                tag: 'Nửa hình tròn R = 122'
              },
              {
                id: 4,
                nameVi: 'Lớp 4 (Trên cùng): Các hạt dưa đen hình giọt nước',
                nameEn: 'Layer 4 (Top): Black teardrop seeds',
                tag: 'Các hình elip xoay góc'
              }
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() =>
                  setActiveWatermelonLayer(activeWatermelonLayer === layer.id ? null : layer.id)
                }
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between text-xs cursor-pointer ${
                  activeWatermelonLayer === layer.id
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md font-bold'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] ${
                    activeWatermelonLayer === layer.id ? 'bg-white text-amber-700' : 'bg-slate-100 dark:bg-slate-700 text-slate-600'
                  }`}>
                    {layer.id}
                  </span>
                  <span>
                    <BilingualText vi={layer.nameVi} en={layer.nameEn} />
                  </span>
                </div>
                <span className="text-[10px] opacity-75 font-mono">{layer.tag}</span>
              </button>
            ))}

            <button
              onClick={() => setActiveWatermelonLayer(null)}
              className="text-xs text-amber-700 dark:text-amber-300 hover:underline pt-1 flex items-center gap-1 cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Hiển thị đầy đủ tất cả các lớp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Embedded 3D Three.js Simulation Model */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              <BilingualText
                vi="PHÒNG THÍ NGHIỆM 3D TƯƠNG TÁC THREE.JS (BÀI 13)"
                en="INTERACTIVE THREE.JS 3D VIRTUAL LAB (LESSON 13)"
              />
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            WebGL 3D Engine • Real-time Shaders
          </span>
        </div>

        <BooleanGeometry3DViewer />
      </div>

      {/* Navigation footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="text-xs text-slate-500">
          <BilingualText vi="Phần 0 / 5 • Giới thiệu & Khởi động" en="Section 0 of 5 • Warm-up & 3D Lab" />
        </div>
        <button
          onClick={nextPage}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <span>
            <BilingualText vi="Tiếp tục: 1. Các đối tượng hình khối" en="Next: 1. Geometric Primitive Shapes" />
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pedagogical Prompts for Teachers */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={13} />
    </div>
  );
};
