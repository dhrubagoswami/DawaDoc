import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "dawadoc-onboarding-seen";

export function useOnboarding() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (!seen) {
        const timer = window.setTimeout(() => setIsOpen(true), 600);
        return () => window.clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable — skip auto-onboarding, help button still works.
    }
  }, []);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Best-effort persistence only.
    }
  }, []);

  return { isOpen, open, close };
}
