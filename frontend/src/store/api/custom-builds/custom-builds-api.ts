import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IProduct } from 'types/IProduct';

import { CreateCustomBuildDto, UpdateCustomBuildDto, CustomBuild } from './types';

export const customBuildsApi = createApi({
  reducerPath: 'customBuildsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ['CustomBuild'],
  endpoints: (builder) => ({
    createCustomBuild: builder.mutation<CustomBuild, CreateCustomBuildDto>({
      query: (body) => ({
        url: 'custom-builds',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CustomBuild'],
    }),
    getAllCustomBuilds: builder.query<CustomBuild[], void>({
      query: () => ({
        url: 'custom-builds',
        method: 'GET',
      }),
      providesTags: ['CustomBuild'],
    }),
    getCustomBuildById: builder.query<CustomBuild, number>({
      query: (id) => ({
        url: `custom-builds/${id}`,
        method: 'GET',
      }),
      providesTags: ['CustomBuild'],
    }),
    updateCustomBuild: builder.mutation<CustomBuild, { id: number, dto: UpdateCustomBuildDto }>({
      query: ({ id, dto }) => ({
        url: `custom-builds/${id}`,
        method: 'PATCH',
        body: dto,
      }),
      invalidatesTags: ['CustomBuild'],
    }),
    deleteCustomBuild: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `custom-builds/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CustomBuild'],
    }),
    getProductByBuild: builder.query<IProduct[], { id: number, url: string }>({
      query: ({ id, url }) => ({
        url: `products/build/${id}`,
        method: 'GET',
        params: { url },
      }),
      providesTags: ['CustomBuild'],
    }),

  }),
});

export const {
  useCreateCustomBuildMutation,
  useGetAllCustomBuildsQuery,
  useGetCustomBuildByIdQuery,
  useUpdateCustomBuildMutation,
  useDeleteCustomBuildMutation,
  useGetProductByBuildQuery,
} = customBuildsApi;
