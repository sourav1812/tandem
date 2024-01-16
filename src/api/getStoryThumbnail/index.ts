import {API} from '@tandem/constants/api';
import {get} from '@tandem/api';
import RNFetchBlob from 'rn-fetch-blob';
import {addFlush} from '@tandem/redux/slices/cache.slice';
import {store} from '@tandem/redux/store';
import {setThumbnailForBook} from '@tandem/redux/slices/bookShelf.slice';

export default async (bookId: string) => {
  //{BOOK_ID_HERE}
  try {
    const response = await get<{thumbnail: string}>({
      path: API.GET_STORY_THUMBNAILS.replace('{BOOK_ID_HERE}', bookId),
      noLoader: true,
    });
    console.log('response from get thumbnails is ', response.thumbnail);
    // ! cache it
    await cacheThumbnail(bookId, response.thumbnail);
  } catch (error) {
    throw error;
  }
};

export const cacheThumbnail = async (bookId: string, thumbnail: string) => {
  try {
    let dirs = RNFetchBlob.fs.dirs;
    const res = await RNFetchBlob.config({
      fileCache: true,
      path: dirs.DocumentDir + '/storybooks' + bookId + 'thumbnail' + 'cache',
    }).fetch('GET', thumbnail, {});
    const pathLocal = res.path();
    store.dispatch(addFlush(pathLocal));
    const image = 'file://' + pathLocal;
    store.dispatch(setThumbnailForBook({url: thumbnail, image}));
  } catch (error) {
    console.log(
      'error in caching thumbnail for this book id: ' + bookId + '\n',
      error,
    );
  }
};
