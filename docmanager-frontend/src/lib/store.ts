import { configureStore } from "@reduxjs/toolkit";
import sortingReducer from "../features/sorting/sortingSlice";

export const store = configureStore({
  reducer: {
    sorting: sortingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
