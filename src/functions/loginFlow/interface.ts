import {UserDataResponse} from '@tandem/api/userProfile/interface';
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: UserDataResponse;
}
