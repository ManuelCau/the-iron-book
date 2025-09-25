import weight from "../../../assets/SVG/buttons/weight.svg";
import cardio from "../../../assets/SVG/buttons/treadmill.svg";
import time from "../../../assets/SVG/buttons/timer.svg";

import type { Workout } from "../../../types";

type Props = {
  workout: Workout;
  setWorkout: React.Dispatch<React.SetStateAction<Workout>>;
  setStep: React.Dispatch<
    React.SetStateAction<
      "name" | "type" | "weight" | "cardio" | "circuit" | "summary"
    >
  >;
};

export function SelectWorkoutType({ workout, setWorkout, setStep }: Props) {
  return (
    <div className="select-workout-type">
      <p>Choose the type of exercise</p>
      <div className="type-buttons">
        <button
          onClick={() => {
            setWorkout({ ...workout, type: "weight" });
            setStep("weight");
          }}
        >
          <img src={weight} alt="weight" /> Weight
        </button>
        <button
          onClick={() => {
            setWorkout({ ...workout, type: "cardio" });
            setStep("cardio");
          }}
        >
          <img src={cardio} alt="cardio" /> Cardio
        </button>
        <button
          onClick={() => {
            setWorkout({ ...workout, type: "circuit" });
            setStep("circuit");
          }}
        >
          <img src={time} alt="time" /> Circuit
        </button>
      </div>
    </div>
  );
}
