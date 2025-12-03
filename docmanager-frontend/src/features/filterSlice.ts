import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  STORAGE_KEY_SEARCH,
  STORAGE_KEY_TAG_FILTER,
} from "../constants/storageKeys";

interface FilterState {
  tag: string;
  search: string;
}

const initialState: FilterState = {
  tag: sessionStorage.getItem(STORAGE_KEY_TAG_FILTER) || "All",
  search: sessionStorage.getItem(STORAGE_KEY_SEARCH) || "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setTag: (state, action: PayloadAction<string>) => {
      state.tag = action.payload;
      sessionStorage.setItem(STORAGE_KEY_TAG_FILTER, action.payload);
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      sessionStorage.setItem(STORAGE_KEY_SEARCH, action.payload);
    },
  },
});

export const { setTag, setSearch } = filterSlice.actions;
export default filterSlice.reducer;
