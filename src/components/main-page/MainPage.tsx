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
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  function handleAddButton() {
    setEditingWorkout(null);
    setShowNewWorkoutForm(true);
    setShowWorkouts(false);
  }

  function addOrUpdateWorkout(newWorkout: Workout) {
    setWorkoutList((prev) => {
      const exists = prev.some((w) => w.id === newWorkout.id);
      return exists
        ? prev.map((w) => (w.id === newWorkout.id ? newWorkout : w))
        : [...prev, newWorkout];
    });
  }

  function deleteWorkout(id: number) {
    setWorkoutList(workoutList.filter((w) => w.id !== id));
    if (openWorkoutId === id) setOpenWorkoutId(null);
  }

  function handleEditWorkout(workout: Workout) {
    setEditingWorkout(workout);
    setShowNewWorkoutForm(true);
    setShowWorkouts(false);
  }

  const isWorkoutOpen = openWorkoutId !== null;

  return (
    <div className="mainPage">
      <div>
        <img className="logo" src={logo} alt="logo" />
      </div>

      {workoutList.length >= 1 && !showNewWorkoutForm && !isWorkoutOpen ? (
        <p>My Workouts</p>
      ) : (
        workoutList.length === 0 &&
        !showNewWorkoutForm &&
        !isWorkoutOpen && (
          <p>
            Empty for now… <br />
            full of progress tomorrow. Start today with your first workout!
          </p>
        )
      )}

      {showWorkouts &&
        workoutList
          .filter((w) => !isWorkoutOpen || w.id === openWorkoutId)
          .map((w) => (
            <WorkoutCard
              key={w.id}
              workout={w}
              onEdit={handleEditWorkout}
              onDelete={deleteWorkout}
              isOpen={openWorkoutId === w.id}
              setOpenWorkoutId={setOpenWorkoutId}
            />
          ))}

      {showNewWorkoutForm ? (
        <NewWorkout
          onAddedWorkout={addOrUpdateWorkout}
          setShowForm={setShowNewWorkoutForm}
          setShowWorkouts={setShowWorkouts}
          editingWorkout={editingWorkout}
        />
      ) : (
        !isWorkoutOpen && (
          <div className="new-workout-btn">
            <label>Add new</label>
            <img src={addButton} onClick={handleAddButton} alt="add new" />
          </div>
        )
      )}
    </div>
  );
}
