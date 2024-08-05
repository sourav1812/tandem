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
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import consentNewsletter from '../consentNewsletter';

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
  }));
  const adults = response.adults?.map(adult => ({
    ...adult,
    type: PEOPLE.ADULT,
  }));
  const userData = store.getState().userData.userDataObject;
  // ! we will have to decide where we should keep children
  store.dispatch(saveUserData({...userData, ...response, children, adults}));
  store.dispatch(saveChildData(children));
  store.dispatch(saveAdultData(adults));
  // storing the book in redux
  // ! note api should only send the book if story has been genearted by the child

  if (response?.receivePromotinalMails === undefined) {
    // ! if not subbed to newsletter ever.... ask user
    setTimeout(() => {
      store.dispatch(
        addAlertData({
          type: 'Message',
          message: 'Subcribe to Tandem Newsletter?',
          onSuccess: () => consentNewsletter(true),
          onDestructive: () => consentNewsletter(false),
        }),
      );
    }, 2000);
  }
  return response;
};
