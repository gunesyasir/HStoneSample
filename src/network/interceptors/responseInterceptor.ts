import {AxiosError, AxiosInstance, AxiosResponse} from 'axios';
import {useNetworkStore} from '../../state/useNetworkStore.ts';

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  useNetworkStore.getState().setLoading(false);

  console.log('📥 Response:', {
    url: response.config.url,
    status: response.status,
    data: response.data,
  });
  return response;
};

export const responseErrorInterceptor = (
  error: AxiosError,
  axiosInstance: AxiosInstance,
): Promise<Error> => {
  useNetworkStore.getState().setLoading(false);

  const status = error.response?.status;
  const config = error.config;
  // Retry between 500 and 600
  if (config && status && (status >= 500 || status < 600)) {
    useNetworkStore
      .getState()
      .setError('Server error occurred.', () => axiosInstance(config));
  } else {
    useNetworkStore.getState().setError(error.message);
  }

  console.error('❌ Response Error: ', error.response || error);

  return Promise.reject(error as Error);
};
