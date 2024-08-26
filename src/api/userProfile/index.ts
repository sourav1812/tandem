import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import {saveUserData} from '@tandem/redux/slices/userData.slice';
import {store} from '@tandem/redux/store';
import {UserDataResponse} from './interface';
import {
  saveAdultData,
  saveChildData,
} from '@tandem/redux/slices/createChild.slice';
import {PEOPLE} from '@tandem/constants/enums';

export default async () => {
  const response = await get<UserDataResponse>({
    path: API.USER_PROFILE,
    noLoader: false,
  });
  if (!response) {
    return;
  }
  const children = response.children?.map(child => ({
    ...child,
    type: PEOPLE.CHILD,
    permissions:
      Array.isArray(child.permissions) && child.permissions.length > 0
        ? child?.permissions[0]
        : {},
  }));

  const adults = response.adults?.map(adult => ({
    ...adult,
    type: PEOPLE.ADULT,
  }));
  const userData = store.getState().userData.userDataObject;
  store.dispatch(saveUserData({...userData, ...response, children, adults}));
  store.dispatch(saveChildData(children));
  store.dispatch(saveAdultData(adults));

  return response;
};
