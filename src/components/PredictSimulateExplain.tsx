import React, { useState } from 'react';
import { Compass, CheckCircle2, XCircle, Eye, HelpCircle, Play } from 'lucide-react';
import { useBook } from '../context/BookContext';

export interface PredictionOption {
  id: string;
  labelVi: string;
  labelEn: string;
}

export interface PredictSimulateExplainProps {
  titleVi: string;
  titleEn: string;
  promptVi: string;
  promptEn: string;
  options: PredictionOption[];
  correctOptionId: string;
  explanationVi: string;
  explanationEn: string;
  hasSimulationCompleted: boolean;
  actualOutcomeVi: string;
  actualOutcomeEn: string;
  onRunDirectly?: () => void;
  theme?: 'dark' | 'light';
}

export const PredictSimulateExplain: React.FC<PredictSimulateExplainProps> = ({
  titleVi,
  titleEn,
  promptVi,
  promptEn,
  options,
  correctOptionId,
  explanationVi,
  explanationEn,
  hasSimulationCompleted,
  actualOutcomeVi,
  actualOutcomeEn,
  onRunDirectly,
  theme = 'dark'
}) => {
  const { bilingualMode, isPresentationMode, revealPresentationAnswers } = useBook();
  const isEn = bilingualMode === 'en';

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lockedPrediction, setLockedPrediction] = useState<string | null>(null);
  const [skippedToSim, setSkippedToSim] = useState<boolean>(false);
  const [localReveal, setLocalReveal] = useState<boolean>(false);

  const answersBlockedByPresentation = isPresentationMode && !revealPresentationAnswers && !localReveal;
  const isPredictionMatched = lockedPrediction !== null && lockedPrediction === correctOptionId;

  const isDark = theme === 'dark';

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${
        isDark
          ? 'bg-slate-900/95 border-indigo-500/40 text-slate-100'
          : 'bg-indigo-50/60 border-indigo-200 text-slate-900'
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
              {isEn ? 'Predict – Simulate – Explain' : 'Dự đoán – Mô phỏng – Giải thích'}
            </div>
            <h4 className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isEn ? titleEn : titleVi}
            </h4>
          </div>
        </div>

        {onRunDirectly && !hasSimulationCompleted && (
          <button
            type="button"
            onClick={() => {
              setSkippedToSim(true);
              onRunDirectly();
            }}
            className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isEn ? 'Run Simulation Directly' : 'Chạy thẳng mô phỏng'}</span>
          </button>
        )}
      </div>

      {/* Prompt */}
      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
        {isEn ? promptEn : promptVi}
      </p>

      {/* Step 1: Prediction Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const isLocked = lockedPrediction === opt.id;
          const showCorrect =
            hasSimulationCompleted && !answersBlockedByPresentation && opt.id === correctOptionId;
          const showWrong =
            hasSimulationCompleted &&
            !answersBlockedByPresentation &&
            isLocked &&
            opt.id !== correctOptionId;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setSelectedId(opt.id);
                setLockedPrediction(opt.id);
                setSkippedToSim(false);
              }}
              className={`px-3 py-2 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                showCorrect
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                  : showWrong
                  ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                  : isSelected
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                  : isDark
                  ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-white hover:bg-indigo-50 border-slate-300 text-slate-800'
              }`}
            >
              <span>{isEn ? opt.labelEn : opt.labelVi}</span>
              {showCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {showWrong && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Status bar before simulation runs */}
      {!hasSimulationCompleted && (
        <div
          className={`text-xs px-3 py-2 rounded-xl border flex items-center gap-2 ${
            lockedPrediction
              ? isDark
                ? 'bg-indigo-950/50 border-indigo-500/40 text-indigo-200'
                : 'bg-indigo-100/70 border-indigo-300 text-indigo-900'
              : isDark
              ? 'bg-slate-800/60 border-slate-700 text-slate-400'
              : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
          <span>
            {lockedPrediction
              ? isEn
                ? 'Prediction recorded! Now run or step through the simulation below to compare.'
                : 'Đã ghi nhận dự đoán! Hãy bấm Chạy / Bước tiếp mô phỏng bên dưới để đối chiếu kết quả thực tế.'
              : skippedToSim
              ? isEn
                ? 'Running simulation directly — observe how variables update at each step.'
                : 'Đang chạy thẳng mô phỏng — hãy quan sát giá trị biến thay đổi qua từng bước.'
              : isEn
              ? 'Choose a prediction above (optional) or run the simulation directly.'
              : 'Chọn 1 phương án dự đoán ở trên (hoặc bấm chạy thẳng mô phỏng).'}
          </span>
        </div>
      )}

      {/* Step 2 & 3: Compare Predicted vs Actual & Explain */}
      {hasSimulationCompleted && (
        <div className="space-y-2 pt-1">
          {answersBlockedByPresentation ? (
            <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/40 flex items-center justify-between gap-2 text-xs text-amber-200">
              <span>
                {isEn
                  ? 'Presentation Mode: Explanation and answer comparison are hidden.'
                  : 'Chế độ trình chiếu: Đáp án đối chiếu & giải thích đang được thu gọn.'}
              </span>
              <button
                type="button"
                onClick={() => setLocalReveal(true)}
                className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isEn ? 'Show Answer' : 'Hiện đáp án'}</span>
              </button>
            </div>
          ) : (
            <div
              data-presentation-answer="true"
              className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                lockedPrediction
                  ? isPredictionMatched
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-100'
                    : 'bg-amber-950/60 border-amber-500/50 text-amber-100'
                  : 'bg-teal-950/50 border-teal-500/40 text-teal-100'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 font-bold">
                <span className="flex items-center gap-1.5">
                  {lockedPrediction ? (
                    isPredictionMatched ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>
                          {isEn
                            ? 'Matched Prediction! Actual matches your forecast:'
                            : 'Khớp dự đoán! Kết quả thực tế đúng như em dự đoán:'}
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-amber-400" />
                        <span>
                          {isEn
                            ? 'Prediction Differs from Simulation Outcome:'
                            : 'Cần xem lại — Dự đoán chưa khớp kết quả mô phỏng:'}
                        </span>
                      </>
                    )
                  ) : (
                    <span>{isEn ? 'Simulation Outcome & Explanation:' : 'Kết quả mô phỏng & Giải thích:'}</span>
                  )}
                </span>
                <span className="font-mono px-2 py-0.5 rounded bg-black/30">
                  {isEn ? actualOutcomeEn : actualOutcomeVi}
                </span>
              </div>
              <p className="leading-relaxed opacity-95">
                {isEn ? explanationEn : explanationVi}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
