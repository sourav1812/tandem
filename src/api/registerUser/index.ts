import {post} from '@tandem/api';
import {RegisterUser} from './interface';
import {API} from '@tandem/constants/api';
// import loginUserWithEmail from '../loginUserWithEmail';

export default async ({email, firstName, lastName, password}: RegisterUser) => {
  try {
    const result = await post({
      path: API.REGISTER_USER,
      data: {email, firstName, lastName, password},
      // onSuccess: async () => {
      //   await loginUserWithEmail({
      //     email: email,
      //     password: password,
      //   });
      // },
    });
    return result;
  } catch (error) {
    throw error;
  }
};
