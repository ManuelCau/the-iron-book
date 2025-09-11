export type Exercise = {
  id: number;
  name: string;
  sets: number;
  time?: number;
  reps?: number;
  kg?: number;
  rest: number;
};

export type Workout = {
  id: number;
  title: string;
  exercises: Exercise[];
};
