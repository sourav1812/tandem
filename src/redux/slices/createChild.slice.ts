import {createSlice} from '@reduxjs/toolkit';
import {adultProfile} from '@tandem/screens/Account/interface';

// Define a type for the slice state
export interface ChildData {
  name: string;
  age: string;
  gender: string;
  avatar: string;
  childId: string;
  avtarIndex: number | string;
  type: string;
  imageUrl?: string;
}

interface ChildState {
  childList: ChildData[];
  currentChild: ChildData;
  currentAdult: adultProfile;
}

// Define the initial state using that type
const initialState: ChildState = {
  childList: [],
  currentChild: {},
  currentAdult: {},
};

export const createChildSlice = createSlice({
  name: 'createChild',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveChildData: (state, action) => {
      state.childList.push(action.payload);
    },
    saveCurrentChild: (state, action) => {
      state.currentChild = action.payload;
    },
    saveCurrentAdult: (state, action) => {
      state.currentAdult = action.payload;
    },
    resetChildData: state => {
      state.childList = [];
    },
  },
});

export const {
  saveChildData,
  resetChildData,
  saveCurrentAdult,
  saveCurrentChild,
} = createChildSlice.actions;

export default createChildSlice.reducer;
