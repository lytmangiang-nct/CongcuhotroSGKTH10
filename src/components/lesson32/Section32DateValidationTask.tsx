import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Code2, 
  Play, 
  RotateCcw, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';

interface DateTestResult {
  day: number;
  month: number;
  year: number;
  isLeap: boolean;
  maxDays: number;
  isValid: boolean;
  reasonVi: string;
  reasonEn: string;
}

export const Section32DateValidationTask: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  const [dateInput, setDateInput] = useState<string>('29-02-2024');

  const PRESET_DATES = [
    { label: '29-02-2024 (Năm nhuận)', value: '29-02-2024' },
    { label: '29-02-2023 (Năm thường)', value: '29-02-2023' },
    { label: '31-04-2023 (Tháng 4 có 30 ngày)', value: '31-04-2023' },
    { label: '29-02-2000 (Chia hết 400)', value: '29-02-2000' },
    { label: '29-02-2100 (Chia hết 100, không chia hết 400)', value: '29-02-2100' },
    { label: '08-02-2021 (Mẫu SGK)', value: '08-02-2021' },
    { label: '32-01-2022 (Vượt ngày)', value: '32-01-2022' },
  ];

  // Helper validation matching date.py logic
  const evaluateDate = (str: string): DateTestResult => {
    const parts = str.trim().split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return {
        day: 0,
        month: 0,
        year: 0,
        isLeap: false,
        maxDays: 0,
        isValid: false,
        reasonVi: 'Khuôn dạng không đúng. Vui lòng nhập định dạng ngày - tháng - năm (ví dụ 08-02-2021).',
        reasonEn: 'Invalid format. Please enter as day - month - year (e.g. 08-02-2021).',
      };
    }

    const thang = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeap = (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
    if (isLeap) {
      thang[1] = 29;
    }

    if (year <= 0) {
      return {
        day, month, year, isLeap, maxDays: 0, isValid: false,
        reasonVi: `Năm ${year} không hợp lệ (năm phải là số nguyên dương > 0).`,
        reasonEn: `Year ${year} is invalid (year must be a positive integer > 0).`,
      };
    }

    if (month < 1 || month > 12) {
      return {
        day, month, year, isLeap, maxDays: 0, isValid: false,
        reasonVi: `Tháng ${month} không hợp lệ (tháng phải từ 1 đến 12).`,
        reasonEn: `Month ${month} is invalid (month must be between 1 and 12).`,
      };
    }

    const maxDays = thang[month - 1];
    if (day < 1 || day > maxDays) {
      return {
        day, month, year, isLeap, maxDays, isValid: false,
        reasonVi: `Tháng ${month} năm ${year} (${isLeap ? 'năm nhuận' : 'năm thường'}) chỉ có tối đa ${maxDays} ngày, không có ngày ${day}.`,
        reasonEn: `Month ${month} of year ${year} (${isLeap ? 'leap year' : 'common year'}) has at most ${maxDays} days, cannot have day ${day}.`,
      };
    }

    return {
      day, month, year, isLeap, maxDays, isValid: true,
      reasonVi: `Bộ dữ liệu ${day}-${month}-${year} hoàn toàn hợp lệ (Tháng ${month} năm ${year} có ${maxDays} ngày).`,
      reasonEn: `Dataset ${day}-${month}-${year} is completely valid (Month ${month} of ${year} has ${maxDays} days).`,
    };
  };

  const result = evaluateDate(dateInput);

  return (
    <div className="space-y-10">
      {/* SECTION HEADER */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900/80 to-teal-950/60 border border-blue-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-mono uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            {isVi ? 'Nhiệm vụ 3 – SGK Trang 154-155' : 'Task 3 – Textbook Pages 154-155'}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {isVi
              ? 'Kiểm tra tính hợp lệ của ba tham số ngày, tháng, năm'
              : 'Calendar Date Validation Algorithm (date.py)'}
          </h2>
          <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed max-w-3xl">
            {isVi
              ? 'Xây dựng thuật toán date.py thẩm định tính hợp lệ của lịch thiên văn: kiểm tra năm nhuận cập nhật tháng 2 có 29 ngày, kiểm soát ngày hợp lệ trong khoảng 1 <= day <= thang[month-1].'
              : 'Develop date.py to validate Gregorian dates: dynamically update February to 29 days in leap years, checking 1 <= day <= thang[month-1] across all twelve months.'}
          </p>
        </div>
      </div>

      {/* CODE DATE.PY */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs font-mono">
          <span className="text-teal-400 font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <span>date.py (SGK Trang 155)</span>
          </span>
          <span className="text-slate-400">Thuật toán kiểm tra lịch chuẩn</span>
        </div>

        <pre className="font-mono text-xs md:text-sm text-slate-300 leading-relaxed overflow-x-auto">
{`thang = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

def nhuan(year):
    return year%400 == 0 or (year%4 == 0 and year%100 != 0)

date = input("Nhập thời gian theo dạng ngày - tháng - năm: ")
tg = date.split("-")
day, month, year = int(tg[0]), int(tg[1]), int(tg[2])

if nhuan(year):
    thang[1] = 29
else:
    thang[1] = 28

if year > 0 and 1 <= month <= 12 and 1 <= day <= thang[month-1]:
    print(day, "-", month, "-", year, "là hợp lệ")
else:
    print("Bộ dữ liệu đã nhập không hợp lệ")`}
        </pre>
      </div>

      {/* INTERACTIVE DATE VALIDATOR BENCH */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-teal-500/40 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
              <Clock className="w-3.5 h-3.5" />
              {isVi ? 'Trình thẩm định ngày tháng trực quan' : 'Interactive Date Inspector'}
            </div>
            <h3 className="text-xl font-bold text-white">
              {isVi ? 'Kiểm thử các kịch bản ngày tháng biên & Năm nhuận' : 'Test Edge Case Calendar Dates & Leap Years'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isVi
                ? 'Chọn các kịch bản mẫu hoặc nhập ngày bất kỳ theo dạng dd-mm-yyyy để thẩm định.'
                : 'Select preset test cases or enter custom dates in dd-mm-yyyy format to validate.'}
            </p>
          </div>
        </div>

        {/* PRESET CHIPS */}
        <div className="flex flex-wrap gap-2">
          {PRESET_DATES.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setDateInput(preset.value)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                dateInput === preset.value
                  ? 'bg-teal-500 text-slate-950 font-bold border-teal-400 shadow-md shadow-teal-500/20'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* INPUT BOX */}
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center gap-4">
          <label className="text-xs font-mono text-slate-400 whitespace-nowrap">
            {isVi ? 'Nhập chuỗi ngày tháng (dạng dd-mm-yyyy):' : 'Input Date String (dd-mm-yyyy):'}
          </label>
          <input
            type="text"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-48 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
            placeholder="08-02-2021"
          />
        </div>

        {/* EVALUATION RESULT CARD */}
        <div
          className={`p-5 rounded-xl border ${
            result.isValid
              ? 'bg-emerald-950/30 border-emerald-500/40'
              : 'bg-rose-950/30 border-rose-500/40'
          }`}
        >
          <div className="flex items-start gap-4">
            {result.isValid ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className={`font-mono font-bold text-sm uppercase ${
                    result.isValid ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  {result.isValid
                    ? isVi ? 'KẾT QUẢ: HỢP LỆ' : 'RESULT: VALID'
                    : isVi ? 'KẾT QUẢ: KHÔNG HỢP LỆ' : 'RESULT: INVALID'}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {result.year > 0 && (
                    <span>
                      {result.isLeap ? (
                        <span className="text-teal-400 font-bold">Năm nhuận (Tháng 2 = 29 ngày)</span>
                      ) : (
                        <span className="text-slate-400">Năm thường (Tháng 2 = 28 ngày)</span>
                      )}
                    </span>
                  )}
                </span>
              </div>

              <p className="text-xs md:text-sm text-slate-200 font-sans leading-relaxed">
                {isVi ? result.reasonVi : result.reasonEn}
              </p>

              {result.month >= 1 && result.month <= 12 && (
                <div className="pt-2 text-xs font-mono text-slate-400 flex flex-wrap gap-4">
                  <span>day = {result.day}</span>
                  <span>month = {result.month}</span>
                  <span>year = {result.year}</span>
                  <span>thang[{result.month}-1] = {result.maxDays}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
