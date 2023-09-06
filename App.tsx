import React, {FC, useEffect} from 'react';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Alert, Platform, UIManager} from 'react-native';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/local';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {clearAlertData} from '@tandem/redux/slices/alertBox.slice';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import statusbar from '@tandem/functions/statusbar';
import i18n from '@tandem/constants/lang/i18n';
import setupLangauge from '@tandem/functions/language';

const persistor = persistStore(store);

const App: FC = () => {
  useEffect(() => {
    i18n.locale = setupLangauge();
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
    const tooltip = getValueFromKey(TOOLTIP);
    store.dispatch(clearAlertData());
    if (!tooltip) {
      storeKey(TOOLTIP, [0]);
    }
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    statusbar();

    return unsubscribe;
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
