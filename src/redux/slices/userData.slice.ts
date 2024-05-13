import {createSlice} from '@reduxjs/toolkit';
import {
  ServicePlansType,
  SubscriptionPlanStatus,
  UserDataResponse,
} from '@tandem/api/userProfile/interface';

// Define a type for the slice state

export interface TermsInterface {
  terms: string;
  options: {description: string; isRequired: boolean}[];
}
interface UserDataState {
  userDataObject: UserDataResponse;
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
    consentForm: {terms: '', options: []},
    name: '',
    plan: {
      _id: '',
      currentSubscriptionCycle: '',
      status: SubscriptionPlanStatus.EXPIRED,
      type: ServicePlansType.TRIAL,
      startDate: '',
      endDate: null,
      usageDetails: {
        totalCredits: 0,
        usedCredits: 0,
      },
    },
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
        consentForm: {terms: '', options: []},
        name: '',
        plan: {
          _id: '',
          currentSubscriptionCycle: '',
          status: SubscriptionPlanStatus.EXPIRED,
          type: ServicePlansType.TRIAL,
          startDate: '',
          endDate: null,
          usageDetails: {
            totalCredits: 0,
            usedCredits: 0,
          },
        },
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
    changeNotifications: (state, action) => {
      state.userDataObject.allowNotifications = action.payload;
    },
  },
});

export const {
  saveUserData,
  resetUserData,
  saveSocialData,
  resetSocialData,
  changeNotifications,
} = setUserData.actions;

export default setUserData.reducer;
