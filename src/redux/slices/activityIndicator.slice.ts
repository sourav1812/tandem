import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  isEnabled: boolean;
  isButtonEnabled: boolean;
}

const initialState: InitialState = {
  isEnabled: false,
  isButtonEnabled: false,
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
      state.isButtonEnabled = false;
    },
    buttonLoader: state => {
      state.isButtonEnabled = true;
    },
  },
});
export const {startLoader, stopLoader, buttonLoader} =
  activityIndicatorSlice.actions;
export default activityIndicatorSlice.reducer;
