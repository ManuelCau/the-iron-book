export type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  kg?: number;
  rest: number;
};

export type Workout = {
  id: number;
  title: string;
  exercises: Exercise[];
};
