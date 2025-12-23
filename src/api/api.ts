import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const REQUEST_TIMEOUT = 5000;
const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';

const TOKEN_KEY = 'six-cities-token';

export const getToken = (): string => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token || '';
};

export const saveToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        dropToken();
      }
      return Promise.reject(error);
    }
  );

  return api;
};

