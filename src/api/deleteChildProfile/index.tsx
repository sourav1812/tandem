import {deleteApi} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {DeleteChildProfileApiProp} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import userProfile from '../userProfile';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

export const deleteChildProfile = async ({
  childId,
}: DeleteChildProfileApiProp) => {
  try {
    await deleteApi({
      path: API.CREATE_CHILD_PROFILE + `/${childId}`,
      data: {},
      onSuccess: async () => {
        await userProfile();
        navigateTo(SCREEN_NAME.ACCOUNT);
      },
    });
  } catch (error) {
    throw error;
  }
};
