import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IUserResponse {
  username: string;
  access_token: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_SERVER_URL}),
  endpoints: (builder) => ({
    login: builder.mutation<IUserResponse, ILoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;