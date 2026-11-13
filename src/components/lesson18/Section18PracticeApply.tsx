import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Clock,
  Triangle,
  Play,
  Award,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

interface Section18PracticeApplyProps {
  onOpenQuiz?: () => void;
  onOpenCert?: () => void;
}

export const Section18PracticeApply: React.FC<Section18PracticeApplyProps> = ({
  onOpenQuiz,
  onOpenCert
}) => {
  const { bilingualMode } = useBook();

  // Luyện tập 1 State: Lệnh nào báo lỗi?
  const [selectedPractice1, setSelectedPractice1] = useState<{ [key: string]: boolean }>({
    a: false,
    b: false,
    c: false
  });
  const [checkedPractice1, setCheckedPractice1] = useState(false);

  // Luyện tập 2 State: Xem giải thích
  const [showPractice2Expl, setShowPractice2Expl] = useState(false);

  // Vận dụng 1 State: Đổi số giây sang Ngày, Giờ, Phút, Giây
  const [inputSeconds, setInputSeconds] = useState<string>('100000');
  const [timeResult, setTimeResult] = useState<{
    days: number;
    hours: number;
    mins: number;
    secs: number;
  } | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);

  // Vận dụng 2 State: Tam giác Heron
  const [sideA, setSideA] = useState<string>('3');
  const [sideB, setSideB] = useState<string>('4');
  const [sideC, setSideC] = useState<string>('5');
  const [triangleResult, setTriangleResult] = useState<{
    valid: boolean;
    perimeter?: number;
    p?: number;
    area?: number;
    errorMsg?: string;
  } | null>(null);

  // Handle Time Calculation (Vận dụng 1)
  const handleCalcTime = () => {
    const ssNum = parseInt(inputSeconds, 10);
    if (isNaN(ssNum) || ssNum < 0) {
      setTimeError(
        bilingualMode === 'en'
          ? 'Please enter a valid positive integer of seconds!'
          : 'Vui lòng nhập số giây nguyên dương hợp lệ!'
      );
      setTimeResult(null);
      return;
    }
    setTimeError(null);
    let ss = ssNum;
    const days = Math.floor(ss / 86400);
    ss = ss % 86400;
    const hours = Math.floor(ss / 3600);
    ss = ss % 3600;
    const mins = Math.floor(ss / 60);
    const secs = ss % 60;
    setTimeResult({ days, hours, mins, secs });
  };

  // Handle Heron Calculation (Vận dụng 2)
  const handleCalcHeron = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      setTriangleResult({
        valid: false,
        errorMsg: bilingualMode === 'en'
          ? 'Side lengths must be positive numbers (a, b, c > 0)!'
          : 'Độ dài các cạnh phải là số thực dương (a, b, c > 0)!'
      });
      return;
    }

    if (a + b <= c || b + c <= a || c + a <= b) {
      setTriangleResult({
        valid: false,
        errorMsg: bilingualMode === 'en'
          ? 'Triangle inequality violated! Sum of any two sides must exceed the third (a + b > c, b + c > a, c + a > b).'
          : 'Không thoả mãn bất đẳng thức tam giác! Tổng hai cạnh bất kỳ phải lớn hơn cạnh còn lại (a + b > c, b + c > a, c + a > b).'
      });
      return;
    }

    const perimeter = a + b + c;
    const p = perimeter / 2;
    const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    setTriangleResult({ valid: true, perimeter, p, area });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-sky-950 p-6 border border-purple-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            <BilingualText
              vi="Luyện tập & Vận dụng • Trang 100 SGK Tin học 10"
              en="Practice & Application • Page 100 Informatics 10"
            />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          <BilingualText
            vi="Luyện tập, Vận dụng & Đánh giá bài học"
            en="Exercises, Application & Evaluation"
          />
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          <BilingualText
            vi="Củng cố kiến thức chẩn đoán lỗi cú pháp ép kiểu, giải quyết 2 bài toán lập trình ứng dụng thực tế: chuyển đổi thời gian chuẩn thiên văn và tính diện tích tam giác theo công thức cổ đại Heron."
            en="Consolidate type casting diagnostic skills and solve 2 practical programming problems: astronomical time unit conversion and Heron's triangle area formula."
          />
        </p>
      </div>

      {/* 2. Phần LUYỆN TẬP (Trang 100 SGK) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="LUYỆN TẬP (SGK Trang 100)"
                en="EXERCISES (Textbook Page 100)"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="Kiểm tra nhận diện câu lệnh hợp lệ và giải thích bản chất ép kiểu"
                en="Inspect valid statements and explain type conversion fundamentals"
              />
            </p>
          </div>
        </div>

        {/* Luyện tập 1: Lệnh nào sau đây sẽ báo lỗi? */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-sky-300">
            <BilingualText
              vi="Câu 1 (Trang 100): Những lệnh nào trong các lệnh sau sẽ báo lỗi? (Chọn các phương án báo lỗi)"
              en="Exercise 1 (Page 100): Which of the following statements will raise an error? (Select error statements)"
            />
          </span>

          <div className="space-y-2">
            {[
              {
                id: 'a',
                code: 'int("12+45")',
                isError: true,
                reasonVi: 'Báo lỗi ValueError vì int() không tính biểu thức toán học trong chuỗi.',
                reasonEn: 'Raises ValueError because int() cannot evaluate arithmetic expressions inside strings.'
              },
              {
                id: 'b',
                code: 'float(123.56)',
                isError: false,
                reasonVi: 'Hợp lệ! Số thực 123.56 đưa qua hàm float() vẫn giữ nguyên là 123.56.',
                reasonEn: 'Valid! Float 123.56 passed to float() remains 123.56.'
              },
              {
                id: 'c',
                code: 'float("123,5.5")',
                isError: true,
                reasonVi: 'Báo lỗi ValueError vì xâu chứa dấu phẩy và 2 dấu chấm không hợp lệ trong số thực Python.',
                reasonEn: 'Raises ValueError because commas and multiple dots are invalid in numeric floats.'
              }
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() =>
                  setSelectedPractice1((prev) => ({ ...prev, [opt.id]: !prev[opt.id] }))
                }
                className={`cursor-pointer p-3 rounded-lg border text-xs transition flex items-center justify-between ${
                  selectedPractice1[opt.id]
                    ? 'bg-sky-950/60 border-sky-500 text-sky-200'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center font-bold text-xs bg-slate-950">
                    {selectedPractice1[opt.id] ? '✓' : ''}
                  </span>
                  <span className="font-mono font-bold text-white">
                    {opt.id}) {opt.code}
                  </span>
                </div>
                {checkedPractice1 && (
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      opt.isError
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {opt.isError
                      ? bilingualMode === 'en'
                        ? 'ERROR RAISED'
                        : 'Lệnh BÁO LỖI'
                      : bilingualMode === 'en'
                        ? 'VALID'
                        : 'Lệnh HỢP LỆ'}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCheckedPractice1(true)}
              className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition cursor-pointer"
            >
              {bilingualMode === 'en' ? 'Check Exercise 1' : 'Kiểm tra câu 1'}
            </button>
            {checkedPractice1 && (
              <span className="text-xs text-emerald-400 font-semibold animate-fadeIn">
                {bilingualMode === 'en'
                  ? '✓ Statements a and c raise ValueError; Statement b executes normally!'
                  : '✓ Lệnh a và c sẽ báo lỗi ValueError; Lệnh b thực thi bình thường!'}
              </span>
            )}
          </div>
        </div>

        {/* Luyện tập 2: Vì sao khi nhập số thực cần viết float(input())? */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-300">
              <BilingualText
                vi="Câu 2 (Trang 100): Vì sao khi nhập một số thực cần viết lệnh float(input())?"
                en="Exercise 2 (Page 100): Why is float(input()) needed when entering floating-point numbers?"
              />
            </span>
            <button
              type="button"
              onClick={() => setShowPractice2Expl(!showPractice2Expl)}
              className="text-xs text-sky-400 hover:underline font-medium cursor-pointer"
            >
              {showPractice2Expl
                ? bilingualMode === 'en'
                  ? 'Hide Explanation'
                  : 'Ẩn lời giải'
                : bilingualMode === 'en'
                  ? 'View Detailed Explanation'
                  : 'Xem giải thích chi tiết'}
            </button>
          </div>

          {showPractice2Expl && (
            <div className="p-3.5 rounded-lg bg-sky-950/40 border border-sky-500/30 text-xs text-slate-200 space-y-2 animate-fadeIn">
              <p>
                <strong>
                  {bilingualMode === 'en' ? 'Textbook Explanation:' : 'Giải thích theo chuẩn SGK:'}
                </strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>
                  <BilingualText
                    vi="Lệnh input() có chức năng nhập dữ liệu từ bàn phím nhưng luôn trả về giá trị là xâu kí tự (str)."
                    en="The input() function reads keyboard input but always returns a character string (str)."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Nếu không dùng lệnh float() để chuyển đổi, giá trị được lưu trữ vẫn là dạng chuỗi văn bản (ví dụ '3.14')."
                    en="Without float() conversion, the stored value remains text (such as '3.14')."
                  />
                </li>
                <li>
                  <BilingualText
                    vi="Khi là xâu kí tự, máy tính không thể thực hiện các phép toán số học (cộng, trừ, nhân, chia, luỹ thừa) mà sẽ báo lỗi TypeError hoặc thực hiện ghép xâu."
                    en="As strings, arithmetic operations cannot be performed, resulting in TypeError or unwanted string concatenations."
                  />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 3. Phần VẬN DỤNG (Trang 100 SGK) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="VẬN DỤNG (SGK Trang 100)"
                en="APPLICATION PROJECTS (Textbook Page 100)"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="2 bài toán lập trình ứng dụng thực tế sử dụng phép toán //, % và công thức Heron"
                en="2 practical programming projects using //, % operators and Heron's formula"
              />
            </p>
          </div>
        </div>

        {/* Vận dụng Bài 1: Đổi giây sang Ngày, Giờ, Phút, Giây */}
        <div className="rounded-2xl bg-slate-900 border-2 border-purple-500/40 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <h4 className="font-bold text-white text-base">
                <BilingualText
                  vi="Bài 1 (Trang 100): Đổi tổng số giây ss thành Ngày, Giờ, Phút, Giây"
                  en="Project 1 (Page 100): Convert total seconds ss to Days, Hours, Minutes, Seconds"
                />
              </h4>
            </div>
            <span className="text-xs font-mono text-purple-200 bg-purple-500/20 px-2.5 py-1 rounded-md border border-purple-400/40 font-bold">
              1 day = 86400s • 1 hr = 3600s • 1 min = 60s
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <BilingualText
              vi="Viết chương trình nhập giá trị ss là số giây từ bàn phím. Thông báo ra màn hình thời gian ss giây này sau khi đổi thành thời gian tính bằng ngày, giờ, phút, giây."
              en="Write a program to input ss seconds from keyboard. Output the converted duration in days, hours, minutes, and seconds."
            />
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Code Solution */}
            <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 space-y-1">
              <div className="text-slate-400 pb-1 border-b border-slate-800">
                {bilingualMode === 'en' ? '# ConvertSecondsProgram.py' : '# ChuongTrinhDoiGiay.py'}
              </div>
              <div>
                <span className="text-sky-300">ss</span> = <span className="text-yellow-400">int</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Enter seconds ss: "' : '"Nhập số giây ss: "'}
                </span>))
              </div>
              <div className="text-slate-400 pt-1">
                {bilingualMode === 'en' ? '# Days calculation (86400 seconds)' : '# Tính số ngày (86400 giây)'}
              </div>
              <div>
                <span className="text-sky-300">ngay</span> = <span className="text-sky-300">ss</span>{' '}
                <span className="text-amber-400 font-bold">// 86400</span>
              </div>
              <div>
                <span className="text-sky-300">ss</span> = <span className="text-sky-300">ss</span>{' '}
                <span className="text-amber-400 font-bold">% 86400</span>
              </div>
              <div className="text-slate-400 pt-1">
                {bilingualMode === 'en' ? '# Hours calculation (3600 seconds)' : '# Tính số giờ (3600 giây)'}
              </div>
              <div>
                <span className="text-sky-300">gio</span> = <span className="text-sky-300">ss</span>{' '}
                <span className="text-amber-400 font-bold">// 3600</span>
              </div>
              <div>
                <span className="text-sky-300">ss</span> = <span className="text-sky-300">ss</span>{' '}
                <span className="text-amber-400 font-bold">% 3600</span>
              </div>
              <div className="text-slate-400 pt-1">
                {bilingualMode === 'en' ? '# Minutes and Seconds' : '# Tính số phút và giây'}
              </div>
              <div>
                <span className="text-sky-300">phut</span> = <span className="text-sky-300">ss</span>{' '}
                <span className="text-amber-400 font-bold">// 60</span>
              </div>
              <div>
                <span className="text-sky-300">giay</span> = <span className="text-sky-300">ss</span>{' '}
                <span className="text-amber-400 font-bold">% 60</span>
              </div>
              <div className="text-slate-400 pt-1">
                {bilingualMode === 'en' ? '# Output results' : '# In kết quả'}
              </div>
              <div>
                <span className="text-purple-400">print</span>(<span className="text-sky-300">ngay</span>,{' '}
                <span className="text-emerald-300">{bilingualMode === 'en' ? '"days,"' : '"ngày,"'}</span>, <span className="text-sky-300">gio</span>,{' '}
                <span className="text-emerald-300">{bilingualMode === 'en' ? '"hours,"' : '"giờ,"'}</span>, <span className="text-sky-300">phut</span>,{' '}
                <span className="text-emerald-300">{bilingualMode === 'en' ? '"minutes,"' : '"phút,"'}</span>, <span className="text-sky-300">giay</span>,{' '}
                <span className="text-emerald-300">{bilingualMode === 'en' ? '"seconds"' : '"giây"'}</span>)
              </div>
            </div>

            {/* Interactive Testing Widget */}
            <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
              <span className="text-xs font-bold text-purple-300">
                <BilingualText
                  vi="Thử nghiệm chạy thực tế:"
                  en="Live Interactive Simulation:"
                />
              </span>
              <div className="space-y-2">
                <label className="text-[11px] text-slate-300 font-medium">
                  {bilingualMode === 'en' ? 'Enter seconds ss:' : 'Nhập số giây ss:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputSeconds}
                    onChange={(e) => setInputSeconds(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-purple-400"
                    placeholder={bilingualMode === 'en' ? 'e.g. 100000' : 'Ví dụ: 100000'}
                  />
                  <button
                    type="button"
                    onClick={handleCalcTime}
                    className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md shadow-purple-600/30 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{bilingualMode === 'en' ? 'Convert' : 'Quy đổi'}</span>
                  </button>
                </div>
              </div>

              {timeError && (
                <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{timeError}</span>
                </div>
              )}

              {timeResult && (
                <div className="p-3 rounded-lg bg-purple-950/60 border border-purple-500/40 space-y-2 font-mono text-xs animate-fadeIn">
                  <div className="text-purple-300 font-bold">
                    {bilingualMode === 'en' ? 'Screen Output:' : 'Kết quả in ra màn hình:'}
                  </div>
                  <div className="text-white text-sm font-bold bg-slate-950 p-2 rounded border border-slate-800">
                    {bilingualMode === 'en'
                      ? `${timeResult.days} days, ${timeResult.hours} hours, ${timeResult.mins} minutes, ${timeResult.secs} seconds`
                      : `${timeResult.days} ngày, ${timeResult.hours} giờ, ${timeResult.mins} phút, ${timeResult.secs} giây`}
                  </div>
                  <div className="text-[11px] text-slate-300 font-sans">
                    ✓ {timeResult.days}×86400 + {timeResult.hours}×3600 + {timeResult.mins}×60 +{' '}
                    {timeResult.secs} = {inputSeconds} {bilingualMode === 'en' ? 'seconds' : 'giây'}.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vận dụng Bài 2: Tam giác Heron */}
        <div className="rounded-2xl bg-slate-900 border-2 border-emerald-500/40 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Triangle className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-white text-base">
                <BilingualText
                  vi="Bài 2 (Trang 100): Nhập 3 số thực a, b, c tính chu vi & diện tích tam giác (Heron)"
                  en="Project 2 (Page 100): Read 3 floats a, b, c to compute perimeter & Heron area"
                />
              </h4>
            </div>
            <span className="text-xs font-mono text-emerald-200 bg-emerald-500/20 px-2.5 py-1 rounded-md border border-emerald-400/40 font-bold">
              S = √(p(p-a)(p-b)(p-c))
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <BilingualText
              vi="Viết chương trình nhập ba số thực dương a, b, c và tính chu vi, diện tích của tam giác có độ dài các cạnh là a, b, c (với a, b, c > 0 và thoả mãn bất đẳng thức tam giác)."
              en="Write a program to input three positive floats a, b, c and compute the perimeter and area of the triangle using Heron's formula."
            />
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Code Solution */}
            <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 space-y-1">
              <div className="text-slate-400 pb-1 border-b border-slate-800">
                {bilingualMode === 'en' ? '# HeronTriangle.py' : '# TamGiacHeron.py'}
              </div>
              <div>
                <span className="text-sky-300">a</span> = <span className="text-emerald-400">float</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Enter side a: "' : '"Nhập cạnh a: "'}
                </span>))
              </div>
              <div>
                <span className="text-sky-300">b</span> = <span className="text-emerald-400">float</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Enter side b: "' : '"Nhập cạnh b: "'}
                </span>))
              </div>
              <div>
                <span className="text-sky-300">c</span> = <span className="text-emerald-400">float</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Enter side c: "' : '"Nhập cạnh c: "'}
                </span>))
              </div>
              <div className="text-slate-400 pt-1">
                {bilingualMode === 'en' ? '# Compute perimeter and semi-perimeter p' : '# Tính chu vi và nửa chu vi p'}
              </div>
              <div>
                <span className="text-sky-300">chu_vi</span> = <span className="text-sky-300">a</span> +{' '}
                <span className="text-sky-300">b</span> + <span className="text-sky-300">c</span>
              </div>
              <div>
                <span className="text-sky-300">p</span> = <span className="text-sky-300">chu_vi</span> / 2
              </div>
              <div className="text-slate-400 pt-1">
                {bilingualMode === 'en' ? '# Heron area formula (power ** 0.5)' : '# Công thức diện tích Heron (lũy thừa ** 0.5)'}
              </div>
              <div>
                <span className="text-sky-300">S</span> = (<span className="text-sky-300">p</span> * (
                <span className="text-sky-300">p</span> - <span className="text-sky-300">a</span>) * (
                <span className="text-sky-300">p</span> - <span className="text-sky-300">b</span>) * (
                <span className="text-sky-300">p</span> - <span className="text-sky-300">c</span>)) **{' '}
                <span className="text-amber-400 font-bold">0.5</span>
              </div>
              <div className="text-slate-400 pt-1">
                {bilingualMode === 'en' ? '# Output results' : '# In kết quả'}
              </div>
              <div>
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Triangle perimeter is:"' : '"Chu vi tam giác là:"'}
                </span>, <span className="text-sky-300">chu_vi</span>)
              </div>
              <div>
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Triangle area is:"' : '"Diện tích tam giác là:"'}
                </span>, <span className="text-sky-300">S</span>)
              </div>
            </div>

            {/* Interactive Testing Widget */}
            <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
              <span className="text-xs font-bold text-emerald-300">
                <BilingualText
                  vi="Thử nghiệm với ba cạnh tam giác:"
                  en="Test with triangle side lengths:"
                />
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">
                    {bilingualMode === 'en' ? 'Side a:' : 'Cạnh a:'}
                  </label>
                  <input
                    type="text"
                    value={sideA}
                    onChange={(e) => setSideA(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">
                    {bilingualMode === 'en' ? 'Side b:' : 'Cạnh b:'}
                  </label>
                  <input
                    type="text"
                    value={sideB}
                    onChange={(e) => setSideB(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-emerald-400"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">
                    {bilingualMode === 'en' ? 'Side c:' : 'Cạnh c:'}
                  </label>
                  <input
                    type="text"
                    value={sideC}
                    onChange={(e) => setSideC(e.target.value)}
                    className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-emerald-400"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCalcHeron}
                className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{bilingualMode === 'en' ? 'Calculate Perimeter & Area' : 'Tính chu vi & Diện tích'}</span>
              </button>

              {triangleResult && (
                <div
                  className={`p-3 rounded-lg border text-xs font-mono animate-fadeIn ${
                    triangleResult.valid
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {triangleResult.valid ? (
                    <div className="space-y-1">
                      <div className="text-emerald-300 font-bold">
                        {bilingualMode === 'en' ? '✓ Valid Triangle:' : '✓ Tam giác hợp lệ:'}
                      </div>
                      <div>
                        {bilingualMode === 'en' ? 'Perimeter C = ' : 'Chu vi C = '}
                        {triangleResult.perimeter?.toFixed(2)}
                      </div>
                      <div>
                        {bilingualMode === 'en' ? 'Semi-perimeter p = ' : 'Nửa chu vi p = '}
                        {triangleResult.p?.toFixed(2)}
                      </div>
                      <div className="text-white font-bold text-sm bg-slate-950 p-1.5 rounded border border-slate-800">
                        {bilingualMode === 'en' ? 'Area S = ' : 'Diện tích S = '}
                        {triangleResult.area?.toFixed(4)}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{triangleResult.errorMsg}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};
