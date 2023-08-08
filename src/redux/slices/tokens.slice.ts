import {createSlice} from '@reduxjs/toolkit';
import {USER} from '@tandem/constants/enums';

interface TokenState {
  [USER.TOKEN]: string;
  [USER.REFRESH_TOKEN]: string;
}

const initialState: TokenState = {
  [USER.TOKEN]: '',
  [USER.REFRESH_TOKEN]: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: _state => initialState,
  },
});

export const {addToken, removeToken} = tokenSlice.actions;

export default tokenSlice.reducer;
