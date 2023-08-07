import {createSlice} from '@reduxjs/toolkit';
import setupLangauge from '@tandem/functions/language';
const initialState = {
  locale: setupLangauge() || 'en',
  toastText: null,
  keyboardVisible: false,
};
const langualSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLocale: state => {
      state.locale = setupLangauge();
    },
    setKeyboardVisible: (state, action) => {
      state.keyboardVisible = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logoutFromRedux: state => {},
  },
});
export const {setLocale, setKeyboardVisible, logoutFromRedux} =
  langualSlice.actions;
export default langualSlice.reducer;
