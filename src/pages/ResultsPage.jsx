import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = [], questions = [], difficulty = "easy" } = location.state || {};

  const [highScores, setHighScores] = useState([]);

  const totalCorrect = answers.filter((a) => a.isCorrect).length;
  const scorePercent = Math.round((totalCorrect / questions.length) * 100);

  // Load & update high scores by difficulty
  useEffect(() => {
    const key = `highScores_${difficulty}`;
    const stored = JSON.parse(localStorage.getItem(key) || "[]");

    const newScore = {
      date: new Date().toLocaleString(),
      score: scorePercent,
      correct: totalCorrect,
      total: questions.length,
    };

    const updated = [...stored, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setHighScores(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  }, [difficulty, scorePercent, totalCorrect, questions.length]);

  function handlePlayAgain() {
    navigate("/");
  }

  if (!answers.length) {
    return (
      <div className="container">
        <h1 className="title">Results</h1>
        <p>No results to show. Please take the quiz first.</p>
        <button className="btn primary" onClick={handlePlayAgain}>
          Back to Start
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Results — {difficulty.toUpperCase()}</h1>

      <div className="scoreBox">
        <p className="scoreText">You answered</p>
        <p className="scoreNumber">
          {totalCorrect}/{questions.length}
        </p>
        <p className="scoreText">correct ({scorePercent}%)</p>
      </div>

      {/* High Scores */}
      <div className="highScores">
        <h2>🏆 High Scores ({difficulty.toUpperCase()})</h2>
        {highScores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          <ul>
            {highScores.map((s, i) => (
              <li key={i}>
                {s.score}% ({s.correct}/{s.total}) — {s.date}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Summary */}
      <div className="summary">
        <h2>Review</h2>
        <ul className="summaryList">
          {answers.map((a, i) => (
            <li key={i} className="summaryItem">
              <div className="questionSmall">
                Q{i + 1}: {a.question}
              </div>
              <div>
                Your answer: {a.selectedText}{" "}
                {a.isCorrect ? (
                  <span className="result correct">✔ Correct</span>
                ) : (
                  <span className="result incorrect">
                    ✘ Incorrect (Correct: {a.correctText})
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button className="btn primary" onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
}
