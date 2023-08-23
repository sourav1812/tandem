import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import logout from '@tandem/functions/logout';

export default async () => {
  const response = await post({
    path: API.LOGOUT,
    data: {},
  });
  if (!response) {
    return;
  }
  logout();
  return response;
};
