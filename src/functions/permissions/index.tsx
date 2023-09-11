import {PermissionsAndroid, Platform, UIManager} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export const requestPermission = () => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  } else if (Platform.OS === 'ios') {
    messaging().requestPermission();
  }
};
