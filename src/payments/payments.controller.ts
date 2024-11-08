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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@ApiTags('payment')
@Controller('payment')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid payment data.' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Retrieve all payments' })
  @ApiResponse({ status: 200, description: 'Payments retrieved successfully.' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiParam({ name: 'id', description: 'ID of the payment', required: true })
  @ApiResponse({ status: 200, description: 'Payment retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a payment by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the payment to update',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Payment updated successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the payment to delete',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Payment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
