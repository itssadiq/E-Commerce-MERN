import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/auth/",
    credentials: "include",
  }),
  endpoints: (build) => ({
    signUpUser: build.mutation({
      query: (newUser) => ({
        url: "signup",
        method: "POST",
        body: newUser,
      }),
    }),

    loginUser: build.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),

    profileInfo: build.query({
      query: () => "/profile",
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useLogoutUserMutation,
  useProfileInfoQuery,
} = authApi;
