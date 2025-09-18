export type Exercise = {
  id: number;
  name: string;
  sets?: number;
  reps?: number;
  kg?: number;
  time?: number;
  rest: number;
};

export type ExerciseHistory = Exercise & {
  date: string;
  workoutId: number;
};

export type WorkoutType = "weight" | "cardio" | "superset" | "circuit";

export type Workout = {
  id: number;
  title: string;
  exercises: Exercise[];
  type?: WorkoutType;
};
