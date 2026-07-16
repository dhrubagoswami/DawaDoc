import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import type { Language } from "./types";
import { useTheme } from "./lib/useTheme";
import { LandingPage } from "./pages/LandingPage";
import { ScanPage } from "./pages/ScanPage";

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const { theme, toggleTheme } = useTheme();

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
          />
        }
      />
    </Routes>
  );
}

export default App;
