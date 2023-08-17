import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {
  getUniqueId,
  getManufacturer,
  getAndroidId,
} from 'react-native-device-info';

export default async () => {
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
      return data;
    }
    return null;
  } catch (error: any) {
    return null;
  }
};
