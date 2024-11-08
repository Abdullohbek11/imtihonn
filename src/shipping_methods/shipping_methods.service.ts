import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShippingMethodDto } from './dto/create-shipping_method.dto';
import { UpdateShippingMethodDto } from './dto/update-shipping_method.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ShippingMethod } from './model/shipping_method.model';
import { UsersAddress } from 'src/users_address/model/users_address.model';
import { Order } from 'src/order/model/order.model';

@Injectable()
export class ShippingMethodsService {
  constructor(
    @InjectModel(ShippingMethod)
    private shippingMethodmodel: typeof ShippingMethod,
  ) {}

  async create(createShippingMethodDto: CreateShippingMethodDto) {
    return this.shippingMethodmodel.create(createShippingMethodDto);
  }

  async findAll() {
    return this.shippingMethodmodel.findAll({
      include: [
        {
          model: UsersAddress,
          required: false,
        },
        {
          model: Order,
          required: false,
        },
      ],
    });
  }
  async findOne(id: number) {
    const shippingMethod = await this.shippingMethodmodel.findOne({
      include: { all: true },
      where: { id },
    });
    if (!shippingMethod) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yetkazib berish usuli topilmadi`,
      );
    }
    return shippingMethod;
  }

  async update(id: number, updateShippingMethodDto: UpdateShippingMethodDto) {
    const [updatedCount] = await this.shippingMethodmodel.update(
      updateShippingMethodDto,
      {
        where: { id },
      },
    );
    if (updatedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo‘yicha yangilash uchun yetkazib berish usuli topilmadi`,
      );
    }
    return { message: `ID ${id} bo‘yicha yetkazib berish usuli yangilandi` };
  }

  async remove(id: number) {
    const deletedCount = await this.shippingMethodmodel.destroy({
      where: { id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException(
        `ID ${id} bo'yicha o'chirish uchun yetkazib berish usuli topilmadi`,
      );
    }
    return { message: 'Yetkazib berish usuli muvaffaqiyatli ochirildi', id };
  }
}
