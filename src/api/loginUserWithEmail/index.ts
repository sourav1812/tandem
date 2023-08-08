import {post} from '@tandem/api';
import {LoginUserWithEmail} from './interface';
import {API} from '@tandem/constants/api';
import loginFlow from '@tandem/functions/loginFlow';
import {LoginResponse} from '@tandem/functions/loginFlow/interface';

export default async ({email, password}: LoginUserWithEmail) => {
  const response = await post<LoginResponse>({
    path: API.LOGIN_USER_WITH_EMAIL,
    data: {email, password},
  });
  if (!response) {
    return;
  }
  await loginFlow(response); // for every type of login we have to come to this function in the end
};
