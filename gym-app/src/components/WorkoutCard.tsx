import { useState, type ChangeEvent } from "react";
import type { Workout, Exercise } from "../types";
import { Timer } from "./Timer";

type Props = {
  workout: Workout;
  onDelete: (id: number) => void;
  onUpdate: (updated: Workout) => void;
};

export function WorkoutCard({ workout, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  const [exerciseData, setExerciseData] = useState<Exercise[]>(
    workout.exercises.map((ex) => ({ ...ex }))
  );

  const [completed, setCompleted] = useState<Exercise[][]>([]);

  function handleExerciseData(e: ChangeEvent<HTMLInputElement>, id: number) {
    const { name, value } = e.target;
    setExerciseData((prev) =>
      prev.map((ex) =>
        ex.id === id
          ? {
              ...ex,
              [name]: ["sets", "reps", "kg", "rest"].includes(name)
                ? Number(value)
                : value,
            }
          : ex
      )
    );
  }

  function handleComplete() {
    setCompleted((prev) => [...prev, exerciseData]);
    setExerciseData(workout.exercises.map((ex) => ({ ...ex })));
    setOpen(false);
  }

  return (
    <div className="workout-card">
      <div>
        <p className="workout-title">
          <strong>{workout.title}</strong>
        </p>
        <div className="card-head-buttons">
          <button className="app-btn" onClick={() => setOpen(!open)}>
            {open ? "Close" : "Open"}
          </button>
          <button className="app-btn" onClick={() => onDelete(workout.id)}>
            Delete
          </button>
        </div>
        {open && (
          <ul className="exercise-data">
            {exerciseData.map((ex) => (
              <div className="workout-exercise-list">
                <li className="exercise-summary" key={ex.id}>
                  <div>{ex.name} </div> {ex.sets} X {ex.reps} - Rest: {ex.rest}
                  <div className="exercise-property">
                    <label>Kg</label>
                    <input
                      type="number"
                      name="kg"
                      value={ex.kg}
                      onChange={(e) => handleExerciseData(e, ex.id)}
                    />
                  </div>
                  <div className="exercise-property">
                    <label>Reps</label>
                    <input
                      type="number"
                      name="reps"
                      value={ex.reps}
                      onChange={(e) => handleExerciseData(e, ex.id)}
                    />
                  </div>
                  <Timer initialRest={ex.rest} />
                </li>
              </div>
            ))}
            <button className="app-btn" onClick={handleComplete}>
              Workout Complete
            </button>
          </ul>
        )}
      </div>

      {completed.length > 0 && (
        <div>
          <h4>Workout History:</h4>
          {completed.map((session, i) => (
            <div key={i}>
              <strong>
                {workout.title} {i + 1}
              </strong>
              <ul>
                {session.map((ex) => (
                  <li key={ex.id}>
                    {ex.name}: {ex.kg}kg × {ex.reps} reps ({ex.sets} sets) -
                    Rest {ex.rest}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
