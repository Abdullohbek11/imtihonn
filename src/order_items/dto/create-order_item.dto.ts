import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the order',
  })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: 99.99,
    description: 'Price of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
