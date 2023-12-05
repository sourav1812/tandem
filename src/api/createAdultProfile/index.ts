import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateAdultProfile} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

export const addNewAdult = async (
  {role, dob, avatar}: CreateAdultProfile,
  onSuccess?: () => void,
) => {
  try {
    const response = await post<{profileId: string}>({
      path: API.ADD_BIG_PEOPLE,
      data: {
        role,
        dob,
        avatar,
      },
      onSuccess: () => {
        navigateTo(SCREEN_NAME.ACCOUNT);
        if (onSuccess) {
          onSuccess();
        }
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
