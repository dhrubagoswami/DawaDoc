import { useCallback, useRef, useState } from "react";
import type { Language } from "../types";
import { copy } from "../lib/copy";

interface Props {
  language: Language;
  previewUrl: string | null;
  onFileSelected: (file: File) => void;
  onAnalyze: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export function UploadCard({ language, previewUrl, onFileSelected, onAnalyze, onClear, disabled }: Props) {
  const t = copy[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (file && file.type.startsWith("image/")) {
        onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  return (
    <div className="w-full max-w-xl">
      {!previewUrl ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFiles(e.dataTransfer.files);
          }}
          className={`flex flex-col items-center gap-5 rounded-3xl border-2 border-dashed p-10 text-center transition-colors sm:p-14 ${
            isDragging
              ? "border-sage-500 bg-sage-50 dark:border-sage-400 dark:bg-zinc-800"
              : "border-sage-200 bg-paper dark:border-zinc-700 dark:bg-zinc-900"
          }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 text-sage-600 dark:bg-zinc-800 dark:text-sage-400">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
              <path
                d="M4 16.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1.5M12 3v13m0-13-4 4m4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full bg-sage-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-sage-700 active:scale-[0.98]"
            >
              {t.uploadCta}
            </button>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="rounded-full border-2 border-sage-300 bg-paper px-6 py-3 text-base font-semibold text-sage-700 transition-colors hover:bg-sage-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              {t.cameraCta}
            </button>
          </div>
          <p className="text-sm text-ink-700/70 dark:text-zinc-400">{t.dropHint}</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 rounded-3xl bg-paper p-6 shadow-soft ring-1 ring-ink-900/8 dark:bg-zinc-900 dark:ring-white/10">
          <img
            src={previewUrl}
            alt="Selected prescription"
            className="max-h-80 w-full rounded-2xl object-contain"
          />
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onAnalyze}
              disabled={disabled}
              className="flex-1 rounded-full bg-sage-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-sage-700 active:scale-[0.98] disabled:opacity-60"
            >
              {t.analyzeCta}
            </button>
            <button
              type="button"
              onClick={onClear}
              disabled={disabled}
              className="rounded-full border-2 border-sage-200 bg-paper px-6 py-3 text-base font-semibold text-sage-700 transition-colors hover:bg-sage-50 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              {t.changePhoto}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
