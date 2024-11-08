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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new admin account' })
  @ApiResponse({ status: 201, description: 'Admin successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get('getall')
  @ApiOperation({ summary: 'Retrieve a list of all admins' })
  @ApiResponse({
    status: 200,
    description: 'List of admins retrieved successfully.',
  })
  findAll() {
    return this.adminService.findAll();
  }

  @Get('get/:id')
  @ApiOperation({ summary: 'Get details of a specific admin' })
  @ApiParam({
    name: 'id',
    description: 'ID of the admin to retrieve',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Admin details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get details of a specific admin by email' })
  @ApiParam({
    name: 'email',
    description: 'Email of the admin to retrieve',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Admin details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  findOneByEmail(@Param('email') email: string) {
    return this.adminService.findByEmail(email);
  }
  @Get('phone/:phone_number')
  @ApiOperation({ summary: 'Get details of a specific admin by phone number' })
  @ApiParam({
    name: 'phone_number',
    description: 'Phone number of the admin to retrieve',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Admin details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  findOneByPhone(@Param('phone_number') phone_number: string) {
    return this.adminService.findByPhone(phone_number);
  }
  
  @Patch('update/:id')
  @ApiOperation({ summary: "Update an admin's information" })
  @ApiParam({
    name: 'id',
    description: 'ID of the admin to update',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Admin updated successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete an admin account' })
  @ApiParam({
    name: 'id',
    description: 'ID of the admin to delete',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Admin deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Admin not found.' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
