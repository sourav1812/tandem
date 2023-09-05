import {ChildData} from '@tandem/redux/slices/createChild.slice';
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    children: ChildData[];
    adults: AdultData[];
  };
}

interface AdultData {
  avatar: string;
  dob: string;
  profileId: string;
  role: string;
}
