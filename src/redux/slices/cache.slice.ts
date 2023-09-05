import {createSlice} from '@reduxjs/toolkit';
import {AVATAR_ARRAY, PLACE} from '@tandem/constants/localConstants';

interface CacheState {
  avatars: {path: string; file: string}[];
  isAvatarArrayFull: boolean;
  places: {name: string; file: string}[];
  isPlaceArrayFull: boolean;
}

const initialState: CacheState = {
  avatars: [],
  isAvatarArrayFull: false,
  places: [],
  isPlaceArrayFull: false,
};

export const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    addAvatarFile: (state, action) => {
      if (state.avatars.length < AVATAR_ARRAY.length) {
        state.avatars.push(action.payload);
      } else {
        state.isAvatarArrayFull = true;
      }
      if (state.avatars.length === AVATAR_ARRAY.length) {
        state.isAvatarArrayFull = true;
      }
    },
    clearAvatars: state => {
      if (
        state.avatars.length < AVATAR_ARRAY.length &&
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
} = cacheSlice.actions;

export default cacheSlice.reducer;
