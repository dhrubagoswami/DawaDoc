import type { Language } from "../types";
import type { Theme } from "../lib/useTheme";
import { copy } from "../lib/copy";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ language, onLanguageChange, theme, onToggleTheme }: Props) {
  const t = copy[language];
  return (
    <header className="flex items-center justify-between px-5 py-5 sm:px-8">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 text-white shadow-sm">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z"
              fill="currentColor"
              opacity="0.9"
            />
            <path
              d="M9 12h6M12 9v6"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="text-lg font-semibold tracking-tight text-ink-900 dark:text-zinc-100">
          {t.appName}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <LanguageToggle language={language} onChange={onLanguageChange} />
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
