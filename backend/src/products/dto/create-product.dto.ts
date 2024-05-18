import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'GTX 1070' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'Эта видеокарта была создана людьми для использования в играх. Она имеет 8 ГБ видеопамяти, 1070',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: [
      { key: 'Страна', value: 'Тайвань', rowKey: '1' },
      { key: 'Артикул', value: 'GTX 1070', rowKey: '2' },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  characteristics: CharacteristicDto[];

  @ApiProperty({ example: 14999.99 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  image_id: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  type_id: number;

  @ApiProperty({ example: 'LGA 1151' })
  @IsOptional()
  @IsString()
  socket?: string;

  @ApiProperty({ example: 'DDR4' })
  @IsOptional()
  @IsString()
  ram_type: string;

  @ApiProperty({ example: 'ATX' })
  @IsOptional()
  @IsString()
  form_factor: string;

  @ApiProperty({ example : 30})
  @IsOptional()
  @IsNumber()
  gpu_width: number;

  @ApiProperty({ example : 5})
  @IsOptional()
  @IsNumber()
  gpu_height: number;

  @ApiProperty({ example: 8 })
  @IsOptional()
  @IsNumber()
  ram_capacity: number;
}

class CharacteristicDto {
  id?: number;
  key: string;
  value: string;
  rowKey?: string;
}
