import React from 'react';
import { Volume2, CheckCircle2, ArrowLeftRight, BarChart3, MessageSquareQuote, Play, Pause } from 'lucide-react';
import type { ProjectorSyncState } from '../services/teachSyncService';

interface TeachProjectorStageProps {
  state: ProjectorSyncState;
  onSpeakEn?: (text: string, rate?: number) => void;
  fullscreen?: boolean;
}

export const TeachProjectorStage: React.FC<TeachProjectorStageProps> = ({
  state,
  onSpeakEn,
  fullscreen = false
}) => {
  const stageLabels: Record<string, string> = {
    warmup: 'Stage 1 · Warm-up',
    hands_on: 'Stage 2 · Hands-on & Simulation',
    discussion: 'Stage 3 · Discussion & Poll',
    wrap_up: 'Stage 4 · Wrap-up & Exit Ticket'
  };

  const activePrompt = state.activePrompt;
  const activePoll = state.activePoll;

  const getOptionPercent = (optId: string): number => {
    if (!activePoll || activePoll.totalVotes <= 0) return 0;
    const count = activePoll.tallies[optId] || 0;
    return Math.round((count / activePoll.totalVotes) * 100);
  };

  const roleA = state.activePairDialogue
    ? state.pairRolesSwapped
      ? state.activePairDialogue.roleB
      : state.activePairDialogue.roleA
    : null;
  const roleB = state.activePairDialogue
    ? state.pairRolesSwapped
      ? state.activePairDialogue.roleA
      : state.activePairDialogue.roleB
    : null;

  return (
    <div
      className={`bg-slate-950 text-slate-100 flex flex-col justify-between ${
        fullscreen ? 'min-h-screen p-6 sm:p-10' : 'rounded-2xl border border-slate-800 p-5 sm:p-7 min-h-[540px]'
      }`}
    >
      {/* Top Projector Meta Line (unboxed clean typography) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-sky-400">
            <span>{state.lessonTitleEn}</span>
            <span aria-hidden="true">·</span>
            <span>{stageLabels[state.stage] || state.stage}</span>
            <span aria-hidden="true">·</span>
            <span>Section {state.sectionIndex + 1}</span>
          </div>
          {state.simStatus !== 'idle' && (
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              {state.simStatus === 'running' ? (
                <Play className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Pause className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>Simulation: {state.simLabelEn}</span>
            </div>
          )}
        </div>

        {/* Status of teacher reveals (only small factual text) */}
        <div className="text-xs text-slate-400 font-mono tabular-nums">
          English Projection View
        </div>
      </div>

      {/* Main Stage Body */}
      <div className="my-6 space-y-6 flex-1 flex flex-col justify-center">
        {/* Stage 1 & 2: Prompt + Code Context + Scaffold */}
        {(state.stage === 'warmup' || state.stage === 'hands_on') && activePrompt && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-snug text-balance">
                {activePrompt.questionEn}
              </h2>
              {onSpeakEn && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onSpeakEn(activePrompt.questionEn, 1.0)}
                    className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    title="Speak English (Normal speed 1.0x)"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>1.0x</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSpeakEn(activePrompt.questionEn, 0.7)}
                    className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold cursor-pointer whitespace-nowrap"
                    title="Speak English (Slow 0.7x)"
                  >
                    0.7x
                  </button>
                </div>
              )}
            </div>

            {state.revealMeaning && (
              <p className="text-base sm:text-lg text-amber-300 font-medium border-t border-slate-800 pt-3">
                {activePrompt.questionVi}
              </p>
            )}

            {activePrompt.codeContext && (
              <pre className="p-4 sm:p-5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm sm:text-base text-sky-200 overflow-x-auto leading-relaxed">
                {activePrompt.codeContext}
              </pre>
            )}

            {/* Progressive Scaffolds: Keywords -> Sentence Starter -> Full Sample -> Explanation */}
            {(state.revealKeywords ||
              state.revealStarter ||
              state.revealFullSample ||
              state.revealExplanation) && (
              <div className="space-y-3 pt-2 border-t border-slate-800">
                {state.revealKeywords && (
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-teal-400">Key Vocabulary</div>
                    <p className="text-base sm:text-lg font-medium text-teal-200">
                      {activePrompt.scaffold.keywordsEn.join('  ·  ')}
                    </p>
                    {state.revealMeaning && (
                      <p className="text-sm text-slate-400">
                        {activePrompt.scaffold.keywordsVi.join('  ·  ')}
                      </p>
                    )}
                  </div>
                )}

                {state.revealStarter && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-sky-500/40 space-y-1">
                    <div className="text-xs font-semibold text-sky-400">Sentence Starter</div>
                    <p className="text-lg sm:text-xl font-semibold text-white">
                      {activePrompt.scaffold.starterEn}
                    </p>
                    {state.revealMeaning && (
                      <p className="text-sm text-amber-200">{activePrompt.scaffold.starterVi}</p>
                    )}
                  </div>
                )}

                {state.revealFullSample && (
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 space-y-1">
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Sample Answer</span>
                    </div>
                    <p className="text-lg sm:text-xl font-semibold text-emerald-100">
                      {activePrompt.scaffold.fullSampleEn}
                    </p>
                    {state.revealMeaning && (
                      <p className="text-sm text-emerald-300/90">{activePrompt.scaffold.fullSampleVi}</p>
                    )}
                  </div>
                )}

                {state.revealExplanation && (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
                    <div className="text-xs font-semibold text-amber-400">Explanation</div>
                    <p className="text-base sm:text-lg text-slate-100">
                      {activePrompt.explanationEn}
                    </p>
                    {state.revealMeaning && (
                      <p className="text-sm text-slate-400">{activePrompt.explanationVi}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Stage 3: Pair Dialogue, Follow-up, & Live Poll */}
        {state.stage === 'discussion' && (
          <div className="space-y-6">
            {state.activeFollowUp && (
              <div className="p-5 rounded-xl bg-slate-900 border border-sky-500/50 space-y-2">
                <div className="text-xs font-semibold text-sky-400">Follow-up Prompt</div>
                <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                  {state.activeFollowUp.en}
                </p>
                {state.revealMeaning && (
                  <p className="text-base text-amber-300">{state.activeFollowUp.vi}</p>
                )}
              </div>
            )}

            {state.activePairDialogue && roleA && roleB && (
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {state.activePairDialogue.titleEn}
                  </h3>
                  {state.pairRolesSwapped && (
                    <span className="text-xs font-medium text-amber-300 flex items-center gap-1">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>Roles Swapped</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-sm font-bold text-sky-400">
                      {state.pairRolesSwapped ? 'Partner A (Now Reviewer / Role B)' : 'Partner A'} · {roleA.labelEn}
                    </div>
                    <p className="text-sm sm:text-base text-slate-200">{roleA.taskEn}</p>
                    <div className="pt-2 border-t border-slate-800 space-y-1 text-sm text-sky-200 font-medium">
                      {roleA.promptLinesEn.map((line, i) => (
                        <p key={i}>“{line}”</p>
                      ))}
                    </div>
                    {state.revealMeaning && (
                      <p className="text-xs text-amber-300 pt-1">{roleA.taskVi}</p>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-sm font-bold text-teal-400">
                      {state.pairRolesSwapped ? 'Partner B (Now Reporter / Role A)' : 'Partner B'} · {roleB.labelEn}
                    </div>
                    <p className="text-sm sm:text-base text-slate-200">{roleB.taskEn}</p>
                    <div className="pt-2 border-t border-slate-800 space-y-1 text-sm text-teal-200 font-medium">
                      {roleB.promptLinesEn.map((line, i) => (
                        <p key={i}>“{line}”</p>
                      ))}
                    </div>
                    {state.revealMeaning && (
                      <p className="text-xs text-amber-300 pt-1">{roleB.taskVi}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Live or In-Class Poll on Projector */}
            {activePoll && activePoll.question && (
              <div className="p-5 rounded-xl bg-slate-900 border border-slate-700 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                    <BarChart3 className="w-4 h-4" />
                    <span>
                      {activePoll.mode === 'live_qr' ? 'Live Class Poll' : 'In-Class Poll'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {activePoll.isQuestionOpen ? 'Accepting Responses' : 'Closed'}
                    </span>
                  </div>
                  <div className="text-xs font-mono tabular-nums text-slate-300">
                    Total Responses: {activePoll.totalVotes}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className={activePoll.mode === 'live_qr' && activePoll.liveQrDataUrl ? 'lg:col-span-8 space-y-3' : 'lg:col-span-12 space-y-3'}>
                    <h4 className="text-lg sm:text-2xl font-bold text-white leading-snug">
                      {activePoll.question.questionEn}
                    </h4>
                    {state.revealMeaning && (
                      <p className="text-sm text-amber-300">{activePoll.question.questionVi}</p>
                    )}

                    <div className="space-y-2.5 pt-1">
                      {activePoll.question.options.map((opt) => {
                        const pct = getOptionPercent(opt.id);
                        const count = activePoll.tallies[opt.id] || 0;
                        const isCorrect =
                          activePoll.showResults &&
                          state.revealExplanation &&
                          activePoll.question?.correctOptionId === opt.id;
                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-lg border transition-colors ${
                              isCorrect
                                ? 'bg-emerald-950/60 border-emerald-500'
                                : 'bg-slate-950/80 border-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 text-sm sm:text-base font-medium">
                              <span className="text-slate-100">{opt.labelEn}</span>
                              {activePoll.showResults && (
                                <span className="font-mono tabular-nums text-sky-300 font-bold shrink-0">
                                  {pct}% ({count})
                                </span>
                              )}
                            </div>
                            {activePoll.showResults && (
                              <div className="mt-2 h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    isCorrect ? 'bg-emerald-500' : 'bg-sky-500'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {activePoll.showResults && state.revealExplanation && (
                      <p className="text-sm text-emerald-300 pt-2 border-t border-slate-800">
                        {activePoll.question.explanationEn}
                      </p>
                    )}
                  </div>

                  {activePoll.mode === 'live_qr' && activePoll.liveQrDataUrl && (
                    <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-white text-slate-900 space-y-2">
                      <img
                        src={activePoll.liveQrDataUrl}
                        alt={`QR Code for session ${activePoll.liveSessionId}`}
                        className="w-40 h-40 object-contain"
                      />
                      <div className="text-center">
                        <div className="text-xs font-semibold text-slate-600">Join on Phone (No Name Needed)</div>
                        <div className="font-mono text-lg font-bold tracking-widest text-slate-900">
                          {activePoll.liveSessionId}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stage 4: Wrap-up & Exit Ticket */}
        {state.stage === 'wrap_up' && (
          <div className="space-y-6">
            {state.activeExitFrame && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-sky-400">
                  Exit Ticket · Complete in 1 English Sentence
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white leading-snug text-balance">
                  “{state.activeExitFrame.frameEn}”
                </h2>
                {state.revealMeaning && (
                  <p className="text-base sm:text-lg text-amber-300">
                    “{state.activeExitFrame.frameVi}”
                  </p>
                )}
                {state.revealFullSample && (
                  <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/50 space-y-1">
                    <div className="text-xs font-semibold text-emerald-400">Sample Reflection</div>
                    <p className="text-lg font-medium text-emerald-100">
                      {state.activeExitFrame.sampleEn}
                    </p>
                  </div>
                )}
              </div>
            )}

            {state.projectedExitResponse && (
              <div className="p-5 rounded-xl bg-slate-900 border border-sky-400/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Selected Student Response</span>
                </div>
                <p className="text-xl sm:text-2xl font-semibold text-white">
                  “{state.projectedExitResponse.text}”
                </p>
              </div>
            )}

            {activePoll?.mode === 'live_qr' && activePoll.liveQrDataUrl && (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-md">
                <img
                  src={activePoll.liveQrDataUrl}
                  alt={`QR Code for exit ticket ${activePoll.liveSessionId}`}
                  className="w-24 h-24 rounded-lg bg-white p-1 shrink-0"
                />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">Submit Your Exit Ticket</div>
                  <p className="text-xs text-slate-300">
                    Scan the QR code on your phone and send one short English sentence. No name required.
                  </p>
                  <div className="font-mono text-sm font-bold text-sky-400">
                    Session: {activePoll.liveSessionId}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Clean Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Informatics 10 · Bilingual Classroom Projection</span>
        <span className="font-mono">
          {state.revealMeaning ? 'VI Meaning: Shown' : 'VI Meaning: Hidden'} ·{' '}
          {state.revealFullSample ? 'Sample Answer: Shown' : 'Sample Answer: Hidden'}
        </span>
      </div>
    </div>
  );
};
