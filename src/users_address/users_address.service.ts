import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersAddressDto } from './dto/create-users_address.dto';
import { UpdateUsersAddressDto } from './dto/update-users_address.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersAddress } from './model/users_address.model';

@Injectable()
export class UsersAddressService {
  constructor(
    @InjectModel(UsersAddress) private useraddressModel: typeof UsersAddress,
  ) {}

  async create(createUsersAddressDto: CreateUsersAddressDto) {
    return this.useraddressModel.create(createUsersAddressDto);
  }

  async findAll() {
    return this.useraddressModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const address = await this.useraddressModel.findOne({
      include: { all: true },
      where: { id },
    });
    if (!address) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha foydalanuvchi manzili topilmadi`,
      );
    }
    return address;
  }

  async update(id: number, updateUsersAddressDto: UpdateUsersAddressDto) {
    const [updatedCount, updatedRows] = await this.useraddressModel.update(
      updateUsersAddressDto,
      {
        where: { id },
        returning: true,
      },
    );
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun manzil topilmadi`,
      );
    }
    return {
      message: `ID ${id} bo‘yicha manzil yangilandi`,
      updatedRow: updatedRows[0],
    };
  }

  async remove(id: number) {
    const deletedCount = await this.useraddressModel.destroy({ where: { id } });

    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun manzil topilmadi`,
      );
    }
    return { message: 'Manzil o‘chirildi', id };
  }
}
