import {AxiosError, AxiosResponse} from 'axios';

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  console.log('📥 Response:', {
    url: response.config.url,
    status: response.status,
    data: response.data,
  });
  return response;
};

export const responseErrorInterceptor = (error: AxiosError): Promise<Error> => {
  console.error('❌ Response Error: ', error.response || error);

  return Promise.reject(error as Error);
};
