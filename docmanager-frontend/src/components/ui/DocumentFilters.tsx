import { useEffect, useState } from "react";
import { STORAGE_KEY_TAG_FILTER } from "../../constants/storageKeys";
import { STORAGE_KEY_SEARCH } from "../../constants/storageKeys";
import { TagSelect } from "../dialog/TagSelect";
import { InputWithLabelPosition } from "./InputWithLabelPosition";

interface DocumentFiltersProps {
  onChangeTag: (tag: string) => void;
  onSearchChange: (search: string) => void;
}

export const DocumentFilters = ({
  onChangeTag,
  onSearchChange,
}: DocumentFiltersProps) => {
  const [tag, setTag] = useState(
    sessionStorage.getItem(STORAGE_KEY_TAG_FILTER) || "All"
  );
  const [search, setSearch] = useState(
    sessionStorage.getItem(STORAGE_KEY_SEARCH) || ""
  );

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_TAG_FILTER, tag);
    onChangeTag(tag);
  }, [tag]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_SEARCH, search);
    onSearchChange(search);
  }, [search]);

  return (
    <div className="flex items-center gap-4  p-3 mt-3 rounded  mb-4">
      <TagSelect all={true} value={tag} onChange={setTag} />
      <InputWithLabelPosition
        value={search}
        onChange={setSearch}
        placeholder="Search the name"
        label="Search"
      />
    </div>
  );
};
