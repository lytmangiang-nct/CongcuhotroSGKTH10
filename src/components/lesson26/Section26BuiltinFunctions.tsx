import React, { useState } from 'react';
import { Table, Terminal, Info, HelpCircle, CheckCircle2, Sparkles, Play, Code2 } from 'lucide-react';
import { useBook } from '../../context/BookContext';

interface BuiltinFuncInfo {
  name: string;
  syntax: string;
  paramDescVi: string;
  paramDescEn: string;
  returnDescVi: string;
  returnDescEn: string;
  example: string;
  result: string;
}

const TABLE_26_1_FUNCS: BuiltinFuncInfo[] = [
  {
    name: 'abs()',
    syntax: 'abs(x)',
    paramDescVi: 'Số nguyên hoặc số thực x',
    paramDescEn: 'Integer or float x',
    returnDescVi: 'Giá trị tuyệt đối |x|',
    returnDescEn: 'Absolute value |x|',
    example: 'abs(-15.6)',
    result: '15.6'
  },
  {
    name: 'len()',
    syntax: 'len(s)',
    paramDescVi: 'Xâu kí tự, danh sách hoặc tập hợp',
    paramDescEn: 'String, list, or sequence',
    returnDescVi: 'Số lượng phần tử (độ dài)',
    returnDescEn: 'Number of elements',
    example: 'len("Tin học 10")',
    result: '10'
  },
  {
    name: 'range()',
    syntax: 'range(n) hoặc range(start, stop)',
    paramDescVi: 'Số nguyên giới hạn',
    paramDescEn: 'Integer boundaries',
    returnDescVi: 'Vùng giá trị nguyên tuần tự',
    returnDescEn: 'Immutable integer sequence',
    example: 'list(range(5))',
    result: '[0, 1, 2, 3, 4]'
  },
  {
    name: 'bool()',
    syntax: 'bool(x)',
    paramDescVi: 'Bất kỳ giá trị hoặc biểu thức nào',
    paramDescEn: 'Any value or expression',
    returnDescVi: 'Giá trị lôgic True hoặc False',
    returnDescEn: 'Boolean True or False',
    example: 'bool(0)',
    result: 'False'
  },
  {
    name: 'float()',
    syntax: 'float(x)',
    paramDescVi: 'Số nguyên hoặc xâu biểu diễn số',
    paramDescEn: 'Integer or number string',
    returnDescVi: 'Số thực dấu phẩy động',
    returnDescEn: 'Floating point number',
    example: 'float("3.14")',
    result: '3.14'
  },
  {
    name: 'list()',
    syntax: 'list(iterable)',
    paramDescVi: 'Tập hợp có thể duyệt (xâu, range...)',
    paramDescEn: 'Iterable sequence',
    returnDescVi: 'Danh sách kiểu list',
    returnDescEn: 'List object',
    example: 'list("ABC")',
    result: "['A', 'B', 'C']"
  },
  {
    name: 'round()',
    syntax: 'round(x, n)',
    paramDescVi: 'Số thực x và số chữ số thập phân n',
    paramDescEn: 'Float x and decimal places n',
    returnDescVi: 'Số đã làm tròn',
    returnDescEn: 'Rounded number',
    example: 'round(3.14159, 2)',
    result: '3.14'
  },
  {
    name: 'chr()',
    syntax: 'chr(i)',
    paramDescVi: 'Mã số nguyên Unicode/ASCII',
    paramDescEn: 'Unicode/ASCII integer code',
    returnDescVi: 'Kí tự tương ứng với mã số',
    returnDescEn: 'Corresponding character',
    example: 'chr(65)',
    result: "'A'"
  },
  {
    name: 'input()',
    syntax: 'input(prompt)',
    paramDescVi: 'Xâu nhắc nhập tuỳ chọn',
    paramDescEn: 'Optional prompt string',
    returnDescVi: 'Xâu kí tự người dùng nhập vào',
    returnDescEn: 'User input string',
    example: 'input()',
    result: "'văn bản người dùng'"
  },
  {
    name: 'ord()',
    syntax: 'ord(c)',
    paramDescVi: 'Một kí tự đơn',
    paramDescEn: 'Single character string',
    returnDescVi: 'Mã số nguyên Unicode/ASCII',
    returnDescEn: 'Unicode integer code',
    example: 'ord("A")',
    result: '65'
  },
  {
    name: 'str()',
    syntax: 'str(x)',
    paramDescVi: 'Dữ liệu kiểu bất kỳ',
    paramDescEn: 'Any object or data',
    returnDescVi: 'Xâu kí tự biểu diễn đối tượng',
    returnDescEn: 'String representation',
    example: 'str(100)',
    result: "'100'"
  },
  {
    name: 'divmod()',
    syntax: 'divmod(a, b)',
    paramDescVi: 'Hai số a và b',
    paramDescEn: 'Two numbers a and b',
    returnDescVi: 'Cặp (thương nguyên //, phần dư %)',
    returnDescEn: 'Tuple of (quotient, remainder)',
    example: 'divmod(17, 5)',
    result: '(3, 2)'
  },
  {
    name: 'int()',
    syntax: 'int(x)',
    paramDescVi: 'Số thực hoặc xâu biểu diễn số nguyên',
    paramDescEn: 'Float or integer string',
    returnDescVi: 'Số nguyên',
    returnDescEn: 'Integer number',
    example: 'int("52")',
    result: '52'
  },
  {
    name: 'print()',
    syntax: 'print(val1, val2, ...)',
    paramDescVi: 'Các giá trị cần hiển thị',
    paramDescEn: 'Values to print',
    returnDescVi: 'Không có (trả về None)',
    returnDescEn: 'None (prints to standard output)',
    example: 'print("Xin chào")',
    result: 'In ra màn hình'
  },
  {
    name: 'type()',
    syntax: 'type(object)',
    paramDescVi: 'Bất kỳ đối tượng/biến nào',
    paramDescEn: 'Any object or variable',
    returnDescVi: 'Kiểu dữ liệu của đối tượng',
    returnDescEn: 'Type of the object',
    example: 'type(12.5)',
    result: "<class 'float'>"
  }
];

