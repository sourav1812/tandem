import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export default async () => {
  const response = await post({
    path: API.LOGOUT,
    data: {},
  });
  if (!response) {
    return;
  }
  return response;
};
