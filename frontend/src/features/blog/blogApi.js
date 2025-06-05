import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/variables";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/blog`
  }),

  // 👇 This defines your tag for cache management
  tagTypes: ["blog"],

  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (formData) => ({
        url: `/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blog"], // 👈 Invalidate list after creating
    }),
    editBlogById: builder.query({
      query: (id) => ({
        url: `/edit/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["blog"], // 👈 Invalidate list after creating
    }),

    getAllBlog: builder.query({
      query: () => ({
        url: "/list",
        method: "GET",
      }),
      providesTags: ["blog"], // 👈 Provide cache tag
    }),

    updateBlogById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blog"], // 👈 Invalidate after update
    }),
    deleteBlogById: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`, // Make sure the URL matches your Express route
        method: "DELETE",
      }),
       invalidatesTags: ["blog"], 
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useEditBlogByIdQuery,
  useUpdateBlogByIdMutation,
  useGetAllBlogQuery,
  useDeleteBlogByIdMutation
} = blogApi;
