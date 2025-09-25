import type { Exercise, Workout } from "../../types";
import trash from "../../assets/SVG/buttons/trash.svg";
import returnBack from "../../assets/SVG/buttons/arrow-hook-down-left.svg";

type Props = {
  workout: Workout;
  exerciseData: Exercise[];
  onDelete: (id: number) => void;
  setShowExResume: () => void;
  setShowExCard: (show: boolean) => void;
};

export function ResumeCard({
  exerciseData,
  onDelete,
  workout,
  setShowExCard,
  setShowExResume,
}: Props) {
  return (
    <div className="resume-card">
      <div className="resume-header">
        <img
          src={returnBack}
          alt="return"
          className="return-arrow"
          onClick={setShowExResume}
        />

        <p className="workout-title">{workout.title}</p>

        <img
          src={trash}
          alt="trash"
          className="delete-button"
          onClick={() => onDelete(workout.id)}
        />
      </div>

      <ul>
        {exerciseData.map((ex) => (
          <li key={ex.id}>
            {ex.name} –{" "}
            {ex.time
              ? `${ex.sets} x ${String(Math.floor(ex.time / 60)).padStart(
                  2,
                  "0"
                )} : ${String(ex.time % 60).padStart(2, "0")} min`
              : `${ex.sets} × ${ex.reps}`}
          </li>
        ))}
      </ul>

      <button className="start-button" onClick={() => setShowExCard(true)}>
        START WORKOUT
      </button>
    </div>
  );
}
