import {post} from '@tandem/api';
import {RegisterUser} from './interface';
import {API} from '@tandem/constants/api';

export default async ({email, name, password}: RegisterUser) => {
  await post({
    path: API.REGISTER_USER,
    data: {email, name, password},
  });
};
