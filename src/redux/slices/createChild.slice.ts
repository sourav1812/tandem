import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface ChildData {
  childInfo: {name: string; age: string; gender: string; avatar: string} | {};
}

// Define the initial state using that type
const initialState: ChildData = {
  childInfo: {},
};

export const createChildSlice = createSlice({
  name: 'createChild',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveChildData: (state, action) => {
      state.childInfo = action.payload;
    },
    resetChildData: state => {
      state.childInfo = {};
    },
  },
});

export const {saveChildData, resetChildData} = createChildSlice.actions;

export default createChildSlice.reducer;
