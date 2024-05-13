import axios, {AxiosResponse} from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {getStoredTokens, storeTokens} from '@tandem/functions/tokens';
import Api from './interface';
import {
  buttonLoader,
  startLoader,
  stopLoader,
} from '@tandem/redux/slices/activityIndicator.slice';
import {store} from '@tandem/redux/store';
import {API, BASE_URL} from '@tandem/constants/api';
import {addParams, clearParams} from '@tandem/redux/slices/paramsReducer';
import logout from '@tandem/functions/logout';
import {addGetResponse} from '@tandem/redux/slices/getResponseReducer';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import i18n from '@tandem/constants/lang/i18n';

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
    config.headers['Accept-Language'] = i18n.locale;
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
        logout({api: false});
        throw new Error('No refreshToken found');
      }

      const response = await axios.post(BASE_URL + API.REFRESH_TOKEN, {
        refreshToken,
      });
      const {accessToken, refreshToken: newRefreshToken} = response.data;
      storeTokens(accessToken, newRefreshToken);
      requestQueue.forEach(resolve => resolve(accessToken));
      requestQueue.length = 0;
      isRefreshing = false;
      return accessToken;
    } catch (error) {
      console.log('error in refresh token logic:', error);
      logout({api: false});
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
  response: {
    status: number;
    data: {message: string; possibleResolution: string | undefined};
  };
}) => {
  const originalRequest = error.config;
  const {status, data} = error.response;
  console.log('error in intercerpt', {error: data, status});
  if (status === 401) {
    // Handle token refresh for 401 (Unauthorized) errors
    try {
      const {refreshToken} = getStoredTokens();
      if (!refreshToken) {
        // if 401 error is not due to token invaidation
        store.dispatch(
          addAlertData({
            type: 'Alert',
            message: data.message,
            possibleResolution: data.possibleResolution,
          }),
        );
        //! Toast message here
        return await Promise.reject(
          new Error(originalRequest.url + ': Status: ' + status),
        );
      }
      const token = await refreshAccessToken();
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return await axiosInstance(originalRequest);
    } catch (error1) {
      return await Promise.reject(
        new Error(originalRequest.url + ': Status: ' + status),
      );
    }
  } else if (status >= 400) {
    // Handle 404 (Not Found) errors
    // For example, you can throw a custom error or return a specific response
    store.dispatch(
      addAlertData({
        type: 'Alert',
        message: data.message,
        possibleResolution: data.possibleResolution,
      }),
    );
    //! Toast message here
    return await Promise.reject(
      new Error(originalRequest.url + ': Status: ' + status),
    );
  } else if (status >= 500) {
    // Handle 5xx (Server Errors) errors
    // For example, you can throw a custom error or return a specific response
    store.dispatch(
      addAlertData({
        type: 'Alert',
        message: data.message,
        possibleResolution: data.possibleResolution,
      }),
    );
    // !Toast message here
    return await Promise.reject(
      new Error(originalRequest.url + ': Status: ' + status),
    );
  }
  store.dispatch(
    addAlertData({
      type: 'Alert',
      message: data.message,
      possibleResolution: data.possibleResolution,
    }),
  );
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
  onSuccess?: () => void,
) => {
  const {isConnected} = await NetInfo.fetch();
  if (!isConnected) {
    throw new Error('No Internet connection');
  }

  store.dispatch(startLoader());
  store.dispatch(buttonLoader());
  store.dispatch(clearParams());
  console.log({path});
  try {
    const response: AxiosResponse<Api & T, any> = await requestFunction(
      path,
      data,
    );
    console.log({response});
    if (response.data.message) {
      store.dispatch(
        addAlertData({
          type: 'Message',
          message: response.data.message,
          onSuccess: onSuccess,
        }),
      );
    }
    //! Toast message here to show completion of POST/PUT request
    return response?.data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error('Error in this path: ' + path + ': ' + error.message);
  } finally {
    store.dispatch(stopLoader());
  }
};

const get = async <T>({
  path,
  params,
  noLoader = false,
}: {
  path: string;
  params?: any;
  noLoader: boolean;
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
    const {token, refreshToken} = getStoredTokens();
    if (!token && !refreshToken) {
      throw new Error('Your Session has expired. Please login to continue');
    }
    const response = await axiosInstance.get<Api & T>(path);
    store.dispatch(addGetResponse({path, response: response?.data}));
    return response?.data;
  } catch (error: any) {
    persistedState = store.getState().getResponseReducer[path];

    if (!persistedState) {
      console.log('Persisted state in get req not found', error.message);
    }
    return persistedState;
  } finally {
    if (!noLoader) {
      store.dispatch(stopLoader());
    }
  }
};

const post = async <T>({
  path,
  data,
  onSuccess = () => {},
}: {
  path: string;
  data: any;
  onSuccess?: () => void;
}) => {
  return executeRequest<Api & T>(
    axiosInstance.post,
    BASE_URL + path,
    data,
    onSuccess,
  );
};

const put = async <T>({
  path,
  data,
  onSuccess = () => {},
}: {
  path: string;
  data: any;
  onSuccess: () => void;
}) => {
  return executeRequest<Api & T>(axiosInstance.put, path, data, onSuccess);
};

const patch = async <T>({
  path,
  data,
  onSuccess = () => {},
}: {
  path: string;
  data: any;
  onSuccess: () => void;
}) => {
  return executeRequest<Api & T>(axiosInstance.patch, path, data, onSuccess);
};

const deleteApi = async <T>({
  path,
  data,
  onSuccess = () => {},
}: {
  path: string;
  data: any;
  onSuccess: () => void;
}) => {
  return executeRequest<Api & T>(axiosInstance.delete, path, data, onSuccess);
};

export {get, post, put, patch, deleteApi};
