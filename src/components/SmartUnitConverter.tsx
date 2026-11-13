import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, Check, Sparkles, HelpCircle } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SECTION_2 } from '../data/lessonData';
import confetti from 'canvas-confetti';

export const SmartUnitConverter: React.FC = () => {
  const { bilingualMode } = useBook();
  const [inputValue, setInputValue] = useState<number>(3);
  const [fromUnit, setFromUnit] = useState<string>('MB');
  const [targetUnit, setTargetUnit] = useState<string>('KB');

  // Exercise quiz check states
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({
    '3mb': '',
    '2gb': '',
    '2048b': ''
  });
  const [evalResults, setEvalResults] = useState<{ [key: string]: boolean | null }>({
    '3mb': null,
    '2gb': null,
    '2048b': null
  });

  const unitFactorsInBytes: Record<string, number> = {
    bit: 0.125,
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
    PB: 1024 ** 5
  };

  const calculateConversion = () => {
    if (isNaN(inputValue) || inputValue < 0) return 0;
    const valueInBytes = inputValue * (unitFactorsInBytes[fromUnit] || 1);
    const result = valueInBytes / (unitFactorsInBytes[targetUnit] || 1);
    return result;
  };

  const getStepExplanation = () => {
    const fromFactor = unitFactorsInBytes[fromUnit];
    const toFactor = unitFactorsInBytes[targetUnit];
    const ratio = fromFactor / toFactor;

    if (ratio === 1) return `${inputValue} ${fromUnit} = ${inputValue} ${targetUnit}`;
    if (ratio > 1) {
      return `${inputValue} ${fromUnit} = ${inputValue} × ${ratio.toLocaleString()} = ${(
        inputValue * ratio
      ).toLocaleString()} ${targetUnit}`;
    }
    return `${inputValue} ${fromUnit} = ${inputValue} ÷ ${(1 / ratio).toLocaleString()} = ${(
      inputValue / (1 / ratio)
    ).toLocaleString()} ${targetUnit}`;
  };

  const handleApplyPreset = (val: number, from: string, to: string) => {
    setInputValue(val);
    setFromUnit(from);
    setTargetUnit(to);
  };

  const checkAnswer = (key: '3mb' | '2gb' | '2048b', expected: number) => {
    const val = parseFloat(userAnswers[key]);
    const isCorrect = val === expected;
    setEvalResults((prev) => ({ ...prev, [key]: isCorrect }));
    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs my-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/50">
            <Calculator className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            {bilingualMode === 'en' ? (
              <span>Smart Storage Unit Converter</span>
            ) : (
              <>
                <span>Công cụ Quy đổi Đơn vị Thông minh</span>
                <span className="text-slate-400">|</span>
                <span className="italic font-normal">Smart Storage Unit Converter</span>
              </>
            )}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
            {bilingualMode === 'en'
              ? 'Data Capacity Conversion & Table 1.1 Lookup'
              : 'Quy đổi Lượng tin & Tra cứu Bảng 1.1 SGK'}
          </h3>
        </div>

        {/* Preset quick buttons from SGK Page 8 */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium mr-1">
            {bilingualMode === 'en' ? 'SGK Practice:' : 'Bài tập SGK:'}
          </span>
          <button
            type="button"
            onClick={() => handleApplyPreset(3, 'MB', 'KB')}
            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 font-mono transition-colors border border-slate-200 dark:border-slate-700"
          >
            3 MB → KB
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset(2, 'GB', 'KB')}
            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 font-mono transition-colors border border-slate-200 dark:border-slate-700"
          >
            2 GB → KB
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset(2048, 'B', 'KB')}
            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 font-mono transition-colors border border-slate-200 dark:border-slate-700"
          >
            2048 B → KB
          </button>
        </div>
      </div>

      {/* Converter Interactive Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
        <div className="md:col-span-5 flex items-center gap-2">
          <div className="flex-1">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              {bilingualMode === 'en' ? 'Input Value' : 'Giá trị cần đổi'}
            </label>
            <input
              type="number"
              min="0"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-base font-bold text-slate-800 dark:text-slate-100 focus:outline-emerald-500"
            />
          </div>
          <div className="w-28">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              {bilingualMode === 'en' ? 'From Unit' : 'Từ đơn vị'}
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100"
            >
              <option value="bit">bit</option>
              <option value="B">Byte (B)</option>
              <option value="KB">Kilobyte (KB)</option>
              <option value="MB">Megabyte (MB)</option>
              <option value="GB">Gigabyte (GB)</option>
              <option value="TB">Terabyte (TB)</option>
              <option value="PB">Petabyte (PB)</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="button"
            onClick={() => {
              const temp = fromUnit;
              setFromUnit(targetUnit);
              setTargetUnit(temp);
            }}
            className="p-2 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors shadow-xs"
            title="Đảo chiều đổi đơn vị"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="md:col-span-5 flex items-center gap-2">
          <div className="w-28">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              {bilingualMode === 'en' ? 'Target Unit' : 'Sang đơn vị'}
            </label>
            <select
              value={targetUnit}
              onChange={(e) => setTargetUnit(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100"
            >
              <option value="bit">bit</option>
              <option value="B">Byte (B)</option>
              <option value="KB">Kilobyte (KB)</option>
              <option value="MB">Megabyte (MB)</option>
              <option value="GB">Gigabyte (GB)</option>
              <option value="TB">Terabyte (TB)</option>
              <option value="PB">Petabyte (PB)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">
              {bilingualMode === 'en' ? 'Computed Result' : 'Kết quả tính được'}
            </label>
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg px-3 py-2 text-base font-extrabold text-emerald-700 dark:text-emerald-300 font-mono truncate">
              {calculateConversion().toLocaleString(undefined, { maximumFractionDigits: 4 })}{' '}
              <span className="text-xs font-semibold">{targetUnit}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step by step formula calculation */}
      <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-3 mb-6 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">
            {bilingualMode === 'en' ? 'Step-by-Step Mathematical Explanation: ' : 'Cách tính chi tiết theo SGK: '}
          </span>
          <span className="font-mono">{getStepExplanation()}</span>
          <p className="mt-0.5 text-slate-600 dark:text-slate-400">
            {bilingualMode === 'en'
              ? 'Note: Each adjacent unit differs by exactly 2¹⁰ = 1,024 times (binary standard).'
              : 'Quy tắc: Các đơn vị đo dữ liệu liền kề nhau trong tin học hơn kém nhau 2¹⁰ = 1024 lần.'}
          </p>
        </div>
      </div>

      {/* Bảng 1.1 Full Table with bilingual headers */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
            <tr>
              <th className="px-3 py-2.5">
                {bilingualMode === 'en' ? 'Unit Name' : 'Tên đơn vị'}
              </th>
              <th className="px-3 py-2.5">
                {bilingualMode === 'en' ? 'Symbol' : 'Kí hiệu'}
              </th>
              <th className="px-3 py-2.5">
                {bilingualMode === 'en' ? 'Capacity Value' : 'Lượng dữ liệu (SGK)'}
              </th>
              <th className="px-3 py-2.5">
                {bilingualMode === 'en' ? 'Power of 2' : 'Lũy thừa 2'}
              </th>
              <th className="px-3 py-2.5">
                {bilingualMode === 'en' ? 'Equivalence in Bytes' : 'Quy đổi ra Bytes'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {SECTION_2.unitsTable.map((row) => (
              <tr
                key={row.symbol}
                className={`hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 transition-colors ${
                  fromUnit === row.symbol || targetUnit === row.symbol
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 font-semibold'
                    : ''
                }`}
              >
                <td className="px-3 py-2 font-medium">
                  {bilingualMode === 'en' ? row.nameEn : row.nameVi}
                </td>
                <td className="px-3 py-2 font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                  {row.symbol}
                </td>
                <td className="px-3 py-2">
                  {bilingualMode === 'en' ? row.valueEn : row.valueVi}
                </td>
                <td className="px-3 py-2 font-mono text-slate-500">
                  {row.powerOfTwo}
                </td>
                <td className="px-3 py-2 font-mono text-slate-600 dark:text-slate-400">
                  {row.exactBytes.toLocaleString()} B
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Quick Exercise 2 Check (Page 8) */}
      <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>
            {bilingualMode === 'en'
              ? 'Self-Assessment: Try Exercise 2 (Page 8)'
              : 'Tự đánh giá: Thử sức làm Câu hỏi 2 (Trang 8 SGK)'}
          </span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* a) 3 MB */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="font-semibold text-xs text-slate-700 dark:text-slate-200 mb-1">
              a) 3 MB = ? KB
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder={bilingualMode === 'en' ? 'Enter number...' : 'Nhập số...'}
                value={userAnswers['3mb']}
                onChange={(e) => setUserAnswers({ ...userAnswers, '3mb': e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => checkAnswer('3mb', 3072)}
                className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700 cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Check' : 'Kiểm tra'}
              </button>
            </div>
            {evalResults['3mb'] === true && (
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                {bilingualMode === 'en' ? '✓ Correct: 3 × 1,024 = 3,072 KB' : '✓ Đúng: 3 × 1024 = 3 072 KB'}
              </div>
            )}
            {evalResults['3mb'] === false && (
              <div className="text-[11px] text-rose-500 font-semibold mt-1">
                {bilingualMode === 'en' ? '✗ Incorrect (Hint: Multiply 3 by 1,024)' : '✗ Chưa đúng (Gợi ý: Lấy 3 nhân với 1024)'}
              </div>
            )}
          </div>

          {/* b) 2 GB */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="font-semibold text-xs text-slate-700 dark:text-slate-200 mb-1">
              b) 2 GB = ? KB
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder={bilingualMode === 'en' ? 'Enter number...' : 'Nhập số...'}
                value={userAnswers['2gb']}
                onChange={(e) => setUserAnswers({ ...userAnswers, '2gb': e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => checkAnswer('2gb', 2097152)}
                className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700 cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Check' : 'Kiểm tra'}
              </button>
            </div>
            {evalResults['2gb'] === true && (
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                {bilingualMode === 'en' ? '✓ Correct: 2 × 1,024 × 1,024 = 2,097,152 KB' : '✓ Đúng: 2 × 1024 × 1024 = 2 097 152 KB'}
              </div>
            )}
            {evalResults['2gb'] === false && (
              <div className="text-[11px] text-rose-500 font-semibold mt-1">
                {bilingualMode === 'en' ? '✗ Incorrect (Hint: 2 × 1,024 × 1,024)' : '✗ Chưa đúng (Gợi ý: 2 × 1024 × 1024)'}
              </div>
            )}
          </div>

          {/* c) 2048 B */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="font-semibold text-xs text-slate-700 dark:text-slate-200 mb-1">
              c) 2048 B = ? KB
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder={bilingualMode === 'en' ? 'Enter number...' : 'Nhập số...'}
                value={userAnswers['2048b']}
                onChange={(e) => setUserAnswers({ ...userAnswers, '2048b': e.target.value })}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs font-mono"
              />
              <button
                type="button"
                onClick={() => checkAnswer('2048b', 2)}
                className="px-2.5 py-1 bg-emerald-600 text-white rounded text-xs font-medium hover:bg-emerald-700 cursor-pointer"
              >
                {bilingualMode === 'en' ? 'Check' : 'Kiểm tra'}
              </button>
            </div>
            {evalResults['2048b'] === true && (
              <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                {bilingualMode === 'en' ? '✓ Correct: 2,048 ÷ 1,024 = 2 KB' : '✓ Đúng: 2048 ÷ 1024 = 2 KB'}
              </div>
            )}
            {evalResults['2048b'] === false && (
              <div className="text-[11px] text-rose-500 font-semibold mt-1">
                {bilingualMode === 'en' ? '✗ Incorrect (Hint: Divide 2,048 by 1,024)' : '✗ Chưa đúng (Gợi ý: Lấy 2048 chia cho 1024)'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
