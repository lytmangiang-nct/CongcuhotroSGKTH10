import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { GLOSSARY, TermDefinition } from '../data/lessonData';
import { LESSONS_REGISTRY, getLesson, LessonRegistryItem } from '../data/lessonsRegistry';
import {
  LearnerRole,
  LearnerProfile,
  LearnerProgressState,
  QuizAttemptRecord,
  CertificateRecord,
  loadActiveLearnerProfile,
  loadLearnerProgress,
  saveLearnerProgress,
  createLearnerProfile,
  clearActiveLearnerSession,
  gradeAndRecordQuizAttempt,
  hasLegacyUnscopedProgress,
  toggleDifficultVocabInState
} from '../services/learnerStorage';
import { CategorizedGuidingPrompt } from '../data/guidingQuestionsHelper';

export type BilingualMode = 'vi' | 'en';
export type ViewLayout = 'interleaved' | 'split';
export type AppView = 'cover' | 'toc' | 'reader';

export type { LearnerRole, LearnerProfile, LearnerProgressState, QuizAttemptRecord, CertificateRecord };

interface BookContextType {
  // Learner Profile & Session Isolation
  activeProfile: LearnerProfile | null;
  learnerProgress: LearnerProgressState | null;
  hasLegacyProgress: boolean;
  confirmInitialProfile: (role: LearnerRole, fullName: string) => LearnerProfile;
  startOverProfile: () => void;
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;
  getLessonCompletedSections: (lessonId: number) => number[];
  getLessonCertificate: (lessonId: number) => CertificateRecord | null;
  getLessonQuizResult: (lessonId: number) => QuizAttemptRecord | null;
  submitLessonQuiz: (selectedAnswers: Record<number, number>) => {
    attempt: QuizAttemptRecord | null;
    certificate: CertificateRecord | null;
  };
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  openCover: () => void;
  openToc: () => void;
  openReader: (lessonId?: number, sectionIndex?: number) => void;
  resumeLastSession: () => void;
  currentLessonId: number;
  setCurrentLessonId: (id: number) => void;
  currentLesson: LessonRegistryItem;
  bilingualMode: BilingualMode;
  setBilingualMode: (mode: BilingualMode) => void;
  viewLayout: ViewLayout;
  setViewLayout: (layout: ViewLayout) => void;
  activePage: number | null;
  setActivePage: (page: number | null) => void;
  highlightTerms: boolean;
  setHighlightTerms: (highlight: boolean) => void;
  selectedTerm: TermDefinition | null;
  setSelectedTerm: (term: TermDefinition | null) => void;
  openTermById: (id: string) => void;
  showOriginalModal: boolean;
  setShowOriginalModal: (show: boolean) => void;
  originalPageTarget: number;
  setOriginalPageTarget: (page: number) => void;
  showGlossaryModal: boolean;
  setShowGlossaryModal: (show: boolean) => void;
  showQuizModal: boolean;
  setShowQuizModal: (show: boolean) => void;
  navigateToQuiz: () => void;
  showCopyrightModal: boolean;
  setShowCopyrightModal: (show: boolean) => void;
  showAsciiModal: boolean;
  setShowAsciiModal: (show: boolean) => void;
  // Section hands-on exercises & tasks tracking
  isSectionTasksDone: (lessonId: number, sectionIdx: number) => boolean;
  completeSectionTasks: (lessonId: number, sectionIdx: number) => void;
  taskWarning: { sectionIdx: number; lessonId: number; message: string } | null;
  setTaskWarning: (warning: { sectionIdx: number; lessonId: number; message: string } | null) => void;
  quizUnlockNotice: boolean;
  setQuizUnlockNotice: (notice: boolean) => void;
  // Section completion ("mark complete")
  completedSections: number[];
  toggleSectionComplete: (sectionIndex: number, force?: boolean) => void;
  isSectionComplete: (sectionIndex: number) => boolean;
  isAllSectionsComplete: boolean;
  markAllSectionsComplete: () => void;
  // Certificate
  certificate: CertificateRecord | null;
  showCertificateModal: boolean;
  setShowCertificateModal: (show: boolean) => void;
  isCertificateEarned: boolean;
  // Page-by-page book navigation (Full screen paginated book)
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  pageDirection: number;
  // Fullscreen toggle
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  // Smart Table of Contents drawer
  showTocDrawer: boolean;
  setShowTocDrawer: (show: boolean) => void;
  toggleTocDrawer: () => void;
  // Speech controls & voice info
  speak: (text: string, lang?: 'vi' | 'en') => void;
  isSpeaking: boolean;
  isPaused: boolean;
  pauseSpeaking: () => void;
  resumeSpeaking: () => void;
  stopSpeaking: () => void;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  speakingText: string | null;
  speakingSentence: string | null;
  speakingCharIndex: number;
  activeViVoiceName: string | null;
  hasViVoice: boolean;
  notes: Record<string, string>;
  setNote: (id: string, text: string) => void;
  bookmarks: string[];
  toggleBookmark: (id: string) => void;
  // Teacher Support: Presentation Mode, Guiding Prompts, Learning Tracker
  isPresentationMode: boolean;
  setIsPresentationMode: (on: boolean) => void;
  togglePresentationMode: () => void;
  revealPresentationHints: boolean;
  setRevealPresentationHints: (reveal: boolean) => void;
  revealPresentationAnswers: boolean;
  setRevealPresentationAnswers: (reveal: boolean) => void;
  projectedPrompt: CategorizedGuidingPrompt | null;
  setProjectedPrompt: (prompt: CategorizedGuidingPrompt | null) => void;
  showGuidingPromptsModal: boolean;
  setShowGuidingPromptsModal: (show: boolean) => void;
  showTeacherAnalyticsModal: boolean;
  setShowTeacherAnalyticsModal: (show: boolean) => void;
  // Student Support: Vocabulary Flashcards & Guided Python Sandbox
  showVocabModal: boolean;
  setShowVocabModal: (show: boolean) => void;
  showPythonLabModal: boolean;
  setShowPythonLabModal: (show: boolean) => void;
  difficultVocabIds: string[];
  toggleDifficultVocab: (termId: string) => void;
  isDifficultVocab: (termId: string) => boolean;
  // Teach in English Studio & Simulation Bridge
  showTeachEnglishModal: boolean;
  openTeachEnglish: () => void;
  closeTeachEnglish: () => void;
  speakAtRate: (text: string, lang?: 'vi' | 'en', rateOverride?: number) => void;
  teachSimCommand: { type: string; nonce: number } | null;
  dispatchTeachSimCommand: (type: string) => void;
  teachSimSnapshot: {
    status: 'idle' | 'paused' | 'running';
    labelEn: string;
    labelVi: string;
  };
  setTeachSimSnapshot: (snap: {
    status: 'idle' | 'paused' | 'running';
    labelEn: string;
    labelVi: string;
  }) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

// Normalize text for natural, correct Vietnamese speech synthesis
export const normalizeVietnameseSpeech = (rawText: string): string => {
  return rawText
    .replace(/[*#_~`\[\]]/g, ' ')
    .replace(/•/g, ' ')
    .replace(/→/g, ' chuyển thành ')
    .replace(/≈/g, ' xấp xỉ ')
    .replace(/÷/g, ' chia cho ')
    .replace(/×/g, ' nhân với ')
    .replace(/°C/gi, ' độ C ')
    .replace(/2¹⁰/g, ' hai mũ mười ')
    .replace(/2²⁰/g, ' hai mũ hai mươi ')
    .replace(/2³⁰/g, ' hai mũ ba mươi ')
    .replace(/2⁴⁰/g, ' hai mũ bốn mươi ')
    .replace(/2⁵⁰/g, ' hai mũ năm mươi ')
    .replace(/2⁶⁰/g, ' hai mũ sáu mươi ')
    .replace(/2⁷⁰/g, ' hai mũ bảy mươi ')
    .replace(/2⁸⁰/g, ' hai mũ tám mươi ')
    .replace(/\b1\s*024\b/g, ' một nghìn không trăm hai mươi tư ')
    .replace(/\b2\s*000\b/g, ' hai nghìn ')
    .replace(/\b10\s*000\b/g, ' mười nghìn ')
    .replace(/\b100\s*000\b/g, ' một trăm nghìn ')
    .replace(/\b16\s*GB\b/gi, ' mười sáu ghi ga bai ')
    .replace(/\b256\s*GB\b/gi, ' hai trăm năm mươi sáu ghi ga bai ')
    .replace(/\b2\s*TB\b/gi, ' hai tê ra bai ')
    .replace(/\b3\s*MB\b/gi, ' ba mê ga bai ')
    .replace(/\b2\s*GB\b/gi, ' hai ghi ga bai ')
    .replace(/\b50\s*MB\b/gi, ' năm mươi mê ga bai ')
    .replace(/\b2048\s*B\b/gi, ' hai nghìn không trăm bốn mươi tám bai ')
    .replace(/\bbit\b/gi, ' bít ')
    .replace(/\bbits\b/gi, ' bít ')
    .replace(/\bByte\b/gi, ' bai ')
    .replace(/\bBytes\b/gi, ' bai ')
    .replace(/\bKB\b/g, ' ki-lô-bai ')
    .replace(/\bMB\b/g, ' mê-ga-bai ')
    .replace(/\bGB\b/g, ' ghi-ga-bai ')
    .replace(/\bTB\b/g, ' tê-ra-bai ')
    .replace(/\bPB\b/g, ' pê-ta-bai ')
    .replace(/\bEB\b/g, ' éc-xa-bai ')
    .replace(/\bZB\b/g, ' dét-ta-bai ')
    .replace(/\bYB\b/g, ' i-ốt-ta-bai ')
    .replace(/\bSGK\b/gi, ' sách giáo khoa ')
    .replace(/\bHĐ1\b/gi, ' hoạt động một ')
    .replace(/\bHĐ2\b/gi, ' hoạt động hai ')
    .replace(/\bHĐ\b/gi, ' hoạt động ')
    .replace(/\bĐTB\b/gi, ' điểm trung bình ')
    .replace(/\bCCCD\b/gi, ' căn cước công dân ')
    .replace(/\bHình 1\.1\b/gi, ' Hình một chấm một ')
    .replace(/\bHình 1\.2\b/gi, ' Hình một chấm hai ')
    .replace(/\bHình 1\.3\b/gi, ' Hình một chấm ba ')
    .replace(/\bBảng 1\.1\b/gi, ' Bảng một chấm một ')
    .replace(/\bHình 2\.1\b/gi, ' Hình hai chấm một ')
    .replace(/\bHình 2\.2\b/gi, ' Hình hai chấm hai ')
    .replace(/\bHình 2\.3\b/gi, ' Hình hai chấm ba ')
    .replace(/\bHình 3\.1\b/gi, ' Hình ba chấm một ')
    .replace(/\bHình 3\.2\b/gi, ' Hình ba chấm hai ')
    .replace(/\bHình 4\.1\b/gi, ' Hình bốn chấm một ')
    .replace(/\bHình 4\.2\b/gi, ' Hình bốn chấm hai ')
    .replace(/\bHình 4\.3\b/gi, ' Hình bốn chấm ba ')
    .replace(/\bHình 4\.4\b/gi, ' Hình bốn chấm bốn ')
    .replace(/\bBảng 4\.1\b/gi, ' Bảng bốn chấm một ')
    .replace(/\bALU\b/gi, ' a-lờ-u ')
    .replace(/₂/g, ' hệ nhị phân ')
    .replace(/₁₀/g, ' hệ thập phân ')
    .replace(/\bASCII\b/gi, ' át-x-ki ')
    .replace(/\bUnicode\b/gi, ' u-ni-cốt ')
    .replace(/\bUTF-8\b/gi, ' u-tê-ép tám ')
    .replace(/\bVSCII\b/gi, ' vít-x-ki ')
    .replace(/\bTCVN\b/gi, ' tê-xê-vê-en ')
    .replace(/\bGPLX\b/gi, ' giấy phép lái xe ')
    .replace(/\bOCR\b/gi, ' ô-xê-e, tức nhận dạng ký tự quang học ')
    .replace(/\bIoT\b/gi, ' ai-ô-ti, tức Internet vạn vật ')
    .replace(/\bCMCN 4\.0\b/gi, ' Cách mạng công nghiệp bốn chấm không ')
    .replace(/\bCMCN\b/gi, ' Cách mạng công nghiệp ')
    .replace(/\bOS\/360\b/gi, ' ô-ét ba trăm sáu mươi ')
    .replace(/\bFORTRAN\b/gi, ' pho-tran ')
    .replace(/\bTCP\/IP\b/gi, ' tê-xê-pê trên ai-pi ')
    .replace(/\bDBMS\b/gi, ' hệ quản trị cơ sở dữ liệu ')
    .replace(/\bWWW\b/gi, ' đắp-liu đắp-liu đắp-liu ')
    .replace(/\btelex\b/gi, ' te-lếch ')
    .replace(/\bwi-fi\b/gi, ' oai-phai ')
    .replace(/\bwifi\b/gi, ' oai-phai ')
    .replace(/\blaptop\b/gi, ' láp-tóp ')
    .replace(/\bsmartwatch\b/gi, ' đồng hồ thông minh ')
    .replace(/\bCPU\b/gi, ' xi-pi-u ')
    .replace(/\bRAM\b/gi, ' ram ')
    .replace(/\bUSB\b/gi, ' u-ét-bê ')
    .replace(/\bQR code\b/gi, ' mã quét quy-rờ ')
    .replace(/\bKNTT\b/gi, ' Kết nối tri thức ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bilingualMode, setBilingualMode] = useState<BilingualMode>(() => {
    const saved = localStorage.getItem('sgk_bilingual_mode');
    return saved === 'en' ? 'en' : 'vi';
  });
  const [viewLayout, setViewLayout] = useState<ViewLayout>('interleaved');
  const [activePage, setActivePage] = useState<number | null>(null);
  const [highlightTerms, setHighlightTerms] = useState<boolean>(true);
  const [selectedTerm, setSelectedTerm] = useState<TermDefinition | null>(null);
  const [showOriginalModal, setShowOriginalModal] = useState<boolean>(false);
  const [originalPageTarget, setOriginalPageTarget] = useState<number>(6);
  const [showGlossaryModal, setShowGlossaryModal] = useState<boolean>(false);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [showCopyrightModal, setShowCopyrightModal] = useState<boolean>(false);
  const [showAsciiModal, setShowAsciiModal] = useState<boolean>(false);
  const [showTocDrawer, setShowTocDrawer] = useState<boolean>(false);
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [isPresentationMode, setIsPresentationModeState] = useState<boolean>(false);
  const [revealPresentationHints, setRevealPresentationHints] = useState<boolean>(false);
  const [revealPresentationAnswers, setRevealPresentationAnswers] = useState<boolean>(false);
  const [projectedPrompt, setProjectedPrompt] = useState<CategorizedGuidingPrompt | null>(null);
  const [showGuidingPromptsModal, setShowGuidingPromptsModal] = useState<boolean>(false);
  const [showTeacherAnalyticsModal, setShowTeacherAnalyticsModal] = useState<boolean>(false);
  const [showVocabModal, setShowVocabModal] = useState<boolean>(false);
  const [showPythonLabModal, setShowPythonLabModal] = useState<boolean>(false);
  const [showTeachEnglishModal, setShowTeachEnglishModal] = useState<boolean>(false);
  const teachReturnTargetRef = useRef<{ lessonId: number; page: number; view: AppView } | null>(null);
  const [teachSimCommand, setTeachSimCommand] = useState<{ type: string; nonce: number } | null>(null);
  const [teachSimSnapshot, setTeachSimSnapshot] = useState<{
    status: 'idle' | 'paused' | 'running';
    labelEn: string;
    labelVi: string;
  }>({
    status: 'idle',
    labelEn: 'Ready',
    labelVi: 'Sẵn sàng'
  });

  // Initialize active learner profile & profile-scoped progress (never auto-attaching legacy un-scoped data)
  const initialProfile = loadActiveLearnerProfile();
  const initialProgress = initialProfile ? loadLearnerProgress(initialProfile.learnerId) : null;

  const [activeProfile, setActiveProfile] = useState<LearnerProfile | null>(initialProfile);
  const [learnerProgress, setLearnerProgress] = useState<LearnerProgressState | null>(initialProgress);
  const [hasLegacyProgress] = useState<boolean>(() => hasLegacyUnscopedProgress());

  const activeProfileRef = useRef<LearnerProfile | null>(initialProfile);
  const learnerProgressRef = useRef<LearnerProgressState | null>(initialProgress);

  const commitLearnerProgress = useCallback(
    (updater: (prev: LearnerProgressState) => LearnerProgressState) => {
      const currentProf = activeProfileRef.current;
      const currentProg = learnerProgressRef.current;
      if (!currentProf || !currentProg || currentProg.learnerId !== currentProf.learnerId) {
        return null;
      }
      const next = saveLearnerProgress(updater(currentProg));
      learnerProgressRef.current = next;
      setLearnerProgress(next);
      return next;
    },
    []
  );

  // Current Lesson State scoped to active learner profile
  const [currentLessonId, setCurrentLessonIdState] = useState<number>(() => {
    const lid = initialProgress?.currentLessonId;
    return typeof lid === 'number' && LESSONS_REGISTRY[lid] ? lid : 1;
  });

  const currentLesson = getLesson(currentLessonId);

  // Sections Completion Tracking per Lesson scoped to active learner
  const [completedSections, setCompletedSections] = useState<number[]>(() => {
    return initialProgress?.completedSectionsByLesson?.[currentLessonId] || [];
  });

  // Certificate earned per Lesson scoped to active learner
  const [certificate, setCertificate] = useState<CertificateRecord | null>(() => {
    return initialProgress?.certificatesByLesson?.[currentLessonId] || null;
  });

  const totalPages = currentLesson.sections.length;

  // Section hands-on interactive exercises completion tracking scoped to active learner
  const [sectionTasksMap, setSectionTasksMap] = useState<Record<string, boolean>>(() => {
    return initialProgress?.sectionTasksMap || {};
  });

  const [currentPage, setCurrentPageState] = useState<number>(() => {
    const savedPage = initialProgress?.currentPage ?? 0;
    const lessonTotal = getLesson(initialProgress?.currentLessonId ?? 1).sections.length;
    return Math.min(Math.max(0, lessonTotal - 1), Math.max(0, savedPage));
  });
  const [pageDirection, setPageDirection] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // App View Tier: 'cover' | 'toc' | 'reader' (restored to last visited view & section on reopen)
  const [currentView, setCurrentViewState] = useState<AppView>(() => {
    if (!initialProfile || !initialProgress) return 'cover';
    return initialProgress.lastView || 'cover';
  });

  const setCurrentView = useCallback(
    (view: AppView) => {
      setCurrentViewState(view);
      commitLearnerProgress((prev) => ({
        ...prev,
        lastView: view
      }));
    },
    [commitLearnerProgress]
  );

  const setCurrentLessonId = useCallback(
    (newId: number) => {
      const targetL = getLesson(newId);
      setCurrentLessonIdState(newId);
      const prog = learnerProgressRef.current;
      const savedSecs = prog?.completedSectionsByLesson?.[newId] || [];
      const savedCert = prog?.certificatesByLesson?.[newId] || null;
      setCompletedSections(savedSecs);
      setCertificate(savedCert);
      if (targetL) {
        setOriginalPageTarget(targetL.firstPageScan);
      }
      setCurrentPageState(0);
      commitLearnerProgress((prev) => ({
        ...prev,
        currentLessonId: newId,
        currentPage: 0
      }));
    },
    [commitLearnerProgress]
  );

  const [taskWarning, setTaskWarning] = useState<{ sectionIdx: number; lessonId: number; message: string } | null>(null);
  const [quizUnlockNotice, setQuizUnlockNotice] = useState<boolean>(false);

  const isSectionTasksDone = useCallback(
    (lessonId: number, sectionIdx: number): boolean => {
      const key = `${lessonId}_${sectionIdx}`;
      return Boolean(sectionTasksMap[key]);
    },
    [sectionTasksMap]
  );

  const completeSectionTasks = useCallback(
    (lessonId: number, sectionIdx: number) => {
      const key = `${lessonId}_${sectionIdx}`;
      const nextTasksMap = { ...sectionTasksMap, [key]: true };
      setSectionTasksMap(nextTasksMap);

      const prevCompleted = learnerProgressRef.current?.completedSectionsByLesson?.[lessonId] || completedSections;
      const nextCompleted = prevCompleted.includes(sectionIdx) ? prevCompleted : [...prevCompleted, sectionIdx];
      if (lessonId === currentLessonId) {
        setCompletedSections(nextCompleted);
        const willBeAllComplete =
          !prevCompleted.includes(sectionIdx) &&
          currentLesson.sections.every((_, idx) => idx === sectionIdx || prevCompleted.includes(idx));
        if (willBeAllComplete) {
          setQuizUnlockNotice(true);
        }
      }

      commitLearnerProgress((prev) => ({
        ...prev,
        sectionTasksMap: {
          ...prev.sectionTasksMap,
          [key]: true
        },
        completedSectionsByLesson: {
          ...prev.completedSectionsByLesson,
          [lessonId]: nextCompleted
        }
      }));
    },
    [completedSections, commitLearnerProgress, currentLesson.sections, currentLessonId, sectionTasksMap]
  );

  const isSectionComplete = useCallback(
    (sectionIdx: number) => {
      return completedSections.includes(sectionIdx);
    },
    [completedSections]
  );

  const isAllSectionsComplete =
    totalPages > 0 && currentLesson.sections.every((_, idx) => completedSections.includes(idx));

  const isCertificateEarned = Boolean(
    activeProfile &&
      activeProfile.locked &&
      isAllSectionsComplete &&
      certificate &&
      certificate.learnerId === activeProfile.learnerId &&
      certificate.lessonId === currentLessonId &&
      certificate.score >= 8
  );

  const toggleSectionComplete = useCallback(
    (sectionIdx: number, force?: boolean) => {
      const isCurrentlyComplete = completedSections.includes(sectionIdx);

      // Exception: The last section (Luyện tập - Vận dụng) must be independent of quiz submission to avoid deadlock loops.
      const isLastSection = sectionIdx === currentLesson.sections.length - 1;
      if (!isCurrentlyComplete && !force && !isLastSection) {
        const tasksDone = Boolean(sectionTasksMap[`${currentLessonId}_${sectionIdx}`]);
        if (!tasksDone) {
          setTaskWarning({
            sectionIdx,
            lessonId: currentLessonId,
            message:
              bilingualMode === 'en'
                ? 'Please complete the hands-on practice / interactive activities in this section before marking it complete!'
                : 'Vui lòng hoàn thành các bài tập thao tác / câu hỏi tương tác trong phần này trước khi đánh dấu đã học!'
          });
          return;
        }
      }

      const next = isCurrentlyComplete
        ? completedSections.filter((i) => i !== sectionIdx)
        : [...completedSections, sectionIdx];

      if (!isCurrentlyComplete) {
        const willBeAllComplete = currentLesson.sections.every(
          (_, idx) => idx === sectionIdx || completedSections.includes(idx)
        );
        if (willBeAllComplete) {
          setQuizUnlockNotice(true);
        }
      }

      setCompletedSections(next);
      commitLearnerProgress((prev) => ({
        ...prev,
        completedSectionsByLesson: {
          ...prev.completedSectionsByLesson,
          [currentLessonId]: next
        }
      }));
    },
    [bilingualMode, commitLearnerProgress, completedSections, currentLesson.sections, currentLessonId, sectionTasksMap]
  );

  const markAllSectionsComplete = useCallback(() => {
    const all = currentLesson.sections.map((_, i) => i);
    setCompletedSections(all);
    commitLearnerProgress((prev) => ({
      ...prev,
      completedSectionsByLesson: {
        ...prev.completedSectionsByLesson,
        [currentLessonId]: all
      }
    }));
    setQuizUnlockNotice(true);
  }, [commitLearnerProgress, currentLesson.sections, currentLessonId]);

  const submitLessonQuiz = useCallback(
    (selectedAnswers: Record<number, number>) => {
      const result = gradeAndRecordQuizAttempt(
        activeProfileRef.current,
        learnerProgressRef.current,
        currentLessonId,
        currentLesson.certPrefix,
        currentLesson.sections.length,
        currentLesson.quizQuestions,
        selectedAnswers
      );
      if (result.updatedState) {
        learnerProgressRef.current = result.updatedState;
        setLearnerProgress(result.updatedState);
      }
      if (result.certificate) {
        setCertificate(result.certificate);
      }
      return { attempt: result.attempt, certificate: result.certificate };
    },
    [currentLesson.certPrefix, currentLesson.quizQuestions, currentLesson.sections.length, currentLessonId]
  );

  const confirmInitialProfile = useCallback((role: LearnerRole, fullName: string): LearnerProfile => {
    const { profile, progress } = createLearnerProfile(role, fullName);
    activeProfileRef.current = profile;
    learnerProgressRef.current = progress;
    setActiveProfile(profile);
    setLearnerProgress(progress);
    setCurrentLessonIdState(1);
    setCurrentPageState(0);
    setCompletedSections([]);
    setSectionTasksMap({});
    setCertificate(null);
    setOriginalPageTarget(getLesson(1).firstPageScan);
    setCurrentViewState('cover');
    return profile;
  }, []);

  const startOverProfile = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    clearActiveLearnerSession();
    activeProfileRef.current = null;
    learnerProgressRef.current = null;
    setActiveProfile(null);
    setLearnerProgress(null);
    setCurrentLessonIdState(1);
    setCurrentPageState(0);
    setCompletedSections([]);
    setSectionTasksMap({});
    setCertificate(null);
    setShowProfileModal(false);
    setShowQuizModal(false);
    setShowCertificateModal(false);
    setShowTocDrawer(false);
    setShowGuidingPromptsModal(false);
    setShowTeacherAnalyticsModal(false);
    setShowVocabModal(false);
    setShowPythonLabModal(false);
    setShowTeachEnglishModal(false);
    teachReturnTargetRef.current = null;
    setIsPresentationModeState(false);
    setRevealPresentationHints(false);
    setRevealPresentationAnswers(false);
    setProjectedPrompt(null);
    setQuizUnlockNotice(false);
    setTaskWarning(null);
    setCurrentViewState('cover');
  }, []);

