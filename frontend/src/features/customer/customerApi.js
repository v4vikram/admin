import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/customer",
  }),

  // 👇 This defines your tag for cache management
  tagTypes: ["Customer"],

  endpoints: (builder) => ({
    // Create Customer
    createCustomer: builder.mutation({
      query: (data) => ({
        url: `/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer"], // 👈 Invalidate list after creating
    }),

    // Get All Customers
    getCustomer: builder.query({
      query: () => ({
        url: "/list",
        method: "GET",
      }),
      providesTags: ["Customer"], // 👈 Provide cache tag
    }),

    // Get Customer By ID
    getCustomerByID: builder.query({
      query: (id) => ({
        url: `/edit/${id}`,
        method: "GET",
      }),
    }),

    // Update Customer By ID
    updateCustomerByID: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Customer"], // 👈 Invalidate after update
    }),
  }),
});



export const {
  useCreateCustomerMutation,
  useGetCustomerQuery,
  useGetCustomerByIDQuery,
  useUpdateCustomerByIDMutation
} = customerApi;
