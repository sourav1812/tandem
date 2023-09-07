import {deleteApi} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {DeleteAdultProfileApiProp} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import userProfile from '../userProfile';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

export const deleteAdultProfile = async ({
  adultId,
}: DeleteAdultProfileApiProp) => {
  try {
    await deleteApi({
      path: API.ADD_BIG_PEOPLE + `/${adultId}`,
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
