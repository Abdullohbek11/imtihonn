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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully.' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully.' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve an order by ID' })
  @ApiParam({ name: 'id', description: 'ID of the order', required: true })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the order to update',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Order updated successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the order to delete',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Order deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
