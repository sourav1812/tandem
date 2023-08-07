import axios, {AxiosResponse} from 'axios';
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

// Create a queue to hold pending requests
const requestQueue: ((token: any) => void)[] = [];
let isRefreshing = false;

const refreshAccessToken = async () => {
  const {refreshToken} = getStoredTokens();

  if (!isRefreshing) {
    isRefreshing = true;

    try {
      if (!refreshToken) {
        logout();
        throw new Error('No refreshToken found');
      }

      const response = await axios.post(BASE_URL + 'refresh token endpoint', {
        refreshToken,
      });
      const {token, refreshToken: newRefreshToken} = response.data;
      storeTokens(token, newRefreshToken);
      requestQueue.forEach(resolve => resolve(token));
      requestQueue.length = 0;
      isRefreshing = false;
      return token;
    } catch (error) {
      console.log('error in refresh token logic:', error);
      logout();
      throw error;
    }
  } else {
    // If another request is already refreshing the token, wait for it to complete
    return new Promise<string>(resolve => {
      requestQueue.push(token => resolve(token));
    });
  }
};

const handleError = async (error: {
  config: any;
  response: {status: number};
}) => {
  const originalRequest = error.config;
  const {status} = error.response;

  if (status === 401) {
    // Handle token refresh for 401 (Unauthorized) errors
    try {
      const token = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return await axiosInstance(originalRequest);
    } catch (error1) {
      return await Promise.reject(error1);
    }
  } else if (status === 404) {
    // Handle 404 (Not Found) errors
    // For example, you can throw a custom error or return a specific response
    return await Promise.reject(new Error('Not Found'));
  } else if (status >= 500) {
    // Handle 5xx (Server Errors) errors
    // For example, you can throw a custom error or return a specific response
    return await Promise.reject(new Error('Server Error'));
  }
  // ! Handle other status codes here
  // For other status codes, return the error as is
  return Promise.reject(error);
};

// axiosInstance interceptor for handling token refresh
axiosInstance.interceptors.response.use(undefined, handleError);

const executeRequest = async <T>(
  requestFunction: (
    path: string,
    data?: any,
  ) => Promise<AxiosResponse<Api & T, any>>,
  path: string,
  data?: any,
): Promise<Api & T> => {
  const {isConnected} = await NetInfo.fetch();
  if (!isConnected) {
    throw new Error('No Internet connection');
  }

  store.dispatch(startLoader());
  store.dispatch(clearParams());

  try {
    const response: AxiosResponse<Api & T, any> = await requestFunction(
      path,
      data,
    );

    if (!response?.data?.status) {
      throw new Error(response?.data?.message);
    } else {
      return response?.data;
    }
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    store.dispatch(stopLoader());
  }
};

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

  if (!noLoader) {
    store.dispatch(startLoader());
  }
  store.dispatch(addParams(params));

  try {
    if (!allowRequestAnyway) {
      const {token, refreshToken} = getStoredTokens();
      if (!token && !refreshToken) {
        throw new Error('Your Session has expired. Please login to continue');
      }
    }

    const response = await axiosInstance.get<Api & T>(path);
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
  return executeRequest<Api & T>(axiosInstance.post, BASE_URL + path, data);
};

const put = async <T>({
  path,
  data,
}: {
  path: string;
  data: any;
}): Promise<Api & T> => {
  return executeRequest<Api & T>(axiosInstance.put, path, data);
};

export {get, post, put};
