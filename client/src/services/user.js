import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/users/",
    credentials: "include",
  }),
  tagTypes: ["User"],

  endpoints: (build) => ({
    // 1. Get All Users
    getAllUsers: build.query({
      query: () => "/getAllUsers",
      providesTags: ["User"],
    }),

    // 2. Delete User
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // 3. Update User (Role/Name)
    updateUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/updateUser/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = usersApi;
