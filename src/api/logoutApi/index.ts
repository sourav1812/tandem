import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export default async () => {
  try {
    await post({
      path: API.LOGOUT,
      data: {},
    });
  } catch (error: any) {
    console.log('error in logging out', error.message);
  }
};
