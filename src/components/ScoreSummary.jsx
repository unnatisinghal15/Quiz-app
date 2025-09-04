import React from "react";

export default function ScoreSummary({ answers }) {
  if (!answers || !answers.length) {
    return <div style={{ marginTop: 16 }}>No answers to show.</div>;
  }
  return (
    <div className="summary">
      <h3>Summary</h3>
      <ul className="summaryList">
        {answers.map((a, idx) => (
          <li key={idx} className="summaryItem">
            <div className="questionSmall" dangerouslySetInnerHTML={{ __html: a.question }} />
            <div>
              <strong>Your answer:</strong> {a.selectedText || "No answer"}
            </div>
            <div>
              <strong>Correct answer:</strong> {a.correctText}
            </div>
            <div className={`result ${a.isCorrect ? "correct" : "incorrect"}`}>
              {a.isCorrect ? "✅ Correct" : "❌ Incorrect"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
