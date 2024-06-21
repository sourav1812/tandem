import React, {FC, useEffect} from 'react';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
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
  setIsOpenedFromNotifications,
  setStoryBookNotification,
} from '@tandem/redux/slices/activityIndicator.slice';
import {getChildStats} from '@tandem/api/childAnalytics';
import pushChildStats from '@tandem/functions/pushChildStats';
import getStories from '@tandem/api/getStories';
import notifee, {EventType} from '@notifee/react-native';

import userProfile from '@tandem/api/userProfile';
import {requestInitialPermission} from '@tandem/functions/permissions';
import onDisplayNotification from '@tandem/functions/notifee';

const persistor = persistStore(store);

const App: FC = () => {
  useEffect(() => {
    const unsub = notifee.onForegroundEvent(({type}) => {
      switch (type) {
        case EventType.PRESS:
          console.log('ios notificatio set');
          store.dispatch(setIsOpenedFromNotifications(true));
          break;
      }
      console.log('unsubbing from first onForegroundEvent');
      unsub();
    });
  }, []);
  useEffect(() => {
    requestInitialPermission();
    i18n.locale = setupLangauge();
    store.dispatch(clearAlertData());
    const unsubscribe = messaging().onMessage(async () => {
      await getStories(1);
      await pushChildStats();
      await getChildStats();
      userProfile();
      store.dispatch(setForceReload(false)); // forcing a change to trigger useEffect
      store.dispatch(setForceReload(true));
      store.dispatch(setStoryBookNotification(true));
      const progressRef = store.getState().activityIndicator.progressRef;
      const notificationScreenPermissions = store.getState().permissions;
      const isEnergyGenerated =
        store.getState().activityIndicator.isEnergyGenerated;

      if (
        progressRef !== undefined &&
        progressRef !== null &&
        Object.keys(progressRef).length !== 0 &&
        isEnergyGenerated &&
        (!notificationScreenPermissions.isFirstTime ||
          notificationScreenPermissions.notificationStatus)
      ) {
        progressRef.animateProgress(100);
        // setTimeout(() => {
        //   // ! alert to show book is ready with new text
        //   store.dispatch(
        //     addAlertData({
        //       type: 'Alert',
        //       message: translation('REVIEW_BOOK_BEFORE_READING_TO_CHILD'),
        //       onSuccess: async () => {
        //         store.dispatch(setStoryBookNotification(false));
        //         store.dispatch(clearAlertData());
        //         gotoBookshelf();
        //       },
        //       successText: translation('GO_TO_BOOKSHELF'),
        //       onDestructive: () => {},
        //       destructiveText: translation('LATER'),
        //     }),
        //   );
        // }, 4100);
      }
      await onDisplayNotification({
        title: 'Your story is ready!',
        body: 'Please check you are happy with the pictures before reading with your child.',
      });

      setTimeout(() => {
        store.dispatch(setStoryBookNotification(false));
      }, 1000);
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
