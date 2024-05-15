import React, {FC, useEffect} from 'react';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Platform, UIManager} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {clearAlertData} from '@tandem/redux/slices/alertBox.slice';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import statusbar from '@tandem/functions/statusbar';
import i18n from '@tandem/constants/lang/i18n';
import setupLangauge from '@tandem/functions/language';
import {
  setForceReload,
  setStoryBookNotification,
} from '@tandem/redux/slices/activityIndicator.slice';
import {getChildStats} from '@tandem/api/childAnalytics';
import pushChildStats from '@tandem/functions/pushChildStats';

const persistor = persistStore(store);

const App: FC = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    i18n.locale = setupLangauge();
    store.dispatch(clearAlertData());
    const unsubscribe = messaging().onMessage(async () => {
      await pushChildStats();
      await getChildStats();
      store.dispatch(setForceReload(false)); // forcing a change to trigger useEffect
      store.dispatch(setForceReload(true));
      store.dispatch(setStoryBookNotification(true));
      const progressRef = store.getState().activityIndicator.progressRef;
      if (progressRef !== null) {
        progressRef.animateProgress(100);
      }
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
