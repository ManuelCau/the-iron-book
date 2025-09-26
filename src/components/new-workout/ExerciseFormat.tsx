import type { Exercise } from "../../types";

export function ExerciseFormat(ex: Exercise) {
  return ex.time
    ? `${ex.sets} x ${String(Math.floor(ex.time / 60)).padStart(
        2,
        "0"
      )}:${String(ex.time % 60).padStart(2, "0")} min`
    : `${ex.sets} x ${ex.reps} reps`;
}
