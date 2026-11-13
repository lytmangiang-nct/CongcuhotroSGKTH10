import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  HelpCircle,
  Binary,
  Lightbulb,
  Terminal
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section19BooleanLogic: React.FC = () => {
  const { bilingualMode } = useBook();

  // Hoạt động 1 selection state
  const [act1Selection, setAct1Selection] = useState<{ [key: string]: boolean }>({
    A: false,
    B: false,
    C: false,
    D: false
  });
  const [act1Checked, setAct1Checked] = useState(false);

  // String comparison interactive inspector
  const [str1, setStr1] = useState('Number');
  const [str2, setStr2] = useState('number');

  // Interactive Truth Table Tab
  const [activeTableTab, setActiveTableTab] = useState<'and' | 'or' | 'not'>('and');

  // Checkpoints Trang 102
  const [qAAnswer, setQAAnswer] = useState<boolean | null>(null);
  const [qBAnswer, setQBAnswer] = useState<boolean | null>(null);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Section Header */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 border border-emerald-500/30">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            <BilingualText
              vi="Mục 1 • Trang 101 – 102 SGK Tin học 10"
              en="Section 1 • Pages 101 – 102 Informatics 10"
            />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          <BilingualText
            vi="1. Biểu thức lôgic & Các phép toán and, or, not"
            en="1. Boolean Expressions & Logical Operators: and, or, not"
          />
        </h2>
        <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          <BilingualText
            vi="Biểu thức lôgic trong Python chỉ nhận một trong hai giá trị là True (đúng) hoặc False (sai). Chúng được hình thành từ các phép so sánh quan hệ và kết hợp linh hoạt bởi 3 phép toán lôgic cơ bản: and, or, và not."
            en="Boolean expressions in Python evaluate to either True or False. They are formed using relational operators and joined with 3 fundamental logical operators: and, or, and not."
          />
        </p>
      </div>

      {/* 2. Hoạt động 1: Khái niệm biểu thức lôgic (Trang 101) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              <BilingualText
                vi="Hoạt động 1: Khái niệm biểu thức lôgic (SGK Trang 101)"
                en="Activity 1: Understanding Boolean Expressions (Page 101)"
              />
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              <BilingualText
                vi="Biểu thức nào sau đây có thể đưa vào vị trí <điều kiện> trong lệnh: Nếu <điều kiện> thì <lệnh>?"
                en="Which expression can fit into the <condition> placeholder: If <condition> then <statement>?"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {[
            {
              id: 'A',
              text: 'm, n = 1, 2',
              isLogic: false,
              descVi: 'Lệnh gán đồng thời, không phải biểu thức lôgic',
              descEn: 'Multiple assignment statement, not a boolean expression'
            },
            {
              id: 'B',
              text: 'a + b > 1',
              isLogic: true,
              descVi: 'Biểu thức so sánh lớn hơn (>), trả về True hoặc False',
              descEn: 'Greater-than comparison (>), yields True or False'
            },
            {
              id: 'C',
              text: 'a * b < a + b',
              isLogic: true,
              descVi: 'Biểu thức so sánh nhỏ hơn (<), trả về True hoặc False',
              descEn: 'Less-than comparison (<), yields True or False'
            },
            {
              id: 'D',
              text: '12 + 15 > 2 * 13',
              isLogic: true,
              descVi: 'So sánh số học (27 > 26 -> True)',
              descEn: 'Arithmetic comparison (27 > 26 -> True)'
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() =>
                setAct1Selection((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
              }
              className={`cursor-pointer p-3.5 rounded-xl border text-xs transition flex items-center justify-between ${
                act1Selection[item.id]
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center font-bold text-xs bg-slate-900">
                  {act1Selection[item.id] ? '✓' : ''}
                </span>
                <div>
                  <span className="font-mono font-bold text-white text-sm">
                    {item.id}. {item.text}
                  </span>
                  {act1Checked && (
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {bilingualMode === 'en' ? item.descEn : item.descVi}
                    </div>
                  )}
                </div>
              </div>
              {act1Checked && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono ${
                    item.isLogic
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {item.isLogic
                    ? bilingualMode === 'en'
                      ? 'VALID (Boolean)'
                      : 'HỢP LỆ (Biểu thức lôgic)'
                    : bilingualMode === 'en'
                      ? 'NOT A BOOLEAN'
                      : 'KHÔNG PHẢI'}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => setAct1Checked(true)}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition shadow-md shadow-emerald-600/20 cursor-pointer"
          >
            {bilingualMode === 'en' ? 'Check Activity 1 Answers' : 'Kiểm tra đáp án Hoạt động 1'}
          </button>
          {act1Checked && (
            <span className="text-xs text-emerald-400 font-semibold animate-fadeIn">
              <BilingualText
                vi="✓ Đáp án chuẩn: Các phương án B, C, D là các biểu thức lôgic hợp lệ vì đều trả về True hoặc False!"
                en="✓ Standard: Options B, C, D are valid boolean expressions evaluating to True or False!"
              />
            </span>
          )}
        </div>
      </div>

      {/* 3. Các phép so sánh giá trị số & Xâu kí tự */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Number Comparison Table */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Binary className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">
              <BilingualText
                vi="Các phép so sánh các giá trị số trong Python"
                en="Numeric Relational Operators in Python"
              />
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <th className="p-2 text-emerald-400">{bilingualMode === 'en' ? 'Operator' : 'Toán tử'}</th>
                  <th className="p-2">{bilingualMode === 'en' ? 'Meaning' : 'Ý nghĩa'}</th>
                  <th className="p-2 text-sky-400">{bilingualMode === 'en' ? 'Example' : 'Ví dụ'}</th>
                  <th className="p-2">{bilingualMode === 'en' ? 'Result' : 'Kết quả'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="p-2 font-bold text-emerald-400">&lt;</td>
                  <td className="p-2">{bilingualMode === 'en' ? 'Less than' : 'Nhỏ hơn'}</td>
                  <td className="p-2 font-mono">2 &lt; 5</td>
                  <td className="p-2 text-emerald-300 font-bold">True</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-emerald-400">&lt;=</td>
                  <td className="p-2">{bilingualMode === 'en' ? 'Less than or equal' : 'Nhỏ hơn hoặc bằng'}</td>
                  <td className="p-2 font-mono">5 &lt;= 5</td>
                  <td className="p-2 text-emerald-300 font-bold">True</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-emerald-400">&gt;</td>
                  <td className="p-2">{bilingualMode === 'en' ? 'Greater than' : 'Lớn hơn'}</td>
                  <td className="p-2 font-mono">10 &gt; 12</td>
                  <td className="p-2 text-rose-400 font-bold">False</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-emerald-400">&gt;=</td>
                  <td className="p-2">{bilingualMode === 'en' ? 'Greater than or equal' : 'Lớn hơn hoặc bằng'}</td>
                  <td className="p-2 font-mono">8 &gt;= 3</td>
                  <td className="p-2 text-emerald-300 font-bold">True</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-emerald-400">==</td>
                  <td className="p-2">{bilingualMode === 'en' ? 'Equal to' : 'Bằng nhau'}</td>
                  <td className="p-2 font-mono">10 == 10</td>
                  <td className="p-2 text-emerald-300 font-bold">True</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-emerald-400">!=</td>
                  <td className="p-2">{bilingualMode === 'en' ? 'Not equal to' : 'Khác nhau'}</td>
                  <td className="p-2 font-mono">10 != 10</td>
                  <td className="p-2 text-rose-400 font-bold">False</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* String Comparison Live Demo */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Terminal className="w-4 h-4 text-sky-400" />
            <h3 className="font-bold text-white text-sm">
              <BilingualText
                vi="So sánh xâu kí tự (Phân biệt chữ hoa / chữ thường)"
                en="String Comparison (Case-Sensitive Unicode Matching)"
              />
            </h3>
          </div>

          <p className="text-xs text-slate-300">
            <BilingualText
              vi="Python cho phép so sánh xâu kí tự theo mã chuẩn Unicode. Đặc biệt, xâu phân biệt chính xác chữ hoa và chữ thường: 'Number' và 'number' là hai xâu có giá trị khác nhau!"
              en="Python compares strings based on Unicode codepoints. Comparisons are strictly case-sensitive: 'Number' and 'number' are two completely different strings!"
            />
          </p>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">{bilingualMode === 'en' ? 'Str 1:' : 'Xâu 1:'}</span>
              <input
                type="text"
                value={str1}
                onChange={(e) => setStr1(e.target.value)}
                className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-pink-300 text-xs w-28"
              />
              <span className="text-slate-400 ml-2">{bilingualMode === 'en' ? 'Str 2:' : 'Xâu 2:'}</span>
              <input
                type="text"
                value={str2}
                onChange={(e) => setStr2(e.target.value)}
                className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-pink-300 text-xs w-28"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span>
                '{str1}' == '{str2}' :
              </span>
              <span
                className={`font-bold px-2 py-0.5 rounded ${
                  str1 === str2
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {str1 === str2
                  ? bilingualMode === 'en'
                    ? 'True (Equal)'
                    : 'True (Bằng nhau)'
                  : bilingualMode === 'en'
                    ? 'False (Different)'
                    : 'False (Khác nhau)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Ba bảng chân trị: and, or, not (Trang 102) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-yellow-400" />
              <span>
                <BilingualText
                  vi="Bảng các phép toán lôgic: and, or, not (SGK Trang 102)"
                  en="Truth Tables: and, or, not Operators (Page 102)"
                />
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              <BilingualText
                vi="Quy tắc xác định giá trị đúng/sai khi kết hợp nhiều điều kiện"
                en="Evaluation rules when combining multiple boolean conditions"
              />
            </p>
          </div>

          <div className="flex rounded-lg border border-slate-700 overflow-hidden text-xs font-mono">
            {(['and', 'or', 'not'] as const).map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTableTab(tab)}
                className={`px-3 py-1.5 transition cursor-pointer ${
                  activeTableTab === tab
                    ? 'bg-yellow-500/30 text-yellow-200 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Truth Tables Display */}
        {activeTableTab === 'and' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-center border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-2 border-r border-slate-800">X</th>
                    <th className="p-2 border-r border-slate-800">Y</th>
                    <th className="p-2 text-yellow-400 font-bold">X and Y</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr className="bg-emerald-950/20">
                    <td className="p-2 border-r border-slate-800 text-emerald-400">True</td>
                    <td className="p-2 border-r border-slate-800 text-emerald-400">True</td>
                    <td className="p-2 font-bold text-emerald-300">True ★</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-slate-800 text-emerald-400">True</td>
                    <td className="p-2 border-r border-slate-800 text-rose-400">False</td>
                    <td className="p-2 font-bold text-rose-400">False</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-slate-800 text-rose-400">False</td>
                    <td className="p-2 border-r border-slate-800 text-emerald-400">True</td>
                    <td className="p-2 font-bold text-rose-400">False</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-slate-800 text-rose-400">False</td>
                    <td className="p-2 border-r border-slate-800 text-rose-400">False</td>
                    <td className="p-2 font-bold text-rose-400">False</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-yellow-400">
                {bilingualMode === 'en' ? 'Rule for and Operator:' : 'Quy tắc phép toán and (VÀ):'}
              </span>
              <p>
                {bilingualMode === 'en' ? (
                  <>
                    <code className="text-yellow-300 font-mono">X and Y</code> is{' '}
                    <strong className="text-emerald-400">True</strong> ONLY when <strong>BOTH</strong> operands X and Y
                    are True.
                  </>
                ) : (
                  <>
                    Biểu thức <code className="text-yellow-300 font-mono">X and Y</code> chỉ nhận giá trị{' '}
                    <strong className="text-emerald-400">True</strong> khi <strong>CẢ HAI</strong> mệnh đề X và Y cùng
                    có giá trị True.
                  </>
                )}
              </p>
              <p className="text-slate-400">
                {bilingualMode === 'en'
                  ? 'If either operand is False, the result immediately returns False.'
                  : 'Nếu một trong hai là False, lập tức trả về False.'}
              </p>
            </div>
          </div>
        )}

        {activeTableTab === 'or' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-center border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-2 border-r border-slate-800">X</th>
                    <th className="p-2 border-r border-slate-800">Y</th>
                    <th className="p-2 text-sky-400 font-bold">X or Y</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="p-2 border-r border-slate-800 text-emerald-400">True</td>
                    <td className="p-2 border-r border-slate-800 text-emerald-400">True</td>
                    <td className="p-2 font-bold text-emerald-300">True</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-slate-800 text-emerald-400">True</td>
                    <td className="p-2 border-r border-slate-800 text-rose-400">False</td>
                    <td className="p-2 font-bold text-emerald-300">True</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-slate-800 text-rose-400">False</td>
                    <td className="p-2 border-r border-slate-800 text-emerald-400">True</td>
                    <td className="p-2 font-bold text-emerald-300">True</td>
                  </tr>
                  <tr className="bg-rose-950/20">
                    <td className="p-2 border-r border-slate-800 text-rose-400">False</td>
                    <td className="p-2 border-r border-slate-800 text-rose-400">False</td>
                    <td className="p-2 font-bold text-rose-400">False ★</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-sky-400">
                {bilingualMode === 'en' ? 'Rule for or Operator:' : 'Quy tắc phép toán or (HOẶC):'}
              </span>
              <p>
                {bilingualMode === 'en' ? (
                  <>
                    <code className="text-sky-300 font-mono">X or Y</code> is{' '}
                    <strong className="text-rose-400">False</strong> ONLY when <strong>BOTH</strong> operands are False.
                  </>
                ) : (
                  <>
                    Biểu thức <code className="text-sky-300 font-mono">X or Y</code> chỉ nhận giá trị{' '}
                    <strong className="text-rose-400">False</strong> khi <strong>CẢ HAI</strong> mệnh đề X và Y cùng
                    False.
                  </>
                )}
              </p>
              <p className="text-slate-400">
                {bilingualMode === 'en'
                  ? 'If at least one operand is True, the result is True.'
                  : 'Chỉ cần ÍT NHẤT MỘT mệnh đề là True thì kết quả sẽ là True.'}
              </p>
            </div>
          </div>
        )}

        {activeTableTab === 'not' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-center border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <th className="p-2 border-r border-slate-800">X</th>
                    <th className="p-2 text-pink-400 font-bold">not X</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="p-2 border-r border-slate-800 text-emerald-400">True</td>
                    <td className="p-2 font-bold text-rose-400">False</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r border-slate-800 text-rose-400">False</td>
                    <td className="p-2 font-bold text-emerald-300">True</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <span className="font-bold text-pink-400">
                {bilingualMode === 'en' ? 'Rule for not Operator:' : 'Quy tắc phép toán not (PHỦ ĐỊNH):'}
              </span>
              <p>
                {bilingualMode === 'en' ? (
                  <>
                    Inverts truth value: <code className="text-pink-300 font-mono">not True</code> yields{' '}
                    <strong>False</strong>, and <code className="text-pink-300 font-mono">not False</code> yields{' '}
                    <strong>True</strong>.
                  </>
                ) : (
                  <>
                    Đảo ngược giá trị chân lý của mệnh đề: <code className="text-pink-300 font-mono">not True</code>{' '}
                    cho <strong>False</strong>, và <code className="text-pink-300 font-mono">not False</code> cho{' '}
                    <strong>True</strong>.
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 5. Ví dụ SGK Trang 102 với x = 10, y = 5, z = 9 */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white text-sm">
            <BilingualText
              vi="Ví dụ SGK Trang 102: Dự đoán giá trị các biến lôgic a, b, c với x = 10, y = 5, z = 9"
              en="Example Page 102: Evaluate Boolean Variables a, b, c for x = 10, y = 5, z = 9"
            />
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-slate-400">{bilingualMode === 'en' ? 'Variable b:' : 'Biến b:'}</div>
            <div className="text-yellow-300 font-bold">b = x &lt; 11 and z &gt; 5</div>
            <div className="text-slate-400 text-[11px] pt-1">
              {bilingualMode === 'en'
                ? 'x = 10 < 11 (True), z = 9 > 5 (True).'
                : 'Ta có: x = 10 < 11 (Đúng), z = 9 > 5 (Đúng).'}
              <div className="text-emerald-400 font-bold mt-1">→ b = True and True = True</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-slate-400">{bilingualMode === 'en' ? 'Variable c:' : 'Biến c:'}</div>
            <div className="text-sky-300 font-bold">c = x &gt; 15 or y &lt; 9</div>
            <div className="text-slate-400 text-[11px] pt-1">
              {bilingualMode === 'en'
                ? 'x = 10 > 15 (False), y = 5 < 9 (True).'
                : 'Ta có: x = 10 > 15 (Sai), y = 5 < 9 (Đúng).'}
              <div className="text-emerald-400 font-bold mt-1">→ c = False or True = True</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-slate-400">{bilingualMode === 'en' ? 'Variable a:' : 'Biến a:'}</div>
            <div className="text-pink-300 font-bold">a = not b</div>
            <div className="text-slate-400 text-[11px] pt-1">
              {bilingualMode === 'en' ? 'Since b = True:' : 'Vì b = True nên:'}
              <div className="text-rose-400 font-bold mt-1">→ a = not True = False</div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Hộp Ghi nhớ 1 (Trang 102) */}
      <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-500/40 p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-400/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-amber-950 dark:text-amber-300 uppercase tracking-wide">
              <BilingualText
                vi="Ghi nhớ 1 (SGK Trang 102)"
                en="Key Summary 1 (Page 102)"
              />
            </h4>
            <ul className="text-slate-900 dark:text-slate-100 text-xs md:text-sm font-semibold mt-2 space-y-1.5 list-disc list-inside">
              <li>
                <BilingualText
                  vi="Biểu thức lôgic là biểu thức chỉ nhận giá trị True hoặc False. Giá trị các biểu thức lôgic thuộc kiểu bool."
                  en="A boolean expression evaluates exclusively to True or False. Values belong to the bool type."
                />
              </li>
              <li>
                <BilingualText
                  vi="Các phép toán trên kiểu dữ liệu lôgic bao gồm: and (và), or (hoặc) và not (phủ định)."
                  en="Operations on boolean types comprise: and (logical conjunction), or (logical disjunction), and not (logical negation)."
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 7. Câu hỏi củng cố Trang 102 SGK */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <HelpCircle className="w-4 h-4" />
          <span>
            <BilingualText
              vi="Câu hỏi củng cố Trang 102: Mỗi biểu thức sau có giá trị True hay False?"
              en="Checkpoint Questions Page 102: Does each expression yield True or False?"
            />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Question a */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="font-mono text-xs font-bold text-sky-300">a) 100%4 == 0</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setQAAnswer(true)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                  qAAnswer === true
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                True
              </button>
              <button
                type="button"
                onClick={() => setQAAnswer(false)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                  qAAnswer === false
                    ? 'bg-rose-600 border-rose-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                False
              </button>
            </div>
            {qAAnswer === true && (
              <div className="p-2.5 rounded text-[11px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
                <span>
                  <strong>{bilingualMode === 'en' ? 'Textbook Explanation:' : 'Giải thích chuẩn SGK:'}</strong>{' '}
                  {bilingualMode === 'en'
                    ? '100 % 4 yields 0 remainder. 0 == 0 evaluates to True.'
                    : 'Phép chia lấy dư 100 % 4 cho kết quả 0. Biểu thức 0 == 0 là True.'}
                </span>
              </div>
            )}
          </div>

          {/* Question b */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="font-mono text-xs font-bold text-sky-300">b) 111//5 != 20 or 20%3 != 0</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setQBAnswer(true)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                  qBAnswer === true
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                True
              </button>
              <button
                type="button"
                onClick={() => setQBAnswer(false)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                  qBAnswer === false
                    ? 'bg-rose-600 border-rose-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                False
              </button>
            </div>
            {qBAnswer === true && (
              <div className="p-2.5 rounded text-[11px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
                <span>
                  <strong>{bilingualMode === 'en' ? 'Textbook Explanation:' : 'Giải thích chuẩn SGK:'}</strong>{' '}
                  {bilingualMode === 'en'
                    ? '111 // 5 = 22, and 22 != 20 is True. In an "or" expression, if the first operand is True, the whole expression is True.'
                    : '111 // 5 = 22, 22 != 20 là True. Trong phép toán "or", chỉ cần vế đầu là True thì toàn bộ biểu thức nhận giá trị True.'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
