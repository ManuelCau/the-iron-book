import { useState } from "react";
import type { Workout, Exercise } from "../../types";
import { CompletedWorkoutList } from "./CompletedWorkoutList";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  workout: Workout;
  onDelete: (id: number) => void;
  onUpdate: (updated: Workout) => void;
};

export function WorkoutCard({ workout, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState<Exercise[]>(
    workout.exercises.map((ex) => ({ ...ex }))
  );
  const [completed, setCompleted] = useLocalStorage<Exercise[][]>(
    `completed-${workout.id}`,
    []
  );

  function handleComplete() {
    setCompleted([...completed, exerciseData]);
    setExerciseData(workout.exercises.map((ex) => ({ ...ex })));
    setOpen(false);
  }

  function handleOpenCardButton() {
    setOpen(!open);
  }

  return (
    <div className="workout-card">
      <p className="workout-title">
        <strong>{workout.title}</strong>
      </p>

      <div className="card-head-buttons">
        <button className="app-btn" onClick={handleOpenCardButton}>
          {open ? "Close" : "Open"}
        </button>
        <button className="app-btn" onClick={() => onDelete(workout.id)}>
          Delete
        </button>
      </div>

      {open && (
        <>
          <ExerciseCard
            exerciseData={exerciseData}
            setExerciseData={setExerciseData}
          />
          <button className="app-btn" onClick={handleComplete}>
            Workout Complete
          </button>
        </>
      )}

      <button
        className="history-button"
        onClick={() => setHistoryOpen(!historyOpen)}
      >
        History
      </button>

      {historyOpen && (
        <CompletedWorkoutList workout={workout} completed={completed} />
      )}
    </div>
  );
}
