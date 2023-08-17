import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IOnline {
  id: number;
  rpiId: string;
  counter: number;
  createdAt: string;
}

export const onlineApi = createApi({
  reducerPath: 'onlineApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers) => {
      const token = JSON.parse(localStorage.getItem('auth') || '{}')?.token ?? '';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOnline: builder.query<IOnline[], void>({
      query: () => 'online?rpiId=rpi01&last=1440',
    }),
  }),
});

export const { useGetOnlineQuery } = onlineApi;