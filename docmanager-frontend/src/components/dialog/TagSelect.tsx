import { TAGS } from "../../constants/tags";

interface TagSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const TagSelect = ({ value, onChange }: TagSelectProps) => (
  <label className="block mb-3">
    <span className="text-gray-700">Tag</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
    >
      {TAGS.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  </label>
);
