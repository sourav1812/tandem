import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface LevelInterface {
  level: number;
  size: number;
}

// Define the initial state using that type
const initialState: LevelInterface = {
  level: 1,
  size: 2,
};

export const levelSlice = createSlice({
  name: 'storyLevel',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeStoryLevel: (state, action) => {
      state.level = action.payload;
    },
    changeTextSize: (state, action) => {
      state.size = action.payload;
    },
    resetStoryLevelInitialState: _state => initialState,
  },
});

export const {changeStoryLevel, resetStoryLevelInitialState, changeTextSize} =
  levelSlice.actions;

export default levelSlice.reducer;
