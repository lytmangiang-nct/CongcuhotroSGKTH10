import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, UserCheck, Thermometer, CloudSun, Stethoscope, Sparkles, AlertCircle } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { SECTION_1 } from '../data/lessonData';
import confetti from 'canvas-confetti';

export const Activity1Interactive: React.FC = () => {
  const { bilingualMode, completeSectionTasks, currentLessonId } = useBook();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  // 39°C context switcher state
  const [context39, setContext39] = useState<'weather' | 'medical'>('weather');

  const handleVote = (student: string) => {
    setSelectedStudent(student);
    setHasVoted(true);
    completeSectionTasks(currentLessonId, 1);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-xs my-6">
      {/* Activity Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
          HĐ1
        </span>
        <div>
          <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100">
            {bilingualMode === 'en'
              ? SECTION_1.partB.activity1.titleEn
              : SECTION_1.partB.activity1.titleVi}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {bilingualMode === 'en' ? 'Page 7 - Grade 10 Informatics' : 'Trang 7 SGK Tin học 10'}
          </p>
        </div>
      </div>

      <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 mb-4 leading-relaxed font-medium">
        {bilingualMode === 'en'
          ? 'There are varying viewpoints regarding the data of an Informatics lesson. Who do you think is right?'
          : 'Có các ý kiến như sau về dữ liệu của một bài giảng môn Tin học. Theo em bạn nào nói đúng?'}
      </p>

      {/* 3 Students Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        {/* An */}
        <button
          type="button"
          onClick={() => handleVote('an')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedStudent === 'an'
              ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-400 shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400">
              {bilingualMode === 'en' ? 'Student An:' : 'Bạn An:'}
            </span>
            {hasVoted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            {bilingualMode === 'en'
              ? '“The handwritten notes in my notebook are data.”'
              : '“Bài ghi trong vở của em là dữ liệu.”'}
          </p>
        </button>

        {/* Minh */}
        <button
          type="button"
          onClick={() => handleVote('minh')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedStudent === 'minh'
              ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-400 shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400">
              {bilingualMode === 'en' ? 'Student Minh:' : 'Bạn Minh:'}
            </span>
            {hasVoted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            {bilingualMode === 'en'
              ? '“The teacher’s lesson plan Word file is data.”'
              : '“Tệp bài soạn bằng Word của cô giáo là dữ liệu.”'}
          </p>
        </button>

        {/* Khoa */}
        <button
          type="button"
          onClick={() => handleVote('khoa')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedStudent === 'khoa'
              ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-400 shadow-xs'
              : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 hover:border-indigo-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400">
              {bilingualMode === 'en' ? 'Student Khoa:' : 'Bạn Khoa:'}
            </span>
            {hasVoted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300">
            {bilingualMode === 'en'
              ? '“Data is the video recording of the teacher’s lesson.”'
              : '“Dữ liệu là tệp video ghi lại tiết giảng của cô giáo.”'}
          </p>
        </button>
      </div>

      {/* Revelation box */}
      {hasVoted && (
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-emerald-300 dark:border-emerald-800/80 rounded-xl p-4 mb-6 animate-in fade-in duration-300">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs md:text-sm">
              <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm mb-1">
                {bilingualMode === 'en'
                  ? 'Official Conclusion: ALL THREE STUDENTS ARE CORRECT!'
                  : 'Kết luận chuẩn SGK: CẢ BA BẠN ĐỀU ĐÚNG!'}
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {bilingualMode === 'en'
                  ? SECTION_1.partB.activity1.explanationEn
                  : SECTION_1.partB.activity1.explanationVi}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Context Switcher: The famous "39°C" SGK Example */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Thermometer className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>
              {bilingualMode === 'en'
                ? 'Information Integrity Demo: The "39°C" Context Experiment'
                : 'Thí nghiệm Trực quan: Tính Toàn Vẹn của Thông tin qua ví dụ "39°C"'}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg text-xs border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setContext39('weather')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1 ${
                context39 === 'weather'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <CloudSun className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Weather Context' : 'Bộ dữ liệu Thời tiết'}</span>
            </button>
            <button
              type="button"
              onClick={() => setContext39('medical')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors flex items-center gap-1 ${
                context39 === 'medical'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Medical Context' : 'Bộ dữ liệu Bệnh án'}</span>
            </button>
          </div>
        </div>

        {/* Display comparison */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-all shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-slate-500">
              {bilingualMode === 'en' ? 'Raw Datum:' : 'Dữ liệu thô (Raw Datum):'} <strong className="text-slate-900 dark:text-white font-bold">"39°C"</strong>
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              {bilingualMode === 'en'
                ? `Context: ${context39 === 'weather' ? 'Outdoor weather forecast' : 'Clinical medical record'}`
                : `Ngữ cảnh: ${context39 === 'weather' ? 'Dự báo thời tiết ngoài trời' : 'Bệnh án khám bệnh'}`}
            </span>
          </div>

          <div className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
            <span className="text-slate-500 font-normal text-xs">
              {bilingualMode === 'en' ? 'Extracted Information:' : 'Thông tin thu được:'}
            </span>
            <span className={context39 === 'weather' ? 'text-amber-700 dark:text-amber-300' : 'text-rose-600'}>
              {context39 === 'weather'
                ? bilingualMode === 'en'
                  ? '“The weather today is scorchingly hot.”'
                  : '“Hôm nay trời rất nóng.”'
                : bilingualMode === 'en'
                ? '“The patient is running a dangerous high fever.”'
                : '“Bệnh nhân bị sốt cao cần hạ sốt ngay.”'}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700">
            <AlertCircle className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
            {bilingualMode === 'en'
              ? 'Key rule: Information has integrity. It is understood properly ONLY when accompanied by full data and context. Incomplete data leads to incorrect or indeterminable information.'
              : 'Quy tắc: Thông tin có tính toàn vẹn, được hiểu đúng khi có đầy đủ dữ liệu. Nếu dữ liệu không đầy đủ (thiếu ngữ cảnh thời tiết hay bệnh án) thì có thể làm thông tin bị sai hoặc không xác định được.'}
          </p>
        </div>
      </div>
    </div>
  );
};
