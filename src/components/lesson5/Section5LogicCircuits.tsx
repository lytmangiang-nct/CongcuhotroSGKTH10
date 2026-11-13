import React, { useState } from 'react';
import {
  Cpu,
  Volume2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  CheckCircle2,
  BookOpen,
  Info,
  Check,
  X,
  Zap,
  Lightbulb,
  ToggleLeft,
  ToggleRight,
  RotateCcw
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section5LogicCircuits: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Switch states for Figure 5.5: Series circuit (AND gate)
  const [swAnd1, setSwAnd1] = useState<boolean>(true);
  const [swAnd2, setSwAnd2] = useState<boolean>(false);
  const isAndLampOn = swAnd1 && swAnd2;

  // Switch states for Figure 5.6: Parallel circuit (OR gate)
  const [swOr1, setSwOr1] = useState<boolean>(false);
  const [swOr2, setSwOr2] = useState<boolean>(true);
  const isOrLampOn = swOr1 || swOr2;

  const speechText =
    "Logic Circuits on Page 27. Modern computer microprocessors are assembled from billions of microscopic logic gates. Figure 5.5 depicts a series circuit corresponding to an AND gate: the light bulb illuminates only when both Switch 1 AND Switch 2 are closed. Figure 5.6 depicts a parallel circuit corresponding to an OR gate: the light bulb illuminates when either Switch 1 OR Switch 2 is closed.";

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-amber-800 via-orange-900 to-slate-900 rounded-3xl text-white shadow-lg border border-amber-700/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-400/20">
            <Zap className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Practical Application • Textbook Page 27' : 'Ứng dụng thực tế • SGK Trang 27'}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {bilingualMode === 'en'
              ? 'LOGIC CIRCUIT SIMULATION IN COMPUTERS'
              : 'MÔ PHỎNG MẠCH ĐIỆN LÔGIC TRONG MÁY TÍNH'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-200 mt-1">
            {bilingualMode === 'en'
              ? 'Figure 5.5: Series Circuit (AND Gate) & Figure 5.6: Parallel Circuit (OR Gate)'
              : 'Hình 5.5 Mạch nối tiếp (Cổng AND) & Hình 5.6 Mạch song song (Cổng OR)'}
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
              title={bilingualMode === 'en' ? 'Listen to standard English pronunciation' : 'Nghe phát âm chuẩn tiếng Anh'}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-amber-300' : ''}`} />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(27);
              setShowOriginalModal(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'View Page 27 Scan' : 'Xem trang 27 SGK'}</span>
          </button>
        </div>
      </div>

      {/* Teacher Prompts Widget for Section 4 */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={5} />

      {/* Introduction to Logic Gates in Hardware */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold shadow-xs">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'How does Logic Data build the computer CPU microprocessor?'
                : 'Dữ liệu Lôgic tạo nên bộ vi xử lí CPU máy tính như thế nào?'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {bilingualMode === 'en'
                ? 'The bridge between George Boole’s mathematical theory and computer electronic hardware'
                : 'Cầu nối giữa lý thuyết toán học của George Boole và phần cứng điện tử máy tính'}
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              Inside the central processing unit (CPU) of smartphones and computers reside billions of transistors. Each transistor acts as a microscopic <strong>electronic switch</strong>: high voltage closes the circuit (bit 1 / True), while low voltage opens the circuit (bit 0 / False). By wiring switches in series or parallel, scientists engineered <strong>Logic Gates</strong> to execute all computations in computing!
            </>
          ) : (
            <>
              Bên trong bộ vi xử lí (CPU) của điện thoại hay máy tính chứa hàng tỉ bóng bán dẫn (transistor). Mỗi bóng bán dẫn hoạt động giống như một chiếc <strong>công tắc điện tử</strong> siêu nhỏ: khi có điện áp cao là đóng mạch (bit 1 / True), khi điện áp thấp là ngắt mạch (bit 0 / False). Bằng cách mắc các công tắc nối tiếp hoặc song song, các nhà khoa học đã chế tạo ra các <strong>Cổng Lôgic (Logic Gates)</strong> để thực hiện mọi phép tính trong máy tính!
            </>
          )}
        </p>
      </div>

      {/* Circuit 1: Series Circuit - AND Gate (Figure 5.5 SGK Page 27) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Figure 5.5 SGK Page 27' : 'Hình 5.5 SGK Trang 27'}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Series Circuit — Corresponding to Conjunction (AND Gate)'
                : 'Mạch điện mắc Nối tiếp — Tương ứng Phép hội (Cổng AND)'}
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800">
            {bilingualMode === 'en' ? 'K1 AND K2 = Lamp ON' : 'K1 AND K2 = Đèn sáng'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              In a series circuit, current from the power supply can only flow through the bulb when <strong>BOTH Switch K1 AND Switch K2 are closed</strong>. If either switch is open, the circuit is broken and the lamp remains off:
            </>
          ) : (
            <>
              Trong mạch điện mắc nối tiếp, dòng điện từ nguồn chỉ có thể chạy qua bóng đèn khi <strong>cả công tắc K1 VÀ công tắc K2 cùng đóng</strong>. Nếu chỉ một trong hai công tắc mở, mạch sẽ bị hở và đèn không sáng:
            </>
          )}
        </p>

        {/* Interactive SVG Diagram for Series Circuit */}
        <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-6">
          <div className="relative w-full max-w-2xl mx-auto aspect-[16/9] flex items-center justify-center">
            <svg viewBox="0 0 600 320" className="w-full h-full select-none">
              {/* Power Source (Battery) on the left */}
              <g transform="translate(60, 160)">
                <line x1="0" y1="-40" x2="0" y2="40" stroke="#94a3b8" strokeWidth="4" />
                <line x1="-15" y1="-20" x2="-15" y2="20" stroke="#94a3b8" strokeWidth="6" />
                <text x="-40" y="-15" fill="#f59e0b" fontSize="16" fontWeight="bold">+</text>
                <text x="-38" y="25" fill="#94a3b8" fontSize="16" fontWeight="bold">-</text>
                <text x="-45" y="55" fill="#94a3b8" fontSize="11">{bilingualMode === 'en' ? 'Source E' : 'Nguồn E'}</text>
              </g>

              {/* Top Wires */}
              <line
                x1="60"
                y1="120"
                x2="160"
                y2="120"
                stroke={isAndLampOn ? '#fbbf24' : swAnd1 ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />

              {/* Switch K1 */}
              <g transform="translate(160, 120)">
                <circle cx="0" cy="0" r="5" fill="#e2e8f0" />
                <circle cx="80" cy="0" r="5" fill="#e2e8f0" />
                {swAnd1 ? (
                  <line x1="0" y1="0" x2="80" y2="0" stroke="#fbbf24" strokeWidth="4" />
                ) : (
                  <line x1="0" y1="0" x2="65" y2="-28" stroke="#f43f5e" strokeWidth="4" />
                )}
                <text x="40" y="-35" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">
                  K1 ({swAnd1 ? (bilingualMode === 'en' ? 'Closed / 1' : 'Đóng / 1') : (bilingualMode === 'en' ? 'Open / 0' : 'Mở / 0')})
                </text>
              </g>

              {/* Middle Wire between K1 and K2 */}
              <line
                x1="240"
                y1="120"
                x2="320"
                y2="120"
                stroke={isAndLampOn ? '#fbbf24' : (swAnd1 && swAnd2) ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />

              {/* Switch K2 */}
              <g transform="translate(320, 120)">
                <circle cx="0" cy="0" r="5" fill="#e2e8f0" />
                <circle cx="80" cy="0" r="5" fill="#e2e8f0" />
                {swAnd2 ? (
                  <line x1="0" y1="0" x2="80" y2="0" stroke={swAnd1 ? '#fbbf24' : '#475569'} strokeWidth="4" />
                ) : (
                  <line x1="0" y1="0" x2="65" y2="-28" stroke="#f43f5e" strokeWidth="4" />
                )}
                <text x="40" y="-35" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">
                  K2 ({swAnd2 ? (bilingualMode === 'en' ? 'Closed / 1' : 'Đóng / 1') : (bilingualMode === 'en' ? 'Open / 0' : 'Mở / 0')})
                </text>
              </g>

              {/* Wire to Light Bulb */}
              <line
                x1="400"
                y1="120"
                x2="500"
                y2="120"
                stroke={isAndLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />
              <line
                x1="500"
                y1="120"
                x2="500"
                y2="140"
                stroke={isAndLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />

              {/* Light Bulb Component */}
              <g transform="translate(500, 160)">
                {isAndLampOn && (
                  <circle cx="0" cy="0" r="32" fill="#fbbf24" opacity="0.3" filter="blur(8px)" />
                )}
                <circle
                  cx="0"
                  cy="0"
                  r="20"
                  fill={isAndLampOn ? '#fef08a' : '#334155'}
                  stroke={isAndLampOn ? '#f59e0b' : '#64748b'}
                  strokeWidth="3"
                />
                <line x1="-10" y1="-10" x2="10" y2="10" stroke={isAndLampOn ? '#b45309' : '#94a3b8'} strokeWidth="2" />
                <line x1="10" y1="-10" x2="-10" y2="10" stroke={isAndLampOn ? '#b45309' : '#94a3b8'} strokeWidth="2" />
                <text x="35" y="5" fill={isAndLampOn ? '#fde047' : '#94a3b8'} fontSize="12" fontWeight="bold">
                  {bilingualMode === 'en' ? 'Lamp' : 'Đèn'}: {isAndLampOn ? (bilingualMode === 'en' ? 'ON (1)' : 'SÁNG (1)') : (bilingualMode === 'en' ? 'OFF (0)' : 'TẮT (0)')}
                </text>
              </g>

              {/* Bottom Return Wire */}
              <line
                x1="500"
                y1="180"
                x2="500"
                y2="240"
                stroke={isAndLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />
              <line
                x1="500"
                y1="240"
                x2="60"
                y2="240"
                stroke={isAndLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />
              <line
                x1="60"
                y1="240"
                x2="60"
                y2="200"
                stroke={isAndLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />
            </svg>
          </div>

          {/* Controls for Switch K1 and Switch K2 */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSwAnd1(!swAnd1)}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  swAnd1
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>
                  {bilingualMode === 'en'
                    ? `Switch K1: ${swAnd1 ? 'CLOSED (1)' : 'OPEN (0)'}`
                    : `Công tắc K1: ${swAnd1 ? 'ĐÓNG (1)' : 'MỞ (0)'}`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSwAnd2(!swAnd2)}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  swAnd2
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>
                  {bilingualMode === 'en'
                    ? `Switch K2: ${swAnd2 ? 'CLOSED (1)' : 'OPEN (0)'}`
                    : `Công tắc K2: ${swAnd2 ? 'ĐÓNG (1)' : 'MỞ (0)'}`}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <span className="text-slate-400">
                {bilingualMode === 'en' ? 'Logic Expression:' : 'Biểu thức logic:'}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 font-bold">
                {swAnd1 ? '1' : '0'} AND {swAnd2 ? '1' : '0'} = {isAndLampOn ? (bilingualMode === 'en' ? '1 (ON)' : '1 (SÁNG)') : (bilingualMode === 'en' ? '0 (OFF)' : '0 (TẮT)')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Circuit 2: Parallel Circuit - OR Gate (Figure 5.6 SGK Page 27) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Figure 5.6 SGK Page 27' : 'Hình 5.6 SGK Trang 27'}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Parallel Circuit — Corresponding to Disjunction (OR Gate)'
                : 'Mạch điện mắc Song song — Tương ứng Phép tuyển (Cổng OR)'}
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-3 py-1.5 rounded-xl border border-teal-200 dark:border-teal-800">
            {bilingualMode === 'en' ? 'K1 OR K2 = Lamp ON' : 'K1 OR K2 = Đèn sáng'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              In a parallel circuit, current has two alternate branches. The lamp will illuminate when <strong>Switch K1 OR Switch K2 (or both) is closed</strong>. The lamp only turns off when both switches are open:
            </>
          ) : (
            <>
              Trong mạch điện mắc song song, dòng điện có hai nhánh đi. Bóng đèn sẽ sáng khi <strong>công tắc K1 HOẶC công tắc K2 (hoặc cả hai) đóng</strong>. Đèn chỉ tắt khi cả hai công tắc cùng mở:
            </>
          )}
        </p>

        {/* Interactive SVG Diagram for Parallel Circuit */}
        <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-6">
          <div className="relative w-full max-w-2xl mx-auto aspect-[16/9] flex items-center justify-center">
            <svg viewBox="0 0 600 320" className="w-full h-full select-none">
              {/* Power Source (Battery) on the left */}
              <g transform="translate(60, 160)">
                <line x1="0" y1="-40" x2="0" y2="40" stroke="#94a3b8" strokeWidth="4" />
                <line x1="-15" y1="-20" x2="-15" y2="20" stroke="#94a3b8" strokeWidth="6" />
                <text x="-40" y="-15" fill="#f59e0b" fontSize="16" fontWeight="bold">+</text>
                <text x="-38" y="25" fill="#94a3b8" fontSize="16" fontWeight="bold">-</text>
                <text x="-45" y="55" fill="#94a3b8" fontSize="11">{bilingualMode === 'en' ? 'Source E' : 'Nguồn E'}</text>
              </g>

              {/* Wire from battery to branch point A */}
              <line
                x1="60"
                y1="120"
                x2="170"
                y2="120"
                stroke={isOrLampOn ? '#fbbf24' : '#fbbf24'}
                strokeWidth="4"
              />

              {/* Junction A */}
              <circle cx="170" cy="120" r="5" fill="#fbbf24" />
              {/* Branch UP to K1 */}
              <line x1="170" y1="120" x2="170" y2="70" stroke="#fbbf24" strokeWidth="4" />
              <line x1="170" y1="70" x2="220" y2="70" stroke={swOr1 ? '#fbbf24' : '#fbbf24'} strokeWidth="4" />

              {/* Branch DOWN to K2 */}
              <line x1="170" y1="120" x2="170" y2="170" stroke="#fbbf24" strokeWidth="4" />
              <line x1="170" y1="170" x2="220" y2="170" stroke={swOr2 ? '#fbbf24' : '#fbbf24'} strokeWidth="4" />

              {/* Switch K1 (Top Branch) */}
              <g transform="translate(220, 70)">
                <circle cx="0" cy="0" r="5" fill="#e2e8f0" />
                <circle cx="80" cy="0" r="5" fill="#e2e8f0" />
                {swOr1 ? (
                  <line x1="0" y1="0" x2="80" y2="0" stroke="#fbbf24" strokeWidth="4" />
                ) : (
                  <line x1="0" y1="0" x2="65" y2="-28" stroke="#f43f5e" strokeWidth="4" />
                )}
                <text x="40" y="-35" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">
                  K1 ({swOr1 ? (bilingualMode === 'en' ? 'Closed / 1' : 'Đóng / 1') : (bilingualMode === 'en' ? 'Open / 0' : 'Mở / 0')})
                </text>
              </g>

              {/* Switch K2 (Bottom Branch) */}
              <g transform="translate(220, 170)">
                <circle cx="0" cy="0" r="5" fill="#e2e8f0" />
                <circle cx="80" cy="0" r="5" fill="#e2e8f0" />
                {swOr2 ? (
                  <line x1="0" y1="0" x2="80" y2="0" stroke="#fbbf24" strokeWidth="4" />
                ) : (
                  <line x1="0" y1="0" x2="65" y2="-28" stroke="#f43f5e" strokeWidth="4" />
                )}
                <text x="40" y="35" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">
                  K2 ({swOr2 ? (bilingualMode === 'en' ? 'Closed / 1' : 'Đóng / 1') : (bilingualMode === 'en' ? 'Open / 0' : 'Mở / 0')})
                </text>
              </g>

              {/* Junction B (Rejoin) */}
              <line x1="300" y1="70" x2="350" y2="70" stroke={swOr1 ? '#fbbf24' : '#475569'} strokeWidth="4" />
              <line x1="350" y1="70" x2="350" y2="120" stroke={swOr1 ? '#fbbf24' : '#475569'} strokeWidth="4" />

              <line x1="300" y1="170" x2="350" y2="170" stroke={swOr2 ? '#fbbf24' : '#475569'} strokeWidth="4" />
              <line x1="350" y1="170" x2="350" y2="120" stroke={swOr2 ? '#fbbf24' : '#475569'} strokeWidth="4" />

              <circle cx="350" cy="120" r="5" fill={isOrLampOn ? '#fbbf24' : '#64748b'} />

              {/* Wire from Junction B to Lamp */}
              <line
                x1="350"
                y1="120"
                x2="480"
                y2="120"
                stroke={isOrLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />
              <line
                x1="480"
                y1="120"
                x2="480"
                y2="140"
                stroke={isOrLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />

              {/* Light Bulb Component */}
              <g transform="translate(480, 160)">
                {isOrLampOn && (
                  <circle cx="0" cy="0" r="32" fill="#fbbf24" opacity="0.3" filter="blur(8px)" />
                )}
                <circle
                  cx="0"
                  cy="0"
                  r="20"
                  fill={isOrLampOn ? '#fef08a' : '#334155'}
                  stroke={isOrLampOn ? '#f59e0b' : '#64748b'}
                  strokeWidth="3"
                />
                <line x1="-10" y1="-10" x2="10" y2="10" stroke={isOrLampOn ? '#b45309' : '#94a3b8'} strokeWidth="2" />
                <line x1="10" y1="-10" x2="-10" y2="10" stroke={isOrLampOn ? '#b45309' : '#94a3b8'} strokeWidth="2" />
                <text x="35" y="5" fill={isOrLampOn ? '#fde047' : '#94a3b8'} fontSize="12" fontWeight="bold">
                  {bilingualMode === 'en' ? 'Lamp' : 'Đèn'}: {isOrLampOn ? (bilingualMode === 'en' ? 'ON (1)' : 'SÁNG (1)') : (bilingualMode === 'en' ? 'OFF (0)' : 'TẮT (0)')}
                </text>
              </g>

              {/* Bottom Return Wire */}
              <line
                x1="480"
                y1="180"
                x2="480"
                y2="240"
                stroke={isOrLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />
              <line
                x1="480"
                y1="240"
                x2="60"
                y2="240"
                stroke={isOrLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />
              <line
                x1="60"
                y1="240"
                x2="60"
                y2="200"
                stroke={isOrLampOn ? '#fbbf24' : '#475569'}
                strokeWidth="4"
              />
            </svg>
          </div>

          {/* Controls for Switch K1 and Switch K2 */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setSwOr1(!swOr1)}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  swOr1
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>
                  {bilingualMode === 'en'
                    ? `Switch K1: ${swOr1 ? 'CLOSED (1)' : 'OPEN (0)'}`
                    : `Công tắc K1: ${swOr1 ? 'ĐÓNG (1)' : 'MỞ (0)'}`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSwOr2(!swOr2)}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  swOr2
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>
                  {bilingualMode === 'en'
                    ? `Switch K2: ${swOr2 ? 'CLOSED (1)' : 'OPEN (0)'}`
                    : `Công tắc K2: ${swOr2 ? 'ĐÓNG (1)' : 'MỞ (0)'}`}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <span className="text-slate-400">
                {bilingualMode === 'en' ? 'Logic Expression:' : 'Biểu thức logic:'}
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-teal-300 font-bold">
                {swOr1 ? '1' : '0'} OR {swOr2 ? '1' : '0'} = {isOrLampOn ? (bilingualMode === 'en' ? '1 (ON)' : '1 (SÁNG)') : (bilingualMode === 'en' ? '0 (OFF)' : '0 (TẮT)')}
              </span>
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
              ? 'Practice & Application (Page 27) — 10-Question Quiz & Certificate'
              : 'Luyện tập & Vận dụng (Trang 27 SGK) — Trắc nghiệm 10 câu & Nhận chứng nhận'}
          </div>
        </div>

        <button
          type="button"
          onClick={nextPage}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm transition-all shadow-md cursor-pointer shrink-0"
        >
          <span>{bilingualMode === 'en' ? 'Go to Practice & Application' : 'Vào phần Luyện tập & Vận dụng'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
