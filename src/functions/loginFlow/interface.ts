import {ChildData} from '@tandem/redux/slices/createChild.slice';
import {TermsInterface} from '@tandem/redux/slices/userData.slice';
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
    children: ChildData[];
    adults: AdultData[];
    termsAndConditions: boolean;
    allowNotifications: boolean;
    consentForm: TermsInterface;
  };
}

interface AdultData {
  avatar: string;
  dob: string;
  profileId: string;
  role: string;
}
