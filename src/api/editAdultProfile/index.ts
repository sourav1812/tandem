import {patch} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateAdultProfile} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

export const editAdultProfile = async ({
  role,
  dob,
  avatar,
  adultId,
}: CreateAdultProfile) => {
  const response = await patch({
    path: API.ADD_BIG_PEOPLE + `/profile/${adultId}`,
    data: {
      role,
      dob,
      avatar,
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
