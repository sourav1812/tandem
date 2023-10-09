import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface LevelInterface {
  level: 0 | 1 | 2 | 3 | 4 | 5;
}

// Define the initial state using that type
const initialState: LevelInterface = {
  level: 0,
};

export const levelSlice = createSlice({
  name: 'storyLevel',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeStoryLevel: (state, action) => {
      state.level = action.payload;
    },
    resetStoryLevelInitialState: _state => initialState,
  },
});

export const {changeStoryLevel, resetStoryLevelInitialState} =
  levelSlice.actions;

export default levelSlice.reducer;
