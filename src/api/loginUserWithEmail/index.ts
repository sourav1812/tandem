import {post} from '@tandem/api';
import {LoginUserWithEmail} from './interface';
import {API} from '@tandem/constants/api';
import loginFlow from '@tandem/functions/loginFlow';
import {LoginResponse} from '@tandem/functions/loginFlow/interface';

export default async ({
  email,
  password,
  deviceId,
  deviceType,
  fcmToken,
}: LoginUserWithEmail) => {
  console.log({email, password, deviceId, deviceType, fcmToken});
  const response = await post<LoginResponse>({
    path: API.LOGIN_USER_WITH_EMAIL,
    data: {email, password, deviceId, deviceType, fcmToken},
  });
  if (!response) {
    throw new Error('issue with login');
  }
  await loginFlow(response); // for every type of login we have to come to this function in the end
  return response;
};
