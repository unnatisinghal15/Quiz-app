import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import questionsData from "../data/questions.json";

// Decode HTML entities
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Shuffle options
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Timer
  const [timeLeft, setTimeLeft] = useState(30);

  // Track locked questions
  const [lockedIndexes, setLockedIndexes] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state?.difficulty || "easy"; // default if not provided

  // Load questions from local JSON filtered by difficulty
  useEffect(() => {
    setLoading(true);

    const filtered = questionsData.filter((q) => q.difficulty === difficulty);
    setQuestions(filtered.length ? filtered : questionsData);
    setLoading(false);
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    if (!questions.length) return;

    setTimeLeft(30);
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t > 1) return t - 1;
        clearInterval(interval);
        autoLockAndNext();
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [index, questions]);

  // Save answer
  function recordAnswer(isLocked = false) {
    const q = questions[index];
    if (!q) return;

    const isCorrect = selected === q.answer;
    const record = {
      questionId: q.id,
      question: q.question,
      options: q.options,
      selectedIndex: selected,
      selectedText: selected !== null ? q.options[selected] : "No answer",
      correctIndex: q.answer,
      correctText: q.options[q.answer],
      isCorrect,
    };

    const newAnswers = [...answers, record];
    setAnswers(newAnswers);
    setSelected(null);

    if (isLocked) {
      setLockedIndexes((prev) => [...prev, index]);
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      // ✅ send difficulty to results
      navigate("/results", { state: { answers: newAnswers, questions, difficulty } });
    }
  }

  // Timer expired
  function autoLockAndNext() {
    recordAnswer(true);
  }

  // User clicks Next
  function manualNext() {
    if (selected === null) {
      alert("Please select an option before continuing (or wait for timer).");
      return;
    }
    recordAnswer(false);
  }

  // User clicks Previous
  function handlePrevious() {
    if (index === 0) return;
    if (lockedIndexes.includes(index)) return;

    setIndex(index - 1);
    setSelected(null);
    if (answers.length > index - 1) {
      setAnswers((prev) => prev.slice(0, Math.max(0, prev.length - 1)));
    }
  }

  // UI states
  if (loading) return <div className="container"><p>Loading questions…</p></div>;
  if (!questions.length) return <div className="container"><p>No questions available.</p></div>;

  const q = questions[index];

  return (
    <div className="container">
      <h1 className="title">Quiz App — {difficulty.toUpperCase()}</h1>

      {/* Progress based on answers given */}
      <ProgressBar current={answers.length} total={questions.length} />

      {/* Timer */}
      <div className="timer">⏳ Time left: {timeLeft}s</div>

      {/* Question with fade-in animation */}
      <div key={index} className="fadeIn">
        {q && (
          <QuestionCard
            question={q}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </div>

      {/* Controls */}
      <div className="controls">
        <button
          className="btn secondary tap"
          onClick={handlePrevious}
          disabled={index === 0 || lockedIndexes.includes(index)}
        >
          Previous
        </button>
        <button className="btn primary tap" onClick={manualNext}>
          {index + 1 === questions.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
