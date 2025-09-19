import { useState, type JSX } from "react";
import type { Workout } from "../../types";
import { NewWeightExercise } from "./create-new-exercise/NewWeightExercise";
import { NewCardioExercise } from "./create-new-exercise/NewCardioExercise";
import { SelectWorkoutType } from "./create-new-exercise/SelectWorkoutType";
import { WorkoutName } from "./create-new-exercise/WorkoutName";

type Props = {
  onAddedWorkout: (workout: Workout) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWorkouts: React.Dispatch<React.SetStateAction<boolean>>;
};

type Step = "name" | "type" | "weight" | "cardio" | "summary";

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
    summary: "type",
  };

  function handleBack() {
    if (prevStep[step]) setStep(prevStep[step]!);
    else {
      if (window.confirm("Are you sure you want to cancel this workout?")) {
        setShowForm(false);
      }
    }
  }
  function handleRemoveExercise(id: number) {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((ex) => ex.id !== id),
    }));
  }

  function handleSubmit() {
    onAddedWorkout(workout);
    setWorkout({ id: Date.now(), title: "", exercises: [] });
    setStep("name");
    setShowForm(false);
    setShowWorkouts(true);
  }

  const steps: Record<Step, JSX.Element> = {
    name: (
      <WorkoutName
        workout={workout}
        handleWorkoutChange={(e) =>
          setWorkout({ ...workout, [e.target.name]: e.target.value })
        }
        nextStep={() => setStep("type")}
        handleBack={handleBack}
      />
    ),
    type: (
      <div>
        <SelectWorkoutType
          workout={workout}
          setWorkout={setWorkout}
          setStep={setStep}
        />
        {workout.exercises.length > 0 && (
          <div className="workout-list">
            <div className="navigation-buttons">
              <button onClick={handleBack} className="go-back-btn">
                Back
              </button>
              {workout.exercises.length > 0 && (
                <button onClick={() => setStep("summary")} className="next-btn">
                  Next
                </button>
              )}
            </div>
            <ul>
              {workout.exercises.map((ex) => (
                <li key={ex.id}>
                  {ex.name} –{" "}
                  {ex.time
                    ? `${ex.sets} x ${ex.time} min`
                    : `${ex.sets} x ${ex.reps} reps`}
                  <button
                    onClick={() => handleRemoveExercise(ex.id)}
                    className="remove-btn"
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ),
    weight: (
      <NewWeightExercise
        workout={workout}
        setWorkout={setWorkout}
        prevStep={() => setStep("type")}
      />
    ),
    cardio: (
      <NewCardioExercise
        workout={workout}
        setWorkout={setWorkout}
        prevStep={() => setStep("type")}
      />
    ),
    summary: (
      <div className="workout-list">
        <p>{workout.title}</p>
        <p>Summary:</p>
        <ul>
          {workout.exercises.map((ex) => (
            <li key={ex.id}>
              {ex.name} –{" "}
              {ex.time
                ? `${ex.sets} x ${ex.time} min`
                : `${ex.sets} x ${ex.reps} reps`}
            </li>
          ))}
        </ul>
        <div className="navigation-buttons">
          <button className="go-back-btn" onClick={handleBack}>
            Back
          </button>
          <button className="save-btn" onClick={handleSubmit}>
            Save Workout
          </button>
        </div>
      </div>
    ),
  };

  return (
    <div className="new-workout-card">
      <p>NEW WORKOUT</p>
      {steps[step]}
    </div>
  );
}
