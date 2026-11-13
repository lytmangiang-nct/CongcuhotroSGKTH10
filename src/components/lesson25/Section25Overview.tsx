import React, { useState } from 'react';
import { Target, Search, Sparkles, BookOpen, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { StringMethods3DViewer } from './StringMethods3DViewer';

export const Section25Overview: React.FC = () => {
  const { bilingualMode, setCurrentPage } = useBook();
  const isEn = bilingualMode === 'en';

  const [khoidongRevealed, setKhoidongRevealed] = useState<boolean>(false);

  const sampleC = "Trường Sơn";
  const sampleM = "Bước chân trên dải Trường Sơn";
  const sampleIndex = sampleM.indexOf(sampleC); // 21

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Lesson Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-sky-950 via-indigo-950 to-slate-950 border border-sky-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isEn ? 'Topic 5: Problem Solving with Python' : 'Chủ đề 5: Lập trình Python cơ bản'}</span>
              <span>•</span>
              <span>{isEn ? 'Lesson 25 (SGK pp. 123 – 126)' : 'Bài 25 (Trang 123 – 126 SGK)'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isEn ? 'Lesson 25: String Methods & Operations' : 'Bài 25: Một Số Lệnh Làm Việc Với Xâu Kí Tự'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isEn
                ? 'Master Python string methods: find(), split(), and join(). Explore substring search algorithms, text normalization, and name separation pipelines.'
                : 'Làm chủ các phương thức chuyên biệt cho xâu trong Python: tìm vị trí xâu con với find(), bẻ tách từ với split() và nối xâu với join(). Ứng dụng chuẩn hoá văn bản và tách họ tên danh sách học sinh.'}
            </p>
          </div>

          {/* Quick Objective Card */}
          <div className="bg-slate-900/90 border border-sky-500/40 rounded-2xl p-4 sm:p-5 shadow-xl shrink-0 md:max-w-xs space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <Target className="w-4 h-4" />
              <span>{isEn ? 'Learning Objectives' : 'Mục tiêu bài học (Tr. 123)'}</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? 'Understand and execute common string methods in Python.'
                    : 'Biết và thực hiện được một số lệnh thường dùng với xâu kí tự.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? 'Locate substrings with find() and determine membership with in.'
                    : 'Tìm kiếm vị trí xâu con với find() và kiểm tra xâu con với toán tử in.'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {isEn
                    ? 'Transform between strings and lists using split() and join().'
                    : 'Chuyển đổi qua lại giữa xâu và danh sách từ bằng split() và join().'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Khởi động (Warm-up Activity) - Official SGK Trang 123 */}
      <div className="rounded-2xl border border-amber-500/40 bg-linear-to-br from-amber-950/20 via-slate-900 to-slate-900 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{isEn ? 'Warm-up Activity: The Substring Search Problem' : 'Khởi động: Bài toán tìm kiếm xâu con trong thực tế'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                {isEn ? 'SGK Page 123' : 'Trang 123 SGK'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              {isEn
                ? 'Search engines on the Internet and search commands in word processors are built on substring search algorithms.'
                : 'Công cụ tìm kiếm thông tin trên Internet hay lệnh tìm kiếm trong soạn thảo văn bản được xây dựng trên cơ sở bài toán tìm xâu con.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-3 text-sm">
          <div className="text-slate-300 leading-relaxed">
            {isEn ? (
              <>
                Given string <code className="text-sky-300 font-bold">c = "Trường Sơn"</code> and string{' '}
                <code className="text-amber-300 font-bold">m = "Bước chân trên dải Trường Sơn"</code>.
                <br />
                Is string <code className="text-sky-300 font-bold">c</code> a substring of string <code className="text-amber-300 font-bold">m</code>? If so, what is the index position of <code className="text-sky-300 font-bold">c</code> in <code className="text-amber-300 font-bold">m</code>?
              </>
            ) : (
              <>
                Cho xâu <code className="text-sky-300 font-bold">c = "Trường Sơn"</code> và xâu{' '}
                <code className="text-amber-300 font-bold">m = "Bước chân trên dải Trường Sơn"</code>.
                <br />
                Em hãy cho biết xâu <code className="text-sky-300 font-bold">c</code> có là xâu con của xâu <code className="text-amber-300 font-bold">m</code> không? Nếu có thì tìm vị trí của xâu <code className="text-sky-300 font-bold">c</code> trong xâu <code className="text-amber-300 font-bold">m</code>.
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setKhoidongRevealed(!khoidongRevealed)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Search className="w-4 h-4" />
              <span>{khoidongRevealed ? (isEn ? 'Hide Solution' : 'Ẩn lời giải') : (isEn ? 'Solve with Python' : 'Giải đáp bằng Python')}</span>
            </button>
          </div>

          {khoidongRevealed && (
            <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-2.5 animate-in fade-in duration-200">
              <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isEn ? 'Python Execution Result:' : 'Kết quả thực thi trong Python:'}</span>
              </div>
              <div className="p-3 rounded-lg bg-black/60 font-mono text-xs space-y-1 text-slate-200 border border-slate-800">
                <div className="text-slate-400">&gt;&gt;&gt; c = "Trường Sơn"</div>
                <div className="text-slate-400">&gt;&gt;&gt; m = "Bước chân trên dải Trường Sơn"</div>
                <div>
                  <span className="text-sky-400">&gt;&gt;&gt; c in m</span>
                  <span className="text-emerald-400 ml-2 font-bold">True</span>
                  <span className="text-slate-400 text-[11px] ml-3"># c là xâu con của m</span>
                </div>
                <div>
                  <span className="text-sky-400">&gt;&gt;&gt; m.find(c)</span>
                  <span className="text-emerald-400 ml-2 font-bold">{sampleIndex}</span>
                  <span className="text-slate-400 text-[11px] ml-3"># Vị trí xuất hiện đầu tiên là chỉ số {sampleIndex}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                {isEn
                  ? `Yes! "Trường Sơn" is indeed a substring of m. The find() method locates it starting exactly at index ${sampleIndex}.`
                  : `Đúng vậy! Xâu "Trường Sơn" có nằm trong xâu m. Lệnh m.find(c) trả về chính xác vị trí bắt đầu là chỉ số ${sampleIndex}.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3D Interactive WebGL Methods Laboratory */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base sm:text-xl font-bold text-white">
              {isEn ? '3D WebGL String Methods Laboratory' : 'Phòng thí nghiệm 3D WebGL Các Phương thức Xâu'}
            </h2>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {isEn ? 'Interact with 3D cubes, laser scanner, and conveyor belt' : 'Tương tác với khối 3D, tia laser và băng chuyền tách họ tên'}
          </span>
        </div>

        <StringMethods3DViewer />
      </div>

      {/* 4-Section Roadmap */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          {isEn ? 'Lesson 25 Syllabus Roadmap' : 'Lộ trình bài học Bài 25 (Trang 123 – 126)'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              sec: 1,
              titleVi: '1. Xâu con & Lệnh find()',
              titleEn: '1. Substrings & find()',
              descVi: 'Toán tử in, cú pháp lệnh find(), tham số start, lỗi -1 khi không tìm thấy.',
              descEn: 'in operator, find() syntax, start parameter, -1 return value.',
              page: 'Trang 123 – 124',
              color: 'sky'
            },
            {
              sec: 2,
              titleVi: '2. Lệnh split() & join()',
              titleEn: '2. split() & join() Methods',
              descVi: 'Tách xâu thành danh sách từ, nối danh sách thành xâu, thay thế kí tự.',
              descEn: 'Splitting text to word lists, joining lists to string, character replacement.',
              page: 'Trang 124 – 125',
              color: 'indigo'
            },
            {
              sec: 3,
              titleVi: '3. Thực hành: 3 Nhiệm vụ',
              titleEn: '3. Practical Lab: 3 Tasks',
              descVi: 'NV1 nhập mảng số, NV2 chuẩn hoá dấu cách, NV3 tách 2 cột họ đệm và tên.',
              descEn: 'Task 1 number input, Task 2 space normalization, Task 3 name column split.',
              page: 'Trang 125 – 126',
              color: 'emerald'
            },
            {
              sec: 4,
              titleVi: '4. Luyện tập, Vận dụng & Thi',
              titleEn: '4. Practice & Certification',
              descVi: 'Tính tổng số nhập, tách họ tên người dùng, ƯCLN Euclid, đếm tên cùng lớp.',
              descEn: 'Sum numbers, user name separation, Euclidean GCD, duplicate name counter.',
              page: 'Trang 126',
              color: 'amber'
            }
          ].map((item) => (
            <div
              key={item.sec}
              onClick={() => setCurrentPage(item.sec)}
              className="group p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-all cursor-pointer hover:-translate-y-0.5 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                    {item.page}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="font-bold text-slate-100 text-sm group-hover:text-sky-300 transition-colors">
                  {isEn ? item.titleEn : item.titleVi}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isEn ? item.descEn : item.descVi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
