import {addToken} from '@tandem/redux/slices/tokens.slice';
import {store} from '@tandem/redux/store';

export const storeTokens = (token: string, refreshToken: string) => {
  try {
    console.log('storetoken function', {token, refreshToken});
    store.dispatch(addToken({token, refreshToken}));
  } catch (error) {
    throw new Error('Error storing tokens');
  }
};

export const getStoredTokens = () => {
  try {
    return store.getState().tokenReducer;
  } catch (error) {
    throw new Error('Error getting stored tokens');
  }
};
