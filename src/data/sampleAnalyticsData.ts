import { LESSONS_REGISTRY } from './lessonsRegistry';
import { QuizAttemptRecord } from '../services/learnerStorage';

/**
 * Maps any quiz question (by lessonId, questionId, and optional explanation text)
 * to the most relevant knowledge section index [0 .. totalSections - 1].
 */
export const getQuestionTargetSection = (
  lessonId: number,
  questionId: number,
  explanationText?: string
): number => {
  const lesson = LESSONS_REGISTRY[lessonId];
  if (!lesson || !lesson.sections || lesson.sections.length === 0) {
    return 0;
  }
  const totalSections = lesson.sections.length;
  const maxKnowledgeSection = Math.max(0, totalSections - 2); // exclude Practice/Quiz container unless totalSections <= 2

  const text = (explanationText || '').toLowerCase();

  // Explicit textbook section references ("Mục 1", "Mục 2", "Mục 3", "Section 1", ...)
  const secMatch = text.match(/(?:mục|section|nhiệm vụ|task)\s*([1-4])/i);
  if (secMatch) {
    const num = parseInt(secMatch[1], 10);
    // Usually section 0 = Overview, section 1 = Mục 1, section 2 = Mục 2, etc.
    const mapped = Math.min(totalSections - 1, Math.max(1, num));
    return mapped;
  }

  // Fallback by matching keywords in section titles
  for (let idx = 0; idx < totalSections; idx++) {
    const secTitle = `${lesson.sections[idx].titleVi} ${lesson.sections[idx].titleEn}`.toLowerCase();
    const keywords = secTitle.split(/[\s:,().–-]+/).filter((w) => w.length >= 4);
    if (keywords.some((kw) => text.includes(kw))) {
      return idx;
    }
  }

  // Deterministic distribution across the core knowledge sections (1 .. maxKnowledgeSection)
  const qIdx = lesson.quizQuestions.findIndex((q) => q.id === questionId);
  const safeQIdx = qIdx >= 0 ? qIdx : Math.max(0, questionId - 1);
  if (maxKnowledgeSection >= 1) {
    return 1 + (safeQIdx % maxKnowledgeSection);
  }
  return 0;
};

export interface SampleLessonCompletionStat {
  lessonId: number;
  lessonTitleVi: string;
  lessonTitleEn: string;
  sampleStudentsCompleted: number;
  sampleTotalStudents: number;
  avgQuizScore: number;
}

export interface SampleMissedQuestionStat {
  id: string;
  lessonId: number;
  questionId: number;
  missRatePercent: number;
  missedStudentsCount: number;
  questionVi: string;
  questionEn: string;
  targetSectionIndex: number;
  sectionTitleVi: string;
  sectionTitleEn: string;
}

export interface DemoClassAnalyticsPayload {
  isDemo: true;
  cohortNameVi: string;
  cohortNameEn: string;
  sampleCohortSize: number;
  disclaimerVi: string;
  disclaimerEn: string;
  lessonStats: SampleLessonCompletionStat[];
  topMissedQuestions: SampleMissedQuestionStat[];
}

const SAMPLE_COMPLETION_NUMBERS: Record<number, { done: number; avgScore: number }> = {
  1: { done: 34, avgScore: 8.9 },
  2: { done: 33, avgScore: 8.6 },
  3: { done: 31, avgScore: 8.2 },
  4: { done: 29, avgScore: 7.9 },
  5: { done: 28, avgScore: 7.7 },
  16: { done: 33, avgScore: 9.1 },
  18: { done: 32, avgScore: 8.5 },
  19: { done: 31, avgScore: 8.3 },
  20: { done: 30, avgScore: 8.4 },
  21: { done: 28, avgScore: 7.8 },
  24: { done: 29, avgScore: 8.1 },
  25: { done: 27, avgScore: 7.9 },
  26: { done: 26, avgScore: 7.8 },
  27: { done: 25, avgScore: 7.6 },
  28: { done: 24, avgScore: 7.4 },
  29: { done: 24, avgScore: 7.5 },
  30: { done: 23, avgScore: 7.8 },
  32: { done: 22, avgScore: 8.0 },
  33: { done: 26, avgScore: 8.7 },
  34: { done: 25, avgScore: 8.6 }
};

