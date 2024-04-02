import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import Book from './interface';
import {cacheStoryBookImages} from '../getStories';

const getPublicStories = async (page: number) => {
  try {
    const response = await get<{endReached: boolean; books: Book[]}>({
      path: API.PUBLIC_STORIES,
      noLoader: true,
      params: {page},
    });
    console.log('public books with page: ', page, response);
    cacheStoryBookImages(response.books);
    return response;
  } catch (error) {
    throw error;
  }
};

export default getPublicStories;
