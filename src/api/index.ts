import {BASE_URL} from '@tandem/constants/api';
import axios from 'axios';
import Api from './interface';
import {getStoredTokens, storeTokens} from '@tandem/functions/tokens';
import {USER} from '@tandem/constants/enums';
import {removeKey} from '@tandem/helpers/encryptedStorage';
import {
  startLoader,
  stopLoader,
} from '@tandem/redux/slices/activityIndicator.slice';
import {store} from '@tandem/redux/store';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

//Add the JWT token in the Authorization header
axiosInstance.interceptors.request.use(
  async config => {
    const {token} = getStoredTokens();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

//Create a queue to hold pending requests
const requestQueue: ((token: any) => void)[] = [];

//Variable to track if token refresh is in progress
let isRefreshing = false;

// axiosInstance interceptor for handling token refresh
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if response status is 401 (Unauthorized)
    if (error?.response?.status === 401) {
      console.log('Refreshing Token ', requestQueue.length);

      // Check if token refresh is already in progress
      if (!isRefreshing) {
        isRefreshing = true;

        // Make the token refresh request
        try {
          const tokens = getStoredTokens();
          if (!tokens.refreshToken) {
            // logout();
            return Promise.reject(error);
          }
          const response = await axios.post(BASE_URL + USER.REFRESH_TOKEN, {
            refreshToken: tokens.refreshToken,
          });
          const {token, refreshToken} = response.data;
          console.log('new refresh token', refreshToken);
          // Update the tokens in your storage or context
          // Replace 'token' and 'refreshToken' with your actual token values
          // Resolve all the pending requests in the queue with the new tokens
          storeTokens(token, refreshToken);
          requestQueue.forEach(resolve => resolve(token));

          // Clear the queue
          requestQueue.length = 0;

          // Set isRefreshing to false since token refresh is complete
          isRefreshing = false;

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return await axiosInstance(originalRequest);
        } catch (error_1) {
          console.log('error in refresh token logic : ', error_1);
          // Toast.show({
          //   type: 'error',
          //   text1: 'Your Session is expired. Please login to continue',
          // });
          removeKey(USER.REFRESH_TOKEN);
          removeKey(USER.TOKEN);

          // Handle token refresh error if necessary
          // You might want to log the user out or redirect to a login page
          throw error_1;
        }
      } else {
        // Token refresh is already in progress, so add the request to the queue
        return new Promise(resolve => {
          console.log('In Refresh token loop', originalRequest.url);
          requestQueue.push(token => {
            // Retry the original request with the new access token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }
    }

    //     // Return any other errors as-is
    return Promise.reject(error);
  },
);

const get = async <T>(
  path: string,
  params?: any,
  noLoader: boolean = false,
  allowRequestAnyway: boolean = false,
): Promise<T> => {
  //   let persistedState = store.getState().getResponseReducer[path];
  //   const {isConnected} = await NetInfo.fetch();

  // if (!isConnected) {
  //   if (!persistedState) {
  //     throw new Error('No internet connection');
  //   }
  //   return persistedState;
  // }

  type ApiResponse = Api & T;
  if (!noLoader) {
    store.dispatch(startLoader());
  }
  // store.dispatch(addParams(params));
  try {
    if (!allowRequestAnyway) {
      store.dispatch(stopLoader());

      const {token, refreshToken} = getStoredTokens();
      if (!token && !refreshToken)
        throw new Error('Your Session has expired. Please login to continue');

      throw new Error('Get request cannot be fulfilled as User Not Verified');
    }

    const response = await axiosInstance.get<ApiResponse>(path);
    if (!noLoader) {
      store.dispatch(stopLoader());
    }
    // if (!response?.data?.status) {
    //   persistedState = store.getState().getResponseReducer[path];
    //   if (!persistedState) {
    //     throw new Error(response?.data?.message);
    //   }
    //   return persistedState;
    // } else {
    //   store.dispatch(addGetResponse({path, response: response?.data}));
    return response?.data;
  } catch (error: any) {
    // persistedState = store.getState().getResponseReducer[path];

    if (!noLoader) {
      store.dispatch(stopLoader());
    }
    //     if (!persistedState) {
    //       throw new Error(error.message);
    //     }
    //     return persistedState;
    //   }
    throw new Error(error.message);
  }
};
const post = async <T>(path: string, data: any): Promise<Api & T> => {
  //   const {isConnected} = await NetInfo.fetch();
  //   if (!isConnected) {
  //     throw new Error(dontShowMessages ? '' : 'No Internet connection');
  //   }
  type ApiResponse = Api & T;
  store.dispatch(startLoader());

  try {
    const response = await axios.post<ApiResponse>(BASE_URL + path, data);

    if (!response?.data?.status) {
      store.dispatch(stopLoader());

      throw new Error(response?.data?.message);
    } else {
      store.dispatch(stopLoader());

      return response?.data;
    }
  } catch (error: any) {
    store.dispatch(stopLoader());

    throw new Error(error.message);
  }
};
const put = async <T>(path: string, data: any): Promise<Api & T> => {
  //   const {isConnected} = await NetInfo.fetch();
  //   if (!isConnected) {
  //     throw new Error('No Internet connection');
  //   }
  type ApiResponse = Api & T;
  store.dispatch(startLoader());

  try {
    const response = await axiosInstance.put<ApiResponse>(path, data);

    if (!response?.data?.status) {
      store.dispatch(stopLoader());
      throw new Error(response?.data?.message);
    } else {
      store.dispatch(stopLoader());

      return response?.data;
    }
  } catch (error: any) {
    store.dispatch(stopLoader());

    throw new Error(error.message);
  }
};

export {get, post, put};
