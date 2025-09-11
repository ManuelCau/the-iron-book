import { useState } from "react";
import { NewWorkout } from "../new-workout/NewWorkout";
import type { Workout } from "../../types";
import { WorkoutCard } from "../workout-card/WorkoutCard";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import logo from "../../assets/SVG/iron book logo.svg";

export function MainPage() {
  const [workoutList, setWorkoutList] = useLocalStorage<Workout[]>(
    "workouts",
    []
  );
  const [showForm, setShowForm] = useState(false);

  function handleAddButton() {
    setShowForm(true);
  }

  function addWorkout(newWorkout: Workout) {
    setWorkoutList([...workoutList, newWorkout]);
  }

  function deleteWorkout(id: number) {
    setWorkoutList(workoutList.filter((w) => w.id !== id));
  }

  function updateWorkout(updated: Workout) {
    setWorkoutList((prev) =>
      prev.map((w) => (w.id === updated.id ? updated : w))
    );
  }

  return (
    <div className="mainPage">
      <div>
        <img className="logo" src={logo} alt="" />
      </div>
      <p>My Workouts</p>
      {workoutList.map((w) => (
        <WorkoutCard
          key={w.id}
          workout={w}
          onDelete={deleteWorkout}
          onUpdate={updateWorkout}
        />
      ))}
      {showForm ? (
        <NewWorkout onAddedWorkout={addWorkout} setShowForm={setShowForm} />
      ) : (
        <div className="new-workout-btn">
          <label>Add new</label>
          <button onClick={handleAddButton}>
            <p>+</p>
          </button>
        </div>
      )}
    </div>
  );
}
