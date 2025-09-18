import type { Workout } from "../../../types";
import next from "../../../assets/SVG/buttons/chevron-right.svg";

type Props = {
  workout: Workout;
  handleWorkoutChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  handleBack: () => void;
};

export function WorkoutName({
  workout,
  handleWorkoutChange,
  nextStep,
  handleBack,
}: Props) {
  return (
    <>
      <div className="workout-name">
        <div className="form-inputs">
          <label> Workout name </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={workout.title}
            onChange={handleWorkoutChange}
          />
        </div>
        <div className="buttons-box">
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
          <button className="next-button" onClick={nextStep}>
            Next <img src={next} alt="next" />
          </button>
        </div>
      </div>
    </>
  );
}
