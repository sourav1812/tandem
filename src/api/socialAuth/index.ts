import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {SocialLoginAuth} from './interface';
import fcm from '@tandem/functions/fcm';
import loginFlow from '@tandem/functions/loginFlow';
import {LoginResponse} from '@tandem/functions/loginFlow/interface';

export const socialLogin = async ({
  name,
  email,
  profilePicture,
  token,
  type,
}: SocialLoginAuth) => {
  try {
    const {deviceId, deviceType, fcmToken} = await fcm();
    const response = await post<LoginResponse>({
      path: API.AUTH + `/${type}`,
      data: {
        name,
        email,
        profilePicture,
        token,
        deviceId,
        deviceType,
        fcmToken,
      },
    });
    await loginFlow(response);
  } catch (error) {
    throw error;
  }
};
