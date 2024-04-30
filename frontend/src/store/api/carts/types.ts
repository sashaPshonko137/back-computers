import { IProduct } from "types/IProduct";

export interface IAddCartsRequest {
  user_id: number;
}

export interface IGetCartsRequest {
  page: number;
  limit: number;
}

export interface IGetCartsResponse {
  id: number;
  user_id: number;
  carts_products: IProduct[];
}

export interface IGetCertainCartsRequest {
  id: string;
}

export interface IEditCartsRequest {
  id: string;
  user_id?: number;
}

export interface IDeleteCartsRequest {
  id: string;
}

export interface IClearCartsRequest {
  id: string;
}
