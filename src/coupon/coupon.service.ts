import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Coupon } from './model/coupon.model';

@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon) private couponModel: typeof Coupon) {}

  async create(createCouponDto: CreateCouponDto) {
    return this.couponModel.create(createCouponDto);
  }

  async findAll() {
    return this.couponModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const coupon = await this.couponModel.findByPk(id, {
      include: { all: true },
    });
    if (!coupon) {
      throw new NotFoundException(`ID ${id} bo‘yicha kupon topilmadi`);
    }
    return coupon;
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    const [updatedCount] = await this.couponModel.update(updateCouponDto, {
      where: { id },
    });
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun kupon topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha kupon yangilandi` };
  }

  async remove(id: number) {
    const deletedCount = await this.couponModel.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha o‘chirish uchun kupon topilmadi`,
      );
    }
    return {
      message: 'Kupon muvaffaqiyatli o‘chirildi',
      id,
    };
  }
}
