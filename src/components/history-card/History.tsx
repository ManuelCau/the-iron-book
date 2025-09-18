import type { ExerciseHistory } from "../../types";

type Props = {
  exerciseName: string;
  history: ExerciseHistory[];
};

export function History({ exerciseName, history }: Props) {
  // Filtra solo gli elementi del singolo esercizio
  const filteredHistory = history.filter((h) => h.name === exerciseName);

  // Riduce per prendere solo l'ultimo record per data
  const latestHistoryPerDate = Object.values(
    filteredHistory.reduce((acc, h) => {
      acc[h.date] = h; // sovrascrive ogni volta, quindi rimane solo l'ultimo della data
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
              {h.time
                ? `Time: ${h.time} min × ${h.sets} — ${h.date}`
                : `${h.kg ?? 0}kg × ${h.reps ?? 0} reps (${h.sets} sets) — ${
                    h.date
                  }`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
