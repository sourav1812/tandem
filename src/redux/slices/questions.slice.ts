import {createSlice} from '@reduxjs/toolkit';

interface DeviceState {
  index: number;
}

const initialState: DeviceState = {
  index: 1,
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestionIndex: (state, action) => {
      state.index = action.payload;
    },
  },
});

export const {setQuestionIndex} = questionsSlice.actions;

export default questionsSlice.reducer;
