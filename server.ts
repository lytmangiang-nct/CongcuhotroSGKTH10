import express from 'express';
import type { Request, Response } from 'express';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export interface LivePollOptionPayload {
  id: string;
  labelEn: string;
  labelVi?: string;
}

export interface LivePollQuestionPayload {
  id: string;
  promptEn: string;
  promptVi?: string;
  options: LivePollOptionPayload[];
}

export interface ExitTicketEntry {
  id: string;
  text: string;
  createdAt: number;
}

export interface PublicLiveSessionState {
  sessionId: string;
  lessonId: number;
  lessonTitleEn: string;
  lessonTitleVi: string;
  status: 'active' | 'closed' | 'expired';
  createdAt: number;
  expiresAt: number;
  questions: LivePollQuestionPayload[];
  activeQuestionIndex: number;
  isQuestionOpen: boolean;
  showResults: boolean;
  tallies: Record<string, Record<string, number>>;
  totalVotesByQuestion: Record<string, number>;
  isExitTicketOpen: boolean;
  exitTicketPromptEn: string;
  exitTicketPromptVi: string;
  exitTicketResponses: ExitTicketEntry[];
  projectedExitResponseId: string | null;
}

interface InternalLiveSession {
  sessionId: string;
  hostToken: string;
  lessonId: number;
  lessonTitleEn: string;
  lessonTitleVi: string;
  status: 'active' | 'closed';
  createdAt: number;
  expiresAt: number;
  questions: LivePollQuestionPayload[];
  activeQuestionIndex: number;
  isQuestionOpen: boolean;
  showResults: boolean;
  tallies: Record<string, Record<string, number>>;
  votersByQuestion: Record<string, Set<string>>;
  isExitTicketOpen: boolean;
  exitTicketPromptEn: string;
  exitTicketPromptVi: string;
  exitTicketResponses: ExitTicketEntry[];
  exitTicketVoters: Set<string>;
  projectedExitResponseId: string | null;
  subscribers: Set<Response>;
}

const DEFAULT_TTL_MINUTES = 90;
const sessions = new Map<string, InternalLiveSession>();

function generateSessionCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += alphabet[crypto.randomInt(0, alphabet.length)];
  }
  return sessions.has(code) ? generateSessionCode() : code;
}

function getEffectiveStatus(session: InternalLiveSession): 'active' | 'closed' | 'expired' {
  if (session.status === 'closed') return 'closed';
  if (Date.now() > session.expiresAt) return 'expired';
  return 'active';
}

function toPublicState(session: InternalLiveSession): PublicLiveSessionState {
  const effectiveStatus = getEffectiveStatus(session);
  const totalVotesByQuestion: Record<string, number> = {};
  for (const q of session.questions) {
    totalVotesByQuestion[q.id] = session.votersByQuestion[q.id]?.size ?? 0;
  }

  return {
    sessionId: session.sessionId,
    lessonId: session.lessonId,
    lessonTitleEn: session.lessonTitleEn,
    lessonTitleVi: session.lessonTitleVi,
    status: effectiveStatus,
    createdAt: session.createdAt,
    expiresAt: session.expiresAt,
    questions: session.questions,
    activeQuestionIndex: session.activeQuestionIndex,
    isQuestionOpen: effectiveStatus === 'active' ? session.isQuestionOpen : false,
    showResults: session.showResults,
    tallies: session.tallies,
    totalVotesByQuestion,
    isExitTicketOpen: effectiveStatus === 'active' ? session.isExitTicketOpen : false,
    exitTicketPromptEn: session.exitTicketPromptEn,
    exitTicketPromptVi: session.exitTicketPromptVi,
    exitTicketResponses: session.exitTicketResponses,
    projectedExitResponseId: session.projectedExitResponseId
  };
}

function broadcastSession(session: InternalLiveSession): void {
  const payload = JSON.stringify(toPublicState(session));
  for (const res of session.subscribers) {
    try {
      res.write(`event: state\ndata: ${payload}\n\n`);
    } catch {
      session.subscribers.delete(res);
    }
  }
}

function pruneExpiredSessions(): void {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (now > session.expiresAt + 15 * 60 * 1000) {
      for (const res of session.subscribers) {
        try {
          res.end();
        } catch {
          // ignore
        }
      }
      session.subscribers.clear();
      sessions.delete(id);
    }
  }
}

setInterval(pruneExpiredSessions, 5 * 60 * 1000).unref();

