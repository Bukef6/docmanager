import { TAGS } from "../../constants/tags";

interface TagSelectProps {
  all?: boolean;
  value: string;
  onChange: (value: string) => void;
}

export const TagSelect = ({ all = false, value, onChange }: TagSelectProps) => {
  const tagsToShow = all ? ["All", ...TAGS] : TAGS;
  return (
    <label className="block mb-3">
      <span className="text-gray-700">Tag</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
      >
        {tagsToShow.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
};
