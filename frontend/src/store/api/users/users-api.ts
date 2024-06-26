import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IAddUserRequest,
  IDeleteUsersRequest,
  IEditUsersRequest,
  IGetCertainUsersRequest,
  IGetUsersRequest,
  IUserResponse,
} from "./types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    addUsers: build.mutation<unknown, IAddUserRequest>({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["Users"],
    }),

    getUsers: build.query<IUserResponse, IGetUsersRequest>({
      query: (body) => ({
        url: `/users`,
        params: { page: body.page, limit: body.limit },
      }),
      providesTags: ["Users"],
    }),

    getCertainUsers: build.query<unknown, IGetCertainUsersRequest>({
      query: (body) => ({ url: `/users/${body.id}` }),
      providesTags: ["Users"],
    }),

    editUsers: build.mutation<unknown, IEditUsersRequest>({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: "PATCH",
        body: { ...body },
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUsers: build.mutation<unknown, IDeleteUsersRequest>({
      query: (body) => ({ url: `/users/${body.id}`, method: "DELETE" }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useAddUsersMutation,
  useGetUsersQuery,
  useGetCertainUsersQuery,
  useEditUsersMutation,
  useDeleteUsersMutation,
} = usersApi;
