import { useEffect, useState } from "react";

type TimerProps = {
  time?: number;
  rest: number;
  sets?: number;
  numberOfExercises?: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
  handleSubmitWorkout: () => void;
  isChanged: boolean;
};

export function Timer({
  time,
  rest,
  sets,
  numberOfExercises,
  handleSubmitWorkout,
  setCurrentIndex,
  currentIndex,
  isChanged,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(time ?? rest);
  const [isRunning, setIsRunning] = useState(false);
  const [isExercisePhase, setIsExercisePhase] = useState(true);
  const [currentSet, setCurrentSet] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (timeLeft! === 0) {
        if (time && isExercisePhase && rest) {
          setTimeLeft(time);
          setIsExercisePhase(!isExercisePhase);
        }
        if (time && !isExercisePhase && rest) {
          setTimeLeft(rest);
          setIsExercisePhase(!isExercisePhase);
        }

        if (currentSet === sets && currentIndex == numberOfExercises) {
          setIsExercisePhase(true);
          setIsRunning(false);
          handleSubmitWorkout(); //a fine esercizio doppio alert a schermo e [Violation] 'setInterval' handler took 13386ms
        } else if (currentSet === sets) {
          setCurrentIndex((prev) => prev + 1);
          setCurrentSet(0);
        }

        if (!rest) {
          setTimeLeft(time!);
          setIsRunning(false);
        }
      } else {
        setTimeLeft((prev) => prev! - 1);
      }
    }, 1000);

    if (currentSet === sets && !isRunning) {
      return () => clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isExercisePhase, time, rest]);

  useEffect(() => {
    if (isExercisePhase) {
      setTimeLeft(time ?? rest);
    } else {
      setTimeLeft(rest);
      setCurrentSet((prev) => prev + 1);
    }
  }, [isExercisePhase]);

  useEffect(() => {
    setIsRunning(false);
    setTimeLeft(time ?? rest);
  }, [isChanged]);

  function handleStartStop() {
    if (isRunning) {
      setIsRunning(false);
      setIsExercisePhase(true);
    } else {
      setIsRunning(true);
    }
  }

  function handleResetButton() {
    setIsRunning(false);
    setTimeLeft(time ?? rest);
  }

  const minutes = Math.floor(timeLeft! / 60);
  const seconds = timeLeft! % 60;

  const buttonStyle = {
    backgroundColor: time
      ? isExercisePhase
        ? "#ff4d4d"
        : "#4dff88"
      : "#4dff88",
  };

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      const sound = new Audio(
        `${import.meta.env.BASE_URL}audio/beep-401570.mp3`
      );
      sound.play().catch(() => {
        console.log("Audio could not be played now");
        if (isExercisePhase) isExercisePhase;
      });
    }
  }, [timeLeft, isRunning, isExercisePhase]);

  return (
    <div>
      <button
        className="timer-button"
        onClick={handleStartStop}
        style={buttonStyle}
      >
        {minutes}:{seconds.toString().padStart(2, "0")}
      </button>
      <button className="reset-button" onClick={handleResetButton}>
        Reset
      </button>
    </div>
  );
}
