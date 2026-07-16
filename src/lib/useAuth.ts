import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export interface AppUser {
  name: string;
  email: string;
  photoURL: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(
        firebaseUser
          ? {
              name: firebaseUser.displayName ?? firebaseUser.email ?? "Account",
              email: firebaseUser.email ?? "",
              photoURL: firebaseUser.photoURL,
            }
          : null
      );
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async () => {
    setIsSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google sign-in failed:", err);
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const signOut = useCallback(() => {
    void firebaseSignOut(auth);
  }, []);

  return { user, authReady, isSigningIn, signIn, signOut };
}
