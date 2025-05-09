import axios from 'axios';
import {urls} from './urls';
import {
  requestErrorInterceptor,
  requestInterceptor,
} from './interceptors/requestInterceptor.ts';
import {
  responseErrorInterceptor,
  responseInterceptor,
} from './interceptors/responseInterceptor.ts';

const instance = axios.create({
  baseURL: 'https://omgvamp-hearthstone-v1.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '2b8afd7444mshbec2ca08324f952p111d5ejsncc153bcc019d',
    'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
  },
});

instance.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
instance.interceptors.response.use(
  responseInterceptor,
  responseErrorInterceptor,
);

export const apiClient = {
  fetchAllCards: () => instance.get(urls.allCards),
};
