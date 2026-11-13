import React, { useState } from 'react';
import {
  Award,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Binary,
  Cpu,
  Check,
  X,
  Plus,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section4PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setOriginalPageTarget,
    setShowOriginalModal,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isCertificateEarned,
    isAllSectionsComplete,
    currentLesson,
    completedSections
  } = useBook();

  // Practice 1: Addition tabs
  const [activeAddTab, setActiveAddTab] = useState<'a' | 'b' | 'c'>('a');
  const [userAddInputs, setUserAddInputs] = useState<Record<string, string>>({
    '1a': '',
    '1b': '',
    '1c': ''
  });
  const [showAddGuides, setShowAddGuides] = useState<Record<string, boolean>>({
    '1a': false,
    '1b': false,
    '1c': false
  });

  // Practice 2: Multiplication tabs
  const [activeMultTab, setActiveMultTab] = useState<'a' | 'b' | 'c'>('a');
  const [userMultInputs, setUserMultInputs] = useState<Record<string, string>>({
    '2a': '',
    '2b': '',
    '2c': ''
  });
  const [showMultGuides, setShowMultGuides] = useState<Record<string, boolean>>({
    '2a': false,
    '2b': false,
    '2c': false
  });

  // Application 1: Fractional conversion simulator
  const [fractionInput, setFractionInput] = useState<number>(0.625);
  const [fracStrInput, setFracStrInput] = useState<string>('0.625');

  // Application 2: Two's complement subtraction sandbox
  const [subA, setSubA] = useState<number>(27);
  const [subB, setSubB] = useState<number>(19);

  const speechText =
    "Practice and Application for Lesson 4. Practice 1: Execute three-stage computing pipeline for addition operations: 125 + 17 = 142; 250 + 175 = 425; 75 + 112 = 187. Practice 2: Execute three-stage computing pipeline for multiplication operations: 15 times 6 = 90; 11 times 9 = 99; 125 times 4 = 500. Application 1: Successive multiplication by 2 algorithm to convert fractional decimal numbers into binary. For example, 0.625 times 2 yields binary 0.101. Application 2: Investigating why computers use two's complement to transform subtraction into addition within the CPU ALU.";

  // Fractional conversion calculation
  const computeFractionalBinary = (frac: number) => {
    let cur = frac;
    const steps: { frac: number; double: number; intPart: number; nextFrac: number }[] = [];
    let bits = '';
    let count = 0;

    while (cur > 0 && count < 8) {
      const double = cur * 2;
      const intPart = Math.floor(double);
      const nextFrac = Number((double - intPart).toFixed(6));
      steps.push({ frac: cur, double, intPart, nextFrac });
      bits += intPart.toString();
      cur = nextFrac;
      count++;
    }

    return { steps, binaryStr: '0.' + (bits || '0') };
  };

  const fracRes = computeFractionalBinary(fractionInput);

  // Application 2 ALU subtraction via Two's Complement
  const binSubA = subA.toString(2).padStart(8, '0');
  // Two's complement of -subB in 8 bits
  const twosB = ((256 - subB) & 0xff).toString(2).padStart(8, '0');
  const sumVal = subA + (256 - subB);
  const rawSumBin = sumVal.toString(2);
  const final8Bit = (sumVal & 0xff).toString(2).padStart(8, '0');
  const finalDecimal = subA - subB;

  return (
    <div className="space-y-6">
      {/* Teacher Prompts Widget for Lesson 4 Section 5 */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={4} />

      {/* Top Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Practice & Application • Page 23 SGK' : 'Luyện tập & Vận dụng • Trang 23 SGK'}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(23);
                setShowOriginalModal(true);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{bilingualMode === 'en' ? 'View scan Page 23' : 'Xem scan Trang 23'}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? 'Practice & Application: 3-Stage Computing & Fraction Algorithms'
              : 'Luyện tập & Vận dụng: Tính toán 3 bước & Thuật toán phân số'}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            if (isSpeaking) {
              stopSpeaking();
            } else {
              speak(speechText, 'en');
            }
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs shrink-0 ${
            isSpeaking
              ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
          title={bilingualMode === 'en' ? 'Listen to English explanation' : 'Nghe phát âm tiếng Anh cho phần Luyện tập & Vận dụng'}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isSpeaking ? 'STOP' : 'EN'}</span>
        </button>
      </div>

      {/* Luyện tập Bài 1: Phép cộng theo quy trình 3 bước (Trang 23 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-black">
            <Plus className="w-5 h-5 stroke-[3]" />
            <h3 className="text-base sm:text-lg">
              {bilingualMode === 'en'
                ? 'Practice 1: 3-Stage Addition Pipeline Figure 4.4 (Page 23 SGK)'
                : 'Luyện tập 1: Phép cộng theo quy trình 3 bước Hình 4.4 (Trang 23 SGK)'}
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveAddTab('a')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeAddTab === 'a'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {bilingualMode === 'en' ? 'Problem a (125 + 17)' : 'Câu a (125 + 17)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveAddTab('b')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeAddTab === 'b'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {bilingualMode === 'en' ? 'Problem b (250 + 175)' : 'Câu b (250 + 175)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveAddTab('c')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeAddTab === 'c'
                  ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {bilingualMode === 'en' ? 'Problem c (75 + 112)' : 'Câu c (75 + 112)'}
            </button>
          </div>
        </div>

        {/* Tab Content for Additions */}
        {activeAddTab === 'a' && (
          <div className="space-y-3">
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en' ? (
                <>Execute calculation <strong>125 + 17</strong> across 3 stages:</>
              ) : (
                <>Thực hiện phép tính <strong>125 + 17</strong> theo 3 bước:</>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-indigo-600 mb-1">
                  {bilingualMode === 'en' ? '1. Encoding:' : '1. Mã hoá:'}
                </div>
                <div>125₁₀ = <strong>1111101₂</strong></div>
                <div>17₁₀ = <strong>10001₂</strong></div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-amber-600 mb-1">
                  {bilingualMode === 'en' ? '2. ALU Execution:' : '2. Thực hiện ALU:'}
                </div>
                <div>1111101₂ + 10001₂</div>
                <div className="text-emerald-600 font-bold">= 10001110₂</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-emerald-600 mb-1">
                  {bilingualMode === 'en' ? '3. Decoding:' : '3. Giải mã:'}
                </div>
                <div>10001110₂ = <strong>142₁₀</strong></div>
                <div className="text-slate-500 text-[11px] font-sans">
                  {bilingualMode === 'en' ? 'Matches: 125 + 17 = 142' : 'Khớp: 125 + 17 = 142'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeAddTab === 'b' && (
          <div className="space-y-3">
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en' ? (
                <>Execute calculation <strong>250 + 175</strong> across 3 stages:</>
              ) : (
                <>Thực hiện phép tính <strong>250 + 175</strong> theo 3 bước:</>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-indigo-600 mb-1">
                  {bilingualMode === 'en' ? '1. Encoding:' : '1. Mã hoá:'}
                </div>
                <div>250₁₀ = <strong>11111010₂</strong></div>
                <div>175₁₀ = <strong>10101111₂</strong></div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-amber-600 mb-1">
                  {bilingualMode === 'en' ? '2. ALU Execution:' : '2. Thực hiện ALU:'}
                </div>
                <div>11111010₂ + 10101111₂</div>
                <div className="text-emerald-600 font-bold">= 110101001₂</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-emerald-600 mb-1">
                  {bilingualMode === 'en' ? '3. Decoding:' : '3. Giải mã:'}
                </div>
                <div>110101001₂ = <strong>425₁₀</strong></div>
                <div className="text-slate-500 text-[11px] font-sans">
                  {bilingualMode === 'en' ? 'Matches: 250 + 175 = 425' : 'Khớp: 250 + 175 = 425'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeAddTab === 'c' && (
          <div className="space-y-3">
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en' ? (
                <>Execute calculation <strong>75 + 112</strong> across 3 stages:</>
              ) : (
                <>Thực hiện phép tính <strong>75 + 112</strong> theo 3 bước:</>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-indigo-600 mb-1">
                  {bilingualMode === 'en' ? '1. Encoding:' : '1. Mã hoá:'}
                </div>
                <div>75₁₀ = <strong>1001011₂</strong></div>
                <div>112₁₀ = <strong>1110000₂</strong></div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-amber-600 mb-1">
                  {bilingualMode === 'en' ? '2. ALU Execution:' : '2. Thực hiện ALU:'}
                </div>
                <div>1001011₂ + 1110000₂</div>
                <div className="text-emerald-600 font-bold">= 10111011₂</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-emerald-600 mb-1">
                  {bilingualMode === 'en' ? '3. Decoding:' : '3. Giải mã:'}
                </div>
                <div>10111011₂ = <strong>187₁₀</strong></div>
                <div className="text-slate-500 text-[11px] font-sans">
                  {bilingualMode === 'en' ? 'Matches: 75 + 112 = 187' : 'Khớp: 75 + 112 = 187'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Luyện tập Bài 2: Phép nhân theo quy trình 3 bước (Trang 23 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black">
            <Calculator className="w-5 h-5 stroke-[2.5]" />
            <h3 className="text-base sm:text-lg">
              {bilingualMode === 'en'
                ? 'Practice 2: 3-Stage Multiplication Pipeline (Page 23 SGK)'
                : 'Luyện tập 2: Phép nhân theo quy trình 3 bước (Trang 23 SGK)'}
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveMultTab('a')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeMultTab === 'a'
                  ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {bilingualMode === 'en' ? 'Problem a (15 × 6)' : 'Câu a (15 × 6)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveMultTab('b')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeMultTab === 'b'
                  ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {bilingualMode === 'en' ? 'Problem b (11 × 9)' : 'Câu b (11 × 9)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveMultTab('c')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeMultTab === 'c'
                  ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {bilingualMode === 'en' ? 'Problem c (125 × 4)' : 'Câu c (125 × 4)'}
            </button>
          </div>
        </div>

        {/* Tab Content for Multiplications */}
        {activeMultTab === 'a' && (
          <div className="space-y-3">
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en' ? (
                <>Execute calculation <strong>15 × 6</strong> across 3 stages:</>
              ) : (
                <>Thực hiện phép tính <strong>15 × 6</strong> theo 3 bước:</>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-indigo-600 mb-1">
                  {bilingualMode === 'en' ? '1. Encoding:' : '1. Mã hoá:'}
                </div>
                <div>15₁₀ = <strong>1111₂</strong></div>
                <div>6₁₀ = <strong>110₂</strong></div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-amber-600 mb-1">
                  {bilingualMode === 'en' ? '2. ALU Execution:' : '2. Thực hiện ALU:'}
                </div>
                <div>1111₂ × 110₂</div>
                <div className="text-emerald-600 font-bold">= 1011010₂</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-emerald-600 mb-1">
                  {bilingualMode === 'en' ? '3. Decoding:' : '3. Giải mã:'}
                </div>
                <div>1011010₂ = <strong>90₁₀</strong></div>
                <div className="text-slate-500 text-[11px] font-sans">
                  {bilingualMode === 'en' ? 'Matches: 15 × 6 = 90' : 'Khớp: 15 × 6 = 90'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMultTab === 'b' && (
          <div className="space-y-3">
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en' ? (
                <>Execute calculation <strong>11 × 9</strong> across 3 stages:</>
              ) : (
                <>Thực hiện phép tính <strong>11 × 9</strong> theo 3 bước:</>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-indigo-600 mb-1">
                  {bilingualMode === 'en' ? '1. Encoding:' : '1. Mã hoá:'}
                </div>
                <div>11₁₀ = <strong>1011₂</strong></div>
                <div>9₁₀ = <strong>1001₂</strong></div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-amber-600 mb-1">
                  {bilingualMode === 'en' ? '2. ALU Execution:' : '2. Thực hiện ALU:'}
                </div>
                <div>1011₂ × 1001₂</div>
                <div className="text-emerald-600 font-bold">= 1100011₂</div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-emerald-600 mb-1">
                  {bilingualMode === 'en' ? '3. Decoding:' : '3. Giải mã:'}
                </div>
                <div>1100011₂ = <strong>99₁₀</strong></div>
                <div className="text-slate-500 text-[11px] font-sans">
                  {bilingualMode === 'en' ? 'Matches: 11 × 9 = 99' : 'Khớp: 11 × 9 = 99'}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeMultTab === 'c' && (
          <div className="space-y-3">
            <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en' ? (
                <>Execute calculation <strong>125 × 4</strong> across 3 stages:</>
              ) : (
                <>Thực hiện phép tính <strong>125 × 4</strong> theo 3 bước:</>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-indigo-600 mb-1">
                  {bilingualMode === 'en' ? '1. Encoding:' : '1. Mã hoá:'}
                </div>
                <div>125₁₀ = <strong>1111101₂</strong></div>
                <div>4₁₀ = <strong>100₂</strong></div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-amber-600 mb-1">
                  {bilingualMode === 'en' ? '2. ALU Execution:' : '2. Thực hiện ALU:'}
                </div>
                <div>1111101₂ × 100₂</div>
                <div className="text-emerald-600 font-bold">
                  {bilingualMode === 'en' ? '= 111110100₂ (shifted left 2 bits)' : '= 111110100₂ (dịch trái 2 bit)'}
                </div>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-emerald-600 mb-1">
                  {bilingualMode === 'en' ? '3. Decoding:' : '3. Giải mã:'}
                </div>
                <div>111110100₂ = <strong>500₁₀</strong></div>
                <div className="text-slate-500 text-[11px] font-sans">
                  {bilingualMode === 'en' ? 'Matches: 125 × 4 = 500' : 'Khớp: 125 × 4 = 500'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vận dụng 1: Thuật toán đổi phần thập phân sang nhị phân (Trang 23 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2 text-violet-700 dark:text-violet-400 font-black">
            <Lightbulb className="w-5 h-5" />
            <h3 className="text-base sm:text-lg">
              {bilingualMode === 'en'
                ? 'Application 1: Converting Fractional Decimals to Binary (Page 23 SGK)'
                : 'Vận dụng 1: Đổi phần thập phân sang hệ nhị phân (Trang 23 SGK)'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 px-2 py-0.5 rounded-full">
            {bilingualMode === 'en' ? 'Application 1 SGK' : 'Vận dụng 1 SGK'}
          </span>
        </div>

        <BilingualText
          vi="Để đổi phần thập phân của một số thập phân sang hệ đếm nhị phân: Ta nhân liên tiếp phần thập phân với 2, ghi lại phần nguyên (0 hoặc 1). Tiếp tục lấy phần thập phân mới nhân với 2 cho tới khi phần thập phân bằng 0. Dãy các phần nguyên đọc theo thứ tự XUÔI TỪ TRÊN XUỐNG DƯỚI chính là phần thập phân nhị phân!"
          en="To convert a fractional decimal number into binary: Repeatedly multiply the fractional part by 2 and record the integer part (0 or 1). Continue multiplying the remaining fractional portion by 2 until it reaches 0. Reading the sequence of integer parts FROM TOP TO BOTTOM produces the binary fractional representation!"
          highlightWords={['nhân liên tiếp với 2', 'ghi lại phần nguyên', 'đọc từ trên xuống dưới', 'successive multiplication by 2']}
        />

        {/* Fractional Multiplier Simulator */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold">
                {bilingualMode === 'en' ? 'Try decimal fraction:' : 'Thử phân số thập phân:'}
              </span>
              <input
                type="number"
                step="0.001"
                min="0.001"
                max="0.999"
                value={fracStrInput}
                onChange={(e) => {
                  setFracStrInput(e.target.value);
                  const val = parseFloat(e.target.value);
                  if (!isNaN(val) && val > 0 && val < 1) {
                    setFractionInput(val);
                  }
                }}
                className="w-24 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-violet-300 font-mono font-bold text-center"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[0.625, 0.375, 0.125, 0.5, 0.875].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setFractionInput(preset);
                    setFracStrInput(preset.toString());
                  }}
                  className={`px-2 py-0.5 rounded text-xs font-mono font-bold cursor-pointer border ${
                    fractionInput === preset
                      ? 'bg-violet-600 text-white border-violet-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 text-left">
                  <th className="py-1.5 px-2">{bilingualMode === 'en' ? 'Step' : 'Bước'}</th>
                  <th className="py-1.5 px-2">{bilingualMode === 'en' ? 'Multiplication (× 2)' : 'Phép nhân (× 2)'}</th>
                  <th className="py-1.5 px-2 text-violet-400 font-bold">
                    {bilingualMode === 'en' ? 'Integer Part (extracted)' : 'Phần nguyên (lấy ra)'}
                  </th>
                  <th className="py-1.5 px-2">{bilingualMode === 'en' ? 'Remaining Fractional Part' : 'Phần thập phân còn lại'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {fracRes.steps.map((s, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-2 text-slate-400">
                      {bilingualMode === 'en' ? `Step ${idx + 1}` : `Bước ${idx + 1}`}
                    </td>
                    <td className="py-2 px-2 text-slate-200">{s.frac} × 2 = {s.double.toFixed(4)}</td>
                    <td className="py-2 px-2">
                      <span className="px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-700 font-black">
                        {s.intPart}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-slate-400">{s.nextFrac}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              {bilingualMode === 'en' ? 'Read integer parts from top to bottom:' : 'Đọc phần nguyên từ trên xuống dưới:'}
            </span>
            <span className="text-emerald-400 text-sm font-black">
              {fractionInput}₁₀ = {fracRes.binaryStr}₂
            </span>
          </div>
        </div>
      </div>

      {/* Vận dụng 2: Khám phá mã bù 2 trong ALU máy tính (Trang 23 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-black">
            <Cpu className="w-5 h-5" />
            <h3 className="text-base sm:text-lg">
              {bilingualMode === 'en'
                ? "Application 2: Why Do Computers Use Two's Complement? (Page 23 SGK)"
                : 'Vận dụng 2: Tại sao máy tính sử dụng mã bù 2? (Trang 23 SGK)'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 px-2 py-0.5 rounded-full">
            {bilingualMode === 'en' ? 'Application 2 SGK' : 'Vận dụng 2 SGK'}
          </span>
        </div>

        <BilingualText
          vi="Tại sao máy tính sử dụng mã bù 2? Vì mã bù 2 biến phép trừ A - B thành phép cộng A + (-B). Nhờ đó, mạch điện tử của bộ vi xử lí CPU chỉ cần một mạch cộng số học duy nhất mà không cần thiết kế mạch trừ riêng biệt! Điều này giúp mạch tích hợp đơn giản hơn, giảm số lượng bóng bán dẫn, tiết kiệm năng lượng và tăng tốc độ xử lý."
          en="Why do computers use two's complement? Because two's complement transforms subtraction A - B into simple addition A + (-B). Consequently, the CPU's Arithmetic Logic Unit requires only a single addition circuit rather than separate subtraction hardware! This drastically simplifies circuitry, minimizes transistors, conserves power, and accelerates execution speed."
          highlightWords={['biến phép trừ thành phép cộng', 'A - B = A + (-B)', 'chỉ cần mạch cộng duy nhất', 'ALU']}
        />

        {/* Live demonstration of A - B = A + (-B in two's complement) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4 font-mono">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <span className="text-amber-400 font-bold">
              {bilingualMode === 'en'
                ? `Operation demonstration: ${subA} - ${subB} = ${finalDecimal}₁₀`
                : `Minh hoạ phép tính: ${subA} - ${subB} = ${finalDecimal}₁₀`}
            </span>
            <span className="text-slate-400 text-[11px]">8 bit Two's Complement Adder</span>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                {bilingualMode === 'en' ? `Minuend A (+${subA}):` : `Số bị trừ A (+${subA}):`}
              </span>
              <span className="text-emerald-400 font-bold">{binSubA}₂</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">
                {bilingualMode === 'en'
                  ? `Negative Subtrahend -B (-${subB} two's complement):`
                  : `Số trừ âm -B (-${subB} mã bù 2):`}
              </span>
              <span className="text-rose-400 font-bold">{twosB}₂</span>
            </div>
            <div className="border-t border-dashed border-slate-700 pt-2 flex items-center justify-between">
              <span className="text-amber-400 font-bold">
                {bilingualMode === 'en' ? 'ALU Circuit Executes ADDITION (+):' : 'Mạch ALU thực hiện CỘNG (+):'}
              </span>
              <span className="text-slate-300 font-bold">{binSubA} + {twosB}</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400 text-sm font-black pt-1">
              <span>{bilingualMode === 'en' ? '8-Bit Binary Sum:' : 'Tổng nhị phân 8 bit:'}</span>
              <span>{final8Bit}₂ (= {finalDecimal}₁₀)</span>
            </div>
            <div className="text-[11px] text-slate-400 font-sans pt-1">
              {bilingualMode === 'en' ? (
                <>The overflow bit 1 at position 9 is automatically discarded by the byte overflow mechanism. The result is precisely <strong>{finalDecimal}</strong>!</>
              ) : (
                <>Bit tràn 1 ở vị trí thứ 9 tự động được loại bỏ theo cơ chế tràn byte. Kết quả thu được chính xác là <strong>{finalDecimal}</strong>!</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

