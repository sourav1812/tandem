import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateChildProfile} from './interface';

export const addNewChild = async ({
  name,
  age,
  gender,
  avatar,
}: CreateChildProfile) => {
  const response = await post({
    path: API.CREATE_CHILD_PROFILE,
    data: {
      name,
      age,
      gender,
      avatar,
    },
  });
  console.log(response, 'addNewChildaddNewChild');
  if (!response) {
    return;
  }
  return response;
};
