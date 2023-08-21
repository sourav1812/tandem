import {TERMS_ACCEPTED} from '@tandem/constants/LocalConstants';
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

const logout = async () => {
  try {
    store.dispatch(startLoader());
    store.dispatch(removeToken);
    store.dispatch(logoutFromRedux());
    store.dispatch(clearAlertData());
    removeKey(TERMS_ACCEPTED);
    store.dispatch(changeMode(MODE.A));
    navigateTo(SCREEN_NAME.SOCIAL_SIGN_IN, {}, true);
  } catch (error) {
    console.log('error in logout');
  } finally {
    store.dispatch(stopLoader());
  }
};

export default logout;
