import {patch} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateChildProfile} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

export const editChildProfile = async ({
  name,
  dob,
  avatar,
  childId,
}: CreateChildProfile) => {
  console.log(name, dob, avatar, 'CREATE_CHILD_PROFILE');
  const response = await patch({
    path: API.CREATE_CHILD_PROFILE + `/${childId}`,
    data: {
      name,
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
