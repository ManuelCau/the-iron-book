import { useState, type JSX, useEffect } from "react";
import type { Workout } from "../../types";
import { NewWeightExercise } from "./create-new-exercise/NewWeightExercise";
import { NewCardioExercise } from "./create-new-exercise/NewCardioExercise";
import { SelectWorkoutType } from "./create-new-exercise/SelectWorkoutType";
import { WorkoutName } from "./create-new-exercise/WorkoutName";
import { NewCircuitExercise } from "./create-new-exercise/NewCircuitExercise";
import { ExerciseList } from "./ExerciseList";
import { NavigationButtons } from "./NavigationButtons";
import { PopUp } from "../pop-up/PopUp";

type Props = {
  onAddedWorkout: (workout: Workout) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowWorkouts: React.Dispatch<React.SetStateAction<boolean>>;
  editingWorkout?: Workout | null; // 👈 workout da modificare (se presente)
};

type Step = "name" | "type" | "weight" | "cardio" | "circuit" | "summary";

export function NewWorkout({
  onAddedWorkout,
  setShowForm,
  setShowWorkouts,
  editingWorkout,
}: Props) {
  // 🔹 Se editingWorkout è passato, usa quello come stato iniziale
  const [workout, setWorkout] = useState<Workout>(
    editingWorkout ?? { id: Date.now(), title: "", exercises: [] }
  );

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSavePopUp, setShowSavePopUp] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // 🔹 Se l’utente seleziona un workout da modificare dopo il mount,
  // aggiorna lo stato con i dati esistenti
  useEffect(() => {
    if (editingWorkout) setWorkout(editingWorkout);
  }, [editingWorkout]);

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
    else setShowConfirm(true);
  }

  // 🔹 Salvataggio: se in modalità modifica, sovrascrive lo stesso id
  function handleSubmit() {
    onAddedWorkout(workout); // la logica di update o creazione è gestita a monte

    if (!editingWorkout) {
      // Se era un nuovo workout, resetta tutto
      setWorkout({ id: Date.now(), title: "", exercises: [] });
      setStep("name");
    }

    setShowForm(false);
    setShowWorkouts(true);
  }

  const handleSuccess = () => {
    setPopupMessage("Exercise added successfully!");
    setShowFormPopup(true);
  };

  const handleError = () => {
    setPopupMessage("Please fill all fields correctly!");
    setShowFormPopup(true);
  };

  const screens: Record<Step, () => JSX.Element> = {
    name: () => (
      <WorkoutName
        workout={workout}
        handleWorkoutChange={(e) =>
          setWorkout({ ...workout, [e.target.name]: e.target.value })
        }
        nextStep={() => setStep("type")}
        handleBack={handleBack}
        showConfirm={showConfirm}
        onConfirm={() => {
          setShowForm(false);
          setShowWorkouts(true);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
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
          showSave={false}
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
          onSuccess={handleSuccess}
          onError={handleError}
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
          onSuccess={handleSuccess}
          onError={handleError}
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
          onSuccess={handleSuccess}
          onError={handleError}
        />
        {workout.exercises.length > 0 && (
          <ExerciseList exercises={workout.exercises} setWorkout={setWorkout} />
        )}
      </div>
    ),
    summary: () => (
      <div className="workout-list">
        <p>{workout.title}</p>
        <p>{editingWorkout ? "Edit Workout" : "Summary:"}</p>
        <ExerciseList exercises={workout.exercises} setWorkout={setWorkout} />
        <NavigationButtons
          onBack={handleBack}
          onSave={() => setShowSavePopUp(true)}
        />
        {showSavePopUp && (
          <PopUp
            message={
              editingWorkout
                ? "Save changes to this workout?"
                : "Do you want to save this workout?"
            }
            onConfirm={() => {
              handleSubmit();
              setShowSavePopUp(false);
            }}
            onCancel={() => setShowSavePopUp(false)}
          />
        )}
      </div>
    ),
  };

  const currentStep = screens[step];

  return (
    <div className="new-workout-card">
      <p>{editingWorkout ? "EDIT WORKOUT" : "NEW WORKOUT"}</p>
      {currentStep()}
      {showFormPopup && (
        <PopUp
          message={popupMessage}
          onConfirm={() => setShowFormPopup(false)}
        />
      )}
    </div>
  );
}
