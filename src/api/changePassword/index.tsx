import {put} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {ChangePasswordApiProps} from './interface';
import logout from '@tandem/functions/logout';

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordApiProps) => {
  const response = await put({
    path: API.CHANGE_PASSWORD,
    data: {
      currentPassword,
      newPassword,
    },
    onSuccess: () => {
      logout({api: false});
    },
  });
  if (!response) {
    return;
  }
  return response;
};
