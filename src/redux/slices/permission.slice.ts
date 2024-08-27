import {createSlice} from '@reduxjs/toolkit';

export interface permissions {
  readStoryBooks: boolean;
  createStoryBooks: boolean;
  createReadingSessions: boolean;
  changeArchiveStatus: boolean;
  changePublicStatus: boolean;
}

interface childPermission {
  permission: permissions;
}

const initialState: childPermission = {
  permission: {
    readStoryBooks: true,
    createStoryBooks: true,
    createReadingSessions: true,
    changeArchiveStatus: true,
    changePublicStatus: true,
  },
};

export const childPermissionSlice = createSlice({
  name: 'setPermission',
  initialState,
  reducers: {
    permissionData: (state, action) => {
      state.permission =
        action.payload && Object.keys(action.payload).length > 0
          ? action.payload
          : initialState.permission;
    },

    resetPermissionData: state => {
      state = initialState;
    },
  },
});

export const {permissionData, resetPermissionData} =
  childPermissionSlice.actions;

export default childPermissionSlice.reducer;
