import { useState } from "react";
import type { Workout, Exercise } from "../../types";
import { ResumeCard } from "../resume-card/ResumeCard";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  workout: Workout;
  onDelete: (id: number) => void;
  isOpen: boolean;
  setOpenWorkoutId: (id: number | null) => void;
};

export function WorkoutCard({
  workout,
  onDelete,
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
        <p>{workout.title}</p>
      </div>
    );
  }

  return (
    <div className="workout-card">
      {!showExCard ? (
        <ResumeCard
          workout={workout}
          exerciseData={exerciseData}
          onDelete={onDelete}
          setShowExCard={setShowExCard}
          setShowExResume={() => setOpenWorkoutId(null)}
        />
      ) : (
        <ExerciseCard
          exerciseData={exerciseData}
          setExerciseData={setExerciseData}
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
