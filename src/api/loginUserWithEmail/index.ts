import {post} from '@tandem/api';
import {LoginUserWithEmail} from './interface';
import {API} from '@tandem/constants/api';
import loginFlow from '@tandem/functions/loginFlow';
import {LoginResponse} from '@tandem/functions/loginFlow/interface';
import fcm from '@tandem/functions/fcm';

export default async ({email, password}: LoginUserWithEmail) => {
  try {
    const {deviceId, deviceType, fcmToken} = await fcm();
    const response = await post<LoginResponse>({
      path: API.LOGIN_USER_WITH_EMAIL,
      data: {email, password, deviceId, deviceType, fcmToken},
    });
    await loginFlow(response); // for every type of login we have to come to this function in the end
  } catch (error) {
    throw error;
  }
};
