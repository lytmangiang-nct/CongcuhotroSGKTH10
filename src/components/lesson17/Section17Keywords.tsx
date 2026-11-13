import React, { useState } from 'react';
import {
  ShieldAlert,
  Volume2,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Search,
  KeyRound,
  FileCode,
  AlertTriangle
} from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section17Keywords: React.FC = () => {
  const { bilingualMode, speak, isSpeaking, stopSpeaking, nextPage } = useBook();

  // Python 3.x standard keywords list (SGK Trang 95)
  const pythonKeywords = [
    'False', 'None', 'True', 'and', 'as', 'assert', 'break', 'class',
    'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for',
    'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal',
    'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'
  ];

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [testedName, setTestedName] = useState<string>('');
  const [testResult, setTestResult] = useState<{ valid: boolean; message: string } | null>(null);

  // Checkpoint Quiz States
  const [checkpointStatus, setCheckpointStatus] = useState<{ [key: string]: boolean }>({});

  const handleTestName = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      setTestResult(null);
      return;
    }

    // Check reserved keyword
    if (pythonKeywords.includes(trimmed)) {
      setTestResult({
        valid: false,
        message:
          bilingualMode === 'en'
            ? `SYNTAXERROR: "${trimmed}" matches a reserved Python keyword exactly!`
            : `LỖI SYNTAXERROR: "${trimmed}" trùng hoàn toàn với từ khoá được Python dành riêng!`
      });
      return;
    }

    // Check starting with digit
    if (/^[0-9]/.test(trimmed)) {
      setTestResult({
        valid: false,
        message:
          bilingualMode === 'en'
            ? `SYNTAXERROR: "${trimmed}" begins with a digit (0-9). Variable names must start with a letter or underscore "_".`
            : `LỖI SYNTAXERROR: "${trimmed}" bắt đầu bằng chữ số (0-9). Tên biến chỉ được bắt đầu bằng chữ cái hoặc dấu gạch dưới "_".`
      });
      return;
    }

    // Check invalid characters
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmed)) {
      setTestResult({
        valid: false,
        message:
          bilingualMode === 'en'
            ? `SYNTAXERROR: "${trimmed}" contains spaces or forbidden special characters.`
            : `LỖI SYNTAXERROR: "${trimmed}" chứa dấu khoảng trắng hoặc ký tự đặc biệt không được phép.`
      });
      return;
    }

    // Valid
    setTestResult({
      valid: true,
      message:
        bilingualMode === 'en'
          ? `VALID! "${trimmed}" is a legal Python identifier.`
          : `HỢP LỆ! "${trimmed}" là định danh hợp pháp trong Python.`
    });
  };

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textVi =
        'Mục 3: Từ khoá. Từ khoá là các từ đặc biệt tham gia vào cấu trúc của ngôn ngữ lập trình. Khi viết chương trình, không được phép đặt tên biến hay các định danh trùng với từ khoá. Ví dụ các từ khoá: if, else, for, while, def, class, global, return.';
      const textEn =
        'Section 3: Keywords. Keywords are special reserved words participating in programming language structures. When coding, you must never name variables or identifiers identical to reserved keywords.';
      speak(bilingualMode === 'en' ? textEn : textVi, bilingualMode === 'en' ? 'en' : 'vi');
    }
  };

  const filteredKeywords = pythonKeywords.filter((k) =>
    k.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto pb-12 font-sans">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs font-black uppercase tracking-wider">
            {bilingualMode === 'en' ? 'Section 3 • Page 95' : 'Mục 3 • SGK Tin học 10 Trang 95'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            {bilingualMode === 'en' ? '3. Keywords in Python' : '3. Từ khoá (Keywords)'}
          </h1>
        </div>
      </div>

      {/* Activity 3: Differentiating Variables and Keywords (Hoạt động 3 - Trang 95) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-black text-base">
          <KeyRound className="w-5 h-5" />
          <span>
            {bilingualMode === 'en'
              ? 'Activity 3: Distinguishing Variables and Keywords (Page 95)'
              : 'Hoạt động 3: Phân biệt biến và từ khoá (Trang 95)'}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {bilingualMode === 'en'
            ? 'Observe the following statements in Python and discover why a syntax error is raised:'
            : 'Quan sát các lệnh sau trong môi trường Python, tìm hiểu vì sao Python báo lỗi cú pháp:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm space-y-1.5 text-slate-200 border border-slate-800">
            <div className="text-slate-400">&gt;&gt;&gt; if = 12</div>
            <div className="text-rose-400 font-bold">SyntaxError: invalid syntax</div>
            <div className="text-slate-400 pt-2">
              &gt;&gt;&gt; with = {bilingualMode === 'en' ? '"Width"' : '"Độ rộng"'}
            </div>
            <div className="text-rose-400 font-bold">SyntaxError: invalid syntax</div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <div className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>{bilingualMode === 'en' ? 'Textbook Explanation:' : 'Giải thích nguyên nhân từ SGK:'}</span>
            </div>
            <p>
              {bilingualMode === 'en' ? (
                <>
                  In Python and all high-level programming languages, there is a dedicated set of English words reserved for specific language structures, known as <strong>keywords</strong>.
                </>
              ) : (
                <>
                  Trong Python cũng như mọi ngôn ngữ lập trình bậc cao, luôn có một tập hợp các từ tiếng Anh đặc biệt được sử dụng vào mục đích riêng của ngôn ngữ lập trình, được gọi là <strong>từ khoá (keyword)</strong>.
                </>
              )}
            </p>
            <p>
              {bilingualMode === 'en' ? (
                <>
                  When programming, <strong>never name variables or identifiers matching reserved keywords</strong>. The statements above attempted to assign to reserved keywords <code className="font-mono text-rose-600 font-bold">if</code> and <code className="font-mono text-rose-600 font-bold">with</code>, so Python halted execution with a SyntaxError immediately.
                </>
              ) : (
                <>
                  Khi viết chương trình, <strong>không được đặt tên biến hay các định danh trùng với từ khoá</strong>. Các lệnh trên do đặt tên biến trùng với từ khoá <code className="font-mono text-rose-600 font-bold">if</code> và <code className="font-mono text-rose-600 font-bold">with</code> nên bị hệ thống chặn lại ngay lập tức.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive 33 Python Keywords Grid (Bảng từ khoá - Trang 95) */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>
              {bilingualMode === 'en'
                ? 'Table of 33 Standard Python 3.x Keywords (Page 95)'
                : 'Bảng 33 Từ khoá Chuẩn trong Python 3.x (SGK Trang 95)'}
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={bilingualMode === 'en' ? 'Search keywords...' : 'Tìm từ khoá...'}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 focus:outline-hidden focus:border-amber-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-2 font-mono text-xs text-center">
          {filteredKeywords.map((kw) => (
            <div
              key={kw}
              className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500 hover:text-amber-300 transition-colors font-bold text-slate-300"
            >
              {kw}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Keyword Collision Checker */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-base">
          <FileCode className="w-5 h-5" />
          <span>
            {bilingualMode === 'en'
              ? 'Variable Identifier & Keyword Collision Scanner'
              : 'Công cụ Quét Kiểm tra Va chạm Tên biến & Từ khoá'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder={bilingualMode === 'en' ? 'Enter variable name to test...' : 'Nhập tên biến cần kiểm tra...'}
            value={testedName}
            onChange={(e) => {
              setTestedName(e.target.value);
              handleTestName(e.target.value);
            }}
            className="flex-1 min-w-[200px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => handleTestName(testedName)}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-md transition-all"
          >
            {bilingualMode === 'en' ? 'Validate Syntax' : 'Kiểm tra cú pháp'}
          </button>
        </div>

        {testResult && (
          <div
            className={`p-4 rounded-2xl border font-mono text-xs sm:text-sm flex items-center gap-2.5 ${
              testResult.valid
                ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
            }`}
          >
            {testResult.valid ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
            <span>{testResult.message}</span>
          </div>
        )}
      </div>

      {/* SGK Summary Box 3: Hộp ghi nhớ (Trang 95) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-rose-500/10 dark:bg-rose-950/30 border-2 border-dashed border-rose-400 dark:border-rose-700/60 space-y-3">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-black text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <BilingualText
            vi="Hộp Ghi nhớ 3 (SGK Tin học 10 Trang 95)"
            en="Summary Box 3 (Textbook Page 95)"
          />
        </div>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
          <li className="flex items-start gap-2">
            <span className="text-rose-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Từ khoá là các từ đặc biệt tham gia vào cấu trúc của ngôn ngữ lập trình."
                en="Keywords are reserved tokens forming the foundational syntax of the programming language."
              />
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-600 font-bold">•</span>
            <div className="flex-1">
              <BilingualText
                vi="Không được phép đặt tên biến hay các định danh trùng với từ khoá."
                en="It is strictly prohibited to declare variables or other identifiers matching reserved keywords."
              />
            </div>
          </li>
        </ul>
      </div>

      {/* Checkpoint Question (SGK Trang 95) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-black text-base">
          <HelpCircle className="w-5 h-5" />
          <span>
            {bilingualMode === 'en'
              ? 'Checkpoint Questions Section 3 (Page 95)'
              : 'Câu hỏi củng cố sau Mục 3 (SGK Trang 95)'}
          </span>
        </div>

        <p className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
          {bilingualMode === 'en'
            ? 'Are the following variable names valid? (Click each name to verify)'
            : 'Các tên biến sau có hợp lệ không? (Bấm vào từng tên để kiểm tra kết quả)'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs">
          {[
            { id: 'a', name: '_if', valid: true },
            { id: 'b', name: 'global', valid: false },
            { id: 'c', name: 'nolocal', valid: true },
            { id: 'd', name: 'return', valid: false },
            { id: 'e', name: 'true', valid: true }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCheckpointStatus((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
              className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                checkpointStatus[item.id]
                  ? item.valid
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                    : 'bg-rose-600 text-white border-rose-600 shadow-md'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="font-black text-sm">{item.id}) {item.name}</div>
              {checkpointStatus[item.id] && (
                <div className="text-[10px] font-sans mt-1 leading-tight">
                  {item.valid
                    ? bilingualMode === 'en'
                      ? '✓ Valid'
                      : '✓ Hợp lệ'
                    : bilingualMode === 'en'
                      ? '✗ Invalid'
                      : '✗ Không hợp lệ'}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Teacher Prompts Widget */}
      <TeacherPromptsWidget sectionIndex={3} lessonId={17} />

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={nextPage}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 active:scale-95 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
        >
          <span>
            {bilingualMode === 'en'
              ? 'Continue to Section 4: Hands-on Practice Lab'
              : 'Tiếp tục Mục 4: Thực hành Tạo & Tính toán với Biến'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
