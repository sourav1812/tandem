import {store} from '@tandem/redux/store';
import {storeTokens} from '../tokens';
import {LoginResponse} from './interface';
import {
  saveAdultData,
  saveChildData,
} from '@tandem/redux/slices/createChild.slice';
import {saveUserData} from '@tandem/redux/slices/userData.slice';
import {reCache} from '../cache';
import {PEOPLE} from '@tandem/constants/enums';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {clearCacheForce} from '@tandem/redux/slices/cache.slice';
import {getChildStats} from '@tandem/api/childAnalytics';
import {initialiseRevenueCat} from '../revenueCat';
import {APP_VERSION} from '@tandem/constants/local';
import {storeKey} from '@tandem/helpers/encryptedStorage';
import DeviceInfo from 'react-native-device-info';

export default async (loginResponse: LoginResponse) => {
  navigateTo(SCREEN_NAME.BUILDING_TANDEM);
  store.dispatch(clearCacheForce());
  storeTokens(loginResponse.accessToken, loginResponse.refreshToken);
  // ! other logic related to navigation flow , modes ,family here
  // ! Store user data from login response as well
  store.dispatch(
    saveChildData(
      loginResponse.userInfo.children?.map(child => ({
        ...child,
        type: PEOPLE.CHILD,
      })),
    ),
  );

  store.dispatch(
    saveAdultData(
      loginResponse.userInfo.adults?.map(adult => ({
        ...adult,
        type: PEOPLE.ADULT,
      })),
    ),
  );

  // ! we will have to decide where we should keep children
  store.dispatch(
    saveUserData({
      ...loginResponse.userInfo,
      children: loginResponse.userInfo.children?.map(child => ({
        ...child,
        type: PEOPLE.CHILD,
      })),
      adults: loginResponse.userInfo.adults?.map(adult => ({
        ...adult,
        type: PEOPLE.ADULT,
      })),
    }),
  );

  const curentAppVersion = DeviceInfo.getVersion();
  storeKey(APP_VERSION, curentAppVersion);

  await reCache();
  await initialiseRevenueCat(loginResponse.userInfo.appUserId);
  await getChildStats();

  if (loginResponse.userInfo.termsAndConditions) {
    navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
  } else {
    navigateTo(SCREEN_NAME.TERMS_AND_CONDITIONS, {}, true);
  }
};
