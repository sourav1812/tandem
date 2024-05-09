import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {GenerateStoryData} from './interface';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import NetInfo from '@react-native-community/netinfo';
import {pushToPendingStoryGeneration} from '@tandem/redux/slices/cache.slice';
import {store} from '@tandem/redux/store';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
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
      path: API.GENERATE_STORY + `/${childId}`,
      data: {...storyPromptData},
      onSuccess: () => {
        navigateTo(SCREEN_NAME.MATCHING_PAIRS);
      },
    });
  } catch (error) {
    throw error;
  }
};

export const hitStoryGenApiStandalone = async ({
  childId,
  storyPromptData,
}: GenerateStoryData) => {
  try {
    await post({
      path: API.GENERATE_STORY + `/${childId}`,
      data: {
        ...storyPromptData,
      },
    });
  } catch (error) {
    throw error;
  }
};
