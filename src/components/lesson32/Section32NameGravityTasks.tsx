import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { 
  User, 
  Orbit, 
  Globe, 
  Code2, 
  Play, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Calculator,
  Layers,
  Scale
} from 'lucide-react';

interface PlanetData {
  id: number;
  nameVi: string;
  nameEn: string;
  g: number;
  descriptionVi: string;
  descriptionEn: string;
  color: string;
}

const CELESTIAL_BODIES: PlanetData[] = [
  { id: 1, nameVi: 'Mặt Trăng', nameEn: 'Moon', g: 1.62, descriptionVi: 'Nhẹ hơn 6 lần so với Trái Đất, bạn có thể nhảy cao gấp 6 lần!', descriptionEn: '6x lighter than Earth, you could jump 6x higher!', color: 'text-slate-300' },
  { id: 2, nameVi: 'Hoả tinh', nameEn: 'Mars', g: 3.711, descriptionVi: 'Trọng lực chỉ bằng 38% Trái Đất.', descriptionEn: 'Gravity is only 38% of Earth.', color: 'text-rose-400' },
  { id: 3, nameVi: 'Kim tinh', nameEn: 'Venus', g: 8.83, descriptionVi: 'Gần bằng Trái Đất (khoảng 90%).', descriptionEn: 'Nearly identical to Earth (~90%).', color: 'text-amber-300' },
  { id: 4, nameVi: 'Mộc tinh', nameEn: 'Jupiter', g: 24.79, descriptionVi: 'Hành tinh khí khổng lồ, trọng lực gấp 2.5 lần Trái Đất.', descriptionEn: 'Gas giant, 2.5x heavier than Earth.', color: 'text-amber-500' },
  { id: 5, nameVi: 'Thổ tinh', nameEn: 'Saturn', g: 10.44, descriptionVi: 'Trọng lực nhỉnh hơn Trái Đất một chút (107%).', descriptionEn: 'Slightly higher than Earth (107%).', color: 'text-yellow-400' },
  { id: 6, nameVi: 'Mặt Trời', nameEn: 'Sun', g: 274.0, descriptionVi: 'Lò hạt nhân khổng lồ, trọng lực đè bẹp gấp 28 lần!', descriptionEn: 'Massive star, crushing 28x Earth gravity!', color: 'text-orange-400' },
];

