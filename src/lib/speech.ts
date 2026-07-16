import type { Language } from "../types";

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices() {
  cachedVoices = window.speechSynthesis?.getVoices() ?? [];
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function pickVoice(language: Language): SpeechSynthesisVoice | undefined {
  const prefix = language === "hi" ? "hi" : "en";
  return (
    cachedVoices.find((v) => v.lang.toLowerCase().startsWith(prefix) && v.localService) ??
    cachedVoices.find((v) => v.lang.toLowerCase().startsWith(prefix))
  );
}

export function isSpeechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, language: Language) {
  if (!isSpeechSupported() || !text.trim()) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
  const voice = pickVoice(language);
  if (voice) utterance.voice = voice;
  utterance.rate = 0.92;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
}
