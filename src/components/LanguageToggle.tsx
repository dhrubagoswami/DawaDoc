import type { Language } from "../types";

interface Props {
  language: Language;
  onChange: (lang: Language) => void;
}

export function LanguageToggle({ language, onChange }: Props) {
  return (
    <div className="inline-flex items-center rounded-full bg-sage-100 p-1 text-sm font-medium">
      {(["en", "hi"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => onChange(lang)}
          className={`rounded-full px-4 py-1.5 transition-colors ${
            language === lang
              ? "bg-sage-600 text-white shadow-sm"
              : "text-sage-700 hover:text-sage-900"
          }`}
          aria-pressed={language === lang}
        >
          {lang === "en" ? "English" : "हिंदी"}
        </button>
      ))}
    </div>
  );
}
