import {createSlice} from '@reduxjs/toolkit';
import {AdultProfile} from '@tandem/screens/Account/interface';

// Define a type for the slice state
export interface ChildData {
  name: string;
  age: string;
  gender: string;
  avatar: string;
  childId: string;
  avtarIndex: number;
  type: string;
  imageUrl?: string;
}

interface ChildState {
  childList: ChildData[];
  currentChild: ChildData;
  currentAdult: AdultProfile;
}

// Define the initial state using that type
const initialState: ChildState = {
  childList: [],
  currentChild: {
    name: '',
    age: '',
    gender: '',
    avatar: '',
    childId: '',
    avtarIndex: -1,
    type: '',
    imageUrl: '',
  },
  currentAdult: {
    type: 'adult',
    name: '',
  },
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
