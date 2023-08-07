import {createSlice} from '@reduxjs/toolkit';

const initialState: {[key: string]: any} = {};

const getResponseReducer = createSlice({
  name: 'getResponseReducer',
  initialState,
  reducers: {
    addGetResponse: (state, action) => {
      const {path, response} = action.payload;
      state[path] = response;
    },
    resetGetResponse: state => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});
export const {addGetResponse, resetGetResponse} = getResponseReducer.actions;
export default getResponseReducer.reducer;
