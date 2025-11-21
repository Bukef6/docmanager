import React from "react";
import Button from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message = "Naozaj chcete pokračovať?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-80">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} variant="primary">
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete file
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
