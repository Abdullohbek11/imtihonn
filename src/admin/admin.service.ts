import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './model/admin.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    return this.adminModel.create({
      ...createAdminDto,
      password: hashedPassword,
      is_active: true,
      is_creator: false,
    });
  }

  async findAll() {
    return this.adminModel.findAll({
      attributes: { exclude: ['password', 'hashed_refresh_token'] },
    });
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id, {
      attributes: { exclude: ['password', 'hashed_refresh_token'] },
    });

    if (!admin) {
      throw new NotFoundException(`ID ${id} bo'yicha admin topilmadi`);
    }

    return admin;
  }

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminModel.findOne({
      where: { email },
    });
  }

  async findByPhone(phone_number: string): Promise<Admin | null> {
    return this.adminModel.findOne({
      where: { phone_number },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.password) {
      const hashedPassword = await bcrypt.hash(updateAdminDto.password, 7);
      updateAdminDto.password = hashedPassword;
    }

    const [updatedCount, [updatedAdmin]] = await this.adminModel.update(
      updateAdminDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo'yicha yangilash uchun admin topilmadi`,
      );
    }

    return {
      message: `ID ${id} bo'yicha admin yangilandi`,
      admin: updatedAdmin,
    };
  }

  async remove(id: number) {
    const deletedCount = await this.adminModel.destroy({ where: { id } });

    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo'yicha o'chirish uchun admin topilmadi`,
      );
    }

    return {
      message: `Admin muvaffaqiyatli o'chirildi`,
      id,
    };
  }
}