export function createAppServer() {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  // Health & real-time capability check
  app.get('/api/live-sessions/health', (_req: Request, res: Response) => {
    res.json({
      ok: true,
      transport: 'sse',
      activeSessions: sessions.size,
      maxTtlMinutes: DEFAULT_TTL_MINUTES
    });
  });

  // Server-side EN -> VI quick translation proxy (avoids browser CORS & filters provider error strings)
  const serverTranslateCache = new Map<string, string>();
  const isInvalidTranslation = (source: string, candidate: string): boolean => {
    const cleanCandidate = candidate.trim();
    if (!cleanCandidate) return true;
    if (cleanCandidate.toLowerCase() === source.trim().toLowerCase()) return true;
    if (/MYMEMORY WARNING|QUERY LENGTH LIMIT|PLEASE SELECT TWO DISTINCT|YOU USED ALL AVAILABLE FREE/i.test(cleanCandidate)) {
      return true;
    }
    return false;
  };

  app.post('/api/translate', async (req: Request, res: Response) => {
    const rawText = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
    if (!rawText || rawText.length > 600) {
      res.status(400).json({ error: 'Invalid text length.' });
      return;
    }

    const cacheKey = rawText.toLowerCase();
    const cached = serverTranslateCache.get(cacheKey);
    if (cached) {
      res.json({ translatedText: cached, cached: true });
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);

    try {
      // Primary: Google Translate free gtx endpoint (server-to-server, zero CORS)
      try {
        const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(rawText)}`;
        const gRes = await fetch(gUrl, { signal: controller.signal });
        if (gRes.ok) {
          const gData = (await gRes.json()) as unknown;
          if (Array.isArray(gData) && Array.isArray(gData[0])) {
            const joined = (gData[0] as unknown[])
              .map((seg) => (Array.isArray(seg) && typeof seg[0] === 'string' ? seg[0] : ''))
              .join('')
              .trim();
            if (!isInvalidTranslation(rawText, joined)) {
              if (serverTranslateCache.size > 2000) {
                const firstKey = serverTranslateCache.keys().next().value;
                if (firstKey) serverTranslateCache.delete(firstKey);
              }
              serverTranslateCache.set(cacheKey, joined);
              res.json({ translatedText: joined, provider: 'gtx' });
              return;
            }
          }
        }
      } catch {
        // Fall through to secondary provider
      }

      // Secondary: MyMemory API
      try {
        const mUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(rawText.slice(0, 450))}&langpair=en|vi`;
        const mRes = await fetch(mUrl, { signal: controller.signal });
        if (mRes.ok) {
          const mData = (await mRes.json()) as { responseData?: { translatedText?: string } };
          const translated = typeof mData?.responseData?.translatedText === 'string'
            ? mData.responseData.translatedText.trim()
            : '';
          if (!isInvalidTranslation(rawText, translated)) {
            if (serverTranslateCache.size > 2000) {
              const firstKey = serverTranslateCache.keys().next().value;
              if (firstKey) serverTranslateCache.delete(firstKey);
            }
            serverTranslateCache.set(cacheKey, translated);
            res.json({ translatedText: translated, provider: 'mymemory' });
            return;
          }
        }
      } catch {
        // Unavailable
      }

      res.status(502).json({ error: 'Translation providers unavailable.' });
    } finally {
      clearTimeout(timer);
    }
  });

  // Create a temporary lesson live polling session (host only gets hostToken)
  app.post('/api/live-sessions', (req: Request, res: Response) => {
    const body = req.body || {};
    const lessonId = Number(body.lessonId);
    const questions = Array.isArray(body.questions) ? body.questions : [];
    if (!Number.isFinite(lessonId) || lessonId < 1 || questions.length === 0) {
      res.status(400).json({ error: 'Invalid lessonId or empty poll questions.' });
      return;
    }

    const sanitizedQuestions: LivePollQuestionPayload[] = questions
      .slice(0, 12)
      .map((q: LivePollQuestionPayload, idx: number) => ({
        id: String(q.id || `q-${idx + 1}`),
        promptEn: String(q.promptEn || '').slice(0, 400),
        promptVi: q.promptVi ? String(q.promptVi).slice(0, 400) : undefined,
        options: (Array.isArray(q.options) ? q.options : []).slice(0, 6).map((opt, oIdx) => ({
          id: String(opt.id || `opt-${oIdx + 1}`),
          labelEn: String(opt.labelEn || '').slice(0, 200),
          labelVi: opt.labelVi ? String(opt.labelVi).slice(0, 200) : undefined
        }))
      }))
      .filter((q: LivePollQuestionPayload) => Boolean(q.promptEn && q.options.length >= 2));

    if (sanitizedQuestions.length === 0) {
      res.status(400).json({ error: 'At least one valid question with 2+ options is required.' });
      return;
    }

    const ttlMinutesRaw = Number(body.ttlMinutes);
    const ttlMinutes = Number.isFinite(ttlMinutesRaw)
      ? Math.min(180, Math.max(5, ttlMinutesRaw))
      : DEFAULT_TTL_MINUTES;

    const sessionId = generateSessionCode();
    const hostToken = crypto.randomBytes(24).toString('hex');
    const createdAt = Date.now();
    const expiresAt = createdAt + ttlMinutes * 60 * 1000;

    const tallies: Record<string, Record<string, number>> = {};
    const votersByQuestion: Record<string, Set<string>> = {};
    for (const q of sanitizedQuestions) {
      tallies[q.id] = {};
      votersByQuestion[q.id] = new Set<string>();
      for (const opt of q.options) {
        tallies[q.id][opt.id] = 0;
      }
    }

    const session: InternalLiveSession = {
      sessionId,
      hostToken,
      lessonId,
      lessonTitleEn: String(body.lessonTitleEn || `Lesson ${lessonId}`).slice(0, 200),
      lessonTitleVi: String(body.lessonTitleVi || `Bài ${lessonId}`).slice(0, 200),
      status: 'active',
      createdAt,
      expiresAt,
      questions: sanitizedQuestions,
      activeQuestionIndex: 0,
      isQuestionOpen: true,
      showResults: false,
      tallies,
      votersByQuestion,
      isExitTicketOpen: false,
      exitTicketPromptEn: String(
        body.exitTicketPromptEn || 'One thing I learned today was …'
      ).slice(0, 300),
      exitTicketPromptVi: String(
        body.exitTicketPromptVi || 'Một điều em rút ra hôm nay là …'
      ).slice(0, 300),
      exitTicketResponses: [],
      exitTicketVoters: new Set<string>(),
      projectedExitResponseId: null,
      subscribers: new Set<Response>()
    };

    sessions.set(sessionId, session);
    res.status(201).json({
      sessionId,
      hostToken,
      expiresAt,
      state: toPublicState(session)
    });
  });

  // Get current sanitized session snapshot
  app.get('/api/live-sessions/:sessionId', (req: Request, res: Response) => {
    const sessionId = String(req.params.sessionId || '').toUpperCase();
    const session = sessions.get(sessionId);
    if (!session) {
      res.status(404).json({ error: 'Session not found or expired.' });
      return;
    }
    res.json({ state: toPublicState(session) });
  });

  // SSE stream for real-time updates (teacher, projector, and student phones)
  app.get('/api/live-sessions/:sessionId/stream', (req: Request, res: Response) => {
    const sessionId = String(req.params.sessionId || '').toUpperCase();
    const session = sessions.get(sessionId);
    if (!session) {
      res.status(404).json({ error: 'Session not found.' });
      return;
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    session.subscribers.add(res);
    res.write(`event: state\ndata: ${JSON.stringify(toPublicState(session))}\n\n`);

    const keepAlive = setInterval(() => {
      try {
        res.write(': ping\n\n');
      } catch {
        clearInterval(keepAlive);
      }
    }, 20000);

    req.on('close', () => {
      clearInterval(keepAlive);
      session.subscribers.delete(res);
    });
  });

  // Host-only session controls
  app.post('/api/live-sessions/:sessionId/control', (req: Request, res: Response) => {
    const sessionId = String(req.params.sessionId || '').toUpperCase();
    const session = sessions.get(sessionId);
    if (!session) {
      res.status(404).json({ error: 'Session not found.' });
      return;
    }

    const hostToken = String(req.header('x-host-token') || req.body?.hostToken || '');
    if (!hostToken || hostToken !== session.hostToken) {
      res.status(403).json({ error: 'Only the session creator can control this live session.' });
      return;
    }

    const status = getEffectiveStatus(session);
    if (status === 'expired') {
      res.status(410).json({ error: 'Session has expired.' });
      return;
    }

    const action = String(req.body?.action || '');
    if (status === 'closed' && action !== 'close_session') {
      res.status(410).json({ error: 'Session is already closed.' });
      return;
    }

    switch (action) {
      case 'set_question': {
        const idx = Number(req.body?.questionIndex);
        if (!Number.isInteger(idx) || idx < 0 || idx >= session.questions.length) {
          res.status(400).json({ error: 'Invalid questionIndex.' });
          return;
        }
        session.activeQuestionIndex = idx;
        session.isQuestionOpen = req.body?.openImmediately !== false;
        session.showResults = false;
        break;
      }
      case 'open_question': {
        session.isQuestionOpen = true;
        break;
      }
      case 'close_question': {
        session.isQuestionOpen = false;
        break;
      }
      case 'toggle_results': {
        session.showResults = Boolean(req.body?.showResults);
        break;
      }
      case 'open_exit_ticket': {
        if (typeof req.body?.promptEn === 'string' && req.body.promptEn.trim()) {
          session.exitTicketPromptEn = req.body.promptEn.trim().slice(0, 300);
        }
        if (typeof req.body?.promptVi === 'string' && req.body.promptVi.trim()) {
          session.exitTicketPromptVi = req.body.promptVi.trim().slice(0, 300);
        }
        session.isExitTicketOpen = true;
        break;
      }
      case 'close_exit_ticket': {
        session.isExitTicketOpen = false;
        break;
      }
      case 'project_exit_response': {
        const responseId = req.body?.responseId ? String(req.body.responseId) : null;
        if (responseId && !session.exitTicketResponses.some((r) => r.id === responseId)) {
          res.status(404).json({ error: 'Exit ticket response not found.' });
          return;
        }
        session.projectedExitResponseId = responseId;
        break;
      }
      case 'close_session': {
        session.status = 'closed';
        session.isQuestionOpen = false;
        session.isExitTicketOpen = false;
        break;
      }
      default: {
        res.status(400).json({ error: 'Unsupported control action.' });
        return;
      }
    }

    broadcastSession(session);
    res.json({ state: toPublicState(session) });
  });

  // Anonymous student vote (1 vote per question per voterId)
  app.post('/api/live-sessions/:sessionId/vote', (req: Request, res: Response) => {
    const sessionId = String(req.params.sessionId || '').toUpperCase();
    const session = sessions.get(sessionId);
    if (!session) {
      res.status(404).json({ error: 'Session not found.' });
      return;
    }

    const status = getEffectiveStatus(session);
    if (status !== 'active') {
      res.status(410).json({ error: 'This live session has ended.' });
      return;
    }

    if (!session.isQuestionOpen) {
      res.status(409).json({ error: 'Voting is currently closed for this question.' });
      return;
    }

    const activeQ = session.questions[session.activeQuestionIndex];
    const questionId = String(req.body?.questionId || '');
    const optionId = String(req.body?.optionId || '');
    const voterId = String(req.body?.voterId || '').trim();

    if (!voterId || voterId.length < 4) {
      res.status(400).json({ error: 'Missing anonymous voter token.' });
      return;
    }

    if (!activeQ || activeQ.id !== questionId) {
      res.status(409).json({ error: 'Question is no longer active.' });
      return;
    }

    if (!activeQ.options.some((opt) => opt.id === optionId)) {
      res.status(400).json({ error: 'Invalid optionId.' });
      return;
    }

    const voters = session.votersByQuestion[questionId] || new Set<string>();
    if (voters.has(voterId)) {
      res.status(409).json({ error: 'You have already voted on this question.' });
      return;
    }

    voters.add(voterId);
    session.votersByQuestion[questionId] = voters;
    session.tallies[questionId][optionId] = (session.tallies[questionId][optionId] || 0) + 1;

    broadcastSession(session);
    res.status(201).json({ ok: true, state: toPublicState(session) });
  });

  // Anonymous student exit ticket submission
  app.post('/api/live-sessions/:sessionId/exit-ticket', (req: Request, res: Response) => {
    const sessionId = String(req.params.sessionId || '').toUpperCase();
    const session = sessions.get(sessionId);
    if (!session) {
      res.status(404).json({ error: 'Session not found.' });
      return;
    }

    const status = getEffectiveStatus(session);
    if (status !== 'active') {
      res.status(410).json({ error: 'This live session has ended.' });
      return;
    }

    if (!session.isExitTicketOpen) {
      res.status(409).json({ error: 'Exit ticket submission is currently closed.' });
      return;
    }

    const voterId = String(req.body?.voterId || '').trim();
    const text = String(req.body?.text || '').replace(/\s+/g, ' ').trim();
    if (!voterId || voterId.length < 4) {
      res.status(400).json({ error: 'Missing anonymous voter token.' });
      return;
    }
    if (text.length < 3 || text.length > 240) {
      res.status(400).json({ error: 'Exit ticket response must be between 3 and 240 characters.' });
      return;
    }

    if (session.exitTicketVoters.has(voterId)) {
      res.status(409).json({ error: 'You already submitted an exit ticket in this session.' });
      return;
    }

    session.exitTicketVoters.add(voterId);
    const entry: ExitTicketEntry = {
      id: `et-${crypto.randomBytes(4).toString('hex')}`,
      text,
      createdAt: Date.now()
    };
    session.exitTicketResponses.unshift(entry);
    if (session.exitTicketResponses.length > 100) {
      session.exitTicketResponses = session.exitTicketResponses.slice(0, 100);
    }

    broadcastSession(session);
    res.status(201).json({ ok: true, entry, state: toPublicState(session) });
  });

  return app;
}

async function startServer() {
  const app = createAppServer();
  const port = Number(process.env.PORT || 3000);
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    if (fs.existsSync(distDir)) {
      app.use(express.static(distDir));
      app.get('/{*splat}', (_req: Request, res: Response) => {
        res.sendFile(path.join(distDir, 'index.html'));
      });
    }
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

// Start server only when executed directly as entrypoint
const isDirectRun =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  process.argv[1] &&
  path.basename(process.argv[1]).startsWith('server');

if (isDirectRun) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
