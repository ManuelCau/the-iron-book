import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Workout, Exercise } from "../types";

type Props = {
  onAddedWorkout: (workout: Workout) => void;
};

export function NewWorkout({ onAddedWorkout }: Props) {
  const [workout, setWorkout] = useState<Workout>({
    id: Date.now(),
    title: "",
    exercises: [],
  });
  const [exercise, setExercise] = useState<Exercise>({
    id: Date.now(),
    name: "",
    sets: 0,
    reps: 0,
    rest: 0,
  });

  function handleWorkoutChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setWorkout({
      ...workout,
      [e.target.name]: e.target.value,
    });
  }

  function handleExerciseChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setExercise({
      ...exercise,
      [name]: name === "sets" || name === "rest" ? Number(value) : value,
    });
  }

  function addExercise(e: FormEvent) {
    e.preventDefault();
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { ...exercise, id: Date.now() }],
    });
    setExercise({ id: Date.now(), name: "", sets: 0, reps: 0, rest: 0 });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAddedWorkout(workout);
    setWorkout({ id: Date.now(), title: "", exercises: [] });
  }
  return (
    <>
      <div className="new-workout-card">
        <p>NEW WORKOUT</p>
        <form onSubmit={handleSubmit}>
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
          <p>ADD EXERCISES</p>
          <div className="form-inputs">
            <label>Exercise name</label>
            <input
              type="text"
              name="name"
              placeholder="Exercise name"
              value={exercise.name}
              onChange={handleExerciseChange}
            />
          </div>
          <div>
            <div className="form-inputs">
              <label>Sets</label>
              <input
                type="text"
                name="sets"
                placeholder="Sets"
                value={exercise.sets}
                onChange={handleExerciseChange}
              />
            </div>
            <div className="form-inputs">
              <label>Reps</label>
              <input
                type="text"
                name="reps"
                placeholder="Reps"
                value={exercise.reps}
                onChange={handleExerciseChange}
              />
            </div>
          </div>
          <div className="form-inputs">
            <label>Rest min</label>
            <input
              type="text"
              name="rest"
              placeholder="Rest"
              value={exercise.rest}
              onChange={handleExerciseChange}
            />{" "}
            <button className="submit-btn" onClick={addExercise}>
              Add exercise
            </button>
          </div>
          <div className="workout-list">
            <ul>
              {workout.exercises.map((ex) => (
                <li key={ex.id}>
                  {ex.name} - {ex.sets} X {ex.reps} - {ex.rest} rest
                </li>
              ))}
            </ul>
            <button className="submit-btn" type="submit">
              Let's go!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
