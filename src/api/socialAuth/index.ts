import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {SocialLoginAuth} from './interface';

export const socialLogin = async ({
  name,
  email,
  profilePicture,
  token,
  type,
}: SocialLoginAuth) => {
  const response = await post({
    path: API.AUTH + `${type}`,
    data: {
      name,
      email,
      profilePicture,
      token,
    },
  });
  console.log(response, 'social login');
  if (!response) {
    return;
  }
  return response;
};
