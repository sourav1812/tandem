import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import {store} from '@tandem/redux/store';
import {cacheStoryBookImages} from '../getStories';
import Book from '../getStories/interface';

const getArchivedStories = async (page: number) => {
  try {
    const response = await get<{endReached: boolean; books: Book[]}>({
      path:
        API.ARCHIVED_STORIES +
        `/${store.getState().createChild.currentChild.childId}`,
      noLoader: true,
      params: {page},
    });
    console.log('archived books with page: ', page, response.books.length);
    cacheStoryBookImages(response.books);
    return response;
  } catch (error) {
    throw error;
  }
};

export default getArchivedStories;
