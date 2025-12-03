import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../lib/store";
import { setOrderBy } from "../../features/sortingSlice";
import Button from "./Button";
import { SORT_OPTIONS } from "../../constants/sortOptions";

export const MobileSortMenu = () => {
  const dispatch = useDispatch();
  const { orderBy, asc } = useSelector((state: RootState) => state.sorting);

  const handleChange = (value: string) => {
    dispatch(setOrderBy(value));
  };

  return (
    <div className="sm:hidden mb-3 flex flex-row items-center ">
      <label className="block text-gray-700 mb-1 font-semibold whitespace-nowrap me-4">
        Sort by:
      </label>

      <select
        value={orderBy}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>

      <Button
        variant="ghost"
        onClick={() => handleChange(orderBy)}
        className="w-[200px] mt-0 text-sm text-blue-600 underline whitespace-nowrap"
      >
        {asc ? "Ascending ↑" : "Descending ↓"}
      </Button>
    </div>
  );
};
