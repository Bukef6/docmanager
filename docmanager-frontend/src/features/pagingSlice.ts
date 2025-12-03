import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  STORAGE_KEY_CURRENT_PAGE,
  STORAGE_KEY_ITEMS_PER_PAGE,
} from "../constants/storageKeys";
import { PAGE_SIZES } from "../constants/pageSizes";

interface PagingState {
  page: number;
  pageSize: number;
}

const savedPage = sessionStorage.getItem(STORAGE_KEY_CURRENT_PAGE);
const savedPageSize = sessionStorage.getItem(STORAGE_KEY_ITEMS_PER_PAGE);
const initialState: PagingState = {
  page: savedPage ? parseInt(savedPage, 10) : 1,
  pageSize: savedPageSize ? parseInt(savedPageSize, 10) : PAGE_SIZES[0],
};

export const pagingSlice = createSlice({
  name: "paging",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
      sessionStorage.setItem(STORAGE_KEY_CURRENT_PAGE, state.page.toString());
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      sessionStorage.setItem(
        STORAGE_KEY_ITEMS_PER_PAGE,
        state.pageSize.toString()
      );
    },
  },
});

export const { setPage, setPageSize } = pagingSlice.actions;
export default pagingSlice.reducer;
