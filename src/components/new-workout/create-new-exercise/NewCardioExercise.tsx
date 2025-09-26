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

export function NewCardioExercise({ workout, setWorkout, prevStep }: Props) {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [cardioExercise, setCardioExercise] = useState<Exercise>({
    id: Date.now(),
    name: "",
    sets: 0,
    time: 0,
    rest: 0,
  });

  useEffect(() => {
    setCardioExercise((cardio) => ({ ...cardio, ["time"]: min * 60 + sec }));
  }, [min, sec]);

  function handleCardioExerciseChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCardioExercise({
      ...cardioExercise,
      [name]: ["sets"].includes(name) ? Number(value) : value,
    });
  }

  function addCardioExercise(e: FormEvent) {
    e.preventDefault();
    if (
      !cardioExercise.name ||
      cardioExercise.sets! <= 0 ||
      cardioExercise.time! <= 0
    ) {
      alert("Please fill all fields correctly!");
      return;
    }

    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { ...cardioExercise, id: Date.now() }],
    });

    setCardioExercise({ id: Date.now(), name: "", sets: 0, time: 0, rest: 0 });
    setMin(0);
    setSec(0);
    window.confirm("Exercise added!");
  }

  return (
    <div className="new-exercise-form">
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
            placeholder="0"
            value={cardioExercise.sets === 0 ? "" : cardioExercise.sets}
            onChange={handleCardioExerciseChange}
          />
        </div>
        <div className="time-form">
          <p>Time</p>
          <div className="time-settings">
            <div className="time-form-input">
              <label>Min</label>
              <input
                type="number"
                placeholder="0"
                value={min === 0 ? "" : min}
                onChange={(e) => setMin(Number(e.target.value))}
              />
            </div>
            <div className="time-form-input">
              <label>Sec</label>
              <input
                type="number"
                placeholder="0"
                value={sec === 0 ? "" : sec}
                onChange={(e) => setSec(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className="buttons">
          <button className="back-btn" onClick={prevStep}>
            Back
          </button>
          <button className="submit-btn">Add exercise</button>
        </div>
      </form>
    </div>
  );
}
