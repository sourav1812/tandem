import {API} from '@tandem/constants/api';
import {post} from '@tandem/api/index';

const rateStory = async (bookId: string, rating: number) => {
  const response = await post({
    path: API.RATE_STORY + `/${bookId}`,
    data: {rating},
  });
  console.log({StoryRate: response});
  return response;
};

export default rateStory;
