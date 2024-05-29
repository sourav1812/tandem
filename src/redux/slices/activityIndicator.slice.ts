import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  isEnabled: boolean;
  isButtonDisabled: boolean;
  forceReload: boolean;
  storyBookNotification: boolean;
  isStoryGenTracking: boolean;
  progressRef: any;
  isEnergyGenerated: boolean;
  storyBooksReadThisWeek: number;
  weekMark: Date;
  pagesReadInBooks: number;
}

const initialState: InitialState = {
  isEnabled: false,
  isButtonDisabled: false,
  forceReload: false,
  storyBookNotification: false,
  isStoryGenTracking: false,
  progressRef: null,
  isEnergyGenerated: false,
  storyBooksReadThisWeek: 0,
  weekMark: new Date(),
  pagesReadInBooks: 0,
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
    setEnergyGenerated: (state, action) => {
      state.isEnergyGenerated = action.payload;
    },
    incrementReadStoryBookNumber: state => {
      state.storyBooksReadThisWeek += 1;
    },
    incrementStoryPageNumber: state => {
      state.pagesReadInBooks += 1;
    },
    resetStoryPageNumber: state => {
      state.pagesReadInBooks = 0;
    },
    resetReadStoryBookNumber: state => {
      state.storyBooksReadThisWeek = 0;
      state.weekMark = new Date();
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
  setEnergyGenerated,
  incrementReadStoryBookNumber,
  resetReadStoryBookNumber,
  incrementStoryPageNumber,
  resetStoryPageNumber,
} = activityIndicatorSlice.actions;
export default activityIndicatorSlice.reducer;
