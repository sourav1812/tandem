import {store} from '@tandem/redux/store';
import {storeTokens} from '../tokens';
import {LoginResponse} from './interface';
import {
  saveAdultData,
  saveChildData,
} from '@tandem/redux/slices/createChild.slice';
import {saveUserData} from '@tandem/redux/slices/userData.slice';
import {cacheAvatars, cachePlaces} from '../cache';
import {PEOPLE} from '@tandem/constants/enums';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import RNFetchBlob from 'rn-fetch-blob';
import {CACHE_SESSION, TERMS_ACCEPTED} from '@tandem/constants/local';
import {clearCacheForce} from '@tandem/redux/slices/cache.slice';
import {storeKey} from '@tandem/helpers/encryptedStorage';

export default async (loginResponse: LoginResponse) => {
  RNFetchBlob.session(CACHE_SESSION).dispose();
  store.dispatch(clearCacheForce());
  storeTokens(loginResponse.accessToken, loginResponse.refreshToken);
  // ! other logic related to navigation flow , modes ,family here
  // ! Store user data from login response as well
  store.dispatch(
    saveChildData(
      loginResponse.userInfo.children.map(child => ({
        ...child,
        type: PEOPLE.CHILD,
      })),
    ),
  );

  cacheAvatars();
  cachePlaces();

  store.dispatch(
    saveAdultData(
      loginResponse.userInfo.adults.map(adult => ({
        ...adult,
        type: PEOPLE.ADULT,
      })),
    ),
  );
  // ! we will have to decide where we should keep children
  store.dispatch(
    saveUserData({
      ...loginResponse.userInfo,
      children: loginResponse.userInfo.children.map(child => ({
        ...child,
        type: PEOPLE.CHILD,
      })),
      adults: loginResponse.userInfo.adults.map(adult => ({
        ...adult,
        type: PEOPLE.ADULT,
      })),
    }),
  );
  if (loginResponse.userInfo.termsAndConditions) {
    storeKey(TERMS_ACCEPTED, TERMS_ACCEPTED);
    navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
  } else {
    navigateTo(SCREEN_NAME.TERMS_AND_CONDITIONS, {}, true);
  }
};
