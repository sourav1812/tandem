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
import {AppState, Platform} from 'react-native';
import {getStoredTokens} from '@tandem/functions/tokens';
import selfAnalytics from '@tandem/api/selfAnalytics';
import {UsersAnalyticsEvents} from '@tandem/api/selfAnalytics/interface';
import Purchases, {LOG_LEVEL} from 'react-native-purchases';

const persistor = persistStore(store);

const App: FC = () => {
  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    const f = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          // Display current offering with offerings.current
          console.log('@@@@@@@', JSON.stringify(offerings));
        }
      } catch (e) {
        console.log('error in offering list,', e);
        const products = await Purchases.getProducts([
          'tandem_199_10years_topUp_10credits',
        ]);
        console.log({products});
      }
    };
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({apiKey: 'appl_DBHwWDItbHyAvCyjOYMTVituxfI'});
    } else if (Platform.OS === 'android') {
      // Purchases.configure({apiKey: ''});
      // OR: if building for Amazon, be sure to follow the installation instructions then:
      // Purchases.configure({apiKey: '', useAmazon: true});
    }
    f();
  });

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const {token, refreshToken} = getStoredTokens();
        if (token && refreshToken) {
          selfAnalytics({
            eventType: UsersAnalyticsEvents.APP_OPENED,
            details: {isNotificationTapped: false},
          });
          userProfile();
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const unsub = notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.PRESS:
          console.log('ios notificatio set', detail.notification?.data);
          store.dispatch(setIsOpenedFromNotifications(true));
          unsub();
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
    const unsubscribe = messaging().onMessage(async message => {
      console.log({message});
      // const mockData = {
      //   message: {
      //     data: {
      //       eventType: 'book.created',
      //       metaData:
      //         '{"childId":"66751dfc9ce2f59cd484a2dd","childName":"Child 1"}',
      //     },
      //     from: '395516850709',
      //     messageId: '1719295800950436',
      //     notification: {
      //       body: 'Please check you are happy with the pictures before reading with your child.',
      //       title: 'Your story is ready!',
      //     },
      //   },
      // };
      if (message.data?.eventType === 'book.created') {
        const progressRef = store.getState().activityIndicator.progressRef;
        if (progressRef !== null) {
          progressRef.animateProgress(100);
        }
        const metaData = JSON.parse(message.data.metaData as string);
        await getStories(1, metaData.childId);
        await pushChildStats();
        await getChildStats();
        userProfile();
        store.dispatch(setForceReload(false)); // forcing a change to trigger useEffect
        store.dispatch(setForceReload(true));

        if (
          store.getState().createChild.currentChild.childId === metaData.childId
        ) {
          setTimeout(() => {
            onDisplayNotification({
              title:
                (metaData?.childName ? metaData.childName + "'s" : 'Your') +
                ' story is ready!',
              body: message.notification?.body,
              data: message.data,
            });
            store.dispatch(setStoryBookNotification(true));
            setTimeout(() => {
              store.dispatch(setStoryBookNotification(false));
            }, 1000);
          }, 1000);
        }

        // const notificationScreenPermissions = store.getState().permissions;
        // const isEnergyGenerated =
        //   store.getState().activityIndicator.isEnergyGenerated;
        // if (
        //   progressRef !== undefined &&
        //   progressRef !== null &&
        //   Object.keys(progressRef).length !== 0 &&
        //   isEnergyGenerated &&
        //   (!notificationScreenPermissions.isFirstTime ||
        //     notificationScreenPermissions.notificationStatus)
        // ) {
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
        // }
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
