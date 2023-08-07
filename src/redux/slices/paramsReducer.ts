import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  object: any;
}
const initialState: InitialState = {
  object: {},
};

const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    addParams: (state, action) => {
      state.object = action.payload;
    },
    clearParams: state => {
      state.object = {};
    },
  },
});

export const {addParams, clearParams} = paramsSlice.actions;
export default paramsSlice.reducer;
