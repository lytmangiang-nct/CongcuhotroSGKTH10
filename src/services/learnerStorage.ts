export type LearnerRole = 'student' | 'teacher';
export type BookAppView = 'cover' | 'toc' | 'reader';

export interface LearnerProfile {
  learnerId: string;
  role: LearnerRole;
  fullName: string;
  createdAt: string;
  locked: true;
}

export interface QuizQuestionGradable {
  id: number;
  correctIndex: number;
}

export interface QuizAttemptRecord {
  learnerId: string;
  lessonId: number;
  score: number;
  totalQuestions: number;
  passed: boolean;
  selectedAnswers: Record<number, number>;
  submittedAt: string;
}

export interface CertificateRecord {
  learnerId: string;
  studentName: string;
  role: LearnerRole;
  lessonId: number;
  lessonCode: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
  issuedAt: string;
  certId: string;
  isPracticeOnly: true;
}

export interface LearnerProgressState {
  learnerId: string;
  lastView: BookAppView;
  currentLessonId: number;
  currentPage: number;
  completedSectionsByLesson: Record<number, number[]>;
  sectionTasksMap: Record<string, boolean>;
  quizResultsByLesson: Record<number, QuizAttemptRecord>;
  certificatesByLesson: Record<number, CertificateRecord>;
  difficultVocabIds: string[];
  updatedAt: string;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  key?: (index: number) => string | null;
  length?: number;
}

export const ACTIVE_LEARNER_STORAGE_KEY = 'sgk_active_learner_id';
export const PROFILES_REGISTRY_STORAGE_KEY = 'sgk_learner_profiles_v1';
export const LEARNER_STATE_PREFIX = 'sgk_learner_state_v1_';
export const CERTIFICATE_ARCHIVE_STORAGE_KEY = 'sgk_issued_certificates_archive_v1';

const getDefaultStorage = (): StorageLike | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    return null;
  }
  return null;
};

export const normalizeFullName = (rawName: string): string => {
  return rawName.normalize('NFC').trim().replace(/\s+/g, ' ');
};

export type NameValidationError = 'empty' | 'too_short' | 'invalid_chars';

export const validateFullName = (
  rawName: string
): { valid: boolean; normalized: string; error?: NameValidationError } => {
  const normalized = normalizeFullName(rawName);
  if (!normalized) {
    return { valid: false, normalized: '', error: 'empty' };
  }
  if (normalized.length < 2) {
    return { valid: false, normalized, error: 'too_short' };
  }
  const hasLetter = /\p{L}/u.test(normalized);
  const onlyValidNameChars = /^[\p{L}\s.'-]+$/u.test(normalized);
  if (!hasLetter || !onlyValidNameChars) {
    return { valid: false, normalized, error: 'invalid_chars' };
  }
  return { valid: true, normalized };
};

export const generateLearnerId = (role: LearnerRole): string => {
  const prefix = role === 'teacher' ? 'GV' : 'HS';
  const timePart = Date.now().toString(36).toUpperCase().slice(-5);
  let randPart = '';
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      randPart = crypto.randomUUID().replace(/-/g, '').toUpperCase().slice(0, 6);
    }
  } catch {
    // Fallback below
  }
  if (!randPart) {
    randPart = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6).padEnd(6, '0');
  }
  return `${prefix}-${timePart}-${randPart}`;
};

export const createEmptyLearnerProgress = (learnerId: string): LearnerProgressState => ({
  learnerId,
  lastView: 'cover',
  currentLessonId: 1,
  currentPage: 0,
  completedSectionsByLesson: {},
  sectionTasksMap: {},
  quizResultsByLesson: {},
  certificatesByLesson: {},
  difficultVocabIds: [],
  updatedAt: new Date().toISOString()
});

