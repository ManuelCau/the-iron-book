import type { ExerciseHistory } from "../../types";

type Props = {
  exerciseName: string;
  history: ExerciseHistory[];
};

export function History({ exerciseName, history }: Props) {
  const filteredHistory = history.filter((h) => h.name === exerciseName);

  const latestHistoryPerDate = Object.values(
    filteredHistory.reduce((acc, h) => {
      acc[h.date] = h;
      return acc;
    }, {} as Record<string, ExerciseHistory>)
  );

  return (
    <div className="exercise-history">
      <div className="history-header">
        <h6>{exerciseName} - History</h6>
      </div>

      {latestHistoryPerDate.length === 0 ? (
        <p>No history yet</p>
      ) : (
        <ul>
          {latestHistoryPerDate.map((h, i) => (
            <li key={i}>
              {h.reps
                ? `${h.date} - Sets: ${h.sets} x ${h.reps} reps - ${h.kg} kg `
                : `${h.date} - Sets: ${h.sets} - ${String(
                    Math.floor(h.time! / 60)
                  ).padStart(2, "0")} : ${String(h.time! % 60).padStart(
                    2,
                    "0"
                  )} min`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
