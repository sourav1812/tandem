import {post} from '@tandem/api';
import {API} from '@tandem/constants/api';
import {GenerateStoryData} from './interface';

export default async ({childId, storyPromptData}: GenerateStoryData) => {
  const response = await post({
    path: API.GENERATE_STORY,
    data: {
      childId,
      storyPromptData,
    },
  });
  console.log('generate story data', response);
  if (!response) {
    return;
  }
  return response;
};
