import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  AlertTriangle,
  Layers,
  Code,
  Binary,
  Check,
  Terminal
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section18TypeConversion: React.FC = () => {
  const { bilingualMode } = useBook();

  // Activity 2 Live Inspector
  const [act2Var, setAct2Var] = useState<'n' | 'x' | 's' | 'b'>('n');

  // Page 98 Quick Test Interactive Answers
  const [testResults, setTestResults] = useState<{ [key: string]: boolean | null }>({
    a: null,
    b: null,
    c: null,
    d: null
  });

  // Type Converter Interactive Sandbox
  const [convInput, setConvInput] = useState<string>('123');
  const [convTarget, setConvTarget] = useState<'int' | 'float' | 'str'>('int');

  const evaluateConversion = (val: string, target: 'int' | 'float' | 'str') => {
    try {
      const clean = val.trim();
      if (target === 'int') {
        if (clean.includes('+') || clean.includes('-') && clean.indexOf('-') > 0 || clean.includes('*') || clean.includes('/')) {
          return { error: `ValueError: invalid literal for int() with base 10: '${clean}' (Chứa công thức / Contains expression)` };
        }
        if (clean.includes('.') || clean.includes(',')) {
          return { error: `ValueError: invalid literal for int() with base 10: '${clean}' (Không thể ép xâu số thực sang int trực tiếp / Cannot cast float string to int)` };
        }
        const num = Number(clean);
        if (isNaN(num)) {
          return { error: `ValueError: invalid literal for int() with base 10: '${clean}'` };
        }
        return { success: Math.trunc(num), type: "<class 'int'>" };
      } else if (target === 'float') {
        if (clean.includes('+') || clean.includes('*') || clean.includes('/') || clean.includes(',')) {
          return { error: `ValueError: could not convert string to float: '${clean}'` };
        }
        const num = Number(clean);
        if (isNaN(num)) {
          return { error: `ValueError: could not convert string to float: '${clean}'` };
        }
        return { success: num.toFixed(num % 1 === 0 ? 1 : undefined), type: "<class 'float'>" };
      } else {
        return { success: `'${clean}'`, type: "<class 'str'>" };
      }
    } catch {
      return { error: 'Lỗi chuyển đổi kiểu dữ liệu / Type conversion error' };
    }
  };

  const convResult = evaluateConversion(convInput, convTarget);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-6 border border-amber-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            <BilingualText
              vi="Mục 2 • Trang 98 – 100 SGK Tin học 10"
              en="Section 2 • Pages 98 – 100 Informatics 10"
            />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          <BilingualText
            vi="2. Chuyển đổi kiểu dữ liệu cơ bản của Python"
            en="2. Basic Data Type Conversion in Python"
          />
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          <BilingualText
            vi="Python có 4 kiểu dữ liệu cơ bản: số nguyên (int), số thực (float), xâu kí tự (str) và lôgic (bool). Để chuyển đổi linh hoạt giữa các kiểu dữ liệu và nhập số an toàn từ bàn phím, ta sử dụng các hàm chuyển đổi int(), float(), str() và kiểm tra kiểu bằng hàm type()."
            en="Python provides four fundamental data types: integer (int), float (float), string (str), and boolean (bool). To convert flexibly between data types and safely read numbers from the keyboard, use conversion functions int(), float(), str(), and type() inspection."
          />
        </p>
      </div>

      {/* 2. Hoạt động 2: Nhận biết kiểu dữ liệu của biến & Hàm type() (Trang 98) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Hoạt động 2: Nhận biết kiểu dữ liệu của biến bằng hàm type()"
                en="Activity 2: Inspecting Variable Data Types with type()"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="SGK Trang 98 – Gán đồng thời: n, x, s = 10, 1.8, 'One'"
                en="Page 98 – Multiple assignment: n, x, s = 10, 1.8, 'One'"
              />
            </p>
          </div>
        </div>

        {/* Interactive Type Inspector Table */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            {
              id: 'n',
              nameVi: 'Biến n',
              nameEn: 'Variable n',
              code: 'n = 10',
              typeClass: "<class 'int'>",
              meaningVi: 'Số nguyên (int)',
              meaningEn: 'Integer (int)',
              color: 'border-blue-500/40 bg-blue-950/30 text-blue-300'
            },
            {
              id: 'x',
              nameVi: 'Biến x',
              nameEn: 'Variable x',
              code: 'x = 1.8',
              typeClass: "<class 'float'>",
              meaningVi: 'Số thực (float)',
              meaningEn: 'Floating-point (float)',
              color: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
            },
            {
              id: 's',
              nameVi: 'Biến s',
              nameEn: 'Variable s',
              code: 's = "One"',
              typeClass: "<class 'str'>",
              meaningVi: 'Xâu kí tự (str)',
              meaningEn: 'String (str)',
              color: 'border-pink-500/40 bg-pink-950/30 text-pink-300'
            },
            {
              id: 'b',
              nameVi: 'Biến b',
              nameEn: 'Variable b',
              code: 'b = 10 > 3',
              typeClass: "<class 'bool'>",
              meaningVi: 'Lôgic (bool: True/False)',
              meaningEn: 'Boolean (bool: True/False)',
              color: 'border-amber-500/40 bg-amber-950/30 text-amber-300'
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setAct2Var(item.id as any)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                act2Var === item.id
                  ? `${item.color} ring-2 ring-cyan-400/30 shadow-lg scale-[1.02]`
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-semibold text-slate-300 mb-1">
                {bilingualMode === 'en' ? item.nameEn : item.nameVi}
              </div>
              <div className="font-mono text-xs font-bold text-white mb-2">{item.code}</div>
              <div className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 inline-block mb-1 font-bold">
                type({item.id}) → {item.typeClass}
              </div>
              <div className="text-[11px] text-slate-400">
                {bilingualMode === 'en' ? item.meaningEn : item.meaningVi}
              </div>
            </div>
          ))}
        </div>

        {/* IDLE Shell output view */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
          <div className="text-slate-500 pb-1 border-b border-slate-800 flex justify-between">
            <span>
              {bilingualMode === 'en'
                ? 'Python IDLE Interactive Shell (Page 98)'
                : 'Python IDLE Interactive Shell (Trang 98)'}
            </span>
            <span className="text-cyan-400">
              {bilingualMode === 'en' ? `Selected var: ${act2Var}` : `Biến đang chọn: ${act2Var}`}
            </span>
          </div>
          <div className="text-slate-300">
            <span className="text-amber-400">&gt;&gt;&gt; </span>n, x, s = 10, 1.8, "One"
          </div>
          <div className="text-slate-300">
            <span className="text-amber-400">&gt;&gt;&gt; </span>type({act2Var})
          </div>
          <div className="text-cyan-300 font-bold pl-4">
            {act2Var === 'n' &&
              (bilingualMode === 'en'
                ? "<class 'int'>  # Variable n belongs to int - integer type"
                : "<class 'int'>  # Biến n thuộc kiểu int - số nguyên")}
            {act2Var === 'x' &&
              (bilingualMode === 'en'
                ? "<class 'float'>  # Variable x belongs to float - floating point"
                : "<class 'float'>  # Biến x thuộc kiểu float - số thực")}
            {act2Var === 's' &&
              (bilingualMode === 'en'
                ? "<class 'str'>  # Variable s belongs to str - string"
                : "<class 'str'>  # Biến s thuộc kiểu str - xâu kí tự")}
            {act2Var === 'b' &&
              (bilingualMode === 'en'
                ? "<class 'bool'>  # Variable b belongs to bool - True boolean value"
                : "<class 'bool'>  # Biến b thuộc kiểu bool - giá trị True")}
          </div>
        </div>
      </div>

      {/* 3. Hộp Ghi nhớ 2A (Trang 98) */}
      <div className="rounded-2xl bg-amber-950/40 border-2 border-amber-400 p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-3 relative z-10">
          <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">
              <BilingualText
                vi="Ghi nhớ 2A (SGK Trang 98)"
                en="Key Summary 2A (Page 98)"
              />
            </h4>
            <ul className="text-amber-50 dark:text-amber-100 text-xs md:text-sm font-bold mt-2 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>
                <BilingualText
                  vi="Một số kiểu dữ liệu cơ bản của Python bao gồm: int (số nguyên), float (số thực), str (xâu kí tự), bool (lôgic)."
                  en="Fundamental primitive Python data types include: int (integer), float (floating-point), str (character string), bool (boolean logic)."
                />
              </li>
              <li>
                <BilingualText
                  vi="Lệnh type() dùng để nhận biết kiểu dữ liệu của biến trong Python."
                  en="The type() function is used to identify the data type of variables/expressions in Python."
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Câu hỏi kiểm tra nhanh Trang 98 SGK */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="font-bold text-white text-sm">
              <BilingualText
                vi="Câu hỏi SGK Trang 98: Xác định kiểu và giá trị của các biểu thức sau"
                en="Check Question Page 98: Identify type and value of expressions"
              />
            </h3>
            <span className="text-xs text-slate-400">
              <BilingualText
                vi="Bấm vào từng câu để kiểm tra lời giải chi tiết"
                en="Click each expression to reveal detailed explanation"
              />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              id: 'a',
              expr: '"15 + 20 - 7"',
              type: 'str',
              val: "'15 + 20 - 7'",
              explVi: 'Vì được đặt trong cặp dấu nháy kép "", Python coi đây là một xâu kí tự nguyên bản và KHÔNG thực hiện tính toán.',
              explEn: 'Enclosed in double quotes "", Python treats this as a literal character string and does NOT evaluate math.'
            },
            {
              id: 'b',
              expr: '32 > 45',
              type: 'bool',
              val: 'False',
              explVi: 'Phép so sánh quan hệ 32 > 45 cho kết quả Sai (False) thuộc kiểu lôgic bool.',
              explEn: 'Relational comparison 32 > 45 yields False, belonging to the bool type.'
            },
            {
              id: 'c',
              expr: '13 != 8 + 5',
              type: 'bool',
              val: 'False',
              explVi: 'Phép cộng tính trước: 8 + 5 = 13. Phép so sánh khác 13 != 13 là Sai (False) vì hai bên bằng nhau.',
              explEn: 'Addition evaluated first: 8 + 5 = 13. Comparison 13 != 13 yields False since both sides are equal.'
            },
            {
              id: 'd',
              expr: '1 == 2',
              type: 'bool',
              val: 'False',
              explVi: 'Phép so sánh bằng 1 == 2 là Sai (False) thuộc kiểu lôgic bool.',
              explEn: 'Equality check 1 == 2 evaluates to False, belonging to the bool type.'
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setTestResults((prev) => ({
                  ...prev,
                  [item.id]: !prev[item.id]
                }))
              }
              className="cursor-pointer p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-300">
                  {item.id}) {item.expr}
                </span>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {testResults[item.id]
                    ? bilingualMode === 'en'
                      ? 'Hide'
                      : 'Ẩn đáp án'
                    : bilingualMode === 'en'
                      ? 'Reveal'
                      : 'Xem đáp án'}
                </span>
              </div>

              {testResults[item.id] && (
                <div className="mt-2.5 pt-2 border-t border-slate-800 space-y-1 text-xs animate-fadeIn">
                  <div className="flex gap-2">
                    <span className="text-slate-400">{bilingualMode === 'en' ? 'Type:' : 'Kiểu:'}</span>
                    <strong className="text-yellow-400 font-mono">{item.type}</strong>
                    <span className="text-slate-400 ml-2">{bilingualMode === 'en' ? 'Value:' : 'Giá trị:'}</span>
                    <strong className="text-emerald-400 font-mono">{item.val}</strong>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    {bilingualMode === 'en' ? item.explEn : item.explVi}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Hoạt động 3 & Các hàm chuyển kiểu int(), float(), str() (Trang 99) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Hoạt động 3 & Các hàm chuyển đổi kiểu dữ liệu (Trang 98 – 99)"
                en="Activity 3 & Data Type Conversion Functions (Pages 98 – 99)"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="Có chuyển đổi dữ liệu kiểu này sang kiểu khác được không? Biến s = '123' chuyển thành số nguyên bằng cách nào?"
                en="Can data types be converted? How to cast s = '123' into an integer?"
              />
            </p>
          </div>
        </div>

        {/* 3 Type Casting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card int() */}
          <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-blue-400 text-sm">int()</span>
              <span className="text-[10px] text-blue-300 bg-blue-500/10 px-1.5 py-0.5 rounded">
                {bilingualMode === 'en' ? 'Integer' : 'Số nguyên'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              <BilingualText
                vi="Chuyển đổi số thực hoặc xâu chứa số nguyên thành số nguyên."
                en="Converts float (truncating decimals) or integer strings into integer."
              />
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-slate-200 space-y-1">
              <div>int(12.6) → <strong className="text-blue-300">12</strong></div>
              <div>int("123") → <strong className="text-blue-300">123</strong></div>
              <div className="text-rose-400">int("10.35") → ValueError ⚠️</div>
            </div>
          </div>

          {/* Card float() */}
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-emerald-400 text-sm">float()</span>
              <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                {bilingualMode === 'en' ? 'Float' : 'Số thực'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              <BilingualText
                vi="Chuyển đổi số nguyên và xâu kí tự thành số thực (có phần thập phân)."
                en="Converts integers and numeric strings into floats with decimals."
              />
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-slate-200 space-y-1">
              <div>float(8) → <strong className="text-emerald-300">8.0</strong></div>
              <div>float("10.23") → <strong className="text-emerald-300">10.23</strong></div>
              <div className="text-rose-400">float("123,5.5") → ValueError ⚠️</div>
            </div>
          </div>

          {/* Card str() */}
          <div className="p-4 rounded-xl bg-slate-950 border border-pink-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-pink-400 text-sm">str()</span>
              <span className="text-[10px] text-pink-300 bg-pink-500/10 px-1.5 py-0.5 rounded">
                {bilingualMode === 'en' ? 'String' : 'Xâu kí tự'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              <BilingualText
                vi="Chuyển đổi các kiểu dữ liệu khác (số nguyên, số thực, lôgic) thành xâu."
                en="Converts other data types (integer, float, boolean) into strings."
              />
            </p>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-slate-200 space-y-1">
              <div>str(12+34) → <strong className="text-pink-300">'46'</strong></div>
              <div>str(12.567) → <strong className="text-pink-300">'12.567'</strong></div>
              <div>str(2 &gt; 3) → <strong className="text-pink-300">'False'</strong></div>
            </div>
          </div>
        </div>

        {/* Warning Callout Box from SGK Page 99 */}
        <div className="p-4 rounded-xl bg-rose-950/40 border-2 border-rose-500/50 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1.5 text-slate-200">
            <div className="font-bold text-rose-300 uppercase tracking-wide">
              <BilingualText
                vi="Chú ý quan trọng (SGK Trang 99):"
                en="Important Note (Page 99):"
              />
            </div>
            <p>
              <BilingualText
                vi="Các lệnh int(), float() chỉ có thể chuyển đổi các xâu ghi giá trị số trực tiếp, KHÔNG chuyển đổi xâu có công thức!"
                en="The int() and float() functions only convert string representations of direct numbers, NOT expression strings!"
              />
            </p>
            <div className="p-2 rounded bg-slate-950 font-mono text-[11px] text-rose-300">
              &gt;&gt;&gt; int("12+45") <br />
              <span className="text-rose-400 font-bold">
                ValueError: invalid literal for int() with base 10: '12+45'
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Live Converter Sandbox */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold flex items-center gap-1.5">
              <Code className="w-4 h-4 text-cyan-400" />
              <BilingualText
                vi="Thực nghiệm tương tác: Thử ép kiểu giá trị bất kỳ"
                en="Interactive Sandbox: Test Any Type Conversion"
              />
            </span>
            <span className="text-slate-500 font-mono">Python Type Converter</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">
              {bilingualMode === 'en' ? 'Input Value:' : 'Giá trị đầu vào:'}
            </span>
            <input
              type="text"
              value={convInput}
              onChange={(e) => setConvInput(e.target.value)}
              placeholder='Ví dụ: 123 hoặc "10.35"'
              className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 w-48"
            />

            <span className="text-xs text-slate-400 ml-2">
              {bilingualMode === 'en' ? 'Cast to:' : 'Ép sang:'}
            </span>
            <div className="flex rounded-lg border border-slate-700 overflow-hidden text-xs font-mono">
              {(['int', 'float', 'str'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setConvTarget(t)}
                  className={`px-3 py-1 transition cursor-pointer ${
                    convTarget === t
                      ? 'bg-cyan-500/30 text-cyan-200 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}()
                </button>
              ))}
            </div>
          </div>

          {/* Result view */}
          <div
            className={`p-3 rounded-lg border text-xs font-mono ${
              'error' in convResult
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
            }`}
          >
            {'error' in convResult ? (
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{convResult.error}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {convTarget}('{convInput}') = <strong className="text-white text-sm">{convResult.success}</strong>
                </span>
                <span className="text-slate-400">
                  {bilingualMode === 'en' ? 'Type:' : 'Kiểu:'} {convResult.type}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. Hộp Ghi nhớ 2B (Trang 99) */}
      <div className="rounded-2xl bg-amber-950/40 border-2 border-amber-400 p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-start gap-3 relative z-10">
          <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">
              <BilingualText
                vi="Ghi nhớ 2B (SGK Trang 99)"
                en="Key Summary 2B (Page 99)"
              />
            </h4>
            <ul className="text-amber-50 dark:text-amber-100 text-xs md:text-sm font-bold mt-2 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>
                <BilingualText
                  vi="Các lệnh int(), float(), str() có chức năng chuyển đổi dữ liệu từ các kiểu khác tương ứng về kiểu số nguyên, số thực và xâu kí tự."
                  en="The int(), float(), and str() functions convert data from other types into integer, float, and string respectively."
                />
              </li>
              <li>
                <BilingualText
                  vi="Các lệnh int(), float() không thực hiện xâu là biểu thức toán."
                  en="The int() and float() functions do not evaluate arithmetic expressions inside strings."
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 7. Hoạt động 4 & Kỹ thuật Lồng int(input()) & float(input()) (Trang 99 – 100) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Hoạt động 4 & Kỹ thuật lồng lệnh nhập số từ bàn phím"
                en="Activity 4 & Nested Numeric Input Technique"
              />
            </h3>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="SGK Trang 99–100: Vì input() luôn trả về xâu kí tự, làm thế nào để biến lưu số nguyên hoặc số thực?"
                en="Page 99–100: Since input() returns strings, how do we store integers or floats?"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/30 space-y-2">
            <span className="text-xs font-bold text-blue-300">
              <BilingualText
                vi="Nhập số nguyên n:"
                en="Input integer n:"
              />
            </span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-blue-200">
              n = <span className="text-yellow-400">int</span>(<span className="text-purple-400">input</span>(
              <span className="text-emerald-300">
                "{bilingualMode === 'en' ? 'Enter natural number: ' : 'Nhập số tự nhiên: '}"
              </span>
              ))
            </div>
            <p className="text-[11px] text-slate-400">
              <BilingualText
                vi="Lệnh input() nhận xâu từ người dùng, sau đó hàm int() bao bọc bên ngoài sẽ ép xâu thành số nguyên n."
                en="input() captures string from user, then outer int() wrapper casts it into integer n."
              />
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
            <span className="text-xs font-bold text-emerald-300">
              <BilingualText
                vi="Nhập số thực x:"
                en="Input float x:"
              />
            </span>
            <div className="p-2.5 bg-slate-900 rounded font-mono text-xs text-emerald-200">
              x = <span className="text-emerald-400">float</span>(<span className="text-purple-400">input</span>(
              <span className="text-emerald-300">
                "{bilingualMode === 'en' ? 'Enter float x: ' : 'Nhập số thực x: '}"
              </span>
              ))
            </div>
            <p className="text-[11px] text-slate-400">
              <BilingualText
                vi="Lệnh input() đọc xâu, và hàm float() ép kiểu thành số thực để tính toán số thập phân."
                en="input() reads the string, and float() converts it to a floating point value for decimals."
              />
            </p>
          </div>
        </div>

        {/* Critical Question from Page 100 */}
        <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <HelpCircle className="w-4 h-4" />
            <span>
              <BilingualText
                vi="Câu hỏi Trang 100: Dùng lệnh x = input('Nhập số x: ') để nhập số cho biến x là đúng hay sai?"
                en="Question Page 100: Is using x = input('Enter x: ') to input numbers correct or wrong?"
              />
            </span>
          </div>
          <div className="p-3 bg-slate-900/80 rounded-lg text-xs text-slate-300 leading-relaxed space-y-1">
            <p>
              <strong className="text-rose-400">
                {bilingualMode === 'en'
                  ? 'Answer: WRONG (if the intent is arithmetic computation).'
                  : 'Đáp án: SAI (nếu mục đích là để thực hiện các phép toán số học).'}
              </strong>
            </p>
            <p className="text-slate-400">
              <BilingualText
                vi="Vì input() luôn trả về xâu kí tự (str). Nếu nhập số 5, biến x sẽ lưu '5' chứ không phải số 5. Khi đó:"
                en="Because input() always returns a string (str). Entering 5 stores '5', not the number 5. Consequently:"
              />
            </p>
            <ul className="list-disc list-inside text-[11px] text-slate-300 pl-2">
              <li>
                {bilingualMode === 'en' ? (
                  <>
                    Addition <code className="text-amber-300 font-mono">x + 10</code> causes{' '}
                    <code className="text-rose-400 font-mono">TypeError: can only concatenate str to str</code>.
                  </>
                ) : (
                  <>
                    Phép cộng <code className="text-amber-300 font-mono">x + 10</code> sẽ gây lỗi{' '}
                    <code className="text-rose-400 font-mono">TypeError: can only concatenate str to str</code>.
                  </>
                )}
              </li>
              <li>
                {bilingualMode === 'en' ? (
                  <>
                    Multiplication <code className="text-amber-300 font-mono">x * 3</code> performs string repetition{' '}
                    <code className="text-pink-300 font-mono">'555'</code> instead of 15.
                  </>
                ) : (
                  <>
                    Phép nhân <code className="text-amber-300 font-mono">x * 3</code> sẽ tạo ra phép lặp xâu{' '}
                    <code className="text-pink-300 font-mono">'555'</code> thay vì 15.
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
