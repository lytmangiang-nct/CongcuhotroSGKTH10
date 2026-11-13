import React, { useState } from 'react';
import { X, Search, Volume2, Sparkles, BookA, ArrowLeft, ArrowRight, RotateCw, BookOpen, Eye, ExternalLink } from 'lucide-react';
import { useBook } from '../context/BookContext';
import { GLOSSARY, TermDefinition } from '../data/lessonData';
import { SGK_OFFICIAL_GLOSSARY } from '../data/sgkGlossaryData';

export const GlossaryModal: React.FC = () => {
  const { 
    showGlossaryModal, 
    setShowGlossaryModal, 
    selectedTerm, 
    setSelectedTerm, 
    speak, 
    currentLesson, 
    bilingualMode,
    setOriginalPageTarget,
    setShowOriginalModal 
  } = useBook();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewTab, setViewTab] = useState<'sgk_official' | 'list' | 'flashcards'>('sgk_official');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Combine unique terms by id, prioritizing current lesson's terms first
  const allTerms: TermDefinition[] = React.useMemo(() => {
    const list = [...(currentLesson?.glossary || []), ...GLOSSARY];
    const seen = new Set<string>();
    return list.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [currentLesson]);

  const filteredSgkGlossary = React.useMemo(() => {
    if (!searchTerm.trim()) return SGK_OFFICIAL_GLOSSARY;
    const q = searchTerm.toLowerCase().trim();
    return SGK_OFFICIAL_GLOSSARY.filter(
      (item) =>
        item.termVi.toLowerCase().includes(q) ||
        (item.termEn && item.termEn.toLowerCase().includes(q)) ||
        item.definitionVi.toLowerCase().includes(q) ||
        (item.definitionEn && item.definitionEn.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q))
    );
  }, [searchTerm]);

  if (!showGlossaryModal && !selectedTerm) return null;

  const handleJumpToPage = (pageNum: number) => {
    setShowGlossaryModal(false);
    setSelectedTerm(null);
    setOriginalPageTarget(pageNum);
    setShowOriginalModal(true);
  };

  const filteredGlossary = allTerms.filter(
    (item) =>
      item.termEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.termVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definitionVi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definitionEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCard = allTerms[cardIndex % allTerms.length] || allTerms[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % allTerms.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + allTerms.length) % allTerms.length);
  };

  const handleClose = () => {
    setShowGlossaryModal(false);
    setSelectedTerm(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <BookA className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base md:text-lg text-slate-800 dark:text-slate-100">
              {bilingualMode === 'en'
                ? 'Informatics 10 Bilingual ICT Glossary'
                : 'Từ điển Thuật ngữ Tin học 10 Song ngữ (ICT Glossary)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 cursor-pointer"
            title={bilingualMode === 'en' ? 'Close' : 'Đóng'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-4 pt-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setViewTab('sgk_official')}
              className={`pb-2 border-b-2 transition-colors flex items-center gap-1 cursor-pointer ${
                viewTab === 'sgk_official'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Textbook Glossary (p. 166–167)' : 'Bảng Thuật Ngữ SGK (Tr. 166 – 167)'}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewTab('list')}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                viewTab === 'list'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {bilingualMode === 'en'
                ? `Extended ICT Glossary (${allTerms.length})`
                : `Từ điển Mở rộng (${allTerms.length})`}
            </button>
            <button
              type="button"
              onClick={() => setViewTab('flashcards')}
              className={`pb-2 border-b-2 transition-colors flex items-center gap-1 cursor-pointer ${
                viewTab === 'flashcards'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{bilingualMode === 'en' ? 'Review Flashcards' : 'Flashcard Ôn tập'}</span>
            </button>
          </div>

          {(viewTab === 'list' || viewTab === 'sgk_official') && (
            <div className="relative pb-2">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
              <input
                type="text"
                placeholder={bilingualMode === 'en' ? 'Search terms...' : 'Tìm thuật ngữ...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs border border-transparent focus:border-indigo-500 w-44"
              />
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Detailed single term view if selected from text click */}
          {selectedTerm && (
            <div className="mb-4 bg-indigo-50/80 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                    {bilingualMode === 'en' ? 'Selected Term:' : 'Thuật ngữ đang chọn:'}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    {bilingualMode === 'en' ? (
                      <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {selectedTerm.termEn}
                      </h4>
                    ) : (
                      <>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {selectedTerm.termVi}
                        </h4>
                        <span className="text-sm text-slate-500 font-normal">/</span>
                        <h5 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {selectedTerm.termEn}
                        </h5>
                      </>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500">{selectedTerm.ipa}</span>
                </div>

                {bilingualMode !== 'vi' && (
                  <div>
                    <button
                      type="button"
                      onClick={() => speak(selectedTerm.termEn, 'en')}
                      className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 shadow-xs flex items-center gap-1 text-xs font-semibold cursor-pointer transition-colors"
                      title="Nghe phát âm tiếng Anh chuẩn (Speech EN)"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>EN</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="text-xs space-y-1.5 mt-3">
                <p className="text-slate-800 dark:text-slate-200">
                  <strong>{bilingualMode === 'en' ? 'Definition:' : 'Định nghĩa:'}</strong>{' '}
                  {bilingualMode === 'en' ? selectedTerm.definitionEn : selectedTerm.definitionVi}
                </p>
                <div className="bg-white/80 dark:bg-slate-900 p-2.5 rounded-lg border border-indigo-100 dark:border-slate-800 mt-2">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">
                    {bilingualMode === 'en' ? 'Textbook Example:' : 'Ví dụ chuẩn SGK:'}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 mt-0.5">
                    {bilingualMode === 'en' ? selectedTerm.exampleEn : selectedTerm.exampleVi}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 0: SGK Official 29 Terms (Pages 166 - 167) */}
          {viewTab === 'sgk_official' && (
            <div className="space-y-4">
              {/* Top Banner with Quick Scan Buttons */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-200">
                    {bilingualMode === 'en'
                      ? 'Official Textbook Glossary (Pages 166 – 167)'
                      : 'Bảng Giải Thích Thuật Ngữ Chuẩn SGK (Trang 166 – 167)'}
                  </h4>
                  <p className="text-[11px] text-amber-700/80 dark:text-amber-400">
                    {bilingualMode === 'en'
                      ? '29 core Informatics 10 terms sorted in Vietnamese alphabetical order'
                      : 'Gồm 29 thuật ngữ Tin học 10 cốt lõi sắp xếp theo thứ tự bảng chữ cái tiếng Việt'}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleJumpToPage(166)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    <span>Scan {bilingualMode === 'en' ? 'p. 166' : 'Tr. 166'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleJumpToPage(167)}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 text-amber-900 dark:text-amber-200 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    <span>Scan {bilingualMode === 'en' ? 'p. 167' : 'Tr. 167'}</span>
                  </button>
                </div>
              </div>

              {/* 29 Official Terms */}
              <div className="space-y-3">
                {filteredSgkGlossary.map((term) => (
                  <div
                    key={term.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors shadow-2xs space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-800">
                          {term.letter}
                        </span>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                              {bilingualMode === 'en' && term.termEn ? term.termEn : term.termVi}
                            </span>
                            {term.termEn && (
                              <button
                                type="button"
                                onClick={() => term.termEn && speak(term.termEn, 'en')}
                                className="px-1.5 py-0.5 rounded-md bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                                title="Nghe phát âm tiếng Anh chuẩn"
                              >
                                <span>{term.termEn}</span>
                                <Volume2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                              </button>
                            )}
                          </div>
                          {term.category && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              {bilingualMode === 'en' ? `Topic: ${term.category}` : `Chủ đề: ${term.category}`}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Clickable Page Link */}
                      <button
                        type="button"
                        onClick={() => handleJumpToPage(term.page)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 font-mono text-[11px] font-bold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                        title={bilingualMode === 'en' ? `View textbook page ${term.page}` : `Xem bài học tại Trang ${term.page} SGK`}
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{bilingualMode === 'en' ? `p. ${term.page}` : `Tr.${term.page}`}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pl-9">
                      {bilingualMode === 'en' ? (term.definitionEn || term.definitionVi) : term.definitionVi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 1: Full Glossary List */}
          {viewTab === 'list' && (
            <div className="space-y-3">
              {filteredGlossary.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        {bilingualMode === 'en' ? (
                          <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                            {item.termEn}
                          </span>
                        ) : (
                          <>
                            <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                              {item.termVi}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                              {item.termEn}
                            </span>
                          </>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">{item.ipa}</span>
                    </div>

                    {bilingualMode !== 'vi' && (
                      <div>
                        <button
                          type="button"
                          onClick={() => speak(item.termEn, 'en')}
                          className="px-2 py-1 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 border border-transparent hover:border-indigo-200 dark:border-indigo-800 text-xs flex items-center gap-1 font-semibold cursor-pointer transition-colors"
                          title={bilingualMode === 'en' ? 'Listen in English' : 'Nghe phát âm tiếng Anh'}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span className="text-[11px]">EN</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {bilingualMode === 'en' ? (item.definitionEn || item.definitionVi) : item.definitionVi}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Flashcards Mode */}
          {viewTab === 'flashcards' && activeCard && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-xs text-slate-500 mb-3 font-medium">
                {bilingualMode === 'en'
                  ? `Card ${cardIndex + 1} of ${allTerms.length}`
                  : `Thẻ số ${cardIndex + 1} / ${allTerms.length}`}
              </div>

              {/* Flashcard container */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="w-full max-w-md h-64 cursor-pointer perspective-1000 group"
              >
                <div
                  className={`relative w-full h-full rounded-2xl p-6 text-center flex flex-col items-center justify-center transition-all duration-500 border-2 shadow-md ${
                    isFlipped
                      ? 'bg-sky-50 dark:bg-slate-850 border-sky-300 dark:border-sky-800'
                      : 'bg-white dark:bg-slate-850 border-indigo-200 dark:border-indigo-900 hover:border-indigo-400'
                  }`}
                >
                  <div className="absolute top-3 right-3 text-xs text-slate-400 flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{bilingualMode === 'en' ? 'Flip card' : 'Lật thẻ'}</span>
                  </div>

                  {!isFlipped ? (
                    /* Front side */
                    <div className="space-y-3">
                      <span className="text-xs uppercase font-bold tracking-widest text-indigo-600">
                        {activeCard.termEn}
                      </span>
                      <h4 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                        {bilingualMode === 'en' ? activeCard.termEn : activeCard.termVi}
                      </h4>
                      <p className="text-xs font-mono text-slate-500">{activeCard.ipa}</p>
                      {bilingualMode !== 'vi' && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speak(activeCard.termEn, 'en');
                          }}
                          className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold inline-flex items-center gap-1 hover:bg-indigo-100 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>EN</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    /* Back side */
                    <div className="space-y-2 text-left">
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {bilingualMode === 'en' ? 'Definition:' : 'Định nghĩa:'}
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200">
                        {bilingualMode === 'en' ? activeCard.definitionEn : activeCard.definitionVi}
                      </p>
                      <div className="text-[11px] bg-white/70 dark:bg-slate-900 p-2 rounded-lg text-slate-600 dark:text-slate-400 mt-2">
                        <strong>{bilingualMode === 'en' ? 'Example: ' : 'Ví dụ: '}</strong>
                        {bilingualMode === 'en' ? activeCard.exampleEn : activeCard.exampleVi}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-4 mt-5">
                <button
                  type="button"
                  onClick={handlePrevCard}
                  className="p-2 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 cursor-pointer"
                >
                  {isFlipped
                    ? (bilingualMode === 'en' ? 'Front Side' : 'Xem mặt trước')
                    : (bilingualMode === 'en' ? 'Definition' : 'Xem giải nghĩa')}
                </button>
                <button
                  type="button"
                  onClick={handleNextCard}
                  className="p-2 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-600 dark:text-slate-300 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
