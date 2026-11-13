import React, { useState } from 'react';
import {
  Wrench,
  Volume2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Flower2,
  Flag,
  Scissors,
  Layers,
  Wand2,
  Maximize2
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section14PracticalLab: React.FC = () => {
  const { speak, isSpeaking, stopSpeaking, bilingualMode, nextPage, prevPage } = useBook();

  // Task 1: Leaf Drawing stepper (Figures 14.11 & 14.12)
  const [task1Step, setTask1Step] = useState<number>(6);

  // Task 2: Festive Banner stepper (Figures 14.13 & 14.14)
  const [task2Step, setTask2Step] = useState<number>(6);

  const sectionSpeechVi =
    'Mục 4: Thực hành - Trang 79 và 80 SGK Tin học 10. Bài thực hành gồm 2 nhiệm vụ trọng tâm: Nhiệm vụ 1: Vẽ chiếc lá và tô màu từ hình chữ nhật qua 6 bước: vẽ hình chữ nhật, chuyển khối thành đường Object to Path, gộp 2 điểm neo đỉnh trên thành 1 điểm nhọn tam giác, chuyển 2 điểm neo đáy thành điểm neo trơn kéo phình bầu lá, vẽ cuống lá bằng Pen và tô màu xanh lá tươi. Nhiệm vụ 2: Viết chữ theo khuôn dạng uốn lượn Chúc mừng năm mới trên dải cờ tiệc qua 6 bước: vẽ đường cong 3 điểm bằng Pen, chuyển điểm neo giữa thành neo trơn, gõ chữ, uốn chữ theo đường bằng lệnh Text / Put on Path, ẩn nét vẽ đường dẫn và xếp dải cờ tam giác trang trí.';
  const sectionSpeechEn =
    'Section 4: Practical Lab - Pages 79 and 80 of Informatics 10 Textbook. Featuring 2 core hands-on tasks: Task 1: Draw and color a leaf from a rectangle primitive in 6 steps: draft rectangle, execute Object to Path, merge top nodes into sharp apex, convert bottom nodes to smooth curving nodes, draw stalk with Pen tool, and apply green fill. Task 2: Curve celebratory text along a festive pennant arch in 6 steps: draft 3-point curve with Pen, smooth central node with Node tool, type festive greeting, bind text via Text / Put on Path, hide guide stroke, and array colorful triangular party banners.';

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
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-indigo-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Wrench className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-emerald-500/30 border border-emerald-300/40 rounded-full text-xs font-semibold text-emerald-200 uppercase tracking-wider mb-1">
                <BilingualText
                  vi="Phần 4 • Thực hành chuyên sâu (Trang 79 – 80)"
                  en="Section 4 • Practical Hands-On Lab (Pages 79 – 80)"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                <BilingualText
                  vi="4. Thực hành: Uốn nắn đường cong & Chữ nghệ thuật"
                  en="4. Practice: Path Sculpting & Text on Path"
                />
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TASK 1: DRAWING A LEAF (Figures 14.11 & 14.12)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4 flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center text-lg">
              1
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <BilingualText
                  vi="Nhiệm vụ 1: Vẽ chiếc lá và tô màu chiếc lá (Hình 14.11 & 14.12)"
                  en="Task 1: Draw and Color a Leaf from Rectangle (Figs 14.11 & 14.12)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Quy trình 6 bước: Hình chữ nhật -> Object to Path -> Gộp đỉnh nhọn -> Uốn phình neo trơn -> Cuống lá"
                  en="6-Step Flow: Rectangle -> Object to Path -> Join Apex -> Smooth Flanks -> Stalk Pen"
                />
              </p>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700/60 p-1.5 rounded-2xl">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <button
                key={s}
                onClick={() => setTask1Step(s)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                  task1Step === s
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {bilingualMode === 'en' ? `Step ${s}` : `Bước ${s}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Interactive Leaf SVG Visualizer */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[340px] relative shadow-inner">
            <div className="absolute top-3 left-4 text-xs font-mono text-emerald-400">
              {task1Step === 1 && 'Step 1: Rectangle Primitive (14.12a)'}
              {task1Step === 2 && 'Step 2: Path / Object to Path (14.12b)'}
              {task1Step === 3 && 'Step 3: Join Top 2 Nodes -> Triangle (14.12c)'}
              {task1Step === 4 && 'Step 4: Bottom Nodes to Smooth (14.12d)'}
              {task1Step === 5 && 'Step 5: Add Stalk with Pen (14.12e)'}
              {task1Step === 6 && 'Step 6: Fill Color Complete (14.11)'}
            </div>

            <svg viewBox="-90 -110 180 220" className="w-56 h-64 select-none drop-shadow-2xl">
              {/* Step 1: Base Rectangle */}
              {task1Step === 1 && (
                <g>
                  <rect
                    x="-35"
                    y="-70"
                    width="70"
                    height="140"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  <rect x="-39" y="-74" width="8" height="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                  <rect x="31" y="-74" width="8" height="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                  <rect x="-39" y="66" width="8" height="8" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
                  <circle cx="35" cy="-65" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              )}

              {/* Step 2: Object to Path (4 independent path nodes) */}
              {task1Step === 2 && (
                <g>
                  <rect
                    x="-35"
                    y="-70"
                    width="70"
                    height="140"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  <rect x="-39" y="-74" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="31" y="-74" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="31" y="66" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <rect x="-39" y="66" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              )}

              {/* Step 3: Triangle (Top nodes joined into 1 apex) */}
              {task1Step === 3 && (
                <g>
                  <polygon
                    points="0,-80 35,70 -35,70"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  {/* Joined apex node */}
                  <polygon points="0,-85 5,-80 0,-75 -5,-80" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Bottom 2 corner nodes */}
                  <polygon points="35,65 40,70 35,75 30,70" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                  <polygon points="-35,65 -30,70 -35,75 -40,70" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              )}

              {/* Step 4: Bottom nodes converted to smooth, swelling outwards */}
              {task1Step === 4 && (
                <g>
                  <path
                    d="M 0,-85 C 45,-30 55,40 0,65 C -55,40 -45,-30 0,-85 Z"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                  {/* Apex corner node */}
                  <polygon points="0,-90 5,-85 0,-80 -5,-85" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Bottom smooth node with handles */}
                  <rect x="-4" y="61" width="8" height="8" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Tangent rods */}
                  <line x1="0" y1="65" x2="35" y2="60" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <line x1="0" y1="65" x2="-35" y2="60" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                  <circle cx="35" cy="60" r="4" fill="#f59e0b" />
                  <circle cx="-35" cy="60" r="4" fill="#f59e0b" />
                </g>
              )}

              {/* Step 5: Add stalk curve with Pen */}
              {task1Step === 5 && (
                <g>
                  <path
                    d="M 0,-85 C 45,-30 55,40 0,65 C -55,40 -45,-30 0,-85 Z"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                  {/* Curved Stalk */}
                  <path d="M 0,65 Q 4,85 10,105" fill="none" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="10" cy="105" r="3.5" fill="#d97706" />
                </g>
              )}

              {/* Step 6: Full Colored Leaf (Figure 14.11) */}
              {task1Step === 6 && (
                <g>
                  {/* Leaf blade filled with lush green */}
                  <path
                    d="M 0,-85 C 45,-30 55,40 0,65 C -55,40 -45,-30 0,-85 Z"
                    fill="#15803d"
                    stroke="#166534"
                    strokeWidth="2"
                  />
                  {/* Central Vein */}
                  <path d="M 0,-75 Q 0,-10 0,65" fill="none" stroke="#4ade80" strokeWidth="2" opacity="0.6" />
                  {/* Curved Stalk */}
                  <path d="M 0,65 Q 4,85 10,105" fill="none" stroke="#ca8a04" strokeWidth="3.5" strokeLinecap="round" />
                </g>
              )}
            </svg>
          </div>

          {/* Step Explanation */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  {bilingualMode === 'en' ? `Step ${task1Step} of 6` : `Bước ${task1Step}/6`}
                </span>
                <h4 className="font-bold text-slate-800 dark:text-white">
                  {task1Step === 1 && (
                    <BilingualText
                      vi="Bước 1: Vẽ hình chữ nhật đứng (Hình 14.12a)"
                      en="Step 1: Draw vertical rectangle (Fig 14.12a)"
                    />
                  )}
                  {task1Step === 2 && (
                    <BilingualText
                      vi="Bước 2: Lệnh Path / Object to Path (Hình 14.12b)"
                      en="Step 2: Path / Object to Path (Fig 14.12b)"
                    />
                  )}
                  {task1Step === 3 && (
                    <BilingualText
                      vi="Bước 3: Gộp 2 điểm đỉnh thành tam giác (Hình 14.12c)"
                      en="Step 3: Join 2 top nodes into apex (Fig 14.12c)"
                    />
                  )}
                  {task1Step === 4 && (
                    <BilingualText
                      vi="Bước 4: Chuyển 2 điểm đáy thành neo trơn (Hình 14.12d)"
                      en="Step 4: Convert bottom nodes to smooth (Fig 14.12d)"
                    />
                  )}
                  {task1Step === 5 && (
                    <BilingualText
                      vi="Bước 5: Thêm cuống lá bằng Pen (Hình 14.12e)"
                      en="Step 5: Add leaf stalk with Pen tool (Fig 14.12e)"
                    />
                  )}
                  {task1Step === 6 && (
                    <BilingualText
                      vi="Bước 6: Tô màu xanh lá hoàn thiện (Hình 14.11)"
                      en="Step 6: Apply green fill finish (Fig 14.11)"
                    />
                  )}
                </h4>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {task1Step === 1 && (
                  <BilingualText
                    vi="Dùng công cụ Rectangles (F4) vẽ một hình chữ nhật đứng có tỉ lệ chiều dài gấp đôi chiều rộng."
                    en="Use Rectangles tool (F4) to draw a vertical rectangle with an aspect ratio roughly 2:1."
                  />
                )}
                {task1Step === 2 && (
                  <BilingualText
                    vi="Chọn hình chữ nhật và chọn menu Path -> Object to Path (Shift+Ctrl+C) để chuyển đổi từ hình khối định nghĩa sẵn sang đối tượng đường gồm 4 điểm neo rời rạc."
                    en="Select rectangle and choose Path -> Object to Path (Shift+Ctrl+C) to convert it from a rigid primitive into a 4-node freeform vector path."
                  />
                )}
                {task1Step === 3 && (
                  <BilingualText
                    vi="Dùng công cụ Node (F2), quét chuột chọn 2 điểm neo ở cạnh trên của hình chữ nhật, sau đó bấm nút 'Gộp điểm' (Join selected nodes) trên thanh điều khiển thuộc tính để tạo thành đỉnh chóp nhọn của tam giác."
                    en="Switch to Node tool (F2), select the 2 top nodes, and click 'Join selected nodes' on the control bar to fuse them into a single sharp apex node."
                  />
                )}
                {task1Step === 4 && (
                  <BilingualText
                    vi="Chọn 2 điểm neo ở cạnh dưới của tam giác, bấm nút 'Chuyển thành điểm neo trơn' (Make selected nodes smooth). Kéo 2 cần điều khiển sang 2 bên để thân lá phình bầu tròn trịa."
                    en="Select the bottom 2 nodes, click 'Make selected nodes smooth'. Drag their tangent handles outward to swell the leaf flanks into a plump curved contour."
                  />
                )}
                {task1Step === 5 && (
                  <BilingualText
                    vi="Chọn công cụ Pen (Shift+F6), nháy chuột tại đáy lá và nháy đúp kéo nhẹ xuống dưới để vẽ thêm một cuống lá hơi cong tự nhiên."
                    en="Select Pen tool (Shift+F6), click at leaf base and double click downwards to draft a gently curving stalk."
                  />
                )}
                {task1Step === 6 && (
                  <BilingualText
                    vi="Mở bảng màu dưới đáy màn hình, nhấp chọn màu xanh lá cây đậm (ví dụ #15803d) cho phiến lá, và màu nâu/vàng nhạt cho cuống lá. Chiếc lá hoàn thiện tuyệt đẹp!"
                    en="Select solid green fill from the bottom palette for the blade, and pale brown/gold for the stem. The organic leaf is complete!"
                  />
                )}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                disabled={task1Step === 1}
                onClick={() => setTask1Step((prev) => Math.max(1, prev - 1))}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-40 transition-all text-slate-700 dark:text-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <BilingualText vi="Bước trước" en="Prev Step" />
              </button>

              <button
                disabled={task1Step === 6}
                onClick={() => setTask1Step((prev) => Math.min(6, prev + 1))}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition-all"
              >
                <BilingualText vi="Bước kế tiếp" en="Next Step" />
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TASK 2: FESTIVE BANNERS & TEXT ON PATH (Figures 14.13 & 14.14)
          ========================================================================= */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/80 pb-4 flex-wrap gap-3">
          <div className="flex items-center space-x-3">
            <span className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black flex items-center justify-center text-lg">
              2
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Flag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <BilingualText
                  vi="Nhiệm vụ 2: Viết chữ theo khuôn dạng & Dải cờ tiệc (Hình 14.13)"
                  en="Task 2: Text on Path & Festive Garland Banners (Figure 14.13)"
                />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <BilingualText
                  vi="Uốn lượn dòng chữ 'CHÚC MỪNG NĂM MỚI!' theo đường cong và trang trí cờ tam giác tiệc tùng"
                  en="Curve 'HAPPY NEW YEAR!' text along an arched path and decorate with festive party pennants"
                />
              </p>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700/60 p-1.5 rounded-2xl">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <button
                key={s}
                onClick={() => setTask2Step(s)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                  task2Step === s
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {bilingualMode === 'en' ? `Step ${s}` : `Bước ${s}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Visualizer */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-h-[340px] relative shadow-inner">
            <svg viewBox="-120 -80 240 180" className="w-64 h-56 select-none drop-shadow-2xl">
              <defs>
                <path id="bannerPath" d="M -90,20 Q 0,-60 90,20" fill="none" />
              </defs>

              {/* Step 1: Pen 3 points */}
              {task2Step === 1 && (
                <g>
                  <path d="M -90,20 L 0,-20 L 90,20" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                  <circle cx="-90" cy="20" r="5" fill="#f43f5e" />
                  <circle cx="0" cy="-20" r="5" fill="#f43f5e" />
                  <circle cx="90" cy="20" r="5" fill="#f43f5e" />
                </g>
              )}

              {/* Step 2 & 3: Smooth central node */}
              {(task2Step === 2 || task2Step === 3) && (
                <g>
                  <path d="M -90,20 Q 0,-60 90,20" fill="none" stroke="#38bdf8" strokeWidth="3" />
                  <circle cx="-90" cy="20" r="5" fill="#f43f5e" />
                  <rect x="-4" y="-45" width="8" height="8" fill="#10b981" />
                  <circle cx="90" cy="20" r="5" fill="#f43f5e" />
                </g>
              )}

              {/* Step 4: Text created */}
              {task2Step === 4 && (
                <g>
                  <path d="M -90,20 Q 0,-60 90,20" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="0" y="55" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">
                    {bilingualMode === 'en' ? 'HAPPY NEW YEAR!' : 'CHÚC MỪNG NĂM MỚI!'}
                  </text>
                </g>
              )}

              {/* Step 5: Put on Path */}
              {task2Step === 5 && (
                <g>
                  <text fill="#f59e0b" fontSize="12" fontWeight="bold">
                    <textPath href="#bannerPath" startOffset="50%" textAnchor="middle">
                      {bilingualMode === 'en' ? 'HAPPY NEW YEAR!' : 'CHÚC MỪNG NĂM MỚI!'}
                    </textPath>
                  </text>
                </g>
              )}

              {/* Step 6: Full Festive Banner with Pennants (Figure 14.13) */}
              {task2Step === 6 && (
                <g>
                  {/* Pennants Arch */}
                  <g>
                    {/* 5 colorful hanging triangle pennants */}
                    <polygon points="-75,10 -50,10 -62.5,45" fill="#ef4444" />
                    <polygon points="-45,0 -20,0 -32.5,35" fill="#10b981" />
                    <polygon points="-15,-6 15,-6 0,28" fill="#f97316" />
                    <polygon points="20,0 45,0 32.5,35" fill="#3b82f6" />
                    <polygon points="50,10 75,10 62.5,45" fill="#8b5cf6" />
                  </g>

                  {/* Arched text running above pennants */}
                  <text fill="#ea580c" fontSize="12.5" fontWeight="black" letterSpacing="0.8">
                    <textPath href="#bannerPath" startOffset="50%" textAnchor="middle">
                      {bilingualMode === 'en' ? 'HAPPY NEW YEAR!' : 'CHÚC MỪNG NĂM MỚI!'}
                    </textPath>
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Step Explanation */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
              <h4 className="font-bold text-indigo-950 dark:text-indigo-200 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <BilingualText
                  vi="Trình tự thực hiện Nhiệm vụ 2 trong Inkscape:"
                  en="Task 2 Workflow in Inkscape (Fig 14.14):"
                />
              </h4>

              <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-2 list-decimal pl-4">
                <li>
                  <strong><BilingualText vi="Bước 1: " en="Step 1: " /></strong>
                  <BilingualText vi="Dùng công cụ Pen (Shift+F6), chọn kiểu vẽ đường cong." en="Select Pen tool (Shift+F6), choose curved mode." />
                </li>
                <li>
                  <strong><BilingualText vi="Bước 2: " en="Step 2: " /></strong>
                  <BilingualText vi="Nháy chuột đặt 3 điểm: đầu trái, đỉnh vòm ở giữa, và đầu phải (nháy đúp để hoàn thành)." en="Click 3 points: left start, center arch apex, and right end (double-click to finish)." />
                </li>
                <li>
                  <strong><BilingualText vi="Bước 3: " en="Step 3: " /></strong>
                  <BilingualText vi="Dùng công cụ Node (F2), chọn điểm neo ở giữa và bấm biểu tượng 'Chuyển thành neo trơn' để uốn vòm cong mượt mà." en="Use Node tool (F2), select the center node and click 'Make selected nodes smooth' for a smooth curve." />
                </li>
                <li>
                  <strong><BilingualText vi="Bước 4: " en="Step 4: " /></strong>
                  <BilingualText vi="Dùng công cụ Text (phím A), nhấp chuột gõ dòng chữ 'Chúc mừng năm mới!'." en="Use Text tool (key A), click and type 'Happy New Year!'." />
                </li>
                <li>
                  <strong><BilingualText vi="Bước 5: " en="Step 5: " /></strong>
                  <BilingualText vi="Chọn cả dòng chữ và đường cong, vào menu Text / Put on Path. Chọn đường cong và chỉnh màu viền Stroke = Không màu (để ẩn đường dẫn đi)." en="Select both text and curve, choose Text / Put on Path. Select curve and set Stroke to none to hide the path." />
                </li>
                <li>
                  <strong><BilingualText vi="Bước 6: " en="Step 6: " /></strong>
                  <BilingualText vi="Vẽ các hình tam giác cờ tiệc (tương tự Nhiệm vụ 1), nhân bản Ctrl+D, tô màu rực rỡ và xếp đều dưới chân chữ!" en="Draw triangle pennants (similar to Task 1), duplicate with Ctrl+D, apply vibrant colors, and align them beneath the text!" />
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={14} />

      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={prevPage}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>
            <BilingualText
              vi="Mục 3: Đối tượng văn bản"
              en="Section 3: Text Objects"
            />
          </span>
        </button>

        <button
          onClick={nextPage}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-700 hover:to-indigo-700 text-white font-semibold transition-all shadow-md"
        >
          <span>
            <BilingualText
              vi="Mục 5: Luyện tập & Vận dụng"
              en="Section 5: Practice & Apply"
            />
          </span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
