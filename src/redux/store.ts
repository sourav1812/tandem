import {configureStore} from '@reduxjs/toolkit';
import modeSlice from './slices/mode.slice';
import deviceTypeSlice from './slices/tablet.slice';
import orientationSlice from './slices/orientation.slice';

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    deviceType: deviceTypeSlice,
    orientation: orientationSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
