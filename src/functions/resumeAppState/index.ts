import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {getStoredTokens} from '../tokens';
import userProfile from '@tandem/api/userProfile';
import {store} from '@tandem/redux/store';
import RNFetchBlob from 'rn-fetch-blob';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {CACHE_DIR} from '@tandem/constants/local';
import {reinitialiseCacheDirectory} from '@tandem/redux/slices/cache.slice';
import {Platform} from 'react-native';
import {renewImages} from '@tandem/redux/slices/bookShelf.slice';
import {
  resetReadStoryBookNumber,
  resetStoryPageNumber,
  setIsOpenedFromNotifications,
} from '@tandem/redux/slices/activityIndicator.slice';
import {inactiveTriggerNotifications} from '../notifee';
import selfAnalytics from '@tandem/api/selfAnalytics';
import {UsersAnalyticsEvents} from '@tandem/api/selfAnalytics/interface';
import wait from '../wait';
import gotoBookshelf from '../gotoBookshelf';
import messaging from '@react-native-firebase/messaging';
import consentNewsletter from '@tandem/api/consentNewsletter';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import {initialiseRevenueCat} from '../revenueCat';
import {Audio} from 'expo-av';

export default async () => {
  // ! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
      await initialiseRevenueCat(response?.appUserId);
    }
  }
  resetDirectoriesOfCachedData();
  await wait(1500);
  if (store.getState().userData.userDataObject.termsAndConditions) {
    if (Platform.OS === 'android') {
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log({initialNotification: initialNotification.data});
        store.dispatch(setIsOpenedFromNotifications(true));
      }
    }
    if (store.getState().activityIndicator.openedByNotifications) {
      store.dispatch(setIsOpenedFromNotifications(false));
      selfAnalytics({
        eventType: UsersAnalyticsEvents.APP_OPENED,
        details: {isNotificationTapped: true},
      });
      gotoBookshelf();
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

const resetDirectoriesOfCachedData = () => {
  // ! check if directory has changed then change all paths IOS ONLY
  const currentDirectory = RNFetchBlob.fs.dirs.DocumentDir;
  const oldDirectory = getValueFromKey(CACHE_DIR);
  if (oldDirectory && currentDirectory !== oldDirectory) {
    storeKey(CACHE_DIR, RNFetchBlob.fs.dirs.DocumentDir);
    // ! write logic to update all directory paths
    if (Platform.OS !== 'ios') {
      return;
    }
    try {
      const {avatars, flush, places, whatHappens, who, storyStyles} =
        store.getState().cache;

      const modifiedAvatars = avatars.map(val => {
        const file = JSON.parse(JSON.stringify(val.file));
        const newFile =
          'file://' + currentDirectory + file.split('Documents')[1];
        return {...val, file: newFile};
      });
      const modifiedFlush = flush.map(val => {
        const file = JSON.parse(JSON.stringify(val));
        const newFile =
          'file://' + currentDirectory + file.split('Documents')[1];
        return newFile;
      });
      const modifiedPlaces = places.map(val => {
        const file = JSON.parse(JSON.stringify(val.file));
        const newFile =
          'file://' + currentDirectory + file.split('Documents')[1];
        return {...val, file: newFile};
      });
      const modifiedWhatHappens = whatHappens.map(val => {
        const file = JSON.parse(JSON.stringify(val.file));
        const newFile =
          'file://' + currentDirectory + file.split('Documents')[1];
        return {...val, file: newFile};
      });
      const modifiedStoryStyles = storyStyles.map(val => {
        const file = JSON.parse(JSON.stringify(val.file));
        const newFile =
          'file://' + currentDirectory + file.split('Documents')[1];
        return {...val, file: newFile};
      });
      const modifiedWho = who.map(val => {
        const file = JSON.parse(JSON.stringify(val.file));
        const newFile =
          'file://' + currentDirectory + file.split('Documents')[1];
        return {...val, file: newFile};
      });

      // ! //////////////////////////////////////////////////////////////////
      const images = store.getState().bookShelf.images;
      const modifiedImages: {[keyValue: string]: string[]} = {};
      Object.keys(images).forEach(key => {
        const newArray = images[key].map(image => {
          const file = JSON.parse(JSON.stringify(image));
          return 'file://' + currentDirectory + file.split('Documents')[1];
        });
        modifiedImages[key] = newArray;
      });

      // ! dispatch new images
      store.dispatch(renewImages(modifiedImages));
      store.dispatch(
        reinitialiseCacheDirectory({
          modifiedAvatars,
          modifiedFlush,
          modifiedPlaces,
          modifiedWhatHappens,
          modifiedWho,
          modifiedStoryStyles,
        }),
      );
    } catch (error) {
      console.log('error in changing cache directory', error);
    }
  }
};
