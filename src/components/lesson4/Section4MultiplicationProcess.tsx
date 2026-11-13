import React, { useState } from 'react';
import {
  Volume2,
  BookOpen,
  CheckCircle2,
  Binary,
  Cpu,
  ArrowRight,
  Sparkles,
  Eye,
  Check,
  RotateCcw,
  ShieldCheck,
  Workflow,
  Monitor
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section4MultiplicationProcess: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Multiplier inputs
  const [multA, setMultA] = useState<string>('1101'); // 13
  const [multB, setMultB] = useState<string>('101'); // 5

  // Pipeline simulation state
  const [pipelineA, setPipelineA] = useState<number>(125);
  const [pipelineB, setPipelineB] = useState<number>(17);
  const [pipelineOp, setPipelineOp] = useState<'+' | '×'>('+');

  // Exercise 2 (Trang 23 SGK)
  const [userAns2A, setUserAns2A] = useState<string>('');
  const [userAns2B, setUserAns2B] = useState<string>('');
  const [showAns2, setShowAns2] = useState<boolean>(false);

  const speechText =
    "Section 2c and the Computer Calculation Pipeline. Figure 4.3 Binary Multiplication: Multiplication in binary mirrors the decimal method. Each partial product is either identical to the first multiplicand when multiplying by 1, or all zeros when multiplying by 0, shifted left and summed. For instance, 1101 times 101 equals 1000001, which corresponds to 13 times 5 equals 65 in decimal. Three-step computing process shown in Figure 4.4: Step 1, Encode decimal input numbers into binary sequences. Step 2, Execute binary arithmetic operations inside the CPU ALU. Step 3, Decode the binary result back into human-readable decimal format on the display monitor.";

  // Compute partial products for multiplication
  const computeMultiplication = (a: string, b: string) => {
    const decA = parseInt(a, 2) || 0;
    const decB = parseInt(b, 2) || 0;
    const decProd = decA * decB;
    const binProd = decProd.toString(2);

    const partials: { bit: string; rowStr: string; shift: number }[] = [];
    const bReversed = b.split('').reverse();

    bReversed.forEach((bit, idx) => {
      const rowVal = bit === '1' ? a : '0'.repeat(a.length);
      partials.push({ bit, rowStr: rowVal, shift: idx });
    });

    return {
      decA,
      decB,
      decProd,
      binProd,
      partials
    };
  };

  const multRes = computeMultiplication(multA, multB);

  // Pipeline computations
  const pBinA = pipelineA.toString(2);
  const pBinB = pipelineB.toString(2);
  const pDecRes = pipelineOp === '+' ? pipelineA + pipelineB : pipelineA * pipelineB;
  const pBinRes = pDecRes.toString(2);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Section 2c & Figure 4.4 • Pages 22 – 23 SGK' : 'Mục 2c & Hình 4.4 • Trang 22 – 23 SGK'}
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
              <span>{bilingualMode === 'en' ? 'View scan pp. 22–23' : 'Xem scan Trang 22–23'}</span>
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
            {bilingualMode === 'en'
              ? '2c. Binary Multiplication (Fig. 4.3) & Computer Calculation Pipeline (Fig. 4.4)'
              : '2c. Phép nhân nhị phân (Hình 4.3) & Quy trình tính toán máy tính (Hình 4.4)'}
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
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
          title={bilingualMode === 'en' ? 'Listen to English explanation' : 'Nghe phát âm tiếng Anh cho mục 2c và quy trình tính toán'}
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isSpeaking ? 'STOP' : 'EN'}</span>
        </button>
      </div>

      {/* c) Phép nhân hai số nhị phân (Hình 4.3 SGK Trang 22) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Binary className="w-5 h-5 text-amber-600" />
            <span>
              {bilingualMode === 'en'
                ? 'c) Binary Multiplication (Figure 4.3 Textbook Page 22)'
                : 'c) Phép nhân hai số nhị phân (Hình 4.3 SGK Trang 22)'}
            </span>
          </h3>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            {bilingualMode === 'en' ? 'Figure 4.3 SGK' : 'Hình 4.3 SGK'}
          </span>
        </div>

        <BilingualText
          vi="Phép nhân hai số nhị phân được thực hiện tương tự như trong hệ thập phân: nhân từng chữ số của thừa số thứ hai với thừa số thứ nhất để được các tích riêng, sau đó cộng dồn các tích riêng lại (mỗi tích riêng lùi 1 vị trí sang trái). Do chỉ nhân với 0 hoặc 1, mỗi tích riêng hoặc bằng chính thừa số thứ nhất hoặc bằng toàn số 0."
          en="Binary multiplication is performed just like in the decimal system: multiply each digit of the second factor by the first factor to obtain partial products, then sum all partial products together (each shifted left by one place). Because digits are only 0 or 1, each partial product is either identical to the multiplicand or all zeros."
          highlightWords={['tích riêng', 'lùi 1 vị trí', 'toàn số 0', 'partial products']}
        />

        {/* Interactive Binary Multiplier Sandbox */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold">
                {bilingualMode === 'en' ? 'Factor 1:' : 'Thừa số 1:'}
              </span>
              <input
                type="text"
                value={multA}
                onChange={(e) => setMultA(e.target.value.replace(/[^01]/g, ''))}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold text-center"
              />
              <span className="text-slate-400 font-mono">(= {multRes.decA}₁₀)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold">
                {bilingualMode === 'en' ? 'Factor 2:' : 'Thừa số 2:'}
              </span>
              <input
                type="text"
                value={multB}
                onChange={(e) => setMultB(e.target.value.replace(/[^01]/g, ''))}
                className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold text-center"
              />
              <span className="text-slate-400 font-mono">(= {multRes.decB}₁₀)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setMultA('1101');
                  setMultB('101');
                }}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold cursor-pointer"
              >
                {bilingualMode === 'en' ? 'SGK Preset (13 × 5 = 65)' : 'Mẫu SGK (13 × 5 = 65)'}
              </button>
            </div>
          </div>

          {/* Multiplication Column Representation */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center font-mono text-sm sm:text-base">
            <div className="w-fit text-right space-y-1">
              {/* Factor A */}
              <div className="text-slate-100 font-black tracking-widest">
                <span className="text-slate-500 text-xs mr-3 font-sans font-normal">
                  {multRes.decA}₁₀
                </span>
                {multA}
              </div>

              {/* Operator and Factor B */}
              <div className="text-slate-100 font-black tracking-widest flex items-center justify-end">
                <span className="text-amber-400 font-black mr-auto text-sm">×</span>
                <span className="text-slate-500 text-xs mr-3 font-sans font-normal">
                  {multRes.decB}₁₀
                </span>
                {multB}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-700 my-1 w-full" />

              {/* Partial Products */}
              {multRes.partials.map((row, idx) => {
                const totalDisplayWidth = multRes.binProd.length + 2;
                const paddedStr = row.rowStr + ' '.repeat(row.shift);
                return (
                  <div key={idx} className="text-slate-300 text-xs sm:text-sm tracking-widest">
                    <span className="text-slate-500 text-[10px] mr-2 font-sans">
                      (× {row.bit})
                    </span>
                    <span className={row.bit === '1' ? 'text-amber-300 font-bold' : 'text-slate-500'}>
                      {paddedStr.padStart(totalDisplayWidth, ' ')}
                    </span>
                  </div>
                );
              })}

              {/* Divider */}
              <div className="border-t-2 border-amber-500 my-1.5 w-full" />

              {/* Final Product */}
              <div className="text-emerald-400 font-black text-lg sm:text-xl tracking-widest">
                <span className="text-emerald-500 text-xs mr-3 font-sans font-normal">
                  = {multRes.decProd}₁₀
                </span>
                {multRes.binProd}
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-400">
              {multA === '1101' && multB === '101' ? (
                <span className="text-amber-300 font-bold">
                  {bilingualMode === 'en'
                    ? '✓ Matches Figure 4.3 Textbook Page 22: 1101₂ × 101₂ = 1000001₂ (13 × 5 = 65).'
                    : '✓ Trùng khớp ví dụ Hình 4.3 SGK Trang 22: 1101₂ × 101₂ = 1000001₂ (13 × 5 = 65).'}
                </span>
              ) : (
                <span>
                  {bilingualMode === 'en'
                    ? <>Binary product: <strong>{multRes.binProd}₂</strong> (Decimal: {multRes.decProd}₁₀)</>
                    : <>Tích nhị phân: <strong>{multRes.binProd}₂</strong> (Thập phân: {multRes.decProd}₁₀)</>}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hộp Ghi nhớ mục 2 (Trang 23 SGK) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-black text-sm uppercase">
          <ShieldCheck className="w-5 h-5 text-amber-600 stroke-[2.5]" />
          <BilingualText
            vi="Ghi nhớ mục 2 (Trang 23 SGK Tin học 10)"
            en="Key Takeaways for Section 2 (Textbook Page 23)"
          />
        </div>
        <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
          <BilingualText
            vi="Phép cộng và nhân trong hệ nhị phân được thực hiện tương tự như trong hệ thập phân nhưng đơn giản hơn vì chỉ có hai chữ số 0 và 1."
            en="Addition and multiplication in the binary system are performed analogously to decimal arithmetic, yet are simpler because there are only two digits, 0 and 1."
          />
        </div>
      </div>

      {/* Quy trình tính toán của máy tính (Hình 4.4 SGK Trang 23) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-indigo-600" />
            <BilingualText
              vi="Quy trình tính toán trong máy tính (Hình 4.4 SGK Trang 23)"
              en="Computing Process in Computers (Figure 4.4 Page 23)"
            />
          </h3>
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
            {bilingualMode === 'en' ? 'Figure 4.4 SGK' : 'Hình 4.4 SGK'}
          </span>
        </div>

        <BilingualText
          vi="Quy trình tính toán số học của máy tính gồm 3 bước tuần hoàn: Bước 1. Mã hoá (chuyển đổi dữ liệu số từ hệ thập phân mà con người hiểu sang hệ nhị phân); Bước 2. Xử lí (bộ số học lôgic ALU của CPU thực hiện phép tính bằng các cổng lôgic nhị phân); Bước 3. Giải mã (chuyển kết quả từ hệ nhị phân trở lại hệ thập phân để hiển thị lên màn hình)."
          en="The computing arithmetic pipeline consists of three sequential phases: Step 1. Encoding (translating decimal numbers into binary); Step 2. Processing (the CPU's Arithmetic Logic Unit ALU executes operations via binary circuits); Step 3. Decoding (converting binary results back into decimal for display on the monitor)."
          highlightWords={['Bước 1: Mã hoá', 'Bước 2: Xử lí', 'Bước 3: Giải mã', 'ALU', 'Encoding', 'Decoding']}
        />

        {/* Interactive 3-Stage Pipeline Simulation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold">
                {bilingualMode === 'en' ? 'Try calculation:' : 'Thử phép tính:'}
              </span>
              <input
                type="number"
                value={pipelineA}
                onChange={(e) => setPipelineA(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-blue-400 font-mono font-bold text-center"
              />
              <select
                value={pipelineOp}
                onChange={(e) => setPipelineOp(e.target.value as '+' | '×')}
                className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-amber-400 font-mono font-bold cursor-pointer"
              >
                <option value="+">+</option>
                <option value="×">×</option>
              </select>
              <input
                type="number"
                value={pipelineB}
                onChange={(e) => setPipelineB(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-16 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-blue-400 font-mono font-bold text-center"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setPipelineA(125);
                  setPipelineB(17);
                  setPipelineOp('+');
                }}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Practice 1a: 125 + 17' : 'Luyện tập 1a: 125 + 17'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPipelineA(15);
                  setPipelineB(6);
                  setPipelineOp('×');
                }}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Practice 2a: 15 × 6' : 'Luyện tập 2a: 15 × 6'}
              </button>
            </div>
          </div>

          {/* 3 Pipeline Stages Grid (Hình 4.4 Replication) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Stage 1 */}
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/60 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-black">
                  1
                </span>
                <span>{bilingualMode === 'en' ? 'DATA ENCODING' : 'MÃ HOÁ DỮ LIỆU'}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-blue-900/60 font-mono text-xs space-y-1">
                <div className="text-slate-400">{bilingualMode === 'en' ? 'Decimal inputs:' : 'Đầu vào thập phân:'}</div>
                <div className="text-white font-bold">
                  {pipelineA} {bilingualMode === 'en' ? 'and' : 'và'} {pipelineB}
                </div>
                <div className="text-blue-300 text-[11px] pt-1">
                  ➔ {pipelineA}₁₀ = {pBinA}₂
                </div>
                <div className="text-blue-300 text-[11px]">
                  ➔ {pipelineB}₁₀ = {pBinB}₂
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                {bilingualMode === 'en'
                  ? 'Keyboard provides inputs; system software encodes decimals into binary.'
                  : 'Bàn phím đưa dữ liệu vào, phần mềm chuyển đổi số sang nhị phân.'}
              </p>
            </div>

            {/* Stage 2 */}
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                <span className="w-5 h-5 rounded-full bg-amber-600 text-slate-950 flex items-center justify-center text-[11px] font-black">
                  2
                </span>
                <span>{bilingualMode === 'en' ? 'ALU COMPUTATION' : 'TÍNH TOÁN TRONG ALU'}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-amber-900/60 font-mono text-xs space-y-1">
                <div className="text-slate-400">{bilingualMode === 'en' ? 'Execute binary calculation:' : 'Thực hiện phép tính nhị phân:'}</div>
                <div className="text-amber-300 font-bold break-all">
                  {pBinA}₂ {pipelineOp} {pBinB}₂
                </div>
                <div className="text-emerald-400 text-[11px] font-black pt-1 break-all">
                  = {pBinRes}₂
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                {bilingualMode === 'en'
                  ? 'Arithmetic logic circuits (ALU) in the microprocessor execute binary operations.'
                  : 'Mạch cộng số học (ALU) trong vi xử lý thực hiện phép tính tức thời.'}
              </p>
            </div>

            {/* Stage 3 */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-slate-950 flex items-center justify-center text-[11px] font-black">
                  3
                </span>
                <span>{bilingualMode === 'en' ? 'RESULT DECODING' : 'GIẢI MÃ KẾT QUẢ'}</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-emerald-900/60 font-mono text-xs space-y-1">
                <div className="text-slate-400">{bilingualMode === 'en' ? 'Output binary sequence:' : 'Dãy nhị phân đầu ra:'}</div>
                <div className="text-slate-300 break-all">{pBinRes}₂</div>
                <div className="text-emerald-400 font-black text-sm pt-1">
                  ➔ {bilingualMode === 'en' ? 'Display: ' : 'Hiển thị: '}{pDecRes}₁₀
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                {bilingualMode === 'en'
                  ? 'Decode back into decimal and display on monitor for the user.'
                  : 'Giải mã ngược lại thành số thập phân và xuất ra màn hình cho người dùng.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Câu hỏi củng cố cuối mục 2 (Trang 23 SGK) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-black">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base sm:text-lg">
              {bilingualMode === 'en'
                ? 'Review Questions for Section 2 (Textbook Page 23)'
                : 'Câu hỏi củng cố cuối mục 2 (Trang 23 SGK)'}
            </h3>
          </div>
          <span className="text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
            {bilingualMode === 'en' ? 'Page 23 SGK' : 'Trang 23 SGK'}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
          {bilingualMode === 'en'
            ? 'Perform the following arithmetic operations in binary:'
            : 'Thực hiện các phép tính sau trong hệ nhị phân:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Câu a */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              a) 101101₂ + 11001₂ = ?
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {bilingualMode === 'en' ? '(Decimal: 45 + 25 = 70)' : '(Thập phân: 45 + 25 = 70)'}
            </div>
            <input
              type="text"
              placeholder={bilingualMode === 'en' ? 'Enter binary result...' : 'Nhập kết quả nhị phân...'}
              value={userAns2A}
              onChange={(e) => setUserAns2A(e.target.value.trim())}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono"
            />
            {showAns2 && (
              <div className="text-xs font-mono font-bold pt-1">
                {userAns2A === '1000110' ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> <BilingualText vi="Đúng: 1000110₂" en="Correct: 1000110₂" />
                  </span>
                ) : (
                  <span className="text-rose-600">
                    <BilingualText vi="Đáp án: 1000110₂ (= 70₁₀)" en="Answer: 1000110₂ (= 70₁₀)" />
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Câu b */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              b) 100111₂ × 1011₂ = ?
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {bilingualMode === 'en' ? '(Decimal: 39 × 11 = 429)' : '(Thập phân: 39 × 11 = 429)'}
            </div>
            <input
              type="text"
              placeholder={bilingualMode === 'en' ? 'Enter binary result...' : 'Nhập kết quả nhị phân...'}
              value={userAns2B}
              onChange={(e) => setUserAns2B(e.target.value.trim())}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-mono"
            />
            {showAns2 && (
              <div className="text-xs font-mono font-bold pt-1">
                {userAns2B === '110101101' ? (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> <BilingualText vi="Đúng: 110101101₂" en="Correct: 110101101₂" />
                  </span>
                ) : (
                  <span className="text-rose-600">
                    <BilingualText vi="Đáp án: 110101101₂ (= 429₁₀)" en="Answer: 110101101₂ (= 429₁₀)" />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowAns2((v) => !v)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition-colors cursor-pointer"
          >
            {showAns2
              ? (bilingualMode === 'en' ? 'Hide Review Answers' : 'Ẩn đáp án câu hỏi củng cố')
              : (bilingualMode === 'en' ? 'Check Section 2 Answers' : 'Kiểm tra đáp án củng cố mục 2')}
          </button>
        </div>
      </div>

      {/* Footer Navigation Next Step */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-amber-950 dark:text-amber-300 font-medium">
          {bilingualMode === 'en' ? (
            <>Next Step: <strong>Practice &amp; Application, 10-Question Mastery Quiz &amp; Certificate (Page 23 SGK)</strong></>
          ) : (
            <>Bước tiếp theo: <strong>Luyện tập &amp; Vận dụng, Trắc nghiệm 10 câu &amp; Nhận Chứng nhận hoàn thành (Trang 23 SGK)</strong></>
          )}
        </div>
        <button
          type="button"
          onClick={nextPage}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <span>{bilingualMode === 'en' ? 'Go to Practice & Application' : 'Đến Luyện tập & Vận dụng'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
