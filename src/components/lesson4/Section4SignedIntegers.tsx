import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  CheckCircle2,
  Binary,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Info,
  Sparkles,
  Eye,
  RefreshCw,
  Plus
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section4SignedIntegers: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Selected signed integer (-127 to +127)
  const [selectedNum, setSelectedNum] = useState<number>(-19);
  const [customInput, setCustomInput] = useState<string>('-19');

  const speechText =
    "Section 1c: Integer Representation in Computers. Fixed-point representation is used for integers, with the radix point implicitly fixed at the far right. Unsigned integers use all bits for magnitude: 1 byte represents 0 to 255; 2 bytes represent 0 to 65535. Signed integers reserve the leftmost bit as the sign bit: 0 for positive (+), 1 for negative (-). Three signed representation formats: First, Sign-Magnitude preserves magnitude bits with a sign bit. For example, +19 is 00010011, and -19 is 10010011. Second, One's Complement inverts all magnitude bits of the positive number; -19 becomes 11101100. Third, Two's Complement equals One's Complement plus 1; -19 becomes 11101101. Modern computers predominantly use Two's Complement because it enables the ALU adder circuit to execute subtraction directly as addition.";

  // Calculate 8-bit representations for a signed integer n (-127 to 127)
  const computeRepresentations = (n: number) => {
    const isNeg = n < 0;
    const absVal = Math.min(127, Math.abs(n));

    // 7-bit absolute magnitude in binary
    let magStr = absVal.toString(2).padStart(7, '0');

    // 1. Sign-magnitude (Mã thuận): bit dấu (0 hoặc 1) + 7 bit độ lớn
    const signBit = isNeg ? '1' : '0';
    const signMagnitude = signBit + magStr;

    // 2. Positive 8-bit reference
    const pos8Bit = '0' + magStr;

    // 3. One's complement (Mã bù 1)
    let onesComplement = pos8Bit;
    if (isNeg) {
      onesComplement = pos8Bit
        .split('')
        .map((b) => (b === '0' ? '1' : '0'))
        .join('');
    }

    // 4. Two's complement (Mã bù 2)
    let twosComplement = pos8Bit;
    if (isNeg) {
      // (256 - absVal) in 8-bit binary
      const val = (256 - absVal) & 0xff;
      twosComplement = val.toString(2).padStart(8, '0');
    }

    return {
      isNeg,
      absVal,
      pos8Bit,
      signBit,
      signMagnitude,
      onesComplement,
      twosComplement
    };
  };

  const rep = computeRepresentations(selectedNum);

  const handleApply = (val: number) => {
    if (val >= -127 && val <= 127) {
      setSelectedNum(val);
      setCustomInput(val.toString());
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Section 1c • Page 21 SGK' : 'Mục 1c • Trang 21 SGK'}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(21);
                setShowOriginalModal(true);
              }}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>{bilingualMode === 'en' ? 'View scan Page 21' : 'Xem scan Trang 21'}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? "1c. Integer Representation in Computers: Sign-Mag, 1's & 2's Complement"
              : '1c. Biểu diễn số nguyên trong máy tính: Mã thuận, Mã bù 1 & Mã bù 2'}
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
              : 'bg-violet-600 hover:bg-violet-700 text-white'
          }`}
          title={bilingualMode === 'en' ? 'Listen to English explanation' : 'Nghe phát âm tiếng Anh cho mục 1c'}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isSpeaking ? 'STOP' : 'EN'}</span>
        </button>
      </div>

      {/* Dấu phẩy tĩnh vs Dấu phẩy động & Số nguyên không dấu */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>
            {bilingualMode === 'en'
              ? 'Fixed-Point Representation and Unsigned Integers (Page 21 SGK)'
              : 'Dấu phẩy tĩnh và Số nguyên không dấu (Trang 21 SGK)'}
          </span>
        </h3>

        <BilingualText
          vi="Trong máy tính, người ta phân biệt biểu diễn dưới dạng dấu phẩy tĩnh (fixed-point) và dấu phẩy động (floating-point). Số nguyên được biểu diễn dưới dạng dấu phẩy tĩnh, với dấu phẩy ngầm định ở vị trí tận cùng bên phải. Có hai loại số nguyên: Số nguyên không dấu (toàn bộ các bit biểu diễn độ lớn: 1 byte từ 0 đến 255; 2 byte từ 0 đến 65535) và Số nguyên có dấu."
          en="In computers, a distinction is made between fixed-point and floating-point representations. Integers are represented in fixed-point format, with the radix point implicitly fixed at the far right. There are two categories: Unsigned integers (all bits encode magnitude: 1 byte spans 0 to 255; 2 bytes span 0 to 65535) and Signed integers."
          highlightWords={['dấu phẩy tĩnh', 'dấu phẩy động', 'số nguyên không dấu', 'fixed-point', 'floating-point', 'unsigned integer']}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {bilingualMode === 'en' ? '1 Byte Unsigned (8 bits):' : '1 Byte không dấu (8 bit):'}
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>{bilingualMode === 'en' ? 'Minimum: 00000000₂' : 'Nhỏ nhất: 00000000₂'}</span>
              <strong className="text-emerald-600 dark:text-emerald-400">= 0</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>{bilingualMode === 'en' ? 'Maximum: 11111111₂' : 'Lớn nhất: 11111111₂'}</span>
              <strong className="text-emerald-600 dark:text-emerald-400">= 255 (2⁸ - 1)</strong>
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              {bilingualMode === 'en'
                ? 'Represents a total of 256 values.'
                : 'Tổng cộng biểu diễn được 256 giá trị.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {bilingualMode === 'en' ? '2 Bytes Unsigned (16 bits):' : '2 Byte không dấu (16 bit):'}
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>{bilingualMode === 'en' ? 'Minimum: 16 zero bits' : 'Nhỏ nhất: 16 bit 0'}</span>
              <strong className="text-blue-600 dark:text-blue-400">= 0</strong>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>{bilingualMode === 'en' ? 'Maximum: 16 one bits' : 'Lớn nhất: 16 bit 1'}</span>
              <strong className="text-blue-600 dark:text-blue-400">= 65535 (2¹⁶ - 1)</strong>
            </div>
            <p className="text-[11px] text-slate-500 font-sans">
              {bilingualMode === 'en'
                ? 'Represents a total of 65536 values.'
                : 'Tổng cộng biểu diễn được 65536 giá trị.'}
            </p>
          </div>
        </div>
      </div>

      {/* Số nguyên có dấu: 3 dạng biểu diễn */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-violet-600" />
          <span>
            {bilingualMode === 'en'
              ? "Signed Integers: Sign-Magnitude, One's Complement & Two's Complement (Page 21 SGK)"
              : 'Số nguyên có dấu: Mã thuận, Mã bù 1 và Mã bù 2 (Trang 21 SGK)'}
          </span>
        </h3>

        <BilingualText
          vi="Để biểu diễn số nguyên có dấu, người ta dành bit tận cùng bên trái làm bit dấu: quy ước bit 0 biểu diễn dấu dương (+), bit 1 biểu diễn dấu âm (-). Có 3 cách biểu diễn số nguyên có dấu: Mã thuận (Sign-magnitude), Mã bù 1 (One's complement - Mã đảo), và Mã bù 2 (Two's complement = Mã bù 1 + 1). Trong máy tính hiện nay, người ta dùng mã bù 2 vì giúp bộ số học (ALU) thực hiện phép trừ thông qua phép cộng."
          en="To represent signed integers, the leftmost bit is reserved as the sign bit: 0 represents positive (+), while 1 represents negative (-). There are three common signed representation formats: Sign-magnitude, One's complement (bitwise NOT), and Two's complement (One's complement + 1). Modern computers exclusively use Two's complement because it allows the Arithmetic Logic Unit (ALU) to execute subtraction directly using adder circuits."
          highlightWords={['bit dấu', 'mã thuận', 'mã bù 1', 'mã bù 2', 'sign bit', 'sign-magnitude', "one's complement", "two's complement"]}
        />

        {/* Comparison of the 3 formats for +19 and -19 */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm font-mono border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3">
                  {bilingualMode === 'en' ? 'Representation Format' : 'Dạng biểu diễn (Format)'}
                </th>
                <th className="py-2.5 px-3 text-emerald-700 dark:text-emerald-400 font-bold">
                  {bilingualMode === 'en' ? 'Positive +19' : 'Số dương +19'}
                </th>
                <th className="py-2.5 px-3 text-rose-700 dark:text-rose-400 font-bold">
                  {bilingualMode === 'en' ? 'Negative -19' : 'Số âm -19'}
                </th>
                <th className="py-2.5 px-3">
                  {bilingualMode === 'en' ? 'Establishment Rule' : 'Quy tắc thiết lập'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">
                  {bilingualMode === 'en' ? '1. Sign-magnitude' : '1. Mã thuận (Sign-magnitude)'}
                </td>
                <td className="py-2.5 px-3 text-emerald-600 font-black">
                  <span className="text-violet-600 font-black">0</span>0010011₂
                </td>
                <td className="py-2.5 px-3 text-rose-600 font-black">
                  <span className="text-violet-600 font-black">1</span>0010011₂
                </td>
                <td className="py-2.5 px-3 text-slate-500 font-sans text-xs">
                  {bilingualMode === 'en'
                    ? 'Sign bit (0/1) + 7 magnitude bits unchanged.'
                    : 'Bit dấu (0/1) + 7 bit độ lớn giữ nguyên.'}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">
                  {bilingualMode === 'en' ? "2. One's complement" : "2. Mã bù 1 (One's complement)"}
                </td>
                <td className="py-2.5 px-3 text-emerald-600 font-black">
                  <span className="text-violet-600 font-black">0</span>0010011₂
                </td>
                <td className="py-2.5 px-3 text-rose-600 font-black">
                  <span className="text-violet-600 font-black">1</span>1101100₂
                </td>
                <td className="py-2.5 px-3 text-slate-500 font-sans text-xs">
                  {bilingualMode === 'en'
                    ? 'Positive remains unchanged; negative inverts all magnitude bits.'
                    : 'Số dương giữ nguyên; số âm đảo ngược tất cả các bit.'}
                </td>
              </tr>
              <tr className="bg-violet-50/50 dark:bg-violet-950/20">
                <td className="py-2.5 px-3 font-bold text-violet-800 dark:text-violet-300">
                  {bilingualMode === 'en' ? "3. Two's complement ★" : "3. Mã bù 2 (Two's complement) ★"}
                </td>
                <td className="py-2.5 px-3 text-emerald-600 font-black">
                  <span className="text-violet-600 font-black">0</span>0010011₂
                </td>
                <td className="py-2.5 px-3 text-rose-600 font-black">
                  <span className="text-violet-600 font-black">1</span>1101101₂
                </td>
                <td className="py-2.5 px-3 text-violet-700 dark:text-violet-400 font-sans text-xs font-semibold">
                  {bilingualMode === 'en'
                    ? "One's complement + 1 (Modern computer standard!)."
                    : 'Mã bù 1 cộng thêm 1 (Chuẩn máy tính hiện đại!).'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive 8-bit Signed Integer Generator Sandbox */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600 text-white font-black flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {bilingualMode === 'en'
                  ? 'Interactive Simulator: 8-Bit Signed Integer Representation Generator'
                  : 'Mô phỏng tương tác: Máy phát sinh 3 dạng biểu diễn số nguyên có dấu (8 bit)'}
              </h3>
              <p className="text-xs text-slate-400">
                {bilingualMode === 'en'
                  ? "Enter any signed integer (-127 to +127) to observe bit inversion and two's complement generation!"
                  : 'Nhập bất kỳ số nguyên âm hoặc dương (-127 đến +127) để xem quá trình đảo bit và tạo mã bù 2!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 font-semibold mr-1">
              {bilingualMode === 'en' ? 'Quick Presets:' : 'Mẫu nhanh:'}
            </span>
            {[19, -19, 5, -5, 42, -42, -1].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleApply(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer border ${
                  selectedNum === s
                    ? 'bg-violet-600 text-white border-violet-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {s > 0 ? `+${s}` : s}
              </button>
            ))}
          </div>
        </div>

        {/* Input box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="signedInput" className="text-xs text-slate-300 font-bold whitespace-nowrap">
              {bilingualMode === 'en' ? 'Enter integer (-127 to +127):' : 'Nhập số nguyên (-127 đến +127):'}
            </label>
            <input
              id="signedInput"
              type="number"
              min={-127}
              max={127}
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const val = parseInt(customInput, 10);
                  if (!isNaN(val)) handleApply(val);
                }
              }}
              className="w-24 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-violet-300 font-mono font-bold text-sm outline-none focus:border-violet-500 text-center"
            />
            <button
              type="button"
              onClick={() => {
                const val = parseInt(customInput, 10);
                if (!isNaN(val)) handleApply(val);
              }}
              className="px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              {bilingualMode === 'en' ? 'Generate Code' : 'Sinh mã'}
            </button>
          </div>

          <div className="text-xs font-mono">
            {bilingualMode === 'en' ? 'Analyzing number: ' : 'Đang phân tích số: '}
            <strong className="text-violet-400 text-base">{selectedNum > 0 ? `+${selectedNum}` : selectedNum}</strong>
            {' '}({bilingualMode === 'en' ? 'Magnitude' : 'Độ lớn'}: {rep.absVal})
          </div>
        </div>

        {/* 3 Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          {/* Card 1: Sign-magnitude */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
              <span>{bilingualMode === 'en' ? '1. Sign-magnitude' : '1. Mã thuận'}</span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                {bilingualMode === 'en' ? 'Sign-Mag' : 'Dấu - Lượng'}
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
              <span className="text-violet-400 font-black text-xl tracking-wider">
                {rep.signMagnitude.slice(0, 1)}
              </span>
              <span className="text-slate-200 font-bold text-xl tracking-wider">
                {rep.signMagnitude.slice(1)}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-0.5">
              <div>
                {bilingualMode === 'en' ? 'Sign bit: ' : 'Bit dấu: '}
                <strong className="text-violet-400">{rep.signBit}</strong>
                {' '}({rep.isNeg ? (bilingualMode === 'en' ? 'Negative -' : 'Âm -') : (bilingualMode === 'en' ? 'Positive +' : 'Dương +')})
              </div>
              <div>
                {bilingualMode === 'en' ? '7 magnitude bits: ' : '7 bit độ lớn: '}
                <strong className="text-slate-200">{rep.signMagnitude.slice(1)}</strong> ({rep.absVal})
              </div>
            </div>
          </div>

          {/* Card 2: One's complement */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="text-xs font-bold text-slate-400 flex items-center justify-between">
              <span>{bilingualMode === 'en' ? "2. One's complement" : '2. Mã bù 1'}</span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                {bilingualMode === 'en' ? 'Bitwise NOT' : 'Mã đảo'}
              </span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
              <span className="text-violet-400 font-black text-xl tracking-wider">
                {rep.onesComplement.slice(0, 1)}
              </span>
              <span className="text-slate-200 font-bold text-xl tracking-wider">
                {rep.onesComplement.slice(1)}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-0.5">
              <div>
                {rep.isNeg
                  ? (bilingualMode === 'en' ? 'Invert all 8 bits of positive number:' : 'Đảo toàn bộ 8 bit của số dương:')
                  : (bilingualMode === 'en' ? 'Positive remains unchanged:' : 'Số dương giữ nguyên:')}
              </div>
              <div className="text-slate-300 text-[10px]">
                {rep.pos8Bit} ➔ <strong>{rep.onesComplement}</strong>
              </div>
            </div>
          </div>

          {/* Card 3: Two's complement */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-violet-500/50 space-y-2.5 shadow-lg shadow-violet-500/10">
            <div className="text-xs font-bold text-violet-400 flex items-center justify-between">
              <span>
                {bilingualMode === 'en' ? "3. Two's complement (ALU Standard)" : '3. Mã bù 2 (Chuẩn ALU)'}
              </span>
              <span className="text-[10px] bg-violet-950 border border-violet-700 text-violet-200 px-2 py-0.5 rounded font-black">
                {bilingualMode === 'en' ? 'CPU Storage' : 'CPU lưu trữ'}
              </span>
            </div>
            <div className="p-3 bg-violet-950/40 rounded-xl border border-violet-800 text-center">
              <span className="text-violet-300 font-black text-xl tracking-wider">
                {rep.twosComplement.slice(0, 1)}
              </span>
              <span className="text-emerald-400 font-bold text-xl tracking-wider">
                {rep.twosComplement.slice(1)}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 space-y-0.5">
              <div>
                {rep.isNeg
                  ? (bilingualMode === 'en' ? "One's complement + 1:" : 'Mã bù 1 cộng thêm 1:')
                  : (bilingualMode === 'en' ? 'Positive remains unchanged:' : 'Số dương giữ nguyên:')}
              </div>
              <div className="text-emerald-400 text-[10px] font-bold">
                {rep.isNeg ? `${rep.onesComplement} + 1 = ${rep.twosComplement}₂` : `${rep.twosComplement}₂`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ mục 1 (Trang 21 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700/80 shadow-md space-y-3">
        <div className="flex items-center gap-2.5 text-amber-800 dark:text-amber-300 font-black text-sm sm:text-base uppercase tracking-wider">
          <ShieldCheck className="w-6 h-6 text-amber-600 stroke-[2.5]" />
          <BilingualText
            vi="Ghi nhớ mục 1 (Trang 21 SGK Tin học 10)"
            en="Key Takeaways for Section 1 (Textbook Page 21)"
          />
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
            <div className="flex-1">
              <BilingualText
                vi="Hệ nhị phân chỉ dùng hai chữ số 0 và 1 để biểu diễn số."
                en="The binary numeral system uses only two digits, 0 and 1, to represent all numbers."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
            <div className="flex-1">
              <BilingualText
                vi="Mỗi số nguyên dương đều có thể đổi sang hệ nhị phân bằng cách chia liên tiếp cho 2 và lấy các số dư theo thứ tự ngược lại."
                en="Any positive integer can be converted to binary by successively dividing by 2 and collecting the remainders in reverse order."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
            <div className="flex-1">
              <BilingualText
                vi="Biểu diễn số nguyên trong máy tính dùng dấu phẩy tĩnh, có thể là số nguyên không dấu hoặc số nguyên có dấu (thường dùng mã bù 2)."
                en="Integer representation in computers uses fixed-point formats, either unsigned integers or signed integers (predominantly two's complement)."
              />
            </div>
          </li>
        </ul>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-indigo-900 dark:text-indigo-300 font-medium">
          {bilingualMode === 'en' ? (
            <>Next Step: <strong>Section 2a &amp; 2b. Arithmetic Operations: Addition &amp; Multiplication Tables &amp; Binary Addition (Page 22 SGK)</strong></>
          ) : (
            <>Bước tiếp theo: <strong>Mục 2a &amp; 2b. Các phép tính số học: Bảng cộng/nhân &amp; Phép cộng nhị phân (Trang 22 SGK)</strong></>
          )}
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Explore Binary Arithmetic' : 'Khám phá phép tính số học nhị phân'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
