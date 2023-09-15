import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {getStoredTokens} from '../tokens';
import userProfile from '@tandem/api/userProfile';
import {store} from '@tandem/redux/store';

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
  }, 2000);
};
