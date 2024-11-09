import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
      is_active: true,
    });
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`ID ${id} bo'yicha foydalanuvchi topilmadi`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async findByPhone(phone_number: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { phone_number },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 7);
      updateUserDto.password = hashedPassword;
    }

    const [updatedCount, [updatedAdmin]] = await this.userModel.update(
      updateUserDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo'yicha yangilash uchun user topilmadi`,
      );
    }

    return {
      message: `ID ${id} bo'yicha user yangilandi`,
      admin: updatedAdmin,
    };
  }

  async remove(id: number) {
    const deletedCount = await this.userModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo'yicha o'chirish uchun foydalanuvchi topilmadi`,
      );
    }
    return {
      message: `Foydalanuvchi muvaffaqiyatli o'chirildi`,
      id,
    };
  }
}