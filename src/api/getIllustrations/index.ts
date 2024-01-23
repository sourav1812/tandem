import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';

export default async (bookId: string) => {
  try {
    console.log('yayyaydfda');
    const response = await get<{
      images: {
        img_url: string;
        page: number;
      }[];
    }>({
      path: API.GET_STORY_ILLUSTRATIONS + '/' + bookId,
      noLoader: true,
    });
    console.log('gyguygug', response);
    return response?.images;
  } catch (error) {
    console.log('in catch error', error);
    throw error;
  }
};
