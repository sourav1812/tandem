import {
  AVATAR_ARRAY,
  CACHE_DIR,
  ILLUSTRATION,
  PLACE,
  WHAT_HAPPENS,
  WHO,
} from '@tandem/constants/local';
import {storeKey} from '@tandem/helpers/encryptedStorage';
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

export const cacheAvatars = async (
  file?: string | null,
  path?: string | null,
) => {
  if (!file && !path) {
    store.dispatch(clearAvatars());

    // Map AVATAR_ARRAY to create an array of promises
    const promises = AVATAR_ARRAY.map(async (url, index) => {
      try {
        console.log('caching avatars: ', url, '\n');

        const response = await RNFetchBlob.config({
          fileCache: true,
          path: `${dirs.DocumentDir}/avatar${index}cache`, // Ensure proper file path formatting
        }).fetch('GET', url, {});

        const pathLocal = response.path();

        // Dispatch actions to store the cached avatar data
        store.dispatch(addFlush(pathLocal));
        store.dispatch(
          addAvatarFile({
            file: `file://${pathLocal}`, // Prefix with "file://"
            path: url,
          }),
        );
      } catch (error) {
        console.error(`Failed to cache avatar: ${url}`, error);
        // Handle specific failures here, like dispatching an error action or logging
      }
    });

    // Wait for all avatar fetches to complete
    await Promise.all(promises);
  } else {
    if (!path) {
      return;
    }

    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
        path: `${dirs.DocumentDir}/avatarsocialimagecache`, // Ensure proper file path formatting
      }).fetch('GET', path, {});

      const pathLocal = response.path();

      // Dispatch actions to replace the first avatar
      store.dispatch(addFlush(pathLocal));
      store.dispatch(
        replaceFirstElement({
          file: `file://${pathLocal}`, // Prefix with "file://"
          path: path,
        }),
      );
    } catch (error) {
      console.error(`Failed to cache social avatar: ${path}`, error);
      // Handle specific failures here, like dispatching an error action or logging
    }
  }
};

export const cachePlaces = async () => {
  console.log('cache places func');
  store.dispatch(clearPlaces()); // Clear places before caching new ones

  // Map over PLACE to create an array of promises
  const promises = PLACE.map(async (obj, index) => {
    try {
      console.log('Caching places: ', obj.url, '\n');

      const response = await RNFetchBlob.config({
        fileCache: true,
        path: `${dirs.DocumentDir}/places${index}cache`, // Ensure proper file path formatting
      }).fetch('GET', obj.url, {});

      const pathLocal = response.path();

      // Dispatch actions to store the cached place
      store.dispatch(addFlush(pathLocal));
      store.dispatch(
        addPlaceFile({
          file: `file://${pathLocal}`, // Prefix with "file://"
          name: obj.name,
        }),
      );
    } catch (error) {
      console.error(`Failed to cache place: ${obj.name}`, error);
      // Handle specific failures here, like dispatching an error action or logging
    }
  });

  await Promise.all(promises); // Wait for all fetches to complete
  console.log('All places have been cached.');
};

export const cacheWho = async () => {
  console.log('cache who func');

  // Clear the existing WHO cache
  store.dispatch(clearWho());

  // Map WHO to create an array of promises
  const promises = WHO.map(async (obj, index) => {
    try {
      console.log('caching who: ', obj.url, '\n');

      const response = await RNFetchBlob.config({
        fileCache: true,
        path: `${dirs.DocumentDir}/who${index}cache`, // Ensure proper file path formatting
      }).fetch('GET', obj.url, {});

      const pathLocal = response.path();

      // Dispatch actions to store the cached WHO data
      store.dispatch(addFlush(pathLocal));
      store.dispatch(
        addWhoFile({
          file: `file://${pathLocal}`, // Prefix with "file://"
          name: obj.name,
        }),
      );
    } catch (error) {
      console.error(`Failed to cache WHO data: ${obj.name}`, error);
      // Handle specific failures here, like dispatching an error action or logging
    }
  });

  // Wait for all fetches to complete
  await Promise.all(promises);
  console.log('All WHO data has been cached.');
};

export const cacheWhatHappens = async () => {
  console.log('cache whatHappens func');

  // Clear existing WhatHappens cache
  store.dispatch(clearWhatHappens());

  // Map WHAT_HAPPENS to create an array of promises
  const promises = WHAT_HAPPENS.map(async (obj, index) => {
    try {
      console.log('caching what happens: ', obj.url, '\n');

      const response = await RNFetchBlob.config({
        fileCache: true,
        path: `${dirs.DocumentDir}/whatHappens${index}cache`, // Ensure proper file path formatting
      }).fetch('GET', obj.url, {});

      const pathLocal = response.path();

      // Dispatch actions to store the cached data
      store.dispatch(addFlush(pathLocal));
      store.dispatch(
        addWhatHappensFile({
          file: `file://${pathLocal}`, // Prefix with "file://"
          name: obj.name,
        }),
      );
    } catch (error) {
      console.error(`Failed to cache what happens: ${obj.name}`, error);
      // Handle specific failures here, like dispatching an error action or logging
    }
  });

  // Wait for all fetches to complete
  await Promise.all(promises);
  console.log('All What Happens data has been cached.');
};

export const cacheStoryStyles = async () => {
  console.log('cacheStoryStyles func');

  // Clear existing StoryStyles cache
  store.dispatch(clearStoryStyles());

  // Map ILLUSTRATION to create an array of promises
  const promises = ILLUSTRATION.map(async (obj, index) => {
    try {
      console.log('caching StoryStyles: ', obj.url, '\n');

      const response = await RNFetchBlob.config({
        fileCache: true,
        path: `${dirs.DocumentDir}/storyStyles${index}cache`, // Ensure proper file path formatting
      }).fetch('GET', obj.url, {});

      const pathLocal = response.path();

      // Dispatch actions to store the cached data
      store.dispatch(addFlush(pathLocal));
      store.dispatch(
        addStoryStylesFile({
          file: `file://${pathLocal}`, // Prefix with "file://"
          name: obj.name,
        }),
      );
    } catch (error) {
      console.error(`Failed to cache StoryStyles: ${obj.name}`, error);
      // Handle specific failures here, like dispatching an error action or logging
    }
  });

  // Wait for all fetches to complete
  await Promise.all(promises);
  console.log('All StoryStyles have been cached.');
};

export const reCache = async () => {
  const flush = store.getState().cache.flush;

  const unlinkPromises = flush.map(async (item: string) => {
    try {
      await RNFetchBlob.fs.unlink(item);
    } catch (error) {
      console.error('Error while unlinking images in reCache:', error);
    }
  });
  console.log('############ STARTING RECACHE');
  // Wait for all unlink operations to complete
  await Promise.all(unlinkPromises);
  await cacheAvatars();
  await cachePlaces();
  await cacheWho();
  await cacheWhatHappens();
  await cacheStoryStyles();
  storeKey(CACHE_DIR, RNFetchBlob.fs.dirs.DocumentDir);
  console.log('############ FINISHING RECACHE');
};
