import {startLoader} from '@tandem/redux/slices/activityIndicator.slice';
import {clearAlertData} from '@tandem/redux/slices/alertBox.slice';
import {logoutFromRedux} from '@tandem/redux/slices/languageReducer';
import {removeToken} from '@tandem/redux/slices/tokens.slice';
import {store} from '@tandem/redux/store';

const logout = async () => {
  try {
    store.dispatch(startLoader());
    store.dispatch(removeToken);
    store.dispatch(logoutFromRedux());
    store.dispatch(clearAlertData());
  } catch (error) {
    console.log('error in logout');
  }
};

export default logout;
