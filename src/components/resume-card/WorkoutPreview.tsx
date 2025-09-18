import type { Workout } from "../../types";

type Props = {
  workout: Workout;
  setShowExResume: React.Dispatch<React.SetStateAction<boolean>>;
};

export function WorkoutPreview({ workout, setShowExResume }: Props) {
  return (
    <div className="preview">
      <h3 onClick={() => setShowExResume(true)}>{workout.title}</h3>
    </div>
  );
}
