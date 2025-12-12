import { useEffect, useState } from "react";

export default function ResultScreen({ score, onRestart }: { score: number; onRestart: () => void }) {
  const [displayScore, setDisplayScore] = useState(0);

  // Animate number from 0 → final score
  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 1200; // 1.2 sec
    const stepTime = 16;

    const step = () => {
      start += end / (duration / stepTime);
      if (start >= end) start = end;
      setDisplayScore(Math.floor(start));
      if (start < end) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [score]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F4F8] text-center px-6">

      {/* KEEP LEARNING */}
      <div className="bg-white text-[#184A7E] px-6 py-2 rounded-xl shadow-sm mb-6 text-sm font-medium">
        Keep Learning!
      </div>

      {/* Final Score Text */}
      <h2 className="text-[38px] font-serif italic text-[#184A7E] mb-2">
        Your Final score is
      </h2>

      {/* Score Number */}
      <div className="text-[120px] font-serif text-[#184A7E] leading-none mb-6">
        {displayScore}%
      </div>

      {/* Progress Bar */}
      <div className="w-[60%] max-w-xl h-4 bg-[#DDE7EE] rounded-full overflow-hidden mb-10">
        <div
          className="h-full bg-[#78B7E3] transition-all duration-[1200ms]"
          style={{ width: `${displayScore}%` }}
        ></div>
      </div>

      {/* Start Again Button */}
      <button
        onClick={onRestart}
        className="px-10 py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-[#B4DDFE] to-[#8EC8EF] text-[#0F3A60] shadow-md hover:scale-[1.03] transition"
      >
        Start Again
      </button>
    </div>
  );
}
