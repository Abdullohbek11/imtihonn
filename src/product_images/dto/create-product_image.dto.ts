import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    example: 'https://example.com/images/product1.jpg',
    description: 'URL of the product image',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image_url: string;
}
