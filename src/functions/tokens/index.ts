import {addToken} from '@tandem/redux/slices/tokens.slice';
import {store} from '@tandem/redux/store';

export const storeTokens = (token: string, refreshToken: string) => {
  try {
    store.dispatch(addToken({token, refreshToken}));
  } catch (error) {
    throw new Error('Error storing tokens');
  }
};

export const getStoredTokens = () => {
  return store.getState().tokenReducer;
};
