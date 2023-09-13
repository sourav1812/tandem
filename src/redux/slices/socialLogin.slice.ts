import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state

interface socialLoginState {
  socialDataObject: {
    email: string;
    name: string;
    idToken: string;
    image: string;
  };
}

// Define the initial state using that type
const initialState: socialLoginState = {
  socialDataObject: {
    email: '',
    name: '',
    idToken: '',
    image: '',
  },
};

export const setSocialLoginData = createSlice({
  name: 'socialLogin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveSocialData: (state, action) => {
      state.socialDataObject = action.payload;
    },
    resetSocialData: state => {
      state.socialDataObject = {
        name: '',
        email: '',
        idToken: '',
        image: '',
      };
    },
  },
});

// export const {saveSocialData, resetSocialData} = setSocialLoginData.actions;

export default setSocialLoginData.reducer;
