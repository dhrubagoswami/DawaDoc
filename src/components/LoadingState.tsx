import type { Language } from "../types";
import { copy } from "../lib/copy";

export function LoadingState({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-14 text-center shadow-sm">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-sage-200" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-sage-600 text-white">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
      <div>
        <p className="text-lg font-semibold text-ink-900">{t.loadingTitle}</p>
        <p className="mt-1 text-sm text-ink-700/70">{t.loadingSubtitle}</p>
      </div>
    </div>
  );
}
