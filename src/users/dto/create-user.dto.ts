import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'User phone number',
  })
  @IsString()
  phone_number: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'password123',
    description: 'Foydalanuvchining parolini takrorleng',
  })
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: '123 Main Street, City',
    description: 'User address',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: '123456789',
    description: 'is_active',
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiProperty({
    example: 'refresh_token_hash_string',
    description: 'Hashed refresh token',
    required: false,
  })
  @IsOptional()
  @IsString()
  hashed_refresh_token: string;

  @ApiProperty({
    example: 'unique_activation_link_123',
    description: 'User account activation link',
    required: false,
  })
  @IsOptional()
  @IsString()
  activation_link: string;
}
