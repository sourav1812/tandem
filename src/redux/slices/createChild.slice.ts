import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
interface ChildData {
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
      console.log(action.payload, 'saveChildData');
      let localChildList = [...state.childList];
      localChildList.push(action.payload);
      state.childList = localChildList;
    },
    resetChildData: state => {
      state.childList = [];
    },
  },
});

export const {saveChildData, resetChildData} = createChildSlice.actions;

export default createChildSlice.reducer;
