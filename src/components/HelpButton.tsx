import type { Language } from "../types";
import { onboardingCopy } from "../lib/onboardingCopy";

interface Props {
  language: Language;
  onClick: () => void;
}

export function HelpButton({ language, onClick }: Props) {
  const t = onboardingCopy[language];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t.helpButtonLabel}
      title={t.helpButtonLabel}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-sage-600 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-sage-500"
    >
      ?
    </button>
  );
}
