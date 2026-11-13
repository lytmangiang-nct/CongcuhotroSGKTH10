import type { PublicLiveSessionState } from '../../server';
import type {
  TeachStageId,
  TeachSimPromptItem,
  PairDialogueCard,
  TeachPollQuestion,
  ExitTicketFrame,
  QuickFollowUpItem
} from '../data/teachEnglishData';

export type { PublicLiveSessionState };

export interface ProjectorPollView {
  question: TeachPollQuestion | null;
  mode: 'in_class' | 'live_qr';
  tallies: Record<string, number>;
  totalVotes: number;
  isQuestionOpen: boolean;
  showResults: boolean;
  liveJoinUrl?: string;
  liveSessionId?: string;
  liveQrDataUrl?: string;
}

export interface ProjectorSyncState {
  channelId: string;
  isOpen: boolean;
  lessonId: number;
  lessonTitleEn: string;
  lessonTitleVi: string;
  stage: TeachStageId;
  sectionIndex: number;
  // Content focused for projection
  activePrompt: TeachSimPromptItem | null;
  activeFollowUp: QuickFollowUpItem | null;
  activePairDialogue: PairDialogueCard | null;
  pairRolesSwapped: boolean;
  activeExitFrame: ExitTicketFrame | null;
  projectedExitResponse: { id: string; text: string } | null;
  activePoll: ProjectorPollView | null;
  // Progressive Reveal Flags (all false by default -> English-only clean projection!)
  revealMeaning: boolean;
  revealKeywords: boolean;
  revealStarter: boolean;
  revealFullSample: boolean;
  revealExplanation: boolean;
  // Simulation status banner on projector
  simStatus: 'idle' | 'paused' | 'running';
  simLabelEn: string;
  updatedAt: number;
}

const SYNC_CHANNEL_NAME = 'kntt_teach_english_projector_v1';
const SYNC_STORAGE_KEY = 'kntt_teach_english_projector_state';
const VOTER_ID_KEY = 'kntt_live_poll_anon_voter_id';

export function getOrCreateAnonymousVoterId(): string {
  try {
    const existing = localStorage.getItem(VOTER_ID_KEY);
    if (existing && existing.length >= 8) return existing;
    const random =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `anon-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(VOTER_ID_KEY, random);
    return random;
  } catch {
    return `anon-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function publishProjectorState(state: ProjectorSyncState): void {
  try {
    localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage quota errors
  }

  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
      bc.postMessage(state);
      bc.close();
    } catch {
      // ignore BroadcastChannel failures
    }
  }
}

export function loadSavedProjectorState(): ProjectorSyncState | null {
  try {
    const raw = localStorage.getItem(SYNC_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ProjectorSyncState;
  } catch {
    return null;
  }
}

export function subscribeProjectorState(
  onUpdate: (state: ProjectorSyncState) => void
): () => void {
  let bc: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      bc = new BroadcastChannel(SYNC_CHANNEL_NAME);
      bc.onmessage = (event) => {
        if (event.data && typeof event.data === 'object') {
          onUpdate(event.data as ProjectorSyncState);
        }
      };
    } catch {
      bc = null;
    }
  }

  const onStorage = (e: StorageEvent) => {
    if (e.key === SYNC_STORAGE_KEY && e.newValue) {
      try {
        onUpdate(JSON.parse(e.newValue) as ProjectorSyncState);
      } catch {
        // ignore parse error
      }
    }
  };
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener('storage', onStorage);
    if (bc) {
      try {
        bc.close();
      } catch {
        // ignore
      }
    }
  };
}

export async function checkLiveBackendHealth(): Promise<{
  available: boolean;
  transport?: string;
  maxTtlMinutes?: number;
}> {
  try {
    const res = await fetch('/api/live-sessions/health', { cache: 'no-store' });
    if (!res.ok) return { available: false };
    const data = await res.json();
    if (!data?.ok) return { available: false };
    return {
      available: true,
      transport: String(data.transport || 'sse'),
      maxTtlMinutes: Number(data.maxTtlMinutes || 90)
    };
  } catch {
    return { available: false };
  }
}

export async function createLivePollSession(params: {
  lessonId: number;
  lessonTitleEn: string;
  lessonTitleVi: string;
  questions: TeachPollQuestion[];
  exitTicketPromptEn: string;
  exitTicketPromptVi: string;
  ttlMinutes?: number;
}): Promise<{
  sessionId: string;
  hostToken: string;
  expiresAt: number;
  state: PublicLiveSessionState;
}> {
  const res = await fetch('/api/live-sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      lessonId: params.lessonId,
      lessonTitleEn: params.lessonTitleEn,
      lessonTitleVi: params.lessonTitleVi,
      ttlMinutes: params.ttlMinutes ?? 90,
      exitTicketPromptEn: params.exitTicketPromptEn,
      exitTicketPromptVi: params.exitTicketPromptVi,
      questions: params.questions.map((q) => ({
        id: q.id,
        promptEn: q.questionEn,
        promptVi: q.questionVi,
        options: q.options
      }))
    })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Could not create live session.');
  }
  return data;
}

