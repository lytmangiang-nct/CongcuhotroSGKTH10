import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock, Lock, Send, Vote, AlertCircle } from 'lucide-react';
import {
  fetchLivePollSession,
  subscribeLivePollSession,
  submitStudentVote,
  submitStudentExitTicket,
  getOrCreateAnonymousVoterId,
  PublicLiveSessionState
} from '../services/teachSyncService';

interface StudentLivePollViewProps {
  sessionId: string;
}

export const StudentLivePollView: React.FC<StudentLivePollViewProps> = ({ sessionId }) => {
  const normalizedCode = useMemo(() => sessionId.trim().toUpperCase(), [sessionId]);
  const voterId = useMemo(() => getOrCreateAnonymousVoterId(), []);

  const [session, setSession] = useState<PublicLiveSessionState | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [votedByQuestion, setVotedByQuestion] = useState<Record<string, string>>(() => {
    try {
      const raw = localStorage.getItem(`kntt_voted_${normalizedCode}`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [submittingVote, setSubmittingVote] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const [exitText, setExitText] = useState<string>('');
  const [exitSubmitted, setExitSubmitted] = useState<boolean>(() => {
    try {
      return localStorage.getItem(`kntt_exit_done_${normalizedCode}`) === '1';
    } catch {
      return false;
    }
  });
  const [submittingExit, setSubmittingExit] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    fetchLivePollSession(normalizedCode)
      .then((state) => {
        if (active) {
          setSession(state);
          setLoadError(null);
        }
      })
      .catch((err) => {
        if (active) setLoadError((err as Error).message || 'Session not found.');
      });

    const unsub = subscribeLivePollSession(
      normalizedCode,
      (nextState) => {
        if (active) {
          setSession(nextState);
          setLoadError(null);
        }
      },
      (err) => {
        if (active && !session) {
          setLoadError(err);
        }
      }
    );

    return () => {
      active = false;
      unsub();
    };
  }, [normalizedCode]);

  const handleVote = async (questionId: string, optionId: string) => {
    if (votedByQuestion[questionId] || submittingVote) return;
    setSubmittingVote(true);
    setActionError(null);
    try {
      const next = await submitStudentVote(normalizedCode, questionId, optionId, voterId);
      setSession(next);
      const updatedMap = { ...votedByQuestion, [questionId]: optionId };
      setVotedByQuestion(updatedMap);
      try {
        localStorage.setItem(`kntt_voted_${normalizedCode}`, JSON.stringify(updatedMap));
      } catch {
        // ignore
      }
    } catch (err) {
      setActionError((err as Error).message);
    } finally {
      setSubmittingVote(false);
    }
  };

  const handleSubmitExitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (exitSubmitted || submittingExit) return;
    const trimmed = exitText.trim();
    if (trimmed.length < 3) {
      setActionError('Please write at least a short phrase (3+ characters).');
      return;
    }
    setSubmittingExit(true);
    setActionError(null);
    try {
      const next = await submitStudentExitTicket(normalizedCode, trimmed, voterId);
      setSession(next);
      setExitSubmitted(true);
      try {
        localStorage.setItem(`kntt_exit_done_${normalizedCode}`, '1');
      } catch {
        // ignore
      }
    } catch (err) {
      setActionError((err as Error).message);
    } finally {
      setSubmittingExit(false);
    }
  };

  if (loadError && !session) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-3 shadow-sm">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h1 className="text-lg font-bold">Session {normalizedCode} Unavailable</h1>
          <p className="text-sm text-slate-600">{loadError}</p>
          <a
            href="/"
            className="inline-block px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold"
          >
            Back to Textbook
          </a>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-600 text-sm">
        Connecting to classroom session {normalizedCode}...
      </div>
    );
  }

  const activeQ = session.questions[session.activeQuestionIndex];
  const selectedOpt = activeQ ? votedByQuestion[activeQ.id] : undefined;
  const remainingMinutes = Math.max(0, Math.ceil((session.expiresAt - Date.now()) / 60000));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center p-4 sm:p-6">
      <div className="max-w-lg w-full space-y-5">
        {/* Session Header */}
        <header className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
            <span className="font-mono font-bold text-indigo-700">
              Session {session.sessionId}
            </span>
            <span className="flex items-center gap-1 font-mono tabular-nums">
              <Clock className="w-3.5 h-3.5" />
              {session.status === 'active' ? `${remainingMinutes}m left` : session.status.toUpperCase()}
            </span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900">
            {session.lessonTitleEn}
          </h1>
          <p className="text-xs text-slate-500">
            Anonymous classroom response · No name required
          </p>
        </header>

        {actionError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {actionError}
          </div>
        )}

        {/* Closed / Expired Session State */}
        {session.status !== 'active' ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center space-y-2 shadow-xs">
            <Lock className="w-9 h-9 text-slate-400 mx-auto" />
            <h2 className="text-base font-bold text-slate-900">
              {session.status === 'expired' ? 'Session Expired' : 'Session Ended by Teacher'}
            </h2>
            <p className="text-sm text-slate-600">
              Responses are now closed. Thank you for participating in today&apos;s lesson!
            </p>
          </div>
        ) : (
          <>
            {/* Active Poll Question Card */}
            {activeQ && (
              <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-indigo-700 flex items-center gap-1.5">
                    <Vote className="w-4 h-4" />
                    Question {session.activeQuestionIndex + 1} of {session.questions.length}
                  </span>
                  <span
                    className={`font-semibold ${
                      session.isQuestionOpen ? 'text-emerald-700' : 'text-amber-700'
                    }`}
                  >
                    {session.isQuestionOpen ? 'Open' : 'Paused by Teacher'}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {activeQ.promptEn}
                </h2>

                <div className="space-y-2.5">
                  {activeQ.options.map((opt) => {
                    const isPicked = selectedOpt === opt.id;
                    const disabled = !session.isQuestionOpen || Boolean(selectedOpt) || submittingVote;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleVote(activeQ.id, opt.id)}
                        className={`w-full min-h-[48px] p-3.5 rounded-xl border text-left text-sm font-medium transition-colors flex items-center justify-between gap-3 ${
                          isPicked
                            ? 'bg-indigo-600 border-indigo-600 text-white font-semibold'
                            : disabled
                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-white hover:bg-indigo-50 border-slate-300 text-slate-800 cursor-pointer'
                        }`}
                      >
                        <span>{opt.labelEn}</span>
                        {isPicked && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {selectedOpt ? (
                  <p className="text-xs font-semibold text-emerald-700">
                    Your vote has been recorded (1 vote per question). Waiting for teacher...
                  </p>
                ) : !session.isQuestionOpen ? (
                  <p className="text-xs text-amber-700">
                    The teacher closed voting for this question.
                  </p>
                ) : null}
              </section>
            )}

            {/* Live Exit Ticket Form */}
            {session.isExitTicketOpen && (
              <section className="bg-white rounded-2xl border border-indigo-200 p-5 shadow-xs space-y-3">
                <div className="text-xs font-semibold text-indigo-700">
                  Exit Ticket (Anonymous English Sentence)
                </div>
                <p className="text-sm font-bold text-slate-900">
                  “{session.exitTicketPromptEn}”
                </p>

                {exitSubmitted ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Exit ticket submitted! Look at the classroom board.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitExitTicket} className="space-y-3">
                    <textarea
                      rows={3}
                      maxLength={240}
                      value={exitText}
                      onChange={(e) => setExitText(e.target.value)}
                      placeholder="Write 1 short English sentence..."
                      className="w-full p-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-slate-400">
                        {exitText.length}/240
                      </span>
                      <button
                        type="submit"
                        disabled={submittingExit}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold flex items-center gap-2 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Submit Sentence</span>
                      </button>
                    </div>
                  </form>
                )}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};
