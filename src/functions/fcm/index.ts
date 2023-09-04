import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {
  getUniqueId,
  getManufacturer,
  getAndroidId,
} from 'react-native-device-info';

export default async () => {
  const deviceId =
    Platform.OS === 'ios' ? await getUniqueId() : await getAndroidId();
  const deviceManufacturer = await getManufacturer();
  const deviceType = `${Platform.OS}-${deviceManufacturer}`;
  try {
    const fcmToken = await messaging().getToken();
    return {deviceId, deviceType, fcmToken};
  } catch (error: any) {
    return {deviceId, deviceType, fcmToken: null};
  }
};
