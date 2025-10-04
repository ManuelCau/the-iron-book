import { useState } from "react";
import type { Workout } from "../../types";
import { ExerciseFormat } from "./ExerciseFormat";
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
  return (
    <div className="workout-list">
      <ul>
        {exercises.map((ex) => (
          <li key={ex.id}>
            {ex.name} – {ExerciseFormat(ex)}
            <button
              onClick={() => setExerciseToDelete(ex.id)}
              className="remove-btn"
            >
              ❌
            </button>
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
