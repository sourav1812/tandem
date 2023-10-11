import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';

export default async (bookId: string) => {
  try {
    const response = await get<{images: string[]}>({
      path: API.GET_STORY_ILLUSTRATIONS + '/' + bookId,
      noLoader: true,
    });
    return response?.images;
  } catch (error) {
    throw error;
  }
};
