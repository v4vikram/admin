import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const salesPersonsApi = createApi({
  reducerPath: "salesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/sales", // adjust to your backend
  }),
  endpoints: (builder) => ({
    getAllSalesPersons: builder.query({
      query: () => ({
        url: "/list",
        method: "GET",
      }),
    }),
    getSalesById: builder.query({
      query: (id) => ({
        url: `/edit/${id}`,
        method: "GET",
      }),
    }),
    updateSalesById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllSalesPersonsQuery, useGetSalesByIdQuery, useUpdateSalesByIdMutation } = salesPersonsApi;
