import React, {FC, useEffect} from 'react';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Alert, Platform, UIManager} from 'react-native';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/LocalConstants';
import {PermissionsAndroid} from 'react-native';
import {requestUserPermissionIOS} from '@tandem/functions/fcm';
import messaging from '@react-native-firebase/messaging';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

const persistor = persistStore(store);

const App: FC = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    } else if (Platform.OS === 'ios') {
      requestUserPermissionIOS();
    }
    const tooltip = getValueFromKey(TOOLTIP);
    if (!tooltip) {
      storeKey(TOOLTIP, [0]);
      console.log('key generated');
    }
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
