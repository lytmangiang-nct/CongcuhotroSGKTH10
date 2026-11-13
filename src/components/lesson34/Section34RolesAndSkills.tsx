import React, { useState } from 'react';
import { Users, Code2, Brain, Sparkles, CheckCircle2, Bookmark, HelpCircle, ShieldCheck, ArrowRight, Check, X, Building2, UserCheck, RefreshCw, Award } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section34RolesAndSkills: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // Matching Exercise State (SGK Trang 163)
  // 1: Coding, 2: Analysis & Design, 3: Project Management
  const [matchingSelections, setMatchingSelections] = useState<Record<string, number | null>>({
    a: null, // Cẩn thận, tỉ mỉ -> 1
    b: null, // Học hỏi nghiệp vụ -> 2
    c: null, // Kiến thức toán, thuật toán -> 1 or 2
    d: null, // Làm chủ ngôn ngữ lập trình -> 1
    e: null, // Hiểu biết công nghệ -> 2 or 3
    g: null  // Tầm nhìn, điều phối nguồn lực -> 3
  });
  const [matchingSubmitted, setMatchingSubmitted] = useState<boolean>(false);

  // Software Squad Situation Simulator
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [selectedActionRole, setSelectedActionRole] = useState<'engineer' | 'developer' | 'pm' | null>(null);

  const traits = [
    { id: 'a', textVi: 'a) Cẩn thận, tỉ mỉ.', textEn: 'a) Meticulous and detail-oriented.', correctRoles: [1] },
    { id: 'b', textVi: 'b) Có khả năng học hỏi, tìm hiểu nghiệp vụ của lĩnh vực ứng dụng.', textEn: 'b) Ability to research domain business logic.', correctRoles: [2] },
    { id: 'c', textVi: 'c) Có kiến thức toán, thuật toán tốt.', textEn: 'c) Solid mathematical and algorithmic foundation.', correctRoles: [1, 2] },
    { id: 'd', textVi: 'd) Làm chủ được ngôn ngữ lập trình.', textEn: 'd) Mastery of programming languages.', correctRoles: [1] },
    { id: 'e', textVi: 'e) Hiểu biết công nghệ.', textEn: 'e) Broad technology comprehension.', correctRoles: [2, 3] },
    { id: 'g', textVi: 'g) Có tầm nhìn, kĩ năng tổ chức và điều phối nguồn lực.', textEn: 'g) Strategic vision, resource allocation and leadership.', correctRoles: [3] }
  ];

  const scenarios = [
    {
      titleVi: 'Tình huống 1: Khách hàng yêu cầu bổ sung tính năng thanh toán QR Code sát ngày xuất xưởng',
      descVi: 'Khách hàng ngân hàng muốn tích hợp gấp cổng VietQR chỉ 1 tuần trước ngày vận hành chính thức.',
      questionVi: 'Vai trò nào sẽ đứng ra thương lượng tiến độ, đánh giá rủi ro và điều chỉnh kế hoạch bàn giao?',
      correctRole: 'pm',
      analysisVi: 'Người quản trị dự án (PM) là người trực tiếp đàm phán với khách hàng, cân đối ngân sách và điều phối tiến độ để đảm bảo an toàn cho dự án.'
    },
    {
      titleVi: 'Tình huống 2: Cơ sở dữ liệu bị nghẽn cổ chai khi số lượng người truy cập tăng đột biến lên 100.000',
      descVi: 'Hệ thống chậm chạp, bảng đơn hàng bị khoá dữ liệu do thiết kế lược đồ quan hệ chưa tối ưu.',
      questionVi: 'Vai trò nào cần thiết kế lại cấu trúc bảng, phân vùng dữ liệu (Partitioning) và tối ưu hóa giải thuật truy vấn?',
      correctRole: 'engineer',
      analysisVi: 'Kĩ sư phần mềm (Software Architect) có kiến thức sâu về cấu trúc dữ liệu, giải thuật và kiến trúc hệ thống để thiết kế lại giải pháp kỹ thuật tổng thể.'
    },
    {
      titleVi: 'Tình huống 3: Báo cáo lỗi (Bug Report) dòng 142 gây tràn số nguyên và vỡ giao diện trên iPhone',
      descVi: 'Người dùng iPhone nhập số tiền lớn bị crash ứng dụng do kiểu dữ liệu chưa ép chuẩn.',
      questionVi: 'Vai trò nào trực tiếp mở IDE, tái hiện lỗi, sửa đoạn mã (bug fixing) và cập nhật kiểm thử đơn vị?',
      correctRole: 'developer',
      analysisVi: 'Lập trình viên (Developer) với tính cẩn thận, tỉ mỉ và thành thạo ngôn ngữ lập trình sẽ trực tiếp sửa mã lệnh và commit bản sửa đổi.'
    }
  ];

  const handleTraitAssign = (traitId: string, roleNum: number) => {
    if (matchingSubmitted) return;
    setMatchingSelections({ ...matchingSelections, [traitId]: roleNum });
  };

  const handleResetMatching = () => {
    setMatchingSelections({ a: null, b: null, c: null, d: null, e: null, g: null });
    setMatchingSubmitted(false);
  };

  const checkMatchingScore = () => {
    let correct = 0;
    traits.forEach((t) => {
      const selected = matchingSelections[t.id];
      if (selected !== null && t.correctRoles.includes(selected)) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {isVi ? 'MỤC 2 • TRANG 161 – 163 SGK' : 'SECTION 2 • TEXTBOOK PP. 161 – 163'}
          </span>
          <span className="text-xs text-slate-400">
            <BilingualText
              vi="3 Trụ cột nhân lực & Phân hóa tố chất chuyên môn"
              en="Triad of Talent & Specialized Competencies"
            />
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          <BilingualText
            vi="2. KIẾN THỨC, KĨ NĂNG CỦA NGƯỜI PHÁT TRIỂN PHẦN MỀM"
            en="2. KNOWLEDGE AND SKILLS OF SOFTWARE DEVELOPERS"
          />
        </h2>
      </div>

      {/* Hoạt động 2: Vị trí trong phát triển phần mềm */}
      <div className="bg-slate-900 bg-linear-to-br from-slate-900 via-slate-900 to-purple-950 border border-purple-500/40 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <BilingualText
            vi="Hoạt động 2: Tìm hiểu về các vị trí (SGK Trang 161)"
            en="Activity 2: Software Development Roles (Page 161)"
          />
        </div>
        <p className="text-sm text-slate-200 leading-relaxed italic">
          <BilingualText
            vi="Theo em, phát biểu 'tất cả những người phát triển phần mềm đều có vai trò như nhau' là đúng hay sai?"
            en="In your opinion, is the statement 'all software developers have identical roles' correct or incorrect?"
          />
        </p>
        <p className="text-xs text-purple-300 font-semibold">
          💡 <BilingualText
            vi="Hoàn toàn sai! Phát triển phần mềm có tính phân công chuyên môn hoá rất cao giữa Lập trình viên, Kĩ sư phần mềm và Người quản trị dự án."
            en="Incorrect! Software engineering features deep division of labor across Programmers, Architects, and Project Managers."
          />
        </p>
      </div>

      {/* Phép so sánh kinh điển: Kiến trúc sư vs Thợ xây (SGK Trang 162) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <Building2 className="w-5 h-5" />
          <span>{isVi ? 'Phép so sánh kinh điển chuẩn mực (SGK Trang 162):' : 'The Definitive Construction Metaphor (Page 162):'}</span>
        </div>

        <div className="p-5 rounded-2xl bg-linear-to-r from-blue-950/40 via-slate-950 to-purple-950/40 border border-blue-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <p className="text-base font-extrabold text-white mb-2">
            {isVi
              ? '“Sự khác biệt giữa kĩ sư phần mềm và lập trình viên tương tự như giữa kiến trúc sư và thợ xây trong xây dựng công trình!”'
              : '"The difference between a software engineer and a programmer is akin to that between an architect and a builder in civil construction!"'}
          </p>
          <p className="text-slate-300">
            {isVi
              ? 'Kĩ sư phần mềm không nhất thiết phải trực tiếp viết toàn bộ mã lệnh, nhưng sự am hiểu sâu sắc về lập trình giúp họ đưa ra giải pháp kiến trúc tối ưu nhất. Người phân tích, thiết kế phần mềm không chỉ nắm vững tin học mà còn phải thấu hiểu nghiệp vụ thực tế như một chuyên gia trong ngành.'
              : 'The software engineer need not author every line of code, but an intimate understanding of programming enables them to design optimal architectural solutions.'}
          </p>
        </div>
      </div>

      {/* 3 Trụ cột nhân sự then chốt (SGK Trang 161 – 162) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Lập trình viên */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/40 space-y-3 flex flex-col justify-between shadow-xl">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mb-2">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wider">
              {isVi ? 'Trụ Cột 1' : 'Pillar 1'}
            </span>
            <h3 className="font-extrabold text-base text-white mt-0.5">
              {isVi ? 'Lập trình viên (Programmer)' : 'Programmer / Developer'}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isVi
                ? 'Sử dụng ngôn ngữ lập trình để viết các đoạn mã lệnh thực hiện chức năng. Đòi hỏi đức tính cẩn thận, tỉ mỉ, làm chủ môi trường lập trình và kiến thức cấu trúc dữ liệu, giải thuật vững chắc.'
                : 'Directly authors executable code implementing system features. Demands meticulous precision, IDE mastery, and solid algorithmic data structures.'}
            </p>
          </div>
          <div className="text-[11px] font-mono text-purple-300 bg-purple-950/40 p-2.5 rounded-lg border border-purple-800/40">
            {isVi ? 'Tố chất: Cẩn thận, tỉ mỉ, làm chủ ngôn ngữ lập trình' : 'Traits: Meticulous, language mastery, algorithms'}
          </div>
        </div>

        {/* 2. Kĩ sư phần mềm */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-blue-500/40 space-y-3 flex flex-col justify-between shadow-xl">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-2">
              <Brain className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider">
              {isVi ? 'Trụ Cột 2' : 'Pillar 2'}
            </span>
            <h3 className="font-extrabold text-base text-white mt-0.5">
              {isVi ? 'Kĩ sư phần mềm (Software Engineer)' : 'Software Engineer / Architect'}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isVi
                ? 'Tổ chức sản xuất phần mềm, giữ vai trò như kiến trúc sư trưởng: phân tích nghiệp vụ khách hàng, thiết lập kiến trúc tổng thể, tổ chức cơ sở dữ liệu và xác định các thuật toán phù hợp.'
                : 'Orchestrates software architecture as the chief designer: analyzes business domains, models databases, and devises system solutions.'}
            </p>
          </div>
          <div className="text-[11px] font-mono text-blue-300 bg-blue-950/40 p-2.5 rounded-lg border border-blue-800/40">
            {isVi ? 'Tố chất: Tư duy kiến trúc, toán học, hiểu sâu nghiệp vụ' : 'Traits: Architectural thinking, domain mastery'}
          </div>
        </div>

        {/* 3. Người quản trị dự án */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/40 space-y-3 flex flex-col justify-between shadow-xl">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-2">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
              {isVi ? 'Trụ Cột 3' : 'Pillar 3'}
            </span>
            <h3 className="font-extrabold text-base text-white mt-0.5">
              {isVi ? 'Người quản trị dự án (PM)' : 'Project Manager (PM)'}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {isVi
                ? 'Bao trùm xuyên suốt toàn bộ dự án từ hình thành đến bàn giao: lập kế hoạch tiến độ, điều phối nhân sự, tài chính, kiểm soát chất lượng và xử lý rủi ro để dự án thành công.'
                : 'Spans the entire lifecycle: planning milestones, orchestrating squads and budgets, enforcing QA, and navigating project risks.'}
            </p>
          </div>
          <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
            {isVi ? 'Tố chất: Tầm nhìn công nghệ, kỹ năng tổ chức & lãnh đạo' : 'Traits: Tech vision, coordination & leadership'}
          </div>
        </div>
      </div>

      {/* Bài tập ghép nối tương tác chuẩn SGK Trang 163 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                {isVi ? 'Bài tập ghép nối • SGK Trang 163' : 'Interactive Matching Exercise • Page 163'}
              </span>
              <h3 className="font-bold text-white text-base">
                {isVi ? 'Ghép Hoạt Động Phát Triển Phần Mềm Với Tố Chất Thích Hợp' : 'Match Software Activities with Appropriate Traits'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetMatching}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isVi ? 'Làm lại' : 'Reset'}</span>
            </button>
          </div>
        </div>

        <p className="text-xs text-slate-300">
          {isVi
            ? 'Hãy gán mỗi tố chất ở cột bên dưới vào một trong ba hoạt động chính: 1) Lập trình (viết code); 2) Phân tích và thiết kế hệ thống; 3) Quản trị dự án.'
            : 'Assign each characteristic trait to one of the 3 primary activities: 1) Coding; 2) Analysis & Design; 3) Project Management.'}
        </p>

        {/* Traits Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {traits.map((trait) => {
            const currentSelected = matchingSelections[trait.id];
            const isRight = currentSelected !== null && trait.correctRoles.includes(currentSelected);
            return (
              <div
                key={trait.id}
                className={`p-3.5 rounded-xl border text-xs space-y-2.5 transition-all ${
                  matchingSubmitted
                    ? isRight
                      ? 'bg-emerald-950/40 border-emerald-500'
                      : 'bg-rose-950/40 border-rose-500'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-white">{isVi ? trait.textVi : trait.textEn}</span>
                  {matchingSubmitted && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isRight ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {isRight ? (isVi ? 'ĐÚNG' : 'CORRECT') : (isVi ? 'CHƯA ĐÚNG' : 'INCORRECT')}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { roleNum: 1, label: isVi ? '1. Lập trình' : '1. Coding' },
                    { roleNum: 2, label: isVi ? '2. Phân tích thiết kế' : '2. Design' },
                    { roleNum: 3, label: isVi ? '3. Quản trị dự án' : '3. PM' }
                  ].map((r) => (
                    <button
                      key={r.roleNum}
                      type="button"
                      disabled={matchingSubmitted}
                      onClick={() => handleTraitAssign(trait.id, r.roleNum)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                        currentSelected === r.roleNum
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
          {!matchingSubmitted ? (
            <button
              type="button"
              onClick={() => setMatchingSubmitted(true)}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer transition-all"
            >
              {isVi ? 'Kiểm tra kết quả ghép nối' : 'Verify Matching'}
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">{isVi ? 'Điểm của em:' : 'Your Score:'}</span>
              <span className="text-sm font-black font-mono text-emerald-400">
                {checkMatchingScore()} / {traits.length} {isVi ? 'tố chất chính xác' : 'correct'}
              </span>
            </div>
          )}

          {matchingSubmitted && (
            <div className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">
              {isVi
                ? 'Đáp án SGK: 1) Lập trình -> a, c, d; 2) Phân tích thiết kế -> b, c, e; 3) Quản trị dự án -> e, g'
                : 'Textbook Solution: 1) Coding -> a, c, d; 2) Analysis & Design -> b, c, e; 3) PM -> e, g'}
            </div>
          )}
        </div>
      </div>

      {/* Hộp Ghi nhớ Trang 162 SGK */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 bg-linear-to-r from-purple-950 via-slate-900 to-blue-950 border border-purple-500/50 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
          <Bookmark className="w-4 h-4" />
          <BilingualText
            vi="Hộp Ghi nhớ (SGK Trang 162)"
            en="Key Takeaways (Textbook page 162)"
          />
        </div>
        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-200">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 font-bold">•</span>
            <span>
              <BilingualText
                vi="Lập trình viên, kĩ sư phần mềm, người quản trị dự án là những người đảm nhận những công việc quan trọng nhất trong phát triển phần mềm."
                en="Programmers, software engineers, and project managers undertake the most pivotal responsibilities in software development."
              />
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 font-bold">•</span>
            <span>
              <BilingualText
                vi="Có kiến thức nhất định về toán học, cấu trúc dữ liệu và giải thuật nói riêng và khoa học máy tính nói chung cùng khả năng vận dụng thuần thục vào thực tế là yêu cầu cốt lõi đối với lập trình viên và kĩ sư phần mềm."
                en="A solid foundation in mathematics, data structures, and computer science combined with practical application is paramount for developers and engineers."
              />
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 font-bold">•</span>
            <span>
              <BilingualText
                vi="Quản trị dự án có vai trò cốt yếu cho sự thành công; cần có tầm nhìn, hiểu biết quy trình làm phần mềm, hiểu biết xu hướng công nghệ, kĩ năng tổ chức, lập kế hoạch và điều phối nguồn lực."
                en="Project managers govern delivery success: requiring strategic vision, methodology awareness, organization, scheduling, and squad orchestration."
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
