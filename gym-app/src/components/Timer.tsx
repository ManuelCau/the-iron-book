import { useEffect, useState } from "react";

type TimerProps = { initialRest: number };

export function Timer({ initialRest }: TimerProps) {
  const [initialTime, setInitialTime] = useState(initialRest * 60);
  const [startTimer, setStartTimer] = useState(false);

  useEffect(() => {
    if (!startTimer) return;
    if (initialTime <= 0) {
      setStartTimer(false);
      setInitialTime(initialRest);
      return;
    }

    const interval = setInterval(() => {
      setInitialTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimer, initialTime]);

  function HandleStartTimer() {
    if (startTimer) {
      setInitialTime(initialRest * 60);
      setStartTimer(false);
    } else {
      setInitialTime(initialRest * 60);
      setStartTimer(true);
    }
  }

  const minutes = Math.floor(initialTime / 60);
  const seconds = initialTime % 60;
  return (
    <>
      <button className="app-btn" onClick={HandleStartTimer}>
        {startTimer
          ? `Time left: ${minutes}:${seconds.toString().padStart(2, "0")}`
          : `Start rest: ${initialRest} min`}
      </button>
    </>
  );
}
