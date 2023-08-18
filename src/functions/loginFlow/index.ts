import {store} from '@tandem/redux/store';
import {storeTokens} from '../tokens';
import {LoginResponse} from './interface';
import {saveChildData} from '@tandem/redux/slices/createChild.slice';

export default async (loginResponse: LoginResponse) => {
  storeTokens(loginResponse.accessToken, loginResponse.refreshToken);
  //! other logic related to navigation flow , modes ,family here

  // ! Store user data from login response as well
  store.dispatch(saveChildData(loginResponse.userInfo.children));
};
