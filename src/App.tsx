import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import type { Language } from "./types";
import { useTheme } from "./lib/useTheme";
import { useAuth } from "./lib/useAuth";
import { LandingPage } from "./pages/LandingPage";
import { ScanPage } from "./pages/ScanPage";
import { ProfilePage } from "./pages/ProfilePage";

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const { theme, toggleTheme } = useTheme();
  const { user, isSigningIn, signIn, signOut } = useAuth();

  return (
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
          user ? (
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
  );
}

export default App;
