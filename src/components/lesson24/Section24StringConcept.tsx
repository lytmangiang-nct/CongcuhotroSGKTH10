import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import {
  Type,
  BookOpen,
  Terminal,
  Lock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Info,
  Check,
  RotateCcw
} from 'lucide-react';

export const Section24StringConcept: React.FC = () => {
  const { setOriginalPageTarget, setShowOriginalModal, bilingualMode } = useBook();

  // Interactive String Inspector Sandbox
  const [inspectStr, setInspectStr] = useState<string>('Thời khoá biểu');
  const [inspectIdx, setInspectIdx] = useState<number>(0);
  const [simulatedError, setSimulatedError] = useState<string | null>(null);

  const handleAttemptMutation = (idx: number, newChar: string) => {
    setSimulatedError(
      `Traceback (most recent call last):\n  File "<pyshell#15>", line 1, in <module>\n    s[${idx}] = "${newChar}"\nTypeError: 'str' object does not support item assignment`
    );
  };

  // Củng cố 1 & 2 interactive states
  const [q1State, setQ1State] = useState<Record<string, boolean | null>>({
    a: null,
    b: null,
    c: null,
    d: null
  });
  const [showQ2Lengths, setShowQ2Lengths] = useState<boolean>(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-linear-to-r from-cyan-900/30 via-slate-900 to-slate-900 border border-cyan-500/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
              {bilingualMode === 'en' ? 'SECTION 1 • PAGES 119 – 120 SGK' : 'MỤC 1 • TRANG 119 – 120 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            <BilingualText
              vi="1. Xâu Là Một Dãy Các Kí Tự"
              en="1. Strings: An Ordered Sequence of Characters"
            />
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {bilingualMode === 'en'
              ? 'Zero-based indexing, len() function, immutability property, and empty string ""'
              : 'Chỉ số đánh số từ 0, hàm len(), tính bất biến immutable và xâu rỗng ""'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(119);
            setShowOriginalModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all shrink-0 cursor-pointer self-start sm:self-center"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{bilingualMode === 'en' ? 'Compare SGK Page 119' : 'Đối chiếu SGK Trang 119'}</span>
        </button>
      </div>

      {/* Hoạt động 1: Cấu trúc của xâu kí tự */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
            HĐ1
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              <BilingualText
                vi="Hoạt động 1: Tìm hiểu cấu trúc của xâu kí tự"
                en="Activity 1: Exploring String Data Structure & Indexing"
              />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {bilingualMode === 'en'
                ? 'Observe string indexing and understand key differences between immutable strings and mutable lists.'
                : 'Quan sát ví dụ cấu trúc xâu kí tự và so sánh sự khác nhau cơ bản giữa xâu (string) và danh sách (list).'}
            </p>
          </div>
        </div>

        {/* Ví dụ 1 & Ví dụ 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ví dụ 1 */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <div className="text-slate-400 font-sans font-bold text-[11px] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {bilingualMode === 'en'
                  ? 'Example 1 (Textbook Page 119): Accessing individual characters'
                  : 'Ví dụ 1 (SGK Trang 119): Truy cập từng kí tự'}
              </span>
            </div>
            <div className="text-cyan-400">&gt;&gt;&gt; s = "Thời khoá biểu"</div>
            <div className="text-slate-200">&gt;&gt;&gt; len(s)</div>
            <div className="text-amber-300 font-bold">14</div>
            <div className="text-slate-400 text-[11px] italic">
              {bilingualMode === 'en'
                ? '# len() function calculates the length or character count of the string'
                : '# Lệnh len() tính độ dài hoặc số lượng kí tự trong xâu'}
            </div>
            <div className="text-slate-200">&gt;&gt;&gt; s[0]</div>
            <div className="text-emerald-400 font-bold">'T'</div>
            <div className="text-slate-400 text-[11px] italic">
              {bilingualMode === 'en'
                ? '# First character at index 0'
                : '# Kí tự đầu tiên tại chỉ số 0'}
            </div>
            <div className="text-slate-200">&gt;&gt;&gt; s[10]</div>
            <div className="text-emerald-400 font-bold">'b'</div>
          </div>

          {/* Ví dụ 2: Khác biệt List vs String */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <div className="text-slate-400 font-sans font-bold text-[11px] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>
                {bilingualMode === 'en'
                  ? 'Example 2 (Textbook Page 119): Strings are IMMUTABLE objects'
                  : 'Ví dụ 2 (SGK Trang 119): Xâu là đối tượng BẤT BIẾN'}
              </span>
            </div>
            <div className="text-teal-400">&gt;&gt;&gt; d = ["a", "b", "c"]</div>
            <div className="text-slate-200">&gt;&gt;&gt; d[0] = "A"  <span className="text-emerald-400">
              {bilingualMode === 'en' ? '# Valid with List!' : '# Hợp lệ với List!'}
            </span></div>
            <div className="text-slate-400">&gt;&gt;&gt; s = "abc"</div>
            <div className="text-rose-400">&gt;&gt;&gt; s[0] = "A"</div>
            <div className="text-rose-400 font-bold">
              TypeError: 'str' object does not support item assignment
            </div>
            <div className="text-slate-400 text-[11px] font-sans italic pt-1 border-t border-slate-800">
              {bilingualMode === 'en'
                ? '* Python does not allow modifying individual characters of a string after creation.'
                : '* Python không cho phép thay đổi từng kí tự của một xâu sau khi đã tạo.'}
            </div>
          </div>
        </div>

        {/* Bảng so sánh Xâu vs Danh sách */}
        <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800/40 text-xs space-y-2">
          <div className="font-bold text-cyan-900 dark:text-cyan-300">
            {bilingualMode === 'en'
              ? 'Core Comparison: Strings (str) vs Lists (list)'
              : 'Bảng so sánh cốt lõi: Xâu kí tự (str) và Danh sách (list)'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="font-bold text-cyan-600 dark:text-cyan-400">
                {bilingualMode === 'en' ? 'String (str)' : 'Xâu kí tự (String)'}
              </div>
              <div>
                • {bilingualMode === 'en' ? 'Initialization: Enclosed in quotes ' : 'Khởi tạo: Đặt trong nháy '}
                <code className="font-mono">""</code> {bilingualMode === 'en' ? 'or' : 'hoặc'} <code className="font-mono">''</code>
              </div>
              <div>
                • {bilingualMode === 'en' ? 'Indices: From ' : 'Chỉ số: Từ '}
                <code className="font-mono">0</code> {bilingualMode === 'en' ? 'to' : 'đến'} <code className="font-mono">len() - 1</code>
              </div>
              <div>
                • <strong className="text-rose-500">{bilingualMode === 'en' ? 'Immutable' : 'Bất biến (Immutable)'}</strong>: {bilingualMode === 'en' ? 'CANNOT modify individual characters ' : 'KHÔNG THỂ thay đổi từng kí tự '}<code className="font-mono">s[i] = ...</code>
              </div>
              <div>
                • {bilingualMode === 'en' ? 'Single char: No separate char type, a character is a string of ' : 'Kí tự riêng: Không có kiểu char riêng, kí tự là xâu có '}<code className="font-mono">len = 1</code>
              </div>
              <div>
                • {bilingualMode === 'en' ? 'Empty string: ' : 'Xâu rỗng: '}<code className="font-mono">empty = ""</code> (len = 0)
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="font-bold text-indigo-600 dark:text-indigo-400">
                {bilingualMode === 'en' ? 'List (list)' : 'Danh sách (List)'}
              </div>
              <div>
                • {bilingualMode === 'en' ? 'Initialization: Enclosed in square brackets ' : 'Khởi tạo: Đặt trong ngoặc vuông '}<code className="font-mono">[]</code>
              </div>
              <div>
                • {bilingualMode === 'en' ? 'Indices: From ' : 'Chỉ số: Từ '}
                <code className="font-mono">0</code> {bilingualMode === 'en' ? 'to' : 'đến'} <code className="font-mono">len() - 1</code>
              </div>
              <div>
                • <strong className="text-emerald-500">{bilingualMode === 'en' ? 'Mutable' : 'Khả biến (Mutable)'}</strong>: {bilingualMode === 'en' ? 'Allows in-place item assignment ' : 'Cho phép gán sửa '}<code className="font-mono">A[i] = ...</code>
              </div>
              <div>
                • {bilingualMode === 'en' ? 'Rich methods: ' : 'Phương thức phong phú: '}<code className="font-mono">append</code>, <code className="font-mono">insert</code>, <code className="font-mono">remove</code>, <code className="font-mono">clear</code>
              </div>
              <div>
                • {bilingualMode === 'en' ? 'Empty list: ' : 'Danh sách rỗng: '}<code className="font-mono">empty_list = []</code> (len = 0)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phòng Thí Nghiệm Soi Ký Tự Trực Quan (String Inspector Sandbox) */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base">
              {bilingualMode === 'en'
                ? 'String Inspector Laboratory (Unicode Memory Breakdown)'
                : 'Phòng Thí Nghiệm Soi Xâu Kí Tự (String Inspector)'}
            </h3>
          </div>
          <span className="text-xs text-slate-300">
            {bilingualMode === 'en'
              ? 'Zero-based indices and live TypeError verification'
              : 'Khảo sát chỉ số và kiểm chứng lỗi bất biến'}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              {bilingualMode === 'en'
                ? 'Enter string to inspect (Unicode characters, numbers, symbols):'
                : 'Nhập xâu kí tự cần khảo sát (tiếng Việt có dấu, số, ký tự đặc biệt):'}
            </label>
            <input
              type="text"
              value={inspectStr}
              onChange={e => {
                setInspectStr(e.target.value);
                setInspectIdx(0);
                setSimulatedError(null);
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Quick presets */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-slate-400">
              {bilingualMode === 'en' ? 'Textbook presets:' : 'Mẫu SGK:'}
            </span>
            <button
              type="button"
              onClick={() => {
                setInspectStr('Thời khoá biểu');
                setInspectIdx(0);
                setSimulatedError(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
            >
              "Thời khoá biểu" ({bilingualMode === 'en' ? 'Example 1' : 'Ví dụ 1'})
            </button>
            <button
              type="button"
              onClick={() => {
                setInspectStr('Tây Nguyên');
                setInspectIdx(0);
                setSimulatedError(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
            >
              "Tây Nguyên" ({bilingualMode === 'en' ? 'Checkpoint 1c' : 'Củng cố 1c'})
            </button>
            <button
              type="button"
              onClick={() => {
                setInspectStr('123&*()+-ABC');
                setInspectIdx(0);
                setSimulatedError(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
            >
              "123&*()+-ABC" ({bilingualMode === 'en' ? 'Checkpoint 1a' : 'Củng cố 1a'})
            </button>
            <button
              type="button"
              onClick={() => {
                setInspectStr('');
                setInspectIdx(0);
                setSimulatedError(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
            >
              "" ({bilingualMode === 'en' ? 'Empty string' : 'Xâu rỗng'})
            </button>
          </div>

          {/* Visual slot breakdown */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                {bilingualMode === 'en' ? 'Character memory slot breakdown:' : 'Bảng phân rã ô nhớ kí tự:'}
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                len(s) = {inspectStr.length}
              </span>
            </div>

            <div className="min-h-[85px] bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-2 overflow-x-auto">
              {inspectStr.length === 0 ? (
                <div className="text-slate-400 text-xs italic w-full text-center py-3">
                  {bilingualMode === 'en'
                    ? '(Empty string empty = "" — Length len = 0)'
                    : '(Xâu rỗng empty = "" — Độ dài len = 0)'}
                </div>
              ) : (
                Array.from(inspectStr).map((ch, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInspectIdx(idx);
                      setSimulatedError(null);
                    }}
                    className={`flex flex-col items-center shrink-0 p-2 rounded-xl border transition-all cursor-pointer ${
                      inspectIdx === idx
                        ? 'bg-cyan-600 text-white border-cyan-400 scale-105 shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-slate-400 mb-0.5">
                      [{idx}]
                    </span>
                    <span className="font-mono font-bold text-base w-7 h-7 flex items-center justify-center">
                      {ch === ' ' ? '␣' : ch}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Interactive Inspection Bar & Immutability test */}
          {inspectStr.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="text-slate-300">
                  {bilingualMode === 'en' ? 'Selected index: ' : 'Đang chọn chỉ số: '}
                  <strong className="text-cyan-400 font-mono">[{inspectIdx}]</strong>
                  {bilingualMode === 'en' ? ' — Character: ' : ' — Kí tự: '}
                  <strong className="text-white font-mono text-sm">
                    '{inspectStr[inspectIdx] === ' ' ? ' ' : inspectStr[inspectIdx]}'
                  </strong>
                  {inspectStr[inspectIdx] === ' ' && (
                    <span className="text-slate-400">
                      {' '}({bilingualMode === 'en' ? 'Space character' : 'Dấu cách khoảng trắng'})
                    </span>
                  )}
                </div>
                <div className="text-slate-400 text-[11px]">
                  {bilingualMode === 'en' ? 'Unicode code point: ' : 'Mã Unicode (code point): '}
                  <span className="font-mono text-amber-300">
                    U+{inspectStr.charCodeAt(inspectIdx).toString(16).toUpperCase()}
                  </span> ({inspectStr.charCodeAt(inspectIdx)})
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleAttemptMutation(inspectIdx, 'X')}
                className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow shrink-0"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {bilingualMode === 'en'
                    ? `Try assign s[${inspectIdx}] = "X"`
                    : `Thử gán s[${inspectIdx}] = "X"`}
                </span>
              </button>
            </div>
          )}

          {/* Error Message Box */}
          {simulatedError && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 font-mono text-xs text-rose-300 space-y-1.5 animate-in shake duration-300">
              <div className="font-bold flex items-center gap-1.5 text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span>
                  {bilingualMode === 'en' ? 'Live Python Exception:' : 'Lỗi Ngoại Lệ Python Trực Tiếp:'}
                </span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">{simulatedError}</pre>
              <div className="text-[11px] text-slate-300 font-sans pt-1 border-t border-rose-900/50">
                👉 <strong>{bilingualMode === 'en' ? 'Cause:' : 'Nguyên nhân:'}</strong>{' '}
                {bilingualMode === 'en'
                  ? 'Strings in Python are immutable data types. You cannot overwrite a character at any index in-place.'
                  : 'Xâu kí tự trong Python là kiểu dữ liệu bất biến (immutable). Ta không thể gán đè một kí tự tại vị trí bất kì.'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hộp Ghi nhớ 1 (SGK Trang 120) */}
      <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-dashed border-amber-500/40 space-y-2">
        <div className="flex items-center gap-2 font-black text-amber-500 text-sm tracking-wide uppercase">
          <BookOpen className="w-4 h-4" />
          <BilingualText
            vi="Ghi nhớ 1 (SGK Tin học 10 - Trang 120)"
            en="Summary Box 1 (Textbook Page 120)"
          />
        </div>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed list-disc list-inside">
          <li>
            <BilingualText
              vi="Xâu kí tự trong Python là dãy các kí tự Unicode."
              en="A string in Python is an ordered sequence of Unicode characters."
            />
          </li>
          <li>
            <BilingualText
              vi="Xâu có thể được coi là danh sách các kí tự nhưng không thay đổi từng kí tự của xâu."
              en="A string can be viewed as a sequence of characters, but individual characters cannot be mutated in place (immutable)."
            />
          </li>
          <li>
            <BilingualText
              vi="Truy cập từng kí tự của xâu qua chỉ số, chỉ số từ 0 đến len() - 1."
              en="Access individual characters via index, from 0 up to len() - 1."
            />
          </li>
        </ul>
      </div>

      {/* Câu hỏi củng cố Mục 1 (SGK Trang 120) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold text-sm">
              ?
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              {bilingualMode === 'en'
                ? 'Consolidation Questions 1 & 2 (Textbook Page 120)'
                : 'Câu hỏi củng cố 1 & 2 (SGK Trang 120)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(120);
              setShowOriginalModal(true);
            }}
            className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-semibold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Compare Page 120' : 'Đối chiếu Trang 120'}</span>
          </button>
        </div>

        {/* Câu 1: Tính hợp lệ */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            {bilingualMode === 'en'
              ? '1. Are the following character strings valid in Python? Select your answer:'
              : '1. Các xâu kí tự sau có hợp lệ không? Hãy bấm chọn phán đoán của em:'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              {
                key: 'a',
                expr: '"123&*()+-ABC"',
                isValid: true,
                noteVi: 'Hợp lệ: Đặt trong cặp nháy kép, chứa số và kí tự đặc biệt.',
                noteEn: 'Valid: Enclosed in double quotes, contains digits and special symbols.'
              },
              {
                key: 'b',
                expr: '"1010110&0101001"',
                isValid: true,
                noteVi: 'Hợp lệ: Đặt trong cặp nháy kép, chứa chữ số và dấu &.',
                noteEn: 'Valid: Enclosed in double quotes, contains binary digits and & symbol.'
              },
              {
                key: 'c',
                expr: '"Tây Nguyên"',
                isValid: true,
                noteVi: 'Hợp lệ: Đặt trong cặp nháy kép, chứa tiếng Việt Unicode và khoảng trắng.',
                noteEn: 'Valid: Enclosed in double quotes, contains Vietnamese Unicode characters and space.'
              },
              {
                key: 'd',
                expr: '11111111 = 256',
                isValid: false,
                noteVi: 'Không hợp lệ: Không có dấu nháy đơn hay kép, là cú pháp sai của lệnh gán.',
                noteEn: 'Invalid: Missing enclosing quotes; invalid assignment syntax.'
              }
            ].map(item => (
              <div
                key={item.key}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
              >
                <div className="font-mono font-bold text-slate-700 dark:text-slate-200">
                  {item.key}) {item.expr}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQ1State(prev => ({ ...prev, [item.key]: true }))}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      q1State[item.key] === true
                        ? item.isValid
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-rose-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {bilingualMode === 'en' ? 'Valid' : 'Hợp lệ'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setQ1State(prev => ({ ...prev, [item.key]: false }))}
                    className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      q1State[item.key] === false
                        ? !item.isValid
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-rose-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {bilingualMode === 'en' ? 'Invalid' : 'Không hợp lệ'}
                  </button>
                </div>
                {q1State[item.key] === item.isValid && (
                  <div className="text-[11px] font-medium text-emerald-500">
                    <strong>{bilingualMode === 'en' ? 'Textbook Explanation:' : 'Giải thích chuẩn SGK:'}</strong>{' '}
                    {bilingualMode === 'en' ? item.noteEn : item.noteVi}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Câu 2: Độ dài */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
              {bilingualMode === 'en'
                ? '2. What is the length of each valid string in Question 1?'
                : '2. Mỗi xâu hợp lệ ở Câu 1 có độ dài bằng bao nhiêu?'}
            </div>
            <button
              type="button"
              onClick={() => setShowQ2Lengths(v => !v)}
              className="text-xs text-cyan-500 dark:text-cyan-400 font-semibold hover:underline cursor-pointer"
            >
              {showQ2Lengths
                ? (bilingualMode === 'en' ? 'Hide Length Answers' : 'Ẩn đáp án độ dài')
                : (bilingualMode === 'en' ? 'Show SGK Length Answers' : 'Hiện đáp án độ dài SGK')}
            </button>
          </div>

          {showQ2Lengths && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="text-slate-400 font-sans">a) "123&*()+-ABC"</div>
                <div className="text-emerald-500 font-bold text-sm">
                  len = 13 {bilingualMode === 'en' ? 'characters' : 'kí tự'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="text-slate-400 font-sans">b) "1010110&0101001"</div>
                <div className="text-emerald-500 font-bold text-sm">
                  len = 15 {bilingualMode === 'en' ? 'characters' : 'kí tự'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="text-slate-400 font-sans">c) "Tây Nguyên"</div>
                <div className="text-emerald-500 font-bold text-sm">
                  len = 10 {bilingualMode === 'en' ? 'characters' : 'kí tự'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
