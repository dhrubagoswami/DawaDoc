import { useCallback, useState } from "react";
import type { AnalysisResult, Language } from "../types";
import type { Theme } from "../lib/useTheme";
import type { AppUser } from "../lib/useAuth";
import { copy } from "../lib/copy";
import { historyCopy } from "../lib/historyCopy";
import { prepareImageFile } from "../lib/image";
import { analyzeImage } from "../lib/api";
import { useHistory, type HistoryEntry } from "../lib/useHistory";
import { Header } from "../components/Header";
import { UploadCard } from "../components/UploadCard";
import { LoadingState } from "../components/LoadingState";
import { ResultView } from "../components/ResultView";
import { Disclaimer } from "../components/Disclaimer";
import { HistorySidebar } from "../components/HistorySidebar";

type Stage = "idle" | "loading" | "result";

interface Props {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onToggleTheme: () => void;
  user: AppUser | null;
  isSigningIn: boolean;
  onSignIn: () => void;
}

export function ScanPage({
  language,
  onLanguageChange,
  theme,
  onToggleTheme,
  user,
  isSigningIn,
  onSignIn,
}: Props) {
  const [stage, setStage] = useState<Stage>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<{
    base64: string;
    mimeType: string;
    thumbnailDataUrl: string;
  } | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem("dawadoc-sidebar-collapsed") === "1"
  );

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem("dawadoc-sidebar-collapsed", next ? "1" : "0");
      return next;
    });
  }, []);

  const t = copy[language];
  const th = historyCopy[language];
  const { entries, addEntry, removeEntry, clearAll } = useHistory(user?.email ?? null);

  const handleFileSelected = useCallback(async (file: File) => {
    setError(null);
    try {
      const prepared = await prepareImageFile(file);
      setPreviewUrl(prepared.previewUrl);
      setPendingImage({
        base64: prepared.base64,
        mimeType: prepared.mimeType,
        thumbnailDataUrl: prepared.thumbnailDataUrl,
      });
      setResult(null);
      setActiveHistoryId(null);
      setStage("idle");
    } catch {
      setError(t.errorGeneric);
    }
  }, [t.errorGeneric]);

  const handleAnalyze = useCallback(async () => {
    if (!pendingImage) return;
    setStage("loading");
    setError(null);
    try {
      const analysis = await analyzeImage(pendingImage.base64, pendingImage.mimeType, language);
      setResult(analysis);
      setStage("result");
      if (user && analysis.isReadable && analysis.medicines.length > 0) {
        addEntry({
          language,
          thumbnailDataUrl: pendingImage.thumbnailDataUrl,
          result: analysis,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric);
      setStage("idle");
    }
  }, [pendingImage, language, t.errorGeneric, user, addEntry]);

  const handleClear = useCallback(() => {
    setPreviewUrl(null);
    setPendingImage(null);
    setResult(null);
    setActiveHistoryId(null);
    setStage("idle");
    setError(null);
  }, []);

  const handleSelectHistory = useCallback((entry: HistoryEntry) => {
    setPreviewUrl(null);
    setPendingImage(null);
    setResult(entry.result);
    setActiveHistoryId(entry.id);
    setStage("result");
    setError(null);
    setHistoryDrawerOpen(false);
  }, []);

  const handleDeleteHistory = useCallback(
    (id: string) => {
      removeEntry(id);
      if (activeHistoryId === id) handleClear();
    },
    [removeEntry, activeHistoryId, handleClear]
  );

  return (
    <div className="min-h-screen bg-linear-to-b from-cream-100 via-cream-50 to-sage-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      <Header
        language={language}
        onLanguageChange={onLanguageChange}
        theme={theme}
        onToggleTheme={onToggleTheme}
        user={user}
        isSigningIn={isSigningIn}
        onSignIn={onSignIn}
        onOpenHistory={() => setHistoryDrawerOpen(true)}
      />

      {user && (
        <aside
          className={`fixed left-0 top-20 z-30 hidden flex-col lg:flex ${sidebarCollapsed ? "w-10" : "w-72"}`}
          style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <div className="flex items-center justify-end px-2 pb-2 pt-1">
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label={sidebarCollapsed ? "Open history" : "Collapse history"}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-sage-200 bg-paper text-sage-600 shadow-sm transition-colors hover:bg-sage-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path
                  d={sidebarCollapsed ? "M9 5l6 7-6 7" : "M15 5 9 12l6 7"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {!sidebarCollapsed && (
            <div className="min-h-0 flex-1 overflow-y-auto pb-10 pl-4 pr-3">
              <HistorySidebar
                language={language}
                entries={entries}
                activeId={activeHistoryId}
                onSelect={handleSelectHistory}
                onDelete={handleDeleteHistory}
                onClearAll={clearAll}
              />
            </div>
          )}
        </aside>
      )}

      <main className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 px-5 pb-16 pt-6 sm:px-8">
          {stage !== "result" && (
            <div className="animate-rise-in flex flex-col items-center gap-3 text-center">
              <h1 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-ink-900 dark:text-zinc-100 sm:text-4xl">
                {t.heroTitle}
              </h1>
              <p className="max-w-md text-base leading-relaxed text-ink-700/80 dark:text-zinc-400">
                {t.heroSubtitle}
              </p>
            </div>
          )}

          {error && (
            <div className="w-full max-w-xl rounded-2xl bg-clay-100 px-5 py-3 text-center text-sm font-medium text-clay-600 dark:bg-clay-500/15 dark:text-clay-400">
              {error}
            </div>
          )}

          {stage === "loading" && <LoadingState language={language} />}

          {stage !== "loading" && stage !== "result" && (
            <UploadCard
              language={language}
              previewUrl={previewUrl}
              onFileSelected={handleFileSelected}
              onAnalyze={handleAnalyze}
              onClear={handleClear}
            />
          )}

          {stage === "result" && result && (
            <div className="flex w-full flex-col gap-3">
              {activeHistoryId && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="self-start rounded-full border-2 border-sage-200 bg-paper px-4 py-1.5 text-xs font-semibold text-sage-700 transition-colors hover:bg-sage-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                >
                  {th.newScan}
                </button>
              )}
              <ResultView result={result} language={language} onRetake={handleClear} />
              {!activeHistoryId && user && result.isReadable && result.medicines.length > 0 && (
                <p className="text-center text-xs text-sage-600 dark:text-sage-400">{th.savedNotice}</p>
              )}
            </div>
          )}

        <Disclaimer language={language} />
      </main>

      <footer className="px-5 pb-8 text-center text-xs text-ink-700/50 dark:text-zinc-500">
        {t.footerBuiltFor}
      </footer>

      {user && historyDrawerOpen && (
        <div
          className="fixed inset-0 z-40 flex lg:hidden"
          onClick={() => setHistoryDrawerOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative ml-auto flex h-full w-72 flex-col bg-cream-50 p-5 shadow-xl dark:bg-zinc-950"
          >
            <button
              type="button"
              onClick={() => setHistoryDrawerOpen(false)}
              aria-label="Close"
              className="mb-2 self-end rounded-full p-1.5 text-ink-700/60 hover:bg-sage-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <HistorySidebar
              language={language}
              entries={entries}
              activeId={activeHistoryId}
              onSelect={handleSelectHistory}
              onDelete={handleDeleteHistory}
              onClearAll={clearAll}
            />
          </div>
        </div>
      )}
    </div>
  );
}
