import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Eye,
  EyeOff,
  Presentation,
  Lightbulb,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import {
  getCategorizedGuidingPrompts,
  GuidingPromptCategory,
  CategorizedGuidingPrompt
} from '../data/guidingQuestionsHelper';

export const GuidingPromptsModal: React.FC = () => {
  const {
    showGuidingPromptsModal,
    setShowGuidingPromptsModal,
    currentLesson,
    currentPage,
    bilingualMode,
    setProjectedPrompt,
    setIsPresentationMode,
    setCurrentPage
  } = useBook();

  const [categoryFilter, setCategoryFilter] = useState<'all' | GuidingPromptCategory>('all');
  const [previewedIds, setPreviewedIds] = useState<Record<string, boolean>>({});

  if (!showGuidingPromptsModal) {
    return null;
  }

  const isEn = bilingualMode === 'en';
  const prompts = getCategorizedGuidingPrompts(currentLesson.id, currentPage);
  const filtered =
    categoryFilter === 'all' ? prompts : prompts.filter((p) => p.category === categoryFilter);

  const togglePreview = (id: string) => {
    setPreviewedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleProjectToScreen = (prompt: CategorizedGuidingPrompt) => {
    setCurrentPage(prompt.sectionIndex);
    setProjectedPrompt(prompt);
    setIsPresentationMode(true);
    setShowGuidingPromptsModal(false);
  };

  const categoryColor = (cat: GuidingPromptCategory) => {
    switch (cat) {
      case 'warmup':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'prediction':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800';
      case 'application':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                {isEn
                  ? `Bilingual Guiding Questions • Lesson ${currentLesson.lessonNumber}`
                  : `Câu hỏi dẫn dắt song ngữ • Bài ${currentLesson.lessonNumber}`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isEn
                  ? 'Warm-up, pre-simulation predictions & post-lesson application with private hint preview'
                  : 'Gồm Khởi động, Dự đoán trước mô phỏng & Vận dụng sau khi học — xem trước gợi ý trước khi chiếu'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowGuidingPromptsModal(false)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700 cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="px-4 sm:px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900">
          {(
            [
              { key: 'all', vi: 'Tất cả (3 giai đoạn)', en: 'All Stages' },
              { key: 'warmup', vi: '1. Khởi động', en: '1. Warm-up' },
              { key: 'prediction', vi: '2. Dự đoán trước mô phỏng', en: '2. Pre-Simulation Prediction' },
              { key: 'application', vi: '3. Vận dụng sau khi học', en: '3. Post-Lesson Application' }
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setCategoryFilter(tab.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                categoryFilter === tab.key
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isEn ? tab.en : tab.vi}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/70 dark:bg-slate-950/60">
          {filtered.map((item) => {
            const isPreviewOpen = Boolean(previewedIds[item.id]);
            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border ${categoryColor(
                      item.category
                    )}`}
                  >
                    {isEn ? item.categoryLabelEn : item.categoryLabelVi}
                  </span>

                  <span className="text-[11px] font-mono text-slate-400">
                    {isEn ? `Target: Section ${item.sectionIndex + 1}` : `Gắn với Mục ${item.sectionIndex + 1}`}
                  </span>
                </div>

                {/* Bilingual Question Display */}
                <div className="space-y-1.5">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    🇻🇳 {item.questionVi}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-300 leading-snug">
                    🇬🇧 {item.questionEn}
                  </p>
                </div>

                {/* Actions: Private Hint Preview & Project to Presentation Mode */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => togglePreview(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {isPreviewOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>
                      {isPreviewOpen
                        ? isEn
                          ? 'Hide Teacher Preview'
                          : 'Ẩn xem trước gợi ý'
                        : isEn
                        ? 'Preview Hint & Answer'
                        : 'Xem trước gợi ý & đáp án'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleProjectToScreen(item)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Project Question Only' : 'Đưa lên trình chiếu'}</span>
                  </button>
                </div>

                {/* Teacher Private Preview Box */}
                {isPreviewOpen && (
                  <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-amber-900 dark:text-amber-200">
                      <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">
                          {isEn ? 'Pedagogical Hint (VI / EN):' : 'Gợi ý dẫn dắt cho giáo viên:'}
                        </span>
                        <p className="mt-0.5">{item.hintVi}</p>
                        <p className="mt-0.5 opacity-85 italic">{item.hintEn}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-emerald-900 dark:text-emerald-200 pt-2 border-t border-amber-200/70 dark:border-amber-800/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">
                          {isEn ? 'Suggested Answer (VI / EN):' : 'Gợi ý trả lời chuẩn kiến thức:'}
                        </span>
                        <p className="mt-0.5">{item.answerVi}</p>
                        <p className="mt-0.5 opacity-85 italic">{item.answerEn}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
