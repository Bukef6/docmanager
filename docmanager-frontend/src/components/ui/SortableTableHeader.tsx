import { MoveDown, MoveUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderBy } from "../../features/sortingSlice";
import Button from "./Button";
import type { RootState } from "../../lib/store";

interface Props {
  label: string;
  orderKey: string;
  align?: string;
}

export const SortableTableHeader = ({
  label,
  orderKey,
  align = "left",
}: Props) => {
  const dispatch = useDispatch();
  const { orderBy, asc } = useSelector((state: RootState) => state.sorting);

  const isActive = orderBy === orderKey;

  return (
    <th className={`p-3 group/item cursor-pointer text-${align}`}>
      <Button
        variant="ghost"
        className="p-0 m-0 inline-flex items-center gap-1"
        onClick={() => dispatch(setOrderBy(orderKey))}
      >
        <span className="font-bold">{label}</span>

        {isActive ? (
          asc ? (
            <MoveDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <MoveUp className="w-4 h-4 text-muted-foreground" />
          )
        ) : (
          <MoveDown className="invisible group-hover/item:visible w-4 h-4 text-muted-foreground" />
        )}
      </Button>
    </th>
  );
};
