import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import {saveUserData} from '@tandem/redux/slices/userData.slice';
import {store} from '@tandem/redux/store';
import {userDataResponse} from './interface';
import {
  saveAdultData,
  saveChildData,
} from '@tandem/redux/slices/createChild.slice';
import {PEOPLE} from '@tandem/constants/enums';

export default async () => {
  const response = await get<userDataResponse>({
    path: API.USER_PROFILE,
    noLoader: false,
  });
  if (!response) {
    return;
  }
  const children = response.children.map(child => ({
    ...child,
    type: PEOPLE.CHILD,
  }));
  const bigPeople = response.adults.map(adult => ({
    ...adult,
    type: PEOPLE.ADULT,
  }));
  // ! we will have to decide where we should keep children
  store.dispatch(saveUserData({...response, children}));
  store.dispatch(saveChildData(children));
  store.dispatch(saveAdultData(bigPeople));
  // storing the book in redux
  // ! note api should only send the book if story has been genearted by the child
  return response;
};
