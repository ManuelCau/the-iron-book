import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { Workout, Exercise } from "../../types";

type Props = {
  workout: Workout;
  setWorkout: Dispatch<SetStateAction<Workout>>;
};

export function NewWeightExercise({ workout, setWorkout }: Props) {
  const [weightExercise, setWeightExercise] = useState<Exercise>({
    id: Date.now(),
    name: "",
    sets: 0,
    reps: 0,
    rest: 0,
  });

  function handleExerciseChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setWeightExercise({
      ...weightExercise,
      [name]: ["sets", "reps", "rest"].includes(name) ? Number(value) : value,
    });
  }

  function addExercise(e: FormEvent) {
    e.preventDefault();
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { ...weightExercise, id: Date.now() }],
    });
    setWeightExercise({ id: Date.now(), name: "", sets: 0, reps: 0, rest: 0 });
  }

  return (
    <div>
      <p>ADD EXERCISES</p>
      <form onSubmit={addExercise}>
        <div className="form-inputs">
          <label>Exercise name</label>
          <input
            type="text"
            name="name"
            placeholder="Exercise name"
            value={weightExercise.name}
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
              value={weightExercise.sets}
              onChange={handleExerciseChange}
            />
          </div>
          <div className="form-inputs">
            <label>Reps</label>
            <input
              type="text"
              name="reps"
              placeholder="Reps"
              value={weightExercise.reps}
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
            value={weightExercise.rest}
            onChange={handleExerciseChange}
          />
          <button className="submit-btn">Confirm exercise</button>
        </div>
      </form>
    </div>
  );
}
