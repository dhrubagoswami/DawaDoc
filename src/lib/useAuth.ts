import { useCallback, useEffect, useState } from "react";

export interface DummyUser {
  name: string;
  email: string;
  photoURL: string | null;
}

const STORAGE_KEY = "dawadoc-dummy-user";

const DUMMY_USER: DummyUser = {
  name: "Priya Sharma",
  email: "priya.sharma@gmail.com",
  photoURL: null,
};

function readStoredUser(): DummyUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DummyUser) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<DummyUser | null>(readStoredUser);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const signIn = useCallback(() => {
    setIsSigningIn(true);
    // Simulated Google account-picker delay — no real auth wired up yet.
    window.setTimeout(() => {
      setUser(DUMMY_USER);
      setIsSigningIn(false);
    }, 700);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  return { user, isSigningIn, signIn, signOut };
}
