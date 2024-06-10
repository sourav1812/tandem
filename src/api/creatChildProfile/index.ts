import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {CreateChildProfile} from './interface';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {getChildStats} from '../childAnalytics';
import userProfile from '../userProfile';
import pushChildStats from '@tandem/functions/pushChildStats';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import {store} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';

export const addNewChild = async (
  {name, dob, gender, avatar}: CreateChildProfile,
  onSuccess?: () => void,
) => {
  try {
    const response = await post<{childId: string}>({
      path: API.CREATE_CHILD_PROFILE,
      data: {
        name,
        dob,
        gender,
        avatar,
      },
    });
    await userProfile();
    pushChildStats();
    getChildStats();

    store.dispatch(
      addAlertData({
        type: 'Message',
        message: translation('CHILD_ADDED_SUCCESS'),
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          navigateTo(SCREEN_NAME.ACCOUNT);
        },
      }),
    );

    return response;
  } catch (error) {
    throw error;
  }
};
