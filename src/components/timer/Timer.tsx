import { useEffect, useState } from "react";

type TimerProps = {
  time?: number;
  rest: number;
};

export function Timer({ time, rest }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState((time ?? rest) * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isExercisePhase, setIsExercisePhase] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      if (time && isExercisePhase) {
        setIsExercisePhase(false);
        setTimeLeft(rest * 60);
      } else {
        setIsExercisePhase(true);
        setTimeLeft((time ?? rest) * 60);
        setIsRunning(false);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isExercisePhase, time, rest]);

  function handleStartStop() {
    if (isRunning) {
      setIsRunning(false);
      setIsExercisePhase(true);
      setTimeLeft((time ?? rest) * 60);
    } else {
      setIsRunning(true);
    }
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const buttonStyle = {
    backgroundColor: time
      ? isExercisePhase
        ? "#ff4d4d"
        : "#4dff88"
      : "#4dff88",
  };

  return (
    <button className="timer" onClick={handleStartStop} style={buttonStyle}>
      {minutes}:{seconds.toString().padStart(2, "0")}
    </button>
  );
}
