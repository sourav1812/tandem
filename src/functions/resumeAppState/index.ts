import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {getStoredTokens} from '../tokens';
// import {getValueFromKey} from '@tandem/helpers/encryptedStorage';
// import {TERMS_ACCEPTED} from '@tandem/constants/local';
import userProfile from '@tandem/api/userProfile';
import {cacheAvatars, cachePlaces} from '../cache';

export default async () => {
  const {token, refreshToken} = getStoredTokens();
  // const termsAccepted = getValueFromKey(TERMS_ACCEPTED);

  cacheAvatars();
  cachePlaces();

  setTimeout(() => {
    if (!token && !refreshToken) {
      navigateTo(SCREEN_NAME.SELECT_LANGUAGE, {}, true);
      return;
    } else {
      userProfile();
    }
    // if (!termsAccepted) {
    //   navigateTo(SCREEN_NAME.TERMS_AND_CONDITIONS, {}, true);
    //   return;
    // }
    navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
  }, 2000);
};
