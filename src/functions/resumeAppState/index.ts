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

export default async () => {
  const {token, refreshToken} = getStoredTokens();
  setTimeout(() => {
    if (!token && !refreshToken) {
      navigateTo(SCREEN_NAME.SELECT_LANGUAGE, {}, true);
      return;
    } else {
      userProfile();
    }
    if (store.getState().userData.userDataObject.termsAndConditions) {
      navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
    } else {
      navigateTo(SCREEN_NAME.TERMS_AND_CONDITIONS, {}, true);
    }
    resetDirectoriesOfCachedData();
  }, 2000);
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
      const {avatars, flush, places, whatHappens, who} = store.getState().cache;

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
      const modifiedWho = who.map(val => {
        const file = JSON.parse(JSON.stringify(val.file));
        const newFile =
          'file://' + currentDirectory + file.split('Documents')[1];
        return {...val, file: newFile};
      });

      store.dispatch(
        reinitialiseCacheDirectory({
          modifiedAvatars,
          modifiedFlush,
          modifiedPlaces,
          modifiedWhatHappens,
          modifiedWho,
        }),
      );
    } catch (error) {
      console.log('error in changing cache directory', error);
    }
  }
};
