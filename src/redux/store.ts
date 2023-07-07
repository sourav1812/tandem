import {configureStore} from '@reduxjs/toolkit';
import modeSlice from './slices/mode.slice';

export const store = configureStore({
  reducer: {
    mode: modeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
