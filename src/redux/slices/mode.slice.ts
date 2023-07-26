import {createSlice} from '@reduxjs/toolkit';
import {MODE} from '@tandem/constants/mode';

// Define a type for the slice state
interface ModeState {
  mode: MODE.A | MODE.B | MODE.C;
}

// Define the initial state using that type
const initialState: ModeState = {
  mode: MODE.A,
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
