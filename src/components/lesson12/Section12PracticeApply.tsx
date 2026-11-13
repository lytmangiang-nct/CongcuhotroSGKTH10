import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  HelpCircle,
  Volume2,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Sparkles,
  Layers,
  Palette,
  Flag,
  Globe,
  Compass,
  Check,
  RotateCcw,
  Square,
  Circle,
  Triangle,
  Shapes
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section12PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isAllSectionsComplete
  } = useBook();

  // Accordion toggle states
  const [showPractice1, setShowPractice1] = useState(true);
  const [showPractice2, setShowPractice2] = useState(false);
  const [showApply1, setShowApply1] = useState(true);
  const [showApply2, setShowApply2] = useState(false);

  // Interactive Practice 1 (Circle color sequence sandbox)
  const [circleFill, setCircleFill] = useState('#e2e8f0');
  const [circleStroke, setCircleStroke] = useState('#475569');
  const [practice1Step, setPractice1Step] = useState(0);

  // Interactive Practice 2 (Multiple choice)
  const [practice2Answer, setPractice2Answer] = useState<string | null>(null);
  const [practice2Checked, setPractice2Checked] = useState(false);

  // Interactive Apply 1 (Flag selection & interactive SVG showcase)
  const [selectedFlag, setSelectedFlag] = useState<'thailand' | 'laos' | 'myanmar' | 'uk'>('thailand');

  // Interactive Apply 2 (Geometric animal builder preview)
  const [selectedAnimal, setSelectedAnimal] = useState<'dog' | 'deer'>('dog');

  const sectionSpeechVi =
    'Mục 5: Luyện tập và Vận dụng Bài 12. Hoàn thành 2 bài tập Luyện tập và 2 bài tập Vận dụng theo SGK Trang 68: Thực nghiệm thứ tự thao tác tô màu Fill và màu viền Stroke trên hình tròn; xác định vị trí công cụ tạo hình 3D trong Hộp công cụ; thiết kế quốc kỳ 4 quốc gia Thái Lan, Lào, Myanmar, Vương quốc Anh bằng các dải màu và hình học; và ghép hình động vật sáng tạo bằng các hình khối cơ bản. Hãy làm bài kiểm tra 10 câu hỏi để nhận Chứng chỉ KNTT10-B12.';
  const sectionSpeechEn =
    'Section 5: Practice Exercises and Real-World Applications for Lesson 12. Complete 2 practice and 2 application tasks from Page 68: experiment with Fill and Stroke color sequence on an interactive circle; locate 3D creation tools in the Toolbox; design national flags for Thailand, Laos, Myanmar, and the UK using vector stripes and geometry; and assemble animal illustrations using primitive shapes. Complete the 10-question evaluation to unlock certificate KNTT10-B12.';

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(
        bilingualMode === 'en' ? sectionSpeechEn : sectionSpeechVi,
        bilingualMode === 'en' ? 'en' : 'vi'
      );
    }
  };

  const isEligibleForCert =
    isAllSectionsComplete && certificate && certificate.score >= 8;

  // Handler for Practice 1 sequence
  const handlePractice1Step = (step: number) => {
    setPractice1Step(step);
    if (step === 1) {
      setCircleFill('#ef4444'); // Đỏ
    } else if (step === 2) {
      setCircleFill('#eab308'); // Vàng
    } else if (step === 3) {
      setCircleFill('#f97316'); // Cam
    } else if (step === 4) {
      setCircleStroke('#ef4444'); // Viền Đỏ (Shift + click)
    } else {
      setCircleFill('#e2e8f0');
      setCircleStroke('#475569');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-cyan-900 text-white p-6 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-blue-100 text-xs font-semibold backdrop-blur-sm mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>
                <BilingualText
                  vi="Tổng kết, Luyện tập & Đánh giá năng lực thiết kế"
                  en="Summary, Practice & Vector Design Competency Assessment"
                />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <BilingualText
                vi="5. LUYỆN TẬP VÀ VẬN DỤNG THỰC TẾ"
                en="5. PRACTICE EXERCISES & REAL-WORLD APPLICATIONS"
              />
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              <BilingualText
                vi="Áp dụng quy tắc phối màu Fill/Stroke, hộp công cụ Inkscape và kỹ năng xếp lớp vector để giải quyết bài tập và thử thách thiết kế trong SGK Trang 68."
                en="Apply Fill/Stroke rules, Inkscape Toolbox mastery, and vector layering logic to solve exercises and creative flag/animal challenges from Page 68."
              />
            </p>
          </div>
        </div>
      </div>

      {/* Grid of 2 Practice Exercises */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            <BilingualText
              vi="PHẦN 1: BÀI TẬP LUYỆN TẬP (SGK TRANG 68)"
              en="PART 1: PRACTICE EXERCISES (TEXTBOOK PAGE 68)"
            />
          </h3>
        </div>

        {/* Practice Exercise 1 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all">
          <button
            onClick={() => setShowPractice1(!showPractice1)}
            className="w-full p-5 text-left flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  <BilingualText
                    vi="Luyện tập 1: Thao tác đổi màu hình tròn với Fill và Shift+Click"
                    en="Practice 1: Circle color changes via Fill and Shift+Click (Stroke)"
                  />
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <BilingualText
                    vi="Vẽ hình tròn, nháy màu Đỏ -> Vàng -> Cam -> Shift + Đỏ"
                    en="Draw circle, click Red -> Yellow -> Orange -> Shift + Red"
                  />
                </p>
              </div>
            </div>
            {showPractice1 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showPractice1 && (
            <div className="p-6 space-y-6 border-t border-slate-200 dark:border-slate-700">
              <div className="bg-blue-50 dark:bg-blue-950/40 p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 text-sm">
                <p className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  <BilingualText
                    vi="Đề bài SGK Trang 68:"
                    en="Textbook Prompt (Page 68):"
                  />
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  <BilingualText
                    vi="« Em hãy vẽ một hình tròn và thực hiện lần lượt các thao tác sau: nháy chuột vào ô màu Đỏ, nháy chuột vào ô màu Vàng, nháy chuột vào ô màu Cam, nhấn giữ phím Shift và nháy chuột vào ô màu Đỏ. Quan sát và cho biết hình tròn có màu sắc thay đổi như thế nào sau mỗi thao tác. »"
                    en="« Draw a circle and perform the following actions sequentially: click the Red swatch, click the Yellow swatch, click the Orange swatch, hold down Shift and click the Red swatch. Observe and describe how the circle's colors change after each action. »"
                  />
                </p>
              </div>

              {/* Interactive Step-by-Step Simulator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
                    <BilingualText
                      vi="VÙNG VẼ MÔ PHỎNG INKSCAPE"
                      en="INKSCAPE SIMULATION CANVAS"
                    />
                  </div>
                  <svg width="220" height="220" className="drop-shadow-md">
                    <rect
                      x="5"
                      y="5"
                      width="210"
                      height="210"
                      fill="#ffffff"
                      stroke="#cbd5e1"
                      strokeDasharray="4 4"
                      rx="8"
                    />
                    <circle
                      cx="110"
                      cy="110"
                      r="70"
                      fill={circleFill}
                      stroke={circleStroke}
                      strokeWidth="10"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="mt-4 flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-slate-400" style={{ backgroundColor: circleFill }} />
                      <span className="text-slate-600 dark:text-slate-300">
                        <strong>Fill:</strong> {circleFill}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full border border-slate-400" style={{ backgroundColor: circleStroke }} />
                      <span className="text-slate-600 dark:text-slate-300">
                        <strong>Stroke:</strong> {circleStroke}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step Controls */}
                <div className="space-y-3">
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                    <BilingualText
                      vi="Bấm từng bước để xem phản ứng trực quan:"
                      en="Click each step to observe live reaction:"
                    />
                  </div>

                  <button
                    onClick={() => handlePractice1Step(1)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      practice1Step === 1
                        ? 'bg-red-500 text-white border-red-600 shadow'
                        : 'bg-white dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{bilingualMode === 'en' ? '1. Click Red swatch' : '1. Nháy chuột vào ô màu Đỏ (Click Red)'}</span>
                    <span className="text-xs opacity-80">Fill = #ef4444</span>
                  </button>

                  <button
                    onClick={() => handlePractice1Step(2)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      practice1Step === 2
                        ? 'bg-yellow-500 text-slate-900 border-yellow-600 shadow font-bold'
                        : 'bg-white dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{bilingualMode === 'en' ? '2. Click Yellow swatch' : '2. Nháy chuột vào ô màu Vàng (Click Yellow)'}</span>
                    <span className="text-xs opacity-80">Fill = #eab308</span>
                  </button>

                  <button
                    onClick={() => handlePractice1Step(3)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      practice1Step === 3
                        ? 'bg-orange-500 text-white border-orange-600 shadow'
                        : 'bg-white dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{bilingualMode === 'en' ? '3. Click Orange swatch' : '3. Nháy chuột vào ô màu Cam (Click Orange)'}</span>
                    <span className="text-xs opacity-80">Fill = #f97316</span>
                  </button>

                  <button
                    onClick={() => handlePractice1Step(4)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      practice1Step === 4
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-red-700 shadow'
                        : 'bg-white dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{bilingualMode === 'en' ? '4. Hold Shift + Click Red swatch' : '4. Giữ phím Shift + Nháy ô màu Đỏ (Shift+Click Red)'}</span>
                    <span className="text-xs opacity-80">Stroke = #ef4444</span>
                  </button>

                  <button
                    onClick={() => handlePractice1Step(0)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 pt-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <BilingualText vi="Đặt lại ban đầu" en="Reset to initial" />
                  </button>
                </div>
              </div>

              {/* Concluding explanation box */}
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <BilingualText
                    vi="Kết luận chính xác theo chuẩn SGK:"
                    en="Official Textbook Scientific Conclusion:"
                  />
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300 pl-2">
                  <li>
                    <BilingualText
                      vi="Nháy chuột bình thường lên Bảng màu: Thay đổi màu tô (Fill) của hình được chọn. Lần lượt biến thành Đỏ, Vàng, rồi Cam."
                      en="Standard mouse click on the Color Palette: Updates the Fill color. The circle sequentially becomes Red, Yellow, then Orange."
                    />
                  </li>
                  <li>
                    <BilingualText
                      vi="Giữ phím Shift và nháy chuột lên ô màu Đỏ: Thiết lập màu viền (Stroke) của hình thành màu Đỏ, trong khi màu tô (Fill) vẫn giữ nguyên màu Cam."
                      en="Holding Shift and clicking the Red swatch: Configures the Stroke outline color to Red, while the interior Fill remains Orange."
                    />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Practice Exercise 2 */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all">
          <button
            onClick={() => setShowPractice2(!showPractice2)}
            className="w-full p-5 text-left flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  <BilingualText
                    vi="Luyện tập 2: Vị trí công cụ tạo hình 3D trong giao diện Inkscape"
                    en="Practice 2: Locating 3D Box tools in the Inkscape GUI"
                  />
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <BilingualText
                    vi="Chọn vị trí chính xác của công cụ Create 3D boxes"
                    en="Identify the correct GUI area for 3D creation tools"
                  />
                </p>
              </div>
            </div>
            {showPractice2 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showPractice2 && (
            <div className="p-6 space-y-6 border-t border-slate-200 dark:border-slate-700">
              <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 text-sm">
                <p className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                  <BilingualText
                    vi="Đề bài SGK Trang 68:"
                    en="Textbook Prompt (Page 68):"
                  />
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  <BilingualText
                    vi="« Nếu muốn thay đổi ngôi sao trong hình thành một khối lập phương em sẽ tìm công cụ vẽ ở đâu? »"
                    en="« If you wish to replace the star with a 3D cube, where would you locate the drawing tool? »"
                  />
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'A',
                    labelVi: 'A. Thanh bảng chọn (Menu bar)',
                    labelEn: 'A. Menu bar'
                  },
                  {
                    id: 'B',
                    labelVi: 'B. Thanh điều khiển thuộc tính (Tool control bar)',
                    labelEn: 'B. Tool control bar'
                  },
                  {
                    id: 'C',
                    labelVi: 'C. Hộp công cụ (Tool box)',
                    labelEn: 'C. Tool box'
                  },
                  {
                    id: 'D',
                    labelVi: 'D. Hộp thoại lệnh (Command dialog)',
                    labelEn: 'D. Command dialog'
                  }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setPractice2Answer(opt.id);
                      setPractice2Checked(true);
                    }}
                    className={`p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${
                      practice2Answer === opt.id
                        ? opt.id === 'C'
                          ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-semibold'
                          : 'bg-rose-500 text-white border-rose-600 shadow-md font-semibold'
                        : 'bg-white dark:bg-slate-700/60 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>
                      <BilingualText vi={opt.labelVi} en={opt.labelEn} />
                    </span>
                    {practice2Checked && opt.id === 'C' && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                  </button>
                ))}
              </div>

              {practice2Checked && practice2Answer === 'C' && (
                <div className="p-4 rounded-xl border text-xs sm:text-sm bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 animate-in fade-in">
                  <div className="font-bold flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <BilingualText vi="✓ Đáp án đúng là C." en="✓ The correct answer is C." />
                  </div>
                  <p className="leading-relaxed">
                    <BilingualText
                      vi="Hộp công cụ (Tool box) nằm ở mép trái màn hình Inkscape, chứa toàn bộ các công cụ tạo đối tượng đồ hoạ cơ bản: hình chữ nhật, hình elip/tròn, hình sao/đa giác và công cụ 'Create 3D boxes' (phím tắt Shift + F4) để vẽ khối hộp lập phương 3 chiều có các điểm tụ (vanishing points)."
                      en="The Tool box along the left edge of Inkscape hosts all fundamental drawing tools: rectangles, ellipses/circles, stars/polygons, and the 'Create 3D boxes' tool (Shift+F4) for rendering isometric 3D perspective boxes with adjustable vanishing points."
                    />
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Grid of 2 Real-World Application Challenges */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            <BilingualText
              vi="PHẦN 2: THỰC HÀNH VẬN DỤNG SÁNG TẠO (SGK TRANG 68)"
              en="PART 2: CREATIVE APPLICATION CHALLENGES (TEXTBOOK PAGE 68)"
            />
          </h3>
        </div>

        {/* Application 1: National Flags */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all">
          <button
            onClick={() => setShowApply1(!showApply1)}
            className="w-full p-5 text-left flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow">
                <Flag className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  <BilingualText
                    vi="Vận dụng 1: Thiết kế quốc kỳ 4 quốc gia (Thái Lan, Lào, Myanmar, Anh)"
                    en="Application 1: Designing National Flags (Thailand, Laos, Myanmar, UK)"
                  />
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <BilingualText
                    vi="Áp dụng hình chữ nhật, sao đa giác và căn chỉnh tỉ lệ chuẩn"
                    en="Applying rectangle stripes, star polygons, and standard proportions"
                  />
                </p>
              </div>
            </div>
            {showApply1 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showApply1 && (
            <div className="p-6 space-y-6 border-t border-slate-200 dark:border-slate-700">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 text-sm">
                <p className="font-semibold text-emerald-900 dark:text-emerald-200 mb-2">
                  <BilingualText
                    vi="Đề bài SGK Trang 68 (Hình 12.7):"
                    en="Textbook Prompt (Page 68, Figure 12.7):"
                  />
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  <BilingualText
                    vi="« Hãy vẽ quốc kỳ của các quốc gia: Thái Lan, Lào, Myanmar, Anh (Hình 12.7). »"
                    en="« Draw the national flags of the following countries: Thailand, Laos, Myanmar, and the United Kingdom (Figure 12.7). »"
                  />
                </p>
              </div>

              {/* Country Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'thailand', nameVi: 'Thái Lan (5 dải)', nameEn: 'Thailand (5 stripes)' },
                  { id: 'laos', nameVi: 'Lào (3 dải + đĩa tròn)', nameEn: 'Laos (3 stripes + circle)' },
                  { id: 'myanmar', nameVi: 'Myanmar (3 dải + sao lớn)', nameEn: 'Myanmar (3 stripes + star)' },
                  { id: 'uk', nameVi: 'Vương quốc Anh (Chữ thập kép)', nameEn: 'United Kingdom (Union Flag)' }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedFlag(c.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      selectedFlag === c.id
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    <BilingualText vi={c.nameVi} en={c.nameEn} />
                  </button>
                ))}
              </div>

              {/* Vector Flag Canvas & Technical Decomposition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                {/* SVG Live Rendering */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full max-w-[320px] aspect-[3/2] rounded-lg overflow-hidden border-2 border-slate-300 dark:border-slate-600 shadow-xl bg-white">
                    {selectedFlag === 'thailand' && (
                      <svg viewBox="0 0 900 600" className="w-full h-full">
                        {/* Thailand: Red 1, White 1, Blue 2, White 1, Red 1 (Total 6 units: 100, 100, 200, 100, 100) */}
                        <rect width="900" height="100" fill="#A51931" />
                        <rect y="100" width="900" height="100" fill="#F4F5F8" />
                        <rect y="200" width="900" height="200" fill="#2D2A4A" />
                        <rect y="400" width="900" height="100" fill="#F4F5F8" />
                        <rect y="500" width="900" height="100" fill="#A51931" />
                      </svg>
                    )}
                    {selectedFlag === 'laos' && (
                      <svg viewBox="0 0 900 600" className="w-full h-full">
                        {/* Laos: Red 150, Blue 300, Red 150, White Circle r=120 */}
                        <rect width="900" height="150" fill="#CE1126" />
                        <rect y="150" width="900" height="300" fill="#002868" />
                        <rect y="450" width="900" height="150" fill="#CE1126" />
                        <circle cx="450" cy="300" r="120" fill="#FFFFFF" />
                      </svg>
                    )}
                    {selectedFlag === 'myanmar' && (
                      <svg viewBox="0 0 900 600" className="w-full h-full">
                        {/* Myanmar: Yellow 200, Green 200, Red 200, Big 5-point white star */}
                        <rect width="900" height="200" fill="#FECB00" />
                        <rect y="200" width="900" height="200" fill="#34B233" />
                        <rect y="400" width="900" height="200" fill="#EA2839" />
                        {/* Star at center cx=450 cy=330 outer radius 180 */}
                        <polygon
                          points="450,150 493,280 630,280 520,360 562,490 450,410 338,490 380,360 270,280 407,280"
                          fill="#FFFFFF"
                        />
                      </svg>
                    )}
                    {selectedFlag === 'uk' && (
                      <svg viewBox="0 0 900 600" className="w-full h-full">
                        {/* UK Union Flag */}
                        <rect width="900" height="600" fill="#012169" />
                        {/* White diagonals */}
                        <path d="M0,0 L900,600 M900,0 L0,600" stroke="#FFFFFF" strokeWidth="100" />
                        {/* Red diagonals */}
                        <path d="M0,0 L450,300 M900,0 L450,300 M900,600 L450,300 M0,600 L450,300" stroke="#C8102E" strokeWidth="35" />
                        {/* White upright cross */}
                        <path d="M450,0 V600 M0,300 H900" stroke="#FFFFFF" strokeWidth="170" />
                        {/* Red upright cross */}
                        <path d="M450,0 V600 M0,300 H900" stroke="#C8102E" strokeWidth="100" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    <BilingualText vi="Bản vẽ Vector SVG tỉ lệ chuẩn" en="Standard SVG Vector Layout" />
                  </span>
                </div>

                {/* Technical Steps Guide */}
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <BilingualText
                      vi="Quy trình vẽ bằng Inkscape:"
                      en="Step-by-step Inkscape drawing strategy:"
                    />
                  </div>

                  {selectedFlag === 'thailand' && (
                    <div className="space-y-2 text-slate-600 dark:text-slate-300">
                      <p>
                        <strong>1. </strong>
                        <BilingualText
                          vi="Dùng phím F4 vẽ 5 hình chữ nhật ngang xếp liền kề nhau: Tỉ lệ chiều cao là 1 : 1 : 2 : 1 : 1."
                          en="Press F4 to draw 5 horizontal adjacent rectangles: Height ratios 1 : 1 : 2 : 1 : 1."
                        />
                      </p>
                      <p>
                        <strong>2. </strong>
                        <BilingualText
                          vi="Tô màu Fill lần lượt từ trên xuống: Đỏ (#A51931), Trắng (#FFFFFF), Xanh lam (#2D2A4A), Trắng, Đỏ."
                          en="Set Fill colors top to bottom: Red (#A51931), White (#FFFFFF), Deep Blue (#2D2A4A), White, Red."
                        />
                      </p>
                      <p>
                        <strong>3. </strong>
                        <BilingualText
                          vi="Đặt màu viền Stroke = None cho cả 5 hình (nháy chuột vào ô dấu gạch chéo X đầu bảng màu khi giữ Shift)."
                          en="Set Stroke = None for all 5 bars (hold Shift and click the X swatch at palette start)."
                        />
                      </p>
                    </div>
                  )}

                  {selectedFlag === 'laos' && (
                    <div className="space-y-2 text-slate-600 dark:text-slate-300">
                      <p>
                        <strong>1. </strong>
                        <BilingualText
                          vi="Vẽ 3 hình chữ nhật ngang tỉ lệ 1 : 2 : 1: Đỏ, Xanh lam thẫm, Đỏ."
                          en="Draw 3 horizontal stripes ratio 1 : 2 : 1: Red, Deep Blue, Red."
                        />
                      </p>
                      <p>
                        <strong>2. </strong>
                        <BilingualText
                          vi="Nhấn F5 (Create circles, ellipses), giữ phím Ctrl khi kéo chuột để tạo hình tròn hoàn hảo ở giữa."
                          en="Press F5 (Circles/Ellipses), hold Ctrl while dragging to create a perfect center circle."
                        />
                      </p>
                      <p>
                        <strong>3. </strong>
                        <BilingualText
                          vi="Tô màu Fill hình tròn màu Trắng, Stroke = None. Canh giữa trang bằng hộp thoại Align and Distribute (Ctrl+Shift+A)."
                          en="Set Circle Fill to White, Stroke = None. Center on page using Align and Distribute (Ctrl+Shift+A)."
                        />
                      </p>
                    </div>
                  )}

                  {selectedFlag === 'myanmar' && (
                    <div className="space-y-2 text-slate-600 dark:text-slate-300">
                      <p>
                        <strong>1. </strong>
                        <BilingualText
                          vi="Vẽ 3 dải ngang bằng nhau: Vàng tươi (#FECB00), Xanh lá (#34B233), Đỏ (#EA2839)."
                          en="Draw 3 equal stripes: Yellow (#FECB00), Green (#34B233), Red (#EA2839)."
                        />
                      </p>
                      <p>
                        <strong>2. </strong>
                        <BilingualText
                          vi="Chọn công cụ Stars and Polygons (*), chọn chế độ Ngôi sao, Corners = 5, Spoke ratio = 0.382."
                          en="Select Stars and Polygons (*), choose Star mode, Corners = 5, Spoke ratio = 0.382."
                        />
                      </p>
                      <p>
                        <strong>3. </strong>
                        <BilingualText
                          vi="Vẽ ngôi sao lớn màu Trắng ở giữa, điều chỉnh đỉnh ngôi sao hướng thẳng đứng lên trên (giữ Ctrl khi xoay)."
                          en="Draw a large White star centered, keep top vertex pointing straight up (hold Ctrl while rotating)."
                        />
                      </p>
                    </div>
                  )}

                  {selectedFlag === 'uk' && (
                    <div className="space-y-2 text-slate-600 dark:text-slate-300">
                      <p>
                        <strong>1. </strong>
                        <BilingualText
                          vi="Vẽ hình chữ nhật nền xanh hải quân (#012169)."
                          en="Draw navy blue rectangle background (#012169)."
                        />
                      </p>
                      <p>
                        <strong>2. </strong>
                        <BilingualText
                          vi="Vẽ các dải chéo màu Trắng và Đỏ (Thánh Andrew & Thánh Patrick)."
                          en="Draw diagonal White and Red saltire stripes (St Andrew & St Patrick)."
                        />
                      </p>
                      <p>
                        <strong>3. </strong>
                        <BilingualText
                          vi="Vẽ chữ thập chữ nhật màu Trắng dày (Thánh George), xếp lên trên bằng chữ thập màu Đỏ mảnh hơn."
                          en="Draw wide White cross (St George), layered on top with a narrower Red cross."
                        />
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Application 2: Geometric Animal Assembly */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all">
          <button
            onClick={() => setShowApply2(!showApply2)}
            className="w-full p-5 text-left flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow">
                <Shapes className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  <BilingualText
                    vi="Vận dụng 2: Ghép hình con vật sáng tạo từ các khối cơ bản (Hình 12.8)"
                    en="Application 2: Creative Animal Assembly from Geometric Primitives (Figure 12.8)"
                  />
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <BilingualText
                    vi="Mô phỏng hình chú chó và hươu cao cổ nhỏ bằng hình chữ nhật, tròn, tam giác"
                    en="Simulate dog and small deer models using rectangles, circles, and triangles"
                  />
                </p>
              </div>
            </div>
            {showApply2 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {showApply2 && (
            <div className="p-6 space-y-6 border-t border-slate-200 dark:border-slate-700">
              <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 text-sm">
                <p className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
                  <BilingualText
                    vi="Đề bài SGK Trang 68 (Hình 12.8):"
                    en="Textbook Prompt (Page 68, Figure 12.8):"
                  />
                </p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  <BilingualText
                    vi="« Sử dụng các hình cơ bản đã học, em hãy vẽ lại các hình sau đây (Hình 12.8: con chó & con hươu nhỏ). »"
                    en="« Using the basic shapes learned, redraw the following figures (Figure 12.8: cartoon puppy and baby deer). »"
                  />
                </p>
              </div>

              {/* Selector */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedAnimal('dog')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedAnimal === 'dog'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <BilingualText vi="1. Chú chó tinh nghịch" en="1. Playful Puppy" />
                </button>
                <button
                  onClick={() => setSelectedAnimal('deer')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedAnimal === 'deer'
                      ? 'bg-purple-600 text-white shadow'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <BilingualText vi="2. Chú hươu nhỏ đáng yêu" en="2. Cute Baby Deer" />
                </button>
              </div>

              {/* Animal SVG Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-[260px] h-[260px] bg-amber-50 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 flex items-center justify-center p-4 shadow-inner">
                    {selectedAnimal === 'dog' ? (
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow">
                        {/* Body: Rounded Rectangle */}
                        <rect x="50" y="80" width="100" height="60" rx="15" fill="#f59e0b" stroke="#78350f" strokeWidth="3" />
                        {/* Legs: 4 Rectangles */}
                        <rect x="60" y="140" width="16" height="40" rx="6" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
                        <rect x="85" y="140" width="16" height="40" rx="6" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
                        <rect x="115" y="140" width="16" height="40" rx="6" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
                        <rect x="130" y="140" width="16" height="40" rx="6" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
                        {/* Head: Circle */}
                        <circle cx="60" cy="65" r="32" fill="#fbbf24" stroke="#78350f" strokeWidth="3" />
                        {/* Snout */}
                        <ellipse cx="42" cy="72" rx="16" ry="12" fill="#fef3c7" stroke="#78350f" strokeWidth="2" />
                        <circle cx="34" cy="70" r="5" fill="#1e293b" />
                        {/* Eye */}
                        <circle cx="56" cy="58" r="4.5" fill="#1e293b" />
                        <circle cx="58" cy="56" r="1.5" fill="#ffffff" />
                        {/* Ear: Triangle / Polygon */}
                        <polygon points="68,36 90,45 80,68" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
                        {/* Tail */}
                        <polygon points="148,85 178,65 155,95" fill="#d97706" stroke="#78350f" strokeWidth="2" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow">
                        {/* Deer Body */}
                        <ellipse cx="120" cy="115" rx="42" ry="28" fill="#fb923c" stroke="#9a3412" strokeWidth="3" />
                        {/* Spots */}
                        <circle cx="115" cy="108" r="4" fill="#ffedd5" />
                        <circle cx="132" cy="118" r="3.5" fill="#ffedd5" />
                        <circle cx="142" cy="108" r="3" fill="#ffedd5" />
                        {/* Neck */}
                        <polygon points="78,110 88,118 68,65 58,65" fill="#fb923c" stroke="#9a3412" strokeWidth="2.5" />
                        {/* Head */}
                        <ellipse cx="58" cy="55" rx="22" ry="16" fill="#fdba74" stroke="#9a3412" strokeWidth="3" />
                        {/* Eye */}
                        <circle cx="50" cy="52" r="3.5" fill="#0f172a" />
                        {/* Nose */}
                        <circle cx="38" cy="56" r="3" fill="#9a3412" />
                        {/* Ears & Antlers */}
                        <ellipse cx="72" cy="42" rx="6" ry="14" transform="rotate(30 72 42)" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
                        <line x1="62" y1="40" x2="65" y2="22" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round" />
                        <line x1="65" y1="28" x2="72" y2="24" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
                        {/* Legs */}
                        <rect x="92" y="138" width="8" height="42" rx="3" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
                        <rect x="106" y="138" width="8" height="42" rx="3" fill="#fb923c" stroke="#9a3412" strokeWidth="2" />
                        <rect x="135" y="138" width="8" height="42" rx="3" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
                        <rect x="148" y="138" width="8" height="42" rx="3" fill="#fb923c" stroke="#9a3412" strokeWidth="2" />
                        {/* Tail */}
                        <ellipse cx="164" cy="105" rx="6" ry="4" transform="rotate(-30 164 105)" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    <BilingualText vi="Phân rã đối tượng hình học vector" en="Vector Geometric Primitives Breakdown" />
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Shapes className="w-4 h-4 text-purple-600" />
                    <BilingualText
                      vi="Công cụ Inkscape cần sử dụng:"
                      en="Required Inkscape Primitive Tools:"
                    />
                  </div>
                  <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <Square className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>F4 (Rectangles): </strong>
                        <BilingualText
                          vi="Dùng cho thân mình, chân, cổ và các mảng khối vuông vức (có thể bo góc bằng 2 nút tròn Rx, Ry)."
                          en="Used for body, legs, neck and rectangular blocks (rounded corners via Rx, Ry handles)."
                        />
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Circle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>F5 (Circles, Ellipses): </strong>
                        <BilingualText
                          vi="Dùng cho đầu, mắt, mũi, đốm trang trí và tai tròn của con vật."
                          en="Used for head, eyes, nose, decorative spots, and rounded animal ears."
                        />
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Triangle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>* (Stars/Polygons): </strong>
                        <BilingualText
                          vi="Chuyển về Regular polygon với Corners = 3 để vẽ tai nhọn hoặc đuôi tam giác."
                          en="Switch to Regular polygon mode with Corners = 3 for pointed ears or triangular tail."
                        />
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Layers className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>
                        <strong>
                          <BilingualText vi="Xếp lớp Z-order: " en="Z-order Layering: " />
                        </strong>
                        <BilingualText
                          vi="Chân sau đưa xuống dưới cùng (Lower to bottom - End), mắt và mũi đưa lên trên cùng (Raise to top - Home)."
                          en="Back legs sent to bottom (Lower to bottom - End), eyes and nose raised to top (Raise to top - Home)."
                        />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>



      {/* Pedagogical Prompts for Teachers */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={12} />
    </div>
  );
};
