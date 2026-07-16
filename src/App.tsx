import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import type { Language } from "./types";
import { useTheme } from "./lib/useTheme";
import { useAuth } from "./lib/useAuth";
import { useOnboarding } from "./lib/useOnboarding";
import { LandingPage } from "./pages/LandingPage";
import { ScanPage } from "./pages/ScanPage";
import { ProfilePage } from "./pages/ProfilePage";
import { WelcomeTour } from "./components/WelcomeTour";
import { HelpButton } from "./components/HelpButton";

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const { theme, toggleTheme } = useTheme();
  const { user, authReady, isSigningIn, signIn, signOut } = useAuth();
  const onboarding = useOnboarding();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              language={language}
              onLanguageChange={setLanguage}
              theme={theme}
              onToggleTheme={toggleTheme}
              user={user}
              isSigningIn={isSigningIn}
              onSignIn={signIn}
            />
          }
        />
        <Route
          path="/scan"
          element={
            <ScanPage
              language={language}
              onLanguageChange={setLanguage}
              theme={theme}
              onToggleTheme={toggleTheme}
              user={user}
              isSigningIn={isSigningIn}
              onSignIn={signIn}
            />
          }
        />
        <Route
          path="/profile"
          element={
            !authReady ? null : user ? (
              <ProfilePage
                user={user}
                language={language}
                onLanguageChange={setLanguage}
                theme={theme}
                onToggleTheme={toggleTheme}
                onSignOut={signOut}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <HelpButton language={language} onClick={onboarding.open} />
      <WelcomeTour language={language} open={onboarding.isOpen} onClose={onboarding.close} />
    </>
  );
}

export default App;
