import {MODE} from '@tandem/constants/mode';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {
  startLoader,
  stopLoader,
} from '@tandem/redux/slices/activityIndicator.slice';
import {clearAlertData} from '@tandem/redux/slices/alertBox.slice';
import {logoutFromRedux} from '@tandem/redux/slices/languageReducer';
import {changeMode} from '@tandem/redux/slices/mode.slice';
import {removeToken} from '@tandem/redux/slices/tokens.slice';
import {store} from '@tandem/redux/store';
import logoutApi from '@tandem/api/logoutApi';
import {firebase} from '@react-native-firebase/messaging';
import {clearCacheForce} from '@tandem/redux/slices/cache.slice';
import RNFetchBlob from 'rn-fetch-blob';

const logout = async ({api = true}: {api?: boolean}) => {
  try {
    const flush = store.getState().cache.flush;

    // Map over flush items to create an array of unlink promises
    const unlinkPromises = flush.map(async item => {
      try {
        await RNFetchBlob.fs.unlink(item);
      } catch (error) {
        console.error('Error while unlinking images in logout:', error);
        // You might want to decide if you need to continue unlinking or handle this error differently
      }
    });

    // Start loader before unlink operations
    store.dispatch(startLoader());

    // Wait for all unlink operations to complete
    await Promise.all(unlinkPromises);

    // Optional API call if the `api` parameter is true
    if (api) {
      console.log('logoutapidone');
      await logoutApi();
    }
  } catch (error) {
    console.error('Error in processing flush:', error);
    // Optionally handle the error, such as dispatching a failure action or logging additional information
  }
  store.dispatch(removeToken());
  store.dispatch(logoutFromRedux());
  store.dispatch(clearAlertData());
  store.dispatch(clearCacheForce());
  firebase.messaging().deleteToken();
  store.dispatch(changeMode(MODE.A));
  navigateTo(SCREEN_NAME.SOCIAL_SIGN_IN, {}, true);
  store.dispatch(stopLoader());
};

export default logout;
