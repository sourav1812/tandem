import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {getStoredTokens} from '../tokens';
import userProfile from '@tandem/api/userProfile';
import {store} from '@tandem/redux/store';
import {Platform} from 'react-native';
import {
  resetReadStoryBookNumber,
  resetStoryPageNumber,
  setIsOpenedFromNotifications,
} from '@tandem/redux/slices/activityIndicator.slice';
import {inactiveTriggerNotifications} from '../notifee';
import selfAnalytics from '@tandem/api/selfAnalytics';
import {UsersAnalyticsEvents} from '@tandem/api/selfAnalytics/interface';
import wait from '../wait';
import {changeChildAndNavigate} from '../gotoBookshelf';
import messaging from '@react-native-firebase/messaging';
import consentNewsletter from '@tandem/api/consentNewsletter';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import {initialiseRevenueCat} from '../revenueCat';
import {Audio} from 'expo-av';
import notifee from '@notifee/react-native';
import refreshCacheAfterAppUpdate from '../refreshCacheAfterAppUpdate';

export default async () => {
  await Audio.setAudioModeAsync({playsInSilentModeIOS: true});
  const storyBooksThisWeek =
    store.getState().activityIndicator.storyBooksReadThisWeek;
  const pageNumber = store.getState().activityIndicator.pagesReadInBooks;
  if (isNaN(storyBooksThisWeek)) {
    store.dispatch(resetReadStoryBookNumber());
  }
  if (isNaN(pageNumber)) {
    store.dispatch(resetStoryPageNumber());
  }
  const weekDate = store.getState().activityIndicator.weekMark;
  const isMoreThanWeek =
    (new Date().getTime() - new Date(weekDate || Date.now()).getTime()) /
      (1000 * 60 * 60 * 24) >=
    7;
  if (isMoreThanWeek) {
    store.dispatch(resetReadStoryBookNumber());
  }
  inactiveTriggerNotifications();
  // ! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const {token, refreshToken} = getStoredTokens();
  if (!token && !refreshToken) {
    await wait(2000);
    navigateTo(SCREEN_NAME.SELECT_LANGUAGE, {}, true);
    return;
  } else {
    const response = await userProfile();
    await refreshCacheAfterAppUpdate();
    await initialiseRevenueCat(response?.appUserId);
    if (response) {
      if (response?.receivePromotionalMails === undefined) {
        // ! if not subbed to newsletter ever.... ask user
        setTimeout(() => {
          store.dispatch(
            addAlertData({
              type: 'Message',
              message: 'Subcribe to Tandem Newsletter?',
              onSuccess: () => consentNewsletter(true),
              onDestructive: () => consentNewsletter(false),
            }),
          );
        }, 5000);
      }
    }
  }
  if (store.getState().userData.userDataObject.termsAndConditions) {
    if (Platform.OS === 'android') {
      const initialNotification = await messaging().getInitialNotification();
      const initialNotification2 = await notifee.getInitialNotification();
      const initialNotificationToBeUsed =
        initialNotification2?.notification || initialNotification;
      if (initialNotificationToBeUsed) {
        store.dispatch(setIsOpenedFromNotifications(true));
        console.log({initialNotification: initialNotificationToBeUsed.data});
        const metaData = initialNotificationToBeUsed.data?.metaData as string;
        if (metaData) {
          const childId = JSON.parse(metaData)?.childId;
          if (childId) {
            changeChildAndNavigate(childId);
          }
        }
        const eventType = initialNotificationToBeUsed.data?.eventType;
        if (eventType === UsersAnalyticsEvents.BOOK_FAILED) {
          navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
        }
      }
    }
    if (store.getState().activityIndicator.openedByNotifications) {
      store.dispatch(setIsOpenedFromNotifications(false));
      selfAnalytics({
        eventType: UsersAnalyticsEvents.APP_OPENED,
        details: {isNotificationTapped: true},
      });
      return;
    }
    selfAnalytics({
      eventType: UsersAnalyticsEvents.APP_OPENED,
      details: {isNotificationTapped: false},
    });
    navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
    return;
  }
  navigateTo(SCREEN_NAME.TERMS_AND_CONDITIONS, {}, true);
};
