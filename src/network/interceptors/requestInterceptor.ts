import {InternalAxiosRequestConfig} from 'axios';
import {useNetworkStore} from '../../state/useNetworkStore.ts';

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  useNetworkStore.getState().setLoading(true);

  console.log('📤 Request:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    params: config.params,
    data: config.data,
  });
  return config;
};

export const requestErrorInterceptor = (error: any): Promise<any> => {
  useNetworkStore.getState().setLoading(false);

  console.error('❌ Request Error: ', error);
  return Promise.reject(error);
};
