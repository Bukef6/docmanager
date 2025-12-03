import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filterSlice";
import pagingReducer from "../features/pagingSlice";
import sortingReducer from "../features/sortingSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    paging: pagingReducer,
    sorting: sortingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
