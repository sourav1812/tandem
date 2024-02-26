import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  isEnabled: boolean;
  isButtonDisabled: boolean;
  forceReload: boolean;
}

const initialState: InitialState = {
  isEnabled: false,
  isButtonDisabled: false,
  forceReload: false,
};
const activityIndicatorSlice = createSlice({
  name: 'activityIndicator',
  initialState,
  reducers: {
    startLoader: state => {
      state.isEnabled = true;
    },
    stopLoader: state => {
      state.isEnabled = false;
      state.isButtonDisabled = false;
    },
    buttonLoader: state => {
      state.isButtonDisabled = true;
    },
    setForceReload: (state, action) => {
      state.forceReload = action.payload;
    },
  },
});
export const {startLoader, stopLoader, buttonLoader, setForceReload} =
  activityIndicatorSlice.actions;
export default activityIndicatorSlice.reducer;
