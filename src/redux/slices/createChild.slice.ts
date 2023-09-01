import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface ChildData {
  name: string;
  dob: string;
  gender: string;
  avatar: string;
  childId: string;
  type: 'child';
}

export interface AdultData {
  role: string;
  dob: string;
  avatar: string;
  profileId: string;
  type: 'adult';
}

interface ChildState {
  childList: ChildData[];
  currentChild: ChildData;
  currentAdult: AdultData;
  adultList: AdultData[];
}

// Define the initial state using that type
const initialState: ChildState = {
  childList: [],
  currentChild: {
    name: '',
    dob: '',
    gender: '',
    avatar: '',
    childId: '',
    type: 'child',
  },
  adultList: [],
  currentAdult: {
    role: '',
    dob: '',
    avatar: '',
    profileId: '',
    type: 'adult',
  },
};

export const createChildSlice = createSlice({
  name: 'createChild',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveChildData: (state, action) => {
      // state.childList.push(action.payload);
      if (Array.isArray(action.payload)) {
        state.childList = action.payload;
      } else {
        state.childList.push(action.payload);
      }
    },
    saveAdultData: (state, action) => {
      // state.childList.push(action.payload);
      if (Array.isArray(action.payload)) {
        state.adultList = action.payload;
      } else {
        state.adultList.push(action.payload);
      }
    },
    saveCurrentChild: (state, action) => {
      state.currentChild = action.payload;
    },
    saveCurrentAdult: (state, action) => {
      state.currentAdult = action.payload;
    },
    resetChildAndChildData: state => {
      state.childList = [];
      state.adultList = [];
    },
  },
});

export const {
  saveChildData,
  saveAdultData,
  saveCurrentAdult,
  saveCurrentChild,
  resetChildAndChildData,
} = createChildSlice.actions;

export default createChildSlice.reducer;
