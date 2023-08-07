import {USER} from '@tandem/constants/enums';
import {storeKey, getValueFromKey} from '@tandem/helpers/encryptedStorage';

export const storeTokens = (token: string, refreshToken: string) => {
  try {
    storeKey(USER.TOKEN, token);
    storeKey(USER.REFRESH_TOKEN, refreshToken);
  } catch (error) {
    throw new Error('Error storing tokens');
  }
};

export const getStoredTokens = () => {
  try {
    const token = getValueFromKey(USER.TOKEN);
    const refreshToken = getValueFromKey(USER.REFRESH_TOKEN);
    return {token, refreshToken};
  } catch (error) {
    throw new Error('Error getting stored tokens');
  }
};
