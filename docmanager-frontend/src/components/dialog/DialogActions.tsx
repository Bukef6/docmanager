import Button from "../ui/Button";

interface DialogActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel?: string;
}

export const DialogActions = ({
  onCancel,
  onSubmit,
  submitLabel = "Submit",
}: DialogActionsProps) => (
  <div className="flex justify-end space-x-2">
    <Button
      variant="secondary"
      onClick={onCancel}
    >
      Cancel
    </Button>
    <Button
      onClick={onSubmit}
    >
      {submitLabel}
    </Button>
  </div>
);
