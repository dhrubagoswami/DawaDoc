import { useState } from "react";
import type { Language, MedicineEntry } from "../types";
import { copy, mealTimingLabel, timingSlotLabel } from "../lib/copy";
import { speak, stopSpeaking, isSpeechSupported } from "../lib/speech";

interface Props {
  medicine: MedicineEntry;
  language: Language;
  index: number;
}

export function MedicineCard({ medicine, language, index }: Props) {
  const t = copy[language];
  const [speaking, setSpeaking] = useState(false);

  const fullText = [
    medicine.name,
    `${t.purposeLabel}: ${medicine.purpose}`,
    `${t.dosageLabel}: ${medicine.dosageInstructions}`,
    medicine.sideEffects.length ? `${t.sideEffectsLabel}: ${medicine.sideEffects.join(", ")}` : "",
    medicine.warnings.length ? `${t.warningsLabel}: ${medicine.warnings.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join(". ");

  function toggleSpeak() {
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }
    speak(fullText, language);
    setSpeaking(true);
  }

  return (
    <div
      className="animate-rise-in rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-7"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay-100 text-clay-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </span>
          <h3 className="text-xl font-semibold text-ink-900">{medicine.name}</h3>
        </div>
        {isSpeechSupported() && (
          <button
            type="button"
            onClick={toggleSpeak}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
              speaking ? "bg-clay-500 text-white" : "bg-sage-100 text-sage-700 hover:bg-sage-200"
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path
                d="M4 9v6h4l5 5V4L8 9H4Z"
                fill="currentColor"
              />
              {!speaking && (
                <path
                  d="M16.5 8.5a5 5 0 0 1 0 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
            {speaking ? t.stop : t.readAloud}
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <InfoBlock label={t.purposeLabel} value={medicine.purpose} />
        <InfoBlock label={t.dosageLabel} value={medicine.dosageInstructions} />
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-sage-600">{t.timingLabel}</p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-sage-50 px-3.5 py-1.5 text-sm font-medium text-sage-700 ring-1 ring-sage-200">
            {mealTimingLabel[language][medicine.mealTiming]}
          </span>
          {medicine.timingSlots.map((slot) => (
            <span
              key={slot}
              className="rounded-full bg-cream-100 px-3.5 py-1.5 text-sm font-medium text-ink-700 ring-1 ring-cream-200"
            >
              {timingSlotLabel[language][slot]}
            </span>
          ))}
        </div>
      </div>

      {medicine.sideEffects.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-clay-600">
            {t.sideEffectsLabel}
          </p>
          <ul className="flex flex-col gap-1.5">
            {medicine.sideEffects.map((effect, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-400" />
                {effect}
              </li>
            ))}
          </ul>
        </div>
      )}

      {medicine.warnings.length > 0 && (
        <div className="mt-5 rounded-2xl bg-clay-100/60 p-4">
          <p className="mb-1.5 text-sm font-semibold text-clay-600">{t.warningsLabel}</p>
          <ul className="flex flex-col gap-1">
            {medicine.warnings.map((warning, i) => (
              <li key={i} className="text-sm text-ink-700">
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-sage-600">{label}</p>
      <p className="text-base leading-relaxed text-ink-900">{value}</p>
    </div>
  );
}
