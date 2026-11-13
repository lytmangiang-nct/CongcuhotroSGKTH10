import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  BookOpen,
  Layers,
  Sparkles,
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  Code,
  Hash,
  ArrowRight
} from 'lucide-react';

export const Section22ListConcept: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  // Interactive Live List State
  const [userList, setUserList] = useState<any[]>([1, 0, "One", 9, 15, "Two", true, false]);
  const [accessIndex, setAccessIndex] = useState<number>(2);
  const [accessResult, setAccessResult] = useState<string>('"One"');
  const [accessError, setAccessError] = useState<string | null>(null);

  // Modification controls
  const [modIdx, setModIdx] = useState<number>(1);
  const [modVal, setModVal] = useState<string>('"Apple"');

  // Question 1 Củng cố answers
  const [q1Answers, setQ1Answers] = useState<{ [key: string]: string }>({
    a: '',
    b: '',
    c: '',
    d: ''
  });
  const [q1Checked, setQ1Checked] = useState<boolean | null>(null);

  // Question 2 Củng cố expansion
  const [expandedQ2, setExpandedQ2] = useState<string | null>('a');

  // Handle index access
  const handleAccess = (idx: number) => {
    setAccessIndex(idx);
    if (idx < 0 || idx >= userList.length) {
      setAccessError(
        isEn
          ? `IndexError: list index out of range (Index ${idx} is outside bounds 0 .. ${userList.length - 1})`
          : `IndexError: list index out of range (Chỉ số ${idx} vượt quá vùng 0 .. ${userList.length - 1})`
      );
      setAccessResult('');
    } else {
      setAccessError(null);
      const val = userList[idx];
      setAccessResult(typeof val === 'string' ? `"${val}"` : String(val));
    }
  };

  // Handle modifying element
  const handleModify = () => {
    if (modIdx < 0 || modIdx >= userList.length) {
      setAccessError(isEn ? `IndexError: Cannot assign at index ${modIdx}` : `IndexError: Không thể gán tại chỉ số ${modIdx}`);
      return;
    }
    let parsed: any = modVal.trim();
    if (parsed.startsWith('"') && parsed.endsWith('"')) {
      parsed = parsed.slice(1, -1);
    } else if (!isNaN(Number(parsed)) && parsed !== '') {
      parsed = Number(parsed);
    }
    const updated = [...userList];
    updated[modIdx] = parsed;
    setUserList(updated);
    handleAccess(modIdx);
  };

  // Handle delete element
  const handleDelete = (idx: number) => {
    if (userList.length <= 1) return;
    const updated = userList.filter((_, i) => i !== idx);
    setUserList(updated);
    const newIdx = Math.max(0, idx - 1);
    setAccessIndex(newIdx);
    handleAccess(newIdx);
  };

  // Check Củng cố 1
  const handleCheckQ1 = () => {
    const isA = q1Answers.a.trim() === '1';
    const isB = q1Answers.b.trim().toLowerCase() === '"one"' || q1Answers.b.trim().toLowerCase() === "'one'" || q1Answers.b.trim().toLowerCase() === 'one';
    const isC = q1Answers.c.trim().toLowerCase() === 'false';
    const isD = q1Answers.d.trim().toLowerCase().includes('lỗi') || q1Answers.d.trim().toLowerCase().includes('indexerror') || q1Answers.d.trim().toLowerCase().includes('out of range') || q1Answers.d.trim().toLowerCase().includes('error');
    setQ1Checked(isA && isB && isC && isD);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SGK Header Banner */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-200 text-sm font-semibold tracking-wide uppercase mb-1">
            <Layers className="w-4 h-4" />
            <span>
              {isEn
                ? 'Section 1 • Informatics 10 KNTT — Pages 111 & 112'
                : 'Mục 1 • SGK Tin học 10 Kết nối tri thức — Trang 111 & 112'}
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {isEn ? '1. PYTHON LIST DATA TYPE' : '1. KIỂU DỮ LIỆU DANH SÁCH'}
          </h2>
          <p className="text-cyan-100 text-sm mt-1">
            {isEn
              ? 'List definition, zero-based indexing, len() function, item assignment, del statement, empty lists, and concatenation (+).'
              : 'Khái niệm kiểu list, chỉ số đánh từ 0, hàm len(), thay đổi bằng gán, xoá phần tử bằng del, danh sách rỗng và phép ghép (+).'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(111);
            setShowOriginalModal(true);
          }}
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/20 transition-all backdrop-blur-sm shadow cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4 text-cyan-300" />
          <span>{isEn ? 'View Textbook Pages 111 – 112' : 'Xem trang 111 - 112 gốc'}</span>
        </button>
      </div>

      {/* Hoạt động 1: Khởi tạo và tìm hiểu dữ liệu kiểu danh sách */}
      <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-cyan-600 text-white font-bold text-xs rounded-full uppercase">
            {isEn ? 'Activity 1' : 'Hoạt động 1'}
          </span>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {isEn
              ? 'Initializing, Accessing, Mutating and Deleting Elements in a List'
              : 'Khởi tạo, truy cập, thay đổi giá trị và xoá một phần tử trong danh sách'}
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div className="text-slate-500 mb-1">
                # {isEn ? 'Example 1 (Page 111): Initialization and index access' : 'Ví dụ 1 SGK Trang 111: Khởi tạo và truy cập chỉ số'}
              </div>
              <div className="text-cyan-400">&gt;&gt;&gt; A = [1, 2, 3, 4, 5]</div>
              <div className="text-cyan-400">&gt;&gt;&gt; B = [1.5, 2, "Python", "List", 0]</div>
              <div className="text-yellow-300">&gt;&gt;&gt; A[0]</div>
              <div className="text-emerald-400">1</div>
              <div className="text-yellow-300">&gt;&gt;&gt; B[2]</div>
              <div className="text-emerald-400">'Python'</div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 dark:border-cyan-900 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <div className="font-bold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span>{isEn ? 'List initialization syntax in Python:' : 'Cú pháp khởi tạo danh sách trong Python:'}</span>
              </div>
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono font-bold text-cyan-600 dark:text-cyan-400 text-center text-sm">
                &lt;{isEn ? 'list_name' : 'tên list'}&gt; = [&lt;v₁&gt;, &lt;v₂&gt;, ..., &lt;vₙ&gt;]
              </div>
              <p>
                {isEn
                  ? 'Key advantage compared to fixed arrays: Python list elements can hold heterogeneous data types (integers, floats, strings, booleans together).'
                  : 'Khác biệt lớn so với kiểu mảng trong C/Pascal: các phần tử trong danh sách Python có thể có kiểu dữ liệu khác nhau (vừa có số nguyên, số thực, vừa có xâu, bool).'}
              </p>
            </div>
          </div>

          {/* Ví dụ 2 & Ví dụ 3 */}
          <div className="space-y-4">
            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
              <div className="text-slate-500 mb-1">
                # {isEn ? 'Examples 2 & 3 (Pages 111 & 112): len(), assignment, del & concat' : 'Ví dụ 2 & 3 SGK Trang 111 & 112: len(), gán và del'}
              </div>
              <div className="text-cyan-400">&gt;&gt;&gt; A = [1, 2, 3, 4, 5]</div>
              <div className="text-yellow-300">&gt;&gt;&gt; len(A)  <span className="text-slate-500"># {isEn ? 'Length of list' : 'Hàm tính độ dài danh sách'}</span></div>
              <div className="text-emerald-400">5</div>
              <div className="text-cyan-400 mt-1">&gt;&gt;&gt; A[1] = "One"  <span className="text-slate-500"># {isEn ? 'Assign new value at index 1' : 'Gán thay đổi phần tử chỉ số 1'}</span></div>
              <div className="text-yellow-300">&gt;&gt;&gt; A</div>
              <div className="text-emerald-400">[1, 'One', 3, 4, 5]</div>
              <div className="text-cyan-400 mt-1">&gt;&gt;&gt; del A[4]  <span className="text-slate-500"># {isEn ? 'Delete element at index 4' : 'Xoá phần tử tại chỉ số 4'}</span></div>
              <div className="text-yellow-300">&gt;&gt;&gt; A</div>
              <div className="text-emerald-400">[1, 'One', 3, 4]</div>
              <div className="text-cyan-400 mt-2">&gt;&gt;&gt; a = []  <span className="text-slate-500"># {isEn ? 'Empty list: len = 0' : 'Danh sách rỗng: len = 0'}</span></div>
              <div className="text-cyan-400">&gt;&gt;&gt; [1, 2] + [3, 4, 5, 6]  <span className="text-slate-500"># {isEn ? 'List concatenation (+)' : 'Phép ghép nối (+)'}</span></div>
              <div className="text-emerald-400">[1, 2, 3, 4, 5, 6]</div>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 text-xs flex items-center gap-2.5 text-amber-900 dark:text-amber-200">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                <strong>{isEn ? 'Index Warning:' : 'Cảnh báo chỉ số:'}</strong>{' '}
                {isEn ? (
                  <>List length is <code className="font-mono font-bold">len(A)</code>, but valid indices only run from <code className="font-mono font-bold">0</code> to <code className="font-mono font-bold">len(A) - 1</code>!</>
                ) : (
                  <>Độ dài danh sách là <code className="font-mono font-bold">len(A)</code>, nhưng chỉ số chỉ chạy từ <code className="font-mono font-bold">0</code> đến <code className="font-mono font-bold">len(A) - 1</code>!</>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ghi nhớ 1 Box (SGK Trang 112) */}
      <div className="border-2 border-dashed border-cyan-400 dark:border-cyan-600/60 bg-cyan-50/70 dark:bg-cyan-950/20 rounded-2xl p-6 relative">
        <div className="absolute -top-3 left-6 px-3 py-0.5 bg-cyan-600 text-white font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
          <BookOpen className="w-3.5 h-3.5" />
          <BilingualText
            vi="Ghi nhớ 1 (SGK Trang 112)"
            en="Key Takeaway 1 (Textbook Page 112)"
          />
        </div>
        <ul className="text-cyan-950 dark:text-cyan-100 text-sm md:text-base leading-relaxed space-y-3 mt-1">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
            <div className="flex-1">
              <BilingualText
                vi="List là kiểu dữ liệu danh sách (dãy, mảng) trong Python. Tạo list bằng lệnh gán với các phần tử trong cặp dấu ngoặc vuông []. Các phần tử của danh sách có thể có các kiểu dữ liệu khác nhau. Truy cập hoặc thay đổi giá trị của từng phần tử thông qua chỉ số: <danh sách>[<chỉ số>]."
                en="List is an ordered sequence data type in Python. Lists are instantiated using brackets [] containing comma-separated elements. Elements can possess heterogeneous data types. Access or mutate individual items via indexing: <list>[<index>]."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
            <div className="flex-1">
              <BilingualText
                vi="Chỉ số của danh sách bắt đầu từ 0 đến len() - 1, trong đó len() là lệnh tính độ dài danh sách."
                en="List indexing is zero-based, running from 0 up to len() - 1, where len() returns the total count of elements."
              />
            </div>
          </li>
        </ul>
      </div>

      {/* Interactive List Sandbox */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm mb-1">
          <Sparkles className="w-4 h-4" />
          <span>{isEn ? 'Interactive Laboratory (List Sandbox)' : 'Phòng thí nghiệm tương tác (List Sandbox)'}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
          {isEn ? 'Dynamic List Memory Simulation A' : 'Mô phỏng bộ nhớ danh sách động A'}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {isEn
            ? 'Click any index slot to access its value, modify content or delete elements:'
            : 'Nhấp chuột vào từng ô chỉ số để truy cập giá trị, sửa đổi nội dung hoặc xoá phần tử:'}
        </p>

        {/* Visual Memory Strip */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto mb-5">
          <div className="text-xs text-slate-400 font-mono mb-3 flex items-center justify-between">
            <span>{isEn ? 'Current list:' : 'Danh sách hiện tại:'} len(A) = {userList.length}</span>
            <span className="text-amber-400 font-semibold">{isEn ? 'Max index:' : 'Chỉ số tối đa:'} {userList.length - 1}</span>
          </div>

          <div className="flex items-end gap-2 min-w-max pb-2">
            {userList.map((val, idx) => {
              const isSelected = idx === accessIndex;
              const valStr = typeof val === 'string' ? `"${val}"` : String(val);

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span className={`text-[11px] font-mono font-bold ${isSelected ? 'text-amber-400 scale-110' : 'text-slate-500'}`}>
                    [{idx}]
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAccess(idx)}
                    className={`min-w-16 h-16 px-3 rounded-xl border flex flex-col items-center justify-center font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg ring-2 ring-amber-500/40 scale-105'
                        : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-cyan-400'
                    }`}
                  >
                    <span className="text-sm font-bold truncate max-w-20">{valStr}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">{typeof val}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(idx)}
                    className="text-[10px] text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-0.5 pt-1 cursor-pointer"
                    title={`del A[${idx}]`}
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>del</span>
                  </button>
                </div>
              );
            })}

            {/* Out of range ghost slot for testing */}
            <div className="flex flex-col items-center gap-1.5 opacity-60">
              <span className="text-[11px] font-mono text-rose-400 font-bold">
                [{userList.length}]
              </span>
              <button
                type="button"
                onClick={() => handleAccess(userList.length)}
                className="min-w-16 h-16 px-2 rounded-xl border-2 border-dashed border-rose-500/40 bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 flex flex-col items-center justify-center font-mono text-xs text-center cursor-pointer"
                title={isEn ? 'Click to trigger out of range error A[len(A)]' : 'Bấm để thử lỗi vượt quá chỉ số A[len(A)]'}
              >
                <span>A[len]</span>
                <span className="text-[9px] text-rose-400 font-bold">IndexError</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Terminal Feedback */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-cyan-400 font-bold">&gt;&gt;&gt; A[{accessIndex}]</span>
            <span className="text-slate-500 text-[11px]">{isEn ? 'Current accessed index' : 'Chỉ số đang truy xuất'}</span>
          </div>

          {accessError ? (
            <div className="text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/60 font-sans">
              <strong>{accessError}</strong>
            </div>
          ) : (
            <div className="text-emerald-400 text-sm font-bold pl-4">
              {accessResult}
            </div>
          )}
        </div>

        {/* Quick controls: Modify and Concat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          {/* Modify A[i] = val */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <span className="font-mono text-slate-500">A[</span>
            <input
              type="number"
              min={0}
              max={userList.length - 1}
              value={modIdx}
              onChange={e => setModIdx(Number(e.target.value))}
              className="w-12 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-1.5 py-0.5 text-center font-mono"
            />
            <span className="font-mono text-slate-500">] =</span>
            <input
              type="text"
              value={modVal}
              onChange={e => setModVal(e.target.value)}
              className="w-24 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-0.5 font-mono"
            />
            <button
              type="button"
              onClick={handleModify}
              className="ml-auto bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-3 py-1 rounded-lg shadow-sm cursor-pointer"
            >
              {isEn ? 'Assign' : 'Gán'}
            </button>
          </div>

          {/* Reset button */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-slate-600 dark:text-slate-400">
              {isEn ? 'Restore standard textbook list:' : 'Khôi phục danh sách chuẩn SGK:'}
            </span>
            <button
              type="button"
              onClick={() => {
                setUserList([1, 0, "One", 9, 15, "Two", true, false]);
                setAccessIndex(2);
                setAccessResult('"One"');
                setAccessError(null);
              }}
              className="flex items-center gap-1 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 px-3 py-1 rounded-lg cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isEn ? 'Reset' : 'Đặt lại'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Câu hỏi củng cố Mục 1 (SGK Trang 112) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <span>{isEn ? 'Checkpoint Questions for Section 1 (Page 112)' : 'Câu hỏi củng cố Mục 1 (SGK Trang 112)'}</span>
        </div>

        {/* Câu 1 */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
          <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">
            {isEn ? (
              <>1. Given list <code className="font-mono text-cyan-600">A = [1, 0, "One", 9, 15, "Two", True, False]</code>. State the evaluation results:</>
            ) : (
              <>1. Cho danh sách <code className="font-mono text-cyan-600">A = [1, 0, "One", 9, 15, "Two", True, False]</code>. Hãy cho biết giá trị các phần tử:</>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { key: 'a', label: 'a) A[0]', placeholder: isEn ? 'Value of A[0]' : 'Nhập giá trị A[0]' },
              { key: 'b', label: 'b) A[2]', placeholder: isEn ? 'Value of A[2]' : 'Nhập giá trị A[2]' },
              { key: 'c', label: 'c) A[7]', placeholder: isEn ? 'Value of A[7]' : 'Nhập giá trị A[7]' },
              { key: 'd', label: 'd) A[len(A)]', placeholder: isEn ? 'Value or Error?' : 'Giá trị hay Báo lỗi?' }
            ].map(item => (
              <div key={item.key} className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                  {item.label}
                </label>
                <input
                  type="text"
                  value={q1Answers[item.key]}
                  onChange={e => setQ1Answers({ ...q1Answers, [item.key]: e.target.value })}
                  placeholder={item.placeholder}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleCheckQ1}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              {isEn ? 'Check Question 1' : 'Kiểm tra câu 1'}
            </button>

            {q1Checked !== null && (
              <div className={`text-xs font-semibold flex items-center gap-1.5 ${q1Checked ? 'text-emerald-600' : 'text-rose-500'}`}>
                {q1Checked ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {isEn
                        ? "Explanation: A[0]=1, A[2]='One', A[7]=False, A[len(A)] triggers IndexError!"
                        : "Giải thích: A[0]=1, A[2]='One', A[7]=False, A[len(A)] báo lỗi IndexError!"}
                    </span>
                  </>
                ) : (
                  <span>{isEn ? 'Incorrect, please try again!' : 'Chưa chính xác, hãy thử lại!'}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Câu 2 */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-3">
          <div className="font-semibold text-sm text-slate-800 dark:text-slate-200">
            {isEn
              ? '2. Assuming A is a list of numbers, what does each command accomplish?'
              : '2. Giả sử A là một danh sách các số, mỗi lệnh sau thực hiện công việc gì?'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'a',
                cmd: 'A = A + [10]',
                ansVi: 'Thêm phần tử 10 vào cuối danh sách A bằng phép toán ghép danh sách (+).',
                ansEn: 'Appends element 10 to the end of list A via list concatenation (+).'
              },
              {
                id: 'b',
                cmd: 'del A[0]',
                ansVi: 'Xoá phần tử đầu tiên của danh sách (phần tử tại vị trí chỉ số 0).',
                ansEn: 'Deletes the first element of the list (element at index 0).'
              },
              {
                id: 'c',
                cmd: 'A = [100] + A',
                ansVi: 'Thêm phần tử 100 vào đầu danh sách A bằng phép toán ghép danh sách (+).',
                ansEn: 'Prepends element 100 to the beginning of list A via list concatenation (+).'
              },
              {
                id: 'd',
                cmd: 'A = A[1]*25',
                ansVi: 'Lấy giá trị phần tử thứ hai (A[1]) nhân với 25 rồi gán ngược lại cho biến A (chuyển biến A từ danh sách thành số nguyên!).',
                ansEn: 'Multiplies the second element A[1] by 25 and reassigns to variable A (turns A from list into integer!).'
              }
            ].map(item => (
              <div
                key={item.id}
                onClick={() => setExpandedQ2(item.id)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  expandedQ2 === item.id
                    ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-400 dark:border-cyan-700 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="font-mono font-bold text-xs text-cyan-600 dark:text-cyan-400 mb-1">
                  {item.id}) {item.cmd}
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  {isEn ? item.ansEn : item.ansVi}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
