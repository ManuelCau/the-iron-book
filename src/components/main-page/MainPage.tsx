import { useState } from "react";
import type { Workout } from "../../types";
import { WorkoutCard } from "../workout-card/WorkoutCard";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import logo from "../../assets/SVG/iron book logo.svg";
import addButton from "../../assets/SVG/buttons/add-square.svg";
import { NewWorkout } from "../new-workout/NewWorkout";

export function MainPage() {
  const [workoutList, setWorkoutList] = useLocalStorage<Workout[]>(
    "workouts",
    []
  );
  const [showNewWorkoutForm, setShowNewWorkoutForm] = useState(false);
  const [showWorkouts, setShowWorkouts] = useState(true);
  const [openWorkoutId, setOpenWorkoutId] = useState<number | null>(null);

  function handleAddButton() {
    setShowNewWorkoutForm(true);
    setShowWorkouts(false);
  }

  function addWorkout(newWorkout: Workout) {
    setWorkoutList([...workoutList, newWorkout]);
  }

  function deleteWorkout(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (confirmDelete) {
      setWorkoutList(workoutList.filter((w) => w.id !== id));
      if (openWorkoutId === id) setOpenWorkoutId(null);
    }
  }

  return (
    <div className="mainPage">
      <div>
        <img className="logo" src={logo} alt="logo" />
      </div>

      {workoutList.length >= 1 && showNewWorkoutForm ? (
        <p>My Workouts</p>
      ) : (
        <p>
          Empty for now… <br></br>full of progress tomorrow. Start today with
          your first workout!
        </p>
      )}

      {showWorkouts &&
        workoutList.map((w) => (
          <WorkoutCard
            key={w.id}
            workout={w}
            onDelete={deleteWorkout}
            isOpen={openWorkoutId === w.id}
            setOpenWorkoutId={setOpenWorkoutId}
          />
        ))}

      {showNewWorkoutForm ? (
        <NewWorkout
          onAddedWorkout={addWorkout}
          setShowForm={setShowNewWorkoutForm}
          setShowWorkouts={setShowWorkouts}
        />
      ) : (
        <div className="new-workout-btn">
          <label>Add new</label>
          <img src={addButton} onClick={handleAddButton} alt="add new" />
        </div>
      )}
    </div>
  );
}
