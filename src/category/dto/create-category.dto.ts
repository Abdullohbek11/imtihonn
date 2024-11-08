import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Furniture', description: 'Kategoriya nomi' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'This category includes various types of furniture.',
    description: 'Kategoriya tavsifi',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
