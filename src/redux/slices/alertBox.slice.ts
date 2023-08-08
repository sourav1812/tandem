import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  data: {isEnabled: boolean; type: string; message: string};
}

const initialState: InitialState = {
  data: {isEnabled: false, type: '', message: ''},
};

const alertBoxSlice = createSlice({
  name: 'alertBox',
  initialState,
  reducers: {
    openAlertBox: state => {
      state.data = {
        ...state.data,
        isEnabled: true,
      };
    },
    closeAlertBox: state => {
      state.data = {
        ...state.data,
        isEnabled: false,
      };
    },
    addAlertData: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    clearAlertData: _state => initialState,
  },
});
export const {closeAlertBox, openAlertBox, addAlertData, clearAlertData} =
  alertBoxSlice.actions;
export default alertBoxSlice.reducer;
