import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  isEnabled: boolean;
  isButtonDisabled: boolean;
  forceReload: boolean;
  storyBookNotification: boolean;
  isStoryGenTracking: boolean;
  progressRef: any;
}

const initialState: InitialState = {
  isEnabled: false,
  isButtonDisabled: false,
  forceReload: false,
  storyBookNotification: false,
  isStoryGenTracking: false,
  progressRef: null,
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
    setStoryBookNotification: (state, action) => {
      state.storyBookNotification = action.payload;
    },
    setStoryGenTracking: (state, action) => {
      state.isStoryGenTracking = action.payload;
    },
    setProgressRef: (state, action) => {
      state.progressRef = action.payload;
    },
  },
});
export const {
  startLoader,
  stopLoader,
  buttonLoader,
  setForceReload,
  setStoryBookNotification,
  setStoryGenTracking,
  setProgressRef,
} = activityIndicatorSlice.actions;
export default activityIndicatorSlice.reducer;
