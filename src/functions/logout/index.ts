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
    console.log(flush);
    flush.forEach(item => {
      try {
        RNFetchBlob.fs.unlink(item);
      } catch (error) {
        console.log('#####', error);
      }
    });
    store.dispatch(startLoader());
    if (api) {
      console.log('logoutapidone');
      await logoutApi();
    }
  } catch (error) {}
  store.dispatch(removeToken);
  store.dispatch(logoutFromRedux());
  store.dispatch(clearAlertData());
  store.dispatch(clearCacheForce());
  // removeKey(TERMS_ACCEPTED);
  firebase.messaging().deleteToken();
  store.dispatch(changeMode(MODE.A));
  navigateTo(SCREEN_NAME.SOCIAL_SIGN_IN, {}, true);
  store.dispatch(stopLoader());
};

export default logout;
