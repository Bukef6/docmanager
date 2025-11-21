interface DocumentNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const DocumentNameInput = ({
  value,
  onChange,
}: DocumentNameInputProps) => (
  <label className="block mb-3">
    <span className="text-gray-700">Document Name</span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
      placeholder="Enter document name"
    />
  </label>
);
