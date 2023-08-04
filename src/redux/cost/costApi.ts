import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export interface IUserResponse {
//   username: string;
//   access_token: string;
// }

// export interface ILoginRequest {
//   username: string;
//   password: string;
// }

export interface IUser {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICost {
  id: number;
  text: string;
  date: string;
  price: number;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}

type CostResponse = ICost[];


export const costhApi = createApi({
  reducerPath: 'costApi',
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
    getAllCosts: builder.query<CostResponse, void>({
      query: () => 'files',
    }),
  }),
});

export const { useGetAllCostsQuery } = costhApi;