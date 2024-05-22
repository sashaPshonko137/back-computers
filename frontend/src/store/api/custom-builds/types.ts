import { IProduct } from "types/IProduct";

// services/types.ts
export interface CustomBuild {
  id: number;
  user_id: number;
  processor_id?: number;
  motherboard_id?: number;
  videocard_id?: number;
  ram_id?: number;
  ram_quantity?: number;
  powerblock_id?: number;
  drive_id?: number;
  case_id?: number;
  cooling_id?: number;
  processor?: IProduct;
  motherboard?: IProduct;
  videocard?: IProduct;
  ram?: IProduct;
  powerblock?: IProduct;
  drive?: IProduct;
  case?: IProduct;
  cooling?: IProduct;

}

export interface CreateCustomBuildDto {
  user_id: number;
  processor_id?: number;
  motherboard_id?: number;
  videocard_id?: number;
  ram_id?: number;
  ram_quantity?: number;
  powerblock_id?: number;
  drive_id?: number;
  case_id?: number;
  cooling_id?: number;
}

export interface UpdateCustomBuildDto extends Partial<CreateCustomBuildDto> {}
