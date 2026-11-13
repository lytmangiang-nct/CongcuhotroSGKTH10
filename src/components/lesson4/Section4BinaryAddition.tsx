import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  CheckCircle2,
  Binary,
  Calculator,
  ArrowRight,
  Plus,
  Sparkles,
  Eye,
  RefreshCw,
  HelpCircle,
  Table
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section4BinaryAddition: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Presets or custom binary additions
  const [numAStr, setNumAStr] = useState<string>('11011'); // 27
  const [numBStr, setNumBStr] = useState<string>('11010'); // 26
  const [stepIndex, setStepIndex] = useState<number>(5); // default full view

  const speechText =
    "Section 2a and 2b: Arithmetic Operations in the Binary System. Activity 2: Operations in binary, such as 27 + 26 = 53 and 13 times 5 = 65. Table 4.1 Addition and Multiplication in binary: 0 + 0 = 0; 0 + 1 = 1; 1 + 0 = 1; 1 + 1 = 10, write 0 and carry 1 to the next left column. When carry is present, 1 + 1 + 1 = 11, write 1 and carry 1. Multiplication rules: 0 times 0 = 0; 0 times 1 = 0; 1 times 0 = 0; 1 times 1 = 1. Figure 4.2 Binary Addition: Align columns from right to left: 11011 plus 11010 equals 110101, corresponding precisely to 27 + 26 = 53 in decimal.";

  // Compute column addition details
  const computeAddition = (a: string, b: string) => {
    const maxLen = Math.max(a.length, b.length);
    const padA = a.padStart(maxLen, '0');
    const padB = b.padStart(maxLen, '0');

    let carry = 0;
    const carries: number[] = new Array(maxLen + 1).fill(0);
    const sumBits: number[] = [];

    // Right to left calculation
    for (let i = maxLen - 1; i >= 0; i--) {
      const bitA = parseInt(padA[i], 10) || 0;
      const bitB = parseInt(padB[i], 10) || 0;
      const total = bitA + bitB + carry;
      const outBit = total % 2;
      carry = Math.floor(total / 2);
      sumBits.unshift(outBit);
      carries[i] = carry; // carry to column i
    }
    if (carry > 0) {
      sumBits.unshift(carry);
    }

    const decA = parseInt(a, 2) || 0;
    const decB = parseInt(b, 2) || 0;
    const decSum = decA + decB;

    return {
      padA: carry > 0 ? '0' + padA : padA,
      padB: carry > 0 ? '0' + padB : padB,
      carries,
      carryOut: carry,
      sumStr: sumBits.join(''),
      decA,
      decB,
      decSum
    };
  };

  const addRes = computeAddition(numAStr, numBStr);

  const presets = [
    { label: 'SGK Hình 4.2 (27 + 26 = 53)', a: '11011', b: '11010' },
    { label: 'SGK Củng cố 2a (101101 + 11001)', a: '101101', b: '11001' },
    { label: 'Ví dụ nhỏ (5 + 7 = 12)', a: '101', b: '111' },
    { label: 'Có nhiều nhớ (15 + 1 = 16)', a: '1111', b: '1' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Section 2a & 2b • Page 22 SGK' : 'Mục 2a & 2b • Trang 22 SGK'}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(22);
                setShowOriginalModal(true);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{bilingualMode === 'en' ? 'View scan Page 22' : 'Xem scan Trang 22'}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? '2. Arithmetic Operations & Binary Addition (Figure 4.2)'
              : '2. Các phép tính số học & Phép cộng nhị phân (Hình 4.2)'}
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
              : 'bg-teal-600 hover:bg-teal-700 text-white'
          }`}
          title={bilingualMode === 'en' ? 'Listen to English explanation' : 'Nghe phát âm tiếng Anh cho mục 2a & 2b'}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isSpeaking ? 'STOP' : 'EN'}</span>
        </button>
      </div>

      {/* Hoạt động 2: Phép tính trong hệ nhị phân (Trang 22 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 text-teal-700 dark:text-teal-400 font-black">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base sm:text-lg">
              {bilingualMode === 'en'
                ? 'Activity 2: Arithmetic Operations in Binary (Page 22 SGK)'
                : 'Hoạt động 2: Phép tính trong hệ nhị phân (Trang 22 SGK)'}
            </h3>
          </div>
          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
            {bilingualMode === 'en' ? 'Activity 2 p. 22' : 'HĐ2 Trang 22'}
          </span>
        </div>

        <BilingualText
          vi="Quan sát các phép tính trong hệ thập phân: 27 + 26 = 53 và 13 × 5 = 65. Khi chuyển sang hệ nhị phân, liệu chúng ta có thể đặt tính và thực hiện cộng, nhân theo các cột giống như trong hệ thập phân hay không? Vì hệ nhị phân chỉ có hai chữ số 0 và 1 nên quy tắc tính toán còn đơn giản hơn rất nhiều!"
          en="Observe decimal arithmetic operations: 27 + 26 = 53 and 13 × 5 = 65. When converted to binary, can we set up column calculations for addition and multiplication just like in decimal? Since the binary system uses only digits 0 and 1, the arithmetic rules are remarkably straightforward!"
          highlightWords={['27 + 26 = 53', '13 × 5 = 65', 'hệ nhị phân', 'cộng theo cột']}
        />
      </div>

      {/* a) Bảng cộng và nhân trong hệ nhị phân (Bảng 4.1 SGK Trang 22) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Table className="w-5 h-5 text-indigo-600" />
            <span>
              {bilingualMode === 'en'
                ? 'a) Binary Addition & Multiplication Tables (Table 4.1 SGK)'
                : 'a) Bảng cộng và nhân trong hệ nhị phân (Bảng 4.1 SGK)'}
            </span>
          </h3>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
            {bilingualMode === 'en' ? 'Table 4.1 SGK' : 'Bảng 4.1 SGK'}
          </span>
        </div>

        <BilingualText
          vi="Quy tắc cộng và nhân cơ bản trong hệ nhị phân rất ngắn gọn. Đặc biệt trong phép cộng: 1 + 1 = 10₂ (viết 0, nhớ 1 sang hàng bên trái). Khi có bit nhớ từ hàng bên phải chuyển sang: 1 + 1 + 1 = 11₂ (viết 1, nhớ 1)."
          en="Fundamental binary addition and multiplication rules are compact. Notice that in addition: 1 + 1 = 10₂ (write 0 and carry 1 to the next left column). When a carry-in bit is present: 1 + 1 + 1 = 11₂ (write 1 and carry 1)."
          highlightWords={['1 + 1 = 10', '1 + 1 + 1 = 11', 'nhớ 1', 'carry 1']}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs sm:text-sm">
          {/* Bảng cộng */}
          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 space-y-3">
            <div className="font-bold text-teal-900 dark:text-teal-300 text-sm flex items-center justify-between">
              <span>{bilingualMode === 'en' ? 'BINARY ADDITION TABLE (+)' : 'BẢNG CỘNG NHỊ PHÂN (+)'}</span>
              <span className="text-[11px] text-teal-700 dark:text-teal-400 font-normal">
                {bilingualMode === 'en' ? 'Table 4.1a' : 'Bảng 4.1a'}
              </span>
            </div>
            <div className="space-y-1.5 bg-white dark:bg-slate-900 p-3 rounded-xl border border-teal-200/80 dark:border-teal-800">
              <div className="flex items-center justify-between py-0.5">
                <span>0 + 0 =</span>
                <strong className="text-teal-700 dark:text-teal-400">0</strong>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span>0 + 1 =</span>
                <strong className="text-teal-700 dark:text-teal-400">1</strong>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span>1 + 0 =</span>
                <strong className="text-teal-700 dark:text-teal-400">1</strong>
              </div>
              <div className="flex items-center justify-between py-0.5 border-t border-dashed border-teal-200 dark:border-teal-800 pt-1">
                <span>1 + 1 =</span>
                <strong className="text-amber-600 dark:text-amber-400 font-black">
                  {bilingualMode === 'en' ? '10₂ (write 0, carry 1) ★' : '10₂ (viết 0, nhớ 1) ★'}
                </strong>
              </div>
              <div className="flex items-center justify-between py-0.5 text-[11px] text-indigo-600 dark:text-indigo-400 pt-0.5">
                <span>{bilingualMode === 'en' ? '1 + 1 + 1 (carry) =' : '1 + 1 + 1 (nhớ) ='}</span>
                <strong className="font-black">
                  {bilingualMode === 'en' ? '11₂ (write 1, carry 1)' : '11₂ (viết 1, nhớ 1)'}
                </strong>
              </div>
            </div>
          </div>

          {/* Bảng nhân */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
            <div className="font-bold text-indigo-900 dark:text-indigo-300 text-sm flex items-center justify-between">
              <span>{bilingualMode === 'en' ? 'BINARY MULTIPLICATION TABLE (×)' : 'BẢNG NHÂN NHỊ PHÂN (×)'}</span>
              <span className="text-[11px] text-indigo-700 dark:text-indigo-400 font-normal">
                {bilingualMode === 'en' ? 'Table 4.1b' : 'Bảng 4.1b'}
              </span>
            </div>
            <div className="space-y-1.5 bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-200/80 dark:border-indigo-800">
              <div className="flex items-center justify-between py-0.5">
                <span>0 × 0 =</span>
                <strong className="text-indigo-700 dark:text-indigo-400">0</strong>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span>0 × 1 =</span>
                <strong className="text-indigo-700 dark:text-indigo-400">0</strong>
              </div>
              <div className="flex items-center justify-between py-0.5">
                <span>1 × 0 =</span>
                <strong className="text-indigo-700 dark:text-indigo-400">0</strong>
              </div>
              <div className="flex items-center justify-between py-0.5 border-t border-dashed border-indigo-200 dark:border-indigo-800 pt-1">
                <span>1 × 1 =</span>
                <strong className="text-emerald-600 dark:text-emerald-400 font-black">1 ★</strong>
              </div>
              <div className="text-[11px] text-slate-500 font-sans pt-1">
                {bilingualMode === 'en'
                  ? 'Equals 1 only when both operands are 1 (equivalent to AND operation).'
                  : 'Chỉ bằng 1 khi cả hai thừa số đều bằng 1 (tương đương phép AND).'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* b) Phép cộng hai số nhị phân (Hình 4.2 SGK Trang 22) Interactive Column Sandbox */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-500 text-slate-950 font-black flex items-center justify-center">
              4.2
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {bilingualMode === 'en'
                  ? 'Interactive Simulator: Column-wise Binary Addition (Figure 4.2 SGK)'
                  : 'Mô phỏng tương tác: Đặt tính phép cộng nhị phân theo cột (Hình 4.2 SGK)'}
              </h3>
              <p className="text-xs text-slate-400">
                {bilingualMode === 'en'
                  ? 'Execute right to left, showing exact carry bits overhead!'
                  : 'Thực hiện từ phải sang trái, hiển thị chính xác từng bit nhớ (Carry) phía trên!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold mr-1">
              {bilingualMode === 'en' ? 'Quick Presets:' : 'Mẫu nhanh:'}
            </span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNumAStr(p.a);
                  setNumBStr(p.b);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer border ${
                  numAStr === p.a && numBStr === p.b
                    ? 'bg-teal-500 text-slate-950 border-teal-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {bilingualMode === 'en' ? (
                  idx === 0
                    ? 'SGK Fig 4.2 (27 + 26 = 53)'
                    : idx === 1
                    ? 'SGK Review 2a (101101 + 11001)'
                    : idx === 2
                    ? 'Small Ex (5 + 7 = 12)'
                    : 'Multiple Carries (15 + 1 = 16)'
                ) : (
                  p.label
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">
              {bilingualMode === 'en' ? 'Operand 1 (binary):' : 'Số hạng 1 (nhị phân):'}
            </span>
            <input
              type="text"
              value={numAStr}
              onChange={(e) => setNumAStr(e.target.value.replace(/[^01]/g, ''))}
              className="w-24 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-teal-400 font-mono font-bold text-center text-sm"
            />
            <span className="text-slate-500 font-mono">(= {addRes.decA}₁₀)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">
              {bilingualMode === 'en' ? 'Operand 2 (binary):' : 'Số hạng 2 (nhị phân):'}
            </span>
            <input
              type="text"
              value={numBStr}
              onChange={(e) => setNumBStr(e.target.value.replace(/[^01]/g, ''))}
              className="w-24 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-teal-400 font-mono font-bold text-center text-sm"
            />
            <span className="text-slate-500 font-mono">(= {addRes.decB}₁₀)</span>
          </div>

          <div className="font-mono text-emerald-400 font-bold">
            {bilingualMode === 'en' ? 'Decimal check: ' : 'Kiểm tra thập phân: '}
            {addRes.decA} + {addRes.decB} = {addRes.decSum}₁₀
          </div>
        </div>

        {/* Column Addition Display Area (Replicating Hình 4.2 layout) */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center font-mono">
          <div className="w-fit text-right space-y-1">
            {/* Carry bits row */}
            <div className="flex justify-end gap-3 text-xs font-bold text-amber-400 pr-1 pb-1">
              <span className="text-[10px] text-amber-500/80 mr-2 uppercase tracking-wider font-sans">
                {bilingualMode === 'en' ? '(Carry row) ➔' : '(Hàng nhớ) ➔'}
              </span>
              {addRes.padA.split('').map((_, idx) => {
                const c = addRes.carries[idx] || 0;
                return (
                  <span
                    key={idx}
                    className={`w-6 text-center ${c > 0 ? 'bg-amber-500/20 text-amber-300 rounded px-1' : 'opacity-20 text-slate-600'}`}
                  >
                    {c > 0 ? '1' : '·'}
                  </span>
                );
              })}
            </div>

            {/* First summand */}
            <div className="flex justify-end gap-3 text-xl sm:text-2xl font-black text-slate-100 pr-1">
              <span className="text-slate-500 text-sm mr-2 self-center font-sans font-normal">
                {addRes.decA}₁₀
              </span>
              {addRes.padA.split('').map((ch, idx) => (
                <span key={idx} className="w-6 text-center">{ch}</span>
              ))}
            </div>

            {/* Operator and second summand */}
            <div className="flex justify-end items-center gap-3 text-xl sm:text-2xl font-black text-slate-100 pr-1">
              <span className="text-teal-400 text-xl font-black mr-auto">+</span>
              <span className="text-slate-500 text-sm mr-2 self-center font-sans font-normal">
                {addRes.decB}₁₀
              </span>
              {addRes.padB.split('').map((ch, idx) => (
                <span key={idx} className="w-6 text-center">{ch}</span>
              ))}
            </div>

            {/* Horizontal divider line */}
            <div className="border-t-2 border-teal-400 my-2 w-full" />

            {/* Sum result */}
            <div className="flex justify-end gap-3 text-2xl sm:text-3xl font-black text-emerald-400 pr-1">
              <span className="text-emerald-500 text-sm mr-2 self-center font-sans font-normal">
                = {addRes.decSum}₁₀
              </span>
              {addRes.sumStr.padStart(addRes.padA.length, ' ').split('').map((ch, idx) => (
                <span key={idx} className="w-6 text-center">{ch}</span>
              ))}
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-400 text-center">
            {numAStr === '11011' && numBStr === '11010' ? (
              <span className="text-amber-300 font-bold">
                {bilingualMode === 'en'
                  ? '✓ 100% matches Figure 4.2 Textbook Page 22: 11011₂ (27) + 11010₂ (26) = 110101₂ (53).'
                  : '✓ Khớp 100% ví dụ Hình 4.2 SGK Trang 22: 11011₂ (27) + 11010₂ (26) = 110101₂ (53).'}
              </span>
            ) : (
              <span>
                {bilingualMode === 'en'
                  ? <>Binary result: <strong>{addRes.sumStr}₂</strong> = {addRes.decSum} in decimal.</>
                  : <>Kết quả nhị phân: <strong>{addRes.sumStr}₂</strong> = {addRes.decSum} trong hệ thập phân.</>}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation Next Step */}
      <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-teal-950 dark:text-teal-300 font-medium">
          {bilingualMode === 'en' ? (
            <>Next Step: <strong>Section 2c &amp; 3-Stage Computing Pipeline (Figures 4.3 &amp; 4.4, Pages 22 – 23 SGK)</strong></>
          ) : (
            <>Bước tiếp theo: <strong>Mục 2c &amp; Quy trình 3 bước tính toán của máy tính (Hình 4.3 &amp; 4.4, Trang 22 – 23 SGK)</strong></>
          )}
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Explore Multiplication & Pipeline' : 'Khám phá phép nhân & Quy trình máy tính'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
