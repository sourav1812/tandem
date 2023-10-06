import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import Book from './interface';
import {addBooks} from '@tandem/redux/slices/bookShelf.slice';
import {store} from '@tandem/redux/store';

const getStories = async () => {
  try {
    const response = await get<Book>({
      path:
        API.STORIES + `/${store.getState().createChild.currentChild.childId}`,
      noLoader: true,
    });
    store.dispatch(addBooks(response));
  } catch (error) {
    throw error;
  }
};

export default getStories;
