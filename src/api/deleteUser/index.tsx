import {deleteApi} from '@tandem/api';
import {API} from '@tandem/constants/api';
import logout from '@tandem/functions/logout';

export const deleteUser = async () => {
  try {
    await deleteApi({
      path: API.USER_PROFILE,
      data: {},
      onSuccess: () => {
        logout({api: false});
      },
    });
  } catch (error) {
    throw error;
  }
};
