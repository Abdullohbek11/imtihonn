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
import { UsersAddressService } from './users_address.service';
import { CreateUsersAddressDto } from './dto/create-users_address.dto';
import { UpdateUsersAddressDto } from './dto/update-users_address.dto';

@ApiTags('users_address')
@Controller('users_address')
export class UsersAddressController {
  constructor(private readonly usersAddressService: UsersAddressService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user address' })
  @ApiResponse({
    status: 201,
    description: 'User address created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid user address data.' })
  create(@Body() createUsersAddressDto: CreateUsersAddressDto) {
    return this.usersAddressService.create(createUsersAddressDto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Retrieve all user addresses' })
  @ApiResponse({
    status: 200,
    description: 'User addresses retrieved successfully.',
  })
  findAll() {
    return this.usersAddressService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Retrieve a user address by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user address',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User address retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'User address not found.' })
  findOne(@Param('id') id: string) {
    return this.usersAddressService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a user address by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user address to update',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User address updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'User address not found.' })
  update(
    @Param('id') id: string,
    @Body() updateUsersAddressDto: UpdateUsersAddressDto,
  ) {
    return this.usersAddressService.update(+id, updateUsersAddressDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a user address by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the user address to delete',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User address deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'User address not found.' })
  remove(@Param('id') id: string) {
    return this.usersAddressService.remove(+id);
  }
}
