import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsEnum, } from 'class-validator';

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  TRANSFER = 'transfer',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the associated order',
  })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user making the payment',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 1000.0,
    description: 'The amount of the payment',
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: '2024-11-07T00:00:00.000Z',
    description: 'The date and time when the payment was made',
  })
  @IsNotEmpty()
  payment_date: Date;

  @ApiProperty({
    example: 'card',
    description: 'The method of payment (e.g., card, cash, transfer)',
    enum: PaymentMethod,
  })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  method: PaymentMethod;

  @ApiProperty({
    example: 'completed',
    description: 'The status of the payment (e.g., pending, completed, failed)',
    enum: PaymentStatus,
  })
  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  status: PaymentStatus;
}
