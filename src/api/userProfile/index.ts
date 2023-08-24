import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import {saveUserData} from '@tandem/redux/slices/userData.slice';
import {store} from '@tandem/redux/store';
import {userDataResponse} from './interface';

export default async () => {
  const response = await get<userDataResponse>({
    path: API.USER_PROFILE,
    noLoader: false,
    allowRequestAnyway: false,
  });
  if (!response) {
    return;
  }
  store.dispatch(
    saveUserData({
      ...response,
      children: response.children.map(child => ({
        ...child,
        type: 'child',
      })),
    }),
  );
  // storing the book in redux
  // ! note api should only send the book if story has been genearted by the child
  return response;
};
