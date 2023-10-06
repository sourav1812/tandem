import {createSlice} from '@reduxjs/toolkit';

interface Tooltip {
  [key: number]: boolean;
}

const initialState: Tooltip = {
  1: false,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: false,
  8: true,
  9: false,
  10: false,
  11: false,
  13: false,
  14: true,
  15: true,
  16: true,
  17: true,
  18: true,
  19: true,
  20: true,
};

const tooltipSlice = createSlice({
  name: 'tooltipSlice',
  initialState,
  reducers: {
    changeTooltipState: (state, action) => {
      const indexI = action.payload;
      state[indexI] = true;
    },
    changeTooltipStatePlusONe: (state, action) => {
      const indexJ = action.payload;
      state[indexJ + 1] = false;
    },
    changeTooltipStateIfChildListNotEmpty: state => {
      state[1] = true;
      state[2] = true;
      state[3] = true;
      state[4] = true;
      state[5] = true;
      state[6] = true;
      state[7] = false;
      state[8] = true;
      state[9] = true;
      state[10] = true;
      state[11] = true;
      state[12] = true;
      state[13] = false;
      state[14] = true;
      state[15] = true;
      state[16] = true;
      state[17] = true;
      state[18] = true;
      state[19] = true;
      state[20] = true;
    },
    changeTooltipStateToFalse: (state, action) => {
      const indexI = action.payload;
      state[indexI] = false;
    },
    resetTooltipState: state => {
      Object.assign(state, initialState);
    },
  },
});
export const {
  changeTooltipState,
  resetTooltipState,
  changeTooltipStatePlusONe,
  changeTooltipStateIfChildListNotEmpty,
  changeTooltipStateToFalse,
} = tooltipSlice.actions;
export default tooltipSlice.reducer;
