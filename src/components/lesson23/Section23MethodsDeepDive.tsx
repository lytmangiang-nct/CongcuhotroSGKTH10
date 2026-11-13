import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  Boxes,
  BookOpen,
  Trash2,
  PlusCircle,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Layers,
  ArrowRight,
  Info,
  Sparkles,
  Play
} from 'lucide-react';

export const Section23MethodsDeepDive: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive 4-method simulator state
  const [currentList, setCurrentList] = useState<any[]>([1, 2, 6, 10]);
  const [insertK, setInsertK] = useState<number>(2);
  const [insertVal, setInsertVal] = useState<string>('5');
  const [removeTarget, setRemoveTarget] = useState<string>('2');
  const [appendTarget, setAppendTarget] = useState<string>('20');
  const [consoleLog, setConsoleLog] = useState<string[]>([
    '>>> A = [1, 2, 6, 10]',
    isEn ? '# List initialized and ready for commands' : '# Danh sách đã sẵn sàng cho các lệnh'
  ]);
  const [lastActionExplain, setLastActionExplain] = useState<{ vi: string; en: string }>({
    vi: 'Ban đầu danh sách có 4 phần tử: [1, 2, 6, 10]',
    en: 'Initial list has 4 elements: [1, 2, 6, 10]'
  });
  const [isErrorState, setIsErrorState] = useState<boolean>(false);

  // Củng cố Interactive states
  const [c1Selected, setC1Selected] = useState<string | null>(null);
  const [c2Selected, setC2Selected] = useState<string | null>(null);

  // Method Handlers
  const handleClear = () => {
    setCurrentList([]);
    setIsErrorState(false);
    setLastActionExplain({
      vi: 'Lệnh A.clear() đã xoá sạch toàn bộ phần tử, A trở thành rỗng [].',
      en: 'A.clear() removed all elements; A is now an empty list [].'
    });
    setConsoleLog(prev => [
      ...prev,
      '>>> A.clear()',
      '>>> A',
      '[]'
    ]);
  };

  const handleRemove = () => {
    let parsed: any = removeTarget.trim();
    if (!isNaN(Number(parsed)) && parsed !== '') {
      parsed = Number(parsed);
    }

    const idx = currentList.indexOf(parsed);
    if (idx === -1) {
      setIsErrorState(true);
      setLastActionExplain({
        vi: `Lỗi ValueError: Giá trị ${parsed} không có trong danh sách! Lệnh A.remove(x) thất bại.`,
        en: `ValueError: Value ${parsed} is not in the list! Command A.remove(x) failed.`
      });
      setConsoleLog(prev => [
        ...prev,
        `>>> A.remove(${parsed})`,
        'Traceback (most recent call last):',
        '  File "<pyshell#25>", line 1, in <module>',
        `    A.remove(${parsed})`,
        `ValueError: list.remove(x): x not in list`
      ]);
      return;
    }

    setIsErrorState(false);
    const updated = [...currentList];
    updated.splice(idx, 1);
    setCurrentList(updated);
    setLastActionExplain({
      vi: `Đã xoá phần tử đầu tiên có giá trị ${parsed} tại chỉ số ${idx}. Các phần tử phía sau tự dồn sang trái!`,
      en: `Removed first occurrence of value ${parsed} at index ${idx}. Subsequent elements shifted left!`
    });
    setConsoleLog(prev => [
      ...prev,
      `>>> A.remove(${parsed})`,
      '>>> A',
      `[${updated.join(', ')}]`
    ]);
  };

  const handleInsert = () => {
    let parsed: any = insertVal.trim();
    if (!isNaN(Number(parsed)) && parsed !== '') {
      parsed = Number(parsed);
    }
    const k = Number(insertK);

    setIsErrorState(false);
    const updated = [...currentList];

    if (k < 0) {
      updated.unshift(parsed);
      setLastActionExplain({
        vi: `Quy tắc ngoài biên: k = ${k} < 0 -> Python chèn ${parsed} vào đầu danh sách (vị trí chỉ số 0)!`,
        en: `Boundary rule: k = ${k} < 0 -> Python prepends ${parsed} at index 0 (front of list)!`
      });
    } else if (k >= updated.length) {
      updated.push(parsed);
      setLastActionExplain({
        vi: `Quy tắc ngoài biên: k = ${k} > len() -> Python chèn ${parsed} vào cuối danh sách!`,
        en: `Boundary rule: k = ${k} > len() -> Python appends ${parsed} to the end of list!`
      });
    } else {
      updated.splice(k, 0, parsed);
      setLastActionExplain({
        vi: `Đã chèn giá trị ${parsed} vào chỉ số ${k}. Các phần tử từ vị trí ${k} được đẩy sang phải!`,
        en: `Inserted value ${parsed} at index ${k}. Elements from index ${k} shifted to the right!`
      });
    }

    setCurrentList(updated);
    setConsoleLog(prev => [
      ...prev,
      `>>> A.insert(${k}, ${parsed})`,
      '>>> A',
      `[${updated.join(', ')}]`
    ]);
  };

  const handleAppend = () => {
    let parsed: any = appendTarget.trim();
    if (!isNaN(Number(parsed)) && parsed !== '') {
      parsed = Number(parsed);
    }

    setIsErrorState(false);
    const updated = [...currentList, parsed];
    setCurrentList(updated);
    setLastActionExplain({
      vi: `Đã thêm phần tử ${parsed} vào cuối danh sách bằng lệnh append!`,
      en: `Appended element ${parsed} to the end of list using append()!`
    });
    setConsoleLog(prev => [
      ...prev,
      `>>> A.append(${parsed})`,
      '>>> A',
      `[${updated.join(', ')}]`
    ]);
  };

  const handleReset = () => {
    setCurrentList([1, 2, 6, 10]);
    setIsErrorState(false);
    setLastActionExplain({
      vi: 'Khôi phục danh sách chuẩn SGK: A = [1, 2, 6, 10]',
      en: 'Reset to standard textbook list: A = [1, 2, 6, 10]'
    });
    setConsoleLog(['>>> A = [1, 2, 6, 10]']);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-linear-to-r from-indigo-900/30 via-slate-900 to-slate-900 border border-indigo-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
              {bilingualMode === 'en' ? 'SECTION 2 • PAGES 116 – 117 SGK' : 'MỤC 2 • TRANG 116 – 117 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            <BilingualText
              vi="2. Một Số Lệnh Làm Việc Với Danh Sách"
              en="2. Common List Manipulation Methods in Python"
            />
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {bilingualMode === 'en'
              ? 'Deep dive into 4 essential list methods: clear(), remove(), insert(), and append()'
              : 'Chuyên sâu 4 phương thức thiết yếu: clear(), remove(), insert() và append()'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(116);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shrink-0 cursor-pointer self-start sm:self-center"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{bilingualMode === 'en' ? 'Compare SGK Page 116' : 'Đối chiếu SGK Trang 116'}</span>
        </button>
      </div>

      {/* 3 Ví dụ chuẩn SGK Trang 116 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ví dụ 1: clear() */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500/20 text-rose-500">
                {isEn ? 'Example 1' : 'Ví dụ 1'}
              </span>
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                {isEn ? 'clear() Method' : 'Phương thức clear()'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isEn
                ? 'Removes all elements from the list, returning it to an empty list [].'
                : 'Xoá toàn bộ các phần tử của một danh sách, đưa về rỗng [].'}
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <div className="text-emerald-400">&gt;&gt;&gt; A = [1,2,3,4,5]</div>
              <div className="text-slate-200">&gt;&gt;&gt; A.clear()</div>
              <div className="text-slate-200">&gt;&gt;&gt; A</div>
              <div className="text-amber-300 font-bold">[]</div>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 italic border-t border-slate-100 dark:border-slate-800 pt-2">
            {isEn
              ? '* After executing clear(), the original list becomes empty.'
              : '* Sau khi thực hiện lệnh clear(), danh sách gốc trở thành rỗng.'}
          </div>
        </div>

        {/* Ví dụ 2: remove(value) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-500/20 text-amber-500">
                {isEn ? 'Example 2' : 'Ví dụ 2'}
              </span>
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                {isEn ? 'remove(value) Method' : 'Phương thức remove(value)'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isEn
                ? 'Deletes the first occurrence of element with value; raises an exception if not found.'
                : 'Xoá phần tử đầu tiên có giá trị value; nếu không có sẽ báo lỗi ngoại lệ.'}
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <div className="text-emerald-400">&gt;&gt;&gt; A = [1,2,3,4,5]</div>
              <div className="text-slate-200">&gt;&gt;&gt; A.remove(1)</div>
              <div className="text-cyan-300 font-bold">[2, 3, 4, 5]</div>
              <div className="text-slate-200">&gt;&gt;&gt; A.remove(10)</div>
              <div className="text-rose-400 font-bold">ValueError: x not in list</div>
            </div>
          </div>
          <div className="text-[11px] text-rose-500 dark:text-rose-400 font-medium border-t border-slate-100 dark:border-slate-800 pt-2">
            {isEn
              ? '* Warning: Raises ValueError if target value is not present in list!'
              : '* Cảnh báo: Lệnh phát sinh ValueError nếu không tìm thấy giá trị!'}
          </div>
        </div>

        {/* Ví dụ 3: insert(index, value) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-500">
                {isEn ? 'Example 3' : 'Ví dụ 3'}
              </span>
              <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                {isEn ? 'insert(k, value) Method' : 'Phương thức insert(k, value)'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isEn
                ? 'Inserts value at index position and shifts subsequent elements to the right.'
                : 'Chèn giá trị vào vị trí index và đẩy các phần tử phía sau sang phải.'}
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <div className="text-emerald-400">&gt;&gt;&gt; A = [1, 2, 6, 10]</div>
              <div className="text-slate-200">&gt;&gt;&gt; A.insert(2, 5)</div>
              <div className="text-cyan-300 font-bold">[1, 2, 5, 6, 10]</div>
              <div className="text-slate-400 text-[10px]">&gt;&gt;&gt; A.insert(-10, 1) -&gt; {isEn ? 'Insert at head' : 'Chèn đầu'}</div>
              <div className="text-slate-400 text-[10px]">&gt;&gt;&gt; A.insert(100, 2) -&gt; {isEn ? 'Append at tail' : 'Chèn cuối'}</div>
            </div>
          </div>
          <div className="text-[11px] text-indigo-500 dark:text-indigo-400 font-medium border-t border-slate-100 dark:border-slate-800 pt-2">
            {isEn
              ? '* Boundary-safe: k < 0 inserts at start, k > len() appends at end.'
              : '* Không lỗi ngoài biên: k < 0 chèn đầu, k > len() chèn cuối.'}
          </div>
        </div>
      </div>

      {/* Phòng Thí Nghiệm Trực Quan 4 Phương Thức */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">
              {isEn ? 'Interactive 4-Method List Lab' : 'Phòng Thí Nghiệm Bộ Tứ Phương Thức Danh Sách'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEn ? 'Reset [1, 2, 6, 10]' : 'Khôi phục [1, 2, 6, 10]'}</span>
          </button>
        </div>

        {/* 3D-Like List Slots Visualizer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{isEn ? 'Current list in memory:' : 'Danh sách hiện tại trong bộ nhớ:'}</span>
            <span className="font-mono text-emerald-400 font-bold">
              len(A) = {currentList.length}
            </span>
          </div>

          <div className="min-h-[90px] bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-3 overflow-x-auto">
            {currentList.length === 0 ? (
              <div className="text-slate-500 text-xs italic flex items-center justify-center w-full py-4">
                {isEn
                  ? '(List is currently empty [] — Length len(A) = 0)'
                  : '(Danh sách đang rỗng [] — Độ dài len(A) = 0)'}
              </div>
            ) : (
              currentList.map((val, idx) => (
                <div
                  key={`${idx}-${val}`}
                  className="flex flex-col items-center shrink-0 animate-in zoom-in duration-200"
                >
                  <span className="text-[10px] font-mono font-bold text-slate-400 mb-1">
                    [{idx}]
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-b from-indigo-600 to-indigo-800 border-2 border-indigo-400 shadow-lg flex items-center justify-center text-white font-mono font-bold text-sm">
                    {String(val)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Action explanation message */}
          <div
            className={`p-3 rounded-xl text-xs font-medium border flex items-center gap-2 ${
              isErrorState
                ? 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                : 'bg-indigo-950/40 border-indigo-800/60 text-indigo-200'
            }`}
          >
            {isErrorState ? <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" /> : <Info className="w-4 h-4 shrink-0 text-indigo-400" />}
            <span>{isEn ? lastActionExplain.en : lastActionExplain.vi}</span>
          </div>
        </div>

        {/* 4 Interactive Method Toolbars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Method 1: insert(k, val) */}
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="font-bold text-amber-400 font-mono flex items-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>A.insert(k, x)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {isEn ? 'Insert x at index k and shift elements right.' : 'Chèn x vào chỉ số k và dồn phần tử.'}
              </p>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                <div>
                  <span className="text-[10px] text-slate-400">{isEn ? 'Index k:' : 'Vị trí k:'}</span>
                  <input
                    type="number"
                    value={insertK}
                    onChange={e => setInsertK(parseInt(e.target.value, 10))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">{isEn ? 'Value x:' : 'Giá trị x:'}</span>
                  <input
                    type="text"
                    value={insertVal}
                    onChange={e => setInsertVal(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleInsert}
              className="w-full py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-all cursor-pointer shadow"
            >
              {isEn ? 'Run insert()' : 'Chạy insert()'}
            </button>
          </div>

          {/* Method 2: remove(val) */}
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="font-bold text-rose-400 font-mono flex items-center gap-1.5">
                <Trash2 className="w-3.5 h-3.5" />
                <span>A.remove(x)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {isEn ? 'Find and remove first item equal to x.' : 'Tìm và xoá phần tử đầu tiên bằng x.'}
              </p>
              <div className="mt-2">
                <span className="text-[10px] text-slate-400">{isEn ? 'Value x to remove:' : 'Giá trị x cần xoá:'}</span>
                <input
                  type="text"
                  value={removeTarget}
                  onChange={e => setRemoveTarget(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-xs focus:outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="w-full py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all cursor-pointer shadow"
            >
              {isEn ? 'Run remove()' : 'Chạy remove()'}
            </button>
          </div>

          {/* Method 3: append(val) */}
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="font-bold text-indigo-400 font-mono flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5" />
                <span>A.append(x)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {isEn ? 'Append element x to the end of list.' : 'Bổ sung phần tử x vào đuôi danh sách.'}
              </p>
              <div className="mt-2">
                <span className="text-[10px] text-slate-400">{isEn ? 'New value x:' : 'Giá trị x thêm mới:'}</span>
                <input
                  type="text"
                  value={appendTarget}
                  onChange={e => setAppendTarget(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white font-mono text-xs focus:outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAppend}
              className="w-full py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all cursor-pointer shadow"
            >
              {isEn ? 'Run append()' : 'Chạy append()'}
            </button>
          </div>

          {/* Method 4: clear() */}
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="font-bold text-teal-400 font-mono flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>A.clear()</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {isEn ? 'Remove all elements, reverting to [].' : 'Xoá sạch toàn bộ phần tử về [].'}
              </p>
              <div className="text-[10px] text-slate-400 mt-3">
                {isEn
                  ? 'No arguments required, modifies the original list in place.'
                  : 'Không cần tham số, tác động trực tiếp vào danh sách gốc.'}
              </div>
            </div>
            <button
              type="button"
              onClick={handleClear}
              className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/60 text-rose-300 font-bold border border-rose-500/30 transition-all cursor-pointer shadow"
            >
              {isEn ? 'Run clear()' : 'Chạy clear()'}
            </button>
          </div>
        </div>

        {/* Live Terminal Log */}
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 max-h-36 overflow-y-auto space-y-1">
          {consoleLog.map((line, i) => (
            <div
              key={i}
              className={
                line.includes('ValueError')
                  ? 'text-rose-400 font-bold'
                  : line.startsWith('>>>')
                  ? 'text-teal-400'
                  : 'text-slate-300'
              }
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Hộp Ghi nhớ 2 (Bảng Tổng Hợp 4 Phương Thức - SGK Trang 117) */}
      <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border-2 border-dashed border-amber-300 dark:border-amber-500/40 space-y-4">
        <div className="flex items-center gap-2 font-black text-amber-950 dark:text-amber-300 text-sm tracking-wide uppercase">
          <BookOpen className="w-4 h-4" />
          <BilingualText
            vi="Ghi nhớ 2: Một số lệnh làm việc với dữ liệu danh sách (SGK Trang 117)"
            en="Summary Box 2: Essential Built-in List Methods (Page 117)"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-amber-300 dark:border-amber-500/40 text-amber-950 dark:text-amber-300 font-bold">
                <th className="py-2.5 px-4">
                  <BilingualText vi="Cú pháp phương thức" en="Method Syntax" />
                </th>
                <th className="py-2.5 px-4">
                  <BilingualText vi="Ý nghĩa & Tác dụng" en="Meaning & Effect" />
                </th>
                <th className="py-2.5 px-4">
                  <BilingualText vi="Ví dụ minh hoạ" en="Illustration Example" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-200 dark:divide-amber-500/20 text-slate-900 dark:text-slate-200">
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-indigo-700 dark:text-indigo-400">
                  A.append(x)
                </td>
                <td className="py-3 px-4">
                  <BilingualText
                    vi="Bổ sung phần tử x vào cuối danh sách A."
                    en="Appends element x to the end of list A."
                  />
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  [1, 2] + append(3) -&gt; [1, 2, 3]
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-amber-800 dark:text-amber-400">
                  A.insert(k, x)
                </td>
                <td className="py-3 px-4">
                  <BilingualText
                    vi="Chèn phần tử x vào vị trí k của danh sách A."
                    en="Inserts element x at index position k of list A."
                  />
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  [1, 6] + insert(1, 2) -&gt; [1, 2, 6]
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-teal-700 dark:text-teal-400">
                  A.clear()
                </td>
                <td className="py-3 px-4">
                  <BilingualText
                    vi="Xoá toàn bộ dữ liệu của danh sách A, đưa về rỗng."
                    en="Removes all elements from list A, making it an empty list."
                  />
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  [1, 2, 3] + clear() -&gt; []
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-mono font-bold text-rose-700 dark:text-rose-400">
                  A.remove(x)
                </td>
                <td className="py-3 px-4">
                  <BilingualText
                    vi="Xoá phần tử đầu tiên có giá trị x từ danh sách A (báo lỗi nếu x không có trong A)."
                    en="Removes the first occurrence of element x from list A (raises ValueError if not found)."
                  />
                </td>
                <td className="py-3 px-4 font-mono text-xs">
                  [1, 2, 1] + remove(1) -&gt; [2, 1]
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Câu hỏi củng cố Mục 2 (SGK Trang 117) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-500 flex items-center justify-center font-bold text-sm">
              ?
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              {isEn ? 'Consolidation Check: Section 2 (Page 117)' : 'Câu hỏi củng cố Mục 2 (SGK Trang 117)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(117);
              setShowOriginalModal(true);
            }}
            className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isEn ? 'Compare Page 117' : 'Đối chiếu Trang 117'}</span>
          </button>
        </div>

        {/* Củng cố 1 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {isEn ? (
              <>1. Under what condition do the two commands <code className="font-mono text-indigo-600 dark:text-indigo-400">A.append(1)</code> and <code className="font-mono text-indigo-600 dark:text-indigo-400">A.insert(0, 1)</code> produce the exact same outcome?</>
            ) : (
              <>1. Khi nào thì hai lệnh <code className="font-mono text-indigo-600 dark:text-indigo-400">A.append(1)</code> và <code className="font-mono text-indigo-600 dark:text-indigo-400">A.insert(0, 1)</code> có tác dụng giống nhau?</>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              {
                id: 'opt1',
                text: isEn ? 'When A has 1 element' : 'Khi A có 1 phần tử',
                isCorrect: false
              },
              {
                id: 'opt2',
                text: isEn ? 'When A is an empty list (A == [])' : 'Khi A là danh sách rỗng (A == [])',
                isCorrect: true
              },
              {
                id: 'opt3',
                text: isEn ? 'When list A = [2, 3]' : 'Khi danh sách A = [2, 3]',
                isCorrect: false
              }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setC1Selected(opt.id)}
                className={`p-3 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer border ${
                  c1Selected === opt.id
                    ? opt.isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-rose-600 text-white border-rose-500 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                }`}
              >
                {opt.text}
              </button>
            ))}
          </div>

          {c1Selected === 'opt2' && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-700 dark:text-emerald-300">
              <strong>{isEn ? 'Official Textbook Explanation:' : 'Giải thích chuẩn SGK:'}</strong>{' '}
              {isEn
                ? 'When list A is empty (A = []), the first position (index 0) is also the final position. Therefore, both commands add number 1 as the sole element, producing [1].'
                : 'Khi danh sách A rỗng (A = []), vị trí đầu tiên (chỉ số 0) cũng chính là vị trí cuối cùng. Do đó cả hai lệnh đều thêm số 1 vào danh sách và cho kết quả là [1].'}
            </div>
          )}
        </div>

        {/* Củng cố 2 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
            {isEn ? (
              <>2. List A before and after an <code className="font-mono text-indigo-600 dark:text-indigo-400">insert()</code> command was <code className="font-mono text-amber-500">[1, 4, 10, 0]</code> and <code className="font-mono text-emerald-500">[1, 4, 10, 5, 0]</code>. Which command was executed?</>
            ) : (
              <>2. Danh sách A trước và sau lệnh <code className="font-mono text-indigo-600 dark:text-indigo-400">insert()</code> là <code className="font-mono text-amber-500">[1, 4, 10, 0]</code> và <code className="font-mono text-emerald-500">[1, 4, 10, 5, 0]</code>. Lệnh đã dùng là gì?</>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { id: 'c2-1', code: 'A.insert(3, 5)', isCorrect: true },
              { id: 'c2-2', code: 'A.insert(4, 5)', isCorrect: false },
              { id: 'c2-3', code: 'A.insert(5, 3)', isCorrect: false }
            ].map(opt => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setC2Selected(opt.id)}
                className={`p-3 rounded-xl font-mono text-xs font-bold text-center transition-all cursor-pointer border ${
                  c2Selected === opt.id
                    ? opt.isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-rose-600 text-white border-rose-500 shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                }`}
              >
                {opt.code}
              </button>
            ))}
          </div>

          {c2Selected === 'c2-1' && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-700 dark:text-emerald-300">
              <strong>{isEn ? 'Official Textbook Explanation:' : 'Giải thích chuẩn SGK:'}</strong>{' '}
              {isEn
                ? 'In the sequence [1, 4, 10, 0], number 0 was at index 3. After insertion, number 5 takes the position of 0 and shifts 0 to index 4. Thus the command used was A.insert(3, 5).'
                : 'Trong dãy [1, 4, 10, 0], số 0 đang ở vị trí chỉ số 3. Sau khi chèn, số 5 đứng vào vị trí của số 0 và đẩy số 0 về sau (về chỉ số 4). Vậy lệnh thực hiện là A.insert(3, 5).'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
