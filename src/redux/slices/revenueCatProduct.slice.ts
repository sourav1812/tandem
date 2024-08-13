import {createSlice} from '@reduxjs/toolkit';
import {PurchasesStoreProduct} from 'react-native-purchases';

interface RecordingStates {
  products: PurchasesStoreProduct[];
}

const initialState: RecordingStates = {
  products: [],
};

const revenueCat = createSlice({
  name: 'Revenue',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log('setProducts', action.payload);

      state.products = action.payload;
    },
  },
});

export const {setProducts} = revenueCat.actions;
export default revenueCat.reducer;
