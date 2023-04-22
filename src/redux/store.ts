import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import auth from './auth/slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(authApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;