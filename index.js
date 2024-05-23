/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';
import {storeKey} from '@tandem/helpers/encryptedStorage';
import {NAVIGATE_TO_BOOKSHELF} from '@tandem/constants/local';
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification} = detail;
  // Check if the user pressed the "Mark as read" action
  console.log({detail});
  if (type === EventType.ACTION_PRESS) {
    // Remove the notification
    storeKey(NAVIGATE_TO_BOOKSHELF, NAVIGATE_TO_BOOKSHELF);
    await notifee.cancelNotification(notification.id);
  }
});
AppRegistry.registerComponent(appName, () => App);
