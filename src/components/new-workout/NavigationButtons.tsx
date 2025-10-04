type Props = {
  onBack: () => void;
  onNext?: () => void;
  onSave?: () => void;
  showSave?: boolean;
};

export function NavigationButtons({
  onBack,
  onNext,
  onSave,
  showSave = true,
}: Props) {
  return (
    <div className="navigation-buttons">
      <button onClick={onBack} className="go-back-btn">
        Back
      </button>
      {onNext && (
        <button onClick={onNext} className="next-btn">
          Preview
        </button>
      )}
      {showSave && onSave && (
        <button onClick={onSave} className="save-btn">
          Save Workout
        </button>
      )}
    </div>
  );
}
