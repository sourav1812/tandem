import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface DeviceState {
  isTablet: boolean;
}

// Define the initial state using that type
const initialState: DeviceState = {
  isTablet: false,
};

export const deviceTypeSlice = createSlice({
  name: 'deviceType',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeDevice: (state, action) => {
      state.isTablet = action.payload;
    },
  },
});

export const {changeDevice} = deviceTypeSlice.actions;

export default deviceTypeSlice.reducer;
