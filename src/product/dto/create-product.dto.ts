import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Modern Chair',
    description: 'Product name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Comfortable modern design chair with ergonomic support',
    description: 'Product description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 299.99,
    description: 'Product price',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 'Black',
    description: 'Product color',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    example: 60.5,
    description: 'Product width in cm',
  })
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @ApiProperty({
    example: 90.0,
    description: 'Product height in cm',
  })
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @ApiProperty({
    example: 1,
    description: 'Category ID',
  })
  @IsInt()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({
    example: 100,
    description: 'Initial stock quantity',
  })
  @IsInt()
  @IsNotEmpty()
  stock: number;
}
