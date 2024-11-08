import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUsersAddressDto {
  @ApiProperty({
    example: '1',
    description: 'User ID  format',
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
