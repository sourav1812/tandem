import {ChildData} from '@tandem/redux/slices/createChild.slice';
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: {
    children: ChildData[];
  };
}
