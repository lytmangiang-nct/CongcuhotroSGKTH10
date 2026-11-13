import React, { useState } from 'react';
import { BookOpen, Server, HardDrive, Cpu, Radio, Sparkles, HelpCircle, Mail, ChevronDown, ChevronUp, Volume2 } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SECTION_3 } from '../data/lessonData';
import { BilingualText } from './BilingualText';
import { DeviceClassifier } from './DeviceClassifier';
import { TeacherPromptsWidget } from './TeacherPromptsWidget';

export const Section3DigitalDevices: React.FC = () => {
  const { bilingualMode, speak, setShowOriginalModal, setOriginalPageTarget } = useBook();
  const [showMailCompare, setShowMailCompare] = useState(true);
  const [showBookSol, setShowBookSol] = useState(true);

  return (
    <section id="muc-3" className="space-y-6 pt-4 scroll-mt-20">
      {/* Section 3 Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-extrabold text-xs">
              {bilingualMode === 'en' ? 'SECTION 3' : 'MỤC 3'}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {bilingualMode === 'en' ? 'Pages 9 – 10 Textbook' : 'Trang 9 – 10 SGK'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">
            {bilingualMode === 'en' ? SECTION_3.titleEn : SECTION_3.titleVi}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setOriginalPageTarget(9);
              setShowOriginalModal(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{bilingualMode === 'en' ? 'Compare Page 9 SGK' : 'Đối chiếu Trang 9 SGK'}</span>
          </button>

          {bilingualMode !== 'vi' && (
            <button
              type="button"
              onClick={() => speak('Section 3: Digital Devices and Superior Capabilities. Digital devices feature extraordinary computational speeds of billions of operations per second, massive storage capacity, instantaneous transmission across global networks, and exceptional precision.', 'en')}
              className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Nghe phát âm tiếng Anh chuẩn (Speech EN)"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>EN</span>
            </button>
          )}
        </div>
      </div>

      {/* Hoạt động 2 & Device Classifier */}
      <DeviceClassifier />

      {/* 3 Pillars of Superiority (Lưu trữ, Xử lí, Truyền thông) */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-600" />
          <span>
            {bilingualMode === 'en'
              ? 'Core Superiorities of Digital Devices'
              : 'Các Ưu điểm Vượt trội của Thiết bị số'}
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Về lưu trữ */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <HardDrive className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 mb-2">
                {bilingualMode === 'en'
                  ? SECTION_3.advantages.storage.titleEn
                  : SECTION_3.advantages.storage.titleVi}
              </h4>
              <BilingualText
                vi={SECTION_3.advantages.storage.contentVi}
                en={SECTION_3.advantages.storage.contentEn}
                viClassName="text-xs text-slate-700 leading-relaxed whitespace-pre-line"
                enClassName="text-xs whitespace-pre-line"
              />
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              {bilingualMode === 'en'
                ? '2 TB hard drive ≈ Entire university library'
                : 'Ổ cứng 2 TB ≈ Toàn bộ thư viện trường đại học'}
            </div>
          </div>

          {/* Về xử lí */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 mb-2">
                {bilingualMode === 'en'
                  ? SECTION_3.advantages.processing.titleEn
                  : SECTION_3.advantages.processing.titleVi}
              </h4>
              <BilingualText
                vi={SECTION_3.advantages.processing.contentVi}
                en={SECTION_3.advantages.processing.contentEn}
                viClassName="text-xs text-slate-700 leading-relaxed whitespace-pre-line"
                enClassName="text-xs whitespace-pre-line"
              />
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              {bilingualMode === 'en'
                ? 'Hundreds of trillions of operations/sec (Supercomputers)'
                : 'Hàng trăm triệu tỉ phép tính/giây (Siêu máy tính)'}
            </div>
          </div>

          {/* Về truyền thông */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                <Radio className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 mb-2">
                {bilingualMode === 'en'
                  ? SECTION_3.advantages.communication.titleEn
                  : SECTION_3.advantages.communication.titleVi}
              </h4>
              <BilingualText
                vi={SECTION_3.advantages.communication.contentVi}
                en={SECTION_3.advantages.communication.contentEn}
                viClassName="text-xs text-slate-700 leading-relaxed whitespace-pre-line"
                enClassName="text-xs whitespace-pre-line"
              />
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              {bilingualMode === 'en'
                ? 'Telex 60 words/min → Fiber optics millions of chars/sec'
                : 'Telex 60 từ/phút → Cáp quang hàng triệu kí tự/giây'}
            </div>
          </div>
        </div>
      </div>

      {/* HỘP GHI NHỚ TRANG 10 (Refined Warm Parchment Box) */}
      <div className="bg-amber-50/70 dark:bg-amber-950/25 rounded-2xl border border-amber-200 dark:border-amber-900/50 p-5 md:p-6 shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{bilingualMode === 'en' ? 'KEY TAKEAWAY (PAGE 10)' : 'HỘP GHI NHỚ (TRANG 10)'}</span>
          </span>
          <span className="text-xs text-amber-900 dark:text-amber-300 font-semibold hidden sm:inline">
            {bilingualMode === 'en' ? '4 Core Advantages of Digital Devices' : '4 Ưu điểm của Thiết bị số'}
          </span>
        </div>

        <div className="space-y-2.5 mt-3">
          {SECTION_3.memorizeBox.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
              <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 mt-2" />
              <div className="flex-1">
                <BilingualText
                  vi={bullet.vi}
                  en={bullet.en}
                  showTts={true}
                  viClassName="font-semibold text-slate-800"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CÂU HỎI CỦNG CỐ TRANG 10 */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
            {bilingualMode === 'en'
              ? 'Section 3 Review Questions (Page 10)'
              : 'Câu hỏi Củng cố Mục 3 (Trang 10 SGK)'}
          </h4>
        </div>

        {/* Question 1: Thư bưu điện vs Thư điện tử email */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <BilingualText
              vi={SECTION_3.reviewQuestions[0].questionVi}
              en={SECTION_3.reviewQuestions[0].questionEn}
              viClassName="font-bold text-xs sm:text-sm text-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowMailCompare(!showMailCompare)}
              className="shrink-0 text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold hover:bg-emerald-100 cursor-pointer"
            >
              {showMailCompare
                ? (bilingualMode === 'en' ? 'Collapse table' : 'Thu gọn bảng')
                : (bilingualMode === 'en' ? 'View comparison table' : 'Xem bảng so sánh')}
            </button>
          </div>

          {showMailCompare && (
            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 animate-in fade-in">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="px-3 py-2">
                      {bilingualMode === 'en' ? 'Comparison Criteria' : 'Tiêu chí so sánh'}
                    </th>
                    <th className="px-3 py-2 text-amber-700 dark:text-amber-400">
                      {bilingualMode === 'en' ? 'Postal Mail (Traditional)' : 'Thư bưu điện (Truyền thống)'}
                    </th>
                    <th className="px-3 py-2 text-emerald-700 dark:text-emerald-400">
                      {bilingualMode === 'en' ? 'Electronic Mail (Email)' : 'Thư điện tử (Email số)'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {SECTION_3.reviewQuestions[0].comparisonTable?.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2.5 font-bold text-slate-800 dark:text-slate-200">
                        {bilingualMode === 'en' ? (row.criteriaEn || row.criteriaVi) : row.criteriaVi}
                      </td>
                      <td className="px-3 py-2.5 text-slate-600 dark:text-slate-400">
                        <div>{bilingualMode === 'en' ? (row.postalEn || row.postalVi) : row.postalVi}</div>
                      </td>
                      <td className="px-3 py-2.5 font-medium text-emerald-800 dark:text-emerald-300">
                        <div>{bilingualMode === 'en' ? (row.emailEn || row.emailVi) : row.emailVi}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Question 2: Số hoá 2 000 cuốn sách */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <BilingualText
              vi={SECTION_3.reviewQuestions[1].questionVi}
              en={SECTION_3.reviewQuestions[1].questionEn}
              viClassName="font-bold text-xs sm:text-sm text-slate-800"
            />
            <button
              type="button"
              onClick={() => setShowBookSol(!showBookSol)}
              className="shrink-0 text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold hover:bg-emerald-100 cursor-pointer"
            >
              {showBookSol
                ? (bilingualMode === 'en' ? 'Collapse solution' : 'Thu gọn lời giải')
                : (bilingualMode === 'en' ? 'View solution steps' : 'Xem các bước giải')}
            </button>
          </div>

          {showBookSol && (
            <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-900 text-xs space-y-1.5 animate-in fade-in">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 block mb-1">
                {bilingualMode === 'en' ? 'Detailed step-by-step solution:' : 'Các bước giải chi tiết:'}
              </span>
              {(bilingualMode === 'en'
                ? SECTION_3.reviewQuestions[1].solutionStepsEn
                : SECTION_3.reviewQuestions[1].solutionStepsVi
              )?.map((step, idx) => (
                <p key={idx} className="text-slate-800 dark:text-slate-200 font-sans">
                  {step}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

    </section>
  );
};
