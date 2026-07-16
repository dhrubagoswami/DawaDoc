import { useEffect, useState } from "react";
import type { Language } from "../types";
import { onboardingCopy } from "../lib/onboardingCopy";

interface Props {
  language: Language;
  open: boolean;
  onClose: () => void;
}

const stepIcons = [
  // Waving hand / welcome
  <path
    key="welcome"
    d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z"
    fill="currentColor"
    opacity="0.9"
  />,
  // Camera
  <g key="camera">
    <path
      d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="13.5" r="3.2" stroke="currentColor" strokeWidth="1.8" />
  </g>,
  // Sparkle / read
  <g key="sparkle">
    <path
      d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </g>,
  // Speaker / listen
  <g key="speaker">
    <path d="M4 9v6h4l5 5V4L8 9H4Z" fill="currentColor" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </g>,
  // Google-ish account circle
  <g key="account">
    <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 19c1.4-3.2 4-4.8 7-4.8s5.6 1.6 7 4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </g>,
];

export function WelcomeTour({ language, open, onClose }: Props) {
  const t = onboardingCopy[language];
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  if (!open) return null;

  const isLast = step === t.steps.length - 1;
  const isFirst = step === 0;
  const current = t.steps[step];

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="onboarding-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm overflow-hidden rounded-3xl bg-paper shadow-soft-lg ring-1 ring-ink-900/8 dark:bg-zinc-900 dark:ring-white/10"
      >
        <div className="flex flex-col items-center gap-4 px-7 pb-2 pt-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600 dark:bg-zinc-800 dark:text-sage-400">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
              {stepIcons[step]}
            </svg>
          </span>
          <h2 id="onboarding-title" className="text-xl font-bold text-ink-900 dark:text-zinc-100">
            {current.title}
          </h2>
          <p className="text-sm leading-relaxed text-ink-700/80 dark:text-zinc-400">{current.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          {t.steps.map((s, i) => (
            <span
              key={s.title}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-5 bg-sage-600" : "w-1.5 bg-sage-200 dark:bg-zinc-700"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 px-7 py-6">
          {isFirst ? (
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-ink-700/60 transition-colors hover:text-ink-900 dark:text-zinc-500 dark:hover:text-zinc-200"
            >
              {t.skip}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-sm font-medium text-ink-700/60 transition-colors hover:text-ink-900 dark:text-zinc-500 dark:hover:text-zinc-200"
            >
              {t.back}
            </button>
          )}

          <button
            type="button"
            onClick={() => (isLast ? onClose() : setStep((s) => s + 1))}
            className="rounded-full bg-sage-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-sage-700 active:scale-[0.98]"
          >
            {isLast ? t.done : t.next}
          </button>
        </div>
      </div>
    </div>
  );
}
