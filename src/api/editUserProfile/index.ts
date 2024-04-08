import {patch} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateChildProfile} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {store} from '@tandem/redux/store';
import userProfile from '../userProfile';

export const editUserProfile = async ({
  firstName,
  lastName,
}: CreateChildProfile) => {
  const allowNotifications =
    store.getState().userData.userDataObject.allowNotifications;
  const response = await patch({
    path: API.USER_PROFILE,
    data: {
      firstName,
      lastName,
      allowNotifications,
    },
    onSuccess: () => {
      userProfile();
      navigateTo(SCREEN_NAME.BOTTOM_TAB);
    },
  });

  if (!response) {
    return;
  }
  return response;
};
