import React, { useState } from 'react';
import {
  Award,
  Volume2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Zap,
  Lightbulb,
  Table,
  Cpu
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section5PracticeApply: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    setOriginalPageTarget,
    setShowOriginalModal,
    setShowQuizModal,
    setShowCertificateModal,
    certificate,
    isCertificateEarned,
    isAllSectionsComplete,
    currentLesson,
    completedSections
  } = useBook();

  // Practice 1 State: Figure 5.4 Rectangle Condition MCQ
  const [selectedP1Opt, setSelectedP1Opt] = useState<string | null>(null);
  const [p1Checked, setP1Checked] = useState<boolean>(false);
  const [showP1Solution, setShowP1Solution] = useState<boolean>(false);

  // Practice 2 State: Truth table proof for p AND NOT p = 0 and p OR NOT p = 1
  const [p2Rows, setP2Rows] = useState({
    row0_notP: '',
    row0_and: '',
    row0_or: '',
    row1_notP: '',
    row1_and: '',
    row1_or: ''
  });
  const [p2Checked, setP2Checked] = useState<boolean>(false);
  const [showP2Solution, setShowP2Solution] = useState<boolean>(false);

  // Application a: 3 Switches Series Sandbox
  const [appSwA1, setAppSwA1] = useState<boolean>(true);
  const [appSwA2, setAppSwA2] = useState<boolean>(true);
  const [appSwA3, setAppSwA3] = useState<boolean>(false);
  const isAppLampAOn = appSwA1 && appSwA2 && appSwA3;
  const [showAppASolution, setShowAppASolution] = useState<boolean>(false);

  // Application b: 3 Switches Parallel Sandbox
  const [appSwB1, setAppSwB1] = useState<boolean>(false);
  const [appSwB2, setAppSwB2] = useState<boolean>(false);
  const [appSwB3, setAppSwB3] = useState<boolean>(true);
  const isAppLampBOn = appSwB1 || appSwB2 || appSwB3;
  const [showAppBSolution, setShowAppBSolution] = useState<boolean>(false);

  const speechText =
    "Practice and Application for Lesson 5 on Page 27. Practice 1: Formulate the logical expression for a coordinate point belonging to a rectangular region. Practice 2: Construct truth tables to prove fundamental boolean laws: p AND NOT p equals 0, and p OR NOT p equals 1. Application a: Construct a 3-switch series circuit for an AND gate. Application b: Construct a 3-switch parallel circuit for an OR gate.";

  // Practice 2 Validation
  // For p = 0: notP = 1, and = 0, or = 1
  // For p = 1: notP = 0, and = 0, or = 1
  const isP2Correct =
    p2Rows.row0_notP === '1' &&
    p2Rows.row0_and === '0' &&
    p2Rows.row0_or === '1' &&
    p2Rows.row1_notP === '0' &&
    p2Rows.row1_and === '0' &&
    p2Rows.row1_or === '1';

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl text-white shadow-lg border border-indigo-700/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-indigo-400/20">
            <Award className="w-3.5 h-3.5" />
            <span>
              {bilingualMode === 'en'
                ? 'Practice & Application • Textbook Page 27'
                : 'Thực hành & Vận dụng • SGK Trang 27'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black">
            {bilingualMode === 'en'
              ? 'PRACTICE, APPLICATION & COMPETENCY EVALUATION'
              : 'LUYỆN TẬP, VẬN DỤNG & ĐÁNH GIÁ NĂNG LỰC'}
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 mt-1">
            {bilingualMode === 'en'
              ? 'Exercises 1 & 2 • Applications a & b • 10-Question Quiz & Certificate'
              : 'Luyện tập 1 & 2 • Vận dụng a & b • Trắc nghiệm 10 câu & Nhận chứng nhận'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {bilingualMode !== 'vi' && (
            <button
              type="button"
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                } else {
                  speak(speechText, 'en');
                }
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer border border-white/10"
              title={bilingualMode === 'en' ? 'Listen to English narration' : 'Nghe phát âm chuẩn tiếng Anh'}
            >
              <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-cyan-300' : ''}`} />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(27);
              setShowOriginalModal(true);
            }}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <span>{bilingualMode === 'en' ? 'Original Page 27' : 'Xem trang 27 SGK'}</span>
          </button>
        </div>
      </div>

      {/* Teacher Prompts Widget for Section 5 */}
      <TeacherPromptsWidget sectionIndex={5} lessonId={5} />

      {/* Practice 1: Coordinate Rectangle Logic Expression (Strict No Pre-Answer) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shadow-xs">
              P1
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? 'Practice 1 (Textbook Page 27)' : 'Luyện tập 1 (SGK Trang 27)'}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? 'Logic Expression for Coordinate Rectangle Membership (Figure 5.4)'
                  : 'Biểu thức lôgic kiểm tra điểm thuộc miền toạ độ (Hình 5.4)'}
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-400 italic">
            {bilingualMode === 'en' ? 'Solve on your own first' : 'Học sinh tự làm trước'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              Based on the rectangle in Textbook Figure 5.4 with sides parallel to coordinate axes, bounded by <span className="font-mono font-bold">1 &le; x &le; 4</span> and <span className="font-mono font-bold">1 &le; y &le; 2</span>. Select the correct logic expression specifying that point <span className="font-mono font-bold">M(x, y)</span> lies inside or on the perimeter of the rectangle:
            </>
          ) : (
            <>
              Dựa vào hình chữ nhật trong Hình 5.4 SGK có các cạnh song song với các trục toạ độ, giới hạn bởi <span className="font-mono font-bold">1 &le; x &le; 4</span> và <span className="font-mono font-bold">1 &le; y &le; 2</span>. Em hãy chọn biểu thức lôgic đúng mô tả điều kiện để điểm <span className="font-mono font-bold">M(x, y)</span> nằm trong hoặc trên cạnh hình chữ nhật:
            </>
          )}
        </p>

        {/* 4 Options */}
        <div className="space-y-3">
          {[
            {
              id: 'A',
              text: 'A. (x >= 1) OR (x <= 4) OR (y >= 1) OR (y <= 2)',
              isCorrect: false,
              noteVi: 'Sai vì phép OR chỉ cần 1 điều kiện đúng là cả biểu thức đúng (ví dụ x=100 vẫn đúng).',
              noteEn: 'Incorrect because OR only requires a single true condition for the whole expression to evaluate True (e.g., x=100 would evaluate True).'
            },
            {
              id: 'B',
              text: 'B. (x >= 1) AND (x <= 4) AND (y >= 1) AND (y <= 2)',
              isCorrect: true,
              noteVi: 'Đúng! Điểm M phải đồng thời thoả mãn cả 4 bất đẳng thức nên phải dùng phép AND nối tất cả.',
              noteEn: 'Correct! Point M must satisfy all four inequalities simultaneously, requiring conjunction (AND) across all terms.'
            },
            {
              id: 'C',
              text: 'C. (x >= 1) XOR (x <= 4) AND (y >= 1) XOR (y <= 2)',
              isCorrect: false,
              noteVi: 'Sai vì phép XOR sẽ loại trừ khi cả 2 điều kiện cùng đúng.',
              noteEn: 'Incorrect because XOR evaluates False when both conditions are simultaneously True.'
            },
            {
              id: 'D',
              text: 'D. (x >= 1) AND (x <= 4) OR (y >= 1) AND (y <= 2)',
              isCorrect: false,
              noteVi: 'Sai vì nếu y nằm ngoài [1, 2] mà x thuộc [1, 4] thì biểu thức vẫn cho True.',
              noteEn: 'Incorrect because if y lies outside [1, 2] while x lies in [1, 4], the expression would erroneously evaluate True.'
            }
          ].map((item) => {
            const isSelected = selectedP1Opt === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedP1Opt(item.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-950 dark:text-white font-bold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className="font-mono text-xs sm:text-sm">{item.text}</span>
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-300 text-transparent'
                  }`}
                >
                  ✓
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setP1Checked(true)}
            disabled={!selectedP1Opt}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedP1Opt
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'Check Answer' : 'Kiểm tra bài làm'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowP1Solution(!showP1Solution)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {showP1Solution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>
              {showP1Solution
                ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải')
                : (bilingualMode === 'en' ? 'Show SGK Model Solution' : 'Xem gợi ý & Đáp án chuẩn SGK')}
            </span>
          </button>
        </div>

        {/* Feedback message */}
        {p1Checked && (
          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              selectedP1Opt === 'B'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
            }`}
          >
            {selectedP1Opt === 'B' ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <BilingualText
                    vi="Đáp án đúng là B: (x >= 1) AND (x <= 4) AND (y >= 1) AND (y <= 2). Để điểm M nằm trong hình chữ nhật, toạ độ x phải vừa >= 1 VÀ <= 4, đồng thời toạ độ y phải vừa >= 1 VÀ <= 2."
                    en="The correct answer is B: (x >= 1) AND (x <= 4) AND (y >= 1) AND (y <= 2). For point M to reside within the rectangle, coordinate x must satisfy both >= 1 AND <= 4, while coordinate y must satisfy >= 1 AND <= 2."
                  />
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  <BilingualText
                    vi={`Chưa đúng! Bạn đã chọn phương án ${selectedP1Opt}. Hãy chú ý rằng tất cả các điều kiện về x và y đều phải thoả mãn đồng thời.`}
                    en={`Incorrect! You selected option ${selectedP1Opt}. Note that all constraints on x and y must hold simultaneously.`}
                  />
                </span>
              </div>
            )}
          </div>
        )}

        {/* Solution Box (Hidden initially) */}
        {showP1Solution && (
          <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-slate-700 dark:text-slate-200 space-y-1.5 animate-fadeIn">
            <div className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">
              {bilingualMode === 'en'
                ? 'Detailed SGK Guidance & Solution for Practice 1:'
                : 'Gợi ý & Lời giải chi tiết SGK Luyện tập 1:'}
            </div>
            {bilingualMode === 'en' ? (
              <>
                <p>- A point M(x, y) belonging to the rectangle has x-coordinate in [1, 4] and y-coordinate in [1, 2].</p>
                <p>- Condition for x: <code className="font-mono font-bold text-indigo-700">(x &gt;= 1) AND (x &lt;= 4)</code>.</p>
                <p>- Condition for y: <code className="font-mono font-bold text-indigo-700">(y &gt;= 1) AND (y &lt;= 2)</code>.</p>
                <p className="font-semibold text-slate-900 dark:text-white pt-1">
                  Because both conditions must be satisfied simultaneously, we join them using conjunction (AND). The correct expression is option <strong>B</strong>.
                </p>
              </>
            ) : (
              <>
                <p>
                  - Một điểm M(x, y) thuộc hình chữ nhật có toạ độ x nằm trong đoạn [1, 4] và toạ độ y nằm trong đoạn [1, 2].
                </p>
                <p>
                  - Điều kiện cho x: <code className="font-mono font-bold text-indigo-700">(x &gt;= 1) AND (x &lt;= 4)</code>.
                </p>
                <p>
                  - Điều kiện cho y: <code className="font-mono font-bold text-indigo-700">(y &gt;= 1) AND (y &lt;= 2)</code>.
                </p>
                <p className="font-semibold text-slate-900 dark:text-white pt-1">
                  Do hai điều kiện này phải thoả mãn cùng lúc, ta liên kết chúng bằng phép AND. Biểu thức đúng là đáp án <strong>B</strong>.
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Practice 2: Proof for p AND NOT p = 0 and p OR NOT p = 1 (Strict No Pre-Answer) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shadow-xs">
              P2
            </div>
            <div>
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? 'Practice 2 (Textbook Page 27)' : 'Luyện tập 2 (SGK Trang 27)'}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? 'Construct Truth Table to Prove: p AND (NOT p) = 0 and p OR (NOT p) = 1'
                  : 'Lập bảng chân trị chứng minh: p AND (NOT p) = 0 và p OR (NOT p) = 1'}
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-400 italic">
            {bilingualMode === 'en' ? 'Fill in 0 or 1' : 'Điền số 0 hoặc 1'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              In Boolean algebra, these two identities represent foundational laws: <strong>Law of Non-Contradiction</strong> (a proposition cannot be both true and false simultaneously) and <strong>Law of Excluded Middle</strong> (a proposition must be either true or false, with no third possibility). Complete the truth table below:
            </>
          ) : (
            <>
              Trong đại số Boole, hai đẳng thức này là hai định luật nền tảng: <strong>Luật mâu thuẫn</strong> (một điều không thể vừa đúng vừa sai cùng lúc) và <strong>Luật bài trung</strong> (một điều khẳng định chỉ có thể đúng hoặc sai, không có khả năng thứ ba). Em hãy hoàn thành bảng chân trị dưới đây:
            </>
          )}
        </p>

        {/* Interactive Fill-in Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-center text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 font-mono">p</th>
                <th className="py-3 px-4 font-mono text-rose-600">NOT p</th>
                <th className="py-3 px-4 font-mono text-indigo-600">p AND (NOT p)</th>
                <th className="py-3 px-4 font-mono text-teal-600">p OR (NOT p)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {/* Row 0: p = 0 */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">0</td>
                <td className="py-2.5 px-4">
                  <input
                    type="text"
                    maxLength={1}
                    value={p2Rows.row0_notP}
                    onChange={(e) => setP2Rows({ ...p2Rows, row0_notP: e.target.value.replace(/[^01]/g, '') })}
                    placeholder="?"
                    className="w-12 text-center py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </td>
                <td className="py-2.5 px-4">
                  <input
                    type="text"
                    maxLength={1}
                    value={p2Rows.row0_and}
                    onChange={(e) => setP2Rows({ ...p2Rows, row0_and: e.target.value.replace(/[^01]/g, '') })}
                    placeholder="?"
                    className="w-12 text-center py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </td>
                <td className="py-2.5 px-4">
                  <input
                    type="text"
                    maxLength={1}
                    value={p2Rows.row0_or}
                    onChange={(e) => setP2Rows({ ...p2Rows, row0_or: e.target.value.replace(/[^01]/g, '') })}
                    placeholder="?"
                    className="w-12 text-center py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </td>
              </tr>

              {/* Row 1: p = 1 */}
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-850">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">1</td>
                <td className="py-2.5 px-4">
                  <input
                    type="text"
                    maxLength={1}
                    value={p2Rows.row1_notP}
                    onChange={(e) => setP2Rows({ ...p2Rows, row1_notP: e.target.value.replace(/[^01]/g, '') })}
                    placeholder="?"
                    className="w-12 text-center py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </td>
                <td className="py-2.5 px-4">
                  <input
                    type="text"
                    maxLength={1}
                    value={p2Rows.row1_and}
                    onChange={(e) => setP2Rows({ ...p2Rows, row1_and: e.target.value.replace(/[^01]/g, '') })}
                    placeholder="?"
                    className="w-12 text-center py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </td>
                <td className="py-2.5 px-4">
                  <input
                    type="text"
                    maxLength={1}
                    value={p2Rows.row1_or}
                    onChange={(e) => setP2Rows({ ...p2Rows, row1_or: e.target.value.replace(/[^01]/g, '') })}
                    placeholder="?"
                    className="w-12 text-center py-1 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setP2Checked(true)}
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Check Truth Table' : 'Kiểm tra bảng chân trị'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setP2Rows({ row0_notP: '', row0_and: '', row0_or: '', row1_notP: '', row1_and: '', row1_or: '' });
                setP2Checked(false);
              }}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              title={bilingualMode === 'en' ? 'Reset Table' : 'Điền lại'}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowP2Solution(!showP2Solution)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {showP2Solution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>
              {showP2Solution
                ? (bilingualMode === 'en' ? 'Hide Solution' : 'Ẩn lời giải')
                : (bilingualMode === 'en' ? 'Show SGK Truth Table Solution' : 'Xem gợi ý & Đáp án chuẩn SGK')}
            </span>
          </button>
        </div>

        {/* Feedback */}
        {p2Checked && (
          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              isP2Correct
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
            }`}
          >
            {isP2Correct ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Completely correct! For every value of p (whether p=0 or p=1), the column p AND (NOT p) is always 0, and p OR (NOT p) is always 1. Both identities are proven!'
                    : 'Hoàn toàn chính xác! Với mọi giá trị của p (dù p=0 hay p=1), cột p AND (NOT p) luôn luôn bằng 0, và cột p OR (NOT p) luôn luôn bằng 1. Hai đẳng thức đã được chứng minh xong!'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Some cells are incorrect. Review the definitions of NOT, AND, and OR and try again.'
                    : 'Có một số ô điền chưa đúng! Em hãy kiểm tra lại định nghĩa của phép NOT, AND và OR để điền lại nhé.'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Solution box */}
        {showP2Solution && (
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-slate-700 dark:text-slate-200 space-y-1.5 animate-fadeIn">
            <div className="font-bold text-amber-900 dark:text-amber-300 text-sm">
              {bilingualMode === 'en' ? 'Standard SGK Truth Table Solution:' : 'Bảng chân trị chuẩn SGK:'}
            </div>
            <div className="font-mono space-y-1 pl-2">
              <div>• {bilingualMode === 'en' ? 'Row 1' : 'Dòng 1'}: p = 0 &#8594; NOT p = 1 &#8594; 0 AND 1 = <strong>0</strong> &#8594; 0 OR 1 = <strong>1</strong></div>
              <div>• {bilingualMode === 'en' ? 'Row 2' : 'Dòng 2'}: p = 1 &#8594; NOT p = 0 &#8594; 1 AND 0 = <strong>0</strong> &#8594; 1 OR 0 = <strong>1</strong></div>
            </div>
            <p className="font-semibold text-slate-900 dark:text-white pt-1">
              {bilingualMode === 'en'
                ? <>Conclusion: In all cases, <code className="font-mono text-indigo-700">p AND (NOT p) = 0</code> and <code className="font-mono text-teal-700">p OR (NOT p) = 1</code>.</>
                : <>Kết luận: Trong mọi trường hợp, <code className="font-mono text-indigo-700">p AND (NOT p) = 0</code> và <code className="font-mono text-teal-700">p OR (NOT p) = 1</code>.</>}
            </p>
          </div>
        )}
      </div>

      {/* Application a: 3 Switches in Series (Strict No Pre-Answer) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm shadow-xs">
              App.a
            </div>
            <div>
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? 'Application a (Textbook Page 27)' : 'Vận dụng a (SGK Trang 27)'}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? '3-Switch Circuit: Lamp Lights Only When All 3 Switches Are Closed'
                  : 'Mạch điện 3 công tắc điều khiển đèn chỉ sáng khi cả 3 công tắc cùng đóng'}
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-400 italic">
            {bilingualMode === 'en' ? 'Interactive Sandbox' : 'Thử nghiệm tương tác'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              Textbook prompt: <em>Design an electrical circuit comprising 3 switches K1, K2, K3 controlling a single light bulb such that the lamp illuminates only when all 3 switches are simultaneously closed.</em>
            </>
          ) : (
            <>
              Đề bài SGK yêu cầu: <em>Hãy thiết kế mạch điện gồm 3 công tắc K1, K2, K3 điều khiển 1 bóng đèn sao cho đèn chỉ sáng khi cả 3 công tắc cùng đóng.</em>
            </>
          )}
        </p>

        {/* Interactive 3-Switch Series Circuit */}
        <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-bold">
              {bilingualMode === 'en'
                ? 'Simulation: 3 Switches in Series Circuit'
                : 'Mô phỏng mạch 3 công tắc mắc nối tiếp:'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-amber-300 font-bold">
                {bilingualMode === 'en'
                  ? `Lamp Status: ${isAppLampAOn ? '💡 ON (Closed Circuit)' : '⚪ OFF (Open Circuit)'}`
                  : `Trạng thái đèn: ${isAppLampAOn ? '💡 SÁNG (Mạch kín)' : '⚪ TẮT (Mạch hở)'}`}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 py-3">
            <button
              type="button"
              onClick={() => setAppSwA1(!appSwA1)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                appSwA1 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              K1: {appSwA1 ? (bilingualMode === 'en' ? 'CLOSED (1)' : 'ĐÓNG (1)') : (bilingualMode === 'en' ? 'OPEN (0)' : 'MỞ (0)')}
            </button>
            <span className="text-slate-500 font-bold">
              {bilingualMode === 'en' ? '— series —' : '— nối tiếp —'}
            </span>
            <button
              type="button"
              onClick={() => setAppSwA2(!appSwA2)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                appSwA2 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              K2: {appSwA2 ? (bilingualMode === 'en' ? 'CLOSED (1)' : 'ĐÓNG (1)') : (bilingualMode === 'en' ? 'OPEN (0)' : 'MỞ (0)')}
            </button>
            <span className="text-slate-500 font-bold">
              {bilingualMode === 'en' ? '— series —' : '— nối tiếp —'}
            </span>
            <button
              type="button"
              onClick={() => setAppSwA3(!appSwA3)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                appSwA3 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              K3: {appSwA3 ? (bilingualMode === 'en' ? 'CLOSED (1)' : 'ĐÓNG (1)') : (bilingualMode === 'en' ? 'OPEN (0)' : 'MỞ (0)')}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              {bilingualMode === 'en' ? 'Logic Expression:' : 'Biểu thức logic:'}
            </span>
            <span className="text-cyan-300 font-bold">
              K1 AND K2 AND K3 = {appSwA1 ? '1' : '0'} &amp; {appSwA2 ? '1' : '0'} &amp; {appSwA3 ? '1' : '0'} = {isAppLampAOn ? (bilingualMode === 'en' ? '1 (LAMP ON)' : '1 (ĐÈN SÁNG)') : (bilingualMode === 'en' ? '0 (LAMP OFF)' : '0 (ĐÈN TẮT)')}
            </span>
          </div>
        </div>

        {/* Toggle Solution */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => setShowAppASolution(!showAppASolution)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {showAppASolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>
              {showAppASolution
                ? (bilingualMode === 'en' ? 'Hide Schematic Breakdown' : 'Ẩn phân tích sơ đồ')
                : (bilingualMode === 'en' ? 'Show Schematic & SGK Explanation' : 'Xem sơ đồ & Giải thích chuẩn SGK')}
            </span>
          </button>
        </div>

        {showAppASolution && (
          <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800 text-xs text-slate-700 dark:text-slate-200 space-y-1.5 animate-fadeIn">
            <div className="font-bold text-purple-900 dark:text-purple-300 text-sm">
              {bilingualMode === 'en' ? 'Official SGK Solution for Application a:' : 'Lời giải chuẩn SGK Vận dụng a:'}
            </div>
            {bilingualMode === 'en' ? (
              <>
                <p>
                  To ensure the lamp illuminates only when all 3 switches K1, K2, and K3 are closed, we must wire the <strong>3 switches in series</strong>.
                </p>
                <p>
                  Circuit diagram: Power Source (+) &#8594; Switch K1 &#8594; Switch K2 &#8594; Switch K3 &#8594; Lamp &#8594; Power Source (-).
                </p>
                <p className="font-semibold text-slate-900 dark:text-white pt-1">
                  Corresponding Boolean expression: <code className="font-mono text-indigo-700 font-bold">Lamp = K1 AND K2 AND K3</code>.
                </p>
              </>
            ) : (
              <>
                <p>
                  Để bóng đèn chỉ sáng khi cả 3 công tắc K1, K2 và K3 cùng đóng, ta phải mắc <strong>3 công tắc nối tiếp nhau</strong> (mạch nối tiếp).
                </p>
                <p>
                  Sơ đồ mạch điện: Nguồn điện (+) &#8594; Công tắc K1 &#8594; Công tắc K2 &#8594; Công tắc K3 &#8594; Bóng đèn &#8594; Nguồn điện (-).
                </p>
                <p className="font-semibold text-slate-900 dark:text-white pt-1">
                  Biểu thức lôgic tương ứng: <code className="font-mono text-indigo-700 font-bold">Đèn = K1 AND K2 AND K3</code>.
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Application b: 3 Switches in Parallel (Strict No Pre-Answer) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm shadow-xs">
              App.b
            </div>
            <div>
              <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? 'Application b (Textbook Page 27)' : 'Vận dụng b (SGK Trang 27)'}
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {bilingualMode === 'en'
                  ? '3-Switch Circuit: Lamp Lights When at Least One Switch Is Closed'
                  : 'Mạch điện 3 công tắc điều khiển đèn sáng khi có ít nhất một công tắc đóng'}
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-400 italic">
            {bilingualMode === 'en' ? 'Interactive Sandbox' : 'Thử nghiệm tương tác'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en' ? (
            <>
              Textbook prompt: <em>Design an electrical circuit comprising 3 switches K1, K2, K3 controlling a single light bulb such that the lamp illuminates when at least one switch is closed.</em>
            </>
          ) : (
            <>
              Đề bài SGK yêu cầu: <em>Hãy thiết kế mạch điện gồm 3 công tắc K1, K2, K3 điều khiển 1 bóng đèn sao cho đèn sáng khi có ít nhất một công tắc đóng.</em>
            </>
          )}
        </p>

        {/* Interactive 3-Switch Parallel Circuit */}
        <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-bold">
              {bilingualMode === 'en'
                ? 'Simulation: 3 Switches in Parallel Circuit'
                : 'Mô phỏng mạch 3 công tắc mắc song song:'}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-teal-300 font-bold">
                {bilingualMode === 'en'
                  ? `Lamp Status: ${isAppLampBOn ? '💡 ON (Closed Circuit)' : '⚪ OFF (All 3 Switches Open)'}`
                  : `Trạng thái đèn: ${isAppLampBOn ? '💡 SÁNG (Mạch kín)' : '⚪ TẮT (Cả 3 công tắc cùng mở)'}`}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 py-3">
            <button
              type="button"
              onClick={() => setAppSwB1(!appSwB1)}
              className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                appSwB1 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {bilingualMode === 'en' ? 'Branch 1 (K1): ' : 'Nhánh 1 (K1): '}{appSwB1 ? (bilingualMode === 'en' ? 'CLOSED (1)' : 'ĐÓNG (1)') : (bilingualMode === 'en' ? 'OPEN (0)' : 'MỞ (0)')}
            </button>
            <button
              type="button"
              onClick={() => setAppSwB2(!appSwB2)}
              className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                appSwB2 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {bilingualMode === 'en' ? 'Branch 2 (K2): ' : 'Nhánh 2 (K2): '}{appSwB2 ? (bilingualMode === 'en' ? 'CLOSED (1)' : 'ĐÓNG (1)') : (bilingualMode === 'en' ? 'OPEN (0)' : 'MỞ (0)')}
            </button>
            <button
              type="button"
              onClick={() => setAppSwB3(!appSwB3)}
              className={`w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                appSwB3 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {bilingualMode === 'en' ? 'Branch 3 (K3): ' : 'Nhánh 3 (K3): '}{appSwB3 ? (bilingualMode === 'en' ? 'CLOSED (1)' : 'ĐÓNG (1)') : (bilingualMode === 'en' ? 'OPEN (0)' : 'MỞ (0)')}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              {bilingualMode === 'en' ? 'Logic Expression:' : 'Biểu thức logic:'}
            </span>
            <span className="text-teal-300 font-bold">
              K1 OR K2 OR K3 = {appSwB1 ? '1' : '0'} | {appSwB2 ? '1' : '0'} | {appSwB3 ? '1' : '0'} = {isAppLampBOn ? (bilingualMode === 'en' ? '1 (LAMP ON)' : '1 (ĐÈN SÁNG)') : (bilingualMode === 'en' ? '0 (LAMP OFF)' : '0 (ĐÈN TẮT)')}
            </span>
          </div>
        </div>

        {/* Toggle Solution */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => setShowAppBSolution(!showAppBSolution)}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {showAppBSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>
              {showAppBSolution
                ? (bilingualMode === 'en' ? 'Hide Schematic Breakdown' : 'Ẩn phân tích sơ đồ')
                : (bilingualMode === 'en' ? 'Show Schematic & SGK Explanation' : 'Xem sơ đồ & Giải thích chuẩn SGK')}
            </span>
          </button>
        </div>

        {showAppBSolution && (
          <div className="p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 text-xs text-slate-700 dark:text-slate-200 space-y-1.5 animate-fadeIn">
            <div className="font-bold text-teal-900 dark:text-teal-300 text-sm">
              {bilingualMode === 'en' ? 'Official SGK Solution for Application b:' : 'Lời giải chuẩn SGK Vận dụng b:'}
            </div>
            {bilingualMode === 'en' ? (
              <>
                <p>
                  To ensure the lamp illuminates when at least one switch is closed (only shutting off when all 3 switches are open), we must wire the <strong>3 switches in parallel</strong>.
                </p>
                <p>
                  Current from positive terminal splits into 3 branches through K1, K2, and K3, converging before entering the lamp.
                </p>
                <p className="font-semibold text-slate-900 dark:text-white pt-1">
                  Corresponding Boolean expression: <code className="font-mono text-teal-700 font-bold">Lamp = K1 OR K2 OR K3</code>.
                </p>
              </>
            ) : (
              <>
                <p>
                  Để bóng đèn sáng khi có ít nhất một công tắc đóng (chỉ tắt khi cả 3 công tắc cùng mở), ta phải mắc <strong>3 công tắc song song với nhau</strong> (mạch song song).
                </p>
                <p>
                  Dòng điện từ cực dương sẽ rẽ làm 3 nhánh đi qua K1, K2, K3 rồi hội tụ lại trước khi qua bóng đèn.
                </p>
                <p className="font-semibold text-slate-900 dark:text-white pt-1">
                  Biểu thức lôgic tương ứng: <code className="font-mono text-teal-700 font-bold">Đèn = K1 OR K2 OR K3</code>.
                </p>
              </>
            )}
          </div>
        )}
      </div>


    </div>
  );
};
