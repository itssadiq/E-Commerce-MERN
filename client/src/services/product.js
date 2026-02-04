import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/products/", // Ensure this matches your Backend Port
    credentials: "include",
  }),
  tagTypes: ["Product"], // 1. Define a tag for Products

  endpoints: (build) => ({
    // Query to fetch
    getAllProducts: build.query({
      query: () => "/getAllProducts",
      providesTags: ["Product"], // 2. Attach tag to the list
    }),

    // Mutation to add
    addProduct: build.mutation({
      query: (formData) => ({
        url: "/addProduct",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"], // 3. Invalidate tag to force re-fetch
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation, // Export the hook
} = productApi;
