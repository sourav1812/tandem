import {post} from '@tandem/api';
import {API, ENVIRONMENT, SELECTED_ENVIRONMENT} from '@tandem/constants/api';
import {GenerateStoryData} from './interface';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import NetInfo from '@react-native-community/netinfo';
import {pushToPendingStoryGeneration} from '@tandem/redux/slices/cache.slice';
import {store} from '@tandem/redux/store';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import notifee from '@notifee/react-native';
import {NOTIFICATION_PROMPTS} from '@tandem/constants/local';
import {translation} from '@tandem/utils/methods';
import selfAnalytics from '../selfAnalytics';
import {UsersAnalyticsEvents} from '../selfAnalytics/interface';

//@ts-ignore
const testing =
  SELECTED_ENVIRONMENT === ENVIRONMENT.TESTING ||
  SELECTED_ENVIRONMENT === ENVIRONMENT.LOCAL;

export default async ({childId, storyPromptData}: GenerateStoryData) => {
  try {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected || !netInfo.isInternetReachable) {
      // logic to save story data locally to sync later
      const pendingRequest = {
        childId,
        storyPromptData,
      };
      store.dispatch(pushToPendingStoryGeneration(pendingRequest));
      store.dispatch(
        addAlertData({
          type: 'Message',
          message:
            'Currently network is unreachable.\nWe will save your response and try again later',
          onSuccess: () => {
            navigateTo(SCREEN_NAME.HOME);
          },
        }),
      );
      return;
    }
    await post({
      path: API.GENERATE_STORY + `/${childId}?testing=${testing}`,
      data: {...storyPromptData},
    });
    selfAnalytics({
      eventType: UsersAnalyticsEvents.BOOK_REQUESTED,
      details: {
        mode: store.getState().mode,
        childId: childId,
        storyPromptData,
      },
    });
    store.dispatch(
      addAlertData({
        type: 'GREAT_WORK',
        successText: translation('NEXT'),
        message: translation('WELL_DONE_GREAT_IDEAS'),
        onSuccess: () => {
          notifee.cancelNotification(NOTIFICATION_PROMPTS[0].id); // ! removing trigger 1
          navigateTo(SCREEN_NAME.ROBOT_BUILDING_BOOK);
        },
      }),
    );
  } catch (error) {
    navigateTo(SCREEN_NAME.HOME);
    throw error;
  }
};

export const hitStoryGenApiStandalone = async ({
  childId,
  storyPromptData,
}: GenerateStoryData) => {
  try {
    await post({
      path: API.GENERATE_STORY + `/${childId}?testing=${testing}`,
      data: {
        ...storyPromptData,
      },
    });
    selfAnalytics({
      eventType: UsersAnalyticsEvents.BOOK_REQUESTED,
      details: {
        mode: store.getState().mode,
        childId: childId,
        storyPromptData,
        NOTE: 'This request was made later when internet connection was available',
      },
    });
  } catch (error) {
    throw error;
  }
};
