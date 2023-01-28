import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface RoundState {
  prompt: string;
  howMany: number;
  team: "red" | "blue" | null;
  show: boolean;
}

const initialState: RoundState = {
  prompt: "",
  howMany: 0,
  team: null,
  show: false,
};

export const roundSlice = createSlice({
  name: "round",
  initialState,
  reducers: {
    setRound: (state, action: PayloadAction<RoundState>) => {
      const { prompt, howMany, team } = action.payload;
      state.prompt = prompt;
      state.howMany = howMany;
      state.team = team;
    },
    setShow: (state, action: PayloadAction<RoundState>) => {
      const { show } = action.payload;
      state.show = show;
    },
  },
});

export const { setRound, setShow } = roundSlice.actions;

export default roundSlice.reducer;
