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
import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';

@ApiTags('order_items')
@Controller('order_items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new order item' })
  @ApiResponse({ status: 201, description: 'Order item created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid order item data.' })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Retrieve all order items' })
  @ApiResponse({
    status: 200,
    description: 'Order items retrieved successfully.',
  })
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve an order item by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order item', required: true })
  @ApiResponse({
    status: 200,
    description: 'Order item retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an order item by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the order item to update',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Order item updated successfully.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete an order item by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the order item to delete',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Order item deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  remove(@Param('id') id: string) {
    return this.orderItemsService.delete(+id);
  }
}
