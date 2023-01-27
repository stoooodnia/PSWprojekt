import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface TileState {
  selectedTiles: { [key: number]: boolean };
}

const initialState: TileState = {
  selectedTiles: {},
};

export const tileSlice = createSlice({
  name: "tile",
  initialState,
  reducers: {
    selectTile: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedTiles: {
          ...state.selectedTiles,
          [action.payload]: true,
        },
      };
    },
    deselectTile: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        selectedTiles: {
          ...state.selectedTiles,
          [action.payload]: false,
        },
      };
    },
  },
});

export const { selectTile, deselectTile } = tileSlice.actions;

export default tileSlice.reducer;
