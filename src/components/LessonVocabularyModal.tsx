import React, { useMemo, useState } from 'react';
import {
  X,
  BookOpen,
  Volume2,
  Bookmark,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import { getLessonVocabulary, getAllVocabCardsByIds, LessonVocabCard } from '../data/lessonVocabSupport';

export const LessonVocabularyModal: React.FC = () => {
  const {
    showVocabModal,
    setShowVocabModal,
    currentLesson,
    bilingualMode,
    speak,
    difficultVocabIds,
    toggleDifficultVocab,
    isDifficultVocab,
    activeProfile
  } = useBook();

  const [tab, setTab] = useState<'lesson' | 'difficult'>('lesson');
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const lessonCards = useMemo(() => getLessonVocabulary(currentLesson.id), [currentLesson.id]);
  const difficultCards = useMemo(
    () => getAllVocabCardsByIds(difficultVocabIds),
    [difficultVocabIds]
  );

  if (!showVocabModal) {
    return null;
  }

  const isEn = bilingualMode === 'en';
  const activeList: LessonVocabCard[] = tab === 'lesson' ? lessonCards : difficultCards;
  const safeIdx = activeList.length > 0 ? cardIndex % activeList.length : 0;
  const activeCard = activeList[safeIdx] || null;

  const handleTabSwitch = (nextTab: 'lesson' | 'difficult') => {
    setTab(nextTab);
    setCardIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                {isEn
                  ? `Lesson ${currentLesson.lessonNumber} Vocabulary Flashcards`
                  : `Thẻ Từ Vựng Theo Bài • Bài ${currentLesson.lessonNumber}`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn
                  ? `Informatics examples, pronunciation audio & profile-saved hard words (${activeProfile?.fullName || ''})`
                  : `Thuật ngữ kèm ví dụ Tin học, phát âm & lưu từ khó theo hồ sơ (${activeProfile?.fullName || ''})`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowVocabModal(false)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-4 sm:px-5 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 bg-white dark:bg-slate-900">
          <div className="flex gap-3 text-xs font-bold">
            <button
              type="button"
              onClick={() => handleTabSwitch('lesson')}
              className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
                tab === 'lesson'
                  ? 'border-teal-600 text-teal-700 dark:text-teal-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              {isEn
                ? `Lesson ${currentLesson.lessonNumber} Terms (${lessonCards.length})`
                : `Từ vựng Bài ${currentLesson.lessonNumber} (${lessonCards.length})`}
            </button>

            <button
              type="button"
              onClick={() => handleTabSwitch('difficult')}
              className={`pb-2.5 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
                tab === 'difficult'
                  ? 'border-amber-500 text-amber-700 dark:text-amber-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>
                {isEn
                  ? `Saved Difficult Words (${difficultCards.length})`
                  : `Từ khó đã lưu (${difficultCards.length})`}
              </span>
            </button>
          </div>

          {activeList.length > 0 && (
            <span className="text-[11px] font-mono text-slate-400 pb-2">
              {safeIdx + 1} / {activeList.length}
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/70 dark:bg-slate-950/60">
          {!activeCard ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {tab === 'difficult'
                  ? isEn
                    ? 'No difficult words saved yet for this profile'
                    : 'Chưa có từ khó nào được lưu trong hồ sơ này'
                  : isEn
                  ? 'No terms registered for this lesson'
                  : 'Chưa có thuật ngữ trong bài này'}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Click "Save Difficult Word" on any vocabulary card to review it here later.'
                  : 'Bấm "Lưu từ khó" trên thẻ từ vựng bất kỳ để tổng hợp và ôn tập tại đây.'}
              </p>
            </div>
          ) : (
            <>
              {/* Interactive Flashcard */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="rounded-2xl bg-white dark:bg-slate-900 border-2 border-teal-500/40 shadow-lg p-5 sm:p-7 cursor-pointer transition-all hover:border-teal-500 space-y-4 select-none"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                    {isEn ? `Lesson ${activeCard.lessonId}` : `Bài ${activeCard.lessonId}`} ·{' '}
                    {activeCard.sgkContext || 'Tin học 10 KNTT'}
                  </span>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => speak(activeCard.termEn, 'en')}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1 border border-indigo-200 dark:border-indigo-800 cursor-pointer"
                      title={isEn ? 'Pronounce in English' : 'Phát âm tiếng Anh'}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>EN</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => speak(activeCard.termVi, 'vi')}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 border border-slate-200 dark:border-slate-700 cursor-pointer"
                      title={isEn ? 'Pronounce in Vietnamese' : 'Đọc tiếng Việt'}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>VI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleDifficultVocab(activeCard.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border transition-colors cursor-pointer ${
                        isDifficultVocab(activeCard.id)
                          ? 'bg-amber-500 border-amber-600 text-slate-950'
                          : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500'
                      }`}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          isDifficultVocab(activeCard.id) ? 'fill-slate-950' : ''
                        }`}
                      />
                      <span>
                        {isDifficultVocab(activeCard.id)
                          ? isEn
                            ? 'Saved Hard Word'
                            : 'Đã lưu từ khó'
                          : isEn
                          ? 'Save Hard Word'
                          : 'Lưu từ khó'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Front vs Back */}
                {!isFlipped ? (
                  <div className="py-4 text-center space-y-2">
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {isEn ? activeCard.termEn : activeCard.termVi}
                    </h4>
                    <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      {isEn ? activeCard.termVi : activeCard.termEn}
                    </div>
                    {activeCard.ipa && (
                      <div className="text-xs font-mono text-slate-400">{activeCard.ipa}</div>
                    )}
                    <div className="pt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Click card to see definition & Informatics example' : 'Bấm vào thẻ để lật xem nghĩa & ví dụ Tin học'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {isEn ? 'Definition (EN / VI)' : 'Giải thích chuẩn SGK (VI / EN)'}
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                        {isEn ? activeCard.definitionEn : activeCard.definitionVi}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {isEn ? activeCard.definitionVi : activeCard.definitionEn}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                        {isEn ? 'Informatics Example' : 'Ví dụ Tin học minh hoạ'}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-teal-950 dark:text-teal-100 leading-relaxed">
                        {isEn ? activeCard.exampleEn : activeCard.exampleVi}
                      </p>
                      <p className="text-xs text-teal-700/80 dark:text-teal-300/80 italic">
                        {isEn ? activeCard.exampleVi : activeCard.exampleEn}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Navigation */}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
                  }}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{isEn ? 'Previous Card' : 'Thẻ trước'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Flip Card' : 'Lật thẻ'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsFlipped(false);
                    setCardIndex((prev) => (prev + 1) % activeList.length);
                  }}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isEn ? 'Next Card' : 'Thẻ tiếp'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick List Selector */}
              <div className="space-y-1.5 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {isEn ? 'Quick Jump in Set:' : 'Danh sách thẻ:'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeList.map((card, idx) => (
                    <div
                      key={card.id}
                      onClick={() => {
                        setCardIndex(idx);
                        setIsFlipped(true);
                      }}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                        idx === safeIdx
                          ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-500 font-bold text-teal-900 dark:text-teal-200'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-400 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="truncate">
                        {isEn ? card.termEn : card.termVi}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDifficultVocab(card.id);
                        }}
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer"
                        title={isEn ? 'Toggle difficult word' : 'Đánh dấu / bỏ từ khó'}
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isDifficultVocab(card.id)
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-400'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
