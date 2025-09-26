import type { Workout } from "../../types";
import { ExerciseFormat } from "./ExerciseFormat";

type Props = {
  exercises: Workout["exercises"];

  setWorkout: (value: React.SetStateAction<Workout>) => void;
};

export function ExerciseList({ exercises, setWorkout }: Props) {
  function handleRemoveExercise(id: number) {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== id),
    }));
  }
  return (
    <div className="workout-list">
      <ul>
        {exercises.map((ex) => (
          <li key={ex.id}>
            {ex.name} – {ExerciseFormat(ex)}
            <button
              onClick={() => handleRemoveExercise(ex.id)}
              className="remove-btn"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
