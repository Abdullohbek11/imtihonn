import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateContractDto {
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: 1,
    description: 'Order ID',
  })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @ApiProperty({
    example: 1,
    description: 'Coupon ID',
  })
  @IsNotEmpty()
  @IsNumber()
  coupon_id: number;

  @ApiProperty({
    example: '2023-01-01',
    description: 'Contract start date',
  })
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Contract end date',
  })
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty({
    example: 'Contract terms and conditions...',
    description: 'Contract terms',
  })
  @IsNotEmpty()
  @IsString()
  terms: string;

  @ApiProperty({
    example: 'active',
    description: 'Contract status',
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
