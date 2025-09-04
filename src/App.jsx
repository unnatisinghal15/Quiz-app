import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./pages/startPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <Router>
      {/* Theme toggle */}
      <div style={{ textAlign: "right", padding: "10px" }}>
        <button className="btn secondary" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        {/* Catch-all redirects to Start Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
