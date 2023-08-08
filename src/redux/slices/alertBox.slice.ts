import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  data: {type: string; message: string};
}

const initialState: InitialState = {
  data: {type: '', message: ''},
};

const alertBoxSlice = createSlice({
  name: 'alertBox',
  initialState,
  reducers: {
    addAlertData: (state, action) => {
      state.data = action.payload;
    },
    clearAlertData: _state => initialState,
  },
});
export const {addAlertData, clearAlertData} = alertBoxSlice.actions;
export default alertBoxSlice.reducer;
