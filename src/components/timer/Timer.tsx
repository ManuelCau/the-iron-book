import { useEffect, useState } from "react";

type TimerProps = { initialRest: number };

export function Timer({ initialRest }: TimerProps) {
  const [initialTime, setInitialTime] = useState(initialRest * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    if (initialTime <= 0) {
      setIsRunning(false);
      setInitialTime(initialRest);
      return;
    }

    const interval = setInterval(() => {
      setInitialTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, initialTime]);

  function HandleStartTimer() {
    if (isRunning) {
      setInitialTime(initialRest * 60);
      setIsRunning(false);
    } else {
      setInitialTime(initialRest * 60);
      setIsRunning(true);
    }
  }

  const minutes = Math.floor(initialTime / 60);
  const seconds = initialTime % 60;
  return (
    <>
      <button className="app-btn" onClick={HandleStartTimer}>
        {isRunning
          ? `Time left: ${minutes}:${seconds.toString().padStart(2, "0")}`
          : `Start: ${initialRest} min`}
      </button>
    </>
  );
}
