import {patch} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateChildProfile} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {store} from '@tandem/redux/store';

export const editUserProfile = async ({name}: CreateChildProfile) => {
  const notification = store.getState().language.notification;
  const response = await patch({
    path: API.USER_PROFILE,
    data: {
      name,
      notification,
    },
    onSuccess: () => {
      navigateTo(SCREEN_NAME.BOTTOM_TAB);
    },
  });

  if (!response) {
    return;
  }
  return response;
};
