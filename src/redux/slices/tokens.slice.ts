import {createSlice} from '@reduxjs/toolkit';
import {USER} from '@tandem/constants/enums';

interface TokenState {
  token: string;
  refreshToken: string;
  fcmData: {fcmToken: string; deviceId: string; deviceType: string} | null;
}

const initialState: TokenState = {
  token: '',
  refreshToken: '',
  fcmData: null,
};

export const tokenSlice = createSlice({
  name: 'manageToken',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToken: (state, action) => {
      console.log(action.payload, 'payload');
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    addFcmData: (state, action) => {
      console.log(action.payload, 'fcmToken data');
      state.fcmData = action.payload;
    },
    removeToken: _state => initialState,
  },
});

export const {addToken, removeToken, addFcmData} = tokenSlice.actions;

export default tokenSlice.reducer;
