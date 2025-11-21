import { useEffect, useState } from "react";
import { DialogContainer } from "../components/dialog/DialogContainer";
import { DocumentNameInput } from "../components/dialog/DocumentNameInput";
import { TagSelect } from "../components/dialog/TagSelect";
import { DialogActions } from "../components/dialog/DialogActions";
import { DialogOverlay } from "./dialog/DialogOverlay";

interface EditDocumentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; tag: string }) => void;
  document: { id: number; title: string; tag: string } | null;
}

export const EditDocumentDialog = ({
  open,
  onClose,
  onSubmit,
  document,
}: EditDocumentDialogProps) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");

  // Load selected document when dialog opens
  useEffect(() => {
    if (open && document) {
      setTitle(document.title);
      setTag(document.tag);
    }
  }, [open]);

  if (!open || !document) return null;

  const handleSave = () => {
    onSubmit({ title, tag });
    onClose();
  };

  return (
    <DialogOverlay>
      <DialogContainer>
        <h2 className="text-xl font-bold mb-4">Edit Document</h2>
        <DocumentNameInput value={title} onChange={setTitle} />
        <TagSelect value={tag} onChange={setTag} />
        <DialogActions
          onCancel={onClose}
          onSubmit={handleSave}
          submitLabel="Save Changes"
        />
      </DialogContainer>
    </DialogOverlay>
  );
};
