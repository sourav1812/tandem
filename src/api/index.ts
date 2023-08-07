import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {getStoredTokens, storeTokens} from '@tandem/functions/tokens';
import Api from './interface';
import {
  startLoader,
  stopLoader,
} from '@tandem/redux/slices/activityIndicator.slice';
import {store} from '@tandem/redux/store';
import {BASE_URL} from '@tandem/constants/api';
import {addParams, clearParams} from '@tandem/redux/slices/paramsReducer';
import logout from '@tandem/functions/logout';
import {addGetResponse} from '@tandem/redux/slices/getResponseReducer';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add the JWT token in the Authorization header
axiosInstance.interceptors.request.use(
  async config => {
    const {token} = getStoredTokens();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.params = store.getState().params.object;
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

const handleTokenRefresh = async (error: {
  config: any;
  response: {status: number};
}) => {
  const originalRequest = error.config;

  // Check if response status is 401 (Unauthorized)
  if (error?.response?.status === 401) {
    const {refreshToken} = getStoredTokens();

    // Check if token refresh is already in progress
    if (!isRefreshing) {
      isRefreshing = true;

      // Make the token refresh request
      try {
        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }

        const response = await axios.post(BASE_URL + 'refresh token endpoint', {
          refreshToken,
        });
        const {token, refreshToken: newRefreshToken} = response.data;
        console.log('new refresh token', newRefreshToken);
        // Update the tokens in your storage or context
        // Replace 'token' and 'refreshToken' with your actual token values
        // Resolve all the pending requests in the queue with the new tokens
        storeTokens(token, newRefreshToken);
        requestQueue.forEach(resolve => resolve(token));

        // Clear the queue
        requestQueue.length = 0;

        // Set isRefreshing to false since token refresh is complete
        isRefreshing = false;

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return await axiosInstance(originalRequest);
      } catch (error1) {
        console.log('error in refresh token logic:', error1);
        logout();
        // Handle token refresh error if necessary
        // You might want to log the user out or redirect to a login page
        throw error1;
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
  return Promise.reject(error);
};

// axiosInstance interceptor for handling token refresh
axiosInstance.interceptors.response.use(undefined, handleTokenRefresh);

const get = async <T>({
  path,
  params,
  noLoader = false,
  allowRequestAnyway = false,
}: {
  path: string;
  params?: any;
  noLoader: boolean;
  allowRequestAnyway: boolean;
}): Promise<T> => {
  let persistedState = store.getState().getResponseReducer[path];
  const {isConnected} = await NetInfo.fetch();

  if (!isConnected) {
    if (!persistedState) {
      throw new Error('No internet connection');
    }
    return persistedState;
  }

  type ApiResponse = Api & T;
  if (!noLoader) {
    store.dispatch(startLoader());
  }
  store.dispatch(addParams(params));
  try {
    if (!allowRequestAnyway) {
      store.dispatch(stopLoader());
      const {token, refreshToken} = getStoredTokens();
      if (!token && !refreshToken) {
        throw new Error('Your Session has expired. Please login to continue');
      }
    }

    const response = await axiosInstance.get<ApiResponse>(path);
    if (!noLoader) {
      store.dispatch(stopLoader());
    }
    if (!response?.data?.status) {
      persistedState = store.getState().getResponseReducer[path];
      if (!persistedState) {
        throw new Error(response?.data?.message);
      }
      return persistedState;
    } else {
      store.dispatch(addGetResponse({path, response: response?.data}));
    }
    return response?.data;
  } catch (error: any) {
    persistedState = store.getState().getResponseReducer[path];

    if (!noLoader) {
      store.dispatch(stopLoader());
    }
    if (!persistedState) {
      throw new Error(error.message);
    }
    return persistedState;
  }
};

const post = async <T>({
  path,
  data,
}: {
  path: string;
  data: any;
}): Promise<Api & T> => {
  const {isConnected} = await NetInfo.fetch();
  if (!isConnected) {
    throw new Error('No Internet connection');
  }
  type ApiResponse = Api & T;
  store.dispatch(startLoader());
  store.dispatch(clearParams());
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

const put = async <T>({
  path,
  data,
}: {
  path: string;
  data: any;
}): Promise<Api & T> => {
  const {isConnected} = await NetInfo.fetch();
  if (!isConnected) {
    throw new Error('No Internet connection');
  }
  type ApiResponse = Api & T;
  store.dispatch(startLoader());
  store.dispatch(clearParams());

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
