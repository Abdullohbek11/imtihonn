import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({
    example: 1,
    description: 'Product ID',
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    example: 100,
    description: 'Quantity of product in inventory',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 'Warehouse A',
    description: 'Location of inventory',
  })
  @IsNotEmpty()
  @IsString()
  location: string;
}
