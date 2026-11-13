import React, { useState } from 'react';
import { Layers, CheckCircle2, BookOpen, Sparkles, HelpCircle, Play, Code2, Users, Wrench, FileCode2 } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section27SubroutinesUsage: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Demo 1 State: Primes up to n (Ví dụ 1)
  const [primeLimit, setPrimeLimit] = useState<number>(30);
  const [primesFound, setPrimesFound] = useState<number[]>([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);

  // Demo 2 State: tongduong(A) (Ví dụ 2)
  const [listAInput, setListAInput] = useState<string>('0, 2, -1, 5, 10, -3');
  const [listBInput, setListBInput] = useState<string>('1, -10, -11, 8, 2, 0, -5');
  const [sumAResult, setSumAResult] = useState<number>(17);
  const [sumBResult, setSumBResult] = useState<number>(11);

  // Review Question 1 State: Primes in [m, n]
  const [rangeM, setRangeM] = useState<number>(10);
  const [rangeN, setRangeN] = useState<number>(50);
  const [rangePrimes, setRangePrimes] = useState<number[]>([11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]);

  // Question reveals
  const [q1Revealed, setQ1Revealed] = useState<boolean>(false);
  const [q2Revealed, setQ2Revealed] = useState<boolean>(false);

  // Prime checker (SGK algorithm)
  const isPrime = (num: number): boolean => {
    if (num <= 1) return false;
    let c = 0;
    let k = 1;
    while (k < num) {
      if (num % k === 0) c++;
      k++;
    }
    return c === 1;
  };

  // Run Demo 1
  const runDemo1 = () => {
    const list: number[] = [];
    const limit = Math.floor(primeLimit);
    for (let k = 1; k <= limit; k++) {
      if (isPrime(k)) list.push(k);
    }
    setPrimesFound(list);
  };

  // Run Demo 2
  const runDemo2 = () => {
    const parseAndSumPositives = (str: string) => {
      const nums = str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
      let sum = 0;
      for (const x of nums) {
        if (x > 0) sum += x;
      }
      return sum;
    };
    setSumAResult(parseAndSumPositives(listAInput));
    setSumBResult(parseAndSumPositives(listBInput));
  };

  // Run Review Q1
  const runReviewQ1 = () => {
    const m = Math.floor(rangeM);
    const n = Math.floor(rangeN);
    const list: number[] = [];
    for (let k = m; k <= n; k++) {
      if (isPrime(k)) list.push(k);
    }
    setRangePrimes(list);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-purple-950/80 via-slate-900 to-slate-900 border border-purple-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full w-fit border border-purple-500/20">
          <span>{isEn ? 'Section 2: Modular Subroutines' : 'Mục 2: Chương trình con'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 132 – 133' : 'Trang 132 – 133 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '2. How to Use Subroutines in Python' : '2. Cách Sử Dụng Chương Trình Con'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Discover when and why to encapsulate code into subroutines, observe modular programming in action with prime numbers and array processing, and master the core benefits of functional decomposition.'
            : 'Tìm hiểu thời điểm và lý do nên đóng gói mã nguồn thành chương trình con; quan sát trực tiếp cách gọi hàm tái sử dụng trong bài toán số nguyên tố, tính tổng mảng và nắm vững 3 lợi ích kiến trúc phần mềm.'}
        </p>
      </div>

      {/* Hoạt động 2 & Ví dụ 1 SGK Trang 132 – 133 */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
          <BookOpen className="w-5 h-5" />
          <span>{isEn ? 'Activity 2 & Example 1 (SGK pp. 132–133): Primes <= n' : 'Hoạt động 2 & Ví dụ 1 (Trang 132 – 133 SGK): In các số nguyên tố <= n'}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {isEn
            ? 'Problem: Input natural number n from keyboard, and print all prime numbers less than or equal to n. Solution: Reuse prime(n) from Lesson 26 in a clean main program loop.'
            : 'Bài toán: Viết chương trình chính yêu cầu nhập số tự nhiên n từ bàn phím và in các số nguyên tố nhỏ hơn hoặc bằng n ra màn hình. Giải pháp: Sử dụng chương trình con prime(n) để kiểm tra từng số.'}
        </p>

        {/* Code View */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-1.5">
            <div className="text-purple-400 font-bold text-[11px] pb-1 border-b border-slate-800">
              {isEn ? '# Subroutine Block' : '# Khối chương trình con (Subroutine)'}
            </div>
            <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">prime</span>(n):</div>
            <div className="pl-4 text-slate-300">C = 0</div>
            <div className="pl-4 text-slate-300">k = 1</div>
            <div className="pl-4 text-slate-300"><span className="text-pink-400">while</span> k &lt; n:</div>
            <div className="pl-8 text-slate-300"><span className="text-pink-400">if</span> n % k == 0: C = C + 1</div>
            <div className="pl-8 text-slate-300">k = k + 1</div>
            <div className="pl-4 text-slate-300"><span className="text-pink-400">if</span> C == 1: <span className="text-pink-400 font-bold">return True</span></div>
            <div className="pl-4 text-slate-300"><span className="text-pink-400">else</span>: <span className="text-pink-400 font-bold">return False</span></div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-1.5 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="text-blue-400 font-bold text-[11px] pb-1 border-b border-slate-800">
                {isEn ? '# Main Program Block' : '# Khối chương trình chính (Main Program)'}
              </div>
              <div className="text-slate-400">n = <span className="text-cyan-300">int</span>(<span className="text-emerald-300">input</span>(<span className="text-amber-200">{isEn ? '"Enter n: "' : '"Nhập n: "'}</span>))</div>
              <div className="text-slate-300"><span className="text-pink-400 font-bold">for</span> k <span className="text-pink-400 font-bold">in</span> <span className="text-cyan-300">range</span>(1, n + 1):</div>
              <div className="pl-4 text-slate-300"><span className="text-pink-400">if</span> <span className="text-amber-300 font-bold">prime</span>(k): <span className="text-slate-500"># Call prime(k)</span></div>
              <div className="pl-8 text-emerald-400 font-bold">print(k, end=" ")</div>
            </div>

            <div className="pt-2 border-t border-slate-800/80">
              <label className="text-[11px] text-slate-400 block mb-1">
                {isEn ? `Try n = ${primeLimit}:` : `Thử nghiệm n = ${primeLimit}:`}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="2"
                  max="500"
                  value={primeLimit}
                  onChange={(e) => setPrimeLimit(Number(e.target.value))}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono w-24 text-center"
                />
                <button
                  onClick={runDemo1}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isEn ? 'Run' : 'Chạy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Prime Output Pills */}
        <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
          <span className="text-slate-400 text-[11px]">{isEn ? `Prime numbers <= ${primeLimit} (${primesFound.length} primes):` : `Các số nguyên tố <= ${primeLimit} (Tìm thấy ${primesFound.length} số):`}</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {primesFound.map((p, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-mono font-bold border border-purple-500/30 text-[11px]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ví dụ 2 SGK Trang 133: tongduong(A) */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-cyan-400">
          <Code2 className="w-5 h-5" />
          <span>{isEn ? 'Example 2 (SGK Page 133): Reusing tongduong(A) for Multiple Lists' : 'Ví dụ 2 (Trang 133 SGK): Tái sử dụng hàm tongduong(A) cho nhiều danh sách'}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {isEn
            ? 'Problem: Given two numerical lists B and C, sum all positive numbers in each list. Instead of duplicating loop logic, encapsulate it into a reusable function tongduong(A)!'
            : 'Cho trước hai dãy số B, C, chương trình chính cần tính tổng các số hạng dương của mỗi dãy này. Thay vì phải viết đi viết lại vòng lặp ở nhiều chỗ, ta thiết lập hàm tongduong(A) dùng chung!'}
        </p>

        <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 font-mono text-xs space-y-2">
          <div><span className="text-pink-400 font-bold">def</span> <span className="text-amber-300">tongduong</span>(A):</div>
          <div className="pl-4 text-slate-300">S = 0</div>
          <div className="pl-4 text-slate-300"><span className="text-pink-400">for</span> k <span className="text-pink-400">in</span> A:</div>
          <div className="pl-8 text-slate-300"><span className="text-pink-400">if</span> k &gt; 0: S = S + k</div>
          <div className="pl-4 text-pink-400 font-bold">return S</div>
        </div>

        {/* Interactive Dual-List Tester */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-slate-400 font-mono block">
              {isEn ? 'List A (comma-separated):' : 'Dãy A (nhập phân tách bởi dấu phẩy):'}
            </span>
            <input
              type="text"
              value={listAInput}
              onChange={(e) => setListAInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
            />
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400 font-mono">tongduong(A):</span>
              <span className="text-emerald-400 font-mono font-bold text-sm bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {sumAResult}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-slate-400 font-mono block">
              {isEn ? 'List B (comma-separated):' : 'Dãy B (nhập phân tách bởi dấu phẩy):'}
            </span>
            <input
              type="text"
              value={listBInput}
              onChange={(e) => setListBInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
            />
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400 font-mono">tongduong(B):</span>
              <span className="text-emerald-400 font-mono font-bold text-sm bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {sumBResult}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={runDemo2}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isEn ? 'Recalculate Both Lists' : 'Tính lại cả hai dãy'}</span>
          </button>
        </div>
      </div>

      {/* Hộp Ghi nhớ 2 (Trang 133 SGK) */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-2 border-emerald-500/40 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold text-emerald-300 uppercase tracking-wide">
            <BilingualText
              vi="Hộp Ghi Nhớ 2 (Trang 133 SGK): Lợi Ích Của Chương Trình Con"
              en="Summary Box 2 (SGK Page 133): Advantages of Subroutines"
            />
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div className="font-bold text-white">
              <BilingualText vi="1. Phân chia bài toán lớn" en="1. Problem Decomposition" />
            </div>
            <div className="text-slate-300 leading-relaxed text-[11px]">
              <BilingualText
                vi="Chia việc giải một bài toán lớn thành giải quyết các bài toán nhỏ độc lập, phát huy tinh thần làm việc nhóm hiệu quả."
                en="Divides complex problems into smaller independent sub-problems, facilitating collaborative team workflows."
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
              <FileCode2 className="w-4 h-4" />
            </div>
            <div className="font-bold text-white">
              <BilingualText vi="2. Cấu trúc rõ ràng, dễ hiểu" en="2. Clean Modular Structure" />
            </div>
            <div className="text-slate-300 leading-relaxed text-[11px]">
              <BilingualText
                vi="Chương trình chính ngắn gọn, mạch lạc, người đọc dễ dàng nắm bắt logic tổng thể mà không bị rối bởi chi tiết vụn vặt."
                en="Keeps the main program concise and readable, enabling developers to comprehend overall logic effortlessly."
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
              <Wrench className="w-4 h-4" />
            </div>
            <div className="font-bold text-white">
              <BilingualText vi="3. Dễ bảo trì & nâng cấp" en="3. Easy Maintenance & Upgrades" />
            </div>
            <div className="text-slate-300 leading-relaxed text-[11px]">
              <BilingualText
                vi="Khi cần hiệu chỉnh, tối ưu thuật toán hoặc sửa lỗi, ta chỉ cần can thiệp tại duy nhất một chỗ bên trong thân hàm."
                en="When modifying, optimizing, or debugging logic, changes only need to be executed once inside the function body."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Câu hỏi củng cố (Trang 133 SGK) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-400">
          <HelpCircle className="w-5 h-5" />
          <BilingualText
            vi="Câu Hỏi Củng Cố (Trang 133 SGK)"
            en="Review Questions (SGK Page 133)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question 1: In số nguyên tố trong đoạn [m, n] */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {isEn ? 'Question 1' : 'Câu hỏi 1'}
              </span>
              <p className="text-xs text-white font-medium leading-relaxed">
                {isEn
                  ? 'Using function prime(), write a program to print prime numbers between m and n (1 < m < n).'
                  : 'Sử dụng hàm prime(), em hãy viết chương trình in ra các số nguyên tố trong khoảng từ m đến n, với m, n là hai số tự nhiên và 1 < m < n.'}
              </p>
            </div>

            <div>
              <button
                onClick={() => setQ1Revealed(!q1Revealed)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all w-fit cursor-pointer"
              >
                <span>{q1Revealed ? (isEn ? 'Hide Code' : 'Ẩn chương trình') : (isEn ? 'Reveal Solution & Test' : 'Xem chương trình & Chạy thử')}</span>
              </button>

              {q1Revealed && (
                <div className="mt-2.5 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 space-y-2 animate-in fade-in leading-relaxed">
                  <div className="font-mono text-[11px] text-purple-200">
                    <div>{isEn ? '# Program to print prime numbers from m to n:' : '# Chương trình in số nguyên tố m đến n:'}</div>
                    <div>m = <span className="text-cyan-300">int</span>(input({isEn ? '"Enter m: "' : '"Nhập m: "'}))</div>
                    <div>n = <span className="text-cyan-300">int</span>(input({isEn ? '"Enter n: "' : '"Nhập n: "'}))</div>
                    <div><span className="text-pink-400 font-bold">for</span> k <span className="text-pink-400 font-bold">in</span> range(m, n + 1):</div>
                    <div className="pl-4">if prime(k): print(k, end=" ")</div>
                  </div>

                  <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                    <span className="text-slate-400 text-[11px]">{isEn ? 'Try m:' : 'Thử m:'}</span>
                    <input
                      type="number"
                      value={rangeM}
                      onChange={(e) => setRangeM(Number(e.target.value))}
                      className="w-14 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-center text-white"
                    />
                    <span className="text-slate-400 text-[11px]">n:</span>
                    <input
                      type="number"
                      value={rangeN}
                      onChange={(e) => setRangeN(Number(e.target.value))}
                      className="w-14 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-center text-white"
                    />
                    <button
                      onClick={runReviewQ1}
                      className="px-2 py-0.5 bg-purple-600 hover:bg-purple-500 text-white rounded font-bold text-[11px] cursor-pointer"
                    >
                      {isEn ? 'Filter' : 'Lọc'}
                    </button>
                  </div>
                  <div className="text-[11px] text-emerald-300 font-mono">
                    [{rangePrimes.join(', ')}]
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Question 2: Bài toán thực tế */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {isEn ? 'Question 2' : 'Câu hỏi 2'}
              </span>
              <p className="text-xs text-white font-medium leading-relaxed">
                {isEn
                  ? 'Name practical tasks or software systems where functions are essential.'
                  : 'Em hãy nêu một công việc/bài toán nào đó mà có thể sử dụng hàm để giải.'}
              </p>
            </div>

            <div>
              <button
                onClick={() => setQ2Revealed(!q2Revealed)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all w-fit cursor-pointer"
              >
                <span>{q2Revealed ? (isEn ? 'Hide Examples' : 'Ẩn ví dụ') : (isEn ? 'Reveal Real-World Examples' : 'Xem các bài toán thực tế')}</span>
              </button>

              {q2Revealed && (
                <div className="mt-2.5 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-slate-300 space-y-1.5 animate-in fade-in leading-relaxed">
                  <div className="font-bold text-amber-300">
                    {isEn ? 'Typical Practical Scenarios:' : 'Các ví dụ tiêu biểu:'}
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li>
                      <strong>{isEn ? 'Student Gradebook:' : 'Quản lý điểm học sinh:'}</strong>{' '}
                      {isEn ? 'Functions calculate_gpa(math, lit, eng) and rank(gpa) called for every student in a roster.' : 'Hàm tinh_gpa(toan, van, anh) và hàm xep_loai(gpa) được gọi cho từng học sinh trong danh sách.'}
                    </li>
                    <li>
                      <strong>{isEn ? 'Point-of-Sale Billing:' : 'Phần mềm bán hàng:'}</strong>{' '}
                      {isEn ? 'Functions compute_vat(amount) and apply_coupon(total, code) called per checkout receipt.' : 'Hàm tinh_thue_vat(tien) và hàm ap_dung_ma_giam_gia(tong_tien, ma) được gọi lặp lại cho mỗi hoá đơn.'}
                    </li>
                    <li>
                      <strong>{isEn ? 'Calendar & Weather Apps:' : 'Ứng dụng lịch & thời tiết:'}</strong>{' '}
                      {isEn ? 'Function is_leap_year(year) to determine if February has 28 or 29 days.' : 'Hàm kiem_tra_nam_nhuan(nam) để xác định tháng 2 có 28 hay 29 ngày.'}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
