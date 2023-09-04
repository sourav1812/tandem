import {patch} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateChildProfile} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

export const editUserProfile = async ({name}: CreateChildProfile) => {
  const response = await patch({
    path: API.USER_PROFILE,
    data: {
      name,
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