  const setIsPresentationMode = useCallback((on: boolean) => {
    if (on) {
      setRevealPresentationHints(false);
      setRevealPresentationAnswers(false);
      setShowTocDrawer(false);
      setShowGuidingPromptsModal(false);
      setCurrentViewState('reader');
    } else {
      setProjectedPrompt(null);
    }
    setIsPresentationModeState(on);
  }, []);

  const togglePresentationMode = useCallback(() => {
    setIsPresentationModeState((prev) => {
      const next = !prev;
      if (next) {
        setRevealPresentationHints(false);
        setRevealPresentationAnswers(false);
        setShowTocDrawer(false);
        setShowGuidingPromptsModal(false);
        setCurrentViewState('reader');
      } else {
        setProjectedPrompt(null);
      }
      return next;
    });
  }, []);

  const difficultVocabIds = learnerProgress?.difficultVocabIds || [];

  const toggleDifficultVocab = useCallback((termId: string) => {
    const updated = toggleDifficultVocabInState(
      activeProfileRef.current,
      learnerProgressRef.current,
      termId
    );
    if (updated) {
      learnerProgressRef.current = updated;
      setLearnerProgress(updated);
    }
  }, []);

  const isDifficultVocab = useCallback(
    (termId: string) => {
      return difficultVocabIds.includes(termId);
    },
    [difficultVocabIds]
  );

