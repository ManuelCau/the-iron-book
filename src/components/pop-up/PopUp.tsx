type PopUpProps = {
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function PopUp({ message, onConfirm, onCancel }: PopUpProps) {
  return (
    <div className="pop-up-screen">
      <div className="pop-up">
        <p>{message}</p>
        <div className="pop-up-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Ok
          </button>
          {onCancel && (
            <button className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
