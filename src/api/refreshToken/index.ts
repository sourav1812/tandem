import {BASE_URL, API} from '@tandem/constants/api';
import logout from '@tandem/functions/logout';
import {getStoredTokens, storeTokens} from '@tandem/functions/tokens';
import axios from 'axios';

export default async () => {
  const {refreshToken} = getStoredTokens();
  if (!refreshToken) {
    await logout({api: false});
    throw new Error('No refreshToken found');
  }
  const response = await axios.post(BASE_URL + API.REFRESH_TOKEN, {
    refreshToken,
  });
  const {accessToken, refreshToken: newRefreshToken} = response.data;
  storeTokens(accessToken, newRefreshToken);
  return {accessToken};
};
