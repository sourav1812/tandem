import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import Book from './interface';
import {addNewBook} from '@tandem/redux/slices/bookShelf.slice';
import {store} from '@tandem/redux/store';

const getStories = async () => {
  const response = await get<Book>({
    path: API.STORIES + `/${store.getState().createChild.currentChild.childId}`,
    noLoader: true,
  });
  if (!response) {
    return;
  }
  // storing the book in redux
  store.dispatch(addNewBook(response)); // ! note api should only send the book if story has been genearted by the child
  return response;
};

export default getStories;
