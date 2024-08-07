import {post} from '@tandem/api';
import {LoginUserWithEmail} from './interface';
import {API, STATUS_CODE} from '@tandem/constants/api';
import loginFlow from '@tandem/functions/loginFlow';
import {LoginResponse} from '@tandem/functions/loginFlow/interface';
import fcm from '@tandem/functions/fcm';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {getOtp} from '../verifyEmail';

export default async ({email, password}: LoginUserWithEmail) => {
  try {
    const {deviceId, deviceType, fcmToken} = await fcm();
    const response = await post<LoginResponse>({
      path: API.LOGIN_USER_WITH_EMAIL,
      data: {
        email: email.toLowerCase(),
        password,
        deviceId,
        deviceType,
        fcmToken,
      },
    });
    await loginFlow(response); // for every type of login we have to come to this function in the end
  } catch (error: any) {
    const status = +error.message.split(STATUS_CODE)[1];
    if (status === 403) {
      // ! if error is forbidden that would mean : email not verfied
      // ! We would want to take user to email verification screen
      // ! only purpose of email verification screen is to send otp and verify it
      // ! after verification login the user
      // ! so after signup user will be automatically redirected to email verify
      // ! after email verification call login again

      // ? if code is 403 check here
      await getOtp(email.toLowerCase());
      navigateTo(SCREEN_NAME.VERIFY_EMAIL, {
        email: email.toLowerCase(),
        password,
      });
      return;
    }

    throw error;
  }
};
