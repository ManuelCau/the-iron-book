import { useState, type JSX } from "react";
import type { Workout } from "../../types";
import { NewWeightExercise } from "./create-new-exercise/NewWeightExercise";
import { NewCardioExercise } from "./create-new-exercise/NewCardioExercise";
import { SelectWorkoutType } from "./create-new-exercise/SelectWorkoutType";
import { WorkoutName } from "./create-new-exercise/WorkoutName";
import { NewCircuitExercise } from "./create-new-exercise/NewCircuitExercise";
import { ExerciseList } from "./ExerciseList";
import { NavigationButtons } from "./NavigationButtons";

type Props = {
  onAddedWorkout: (workout: Workout) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWorkouts: React.Dispatch<React.SetStateAction<boolean>>;
};

type Step = "name" | "type" | "weight" | "cardio" | "circuit" | "summary";

export function NewWorkout({
  onAddedWorkout,
  setShowForm,
  setShowWorkouts,
}: Props) {
  const [workout, setWorkout] = useState<Workout>({
    id: Date.now(),
    title: "",
    exercises: [],
  });
  const [step, setStep] = useState<Step>("name");

  const prevStep: Record<Step, Step | null> = {
    name: null,
    type: "name",
    weight: "type",
    cardio: "type",
    circuit: "type",
    summary: "type",
  };

  function handleBack() {
    if (prevStep[step]) setStep(prevStep[step]!);
    else {
      if (window.confirm("Are you sure you want to cancel this workout?")) {
        setShowForm(false);
        setShowWorkouts(true);
      }
    }
  }

  function handleSubmit() {
    onAddedWorkout(workout);
    setWorkout({ id: Date.now(), title: "", exercises: [] });
    setStep("name");
    setShowForm(false);
    setShowWorkouts(true);
  }

  const screens: Record<Step, () => JSX.Element> = {
    name: () => (
      <WorkoutName
        workout={workout}
        handleWorkoutChange={(e) =>
          setWorkout({ ...workout, [e.target.name]: e.target.value })
        }
        nextStep={() => setStep("type")}
        handleBack={handleBack}
      />
    ),
    type: () => (
      <div>
        <SelectWorkoutType
          workout={workout}
          setWorkout={setWorkout}
          setStep={setStep}
        />
        <NavigationButtons
          onBack={handleBack}
          onNext={
            workout.exercises.length > 0 ? () => setStep("summary") : undefined
          }
        />

        {workout.exercises.length > 0 && (
          <ExerciseList exercises={workout.exercises} setWorkout={setWorkout} />
        )}
      </div>
    ),
    weight: () => (
      <div>
        <NewWeightExercise
          workout={workout}
          setWorkout={setWorkout}
          prevStep={() => setStep("type")}
        />
        {workout.exercises.length > 0 && (
          <ExerciseList exercises={workout.exercises} setWorkout={setWorkout} />
        )}
      </div>
    ),
    cardio: () => (
      <div>
        <NewCardioExercise
          workout={workout}
          setWorkout={setWorkout}
          prevStep={() => setStep("type")}
        />
        {workout.exercises.length > 0 && (
          <ExerciseList exercises={workout.exercises} setWorkout={setWorkout} />
        )}
      </div>
    ),
    circuit: () => (
      <div>
        <NewCircuitExercise
          workout={workout}
          setWorkout={setWorkout}
          prevStep={() => setStep("type")}
        />
        {workout.exercises.length > 0 && (
          <ExerciseList exercises={workout.exercises} setWorkout={setWorkout} />
        )}
      </div>
    ),
    summary: () => (
      <div className="workout-list">
        <p>{workout.title}</p>
        <p>Summary:</p>
        <ExerciseList exercises={workout.exercises} setWorkout={setWorkout} />
        <NavigationButtons onBack={handleBack} onSave={handleSubmit} />
      </div>
    ),
  };

  const currentStep = screens[step];

  return (
    <div className="new-workout-card">
      <p>NEW WORKOUT</p>
      {currentStep()}
    </div>
  );
}
