import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateChildProfile} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {getChildStats} from '../childAnalytics';

export const addNewChild = async (
  {name, dob, gender, avatar}: CreateChildProfile,
  onSuccess?: () => void,
) => {
  try {
    const response = await post<{childId: string}>({
      path: API.CREATE_CHILD_PROFILE,
      data: {
        name,
        dob,
        gender,
        avatar,
      },
      onSuccess: () => {
        navigateTo(SCREEN_NAME.ACCOUNT);
        if (onSuccess) {
          onSuccess();
        }
      },
    });
    await getChildStats();
    return response;
  } catch (error) {
    throw error;
  }
};
