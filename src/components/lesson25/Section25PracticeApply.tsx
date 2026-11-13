import React, { useState, useEffect } from 'react';
import { Award, Play, BookOpen, Sparkles, Calculator, User, Hash } from 'lucide-react';
import { useBook } from '../../context/BookContext';

export const Section25PracticeApply: React.FC = () => {
  const {
    bilingualMode,
    setOriginalPageTarget,
    setShowOriginalModal,
    navigateToQuiz,
    completeSectionTasks
  } = useBook();

  const isEn = bilingualMode === 'en';

  // Mark task completion for section 5 (index 4) on load
  useEffect(() => {
    completeSectionTasks(25, 4);
  }, [completeSectionTasks]);

  // Luyện tập 1 State: Sum of space-separated numbers (int or float)
  const [lt1Input, setLt1Input] = useState<string>('12.5 30 7.5 10 40');
  const [lt1Output, setLt1Output] = useState<{ count: number; sum: number } | null>(null);

  // Luyện tập 2 State: User Full Name split
  const [lt2Input, setLt2Input] = useState<string>('Hoàng Minh Anh');
  const [lt2Output, setLt2Output] = useState<{ ten: string; hodem: string } | null>(null);

  // Vận dụng 1 State: GCD of 2 numbers on one line
  const [vd1Input, setVd1Input] = useState<string>('48 180');
  const [vd1Output, setVd1Output] = useState<{ a: number; b: number; gcd: number } | null>(null);

  // Vận dụng 2 State: Count students by given name
  const [vd2ClassList, setVd2ClassList] = useState<string>(
    'Nguyễn Mai Hương\nTrần Văn Nam\nLê Thị Thu Hương\nPhạm Quốc Đạt\nĐặng Hương'
  );
  const [vd2QueryName, setVd2QueryName] = useState<string>('Hương');
  const [vd2Count, setVd2Count] = useState<number | null>(null);

  // Run Luyện tập 1
  const runLt1 = () => {
    const sline = lt1Input.trim().split(/\s+/).filter(Boolean);
    let total = 0;
    let count = 0;
    for (const x of sline) {
      const val = parseFloat(x);
      if (!isNaN(val)) {
        total += val;
        count++;
      }
    }
    setLt1Output({ count, sum: total });
    completeSectionTasks(25, 4);
  };

  // Run Luyện tập 2
  const runLt2 = () => {
    const sline = lt2Input.trim().split(/\s+/).filter(Boolean);
    if (sline.length === 0) {
      setLt2Output({ ten: '', hodem: '' });
      return;
    }
    const m = sline.length - 1;
    const ten = sline[m];
    const hodem = sline.slice(0, m).join(' ');
    setLt2Output({ ten, hodem });
    completeSectionTasks(25, 4);
  };

  // Run Vận dụng 1: GCD (Euclid)
  const runVd1 = () => {
    const sline = vd1Input.trim().split(/\s+/).filter(Boolean);
    if (sline.length < 2) return;
    const a = parseInt(sline[0], 10);
    const b = parseInt(sline[1], 10);
    if (isNaN(a) || isNaN(b)) return;

    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
      const r = x % y;
      x = y;
      y = r;
    }
    setVd1Output({ a, b, gcd: x });
    completeSectionTasks(25, 4);
  };

  // Run Vận dụng 2: Name counter
  const runVd2 = () => {
    const lines = vd2ClassList.split('\n').map(l => l.trim()).filter(Boolean);
    const target = vd2QueryName.trim().toLowerCase();
    let count = 0;
    for (const name of lines) {
      const words = name.split(/\s+/).filter(Boolean);
      if (words.length > 0) {
        const given = words[words.length - 1].toLowerCase();
        if (given === target) count++;
      }
    }
    setVd2Count(count);
    completeSectionTasks(25, 4);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold tracking-wide uppercase mb-1">
            <Calculator className="w-4 h-4" />
            <span>
              {isEn
                ? 'Practice & Application • Informatics 10 KNTT — Page 126'
                : 'Luyện tập & Vận dụng • SGK Tin học 10 Kết nối tri thức — Trang 126'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            {isEn
              ? 'LESSON 25: PRACTICE & APPLICATION'
              : 'LUYỆN TẬP, VẬN DỤNG & CỦNG CỐ BÀI 25'}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            {isEn
              ? 'Applying string processing methods: split(), join(), find() in numerical summation, name extraction, GCD calculation, and name occurrences.'
              : 'Ứng dụng các lệnh split(), join(), find() vào tính toán tổng chuỗi số, tách họ và tên học sinh, tìm ước chung lớn nhất và đếm tên.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(126);
            setShowOriginalModal(true);
          }}
          className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>{isEn ? 'Compare Page 126' : 'Đối chiếu Trang 126'}</span>
        </button>
      </div>

      {/* =========================================================================
          LUYỆN TẬP (SGK Trang 126)
      ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Luyện tập 1: Tính tổng dãy số nhập trên 1 dòng */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-600 dark:text-blue-400">
              {isEn ? 'PRACTICE 1 • PAGE 126' : 'LUYỆN TẬP 1 • TRANG 126'}
            </span>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn
                ? 'Input a string of numbers separated by spaces, compute and print their sum'
                : 'Nhập một xâu các số cách nhau bởi dấu cách, tính và in ra tổng của chúng'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isEn
                ? 'Use s.split() to decompose words, traverse with for x in sline: total += float(x).'
                : 'Sử dụng lệnh s.split() để tách các từ, dùng vòng lặp for x in sline: tong += float(x).'}
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500">
                {isEn ? 'Input numbers string:' : 'Xâu số nhập vào:'}
              </label>
              <input
                type="text"
                value={lt1Input}
                onChange={e => setLt1Input(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-blue-600 dark:text-blue-400 focus:outline-none"
              />
            </div>

            {lt1Output && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-400">
                  {isEn ? `Count of valid numbers: ${lt1Output.count}` : `Số lượng phần tử: ${lt1Output.count}`}
                </div>
                <div className="text-emerald-400 font-bold text-sm">
                  {isEn ? `Sum = ${lt1Output.sum}` : `Tổng = ${lt1Output.sum}`}
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={runLt1}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isEn ? 'Compute Sum' : 'Tính Tổng'}</span>
          </button>
        </div>

        {/* Luyện tập 2: Tách Họ đệm và Tên */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              {isEn ? 'PRACTICE 2 • PAGE 126' : 'LUYỆN TẬP 2 • TRANG 126'}
            </span>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn
                ? 'Input full student name, print First Name and Middle/Family Name separately'
                : 'Nhập họ tên đầy đủ của học sinh, in riêng Tên và Họ đệm ra màn hình'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isEn
                ? 'sline = s.split(), First name = sline[len(sline)-1], Middle/Family = " ".join(sline[:m]).'
                : 'sline = s.split(), Tên = sline[len(sline)-1], Họ đệm = " ".join(sline[:m]).'}
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500">
                {isEn ? 'Student full name:' : 'Họ và tên học sinh:'}
              </label>
              <input
                type="text"
                value={lt2Input}
                onChange={e => setLt2Input(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 focus:outline-none"
              />
            </div>

            {lt2Output && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
                <div className="text-slate-300">
                  {isEn ? 'Surname/Middle name:' : 'Họ đệm:'} <span className="text-amber-400 font-bold">{lt2Output.hodem || (isEn ? '(None)' : '(Không có)')}</span>
                </div>
                <div className="text-slate-300">
                  {isEn ? 'Given name:' : 'Tên:'} <span className="text-emerald-400 font-bold">{lt2Output.ten}</span>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={runLt2}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all"
          >
            <User className="w-3.5 h-3.5" />
            <span>{isEn ? 'Split Name' : 'Tách Họ và Tên'}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VẬN DỤNG (SGK Trang 126)
      ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Vận dụng 1: GCD của 2 số nguyên trên 1 dòng */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
              {isEn ? 'APPLICATION 1 • PAGE 126' : 'VẬN DỤNG 1 • TRANG 126'}
            </span>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn
                ? 'Input two positive integers on a single line, compute GCD(a, b)'
                : 'Nhập hai số nguyên dương a, b trên một dòng, tìm ước chung lớn nhất GCD(a, b)'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isEn
                ? 'Split line using split(), unpack a, b = int(sline[0]), int(sline[1]), and apply Euclidean algorithm.'
                : 'Tách dòng bằng split(), lấy a, b = int(sline[0]), int(sline[1]) và áp dụng thuật toán Euclid.'}
            </p>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-500">
                {isEn ? 'Two numbers separated by space (a b):' : 'Hai số nguyên cách nhau bởi dấu cách (a b):'}
              </label>
              <input
                type="text"
                value={vd1Input}
                onChange={e => setVd1Input(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 focus:outline-none"
              />
            </div>

            {vd1Output && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs">
                <span className="text-slate-300">GCD({vd1Output.a}, {vd1Output.b}) = </span>
                <span className="text-amber-400 font-bold text-base">{vd1Output.gcd}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={runVd1}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{isEn ? 'Compute GCD (Euclid)' : 'Tìm Ước Chung Lớn Nhất'}</span>
          </button>
        </div>

        {/* Vận dụng 2: Đếm học sinh trùng tên */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-violet-500/20 text-violet-600 dark:text-violet-400">
              {isEn ? 'APPLICATION 2 • PAGE 126' : 'VẬN DỤNG 2 • TRANG 126'}
            </span>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn
                ? 'Input class roster (each on a line), count students with a given name'
                : 'Nhập danh sách học sinh (mỗi bạn một dòng), đếm số bạn có tên trùng với tên cho trước'}
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-slate-500">
                  {isEn ? 'Roster list (one per line):' : 'Danh sách (mỗi dòng 1 bạn):'}
                </label>
                <textarea
                  rows={3}
                  value={vd2ClassList}
                  onChange={e => setVd2ClassList(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-mono focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-500">
                  {isEn ? 'Name to count:' : 'Tên cần đếm:'}
                </label>
                <input
                  type="text"
                  value={vd2QueryName}
                  onChange={e => setVd2QueryName(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-bold text-violet-600 dark:text-violet-400 focus:outline-none"
                />
              </div>
            </div>

            {vd2Count !== null && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs">
                <span className="text-slate-300">
                  {isEn ? `Students with given name "${vd2QueryName}": ` : `Số bạn mang tên "${vd2QueryName}": `}
                </span>
                <span className="text-violet-400 font-bold text-base">
                  {vd2Count} {isEn ? 'students' : 'bạn'}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={runVd2}
            className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow transition-all"
          >
            <Hash className="w-3.5 h-3.5" />
            <span>{isEn ? 'Count Name Occurrences' : 'Đếm Số Bạn Trùng Tên'}</span>
          </button>
        </div>
      </div>

      {/* QUIZ GUIDANCE CARD: Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border-2 border-indigo-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {isEn
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài 25 (10 Câu)'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz and earn your verified Certificate for Lesson 25, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành Bài 25, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={navigateToQuiz}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>{isEn ? 'Open Quiz on Nav Bar →' : 'Mở Trắc Nghiệm Trên Thanh Điều Hướng →'}</span>
        </button>
      </div>
    </div>
  );
};
