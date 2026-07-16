import { useCallback, useState } from "react";
import type { AnalysisResult, Language } from "./types";
import { copy } from "./lib/copy";
import { prepareImageFile } from "./lib/image";
import { analyzeImage } from "./lib/api";
import { Header } from "./components/Header";
import { UploadCard } from "./components/UploadCard";
import { LoadingState } from "./components/LoadingState";
import { ResultView } from "./components/ResultView";
import { Disclaimer } from "./components/Disclaimer";

type Stage = "idle" | "loading" | "result";

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [stage, setStage] = useState<Stage>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = copy[language];

  const handleFileSelected = useCallback(async (file: File) => {
    setError(null);
    try {
      const prepared = await prepareImageFile(file);
      setPreviewUrl(prepared.previewUrl);
      setPendingImage({ base64: prepared.base64, mimeType: prepared.mimeType });
      setResult(null);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric);
      setStage("idle");
    }
  }, [pendingImage, language, t.errorGeneric]);

  const handleClear = useCallback(() => {
    setPreviewUrl(null);
    setPendingImage(null);
    setResult(null);
    setStage("idle");
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-cream-100 via-cream-50 to-sage-50">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-5 pb-16 pt-6 sm:px-8">
        {stage !== "result" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-ink-900 sm:text-4xl">
              {t.heroTitle}
            </h1>
            <p className="max-w-md text-base leading-relaxed text-ink-700/80">{t.heroSubtitle}</p>
          </div>
        )}

        {error && (
          <div className="w-full max-w-xl rounded-2xl bg-clay-100 px-5 py-3 text-center text-sm font-medium text-clay-600">
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
          <ResultView result={result} language={language} onRetake={handleClear} />
        )}

        <Disclaimer language={language} />
      </main>

      <footer className="px-5 pb-8 text-center text-xs text-ink-700/50">{t.footerBuiltFor}</footer>
    </div>
  );
}

export default App;
