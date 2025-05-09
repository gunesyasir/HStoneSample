import {InternalAxiosRequestConfig} from 'axios';

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
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
  console.error('❌ Request Error: ', error);
  return Promise.reject(error);
};
