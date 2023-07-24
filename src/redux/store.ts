import {configureStore} from '@reduxjs/toolkit';
import modeSlice from './slices/mode.slice';
import deviceTypeSlice from './slices/tablet.slice';

export const store = configureStore({
  reducer: {
    mode: modeSlice,
    deviceType: deviceTypeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
