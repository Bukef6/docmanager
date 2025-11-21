import { useEffect, useState } from "react";
import { TAGS } from "../../constants/tags";
import { STORAGE_KEY_TAG_FILTER } from "../../constants/storageKeys";

interface DocumentFiltersProps {
  onChangeTag: (tag: string) => void;
}

export const DocumentFilters = ({ onChangeTag }: DocumentFiltersProps) => {
  const [tag, setTag] = useState(
    sessionStorage.getItem(STORAGE_KEY_TAG_FILTER) || "All"
  );

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_TAG_FILTER, tag);
    onChangeTag(tag);
  }, [tag]);

  return (
    <div className="flex items-center gap-4  p-3 mt-3 rounded  mb-4">
      <label className="text-sm text-gray-600">Tag</label>
      <select
        className="border rounded px-3 py-1"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      >
        <option value="">All</option>
        {TAGS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};
