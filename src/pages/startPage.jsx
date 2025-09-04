import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  function startQuiz() {
    navigate("/quiz", { state: { difficulty } });
  }

  return (
    <div className="container">
      <h1 className="title">Welcome to the Quiz App</h1>

      {/* Guidelines */}
      <div className="guidelines">
        <h2>📘 Guidelines</h2>
        <ul>
          <li>⏳ Each question has <strong>30 seconds</strong> to be answered.</li>
          <li>⌨️ You can use your keyboard — <kbd>Tab</kbd> to move across options, <kbd>Enter</kbd>/<kbd>Space</kbd> to select.</li>
          <li>🎯 You have <strong>3 difficulty levels</strong> to choose from: Easy, Medium, Hard.</li>
          <li>🏆 Your <strong>high scores</strong> will be recorded for each level.</li>
        </ul>
      </div>

      {/* Difficulty Selector */}
      <div className="difficulty">
        <label htmlFor="difficulty">Choose Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button className="btn primary" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
