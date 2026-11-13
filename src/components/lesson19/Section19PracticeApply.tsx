import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  HelpCircle,
  ShoppingCart,
  Calendar,
  Play,
  Award,
  Sparkles
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

interface Section19PracticeApplyProps {
  onOpenQuiz?: () => void;
  onOpenCert?: () => void;
}

export const Section19PracticeApply: React.FC<Section19PracticeApplyProps> = ({
  onOpenQuiz,
  onOpenCert
}) => {
  const { bilingualMode, navigateToQuiz, completeSectionTasks } = useBook();

  // Automatically record hands-on completion for Section 5 (Practice & Apply)
  useEffect(() => {
    completeSectionTasks(19, 5);
  }, [completeSectionTasks]);

  // Luyện tập 1: Toggle answers
  const [showLt1, setShowLt1] = useState<{ [key: string]: boolean }>({
    a: false,
    b: false,
    c: false
  });

  // Vận dụng 1: Bán cam siêu thị
  const [orangeKg, setOrangeKg] = useState<string>('6.5');
  const [orangeBill, setOrangeBill] = useState<{
    unitPrice: number;
    total: number;
  } | null>(null);

  // Vận dụng 2: Năm nhuận
  const [leapInputYear, setLeapInputYear] = useState<string>('2024');
  const [leapVerdict, setLeapVerdict] = useState<{
    isLeap: boolean;
    reasonVi: string;
    reasonEn: string;
  } | null>(null);

  // Calculate Orange Bill
  const handleCalcOrange = () => {
    completeSectionTasks(19, 5);
    const kg = parseFloat(orangeKg);
    if (isNaN(kg) || kg <= 0) {
      alert(bilingualMode === 'en' ? 'Please enter a valid weight in kg (> 0)!' : 'Vui lòng nhập số kg cam hợp lệ (> 0)!');
      return;
    }
    if (kg < 5) {
      setOrangeBill({ unitPrice: 12000, total: kg * 12000 });
    } else {
      setOrangeBill({ unitPrice: 10000, total: kg * 10000 });
    }
  };

  // Calculate Leap Year
  const handleCalcLeap = () => {
    completeSectionTasks(19, 5);
    const n = parseInt(leapInputYear);
    if (isNaN(n) || n <= 0) {
      alert(bilingualMode === 'en' ? 'Please enter a valid calendar year (> 0)!' : 'Vui lòng nhập năm dương lịch hợp lệ (> 0)!');
      return;
    }

    const div400 = n % 400 === 0;
    const div4 = n % 4 === 0;
    const notDiv100 = n % 100 !== 0;
    const isLeap = div400 || (div4 && notDiv100);

    let reasonVi = '';
    let reasonEn = '';
    if (div400) {
      reasonVi = `${n} chia hết cho 400 → Là năm nhuận thế kỷ.`;
      reasonEn = `${n} is divisible by 400 → Century leap year.`;
    } else if (div4 && notDiv100) {
      reasonVi = `${n} chia hết cho 4 và không chia hết cho 100 → Là năm nhuận chuẩn.`;
      reasonEn = `${n} is divisible by 4 and not by 100 → Standard leap year.`;
    } else if (n % 100 === 0 && !div400) {
      reasonVi = `${n} chia hết cho 100 nhưng không chia hết cho 400 → Không phải năm nhuận.`;
      reasonEn = `${n} is divisible by 100 but not by 400 → Not a leap year.`;
    } else {
      reasonVi = `${n} không chia hết cho 4 → Không phải năm nhuận.`;
      reasonEn = `${n} is not divisible by 4 → Not a leap year.`;
    }

    setLeapVerdict({ isLeap, reasonVi, reasonEn });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-sky-950 p-6 border border-purple-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            <BilingualText
              vi="Luyện tập & Vận dụng • Trang 104 SGK Tin học 10"
              en="Practice & Application • Page 104 Informatics 10"
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
            vi="Nắm vững cách biểu diễn các miền khoảng số học dưới dạng biểu thức lôgic Python và áp dụng vào 2 bài toán thực tiễn: chính sách chiết khấu mua cam siêu thị và thuật toán xác định năm nhuận thiên văn."
            en="Express numerical interval domains as Python boolean expressions and apply them to 2 real-world problems: supermarket bulk discount and astronomical leap year verification."
          />
        </p>
      </div>

      {/* 2. Phần LUYỆN TẬP (Trang 104 SGK) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="LUYỆN TẬP (SGK Trang 104)"
                en="EXERCISES (Textbook Page 104)"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="Viết biểu thức lôgic tương ứng với các miền số học và tìm nghiệm số nguyên"
                en="Formulate boolean expressions representing arithmetic intervals and find integer solutions"
              />
            </p>
          </div>
        </div>

        {/* Luyện tập 1: Viết biểu thức lôgic */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-sky-300">
            <BilingualText
              vi="Bài 1 (Trang 104): Viết biểu thức lôgic ứng với mỗi câu sau:"
              en="Exercise 1 (Page 104): Write a boolean expression for each condition:"
            />
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                id: 'a',
                titleVi: 'a) Số x nằm trong khoảng (0; 10)',
                titleEn: 'a) Number x lies in open interval (0; 10)',
                expr: 'x > 0 and x < 10',
                noteVi: 'Khoảng mở (0; 10) không lấy hai đầu mút 0 và 10.',
                noteEn: 'Open interval (0; 10) excludes endpoints 0 and 10.'
              },
              {
                id: 'b',
                titleVi: 'b) Số y nằm ngoài đoạn [1; 2]',
                titleEn: 'b) Number y lies outside segment [1; 2]',
                expr: 'y < 1 or y > 2',
                noteVi: 'Nằm ngoài đoạn tức là nhỏ hơn 1 hoặc lớn hơn 2.',
                noteEn: 'Outside closed segment means strictly less than 1 or greater than 2.'
              },
              {
                id: 'c',
                titleVi: 'c) Số z trong [0; 1] hoặc [5; 10]',
                titleEn: 'c) Number z is in [0; 1] or [5; 10]',
                expr: '(0 <= z <= 1) or (5 <= z <= 10)',
                noteVi: 'Kết hợp hai đoạn đóng bằng phép toán or.',
                noteEn: 'Join two closed intervals using logical or operator.'
              }
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setShowLt1((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                className="cursor-pointer p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {bilingualMode === 'en' ? item.titleEn : item.titleVi}
                  </span>
                  <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
                    {showLt1[item.id]
                      ? bilingualMode === 'en'
                        ? 'Hide'
                        : 'Ẩn'
                      : bilingualMode === 'en'
                        ? 'View'
                        : 'Xem'}
                  </span>
                </div>
                {showLt1[item.id] && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800 animate-fadeIn font-mono text-xs">
                    <div className="text-emerald-400 font-bold bg-slate-900 p-2 rounded border border-slate-800">
                      {item.expr}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans">
                      {bilingualMode === 'en' ? item.noteEn : item.noteVi}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Luyện tập 2: Tìm nghiệm m, n thoả mãn biểu thức */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-sky-300">
            <BilingualText
              vi="Bài 2 (Trang 104): Tìm một vài giá trị m, n thoả mãn các biểu thức:"
              en="Exercise 2 (Page 104): Find values of m, n satisfying the expressions:"
            />
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <div className="text-yellow-300 font-bold">a) 100%m == 0 and n%5 != 0</div>
              <p className="text-[11px] text-slate-400 font-sans">
                {bilingualMode === 'en'
                  ? 'm is a divisor of 100 and n is not divisible by 5.'
                  : 'm là ước của 100 và n không chia hết cho 5.'}
              </p>
              <div className="text-emerald-300 text-[11px]">
                {bilingualMode === 'en' ? 'Ex: ' : 'Ví dụ: '}
                <strong>m = 2, n = 3</strong> (m = 4, 10, 25; n = 1, 2, 7)
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <div className="text-yellow-300 font-bold">b) m%100 == 0 and m%400 != 0</div>
              <p className="text-[11px] text-slate-400 font-sans">
                {bilingualMode === 'en'
                  ? 'm is divisible by 100 but not by 400.'
                  : 'm chia hết cho 100 nhưng không chia hết cho 400.'}
              </p>
              <div className="text-emerald-300 text-[11px]">
                {bilingualMode === 'en' ? 'Ex: ' : 'Ví dụ: '}
                <strong>m = 100, 200, 300, 500, 1900</strong>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
              <div className="text-yellow-300 font-bold">c) n%3 == 0 or (n%3 != 0 and n%4 == 0)</div>
              <p className="text-[11px] text-slate-400 font-sans">
                {bilingualMode === 'en'
                  ? 'n is divisible by 3 or by 4.'
                  : 'n chia hết cho 3 hoặc chia hết cho 4.'}
              </p>
              <div className="text-emerald-300 text-[11px]">
                {bilingualMode === 'en' ? 'Ex: ' : 'Ví dụ: '}
                <strong>n = 3, 4, 6, 8, 9, 12</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Phần VẬN DỤNG (Trang 104 SGK) */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="VẬN DỤNG (SGK Trang 104)"
                en="APPLICATIONS (Textbook Page 104)"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="2 bài toán thực tế áp dụng rẽ nhánh if: Bán cam siêu thị và Xác định năm nhuận"
                en="2 practical programming applications: Supermarket orange discount and Leap year verification"
              />
            </p>
          </div>
        </div>

        {/* Vận dụng Bài 1: Giá bán cam siêu thị */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-white text-sm">
                <BilingualText
                  vi="Bài 1 (Trang 104): Chương trình tính tiền bán cam tại siêu thị"
                  en="Project 1 (Page 104): Supermarket Bulk Orange Pricing Program"
                />
              </h4>
            </div>
            <span className="text-[11px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">
              {bilingualMode === 'en' ? '< 5kg: 12,000 VND • >= 5kg: 10,000 VND' : 'Dưới 5kg: 12.000 đ • Từ 5kg: 10.000 đ'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <BilingualText
              vi="Nếu khối lượng cam mua dưới 5 kg thì giá bán là 12 000 đồng/kg; nếu mua từ 5 kg trở lên thì giá bán là 10 000 đồng/kg. Viết chương trình nhập số lượng mua (kg) sau đó tính số tiền phải trả."
              en="If the purchase weight is under 5 kg, price is 12,000 VND/kg; for 5 kg or more, discounted price is 10,000 VND/kg. Write a program to read purchase weight (kg) and compute the total payable amount."
            />
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Code */}
            <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 space-y-1">
              <div className="text-slate-500 pb-1 border-b border-slate-800">
                {bilingualMode === 'en' ? '# OrangePrice.py' : '# BanCam.py'}
              </div>
              <div>
                <span className="text-sky-300">kg</span> = <span className="text-emerald-400">float</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Enter orange weight (kg): "' : '"Nhập khối lượng cam (kg): "'}
                </span>))
              </div>
              <div>
                <span className="text-purple-400 font-bold">if</span> <span className="text-sky-300">kg &lt; 5</span>:
              </div>
              <div className="pl-6 text-slate-200">
                <span className="text-sky-300">tien</span> = <span className="text-sky-300">kg</span> *{' '}
                <span className="text-amber-300">12000</span>
              </div>
              <div>
                <span className="text-purple-400 font-bold">else</span>:
              </div>
              <div className="pl-6 text-slate-200">
                <span className="text-sky-300">tien</span> = <span className="text-sky-300">kg</span> *{' '}
                <span className="text-amber-300">10000</span>
              </div>
              <div className="pt-1">
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Total amount payable:"' : '"Số tiền phải trả là:"'}
                </span>, <span className="text-sky-300">tien</span>,{' '}
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"VND"' : '"đồng"'}
                </span>)
              </div>
            </div>

            {/* Interactive Calculator */}
            <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
              <span className="text-xs font-bold text-amber-300">
                <BilingualText
                  vi="Thử nghiệm tính tiền cam:"
                  en="Test Orange Pricing:"
                />
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={orangeKg}
                  onChange={(e) => setOrangeKg(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-amber-400"
                  placeholder="Ví dụ: 6.5"
                />
                <button
                  type="button"
                  onClick={handleCalcOrange}
                  className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md shadow-amber-600/30 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Calculate' : 'Tính tiền'}</span>
                </button>
              </div>

              {orangeBill && (
                <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-500/40 space-y-1 font-mono text-xs animate-fadeIn">
                  <div className="text-slate-400">
                    {bilingualMode === 'en' ? 'Unit Price: ' : 'Đơn giá áp dụng: '}
                    <strong className="text-amber-300">
                      {orangeBill.unitPrice.toLocaleString('vi-VN')} {bilingualMode === 'en' ? 'VND/kg' : 'đ/kg'}
                    </strong>
                  </div>
                  <div className="text-white text-sm font-bold bg-slate-950 p-2 rounded border border-slate-800">
                    {bilingualMode === 'en'
                      ? `Total Payable: ${orangeBill.total.toLocaleString('vi-VN')} VND`
                      : `Số tiền phải trả: ${orangeBill.total.toLocaleString('vi-VN')} đồng`}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Vận dụng Bài 2: Kiểm tra năm nhuận */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-400" />
              <h4 className="font-bold text-white text-sm">
                <BilingualText
                  vi="Bài 2 (Trang 104): Chương trình kiểm tra năm nhuận thiên văn"
                  en="Project 2 (Page 104): Astronomical Leap Year Verification Program"
                />
              </h4>
            </div>
            <span className="text-[11px] font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded">
              n % 400 == 0 or (n % 4 == 0 and n % 100 != 0)
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            <BilingualText
              vi="Năm n là năm nhuận nếu n thoả mãn điều kiện: n chia hết cho 400 hoặc (n chia hết cho 4 đồng thời không chia hết cho 100). Viết chương trình nhập số năm n và cho biết năm n có phải năm nhuận hay không."
              en="Year n is a leap year if n is divisible by 400 or (divisible by 4 and not by 100). Write a program to input year n and determine if it is a leap year."
            />
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Code */}
            <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 space-y-1">
              <div className="text-slate-500 pb-1 border-b border-slate-800">
                {bilingualMode === 'en' ? '# LeapYear.py' : '# NamNhuan.py'}
              </div>
              <div>
                <span className="text-sky-300">n</span> = <span className="text-yellow-400">int</span>(
                <span className="text-purple-400">input</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Enter year n: "' : '"Nhập năm n: "'}
                </span>))
              </div>
              <div>
                <span className="text-purple-400 font-bold">if</span>{' '}
                <span className="text-sky-300">n % 400 == 0 or (n % 4 == 0 and n % 100 != 0)</span>:
              </div>
              <div className="pl-6 text-emerald-300">
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Year"' : '"Năm"'}
                </span>, <span className="text-sky-300">n</span>,{' '}
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"is a leap year."' : '"là năm nhuận."'}
                </span>)
              </div>
              <div>
                <span className="text-purple-400 font-bold">else</span>:
              </div>
              <div className="pl-6 text-rose-300">
                <span className="text-purple-400">print</span>(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Year"' : '"Năm"'}
                </span>, <span className="text-sky-300">n</span>,{' '}
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"is not a leap year."' : '"không phải là năm nhuận."'}
                </span>)
              </div>
            </div>

            {/* Interactive Validator */}
            <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
              <span className="text-xs font-bold text-sky-300">
                <BilingualText
                  vi="Thử nghiệm năm dương lịch:"
                  en="Test with Calendar Year:"
                />
              </span>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={leapInputYear}
                  onChange={(e) => setLeapInputYear(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:border-sky-400"
                  placeholder="Ví dụ: 2024"
                />
                <button
                  type="button"
                  onClick={handleCalcLeap}
                  className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center gap-1 shadow-md shadow-sky-600/30 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Check Year' : 'Kiểm tra'}</span>
                </button>
              </div>

              {/* Quick year suggestions */}
              <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                <span>{bilingualMode === 'en' ? 'Samples:' : 'Năm mẫu:'}</span>
                {[2000, 1900, 2024, 2025, 2026].map((yr) => (
                  <button
                    type="button"
                    key={yr}
                    onClick={() => {
                      setLeapInputYear(String(yr));
                    }}
                    className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                  >
                    {yr}
                  </button>
                ))}
              </div>

              {leapVerdict && (
                <div
                  className={`p-3 rounded-lg border font-mono text-xs space-y-1 animate-fadeIn ${
                    leapVerdict.isLeap
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  }`}
                >
                  <div className="font-bold">
                    {leapVerdict.isLeap
                      ? bilingualMode === 'en'
                        ? `✓ Year ${leapInputYear} IS A LEAP YEAR`
                        : `✓ Năm ${leapInputYear} LÀ NĂM NHUẬN`
                      : bilingualMode === 'en'
                        ? `✕ Year ${leapInputYear} IS NOT A LEAP YEAR`
                        : `✕ Năm ${leapInputYear} KHÔNG PHẢI NĂM NHUẬN`}
                  </div>
                  <div className="text-[11px] font-sans text-slate-300">
                    {bilingualMode === 'en' ? leapVerdict.reasonEn : leapVerdict.reasonVi}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ GUIDANCE CARD: Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border-2 border-indigo-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {bilingualMode === 'en'
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài 19 (10 Câu)'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {bilingualMode === 'en'
                ? 'To take the 10-question textbook quiz and earn your verified Certificate for Lesson 19, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành Bài 19, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={navigateToQuiz}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>{bilingualMode === 'en' ? 'Open Quiz on Nav Bar →' : 'Mở Trắc Nghiệm Trên Thanh Điều Hướng →'}</span>
        </button>
      </div>
    </div>
  );
};
