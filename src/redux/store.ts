import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import modeSlice from './slices/mode.slice';
import deviceTypeSlice from './slices/tablet.slice';
import orientationSlice from './slices/orientation.slice';
import activityIndicatorSlice from './slices/activityIndicator.slice';
import paramsReducer from './slices/paramsReducer';
import {MMKV} from 'react-native-mmkv';
import {persistReducer, Storage} from 'redux-persist';
import getResponseReducer from './slices/getResponseReducer';
import languageReducer from './slices/languageReducer';
import tokensSlice from './slices/tokens.slice';
import alertBoxSlice from './slices/alertBox.slice';
import storyGeneration from './slices/storyGeneration.slice';
import createChildSlice from './slices/createChild.slice';
import bookShelf from './slices/bookShelf.slice';
import setUserData from './slices/userData.slice';
import cache from './slices/cache.slice';
import setPermissions from './slices/permissions.slice';
import tooltipSlice from './slices/tooltip.slice';
import snapshotReducer from './slices/animationSnapshots.slice';
import storyLevelSlice from './slices/storyLevel.slice';
import recordingButtonSlice from './slices/recordingButton.slice';

export const storage = new MMKV();

export const appReducer = combineReducers({
  mode: modeSlice,
  deviceType: deviceTypeSlice,
  orientation: orientationSlice,
  activityIndicator: activityIndicatorSlice,
  params: paramsReducer,
  getResponseReducer: getResponseReducer,
  language: languageReducer,
  tokenReducer: tokensSlice,
  alertBoxReducer: alertBoxSlice,
  createChild: createChildSlice,
  userData: setUserData,
  permissions: setPermissions,
  storyGeneration,
  bookShelf,
  cache,
  tooltipReducer: tooltipSlice,
  snapshotReducer,
  storyLevel: storyLevelSlice,
  recording: recordingButtonSlice,
});

export const reduxStorage: Storage = {
  setItem: (key: string, value: string | number | boolean | Uint8Array) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

export const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'language/logoutFromRedux') {
    reduxStorage.removeItem('persist:root');
    storage.clearAll();
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
