import { Module } from '@nestjs/common';
import { UsersAddressService } from './users_address.service';
import { UsersAddressController } from './users_address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersAddress } from './model/users_address.model';

@Module({
  imports: [SequelizeModule.forFeature([UsersAddress])],
  controllers: [UsersAddressController],
  providers: [UsersAddressService],
  exports: [UsersAddressService],
})
export class UsersAddressModule {}
