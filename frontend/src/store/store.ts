import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import { authApi } from "store/api/auth/auth-api";
import { cartsApi } from "store/api/carts/carts-api";
import { cartsProductsApi } from "store/api/cartsProducts/carts-products-api";
import { customBuildsApi } from "store/api/custom-builds/custom-builds-api";
import { imagesApi } from "store/api/images/images-api";
import { ordersApi } from "store/api/orders/orders-api";
import { productsApi } from "store/api/products/products-api";
import { typesApi } from "store/api/types/types-api";
import { usersApi } from "store/api/users/users-api";
import categoryInfoReducer from "store/features/categoryInfoSlice";
import searchReducer from "store/features/searchSlice";


const rootReducer = combineReducers({
  searchState: searchReducer,
  categoryInfoState: categoryInfoReducer,
  [authApi.reducerPath]: authApi.reducer,
  [cartsApi.reducerPath]: cartsApi.reducer,
  [cartsProductsApi.reducerPath]: cartsProductsApi.reducer,
  [imagesApi.reducerPath]: imagesApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [typesApi.reducerPath]: typesApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [customBuildsApi.reducerPath]: customBuildsApi.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
        authApi.middleware,
        cartsApi.middleware,
        cartsProductsApi.middleware,
        ordersApi.middleware,
        imagesApi.middleware,
        typesApi.middleware,
        productsApi.middleware,
        usersApi.middleware,
        customBuildsApi.middleware,
      ]),
  });
};

export const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
