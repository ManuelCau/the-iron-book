import { useEffect, useState, type ChangeEvent } from "react";
import type { Exercise, ExerciseHistory } from "../../types";
import { Timer } from "../timer/Timer";
import { History } from "../history-card/History";
import historyIcon from "../../assets/SVG/buttons/book-open.svg";
import right from "../../assets/SVG/buttons/chevron-right.svg";
import left from "../../assets/SVG/buttons/chevron-left.svg";
import returnBack from "../../assets/SVG/buttons/arrow-hook-down-left.svg";
import check from "../../assets/SVG/buttons/checked.svg";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type Props = {
  exerciseData: Exercise[];
  setExerciseData: React.Dispatch<React.SetStateAction<Exercise[]>>;
  workoutId: number;
  onBack: () => void;
  onSubmitEnd: () => void;
};

export function ExerciseCard({
  exerciseData,
  setExerciseData,
  workoutId,
  onBack,
  onSubmitEnd,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState<"exercise" | "history">("exercise");
  const [history, setHistory] = useLocalStorage<ExerciseHistory[]>(
    "exercise-history",
    []
  );
  const [isChanged, setIsChanged] = useState(false);

  if (!exerciseData || exerciseData.length === 0) return null;
  const currentExercise = exerciseData[currentIndex];

  useEffect(() => {
    if (!currentExercise.reps && currentExercise.time) {
      const today = new Date().toLocaleDateString();
      const alreadyExists = history.some(
        (h) =>
          h.name === currentExercise.name &&
          h.workoutId === workoutId &&
          h.date === today
      );
      if (!alreadyExists) {
        setHistory([
          ...history,
          {
            ...currentExercise,
            workoutId,
            date: today,
          },
        ]);
      }
    }
  }, [currentExercise, history, setHistory, workoutId]);

  const handleExerciseData = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target;

    setExerciseData((prev) => {
      const updated = prev.map((ex) =>
        ex.id === id
          ? {
              ...ex,
              [name]: ["sets", "time", "reps", "kg", "rest"].includes(name)
                ? Number(value)
                : value,
            }
          : ex
      );

      const updatedHistory: ExerciseHistory[] = [
        ...history,
        {
          ...updated.find((ex) => ex.id === id)!,
          workoutId,
          date: new Date().toLocaleDateString(),
        },
      ];
      setHistory(updatedHistory);

      return updated;
    });
  };

  function handleSubmitWorkout() {
    const today = new Date().toLocaleDateString();
    const newRecords = exerciseData.map((ex) => ({
      ...ex,
      workoutId,
      date: today,
    }));
    setHistory([...history, ...newRecords]);
    alert("Workout completed!");
    onSubmitEnd();
  }

  return (
    <div className="exercise-card">
      <img
        src={returnBack}
        alt="return"
        className="return-arrow"
        onClick={() => {
          if (view === "history") {
            setView("exercise");
          } else {
            onBack();
          }
        }}
      />

      {view === "exercise" ? (
        <>
          <div className="ex-info">
            {" "}
            <p>
              {currentExercise.name}{" "}
              {currentExercise.time
                ? `${currentExercise.sets} x ${String(
                    Math.floor(currentExercise.time / 60)
                  ).padStart(2, "0")} : ${String(
                    currentExercise.time % 60
                  ).padStart(2, "0")} min`
                : `${currentExercise.sets} x ${currentExercise.reps}`}
            </p>
          </div>

          {currentExercise.reps !== undefined && (
            <div className="exercise-form">
              <div className="exercise-property">
                <label>Kg</label>
                <input
                  type="number"
                  name="kg"
                  value={currentExercise.kg === 0 ? "" : currentExercise.kg}
                  placeholder="0"
                  onChange={(e) => handleExerciseData(e, currentExercise.id)}
                />
              </div>
              <div className="exercise-property">
                <label>Reps</label>
                <input
                  type="number"
                  name="reps"
                  placeholder="0"
                  value={currentExercise.reps === 0 ? "" : currentExercise.reps}
                  onChange={(e) => handleExerciseData(e, currentExercise.id)}
                />
              </div>
            </div>
          )}

          <Timer
            time={currentExercise.time}
            rest={currentExercise.rest}
            sets={currentExercise.sets}
            numberOfExercises={exerciseData.length - 1}
            setCurrentIndex={setCurrentIndex}
            currentIndex={currentIndex}
            handleSubmitWorkout={handleSubmitWorkout}
            isChanged={isChanged}
          />
        </>
      ) : (
        <History
          exerciseName={currentExercise.name}
          history={history.filter(
            (h) => h.name === currentExercise.name && h.workoutId === workoutId
          )}
        />
      )}

      <div className="exercise-nav">
        <button
          className={currentIndex === 0 ? "disabled" : ""}
          disabled={currentIndex === 0}
          onClick={() => {
            setCurrentIndex((i) => i - 1);
            setIsChanged(!isChanged);
          }}
        >
          <img src={left} alt="prev" />
        </button>

        {view === "exercise" && (
          <img
            src={historyIcon}
            alt="History"
            style={{ cursor: "pointer" }}
            onClick={() => setView("history")}
          />
        )}

        {(view === "history" ||
          (view === "exercise" && currentIndex < exerciseData.length - 1)) && (
          <button
            className={
              currentIndex === exerciseData.length - 1 ? "disabled" : ""
            }
            disabled={
              view === "history" && currentIndex === exerciseData.length - 1
            }
            onClick={() => {
              setCurrentIndex((i) => i + 1);
              setIsChanged(!isChanged);
            }}
          >
            <img src={right} alt="next" />
          </button>
        )}

        {view === "exercise" && currentIndex === exerciseData.length - 1 && (
          <button
            onClick={handleSubmitWorkout}
            className="completed-workout-button"
          >
            <img src={check} alt="checked" />
          </button>
        )}
      </div>
    </div>
  );
}
