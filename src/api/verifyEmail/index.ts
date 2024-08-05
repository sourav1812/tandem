import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import loginUserWithEmail from '../loginUserWithEmail';

export const getOtp = async (email: string) => {
  try {
    await post({
      path: API.SEND_OTP_VERIFY_EMAIL,
      data: {email},
      onSuccess: () => {},
    });
  } catch (error) {
    throw error;
  }
};

export const confirmOtp = async (
  otp: string,
  email: string,
  password: string,
) => {
  try {
    const response = await post({
      path: API.VERIFY_EMAIL,
      data: {otp, email},
      onSuccess: async () => {
        await loginUserWithEmail({email, password});
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
