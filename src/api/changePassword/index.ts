import {put} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {ChangePasswordApiProps} from './interface';
import logout from '@tandem/functions/logout';

export const changePassword = async ({
  currentPassword,
  newPassword,
  logoutFromAllDevices = false,
}: ChangePasswordApiProps) => {
  try {
    await put({
      path: API.CHANGE_PASSWORD,
      data: {
        currentPassword,
        newPassword,
        logout: logoutFromAllDevices,
      },
      onSuccess: () => {
        logout({api: false});
      },
    });
  } catch (error) {
    throw error;
  }
};