export const Section32NameGravityTasks: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // Task 1 interactive state
  const [testFullName, setTestFullName] = useState<string>('Nguyễn Thị Mai Hương');

  // Task 2 interactive state
  const [userWeightN, setUserWeightN] = useState<number>(490); // 50kg * 9.8 m/s² = 490 N
  const [selectedPlanetId, setSelectedPlanetId] = useState<number>(1); // Moon by default

  // Parse name slices
  const tokens = testFullName.trim().split(/\s+/).filter(Boolean);
  const n = tokens.length;
  const ho = n > 0 ? tokens[0] : '';
  const ten = n > 0 ? tokens[n - 1] : '';
  const dem = n > 2 ? tokens.slice(1, n - 1).join(' ') : '';

  // Calculate planetary weight
  const activePlanet = CELESTIAL_BODIES.find((p) => p.id === selectedPlanetId) || CELESTIAL_BODIES[0];
  const calculatedWeight = Math.round(((userWeightN * activePlanet.g) / 9.8) * 1000) / 1000;
  const equivalentMassKg = Math.round((userWeightN / 9.8) * 10) / 10;

  return (
    <div className="space-y-12">
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-teal-950/60 via-slate-900/80 to-indigo-950/60 border border-teal-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-full text-xs font-mono uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            {isVi ? 'Nhiệm vụ 1 & 2 – SGK Trang 153-154' : 'Tasks 1 & 2 – Textbook Pages 153-154'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isVi
              ? 'Tách họ tên xâu & Bài toán Vật lý trọng lượng hành tinh'
              : 'Name Token Slicing & Planetary Physics Weight Calculator'}
          </h2>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Áp dụng hàm split() và slicing list[1:n-1] để trích xuất chuẩn xác họ, đệm, tên; kết hợp danh sách song song (parallel lists) giải bài toán biến đổi trọng lực liên môn Vật lý.'
              : 'Apply split() and slice list[1:n-1] to cleanly extract surname, middle name, and given name; utilize parallel lists to compute physics weight across celestial gravitational wells.'}
          </p>
        </div>
      </div>

      {/* MISSION 1: TÁCH HỌ TÊN */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-7 shadow-xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-teal-400 font-bold">
              {isVi ? 'Nhiệm vụ 1 (SGK Trang 153)' : 'Task 1 (Textbook Page 153)'}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white mt-1">
              {isVi
                ? 'Tách riêng phần tên, họ, đệm từ xâu họ tên đầy đủ'
                : 'Extract Given Name, Surname & Middle Name via Slicing'}
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-mono">
            slist[1:n-1]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CODE SNIPPET */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs md:text-sm text-slate-300">
            <span className="text-slate-500 block mb-2 pb-2 border-b border-slate-800 flex justify-between">
              <span>hoten_parser.py</span>
              <span className="text-teal-400">SGK Trang 153</span>
            </span>
            <pre className="leading-relaxed">
{`hoten = input("Nhập họ tên đầy đủ của em: ")
slist = hoten.split()
n = len(slist)
ho = slist[0]
ten = slist[n-1]
dem = " ".join(slist[1:n-1])

print("Tên của em là", ten)
print("Họ của em là", ho)
if n > 2:
    print("Đệm của em là", dem)`}
            </pre>
          </div>

          {/* INTERACTIVE PARSER SANDBOX */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-2">
                {isVi ? 'Thử nghiệm nhập họ tên bất kỳ:' : 'Test with any full name:'}
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={testFullName}
                  onChange={(e) => setTestFullName(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
                  placeholder="Ví dụ: Nguyễn Thị Mai Hương"
                />
              </div>

              {/* SLICES VISUAL DISPLAY */}
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">slist = hoten.split():</span>
                  <span className="text-teal-300 font-bold">[{tokens.map(t => `"${t}"`).join(', ')}]</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-emerald-400 font-bold">Họ (slist[0]):</span>
                  <span className="text-white font-bold text-sm">{ho || '---'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-amber-400 font-bold">Tên (slist[n-1]):</span>
                  <span className="text-white font-bold text-sm">{ten || '---'}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span className="text-cyan-400 font-bold">Đệm (" ".join(slist[1:n-1])):</span>
                  <span className="text-white font-bold text-sm">
                    {n > 2 ? dem : <span className="text-slate-500 italic">(Không có đệm vì n = {n} ≤ 2)</span>}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-teal-950/40 border border-teal-500/30 text-xs text-slate-300 font-sans">
              <span className="font-bold text-teal-300">Nhận xét: </span>
              {n <= 2
                ? (isVi ? 'Họ tên chỉ có 2 từ, lệnh if n > 2 sẽ tự động bỏ qua dòng in tên đệm.' : 'Name has <= 2 words, if n > 2 gracefully skips middle name printing.')
                : (isVi ? `Đoạn cắt lát slist[1:${n-1}] gom ${n-2} từ làm đệm bằng dấu cách.` : `Slice slist[1:${n-1}] merges ${n-2} intermediate words with space separator.`)}
            </div>
          </div>
        </div>
      </div>

      {/* MISSION 2: TRỌNG LƯỢNG HÀNH TINH LIÊN MÔN */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-7 shadow-xl space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-indigo-400 font-bold">
              {isVi ? 'Nhiệm vụ 2 (SGK Trang 153 – 154)' : 'Task 2 (Textbook Pages 153 – 154)'}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white mt-1">
              {isVi
                ? 'Tính trọng lượng của em trên các hành tinh khác (weight.py)'
                : 'Planetary Weight Conversion Simulator (weight.py)'}
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono">
            P = P0 × g / 9.8
          </span>
        </div>

        {/* CODE WEIGHT.PY */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs md:text-sm text-slate-300">
          <span className="text-slate-500 block mb-2 pb-2 border-b border-slate-800 flex justify-between">
            <span>weight.py</span>
            <span className="text-indigo-400">SGK Trang 154</span>
          </span>
          <pre className="leading-relaxed overflow-x-auto">
{`def string(w):
    s = ""
    for i in range(len(w)):
        s = s + str(i+1) + ". " + w[i] + "  "
    return s

planet = ["Mặt Trăng", "Hoả tinh", "Kim tinh", "Mộc tinh", "Thổ tinh", "Mặt Trời"]
gravities = [1.62, 3.711, 8.83, 24.79, 10.44, 274.0]

P_earth = float(input("Nhập trọng lượng của em, tính theo N: "))
k = int(input("Nhập số thứ tự hành tinh\\n" + string(planet) + ": "))
Grp = gravities[k-1]
P = round(P_earth * Grp / 9.8, 3)
print("Trọng lượng của em trên", planet[k-1], "là:", P, "N")`}
          </pre>
        </div>

        {/* INTERACTIVE PLANETARY WEIGHT BENCH */}
        <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-5 space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-indigo-400" />
              <div>
                <span className="text-xs font-mono text-slate-400 block">
                  {isVi ? 'Trọng lượng trên Trái Đất (P0) hoặc Khối lượng (m):' : 'Earth Weight (P0) or Mass (m):'}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    value={userWeightN}
                    onChange={(e) => setUserWeightN(Number(e.target.value))}
                    className="w-28 px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-slate-400 font-mono text-xs">N</span>
                  <span className="text-slate-500 font-mono text-xs">
                    (≈ {equivalentMassKg} kg trên cân)
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-slate-400 block">
                {isVi ? 'Trọng lượng trên' : 'Weight on'} {activePlanet.nameVi}:
              </span>
              <span className="text-2xl font-bold font-mono text-teal-300">
                P = {calculatedWeight} N
              </span>
            </div>
          </div>

          {/* PLANET SELECTOR TILES */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CELESTIAL_BODIES.map((planet) => {
              const isSelected = planet.id === selectedPlanetId;
              const weightOnThis = Math.round(((userWeightN * planet.g) / 9.8) * 10) / 10;
              return (
                <button
                  key={planet.id}
                  onClick={() => setSelectedPlanetId(planet.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-slate-300">{planet.id}. {isVi ? planet.nameVi : planet.nameEn}</span>
                      <span className={`text-[11px] ${planet.color}`}>{planet.g} m/s²</span>
                    </div>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-sm font-mono font-bold text-teal-300">{weightOnThis} N</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
            <span className="font-bold text-indigo-400">{activePlanet.nameVi}: </span>
            {isVi ? activePlanet.descriptionVi : activePlanet.descriptionEn}
          </div>
        </div>
      </div>
    </div>
  );
};
