import {post} from '@tandem/api';
import {RegisterUser} from './interface';
import {API} from '@tandem/constants/api';

export default async ({
  email,
  name,
  password,
  deviceId,
  deviceType,
  fcmToken,
}: RegisterUser) => {
  const result = await post({
    path: API.REGISTER_USER,
    data: {email, name, password, deviceId, deviceType, fcmToken},
  });
  return result;
};
