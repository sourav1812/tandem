import {
  AVATAR_ARRAY,
  ILLUSTRATION,
  PLACE,
  WHAT_HAPPENS,
  WHO,
} from '@tandem/constants/local';
import {
  addAvatarFile,
  addPlaceFile,
  replaceFirstElement,
  clearAvatars,
  clearPlaces,
  addFlush,
  clearWho,
  addWhoFile,
  clearWhatHappens,
  addWhatHappensFile,
  clearStoryStyles,
  addStoryStylesFile,
} from '@tandem/redux/slices/cache.slice';

import {store} from '@tandem/redux/store';
import RNFetchBlob from 'rn-fetch-blob';

let dirs = RNFetchBlob.fs.dirs;

export const cacheAvatars = (file?: string | null, path?: string | null) => {
  if (!file && !path) {
    store.dispatch(clearAvatars());
    const isAvatarArrayFull = store.getState().cache.isAvatarArrayFull;
    if (isAvatarArrayFull) {
      console.log('cacheing avatars array is maxed out');
      return;
    }
    AVATAR_ARRAY.forEach((url, index) => {
      console.log('cacheing avatars: ', url, '\n');
      RNFetchBlob.config({
        fileCache: true,
        path: dirs.DocumentDir + '/avatar' + index.toString() + 'cache',
      })
        .fetch('GET', url, {})
        .then(res => {
          const pathLocal = res.path();
          store.dispatch(addFlush(pathLocal));
          store.dispatch(
            addAvatarFile({
              file: 'file://' + pathLocal,
              path: url,
            }),
          );
        });
    });
  } else {
    if (!path) {
      return;
    }
    RNFetchBlob.config({
      fileCache: true,
      path: dirs.DocumentDir + '/avatarsocialimagecache',
    })
      .fetch('GET', path, {})
      .then(res => {
        const pathLocal = res.path();
        store.dispatch(addFlush(pathLocal));
        store.dispatch(
          replaceFirstElement({
            file: 'file://' + pathLocal,
            path: path,
          }),
        );
      });
  }
};

export const cachePlaces = () => {
  console.log('cache places func');
  store.dispatch(clearPlaces());
  const isPlaceArrayFull = store.getState().cache.isPlaceArrayFull;
  if (isPlaceArrayFull) {
    console.log('cacheing places array is maxed out');
    return;
  }
  PLACE.forEach((obj, index) => {
    console.log('cacheing places: ', obj.url, '\n');
    RNFetchBlob.config({
      fileCache: true,
      path: dirs.DocumentDir + '/places' + index.toString() + 'cache',
    })
      .fetch('GET', obj.url, {})
      .then(res => {
        const pathLocal = res.path();
        store.dispatch(addFlush(pathLocal));
        store.dispatch(
          addPlaceFile({
            file: 'file://' + pathLocal,
            name: obj.name,
          }),
        );
      });
  });
};

export const cacheWho = () => {
  console.log('cache who func');
  store.dispatch(clearWho());
  const isWhoArrayFull = store.getState().cache.isWhoArrayFull;
  if (isWhoArrayFull) {
    console.log('cacheing who array is maxed out');
    return;
  }
  WHO.forEach((obj, index) => {
    console.log('cacheing who: ', obj.url, '\n');
    RNFetchBlob.config({
      fileCache: true,
      path: dirs.DocumentDir + '/who' + index.toString() + 'cache',
    })
      .fetch('GET', obj.url, {})
      .then(res => {
        const pathLocal = res.path();
        store.dispatch(addFlush(pathLocal));
        store.dispatch(
          addWhoFile({
            file: 'file://' + pathLocal,
            name: obj.name,
          }),
        );
      });
  });
};

export const cacheWhatHappens = () => {
  console.log('cache whatHappens func');
  store.dispatch(clearWhatHappens());
  const isWhatHappensArrayFull = store.getState().cache.isWhatHappensArrayFull;
  if (isWhatHappensArrayFull) {
    console.log('cacheing what happens array is maxed out');
    return;
  }
  WHAT_HAPPENS.forEach((obj, index) => {
    console.log('cacheing what happens: ', obj.url, '\n');
    RNFetchBlob.config({
      fileCache: true,
      path: dirs.DocumentDir + '/whatHappens' + index.toString() + 'cache',
    })
      .fetch('GET', obj.url, {})
      .then(res => {
        const pathLocal = res.path();
        store.dispatch(addFlush(pathLocal));
        store.dispatch(
          addWhatHappensFile({
            file: 'file://' + pathLocal,
            name: obj.name,
          }),
        );
      });
  });
};

export const cacheStoryStyles = () => {
  console.log('cacheStoryStyles func');
  store.dispatch(clearStoryStyles());
  const isStoryStylesArrayFull = store.getState().cache.isStoryStylesArrayFull;
  if (isStoryStylesArrayFull) {
    console.log('cacheing what happens array is maxed out');
    return;
  }
  ILLUSTRATION.forEach((obj, index) => {
    console.log('caching StoryStyles: ', obj.url, '\n');
    RNFetchBlob.config({
      fileCache: true,
      path: dirs.DocumentDir + '/storyStyles' + index.toString() + 'cache',
    })
      .fetch('GET', obj.url, {})
      .then(res => {
        const pathLocal = res.path();
        store.dispatch(addFlush(pathLocal));
        store.dispatch(
          addStoryStylesFile({
            file: 'file://' + pathLocal,
            name: obj.name,
          }),
        );
      });
  });
};

export const reCache = () => {
  const flush = store.getState().cache.flush;

  flush.forEach(item => {
    try {
      RNFetchBlob.fs.unlink(item);
    } catch (error) {
      console.log('#####', error);
    }
  });

  cacheAvatars();
  cachePlaces();
  cacheWho();
  cacheWhatHappens();
  cacheStoryStyles();
};
