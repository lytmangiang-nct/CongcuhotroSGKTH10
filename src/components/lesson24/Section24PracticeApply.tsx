import React, { useState, useEffect } from 'react';
import { useBook } from '../../context/BookContext';
import {
  BookOpen,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  Calculator,
  Type,
  Plus,
  Filter,
  Users
} from 'lucide-react';

export const Section24PracticeApply: React.FC = () => {
  const {
    setOriginalPageTarget,
    setShowOriginalModal,
    bilingualMode,
    navigateToQuiz,
    completeSectionTasks
  } = useBook();

  const isEn = bilingualMode === 'en';

  // Mark task completion for section 5 (index 4) on load to prevent deadlock
  useEffect(() => {
    completeSectionTasks(24, 4);
  }, [completeSectionTasks]);

  // Luyện tập 1 State: Trích 3 kí tự đầu
  const [lt1Input, setLt1Input] = useState<string>('Thời khoá biểu');
  const [lt1Result, setLt1Result] = useState<string>('Thờ');

  const handleRunLt1 = () => {
    if (lt1Input.length >= 3) {
      setLt1Result(lt1Input[0] + lt1Input[1] + lt1Input[2]);
    } else {
      setLt1Result(lt1Input);
    }
    completeSectionTasks(24, 4);
  };

  // Luyện tập 2 State: Kiểm tra có chứa chữ số không
  const [lt2Input, setLt2Input] = useState<string>('Hà Nội 2024');
  const [lt2Result, setLt2Result] = useState<{ hasDigit: boolean; matchedDigits: string[] }>({
    hasDigit: true,
    matchedDigits: ['2', '0', '2', '4']
  });

  const handleRunLt2 = () => {
    const digits: string[] = [];
    for (const ch of lt2Input) {
      if ('0123456789'.includes(ch)) {
        digits.push(ch);
      }
    }
    setLt2Result({
      hasDigit: digits.length > 0,
      matchedDigits: digits
    });
    completeSectionTasks(24, 4);
  };

  // Vận dụng 1: Chèn s1 vào giữa s2 tại len(s2)//2
  const [vd1S1, setVd1S1] = useState<string>(' [VIỆT NAM] ');
  const [vd1S2, setVd1S2] = useState<string>('Xin chào các bạn');
  const [vd1Result, setVd1Result] = useState<string>('');

  const handleRunVd1 = () => {
    const mid = Math.floor(vd1S2.length / 2);
    let nuaDau = '';
    for (let i = 0; i < mid; i++) nuaDau += vd1S2[i];
    let nuaSau = '';
    for (let i = mid; i < vd1S2.length; i++) nuaSau += vd1S2[i];
    setVd1Result(nuaDau + vd1S1 + nuaSau);
    completeSectionTasks(24, 4);
  };

  // Vận dụng 2: Đếm số bạn tên "Hương"
  const [vd2Names, setVd2Names] = useState<string>(
    'Nguyễn Thu Hương, Trần Lan, Lê Mai Hương, Phạm Văn Nam, Đỗ Hương Giang'
  );
  const [vd2Count, setVd2Count] = useState<number>(3);
  const [vd2Matches, setVd2Matches] = useState<string[]>([
    'Nguyễn Thu Hương',
    'Lê Mai Hương',
    'Đỗ Hương Giang'
  ]);

  const handleRunVd2 = () => {
    const names = vd2Names.split(',').map(s => s.trim()).filter(Boolean);
    const matches = names.filter(n => n.includes('Hương'));
    setVd2Count(matches.length);
    setVd2Matches(matches);
    completeSectionTasks(24, 4);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* SGK Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-200 text-sm font-semibold tracking-wide uppercase mb-1">
            <Calculator className="w-4 h-4" />
            <span>
              {isEn
                ? 'Practice & Application • Informatics 10 KNTT — Page 122'
                : 'Luyện tập & Vận dụng • SGK Tin học 10 Kết nối tri thức — Trang 122'}
            </span>
          </div>
          <h2 className="text-2xl font-bold">
            {isEn
              ? 'PRACTICE & APPLICATION: STRING DATA TYPE'
              : 'LUYỆN TẬP & VẬN DỤNG KIỂU DỮ LIỆU XÂU KÍ TỰ'}
          </h2>
          <p className="text-emerald-100 text-sm mt-1">
            {isEn
              ? 'Consolidate character indexing, digit presence filtering, midpoint substring insertion, and student name searching.'
              : 'Củng cố kĩ năng trích xuất chỉ số xâu, lọc kiểm tra chữ số bằng vòng lặp, chèn xâu vào vị trí chính giữa và tìm kiếm tên bằng toán tử in.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setOriginalPageTarget(122);
            setShowOriginalModal(true);
          }}
          className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/20 transition-all backdrop-blur-sm shadow cursor-pointer shrink-0"
        >
          <BookOpen className="w-4 h-4 text-emerald-300" />
          <span>{isEn ? 'View Textbook Page 122' : 'Xem trang 122 gốc'}</span>
        </button>
      </div>

      {/* Luyện tập 1 & Luyện tập 2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Luyện tập 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-xs">
                1
              </span>
              <span>{isEn ? 'Practice 1 (Textbook Page 122)' : 'Luyện tập 1 (SGK Trang 122)'}</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              {isEn
                ? 'Extract and print the first 3 characters of a string S (length ≥ 3)'
                : 'Viết chương trình trích ra 3 kí tự đầu tiên của xâu S (độ dài ≥ 3)'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {isEn ? (
                <>Since string indexing starts at 0, the first 3 characters correspond to indices 0, 1, and 2: <code className="font-mono font-bold text-emerald-600">S[0] + S[1] + S[2]</code>.</>
              ) : (
                <>Do xâu đánh số từ 0, 3 kí tự đầu tiên tương ứng với các chỉ số 0, 1 và 2: <code className="font-mono font-bold text-emerald-600">S[0] + S[1] + S[2]</code>.</>
              )}
            </p>

            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 mb-4">
              <div className="text-slate-500 mb-1"># {isEn ? 'Textbook Python code:' : 'Mã nguồn Python SGK:'}</div>
              <div>S = input("{isEn ? 'Enter string: ' : 'Nhập xâu: '}")</div>
              <div className="text-emerald-400 font-bold">kq = S[0] + S[1] + S[2]</div>
              <div className="text-yellow-300">print("{isEn ? 'First 3 chars:' : '3 kí tự đầu:'}", kq)</div>
            </div>

            <div className="space-y-2 mb-3">
              <label className="text-xs text-slate-500 font-medium">
                {isEn ? 'Test string S:' : 'Xâu S kiểm thử:'}
              </label>
              <input
                type="text"
                value={lt1Input}
                onChange={e => setLt1Input(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleRunLt1}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow transition-all cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>{isEn ? 'Extract First 3 Characters' : 'Trích xuất 3 kí tự đầu'}</span>
            </button>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs flex items-center justify-between">
              <span className="text-emerald-900 dark:text-emerald-200 font-bold">
                {isEn ? 'Result:' : 'Kết quả:'}
              </span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                "{lt1Result}"
              </span>
            </div>
          </div>
        </div>

        {/* Luyện tập 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-xs">
                2
              </span>
              <span>{isEn ? 'Practice 2 (Textbook Page 122)' : 'Luyện tập 2 (SGK Trang 122)'}</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              {isEn
                ? 'Check whether string S contains any numeric digits'
                : 'Viết chương trình kiểm tra xâu S có chứa chữ số hay không'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {isEn ? (
                <>Traverse each character <code className="font-mono">for ch in S:</code> and test membership against digit alphabet <code className="font-mono font-bold text-teal-600">ch in "0123456789"</code>.</>
              ) : (
                <>Duyệt trực tiếp từng kí tự <code className="font-mono">for ch in S:</code> và kiểm tra điều kiện xuất hiện trong bảng số <code className="font-mono font-bold text-teal-600">ch in "0123456789"</code>.</>
              )}
            </p>

            <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 mb-4">
              <div className="text-slate-500 mb-1"># {isEn ? 'Textbook Python code:' : 'Mã nguồn Python SGK:'}</div>
              <div>co_so = False</div>
              <div className="text-cyan-400 font-bold">for ch in S:</div>
              <div className="pl-4 text-emerald-300">if ch in "0123456789":</div>
              <div className="pl-8 text-yellow-300">co_so = True</div>
              <div className="pl-8 text-yellow-300">break</div>
            </div>

            <div className="space-y-2 mb-3">
              <label className="text-xs text-slate-500 font-medium">
                {isEn ? 'Test string S:' : 'Xâu S kiểm thử:'}
              </label>
              <input
                type="text"
                value={lt2Input}
                onChange={e => setLt2Input(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleRunLt2}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow transition-all cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              <span>{isEn ? 'Scan for Digits' : 'Kiểm tra chữ số trong xâu'}</span>
            </button>

            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800/60 text-xs flex items-center justify-between">
              <span className="text-teal-900 dark:text-teal-200 font-bold">
                {isEn ? 'Verdict:' : 'Kết luận:'}
              </span>
              <span
                className={`font-mono font-bold text-xs px-3 py-1 rounded-lg border ${
                  lt2Result.hasDigit
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300'
                }`}
              >
                {lt2Result.hasDigit
                  ? (isEn ? `Contains digits: [${lt2Result.matchedDigits.join(', ')}]` : `Có chứa chữ số: [${lt2Result.matchedDigits.join(', ')}]`)
                  : (isEn ? 'No digits found' : 'Không chứa chữ số')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vận dụng 1 & Vận dụng 2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vận dụng 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-xs">
                VD1
              </span>
              <span>{isEn ? 'Application 1 (Textbook Page 122)' : 'Vận dụng 1 (SGK Trang 122)'}</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              {isEn
                ? 'Insert string s1 into the exact middle of string s2 (position len(s2) // 2)'
                : 'Chèn xâu s1 vào vị trí chính giữa xâu s2 (vị trí len(s2) // 2)'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {isEn
                ? 'Compute midpoint k = len(s2) // 2, extract the first half up to k, append s1, then attach the remaining second half.'
                : 'Xác định điểm giữa k = len(s2) // 2, trích nửa đầu xâu s2 đến vị trí k, ghép xâu s1 và nối nốt nửa sau của s2.'}
            </p>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-slate-500 font-medium">{isEn ? 'String to insert s1:' : 'Xâu cần chèn s1:'}</label>
                <input
                  type="text"
                  value={vd1S1}
                  onChange={e => setVd1S1(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium">{isEn ? 'Target string s2:' : 'Xâu gốc s2:'}</label>
                <input
                  type="text"
                  value={vd1S2}
                  onChange={e => setVd1S2(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono font-bold focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleRunVd1}
              className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isEn ? 'Execute Midpoint Insertion' : 'Thực hiện chèn vào giữa'}</span>
            </button>

            {vd1Result && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60 text-xs">
                <div className="text-amber-800 dark:text-amber-300 font-bold mb-1">
                  {isEn ? 'Resulting string:' : 'Xâu sau khi chèn:'}
                </div>
                <div className="font-mono text-xs text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900 p-2 rounded-lg border border-amber-200 dark:border-amber-800 break-all">
                  {vd1Result}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vận dụng 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm mb-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-xs">
                VD2
              </span>
              <span>{isEn ? 'Application 2 (Textbook Page 122)' : 'Vận dụng 2 (SGK Trang 122)'}</span>
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              {isEn
                ? 'Count how many students in the class list have the name "Hương"'
                : 'Đếm số lượng học sinh trong lớp có tên chứa "Hương"'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {isEn
                ? 'Traverse the list of student names and apply the substring operator: if "Hương" in name: count = count + 1.'
                : 'Duyệt danh sách họ tên và kiểm tra bằng toán tử xâu con: if "Hương" in ten: dem = dem + 1.'}
            </p>

            <div className="space-y-2 mb-3">
              <label className="text-xs text-slate-500 font-medium">
                {isEn ? 'Student roster (comma-separated):' : 'Danh sách họ tên (ngăn cách bởi dấu phẩy):'}
              </label>
              <textarea
                rows={3}
                value={vd2Names}
                onChange={e => setVd2Names(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleRunVd2}
              className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-xs py-2.5 rounded-xl shadow transition-all cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>{isEn ? 'Count Students Named "Hương"' : 'Đếm số bạn tên "Hương"'}</span>
            </button>

            <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800/60 text-xs flex items-center justify-between">
              <span className="text-cyan-900 dark:text-cyan-200 font-bold">
                {isEn ? 'Total matching students:' : 'Tổng số học sinh tìm thấy:'}
              </span>
              <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold text-sm bg-white dark:bg-slate-900 px-3 py-1 rounded-lg border border-cyan-200 dark:border-cyan-800">
                {vd2Count} {isEn ? 'students' : 'bạn'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ GUIDANCE CARD: Directs student to open Quiz from the top navigation bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900/60 via-teal-900/40 to-slate-900 border-2 border-emerald-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <span>
                {isEn
                  ? 'Official 10-Question Mastery Assessment & Certificate'
                  : 'Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài 24 (10 Câu)'}
              </span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'To take the 10-question textbook quiz and earn your verified Certificate for Lesson 24, click the "Quiz" button on the top navigation bar.'
                : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành Bài 24, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={navigateToQuiz}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0 hover:scale-105 active:scale-95"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>{isEn ? 'Open Quiz on Nav Bar →' : 'Mở Trắc Nghiệm Trên Thanh Điều Hướng →'}</span>
        </button>
      </div>
    </div>
  );
};
