import { useState } from "react";
import { NewWorkout } from "./NewWorkout";
import type { Workout } from "../types";
import { WorkoutCard } from "./WorkoutCard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import logo from "../assets/SVG/vector.svg";
export function MainPage() {
  const [workoutList, setWorkoutList] = useLocalStorage<Workout[]>(
    "workouts",
    []
  );
  const [showForm, setShowForm] = useState(false);

  function addWorkout(NewWorkout: Workout) {
    setWorkoutList([...workoutList, NewWorkout]);
    setShowForm(false);
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
      {showForm && <NewWorkout onAddedWorkout={addWorkout} />}
      {workoutList.map((w) => (
        <WorkoutCard
          key={w.id}
          workout={w}
          onDelete={deleteWorkout}
          onUpdate={updateWorkout}
        />
      ))}
      <button className="new-workout-btn" onClick={() => setShowForm(true)}>
        <p>+</p>
      </button>
    </div>
  );
}
