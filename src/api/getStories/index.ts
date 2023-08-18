import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import Book from './interface';
import {addNewBook} from '@tandem/redux/slices/bookShelf.slice';
import {store} from '@tandem/redux/store';

const getStories = async () => {
  const response = await get<Book>({
    path: API.STORIES,
    noLoader: true,
    allowRequestAnyway: false,
  });

  if (!response) {
    return;
  }
  // storing the book in redux
  store.dispatch(addNewBook(response));
  return response;
};

export default getStories;
