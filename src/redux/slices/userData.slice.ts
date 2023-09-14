import {createSlice} from '@reduxjs/toolkit';
import {AdultData, ChildData} from './createChild.slice';

// Define a type for the slice state

export interface TermsInterface {
  terms: string;
  optiosns: {description: string; isRequired: boolean}[];
}
interface userDataState {
  userDataObject: {
    email: string;
    name: string;
    userId: string;
    children?: ChildData[];
    adults?: AdultData[];
    termsAndConditions: boolean;
    allowNotifications: boolean;
    consentForm: TermsInterface;
  };
  socialDataObject: {
    email: string;
    name: string;
    idToken: string;
    image: string;
  };
}

// Define the initial state using that type
const initialState: userDataState = {
  userDataObject: {
    email: '',
    name: '',
    userId: '',
    children: [],
    adults: [],
    termsAndConditions: false,
    allowNotifications: false,
    consentForm: {terms: '', optiosns: []},
  },
  socialDataObject: {
    email: '',
    name: '',
    idToken: '',
    image: '',
  },
};

export const setUserData = createSlice({
  name: 'userData',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.userDataObject = action.payload;
    },
    resetUserData: state => {
      state.userDataObject = {
        name: '',
        email: '',
        userId: '',
        children: [],
        adults: [],
        termsAndConditions: false,
        allowNotifications: false,
        consentForm: {terms: '', optiosns: []},
      };
    },
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

export const {saveUserData, resetUserData, saveSocialData, resetSocialData} =
  setUserData.actions;

export default setUserData.reducer;
