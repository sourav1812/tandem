import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export default async (data: {[key: number]: boolean}) => {
  try {
    await post({
      path: API.CONSENT,
      data,
    });
  } catch (error: any) {
    throw error;
  }
};
