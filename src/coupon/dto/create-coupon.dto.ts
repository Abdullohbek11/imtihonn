import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCouponDto {
  @ApiProperty({
    description: 'Coupon code',
    example: 'SUMMER2023',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Discount amount',
    example: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  discount_amount: number;

  @ApiProperty({
    description: 'Expiry date of the coupon',
    example: '2023-12-31',
  })
  @IsNotEmpty()
  expiry_date: Date;

  @ApiProperty({
    description: 'Status of the coupon',
    example: 'active',
    enum: ['active', 'inactive', 'expired'],
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
