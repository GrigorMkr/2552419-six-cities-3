import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { User } from '../types/offer';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type AuthState = {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requireAuthorization: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { requireAuthorization, setUser } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthorizationStatus = (state: RootState): AuthorizationStatus => state.auth.authorizationStatus;
export const selectUser = (state: RootState): User | null => state.auth.user;
export const selectIsAuthorized = (state: RootState): boolean => state.auth.authorizationStatus === AuthorizationStatus.Auth;

