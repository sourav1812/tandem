import {REVENUE_CAT_KEYS} from '@tandem/constants/api';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {Platform} from 'react-native';
import Purchases, {
  LOG_LEVEL,
  PRODUCT_CATEGORY,
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

    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null) {
        console.log('@@@@@@@', JSON.stringify(offerings));
        // Display current offering with offerings.current
        const productSKUs = offerings.current.availablePackages.map(
          item => item.product.identifier,
        );
        storeKey('productSKUs', productSKUs);
      }
    } catch (e) {
      console.log('error in offering list,', e);
    }
  }
};

export const getRevenueCatProducts = async () => {
  const productSKUs = getValueFromKey('productSKUs');
  const products = await Purchases.getProducts(
    productSKUs,
    PRODUCT_CATEGORY.NON_SUBSCRIPTION,
  );
  return products;
};

export const makePurchase = async (product: PurchasesStoreProduct) => {
  try {
    await Purchases.purchaseStoreProduct(product);
  } catch (e: any) {
    if (!e.userCancelled) {
      console.log(e);
    }
  }
};
