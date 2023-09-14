import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {ConsentFormProps} from './interface';
import {store} from '@tandem/redux/store';
import {saveUserData} from '@tandem/redux/slices/userData.slice';

export const consentFormApi = async ({data}: ConsentFormProps) => {
  try {
    await post({
      path: API.AGREEMENT,
      data: data,
    });
    store.dispatch(
      saveUserData({
        ...store.getState().userData.userDataObject,
        termsAndConditions: true,
      }),
    );
  } catch (error) {
    throw error;
  }
};
