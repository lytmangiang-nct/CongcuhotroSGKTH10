import React from 'react';
import { Award, Sparkles, ArrowRight } from 'lucide-react';
import { useBook } from '../context/BookContext';

export const EndOfLessonQuiz: React.FC = () => {
  const { currentLesson, bilingualMode, navigateToQuiz } = useBook();
  const isEn = bilingualMode === 'en';

  return (
    <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border-2 border-indigo-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md">
          <Award className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
            <span>
              {isEn
                ? `Official 10-Question Mastery Assessment & Certificate: Lesson ${currentLesson.lessonNumber}`
                : `Trắc Nghiệm Củng Cố Kiến Thức Cuối Bài ${currentLesson.lessonNumber} (10 Câu)`}
            </span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isEn
              ? 'To take the 10-question textbook quiz and earn your verified Certificate, click the "Quiz" button on the top navigation bar.'
              : 'Để làm bài trắc nghiệm 10 câu chuẩn SGK và nhận Giấy chứng nhận hoàn thành, em hãy bấm nút "Quiz / Trắc nghiệm" trên thanh điều hướng trên cùng.'}
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
  );
};
