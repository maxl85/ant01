import { configureStore } from '@reduxjs/toolkit';
import auth from './auth/slice';
// import costs from './cost/slice';
import { authApi } from './auth/authApi';
import { filesApi } from './files/filesApi';
import { onlineApi } from './online/onlineApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [onlineApi.reducerPath]: onlineApi.reducer,
    auth,
    // costs,
  },
  middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat([
    authApi.middleware,
    filesApi.middleware,
    onlineApi.middleware,
  ]),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;