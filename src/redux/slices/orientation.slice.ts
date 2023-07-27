import {createSlice} from '@reduxjs/toolkit';

interface DeviceState {
  isPortrait: boolean;
}

const initialState: DeviceState = {
  isPortrait: true,
};

export const orientationSlice = createSlice({
  name: 'orientation',
  initialState,
  reducers: {
    changeOrientation: (state, action) => {
      state.isPortrait = action.payload;
    },
  },
});

export const {changeOrientation} = orientationSlice.actions;

export default orientationSlice.reducer;
