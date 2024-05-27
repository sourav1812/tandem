import {API} from '@tandem/constants/api';
import {get} from '@tandem/api/index';
import Book from './interface';
import {setImagesForBook} from '@tandem/redux/slices/bookShelf.slice';
import {store} from '@tandem/redux/store';
import RNFetchBlob from 'rn-fetch-blob';
import {addFlush} from '@tandem/redux/slices/cache.slice';

const getStories = async (page: number) => {
  try {
    // logic with pagination
    const response = await get<{endReached: boolean; books: Book[]}>({
      path:
        API.STORIES + `/${store.getState().createChild.currentChild.childId}`,
      noLoader: true,
      params: {page},
    });
    console.log('books with page: ', page, response);
    cacheStoryBookImages(response.books);
    return response;
  } catch (error) {
    throw error;
  }
};

export default getStories;

export const cacheStoryBookImages = (books: Book[]) => {
  let dirs = RNFetchBlob.fs.dirs;

  books.forEach(async book => {
    const cacheBookRef = store.getState().bookShelf.images[book._id];
    if (
      Array.isArray(cacheBookRef) &&
      cacheBookRef.length === book.storyInfo[0].pages.length + 1 // ! making sure if all images are downloaded along with the thumbnail
    ) {
      return;
    }
    const imagePages = await Promise.all(
      book.images.map(async obj => {
        const res = await RNFetchBlob.config({
          fileCache: true,
          path:
            dirs.DocumentDir + '/storybooks' + book._id + obj.page + 'cache',
        }).fetch('GET', obj.img_url, {});
        const pathLocal = res.path();
        store.dispatch(addFlush(pathLocal));
        return 'file://' + pathLocal;
      }),
    );
    store.dispatch(setImagesForBook({bookId: book._id, images: imagePages}));
  });
};
