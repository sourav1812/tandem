import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  isEnabled: boolean;
  isButtonDisabled: boolean;
}

const initialState: InitialState = {
  isEnabled: false,
  isButtonDisabled: false,
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
  },
});
export const {startLoader, stopLoader, buttonLoader} =
  activityIndicatorSlice.actions;
export default activityIndicatorSlice.reducer;
