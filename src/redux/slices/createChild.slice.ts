import {createSlice} from '@reduxjs/toolkit';
import {PEOPLE} from '@tandem/constants/enums';

// Define a type for the slice state
export interface ChildData {
  name: string;
  dob: string;
  gender: string;
  avatar: string;
  childId: string;
  type: PEOPLE.CHILD;
}

export interface AdultData {
  role: string;
  dob: string;
  avatar: string;
  profileId: string;
  type: PEOPLE.ADULT;
}

interface ChildState {
  childList: ChildData[];
  currentChild: ChildData;
  currentAdult: AdultData;
  adultList: AdultData[];
  stats: {
    [key: string]: Stats;
  };
}
export interface Stats {
  _id: string;
  totalBooksCreated: number;
  generation: {
    totalTime: number;
  };
  reading: {
    totalTime: {
      solo: number;
      tandem: {parentId: string; time: number}[];
    };
  };
  childId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
    type: PEOPLE.CHILD,
  },
  adultList: [],
  currentAdult: {
    role: '',
    dob: '',
    avatar: '',
    profileId: '',
    type: PEOPLE.ADULT,
  },
  stats: {},
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
    resetAdultData: state => {
      state.adultList = [];
    },
    resetChildData: state => {
      state.childList = [];
    },
    updateChildStats: (state, action) => {
      const childId: string = action.payload.childId;
      const stats: Stats = action.payload.stats;
      state.stats[childId] = stats;
    },
  },
});

export const {
  saveChildData,
  saveAdultData,
  saveCurrentAdult,
  saveCurrentChild,
  resetAdultData,
  resetChildData,
  updateChildStats,
} = createChildSlice.actions;

export default createChildSlice.reducer;
