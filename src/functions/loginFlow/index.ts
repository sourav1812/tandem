import {store} from '@tandem/redux/store';
import {storeTokens} from '../tokens';
import {LoginResponse} from './interface';
import {
  saveAdultData,
  saveChildData,
} from '@tandem/redux/slices/createChild.slice';
import {saveUserData} from '@tandem/redux/slices/userData.slice';

export default async (loginResponse: LoginResponse) => {
  storeTokens(loginResponse.accessToken, loginResponse.refreshToken);
  // ! other logic related to navigation flow , modes ,family here

  // ! Store user data from login response as well
  store.dispatch(
    saveChildData(
      loginResponse.userInfo.children.map(child => ({...child, type: 'child'})),
    ),
  );

  store.dispatch(
    saveAdultData(
      loginResponse.userInfo.adults.map(adult => ({
        ...adult,
        type: 'adult',
      })),
    ),
  );
  // ! we will have to decide where we should keep children
  store.dispatch(
    saveUserData({
      ...loginResponse.userInfo,
      children: loginResponse.userInfo.children.map(child => ({
        ...child,
        type: 'child',
      })),
      adults: loginResponse.userInfo.adults.map(adult => ({
        ...adult,
        type: 'adult',
      })),
    }),
  );
};
