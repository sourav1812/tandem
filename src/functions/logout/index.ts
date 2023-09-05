import {TERMS_ACCEPTED} from '@tandem/constants/localConstants';
import {MODE} from '@tandem/constants/mode';
import {removeKey} from '@tandem/helpers/encryptedStorage';
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

const logout = async ({api = true}: {api?: boolean}) => {
  try {
    store.dispatch(startLoader());
    if (api) {
      await logoutApi();
    }
  } catch (error) {}
  store.dispatch(removeToken);
  store.dispatch(logoutFromRedux());
  store.dispatch(clearAlertData());
  removeKey(TERMS_ACCEPTED);
  firebase.messaging().deleteToken();
  store.dispatch(changeMode(MODE.A));
  navigateTo(SCREEN_NAME.SOCIAL_SIGN_IN, {}, true);
  store.dispatch(stopLoader());
};

export default logout;
