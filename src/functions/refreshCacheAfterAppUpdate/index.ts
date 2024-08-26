import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {reCache} from '../cache';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {APP_VERSION} from '@tandem/constants/local';
import DeviceInfo from 'react-native-device-info';

export default async () => {
  // ! check for an app version diff before invoking this function
  try {
    const oldAppVersion = getValueFromKey(APP_VERSION);
    const curentAppVersion = DeviceInfo.getVersion();
    console.log({curentAppVersion, oldAppVersion});
    if (curentAppVersion === oldAppVersion) {
      return;
    }
    // ! navigate to building tandem screen to show a loader while we refresh the assets
    navigateTo(SCREEN_NAME.BUILDING_TANDEM);
    // ! reinitiate redux
    // ! clear all old cache and redownload assets except for book images
    await reCache();
    storeKey(APP_VERSION, curentAppVersion);
  } catch (error) {
    console.log('error in refreshing cache', error);
  }
};
