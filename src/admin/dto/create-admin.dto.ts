import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsBoolean,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Admin full name',
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin phone number',
  })
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Admin email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Admin password',
  })
  @IsString()
  password: string;
  @ApiProperty({
    example: 'password123',
    description: 'Admin password try again',
  })
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: true,
    description: 'Is admin active',
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: 'Is admin creator',
  })
  @IsBoolean()
  is_creator: boolean;

  @ApiProperty({
    example: 'refresh_token_hash_string',
    description: 'Hashed refresh token',
    required: false,
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token: string;
}
