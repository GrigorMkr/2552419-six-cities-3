import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './data-slice';
import type { DataState } from './data-slice';

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
export type { DataState as State };