export const buildDemoClassAnalytics = (): DemoClassAnalyticsPayload => {
  const sampleCohortSize = 36;
  const lessonStats: SampleLessonCompletionStat[] = Object.values(LESSONS_REGISTRY).map((lesson) => {
    const preset = SAMPLE_COMPLETION_NUMBERS[lesson.id];
    const done = preset ? preset.done : Math.max(18, 34 - Math.floor(lesson.id / 2));
    const avgScore = preset ? preset.avgScore : Number((7.6 + ((lesson.id * 7) % 15) / 10).toFixed(1));
    return {
      lessonId: lesson.id,
      lessonTitleVi: lesson.titleVi,
      lessonTitleEn: lesson.titleEn,
      sampleStudentsCompleted: done,
      sampleTotalStudents: sampleCohortSize,
      avgQuizScore: Math.min(9.6, avgScore)
    };
  });

  // Curated top missed questions referencing real quiz questions from LESSONS_REGISTRY
  const curatedMissPairs: { lessonId: number; qIdx: number; missRate: number; count: number }[] = [
    { lessonId: 30, qIdx: 2, missRate: 44, count: 16 },
    { lessonId: 28, qIdx: 3, missRate: 42, count: 15 },
    { lessonId: 29, qIdx: 4, missRate: 39, count: 14 },
    { lessonId: 21, qIdx: 2, missRate: 36, count: 13 },
    { lessonId: 4, qIdx: 3, missRate: 33, count: 12 },
    { lessonId: 25, qIdx: 5, missRate: 31, count: 11 },
    { lessonId: 27, qIdx: 4, missRate: 28, count: 10 },
    { lessonId: 1, qIdx: 4, missRate: 25, count: 9 }
  ];

  const topMissedQuestions: SampleMissedQuestionStat[] = [];
  for (const item of curatedMissPairs) {
    const lesson = LESSONS_REGISTRY[item.lessonId];
    const q = lesson?.quizQuestions?.[item.qIdx] || lesson?.quizQuestions?.[0];
    if (!lesson || !q) continue;
    const secIdx = getQuestionTargetSection(lesson.id, q.id, `${q.explanationVi} ${q.explanationEn || ''}`);
    const sec = lesson.sections[secIdx] || lesson.sections[0];
    topMissedQuestions.push({
      id: `demo-miss-${lesson.id}-${q.id}`,
      lessonId: lesson.id,
      questionId: q.id,
      missRatePercent: item.missRate,
      missedStudentsCount: item.count,
      questionVi: q.questionVi,
      questionEn: q.questionEn || q.questionVi,
      targetSectionIndex: secIdx,
      sectionTitleVi: sec.titleVi,
      sectionTitleEn: sec.titleEn || sec.titleVi
    });
  }

  return {
    isDemo: true,
    cohortNameVi: 'Lớp 10A1 — Bộ dữ liệu minh họa (Mẫu)',
    cohortNameEn: 'Grade 10A1 — Illustrative Sample Dataset (Demo)',
    sampleCohortSize,
    disclaimerVi:
      'Ứng dụng chạy cục bộ trên trình duyệt (chưa có máy chủ xác thực). Việc tự chọn vai trò Giáo viên KHÔNG cấp quyền xem tiến độ hay điểm số thật của người học khác. Số liệu lớp học dưới đây là dữ liệu minh họa (Mẫu).',
    disclaimerEn:
      'This app runs locally without server authentication. Self-selecting the Teacher role does NOT grant access to other real learners’ data. Class metrics below are illustrative Sample/Demo data.',
    lessonStats,
    topMissedQuestions
  };
};

export interface PersonalMissedQuestionItem {
  lessonId: number;
  questionId: number;
  questionVi: string;
  questionEn: string;
  targetSectionIndex: number;
  sectionTitleVi: string;
  sectionTitleEn: string;
}

export const extractPersonalMissedQuestions = (
  quizResultsByLesson: Record<number, QuizAttemptRecord>
): PersonalMissedQuestionItem[] => {
  const result: PersonalMissedQuestionItem[] = [];
  for (const [lessonIdStr, attempt] of Object.entries(quizResultsByLesson || {})) {
    const lessonId = Number(lessonIdStr);
    const lesson = LESSONS_REGISTRY[lessonId];
    if (!lesson || !attempt?.selectedAnswers) continue;

    for (const q of lesson.quizQuestions) {
      const chosen = attempt.selectedAnswers[q.id];
      if (chosen !== undefined && chosen !== q.correctIndex) {
        const secIdx = getQuestionTargetSection(lessonId, q.id, `${q.explanationVi} ${q.explanationEn || ''}`);
        const sec = lesson.sections[secIdx] || lesson.sections[0];
        result.push({
          lessonId,
          questionId: q.id,
          questionVi: q.questionVi,
          questionEn: q.questionEn || q.questionVi,
          targetSectionIndex: secIdx,
          sectionTitleVi: sec.titleVi,
          sectionTitleEn: sec.titleEn || sec.titleVi
        });
      }
    }
  }
  return result;
};
