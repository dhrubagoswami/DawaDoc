import type { Language } from "../types";

export interface AuthCopy {
  signInCta: string;
  signingIn: string;
  profileTitle: string;
  backToApp: string;
  languageLabel: string;
  themeLabel: string;
  signOut: string;
  signOutConfirmTitle: string;
  signOutConfirmBody: string;
  signOutConfirmYes: string;
  signOutConfirmCancel: string;
}

export const authCopy: Record<Language, AuthCopy> = {
  en: {
    signInCta: "Sign in with Google",
    signingIn: "Signing in…",
    profileTitle: "Your profile",
    backToApp: "Back",
    languageLabel: "Language",
    themeLabel: "Theme",
    signOut: "Sign out",
    signOutConfirmTitle: "Sign out of DawaDoc?",
    signOutConfirmBody: "You'll need to sign in again to see your profile.",
    signOutConfirmYes: "Sign out",
    signOutConfirmCancel: "Cancel",
  },
  hi: {
    signInCta: "Google से साइन इन करें",
    signingIn: "साइन इन हो रहा है…",
    profileTitle: "आपकी प्रोफ़ाइल",
    backToApp: "वापस",
    languageLabel: "भाषा",
    themeLabel: "थीम",
    signOut: "साइन आउट करें",
    signOutConfirmTitle: "क्या आप दवाडॉक से साइन आउट करना चाहते हैं?",
    signOutConfirmBody: "प्रोफ़ाइल देखने के लिए आपको दोबारा साइन इन करना होगा।",
    signOutConfirmYes: "साइन आउट करें",
    signOutConfirmCancel: "रद्द करें",
  },
};
