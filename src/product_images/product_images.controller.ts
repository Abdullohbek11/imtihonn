import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductImagesService } from './product_images.service';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';

@ApiTags('product_image')
@Controller('product_image')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new product image' })
  @ApiResponse({
    status: 201,
    description: 'Product image created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid product image data.' })
  create(@Body() createProductImageDto: CreateProductImageDto) {
    return this.productImagesService.create(createProductImageDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Retrieve all product images' })
  @ApiResponse({
    status: 200,
    description: 'Product images retrieved successfully.',
  })
  findAll() {
    return this.productImagesService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve a product image by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the product image',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Product image retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Product image not found.' })
  findOne(@Param('id') id: string) {
    return this.productImagesService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a product image by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the product image to update',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Product image updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Product image not found.' })
  update(
    @Param('id') id: string,
    @Body() updateProductImageDto: UpdateProductImageDto,
  ) {
    return this.productImagesService.update(+id, updateProductImageDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a product image by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the product image to delete',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Product image deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Product image not found.' })
  remove(@Param('id') id: string) {
    return this.productImagesService.remove(+id);
  }
}
