import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface ChildData {
  name: string;
  age: string;
  gender: string;
  avatar: string;
}

interface ChildState {
  childList: ChildData[];
}

// Define the initial state using that type
const initialState: ChildState = {
  childList: [],
};

export const createChildSlice = createSlice({
  name: 'createChild',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveChildData: (state, action) => {
      state.childList.push(action.payload);
    },
    resetChildData: state => {
      state.childList = [];
    },
  },
});

export const {saveChildData, resetChildData} = createChildSlice.actions;

export default createChildSlice.reducer;
