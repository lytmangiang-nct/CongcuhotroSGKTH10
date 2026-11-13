import React, { useState } from 'react';
import { Camera, GraduationCap, CreditCard, Image, ChevronDown, ChevronUp, Sparkles, Check, Calculator, Award, BookOpen, ShieldCheck, Heart, Volume2, HelpCircle, CheckCircle2, XCircle, Lightbulb, Eye, Lock } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { PRACTICE_SECTION, APPLICATION_SECTION } from '../data/lessonData';
import { BilingualText } from './BilingualText';
import { TeacherPromptsWidget } from './TeacherPromptsWidget';
import confetti from 'canvas-confetti';

const ex1 = PRACTICE_SECTION.exercises[0]!;
const ex2 = PRACTICE_SECTION.exercises[1]!;
const app1 = APPLICATION_SECTION.tasks[0]!;
const app2 = APPLICATION_SECTION.tasks[1]!;

export const SectionPracticeApply: React.FC = () => {
  const {
    bilingualMode,
    speak,
    setShowOriginalModal,
    setOriginalPageTarget,
    setShowCopyrightModal,
    isCertificateEarned,
    certificate,
    setShowQuizModal,
    setShowCertificateModal,
    isAllSectionsComplete,
    currentLesson,
    currentLessonId,
    completedSections,
    completeSectionTasks,
    isSectionTasksDone
  } = useBook();

  // Exercise 1 interactive GPA simulator
  const [grades, setGrades] = useState({ math: 8.5, lit: 7.0, eng: 9.0, it: 9.5 });
  const gpa = (grades.math * 2 + grades.lit * 2 + grades.eng * 2 + grades.it * 2) / 8;
  const rank = gpa >= 8.0 ? 'Học sinh Xuất sắc / Giỏi' : gpa >= 6.5 ? 'Học sinh Khá' : 'Đạt';

  // Exercise 1 interactive question state & solution toggle
  const [ex1SelectedOptions, setEx1SelectedOptions] = useState<number[]>([]);
  const [ex1Checked, setEx1Checked] = useState(false);
  const [showEx1Solution, setShowEx1Solution] = useState(false);

  // Exercise 2 interactive camera card calculator
  const [cardCapacityGB, setCardCapacityGB] = useState<number>(16);
  const sampleSizes = [10144, 9888, 10016, 9440];
  const avgPhotoKB = sampleSizes.reduce((a, b) => a + b, 0) / sampleSizes.length; // 9872 KB
  const totalCardKB = cardCapacityGB * 1024 * 1024;
  const maxPhotos = Math.floor(totalCardKB / avgPhotoKB);

  // Exercise 2 interactive question state & solution toggle
  const [ex2Choice, setEx2Choice] = useState<string | null>(null);
  const [ex2Checked, setEx2Checked] = useState(false);
  const [showEx2Solution, setShowEx2Solution] = useState(false);

  // Application 1 interactive question state & solution toggle
  const [app1Choice, setApp1Choice] = useState<number | null>(null);
  const [app1Checked, setApp1Checked] = useState(false);
  const [showApp1Solution, setShowApp1Solution] = useState(false);

  // Application 2 interactive question state & solution toggle
  const [app2SelectedOptions, setApp2SelectedOptions] = useState<number[]>([]);
  const [app2Checked, setApp2Checked] = useState(false);
  const [showApp2Solution, setShowApp2Solution] = useState(false);

  // Accordion open states
  const [openEx1, setOpenEx1] = useState(true);
  const [openEx2, setOpenEx2] = useState(true);
  const [openApp1, setOpenApp1] = useState(true);
  const [openApp2, setOpenApp2] = useState(true);

  // Student answer notes
  const [studentNote1, setStudentNote1] = useState('');
  const [note1Saved, setNote1Saved] = useState(false);

  const handleSaveStudentNote = () => {
    setNote1Saved(true);
    completeSectionTasks(currentLessonId, 4);
    confetti({ particleCount: 30, spread: 45 });
    setTimeout(() => setNote1Saved(false), 2000);
  };

  const handleCheckEx1 = () => {
    setEx1Checked(true);
    completeSectionTasks(currentLessonId, 4);
    const hasCorrect = ex1SelectedOptions.includes(0) && ex1SelectedOptions.includes(1) && ex1SelectedOptions.includes(3) && !ex1SelectedOptions.includes(2);
    if (hasCorrect) {
      confetti({ particleCount: 40, spread: 60 });
    }
  };

  const handleCheckEx2 = () => {
    setEx2Checked(true);
    completeSectionTasks(currentLessonId, 4);
    if (ex2Choice === 'C') {
      confetti({ particleCount: 40, spread: 60 });
    }
  };

  const handleCheckApp1 = () => {
    setApp1Checked(true);
    completeSectionTasks(currentLessonId, 4);
    if (app1Choice === 0) {
      confetti({ particleCount: 40, spread: 60 });
    }
  };

  const handleCheckApp2 = () => {
    setApp2Checked(true);
    completeSectionTasks(currentLessonId, 4);
    const isCorrect = app2SelectedOptions.includes(0) && app2SelectedOptions.includes(1) && app2SelectedOptions.includes(3) && !app2SelectedOptions.includes(2);
    if (isCorrect) {
      confetti({ particleCount: 40, spread: 60 });
    }
  };

  return (
    <div className="space-y-8 my-8">
      {/* LUYỆN TẬP SECTION */}
      <section id="luyen-tap" className="scroll-mt-20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
                {bilingualMode === 'en' ? 'PRACTICE EXERCISES' : 'LUYỆN TẬP'}
              </h2>
              <p className="text-xs text-slate-500 font-medium">Trang 10 SGK Tin học 10 Kết nối tri thức</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(10);
                setShowOriginalModal(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
              title="Mở xem bản chụp scan Trang 10 SGK gốc"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Đối chiếu Trang 10 SGK gốc</span>
            </button>

            {bilingualMode !== 'vi' && (
              <button
                type="button"
                onClick={() => speak('Practice and Application for Lesson 1: Test your ability to distinguish data and information in everyday scenarios, calculate storage conversions between Bytes, Kilobytes, and Gigabytes, and complete self-assessment exercises.', 'en')}
                className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Nghe phát âm tiếng Anh chuẩn (Speech EN)"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>EN</span>
              </button>
            )}
          </div>
        </div>

        {/* Bài tập 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden mb-5">
          <div
            onClick={() => setOpenEx1(!openEx1)}
            className="p-4 bg-slate-50/80 dark:bg-slate-800 flex items-center justify-between cursor-pointer border-b border-slate-200 dark:border-slate-800 hover:bg-slate-100/80 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                1
              </span>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                {bilingualMode === 'en'
                  ? ex1.titleEn
                  : ex1.titleVi}
              </h3>
            </div>
            {openEx1 ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
          </div>

          {openEx1 && (
            <div className="p-5 space-y-4">
              <BilingualText
                vi={ex1.promptVi}
                en={ex1.promptEn}
                viClassName="font-semibold text-slate-800"
              />

              {/* Interactive Demo: Grade data into meaningful information */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 block mb-2 uppercase">
                  {bilingualMode === 'en'
                    ? 'Interactive Sandbox: Enter Sample Grades'
                    : 'Thử nghiệm tương tác: Nhập dữ liệu điểm số thực tế'}
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-500">Toán (Math):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="10"
                      value={grades.math}
                      onChange={(e) => setGrades({ ...grades, math: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-500">Ngữ văn (Literature):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="10"
                      value={grades.lit}
                      onChange={(e) => setGrades({ ...grades, lit: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-500">Tiếng Anh (English):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="10"
                      value={grades.eng}
                      onChange={(e) => setGrades({ ...grades, eng: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-500">Tin học (Informatics):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="10"
                      value={grades.it}
                      onChange={(e) => setGrades({ ...grades, it: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 text-xs font-bold"
                    />
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Dữ liệu thô: </span>
                    <span className="font-mono font-semibold">
                      [{grades.math}, {grades.lit}, {grades.eng}, {grades.it}]
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Thông tin rút ra: </span>
                    <span className="font-bold text-emerald-600">
                      ĐTB = {gpa.toFixed(2)} ({rank})
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Exercise 1 Check */}
              <div className="bg-indigo-50/70 dark:bg-slate-800/90 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
                    {bilingualMode === 'en'
                      ? 'Interactive Question: Which information can be extracted from student grade data?'
                      : 'Câu hỏi tương tác: Từ dữ liệu điểm số các môn học, những thông tin nào sau đây CÓ THỂ rút ra được?'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  {bilingualMode === 'en'
                    ? 'Select all applicable options, then click Check Answers:'
                    : 'Hãy đánh dấu chọn các phương án em cho là đúng, sau đó nhấn "Kiểm tra đáp án":'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 0, textVi: 'A. Điểm trung bình các môn học và điểm tổng kết học kỳ', textEn: 'A. Average subject scores and semester final GPA', correct: true },
                    { id: 1, textVi: 'B. Xếp loại học lực, danh hiệu khen thưởng học sinh', textEn: 'B. Academic rank, commendation and honors', correct: true },
                    { id: 2, textVi: 'C. Chiều cao, cân nặng và chỉ số sức khỏe của học sinh', textEn: 'C. Physical height, weight and health index', correct: false },
                    { id: 3, textVi: 'D. So sánh đối chiếu chất lượng học tập giữa các tổ/lớp', textEn: 'D. Academic comparison across student study groups', correct: true },
                  ].map((opt) => {
                    const isSelected = ex1SelectedOptions.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setEx1Checked(false);
                          if (isSelected) {
                            setEx1SelectedOptions(ex1SelectedOptions.filter((id) => id !== opt.id));
                          } else {
                            setEx1SelectedOptions([...ex1SelectedOptions, opt.id]);
                          }
                        }}
                        className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 text-xs font-bold border ${
                            isSelected ? 'bg-white text-indigo-700 border-white' : 'border-slate-400 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && '✓'}
                        </span>
                        <span className="text-xs font-medium">
                          {bilingualMode === 'en' ? opt.textEn : opt.textVi}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCheckEx1}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? 'Check My Choices' : 'Kiểm tra đáp án'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEx1Solution(!showEx1Solution)}
                    className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>
                      {showEx1Solution
                        ? (bilingualMode === 'en' ? 'Hide Textbook Model Answer' : 'Ẩn gợi ý & Đáp án SGK')
                        : (bilingualMode === 'en' ? 'Show Textbook Model Answer' : 'Xem gợi ý & Đáp án chuẩn SGK')}
                    </span>
                    {showEx1Solution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {ex1Checked && (
                  <div className={`p-3 rounded-xl border text-xs ${
                    ex1SelectedOptions.includes(0) && ex1SelectedOptions.includes(1) && ex1SelectedOptions.includes(3) && !ex1SelectedOptions.includes(2)
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                  }`}>
                    {ex1SelectedOptions.includes(0) && ex1SelectedOptions.includes(1) && ex1SelectedOptions.includes(3) && !ex1SelectedOptions.includes(2) ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Xuất sắc!</strong> Em đã chọn chính xác các thông tin có thể rút ra (A, B, D). Phương án C (chiều cao, cân nặng) không thể rút ra vì bảng điểm chỉ lưu trữ dữ liệu học tập!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span><strong>Gợi ý:</strong> Bảng điểm môn học chỉ cung cấp dữ liệu điểm số, do đó chỉ có thể rút ra thông tin học lực (A, B, D). Chiều cao cân nặng (C) không thuộc dữ liệu này. Bấm nút <strong>&quot;Xem gợi ý &amp; Đáp án chuẩn SGK&quot;</strong> bên trên để đối chiếu chi tiết nhé!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Model Answer (Hidden by default, toggleable) */}
              {showEx1Solution && (
                <div className="bg-amber-50/70 dark:bg-amber-950/25 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs space-y-2 animate-in fade-in">
                  <div className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>
                      {bilingualMode === 'en'
                        ? 'Detailed Model Answer according to Textbook Guidelines:'
                        : 'Hướng dẫn trả lời chuẩn SGK & Phân tích chuyên sâu:'}
                    </span>
                  </div>

                  <div className="text-slate-700 dark:text-slate-300">
                    <p className="font-semibold mb-1">
                      {bilingualMode === 'en'
                        ? 'Information that can be extracted:'
                        : 'Các thông tin có thể rút ra từ dữ liệu điểm:'}
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-1">
                      {(bilingualMode === 'en'
                        ? ex1.possibleInfoEn
                        : ex1.possibleInfoVi
                      )?.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/50">
                    <p className="font-semibold mb-1">
                      {bilingualMode === 'en'
                        ? 'Preliminary Data Processing Procedure:'
                        : 'Mô tả sơ bộ quy trình xử lí dữ liệu:'}
                    </p>
                    <p className="whitespace-pre-line text-slate-800 dark:text-slate-200 font-mono text-[11px] bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-amber-100 dark:border-slate-800">
                      {bilingualMode === 'en'
                        ? ex1.sampleProcessEn
                        : ex1.sampleProcessVi}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bài tập 2 (Hình 1.3 - Thẻ nhớ máy ảnh số) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div
            onClick={() => setOpenEx2(!openEx2)}
            className="p-4 bg-slate-50/80 dark:bg-slate-800 flex items-center justify-between cursor-pointer border-b border-slate-200 dark:border-slate-800 hover:bg-slate-100/80 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                2
              </span>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                {bilingualMode === 'en'
                  ? ex2.titleEn
                  : ex2.titleVi}
              </h3>
            </div>
            {openEx2 ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
          </div>

          {openEx2 && (
            <div className="p-5 space-y-4">
              <BilingualText
                vi={ex2.promptVi}
                en={ex2.promptEn}
                viClassName="font-semibold text-slate-800"
              />

              {/* Bảng Hình 1.3 SGK */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Hình 1.3. Danh sách một số tệp ảnh (SGK Trang 10)</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Camera Flash Storage</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                      <tr>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Date modified</th>
                        <th className="px-3 py-2">Type</th>
                        <th className="px-3 py-2 text-right">Size (KB)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                      {ex2.figureTable?.map((row) => (
                        <tr key={row.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
                          <td className="px-3 py-2 font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                            <Image className="w-3.5 h-3.5 text-slate-400" />
                            <span>{row.name}</span>
                          </td>
                          <td className="px-3 py-2 text-slate-500">{row.date}</td>
                          <td className="px-3 py-2 text-slate-600 dark:text-slate-400">{row.type}</td>
                          <td className="px-3 py-2 text-right font-bold text-slate-800 dark:text-slate-200">
                            {row.sizeKB.toLocaleString()} KB
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Interactive Calculator for Card Capacity */}
              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>
                      {bilingualMode === 'en'
                        ? 'SD Card Capacity Sandbox Calculator:'
                        : 'Máy tính thử nghiệm dung lượng thẻ nhớ khác nhau:'}
                    </span>
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400">
                      {bilingualMode === 'en' ? 'Card Capacity:' : 'Dung lượng thẻ:'}
                    </span>
                    <select
                      value={cardCapacityGB}
                      onChange={(e) => setCardCapacityGB(parseInt(e.target.value))}
                      className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded px-2 py-1 font-bold font-mono text-indigo-700 dark:text-indigo-300"
                    >
                      <option value="8">8 GB</option>
                      <option value="16">16 GB (SGK)</option>
                      <option value="32">32 GB</option>
                      <option value="64">64 GB</option>
                      <option value="128">128 GB</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-1 font-mono">
                  <div>
                    {bilingualMode === 'en'
                      ? '1. Average photo size = (10,144 + 9,888 + 10,016 + 9,440) / 4 = '
                      : '1. Độ lớn trung bình 1 ảnh = (10 144 + 9 888 + 10 016 + 9 440) / 4 = '}
                    <strong className="text-indigo-700 dark:text-indigo-300">{avgPhotoKB.toLocaleString()} KB</strong> (≈ 9.64 MB)
                  </div>
                  <div>
                    {bilingualMode === 'en'
                      ? `2. Convert ${cardCapacityGB} GB to KB = ${cardCapacityGB} × 1024 × 1024 = `
                      : `2. Đổi thẻ ${cardCapacityGB} GB ra KB = ${cardCapacityGB} × 1024 × 1024 = `}
                    <strong className="text-indigo-700 dark:text-indigo-300">{totalCardKB.toLocaleString()} KB</strong>
                  </div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-100 pt-1 border-t border-slate-100 dark:border-slate-800">
                    {bilingualMode === 'en'
                      ? `=> Max photos that a ${cardCapacityGB} GB card can hold: `
                      : `=> Số ảnh tối đa thẻ ${cardCapacityGB} GB chứa được: `}
                    <span className="text-indigo-700 dark:text-indigo-300 font-black text-base">
                      {maxPhotos.toLocaleString()} {bilingualMode === 'en' ? 'photos' : 'ảnh'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Exercise 2 Question Quiz */}
              <div className="bg-indigo-50/70 dark:bg-slate-800/90 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
                    {bilingualMode === 'en'
                      ? 'Interactive Question: How many photos can a 16 GB SD card hold?'
                      : 'Câu hỏi tương tác: Một thẻ nhớ 16 GB có thể chứa được khoảng bao nhiêu bức ảnh có độ lớn trung bình như trên?'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'A', textVi: 'A. Khoảng 160 bức ảnh', textEn: 'A. Approximately 160 photos', correct: false },
                    { id: 'B', textVi: 'B. Khoảng 500 bức ảnh', textEn: 'B. Approximately 500 photos', correct: false },
                    { id: 'C', textVi: 'C. Khoảng 1 700 bức ảnh (chính xác ~1 699 bức)', textEn: 'C. Approximately 1,700 photos (~1,699 photos)', correct: true },
                    { id: 'D', textVi: 'D. Khoảng 16 000 bức ảnh', textEn: 'D. Approximately 16,000 photos', correct: false }
                  ].map((opt) => {
                    const isSelected = ex2Choice === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setEx2Checked(false);
                          setEx2Choice(opt.id);
                        }}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-bold'
                            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                        }`}
                      >
                        <span>{bilingualMode === 'en' ? opt.textEn : opt.textVi}</span>
                        {isSelected && <Check className="w-4 h-4" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCheckEx2}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? 'Check Answer' : 'Kiểm tra đáp án'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowEx2Solution(!showEx2Solution)}
                    className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>
                      {showEx2Solution
                        ? (bilingualMode === 'en' ? 'Hide Step-by-Step Solution' : 'Ẩn lời giải chi tiết SGK')
                        : (bilingualMode === 'en' ? 'Show Step-by-Step Solution' : 'Xem gợi ý & Lời giải chi tiết SGK')}
                    </span>
                    {showEx2Solution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {ex2Checked && (
                  <div className={`p-3 rounded-xl border text-xs ${
                    ex2Choice === 'C'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                  }`}>
                    {ex2Choice === 'C' ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          <BilingualText
                            vi="16 GB = 16 777 216 KB chia cho độ lớn trung bình 9 872 KB cho ra xấp xỉ 1 699,47 ≈ 1 700 bức ảnh!"
                            en="16 GB = 16,777,216 KB divided by the average image size 9,872 KB yields approximately 1,699.47 ≈ 1,700 photos!"
                          />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          <BilingualText
                            vi="Em hãy nhớ đổi 16 GB = 16 × 1024 × 1024 KB trước khi chia cho dung lượng ảnh (≈ 9 872 KB)."
                            en="Remember to convert 16 GB = 16 × 1024 × 1024 KB before dividing by photo file size (≈ 9,872 KB)."
                          />
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Step by step answer (Hidden by default, toggleable) */}
              {showEx2Solution && (
                <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1 animate-in fade-in">
                  <span className="font-bold text-slate-700 dark:text-slate-200 block mb-1">
                    {bilingualMode === 'en'
                      ? 'Official Textbook Step-by-Step Solution:'
                      : 'Lời giải chi tiết từng bước chuẩn SGK:'}
                  </span>
                  {(bilingualMode === 'en'
                    ? ex2.stepByStepEn
                    : ex2.stepByStepVi
                  )?.map((step, idx) => (
                    <p key={idx} className="text-slate-700 dark:text-slate-300 font-sans">
                      {step}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* VẬN DỤNG SECTION */}
      <section id="van-dung" className="scroll-mt-20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-800 dark:bg-indigo-700 text-white flex items-center justify-center font-bold shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-slate-100">
              {bilingualMode === 'en' ? 'REAL-WORLD APPLICATION' : 'VẬN DỤNG'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">Trang 10 SGK Tin học 10 Kết nối tri thức</p>
          </div>
        </div>

        {/* Vận dụng 1: Thẻ CCCD gắn chip */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden mb-5">
          <div
            onClick={() => setOpenApp1(!openApp1)}
            className="p-4 bg-slate-50/80 dark:bg-slate-800 flex items-center justify-between cursor-pointer border-b border-slate-200 dark:border-slate-800 hover:bg-slate-100/80 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-indigo-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                1
              </span>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                {bilingualMode === 'en'
                  ? app1.titleEn
                  : app1.titleVi}
              </h3>
            </div>
            {openApp1 ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
          </div>

          {openApp1 && (
            <div className="p-5 space-y-4">
              <BilingualText
                vi={app1.promptVi}
                en={app1.promptEn}
                viClassName="font-semibold text-slate-800"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="font-bold text-xs text-indigo-900 dark:text-indigo-200 mb-1">
                    {bilingualMode === 'en' ? '1. Printed Text on Card' : '1. Chữ in trên mặt thẻ'}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    {bilingualMode === 'en'
                      ? 'Humans can read visually and immediately without specialized machines.'
                      : 'Con người đọc trực tiếp bằng mắt nhanh chóng mà không cần máy móc hỗ trợ.'}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="font-bold text-xs text-indigo-900 dark:text-indigo-200 mb-1">
                    {bilingualMode === 'en' ? '2. Scannable QR Code' : '2. Mã quét QR Code'}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    {bilingualMode === 'en'
                      ? 'Smartphones and optical scanners read structured data in 0.5 seconds.'
                      : 'Điện thoại thông minh, máy quét quang học đọc dữ liệu tự động chỉ trong 0.5 giây.'}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="font-bold text-xs text-indigo-900 dark:text-indigo-200 mb-1">
                    {bilingualMode === 'en' ? '3. Electronic Microchip' : '3. Vi mạch Chip nhớ điện tử'}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    {bilingualMode === 'en'
                      ? 'Stores encrypted biometric data (fingerprints, photo) and digital signatures.'
                      : 'Lưu trữ dữ liệu mã hoá sinh trắc học (vân tay, ảnh), chữ kí số chống làm giả tuyệt đối.'}
                  </div>
                </div>
              </div>

              {/* Interactive App 1 Prompt */}
              <div className="bg-indigo-50/70 dark:bg-slate-800/90 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
                    {bilingualMode === 'en'
                      ? 'Interactive Inquiry: Why does the ID card integrate 3 distinct data representation formats?'
                      : 'Câu hỏi suy ngẫm: Theo em, vì sao thẻ CCCD lại kết hợp đồng thời cả 3 hình thức thể hiện dữ liệu (chữ in, mã QR, chip nhớ)?'}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { id: 0, textVi: 'A. Tạo sự thuận tiện và an toàn tối đa: con người đọc mắt nhanh, máy quét cơ bản đọc mã QR, và máy chuyên dụng giải mã dữ liệu sinh trắc học bảo mật cao từ vi mạch chip.', textEn: 'A. Maximum convenience & security: humans read visually, basic scanners read QR codes, and specialized devices authenticate encrypted biometric data from the chip.', correct: true },
                    { id: 1, textVi: 'B. Chỉ mang tính chất trang trí cho mặt trước và mặt sau thẻ căn cước thêm phong phú.', textEn: 'B. Purely decorative aesthetics for the front and back of the ID card.', correct: false },
                    { id: 2, textVi: 'C. Vì thẻ nhựa thông thường không thể lưu trữ số định danh cá nhân nên bắt buộc phải có chip.', textEn: 'C. Standard cards cannot print ID numbers so a microchip is compulsory.', correct: false },
                  ].map((opt) => {
                    const isSelected = app1Choice === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setApp1Checked(false);
                          setApp1Choice(opt.id);
                        }}
                        className={`w-full p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs font-semibold'
                            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                          isSelected ? 'border-white bg-white text-indigo-700 font-bold' : 'border-slate-400'
                        }`}>
                          {isSelected ? '✓' : ''}
                        </span>
                        <span>{bilingualMode === 'en' ? opt.textEn : opt.textVi}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCheckApp1}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? 'Check Analysis' : 'Kiểm tra nhận định'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowApp1Solution(!showApp1Solution)}
                    className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>
                      {showApp1Solution
                        ? (bilingualMode === 'en' ? 'Hide Textbook Model Analysis' : 'Ẩn gợi ý phân tích chuẩn SGK')
                        : (bilingualMode === 'en' ? 'Show Textbook Model Analysis' : 'Xem gợi ý phân tích chuẩn SGK')}
                    </span>
                    {showApp1Solution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {app1Checked && (
                  <div className={`p-3 rounded-xl border text-xs ${
                    app1Choice === 0
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                  }`}>
                    {app1Choice === 0 ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Nhận định rất chuẩn xác!</strong> Ba hình thức dữ liệu này bổ trợ hoàn hảo cho nhau: đáp ứng cả giao dịch mắt người trực tiếp, quét di động tự động và chứng thực bảo mật quốc gia!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span><strong>Gợi ý:</strong> Hãy cân nhắc yếu tố tiện dụng và bảo mật công nghệ cao. Bấm <strong>&quot;Xem gợi ý phân tích chuẩn SGK&quot;</strong> bên trên để đối chiếu 4 lợi ích toàn diện nhé!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Detailed benefits (Hidden by default, toggleable) */}
              {showApp1Solution && (
                <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2 animate-in fade-in">
                  <span className="font-bold text-indigo-900 dark:text-indigo-200 block mb-1">
                    {bilingualMode === 'en'
                      ? 'Comprehensive Analysis of Benefits:'
                      : 'Phân tích toàn diện 4 lợi ích của đa dạng hóa dữ liệu trên thẻ CCCD:'}
                  </span>
                  {(bilingualMode === 'en'
                    ? app1.benefitsEn
                    : app1.benefitsVi
                  )?.map((b, idx) => (
                    <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {b}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Vận dụng 2: Cách mạng chụp ảnh số */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          <div
            onClick={() => setOpenApp2(!openApp2)}
            className="p-4 bg-slate-50/80 dark:bg-slate-800 flex items-center justify-between cursor-pointer border-b border-slate-200 dark:border-slate-800 hover:bg-slate-100/80 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-lg bg-indigo-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                2
              </span>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base">
                {bilingualMode === 'en'
                  ? app2.titleEn
                  : app2.titleVi}
              </h3>
            </div>
            {openApp2 ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
          </div>

          {openApp2 && (
            <div className="p-5 space-y-4">
              <BilingualText
                vi={app2.promptVi}
                en={app2.promptEn}
                viClassName="font-semibold text-slate-800"
              />

              {/* Interactive App 2 Quiz */}
              <div className="bg-indigo-50/70 dark:bg-slate-800/90 p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-bold text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
                    {bilingualMode === 'en'
                      ? 'Interactive Check: Which factors represent revolutionary advantages of digital photography?'
                      : 'Câu hỏi tương tác: Em hãy đánh dấu vào những ưu thế vượt trội mang tính cách mạng của việc chụp ảnh số thời nay:'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 0, textVi: '1. Chụp hàng ngàn bức ảnh trên thẻ nhớ nhỏ với chi phí cực thấp', textEn: '1. Shoot thousands of photos on a compact card at virtually zero incremental cost', correct: true },
                    { id: 1, textVi: '2. Xem lại tức thì trên màn hình cảm ứng, xóa ảnh lỗi và chụp lại ngay', textEn: '2. Instant preview on touchscreen, immediate deletion of flawed shots', correct: true },
                    { id: 2, textVi: '3. Phải mang phim vào phòng tối tráng rửa hóa chất độc hại và chờ nhiều ngày', textEn: '3. Must process chemicals in darkrooms and wait several days', correct: false },
                    { id: 3, textVi: '4. Dễ dàng sao chép, chỉnh sửa AI và chia sẻ toàn cầu chỉ trong 1 giây', textEn: '4. Effortless duplication, AI editing, and instantaneous global sharing', correct: true },
                  ].map((item) => {
                    const isSelected = app2SelectedOptions.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setApp2Checked(false);
                          if (isSelected) {
                            setApp2SelectedOptions(app2SelectedOptions.filter((id) => id !== item.id));
                          } else {
                            setApp2SelectedOptions([...app2SelectedOptions, item.id]);
                          }
                        }}
                        className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 text-xs font-bold border ${
                            isSelected ? 'bg-white text-indigo-700 border-white' : 'border-slate-400 dark:border-slate-600'
                          }`}
                        >
                          {isSelected && '✓'}
                        </span>
                        <span className="text-xs font-medium">
                          {bilingualMode === 'en' ? item.textEn : item.textVi}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleCheckApp2}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{bilingualMode === 'en' ? 'Check Selections' : 'Kiểm tra lựa chọn'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowApp2Solution(!showApp2Solution)}
                    className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/80 border border-amber-300 dark:border-amber-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>
                      {showApp2Solution
                        ? (bilingualMode === 'en' ? 'Hide Comparison Breakdown' : 'Ẩn gợi ý đối chiếu chuẩn SGK')
                        : (bilingualMode === 'en' ? 'Show Comparison Breakdown' : 'Xem gợi ý đối chiếu chuẩn SGK')}
                    </span>
                    {showApp2Solution ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {app2Checked && (
                  <div className={`p-3 rounded-xl border text-xs ${
                    app2SelectedOptions.includes(0) && app2SelectedOptions.includes(1) && app2SelectedOptions.includes(3) && !app2SelectedOptions.includes(2)
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                      : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                  }`}>
                    {app2SelectedOptions.includes(0) && app2SelectedOptions.includes(1) && app2SelectedOptions.includes(3) && !app2SelectedOptions.includes(2) ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span><strong>Xuất sắc!</strong> Em đã nhận diện chính xác 3 ưu điểm vượt bậc của máy ảnh số (1, 2, 4). Đặc điểm 3 (tráng rửa hóa chất trong phòng tối) là hạn chế của máy ảnh phim truyền thống!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                        <span><strong>Gợi ý:</strong> Máy ảnh số nổi bật với chi phí rẻ, xem lại xóa tức thì và chia sẻ nhanh qua mạng (1, 2, 4). Nhấn nút <strong>&quot;Xem gợi ý đối chiếu chuẩn SGK&quot;</strong> bên trên để xem bảng so sánh chi tiết nhé!</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Comparison Details (Hidden by default, toggleable) */}
              {showApp2Solution && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs animate-in fade-in">
                  <div className="p-3.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                      Máy ảnh phim truyền thống (Trước thời kì số hóa):
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                      <li>Mỗi cuộn phim chỉ chụp được 24 hoặc 36 tấm ảnh.</li>
                      <li>Không xem trước được, dễ bị hỏng nếu bị lọt sáng hoặc rung tay.</li>
                      <li>Phải tráng rửa hóa chất trong phòng tối tốn kém và mất nhiều ngày.</li>
                      <li>Ảnh giấy dễ ẩm mốc, ố vàng và phai màu theo thời gian.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/80 dark:border-indigo-900/60">
                    <span className="font-bold text-indigo-950 dark:text-indigo-200 block mb-1">
                      Máy ảnh số & Điện thoại thông minh (Kỷ nguyên số):
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                      <li>Chụp hàng chục ngàn bức ảnh trên thẻ nhớ nhỏ xíu với chi phí 0 đồng.</li>
                      <li>Xem ngay trên màn hình cảm ứng, xóa ảnh lỗi và chụp lại tức thì.</li>
                      <li>Tự động lấy nét, HDR, cân bằng sáng và làm đẹp nhờ thuật toán máy tính.</li>
                      <li>Lưu trữ vĩnh viễn trên mây và gửi cho bạn bè toàn cầu chỉ trong 1 giây.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Student Personal Reflection Note */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {bilingualMode === 'en'
                    ? 'Your Personal Answer Draft / Thoughts:'
                    : 'Ghi lại suy nghĩ / câu trả lời của em về bài Vận dụng này:'}
                </label>
                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={studentNote1}
                    onChange={(e) => setStudentNote1(e.target.value)}
                    placeholder="Viết câu trả lời của em ở đây để ghi nhớ bài học..."
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleSaveStudentNote}
                    className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors"
                  >
                    {note1Saved ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{note1Saved ? 'Đã lưu!' : 'Lưu ghi chú'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>




      {/* Official Textbook Accreditation & Preservation Card */}
      <div className="mt-6 p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-indigo-950/40 border border-emerald-200 dark:border-emerald-800/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/25">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                {bilingualMode === 'en'
                  ? 'Informatics 10 Textbook • Connecting Knowledge'
                  : 'Sách Giáo Khoa Tin Học 10 • KNTT'}
              </span>
              <span className="text-[10px] font-bold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-2 py-0.2 rounded-full hidden sm:inline">
                {bilingualMode === 'en' ? 'Curriculum 2018' : 'GDPT 2018'}
              </span>
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              {bilingualMode === 'en'
                ? 'Vietnam Education Publishing House • Authors'
                : 'Nhà xuất bản Giáo dục Việt Nam • Ban Tác giả'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {bilingualMode === 'en'
                ? 'Editor-in-Chief: Prof. Dr. Pham The Long • Editor: Assoc. Prof. Dr. Dao Kien Quoc'
                : 'Tổng Chủ biên: GS.TSKH Phạm Thế Long • Chủ biên: PGS.TS Đào Kiến Quốc'}
            </p>
            <p className="text-xs italic text-emerald-700 dark:text-emerald-300 font-medium mt-1 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 shrink-0" />
              <span>
                {bilingualMode === 'en'
                  ? '"Please keep and preserve this textbook to pass on to future students!" (Page 2 SGK)'
                  : '“Hãy bảo quản, giữ gìn sách giáo khoa để dành tặng các em học sinh lớp sau!” (Trang 2 SGK)'}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowCopyrightModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            title={bilingualMode === 'en' ? 'View academic copyright records and legal compliance' : 'Xem hồ sơ xuất bản, bản quyền và các điều khoản pháp lý an toàn'}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{bilingualMode === 'en' ? 'View Copyright Records' : 'Xem Hồ sơ Bản quyền'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
