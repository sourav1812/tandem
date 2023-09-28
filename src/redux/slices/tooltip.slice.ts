import {createSlice} from '@reduxjs/toolkit';

interface Tooltip {
  [key: number]: boolean;
}

const initialState: Tooltip = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
  10: false,
  11: false,
  13: false,
  14: false,
  15: false,
  16: false,
  17: false,
  18: false,
  19: false,
  20: false,
};

const tooltipSlice = createSlice({
  name: 'tooltipSlice',
  initialState,
  reducers: {
    changeTooltipState: (state, action) => {
      const indexI = action.payload;
      state[indexI] = true;
    },
    resetTooltipState: state => {
      Object.assign(state, initialState);
    },
  },
});
export const {changeTooltipState, resetTooltipState} = tooltipSlice.actions;
export default tooltipSlice.reducer;
