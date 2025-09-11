import { useState, type ChangeEvent } from "react";
import type { Exercise } from "../../types";
import { Timer } from "../timer/Timer";

type Props = {
  exerciseData: Exercise[];
  setExerciseData: React.Dispatch<React.SetStateAction<Exercise[]>>;
};

export function ExerciseCard({ exerciseData, setExerciseData }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleExerciseData(e: ChangeEvent<HTMLInputElement>, id: number) {
    const { name, value } = e.target;
    setExerciseData((prev) =>
      prev.map((ex) =>
        ex.id === id
          ? {
              ...ex,
              [name]: ["sets", "time", "reps", "kg", "rest"].includes(name)
                ? Number(value)
                : value,
            }
          : ex
      )
    );
  }

  const currentExercise = exerciseData[currentIndex];

  const isCardio = typeof currentExercise.time === "number";
  const isWeight = typeof currentExercise.reps === "number";

  return (
    <>
      <div className="exercise-card">
        <p>{currentExercise.name}</p>

        {isWeight && (
          <p>
            {currentExercise.sets} x {currentExercise.reps} — Rest:{" "}
            {currentExercise.rest}
          </p>
        )}

        {isCardio && (
          <p>
            Time: {currentExercise.time} min — Rest: {currentExercise.rest} min
          </p>
        )}

        <div>
          {isWeight && (
            <div className="exercise-form">
              <div className="exercise-property">
                <label>Kg</label>
                <input
                  type="number"
                  name="kg"
                  value={currentExercise.kg ?? 0}
                  onChange={(e) => handleExerciseData(e, currentExercise.id)}
                />
              </div>
              <div className="exercise-property">
                <label>Reps</label>
                <input
                  type="number"
                  name="reps"
                  value={currentExercise.reps ?? 0}
                  onChange={(e) => handleExerciseData(e, currentExercise.id)}
                />
              </div>
            </div>
          )}
        </div>

        {isCardio && (
          <div className="timer">
            <p>Cardio Timer</p>
            <Timer initialRest={currentExercise.time ?? 0} />
          </div>
        )}

        <div className="timer">
          <p>Rest</p>
          <Timer initialRest={currentExercise.rest} />
        </div>
      </div>

      <div className="exercise-nav">
        <button
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          Prev
        </button>
        <button
          disabled={currentIndex === exerciseData.length - 1}
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
