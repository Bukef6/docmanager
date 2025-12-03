import { TagSelect } from "../dialog/TagSelect";
import { InputWithLabelPosition } from "./InputWithLabelPosition";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSearch, setTag } from "../../features/filterSlice";
import { setPage } from "../../features/pagingSlice";

export const DocumentFilters = () => {
  const dispatch = useAppDispatch();
  const tag = useAppSelector((state) => state.filters.tag);
  const search = useAppSelector((state) => state.filters.search);
  const page = useAppSelector((state) => state.paging.page);

  const resetPageIfNeeded = () => {
    if (page !== 1) {
      dispatch(setPage(1));
    }
  };
  const handleTagChange = (value: string) => {
    dispatch(setTag(value));
    resetPageIfNeeded();
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearch(value));
    resetPageIfNeeded();
  };

  return (
    <div className="flex items-center gap-4  p-3 mt-3 rounded  mb-4">
      <TagSelect all={true} value={tag} onChange={handleTagChange} />
      <InputWithLabelPosition
        value={search}
        onChange={handleSearchChange}
        placeholder="Search the name"
        label="Search"
      />
    </div>
  );
};