  const getLessonCompletedSections = useCallback(
    (lessonId: number): number[] => {
      if (lessonId === currentLessonId) {
        return completedSections;
      }
      return learnerProgress?.completedSectionsByLesson?.[lessonId] || [];
    },
    [completedSections, currentLessonId, learnerProgress]
  );

  const getLessonCertificate = useCallback(
    (lessonId: number): CertificateRecord | null => {
      if (lessonId === currentLessonId) {
        return certificate;
      }
      return learnerProgress?.certificatesByLesson?.[lessonId] || null;
    },
    [certificate, currentLessonId, learnerProgress]
  );

  const getLessonQuizResult = useCallback(
    (lessonId: number): QuizAttemptRecord | null => {
      return learnerProgress?.quizResultsByLesson?.[lessonId] || null;
    },
    [learnerProgress]
  );

  const setCurrentPage = (page: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    const target = Math.max(0, Math.min(totalPages - 1, page));
    setPageDirection(target >= currentPage ? 1 : -1);
    setCurrentPageState(target);
    commitLearnerProgress((prev) => ({
      ...prev,
      currentPage: target
    }));
  };

  const openCover = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setCurrentView('cover');
  }, [setCurrentView]);

  const openToc = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setCurrentView('toc');
  }, [setCurrentView]);

  const openReader = useCallback(
    (lessonId?: number, sectionIndex?: number) => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      const nextLessonId = typeof lessonId === 'number' ? lessonId : currentLessonId;
      const targetL = getLesson(nextLessonId);
      const prog = learnerProgressRef.current;

      if (typeof lessonId === 'number') {
        setCurrentLessonIdState(lessonId);
        setCompletedSections(prog?.completedSectionsByLesson?.[lessonId] || []);
        setCertificate(prog?.certificatesByLesson?.[lessonId] || null);
        if (targetL) {
          setOriginalPageTarget(targetL.firstPageScan);
        }
      }

      const validTarget =
        typeof sectionIndex === 'number'
          ? Math.max(0, Math.min(targetL.sections.length - 1, sectionIndex))
          : typeof lessonId === 'number'
          ? 0
          : currentPage;

      setCurrentPageState(validTarget);
      setCurrentViewState('reader');

      commitLearnerProgress((prev) => ({
        ...prev,
        lastView: 'reader',
        currentLessonId: nextLessonId,
        currentPage: validTarget
      }));
    },
    [commitLearnerProgress, currentLessonId, currentPage]
  );

  const resumeLastSession = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setCurrentView('reader');
  }, [setCurrentView]);

  const navigateToQuiz = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    const lastSection = Math.max(0, currentLesson.sections.length - 1);
    setCurrentPageState(lastSection);
    setCurrentViewState('reader');
    commitLearnerProgress((prev) => ({
      ...prev,
      lastView: 'reader',
      currentPage: lastSection
    }));
    setShowQuizModal(true);
    setTimeout(() => {
      const el = document.getElementById('end-of-lesson-quiz');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  }, [commitLearnerProgress, currentLesson.sections.length]);

  const nextPage = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (currentPage < totalPages - 1) {
      const next = currentPage + 1;
      setPageDirection(1);
      setCurrentPageState(next);
      commitLearnerProgress((prev) => ({
        ...prev,
        currentPage: next
      }));
    }
  };

  const prevPage = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    if (currentPage > 0) {
      const prevIdx = currentPage - 1;
      setPageDirection(-1);
      setCurrentPageState(prevIdx);
      commitLearnerProgress((prev) => ({
        ...prev,
        currentPage: prevIdx
      }));
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation for page turning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeProfileRef.current) return;
      // Don't turn pages if user is currently typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Speech states
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [speakingSentence, setSpeakingSentence] = useState<string | null>(null);
  const [speakingCharIndex, setSpeakingCharIndex] = useState<number>(0);
  const [speechRate, setSpeechRateState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sgk_speech_rate');
      return saved ? parseFloat(saved) : 0.8;
    } catch {
      return 0.8;
    }
  });

  const setSpeechRate = useCallback((rate: number) => {
    setSpeechRateState(rate);
    try {
      localStorage.setItem('sgk_speech_rate', rate.toString());
    } catch {}
  }, []);

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [activeViVoiceName, setActiveViVoiceName] = useState<string | null>(null);
  const [hasViVoice, setHasViVoice] = useState<boolean>(true);

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem('sgk_notes') || '{}');
    } catch {
      return {};
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('sgk_bookmarks') || '[]');
    } catch {
      return [];
    }
  });

  // Load and cache voices when browser is ready
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);

      const viVoice = voices.find(
        (v) =>
          v.lang.startsWith('vi') ||
          v.lang.includes('vi-VN') ||
          v.lang.toLowerCase().includes('vie') ||
          v.name.toLowerCase().includes('vietnam') ||
          v.name.toLowerCase().includes('hoaimy') ||
          v.name.toLowerCase().includes('namminh') ||
          v.name.toLowerCase().includes('linh')
      );

      if (viVoice) {
        setActiveViVoiceName(viVoice.name);
        setHasViVoice(true);
      } else {
        setHasViVoice(false);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('sgk_bilingual_mode', bilingualMode);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeakingText(null);
    setSpeakingSentence(null);
    setSpeakingCharIndex(0);
  }, [bilingualMode]);

  useEffect(() => {
    localStorage.setItem('sgk_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('sgk_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleTocDrawer = useCallback(() => {
    setShowTocDrawer((prev) => !prev);
  }, []);

  const openTermById = (id: string) => {
    const allTerms = [...(currentLesson?.glossary || []), ...GLOSSARY];
    const found = allTerms.find((t) => t.id.toLowerCase() === id.toLowerCase());
    if (found) {
      setSelectedTerm(found);
    }
  };

  const speakWithRate = (text: string, lang: 'vi' | 'en' = 'en', rateOverride?: number) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    // Prepare optimized text according to language
    const preparedText =
      lang === 'vi'
        ? normalizeVietnameseSpeech(text)
        : text.replace(/[*#_~`\[\]]/g, ' ').replace(/\s+/g, ' ').trim();

    if (!preparedText) return;

    const utterance = new SpeechSynthesisUtterance(preparedText);
    utterance.lang = lang === 'vi' ? 'vi-VN' : 'en-US';

    // Apply calibrated speech rate for English learners (0.8x is the optimal speed for clear beginner comprehension)
    utterance.rate = typeof rateOverride === 'number' ? rateOverride : (speechRate || 0.8);
    utterance.pitch = 1.0;

    const voices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();

    if (lang === 'vi') {
      // Find true Vietnamese voice
      const viVoice = voices.find(
        (v) =>
          v.lang.startsWith('vi') ||
          v.lang.includes('vi-VN') ||
          v.lang.toLowerCase().includes('vie') ||
          v.name.toLowerCase().includes('vietnam') ||
          v.name.toLowerCase().includes('hoaimy') ||
          v.name.toLowerCase().includes('namminh') ||
          v.name.toLowerCase().includes('linh')
      );

      if (viVoice) {
        utterance.voice = viVoice;
      }
    } else {
      // Find highest-fidelity, most natural English voice for language learners
      const enVoice =
        // 1. Natural / Neural US voices (clearest American articulation for learners)
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Neural') ||
              v.name.includes('Online (Natural)') ||
              v.name.includes('Jenny') ||
              v.name.includes('Guy') ||
              v.name.includes('Aria'))
        ) ||
        // 2. Google US / UK English (clear studio pronunciation)
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Google US English') ||
              v.name.includes('Google UK English Female') ||
              v.name.includes('Google UK English Male') ||
              v.name.includes('Google'))
        ) ||
        // 3. Apple premium natural voices
        voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Samantha') ||
              v.name.includes('Ava') ||
              v.name.includes('Daniel') ||
              v.name.includes('Karen') ||
              v.name.includes('Premium') ||
              v.name.includes('Enhanced'))
        ) ||
        // 4. Any en-US standard voice
        voices.find((v) => v.lang === 'en-US' || v.lang.startsWith('en-US')) ||
        // 5. Any en-GB standard voice
        voices.find((v) => v.lang === 'en-GB' || v.lang.startsWith('en-GB')) ||
        // 6. Any English voice
        voices.find((v) => v.lang.startsWith('en'));

      if (enVoice) {
        utterance.voice = enVoice;
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setSpeakingText(text);
      setSpeakingCharIndex(0);
    };

    utterance.onboundary = (e: SpeechSynthesisEvent) => {
      if (typeof e.charIndex === 'number') {
        setSpeakingCharIndex(e.charIndex);
        const sentences = preparedText.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [preparedText];
        let offset = 0;
        for (const s of sentences) {
          if (e.charIndex >= offset && e.charIndex < offset + s.length) {
            setSpeakingSentence(s.trim());
            break;
          }
          offset += s.length;
        }
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingText(null);
      setSpeakingSentence(null);
      setSpeakingCharIndex(0);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setSpeakingText(null);
      setSpeakingSentence(null);
      setSpeakingCharIndex(0);
    };

    window.speechSynthesis.speak(utterance);
  };

  const speak = (text: string, lang: 'vi' | 'en' = 'en') => {
    speakWithRate(text, lang);
  };

  const speakAtRate = (text: string, lang: 'vi' | 'en' = 'en', rateOverride?: number) => {
    speakWithRate(text, lang, rateOverride);
  };

  const openTeachEnglish = useCallback(() => {
    teachReturnTargetRef.current = {
      lessonId: currentLessonId,
      page: currentPage,
      view: currentView
    };
    setShowTocDrawer(false);
    setShowTeachEnglishModal(true);
  }, [currentLessonId, currentPage, currentView]);

  const closeTeachEnglish = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
    setShowTeachEnglishModal(false);
    const saved = teachReturnTargetRef.current;
    teachReturnTargetRef.current = null;
    if (saved) {
      if (saved.lessonId !== currentLessonId) {
        setCurrentLessonIdState(saved.lessonId);
        const prog = learnerProgressRef.current;
        setCompletedSections(prog?.completedSectionsByLesson?.[saved.lessonId] || []);
        setCertificate(prog?.certificatesByLesson?.[saved.lessonId] || null);
      }
      setCurrentPageState(saved.page);
      setCurrentViewState(saved.view);
      commitLearnerProgress((prev) => ({
        ...prev,
        lastView: saved.view,
        currentLessonId: saved.lessonId,
        currentPage: saved.page
      }));
    }
  }, [commitLearnerProgress, currentLessonId]);

  const dispatchTeachSimCommand = useCallback((type: string) => {
    setTeachSimCommand({ type, nonce: Date.now() + Math.random() });
  }, []);

  const pauseSpeaking = useCallback(() => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resumeSpeaking = useCallback(() => {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeakingText(null);
    setSpeakingSentence(null);
    setSpeakingCharIndex(0);
  }, []);

  const setNote = (id: string, text: string) => {
    setNotes((prev) => ({
      ...prev,
      [id]: text
    }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <BookContext.Provider
      value={{
        activeProfile,
        learnerProgress,
        hasLegacyProgress,
        confirmInitialProfile,
        startOverProfile,
        showProfileModal,
        setShowProfileModal,
        getLessonCompletedSections,
        getLessonCertificate,
        getLessonQuizResult,
        submitLessonQuiz,
        currentView,
        setCurrentView,
        openCover,
        openToc,
        openReader,
        resumeLastSession,
        currentLessonId,
        setCurrentLessonId,
        currentLesson,
        bilingualMode,
        setBilingualMode,
        viewLayout,
        setViewLayout,
        activePage,
        setActivePage,
        highlightTerms,
        setHighlightTerms,
        selectedTerm,
        setSelectedTerm,
        openTermById,
        showOriginalModal,
        setShowOriginalModal,
        originalPageTarget,
        setOriginalPageTarget,
        showGlossaryModal,
        setShowGlossaryModal,
        showQuizModal,
        setShowQuizModal,
        navigateToQuiz,
        showCopyrightModal,
        setShowCopyrightModal,
        showAsciiModal,
        setShowAsciiModal,
        isSectionTasksDone,
        completeSectionTasks,
        taskWarning,
        setTaskWarning,
        quizUnlockNotice,
        setQuizUnlockNotice,
        completedSections,
        toggleSectionComplete,
        isSectionComplete,
        isAllSectionsComplete,
        markAllSectionsComplete,
        certificate,
        showCertificateModal,
        setShowCertificateModal,
        isCertificateEarned,
        currentPage,
        setCurrentPage,
        totalPages,
        nextPage,
        prevPage,
        pageDirection,
        isFullscreen,
        toggleFullscreen,
        showTocDrawer,
        setShowTocDrawer,
        toggleTocDrawer,
        speak,
        isSpeaking,
        isPaused,
        pauseSpeaking,
        resumeSpeaking,
        stopSpeaking,
        speechRate,
        setSpeechRate,
        speakingText,
        speakingSentence,
        speakingCharIndex,
        activeViVoiceName,
        hasViVoice,
        notes,
        setNote,
        bookmarks,
        toggleBookmark,
        isPresentationMode,
        setIsPresentationMode,
        togglePresentationMode,
        revealPresentationHints,
        setRevealPresentationHints,
        revealPresentationAnswers,
        setRevealPresentationAnswers,
        projectedPrompt,
        setProjectedPrompt,
        showGuidingPromptsModal,
        setShowGuidingPromptsModal,
        showTeacherAnalyticsModal,
        setShowTeacherAnalyticsModal,
        showVocabModal,
        setShowVocabModal,
        showPythonLabModal,
        setShowPythonLabModal,
        difficultVocabIds,
        toggleDifficultVocab,
        isDifficultVocab,
        showTeachEnglishModal,
        openTeachEnglish,
        closeTeachEnglish,
        speakAtRate,
        teachSimCommand,
        dispatchTeachSimCommand,
        teachSimSnapshot,
        setTeachSimSnapshot
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};
