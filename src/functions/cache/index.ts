import {AVATAR_ARRAY, CACHE_SESSION, PLACE} from '@tandem/constants/local';
import {
  addAvatarFile,
  addPlaceFile,
  clearAvatars,
  clearPlaces,
} from '@tandem/redux/slices/cache.slice';
import {store} from '@tandem/redux/store';
import RNFetchBlob from 'rn-fetch-blob';

export const cacheAvatars = () => {
  console.log('cache avatar func');
  store.dispatch(clearAvatars());
  const isAvatarArrayFull = store.getState().cache.isAvatarArrayFull;
  if (isAvatarArrayFull) {
    console.log('cacheing avatars array is maxed out');
    return;
  }
  AVATAR_ARRAY.forEach(url => {
    console.log('cacheing avatars: ', url, '\n');
    RNFetchBlob.config({fileCache: true})
      .fetch('GET', url, {})
      .then(res => {
        RNFetchBlob.session(CACHE_SESSION).add(res.path());
        store.dispatch(
          addAvatarFile({file: 'file://' + res.path(), path: url}),
        );
      });
  });
};
export const cachePlaces = () => {
  console.log('cache places func');
  store.dispatch(clearPlaces());
  const isPlaceArrayFull = store.getState().cache.isPlaceArrayFull;
  if (isPlaceArrayFull) {
    console.log('cacheing places array is maxed out');
    return;
  }
  PLACE.forEach(obj => {
    console.log('cacheing places: ', obj.url, '\n');
    RNFetchBlob.config({fileCache: true})
      .fetch('GET', obj.url, {})
      .then(res => {
        RNFetchBlob.session(CACHE_SESSION).add(res.path());
        store.dispatch(
          addPlaceFile({file: 'file://' + res.path(), name: obj.name}),
        );
      });
  });
};
