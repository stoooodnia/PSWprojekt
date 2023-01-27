import { configureStore } from "@reduxjs/toolkit";
import tileReducer from "./tilesSlice";
import roundReducer from "./roundSlice";

export const store = configureStore({
  reducer: {
    tile: tileReducer,
    round: roundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
