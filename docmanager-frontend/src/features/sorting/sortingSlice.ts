import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SortingState {
  orderBy: string;
  asc: boolean;
}

const initialState: SortingState = {
  orderBy: "",
  asc: true,
};

export const sortingSlice = createSlice({
  name: "sorting",
  initialState,
  reducers: {
    setOrderBy: (state, action: PayloadAction<string>) => {
      if (state.orderBy === action.payload) {
        state.asc = !state.asc;
      } else {
        state.orderBy = action.payload;
        state.asc = true;
      }
    },

    setAsc: (state, action: PayloadAction<boolean>) => {
      state.asc = action.payload;
    },
  },
});

export const { setOrderBy, setAsc } = sortingSlice.actions;
export default sortingSlice.reducer;
