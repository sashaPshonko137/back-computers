import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCustomBuildDto {
  @ApiProperty({example: 1})
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  processor_id: number;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  motherboard_id: number;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  videocard_id: number;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  ram_id: number;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  ram_quantity: number;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  powerblock_id: number;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  drive_id: number;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  case_id: number;

  @ApiProperty({example: 1})
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  cooling_id: number;
  }
