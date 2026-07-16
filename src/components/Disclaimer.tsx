import type { Language } from "../types";
import { copy } from "../lib/copy";

export function Disclaimer({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <p className="mx-auto max-w-lg px-4 text-center text-xs leading-relaxed text-ink-700/60">
      {t.disclaimer}
    </p>
  );
}
