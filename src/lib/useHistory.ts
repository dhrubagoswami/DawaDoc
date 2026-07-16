import { useCallback, useEffect, useState } from "react";
import type { AnalysisResult, Language } from "../types";

export interface HistoryEntry {
  id: string;
  createdAt: number;
  language: Language;
  thumbnailDataUrl: string;
  result: AnalysisResult;
}

const MAX_ENTRIES = 30;

function storageKey(userEmail: string): string {
  return `dawadoc-history:${userEmail}`;
}

function readEntries(userEmail: string): HistoryEntry[] {
  try {
    const raw = window.localStorage.getItem(storageKey(userEmail));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEntries(userEmail: string, entries: HistoryEntry[]) {
  try {
    window.localStorage.setItem(storageKey(userEmail), JSON.stringify(entries));
  } catch {
    // Storage full or unavailable — history is best-effort, fail silently.
  }
}

export function useHistory(userEmail: string | null) {
  const [entries, setEntries] = useState<HistoryEntry[]>(() => (userEmail ? readEntries(userEmail) : []));

  useEffect(() => {
    setEntries(userEmail ? readEntries(userEmail) : []);
  }, [userEmail]);

  const addEntry = useCallback(
    (entry: Omit<HistoryEntry, "id" | "createdAt">) => {
      if (!userEmail) return;
      const newEntry: HistoryEntry = {
        ...entry,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      };
      setEntries((prev) => {
        const next = [newEntry, ...prev].slice(0, MAX_ENTRIES);
        writeEntries(userEmail, next);
        return next;
      });
    },
    [userEmail]
  );

  const removeEntry = useCallback(
    (id: string) => {
      if (!userEmail) return;
      setEntries((prev) => {
        const next = prev.filter((e) => e.id !== id);
        writeEntries(userEmail, next);
        return next;
      });
    },
    [userEmail]
  );

  const clearAll = useCallback(() => {
    if (!userEmail) return;
    setEntries([]);
    writeEntries(userEmail, []);
  }, [userEmail]);

  return { entries, addEntry, removeEntry, clearAll };
}
