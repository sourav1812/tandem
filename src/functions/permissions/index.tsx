import {Linking, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {store} from '@tandem/redux/store';
import {
  setIsFirstTime,
  setNotificationStatus,
} from '@tandem/redux/slices/permissions.slice';

export const requestPermission = async () => {
  let status = false;
  if (Platform.OS === 'android') {
    const statusAndroid = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (statusAndroid === 'granted') {
      status = true;
    }
  } else if (Platform.OS === 'ios') {
    const statusIOS = await messaging().requestPermission();
    if (statusIOS === messaging.AuthorizationStatus.AUTHORIZED) {
      status = true;
    }
  }
  if (status) {
    store.dispatch(setNotificationStatus(true));
    store.dispatch(setIsFirstTime(false));
    return;
  }
  Linking.openSettings();
};
export const requestInitialPermission = async () => {
  let status = false;
  if (Platform.OS === 'android') {
    const statusAndroid = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (statusAndroid === 'granted') {
      status = true;
    }
  } else if (Platform.OS === 'ios') {
    const statusIOS = await messaging().requestPermission();
    if (statusIOS === messaging.AuthorizationStatus.AUTHORIZED) {
      status = true;
    }
  }
  if (status) {
    store.dispatch(setNotificationStatus(true));
    store.dispatch(setIsFirstTime(false));
    return;
  }
};

export const notificationActiveStatus = async () => {
  const fromBackend: boolean =
    store.getState().userData.userDataObject.allowNotifications;
  let fromApp: boolean = false;

  if (Platform.OS === 'android') {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (status === 'granted') {
      fromApp = true;
      store.dispatch(setNotificationStatus(true));
      store.dispatch(setIsFirstTime(false));
    }
  } else if (Platform.OS === 'ios') {
    const status = await messaging().requestPermission();
    if (
      status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      fromApp = true;
      store.dispatch(setNotificationStatus(true));
      store.dispatch(setIsFirstTime(false));
    }
  }
  return {fromApp, fromBackend};
};
