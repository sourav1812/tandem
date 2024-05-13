import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';

export default async (data: {name: string; email: string; message: string}) => {
  try {
    console.log(data);
    await post({
      path: API.CONTACT_US,
      data,
    });
  } catch (error) {
    throw error;
  }
};
