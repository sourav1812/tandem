import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import StoryResponse from './interface';
const getStories = async () => {
  const response = await get<StoryResponse>({
    path: API.STORIES,
    noLoader: true,
    allowRequestAnyway: false,
  });
  console.log('story data', response.story);
  if (!response) {
    return;
  }
  return response;
};

export default getStories;
