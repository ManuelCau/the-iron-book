import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { Exercise, Workout } from "../../types";

type Props = {
  workout: Workout;
  setWorkout: Dispatch<SetStateAction<Workout>>;
};

export function NewCardioExercise({ workout, setWorkout }: Props) {
  const [cardioExercise, setCardioExercise] = useState<Exercise>({
    id: Date.now(),
    name: "",
    sets: 0,
    time: 0,
    rest: 0,
  });

  function handleCardioExerciseChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCardioExercise({
      ...cardioExercise,
      [name]: ["sets", "time", "rest"].includes(name) ? Number(value) : value,
    });
  }

  function handleCardioSubmit(e: FormEvent) {
    e.preventDefault();
    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { ...cardioExercise, id: Date.now() }],
    });
    setCardioExercise({ id: Date.now(), name: "", sets: 0, time: 0, rest: 0 });
  }

  return (
    <div>
      <p>CARDIO</p>
      <form onSubmit={handleCardioSubmit}>
        <div className="form-inputs">
          <label>Exercise name</label>
          <input
            type="text"
            name="name"
            placeholder="Exercise name"
            value={cardioExercise.name}
            onChange={handleCardioExerciseChange}
          />
        </div>
        <div className="form-inputs">
          <label>Sets</label>
          <input
            type="text"
            name="sets"
            placeholder="Sets"
            value={cardioExercise.sets}
            onChange={handleCardioExerciseChange}
          />
        </div>
        <div className="form-inputs">
          <label>Time</label>
          <input
            type="text"
            name="time"
            placeholder="Time"
            value={cardioExercise.time}
            onChange={handleCardioExerciseChange}
          />
        </div>
        <div className="form-inputs">
          <label>Rest min</label>
          <input
            type="text"
            name="rest"
            placeholder="Rest"
            value={cardioExercise.rest}
            onChange={handleCardioExerciseChange}
          />
          <button className="submit-btn" type="submit">
            Confirm exercise
          </button>
        </div>
      </form>
    </div>
  );
}
