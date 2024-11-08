import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: new Date(),
    description: 'Order date',
  })
  @IsNotEmpty()
  order_date: Date;

  @ApiProperty({
    example: 299.99,
    description: 'Total amount of the order',
  })
  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    example: 'pending',
    description: 'Current status of the order',
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['pending', 'completed', 'cancelled'])
  status: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the shipping method selected',
  })
  @IsNotEmpty()
  @IsNumber()
  shipping_methodId: number;
}
