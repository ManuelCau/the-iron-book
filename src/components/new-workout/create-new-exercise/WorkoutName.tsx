import type { Workout } from "../../../types";
import next from "../../../assets/SVG/buttons/chevron-right.svg";
import { PopUp } from "../../pop-up/PopUp";

type Props = {
  workout: Workout;
  handleWorkoutChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  handleBack: () => void;
  showConfirm: boolean;
  onConfirm: () => void;
  onCancel: (() => void) | undefined;
};

export function WorkoutName({
  workout,
  handleWorkoutChange,
  nextStep,
  handleBack,
  showConfirm,
  onConfirm,
  onCancel,
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
          {showConfirm && (
            <PopUp
              message="Are you sure you want to cancel this workout?"
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          )}
        </div>
      </div>
    </>
  );
}
