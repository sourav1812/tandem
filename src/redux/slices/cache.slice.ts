import {createSlice} from '@reduxjs/toolkit';
import {AVATAR_ARRAY, PLACE, WHO, WHAT_HAPPENS} from '@tandem/constants/local';

interface AvatarObject {
  name: string;
  file: string;
}

interface CacheState {
  avatars: {path: string; file: string; isPickerImg: boolean}[];
  isAvatarArrayFull: boolean;
  places: AvatarObject[];
  isPlaceArrayFull: boolean;
  who: AvatarObject[];
  isWhoArrayFull: boolean;
  whatHappens: AvatarObject[];
  isWhatHappensArrayFull: boolean;
  flush: string[];
}

const initialState: CacheState = {
  avatars: [],
  isAvatarArrayFull: false,
  places: [],
  isPlaceArrayFull: false,
  who: [],
  isWhoArrayFull: false,
  whatHappens: [],
  isWhatHappensArrayFull: false,
  flush: [],
};

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    addAvatarFile: (state, action) => {
      if (state.avatars.length < AVATAR_ARRAY.length + 1) {
        state.avatars.push(action.payload);
      } else {
        state.isAvatarArrayFull = true;
      }
      if (state.avatars.length === AVATAR_ARRAY.length + 1) {
        state.isAvatarArrayFull = true;
      }
    },
    addFlush: (state, action) => {
      state.flush.push(action.payload);
    },

    replaceFirstElement: (state, action) => {
      state.avatars.shift();
      state.avatars.unshift(action.payload);
    },
    reinitialiseCacheDirectory: (state, action) => {
      const {
        modifiedAvatars,
        modifiedFlush,
        modifiedPlaces,
        modifiedWho,
        modifiedWhatHappens,
      } = action.payload;
      console.log({didChange: modifiedAvatars[0].file});
      state.avatars = modifiedAvatars;
      state.flush = modifiedFlush;
      state.places = modifiedPlaces;
      state.who = modifiedWho;
      state.whatHappens = modifiedWhatHappens;
    },
    clearAvatars: state => {
      if (
        state.avatars.length < AVATAR_ARRAY.length + 1 &&
        state.isAvatarArrayFull
      ) {
        state.avatars = [];
      }
    },
    addPlaceFile: (state, action) => {
      if (state.places.length < PLACE.length) {
        state.places.push(action.payload);
      } else {
        state.isPlaceArrayFull = true;
      }
      if (state.places.length === PLACE.length) {
        state.isPlaceArrayFull = true;
      }
    },
    clearPlaces: state => {
      if (state.places.length < PLACE.length && state.isPlaceArrayFull) {
        state.places = [];
      }
    },
    addWhoFile: (state, action) => {
      if (state.who.length < WHO.length) {
        state.who.push(action.payload);
      } else {
        state.isWhoArrayFull = true;
      }
      if (state.who.length === WHO.length) {
        state.isWhoArrayFull = true;
      }
    },
    clearWho: state => {
      if (state.who.length < WHO.length && state.isWhoArrayFull) {
        state.who = [];
      }
    },
    addWhatHappensFile: (state, action) => {
      if (state.whatHappens.length < WHAT_HAPPENS.length) {
        state.whatHappens.push(action.payload);
      } else {
        state.isWhatHappensArrayFull = true;
      }
      if (state.whatHappens.length === WHAT_HAPPENS.length) {
        state.isWhatHappensArrayFull = true;
      }
    },
    clearWhatHappens: state => {
      if (
        state.whatHappens.length < WHAT_HAPPENS.length &&
        state.isWhatHappensArrayFull
      ) {
        state.whatHappens = [];
      }
    },
    clearCacheForce: state => {
      state.avatars = [];
      state.places = [];
      state.flush = [];
      state.who = [];
      state.whatHappens = [];
      state.isAvatarArrayFull = false;
      state.isPlaceArrayFull = false;
      state.isWhoArrayFull = false;
      state.isWhatHappensArrayFull = false;
    },
  },
});

export const {
  addAvatarFile,
  clearAvatars,
  addPlaceFile,
  clearPlaces,
  clearCacheForce,
  replaceFirstElement,
  addFlush,
  reinitialiseCacheDirectory,
  clearWho,
  addWhoFile,
  addWhatHappensFile,
  clearWhatHappens,
} = cacheSlice.actions;

export default cacheSlice.reducer;
