import React, { useState } from 'react';
import {
  Binary,
  Volume2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  CheckCircle2,
  Cpu,
  BookOpen,
  Info,
  Check,
  X,
  Compass,
  Grid,
  MapPin,
  RotateCcw
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section5LogicOperators: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive Truth Table State
  const [interactiveP, setInteractiveP] = useState<0 | 1>(1);
  const [interactiveQ, setInteractiveQ] = useState<0 | 1>(0);

  // Interactive Point Coordinate Sandbox (Figure 5.2 SGK Trang 25)
  const [pointX, setPointX] = useState<number>(2);
  const [pointY, setPointY] = useState<number>(2.5);

  // Conditions for Figure 5.2: 1 <= x <= 3 and 1 <= y <= 3
  const condX1 = pointX >= 1;
  const condX2 = pointX <= 3;
  const condY1 = pointY >= 1;
  const condY2 = pointY <= 3;
  const isInsideSquare = condX1 && condX2 && condY1 && condY2;

  // Truth table values calculated
  const andVal = interactiveP & interactiveQ;
  const orVal = interactiveP | interactiveQ;
  const xorVal = interactiveP ^ interactiveQ;
  const notPVal = interactiveP === 1 ? 0 : 1;
  const notQVal = interactiveQ === 1 ? 0 : 1;

  const speechText =
    "Fundamental Logic Operations on Page 25. 1. Conjunction AND: denoted by ampersand or wedge, p AND q is true only when both p and q are true. 2. Disjunction OR: denoted by pipe or vee, p OR q is false only when both p and q are false. 3. Exclusive OR, XOR: denoted by circled plus, p XOR q is true when p and q have different truth values. 4. Negation NOT: denoted by tilde or negation sign, flips the truth value. Figure 5.2 demonstrates testing whether coordinate point (x, y) falls inside the square using four AND conditions.";

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-indigo-950 rounded-3xl text-white shadow-lg border border-indigo-700/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-blue-400/20">
            <Binary className="w-3.5 h-3.5" />
            <span>
              {bilingualMode === 'en'
                ? 'Section 1 • Textbook Page 25'
                : 'Mục 1 • SGK Trang 25'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {bilingualMode === 'en'
              ? '1. FUNDAMENTAL LOGIC OPERATIONS & TRUTH TABLES'
              : '1. CÁC PHÉP TOÁN LÔGIC CƠ BẢN & BẢNG CHÂN TRỊ'}
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1">
            {bilingualMode === 'en'
              ? 'Conjunction (AND), Disjunction (OR), Exclusive OR (XOR) and Negation (NOT)'
              : 'Phép hội (AND), Phép tuyển (OR), Phép tuyển loại trừ (XOR) và Phép phủ định (NOT)'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {bilingualMode !== 'vi' && (
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speak(speechText, 'en');
                }
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer border border-white/10"
              title={bilingualMode === 'en' ? 'Listen in English' : 'Nghe phát âm chuẩn tiếng Anh'}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-cyan-300' : ''}`} />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(25);
              setShowOriginalModal(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'Original Page 25' : 'Xem trang 25 SGK'}</span>
          </button>
        </div>
      </div>

      {/* Teacher Prompts Widget for Section 1 */}
      <TeacherPromptsWidget sectionIndex={1} lessonId={5} />

      {/* 4 Fundamental Logic Operations Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* AND Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-xl">
                {bilingualMode === 'en' ? 'Conjunction (AND)' : 'Phép hội (AND)'}
              </span>
              <span className="font-mono text-sm font-bold text-slate-400">&amp;, ∧</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mt-2 text-base">
              {bilingualMode === 'en' ? 'p AND q' : 'p AND q (và)'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {bilingualMode === 'en'
                ? <>Has value <strong className="text-emerald-600">True (1)</strong> only when both propositions <span className="font-mono font-bold">p</span> and <span className="font-mono font-bold">q</span> are true.</>
                : <>Chỉ có giá trị <strong className="text-emerald-600">Đúng (1)</strong> khi cả hai mệnh đề <span className="font-mono font-bold">p</span> và <span className="font-mono font-bold">q</span> đều đúng.</>}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs text-slate-500">
            {bilingualMode === 'en'
              ? <>1 AND 1 = <strong className="text-emerald-600">1</strong> (others = 0)</>
              : <>1 AND 1 = <strong className="text-emerald-600">1</strong> (còn lại = 0)</>}
          </div>
        </div>

        {/* OR Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-xl">
                {bilingualMode === 'en' ? 'Disjunction (OR)' : 'Phép tuyển (OR)'}
              </span>
              <span className="font-mono text-sm font-bold text-slate-400">|, ∨</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mt-2 text-base">
              {bilingualMode === 'en' ? 'p OR q' : 'p OR q (hoặc)'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {bilingualMode === 'en'
                ? <>Has value <strong className="text-rose-600">False (0)</strong> only when both <span className="font-mono font-bold">p</span> and <span className="font-mono font-bold">q</span> are false (true when at least one is true).</>
                : <>Chỉ có giá trị <strong className="text-rose-600">Sai (0)</strong> khi cả <span className="font-mono font-bold">p</span> và <span className="font-mono font-bold">q</span> đều sai (đúng khi ít nhất một mệnh đề đúng).</>}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs text-slate-500">
            {bilingualMode === 'en'
              ? <>0 OR 0 = <strong className="text-rose-600">0</strong> (others = 1)</>
              : <>0 OR 0 = <strong className="text-rose-600">0</strong> (còn lại = 1)</>}
          </div>
        </div>

        {/* XOR Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-xl">
                {bilingualMode === 'en' ? 'Exclusive OR (XOR)' : 'Tuyển loại trừ (XOR)'}
              </span>
              <span className="font-mono text-sm font-bold text-slate-400">⊕, ^</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mt-2 text-base">
              p XOR q
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {bilingualMode === 'en'
                ? <>Has value <strong className="text-emerald-600">True (1)</strong> when one and only one proposition is true (different values).</>
                : <>Chỉ có giá trị <strong className="text-emerald-600">Đúng (1)</strong> khi một và chỉ một trong hai mệnh đề đúng (giá trị khác nhau).</>}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs text-slate-500">
            {bilingualMode === 'en'
              ? <>0⊕1 = 1⊕0 = <strong className="text-emerald-600">1</strong> (same = 0)</>
              : <>0⊕1 = 1⊕0 = <strong className="text-emerald-600">1</strong> (giống = 0)</>}
          </div>
        </div>

        {/* NOT Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400 transition-all flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-xl">
                {bilingualMode === 'en' ? 'Negation (NOT)' : 'Phủ định (NOT)'}
              </span>
              <span className="font-mono text-sm font-bold text-slate-400">~, ¬</span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mt-2 text-base">
              {bilingualMode === 'en' ? 'NOT p' : 'NOT p (không)'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {bilingualMode === 'en'
                ? <>Has the <strong className="text-indigo-600 dark:text-indigo-400">opposite value</strong> of p: if p is true then NOT p is false, and vice versa.</>
                : <>Có giá trị <strong className="text-indigo-600 dark:text-indigo-400">ngược lại</strong> với p: nếu p đúng thì NOT p sai, nếu p sai thì NOT p đúng.</>}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 font-mono text-xs text-slate-500">
            NOT 1 = <strong className="text-rose-600">0</strong>; NOT 0 = <strong className="text-emerald-600">1</strong>
          </div>
        </div>
      </div>

      {/* Interactive Truth Table (Bảng 5.2 SGK Trang 25) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {bilingualMode === 'en'
                ? 'Standard Truth Table (Table 5.2 Page 25)'
                : 'Bảng chân trị chuẩn SGK (Bảng 5.2 Trang 25)'}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Fundamental Logic Operations Truth Table & Interactive Sandbox'
                : 'Bảng chân lý các phép toán Lôgic cơ bản & Bộ điều khiển tương tác'}
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {interactiveP} AND {interactiveQ} = {andVal} | {interactiveP} OR {interactiveQ} = {orVal}
          </div>
        </div>

        {/* Live Controller Buttons for p and q */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {bilingualMode === 'en' ? 'Value of p:' : 'Giá trị p:'}
              </span>
              <button
                type="button"
                onClick={() => setInteractiveP(interactiveP === 1 ? 0 : 1)}
                className={`px-3 py-1.5 rounded-xl font-mono font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  interactiveP === 1
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-rose-600 text-white shadow-xs'
                }`}
              >
                <span>p = {interactiveP}</span>
                <span className="text-[10px]">
                  ({interactiveP === 1
                    ? (bilingualMode === 'en' ? 'True' : 'Đúng')
                    : (bilingualMode === 'en' ? 'False' : 'Sai')})
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {bilingualMode === 'en' ? 'Value of q:' : 'Giá trị q:'}
              </span>
              <button
                type="button"
                onClick={() => setInteractiveQ(interactiveQ === 1 ? 0 : 1)}
                className={`px-3 py-1.5 rounded-xl font-mono font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                  interactiveQ === 1
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-rose-600 text-white shadow-xs'
                }`}
              >
                <span>q = {interactiveQ}</span>
                <span className="text-[10px]">
                  ({interactiveQ === 1
                    ? (bilingualMode === 'en' ? 'True' : 'Đúng')
                    : (bilingualMode === 'en' ? 'False' : 'Sai')})
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">
              {bilingualMode === 'en' ? 'Results:' : 'Kết quả tương ứng:'}
            </span>
            <span className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 font-mono font-bold border border-slate-200 dark:border-slate-700">
              AND: <strong className={andVal ? 'text-emerald-600' : 'text-rose-600'}>{andVal}</strong>
            </span>
            <span className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 font-mono font-bold border border-slate-200 dark:border-slate-700">
              OR: <strong className={orVal ? 'text-emerald-600' : 'text-rose-600'}>{orVal}</strong>
            </span>
            <span className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 font-mono font-bold border border-slate-200 dark:border-slate-700">
              XOR: <strong className={xorVal ? 'text-emerald-600' : 'text-rose-600'}>{xorVal}</strong>
            </span>
            <span className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 font-mono font-bold border border-slate-200 dark:border-slate-700">
              NOT p: <strong className={notPVal ? 'text-emerald-600' : 'text-rose-600'}>{notPVal}</strong>
            </span>
          </div>
        </div>

        {/* Truth Table rendered cleanly */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 font-mono">p</th>
                <th className="py-3 px-4 font-mono">q</th>
                <th className="py-3 px-4 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono font-bold">
                  p AND q
                </th>
                <th className="py-3 px-4 bg-teal-50/50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-mono font-bold">
                  p OR q
                </th>
                <th className="py-3 px-4 bg-amber-50/50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-mono font-bold">
                  p XOR q
                </th>
                <th className="py-3 px-4 bg-rose-50/50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-mono font-bold">
                  NOT p
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {[
                { p: 0, q: 0, and: 0, or: 0, xor: 0, notP: 1 },
                { p: 0, q: 1, and: 0, or: 1, xor: 1, notP: 1 },
                { p: 1, q: 0, and: 0, or: 1, xor: 1, notP: 0 },
                { p: 1, q: 1, and: 1, or: 1, xor: 0, notP: 0 }
              ].map((row, idx) => {
                const isSelected = row.p === interactiveP && row.q === interactiveQ;
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-indigo-100/80 dark:bg-indigo-900/40 font-bold ring-2 ring-indigo-500/40'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    <td className="py-2.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {row.p}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {row.q}
                    </td>
                    <td className={`py-2.5 px-4 ${row.and === 1 ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>
                      {row.and}
                    </td>
                    <td className={`py-2.5 px-4 ${row.or === 1 ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>
                      {row.or}
                    </td>
                    <td className={`py-2.5 px-4 ${row.xor === 1 ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>
                      {row.xor}
                    </td>
                    <td className={`py-2.5 px-4 ${row.notP === 1 ? 'text-emerald-600 font-bold' : 'text-slate-500'}`}>
                      {row.notP}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geometric Logic Example: Figure 5.2 (SGK Trang 25) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold shadow-xs">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                {bilingualMode === 'en'
                  ? 'Geometric Example • Figure 5.2 Page 25'
                  : 'Ví dụ hình học • Hình 5.2 SGK Trang 25'}
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? 'Point Inside Square Verification Using Logical AND Expression'
                  : 'Kiểm tra điểm thuộc hình vuông bằng biểu thức Lôgic AND'}
              </h2>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            {bilingualMode === 'en' ? 'Square domain: [1, 3] × [1, 3]' : 'Miền hình vuông: [1, 3] × [1, 3]'}
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en'
            ? <>In mathematics and computational geometry, to check whether a point <span className="font-mono font-bold text-slate-900 dark:text-white">M(x, y)</span> is inside or on the boundary of a square with corners from (1, 1) to (3, 3), we combine 4 propositions using <strong className="text-indigo-600 dark:text-indigo-400">AND</strong>:</>
            : <>Trong toán học và lập trình trò chơi, để kiểm tra một điểm <span className="font-mono font-bold text-slate-900 dark:text-white">M(x, y)</span> có nằm bên trong hoặc trên cạnh hình vuông có toạ độ góc từ (1, 1) đến (3, 3) hay không, ta kết hợp 4 mệnh đề bằng phép hội <strong className="text-indigo-600 dark:text-indigo-400">AND</strong>:</>}
        </p>

        {/* Math Expression Box */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-indigo-700 dark:text-indigo-300">
          (x &gt;= 1) AND (x &lt;= 3) AND (y &gt;= 1) AND (y &lt;= 3)
        </div>

        {/* 2-Column: Coordinate Visualizer & Evaluation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Interactive Coordinate Canvas */}
          <div className="relative aspect-square max-w-sm mx-auto w-full bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-300 dark:border-slate-800 p-4 flex flex-col items-center justify-center overflow-hidden">
            {/* SVG Coordinate Grid 0 to 4 */}
            <svg viewBox="0 0 400 400" className="w-full h-full select-none">
              {/* Grid lines */}
              {[0, 100, 200, 300, 400].map((pos, i) => (
                <React.Fragment key={i}>
                  <line x1={pos} y1="0" x2={pos} y2="400" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" />
                  <line x1="0" y1={pos} x2="400" y2={pos} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="1" />
                </React.Fragment>
              ))}

              {/* Square Area from (1,1) to (3,3) */}
              <rect
                x="120"
                y="120"
                width="160"
                height="160"
                className="fill-indigo-500/20 stroke-indigo-600 dark:stroke-indigo-400 stroke-2"
                strokeDasharray="4 2"
              />
              <text x="200" y="205" textAnchor="middle" className="text-xs font-bold fill-indigo-600 dark:fill-indigo-300 font-mono">
                {bilingualMode === 'en' ? 'Square [1..3] × [1..3]' : 'Hình vuông [1..3] × [1..3]'}
              </text>

              {/* Axis labels */}
              <line x1="40" y1="360" x2="380" y2="360" stroke="currentColor" className="text-slate-700 dark:text-slate-300" strokeWidth="2" />
              <line x1="40" y1="360" x2="40" y2="20" stroke="currentColor" className="text-slate-700 dark:text-slate-300" strokeWidth="2" />
              <text x="370" y="380" className="text-xs font-bold fill-slate-700 dark:fill-slate-300">X</text>
              <text x="20" y="30" className="text-xs font-bold fill-slate-700 dark:fill-slate-300">Y</text>

              <text x="40" y="380" textAnchor="middle" className="text-[10px] fill-slate-500">0</text>
              <text x="120" y="380" textAnchor="middle" className="text-[10px] fill-slate-500">1</text>
              <text x="200" y="380" textAnchor="middle" className="text-[10px] fill-slate-500">2</text>
              <text x="280" y="380" textAnchor="middle" className="text-[10px] fill-slate-500">3</text>
              <text x="360" y="380" textAnchor="middle" className="text-[10px] fill-slate-500">4</text>

              <text x="25" y="365" textAnchor="end" className="text-[10px] fill-slate-500">0</text>
              <text x="25" y="285" textAnchor="end" className="text-[10px] fill-slate-500">1</text>
              <text x="25" y="205" textAnchor="end" className="text-[10px] fill-slate-500">2</text>
              <text x="25" y="125" textAnchor="end" className="text-[10px] fill-slate-500">3</text>
              <text x="25" y="45" textAnchor="end" className="text-[10px] fill-slate-500">4</text>

              {/* Point M SVG position */}
              {(() => {
                const svgX = 40 + pointX * 80;
                const svgY = 360 - pointY * 80;
                return (
                  <g>
                    <circle
                      cx={svgX}
                      cy={svgY}
                      r="9"
                      className={`${isInsideSquare ? 'fill-emerald-500 stroke-white' : 'fill-rose-500 stroke-white'} stroke-2 drop-shadow-md`}
                    />
                    <text
                      x={svgX + 12}
                      y={svgY - 10}
                      className="text-xs font-bold font-mono fill-slate-900 dark:fill-white"
                    >
                      M({pointX.toFixed(1)}, {pointY.toFixed(1)})
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Interactive Controls & 4 Condition Breakdown */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="font-bold text-xs text-slate-800 dark:text-slate-200">
                {bilingualMode === 'en'
                  ? 'Try dragging coordinates of point M(x, y):'
                  : 'Thử thay đổi toạ độ điểm M(x, y):'}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span>{bilingualMode === 'en' ? 'Coordinate x = ' : 'Toạ độ x = '}{pointX.toFixed(1)}</span>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="0.5"
                    value={pointX}
                    onChange={(e) => setPointX(parseFloat(e.target.value))}
                    className="w-36 accent-indigo-600"
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>{bilingualMode === 'en' ? 'Coordinate y = ' : 'Toạ độ y = '}{pointY.toFixed(1)}</span>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="0.5"
                    value={pointY}
                    onChange={(e) => setPointY(parseFloat(e.target.value))}
                    className="w-36 accent-indigo-600"
                  />
                </div>
              </div>

              {/* Preset buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-[11px] text-slate-400">
                  {bilingualMode === 'en' ? 'Quick presets:' : 'Chọn nhanh:'}
                </span>
                <button
                  type="button"
                  onClick={() => { setPointX(2); setPointY(2); }}
                  className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border text-[11px] font-mono hover:bg-slate-100 cursor-pointer"
                >
                  M(2, 2)
                </button>
                <button
                  type="button"
                  onClick={() => { setPointX(1); setPointY(3); }}
                  className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border text-[11px] font-mono hover:bg-slate-100 cursor-pointer"
                >
                  M(1, 3)
                </button>
                <button
                  type="button"
                  onClick={() => { setPointX(3.5); setPointY(2); }}
                  className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border text-[11px] font-mono hover:bg-slate-100 cursor-pointer"
                >
                  M(3.5, 2)
                </button>
              </div>
            </div>

            {/* Condition Evaluation List */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-mono">1. (x &gt;= 1) &#8594; ({pointX} &gt;= 1)</span>
                <span className={`font-bold flex items-center gap-1 ${condX1 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {condX1 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {condX1
                    ? (bilingualMode === 'en' ? 'True (1)' : 'Đúng (1)')
                    : (bilingualMode === 'en' ? 'False (0)' : 'Sai (0)')}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-mono">2. (x &lt;= 3) &#8594; ({pointX} &lt;= 3)</span>
                <span className={`font-bold flex items-center gap-1 ${condX2 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {condX2 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {condX2
                    ? (bilingualMode === 'en' ? 'True (1)' : 'Đúng (1)')
                    : (bilingualMode === 'en' ? 'False (0)' : 'Sai (0)')}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-mono">3. (y &gt;= 1) &#8594; ({pointY} &gt;= 1)</span>
                <span className={`font-bold flex items-center gap-1 ${condY1 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {condY1 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {condY1
                    ? (bilingualMode === 'en' ? 'True (1)' : 'Đúng (1)')
                    : (bilingualMode === 'en' ? 'False (0)' : 'Sai (0)')}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-mono">4. (y &lt;= 3) &#8594; ({pointY} &lt;= 3)</span>
                <span className={`font-bold flex items-center gap-1 ${condY2 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {condY2 ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  {condY2
                    ? (bilingualMode === 'en' ? 'True (1)' : 'Đúng (1)')
                    : (bilingualMode === 'en' ? 'False (0)' : 'Sai (0)')}
                </span>
              </div>
            </div>

            {/* Total Result Badge */}
            <div
              className={`p-3.5 rounded-2xl border text-center font-bold text-xs sm:text-sm flex items-center justify-center gap-2 ${
                isInsideSquare
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
              }`}
            >
              {isInsideSquare ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'EXPRESSION RESULT: TRUE (1) — Point M is inside the square!'
                      : 'KẾT QUẢ BIỂU THỨC: ĐÚNG (1) — Điểm M nằm trong hình vuông!'}
                  </span>
                </>
              ) : (
                <>
                  <X className="w-4 h-4 text-rose-600" />
                  <span>
                    {bilingualMode === 'en'
                      ? 'EXPRESSION RESULT: FALSE (0) — Point M is outside the square!'
                      : 'KẾT QUẢ BIỂU THỨC: SAI (0) — Điểm M nằm ngoài hình vuông!'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Card */}
      <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {bilingualMode === 'en' ? 'Next Section:' : 'Phần tiếp theo:'}
          </div>
          <div className="font-bold text-slate-900 dark:text-white text-sm">
            {bilingualMode === 'en'
              ? 'Bitwise Logic Operations (Figure 5.3) & Reinforcement Questions (Page 26)'
              : 'Phép toán lôgic trên dãy bit (Hình 5.3) & Các câu hỏi củng cố (Trang 26)'}
          </div>
        </div>

        <button
          type="button"
          onClick={nextPage}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm transition-all shadow-md cursor-pointer shrink-0"
        >
          <span>{bilingualMode === 'en' ? 'Go to Bitwise Operations' : 'Sang phép toán trên dãy bit'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
