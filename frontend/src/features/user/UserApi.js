// src/features/auth/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/api/user', // adjust to your backend
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: '/list',
        method: 'GET',
      }),
    }),

  }),
});

export const { useGetAllUsersQuery } = userApi;
