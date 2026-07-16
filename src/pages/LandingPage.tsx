import { useNavigate } from "react-router-dom";
import type { Language } from "../types";
import type { Theme } from "../lib/useTheme";
import type { AppUser } from "../lib/useAuth";
import { landingCopy } from "../lib/landingCopy";
import { LanguageToggle } from "../components/LanguageToggle";
import { ThemeToggle } from "../components/ThemeToggle";
import { AuthNavControl } from "../components/AuthNavControl";

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  user: AppUser | null;
  isSigningIn: boolean;
  onSignIn: () => void;
}

export function LandingPage({
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  user,
  isSigningIn,
  onSignIn,
}: Props) {
  const t = landingCopy[language];
  const navigate = useNavigate();
  const goToScan = () => navigate("/scan");

  return (
    <div className="min-h-screen bg-linear-to-b from-cream-100 via-cream-50 to-sage-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="text-lg font-semibold tracking-tight text-ink-900 dark:text-zinc-100">DawaDoc</span>
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle language={language} onChange={onLanguageChange} />
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <div className="hidden sm:block">
            <AuthNavControl language={language} user={user} isSigningIn={isSigningIn} onSignIn={onSignIn} />
          </div>
          <div className="sm:hidden">
            <AuthNavControl language={language} user={user} isSigningIn={isSigningIn} onSignIn={onSignIn} compact />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 pb-20 pt-10 text-center sm:px-8 sm:pt-16">
        <span className="rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-sage-700 dark:bg-zinc-800 dark:text-sage-400">
          {t.heroEyebrow}
        </span>
        <h1 className="max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-ink-900 dark:text-zinc-100 sm:text-5xl">
          {t.heroTitle} <span className="text-sage-600 dark:text-sage-400">{t.heroTitleAccent}</span>
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-ink-700/80 dark:text-zinc-400">{t.heroSubtitle}</p>
        <div className="mt-2 flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={goToScan}
              className="rounded-full bg-sage-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-transform hover:scale-[1.03] hover:bg-sage-700 active:scale-[0.98]"
            >
              {t.heroCta}
            </button>
            {!user && (
              <AuthNavControl language={language} user={user} isSigningIn={isSigningIn} onSignIn={onSignIn} />
            )}
          </div>
          <p className="text-sm text-ink-700/60 dark:text-zinc-500">{t.heroReassurance}</p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-ink-900 dark:text-zinc-100 sm:text-3xl">
          {t.howItWorksTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {t.steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col gap-3 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-600 text-base font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-ink-900 dark:text-zinc-100">{step.title}</h3>
              <p className="text-sm leading-relaxed text-ink-700/75 dark:text-zinc-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-zinc-100 sm:text-3xl">
            {t.featuresTitle}
          </h2>
          <p className="mt-2 text-base text-ink-700/70 dark:text-zinc-400">{t.featuresSubtitle}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-2 rounded-2xl bg-white/70 p-6 ring-1 ring-sage-100 dark:bg-zinc-900/70 dark:ring-zinc-800"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-clay-100 text-clay-600 dark:bg-clay-500/15 dark:text-clay-400">
                <FeatureDot />
              </div>
              <h3 className="text-base font-semibold text-ink-900 dark:text-zinc-100">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-ink-700/75 dark:text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sign-in benefits */}
      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-zinc-100 sm:text-3xl">
            {t.signInBenefitsTitle}
          </h2>
          <p className="mt-2 text-base text-ink-700/70 dark:text-zinc-400">{t.signInBenefitsSubtitle}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {t.signInBenefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600 dark:bg-zinc-800 dark:text-sage-400">
                <FeatureDot />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold text-ink-900 dark:text-zinc-100">{benefit.title}</h3>
                  {benefit.comingSoon && (
                    <span className="rounded-full bg-clay-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-clay-600 dark:bg-clay-500/15 dark:text-clay-400">
                      {t.comingSoonBadge}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-700/75 dark:text-zinc-400">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {!user && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <AuthNavControl language={language} user={user} isSigningIn={isSigningIn} onSignIn={onSignIn} />
            <p className="text-sm text-ink-700/60 dark:text-zinc-500">{t.signInBenefitsGuestNote}</p>
          </div>
        )}
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-2xl px-5 pb-20 text-center sm:px-8">
        <div className="rounded-3xl bg-sage-50 p-8 ring-1 ring-sage-100 dark:bg-zinc-900 dark:ring-zinc-800">
          <h2 className="text-xl font-semibold text-ink-900 dark:text-zinc-100">{t.trustTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-700/80 dark:text-zinc-400">{t.trustBody}</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-5 pb-24 text-center sm:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-zinc-100 sm:text-4xl">
          {t.finalTitle}
        </h2>
        <p className="text-lg text-ink-700/80 dark:text-zinc-400">{t.finalSubtitle}</p>
        <button
          type="button"
          onClick={goToScan}
          className="mt-2 rounded-full bg-sage-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-transform hover:scale-[1.03] hover:bg-sage-700 active:scale-[0.98]"
        >
          {t.finalCta}
        </button>
      </section>

      <footer className="px-5 pb-8 text-center text-xs text-ink-700/50 dark:text-zinc-500">DawaDoc</footer>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 text-white shadow-sm">
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path d="M12 2 4 6v6c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-4Z" fill="currentColor" opacity="0.9" />
        <path d="M9 12h6M12 9v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FeatureDot() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
