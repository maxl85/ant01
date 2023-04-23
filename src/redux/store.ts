import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/slice';
// import costs from './cost/slice';
import { authApi } from './auth/authApi';
import { costhApi } from './cost/costApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [costhApi.reducerPath]: costhApi.reducer,
    auth,
    // costs,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat([authApi.middleware, costhApi.middleware]),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;