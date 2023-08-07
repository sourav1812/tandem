import {USER} from '@tandem/constants/enums';
import {removeKey} from '@tandem/helpers/encryptedStorage';

import {
  logoutFromRedux,
  startLoader,
} from '@tandem/redux/slices/activityIndicator.slice';
import {store} from '@tandem/redux/store';

const logout = async () => {
  try {
    store.dispatch(startLoader());
    removeKey(USER.REFRESH_TOKEN);
    removeKey(USER.TOKEN);

    store.dispatch(logoutFromRedux());
  } catch (error) {
    console.log('error in logout');
  }
};

export default logout;
