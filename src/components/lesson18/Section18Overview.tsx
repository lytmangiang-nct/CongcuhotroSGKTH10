import React, { useState } from 'react';
import {
  Sparkles,
  Keyboard,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { IOTypePipeline3DViewer } from './IOTypePipeline3DViewer';

export const Section18Overview: React.FC = () => {
  const { bilingualMode } = useBook();

  // Interactive Warm-up Dialog State
  const [fullName, setFullName] = useState('Nguyễn Văn An');
  const [abbrName, setAbbrName] = useState('AnNV');
  const [dialogSubmitted, setDialogSubmitted] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner & Objectives */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 p-6 md:p-8 border border-indigo-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              <BilingualText
                vi="Chủ đề 5: Lập trình Python • Trang 97 – 100 SGK"
                en="Topic 5: Python Programming • Pages 97 – 100 Textbook"
              />
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            <BilingualText
              vi="Bài 18: Các lệnh vào ra đơn giản"
              en="Lesson 18: Basic Input and Output Statements"
            />
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            {bilingualMode === 'en' ? (
              <>
                Learn direct user interaction via keyboard and display: the{' '}
                <code className="text-sky-300 font-mono font-bold bg-slate-800/80 px-1.5 py-0.5 rounded">
                  input()
                </code>{' '}
                function, the{' '}
                <code className="text-purple-300 font-mono font-bold bg-slate-800/80 px-1.5 py-0.5 rounded">
                  print()
                </code>{' '}
                function, four fundamental data types (
                <code className="text-blue-300 font-mono">int</code>,{' '}
                <code className="text-emerald-300 font-mono">float</code>,{' '}
                <code className="text-pink-300 font-mono">str</code>,{' '}
                <code className="text-amber-300 font-mono">bool</code>), and safe type casting to prevent{' '}
                <span className="text-rose-400 font-mono font-semibold">ValueError</span>.
              </>
            ) : (
              <>
                Học cách tương tác trực tiếp với người sử dụng qua bàn phím và màn hình: lệnh{' '}
                <code className="text-sky-300 font-mono font-bold bg-slate-800/80 px-1.5 py-0.5 rounded">
                  input()
                </code>
                , lệnh{' '}
                <code className="text-purple-300 font-mono font-bold bg-slate-800/80 px-1.5 py-0.5 rounded">
                  print()
                </code>
                , 4 kiểu dữ liệu cơ bản (
                <code className="text-blue-300 font-mono">int</code>,{' '}
                <code className="text-emerald-300 font-mono">float</code>,{' '}
                <code className="text-pink-300 font-mono">str</code>,{' '}
                <code className="text-amber-300 font-mono">bool</code>
                ) và kỹ thuật ép kiểu an toàn tránh lỗi{' '}
                <span className="text-rose-400 font-mono font-semibold">ValueError</span>.
              </>
            )}
          </p>

          {/* Objectives Box */}
          <div className="pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-md">
              <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <BilingualText
                  vi="Mục tiêu bài học (Sau bài này em sẽ):"
                  en="Lesson Objectives (After this lesson, you will):"
                />
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <span>
                    <BilingualText
                      vi="Biết và thực hiện được một số lệnh vào, ra đơn giản (input(), print())."
                      en="Understand and perform basic input/output statements (input(), print())."
                    />
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                  <span>
                    <BilingualText
                      vi="Thực hiện được một số chuyển đổi dữ liệu giữa các kiểu dữ liệu cơ bản (int(), float(), str())."
                      en="Convert data between primitive data types (int(), float(), str())."
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Khởi động (Warm-up Activity) - Realistic Dialog Box from SGK Page 97 */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BilingualText
                vi="Khởi động: Dự đoán lệnh nhập dữ liệu input()"
                en="Warm-up: Predicting the input() Function"
              />
            </h2>
            <p className="text-xs text-slate-400">
              <BilingualText
                vi="SGK Trang 97 – Làm thế nào để phần mềm thu thập thông tin người dùng gõ vào?"
                en="Textbook Page 97 – How does software capture user keystrokes from the keyboard?"
              />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Explanation Text */}
          <div className="lg:col-span-7 space-y-3 text-sm text-slate-300 leading-relaxed">
            <p>
              <BilingualText
                vi="Để tương tác với người sử dụng trong khi thực hiện chương trình, các ngôn ngữ lập trình có các câu lệnh để đưa dữ liệu ra màn hình hay nhập dữ liệu vào từ bàn phím."
                en="To interact with users during execution, programming languages provide statements to output data to the screen or read data from the keyboard."
              />
            </p>
            <p>
              <BilingualText
                vi="Em đã biết Python có lệnh print() dùng để đưa dữ liệu ra màn hình. Để nhập dữ liệu từ bàn phím khi thực hiện chương trình, Python sử dụng câu lệnh input()."
                en="You already know Python's print() function displays data on screen. To input data from the keyboard during runtime, Python uses the input() function."
              />
            </p>
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <BilingualText
                  vi="Câu hỏi khởi động:"
                  en="Warm-up Question:"
                />
              </span>
              <p className="text-slate-300">
                <BilingualText
                  vi="Em dự đoán lệnh nhập dữ liệu input() có cú pháp và chức năng như thế nào? Dữ liệu người dùng gõ vào sẽ có dạng số hay chuỗi chữ?"
                  en="What do you predict the syntax and function of input() to be? Will user inputs be treated as numbers or character strings?"
                />
              </p>
            </div>
          </div>

          {/* Interactive UI Dialog Box as shown in Fig Page 97 */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-700 bg-slate-950 shadow-2xl p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs text-slate-400">
                <span className="font-medium text-slate-300">
                  <BilingualText
                    vi="Hộp thoại nhập thông tin người dùng"
                    en="User Info Dialog Prompt"
                  />
                </span>
                <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-sky-400">
                  Python input() GUI
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    <BilingualText
                      vi="Hãy nhập tên đầy đủ:"
                      en="Enter your full name:"
                    />
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                    placeholder="Ví dụ: Nguyễn Văn An"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    <BilingualText
                      vi="Tên viết tắt:"
                      en="Abbreviated name:"
                    />
                  </label>
                  <input
                    type="text"
                    value={abbrName}
                    onChange={(e) => setAbbrName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                    placeholder="Ví dụ: AnNV"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setDialogSubmitted(true)}
                  className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-sky-600/30 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{bilingualMode === 'en' ? 'Confirm (OK)' : 'Xác nhận (OK)'}</span>
                </button>
              </div>

              {dialogSubmitted && (
                <div className="p-2.5 rounded-lg bg-sky-950/60 border border-sky-500/40 text-[11px] font-mono text-sky-200">
                  <div className="text-emerald-400 font-bold mb-0.5">
                    {bilingualMode === 'en' ? '✓ Captured Python input() data:' : '✓ Dữ liệu Python thu nhận qua input():'}
                  </div>
                  <div>ten_day_du = '{fullName}' ({bilingualMode === 'en' ? 'type str' : 'kiểu str'})</div>
                  <div>ten_viet_tat = '{abbrName}' ({bilingualMode === 'en' ? 'type str' : 'kiểu str'})</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Embedded 3D Three.js Simulation */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h2 className="text-lg font-bold text-white">
              <BilingualText
                vi="Mô hình 3D Three.js Tương tác Bài 18"
                en="Interactive 3D Three.js Pipeline - Lesson 18"
              />
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            <BilingualText
              vi="Kéo thả chuột xoay không gian 360° • 3 chế độ tương tác sâu"
              en="Click & drag to rotate 360° • 3 deep interactive modes"
            />
          </span>
        </div>
        <IOTypePipeline3DViewer />
      </div>

      {/* 4. Lesson Navigation Roadmap */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition">
          <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
            {bilingualMode === 'en' ? 'Section 1 (p. 97)' : 'Mục 1 (Trang 97)'}
          </span>
          <h4 className="text-sm font-bold text-white mt-2 mb-1">
            <BilingualText
              vi="Các lệnh vào ra đơn giản"
              en="Basic I/O Statements"
            />
          </h4>
          <p className="text-xs text-slate-400">
            <BilingualText
              vi="Hàm input() đọc từ bàn phím (luôn trả về str) và hàm print() xuất dữ liệu."
              en="The input() function reads keyboard input (always returning str) and print() displays output."
            />
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition">
          <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
            {bilingualMode === 'en' ? 'Section 2 (p. 98–99)' : 'Mục 2 (Trang 98–99)'}
          </span>
          <h4 className="text-sm font-bold text-white mt-2 mb-1">
            <BilingualText
              vi="Chuyển đổi kiểu dữ liệu"
              en="Type Casting in Python"
            />
          </h4>
          <p className="text-xs text-slate-400">
            <BilingualText
              vi="4 kiểu cơ bản int, float, str, bool, hàm type() và ép kiểu an toàn."
              en="4 primitive types (int, float, str, bool), type() inspection and safe conversion."
            />
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition">
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            {bilingualMode === 'en' ? 'Lab (p. 100)' : 'Thực hành (Trang 100)'}
          </span>
          <h4 className="text-sm font-bold text-white mt-2 mb-1">
            <BilingualText
              vi="Lồng int(input())"
              en="Nested int(input())"
            />
          </h4>
          <p className="text-xs text-slate-400">
            <BilingualText
              vi="Nhiệm vụ 1: Nhập 3 số m, n, p tính tổng; Nhiệm vụ 2: Nhập tên & tuổi học sinh."
              en="Task 1: Read m, n, p to calculate sum; Task 2: Read student name & age."
            />
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition">
          <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
            {bilingualMode === 'en' ? 'Practice & Apply' : 'Luyện tập & Vận dụng'}
          </span>
          <h4 className="text-sm font-bold text-white mt-2 mb-1">
            <BilingualText
              vi="Đổi giây & Tam giác Heron"
              en="Seconds Converter & Heron Area"
            />
          </h4>
          <p className="text-xs text-slate-400">
            <BilingualText
              vi="Chương trình đổi giây sang Ngày/Giờ/Phút/Giây và tính diện tích tam giác theo công thức Heron."
              en="Convert seconds to Days/Hours/Minutes/Seconds and calculate triangle area with Heron's formula."
            />
          </p>
        </div>
      </div>
    </div>
  );
};
