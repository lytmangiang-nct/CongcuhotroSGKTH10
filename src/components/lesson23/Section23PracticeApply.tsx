import React, { useState, useEffect } from 'react';
import { useBook } from '../../context/BookContext';
import {
  BookOpen,
  Award,
  RotateCcw,
  Calculator,
  Play,
  Sparkles
} from 'lucide-react';

export const Section23PracticeApply: React.FC = () => {
  const {
    setOriginalPageTarget,
    setShowOriginalModal,
    bilingualMode,
    navigateToQuiz,
    completeSectionTasks
  } = useBook();

  const isEn = bilingualMode === 'en';

  // Mark task completion for section 5 (index 4) on load
  useEffect(() => {
    completeSectionTasks(23, 4);
  }, [completeSectionTasks]);

  // Luyện tập 1 State: [1, 2, 2, 3, 4, 5, 5]
  const [lt1List, setLt1List] = useState<number[]>([1, 2, 2, 3, 4, 5, 5]);
  const [lt1Log, setLt1Log] = useState<{ vi: string; en: string }>({
    vi: 'Dãy ban đầu: [1, 2, 2, 3, 4, 5, 5]',
    en: 'Initial sequence: [1, 2, 2, 3, 4, 5, 5]'
  });

  const handleLt1a = () => {
    setLt1List(prev => {
      const copy = [...prev];
      copy.splice(1, 0, 1);
      return copy;
    });
    setLt1Log({
      vi: 'Đã thực hiện câu a: A.insert(1, 1) -> Chèn số 1 vào ngay sau giá trị 1 ở vị trí 0!',
      en: 'Executed task (a): A.insert(1, 1) -> Inserted number 1 right after value 1 at index 0!'
    });
    completeSectionTasks(23, 4);
  };

  const handleLt1b = () => {
    setLt1List(prev => {
      const copy = [...prev];
      const idx4 = copy.indexOf(4);
      if (idx4 !== -1) {
        copy.splice(idx4 + 1, 0, 3, 4);
      } else {
        copy.push(3, 4);
      }
      return copy;
    });
    setLt1Log({
      vi: 'Đã thực hiện câu b: Chèn 3 và 4 vào sau cặp 3, 4 để có [3, 4] liền nhau 2 lần!',
      en: 'Executed task (b): Inserted 3 and 4 next to the pair 3, 4 to have [3, 4] appear consecutively twice!'
    });
    completeSectionTasks(23, 4);
  };

  const handleResetLt1 = () => {
    setLt1List([1, 2, 2, 3, 4, 5, 5]);
    setLt1Log({
      vi: 'Khôi phục dãy ban đầu: [1, 2, 2, 3, 4, 5, 5]',
      en: 'Reset to standard sequence: [1, 2, 2, 3, 4, 5, 5]'
    });
  };

  // Luyện tập 2 State: Xoá phần tử chính giữa (chẵn / lẻ)
  const [lt2OddList, setLt2OddList] = useState<number[]>([10, 20, 30, 40, 50]); // odd: len = 5 -> mid = 2 (delete 30)
  const [lt2EvenList, setLt2EvenList] = useState<number[]>([10, 20, 30, 40, 50, 60]); // even: len = 6 -> delete 30, 40
  const [lt2Msg, setLt2Msg] = useState<{ vi: string; en: string }>({
    vi: 'Chọn hành động để quan sát thuật toán xoá chính giữa',
    en: 'Choose an action to observe median element removal algorithm'
  });

  const handleRemoveMidOdd = () => {
    if (lt2OddList.length === 0) return;
    const mid = Math.floor(lt2OddList.length / 2);
    const removedVal = lt2OddList[mid];
    const updated = lt2OddList.filter((_, i) => i !== mid);
    setLt2OddList(updated);
    setLt2Msg({
      vi: `Độ dài lẻ len = ${lt2OddList.length}: Xoá 1 phần tử chính giữa tại chỉ số mid = ${mid} (giá trị ${removedVal})`,
      en: `Odd length len = ${lt2OddList.length}: Removed 1 median element at index mid = ${mid} (value ${removedVal})`
    });
    completeSectionTasks(23, 4);
  };

  const handleRemoveMidEven = () => {
    if (lt2EvenList.length < 2) return;
    const mid = Math.floor(lt2EvenList.length / 2);
    const val1 = lt2EvenList[mid - 1];
    const val2 = lt2EvenList[mid];
    const updated = lt2EvenList.filter((_, i) => i !== mid && i !== mid - 1);
    setLt2EvenList(updated);
    setLt2Msg({
      vi: `Độ dài chẵn len = ${lt2EvenList.length}: Xoá 2 phần tử chính giữa tại mid-1=${mid - 1} (${val1}) và mid=${mid} (${val2})`,
      en: `Even length len = ${lt2EvenList.length}: Removed 2 median elements at mid-1=${mid - 1} (${val1}) and mid=${mid} (${val2})`
    });
    completeSectionTasks(23, 4);
  };

  // Vận dụng 1: n số tự nhiên chẵn đầu tiên
  const [vd1N, setVd1N] = useState<number>(8);
  const [vd1List, setVd1List] = useState<number[]>([0, 2, 4, 6, 8, 10, 12, 14]);

  const handleRunVd1 = () => {
    const n = Math.max(1, Math.min(30, vd1N));
    const arr: number[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(2 * i);
    }
    setVd1List(arr);
    completeSectionTasks(23, 4);
  };

  // Vận dụng 2: Dãy Fibonacci
  const [vd2N, setVd2N] = useState<number>(8);
  const [vd2List, setVd2List] = useState<number[]>([0, 1, 1, 2, 3, 5, 8, 13]);

  const handleRunVd2 = () => {
    const n = Math.max(1, Math.min(25, vd2N));
    const fib: number[] = [];
    if (n >= 1) fib.push(0);
    if (n >= 2) fib.push(1);
    for (let i = 2; i < n; i++) {
      fib.push(fib[i - 1] + fib[i - 2]);
    }
    setVd2List(fib);
    completeSectionTasks(23, 4);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-indigo-600 to-pink-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-200 text-xs font-semibold tracking-wide uppercase mb-1">
            <Calculator className="w-4 h-4" />
            <span>
              {isEn
                ? 'Practice & Application • Informatics 10 KNTT — Page 118'
                : 'Luyện tập & Vận dụng • SGK Tin học 10 Kết nối tri thức — Trang 118'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            {isEn
              ? 'LESSON 23: PRACTICE & APPLICATION'
              : 'LUYỆN TẬP, VẬN DỤNG & CỦNG CỐ BÀI 23'}
          </h2>
          <p className="text-teal-100 text-xs sm:text-sm mt-1">
            {isEn
              ? 'Consolidate list manipulation: index insertion, median element removal, even sequence generator, and Fibonacci series.'
              : 'Thực hành nâng cao: chèn vị trí theo yêu cầu, xoá phần tử chính giữa chẵn/lẻ, tạo dãy số chẵn và dãy Fibonacci.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(118);
            setShowOriginalModal(true);
          }}
          className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4" />
          <span>{isEn ? 'Compare Page 118' : 'Đối chiếu Trang 118'}</span>
        </button>
      </div>

      {/* =========================================================================
          LUYỆN TẬP (SGK Trang 118)
      ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Luyện tập 1: Dãy [1, 2, 2, 3, 4, 5, 5] */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-600 dark:text-teal-400">
                {isEn ? 'PRACTICE 1 • PAGE 118' : 'LUYỆN TẬP 1 • TRANG 118'}
              </span>
              <button
                type="button"
                onClick={handleResetLt1}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> {isEn ? 'Reset' : 'Khôi phục'}
              </button>
            </div>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn
                ? 'Given sequence [1, 2, 2, 3, 4, 5, 5]. Write commands to:'
                : 'Cho dãy số [1, 2, 2, 3, 4, 5, 5]. Viết lệnh thực hiện:'}
            </h4>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <div>
                {isEn
                  ? 'a) Insert number 1 right after value 1 of the list.'
                  : 'a) Chèn số 1 vào ngay sau giá trị 1 của dãy.'}
              </div>
              <div>
                {isEn
                  ? 'b) Insert numbers 3 and 4 into the list so that 3 and 4 appear consecutively twice.'
                  : 'b) Chèn số 3 và số 4 vào danh sách để dãy có số 3 và số 4 liền nhau hai lần.'}
              </div>
            </div>

            {/* List visualization */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-slate-400 text-[11px]">
                {isEn ? 'Current sequence:' : 'Dãy hiện tại:'}
              </div>
              <div className="text-amber-400 font-bold tracking-wider">
                A = [{lt1List.join(', ')}]
              </div>
              <div className="text-[11px] text-slate-400 italic">
                {isEn ? lt1Log.en : lt1Log.vi}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={handleLt1a}
              className="py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all cursor-pointer shadow"
            >
              {isEn ? 'Run (a): insert(1, 1)' : 'Chạy câu a: insert(1, 1)'}
            </button>
            <button
              type="button"
              onClick={handleLt1b}
              className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all cursor-pointer shadow"
            >
              {isEn ? 'Run (b): Insert 3, 4' : 'Chạy câu b: Thêm 3, 4'}
            </button>
          </div>
        </div>

        {/* Luyện tập 2: Xoá phần tử chính giữa (lẻ xoá 1, chẵn xoá 2) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
              {isEn ? 'PRACTICE 2 • PAGE 118' : 'LUYỆN TẬP 2 • TRANG 118'}
            </span>
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              {isEn ? 'Given list A. Write a program to:' : 'Cho trước dãy A. Viết chương trình:'}
            </h4>
            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <div>
                {isEn
                  ? '• Remove 1 median element if length is odd (mid = len(A)//2).'
                  : '• Xoá 1 phần tử chính giữa nếu số phần tử là số lẻ (mid = len(A)//2).'}
              </div>
              <div>
                {isEn
                  ? '• Remove 2 median elements if length is even.'
                  : '• Xoá 2 phần tử chính giữa nếu số phần tử là số chẵn.'}
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5">
              <div className="text-slate-400 text-[11px]">
                {isEn ? `Odd sequence: [${lt2OddList.join(', ')}] (len=${lt2OddList.length})` : `Dãy lẻ: [${lt2OddList.join(', ')}] (len=${lt2OddList.length})`}
              </div>
              <div className="text-slate-400 text-[11px]">
                {isEn ? `Even sequence: [${lt2EvenList.join(', ')}] (len=${lt2EvenList.length})` : `Dãy chẵn: [${lt2EvenList.join(', ')}] (len=${lt2EvenList.length})`}
              </div>
              <div className="text-[11px] text-indigo-300 font-sans pt-1 border-t border-slate-800">
                {isEn ? lt2Msg.en : lt2Msg.vi}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="button"
              onClick={handleRemoveMidOdd}
              disabled={lt2OddList.length === 0}
              className="py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all cursor-pointer shadow disabled:opacity-40"
            >
              {isEn ? 'Remove 1 median (Odd)' : 'Xoá 1 giữa (Dãy lẻ)'}
            </button>
            <button
              type="button"
              onClick={handleRemoveMidEven}
              disabled={lt2EvenList.length < 2}
              className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all cursor-pointer shadow disabled:opacity-40"
            >
              {isEn ? 'Remove 2 medians (Even)' : 'Xoá 2 giữa (Dãy chẵn)'}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VẬN DỤNG (SGK Trang 118)
      ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Vận dụng 1: n số tự nhiên chẵn đầu tiên */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
              {isEn ? 'APPLICATION 1 • PAGE 118' : 'VẬN DỤNG 1 • TRANG 118'}
            </span>
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
            {isEn
              ? 'Generate and print first n non-negative even integers'
              : 'Tạo và in ra màn hình dãy n số tự nhiên chẵn đầu tiên'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {isEn
              ? 'Non-negative even numbers: 0, 2, 4, 6, 8, ... generated automatically via loop and append(2 * i).'
              : 'Các số tự nhiên chẵn: 0, 2, 4, 6, 8, ... được sinh tự động bằng vòng lặp và lệnh append(2 * i).'}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">{isEn ? 'Enter n:' : 'Nhập n:'}</span>
            <input
              type="number"
              min={1}
              max={25}
              value={vd1N}
              onChange={e => setVd1N(parseInt(e.target.value, 10))}
              className="w-16 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono font-bold focus:outline-none"
            />
            <button
              type="button"
              onClick={handleRunVd1}
              className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer shadow"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isEn ? 'Generate Sequence' : 'Tạo dãy'}</span>
            </button>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <div className="text-slate-400 text-[11px] mb-1">
              {isEn ? `First ${vd1N} even numbers:` : `Dãy ${vd1N} số chẵn đầu tiên:`}
            </div>
            <div className="text-amber-400 font-bold">
              [{vd1List.join(', ')}]
            </div>
          </div>
        </div>

        {/* Vận dụng 2: Dãy Fibonacci */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-pink-500/20 text-pink-600 dark:text-pink-400">
              {isEn ? 'APPLICATION 2 • PAGE 118' : 'VẬN DỤNG 2 • TRANG 118'}
            </span>
          </div>
          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
            {isEn
              ? 'Fibonacci Sequence: F₀ = 0, F₁ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂'
              : 'Dãy Fibonacci: F₀ = 0, F₁ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂'}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {isEn
              ? 'Enter integer n from keyboard, generate and print first n Fibonacci numbers.'
              : 'Nhập số nguyên n từ bàn phím, tạo và in ra n số hạng đầu tiên của dãy số Fibonacci kinh điển.'}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">{isEn ? 'Enter n:' : 'Nhập n:'}</span>
            <input
              type="number"
              min={1}
              max={25}
              value={vd2N}
              onChange={e => setVd2N(parseInt(e.target.value, 10))}
              className="w-16 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono font-bold focus:outline-none"
            />
            <button
              type="button"
              onClick={handleRunVd2}
              className="flex items-center gap-1 bg-pink-600 hover:bg-pink-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer shadow"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isEn ? 'Generate Fibonacci' : 'Tạo Fibonacci'}</span>
            </button>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
            <div className="text-slate-400 text-[11px] mb-1">
              {isEn ? `First ${vd2N} Fibonacci numbers:` : `Dãy ${vd2N} số Fibonacci đầu tiên:`}
            </div>
            <div className="text-pink-400 font-bold">
              [{vd2List.join(', ')}]
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ GUIDANCE CARD: Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-900/60 via-indigo-900/40 to-slate-900 border-2 border-indigo-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {isEn
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài 23 (10 Câu)'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz and earn your verified Certificate for Lesson 23, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành Bài 23, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
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
