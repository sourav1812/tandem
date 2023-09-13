import {createSlice} from '@reduxjs/toolkit';
import {AVATAR_ARRAY, PLACE} from '@tandem/constants/local';

interface CacheState {
  avatars: {path: string; file: string; isPickerImg: boolean}[];
  isAvatarArrayFull: boolean;
  places: {name: string; file: string}[];
  isPlaceArrayFull: boolean;
}

const initialState: CacheState = {
  avatars: [
    // {
    //   file: 'data:image/png;base64,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',
    //   path: '',
    //   isPickerImg: true,
    // },
  ],
  isAvatarArrayFull: false,
  places: [],
  isPlaceArrayFull: false,
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
    replaceFirstElement: (state, action) => {
      state.avatars.shift();
      state.avatars.unshift(action.payload);
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
    clearCacheForce: state => {
      state.avatars = [];
      state.places = [];
      state.isAvatarArrayFull = false;
      state.isPlaceArrayFull = false;
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
} = cacheSlice.actions;

export default cacheSlice.reducer;
