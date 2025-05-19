import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/api/product/category",
  }),

  // 👇 This defines your tag for cache management
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // Create Customer
    createCategory: builder.mutation({
      query: (formData) => ({
        url: `/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"], // 👈 Invalidate list after creating
    }),
    createSubCategory: builder.mutation({
      query: (formData) => ({
        url: `/sub/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"], // 👈 Invalidate list after creating
    }),

  
    getCatById: builder.query({
      query: (id) => ({
        url:  `/edit/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"], // 👈 Provide cache tag
    }),
    getCatList: builder.query({
      query: () => ({
        url: "/list",
        method: "GET",
      }),
      providesTags: ["Product"], // 👈 Provide cache tag
    }),

    getSubCatList: builder.query({
      query: () => ({
        url: "/sub/list",
        method: "GET",
      }),
      providesTags: ["Product"], // 👈 Provide cache tag
    }),



    // Update Customer By ID
    updateCustomerByID: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"], // 👈 Invalidate after update
    }),
  }),
});



export const {
  useCreateCategoryMutation,
  useCreateSubCategoryMutation,
  useGetCatListQuery,
  useGetSubCatListQuery,
  useGetCatByIdQuery,
} = productApi;
