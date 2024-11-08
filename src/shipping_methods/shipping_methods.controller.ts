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
import { ShippingMethodsService } from './shipping_methods.service';
import { CreateShippingMethodDto } from './dto/create-shipping_method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping_method.dto';

@ApiTags('shipping_methods')
@Controller('shipping_methods')
export class ShippingMethodsController {
  constructor(
    private readonly shippingMethodsService: ShippingMethodsService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new shipping method' })
  @ApiResponse({
    status: 201,
    description: 'Shipping method created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid shipping method data.' })
  create(@Body() createShippingMethodDto: CreateShippingMethodDto) {
    return this.shippingMethodsService.create(createShippingMethodDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Retrieve all shipping methods' })
  @ApiResponse({
    status: 200,
    description: 'Shipping methods retrieved successfully.',
  })
  findAll() {
    return this.shippingMethodsService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve a shipping method by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the shipping method',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Shipping method retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Shipping method not found.' })
  findOne(@Param('id') id: string) {
    return this.shippingMethodsService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a shipping method by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the shipping method to update',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Shipping method updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Shipping method not found.' })
  update(
    @Param('id') id: string,
    @Body() updateShippingMethodDto: UpdateShippingMethodDto,
  ) {
    return this.shippingMethodsService.update(+id, updateShippingMethodDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a shipping method by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the shipping method to delete',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Shipping method deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Shipping method not found.' })
  remove(@Param('id') id: string) {
    return this.shippingMethodsService.remove(+id);
  }
}
