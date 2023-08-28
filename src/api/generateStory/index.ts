import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {GenerateStoryData} from './interface';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';

export default async ({childId, storyPromptData}: GenerateStoryData) => {
  const response = await post({
    path: API.GENERATE_STORY + `/:${childId}`,
    data: {
      storyPromptData,
    },
    onSuccess: () => {
      navigateTo(SCREEN_NAME.CONGRATULATION);
    },
  });
  console.log('generate story data', response);
  if (!response) {
    return;
  }
  return response;
};
