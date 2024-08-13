import userProfile from '@tandem/api/userProfile';
import {REVENUE_CAT_KEYS} from '@tandem/constants/api';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {setProducts} from '@tandem/redux/slices/revenueCatProduct.slice';
import {store} from '@tandem/redux/store';
import {Platform} from 'react-native';
import Purchases, {
  LOG_LEVEL,
  PurchasesStoreProduct,
} from 'react-native-purchases';

export const initialiseRevenueCat = async (appUserID: string) => {
  Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
  if (Platform.OS === 'ios') {
    Purchases.configure({
      apiKey: REVENUE_CAT_KEYS.ios,
      appUserID,
    });
  } else if (Platform.OS === 'android') {
    Purchases.configure({
      apiKey: REVENUE_CAT_KEYS.android,
      appUserID,
    });
  }
  await getRevenueCatProducts();
};

export const getRevenueCatProducts = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      console.log('@@@@@@@', JSON.stringify(offerings));
      // Display current offering with offerings.current
      const products = offerings.current.availablePackages.map(
        item => item.product,
      );
      store.dispatch(setProducts(products));
      return products;
    }
  } catch (e) {
    console.log('error in offering list,', e);
  }
};

export const makePurchase = async (product: PurchasesStoreProduct) => {
  try {
    await Purchases.purchaseStoreProduct(product);
    await userProfile();

    navigateTo(SCREEN_NAME.HOME);
  } catch (e: any) {
    if (!e.userCancelled) {
      console.log(e);
    }
  }
};
