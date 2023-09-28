import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state

interface PermissionStates {
  notificationStatus: boolean;
  isFirstTime: boolean;
}

// Define the initial state using that type
const initialState: PermissionStates = {
  notificationStatus: false,
  isFirstTime: true,
};

export const setPermissions = createSlice({
  name: 'permissions',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setNotificationStatus: (state, action) => {
      state.notificationStatus = action.payload;
    },
    setIsFirstTime: (state, action) => {
      state.isFirstTime = action.payload;
    },
  },
});

export const {setNotificationStatus, setIsFirstTime} = setPermissions.actions;

export default setPermissions.reducer;
