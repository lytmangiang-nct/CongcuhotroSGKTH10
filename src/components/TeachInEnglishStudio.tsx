import React, { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Play,
  Pause,
  StepForward,
  RotateCcw,
  ArrowLeftRight,
  Search,
  MonitorPlay,
  ExternalLink,
  QrCode,
  Users,
  BarChart3,
  MessageSquareQuote,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  Sparkles,
  BookOpen,
  Sliders
} from 'lucide-react';
import { useBook } from '../context/BookContext';
import {
  TEACH_STAGE_ORDER,
  TeachStageId,
  CLASSROOM_PHRASES,
  CLASSROOM_SITUATION_LABELS,
  ClassroomSituationId,
  FOLLOWUP_GROUP_LABELS,
  FollowUpGroupId,
  QUICK_FOLLOWUPS,
  getTeachLessonScript,
  TeachSimPromptItem
} from '../data/teachEnglishData';
import {
  ProjectorSyncState,
  PublicLiveSessionState,
  publishProjectorState,
  checkLiveBackendHealth,
  runLiveSyncRoundtripSelfTest,
  createLivePollSession,
  controlLivePollSession,
  subscribeLivePollSession
} from '../services/teachSyncService';
import { TeachProjectorStage } from './TeachProjectorStage';
import { Debugger3DLab } from './lesson30/Debugger3DLab';

