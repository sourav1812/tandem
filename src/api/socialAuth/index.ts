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
  try {
    const response = await post({
      path: API.AUTH + `${type}`,
      data: {
        name,
        email,
        profilePicture,
        token,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
