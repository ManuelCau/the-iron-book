import type { Workout, Exercise } from "../../types";

type Props = {
  workout: Workout;
  completed: Exercise[][];
};

export function CompletedWorkoutList({ workout, completed }: Props) {
  if (completed.length === 0) return null;

  return (
    <div className="workout-history">
      <h4>Workout History:</h4>
      {completed.map((session, i) => (
        <div key={i}>
          <p>
            {workout.title} {i + 1}
          </p>
          <ul>
            {session.map((ex) => (
              <li key={ex.id}>
                {ex.name}: {ex.kg}kg × {ex.reps} reps ({ex.sets} sets) - Rest{" "}
                {ex.rest}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
