import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken, dropToken } from './token';
import { API, HTTP_STATUS } from '../constants';

export const createAPI = () => {
  const api = axios.create({
    baseURL: API.BASE_URL,
    timeout: API.REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers[API.TOKEN_HEADER] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        dropToken();
      }
      return Promise.reject(error);
    }
  );

  return api;
};

