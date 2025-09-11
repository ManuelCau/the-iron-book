import { useState, type ChangeEvent } from "react";
import type { Workout } from "../../types";
import { NewWeightExercise } from "../create-new-exercise/NewWeightExercise";
import { NewCardioExercise } from "../create-new-exercise/NewCardioExercise";

type Props = {
  onAddedWorkout: (workout: Workout) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export function NewWorkout({ onAddedWorkout, setShowForm }: Props) {
  const [workout, setWorkout] = useState<Workout>({
    id: Date.now(),
    title: "",
    exercises: [],
  });
  const [showWeightExerciseForm, setShowWeightExerciseForm] = useState(false);
  const [showCardioExerciseForm, setShowCardioExerciseForm] = useState(false);

  function handleWorkoutChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onAddedWorkout(workout);
    setWorkout({ id: Date.now(), title: "", exercises: [] });
    setShowWeightExerciseForm(false);
    setShowCardioExerciseForm(false);
    setShowForm(false);
  }

  function handleDeleteExercise(id: number) {
    setWorkout({
      ...workout,
      exercises: workout.exercises.filter((e) => e.id !== id),
    });
  }

  return (
    <div className="new-workout-card">
      <p>NEW WORKOUT</p>
      <div className="form-inputs">
        <label> Workout name </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={workout.title}
          onChange={handleWorkoutChange}
        />
      </div>

      <button
        className="submit-btn"
        onClick={() => setShowWeightExerciseForm(!showWeightExerciseForm)}
      >
        New exercise
      </button>
      {showWeightExerciseForm && (
        <NewWeightExercise workout={workout} setWorkout={setWorkout} />
      )}

      <button
        className="submit-btn"
        onClick={() => setShowCardioExerciseForm(!showCardioExerciseForm)}
      >
        New Cardio
      </button>
      {showCardioExerciseForm && (
        <NewCardioExercise workout={workout} setWorkout={setWorkout} />
      )}

      <div className="workout-list">
        <ul>
          {workout.exercises.map((ex) => (
            <li key={ex.id}>
              <div>
                {ex.name} - {ex.sets} X {ex.reps}
              </div>
              <button onClick={() => handleDeleteExercise(ex.id)}>X</button>
            </li>
          ))}
        </ul>
        <button className="submit-btn" onClick={handleSubmit}>
          Let's go!
        </button>
      </div>
    </div>
  );
}
