import { useEffect, useState } from "react";
import { quizData } from "./questions";

export default function App() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>(
    Array(quizData.length).fill("")
  );
  const [showResult, setShowResult] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);

  const total = quizData.length;
  const q = quizData[current];

  // When user selects an option
  const selectOption = (opt: string) => {
    const updated = [...answers];
    updated[current] = opt;
    setAnswers(updated);
  };

  // Navigation
  const next = () => current < total - 1 && setCurrent(current + 1);
  const prev = () => current > 0 && setCurrent(current - 1);

  // Submit logic
  const submitQuiz = () => {
    const correct = answers.filter(
      (ans, idx) => ans === quizData[idx].answer
    ).length;

    const percentage = (correct / total) * 100;

    animateScore(percentage);
    setShowResult(true);
  };

  // Animate number from 0 → final score
  const animateScore = (score: number) => {
    let start = 0;
    const end = score;
    const duration = 1200;
    const stepTime = 16;

    const step = () => {
      start += end / (duration / stepTime);
      if (start >= end) start = end;
      setDisplayScore(Math.floor(start));
      if (start < end) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // ---------------------------------------------------
  //                    RESULTS PAGE
  // ---------------------------------------------------
  if (showResult) {
    return (
      <div
        className="min-h-screen w-full flex flex-col items-center justify-center"
        style={{ background: "#E8F3F6" }}
      >
        {/* Keep Learning Pill */}
        <div
          className="px-6 py-2 rounded-xl text-black text-lg font-medium mb-8"
          style={{
            background: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          Keep Learning!
        </div>

        {/* Score Title */}
        <h1
          className="text-[48px] font-serif italic font-semibold text-[#184A7E] text-center"
          style={{ transform: "skewX(-4deg)" }}
        >
          Your Final score is
        </h1>

        {/* Score Number */}
        <div className="text-[140px] font-serif font-bold text-[#184A7E] leading-none mt-4 mb-2">
          {displayScore}
          <span className="text-[60px] align-top">%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-[60%] max-w-xl h-4 bg-[#DDE7EE] rounded-full overflow-hidden mb-10">
          <div
            className="h-full bg-[#78B7E3] transition-all duration-[1200ms]"
            style={{ width: `${displayScore}%` }}
          ></div>
        </div>

        {/* Start Again */}
        <button
          onClick={() => {
            setShowResult(false);
            setCurrent(0);
            setDisplayScore(0);
            setAnswers(Array(total).fill(""));
          }}
          className="mt-8 px-10 py-3 text-lg font-semibold rounded-xl text-[#184A7E]"
          style={{
            background: "linear-gradient(135deg, #D7EFFF, #A8CCF0)",
            boxShadow: "0 8px 18px rgba(120,160,200,0.35)",
          }}
        >
          Start Again
        </button>
      </div>
    );
  }

  // ---------------------------------------------------
  //                    QUIZ PAGE
  // ---------------------------------------------------
  return (
    <div
      className="min-h-screen w-full 
      bg-gradient-to-br from-[#A8CCF0] via-[#D6EBF8] to-[#C3F4EE]
      flex items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 75% 20%, rgba(180,220,255,0.45), rgba(220,245,255,0.07) 60%)",
          filter: "blur(65px)",
        }}
      />

      {/* OUTER FRAME */}
      <div
        className="max-w-5xl w-full rounded-[44px] p-4 relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.92))",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow:
            "0 28px 55px rgba(60,100,140,0.20), 0 10px 18px rgba(60,100,140,0.08)",
        }}
      >
        {/* INNER CARD */}
        <div
          className="rounded-[34px] p-12 pb-28 relative bg-white/70 backdrop-blur-2xl"
          style={{
            border: "2px solid rgba(255,255,255,0.75)",
            boxShadow:
              "inset 0 0 18px rgba(210,225,240,0.55), inset 0 0 3px rgba(255,255,255,0.95)",
          }}
        >
          {/* Paw */}
          <div
            className="absolute left-6 bottom-6 w-28 pointer-events-none z-20"
            style={{ transformOrigin: "50% 100%" }}
          >
            <img
              src="/paw.png"
              className="w-full h-full object-contain drop-shadow-xl animate-pawJump animate-pawOpen"
              alt=""
            />
          </div>

          {/* Heading */}
          <h1
            className="text-[54px] font-serif font-semibold italic text-[#184A7E] text-center leading-tight"
            style={{ transform: "skewX(-4deg)" }}
          >
            Test Your Knowledge
          </h1>

          {/* ⭐ WHITE PILL UNDER HEADING ⭐ */}
          <div
            className="px-6 py-2 bg-white rounded-xl shadow-sm 
                       text-[#184A7E] text-sm font-medium 
                       mx-auto mt-3 mb-6 w-fit"
          >
            Answer all questions to see your results
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center mt-4 mb-6">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={`h-1 w-1/4 rounded-full transition-all ${
                  i === current ? "bg-[#18386F]" : "bg-[#E8EDF0]"
                } ${i !== total - 1 ? "mx-4" : ""}`}
              />
            ))}
          </div>

          {/* Question */}
          <div className="bg-blue-100/50 rounded-xl p-4 text-center text-lg font-medium text-blue-900 border border-blue-200 shadow-sm">
            {current + 1}. {q.question}
          </div>

          {/* Options */}
          <div className="mt-4 space-y-3">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => selectOption(opt)}
                className={`w-full py-3 rounded-xl border transition
                  ${
                    answers[current] === opt
                      ? "bg-blue-200 border-blue-400"
                      : "border-blue-200 hover:bg-blue-50"
                  }
                `}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-end mt-8 space-x-3">
            <button
              onClick={prev}
              disabled={current === 0}
              className="p-3 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 disabled:opacity-40"
            >
              ←
            </button>

            {current === total - 1 ? (
              <button
                onClick={submitQuiz}
                className="px-6 py-3 bg-blue-100 border border-blue-300 rounded-xl hover:bg-blue-200 transition text-[#184A7E]"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={next}
                className="p-3 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100"
              >
                →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