export const loadProfilesRegistry = (storage?: StorageLike): Record<string, LearnerProfile> => {
  const store = storage ?? getDefaultStorage();
  if (!store) return {};
  try {
    const raw = store.getItem(PROFILES_REGISTRY_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

export const loadActiveLearnerProfile = (storage?: StorageLike): LearnerProfile | null => {
  const store = storage ?? getDefaultStorage();
  if (!store) return null;
  try {
    const activeId = store.getItem(ACTIVE_LEARNER_STORAGE_KEY);
    if (!activeId) return null;
    const registry = loadProfilesRegistry(store);
    const profile = registry[activeId];
    if (!profile || !profile.learnerId || !profile.fullName || !profile.role) {
      return null;
    }
    return {
      ...profile,
      fullName: normalizeFullName(profile.fullName),
      locked: true
    };
  } catch {
    return null;
  }
};

export const loadLearnerProgress = (
  learnerId: string,
  storage?: StorageLike
): LearnerProgressState => {
  const store = storage ?? getDefaultStorage();
  if (!store || !learnerId) {
    return createEmptyLearnerProgress(learnerId);
  }
  try {
    const raw = store.getItem(`${LEARNER_STATE_PREFIX}${learnerId}`);
    if (!raw) return createEmptyLearnerProgress(learnerId);
    const parsed = JSON.parse(raw) as Partial<LearnerProgressState>;
    if (!parsed || parsed.learnerId !== learnerId) {
      return createEmptyLearnerProgress(learnerId);
    }
    const validView: BookAppView =
      parsed.lastView === 'reader' || parsed.lastView === 'toc' || parsed.lastView === 'cover'
        ? parsed.lastView
        : 'cover';
    return {
      learnerId,
      lastView: validView,
      currentLessonId:
        typeof parsed.currentLessonId === 'number' && parsed.currentLessonId >= 1
          ? parsed.currentLessonId
          : 1,
      currentPage:
        typeof parsed.currentPage === 'number' && parsed.currentPage >= 0
          ? parsed.currentPage
          : 0,
      completedSectionsByLesson:
        parsed.completedSectionsByLesson && typeof parsed.completedSectionsByLesson === 'object'
          ? parsed.completedSectionsByLesson
          : {},
      sectionTasksMap:
        parsed.sectionTasksMap && typeof parsed.sectionTasksMap === 'object'
          ? parsed.sectionTasksMap
          : {},
      quizResultsByLesson:
        parsed.quizResultsByLesson && typeof parsed.quizResultsByLesson === 'object'
          ? parsed.quizResultsByLesson
          : {},
      certificatesByLesson:
        parsed.certificatesByLesson && typeof parsed.certificatesByLesson === 'object'
          ? parsed.certificatesByLesson
          : {},
      difficultVocabIds: Array.isArray(parsed.difficultVocabIds)
        ? parsed.difficultVocabIds.filter((id): id is string => typeof id === 'string')
        : [],
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString()
    };
  } catch {
    return createEmptyLearnerProgress(learnerId);
  }
};

export const saveLearnerProgress = (
  state: LearnerProgressState,
  storage?: StorageLike
): LearnerProgressState => {
  const store = storage ?? getDefaultStorage();
  const nextState: LearnerProgressState = {
    ...state,
    updatedAt: new Date().toISOString()
  };
  if (store && nextState.learnerId) {
    try {
      store.setItem(`${LEARNER_STATE_PREFIX}${nextState.learnerId}`, JSON.stringify(nextState));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }
  return nextState;
};

export const createLearnerProfile = (
  role: LearnerRole,
  rawName: string,
  storage?: StorageLike
): { profile: LearnerProfile; progress: LearnerProgressState } => {
  const validation = validateFullName(rawName);
  if (!validation.valid) {
    throw new Error(`Invalid full name: ${validation.error || 'unknown'}`);
  }
  const store = storage ?? getDefaultStorage();
  const learnerId = generateLearnerId(role);
  const profile: LearnerProfile = {
    learnerId,
    role,
    fullName: validation.normalized,
    createdAt: new Date().toISOString(),
    locked: true
  };
  // Always start a brand-new profile from 0 without inheriting legacy or prior profile progress
  const progress = createEmptyLearnerProgress(learnerId);

  if (store) {
    const registry = loadProfilesRegistry(store);
    registry[learnerId] = profile;
    store.setItem(PROFILES_REGISTRY_STORAGE_KEY, JSON.stringify(registry));
    store.setItem(ACTIVE_LEARNER_STORAGE_KEY, learnerId);
    store.setItem(`${LEARNER_STATE_PREFIX}${learnerId}`, JSON.stringify(progress));
  }

  return { profile, progress };
};

export const hasLegacyUnscopedProgress = (storage?: StorageLike): boolean => {
  const store = storage ?? getDefaultStorage();
  if (!store) return false;
  try {
    if (
      store.getItem('sgk_completed_sections') ||
      store.getItem('sgk_certificate_lesson1') ||
      store.getItem('sgk_section_tasks_done')
    ) {
      return true;
    }
    if (typeof store.length === 'number' && typeof store.key === 'function') {
      for (let i = 0; i < store.length; i++) {
        const k = store.key(i);
        if (
          k &&
          (k.startsWith('sgk_completed_sections_lesson_') || k.startsWith('sgk_certificate_lesson_'))
        ) {
          return true;
        }
      }
    }
  } catch {
    return false;
  }
  return false;
};

export const loadCertificateArchive = (storage?: StorageLike): CertificateRecord[] => {
  const store = storage ?? getDefaultStorage();
  if (!store) return [];
  try {
    const raw = store.getItem(CERTIFICATE_ARCHIVE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const upsertCertificateArchive = (cert: CertificateRecord, storage?: StorageLike) => {
  const store = storage ?? getDefaultStorage();
  if (!store) return;
  try {
    const archive = loadCertificateArchive(store);
    const idx = archive.findIndex((item) => item.certId === cert.certId);
    if (idx >= 0) {
      archive[idx] = cert;
    } else {
      archive.push(cert);
    }
    store.setItem(CERTIFICATE_ARCHIVE_STORAGE_KEY, JSON.stringify(archive));
  } catch {
    // ignore
  }
};

export const isLessonCompleteForState = (
  state: LearnerProgressState | null,
  lessonId: number,
  totalSections: number
): boolean => {
  if (!state || totalSections <= 0) return false;
  const completed = state.completedSectionsByLesson[lessonId] || [];
  for (let i = 0; i < totalSections; i++) {
    if (!completed.includes(i)) return false;
  }
  return true;
};

export const issueVerifiedCertificate = (
  profile: LearnerProfile | null,
  state: LearnerProgressState | null,
  lessonId: number,
  lessonCertPrefix: string,
  totalSections: number,
  score: number,
  totalQuestions: number,
  storage?: StorageLike
): { certificate: CertificateRecord | null; updatedState: LearnerProgressState | null } => {
  if (!profile || !profile.locked || !state || state.learnerId !== profile.learnerId) {
    return { certificate: null, updatedState: state };
  }
  if (!isLessonCompleteForState(state, lessonId, totalSections)) {
    return { certificate: null, updatedState: state };
  }
  if (score < 8 || totalQuestions <= 0) {
    return { certificate: null, updatedState: state };
  }

  const existing = state.certificatesByLesson[lessonId];
  // Freeze name & role from confirmed profile on issuance; preserve existing certId & original name if already issued for this learner
  const cert: CertificateRecord = existing
    ? {
        ...existing,
        score: Math.max(existing.score, score),
        percentage: Math.round((Math.max(existing.score, score) / totalQuestions) * 100)
      }
    : {
        learnerId: profile.learnerId,
        studentName: profile.fullName,
        role: profile.role,
        lessonId,
        lessonCode: lessonCertPrefix || `KNTT10-B${lessonId}`,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        date: new Date().toLocaleDateString('vi-VN'),
        issuedAt: new Date().toISOString(),
        certId: `${lessonCertPrefix || `KNTT10-B${lessonId}`}-${Math.floor(100000 + Math.random() * 900000)}`,
        isPracticeOnly: true
      };

  const nextState = saveLearnerProgress(
    {
      ...state,
      certificatesByLesson: {
        ...state.certificatesByLesson,
        [lessonId]: cert
      }
    },
    storage
  );
  upsertCertificateArchive(cert, storage);
  return { certificate: cert, updatedState: nextState };
};

export const gradeAndRecordQuizAttempt = (
  profile: LearnerProfile | null,
  state: LearnerProgressState | null,
  lessonId: number,
  lessonCertPrefix: string,
  totalSections: number,
  quizQuestions: QuizQuestionGradable[],
  selectedAnswers: Record<number, number>,
  storage?: StorageLike
): {
  attempt: QuizAttemptRecord | null;
  certificate: CertificateRecord | null;
  updatedState: LearnerProgressState | null;
} => {
  if (!profile || !profile.locked || !state || state.learnerId !== profile.learnerId) {
    return { attempt: null, certificate: null, updatedState: state };
  }

  let score = 0;
  quizQuestions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctIndex) {
      score += 1;
    }
  });

  const totalQuestions = quizQuestions.length || 10;
  const allComplete = isLessonCompleteForState(state, lessonId, totalSections);
  const passed = allComplete && score >= 8;

  const attempt: QuizAttemptRecord = {
    learnerId: profile.learnerId,
    lessonId,
    score,
    totalQuestions,
    passed,
    selectedAnswers: { ...selectedAnswers },
    submittedAt: new Date().toISOString()
  };

  let nextState = saveLearnerProgress(
    {
      ...state,
      quizResultsByLesson: {
        ...state.quizResultsByLesson,
        [lessonId]: attempt
      }
    },
    storage
  );

  let certificate: CertificateRecord | null = state.certificatesByLesson[lessonId] || null;
  if (passed) {
    const issued = issueVerifiedCertificate(
      profile,
      nextState,
      lessonId,
      lessonCertPrefix,
      totalSections,
      score,
      totalQuestions,
      storage
    );
    certificate = issued.certificate;
    nextState = issued.updatedState || nextState;
  }

  return { attempt, certificate, updatedState: nextState };
};

export const toggleDifficultVocabInState = (
  profile: LearnerProfile | null,
  state: LearnerProgressState | null,
  termId: string,
  storage?: StorageLike
): LearnerProgressState | null => {
  if (!profile || !profile.locked || !state || state.learnerId !== profile.learnerId || !termId) {
    return state;
  }
  const current = state.difficultVocabIds || [];
  const exists = current.includes(termId);
  const nextIds = exists ? current.filter((id) => id !== termId) : [...current, termId];
  return saveLearnerProgress(
    {
      ...state,
      difficultVocabIds: nextIds
    },
    storage
  );
};

export const clearActiveLearnerSession = (storage?: StorageLike): void => {
  const store = storage ?? getDefaultStorage();
  if (!store) return;
  try {
    // Only clear the active pointer so old learner states and archived certificates retain their original owner and name
    store.removeItem(ACTIVE_LEARNER_STORAGE_KEY);
  } catch {
    // ignore
  }
};
