import React, { useState } from 'react';
import { GitBranch, Layers, Sparkles, CheckCircle2, Bookmark, HelpCircle, Code2, Users, FileText, ArrowRight, ShieldAlert, Cpu, Check, Play, RefreshCw } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';

export const Section34ConceptAndSDLC: React.FC = () => {
  const { bilingualMode } = useBook();
  const isVi = bilingualMode !== 'en';

  // Interactive SDLC Simulator State
  const [activeStageStep, setActiveStageStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);

  // Question reinforce state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const stagesData = [
    {
      step: 1,
      titleVi: '1. Điều tra khảo sát',
      titleEn: '1. Survey & Requirements',
      shortVi: 'Khảo sát',
      roleVi: 'Chuyên viên phân tích nghiệp vụ (BA)',
      roleEn: 'Business Analyst (BA)',
      outputVi: 'Tài liệu hồ sơ yêu cầu người dùng (BRD)',
      outputEn: 'Business / User Requirements Document (BRD)',
      actionVi: 'Gặp gỡ ban giám đốc bệnh viện, bác sĩ, điều dưỡng để khảo sát quy trình khám chữa bệnh, cấp phát thuốc và thanh toán BHYT.',
      actionEn: 'Meet with hospital directors, physicians, and nurses to survey clinical workflows, pharmacy dispensing, and health insurance billing.',
      costNote: 'Phát hiện sai sót ở khâu này: Chi phí sửa chữa là 1x (Cực rẻ - chỉ cần sửa trên giấy).',
      costNoteEn: 'Bug detected at this stage: Fix cost is 1x (Ultra-low — only paperwork needs revision).'
    },
    {
      step: 2,
      titleVi: '2. Phân tích hệ thống',
      titleEn: '2. Systems Analysis',
      shortVi: 'Phân tích',
      roleVi: 'Kĩ sư phân tích hệ thống (System Analyst)',
      roleEn: 'System Analyst',
      outputVi: 'Đặc tả yêu cầu phần mềm (SRS - Software Requirement Specification)',
      outputEn: 'Software Requirement Specification (SRS)',
      actionVi: 'Mô hình hoá quy trình tiếp nhận bệnh nhân, biểu đồ luồng dữ liệu (DFD), sơ đồ ca sử dụng (Use Case: Đặt lịch, Xem hồ sơ bệnh án).',
      actionEn: 'Model patient intake workflows, Data Flow Diagrams (DFD), and Use Case diagrams (Book Appointment, View Medical Record).',
      costNote: 'Phát hiện sai sót ở khâu này: Chi phí sửa chữa là 5x.',
      costNoteEn: 'Bug detected at this stage: Fix cost is 5x.'
    },
    {
      step: 3,
      titleVi: '3. Thiết kế hệ thống',
      titleEn: '3. Systems Design',
      shortVi: 'Thiết kế',
      roleVi: 'Kiến trúc sư phần mềm (Software Architect) & Designer UI/UX',
      roleEn: 'Software Architect & UI/UX Designer',
      outputVi: 'Bản thiết kế kiến trúc vi dịch vụ, lược đồ CSDL (ERD), giao diện Figma',
      outputEn: 'Microservice architecture blueprint, Database ERD, and Figma UI mockups',
      actionVi: 'Thiết kế bảng dữ liệu Bệnh Nhân, Bác Sĩ, Đơn Thuốc; thiết kế giao diện ứng dụng di động cho bệnh nhân và web cho phòng khám.',
      actionEn: 'Design Patient, Doctor, and Prescription database schemas alongside mobile patient interfaces and clinic web dashboards.',
      costNote: 'Phát hiện sai sót ở khâu này: Chi phí sửa chữa là 10x.',
      costNoteEn: 'Bug detected at this stage: Fix cost is 10x.'
    },
    {
      step: 4,
      titleVi: '4. Lập trình',
      titleEn: '4. Implementation & Coding',
      shortVi: 'Lập trình',
      roleVi: 'Lập trình viên (Backend, Frontend, Mobile Developers)',
      roleEn: 'Backend, Frontend & Mobile Developers',
      outputVi: 'Mã nguồn hoàn chỉnh (Source Code) và cơ sở dữ liệu hoạt động',
      outputEn: 'Production Source Code and live operational database',
      actionVi: 'Dùng Python (FastAPI) viết API dịch vụ, dùng React xây dựng giao diện web bác sĩ và Flutter xây ứng dụng di động bệnh nhân.',
      actionEn: 'Build service APIs in Python (FastAPI), doctor web portals in React, and patient mobile apps in Flutter.',
      costNote: 'Phát hiện sai sót ở khâu này: Chi phí sửa chữa là 20x (Phải đập đi viết lại code).',
      costNoteEn: 'Bug detected at this stage: Fix cost is 20x (Requires rewriting source code).'
    },
    {
      step: 5,
      titleVi: '5. Kiểm thử',
      titleEn: '5. Testing & Quality Assurance',
      shortVi: 'Kiểm thử',
      roleVi: 'Kĩ sư kiểm thử chất lượng (QA/QC / Test Engineers)',
      roleEn: 'QA / QC & Test Engineers',
      outputVi: 'Kịch bản kiểm thử (Test Cases), Báo cáo lỗi (Bug Reports), Giấy chứng nhận chất lượng',
      outputEn: 'Test Cases, Bug Reports, and Quality Assurance Sign-off',
      actionVi: 'Chạy thử tự động 1.000 kịch bản đặt lịch khám, kiểm tra bảo mật thông tin hồ sơ bệnh án, kiểm tra chịu tải 50.000 người dùng đồng thời.',
      actionEn: 'Run 1,000 automated appointment test cases, audit medical record security, and stress-test 50,000 concurrent users.',
      costNote: 'Phát hiện sai sót ở khâu này: Chi phí sửa chữa là 50x.',
      costNoteEn: 'Bug detected at this stage: Fix cost is 50x.'
    },
    {
      step: 6,
      titleVi: '6. Chuyển giao',
      titleEn: '6. Deployment & Handover',
      shortVi: 'Chuyển giao',
      roleVi: 'Kĩ sư vận hành đám mây (DevOps) & Chuyên viên đào tạo',
      roleEn: 'DevOps Engineer & Training Specialist',
      outputVi: 'Hệ thống chạy trên Cloud, tài liệu hướng dẫn sử dụng, biên bản nghiệm thu',
      outputEn: 'Live Cloud system, user documentation, and acceptance handover record',
      actionVi: 'Triển khai phần mềm lên máy chủ bệnh viện, kết nối máy quét mã vạch thẻ BHYT, tập huấn hướng dẫn sử dụng cho toàn bộ y bác sĩ.',
      actionEn: 'Deploy software onto hospital servers, integrate insurance barcode scanners, and train all physicians and medical staff.',
      costNote: 'Phát hiện lỗi lúc này: 70x chi phí (Ảnh hưởng vận hành phòng khám thực tế).',
      costNoteEn: 'Bug detected at this stage: Fix cost is 70x (Disrupts live clinic operations).'
    },
    {
      step: 7,
      titleVi: '7. Bảo trì',
      titleEn: '7. Maintenance & Evolution',
      shortVi: 'Bảo trì',
      roleVi: 'Đội ngũ Kĩ sư bảo trì & Nâng cấp sản phẩm',
      roleEn: 'Maintenance & Product Evolution Engineers',
      outputVi: 'Các bản cập nhật vá lỗi (Patches), tính năng nâng cấp (Version 2.0)',
      outputEn: 'Hotfix Patches and feature upgrade releases (Version 2.0)',
      actionVi: 'Hỗ trợ kỹ thuật 24/7, vá lỗi phát sinh khi người dùng nhập dữ liệu đặc thù, tích hợp thêm tính năng mới: Trợ lý ảo AI tư vấn kết quả khám.',
      actionEn: 'Provide 24/7 technical support, patch edge-case input bugs, and ship Version 2.0 features like diagnostic result summaries.',
      costNote: 'Nếu lỗi nghiêm trọng phát sinh do khâu khảo sát sai: Chi phí sửa chữa lên tới 100x!',
      costNoteEn: 'If a critical defect stems from flawed early requirements: Fix cost skyrockets to 100x!'
    }
  ];

  const handleNextStep = () => {
    if (activeStageStep < stagesData.length - 1) {
      const next = activeStageStep + 1;
      setActiveStageStep(next);
      if (!completedSteps.includes(next)) {
        setCompletedSteps([...completedSteps, next]);
      }
    }
  };

  const handleResetSim = () => {
    setActiveStageStep(0);
    setCompletedSteps([0]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            {isVi ? 'MỤC 1 • TRANG 160 – 161 SGK' : 'SECTION 1 • TEXTBOOK PP. 160 – 161'}
          </span>
          <span className="text-xs text-slate-400">
            <BilingualText
              vi="Bản chất quy trình công nghiệp & Chu trình SDLC 7 công đoạn"
              en="Industrial Lifecycle & 7-Stage SDLC Cycle"
            />
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          <BilingualText
            vi="1. PHÁT TRIỂN PHẦN MỀM LÀ GÌ?"
            en="1. WHAT IS SOFTWARE DEVELOPMENT?"
          />
        </h2>
      </div>

      {/* Hoạt động 1: Hiểu về phát triển phần mềm */}
      <div className="bg-slate-900 bg-linear-to-br from-slate-900 via-slate-900 to-blue-950 border border-blue-500/40 rounded-2xl p-5 sm:p-6 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>{isVi ? 'Hoạt động 1: Hiểu về phát triển phần mềm (SGK Trang 160)' : 'Activity 1: Understanding Software Development (Page 160)'}</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed italic">
          {isVi
            ? '"Nhiều em mong muốn biết lập trình để làm ra các phần mềm ứng dụng. Vậy em có biết việc sản xuất phần mềm gồm các công đoạn nào không?"'
            : '"Many students aspire to learn programming to build applications. Do you know which sequential stages are required to produce modern software?"'}
        </p>
      </div>

      {/* Comparison: Small Code Exercise vs Industrial Software */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              {isVi ? 'Bài tập lập trình học tập' : 'Student Programming Exercise'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
              {isVi ? 'Vài chục dòng lệnh' : 'Tens of lines of code'}
            </span>
          </div>
          <h4 className="font-bold text-sm text-white">
            {isVi ? 'Quy mô cá nhân & Đơn giản' : 'Single Developer & Simple Scope'}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isVi
              ? 'Kết quả của một bài tập lập trình thông thường chỉ dài vài chục câu lệnh, giải quyết một bài toán toán học cụ thể và thường do 1 người duy nhất viết trong vài phút đến vài giờ.'
              : 'Classroom programming exercises typically span tens of lines, solve a singular isolated problem, and are authored individually.'}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-blue-500/40 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase">
              {isVi ? 'Phần mềm ứng dụng công nghiệp' : 'Industrial Application Software'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
              {isVi ? 'Hàng vạn – Triệu dòng lệnh' : 'Tens of thousands – Millions of lines'}
            </span>
          </div>
          <h4 className="font-bold text-sm text-white">
            {isVi ? 'Quy mô lớn & Làm việc nhóm chuyên nghiệp' : 'Large Scale & Cross-Functional Squads'}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {isVi
              ? 'Phần mềm ứng dụng trong thực tế có thể lên tới hàng vạn, hàng triệu dòng lệnh, phục vụ hàng triệu người dùng và bắt buộc phải do một đội ngũ đông đảo gồm nhiều vai trò phối hợp chặt chẽ.'
              : 'Production applications span millions of lines of code, serve millions of users, and require cross-functional squads collaborating across structured stages.'}
          </p>
        </div>
      </div>

      {/* Interactive Feature: 7-Stage SDLC Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <GitBranch className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-blue-400 font-bold">
                {isVi ? 'Mô phỏng Trực quan SDLC' : 'Interactive SDLC Lifecycle Simulator'}
              </span>
              <h3 className="font-bold text-white text-base">
                {isVi ? 'Hành Trình Sản Xuất Phần Mềm Qua 7 Công Đoạn (Hình SGK Trang 160)' : 'The 7-Stage Software Development Journey'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              {isVi ? 'Dự án mẫu:' : 'Case Study:'}
            </span>
            <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
              {isVi ? 'Hệ thống Quản lý Bệnh viện Thông minh' : 'Smart Hospital Management System'}
            </span>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="overflow-x-auto pb-2">
          <div className="flex items-center justify-between min-w-[620px] gap-1">
            {stagesData.map((s, idx) => {
              const isPassed = completedSteps.includes(idx);
              const isCurrent = activeStageStep === idx;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStageStep(idx)}
                  className={`flex-1 p-2 rounded-xl border text-center transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-blue-600 text-white font-bold border-blue-400 shadow-md ring-2 ring-blue-500/30'
                      : isPassed
                      ? 'bg-slate-950 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {isPassed && !isCurrent ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] font-mono font-bold">{s.step}</span>
                    )}
                  </div>
                  <span className="text-[11px] block truncate">{isVi ? s.shortVi : s.titleEn.split('. ')[1] || s.shortVi}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Card */}
        {stagesData[activeStageStep] && (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400">
                  {isVi ? `CÔNG ĐOẠN ${activeStageStep + 1} TRÊN 7` : `STAGE ${activeStageStep + 1} OF 7`}
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {isVi ? stagesData[activeStageStep].titleVi : stagesData[activeStageStep].titleEn}
                </h4>
              </div>

              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                {isVi ? stagesData[activeStageStep].roleVi : stagesData[activeStageStep].roleEn}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <span className="text-slate-400 font-medium block">
                  {isVi ? 'Hoạt động cụ thể trong dự án:' : 'Project Execution Activity:'}
                </span>
                <p className="text-slate-200 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  {isVi ? stagesData[activeStageStep].actionVi : stagesData[activeStageStep].actionEn}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-slate-400 font-medium block">
                  {isVi ? 'Sản phẩm đầu ra (Deliverable):' : 'Stage Deliverable:'}
                </span>
                <p className="text-blue-200 font-medium leading-relaxed bg-blue-950/40 p-3 rounded-xl border border-blue-500/20">
                  {isVi ? stagesData[activeStageStep].outputVi : stagesData[activeStageStep].outputEn}
                </p>
              </div>
            </div>

            {/* Error Cost Exponential Warning */}
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2 text-rose-300">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  <strong>{isVi ? 'Quy luật chi phí sửa lỗi:' : 'Bug Cost Rule:'}</strong> {isVi ? stagesData[activeStageStep].costNote : stagesData[activeStageStep].costNoteEn}
                </span>
              </div>
            </div>

            {/* Stage Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleResetSim}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isVi ? 'Khởi động lại từ đầu' : 'Restart Simulation'}</span>
              </button>

              {activeStageStep < stagesData.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>{isVi ? `Tiến sang công đoạn ${activeStageStep + 2}` : `Next Stage ${activeStageStep + 2}`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isVi ? 'Hoàn thành trọn vẹn chu trình SDLC!' : 'Completed Full SDLC Cycle!'}</span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quản trị dự án phần mềm & Khái niệm Developer (SGK Trang 161) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="border-l-4 border-amber-500 pl-4 py-1">
          <h4 className="font-extrabold text-base text-white mb-1">
            {isVi ? 'Hoạt động Quản trị Dự án Phần mềm (SGK Trang 161):' : 'Software Project Management Governance:'}
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isVi
              ? 'Hoạt động có tính bao trùm lên toàn bộ 7 công việc cơ bản của sản xuất phần mềm là Quản trị dự án phần mềm. Công việc này bao gồm: lập kế hoạch tiến độ, điều phối nhân sự, ngân sách tài chính, công cụ phương tiện, và kiểm soát chất lượng nghiêm ngặt để đảm bảo sản phẩm phần mềm xuất xưởng thành công đúng hạn.'
              : 'Software Project Management encompasses all 7 stages: milestone scheduling, resource & squad orchestration, financial budgeting, tooling, and quality assurance to ensure punctual delivery.'}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-200">
          <p>
            <strong className="text-blue-400">{isVi ? 'Người phát triển phần mềm (Software Developer):' : 'Software Developer:'}</strong> {isVi
              ? 'Tất cả các công việc và hoạt động nêu trên được gọi chung là phát triển phần mềm mà lập trình chỉ là một hoạt động trong đó. Những người tham gia vào các công việc và hoạt động đó đều được gọi là người phát triển phần mềm.'
              : 'All aforementioned activities constitute software development, where coding is but one part. Anyone participating in these multidisciplinary phases is recognized as a Software Developer.'}
          </p>
        </div>
      </div>

      {/* Hộp Ghi nhớ Trang 161 SGK */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 bg-linear-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/50 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
          <Bookmark className="w-4 h-4" />
          <BilingualText
            vi="Hộp Ghi nhớ (SGK Trang 161)"
            en="Key Takeaways (Textbook page 161)"
          />
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          <BilingualText
            vi="“Phát triển phần mềm gồm các công việc: điều tra, khảo sát, phân tích và thiết kế hệ thống; lập trình, kiểm thử, chuyển giao; bảo trì và quản trị dự án.”"
            en='"Software development encompasses: requirement surveying, systems analysis, systems design; programming, testing, deployment; maintenance, and project management."'
          />
        </p>
      </div>

      {/* Câu hỏi củng cố cuối Mục 1 (SGK Trang 161) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <HelpCircle className="w-4 h-4" />
          <BilingualText
            vi="Câu hỏi củng cố Mục 1 (SGK Trang 161)"
            en="Reinforcement Question 1 (Page 161)"
          />
        </div>

        <p className="text-xs sm:text-sm text-slate-200">
          <BilingualText
            vi="Theo em điều nào là đúng nhất trong các điều sau khi nói về phát triển phần mềm?"
            en="Which statement is most accurate when describing software development?"
          />
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { id: 'A', textVi: 'A. Phát triển phần mềm là lập trình.', textEn: 'A. Software development is programming.' },
            { id: 'B', textVi: 'B. Phát triển phần mềm là quá trình gồm nhiều công việc và hoạt động.', textEn: 'B. Software development consists of multiple tasks and activities.' },
            { id: 'C', textVi: 'C. Phát triển phần mềm là quá trình gồm nhiều công việc và hoạt động, có thể lặp đi lặp lại.', textEn: 'C. Software development is a multi-activity process that can iterate cyclically.' },
            { id: 'D', textVi: 'D. Phát triển phần mềm là quản trị dự án phần mềm.', textEn: 'D. Software development is software project management.' }
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setSelectedOption(opt.id);
                setShowExplanation(true);
              }}
              className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                selectedOption === opt.id
                  ? opt.id === 'C'
                    ? 'bg-emerald-500 text-white font-bold border-emerald-500 shadow-md'
                    : 'bg-rose-500 text-white font-bold border-rose-500 shadow-md'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <BilingualText vi={opt.textVi} en={opt.textEn} />
            </button>
          ))}
        </div>

        {showExplanation && selectedOption === 'C' && (
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs sm:text-sm text-slate-200 space-y-2 animate-in fade-in">
            <p className="font-bold text-emerald-400">
              <BilingualText
                vi="Giải thích chuẩn SGK (Đáp án C):"
                en="Textbook Explanation (Option C):"
              />
            </p>
            <div className="text-slate-300 leading-relaxed">
              <BilingualText
                vi="Phát triển phần mềm là một chu trình toàn diện gồm nhiều công việc (7 công đoạn) và có tính chất lặp đi lặp lại (iterative). Khâu bảo trì chính là mở đầu của một vòng phát triển phiên bản mới nhằm bổ sung tính năng và hoàn thiện giao diện."
                en="Software development is a multi-activity lifecycle (7 stages) that is inherently iterative. Maintenance launches subsequent feature upgrade cycles."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
