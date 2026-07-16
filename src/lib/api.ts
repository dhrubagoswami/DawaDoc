import type { AnalysisResult, AnalyzeErrorBody, Language } from "../types";

export async function analyzeImage(
  base64: string,
  mimeType: string,
  language: Language
): Promise<AnalysisResult> {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64: base64, mimeType, language }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as AnalyzeErrorBody | null;
    throw new Error(body?.error ?? "Something went wrong. Please try again.");
  }

  return (await res.json()) as AnalysisResult;
}
