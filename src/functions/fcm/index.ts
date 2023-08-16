import messaging from '@react-native-firebase/messaging';
import {addFcmData} from '@tandem/redux/slices/tokens.slice';
import {store} from '@tandem/redux/store';
import {Platform} from 'react-native';
import {
  getUniqueId,
  getManufacturer,
  getAndroidId,
} from 'react-native-device-info';

export async function requestUserPermissionIOS() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    checkToken();
  } else {
    const deviceId =
      Platform.OS === 'ios' ? await getUniqueId() : await getAndroidId();
    const deviceManufacturer = await getManufacturer();
    const data = {
      deviceType: `${Platform.OS}-${deviceManufacturer}`,
      deviceId,
    };
    store.dispatch(addFcmData(data));
  }
}

export const checkToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      const deviceId =
        Platform.OS === 'ios' ? await getUniqueId() : await getAndroidId();
      const deviceManufacturer = await getManufacturer();
      const data = {
        deviceType: `${Platform.OS}-${deviceManufacturer}`,
        deviceId,
        fcmToken,
      };
      store.dispatch(addFcmData(data));
      return data;
    }
    return null;
  } catch (error: any) {
    return null;
  }
};
