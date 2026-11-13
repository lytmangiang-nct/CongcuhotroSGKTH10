import React, { useState } from 'react';
import {
  Code2,
  Play,
  RotateCcw,
  Volume2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Terminal,
  CircleDot,
  Calculator,
  Compass
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section17PracticeLab: React.FC = () => {
  const { bilingualMode, speak, isSpeaking, stopSpeaking, nextPage } = useBook();

  // Task 1 Active Tab
  const [task1Tab, setTask1Tab] = useState<'a' | 'b' | 'c' | 'd'>('a');

  // Task 2 Script Editor
  const [circleRadius, setCircleRadius] = useState<number>(4.5);
  const [circlePi, setCirclePi] = useState<number>(3.14);
  const [task2Output, setTask2Output] = useState<string>('');
  const [isRunningScript, setIsRunningScript] = useState<boolean>(false);

  const handleRunTask2 = () => {
    setIsRunningScript(true);
    setTimeout(() => {
      const perimeter = 2 * circleRadius * circlePi;
      const area = circlePi * circleRadius * circleRadius;
      const fileHeader =
        bilingualMode === 'en'
          ? '================ RESTART: C:/Users/Admin/Circle.py ================\n'
          : '================ RESTART: C:/Users/Admin/HinhTron.py ================\n';
      const pLabel = bilingualMode === 'en' ? 'Circle perimeter is: ' : 'Chu vi hình tròn là: ';
      const aLabel = bilingualMode === 'en' ? 'Circle area is: ' : 'Diện tích hình tròn là: ';
      setTask2Output(
        `${fileHeader}${pLabel}${perimeter.toFixed(4)}\n${aLabel}${area.toFixed(4)}`
      );
      setIsRunningScript(false);
    }, 300);
  };

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textVi =
        'Phần Thực hành: Tạo và làm việc với biến, tính toán với các kiểu dữ liệu cơ bản trong Python. Nhiệm vụ 1: Thực hiện 4 phép tính biểu thức toán học. Nhiệm vụ 2: Soạn thảo chương trình tính chu vi và diện tích hình tròn với bán kính R bằng 4.5 và pi bằng 3.14.';
      const textEn =
        'Practice Lab: Creating and working with variables, calculating with basic data types in Python. Task 1: Evaluate mathematical expressions. Task 2: Write a script calculating circle perimeter and area with radius R=4.5 and pi=3.14.';
      speak(bilingualMode === 'en' ? textEn : textVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12 font-sans">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
            {bilingualMode === 'en'
              ? 'Hands-on Practice Lab • Pages 95 – 96'
              : 'Phần Thực hành • SGK Tin học 10 Trang 95 – 96'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {bilingualMode === 'en'
              ? 'Hands-on Practice: Variables & Computations'
              : 'Thực hành: Tạo và làm việc với biến trong Python'}
          </h1>
        </div>
      </div>

      {/* Task 1: Evaluating Mathematical Expressions (Nhiệm vụ 1 - Trang 95-96) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-black text-base">
          <Calculator className="w-5 h-5" />
          <span>
            {bilingualMode === 'en'
              ? 'Task 1: Execute Calculations in Python Environment (Page 95)'
              : 'Nhiệm vụ 1: Thực hiện các phép tính trong môi trường Python (Trang 95)'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          {bilingualMode === 'en'
            ? 'Select each mathematical expression below to inspect the corresponding Python statement and verify the result:'
            : 'Chọn từng biểu thức toán học dưới đây để xem câu lệnh tương ứng trong Python và đối chiếu kết quả:'}
        </p>

        {/* Tab selection for a, b, c, d */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'a', label: 'a) (1 + 2 + ... + 10)³' },
            { id: 'b', label: 'b) 1/2 + 1/3 + 1/4 + 1/5' },
            {
              id: 'c',
              label:
                bilingualMode === 'en'
                  ? 'c) (x+y)(x² + y² - 1) with x=2, y=5'
                  : 'c) (x+y)(x² + y² - 1) với x=2, y=5'
            },
            {
              id: 'd',
              label:
                bilingualMode === 'en'
                  ? 'd) (a+b+c)(a+b-c) with a=2, b=3, c=4'
                  : 'd) (a+b+c)(a+b-c) với a=2, b=3, c=4'
            }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTask1Tab(tab.id as 'a' | 'b' | 'c' | 'd')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                task1Tab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Task 1 Output View */}
        <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm space-y-2 text-slate-200 border border-slate-800">
          {task1Tab === 'a' && (
            <>
              <div className="text-slate-400">
                {bilingualMode === 'en'
                  ? '# Math expression: (1 + 2 + 3 + ... + 10)³ = 55³'
                  : '# Biểu thức toán: (1 + 2 + 3 + ... + 10)³ = 55³'}
              </div>
              <div className="text-cyan-300">&gt;&gt;&gt; (1+2+3+4+5+6+7+8+9+10)**3</div>
              <div className="text-amber-400 font-bold">166375</div>
              <div className="text-slate-500 font-sans text-xs pt-1">
                {bilingualMode === 'en'
                  ? '✓ Comparison: In mathematics 55 * 55 * 55 = 166,375. Python evaluates instantly via exponentiation operator **3.'
                  : '✓ So sánh: Toán học 55 * 55 * 55 = 166,375. Python tính toán tức thời bằng toán tử lũy thừa **3.'}
              </div>
            </>
          )}

          {task1Tab === 'b' && (
            <>
              <div className="text-slate-400">
                {bilingualMode === 'en'
                  ? '# Math expression: 1/2 + 1/3 + 1/4 + 1/5 = 77/60'
                  : '# Biểu thức toán: 1/2 + 1/3 + 1/4 + 1/5 = 77/60'}
              </div>
              <div className="text-cyan-300">&gt;&gt;&gt; 1/2 + 1/3 + 1/4 + 1/5</div>
              <div className="text-amber-400 font-bold">1.2833333333333332</div>
              <div className="text-slate-500 font-sans text-xs pt-1">
                {bilingualMode === 'en'
                  ? '✓ Comparison: 77/60 ≈ 1.28333... Division operator / automatically generates high-precision float.'
                  : '✓ So sánh: 77/60 ≈ 1.28333... Các phép chia / tự động sinh số thực có độ chính xác cao.'}
              </div>
            </>
          )}

          {task1Tab === 'c' && (
            <>
              <div className="text-slate-400">
                {bilingualMode === 'en'
                  ? '# Assign x = 2, y = 5 then compute: (x+y)(x² + y² - 1)'
                  : '# Gán x = 2, y = 5 rồi tính: (x+y)(x² + y² - 1)'}
              </div>
              <div className="text-cyan-300">&gt;&gt;&gt; x, y = 2, 5</div>
              <div className="text-cyan-300">&gt;&gt;&gt; (x+y)*(x**2 + y**2 - 1)</div>
              <div className="text-amber-400 font-bold">196</div>
              <div className="text-slate-500 font-sans text-xs pt-1">
                {bilingualMode === 'en'
                  ? '✓ Comparison: (2+5) * (4 + 25 - 1) = 7 * 28 = 196. Note: explicit * multiplication operator required between parentheses.'
                  : '✓ So sánh: (2+5) * (4 + 25 - 1) = 7 * 28 = 196. Lưu ý phải có dấu nhân * giữa hai ngoặc.'}
              </div>
            </>
          )}

          {task1Tab === 'd' && (
            <>
              <div className="text-slate-400">
                {bilingualMode === 'en'
                  ? '# Assign a = 2, b = 3, c = 4 then compute: (a+b+c)(a+b-c)'
                  : '# Gán a = 2, b = 3, c = 4 rồi tính: (a+b+c)(a+b-c)'}
              </div>
              <div className="text-cyan-300">&gt;&gt;&gt; a, b, c = 2, 3, 4</div>
              <div className="text-cyan-300">&gt;&gt;&gt; (a+b+c)*(a+b-c)</div>
              <div className="text-amber-400 font-bold">9</div>
              <div className="text-slate-500 font-sans text-xs pt-1">
                {bilingualMode === 'en'
                  ? '✓ Comparison: (2+3+4) * (2+3-4) = 9 * 1 = 9. Simultaneous 3-variable assignment is concise and efficient.'
                  : '✓ So sánh: (2+3+4) * (2+3-4) = 9 * 1 = 9. Phép gán đồng thời 3 biến cực kỳ gọn nhẹ.'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Task 2: Circle Perimeter & Area Script (Nhiệm vụ 2 - Trang 96) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-black text-base">
            <CircleDot className="w-5 h-5" />
            <span>
              {bilingualMode === 'en'
                ? 'Task 2: Draft Circle Perimeter & Area Script (Page 96)'
                : 'Nhiệm vụ 2: Soạn thảo chương trình tính Chu vi & Diện tích hình tròn (Trang 96)'}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {bilingualMode === 'en' ? 'File: Circle.py' : 'Tệp: HinhTron.py'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Virtual Python Script Editor */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold">
                {bilingualMode === 'en' ? 'Script Editor Window:' : 'Cửa sổ soạn thảo (Script Editor):'}
              </span>
              <span>{bilingualMode === 'en' ? 'F5 Run Module Mode' : 'Chế độ F5 Run Module'}</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm space-y-1.5 border border-slate-800 text-slate-200">
              <div className="text-slate-400">
                {bilingualMode === 'en'
                  ? '# Circle perimeter and area calculation problem'
                  : '# Bài toán tính chu vi và diện tích hình tròn'}
              </div>
              <div className="text-cyan-300">
                R = <span className="text-amber-300">{circleRadius}</span>
              </div>
              <div className="text-cyan-300">
                pi = <span className="text-amber-300">{circlePi}</span>
              </div>
              <div className="text-purple-400">
                print(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Circle perimeter is:"' : '"Chu vi hình tròn là:"'}
                </span>, 2*R*pi)
              </div>
              <div className="text-purple-400">
                print(
                <span className="text-emerald-300">
                  {bilingualMode === 'en' ? '"Circle area is:"' : '"Diện tích hình tròn là:"'}
                </span>, pi*R*R)
              </div>
            </div>

            {/* Adjustable Radius Input */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold">
                  {bilingualMode === 'en' ? 'Change radius R:' : 'Thay đổi bán kính R:'}
                </span>
                <input
                  type="number"
                  step={0.5}
                  value={circleRadius}
                  onChange={(e) => setCircleRadius(Number(e.target.value))}
                  className="w-20 p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono text-xs text-center font-bold"
                />
              </div>

              <button
                type="button"
                onClick={handleRunTask2}
                disabled={isRunningScript}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{bilingualMode === 'en' ? 'Run F5' : 'Chạy F5'}</span>
              </button>
            </div>
          </div>

          {/* Virtual Terminal Output */}
          <div className="space-y-3">
            <div className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>
                {bilingualMode === 'en'
                  ? 'Interactive Output Shell (Python IDLE Shell):'
                  : 'Màn hình hiển thị kết quả (Python IDLE Shell):'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black font-mono text-xs text-emerald-400 border border-slate-800 min-h-[170px] whitespace-pre-wrap flex flex-col justify-between">
              <div>
                {task2Output || (
                  <span className="text-slate-500">
                    {bilingualMode === 'en'
                      ? 'Click "Run F5" to execute script Circle.py...'
                      : 'Bấm "Chạy F5" để thực thi chương trình HinhTron.py...'}
                  </span>
                )}
              </div>

              {task2Output && (
                <div className="text-slate-500 text-[11px] pt-3 border-t border-slate-900">
                  ✓ {bilingualMode === 'en' ? 'Perimeter' : 'Chu vi'} = 2 * {circleRadius} * {circlePi} = {(2 * circleRadius * circlePi).toFixed(2)}
                  <br />✓ {bilingualMode === 'en' ? 'Area' : 'Diện tích'} = {circlePi} * {circleRadius}² = {(circlePi * circleRadius * circleRadius).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={4} lessonId={17} />

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:scale-95 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
        >
          <span>
            {bilingualMode === 'en'
              ? 'Continue to Section 5: Practice, Application & Assessment'
              : 'Tiếp tục Mục 5: Luyện tập, Vận dụng & Kiểm tra'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
