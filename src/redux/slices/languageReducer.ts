import {createSlice} from '@reduxjs/toolkit';
// import setupLangauge from '@tandem/functions/language';
const initialState = {
  locale: 'en',
  toastText: null,
  keyboardVisible: false,
  notification: false,
};
const langualSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    setKeyboardVisible: (state, action) => {
      state.keyboardVisible = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logoutFromRedux: state => {},
    setNotificationKey: (state, action) => {
      state.notification = action.payload;
    },
  },
});
export const {
  setLocale,
  setNotificationKey,
  setKeyboardVisible,
  logoutFromRedux,
} = langualSlice.actions;
export default langualSlice.reducer;
