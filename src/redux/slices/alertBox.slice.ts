import {createSlice} from '@reduxjs/toolkit';

interface InitialState {
  data: {
    type: string;
    message: string;
    onSuccess: () => void | Promise<void>;
    onDestructive?: () => void | Promise<void>;
    onThirdOption?: () => void | Promise<void>;
    possibleResolution: string;
    successText?: string;
    destructiveText?: string;
  };
}

const initialState: InitialState = {
  data: {
    type: '',
    message: '',
    onSuccess: () => {},
    possibleResolution: '',
    successText: '',
    destructiveText: '',
  },
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