export const Section26BuiltinFunctions: React.FC = () => {
  const { bilingualMode } = useBook();
  const isEn = bilingualMode === 'en';

  const [selectedFunc, setSelectedFunc] = useState<BuiltinFuncInfo>(TABLE_26_1_FUNCS[0]);
  const [qRevealed, setQRevealed] = useState<boolean>(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-sky-950/80 via-slate-900 to-slate-900 border border-sky-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full w-fit border border-sky-500/20">
          <span>{isEn ? 'Section 1' : 'Mục 1'}</span>
          <span>•</span>
          <span>{isEn ? 'SGK Pages 127 – 128' : 'Trang 127 – 128 SGK'}</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-white">
          {isEn ? '1. Python Built-in Functions' : '1. Một Số Hàm Thiết Kế Sẵn Của Python'}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {isEn
            ? 'Explore Table 26.1 containing 15 standard built-in subroutines, their general invocation syntax, parameters, and return values.'
            : 'Khám phá Bảng 26.1 gồm 15 hàm thiết kế sẵn của Python, đặc điểm hình thức chung với cặp dấu ngoặc đơn, và cú pháp gọi hàm chuẩn.'}
        </p>
      </div>

      {/* Hoạt động 1: Tìm hiểu một số hàm của Python (Bảng 26.1) */}
      <div className="rounded-2xl border border-sky-500/30 bg-slate-900/90 p-6 shadow-lg space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">
              {isEn ? 'Activity 1: Exploring Python Built-in Commands (Table 26.1)' : 'Hoạt động 1: Tìm hiểu một số hàm của Python (Bảng 26.1 SGK Trang 127)'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEn ? 'Observe the 15 commands in Table 26.1 and recognize their shared syntax patterns' : 'Quan sát 15 câu lệnh trong Bảng 26.1 và nhận diện điểm chung về cấu trúc'}
            </p>
          </div>
        </div>

        {/* Bảng 26.1 Interactive Grid */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>{isEn ? 'Table 26.1: Click any built-in function to inspect its parameters and return value:' : 'Bảng 26.1: Nhấn vào hàm bất kỳ để tra cứu tham số và kết quả trả về:'}</span>
            <span className="text-sky-400 font-mono text-[11px]">{isEn ? '15 built-in functions' : '15 hàm thiết kế sẵn'}</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {TABLE_26_1_FUNCS.map((fn) => (
              <button
                key={fn.name}
                type="button"
                onClick={() => setSelectedFunc(fn)}
                className={`p-2.5 rounded-xl text-xs font-mono font-bold text-center border transition-all cursor-pointer ${
                  selectedFunc.name === fn.name
                    ? 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-600/30 scale-105'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {fn.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Function Details Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-mono font-black text-sky-400">
                {selectedFunc.name}
              </span>
              <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {selectedFunc.syntax}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              {isEn ? 'Built-in Subroutine' : 'Chương trình con thiết kế sẵn'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-400">{isEn ? 'Parameters:' : 'Tham số truyền vào:'}</span>
              <div className="text-slate-200">{isEn ? selectedFunc.paramDescEn : selectedFunc.paramDescVi}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-400">{isEn ? 'Return Value:' : 'Giá trị trả lại:'}</span>
              <div className="text-emerald-400 font-bold">{isEn ? selectedFunc.returnDescEn : selectedFunc.returnDescVi}</div>
            </div>
          </div>

          {/* Interactive Code Example */}
          <div className="p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs flex items-center justify-between">
            <div className="text-slate-300">
              &gt;&gt;&gt; {selectedFunc.example}
            </div>
            <div className="text-emerald-400 font-bold">
              {selectedFunc.name === 'print()' && isEn ? 'Prints to screen' : selectedFunc.result}
            </div>
          </div>
        </div>

        {/* Cú pháp gọi hàm tổng quát */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-sky-300 text-sm flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>{isEn ? 'General Function Call Syntax (p. 128):' : 'Cú pháp câu lệnh gọi hàm trong Python (Trang 128 SGK):'}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-black/70 font-mono text-amber-300 text-xs">
            {isEn ? '<function_name>(<parameter_list>)' : '<tên hàm>(<danh sách tham số hàm>)'}
          </div>
          <p className="leading-relaxed text-slate-400">
            {isEn
              ? 'In the examples above, expressions inside parentheses are function parameters. Commands in Table 26.1 are built-in subroutines freely usable in user programs.'
              : 'Xâu kí tự hoặc giá trị bên trong ngoặc là tham số của hàm. Các lệnh trong Bảng 26.1 chính là các chương trình con được thiết kế sẵn của Python, cho phép người dùng tuỳ ý sử dụng trong các chương trình của riêng mình.'}
          </p>
        </div>

        {/* Hộp Ghi nhớ 1 (Trang 128 SGK) */}
        <div className="p-5 rounded-2xl bg-linear-to-r from-sky-950/40 via-sky-900/20 to-slate-900 border-2 border-dashed border-sky-500/60 shadow-lg space-y-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <Info className="w-5 h-5 shrink-0" />
            <span>{isEn ? 'Summary Box 1 (Textbook p. 128)' : 'Hộp Ghi nhớ 1 (Trang 128 SGK)'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-7 font-medium">
            {isEn
              ? 'Python provides many built-in functions performing different operations, allowing users to invoke them whenever writing programs using corresponding function calls.'
              : 'Python cung cấp sẵn nhiều hàm thực hiện những công việc khác nhau cho phép người dùng được tuỳ ý sử dụng khi viết chương trình bằng các câu lệnh gọi hàm tương ứng.'}
          </p>
        </div>
      </div>

      {/* Review Question (Câu hỏi củng cố Mục 1 - Trang 128 SGK) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-base text-white">
            {isEn ? 'Review Question (SGK Page 128)' : 'Câu hỏi Củng cố Mục 1 (Trang 128 SGK)'}
          </h3>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
          <p className="text-sm font-semibold text-slate-100 leading-relaxed">
            {isEn
              ? 'Describe the parameter and return value for each of the following functions: float(), str(), len(), list().'
              : 'Mô tả tham số và giá trị trả lại của mỗi hàm sau: float(), str(), len(), list().'}
          </p>

          <button
            type="button"
            onClick={() => setQRevealed(!qRevealed)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{qRevealed ? (isEn ? 'Hide Solution' : 'Ẩn câu trả lời') : (isEn ? 'Show Official Description' : 'Xem mô tả chi tiết 4 hàm')}</span>
          </button>

          {qRevealed && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 animate-in fade-in duration-200">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-mono font-bold text-amber-300">1. float(x)</span>
                <p className="text-slate-300">
                  <strong>{isEn ? 'Parameters:' : 'Tham số:'}</strong> {isEn ? 'Integer or number string (e.g. "3.5").' : 'Số nguyên hoặc xâu biểu diễn số (vd: "3.5").'}
                  <br />
                  <strong>{isEn ? 'Return value:' : 'Giá trị trả lại:'}</strong> {isEn ? 'Floating-point number of type float.' : 'Số thực kiểu float.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-mono font-bold text-amber-300">2. str(x)</span>
                <p className="text-slate-300">
                  <strong>{isEn ? 'Parameters:' : 'Tham số:'}</strong> {isEn ? 'Any data type (number, bool, list...).' : 'Dữ liệu kiểu bất kỳ (số, bool, list...).'}
                  <br />
                  <strong>{isEn ? 'Return value:' : 'Giá trị trả lại:'}</strong> {isEn ? 'String representation of type str.' : 'Xâu kí tự biểu diễn dữ liệu đó kiểu str.'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-mono font-bold text-amber-300">3. len(s)</span>
                <p className="text-slate-300">
                  <strong>{isEn ? 'Parameters:' : 'Tham số:'}</strong> {isEn ? 'A string or list (sequence/collection).' : 'Một xâu kí tự hoặc danh sách (tập hợp).'}
                  <br />
                  <strong>{isEn ? 'Return value:' : 'Giá trị trả lại:'}</strong> {isEn ? 'Integer representing element count (length).' : 'Số nguyên biểu diễn số lượng phần tử (độ dài).'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-mono font-bold text-amber-300">4. list(iterable)</span>
                <p className="text-slate-300">
                  <strong>{isEn ? 'Parameters:' : 'Tham số:'}</strong> {isEn ? 'An iterable sequence (string, range...).' : 'Một chuỗi có thể duyệt (xâu kí tự, range...).'}
                  <br />
                  <strong>{isEn ? 'Return value:' : 'Giá trị trả lại:'}</strong> {isEn ? 'List object of type list.' : 'Danh sách kiểu list.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
