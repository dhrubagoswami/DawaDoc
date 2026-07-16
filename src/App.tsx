import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import type { Language } from "./types";
import { LandingPage } from "./pages/LandingPage";
import { ScanPage } from "./pages/ScanPage";

function App() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <Routes>
      <Route path="/" element={<LandingPage language={language} onLanguageChange={setLanguage} />} />
      <Route path="/scan" element={<ScanPage language={language} onLanguageChange={setLanguage} />} />
    </Routes>
  );
}

export default App;
