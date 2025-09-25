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

export function NewCircuitExercise({ workout, setWorkout, prevStep }: Props) {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [circuitExercise, setCircuitExercise] = useState<Exercise>({
    id: Date.now(),
    name: "",
    sets: 0,
    time: 0,
    rest: 0,
  });

  useEffect(() => {
    setCircuitExercise((circuit) => ({ ...circuit, ["time"]: min * 60 + sec }));
  }, [min, sec]);

  function handleCircuitExerciseChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCircuitExercise({
      ...circuitExercise,
      [name]: ["sets"].includes(name) ? Number(value) : value,
    });
  }

  function addCircuitExercise(e: FormEvent) {
    e.preventDefault();
    if (
      !circuitExercise.name ||
      circuitExercise.sets! <= 0 ||
      circuitExercise.time! <= 0 ||
      circuitExercise.rest! < 0
    ) {
      alert("Please fill all fields correctly!");
      return;
    }

    setWorkout({
      ...workout,
      exercises: [...workout.exercises, { ...circuitExercise, id: Date.now() }],
    });

    setCircuitExercise({ id: Date.now(), name: "", sets: 0, time: 0, rest: 0 });
  }

  return (
    <div className="new-exercise-form">
      <form onSubmit={addCircuitExercise}>
        <div className="form-inputs">
          <label>Exercise name</label>
          <input
            type="text"
            name="name"
            placeholder="Exercise name"
            value={circuitExercise.name}
            onChange={handleCircuitExerciseChange}
          />
        </div>

        <div className="form-inputs">
          <label>Sets</label>
          <input
            type="number"
            name="sets"
            placeholder="Sets"
            value={circuitExercise.sets}
            onChange={handleCircuitExerciseChange}
          />
        </div>

        <div className="time-form">
          <p>Time</p>
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

        <div className="time-form">
          <p>Rest</p>
          <div className="time-settings">
            <div className="time-form-input">
              <label>Min</label>
              <input
                type="number"
                value={Math.floor(circuitExercise.rest / 60)}
                onChange={(e) =>
                  setCircuitExercise({
                    ...circuitExercise,
                    rest:
                      Number(e.target.value) * 60 + (circuitExercise.rest % 60),
                  })
                }
              />
            </div>
            <div className="time-form-input">
              <label>Sec</label>
              <input
                type="number"
                value={circuitExercise.rest % 60}
                onChange={(e) =>
                  setCircuitExercise({
                    ...circuitExercise,
                    rest:
                      Math.floor(circuitExercise.rest / 60) * 60 +
                      Number(e.target.value),
                  })
                }
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
