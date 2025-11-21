import React, { useState, useRef } from "react";
import { DialogContainer } from "./dialog/DialogContainer";
import { DocumentNameInput } from "./dialog/DocumentNameInput";
import { TagSelect } from "./dialog/TagSelect";
import { DialogActions } from "./dialog/DialogActions";
import { FileUploader } from "./dialog/FileUploader";
import { DialogOverlay } from "./dialog/DialogOverlay";

interface AddDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; tag: string; file: File }) => void;
  tags: string[];
}

const AddDocumentDialog: React.FC<AddDocumentDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  tags,
}) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState(tags[0] || "");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    setFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (!title || !tag || !file) return alert("Please fill all fields");
    onSubmit({ title, tag, file });
    setTitle("");
    setTag(tags[0] || "");
    setFile(null);
    onClose();
  };

  return (
    <DialogOverlay>
      <DialogContainer>
        <h2 className="text-xl font-bold mb-4">Add New Document</h2>

        {/* Document Name */}
        <DocumentNameInput value={title} onChange={setTitle} />
        <TagSelect value={tag} onChange={setTag} />

        {/* File upload */}
        <FileUploader
          file={file}
          onFileSelect={handleFileChange}
          onDropHandler={handleDrop}
          onDragOverHandler={handleDragOver}
          inputRef={fileInputRef}
        />

        {/* Buttons */}
        <DialogActions
          onCancel={onClose}
          onSubmit={handleSubmit}
          submitLabel="Add Document"
        />
      </DialogContainer>
    </DialogOverlay>
  );
};

export default AddDocumentDialog;
