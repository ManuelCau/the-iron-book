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
              {h.kg
                ? `${h.kg ?? 0}kg × ${h.reps ?? 0} reps (${h.sets} sets) — ${
                    h.date
                  }`
                : `Time: ${h.time} min × ${h.sets} — ${h.date}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
