import { useState } from "react";
import type { Workout } from "../../types";
import { PopUp } from "../pop-up/PopUp";

type Props = {
  exercises: Workout["exercises"];

  setWorkout: (value: React.SetStateAction<Workout>) => void;
};

export function ExerciseList({ exercises, setWorkout }: Props) {
  const [exerciseToDelete, setExerciseToDelete] = useState<number | null>(null);
  function handleRemoveExercise(id: number) {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== id),
    }));
    setExerciseToDelete(null);
  }

  function moveExercise(index: number, direction: "up" | "down") {
    setWorkout((prev) => {
      const updated = [...prev.exercises];
      if (direction === "up" && index > 0) {
        [updated[index - 1], updated[index]] = [
          updated[index],
          updated[index - 1],
        ];
      }
      if (direction === "down" && index < updated.length - 1) {
        [updated[index + 1], updated[index]] = [
          updated[index],
          updated[index + 1],
        ];
      }
      return { ...prev, exercises: updated };
    });
  }
  return (
    <div className="workout-list">
      <ul>
        {exercises.map((ex, index) => (
          <li key={ex.id}>
            {ex.reps
              ? `Sets: ${ex.sets} x ${ex.reps} reps`
              : `Sets: ${ex.sets} - ${String(
                  Math.floor(ex.time! / 60)
                ).padStart(2, "0")} : ${String(ex.time! % 60).padStart(
                  2,
                  "0"
                )} min`}
            <div className="exercise-actions">
              <button
                onClick={() => moveExercise(index, "up")}
                disabled={index === 0}
              >
                ⬆️
              </button>
              <button
                onClick={() => moveExercise(index, "down")}
                disabled={index === exercises.length - 1}
              >
                ⬇️
              </button>
              <button
                onClick={() => setExerciseToDelete(ex.id)}
                className="remove-btn"
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
      {exerciseToDelete !== null && (
        <PopUp
          message="Delete exercise?"
          onConfirm={() => handleRemoveExercise(exerciseToDelete)}
          onCancel={() => setExerciseToDelete(null)}
        />
      )}
    </div>
  );
}
