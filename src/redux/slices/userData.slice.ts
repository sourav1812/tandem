import {createSlice} from '@reduxjs/toolkit';
import {AdultData, ChildData} from './createChild.slice';

// Define a type for the slice state

export interface TermsInterface {
  terms: string;
  optiosns: {description: string; isRequired: boolean}[];
}
interface UserDataState {
  userDataObject: {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
    children?: ChildData[];
    adults?: AdultData[];
    termsAndConditions: boolean;
    allowNotifications: boolean;
    consentForm: TermsInterface;
  };
  socialDataObject: {
    email: string;
    firstName: string;
    lastName: string;
    idToken: string;
    image: string;
  };
}

// Define the initial state using that type
const initialState: UserDataState = {
  userDataObject: {
    email: '',
    firstName: '',
    lastName: '',
    userId: '',
    children: [],
    adults: [],
    termsAndConditions: false,
    allowNotifications: false,
    consentForm: {terms: '', optiosns: []},
  },
  socialDataObject: {
    email: '',
    firstName: '',
    lastName: '',
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
        firstName: '',
        lastName: '',
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
        firstName: '',
        lastName: '',
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
