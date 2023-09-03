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

export interface IFiles {
  id: number;
  camId: string;
  filename: string;
  dateTime: string;
  createdAt: string;
}

export interface IDates {
  dateTime: string;
}

// export type CostResponse = ICost[];


export const filesApi = createApi({
  reducerPath: 'filesApi',
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
    getAllFiles: builder.query<IFiles[], void>({
      query: () => 'files',
    }),
    getAllDates: builder.query<IDates[], { cam1: string; cam2: string }>({
      // query: (arg) => `files/dates?cam1=${arg.cam1}&cam2=${arg.cam2}`,
      query: (arg) => ({
        url: 'files/dates',
        params: {
          cam1: arg.cam1,
          cam2: arg.cam2,
        }
      })
    }),
  }),
});

export const { useGetAllFilesQuery, useGetAllDatesQuery } = filesApi;