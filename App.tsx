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
  setIsOpenedFromNotifications,
  setStoryBookNotification,
} from '@tandem/redux/slices/activityIndicator.slice';
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
import {Audio} from 'expo-av';
import SO_notifications from '@tandem/assets/appInteraction/SO_notifications.mp3';
import {changeChildAndNavigate} from '@tandem/functions/gotoBookshelf';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
const persistor = persistStore(store);

const playSound = async (soundFile: any) => {
  const {sound} = await Audio.Sound.createAsync(soundFile);
  await sound.playAsync();
  setTimeout(async () => {
    await sound.unloadAsync();
  }, 1000);
};

const App: FC = () => {
  const appState = React.useRef(AppState.currentState);

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
          console.log(
            'onForegroundEvent on app open',
            detail.notification?.data,
          );
          store.dispatch(setIsOpenedFromNotifications(true));
          const metaData = detail?.notification?.data?.metaData as string;
          if (metaData) {
            const childId = JSON.parse(metaData)?.childId;
            if (childId) {
              changeChildAndNavigate(childId);
            }
          }
          const eventType = detail?.notification?.data?.eventType;
          if (eventType === UsersAnalyticsEvents.BOOK_FAILED) {
            navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
          }
          unsub();
          break;
      }
      console.log('unsubbing from first onForegroundEvent');
      unsub();
    });
    if (Platform.OS === 'android') {
      messaging().onNotificationOpenedApp(async notificationData => {
        console.log(
          'onNotificationOpenedApp is triggering',
          notificationData?.data,
        );

        // Remove the notification
        const metaData = notificationData.data?.metaData as string;
        if (metaData) {
          const childId = JSON.parse(metaData)?.childId;
          if (childId) {
            changeChildAndNavigate(childId);
          }
        }
        const eventType = notificationData.data?.eventType;
        if (eventType === UsersAnalyticsEvents.BOOK_FAILED) {
          navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
        }
      });
    }
  }, []);

  useEffect(() => {
    requestInitialPermission();
    i18n.locale = setupLangauge();
    store.dispatch(clearAlertData());
    const unsubscribe = messaging().onMessage(async message => {
      //! const mockData = {
      //!   message: {
      //!     data: {
      //!       eventType: 'book.created',
      //!       metaData:
      //!         '{"childId":"66751dfc9ce2f59cd484a2dd","childName":"Child 1"}',
      //!     },
      //!     from: '395516850709',
      //!     messageId: '1719295800950436',
      //!     notification: {
      //!       body: 'Please check you are happy with the pictures before reading with your child.',
      //!       title: 'Your story is ready!',
      //!     },
      //!   },
      //! };

      if (message.data?.eventType === UsersAnalyticsEvents.BOOK_CREATED) {
        const metaData = JSON.parse(message.data.metaData as string);
        if (
          store.getState().createChild.currentChild.childId === metaData.childId
        ) {
          try {
            const progressRef = store.getState().activityIndicator.progressRef;
            if (progressRef !== null) {
              progressRef.animateProgress(100);
            }
          } catch (error) {
            console.log('error in animation of progress bar to 100%', error);
          }
        }
        await getStories(1, metaData.childId);
        await pushChildStats();
        userProfile();
        setTimeout(() => {
          playSound(SO_notifications);
          onDisplayNotification({
            title:
              (metaData?.childName ? metaData.childName + "'s" : 'Your') +
              ' story is ready!',
            body: message.notification?.body,
            data: message.data,
          });
          if (
            store.getState().createChild.currentChild.childId ===
            metaData.childId
          ) {
            store.dispatch(setStoryBookNotification(true)); // only for matching pairs screen
            setTimeout(() => {
              store.dispatch(setStoryBookNotification(false));
            }, 1000);
          }
        }, 1000);

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
        return;
      } else if (message.data?.eventType === UsersAnalyticsEvents.BOOK_FAILED) {
        onDisplayNotification({
          title: message.notification?.title,
          body: message.notification?.body,
          data: message.data,
        });
        return;
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
