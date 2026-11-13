import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Sun,
  CloudRain,
  Split
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { BranchingDecision3DViewer } from './BranchingDecision3DViewer';

export const Section19Overview: React.FC = () => {
  const { bilingualMode } = useBook();

  // Interactive Warm-up State for Fig 19.1
  const [weatherCondition, setWeatherCondition] = useState<'sunny' | 'rainy'>('sunny');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner & Objectives */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 p-6 md:p-8 border border-emerald-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              <BilingualText
                vi="Chủ đề 5: Lập trình Python • Trang 101 – 104 SGK"
                en="Topic 5: Python Programming • Pages 101 – 104 Textbook"
              />
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            <BilingualText
              vi="Bài 19: Câu lệnh rẽ nhánh if"
              en="Lesson 19: The if Conditional Statement"
            />
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            <BilingualText
              vi="Học cách kiểm soát luồng điều khiển của chương trình dựa trên các quyết định điều kiện: biểu thức lôgic (bool), các phép toán and, or, not, câu lệnh rẽ nhánh dạng thiếu và dạng đủ, cùng quy tắc thụt lề bắt buộc (Indentation)."
              en="Learn to control program flow based on conditional decisions: boolean expressions (bool), logical operators and, or, not, single/dual-branch if statements, and mandatory Python indentation."
            />
          </p>

          {/* Objectives Box */}
          <div className="pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md">
              <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <BilingualText
                  vi="Mục tiêu bài học (Sau bài này em sẽ):"
                  en="Lesson Objectives (After this lesson, you will):"
                />
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>
                    <BilingualText
                      vi="Biết và trình bày được các phép toán với kiểu dữ liệu lôgic (and, or, not)."
                      en="Explain and execute operations on boolean logic types (and, or, not)."
                    />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>
                    <BilingualText
                      vi="Sử dụng được câu lệnh rẽ nhánh if trong lập trình (dạng thiếu và dạng đủ)."
                      en="Use if conditional branching statements (if and if-else forms)."
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Khởi động: Tình huống rẽ nhánh & Sơ đồ Hình 19.1 */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Split className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BilingualText
                vi="Khởi động: Cấu trúc rẽ nhánh trong đời sống (Hình 19.1)"
                en="Warm-up: Branching Decisions in Daily Life (Figure 19.1)"
              />
            </h2>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="SGK Trang 101 – Tình huống một việc được thực hiện hay không phụ thuộc vào một điều kiện"
                en="Page 101 – Situations where an action depends on a condition"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-3 text-sm text-slate-300 leading-relaxed">
            <p>
              <BilingualText
                vi="Trong cuộc sống, chúng ta vẫn thường gặp các tình huống một việc được thực hiện hay không phụ thuộc vào một điều kiện."
                en="In real life, we frequently encounter situations where an action occurs only if a specific condition is satisfied."
              />
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
              <span className="text-amber-300 font-bold">
                <BilingualText
                  vi="Ví dụ thực tế:"
                  en="Real-world Example:"
                />
              </span>
              <p className="italic text-slate-200">
                <BilingualText
                  vi="'Nếu ngày mai trời không mưa em sẽ đi chơi cùng bạn, ngược lại nếu trời mưa em sẽ ở nhà làm bài tập.'"
                  en="'If it does not rain tomorrow I will go out with friends, otherwise if it rains I will stay home and do homework.'"
                />
              </p>
            </div>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="Các tình huống như vậy trong lập trình được gọi là rẽ nhánh. Sơ đồ khối rẽ nhánh gồm một khối hình thoi kiểm tra điều kiện, rẽ thành hai nhánh: nhánh Đúng thực hiện Lệnh 1, nhánh Sai thực hiện Lệnh 2."
                en="Such patterns are termed branching. A decision diamond evaluates the condition, branching into True (executing Statement 1) and False (executing Statement 2)."
              />
            </p>
          </div>

          {/* Interactive Flowchart Diagram from Fig 19.1 */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-700 bg-slate-950 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="font-semibold text-slate-300">
                  <BilingualText
                    vi="Sơ đồ cấu trúc rẽ nhánh (Hình 19.1 SGK)"
                    en="Branching Flowchart (Textbook Fig 19.1)"
                  />
                </span>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  Interactive Flowchart
                </span>
              </div>

              {/* Weather Toggle */}
              <div className="flex items-center justify-center gap-3 py-1">
                <button
                  type="button"
                  onClick={() => setWeatherCondition('sunny')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    weatherCondition === 'sunny'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>{bilingualMode === 'en' ? 'Sunny (True)' : 'Trời không mưa (Đúng)'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWeatherCondition('rainy')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    weatherCondition === 'rainy'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <CloudRain className="w-4 h-4 text-sky-400" />
                  <span>{bilingualMode === 'en' ? 'Rainy (False)' : 'Trời mưa (Sai)'}</span>
                </button>
              </div>

              {/* Visual Decision Tree Diagram */}
              <div className="flex flex-col items-center space-y-3 font-mono text-xs">
                {/* Condition Diamond */}
                <div className="relative px-6 py-2.5 rounded-xl bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950/50">
                  {bilingualMode === 'en' ? '<Is it not raining?>' : '<Trời không mưa?>'}
                </div>

                {/* Branches */}
                <div className="w-full grid grid-cols-2 gap-4 text-center">
                  {/* True Branch */}
                  <div
                    className={`p-3 rounded-xl border transition-all ${
                      weatherCondition === 'sunny'
                        ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/30'
                        : 'bg-slate-900 border-slate-800 opacity-40'
                    }`}
                  >
                    <div className="text-[10px] text-emerald-400 font-bold mb-1">
                      {bilingualMode === 'en' ? '↓ True branch' : '↓ Đúng (True)'}
                    </div>
                    <div className="font-sans text-xs font-bold text-white bg-emerald-500/20 py-1 px-2 rounded">
                      {bilingualMode === 'en' ? 'Action 1: Go out with friends' : 'Lệnh 1: Đi chơi cùng bạn'}
                    </div>
                  </div>

                  {/* False Branch */}
                  <div
                    className={`p-3 rounded-xl border transition-all ${
                      weatherCondition === 'rainy'
                        ? 'bg-sky-950/80 border-sky-500 ring-2 ring-sky-500/30'
                        : 'bg-slate-900 border-slate-800 opacity-40'
                    }`}
                  >
                    <div className="text-[10px] text-sky-400 font-bold mb-1">
                      {bilingualMode === 'en' ? '↓ False branch' : '↓ Sai (False)'}
                    </div>
                    <div className="font-sans text-xs font-bold text-white bg-sky-500/20 py-1 px-2 rounded">
                      {bilingualMode === 'en' ? 'Action 2: Stay home and study' : 'Lệnh 2: Ở nhà làm bài tập'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Embedded 3D Three.js Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h2 className="text-lg font-bold text-white">
              <BilingualText
                vi="Mô hình 3D Three.js: Ngã Ba Rẽ Nhánh Lôgic"
                en="Interactive 3D Three.js: Logical Branching Crossroad"
              />
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            <BilingualText
              vi="Kéo chuột xoay 360° • Khám phá 3 phòng thí nghiệm"
              en="Click & drag 360° • Explore 3 interactive labs"
            />
          </span>
        </div>
        <BranchingDecision3DViewer />
      </div>

      {/* 4. Lesson Navigation Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition">
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            {bilingualMode === 'en' ? 'Section 1 (p. 101–102)' : 'Mục 1 (Trang 101–102)'}
          </span>
          <h4 className="text-sm font-bold text-white mt-2 mb-1">
            <BilingualText
              vi="Biểu thức lôgic"
              en="Boolean Expressions"
            />
          </h4>
          <p className="text-xs text-slate-400">
            <BilingualText
              vi="Giá trị True/False, các toán tử quan hệ (<, >, ==, !=) và 3 phép toán and, or, not."
              en="True/False values, relational operators (<, >, ==, !=), and logical and, or, not."
            />
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition">
          <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
            {bilingualMode === 'en' ? 'Section 2 (p. 102–103)' : 'Mục 2 (Trang 102–103)'}
          </span>
          <h4 className="text-sm font-bold text-white mt-2 mb-1">
            <BilingualText
              vi="Câu lệnh if"
              en="The if Statement"
            />
          </h4>
          <p className="text-xs text-slate-400">
            <BilingualText
              vi="Lệnh rẽ nhánh dạng thiếu, dạng đủ, khối lệnh sau dấu hai chấm : và quy tắc thụt lề 4 dấu cách."
              en="Single and dual-branch forms, colon :, and standard 4-space indentation rules."
            />
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition">
          <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
            {bilingualMode === 'en' ? 'Practice Lab (p. 103–104)' : 'Thực hành (Trang 103–104)'}
          </span>
          <h4 className="text-sm font-bold text-white mt-2 mb-1">
            <BilingualText
              vi="Chẵn lẻ & Tiền điện"
              en="Even/Odd & Electricity Bill"
            />
          </h4>
          <p className="text-xs text-slate-400">
            <BilingualText
              vi="Nhiệm vụ 1: Kiểm tra chẵn hay lẻ (n % 2 == 0); Nhiệm vụ 2: Tính tiền điện sinh hoạt luỹ kế 3 bậc."
              en="Task 1: Even/odd check (n % 2 == 0); Task 2: 3-tier progressive electricity tariff calculation."
            />
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition">
          <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
            {bilingualMode === 'en' ? 'Practice & Apply' : 'Luyện tập & Vận dụng'}
          </span>
          <h4 className="text-sm font-bold text-white mt-2 mb-1">
            <BilingualText
              vi="Bán cam & Năm nhuận"
              en="Orange Sales & Leap Year"
            />
          </h4>
          <p className="text-xs text-slate-400">
            <BilingualText
              vi="Tính tiền bán cam siêu thị và thuật toán kiểm tra năm nhuận thiên văn chính xác."
              en="Discounted fruit sales algorithm and astronomical leap year verification logic."
            />
          </p>
        </div>
      </div>
    </div>
  );
};
