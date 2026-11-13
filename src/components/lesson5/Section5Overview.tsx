import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Target,
  ArrowRight,
  HelpCircle,
  Binary,
  Layers,
  CheckCircle2,
  Cpu,
  ToggleLeft,
  ToggleRight,
  Check,
  X,
  Lightbulb,
  Info,
  Compass
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section5Overview: React.FC = () => {
  const {
    speak,
    isSpeaking,
    stopSpeaking,
    bilingualMode,
    nextPage,
    setOriginalPageTarget,
    setShowOriginalModal
  } = useBook();

  // Interactive Activity 1: Proposition Weather Statements
  const [statementStates, setStatementStates] = useState<Record<string, 'true' | 'false' | null>>({
    s1: null,
    s2: null,
    s3: null,
    s4: null
  });
  const [submittedActivity1, setSubmittedActivity1] = useState(false);

  const statements = [
    {
      id: 's1',
      textVi: '“Hôm nay trời mưa.” (Quan sát thực tế ngoài trời lúc này)',
      textEn: '"It is raining today." (Observe the actual weather outside right now)',
      type: 'proposition',
      noteVi: 'Là một mệnh đề lôgic: tại một thời điểm và địa điểm cụ thể, câu nói này hoặc Đúng (True) hoặc Sai (False), không thể vừa đúng vừa sai.',
      noteEn: 'Is a logical proposition: at a specific time and location, this statement is either True or False.'
    },
    {
      id: 's2',
      textVi: '“Nhiệt độ ngoài trời lúc này là 28°C.”',
      textEn: '"The outside temperature right now is 28°C."',
      type: 'proposition',
      noteVi: 'Là một mệnh đề lôgic: có thể kiểm chứng bằng nhiệt kế để xác định giá trị Đúng (1) hoặc Sai (0).',
      noteEn: 'Is a logical proposition: can be verified with a thermometer to determine True (1) or False (0).'
    },
    {
      id: 's3',
      textVi: '“Trời hôm nay đẹp quá!”',
      textEn: '"What a wonderful weather today!"',
      type: 'exclamation',
      noteVi: 'Câu cảm thán, thể hiện cảm xúc chủ quan, không phải là mệnh đề lôgic vì không có giá trị Đúng/Sai khách quan.',
      noteEn: 'An exclamatory sentence expressing subjective feeling; not a logical proposition.'
    },
    {
      id: 's4',
      textVi: '“Ngày mai trời có mưa không?”',
      textEn: '"Will it rain tomorrow?"',
      type: 'question',
      noteVi: 'Câu hỏi nghi vấn, không khẳng định hay phủ định điều gì nên không phải là mệnh đề lôgic.',
      noteEn: 'An interrogative question; does not assert anything, so not a logical proposition.'
    }
  ];

  const handleSelectStmt = (id: string, val: 'true' | 'false') => {
    setStatementStates((prev) => ({ ...prev, [id]: val }));
  };

  const speechText =
    "Lesson 5: Logic Data. Learning Objectives: 1. Understand logic data and fundamental logic operations including AND, OR, XOR, and NOT. 2. Understand how logic data is represented inside computer systems. Warm-up: English mathematician George Boole in 1854 established Boolean algebra, laying the foundation for computer science. Activity 1: Logical propositions and truth values.";

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12">
      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 backdrop-blur-md border border-indigo-400/30 text-xs font-semibold tracking-wide text-indigo-200 uppercase">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>
                {bilingualMode === 'en'
                  ? 'Topic 1 • Lesson 5 • Textbook Pages 24 – 27'
                  : 'Chủ đề 1 • Bài 5 • Trang 24 – 27 SGK'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {bilingualMode === 'en' ? 'LESSON 5: LOGIC DATA' : 'BÀI 5: DỮ LIỆU LÔGIC'}
            </h1>

            <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
              <span className="font-semibold text-white">Logic Data</span> — {bilingualMode === 'en'
                ? 'The mathematical foundation for all decisions in computing systems, CPU ALU pipelines, and Boolean algebra.'
                : 'Nền tảng toán học của mọi quyết định trong máy tính, bộ xử lí ALU và đại số Boole.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-indigo-100 flex items-center gap-1.5 font-medium">
                <Target className="w-3.5 h-3.5 text-emerald-300" />
                {bilingualMode === 'en' ? '2 Core Learning Objectives' : '2 Mục tiêu chuẩn SGK'}
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-indigo-100 flex items-center gap-1.5 font-medium">
                <Binary className="w-3.5 h-3.5 text-cyan-300" />
                {bilingualMode === 'en' ? 'Operations: AND, OR, XOR, NOT' : 'Phép toán AND, OR, XOR, NOT'}
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-indigo-100 flex items-center gap-1.5 font-medium">
                <Cpu className="w-3.5 h-3.5 text-amber-300" />
                {bilingualMode === 'en' ? 'Logic Circuits (Fig 5.5 & 5.6)' : 'Mạch điện logic (Hình 5.5 & 5.6)'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
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
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-medium text-sm backdrop-blur-md transition-all border border-white/20 cursor-pointer shadow-sm"
                title={bilingualMode === 'en' ? 'Listen to English narration' : 'Đọc chuẩn âm tiếng Anh bài học'}
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-cyan-300' : ''}`} />
                <span>{isSpeaking ? 'STOP' : 'EN'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(24);
                setShowOriginalModal(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold text-sm transition-all shadow-md cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>{bilingualMode === 'en' ? 'View Page 24 Scan' : 'Xem trang gốc SGK 24'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Teacher Prompts Widget for Section 0 */}
      <TeacherPromptsWidget sectionIndex={0} lessonId={5} />

      {/* Learning Objectives Box */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shadow-xs">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              <BilingualText
                vi="Mục tiêu bài học (Sau bài học này, em sẽ:)"
                en="Learning Objectives (After this lesson, you will:)"
              />
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {bilingualMode === 'en'
                ? 'Standard outcomes for Grade 10 Informatics (Textbook Page 24)'
                : 'Chuẩn đầu ra môn Tin học lớp 10 theo Chương trình GDPT 2018 (SGK Trang 24)'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              1
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                <BilingualText
                  vi="Các phép toán lôgic cơ bản"
                  en="Fundamental Logic Operations"
                />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {bilingualMode === 'en' ? (
                  <>
                    Know the logic data type and fundamental logic operations including: <span className="font-semibold text-emerald-700 dark:text-emerald-300">Conjunction (AND)</span>, <span className="font-semibold text-emerald-700 dark:text-emerald-300">Disjunction (OR)</span>, <span className="font-semibold text-emerald-700 dark:text-emerald-300">Exclusive Disjunction (XOR)</span>, and <span className="font-semibold text-emerald-700 dark:text-emerald-300">Negation (NOT)</span>.
                  </>
                ) : (
                  <>
                    Biết được kiểu dữ liệu lôgic và các phép toán lôgic cơ bản gồm: <span className="font-semibold text-emerald-700 dark:text-emerald-300">Phép hội (AND)</span>, <span className="font-semibold text-emerald-700 dark:text-emerald-300">Phép tuyển (OR)</span>, <span className="font-semibold text-emerald-700 dark:text-emerald-300">Phép tuyển loại trừ (XOR)</span> và <span className="font-semibold text-emerald-700 dark:text-emerald-300">Phép phủ định (NOT)</span>.
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-indigo-50/50 dark:from-cyan-950/30 dark:to-indigo-950/20 border border-cyan-200 dark:border-cyan-800/60 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
              2
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                <BilingualText
                  vi="Biểu diễn dữ liệu lôgic trong máy tính"
                  en="Representation of Logic Data in Computers"
                />
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {bilingualMode === 'en' ? (
                  <>
                    Understand how logic data is represented in computer memory (requiring only <span className="font-semibold text-cyan-700 dark:text-cyan-300">1 bit</span> to store: bit 1 is True, bit 0 is False) and its application in digital computer circuits.
                  </>
                ) : (
                  <>
                    Biết được cách biểu diễn dữ liệu lôgic trong bộ nhớ máy tính (chỉ cần <span className="font-semibold text-cyan-700 dark:text-cyan-300">1 bit</span> để lưu trữ: bit 1 là Đúng, bit 0 là Sai) và ứng dụng trong mạch điện máy tính.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warm-up & George Boole Historical Card */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-amber-950/20 rounded-3xl p-6 sm:p-7 border border-amber-200/80 dark:border-amber-900/40 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              {bilingualMode === 'en' ? 'Warm-up (Textbook Page 24)' : 'Khởi động (SGK Trang 24)'}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              <BilingualText
                vi="George Boole và Đại số Boole (1854)"
                en="George Boole and Boolean Algebra (1854)"
              />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              {bilingualMode === 'en' ? (
                <>
                  In 1854, British mathematician <span className="font-bold text-amber-900 dark:text-amber-300">George Boole</span> (1815 – 1864) published groundbreaking research on the laws of thought, laying the foundation for a new branch of mathematics called <span className="font-bold text-indigo-700 dark:text-indigo-400">Boolean algebra</span>.
                </>
              ) : (
                <>
                  Năm 1854, nhà toán học người Anh <span className="font-bold text-amber-900 dark:text-amber-300">George Boole</span> (1815 – 1864) đã công bố công trình nghiên cứu về các quy luật của tư duy lôgic, đặt nền móng cho một nhánh toán học mới gọi là <span className="font-bold text-indigo-700 dark:text-indigo-400">Đại số Boole (Boolean algebra)</span>.
                </>
              )}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-800 p-3.5 rounded-2xl border border-amber-200/60 dark:border-slate-700">
              <strong className="text-slate-900 dark:text-white">
                {bilingualMode === 'en' ? 'Historical Significance:' : 'Ý nghĩa lịch sử:'}
              </strong>{' '}
              {bilingualMode === 'en' ? (
                <>
                  Boolean algebra operates solely on two truth values: <code className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono font-bold">True (1)</code> and <code className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-mono font-bold">False (0)</code>. Nearly a century later, Claude Shannon proved Boolean algebra applies directly to the design of digital electronic switching circuits in modern computers!
                </>
              ) : (
                <>
                  Đại số Boole chỉ làm việc trên hai giá trị: <code className="px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono font-bold">Đúng (True / 1)</code> và <code className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-mono font-bold">Sai (False / 0)</code>. Gần 100 năm sau, Claude Shannon đã chứng minh đại số Boole có thể áp dụng trực tiếp để thiết kế các mạch điện tử số trong máy tính hiện đại!
                </>
              )}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/60 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800 text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-indigo-600 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              GB
            </div>
            <div className="font-bold text-slate-900 dark:text-white text-sm">George Boole</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {bilingualMode === 'en' ? '1815 – 1864 • United Kingdom' : '1815 – 1864 • Vương quốc Anh'}
            </div>
            <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-white dark:bg-slate-850 px-2 py-1 rounded-lg">
              {bilingualMode === 'en' ? '"Father of Boolean Logic"' : '"Cha đẻ của Đại số Lôgic"'}
            </div>
          </div>
        </div>
      </div>

      {/* Activity 1: Mệnh đề và Dự báo thời tiết (SGK Trang 24) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {bilingualMode === 'en' ? 'Activity 1 (Textbook Page 24)' : 'Hoạt động 1 (SGK Trang 24)'}
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                <BilingualText
                  vi="Đúng hay Sai trong Dự báo thời tiết?"
                  en="True or False in Weather Forecasts?"
                />
              </h2>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            {bilingualMode === 'en' ? 'Concept: Logical Proposition' : 'Khái niệm Mệnh đề Lôgic (Logical Proposition)'}
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en'
            ? 'In daily life, we frequently hear weather forecast broadcasts. Examine the statements below and determine which can be unambiguously declared as True or False:'
            : 'Trong cuộc sống hàng ngày, chúng ta thường nghe các bản tin dự báo thời tiết. Hãy xem xét các phát biểu dưới đây và xác định xem phát biểu nào có thể khẳng định rõ ràng là Đúng hoặc Sai:'}
        </p>

        {/* Statements Interactive List */}
        <div className="space-y-3">
          {statements.map((stmt, idx) => {
            const currentVal = statementStates[stmt.id];
            return (
              <div
                key={stmt.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {bilingualMode === 'en' ? stmt.textEn : stmt.textVi}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {bilingualMode === 'en' ? stmt.textVi : stmt.textEn}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleSelectStmt(stmt.id, 'true')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        currentVal === 'true'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{bilingualMode === 'en' ? 'True (1)' : 'Đúng (True / 1)'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectStmt(stmt.id, 'false')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        currentVal === 'false'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>{bilingualMode === 'en' ? 'False (0)' : 'Sai (False / 0)'}</span>
                    </button>
                  </div>
                </div>

                {/* Pedagogy explanation */}
                {submittedActivity1 && (
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900/50 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {bilingualMode === 'en' ? 'Pedagogical Observation: ' : 'Nhận xét sư phạm: '}
                      </span>
                      {bilingualMode === 'en' ? stmt.noteEn : stmt.noteVi}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setSubmittedActivity1(!submittedActivity1)}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            {submittedActivity1
              ? (bilingualMode === 'en' ? 'Hide Analysis' : 'Ẩn phân tích bản chất')
              : (bilingualMode === 'en' ? 'Check & Analyze Proposition Properties' : 'Kiểm tra & Phân tích tính chất Mệnh đề')}
          </button>

          <span className="text-xs text-slate-500 dark:text-slate-400 italic">
            {bilingualMode === 'en'
              ? '* A logical proposition is an assertive sentence taking strictly one of two truth values: True or False.'
              : '* Mệnh đề lôgic là câu khẳng định chỉ nhận đúng một trong hai giá trị: Đúng hoặc Sai.'}
          </span>
        </div>
      </div>

      {/* Navigation Card */}
      <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {bilingualMode === 'en' ? 'Next section:' : 'Phần tiếp theo:'}
          </div>
          <div className="font-bold text-slate-900 dark:text-white text-sm">
            {bilingualMode === 'en'
              ? '1. Fundamental Logic Operations (AND, OR, XOR, NOT) & Truth Tables (Page 25)'
              : '1. Các phép toán lôgic cơ bản (AND, OR, XOR, NOT) & Bảng chân trị (Trang 25)'}
          </div>
        </div>

        <button
          type="button"
          onClick={nextPage}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm transition-all shadow-md cursor-pointer shrink-0"
        >
          <span>{bilingualMode === 'en' ? 'Explore 4 Logic Operations' : 'Khám phá 4 phép toán lôgic'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
