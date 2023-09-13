import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {ConsentFormProps} from './interface';
import logout from '@tandem/functions/logout';

export const consentForm = async ({
  currentPassword,
  newPassword,
  logoutFromAllDevices = false,
}: ConsentFormProps) => {
  try {
    await post({
      path: API.AGREEMENT,
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
