import type { AnalysisResult, Language } from "../types";
import { copy } from "../lib/copy";
import { MedicineCard } from "./MedicineCard";

interface Props {
  result: AnalysisResult;
  language: Language;
  onRetake: () => void;
}

export function ResultView({ result, language, onRetake }: Props) {
  const t = copy[language];

  if (!result.isReadable || result.medicines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-zinc-900">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-clay-100 text-clay-600 dark:bg-clay-500/15 dark:text-clay-400">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
            <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-semibold text-ink-900 dark:text-zinc-100">{t.unreadableTitle}</p>
          <p className="mt-1.5 max-w-sm text-sm text-ink-700/80 dark:text-zinc-400">
            {result.unreadableReason || t.unreadableHint}
          </p>
        </div>
        <button
          type="button"
          onClick={onRetake}
          className="rounded-full bg-sage-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-sage-700 active:scale-[0.98]"
        >
          {t.retake}
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold text-ink-900 dark:text-zinc-100">{t.resultsTitle}</h2>
        <button
          type="button"
          onClick={onRetake}
          className="rounded-full border-2 border-sage-200 bg-white px-5 py-2 text-sm font-semibold text-sage-700 transition-colors hover:bg-sage-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          {t.retake}
        </button>
      </div>

      {result.confidence !== "high" && (
        <div className="rounded-2xl bg-clay-100/70 px-5 py-3 text-sm font-medium text-clay-600 dark:bg-clay-500/15 dark:text-clay-400">
          {result.confidence === "low" ? t.confidenceLow : t.confidenceMedium}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {result.medicines.map((medicine, i) => (
          <MedicineCard key={i} medicine={medicine} language={language} index={i} />
        ))}
      </div>

      {result.generalNotes && (
        <div className="rounded-3xl bg-sage-50 p-6 ring-1 ring-sage-100 dark:bg-zinc-900 dark:ring-zinc-800">
          <p className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-sage-600 dark:text-sage-400">
            {t.generalNotesLabel}
          </p>
          <p className="text-sm leading-relaxed text-ink-700 dark:text-zinc-300">{result.generalNotes}</p>
        </div>
      )}
    </div>
  );
}
