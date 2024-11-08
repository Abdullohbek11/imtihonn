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
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@ApiTags('coupon')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new coupon' })
  @ApiResponse({ status: 201, description: 'Coupon created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid coupon data.' })
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Retrieve all coupons' })
  @ApiResponse({ status: 200, description: 'Coupons retrieved successfully.' })
  findAll() {
    return this.couponService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve a coupon by ID' })
  @ApiParam({ name: 'id', description: 'ID of the coupon', required: true })
  @ApiResponse({ status: 200, description: 'Coupon retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Coupon not found.' })
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a coupon by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the coupon to update',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Coupon updated successfully.' })
  @ApiResponse({ status: 404, description: 'Coupon not found.' })
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponService.update(+id, updateCouponDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a coupon by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the coupon to delete',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Coupon deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Coupon not found.' })
  remove(@Param('id') id: string) {
    return this.couponService.remove(+id);
  }
}
