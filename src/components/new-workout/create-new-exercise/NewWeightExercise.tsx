import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { Workout, Exercise } from "../../../types";

type Props = {
  workout: Workout;
  setWorkout: Dispatch<SetStateAction<Workout>>;
  prevStep: () => void;
};

export function NewWeightExercise({ workout, setWorkout, prevStep }: Props) {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [weightExercise, setWeightExercise] = useState<Exercise>({
    id: Date.now(),
    name: "",
    sets: 0,
    reps: 0,
    rest: 0,
  });

  useEffect(() => {
    setWeightExercise((weight) => ({ ...weight, ["time"]: min * 60 + sec }));
  }, [min, sec]);

  function handleExerciseChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setWeightExercise({
      ...weightExercise,
      [name]: ["sets", "reps"].includes(name) ? Number(value) : value,
    });
  }

  function addExercise(e: FormEvent) {
    e.preventDefault();
    if (
      !weightExercise.name ||
      weightExercise.sets! <= 0 ||
      weightExercise.reps! <= 0 ||
      weightExercise.rest < 0
    ) {
      alert("Please fill all fields correctly!");
      return;
    }

    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { ...weightExercise, id: Date.now() }],
    });

    setWeightExercise({ id: Date.now(), name: "", sets: 0, reps: 0, rest: 0 });
  }

  return (
    <div className="new-exercise-form">
      <form onSubmit={addExercise}>
        <div className="form-inputs">
          <label>Exercise name</label>
          <input
            type="text"
            name="name"
            value={weightExercise.name}
            onChange={handleExerciseChange}
          />
        </div>
        <div className="form-inputs">
          <label>Sets</label>
          <input
            type="number"
            name="sets"
            value={weightExercise.sets}
            onChange={handleExerciseChange}
          />
        </div>
        <div className="form-inputs">
          <label>Reps</label>
          <input
            type="number"
            name="reps"
            value={weightExercise.reps}
            onChange={handleExerciseChange}
          />
        </div>
        <div className="time-form">
          <p>Rest</p>
          <div className="time-settings">
            <div className="time-form-input">
              <label>Min</label>
              <input
                type="number"
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
              />
            </div>
            <div className="time-form-input">
              <label>Sec</label>
              <input
                type="number"
                value={sec}
                onChange={(e) => setSec(Number(e.target.value))}
              />
            </div>
          </div>
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
