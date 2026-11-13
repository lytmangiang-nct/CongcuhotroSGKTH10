import { LESSONS_REGISTRY } from './lessonsRegistry';
import { SGK_OFFICIAL_GLOSSARY } from './sgkGlossaryData';
import { TermDefinition } from './lessonData';

export interface LessonVocabCard {
  id: string;
  lessonId: number;
  termVi: string;
  termEn: string;
  ipa: string;
  definitionVi: string;
  definitionEn: string;
  exampleVi: string;
  exampleEn: string;
  sgkContext?: string;
}

const buildFallbackExampleVi = (term: TermDefinition, lessonId: number, lessonTitleVi: string): string => {
  if (term.exampleVi && term.exampleVi.trim().length > 0) return term.exampleVi.trim();
  if (lessonId >= 16 && lessonId <= 32) {
    return `Ví dụ minh hoạ trong Python (Bài ${lessonId}): Áp dụng khái niệm "${term.termVi}" khi viết chương trình giải bài toán ${lessonTitleVi.toLowerCase()}.`;
  }
  return `Ví dụ thực tế (Bài ${lessonId}): Vận dụng "${term.termVi}" trong hoạt động thực hành ${lessonTitleVi}.`;
};

const buildFallbackExampleEn = (term: TermDefinition, lessonId: number, lessonTitleEn: string): string => {
  if (term.exampleEn && term.exampleEn.trim().length > 0) return term.exampleEn.trim();
  if (lessonId >= 16 && lessonId <= 32) {
    return `Python example (Lesson ${lessonId}): Apply "${term.termEn}" directly when implementing solutions in ${lessonTitleEn}.`;
  }
  return `Applied Informatics example (Lesson ${lessonId}): Observe "${term.termEn}" during ${lessonTitleEn} practice tasks.`;
};

/**
 * Returns rich bilingual vocabulary flashcards for any lesson (1..34).
 * Pulls directly from LESSONS_REGISTRY[lessonId].glossary (including Lesson 34's hidden-on-page LESSON_34_TERMS)
 * and augments with relevant entries from SGK_OFFICIAL_GLOSSARY if needed.
 */
export const getLessonVocabulary = (lessonId: number): LessonVocabCard[] => {
  const lesson = LESSONS_REGISTRY[lessonId] || LESSONS_REGISTRY[1];
  const rawTerms = lesson.glossary || [];

  const cards: LessonVocabCard[] = [];
  const seenIds = new Set<string>();

  for (const item of rawTerms) {
    const scopedId = `L${lesson.id}:${item.id}`;
    if (seenIds.has(scopedId)) continue;
    seenIds.add(scopedId);

    cards.push({
      id: scopedId,
      lessonId: lesson.id,
      termVi: item.termVi,
      termEn: item.termEn,
      ipa: item.ipa || '',
      definitionVi: item.definitionVi,
      definitionEn: item.definitionEn,
      exampleVi: buildFallbackExampleVi(item, lesson.id, lesson.titleVi),
      exampleEn: buildFallbackExampleEn(item, lesson.id, lesson.titleEn),
      sgkContext: item.sgkContext || lesson.pageRange
    });
  }

  // Augment with matching SGK Official Glossary entries if a lesson has fewer than 3 terms
  if (cards.length < 3) {
    const titleTokens = `${lesson.titleVi} ${lesson.titleEn}`.toLowerCase().split(/\s+/).filter((t) => t.length >= 4);
    for (const sgk of SGK_OFFICIAL_GLOSSARY) {
      if (cards.length >= 4) break;
      const haystack = `${sgk.termVi} ${sgk.termEn || ''} ${sgk.definitionVi} ${sgk.category || ''}`.toLowerCase();
      const matches = titleTokens.some((tok) => haystack.includes(tok));
      const scopedId = `L${lesson.id}:sgk-${sgk.id}`;
      if (matches && !seenIds.has(scopedId)) {
        seenIds.add(scopedId);
        cards.push({
          id: scopedId,
          lessonId: lesson.id,
          termVi: sgk.termVi,
          termEn: sgk.termEn || sgk.termVi,
          ipa: '',
          definitionVi: sgk.definitionVi,
          definitionEn: sgk.definitionEn || sgk.definitionVi,
          exampleVi: `Thuật ngữ chuẩn SGK Tin học 10 (Trang ${sgk.page}) gắn với nội dung Bài ${lesson.lessonNumber}.`,
          exampleEn: `Standard Informatics 10 textbook term (Page ${sgk.page}) used in Lesson ${lesson.lessonNumber}.`,
          sgkContext: `SGK Trang ${sgk.page}`
        });
      }
    }
  }

  return cards;
};

/**
 * Look up any saved difficult vocabulary ID across all 34 lessons.
 */
export const getAllVocabCardsByIds = (termIds: string[]): LessonVocabCard[] => {
  if (!termIds || termIds.length === 0) return [];
  const targetSet = new Set(termIds);
  const found: LessonVocabCard[] = [];

  for (const lesson of Object.values(LESSONS_REGISTRY)) {
    const lessonCards = getLessonVocabulary(lesson.id);
    for (const c of lessonCards) {
      if (targetSet.has(c.id)) {
        found.push(c);
      }
    }
  }
  return found;
};