export const TeachInEnglishStudio: React.FC = () => {
  const {
    showTeachEnglishModal,
    closeTeachEnglish,
    currentLessonId,
    currentPage,
    setCurrentPage,
    bilingualMode,
    speakAtRate,
    stopSpeaking,
    isSpeaking,
    dispatchTeachSimCommand,
    teachSimSnapshot
  } = useBook();

  const isVi = bilingualMode !== 'en';
  const script = useMemo(() => getTeachLessonScript(currentLessonId), [currentLessonId]);

  const [stage, setStage] = useState<TeachStageId>('warmup');
  const [layoutMode, setLayoutMode] = useState<'split' | 'teacher' | 'projector'>('split');

  // Teacher side panel tabs in Discussion / Phrase bank
  const [phraseSearch, setPhraseSearch] = useState<string>('');
  const [selectedSituation, setSelectedSituation] = useState<ClassroomSituationId | 'all'>('all');
  const [selectedFollowUpGroup, setSelectedFollowUpGroup] = useState<FollowUpGroupId>('evidence');

  // Active selected artifacts
  const [selectedPromptId, setSelectedPromptId] = useState<string>(() => script.prompts[0]?.id || '');
  const [activeFollowUpId, setActiveFollowUpId] = useState<string | null>(QUICK_FOLLOWUPS[0]?.id || null);
  const [pairRolesSwapped, setPairRolesSwapped] = useState<boolean>(false);
  const [selectedExitFrameId, setSelectedExitFrameId] = useState<string>(() => script.exitTicketFrames[0]?.id || '');

  // Projector progressive reveal toggles (all OFF by default!)
  const [revealMeaning, setRevealMeaning] = useState<boolean>(false);
  const [revealKeywords, setRevealKeywords] = useState<boolean>(false);
  const [revealStarter, setRevealStarter] = useState<boolean>(false);
  const [revealFullSample, setRevealFullSample] = useState<boolean>(false);
  const [revealExplanation, setRevealExplanation] = useState<boolean>(false);

  // Embedded Lesson 30 3D lab visibility in Step 2 Hands-on
  const [showInline3DSim, setShowInline3DSim] = useState<boolean>(true);

  // Polling state: In-Class Hand-Raise vs Live QR Server Sync
  const [pollMode, setPollMode] = useState<'in_class' | 'live_qr'>('in_class');
  const [selectedPollIdx, setSelectedPollIdx] = useState<number>(0);
  const [inClassTallies, setInClassTallies] = useState<Record<string, Record<string, number>>>({});
  const [inClassShowResults, setInClassShowResults] = useState<boolean>(false);
  const [inClassQuestionOpen, setInClassQuestionOpen] = useState<boolean>(true);

  // Live QR Session state
  const [serverHealth, setServerHealth] = useState<{ checked: boolean; available: boolean }>({
    checked: false,
    available: false
  });
  const [syncVerified, setSyncVerified] = useState<{
    checked: boolean;
    ok: boolean;
    messageVi: string;
    messageEn: string;
  }>({ checked: false, ok: false, messageVi: '', messageEn: '' });
  const [verifyingSync, setVerifyingSync] = useState<boolean>(false);
  const [liveSession, setLiveSession] = useState<PublicLiveSessionState | null>(null);
  const [hostToken, setHostToken] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [liveError, setLiveError] = useState<string | null>(null);
  const [copiedJoinUrl, setCopiedJoinUrl] = useState<boolean>(false);

  // Reset stage selections cleanly when lesson changes or modal opens
  useEffect(() => {
    if (!showTeachEnglishModal) return;
    setStage('warmup');
    setSelectedPromptId(script.prompts[0]?.id || '');
    setSelectedExitFrameId(script.exitTicketFrames[0]?.id || '');
    setSelectedPollIdx(0);
    setPairRolesSwapped(false);
    setRevealMeaning(false);
    setRevealKeywords(false);
    setRevealStarter(false);
    setRevealFullSample(false);
    setRevealExplanation(false);
    setInClassShowResults(false);
    setInClassQuestionOpen(true);

    checkLiveBackendHealth().then((h) => {
      setServerHealth({ checked: true, available: h.available });
    });
  }, [showTeachEnglishModal, script]);

  // Subscribe to SSE updates when a live QR session is active
  useEffect(() => {
    if (!liveSession?.sessionId) return;
    const unsub = subscribeLivePollSession(
      liveSession.sessionId,
      (nextState) => {
        setLiveSession(nextState);
      },
      (err) => setLiveError(err)
    );
    return unsub;
  }, [liveSession?.sessionId]);

  const activePrompt: TeachSimPromptItem | null = useMemo(() => {
    return (
      script.prompts.find((p) => p.id === selectedPromptId) ||
      script.prompts.find((p) => p.stage === stage) ||
      script.prompts[0] ||
      null
    );
  }, [script.prompts, selectedPromptId, stage]);

  const activeFollowUp = useMemo(() => {
    return QUICK_FOLLOWUPS.find((f) => f.id === activeFollowUpId) || null;
  }, [activeFollowUpId]);

  const activeExitFrame = useMemo(() => {
    return (
      script.exitTicketFrames.find((f) => f.id === selectedExitFrameId) ||
      script.exitTicketFrames[0] ||
      null
    );
  }, [script.exitTicketFrames, selectedExitFrameId]);

  const activePollQuestion = script.pollQuestions[selectedPollIdx] || script.pollQuestions[0] || null;

  const liveJoinUrl = useMemo(() => {
    if (!liveSession?.sessionId || typeof window === 'undefined') return '';
    return `${window.location.origin}/?liveSession=${liveSession.sessionId}`;
  }, [liveSession?.sessionId]);

  // Generate QR code image whenever liveJoinUrl updates
  useEffect(() => {
    if (!liveJoinUrl) {
      setQrDataUrl('');
      return;
    }
    QRCode.toDataURL(liveJoinUrl, { width: 220, margin: 1 })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(''));
  }, [liveJoinUrl]);

  // Publish synchronized Projector state on every change
  const projectorState: ProjectorSyncState = useMemo(() => {
    const qId = activePollQuestion?.id || '';
    const liveQ = liveSession?.questions[liveSession.activeQuestionIndex];
    const talliesForQ =
      pollMode === 'live_qr' && liveSession && liveQ
        ? liveSession.tallies[liveQ.id] || {}
        : inClassTallies[qId] || {};
    const totalVotes = Object.values(talliesForQ).reduce((sum, n) => sum + Number(n || 0), 0);

    const projectedExit =
      liveSession?.projectedExitResponseId
        ? liveSession.exitTicketResponses.find(
            (r) => r.id === liveSession.projectedExitResponseId
          ) || null
        : null;

    return {
      channelId: 'default',
      isOpen: showTeachEnglishModal,
      lessonId: currentLessonId,
      lessonTitleEn: script.titleEn,
      lessonTitleVi: script.titleVi,
      stage,
      sectionIndex: activePrompt?.sectionIndex ?? script.stages[stage].defaultSectionIndex,
      activePrompt,
      activeFollowUp: stage === 'discussion' ? activeFollowUp : null,
      activePairDialogue: stage === 'discussion' ? script.pairDialogue : null,
      pairRolesSwapped,
      activeExitFrame,
      projectedExitResponse: projectedExit ? { id: projectedExit.id, text: projectedExit.text } : null,
      activePoll:
        activePollQuestion
          ? {
              question: activePollQuestion,
              mode: pollMode,
              tallies: talliesForQ,
              totalVotes,
              isQuestionOpen:
                pollMode === 'live_qr' && liveSession
                  ? liveSession.isQuestionOpen
                  : inClassQuestionOpen,
              showResults:
                pollMode === 'live_qr' && liveSession
                  ? liveSession.showResults
                  : inClassShowResults,
              liveJoinUrl: pollMode === 'live_qr' ? liveJoinUrl : undefined,
              liveSessionId: pollMode === 'live_qr' ? liveSession?.sessionId : undefined,
              liveQrDataUrl: pollMode === 'live_qr' && syncVerified.ok ? qrDataUrl : undefined
            }
          : null,
      revealMeaning,
      revealKeywords,
      revealStarter,
      revealFullSample,
      revealExplanation,
      simStatus: teachSimSnapshot.status,
      simLabelEn: teachSimSnapshot.labelEn,
      updatedAt: Date.now()
    };
  }, [
    activeExitFrame,
    activeFollowUp,
    activePollQuestion,
    activePrompt,
    currentLessonId,
    inClassQuestionOpen,
    inClassShowResults,
    inClassTallies,
    liveJoinUrl,
    liveSession,
    pairRolesSwapped,
    pollMode,
    qrDataUrl,
    revealExplanation,
    revealFullSample,
    revealKeywords,
    revealMeaning,
    revealStarter,
    script,
    showTeachEnglishModal,
    stage,
    syncVerified.ok,
    teachSimSnapshot
  ]);

  useEffect(() => {
    if (showTeachEnglishModal) {
      publishProjectorState(projectorState);
    }
  }, [projectorState, showTeachEnglishModal]);

  const handleCloseStudio = () => {
    publishProjectorState({ ...projectorState, isOpen: false, updatedAt: Date.now() });
    closeTeachEnglish();
  };

  if (!showTeachEnglishModal) {
    return null;
  }

  const handleStageChange = (nextStage: TeachStageId) => {
    setStage(nextStage);
    const matching = script.prompts.find((p) => p.stage === nextStage);
    if (matching) {
      setSelectedPromptId(matching.id);
    }
    // Keep reveals clean when moving to next stage
    setRevealExplanation(false);
    setRevealFullSample(false);
  };

  const handleSelectPrompt = (p: TeachSimPromptItem) => {
    setSelectedPromptId(p.id);
    setRevealExplanation(false);
    setRevealFullSample(false);
    setCurrentPage(p.sectionIndex);
    if (p.simMode) {
      dispatchTeachSimCommand(`mode:${p.simMode}`);
    }
  };

  const handlePauseAndProjectPrediction = () => {
    dispatchTeachSimCommand('pause');
    if (activePrompt?.simMode) {
      dispatchTeachSimCommand(`mode:${activePrompt.simMode}`);
    }
    if (activePrompt?.targetLine === 9) {
      dispatchTeachSimCommand('jump:line9');
    }
    setRevealExplanation(false);
    setRevealFullSample(false);
  };

  const handleOpenExplanation = () => {
    setRevealExplanation(true);
  };

  const handleAdjustInClassTally = (optionId: string, delta: number) => {
    if (!activePollQuestion) return;
    const qId = activePollQuestion.id;
    setInClassTallies((prev) => {
      const currentQ = prev[qId] || {};
      const nextVal = Math.max(0, (currentQ[optionId] || 0) + delta);
      return {
        ...prev,
        [qId]: { ...currentQ, [optionId]: nextVal }
      };
    });
  };

  const handleVerifyAndStartLiveSession = async () => {
    setVerifyingSync(true);
    setLiveError(null);
    const check = await runLiveSyncRoundtripSelfTest();
    setSyncVerified({
      checked: true,
      ok: check.ok,
      messageVi: check.messageVi,
      messageEn: check.messageEn
    });

    if (!check.ok) {
      setVerifyingSync(false);
      setPollMode('in_class');
      return;
    }

    try {
      const created = await createLivePollSession({
        lessonId: currentLessonId,
        lessonTitleEn: script.titleEn,
        lessonTitleVi: script.titleVi,
        questions: script.pollQuestions,
        exitTicketPromptEn: activeExitFrame?.frameEn || 'One bug I found today was … I fixed it by …',
        exitTicketPromptVi: activeExitFrame?.frameVi || 'Một lỗi em phát hiện hôm nay là …'
      });
      setLiveSession(created.state);
      setHostToken(created.hostToken);
      setPollMode('live_qr');
    } catch (err) {
      setLiveError((err as Error).message);
      setPollMode('in_class');
    } finally {
      setVerifyingSync(false);
    }
  };

  const handleLiveControl = async (payload: Record<string, unknown>) => {
    if (!liveSession || !hostToken) return;
    setLiveError(null);
    try {
      const next = await controlLivePollSession(liveSession.sessionId, hostToken, payload);
      setLiveSession(next);
    } catch (err) {
      setLiveError((err as Error).message);
    }
  };

  const handleSelectPollQuestion = async (idx: number) => {
    setSelectedPollIdx(idx);
    if (pollMode === 'live_qr' && liveSession && hostToken && liveSession.status === 'active') {
      await handleLiveControl({ action: 'set_question', questionIndex: idx, openImmediately: true });
    } else {
      setInClassShowResults(false);
    }
  };

  const handleCopyJoinUrl = async () => {
    if (!liveJoinUrl) return;
    try {
      await navigator.clipboard.writeText(liveJoinUrl);
      setCopiedJoinUrl(true);
      setTimeout(() => setCopiedJoinUrl(false), 1800);
    } catch {
      // ignore clipboard permissions
    }
  };

  const filteredPhrases = CLASSROOM_PHRASES.filter((phrase) => {
    const matchesSituation =
      selectedSituation === 'all' || phrase.situation === selectedSituation;
    const q = phraseSearch.trim().toLowerCase();
    const matchesSearch =
      !q ||
      phrase.en.toLowerCase().includes(q) ||
      phrase.vi.toLowerCase().includes(q) ||
      phrase.tags.some((t) => t.toLowerCase().includes(q));
    return matchesSituation && matchesSearch;
  });

  const activeStageMeta = script.stages[stage];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="shrink-0 bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 font-bold text-sm">
            EN
          </div>
          <div className="min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-white truncate">
              {isVi ? 'Dạy học bằng tiếng Anh' : 'Teach in English Studio'} · {isVi ? script.titleVi : script.titleEn}
            </h2>
            <p className="text-xs text-slate-400 truncate">
              {isVi
                ? `Đang mở từ Bài ${currentLessonId}, Phần ${currentPage + 1} (Đóng sẽ quay về đúng vị trí này)`
                : `Opened from Lesson ${currentLessonId}, Section ${currentPage + 1} (Restores exact position on exit)`}
            </p>
          </div>
        </div>

        {/* Layout Mode + Dual Window + Close */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg text-xs">
            {(
              [
                { id: 'split', vi: '2 màn hình', en: 'Dual View' },
                { id: 'teacher', vi: 'Màn hình GV', en: 'Teacher' },
                { id: 'projector', vi: 'Máy chiếu', en: 'Projector' }
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setLayoutMode(m.id)}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer whitespace-nowrap ${
                  layoutMode === m.id
                    ? 'bg-sky-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isVi ? m.vi : m.en}
              </button>
            ))}
          </div>

          <a
            href="/?teachProjector=1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sky-300 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap"
            title={isVi ? 'Mở màn hình chiếu đồng bộ ở tab / màn hình thứ hai' : 'Open synchronized projector window'}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isVi ? 'Mở máy chiếu riêng' : 'Pop-out Projector'}
            </span>
          </a>

          {isSpeaking && (
            <button
              type="button"
              onClick={stopSpeaking}
              className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap"
            >
              <VolumeX className="w-3.5 h-3.5" />
              <span>{isVi ? 'Dừng đọc' : 'Stop TTS'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCloseStudio}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <X className="w-4 h-4" />
            <span>{isVi ? 'Đóng chế độ dạy' : 'Exit Teach Mode'}</span>
          </button>
        </div>
      </header>

      {/* 4-Step Lesson Timeline Bar */}
      <nav className="shrink-0 bg-slate-900/95 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {TEACH_STAGE_ORDER.map((sId) => {
            const meta = script.stages[sId];
            const active = stage === sId;
            return (
              <button
                key={sId}
                type="button"
                onClick={() => handleStageChange(sId)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {isVi ? meta.labelVi : meta.labelEn}
              </button>
            );
          })}
        </div>

        {/* Quick Projector Reveal Controls */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 mr-1 hidden xl:inline">
            {isVi ? 'Hiện trên máy chiếu:' : 'Projector reveals:'}
          </span>
          {[
            {
              key: 'meaning',
              active: revealMeaning,
              toggle: () => setRevealMeaning((v) => !v),
              vi: 'Nghĩa VI',
              en: 'VI Meaning'
            },
            {
              key: 'keywords',
              active: revealKeywords,
              toggle: () => setRevealKeywords((v) => !v),
              vi: 'Từ khóa',
              en: 'Keywords'
            },
            {
              key: 'starter',
              active: revealStarter,
              toggle: () => setRevealStarter((v) => !v),
              vi: 'Câu mở đầu',
              en: 'Starter'
            },
            {
              key: 'sample',
              active: revealFullSample,
              toggle: () => setRevealFullSample((v) => !v),
              vi: 'Câu mẫu đầy đủ',
              en: 'Full Sample'
            },
            {
              key: 'explanation',
              active: revealExplanation,
              toggle: () => setRevealExplanation((v) => !v),
              vi: 'Giải thích',
              en: 'Explanation'
            }
          ].map((ctl) => (
            <button
              key={ctl.key}
              type="button"
              onClick={ctl.toggle}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer whitespace-nowrap border transition-colors ${
                ctl.active
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {ctl.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{isVi ? ctl.vi : ctl.en}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Dual Screen Workspace */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 dark:bg-slate-950">
        <div
          className={`max-w-[1720px] mx-auto grid gap-6 items-start ${
            layoutMode === 'split' ? 'grid-cols-1 xl:grid-cols-12' : 'grid-cols-1'
          }`}
        >
          {/* LEFT: TEACHER CONTROL CONSOLE */}
          {layoutMode !== 'projector' && (
            <div
              className={`${
                layoutMode === 'split' ? 'xl:col-span-6' : 'max-w-5xl mx-auto w-full'
              } space-y-5`}
            >
              {/* Stage Goal & Context */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                      {isVi ? 'Màn hình Giáo viên (Riêng tư)' : 'Teacher Console (Private Notes & Controls)'}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {isVi ? activeStageMeta.labelVi : activeStageMeta.labelEn}
                    </h3>
                  </div>

                  {activePrompt && (
                    <button
                      type="button"
                      onClick={() => setCurrentPage(activePrompt.sectionIndex)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>
                        {isVi
                          ? `Đồng bộ Mục ${activePrompt.sectionIndex + 1} trong sách`
                          : `Sync Section ${activePrompt.sectionIndex + 1}`}
                      </span>
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {isVi ? activeStageMeta.goalVi : activeStageMeta.goalEn}
                </p>

                {/* Prompt selector tabs for this lesson */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {script.prompts.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectPrompt(p)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                        activePrompt?.id === p.id
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {isVi ? `Câu ${idx + 1} (Mục ${p.sectionIndex + 1})` : `Prompt ${idx + 1} (Sec ${p.sectionIndex + 1})`}
                    </button>
                  ))}
                </div>

                {/* Teacher Private Card for Active Prompt */}
                {activePrompt && (stage === 'warmup' || stage === 'hands_on') && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-slate-900 dark:text-white">
                          🇬🇧 {activePrompt.questionEn}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          🇻🇳 {activePrompt.questionVi}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => speakAtRate(activePrompt.questionEn, 'en', 1.0)}
                          className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          title={isVi ? 'Đọc tiếng Anh tốc độ thường (1.0x)' : 'Speak normal speed'}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>1.0x</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => speakAtRate(activePrompt.questionEn, 'en', 0.7)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold cursor-pointer"
                          title={isVi ? 'Đọc tiếng Anh tốc độ chậm (0.7x)' : 'Speak slow speed'}
                        >
                          0.7x
                        </button>
                      </div>
                    </div>

                    {activePrompt.variableWatchNoteVi && (
                      <div className="text-xs text-sky-700 dark:text-sky-300 font-medium">
                        {isVi ? activePrompt.variableWatchNoteVi : activePrompt.variableWatchNoteEn}
                      </div>
                    )}

                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-1 text-amber-900 dark:text-amber-200">
                      <div className="font-bold">
                        {isVi ? 'Gợi ý đáp án & sư phạm cho giáo viên:' : 'Teacher Guide & Answer Hint:'}
                      </div>
                      <p>{isVi ? activePrompt.teacherHintVi : activePrompt.teacherHintEn}</p>
                      <p className="text-emerald-800 dark:text-emerald-300 font-medium pt-1">
                        {isVi ? `Đáp án: ${activePrompt.explanationVi}` : `Answer: ${activePrompt.explanationEn}`}
                      </p>
                    </div>

                    {/* Simulation Control Workflow (Pause -> Predict -> Step/Run -> Explain) */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5 text-sky-600" />
                          <span>
                            {isVi
                              ? 'Điều khiển mô phỏng 3D & trình gỡ lỗi'
                              : '3D Simulation & Debugger Controls'}
                          </span>
                        </span>
                        <span className="font-mono text-sky-700 dark:text-sky-300">
                          {isVi ? teachSimSnapshot.labelVi : teachSimSnapshot.labelEn}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePauseAndProjectPrediction}
                          className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Pause className="w-3.5 h-3.5" />
                          <span>
                            {isVi ? 'Dừng & Chiếu dự đoán' : 'Pause & Project Prediction'}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => dispatchTeachSimCommand('play')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Chạy tiếp' : 'Run'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => dispatchTeachSimCommand('step')}
                          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <StepForward className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Chạy từng bước' : 'Step'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => dispatchTeachSimCommand('reset')}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Đặt lại' : 'Reset'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleOpenExplanation}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Mở giải thích' : 'Open Explanation'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Live Lesson 30 3D Debugger stage right inside Step 2 Hands-on */}
                {stage === 'hands_on' && currentLessonId === 30 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {isVi ? 'Mô phỏng 3D Bài 30 (Liên kết trực tiếp nút điều khiển trên)' : 'Lesson 30 3D Debugger (Synced to controls above)'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowInline3DSim((v) => !v)}
                        className="text-xs font-semibold text-sky-600 hover:underline cursor-pointer"
                      >
                        {showInline3DSim ? (isVi ? 'Thu gọn 3D' : 'Hide 3D') : (isVi ? 'Hiện 3D' : 'Show 3D')}
                      </button>
                    </div>
                    {showInline3DSim && <Debugger3DLab initialMode={activePrompt?.simMode || 'euclid'} />}
                  </div>
                )}
              </div>

              {/* Stage 3 Controls: Pair Dialogue + Quick Follow-up Prompts + Live Poll */}
              {stage === 'discussion' && (
                <div className="space-y-5">
                  {/* Pair Dialogue Control */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {isVi ? script.pairDialogue.titleVi : script.pairDialogue.titleEn}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {isVi ? script.pairDialogue.teacherHintVi : script.pairDialogue.teacherHintEn}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPairRolesSwapped((s) => !s)}
                        className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                        <span>{isVi ? 'Đổi vai (Swap Roles)' : 'Swap Roles'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {[script.pairDialogue.roleA, script.pairDialogue.roleB].map((role, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5"
                        >
                          <div className="font-bold text-slate-900 dark:text-white">
                            {isVi ? role.labelVi : role.labelEn}
                          </div>
                          <p className="text-slate-600 dark:text-slate-300">
                            {isVi ? role.taskVi : role.taskEn}
                          </p>
                          <div className="pt-1 space-y-1 font-medium text-sky-700 dark:text-sky-300">
                            {role.promptLinesEn.map((line, i) => (
                              <div key={i} className="flex items-center justify-between gap-2">
                                <span>“{line}”</span>
                                <button
                                  type="button"
                                  onClick={() => speakAtRate(line, 'en', 0.85)}
                                  className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer shrink-0"
                                  title="Speak"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Follow-Up Prompts */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {isVi ? 'Câu phản hồi nhanh trên lớp' : 'Quick Follow-up Prompts'}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(FOLLOWUP_GROUP_LABELS) as FollowUpGroupId[]).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setSelectedFollowUpGroup(g)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                            selectedFollowUpGroup === g
                              ? 'bg-sky-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {isVi ? FOLLOWUP_GROUP_LABELS[g].vi : FOLLOWUP_GROUP_LABELS[g].en}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {QUICK_FOLLOWUPS.filter((f) => f.group === selectedFollowUpGroup).map((fu) => {
                        const isProj = activeFollowUpId === fu.id;
                        return (
                          <div
                            key={fu.id}
                            className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 ${
                              isProj
                                ? 'bg-sky-50 dark:bg-sky-950/30 border-sky-300 dark:border-sky-700'
                                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className="space-y-0.5 flex-1 min-w-[200px]">
                              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                {fu.en}
                              </div>
                              <div className="text-xs text-slate-600 dark:text-slate-300">{fu.vi}</div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => speakAtRate(fu.en, 'en', 1.0)}
                                className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-semibold cursor-pointer"
                              >
                                1.0x
                              </button>
                              <button
                                type="button"
                                onClick={() => speakAtRate(fu.en, 'en', 0.7)}
                                className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-semibold cursor-pointer"
                              >
                                0.7x
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveFollowUpId(isProj ? null : fu.id)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                                  isProj
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-sky-600 hover:bg-sky-700 text-white'
                                }`}
                              >
                                {isProj
                                  ? isVi ? 'Đang chiếu' : 'Projected'
                                  : isVi ? 'Chiếu câu' : 'Project'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Classroom Polling Section */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-emerald-600" />
                          <span>{isVi ? 'Bình chọn trực tiếp trong tiết học' : 'Classroom Live Poll'}</span>
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {isVi
                            ? 'Phục vụ tiết học hiện tại · Không dùng để tính điểm quiz hay cấp chứng chỉ.'
                            : 'For live class engagement only · Does not count toward quiz scores or certificates.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                        <button
                          type="button"
                          onClick={() => setPollMode('in_class')}
                          className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer ${
                            pollMode === 'in_class'
                              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <Users className="w-3.5 h-3.5 inline mr-1" />
                          {isVi ? 'Bình chọn tại lớp' : 'In-Class Tally'}
                        </button>
                        <button
                          type="button"
                          onClick={handleVerifyAndStartLiveSession}
                          disabled={verifyingSync || (serverHealth.checked && !serverHealth.available)}
                          className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer disabled:opacity-50 ${
                            pollMode === 'live_qr'
                              ? 'bg-emerald-600 text-white'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                          }`}
                        >
                          <QrCode className="w-3.5 h-3.5 inline mr-1" />
                          {verifyingSync
                            ? (isVi ? 'Đang kiểm thử...' : 'Testing...')
                            : (isVi ? 'Phiên QR trực tiếp' : 'Live QR Session')}
                        </button>
                      </div>
                    </div>

                    {syncVerified.checked && (
                      <div
                        className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                          syncVerified.ok
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                            : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 shrink-0" />
                        <span>{isVi ? syncVerified.messageVi : syncVerified.messageEn}</span>
                      </div>
                    )}

                    {liveError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                        {liveError}
                      </div>
                    )}

                    {/* Poll Question Selector */}
                    <div className="flex flex-wrap gap-2">
                      {script.pollQuestions.map((pq, idx) => (
                        <button
                          key={pq.id}
                          type="button"
                          onClick={() => handleSelectPollQuestion(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                            selectedPollIdx === idx
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {isVi ? `Câu bình chọn ${idx + 1}` : `Poll Q${idx + 1}`}
                        </button>
                      ))}
                    </div>

                    {/* Mode A: In-class hand-raise counts */}
                    {pollMode === 'in_class' && activePollQuestion && (
                      <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                          {activePollQuestion.questionEn}
                        </div>
                        <div className="text-xs text-slate-500">{activePollQuestion.questionVi}</div>

                        <div className="space-y-2">
                          {activePollQuestion.options.map((opt) => {
                            const count = inClassTallies[activePollQuestion.id]?.[opt.id] || 0;
                            return (
                              <div
                                key={opt.id}
                                className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                              >
                                <span className="font-medium text-slate-800 dark:text-slate-200">
                                  {opt.labelEn}
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => handleAdjustInClassTally(opt.id, -1)}
                                    className="w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 font-bold cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="w-8 text-center font-mono font-bold tabular-nums">
                                    {count}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleAdjustInClassTally(opt.id, 1)}
                                    className="w-7 h-7 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-bold cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setInClassQuestionOpen((o) => !o)}
                            className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-xs font-semibold cursor-pointer"
                          >
                            {inClassQuestionOpen
                              ? (isVi ? 'Khóa bình chọn câu này' : 'Close Question')
                              : (isVi ? 'Mở lại bình chọn' : 'Re-open Question')}
                          </button>
                          <button
                            type="button"
                            onClick={() => setInClassShowResults((r) => !r)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                              inClassShowResults
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                          >
                            {inClassShowResults
                              ? (isVi ? 'Ẩn kết quả trên máy chiếu' : 'Hide Results')
                              : (isVi ? 'Hiện kết quả' : 'Show Results')}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Mode B: Live QR Server-Synced Session */}
                    {pollMode === 'live_qr' && liveSession && syncVerified.ok && (
                      <div className="space-y-3 p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="font-bold text-emerald-900 dark:text-emerald-200">
                              {isVi ? 'Mã phiên:' : 'Session Code:'}{' '}
                              <span className="font-mono text-sm">{liveSession.sessionId}</span>
                            </span>
                            <span className="ml-2 text-slate-600 dark:text-slate-300">
                              ({liveSession.status === 'active'
                                ? isVi ? 'Đang mở' : 'Active'
                                : isVi ? 'Đã đóng' : 'Closed'})
                            </span>
                          </div>
                          <div className="font-mono font-bold tabular-nums text-emerald-800 dark:text-emerald-300">
                            {isVi ? 'Lượt trả lời:' : 'Responses:'}{' '}
                            {liveSession.totalVotesByQuestion[
                              liveSession.questions[liveSession.activeQuestionIndex]?.id
                            ] ?? 0}
                          </div>
                        </div>

                        {liveJoinUrl && (
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              type="text"
                              readOnly
                              value={liveJoinUrl}
                              className="flex-1 min-w-[180px] px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-[11px]"
                            />
                            <button
                              type="button"
                              onClick={handleCopyJoinUrl}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              {copiedJoinUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedJoinUrl ? (isVi ? 'Đã chép' : 'Copied') : (isVi ? 'Chép link' : 'Copy Link')}</span>
                            </button>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            type="button"
                            disabled={liveSession.status !== 'active'}
                            onClick={() =>
                              handleLiveControl({
                                action: liveSession.isQuestionOpen ? 'close_question' : 'open_question'
                              })
                            }
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white font-semibold cursor-pointer"
                          >
                            {liveSession.isQuestionOpen
                              ? (isVi ? 'Đóng câu hỏi' : 'Close Question')
                              : (isVi ? 'Mở câu hỏi' : 'Open Question')}
                          </button>

                          <button
                            type="button"
                            disabled={liveSession.status !== 'active'}
                            onClick={() =>
                              handleLiveControl({
                                action: 'toggle_results',
                                showResults: !liveSession.showResults
                              })
                            }
                            className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer disabled:opacity-40 ${
                              liveSession.showResults
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                          >
                            {liveSession.showResults
                              ? (isVi ? 'Ẩn kết quả trên máy chiếu' : 'Hide Results')
                              : (isVi ? 'Hiện kết quả' : 'Show Results')}
                          </button>

                          {liveSession.status === 'active' && (
                            <button
                              type="button"
                              onClick={() => handleLiveControl({ action: 'close_session' })}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span>{isVi ? 'Kết thúc phiên' : 'End Session'}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Stage 4 Controls: Exit Ticket Picker & Incoming Student Responses */}
              {stage === 'wrap_up' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <MessageSquareQuote className="w-4 h-4 text-sky-600" />
                      <span>{isVi ? 'Phiếu cuối tiết (Exit Ticket)' : 'Wrap-up Exit Ticket'}</span>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isVi
                        ? 'Chọn 1 câu ngắn để học sinh nói hoặc viết bằng tiếng Anh cuối giờ.'
                        : 'Select one short English frame for students to speak or submit.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {script.exitTicketFrames.map((frame) => {
                      const active = activeExitFrame?.id === frame.id;
                      return (
                        <button
                          key={frame.id}
                          type="button"
                          onClick={() => setSelectedExitFrameId(frame.id)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-colors cursor-pointer space-y-1 ${
                            active
                              ? 'bg-sky-50 dark:bg-sky-950/30 border-sky-400'
                              : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <div className="text-sm font-bold text-slate-900 dark:text-white">
                            “{frame.frameEn}”
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-300">
                            🇻🇳 {frame.frameVi}
                          </div>
                          <div className="text-xs text-emerald-700 dark:text-emerald-300 pt-1">
                            {isVi ? `Mẫu: ${frame.sampleEn}` : `Sample: ${frame.sampleEn}`}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Live Exit Ticket Responses Control */}
                  {liveSession && syncVerified.ok && (
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {isVi
                            ? `Phản hồi phiếu cuối tiết (${liveSession.exitTicketResponses.length})`
                            : `Live Exit Ticket Responses (${liveSession.exitTicketResponses.length})`}
                        </span>
                        <button
                          type="button"
                          disabled={liveSession.status !== 'active'}
                          onClick={() =>
                            handleLiveControl({
                              action: liveSession.isExitTicketOpen
                                ? 'close_exit_ticket'
                                : 'open_exit_ticket',
                              promptEn: activeExitFrame?.frameEn,
                              promptVi: activeExitFrame?.frameVi
                            })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer disabled:opacity-40 ${
                            liveSession.isExitTicketOpen
                              ? 'bg-amber-600 text-white'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {liveSession.isExitTicketOpen
                            ? (isVi ? 'Đóng gửi phiếu' : 'Close Submissions')
                            : (isVi ? 'Mở phiếu cho HS gửi' : 'Open Exit Ticket')}
                        </button>
                      </div>

                      {liveSession.exitTicketResponses.length > 0 && (
                        <div className="space-y-2 max-h-52 overflow-y-auto">
                          {liveSession.exitTicketResponses.map((resp) => {
                            const isProjected = liveSession.projectedExitResponseId === resp.id;
                            return (
                              <div
                                key={resp.id}
                                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-xs"
                              >
                                <span className="text-slate-800 dark:text-slate-100 font-medium">
                                  “{resp.text}”
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleLiveControl({
                                      action: 'project_exit_response',
                                      responseId: isProjected ? null : resp.id
                                    })
                                  }
                                  className={`px-2.5 py-1 rounded-lg font-bold shrink-0 cursor-pointer ${
                                    isProjected
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-sky-600 hover:bg-sky-700 text-white'
                                  }`}
                                >
                                  {isProjected
                                    ? (isVi ? 'Đang chiếu' : 'Projected')
                                    : (isVi ? 'Chiếu câu này' : 'Project')}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Classroom Command Phrase Bank (Always accessible on Teacher Console) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-600" />
                    <span>{isVi ? 'Kho câu lệnh lớp học (Tình huống & Phát âm)' : 'Classroom Command Phrase Bank'}</span>
                  </h4>
                  <div className="relative w-full sm:w-56">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={phraseSearch}
                      onChange={(e) => setPhraseSearch(e.target.value)}
                      placeholder={isVi ? 'Tìm câu lệnh...' : 'Search phrases...'}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Situation Tabs */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSituation('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                      selectedSituation === 'all'
                        ? 'bg-slate-900 dark:bg-sky-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isVi ? 'Tất cả' : 'All'}
                  </button>
                  {(Object.keys(CLASSROOM_SITUATION_LABELS) as ClassroomSituationId[]).map((sit) => (
                    <button
                      key={sit}
                      type="button"
                      onClick={() => setSelectedSituation(sit)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        selectedSituation === sit
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {isVi ? CLASSROOM_SITUATION_LABELS[sit].vi : CLASSROOM_SITUATION_LABELS[sit].en}
                    </button>
                  ))}
                </div>

                {/* Phrase List */}
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {filteredPhrases.map((phrase) => (
                    <div
                      key={phrase.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div className="space-y-0.5 flex-1 min-w-[200px]">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {phrase.en}
                        </div>
                        <div className="text-xs text-slate-600 dark:text-slate-300">
                          {phrase.vi}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {isVi ? phrase.tipVi : phrase.tipEn}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => speakAtRate(phrase.en, 'en', 1.0)}
                          className="px-2.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          title={isVi ? 'Đọc tốc độ thường (1.0x)' : 'Speak normal (1.0x)'}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Thường' : 'Normal'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => speakAtRate(phrase.en, 'en', 0.7)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold cursor-pointer"
                          title={isVi ? 'Đọc chậm cho học sinh (0.7x)' : 'Speak slow (0.7x)'}
                        >
                          {isVi ? 'Chậm 0.7x' : 'Slow 0.7x'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* RIGHT: SYNCHRONIZED PROJECTOR SCREEN */}
          {layoutMode !== 'teacher' && (
            <div
              className={`${
                layoutMode === 'split' ? 'xl:col-span-6 xl:sticky xl:top-0' : 'max-w-5xl mx-auto w-full'
              } space-y-2`}
            >
              <div className="flex items-center justify-between text-xs px-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MonitorPlay className="w-4 h-4 text-sky-600" />
                  <span>
                    {isVi
                      ? 'Màn hình trình chiếu (Mặc định chỉ tiếng Anh)'
                      : 'Synchronized Projector Screen (English-Only Default)'}
                  </span>
                </span>
                <span className="text-slate-500 font-mono">
                  {isVi ? 'Đồng bộ thời gian thực' : 'Live Synced'}
                </span>
              </div>

              <TeachProjectorStage
                state={projectorState}
                onSpeakEn={(txt, rate) => speakAtRate(txt, 'en', rate)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
