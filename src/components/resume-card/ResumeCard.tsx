import type { Exercise, Workout } from "../../types";
import trash from "../../assets/SVG/buttons/trash.svg";
import returnBack from "../../assets/SVG/buttons/arrow-hook-down-left.svg";
import { useState } from "react";
import { PopUp } from "../pop-up/PopUp";

type Props = {
  workout: Workout;
  exerciseData: Exercise[];
  setShowExResume: () => void;
  setShowExCard: (show: boolean) => void;
  onCancel?: (() => void) | undefined;
  onConfirm: () => void;
  deleteWorkout: (id: number) => void;
};

export function ResumeCard({
  exerciseData,
  deleteWorkout,
  workout,
  setShowExCard,
  setShowExResume,
}: Props) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
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
          onClick={() => setShowDeleteAlert(true)}
        />
      </div>

      <ul>
        {exerciseData.map((ex) => (
          <li key={ex.id}>
            {ex.name} – Sets: {ex.sets}
          </li>
        ))}
      </ul>

      <button className="start-button" onClick={() => setShowExCard(true)}>
        START WORKOUT
      </button>

      {showDeleteAlert && (
        <PopUp
          message="Are you sure you want to delete this workout?"
          onConfirm={() => {
            setShowDeleteAlert(false);
            setShowExResume();
            deleteWorkout(workout.id);
          }}
          onCancel={() => {
            setShowDeleteAlert(false);
          }}
        />
      )}
    </div>
  );
}
