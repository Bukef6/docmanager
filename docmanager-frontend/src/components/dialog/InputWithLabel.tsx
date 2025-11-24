import Input from "../ui/Input";

interface InputWithLabelProps {
  value: string;
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const InputWithLabel = ({
  value,
  label = "Document name",
  placeholder = "Enter document name",
  onChange,
}: InputWithLabelProps) => {
  return (
    <label className="block mb-3">
      <span className="text-gray-700">{label}</span>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
      />
    </label>
  );
};
