import {createSlice} from '@reduxjs/toolkit';
import {ChildData} from './createChild.slice';

// Define a type for the slice state

interface userDataState {
  userDataObject: {
    email: string;
    name: string;
    userId: string;
    children?: ChildData[];
  };
}

// Define the initial state using that type
const initialState: userDataState = {
  userDataObject: {
    email: '',
    name: '',
    userId: '',
    children: [],
  },
};

export const setUserData = createSlice({
  name: 'userData',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userDataObject = action.payload;
    },
    resetUserData: state => {
      state.userDataObject = {name: '', email: '', userId: '', children: []};
    },
  },
});

export const {saveUserData, resetUserData} = setUserData.actions;

export default setUserData.reducer;
