import React, { useState } from 'react';
import { Target, Sparkles, HelpCircle, CheckCircle2, ChevronRight, Laptop, Smartphone, Eye, Volume2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useBook } from '../../context/BookContext';
import { BilingualText } from '../BilingualText';
import { TeacherPromptsWidget } from '../TeacherPromptsWidget';

export const Section2Overview: React.FC = () => {
  const { bilingualMode, speak, setOriginalPageTarget, setShowOriginalModal } = useBook();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const objectives = [
    {
      vi: 'Nhận biết được một số thiết bị thông minh thông dụng. Nêu được ví dụ cụ thể.',
      en: 'Recognize common smart devices and provide specific real-world examples.'
    },
    {
      vi: 'Biết được vai trò của thiết bị thông minh trong xã hội và cuộc cách mạng công nghiệp lần thứ tư (CMCN 4.0).',
      en: 'Understand the role of smart devices in society and the Fourth Industrial Revolution (Industry 4.0).'
    },
    {
      vi: 'Biết vai trò của tin học đối với xã hội. Nêu được ví dụ minh họa sinh động.',
      en: 'Understand the multifaceted roles of informatics in modern society with concrete examples.'
    },
    {
      vi: 'Biết các thành tựu nổi bật của ngành Tin học (Hệ điều hành, Internet, Ngôn ngữ bậc cao, CSDL).',
      en: 'Identify pivotal historical milestones in computing (Operating systems, Internet, High-level languages, DBMS).'
    }
  ];

  const handleTestWarmup = (choice: 'yes' | 'no') => {
    setSelectedAnswer(choice);
    setShowExplanation(true);
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header Banner */}
      <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-200">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {bilingualMode === 'en'
                  ? 'Topic 1: Computers and the Knowledge Society'
                  : 'Chủ đề 1: Máy tính và xã hội tri thức'}
              </span>
            </span>
            <span className="bg-amber-400/30 px-2.5 py-1 rounded-full border border-amber-300/40 font-mono">
              {bilingualMode === 'en' ? 'Pages 11 – 15 SGK' : 'Trang 11 – 15 SGK'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {bilingualMode === 'en'
              ? 'LESSON 2: THE ROLE OF SMART DEVICES AND INFORMATICS IN SOCIETY'
              : 'BÀI 2: VAI TRÒ CỦA THIẾT BỊ THÔNG MINH VÀ TIN HỌC ĐỐI VỚI XÃ HỘI'}
          </h1>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setOriginalPageTarget(11);
                setShowOriginalModal(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>{bilingualMode === 'en' ? 'View Original SGK Scan (Page 11)' : 'Xem trang scan SGK gốc (Trang 11)'}</span>
            </button>
            {bilingualMode !== 'vi' && (
              <button
                type="button"
                onClick={() => speak('Lesson 2: The Role of Smart Devices and Informatics in Society. In this lesson you will learn about common smart devices, their impact on Industry 4.0, and historical computing milestones.', 'en')}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                title="Listen in English"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>EN</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Core Objectives */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide">
              {bilingualMode === 'en' ? 'LEARNING OBJECTIVES' : 'SAU BÀI NÀY EM SẼ (MỤC TIÊU BÀI HỌC)'}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {bilingualMode === 'en'
                ? 'Standard outcomes according to the 2018 General Education Informatics Curriculum'
                : 'Chuẩn đầu ra theo Chương trình GDPT 2018 môn Tin học'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {objectives.map((obj, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/80 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div className="flex-1">
                <BilingualText
                  vi={obj.vi}
                  en={obj.en}
                  viClassName="text-xs sm:text-sm font-semibold text-slate-800 leading-snug"
                  enClassName="text-[11px] text-slate-600"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warm-up Section */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-sky-50/80 border border-indigo-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-indigo-950">
              {bilingualMode === 'en' ? 'WARM-UP • PAGE 11 TEXTBOOK' : 'KHỞI ĐỘNG • TRANG 11 SGK'}
            </h3>
            <p className="text-xs text-indigo-800 font-medium">
              {bilingualMode === 'en'
                ? 'Exploring the concept of "Smart" in modern technology'
                : 'Khám phá khái niệm "Smart" trong đời sống công nghệ'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-indigo-100 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3">
          <BilingualText
            vi="Chúng ta từng được nghe rất nhiều thứ gắn với từ 'smart' như: smart TV, smart phone, smart watch,... Đó là tên gọi của các thiết bị thông minh."
            en="We have heard a great deal about things associated with the word 'smart', such as: smart TV, smartphone, smartwatch,... These are common names for smart devices."
            viClassName="text-slate-800 leading-relaxed"
          />

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 font-bold text-amber-950">
            <BilingualText
              vi="❓ Câu hỏi thảo luận SGK: Máy tính xách tay (Laptop) có phải là thiết bị thông minh không?"
              en="❓ Textbook Discussion Question: Is a laptop computer considered a smart device?"
              viClassName="font-bold text-amber-950"
              enClassName="text-xs italic text-amber-900"
            />
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => handleTestWarmup('yes')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                selectedAnswer === 'yes'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-emerald-50 text-slate-800 dark:text-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {bilingualMode === 'en'
                  ? 'Yes, a laptop is a smart device!'
                  : 'Có, máy tính xách tay là thiết bị thông minh!'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleTestWarmup('no')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                selectedAnswer === 'no'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-rose-50 text-slate-800 dark:text-slate-200'
              }`}
            >
              <span>{bilingualMode === 'en' ? 'No, it is not' : 'Không phải'}</span>
            </button>
          </div>

          {showExplanation && selectedAnswer === 'yes' && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 text-xs sm:text-sm animate-in fade-in space-y-2">
              <div className="font-extrabold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {bilingualMode === 'en'
                    ? 'Textbook Standard Explanation:'
                    : 'Giải thích chuẩn mực SGK Tin học 10:'}
                </span>
              </div>
              <BilingualText
                vi="Máy tính xách tay (Laptop) là một thiết bị thông minh điển hình vì:"
                en="A laptop computer is an exemplary smart device because:"
                viClassName="font-bold text-emerald-900 dark:text-emerald-200"
              />
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>
                  <BilingualText
                    inline
                    vi="Là một hệ thống xử lí thông tin hoàn chỉnh, có thể hoạt động tự chủ theo các phần mềm và hệ điều hành cài đặt sẵn."
                    en="It is a complete information processing system operating autonomously under installed operating systems and software."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Có khả năng kết nối mạng không dây (Wi-Fi, Bluetooth) và tương tác, trao đổi dữ liệu tự động với các thiết bị khác."
                    en="It features wireless connectivity (Wi-Fi, Bluetooth) and autonomously exchanges data with other devices across networks."
                  />
                </li>
                <li>
                  <BilingualText
                    inline
                    vi="Hỗ trợ xử lý thông tin đa dạng, tính toán phức tạp và tham gia vào hệ sinh thái IoT & CMCN 4.0."
                    en="It powers multifaceted data processing and complex computations, forming an integral part of the IoT and Industry 4.0 ecosystem."
                  />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
