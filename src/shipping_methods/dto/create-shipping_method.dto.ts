import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateShippingMethodDto {
  @ApiProperty({
    example: 'Express Delivery',
    description: 'Name of the shipping method',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 15.99,
    description: 'Cost of shipping',
  })
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty({
    example: '2-3 business days',
    description: 'Estimated delivery time',
  })
  @IsString()
  @IsNotEmpty()
  estimated_delivery_time: string;

  @ApiProperty({
    example: 1,
    description: 'User address ID',
  })
  @IsNumber()
  @IsNotEmpty()
  user_address_id: number;
}
