import {PermissionsAndroid, Platform, UIManager} from 'react-native';
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
      store.dispatch(setNotificationStatus(false));
    }
    console.log(status, 'android permission request');
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  } else if (Platform.OS === 'ios') {
    const status = await messaging().requestPermission();
    console.log(status, 'iOS permission request');
    if (status === messaging.AuthorizationStatus.AUTHORIZED) {
      store.dispatch(setNotificationStatus(true));
      store.dispatch(setIsFirstTime('false'));
    } else {
      store.dispatch(setNotificationStatus(false));
    }
  }
};
