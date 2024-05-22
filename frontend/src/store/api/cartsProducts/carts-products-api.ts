import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IEditCartsProductsRequest,
  IAddCartsProductsResponse,
  IDeleteCartsProductsRequest,
  IGetCartsProductsRequest,
  IGetCertainCartsProductsRequest,
} from "./types";
import { CustomBuild } from "../custom-builds/types";

export const cartsProductsApi = createApi({
  reducerPath: "cartsProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ['CartsProducts', 'CustomBuild'],

  endpoints: (build) => ({
    addCartsProducts: build.mutation<unknown, IAddCartsProductsResponse>({
      query: (body) => ({
        url: "/carts-products",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["CartsProducts"],
    }),

    getCartsProducts: build.query<unknown, IGetCartsProductsRequest>({
      query: (body) => ({
        url: `/carts-products?page=${body.page}&limit=${body.limit}`,
      }),

      providesTags: ["CartsProducts"],
    }),

    deleteCartsProducts: build.mutation<unknown, IDeleteCartsProductsRequest>({
      query: (body) => ({
        url: `/carts-products?product_id=${body.product_id}&user_id=${body.user_id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["CartsProducts"],
    }),

    getCertainCartsProducts: build.query<unknown, IGetCertainCartsProductsRequest>({
      query: (body) => ({ url: `/carts-products/${body.id}` }),

      providesTags: ["CartsProducts"],
    }),

    editCartsProducts: build.mutation<unknown, IEditCartsProductsRequest>({
      query: (body) => ({
        url: `/carts-products/${body.id}`,
        method: "PATCH",
        body: { product_id: body.product_id, quantity: body.quantity },
      }),

      invalidatesTags: ["CartsProducts"],
    }),

    addToCart: build.mutation<CustomBuild, { id: number }>({
      query: ({ id }) => ({
        url: `custom-builds/build/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['CartsProducts', 'CustomBuild'],
    }),
  }),
});

export const {
  useAddCartsProductsMutation,
  useGetCartsProductsQuery,
  useDeleteCartsProductsMutation,
  useGetCertainCartsProductsQuery,
  useEditCartsProductsMutation,
  useAddToCartMutation,
} = cartsProductsApi;
