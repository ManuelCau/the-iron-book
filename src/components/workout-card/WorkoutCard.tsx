import { useState } from "react";
import type { Workout, Exercise } from "../../types";
import { ResumeCard } from "../resume-card/ResumeCard";
import { ExerciseCard } from "./ExerciseCard";
import edit from "../../assets/SVG/buttons/edit-pencil.svg";
type Props = {
  workout: Workout;
  onDelete: (id: number) => void;
  isOpen: boolean;
  setOpenWorkoutId: (id: number | null) => void;
  onEdit: (workout: Workout) => void;
};

export function WorkoutCard({
  workout,
  onDelete,
  onEdit,
  isOpen,
  setOpenWorkoutId,
}: Props) {
  const [showExCard, setShowExCard] = useState(false);
  const [exerciseData, setExerciseData] = useState<Exercise[]>(
    workout.exercises.map((ex) => ({ ...ex }))
  );

  if (!isOpen) {
    return (
      <div
        className="workout-preview"
        onClick={() => setOpenWorkoutId(workout.id)}
      >
        <div>
          <p>{workout.title}</p>
        </div>

        <div className="card-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(workout);
            }}
          >
            <img src={edit} alt="edit" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="workout-card">
      {!showExCard ? (
        <ResumeCard
          workout={workout}
          exerciseData={exerciseData}
          onConfirm={() => {
            setOpenWorkoutId(null);
          }}
          deleteWorkout={onDelete}
          setShowExCard={setShowExCard}
          setShowExResume={() => setOpenWorkoutId(null)}
        />
      ) : (
        <ExerciseCard
          exerciseData={exerciseData}
          setExerciseData={setExerciseData}
          onConfirm={() => {
            setShowExCard(false);
            setOpenWorkoutId(null);
          }}
          onCancel={undefined}
          workoutId={workout.id}
          onBack={() => setShowExCard(false)}
          onSubmitEnd={() => {
            setShowExCard(false);
            setOpenWorkoutId(null);
          }}
        />
      )}
    </div>
  );
}
