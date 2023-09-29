import {createSlice} from '@reduxjs/toolkit';
import {SkImage} from '@shopify/react-native-skia';

// Define a type for the slice state

interface Snapshots {
  snapShot1: SkImage | null;
  snapShot2: SkImage | null;
}

// Define the initial state using that type
const initialState: Snapshots = {
  snapShot1: null,
  snapShot2: null,
};

export const snapshotReducer = createSlice({
  name: 'snapshot',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addSnapShot1: (state, action) => {
      state.snapShot1 = action.payload;
    },
    addSnapShot2: (state, action) => {
      state.snapShot2 = action.payload;
    },
  },
});

export const {addSnapShot1, addSnapShot2} = snapshotReducer.actions;

export default snapshotReducer.reducer;
