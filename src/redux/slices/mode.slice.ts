import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface ModeState {
  mode: string;
}

// Define the initial state using that type
const initialState: ModeState = {
  mode: 'cmode',
};

export const modeSlice = createSlice({
  name: 'mode',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const {changeMode} = modeSlice.actions;

export default modeSlice.reducer;
