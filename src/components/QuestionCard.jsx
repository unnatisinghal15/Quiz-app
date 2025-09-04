import React from "react";

export default function QuestionCard({ question, selected, setSelected }) {
  return (
    <div
      className="question-card"
      role="group"
      aria-labelledby={`q-${question.id}`}
    >
      {/* Question text */}
      <h2 id={`q-${question.id}`} className="question-text">
        {question.question}
      </h2>

      {/* Options */}
      <ul className="options" role="radiogroup" aria-label="Answer choices">
        {question.options.map((opt, i) => (
          <li key={i}>
            <button
              type="button"
              role="radio"
              aria-checked={selected === i}
              tabIndex={0}
              className={`option-btn ${selected === i ? "selected" : ""}`}
              onClick={() => setSelected(i)}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
