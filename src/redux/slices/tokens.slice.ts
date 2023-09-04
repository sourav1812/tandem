import {createSlice} from '@reduxjs/toolkit';

interface TokenState {
  token: string;
  refreshToken: string;
}

const initialState: TokenState = {
  token: '',
  refreshToken: '',
};

export const tokenSlice = createSlice({
  name: 'manageToken',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    removeToken: _state => initialState,
  },
});

export const {addToken, removeToken} = tokenSlice.actions;
export default tokenSlice.reducer;
