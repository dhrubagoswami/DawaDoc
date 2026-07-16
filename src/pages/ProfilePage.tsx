import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Language } from "../types";
import type { Theme } from "../lib/useTheme";
import type { AppUser } from "../lib/useAuth";
import { authCopy } from "../lib/authCopy";
import { LanguageToggle } from "../components/LanguageToggle";
import { ThemeToggle } from "../components/ThemeToggle";
import { ConfirmDialog } from "../components/ConfirmDialog";

interface Props {
  user: AppUser;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  onSignOut: () => void;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ProfilePage({ user, language, onLanguageChange, theme, onToggleTheme, onSignOut }: Props) {
  const t = authCopy[language];
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmSignOut = () => {
    setConfirmOpen(false);
    onSignOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-cream-100 via-cream-50 to-sage-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      <header className="flex items-center px-5 py-5 sm:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:bg-sage-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.backToApp}
        </button>
      </header>

      <main className="mx-auto flex max-w-lg flex-col gap-6 px-5 pb-16 sm:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-zinc-100">{t.profileTitle}</h1>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sage-600 text-xl font-semibold text-white">
              {user.photoURL ? (
                <img src={user.photoURL} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                initials(user.name)
              )}
            </span>
            <div>
              <p className="text-lg font-semibold text-ink-900 dark:text-zinc-100">{user.name}</p>
              <p className="text-sm text-ink-700/70 dark:text-zinc-400">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-900 dark:text-zinc-100">{t.languageLabel}</span>
            <LanguageToggle language={language} onChange={onLanguageChange} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-900 dark:text-zinc-100">{t.themeLabel}</span>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          className="rounded-full border-2 border-clay-500/40 bg-white px-6 py-3 text-base font-semibold text-clay-600 transition-colors hover:bg-clay-100/60 dark:bg-zinc-900 dark:hover:bg-clay-500/10"
        >
          {t.signOut}
        </button>
      </main>

      <ConfirmDialog
        open={confirmOpen}
        title={t.signOutConfirmTitle}
        body={t.signOutConfirmBody}
        confirmLabel={t.signOutConfirmYes}
        cancelLabel={t.signOutConfirmCancel}
        onConfirm={handleConfirmSignOut}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
