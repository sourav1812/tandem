import {storeTokens} from '../tokens';
import {LoginResponse} from './interface';

export default async (loginResponse: LoginResponse) => {
  storeTokens(loginResponse.accessToken, loginResponse.refreshToken);
  // other logic related to navigation flow , modes ,family here
};
