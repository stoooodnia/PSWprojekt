import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface RoundState {
  prompt: string;
  howMany: number;
}

const initialState: RoundState = {
  prompt: "",
  howMany: 0,
};

export const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    setRound: (state, action: PayloadAction<RoundState>) => {
      const { prompt, howMany } = action.payload;
      state.prompt = prompt;
      state.howMany = howMany;
    },
  },
});

export const { setRound } = roundSlice.actions;

export default roundSlice.reducer;
