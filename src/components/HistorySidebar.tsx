import { useState } from "react";
import type { Language } from "../types";
import type { HistoryEntry } from "../lib/useHistory";
import { historyCopy } from "../lib/historyCopy";
import { ConfirmDialog } from "./ConfirmDialog";

interface Props {
  language: Language;
  entries: HistoryEntry[];
  activeId: string | null;
  onSelect: (entry: HistoryEntry) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

function dayKey(timestamp: number): string {
  const d = new Date(timestamp);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function ordinal(day: number): string {
  if (day >= 11 && day <= 13) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

function formatDateHeader(timestamp: number, language: Language, todayLabel: string): string {
  const now = new Date();
  const d = new Date(timestamp);
  if (dayKey(now.getTime()) === dayKey(timestamp)) return todayLabel;

  if (language === "hi") {
    return d.toLocaleDateString("hi-IN", { day: "numeric", month: "long", year: "numeric" });
  }
  const month = d.toLocaleDateString("en-IN", { month: "long" });
  return `${ordinal(d.getDate())} ${month} ${d.getFullYear()}`;
}

function groupByDay(entries: HistoryEntry[]): { key: string; timestamp: number; items: HistoryEntry[] }[] {
  const groups: { key: string; timestamp: number; items: HistoryEntry[] }[] = [];
  for (const entry of entries) {
    const key = dayKey(entry.createdAt);
    const existing = groups.find((g) => g.key === key);
    if (existing) {
      existing.items.push(entry);
    } else {
      groups.push({ key, timestamp: entry.createdAt, items: [entry] });
    }
  }
  return groups;
}

export function HistorySidebar({ language, entries, activeId, onSelect, onDelete, onClearAll }: Props) {
  const t = historyCopy[language];
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const groups = groupByDay(entries);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-sage-600 dark:text-sage-400">
          {t.historyTitle}
        </h2>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={() => setConfirmClearAll(true)}
            className="text-xs font-medium text-ink-700/50 transition-colors hover:text-clay-600 dark:text-zinc-500 dark:hover:text-clay-400"
          >
            {t.clearAll}
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl bg-paper/70 p-5 text-center dark:bg-zinc-900/60">
          <p className="text-sm font-medium text-ink-900 dark:text-zinc-200">{t.emptyTitle}</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-700/60 dark:text-zinc-500">{t.emptySubtitle}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 overflow-y-auto">
          {groups.map((group) => (
            <div key={group.key} className="flex flex-col gap-2">
              <p className="px-1 text-xs font-semibold text-ink-700/60 dark:text-zinc-500">
                {formatDateHeader(group.timestamp, language, t.today)}
              </p>
              <ul className="flex flex-col gap-2">
                {group.items.map((entry) => {
                  const title = entry.result.medicines[0]?.name ?? "—";
                  const extraCount = entry.result.medicines.length - 1;
                  return (
                    <li key={entry.id}>
                      <div
                        className={`group flex items-center gap-3 rounded-2xl p-2.5 transition-colors ${
                          activeId === entry.id
                            ? "bg-sage-100 dark:bg-zinc-800"
                            : "bg-paper/70 hover:bg-sage-50 dark:bg-zinc-900/60 dark:hover:bg-zinc-800"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => onSelect(entry)}
                          className="flex flex-1 items-center gap-3 text-left"
                        >
                          <img
                            src={entry.thumbnailDataUrl}
                            alt=""
                            className="h-11 w-11 shrink-0 rounded-xl object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-ink-900 dark:text-zinc-200">
                              {title}
                              {extraCount > 0 && (
                                <span className="text-ink-700/50 dark:text-zinc-500"> +{extraCount}</span>
                              )}
                            </p>
                            <p className="text-xs text-ink-700/50 dark:text-zinc-500">
                              {new Date(entry.createdAt).toLocaleTimeString(language === "hi" ? "hi-IN" : "en-IN", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(entry.id)}
                          aria-label={t.deleteEntry}
                          className="shrink-0 rounded-full p-1.5 text-ink-700/30 opacity-0 transition-opacity hover:bg-clay-100 hover:text-clay-600 group-hover:opacity-100 dark:text-zinc-600 dark:hover:bg-clay-500/15 dark:hover:text-clay-400"
                        >
                          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                            <path
                              d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmDeleteId !== null}
        title={t.deleteConfirmTitle}
        body={t.deleteConfirmBody}
        confirmLabel={t.deleteConfirmYes}
        cancelLabel={t.deleteConfirmCancel}
        onConfirm={() => {
          if (confirmDeleteId) onDelete(confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />

      <ConfirmDialog
        open={confirmClearAll}
        title={t.clearAllConfirmTitle}
        body={t.clearAllConfirmBody}
        confirmLabel={t.clearAllConfirmYes}
        cancelLabel={t.clearAllConfirmCancel}
        onConfirm={() => {
          onClearAll();
          setConfirmClearAll(false);
        }}
        onCancel={() => setConfirmClearAll(false)}
      />
    </div>
  );
}
