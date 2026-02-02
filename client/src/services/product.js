import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/products/",
    credentials: "include",
  }),

  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => "/getAllProducts",
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