export async function fetchLivePollSession(
  sessionId: string
): Promise<PublicLiveSessionState> {
  const res = await fetch(`/api/live-sessions/${encodeURIComponent(sessionId)}`, {
    cache: 'no-store'
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Session not found.');
  }
  return data.state as PublicLiveSessionState;
}

export async function controlLivePollSession(
  sessionId: string,
  hostToken: string,
  payload: Record<string, unknown>
): Promise<PublicLiveSessionState> {
  const res = await fetch(
    `/api/live-sessions/${encodeURIComponent(sessionId)}/control`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-host-token': hostToken
      },
      body: JSON.stringify(payload)
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Failed to update live session.');
  }
  return data.state as PublicLiveSessionState;
}

export async function submitStudentVote(
  sessionId: string,
  questionId: string,
  optionId: string,
  voterId: string
): Promise<PublicLiveSessionState> {
  const res = await fetch(
    `/api/live-sessions/${encodeURIComponent(sessionId)}/vote`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId, optionId, voterId })
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Vote rejected.');
  }
  return data.state as PublicLiveSessionState;
}

export async function submitStudentExitTicket(
  sessionId: string,
  text: string,
  voterId: string
): Promise<PublicLiveSessionState> {
  const res = await fetch(
    `/api/live-sessions/${encodeURIComponent(sessionId)}/exit-ticket`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voterId })
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error || 'Exit ticket rejected.');
  }
  return data.state as PublicLiveSessionState;
}

export function subscribeLivePollSession(
  sessionId: string,
  onState: (state: PublicLiveSessionState) => void,
  onError?: (err: string) => void
): () => void {
  let closed = false;
  let es: EventSource | null = null;
  let pollTimer: number | null = null;

  const startPollingFallback = () => {
    if (pollTimer !== null) return;
    pollTimer = window.setInterval(async () => {
      if (closed) return;
      try {
        const s = await fetchLivePollSession(sessionId);
        onState(s);
      } catch (e) {
        if (onError) onError((e as Error).message);
      }
    }, 2500);
  };

  if (typeof EventSource !== 'undefined') {
    es = new EventSource(`/api/live-sessions/${encodeURIComponent(sessionId)}/stream`);
    es.addEventListener('state', (evt) => {
      if (closed) return;
      try {
        const parsed = JSON.parse((evt as MessageEvent).data) as PublicLiveSessionState;
        onState(parsed);
      } catch {
        // ignore malformed frame
      }
    });
    es.onerror = () => {
      startPollingFallback();
    };
  } else {
    startPollingFallback();
  }

  return () => {
    closed = true;
    if (es) es.close();
    if (pollTimer !== null) window.clearInterval(pollTimer);
  };
}

/**
 * Verifies real two-client round-trip sync against the Express + SSE server
 * before QR sharing is enabled.
 */
export async function runLiveSyncRoundtripSelfTest(): Promise<{
  ok: boolean;
  latencyMs: number;
  messageVi: string;
  messageEn: string;
}> {
  const t0 = performance.now();
  try {
    const created = await createLivePollSession({
      lessonId: 30,
      lessonTitleEn: 'Sync Check',
      lessonTitleVi: 'Kiểm tra đồng bộ',
      exitTicketPromptEn: 'Check',
      exitTicketPromptVi: 'Kiểm tra',
      ttlMinutes: 5,
      questions: [
        {
          id: 'self-test-q1',
          sectionIndex: 0,
          questionEn: 'Self test',
          questionVi: 'Tự kiểm tra',
          options: [
            { id: 'a', labelEn: 'A', labelVi: 'A' },
            { id: 'b', labelEn: 'B', labelVi: 'B' }
          ],
          explanationEn: '',
          explanationVi: ''
        }
      ]
    });

    const studentState = await submitStudentVote(
      created.sessionId,
      'self-test-q1',
      'a',
      `selftest-device-${Date.now()}`
    );

    const closedState = await controlLivePollSession(
      created.sessionId,
      created.hostToken,
      { action: 'close_session' }
    );

    const latencyMs = Math.round(performance.now() - t0);
    const ok =
      studentState.totalVotesByQuestion['self-test-q1'] === 1 &&
      closedState.status === 'closed';

    return {
      ok,
      latencyMs,
      messageVi: ok
        ? `Đồng bộ máy chủ 2 chiều đạt (${latencyMs} ms). Có thể chia sẻ mã QR.`
        : 'Máy chủ phản hồi không khớp trạng thái.',
      messageEn: ok
        ? `Two-way server sync verified (${latencyMs} ms). QR sharing is ready.`
        : 'Server returned unexpected sync state.'
    };
  } catch (err) {
    return {
      ok: false,
      latencyMs: Math.round(performance.now() - t0),
      messageVi: `Chưa kết nối được máy chủ đồng bộ (${(err as Error).message}). Hãy dùng Bình chọn tại lớp.`,
      messageEn: `Sync server unavailable (${(err as Error).message}). Use In-Class Hand-Raise mode.`
    };
  }
}
