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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid product data.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
  findAll() {
    return this.productService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiParam({ name: 'id', description: 'ID of the product', required: true })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Get('color/:color')
  @ApiOperation({ summary: 'Retrieve products by color' })
  @ApiParam({
    name: 'color',
    description: 'Color of the product',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Products not found.' })
  findByColor(@Param('color') color: string) {
    return this.productService.findByColor(color);
  }

  @Get('price/:minPrice/:maxPrice')
  @ApiOperation({ summary: 'Retrieve products by price range' })
  @ApiParam({
    name: 'minPrice',
    description: 'Minimum price of the product',
    required: true,
  })
  @ApiParam({
    name: 'maxPrice',
    description: 'Maximum price of the product',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
  @ApiResponse({
    status: 404,
    description: 'No products found in the given price range.',
  })
  findByPrice(
    @Param('minPrice') minPrice: string,
    @Param('maxPrice') maxPrice: string,
  ) {
    return this.productService.findByPrice(+minPrice, +maxPrice);
  }

  @Get('size/:minWidth/:minHeight')
  @ApiOperation({ summary: 'Retrieve products by size' })
  @ApiParam({
    name: 'minWidth',
    description: 'Minimum width of the product',
    required: true,
  })
  @ApiParam({
    name: 'minHeight',
    description: 'Minimum height of the product',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
  @ApiResponse({
    status: 404,
    description: 'No products found with the given size.',
  })
  findBySize(
    @Param('minWidth') minWidth: string,
    @Param('minHeight') minHeight: string,
  ) {
    return this.productService.findBySize(+minWidth, +minHeight);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the product to update',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the product to delete',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
