import {ChildData} from '@tandem/redux/slices/createChild.slice';
import {termsInterface} from '@tandem/redux/slices/userData.slice';
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    email: string;
    name: string;
    userId: string;
    children: ChildData[];
    adults: AdultData[];
    termsAndConditions: boolean;
    allowNotifications: boolean;
    consentForm: termsInterface;
  };
}

interface AdultData {
  avatar: string;
  dob: string;
  profileId: string;
  role: string;
}
