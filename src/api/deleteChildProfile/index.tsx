import {deleteApi} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {deleteChildProfileApiProp} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import userProfile from '../userProfile';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

export const deleteChildProfile = async ({
  childId,
}: deleteChildProfileApiProp) => {
  try {
    await deleteApi({
      path: API.CREATE_CHILD_PROFILE + `/${childId}`,
      data: {},
      onSuccess: () => {
        navigateTo(SCREEN_NAME.ACCOUNT);
      },
    });
    userProfile();
  } catch (error) {
    throw error;
  }
};
