import InputWithClearAndIcon from "./InputWithClearAndIcon";

interface InputWithLabelProps {
  value: string;
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  labelPosition?: "top" | "side";
}

export const InputWithLabelPosition = ({
  value,
  label = "Document name",
  placeholder = "Enter document name",
  onChange,
  labelPosition = "top",
}: InputWithLabelProps) => {
  return (
    <label
      className={`block mb-3 ${
        labelPosition === "side" ? "flex items-center gap-4" : ""
      }`}
    >
      <span
        className={`text-gray-700 ${
          labelPosition === "side"
            ? "whitespace-nowrap min-w-fit"
            : "block mb-1"
        }`}
      >
        {label}
      </span>
      <InputWithClearAndIcon
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClear={() => onChange("")}
        placeholder={placeholder}
        className={labelPosition === "side" ? "flex-1" : ""}
      />
    </label>
  );
};
