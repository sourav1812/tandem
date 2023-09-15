import {Linking, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {store} from '@tandem/redux/store';
import {
  setIsFirstTime,
  setNotificationStatus,
} from '@tandem/redux/slices/permissions.slice';

export const requestPermission = async () => {
  if (Platform.OS === 'android') {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (status === 'granted') {
      store.dispatch(setNotificationStatus(true));
      store.dispatch(setIsFirstTime('false'));
    } else {
      Linking.openSettings();
    }
    console.log(status, 'android permission request');
  } else if (Platform.OS === 'ios') {
    const status = await messaging().requestPermission();
    console.log(status, 'iOS permission request');
    if (status === messaging.AuthorizationStatus.AUTHORIZED) {
      store.dispatch(setNotificationStatus(true));
      store.dispatch(setIsFirstTime('false'));
    } else {
      Linking.openURL('App-Prefs:NOTIFICATIONS_ID&path=playtandem.com');
    }
  }
};
