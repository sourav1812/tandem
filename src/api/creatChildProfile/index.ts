import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateChildProfile} from './interface';

export const addNewChild = async ({
  name,
  dob,
  gender,
  avatar,
}: CreateChildProfile) => {
  const response = await post<{childId: string}>({
    path: API.CREATE_CHILD_PROFILE,
    data: {
      name,
      dob,
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
