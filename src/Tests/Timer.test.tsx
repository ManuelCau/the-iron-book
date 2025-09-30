import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Timer } from "../components/timer/Timer";
import { act } from "react";

const TimerProps = {
  time: 10,
  rest: 5,
  sets: 1,
  numberOfExercises: 1,
  setCurrentIndex: vi.fn(),
  currentIndex: 1,
  handleSubmitWorkout: vi.fn(),
  isChanged: false,
};

describe("Timer", () => {
  it("timer button should start/stop the timer", () => {
    vi.useFakeTimers();

    render(<Timer {...TimerProps} />);
    const timerButton = screen.getByRole("button", { name: /:/ });

    expect(timerButton).toHaveTextContent("0:10");

    fireEvent.click(timerButton);
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(timerButton).toHaveTextContent("0:08");

    fireEvent.click(timerButton);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(timerButton).toHaveTextContent("0:08");
  });

  it("reset button should reset the timer on click", () => {
    render(<Timer {...TimerProps} />);
    const resetButton = screen.getByText("Reset");

    fireEvent.click(resetButton);

    const timerButton = screen.getByText("0:10");
    expect(timerButton).toBeInTheDocument();
  });

  it("button should be red in exercise time", () => {
    render(<Timer {...TimerProps} />);
    const timerButton = screen.getByRole("button", { name: /:/ });
    expect(timerButton).toHaveStyle({ backgroundColor: "#ff4d4d" });
  });
});
