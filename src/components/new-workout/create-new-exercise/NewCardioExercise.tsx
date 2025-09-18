import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { Workout, Exercise } from "../../../types";
import returnBack from "../../../assets/SVG/buttons/arrow-hook-down-left.svg";

type Props = {
  workout: Workout;
  setWorkout: Dispatch<SetStateAction<Workout>>;
  prevStep: () => void;
};

export function NewCardioExercise({ workout, setWorkout, prevStep }: Props) {
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

  function addCardioExercise(e: FormEvent) {
    e.preventDefault();
    if (
      !cardioExercise.name ||
      cardioExercise.sets! <= 0 ||
      cardioExercise.time! <= 0 ||
      cardioExercise.rest < 0
    ) {
      alert("Please fill all fields correctly!");
      return;
    }

    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { ...cardioExercise, id: Date.now() }],
    });

    setCardioExercise({ id: Date.now(), name: "", sets: 0, time: 0, rest: 0 });
  }

  return (
    <div className="new-exercise-form">
      <img
        src={returnBack}
        alt="Back"
        className="back-arrow"
        onClick={prevStep}
      />
      <form onSubmit={addCardioExercise}>
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
            type="number"
            name="sets"
            placeholder="Sets"
            value={cardioExercise.sets}
            onChange={handleCardioExerciseChange}
          />
        </div>
        <div className="form-inputs">
          <label>Time (min)</label>
          <input
            type="number"
            name="time"
            placeholder="Time"
            value={cardioExercise.time}
            onChange={handleCardioExerciseChange}
          />
        </div>
        <div className="form-inputs">
          <label>Rest (min)</label>
          <input
            type="number"
            name="rest"
            placeholder="Rest"
            value={cardioExercise.rest}
            onChange={handleCardioExerciseChange}
          />
        </div>
        <div className="buttons">
          <button className="submit-btn">Add exercise</button>
          <button className="back-btn" onClick={prevStep}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
