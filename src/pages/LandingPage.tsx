import { useNavigate } from "react-router-dom";
import type { Language } from "../types";
import type { Theme } from "../lib/useTheme";
import type { AppUser } from "../lib/useAuth";
import { landingCopy } from "../lib/landingCopy";
import { stockPhotos } from "../lib/stockPhotos";
import { LanguageToggle } from "../components/LanguageToggle";
import { ThemeToggle } from "../components/ThemeToggle";
import { AuthNavControl } from "../components/AuthNavControl";
import { Reveal } from "../components/Reveal";

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
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-cream-100 via-cream-50 to-sage-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-160 overflow-hidden">
        <div className="animate-blob-drift absolute -left-24 -top-24 h-80 w-80 rounded-full bg-sage-200/50 blur-3xl dark:bg-sage-700/20" />
        <div className="animate-blob-drift absolute -right-16 top-10 h-96 w-96 rounded-full bg-clay-100/60 blur-3xl dark:bg-clay-500/10" style={{ animationDelay: "3s" }} />
      </div>

      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-8">
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
      <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-6 sm:px-8 sm:pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <span className="animate-rise-in rounded-full bg-sage-100 px-4 py-1.5 text-sm font-medium text-sage-700 dark:bg-zinc-800 dark:text-sage-400">
            {t.heroEyebrow}
          </span>
          <h1
            className="animate-rise-in max-w-2xl text-4xl font-bold leading-[1.15] tracking-tight text-ink-900 dark:text-zinc-100 sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            {t.heroTitle} <span className="text-sage-600 dark:text-sage-400">{t.heroTitleAccent}</span>
          </h1>
          <p
            className="animate-rise-in max-w-xl text-lg leading-relaxed text-ink-700/80 dark:text-zinc-400"
            style={{ animationDelay: "160ms" }}
          >
            {t.heroSubtitle}
          </p>
          <div
            className="animate-rise-in mt-2 flex flex-col items-center gap-3 lg:items-start"
            style={{ animationDelay: "240ms" }}
          >
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
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="animate-float-slow relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-sage-200/40 blur-2xl dark:bg-sage-700/20" />
            <img
              src={stockPhotos.heroElderlyMan}
              alt="A smiling elderly man, the kind of person DawaDoc is built for"
              width={700}
              height={875}
              loading="eager"
              className="relative aspect-4/5 w-full rounded-[2.5rem] object-cover shadow-soft-lg ring-1 ring-ink-900/8 dark:ring-white/10"
            />
            <div className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-2xl bg-paper px-4 py-3 shadow-soft-lg ring-1 ring-ink-900/8 dark:bg-zinc-900 dark:ring-white/10">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-100 text-sage-600 dark:bg-zinc-800 dark:text-sage-400">
                <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-ink-900 dark:text-zinc-100">{t.heroCardLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Reveal className="relative z-10">
        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-ink-900 dark:text-zinc-100 sm:text-3xl">
            {t.howItWorksTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {t.steps.map((step, i) => (
              <Reveal key={step.title} delayMs={i * 100}>
                <div className="relative flex h-full flex-col gap-3 rounded-3xl bg-paper p-7 shadow-soft ring-1 ring-ink-900/8 transition-transform hover:-translate-y-1 dark:bg-zinc-900 dark:ring-white/10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-600 text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-ink-900 dark:text-zinc-100">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-700/75 dark:text-zinc-400">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Features */}
      <Reveal className="relative z-10">
        <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink-900 dark:text-zinc-100 sm:text-3xl">
              {t.featuresTitle}
            </h2>
            <p className="mt-2 text-base text-ink-700/70 dark:text-zinc-400">{t.featuresSubtitle}</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((feature, i) => (
              <Reveal key={feature.title} delayMs={i * 60}>
                <div className="flex h-full flex-col gap-2 rounded-2xl bg-paper/80 p-6 ring-1 ring-sage-100 transition-transform hover:-translate-y-1 dark:bg-zinc-900/70 dark:ring-zinc-800">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-clay-100 text-clay-600 dark:bg-clay-500/15 dark:text-clay-400">
                    <FeatureDot />
                  </div>
                  <h3 className="text-base font-semibold text-ink-900 dark:text-zinc-100">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-700/75 dark:text-zinc-400">{feature.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Sign-in benefits */}
      <Reveal className="relative z-10">
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
                className="flex gap-4 rounded-2xl bg-paper p-6 shadow-soft ring-1 ring-ink-900/8 dark:bg-zinc-900 dark:ring-white/10"
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
      </Reveal>

      {/* Trust */}
      <Reveal className="relative z-10">
        <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
          <div className="grid items-center gap-6 rounded-3xl bg-sage-50 p-8 ring-1 ring-sage-100 dark:bg-zinc-900 dark:ring-zinc-800 sm:grid-cols-[auto_1fr] sm:text-left">
            <img
              src={stockPhotos.elderlyWomanPortrait}
              alt="A smiling elderly woman"
              width={128}
              height={128}
              loading="lazy"
              className="mx-auto h-28 w-28 shrink-0 rounded-full object-cover shadow-md ring-4 ring-white dark:ring-zinc-800 sm:mx-0"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold text-ink-900 dark:text-zinc-100">{t.trustTitle}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-700/80 dark:text-zinc-400">{t.trustBody}</p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Final CTA */}
      <Reveal className="relative z-10">
        <section className="relative mx-auto flex max-w-2xl flex-col items-center gap-5 px-5 pb-24 text-center sm:px-8">
          <img
            src={stockPhotos.elderlyWomanLaughing}
            alt=""
            aria-hidden="true"
            width={96}
            height={96}
            loading="lazy"
            className="h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-white dark:ring-zinc-800"
          />
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
      </Reveal>

      <footer className="relative z-10 px-5 pb-8 text-center text-xs text-ink-700/50 dark:text-zinc-500">
        DawaDoc
      </footer>
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
