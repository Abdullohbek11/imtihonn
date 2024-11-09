import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SelfGuard  ,  } from '../guards/self.guard';
import { SelfAdminGuard } from 'src/guards/self.Admin.guard';
import { IsCreatorGuard } from 'src/guards/is_creator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(SelfAdminGuard)
  @Get('getall')
  async findAll() {
    return this.usersService.findAll();
  }

  // @UseGuards(SelfAdminGuard, SelfGuard)
  @Get('get/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  // @UseGuards(SelfAdminGuard)
  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(
        `Email ${email} bo'yicha foydalanuvchi topilmadi`,
      );
    }
    return user;
  }

  // @UseGuards(SelfAdminGuard)
  @Get('phone/:phone_number')
  async findOneByPhoneNumber(@Param('phone_number') phone_number: string) {
    return this.usersService.findByPhone(phone_number);
  }

  // @UseGuards(SelfGuard, IsCreatorGuard)
  @Patch('update/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // @UseGuards(SelfGuard, IsCreatorGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
