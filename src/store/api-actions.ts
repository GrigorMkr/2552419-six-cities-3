import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Offer, AuthInfo } from '../types/offer';
import type { AxiosInstance } from 'axios';
import { loadOffers, setLoading } from './data-slice';
import { requireAuthorization, setUser, AuthorizationStatus } from './auth-slice';
import { saveToken, dropToken } from '../api/api';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setLoading(true));
    try {
      const { data } = await api.get<Offer[]>('/offers');
      dispatch(loadOffers(data));
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 401) {
          dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
          dispatch(setUser(null));
        }
      }
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'auth/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<AuthInfo>('/login');
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser({
        email: data.email,
        avatarUrl: data.avatarUrl,
      }));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dropToken();
    }
  }
);

export type LoginData = {
  email: string;
  password: string;
}

export const loginAction = createAsyncThunk<
  void,
  LoginData,
  { extra: AxiosInstance }
>(
  'auth/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<AuthInfo>('/login', { email, password });
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUser({
        email: data.email,
        avatarUrl: data.avatarUrl,
      }));
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { status?: number; data?: unknown } };
        if (axiosError.response?.status === 400) {
          return rejectWithValue(axiosError.response.data);
        }
      }
      throw error;
    }
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'auth/logout',
  (_arg, { dispatch }) => {
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  }
);

