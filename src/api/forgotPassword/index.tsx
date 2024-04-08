import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export const getOtp = async (email: string) => {
  try {
    await post({
      path: API.SEND_OTP_RESET_PASSWORD,
      data: {email},
      onSuccess: () => {},
    });
  } catch (error) {
    throw error;
  }
};

export const confirmOtp = async (otp: string, email: string) => {
  try {
    const response = await post<{resetToken: string}>({
      path: API.CONFIRM_OTP_RESET_PASSWORD,
      data: {otp, email},
      onSuccess: () => {},
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async ({
  newPassword,
  resetToken,
  onSuccess,
}: {
  newPassword: string;
  resetToken: string;
  onSuccess: () => void;
}) => {
  try {
    console.log({resetToken});
    await post({
      path: API.RESET_PASSWORD,
      data: {newPassword, resetToken},
      onSuccess,
    });
  } catch (error) {
    throw error;
  }
};
