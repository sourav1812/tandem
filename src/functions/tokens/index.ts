import {USER} from '@tandem/constants/enums';
import {addToken} from '@tandem/redux/slices/tokens.slice';
import {store} from '@tandem/redux/store';

export const storeTokens = (token: string, refreshToken: string) => {
  try {
    store.dispatch(
      addToken({[USER.TOKEN]: token, [USER.REFRESH_TOKEN]: refreshToken}),
    );
  } catch (error) {
    throw new Error('Error storing tokens');
  }
};

export const getStoredTokens = () => {
  try {
    const {token, refreshToken} = store.getState().tokenReducer;
    return {token, refreshToken};
  } catch (error) {
    throw new Error('Error getting stored tokens');
  }
};
