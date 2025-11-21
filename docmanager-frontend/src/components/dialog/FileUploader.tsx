interface FileUploaderProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onDropHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const FileUploader = ({
  file,
  onFileSelect,
  onDropHandler,
  onDragOverHandler,
  inputRef,
}: FileUploaderProps) => (
  <label className="block mb-4">
    <span className="text-gray-700">Upload File</span>
    <div
      className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded h-32 cursor-pointer hover:border-blue-400"
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}
      onClick={() => inputRef.current?.click()}
    >
      {file ? (
        <span>{file.name}</span>
      ) : (
        <span className="text-gray-400">
          Drag & drop a file here, or click to select
        </span>
      )}
    </div>
    <input
      type="file"
      ref={inputRef}
      className="hidden"
      onChange={(e) => {
        if (e.target.files && e.target.files[0]) {
          onFileSelect(e.target.files[0]);
        }
      }}
    />
  </label>
);
